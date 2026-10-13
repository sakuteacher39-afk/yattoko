# YTK-F2 保存安全性 修正設計 正式再レビュー3

- 審査日: 2026-10-13
- 再提出commit: `0d5dfa387f924e5dc3dc9196b9f236986c910281`
- 審査原本: `workflow/reviews/YTK-F2-storage-safety-formal-rereview2-20261013.md`
- 審査原本commit: `b802b1dae3646b09f526b6dd0af76cc329831681`
- 審査種別: 制作管理室 独立安全性再審査
- 設計審査総合判定: **DESIGN REVIEW PASS**
- F2全体: **REVIEWED / DESIGN ISSUES RESOLVED / HUMAN APPROVAL PENDING / NOT APPROVED**
- F5自動試験: **NOT RUN**
- F6実機試験: **NOT RUN**
- F3詳細仕様: **NOT APPROVED**
- F4実装: **NOT AUTHORIZED**
- 本番公開: **NOT AUTHORIZED**
- R005: **FROZEN / UNFREEZE NOT AUTHORIZED**

## 1. 審査対象

再提出5成果物:

1. `workflow/proposals/YTK-F2-storage-safety-revision-20261013.md`
2. `workflow/proposals/YTK-F2-S01-S09-response-matrix-20261013.md`
3. `workflow/proposals/YTK-F2-unresolved-risks-20261013.md`
4. `workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md`
5. `workflow/reviews/YTK-F2-storage-design-review-request-20261013.md`

照合対象:

- 正式再々レビュー原本
- R001 / R002 / R003
- R001 / R002既存prototype
- R001 / R002正式レビュー
- Notion `YTK-F2｜端末保存仕様｜検討ドラフト｜2026-10-11` 最新版
- Notion `ヤットコ｜最新状態マスター｜2026-10-10方向転換版`

## 2. Notion同期確認

審査開始時点:

- Notion F2: 再提出commit `0d5dfa387f924e5dc3dc9196b9f236986c910281` 反映済み
- 最新状態マスター: 同commit 未反映

本レビュー完了時に両ページを今回の正式判定へ同期する。

## 3. F2-R09判定

**RESOLVED**

再提出設計は前回差戻し要求を満たす。

### canonical state

R001未回答categoryからR002 service identityを追加しただけでは:

- parent `usageStatus=unanswered` を維持
- parent `intention=unanswered` を維持
- service `intentionOverride=null`
- `inheritedIntention` を保存しない
- fallback後の `undecided` をservice recordへ保存しない

よって、画面表示の便宜値が保存正本へ混入しない。

### resolver

`resolveServiceIntention(service,parentCategory)` を単一規範として定義。

- overrideあり -> override
- override=null + parent keep/delete/family/undecided -> parent
- override=null + parent unanswered -> 派生表示/effectiveのみ undecided

このresolverを:

- 初回表示
- reload
- browser restart
- normal backup restore
- file import / restore
- 一覧
- 詳細
- 完了画面

で同じ規範から再計算する。

従ってreload/restore経路でもsemantic driftを起こさない。

### parent後変更

parent intention確定後:

- override=null serviceはservice recordを書き換えず、新しいparent値へ追随
- overrideありserviceはoverride維持

R003の「カテゴリ本人意向とサービス本人意向上書きは別概念」と整合。

### child usage=using時

未回答parent配下serviceで `usageStatus=using` を確定する場合:

- F2-R03でparent usageStatusをusingへ肯定方向整合
- parent intention=unansweredならF2-R07を同一readwrite transactionで適用しundecidedへ初期化
- service + parentをatomic commit
- changed service/category revisionは各+1
- globalRevisionはtransaction単位で+1
- abort時に片側commitを残さない

R003の正方向だけの自動整合と一致し、否定方向の自動推論を追加していない。

## 4. F2-R01〜R08 regression

**MAINTAINED**

確認結果:

- F2-R01: category canonical identity 維持
- F2-R02: unanswered / partial / completed / pending境界 維持。R09解消により残存不備解消
- F2-R03: 正方向atomic整合 / 負方向silent auto-update禁止 維持
- F2-R04: NFC / trim / control+bidi reject / UTF-16 1〜60 / NFKC不採用 維持
- F2-R05: canonical capacity projection 維持
- F2-R06: normal backup / emergency pending / strict restore境界 維持
- F2-R07: status初回確定時のundecided初期化・revision規範 維持
- F2-R08: completed cross-field invariant 維持

