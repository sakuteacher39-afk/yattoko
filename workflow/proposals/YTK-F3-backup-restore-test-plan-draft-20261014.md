# YTK-F3｜バックアップ・緊急退避・復元 F5/F6試験計画案 v0.1

- 起案：2026-10-14
- 状態：**DRAFT / NOT RUN / NOT APPROVED**
- 対応設計：`workflow/proposals/YTK-F3-backup-restore-design-draft-20261014.md`
- F2正式承認済み：`workflow/reviews/YTK-F2-human-approval-20261014.md`
- 本文の全チェック欄は**未実施**。採番は試験計画用でありPASSを意味しない。

## 判定の大原則
- F5の自動試験PASS、F6のPC Chrome・iPhone Safari実機確認、F3詳細設計の人間承認は**それぞれ別の判定**。
- 正常時にファイルを作れるだけでなく、破損／競合／容量不足／端末不調時に**旧データが消えない**ことを保証範囲ごとに検証。
- F3とF2の整合を全経路で確認。特にR001/R002親子整合、R07初回intention、R08 completed、R09 unanswered親fallbackを維持。
- テストデータは架空のサービス情報のみ。PW/PIN/OTP等の秘密を実ファイルやログに混入させない。

## F5 自動試験：正常書き出し

- [ ] F3-N-01 dataset未作成時、無意味な空backupを正常表示しない。
- [ ] F3-N-02 R001の12カテゴリ＋overview5問、`unanswered`・`unknown`の区別を完全保持。
- [ ] F3-N-03 R002 completedとcommitted partialを双方含める。inactive conditional keyは含まない。
- [ ] F3-N-04 normalの`pending=null`。未commit入力・画面履歴・mutationSeq・サービスのinheritedIntentionを含めない。
- [ ] F3-N-05 readonly transactionから一貫したsnapshotを作る。競合中の新旧版を混ぜない。
- [ ] F3-N-06 書出し操作でgenerationId/globalRevision/recordRevisionが変化しない。
- [ ] F3-N-07 同一snapshotのcanonicalバイト・checksum再現性、予め用意したSHA-256 test vectorとの一致。
- [ ] F3-N-08 ファイル名にサービス名、端末識別子などを入れない。日時重複時にもファイルを不用意に上書きしない。
- [ ] F3-N-09 SHA生成失敗、Blob生成失敗、download起動失敗時に「バックアップ保存完了」と誤表示しない。
- [ ] F3-N-10 ダウンロード後の実ファイル確認がブラウザーAPIから不明な場合は「保存先を確認」と案内する。
- [ ] F3-N-11 保存処理中に未commit入力があれば通常backupには含めず、その旨を同操作内で明示。
- [ ] F3-N-12 書出しはネットワーク／analytics／consoleの回答本文・ファイル本文送信を行わない。

## F5 自動試験：raw／projection／pendingの境界

- [ ] F3-C-01 raw 15,999,999 bytesを内容が有効なら検査対象にする。
- [ ] F3-C-02 raw 16,000,000 bytesを有効なら検査対象にする。
- [ ] F3-C-03 raw 16,000,001 bytesを**ファイルの中身を読み込む前**に拒否。
- [ ] F3-C-04 committed snapshot 10,000,000 JSON/UTF-8 bytesなら正常判定。
- [ ] F3-C-05 snapshot 10,000,001 bytesならraw limit以内でも拒否。
- [ ] F3-C-06 保存先新generationId／globalRevisionを反映したprospectiveサイズを審査。元ファイルだけ境界以内でも復元後超過なら拒否。
- [ ] F3-C-07 emergency pending 1,000,000 bytes／256件まで検査。
- [ ] F3-C-08 pending 1,000,001 bytes、257件は黙って切らない。全件未退避の警告、committedのみ代替、未保存画面維持を確認。
- [ ] F3-C-09 JSON depth16までは正規schemaなら評価、17超拒否。正規schemaと矛盾する深さは別途拒否。
- [ ] F3-C-10 16MB近傍のJSON parse／digest／2重serializationで過大メモリ・フリーズが起こらない、または安全に失敗する。
- [ ] F3-C-11 未圧縮／圧縮／ZIP偽装／巨大配列／多数キーなど悪意あるファイルを容量・型・構造で拒否。
- [ ] F3-C-12 emergency pendingにより10MBを超える**ファイル**はF2の10MB dataset制約と混同せず、ただしraw/pending限界内でのみ許可。

## F5 自動試験：形式と破損ファイル

