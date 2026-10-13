# YTK-F2 F5・F6向け試験項目案

- 更新日: 2026-10-13
- 状態: **REVISED TEST PLAN / NOT RUN**
- 正式再々レビュー F2-R09（R09-01〜R09-11）とPC/iPhone reload・restart系列を反映
- 本文は試験計画でありPASS記録ではない

## F5 自動試験

### F5-CAT: category identity

- [ ] CAT-01 A↔device
- [ ] CAT-02 B↔base
- [ ] CAT-03 C↔mail
- [ ] CAT-04 D↔social
- [ ] CAT-05 E↔cloud
- [ ] CAT-06 F↔subscription
- [ ] CAT-07 G↔finance
- [ ] CAT-08 H↔commerce
- [ ] CAT-09 I↔auth
- [ ] CAT-10 J↔license
- [ ] CAT-11 K↔carrier
- [ ] CAT-12 L↔business
- [ ] CAT-13 persisted categoryKeyがR001 C[].idと一致
- [ ] CAT-14 R2CAT参照keyと一致
- [ ] CAT-15 R2Q参照keyと一致
- [ ] CAT-16 unknown categoryKeyをsave拒否
- [ ] CAT-17 unknown categoryKeyをimport/restore拒否
- [ ] CAT-18 fileにdisplayCodeを持たせるfixtureではkey/code不一致を拒否
- [ ] CAT-19 ordinary service editでcategoryKey変更を拒否
- [ ] CAT-20 synthetic dedicated move guardはcanonical categoryKeyだけを受理しdisplayCodeで対象決定しない

### F5-PART: R001 unanswered / partial save

- [ ] PART-01 datasetなしの初期表示は12category/5問すべて未回答として再構成
- [ ] PART-02 first category answerでbaseline+mutationを1transaction
- [ ] PART-03 first transaction後globalRevision=1
- [ ] PART-04 untouched categoryはusageStatus/intention=unanswered
- [ ] PART-05 12categoryの一部だけ回答→reloadして未回答との意味不変
- [ ] PART-06 overview 5問を1問だけ回答→reload
- [ ] PART-07 unknownとunansweredを別値として保持
- [ ] PART-08 explicit intention=undecidedとunansweredを別値として保持
- [ ] PART-09 category回答1変更につき対象record revision+1 / global+1
- [ ] PART-10 overview回答1変更につきoverview revision+1 / global+1
- [ ] PART-11 同じ値を再選択してもrevision/globalが増えない
- [ ] PART-12 transaction abortした回答は未commit、直前commit済み回答は維持
- [ ] PART-13 STEP移動だけではrevisionを増やさない

### F5-R07: R001 intention compatibility

- [ ] R07-01 usageStatus=unanswered + intention=unansweredのcategoryで初回status確定 -> intention=undecidedも同一transaction
- [ ] R07-02 R07-01でcategory record revisionは1回だけ増加
- [ ] R07-03 R07-01でglobalRevisionは1transaction分だけ増加
- [ ] R07-04 R07-01 transaction abortでusageStatus/intentionの片側だけ残らない
- [ ] R07-05 status確定後reloadでintention=undecidedを再構成
- [ ] R07-06 R002 intentionOverride=nullのeffective表示がparent undecidedと一致
- [ ] R07-07 intention=keepのcategoryでstatus変更してもkeep維持
- [ ] R07-08 intention=deleteのcategoryでstatus変更してもdelete維持
- [ ] R07-09 intention=familyのcategoryでstatus変更してもfamily維持
- [ ] R07-10 intention=undecidedのcategoryでstatus変更してもundecided維持
- [ ] R07-11 untouched categoryだけusageStatus=unanswered/intention=unansweredを維持

### F5-R2INT: R002 interrupted save

