# YTK-F3｜バックアップ・緊急退避・復元 詳細設計案 v0.2

- 起案：2026-10-14
- 正式レビュー差戻し対応：2026-10-14
- 状態：**REVISED DRAFT / FORMAL RE-REVIEW PENDING / NOT APPROVED / NO IMPLEMENTATION**
- 対象：端末保存型無料版。外部通信・ログイン・サーバー保存なし。
- F2正本：workflow/reviews/YTK-F2-human-approval-20261014.md（commit 263efbf030693efb5d8071fcba6f93e4970971b1）
- F2承認対象設計：workflow/proposals/YTK-F2-storage-safety-revision-20261013.md（commit 0d5dfa387f924e5dc3dc9196b9f236986c910281）
- F3初回設計commit：b1a6f6a08d21f677eab0450b9d620df960c412be
- F3正式レビュー：workflow/reviews/YTK-F3-backup-restore-formal-review-20261014.md（commit 597c8ab531f2bd68990f1e652696c1ba34f665d7）
- 本書はF3-R01〜R07差戻し対応案であり、F3全体承認・F4実装・F5/F6試験PASS・本番公開・R005凍結解除を行わない。

## 1. 不変条件

F2で人間承認された以下を変更しない。

- IndexedDBのcommitted dataset上限は10,000,000 UTF-8 bytes。
- normal backupはtransaction complete済みのcommitted datasetを対象とし、R001 unanswered、R002 partial/completedを含む。
- normal backupにpending overlayを含めない。
- emergency exportだけがpendingを別領域へ持てる。pendingをcommittedへ混ぜない。
- restoreはstrict validation後のatomic full replace。silent mergeをしない。
- pendingのsilent commitをしない。
- R07、R08、R09、category mapping、条件付き回答presence、秘密情報禁止、外部送信禁止を維持する。
- R005はFROZENのまま。

## 2. 共通ファイル形式

### 2.1 ファイルと媒体

- 通常ファイル名：yattoko-backup-YYYYMMDD-HHMMSS-XXXXXXXX.json
- 緊急ファイル名：yattoko-emergency-YYYYMMDD-HHMMSS-XXXXXXXX.json
- UTF-8、BOMなし、非圧縮単一JSON。
- MIMEや拡張子は信用せず、raw bytesと内容を検査する。
- ZIP/GZIP/HTML/CSV/暗号化アーカイブ等はv1対象外。
- fileFormatは yattoko-backup、fileFormatVersionは1候補。
- schemaVersion / questionSchemaVersion / recordId grammarはF2で実値未確定のため、8章のversion registry gateに従う。仮の1を本番値として扱わない。

### 2.2 envelopeの規範形

root field orderは固定する。

1. fileFormat
2. fileFormatVersion
3. kind
4. exportedAt
5. snapshot
6. pending
7. checksum

kindはnormalまたはemergencyのみ。

normal：
- pendingはnull。
- committed snapshotだけを持つ。

emergency：
- committed snapshotを必須とする。
- 未保存候補が存在する場合、pendingは5章のcapture summaryとoperationsを持つ。
- 未保存候補が0件ならpending=nullでもよい。
- 未保存候補があるのに1件も安全に退避できない場合、pendingはoperations空配列とcapture summaryを持たせ、未退避件数を残す。committed-onlyであることをUIにも表示する。

exportedAtはUTCの固定形式 YYYY-MM-DDTHH:mm:ss.sssZ。端末時計由来の参考値であり、真正性・新しさの根拠にしない。

### 2.3 snapshot

snapshotはF2 canonical capacity projectionと同じ意味を持つ。

field order：
1. schemaVersion
2. questionSchemaVersion
3. generationId
4. globalRevision
5. overview
6. categories
7. services

categories順：
device, base, mail, social, cloud, subscription, finance, commerce, auth, license, carrier, business

services順：
recordIdのF2 canonical order。

normal backupではcommitted partialとcompletedを双方含む。

## 3. F3-R02｜JSON・canonical serialization・SHA-256

### 3.1 受入れ処理順序

importは必ず次の順序で行う。

