# YTK-F4｜実装前条件・技術境界仕様案

- 作成日：2026-10-15
- 状態：**PRE-IMPLEMENTATION DRAFT / INDEPENDENT REVIEW PENDING / F4 NOT AUTHORIZED**
- F2：APPROVED
- F3：APPROVED（設計のみ）
- F5/F6：NOT RUN
- R005：FROZEN
- 本番公開：NOT AUTHORIZED

本書はF4コード実装開始前の安全条件を固定する。
**本書作成・レビューPASSだけではF4実装開始権限にならない。人間の別のF4実装開始承認が必要。**

## 1. F4対象範囲候補

F4は無料版v1の端末内保存・backup/restore実装を対象とする。

候補範囲：
- R001/R002既承認UXの保存対応
- IndexedDB canonical stores/meta
- save coordinator
- multi-tab guard
- capacity projection
- normal backup
- emergency export
- strict import
- full replace restore
- local validation / local error UX
- F5/F6用fault injection hook（productionでは無効）

対象外：
- 認証
- サーバー保存
- cloud sync
- 家族共有
- R005再開
- 課金
- AWS resource
- external analytics
- external error reporting
- production公開

## 2. F2/F3からの必須継承

### 保存

- IndexedDBを無料版v1 canonical storageとする。
- 回答確定operationごとにatomic save。
- transaction request単体successを保存成功扱いしない。
- committed / pendingを混同しない。
- 保存失敗時、対象未保存入力を画面上に保持する。

### 競合

- 複数tab競合防止B案。
- expected generationId / globalRevision / record revisionをtransaction内で再確認。
- mismatchではsave停止。
- force overwrite、silent merge、自動競合解決をしない。

### 容量

- committed canonical dataset上限：10,000,000 UTF-8 bytes。
- F2 canonical capacity projectionを唯一の容量算定規範とする。
- 10,000,001以上になるcandidateはcommitしない。
- browser physical quotaを10MB保証と誤認しない。

### 保存失敗6分類

利用者向け分類：
1. ヤットコ10MB上限
2. browser/device保存領域不足の疑い
3. 保存機能の制限
4. 別tab競合
5. 一時的保存失敗
6. 原因不明

- 断定できないerrorを無理に特定分類しない。
- raw exception名を利用者へそのまま出さない。
- conflictは単純retryで上書きさせない。

### backup / emergency

- normal backupはcommitted datasetだけ。
- committed partial/completed/unansweredをF2/F3規範どおり保持。
- pendingはnormal backupへ入れない。
- 保存失敗時のemergency fileのみpendingを別領域へ持てる。
- 未退避件数・範囲を表示。
- file生成/download失敗を成功表示しない。
- 元画面の未保存入力をclearしない。

### restore

- strict import validation。
- plaintext JSON v1。
- SHA-256は破損検出であり真正性/暗号化保証ではない。
- 利用者明示確認後のfull replaceのみ。
- automatic merge禁止。
- preview conflict guard。
- preflightとIndexedDB readwrite transactionを分離。
- GUARD→CLEAR→PUT→READBACK request-chain。
- transaction内Web Crypto/async wait禁止。
- readback canonical bytes同期照合。
- mismatch/abort/quota等で旧正本維持。
- transaction complete後だけsuccess。
- restore後はfresh generation。

### pending reapply

- snapshot restoreとpending reapplyは別operation。
- pending auto commit禁止。
- content/value一致だけでalready-applied判定しない。
- sourceFileId / restored generation / operationId / same-session receipt / revisionを確認。
- proof喪失時はauto applyもauto skipもしない。
- browser restart跨ぎautomatic exactly-once resumeは提供しない。

### private mode

- 専用自動検知・強制blockを追加しない。
- 利用開始画面の注意表示＋原因不明保存errorの補足方式を維持。
- 永続性を保証しない。

### 禁止情報

保存・backup・import対象にしない：
- password
- PIN / 暗証番号
- device passcode
- OTP / OTP seed
- recovery code
- private key / seed phrase
- full card number / CVV
- passkey secret
- API key / access token
- SSH private key
- その他直接ログイン・送金・資産移動に使えるsecret

otherServiceName以外の自由メモを追加しない。

## 3. ACTIVE registry gate

別紙`YTK-F4-version-registry-proposal-20261015.md`のregistryと、`workflow/specs/YTK-F4-canonical-question-manifest-v1.json` が独立レビューを通りACTIVE bindingされるまでは：

- production normal backup entrypointを有効化しない。
- production import/restore entrypointを有効化しない。
- unknown versionを暫定acceptしない。
- 仮versionで生成したfileを正式backupと表示しない。

F4実装を人間が許可した場合でも、registryが未ACTIVEならversion依存機能はfeature gateで停止する。

## 3.1 canonical question manifest gate

F4-R01対応として、質問semanticのsingle sourceを以下へ固定する。

- `workflow/specs/YTK-F4-canonical-question-manifest-v1.json`
- blob：`4a9950b19813e74bc51de2246465096818d375ac`
- questionSchemaVersion：`ytk-qm-gitblob-4a9950b19813e74bc51de2246465096818d375ac`

実装時MUST：
- question key / enum / condition / unanswered presence / validator bindingをmanifestから直接利用または自動生成する。
- hand-written duplicate tableをvalidator、serializer、importer、restore validatorへ作らない。
- build/F5でmanifest blob SHAとquestionSchemaVersionをexact照合する。
- runtime generated manifestとnormative JSONをdeep-equal検証する。
- mismatch時はbuild/test FAILかつproduction export/import/restore feature gateを閉じる。

