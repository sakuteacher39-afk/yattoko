# YTK-F3｜バックアップ・復元詳細設計 人間正式承認記録（2026-10-14）

## 1. 人間の明示判断

- 承認日：**2026-10-14（JST）**
- 人間の明示発言：**「F3は正式に認証する」**。直前の「F3設計全体の正式承認」への応答であり、文脈上 **F3設計全体を正式承認する意思表示**として取り扱う。「認証」をソフトウェアの認証機能の解禁とは解釈しない。
- 正式状態：**F3 DESIGN APPROVED（条件付き・設計のみ）**。
- 承認範囲：制作部F3設計v0.3提出コミット `3b54acbe7d85f60b3f8b4ffcd9b723cdc02b5641` の以下3成果物、および制作管理室の正式再々レビュー（DESIGN REVIEW PASS）コミット `3856a9b5dc98fdf054bdb71673d779c2ae0457c2` で設計審査された範囲。
  1. `workflow/proposals/YTK-F3-backup-restore-design-draft-20261014.md`
  2. `workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md`
  3. `workflow/reviews/YTK-F3-backup-restore-design-review-request-draft-20261014.md`
- 制作管理室審査原本：`workflow/reviews/YTK-F3-backup-restore-formal-rereview2-20261014.md`。
- **設計審査PASS・人間承認は、動作試験PASS・セキュリティ実証・実装着手許可・本番公開許可ではない。**

## 2. 設計方針として承認した事項

1. **通常バックアップ・緊急退避・復元のF3 v0.3設計全体**。F2の確定済みデータ・途中確定済みpartialと、未コミットpendingを区別する。緊急退避で未退避があれば明示し、成功を偽らない。
2. **バックアップ形式：暗号化なしの平文JSON（v1）**。書出し前に共有PC、共有フォルダ、iCloud Drive等への同期、誤共有による情報露出を説明する。暗号化済みと誤表示しない。ヤットコ自身の自動クラウドアップロード、認証、サーバー保存は導入しない。
3. **復元方式：利用者の明示確認後の全置換のみ**。自動mergeや自動上書きをしない。破損・競合・容量超過・transaction失敗では安全に停止し、既存正本の維持を設計上要求する。
4. **`fileFormatVersion=1`** を初期ファイル形式の設計版番号として採用する。これは後記のF2データスキーマ版番号を自動で確定するものではない。
5. **未保存pendingの保護と二重適用防止**：sourceFileId・復元後generation・operationId・同一セッション内の完了receipt・revisionを使い、内容が同じだけでは適用済みとみなさない。証拠喪失時は自動適用も自動skipもしない。ブラウザー再起動を跨いだexactly-once自動再開は提供しない。
6. **F2承認仕様の維持**：端末IndexedDB保存、committed正本の10,000,000 byte上限、parent/child整合とR07〜R09、秘密情報禁止、利用開始画面の消失リスク／適宜バックアップ推奨、保存失敗時の緊急退避、R005凍結を維持する。

## 3. 保留した技術条件・残存リスク

- **ファイルサイズと緊急pendingの上限候補**：raw 16,000,000 byte／pending 1,000,000 byte／256件は **PROVISIONAL（暫定候補）** として設計を進めることを承認。これを安全な最終閾値と認定したわけではない。F6 iPhone Safariのメモリ・処理時間・ファイル操作実測とF5境界試験を踏まえ、維持または引下げを別途判断する。性能不足の場合は無理に値を維持しない。F2確定済み正本10MBとraw file上限は別物。
- **version registry：UNBOUND/BLOCKING継続**。 `schemaVersion`、`questionSchemaVersion`、`recordId`、`generationId` の具体的な値・文法・生成方法・ACTIVE bindingは**未確定・未承認**。制作部が具体案を作成し、制作管理室の独立審査と必要な人間承認を経ること。**ACTIVE registryが確定するまで本番の書き出し／取込／復元機能を有効化禁止**。
- 不正・破損ファイルのreject、IndexedDB atomic rollback、競合保護、緊急pending二重適用防止、別端末互換、iPhone Safariの長期保存消失、実ファイルの保存成否、物理メモリ、平文ファイルの保護などは**実機安全性未実証**。F5自動安全性試験・F6 PC Chrome/iPhone Safari実機検証で確認し、未検証事項をPASSにしない。
- SHA-256 checksumは破損検出であり、真正性・暗号化・改ざん対策の完全な保証ではない。
- 保存先にファイルが実在することをブラウザーが確認できない場合は「保存済み」と断定しない。

## 4. 非承認事項と工程ゲート

| 工程／判断 | 現時点の正式状態 |
|---|---|
| F0 無料版優先への方向転換 | COMPLETE |
| F1 R005凍結台帳 | APPROVED |
| F2 端末保存設計 | APPROVED（2026-10-14、既存の人間承認を維持） |
| **F3 バックアップ・復元詳細設計** | **APPROVED（2026-10-14、人間正式承認・設計のみ）** |
| F4 無料版実装開始 | **NOT AUTHORIZED**（別途の明示承認が必要） |
| F5 自動安全性試験 | **NOT RUN**（計画SUFFICIENTは実施PASSではない） |
| F6 PC Chrome／iPhone Safari実機試験 | **NOT RUN** |
| F7 公開審査 | NOT STARTED／NOT APPROVED |
| F8 本番公開 | NOT AUTHORIZED |
| R005 認証・クラウド基盤 | FROZEN |

**本承認はF4の実装着手、認証・クラウド再開、暗号化導入、追加分析・第三者スクリプト・外部送信、R005凍結解除、本番公開の権限を一切付与しない。**

## 5. 次工程と引継ぎ

- **次の作業**：F2／F3承認済み設計に基づいて実装前の未確定技術条件（version registryの具体値・ID生成規則、F4工程の制作範囲・検証ゲート）を制作部が提案し、制作管理室が独立レビューする。人間への追加承認判断が必要な事項は区別して提示。
- **F4実装を開始するには別途人間の明示許可が必要**。本承認のみを根拠にコード変更へ進まない。
- F5/F6試験が実際に実施される前に「動作確認済み」「安全性PASS」と報告しない。

## 6. 証跡と正本の優先順位

- 人間の明示意思表示（2026-10-14）
- 本GitHub人間承認記録
- F3提出コミット `3b54acbe7d85f60b3f8b4ffcd9b723cdc02b5641`
- F3制作管理室正式再々レビューコミット `3856a9b5dc98fdf054bdb71673d779c2ae0457c2`
- F2既承認記録 `workflow/reviews/YTK-F2-human-approval-20261014.md`
- Notion最新状態マスター／F3専用ページ

既存の古い「F3 NOT APPROVED」「レビュー待ち」は履歴であり、**2026-10-14付の本記録以降の正式な承認状態はF3 DESIGN APPROVED**。リスクや残作業の未完了状態はそのまま維持する。