- [ ] F3-V-01 有効なv1 root key／順序／enum／checksum／snapshotを読み込める。
- [ ] F3-V-02 不正拡張子でも安全な実JSON内容の確認を優先。拡張子のみで信頼しない。
- [ ] F3-V-03 非UTF-8・不正byte列はfatal decodeで拒否し置換文字へ黙って変更しない。
- [ ] F3-V-04 未対応BOM/圧縮／HTML／CSV、空・途中切断されたファイルを拒否。
- [ ] F3-V-05 1 byteの内容変更・SHA不一致を拒否し既存データ不変。
- [ ] F3-V-06 digest一致でも不正schema・未知field・禁止秘密fieldなら拒否。
- [ ] F3-V-07 SHAが偶発破損検出でありファイルの真正性・暗号化の証明でないとUI説明。
- [ ] F3-V-08 root / snapshot / nested answers / pending の未知フィールドを拒否。
- [ ] F3-V-09 JSON duplicate key（同名キーが異なる値・同じ値）を拒否。標準JSON.parseだけで黙って後値を採用しない。
- [ ] F3-V-10 未知`fileFormatVersion`/`schemaVersion`/`questionSchemaVersion`を推測変換せず拒否。
- [ ] F3-V-11 category12件不足・重複・余分、canonical categoryKeyとdisplayCode混同を拒否。
- [ ] F3-V-12 サービスrecordId重複、不正serviceCatalogIdとcategoryKey組合せ、未知questionを拒否。
- [ ] F3-V-13 R001`unanswered`と`unknown`の取り違えを拒否／再解釈しない。
- [ ] F3-V-14 R08：completed＋usageStatus=unanswered、不正otherServiceName、active conditional key missing、inactive key presentを拒否。
- [ ] F3-V-15 R09：unanswered親とoverride=nullが正常。画面ではundecidedを**派生**、保存snapshotへ複写しない。
- [ ] F3-V-16 R03：確定済みchild positiveと否定parentの矛盾したsnapshotを、勝手な自動修復なしで拒否。
- [ ] F3-V-17 control/bidi/長さ/NFCその他名のF2 validatorを、save/export/import/restoreで同一規範にする。
- [ ] F3-V-18 NaN/Infinity/非整数revision/不正UUID等の数値・識別子をreject。
- [ ] F3-V-19 ダウンロードファイルの日時やファイル名に偽装・任意テキストが含まれても表示をHTMLとして実行しない。

## F5 自動試験：復元・置換・原子性

- [ ] F3-R-01 ファイル選択→厳密検証→プレビュー段階でIndexedDB不変。
- [ ] F3-R-02 既存データありのとき明示確認がない限りreplace実行なし。
- [ ] F3-R-03 キャンセル時、旧データ・revision・generation不変。
- [ ] F3-R-04 pendingな画面入力がある場合は上書きによる喪失リスクを明示。無断merge/無断確定しない。
- [ ] F3-R-05 別ブラウザー・別端末から作った正常fileでもsnapshot schema一致なら復元。
- [ ] F3-R-06 partial/completedをそのままrestore。R001 12カテゴリ・R09 fallbackを保持。
- [ ] F3-R-07 preview後、別tabで書込み→generation/globalの不一致によりrestore停止・再確認。
- [ ] F3-R-08 transaction中のdelete/put/meta書込の途中abort→旧正本を全件維持。
- [ ] F3-R-09 置換時quotaエラー、通信なし、メモリ不足→旧正本維持または復旧不能要因を正確に報告。
- [ ] F3-R-10 successful full-replace時にgenerationId切替、旧tabからの再保存拒否。
- [ ] F3-R-11 初期化globalRevision/recordRevisionとF2容量が新世代で矛盾しない。
- [ ] F3-R-12 transaction request単体successで「復元成功」を表示しない。complete後にのみ確定。
- [ ] F3-R-13 ローカルデータが破損・読込不能でも、誤って初回状態と判定せず、ユーザーの明示確認による復旧経路を試験。
- [ ] F3-R-14 既存データとファイル側に同名サービスがあっても、自動merge/重複削除しない。
- [ ] F3-R-15 削除後に旧backupを利用者が明示復元する場合、当該ファイルからの復活可能性を確認画面で説明。削除済み記録を無断復活させない。
- [ ] F3-R-16 無効ファイルの復元を何度試しても既存データ不変。
- [ ] F3-R-17 初回データなしへの復元と、データありへの全置換を別パスで確認。

## F5 自動試験：緊急pending

- [ ] F3-E-01 正常なemergency envelopeには確定済みsnapshotとpending.operationsを別領域に保存。
- [ ] F3-E-02 pendingをcommittedと偽装しない。状態表示・件数・base版本が一致。
- [ ] F3-E-03 raw UI state、画面位置、秘密情報、mutationSeqを持ち出さない。
- [ ] F3-E-04 pending operationごとのtype/target/value/baseVersion/順序/条件分岐を検証。
- [ ] F3-E-05 古いgeneration/record revision/別タブで変更されたbaseのpendingを自動適用しない。
- [ ] F3-E-06 pendingが無効／大き過ぎ／不整合なら成功扱いしない。committedだけの代替fileと未退避警告を区別する。
- [ ] F3-E-07 emergency exportのfile生成が失敗したら、ファイル保存成功もpending退避成功も表示しない。
- [ ] F3-E-08 emergency fileを読み込んだ後、snapshot復元はatomic、pendingはUI上の未確定として独立。
- [ ] F3-E-09 pendingの再適用ボタン以外ではcommitしない。
- [ ] F3-E-10 再適用ではF2通常save gate（validator/親子整合/revision/10MB/transaction complete）を再通過する。
- [ ] F3-E-11 再適用が10MB超過・版不一致なら旧正本不変。pendingの手動確認と未適用表示を保持。
- [ ] F3-E-12 pendingを持ったまま画面終了した場合、端末正本へ未commit値を残さず、緊急ファイルに再度戻せる導線を案内。
- [ ] F3-E-13 通常backupとemergency fileで`kind`値が混ざらない。
- [ ] F3-E-14 committed側のchecksumとpending baseChecksum照合が不一致なら自動修復・適用しない。

