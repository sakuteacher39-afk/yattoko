# ヤットコ／YTK-R005-C C2-MIN 実行計画

- 工程: YTK-R005-C / C2-MIN
- 状態: EXECUTION PLAN APPROVED / Phase 6 OFFLINE PREP COMPLETE / HUMAN APPLY PENDING
- 作成日: 2026-10-05
- C1: COMPLETE / PASS
- C2-MIN resource承認: APPROVED
- C2-MIN resource作成: Auth0 + Supabase approved resources created / Phase 6 DB apply not started
- C2-EXT / C2-NET: NOT AUTHORIZED
- C3: NOT AUTHORIZED

## 1. この計画の目的

個別承認済みのC2-MIN resourceだけを使い、

1. Auth0 dev tenant / Application / API / Database Connection / Passkey / Actionを安全に構成する
2. Supabase Free projectでData APIを閉じ、SSLを強制する
3. non-BYPASSRLSの `ytk_user_request` を作る
4. Windows PC上のApplication API/BFFからshared transaction poolerへ接続する
5. 実Supavisor上でRLS / transaction-local context / cross-user遮断を確認できる状態を作る
6. credentialをprocess environmentだけで扱う
7. 外部dummy userを作成せず、Auth0実Passkey loginはC3前の別承認まで保留する

ことを目的とする。

## 2. 今回の承認境界

### 実行してよい

- Auth0 Free tenant
- Auth0 Regular Web Application
- Auth0 API / audience
- Auth0 dedicated Database Connection
- New Universal Login / Identifier First
- Passkey enable
- Post-Login Action作成・deploy
- localhost callback / logout / web origin
- Supabase Free project
- Data API disable
- SSL enforcement
- Supabase shared transaction pooler
- custom login role `ytk_user_request`
- dev専用DB schema / table / RLS / constraints
- Windows process environmentへのdev credential設定
- local BFFからAuth0 OIDC discovery/JWKSへの接続確認
- local BFF / local psqlからSupabaseへの接続確認
- 完全synthetic UUID / dummy rowによるDB isolation確認

### 実行してはいけない

- Auth0 dummy user作成
- test mailbox作成
- 実Passkey enrollment
- Auth0実login
- Auth0 account linking
- paid plan変更
- Supabase Network Restrictions
- AWS resource
- hosting
- KMS / S3 / DynamoDB
- NAT / EIP
- social OAuth
- Cognito
- custom domain
- C3

## 3. 役割分離

### 人間

vendor account / dashboard / billing / secretに触れる操作を担当する。

- Auth0 account / tenant作成
- Supabase project作成
- Free plan確認
- region選択
- dashboard setting変更
- DB admin credential操作
- custom role password入力
- process environmentへのsecret投入
- 最終画面確認
- 各checkpointの実行可否判断

### 構築係

secretを受け取らず、code / SQL / validation / non-secret確認を担当する。

- resource naming draft
- Auth0 Action code
- local BFF adapter
- JWT/JWKS validation
- Supabase migration SQL
- RLS / role verification SQL
- remote test harness
- allowlist logging
- cleanup checklist
- sanitized outputの判定
- GitHub保存

### 共有禁止

人間は以下をChatGPT / GitHubへ貼らない。

- Auth0 Client Secret
- Supabase project DB password
- ytk_user_request password
- session secret
- access token / refresh token
- cookie
- Management API token

構築係へ共有してよいもの:

- Auth0 tenant domain
- Auth0 Client ID
- Auth0 API audience
- Supabase project ref
- pooler host
- pooler port
- role名
- SSL enabled / disabled
- Data API enabled / disabled
- error code
- credentialを伏せたconnection result

## 4. 固定名称候補

人間確認後に使用する。

- Auth0 tenant domain pattern:
  `yattoko-r005c-dev-<unique-suffix>`
  - tenant名は作成後変更できないため、人間が最終確認してから作る

- Auth0 Application:
  `Yattoko R005-C Dev BFF`

- Auth0 API:
  `Yattoko R005-C Dev API`

- API Audience:
  `https://api.yattoko.invalid/r005c`
  - identifier用途のみ
  - public service URLではない

- Auth0 Database Connection:
  `yattoko-r005c-dev-db`

- Auth0 Post-Login Action:
  `YTK R005-C Set Assurance`

- Supabase Project:
  `yattoko-r005c-dev`

- App schema:
  `ytk_private`

- Runtime DB role:
  `ytk_user_request`

- Local BFF:
  `http://localhost:3000`

- Allowed Callback URL:
  `http://localhost:3000/callback`

- Allowed Logout URL:
  `http://localhost:3000`

- Allowed Web Origin:
  `http://localhost:3000`

## 5. Phase 0 — 実行直前確認

### 人間

1. C2-MINだけが承認対象であることを再確認
2. paid planへ変更しないことを確認
3. Auth0 / Supabaseのbilling画面でFree planであることを確認
4. repositoryに `.env` / credential fileがないことを確認
5. C1がcleanな状態か `git status --short` で確認

