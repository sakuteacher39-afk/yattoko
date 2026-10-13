# YTK-F2 保存安全性 修正設計 再レビュー

- 審査日: 2026-10-13
- 再提出commit: `350f7b5d0adb16cd22e1065fac722c482331ff98`
- 前回正式レビュー: `workflow/reviews/YTK-F2-storage-safety-formal-review-20261013.md`
- 前回正式レビューcommit: `e2fa1bb23c8c57219d4d6c87467879a7f62a684e`
- 審査種別: 制作管理室 独立安全性再審査
- 総合判定: **CHANGES_REQUIRED**
- F2設計全体: **REVIEWED / CHANGES_REQUIRED / NOT APPROVED**
- F3詳細仕様: **NOT APPROVED**
- F4実装: **NOT AUTHORIZED**
- F5/F6試験: **NOT RUN**
- 本番公開: **NOT AUTHORIZED**
- R005: **FROZEN / UNFREEZE NOT AUTHORIZED**
- 人間追加判断: **NOT REQUIRED（現時点）**

## 1. 再審査対象

再提出5成果物:

1. `workflow/proposals/YTK-F2-storage-safety-revision-20261013.md`
2. `workflow/proposals/YTK-F2-S01-S09-response-matrix-20261013.md`
3. `workflow/proposals/YTK-F2-unresolved-risks-20261013.md`
4. `workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md`
5. `workflow/reviews/YTK-F2-storage-design-review-request-20261013.md`

照合した正本・既存実装:

- Notion `YTK-F2｜端末保存仕様｜検討ドラフト｜2026-10-11` 最新版
- Notion `ヤットコ｜最新状態マスター｜2026-10-10方向転換版`
- `workflow/research/YTK-R001-digital-assets.md`
- `workflow/research/YTK-R002-detailed-organization.md`
- `workflow/research/YTK-R003-storage-data.md`
- `workflow/prototypes/YTK-R001/prototype.html`
- `workflow/prototypes/YTK-R002/prototype.html`
- `workflow/reviews/YTK-R001-prototype-review.md`
- `workflow/reviews/YTK-R002-prototype-review.md`
- 前回正式レビュー原本

## 2. F2-R01〜R06 判定

| Review ID | 判定 | 根拠 |
|---|---|---|
| F2-R01 | **RESOLVED** | persisted canonical keyを既存内部ID `device/base/mail/social/cloud/subscription/finance/commerce/auth/license/carrier/business` に固定し、A〜Lをdisplay codeへ分離。R2CAT/R2Q参照keyとも一致 |
| F2-R02 | **CHANGES_REQUIRED** | unanswered / committed partial / completed / pendingの語彙と保存イベント表は改善したが、既存R001の本人意向初期化挙動と、R002 completedの成立条件に未解決矛盾が残る |
| F2-R03 | **RESOLVED** | detail positive / R001 negative / detail negative・delete / future moveを操作起点別に分離し、R003 APPROVEDの肯定方向のみ自動整合と一致 |
| F2-R04 | **RESOLVED** | NFC、trim、C0/C1/DEL、bidi control拒否、UTF-16 1〜60、NFKC不採用をMUSTとして固定し、F5-TXTと一致 |
| F2-R05 | **RESOLVED** | fixed category order、explicit unanswered、partial/completed両service、property order、answers presence rule、revision/version/metaをcanonical projectionへ含める規範が具体化 |
| F2-R06 | **RESOLVED** | normal backup=committed正本、emergency export=pending別領域、restoreでpending silent commit禁止、再適用は通常save pipelineという境界が明確化 |

### F2-R01

**RESOLVED**

既存prototypeの実コード:

- A = `device`
- B = `base`
- C = `mail`
- D = `social`
- E = `cloud`
- F = `subscription`
- G = `finance`
- H = `commerce`
- I = `auth`
- J = `license`
- K = `carrier`
- L = `business`

と再提出設計の `categoryKey` が一致する。
A〜Lを永続正本にしないため、前回のID衝突は解消。

## 3. F2-R02 残存不備 1: R001 category intention

### 実コードとの不整合

現行R001 prototypeはcategory statusを初めて選択した時、同時に:

`if(!S.intent[c.id]) S.intent[c.id] = "undecided"`

を実行する。

つまり既存コード上は:

- category usageを回答
- category intentionが未設定なら `undecided` を自動初期化

が同一ユーザー操作で発生する。

一方、再提出設計は:

- baseline `intention=unanswered`
- category status変更では `usageStatus` だけを保存
- intentionは別タップ時だけ保存

としている。

このまま実装すると:

`usageStatus=using/unknown/not_using` かつ `intention=unanswered`

という、既存prototypeではstatus選択後に発生しないpersisted stateが作られる。

さらに現行R002の `R2INT` は:

- keep
- delete
- family
- undecided

だけを持ち、`unanswered` の表示意味を持たない。

親category intentionが `unanswered` のままR002へ進むと、`intentionOverride=null` のeffective intention表示・再開時UIが既存コードと一致しない。

### 差戻し要求 F2-R07

