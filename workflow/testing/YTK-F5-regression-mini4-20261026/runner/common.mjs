import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
export {sha,bytes,json,git,put,verify,dependencies,oracle,canonicalSnapshot,manifest,data,reduce,sign,target,repo,subject,fixture} from '../../YTK-F5-regression-mini3-20261026/runner/common.mjs';
export {payload,canonicalPending,codePoints} from '../../YTK-F5-regression-R02-mini1-20261020/runner/common.mjs';
import {repo,sha} from '../../YTK-F5-regression-mini3-20261026/runner/common.mjs';import {tree} from '../../YTK-F5-R02-29-relock-20261026/runner/common.mjs';
export const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),reference='545ca3ba876a4bcc8854c426153737b32d9a4eb5',selected=['F3:R04-01','F3:R04-02','F3:R04-15','F3:R01-02','F2:RST-01','F2:RST-03','F3:R07-03','F3:R07-04','F3:R07-06','F3:R07-07','F3:R07-08','F3:R07-13','F3:R07-14','F3:R02-08','F3:R02-09','F3:R02-10','F3:R02-13','F3:R02-25','F3:R02-30','F3:R02-39'];
export function history(){return tree(reference).map(f=>{const b=fs.readFileSync(path.join(repo,f.path));return {...f,bytes:b.length,sha256:sha(b)};});}