### 構築係

1. GitHub main HEADを確認
2. C1 21 PASS / PostgreSQL 18.6 PASSが保持されていることを確認
3. C2-MIN用branch / directory namingを確定
4. secretを含まないconfig templateだけ準備する

### Phase 0 GitHub側確認記録

2026-10-05時点:

- GitHub main上のC1 COMPLETE / PASS記録を確認
- ローカル自動テスト21 PASS / PostgreSQL 18.6 PASS記録を確認
- GitHub code searchで以下のsecret関連文字列を確認し該当0件:
  - `.env`
  - `YTK_AUTH0_CLIENT_SECRET`
  - `YTK_DB_PASSWORD`
  - `client_secret`
  - `service_role`
  - `SUPABASE_SERVICE_ROLE_KEY`
- Auth0 / Supabase / AWS resource作成: 0
- 人間PC working tree: clean（`git status --short` 無出力）
- credential発行: 0
- paid plan変更: 0

人間PC側のworking treeはChatGPTから確認できないため、次のhuman checkpointとして `git status --short` を確認する。

### STOP条件

- Free planを選べない
- card / paid subscriptionが必須
- C1記録と矛盾
- secretがGit statusへ出ている

発生時はresource作成前にSTOP。

## 6. Phase 1 — Auth0 Tenant

### 人間操作

1. Auth0 Dashboardへ自分でログイン
2. Create Tenant
3. tenant名を固定名称patternで入力
4. Regionは **Japan**
5. Free planのまま作成
6. paid upgrade promptは拒否
7. 作成後、以下の非秘密情報だけ記録
   - tenant domain
   - region = JP
   - plan = Free

Auth0はtenant regionとしてJapanを提供しており、tenant名は作成後変更・再利用できないため、作成前の名称確認を必須とする。

### 構築係

- 人間からtenant domain / JP / Freeだけを受け取り確認
- secretは受け取らない

### Checkpoint A

ここで一度停止。

確認項目:

- [ ] JP tenant
- [ ] Free
- [ ] paid契約なし
- [ ] dummy user 0
- [ ] social connection追加なし

## 7. Phase 2 — Auth0 Application / API

### 人間操作: Application

1. Applications > Applications > Create Application
2. Name: `Yattoko R005-C Dev BFF`
3. Type: **Regular Web Application**
4. Settings:
   - Allowed Callback URLs: `http://localhost:3000/callback`
   - Allowed Logout URLs: `http://localhost:3000`
   - Allowed Web Origins: `http://localhost:3000`
5. Save

Regular Web Applicationを選ぶ理由:

BrowserがAuth0 tokenを長期保持するSPA方式ではなく、
server-side BFFをconfidential clientにするため。

Auth0公式もserver-side web applicationではRegular Web Applicationを使用する。

### 人間操作: API

1. Applications > APIs > Create API
2. Name: `Yattoko R005-C Dev API`
3. Identifier / Audience:
   `https://api.yattoko.invalid/r005c`
4. Signing algorithmはRS256系のplatform defaultを維持
5. Save

### credential handling

人間はDashboardで以下を確認する。

非秘密:

- Domain
- Client ID
- Audience

秘密:

- Client Secret

Client Secretはchatへ貼らない。

C2-MIN実行時のみPowerShell process environmentへ入れる。

### 構築係

- Domain / Client ID / Audienceの形式を確認
- callback URLとの整合を確認
- Client Secretを要求しない

### Checkpoint B

- [ ] Regular Web Application
- [ ] localhost exact callback
- [ ] localhost exact logout
- [ ] API audience固定
- [ ] Client Secret非共有
- [ ] paid featureなし

## 8. Phase 3 — Auth0 Database Connection / Passkey / Action

### 人間操作: Database Connection

1. Authentication > Database
2. dedicated connectionを新規作成
3. Name:
   `yattoko-r005c-dev-db`
4. Auth0 user storeを使用
5. Custom Databaseを使わない
6. username requirementを使わない
7. このconnectionを `Yattoko R005-C Dev BFF` だけにenable

Passkeyはconnection単位設定なので、
C2専用connectionを他applicationと共有しない。

### 人間操作: Authentication Profile

1. New Universal Loginを使用
2. Authentication Profile:
   **Identifier First**
3. custom login pageは使わない

Auth0 Passkeyの現行prerequisiteとして、
New Universal Login、Identifier First、custom DB不使用等が必要。

### 人間操作: Passkey

1. C2専用Database ConnectionでPasskeyをenable
2. prerequisiteが全てDONEであることを確認
3. **Try now / user signup / Passkey enrollmentは実行しない**

C2-APP-007未承認のため、
ここでは設定だけで停止する。

### 構築係: Action code

人間がresource作成を終えた後、
構築係がsecretを含まないPost-Login Action codeをGitHubへdraftする。

Action方針:

- `event.authentication.methods` に `passkey` があるか確認
- passkeyならA2候補claim
- それ以外はA1
- emailをclaimへ入れない
- unknown / missingならA1
- assurance versionを固定
- namespaced custom claim
- secret / external HTTP callなし

Auth0はPost-Login Actionで
`event.authentication?.methods?.some(method => method.name === 'passkey')`
によりPasskey利用を検出できる。

### 人間操作: Action deploy

構築係がcode reviewを完了した後だけ:

1. Actions > Library
2. Action作成
3. reviewed codeを貼る
4. Deploy
5. Login Flowへ追加
6. secret欄は空

### Checkpoint C

進捗記録:

- dedicated Database Connection: 作成済み
- Identifier: email only
- phone: OFF
- username: OFF
- Identifier First: enabled
- Passkey: enabled
- Passkey prerequisites: all complete
- progressive enrollment: ON
- local enrollment: ON
- Application assignment:
  - Yattoko R005-C Dev BFF: ON
  - Default App: OFF
  - Yattoko R005-C Dev API (Test Application): OFF
- Post-Login Action `YTK R005-C Set Assurance`: 作成済み
- Post-Login Action deploy: 完了
- Login FlowへのAction追加: 未実施
- dummy user: 未作成
- Passkey enrollment / actual login: 未実施
- actual Passkey event / signed A2 claim: 未確認

Login FlowへのAction追加・Applyまで完了。

Checkpoint C: PASS

境界:
- Auth0 Database Connection / Passkey設定: 完了
- Post-Login Action deploy: 完了
- Login Flow反映: 完了
- dummy user: 0
- actual login: 未実施
- Passkey enrollment: 未実施
- actual Passkey event / signed A2 claim: 未確認
- A2実証済みとは扱わない

- [x] dedicated DB connection
- [x] Identifier First
- [x] New Universal Login
- [x] Passkey enabled
- [x] Action deployed
- [x] dummy userなし
- [x] real loginなし
- [x] A2 actual proofは未確認のまま

## 9. Phase 4 — Supabase Project

### 人間操作

1. Supabase Dashboardへログイン
2. Free organization / Free planを確認
3. Create Project
4. Name:
   `yattoko-r005c-dev`
5. Region:
   Tokyo / Japan相当の選択肢
6. Project DB password:
   長いrandom値
7. passwordをchat / GitHubへ貼らない
8. project作成後:
   - project ref
   - region
   - plan = Free
   だけを構築係へ共有

### credential

project DB passwordはmigration/setupだけに使う強権限credential。

Application runtimeには渡さない。

C2-MINでは人間のPowerShell process environmentへ一時保持し、
custom role作成後に消す。

### Checkpoint D

Checkpoint D: PASS

- [x] Project: `yattoko-r005c-dev`
- [x] Organization: `Yattoko R005-C Dev`
- [x] Free
- [x] Northeast Asia (Tokyo)
- [x] GitHub integration: none
- [x] project admin password非共有
- [x] production dataなし
- [x] Supabase AuthをApplication認証に使用しない

## 10. Phase 5 — Supabase Data API / SSL

### 人間操作: Data API

DashboardでData API integrationを開き、

**Enable Data API = OFF**

にする。

Supabase公式ではData APIを使わないarchitectureの場合、
Data APIを無効化するとauto-generated REST endpointが応答しなくなる。

### 人間操作: SSL

Database Settings > SSL Configuration:

**Enforce SSL on incoming connections = ON**

設定変更時はdatabase rebootが発生するため、
project作成直後・dummy data投入前に実施する。

CA certificateをDashboardからdownloadする。

推奨local保存先:

`%LOCALAPPDATA%\Yattoko\R005C\supabase-ca.crt`

repository配下へ置かない。

Application runtimeではCA検証を有効にし、
`verify-full`相当を目標にする。

### 今回やらない

- Network Restriction設定
- `0.0.0.0/0`等のexplicit設定変更
- IPv4 add-on
- paid option

### Checkpoint E

Checkpoint E: PASS

- [x] Data API OFF
- [x] Automatically expose new tables: Data API OFFにより実質無効
- [x] Enable automatic RLS: OFF（SQLで明示設定）
- [x] SSL enforcement ON
- [x] CA certificate `prod-ca-2021.crt` を取得し、GitHub外で `supabase-ca.crt` として保存
- [x] Network Restriction未変更 / 保留
- [x] paid optionなし
- [x] DB password / connection string / secret非共有

## 11. Phase 6 — Supabase schema / custom role

### 構築係: offline準備

人間のprojectに接続する前にGitHubへ以下を準備する。

- `sql/101_c2_supabase_schema.sql`
- `sql/102_c2_supabase_verify.sql`
- cleanup SQL
- secretを含まないPowerShell command template

`101`はC1 SQLを基礎にし:

- `ytk_private`
- test table
- RLS
- FORCE RLS
- explicit grants
- owner column UPDATE不可
- `ytk_user_request`
  - LOGIN
  - NOSUPERUSER
  - NOCREATEDB
  - NOCREATEROLE
  - NOREPLICATION
  - NOBYPASSRLS
- PUBLIC revoke

を構成する。

role passwordをSQL fileへ書かない。

### Phase 6 offline準備結果

構築係によるoffline作成・review完了:

- `workflow/prototypes/YTK-R005-C/C2-MIN/sql/101_c2_supabase_schema.sql`
- `workflow/prototypes/YTK-R005-C/C2-MIN/sql/102_c2_supabase_verify_admin.sql`
- `workflow/prototypes/YTK-R005-C/C2-MIN/sql/103_c2_supabase_runtime_rls_test.sql`
- `workflow/prototypes/YTK-R005-C/C2-MIN/sql/199_c2_supabase_cleanup.sql`
- `workflow/prototypes/YTK-R005-C/C2-MIN/scripts/phase6-admin-apply.ps1`
- `workflow/prototypes/YTK-R005-C/C2-MIN/scripts/phase7-runtime-test.ps1`

review方針:

- runtime passwordをSQLへ埋め込まない
- admin static verificationとruntime Supavisor testを分離
- admin applyはshared session pooler / 5432
- runtime testはshared transaction pooler / 6543
- custom shared-pooler usernameは `ytk_user_request.<PROJECT-REF>`
- SSL `verify-full` + downloaded CA
- prepared statement不使用
- synthetic UUID/dummy byteaのみ
- cleanupにCASCADEを使わない

### 人間操作: admin接続

Supabase Connect dialogから
**shared session pooler** のadmin接続情報を取得する。

migration/setupだけに使用する。

PowerShell process environmentへ一時設定:

- admin pooler host
- admin username `postgres.<project-ref>`
- project DB password
- database name
- SSL CA path

secretはfileへ保存しない。

### 人間操作: schema apply

構築係がSQL reviewを完了した後のみ、
人間PCの `psql` からadmin接続で `101` を実行する。

custom role作成後、
`psql` の `\password ytk_user_request`
を使ってhumanがruntime passwordをinteractiveに設定する。

passwordをSQL / shell history / Gitへ書かない。

設定後:

- admin credentialをprocess environmentから削除
- runtime role passwordだけ別process environmentへ設定

### Phase 6 first apply attempt: STOP

2026-10-05、人間Windows PCからShared Session Poolerへのadmin applyを開始したが、
`sslmode=verify-full` で指定したローカルCA証明書pathを `psql` が利用できず接続前段で停止。

結果:

- schema apply: 未実行
- admin static verification: 未実行
- custom role作成: 未実行
- runtime password設定: 未実行
- DB内容変更: なし
- TLS設定緩和: なし
- STOP条件に従い停止

CA file実在確認:

- `Test-Path "C:\Users\81804\AppData\Local\Yattoko\R005C\supabase-ca.crt"` → `True`

CA path root cause narrowed:

- fileは存在
- failureはlibpq keyword/value conninfoへWindows backslash pathを直接渡したことによるpath解釈問題の可能性が高い
- TLS設定は緩和しない
- script側で `Resolve-Path` + forward-slash normalizationを追加
- 同じ `sslmode=verify-full` で再試行する

### Phase 6 second apply attempt: STOP

2026-10-05、CA path修正後にShared Session Poolerへ `sslmode=verify-full` で到達した。

`101_c2_supabase_schema.sql` 実行中、Supabase managed Postgresの権限制約により
`ALTER ROLE ytk_user_request ... NOSUPERUSER ...` が拒否された。

error要旨:

- permission denied to alter role
- only roles with SUPERUSER attribute may alter roles with SUPERUSER attribute

判定:

- TLS到達: 成功
- SQL接続: 成功
- schema apply: FAIL / STOP
- admin static verification: 未実行
- runtime pooler test: 未実行
- TLS緩和: なし
- privileged runtime roleへの代替: なし

修正方針:

- Supabase公式どおり、project `postgres` は完全SUPERUSERではない前提へ合わせる
- runtime roleは `CREATE ROLE ytk_user_request LOGIN` のみ
- PostgreSQL既定の非特権attributeを使用
- `102_c2_supabase_verify_admin.sql` が SUPERUSER / CREATEDB / CREATEROLE / REPLICATION / BYPASSRLS をすべてfalseと実測確認
- elevated attributeが1つでもtrueならSTOP
- managed環境に合わせるためにRLSやTLSを弱めない

### Phase 6 third apply attempt: STOP

2026-10-05、SupabaseへのTLS/Session Pooler接続後、
`101_c2_supabase_schema.sql` のPL/pgSQL dollar-quote構文エラーで停止。

原因:

- managed-role対応時の成果物更新でJavaScript replacement stringの `$` 特殊処理により
  `DO $ ... $;` が `DO $ ... $;` へ破損していた
- `102` / `103` のdollar-quoteは正常
- Supabase側のRLS/role仕様エラーではない

