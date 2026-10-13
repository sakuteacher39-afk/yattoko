# YTK-F2 保存安全性 修正設計 再々レビュー

- 審査日: 2026-10-13
- 再提出commit: `43317d0b14c1db9be8a42ce493c472a5fe44ef36`
- 直前正式再レビュー: `workflow/reviews/YTK-F2-storage-safety-formal-rereview-20261013.md`
- 直前正式再レビューcommit: `8d1845b21d3e096bfce3d7482066cbe85defee2e`
- 審査種別: 制作管理室 独立安全性再々審査
- 総合判定: **CHANGES_REQUIRED**
- F2設計全体: **REVIEWED / CHANGES_REQUIRED / NOT APPROVED**
- F3詳細仕様: **NOT APPROVED**
- F4実装: **NOT AUTHORIZED**
- F5/F6試験: **NOT RUN**
- 本番公開: **NOT AUTHORIZED**
- R005: **FROZEN / UNFREEZE NOT AUTHORIZED**
- 人間追加判断: **NOT REQUIRED（現時点）**

## 1. 審査対象

再提出5成果物:

1. `workflow/proposals/YTK-F2-storage-safety-revision-20261013.md`
2. `workflow/proposals/YTK-F2-S01-S09-response-matrix-20261013.md`
3. `workflow/proposals/YTK-F2-unresolved-risks-20261013.md`
4. `workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md`
5. `workflow/reviews/YTK-F2-storage-design-review-request-20261013.md`

照合対象:

- 直前正式再レビュー原本
- Notion `YTK-F2｜端末保存仕様｜検討ドラフト｜2026-10-11` 最新版
- Notion `ヤットコ｜最新状態マスター｜2026-10-10方向転換版`
- `workflow/research/YTK-R001-digital-assets.md`
- `workflow/research/YTK-R002-detailed-organization.md`
- `workflow/research/YTK-R003-storage-data.md`
- `workflow/prototypes/YTK-R001/prototype.html`
- `workflow/prototypes/YTK-R002/prototype.html`
- R001/R002正式レビュー

## 2. Notion反映確認

審査開始時点で、Notion F2には直前再レビューcommit `8d1845...` までの記録はあったが、
**最新再提出commit `43317d0b14c1db9be8a42ce493c472a5fe44ef36` の記録は未反映**だった。

これは今回レビュー作業で更新対象とする。
設計内容そのもののFAIL理由には数えないが、最新状態マスターとしては更新が必要。

## 3. F2-R01〜R08 判定

| Review ID | 判定 | 根拠 |
|---|---|---|
| F2-R01 | **RESOLVED / MAINTAINED** | categoryKey内部ID固定。前回版と該当sectionは同一 |
| F2-R02 | **CHANGES_REQUIRED** | R07/R08自体は解消したが、追加確認経路でparent intention=unansweredとR002表示「未決定」の派生規則が未定義 |
| F2-R03 | **RESOLVED / MAINTAINED** | operation-direction sectionは前回RESOLVED版と同一 |
| F2-R04 | **RESOLVED / MAINTAINED** | text normalization/reject sectionは前回版と同一 |
| F2-R05 | **RESOLVED / MAINTAINED** | capacity projection sectionは前回版と同一 |
| F2-R06 | **RESOLVED / MAINTAINED** | 既存境界を維持し、strict restore検証を追加。後退なし |
| F2-R07 | **RESOLVED** | R001 status初回確定時にintention=unansweredなら同一transactionでundecided。record/global revision各1回、abort atomic、既存4値を上書きしない |
| F2-R08 | **RESOLVED** | completedはusageStatus=using/dormant/unknown必須。save/load/import/restore共通cross-field validator。不正completedを自動補正しない |

## 4. F2-R07 審査

**RESOLVED**

確認:

- `usageStatus: unanswered -> using/not_using/unknown`
- 同categoryの `intention=unanswered`
- 同一readwrite transactionで `intention=undecided`
- category record revisionは1回
- globalRevisionは1回
- abort時に片側commitなし
- keep/delete/family/undecided既存値はstatus変更で上書きしない
- untouched categoryを先回りしてundecidedへしない

現行R001 prototypeの
`if(!S.intent[c.id]) S.intent[c.id]="undecided"`
と保存正本の意味が整合した。

## 5. F2-R08 審査

**RESOLVED**

completed service invariant:

