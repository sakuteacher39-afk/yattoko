import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';import assert from 'node:assert/strict';
import {tree,inventory} from '../../YTK-F5-R02-09-relock-20261020/runner/common.mjs';
import {oracle as oldOracle,payload as orderedPayload} from '../../YTK-F5-regression-R02-mini1-20261020/runner/common.mjs';
export const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),repo=path.resolve(base,'../../..'),target=path.resolve(repo,'../F5-TARGET-15a146a'),subject='15a146a9b2c4f80c63798eb31d64b6774a4c2e99',previous='168274010a1aa45794de98dc71ac5735cb9d0ae1',prep=path.resolve(base,'../YTK-F5-preparation-20261015'),legacy=path.resolve(base,'../YTK-F5-regression-R02-mini1-20261020');
export const sha=b=>createHash('sha256').update(b).digest('hex'),json=p=>JSON.parse(fs.readFileSync(p,'utf8')),bytes=o=>Buffer.from(JSON.stringify(o)),git=(...a)=>execFileSync('git',a,{cwd:repo,maxBuffer:64*1024*1024}),put=(p,o)=>{fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,JSON.stringify(o,null,2)+'\n',{flag:'wx'});};
export function oracle(b){return JSON.parse(JSON.stringify(oldOracle(b)));}
export const payload=orderedPayload;
export function verify(){const lock=json(path.join(base,'TARGET-LOCK.json')),found=inventory(target,lock.files);assert.deepEqual(found,lock.files);const archive=fs.readFileSync(path.join(base,'archive',lock.archive.filename));assert.equal(archive.length,lock.archive.bytes);assert.equal(sha(archive),lock.archive.sha256);return found;}
export function history(){return tree(subject).map(f=>{const b=fs.readFileSync(path.join(repo,f.path));return {...f,bytes:b.length,sha256:sha(b)};});}
export {tree,inventory};
export function resign(e){const {checksum,...body}=e;return bytes({...body,checksum:{algorithm:'SHA-256',hex:sha(bytes(body))}});}
export function variants(){const fixtureRoot=path.resolve(repo,'../F5-FIXTURES-99e566d'),sources=['V-VALID-01','EM-FULL','EM-PARTIAL','EM-NONE-DELETEALL'].map(id=>({id,raw:fs.readFileSync(path.join(fixtureRoot,id+'.json'))}));const empty=JSON.parse(sources[0].raw);empty.kind='emergency';sources.push({id:'EM-EMPTY-DERIVED',raw:resign(empty)});
 const out=[];function add(label,raw,accepted,options={}){const e=JSON.parse(raw),digests=accepted?(e.pending===null?1:3):options.digests??3;out.push({label,raw,source:options.source??null,failAt:options.failAt??null,invalidDigestLength:options.invalidDigestLength??null,expected:{accepted,fullParses:1,digestCalls:digests,parsedGraphUnchanged:true,writeAttempts:0,inputUnchanged:true,storageAccesses:0,...(accepted?{tokenDeepFrozen:true,tokenGraphDisjoint:true,tokenJSONMatchesRaw:true,tokenWriteAttemptsBlocked:true,sourceMutationCannotChangeToken:true}: {tokenProduced:false})},expectedOracle:oracle(raw)});}
 for(const s of sources){add(s.id+'-success',s.raw,true,{source:s.id});const bad=JSON.parse(s.raw);bad.checksum.hex='0'.repeat(64);add(s.id+'-checksum-mismatch',bytes(bad),false,{source:s.id,digests:1});add(s.id+'-SHA-reject',s.raw,false,{source:s.id,digests:1,failAt:1});const schema=JSON.parse(s.raw);if(schema.snapshot.services.length)schema.snapshot.services[0].answers.extra='dummy';else{delete schema.snapshot.overview.identity;schema.snapshot.overview.extra='dummy';}add(s.id+'-schema-invalid',resign(schema),false,{source:s.id,digests:0});}
 const full=JSON.parse(sources[1].raw);for(const [label,change]of [
  ['missing-dependency',e=>e.pending.operations[1].dependsOnOperationIds=[]],
  ['duplicate-dependency',e=>e.pending.operations[1].dependsOnOperationIds.push(e.pending.operations[0].operationId)],
  ['reversed-dependencies',e=>e.pending.operations[2].dependsOnOperationIds.reverse()],
  ...[null,'bad',{},42,true,[{}],[['bad']],['unknown']].map((value,i)=>['invalid-dependency-'+i,e=>e.pending.operations[0].dependsOnOperationIds=value]),
  ['count-invalid',e=>e.pending.candidateCount++],
  ['snapshot-base-checksum-invalid',e=>e.pending.baseSnapshotChecksumSha256='0'.repeat(64)],
  ['content-base-checksum-invalid',e=>e.pending.baseContentFingerprintSha256='0'.repeat(64)]
 ]){const e=structuredClone(full);change(e);add(label,resign(e),false,{source:'EM-FULL',digests:label==='count-invalid'?1:label==='snapshot-base-checksum-invalid'?2:3});}
 for(const step of [2,3])add('EM-FULL-SHA-reject-at-'+step,sources[1].raw,false,{source:'EM-FULL',digests:step,failAt:step});
 for(const len of [0,31,33])add('EM-FULL-invalid-SHA-length-'+len,sources[1].raw,false,{source:'EM-FULL',digests:1,invalidDigestLength:len});
 return {sources,out};}
