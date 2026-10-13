# YTK-F2 保存安全性 修正設計 正式レビュー

- 審査日: 2026-10-13
- 審査対象commit: `860ba1977e11b83cfbf9e1a332fd2f8705577edd`
- 審査種別: 制作管理室 独立安全性審査
- 総合判定: **CHANGES_REQUIRED**
- F2全体: **REVIEWED / NOT APPROVED**
- F3詳細仕様: **NOT APPROVED**
- F4実装: **NOT AUTHORIZED**
- F5/F6試験: **NOT RUN**
- 本番公開: **NOT AUTHORIZED**
- R005: **FROZEN / UNFREEZE NOT AUTHORIZED**

## 1. 審査対象

提出5成果物:

1. `workflow/proposals/YTK-F2-storage-safety-revision-20261013.md`
2. `workflow/proposals/YTK-F2-S01-S09-response-matrix-20261013.md`
3. `workflow/proposals/YTK-F2-unresolved-risks-20261013.md`
4. `workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md`
5. `workflow/reviews/YTK-F2-storage-design-review-request-20261013.md`

照合した正本:

- Notion `YTK-F2｜端末保存仕様｜検討ドラフト｜2026-10-11` 最新版
- Notion `ヤットコ｜最新状態マスター｜2026-10-10方向転換版`
- `workflow/research/YTK-R001-digital-assets.md`
- `workflow/research/YTK-R002-detailed-organization.md`
- `workflow/research/YTK-R003-storage-data.md`
- `workflow/prototypes/YTK-R001/prototype.html`
- `workflow/prototypes/YTK-R002/prototype.html`
- `workflow/reviews/YTK-R001-prototype-review.md`
- `workflow/reviews/YTK-R002-prototype-review.md`

R001/R002のAPPROVEDは非公開UXの承認であり、今回のIndexedDB永続化仕様の承認ではない。

## 2. 独立判定

| 対象 | 判定 | 主因 |
|---|---|---|
| S01 | **CHANGES_REQUIRED** | stable recordId化は妥当だが、categoryIdをA〜Lとする案が既存内部ID `device/base/.../business` と未整合 |
| S02 | **CHANGES_REQUIRED** | 肯定方向整合の思想は妥当だが、サービス追加時と親カテゴリ変更時の処理方向を明確に分離していない。未回答/途中保存の正本意味も未定義 |
| S03 | **CHANGES_REQUIRED** | record/global/generationの3層は妥当。ただし回答確定ごとに保存される途中状態をどのrecord集合として版管理するか未定義 |
| S04 | **CHANGES_REQUIRED** | transaction complete / mutationSeqは妥当。ただし「回答確定」の保存トリガー境界と途中中断時のcommit済み状態が未定義 |
| S05 | **CHANGES_REQUIRED** | strict restore / atomic replaceは妥当。ただし「commit済み途中状態」と「未commit pending」の復元上の区別が確定していない |
| S06 | **CHANGES_REQUIRED** | XSS/外部送信禁止は妥当。ただし設計本文ではNFKC・制御文字・bidiが「候補」、F5では拒否を必須assertしており規範が不一致 |
| S07 | **CHANGES_REQUIRED** | 10,000,000 byte境界は維持できているが、category key・未回答・途中状態のcanonical projectionが未確定 |
| S08 | **PASS（設計是正のみ）** | 長期保持を保証せず、利用開始時注意・適宜backup・NOT VERIFIED扱いを維持。長期保持そのものをPASSした意味ではない |
| S09 | **CHANGES_REQUIRED** | committed/pending分離は正しいが、commit済みの「途中整理」と未commit pending overlayの意味境界が不足 |

### S01〜S09全体

**CHANGES_REQUIRED**

S08単独の設計境界は妥当だが、保存正本の識別・途中保存・R001/R002整合に未解決事項が残るため、S01〜S09是正全体をPASSにしない。

## 3. 重点確認1: category IDの不整合

既存R001/R002 prototypeのカテゴリ定義は以下。

| 表示コード | 既存内部ID |
|---|---|
| A | `device` |
| B | `base` |
| C | `mail` |
| D | `social` |
| E | `cloud` |
| F | `subscription` |
| G | `finance` |
| H | `commerce` |
| I | `auth` |
| J | `license` |
| K | `carrier` |
| L | `business` |

R001/R002 prototypeでは `id` が内部参照として使われ、A〜Lは表示用 `l` である。
R2CAT / R2Qも既存内部IDをkeyとしている。

一方、提出F2修正設計はcategory recordの `categoryId` を **A〜L** としており、変換契約を定義していない。

### 差戻し要求 F2-R01

保存正本のカテゴリ識別子を1種類に固定すること。

制作管理室の推奨は:

- 永続化のcanonical key: 既存内部ID
  - `device/base/mail/social/cloud/subscription/finance/commerce/auth/license/carrier/business`