既存R001 UXを変更しない前提では、次を採用すること。

- category statusを初めて `unanswered -> using/not_using/unknown` に変更するとき
- category intentionが `unanswered` なら
- **同一transactionで intention=`undecided` へ初期化**
- usageStatusとintentionを同じcategory record revision更新としてcommit
- 既にkeep/delete/family/undecidedがある場合はstatus変更で上書きしない

これにより:

- untouched categoryのみ intention=unanswered
- 一度statusを確定したcategoryは既存prototype同様、最低でもundecided

となる。

別案として「status回答済みでもintention=unansweredをUI上の正式状態にする」場合は既存UX変更になるため、人間判断へ差戻すこと。
本レビューではUX変更を要求せず、既存挙動維持のF2-R07を推奨するため、現時点で人間追加判断は不要。

## 4. F2-R02 残存不備 2: completed serviceの成立条件

再提出設計ではservice recordに:

- `recordState=partial/completed`
- `usageStatus=unanswered/using/dormant/unknown`

を定義した。

しかし `recordState=completed` に遷移できる前提条件が明文化されていない。

現行R002 prototypeでは:

- usageStatus未回答では「必要なことだけ確認」へ進めない
- 「この1件を整理完了」へ到達するにはusageStatus回答済みが必須

である。

したがって:

`recordState=completed && usageStatus=unanswered`

は現行UXでは成立しない不正状態。

optional questionがunansweredのままcompletedなのは既存UXと整合するが、usageStatusまでunansweredでcompletedを許してはならない。

### 差戻し要求 F2-R08

service state invariantを明記すること。

#### partial

- identityがvalid
- usageStatusはunansweredを許可
- active optional answerはunanswered可
- inactive conditional keyは不存在

#### completed

最低限:

- valid recordId
- valid categoryKey
- valid service identity
- other serviceならnormalized otherServiceNameがvalid
- **usageStatus ∈ {using, dormant, unknown}**
- usageStatus=unansweredは禁止
- active optional answerはunanswered可
- conditional answersのpresence ruleに整合
- intentionOverrideはnullまたはapproved enum

import / restore / normal loadでも同じcross-field invariantを検証し、不正なcompleted stateを自動補正せず拒否すること。

「complete」押下時は、上記invariantを満たした場合だけ `recordState=completed` をcommitする。

## 5. R001/R002自動整合

**設計方向はPASS**

再提出のoperation-direction matrixはR003 APPROVEDと一致している。

確認済み:

- child using -> parent not_usingをusingへ肯定方向整合
- billing=yes -> R001 billing=yes
- asset=yes -> finance=yes
- importantData=yes -> data=yes
- familyKnow=no -> family=hidden
- R001 negative操作が既存positive detailと衝突 -> silent commit禁止
- detailのnegative化 / service削除 -> summaryをnegativeへ自動変更しない
- ordinary service editでcategoryKey変更禁止
- 将来move時はtarget positive / source no negative auto-align

既承認範囲を超える否定方向の自動推論は確認されなかった。

## 6. 文字入力規範

**PASS**

再提出設計とF5-TXTは一致している。

- NFC
- ECMAScript trim相当
- C0 / C1 / DEL reject
- Bidi_Control相当の指定code point reject
- canonical UTF-16 code unit 1〜60
- NFKC不採用
- invalid値を黙って修復しない
- save / import / restore / emergency exportで同一validator
- secret-like regexは補助防御

容量計算もnormalized canonical stringを使うため、文字列規範とcapacityの順序は整合。

## 7. capacity / backup / restore

### capacity

**PASS（設計範囲）**

- prospective committed datasetで判定
- 10,000,000 bytes以下可
- 10,000,001 bytes以上拒否
- explicit unansweredを含む
- partial/completed serviceを含む
- pending overlayはcommitted capacityから除外
- meta/revision/version/IDを含む
- fixed category order / service recordId order / question order

を明文化しており、F2-R05は解消。

### backup / restore

**F2-R06の語彙境界はPASS**

- normal backup: transaction complete済み正本のみ
- committed partialを含む
- completedを含む
- pendingは含まない
- emergency export: pendingを別領域
- pending metadataにbase generation/global/record revisionを持たせる
- pending silent commit禁止
- pending再適用は通常save pipeline + 10MB gate

を確認。

ただしcompleted invariant（F2-R08）はrestore validationにも必ず適用すること。

## 8. S01〜S09 再判定

| ID | 再判定 | 根拠 |
|---|---|---|
| S01 | **PASS（設計是正）** | categoryKey整合、stable recordId、service名/配列位置をidentityにしない、inheritedIntention非保存 |
| S02 | **CHANGES_REQUIRED** | R001 intention初期化とcompleted invariantが未解決 |
| S03 | **PASS（設計是正）** | partial/completedもrecord/global/generationで保護し、古いtab復活を停止 |
| S04 | **CHANGES_REQUIRED** | 回答確定イベント表は改善したが、category statusの既存副作用とcomplete eventのpreconditionが不足 |
| S05 | **CHANGES_REQUIRED** | committed/pending境界は改善したが、restore時のcompleted cross-field invariantとstrict invalid-state試験が不足 |
| S06 | **PASS（設計是正）** | text normalization/reject、XSS、external send境界は整合 |
| S07 | **PASS（設計是正）** | canonical projectionを具体化 |
| S08 | **PASS（設計是正のみ）** | 長期保持保証なし、開始時注意、backup推奨、NOT VERIFIED維持 |
| S09 | **PASS（設計是正）** | committed partial / pending / normal backup / emergencyの意味分離を確認 |