- [ ] R2INT-01 known service選択確定直後にpartial recordをcommit
- [ ] R2INT-02 known service identity確定直後にreloadしresume可能
- [ ] R2INT-03 「その他」選択だけではrecordを作らない
- [ ] R2INT-04 otherServiceName入力中はpendingのみ
- [ ] R2INT-05 valid name「利用状態へ」確定直後にpartial recordをcommit
- [ ] R2INT-06 otherServiceName確定直後にreloadしresume可能
- [ ] R2INT-07 usageStatus確定直後にreloadし値保持
- [ ] R2INT-08 optional 1問だけ回答後にreloadし値保持
- [ ] R2INT-09 active optional未回答はunanswered
- [ ] R2INT-10 inactive conditional keyは不存在
- [ ] R2INT-11 parent changeでconditional child非表示時、child keyを同一transactionで削除
- [ ] R2INT-12 parent changeでchild表示時、child keyをunansweredで生成
- [ ] R2INT-13 intentionOverride確定直後にreload
- [ ] R2INT-14 complete押下でrecordState=completed
- [ ] R2INT-15 optional未回答のままcompleted可能
- [ ] R2INT-16 partialとcompletedをreload後に識別可能
- [ ] R2INT-17 completed recordを開いただけではcompleted維持
- [ ] R2INT-18 completed recordの最初の変更で変更値+recordState=partialをatomic commit
- [ ] R2INT-19 edit再完了でcompletedへ戻る
- [ ] R2INT-20 「いったん詳細整理を終わる」単独でsave/revisionしない
- [ ] R2INT-21 save abortではそのmutationだけpending、直前committed partialは維持

### F5-R08: completed service invariant

- [ ] R08-01 partial + usageStatus=unansweredはvalid
- [ ] R08-02 complete押下 + usageStatus=unansweredはrejectしcompletedをcommitしない
- [ ] R08-03 completed + usageStatus=usingはvalid
- [ ] R08-04 completed + usageStatus=dormantはvalid
- [ ] R08-05 completed + usageStatus=unknownはvalid
- [ ] R08-06 importでcompleted + usageStatus=unansweredをreject
- [ ] R08-07 restoreでcompleted + usageStatus=unansweredをreject
- [ ] R08-08 normal loadでcompleted + usageStatus=unansweredをreject
- [ ] R08-09 completed other service + empty/invalid otherServiceNameをreject
- [ ] R08-10 active conditional field missingをreject
- [ ] R08-11 inactive conditional field presentをreject
- [ ] R08-12 invalid completedをpartialへ自動補正しない
- [ ] R08-13 intentionOverrideはnull/keep/delete/family/undecided以外をreject

### F5-R09: unanswered parent intention derived fallback

- [ ] R09-01 parent usageStatus=unanswered / intention=unansweredのcategoryを「ほかのカテゴリも見る」相当経路から選びservice identityを確定
- [ ] R09-02 service partial commit後もparent usageStatus=unanswered / intention=unansweredを維持し、serviceにはfallback intentionを複写保存しない
- [ ] R09-03 parent intention=unanswered + intentionOverride=nullで画面/effectiveはundecided（未決定）へfallback
- [ ] R09-04 reload後もparent canonicalはunansweredのまま、同じresolverで画面/effective=undecidedを再構成
- [ ] R09-05 browser restart後もparent canonicalはunansweredのまま、同じresolverで画面/effective=undecidedを再構成
- [ ] R09-06 normal backup→restoreおよびfile import/restore後もfallback値を保存データから読まず同じresolverでundecidedを再構成
- [ ] R09-07 parent intentionをkeepへ確定後、intentionOverride=null serviceはservice recordを書換えずeffective/display=keepへ追随
- [ ] R09-08 service intentionOverride=delete等がある場合、parent intention変更でもoverride値を維持し上書きしない
- [ ] R09-09 child usageStatus=using確定時、parent usageStatus=unansweredならparent usageStatus=using、parent intention=unansweredならundecidedをserviceと同一transactionでcommit
- [ ] R09-10 R09-09 transaction abort時、service / parent usage / parent intentionの片側だけcommitされない
- [ ] R09-11 R09-09成功時、changed service record revision+1、changed category record revision+1、globalRevision+1だけ増加

