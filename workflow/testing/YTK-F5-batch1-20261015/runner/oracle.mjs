import {readFileSync} from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
export const here=path.dirname(fileURLToPath(import.meta.url));
export const batch=path.resolve(here,'..'),repo=path.resolve(batch,'../../..');
export const prep=path.resolve(batch,'../YTK-F5-preparation-20261015');
export const subject=path.resolve(repo,'../F5-TARGET-99e566d');
export const fixtures=path.resolve(repo,'../F5-FIXTURES-99e566d');
export const sha=b=>createHash('sha256').update(b).digest('hex');
export const bytes=o=>Buffer.from(JSON.stringify(o));
export const json=p=>JSON.parse(readFileSync(p,'utf8'));
export const fixture=id=>readFileSync(path.join(fixtures,id+'.json'));
export const data=id=>JSON.parse(fixture(id));
export const clone=o=>structuredClone(o);
export function signed(e){const p=Object.fromEntries(Object.entries(e).filter(([k])=>k!=='checksum'));return bytes({...p,checksum:{algorithm:'SHA-256',hex:sha(bytes(p))}});}
export const altered=(fn,id='V-VALID-01')=>{const e=data(id);fn(e);return signed(e);};
export const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
export const keys=['device','base','mail','social','cloud','subscription','finance','commerce','auth','license','carrier','business'];
export const versions={id:'ytk-free-v1-registry-20261015',status:'ACTIVE',fileFormatVersion:1,schemaVersion:'ytk-f2-20261014-0d5dfa38',questionSchemaVersion:'ytk-qm-gitblob-4a9950b19813e74bc51de2246465096818d375ac'};
export const ids={a:'svc_00000000-0000-4000-8000-000000000001',b:'svc_00000000-0000-4000-8000-000000000002',c:'svc_00000000-0000-4000-8000-000000000003'};
export const badUUID=['00000000-0000-1000-8000-000000000001','00000000-0000-7000-8000-000000000001','00000000-0000-4000-7000-000000000001','AAAAAAAA-AAAA-4AAA-8AAA-AAAAAAAAAAAA','{00000000-0000-4000-8000-000000000001}','00000000-0000-4000-8000-00000000000g'];
export const codePoints=[...Array.from({length:32},(_,i)=>i),127,...Array.from({length:32},(_,i)=>128+i),0x061c,0x200e,0x200f,...Array.from({length:5},(_,i)=>0x202a+i),...Array.from({length:4},(_,i)=>0x2066+i)];
export function manifestShape(m){const exact=(o,k)=>o&&typeof o==='object'&&!Array.isArray(o)&&JSON.stringify(Object.keys(o).sort())===JSON.stringify([...k].sort());const enumDef=(v,nullable=false)=>exact(v,['values','presence'])&&v.presence==='required'&&Array.isArray(v.values)&&v.values.length>0&&new Set(v.values).size===v.values.length&&v.values.every(x=>typeof x==='string'||nullable&&x===null);
 if(!exact(m,['manifestFormatVersion','scope','categoryKeys','r001','r002','presenceRules','validatorBindings'])||m.manifestFormatVersion!==1||!m.scope||JSON.stringify(m.categoryKeys)!==JSON.stringify(keys))return false;
 if(!exact(m.r001,['category','overview'])||!exact(m.r001.category,['usageStatus','intention'])||!Object.values(m.r001.category).every(v=>enumDef(v))||!exact(m.r001.overview,['identity','billing','finance','data','family'])||!Object.values(m.r001.overview).every(v=>enumDef(v)))return false;
 if(!exact(m.r002,['serviceCore','questions'])||!exact(m.r002.serviceCore,['recordState','usageStatus','intentionOverride'])||!Object.entries(m.r002.serviceCore).every(([k,v])=>enumDef(v,k==='intentionOverride'))||!exact(m.r002.questions,keys))return false;
 for(const list of Object.values(m.r002.questions)){if(!Array.isArray(list)||!list.length||new Set(list.map(q=>q.key)).size!==list.length)return false;for(const q of list)if(!exact(q,['key','values','presence'])||typeof q.key!=='string'||!Array.isArray(q.values)||q.values.some(v=>typeof v!=='string')||new Set(q.values).size!==q.values.length||!(q.presence.type==='always'?exact(q.presence,['type']):q.presence.type==='equals'&&exact(q.presence,['type','questionKey','value'])))return false;}
 return exact(m.presenceRules,['unconditional','conditionalActive','conditionalInactive','parentTransition'])&&Object.values(m.presenceRules).every(v=>typeof v==='string')&&exact(m.validatorBindings,['positiveDirection','negativeDirection','F2_R07','F2_R08','F2_R09'])&&Array.isArray(m.validatorBindings.positiveDirection)&&m.validatorBindings.positiveDirection.length===5&&['negativeDirection','F2_R07','F2_R08','F2_R09'].every(k=>typeof m.validatorBindings[k]==='string');
}