1. File.sizeを確認しraw上限超過ならbytesを読まず拒否。
2. raw bytesをUTF-8 fatal decode。BOM、不正UTF-8を拒否。
3. JSON lexical scannerを実行。
4. lexical scanner合格後のみJSON.parse。
5. envelopeのexact allowlist、型、version、Unicode scalar、field presenceを検証。
6. parsed objectからschema-defined canonical full JSONを再生成し、raw decoded textと**byte-for-byte一致**することを要求。不一致はnon-canonical inputとして拒否。
7. checksumを除く6 root fieldsをschema-defined canonical serializerで直列化し、UTF-8 bytesへ変換。
8. SHA-256を計算しchecksum.hexとconstant-time相当の比較を行う。
9. checksum一致後もF2 cross-field / category / R07-R09 / capacity / pending semantic validatorを必ず実施。
10. 全検査合格後だけpreviewへ進む。

checksum一致は「破損していない可能性」を示すだけで、真正性、作成者、改ざん耐性、暗号化、安全性を保証しない。

### 3.2 duplicate keyの一意な拒否方法

JSON.parse単体に依存しない。

lexical scannerはobjectごとにdecoded property nameのsetを持つ。

- property nameのJSON escapeを解釈してUnicode文字列へ戻してから重複比較する。
- "kind" と "\u006bind" は同じdecoded keyとして重複拒否。
- rootだけでなくsnapshot、overview、category、service、answers、pending、operation、checksumを含む全object scopeで行う。
- 重複を検出した時点でfail closed。
- 後勝ち・前勝ち・自動修復をしない。

### 3.3 数値のlexical規則

v1でJSON numberとして受け入れるのは非負整数だけ。

- tokenは 0 または [1-9][0-9]* のみ。
- -0、負数、小数、指数表記、+付き数値、leading zeroを拒否。
- parsed後はNumber.isSafeInteger相当かつfield-specific rangeを検査。
- fileFormatVersion、revision、globalRevision等に1e0を許可しない。
- NaN / InfinityはJSON外であり当然拒否。

### 3.4 Unicode規則

- raw bytesはUTF-8 fatal decode。
- BOMは禁止。
- parsed stringにunpaired UTF-16 surrogateがあれば拒否。
- F2がNFCを要求するotherServiceName等は「NFCへ変換」せず、「既にNFCか」を検査し不一致なら拒否。
- control / bidi rulesはF2 validatorをそのまま利用。
- escaped Unicodeとliteral Unicodeで同じ意味でも、raw canonical一致を満たさない非canonical表現は拒否できる。

### 3.5 unknown field・構造

- root/nestedのunknown fieldを全て拒否。
- required field欠落を拒否。
- unexpected nested object / arrayを拒否。
- category重複、recordId重複、未知categoryKey、未知question、inactive conditional field present、active conditional field missingを拒否。
- invalid completed serviceをpartialへ自動補正しない。

### 3.6 canonical serializer

canonical JSONは「受け取ったobjectを一般的にsortする」のではなく、**schema-defined field orderで新しいobjectを構築してJSON.stringify相当（replacerなし、spaceなし）**で生成する。

- root、snapshot、overview、category、service、answers、pending、operation、checksumごとにfield orderを仕様化。
- categories/services/answers orderはF2規則に従う。
- numberは上記非負safe integerのみなのでdecimal canonical表現。
- user textをhash前に勝手にnormalizationしない。F2 validatorでcanonical形を要求する。
- full input raw textはcanonical full JSONと完全一致しなければ拒否するため、key並替・余分な空白・非canonical escapeによるparser再解釈差を排除する。

### 3.7 checksum対象

digest payloadは以下6 fieldをこの順で持つcanonical object。

fileFormat, fileFormatVersion, kind, exportedAt, snapshot, pending

checksum object自体はdigest対象外。

checksum：
- algorithmはSHA-256のみ。
- hexは64文字のlowercase hexadecimalのみ。
- Web Crypto digest失敗時はexport/import成功扱いしない。

### 3.8 規範test vector

