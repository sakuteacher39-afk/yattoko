# YTK-F2 保存設計 正式再々レビュー F2-R09差戻し対応 再審査依頼

制作管理室 御中

2026-10-13付正式再々レビュー
`workflow/reviews/YTK-F2-storage-safety-formal-rereview2-20261013.md`
（commit `b802b1dae3646b09f526b6dd0af76cc329831681`）
で新規CHANGES_REQUIREDとなったF2-R09と、その対応F5/F6試験について既存5成果物を更新しました。

直前レビューでRESOLVED / MAINTAINEDとなったF2-R01・R03〜R08、および復元済みF5/F6回帰試験は変更・後退させていません。

本再提出は**F2全体の自己承認ではありません**。
F5/F6は未実施であり、安全性試験PASSも宣言しません。

## 再提出5成果物

1. `workflow/proposals/YTK-F2-storage-safety-revision-20261013.md`
2. `workflow/proposals/YTK-F2-S01-S09-response-matrix-20261013.md`
3. `workflow/proposals/YTK-F2-unresolved-risks-20261013.md`
4. `workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md`
5. `workflow/reviews/YTK-F2-storage-design-review-request-20261013.md`

## 前回F2-R01〜R06対応（RESOLVED 5件を維持）

### F2-R01 category identity
- canonical persisted keyを既存R001/R002内部IDへ固定
- A〜Lはdisplay codeのみ
- recordId/categoryKey/displayCodeを分離
- unknown key / key-code mismatchをreject

### F2-R02 partial/unanswered/save event
- `unknown` と `unanswered` を分離
- R002 `recordState=partial/completed`
- committed partialとpending overlayを分離
- R001 category/overview、R002 known/other/usage/optional/intention/completeの保存イベント表を追加
- transaction complete済み途中状態はreload後も正本
- screen/historyは保存しない

### F2-R03 operation direction
- detail positive起点 -> R001 positiveへ同一transaction
- R001 negative起点 + positive detail -> commit停止/再確認
- detail negative/delete -> R001 negative自動更新なし
- current UXではcategory move非提供、ordinary editでcategoryKey変更禁止

### F2-R04 text validator
- NFC
- trim
- C0/C1/DEL拒否
- bidi control拒否
- canonical UTF-16 1〜60
- NFKC不採用
- save/import/restore/emergency exportで同一規範

### F2-R05 capacity
- canonical category fixed order
- explicit unanswered
- partial/completed service両方を含む
- property order / answer presence ruleを固定
- pending overlayはcommitted 10MB projection外
- 10,000,000 / 10,000,001境界は変更なし

### F2-R06 F3 vocabulary
- normal backup = transaction complete済み正本
  - completed service
  - committed partial service
- emergency exportのみpending overlayを別領域へ追加可能
- restoreでpendingをsilent commitしない
- pending再適用は通常save pipelineと10MB gateを再通過

### F2-R07 R001 intention compatibility
- category status初回 `unanswered -> answered` 時、intention=unansweredなら同一transactionでundecided
- category/global revisionは1transaction分だけ進む
- keep/delete/family/undecidedはstatus変更で上書きしない
- untouched categoryだけintention=unansweredを維持

### F2-R08 completed invariant
- completedはusageStatus∈{using,dormant,unknown}必須
- usageStatus=unansweredのcompletedは禁止
- service identity / otherServiceName / conditional presence / intentionOverrideをcross-field validation
- save/load/import/restoreで同一validator
- invalid completedを自動補正しない

### F5/F6回帰復元
- category delete / delete-all atomicity
- strict restore validation
- emergency export fail-closed
- 保存エラー6分類
- PC Chrome browser restart後のpartial/completed
- iPhone Safari通常の終了/再起動後のpartial/completed

### F2-R09 unanswered parent intention fallback
- R001未回答categoryからR002 service identityを追加しただけではparent usage/intention正本を変更しない
- intentionOverride=null + parent intention=unansweredでは画面/effectiveだけundecidedへfallback
- fallback値をservice recordへ保存しない
- reload / browser restart / normal backup restore / file import restoreで同じresolverから再計算
- parent意向確定後、override=null serviceだけ新parent値へ追随
- overrideありserviceは維持
- child usage=usingでparent usageを肯定整合する場合、parent intention=unansweredならF2-R07も同一transactionで適用
- changed service/category revision各+1、globalRevision+1、abort時片側commitなし

### F5/F6 R09追加
- F5へR09-01〜R09-11を番号そのままで追加
- PC Chromeへ未回答category→service partial→reload→browser restart→fallback再構成系列を追加
- iPhone Safari通常へ同系列を追加

## 既承認事項の維持確認

変更していない:
- IndexedDB
- 10,000,000 byte
- JSON/UTF-8
- 保存失敗UX / 6分類
- multi-tab B案
- 保存3原則
- long-term loss warning
- 利用開始時backup推奨
- 追加backup催促なし
- private mode注意中心 / detectorなし
- emergency export
- R003秘密情報禁止
- R005凍結

## 再審査で確認してほしい事項

1. parent canonical intention=unansweredをservice選択だけで変更していないか
2. override=null時だけdisplay/effectiveをundecidedへfallbackする規則が一意か
3. fallback値をserviceへ複写保存していないか
4. reload / browser restart / backup restore / import restoreで同じresolverから再計算できるか
5. parent intention確定後にoverride=null serviceだけ追随し、overrideありを上書きしないか
6. child usage=using時にR03 parent usage整合 + R07 intention初期化を同一transactionで行うか
7. F5 R09-01〜R09-11をすべて含むか
8. PC Chrome / iPhone Safari通常のreload・restart系列を含むか
9. F2-R01・R03〜R08および既存回帰試験を後退させていないか

## 希望判定形式

- F2-R09: RESOLVED / CHANGES_REQUIRED
- F2-R02残存不備: RESOLVED / CHANGES_REQUIRED
- F2-R01/R03/R04/R05/R06/R07/R08 regression: MAINTAINED / REGRESSED
- S01〜S09設計是正全体: PASS / CHANGES_REQUIRED
- F5/F6試験計画: SUFFICIENT / CHANGES_REQUIRED
- F2全体: REVIEWED / NOT APPROVED
- 人間追加判断: REQUIRED / NOT REQUIRED

## 停止位置

制作管理室の再レビュー完了まで停止。

禁止:
- F2全体承認
- F3詳細承認
- F4実装
- F5/F6未試験をPASS扱い
- 本番公開
- R005凍結解除
- 認証/クラウド同期再開
