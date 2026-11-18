import {store,cat,base,normal,token,restore,A,de,eq,rejects} from './common.mjs';
import {writeFileSync} from 'node:fs';
// Independent follow-up. Compare an intervening external edit with an injected no-op save return.
const findings=[];
for(const variant of ['external edit','no-op save result']){
 const s=await store(),source=base(),operation=cat('mail','unknown');
 const t=await token(await normal(source,{kind:'emergency',pending:[{base:source,operation}]}));
 const restored=await restore(s,t),session=new A.ReapplySession(s,restored);
 if(variant==='external edit')await s.save(await s.read(),operation);
 else s.save=async current=>current;
 const before=await s.read();let code=null;
 try{await session.apply(t,t.envelope.pending.operations[0].operationId,{confirmed:true})}catch(e){code=e.code}
 const after=await s.read();eq(code,variant==='external edit'?'conflict':'AMBIGUOUS_SAME_VALUE');de(after,before);de(session.status.appliedOperationIds,[]);
 findings.push({variant,code,state:session.status.state,revisionBefore:before.globalRevision,revisionAfter:after.globalRevision,unchanged:true,receipts:0});
 s.close();
}
writeFileSync(new URL('followup.json',import.meta.url),JSON.stringify(findings,null,2)+'\n');
