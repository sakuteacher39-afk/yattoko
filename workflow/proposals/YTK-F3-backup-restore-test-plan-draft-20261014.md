# YTK-F3｜バックアップ・緊急退避・復元 F5/F6試験計画案 v0.2

- 起案：2026-10-14
- 正式レビュー差戻し対応：2026-10-14
- 状態：**REVISED DRAFT / NOT RUN / NOT APPROVED**
- 対応設計：workflow/proposals/YTK-F3-backup-restore-design-draft-20261014.md
- 正式レビュー：workflow/reviews/YTK-F3-backup-restore-formal-review-20261014.md（commit 597c8ab531f2bd68990f1e652696c1ba34f665d7）
- F2正式承認：workflow/reviews/YTK-F2-human-approval-20261014.md
- 全チェック欄は未実施。試験計画の追加をPASS扱いしない。

## 1. 判定規則

- PASS：期待結果をassert/実測で満たした。
- FAIL：1つでも期待と不一致。
- NOT RUN：未実施。
- NOT VERIFIABLE：必要な観測手段がなく安全判定不能。
- F5 PASSとF6 PASSとF3人間承認は別判定。
- destructive testは専用fixtureで行い、実利用データを使わない。
- 秘密情報・実アカウントID・PW/PIN/OTP等をfixtureへ入れない。

## 2. F5｜F3-R01 emergency pending完全性

### R01-A：pending state / dependency

- [ ] R01-01 confirmed-pending 1件をcapture candidateとして認識。
  - 期待：committedへ混ぜずpending operationになる。
- [ ] R01-02 dependent-pending chain（service create→usage→answer）をordinal順で保持。
  - 期待：dependsOnOperationIdsが先行operationを指し、並替なし。
- [ ] R01-03 current UI draftがF2 validator合格。
  - 期待：canonical candidateとしてのみcapture可能。
- [ ] R01-04 current UI draftがinvalid/secret-like。
  - 期待：fileへ入れずomittedCountに加算、画面値はclearしない。
- [ ] R01-05 dependency missing。
  - 期待：component全体をpending export対象外。独立componentへ影響なし。
- [ ] R01-06 dependency cycle。
  - 期待：component全体reject。自動並替/修復なし。
- [ ] R01-07 conditional childがparent expected stateと不整合。
  - 期待：component reject。
- [ ] R01-08 service identity pendingに依存する後続3操作の1つがinvalid。
  - 期待：identityを含む同dependency component全体を除外。
- [ ] R01-09 独立した2componentの片方だけinvalid。
  - 期待：valid componentだけpartial capture、captureStatus=partial。
- [ ] R01-10 captureStatus=partial時candidate/exported/omitted件数が一致。
- [ ] R01-11 omittedScopesに値本文を含めずcategory/target/type/range/reasonだけ。
- [ ] R01-12 operation ID重複。
  - 期待：pending validator reject。
- [ ] R01-13 ordinal重複/逆行。
  - 期待：reject。
- [ ] R01-14 unsupported operation（delete-all/restore等）をpendingへ入れる。
  - 期待：reject。

### R01-B：base conflict / 別tab

- [ ] R01-15 capture開始後readonly snapshotのgeneration/globalとpending baseが一致。
- [ ] R01-16 別tabがglobalRevision更新済み。
  - 期待：古いbaseのcomponentをBASE_CONFLICTで退避不可。
- [ ] R01-17 generationが変わった。
  - 期待：全古いpending componentを自動rebaseしない。
- [ ] R01-18 target recordRevisionだけ変化。
  - 期待：対象componentを退避不可。
- [ ] R01-19 baseSnapshotChecksumSha256不一致。
  - 期待：pending自動適用/「完全退避」表示なし。
- [ ] R01-20 baseContentFingerprint不一致。
  - 期待：pending-only recovery候補にしない。

### R01-C：cap / download failure / UI保持

- [ ] R01-21 pending 999,999 bytes。
- [ ] R01-22 pending 1,000,000 bytes。
- [ ] R01-23 pending 1,000,001 bytes。
  - 期待：無断truncateせずcaptureStatus=noneまたは明示partial rule。画面値保持。