#### DIGEST-01：serializer/digest正常vector（F2 restore-validityを表すものではない）

canonical digest payload text：

~~~json
{"fileFormat":"yattoko-backup","fileFormatVersion":1,"kind":"normal","exportedAt":"2026-10-14T00:00:00.000Z","snapshot":null,"pending":null}
~~~

UTF-8 SHA-256 expected：

15ef7730c4760d29e3c2ea43866783cf23c7d1f50d15db09acaa8ee353e0904d

これはdigest実装だけのvector。snapshot=nullはrestore可能なYattoko backupではない。semantic acceptance testはACTIVE version registryから生成した完全snapshot fixtureを使う。

#### JSON-VECTOR群

| ID | 入力差分 | 期待 |
|---|---|---|
| V-VALID-01 | ACTIVE registryから生成したcanonical full file | accept preview |
| V-DUP-01 | 同一objectに同じkeyを2回 | lexical reject |
| V-DUP-02 | kind と \u006bind を同一objectに置く | decoded duplicate reject |
| V-ORDER-01 | root keyを並替 | canonical raw mismatch reject |
| V-NUM-01 | fileFormatVersion:1e0 | lexical reject |
| V-NUM-02 | revision:-0 | lexical reject |
| V-UNK-01 | snapshotにunknown nested field | strict reject |
| V-UTF-01 | escaped lone surrogate | Unicode reject |
| V-BOM-01 | UTF-8 BOM付き | reject |
| V-HASH-01 | canonical body 1 byte変更、checksum据置 | checksum reject |
| V-HASH-02 | bodyとchecksumを両方作り直すがschema不正 | semantic reject |
| V-TRUNC-01 | file途中切断 | parse reject |
| V-ESC-01 | canonical stringを不要なunicode escapeへ変更 | canonical raw mismatch reject |

## 4. 通常バックアップ

1. 利用者が「バックアップファイルを保存」を選ぶ。
2. 関連storeを同じreadonly transactionで取得しcommitted snapshotを作る。
3. F2 strict validator、version registry、10MB canonical projectionを検証。
4. canonical envelopeを構築しchecksumを生成。
5. provisional raw file limitを確認。
6. Blob/download等、PC ChromeとiPhone Safari双方で成立する方式を使用候補とする。
7. download開始要求が成功しても物理ファイル保存完了とは断定しない。
8. UIは「ファイル保存の操作を開始しました。保存先にファイルがあることを確認してください」等とする。
9. 画面に未commit入力がある場合、normal backupには含まれないと同操作内で明示。
10. export自体はgeneration/revisionを変更しない。

dataset未作成なら空backupを作らず「保存済みデータがありません」と表示する。

## 5. F3-R01｜緊急退避pending完全性

### 5.1 未保存状態の3区分

A. confirmed-pending mutation
- 利用者がtap/確定操作を終えcanonical値が決まったが、IndexedDB transaction complete前、または保存失敗後のmutation。

B. dependent-pending mutation
- 先行pendingに依存する後続mutation。
- 例：service identity作成pendingに続くusageStatus / optional answer / intentionOverride。

C. current UI draft
- 利用者がまだ確定操作をしていない画面上入力。
- v1で自由文字として存在し得るのはF2が許可するotherServiceName等だけ。
- emergency fileへ入れる場合もF2 validatorを通過したcanonical candidateだけ。invalid raw draftはfileへ入れず、画面上に保持し「退避できなかった」に数える。

画面位置、DOM dump、任意メモ、秘密情報、mutationSeq内部値は退避対象にしない。

### 5.2 pending operation規範

各operationは最低限：

- operationId：emergency capture内で一意なopaque ID。
- ordinal：利用者操作順。並替禁止。
- operationType：F2保存イベントallowlist内のみ。
- targetKind：overview/category/service。
- target identity：categoryKeyまたはrecordId。
- baseGenerationId。
- baseGlobalRevision。
- baseRecordRevision（対象が既存recordの場合）。
- dependsOnOperationIds：先行依存。
- canonical value：そのoperationに必要な最小値。
- dependency context：conditional answer等に必要な親回答のexpected state。

