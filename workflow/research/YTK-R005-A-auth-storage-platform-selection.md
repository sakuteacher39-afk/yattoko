# ヤットコ 調査報告

調査ID: YTK-R005-A
状態: DRAFT（技術選定調査完了・人間承認待ち）
調査日: 2026-10-04

## 調査テーマ

YTK-R005-A
「認証・保存基盤 技術選定調査」

## 調査目的

YTK-R003「保存データ仕様」とYTK-R004「認証設計」のAPPROVED方針を満たしながら、
YTK-R005-Cでダミーデータのみを用いた最小サーバープロトタイプを安全に構築できる
認証基盤・保存基盤の候補を比較し、R005-Bの非公開アーキテクチャ設計へ渡す技術選定候補を整理する。

今回のR005-Aでは以下を行わない。

- APIキー発行
- OAuth設定
- Apple / Google Developer設定
- 秘密鍵作成
- auth provider契約
- DB作成
- Supabase / Firebase等のプロジェクト作成
- 外部サービス接続
- 認証実装
- Passkey実装
- サーバー実装
- 本番環境作成
- 公開環境接続
- 実ユーザーデータ保存
- R005-B以降の自動開始

## 固定安全条件

R005全体で以下を固定する。

- 実ユーザーデータを使用しない
- 本番環境を作成しない
- 公開環境へ接続しない
- 初期検証は完全なダミーデータのみ
- managed authentication基盤を原則優先
- 自前認証は別途セキュリティレビューなしでは採用しない
- 技術選定完了前にAPIキー、OAuth、秘密鍵、外部契約を作成しない
- R003のD区分秘密情報をAPI / DBスキーマへ作らない
- 最小権限を基本とする
- 他ユーザーの整理データへアクセスできる構造を許可しない
- ログ / 分析 / 監視基盤へ整理内容を送信しない
- 削除 / バックアップ失効を保存機能と同時に設計する
- 各フェーズ終了時に人間承認待ちで停止する

## 前提となるR003 / R004要件

### R003から引き継ぐ要件

- サーバー保存対象は必要最小限の構造化データ
- 外部サービス識別情報の実値は標準保存対象外
- 自由メモなし
- D区分秘密情報の入力 / 保存禁止
- R001 / R002整合性検証
- schemaVersion / dataModelVersion
- サーバー側allowlist入力検証
- 条件分岐で不要な回答のサーバー側除去
- 1件削除 / カテゴリ削除 / 全削除 / 退会削除
- バックアップからの削除済みデータ復活防止
- 通常運営者に整理内容を見せない
- ログ / APM / エラー監視等へ整理内容を送らない

### R004から引き継ぐ要件

- managed authentication基盤優先
- Passkey-first
- A0 / A1 / A2認証保証レベル
- P2〜P3整理データ閲覧はA2を原則必須
- password単独 / email-only / assurance未確認OIDC単独をA2にしない
- Passkey利用をサーバー側で判定可能
- identity link / unlinkを安全に制御
- メール一致による自動link禁止
- 自動merge禁止
- provider識別はissuer + subject
- session revoke
- fresh authentication / step-up
- protected / frozen復旧状態
- 管理者フィッシング耐性MFA
- support / admin / infra / break-glass分離
- authデータと整理データの論理分離

## 評価軸

認証基盤は以下で比較する。

1. Passkey / WebAuthn
2. Passkey利用判定
3. A0 / A1 / A2表現のしやすさ
4. step-up / fresh authentication
5. session revoke
6. 複数Passkey / authenticator
7. Apple / Google OIDC
8. identity link / unlink
9. メール一致自動linkを避けられるか
10. 復旧フロー制御
11. rate limit / attack protection
12. 管理者MFA / RBAC
13. 監査
14. データ所在
15. export / provider移行
16. provider障害時の運用
17. 機能成熟度

保存基盤は以下で比較する。

1. ユーザー単位の行 / ドキュメント隔離
2. サーバー側認可
3. スキーマ制約
4. R001 / R002整合性処理
5. トランザクション
6. バージョン管理 / migration
7. 削除
8. バックアップ / restore
9. 削除済みデータ復活防止設計
10. 東京 / 日本リージョン
11. export / 移行性
12. managed authとの統合
13. ダミーデータによる非公開検証のしやすさ