### F5-DIR: R001/R002 operation direction

#### service追加/編集起点
- [ ] DIR-01 parent=not_using + new child usage=using -> parent=usingへ同一transaction
- [ ] DIR-02 R001 billing=no + service billing=yes -> billing=yesへ同一transaction
- [ ] DIR-03 R001 finance=no + finance asset=yes -> finance=yes
- [ ] DIR-04 R001 data=no + service importantData=yes -> data=yes
- [ ] DIR-05 R001 family=known + service familyKnow=no -> family=hidden
- [ ] DIR-06 positive整合transaction abortでchildだけ/summaryだけ残らない

#### R001 negative変更起点
- [ ] DIR-07 child usingありでparentをnot_using -> commit拒否/再確認
- [ ] DIR-08 service billing=yesありでR001 billingをno -> silent commitしない
- [ ] DIR-09 finance asset=yesありでR001 finance=no -> silent commitしない
- [ ] DIR-10 importantData=yesありでR001 data=no -> silent commitしない
- [ ] DIR-11 familyKnow=noありでR001 family=known -> silent commitしない
- [ ] DIR-12 reject時にchildを削除/変更しない

#### detail negative / delete
- [ ] DIR-13 child using->dormant後もparentをnot_usingへ自動変更しない
- [ ] DIR-14 last billing=yes->noでもR001 billingをnoへ自動変更しない
- [ ] DIR-15 last asset=yes->noでもfinanceをnoへ自動変更しない
- [ ] DIR-16 last importantData=yes->noでもdataをnoへ自動変更しない
- [ ] DIR-17 last familyKnow=no->yesでもfamilyをknownへ自動変更しない
- [ ] DIR-18 service削除後parent/overviewをnegativeへ自動更新しない

### F5-ID/CONFLICT: record/global/generation

- [ ] ID-01 serviceはrecordIdで編集し配列順を使わない
- [ ] ID-02 中央record削除後も誤更新なし
- [ ] ID-03 同名service複数でもmergeしない
- [ ] CON-01 tab A save後、旧global tab B save拒否
- [ ] CON-02 partial serviceも競合保護
- [ ] CON-03 completed serviceも競合保護
- [ ] CON-04 conflict単純retryでforce overwriteしない
- [ ] CON-05 delete-all後旧generation save拒否
- [ ] CON-06 restore後旧generation save拒否
- [ ] CON-07 BroadcastChannel通知なしでもversion checkで拒否

### F5-SAVE: save ordering

- [ ] SAVE-01 request successでは保存済み表示しない
- [ ] SAVE-02 transaction completeのみ保存済み
- [ ] SAVE-03 abort/errorで保存済み表示なし
- [ ] SAVE-04 save中の次mutationをqueue
- [ ] SAVE-05 古いcompleteが新pendingを保存済みにしない
- [ ] SAVE-06 100連続変更で最終値が最新
- [ ] SAVE-07 1transaction内の複数record更新でもglobalRevisionは1回
- [ ] SAVE-08 changed record revisionは各1回
- [ ] SAVE-09 idempotent no-opはrevision不変

### F5-TXT: otherServiceName normalization / reject

- [ ] TXT-01 NFC normalizationを適用
- [ ] TXT-02 NFKCを適用しない
- [ ] TXT-03 leading/trailing whitespaceをtrim
- [ ] TXT-04 trim後empty拒否
- [ ] TXT-05 C0 control拒否
- [ ] TXT-06 DEL拒否
- [ ] TXT-07 C1 control拒否
- [ ] TXT-08 U+061C拒否
- [ ] TXT-09 U+200E/U+200F拒否
- [ ] TXT-10 U+202A〜U+202E拒否
- [ ] TXT-11 U+2066〜U+2069拒否
- [ ] TXT-12 canonical UTF-16 length=60受理
- [ ] TXT-13 canonical UTF-16 length=61拒否
- [ ] TXT-14 emoji等surrogate pairでUTF-16 unit基準がprototype maxLengthと一致
- [ ] TXT-15 save/import/restore/emergency exportで同一validator
- [ ] TXT-16 secret-like regex該当を保存しない
- [ ] TXT-17 invalid importを自動修復しない

