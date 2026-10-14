# YTK-F3 バックアップ・復元設計｜制作管理室 正式再々レビュー3

- 審査日：2026-10-14（JST）
- 審査対象提出commit：`3b54acbe7d85f60b3f8b4ffcd9b723cdc02b5641`
- 前回レビュー原本：`workflow/reviews/YTK-F3-backup-restore-formal-rereview-20261014.md`
- 前回レビューcommit：`06c1b7617c947e70fccd4cc7a22082cd19def3c7`
- 照合：Notion F3専用ページ・最新状態マスター、F2人間承認commit `263efbf030693efb5d8071fcba6f93e4970971b1`、F2設計commit `0d5dfa387f924e5dc3dc9196b9f236986c910281`
- 審査3成果物：F3詳細設計v0.3、F5/F6試験計画v0.3、正式再々レビュー依頼書（上記提出commit時点）

## 総合判定

**DESIGN REVIEW PASS / HUMAN APPROVAL PENDING / F3 NOT APPROVED**

F2承認仕様：**MAINTAINED**。
F5試験計画：**SUFFICIENT / NOT RUN**。
F6試験計画：**SUFFICIENT / NOT RUN**。
F4実装：**NOT AUTHORIZED**。
本番公開：**NOT AUTHORIZED**。
R005：**FROZEN**。

## F3-R01〜R07個別判定

| ID | 判定 | 理由 |
|---|---|---|
| R01 | RESOLVED MAINTAINED | pending依存componentごとのall-or-nothing capture、未退避明示、画面保持、ファイル保存成功の非断定を維持 |
| R02 | RESOLVED MAINTAINED | decoded duplicate-key検査、canonical raw一致、SHA-256とstrict semantic validationを維持 |
| R03-A | **RESOLVED** | File/crypto/validation/digestをtransaction前に完了。GUARD→CLEAR→PUT→READBACKをIndexedDB request success handler連鎖で同期登録し、readbackのF2 canonical bytesを同期比較。不一致でcallback内abort、readbackVerified後の正常auto-commitを許し、oncompleteでのみ成功表示 |
| R04 | RESOLVED MAINTAINED（設計のみ） | raw16,000,000 bytes・pending1,000,000 bytes・256 operationsをPROVISIONALとしSafari性能・メモリ実測で検証、証拠不足ならNOT VERIFIABLE |
| R05-A | **RESOLVED** | content/fingerprint一致だけでalready-appliedとしない。sourceFileId、restoredGeneration、operationId、完了後のtab-local APPLIED receipt、revisionを全て確認。reload/restartでreceipt喪失なら自動apply/skip禁止 |
| R06 | RESOLVED MAINTAINED（設計のみ） | 平文、共有端末・iCloud同期・誤共有リスク、SHA限界と自動uploadなしの説明を維持 |
| R07 | RESOLVED MAINTAINED（設計のみ） | F2 category/R07〜R09/10MBを維持し、schemaVersion/questionSchemaVersion/recordId/generationIdはUNBOUND/BLOCKING。ACTIVE registryなしではproduction export/importを有効化しない |

## R03-Aの設計判断・後続検証

IndexedDBの自動commit防止は、request callbackから戻る前に次requestをenqueueし続ける有限state machineとする。readback完了後にrequestが尽きたときの正常auto-commitは意図されたもの。request失敗、readback byte mismatch、quota、TransactionInactiveErrorではabortして既存正本の維持を期待する。設計上の矛盾は解消。ただし自動試験・Safari実機でtransaction activity、request順序、abort rollback、readback前oncompleteがないことを検証するまで安全性実証とはしない。

## R05-Aの設計判断・後続検証

APPLIED receiptはF2正本へ追加せずtab-local memoryのみ。つまりbrowser restartを跨ぐautomatic exactly-once recoveryは**提供しない**。証拠が失われた場合はUNPROVEN / AMBIGUOUS_SAME_VALUEへ遷移し、自動apply/skipを停止、利用者が現在値と緊急ファイルを比較して確認する。再起動後の人間確認を含めた操作に誤りの余地は残るため、F5/F6で案内・誤スキップ・二重tap・別tab競合を検証する。永続ledger追加が必要ならF2変更として別審査・人間承認が必要。

## 試験計画

F5/F6計画はR03のTransactionInactiveError、premature complete、readback mismatch、途中abort、quotaとR05の異世代同一内容、未実施だが同値、二重tap・二重import、partial reapply、別tab更新、reload/restartを含むため**SUFFICIENT（計画のみ）**。実施・結果確認は一切していない。

## 人間承認前の未決事項

1. 暗号化なしのJSON v1採用可否（内容は平文。OS側のiCloud等同期・共用PC上の閲覧リスク）。
2. 復元をfull replace onlyとする最終UX判断。
3. fileFormatVersion=1の正式採用。
4. 16MB raw、1MB pending、256 operationsは**安全値として未実証**。iPhone Safariでの実測・安全性確認・維持/引下げ判断が必要。
5. schemaVersion、questionSchemaVersion、recordId・generationId grammar/generatorの具体値とACTIVE registry binding。未確定状態で本番書出し・復元機能有効化禁止。
6. Safariの長期データ消失、実ファイル保存成否、物理メモリ、共有端末上の平文ファイル保護は設計PASSと別に後続試験・説明で評価する。

**次工程：人間によるF3設計全体の正式承認判定へ付議可能。** ただし容量暫定値の最終安全認定、F5/F6実試験PASS、F4実装開始、本番公開、R005凍結解除はこの判定では許可しない。F2 APPROVED維持。