## F5 自動試験：セキュリティと互換

- [ ] F3-S-01 XSS（サービス名/ファイル名/不正JSON）をtextContent相当で無害化。
- [ ] F3-S-02 URL query/analytics/APM/crash log/session replay/third-party scriptにsnapshot/pending/file内容を送信しない。
- [ ] F3-S-03 secret field及び外部account ID等のD区分allowlist外情報がファイルに含まれない。
- [ ] F3-S-04 利用者にJSONが平文で保管・共有時に読めることを説明。暗号化済みと誤表示しない。
- [ ] F3-S-05 ログにはエラー種別・処理段階のみ。ファイル全文／回答本文を出さない。
- [ ] F3-S-06 タブを跨ぐrestore/delete後generation guard維持。
- [ ] F3-S-07 外部送信なし。アップロード型file inputもブラウザー内処理のみ。

## F6 実機：PC Chrome

- [ ] F3-PC-01 最初の整理の途中（R001 answered/unknown/unanswered）でbackup→Chrome完全終了→復元、状態保持。
- [ ] F3-PC-02 R002 committed partial＋completed混在、normal backup→別ブラウザー/新しいプロファイルへrestore→表示一致。
- [ ] F3-PC-03 未回答parent配下service override=nullでR09未決定fallbackを再構成。
- [ ] F3-PC-04 existing dataありのreplace前プレビュー、キャンセル、明示確認、上書き、旧タブ拒否。
- [ ] F3-PC-05 保存失敗→emergency file保存→読込→committed復元→pending手動確認→F2 save gate再適用。
- [ ] F3-PC-06 ファイル保存時のダイアログ／ダウンロード先／物理ファイル確認。ブラウザーが保証しないことをユーザーへ正しく表示。
- [ ] F3-PC-07 大容量・破損ファイル・メモリ／quota条件で安全な失敗。
- [ ] F3-PC-08 同じデータを少なくとも書出し2回し、diff検証（日時・乱数等を除いたsnapshotの正規化同値）。

## F6 実機：iPhone Safari通常

- [ ] F3-IOS-01 Safariで普通のbackupファイルを実際に「ファイル」等へ保存し、名前・存在を人間が確認。
- [ ] F3-IOS-02 iPhoneのファイル選択からrestoreし、12カテゴリ・overview・partial/completedを完全復元。
- [ ] F3-IOS-03 PCで出したファイルをiPhoneへ、iPhoneで出したファイルをPCへ相互復元。
- [ ] F3-IOS-04 Safari終了・起動後も復元済み結果を確認。ただし長期natural evictionの実証と混同しない。
- [ ] F3-IOS-05 Safari「ほかのカテゴリも見る」由来のR09派生表示・親後変更・child usingの整合。
- [ ] F3-IOS-06 iPhoneで16MB近傍rawの読込、10MB近傍snapshot、SHA-256、JSON parse、UI応答性、メモリ負荷を測定。
- [ ] F3-IOS-07 ダウンロード取消・ストレージ不足・File API例外時にファイル保存完了を誤表示しない。
- [ ] F3-IOS-08 緊急退避のcommitted/pending分離・復元後未保存表示とmanual reapplyを確認。
- [ ] F3-IOS-09 プライベートモードの注意書き。保存可能に見えても長期保持保証をしない。専用検知/遮断を追加しない。
- [ ] F3-IOS-10 端末の画面回転／ファイルpicker復帰／戻る／別アプリ往復後、誤った自動復元やデータ消失を起こさない。

## F3設計レビューの判定案

- F3データ形式：APPROVABLE / CHANGES_REQUIRED
- 通常書出しとpending分離：APPROVABLE / CHANGES_REQUIRED
- strict importer / preview / atomic replace：APPROVABLE / CHANGES_REQUIRED
- ファイル容量／メモリ：APPROVABLE / CHANGES_REQUIRED
- 暗号化なし・全置換のみのUX：人間判断要否を明記
- F5計画：SUFFICIENT / CHANGES_REQUIRED、実結果：NOT RUN
- F6計画：SUFFICIENT / CHANGES_REQUIRED、実結果：NOT RUN
- F3全体：REVIEWED / HUMAN APPROVAL PENDING / NOT APPROVED（レビューPASSでも自動承認禁止）

## 現時点の停止条件

F2人間承認維持。F3設計案レビューまで。F3の自己承認、F4実装、F5/F6試験PASS、本番公開、R005凍結解除は禁止。
