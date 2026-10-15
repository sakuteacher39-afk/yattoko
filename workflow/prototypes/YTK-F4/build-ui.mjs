// Build a separate local F4 entry point; approved R001/R002 source files stay intact.
import {readFileSync,writeFileSync} from 'node:fs';
const root=new URL('./',import.meta.url);
let html=readFileSync(new URL('../YTK-R002/prototype.html',root),'utf8').replace(/\r\n/g,'\n');
function replace(a,b){if(!html.includes(a))throw Error('UI source drift: '+a.slice(0,70));html=html.replace(a,b);}
replace('<script>','<script type="module">\nimport {installBackupUI} from "./src/backup-ui.mjs";\nimport {CanonicalStore,SaveCoordinator,openDatabase} from "./src/storage.mjs";\nimport {id,normalizeName,effectiveIntention,manifest,messages,classify} from "./src/canonical.mjs";');
replace('(function(){','(async function(){');
replace('x.addEventListener("click",fn);','x.addEventListener("click",function(e){if(!f4Ready||f4State?.saving||f4State?.pending.length)return;fn(e);});');
replace('S.status[c.id]=o[0];if(!S.intent[c.id])S.intent[c.id]="undecided";render();','f4Save({type:"category",categoryKey:c.id,field:"usageStatus",value:o[0]});');
replace('S.intent[c.id]=o[0];render();','f4Save({type:"category",categoryKey:c.id,field:"intention",value:o[0]});');
replace('S.quick[key]=o[0];render();','f4Save({type:"overview",field:key,value:o[0]});');
replace('r2Push(name==="その他"?"other":"core");','if(name==="その他")r2Push("other");else f4Add(function(){r2Push("core");});');
replace('r2Push("core");});a.append(next);','try{R2.draft.serviceName=normalizeName(R2.draft.serviceName);f4Add(function(){r2Push("core");});}catch(e){R2.validationMessage=messages.validation;render();}});a.append(next);');
replace('R2.draft.usageStatus=v;','f4Save({type:"service",recordId:R2.draft.recordId,field:"usageStatus",value:v});');
replace('R2.draft.answers[q.k]=v;r2PruneHiddenAnswers();','f4Save({type:"service",recordId:R2.draft.recordId,field:q.k,value:v});');
replace('R2.draft.intentionOverride=o[0];render();','f4Save({type:"service",recordId:R2.draft.recordId,field:"intentionOverride",value:o[0]});');
const start=html.indexOf('function r2FinishDraft(){');const end=html.indexOf('function r2Usage',start);
html=html.slice(0,start)+'function r2FinishDraft(){f4Save({type:"completeService",recordId:R2.draft.recordId},function(){R2.screen="complete";R2.history=[];render(true);});}\n'+html.slice(end);
replace('R2.selectedCategory=rec.categoryId;R2.draft={categoryId:rec.categoryId','R2.selectedCategory=rec.categoryId;R2.draft={recordId:rec.recordId,categoryId:rec.categoryId');
// Do not preserve a cached inherited intention; derive from the current canonical parent each time.
replace('R2INT[rec.inheritedIntention]+"（カテゴリと同じ）"','R2INT[S.intent[rec.categoryId]||"undecided"]+"（カテゴリと同じ）"');
const resetStart=html.indexOf('function(){S={step:0,status:{},quick:');const resetEnd=html.indexOf('render(true);}',resetStart);
if(resetStart<0||resetEnd<0)throw Error('reset drift');
html=html.slice(0,resetStart)+'function(){if(!confirm("端末内の整理データをすべて削除しますか？"))return;f4Save({type:"deleteAll"},function(){S.step=0;R2.active=false;R2.draft=null;render(true);});}'+html.slice(resetEnd+'render(true);}'.length);
replace('最初からやり直す','端末内の整理をすべて削除');
html=html.replaceAll('入力内容は外部送信・永続保存しません。','入力内容は外部送信せず、このブラウザーのIndexedDBに保存します。')
.replaceAll('この試作版も外部送信・永続保存を行いません。','入力内容は外部送信せず、このブラウザーに保存します。')
.replaceAll('この試作では保存されません','このブラウザーに保存します')
.replaceAll('同じページを開いている間だけ状態を保持します。ページを閉じたり再読み込みすると、詳細整理の内容は残りません。','回答確定ごとに保存します。保存失敗時は未保存内容を画面に保持します。')
.replaceAll('この結果は端末内の一時状態です','この結果は端末内の整理データです')
.replaceAll('ページを再読み込みすると消えます。外部送信、localStorage、Cookie等への保存は行いません。','ブラウザーのデータ削除や長期間の未利用などで消える場合があります。外部送信は行いません。')
.replaceAll('このセッションで整理したもの','端末内で整理したもの');
replace('if(typeof document!=="undefined")render(true);',readFileSync(new URL('src/ui-adapter.inc',root),'utf8'));
// Avoid the legacy memory-only claims anywhere in the new entry point.
html=html.replaceAll('入力内容は外部送信されず、ページを閉じると消えます。','入力内容は外部送信せず、ブラウザーに保存します。');
const output=new URL('index.html',root);if(process.argv.includes('--check')){if(readFileSync(output,'utf8')!==html)throw Error('Generated UI drift');}else writeFileSync(output,html);
