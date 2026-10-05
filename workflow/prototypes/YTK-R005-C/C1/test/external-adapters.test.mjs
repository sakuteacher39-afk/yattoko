import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {
  Auth0OidcAdapter,AUTH0_CLAIM_NAMESPACE,AUTH0_ASSURANCE_VERSION,
  PgRequestTransaction,BoundExternalSupabaseRepository,ExternalSupabaseRepository,
  ExternalBffBoundary,SafeOperationalLogger
} from '../dist/index.js';

const nowMs=1_800_000_000_000;
const now=Math.floor(nowMs/1000);
const issuer='https://tenant.example.auth0.com/';
const audience='https://api.yattoko.invalid/r005c';
const userA='11111111-1111-4111-8111-111111111111';
const recordA='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

function b64u(bytes){let s='';for(const b of bytes)s+=String.fromCharCode(b);return btoa(s).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_')}
async function makeSigner(kid='k1'){
  const pair=await crypto.subtle.generateKey({name:'RSASSA-PKCS1-v1_5',modulusLength:2048,publicExponent:new Uint8Array([1,0,1]),hash:'SHA-256'},true,['sign','verify']);
  const jwk=await crypto.subtle.exportKey('jwk',pair.publicKey);return{pair,jwk:{...jwk,kid,alg:'RS256',use:'sig'},kid};
}
async function issue(signer,overrides={}){
  const header={alg:'RS256',typ:'JWT',kid:overrides.kid??signer.kid};
  const payload={iss:issuer,sub:'auth0|synthetic',aud:audience,iat:now-5,exp:now+300,[`${AUTH0_CLAIM_NAMESPACE}/assurance_level`]:'A2',[`${AUTH0_CLAIM_NAMESPACE}/assurance_version`]:AUTH0_ASSURANCE_VERSION,...overrides};
  delete payload.kid;
  const h=b64u(new TextEncoder().encode(JSON.stringify(header))),p=b64u(new TextEncoder().encode(JSON.stringify(payload))),msg=`${h}.${p}`;
  const sig=await crypto.subtle.sign('RSASSA-PKCS1-v1_5',signer.pair.privateKey,new TextEncoder().encode(msg));return`${msg}.${b64u(new Uint8Array(sig))}`;
}
function oidcFetch(jwk,calls=[]){return async url=>{calls.push(url);if(url===`${issuer}.well-known/openid-configuration`)return{ok:true,status:200,json:async()=>({issuer,jwks_uri:`${issuer}.well-known/jwks.json`})};if(url===`${issuer}.well-known/jwks.json`)return{ok:true,status:200,json:async()=>({keys:[jwk]})};return{ok:false,status:404,json:async()=>({})}}}

class FakeClient{
  queries=[];released=0;failOnWork=false;
  async query(q){this.queries.push(q);const text=typeof q==='string'?q:q.text;if(this.failOnWork&&text.includes('WORK'))throw Error('work_failed');return{rows:[],rowCount:0}}
  release(){this.released++}
}
class FakePool{constructor(client){this.client=client;this.connects=0}async connect(){this.connects++;return this.client}}

test('22 Auth0 external adapter verifies RS256, exact issuer/audience and assurance version',async()=>{
  const s=await makeSigner(),calls=[],a=new Auth0OidcAdapter({issuerAllowlist:[issuer],audience,clockSkewSeconds:0},oidcFetch(s.jwk,calls));
  const v=await a.verifyAccessToken(await issue(s),nowMs);assert.equal(v.issuer,issuer);assert.equal(v.audience,audience);assert.equal(v.assurance,'A2');assert.equal(v.assuranceVersion,AUTH0_ASSURANCE_VERSION);assert.equal(calls.length,2);
});

test('23 Auth0 discovery/JWKS cache avoids repeated fetches',async()=>{
  const s=await makeSigner(),calls=[],a=new Auth0OidcAdapter({issuerAllowlist:[issuer],audience,discoveryTtlMs:60_000,jwksTtlMs:60_000},oidcFetch(s.jwk,calls));const t=await issue(s);await a.verifyAccessToken(t,nowMs);await a.verifyAccessToken(t,nowMs+1000);assert.deepEqual(calls,[`${issuer}.well-known/openid-configuration`,`${issuer}.well-known/jwks.json`]);
});

test('24 Auth0 rejects wrong issuer and non-exact audience',async()=>{
  const s=await makeSigner(),a=new Auth0OidcAdapter({issuerAllowlist:[issuer],audience,clockSkewSeconds:0},oidcFetch(s.jwk));
  const wrongIssuer=await issue(s,{iss:'https://wrong.example/'});await assert.rejects(()=>a.verifyAccessToken(wrongIssuer,nowMs),/jwt_issuer/);
  const extra=await issue(s,{aud:[audience,'https://extra.invalid/']});await assert.rejects(()=>a.verifyAccessToken(extra,nowMs),/jwt_audience/);
});

test('25 Auth0 validates exp, nbf and iat',async()=>{
  const s=await makeSigner(),a=new Auth0OidcAdapter({issuerAllowlist:[issuer],audience,clockSkewSeconds:0},oidcFetch(s.jwk));
  const expired=await issue(s,{exp:now-1}),futureNbf=await issue(s,{nbf:now+1}),futureIat=await issue(s,{iat:now+1}),badIat=await issue(s,{iat:'bad'});
  await assert.rejects(()=>a.verifyAccessToken(expired,nowMs),/jwt_expired/);
  await assert.rejects(()=>a.verifyAccessToken(futureNbf,nowMs),/jwt_nbf/);
  await assert.rejects(()=>a.verifyAccessToken(futureIat,nowMs),/jwt_iat/);
  await assert.rejects(()=>a.verifyAccessToken(badIat,nowMs),/jwt_iat/);
});

test('26 Auth0 rejects assurance claim version mismatch',async()=>{
  const s=await makeSigner(),a=new Auth0OidcAdapter({issuerAllowlist:[issuer],audience},oidcFetch(s.jwk));const t=await issue(s,{[`${AUTH0_CLAIM_NAMESPACE}/assurance_version`]:'future-version'});await assert.rejects(()=>a.verifyAccessToken(t,nowMs),/assurance_version/);
});

test('27 request transaction sets transaction-local context, commits and releases',async()=>{
  const c=new FakeClient(),tx=new PgRequestTransaction(new FakePool(c));const result=await tx.run({userId:userA,assurance:'A2'},async client=>{await client.query({text:'WORK SELECT 1',values:[]});return 7});assert.equal(result,7);assert.equal(c.released,1);assert.equal(c.queries[0],'BEGIN');assert.equal(c.queries.at(-1),'COMMIT');
  const configs=c.queries.filter(x=>typeof x==='object');assert.equal(configs.some(x=>Object.hasOwn(x,'name')),false);assert.deepEqual(configs[0].values,[userA]);assert.match(configs[0].text,/set_config\('app\.current_user_id', \$1, true\)/);assert.deepEqual(configs[1].values,['A2']);assert.match(configs[1].text,/set_config\('app\.assurance_level', \$1, true\)/);
});

test('28 request transaction rolls back and releases on failure',async()=>{
  const c=new FakeClient();c.failOnWork=true;const tx=new PgRequestTransaction(new FakePool(c));await assert.rejects(()=>tx.run({userId:userA,assurance:'A2'},client=>client.query({text:'WORK FAIL',values:[]})),/work_failed/);assert.equal(c.queries.at(-1),'ROLLBACK');assert.equal(c.released,1);
});

test('29 external repository derives owner and adds owner predicate at BFF/SQL layer',async()=>{
  const c=new FakeClient(),repo=new BoundExternalSupabaseRepository(c,userA);await repo.insert({recordId:recordA,categoryId:'F',schemaVersion:1,encryptedPayloadHex:'00'}).catch(e=>{if(!/db_insert_result/.test(e.message))throw e});const insert=c.queries.at(-1);assert.deepEqual(insert.values.slice(0,3),[recordA,userA,'F']);await repo.read(recordA);const read=c.queries.at(-1);assert.match(read.text,/owner_user_id = \$2/);assert.deepEqual(read.values,[recordA,userA]);await repo.delete(recordA);const del=c.queries.at(-1);assert.match(del.text,/owner_user_id = \$2/);
});

test('30 External BFF blocks A1 before DB and derives internal user for A2',async()=>{
  const logger=new SafeOperationalLogger();let dbCalled=0,captured;const auth={verifyAccessToken:async()=>({issuer,subject:'auth0|synthetic',audience,issuedAt:now,expiresAt:now+300,assurance:'A1',assuranceVersion:AUTH0_ASSURANCE_VERSION})};const users={resolve:async()=>userA};const repo={withRequest:async(ctx,work)=>{dbCalled++;captured=ctx;return work({})}};const bff=new ExternalBffBoundary(auth,users,repo,logger);await assert.rejects(()=>bff.withServiceRepository({correlationId:'c-1',authorizationHeader:'Bearer abc.def.ghi',nowMs},async()=>1),/a2_required/);assert.equal(dbCalled,0);
  auth.verifyAccessToken=async()=>({issuer,subject:'auth0|synthetic',audience,issuedAt:now,expiresAt:now+300,assurance:'A2',assuranceVersion:AUTH0_ASSURANCE_VERSION});const x=await bff.withServiceRepository({correlationId:'c-2',authorizationHeader:'Bearer abc.def.ghi',nowMs},async()=>9);assert.equal(x,9);assert.deepEqual(captured,{userId:userA,assurance:'A2'});
});

test('31 allowlist logger ignores body/token/cookie/secret-shaped extra fields',()=>{
  const l=new SafeOperationalLogger();l.write({eventType:'db_request',correlationId:'corr-1',result:'failure',errorCode:'db_error',assuranceLevel:'A2',requestBody:{secret:'x'},token:'x',cookie:'x'});const line=l.lines[0];assert.equal(/requestBody|token|cookie|secret|serviceName|response/i.test(line),false);assert.match(line,/"eventType":"db_request"/);
});

test('32 runtime pg adapter enforces transaction pooler port and verified CA TLS without connection string',async()=>{
  const src=await readFile(new URL('../runtime/external-runtime.mjs',import.meta.url),'utf8');assert.match(src,/from 'pg'/);assert.match(src,/port!==6543/);assert.match(src,/rejectUnauthorized:true/);assert.match(src,/servername:host/);assert.match(src,/YTK_DB_CA_CERT_PATH/);assert.equal(/connectionString/.test(src),false);assert.equal(/dotenv/i.test(src),false);
});