operationIdは再適用の真正性証明ではない。秘密や外部IDを埋め込まない。

### 5.3 dependency chain

operationsを有向依存graphとして扱う。

- ordinalに逆行するdependencyは禁止。
- cycle禁止。
- missing dependency禁止。
- target identity不整合禁止。
- conditional childは親mutation/committed親stateと整合必須。
- service作成に依存する後続操作は同じdependency componentに属する。
- operation順を自動入替して「直す」ことは禁止。

**component単位でall-or-nothing capture**する。
1つのoperationがinvalidなら、そのoperationを必要とする同component全体をpending fileから除外する。独立componentは退避してよい。

これにより「一部退避」は可能だが、依存連鎖を途中で切った危険なpendingは生成しない。

### 5.4 snapshot/base照合

緊急capture開始時：

1. 画面上pending候補をfreezeしたin-memory capture candidateとして複製する。元UI入力は消さない。
2. readonly transactionでcommitted snapshotとgeneration/global/record revisionsを取得。
3. pending各operationのbaseがsnapshotと一致するか照合。
4. 別tab更新でbaseが変わっていた場合、そのcomponentは退避不可。古いpendingを新snapshotへ勝手にrebasingしない。
5. snapshot checksumとpending baseSnapshotChecksumSha256を対応させる。
6. recordsの内容比較用にbaseContentFingerprintSha256も持つ。真正性保証には使わない。

### 5.5 capture summary

emergency pending objectは次を持つ。

- captureStatus：full / partial / none
- candidateCount
- exportedCount
- omittedCount
- omittedScopes：値そのものを含めず、categoryKey / targetKind / operationType / ordinal range / reasonCodeのみ
- baseGenerationId
- baseGlobalRevision
- baseSnapshotChecksumSha256
- baseContentFingerprintSha256
- operations

reasonCode例：
- INVALID_VALUE
- DEPENDENCY_INVALID
- DEPENDENCY_MISSING
- BASE_CONFLICT
- PENDING_BYTES_LIMIT
- PENDING_COUNT_LIMIT
- UNSUPPORTED_OPERATION

### 5.6 上限超過

provisional cap：
- pending canonical serialized bytes <=1,000,000
- operations <=256

超過時は無断truncationしない。

- cap内に収めるため古い/新しいoperationを勝手に落とさない。
- candidate全体がcapを超える場合、pending captureStatus=noneとし、committed snapshotのみのemergency fileを作る選択肢を表示する。
- UIはcandidateCount / exportedCount=0 / omittedCountを明示。
- 元画面の未保存入力を保持。
- 依存component単位のpartial validation failureの場合だけ、独立valid componentをpartial captureできる。

### 5.7 利用者表示

full：
「未保存の回答 X件を緊急ファイルに含めました。ファイルが実際に保存されたか保存先を確認してください。」

partial：
「未保存の回答 X件のうち Y件を退避対象にできました。Z件は退避できていません。退避できなかった範囲：カテゴリ／項目種別…。この画面を閉じる前に内容を確認してください。」

none：
「未保存の回答 X件は緊急ファイルへ退避できませんでした。確定済みデータだけのファイルを作成できます。この画面の未保存回答はまだ画面上に残っています。」

download生成/起動失敗：
「緊急ファイルを作成できませんでした。未保存回答は退避されていません。この画面を閉じず、内容を確認してください。」

「救済完了」「保存できました」は、物理ファイル存在を確認できない限り表示しない。

### 5.8 UI入力保護

- emergency capture用snapshotを作っても元フォーム値をclearしない。
- validation failure、checksum failure、Blob/download failure、cap超過で元画面をresetしない。
- retryは同じ画面値から新captureを作る。
- navigation/reload/OS killは画面値喪失の可能性があるため、成功が確認できない間は「画面を閉じない」表示を出す。
- beforeunload等は補助であり、保護保証として依存しない。

## 6. F3-R03｜復元と既存データ保護

### 6.1 既存ローカル状態の分類

preview前にreadonlyで現在状態を分類する。