## 認証基盤候補比較

### 候補1: Auth0

#### 確認できた点

- Universal LoginでPasskeyを認証方式として利用可能
- Passkeyはdatabase connectionで利用可能
- Post-Login Actionの `event.authentication.methods` からPasskey利用を判定できる
- Passkey利用時は `method.name === "passkey"` を確認できる
- MFA / step-up認証を構成可能
- session / refresh token管理・失効機能がある
- Management APIでユーザーidentity linkが可能
- 公式account linkingガイドでは、link前に両identityを認証することを推奨
- user-initiated account linkingが可能
- Auth0のユーザーアカウントはproviderごとに別profileが初期状態で、明示linkが必要
- ユーザーexport機能がある
- Public Cloudで日本リージョンが提供されている

#### R004との適合

**高い。**

特に重要なのは以下。

- Passkey利用をActionで検出できるため、A2判定用claim生成の候補にできる
- Auth0はR004で禁止した「メール一致だけで自動link」を必須動作としていない
- user-initiated linkで両アカウント認証を要求する構成が可能
- step-up設計が可能
- session revokeを実装できる
- provider identityとアプリ内部userIdを分離できる

#### 注意点

- PasskeyはAuth0 database connectionとの組み合わせが前提
- Universal Login / connection構成の制約を受ける
- planによってaccount linking等の利用条件が異なる場合がある
- JWT access tokenは発行後即時失効できないケースがあるため、短寿命化とapplication sessionの失効設計が必要
- R004のA0 / A1 / A2はAuth0標準概念そのものではないため、Action / token claim / application側でヤットコ独自に実装する必要がある
- メール復旧後のprotected / frozenやcooling-offはアプリ側状態管理が必要
- Auth0 user_idをヤットコ内部userIdそのものにせず、別内部UUIDへマッピングする方を優先する

#### 判定

**認証基盤 第一候補**

ただし、R005-B前に
「Passkey認証結果を信頼できるclaimとしてアプリ / APIへ渡す構成」
を非公開設計で確認する必要がある。

### 候補2: Supabase Auth

#### 確認できた点

- 2026年5月にPasskey機能がBeta / Experimentalとして提供開始
- WebAuthn passkey登録・認証・一覧・削除が可能
- session / refresh token設定、rate limit、MFA等がある
- manual identity linkingも提供
- 認証監査ログ機能候補がある

#### R004との衝突

Supabase Authは公式仕様として、
OAuth identityのメールアドレスが既存ユーザーと一致した場合に
**自動identity linkingを行う。**

これはR004の固定条件

- メール一致だけで自動linkしない
- Private Relay等を考慮し、メールを本人同一性判定に使わない

と直接衝突する。

さらにPasskey機能は現時点でExperimentalであり、
R005の安全最優先方針で認証正本として採用するには成熟度が不足する。

#### 判定

**R005-A時点では認証基盤の第一候補から除外。**

将来、

- PasskeyがGA
- 自動メールlinkを完全に無効化できる
- R004のlink / unlink規則を完全に実装できる

ことが確認できた場合に再評価可能。

### 候補3: Clerk

#### 確認できた点

- Passkeyログイン対応
- session revoke APIあり
- sensitive actionのreverification機能あり
- PasskeyがMFA要件を満たす設定がある
- 新端末ログイン通知 / session revoke機能がある

#### R004との衝突

ClerkのOAuth account linking公式仕様では、
同一メールアドレスを共通識別子として
**可能な場合に自動linkする設計**が説明されている。

R004の

- メール一致だけで自動linkしない
- issuer + subject基準
- 既存A2 fresh authentication後に明示link

と整合しない。

#### 判定

**現行標準仕様のままでは第一候補にしない。**

自動linkを完全に抑止し、
ヤットコ独自の明示link規則へ置き換えられることが公式に確認できた場合のみ再評価する。

### 候補4: Firebase Authentication / Google Identity Platform系

#### 確認できた点

- password / email link / federated provider
- account linking API
- refresh token revoke
- session cookie
- Admin SDKによるsession失効
- Firestore Security Rulesとの統合が成熟

