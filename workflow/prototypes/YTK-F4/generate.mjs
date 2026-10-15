import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
const root=new URL('./',import.meta.url);
const bytes=Buffer.from(readFileSync(new URL('../../specs/YTK-F4-canonical-question-manifest-v1.json',root),'utf8').replace(/\r\n/g,'\n'));
const sha=createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
if(sha!=='4a9950b19813e74bc51de2246465096818d375ac') throw Error('Unapproved manifest drift');
const prototype=readFileSync(new URL('../YTK-R002/prototype.html',root),'utf8');
const prototypeBytes=Buffer.from(prototype.replace(/\r\n/g,'\n'));
if(createHash('sha1').update('blob '+prototypeBytes.length+'\0').update(prototypeBytes).digest('hex')!=='7e302dad973b827d2ee5d6026369c9656adf0f35')throw Error('Unapproved R002 source drift');
const context={};vm.runInNewContext(prototype.match(/<script>([\s\S]*?)<\/script>/)[1],context);
const generated='// Generated from approved sources by generate.mjs; do not edit.\nexport const manifest='+JSON.stringify(JSON.parse(bytes))+';\nexport const catalog='+JSON.stringify(context.YTK.r2Catalog)+';\n';
const path=new URL('src/definitions.mjs',root);
if(process.argv.includes('--check')) {if(readFileSync(path,'utf8')!==generated)throw Error('Generated definitions drift');}
else writeFileSync(path,generated);
