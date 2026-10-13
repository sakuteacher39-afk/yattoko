# YTK-F2 保存安全性 修正設計書

- 文書種別: F2正式再々レビュー差戻し F2-R09対応版
- 初版作成日: 2026-10-13
- 初回差戻し対応日: 2026-10-13
- 正式再レビュー差戻し対応日: 2026-10-13
- 正式再々レビュー差戻し対応日: 2026-10-13
- 参照正式レビュー: `workflow/reviews/YTK-F2-storage-safety-formal-review-20261013.md`
- 前回正式レビューcommit: `e2fa1bb23c8c57219d4d6c87467879a7f62a684e`
- 参照正式再レビュー: `workflow/reviews/YTK-F2-storage-safety-formal-rereview-20261013.md`
- 正式再レビューcommit: `8d1845b21d3e096bfce3d7482066cbe85defee2e`
- 参照正式再々レビュー: `workflow/reviews/YTK-F2-storage-safety-formal-rereview2-20261013.md`
- 正式再々レビューcommit: `b802b1dae3646b09f526b6dd0af76cc329831681`
- 状態: **REVISED / 制作管理室 再レビュー待ち**
- F2全体承認: 未承認
- F3詳細仕様承認: 未承認
- F4実装: 未着手 / 未承認
- F5自動試験: 未実施
- F6実機試験: 未実施
- 本番公開: 未承認
- R005: 凍結維持

## 1. 今回の差戻し対応範囲

前回正式レビューF2-R01〜R06のうち、正式再レビューではF2-R01・R03・R04・R05・R06がRESOLVED、F2-R02がCHANGES_REQUIREDとなった。

正式再々レビューではF2-R07 / F2-R08および直前要求のF5/F6回帰はRESOLVED / 復元済みとなった。

今回の追加差戻しを対象とする。

- F2-R09: R001未回答categoryからR002へ入る場合の本人意向derived fallback
- F5/F6追加: R09-01〜R09-11、PC Chrome / iPhone Safari通常のreload・browser restart再構成

前回RESOLVEDとなった以下の規範は変更しない。

- F2-R01: category canonical identity
- F2-R03: R001 / R002矛盾処理の操作方向
- F2-R04: 「その他」サービス名の正規化・拒否規範
- F2-R05: canonical capacity projection
- F2-R06: completed / committed partial / pending を分けたF3引継ぎ

既承認の利用者向け仕様、IndexedDB、10,000,000 byte、JSON/UTF-8算定、複数タブB案、保存失敗UX、通常backup / emergency export、private mode方針、長期消失注意、秘密情報禁止は変更しない。

## 2. category identity（F2-R01）

### 2.1 canonical category key

永続化・整合判定・R2CAT / R2Q参照に使うcategoryの正本は、既存R001/R002 prototypeの内部IDと一致させる。

| displayCode | canonical `categoryKey` |
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

規範:
- **MUST**: IndexedDBのcategory/service recordは `categoryKey` に上表の内部IDだけを保存する。
- **MUST NOT**: A〜Lを永続正本として使用しない。
- **MUST**: `recordId`、`categoryKey`、displayCodeは別概念として扱う。
- **MUST**: unknown `categoryKey` を保存・import・restoreで拒否する。
- **MUST**: R2CAT / R2Q参照は `categoryKey` を使う。
- **SHOULD**: displayCodeはUI定義から導出し、保存正本へ重複保持しない。
- 将来file形式にdisplayCodeを含める場合は、上表と不一致ならrestoreを拒否する。displayCodeからcategoryKeyを推測補正しない。

### 2.2 recordIdとの区別

`recordId`:
- ヤットコ内部の個別記録識別子。
- category意味や表示順の意味を持たない。
- service update/delete対象はrecordIdで特定する。

`categoryKey`:
- category意味を表す固定semantic key。
- R001/R002/R2CAT/R2Qとの接続に使う。

displayCode:
- A〜L。
- UI順序・表示用。
- 永続正本ではない。

## 3. 保存正本の状態語彙（F2-R02 / R06）

### 3.1 4つの状態を混同しない

