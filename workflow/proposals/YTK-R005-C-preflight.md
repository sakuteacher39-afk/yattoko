# ヤットコ／YTK-R005-C 実装前プリフライト

- 工程: YTK-R005-C / C0
- 状態: 人間承認待ち
- 作成日: 2026-10-04
- 対象: 完全ダミーデータのみを用いた最小サーバープロトタイプの実装前確認
- 前提:
  - YTK-R003 保存データ仕様: APPROVED
  - YTK-R004 認証設計: APPROVED
  - YTK-R005-A 技術選定調査: APPROVED
  - YTK-R005-B 非公開アーキテクチャ設計: APPROVED
- 今回実施: 設計確認・公式仕様確認のみ
- 今回未実施: 外部resource作成、契約、課金、credential発行、DB作成、実装、外部接続、C1以降

## 1. C0結論

### C1開始可否

**可。人間承認後に限る。**

C1は外部サービスを一切作成せず、

- Application API/BFF骨格
- server-side session abstraction
- Auth0 mock / signed test issuer
- A0 / A1 / A2 policy
- internal userId / Auth0 principal / provider identity model
- strict request schema
- D区分 reject
- R001 / R002整合ロジック
- 「その他」service名validation
- protected / frozen / cooling-off
- encryption interface
- Deletion Journal interface
- allowlist logger
- local PostgreSQL用role / RLS / constraint SQL
- R005-D用test harness

までを完全ローカルで構築できる。

### C2開始可否

**不可。現在はBLOCKED。**

理由:

C2は外部resource作成・credential発行・一部有料resource発生の可能性を伴うため、
本C0と将来C1の人間承認後に、
resourceごとに目的・費用・削除方法・保存情報を提示し、
個別承認を得る必要がある。

技術設計上の致命的ブロッカーは現時点で確認されていないが、
以下の「外部環境でしか最終確認できない条件」はC2/C3でfail closed確認が必要。

- Auth0実tenantでPasskey login eventが期待どおり取得できること
- Auth0 ActionからA2 claimを署名tokenへ載せられること
- 実際のPasskey login logでpasskey認証を識別できること
- Supabase custom non-BYPASSRLS roleでpooler接続できること
- transaction-local contextがpool reuse後に漏れないこと
- Supabase network restrictionとhosting固定egressが両立すること
- KMS / Deletion JournalのIAM分離が実際に構成可能であること

これらが未確認の間、
クラウド保存gateは有効化しない。

## 2. 推奨実装候補構成

### 2.1 Application API runtime

第一候補:

**Node.js 24 LTS + TypeScript**

理由:

- 現行ローカル環境と一致しやすい
- AWS LambdaでNode.js 24 managed runtimeがGA
- 2028-04までLambda runtime support予定
- Auth0 / PostgreSQL / AWS SDKの公式・成熟ライブラリが揃う
- C1 localとC2 serverlessでdomain logicを共有しやすい

HTTP layer候補:

**Fastify**

用途:

- strict JSON Schema
- request lifecycle制御
- content-type制限
- body size上限
- route単位authorization hook
- custom allowlist logger

採用時はloggerのrequest / response body出力を明示的に無効化する。

### 2.2 Application API hosting候補

第一候補:

**AWS Lambda + API Gateway / ap-northeast-1**

理由:

- Node.js 24 managed runtime
- IAM roleでKMS / DynamoDB / S3権限を細かく分離可能
- Application layer encryption、session store、Deletion JournalをAWS内で統一しやすい
- 低トラフィックのdev検証はcompute費を抑えやすい
- C2でresource削除が比較的明確

ただし固定egressを要求する場合、

**Lambda → private subnet → NAT Gateway + Elastic IP → Supabase**

が第一候補となり、
NAT Gatewayは時間課金・データ処理課金が発生する。

そのためC2でNAT Gatewayを作成する場合は
必ず別途人間承認を得る。

第二候補:

**常駐container runtime**
（ECS/Fargate等）

Lambda + NAT / connection behaviorが過度に複雑または高コストな場合に再評価する。

### 2.3 認証

第一候補:

**Auth0 Universal Login + Database Connection Passkey**

Browser:

- Auth0 Universal Loginへredirect
- Browser自身はA2判定しない

Application API:

- OAuth/OIDC callback受領
- Auth0署名token検証
- Passkey method確認
- internal userId mapping
- server-side session発行

### 2.4 session store

C1:

**In-memory SessionStore mock**

- deterministic fake clock
- explicit revoke
- absolute expiry
- inactivity expiry
- session_version

C2以降第一候補:

**Amazon DynamoDB**

理由:

- serverless
- IAMでApplication runtimeだけに限定可能
- 条件付きwriteでrevocation raceを扱いやすい
- TTL利用可能
- AWS always-free相当枠がある

重要:

DynamoDB TTLは即時削除ではなく、
期限切れitemが数日残る場合がある。

したがってsession validityはTTL削除に依存せず、
Application APIが必ず

- expires_at
- last_seen_at
- revoked_at
- session_version

を確認する。

TTLは物理cleanup専用。

### 2.5 保存DB

第一候補:

**Supabase Postgres**

Browserから直接接続しない。

Data API:

**無効化を第一候補。**

接続:

**Supavisor shared transaction pooler**

をAWS Lambda利用時の第一候補とする。

理由:

- serverless / short-lived connection向け
- IPv4対応
- connection数抑制
- custom role接続可能

制約:

- transaction modeはprepared statements非対応
- driverでprepared statementを無効化する
- session stateをconnectionへ残さない
- request contextは必ずtransaction-local

C1ではlocal PostgreSQLで同じSQL role / RLS / transaction-local contextを再現する。

## 3. Auth0継続可否

### 判定

**継続可能。現時点でCognito切替条件には該当しない。**

Auth0公式ではDatabase Connection PasskeyをWebAuthn/FIDO2ベースのフィッシング耐性認証として提供し、
ログイン時にユーザーのcredential managerがdevice credentialによる認証を要求する。

Auth0はPost-Login Actionの
`event.authentication.methods`
からPasskey利用を判定できる。

tenant logではPasskey loginに
`performed_amr: ["phr"]`
が記録される仕様も確認できる。

### Auth0 Passkeyのuser verification

R005-BのA2をそのまま「WebAuthnという文字があればA2」とはしない。

C2/C3で使用するA2対象を以下へ限定する。

- Auth0 Database Connection
- New Universal Login
- Passkey enabled
- Identifier First
- Auth0 managed Passkey login
- Post-Login Actionで `method.name === "passkey"`
- 実tenant logでPasskey authentication eventを確認

Auth0公式のWebAuthn MFA資料では、
Device Biometricsはuser verificationが常に行われ、
Security KeyでもPINを要求することでuser verificationを構成できる。

R005-C初期では
**Device Biometrics / synced passkey系をA2標準対象**
とし、
generic security keyはuser verification要求が確認できる場合だけA2候補とする。

### A2信頼根

A2は以下を重ねる。

1. Auth0 managed Universal Login
2. Auth0 Database Connection Passkey設定
3. Auth0側WebAuthn challenge
4. Post-Login ActionによるPasskey method検出
5. Auth0署名token内のnamespaced assurance claim
6. Application APIのJWKS / issuer / audience / expiry検証
7. Application server-side sessionへのassurance固定
8. C3でtenant logのpasskey event確認
9. R005-DでA0/A1/A2混同試験

Actionだけを唯一の信頼根にしない。

### fail closed

以下ではA2にしない。

- claim欠落
- Action version未知
- issuer違い
- audience違い
- token期限切れ
- method不明
- social login単独
- password単独
- email OTP
- magic link
- 実tenantでPasskey event確認が取れない

## 4. Auth0必要plan

### C1

Auth0不使用。

費用:

**0円**

### C2/C3でPasskey / A2だけを確認

Auth0 Freeで

- Passkeys
- Auth0 Database Connection
- Actions 5枠
- dummy user

が利用可能。

よって
Passkey / A2の最小外部検証はFreeで開始できる候補。

### identity link / unlinkまで実providerで確認

Auth0 pricing上、

**Account LinkingはFreeでは不可、Essentials以上。**

2026-10-04公式参考価格:

- Free: USD 0 / month
- Essentials: USD 35 / month / 500 MAU表示
- Professional: USD 240 / month / 500 MAU表示

Essentialsでは、

- Account Linking
- Pro MFA
- Production / Development environment分離
- 5日log retention
- 1 Log Stream

等が利用可能。

### 結論

**C2初期はFree候補。**

ただしR005-Dまでに
Auth0実account linkingを攻撃試験する場合、
Essentials以上が必要になる可能性が高い。

契約・課金は今回行わない。

## 5. internal userId / identity mapping

R005-Bをそのまま維持する。

### owner正本

**Yattoko internal UUID**

### Auth0 principal

**Auth0 issuer + token sub**

### linked provider identity

**provider + connection + provider subject/user_id**

### email

通知 / verification / recovery開始だけ。

owner正本にしない。

### C1 model

完全ローカルで以下を実装可能。

```text
YattokoUser
AuthPrincipal
ProviderIdentity
IdentityOperation
```

DB constraint候補:

- UNIQUE(auth_issuer, auth_sub)
- UNIQUE(provider, connection, provider_subject)
- provider identity二重owner禁止
- owner UUID immutable

link / unlink / primary changeは
local fake AuthProviderで分散失敗を注入できるinterfaceにする。

## 6. ytk_user_request role

### C0正式候補

```text
ytk_user_request
  LOGIN
  NOSUPERUSER
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION
  NOBYPASSRLS
```

禁止:

- schema owner
- table owner
- DDL
- CREATE FUNCTION
- TRUNCATE
- SET ROLE to privileged role
- auth mapping table直接閲覧
- deletion journal削除
- migration
- backup
- KMS
- cross-user admin query

許可:

app data tableについてendpointに必要な

- SELECT
- INSERT
- UPDATE
- DELETE

だけ。

owner_user_id columnは
UPDATE grant対象外とする。

### login callback用identity lookup

通常content CRUD roleと分離する。

候補role:

`ytk_identity_lookup`

許可:

- active Auth0 principal lookup
- active provider identity lookup
- identity operation状態確認

禁止:

- user content table
- encrypted payload
- deletion
- migration

理由:

content CRUD credentialに
identity mapping全件閲覧まで持たせない。

## 7. transaction-local user context

### C0採用候補

Application APIが認証・mapping後に得た
internal userIdをtransaction-local custom settingへ入れる。

概念:

```sql
BEGIN;
SELECT set_config('app.current_user_id', '<uuid>', true);
SELECT set_config('app.assurance_level', 'A2', true);
-- CRUD
COMMIT;
```

第3引数 `true` によりtransaction-localとする。

connection pool reuse後へ値を残さない。

### DBへ渡すもの

- internal userId
- assurance level

だけを第一候補とする。

provider emailや整理内容をDB contextへ入れない。

### 理由

Auth0 issuer + subject → internal userId mappingは
Application APIで確定済み。

RLSにはowner UUIDだけを渡した方が

- policy単純化
- identity mapping table露出減
- provider変更影響減

につながる。

RLS threat boundaryはR005-B記載どおりであり、
runtime完全侵害から独立したtrust boundaryとは扱わない。

## 8. RLS helper

C0第一候補:

**SECURITY INVOKERの単純helper**

```text
ytk_current_user_id()
ytk_current_assurance_level()
```

役割:

- `current_setting(..., true)` を読む
- UUID / enum形式をstrict parse
- missing / malformedならNULLまたは例外でfail closed
- table accessを行わない
- dynamic SQLなし
- fixed search_path

初期版ではSECURITY DEFINERを使用しない。

理由:

internal userIdは既にApplication APIで解決するため、
RLS helper内でauth mapping tableを読む必要がない。

これによりdefiner privilegeの攻撃面を減らす。

RLS例:

```text
USING (
  owner_user_id = ytk_current_user_id()
  AND ytk_current_assurance_level() = 'A2'
)
```

INSERT / UPDATEは `WITH CHECK` も同様に適用。

## 9. Application layer encryption

### C1 interface

```text
CryptoProvider
  encrypt(plaintext, context)
  decrypt(ciphertext, context)
```

C1では外部KMSを使わない。

