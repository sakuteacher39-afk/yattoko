# YTK-F3｜バックアップ・緊急退避・復元 詳細設計案 v0.3

- 起案：2026-10-14
- 正式レビュー差戻し対応：2026-10-14
- 正式再レビュー差戻し対応：2026-10-14
- 状態：**REVISED DRAFT v0.3 / FORMAL RE-REVIEW2 PENDING / NOT APPROVED / NO IMPLEMENTATION**
- 対象：端末保存型無料版。外部通信・ログイン・サーバー保存なし。
- F2正本：workflow/reviews/YTK-F2-human-approval-20261014.md（commit 263efbf030693efb5d8071fcba6f93e4970971b1）
- F2承認対象設計：workflow/proposals/YTK-F2-storage-safety-revision-20261013.md（commit 0d5dfa387f924e5dc3dc9196b9f236986c910281）
- F3初回設計commit：b1a6f6a08d21f677eab0450b9d620df960c412be
- F3正式レビュー：workflow/reviews/YTK-F3-backup-restore-formal-review-20261014.md（commit 597c8ab531f2bd68990f1e652696c1ba34f665d7）
- F3正式再レビュー：workflow/reviews/YTK-F3-backup-restore-formal-rereview-20261014.md（commit 06c1b7617c947e70fccd4cc7a22082cd19def3c7）
- 正式再レビュー判定：R01/R02/R04/R06/R07 RESOLVED、R03/R05 CHANGES_REQUIRED
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

## 6. F3-R03｜復元と既存データ保護（R03-A対応）

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
- commit transaction内でraw-stateを再読込し、**同期的canonical bytes比較**で一致しなければabortして再preview。
- CORRUPT_UNCOMPARABLEは上書き禁止。「安全に競合確認できないため、この画面から復元できません」と停止する。
- 手動でbrowser site dataを消す等は利用者の別操作であり、アプリが自動実行しない。

### 6.3 Phase A：transaction開始前preflight

**Web Crypto、file decode、strict validator、prospective dataset生成、digestはすべてreadwrite transaction開始前に完了させる。**

1. file raw size / UTF-8 fatal decode / lexical duplicate-key / canonical raw / SHA-256 / F2 semantic validationを完了。
2. current state classificationとpreview guardをreadonly transactionで取得。
3. 利用者previewを表示。
4. ACTIVE registry規則でnew generationIdを生成。
5. file snapshotへnew generationId / globalRevision=1を反映したprospective datasetを構築。
6. imported record revisionsは検証済み値を保持。
7. F2 canonical serializerでexpectedCanonicalTextを生成。
8. TextEncoderでexpectedCanonicalBytesを生成。
9. expectedByteLengthを計測し10,000,000以下を確認。
10. expectedCanonicalBytesのSHA-256を**transaction外で**計算しpreflight監査値として保持してよい。ただしtransaction内の正否判定にはdigestを使わない。
11. VALID currentならpreview generation/global/record guard、CORRUPT_COMPARABLEならpreviewRawGuardCanonicalBytesをtransaction外でfreeze。
12. explicit replace confirmationを取得。
13. 以上がすべて完了してからreadwrite transactionをopenする。

transactionへ渡すfreeze済み入力：
- expected canonical JS records/meta
- expectedCanonicalBytes
- expectedByteLength
- preview guard
- current state class
- newGenerationId

transaction開始後にFile API、TextDecoder、Web Crypto digest、network、timer、Promise待機で追加情報を取りに行かない。

### 6.4 Phase B：readwrite transaction内の同期request-chain

transaction対象storeを最初から全てscopeに含める。

**transaction event handlerをasync functionにしない。await / Promise.then / queueMicrotask / setTimeout / requestAnimationFrame / crypto.subtle.digest / Blob.arrayBuffer等をtransaction内で使用しない。**

処理はIndexedDB request callback内で次phaseのrequestを**callbackからreturnする前にenqueue**する。