| 用語 | 意味 | IndexedDB正本 | normal backup | emergency export |
|---|---|---:|---:|---:|
| `unanswered` | その質問について利用者がまだ回答を確定していない | yes | yes | yes（committed側） |
| committed partial state | transaction complete済みだがR001/R002の整理が途中 | yes | yes | yes（committed側） |
| completed service | R002で「この1件を整理完了」がcommit済み | yes | yes | yes（committed側） |
| pending overlay | 画面上にあるがtransaction completeしていない直近mutation | no | no | yes、別領域のみ |

重要:
- `unknown` は利用者が「わからない」と明示回答した値。
- `unanswered` は未回答。
- 両者を同じnullやabsenceとして扱わない。
- pending overlayをcommitted partialへ読み替えない。
- R003で保存しない「画面位置・画面履歴」と、利用者が確定済みの構造化事実は別物。

### 3.2 dataset未作成状態

利用者が一度も保存対象の回答を確定していない場合、IndexedDBにヤットコdatasetが存在しなくてもよい。

最初の保存対象mutationで:
1. meta
2. R001 12 category baseline
3. R001 overview baseline
4. 当該mutation

を**同一transaction**で初期化・commitする。

baselineだけを別transactionで先に保存してglobalRevisionを余分に進めない。

## 4. R001 canonical state

dataset作成後、12 category recordは常に存在する。

### 4.1 category record

```text
recordId
categoryKey
usageStatus
intention
revision
schemaVersion
```

`usageStatus`:
- `unanswered`
- `using`
- `not_using`
- `unknown`

`intention`:
- `unanswered`
- `keep`
- `delete`
- `family`
- `undecided`

既存UXの「未決定」は明示回答 `undecided` であり、未回答 `unanswered` と別。

新規baseline:
- usageStatus = `unanswered`
- intention = `unanswered`
- revision = 0

#### F2-R07: status初回確定時のintention互換

既存R001 prototypeの挙動を保存正本でも維持する。

MUST:
- categoryの `usageStatus` が初めて `unanswered -> using / not_using / unknown` へ変わるmutationで、同じcategory recordの `intention` が `unanswered` なら、**同一readwrite transaction内で `intention=undecided` へ初期化する**。
- usageStatusとintentionは同じcategory recordの1回の更新としてcommitする。
- category record revisionは1回だけ増加する。
- globalRevisionもそのtransaction分の1回だけ増加する。
- transactionがabortした場合、usageStatusだけ・intentionだけの片側commitを残さない。

MUST NOT:
- 既に `intention=keep / delete / family / undecided` のcategoryについて、status変更を理由にintentionを上書きしない。
- untouched categoryの `intention=unanswered` を先回りして `undecided` にしない。

結果として:
- untouched categoryだけが `usageStatus=unanswered && intention=unanswered` を取り得る。
- statusを一度確定したcategoryは、既存R001 semanticsどおり最低でも `intention=undecided` を持つ。
- R002の `intentionOverride=null` は、回答済みparent categoryに対して `unanswered` ではなく既存4値のcategory intentionを参照できる。

### 4.2 overview record

R001 prototypeの既存keyをcanonical keyとして維持する。

```text
recordId = overview用内部ID
identity
billing
finance
data
family
revision
schemaVersion
```

値:

`identity`
- unanswered
- configured
- not_configured
- unknown

`billing`
- unanswered
- yes
- no
- unknown

`finance`
- unanswered
- yes
- no
- unknown

`data`
- unanswered
- yes
- no
- unknown

`family`
- unanswered
- known
- hidden
- unknown

baselineは全field `unanswered`、revision=0。

## 5. R002 canonical service state

### 5.1 service record

```text
recordId
categoryKey
serviceCatalogId
otherServiceName
recordState
usageStatus
answers
intentionOverride
revision
schemaVersion
```

`recordState`:
- `partial`
- `completed`

`usageStatus`:
- `unanswered`
- `using`
- `dormant`
- `unknown`

`intentionOverride`:
- `null` = categoryと同じ
- `keep`
- `delete`
- `family`
- `undecided`

`inheritedIntention` は保存しない。

### 5.1.1 F2-R09: effective intention / display fallback

serviceの本人意向は、保存値と画面表示・派生effective値を分ける。

**canonical保存値**:
- parent categoryの `intention` はR001正本の値をそのまま保持する。
- R001未回答categoryからservice identityを追加しただけでは、parent `usageStatus=unanswered` / `intention=unanswered` を変更しない。
- serviceは `intentionOverride=null` を保持できる。
- `inheritedIntention` やfallback後の `undecided` をservice recordへ複写保存しない。