テスト専用crypto adapterは、

- process起動時に生成したephemeral key
- disk保存なし
- Git保存なし
- dummy dataのみ

とする。

**production cryptoの代替とは扱わない。**

目的は

- encryption boundary
- payload schema
- AAD/context
- ciphertext swap test

を先に作ること。

### C2以降第一候補

**AWS KMS + AWS Encryption SDK for JavaScript / Node.js**

AWS公式SDKはKMS keyringによるenvelope encryptionを提供し、
encryption contextをciphertextへ暗号学的に関連付けられる。

候補encryption context:

- opaque internal userId
- record UUID
- record type
- schemaVersion

注意:

encryption contextは秘密情報として扱えないため、
service名・answer・email等を入れない。

### encryption対象

R005-B承認どおり、

- R001 five answers
- category intention
- service catalog ID
- その他service名
- usage state
- service intention override
- conditional answers

を候補とする。

## 10. KMS候補

第一候補:

**AWS KMS customer managed symmetric key / ap-northeast-1**

用途:

Application layer encryptionのwrapping key。

権限:

Application API runtime:

- GenerateDataKey
- Decrypt

等、必要操作だけ。

DB / migration / normal admin:

- decrypt不可

Deletion Journal writer:

- encryption用KMSが必要でも別permission set

break-glass:

通常はdecryptなし。
必要時は別承認。

### 費用

customer managed KMS keyは
月額key費用 + API request費用が発生する。

今回作成しない。

C1は完全mockなので費用0。

## 11. Deletion Journal独立保存候補

第一候補:

**Amazon S3 + Versioning + Object Lock**

primary Supabase DBとは別system。

C2/C3 dummy環境候補:

- dedicated journal bucket
- Versioning
- Object Lock Governance
- writer roleはPutObject中心
- DeleteObjectVersionなし
- BypassGovernanceRetentionなし
- restore roleはread-only
- lifecycle adminは別role

理由:

S3 Object LockはWORM modelでobject versionの上書き・削除をretention中制限できる。

### production再審査

本番前には

- Governance
- Compliance
- separate AWS account
- cross-region replication

を比較する。

Compliance modeはretention中の削除自由度が非常に低いため、
dummy devで安易に採用しない。

### C1

interfaceのみ。

```text
DeletionJournal
  append(event)
  listAfter(cutoff)
  verifyIntegrity()
```

local implementation:

append-only file / in-memory mock。

実内容:

- opaque IDs
- generation
- timestamp
- delete type
- cutoff
- schemaVersion

だけ。

## 12. API / DB network restriction

### C2第一候補

Application API:

AWS Lambda / ap-northeast-1

DB:

Supabase Tokyo

経路:

```text
Lambda
→ private subnet
→ NAT Gateway
→ Elastic IP
→ Supabase shared transaction pooler
```

Supabase Network Restrictionsへ
NAT Gatewayの固定EIP / CIDRだけをallowlistする。

SSL enforcementも有効化候補。

Supabase Network Restrictionsは
Postgres / pooler接続前にIP allowlistを適用できる。

### 費用注意

NAT Gatewayは

- 稼働時間
- 処理データ量

で課金される。

Lambda自体の低トラフィック費用より
NATの固定費の方が支配的になる可能性がある。

したがってNAT Gateway作成は
**独立した人間承認項目**とする。

### PrivateLink

Supabase PrivateLinkはより強い候補だが
Enterprise級機能として扱い、
R005-Cの初期devでは採用しない。

## 13. strict request schema

### C1で実装可能

JSON Schema / equivalentで、

- routeごとのfield allowlist
- unknown field reject
- additionalProperties=false
- enum固定
- string length
- content-type
- body size

を強制する。

### 自由JSON

**作らない。**

以下のようなfieldは禁止。

- metadata: {}
- extra: {}
- notes: {}
- custom: {}
- raw: {}

unknown dataの避難所を作らない。

## 14. D区分 reject

API schemaにD区分fieldを作らない。

unknown fieldとしても拒否する。

最低対象:

