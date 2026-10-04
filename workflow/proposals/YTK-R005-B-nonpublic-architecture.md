# ヤットコ／YTK-R005-B 非公開アーキテクチャ設計

- 成果物種別: 非公開アーキテクチャ設計 / proposal
- 工程: YTK-R005-B
- 状態: APPROVED
- 作成日: 2026-10-04
- 承認記録:
  - 最終判定: APPROVED
  - 承認範囲:
    - 非公開アーキテクチャ設計
    - trust boundary
    - identity model
    - A0 / A1 / A2
    - クラウド保存開始条件
    - Application API認可
    - DB role / RLS
    - Supabase露出面
    - Application layer encryption方針
    - 復旧
    - 削除
    - backup / restore
    - Deletion Journal
    - ログ
    - 管理者 / break-glass
    - Frontend hardening
    - R005-D攻撃試験方針
    - Auth0継続 / Cognito切替条件
  - 未承認:
    - Auth0 tenant作成
    - Cognito User Pool作成
    - Supabase project作成
    - KMS作成
    - Application API hosting
    - 契約 / 課金
    - APIキー発行
    - OAuth設定
    - DB作成
    - SQL実行
    - 実装
    - 外部接続
    - R005-C開始
    - 本番環境
    - 公開
  - 次工程: 人間による開始指示待ち。R005-Cを自動開始しない
- 前提:
  - YTK-R003 保存データ仕様: APPROVED
  - YTK-R004 認証設計: APPROVED
  - YTK-R005-A 認証・保存基盤 技術選定調査: APPROVED
- 第一候補: Auth0 + Application API + Supabase Postgres
- 第二候補: Amazon Cognito User Pools + Application API + Supabase Postgres
- 本成果物で実装・契約・外部設定は行わない

## 1. 設計目的

Browser、認証基盤、Application API、Supabase Postgresの間で、

- 誰を信用するか
- どこで認証するか
- どこで認可するか
- どのIDを正本とするか
- どの権限をどこまで持たせるか
- どこで入力値を検証するか
- 他ユーザーの整理データをどう遮断するか
- 復旧、削除、バックアップをどう扱うか

を実装前に固定する。

本設計はR005-Cの実装許可ではない。

## 2. 固定安全原則

以下を変更しない。

- 実ユーザーデータを使用しない
- 本番環境を作成しない
- R005-Cで扱う場合も完全なダミーデータのみ
- 外部サービスの秘密情報を収集しない
- R003 D区分のAPIフィールド、DB列、自由metadata領域を作らない
- 通常CRUDでSupabase secret key、legacy service_role、BYPASSRLS roleを常用しない
- Application APIだけを唯一の防御線にしない
- RLSだけを唯一の防御線にしない
- API認可 + RLS + DB制約の二重以上の防御
- メールアドレスを本人識別主キーにしない
- 他ユーザーの整理データへ到達できる設計を許可しない
- ログ、分析、監視へ整理内容を送らない
- 外部provider障害時に認証強度を下げて迂回しない
- 各工程終了時に人間承認待ちで停止する

## 3. 推奨アーキテクチャ

### 3.1 第一候補

**Auth0 + Yattoko Application API/BFF + Supabase Postgres**

BrowserからSupabaseへ直接アクセスしない。

```text
┌────────────────────────────────────────────────────────────┐
│ Browser                                                    │
│ - UI                                                       │
│ - opaque session cookie only                               │
│ - DB credential / Auth0 Management credentialを持たない    │
└───────────────┬────────────────────────────────────────────┘
                │ HTTPS
                │
        login / step-up redirect
                │
                v
┌─────────────────────────┐
│ Auth0                   │
│ - Universal Login       │
│ - Passkey               │
│ - identity              │
│ - authentication event  │
└───────────────┬─────────┘
                │ signed OIDC result
                v
┌────────────────────────────────────────────────────────────┐
│ Yattoko Application API / BFF                             │
│ - JWT検証                                                  │
│ - A0/A1/A2判定                                             │
│ - server-side session                                     │
│ - issuer+subject → internal userId mapping                 │
│ - account state / cooling-off                             │
│ - server validation                                       │
│ - owner authorization                                     │
│ - encryption/decryption                                   │
└───────────────┬────────────────────────────────────────────┘
                │ TLS / restricted DB connection
                │ RLS適用 user request role
                v
┌────────────────────────────────────────────────────────────┐
│ Supabase Postgres                                         │
│ - ytk_private schema                                      │
│ - explicit grants                                         │
│ - RLS                                                     │
│ - FK / CHECK / UNIQUE / NOT NULL                          │
│ - encrypted sensitive payloads                            │
│ - deletion journal                                        │
└────────────────────────────────────────────────────────────┘

別経路:
background job ──専用role──> Postgres
migration     ──専用role──> Postgres
backup/restore──専用role──> Postgres
break-glass  ──一時強権限──> Postgres / KMS（承認・監査必須）
```

### 3.2 BFF方式を第一候補とする理由

BrowserへAuth0 access token / refresh tokenを長期保持させず、
Application APIがOAuth/OIDC callbackを処理して
ヤットコ独自のserver-side sessionを発行する。

Browserが持つ認証材料は原則として、

- `__Host-ytk_session` 相当のopaque cookie
- CSRF対策用の非秘密値

だけとする。

利点:

- Auth0 sessionとヤットコsessionを分離できる
- Auth0 Enterprise Session Management APIへ完全依存せず、ヤットコ側sessionを即時失効できる
- A0/A1/A2、protected/frozen、cooling-offをApplication APIで一貫管理できる
- access tokenをJavaScriptから盗まれる面を減らせる
- BrowserがSupabaseへ直接到達しない

Auth0側session / refresh tokenの失効は追加防御として実施するが、
ヤットコApplication APIのsession失効をアプリ利用停止の正本とする。

## 4. Trust Boundary

「内部だから信用する」は採用しない。

### 4.1 Browser

信用しない入力:

- request body
- URL parameter
- pathのuserId
- ownerId
- hidden field
- local state
- client-side validation結果
- A0/A1/A2自己申告
- cloud storage enabled自己申告
- account state自己申告

認証済みと判断する条件:

Browser自身は判断しない。
Application APIの有効なserver-side sessionだけを利用する。

保持する秘密:

- HttpOnly cookieはBrowserへ送るがJavaScriptから参照不可
- DB credentialなし
- Supabase secret keyなし
- Auth0 Management API credentialなし
- encryption keyなし

アクセス可能データ:

APIが認可した本人データだけ。

越境可能な権限:

なし。
BrowserからDB、migration、backup、admin経路へ直接越境不可。

### 4.2 Auth0

信頼するもの:

- Auth0が発行し署名したtokenの暗号学的真正性
- Auth0 managed loginで成功した認証イベント
- 承認済みtenant / connection設定

そのまま信用しないもの:

- emailが同じだから同一人物という推論
- social providerだからA2という推論
- token内の未知custom claim
- 古いtoken
- 想定外issuer / audience
- 未知のAction version

保持する秘密:

Auth0側認証credential、Passkey公開情報、provider設定等。
ヤットコ整理内容は保持しない。

アクセス可能データ:

認証データのみ。
整理データDBへの直接アクセスなし。

### 4.3 Application API / BFF

役割:

- Auth0 token検証
- server-side session発行
- A0/A1/A2判定
- internal userId解決
- account state判定
- server validation
- owner authorization
- R001/R002整合
- encryption/decryption
- deletion orchestration

信用しないもの:

- Browser入力全般
- body / URLのowner
- client-side secret検知結果
- DBから来た値が常に正しいという仮定
- Auth0 custom claimだけを単独でA2の唯一根拠とすること

保持する秘密:

- DB接続credential（通常user request専用）
- Auth0 confidential client secretが必要な場合のみserver-side
- Auth0 Management API credentialは必要な操作時だけserver-side
- encryption/KMS利用credential
- server-side session secret / session store credential

秘密は環境secret管理へ置き、
GitHub / client bundle / Browserへ入れない。