**effective/display resolutionのMUST規範**:

```text
resolveServiceIntention(service, parentCategory):
  if service.intentionOverride != null:
    return service.intentionOverride

  if parentCategory.intention in {keep, delete, family, undecided}:
    return parentCategory.intention

  if parentCategory.intention == unanswered:
    return undecided
```

最後の `unanswered -> undecided` は**画面表示・派生effective値だけのfallback**であり、parent canonical intentionを更新しない。

このresolverは以下すべてで同じ規範から再計算する:
- service初回表示
- reload
- browser restart
- normal backup restore
- file import / restore
- 一覧 / 詳細 / 完了画面の本人意向表示

MUST NOT:
- fallback `undecided` をservice recordへ保存しない。
- service identity選択だけを理由にparent intentionを `undecided` へ永続変更しない。
- parent `unanswered` をrestore/import時に自動補正しない。

**parent後変更**:
- 後からparent intentionが `keep / delete / family / undecided` へ確定した場合、`intentionOverride=null` のserviceはservice recordを書き換えず、次回resolver実行時から新parent値へ追随する。
- overrideありserviceはparent変更で上書きしない。

**child usage=using時のR03 + R07連携**:
- parent `usageStatus=unanswered` のcategory配下serviceで `usageStatus=using` を確定した場合、F2-R03の肯定方向整合によりparent `usageStatus=using` へ更新する。
- 同じparentの `intention=unanswered` ならF2-R07を**同一readwrite transaction**で適用し `intention=undecided` へ初期化する。
- service + parent categoryをatomic commitする。
- changed service record revisionとchanged category record revisionは各1回増加し、globalRevisionは1transaction分だけ1回増加する。
- transaction abortではservice/parentの片側だけを残さない。

effective intention:
- `intentionOverride != null` -> override
- `intentionOverride == null` かつparent intentionが既存4値 -> parent値
- `intentionOverride == null` かつparent intention=`unanswered` -> 派生表示だけ `undecided`

### 5.2 partial / completedの意味

`partial`:
- service identityがcommit済み。
- その後のusageStatus / optional answers / intentionOverrideの一部または全部が未回答でもよい。
- 中断後にreloadして再構成できる保存正本。
- UIのscreen番号やquestionPageは保存しない。

completed:
- 「この1件を整理完了」操作がtransaction complete済み。
- optional questionが `unanswered` のままでもcompletedになれる。
- completedかどうかをoptional fieldの充足率から推測しない。

#### F2-R08: service cross-field invariant

すべてのservice recordは、save / normal load / import / restore / backup validationで同じcross-field validatorを通す。

`partial` のMUST invariant:
- valid `recordId`
- valid canonical `categoryKey`
- valid service identity
- known serviceならapproved `serviceCatalogId` かつ `otherServiceName=null`
- other serviceなら `serviceCatalogId="other"` かつ正規化・検証済み `otherServiceName`
- `usageStatus` は `unanswered / using / dormant / unknown`
- active optional answerはkey必須で `unanswered` を許可
- inactive conditional answer keyは存在禁止
- `intentionOverride` は `null / keep / delete / family / undecided`

`completed` のMUST invariant:
- 上記identity / category / answers / intentionOverride規則をすべて満たす
- **`usageStatus` は `using / dormant / unknown` のいずれか**
- **`usageStatus=unanswered` を禁止**
- active optional answerは `unanswered` を許可
- inactive conditional answer keyは存在禁止

「この1件を整理完了」操作:
- completed invariantを満たす場合だけ `recordState=completed` をcommitする。
- invariant不成立ならtransactionを開始しない、またはcommitせずvalidation errorとする。
- 不正状態を自動補正してcompletedにしない。

normal load / import / restore:
- `recordState=completed && usageStatus=unanswered` をrejectする。
- completed other serviceのinvalid/empty `otherServiceName` をrejectする。
- active conditional key missing / inactive conditional key presentをrejectする。
- 不正completedをpartialへ自動downgradeして救済しない。

既存completed recordを編集する場合:
- 画面を開いただけでは変更しない。
- 最初の実データ変更transactionで `recordState=partial` に戻し、変更と同時commitする。
- 再度「この1件を整理完了」がcommitされたらcompletedへ戻す。
- これにより編集途中中断を明示できる。

