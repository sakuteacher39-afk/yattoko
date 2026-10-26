import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {base,subject,reference,json,put,sha} from './common.mjs';
const p=json(path.join(base,'PREEXECUTION.json')),a=json(path.join(base,'AUDIT.json')),next=json(path.join(base,'REMAINING-AND-NEXT.json')),run=path.join(base,'runs',p.runId),summary=json(path.join(run,'SUMMARY.json')),rows=p.cases.map(c=>{const f=path.join(run,'cases',c.caseId.replace(':','-'),'result.json'),r=json(f);return{caseId:c.caseId,status:r.status,completed:r.completedVariants,planned:r.plannedVariants,attempt:r.attempt,sha256:sha(fs.readFileSync(f))};});
const text=`# F5自動試験再開 第4バッチ：制作管理室提出

固定製品：\`${subject}\`。直近成果物：\`${reference}\`。専用ブランチ：\`codex/f5-auto-resume-batch4\`。

実行前固定commit：\`${summary.runnerCommit}\`。新run ID：\`${p.runId}\`。Node ${p.runtime.nodeVersion} / ${p.runtime.OS} / ${p.runtime.arch}、fake-indexeddb6.2.4。実ブラウザー/jsdom/OS保存は使わず、native永続性・quota・画面・人間判断のPASSを付与していない。

## 候補・事前照合

省略表記を前回NEXTの正確な20 IDへ照合：F2:DIR-13〜18、SAVE-04/06〜09、R07-07〜11、ID-01〜03、PART-12。全20件が現行製品のNOT RUNで、Gate5件の対象外。F2:R07-09は本人意向family維持のケースであり、保留中のF3:R07-09非ACTIVE registry試験ではない。

承認済みF2 commit0d5dfa38の原文をGit blobから取得し、caseごとの行・文言・SHA-256を記録した。casebook/fixtures/variant/fault catalog、normative manifest、全製品、Node executable、依存、全実行runner/helperを実行前commitへ固定した。CANDIDATE-READINESS-20.jsonに各全variant範囲を保存。準備不足による除外0件。

独立oracleはF2意味規則のpure modelとmanifest、record-ID単位の差分、全store expected state、revision/globalの明示増分。製品validatorで期待を作っていない。準備R1を保持し、全初期・期待状態の妥当性、100連続変更のno-op混入0、失敗時のpendingの値・IDを独立に校正したR2を実行前固定した。校正で製品は実行していない。

## ケース別正式判定・全variant数・証拠hash

| case ID | 判定 | 完了/予定variant | attempt | result.json SHA-256 |
|---|---|---:|---:|---|
${rows.map(r=>`| ${r.caseId} | ${r.status} | ${r.completed}/${r.planned} | ${r.attempt} | ${r.sha256} |`).join('\n')}

計20 PASS / 0 FAIL / 0 NOT VERIFIABLE / 0 NOT RUN（今回範囲）、全2,604 variant完了。停止条件に該当する不一致・証拠不足は発生しなかった。新run/attemptへ排他的新規証拠とappend-only ledgerを記録し、旧revision/開発テスト/過去PASSを今回runへ転記していない。

各observation.jsonに原文・入力bytes/hash・独立oracle・期待・実測・fault・時刻・判定を保存。全storeのinitial/after dump、request/complete/abort trace、coordinator呼出し/通知/pending/中間commitも記録した。CASE-RESULTS.csvおよび累積CSVにcase証拠hashを記載。

## 重点検証

- DIR-13〜18：全適用カテゴリ、partial/completed、last/他の非肯定childを展開。child using→dormant、最終billing/asset/importantData yes→no、familyKnow no→yes、service削除後も親/概要の肯定値を勝手に否定へ戻さない。subscriptionのinactive child pruneも独立モデルへ反映し、親/概要の全値・revision不変を校正した。
- SAVE-04：3mutationをburst投入、またはfirst write-successかつcomplete前の時点で後続を投入。pendingの順序、maxInFlight=1、attempt/commitのmutationSeq、各expected globalとstoreを観測した。
- SAVE-06：100個の非no-op変更を3対象種（概要/カテゴリ/サービス）×2record state×2投入timingで実行。最終値だけでなく100回それぞれのcommit済みstoreとglobalを事前期待へ照合。二重commit/順序逆転を認めない。
- SAVE-07/08：前回の366 valid positive multi-record fixtureを新case IDへ使い、固定製品で再実行した。旧結果は使用しない。1transaction/global+1、changed record各+1を全datasetで確認。未変更recordも同じtransactionでputされる実装であり、dirty recordだけをputするという主張はしていない。
- SAVE-09：全12カテゴリ/両record state、概要/カテゴリ/service core/全always answersの同値操作。revision/globalを増やさず、completed recordも同値操作だけでpartialへ変えない。
- R07-07〜11：12カテゴリの有効status遷移でkeep/delete/family/undecidedを保持。target以外の11カテゴリはunanswered/unansweredと全revisionを維持する。
- ID-01：全6挿入順、shuffled expected record順、12カテゴリ/両state、3つの編集対象。配列位置ではなくrecordIdで期待targetだけを変更する。
- ID-02：canonical中央IDを削除した後、残る各IDを編集。全6挿入順/12カテゴリ/両stateで誤更新を検出する。
- ID-03：同名recordをmergeせず、IDごとの4-record状態を照合。fresh、1/2回衝突後成功、3連続衝突、generator throw/malformed、2件目生成失敗、作成待ちcandidateとの衝突を展開。既存IDだけでなくpublic submit/onChangeから投入した明示candidateも占有IDとして扱う。製品内部stateを直接変更せず、生成失敗時はpendingの値・null IDを保持して停止した。
- PART-12：op1をcommit後、op2のmeta/overview/category/first-last service write-successでabort。op3は保存せずpendingへ保持し、直前commit済み全storeを維持。別の明示retry controlでop2/op3を1回ずつcommitする。失敗段階のdump・pending・error/stoppedも残し、abortをなかったことにしていない。

submitを発火するhookは試験環境側の同期success listener。product transaction callbackへawaitを入れず、commit状態の読戻しはtransaction complete後の外側wrapperで行った。これによりNodeの論理queue契約を観測したが、実ブラウザーのnative scheduling/表示/永続性を証明したとは扱わない。

## 証拠・整合性監査

全2,604 variantを記録済みraw stores/中間commit/trace/pendingから再検算した。最終storeがexpected fileと一致すること、全commit sequenceの重複なし、100変更の全global順序、失敗時の正確な未保存値・ID、retryの失敗段階を確認。STORE-EVIDENCE-AUDIT.jsonを参照。証拠の読直しであり製品の追加実行ではない。

製品${a.productFilesVerified}ファイル、旧成果物${a.oldFilesRawBeforeAfterVerified}ファイル、依存${a.dependencyFilesVerified}ファイルの前後bytes/SHA-256一致。target lockのGit blob/archive、実行前runner/helperのcommit bytesも照合した。今回の新規ディレクトリ以外の旧tracked差分なし。外部通信・console logging・不許可書込み試行${a.transportAndLoggingAttempts}件。

run EVIDENCE-MANIFEST.json SHA-256：\`${a.evidenceManifestSHA256}\`。全${a.evidenceFilesVerified}証拠ファイルをbytes/hashで再監査。提出物全体はARTIFACT-MANIFEST.json。

## 累積497ケース・未解決事項

現行累積：**150 PASS / 347 NOT RUN**。元130 PASSとhistory/proofはそのまま参照し、今回20件の新正式証拠だけを追加した。元130/367台帳は変更せず、新しいF5-CUMULATIVE-497-AFTER.json/CSVを保存した。

残件主分類は自動候補255、実ブラウザー必須65、人間判定22、仕様適用待ち5。分類は各runnerの準備完了や実行許可を意味しない。今回範囲の未実施・不一致・証拠不足は0件。

Gate5件（F2:RST-15/CAT-18、F3:R07-09/MAN-32、REG:REG-07）は未着手。その他の保留browser5件もNOT RUN。R07-05の人間確認案/承認済み判定基準を変更していない。Node/fake-IDB成功を未観測browser/UI/人間判断へ転用せず、F5全体PASSは宣言しない。

## 次回候補（未実行）

${next.nextBatchCandidates.map(c=>'- '+c.caseId).join('\n')}

canonical nameのNFC/trim/control/bidi/secret拒否、容量境界・順序・削除後サイズ減少を優先する候補。各原文・全variant・独立oracle・fault・実行前固定を次回承認範囲で準備する。今回は進まない。

制作管理室へ、原文対応、2,604 variant、queue各commit、ID collision/再生成、pending保持、全store監査、累積更新の独立レビューを依頼する。専用ブランチへcommit・push後に停止し、他のF5、F6、本番公開、mainマージ、R005凍結解除には進まない。
`;fs.writeFileSync(path.join(base,'REPORT.md'),text,{flag:'wx'});fs.writeFileSync(path.join(base,'CASE-RESULTS.csv'),['caseId,status,completedVariants,plannedVariants,attempt,resultSHA256',...rows.map(r=>[r.caseId,r.status,r.completed,r.planned,r.attempt,r.sha256].join(','))].join('\n')+'\n',{flag:'wx'});assert.equal(a.productUnchanged,true);assert.equal(a.pastEvidenceUnchanged,true);assert.equal(a.dependenciesUnchanged,true);const files=[];function walk(d,r=''){for(const e of fs.readdirSync(d,{withFileTypes:true})){if(e.name==='ARTIFACT-MANIFEST.json')continue;const n=r?r+'/'+e.name:e.name;if(e.isDirectory())walk(path.join(d,e.name),n);else{const b=fs.readFileSync(path.join(d,e.name));files.push({path:n,bytes:b.length,sha256:sha(b)});}}}walk(base);put(path.join(base,'ARTIFACT-MANIFEST.json'),{subjectCommit:subject,runId:p.runId,files,excludesSelf:true});console.log(JSON.stringify({artifactFiles:files.length,artifactBytes:files.reduce((n,f)=>n+f.bytes,0),artifactManifestSHA256:sha(fs.readFileSync(path.join(base,'ARTIFACT-MANIFEST.json')))}));