- password
- pin
- passcode
- otp
- otpSeed
- recoveryCode
- privateKey
- seedPhrase
- fullCardNumber
- cvv
- cvc
- passkeyPrivate
- apiKey
- accessToken
- sshPrivateKey
- cloudSecretKey
- deployKey
- sessionCookie
- sessionToken
- secretQuestionAnswer

case / naming variationもsecurity testへ入れる。

## 15. 「その他」service名 validation

C1でserver-side実装可能。

順序:

1. type確認
2. Unicode NFKC
3. trim
4. whitespace normalize
5. code point長確認
6. control / bidi / zero-width reject
7. service-name用途allowlist
8. obvious secret candidate検知
9. logへ本文を渡さずreject

初期長:

**1〜80 Unicode code points**

拒否候補:

- email address形式
- phone number形式
- Luhn成立card-like number
- JWT形状
- PEM header
- token prefix
- `password=`
- `pin:`
- recovery code形状
- 12/24語mnemonic-like phrase

keyword単独では拒否しない。

例:

`1Password`

は正規service名として通る必要がある。

## 16. allowlist logging

### C1で固定

logger API自体をallowlist modelにする。

入力:

- eventType
- opaqueUserId
- opaqueResourceId
- correlationId
- result
- errorCode
- durationMs
- appVersion
- schemaVersion
- assuranceLevel

禁止:

- req.body
- res.body
- request object丸ごと
- service name
- その他service名
- intention
- asset
- familyKnow
- answers
- token
- cookie
- plaintext
- ciphertext全文
- credential

framework default access logも
header / query / body出力を監査する。

## 17. local-firstで実装可能な範囲

C1で外部resourceなしに実装可能:

- Node.js / TypeScript project骨格
- route / domain / adapter分離
- AuthProvider interface
- fake Auth0 issuer
- local JWKS
- signed dummy JWT
- A0 / A1 / A2
- fresh auth
- internal userId
- 3層identity model
- identity operation state machine
- link/unlink failure injection
- session store abstraction
- in-memory session
- account state
- cooling-off
- request schema
- D reject
- service-name validator
- R001 / R002 consistency
- CryptoProvider interface
- local test crypto adapter
- DeletionJournal interface
- append-only local test journal
- local PostgreSQL schema
- custom DB roles
- RLS
- constraints
- transaction-local context
- connection pool claim leakage test
- allowlist logger
- test harness
- restore simulation
- deletion journal replay

### local PostgreSQL

Docker等が利用可能なら
actual PostgreSQLをlocal containerで使用する。

Dockerがなくても、
C1のdomain / API skeletonは進められる。

ただしRLS / role / transaction semanticsは
PostgreSQL互換mockではなく
**実PostgreSQLで確認することをC1完了条件**
とする。

## 18. 外部dev環境が必要な範囲

以下はlocal mockだけでは最終確認できない。

### Auth0

- Universal Login
- Passkey actual enrollment
- iPhone / PC passkey UX
- Post-Login Action event shape
- signed A2 custom claim
- tenant log `performed_amr`
- Auth0 logout / revoke behavior
- actual Management API scope
- account linking（Essentials以上候補）

### Supabase

- real project
- custom DB role via Supavisor
- transaction pooler behavior
- network restrictions
- SSL enforcement
- Data API disable
- actual backup availability
- secret / publishable key exposure checks

### AWS

- Lambda runtime
- DynamoDB session store
- KMS
- Encryption SDK + KMS permission
- S3 Object Lock
- NAT fixed egress
- IAM separation
- CloudTrail audit

### 実機

- PC browser
- iPhone Safari
- real passkey prompt

## 19. R005-C費用候補

### C0

**0円**

### C1

原則:

**0円**

ローカルのみ。

### C2/C3

費用が発生する可能性あり。

#### Auth0

- FreeでPasskey / Actionsの一部検証可能
- Account Linking実検証はEssentials以上の可能性
- Essentials公式参考: USD 35 / month

#### Supabase

- Free: USD 0
- 2 active free projectsまで
- 500MB DB
- inactive約1週間でpause可能
- automatic backupsなし

Pro:

- USD 25 / monthから
- daily backups 7日
- paid projectはinactive pauseなし

R005-Cのdummy CRUD / RLSだけならFree候補。