### 5.3 answersのunanswered / inactive

実装者がfield absenceの意味を推測しないよう、規範を固定する。

- unconditional question: keyを必ず持ち、未回答は `unanswered`
- conditional question:
  - 条件がtrue: keyを必ず持ち、未回答は `unanswered`
  - 条件がfalse: keyは**存在してはならない**
- 親回答変更で条件がfalseになった場合、同一mutationでchild keyを削除
- 親回答変更で条件がtrueになった場合、child keyを `unanswered` として同一mutationで生成

したがって:
- keyあり + unanswered = 表示対象だが未回答
- keyなし = 現在の親回答では非該当

## 6. 「回答確定ごと」の保存イベント（F2-R02）

保存イベントは「canonical値を変更する利用者操作」を意味する。
同じ値を再度タップしただけでcanonical stateが変わらない場合はidempotent no-opとし、revisionを増やさない。

### 6.1 R001

| 操作 | 保存 | 保存内容 |
|---|---|---|
| category statusを初めて unanswered から確定 | MUST | usageStatus。intention=unansweredなら同一transactionでintention=undecidedも確定 |
| category statusを既回答値から別値へ変更 | MUST | usageStatus。既存keep/delete/family/undecidedは上書きしない |
| category statusで同じ値を再タップ | NO-OP | revision増加なし |
| overview各問をタップして値変更 | MUST | 対象overview field |
| category intentionをタップして値変更 | MUST | 対象category intention |
| STEP移動 / 戻る / 結果を見る | MUST NOT | UI位置は保存しない |

各成功transaction:
- 対象record revisionを1回増加
- globalRevisionを1回増加
- transaction complete後のみ保存済み

### 6.2 R002 known service

| 操作 | 保存 | 保存内容 |
|---|---|---|
| 既知serviceボタンを選択確定 | MUST | 新recordId、categoryKey、serviceCatalogId、recordState=partial、usageStatus=unanswered、初期answers。parent未回答でもparent正本は変更せず、intention表示はR09 resolverで派生 |
| usageStatus値変更 | MUST | usageStatus、recordState=partial |
| optional answer値変更 | MUST | answer + dependent child prune/materialize、recordState=partial |
| intentionOverride値変更 | MUST | override、recordState=partial |
| 「この1件を整理完了」 | MUST（invariant成立時のみ） | usageStatus≠unanswered等のcompleted invariant検証後、recordState=completed |
| 一覧を開く / 詳細を見るだけ | MUST NOT | no change |
| 「いったん詳細整理を終わる」 | MUST NOT（単独では） | 直前までtransaction complete済みの値だけ残る |

### 6.3 R002 「その他」

| 操作 | 保存 | 保存内容 |
|---|---|---|
| 「その他」を選択しただけ | MUST NOT | identity未確定 |
| service名を入力中 | MUST NOT | pending UI |
| valid service名で「利用状態へ」を押し確定 | MUST | 新recordId、categoryKey、serviceCatalogId=other、normalized otherServiceName、recordState=partial、usageStatus=unanswered、初期answers。parent未回答でもparent正本は変更せず、intention表示はR09 resolverで派生 |
| 以降のusage/answer/intention/complete | MUST | known serviceと同じ |

空文字・validator不合格のservice名は保存しない。

### 6.4 save in-flight中の次mutation

- 同一tabのsave coordinatorでtransactionを直列化する。
- mutationSeqはUI一時状態で、IndexedDB正本には保存しない。
- 先行transaction complete後、後続pending mutationが残っている間は「現在入力が保存済み」と表示しない。
- transaction abort/errorならそのmutationだけ未commit。直前までのcommitted stateを変更しない。

### 6.5 中断

ブラウザーreload / R002終了 / 別画面移動後:
- transaction complete済みのR001/R002 factsは残る。
- partial serviceはrecordState=partialとして復元する。
- pending overlayは通常reloadでは残る保証をしない。
- 保存失敗を検知できた場合は画面保持とemergency exportの対象にできる。

## 7. revision / generation規範

meta:
```text
schemaVersion
questionSchemaVersion
generationId
globalRevision
```

