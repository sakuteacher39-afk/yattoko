import {group,C,B,F,keys,cat,sv,add,mut,base,store,token,normal,resign,restore,eq,de,ok,rejects} from './common.mjs';
const b=group('F3:R01'),nrm=group('F3:N');
const frozen=d=>({base:d,operation:cat('mail','unknown')});
for(const n of [3,4])b(n,async()=>{const d=base(),draft={categoryKey:'mail',otherServiceName:n===3?' e\u0301 ':'password SECRET'},copy=structuredClone(draft);const e=await normal(d,{kind:'emergency',draft,draftBase:d});if(n===3){eq(e.pending.exportedCount,1);eq(e.pending.operations[0].canonicalValue.otherServiceName,'é')}else{eq(e.pending.omittedCount,1);ok(!JSON.stringify(e).includes('SECRET'))}de(draft,copy)});
for(const n of [15,16,17,18])b(n,async()=>{const s=await store(),d=await s.save(null,cat()),item=frozen(d);if(n===16)await s.save(d,cat('base'));if(n===17)await s.save(d,{type:'deleteAll'});if(n===18){item.base=structuredClone(d);item.base.categories[2].revision++}const e=JSON.parse(new TextDecoder().decode((await B.createBackup(s,{kind:'emergency',pending:[item]})).bytes));eq(e.pending.exportedCount,n===15?1:0);if(n!==15)eq(e.pending.omittedScopes[0].reasonCode,'BASE_CONFLICT');await token(e);s.close()});
for(const [n,k] of [[19,'baseSnapshotChecksumSha256'],[20,'baseContentFingerprintSha256']])b(n,async()=>{const d=base(),e=await normal(d,{kind:'emergency',pending:[frozen(d)]});await token(e);e.pending[k]='0'.repeat(64);await rejects(token(resign(e)))});
for(const [n,count] of [[24,255],[25,256],[26,257]])b(n,async()=>{const d=base(),pending=Array.from({length:count},(_,i)=>({base:d,operation:cat(keys[i%12],Math.floor(i/12)%2?'unknown':'not_using')}));const e=await normal(d,{kind:'emergency',pending});eq(e.pending.candidateCount,count);eq(e.pending.exportedCount,count>256?0:count);if(count>256)ok(e.pending.omittedScopes.every(s=>s.reasonCode==='PENDING_COUNT_LIMIT'));await token(e)});
b(27,async()=>{let invoked=false;await rejects(F.requestFileSave({bytes:new Uint8Array(1),filename:'test.json'},{Blob:class{constructor(){invoked=true;throw Error('injected')}}}),{code:'SAVE_REQUEST_FAILED'});ok(invoked)});
const byte=o=>Buffer.byteLength(JSON.stringify(o));
// Independent length model. All IDs and hashes are replaced with equal-length placeholders.
const fixed='0'.repeat(36),hash='0'.repeat(64),id='op_'+fixed;
function fixture(d,target){
 const header={captureStatus:'full',candidateCount:0,exportedCount:0,omittedCount:0,omittedScopes:[],baseGenerationId:d.generationId,baseGlobalRevision:d.globalRevision,baseSnapshotChecksumSha256:hash,baseContentFingerprintSha256:hash,operations:[]};
 function operation(i,isAdd,prior){
 const value=i%2?'using':'unknown';
 return {operationId:id,ordinal:i+1,operationType:isAdd?'addService':'category',targetKind:isAdd?'service':'category',categoryKey:isAdd?'cloud':'mail',recordId:isAdd?'svc_'+fixed:'cat_mail',baseGenerationId:d.generationId,baseGlobalRevision:d.globalRevision,baseRecordRevision:isAdd?null:0,dependsOnOperationIds:[],captureKind:prior?'dependent-pending':'confirmed-pending',canonicalValue:isAdd?{serviceCatalogId:'other',otherServiceName:'a'}:{field:'usageStatus',value},dependencyContext:{expectedValue:isAdd?null:i===0?'unanswered':i%2?'unknown':'using',parentQuestionKey:null,parentAnswer:null}};
 }
 const width=byte(id)+1;
 for(let k=175;k<216;k++){
 let sum=0;for(let i=0;i<k;i++)sum+=byte(operation(i,false,i))+(i?i*width-1:0);
 for(let j=1;j<=256-k;j++){sum+=byte(operation(k+j-1,true,j-1))+(j>1?(j-1)*width-1:0);const count=k+j;
 const min=byte({...header,candidateCount:count,exportedCount:count})+sum+count-1;
 let delta=target-min;if(delta<0||delta>j*59)continue;
 const ops=[];for(let i=0;i<k;i++)ops.push(cat('mail',i%2?'using':'unknown'));
 for(let i=0;i<j;i++){const extra=Math.min(59,delta);delta-=extra;ops.push(add('cloud','a'.repeat(1+extra),'svc_'+String(i).padStart(8,'0')+'-0000-4000-8000-000000000000'))}
 return {pending:ops.map(operation=>({base:d,operation})),predicted:min+(target-min),k,j};
 }}
 throw Error('No exact boundary recipe');
}
for(const [n,target] of [[21,999999],[22,1000000],[23,1000001]])b(n,async()=>{const d=base(),f=fixture(d,target),before=JSON.stringify(f.pending.map(x=>x.operation));const e=await normal(d,{kind:'emergency',pending:f.pending});if(target<=1000000){eq(e.pending.captureStatus,'full');eq(byte(e.pending),target)}else{const control=fixture(d,target);const last=control.pending.findLast(x=>x.operation.otherServiceName?.length>1);last.operation.otherServiceName=last.operation.otherServiceName.slice(1);const allowed=await normal(d,{kind:'emergency',pending:control.pending});eq(byte(allowed.pending),1000000);eq(e.pending.exportedCount,0);ok(e.pending.omittedScopes.every(x=>x.reasonCode==='PENDING_BYTES_LIMIT'))}eq(JSON.stringify(f.pending.map(x=>x.operation)),before);return {target,k:f.k,j:f.j}});
for(const n of [2,3,4,5,6,9,10])nrm(n,async()=>{const s=await store();let d=await s.save(null,cat('mail','unknown')),op=add();for(const o of [op,sv(op.recordId,'usageStatus','using'),{type:'completeService',recordId:op.recordId},add('mail')])d=await s.save(d,o);
const tr=s.db.transaction.bind(s.db),modes=[];s.db.transaction=(names,m)=>{modes.push(m);return tr(names,m)};
let sends=0;const prior=globalThis.fetch;globalThis.fetch=()=>{sends++;throw Error('network')};try{const a=await B.createBackup(s,{pending:[frozen(d)],draft:{categoryKey:'mail',otherServiceName:'DRAFT_SENTINEL'}}),txt=new TextDecoder().decode(a.bytes),e=JSON.parse(txt);
if(n===2)de([e.snapshot.categories[2].usageStatus,e.snapshot.categories[1].usageStatus],['unknown','unanswered']);
if(n===3)de(e.snapshot.services.map(x=>x.recordState).sort(),['completed','partial']);
if(n===4){eq(e.pending,null);ok(!/DRAFT_SENTINEL|mutationSeq|inheritedIntention|history/.test(txt))}
if(n===5){de(modes,['readonly']);de(e.snapshot,d)}if(n===6)de(await s.read(),d);if(n===9)de([e.kind,e.pending],['normal',null]);if(n===10)eq(sends,0);
}finally{globalThis.fetch=prior;s.close()}});
