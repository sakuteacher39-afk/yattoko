import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {IDBFactory} from 'fake-indexeddb';
import {JSDOM} from 'jsdom';
import {id} from '../src/canonical.mjs';
import {CanonicalStore,SaveCoordinator,openDatabase} from '../src/storage.mjs';
import {NORMAL_OPERATION_TYPES,PENDING_OPERATION_TYPES,createBackup} from '../src/backup.mjs';
import {importBackup,decodeOperation} from '../src/import-backup.mjs';
import {installBackupUI} from '../src/backup-ui.mjs';
import {installRestoreUI} from '../src/restore-ui.mjs';
const category=(categoryKey='device',value='using')=>({type:'category',categoryKey,field:'usageStatus',value});
const file=bytes=>({size:bytes.length,arrayBuffer:async()=>bytes.slice().buffer});
const envelope=artifact=>JSON.parse(new TextDecoder().decode(artifact.bytes));
const encode=value=>new TextEncoder().encode(JSON.stringify(value));
const resign=e=>{const {checksum,...payload}=e;e.checksum={algorithm:'SHA-256',hex:createHash('sha256').update(JSON.stringify(payload)).digest('hex')};return encode(e);};
async function setup(){const s=new CanonicalStore(await openDatabase(new IDBFactory()));await s.save(null,category());return s;}
async function wait(fn){for(let i=0;i<300;i++){if(fn())return;await new Promise(r=>setTimeout(r,2));}throw Error('timeout');}
function exactCoverage(p){const ordinals=p.omittedScopes.flatMap(s=>Array.from({length:s.ordinalEnd-s.ordinalStart+1},(_,i)=>s.ordinalStart+i));assert.equal(ordinals.length,p.omittedCount);assert.equal(new Set(ordinals).size,ordinals.length);assert.deepEqual([...ordinals,...p.operations.map(o=>o.ordinal)].sort((a,b)=>a-b),Array.from({length:p.candidateCount},(_,i)=>i+1));}
async function forbiddenFile(s,type='deleteAll'){const base=await s.read(),artifact=await createBackup(s,{kind:'emergency',pending:[{operation:{type:'overview',field:'billing',value:'yes'},base}]}),e=envelope(artifact),op=e.pending.operations[0];op.operationType=type;op.canonicalValue=null;op.dependencyContext={expectedValue:null,parentQuestionKey:null,parentAnswer:null};return resign(e);}

test('S4-R01 normal and pending allowlists are separate and immutable; decode rejects deleteAll/restore',()=>{
 assert.ok(NORMAL_OPERATION_TYPES.includes('deleteAll'));assert.ok(!PENDING_OPERATION_TYPES.includes('deleteAll'));assert.deepEqual(PENDING_OPERATION_TYPES,NORMAL_OPERATION_TYPES.filter(t=>t!=='deleteAll'));assert.ok(Object.isFrozen(NORMAL_OPERATION_TYPES)&&Object.isFrozen(PENDING_OPERATION_TYPES));for(const operationType of ['deleteAll','restore'])assert.throws(()=>decodeOperation({operationType}),{code:'OPERATION'});
});

test('S4-R01 deleteAll capture omits exact ordinals and the whole dependent component without mutating pending',async()=>{
 const s=await setup(),base=await s.read();
 for(const operations of [[{type:'deleteAll'}],[{type:'deleteAll'},category('mail'),{type:'deleteAll'},category('base')]]){
  const pending=operations.map(operation=>({operation,base})),before=structuredClone(pending),artifact=await createBackup(s,{kind:'emergency',pending}),e=envelope(artifact),p=e.pending;
  assert.equal(p.captureStatus,'none');assert.equal(p.exportedCount,0);assert.equal(p.omittedCount,operations.length);assert.deepEqual(p.omittedScopes.filter(x=>x.operationType==='deleteAll').map(x=>[x.ordinalStart,x.ordinalEnd]),operations.length===1?[[1,1]]:[[1,1],[3,3]]);assert.ok(p.omittedScopes.every(x=>x.reasonCode==='UNSUPPORTED_OPERATION'));exactCoverage(p);assert.deepEqual(pending,before);assert.deepEqual(await s.read(),base);assert.deepEqual(e.snapshot,base);await importBackup(file(artifact.bytes));
 }
 // Unknown restore is unsupported, but an independent supported component can still be exported.
 const partial=envelope(await createBackup(s,{kind:'emergency',pending:[{operation:{type:'restore'},base},{operation:category('mail'),base}]})).pending;
 assert.equal(partial.captureStatus,'partial');assert.deepEqual(partial.operations.map(o=>o.ordinal),[2]);exactCoverage(partial);
 const full=envelope(await createBackup(s,{kind:'emergency',pending:[{operation:category('mail'),base}]})).pending;assert.equal(full.captureStatus,'full');exactCoverage(full);s.close();
});

test('S4-R01 correctly checksummed legacy/crafted deleteAll pending and restore pending reject without writes',async()=>{
 const s=await setup(),old=await s.read();let writes=0;const transaction=s.db.transaction.bind(s.db);s.db.transaction=(...args)=>{if(args[1]==='readwrite')writes++;return transaction(...args);};
 for(const type of ['deleteAll','restore'])await assert.rejects(importBackup(file(await forbiddenFile(s,type))),{code:'OPERATION'});
 assert.equal(writes,0);assert.deepEqual(await s.read(),old);s.close();
});