- valid recordId
- canonical categoryKey
- valid service identity
- otherならvalid normalized otherServiceName
- `usageStatus ∈ {using,dormant,unknown}`
- `usageStatus=unanswered` 禁止
- active conditional key必須
- inactive conditional key禁止
- intentionOverride allowlist
- invalid completedをpartialへ自動downgradeしない

normal load / import / restoreでも同じvalidatorを通すため、
保存時だけ正しく復元時に壊れる経路は閉じられた。

## 6. F5/F6 回帰試験復元

直前レビューで要求した回帰項目は**復元済み**。

確認済み:

- F5-DEL: category delete / delete-all atomicity
- RST-11〜19: strict restore validation
- BKP-09〜11: emergency export fail-closed
- ERR-01〜10: 保存エラー6分類
- PC-RESTART-01/02
- IOS-RESTART-01/02

したがって、**直前レビューで要求した試験回帰修正そのものはSUFFICIENT**。

ただし本再々レビューでF2-R09を追加するため、
F5/F6試験計画全体は現時点ではCHANGES_REQUIREDとする。

## 7. 追加確認: R001未回答categoryからR002へ入る経路

### 7.1 既存prototypeで成立する経路

R002の `r2CategoryList()` は:

- 通常: R001でusing/unknownのcategoryだけ
- 「ほかのカテゴリも見る」後: **全12category**

を表示する。

したがってR001で未回答のcategoryもR002から選択可能。

既存R002 prototypeではservice draft作成時とintention画面で:

`S.intent[c.id] || "undecided"`

を使う。

つまり:

- parent R001 canonical intention: 未回答
- service intentionOverride: null
- 画面表示: 「未決定」

という派生表示が成立する。

### 7.2 再提出設計の不足

再提出設計は:

- parent category intentionに `unanswered` を持てる
- `inheritedIntention` は保存しない
- `intentionOverride == null -> 現在のparent category intentionを参照`

と定義している。

しかしparent intention=`unanswered`のとき:

- 画面で `undecided` を表示するのか
- canonical effective intentionを `unanswered` とするのか
- service選択時にparentを `undecided` へ書き換えるのか

が未定義。

このままでは:

1. service選択直後はprototype fallbackで「未決定」
2. partial recordを保存
3. reload
4. parent正本は依然 `unanswered`
5. `inheritedIntention` は保存していない

となり、reload後の表示・effective intentionを一意に再構成できない。

## 8. 新規差戻し F2-R09

### 判定

**CHANGES_REQUIRED**

### 推奨修正

既存R001/R002 UXを変更せず、保存正本へ不要な自動mutationを増やさないため、
以下の**派生fallback規則**を正式化することを推奨する。

#### canonical保存

R001未回答categoryからR002 service identityを追加しただけでは:

- parent `usageStatus=unanswered` を維持
- parent `intention=unanswered` を維持
- service `intentionOverride=null`
- `inheritedIntention` は保存しない

service選択だけを理由にparent intentionをundecidedへ自動書換えしない。

#### effective/display resolution

`intentionOverride == null` の場合:

1. parent intention = keep/delete/family/undecided
   - その値をeffective/displayへ使う
2. parent intention = unanswered
   - **画面・派生effective表示だけ `undecided`（未決定）へfallback**
   - parent canonical intentionはunansweredのまま
   - fallback値をservice recordへ複写保存しない

このfallbackは:

- initial display
- reload
- browser restart
- backup restore
- import restore

の全経路で同じ関数規範から再計算する。

#### parent後変更

後からparent intentionがkeep/delete/family/undecidedへ確定した場合:

- intentionOverride=nullのserviceは新parent値を参照
- service recordを書換えなくてよい
- overrideありのserviceはoverrideを維持

#### child usage=using時

R001未回答category配下serviceが後から `usageStatus=using` になった場合:

- F2-R03によりparent usageStatusをusingへ肯定方向整合
- 同じtransaction内でF2-R07も適用
- parent intention=unansweredならundecidedへ初期化
- service + parentをatomic commit
- globalRevisionは1transaction分のみ

これを明記すること。

### 人間判断境界

上記は既存prototypeの画面表示を維持し、canonical parentを勝手に変更しない技術規範なので、
**人間追加判断は不要**。

ただし制作部が代わりに:

- service選択だけでparent intentionをundecidedへ永続変更する
- 「カテゴリと同じ」「未決定」の表示文言を変更する
- R001未回答categoryを「ほかのカテゴリも見る」から選べなくする

などUX/意味変更を提案する場合は、人間判断へ戻すこと。

