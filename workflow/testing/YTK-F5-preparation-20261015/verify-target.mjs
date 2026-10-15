import {readFileSync,readdirSync,lstatSync,realpathSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
const dir=path.dirname(fileURLToPath(import.meta.url));
export const lock=JSON.parse(readFileSync(path.join(dir,'TARGET-LOCK.json'),'utf8'));
export const sha=b=>createHash('sha256').update(b).digest('hex');
export function verifyTarget(target){const root=realpathSync(target),seen=[];const walk=(p,relative='')=>{for(const name of readdirSync(p)){const r=relative?relative+'/'+name:name,full=path.join(p,name),stat=lstatSync(full);assert.ok(!stat.isSymbolicLink(),'Subject link prohibited '+r);if(stat.isDirectory())walk(full,r);else seen.push(r);}};walk(root);
 assert.deepEqual(seen.sort(),lock.files.map(f=>f.path).sort(),'Snapshot must contain exactly the frozen 123 files; no injected harness/dependencies');
 for(const f of lock.files){const b=readFileSync(path.join(root,f.path));assert.equal(b.length,f.bytes,f.path+' length');assert.equal(sha(b),f.sha256,f.path+' SHA256');}return root;
}
if(process.argv[1]===fileURLToPath(import.meta.url)){const i=process.argv.indexOf('--target');if(i<0)throw Error('--target <extracted subject directory> required');verifyTarget(process.argv[i+1]);console.log('Frozen target verified: '+lock.subjectCommit+' / '+lock.files.length+' files. No SUT execution.');}
