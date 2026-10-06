import assert from 'node:assert/strict';
import {createExternalRuntime} from './external-runtime.mjs';
import {
  AUTH0_ASSURANCE_VERSION,
  ExternalBffBoundary,
  SafeOperationalLogger
} from '../dist/index.js';

const USER_A='11111111-1111-4111-8111-111111111111';
const USER_B='22222222-2222-4222-8222-222222222222';
const RECORD='dddddddd-dddd-4ddd-8ddd-dddddddddddd';
const ISSUER=`https://${process.env.YTK_AUTH0_DOMAIN}/`;
const AUDIENCE=process.env.YTK_AUTH0_AUDIENCE;

const subjects=new Map([
  ['subject-a',USER_A],
  ['subject-b',USER_B]
]);

const userResolver={
  async resolve(issuer,subject){
    if(issuer!==ISSUER)return undefined;
    return subjects.get(subject);
  }
};

const syntheticAuth={
  async verifyAccessToken(token){
    const subject=token.includes('-b')?'subject-b':'subject-a';
    const assurance=token.includes('-a1')?'A1':'A2';
    return{
      issuer:ISSUER,
      subject,
      audience:AUDIENCE,
      issuedAt:Math.floor(Date.now()/1000)-5,
      expiresAt:Math.floor(Date.now()/1000)+300,
      assurance,
      assuranceVersion:AUTH0_ASSURANCE_VERSION
    };
  }
};

const logger=new SafeOperationalLogger();
const runtime=createExternalRuntime({userResolver,logger});
let inserted=false;

function ctx(token,correlationId){
  return{correlationId,authorizationHeader:`Bearer ${token}`,nowMs:Date.now()};
}

async function directConnectionChecks(){
  const client=await runtime.pool.connect();
  try{
    const r=await client.query(`
      SELECT
        current_user,
        (SELECT ssl FROM pg_stat_ssl WHERE pid=pg_backend_pid()) AS ssl,
        (SELECT rolbypassrls FROM pg_roles WHERE rolname=current_user) AS bypass
    `);
    assert.equal(r.rows.length,1);
    assert.equal(r.rows[0].current_user,'ytk_user_request');
    assert.equal(r.rows[0].ssl,true);
    assert.equal(r.rows[0].bypass,false);

    const c=await client.query(`
      SELECT
        NULLIF(current_setting('app.current_user_id', true), '') AS uid,
        NULLIF(current_setting('app.assurance_level', true), '') AS assurance
    `);
    assert.equal(c.rows[0].uid,null);
    assert.equal(c.rows[0].assurance,null);
  }finally{
    client.release();
  }
}

async function cleanup(){
  await runtime.repository.withRequest({userId:USER_A,assurance:'A2'},repo=>repo.delete(RECORD));
  inserted=false;
}

try{
  await directConnectionChecks();
  await cleanup();

  let dbCalls=0;
  const countedRepo={
    async withRequest(requestContext,work){
      dbCalls++;
      return runtime.repository.withRequest(requestContext,work);
    }
  };
  const bff=new ExternalBffBoundary(syntheticAuth,userResolver,countedRepo,logger);

  const created=await bff.withServiceRepository(
    ctx('synthetic-a2-a','p9-create-a'),
    repo=>repo.insert({
      recordId:RECORD,
      categoryId:'F',
      schemaVersion:1,
      encryptedPayloadHex:'00',
      ownerUserId:USER_B
    })
  );
  inserted=true;
  assert.equal(created.ownerUserId,USER_A);
  assert.equal(created.recordId,RECORD);

  const own=await bff.withServiceRepository(
    ctx('synthetic-a2-a','p9-read-a'),
    repo=>repo.read(RECORD)
  );
  assert.equal(own?.ownerUserId,USER_A);

  const hidden=await bff.withServiceRepository(
    ctx('synthetic-a2-b','p9-read-b'),
    repo=>repo.read(RECORD)
  );
  assert.equal(hidden,undefined);

  const crossUpdate=await bff.withServiceRepository(
    ctx('synthetic-a2-b','p9-update-b'),
    repo=>repo.update(RECORD,{categoryId:'G',schemaVersion:1,encryptedPayloadHex:'01'})
  );
  assert.equal(crossUpdate,undefined);

  const crossDelete=await bff.withServiceRepository(
    ctx('synthetic-a2-b','p9-delete-b'),
    repo=>repo.delete(RECORD)
  );
  assert.equal(crossDelete,false);

  const updated=await bff.withServiceRepository(
    ctx('synthetic-a2-a','p9-update-a'),
    repo=>repo.update(RECORD,{categoryId:'H',schemaVersion:1,encryptedPayloadHex:'02'})
  );
  assert.equal(updated?.ownerUserId,USER_A);
  assert.equal(updated?.categoryId,'H');

  const beforeA1=dbCalls;
  await assert.rejects(
    ()=>bff.withServiceRepository(
      ctx('synthetic-a1-a','p9-a1-deny'),
      async()=>{throw Error('db_should_not_be_reached')}
    ),
    /a2_required/
  );
  assert.equal(dbCalls,beforeA1);

  const deleted=await bff.withServiceRepository(
    ctx('synthetic-a2-a','p9-delete-a'),
    repo=>repo.delete(RECORD)
  );
  assert.equal(deleted,true);
  inserted=false;

  await directConnectionChecks();

  for(const line of logger.lines){
    assert.equal(/password|authorization|cookie|token|requestBody|responseBody|encryptedPayload/i.test(line),false);
  }

  console.log('PASS: runtime role / TLS / non-BYPASSRLS');
  console.log('PASS: BFF synthetic A2 own CRUD through real Supabase');
  console.log('PASS: cross-user read/update/delete blocked');
  console.log('PASS: A1 blocked before DB request');
  console.log('PASS: owner_user_id derived from internal user context');
  console.log('PASS: transaction-local context absent outside request transaction');
  console.log('PASS: synthetic row cleanup complete');
}catch(e){
  console.error('STOP: phase9_external_bff_supabase_smoke_failed');
  if(e && typeof e==='object' && 'code' in e && e.code){
    console.error(`error_code: ${String(e.code).slice(0,32)}`);
  }
  process.exitCode=1;
}finally{
  if(inserted){
    try{await cleanup()}catch{console.error('STOP: synthetic_cleanup_failed');process.exitCode=1}
  }
  await runtime.close();
}
