import test from 'node:test';
import assert from 'node:assert/strict';
import {scanJSON} from '../src/import-json.mjs';
import {importBackup} from '../src/import-backup.mjs';
import {createBackup} from '../src/backup.mjs';
import {id,mutate} from '../src/canonical.mjs';
const scan=text=>scanJSON(text,20);
const rejects=(text,code)=>assert.throws(()=>scan(text),{code});
test('R02-09: four JSON whitespace characters traverse structural positions without changing strings',()=>{
 for(const w of [' ','\t','\n','\r',' \t\n\r']){
  const raw=`${w}{${w}"a"${w}:${w}[${w}0${w},${w}true${w},${w}null${w},${w}{${w}}${w},${w}[${w}]${w},${w}"a b\\tあ😀"${w}]${w},${w}"b"${w}:${w}false${w}}${w}`;
  const original=raw;scan(raw);assert.deepEqual(JSON.parse(raw),{a:[0,true,null,{},[],'a b\tあ😀'],b:false});assert.equal(raw,original);
 }
});
test('R02-09: valid backup whitespace reaches full parse then canonical rejection before SHA; raw bytes retained',async()=>{
 const d=mutate(null,{type:'category',categoryKey:'device',field:'usageStatus',value:'using'},id('gen'));
 const artifact=await createBackup({read:async()=>d});const canonical=new TextDecoder().decode(artifact.bytes);
 const variants=[canonical];for(const w of [' ','\t','\n','\r'])variants.push(w+canonical,canonical+w,canonical.replace('{','{'+w),canonical.replace(':',w+':'+w),canonical.replace(',',w+','+w),canonical.replace('[','['+w),canonical.replace(']',w+']'),canonical.slice(0,-1)+w+'}');
 variants.push(JSON.stringify(JSON.parse(canonical),null,2));
 for(const raw of variants){const buffer=new TextEncoder().encode(raw),before=buffer.slice();let fullParses=0,digests=0;const original=JSON.parse;
  JSON.parse=function(text,...rest){if(text===raw)fullParses++;return original(text,...rest);};
  try{const operation=importBackup({size:buffer.length,arrayBuffer:async()=>buffer.buffer},{crypto:{subtle:{digest:async(...args)=>{digests++;return globalThis.crypto.subtle.digest(...args);}}}});
   if(raw===canonical)await operation;else await assert.rejects(operation,{code:'CANONICAL'});
  }finally{JSON.parse=original;}
  assert.equal(fullParses,1);assert.equal(digests,raw===canonical?1:0);assert.deepEqual(buffer,before);
 }
});
test('duplicate decoded keys and invalid Unicode remain rejected with whitespace',()=>{
 for(const raw of [' { "a" : 0 , "\\u0061" : 1 } ',' { "x" : { "a":0, "a":1 } } '])rejects(raw,'DUPLICATE_KEY');
 for(const s of ['"\\ud800"','"\\udc00"','"\\ud800x"'])rejects(' [ '+s+' ] ','UNICODE');
 scan(' [ "\\ud83d\\ude00", "あ", "\\t" ] ');
});
test('non-JSON whitespace, malformed separators, split tokens and number forms remain rejected',()=>{
 for(const w of ['\u00a0','\ufeff','\v','\f'])for(const raw of [w+'{}','{'+w+'}','{}'+w])rejects(raw,'LEXICAL');
 for(const raw of ['{ "a" 0 }','{ "a":0, }','[ 0, ]','[ ,0 ]','[ 1 0 ]','[ n ull ]','[ tru e ]','[ -0 ]','[ -1 ]','[ +1 ]','[ 01 ]','[ 1e0 ]','[ 1.0 ]','{ } { }','[ "a\tb" ]','[ "\\q" ]','[ 0'])rejects(raw,'LEXICAL');
 rejects(' [ 9007199254740992 ] ','NUMBER');scan(' [ 9007199254740991 ] ');
});
test('depth, token, member and array limits retain inclusive boundaries with whitespace',()=>{
 scan('[ '.repeat(16)+'0'+' ]'.repeat(16));rejects('[ '.repeat(17)+'0'+' ]'.repeat(17),'DEPTH');
 scan(' [ "'+'x'.repeat(4094)+'" ] ');rejects(' [ "'+'x'.repeat(4095)+'" ] ','TOKEN_LIMIT');
 const object=n=>'{ '+Array.from({length:n},(_,i)=>`"k${i}" : 0`).join(' , ')+' }';scan(object(7));rejects(object(8),'MEMBER_LIMIT');
 for(const [key,limit]of [['categories',12],['operations',256],['dependsOnOperationIds',256],['services',20],['omittedScopes',10000]]){const raw=n=>`{ "${key}" : [ `+Array(n).fill('0').join(' , ')+' ] }';scan(raw(limit));rejects(raw(limit+1),'ARRAY_LIMIT');}
});
test('pending raw-byte cap retains original whitespace span at one million bytes',()=>{
 for(const leading of [0,3]){const raw=n=>'{"pending":'+' '.repeat(leading)+'['+' '.repeat(n-leading-2)+']}';scan(raw(1000000));rejects(raw(1000001),'PENDING_LIMIT');}
});