## 9. F2-R09 必須試験

F5へ最低限追加:

- R09-01 parent usageStatus/intentionともunansweredで「ほかのカテゴリも見る」からservice選択
- R09-02 service partial commit後もparent usageStatus/intentionはunanswered
- R09-03 intentionOverride=nullで画面は「未決定」fallback
- R09-04 reload後も同じ表示
- R09-05 browser restart後も同じ表示
- R09-06 normal backup→restore後も同じ表示
- R09-07 parent intentionをkeepへ変更するとoverride=null serviceはkeepへ追随
- R09-08 service override=delete等がある場合はparent変更で上書きされない
- R09-09 child usage=using確定時、parent usageStatus=using + intention=undecidedを同一transaction
- R09-10 R09-09 transaction abortでservice/parent片側だけ残らない
- R09-11 R09-09で各changed record revision+1、globalRevision+1

F6へ最低限:

- PC Chromeで未回答category→service partial→reload→「未決定」再構成
- iPhone Safari通常で同系列
- browser restart後も同系列

## 10. 前回RESOLVED項目のregression

**MAINTAINED**

機械比較:

- F2-R01 section: 前回版と同一
- F2-R03 section: 前回版と同一
- F2-R04 section: 前回版と同一
- F2-R05 section: 前回版と同一
- F2-R06: 既存規範を削除せずstrict restore validationを追加

前回RESOLVED判定を撤回する後退は確認されなかった。

## 11. R001〜R003との整合

### R001

- status初回確定時のundecided初期化: R07で一致
- untouched categoryのunanswered保持: 維持

### R002

- 全category表示経路が存在
- intention画面は未設定parentをundecided表示へfallback
- completed前にusageStatus必須

R08はcompleted条件と一致。
一方、未回答parentのfallbackを保存設計が未定義な点だけF2-R09として残る。

### R003

- detail positive -> summary positiveのみ自動整合
- negative方向自動推論なし
- service本人意向overrideとcategory本人意向を別概念
- inherited intentionを複写正本にしない

を維持。
R003既承認範囲を超える自動推論は確認されなかった。

## 12. S01〜S09 再々判定

| ID | 判定 | 根拠 |
|---|---|---|
| S01 | **PASS（設計是正）** | ID/canonical identity維持 |
| S02 | **CHANGES_REQUIRED** | 未回答parent intentionとR002 fallback規則が未定義 |
| S03 | **PASS（設計是正）** | revision/global/generation維持 |
| S04 | **CHANGES_REQUIRED** | R002未回答parent経路の保存後/reload表示イベントが未規範化 |
| S05 | **CHANGES_REQUIRED** | restore後のfallback再構成規則が未定義 |
| S06 | **PASS（設計是正）** | text/XSS/external send境界維持 |
| S07 | **PASS（設計是正）** | capacity規範維持 |
| S08 | **PASS（設計是正のみ）** | long-term保証なしを維持 |
| S09 | **PASS（設計是正）** | committed/pending分離維持 |

### S01〜S09全体

**CHANGES_REQUIRED**

F2-R09が残るためPASSにしない。

## 13. F5/F6試験計画

- 直前差戻し分: **SUFFICIENT**
- 本再々レビュー時点の全体: **CHANGES_REQUIRED / NOT RUN**

理由:
F2-R09経路の自動試験・PC/iPhone実機試験がないため。

未実施試験をPASS扱いしない。

## 14. F2設計全体

**REVIEWED / CHANGES_REQUIRED / NOT APPROVED**

大部分は収束している。

解消:
- R01
- R03
- R04
- R05
- R06
- R07
- R08
- 直前要求のF5/F6回帰

残件:
- F2-R09 1件
- R09対応試験追加

## 15. 制作部への再差戻し

5成果物を更新して再提出すること。

最低限:

1. F2修正設計へF2-R09派生fallback規則
2. 保存イベント/effective intention規範へ反映
3. S01〜S09対応表へR09
4. unresolved riskへparent unanswered / display fallback drift
5. F5へR09-01〜11相当
6. F6へPC/iPhone/restart系列
7. 再審査依頼へR09解消説明

## 16. 停止位置

ここで停止。

禁止:

- F2全体承認
- F3詳細承認
- F4実装開始
- F5/F6未実施試験のPASS扱い
- 本番公開
- R005凍結解除
- 認証 / クラウド同期再開

次工程:

**制作部がF2-R09と対応試験を修正 → 再提出 → 制作管理室が再レビュー**
