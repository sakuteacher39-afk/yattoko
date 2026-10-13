# YTK-F2 F5・F6向け試験項目案

- 作成日: 2026-10-13
- 状態: **TEST PLAN PROPOSAL / NOT RUN**
- 設計完了をPASS扱いしない

## F5 自動試験

### A. record identity / S01
- [ ] serviceを3件作成し中央レコード削除後、残りを編集して誤レコード更新がない
- [ ] 並び順変更後もrecordId指定で正しいレコードを更新
- [ ] 同名serviceを2件作成しても自動mergeしない
- [ ] serviceCatalogId変更 / 表示名変更でidentityが変わらない
- [ ] `editIndex` / `inheritedIntention` が保存projectionに存在しない
- [ ] parent intention変更後、override=null serviceのeffective intentionが新親値になる
- [ ] overrideありserviceは親変更後もoverride維持

### B. R001/R002 consistency / S02
- [ ] R001 billing=no + R002 billing=yes -> 同一保存処理でbilling=yesへ肯定方向整合
- [ ] R001 finance=no + R002 asset=yes -> finance=yes
- [ ] R001 importantData=no + R002 importantData=yes -> yes
- [ ] R001 family=known + R002 familyKnow=no -> unknown_exists相当へ整合
- [ ] parent category=not_using + child usage=using -> 確認なしに矛盾をcommitしない
- [ ] 最後のbilling=yes service削除後にR001 billingをnoへ自動変更しない
- [ ] service全削除でparent categoryをnot_usingへ自動変更しない
- [ ] parent answer変更でhidden child answerをcommit前に除去
- [ ] consistency処理途中abortでR001だけ/R002だけの部分更新が残らない

### C. multiple tabs / S03
- [ ] tab A/B同revisionからA保存成功後、B保存はconflict
- [ ] conflict Bを単純retryしても古いexpected revisionのままなら拒否
- [ ] 別レコード編集でもglobalRevision不一致ならB案として停止
- [ ] delete service後、古いtabから同recordId再保存を拒否
- [ ] delete-all後、旧generation tabの全保存を拒否
- [ ] restore後、旧generation tabの保存を拒否
- [ ] BroadcastChannel通知なしでもrevision checkだけで保護できる
- [ ] notification順序逆転でもDB判定が正しい

### D. save ordering / S04
- [ ] IDB request success時点では保存済み表示しない
- [ ] transaction complete後だけ保存済み
- [ ] transaction abort/errorで保存済みを表示しない
- [ ] save中に次の回答変更を行い、古いcompleteが新入力を保存済みにしない
- [ ] 連打でsaveが並列化しない
- [ ] 100回連続変更でも最終値が最新値
- [ ] transaction中の不適切asyncを模擬してfail closed
- [ ] page navigation前後で未保存表示が矛盾しない

### E. delete / restore boundary / S05
- [ ] service delete atomic
- [ ] category deleteでcategory + child servicesをatomic削除
- [ ] category delete途中abortで全て旧状態
- [ ] delete-all途中abortで旧dataset維持
- [ ] delete-all成功でgeneration変更
- [ ] restore途中abortで旧dataset維持
- [ ] restore成功でgeneration変更
- [ ] unknown schemaVersion拒否
- [ ] required field欠落拒否
- [ ] unexpected field拒否
- [ ] unexpected nested object拒否
- [ ] duplicate recordId拒否
- [ ] duplicate category拒否
- [ ] malformed/empty datasetを新規状態として自動上書きしない

### F. secret / XSS / external flow / S06
- [ ] D区分field名を含む保存candidate拒否
- [ ] password/PIN/OTP/recovery/private key/card等の専用fieldがschemaに存在しない
- [ ] 「その他」名 >60文字拒否
- [ ] 制御文字/bidi制御候補を拒否
- [ ] HTML/JS文字列を保存しても表示時にDOM実行されない
- [ ] `<img onerror>` / `<script>` 等がtextとして表示される
- [ ] import JSONのprototype-pollution系keyを拒否
- [ ] error loggerへserviceName/answers/pending valueが出ない
- [ ] network mockで保存/復元/validation/error経路から整理内容送信0件
- [ ] session replay/APM hookへpayloadを渡さない

