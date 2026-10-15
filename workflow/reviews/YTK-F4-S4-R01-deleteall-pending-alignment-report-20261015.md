# YTK-F4-S4-R01｜deleteAll 緊急pending整合性 独立照合報告

- 作成日：2026-10-15
- 対象F4 commit：`40686f470b08e0f08b143d3389ba6bfd7cbe65ed`
- 審査起点：F4第4段階 CONDITIONAL PASS / F4-S4-R01
- 状態：**ANALYSIS COMPLETE / NO PRODUCT CODE CHANGE / NO APPROVED SPEC CHANGE / NO TEST PLAN CHANGE / RE-REVIEW PENDING**
- 本報告だけでF5/F6開始・本番公開・R005再開を許可しない。

## 1. 結論

### 1.1 判定

**deleteAllを通常の保存操作として実行すること：承認済み根拠あり。**

**deleteAllを緊急pending operationとして収録し、復元後に再適用すること：承認済み根拠なし。むしろF3承認済み試験計画R01-14が明示的に拒否対象としている。**

したがって、現F4実装の
`deleteAll` を emergency pending allowlistへ含める挙動は、F2/F3承認済みsemanticを拡張した**implementation drift**と判定する。

既承認仕様の意味変更は不要。
解消方針は**承認済みF3 R01-14へ実装を戻す**ことが最小かつ安全。

本段階ではコード・承認済み仕様・試験計画を変更していない。

## 2. 正本と優先順位

### F2

- 承認設計commit：`0d5dfa387f924e5dc3dc9196b9f236986c910281`
- 設計：`workflow/proposals/YTK-F2-storage-safety-revision-20261013.md`
- 試験計画：`workflow/proposals/YTK-F2-F5-F6-test-plan-20261013.md`

### F3

- 人間承認対象commit：`3b54acbe7d85f60b3f8b4ffcd9b723cdc02b5641`
- 設計：`workflow/proposals/YTK-F3-backup-restore-design-draft-20261014.md`
- 試験計画：`workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md`
- 人間正式承認記録：`efcde632a3d1aa5486f248d667f5514608555f9e`

F3人間承認記録は、上記F3設計書だけでなく**F3試験計画案も承認範囲の3成果物に明示的に含めている**。
したがってR01-14は承認済み設計境界として扱う。

### F4

- 照合対象commit：`40686f470b08e0f08b143d3389ba6bfd7cbe65ed`
- branch：`codex/f4-stage4-integration`

## 3. F2照合

### 3.1 delete-all通常保存

F2承認設計はdelete-allについて以下を要求している。

- delete-all / full replace restore成功時はgenerationIdを変更する。
- generation/global/record revision不一致では保存停止。
- delete-all成功後、旧generationのtabから再書込させない。

F2承認試験計画にも以下が存在する。

- DEL-04：delete-all途中abortで旧datasetを全体維持。
- DEL-05：delete-all成功で新generationIdへ切替。
- DEL-06：delete-all成功後、旧generation tabの保存を拒否。
- CON-05 / PC-CON-02 / PC-DEL-02にもdelete-all generation guardがある。

**よって「delete-allを通常の破壊的保存operationとして持つ」こと自体は承認済み。**

### 3.2 emergency pending

F2承認設計はpending overlayを
「画面上にあるがtransaction completeしていない直近mutation」
として、保存失敗時にemergency exportの別領域へ追加できるとしている。

ただしF2の「回答確定ごとの保存イベント」表はR001/R002の回答・service操作を列挙しており、delete-allをemergency pendingへ収録可能とは明記していない。

F2はF3へpending metadata / 再適用UIの詳細確定を委譲している。

したがってF2単独から
「deleteAllを緊急pendingとして収録・再適用可能」
とは導けない。

## 4. F3照合

### 4.1 F3設計v0.3

F3 v0.3 5.2はpending operationについて、

- operationTypeはF2保存イベントallowlist内のみ。
- pendingはbase generation/global/record revision等を持つ。
- unsupported operation用reasonCodeとして`UNSUPPORTED_OPERATION`を定義。

としている。

この文だけでは「F2の全storage mutation type」がpending-safeとは書いていない。

### 4.2 F3 R01-14

承認済みF3試験計画：

`R01-14 unsupported operation（delete-all/restore等）をpendingへ入れる。`
期待：
`reject`