### 4.4 Supabase Postgres

役割:

- 永続化
- owner isolationの第二防御
- constraints
- transaction
- schemaVersion
- primary DBとは独立したappend-only deletion journal

DBはApplication APIの認可判断を盲信しない。

通常user requestはRLS適用roleだけを使用する。

### 4.5 background job

通常request roleとcredentialを共有しない。

jobごとに、

- 対象table
- SELECT / UPDATE / DELETE
- cross-user要否
- decrypt要否

を固定する。

cross-user処理が不要ならRLS適用を維持する。

### 4.6 migration

schema変更専用。

- runtimeからcredentialを参照不可
- 通常CRUD不可を原則
- migration時だけ明示実行
- 変更履歴必須

### 4.7 backup / restore

通常APIから到達不可。

- backup取得
- restore
- restore検証

だけを担当する。

backup内の整理内容を通常サポートが閲覧できないこと。

### 4.8 通常管理者

許可候補:

- account state
- opaque userId
- job状態
- エラーコード
- 件数
- 削除処理状態

禁止:

- 整理内容本文
- service名
- intention
- asset / familyKnow
- encrypted payloadの復号

### 4.9 DB / infra管理者

DB保守上の技術アクセスは存在し得るが、
日常的な整理内容閲覧を業務権限に含めない。

- 個人ID
- MFA
- 最小権限
- 一時昇格
- 操作監査
- local持ち出し禁止

Application layer encryptionを採用することで、
DB access単独では一部機微payloadを平文閲覧できない構造とする。

### 4.10 break-glass

重大障害・セキュリティ事故だけ。

候補要件:

- 通常adminと別identity
- phishing-resistant MFA
- 理由入力
- 対象範囲
- 時間制限
- 可能なら二者承認
- DB強権限とKMS decrypt権限を通常は分離
- 全操作監査
- 事後レビュー
- 自動失効

## 5. データフロー

### 5.1 通常ログイン

1. BrowserがApplication APIへlogin開始要求
2. Application APIがstate / PKCE等を用意
3. Auth0 Universal Loginへredirect
4. Auth0が認証
5. callbackをApplication APIが受領
6. Application APIがtokenを検証
7. A0/A1/A2を判定
8. issuer + subjectからinternal userIdを解決
9. account stateを確認
10. server-side sessionを作成
11. Browserへopaque HttpOnly cookieを返す
12. Browserは以後Application APIだけを呼ぶ

### 5.2 クラウド保存開始

1. userがクラウド保存開始を選択
2. Application APIが現在sessionを確認
3. A2でなければPasskey step-up
4. A2 fresh認証を確認
5. Auth0の認証method情報からPasskey登録存在をserver-side確認
6. accountがactiveでprotected/frozen/cooling-off制限に該当しないことを確認
7. internal userIdへ `cloud_storage_enabled=true` を設定
8. 以後R003承認データのみ保存可能

Browserから `cloud_storage_enabled` を指定させない。

### 5.3 通常CRUD

1. Browser → Application API
2. Application APIがserver-side sessionを取得
3. A2、account state、expiryを確認
4. bodyをallowlist validation
5. ownerはtoken/session → internal userIdで確定
6. R001/R002整合ルール適用
7. P3等対象fieldを暗号化
8. DB transaction開始
9. verified issuer / subjectをtransaction-local claimへ設定
10. RLS適用roleへ切替
11. DB grant + RLS + constraintを通過
12. commit
13. contentを含まないallowlist logのみ記録

### 5.4 高リスク操作

対象:

- 全整理データ削除
- カテゴリ一括削除
- 退会
- identity link / unlink
- 認証メール変更
- Passkey追加 / 削除
- export
- 将来delegate設定

Application APIが `fresh_a2_at` を確認し、
10分候補を超えていればAuth0へfresh A2を要求する。

### 5.5 provider障害

Auth0障害時に、

- email OTPだけでA2化
- 管理者手動session発行
- DB直アクセスをuserへ開放

しない。

既存Application API sessionを継続できる範囲は
session expiryまでに限定し、
新規A2要求が必要な操作は停止する。

## 6. 内部userId / Auth0 Principal / Linked Provider Identity

### 6.1 3層を分離する

YTK-R005-Bではidentityを以下の3層へ明確に分離する。

#### A. ヤットコ内部userId

**整理データownerの唯一の正本。**

- UUID
- provider非依存
- email非依存
- Auth0 primary変更に追従して変更しない
- linked provider追加 / 削除で変更しない
- duplicate accountを自動mergeしない

#### B. Auth0 principal

Auth0がヤットコへ発行するtokenのprincipal。

正本:

**Auth0 issuer + Auth0 token `sub`**

Auth0 account linkingではprimary / secondaryが存在し、
link後もsecondary provider identityをtoken `sub` と同一視しない。

Auth0公式仕様では、
link後はsecondary identityがprimary user profileの `identities[]` に統合される一方、
link処理後に正しいprimary userへ自動的に切り替わらない場合があるため、
Application APIは「linkしたから現在のtoken subが必ずprimary」と仮定しない。

#### C. linked provider identity

Auth0 user profileの `identities[]` に含まれる個々のprovider identity。

識別候補:

- provider type
- connection
- provider側user_id / provider subject
- isSocial等の必要最小metadata

Apple / Google等のsecondary identityはここで管理する。

**linked provider identityをAuth0 principalと同一視しない。**

emailはA / B / Cいずれの層でも本人同一性の正本にしない。

### 6.2 概念データモデル

```text
ytk_users
  user_id UUID PK
  account_state
  cloud_storage_enabled
  cooling_off_until
  created_at
  updated_at

auth_principals
  principal_id UUID PK
  user_id UUID FK -> ytk_users.user_id
  auth_issuer TEXT
  auth_sub TEXT
  status
  valid_from
  valid_to
  UNIQUE (auth_issuer, auth_sub)

provider_identities
  provider_identity_id UUID PK
  user_id UUID FK -> ytk_users.user_id
  auth0_principal_id UUID FK -> auth_principals.principal_id
  provider TEXT
  connection TEXT
  provider_subject TEXT
  status
  linked_at
  unlinked_at
  UNIQUE (provider, connection, provider_subject)

identity_operations
  operation_id UUID PK
  user_id UUID FK
  operation_type
  state
  target_provider
  target_provider_subject
  started_at
  updated_at
  idempotency_key UNIQUE
```

整理データ:

```text
r001_...
  owner_user_id UUID FK -> ytk_users.user_id

service_records
  owner_user_id UUID FK -> ytk_users.user_id
```

### 6.3 Auth0 principalの扱い

通常ログイン時:

1. Auth0 tokenのissuer / subを検証
2. `auth_principals(auth_issuer, auth_sub)` を検索
3. activeな1件だけがinternal userIdへmappingされることを確認
4. 0件または複数ならfail closed
5. internal userIdをserver-side sessionへ固定

token `sub` が変化した場合、
email一致やprovider identity一致だけで旧userIdへ自動mappingしない。

### 6.4 linked provider identityの同期

link / unlink後はAuth0 user profileの `identities[]` をserver-sideで再取得し、
ヤットコDBの `provider_identities` とreconcileする。

Browserから送られた

- provider
- user_id
- email

だけを正本にしない。

### 6.5 primary identity変更時

Auth0側でprimary identityを変更すると、
将来発行されるtoken `sub` が変化する可能性を前提とする。

そのためprimary変更は通常linkとは別の高リスク操作とする。

必要条件:

- current internal userIdでA2 fresh
- 変更前Auth0 principalを確認
- 変更後primary candidateも強く再認証
- identity operationを開始
- Auth0側変更
- Auth0から変更後profile / principalを再取得
- 新Auth0 principalを同じinternal userIdへ明示mapping
- 旧principalは `superseded` 等へ遷移
- 全Yattoko sessionを失効
- 新principalで再ログイン
- notification
- audit

途中状態では新principalへ整理データを返さない。

