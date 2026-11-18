import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
import {mock} from 'node:test';
import * as importer from './import-backup.mjs';
import {fixtures,newStore,envelope,sign,parse,install,snapshot,cat,fingerprint} from './setup.mjs';
const records=[];
let transform=op=>op,calls=0;
const seam=mock.module(new URL('./import-backup.mjs',import.meta.url).href,{
 namedExports:{...importer,decodeOperation:operation=>{calls++;return transform(importer.decodeOperation(operation))}}
});
try{
 const {ReapplySession}=await import('./reapply.mjs?review');
 for(const number of [26,28])for(const fault of [false,true]){
  const s=await newStore();try{
   const d=structuredClone(fixtures['DS-MIX']);d.categories[2].usageStatus='using';d.categories[2].intention='undecided';
   if(number===26)d.services[0].usageStatus='using';
   if(number===28){d.services[1].recordState='partial';d.services[1].usageStatus='dormant'}
   await install(s,await parse(sign(envelope(d))));const base=await s.read();
   const op=number===26?cat('mail','not_using'):{type:'completeService',recordId:d.services[1].recordId};
   const file=await parse(await snapshot(s,{kind:'emergency',pending:[{operation:op,base}]}));
   const result=await install(s,file),session=new ReapplySession(s,result);
   transform=original=>!fault?original:number===26?{...original,categoryKey:'device'}:{...original,recordId:d.services[0].recordId};
   const before=await s.read();calls=0;let outcome,writes=0,aborts=0,completes=0;
   const tr=s.db.transaction.bind(s.db);
   s.db.transaction=(names,mode)=>{const tx=tr(names,mode);if(mode==='readwrite'){writes++;tx.addEventListener('abort',()=>aborts++);tx.addEventListener('complete',()=>completes++)}return tx};
   try{outcome=(await session.apply(file,file.envelope.pending.operations[0].operationId,{confirmed:true})).status}catch(e){outcome=e.code}
   const after=await s.read(),receipts=session.status.appliedOperationIds.length;
   assert.equal(calls,1);
   if(fault){assert.equal(outcome,number===26?'contradiction':'validation');assert.deepEqual(before,after);assert.equal(writes,0);assert.equal(receipts,0)}
   else{assert.equal(outcome,'APPLIED');assert.equal(receipts,1);assert.equal(after.globalRevision,before.globalRevision+1);assert.equal(completes,1)}
   records.push({caseId:'F3:R05-'+number,fault,substitutedAt:fault?'test-only decoded business operation':null,original:op,appliedInput:transform(op),outcome,writes,aborts,completes,receipts,before:fingerprint(before),after:fingerprint(after)});
  }finally{s.close()}
 }
}finally{seam.restore()}
writeFileSync('reapply-results.json',JSON.stringify(records,null,2)+'\n');