### F5-CAP: canonical capacity

- [ ] CAP-01 top-level property order固定
- [ ] CAP-02 overview property order固定
- [ ] CAP-03 categoriesはdevice→business固定12順
- [ ] CAP-04 unanswered categoryも全12件含む
- [ ] CAP-05 serviceはrecordId昇順
- [ ] CAP-06 partial serviceも含む
- [ ] CAP-07 completed serviceも含む
- [ ] CAP-08 pending overlayはcommitted capacityから除外
- [ ] CAP-09 active optional unansweredを含む
- [ ] CAP-10 inactive conditional keyを含めない
- [ ] CAP-11 normalized otherServiceNameで計測
- [ ] CAP-12 record IDs/revisions/schema/question version/metaを含む
- [ ] CAP-13 同じsemantic datasetはinsert順に関係なく同byte数
- [ ] CAP-14 10,000,000 exactly受理
- [ ] CAP-15 10,000,001拒否
- [ ] CAP-16 update後prospective stateで計測しoverなら旧commit維持
- [ ] CAP-17 delete後size減少を許可
- [ ] CAP-18 browser quota errorをapp 10MB超過と混同しない

### F5-BKP/RST: backup / emergency / restore

- [ ] BKP-01 normal backupにcompleted serviceを含む
- [ ] BKP-02 normal backupにcommitted partial serviceを含む
- [ ] BKP-03 normal backupにR001 unansweredを含む
- [ ] BKP-04 normal backupにpending overlayを含めない
- [ ] BKP-05 emergency exportはcommittedとpendingを別領域
- [ ] BKP-06 pending metadataからbase generation/revisionを判別可能
- [ ] BKP-07 invalid pendingはfileへ入れず「退避成功」と表示しない
- [ ] BKP-08 emergency fileが10MB超でもIndexedDB上限違反と即断しない
- [ ] BKP-09 export file generation failureで成功表示しない
- [ ] BKP-10 pending dependency不整合をsilent exportしない
- [ ] BKP-11 pending validator不合格でcommitted部分だけexportした場合、「未保存入力は退避できていない」と区別表示
- [ ] RST-01 normal restoreでpartial/completed状態を保持
- [ ] RST-02 restore atomic replace失敗時は旧dataset維持
- [ ] RST-03 restore成功でgeneration変更
- [ ] RST-04 emergency pendingをsilent commitしない
- [ ] RST-05 pending再適用は通常save pipelineを通す
- [ ] RST-06 pending再適用で10MB超なら保存拒否
- [ ] RST-07 unknown schema/question version拒否
- [ ] RST-08 unknown categoryKey拒否
- [ ] RST-09 duplicate recordId拒否
- [ ] RST-10 malformed/empty datasetを新規状態として上書きしない
- [ ] RST-11 required field欠落拒否
- [ ] RST-12 unexpected field拒否
- [ ] RST-13 unexpected nested object拒否
- [ ] RST-14 duplicate category拒否
- [ ] RST-15 categoryKey/displayCode不一致を拒否（file形式にdisplayCodeが存在する場合）
- [ ] RST-16 completed + usageStatus=unansweredをreject
- [ ] RST-17 completed other serviceのinvalid otherServiceNameをreject
- [ ] RST-18 active conditional missing / inactive conditional presentをreject
- [ ] RST-19 invalid completed stateを自動補正しない

### F5-DEL: delete atomicity regression

- [ ] DEL-01 category deleteでcategory record + child servicesを同一transactionで削除
- [ ] DEL-02 category delete途中abortでcategory/childrenとも旧状態維持
- [ ] DEL-03 category delete成功後に一部childだけ残らない
- [ ] DEL-04 delete-all途中abortで旧datasetを全体維持
- [ ] DEL-05 delete-all成功で新generationIdへ切替
- [ ] DEL-06 delete-all成功後、旧generation tabの保存を拒否

