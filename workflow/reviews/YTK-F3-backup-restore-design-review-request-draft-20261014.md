# YTK-F3｜バックアップ・緊急退避・復元 詳細設計 正式再々レビュー依頼

制作管理室 御中

2026-10-14付正式再レビュー
workflow/reviews/YTK-F3-backup-restore-formal-rereview-20261014.md
（commit 06c1b7617c947e70fccd4cc7a22082cd19def3c7）
でCHANGES_REQUIREDとなったF3-R03-A / F3-R05-Aについて、既存3成果物を更新しました。

前回RESOLVEDとなったF3-R01 / R02 / R04 / R06 / R07は変更・後退させていません。

本再提出は**F3全体の自己承認ではありません**。
F5/F6は未実施であり、安全性試験PASSも宣言しません。
F2人間承認は維持し、F2の意味変更は行っていません。

## 再提出3成果物

1. workflow/proposals/YTK-F3-backup-restore-design-draft-20261014.md
2. workflow/proposals/YTK-F3-backup-restore-test-plan-draft-20261014.md
3. workflow/reviews/YTK-F3-backup-restore-design-review-request-draft-20261014.md

## F3-R01〜R07対応

### F3-R01｜emergency pending完全性

- 未保存状態をconfirmed-pending / dependent-pending / current UI draftに分離。
- operationId / ordinal / target / base generation/global/record revision / dependencies / canonical valueを規範化。
- dependency graphのcycle・missing dependency・conditional不整合をfail closed。
- dependency component単位all-or-nothing capture。独立componentのみpartial capture可。
- candidateCount / exportedCount / omittedCount / omittedScopes / reasonCodeをcapture summaryへ記録。
- 未退避件数と範囲を利用者へ表示。
- 1MB / 256件超過で無断truncateしない。
- validation / checksum / Blob / download failureでも元画面の未保存回答をclearしない。
- file作成開始だけで「救済成功」「保存完了」と表示しない。
- 別tabでbaseが変わったpendingを新snapshotへ自動rebaseしない。

### F3-R02｜JSON / checksum

- duplicate keyはJSON.parse前のlexical scannerでdecoded property nameをobject scopeごとに検査。
- "kind" と escaped-equivalent keyもduplicateとして拒否。
- raw UTF-8 fatal decode、BOM拒否、unpaired surrogate拒否。
- number tokenは非負canonical integerだけ。指数、小数、-0、leading zeroを拒否。
- unknown root/nested field、required field欠落、unexpected objectをstrict reject。
- schema-defined canonical full JSONとraw textのbyte-for-byte一致を要求し、key reorder/whitespace/noncanonical escapeを拒否。
- SHA-256対象をchecksum以外のroot6 fieldsへ固定。
- checksum一致後もF2 semantic validatorを必須化。
- DIGEST-01のexpected SHAとnormal/corrupt/malicious vector群を追加。
- SHA-256を真正性・暗号化・作成者証明として扱わない。

### F3-R03-A｜transaction原子性 / 同期readback

- preflightとreadwrite transaction内検証を明確分離。
- File decode、strict validation、SHA-256、prospective dataset、expectedCanonicalBytes、10MB判定はtransaction開始前に完了。
- transaction callbackはasync禁止。await / Promise / Web Crypto / File/Blob async read / timer / UI待機を入れない。
- transaction内はIndexedDB request callback chainのみ。
- GUARD→CLEAR→PUT→READBACKの各phaseで、最後のsuccess callbackがreturnする前に次phase requestをenqueue。
- readbackはF2 canonical serializer + TextEncoderによる同期canonical bytesを生成。
- expectedCanonicalBytesとbyteLength/全byteを同期比較し、10MB、generation/global/record count/revisionも検証。
- readback不一致はcallback内transaction.abort。
- readbackVerified=true後にrequestが尽きることを許し、その後の正常auto-commitを意図した完了とする。
- oncompleteはreadbackVerified=trueの場合だけ成功。premature oncompleteは実装不備。
- clear後/put途中/meta failure/readback mismatch/TransactionInactiveError/quotaで旧正本維持を試験。

### F3-R04｜16MB / 1MB / 256件と性能

- 16MBは「10MB committed + envelope + pendingの余裕」のprovisional候補でありSafari安全値とは扱わない。
- 1MBはcommitted capの10%候補、256件はdependency validation上限候補として理由を明記。
- raw/depth/schema path/member/string/service countのparse前guardを設計。
- iPhone SafariでFile read / decode / lexical scan / JSON.parse / serialize / SHA / semantic validation / total / heartbeat / peak memoryを測定。
- candidate limitはforeground 5連続、crash/kill/reloadなし、既存IDB mutationなし、heartbeat gap<=2s、preflight<=15sを暫定functional gateとする。
- peak memoryを観測できなければ16MB安全性はNOT VERIFIABLEとしてPASSにしない。
- FAILならcap引下げ→再試験。測定前に安全値と断定しない。

### F3-R05-A｜pending provenance / double apply