状態:

- TLS verify-full: 成功
- Session Pooler接続: 成功
- `BEGIN`: 成功
- `CREATE SCHEMA`: transaction内で実行
- COMMIT: 未到達
- psql終了によりtransactionはrollback対象
- runtime role password: 未設定
- runtime pooler test: 未実行

修正:

- `101` の `DO $ ... $;` を復元
- TLS/RLS/権限を緩和しない

### Checkpoint F

Checkpoint F: PASS

2026-10-05、Shared Session Pooler管理接続から
`101_c2_supabase_schema.sql` と
`102_c2_supabase_verify_admin.sql` を実行し成功。

確認結果:

- schema apply: PASS
- admin static verification: PASS
- runtime role: `ytk_user_request`
- `rolsuper = false`
- `rolcreaterole = false`
- `rolcreatedb = false`
- `rolreplication = false`
- `rolbypassrls = false`
- RLS enabled: true
- FORCE RLS: true
- table owner: `postgres`
- `owner_user_id` UPDATE privilege: false
- runtime role password: 未設定（意図どおり）
- runtime transaction pooler test: 未実行
- TLS verify-full: 維持

次工程はhumanが `ytk_user_request` passwordを対話設定した後、
Shared Transaction Pooler経由でruntime RLS/context testを実行する。



構築係へ共有するsanitized result:

- role name
- non-BYPASSRLS確認値
- RLS / FORCE RLS確認値
- owner update privilege確認値
- SQL exit code

共有禁止:

- admin password
- role password
- connection string全体

## 12. Phase 7 — Runtime transaction pooler

### 人間操作

Supabase Connect dialogから
**Shared Transaction Pooler** を選択。

コピーする非秘密項目:

- host
- port = 6543
- project ref
- DB name

runtime username:

`ytk_user_request.<project-ref>`

password:

custom role password。

### Process Environment

C2-MINでは `.env` を使わない。

例となる変数名だけ固定する:

- `YTK_DB_HOST`
- `YTK_DB_PORT`
- `YTK_DB_NAME`
- `YTK_DB_USER`
- `YTK_DB_PASSWORD`
- `YTK_DB_CA_CERT_PATH`
- `YTK_AUTH0_DOMAIN`
- `YTK_AUTH0_CLIENT_ID`
- `YTK_AUTH0_CLIENT_SECRET`
- `YTK_AUTH0_AUDIENCE`

secret値はprocess終了後に削除。

### DB client選定

C2-MINでは **node-postgres (`pg`)** を採用する。

理由:

Supabase shared transaction poolerは

- prepared statements非対応
- query pipelining非対応

であり、現行Supabase docsはPostgres.jsのdefault pipeliningとの問題を明記している。

`pg`では:

- named prepared statementを使用しない
- requestごとに明示transaction
- transaction内部だけで `set_config(..., true)`
- commit / rollback後にclient release
- TLS certificate verification

を行う。

Postgres.jsはC2-MINでは不採用。

## 13. Phase 8 — 構築係によるlocal BFF external adapter

resource作成後、人間がsecretをlocal processへ設定した状態でのみ実施。

### 構築係

C1 codeへ以下を追加する。

- Auth0 real OIDC config adapter
- JWKS cache
- exact issuer allowlist
- exact audience
- exp / nbf / iat
- assurance claim version
- node-postgres adapter
- TLS CA verification
- transaction wrapper
- transaction-local internal userId / assurance
- external Supabase test repository
- allowlist logging
- no request/response body logging

### 注意

人間のPC process environmentにあるsecretを
tool output / log / test snapshotへ書き出さない。

構築係がsecret値そのものをchatで要求しない。

## 14. Phase 9 — C2-MIN接続確認

### Auth0: C2で確認してよい

dummy userを作らずに確認する。

- tenant domain
- OIDC discovery document取得
- JWKS取得
- expected issuer
- API audience config
- Application callback config
- DB connectionのPasskey prerequisite表示
- Action deployed状態

### Auth0: C2で確認してはいけない

- actual signup
- actual login
- Passkey enrollment
- Action runtime event
- tenant logのpasskey event
- actual A2 token

これらはC2-APP-007 / C3承認後。

### Supabase: C2で確認する

完全synthetic DB rowsを使う。

- custom role login via shared transaction pooler
- `rolbypassrls = false`
- RLS / FORCE RLS
- SELECT own
- cross-user SELECT
- cross-user INSERT
- cross-user UPDATE
- cross-user DELETE
- owner update deny
- A1 deny
- repeated alternating A/B transaction
- transaction-local context leakageなし
- TLS certificate validation
- Data APIが無効であること

C1と同じ試験を**実Supavisor経由**で再実行する。

## 15. C2-MIN完了条件

以下が全てPASSした場合のみ、
「C2-MIN external environment configured / PASS候補」とする。

### Auth0 resource/config