### F5-ERR: 保存エラー6分類 regression

- [ ] ERR-01 ①app 10MB超過を正しく分類し既存committed stateを維持
- [ ] ERR-02 ②browser/device保存領域不足の疑いを根拠あるquota系失敗から分類し断定しすぎない
- [ ] ERR-03 ③保存機能制限をstorage unavailable/permission相当の根拠で分類
- [ ] ERR-04 ④multi-tab conflictをversion mismatchから分類し単純retryでforce overwriteさせない
- [ ] ERR-05 ⑤一時的保存失敗は合理的根拠がある場合だけ分類
- [ ] ERR-06 ⑥原因不明は根拠不足時に使用しprivate mode可能性の補足を表示
- [ ] ERR-07 全6分類で未保存入力を保持し保存済み誤表示なし
- [ ] ERR-08 retry可能/不可能の導線が分類に一致
- [ ] ERR-09 conflictでは「再試行」だけで保存せず最新版確認を要求
- [ ] ERR-10 technical exception name/secret/bodyを利用者文言やlogへそのまま出さない

### F5-SEC: XSS / external flow

- [ ] SEC-01 D区分field拒否
- [ ] SEC-02 free memo fieldなし
- [ ] SEC-03 HTML/JS文字列をtextとして表示
- [ ] SEC-04 prototype pollution系key拒否
- [ ] SEC-05 error logにserviceName/answer/pending本文なし
- [ ] SEC-06 network mockで整理内容外部送信0
- [ ] SEC-07 analytics/APM/replay hookへpayloadなし

### F5-LONG: long-term/private policy regression

- [ ] LONG-01 利用開始のlong-term loss注意を維持
- [ ] LONG-02 利用開始の適宜backup推奨を維持
- [ ] LONG-03 完了/回答変更/定期backup催促を追加していない
- [ ] LONG-04 private mode専用detector/blockを追加していない
- [ ] LONG-05 原因不明保存エラーのprivate mode補足を維持
- [ ] LONG-06 「永久」「消えない」等の保証表現なし

## F6 実機試験

### F6-PC Chrome: 中断→reload→続行 必須系列

- [ ] PC-PART-01 R001 category 1件だけ確定 → reload → 他11件unansweredのまま続行
- [ ] PC-PART-02 R001 overview 1問だけ確定 → reload → unknown/unansweredを区別
- [ ] PC-R2-01 known service選択確定 → 即中断/reload → partial resume
- [ ] PC-R2-02 otherServiceName確定 → 即中断/reload → partial resume
- [ ] PC-R2-03 usageStatus確定 → 即中断/reload
- [ ] PC-R2-04 optional 1問確定 → 即中断/reload
- [ ] PC-R2-05 optional未回答のままcomplete → reloadしてcompleted
- [ ] PC-R2-06 completed record編集1項目 → 中断/reloadしてpartial
- [ ] PC-DIR-01 service追加 child usingでparent not_usingからusingへatomic整合
- [ ] PC-DIR-02 child using存在中にparent not_using操作を拒否/再確認
- [ ] PC-BKP-01 normal backup→restoreでpartial/completed維持
- [ ] PC-CON-01 2tab競合、旧tab保存拒否
- [ ] PC-CON-02 restore/delete-all後の旧tab拒否
- [ ] PC-CAP-01 10MB近傍の操作応答/保存結果
- [ ] PC-NET-01 Network観測で整理内容外部送信なし
- [ ] PC-RESTART-01 browser完全終了→再起動後もcommitted partialを保持
- [ ] PC-RESTART-02 browser完全終了→再起動後もcompletedを保持
- [ ] PC-DEL-01 category delete成功後にcategory/childrenが一貫して消える
- [ ] PC-DEL-02 delete-all成功後の新generationで再開でき旧tabは保存拒否
- [ ] PC-R09-01 R001未回答categoryを「ほかのカテゴリも見る」相当経路から選択→service partial commit→親正本unanswered維持・画面は未決定
- [ ] PC-R09-02 PC-R09-01直後にreload→parent canonical unansweredを維持し画面/effective未決定を再構成
- [ ] PC-R09-03 PC-R09-01状態でbrowser完全終了→再起動→同じ未決定fallbackを再構成
- [ ] PC-R09-04 後からparent intention=keepへ確定→override=null serviceだけkeepへ追随
- [ ] PC-R09-05 child usage=using確定→parent usage=using + intention=undecidedをatomic反映

