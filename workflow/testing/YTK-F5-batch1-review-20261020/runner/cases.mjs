import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {createHash} from 'node:crypto';
export const folder=path.dirname(fileURLToPath(import.meta.url)),base=path.resolve(folder,'..'),repo=path.resolve(base,'../../..'),prep=path.resolve(base,'../YTK-F5-preparation-20261015'),old=path.resolve(base,'../YTK-F5-batch1-20261015'),target=path.resolve(repo,'../F5-TARGET-99e566d'),fixtureRoot=path.resolve(repo,'../F5-FIXTURES-99e566d');
export const readJSON=p=>JSON.parse(readFileSync(p,'utf8')),sha=b=>createHash('sha256').update(b).digest('hex'),encode=o=>Buffer.from(JSON.stringify(o));
export const fixture=id=>readFileSync(path.join(fixtureRoot,id+'.json'));
export const ids=['F3:R02-36','F3:R02-39','F3:R02-09'];
export const overviewFields=['recordId','identity','billing','finance','data','family','revision','schemaVersion'];
// Independent, case-scoped oracle: overview schema and F3 payload signature; never calls the product validator.
export function oracle(raw){const e=JSON.parse(raw.toString('utf8')),v=e.snapshot.overview,known=new Set(overviewFields),unknown=Object.keys(v).filter(k=>!known.has(k)),missing=overviewFields.filter(k=>!Object.hasOwn(v,k)),m=JSON.parse(readFileSync(path.join(target,'workflow/specs/YTK-F4-canonical-question-manifest-v1.json'),'utf8'));
 const enumValid=Object.entries(m.r001.overview).every(([k,def])=>def.values.includes(v[k])),metaValid=v.recordId==='ovw_main'&&v.schemaVersion==='ytk-f2-20261014-0d5dfa38'&&Number.isSafeInteger(v.revision)&&v.revision>=0;
 const payload={fileFormat:e.fileFormat,fileFormatVersion:e.fileFormatVersion,kind:e.kind,exportedAt:e.exportedAt,snapshot:e.snapshot,pending:e.pending},computed=sha(encode(payload));
 return {jsonSyntaxValid:true,overviewSchemaValid:unknown.length===0&&missing.length===0&&enumValid&&metaValid,unknownFields:unknown,missingFields:missing,overviewMemberCount:Object.keys(v).length,expectedOverviewMemberCount:8,checksumMatches:e.checksum.algorithm==='SHA-256'&&computed===e.checksum.hex,computedChecksum:computed,declaredChecksum:e.checksum.hex,payloadFieldOrder:Object.keys(payload),serializedRawMatches:encode(e).equals(raw)};
}
export function resign(e){const payload={fileFormat:e.fileFormat,fileFormatVersion:e.fileFormatVersion,kind:e.kind,exportedAt:e.exportedAt,snapshot:e.snapshot,pending:e.pending};return encode({...payload,checksum:{algorithm:'SHA-256',hex:sha(encode(payload))}});}
export async function execute(id,ctx,r){
 const check=(label,b,expected,fn,note)=>r.check(label,b,expected,fn,note);
 const importCheck=(label,b,expected)=>check(label,b,{...expected,inputUnchanged:true,storageAccesses:0},()=>ctx.observe(b),'Product import measured afresh. For R02-36/39, errorCode is observational metadata, never a fixed INVALID_FILE pass condition.');
 const good=fixture('V-VALID-01');
 await check('valid-control-independent-oracle',good,{jsonSyntaxValid:true,overviewSchemaValid:true,unknownFields:[],missingFields:[],checksumMatches:true,serializedRawMatches:true},()=>oracle(good),'F2 overview allowlist/enum/meta and F3 ordered six-field SHA256 via independent Node crypto');
 await importCheck('valid-control-product',good,{accepted:true,snapshotSHA256:sha(encode(JSON.parse(good).snapshot)),fullDocumentParseCalls:1,digestCalls:1});
 if(id==='F3:R02-36'||id==='F3:R02-39'){
  const original=fixture(id.endsWith('36')?'V-UNK-01':'V-HASH-02');
  await check('resigned-unknown-field-oracle',original,{jsonSyntaxValid:true,overviewSchemaValid:false,unknownFields:['extra'],missingFields:[],overviewMemberCount:9,checksumMatches:true},()=>oracle(original),'Unknown overview.extra is independently forbidden; 9 actual members vs approved8. Correct checksum does not establish schema validity.');
  await importCheck('reject-signed-schema-invalid-original',original,{accepted:false});
  // Same-count variant cannot be rejected only because it exceeds the member budget.
  const same=JSON.parse(good);same.snapshot.overview.extra=same.snapshot.overview.identity;delete same.snapshot.overview.identity;const sameBytes=resign(same);
  await check('same-count-schema-oracle',sameBytes,{overviewSchemaValid:false,unknownFields:['extra'],missingFields:['identity'],overviewMemberCount:8,checksumMatches:true},()=>oracle(sameBytes),'Independent allowlist rejects unknown/missing keys even when total count remains8');
  await importCheck('reject-schema-invalid-within-member-budget',sameBytes,{accepted:false});
  if(id==='F3:R02-39'){
   const stale=Buffer.from(good.toString('utf8').replace('2026-10-15T','2026-10-16T'));
   await check('checksum-negative-control-oracle',stale,{jsonSyntaxValid:true,overviewSchemaValid:true,unknownFields:[],missingFields:[],checksumMatches:false},()=>oracle(stale),'One ASCII date digit changes body but leaves old checksum. Valid schema and invalid checksum are independent facts.');
   await importCheck('checksum-negative-control-product',stale,{accepted:false,errorCode:'CHECKSUM',fullDocumentParseCalls:1,digestCalls:1});
  }
  return;
 }
 if(id==='F3:R02-09'){
  const text=good.toString('utf8');
  for(const [label,raw]of [['leading-space',' '+text],['trailing-newline',text+'\n'],['inner-space',text.replace('"kind":','"kind": ')]]){
   const b=Buffer.from(raw);
   await check(label+'-independent-oracle',b,{jsonSyntaxValid:true,overviewSchemaValid:true,checksumMatches:true,serializedRawMatches:false,sameParsedValueAsControl:true},()=>({...oracle(b),sameParsedValueAsControl:encode(JSON.parse(raw)).equals(good)}),'JSON.parse accepts standard inter-token whitespace. Parsed ordered schema/data/checksum equal the accepted control; only raw representation differs.');
   await importCheck(label+'-specified-rejection-stage',b,{accepted:false,errorCode:'CANONICAL',fullDocumentParseCalls:1,digestCalls:0});
  }
  return;
 }
 throw Error('Only three reviewed cases are authorized');
}
