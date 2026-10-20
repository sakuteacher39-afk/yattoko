import {readFileSync,writeFileSync,readdirSync,lstatSync,mkdirSync,existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
export const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),repo=path.resolve(base,'../../..'),target=path.resolve(repo,'../F5-TARGET-1682740'),fixtureRoot=path.resolve(repo,'../F5-FIXTURES-99e566d'),prep=path.resolve(base,'../YTK-F5-preparation-20261015');
export const subject='168274010a1aa45794de98dc71ac5735cb9d0ae1',prior='99e566da100ee6924149ec3244893bbddf7e8c4d';
export const sha=b=>createHash('sha256').update(b).digest('hex'),json=p=>JSON.parse(readFileSync(p,'utf8')),encode=o=>Buffer.from(JSON.stringify(o));
export const git=(...a)=>execFileSync('git',a,{cwd:repo,maxBuffer:32*1024*1024});
export const put=(p,o)=>{mkdirSync(path.dirname(p),{recursive:true});writeFileSync(p,JSON.stringify(o,null,2)+'\n',{flag:'wx'});};
export function tree(commit){return git('ls-tree','-rz',commit).toString().split('\0').filter(Boolean).map(line=>{const m=line.match(/^(\d+) blob (\w+)\t([\s\S]+)$/);assert.ok(m,'Only ordinary blobs allowed');assert.equal(m[1],'100644');return {path:m[3],gitBlob:m[2]};});}
export function inventory(root,entries){const actual=[];function walk(p,rel=''){for(const n of readdirSync(p)){const r=rel?rel+'/'+n:n,full=path.join(p,n),st=lstatSync(full);assert.ok(!st.isSymbolicLink());if(st.isDirectory())walk(full,r);else actual.push(r);}}walk(root);assert.deepEqual(actual.sort(),entries.map(f=>f.path).sort());return entries.map(f=>{const b=readFileSync(path.join(root,f.path)),blob=createHash('sha1').update(`blob ${b.length}\0`).update(b).digest('hex');assert.equal(blob,f.gitBlob,f.path);return {...f,bytes:b.length,sha256:sha(b)};});}
export function verify(){const lock=json(path.join(base,'TARGET-LOCK.json'));const found=inventory(target,lock.files);assert.deepEqual(found,lock.files);const b=readFileSync(path.resolve(repo,'..',lock.archive.filename));assert.equal(b.length,lock.archive.bytes);assert.equal(sha(b),lock.archive.sha256);return found;}
export function history(){return tree(subject).filter(f=>f.path.startsWith('workflow/testing/')||f.path.startsWith('workflow/proposals/')).map(f=>{const b=readFileSync(path.join(repo,f.path));return {...f,workingBytes:b.length,workingSHA256:sha(b)};});}
// Variants are generated without executing subject code. Token boundaries come from an independent JSON tokenizer.
export function variants(){const control=readFileSync(path.join(fixtureRoot,'V-VALID-01.json')),text=control.toString('utf8');assert.equal(JSON.stringify(JSON.parse(text)),text);
 const tokens=[...text.matchAll(/"(?:[^"\\\u0000-\u001f]|\\(?:["\\/bfnrt]|u[0-9a-fA-F]{4}))*"|[{}\[\]:,]|true|false|null|(?:0|[1-9][0-9]*)/g)].map(m=>({value:m[0],start:m.index,end:m.index+m[0].length}));assert.equal(tokens.map(t=>t.value).join(''),text);
 const kind=t=>t.value.startsWith('"')?'string':/^[0-9]/.test(t.value)?'number':t.value;const pairs=new Map();for(let i=1;i<tokens.length;i++){const key=kind(tokens[i-1])+'→'+kind(tokens[i]);if(!pairs.has(key))pairs.set(key,tokens[i].start);}
 const positions=[{label:'leading',offset:0},{label:'trailing',offset:text.length},...[...pairs].map(([label,offset])=>({label,offset}))];
 const all=[{label:'canonical-control',raw:control,control:true,recipe:{fixture:'V-VALID-01'}}];
 for(const [name,w]of [['space',' '],['tab','\t'],['LF','\n'],['CR','\r']])for(const p of positions)all.push({label:name+':'+p.label,raw:Buffer.from(text.slice(0,p.offset)+w+text.slice(p.offset)),control:false,recipe:{whitespace:name,codePoint:w.charCodeAt(0),...p}});
 all.push({label:'mixed-all-token-boundaries',raw:Buffer.from(' \t\n\r'+tokens.map(t=>t.value).join(' \t\n\r')+' \t\n\r'),control:false,recipe:{allTokenBoundaries:true}});
 all.push({label:'pretty-JSON-LF',raw:Buffer.from(JSON.stringify(JSON.parse(text),null,2)),control:false,recipe:{indent:2}});return {control,positions,tokens:tokens.length,all};}
export function oracle(raw,control){const e=JSON.parse(raw.toString('utf8')),c=JSON.parse(control.toString('utf8'));assert.deepEqual(e,c);const payload={fileFormat:e.fileFormat,fileFormatVersion:e.fileFormatVersion,kind:e.kind,exportedAt:e.exportedAt,snapshot:e.snapshot,pending:e.pending};return {validJSON:true,sameParsedValue:true,sameOrderedSerialization:JSON.stringify(e)===control.toString('utf8'),checksumMatches:e.checksum.algorithm==='SHA-256'&&sha(encode(payload))===e.checksum.hex,rawMatchesCanonical:raw.equals(control),snapshotSHA256:sha(encode(e.snapshot)),computedChecksum:sha(encode(payload))};}
