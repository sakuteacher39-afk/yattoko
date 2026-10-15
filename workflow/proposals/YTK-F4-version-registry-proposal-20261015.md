# YTK-F4｜ACTIVE version registry 具体化案

- 作成日：2026-10-15
- 状態：**CANDIDATE FOR ACTIVE / INDEPENDENT REVIEW PENDING / NOT ACTIVE**
- F2承認設計：`0d5dfa387f924e5dc3dc9196b9f236986c910281`
- F3承認対象：`3b54acbe7d85f60b3f8b4ffcd9b723cdc02b5641`
- F3制作管理室最終レビュー：`3856a9b5dc98fdf054bdb71673d779c2ae0457c2`
- F3人間承認記録：`efcde632a3d1aa5486f248d667f5514608555f9e`
- R001現行prototype blob：`f090acdea6bb117f49614689ecf725b0cd14f2de`
- R002現行prototype blob：`7e302dad973b827d2ee5d6026369c9656adf0f35`

本書はF3でUNBOUND/BLOCKINGとして残ったversion registryを具体化する案である。
**本書を作成しただけではACTIVEにならない。制作管理室の独立レビューと人間の明示承認後にのみACTIVEへ昇格可能。**
F4アプリ本体コードは本作業では変更しない。

## 1. Registry ID

候補registry ID：

`ytk-free-v1-registry-20261015`

状態：
- 現在：`CANDIDATE`
- 独立レビューPASS＋人間の明示承認後：`ACTIVE`
- ACTIVE前はproduction export / import / restoreを有効化禁止。

## 2. ACTIVE候補値

| 項目 | 候補値 | 根拠 |
|---|---|---|
| fileFormatVersion | `1` | F3人間承認済み |
| schemaVersion | `ytk-f2-20261014-0d5dfa38` | F2人間承認対象commit `0d5dfa38...` のcanonical保存schemaにbinding |
| questionSchemaVersion | `ytk-q-r001r002-20261015-f090acde-7e302dad` | 現行R001/R002質問定義へbinding |
| recordId format | `record-id-v1` | F2が具体grammarを未確定のため本書でbinding候補を定義 |
| generationId format | `generation-id-v1` | F2が具体grammar/generatorを未確定のため本書でbinding候補を定義 |

accepted version pairは**1組だけ**とする。

~~~text
fileFormatVersion = 1
schemaVersion = "ytk-f2-20261014-0d5dfa38"
questionSchemaVersion = "ytk-q-r001r002-20261015-f090acde-7e302dad"
~~~

old / future / unknown pairを推測変換しない。

## 3. schemaVersion binding

### 3.1 値

`ytk-f2-20261014-0d5dfa38`

単なる「1」ではなく、F2承認日と承認設計commit prefixを含め、どのcanonical schemaへbindingしたか追跡できる値とする。

### 3.2 このversionが意味するschema

F2承認設計に記載された以下を含む。

- meta：schemaVersion / questionSchemaVersion / generationId / globalRevision
- overview record
- 12 category records
- service records
- unanswered / partial / completed / pendingの区別
- R07 / R08 / R09
- record revision / globalRevision / generation semantics
- conditional answer presence rule
- canonical categoryKey 12種
- otherServiceName validation
- canonical capacity projection
- 10,000,000 UTF-8 bytes上限
- strict import/restore semantics

### 3.3 version bump条件

以下のcanonical保存意味が変わる場合のみ新schemaVersionを作る。

- field追加・削除・意味変更
- enum値追加・削除・意味変更
- record type変更
- R07/R08/R09等、保存値のcross-field invariant変更
- canonical capacity projectionへ影響する構造変更
- revision/generation semantics変更

UI文言、CSS、表示順だけの変更ではschemaVersionを変えない。

## 4. questionSchemaVersion binding

### 4.1 値

`ytk-q-r001r002-20261015-f090acde-7e302dad`

これはprototype全体のUIバージョンではなく、**保存対象となる質問key・回答enum・条件分岐manifest**へbindingする。

R001 source：
- `workflow/prototypes/YTK-R001/prototype.html`
- blob `f090acdea6bb117f49614689ecf725b0cd14f2de`

R002 source：
- `workflow/prototypes/YTK-R002/prototype.html`
- blob `7e302dad973b827d2ee5d6026369c9656adf0f35`

### 4.2 R001 manifest

category status：
- `using / not_using / unknown`
- canonical未回答は`unanswered`

category intention：
- `keep / delete / family / undecided`
- canonical未回答は`unanswered`

