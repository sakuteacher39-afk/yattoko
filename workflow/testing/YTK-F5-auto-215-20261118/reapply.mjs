import {group,C,B,R,A,cat,sv,add,mut,base,store,token,normal,resign,restore,eq,de,ok,throws,rejects,rejectUnchanged} from './common.mjs';
import {sized} from './restore.mjs';
const r=group('F3:R05'),confirmed={confirmed:true};
for(const n of [1,2,3,6,7,8,9,10,13,14,15,17,18,20,21,24,25,26,27,28,29,36])r(n,async()=>{
 const s=await store();try{
 let d=n===25?sized(9999999):base(),ops=[cat('mail','unknown'),cat('social','unknown')];
 if(n===25)ops=[add('business','Additional item')];
 if(n===28){const ad=add();d=mut(d,ad);ops=[{type:'completeService',recordId:ad.recordId}]}
 if(n===26){const ad=add();d=mut(mut(d,ad),sv(ad.recordId,'usageStatus','using'));ops=[cat('subscription','not_using')]}
 if(n===27){const ad=add();d=mut(d,ad);ops=[sv(ad.recordId,'usageStatus','using')]}
 if(n===29)ops=[add('mail')];
 const e=await normal(d,{kind:'emergency',pending:ops.map(operation=>({base:d,operation}))});
 if(n===26||n===28){eq(e.pending.exportedCount,0);const fake=await normal(d,{kind:'emergency',pending:[{base:d,operation:cat('social','using')}]});
 const entry=fake.pending.operations[0];if(n===26){entry.categoryKey='subscription';entry.recordId='cat_subscription';entry.canonicalValue.value='not_using';entry.baseRecordRevision=d.categories[5].revision;entry.dependencyContext.expectedValue='using'}else{entry.operationType='completeService';entry.recordId=d.services[0].recordId;entry.targetKind='service';entry.categoryKey='subscription';entry.baseRecordRevision=d.services[0].revision;entry.canonicalValue=null;entry.dependencyContext.expectedValue=null}
 await rejects(token(resign(fake)));return {observed:'invalid operation excluded at capture and rejected on import',limitation:'reapply-stage gate not reached'}}
 const t=await token(e),p=await R.prepareRestore(s,t);
 if(n===3){await s.save(null,cat());await rejects(R.commitRestore(s,p,confirmed),{code:'CONFLICT'});throws(()=>new A.ReapplySession(s,{sourceFileId:t.sourceFileId,dataset:d}),{code:'UNPROVEN'});return}
 if(n===2)throws(()=>new A.ReapplySession(s,{dataset:d,sourceFileId:t.sourceFileId}),{code:'UNPROVEN'});
 const res=await R.commitRestore(s,p,confirmed),session=new A.ReapplySession(s,res),ids=e.pending.operations.map(x=>x.operationId),apply=i=>session.apply(t,ids[i],confirmed);
 if(n===1){eq((await s.read()).categories[2].usageStatus,'unanswered');eq(session.status.remainingOperationIds.length,2);return}
 if(n===2){eq(session.status.state,'ACTIVE');return}
 if(n===6||n===9){await restore(s,t);await rejects(session.check(t));eq(session.status.state,'INVALIDATED');return}
 if(n===10){const copy=structuredClone(d);copy.generationId=C.id('gen');const other=await token(await normal(copy,{kind:'emergency',pending:ops.map(operation=>({base:copy,operation}))}));await rejects(session.check(other),{code:'UNPROVEN'});return}
 if(n===13){const a=await apply(0),before=await s.read(),b=await apply(0);eq(b.status,'ALREADY_APPLIED');de(b.receipt,a.receipt);eq(b.receipt.operationKey,t.sourceFileId+':'+ids[0]);eq(b.receipt.resultingGenerationId,before.generationId);eq(b.receipt.resultingGlobalRevision,before.globalRevision);de(await s.read(),before);return}
 if(n===17){const first=apply(0);await rejects(apply(0),{code:'IN_FLIGHT'});eq((await first).status,'APPLIED');eq(session.status.appliedOperationIds.length,1);return}
 if(n===18){const orig=s.save.bind(s);s.save=async()=>{throw new DOMException('mock','AbortError')};await rejects(apply(0));de(session.status.appliedOperationIds,[]);de(await s.read(),res.dataset);s.save=orig;return}
 if(n===20){const other=await store();const t2=await token(e);throws(()=>new A.ReapplySession(other,res),{code:'UNPROVEN'});eq(await other.read(),null);other.close();return}
 if(n===25){await rejectUnchanged(s,()=>apply(0),'capacity');de(session.status.appliedOperationIds,[]);return}
 if(n===29){await apply(0);const current=await s.read();eq(current.services[0].intentionOverride,null);eq(current.categories[2].intention,'unanswered');eq(C.effectiveIntention(current.services[0],current.categories[2]),'undecided');return}
 if(n===36){await apply(0);const current=await s.read();ok(!/sourceFileId|operationId|receipt/.test(JSON.stringify(current)));de(Array.from(s.db.objectStoreNames).sort(),['categories','meta','overview','services']);return}
 if(n===14||n===24)await apply(0);
 const old=await s.read();const outside=n===27?{type:'deleteService',recordId:d.services[0].recordId}:[8,15,21].includes(n)?ops[0]:cat('cloud','using');await s.save(old,outside);
 const pre=await s.read();let actual;try{await apply(n===24?1:0)}catch(err){actual=err.code}
 ok(actual);de(await s.read(),pre);eq(session.status.state,'INVALIDATED');if(n===8){eq(actual,'AMBIGUOUS_SAME_VALUE')}
 }finally{s.close()}
});
