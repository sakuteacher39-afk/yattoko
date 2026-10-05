import type {AssuranceLevel} from './auth.js';

export const AUTH0_CLAIM_NAMESPACE='https://api.yattoko.invalid/r005c/claims';
export const AUTH0_ASSURANCE_VERSION='ytk-assurance-v1';

export type FetchLike=(url:string)=>Promise<{ok:boolean;status:number;json():Promise<unknown>}>;
export interface Auth0OidcConfig{
  issuerAllowlist:readonly string[];
  audience:string;
  discoveryTtlMs?:number;
  jwksTtlMs?:number;
  clockSkewSeconds?:number;
}
export interface VerifiedExternalToken{
  issuer:string;
  subject:string;
  audience:string;
  issuedAt:number;
  expiresAt:number;
  notBefore?:number;
  assurance:Extract<AssuranceLevel,'A1'|'A2'>;
  assuranceVersion:string;
}
type JsonObject=Record<string,unknown>;
type Discovery={issuer:string;jwks_uri:string};
type Jwk=JsonWebKey&{kid?:string;alg?:string;use?:string};
type CacheEntry<T>={value:T;expiresAtMs:number};

function fail(code:string):never{throw Error(code)}
function asObject(v:unknown,code:string):JsonObject{if(!v||typeof v!=='object'||Array.isArray(v))fail(code);return v as JsonObject}
function b64uBytes(s:string){if(!/^[A-Za-z0-9_-]+$/.test(s))fail('jwt_b64');let x=s.replace(/-/g,'+').replace(/_/g,'/');while(x.length%4)x+='=';try{return Uint8Array.from(atob(x),c=>c.charCodeAt(0))}catch{fail('jwt_b64')}}
function decodePart(s:string,code:string){try{return asObject(JSON.parse(new TextDecoder().decode(b64uBytes(s))),code)}catch(e){if(e instanceof Error&&e.message.startsWith('jwt_'))throw e;fail(code)}}
function intClaim(v:unknown,code:string){if(typeof v!=='number'||!Number.isSafeInteger(v))fail(code);return v}
function exactAudience(v:unknown,expected:string){if(typeof v==='string')return v===expected;if(Array.isArray(v)&&v.length===1&&v[0]===expected)return true;return false}
function normalizeIssuer(v:string){if(!/^https:\/\/[A-Za-z0-9.-]+\/$/.test(v))fail('oidc_issuer_config');return v}
export function auth0OidcConfigFromEnv(env:Record<string,string|undefined>):Auth0OidcConfig{
  const domain=env.YTK_AUTH0_DOMAIN?.trim();
  const audience=env.YTK_AUTH0_AUDIENCE?.trim();
  if(!domain)fail('missing_env:YTK_AUTH0_DOMAIN');
  if(!audience)fail('missing_env:YTK_AUTH0_AUDIENCE');
  if(domain.includes('://')||domain.includes('/')||!/^[A-Za-z0-9.-]+$/.test(domain))fail('invalid_env:YTK_AUTH0_DOMAIN');
  return{issuerAllowlist:[`https://${domain}/`],audience};
}