- [ ] R01-24 operations 255件。
- [ ] R01-25 operations 256件。
- [ ] R01-26 operations 257件。
  - 期待：無断truncateなし。candidate/exported/omitted表示。
- [ ] R01-27 Blob生成失敗。
  - 期待：緊急退避成功表示なし、画面値保持。
- [ ] R01-28 object URL/download起動失敗。
  - 期待：成功表示なし、画面値保持。
- [ ] R01-29 downloadが開始できたが物理保存確認不能。
  - 期待：「保存先を確認」表示。救済完了と断定しない。
- [ ] R01-30 retry後も元画面の未保存回答が残る。
- [ ] R01-31 file作成失敗後のnavigation warning。
  - 期待：「画面を閉じない」旨を表示、beforeunloadだけに依存しない。

## 3. F5｜F3-R02 JSON / checksum / parser

### R02-A：raw / duplicate key / canonical

- [ ] R02-01 UTF-8 valid / BOMなし canonical input。
- [ ] R02-02 UTF-8 BOM付き拒否。
- [ ] R02-03 invalid UTF-8 byte sequenceをfatal reject。
- [ ] R02-04 root duplicate same key same value。
  - 期待：lexical reject。
- [ ] R02-05 root duplicate same key different value。
  - 期待：lexical reject。
- [ ] R02-06 nested answers duplicate key。
  - 期待：lexical reject。
- [ ] R02-07 "kind" と escaped equivalent key。
  - 期待：decoded-name duplicate reject。
- [ ] R02-08 root key並替。
  - 期待：canonical raw mismatch reject。
- [ ] R02-09 余分な空白/newline。
  - 期待：canonical raw mismatch reject。
- [ ] R02-10 unnecessary unicode escape / slash escape。
  - 期待：canonical raw mismatch reject。
- [ ] R02-11 unknown root key。
- [ ] R02-12 unknown nested snapshot key。
- [ ] R02-13 unexpected answers nested object。
  - 期待：strict reject。

### R02-B：number / Unicode

- [ ] R02-14 fileFormatVersion 1e0拒否。
- [ ] R02-15 revision -0拒否。
- [ ] R02-16 leading zero数値拒否。
- [ ] R02-17 decimal 1.0拒否。
- [ ] R02-18 Number.MAX_SAFE_INTEGER超過拒否。
- [ ] R02-19 escaped lone high surrogate拒否。
- [ ] R02-20 escaped lone low surrogate拒否。
- [ ] R02-21 F2 NFC必須fieldがnon-NFC。
  - 期待：normalizeせずreject。
- [ ] R02-22 F2 control/bidi rejectをimportでも同一適用。

### R02-C：checksum

- [ ] R02-23 DIGEST-01 expected SHAが15ef7730c4760d29e3c2ea43866783cf23c7d1f50d15db09acaa8ee353e0904d。
- [ ] R02-24 body 1 byte変更/checksum据置。
  - 期待：checksum reject。
- [ ] R02-25 body+checksumを攻撃者が再生成したがschema unknown fieldあり。
  - 期待：checksum一致でもsemantic reject。
- [ ] R02-26 checksum algorithm未知。
  - 期待：reject。
- [ ] R02-27 checksum hex uppercase/長さ63/65/非hex。
  - 期待：reject。
- [ ] R02-28 SHA API failure。
  - 期待：export/import成功扱いしない。
- [ ] R02-29 checksum検証前後でparsed objectを書換えない。
- [ ] R02-30 full canonical rawとdigest canonical payloadがschema-defined orderを共有。

### R02-D：規範file vectors

- [ ] R02-31 ACTIVE registryからV-VALID-01を生成しpreview accept。
- [ ] R02-32 V-DUP-01 reject。
- [ ] R02-33 V-DUP-02 reject。
- [ ] R02-34 V-ORDER-01 reject。
- [ ] R02-35 V-NUM-01 / V-NUM-02 reject。
- [ ] R02-36 V-UNK-01 reject。
- [ ] R02-37 V-UTF-01 / V-BOM-01 reject。
- [ ] R02-38 V-HASH-01 reject。
- [ ] R02-39 V-HASH-02 checksum一致でもreject。
- [ ] R02-40 V-TRUNC-01 reject。