#### Phase B1：guard read

1. transaction開始直後にmeta・対象storeのguard確認に必要なget/getAll requestを全てenqueue。
2. 各onsuccessは結果をmemoryへ集約。
3. 最後のguard request callback内で、VALID / EMPTY / CORRUPT_COMPARABLEのpreview guardを同期比較。
4. mismatch / synchronous validation exceptionならそのcallback内でtransaction.abort()。
5. guard合格なら同じcallbackからreturnする前にB2のclear requestsをenqueue。

CORRUPT_COMPARABLEのraw-state比較もcanonical serializer + TextEncoderによる同期bytes比較だけを使う。digestは計算しない。

#### Phase B2：clear

1. 対象storeのclear requestを全てenqueue。
2. request errorはtransaction abortへ伝播させる。
3. 最後のclear success callback内でB3のput requestsをenqueueしてからreturn。

#### Phase B3：put

1. freeze済みprospective overview/categories/services/metaをput。
2. request error / quota error / DataError等はabort。
3. 最後のput success callback内でB4のreadback get/getAll requestsをenqueueしてからreturn。

#### Phase B4：readback

1. 書込対象全store/metaを同じtransactionでreadback。
2. 最後のreadback success callback内でF2 canonical projectionを**同期的に**再構築。
3. canonical serializerでreadbackCanonicalTextを生成。
4. TextEncoderでreadbackCanonicalBytesを生成。
5. 次を同期確認：
   - readbackCanonicalBytes.byteLength <= 10,000,000
   - byteLength == expectedByteLength
   - 全byteがexpectedCanonicalBytesと完全一致
   - meta generationId == newGenerationId
   - meta globalRevision == 1
   - record count / recordId / recordRevisionがprospective candidateと一致
6. 1byteでも不一致、容量超過、例外があれば**callback内でtransaction.abort()**。
7. 全項目一致ならmemory flag readbackVerified=true を設定してreturn。
8. ここで初めてpending requestが0になってよく、その後のIndexedDBの通常auto-commitを許可する。

**premature auto-commitは禁止だが、readbackVerified=true後の正常auto-commitは意図した完了動作。**

### 6.5 transaction complete / abort規範

- transaction.oncompleteで readbackVerified===true の場合だけrestore success。
- oncompleteがreadbackVerified=falseで発火した場合は実装不備としてFAIL扱い。成功UIを出さない。
- request error、TransactionInactiveError、同期serializer例外、quota error、readback mismatchではabortを要求。
- onabort/onerrorでは旧正本が維持されていることを前提に失敗表示。
- request単体success、clear success、put success、meta write successでは成功表示しない。
- transaction中に次phase requestをenqueueできないコードpathはproduction実装禁止。

### 6.6 transaction inactivity / auto-commit対策

安全性は「長時間transactionを保持する」ことではなく、**event callback内で次requestを必ずenqueueする有限state machine**で担保する。

許可する同期処理：
- plain JS field/type check
- schema-defined canonical serializer
- JSON.stringify相当の同期生成
- TextEncoder.encode
- Uint8Array length/byte compare
- counter / map / set操作

禁止：
- async/await
- Promise callbackへ制御を渡す
- Web Crypto
- network
- File/Blob async read
- timer / idle callback
- UI modal待機
- user interaction待機

UI確認はtransaction開始前に終える。

### 6.7 rollbackと旧タブ

- B2 clear後、B3途中、B4 readback後のどこでabortしてもIndexedDB transaction atomicityにより旧正本を維持。
- transaction complete後だけ新generationが正本。
- 他tabは次回save時にgeneration mismatchで拒否。
- BroadcastChannel等の通知は補助で、正否を通知到達に依存しない。
- restore後に旧tabの古い正本をforce overwriteするretryを禁止。

### 6.8 preview競合

preview後に他tab edit / delete-all / 別restoreが入った場合：
- B1 guard mismatchでabort。
- 「確認後に端末データが変更されました。もう一度内容を確認してください」と表示。
- 自動で再preview→即commitしない。

