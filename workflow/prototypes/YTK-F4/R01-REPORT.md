# F4-S1-R01 修正報告（2026-10-15）

対象: c7f8711abb44aa7bef1e8fd21317412faa506f6c
専用branch: codex/f4-s1-r01-id-retry

## 修正内容

- generateServiceIdを追加。既存service IDと作成中candidate IDを併せて検査し、衝突時は合計最大3回生成する。3回衝突した場合、生成器例外・不正値の場合はfail closed。生成器異常ではその時点で停止する。
- 新規serviceのID生成をSaveCoordinator内の保存前処理へ移動。画面入力をpendingに保持してから生成するため、生成失敗も他の保存失敗と同じ停止・保持経路を通る。
- pending queue内の確定済みcandidate IDも予約済みとして検査。順次生成する新規candidateは先行commit後の最新committed ID集合を参照する。
- 失敗時は未保存operationのサービス名等とbase snapshotを保持し、後続保存を停止。ID未生成のpendingはrecordId=nullのままメモリだけに存在し、IndexedDBへは書き込まない。明示retryでのみ再生成を試行する。
- UIは生成済みcandidate IDをdraftへ接続する。生成器異常がclick handler外へ漏れて未保存表示を欠落する問題を防止する。
- transaction内のgeneration/global/record guardと重複ID拒否は維持。他tabの変更を自動rebase・上書きせず停止する。
- generationId生成規則、canonical schema、registry、manifest、R07/R08/R09を変更していない。

## 変更ファイル

全て workflow/prototypes/YTK-F4/ 配下。

- src/canonical.mjs: 3回上限の生成helper、生成失敗表示。
- src/storage.mjs: 新規serviceのpending化・生成・候補照合。
- src/ui-adapter.inc: 新規作成と生成IDの画面接続。
- index.html: adapterから再生成した非公開入口。
- test/id-retry.test.mjs: 新規8テスト。
- test/ui.test.mjs: 生成器注入、失敗保持と再生成成功の画面テスト2件を追加。
- R01-REPORT.md: 本報告。

## 検証

npm run generate: 成功。
npm test: 35 tests / 35 pass / 0 fail / 0 skip。
git diff --check: 成功。

新規10件:
1. 既存ID・candidate IDとの衝突を経て3回目に成功。
2. 3回連続衝突で停止し4回目を呼ばない。
3. 生成器例外・null・Promise・異prefix・不正grammarで即時停止。
4. 同一coordinator内のqueue candidate予約と再生成後の一意保存。
5. 衝突上限・生成器例外時に書込みゼロ、入力保持、後続停止。
6. 生成失敗後、明示retryで保持入力を保存。
7. revision一致でもtransaction内で既存ID重複を拒否し正本維持。
8. 別tab同一ID生成時、1件のみcommit、競合tabのpending保持・上書きretry拒否。
9. 画面上のその他名保持、未保存表示、後続ボタン無効、正本不変。
10. 画面で既存ID衝突後の再生成・遷移・後続回答が正しい新規recordへ保存される。

既存25件も成功。保存失敗6分類と後続停止、R001回答保持、R07/R08/R09、atomic abort、容量制限、複数tab試験を含む。

## 残存リスク・停止点

- fake-indexeddb/jsdomで検証。実PC/iPhone/Safari、OS kill、実quota、長期保持、容量近傍性能は引き続き未検証。
- candidate予約は同一tabのpending queue内。tab間の最終防御はIndexedDB transactionの版照合・重複検査。候補IDのtab間Broadcastは導入していない。
- 未保存入力は画面・tab memoryにのみ保持。reload/close/crash後の復旧は保証しない。
- 独立再レビューは未実施。F5/F6合格、本番公開、R005凍結解除を宣言しない。
- 第2段階のbackup/restoreには未着手。本修正とテスト完了時点で停止する。