- record revision: 変更されたrecordごとに1増加
- globalRevision: 成功した1transactionにつき1増加
- 1transactionでservice + parent overview/categoryをatomic更新する場合、各変更record revisionは1増加、globalRevisionは1増加
- 新規service recordはrevision=1
- baseline category/overviewはrevision=0
- 最初の利用者mutationでdataset初期化 + mutationを1transactionで行いglobalRevision=1
- delete-all / full replace restore成功時はgenerationIdを変更
- generationId/globalRevision/record revision不一致ではB案どおり保存停止

## 8. R001 / R002 operation-direction matrix（F2-R03）

### 8.1 service追加/編集起点: positive方向

R002 detailの確定値により存在が論理的に証明された場合は、R001 summaryを**同一transactionで肯定方向へ整合**する。

| R002 mutation | R001が否定値なら |
|---|---|
| usageStatus=using | parent category `not_using/unanswered -> using`。parent intention=unansweredならF2-R07を同一transactionで適用しundecidedへ初期化 |
| billing=yes | overview `billing: no -> yes` |
| finance系 asset=yes | overview `finance: no -> yes` |
| importantData=yes | overview `data: no -> yes` |
| familyKnow=no | overview `family: known -> hidden` |

R001がunanswered / unknownの場合:
- detail positive factはdetail正本としてcommitしてよい。
- R003の明白矛盾解消ルールに従い、論理的に一意なsummary positiveへの整合を行う。
- 自動整合されたsummaryとserviceを同一transactionでcommitする。

### 8.2 R001 negative変更起点

利用者がR001を否定方向へ変更しようとしたとき、既存R002 positive detailがある場合:

- silent commit禁止
- child削除禁止
- child dormant化禁止
- summaryだけ否定値へ変更禁止
- transactionをcommitせず、配下detailの確認/解消を求める

対象:
- category -> not_using vs child using
- billing -> no vs service billing=yes
- finance -> no vs finance detail asset=yes
- data -> no vs detail importantData=yes
- family -> known vs detail familyKnow=no

### 8.3 serviceのpositive -> negative変更

例: service billing yes -> no、usage using -> dormant。

- service変更はcommitできる。
- R001 summaryを否定方向へ自動変更しない。
- source summaryは既存値を維持。
- hidden child answerは条件に従ってatomicにpruneする。

### 8.4 service削除起点

- service recordを削除する。
- parent categoryをnot_usingへ自動変更しない。
- billing/finance/data/family summaryを否定方向へ自動変更しない。
- service削除と必要なrecord revision/meta更新は同一transaction。

### 8.5 service category move

現行R002 UXにはservice category移動操作を追加しない。

保存層の規範:
- 通常のservice editではcategoryKey mutationを許可しない。
- 将来、別承認でmove操作を導入する場合のみ専用operationとして扱う。
- 専用moveではtarget categoryにpositive整合、source categoryにnegative自動整合しない。
- service + target summary/category更新を同一transaction。
- category指定はcanonical categoryKeyだけを受理し、displayCodeで対象決定しない。

F5では:
- ordinary editでcategoryKey改変を拒否
- synthetic move guardを試す場合はcanonical keyだけを受理する

## 9. 保存共通transaction

全保存系operationは共通guardを通す。

1. UI mutationをcanonical candidateへ変換
2. text normalization / allowlist / type / enum / dependency validation
3. expected generation/global/record revisionを保持
4. 必要storeを含むreadwrite transaction開始
5. 最新meta / affected recordsをtransaction内で再読込
6. expected版照合
7. operation-direction整合
8. conditional child prune/materialize
9. prospective committed datasetを生成
10. canonical capacity projection作成
11. UTF-8 byte count
12. >10,000,000ならabort
13. affected records + metaをwrite
14. transaction complete
15. 対応mutationだけをcommit済みとしてUIへ反映

request単体successを保存成功扱いしない。

## 10. 「その他」service名規範（F2-R04）

現在の自由文字入力は `otherServiceName` だけ。

### 10.1 canonicalization MUST

保存・normal backup・emergency export・import/restore validationで同じ関数規範を使う。

順序:
1. 入力をUnicode stringとして受理
2. **Unicode NFC**へnormalizeする
3. ECMAScript `String.prototype.trim()` 相当で先頭/末尾whitespaceを除く
4. C0 controls U+0000–U+001F、DEL U+007F、C1 controls U+0080–U+009Fを含む場合は拒否
5. Unicode bidi control charactersを含む場合は拒否
   - U+061C
   - U+200E–U+200F
   - U+202A–U+202E
   - U+2066–U+2069