export class Auth0OidcAdapter{
  private discoveryCache=new Map<string,CacheEntry<Discovery>>();
  private jwksCache=new Map<string,CacheEntry<Jwk[]>>();
  private issuers:Set<string>;
  private discoveryTtlMs:number;
  private jwksTtlMs:number;
  private skew:number;
  constructor(private config:Auth0OidcConfig,private fetcher:FetchLike=(url)=>fetch(url)){
    this.issuers=new Set(config.issuerAllowlist.map(normalizeIssuer));
    if(!this.issuers.size)fail('oidc_issuer_config');
    if(!config.audience)fail('oidc_audience_config');
    this.discoveryTtlMs=config.discoveryTtlMs??3_600_000;
    this.jwksTtlMs=config.jwksTtlMs??300_000;
    this.skew=config.clockSkewSeconds??60;
  }
  private assertIssuer(issuer:unknown){if(typeof issuer!=='string'||!this.issuers.has(issuer))fail('jwt_issuer');return issuer}
  private async json(url:string,code:string){const r=await this.fetcher(url);if(!r.ok)fail(`${code}:${r.status}`);return asObject(await r.json(),code)}
  private async discovery(issuer:string,nowMs:number,force=false){
    const old=this.discoveryCache.get(issuer);if(!force&&old&&old.expiresAtMs>nowMs)return old.value;
    const body=await this.json(`${issuer}.well-known/openid-configuration`,'oidc_discovery');
    if(body.issuer!==issuer||typeof body.jwks_uri!=='string')fail('oidc_discovery_mismatch');
    const expected=`${issuer}.well-known/jwks.json`;
    if(body.jwks_uri!==expected)fail('oidc_jwks_uri');
    const value={issuer,jwks_uri:body.jwks_uri};this.discoveryCache.set(issuer,{value,expiresAtMs:nowMs+this.discoveryTtlMs});return value;
  }
  private async jwks(issuer:string,nowMs:number,force=false){
    const old=this.jwksCache.get(issuer);if(!force&&old&&old.expiresAtMs>nowMs)return old.value;
    const d=await this.discovery(issuer,nowMs,force);const body=await this.json(d.jwks_uri,'jwks_fetch');
    if(!Array.isArray(body.keys))fail('jwks_shape');
    const keys=body.keys.filter(x=>x&&typeof x==='object') as Jwk[];if(!keys.length)fail('jwks_empty');
    this.jwksCache.set(issuer,{value:keys,expiresAtMs:nowMs+this.jwksTtlMs});return keys;
  }
  private async verificationKey(issuer:string,kid:string,nowMs:number){
    let keys=await this.jwks(issuer,nowMs);let jwk=keys.find(k=>k.kid===kid&&(!k.alg||k.alg==='RS256')&&(!k.use||k.use==='sig'));
    if(!jwk){keys=await this.jwks(issuer,nowMs,true);jwk=keys.find(k=>k.kid===kid&&(!k.alg||k.alg==='RS256')&&(!k.use||k.use==='sig'));}
    if(!jwk)fail('jwt_kid');
    try{return await crypto.subtle.importKey('jwk',jwk,{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['verify'])}catch{fail('jwks_key')}
  }
  async verifyAccessToken(token:string,nowMs=Date.now()):Promise<VerifiedExternalToken>{
    if(typeof token!=='string'||token.length<32||token.length>16_384)fail('jwt_shape');
    const parts=token.split('.');if(parts.length!==3)fail('jwt_shape');
    const header=decodePart(parts[0],'jwt_header'),payload=decodePart(parts[1],'jwt_payload');
    if(header.alg!=='RS256'||typeof header.kid!=='string'||!header.kid)fail('jwt_header');
    const issuer=this.assertIssuer(payload.iss);
    const key=await this.verificationKey(issuer,header.kid,nowMs);
    const ok=await crypto.subtle.verify('RSASSA-PKCS1-v1_5',key,b64uBytes(parts[2]),new TextEncoder().encode(`${parts[0]}.${parts[1]}`));
    if(!ok)fail('jwt_signature');
    if(!exactAudience(payload.aud,this.config.audience))fail('jwt_audience');
    if(typeof payload.sub!=='string'||!payload.sub||payload.sub.length>512)fail('jwt_subject');
    const exp=intClaim(payload.exp,'jwt_exp');const iat=intClaim(payload.iat,'jwt_iat');
    const nbf=payload.nbf===undefined?undefined:intClaim(payload.nbf,'jwt_nbf');const now=Math.floor(nowMs/1000);
    if(exp<=now-this.skew)fail('jwt_expired');
    if(iat>now+this.skew||iat>exp)fail('jwt_iat');
    if(nbf!==undefined&&(nbf>now+this.skew||nbf>exp))fail('jwt_nbf');
    const assurance=payload[`${AUTH0_CLAIM_NAMESPACE}/assurance_level`];
    const version=payload[`${AUTH0_CLAIM_NAMESPACE}/assurance_version`];
    if(version!==AUTH0_ASSURANCE_VERSION)fail('assurance_version');
    if(assurance!=='A1'&&assurance!=='A2')fail('assurance_level');
    return{issuer,subject:payload.sub,audience:this.config.audience,issuedAt:iat,expiresAt:exp,notBefore:nbf,assurance,assuranceVersion:version};
  }
}
