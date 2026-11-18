import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {IDBFactory} from 'fake-indexeddb';
import {CanonicalStore,openDatabase} from './storage.mjs';
import {createBackup} from './backup.mjs';
import {importBackup} from './import-backup.mjs';
import {prepareRestore,commitRestore} from './restore.mjs';
export const read=name=>fs.readFileSync(new URL(name,import.meta.url),'utf8');
export const digest=data=>createHash('sha256').update(data).digest('hex');
export const fingerprint=o=>{const b=Buffer.from(JSON.stringify(o));return {bytes:b.length,sha256:digest(b)}};
const fixtures={};
const recipe=read('prepare-fixtures.mjs');
const code=recipe.slice(recipe.indexOf('const schema='),recipe.indexOf('const body='))+recipe.slice(recipe.indexOf('const d=base();'),recipe.indexOf('const cond=base();'));
vm.runInNewContext(code,{M:JSON.parse(read('manifest.json')),save:(key,value)=>fixtures[key]=structuredClone(value)});
for(const [id,value] of Object.entries(fixtures)){
 const listed=JSON.parse(read('FIXTURES.json')).fixtures.find(x=>x.id===id);
 assert.deepEqual(fingerprint(value),{bytes:listed.bytes,sha256:listed.sha256});
}
export {fixtures};
export const newStore=async()=>new CanonicalStore(await openDatabase(new IDBFactory()));
export function envelope(snapshot){return {fileFormat:'yattoko-backup',fileFormatVersion:1,kind:'normal',exportedAt:'2026-10-15T00:00:00.000Z',snapshot,pending:null}}
export function sign(body){return {...body,checksum:{algorithm:'SHA-256',hex:fingerprint(body).sha256}}}
export function parse(obj){const bytes=new TextEncoder().encode(JSON.stringify(obj));return importBackup({size:bytes.length,arrayBuffer:async()=>bytes.buffer})}
export const install=async(s,t)=>commitRestore(s,await prepareRestore(s,t),{confirmed:true});
export const snapshot=async(s,opts)=>JSON.parse(new TextDecoder().decode((await createBackup(s,opts)).bytes));
export function ui(name){const ctx={};vm.runInNewContext(read(name).match(/<script>([\s\S]*?)<\/script>/)[1],ctx);return ctx.YTK}
export const cat=(key,value)=>({type:'category',categoryKey:key,field:'usageStatus',value});