## 7. F3-R05｜emergency restore後のpending再適用（R05-A対応）

### 7.1 原則

- emergency fileのsnapshot restoreとpending reapplyは別操作。
- snapshot restore成功後もpendingは未commit。
- pendingをIndexedDBへ自動保存しない。
- 利用者が明示的に「未保存の回答を確認する」→「この回答を適用する」を選ぶまでcommitしない。
- **data contentの一致だけを「同じ復元」「適用済み」の証拠にしない。**
- current == intended-after だけでalready-applied判定しない。

### 7.2 source file identity / restore provenance

strict validationとchecksum検証が完了したemergency fileについて、transaction開始前に次を作る。

sourceFileId = "f3:" + fileFormatVersion + ":" + checksum.hex

checksum payloadにはkind / exportedAt / snapshot（source generation含む）/ pendingを含むため、異なるgenerationの同内容snapshotやpending差分は通常別sourceFileIdになる。

注意：
- sourceFileIdは**ローカルな復元元識別子**であり、真正性・作成者証明ではない。
- checksumを書き換えた攻撃fileもstrict validation対象であり、sourceFileId自体をtrust anchorにしない。

snapshot restore transactionがcompleteした後だけ、現在tab memoryに次のReapplyContextを生成する。

- sourceFileId
- sourceSnapshotGenerationId
- restoredGenerationId
- restoredBaselineGlobalRevision（restore直後は1）
- lastKnownGlobalRevision
- orderedOperationIds
- receiptMap
- contextState = ACTIVE

restore transaction abort時はReapplyContextを作らない。

### 7.3 operation receipt

operation適用前：
- operation key = sourceFileId + ":" + operationId。
- context sourceFileId / restoredGenerationIdが現在file/current metaと一致すること。
- current meta generationId == restoredGenerationId。
- current globalRevision == context.lastKnownGlobalRevision。
- operationIdがorderedOperationIds内で一意。
- dependency prefixがcontext内で確認できること。
- current stateがoperationのexpected-beforeと一致すること。
- intended-afterとexpected-beforeが同値のoperationはF2 idempotent no-opなのでpending operationとして受け入れない。

利用者が適用を確認した後、F2通常save pipelineのtransactionを実行する。

transaction complete後だけreceiptMapへ：
- operationKey
- operationId
- resultingGenerationId
- resultingGlobalRevision
- affected recordId/categoryKey
- resulting record revision(s)
- status=APPLIED

を**memory上だけ**記録し、context.lastKnownGlobalRevisionを更新する。

abort/error時はAPPLIED receiptを作らない。

### 7.4 safely already-appliedと判定できる条件

自動skip可能なalready-appliedは、以下を**すべて満たす同一tab・同一memory context内**に限る。

1. 選択fileのsourceFileId == context.sourceFileId。
2. current meta generationId == context.restoredGenerationId。
3. current meta globalRevision == context.lastKnownGlobalRevision。
4. operationKeyのAPPLIED receiptがreceiptMapに存在。
5. receiptがtransaction complete後に作られたもの。
6. dependency componentの適用順がreceipt列と矛盾しない。
7. 別tab更新・別restore・delete-all等を示すrevision/generation差がない。

この条件を満たす場合だけ、同じoperationを再commitせず「この操作はこの復元セッション内で適用済み」と表示できる。

**current valueがintended-afterと同じ、recordIdが同じ、content fingerprintが同じ、という理由だけではalready-appliedにしない。**

### 7.5 ambiguous / unproven cases

以下はUNPROVENまたはAMBIGUOUS_SAME_VALUEとして**自動適用も自動skipもしない**。