前回RESOLVED項目の後退は確認されなかった。

## 5. S01〜S09判定

| ID | 判定 | 根拠 |
|---|---|---|
| S01 | **PASS（設計是正）** | stable identity / categoryKey規範整合 |
| S02 | **PASS（設計是正）** | unanswered / partial / operation-direction / R09 fallbackまで一意化 |
| S03 | **PASS（設計是正）** | record/global/generation競合保護維持 |
| S04 | **PASS（設計是正）** | 回答確定・partial・complete・R09再構成の保存境界が定義済み |
| S05 | **PASS（設計是正）** | strict restore、partial/completed、R09派生再計算をfail-closedで扱える |
| S06 | **PASS（設計是正）** | text validator / XSS / external-send境界整合 |
| S07 | **PASS（設計是正）** | canonical capacity一意 |
| S08 | **PASS（設計是正のみ）** | 長期保持保証なし、注意・backup推奨・NOT VERIFIED維持 |
| S09 | **PASS（設計是正）** | committed / pending / emergency境界整合 |

### S01〜S09全体

**PASS（DESIGN CORRECTIONS）**

これは設計是正の審査PASSであり、F5/F6実試験PASSやF2全体の人間承認ではない。

## 6. F5/F6試験計画

**SUFFICIENT / NOT RUN**

### F5 R09

R09-01〜R09-11を全件確認。

範囲:

- 未回答parentからservice追加
- parent正本unanswered維持
- fallback非保存
- reload
- browser restart
- backup restore
- file import/restore
- parent意向追随
- override独立
- child using時のR03+R07 atomic transaction
- abort atomicity
- revision/globalRevision

前回要求を網羅。

### F6

PC Chrome:
- PC-R09-01〜05

iPhone Safari通常:
- IOS-R09-01〜05

を追加。

reload / browser restart / parent追随 / child using atomic整合を実機確認する計画になっている。

既存の:

- delete atomicity
- strict restore
- emergency export fail-closed
- 保存エラー6分類
- PC/iPhone restart
- capacity
- multi-tab
- private mode
- restore/deletion

試験も脱落なし。

従って試験**計画**としてSUFFICIENT。

ただし全項目未実施のため、試験PASSではない。

## 7. R001〜R003整合

### R001

- 未回答categoryを保持可能
- category status初回確定でintention未設定ならundecided
- explicit unansweredとundecidedを分離

R07/R09と整合。

### R002

既存prototypeは:

- 「ほかのカテゴリも見る」で全12categoryを表示可能
- 未設定parent intentionを画面上 `undecided` へfallback
- service intentionOverrideをparentから独立
- usageStatus未回答ではcomplete経路へ進めない

R08/R09と整合。

### R003

維持:

- R001はsummary、R002はservice detail
- service overrideとcategory intentionを別概念
- detail positiveからsummary positiveへの一意な整合のみ自動可
- reverse/negative auto-update禁止
- parent本人意向変更時、overrideなしserviceだけ新parent意向を継承

F2-R09はこの境界を超えていない。

## 8. 未解決リスク

設計指摘としての未解決事項は、本レビュー範囲では**なし**。

ただし実証前リスクは残る:

- Safari等の長期natural eviction
- browser quota
- iPhone Safari 10MB近傍性能
- private mode実挙動
- file download / restore実機
- CSP / origin / third-party構成
- F3 file size境界
- F5/F6全試験未実施

これらを設計PASSを理由に実証済みと扱わない。

## 9. F2設計全体判定

**REVIEWED / DESIGN ISSUES RESOLVED / HUMAN APPROVAL PENDING / NOT APPROVED**

制作管理室としての技術・安全設計差戻しは解消した。

ただし、F2全体の正式承認は人間の明示承認が必要であり、本レビューでは行わない。

## 10. 次工程

ここで停止。

次に必要なのは:

**人間によるF2設計全体の承認判定**

人間がF2を正式承認するまでは:

- F3詳細承認へ進まない
- F4実装開始しない
- F5/F6を実施済み/PASS扱いしない
- 本番公開しない
- R005凍結解除しない

F2が人間承認された場合も、F5/F6実試験PASSを意味しない。