- JP Free tenant
- Regular Web App
- API audience
- dedicated DB connection
- New Universal Login
- Identifier First
- Passkey enabled
- Action deployed
- localhost callback/logout
- OIDC discovery / JWKS取得

### Supabase

- Free project
- Data API OFF
- SSL enforcement ON
- runtime custom role non-BYPASSRLS
- shared transaction pooler login
- RLS / FORCE RLS
- cross-user CRUD遮断
- A1遮断
- owner変更禁止
- transaction-local context leakageなし
- TLS verification

### Secret hygiene

- GitHub secret 0
- `.env` 0
- log secret 0
- admin DB credentialをruntimeに不使用
- service_role / secret keyをruntimeに不使用

## 16. C2-MIN完了後も未確認とするもの

- Auth0実Passkey enrollment
- Auth0 user verification実証
- actual Passkey Action event
- actual signed A2 claim
- Auth0 tenant passkey log
- dummy user A/B
- Auth0 identity link/unlink実動作
- managed KMS
- S3 Object Lock
- DynamoDB
- hosted BFF
- VPC / NAT / EIP
- Network Restriction
- backup / restore external implementation

C2-MIN完了を「A2保証完了」や「R005安全」と表現しない。

## 17. 人間と構築係の実行順

| Step | 人間 | 構築係 | 次へ進む条件 |
|---|---|---|---|
| 0 | 本計画を承認 | 変更なし | 人間承認 |
| 1 | Auth0 tenant作成 | non-secret確認 | Checkpoint A |
| 2 | Application / API作成 | URL / audience確認 | Checkpoint B |
| 3 | DB Connection / Passkey設定 | Action draft/review | Checkpoint C |
| 4 | Supabase Free project作成 | non-secret確認 | Checkpoint D |
| 5 | Data API OFF / SSL ON | 設定結果確認 | Checkpoint E |
| 6 | admin psql実行 / role password入力 | SQL作成・review | Checkpoint F |
| 7 | runtime envをlocal processへ設定 | external adapters実装 | build/test |
| 8 | sanitized test実行操作 | test判定 | C2-MIN report |
| 9 | 結果レビュー | GitHub記録 | 人間承認待ち |

人間操作が必要なstepを構築係が勝手に代行しない。

## 18. STOP条件

即時停止:

- paid upgradeが必要と表示
- Auth0 Passkey prerequisiteをFree構成で満たせない
- Auth0 Actionにsecretが必要
- dummy user作成が要求される
- Supabase custom roleでshared poolerへloginできない
- custom roleにBYPASSRLSが付く
- secret/service_role keyが通常CRUDに必要
- Data APIをdisableできない
- SSL enforcementを有効化できない
- TLS検証を無効化しないと接続できない
- RLS cross-user testが1件でも失敗
- transaction-local context leakage
- secretがGit status / logへ出る
- Network Restriction設定が必要になり、未承認scopeを超える
- AWS resourceが必要になる

STOP時は代替設定へ勝手に緩和しない。

## 19. Cleanup計画

C2-MIN中止時:

1. local BFF停止
2. PowerShell process env clear
3. custom DB role password rotate / role disable
4. synthetic rows削除
5. Supabase project delete
6. Auth0 Application / API / Action / connection削除
7. Auth0 tenant delete
8. local CA cert削除
9. Git history / working tree secret scan
10. billing画面でpaid resource 0確認

C2-MINをC3へ引き継ぐ場合:

- resourcesは残す
- admin credentialはprocessから消す
- runtime credentialは必要時のみ再投入
- dummy user承認まではAuth0 userを作らない

## 20. 今回の実行計画判定

### 確定事項

- C2-MINだけを実施対象とする
- C2-EXT / C2-NETは対象外
- Auth0 / Supabaseのみ外部resource化
- Application APIはWindows PC localhost
- Auth0 ApplicationはRegular Web Application
- localhost:3000を使用
- Supabase Data APIを無効化
- SSL enforcementを有効化
- Network Restrictionは保留
- runtimeはcustom non-BYPASSRLS role
- shared transaction pooler
- DB clientはnode-postgres (`pg`)
- credentialはprocess environmentのみ
- dummy Auth0 user / Passkey enrollmentは行わない

### 現在状態

**C2-MIN IN PROGRESS / Phase 8 OFFLINE IMPLEMENTATION PASS / Phase 9未開始。**

作成済みapproved external resources:
- Auth0 Japan tenant / Application / API / Database Connection / Passkey設定 / Post-Login Action
- Supabase Free project / Tokyo

完了済み:
- Supabase schema / custom role SQL apply
- runtime role provisioning
- shared transaction pooler runtime test
- Phase 8 local BFF external adapter offline implementation

未実施:
- Phase 9 external connectivity
- dummy external Auth0 user
- actual Passkey login

A2 actual proofは未確認のまま。

## 21. 公式確認資料

### Auth0

- Create Tenants
  https://auth0.com/docs/get-started/auth0-overview/create-tenants