VALID：
- metaと全recordsがF2 strict validatorを通る。
- guardはgenerationId + globalRevision +必要なrecord revisions。

EMPTY：
- metaなし、対象storesにもYattoko recordsなし。
- 「壊れて読めない」をEMPTYとして扱わない。

CORRUPT_COMPARABLE：
- F2 semantic validatorには失敗するが、対象storeのraw structured-clone値を全件読め、決定的raw-state representationでpreview時とcommit時の完全一致比較が可能。

CORRUPT_UNCOMPARABLE：
- raw read自体が失敗、unsupported/cyclic等で決定的比較不能、store列挙不能など。
- in-app full replaceを**停止**する。競合guardを省略して復元しない。

### 6.2 corrupt既存データの復旧

CORRUPT_COMPARABLEだけ別復旧経路を許す。

UI：
「現在の端末データを正常な保存データとして確認できません。通常バックアップを作れない可能性があります。このファイルから復元すると、現在の保存領域をすべて置き換えます。」

- 通常のreplace確認とは別に「破損している可能性のある現在データを破棄して復元」の二段階確認を要求。
- preview時raw-state guardを保持。
- commit transaction内でraw-stateを再読込し完全一致しなければabortして再preview。
- CORRUPT_UNCOMPARABLEは上書き禁止。「安全に競合確認できないため、この画面から復元できません」と停止する。
- 手動でbrowser site dataを消す等は利用者の別操作であり、アプリが自動実行しない。

### 6.3 precompute

readwrite transaction開始前に行う。

1. file strict parse / checksum / F2 semantic validation。
2. current state classificationとpreview guard取得。
3. 利用者preview表示。
4. new generationIdを生成。
5. file snapshotのrecordsを保持したまま、new generationId、globalRevision=1を適用したprospective datasetを構築。
6. record revisionsは検証済みsnapshot値を保持。
7. F2 canonical capacity projectionを生成しUTF-8 bytesを計測。
8. new generation/metaを含め10,000,000 bytes以下であることを確認。
9. prospective canonical bytes / size / digestをfreezeしてcommit candidateとする。
10. explicit replace confirmationを取得。

new generationId生成規則はACTIVE version registryに従う。registry未bindingではF4へ進まない。

### 6.4 atomic readwrite transaction

同一readwrite transactionで次を行う。

1. current stores/metaを再読込。
2. VALIDならpreview generation/global guard、EMPTYならempty guard、CORRUPT_COMPARABLEならraw-state guardと一致確認。
3. 不一致ならabort。再確認なしで上書きしない。
4. freeze済みprospective candidateを同期的canonical serializerで再serializeし、precomputed bytes/digestと一致かつ10MB以下を再確認。
5. 全対象store clear。
6. overview/categories/servicesをput。
7. metaをnew generationId / globalRevision=1でput。
8. 同じtransaction内でput後records/metaをread-backし、canonical projectionを再構築。
9. read-back canonical bytes / size / digestがprecomputed prospective candidateと完全一致することを確認。
10. 1件でもrequest error、quota error、final meta write error、read-back mismatchならtransaction.abort。
11. transaction completeだけをrestore成功とする。

transaction中にnetwork、digest Web Crypto、timer等の無関係awaitを挟まない。IndexedDB request chainだけで処理する。

### 6.5 rollbackと旧タブ

- abort時はclear/put/metaを含め旧正本をtransaction atomicityで維持。
- transaction complete後だけ新generationが正本。
- 他tabは次回save時にgeneration mismatchで拒否。
- BroadcastChannel等の通知は補助で、正否を通知到達に依存しない。
- restore後に旧tabの古い正本をforce overwriteするretryを禁止。

### 6.6 preview競合

preview後に他tab edit / delete-all /別restoreが入った場合：
- commit guard mismatchでabort。
- 「確認後に端末データが変更されました。もう一度内容を確認してください」と表示。
- 自動で再preview→即commitしない。

## 7. F3-R05｜emergency restore後のpending再適用

### 7.1 原則