6. 正規化・trim後が空なら拒否
7. 正規化・trim後の**UTF-16 code unit length**が1〜60であること
   - 現R002 `input.maxLength=60` と同じ単位へ合わせる
8. secret-like regexは補助防御として適用し、該当時は保存しない

**NFKCは採用しない。**
理由: compatibility文字を別文字へ変換し、利用者が入力したservice表示名の意味・見た目を不要に変える可能性があるため。NFCでcanonical equivalenceだけを統一する。

### 10.2 MUST NOT

- control/bidi文字を黙って削除して保存しない
- invalid import値を自動修復しない
- importだけ別validatorにしない
- raw未正規化文字列を容量計測へ使わない

### 10.3 capacityとの順序

otherServiceNameは**NFC + trim + validation後のcanonical string**をprospective datasetへ入れ、その値を容量計測する。

pending UIの未確定raw文字列は通常capacity projectionに入れない。

## 11. canonical capacity projection（F2-R05）

### 11.1 対象

10MBはprospective **committed dataset** に対するアプリ定義上限。

- normal committed dataset: 対象
- save candidate: mutation適用後のprospective committed datasetとして対象
- pending overlay単体: 未commitなので現在のcommitted容量には含めない
- emergency export file wrapper/metadata: 10MB IndexedDB上限の対象外。F3でfile制限を別定義

### 11.2 top-level property order

容量計測用projectionは必ず以下の順序で構築する。

```text
{
  schemaVersion,
  questionSchemaVersion,
  generationId,
  globalRevision,
  overview,
  categories,
  services
}
```

### 11.3 overview order

```text
{
  recordId,
  identity,
  billing,
  finance,
  data,
  family,
  revision,
  schemaVersion
}
```

全field必須。`unanswered` は文字列として明示。

### 11.4 categories order

配列順は固定mapping順:
`device, base, mail, social, cloud, subscription, finance, commerce, auth, license, carrier, business`

各property順:
```text
{
  recordId,
  categoryKey,
  usageStatus,
  intention,
  revision,
  schemaVersion
}
```

12件すべて含める。unanswered recordも除外しない。

### 11.5 services order

service recordsは `recordId` のASCII/Unicode code unit昇順。
recordId format自体はF4前レビューで確定するが、同一dataset内で一意・安定であること。

property順:
```text
{
  recordId,
  categoryKey,
  serviceCatalogId,
  otherServiceName,
  recordState,
  usageStatus,
  answers,
  intentionOverride,
  revision,
  schemaVersion
}
```

- known service: otherServiceName = null
- other service: serviceCatalogId = "other"
- partial / completed両方を含める
- pending overlayは含めない

### 11.6 answers order

R2Qで定義されたquestion順でpropertyを構築する。

- unconditional: key必須。未回答は `unanswered`
- active conditional: key必須。未回答は `unanswered`
- inactive conditional: key自体を含めない

unknown answer keyは禁止。

### 11.7 JSON / UTF-8

- 上記projectionを新規objectとして構築
- `JSON.stringify`
- `TextEncoder` 相当でUTF-8 bytes
- 10,000,000以下: app capacity gate通過
- 10,000,001以上: write拒否

ID、revision、version、unanswered、partial serviceを恣意的に除外しない。

## 12. normal backup / emergency export / restore（F2-R06）

### 12.1 normal backup

対象:
- transaction complete済みのcommitted datasetだけ
- completed service
- committed partial service
- R001 unansweredを含むbaseline/partial state

含めない:
- pending overlay
- UI screen/history
- mutationSeq

したがってnormal backupは「完了済みだけのbackup」ではない。
**commit済みの途中整理も正本なので含む。**

### 12.2 emergency export

保存失敗・競合等で未commit mutationが残る場合:

- committed datasetを通常backup相当領域に入れる
- pending overlayを**別領域**に追加できる
- pendingはcommitted recordへmergeして書出さない
- pendingにはbase generation/global/target record revision等、どの正本に対するmutationかを判別するmetadataを付ける要件をF3へ渡す

pendingも書出し前に同じinput validatorを通す。

invalid pending:
- emergency fileへ含めない
- 「未保存入力を退避できた」と表示しない
- committed部分だけ書き出せた場合はpending非退避を明示する

