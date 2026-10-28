import fs from 'node:fs';import path from 'node:path';import {base,subject,reference,json,put,sha} from './common.mjs';
const p=json(path.join(base,'PREEXECUTION.json')),a=json(path.join(base,'AUDIT.json')),next=json(path.join(base,'REMAINING-AND-NEXT.json')),run=path.join(base,'runs',p.runId),summary=json(path.join(run,'SUMMARY.json')),rows=p.cases.map(c=>{const f=path.join(run,'cases',c.caseId.replace(':','-'),'result.json');if(!fs.existsSync(f))return{caseId:c.caseId,status:'NOT RUN',completed:0,planned:c.vectors.length,sha256:''};const r=json(f);return{caseId:c.caseId,status:r.status,completed:r.completedVariants,planned:r.plannedVariants,attempt:r.attempt,sha256:sha(fs.readFileSync(f))};});
fs.writeFileSync(path.join(base,'CASE-RESULTS.csv'),['caseId,status,completedVariants,plannedVariants,attempt,resultSHA256',...rows.map(r=>[r.caseId,r.status,r.completed,r.planned,r.attempt??'',r.sha256].join(','))].join('\n')+'\n',{flag:'wx'});
const text=`# F5自動試験再開 第5バッチ：制作管理室提出

固定製品：\`${subject}\`。直近成果物：\`${reference}\`。専用ブランチ：\`codex/f5-auto-resume-batch5\`。

実行前固定commit：\`${summary.runnerCommit}\`。run ID：\`${p.runId}\`。Node ${p.runtime.nodeVersion} / ${p.runtime.OS} / ${p.runtime.arch}、fake-indexeddb6.2.4、Node Web Crypto。実ブラウザー、OS保存、native quota、F6は未実施。

## 対象・原文照合・独立oracle

省略候補は前回NEXTの20件（TXT-01〜13・16・17、CAP-14・15・17・01・02）へ照合。全件が現行製品NOT RUN、AUTO分類、Gate対象外。F2承認commit0d5dfa38の原文行・全文SHAをケースごとに固定。CASEBOOK/FIXTURES/VARIANT/FAULT catalog、normative manifest、Node executable、runner/helper・全入力・期待ファイル、製品と依存を実行前commitへ固定。

期待値はF2 §10/§11、明示Unicode入出力表、codepoint/UTF-16単位、Buffer UTF-8 byte数、raw payloadの独立SHA-256、F2 record/revision差分modelで生成。製品validatorで期待値を生成しない。全制御文字77種×前/中央/後×canonical/escaped入力×partial/completed。空白表はECMAScript trim対象を列挙、NFC結合・Hangul、NFKC互換文字、60/61単位、秘密情報に似たダミー語・数字形状と非該当control。秘密の実値は使わない。

F2の順序はNFC→trim→制御文字拒否。先頭/末尾のtab/LF等はtrim後に消えるためsave/draftの正常controlとして区別し、中央controlは拒否。未正規化importは修復しない。C0 JSONエスケープは実値へdecodeして検査し、C1/bidi等のraw/Unicode escapeを分離。無効名はbaseline生成後にraw snapshotへ挿入、当該値を残して署名し、再projectionしない。各入力のcodepoint・raw/canonical UTF16/UTF8・ファイルbytes/hashと期待値をPREEXECUTION/FIXTURE-CALIBRATIONへ記録。

各name variantでsave、raw load、normal backup、import、restore preflight、緊急confirmed pending、緊急draftを観測。失敗時全4ストアと入力不変、pending未収録件数/ordinal範囲、正規化後の収録名を照合。画面保持をNodeだけで認定するケースではなく、このバッチは文字列とデータ境界の要求に限定。CAPは9,999,999/10,000,000/10,000,001 bytes、超過write0、削除後の全record/revision込みbytes減少、入力key逆順でもprojection/通常exportのtop/overview順序一致を確認。

## 正式結果

|case ID|判定|実施/計画variant|result SHA-256|
|---|---|---:|---|
${rows.map(r=>`|${r.caseId}|${r.status}|${r.completed}/${r.planned}|${r.sha256}|`).join('\n')}

今回：${JSON.stringify(summary.counts)}、${summary.completedVariants}/${summary.plannedVariants} variants。停止理由：${JSON.stringify(summary.stopped)}。

## 証拠・監査

実行証拠manifest SHA-256：\`${a.evidenceManifestSHA256}\`。各variantのobservation、入力/oracle、境界別store dump、transaction trace、緊急summaryとfile hashを保存。rawファイルの元入力はinputs/*.binのfileBase64から復元可能。STORE-AUDITは観測済み全store/省略範囲/失敗write0を独立再照合し、製品再実行なし。正式run/ledgerは追記、旧PASS/FAIL/NOT VERIFIABLEとfixture不備履歴を変更しない。

全製品${a.productFilesVerified}ファイル、旧対象/証拠${a.oldFilesRawBeforeAfterVerified}ファイル、依存${a.dependencyFilesVerified}ファイルの前後bytes/SHA一致。旧tracked差分は新バッチフォルダを除き空。外部通信・整理内容ログへの出力試行：${a.transportAndLoggingAttempts}。新証拠のmanifestに全ファイルbytes/SHAを記録。

497件の累積：${JSON.stringify(a.currentCounts)}。旧150PASSレコードは同一で保持し、今回runへコピーしない。残分類：${JSON.stringify(a.remainingCounts)}。

## 未解決事項・次候補

Gate5件は未着手。displayCode適用判断、非ACTIVE registry別承認、native browser/人間確認は継続保留。Node/fake-IDBの成功は実ブラウザー、永続性、実quota、OS物理保存、iPhone性能の証明ではない。secret-like正規表現は補助防御であり全秘密の検出を保証しない。

次回候補（今回未実施、別指示と事前照合が必要）：${next.nextBatchCandidates.map(r=>r.caseId).join('、')}。

制作管理室へ本成果物の独立レビューを依頼する。第5バッチ完了時点で停止。F5全体PASS、F6開始、本番公開、mainマージ、R005凍結解除は行わない。
`;
fs.writeFileSync(path.join(base,'REPORT.md'),text,{flag:'wx'});const files=[];function walk(dir,rel=''){for(const n of fs.readdirSync(dir,{withFileTypes:true})){const r=rel?rel+'/'+n.name:n.name;if(n.isDirectory())walk(path.join(dir,n.name),r);else if(r!=='ARTIFACT-MANIFEST.json'){const b=fs.readFileSync(path.join(dir,n.name));files.push({path:r,bytes:b.length,sha256:sha(b)});}}}walk(base);put(path.join(base,'ARTIFACT-MANIFEST.json'),{algorithm:'SHA-256',excludesSelf:true,files});console.log(JSON.stringify({files:files.length,totalBytes:files.reduce((n,f)=>n+f.bytes,0),artifactManifestSHA256:sha(fs.readFileSync(path.join(base,'ARTIFACT-MANIFEST.json')))}));