backup実環境検証まで要求する場合は
Proが必要になる可能性が高い。

#### AWS Lambda

free tier:

- 月100万requests
- 400,000 GB-seconds

小規模dummy検証ではcompute自体は無料枠内の可能性が高い。

#### DynamoDB

always free:

- 25GB storage
- provisioned 25 RCU / 25 WCU

dummy session検証では無料枠内候補。

#### AWS KMS

customer managed keyは
月額key料金 + request料金あり。

**少額でも有料resource。**

#### S3

保存量・request課金あり。

dummy journalなら小額候補だが0円保証はしない。

#### NAT Gateway

**継続的な時間課金 + data processing課金。**

R005-C外部環境の費用面で最重要注意項目。

作成前に必ず見積りと人間承認。

### 費用判定

C2を安全構成で行う場合、
完全無料を保証できない。

特に

- KMS
- S3
- NAT Gateway
- Auth0 Essentials
- Supabase Pro

は有料化候補。

## 20. 人間操作候補

C2承認時にresource単位で個別提示する。

### Auth0

人間操作候補:

- tenant作成
- region選択
- plan選択
- test application作成
- test database connection
- Universal Login
- Passkey enable
- Action deploy
- callback / logout URL
- dummy test user

### Supabase

- project作成
- region選択
- plan選択
- DB password / credential管理
- Data API disable
- network restrictions
- SSL enforcement

### AWS

- AWS account / project選択
- billing確認
- budget alert
- Lambda / API Gateway
- DynamoDB
- KMS key
- S3 journal bucket / Object Lock
- VPC / subnet / NAT / EIP
- IAM role

### 人間確認が必要なもの

- 有料plan契約
- 月額固定費発生resource
- card登録 / billing
- vendor account作成
- domain / callback設定
- production相当security設定

一括承認しない。

## 21. 安全ブロッカー確認

### 21.1 A2判定の信頼根

判定:

**C1開始を妨げない。設計解決済み。**

根:

- Auth0 managed passkey
- Action method detection
- signed token
- API JWT validation
- server-side session
- external C3でtenant log確認

C2作成後、
actual eventが想定と異なればcloud save gateを閉じたままSTOP。

### 21.2 Passkey user verification

判定:

**設計上は解決。外部実証待ち。**

Device BiometricsではAuth0公式にuser verificationが常に行われる。

C3ではactual Passkey flowを確認し、
generic security keyをA2化する場合はPIN / UV要求を別確認する。

### 21.3 通常DB runtimeが強権限credentialを必要とするか

判定:

**不要。**

custom `ytk_user_request` login roleを使用する。

secret key / legacy service_role / BYPASSRLSは通常CRUDに不要。

### 21.4 RLS適用role

判定:

**設計可能。**

Supabaseはcustom role connectionをpoolerで利用可能。
Postgres RLS + transaction-local contextをC1 actual Postgresで検証する。

### 21.5 internal userId mapping

判定:

**解決済み。**

owner正本 = internal UUID。

Auth0 principal / provider identity / emailを分離済み。

### 21.6 identity link / unlink途中失敗

判定:

**C1で実装可能。**

operation ID / state / idempotency / retry / compensation / reconciliation / fail closedをmock providerで実装・試験可能。

### 21.7 D区分自由JSON

判定:

**禁止。**

catch-all JSON fieldなし。

### 21.8 request body log

判定:

**C1で防止可能。**

allowlist loggerを独自boundaryとする。

### 21.9 encryption key管理

判定:

**C1はephemeral mock、C2候補はAWS KMS。**

KMS resource作成は別承認。

### 21.10 Deletion Journal独立

判定:

**設計解決済み。**

C1 interface / local append-only。
C2候補S3 Object Lock。

### 21.11 実userが必要か

判定:

**不要。**

全試験dummyで可能。

実メール本文・実service情報・実金融情報は不要。

### 21.12 費用 / 契約

判定:

**C2 blocker。**

人間未承認のため
有料resourceを一切作らない。

## 22. C2開始条件

以下すべて必要。

