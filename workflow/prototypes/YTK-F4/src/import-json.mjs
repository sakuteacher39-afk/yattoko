export class ImportError extends Error {constructor(code){super(code);this.code=code;}}
export const reject=code=>{throw new ImportError(code);};
export function exact(o,keys){if(!o||typeof o!=='object'||Array.isArray(o)||Object.keys(o).length!==keys.length||keys.some(k=>!Object.hasOwn(o,k)))reject('FIELDS');}
export function integer(v){if(!Number.isSafeInteger(v)||v<0)reject('NUMBER');}
export function unicode(s){if(typeof s!=='string')reject('STRING');for(let i=0;i<s.length;i++){const c=s.charCodeAt(i);if(c>=0xd800&&c<=0xdbff){const n=s.charCodeAt(++i);if(!(n>=0xdc00&&n<=0xdfff))reject('UNICODE');}else if(c>=0xdc00&&c<=0xdfff)reject('UNICODE');}}
export const bytes=text=>new TextEncoder().encode(text);
export function sameBytes(a,b){if(a.length!==b.length)return false;let diff=0;for(let i=0;i<a.length;i++)diff|=a[i]^b[i];return diff===0;}
export const ordered=(o,keys)=>Object.fromEntries(keys.map(k=>[k,o[k]]));
export function freeze(value){if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}
// Token scanner, before full JSON.parse. Each object tracks decoded keys; no second object tree.
export function scanJSON(text,maxServices){let i=0;
const limits={root:7,snapshot:7,overview:8,categories:6,services:10,answers:4,pending:11,operations:13,omittedScopes:6,canonicalValue:2,dependencyContext:3,checksum:2};
function whitespace(){while(text[i]===' '||text[i]==='\t'||text[i]==='\n'||text[i]==='\r')i++;}
function string(){const start=i++;let escaped=false;while(i<text.length){const c=text.charCodeAt(i++);if(c<32)reject('LEXICAL');if(escaped){escaped=false;continue;}if(c===92){escaped=true;continue;}if(c===34){const token=text.slice(start,i);if(token.length>4096)reject('TOKEN_LIMIT');let s;try{s=JSON.parse(token);}catch{reject('LEXICAL');}unicode(s);return s;}}reject('LEXICAL');}
function consume(depth,path){if(depth>16)reject('DEPTH');const ch=text[i];if(ch==='{'){i++;whitespace();const seen=new Set();let count=0;if(text[i]==='}'){i++;return;}while(true){whitespace();if(text[i]!=='"')reject('LEXICAL');const key=string();if(seen.has(key))reject('DUPLICATE_KEY');seen.add(key);if(++count>(limits[path]??32))reject('MEMBER_LIMIT');whitespace();if(text[i++]!==':')reject('LEXICAL');value(depth+1,key);whitespace();const end=text[i++];if(end==='}')return;if(end!==',')reject('LEXICAL');}}
if(ch==='['){i++;whitespace();let count=0;const limit=path==='categories'?12:path==='operations'||path==='dependsOnOperationIds'?256:path==='omittedScopes'?10_000:maxServices;if(text[i]===']'){i++;return;}while(true){if(++count>limit)reject('ARRAY_LIMIT');value(depth+1,path);whitespace();const end=text[i++];if(end===']')return;if(end!==',')reject('LEXICAL');}}
if(ch==='"'){string();return;}
for(const literal of ['null','true','false'])if(text.startsWith(literal,i)){i+=literal.length;return;}
const match=/^(?:0|[1-9][0-9]*)/.exec(text.slice(i));if(!match)reject('LEXICAL');i+=match[0].length;if(!Number.isSafeInteger(Number(match[0])))reject('NUMBER');}
function value(depth,path){const start=i;whitespace();consume(depth,path);if(path==='pending'&&bytes(text.slice(start,i)).length>1_000_000)reject('PENDING_LIMIT');}
value(0,'root');whitespace();if(i!==text.length)reject('LEXICAL');}
