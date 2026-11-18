import vm from 'node:vm';
import {group,C,B,S,I,R,A,F,read,keys,cat,sv,add,mut,base,store,token,normal,resign,restore,eq,de,ok,throws,rejects,edit,rejectUnchanged} from './common.mjs';
const ref={};vm.runInNewContext(read('../YTK-R002/prototype.html').match(/<script>([\s\S]*?)<\/script>/)[1],ref);
export const ui=ref.YTK;
const CAT=group('F2:CAT'),PART=group('F2:PART'),r8=group('F2:R08'),r9=group('F2:R09'),cap=group('F2:CAP'),err=group('F2:ERR'),save=group('F2:SAVE'),txt=group('F2:TXT');
const originalUI={};vm.runInNewContext(read('../YTK-R001/prototype.html').match(/<script>([\s\S]*?)<\/script>/)[1],originalUI);
keys.forEach((k,i)=>CAT(i+1,async()=>{
 const letter=String.fromCharCode(65+i);
 for(const view of [originalUI.YTK,ui]){
  eq(view.categories.find(c=>c.l===letter)?.id,k);eq(view.categories.find(c=>c.id===k)?.l,letter);
 }
 ok(k in ui.r2Catalog);ok(k in ui.r2Questions);eq(C.manifest.categoryKeys[i],k);
 const records=[];
 for(const layout of ['base','mixed']){
  for(const v of ['using','not_using','unknown']){
   const s=await store();let initial=null;
   if(layout==='mixed'){
    const one=add('mail','One','svc_00000000-0000-4000-8000-000000000001');
    for(const op of [one,sv(one.recordId,'usageStatus','dormant'),{type:'completeService',recordId:one.recordId},add('base','Two','svc_00000000-0000-4000-8000-000000000002')])initial=await s.save(initial,op);
   }
   const input=cat(k,v);const saved=await s.save(initial,input);const row=(await s.read()).categories[i];
   de([row.categoryKey,row.recordId,row.usageStatus],[k,'cat_'+k,v]);const e=await normal(saved);
   de(e.snapshot.categories[i],row);const imported=await token(e);const restored=(await restore(s,imported)).dataset;
   de(restored.categories[i],row);records.push({layout,letter,input,category:row,sourceGeneration:saved.generationId,restoredGeneration:restored.generationId});
   s.close();
  }
 }
 return {variants:records};
}));
for(const [n,list] of [[13,Array.from(ui.categories,x=>x.id)],[14,Object.keys(ui.r2Catalog)],[15,Object.keys(ui.r2Questions)]])CAT(n,()=>de(C.projection(base()).categories.map(x=>x.categoryKey),list));
CAT(16,async()=>{const s=await store();await rejectUnchanged(s,()=>s.save(null,cat('unexpected')));s.close()});
CAT(17,async()=>{const e=await normal(base());e.snapshot.categories[1].categoryKey='unexpected';await rejects(token(resign(e)))});
CAT(19,()=>{const op=add(),d=mut(base(),op);throws(()=>mut(d,sv(op.recordId,'categoryKey','mail')))});
async function first(){const s=await store();let writes=0;const tr=s.db.transaction.bind(s.db);s.db.transaction=(names,mode)=>{if(mode==='readwrite')writes++;return tr(names,mode)};await s.save(null,cat('mail','unknown'));const d=await s.read();s.close();return {writes,d}}
PART(2,async()=>{const {writes,d}=await first();eq(writes,1);eq(d.categories.length,12);eq(d.categories[2].usageStatus,'unknown');eq(d.overview.recordId,'ovw_main')});
PART(3,async()=>eq((await first()).d.globalRevision,1));
PART(4,async()=>{for(const c of (await first()).d.categories.filter(c=>c.categoryKey!=='mail'))de([c.usageStatus,c.intention],['unanswered','unanswered'])});
PART(7,async()=>{const {d}=await first();de([d.categories[2].usageStatus,d.categories[0].usageStatus],['unknown','unanswered'])});
PART(8,async()=>{const s=await store();await s.save(null,cat('mail','undecided','intention'));const d=await s.read();de([d.categories[2].intention,d.categories[0].intention],['undecided','unanswered']);s.close()});
for(const [n,op] of [[9,cat('mail')],[10,{type:'overview',field:'data',value:'yes'}]])PART(n,async()=>{const s=await store(),a=await s.save(null,cat()),b=await s.save(a,op);eq(b.globalRevision,a.globalRevision+1);const r=d=>n===9?d.categories[2]:d.overview;eq(r(b).revision,r(a).revision+1);s.close()});
const setup=(key='subscription')=>{const op=add(key),d=mut(base(),op);return {id:op.recordId,d}};
for(const [n,v] of [[1,'unanswered'],[3,'using'],[4,'dormant'],[5,'unknown']])r8(n,async()=>{for(const key of keys){let {id,d}=setup(key);if(n!==1)d=mut(mut(d,sv(id,'usageStatus',v)),{type:'completeService',recordId:id});const s=await store();await restore(s,await token(await normal(d)));const actual=(await s.read()).services[0];de([actual.usageStatus,actual.recordState],[v,n===1?'partial':'completed']);s.close()}});
r8(13,()=>{let {id,d}=setup();for(const val of [null,'keep','delete','family','undecided'])C.validate(mut(d,sv(id,'intentionOverride',val)));for(const val of ['unknown','unanswered',false,1,{},[]])throws(()=>mut(d,sv(id,'intentionOverride',val)))});
const r09=async n=>{const s=await store(),op=add('mail');let d=await s.save(null,op);const find=x=>x.categories[2];try{if(n===1||n===2){eq(d.services[0].recordState,'partial');eq(d.services[0].intentionOverride,null);de([find(d).usageStatus,find(d).intention],['unanswered','unanswered']);ok(!Object.hasOwn(d.services[0],'inheritedIntention'));return}
if(n===6){d=(await restore(s,await token(await normal(d)))).dataset;eq(C.effectiveIntention(d.services[0],find(d)),'undecided');eq(d.services[0].intentionOverride,null);return}
if(n===7||n===8){if(n===8)d=await s.save(d,sv(op.recordId,'intentionOverride','delete'));const b=await s.save(d,cat('mail','keep','intention'));de(b.services,d.services);eq(C.effectiveIntention(b.services[0],find(b)),n===7?'keep':'delete');return}
if(n===10){const raw=s.db.transaction.bind(s.db);s.db.transaction=(a,m)=>{const tx=raw(a,m);if(m==='readwrite'){const os=tx.objectStore('services'),put=os.put.bind(os);os.put=v=>{const r=put(v);r.addEventListener('success',()=>tx.abort());return r}}return tx};await rejectUnchanged(s,()=>s.save(d,sv(op.recordId,'usageStatus','using')));return}
const b=await s.save(d,sv(op.recordId,'usageStatus','using'));if(n===9)de([find(b).usageStatus,find(b).intention,b.services[0].usageStatus],['using','undecided','using']);else de([b.services[0].revision-d.services[0].revision,find(b).revision-find(d).revision,b.globalRevision-d.globalRevision],[1,1,1]);}finally{s.close()}};
for(const n of [1,2,6,7,8,9,10,11])r9(n,()=>r09(n));
for(const n of [2,5])save(n,async()=>{let pending=[],events=[];const c=new S.SaveCoordinator({read:async()=>null,save:(d,op)=>new Promise(r=>pending.push(()=>r(mut(d,op))))},s=>events.push(s));await c.load();c.submit(cat());if(n===5)c.submit(cat('mail'));eq(events.at(-1).saved,false);pending.shift()();await new Promise(r=>setImmediate(r));if(n===5){eq(events.at(-1).saved,false);eq(c.pending.length,1);pending.shift()();await new Promise(r=>setImmediate(r))}eq(events.at(-1).saved,true)});
txt(14,()=>{eq(C.normalizeName('😀'.repeat(30)).length,60);throws(()=>C.normalizeName('😀'.repeat(31)));ok(/maxLength\s*=\s*60/.test(read('../YTK-R002/prototype.html')))});
txt(15,async()=>{for(const name of ['password','x'.repeat(61),'\u0001']){const s=await store();await rejectUnchanged(s,()=>s.save(null,add('mail',name)));const d=setup('mail').d,e=await normal(d);e.snapshot.services[0].otherServiceName=name;await rejects(token(resign(e)));const backup=await normal(d,{kind:'emergency',draft:{categoryKey:'mail',otherServiceName:name},draftBase:d});eq(backup.pending.exportedCount,0);s.close()}});
function capset(){let {id,d}=setup();d=mut(d,sv(id,'usageStatus','using'));d=mut(d,{type:'completeService',recordId:id});return mut(d,add('mail',' e\u0301 '))}
for(const n of [3,4,5,6,7,8,9,10,11,12,13])cap(n,async()=>{const d=capset(),p=C.projection(d);eq(C.capacity(d),Buffer.byteLength(JSON.stringify(p)));switch(n){case 3:return de(p.categories.map(x=>x.categoryKey),keys);case 4:eq(p.categories.length,12);return ok(p.categories.some(c=>c.usageStatus==='unanswered'));case 5:return de(p.services.map(s=>s.recordId),d.services.map(s=>s.recordId).sort());case 6:case 7:return ok(p.services.some(s=>s.recordState===(n===6?'partial':'completed')));case 8:{const b=await normal(d,{kind:'emergency',pending:[{base:d,operation:cat('mail')}]});eq(b.pending.exportedCount,1);return eq(Buffer.byteLength(JSON.stringify(b.snapshot)),C.capacity(d))}case 9:return ok(p.services.some(s=>Object.values(s.answers).includes('unanswered')));case 10:return ok(!Object.hasOwn(p.services.find(s=>s.categoryKey==='subscription').answers,'billingSource'));case 11:return eq(p.services.find(s=>s.categoryKey==='mail').otherServiceName,'é');case 12:ok(p.schemaVersion&&p.questionSchemaVersion&&p.generationId&&p.globalRevision);return ok([p.overview,...p.categories,...p.services].every(r=>r.recordId&&r.schemaVersion&&Number.isInteger(r.revision)));case 13:{const b=structuredClone(d);b.services.reverse();b.categories.reverse();de(C.projection(b),p);eq(C.capacity(b),C.capacity(d))}}});
cap(18,()=>{eq(C.classify(new DOMException('mock','QuotaExceededError')),'quota');throws(()=>C.assertCapacity(10000001),{code:'capacity'})});
for(const [n,code,exception] of [[1,'capacity',new C.SaveError('capacity')],[2,'quota',new DOMException('mock','QuotaExceededError')],[3,'restricted',new DOMException('mock','SecurityError')],[4,'conflict',new C.SaveError('conflict')],[5,'temporary',new DOMException('mock','AbortError')],[9,'conflict',new C.SaveError('conflict')]])err(n,async()=>{const d=base();let calls=0;const c=new S.SaveCoordinator({read:async()=>d,save:async()=>{calls++;throw exception}});await c.load();c.submit(cat('mail'));await new Promise(r=>setImmediate(r));eq(c.error,code);de(c.committed,d);eq(c.pending.length,1);if(code==='conflict'){throws(()=>c.retry(),{code});eq(calls,1)}if(n===2)ok(C.messages.quota.includes('可能性'));if(n===5)eq(C.classify(new Error('unknown')),'unknown')});