overview：
- identity：`configured / not_configured / unknown`
- billing：`yes / no / unknown`
- finance：`yes / no / unknown`
- data：`yes / no / unknown`
- family：`known / hidden / unknown`
- canonical未回答は各field `unanswered`

### 4.3 R002 manifest

共通：
- usageStatus：`unanswered / using / dormant / unknown`
- recordState：`partial / completed`
- intentionOverride：`null / keep / delete / family / undecided`

category別answer key：

- device：`importantData`, `backup`
- base：`handover`, `importantData`, `billing`
- mail：`recoveryUse`, `importantData`
- social：`importantData`, `handover`, `billing`
- cloud：`importantData`, `backupUse`, `paid`
- subscription：`billing`, `billingSource`
- finance：`asset`, `familyKnow`, `selfIdentify`
- commerce：`billing`, `balance`, `openTrade`
- auth：`recovery`, `dependency`
- license：`purchase`, `subscription`, `importantData`
- carrier：`recoveryUse`, `mainLine`, `familyKnow`
- business：`importance`, `billing`, `sharedAdmin`, `importantData`

条件分岐：
- `subscription.billingSource` は `subscription.billing == "yes"` の時だけactive。
- inactive conditional keyは保存・import・restoreで存在禁止。
- active questionが未回答ならkeyは存在し、値は`unanswered`。

回答enumはR001/R002現行定義とF2承認設計のallowlistを実装時に単一manifestへ転記し、F5でsource定義との一致をassertする。

### 4.4 question version bump条件

次の場合は新questionSchemaVersionを作る。

- question key追加・削除・rename
- 回答enum追加・削除・意味変更
- conditional dependency変更
- 「未回答」のmaterialize/presence rule変更

質問表示文の軽微な言い換え、回答ラベルだけの変更は、canonical key/enum/conditionが不変ならversion bump不要。

## 5. recordId grammar

`recordId` は「記録の意味」ではなく内部識別子。F2の意味を変更しない。

### 5.1 overview

固定値：

`ovw_main`

validation：
- overview storeには1件だけ。
- recordIdは`ovw_main` exact match。
- import/restoreで別値、重複、欠落をreject。

### 5.2 category

固定形式：

`cat_<categoryKey>`

exact allowlist：
- `cat_device`
- `cat_base`
- `cat_mail`
- `cat_social`
- `cat_cloud`
- `cat_subscription`
- `cat_finance`
- `cat_commerce`
- `cat_auth`
- `cat_license`
- `cat_carrier`
- `cat_business`

validation：
- categoryKeyとの対応がexactであること。
- 12件各1件。
- A〜LからrecordIdを推測生成してimport補正しない。

### 5.3 service

grammar：

