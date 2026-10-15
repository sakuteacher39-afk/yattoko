import {createBackup} from './backup.mjs';
import {requestFileSave} from './file-save.mjs';
export const PLAINTEXT_WARNING='このバックアップファイルは暗号化されていません。整理したサービス名・利用状況・本人意向などを、ファイルを開ける人が読めます。共有端末や共有フォルダへの保存、不要な共有は避けてください。保存先によってはiCloud Driveなどへ自動同期されることがあります。ヤットコがこのファイルを自動でアップロードすることはありません。';
export function installBackupUI(document,{getStore,getCapture,getCategoryLabel=key=>key,create=createBackup,save=requestFileSave}){
const element=(tag,text)=>{const e=document.createElement(tag);if(text)e.textContent=text;return e;};
const panel=element('section');panel.className='panel';panel.id='backup-panel';
panel.append(element('h2','バックアップ'),element('p',PLAINTEXT_WARNING),element('p','SHA-256は破損確認用です。内容を隠したり、作成者を証明したりする機能ではありません。'),element('p','通常バックアップの対象：保存が完了した回答、未回答の項目、途中・完了済みのサービス。対象外：未保存回答、入力中のサービス名、画面位置・履歴、秘密情報。緊急退避は検査に通った未保存回答を別領域に含めます。'),element('p','ファイル上限16,000,000 bytes・未保存領域1,000,000 bytes・256操作は暫定値です。実機での安全性は未検証です。'));
const label=element('label'),ack=element('input');ack.type='checkbox';ack.id='backup-ack';label.append(ack,document.createTextNode('暗号化されていないファイルの取扱いを確認しました'));panel.append(label);
const normal=element('button','通常バックアップを作成'),emergency=element('button','未保存回答を緊急退避'),download=element('button','ファイル保存の操作へ進む'),cancel=element('button','ファイル作成を取り消す');
for(const b of [normal,emergency,download,cancel]){b.type='button';b.className='btn secondary';panel.append(b);}
const status=element('p');status.id='backup-status';status.setAttribute('aria-live','polite');panel.append(status);document.getElementById('app').after(panel);
let artifact=null,busy=false,token=0;
function refresh(){const ready=Boolean(getStore())&&ack.checked&&!busy;normal.disabled=!ready;emergency.disabled=!ready;download.disabled=busy||!artifact||!ack.checked;cancel.disabled=busy||!artifact;}
ack.addEventListener('change',refresh);
function summaryText(a){const p=a.summary;if(!p)return a.kind==='normal'?'確定済みデータだけをファイルに含めました。この画面の未保存回答・入力中のサービス名は含まれていません。':'未保存回答の候補は0件です。';let text=`未保存回答の候補 ${p.candidateCount}件、収録 ${p.exportedCount}件、未収録 ${p.omittedCount}件。`;if(p.omittedCount){text+=' 未収録の範囲：'+p.omittedScopes.map(s=>`${s.categoryKey?getCategoryLabel(s.categoryKey):'全体'}／${({service:'サービス',overview:'概要',category:'カテゴリ',unknown:'対象不明'})[s.targetKind]}／回答${s.ordinalStart}〜${s.ordinalEnd}（${({INVALID_VALUE:'入力を検査できません',DEPENDENCY_MISSING:'必要な先行回答がありません',BASE_CONFLICT:'元の保存データが変更されています',PENDING_BYTES_LIMIT:'未保存領域の暫定容量上限',PENDING_COUNT_LIMIT:'未保存操作の暫定件数上限',UNSUPPORTED_OPERATION:'対応していない操作'})[s.reasonCode]??'依存する回答を検査できません'}）`).join('、')+'。';}if(p.captureStatus==='none')text+='未保存回答は退避できませんでした。確定済みデータと未収録件数だけのファイルです。';return text;}
async function prepare(kind){if(busy||!ack.checked)return;busy=true;artifact=null;const request=++token;status.textContent='ファイルを作成しています…';refresh();try{const capture=kind==='emergency'?getCapture():{};const a=await create(getStore(),{kind,...capture});if(request!==token)return;artifact=a;status.textContent=summaryText(a)+' まだ保存操作は開始していません。'+(kind==='emergency'?'元の未保存回答は画面に残っています。':'');}catch(e){status.textContent=e?.code==='EMPTY'?'保存済みデータがありません。空のバックアップは作成しません。未保存入力がある場合も画面に残っています。':'ファイルを作成できませんでした。未保存回答は退避されていません。この画面を閉じず、内容を確認してください。';}finally{busy=false;refresh();}}
normal.addEventListener('click',()=>void prepare('normal'));emergency.addEventListener('click',()=>void prepare('emergency'));
download.addEventListener('click',async()=>{if(busy||!artifact||!ack.checked)return;busy=true;refresh();const active=artifact;try{const result=await save(active);status.textContent=summaryText(active)+(result.status==='cancelled'?' 保存操作が取り消されました。ファイル保存は確認できていません。':' ファイル保存の操作を開始しました。保存先にファイルがあることを確認してください。ブラウザー側のキャンセルは検知できない場合があります。');}catch{status.textContent='ファイル保存の操作を開始できませんでした。ファイルの退避は確認できていません。';}finally{status.textContent+=' 未保存回答は画面に保持しています。確認できるまでこの画面を閉じないでください。';busy=false;refresh();}});
cancel.addEventListener('click',()=>{artifact=null;token++;status.textContent='ファイル作成を取り消しました。保存操作は開始していません。未保存回答は画面に残っています。';refresh();});
refresh();return {refresh};
}
