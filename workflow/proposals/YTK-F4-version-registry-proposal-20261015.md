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
| questionSchemaVersion | `ytk-qm-gitblob-4a9950b19813e74bc51de2246465096818d375ac` | machine-readable canonical question manifest blobへcontent-address binding |
| recordId format | `record-id-v1` | F2が具体grammarを未確定のため本書でbinding候補を定義 |
| generationId format | `generation-id-v1` | F2が具体grammar/generatorを未確定のため本書でbinding候補を定義 |

accepted version pairは**1組だけ**とする。

~~~text
fileFormatVersion = 1
schemaVersion = "ytk-f2-20261014-0d5dfa38"
questionSchemaVersion = "ytk-qm-gitblob-4a9950b19813e74bc51de2246465096818d375ac"
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

`ytk-qm-gitblob-4a9950b19813e74bc51de2246465096818d375ac`

questionSchemaVersionはprototype SHAの手作業連結ではなく、**canonical semantic manifestのGit blob object IDそのものへbinding**する。

normative manifest：
- `workflow/specs/YTK-F4-canonical-question-manifest-v1.json`
- Git blob SHA：`4a9950b19813e74bc51de2246465096818d375ac`
- questionSchemaVersion：`ytk-qm-gitblob-<full 40-hex blob SHA>`

Git blob SHAはversion identity / drift detection用であり、真正性や暗号学的署名を意味しない。

### 4.2 manifestの正本範囲

manifestは表示文言を持たず、保存・validatorに効くsemanticだけを固定する。

含むもの：
- canonical categoryKey 12種
- R001 category `usageStatus` 全enum
- R001 category `intention` 全enum
- R001 overview 5 keyの全enum
- R002 service core：`recordState` / `usageStatus` / `intentionOverride`
- R002 12 category / 33 question keyの全canonical enum
- `unanswered` の明示materialize
- unconditional / active conditional / inactive conditionalのpresence規則
- `subscription.billingSource` の唯一の現行条件分岐：`billing == "yes"`
- F2 positive-direction validator binding
- F2-R07 / R08 / R09

manifest内のenumは**canonical保存値**なので、prototype UIの選択肢にない `unanswered` もF2承認規範に従って明示する。

### 4.3 source evidence

manifest作成時の照合元：
- R001 prototype blob：`f090acdea6bb117f49614689ecf725b0cd14f2de`
- R002 prototype blob：`7e302dad973b827d2ee5d6026369c9656adf0f35`
- F2承認設計commit：`0d5dfa387f924e5dc3dc9196b9f236986c910281`

照合結果：
- R001 status / intention / overview 5 key：一致
- R002：12 category / 33 questionsのkey・UI answer enum：一致
- conditional question：1件、`subscription.billingSource` のみ、一致
- F2 unanswered presence / inactive forbidden：一致
- F2-R07 / R08 / R09：一致
- positive-direction validator 5系統：一致

### 4.4 実装時のsingle source rule

F4実装時は次をMUSTとする。

1. `YTK-F4-canonical-question-manifest-v1.json` を直接importするか、build stepで**このJSONだけから**runtime moduleを生成する。
2. validator / serializer / conditional materializer / F5 fixture generatorは同じmanifest由来の定義を使う。
3. 同内容のquestion key / enum / condition tableを別ファイルへ手作業で複製しない。
4. runtime generated manifestとnormative JSONのsemantic deep-equalをF5でassertする。
5. manifest不読込・不一致ならproduction export/import/restoreを有効化しない。

UI表示ラベルはmanifest外。ラベル変更だけではquestionSchemaVersionを変えない。

### 4.5 自動version更新判定

F5/build verificationで以下を必須とする。

1. normative manifest file bytesのGit blob object IDを計算する。
2. registryのquestionSchemaVersionが `ytk-qm-gitblob-<calculated SHA>` とexact matchすること。
3. manifest bytesが1byteでも変わればblob SHAが変わるため、questionSchemaVersion未更新を自動FAIL。
4. questionSchemaVersionだけを変更してmanifestが一致しない場合もFAIL。
5. current implementation/generated manifestがnormative manifestとdeep-equalでなければFAIL。

canonical semanticを変える場合：
- manifestを変更
- questionSchemaVersionを新blob SHAへ更新
- schemaVersion変更要否をF2 meaning change規則で判定
- 制作管理室レビュー＋必要な人間承認
- migrationが必要なら別設計

表示文言/CSSだけの変更：
- manifestを変更しない
- questionSchemaVersionを変更しない

### 4.6 version bump対象

manifest変更が必要なのは少なくとも以下。

- canonical question key追加・削除・rename
- canonical answer enum追加・削除・意味変更
- conditional dependency / condition value変更
- unanswered/presence rule変更
- R07/R08/R09とのquestion-side binding変更
- positive-direction validator binding変更

手作業で「versionを変えるべきか」を判断するだけにせず、manifest blob mismatchを機械的gateにする。

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
- MAN-01 normative manifest JSON parse/schema validation。
- MAN-02 manifest category=12 / R002 questions=33 / conditional=1をassert。
- MAN-03 R001全key/enum exact一致。
- MAN-04 R002全key/enum exact一致。
- MAN-05 billingSource condition exact一致。
- MAN-06 F2 unanswered/presence、R07/R08/R09、positive-direction binding一致。
- MAN-07 manifest Git blob SHAとquestionSchemaVersion suffix exact一致。
- MAN-08 manifest 1byte変更＋version未更新をFAIL。
- MAN-09 versionだけ変更＋manifest不一致をFAIL。
- MAN-10 runtime/generated manifestとnormative JSONのdeep-equal。
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
3. questionSchemaVersionをmachine-readable manifest blob `4a9950b19813e74bc51de2246465096818d375ac` へbindingするか。

制作管理室レビュー前・人間承認前は`CANDIDATE`のまま。
