import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
export {repo,target,subject,sha,json,put,git,verify,dependencies} from '../../YTK-F5-browser-preparation-20261026/runner/common.mjs';
import {repo,sha} from '../../YTK-F5-browser-preparation-20261026/runner/common.mjs';import {tree} from '../../YTK-F5-R02-29-relock-20261026/runner/common.mjs';
export const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),reference='1725d1fa939bd12b8dac896e72ed41e3ccabe58a';
export function history(){return tree(reference).map(f=>{const b=fs.readFileSync(path.join(repo,f.path));return{...f,bytes:b.length,sha256:sha(b)};});}