### F6-iPhone Safari 通常: 中断→reload→続行 必須系列

- [ ] IOS-PART-01 R001 category途中 → reload → 続行
- [ ] IOS-PART-02 R001 overview 1問だけ → reload → 続行
- [ ] IOS-R2-01 known service identity確定 → reload → partial resume
- [ ] IOS-R2-02 otherServiceName確定 → reload
- [ ] IOS-R2-03 usageStatus確定 → reload
- [ ] IOS-R2-04 optional 1問確定 → reload
- [ ] IOS-R2-05 complete / partialの識別
- [ ] IOS-DIR-01 detail positive -> summary positive atomic
- [ ] IOS-DIR-02 parent negative conflictをsilent commitしない
- [ ] IOS-CON-01 Safari複数tab競合
- [ ] IOS-BKP-01 file backup/restore
- [ ] IOS-CAP-01 10MB近傍でUI停止/crash/transaction失敗の有無
- [ ] IOS-TXT-01 日本語/emoji/結合文字のnormalization/length
- [ ] IOS-RESTART-01 Safari通常を終了→再起動後のcommitted partial保持
- [ ] IOS-RESTART-02 Safari通常を終了→再起動後のcompleted保持
- [ ] IOS-R07-01 category status初回確定後、再起動してintention=undecidedを再構成
- [ ] IOS-R08-01 completed serviceがusageStatus非unansweredのinvariantを維持
- [ ] IOS-R09-01 R001未回答categoryを「ほかのカテゴリも見る」相当経路から選択→service partial commit→親正本unanswered維持・画面は未決定
- [ ] IOS-R09-02 IOS-R09-01直後にreload→同じ未決定fallbackを再構成
- [ ] IOS-R09-03 Safari通常を終了→再起動後も同じ未決定fallbackを再構成
- [ ] IOS-R09-04 parent intention確定後、override=null serviceだけ新parent値へ追随
- [ ] IOS-R09-05 child usage=using確定時、parent usage=using + intention=undecidedを同一transactionで反映

### F6-iPhone Safari private

- [ ] PRIV-01 開始時赤文字注意
- [ ] PRIV-02 専用検知/遮断なし
- [ ] PRIV-03 IndexedDB書込成否を実測
- [ ] PRIV-04 reload/終了後/再訪挙動
- [ ] PRIV-05 保存失敗時pending保持
- [ ] PRIV-06 失敗を保存済み表示しない
- [ ] PRIV-07 原因不明補足
- [ ] PRIV-08 emergency export

### F6 restore / deletion

- [ ] RESTORE-01 site data削除後backup復元
- [ ] RESTORE-02 別PC/browser復元
- [ ] RESTORE-03 PC→iPhoneまたはiPhone→PC復元
- [ ] RESTORE-04 partial serviceも復元
- [ ] RESTORE-05 emergency pendingは自動commitされない
- [ ] RESTORE-06 restore後旧tab保存拒否

## 判定ルール

- PASS: 実測/assertで期待結果を満たす
- FAIL: 不一致
- NOT RUN: 未実施
- NOT VERIFIABLE IN TEST WINDOW: 現実的期間で検証不能

NOT RUN / NOT VERIFIABLEをPASSへ読み替えない。
Safari long-term natural evictionを短期reloadでPASSにしない。