### 6.6 secondary identity追加時

- current userがA2 fresh
- secondary identityを別途認証
- secondary identityが他internal userIdに紐付いていない
- Auth0 link成功後に `identities[]` を再取得
- provider identityを同じinternal userIdへ登録
- token principal自体の変更有無を確認
- notification
- audit

email一致は候補検索にもowner決定にも使わない。

### 6.7 unlink時

unlink対象はAuth0 principalではなく
明示したlinked provider identityとして扱う。

- current user A2 fresh
- unlink後も最低1つA2経路を保持
- Auth0 unlink
- Auth0 profile再取得
- 対象provider identityを `unlinked`
- unlinkしたidentityが将来独立Auth0 profileとしてログインしても、旧internal userIdへ自動mappingしない
- notification
- audit

### 6.8 最後のA2 identity削除

**禁止。**

最後のA2 identityを消す場合は、
先に別A2を追加・確認しなければならない。

Auth0上のlink数だけで判定せず、
ヤットコA2 policy上「実際にA2になれるidentity」が残ることをserver-sideで確認する。

### 6.9 Auth0 principalが変化する場合

primary変更、unlink、provider側仕様等により
Auth0 token `sub` が変化する場合、

- 新subをemail一致で既存userへ紐付けない
- 事前に認証済みidentity operationとの対応が確認できる場合だけsame internal userIdへmapping
- 対応operationがなければ新規 / 未解決principalとしてfail closed

### 6.10 二重紐付け禁止

DB制約:

- `UNIQUE(auth_issuer, auth_sub)`
- `UNIQUE(provider, connection, provider_subject)`

API:

同一provider identityが別internal userIdへ既にactive mappingされていればlinkを拒否。

競合時に「どちらかへ自動merge」はしない。

### 6.11 duplicate account

同一人物が複数ヤットコaccountを作った可能性があっても、
自動mergeしない。

将来mergeを作る場合は別仕様とし、

- 両internal accountでA2 fresh
- 双方の整理データ範囲を明示
- conflict解決
- deletion / audit
- rollback

を個別設計する。

### 6.12 認証メール

用途:

- notification
- verification
- recovery開始

本人所有者の正本ではない。

Private Relay等を含め、
email一致 / 不一致をidentity ownership判定に使わない。

### 6.13 RLSとの関係

RLSが所有者判定に使うのは最終的なinternal userId。

Auth0 principal / provider identityを直接owner列として保存しない。

identity mapping tableはuser request roleから直接SELECT不可。

RLS内部でinternal userIdを解決するhelperを使う場合は、
固定search_path、最小権限、入力claimの検証を必須とする。

## 7. A0 / A1 / A2判定

### 7.1 A0

例:

- email verification
- recovery mail確認

許可:

- recovery開始
- notification確認

P2〜P3整理内容:

**閲覧不可**

### 7.2 A1

例:

- password単独
- assurance未確認のApple / Google login

許可:

- security設定の限定導線
- A2 step-up開始

P2〜P3整理内容:

**閲覧不可**

### 7.3 A2

第一候補:

**Auth0 managed Passkeyでuser verificationを伴う認証**

Auth0公式仕様ではPasskey利用をPost-Login Actionの
`event.authentication.methods`
から検出できる。

Device Biometrics WebAuthnではuser verificationが行われるため、
R005-BではA2対象を

- Auth0 database connectionのPasskey
- 承認済みconnection
- user verificationを満たす構成

に限定する。

genericなWebAuthn / security keyでuser verificationを保証できない設定は
A2として採用しない。

### 7.4 A2 claim生成

Auth0 Post-Login Actionが、
承認済みPasskeyイベントだけに
namespaced custom claimを付与する候補。

概念:

```text
https://yattoko.example/authn_level = "A2"
https://yattoko.example/authn_method = "passkey"
https://yattoko.example/assurance_version = 1
```

実ドメイン名は未確定。

Browserがclaimを生成しない。

claimはAuth0署名token内に含める。

### 7.5 API側token検証

Application APIは最低限確認する。

- signature
- 許可algorithm
- `kid`
- JWKS取得元
- exact issuer allowlist
- exact audience
- `exp`
- `nbf`（存在時）
- `iat`
- token用途 / typ
- A2 claim
- method claim
- assurance_version
- account identity mapping

未知versionはA2へ昇格させない。

検証失敗はfail closed。

### 7.6 A2を「自作Action 1か所」だけにしない

A2は以下を重ねる。

1. Auth0 managed Passkey authentication
2. 承認済みAuth0 tenant / database connection設定
3. Post-Login ActionによるPasskey detection
4. Auth0署名済みA2 claim
5. Application APIによるJWT独立検証
6. server-side sessionへのassurance固定
7. クラウド保存開始時にAuth0 authentication methodsからPasskey登録存在をserver-side確認
8. R005-DでA1/A2混同テスト

Actionが失敗、claim欠落、version未知の場合はA1以下へdowngradeする。

### 7.7 claim有効期限

A2 claimは元tokenの寿命を超えて有効としない。

Application API session:

- overall: 最大24時間候補
- inactivity: 1時間候補
- A2 freshness: 10分候補

A2の「通常閲覧許可」と
高リスク操作の「fresh A2」を分ける。

### 7.8 fresh authentication

高リスク操作では既存A2 sessionだけで確定しない。

Auth0へ明示的な再認証を要求し、
成功callbackをApplication APIが受領した時刻を
server-side `fresh_a2_at` として記録する。

Browser申告時刻を使用しない。

OIDC `max_age` / `prompt` / `auth_time` 等の利用可否をR005-C前に最終確認する。

## 8. クラウド保存開始条件

### 8.1 初期正式案

**クラウド保存開始にはA2認証手段を最低1つ必須とする。**

代替A2方式が正式承認されるまでは、

**Passkeyを標準必須条件**

とする。

password単独、email OTP、magic link、assurance未確認Apple / Google loginでは
クラウド保存を開始できない。

### 8.2 Passkey非対応者

代替A2方式が承認されるまでは、

- 非永続 / ローカル利用に留める
- cloud storage disabled

とする。

「使えない人がいるからA1で保存可」に緩和しない。

### 8.3 2個目の認証器

比較:

#### 必須

利点:

- lockout耐性
- 端末紛失耐性

欠点:

- 初回UX負荷
- 同じ同期基盤に2個登録しても独立性が低い場合がある
- 高齢者を含む一般利用者に難しい

#### 強く推奨

利点:

- A2最低条件を維持
- 利用開始阻害を抑える
- recovery riskを明示できる

欠点:

- 1個のまま放置する利用者がいる

#### 警告のみ

安全性不足。

### 8.4 採用

**2個目の独立したA2認証器は「強く推奨」**とする。

クラウド保存開始のhard requirement:

- A2認証器1つ
- verified notification email
- recovery risk説明

2個目未登録時:

- セキュリティ状態に警告
- 設定画面で継続的に推奨
- 全A2喪失時はメールだけで完全復旧できないことを明示

production前に、
2個目必須へ引き上げる必要がないか人間レビューする。

## 9. Application API認可

### 9.1 所有者決定

原則:

**token / server-side session → issuer + subject → internal userId**

だけで所有者を決める。

無視するもの:

- URLのuserId
- body.ownerId
- hidden field userId
- client storage userId

resource IDは受理してよいが、
そのresourceがcurrent internal userIdに属するかをAPIとRLSの両方で検証する。

### 9.2 全リクエスト共通確認

- session存在
- session expiry
- inactivity
- identity active
- internal userId mapping
- account state
- cloud_storage_enabled
- required assurance level
- endpointごとのfresh auth
- cooling-off
- rate limit
- request schema version

### 9.3 account state

候補:

- `active`
- `recovery_pending`
- `protected`
- `frozen`
- `closing`
- `closed`

P2〜P3 read/write:

- active + A2: 許可候補
- recovery_pending: 拒否
- protected: 拒否
- frozen: 拒否
- closing: 拒否
- closed: 拒否