~~~regex
^svc_[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$
~~~

generator：
1. primary：Web Cryptoの`crypto.randomUUID()`。
2. lowercase化。
3. `svc_` prefixを付与。
4. 現在dataset内のservice recordIdと作成中candidate setにcollisionがないことを確認。
5. collisionなら新UUIDを生成し直す。
6. 3回連続collision / generator failureなら作成をfail closedし、未保存画面値を保持する。
7. `Math.random()`、timestamp単体、連番単体をID生成に使わない。

`crypto.randomUUID()` が対象browserで使用不能な場合の実装fallback候補：
- `crypto.getRandomValues(new Uint8Array(16))` で128bitを取得。
- RFC 4122 UUIDv4 version/variant bitsを設定。
- 同じlowercase UUIDv4 grammarへserialize。
- fallback採用可否・Safari動作はF5/F6で確認する。

uniqueness：
- current datasetのservice records内で一意。
- import/restoreではduplicate recordIdをreject。
- editではrecordId immutable。
- delete後に同じIDを再利用しない。新規作成は新UUID。

## 6. generationId grammar

grammar：

~~~regex
^gen_[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$
~~~

generatorはservice recordIdと同じUUIDv4 sourceを使い、prefixだけ`gen_`とする。
`Math.random()`、timestamp単体、globalRevisionからの導出は禁止。

### 6.1 初期dataset

最初の保存対象mutationでdatasetを初期化する際に新generationIdを事前生成し、F2の初期化transactionでmetaへcommit。

### 6.2 通常mutation

通常保存ではgenerationIdを変更しない。

### 6.3 delete-all

delete-all成功時：
- transaction開始前にnew generationId candidateを生成。
- current generationとexact equalなら再生成。
- delete-allの全処理とnew generationId書込を同一transaction。
- abort時は旧generationIdと旧正本を維持。
- complete後だけnew generationを正本とする。

### 6.4 full replace restore

F3承認設計どおり：
- input fileのsource generationIdはstrict validation対象。
- **復元後のlocal current generationIdとして再利用しない。**
- restore preflightでfresh new generationIdを生成。
- atomic replace transactionでnew generationIdをmetaへcommit。
- abort時は旧generation維持。
- complete後だけ新generation。

### 6.5 multi-tab接続

各tabは読み込んだ時点のexpected generationId / globalRevision / affected record revisionを保持する。

全write transaction：
1. current metaをtransaction内で再読込。
2. expected generationId exact match。
3. expected globalRevision exact match。
4. affected record revision exact match。
5. 1つでも不一致ならwrite前にabort。
6. force overwrite / silent merge禁止。

delete-all / full replaceでgenerationが変わった後、旧tabはgeneration mismatchで保存不能。

## 7. version validation規範

production export / import / restoreが有効になるのはregistry状態が`ACTIVE`の時だけ。

### export

- fileFormatVersion = ACTIVE exact value。
- meta.schemaVersion = ACTIVE schemaVersion exact value。
- meta.questionSchemaVersion = ACTIVE questionSchemaVersion exact value。
- recordId / generationIdはACTIVE grammarを満たすこと。
- registry不整合datasetから「とりあえず」exportしない。安全に停止する。

### import / restore

順序：
1. fileFormatVersion exact match。
2. schemaVersion/questionSchemaVersion pair exact match。
3. generationId ACTIVE grammar。
4. overview/category/service recordId grammar。
5. duplicate/missing/unknown IDs reject。
6. F2/F3 strict semantic validation。
7. capacity / conflict / atomic replaceへ進む。

MUST NOT：
- old/future/unknown versionを推測変換しない。
- unknown IDを新IDへ再生成して救済しない。
- unknown question keyを無視して取込まない。
- migrationを暗黙追加しない。

migrationが必要になった場合は、旧pair→新pairの変換仕様を別成果物として設計・レビュー・承認する。

## 8. F5/F6 registry試験候補

**試験計画追加案でありNOT RUN。**

- REG-01 fileFormatVersion exact 1のみaccept。
- REG-02 unknown/0/2/string "1" reject。
- REG-03 schema/question exact accepted pairのみaccept。
- REG-04 schemaだけcurrent、question unknownをreject。
- REG-05 questionだけcurrent、schema unknownをreject。
- REG-06 old/future versionをmigrationしない。
- REG-07 ACTIVE未設定でexport/import/restore entrypoint disabled。
- RID-01 overview exact `ovw_main`。
- RID-02 category 12 exact IDs。
- RID-03 categoryKey/recordId mismatch reject。
- RID-04 valid svc UUIDv4 accept。
- RID-05 uppercase/braces/v1/v7/invalid variant/service prefix typo reject。
- RID-06 duplicate service recordId reject。
- RID-07 generator collision fixtureでretry、3回failureでfail closed。
- RID-08 editでrecordId mutation reject。
- GEN-01 valid gen UUIDv4 accept。
- GEN-02 initial datasetでgeneration作成。
- GEN-03 normal mutationでgeneration不変。
- GEN-04 delete-all complete時だけnew generation。
- GEN-05 delete-all abortで旧generation維持。
- GEN-06 restore source generationをlocal currentとして再利用しない。
- GEN-07 restore abortで旧generation維持。
- GEN-08 old tab writeはgeneration mismatchでreject。
- IOS-REG-01 iPhone SafariでUUID generator primary/fallback経路を実機確認。

## 9. F2/F3との差分判定

**F2/F3の承認済みsemantic変更：なし。**

今回具体化したのは、F2/F3が明示的にUNBOUND/BLOCKINGとして後続工程へ残した技術bindingだけ。

変更していない：
- categoryKey 12種
- R07/R08/R09
- 10,000,000 bytes
- canonical capacity projection
- revision/globalRevision/generationの意味
- pending semantics
- strict restore
- secret policy
- external storage/auth freeze

## 10. 人間判断

人間に必要な判断：
1. 本registry候補をACTIVEとして採用するか。
2. recordId/generationIdのprefixed UUIDv4 bindingを採用するか。
3. questionSchemaVersionを上記現行R001/R002 manifestへbindingするか。

制作管理室レビュー前・人間承認前は`CANDIDATE`のまま。
