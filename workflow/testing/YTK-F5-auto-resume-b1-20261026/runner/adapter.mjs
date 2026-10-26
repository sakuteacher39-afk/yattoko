import path from 'node:path';import {pathToFileURL} from 'node:url';import {target} from './common.mjs';
export {observe,selfCheck} from '../../YTK-F5-regression-R02-mini1-20261020/runner/adapter.mjs';
export async function loadSubject(){return {imports:await import(pathToFileURL(path.join(target,'workflow/prototypes/YTK-F4/src/import-backup.mjs')))};}