## 4. F5｜F3-R03 atomic restore / conflict / corrupt current

### R03-A：current state classification

- [ ] R03-01 valid dataset→VALID。
- [ ] R03-02 metaなし・recordsなし→EMPTY。
- [ ] R03-03 meta invalidだがraw all stores比較可能→CORRUPT_COMPARABLE。
- [ ] R03-04 raw read/比較不能→CORRUPT_UNCOMPARABLE。
  - 期待：in-app restore blocked。
- [ ] R03-05 一部record存在/metaなしをEMPTY扱いしない。
- [ ] R03-06 CORRUPT_COMPARABLEで通常backup成功と誤表示しない。
- [ ] R03-07 corrupt復旧は二段階明示確認なしでcommitしない。

### R03-B：preview conflict

- [ ] R03-08 preview後別tab normal edit。
  - 期待：guard mismatch→abort→再preview要求。
- [ ] R03-09 preview後delete-all。
- [ ] R03-10 preview後別restore。
- [ ] R03-11 corrupt raw-state preview後raw content変化。
  - 期待：abort。
- [ ] R03-12 EMPTY preview後別tabがdataset作成。
  - 期待：empty guard mismatch→abort。
- [ ] R03-13 guard mismatchで自動再確認→即commitしない。

### R03-C：prospective capacity / transaction

- [ ] R03-14 new generation/meta込み9,999,999 bytes。
- [ ] R03-15 exactly10,000,000 bytes accept candidate。
- [ ] R03-16 10,000,001 bytes reject before clear。
- [ ] R03-17 precompute bytesとtransaction内re-serialize bytes一致。
- [ ] R03-18 precompute digestとtransaction内candidate digest一致。
- [ ] R03-19 clear後最初のput failure→abort、旧全件維持。
- [ ] R03-20 category put途中failure→abort、旧全件維持。
- [ ] R03-21 service put途中failure→abort、旧全件維持。
- [ ] R03-22 final meta write failure→abort、旧全件維持。
- [ ] R03-23 quota exception→abort、旧全件維持。
- [ ] R03-24 read-back canonical mismatch→abort、旧全件維持。
- [ ] R03-25 transaction request単体successでは復元成功表示しない。
- [ ] R03-26 transaction complete後のみ成功表示。

### R03-D：generation / revisions / old tab

- [ ] R03-27 restore successでnew generationId。
- [ ] R03-28 new generation globalRevision=1。
- [ ] R03-29 imported record revisionsを保持。
- [ ] R03-30 restore後旧tab save→generation mismatch拒否。
- [ ] R03-31 BroadcastChannel通知を落としても旧tab save拒否。
- [ ] R03-32 recordId collisionはfile strict validation段階でreject。
- [ ] R03-33 restore後のF2 canonical 10MB再計測がtransaction read-backと一致。

## 5. F5｜F3-R04 capacity / resource exhaustion

### R04-A：raw boundary

- [ ] R04-01 raw 15,999,999 bytes。
- [ ] R04-02 raw 16,000,000 bytes。
- [ ] R04-03 raw 16,000,001 bytesを内容read/parse前拒否。
- [ ] R04-04 pending 999,999 / 1,000,000 / 1,000,001 bytes。
- [ ] R04-05 pending 255 / 256 / 257 operations。
- [ ] R04-06 depth16 / depth17。
- [ ] R04-07 huge single stringをfield-specific scannerでparse前拒否。
- [ ] R04-08 huge key countをschema path count超過でparse前拒否。
- [ ] R04-09 categories array >12をreject。
- [ ] R04-10 ACTIVE registry理論最大service count超過をparse前reject。

### R04-B：candidate cap rationale

- [ ] R04-11 1MB/256件が不足するscenario（長時間save failure）をfixture化し未退避表示を確認。
- [ ] R04-12 1MB/256件が過剰なscenarioでvalidation時間を計測。
- [ ] R04-13 raw16MBでduplicate scannerが別巨大ASTを作らない。
- [ ] R04-14 parse failure後も既存IDB不変。
- [ ] R04-15 resource errorをapp 10MB超と誤分類しない。