manifestのdisplay label非保持方針により、UI文言変更だけではversion bumpしない。canonical semantic変更はmanifest変更→blob SHA変更→questionSchemaVersion更新を必須とする。

## 4. F4計測・外部通信方針

### 4.1 v1第一候補

**外部analyticsなし、外部error loggingなし、整理データの外部送信なし。**

F4無料版v1へ以下を追加しない：
- Google Analytics等analytics SDK
- Sentry等remote error/crash reporting
- session replay
- heatmap
- remote APM
- external logging endpoint
- user behavior event送信
- backup/restore telemetry upload

### 4.2 外部送信禁止データ

少なくとも以下をnetworkへ送らない。

- category整理内容
- service名
- serviceCatalogIdと利用者回答の組合せ
- 回答
- 本人意向
- otherServiceName
- pending内容
- IndexedDB内容
- backup/restore file本文
- checksum対象本文
- raw file名に利用者由来内容
- secret-like入力

### 4.3 production logging

- production consoleへ整理データ・file本文・回答値を出さない。
- 保存errorは利用者向け6分類codeと、秘密を含まない最小internal codeへmapping。
- test/debug buildでfault injectionを使う場合もfixtureだけを使用。
- production buildではdebug/fault-injection UIを無効化。

### 4.4 将来analyticsを導入する場合

別設計・別レビュー・人間承認が必要。

最低条件候補：
- purposeを明記
- event allowlist
- data minimization
- service名/回答/本人意向/自由入力/file本文を送らない
- retention
- third-party processor
- privacy notice
- consent/opt-out要否
- CSP/connect-src変更
- F5/F6 network観測

今回F4へ先回り実装しない。

## 5. XSS / injection境界

- user-controlled textはHTMLとして解釈しない。
- otherServiceName、import preview等は`textContent`相当でrender。
- `innerHTML` / HTML string concatenationへ利用者値を入れない。
- DOM attributeへ利用者値を入れる場合は用途別allowlistを使う。
- `javascript:` URL等のuser URL入力機能を作らない。
- backup/import JSONをDOMへraw HTML表示しない。
- imported unknown fieldを表示して救済しない。strict reject。
- dynamic code generation（`eval` / `new Function`）をproduction appへ使わない。
- third-party scriptを追加しない案を第一候補。
- deployment CSPはF7公開審査前に確認し、unapproved network endpointを許可しない。
- application initiated `fetch / XMLHttpRequest / sendBeacon / WebSocket / EventSource` はv1機能として不要。追加する場合は別審査。

## 6. file resource limits

F3承認上、以下は**PROVISIONAL**。

- raw file：16,000,000 bytes
- emergency pending：1,000,000 bytes
- operations：256

F4実装では候補guardとしてコード化してよいのは、人間F4開始承認後の実装範囲内のみ。
ただし：
- 「安全な正式上限」とコメント/UI/documentで断定しない。
- F5/F6実測前に引上げない。
- iPhone SafariでNOT VERIFIABLE/FAILなら引下げを再審査。
- F2 committed 10,000,000 bytesはPROVISIONALではなく承認済み上限。

## 7. version/ID validation

F4実装はACTIVE registryだけをcompile-time/runtime allowlistとして持つ。

- fileFormatVersion exact match。
- schemaVersion/questionSchemaVersion accepted pair exact match。
- recordId/generationId grammar exact。
- unknown/old/future version reject。
- unknown ID、duplicate ID、category mismatch reject。
- automatic migrationなし。
- invalid IDを生成し直してimport救済しない。

## 8. implementation architecture boundary

推奨module分離：
- registry constants / validators
- canonical schema validators
- ID generators
- save coordinator
- capacity projector
- conflict guard
- error classifier
- normal backup serializer
- emergency pending serializer
- strict importer
- restore preflight
- restore transaction state machine
- pending reapply state machine
- local UI adapter

目的：
- F5でunit/integration fault injectionしやすくする。
- user UIとstorage logicを密結合しない。
- F2/F3承認規範を1か所に重複実装しない。

## 9. F5/F6へ渡す追加gate

**NOT RUN。**

F5：
- registry exact-match。
- canonical question manifest parse / count / exact enum / condition一致。
- manifest Git blob SHAとquestionSchemaVersion exact一致。
- runtime/generated manifest deep-equal。不一致時FAIL。
- UUID grammar/generator/collision。
- no-network unit test。
- sensitive log sink test。
- XSS rendering test。
- production buildでfault injection disabled。
- save/restore existing F2/F3 test plan。

F6：
- PC Chrome/iPhone SafariでID generation。
- browser restart / multi-tab generation mismatch。
- Network panelで整理操作・backup・restore時のapplication data外部送信0。
- consoleに整理内容/file本文0。
- PROVISIONAL file limit performance/memory。

## 10. F4実装開始gate

以下すべて必要。

1. F2 APPROVED。
2. F3 APPROVED。
3. 本version registry案の制作管理室独立レビュー。
4. registry ACTIVE bindingについて必要な人間承認。
5. F4技術境界の制作管理室独立レビュー。
6. **人間による明示的な「F4実装開始」承認。**

F5/F6はF4実装後に実施する工程であり、F4開始前PASSは要求しない。ただし既存計画を勝手に削らない。

## 11. 変更・非変更

F2/F3承認semantic変更：**なし**。

追加したのは未確定だった技術bindingとF4 implementation boundaryだけ。

R005、課金、AWS、production公開は全て禁止状態を維持。