1. C0人間APPROVED
2. C1実装完了
3. C1自動test PASS
4. C1レビューAPPROVED
5. 外部resource一覧確定
6. resourceごとの費用提示
7. resourceごとの保存データ提示
8. resourceごとの削除方法提示
9. 人間が必要なaccount / billing操作を理解
10. Auth0 tenant作成の個別承認
11. Supabase project作成の個別承認
12. AWS resource作成の個別承認
13. KMS有料resource承認
14. NAT Gateway等固定費resource承認
15. credential保管方式承認
16. dummy data naming / test identity確認

どれか1つでも未承認ならC2へ進まない。

## 23. R005-D test strategy

C1からtest IDを固定する。

### AUTH

- YTK-D-AUTH-001 JWT signature tamper
- YTK-D-AUTH-002 wrong issuer
- YTK-D-AUTH-003 wrong audience
- YTK-D-AUTH-004 expired token
- YTK-D-AUTH-005 A0 data read
- YTK-D-AUTH-006 A1 data read
- YTK-D-AUTH-007 missing A2 claim
- YTK-D-AUTH-008 stale fresh auth
- YTK-D-AUTH-009 revoked server session

### OWNER / API

- YTK-D-OWN-001 URL userId tamper
- YTK-D-OWN-002 body ownerId injection
- YTK-D-OWN-003 mass assignment
- YTK-D-OWN-004 cross-user resource ID

### RLS

- YTK-D-RLS-001 A→A SELECT
- YTK-D-RLS-002 A→B SELECT
- YTK-D-RLS-003 B→A SELECT
- YTK-D-RLS-004 cross-user INSERT
- YTK-D-RLS-005 cross-user UPDATE
- YTK-D-RLS-006 owner change UPDATE
- YTK-D-RLS-007 cross-user DELETE
- YTK-D-RLS-008 missing user context
- YTK-D-RLS-009 A1 context
- YTK-D-RLS-010 pool context leakage

### INPUT

- YTK-D-IN-001 unknown field
- YTK-D-IN-002 password field
- YTK-D-IN-003 token field
- YTK-D-IN-004 metadata catch-all
- YTK-D-IN-005 secret-like service name
- YTK-D-IN-006 legitimate 1Password

### SURFACE / SECRET

- YTK-D-SURF-001 Data API disabled
- YTK-D-SURF-002 public schema unavailable
- YTK-D-SURF-003 Browser bundle secret scan
- YTK-D-SURF-004 Git history secret scan

### CRYPTO

- YTK-D-CRYPTO-001 plaintext absent from DB
- YTK-D-CRYPTO-002 ciphertext cross-record swap
- YTK-D-CRYPTO-003 ciphertext cross-user swap
- YTK-D-CRYPTO-004 decrypt without KMS permission

### SESSION

- YTK-D-SES-001 revoke current session
- YTK-D-SES-002 revoke all sessions
- YTK-D-SES-003 expiry
- YTK-D-SES-004 inactivity
- YTK-D-SES-005 frozen account

### DELETE / RESTORE

- YTK-D-DEL-001 service delete
- YTK-D-DEL-002 category delete
- YTK-D-DEL-003 all content delete
- YTK-D-DEL-004 account closing
- YTK-D-DEL-005 restore deleted record
- YTK-D-DEL-006 journal replay
- YTK-D-DEL-007 missing journal fail closed

### LOG

- YTK-D-LOG-001 request body absent
- YTK-D-LOG-002 response body absent
- YTK-D-LOG-003 service name absent
- YTK-D-LOG-004 token / cookie absent
- YTK-D-LOG-005 validation error value absent

R005-Cでは各実装componentにこのIDを対応付ける。

R005-Dで実攻撃試験PASSするまで
「安全」と判定しない。

## 24. 公式確認資料

### Auth0

- Passkeys for Database Connections
  https://auth0.com/docs/authenticate/database-connections/passkeys
- Detecting Passkey Usage in Post-Login Actions
  https://support.auth0.com/center/s/article/detecting-passkey-usage-in-auth0-post-login-actions
- Monitor Passkey Events in Tenant Logs
  https://auth0.com/docs/authenticate/database-connections/passkeys/monitor-passkey-events-in-tenant-logs