## 6. F5｜F3-R05 pending reapply lifecycle

### R05-A：restore後状態

- [ ] R05-01 emergency snapshot restore後pendingはIDB正本に入らない。
- [ ] R05-02 SNAPSHOT_RESTORED_PENDING_AVAILABLEで未適用件数を表示。
- [ ] R05-03 manual confirmなしでpending commitなし。
- [ ] R05-04 reloadでin-memory pending review stateが消えてもcommitted snapshotは維持。
- [ ] R05-05 reload後、同じemergency file再選択導線を表示可能。
- [ ] R05-06 browser restart後も同じfile再選択からpending recovery可能。
- [ ] R05-07 fileが無い場合、pending復旧可能と誤保証しない。

### R05-B：pending-only recovery / double apply

- [ ] R05-08 current content fingerprintがrestored snapshot expected fingerprintと一致。
  - 期待：full replaceを繰返さずpending-only review候補。
- [ ] R05-09 operation current==expected-before。
  - 期待：手動確認後のみF2 save gateで適用。
- [ ] R05-10 current==intended-after。
  - 期待：already-applied、再commit/revision増加なし。
- [ ] R05-11 currentがbefore/afterどちらでもない。
  - 期待：conflict、silent applyなし。
- [ ] R05-12 二重tap。
  - 期待：同operationを二重commitしない。
- [ ] R05-13 同じemergency file二回import。
  - 期待：already-applied判定で重複適用防止。
- [ ] R05-14 service create operation再実行時、同recordId exact matchならalready-applied、内容差ならconflict。
- [ ] R05-15 deleted targetへupdate pending。
  - 期待：別recordへmappingせずconflict。

### R05-C：partial application

- [ ] R05-16 dependency chain op1成功/op2失敗。
  - 期待：op1 committed維持、op2以降remaining表示。
- [ ] R05-17 retryでop1再commitなし。
- [ ] R05-18 10MB超で途中停止。
- [ ] R05-19 generation conflictで途中停止。
- [ ] R05-20 parent R001 conflictでF2通常save gate停止。
- [ ] R05-21 remaining/conflicted/already-applied件数が正確。
- [ ] R05-22 pendingをoperation順と異なる順で適用しない。
- [ ] R05-23 completion opはusageStatus等R08 invariantを再検証。
- [ ] R05-24 R09 parent fallbackは保存せず再計算。

## 7. F5｜F3-R06 privacy

- [ ] R06-01 export前に「暗号化されていない」を表示。
- [ ] R06-02 service名/利用状況/本人意向が読める可能性を説明。
- [ ] R06-03 共有PC/共有folderの閲覧リスクを説明。
- [ ] R06-04 iCloud Drive等OS設定による同期可能性を説明。
- [ ] R06-05 ヤットコがfileを自動uploadしないと説明。
- [ ] R06-06 SHA-256が暗号化/作成者証明でないと説明。
- [ ] R06-07 暗号化機能を勝手に追加していない。
- [ ] R06-08 filenameにサービス名・回答値なし。
- [ ] R06-09 analytics/APM/crash log/session replay/networkにfile/snapshot/pending本文0。
- [ ] R06-10 console logにも本文を出さない。

## 8. F5｜F3-R07 F2 authoritative connection / version registry

- [ ] R07-01 categoryKey 12種がF2承認値とexact match。
- [ ] R07-02 categories canonical orderがF2と一致。
- [ ] R07-03 R07初回intention ruleをimport/restore後も維持。
- [ ] R07-04 R08 completed invariantをimport/restoreで維持。
- [ ] R07-05 R09 unanswered parent fallbackをsnapshotへ複写せず表示時再計算。
- [ ] R07-06 inactive conditional fieldをreject。
- [ ] R07-07 active conditional unansweredを保持。
- [ ] R07-08 normal snapshot / emergency snapshot / prospective restoreで同一F2 canonical capacity serializer。
- [ ] R07-09 ACTIVE registryなしではproduction export/importを有効化しない。
- [ ] R07-10 unknown schemaVersion reject。
- [ ] R07-11 unknown questionSchemaVersion reject。
- [ ] R07-12 unregistered pair reject。
- [ ] R07-13 invalid recordId grammar reject（ACTIVE registry binding後）。
- [ ] R07-14 invalid generationId grammar reject（ACTIVE registry binding後）。
- [ ] R07-15 version registry bindingがF2 semanticsを変える場合はF3内で黙って採用しない。