test('S4-R01 reapply guard rejects deleteAll even if the upstream provenance boundary is bypassed',()=>{
 // Isolate the second boundary: inject forged provenance only in a separate test process.
 const code=`import {mock} from 'node:test';import assert from 'node:assert/strict';
 const restoreURL=${JSON.stringify(new URL('../src/restore.mjs',import.meta.url).href)};
 const actual=await import(restoreURL);let file;mock.module(restoreURL,{namedExports:{...actual,restoreProvenance:()=>file}});
 const {ReapplySession}=await import(${JSON.stringify(new URL('../src/reapply.mjs',import.meta.url).href)});
 for(const operationType of ['deleteAll','restore']){let writes=0;file={sourceFileId:'fixture',envelope:{snapshot:{generationId:'fixture'},pending:{operations:[{operationId:'op_fixture',operationType,dependsOnOperationIds:[]}]}}};
 const dataset={generationId:'fixture',globalRevision:1};const store={save:async()=>{writes++;throw Error('must not save');}};const session=new ReapplySession(store,{dataset});session.check=async()=>dataset;
 await assert.rejects(session.apply(file,'op_fixture',{confirmed:true}),{code:'OPERATION'});assert.equal(writes,0);assert.deepEqual(session.status.appliedOperationIds,[]);assert.equal(session.status.lastKnownGlobalRevision,1);}
 `;
 execFileSync(process.execPath,['--experimental-test-module-mocks','--input-type=module','--eval',code],{stdio:'pipe'});
});

test('S4-R01 normal deleteAll abort protects all old data; successful retry renews generation and rejects stale tab',async()=>{
 const s=await setup();let old=await s.read();old=await s.save(old,{type:'addService',recordId:id('svc'),categoryKey:'device',serviceCatalogId:'iPhone',otherServiceName:null});
 const transaction=s.db.transaction.bind(s.db);s.db.transaction=(...args)=>{const tx=transaction(...args);if(args[1]==='readwrite'){const get=tx.objectStore.bind(tx);tx.objectStore=name=>{const st=get(name);if(name==='meta'){const put=st.put.bind(st);st.put=(...a)=>{const r=put(...a);r.addEventListener('success',()=>tx.abort());return r;};}return st;};}return tx;};
 await assert.rejects(s.save(old,{type:'deleteAll'}));s.db.transaction=transaction;assert.deepEqual(await s.read(),old);
 const next=await s.save(old,{type:'deleteAll'});assert.notEqual(next.generationId,old.generationId);assert.equal(next.services.length,0);assert.ok(next.categories.every(c=>c.usageStatus==='unanswered'));await assert.rejects(s.save(old,category('mail')),{code:'conflict'});assert.deepEqual(await s.read(),next);s.close();
});

test('S4-R01 failed deleteAll → emergency UI reports exact omitted ranges; restore/import cannot replay deletion',async()=>{
 const s=await setup(),old=await s.read(),coordinator=new SaveCoordinator(s);await coordinator.load();const save=s.save.bind(s);s.save=async()=>{throw new DOMException('fixture','QuotaExceededError');};coordinator.submit({type:'deleteAll'});coordinator.submit(category('mail'));coordinator.submit({type:'deleteAll'});await wait(()=>coordinator.stopped&&!coordinator.running);s.save=save;const retained=structuredClone(coordinator.pending);
 const dom=new JSDOM('<main id="app"><input value="保持する未保存入力"></main>'),d=dom.window.document;let artifact;
 installBackupUI(d,{getStore:()=>s,getCapture:()=>({pending:coordinator.pending}),create:async(...args)=>artifact=await createBackup(...args)});
 installRestoreUI(d,{getStore:()=>s,getLocalState:()=>({pending:coordinator.pending.length,draft:true})});const ack=d.getElementById('backup-ack');ack.checked=true;ack.dispatchEvent(new dom.window.Event('change'));[...d.querySelectorAll('#backup-panel button')].find(b=>b.textContent==='未保存回答を緊急退避').click();await wait(()=>artifact&&d.getElementById('backup-status').textContent.includes('未収録'));
 const text=d.getElementById('backup-status').textContent;assert.match(text,/収録 0件、未収録 3件/);assert.match(text,/回答1〜1/);assert.match(text,/回答2〜2/);assert.match(text,/回答3〜3/);assert.doesNotMatch(text,/回答1〜3/);assert.equal(d.querySelector('#app input').value,'保持する未保存入力');assert.deepEqual(coordinator.pending,retained);assert.deepEqual(await s.read(),old);
 const input=d.getElementById('restore-file');const choose=bytes=>{Object.defineProperty(input,'files',{configurable:true,value:[file(bytes)]});input.dispatchEvent(new dom.window.Event('change'));d.getElementById('restore-verify').click();};
 choose(await forbiddenFile(s));await wait(()=>d.getElementById('restore-status').textContent.includes('完了できません'));assert.equal(d.getElementById('restore-commit').disabled,true);assert.equal(d.getElementById('reapply-commit').disabled,true);assert.deepEqual(await s.read(),old);
 choose(artifact.bytes);await wait(()=>d.getElementById('restore-status').textContent.includes('復元前確認'));assert.match(d.getElementById('restore-status').textContent,/収録0件・未収録3件/);d.getElementById('restore-ack').checked=true;d.getElementById('restore-ack').dispatchEvent(new dom.window.Event('change'));d.getElementById('restore-commit').click();await wait(()=>d.getElementById('restore-status').textContent.includes('復元transactionが完了'));
 const restored=await s.read();assert.equal(restored.categories[0].usageStatus,'using');assert.notEqual(restored.generationId,old.generationId);assert.equal(d.getElementById('reapply-commit').disabled,true);assert.match(d.getElementById('restore-status').textContent,/未収録3件/);assert.equal(d.querySelector('#app input').value,'保持する未保存入力');assert.deepEqual(coordinator.pending,retained);dom.window.close();s.close();
});