これはdelete-allを緊急pending operationとして扱わないことを**具体例つきで明示**している。

F3人間承認記録は、この試験計画をF3承認対象成果物に含めている。

よって、F3承認範囲における最も具体的なdelete-all pending規範は：

**delete-allはunsupported pending operationであり、収録しない。**

### 4.3 pending再適用との整合

F3 v0.3ではpending再適用を：

- snapshot restoreとは別operation。
- 利用者明示確認後のみ。
- F2通常save pipeline経由。
- restored generation / sourceFileId / operationId / receipt / revisionで保護。
- 証拠喪失時は自動applyも自動skipもしない。

としている。

delete-allは成功時にgenerationそのものを変更するため、pending reapply sessionのrestored generation証拠を破壊する特殊operationになる。

F4 Stage3 report自身も
「deleteAll等のgeneration変更後はrestored generationの証拠条件が切れるため、残操作の進行を停止」
と記録している。

これは実装側がdeleteAll pendingを許した結果、新しい特殊挙動を追加している証拠であり、F3承認済みR01-14を上書きする承認根拠にはならない。

## 5. F4実装照合

### 5.1 Stage2 emergency capture

`workflow/prototypes/YTK-F4/src/backup.mjs`

現実装：

`TYPES=['category','overview','addService','service','completeService','deleteService','deleteCategory','deleteAll']`

この`TYPES`をpending captureのallowlistとして利用している。

さらに：

- deleteAllのtargetKindをoverview扱い。
- deleteAllのdependency footprintを全体`*`扱い。
- capture時にdeleteAllをvalid operationとしてserialization可能。

`BACKUP-FORMAT.md` も
「operationType: F2保存API type」
としてdeleteAllを明示的に含めている。

### 5.2 import

`workflow/prototypes/YTK-F4/src/import-backup.mjs`

- backup.mjsの`TYPES`をimport。
- pending operationTypeが`types.includes(...)`なら受理可能。
- `decodeOperation`にdeleteAll branchが存在。
- pending semantic validation中にdeleteAllを`mutate`可能。

したがってcrafted / exported emergency file内のdeleteAll pendingをstrict importerが正規operationとして認識する。

### 5.3 reapply

`workflow/prototypes/YTK-F4/src/reapply.mjs`

- pending operationをdecodeして通常save pipelineへ渡す。
- deleteAllだけgeneration変更を例外的に許可する分岐が存在：
  `if(op.type!=='deleteAll' && resulting.generationId!==current.generationId)...`

つまり現実装はdeleteAll pendingの再適用まで明示的に対応している。

### 5.4 normal delete-all

`workflow/prototypes/YTK-F4/src/canonical.mjs`

`mutate(..., {type:'deleteAll'}, freshGeneration)`
はbaselineをfresh generationで生成する。

これはF2承認済み通常delete-all semanticsと整合するため、**normal delete-all実装自体を削除する理由はない。**

## 6. 不一致の原因

### 6.1 直接原因

F4 Stage2で
**「通常保存mutation typeの集合」と「emergency pendingとして安全に収録可能なoperation typeの集合」を同一の`TYPES`として扱ったこと。**

F2 normal saveではdelete-allが存在する。
しかしF3 pendingではR01-14によりdelete-allはunsupported。

この2つを同じallowlistへ統合したため、承認済み境界よりpending側が広がった。

### 6.2 文書上の原因

`BACKUP-FORMAT.md` はF3承認設計に基づく具体化を名乗りながら、

`category / overview / addService / service / completeService / deleteService / deleteCategory / deleteAll`

をpending operationTypeとして定義した。

しかしF3 R01-14との照合が行われず、その実装上の拡張がStage2/Stage3の開発テストPASSを経てbaseline化された。

### 6.3 Stage2/Stage3 PASSの意味

Stage2/Stage3の開発テストPASSは、
**実装した挙動がテストどおり動いたこと**を示す。

F3承認済み試験計画R01-14を変更する正式承認記録ではない。

したがってStage2/Stage3 PASSを
「deleteAll pendingが承認された」
根拠にはできない。

Stage4 reportがR01-14をREVIEW REQUIREDへ戻した判断は妥当。

## 7. 3つのdelete-allを分離した正式整理

