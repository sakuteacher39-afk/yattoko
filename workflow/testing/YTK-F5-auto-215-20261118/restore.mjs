import {group,C,B,I,R,S,A,cat,sv,add,mut,base,store,token,normal,resign,restore,eq,de,ok,throws,rejects,edit,rejectUnchanged,read} from './common.mjs';
const r=group('F3:R03'),bc=()=>tokenFrom(),confirm={confirmed:true};
async function tokenFrom(){const d=mut(base(),add('mail'));return token(await normal(d))}
async function corrupt(s,v){await edit(s,'meta',os=>os.put({key:'current',damage:v}))}
for(const n of [1,2,3,4,5,7])r(n,async()=>{const s=await store(),t=await bc();try{
if(n===1)await s.save(null,cat());if([3,7].includes(n))await corrupt(s,'a');if(n===4)s.close();if(n===5)await edit(s,'categories',os=>os.put({recordId:'cat_mail'}));
const cl=(await R.inspectCurrent(s)).classification;eq(cl,({1:'VALID',2:'EMPTY',3:'CORRUPT_COMPARABLE',4:'CORRUPT_UNCOMPARABLE',5:'CORRUPT_COMPARABLE',7:'CORRUPT_COMPARABLE'})[n]);if(n===4){await rejects(R.prepareRestore(s,t),{code:'UNCOMPARABLE'});return}
if(n===7){const p=await R.prepareRestore(s,t);for(const a of [{},{confirmed:true},{corruptConfirmed:true}])await rejects(R.commitRestore(s,p,a),{code:'CONFIRMATION'});eq((await R.inspectCurrent(s)).classification,cl);await R.commitRestore(s,p,{confirmed:true,corruptConfirmed:true});eq((await R.inspectCurrent(s)).classification,'VALID')}
}finally{s.close()}});
for(const n of [8,9,10,11,12,13])r(n,async()=>{const s=await store(),t=await bc();let d=null;if(n!==12)d=await s.save(null,cat());if(n===11)await corrupt(s,'a');const p=await R.prepareRestore(s,t);
if(n===11)await corrupt(s,'b');else if(n===10)await restore(s,t);else await s.save(d,n===9?{type:'deleteAll'}:cat('mail'));
const after=await R.inspectCurrent(s);let clears=0;const orig=s.db.transaction.bind(s.db);s.db.transaction=(ns,m)=>{const tx=orig(ns,m);if(m==='readwrite')for(const name of ns){const os=tx.objectStore(name),fn=os.clear.bind(os);os.clear=()=>{clears++;return fn()}}return tx};
await rejects(R.commitRestore(s,p,{confirmed:true,corruptConfirmed:true}),{code:'CONFLICT'});de((await R.inspectCurrent(s)).rawGuard,after.rawGuard);eq(clears,0);
if(n===13)await rejects(R.commitRestore(s,p,confirm),{code:'PLAN_STATE'});s.close()});
export function sized(size){
 const d=base(),t=mut(d,add('mail','a')).services[0],bytes=o=>Buffer.byteLength(JSON.stringify(o));const cost=bytes(t)+1,count=Math.floor((size-bytes(d)+1)/cost);
 d.services=Array.from({length:count},(_,i)=>({...t,recordId:'svc_'+i.toString(16).padStart(8,'0')+'-0000-4000-8000-000000000000'}));
 let gap=size-bytes(d);for(let i=0;gap>0;i++){const add=Math.min(gap,59);d.services[i].otherServiceName+='a'.repeat(add);gap-=add}eq(bytes(d),size);return d;
}
for(const [n,size] of [[14,9999999],[15,10000000],[16,10000001]])r(n,async()=>{const s=await store(),e=await normal(base());e.snapshot=sized(size);resign(e);let writes=0;const original=s.db.transaction.bind(s.db);s.db.transaction=(ns,m)=>{if(m==='readwrite')writes++;return original(ns,m)};async function preview(){return R.prepareRestore(s,await token(e))}if(n===16)await rejects(preview());else{const p=await preview();eq(p.classification,'EMPTY');eq(p.services,e.snapshot.services.length)}eq(writes,0);s.close();return {size}});
const body=read('src/restore.mjs').split('function replaceTransaction')[1].split('export async function commitRestore')[0];
r(19,()=>{ok(body.includes('readRequests(tx'));ok(!/\b(?:async|await|setTimeout|queueMicrotask)\b|\.then\s*\(/.test(body))});
function instrument(s,mode,large){
 const history=[],tr=s.db.transaction.bind(s.db);let fault=false,reads=0,depth=0;
 s.db.transaction=(names,m)=>{const tx=tr(names,m);if(m!=='readwrite')return tx;
 tx.addEventListener('complete',()=>history.push('complete'));tx.addEventListener('abort',()=>history.push('abort'));
 for(const name of names){const os=tx.objectStore(name);for(const method of ['getAll','clear','put']){
 const original=os[method].bind(os);os[method]=(...args)=>{const phase=method==='getAll'?(reads++<4?'guard':'readback'):method;history.push([phase,name,depth]);
 if(!fault&&((mode===23&&phase==='clear')||(mode===24&&phase==='clear'&&name==='categories')||(mode===25&&phase==='put'&&name==='overview')||(mode===26&&phase==='put'&&name==='categories')||(mode===27&&phase==='put'&&name==='services')||(mode===28&&phase==='put'&&name==='meta')||(mode===29&&phase==='put'&&name==='services'))){fault=true;throw new DOMException('injected',mode===23?'TransactionInactiveError':mode===29?'QuotaExceededError':'AbortError')}
 const req=original(...args);let success=null;
 Object.defineProperty(req,'onsuccess',{get(){return null},set(fn){success=fn;req.addEventListener('success',ev=>{
 if(!fault&&phase==='readback'&&((mode===34&&name==='overview')||(mode===35&&name==='services')||([36,37].includes(mode)&&name==='meta')||(mode===38&&name==='categories'))){
 const result=structuredClone(req.result);if(mode===34)result[0].revision+=1;if(mode===35)result.splice(0,result.length,...large.services);if(mode===36)result[0].generationId=C.id('gen');if(mode===37)result[0].globalRevision=2;if(mode===38)result.pop();Object.defineProperty(req,'result',{value:result});fault=true;
 }
 if(mode===22&&phase==='guard'){if(!fault){fault=true;tx.oncomplete();tx.abort()}return}
 depth++;try{fn.call(req,ev)}finally{depth--}
 })},configurable:true});return req;
 }}}
 return tx};return {history,fault:()=>fault,reset:()=>{s.db.transaction=tr}};
}
for(const n of [20,21,22,23,24,25,26,27,28,29,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,47])r(n,async()=>{const s=await store(),old=await s.save(null,cat('base','unknown')),source=mut(base(),add('mail')),t=await token(await normal(source)),p=await R.prepareRestore(s,t);
const expectedFault=(n>=22&&n<=29)||(n>=34&&n<=38);
const monitor=instrument(s,n,n===35?sized(10000001):null);
try{if(expectedFault){await rejects(R.commitRestore(s,p,confirm));ok(monitor.fault());monitor.reset();de(await s.read(),old);return {phaseTrace:monitor.history}}
const result=await R.commitRestore(s,p,confirm);monitor.reset();const stored=await s.read(),expected={...source,generationId:result.dataset.generationId,globalRevision:1};de(stored,expected);
const phases=monitor.history.map(x=>Array.isArray(x)?x[0]:x);de([...new Set(phases)],['guard','clear','put','readback','complete']);if(n===21)ok(monitor.history.filter(x=>Array.isArray(x)&&x[0]!=='guard').every(x=>x[2]>0));
if(n===31)ok(body.includes('fromRaw(readback)'));if(n===32)ok(body.includes('bytes(JSON.stringify(d))')&&read('src/import-json.mjs').includes('TextEncoder'));
if(n===33||n===47)ok(Buffer.from(JSON.stringify(stored)).equals(Buffer.from(JSON.stringify(expected))));
if(n===39)ok(!/digest\s*\(/.test(body)&&body.includes('sameBytes('));if(n===40)ok(body.includes('if(!readbackVerified)')&&body.includes('readbackVerified=true'));
if(n===41)ok(stored.generationId!==source.generationId&&stored.generationId!==old.generationId);if(n===42)eq(stored.globalRevision,1);
if(n===43)de(stored.services.map(x=>x.revision),source.services.map(x=>x.revision));
if(n===44||n===45)await rejectUnchanged(s,()=>s.save(old,cat('mail')),'conflict');
return {phaseTrace:monitor.history};
}finally{monitor.reset();s.close()}});
r(46,async()=>{const d=mut(base(),add()),e=await normal(d);e.snapshot.services.push({...e.snapshot.services[0]});await rejects(token(resign(e)))});
