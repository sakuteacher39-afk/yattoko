import {manifest as M,catalog} from './definitions.mjs';
export {M as manifest};
export const registry=Object.freeze({id:'ytk-free-v1-registry-20261015',status:'ACTIVE',fileFormatVersion:1,schemaVersion:'ytk-f2-20261014-0d5dfa38',questionSchemaVersion:'ytk-qm-gitblob-4a9950b19813e74bc51de2246465096818d375ac'});
export const LIMIT=10_000_000;
export class SaveError extends Error {constructor(code){super(code);this.code=code;}}
const fail=(code='validation')=>{throw new SaveError(code);};
const own=(o,k)=>Object.hasOwn(o,k);
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const fields=(o,keys)=>{if(!o||typeof o!=='object'||Array.isArray(o)||!equal(Object.keys(o).sort(),[...keys].sort()))fail();};
const member=(v,def)=>{if(!def.values.includes(v))fail();};
const version=v=>{if(v!==registry.schemaVersion)fail('version');};
const revision=v=>{if(!Number.isSafeInteger(v)||v<0)fail();};
const uuid='[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';
// At most three attempts; generator exceptions or malformed output fail closed immediately.
export function generateServiceId(existingIds,candidateIds,generator=id){
const occupied=new Set([...existingIds,...candidateIds]);
for(let attempt=0;attempt<3;attempt++){
let candidate;try{candidate=generator('svc');}catch{fail('collision');}
if(typeof candidate!=='string'||!new RegExp(`^svc_${uuid}$`).test(candidate))fail('collision');
if(!occupied.has(candidate))return candidate;
}
fail('collision');
}
export function id(prefix){const c=globalThis.crypto;if(!c)fail('restricted');let u;if(c.randomUUID)u=c.randomUUID();else{const b=c.getRandomValues(new Uint8Array(16));b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;const h=Array.from(b,x=>x.toString(16).padStart(2,'0')).join('');u=`${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;}if(!['svc','gen'].includes(prefix)||!new RegExp(`^${uuid}$`).test(u))fail();return `${prefix}_${u}`;}
export function normalizeName(v){if(typeof v!=='string')fail();v=v.normalize('NFC').trim();if(!v.length||v.length>60||/[\u0000-\u001f\u007f-\u009f\u061c\u200e-\u200f\u202a-\u202e\u2066-\u2069]/u.test(v)||/(password|passwd|パスワード|暗証番号|pin\b|otp\b|ワンタイム|復旧コード|recovery\s*code|秘密鍵|private\s*key|seed\s*phrase|シードフレーズ|cvv|cvc|api\s*key|access\s*token|ssh\s*private)/i.test(v)||/(?:\d[ -]*?){13,19}/.test(v))fail();return v;}
const active=(q,a)=>q.presence.type==='always'||a[q.presence.questionKey]===q.presence.value;
export function materialize(categoryKey,answers={}){const qs=M.r002.questions[categoryKey];if(!qs)fail();const out={};for(const k of Object.keys(answers))if(!qs.some(q=>q.key===k))fail();for(const q of qs)if(active(q,answers))out[q.key]=own(answers,q.key)?answers[q.key]:'unanswered';return out;}
export function effectiveIntention(service,parent){return service.intentionOverride??(parent.intention==='unanswered'?'undecided':parent.intention);}
export function baseline(generationId=id('gen')){return {schemaVersion:registry.schemaVersion,questionSchemaVersion:registry.questionSchemaVersion,generationId,globalRevision:0,overview:{recordId:'ovw_main',...Object.fromEntries(Object.keys(M.r001.overview).map(k=>[k,'unanswered'])),revision:0,schemaVersion:registry.schemaVersion},categories:M.categoryKeys.map(categoryKey=>({recordId:`cat_${categoryKey}`,categoryKey,usageStatus:'unanswered',intention:'unanswered',revision:0,schemaVersion:registry.schemaVersion})),services:[]};}
const overviewKeys=['recordId',...Object.keys(M.r001.overview),'revision','schemaVersion'];
const categoryKeys=['recordId','categoryKey','usageStatus','intention','revision','schemaVersion'];
const serviceKeys=['recordId','categoryKey','serviceCatalogId','otherServiceName','recordState','usageStatus','answers','intentionOverride','revision','schemaVersion'];
export function validate(d){fields(d,['schemaVersion','questionSchemaVersion','generationId','globalRevision','overview','categories','services']);version(d.schemaVersion);if(d.questionSchemaVersion!==registry.questionSchemaVersion)fail('version');if(!new RegExp(`^gen_${uuid}$`).test(d.generationId))fail();revision(d.globalRevision);fields(d.overview,overviewKeys);if(d.overview.recordId!=='ovw_main')fail();version(d.overview.schemaVersion);revision(d.overview.revision);for(const [k,def] of Object.entries(M.r001.overview))member(d.overview[k],def);
if(!Array.isArray(d.categories)||d.categories.length!==M.categoryKeys.length||!Array.isArray(d.services))fail();const seen=new Set();for(const c of d.categories){fields(c,categoryKeys);if(!M.categoryKeys.includes(c.categoryKey)||c.recordId!==`cat_${c.categoryKey}`||seen.has(c.recordId))fail();seen.add(c.recordId);version(c.schemaVersion);revision(c.revision);for(const [k,def]of Object.entries(M.r001.category))member(c[k],def);if(c.usageStatus!=='unanswered'&&c.intention==='unanswered')fail();}
for(const s of d.services){fields(s,serviceKeys);if(!new RegExp(`^svc_${uuid}$`).test(s.recordId)||seen.has(s.recordId)||!M.categoryKeys.includes(s.categoryKey))fail();seen.add(s.recordId);version(s.schemaVersion);revision(s.revision);for(const[k,def]of Object.entries(M.r002.serviceCore))member(s[k],def);if(s.recordState==='completed'&&s.usageStatus==='unanswered')fail();if(s.serviceCatalogId==='other'){if(normalizeName(s.otherServiceName)!==s.otherServiceName)fail();}else if(!catalog[s.categoryKey].filter(x=>x!=='その他').includes(s.serviceCatalogId)||s.otherServiceName!==null)fail();const qs=M.r002.questions[s.categoryKey];fields(s.answers,qs.filter(q=>active(q,s.answers)).map(q=>q.key));for(const q of qs)if(active(q,s.answers))member(s.answers[q.key],q);}
for(const s of d.services)for(const b of M.validatorBindings.positiveDirection){if(b.categoryKey&&b.categoryKey!==s.categoryKey)continue;const value=b.source?s.usageStatus:s.answers[b.sourceQuestionKey];if(value!==b.when)continue;if(b.target==='r001.category.usageStatus'){if(d.categories.find(c=>c.categoryKey===s.categoryKey).usageStatus==='not_using')fail('contradiction');}else{const k=b.target.split('.').at(-1);if(d.overview[k]===(k==='family'?'known':'no'))fail('contradiction');}}
return d;}
const ordered=(o,keys)=>Object.fromEntries(keys.map(k=>[k,o[k]]));
export function projection(d){return {schemaVersion:d.schemaVersion,questionSchemaVersion:d.questionSchemaVersion,generationId:d.generationId,globalRevision:d.globalRevision,overview:ordered(d.overview,overviewKeys),categories:M.categoryKeys.map(k=>ordered(d.categories.find(c=>c.categoryKey===k),categoryKeys)),services:[...d.services].sort((a,b)=>a.recordId<b.recordId?-1:a.recordId>b.recordId?1:0).map(s=>({...ordered(s,serviceKeys),answers:Object.fromEntries(M.r002.questions[s.categoryKey].filter(q=>active(q,s.answers)).map(q=>[q.key,s.answers[q.key]]))}))};}
export const capacity=d=>new TextEncoder().encode(JSON.stringify(projection(d))).length;
export function assertCapacity(bytes){if(bytes>LIMIT)fail('capacity');}
const recordList=d=>[d.overview,...d.categories,...d.services];
export function guard(current,expected){if(!current||!expected){if(current!==null||expected!==null)fail('conflict');return;}if(current.generationId!==expected.generationId||current.globalRevision!==expected.globalRevision)fail('conflict');const actual=new Map(recordList(current).map(r=>[r.recordId,r.revision])),old=recordList(expected);if(actual.size!==old.length||old.some(r=>actual.get(r.recordId)!==r.revision))fail('conflict');}
export function mutate(current,op,freshGeneration,{checkCapacity=true}={}){let d=structuredClone(current??baseline(freshGeneration));const before=structuredClone(d);let s,c;
switch(op.type){
case 'category':fields(op,['type','categoryKey','field','value']);c=d.categories.find(c=>c.categoryKey===op.categoryKey);if(!c||!own(M.r001.category,op.field))fail();member(op.value,M.r001.category[op.field]);if(op.field==='usageStatus'&&c.usageStatus==='unanswered'&&op.value!=='unanswered'&&c.intention==='unanswered')c.intention='undecided';c[op.field]=op.value;break;
case 'overview':fields(op,['type','field','value']);if(!own(M.r001.overview,op.field))fail();member(op.value,M.r001.overview[op.field]);d.overview[op.field]=op.value;break;
case 'addService':fields(op,['type','recordId','categoryKey','serviceCatalogId','otherServiceName']);if(d.services.some(s=>s.recordId===op.recordId))fail('collision');d.services.push({recordId:op.recordId,categoryKey:op.categoryKey,serviceCatalogId:op.serviceCatalogId,otherServiceName:op.serviceCatalogId==='other'?normalizeName(op.otherServiceName):op.otherServiceName,recordState:'partial',usageStatus:'unanswered',answers:materialize(op.categoryKey),intentionOverride:null,revision:0,schemaVersion:registry.schemaVersion});break;
case 'service':fields(op,['type','recordId','field','value']);s=d.services.find(s=>s.recordId===op.recordId);if(!s)fail();if(op.field==='usageStatus'||op.field==='intentionOverride'){member(op.value,M.r002.serviceCore[op.field]);if(s[op.field]===op.value)return current;s[op.field]=op.value;}else {const q=M.r002.questions[s.categoryKey].find(q=>q.key===op.field);if(!q||!active(q,s.answers))fail();member(op.value,q);if(s.answers[op.field]===op.value)return current;s.answers[op.field]=op.value;s.answers=materialize(s.categoryKey,s.answers);}s.recordState='partial';break;
case 'completeService':fields(op,['type','recordId']);s=d.services.find(s=>s.recordId===op.recordId);if(!s)fail();s.recordState='completed';break;
case 'deleteService':fields(op,['type','recordId']);if(!d.services.some(s=>s.recordId===op.recordId))fail();d.services=d.services.filter(s=>s.recordId!==op.recordId);break;
case 'deleteCategory':fields(op,['type','categoryKey']);c=d.categories.find(c=>c.categoryKey===op.categoryKey);if(!c)fail();c.usageStatus='unanswered';c.intention='unanswered';d.services=d.services.filter(s=>s.categoryKey!==op.categoryKey);break;
case 'deleteAll':fields(op,['type']);if(freshGeneration===d.generationId)fail('collision');d=baseline(freshGeneration);break;
default:fail();}
// Only detail-origin mutations may positively reconcile parent summaries.
if(['service','completeService'].includes(op.type))for(const b of M.validatorBindings.positiveDirection){if(b.categoryKey&&b.categoryKey!==s.categoryKey)continue;if((b.source?s.usageStatus:s.answers[b.sourceQuestionKey])!==b.when)continue;if(b.target==='r001.category.usageStatus'){c=d.categories.find(c=>c.categoryKey===s.categoryKey);if(['not_using','unanswered'].includes(c.usageStatus)){c.usageStatus='using';if(c.intention==='unanswered')c.intention='undecided';}}else d.overview[b.target.split('.').at(-1)]=b.target.endsWith('.family')?'hidden':'yes';}
if(equal(d,before))return current;
const oldRecords=new Map(recordList(before).map(r=>[r.recordId,r]));for(const r of recordList(d)){const old=oldRecords.get(r.recordId);r.revision=old?(equal(r,old)?old.revision:old.revision+1):1;revision(r.revision);}
d.globalRevision=(current?.globalRevision??0)+1;validate(d);if(checkCapacity)assertCapacity(capacity(d));return d;}
export function classify(e){if(e instanceof SaveError)return e.code;if(e?.name==='QuotaExceededError')return 'quota';if(['SecurityError','NotSupportedError','InvalidStateError'].includes(e?.name))return 'restricted';if(['AbortError','TransactionInactiveError'].includes(e?.name))return 'temporary';return 'unknown';}
export const messages={capacity:'ヤットコの保存上限（10MB）を超えます。未保存の回答を画面に保持しています。',quota:'ブラウザー・端末の保存領域が不足している可能性があります。',restricted:'保存機能が制限されています。',conflict:'別のタブで更新されました。このタブの保存を停止しました。未保存回答を確認し、再読み込みしてください。',temporary:'一時的に保存できませんでした。未保存回答を保持しています。',unknown:'原因不明の保存失敗です。プライベートモードなど保存制限の可能性もあります。',validation:'入力内容を確認してください。',contradiction:'詳細整理と矛盾します。該当サービスの回答を先に確認してください。',version:'未対応の保存形式です。保存を停止しました。',collision:'記録IDを作成できないため保存を停止しました。'};