### 12.3 emergency fileと10MB

10MBはIndexedDBのprospective committed dataset上限。

保存失敗原因が10MB超過なら、pending mutationを足すと10MBを超える可能性がある。
そのため:
- emergency export fileが10MBを超える可能性を認める
- file size上限はF3で別途確定
- emergency pendingをrestore時に自動commitしない

### 12.4 restore

normal backup:
- strict validation後、committed datasetとしてatomic full replace
- partial/completed状態をそのまま復元
- restore成功時generationIdを切替
- 旧tabをgeneration mismatchで無効化
- required field欠落、unexpected field / unexpected nested object、duplicate category、duplicate recordId、unknown schema/question version、unknown categoryKey、categoryKey/displayCode不一致をreject
- service recordはF2-R08 cross-field invariantを検証
- `completed + usageStatus=unanswered` をreject
- active conditional field missing / inactive conditional field presentをreject
- invalid completed stateを自動補正しない

emergency export:
1. committed dataset部分をstrict validation
2. atomic restore
3. pending overlayは**未commitのまま**別扱い
4. silent apply禁止
5. 利用者が再適用する場合、通常save pipelineを通す
6. 再適用後のprospective committed datasetが10MBを超えるなら再度保存拒否

F3でfile envelope、raw file上限、parsed size上限、pending再適用UIを確定する。
本F2文書はF3詳細形式を承認しない。

## 13. conflict / delete / restore世代

- record revision + globalRevision + generationIdを維持
- partial serviceも通常service recordと同じ版管理
- 全削除 / full replace restore成功時generation切替
- 古いtabからpartial/completed recordどちらも再書込不可
- BroadcastChannel等は補助であり、保存可否はtransaction内version比較

## 14. S06 / secret / XSS / external send

変更なし:
- R003 D区分fieldを作らない
- 自由メモなし
- external account identifier実値なし
- user textはtextContent相当
- unknown JSON key/nest拒否
- analytics/APM/session replay/error logへ整理内容を送らない
- origin / CSP / third-party scriptはF4前審査

## 15. private mode / long-term loss / backup prompt

既承認どおり維持。

- 利用開始時の赤文字private mode注意
- long-term loss説明
- 適宜backup推奨を同じ利用開始時に表示
- 完了時/回答変更時/定期催促は追加しない
- private mode専用検知/遮断は追加しない
- 「保存済み」はtransaction commit済みの意味で、長期保持保証ではない

## 16. F2-R01〜R09対応要約

| 差戻し | 対応 |
|---|---|
| F2-R01 | categoryKeyを既存内部ID 12種へ固定。A〜Lは表示専用 |
| F2-R02 | unanswered / committed partial / completed / pendingを定義。R001/R002の保存イベント表を固定 |
| F2-R03 | detail positive、parent negative、service negative/delete、category moveを操作方向別に分離 |
| F2-R04 | otherServiceNameはNFC+trim、control/bidi拒否、UTF-16 1〜60、importも同一規範 |
| F2-R05 | category fixed order、explicit unanswered、partial serviceを含むcanonical projectionを確定 |
| F2-R06 | normal backup=committedのみ、emergency=pending別領域、restoreでpending silent commit禁止 |
| F2-R07 | category status初回確定時、intention=unansweredなら同一transactionでundecidedへ初期化。既存4値は上書きしない |
| F2-R08 | completed serviceはusageStatus非unanswered等のcross-field invariantを必須化。load/import/restoreも同一validation |
| F2-R09 | parent intention=unanswered + override=nullではcanonicalを変更せず、画面/effectiveだけundecidedへfallback。reload/restart/restore/importで同じresolverから再計算。child using時はR03+R07を同一transactionで適用 |

## 17. 残る未承認事項

- IndexedDB object store名 / keyPath
- recordId生成方式の具体実装
- schemaVersion / questionSchemaVersionの具体値
- F3 file envelope / file size上限 / pending再適用UI
- 保存エラー例外mappingの実装
- F4コード
- F5/F6実測

本設計の完成は安全性試験PASSを意味しない。

## 18. 停止位置

制作管理室へ再提出し、再レビュー待ちで停止。

禁止:
- F2全体自己承認
- F3詳細承認
- F4実装開始
- F5/F6未試験をPASS扱い
- 本番公開
- R005凍結解除
- 認証 / クラウド同期再開