- Regular Web Applications
  https://auth0.com/docs/get-started/auth0-overview/create-applications/regular-web-apps
- Database Connections
  https://auth0.com/docs/authenticate/database-connections
- Passkey prerequisites
  https://developer.auth0.com/resources/labs/authentication/passkeys
- Detect Passkey in Post-Login Actions
  https://support.auth0.com/center/s/article/detecting-passkey-usage-in-auth0-post-login-actions
- Custom Claims
  https://support.auth0.com/center/s/article/adding-custom-claims-to-tokens

### Supabase

- Connect to Postgres
  https://supabase.com/docs/guides/database/connecting-to-postgres
- Transaction Pooler limitations
  https://supabase.com/docs/guides/database/connecting-to-postgres/pooling-and-limits
- Disable prepared statements
  https://supabase.com/docs/guides/troubleshooting/disabling-prepared-statements-qL8lEL
- Secure Data / secret key warning
  https://supabase.com/docs/guides/database/secure-data
- Disable Data API
  https://supabase.com/docs/guides/api/securing-your-api
- SSL Enforcement
  https://supabase.com/docs/guides/platform/ssl-enforcement
- Postgres Roles
  https://supabase.com/docs/guides/database/postgres/roles

## 22. 現在の停止点

Phase 6のoffline SQL / script準備とreviewまでは完了。

次は人間がSupabase DashboardのConnect画面から
**Session poolerの非秘密接続情報を確認するところ**から再開する。

現時点では:

- SQLをSupabaseへまだ適用しない
- runtime role passwordをまだ設定しない
- transaction pooler testをまだ実行しない
- secret / password / connection string全文をChatGPTへ共有しない
- Network Restrictionを変更しない
- paid planへ変更しない
- C2-EXT / C2-NETへ進まない
- C3へ進まない

**次のhuman checkpoint待ちで停止する。**


### Runtime role provisioning checkpoint

Runtime role provisioning checkpoint: PASS

2026-10-05、humanがSession Poolerのadmin psql接続で
`ytk_user_request` のruntime認証設定を対話完了し、psqlを正常終了した。

- secret value is not recorded
- GitHubへのsecret保存なし
- 次工程: Shared Transaction Pooler経由のruntime RLS/context test


### Shared Transaction Pooler runtime test

Shared Transaction Pooler runtime test: PASS

2026-10-05、humanが `phase7-runtime-test.ps1` を実行し、
Supabase Shared Transaction Pooler (port 6543) 経由で
`ytk_user_request` runtime role の実RLS/context試験を完了。

確認結果:

- runtime role connection: PASS
- TLS verify-full: PASS
- non-BYPASSRLS: PASS
- synthetic owner A/B row setup: PASS
- owner own-row SELECT/UPDATE: PASS
- cross-user INSERT blocked: PASS
- owner_user_id mutation blocked: PASS
- cross-user UPDATE blocked: PASS
- cross-user DELETE blocked: PASS
- A1 access blocked: PASS
- transaction-local user/assurance context cleared after COMMIT: PASS
- A/B/A/B transaction alternation: PASS
- synthetic test rows cleanup: PASS
- final missing-context visibility check: PASS

Observed terminal result:

- `PASS: C2-MIN Supavisor transaction-pooler runtime RLS/context tests.`
- `PASS: shared transaction pooler runtime test completed.`

Secret values were not recorded.
Actual Auth0 Passkey event / signed A2 claim remains unproven by C2-MIN and must not be represented as verified.


### Phase 8 formal judgement

Phase 8 formal judgement: PASS

Review target commit:
`5e00ca463a7921e96ba325e40d243dfa90c6585a`

2026-10-06、Phase 8 `local BFF external adapter` のGitHub成果物を正式確認。

判定:

- Phase 8 offline implementation: PASS
- existing C1 regression suite: 21 PASS / 0 FAIL（制作部実行報告およびPhase 8 report記録）
- Phase 8 new offline suite: 11 PASS / 0 FAIL（制作部実行報告およびPhase 8 report記録）
- total: 32 PASS / 0 FAIL
- real external connectivity: NOT RUN
- actual Auth0 login / Passkey enrollment / A2 token: NOT RUN

GitHub reviewで確認した実装境界:

- exact Auth0 issuer allowlist
- exact API audience
- OIDC discovery / JWKS cache
- RS256 signature verification
- exp / nbf / iat validation
- assurance claim version fail-close
- node-postgres runtime adapter
- transaction pooler port 6543 enforcement
- CA based TLS verification / rejectUnauthorized true
- transaction-local userId / assurance context
- rollback/release failure path
- BFF A1 denial before DB access
- owner_user_id derived from internal user context
- CRUD owner predicate defense-in-depth
- allowlist operational logging
- request/response body and secret-shaped fields excluded
- no full DB connection string path

Secret values were not observed in the reviewed Phase 8 artifacts.