#### 課題

今回確認したFirebase Authentication公式資料では、
ヤットコの中核要件である
**Passkey-firstをFirebase Authの標準第一認証として実現する明確な公式経路を確認できなかった。**

WebAuthn / Passkeyを別レイヤーで独自実装すると、
R004の「managed authentication基盤を原則優先」の利点が薄れる。

#### 判定

**保存基盤と合わせた総合候補としては有力だが、認証第一候補にはしない。**

Passkey-firstの公式managed対応が明確になれば再評価可能。

## 認証基盤比較まとめ

| 候補 | Passkey | A2判定候補 | link規則適合 | session revoke | 日本リージョン | R004適合 | R005-A判定 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Auth0 | ○ | ○ | ○ | ○ | ○ | 高 | 第一候補 |
| Supabase Auth | Experimental | △ | × 自動メールlink | ○ | DB側東京可 | 中以下 | 見送り |
| Clerk | ○ | ○ | × 自動メールlink標準 | ○ | 要追加確認 | 中 | 見送り |
| Firebase Auth | △ 要追加確認 | △ | ○ | ○ | ○ | 中 | 第二群 |

## 保存基盤候補比較

### 候補1: Supabase Postgres

認証にはSupabase Authを使わず、
**managed Postgres / RLS / backup基盤として利用する案**。

#### 確認できた点

- full PostgreSQL
- Postgres Row Level Securityを利用可能
- exposed schemaではRLS有効化が強く推奨されている
- Auth0をthird-party auth providerとして正式統合可能
- Auth0 JWTをSupabase Data API / Storage / Realtimeで利用可能
- 東京リージョン `ap-northeast-1` を選択可能
- daily backup
- paid planでPITR
- `pg_dump` / Supabase CLIで論理export可能
- standard PostgreSQLのため移行性が比較的高い

#### R003との適合

**高い。**

PostgreSQLは以下をDBレベルでも表現しやすい。

- userId外部キー
- enum / CHECK constraint
- NOT NULL
- category / question対応制約
- unique constraint
- transaction
- schemaVersion
- migration
- tombstone / deletion journal
- ownership分離
- RLS

R003の「クライアントを信用しない」はAPI層で実施しつつ、
DB constraintとRLSを第二防御線にできる。

#### 認証との組み合わせ

SupabaseはAuth0とのthird-party authを公式にサポートしている。

ただし、R004の内部userIdを正本にするため、
Auth0 `sub` をそのまま整理データowner IDとして固定するか、
ヤットコ内部UUIDへマッピングするかはR005-Bで決定する。

安全性とprovider移行性を考えると、

**ヤットコ内部UUIDを正本として、Auth0 subjectとのmappingを認証ドメインに持つ**

案を優先する。

この場合、
ブラウザからDBへ直接アクセスさせる構成より、
アプリAPIを介して内部userIdへ解決する構成の方が設計しやすい可能性がある。

最終構成はR005-Bで決める。

#### バックアップ

Supabase公式では、

- Pro: daily backup 7日
- Team: 14日
- Enterprise: 最大30日
- PITRは有料add-on
- project削除時は関連backupも削除
- CLI / pg_dumpでlogical export可能

R003の初期候補
「ローリング最大30日」と整合させるには、
利用plan / backup方式をR005-Bで明示する必要がある。

R005-Cのダミープロトタイプ段階では
有料PITRを契約する必要はない。

#### 判定

**保存基盤 第一候補**

### 候補2: Cloud Firestore

#### 確認できた点

- Security Rulesによるuser単位アクセス制御
- Firebase Authとの統合が成熟
- 東京 `asia-northeast1` 対応
- daily / weekly scheduled backup
- backup retentionを設定可能
- backupは元DBと同じlocation
- IAMでbackup操作を分離可能

#### 利点

- client SDK中心の開発速度
- offline / realtime
- managed運用
- Firebase ecosystem

#### ヤットコでの課題

YTK-R003で必要な

- R001 / R002整合性
- enum / constraint
- schemaVersion migration
- 条件付き子回答除去
- 削除順序
- 複数レコード整合
- 将来の監査 / relational query

