# F4 第3段階 実装報告（2026-10-15）

基準commit: 9d7d9e9a206f188c1381c8d1a3d4d8dbcf273ec4
専用branch: codex/f4-stage3-restore
F2: 0d5dfa387f924e5dc3dc9196b9f236986c910281
F3承認設計v0.3: 3b54acbe7d85f60b3f8b4ffcd9b723cdc02b5641
F4設計: 3036275123420d1be4a4607e4e64d7ec1ab9304c
ACTIVE: ytk-free-v1-registry-20261015

## 実装機能

1. File.size/raw resource guard、UTF-8 fatal decode/BOM拒否、JSON lexical scanner。decoded重複key、非canonical数値、Unicode不正を拒否。
2. root/nested exact field、version pair、canonical full JSON bytes、SHA-256、F2 semantic、10MB、pending summary/dependency/context/fingerprintの厳格検証。破損・不正fileは復元前に停止。
3. VALID/EMPTY/CORRUPT_COMPARABLE/CORRUPT_UNCOMPARABLE分類とreadonly preview。全置換の明示確認、破損comparability時の追加破棄確認。
4. fresh generation / globalRevision=1、record revisions保持のpreflight。
5. IndexedDBのGUARD→CLEAR→PUT→READBACK request-chain。READBACKで同期canonical bytes一致、oncompleteだけ成功。File API/cryptoはtransaction外。
6. preview後のedit/delete-all/別restoreをguardで停止。abort・quota・DataError・readback不一致時の旧正本維持。
7. snapshot restoreと別のpending再適用。source/file/generation/revision/expected-before/dependencyを照合し、明示確認された1件だけ通常save pipelineへ渡す。
8. IN_FLIGHT二重tap防止、transaction complete後だけmemory APPLIED receipt。同一sessionの証跡がある場合だけ既適用判定。restart・証拠喪失・同内容異世代では推測しない。
9. 生成物の復元panel接続、平文値のtextContent表示、元画面pending/draft保持、旧画面のstale save停止。第4段階の編集再開統合は未実施。

## 変更ファイル一覧

全て workflow/prototypes/YTK-F4/ 配下（16ファイル）:

- src/import-json.mjs（新規: scanner/strict primitives）
- src/import-backup.mjs（新規: canonical/schema/hash/pending import）
- src/restore.mjs（新規: raw分類/preflight/atomic request-chain）
- src/reapply.mjs（新規: memory provenance/receipt/再適用）
- src/restore-ui.mjs（新規: preview/確認/再適用UI）
- src/backup.mjs（既存semantic helperを取込側と共有するためexport。書出し形式変更なし）
- src/storage.mjs（再適用専用のoptional expected-before text guard。通常saveの既存呼出しは維持）
- src/ui-adapter.inc（復元panel接続/旧画面保存停止）
- build-ui.mjs（module import）
- index.html（再生成）
- test/restore.test.mjs（新規28件）
- test/restore-ui.test.mjs（新規4件）
- test/stage1.test.mjs（外部transport/logging sink検査対象追加）
- test/ui.test.mjs（実入口への復元接続回帰1件追加）
- RESTORE-NOTES.md（新規: 実装binding/境界）
- STAGE3-REPORT.md（本報告）

## テスト結果

npm run generate: 成功。
npm test: 100 tests / 100 pass / 0 fail / 0 skip。
git diff --check: 成功。

既存67件＋第3段階33件。正常/緊急full/partial/none相互運用、duplicate decoded key、未知field/version、checksum、canonical/数値/Unicode/BOM/UTF-8/truncation/resource guard、10MB超拒否、completed/conditional不正、pending count/range/dependency/context/ID/fingerprint不正を検証。

復元は明示確認前の非変更、EMPTY/VALID/破損分類、破損二段階確認、preview競合、fresh generation、globalRevision=1、record revision保持、GUARD/CLEAR/PUT/READBACK順、各phase abort、quota/DataError、readback mismatch/serializer validation exception、oncomplete成功判定、readwrite内async不使用を検証。

再適用は自動非適用、順序/依存関係、二重tap、失敗receipt非作成、明示retry、同一file再検証、証拠喪失、同内容異世代、外部更新/削除/再起動相当、expected-beforeのtransaction内再照合、偽no-op既適用防止、service作成〜conditional childの連鎖を検証。UIでpreview/cancel/追加確認/別適用/元入力保持/XSS/background無効化/旧画面freezeを確認。

## 未解決事項・残存リスク

- 独立実装レビューは未実施。F5/F6の正式計画全体を実行・合格したという判定ではない。
- PC Chrome/iPhone Safari実機、private mode、browser restart/OS kill、物理disk障害、実quota/バックグラウンド、File APIの実動作は未検証。fake-indexeddb/jsdomのabort/再open/メモリ証拠喪失試験は実機の代替ではない。
- raw16MB/pending1MB/256操作はPROVISIONALのまま。iPhone peak memory・heartbeat・所要時間等の測定と最終上限判断は未実施。scanner/digest、raw guard、dataset複製、readback、pending検証は容量近傍の時間/メモリ測定が必要。
- CORRUPT_UNCOMPARABLEは復元不可。cycle/Date等のunsupported raw valueも推測救済しない。破損でも比較できる場合だけ二段階確認付き全置換を提供。
- 復元成功後、元画面のlocal入力は保持して旧画面saveを停止する。通常編集への再接続・画面遷移の統合は第4段階へ持ち越し。reloadすればreceipt/contextを失うため自動resume/skipを提供しない。
- pendingはordinal順で1件ずつ適用。deleteAll等のgeneration変更後はrestored generationの証拠条件が切れるため、残操作の進行を停止する。
- proofはmemoryのみ。commit直後にページ/プロセスが終了してreceiptを失った場合、現在値から適用済みを推測しない。再起動を跨ぐautomatic exactly-onceは保証しない。
- 元のlocal pendingとfile内pendingは自動merge/rebaseしない。必要な緊急退避は復元前に利用者が行う。

## F2/F3/F4承認仕様との差分

canonical schema、質問manifest、ACTIVE registry、F2 R07/R08/R09、実保存10MB、backup file field/enum/checksum規範の変更なし。承認設計で要求されたimport/preflight/raw comparability/transaction-chain/provenanceをコードへ具体化した。

保守的なraw representation対応範囲、lexical resource guard、private verified/preview/restore token、再適用時の追加canonical expected-before guardをRESTORE-NOTES.mdに記録。認証、クラウド、外部送信、analytics、error logging、永続provenance ledger、暗黙migrationは追加しない。

第3段階の実装と開発テスト完了時点で停止。第4段階の統合作業へ進まず制作管理室の独立レビュー待ち。F5/F6合格、本番公開、R005凍結解除は宣言しない。