- emergency fileのsnapshot restoreとpending reapplyは別操作。
- snapshot restore成功後もpendingは未commit。
- pendingをIndexedDBへ自動保存しない。
- 利用者が明示的に「未保存の回答を確認する」→「この回答を適用する」を選ぶまでcommitしない。

### 7.2 state machine

FILE_SELECTED
→ FILE_VALIDATED
→ SNAPSHOT_PREVIEW
→ SNAPSHOT_RESTORE_CONFIRMED
→ SNAPSHOT_RESTORED_PENDING_AVAILABLE
→ PENDING_REVIEW
→ REAPPLY_CONFIRM
→ REAPPLY_IN_PROGRESS
→ ALL_APPLIED / PARTIALLY_APPLIED / CONFLICTED / FAILED

reload/画面終了/Safari killでin-memory stateは消え得る。
そのためSNAPSHOT_RESTORED_PENDING_AVAILABLE以降で未適用が残る間、次を表示する。

「未保存の回答はまだ端末の保存データへ確定されていません。この画面を閉じると確認状態は消えることがあります。緊急ファイルを保管し、必要ならもう一度同じファイルを選んでください。」

### 7.3 二回目import / pending-only recovery

emergency fileにはbaseContentFingerprintSha256を持つ。

再選択時：
1. fileを最初からstrict validate。
2. current committed datasetのcontent fingerprintを生成。
3. file snapshotをrestoreした直後のexpected content fingerprintと一致する場合、full replaceを再実行せず「未保存回答だけ確認」導線を出せる。
4. current dataが既に一部reapply済みで完全一致しない場合、各operationのexpected-before / intended-afterを順番に確認する。

operation判定：
- current state == expected-before：利用者確認後に通常F2 save pipelineで適用可能。
- current state == intended-afterかつ依存contextも一致：already-appliedとして再commitしない。
- どちらでもない：conflict。自動適用しない。

### 7.4 partial reapply

- dependency component単位で順序を維持。
- あるoperation成功後、次operationで失敗した場合、成功済みcommitはF2正本として残る。
- remaining / conflicted / already-applied件数を表示。
- retryで成功済みoperationを二重適用してrevisionを増やさない。
- deleted/missing target、recordId collision、parent state change、10MB超、generation conflictは停止して利用者確認。
- pending operationを勝手に別recordへmappingしない。

### 7.5 background / reload

- visibilitychange/pageshow等で未適用警告を再表示できるが、永続保護保証にしない。
- browser restart後は同じemergency file再選択がdurable recovery source。
- fileがなければ未保存pendingを復元できると約束しない。

## 8. F3-R07｜F2 authoritative connection / version registry

### 8.1 F2からそのまま参照する規範

categoryKey：
device, base, mail, social, cloud, subscription, finance, commerce, auth, license, carrier, business

R07：
category usageStatusが初回unanswered→answeredでintention=unansweredなら同一transactionでundecided。既存keep/delete/family/undecidedは上書きしない。

R08：
completed serviceはusageStatusがusing/dormant/unknown。completed + unansweredは禁止。save/load/import/restoreで同じcross-field validator。

R09：
parent intention=unanswered + service intentionOverride=nullではparent canonicalを変えずdisplay/effectiveだけundecided。fallbackをserviceへ保存しない。reload/restart/restore/importで再計算。child usingでparent usageをpositive整合する場合R07も同一transaction。

conditional：
- unconditional / active conditionalはkey必須、未回答はunanswered。
- inactive conditional keyは禁止。

capacity：
- F2 canonical field orderを使用。
- 12 categories全件。
- servicesはcanonical recordId order。
- partial/completed双方。
- new generation/metaを含むprospective committed datasetをJSON/UTF-8で測り10,000,000以下。

### 8.2 version registry gate

F2承認設計はschemaVersion、questionSchemaVersion、recordId具体grammarを「後続で確定」として残している。F3が独断で1やUUIDを本番値にしてはならない。

F3 v0.2 registry：