### S01〜S09全体

**CHANGES_REQUIRED**

S02 / S04 / S05が未解決のため全体PASSにはしない。

## 9. F5/F6試験計画 再判定

**CHANGES_REQUIRED / NOT RUN**

F2-R01〜R06向け追加試験は大幅に改善した。
特にcategory mapping、partial reload、operation direction、text normalization、capacity、backup/restoreは前回要求を概ね取り込んでいる。

ただし以下が不足する。

### F5-R07: R001 intention compatibility

追加必須:

- status unanswered + intention unanswered -> status初回確定時にintention=undecidedも同一transaction
- category record revision/globalRevisionは1transaction分だけ増加
- status変更後reloadでundecided preselection/effective表示が既存R001/R002 semanticsと一致
- 既存keep/delete/family/undecidedをstatus変更で上書きしない
- untouched categoryだけintention=unansweredを維持

### F5-R08: completed invariant

追加必須:

- partial + usageStatus=unanswered -> valid
- complete押下 + usageStatus=unanswered -> reject
- completed + usageStatus=using/dormant/unknown -> valid
- import/restoreでcompleted + usageStatus=unanswered -> reject
- completed other service + invalid/empty otherServiceName -> reject
- active conditional field missing -> reject
- inactive conditional field present -> reject

### 旧計画から落ちた安全試験の復元

再提出版は試験数自体は増えたが、旧計画に存在した以下の重要項目が消えているため再追加すること。

#### delete atomicity

- category deleteでcategory + child servicesをatomic削除
- category delete途中abortで旧状態維持
- delete-all途中abortで旧dataset維持
- delete-all成功でgeneration切替

#### strict restore validation

- required field欠落拒否
- unexpected field拒否
- unexpected nested object拒否
- duplicate category拒否
- duplicate recordId拒否（現行RST-09は維持）
- unknown schema/question version拒否（現行RST-07は維持）
- malformed/empty dataset拒否（現行RST-10は維持）
- categoryKey/displayCode不一致拒否

#### emergency export fail-closed

- export file generation failureで成功表示しない
- pending dependency不整合をsilent exportしない
- pending validator不合格時、committed部分だけexportした場合に「未保存入力は退避できていない」と区別表示

#### 保存エラー6分類

Notion F2の公開前P0要件に従い:

- ①app 10MB超過
- ②browser/device保存領域不足の疑い
- ③保存機能制限
- ④multi-tab conflict
- ⑤一時的保存失敗
- ⑥原因不明

について、分類・文言・retry可否・競合時に単純retryさせないことをF5でassertする。

#### F6 persistence

reloadだけでなく最低限:

- PC Chrome browser restart後のcommitted partial保持
- PC Chrome browser restart後のcompleted保持
- iPhone Safari通常の終了/再起動後のcommitted partial/completed挙動

を確認する。

長期natural evictionは従来どおり短期試験でPASSにしない。

## 10. F2設計全体

**REVIEWED / CHANGES_REQUIRED / NOT APPROVED**

前回F2-R01〜R06のうち5件は解消した。
category identity、R001/R002 operation direction、text規範、capacity、backup/restore境界は大きく改善している。

ただし:

1. R001 category statusとintentionの既存コード整合
2. completed serviceのcross-field invariant
3. それらを含むstrict restore
4. F5/F6計画の安全試験回帰

が残るため、F2設計全体をPASS/APPROVEDにしない。

## 11. 人間追加判断

**NOT REQUIRED（現時点）**

F2-R07/F2-R08および試験追加は、既承認UXを変更せず技術設計として解消できる。

制作部がF2-R07について:

- 既存のstatus選択時 `undecided` 初期化を廃止する
- status回答済み + intention=unansweredを新しい利用者向け状態として見せる

などのUX変更を提案する場合のみ、人間判断へ差戻す。

## 12. 制作部への差戻し

次回再提出では5成果物を更新し、最低限以下を含める。

1. F2-R07: R001 status/intention既存挙動の保存規範
2. F2-R08: completed service invariant
3. state/event tableへ上記2件を反映
4. restore/import validationへcompleted invariantを反映
5. F5へF5-R07/F5-R08試験追加
6. 旧計画から落ちたdelete / strict restore / export fail-closed / 6分類試験を復元
7. F6へbrowser restart系列を追加
8. unresolved risksへ「R001 intention semantic drift」「invalid completed state」を追加

## 13. 停止位置

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

**制作部がF2-R07 / F2-R08とF5/F6回帰試験を修正 → 再提出 → 制作管理室が再レビュー**
