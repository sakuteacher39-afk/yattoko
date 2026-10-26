import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
export {sha,bytes,json,git,put,verify,dependencies,oracle,canonicalSnapshot,manifest,data,reduce,sign,target,repo,subject} from '../../YTK-F5-regression-mini3-20261026/runner/common.mjs';
import {repo,sha} from '../../YTK-F5-regression-mini3-20261026/runner/common.mjs';import {tree} from '../../YTK-F5-R02-29-relock-20261026/runner/common.mjs';
export const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),reference='6911ae0c7f8890610bc02e9a821ce30cd39b6ba8',selected=['F2:RST-06','F3:R04-05'];
export function history(){return tree(reference).map(f=>{const b=fs.readFileSync(path.join(repo,f.path));return {...f,bytes:b.length,sha256:sha(b)};});}