はPostgreSQLの方が自然に表現しやすい。

またserver SDKはFirestore Security Rulesをbypassするため、
バックエンド側IAM / authorizationを別途正しく設計する必要がある。

#### 判定

**第二候補**

Postgresで重大な不都合が判明した場合の再評価候補。

## 保存基盤比較まとめ

| 候補 | user隔離 | DB制約 | transaction | backup | 東京 | export / 移行 | R003適合 | 判定 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Supabase Postgres | RLS | 強い | 強い | ○ | ○ | 高 | 高 | 第一候補 |
| Firestore | Security Rules | アプリ / Rules中心 | ○ | ○ | ○ | 中 | 中〜高 | 第二候補 |

## R005-A 推奨技術構成

### 第一候補

**認証: Auth0**
+
**保存: Supabase Postgres**

ただし、
両方をそのまま直接つなぐことをR005-Aでは確定しない。

R005-Bで以下2案を比較する。

#### 案A: Browser → Application API → Supabase Postgres

- Auth0で認証
- Application APIがAuth0 tokenを検証
- A0 / A1 / A2をAPIで判定
- Auth0 identityを内部userIdへmapping
- APIがserver-side validation
- DBはRLS / constraintで第二防御
- BrowserへDB service role等を渡さない

利点:

- R003 / R004の独自ルールを強く適用しやすい
- 内部userId分離が明確
- A2強度をAPIで強制しやすい
- 条件付き回答除去・整合性処理を一元化できる

欠点:

- API層の実装が必要

#### 案B: Browser → Auth0 JWT → Supabase Data API

Supabaseのthird-party authを使用。

利点:

- 構成が軽い
- RLSで直接user分離可能

課題:

- Auth0 subjectと内部userIdの分離が複雑
- A0 / A1 / A2 claimをRLSへ安全に伝える必要
- Auth0 Actionでclaim生成が必要
- ヤットコ独自server validationをどこに置くか検討必要

### R005-Bへ進む場合の優先案

**案Aを優先して設計検証する。**

理由:

ヤットコは単純CRUDではなく、

- A2最低認証強度
- R001 / R002整合
- 条件分岐回答除去
- D区分拒否
- schemaVersion
- 削除ジャーナル
- cooling-off
- protected / frozen
- high-risk step-up

等のアプリ固有ルールが多い。

ブラウザからDBへ直接書き込ませるより、
API層を明示した方が「クライアントを信用しない」というR003方針を保ちやすい。

これはR005-Aの技術選定候補であり、
R005-Bのアーキテクチャ承認ではない。

## なぜSupabase Auth + Supabase DBの一体構成を採らないか

運用の簡単さだけなら一体構成は魅力的。

しかし現時点では、

1. PasskeyがExperimental
2. OAuth identityを同一メールで自動linkする標準仕様がR004と衝突

という2点が大きい。

R004で最弱認証経路とidentity linkを厳格化した以上、
「便利だから認証だけ例外」は認めない。

保存基盤としてSupabaseを利用し、
認証をAuth0へ分離する方が現在の承認仕様に近い。

## なぜClerkを第一候補にしないか

ClerkはPasskey、session revoke、reverification、新端末通知など非常に使いやすい。

一方、
公式account linking仕様がメール一致を共通識別子として自動linkする方向であり、
R004の明示linkルールと正面から衝突する。

ヤットコでは「同じメールだから同じ人でしょう」という便利な推測を
P2〜P3データの所有者判定に使わない。

## なぜFirebase一体構成を第一候補にしないか

Firebase Authentication + Firestoreは成熟度が高く、
session revoke、security rules、東京region、backup等も揃う。

ただしR004の中心であるPasskey-firstについて、
今回確認したFirebase Authentication公式資料から
Auth0と同程度に明確なmanaged first-class経路を確認できなかった。

Passkey部分だけ自前WebAuthnにすると、
R004のmanaged auth優先方針から外れやすい。

## Auth0 + Supabase採用前のブロッカー確認

R005-Bへ進む前またはR005-B設計中に、
以下を公式資料・非公開検証で確認する。

### Auth0側

