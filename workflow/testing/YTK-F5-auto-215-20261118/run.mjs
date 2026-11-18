import {readFileSync,writeFileSync} from 'node:fs';
import {cases,root,read,sha,de,observations} from './common.mjs';
import './basic.mjs';import './registry.mjs';import './backup.mjs';import './restore.mjs';import './reapply.mjs';
const path=new URL('./',import.meta.url);
const ids=JSON.parse(readFileSync(new URL('ids.json',path)));
de([...cases.keys()].sort(),[...ids].sort());
const expectations=new Map(JSON.parse(read('F5-F6-TRACEABILITY.json')).rows.map(r=>[r.key,r.expectation]));
const selected=ids.filter(id=>!process.env.ONLY||new RegExp(process.env.ONLY).test(id));
const results=[];for(const caseId of selected){const start=Date.now();observations.length=0;let result={caseId,expectation:expectations.get(caseId)};try{result.observation=await cases.get(caseId)()??null;result.status=result.observation?.limitation?'PARTIAL':'MATCH'}catch(e){result.status='INVESTIGATE';result.error=e.stack?.split('\n').slice(0,9).join('\n')??String(e)}result.startedAt=new Date(start).toISOString();result.ms=Date.now()-start;result.assertions=structuredClone(observations);results.push(result);console.log(result.status,caseId,result.error?.split('\n')[0]??'');writeFileSync(new URL(process.env.OUT??'results.json',path),JSON.stringify(results,null,2)+'\n')}
