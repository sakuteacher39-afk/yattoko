# F4第4段階｜F6実機試験手順（未実施）

基準: 8797650d0187daa521f859529ec4d9195e1b97bb。実施対象は独立レビュー後に固定する第4段階commit。これは手順書であり実測結果・正式PASSではない。全150実機ケースは F5-F6-TRACEABILITY.json の phase=F6 から出典別に管理する。以下の系列だけで全ケースを合格扱いしない。

## 準備・記録

1. PC Chrome通常、iPhone Safari通常、iPhone Safariプライベートを別試験環境として用意する。端末型番、OS、ブラウザ版、空き容量、モード、origin、commit、実施日時を記録。対象最低対応iPhone/OSは制作管理室が確定する。未確定なら機種適合判定を保留。
2. 実利用データを含まない専用profile/originで実施。同一originの2タブを用意。HTTPSの閉じた試験配信環境とローカル静的資産のみを使い、本番公開しない。iPhoneのcrypto/File APIは実端末で確認。PCのlocalhost成功を代用しない。
3. ダミーのpartial/completedサービス、未回答カテゴリ、unknown回答、conditional childあり/なし、overrideあり/なしのfixtureを作る。PW/PIN/OTP/実アカウント・実整理内容は使用しない。試験用ファイルは暗号化されない。同期先を利用する場合は実データを置かない。
4. 毎ケース前後にcanonical projection全件、generation/global/record revisionを比較できる観測を用意する。記録はfixtureのみ。DevTools/Web Inspectorは試験専用で、製品コードへログ・計測・fault injectionを追加しない。
5. 結果欄: 出典:ID / 環境 / 前提 / 操作 / 期待 / 実測 / 証拠 / PASS・FAIL・NOT RUN・NOT VERIFIABLE。観測できない原子性・メモリはNOT VERIFIABLE。準備未完了はNOT RUN。正式判定は別レビュー。

## A. R001/R002・再読込・再起動

- R001カテゴリ1件、overview1問を各々確定しreload。他の未回答を維持、unknownとunansweredを区別する。途中画面へ通常の導線で再入場し続行する。
- R002 known/otherの名前確定直後、利用状態確定直後、任意回答1問直後、完了直後、完了後1項目編集直後に各々reload。recordIdの継続、partial/completed、任意未回答を確認する。
- 上記partialとcompletedをChrome/Safari完全終了・再起動でも反復。BFCache復帰、バックグラウンド、画面回転を含め、二重保存を確認する。
- R07初回カテゴリ利用状態→意向undecidedの同時反映、R08未回答利用状態で完了不可、R09未回答親からのサービス追加→親正本unansweredのまま画面は未決定→親意向変更時override=nullだけ追随を確認。child using時の親正方向整合も確認。
- 対応: F2 PC-PART/PC-R2/PC-RESTART/PC-R09、IOS-PART/IOS-R2/IOS-RESTART/IOS-R07/R08/R09等。

## B. 通常ファイル・取消・全置換

1. partial/completed混在で通常バックアップを生成。平文・対象/対象外説明を確認。picker取消、書込失敗、download fallbackを個別に確認。UIが物理保存完了を保証しないことを確認する。保存先にファイルが存在するかは人間が別途確認。
2. 同じファイルを別の専用profile/PC/iPhoneへ移し、選択→検証→preview→取消で正本不変。再選択し明示確認後だけ全置換。complete前の成功表示なし。snapshot一致、generation更新、global=1、record revision保持を確認。
3. 復元後の旧画面は保存停止する。pending/draftは自動消去しない。通常整理へ戻すには、保持入力の要否を確認し、必要な退避/手動再適用を終えてから既存の明示的な破棄・再読込操作を行う。自動再開を想定しない。
4. 日本語・emoji・結合文字・HTML風サービス名で繰り返し、文字列がDOM要素/スクリプトにならないことを確認。
- 対応: F3 PC-01〜04/17/20、IOS-A、F2 RESTORE系列。

## C. 保存失敗→緊急退避→復元→手動適用