Phase 9 eligibility: START ALLOWED, but NOT STARTED by this checkpoint.
C2-EXT / C2-NET / C3 remain unauthorized.
Actual Auth0 Passkey event / signed A2 claim remains unproven.


### Phase 9 prep reproducibility fix

2026-10-06、human Windows環境でPhase 8成果物をpull後、
`npm test` がテスト開始前に `tsc is not recognized` で停止。

原因:
- C1 `package.json` は `tsc -p tsconfig.json` を使用していた
- TypeScript compiler自体がdependencies/devDependenciesに宣言されていなかった
- 制作部環境のglobal/local preexisting `tsc` に依存しており、fresh local installで再現しなかった

判定:
- Phase 8 implementation PASSは維持
- Phase 9 external connectivityは未開始のまま
- reproducibility defectとしてPhase 9 prepでSTOPし、先に修正

修正:
- `typescript: 5.9.3` をexact devDependencyとして追加
- runtime dependency `pg: 8.23.1` は変更なし
- TLS/RLS/Auth0/Supabase設定変更なし
- external connectionなし


### Phase 9 prep TypeScript 5.9 Web Crypto compatibility fix

2026-10-06、`typescript 5.9.3` 導入後のhuman Windows再現試験で、
`src/storage.ts` のWeb Crypto BufferSource型互換エラーによりbuildが停止。

原因:
- TypeScript 5.9のtyped-array genericsで既存 `Uint8Array` parameterが
  `Uint8Array<ArrayBufferLike>` として扱われる
- Web Crypto BufferSource側はArrayBuffer-backed viewを要求
- runtime暗号方式やPhase 8 external adapterの不具合ではなくcompile-time compatibility defect

修正:
- Web Cryptoへ渡す既存byte inputを明示的なArrayBuffer-backed `Uint8Array` へcopy
- AES-GCM / IV length / AAD / ciphertext formatは変更しない
- TypeScript 5.9.3 pinは維持
- TLS/RLS/Auth0/Supabase設定変更なし
- external connectionなし

Phase 9 external connectivity remains NOT STARTED until local 32/32 regression reproduction succeeds.


### Phase 9 prep local reproduction

Phase 9 prep local reproduction: PASS

2026-10-06、human Windows環境でPhase 8成果物をfresh local dependency install後に再実行。

結果:
- TypeScript 5.9.3 build: PASS
- existing C1 tests: 21 PASS
- Phase 8 new offline tests: 11 PASS
- total: 32 PASS / 0 FAIL
- vulnerabilities reported by npm install: 0
- external Auth0/Supabase connectivity: NOT STARTED

前段で検出した再現性欠陥:
- missing TypeScript dependency
- TypeScript 5.9 Web Crypto BufferSource typing incompatibility

はいずれも修正後にhuman PCで再現確認済み。

Phase 9 external connectivity: START ALLOWED, NOT YET STARTED.


### Phase 9 Auth0 OIDC discovery

Phase 9 Auth0 OIDC discovery: PASS

2026-10-06、human Windows環境からAuth0 tenantの公開
`/.well-known/openid-configuration` を取得。

確認結果:
- issuer = `https://yattoko-r005c-dev-20261005.jp.auth0.com/`
- jwks_uri = same tenant `/.well-known/jwks.json`
- expected exact issuer match: PASS
- login: NOT RUN
- user creation: NOT RUN
- Passkey enrollment: NOT RUN
- actual token / A2 claim: NOT RUN


### Phase 9 Auth0 JWKS fetch

Phase 9 Auth0 JWKS fetch: PASS

2026-10-06、human Windows環境からAuth0 tenantの公開JWKS endpointを取得し、
公開鍵メタ情報のみ確認。

確認結果:
- JWKS fetch: PASS
- key count observed: 2
- kty: RSA
- alg: RS256
- use: sig
- key material itself: not recorded
- token: not used
- login: NOT RUN
- Passkey enrollment: NOT RUN
- actual A2 token: NOT RUN


### Phase 9 Auth0 API audience

Phase 9 Auth0 API audience: PASS

2026-10-06、humanがAuth0 Dashboard上の
`Yattoko R005-C Dev API` 設定画面でIdentifierを確認。

確認結果:
- Identifier / API audience = `https://api.yattoko.invalid/r005c`
- Phase 8 external adapter expected audienceとのexact match: PASS
- setting change: none
- login: NOT RUN
- token issuance: NOT RUN
- Passkey enrollment: NOT RUN
- actual A2 token: NOT RUN


### Phase 9 Auth0 callback URL

Phase 9 Auth0 callback URL: PASS

2026-10-06、humanがAuth0 Dashboard上の
`Yattoko R005-C Dev BFF` 設定画面でAllowed Callback URLを確認。

確認結果:
- Allowed Callback URL = `http://localhost:3000/callback`
- approved C2-MIN localhost callbackとのexact match: PASS
- setting change: none
- login: NOT RUN
- token issuance: NOT RUN
- Passkey enrollment: NOT RUN
- actual A2 token: NOT RUN
