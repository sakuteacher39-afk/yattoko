# YTK-F2 保存設計 差戻し対応 再レビュー依頼

制作管理室 御中

2026-10-13付正式レビュー
`workflow/reviews/YTK-F2-storage-safety-formal-review-20261013.md`
（commit `e2fa1bb23c8c57219d4d6c87467879a7f62a684e`）
でCHANGES_REQUIREDとなったF2-R01〜R06について、既存5成果物を更新しました。

本再提出は**F2全体の自己承認ではありません**。
F5/F6は未実施であり、安全性試験PASSも宣言しません。

## 再提出5成果物

1. `workflow/proposals/YTK-F2-storage-safety-revision-20261013.md`
2. `workflow/proposals/YTK-F2-S01-S09-response-matrix-20261013.md`
3. `workflow/proposals/YTK-F2-unresolved-risks-20261013.md`
4. `workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md`
5. `workflow/reviews/YTK-F2-storage-design-review-request-20261013.md`

## F2-R01〜R06対応

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

## 再レビューで確認してほしい事項

1. categoryKeyを既存内部IDへ固定したことでF2-R01が解消したか
2. unanswered / committed partial / completed / pendingの意味分離が十分か
3. event単位の保存境界が「回答確定ごと保存」を満たすか
4. operation-direction matrixがR003 APPROVEDと一致するか
5. otherServiceName規範とF5試験が一致しているか
6. canonical capacity projectionが一意か
7. normal backup / emergency / restoreの語彙・境界がF3引継ぎとして十分か
8. 追加F5/F6 test IDsが正式レビュー要求を網羅したか

## 希望判定形式

- F2-R01: RESOLVED / CHANGES_REQUIRED
- F2-R02: RESOLVED / CHANGES_REQUIRED
- F2-R03: RESOLVED / CHANGES_REQUIRED
- F2-R04: RESOLVED / CHANGES_REQUIRED
- F2-R05: RESOLVED / CHANGES_REQUIRED
- F2-R06: RESOLVED / CHANGES_REQUIRED
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
