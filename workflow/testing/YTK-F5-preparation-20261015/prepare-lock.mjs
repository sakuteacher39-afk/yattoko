import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const here=path.dirname(fileURLToPath(import.meta.url)),repo=path.resolve(here,'../../..');
export const TARGET='99e566da100ee6924149ec3244893bbddf7e8c4d';
export const app='workflow/prototypes/YTK-F4';
export const git=(...args)=>execFileSync('git',args,{cwd:repo,encoding:null});
const sourceCache=new Map();
export const source=p=>{if(!sourceCache.has(p))sourceCache.set(p,git('show',TARGET+':'+p).toString('utf8'));return sourceCache.get(p);};
export const hash=b=>createHash('sha256').update(b).digest('hex');
export const encode=o=>Buffer.from(JSON.stringify(o));
export const output=(p,o)=>{mkdirSync(path.dirname(path.join(here,p)),{recursive:true});writeFileSync(path.join(here,p),typeof o==='string'?o.trimEnd()+'\n':JSON.stringify(o,null,2)+'\n');};
export const root=repo,dir=here;
if(process.argv[1]===fileURLToPath(import.meta.url)){
 const files=git('ls-tree','-r','--name-only',TARGET).toString('utf8').trim().split('\n').map(p=>{const b=git('show',TARGET+':'+p);return {path:p,gitBlob:git('rev-parse',TARGET+':'+p).toString().trim(),bytes:b.length,sha256:hash(b)};});
 const archive=path.resolve(repo,'../F5-TARGET-99e566d.zip');
 output('TARGET-LOCK.json',{subjectCommit:TARGET,subjectTree:git('rev-parse',TARGET+'^{tree}').toString().trim(),sourceMode:'exact Git blob bytes; no LF normalization during target verification',archive:{filename:path.basename(archive),bytes:readFileSync(archive).length,sha256:hash(readFileSync(archive))},registry:{id:'ytk-free-v1-registry-20261015',schemaVersion:'ytk-f2-20261014-0d5dfa38',questionSchemaVersion:'ytk-qm-gitblob-4a9950b19813e74bc51de2246465096818d375ac'},files});
 const chrome='C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',node=process.execPath;
 output('ENVIRONMENT.json',{purpose:'F5 preparation inventory only; no SUT or formal test executed',os:'Microsoft Windows NT 10.0.26300.0',architecture:process.arch,node:{version:process.version,path:node,sha256:hash(readFileSync(node))},npm:'11.19.0',chrome:existsSync(chrome)?{path:chrome,version:'155.0.8059.40',sha256:hash(readFileSync(chrome)),executionStatus:'NOT RUN'}:null,dependencies:{fakeIndexedDB:'6.2.4',jsdom:'30.1.2',packageLockSHA256:hash(source(app+'/package-lock.json'))},browserOrigin:'http://127.0.0.1:4175',browserProfile:'work/f5-run/<runId>/chrome-profile',networkPolicy:'setup dependencies separately; during fixture/SUT runs loopback static assets only; block and record all other attempts without request body logging',rerunRule:'compare versions/binary hashes before formal execution; any mismatch records a new environment revision, never silently substitutes an engine',phase:'PREPARATION ONLY'});
 console.log('Prepared target lock: '+files.length+' files; '+TARGET);
}