- 想定プランでPasskeyが利用可能か
- 日本regionを選択可能か
- Passkey利用をActionで確実に検出できるか
- A2 claimを安全に発行できるか
- fresh authenticationをアプリ固有高リスク操作で要求できるか
- user-initiated identity link / unlinkのplan条件
- link前に両identity認証を必須にできるか
- 自動メールlinkを使わない構成
- 全session / refresh token失効仕様
- Passkey一覧 / 失効手段
- password recovery後の制御可能範囲
- user export範囲
- provider障害時の運用

### Supabase側

- Auth0 third-party auth integrationの仕様
- RLSで利用可能なJWT claim
- service roleをクライアントへ露出しない構成
- 東京region
- backup保持期間
- project削除時backup挙動
- logical export
- RLS / grantsの二重設定
- schema migration
- R005-Cで完全ダミーデータのみ使える環境分離

## データ所在

### Auth0

Auth0 Public Cloudは日本regionを提供している。

R005で契約・tenant作成へ進む場合は、
日本regionを優先候補とする。

ただしregionが
「すべての周辺処理・edge通信を日本国内に限定する」
ことまで意味するとは仮定しない。

正式なデータ所在地要件が生じた場合は
DPA / subprocessors / edge処理等を別途確認する。

### Supabase

Supabaseは東京 `ap-northeast-1` をspecific regionとして選択でき、
primary project dataの所在地となる。

R005で外部環境を作る場合は
東京specific regionを第一候補とする。

## バックアップ方針との整合

R003では
「バックアップ最大30日」を初期候補としている。

Supabaseのmanaged daily backup retentionはplan依存。

R005-Cのダミーデータ検証では
backup機能そのものの実装確認を優先し、
有料の30日保持を実契約する必要はない。

R005-Bでは、

- backup種類
- retention
- restore
- tombstone / deletion journal
- restore後の削除再適用
- backup通常閲覧禁止

をアーキテクチャに含める。

## ログ・監視との整合

R005-C以降でも、
認証provider / DB providerの標準ログに
ヤットコ整理内容を意図的に送信しない。

アプリ側では、

- request body logging禁止
- SQL parameter値の詳細ログ禁止
- 「その他」サービス名ログ禁止
- 条件付き回答ログ禁止
- asset / familyKnow等ログ禁止

を維持する。

Auth0へは認証データだけ、
Supabaseへは承認された保存データだけを分離して送る。

## D区分秘密情報

候補基盤がAPIやmetadata機能として任意JSONを保存できても、
以下のフィールドをスキーマへ作らない。

- password
- PIN
- OTP
- OTP seed
- recovery code
- private key
- seed phrase
- full card number
- CVV / CVC
- external service access token
- API key
- SSH private key
- passkey private material

認証基盤自身が内部的に必要とする認証秘密と、
ヤットコ整理データとしてのD区分は別物。

ヤットコアプリ側DBへD区分を作らない。

## R005-Bへの引継ぎ候補

人間がR005-AをAPPROVEDした場合にのみ、
R005-Bで以下を設計する。

- Auth0 + Supabase Postgres構成図
- Browser / API / Auth / DB間のtrust boundary
- 内部userId mapping
- A0 / A1 / A2 claim / session表現
- API authorization
- server-side validation
- RLS
- DB grants
- schemaVersion
- R001 / R002整合性
- deletion workflow
- tombstone
- backup / restore
- protected / frozen
- cooling-off
- link / unlink
- session revoke
- admin権限
- break-glass
- logging allowlist
- dummy data model
- non-public environment boundary

R005-Bでも
APIキー発行・OAuth設定・外部契約・本番接続は
人間承認なしに行わない。

## 重要な未確定事項