| 場面 | 判定 | 根拠 |
|---|---|---|
| 通常のdelete-all保存 | **許可 / 承認済み** | F2 generation semantics、DEL-04〜06 |
| 保存失敗時にdeleteAll intentをemergency pendingへ収録 | **不可 / unsupported** | F3承認済みR01-14 |
| emergency restore後にdeleteAll pendingを再適用 | **不可** | そもそもvalid pendingへ収録不可。F3 R01-14、pending provenance設計 |

### normal delete-all失敗時

安全側の意味：

- transaction abortなら既存committed datasetを維持。
- delete-allが完了したと誤表示しない。
- delete-all intentをemergency pendingとして復元後に再実行することを約束しない。
- 利用者が後で改めてdelete-allを実行する。
- backup/emergency fileには既存committed datasetを保持できるが、「あとで全削除するpending」を入れない。

破壊的操作を復元後に自動/半自動で持ち越さないため、F3 R01-14と安全方向が一致する。

## 8. 既承認仕様を変えずに解消できるか

**YES。**

F2/F3承認済み仕様・F3試験計画の変更は不要。

必要なのはF4 implementation driftの是正。

### 最小変更案

将来、修正許可を受けた場合：

1. normal mutation allowlistとemergency pending allowlistを分離。
2. normal mutation側では`deleteAll`を維持。
3. pending allowlistから`deleteAll`を除外。
4. emergency captureでdeleteAll候補を`UNSUPPORTED_OPERATION`として収録対象外にする。
5. strict importで`pending.operations[].operationType === "deleteAll"`をreject。
6. reapply層でもdefense-in-depthでdeleteAll pendingをrejectし、generation-change special caseを不要化。
7. R01-14に対応する実装単体/統合テストを追加。
8. traceabilityのF3:R01-14を、修正・再レビュー後にREVIEW REQUIREDから正式なevidence mappingへ更新。

### 変更してはいけない部分

- `canonical.mjs`のnormal deleteAll semantics。
- F2 DEL-04〜06。
- delete-all成功時のfresh generation。
- delete-all後の旧tab generation mismatch。
- F3承認済みR01-14の期待値。
- F3 pending provenanceの基本設計。

## 9. 影響範囲候補

修正承認後に影響する可能性がある実装/開発資料：

- `workflow/prototypes/YTK-F4/src/backup.mjs`
  - pending-safe operation allowlist分離。
- `workflow/prototypes/YTK-F4/src/import-backup.mjs`
  - pending deleteAll reject。
- `workflow/prototypes/YTK-F4/src/reapply.mjs`
  - deleteAll pending reject / special-case除去候補。
- `workflow/prototypes/YTK-F4/BACKUP-FORMAT.md`
  - pending operationType allowlist修正。
- F4開発用test群
  - R01-14対応fixture追加。
- `F5-F6-TRACEABILITY.*`
  - 修正後のevidence status更新。

**承認済みF2/F3設計書・承認済みF3試験計画は変更対象外。**

## 10. 代替案と承認境界

もし製品要件として
「保存失敗したdelete-all intentを緊急fileへ持ち越し、復元後に再適用したい」
のであれば、それは現F3 R01-14と衝突する。

その場合は単なるbug fixではなく：

- F3 pending operation規範変更
- F3 R01-14変更
- generation変更operationを含むreapply provenance再設計
- F5/F6追加
- 制作管理室再審査
- 人間のF3変更承認

が必要。

本照合ではその仕様変更を推奨しない。
最小・安全な解消は**deleteAllをpending unsupportedへ戻す**こと。

## 11. 自己判定

- F2 compatibility：**MAINTAINED**
- F3 compatibility：現F4実装に**1件のdriftあり**
- R01-14：**承認済み期待値を維持すべき**
- 既承認仕様変更：**不要**
- 製品コード修正：**必要だが本段階では未実施**
- 承認済み試験計画修正：**不要**
- F5/F6正式試験：**NOT STARTED**
- 本番公開：**NOT AUTHORIZED**
- R005：**FROZEN**

## 12. 停止点

本報告のみGitHubへ提出し、制作管理室の再レビュー待ちで停止する。

本commitでは以下を行わない。

- product code変更
- F2/F3承認済み仕様変更
- F3承認済み試験計画変更
- F5/F6正式試験開始
- 本番公開
- R005凍結解除
