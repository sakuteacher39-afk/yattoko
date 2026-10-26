import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {createBackup} from '../src/backup.mjs';
import {importBackup,verifiedFile} from '../src/import-backup.mjs';
import {id,mutate} from '../src/canonical.mjs';
const cat=(categoryKey,value='using')=>({type:'category',categoryKey,field:'usageStatus',value});
const digest=text=>createHash('sha256').update(text).digest('hex');
const now=()=>new Date('2026-10-26T00:00:00.000Z');
async function fixtures(){const d=mutate(null,cat('device'),id('gen')),entry=operation=>({operation,base:d});
 const make=async(kind,pending=[])=>new TextDecoder().decode((await createBackup({read:async()=>d},{kind,pending:pending.map(entry),now})).bytes);
 const full=await make('emergency',[cat('mail'),cat('mail','not_using'),cat('mail','unknown')]);
 const partial=await make('emergency',[cat('mail'),cat('social','invalid')]);
 const none=await make('emergency',[cat('social','invalid')]);
 assert.equal(JSON.parse(full).pending.captureStatus,'full');assert.equal(JSON.parse(partial).pending.captureStatus,'partial');assert.equal(JSON.parse(none).pending.captureStatus,'none');
 return {normal:await make('normal'),full,partial,none,emptyEmergency:await make('emergency')};
}
function graph(root){const nodes=[],seen=new Set();function visit(value){if(!value||typeof value!=='object'||seen.has(value))return;seen.add(value);const descriptors=Object.getOwnPropertyDescriptors(value);nodes.push({value,keys:Reflect.ownKeys(value),descriptors,prototype:Object.getPrototypeOf(value),extensible:Object.isExtensible(value),sealed:Object.isSealed(value),frozen:Object.isFrozen(value)});for(const d of Object.values(descriptors))if('value'in d)visit(d.value);}visit(root);return nodes;}
function unchanged(nodes){for(const n of nodes){assert.deepEqual(Reflect.ownKeys(n.value),n.keys);assert.equal(Object.getPrototypeOf(n.value),n.prototype);assert.equal(Object.isExtensible(n.value),n.extensible);assert.equal(Object.isSealed(n.value),n.sealed);assert.equal(Object.isFrozen(n.value),n.frozen);for(const key of n.keys){const actual=Object.getOwnPropertyDescriptor(n.value,key),before=n.descriptors[key];assert.deepEqual(Object.keys(actual),Object.keys(before));for(const field of Object.keys(before))assert.strictEqual(actual[field],before[field],String(key)+'.'+field);}}}
function observed(value,events,cache=new WeakMap()){if(!value||typeof value!=='object')return value;if(cache.has(value))return cache.get(value);const proxy=new Proxy(value,{get:(o,k,r)=>observed(Reflect.get(o,k,r),events,cache),set:(o,k,v,r)=>{events.push('set');return Reflect.set(o,k,v,r);},deleteProperty:(o,k)=>{events.push('delete');return Reflect.deleteProperty(o,k);},defineProperty:(o,k,d)=>{events.push('define');return Reflect.defineProperty(o,k,d);},preventExtensions:o=>{events.push('preventExtensions');return Reflect.preventExtensions(o);},setPrototypeOf:(o,p)=>{events.push('prototype');return Reflect.setPrototypeOf(o,p);}});cache.set(value,proxy);return proxy;}
async function inspect(raw,{failDigest=false}={}){const originalParse=JSON.parse,buffer=new TextEncoder().encode(raw),before=buffer.slice(),events=[],stages=[];let parsed,nodes,initialJSON,fullParses=0,digests=0,token,error;
 JSON.parse=function(value,...rest){const result=originalParse(value,...rest);if(value!==raw)return result;fullParses++;parsed=result;nodes=graph(result);initialJSON=JSON.stringify(result);return observed(result,events);};
 try{token=await importBackup({size:buffer.length,arrayBuffer:async()=>buffer.buffer},{crypto:{subtle:{digest:async(...args)=>{digests++;unchanged(nodes);assert.equal(JSON.stringify(parsed),initialJSON);stages.push('before');try{if(failDigest)throw Error('dummy SHA failure');return await globalThis.crypto.subtle.digest(...args);}finally{unchanged(nodes);stages.push('after');}}}}});}catch(e){error=e;}finally{JSON.parse=originalParse;}
 if(fullParses===0){assert.ok(error);assert.equal(parsed,undefined);}else{assert.equal(fullParses,1);unchanged(nodes);assert.equal(JSON.stringify(parsed),initialJSON);}assert.deepEqual(buffer,before);assert.deepEqual(events,[],'No parsed value, descriptor, prototype or extensibility write attempts');
 return {token,error,parsed,nodes,digests,stages};
}
function resign(e){const {checksum,...payload}=e;return JSON.stringify({...payload,checksum:{algorithm:'SHA-256',hex:digest(JSON.stringify(payload))}});}
test('R02-29 development: normal/full/partial/none preserve complete parsed graph and independent frozen tokens',async()=>{
 for(const [kind,raw]of Object.entries(await fixtures())){const r=await inspect(raw);assert.equal(r.error,undefined,kind);assert.equal(verifiedFile(r.token),r.token);assert.deepEqual(r.token.envelope,JSON.parse(raw));assert.equal(JSON.stringify(r.token.envelope),raw);
  const originalNodes=new Set(r.nodes.map(n=>n.value));for(const n of graph(r.token)){assert.equal(Object.isFrozen(n.value),true,kind);assert.equal(Object.isExtensible(n.value),false);assert.equal(originalNodes.has(n.value),false,'Token cannot share any parsed object/array');}
  if(r.parsed.pending?.operations.length){const source=r.parsed.pending.operations[0].dependsOnOperationIds,target=r.token.envelope.pending.operations[0].dependsOnOperationIds;assert.notEqual(source,target);assert.throws(()=>target.push('dummy'),TypeError);source.push('dummy-source-only');assert.equal(target.includes('dummy-source-only'),false);}
  assert.throws(()=>{r.token.envelope.kind='changed';},TypeError);assert.deepEqual(r.stages,Array(r.digests).fill(['before','after']).flat());
 }
});
test('R02-29 development: malformed dependency types/order/duplicates and correct-checksum invalid schema reject without parsed mutation',async()=>{
 const files=await fixtures();for(const [kind,raw]of Object.entries(files)){const e=JSON.parse(raw);e.snapshot.overview.extra='dummy';const bad=await inspect(resign(e));assert.ok(bad.error,kind);assert.equal(bad.token,undefined);}
 for(const change of [e=>e.pending.operations[1].dependsOnOperationIds=[],e=>e.pending.operations[2].dependsOnOperationIds.reverse(),e=>e.pending.operations[1].dependsOnOperationIds.push(e.pending.operations[0].operationId),...['bad',null,{},42,true].map(value=>e=>e.pending.operations[0].dependsOnOperationIds=value),e=>e.pending.operations[0].dependsOnOperationIds=[{}],e=>e.pending.operations[0].dependsOnOperationIds=[['bad']],e=>e.pending.operations[0].dependsOnOperationIds=['unknown']]){const e=JSON.parse(files.full);change(e);const r=await inspect(resign(e));assert.ok(r.error);assert.equal(r.token,undefined);}
});
test('R02-29 development: checksum/digest failures for normal/full/partial/none never freeze parsed input or yield a token',async()=>{
 for(const raw of Object.values(await fixtures())){const e=JSON.parse(raw);e.checksum.hex='0'.repeat(64);const mismatch=await inspect(JSON.stringify(e));assert.equal(mismatch.error?.code,'CHECKSUM');assert.equal(mismatch.token,undefined);assert.equal(mismatch.digests,1);const failed=await inspect(raw,{failDigest:true});assert.ok(failed.error);assert.equal(failed.token,undefined);assert.equal(failed.digests,1);}
});