| Registry item | 状態 | 規範 |
|---|---|---|
| fileFormatVersion | CANDIDATE 1 | F3 human approval対象 |
| schemaVersion accepted set | **UNBOUND / BLOCKING** | F2意味変更なしで具体値をbindingする承認記録が必要 |
| questionSchemaVersion accepted set | **UNBOUND / BLOCKING** | 同上 |
| recordId grammar | **UNBOUND / BLOCKING** | stable/uniqueのF2意味を狭めない具体grammar承認が必要 |
| generationId grammar/generator | **UNBOUND / BLOCKING** | F2世代境界を維持する具体方式承認が必要 |
| category mapping | BOUND | 上記12 internal keys |
| R07-R09 | BOUND | F2承認設計をそのまま参照 |
| capacity serializer | BOUND | F2 canonical projection |

**ACTIVE registry rowが存在しない状態ではproduction export/import実装を有効化してはならない。**
F4開始前にregistry bindingを別記録で人間確認する。これはF2の意味変更ではなく未確定技術値のbinding候補だが、もしF2の既承認meaning/fieldを変更する必要が出た場合はF2変更として人間へ差戻す。

### 8.3 version validation

- fileFormatVersionとACTIVE registry rowをexact match。
- schemaVersion/questionSchemaVersionは登録pairのみ。
- recordId/generationIdはACTIVE grammarのみ。
- unknown/old/future versionは推測migrationしない。
- migration追加は別設計・別承認。

## 9. F3-R04｜raw 16MB / pending 1MB / 256件と性能

### 9.1 暫定候補の根拠

16,000,000 raw bytes：
- F2 committed最大10,000,000 bytesにenvelope/checksum/pendingを足す余裕を確保する候補。
- 「Safariで安全」という根拠ではない。

1,000,000 pending bytes：
- committed上限の10%相当を緊急未保存領域の候補budgetとし、異常時の巨大化を抑える。
- 妥当性は未実測。

256 operations：
- 保存障害中の多数操作をある程度保持しつつ、dependency validationの病的増大を抑える候補。
- 多すぎる／少なすぎる可能性をF5/F6で評価する。

3値とも**PROVISIONAL / HUMAN DECISION REQUIRED**。

### 9.2 parse前resource guard

raw bytesをJSON.parseへ渡す前にlexical scannerで：

- raw 16,000,000超を拒否。
- depth 16超を拒否。
- root/snapshot等の既知pathではschema上あり得るmember数を超えた時点で拒否。
- categoriesは12以外をsemantic reject。
- pending operationsは256超をparse前scan段階で拒否候補。
- fieldごとのstring token長はACTIVE registry/F2 validator上限を超えた時点で拒否。
- services countはACTIVE registryから計算した「10MB canonical datasetで理論上成立し得る最大件数」を超えた時点で拒否。registry未bindingではこのgateをACTIVEにできない。
- scanner自体はraw bytes/textを全objectへ展開した別巨大treeとして保持しない。

### 9.3 F6 iPhone Safari計測方法

最終採用前に、リリース時の**最も古いサポート対象iPhone/Safari**を含めて測定する。

各境界caseをforegroundで5連続実行。

計測：
- File read時間
- fatal decode時間
- lexical scan時間
- JSON.parse時間
- canonical serialize時間
- SHA-256時間
- semantic validation時間
- total preflight時間
- 100ms heartbeatでforeground event-loop最大gap
- page reload / white screen / OS kill / memory warningの有無
- Safari Web InspectorまたはInstrumentsが利用可能ならpeak memory / resident memory deltaを記録

暫定functional gate：
- 5/5でcrash、OS kill、意図しないreloadなし。
- 5/5で既存IndexedDBにmutationなし。
- max foreground heartbeat gap <=2,000ms。
- total preflight <=15,000ms。
- UIが操作不能のまま復帰しない状態なし。

memory：
- 標準Web APIだけではiPhone Safariのpeak memoryを信頼できる形で取得できないため、Web Inspector/Instruments測定値を証拠として保存する。
- peak memoryを測定できない場合、**16MB上限の安全性判定はNOT VERIFIABLE**とし最終PASSにしない。
- 測定値を人間レビューへ提示し、16MB/1MB/256の維持または引下げを決める。

性能gateに1つでもFAILがあれば閾値を下げて再試験し、勝手に上げない。

