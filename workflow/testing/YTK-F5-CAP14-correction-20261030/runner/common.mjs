import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
export {repo,target,subject,sha,json,put,git,verify,dependencies} from '../../YTK-F5-browser-preparation-20261026/runner/common.mjs';export {encode,versions,matches} from '../../YTK-F5-auto-resume-b1-20261026/runner/common.mjs';import {repo,sha,dependencies} from '../../YTK-F5-browser-preparation-20261026/runner/common.mjs';import {tree} from '../../YTK-F5-R02-29-relock-20261026/runner/common.mjs';
export const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),old=path.resolve(base,'../YTK-F5-auto-resume-b5-20261028'),reference='8cddda3f34bbc856eae0eeaf75dd9b634ebb7d08',ids=['F2:CAP-14'];export const dependencyInventory=dependencies;
export function history(){return tree(reference).map(f=>{const b=fs.readFileSync(path.join(repo,f.path));return{...f,bytes:b.length,sha256:sha(b)};});}
export const memory=()=>({...process.memoryUsage(),at:new Date().toISOString()});
export const errorRecord=e=>({name:e.name,message:e.message,code:e.code??null,stack:e.stack??null});
