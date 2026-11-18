import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
export const root=resolve(process.env.YTK_PRODUCT??'workflow/prototypes/YTK-F4');
export const read=p=>readFileSync(resolve(root,p),'utf8');
const moduleAt=p=>import(pathToFileURL(resolve(root,'src',p+'.mjs')));
export const [C,B,I,R,S,A,F]=await Promise.all(['canonical','backup','import-backup','restore','storage','reapply','file-save'].map(moduleAt));
const {IDBFactory}=createRequire(resolve(root,'package.json'))('fake-indexeddb');
export const store=async(factory=new IDBFactory())=>new S.CanonicalStore(await S.openDatabase(factory));
export const cat=(key='device',value='using',field='usageStatus')=>({type:'category',categoryKey:key,field,value});
export const add=(key='subscription',name='Example',rid=C.id('svc'))=>({type:'addService',recordId:rid,categoryKey:key,serviceCatalogId:'other',otherServiceName:name});
export const sv=(id,field,value)=>({type:'service',recordId:id,field,value});
export const mut=(d,op)=>C.mutate(d,op,C.id('gen'));
export const base=()=>mut(null,cat());
export const opFile=text=>{const b=new TextEncoder().encode(text);return {size:b.length,arrayBuffer:async()=>b.buffer}};
export const sha=x=>createHash('sha256').update(x).digest('hex');
export const normal=async(d,opts={})=>JSON.parse(new TextDecoder().decode((await B.createBackup({read:async()=>d},opts)).bytes));
export const token=e=>I.importBackup(opFile(JSON.stringify(e)));
export const resign=e=>{const {checksum,...payload}=e;e.checksum={algorithm:'SHA-256',hex:sha(JSON.stringify(payload))};return e};
export const restore=async(s,t)=>R.commitRestore(s,await R.prepareRestore(s,t),{confirmed:true});
export const keys='device base mail social cloud subscription finance commerce auth license carrier business'.split(' ');
export const cases=new Map();
export function reg(key,fn){if(cases.has(key))throw Error(key);cases.set(key,fn);}
export function group(prefix){return (num,fn)=>reg(prefix+'-'+String(num).padStart(2,'0'),fn)}
export const observations=[];
function evidence(value){
 if(value instanceof Error)return {name:value.name,code:value.code,message:value.message};
 const s=JSON.stringify(value);if(s===undefined)return {type:typeof value};
 if(s.length<360)return value;
 return {bytes:Buffer.byteLength(s),sha256:sha(s)};
}
function record(method,expected,actual){
 observations.push({check:method,expected:evidence(expected),actual:evidence(actual)});
}
export function eq(actual,expected){record('equal',expected,actual);assert.equal(actual,expected)}
export function de(actual,expected){record('deepEqual',expected,actual);assert.deepEqual(actual,expected)}
export function ok(actual){record('truthy',true,!!actual);assert.ok(actual)}
export function throws(fn,expected){let caught;try{fn()}catch(err){caught=err}record('throws',expected??'exception',caught);assert.throws(()=>{if(caught)throw caught},expected)}
export async function rejects(fn,expected){let caught;try{await (typeof fn==='function'?fn():fn)}catch(err){caught=err}record('rejects',expected??'exception',caught);await assert.rejects(async()=>{if(caught)throw caught},expected)}

export function edit(store,name,fn){return new Promise((yes,no)=>{const tx=store.db.transaction(name,'readwrite');fn(tx.objectStore(name));tx.oncomplete=yes;tx.onabort=no})}
export async function rejectUnchanged(s,fn,code){const old=await s.read();await rejects(fn,code?{code}:undefined);de(await s.read(),old)}