## 9. F5｜normal backup regression

- [ ] N-01 dataset未作成なら空backup成功表示なし。
- [ ] N-02 R001 unanswered/unknownを区別して保持。
- [ ] N-03 R002 partial/completed双方を含む。
- [ ] N-04 pending/UI history/mutationSeq/inheritedIntentionを含めない。
- [ ] N-05 same readonly transactionのsnapshot。
- [ ] N-06 exportでgeneration/revisions不変。
- [ ] N-07 download開始と物理保存完了表示を区別。
- [ ] N-08 normal backup時に未保存画面入力があれば「含まれない」表示。
- [ ] N-09 normal file kind=normal / pending=null。
- [ ] N-10 external transmission zero。

## 10. F6｜PC Chrome

- [ ] PC-01 normal backup→Chrome完全終了→restore、R001/R002状態一致。
- [ ] PC-02 committed partial+completed混在fileを新profileへrestore。
- [ ] PC-03 R09 fallbackをrestore後再構成。
- [ ] PC-04 existing VALID dataでpreview/cancel/replace/old-tab reject。
- [ ] PC-05 CORRUPT_COMPARABLE fixtureで二段階確認→guard一致時だけrestore。
- [ ] PC-06 CORRUPT_UNCOMPARABLE fixtureでrestore blocked。
- [ ] PC-07 preview後別tab edit→restore abort。
- [ ] PC-08 clear後put途中の人工failure→旧正本全件維持。
- [ ] PC-09 final meta write人工failure→旧正本全件維持。
- [ ] PC-10 quota exception→旧正本維持。
- [ ] PC-11 emergency full capture→file→snapshot restore→manual pending reapply。
- [ ] PC-12 emergency partial captureで未退避件数/範囲を表示。
- [ ] PC-13 emergency download failureで画面回答保持・成功表示なし。
- [ ] PC-14 snapshot restore後reload→同file再選択→pending-only recovery。
- [ ] PC-15 一部pending適用→browser restart→同file再取込→already-appliedを二重commitしない。
- [ ] PC-16 invalid duplicate-key/escape-equivalent/key reorder/exponent fileを拒否。
- [ ] PC-17 plaintext warningを確認。
- [ ] PC-18 network/DevToolsでsnapshot/pending外部送信0。
- [ ] PC-19 16MB/1MB/256候補boundaryで安全失敗または計画どおり処理。
- [ ] PC-20 physical download existenceを人間確認し、UIが完了保証していないことを確認。

## 11. F6｜iPhone Safari通常

### IOS-A：normal / restore

- [ ] IOS-01 normal backupをFiles等へ保存し、物理fileを人間確認。
- [ ] IOS-02 iPhone file pickerからnormal restore。
- [ ] IOS-03 PC→iPhone / iPhone→PC双方向restore。
- [ ] IOS-04 Safari終了→再起動後もrestored committed state保持。
- [ ] IOS-05 R09 derived fallbackを再構成。
- [ ] IOS-06 preview cancelで既存data不変。
- [ ] IOS-07 old tab / duplicate tab generation guard。

### IOS-B：emergency / pending

- [ ] IOS-08 save failure fixture→emergency full capture→file保存。
- [ ] IOS-09 partial invalid dependency→partial/none表示と未退避件数。
- [ ] IOS-10 emergency download cancel/failure→画面回答保持。
- [ ] IOS-11 emergency snapshot restore後pendingをsilent commitしない。
- [ ] IOS-12 restore後reload→同file再選択→pending-only review。
- [ ] IOS-13 Safari終了→再起動→同file再選択→pending recovery。
- [ ] IOS-14 二重tap/二回importでduplicate commitなし。
- [ ] IOS-15 partial reapply failure後remaining件数を保持/再取込可能。
- [ ] IOS-16 app background→foregroundで誤auto commitなし。

### IOS-C：performance / memory

各caseをforegroundで5回。