- current == intended-afterだがAPPLIED receiptがない。
- content fingerprintは一致するがgenerationが異なる。
- sourceFileIdは同じだがbrowser reload/restartでReapplyContextが失われた。
- 別tab編集でglobalRevisionが変化。
- 同じ内容へ利用者が別経路で編集した可能性がある。
- 同一recordIdでも復元世代とのprovenanceを確認できない。
- partial reapply後にbrowser restartして、どこまで適用済みかmemory receiptを失った。

UI：
「この未保存回答がすでに適用済みか安全に確認できません。自動では適用もスキップもしません。現在の内容と緊急ファイルの回答を確認してください。」

### 7.6 二重tap / 同一session二回import

同一ACTIVE context中：
- operationを押した時点でmemory statusをIN_FLIGHTにし、同operationの二重tapを受け付けない。
- transaction complete後APPLIED、abortでREADY/FAILEDへ戻す。
- 同じfileを二回選択してもsourceFileIdとACTIVE contextが一致する場合、APPLIED receiptがあるoperationだけsafe already-applied。
- receiptなしoperationはexpected-beforeを再検証し、利用者確認後だけ適用。

別tab：
- ReapplyContextはtab-local。
- 別tabにはreceiptがないためalready-appliedを推測しない。
- meta globalRevision/generationの差を見て停止・再確認。

### 7.7 reload / browser restart

ReapplyContext / receiptMapはF2正本へ保存しないため、reload/browser restartで失われ得る。

再起動後に同じemergency fileを選んだ場合：
- fileは最初からstrict validation。
- current generation/contentを見ても「前回と同じ復元」と自動断定しない。
- receiptが失われているため、operationをalready-appliedと自動skipしない。
- expected-beforeが現在成立するoperationも、自動適用せず利用者確認を要求。
- intended-after一致はAMBIGUOUS_SAME_VALUEとして停止・確認。
- 必要に応じてsnapshot full replaceからやり直す選択肢を表示できるが、現在data喪失警告と明示確認が必要。

### 7.8 partial reapply

同一ACTIVE context中：
- dependency component単位で順序を維持。
- op1 transaction complete後、op2で失敗した場合、op1 receiptを保持しop2以降をremainingとする。
- retryでop1はreceiptにより再commitしない。
- 10MB超、generation/global conflict、deleted/missing target、parent conflictで停止。
- pending operationを別recordへmappingしない。

reload/restart後：
- memory receiptがないためpartial progressを自動再構成しない。
- current valueだけから「ここまで済み」と推測しない。
- unresolved operationごとに利用者へ再確認する。

### 7.9 persistent exactly-once境界

現行F2 approved schemaには、sourceFileId + restoredGenerationId + operationIdの適用済みprovenance ledgerが存在しない。

したがってv0.3では：
- persistent applied-operation ledgerを追加しない。
- F2 schemaを変更しない。
- browser restartを跨いだ**自動exactly-once resumeは保証しない**。
- 証明できない場合はfail closedで利用者確認へ戻す。

将来「再起動後も操作ごとに自動で適用済み判定し、exactly-once resumeする」UXを必須にするなら、永続provenance recordが必要になる可能性が高い。これはF2承認範囲外なので、**F2変更として制作管理室・人間の別承認が必要**。F3で独断追加しない。

### 7.10 background

- visibilitychange/pageshowでACTIVE memory contextが残る場合はmeta generation/globalを再確認してから操作再開。
- mismatchならcontextをINVALIDATEし自動適用/skipを停止。
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
| F3-R03 | preflightでWeb Crypto等を完了し、transaction内はIndexedDB request-chain＋同期canonical bytes比較だけに限定。premature auto-commitを防ぎ、readbackVerified後のみ正常auto-commitを許可 |
| F3-R04 | 16MB/1MB/256をprovisionalとし根拠・境界・iPhone計測・PASS/NOT VERIFIABLE規則を追加 |
| F3-R05 | sourceFileId＋restoredGenerationId＋operationId＋同一session APPLIED receiptをprovenance条件に固定。content一致だけのalready-applied禁止。restart後は証明不能なら自動適用/skipせず確認へ停止 |
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
