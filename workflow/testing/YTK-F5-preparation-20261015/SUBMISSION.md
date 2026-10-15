# F5正式試験準備｜提出報告

- 固定試験対象commit: **99e566da100ee6924149ec3244893bbddf7e8c4d**
- 準備用branch: `codex/f5-formal-test-preparation`
- 状態: **準備成果物提出 / F5正式試験未開始 / 全正式結果NOT RUN**

## 成果物

|資料|内容|
|---|---|
|README.md|対象不変で実施する試験計画、環境、手順、証拠、判定・停止規則|
|TARGET-LOCK.json|対象commit/tree、123全ファイルのblob・bytes・SHA、対象ZIP SHA|
|SOURCE-ALIGNMENT.json|F2/F3/F4承認時と対象内計画・traceabilityの照合|
|CASEBOOK.md / .json|全F5 497件の方法・期待・fixture/fault・証拠・判定基準、補助F4 gate10件|
|ENVIRONMENT.json|Node/npm/Chrome版、実行ファイルhash、依存lock、専用origin/profile|
|FIXTURES.json / VARIANT-RECIPES.json|独立生成40fixtureと派生variant規則、正確byte/hash|
|FAULT-CATALOG.json|21種（NONE含む）の注入点・制約・oracle。製品hook追加なし|
|RESULTS-TEMPLATE.json|497＋補助10行をNOT RUNで初期化。開発結果からPASSを転記しない|
|DEVELOPMENT-TEST-INVENTORY.json|既存111件の開発test名/hashのみ。今回未実行|
|PREPARATION-CHECKS.txt|対象・出典・全ID・手順参照・fixture byte/hashの準備確認結果|
|prepare-*.mjs / verify-*.mjs / serve-target.mjs|再生成、整合性確認、固定静的資産だけの配信補助。対象には含めない|

成果物は `workflow/testing/YTK-F5-preparation-20261015/` にのみ追加した。既存製品・承認仕様・試験計画・111test・traceabilityは変更していない。固定対象ZIPと40fixtureは対象外のwork領域に作成し、提出bundleへ同梱する。

## 照合・準備確認

- F2計画、F4 registry/技術境界は承認時blobと一致。
- F3承認本文は不変。後続manifest追加61行/38caseは由来を区別した。
- 対象内traceabilityの全F5 **497件**を出典namespaceで採録。F6 **150件**は正式実施対象から分離。
- 最終分類は自動 **415件**、browser/人間/計測併用 **82件**。補助F4 gate10件は別枠。
- 全123対象ファイルはGit blob exact bytes一致。Windows改行変換を無効化したarchiveを採用。
- 40fixtureのSHAと層別境界bytesを確認。DIGEST-01の既定hash一致。正式結果507行は全NOT RUN。
- 補助toolの構文を確認。製品module・正式case・既存111testは実行していない。

## 実行時に残す確認事項

1. 自動分類は実施可能性を示す。正式専用runnerが497件実装済みという意味ではない。CASEBOOKに従うcase adapterと観測器のbinding/校正は正式実施工程で行い、harness hashとvariant単位の証拠を残す。
2. candidate fixtureが製品で受理されることは未確認。独立oracleとのsemantic calibrationが必要。raw16MBの入口受理を有効full file受理へ、depth16 scanner受理をschema成功へ昇格させない。
3. displayCode/専用move/未ACTIVE配備等の前提と観測不能を明記。mockモデルのみで実パッケージの合格を主張せず、必要ならNOT VERIFIABLEを記録する。
4. Chromeは版/実行ファイルhashを採録しただけで、起動・UI・実reload・物理保存・性能計測・fault注入は未実施。F6 Safari/実機メモリ/長期保持も未実施。
5. raw16MB/pending1MB/256操作は暫定値を維持。対象を修正して同じrunを続けず、変更が必要なら別commit・独立レビュー・再固定。

試験準備成果物を提出して停止する。F5/F6正式PASS、本番公開、R005凍結解除は宣言しない。
