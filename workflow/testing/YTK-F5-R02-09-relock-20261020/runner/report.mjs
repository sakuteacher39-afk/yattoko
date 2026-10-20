import {readFileSync,writeFileSync,readdirSync} from 'node:fs';import path from 'node:path';import {base,repo,subject,prior,sha,json,put} from './common.mjs';
const audit=json(path.join(base,'AUDIT.json')),plan=json(path.join(base,'PREEXECUTION-R4.json')),lock=json(path.join(base,'TARGET-LOCK.json')),diff=json(path.join(base,'TARGET-DIFF.json')),impact=json(path.join(base,'REGRESSION-IMPACT.json')),summary=json(path.join(base,'runs',plan.runId,'SUMMARY.json'));
const text=`# F5対象再固定・R02-09限定正式再試験報告

新対象の **F3:R02-09はPASS**。run001の基盤不備をNOT VERIFIABLEとして保全し、修正したrunnerを事前commitした新run002 / attempt4で87入力すべてを新規実行した。F5全体の合格を意味しない。

## 固定対象・差分

- 旧対象: \`${prior}\`
- 新対象: \`${subject}\`
- 新Git tree: \`${lock.subjectTree}\`
- 成功runのrunner / 実行前計画commit: \`${summary.runnerCommit}\`
- 専用ブランチ: \`codex/f5-r02-09-formal-retest\`
- scope: Git tree全${lock.files.length}ファイル（旧123ファイル＋追加開発テスト1＋試験成果物1,253）。全ファイルのGit blob / bytes / SHA-256はTARGET-LOCK.json。archiveも収録済み。
- 旧123ファイルのうち${diff.oldPathsUnchanged}ファイルは同一。動作差分は承認済み\`workflow/prototypes/YTK-F4/src/import-json.mjs\`のみ。旧対象から増えた開発テストはruntime entrypointではない。schema/manifest/registry、checksum、保存・復元処理、承認済み仕様・試験計画は同一。
- archive: ${lock.archive.bytes} bytes / SHA-256 \`${lock.archive.sha256}\`

## 正式判定

|run|attempt|対象|F3:R02-09|理由|
|---|---|---|---|---|
|F5-B1-20261015-001|1|旧対象|FAIL（保持）|旧正式結果を変更しない|
|F5-B1-REVIEW-20261020-001|2|旧対象|FAIL（保持）|旧是正検証を変更しない|
|F5-R02-09-R2-20261020-001|3|新対象|NOT VERIFIABLE|87観測後、runnerの終了処理でprep未importによるReferenceError。全証拠を保持|
|${plan.runId}|4|新対象|PASS|87/87入力の実測・独立oracle・終了処理・整合性・証拠hashを確認|

run001のSUMMARY.json内PASSは終了処理前の暫定記録であり正式採用しない。削除/上書きせず、FINAL-VERDICT.jsonとledgerのRUN_STOPにNOT VERIFIABLEを記録した。runnerだけを修正し、新plan/newrunへ移行。run002は旧観測を転記せず87入力を再実行した。

## 環境・期待値・実測

Windows ${plan.runtime.OS} x64 / Node ${plan.runtime.nodeVersion} / builtinsのみ。環境binaryとrunnerのSHA-256を実行前計画・environment.jsonへ固定。ブラウザーやmock IDBは使用していない。

旧FIXTURES.jsonと同じV-VALID-01を、各入力の基準と独立oracleで照合した。fixture ${audit.fixture.bytes} bytes、SHA-256 \`${audit.fixture.sha256}\`。元fixtureは変更していない。

- control1: canonical正常ファイルは受理、File read1、全体JSON.parse1、digest1、snapshot hashは独立oracleと一致。
- 空白84: 元controlに存在する隣接token種別19＋先頭/末尾の21位置に、space/tab/LF/CRを1種ずつ挿入。
- 複合2: 全token境界への4種混在空白、およびpretty JSON（LF/indent）。
- 非canonical86入力: 独立JSON.parseで有効、controlとparsed構造/値/順序が一致、独立6-field payload SHA-256は元checksumに一致。製品でも全体JSON.parse1へ到達後CANONICAL拒否、digest0。
- 各入力について元BufferとFileが返したarrayBufferの前後hash一致、File read1、storage access0。外部通信/console試行0。
- scannerを通過したことは、全体parse到達と固定sourceの処理順から証明。CANONICAL唯一のthrow位置がraw同一bytes比較の失敗に対応し、digestより前にあることをphase-source-audit.jsonにsource hash付きで示す。内部処理へpatchやinstrumentationは加えていない。

各入力の期待値・実測・独立oracle・bytes/hash・時刻はrun002のNNN.observation.jsonとNNN.input.binに記録。ledgerは追記、新規証拠は排他作成。manifest ${audit.evidenceManifest.files}ファイル、SHA-256 \`${audit.evidenceManifest.sha256}\`。第三者検証用にinput fixture、target archive、runner、再現手順を収録。

## 保全・整合性

- 新target全1,377ファイルのGit blob/bytes/SHA-256とarchiveは試験前後で一致。
- 旧対象archive全123ファイルもverify-targetで一致確認（製品実行なし）。
- 旧試験/仕様${audit.historicalFilesProtected}ファイルのworking bytes/hashを前後照合。旧第1バッチrunsは0a077ba、旧是正検証runsは2cf2d00のGit内容と同一。既承認の旧runner/cases修正だけは2cf時点のまま保持。
- 元第1バッチ75 PASS / 3 FAIL、旧FAIL/PASS/ledger/fixture不備履歴を削除・上書きしていない。
- 今回の既存117件開発テストの再実行・正式PASSへの転記はない。
- 新対象のcase statusはR02-09のみPASS、残る496件はNOT RUN。補助gate10件、F6 150件もNOT RUN。

## 回帰影響・残存事項

REGRESSION-IMPACT.jsonで全497件を分類。追加正式再試験推奨は94件で、全件今回未実行。主な範囲はF3:R02の残り39件、F3:R04の15件、F2:RSTの19件、pending拒否3件、F3:R07の14件、順序/通信/logの4件。case ID別の理由・実施方式はREGRESSION-IMPACT.md参照。その他402件の「scanner固有の再試験不要」は、正式試験免除や旧PASSの新対象への移植ではない。

実ブラウザー/実機、最大容量時の性能、transaction・UIの動作は本runでは未検証。今回の87入力はR02-09の限定証拠で、他ケースのPASSを証明しない。初回runner不備は修正済みで、失敗履歴は残した。製品の新規不具合は今回の限定runで観測しなかった。

制作管理室へ、新target固定・R02-09正式判定・基盤不備の保全処理・94件の回帰候補の独立レビューを依頼する。独立レビュー後、追加回帰ケースの実行前計画と正式承認を得ることを提案する。

ここで停止。第2バッチ/F6/本番公開/mainマージ/R005凍結解除は実施していない。F5/F6全体の正式PASSは宣言しない。
`;
writeFileSync(path.join(base,'README.md'),text,{flag:'wx'});const files=[];function walk(p,rel=''){for(const n of readdirSync(p,{withFileTypes:true})){const r=rel?rel+'/'+n.name:n.name;if(n.isDirectory())walk(path.join(p,n.name),r);else{const b=readFileSync(path.join(p,n.name));files.push({path:r,bytes:b.length,sha256:sha(b)});}}}walk(base);put(path.join(base,'ARTIFACT-MANIFEST.json'),{algorithm:'SHA-256',excludesSelf:true,files});process.stdout.write('Report and full artifact manifest created.\n');