### 9.4 cooling-off

強い復旧後の初期候補:

24時間。

cooling-off中:

通常A2 read/edit:
**許可候補**

禁止:

- export
- 全削除
- 退会
- identity link/unlink
- 認証メール変更
- 全Passkey削除
- 家族 / 死後 / 緊急アクセス設定

理由:

A2を安全に再確立できた後まで全閲覧を禁止する必要性は限定的だが、
乗っ取り直後に不可逆操作を連続実行することは止める。

R005-Dで攻撃シナリオを確認し、
production前に再判定する。

## 10. Session設計

### 10.1 ヤットコsession

Auth0 sessionと別に持つ。

server-side保存候補:

- session_id hash
- internal userId
- issuer
- subject
- assurance_level
- authn_method
- authenticated_at
- fresh_a2_at
- created_at
- last_seen_at
- absolute_expires_at
- revoked_at
- session_version

Browser cookie:

- `__Host-ytk_session`
- Secure
- HttpOnly
- SameSite=Laxを初期候補
- Path=/
- Domain指定なし

OAuth redirectを含むためStrict固定とはせず、
最終挙動をR005-Cで検証する。

### 10.2 token保存

Browser JavaScriptへ長寿命Auth0 access token / refresh tokenを渡さない方向を優先。

Application APIで必要ならserver-sideに保持し、
短寿命、rotation、失効可能とする。

### 10.3 session失効

即時Application session全失効:

- password変更
- 認証メール変更
- principal identity変更
- 乗っ取り疑い
- protected / frozen移行
- 退会
- security admin操作

identity link追加だけで全session失効するかはR005-Cで検証。

## 11. Supabase / Postgres権限

### 11.1 現行key表記

今後の表記:

- publishable key
- secret key

legacy:

- anon
- service_role

BrowserからSupabaseへ直接アクセスしない第一案では、
publishable key自体も通常Browserに不要。

secret keyは通常CRUDへ使わない。

### 11.2 user request role

専用:

`ytk_user_request`

候補特性:

- NO BYPASSRLS
- superuserでない
- table ownerでない
- app schemaへの必要最小grantのみ
- DDL不可
- cross-user helper直接利用不可

Application API runtimeは
このroleを使う専用DB login credentialを持つ。

### 11.3 request claim

transaction開始後に、
Application APIが検証済みAuth0 identityの

- issuer
- subject
- assurance_level

をtransaction-local contextへ設定。

**SET LOCAL / transaction-localだけを使用し、pool connectionへ残さない。**

R005-Dでconnection reuse時のidentity leakageを試験する。

### 11.4 identity → userId helper

RLS policy内では、
issuer + subjectをauth_identity_mapへ照合して
internal userIdを返す専用functionを使う候補。

条件:

- user requestからmapping table直接SELECT不可
- functionは固定search_path
- SQL injection可能な動的SQLなし
- active identityだけ
- duplicate不可
- security definerを使う場合は専用owner roleと最小権限
- function result以外のidentity情報を返さない

### 11.5 background job role

job単位に分離。

例:

- deletion worker
- stale-state notifier
- integrity checker

cross-user処理が不要なjobには全件権限を与えない。

decrypt不要jobへKMS decrypt権限を与えない。

### 11.6 migration role

- DDL専用
- runtime secret storeへ配置しない
- migration実行時だけ利用
- schema ownerとruntime roleを分離

### 11.7 backup / restore role

- backup read
- restore専用
- 通常CRUD APIから利用不可
- restore後にdeletion journalを再適用

### 11.8 break-glass / infra

- 日常利用禁止
- 時限
- 監査
- 通常管理者から分離
- secret key / BYPASSRLSを使うならこの限定経路だけ

## 12. Supabase露出面

### 12.1 第一候補

**Data APIを無効化する。**

Application APIからPostgresへdirect / pooler connectionする。

Supabase公式では、
Data APIを使わない構成では無効化可能。

### 12.2 schema

アプリtableは `public` ではなく、

`ytk_private`

等の非公開schemaへ置く候補。

- Exposed schemasへ追加しない
- public schemaにuser data tableを作らない
- 不要なviewを作らない
- 不要なfunction / RPCを作らない

### 12.3 grant

default privilegeを前提にしない。

明示grant方式。

- PUBLIC revoke
- anon / authenticatedへの不要grantなし
- app roleへ必要operationだけ
- owner列等はcolumn-level update不可も検討

### 12.4 Network

可能なら:

- Postgres SSL enforcement
- DB / pooler network restriction
- Application APIの固定egressのみ

serverless等で固定IPが難しい場合は
R005-C前にhosting候補と合わせて再設計する。

## 13. RLS設計

全user-owned tableでRLSを有効化し、
可能なら `FORCE ROW LEVEL SECURITY` も検討する。

policyがない場合はdenyになる設計を維持する。

### 13.1 SELECT

```text
USING owner_user_id = ytk_current_user_id()
```

他user rowは0件。

### 13.2 INSERT

APIはowner_user_idをbodyから受け取らない。

候補:

- DB default / controlled insertでcurrent userId設定
- INSERT column privilegeでowner_user_id直接指定不可

policy:

```text
WITH CHECK owner_user_id = ytk_current_user_id()
```

### 13.3 UPDATE

existing row:

```text
USING owner_user_id = ytk_current_user_id()
```

new row:

```text
WITH CHECK owner_user_id = ytk_current_user_id()
```

owner変更:

- APIで禁止
- owner column update grantなし
- RLS WITH CHECKでも拒否

### 13.4 DELETE

```text
USING owner_user_id = ytk_current_user_id()
```

### 13.5 identity mapping table

一般user RLSだけで守るのではなく、
user request roleへの直接grant自体を与えない。

専用helperだけから参照。

### 13.6 RLSのThreat Boundary

Application API owner authorization + Postgres RLSの二重防御は維持する。

ただしRLSを
「Application API runtime完全侵害から独立した完全なtrust boundary」
とは扱わない。

#### RLSが強く防ぐ対象

- API queryでowner条件を書き忘れる
- resource IDを誤って別userへ向ける
- UPDATE / DELETE時のowner predicate漏れ
- mass assignmentでowner変更を試みる
- 一般的な認可実装ミス
- endpointごとのowner check欠落

つまり、
**正規Application APIが通常DB credentialで動いている状況の第二防御線**
として非常に重要。

PostgreSQLでは通常roleに対してpolicyがrow accessを制御し、
policyがなければdefault-denyとなる。
一方、superuserやBYPASSRLS roleはRLSを迂回するため、
通常runtimeにそれらを使わない。

#### RLSだけでは完全に防げない対象

Application API runtime自体が完全侵害され、
攻撃者が

- `ytk_user_request` credential
- transaction-local auth contextを設定する能力
- arbitrary query実行能力

を同時に得た場合、
攻撃者が別userのissuer / subject / internal contextを偽装する可能性がある。

non-BYPASSRLS credentialでも、
RLS policyへ与えるcaller contextそのものを侵害runtimeが自由に偽装できるなら、
RLSは独立した本人認証器にはならない。

したがって、

**RLSはApplication runtime完全侵害を無効化する魔法の壁ではない。**

### 13.7 runtime完全侵害の残余リスク低減

残余リスクを以下で下げる。

#### Application layer encryption

DBだけを奪われた場合、
P2〜P3具体値を平文で読みにくくする。

ただしruntime + KMS decrypt権限まで完全侵害された場合は復号可能。
これも完全防御とは扱わない。

#### KMS権限分離

- DB roleとdecrypt roleを分離
- background jobへ不要なdecrypt権限を付与しない
- decrypt operationを監査
- key scopeを最小化
- 将来可能ならservice / key分割でblast radiusを抑える

#### runtime最小権限

- user request roleはapp table必要operationだけ
- DDL不可
- backup不可
- migration不可
- journal delete不可
- Auth0 Management APIも必要scopeだけ

#### network restriction