- Auth0の具体planと機能条件
- Auth0 Passkeyとsocial identity併用時の最終UX
- Auth0でA2保証claimをどう表現するか
- Auth0 password connectionを本当にfallbackとして有効にするか
- Passkey登録をクラウド保存利用の必須条件にするか
- Passkey非対応利用者向けA2 fallback
- Auth0 user account linking機能のplan条件
- Auth0 Japan tenantの契約条件
- Auth0認証データexportで移行に必要な情報が十分か
- provider変更時にPasskey credentialを移行できるか
- Supabase third-party authをData APIで直接使うか
- Application APIを必須にするか
- API runtime / hosting候補
- Supabase plan
- backup保持期間
- R005-Cで外部dev環境を作るか、まず完全local環境で検証するか
- non-public環境の具体的アクセス制御
- provider障害時にread-only accessを許可するか
- Auth0障害時の既存session扱い
- vendor lock-in許容範囲
- 将来の家族 / delegate identityをAuth0でどう表現するか

## 確認した公式資料

### Supabase

- Passkey authentication
  https://supabase.com/docs/guides/auth/passkeys
- Identity Linking
  https://supabase.com/docs/guides/auth/auth-identity-linking
- General Auth Configuration
  https://supabase.com/docs/guides/auth/general-configuration
- Row Level Security
  https://supabase.com/docs/guides/database/postgres/row-level-security
- Third-party authentication
  https://supabase.com/docs/guides/auth/third-party/overview
- Auth0 integration
  https://supabase.com/docs/guides/auth/third-party/auth0
- Available regions
  https://supabase.com/docs/guides/platform/regions
- Database Backups
  https://supabase.com/docs/guides/platform/backups
- Backup and Restore using CLI
  https://supabase.com/docs/guides/platform/migrating-within-supabase/backup-restore

### Auth0

- Universal Login Experience
  https://auth0.com/docs/authenticate/login/auth0-universal-login/universal-login-vs-classic-login/universal-experience
- Link User Accounts
  https://auth0.com/docs/manage-users/user-accounts/user-account-linking/link-user-accounts
- Configure Step-Up Authentication for Web Apps
  https://auth0.com/docs/secure/multi-factor-authentication/step-up-authentication/configure-step-up-authentication-for-web-apps
- Detecting Passkey Usage in Post-Login Actions
  https://support.auth0.com/center/s/article/detecting-passkey-usage-in-auth0-post-login-actions
- User Export
  https://support.auth0.com/center/s/article/User-Export-Get-users
- Public / Private Cloud Deployment
  https://auth0.com/platform/cloud-deployment

### Clerk

- Sign-up and sign-in options
  https://clerk.com/docs/guides/configure/auth-strategies/sign-up-sign-in-options
- Passkeys custom authentication flow
  https://clerk.com/docs/guides/development/custom-flows/authentication/passkeys
- OAuth account linking
  https://clerk.com/docs/guides/configure/auth-strategies/social-connections/account-linking
- Session revoke
  https://clerk.com/docs/reference/backend/sessions/revoke-session
- Reverification
  https://clerk.com/docs/guides/secure/reverification

### Firebase / Google Cloud

- Firebase Auth Manage User Sessions
  https://firebase.google.com/docs/auth/admin/manage-sessions
- Firebase account linking
  https://firebase.google.com/docs/auth/web/account-linking
- Firestore Security Rules
  https://firebase.google.com/docs/firestore/security/rules-structure
- Firestore locations
  https://firebase.google.com/docs/firestore/locations
- Firestore backups
  https://firebase.google.com/docs/firestore/backups

## R005-A 推奨結論

現時点の第一候補:

**Auth0 + Supabase Postgres**

役割:

- Auth0:
  managed authentication、Passkey、session、identity、step-up、認証監査

- ヤットコApplication API:
  A0 / A1 / A2判定、内部userId変換、R003入力検証、整合性、削除処理

- Supabase Postgres:
  承認済み整理データ、DB constraint、RLS、migration、backup

R005-Bでは
**Application APIを介する構成を第一案**
として非公開アーキテクチャを検討する。

ただしこれはR005-Aの技術選定候補であり、
外部契約・実装・プロジェクト作成を承認するものではない。

## 次工程への指示

R005-Aはここで停止する。

人間が本成果物を承認するまで、

- R005-B開始
- Auth0 tenant作成
- Supabase project作成
- APIキー発行
- OAuth設定
- Passkey設定
- DB作成
- API実装
- 外部接続
- ダミーデータ投入
- R005-C開始
- 本番環境作成
- 公開

には進まない。

人間による次工程開始指示待ちとする。
