import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {base,subject,reference,json,put,sha} from './common.mjs';
const p=json(path.join(base,'PREEXECUTION.json')),a=json(path.join(base,'AUDIT.json')),next=json(path.join(base,'REMAINING-AND-NEXT.json')),run=path.join(base,'runs',p.runId),summary=json(path.join(run,'SUMMARY.json')),rows=p.cases.map(c=>{const f=path.join(run,'cases',c.caseId.replace(':','-'),'result.json'),r=json(f);return{caseId:c.caseId,status:r.status,completed:r.completedVariants,planned:r.plannedVariants,attempt:r.attempt,sha256:sha(fs.readFileSync(f)),description:c.source.description};});
const text=`# F5自動試験再開 第3バッチ：制作管理室提出

固定製品：\`${subject}\`。直近成果物：\`${reference}\`。専用ブランチ：\`codex/f5-auto-resume-batch3\`。

実行前固定commit：\`${summary.runnerCommit}\`。新run ID：\`${p.runId}\`。Node ${p.runtime.nodeVersion} / ${p.runtime.OS} / ${p.runtime.arch}、fake-indexeddb6.2.4。UI/jsdom/実ブラウザーは使用していない。2つのstore接続で論理的な競合順序を再現し、nativeブラウザー複数tab・永続性・quota・notification配送・OS操作の証明には用いない。

## 候補・原文・実行前固定

ユーザーの省略表記を前回NEXTの正確な20 IDへ照合した。F2:CON-01〜07、F2:DIR-01〜12、F2:CAP-16。全20件は現行台帳のNOT RUNで、Gate5件に含まれない。

承認済みF2 commit0d5dfa38から各試験原文をGit blobで取得し、行・文言・SHA-256をケースごとに固定。casebook/fixture/variant/fault catalog、normative manifest、製品全ファイル、Node executable、依存、全実行runner/helperをPREEXECUTION.jsonへ固定した。CANDIDATE-READINESS-20.jsonには各全variant範囲と実行可否を保存。除外候補0件。

独立oracleは製品からimportしないF2意味規則モデル。操作によるrecord差分とrevision/global増分、R07と肯定方向整合、質問manifestのpresence、UTF8 bytesを独立に算出した。別の事前checkerで全初期状態・期待状態の妥当性、負方向操作が依然矛盾を作ること、容量境界の有効controlを校正した。準備R1を保持し、通知なし条件をA commit前から有効にしたR2を実行前commitへ固定した。校正で製品を実行していない。

## ケース別正式結果・全variant数・証拠hash

| case ID | 判定 | 完了/予定variant | attempt | result.json SHA-256 |
|---|---|---:|---:|---|
${rows.map(r=>`| ${r.caseId} | ${r.status} | ${r.completed}/${r.planned} | ${r.attempt} | ${r.sha256} |`).join('\n')}

計20 PASS / 0 FAIL / 0 NOT VERIFIABLE / 0 NOT RUN（今回範囲）、全3,525 variant完了。不一致・証拠不足による停止は発生しなかった。新run/attemptのimmutable resultとappend-only ledgerを作成し、過去結果・旧revision・開発テストを今回のPASSへ転記していない。

原文・入力bytes/hash・事前oracle・期待・実測・注入位置・時刻・判定は各observation.jsonにある。initial/before/afterの全4ストアdumpとA/B接続別transaction traceも保存した。CASE-RESULTS.csvと累積CSVからcase証拠hashを参照できる。

## 重点検証と範囲

- CON-01〜03：B旧状態取得→A正常commit→B保存。全12カテゴリ、partial/completedを原文に応じ展開。stale globalに加えglobalだけを現在値へ合わせてrecord revision差を孤立させるvariant、カテゴリ/サービスrecord差、fresh controlを含む。正常なB操作が古い期待状態で拒否され、A commit後の全データが維持されることを確認した。
- CON-04：実SaveCoordinatorがconflictで停止し、同じpendingを保持。retry3回がconflictで拒否され、B save呼出しは最初の1回だけ。強制上書きや後続保存を発生させないことを確認した。
- CON-05：実deleteAll完了でgeneration変更後、旧generation保存を拒否。globalを合わせても拒否するvariantを含む。初期record revision0の有効fixtureを使い、本caseに無関係な新世代record counterの解釈を追加しない。fresh controlは通常commit経路で同じB操作の妥当性を確認する。
- CON-06：実importBackup→prepareRestore→confirmed commitRestoreを実行し、source generationも旧local generationも再利用しない。完了後の旧B保存を拒否。preview/checkboxのnative UI承認を検証したとは扱わない。
- CON-07：BroadcastChannelをA commitより前からB保存終了まで利用不能にし、通知なしでもguardが拒否。ブラウザーの通知配送成功/失敗を観測したものではない。
- DIR-01〜05：全適用カテゴリ、partial/completed、肯定前の未回答/不明/否定概要、既存本人意向を展開。R07連携、active billingSourceのunanswered materialize、変更record各1回/global1回の増分を含め、独立expected datasetと保存済み全データを照合した。
- DIR-06：上記全肯定経路で、meta/overview/category/先頭service/末尾serviceのwrite-success後に同期abort。child/summaryの片側だけを残さず、全4ストア・全revisionを旧状態に維持した。
- DIR-07〜12：肯定childと負方向操作をfixture内に保持し、再projectionや正規化で矛盾を消さない。整合した同値controlと矛盾操作を分離。拒否時に2つのchildや概要・カテゴリを変更/削除しないことを全dumpで確認した。
- CAP-16：有効なdense既存datasetにintentionOverride更新とrevision/global増分を加え、独立prospective UTF8 bytesが9,999,999 / 10,000,000 / 10,000,001となる3境界。2controlは保存成功、超過はcapacity拒否・write request0・旧全データ維持。実quotaエラーや物理保存の実証に転用しない。

## 監査

全3,525 variantを記録済みraw dump・traceから独立に検算した。SUTの戻り値だけでなく、保存済み全datasetを事前expected fileと照合し、hash・record数・transaction ID・complete/abort・retry・容量を確認。STORE-EVIDENCE-AUDIT.jsonを参照。これは既存証拠の検算であり、新たな製品実行ではない。

製品${a.productFilesVerified}ファイル、旧成果物${a.oldFilesRawBeforeAfterVerified}ファイル、依存${a.dependencyFilesVerified}ファイルの前後bytes/SHA-256一致。target lockのGit blob/archiveと実行前runner/helperのcommit bytesも照合済み。新規バッチディレクトリ以外の旧tracked差分なし。外部通信・console logging・不許可書込み試行${a.transportAndLoggingAttempts}件。

run EVIDENCE-MANIFEST.json SHA-256：\`${a.evidenceManifestSHA256}\`。全${a.evidenceFilesVerified}証拠ファイルをbytes/hashで再監査。提出物全体はARTIFACT-MANIFEST.json。

## 累積更新・残件・未解決事項

現行497件：**130 PASS / 367 NOT RUN**。元110 PASSの履歴/proofはそのまま参照し、今回20件の新しい正式証拠だけを追加した。元110/387台帳は変更せず、F5-CUMULATIVE-497-AFTER.json/CSVを新規作成した。

残件主分類：自動候補275、実ブラウザー必須65、人間判定22、仕様適用判断待ち5。主分類は前バッチの基準を維持し、候補すべてのrunner完成や実行許可を意味しない。

今回の未実施・不一致・証拠不足は0。Gate5件（F2:RST-15/CAT-18、F3:R07-09/MAN-32、REG:REG-07）およびその他保留browser5件はNOT RUNのまま。R07-05の人間確認範囲や正式基準は変更していない。fake-IDB結果をnative browser・人間判断の代替にせず、F5全体PASSは宣言しない。

## 次バッチ候補（未実行）

${next.nextBatchCandidates.map(c=>'- '+c.caseId).join('\n')}

否定方向への自動伝播禁止、queue/revision、record ID、直前commit維持を優先する候補。原文・全variant・独立oracle・fault・実行前固定を次回の承認範囲で準備する。今回は進まない。

制作管理室へ、20ケースの原文対応、3,525 variant、fixture校正、Node観測範囲、全store検算、累積更新の独立レビューを依頼する。専用ブランチへcommit・push後に停止し、他のF5、F6、本番公開、mainマージ、R005凍結解除には進まない。
`;fs.writeFileSync(path.join(base,'REPORT.md'),text,{flag:'wx'});fs.writeFileSync(path.join(base,'CASE-RESULTS.csv'),['caseId,status,completedVariants,plannedVariants,attempt,resultSHA256',...rows.map(r=>[r.caseId,r.status,r.completed,r.planned,r.attempt,r.sha256].join(','))].join('\n')+'\n',{flag:'wx'});assert.equal(a.productUnchanged,true);assert.equal(a.pastEvidenceUnchanged,true);assert.equal(a.dependenciesUnchanged,true);const files=[];function walk(d,r=''){for(const e of fs.readdirSync(d,{withFileTypes:true})){if(e.name==='ARTIFACT-MANIFEST.json')continue;const n=r?r+'/'+e.name:e.name;if(e.isDirectory())walk(path.join(d,e.name),n);else{const b=fs.readFileSync(path.join(d,e.name));files.push({path:n,bytes:b.length,sha256:sha(b)});}}}walk(base);put(path.join(base,'ARTIFACT-MANIFEST.json'),{subjectCommit:subject,runId:p.runId,files,excludesSelf:true});console.log(JSON.stringify({artifactFiles:files.length,artifactBytes:files.reduce((n,f)=>n+f.bytes,0),artifactManifestSHA256:sha(fs.readFileSync(path.join(base,'ARTIFACT-MANIFEST.json')))}));
