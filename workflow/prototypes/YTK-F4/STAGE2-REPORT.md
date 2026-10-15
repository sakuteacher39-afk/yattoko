# F4 第2段階 実装報告（2026-10-15）

基準commit: 595252fc479a4f7cfb9e120b091434e7603327af（人間の第1段階独立レビューPASS指示に基づく）
専用branch: codex/f4-stage2-backup
設計正本: F2 0d5dfa387f924e5dc3dc9196b9f236986c910281 / F3 3b54acbe7d85f60b3f8b4ffcd9b723cdc02b5641 / F4 3036275123420d1be4a4607e4e64d7ec1ab9304c
ACTIVE: ytk-free-v1-registry-20261015

## 実装した機能

- 単一readonly transactionのcommitted snapshotによる通常バックアップ。unanswered、partial、completedを保持し、pending/draftは必ず除外。
- pending/draftを最初のawaitより前に複製する緊急退避。正本と別領域にcapture summary・operation・base・dependencyを格納。
- baseのgeneration/global/record guard、条件質問context、依存componentのall-or-nothing validation。invalid/競合/missing/no-opを除外し独立valid componentはpartial収録。
- 不正raw値をファイルへ混入させず、未収録件数・カテゴリ・項目種別・ordinal範囲・理由を明示。元の画面値は保持。
- canonical JSON/UTF-8/BOMなし、ACTIVE version、SHA-256、snapshot/content fingerprint、利用者値を含まないfilename。
- 平文リスク・共有端末/共有folder・OS側自動同期・SHAの限界を生成前に表示。対象/対象外、暫定上限を明示。
- ファイル生成と保存操作を分離。File pickerとBlob/download fallback。キャンセル/生成・digest・Blob・write等の失敗で成功表示をしない。API成功も物理保存完了とは表示しない。
- 上限超過ではpending全体をnoneにし、committed snapshotと未収録summaryだけのファイルを明示的に保存できる。操作を黙ってtruncateしない。

## 変更ファイル

全て workflow/prototypes/YTK-F4/ 配下:

- src/backup.mjs（新規）
- src/file-save.mjs（新規）
- src/backup-ui.mjs（新規）
- src/canonical.mjs（純粋pending検証の容量検査option。実保存は従来どおり必ず検査）
- src/ui-adapter.inc（backup UIの接続、freeze対象の取得）
- build-ui.mjs（backup module import）
- index.html（再生成）
- test/backup.test.mjs（新規）
- test/file-save-ui.test.mjs（新規）
- test/stage1.test.mjs（外部transport/logging sink検査対象拡張）
- test/ui.test.mjs（実画面保存失敗からnormal/emergency/cancelまでの回帰）
- BACKUP-FORMAT.md（新規、F3 file field orderの実装binding）
- STAGE2-REPORT.md（本書）

## 実行した検証

- npm run generate: 成功。
- npm test: 60 tests / 60 pass / 0 fail / 0 skip。
- git diff --check: 成功。

第1段階の35件に25件追加。F3 DIGEST-01規範vector、canonical JSON/checksum、正常snapshotのpartial/completed/unanswered保持、通常pending非混入、読取1回、並行writeとのsnapshot一貫性、freeze後UI変更、依存chain、invalid component一括除外、base3種不一致、inactive child、missing/no-op、valid/invalid draft、unknown値/Unicode防御、256/257操作、pending1MB/raw16MBのexact境界、実pending1MB超candidate全体除外、committed10MB以内＋pending適用時10MB超の退避、generation/revisionを除くcontent fingerprint、生成/digest/Blob/write/close/cancel/download失敗、平文確認撤回、未保存入力・正本不変を検証。

raw16MB/pending1MBのexact byte境界は共通gateの算術単体試験を含む。raw16MBの実iPhone保存やメモリ性能の証明ではない。

## 残存リスク・未検証

- PC Chrome/iPhone Safari実機、downloadの実ファイル確認、OS側キャンセル・共有/同期、実quota・private mode・OS killは未検証。
- raw16MB/pending1MB/256操作は暫定のまま。最古サポートiPhoneの性能・メモリ・heartbeat測定と上限の最終判断は未実施。
- pending純粋検証はcomponentごとにdatasetを複製・検証する。10MB近傍や多数操作時の時間/メモリは実機での確認が必要。
- 未保存入力はtab memoryに保持するが、close/reload/crash後の復旧を保証しない。保存開始表示は物理保存完了を意味しない。
- anchor方式のキャンセルは検知できない。保存先確認を案内する。Blob URLは開始後60秒で解放するが、Safari動作は要実機確認。
- 正本未作成/破損/読取不能ではsnapshotを捏造せず書出しを停止する。その場合の未保存入力は画面に残る。
- 他tabでbaseが変わったpendingは新snapshotへrebaseせず除外する。保守的dependency groupingにより一緒に除外される範囲が広くなる場合がある。
- generation失敗でID未確定のconfirmed service追加はcanonical操作として収録できず未収録扱い。未確定の有効draftはファイルcandidate用IDを生成できた場合だけ収録する。
- 第2段階の独立実装レビューは未実施。将来の厳格importとの相互運用は第3段階で検証が必要。

## 承認仕様との差分・停止位置

canonical storage schema、ACTIVE registry、manifest、R07/R08/R09、10MB実保存上限、秘密情報禁止・外部送信禁止の変更なし。F3で要求されたoperation/context/summaryの固定field orderと内容fingerprintの具体的projectionをBACKUP-FORMAT.mdに記録。

取込scanner、import、preview、restore、pending再適用は実装していない。F5/F6全体の合格、本番公開、R005凍結解除を宣言しない。第2段階の実装と開発テスト終了時点で停止する。