- A〜L: 表示順/表示コードとしてのみ扱う
- 保存用名称を `categoryKey` 等へ変更し、「recordId」「categoryKey」「表示コード」の3概念を混同しない
- import/restoreではunknown category keyを拒否
- A〜Lもファイルへ持たせる場合、上表との不一致を拒否し、A〜Lを正本にしない

A〜Lを永続正本に変更したい場合は、R001/R002/R2Q/R2CATとの固定mapping、移行adapter、version境界を別途明記し再審査すること。

## 4. 重点確認2: 未回答・途中中断・回答確定ごとの保存

既存R001 prototype:

- 12カテゴリは初期 `null`
- 全体5問も初期 `null`
- 全5問を答えずに先へ進める

既存R002 prototype:

- 条件付き質問は未回答のまま進行可能
- 任意項目を空欄のまま1件完了可能
- 各画面から「いったん詳細整理を終わる」が可能
- 現prototypeは `r2FinishDraft()` で初めてrecordsへ追加するが、これは永続保存なしのUX試作である

Notion F2では「回答確定ごとに保存処理」が前提になっている。

提出F2案はcategory/overview/serviceの候補fieldを定義したが:

- R001の未回答をabsence / null / enumのどれで表現するか
- overview各fieldの未回答表現
- R002でサービス選択済みだがusageStatus未回答の状態
- 「その他」名を確定したがusageStatus未回答で中断した状態
- optional questionを数問だけ確定して中断した状態
- commit済み途中整理と、transaction未完了のpending overlay

を区別していない。

### 差戻し要求 F2-R02

「回答確定ごと保存」を、field/event単位で規範化すること。

最低限:

1. R001カテゴリ回答
   - category statusをタップ確定した時点でcommit
   - 未回答のcanonical表現を1種類に固定
2. R001全体5問
   - 各問のタップ確定ごとにcommit
   - `unknown` と `unanswered` を別値として維持
3. R002
   - 既知サービス選択の確定時点
   - 「その他」サービス名の確定時点
   - usageStatus確定時点
   - 各条件付き回答確定時点
   - intentionOverride確定時点
   - 「この1件を整理完了」
   の各イベントについて「保存する/しない」を明示
4. 中断
   - transaction complete済みの確定回答は中断後も残す
   - 画面上で未確定の入力値はpending UIとして区別
   - 再開時にcommit済みの途中状態を再構成できること

### 必須の意味分離

- **committed partial state**
  - IndexedDB transaction complete済み
  - 途中整理でも保存正本
  - 通常backup / restore対象
- **pending overlay**
  - まだtransaction completeしていない直近mutation
  - 保存失敗/競合時に画面上保持
  - emergency exportでは別領域として扱う

この2つを混同しない。

R002の途中状態を保存する方法は、例えば:

- `services` に明示的なin-progress schemaを持たせる
- または専用draft storeから最低コア確定時にatomic promotionする

のいずれでもよいが、**「field欠落の意味を実装者が推測する」状態は禁止**。
R003の「進捗/画面履歴を保存しない」と矛盾しないよう、保存するのはUI画面位置ではなく「利用者が確定した構造化事実」であることを明記すること。

## 5. 重点確認3: R001 / R002矛盾処理の方向

R003 APPROVEDは処理方向を既に分けている。

### R002から存在が確定する変更

R002詳細で:

- `billing=yes`
- `asset=yes`
- `importantData=yes`
- `familyKnow=no`
- `usageStatus=using`

が新たに確定した場合、R001の否定値と矛盾するなら、**存在方向へ論理的に一意な自動整合を行ってよい**。

特に:

- child `usageStatus=using`
- parent R001 category=`not_using`

なら、R003ではparentを `using` へ更新する候補が明示されている。

### R001から否定方向へ変更する操作

利用者がR001親カテゴリを `not_using` へ変更しようとし、既存childに `usageStatus=using` がある場合は:

- 自動でchildを削除/休眠化しない
- 矛盾状態をそのままcommitしない
- 保存を止め、配下serviceの確認/解消を求める

### 削除・移動

- 最後のserviceを削除してもparentを `not_using` へ自動変更しない
- 最後のbilling=yesを削除してもR001 billingをnoへ自動変更しない
- serviceのcategory変更を許す場合:
  - target parentは存在方向へ整合可能
  - source parentは否定方向へ自動変更しない
  - service更新と必要parent更新は同一transaction

### 差戻し要求 F2-R03

提出文書の `using候補`、およびF5の
「parent category=not_using + child usage=using -> 確認なしに矛盾をcommitしない」
だけでは操作方向が判別できない。

以下を別ルール/別試験として明記すること:

1. **service追加/編集起点**: child using確定 -> parent usingへ同一transactionで肯定方向整合
2. **parent変更起点**: parentをnot_usingへ変更 + existing child using -> commit停止・再確認
3. **service削除起点**: parentをnot_usingへ自動更新しない
4. **service category移動起点**（実装する場合）: target positive整合 / source negative自動更新なし

billing / finance / importantData / familyも同じ方向性を試験すること。

## 6. その他の差戻し