1. 試験専用harnessで保存をquota/AbortErrorにする。未保存回答が画面に残り、後続保存が停止することを確認。実機quota自然発生と人工faultは別記録。
2. 通常ファイルにはcommittedのみ、緊急ファイルにはsnapshotと別pendingが入ることを検証。full/partial/noneを用意し、未収録件数と離散ordinal範囲をファイル・画面で照合。未収録は復元できない旨を確認。
3. 緊急ファイルを全置換してもpending未適用、元画面の入力保持。1件ごと確認→ack→適用。ackなし、二重tap、先行依存なし、他ファイル、再適用保存失敗を確認。失敗でreceiptを発行せず旧正本を維持する。
4. 同一session同一ファイル再選択はreceiptを検証。途中reload/完全終了後はreceiptを失い、内容一致だけで適用済みと推測しない。同じ回答で別generation、別タブ変更、同値no-opも確認。
5. 未退避の元入力を必要なら別途確保。確認なしで破棄しない。元入力がある場合の整理再開はB-3。
- 対応: F3 PC-11〜15/26〜30、IOS-B、F2 PRIV/RESTORE。

## D. 競合・破損・原子性・中断

- タブA/Bを同じ状態で開きA保存後B保存→B拒否。preview後に他タブ編集→restore拒否。restore/deleteAll後の旧タブ保存→generation guard拒否。pending適用前後の別タブ変更→停止。旧正本が競合で上書きされないことを全件比較する。
- duplicate/escape-equivalent key、unknown field、version違い、checksum違い、欠落/重複ID、UTF-8不正、BOM、truncated/過深JSONを各々取込拒否。旧正本・画面入力不変。
- CORRUPT_COMPARABLEは二段階確認とraw guard一致時のみ置換。CORRUPT_UNCOMPARABLEは復元禁止。閉じたDBもempty扱いしない。
- 専用harnessでGUARD→CLEAR→PUT→READBACK→COMPLETEを観測し、各段階abort、quota/DataError、READBACK差分、TransactionInactiveErrorを注入。旧正本全件を比較。File read/SHAがreadwrite前、READBACK同期照合、complete前成功なしを確認。
- タブ終了/OS killでtransaction中断も別ケース。fault注入だけで自然中断の成功を宣言しない。観測harnessがない項目はNOT RUN/NOT VERIFIABLEのまま残す。
- 対応: F3 PC-05〜10/16/21〜25、IOS-TX、F2 PC/IOS-CON。

## E. 暫定上限・Safari性能

- canonical 10,000,000 UTF-8 bytesの直下/一致/超過。raw 16,000,000、pending 1,000,000、256操作も各々直下/一致/超過。JSON全体とprojectionの上限を混同せず、多byte文字、サービス件数、依存chain全体除外を含める。
- raw/pending/操作数は暫定値。承認なしに引き上げない。構文が不正なサイズfixtureの拒否を有効最大ファイルの成功と混同しない。
- F3 IOS-PERF-01〜20に従いforegroundで各5回。File read/decode/scan/JSON.parse/serialize/SHA/semantic/total時間、100ms heartbeat最大gap、peak memory/resident delta、crash/OS killを記録。計画のgap≤2,000ms、total≤15,000msと照合。メモリ測定不能は16MB安全性NOT VERIFIABLE。計測分割には別途試験専用instrumentationが必要で本段階未作成。
- FAIL時は上限引下げ案を別途レビュー。製品の暫定値をこの手順で変更しない。

## F. セキュリティ・private・保持

- Networkを開き静的資産の取得とfixture操作後の通信を分ける。保存/バックアップ/復元/失敗時に整理内容の外部送信0。console各レベルに整理内容0、認証/analytics/error loggingなし。試験fixtureの証拠だけを保存。
- Safariプライベートで警告、IDB成否、reload/終了/再訪、緊急file選択・取消を実測。専用detector/blockがないことを確認。長期自然evictionや同期先挙動は短期成功から推測しない。
- iOS randomUUID primary/fallback、共有シート、Files/iCloud可能性注意、Safari復帰は実機で別確認。
- 完了後の試験データ削除は試験profile/originのみ。実利用データへ破壊試験を行わない。

## 未実施事項

全F6ケース未実施。実ブラウザのlocation.reload、完全終了、download/picker物理保存、OS中断、実容量不足、Safari transaction activity、最低機種性能・メモリ、自然evictionは開発テストの対象外。jsdom/fake-indexeddb結果をF6証拠に代用しない。