### G. capacity / S07
- [ ] canonical projection同一内容は並び順が違っても同byte数
- [ ] 10,000,000 bytes exactly -> pass
- [ ] 10,000,001 bytes -> reject
- [ ] update前はunder、置換後over -> rejectし旧値維持
- [ ] delete後size減少は許可
- [ ] ID/revision/schema/metaをcapacityへ含める
- [ ] revision桁増加後もpost-write sizeで判定
- [ ] conflictした古いsnapshot sizeで保存を許可しない
- [ ] QuotaExceededErrorをapp上限超過と混同しない
- [ ] UnknownError等は原因不明へ安全分類

### H. long-term / private / S08
自動試験ではbrowser policyによる自然消失をPASS証明しない。

- [ ] 利用開始警告blockが存在
- [ ] 「永久」「消えない」等の保証表現なし
- [ ] 保存済み状態がtransaction commitの意味だけ
- [ ] 完了/回答変更のたびにbackup催促しない
- [ ] private mode専用detector/強制blockを追加していない
- [ ] 原因不明エラーに既承認のprivate mode可能性補足

### I. backup / pending / S09
- [ ] normal backupはcommitted snapshotのみ
- [ ] emergency exportはpending存在を別領域/flagで識別
- [ ] pendingに禁止fieldがあればexport拒否または安全なエラー
- [ ] pending dependency不整合をsilent exportしない
- [ ] export file generation failureで成功表示しない
- [ ] restore時にpendingをsilent commitしない
- [ ] committedとpendingが矛盾した場合にsilent mergeしない

## F6 実機試験

### PC Chrome
- [ ] IndexedDB初回作成
- [ ] 回答確定保存
- [ ] reload後保持
- [ ] browser再起動後保持
- [ ] service追加/編集/削除
- [ ] category変更 / category削除
- [ ] 全削除
- [ ] backup file書出し
- [ ] restore
- [ ] 保存失敗UI
- [ ] emergency export
- [ ] 2タブ競合
- [ ] 古いtabからの再保存拒否
- [ ] delete-all後の古いtab拒否
- [ ] restore後の古いtab拒否
- [ ] 10MB近傍の操作応答
- [ ] DevTools Networkで整理内容外部送信なし
- [ ] Console / error monitoring相当へ本文出力なし

### iPhone Safari 通常
- [ ] 初回保存
- [ ] reload
- [ ] Safari終了/再起動
- [ ] service CRUD
- [ ] 複数tab
- [ ] conflict警告
- [ ] 未保存入力保持
- [ ] file download
- [ ] file restore
- [ ] 10MB近傍でUI停止/クラッシュ/transaction失敗の有無
- [ ] browser quota系失敗時の表示
- [ ] 長い「その他」名/日本語/emoji等のbyte計測

### iPhone Safari プライベート
- [ ] 利用開始時の赤文字注意
- [ ] 専用mode検知/遮断を要求していない
- [ ] IndexedDB書込成否を実測
- [ ] reload時挙動
- [ ] private session終了後の再訪挙動
- [ ] 保存失敗時に未保存入力を保護
- [ ] 失敗した保存を保存済みと表示しない
- [ ] 原因不明エラー補足文
- [ ] emergency export導線

### データ消失・復元
- [ ] 利用者操作でsite data削除 -> 消失を確認
- [ ] backupから復元
- [ ] 別PC/browserへ復元
- [ ] 書出元とは異なるiPhone/PCで復元
- [ ] 復元後に旧tabが残っている場合の保存拒否

### 長期消失リスクの扱い
Safariの「7日間のSafari利用日 + site interactionなし」等の自然policy消失を短期間のreload試験でPASS扱いしない。

実際に観測できなければ:
**NOT VERIFIED / 残存リスク**
として記録する。

## 判定ルール

- PASS: 期待結果を実測/自動assertで満たした
- FAIL: 期待結果と不一致
- NOT RUN: 未実施
- NOT VERIFIABLE IN TEST WINDOW: 現実的な試験期間で再現不能

NOT RUNやNOT VERIFIABLEをPASSへ読み替えない。
