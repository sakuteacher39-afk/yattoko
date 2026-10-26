import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {base,subject,reference,json,put,sha} from './common.mjs';
const p=json(path.join(base,'PREEXECUTION.json')),a=json(path.join(base,'AUDIT.json')),next=json(path.join(base,'REMAINING-AND-NEXT.json')),run=path.join(base,'runs',p.runId),summary=json(path.join(run,'SUMMARY.json')),rows=p.cases.map(c=>{const file=path.join(run,'cases',c.caseId.replace(':','-'),'result.json'),r=json(file);return{caseId:c.caseId,status:r.status,planned:r.plannedVariants,completed:r.completedVariants,attempt:r.attempt,sha256:sha(fs.readFileSync(file)),description:c.source.description};});assert.equal(rows.length,20);const lines=rows.map(r=>`| ${r.caseId} | ${r.status} | ${r.completed}/${r.planned} | ${r.attempt} | ${r.sha256} |`);const text=`# F5自動試験再開 第2バッチ：制作管理室提出

固定製品 \`${subject}\`。直近成果物 \`${reference}\`。専用ブランチ \`codex/f5-auto-resume-batch2\`。

実行前固定commit：\`${summary.runnerCommit}\`。新run ID：\`${p.runId}\`。Node ${p.runtime.nodeVersion} / ${p.runtime.OS} / ${p.runtime.arch}。import・digestはnative Node Web Cryptoとraw File adapter、保存系はfake-indexeddb6.2.4のfresh factory/DBをvariantごとに使用した。jsdom/実ブラウザーは使用せず、native永続性・quota・画面・人間確認を証明していない。

## 候補照合と事前固定

ユーザー指示の省略表記を前回NEXT一覧の正確な20 IDへ照合した。F3:R02-21/22/23/32/33/34/35/37/38、F2:R07-01〜04、F2:R08-06〜12。全20件が現行製品のNOT RUNであり、保留Gate5件ではないことを確認した。

各承認済み原文はF2承認commit0d5dfa38 / F3承認commit3b54acbeから直接Git blobを読み、行・文言・SHA-256をケースごとに記録した。CASEBOOK/FIXTURES/VARIANT-RECIPES/FAULT-CATALOG、manifest、target、Node executable・依存・全runner/helperを実行前固定した。CANDIDATE-READINESS-20.jsonおよびPREEXECUTION.jsonを参照。原文の要求を自動検証できる境界に限定し、今回は除外候補0件。

準備R1も保持した。正式実行前の校正でDIGEST-01をdigest専用oracleへ統一し、R07 abortはguard読込中ではなく書込みrequest成功後の注入へ限定した。これらは未実行の試験基盤の校正であり、製品・原文・過去証拠は変更していない。最終R2の4,898 variantを実行前commitへ固定し、その後は実行runner・fixture・期待値を変更していない。

## ケース別正式判定と証拠hash

| case ID | 正式判定 | 完了/予定variant | attempt | result.json SHA-256 |
|---|---|---:|---:|---|
${lines.join('\n')}

結果は20 PASS / 0 FAIL / 0 NOT VERIFIABLE / 0 NOT RUN（選定範囲）、全4,898 variant完了。停止条件に該当する不一致・証拠欠落は発生しなかった。新しいrun/attemptへappend-only ledgerと排他的新規証拠ファイルを作成した。旧revision・開発テスト・旧90件の結果を今回のrunへコピーしていない。

各variantの入力bytes/SHA-256、原文要求、独立oracle、期待と実測、fault条件、開始/終了時刻、判定はrun/casesのobservation.jsonにある。上表のcase resultとrunのEVIDENCE-MANIFESTで全証拠を結び付けた。

## 独立oracle・全variant範囲

- F3：non-NFC、全77禁止codepoint×前/中央/後×raw/escaped、公開DIGEST-01定数、duplicate decoded key、property順、数値、Unicode/BOM、checksum異常とpositive controls。R02-22は全463 variant。V-HASH-01の過去の「厳密1byteではない」fixture履歴を保持し、独立に校正した1ASCII byteの派生入力と元fixture拒否を別観測とした。
- F2:R07：12カテゴリ×3初回status×EMPTY/既存dataset内の未回答カテゴリ。独立baselineからstatus/intention/revision/globalのexpected datasetを構成。R07-04ではmeta/overview/対象category/最終categoryの書込みsuccess後に同期abortし、全4ストアの旧状態維持を照合。全書込みが同一readwrite transactionに属し、complete後にsave Promiseがresolveしたことをtraceから確認。
- F2:R08-06/07/08：全12カテゴリのcompleted+unknown controlとcompleted+unanswered拒否。import/restoreはnormal/emergency双方、normal loadは実CanonicalStore.read。
- F2:R08-09：全12カテゴリのempty-name検証、共通name path上の全77禁止codepoint×3位置、empty/trim/NFC/UTF16長/type/secret-like各クラス。import/restore/load/save/backupの5境界。60UTF16、surrogate pair、NFC、NFKCを勝手に適用しないpositive controlsを含む。名前規則はcategory非依存の共通経路のため全名称クラスはmailで展開し、カテゴリ差は12カテゴリempty/controlで別に確認した。未観測のcartesian組合せを実行済みと記していない。
- F2:R08-10/11：唯一のconditional subscription.billingSourceを、partial/completed・normal/emergency・親条件・全7 child enumで展開し、5 API境界を確認。canonical baseline生成後に子fieldを削除/挿入し、その後は再projectionしない。raw payloadをそのまま独立SHA-256署名し、不正field・位置・親条件・checksumが残っていることを実行前と監査時に照合。
- F2:R08-12：上記で構成したinvalid completedの全クラスを5 API境界で拒否し、元inputとraw store上のrecordStateを含む全データが不変であることを確認。valid completedを利用者が編集してpartialに戻す別動作とは区別した。

File kindに意味があるのはimport/restore境界。load/saveはdatasetの検証、backupは通常backupの共通snapshot validationを呼ぶもので、emergency OS保存の実証と扱わない。restore拒否は実import→prepareRestoreのpipelineで不正fileを拒否し、readwrite未開始・旧状態不変を確認した。偽造verified tokenで到達不能なbranchを製品テストとして捏造していない。

## 証拠監査・整合性

実行時と監査時に、製品${a.productFilesVerified}ファイル、過去成果物${a.oldFilesRawBeforeAfterVerified}ファイル、依存${a.dependencyFilesVerified}ファイルの前後bytes/SHA-256一致を確認。target lockのGit blob・archiveも照合した。旧tracked差分は今回の新規バッチディレクトリ以外なし。runner/helperは実行前commit上のbytesと一致した。

F2の4,416 variantについて、記録済みraw4-store dumpを独立に読み直し、return valueだけでなく保存後datasetを事前expected datasetと比較した。全requestのtransaction ID、complete/abort、前後hash、不正conditional保持も再監査した。F2-STORE-EVIDENCE-AUDIT.jsonを参照。これは新しい製品実行ではなく、採取済み証拠の検算である。

外部通信・console logging・不許可書込み試行は${a.transportAndLoggingAttempts}件。F2のdummy DBへの予定されたsave/seedだけを使用し、失敗時の旧状態保護とfixture input不変を検証した。

run EVIDENCE-MANIFEST.jsonのSHA-256：\`${a.evidenceManifestSHA256}\`。全${a.evidenceFilesVerified}ファイルをbytes/hashで監査済み。提出物全体はARTIFACT-MANIFEST.json。

## 累積台帳・未解決事項

現行497件は **110 PASS / 387 NOT RUN**。今回20件の新証拠だけを追加した。既存90 PASSとそのhistory/proofを保持し、元90/407台帳を変更していない。F5-CUMULATIVE-497-AFTER.json/CSVにcase ID・固定revision・run/attempt・証拠path/hashを保存した。

未実施387件の主分類は、自動候補295、実ブラウザー65、人間判定22、仕様適用判断待ち5。分類の基準は前バッチを維持する。F2:RST-15/CAT-18、F3:R07-09/MAN-32、REG:REG-07のGateは未着手。その他の保留browser5件もNOT RUN。R07-05の人間確認範囲や承認済み基準を変更していない。

今回範囲の未実施・不一致・証拠不足は0件。fake-indexeddbの結果を実ブラウザー永続性・実quota・native scheduling・表示・OS操作・人間判断へ拡張することはできない。既存の仕様適用Gateも解消したとは扱わない。

## 次バッチ候補（未実行）

${next.nextBatchCandidates.map(c=>'- '+c.caseId).join('\n')}

generation/revision競合guard、肯定/否定方向整合、prospective容量超過時の旧状態保護を優先する候補。各原文・全variant・独立oracle・faultと実行前commitを次の承認範囲で準備する必要がある。今回は実行しない。

制作管理室へ、20ケースの原文対応・全4,898 variant・fixture保持・raw store検算・累積更新の独立レビューを依頼する。commit・push後に停止し、他のF5、F6、本番公開、mainマージ、R005凍結解除には進まない。F5全体PASSは宣言しない。
`;fs.writeFileSync(path.join(base,'REPORT.md'),text,{flag:'wx'});fs.writeFileSync(path.join(base,'CASE-RESULTS.csv'),['caseId,status,completedVariants,plannedVariants,attempt,resultSHA256',...rows.map(r=>[r.caseId,r.status,r.completed,r.planned,r.attempt,r.sha256].join(','))].join('\n')+'\n',{flag:'wx'});assert.equal(a.productUnchanged,true);assert.equal(a.pastEvidenceUnchanged,true);assert.equal(a.dependenciesUnchanged,true);const files=[];function walk(d,r=''){for(const e of fs.readdirSync(d,{withFileTypes:true})){if(e.name==='ARTIFACT-MANIFEST.json')continue;const n=r?r+'/'+e.name:e.name;if(e.isDirectory())walk(path.join(d,e.name),n);else{const raw=fs.readFileSync(path.join(d,e.name));files.push({path:n,bytes:raw.length,sha256:sha(raw)});}}}walk(base);put(path.join(base,'ARTIFACT-MANIFEST.json'),{subjectCommit:subject,runId:p.runId,files,excludesSelf:true});console.log(JSON.stringify({artifactFiles:files.length,artifactBytes:files.reduce((n,f)=>n+f.bytes,0),artifactManifestSHA256:sha(fs.readFileSync(path.join(base,'ARTIFACT-MANIFEST.json')))}));
