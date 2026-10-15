// External preparation tool; not shipped in the frozen subject. Starting this server does not run a case.
import http from 'node:http';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import {lock,verifyTarget,sha} from './verify-target.mjs';
const i=process.argv.indexOf('--target');if(i<0)throw Error('--target <frozen subject directory> required');const root=verifyTarget(process.argv[i+1]),app='workflow/prototypes/YTK-F4/';
const routes=new Map(lock.files.filter(f=>f.path===app+'index.html'||/^workflow\/prototypes\/YTK-F4\/src\/[^/]+\.mjs$/.test(f.path)).map(f=>['/'+f.path.slice(app.length),f]));routes.set('/',routes.get('/index.html'));
http.createServer((req,res)=>{if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}const route=routes.get(req.url);if(!route){res.writeHead(404);res.end();return;}const b=readFileSync(path.join(root,route.path));if(sha(b)!==route.sha256){res.writeHead(409);res.end();return;}res.writeHead(200,{'Content-Type':route.path.endsWith('.html')?'text/html; charset=utf-8':'text/javascript; charset=utf-8','Cache-Control':'no-store'});res.end(req.method==='HEAD'?undefined:b);}).listen(4175,'127.0.0.1',()=>console.log('Frozen F5 static target '+lock.subjectCommit+' at http://127.0.0.1:4175; no API, no request/body logs'));