- [ ] IOS-PERF-01 raw 16,000,000 bytes candidate preflight 5回。
- [ ] IOS-PERF-02 snapshot 10,000,000 bytes near-limit validation 5回。
- [ ] IOS-PERF-03 pending 1,000,000 bytes / 256 operations emergency validation 5回。
- [ ] IOS-PERF-04 File read時間を記録。
- [ ] IOS-PERF-05 fatal decode時間を記録。
- [ ] IOS-PERF-06 lexical scan時間を記録。
- [ ] IOS-PERF-07 JSON.parse時間を記録。
- [ ] IOS-PERF-08 canonical serialize時間を記録。
- [ ] IOS-PERF-09 SHA-256時間を記録。
- [ ] IOS-PERF-10 semantic validation時間を記録。
- [ ] IOS-PERF-11 total preflight時間を記録。
- [ ] IOS-PERF-12 100ms heartbeatの最大foreground gapを記録。
- [ ] IOS-PERF-13 5/5 crash/OS kill/unexpected reloadなし。
- [ ] IOS-PERF-14 5/5既存IndexedDB mutationなし。
- [ ] IOS-PERF-15 max heartbeat gap <=2,000ms。
- [ ] IOS-PERF-16 total preflight <=15,000ms。
- [ ] IOS-PERF-17 Web Inspector/Instrumentsでpeak memory / resident deltaを記録。
- [ ] IOS-PERF-18 memory測定不能なら16MB安全性をNOT VERIFIABLEとしPASSにしない。
- [ ] IOS-PERF-19 memory warning/white screen/page killが1回でもあればFAIL。
- [ ] IOS-PERF-20 FAIL時はcap引下げ案を作り、上限引上げはしない。

### IOS-D：file privacy / picker edge

- [ ] IOS-21 iCloud Drive等の同期可能性注意文を確認。
- [ ] IOS-22 file pickerから戻る/キャンセルでdata mutationなし。
- [ ] IOS-23 画面回転/別app往復後にrestoreが二重実行されない。
- [ ] IOS-24 private modeはF2注意を維持し専用blockを追加しない。
- [ ] IOS-25 long-term natural evictionを短期restore成功と混同しない。

## 12. F6｜iPhone Safari private

- [ ] PRIV-01 F2既承認のprivate mode注意表示。
- [ ] PRIV-02 normal backup file作成可否。
- [ ] PRIV-03 restore file選択可否。
- [ ] PRIV-04 IndexedDB failure時のemergency導線。
- [ ] PRIV-05 file保存失敗時に成功表示しない。
- [ ] PRIV-06 private mode専用detector/blockを追加しない。
- [ ] PRIV-07 session終了後の保持挙動を観測し、長期保証しない。

## 13. 人間判断へ渡す測定結果

F6後、次を数値で提出する。

- iPhone model / iOS / Safari version。
- 16MB case total時間、最大heartbeat gap、peak memory evidence。
- 10MB snapshot case同値。
- 1MB/256 pending case同値。
- crash/reload/memory warning回数。
- file save/restore成功率。
- pending cap不足scenario件数。
- cap引下げ推奨の有無。

16MB / 1MB / 256を**測定前に安全と認定しない**。

## 14. 試験計画対応表

| Review | 主試験 |
|---|---|
| F3-R01 | R01-01〜31、PC-11〜15、IOS-08〜16 |
| F3-R02 | R02-01〜40、PC-16 |
| F3-R03 | R03-01〜33、PC-04〜10 |
| F3-R04 | R04-01〜15、IOS-PERF-01〜20 |
| F3-R05 | R05-01〜24、PC-14〜15、IOS-11〜16 |
| F3-R06 | R06-01〜10、PC-17〜18、IOS-21 |
| F3-R07 | R07-01〜15、N-01〜10、IOS-05 |

## 15. 停止条件

- 本文は試験計画のみ。
- F5：NOT RUN。
- F6：NOT RUN。
- F3：NOT APPROVED。
- F4：NOT AUTHORIZED。
- 本番公開：NOT AUTHORIZED。
- R005：FROZEN。

制作管理室再レビューと人間判断前に実試験PASSを宣言しない。