- DB接続元制限
- KMS / secret store接続元制限候補
- management endpointをpublic application pathから分離

#### secret rotation

- DB credential rotation
- Auth0 Management credential rotation
- session signing secret rotation
- KMS credential / workload identity rotation
- leak疑い時の即時失効手順

#### 監査 / 検知

- abnormal cross-user query volume
-大量decrypt
- unusual admin operation
- identity context switching異常
- break-glass use

をcontent本文なしで監査する。

### 13.8 より独立したDB認可境界の将来候補

必要になれば、
Application APIが任意に偽造しにくい
認証provider署名済みuser tokenをDB authorization contextへ直接利用する方式も比較可能。

ただし、

- internal userId mapping
- A2 custom policy
- Data API exposure
- server validation

が複雑になるため、
R005-Bでは採用せず残余リスクとして記録する。

## 14. RLS受入条件 / R005-D

RLSは「設定した」で完了としない。

以下の自動テストPASSを承認条件とする。

- user A → user A SELECT: 許可
- user A → user B SELECT: 0件 / 拒否
- user B → user A SELECT: 0件 / 拒否
- 未認証: 拒否
- A0: P2〜P3拒否
- A1: P2〜P3拒否
- A2: 本人のみ許可
- URL userId改ざん: 拒否
- body ownerId改ざん: 無視 / 拒否
- resource IDを他人IDへ変更: 拒否 / 0件
- INSERTで他人ownerId: 拒否
- UPDATEでowner変更: 拒否
- UPDATE他人record: 拒否 / 0件
- DELETE他人record: 拒否 / 0件
- Data API直接操作: endpoint無効または拒否
- DB policy除去テスト環境: fail-safeが検知
- pool connection reuseで前user claim残存: なし

## 15. DB Constraint

RLSはowner隔離。
値の正しさは別防御。

平文構造field:

- NOT NULL
- FK
- UNIQUE
- CHECK
- enum相当
- supported schemaVersion
- timestamp整合

自由JSON catch-all columnを
「将来用」という理由で作らない。

### 15.1 owner

- UUID
- NOT NULL
- FK
- immutable

### 15.2 category

A〜L固定ID allowlist。

### 15.3 schemaVersion

未対応versionはAPIで拒否し、
DBもsupported version constraint候補を持つ。

### 15.4 encrypted payload

暗号化対象内部値はDBから意味を検査できない。

そのため、

- Application APIで暗号化前にstrict schema validation
- payload type/version
- ciphertext size
- crypto version
- wrapped-key metadata

だけDB constraintを持つ。

これは暗号化B案の明示的trade-off。

## 16. 保存データ境界

サーバー保存対象はR003 APPROVED範囲のみ。

保存候補:

- R001 category state
- R001 five answers
- category intention
- R002 service record
- usage state
- service intention override
- conditional answers
- last checked
- schema/data model version
- opaque IDs / timestamps

保存しない:

- 5 risk derived result
- progress UI
- screen history
- message / email body
- photo / file
- exact balance
- full transaction history
- external service email / phone / username actual values
- free memo

## 17. R003 D区分: 入力・保存禁止

ヤットコ整理データとして以下を入力・保存しない。

- password
- PIN / 暗証番号
- 端末passcode
- OTP
- OTP seed
- recovery code
- private key / 秘密鍵
- seed phrase
- card full number / カード完全番号
- CVV / CVC
- passkey private / 秘密情報
- API key
- access token
- SSH private key
- cloud secret key
- deploy key
- session cookie / session token
- secret question answer / 秘密の質問の回答
- その他、直接login / identity bypass / asset操作に使える秘密

禁止方法:

- DB列を作らない
- API schema fieldを作らない
- metadata JSONを作らない
- free memoを作らない
- unknown fieldを保存しない

Auth0やApplication APIが認証処理として扱う
ヤットコ自身のsession/token等と、
「整理データとして保存すること」は別物。

認証秘密を整理DBへ入れない。

## 18. 「その他」サービス名 server validation

client-side検知はUX補助であり、
security boundaryではない。

### 18.1 正規化

APIで:

1. Unicode NFKC候補
2. trim
3. repeated whitespace正規化
4. length再計算

### 18.2 長さ

初期候補:

**1〜80 Unicode code points**

R005-Cで日本語service名を含めUX検証。

### 18.3 拒否

- NUL
- C0 / C1 control character
- newline / tab
- bidi制御文字
- 過剰なzero-width character
- HTML / script用途断片
- 用途外の長文

### 18.4 service名文法

Unicode letters / numbers / marks / spacesと、
service名で妥当な限定punctuationを中心に許可する。

「何でも文字列」を受けない。

### 18.5 秘密情報候補

明確な候補は拒否。

例:

- email address形式
- phone numberらしい長い数字列
- Luhn成立するcard番号長
- PEM header
- API token prefix
- access token / JWT形状
- `password=...`
- `pin:...`
- recovery code形状
- 12 / 24語等のmnemonic-like phrase

ただし
「1Password」のような正当なservice名を
keywordだけで拒否しない。

**秘密情報検出は補助線であり、本防御はservice-name用途に入力形状を絞ること。**

serverがrejectした本文をerror logへ出さない。

## 19. 運営者アクセスと暗号化比較

### A: DB平文 + RBAC / RLS /監査

DB管理者耐性:
低〜中。

利点:

- 単純
- DB constraint / queryが最大限使える
- 復旧容易
- migration容易

欠点:

- DB / backupへ強権限を持つ人はP2〜P3を読みやすい
- DB credential漏えい時のimpactが大きい

判定:

**単独採用しない。**

### B: 機微fieldのみApplication layer encryption

DB管理者耐性:
中〜高。

初期暗号化対象候補:

#### R001

- 5問回答payload
- category intention

#### R002

- service catalog ID
- その他service名
- usage state
- service intention override
- conditional answers

平文に残す構造metadata候補:

- internal owner_user_id
- record UUID
- category ID
- record type
- schemaVersion
- created / updated timestamp
- deletion state

利点:

- DB dumpだけでは具体的service名・資産/家族/復旧回答等が読みにくい
- RLS owner列は平文のまま維持できる
- Cより鍵管理が軽い
- 将来family accessを完全に阻害しない

欠点:

- encrypted payload内部へDB CHECKをかけられない
- Application API decryptが必要
- cross-record consistencyはAPIへ寄る
- key管理が新しいcritical systemになる

### C: ユーザー単位Application layer encryption

例:

userごとにDEKを持ち、
ほぼ全contentをuser keyで暗号化。

DB管理者耐性:
高。

利点:

- DB breach時のblast radiusを細かくできる
- user単位crypto-erasureへ発展可能

欠点:

- key loss時にデータ全喪失
- recoveryが複雑
- family / delegate accessが大幅に複雑
- backup/restore/key lifecycleが難しい
- key rotationが複雑
- R001/R002整合処理がApplicationへ全面移行
- 誤実装時のavailability事故が重大

判定:

**初期採用しない。**

### 19.1 採用

**B: 機微fieldのみApplication layer encryption を採用する。**

暗号化はRLS / RBACの代替ではなく追加防御。

### 19.2 鍵管理方針

具体providerはR005-Bで固定しないが、
本番対象ではmanaged KMSを前提候補とする。

要件:

- keyをDBへ平文保存しない
- keyをGitHubへ保存しない
- Browserへkeyを渡さない
- Application API decrypt roleだけに最小権限
- DB / infra roleとKMS decrypt roleを通常は分離
- background jobに不要なdecrypt権限を与えない
- key versioning
- rotation可能
- decrypt audit
- backupにmaster keyを同梱しない

### 19.3 暗号payload

hand-written cryptoを避け、
managed KMS / well-reviewed AEAD libraryを使う。

AAD候補:

- internal userId
- record ID
- record type
- schemaVersion

によりciphertextの別user / 別recordへの差し替えを検出可能にする。

具体algorithmはR005-C以降で正式選定し、
R005-Bでは自作暗号を禁止する。

### 19.4 限界

