import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {registry,manifest} from '../src/canonical.mjs';
const source=p=>readFileSync(new URL(p,import.meta.url),'utf8').replace(/\r\n/g,'\n');
const blob=text=>{const b=Buffer.from(text);return createHash('sha1').update(`blob ${b.length}\0`).update(b).digest('hex');};
test('stage4 approved R001/R002/manifest bytes and ACTIVE registry remain pinned',()=>{
 assert.equal(blob(source('../../YTK-R001/prototype.html')),'f090acdea6bb117f49614689ecf725b0cd14f2de');
 assert.equal(blob(source('../../YTK-R002/prototype.html')),'7e302dad973b827d2ee5d6026369c9656adf0f35');
 const normative=source('../../../specs/YTK-F4-canonical-question-manifest-v1.json');
 assert.equal(blob(normative),'4a9950b19813e74bc51de2246465096818d375ac');assert.deepEqual(manifest,JSON.parse(normative));
 assert.deepEqual(registry,{id:'ytk-free-v1-registry-20261015',status:'ACTIVE',fileFormatVersion:1,schemaVersion:'ytk-f2-20261014-0d5dfa38',questionSchemaVersion:'ytk-qm-gitblob-4a9950b19813e74bc51de2246465096818d375ac'});
});
test('stage4 runtime sources have no network/log/storage alternatives or dynamic code sinks',()=>{
 const texts=readdirSync(new URL('../src/',import.meta.url)).map(p=>[p,source('../src/'+p)]);texts.push(['index.html',source('../index.html')]);
 for(const [name,text] of texts){assert.doesNotMatch(text,/\b(?:fetch|XMLHttpRequest|WebSocket|EventSource|sendBeacon|eval|Function)\s*\(|\bconsole\s*(?:\.|\[)|\b(?:localStorage|sessionStorage)\b|https?:\/\//,name);assert.doesNotMatch(text,/\bon[a-z]+\s*=\s*["']|\b(?:insertAdjacentHTML|document\.write)\s*\(/,name);}
 const html=source('../index.html');for(const match of html.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/gi))assert.ok(match[1].startsWith('./')||match[1].startsWith('#'),match[1]);
 // The inherited render clears a fixed container; variable user text is never assigned as HTML.
 for(const [name,text] of texts)for(const match of text.matchAll(/\.innerHTML\s*=\s*([^;]+);/g))assert.equal(match[1],'""',name);
});