- content fingerprint一致だけのpending-only recoveryを廃止。
- validated file checksumからsourceFileIdを導出し、snapshot restore complete後にtab-local ReapplyContextを生成。
- ReapplyContextはsourceFileId / sourceSnapshotGenerationId / restoredGenerationId / lastKnownGlobalRevision / orderedOperationIds / APPLIED receiptMapを保持。
- operation receiptはF2 save transaction complete後だけmemoryへ作成。
- safe already-appliedは、sourceFileId・restoredGenerationId・current globalRevision・operationId receipt・dependency orderがすべて一致する同一session内だけ。
- current==intended-after、same recordId、same contentだけではalready-appliedにしない。
- receiptなしでintended-after一致はAMBIGUOUS_SAME_VALUEとして自動skip/auto applyせず利用者確認。
- 別tab更新はglobalRevision差でcontext invalid。
- browser reload/restartでmemory receiptが失われた場合、同じfileでも自動適用/skipしない。
- persistent sourceFileId/operationId ledgerは現行F2 schemaへ追加していない。
- restart跨ぎautomatic exactly-once resumeを将来必須にする場合はF2変更・人間別承認が必要と明記。
- 異世代同内容、未適用なのに同値、途中適用、二重取込、別tab、restartをF5/F6へ追加。

### F3-R06｜plaintext file privacy

書出し前文案を追加：

「このバックアップファイルは暗号化されていません。整理したサービス名・利用状況・本人意向などを、ファイルを開ける人が読めます。共有端末や共有フォルダへの保存、不要な共有は避けてください。保存先によってはiCloud Driveなどへ自動同期されることがあります。ヤットコがこのファイルを自動でアップロードすることはありません。」

SHA-256が内容を隠さず作成者も証明しない補足も追加。

暗号化・cloud uploadは追加していません。

### F3-R07｜F2 authoritative connection

- categoryKey 12種、R07/R08/R09、conditional presence、10MB canonical capacityをF2承認設計から直接固定参照。
- normal snapshot / emergency snapshot / restore prospective datasetは同じF2 canonical capacity serializerを使う。
- F2が具体値を未確定のschemaVersion / questionSchemaVersion / recordId grammar / generationId grammarは勝手に1/UUID等へ固定しない。
- version registryにUNBOUND / BLOCKINGとして明示。
- ACTIVE registry rowがない状態でproduction export/importを有効化しない。
- F4開始前に具体bindingを人間確認する。
- bindingがF2の意味変更を要求する場合はF2変更として人間へ差戻す。

## 試験計画追加

F5：
- R01-01〜31
- R02-01〜40
- R03-01〜33
- R04-01〜15
- R05-01〜24
- R06-01〜10
- R07-01〜15
- normal backup regression

F6：
- PC Chrome 20項目
- iPhone Safari通常 normal / emergency / reapply / restart
- iPhone Safari performance/memory IOS-PERF-01〜20
- iPhone Safari private
- 双方向file restore、corrupt existing、restore途中abort、preview conflict、double importを含む

すべて**PLAN ONLY / NOT RUN**。

## 前回設計から変更していない境界

- F2人間APPROVED。
- committed limit 10,000,000 bytes。
- IndexedDB。
- normal backupのcommitted partial/completed/unanswered対象。
- pending別領域。
- full replace候補。
- silent merge禁止。
- pending silent commit禁止。
- R005 FROZEN。
- 認証・cloud保存なし。
- 外部送信なし。
- 本番公開なし。

## 人間判断として残す事項

1. plaintext JSONをv1で採用するか。
2. restoreをfull replace onlyとするか。
3. F6実測後、raw 16,000,000 / pending 1,000,000 / 256 operationsを維持するか引下げるか。
4. fileFormatVersion=1の正式採用。
5. ACTIVE version registryのschemaVersion / questionSchemaVersion / recordId / generationId具体binding。

F2意味変更が必要ならF3内で独断変更しない。

## 再レビューで確認してほしい事項

1. R03-Aでpreflightのasync処理とtransaction内同期処理が十分分離されたか。
2. IndexedDB request-chainがpremature auto-commit / TransactionInactiveErrorを避ける実装可能な規範になっているか。
3. readback canonical bytes同期比較とtransaction abortで途中失敗時の旧正本を守れるか。
4. R05-AでsourceFileId / restoredGenerationId / operationId receiptのprovenanceが一意か。
5. current==intended-afterやsame contentだけでalready-appliedにしていないか。
6. reload/restartでprovenanceを証明できない場合に自動適用/skipをせずfail closedになっているか。
7. restart跨ぎautomatic exactly-onceのためのpersistent ledgerをF2へ無断追加していないか。
8. R01/R02/R04/R06/R07 RESOLVED仕様を後退させていないか。
9. 追加F5/F6がtransaction inactive・auto-commit・readback mismatch・途中abort・異世代同内容・未適用同値・partial apply・double import・別tab・restartを網羅したか。

## 希望判定形式

- F3-R03-A：RESOLVED / CHANGES_REQUIRED
- F3-R05-A：RESOLVED / CHANGES_REQUIRED
- F3-R01/R02/R04/R06/R07 regression：MAINTAINED / REGRESSED
- F2 approved constraints：MAINTAINED / REGRESSED
- F5 plan：SUFFICIENT / CHANGES_REQUIRED / NOT RUN
- F6 plan：SUFFICIENT / CHANGES_REQUIRED / NOT RUN
- F3 design：DESIGN REVIEW PASS / CHANGES_REQUIRED / HUMAN APPROVAL PENDING
- Human decision：REQUIRED / NOT REQUIRED

## 停止位置

制作管理室の正式再レビュー完了まで停止。

禁止：
- F3全体自己承認
- F4実装
- F5/F6未実施試験のPASS扱い
- 本番公開
- R005凍結解除
- 認証・cloud保存再開