## 10. F3-R06｜平文JSONプライバシー

### 10.1 書出し前の短い注意文案

「このバックアップファイルは暗号化されていません。整理したサービス名・利用状況・本人意向などを、ファイルを開ける人が読めます。共有端末や共有フォルダへの保存、不要な共有は避けてください。保存先によってはiCloud Driveなどへ自動同期されることがあります。ヤットコがこのファイルを自動でアップロードすることはありません。」

補足：
「SHA-256はファイルの破損確認用です。内容を隠したり、作成者を証明したりする機能ではありません。」

### 10.2 境界

- 暗号化はこの差戻しで追加しない。
- クラウドupload/share機能を追加しない。
- OS/Filesアプリ側の同期はヤットコが制御できない。
- 共有PCではdownload folderを他人が閲覧できる可能性を説明する。
- filenameにはservice名等を入れない。
- previewで個人内容を必要以上に表示しない。
- plaintext採用の最終判断は人間F3承認事項。

## 11. 復元UIと明示確認

正常既存データ：
「この端末の現在のデータは、選んだファイルの内容で丸ごと置き換わります。現在のデータと自動で結合しません。」

画面に未保存入力あり：
「この画面の未保存回答は復元に含まれません。必要なら先に緊急退避してください。」

corrupt comparable：
「現在の端末データを正常に確認できません。復元すると現在の保存領域を破棄して置き換えます。通常バックアップを作れない可能性があります。」

preview後競合：
「確認後に端末データが変更されました。復元を止めました。もう一度内容を確認してください。」

pending restore後：
「未保存回答はまだ確定されていません。画面を閉じると確認状態が消えることがあります。緊急ファイルを保管してください。」

## 12. F3-R01〜R07対応表

| ID | 修正 |
|---|---|
| F3-R01 | pendingをconfirmed/dependent/current draftに分離。dependency component all-or-nothing、capture summary、未退避件数/範囲、UI保持、download失敗fail-closedを定義 |
| F3-R02 | duplicate decoded key scanner、canonical raw一致、非負整数lexical規範、Unicode/unknown reject、SHA対象/順序、規範vectorを固定 |
| F3-R03 | valid/empty/corrupt-comparable/uncomparable分類、明示確認、競合guard、precompute→single transaction→readback verify→completeを規範化 |
| F3-R04 | 16MB/1MB/256をprovisionalとし根拠・境界・iPhone計測・PASS/NOT VERIFIABLE規則を追加 |
| F3-R05 | restore後pending state machine、再取込、partial apply、already-applied判定、二重適用防止を追加 |
| F3-R06 | 平文・共有端末・iCloud等同期・SHA限界・自動uploadなしのUI文案を追加 |
| F3-R07 | F2 category/R07-R09/capacityを固定参照し、未確定version/ID grammarをUNBOUND registry gateとして明示 |

## 13. 未解決・人間判断事項

### F3人間判断が必要

1. plaintext JSONをv1で採用するか。
2. restoreをfull replace onlyで採用するか。
3. provisional raw 16,000,000 / pending 1,000,000 / 256 operationsをF6実測後に維持するか引下げるか。
4. fileFormatVersion=1を正式採用するか。
5. ACTIVE version registryのschemaVersion / questionSchemaVersion / recordId / generationId具体binding。

### F2変更が必要になった場合

以下はF3単独で変更しない。
- categoryKey meaning
- R07/R08/R09 semantics
- 10,000,000 byte committed limit
- F2 canonical capacity projection
- record/revision/generation semantics
- secret field policy

変更案が必要になれば**F2変更として人間判断へ差戻す**。

## 14. 停止位置

- F2：APPROVED維持。
- F3：REVISED DRAFT / NOT APPROVED / FORMAL RE-REVIEW PENDING。
- F4：NOT AUTHORIZED。
- F5/F6：PLAN ONLY / NOT RUN。
- 本番公開：NOT AUTHORIZED。
- R005：FROZEN。
- 認証・クラウド保存：再開しない。

制作管理室の正式再レビュー完了まで停止する。