Application APIが侵害され、
KMS decrypt権限も奪われた場合は復号可能。

BはE2EEではない。

目的は、

- DB単独漏えい
- backup単独漏えい
- DB管理権限のみの閲覧

のimpact低減。

## 20. 復旧設計

### 20.1 email only

A0。

P2〜P3:

- read不可
- write不可

### 20.2 password reset

password resetだけでA2にしない。

Passkey登録済みなら、
整理データを開く前にPasskey step-up。

### 20.3 A2 authenticator追加

原則:

- 既存A2 fresh authentication
- 新authenticator enrollment
- 通知
- audit

emailだけで新A2を作らない。

### 20.4 全A2喪失

- recovery_pending
- protected / frozen
- P2〜P3非表示
- edit/delete/export不可
- supportによる手動解除不可
- 整理内容を本人確認材料にしない

安全な本人確認方式が存在しなければ
無理に復旧しない。

### 20.5 protected / frozen

Application API sessionが存在しても
data endpointでdeny。

security / recovery endpointだけ許可候補。

### 20.6 cooling-off

強い復旧後24時間候補。

禁止操作は9.4に従う。

### 20.7 Identity link / unlinkの分散処理

Auth0とヤットコDBは同一transactionにできない。

したがってlink / unlinkを
「Auth0 API成功 + DB更新」で終わる単純二段処理にしない。

#### operation正本

`identity_operations` を持つ。

最低項目:

- operation_id
- internal userId
- operation_type: link / unlink / primary_change
- target provider identity
- idempotency_key
- state
- attempt_count
- last_error_code
- started_at
- updated_at
- completed_at

整理内容本文は保存しない。

#### 状態候補

```text
initiated
→ auth0_pending
→ auth0_applied
→ db_applied
→ verified
→ completed

失敗:
retryable_failed
manual_reconcile_required
compensating
compensated
failed_closed
```

#### link正常系

1. A2 fresh確認
2. operation作成
3. secondary identity再認証
4. duplicate provider identity確認
5. Auth0 link
6. state = auth0_applied
7. Auth0 profile / identities[]再取得
8. DB provider identity mappingをidempotent upsert
9. state = db_applied
10. Auth0 / DB一致再確認
11. state = verified / completed
12. notification / audit

#### Auth0 link成功 → DB mapping失敗

**fail closed。**

- 新secondary identity経由でP2〜P3を許可しない
- operationを `auth0_applied` / retryable_failedとして保持
- idempotency keyでDB mappingをretry
- Auth0 `identities[]` を再取得して事実確認
- retry上限を超えたらmanual_reconcile_required
- 安全に補償可能ならAuth0 unlinkで元状態へ戻す
- compensationも失敗したらidentity操作を凍結し、対象identityからdata access不可

「Auth0でlinkedだからDB ownerも同じはず」と推測しない。

#### DB mapping成功 → Auth0 link失敗

linkではDB mappingをAuth0成功前にactive化しない。

準備recordが必要なら `pending` に限定する。

Auth0失敗時:

- pending mappingを無効化 / 削除
- data accessへ使用不可
- retryは同じoperation_id / idempotency_key
- completedになるまでsecondary identityをowner解決へ使わない

#### unlink正常系

1. A2 fresh
2. 最後のA2でないことを確認
3. operation作成
4. Auth0 unlink
5. state = auth0_applied
6. Auth0 identities[]再取得
7. DB identityを `unlinked` / revoked
8. active session再評価・必要時失効
9. verified
10. notification / audit

#### Auth0 unlink成功 → DB更新失敗

最優先は**unlink済みidentityが旧userデータへアクセスし続けないこと**。

そのため:

- Application APIのprincipal resolutionでoperation中identityをdenylist扱い
- affected userのYattoko sessionを失効
- DB updateをretry
- reconcile完了までidentity-sensitive操作を停止

#### DB更新成功 → Auth0 unlink失敗

DBを先にactive mappingから外す実装は原則避ける。

やむを得ず発生した場合:

- mappingを `unlink_pending`
- Auth0側ではまだlinkedでも、当該secondary経路をApplication APIでA2 / owner解決に使用しない
- Auth0 unlinkをidempotent retry
- compensationでDBをactiveへ戻す場合もAuth0状態を再取得してから行う

#### idempotency

すべてのlink / unlink / primary changeに
一意なidempotency keyを付与する。

同じoperationの再送で、

- provider identity二重作成
- duplicate mapping
- 二重unlink

を起こさない。

#### reconciliation

定期 / on-demandで、

- Auth0 principal
- Auth0 identities[]
- auth_principals
- provider_identities
- identity_operations

を比較するreconciliation jobを持つ候補。

差分があっても自動mergeしない。

安全に一意修復できない差分はfail closed + manual review。

#### 監査

記録候補:

- operation_id
- opaque userId
- operation type
- provider type
- old/new principal opaque ID
- state transition
- success/failure
- error code
- timestamp

記録禁止:

- token
- email本文
- provider access token
- 整理内容

### 20.8 認証メール変更

- A2 fresh
- new email verify
- old email notification
- Application sessions全失効候補
- cooling-off候補

### 20.9 session失効

乗っ取り・recovery・主要identity変更時:

1. Yattoko server sessionを即時全失効
2. Auth0 refresh token / sessionも可能な範囲でrevoke
3. revokeが非同期でもApplication API利用は既に停止
4. 新A2が必要

## 21. 削除設計

### 21.1 1件削除

通常service record:

- current A2 session
- fresh authは原則不要
- owner API確認
- RLS確認
- transaction delete
- deletion journal追加

削除したserviceからR001を否定方向へ自動変更しない。

### 21.2 category削除

high-risk。

- fresh A2
- 対象件数表示
- 明示確認
- category配下service削除
- R001 category削除
- deletion journal
- transaction / job state

### 21.3 全整理データ削除

- fresh A2
- cooling-off中不可
- accountは残す
- content tables全削除
- deletion journal
- audit
- server session継続可だがfresh flag消去

### 21.4 退会

順序:

1. fresh A2
2. account state = closing
3. 全Yattoko session失効
4. 新login拒否
5. 整理content削除
6. deletion journal
7. content削除確認
8. identity mapping無効化
9. Auth0 account削除 / 最終無効化
10. internal account最終状態
11. 最小削除auditだけ保持

「Auth0だけ消えてcontentが孤児化」を避ける。

## 22. Tombstone / Deletion Journal

### 22.1 正本

**Deletion Journalの正本は、復元対象Supabase Postgresとは独立した耐久・append-only storeへ置く。**

復元対象DBと同じbackup setの中にしかjournalが存在しない構成は禁止する。

Supabase DB内には高速参照用のworking tombstone mirrorを持ってよいが、
それをrestore後再削除の唯一正本にしない。

### 22.2 候補比較

#### 案A: 独立append-only object storage

例として、
primary DBとは別のaccount / project / backup lifecycleを持つ
object storageでimmutable / versioning / retention lockを利用する構成。

利点:

- primary DB backupから独立
- append-onlyにしやすい
- 低コスト
- restore後に時系列eventを再適用しやすい
- DB migrationに巻き込まれにくい

欠点:

- lookup用indexを別途工夫
- object lifecycle設計が必要
- provider選定が必要

#### 案B: 独立managed database

primary Supabase projectとは別の
削除journal専用database / account。

利点:

- queryしやすい
- transaction / constraintを使いやすい

欠点:

- 運用対象が増える
- 同じ誤操作domainへ置くと独立性が弱い
- DB backup設計がもう一系統必要

#### 案C: primary DB内だけ

**不採用。**

古いbackup restore時に、
backup取得後の削除event自体が巻き戻るため。

### 22.3 採用案

**案A: primary DBから独立したappend-only journal storeを第一候補とする。**

具体providerはR005-C前の別承認事項。

要件:

- primary Supabase projectとは別backup / deletion lifecycle
- append-only
- object versioning / immutability相当
- Application runtimeはappendのみ
- update / overwrite / delete権限なし
- restore workerはread可能
- lifecycle deletionは専用管理経路
- break-glass以外で過去eventを書き換え不可
- journal操作を監査

### 22.4 保存項目

必要最小限:

- journal_event_id
- opaque internal userId
- opaque record ID（対象がrecordの場合）
- deletion type
- delete generation
- deletion timestamp
- backup cutoff / source generation
- schemaVersion
- event integrity metadata

保存禁止:

- service名
- answer
- intention
- email
- provider identity本文
- encrypted content本文

### 22.5 delete generation

単なるtimestampだけでなく、
user / record単位の単調増加generationまたは
globally ordered event ID候補を持つ。

restore時に

「このbackup以降に発生したdelete」

を一意に抽出できることを要件とする。

### 22.6 journal改ざん対策

候補:

- append-only IAM / role
- object lock / immutability
- versioning
- event checksum
- hash chainまたは署名/HMAC等のintegrity metadata
- KMS-backed signingを採る場合はjournal writer権限と管理者権限を分離

具体方式はR005-C以降で選定し、
手書き暗号へ依存しない。

### 22.7 journal削除

保持期間:

**primary backup最大保持期間 + 7日以上**

ただし削除条件は日数だけにしない。

journal eventを削除できるのは、

- 対応する古いbackupがすべて失効済み
- restore対象として利用されないことを確認済み
- 法的 / 運用上追加保持不要

を満たした後。

lifecycle jobだけが削除可能とする候補。

通常Application APIにはjournal delete権限を与えない。

### 22.8 journal自身のbackup / 耐久性

journal正本を一つの単一媒体だけに置かない。

候補:

- object storage自体のdurability + versioning
- 別account / regionへの複製
- 定期manifest snapshot
- integrity verification

ただしjournal backupも整理内容本文を含めない。

journal backupのretentionは
「primary backupを復元し得る期間」を必ずカバーする。

### 22.9 primary DB mirror

primary DBに

- deletion state
- tombstone
- last deletion generation

等をmirrorしてよい。

用途:

- 通常処理高速化
- duplicate delete防止

ただしrestore安全性の正本は独立journal。

### 22.10 restore時

1. primary DB backupを隔離restore
2. backup cutoff / generationを特定
3. 独立Deletion Journalからcutoff後eventを取得
4. event integrity検証
5. deleteをidempotent再適用
6. closed account / deleted record確認
7. journal適用完了generationを記録
8. cross-user / RLS試験
9. 人間承認
10. user traffic再開

独立journalへ到達できない場合、
restore環境を本番相当trafficへ戻さない。

## 23. Backup / Restore

### 23.1 backup

目的:

障害復旧のみ。

禁止:

- analytics
- support閲覧
- 削除回避保管
- test fixtureへの転用

retention:

**最大30日候補**

実planが短ければ短い期間を優先。

### 23.2 restore手順

restore完了だけでservice reopenしない。

必須順序:

1. restore隔離状態
2. schema version検証
3. deletion journal取得
4. backup時点以降のdeleteを再適用
5. closed / deleted userを再削除
6. orphan check
7. RLS / grant / policy検証
8. encryption decrypt sample確認（dummyのみ）
9. cross-user security test
10. 人間承認
11. service reopen

削除再適用前に通常user trafficへ戻さない。

### 23.3 orphan prevention

FK / cascadeを利用できるところは利用。

ただしAuth0は外部systemなので、
DB transactionだけでは完結しない。

closing state + idempotent deletion jobを前提とする。

## 24. ログ / 監視

**allowlist方式**。

### 24.1 記録候補

- event type
- opaque internal userId
- opaque resource ID
- correlation ID
- success / failure
- error code
- processing duration
- app version
- schemaVersion
- auth assurance level
- action category（read/write/delete等）

### 24.2 記録禁止

- request body
- response body
- known service name
- その他service名
- intention
- asset
- familyKnow
- conditional answers
- password
- OTP
- token生値
- cookie生値
- Auth0 access / refresh token
- encryption plaintext
- ciphertext全文
- auth secret
- DB credential

### 24.3 error

validation error時に
入力値を本文としてloggerへ渡さない。

例:

OK:
`invalid_field: otherServiceName / reason: invalid_shape`

NG:
`invalid value: xxx@example.com`

### 24.4 APM / session replay

整理画面:

- session replay無効
- DOM capture無効
- request body capture無効
- breadcrumbへfield valueを入れない

## 25. 管理者アクセス

### 通常support

- A2 / phishing-resistant MFA
- content不可
- DB不可

### 通常admin

- A2 / phishing-resistant MFA
- user state / job / aggregateのみ
- content不可
- DB直接不可

### DB / infra

- separate admin identity
- phishing-resistant MFA
- temporary access
- encrypted sensitive contentはKMS権限なしでは復号不可
- query audit

### break-glass

- separate identity
- strongest MFA
- time-bound
- reason
- approval
- full audit
- KMS decryptが必要なら別承認

## 26. Frontend Hardening

R005-Cで全部を完成させる必要はないが、
本番前必須要件として固定する。

### 26.1 debug global

production buildで、

- `globalThis.YTK`
- `window.YTK`
- state dump
- debug helper

等を残さない。

R002 prototypeは今回変更しない。

### 26.2 CSP

本番候補:

- `default-src 'self'`
- scriptはnonce / hash方式
- inline script最小化
- `object-src 'none'`
- `base-uri 'self'`
- `frame-ancestors 'none'`
- connect-srcをYattoko API / Auth0等必要先だけへ
- report-onlyから段階適用

正確なdirectiveはR005-C以降で使用frameworkに合わせる。

### 26.3 XSS

- user textをHTMLとして解釈しない
- DOM `innerHTML`へ直接入れない
- framework escape機能を維持
- URL / attribute context別escape
- unsafe HTML機能を原則禁止

### 26.4 CSRF

server-side cookie authのため必須。

候補:

- SameSite
- CSRF token
- Origin検証
- state-changing method限定
- GETで更新しない

OAuth callback:

- state
- PKCE
- nonce

### 26.5 secrets

- client bundleへsecretなし
- source mapにsecretなし
- GitHubへcredentialなし
- env file commit禁止
- CI logへsecretなし
- client-side env prefixへsecretを置かない

**source codeを非公開にすることを秘密保持手段にしない。**

## 27. R005-D 攻撃 / セキュリティ試験一覧

### 認証

- 改ざんJWT
- unknown issuer
- wrong audience
- expired token
- unknown kid
- unsupported algorithm
- A0でdata endpoint
- A1でdata endpoint
- A2 claim欠落
- unknown assurance version
- old A2 tokenでfresh-required操作
- revoked Yattoko session
- frozen account
- closing account

### identity

- email一致によるauto-link不可
- 同一issuer+subjectの別user link拒否
- A1でlink拒否
- stale A2でlink拒否
- secondary identity未認証link拒否
- 最後のA2 unlink拒否
- duplicate account auto-mergeなし

### API owner

- URL userId改ざん
- body ownerId注入
- unknown field
- mass assignment
- resource ID cross-user
- direct endpoint call

### RLS

- A→A SELECT
- A→B SELECT
- B→A SELECT
- unauthenticated
- INSERT他人owner
- UPDATE owner
- UPDATE他人
- DELETE他人
- pool claim leakage
- missing policy default deny
- owner function malformed claim

### input / D区分

- password field unknown
- token field unknown
- metadata catch-all拒否
- PEM
- JWT
- API token prefix
- email in other service
- card-like input
- control char
- bidi
- long text
- mnemonic-like phrase
- legitimate `1Password` false positive確認

### DB surface

- Data API disabled
- public schemaからapp table不可
- anon / authenticated不要grantなし
- publishable keyだけでdata不可
- secret keyがBrowserに存在しない
- service role相当がruntime通常CRUDにない

### encryption

- DB dumpでencrypted fieldが平文でない
- record間ciphertext swap失敗
- user間ciphertext swap失敗
- KMS権限なしでdecrypt不可
- backup単独で平文不可
- key version migration

