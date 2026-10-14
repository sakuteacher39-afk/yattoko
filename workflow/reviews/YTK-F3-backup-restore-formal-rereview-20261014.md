# YTK-F3 正式再レビュー（2026-10-14）

対象commit: 5ea32334c99a8377b6ea6fae74b9e62882fddc16
前回レビューcommit: 597c8ab531f2bd68990f1e652696c1ba34f665d7
対象: F3設計v0.2、F5/F6試験計画v0.2、正式再レビュー依頼書（3件）
参照: F2人間承認commit 263efbf030693efb5d8071fcba6f93e4970971b1、Notion F3専用ページ、最新状態マスター

総合: **CHANGES_REQUIRED / F3 NOT APPROVED**
F2: **APPROVED維持 / MAINTAINED**
F5: **CHANGES_REQUIRED / NOT RUN**
F6: **計画は概ねSUFFICIENT / NOT RUN**（追加回帰を要求）

## 7件の個別判定
- R01 RESOLVED（設計是正）：pending依存component、未退避件数、画面保持を定義。実試験未実施。
- R02 RESOLVED（設計是正）：decoded duplicate key検査、canonical raw一致、SHA-256、strict validationを規範化。実試験未実施。
- R03 CHANGES_REQUIRED：IndexedDB readwrite transactionの途中でprecomputed digestとの比較とreadback digestを要求するが、非同期WebCrypto処理を用いずにどう実行するかが未確定。transactionの自動commitを招かない同期的bytes比較など具体手順が必要。
- R04 RESOLVED（設計是正のみ）：16MB/1MB/256件は暫定。iPhone Safariの性能・メモリ実測前に安全とは判定しない。
- R05 CHANGES_REQUIRED：同じcontent fingerprintの別generationを同一復元と誤認する可能性がある。expected-after一致だけでは既適用の証明にならず、未適用操作を誤スキップし得る。
- R06 RESOLVED（設計是正のみ）：平文JSON、共有・同期・誤共有リスクを説明。採否は人間承認待ち。
- R07 RESOLVED（設計是正のみ）：schema/question version・record/generation IDはUNBOUND。ACTIVE registryなしにproduction export/importを有効化しない。

## 制作部への差戻し（必須）
1. **R03-A（P0）**：preflightとtransaction中の検証を分離。readwrite処理中に非同期digestを待たず、書込後readbackの内容・容量・照合方法を実装可能な手順へ固定する。途中abort時の旧正本維持をF5/F6で試験。transaction inactive、自動commit、readback不一致の試験を追加。
2. **R05-A（P0）**：content一致のみのpending-only recoveryを禁止。復元後generationと復元元ファイルの同一性を確認する安全なprovenance/operation ID規範を定義。current==intended-afterのみでalready-applied判定しない。異世代同一内容、未実施なのに同値、途中適用・二重取込・別tab編集・ブラウザ再起動をF5/F6へ追加。

## 境界
F3未承認、F4実装未許可、F5/F6 NOT RUN、本番公開未許可、R005凍結。
人間判断待ち：平文JSON、全置換のみ、fileFormatVersion=1、暫定容量3値、ACTIVE version registry binding。F2の変更は承認しない。
次：制作部が3成果物を再修正し制作管理室が再々レビュー。