### F2-R04: S06の規範を統一

設計本文:
- NFKC等「候補」
- 制御文字/bidi「拒否候補」

F5:
- 制御文字/bidi拒否を必須assert

となっており不一致。

F2で:

- 何を正規化するか
- 何を拒否するか
- 正規化前/後のlength計測
- import時も同じ規則か

をMUST/SHOULDで固定し、試験と一致させること。
秘密語regexは補助防御のままでよい。

### F2-R05: canonical capacity projectionを完成させる

category key、unanswered、committed partialの表現確定後:

- category sort key
- nullable/missing fieldの表現
- in-progress recordの含有
- property order
- schema/question version
- revisions/meta

を含むcanonical projectionを確定する。

10,000,000 / 10,000,001境界は変更しない。

### F2-R06: F3への引継ぎ語彙を修正

F3へ渡す時点で:

- completed service
- committed partial service
- pending overlay

を混同しない。
通常backupはtransaction complete済みの保存正本を対象とし、emergency exportだけが未commit pendingを別領域に追加できる、と明示する。

## 7. F5/F6試験計画 判定

**CHANGES_REQUIRED**

現行案はS01〜S09を広く網羅しており土台は良いが、今回の重点事項を実証する試験が不足。

追加必須:

### category identity
- [ ] A↔`device` ... L↔`business` の固定mappingを全12件assert
- [ ] persisted canonical category keyがR1/R2Q/R2CATの参照keyと一致
- [ ] unknown key拒否
- [ ] key/display code不一致のimport拒否
- [ ] serviceのcategory変更時もcanonical keyだけで対象決定

### R001 partial/unanswered
- [ ] 12カテゴリ未回答を含む途中状態を保存→reloadして意味不変
- [ ] 全体5問を1問だけ回答→reload
- [ ] `unknown` と `unanswered` を混同しない
- [ ] 各回答確定ごとにrevision/globalRevisionが1回だけ進む
- [ ] 保存途中abortではその回答だけ未commit、直前commit済み回答は維持

### R002 interrupted save
- [ ] service identity確定直後に中断→reload/resume
- [ ] otherServiceName確定直後に中断→reload/resume
- [ ] usageStatus確定直後に中断→reload/resume
- [ ] optional 1問だけ回答後に中断→reload/resume
- [ ] optional未回答のまま「整理完了」したrecordと途中中断recordの保存意味が設計どおり
- [ ] committed partialとpending overlayがbackup/exportで混ざらない

### R001/R002 operation direction
- [ ] service追加: parent=not_using + child=using -> parent=usingへatomic positive整合
- [ ] parent変更: child=using存在中にparentをnot_using -> commit拒否/再確認
- [ ] service削除後にparentをnot_usingへ自動変更しない
- [ ] billing/finance/importantData/familyでもdetail positive -> summary positive
- [ ] R001 negative変更が既存positive detailと衝突 -> silent commitしない
- [ ] service category moveを実装する場合、target positive / source no negative auto-update

### F6
PC Chrome / iPhone Safari通常で、上記の「各確定点で中断→reload→続行」を最低1系列ずつ実機確認する。

## 8. F2全体判定

**REVIEWED / CHANGES_REQUIRED / NOT APPROVED**

理由:

- ID体系の正本が未確定
- 未回答/途中中断/回答確定保存の意味が未確定
- R001/R002整合の操作方向が未確定
- それらがcapacity / conflict / restore / backupへ波及する
- F5/F6計画にも対応試験が不足

既承認事項を撤回しない:

- IndexedDB
- 10,000,000 byte
- JSON/UTF-8算定
- 保存失敗UX
- multi-tab B案
- 保存3原則
- long-term loss warning
- backup方針
- private mode方針
- R003秘密情報禁止

## 9. 人間追加判断

**現時点では NOT REQUIRED**

今回の差戻しは、既承認UX/上限/費用/外部resource/R005方針を変更せず技術仕様として解消可能。

ただし制作部が:

- 中断UXを新たに変更する
- 10MB方式を変更する
- new permission / persistent storage APIを導入する
- backup催促を追加する
- analytics/third-party送信を導入する
- 外部resource/課金/R005再開を求める

場合は人間へ別途差戻す。

## 10. 制作部への再提出条件

以下5点を更新して再提出すること。

1. F2修正設計書
2. S01〜S09対応表
3. 未解決リスク一覧
4. F5/F6試験計画
5. 制作管理室向け審査依頼

再提出では最低限:

- category canonical mapping
- unanswered / committed partial / pendingの状態表
- 「回答確定ごと」の保存イベント表
- R001/R002 operation-direction matrix
- 追加F5/F6 test IDs

を含める。

## 11. 停止位置

ここで停止。

禁止:
- F2全体承認
- F3詳細承認
- F4実装開始
- F5/F6未試験をPASS扱い
- 本番公開
- R005凍結解除
- 認証/クラウド同期再開

次工程:
**制作部による設計差戻し対応 → 制作管理室の再レビュー**
