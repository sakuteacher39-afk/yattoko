# YTK-F2 S01〜S09 / F2-R01〜R08 指摘対応表

- 更新日: 2026-10-13
- 状態: **REVISED / 制作管理室 再レビュー待ち**
- 前回正式レビューcommit: `e2fa1bb23c8c57219d4d6c87467879a7f62a684e`
- 正式再レビューcommit: `8d1845b21d3e096bfce3d7482066cbe85defee2e`
- 正式再レビュー判定: F2-R01/R03/R04/R05/R06 RESOLVED、F2-R02 CHANGES_REQUIRED
- F2全体APPROVED・F5/F6 PASSを意味しない

## 1. 正式レビュー差戻し対応

| Review ID | 要求 | 修正内容 | 主対応S | 試験 |
|---|---|---|---|---|
| F2-R01 | category正本を既存内部IDと一致 | `categoryKey=device/base/mail/social/cloud/subscription/finance/commerce/auth/license/carrier/business` に固定。A〜LはdisplayCodeのみ。recordId/categoryKey/displayCodeを分離 | S01, S02, S07 | F5-CAT系 |
| F2-R02 | unanswered/途中/確定/pendingと保存時点を規範化 | R001はexplicit `unanswered`。R002に `recordState=partial/completed`。pendingは非正本。known/other/usage/各回答/intention/completeの保存イベント表を追加 | S02, S03, S04, S05, S09 | F5-PART/R2INT、F6中断系列 |
| F2-R03 | R001/R002矛盾を操作方向別に定義 | detail positive -> summary positive atomic。parent negative -> conflictならcommit停止。service negative/delete -> summary negative自動更新なし。category moveは現行UI非提供、ordinary editで禁止 | S02, S03 | F5-DIR系 |
| F2-R04 | text規範と試験を一致 | NFC、trim、C0/C1/DEL拒否、bidi controls拒否、正規化後UTF-16 1〜60、import/export同一validator。NFKC不採用 | S06 | F5-TXT系 |
| F2-R05 | capacity projection完成 | fixed category order、explicit unanswered、partial/completed service含有、answers順序、null/missing規則、property順を固定 | S07 | F5-CAP系 |
| F2-R06 | backup/restore語彙修正 | normal backupはcompleted + committed partialを含むcommitted正本のみ。emergency exportだけpendingを別領域へ追加。restoreでpending silent commit禁止 | S05, S09 | F5-BKP/RST系 |

### 正式再レビュー追加差戻し

| Review ID | 正式再レビュー指摘 | 今回の修正 |
|---|---|---|
| F2-R07 | R001 status初回確定時のintention semantics | intention=unansweredならstatus確定と同一transactionでundecided。既存keep/delete/family/undecidedは上書きしない |
| F2-R08 | completed service invariant不足 | completedはusageStatus∈{using,dormant,unknown}必須。load/import/restoreも同一cross-field validation |
| TEST-REGRESSION | 旧試験の重要項目が脱落 | delete atomicity、strict restore、emergency export fail-closed、保存エラー6分類、browser restart保持をF5/F6へ復元 |

## 2. S01〜S09対応状況

| ID | 正式レビュー判定 | 今回の是正 |
|---|---|---|
| S01 | CHANGES_REQUIRED | A〜L保存案を撤回。canonical categoryKeyを既存内部IDへ一致。stable recordId管理は維持 |
| S02 | CHANGES_REQUIRED（再レビュー時） | R07でR001 intention初期化互換、R08でcompleted invariantを追加し再レビュー対象とした |
| S03 | PASS（設計是正・再レビュー判定） | partial/completedもrecord/global/generationで版管理。成功transaction単位を正本境界に固定 |
| S04 | CHANGES_REQUIRED（再レビュー時） | R07のstatus副作用とR08 complete preconditionを保存イベントへ反映し再レビュー対象とした |
| S05 | CHANGES_REQUIRED（再レビュー時） | restoreへR08 cross-field invariantとstrict invalid-state拒否を追加し再レビュー対象とした |
| S06 | CHANGES_REQUIRED | normalization/rejectをMUST化しF5と一致 |
| S07 | CHANGES_REQUIRED | categoryKey/unanswered/partial/property orderを含むcapacity projection確定 |
| S08 | PASS（設計是正のみ） | 変更なし。長期保持保証なし、開始時警告/backup推奨/NOT VERIFIED維持 |
| S09 | CHANGES_REQUIRED | committed partialとpending overlayを明確に分離。normal/emergency/restoreで意味を固定 |

## 3. category mapping

| displayCode | categoryKey |
|---|---|
| A | device |
| B | base |
| C | mail |
| D | social |
| E | cloud |
| F | subscription |
| G | finance |
| H | commerce |
| I | auth |
| J | license |
| K | carrier |
| L | business |

A〜Lは保存対象決定のkeyに使用しない。

## 4. 状態意味表

| 状態 | 例 | 正本 |
|---|---|---|
| unanswered | R001 billing=unanswered、active optional answer=unanswered | committed |
| unknown | 利用者が「わからない」を選択 | committed |
| committed partial | R002 service選択はcommit済み、usage未回答 | committed |
| completed | 「この1件を整理完了」commit済み | committed |
| pending overlay | tap後save失敗/競合等で未commitのmutation | non-committed |

## 5. 保存イベント要約

- R001 category status初回確定: save。intention=unansweredなら同一transactionでundecidedも確定
- R001 category status既回答値変更: save。既存intentionは上書きしない
- R001 overview各問値変更: save
- R001 category intention値変更: save
- known service選択確定: partial record作成/save
- 「その他」選択だけ: no save
- valid otherServiceNameで「利用状態へ」: partial record作成/save
- R002 usageStatus値変更: save
- optional answer値変更: save
- intentionOverride値変更: save
- 「この1件を整理完了」: completed invariant成立時のみrecordState=completed/save。usageStatus=unansweredは禁止
- screen移動/戻る/一覧表示/終了ボタン単独: no new save
- 同じcanonical値の再選択: idempotent no-op

## 6. operation direction要約

- R002 positive detail -> R001 positive summary: atomic auto-align
- R001 negative change vs existing positive detail: reject/confirm、silent commit禁止
- R002 positive -> negative: R001 summaryはnegative自動更新しない
- service delete: R001 summary/categoryをnegative自動更新しない
- ordinary service edit: categoryKey変更禁止
- future dedicated move: target positive / source no negative auto-update

## 7. 変更していない人間承認事項

- IndexedDB
- 10,000,000 byte
- JSON/UTF-8
- 保存失敗6分類
- multi-tab B案
- 保存3原則
- private mode注意中心
- long-term loss warning
- 利用開始時だけのbackup推奨
- normal backup/restore必須
- 保存失敗時emergency export
- R003 D区分禁止
- R005凍結
