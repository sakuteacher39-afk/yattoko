import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
import {fixtures,newStore,envelope,sign,parse,install,snapshot,ui,read,cat,fingerprint} from './setup.mjs';
const keys='device base mail social cloud subscription finance commerce auth license carrier business'.split(' ');
const left=ui('r001.html'),right=ui('r002.html'),manifest=JSON.parse(read('manifest.json'));
const evidence={};
for(let i=0;i<keys.length;i++){
 const key=keys[i],letter=String.fromCharCode(65+i),id='F2:CAT-'+String(i+1).padStart(2,'0');
 const map=[left,right].map(view=>[view.categories.find(c=>c.l===letter).id,view.categories.find(c=>c.id===key).l]);
 assert.deepEqual(map,[[key,letter],[key,letter]]);assert.equal(manifest.categoryKeys[i],key);assert.ok(right.r2Catalog[key]&&right.r2Questions[key]);
 const variants=[];
 for(const [fixture,data] of Object.entries(fixtures))for(const value of ['using','not_using','unknown']){
  const s=await newStore();
  try{
   await install(s,await parse(sign(envelope(data))));
   const before=await s.read(),input=cat(key,value);await s.save(before,input);
   const saved=await s.read(),exported=await snapshot(s);await install(s,await parse(exported));const restored=await s.read();
   const identity=d=>d.categories.map(c=>[c.categoryKey,c.recordId,c.usageStatus]);
   const expected=data.categories.map(c=>[c.categoryKey,'cat_'+c.categoryKey,c.categoryKey===key?value:c.usageStatus]);
   for(const actual of [saved,exported.snapshot,restored]){assert.deepEqual(identity(actual),expected);assert.deepEqual(actual.services,data.services)}
   assert.notEqual(saved.generationId,restored.generationId);
   variants.push({fixture,fixtureDigest:fingerprint(data),input,inputDigest:fingerprint(input),expected,stored:identity(saved),exported:identity(exported.snapshot),restored:identity(restored),fileDigest:fingerprint(exported),serviceCount:restored.services.length});
  }finally{s.close()}
 }
 evidence[id]={id,letter,key,map,variants};
}
writeFileSync('categories.json',JSON.stringify(evidence)+'\n');

for(const n of [13,14,15,16,17,19]){
 const id='F2:CAT-'+n,variants=[];
 for(const [fixture,data] of Object.entries(fixtures)){
  const s=await newStore();try{
   await install(s,await parse(sign(envelope(data))));const before=await s.read();
   if(n<=15){
    const expected=n===13?Array.from(left.categories,c=>c.id):Object.keys(n===14?right.r2Catalog:right.r2Questions);
    const actual=before.categories.map(c=>c.categoryKey);assert.deepEqual(actual,keys);assert.deepEqual(actual,expected);
    variants.push({fixture,fixtureDigest:fingerprint(data),expected,actual});continue;
   }
   if(n===19){
    if(!before.services.length)await s.save(before,{type:'addService',categoryKey:'device',recordId:'svc_00000006-0000-4000-8000-000000000001',serviceCatalogId:'other',otherServiceName:'試験'});
    const current=await s.read();
    for(const service of current.services)for(const destination of keys.filter(k=>k!==service.categoryKey)){
     const op={type:'service',recordId:service.recordId,field:'categoryKey',value:destination};let code;
     try{await s.save(current,op)}catch(e){code=e.code}
     assert.equal(code,'validation');assert.deepEqual(await s.read(),current);
     variants.push({fixture,fixtureDigest:fingerprint(data),op,inputDigest:fingerprint(op),code,before:fingerprint(current),after:fingerprint(await s.read())});
    }
   }else if(n===16){
    for(const key of ['missing_category','A','',null,42]){
     const op=cat(key,'using');let code;try{await s.save(before,op)}catch(e){code=e.code}
     assert.equal(code,'validation');assert.deepEqual(await s.read(),before);
     variants.push({fixture,fixtureDigest:fingerprint(data),op,inputDigest:fingerprint(op),code,before:fingerprint(before),after:fingerprint(await s.read())});
    }
   }else{
    for(const key of keys)for(const mutation of ['unknown-key','mismatched-id'])for(const signed of [true,false]){
     const original=sign(envelope(structuredClone(data)));const changed=original.snapshot.categories.find(c=>c.categoryKey===key);
     if(mutation==='unknown-key')changed.categoryKey='missing_category';else changed.recordId='cat_missing';
     const {checksum,...payload}=original;const testFile=signed?sign(payload):original;let code;
     try{const t=await parse(testFile);await install(s,t)}catch(e){code=e.code}
     assert.ok(code);assert.deepEqual(await s.read(),before);
     variants.push({fixture,fixtureDigest:fingerprint(data),key,mutation,signed,code,inputDigest:fingerprint(testFile),before:fingerprint(before),after:fingerprint(await s.read())});
    }
   }
  }finally{s.close()}
 }
 evidence[id]={id,variants};
}
writeFileSync('categories.json',JSON.stringify(evidence)+'\n');
