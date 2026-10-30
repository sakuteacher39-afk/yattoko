import {execFileSync} from 'node:child_process';import assert from 'node:assert/strict';
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
export {repo,target,subject,sha,json,put,verify,dependencies} from '../../YTK-F5-browser-preparation-20261026/runner/common.mjs';export {encode,versions,matches} from '../../YTK-F5-auto-resume-b1-20261026/runner/common.mjs';import {repo,sha,dependencies} from '../../YTK-F5-browser-preparation-20261026/runner/common.mjs';import {tree} from '../../YTK-F5-R02-29-relock-20261026/runner/common.mjs';
export const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),old=path.resolve(base,'../YTK-F5-auto-resume-b5-20261028'),reference='707cf0e2909135b5a68aadc5e9555ab5fd796bd9',ids=[...['01','02','03','04','05','06','08','10'].map(n=>'F2:BKP-'+n),...['01','05','08','09','10','11'].map(n=>'F3:R01-'+n)];export const dependencyInventory=dependencies;
export const git=(...args)=>execFileSync('git',['-c','core.longpaths=true',...args],{cwd:repo,maxBuffer:256*1024*1024});
export function history(){return git('ls-tree','-rz',reference).toString().split('\0').filter(Boolean).map(line=>{const m=line.match(/^(\d+) blob (\w+)\t([\s\S]+)$/);assert.ok(m);assert.equal(m[1],'100644');return{path:m[3],gitBlob:m[2]};}).map(f=>{const b=fs.readFileSync(path.join(repo,f.path));return{...f,bytes:b.length,sha256:sha(b)};});}
export const memory=()=>({...process.memoryUsage(),at:new Date().toISOString()});
export const errorRecord=e=>({name:e.name,message:e.message,code:e.code??null,stack:e.stack??null});