### deletion / restore

- 1件delete
- category delete
- all content delete
- retirement
- orphanなし
- restore後deleted record復活なし
- deletion journal再適用
- restore前RLS再確認

### logging

- validation errorに本文なし
- 500 errorにbodyなし
- APMにservice名なし
- session replayなし
- token / cookieなし

### frontend

- XSS payload
- CSRF
- clickjacking
- debug globalなし
- bundle secret scan
- Git history secret scan

R005-Dでは「設定あり」ではなく
**攻撃試験PASS**を承認条件にする。

## 28. Auth0 → Cognito切替条件

Auth0を第一候補として維持する。

ただしR005-Cの外部環境作成を承認する前に、
以下のいずれかがhard blockerになった場合はCognitoへ切替再審査する。

### 切替条件1: A2信頼根

Auth0で

- Passkey利用
- user verification相当
- signed server-consumable assurance

を公式に支持された方法で安定して表現できない。

Actionの脆い独自判定だけに依存し、
第二確認手段を作れない場合。

### 切替条件2: identity link

R004の

- existing A2 fresh
- secondary identity認証
- email auto-link禁止
- explicit link/unlink
- audit

を安全に構成できない。

### 切替条件3: session

Application APIのserver-side sessionを組み合わせても、
必要な即時失効 / logout / recovery失効を安全に満たせず、
Enterprise Session APIが必須となる。

### 切替条件4: 費用

R005必須検証に必要なAuth0 plan費用が
人間が承認する予算を超える。

### 切替条件5: 複雑性

Auth0 Actions + custom claim + application sessionの構成が、
Cognito標準の

- acr
- amr
- auth_time
- max_age

より明確に誤実装リスクが高いとレビューで判定される。

Cognitoへ切り替える場合も、
R005-A / R004要件を緩和しない。

## 29. Auth0継続判断

現時点:

**Auth0継続。Cognitoへ切り替えない。**

理由:

- Auth0 managed Passkey
- passkey利用検知
- user-initiated identity link
- Application API server-side sessionでsession制御を補完可能
- R004の明示link設計にCognitoより近い

ただしA2 user verificationの具体的保証方法と
Auth0 Essentials範囲の最終確認は
R005-C外部設定前のblocker。

## 30. R005-Cへの実装要件

R005-Bが人間APPROVEDされた場合のみR005-Cへ渡す。

### 必須スコープ

完全ダミーデータだけ。

実ユーザーなし。

### Application API

- BFF/server-side session
- token verification
- issuer/audience/expiry
- A0/A1/A2
- internal userId mapping
- active/protected/frozen
- cloud storage gate
- fresh auth gate
- strict input allowlist
- server-side conditional pruning
- R001/R002 consistency
- encryption layer
- allowlist logging

### DB

- ytk_private schema
- Data API disabled候補
- explicit grants
- ytk_user_request role
- RLS SELECT/INSERT/UPDATE/DELETE
- owner immutable
- Auth0 principal unique
- provider identity unique
- identity operation state / idempotency
- constraints
- schemaVersion
- deletion journal

### Auth

- dummy account only
- Passkey
- A2 claim
- no real Apple / Google unless別途承認
- no production identity
- no real user email beyond dedicated test address if external environment is later separately approved

### Security testability

R005-Dのtest IDを
実装component / endpoint / policyへ対応付けられること。

## 31. 未確定事項

R005-C開始前に人間承認または設計確定が必要:

- Application API hosting/runtime
- fixed egress IPを確保できるか
- Supabase direct / pooler connection方式
- `ytk_user_request`の具体GRANT
- transaction-local claim実装方法
- RLS helperのsecurity definer採否
- Auth0 custom claim namespace
- Auth0 Passkey user verificationの最終保証確認
- Auth0 Management APIでPasskey存在確認する具体scope
- Auth0 Essentialsで必要機能を満たせるか
- server-side session store
- 24h / 1h / 10min timeout最終値
- second A2をproductionで必須化するか
- Passkey非対応の代替A2
- managed KMS provider
- encrypted field payload schema
- encryption algorithm / library
- key rotation手順
- Supabase plan / backup retention
- deletion journal具体provider / account / immutability方式
- deletion journal replication / integrity方式
- API / DB network restriction
- break-glass二者承認を運用可能か
- R005-Cを完全localから始めるか、外部dev環境を別承認で作るか

## 32. 今回未実施

以下は実施していない。

- Auth0 tenant作成
- Cognito User Pool作成
- Supabase project作成
- 契約
- 課金
- APIキー発行
- OAuth設定
- DB作成
- SQL実行
- API実装
- Passkey実装
- 外部接続
- R002 prototype修正
- R005-C開始
- 本番公開

## 33. 参考公式資料

### Auth0

- Passkey usage detection in Post-Login Actions
  https://support.auth0.com/center/s/article/detecting-passkey-usage-in-auth0-post-login-actions
- Link User Accounts
  https://auth0.com/docs/manage-users/user-accounts/user-account-linking/link-user-accounts
- WebAuthn as MFA
  https://auth0.com/docs/secure/multi-factor-authentication/webauthn-as-mfa
- Universal Login / Passkeys
  https://auth0.com/docs/authenticate/login/auth0-universal-login
- Refresh Token Rotation
  https://auth0.com/docs/secure/tokens/refresh-tokens/use-refresh-token-rotation
- Session Management API
  https://auth0.com/blog/introducing-session-management-api/

### Supabase

- Securing your data
  https://supabase.com/docs/guides/database/secure-data
- Securing your API / Disable Data API
  https://supabase.com/docs/guides/api/securing-your-api
- API Keys
  https://supabase.com/docs/guides/getting-started/api-keys
- Row Level Security
  https://supabase.com/docs/guides/database/postgres/row-level-security
- Server withPostgresClient
  https://supabase.com/docs/reference/server/middleware-withpostgresclient
- Network Restrictions
  https://supabase.com/docs/guides/platform/network-restrictions
- Custom Schemas
  https://supabase.com/docs/guides/api/using-custom-schemas

### PostgreSQL

- Row Security Policies
  https://www.postgresql.org/docs/current/ddl-rowsecurity.html
- CREATE POLICY
  https://www.postgresql.org/docs/current/sql-createpolicy.html

## 34. 正式提案

R005-Bとして以下を人間承認候補とする。

1. Auth0 + Application API/BFF + Supabase Postgres
2. BrowserからSupabaseへ直接アクセスしない
3. Data APIは不要なら無効化
4. internal UUIDをowner正本
5. internal userId / Auth0 principal / linked provider identityを3層分離し、Auth0 principalはissuer + token sub、provider identityはprovider側subjectとして別管理
6. emailはidentity keyにしない
7. cloud storage開始には最低1 A2
8. 代替A2承認まではPasskey必須
9. 2個目A2は強く推奨
10. A2はAuth0 managed Passkey + signed claim + API validation + server session + enrollment確認で多層化
11. user requestはnon-BYPASSRLS専用role
12. API owner auth + RLS + DB constraint。ただしRLSは一般的認可ミスへの第二防御であり、Application runtime完全侵害への独立境界とは扱わない
13. public/Data API surfaceを最小化
14. D区分はfield/column/JSONすべて禁止
15. 機微fieldへApplication layer encryptionを追加
16. full per-user encryptionは初期不採用
17. recoveryはメールだけでdataを返さない
18. deletion journal正本をprimary DBから独立したappend-only storeへ置き、restore時は再適用後までuser trafficを開かない
19. loggingはallowlist
20. R005-D攻撃テストPASSを承認条件とする

## 35. 停止条件

本成果物を人間がAPPROVEDするまで、

- R005-C
- Auth0 tenant
- Cognito User Pool
- Supabase project
- Application API hosting
- KMS
- contract
- billing
- API key
- OAuth
- DB
- SQL
- implementation
- external connection
- production

へ進まない。

**人間承認待ちで停止する。**
