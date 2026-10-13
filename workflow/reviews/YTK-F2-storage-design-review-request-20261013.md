# YTK-F2 保存設計 正式再レビュー差戻し対応 再審査依頼

制作管理室 御中

2026-10-13付正式再レビュー
`workflow/reviews/YTK-F2-storage-safety-formal-rereview-20261013.md`
（commit `8d1845b21d3e096bfce3d7482066cbe85defee2e`）
でCHANGES_REQUIREDとなったF2-R02の残存事項F2-R07 / F2-R08、およびF5/F6試験計画の回帰漏れについて、既存5成果物を再更新しました。

前回F2-R01 / R03 / R04 / R05 / R06のRESOLVED判定を前提に、その規範は変更していません。

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

1. F2-R07が現行R001 prototypeのstatus→undecided初期化と一致するか
2. F2-R07で既存keep/delete/family/undecidedを上書きしないか
3. F2-R08のcompleted cross-field invariantが現行R002 UXと一致するか
4. normal load / import / restoreで同じcompleted invariantがfail closedで適用されるか
5. delete atomicity / strict restore / emergency export fail-closed / 保存エラー6分類がF5へ復元されたか
6. PC Chrome / iPhone Safari通常のbrowser restart保持がF6へ復元されたか
7. 前回RESOLVEDのF2-R01/R03/R04/R05/R06を崩していないか

## 希望判定形式

- F2-R07: RESOLVED / CHANGES_REQUIRED
- F2-R08: RESOLVED / CHANGES_REQUIRED
- F2-R02残存不備: RESOLVED / CHANGES_REQUIRED
- F2-R01/R03/R04/R05/R06 regression: MAINTAINED / REGRESSED
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