- WebAuthn as MFA
  https://auth0.com/docs/secure/multi-factor-authentication/webauthn-as-mfa
- Auth0 Pricing
  https://auth0.com/pricing

確認事項:

- PasskeyはFreeから利用可能
- Account LinkingはEssentials以上
- ActionsはFree 5枠
- Device Biometricsのuser verification
- Passkey login event識別

### Supabase

- Connect to your database
  https://supabase.com/docs/guides/database/connecting-to-postgres
- withPostgresClient
  https://supabase.com/docs/reference/server/middleware-withpostgresclient
- Row Level Security
  https://supabase.com/docs/guides/database/postgres/row-level-security
- Network Restrictions
  https://supabase.com/docs/guides/platform/network-restrictions
- Pricing
  https://supabase.com/pricing

確認事項:

- transaction poolerはserverless向け
- custom role接続可能
- transaction-local claims + local roleでpool leakageを防ぐ公式pattern
- secret keyはRLS bypass
- network restrictionあり
- Freeはautomatic backupなし
- ProはUSD 25 / monthから、daily backup 7日

### AWS

- Lambda Node.js 24
  https://docs.aws.amazon.com/lambda/latest/dg/lambda-nodejs.html
- Lambda pricing
  https://aws.amazon.com/lambda/pricing/
- Lambda VPC internet access
  https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc-internet.html
- DynamoDB TTL
  https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html
- AWS Encryption SDK for JavaScript
  https://docs.aws.amazon.com/encryption-sdk/latest/developer-guide/js-examples.html
- AWS KMS
  https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html
- S3 Object Lock
  https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html

## 25. C0推奨決定

1. Runtime: Node.js 24 + TypeScript
2. API framework: Fastify候補
3. C2 hosting第一候補: AWS Lambda + API Gateway / Tokyo
4. Session C1: in-memory mock
5. Session C2: DynamoDB候補
6. Auth: Auth0継続
7. A2: Auth0 managed Database Passkey + Action detection + signed claim + API validation + live log確認
8. DB: Supabase Postgres
9. Connection: shared transaction pooler候補
10. user role: custom non-BYPASSRLS `ytk_user_request`
11. DB context: transaction-local internal userId + assurance level
12. RLS helper: SECURITY INVOKER / no table access
13. Data API: disabled第一候補
14. Crypto C1: ephemeral test adapter
15. Crypto C2: AWS KMS + AWS Encryption SDK候補
16. Journal C1: local append-only interface
17. Journal C2: S3 Object Lock候補
18. Network C2: Lambda VPC + NAT/EIP → Supabase allowlist候補
19. C1: 人間承認後開始可
20. C2: 現時点開始不可

## 26. 今回未確定事項

- Fastify正式採用
- AWS Lambda正式採用
- AWS account / region構成
- NAT Gateway費用
- DynamoDB正式採用
- Auth0 Free / EssentialsのC2実利用範囲
- Auth0 actual Passkey Action event shape
- Auth0 custom claim namespace
- Auth0 Management API scope
- Supabase Free / Pro
- Supabase actual custom role pooler接続
- exact GRANT SQL
- exact RLS SQL
- direct vs shared transaction pooler最終選択
- local PostgreSQL実行方法
- KMS key policy
- AWS Encryption SDK algorithm suite
- S3 Object Lock Governance retention日数
- journal production別AWS account要否
- NAT以外の固定egress案
- session timeout 24h / 1h / fresh 10m最終値
- 2個目A2をproductionで必須化するか
- Passkey非対応者向け代替A2

## 27. 今回未実施

- C1実装
- C2開始
- Auth0 tenant作成
- Cognito User Pool作成
- Supabase project作成
- AWS resource作成
- KMS作成
- S3 bucket作成
- NAT Gateway作成
- DynamoDB作成
- Application API hosting
- contract
- billing
- API key
- OAuth
- DB
- SQL
- credential
- external connection
- dummy user作成
- R005-D実行
- production

## 28. 停止条件

C0はここで完了する。

人間が本成果物をAPPROVEDするまで、

- C1
- C2
- 外部resource作成
- contract
- billing
- credential発行
- implementation

へ進まない。

**人間承認待ちで停止する。**
