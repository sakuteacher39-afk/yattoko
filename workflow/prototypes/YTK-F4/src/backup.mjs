import {registry,manifest,validate,projection,capacity,assertCapacity,guard,mutate,id,generateServiceId,normalizeName} from './canonical.mjs';
export const PROVISIONAL_LIMITS=Object.freeze({rawBytes:16_000_000,pendingBytes:1_000_000,operations:256,status:'PROVISIONAL'});
export class BackupError extends Error {constructor(code){super(code);this.code=code;}}
const fail=code=>{throw new BackupError(code);};
const utf8=text=>new TextEncoder().encode(text);
const scalar=value=>{if(typeof value==='string')for(let i=0;i<value.length;i++){const c=value.charCodeAt(i);if(c>=0xd800&&c<=0xdbff){const next=value.charCodeAt(++i);if(!(next>=0xdc00&&next<=0xdfff))fail('INVALID_VALUE');}else if(c>=0xdc00&&c<=0xdfff)fail('INVALID_VALUE');}if(value&&typeof value==='object')for(const v of Object.values(value))scalar(v);};
export async function sha256(bytes,crypto=globalThis.crypto){try{const hash=await crypto.subtle.digest('SHA-256',bytes);if(hash.byteLength!==32)fail('DIGEST_FAILED');return Array.from(new Uint8Array(hash),b=>b.toString(16).padStart(2,'0')).join('');}catch{fail('DIGEST_FAILED');}}
export function assertRawLimit(bytes){if(!Number.isSafeInteger(bytes)||bytes<0||bytes>PROVISIONAL_LIMITS.rawBytes)fail('RAW_BYTES_LIMIT');}
export function pendingLimitReason(bytes,count){if(count>PROVISIONAL_LIMITS.operations)return 'PENDING_COUNT_LIMIT';if(bytes>PROVISIONAL_LIMITS.pendingBytes)return 'PENDING_BYTES_LIMIT';return null;}
const TYPES=['category','overview','addService','service','completeService','deleteService','deleteCategory','deleteAll'];
const targetKind=op=>['category','deleteCategory'].includes(op.type)?'category':['overview','deleteAll'].includes(op.type)?'overview':'service';
const record=(d,op)=>targetKind(op)==='category'?d.categories.find(c=>c.categoryKey===op.categoryKey):targetKind(op)==='overview'?d.overview:d.services.find(s=>s.recordId===op.recordId);
// Omitted scopes never include names, values, unknown keys, or arbitrary input strings.
function scope(item,reasonCode){const op=item.op??{},categoryKey=manifest.categoryKeys.includes(op.categoryKey)?op.categoryKey:null;return {categoryKey,targetKind:TYPES.includes(op.type)?targetKind(op):'unknown',operationType:TYPES.includes(op.type)?op.type:'unsupported',ordinalStart:item.ordinal,ordinalEnd:item.ordinal,reasonCode};}
function footprint(op,snapshot){
if(op.type==='deleteAll')return new Set(['*']);
if(op.type==='overview')return new Set(['overview']);
if(['category','deleteCategory'].includes(op.type)){const f=new Set(['category:'+op.categoryKey]);if(op.type==='deleteCategory')for(const s of snapshot.services.filter(s=>s.categoryKey===op.categoryKey))f.add('service:'+s.recordId);return f;}
const categoryKey=op.categoryKey??snapshot.services.find(s=>s.recordId===op.recordId)?.categoryKey;
// Include possible parent updates and conditional context, conservatively, in the component.
const f=new Set(['service:'+op.recordId]);if(categoryKey)f.add('category:'+categoryKey);
if(['service','completeService'].includes(op.type))f.add('overview');return f;
}
const overlaps=(a,b)=>a.has('*')||b.has('*')||[...a].some(k=>b.has(k));
function canonicalValue(op){switch(op.type){case 'category':case 'overview':case 'service':return {field:op.field,value:op.value};case 'addService':return {serviceCatalogId:op.serviceCatalogId,otherServiceName:op.otherServiceName};default:return null;}}
function context(d,op){const s=record(d,op);if(op.type==='service'){const q=manifest.r002.questions[s?.categoryKey]?.find(q=>q.key===op.field);return {expectedValue:op.field==='usageStatus'||op.field==='intentionOverride'?s?.[op.field]??null:s?.answers[op.field]??null,parentQuestionKey:q?.presence.type==='equals'?q.presence.questionKey:null,parentAnswer:q?.presence.type==='equals'?s?.answers[q.presence.questionKey]??null:null};}return {expectedValue:['category','overview'].includes(op.type)?s?.[op.field]??null:null,parentQuestionKey:null,parentAnswer:null};}
function contentProjection(d){const strip=r=>Object.fromEntries(Object.entries(r).filter(([k])=>!['revision','schemaVersion'].includes(k)));return {overview:strip(d.overview),categories:d.categories.map(strip),services:d.services.map(strip)};}
function pendingObject(snapshot,snapshotHash,contentHash,items,operations,omittedScopes){return {captureStatus:operations.length===items.length?'full':operations.length?'partial':'none',candidateCount:items.length,exportedCount:operations.length,omittedCount:items.length-operations.length,omittedScopes,baseGenerationId:snapshot.generationId,baseGlobalRevision:snapshot.globalRevision,baseSnapshotChecksumSha256:snapshotHash,baseContentFingerprintSha256:contentHash,operations};}
export async function capturePending(snapshot,frozen,crypto=globalThis.crypto){
const pendingEntries=frozen.pending??[];
const items=pendingEntries.map((p,i)=>({ordinal:i+1,op:p.operation,base:p.base,source:'confirmed-pending'}));
if(frozen.draft){const d=frozen.draft;items.push({ordinal:items.length+1,op:{type:'addService',recordId:null,categoryKey:d.categoryKey,serviceCatalogId:'other',otherServiceName:d.otherServiceName},base:frozen.draftBase,source:'current-draft'});}
if(!items.length)return null;
const snapshotHash=await sha256(utf8(JSON.stringify(snapshot)),crypto),contentHash=await sha256(utf8(JSON.stringify(contentProjection(snapshot))),crypto);
const none=reason=>{
const ranges=[];
for(const item of items){
const s=scope(item,reason),last=ranges.at(-1);
if(last&&last.ordinalEnd+1===s.ordinalStart&&last.categoryKey===s.categoryKey&&last.targetKind===s.targetKind&&last.operationType===s.operationType&&last.reasonCode===s.reasonCode)last.ordinalEnd=s.ordinalEnd;
else ranges.push(s);
}
const result=pendingObject(snapshot,snapshotHash,contentHash,items,[],ranges);
// Exact, discrete ranges can themselves exceed the existing pending budget. Never truncate them.
if(utf8(JSON.stringify(result)).length>PROVISIONAL_LIMITS.pendingBytes)fail('PENDING_BYTES_LIMIT');
return result;
};
if(items.length>PROVISIONAL_LIMITS.operations)return none('PENDING_COUNT_LIMIT');
// Draft IDs exist only in this frozen file candidate; the live draft is never altered.
for(const item of items)if(item.source==='current-draft'){try{item.op.otherServiceName=normalizeName(item.op.otherServiceName);scalar(item.op);item.op.recordId=generateServiceId(snapshot.services.map(s=>s.recordId),items.filter(x=>x!==item).map(x=>x.op?.recordId));}catch{item.invalid=true;}}
const footprints=items.map(x=>footprint(x.op??{},snapshot));
const parents=items.map((_,i)=>i),find=i=>parents[i]===i?i:(parents[i]=find(parents[i]));
for(let i=0;i<items.length;i++)for(let j=0;j<i;j++)if(overlaps(footprints[i],footprints[j]))parents[find(i)]=find(j);
const groups=new Map();items.forEach((item,i)=>{const key=find(i);if(!groups.has(key))groups.set(key,[]);groups.get(key).push(i);});
const operations=[],omitted=[],operationIds=new Set();
for(const group of groups.values()){
let state=structuredClone(snapshot),reason=null;const built=[];
for(const index of group){const item=items[index],op=item.op;try{
if(item.invalid)fail('INVALID_VALUE');if(!op||!TYPES.includes(op.type))fail('UNSUPPORTED_OPERATION');
try{guard(snapshot,item.base);}catch{fail('BASE_CONFLICT');}
scalar(op);
const before=state,baseRecord=record(snapshot,op),dependencyContext=context(before,op);
if(['service','completeService','deleteService'].includes(op.type)&&!before.services.some(s=>s.recordId===op.recordId))fail('DEPENDENCY_MISSING');
let next;try{next=mutate(before,op,id('gen'),{checkCapacity:false});}catch{fail('INVALID_VALUE');}
if(next===before)fail('INVALID_VALUE');
// Require already-canonical names for confirmed operations; only unconfirmed drafts normalize.
if(op.type==='addService'&&op.serviceCatalogId==='other'&&normalizeName(op.otherServiceName)!==op.otherServiceName)fail('INVALID_VALUE');
const operationId='op_'+generateServiceId([],operationIds,()=>id('svc')).slice(4);operationIds.add('svc_'+operationId.slice(3));
const dependsOnOperationIds=built.filter(p=>overlaps(footprints[p.index],footprints[index])).map(p=>p.value.operationId);
const value={operationId,ordinal:item.ordinal,operationType:op.type,targetKind:targetKind(op),categoryKey:op.categoryKey??baseRecord?.categoryKey??before.services.find(s=>s.recordId===op.recordId)?.categoryKey??null,recordId:op.recordId??baseRecord?.recordId??null,baseGenerationId:snapshot.generationId,baseGlobalRevision:snapshot.globalRevision,baseRecordRevision:baseRecord?.revision??null,dependsOnOperationIds,captureKind:dependsOnOperationIds.length?'dependent-pending':item.source,canonicalValue:canonicalValue(op),dependencyContext};
built.push({index,value});state=next;
}catch(e){reason=e instanceof BackupError?e.code:'INVALID_VALUE';break;}}
if(reason)for(const index of group)omitted.push(scope(items[index],reason));else operations.push(...built.map(x=>x.value));
}
operations.sort((a,b)=>a.ordinal-b.ordinal);omitted.sort((a,b)=>a.ordinalStart-b.ordinalStart);
const result=pendingObject(snapshot,snapshotHash,contentHash,items,operations,omitted);
// Any budget violation omits the entire candidate, never a silent prefix/suffix.
if(pendingLimitReason(utf8(JSON.stringify(result)).length,items.length))return none('PENDING_BYTES_LIMIT');
return result;
}
export async function createBackup(store,{kind='normal',pending=[],draft=null,draftBase=null,crypto=globalThis.crypto,now=()=>new Date()}={}){
if(!['normal','emergency'].includes(kind)||registry.status!=='ACTIVE')fail('VERSION');
// Freeze before the first asynchronous read/digest. Export never mutates the coordinator.
const frozen=kind==='emergency'?structuredClone({pending,draft,draftBase}):null;
const dataset=await store.read();if(dataset===null)fail('EMPTY');validate(dataset);assertCapacity(capacity(dataset));scalar(dataset);
const snapshot=projection(dataset);
const captured=kind==='emergency'?await capturePending(snapshot,frozen,crypto):null;
let exportedAt;try{exportedAt=now().toISOString();}catch{fail('GENERATION_FAILED');}
if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(exportedAt))fail('GENERATION_FAILED');
const payload={fileFormat:'yattoko-backup',fileFormatVersion:registry.fileFormatVersion,kind,exportedAt,snapshot,pending:captured};
const hex=await sha256(utf8(JSON.stringify(payload)),crypto);
const envelope={...payload,checksum:{algorithm:'SHA-256',hex}};
const bytes=utf8(JSON.stringify(envelope));assertRawLimit(bytes.length);
const stamp=exportedAt.slice(0,19).replace(/[-:]/g,'').replace('T','-');
return {bytes,filename:`yattoko-${kind==='normal'?'backup':'emergency'}-${stamp}-${hex.slice(0,8)}.json`,summary:captured,kind};
}
