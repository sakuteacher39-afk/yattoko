import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
export {sha,bytes,json,git,put,verify,dependencies,canonicalSnapshot,manifest,data,target,repo,subject} from '../../YTK-F5-regression-mini3-20261026/runner/common.mjs';
import {repo,sha} from '../../YTK-F5-regression-mini3-20261026/runner/common.mjs';import {tree} from '../../YTK-F5-R02-29-relock-20261026/runner/common.mjs';
export const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),reference='df8181591e17f2c081a0b1f8e7c024d9e504fcf6',selected=['F3:R07-06'];
export function history(){return tree(reference).map(f=>{const b=fs.readFileSync(path.join(repo,f.path));return {...f,bytes:b.length,sha256:sha(b)};});}
