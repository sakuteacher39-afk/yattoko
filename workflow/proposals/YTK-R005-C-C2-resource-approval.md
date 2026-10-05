# ヤットコ／YTK-R005-C C2 外部resource承認パッケージ

- 工程: YTK-R005-C / C2準備
- 状態: C2-MIN IN PROGRESS / Auth0 Checkpoint C PASS / Supabase Checkpoint D-E PASS / Phase 6 DB apply pending
- 作成日: 2026-10-05
- C1: COMPLETE / PASS
- C2: NOT AUTHORIZED / 未開始
- 目的: C2で必要となり得る外部resource・契約・課金・credential・OAuth設定をresource単位で承認可能にする
- 重要: 本資料の作成はC2開始、resource作成、契約、課金、credential発行を承認するものではない
- 価格基準日: 2026-10-05。価格は変更され得るため、作成直前に公式画面またはPricing Calculatorで再確認する

## 0. C2-MIN 人間承認記録

承認日: 2026-10-05
実行計画承認日: 2026-10-05

個別承認済み:

- C2-APP-001 Auth0 Tenant: 作る
- C2-APP-002 Auth0 Application: 作る
- C2-APP-003 Auth0 API / Audience: 作る
- C2-APP-004 Auth0 Plan: Freeで開始
- C2-APP-005 Auth0 Database Connection / Passkey / Action: 作る / 有効化
- C2-APP-006 OAuth Callback / Logout URL: localhost URLで作る
- C2-APP-008 Supabase Project: 作る
- C2-APP-009 Supabase Plan: Freeで開始
- C2-APP-010 Supabase Shared Transaction Pooler: transaction poolerを使う
- C2-APP-011 Supabase custom DB role / credential: 作る
- C2-APP-012 Supabase Data API / Network Restriction / SSL: Data API disable / SSLを設定。Network Restrictionは保留
- C2-APP-020 Credential / Secret Store: C2-MINはprocess environment

未承認・作成禁止:

- C2-APP-007 dummy Auth identity / test mailbox / 実Passkey登録
- Auth0 Essentials
- Supabase Pro
- AWS C2-EXT一式
- Lambda / API Gateway / DynamoDB / KMS / S3 / Object Lock / Secrets Manager / CloudWatch / Budgets
- VPC / NAT Gateway / Elastic IP
- Google / Apple OAuth
- Cognito
- custom domain / DNS
- Network Restriction

重要:

C2-APP-005によりPasskey機能とActionの**設定**は承認済みだが、
C2-APP-007が未承認のため、
外部dummy user作成・実Passkey enrollment・実loginによるA2証明はまだ行わない。

C2-MINのresource作成も、本実行手順を人間が確認するまで開始しない。

## 1. 固定安全条件

以下はC2でも変更しない。

- 本番データ禁止
- 完全dummyデータのみ
- password / PIN / OTP / recovery code / private key等のR003 D区分を整理データとして保存しない
- secretをGitHubへ保存しない
- Browserへ強いcredentialを置かない
- 通常CRUDでBYPASSRLS credentialを使わない
- emailをowner source of truthにしない
- owner正本はヤットコ内部UUID
- P2 / P3はA2未満で開示しない
- BrowserからSupabaseへ直接接続しない
- request / response本文をログへ出さない
- session replayへ整理内容を送らない
- 外部resource障害時に認証強度を下げない
- resourceは個別承認。包括承認禁止
- C2からC3へ自動進行しない

## 2. 承認戦略

C2を一度に「AWSまで全部作る」工程にはしない。

### C2-MIN: 最小外部実確認

目的:

- Auth0実Passkey / A2の信頼根確認
- Supabase実project / custom role / shared transaction pooler確認
- Application APIから外部Postgresへ接続してRLSを再確認できる準備

構成:

- Auth0 Free tenant
- Auth0 Application
- Auth0 API
- Auth0 Database Connection / Passkey設定
- Supabase Free project
- Supabase shared transaction pooler
- custom non-BYPASSRLS role
- Application APIはWindows PC上でローカル起動
- credentialはprocess environmentへ一時投入
- AWS resourceなし
- KMS / S3 / DynamoDBなし
- NAT / EIPなし

この段階では費用0円候補。

ただしAuth0/Supabaseの無料条件・利用制限に従う。

### C2-EXT: 外部runtime統合

C2-MINを確認した後、別承認で追加する候補。

- AWS account利用
- Lambda
- API Gateway
- DynamoDB
- KMS
- S3 + Object Lock
- Secrets Manager
- CloudWatch
- AWS Budgets

この段階でApplication API、session、暗号化、Deletion Journalを外部dev resourceへ移す。

### C2-NET: 固定egress / DB network allowlist

さらに別承認。

- VPC
- private subnet
- NAT Gateway
- Elastic IP
- Supabase Network Restrictions

NAT Gatewayは固定費が目立つため、C2-MIN / C2-EXTでは作らないことを第一提案とする。

固定egressがR005-D前に必須と判断した場合だけ、短時間の専用検証windowで作成し、確認後すぐ削除する案を優先する。

## 3. 費用サマリー

### Auth0

2026-10-05公式:

- Free: USD 0 / month、最大25,000 MAU
- Passkeys: FreeからIncluded
- Actions + Forms: Free 5枠
- Account Linking: FreeではNot included
- Essentials: USD 35 / month、500 MAU表示時
- Essentials: Account Linking、Pro MFA、Production / Development分離、Log Streaming等を含む

C2-MINではFreeを第一候補。

identity link / unlinkをAuth0実環境で確認する段階だけEssentialsを別承認する。

### Supabase

2026-10-05公式:

- Free: USD 0 / month
- active free project最大2
- DB 500MB
- Free projectは低activityが約1週間続くとpause対象
- shared poolerは全projectで利用可能
- Pro: USD 25 / month
- Pro: daily backups 7日
- paid planの最小compute MicroはUSD 10/month相当だがUSD 10 compute creditがplanに含まれ、1 projectの基本例は合計USD 25/month

C2-MINではFreeを第一候補。

Supabase managed backup / restore自体を検証する段階のみProを別承認する。

### AWS

AWSの新規Free plan条件はaccount作成時期・planによって異なるため、0円を前提にしない。

2026-10-05公式では、新規customerは最大USD 200 credit、Free planは最長6か月。ただし既存accountへ自動適用されるとは扱わない。

固定または準固定費候補:

- KMS customer managed key: USD 1 / key / month、時間按分
- Secrets Manager: USD 0.40 / secret / month、時間按分 + API request
- NAT Gateway: provision中は時間課金 + GB処理課金。AWS公式例ではUSD 0.045/hour + USD 0.045/GBだが地域別価格のためTokyo実額は作成前に再確認
- Public IPv4 / Elastic IP: USD 0.005/hour。30日連続なら約USD 3.60 / address
- Supabase Pro: USD 25/month
- Auth0 Essentials: USD 35/month

NATは短期C2に対して費用対効果が悪いため初期不採用。

## 4. Resource別承認資料

---

## C2-APP-001 Auth0 Tenant

1. resource名:
   Auth0 Public Cloud tenant / dev専用

2. C2での用途:
   Universal Login、Database Connection Passkey、Post-Login Action、tenant logを実環境で確認する。

3. 本当にC2で必要か:
   **必須 / C2-MIN**

4. 作成主体:
   **人間**
   vendor account / region / termsに関わるため人間が作成する。
   tenant作成後の設定作業は別承認で構築係へ渡せる。

5. 無料 / 有料:
   Free候補。

6. 想定費用:
   Free planならUSD 0/month。

7. 継続課金:
   Freeならなし。
   paid upgradeは別承認。

8. credential発行:
   tenant自体では管理account credentialが存在。
   Application作成時にclient ID / secretが発生し得る。

9. 秘密情報:
   Auth0 dashboard account、将来のclient secret、Management API token等。

10. 保存場所候補:
   dashboard loginは人間管理。
   app secretはC2-MINではprocess environmentのみ。
   GitHub禁止。

11. 外部送信されるdummyデータ:
   dummy account identifier、Passkey public credential情報、authentication event、test IP / browser等のservice operation metadata。

12. 本番データ:
   使用禁止。

13. 削除 / 解約:
   Auth0 Dashboardからtenant delete。
   tenant deletionは不可逆。

14. 削除後に残る可能性:
   Auth0はtenant deleteでCustomer dataを永久削除すると説明している。
   billing/account側metadata等はtenant dataとは別管理の可能性があるため、Auth0 account自体を削除する場合は別手続き。

15. C2終了時:
   C3/R005-Dへ継続利用するなら残す。
   検証中止なら削除。

16. セキュリティ注意:
   実email、実サービス情報をprofile / metadataへ入れない。
   user_metadata / app_metadataを整理データの逃げ道にしない。

17. 人間承認操作:
   Auth0 account利用、Japan region候補確認、tenant作成、tenant名確定。

18. 承認しない場合:
   Cognitoへ切替再審査、またはC2停止。

承認欄:
- [ ] 作る
- [ ] 作らない
- [ ] 保留

---

## C2-APP-002 Auth0 Application

1. resource名:
   Auth0 Application / Yattoko C2 Dev BFF

2. 用途:
   Browser → Auth0 → Application API/BFFのOIDC flow。

3. 必要性:
   **必須 / C2-MIN**

4. 作成主体:
   人間または構築係。resource作成承認後に限る。

5. 無料 / 有料:
   tenant plan内。

6. 想定費用:
   Free plan内なら追加USD 0。

7. 継続課金:
   単独ではなし。

8. credential:
   client ID、confidential BFFならclient secret。

9. 秘密:
   client secret。

10. 保存場所:
   C2-MIN: Windows process environmentのみ。
   C2-EXT: Secrets Manager候補。

11. 外部dummy:
   redirect/session auth metadataのみ。

12. 本番データ:
   なし。

13. 削除:
   Auth0 DashboardでApplication削除。

14. 削除後:
   tenant logs等がplan retention期間残り得る。

15. C2終了時:
   C3/Dへ進むなら残す。

16. 注意:
   SPAへclient secretを置かない。
   Browser bundleへsecretを入れない。
   BFFをconfidential clientとして扱う。

17. 承認操作:
   Application作成、type選択、allowed callback/logout originの登録。

18. 代替:
   C2停止。Cognitoへ切替ならCognito App Clientを別設計。

承認欄:
- [ ] 作る
- [ ] 作らない
- [ ] 保留

---

## C2-APP-003 Auth0 API / Audience

1. resource名:
   Auth0 API identifier / audience

2. 用途:
   Application API向けtoken audienceを固定し、wrong audience testを実環境化する。

3. 必要性:
   **必須 / C2-MIN**

4. 作成主体:
   人間または構築係。承認後のみ。

5. 料金:
   plan内。

6. 想定費用:
   追加USD 0候補。

7. 継続課金:
   なし。

8. credential:
   secretは基本発行しない。identifierが設定値。

9. 秘密:
   audience自体は秘密ではない。

10. 保存:
   public configurationとしてcode/configに置ける。
   secretではない。

11. dummy:
   auth token metadata。

12. 本番データ:
   なし。

13. 削除:
   Auth0 Dashboard。

14. 削除後:
   過去tokenはexpiryまで存在し得るためAPI側issuer/audience allowlist変更も必要。

15. C2終了:
   C3/Dなら残す。

16. 注意:
   production API identifierと共用しない。

17. 承認操作:
   dev専用identifier確定・作成。

18. 代替:
   token検証をID tokenだけへ寄せる案はR005設計を弱くするため非推奨。承認しない場合C2停止。

承認欄:
- [ ] 作る
- [ ] 作らない
- [ ] 保留

---

## C2-APP-004 Auth0 Plan

1. resource:
   Auth0 Free / Essentials

2. 用途:
   Passkey/A2、後続のaccount linking検証。

3. 必要性:
   **FreeはC2-MIN必須。EssentialsはC2-MINでは不要。**

4. 作成主体:
   人間。

5. 無料 / 有料:
   Free = USD 0。
   Essentials = paid。

6. 想定費用:
   Essentials USD 35/month、500 MAU表示時。

7. 継続課金:
   Essentialsは月額。

8. credential:
   plan変更自体はcredential発行なし。

9. 秘密:
   billing情報。

10. 保存:
   Auth0 billing system。GitHubなし。

11. dummy送信:
   なし。

12. 本番データ:
   なし。

13. 解約:
   downgrade/cancel。tenant継続可否を作業前確認。

14. 削除後:
   当月請求・billing recordは残り得る。

15. C2終了:
   Freeは維持可。Essentialsを契約した場合は不要なら速やかにdowngrade候補。

16. 注意:
   Account LinkingはFreeではNot included。
   Freeを「identity linkまで完全検証済み」と扱わない。

17. 人間承認:
   Free利用はtenant作成承認に含めてもよい。
   Essentials upgradeは**必ず別承認**。

18. 代替:
   Account Linkingを後回し。
   あるいはCognitoへ切替再評価。

承認欄:
- [ ] Freeで開始
- [ ] Essentialsを別途契約
- [ ] 保留

---

## C2-APP-005 Auth0 Database Connection / Passkey / Action

1. resource:
   Auth0 Database Connection、Passkey設定、Post-Login Action

2. 用途:
   実Passkey、user verification相当、method detection、A2 signed claim確認。

3. 必要性:
   **必須 / C2-MIN**

4. 作成主体:
   構築係可。ただし人間が設定項目を承認後。

5. 料金:
   Free範囲候補。Actions Free 5枠。

6. 想定費用:
   USD 0候補。

7. 継続課金:
   Free範囲ならなし。

8. credential:
   Action secretは原則作らない。
   hard-coded secret禁止。

9. 秘密:
   なしを目標。必要になった場合は別承認。

10. 保存:
   tenant configuration。

11. dummy:
   dummy user、Passkey public credential、auth event。

12. 本番:
   なし。

13. 削除:
   connection / Action disable・delete。

14. 削除後:
   tenant logsがretention期間残り得る。

15. C2終了:
   C3/Dへ進むなら残す。

16. 注意:
   Passkey method検出だけでA2完了扱いしない。
   actual event / signed claim / tenant logを照合。
   social login単独はA2にしない。

17. 承認操作:
   Database Connection有効化、Passkey有効化、Action deploy。

18. 代替:
   Cognitoへ切替再審査。

承認欄:
- [ ] 作る / 有効化
- [ ] 作らない
- [ ] 保留

---

## C2-APP-006 OAuth Callback / Logout URL

1. resource:
   Auth0 Application URL設定

2. 用途:
   login callback / logout / allowed web origin。

3. 必要性:
   **必須 / C2-MIN**

4. 作成主体:
   人間または構築係。

5. 料金:
   無料。

6. 想定費用:
   USD 0。

7. 継続課金:
   なし。

8. credential:
   なし。

9. 秘密:
   URL自体は秘密ではない。

10. 保存:
   Auth0 tenant config、Application config。

11. dummy:
   auth redirect metadata。

12. 本番:
   なし。

13. 削除:
   URL entry削除。

14. 削除後:
   過去logsにはURLが残り得る。

15. C2終了:
   C3/Dまで維持。

16. 注意:
   wildcard callbackを避ける。
   C2-MINではlocalhostの固定portを優先。
   production domainを登録しない。

17. 承認操作:
   exact localhost callback / logout URLの確定。

18. 代替:
   hostingを先に承認してAPI Gateway URLを使う。ただしresource増加のため非推奨。

承認欄:
- [ ] localhost URLで作る
- [ ] hosted URLまで保留
- [ ] 作らない

---

## C2-APP-007 Dummy Auth Identity / Test Mailbox

1. resource:
   C2/C3専用dummy user A / B

2. 用途:
   Passkey、A2、cross-user確認。

3. 必要性:
   C2 resource作成だけなら不要。
   C3実認証開始時に**必須**。

4. 作成主体:
   人間。

5. 料金:
   test mailbox提供元による。無料候補。

6. 想定費用:
   0円候補。

7. 継続課金:
   利用provider次第。

8. credential:
   mailbox password等がある場合、それはR003整理データではないが外部test credential。
   GitHub保存禁止。

9. 秘密:
   mailbox login credential、Passkey private materialはdevice側。

10. 保存:
   人間のpassword manager等。ヤットコDBへ保存しない。

11. 外部dummy:
   synthetic email identifier、dummy display identifier。
   実名・個人の通常emailを使わない。

12. 本番:
   なし。

13. 削除:
   Auth0 dummy user削除、必要ならtest mailbox削除。

14. 削除後:
   provider auth logs等がretention期間残り得る。

15. C2終了:
   C3/Dが終われば削除候補。

16. 注意:
   Passkey利用時、biometricそのものはAuth0へ送らない設計だが、public credentialや接続IP等のoperational metadataはprovider側で処理される。

17. 人間承認:
   dummy mailbox作成・利用、実PC/iPhoneへのdummy Passkey登録。

18. 代替:
   Passkey実確認不能。C3進行停止。

承認欄:
- [ ] C3前に作る
- [ ] 作らない
- [ ] 保留

---

## C2-APP-008 Supabase Project

1. resource:
   Supabase dev project / Tokyo region候補

2. 用途:
   実Postgres、custom role、RLS、shared pooler。

3. 必要性:
   **必須 / C2-MIN**

4. 作成主体:
   人間。
   project作成後のSQL適用は別承認で構築係可。

5. 無料 / 有料:
   Free候補。

6. 想定費用:
   Free = USD 0。

7. 継続課金:
   Freeならなし。

8. credential:
   DB password、connection string、project API keysが生成される。

9. 秘密:
   DB password、secret key。
   publishable keyは秘密ではないがC2 architectureではBrowserからDBへ直接使わない。

10. 保存:
   C2-MINはDB passwordをprocess environmentのみ。
   GitHub禁止。

11. dummy:
   synthetic internal UUID、暗号化dummy P2/P3 payload、schema/role metadata。
   connection source IP等のoperational metadata。

12. 本番:
   なし。

13. 削除:
   Project Settingsからproject delete。

14. 削除後:
   Supabase公式ではproject data、backups、configuration、keys等がpermanently removed / invalidated。
   現billing cycleの既発生usageは計数上残り得る。

15. C2終了:
   C3/Dへ進むなら残す。
   中止なら削除。

16. 注意:
   Supabase Authを使わない。
   Browser direct accessなし。
   public schemaへapp tableを置かない。
   Data API無効化を第一候補。

17. 人間承認:
   account利用、organization、Free plan、Tokyo region、project作成。

18. 代替:
   外部DB検証を行えないためC2停止。

承認欄:
- [ ] 作る
- [ ] 作らない
- [ ] 保留

---

## C2-APP-009 Supabase Plan

1. resource:
   Free / Pro

2. 用途:
   DB、pooler、後続backup test。

3. 必要性:
   **FreeはC2-MIN必須。ProはC2-MINでは不要。**

4. 作成主体:
   人間。

5. 無料 / 有料:
   Free = 0。
   Pro = paid。

6. 想定費用:
   Pro USD 25/monthから。
   公式例では1 Micro project込みで約USD 25/month。

7. 継続課金:
   Proは月額 + overageの可能性。

8. credential:
   なし。

9. 秘密:
   billing情報。

10. 保存:
   Supabase billing。

11. dummy:
   なし。

12. 本番:
   なし。

13. 解約:
   Free organizationへproject transfer等、作成前に手順再確認。

14. 削除後:
   billing recordは残り得る。

15. C2終了:
   Freeはそのまま可。
   Proはbackup検証が終わればdowngrade候補。

16. 注意:
   Free projectは低activity約1週間でpause対象。
   Freeではdownload可能なmanaged backupを前提にしない。
   ProはSpend Capがdefault有効だが、offにしない。

17. 人間承認:
   Pro upgradeは必ず別承認。

18. 代替:
   backup testを後回ししFree維持。

承認欄:
- [ ] Freeで開始
- [ ] Proを別途契約
- [ ] 保留

---

## C2-APP-010 Supabase Shared Transaction Pooler

1. resource:
   Supavisor shared transaction pooler

2. 用途:
   serverless / short-lived connection向け実接続。
   custom roleでtransaction-local contextを検証。

3. 必要性:
   **必須 / C2-MINの接続方式**

4. 作成主体:
   Supabase projectに付属。別resource作成不要。

5. 料金:
   shared poolerは全projectで利用可能。追加resource費なし候補。

6. 想定費用:
   Free project範囲内候補。

7. 継続課金:
   単独なし。

8. credential:
   DB role password。

9. 秘密:
   connection string / DB password。

10. 保存:
   process environment。GitHub禁止。

11. dummy:
   SQL query metadata、encrypted dummy data。

12. 本番:
   なし。

13. 削除:
   project削除またはcredential revoke。

14. 削除後:
   provider operational logがretention期間残り得る。

15. C2終了:
   projectと一緒に残す / 削除。

16. 注意:
   transaction modeはprepared statement非対応。
   driver側prepare=false等を使用。
   SET LOCAL相当は毎transactionで必ず設定。
   C1のlocal context testだけでSupavisor PASS扱いしない。

17. 人間承認:
   pooler hostnameを取得し、custom role credentialで外部接続すること。

18. 代替:
   session pooler / direct connection。
   Lambda候補ではtransaction poolerを優先。

承認欄:
- [ ] transaction poolerを使う
- [ ] 別方式を再検討
- [ ] 保留

---

## C2-APP-011 Supabase custom DB role / credential

1. resource:
   ytk_user_request external dev role

2. 用途:
   通常CRUDをnon-BYPASSRLSで実行。

3. 必要性:
   **必須 / C2-MIN**

4. 作成主体:
   構築係可。ただしSQL実行の人間承認後。

5. 料金:
   DB内roleなので追加費なし。

6. 想定費用:
   USD 0。

7. 継続課金:
   なし。

8. credential:
   role passwordを発行。

9. 秘密:
   role password / connection string。

10. 保存:
   C2-MIN: process environmentのみ。
   C2-EXT: Secrets Manager候補。

11. dummy:
   なし。

12. 本番:
   なし。

13. 削除:
   role login disable / DROP ROLE、password rotation。

14. 削除後:
   DB logs等にrole名は残り得る。

15. C2終了:
   project継続ならcredential rotate。
   中止ならrole削除。

16. 注意:
   NOSUPERUSER / NOCREATEDB / NOCREATEROLE / NOREPLICATION / NOBYPASSRLS。
   schema/table owner禁止。
   owner_user_id UPDATE grantなし。

17. 人間承認:
   SQL実行、password生成、process env投入。

18. 代替:
   強権限credential利用は代替として認めない。承認しない場合C2停止。

承認欄:
- [ ] 作る
- [ ] 作らない
- [ ] 保留

---

## C2-APP-012 Supabase Data API / Network Restriction / SSL

1. resource:
   Supabase security configuration

2. 用途:
   DB露出面を減らす。

3. 必要性:
   Data API無効化・SSLは**必須候補**。
   Network RestrictionはC2-MINで可能なら実施、固定egressが必要なら保留。

4. 作成主体:
   人間または構築係。設定変更承認後。

5. 料金:
   基本設定は追加費なし候補。
   dedicated IPv4等を使う場合は別料金。

6. 想定費用:
   C2-MINは追加0候補。

7. 継続課金:
   なし候補。

8. credential:
   管理dashboard / CLI tokenを必要とする場合あり。

9. 秘密:
   management token等。GitHub禁止。

10. 保存:
   human sessionまたは一時env。

11. dummy:
   network CIDR等。現在のpublic IPをallowlistする場合、それは実network metadataでありdummy user dataではない。

12. 本番:
   なし。

13. 削除:
   project delete / config解除。

14. 削除後:
   config audit等が残り得る。

15. C2終了:
   project継続なら安全設定は維持。

16. 注意:
   RLSがあるからData APIを開ける、とはしない。
   Network RestrictionsはPostgres / poolerへ効くがHTTPS Data APIには効かないためData API無効化と別問題。

17. 人間承認:
   Data API disable、SSL enforcement、現在IP allowlistを使うかの判断。

18. 代替:
   動的IPでallowlistが不安定ならC2-MIN中は短時間・dummy限定でnetwork restrictionを保留し、C2-NETで固定egressを検証する。

承認欄:
- [ ] Data API disable / SSLを設定
- [ ] Network Restrictionも設定
- [ ] Network Restrictionのみ保留

---

## C2-APP-013 AWS Account利用

1. resource:
   AWS account / ap-northeast-1利用

2. 用途:
   C2-EXTのhosting、session、KMS、journal。

3. 必要性:
   **C2-MINでは不要。C2-EXTでは必須。**

4. 作成主体:
   人間。

5. 無料 / 有料:
   account plan / account age依存。

6. 想定費用:
   新規Free planは最大USD 200 credit / 最長6か月の制度があるが、既存accountに適用されるとは扱わない。

7. 継続課金:
   Paid planでは利用量に応じ自動課金。

8. credential:
   root / admin identity、IAM roles。

9. 秘密:
   AWS account login、MFA、billing。

10. 保存:
   人間管理。
   long-lived access keyをApplicationへ作らない方向を優先。

11. dummy:
   AWS control-plane metadataのみ。

12. 本番:
   なし。

13. 解約:
   resource個別削除。AWS account自体を閉じる必要は通常ない。

14. 削除後:
   billing / audit record等は残り得る。

15. C2終了:
   accountは残してよいがC2resourceは削除候補。

16. 注意:
   paid resource作成前にAWS Budget alertを設定。
   root MFA必須候補。

17. 人間承認:
   AWS account使用、region、paid plan / billing発生可能性。

18. 代替:
   C2-MINをローカルApplication APIで継続。

承認欄:
- [ ] C2-EXTで利用する
- [ ] C2では使わない
- [ ] 保留

---

## C2-APP-014 Application API Hosting / AWS Lambda

1. resource:
   Lambda function / ap-northeast-1

2. 用途:
   Application API/BFFを外部dev hosting。

3. 必要性:
   **C2-MINでは不要。C2-EXT推奨。**

4. 作成主体:
   構築係可。AWS利用承認後。

5. 無料 / 有料:
   usage based。
   Lambda公式free tierは月1M requests + 400,000 GB-s。

6. 想定費用:
   C2小規模なら非常に小さい候補だが、account/free-tier条件次第で課金あり。

7. 継続課金:
   request / durationに応じる。idle固定compute費は基本なし。

8. credential:
   IAM execution role。long-lived API key不要。

9. 秘密:
   application secretsはLambda envへ直接ベタ置きせずSecrets Manager候補。

10. 保存:
   code package + config。secretは別resource。

11. dummy:
   auth/session metadata、encrypted dummy payloadの処理。

12. 本番:
   なし。

13. 削除:
   function delete、IAM role cleanup、log group確認。

14. 削除後:
   CloudWatch logsが別resourceとして残る場合あり。

15. C2終了:
   Dまで使うなら残す。終了時delete候補。

16. 注意:
   Lambda default environmentはinternet accessを持つためVPC/NATなしでもSupabaseへ接続可能。
   ただし固定source IPを得られない。

17. 人間承認:
   function / role作成、runtime、region。

18. 代替:
   Windows PC上でlocal APIを起動。

承認欄:
- [ ] C2-EXTで作る
- [ ] C2ではlocal API
- [ ] 保留

---

## C2-APP-015 API Gateway HTTP API

1. resource:
   API Gateway HTTP API

2. 用途:
   Lambda BFFのHTTPS入口。

3. 必要性:
   Lambda hostingを採用する場合**必須候補**。
   C2-MINでは不要。

4. 作成主体:
   構築係可。

5. 料金:
   usage based。

6. 想定費用:
   AWS公式のHTTP API参考単価はfirst 300M requestsでUSD 1 / million request。region等で再確認。

7. 継続課金:
   requestに応じる。固定月額なし候補。

8. credential:
   client secret不要。
   authはApplication API sessionで行う。

9. 秘密:
   endpoint URLは秘密ではない。

10. 保存:
   infrastructure config。

11. dummy:
   HTTP metadata。request bodyをexecution logへ残さない。

12. 本番:
   なし。

13. 削除:
   API delete。

14. 削除後:
   CloudWatch logは別途残る可能性。

15. C2終了:
   Lambdaと同じ。

16. 注意:
   access loggingはallowlist。
   full request body / headers / cookieを記録しない。

17. 承認:
   API resource / stage作成、URLをAuth0 callback対象へ使う場合その設定も別承認。

18. 代替:
   local API。

承認欄:
- [ ] 作る
- [ ] C2では不要
- [ ] 保留

---

## C2-APP-016 DynamoDB Session Store

1. resource:
   DynamoDB table

2. 用途:
   server-side session、revoke、expiry。

3. 必要性:
   **C2-MINでは不要。C2-EXT推奨。**

4. 作成主体:
   構築係可。

5. 料金:
   usage based。AWS Free Tier / credit適用はaccount条件依存。

6. 想定費用:
   dummy規模では小額候補。0円保証しない。

7. 継続課金:
   storage / read / writeによる。

8. credential:
   IAM roleでアクセス。table専用secret不要。

9. 秘密:
   session ID hash等。token生値は保存しない。

10. 保存:
   DynamoDB。

11. dummy:
   opaque internal userId、session metadata、assurance、expiry。

12. 本番:
   なし。

13. 削除:
   table delete。

14. 削除後:
   on-demand backup等を作っていれば別途削除確認。
   C2ではbackup作成しない候補。

15. C2終了:
   Dまで残すかdelete。

16. 注意:
   TTLは即時session失効に使わない。
   revoked_at / expiryをAPIで評価。

17. 承認:
   table作成、billing mode、IAM permission。

18. 代替:
   C2-MINのin-memory session。

承認欄:
- [ ] C2-EXTで作る
- [ ] C2ではin-memory
- [ ] 保留

---

## C2-APP-017 AWS KMS Customer Managed Key

1. resource:
   symmetric customer managed KMS key

2. 用途:
   Application layer encryptionのkey management。

3. 必要性:
   **C2-MINでは不要。C2-EXTで実暗号化を確認するなら必須。**

4. 作成主体:
   人間承認後に構築係可。

5. 料金:
   有料。

6. 想定費用:
   USD 1 / key / month、時間按分。
   20,000 request/month free tierあり。

7. 継続課金:
   keyがactiveな間。

8. credential:
   key secret自体はexportしない。
   IAM permissionで利用。

9. 秘密:
   key materialはAWS管理。

10. 保存:
   AWS KMS。

11. dummy:
   encryption contextにはopaque userId / recordId / type / schemaVersionのみ。
   service名等を入れない。

12. 本番:
   なし。

13. 削除:
   schedule key deletion。7〜30日waiting period必須。

14. 削除後:
   waiting期間中Pending deletionとしてmetadataが残る。
   key削除後、そのkeyでwrapしたdataは復号不能。

15. C2終了:
   Dまで必要なら残す。終了ならkey deletion schedule。

16. 注意:
   DB access roleとkms:Decryptを分離。
   accidental key deletionに注意。
   ephemeral C1 cryptoをproduction securityとして扱わない。

17. 承認:
   USD 1/month相当、key policy、deletion waiting periodを明示承認。

18. 代替:
   C2-MINではephemeral test cryptoのままにし、外部DBにはdummy dataだけを入れる。
   KMS動作確認は後段へ保留。

承認欄:
- [ ] 作る
- [ ] C2-MINでは保留
- [ ] 作らない

---

## C2-APP-018 S3 Deletion Journal Bucket

1. resource:
   S3 general purpose bucket / journal専用

2. 用途:
   primary Supabase DBから独立したDeletion Journal正本。

3. 必要性:
   **C2-MINでは不要。C2-EXT/C4前に推奨。**

4. 作成主体:
   構築係可。

5. 料金:
   storage / request usage based。

6. 想定費用:
   dummy journal規模なら小額候補。0円保証しない。

7. 継続課金:
   objectを保持する限りstorage charge。

8. credential:
   IAM role。access keyをApplicationへ作らない。

9. 秘密:
   journal本文は秘密内容を持たない。
   opaque IDsのみ。

10. 保存:
   S3。

11. dummy:
   opaque user/record ID、delete generation、timestamp、delete type、schemaVersion。

12. 本番:
   なし。

13. 削除:
   retention対象objectを消せる状態にした後bucket delete。

14. 削除後:
   Object Lock中objectはretention終了まで削除できない。
   Compliance modeは特に厳格。

15. C2終了:
   restore testまで残す。

16. 注意:
   primary DBと同じbackupだけにjournalを置かない。
   Application writerへDeleteObjectVersion権限を与えない。

17. 承認:
   bucket作成、region、versioning、retention方針。

18. 代替:
   C2-MINではlocal append-only journal。
   ただしproduction durability確認済みとは扱わない。

承認欄:
- [ ] C2-EXTで作る
- [ ] C2-MINでは保留
- [ ] 作らない

---

## C2-APP-019 S3 Object Lock

1. resource:
   S3 Versioning + Object Lock Governance候補

2. 用途:
   Deletion Journalの改ざん / 削除耐性。

3. 必要性:
   **C2-MINでは不要。S3 journal実検証時に必要。**

4. 作成主体:
   構築係可。

5. 料金:
   Object Lock機能自体の追加固定料は基本なし。
   storage / PUT等通常S3料金が発生。

6. 想定費用:
   dummy量なら小額候補。

7. 継続課金:
   retention中のstorage分。

8. credential:
   IAM permission。

9. 秘密:
   なし。

10. 保存:
   S3 object metadata。

11. dummy:
   journal event。

12. 本番:
   なし。

13. 削除:
   retentionが残っているversionは削除不可。
   Governance bypass権限を持たせる場合は極小化。

14. 削除後:
   retention満了までobject versionが残る。

15. C2終了:
   retention設計に従いcleanup。

16. 注意:
   C2 devでCompliance modeを安易に使わない。
   Governance modeを第一候補。
   retentionを長くしすぎるとcleanup不能になる。

17. 承認:
   Object Lock有効化、mode、保持日数。

18. 代替:
   local journalのみ。ただし耐久性未確認のまま。

承認欄:
- [ ] Governanceで作る
- [ ] 保留
- [ ] 作らない

---

## C2-APP-020 Credential / Secret Store

1. resource:
   C2-MIN: process environment
   C2-EXT: AWS Secrets Manager第一候補

2. 用途:
   Auth0 client secret、Supabase DB password等。

3. 必要性:
   credentialを使う以上storage方針は**必須**。

4. 作成主体:
   人間 / 構築係。

5. 料金:
   process env = 0。
   Secrets Manager = paid。

6. 想定費用:
   Secrets Manager USD 0.40 / secret / month、時間按分 + USD 0.05 / 10,000 API calls。
   3 secretsを1か月保持ならstorageだけで約USD 1.20候補。

7. 継続課金:
   secretを保持する間。

8. credential発行:
   このresource自体がsecretを保持。

9. 秘密:
   DB password、Auth0 client secret、Management API credential等。

10. 保存:
   C2-MINではPowerShell/process environmentのみ。
   C2-EXTではSecrets Manager。

11. dummy:
   secretはdummy user contentではないが実外部dev credential。

12. 本番:
   production secretは禁止。dev専用のみ。

13. 削除:
   process終了 / env clear。
   Secrets Managerはsecret delete schedule。

14. 削除後:
   service側のrecovery window等が存在し得るため削除時に確認。

15. C2終了:
   credential rotate/revoke。secret削除。

16. 注意:
   AWSはdatabase credential / API key / tokenにはSecrets Managerを推奨。
   SSM Parameter Store Standard SecureStringは追加料金なし候補だが、credential用途はSecrets Managerを第一推奨とする。
   GitHub Actions secretはC2初期では使わない。

17. 承認:
   C2-MIN process env方式。
   C2-EXTでSecrets Managerを使う場合は有料承認。

18. 代替:
   SSM SecureString Standardはコスト低減候補。ただしcredential rotation等が弱い。

承認欄:
- [ ] C2-MINはprocess env
- [ ] C2-EXTでSecrets Manager
- [ ] SSMを再評価
- [ ] 保留

---

## C2-APP-021 CloudWatch Logs

1. resource:
   CloudWatch Log Group

2. 用途:
   Lambda/API error・security eventのallowlist logging。

3. 必要性:
   C2-MINでは不要。
   Lambda採用時は**必要候補**。

4. 作成主体:
   構築係可。

5. 料金:
   usage based。

6. 想定費用:
   AWS標準ログの参考値は約USD 0.50/GB ingestionだがregion差あり。
   C2量は小さい想定。0円保証しない。

7. 継続課金:
   ingest + storage。

8. credential:
   Lambda IAM role。

9. 秘密:
   secretをログしない。

10. 保存:
   CloudWatch。

11. dummy:
   event type、opaque ID、result、error code、duration等のみ。

12. 本番:
   なし。

13. 削除:
   log group delete。

14. 削除後:
   export等を作っていれば別途残り得る。C2では作らない。

15. C2終了:
   delete候補。

16. 注意:
   request/response body、cookie、token、service名禁止。
   retentionを短く設定する候補。

17. 承認:
   log group、retention日数。

18. 代替:
   C2-MINのlocal allowlist logger。

承認欄:
- [ ] Lambdaと同時に作る
- [ ] C2-MINでは不要
- [ ] 保留

---

## C2-APP-022 AWS Budgets

1. resource:
   AWS cost budget / alert

2. 用途:
   AWS有料resourceの想定外課金監視。

3. 必要性:
   AWS C2-EXTを承認する場合**必須推奨**。

4. 作成主体:
   人間。

5. 料金:
   monitoring budgetは無料。
   action-enabled budgetsは最初の2件無料。

6. 想定費用:
   simple alert budget = USD 0。

7. 継続課金:
   simple monitoringのみならなし。

8. credential:
   なし。

9. 秘密:
   billing metadata。

10. 保存:
   AWS Billing。

11. dummy:
   なし。

12. 本番:
   なし。

13. 削除:
   budget delete。

14. 削除後:
   billing historyは別。

15. C2終了:
   AWS accountを使い続けるなら残してよい。

16. 注意:
   budget data更新には数時間遅延があり、hard real-time kill switchではない。

17. 承認:
   monthly budget値、通知先。

18. 代替:
   AWSを使わないC2-MIN。

承認欄:
- [ ] AWS利用前に作る
- [ ] AWSをC2では使わない
- [ ] 保留

---

## C2-APP-023 VPC

1. resource:
   AWS VPC / subnet

2. 用途:
   固定egressの前提、network isolation。

3. 必要性:
   **C2-MIN不要。C2-EXTでも初期不要。C2-NETのみ。**

4. 作成主体:
   構築係可。

5. 料金:
   VPC自体より付随resourceが課金対象。

6. 想定費用:
   VPC/subnet自体は主な固定費ではない。

7. 継続課金:
   NAT / IPv4等に発生。

8. credential:
   IAM。

9. 秘密:
   なし。

10. 保存:
   AWS config。

11. dummy:
   network metadata。

12. 本番:
   なし。

13. 削除:
   dependent resource削除後VPC delete。

14. 削除後:
   logs等は別resource。

15. C2終了:
   C2-NET後不要なら削除。

16. 注意:
   LambdaをVPCへ入れるとinternet accessを失い、外へ出るためNAT等が必要になる。

17. 承認:
   VPC/subnet作成。

18. 代替:
   Lambda default managed network、またはlocal API。

承認欄:
- [ ] C2-NETまで保留
- [ ] 作る
- [ ] 作らない

---

## C2-APP-024 NAT Gateway

1. resource:
   NAT Gateway

2. 用途:
   private subnet Lambdaに固定outbound pathを与える。

3. 必要性:
   **C2初期では不要。原則保留。**

4. 作成主体:
   構築係可。

5. 料金:
   **有料・時間課金あり。**

6. 想定費用:
   AWS公式例はUSD 0.045/hour + USD 0.045/GB。
   地域別料金なのでTokyo実額は作成直前にPricing Calculatorで再確認。
   参考としてUSD 0.045/hourを30日なら約USD 32.40、これにIPv4とdata処理を加算。

7. 継続課金:
   provisionしている間ずっと。

8. credential:
   なし。

9. 秘密:
   なし。

10. 保存:
   AWS resource。

11. dummy:
   network traffic metadata。

12. 本番:
   なし。

13. 削除:
   NAT Gateway delete。

14. 削除後:
   billing usage record。
   EIPを別途releaseしないとIPv4課金が続き得る。

15. C2終了:
   **必ず削除候補。**

16. 注意:
   短期devには費用対効果が悪い。
   部分hourも課金単位に注意。
   NATを作っただけで放置しない。

17. 承認:
   exact Tokyo見積、利用時間window、削除担当、EIP releaseまでを明示承認。

18. 代替:
   C2-MIN local API。
   C2-EXT Lambda default internet access。
   Network restrictionはC2-NETまで保留。

承認欄:
- [ ] C2では作らない（推奨）
- [ ] 短時間検証windowだけ作る
- [ ] 保留

---

## C2-APP-025 Elastic IP / Public IPv4

1. resource:
   NAT用Elastic IP

2. 用途:
   Supabase Network Restrictionsへ固定source IPを登録。

3. 必要性:
   NATを採用した場合のみ。

4. 作成主体:
   構築係可。

5. 料金:
   有料。

6. 想定費用:
   AWS公式: USD 0.005/hour。
   30日連続で約USD 3.60/address。

7. 継続課金:
   in-use / idleとも課金対象。

8. credential:
   なし。

9. 秘密:
   IPは秘密ではないがnetwork metadata。

10. 保存:
   AWS。

11. dummy:
   なし。

12. 本番:
   なし。

13. 削除:
   release address。

14. 削除後:
   usage record。

15. C2終了:
   NAT削除後にrelease。

16. 注意:
   NATだけ消してEIPを残す事故を防ぐcleanup checklist必須。

17. 承認:
   NAT承認とセット。ただしresourceとして別確認。

18. 代替:
   NATを使わない。

承認欄:
- [ ] C2では作らない（推奨）
- [ ] NAT承認時のみ作る
- [ ] 保留

---

## C2-APP-026 Google / Apple Social OAuth

1. resource:
   Google / Apple social connections

2. 用途:
   将来のlinked provider検証。

3. 必要性:
   **C2-MINでは不要。**

4. 作成主体:
   人間 + provider developer account設定。

5. 料金:
   provider側条件に依存。

6. 想定費用:
   今回見積対象外。

7. 継続課金:
   provider次第。

8. credential:
   OAuth client secret / key。

9. 秘密:
   provider credentials。

10. 保存:
   Auth0 secure config / secret manager候補。

11. dummy:
   provider test identity。

12. 本番:
   なし。

13. 削除:
   provider console + Auth0 connection削除。

14. 削除後:
   provider logs等。

15. C2終了:
   初期C2では作らない。

16. 注意:
   外部providerが増えるほどidentity lifecycleとsecret面が増える。

17. 承認:
   別工程でprovider単位。

18. 代替:
   Auth0 Database ConnectionだけでPasskey A2を先に確認。

判定:
**C2では不要。**

---

## C2-APP-027 Cognito User Pool

1. resource:
   Amazon Cognito User Pool

2. 用途:
   Auth0 hard blocker時の第二候補。

3. 必要性:
   **現時点C2では不要。**

4. 作成主体:
   人間 / 構築係。

5. 料金:
   利用量・planによる。

6. 想定費用:
   現時点では作成しないため見積不要。

7. 継続課金:
   作成時に再調査。

8. credential:
   App Client設定。

9. 秘密:
   client secret等。

10. 保存:
   AWS。

11. dummy:
   auth identity。

12. 本番:
   なし。

13. 削除:
   User Pool delete。

14. 削除後:
   audit/billing record。

15. C2終了:
   作らない。

16. 注意:
   Auth0と並行して二重構築しない。

17. 承認:
   Auth0切替条件成立時だけ新規承認。

18. 代替:
   Auth0継続。

判定:
**C2では不要。**

---

## C2-APP-028 Custom Domain / DNS / TLS certificate

1. resource:
   custom domain

2. 用途:
   production-like URL。

3. 必要性:
   **C2では不要。**

4. 作成主体:
   人間。

5. 料金:
   domain/provider次第。

6. 想定費用:
   不要なので0。

7. 継続課金:
   作らない。

8. credential:
   DNS account等。

9. 秘密:
   DNS admin。

10. 保存:
   provider。

11. dummy:
   なし。

12. 本番:
   なし。

13. 削除:
   DNS record / domain。

14. 削除後:
   DNS cache。

15. C2終了:
   作らない。

16. 注意:
   custom domainを増やす理由がない。

17. 承認:
   不要。

18. 代替:
   localhost / vendor default dev URL。

判定:
**C2では不要。**

## 5. 最小構成案

### 推奨C2-MIN

最初に承認する候補は以下だけ。

1. Auth0 Free tenant
2. Auth0 Application
3. Auth0 API / audience
4. Auth0 Database Connection / Passkey / Action
5. localhost callback / logout URL
6. Supabase Free project / Tokyo
7. Supabase shared transaction pooler
8. ytk_user_request custom role
9. Supabase Data API disable / SSL
10. C2-MIN credentialはWindows process environmentのみ

Application APIは人間PC上でNode.js 24としてローカル起動。

この構成で確認可能:

- Auth0実Passkey event
- signed A2 claim
- issuer / audience検証
- external dev Auth0 → local BFF
- local BFF → Supabase pooler
- Supabase custom role
- external RLS
- transaction-local context on Supavisor
- cross-user dummy isolation
- Data APIを使わない構成

この構成では未確認のまま:

- external hosted BFF
- DynamoDB session
- KMS
- S3 Object Lock
- AWS IAM integration
- fixed egress / network restrictions
- managed backup

利点:

- 固定費をほぼ0へ抑える
- 外部resourceをAuth0 / Supabaseの2系統へ限定
- 問題発生時の切り分けが容易
- AWSを一度に追加しない

## 6. 推奨拡張構成案

C2-MINがPASSした後だけ、別承認でC2-EXTへ進む。

追加候補:

- AWS account / Tokyo
- Lambda
- API Gateway HTTP API
- DynamoDB
- KMS customer managed key
- S3 journal bucket
- S3 Object Lock Governance
- Secrets Manager
- CloudWatch Logs
- AWS Budgets

**VPC / NAT Gateway / Elastic IPはC2-EXTにも初期追加しない。**

理由:

LambdaはVPCへ接続しなければLambda-managed networkからinternet access可能。
C2 dummy環境ではまずIAM / TLS / DB credential / RLS / encryptionの実動作確認を優先する。

固定egress + Supabase Network Restrictionの価値はあるが、
NAT固定費とのトレードオフを別工程として扱う。

## 7. C2で必須のresource

### C2-MIN必須

- Auth0 tenant
- Auth0 Application
- Auth0 API / audience
- Auth0 Free plan
- Auth0 Database Connection / Passkey / Action
- callback / logout URL
- Supabase project
- Supabase Free plan
- shared transaction pooler
- ytk_user_request custom role / credential
- Data API disable / SSL設定
- credential一時保管方式

### C3開始前必須

- dummy user A / B
- dummy Passkey
- dummy data naming rule

## 8. C2では不要なresource

現時点:

- Cognito User Pool
- Google OAuth
- Apple OAuth
- custom domain
- production DNS
- Supabase Auth
- Supabase Storage
- Supabase Realtime
- Supabase Edge Functions
- Supabase Pro
- dedicated pooler
- AWS Lambda
- API Gateway
- DynamoDB
- KMS
- S3
- Object Lock
- VPC
- NAT Gateway
- Elastic IP
- CloudWatch

ただしAWS系は「C2-MINでは不要」であり、C2-EXTとして後から個別承認可能。

## 9. 固定費が発生するresource

明確な固定 / 準固定費:

- Auth0 Essentials: USD 35/month
- Supabase Pro: USD 25/month
- KMS customer managed key: USD 1/key/month、時間按分
- Secrets Manager: USD 0.40/secret/month、時間按分
- NAT Gateway: hourly + GB
- Elastic IP: USD 0.005/hour

usage-basedで小額でも課金可能:

- Lambda
- API Gateway
- DynamoDB
- S3
- CloudWatch Logs
- KMS API requests

## 10. 人間承認が必要な項目一覧

### Group A: C2-MIN

- C2-APP-001 Auth0 tenant
- C2-APP-002 Auth0 Application
- C2-APP-003 Auth0 API
- C2-APP-004 Auth0 Free plan
- C2-APP-005 Passkey / Action
- C2-APP-006 localhost callback/logout URL
- C2-APP-008 Supabase project
- C2-APP-009 Supabase Free plan
- C2-APP-010 shared transaction pooler
- C2-APP-011 custom role + DB password
- C2-APP-012 Data API disable / SSL / optional Network Restriction
- C2-APP-020 C2-MIN process environment secret handling

### Group B: C3前

- C2-APP-007 dummy test mailbox / dummy Passkey

### Group C: C2-EXT

- C2-APP-013 AWS account
- C2-APP-014 Lambda
- C2-APP-015 API Gateway
- C2-APP-016 DynamoDB
- C2-APP-017 KMS
- C2-APP-018 S3
- C2-APP-019 Object Lock
- C2-APP-020 Secrets Managerへの移行
- C2-APP-021 CloudWatch
- C2-APP-022 AWS Budgets

### Group D: C2-NET

- C2-APP-023 VPC
- C2-APP-024 NAT Gateway
- C2-APP-025 Elastic IP

## 11. 現時点で構築係へ渡してよい作業

**外部操作を伴わない準備だけ。**

- resource命名案
- environment variable名
- secret名だけのschema
- Auth0 Action codeのoffline draft
- callback URL候補整理
- Supabase SQL migration draft
- custom role / RLS SQLのC1版からの差分draft
- Data API disable確認checklist
- external test command draft
- cleanup checklist
- AWS IaC templateのdry draft
- AWS IAM policy draft
- cost checklist
- C3 dummy fixture定義
- R005-D test ID mapping

まだapply / create / deploy / login / token issueを行わない。

## 12. まだ構築係へ渡してはいけない作業

- Auth0 tenant作成
- Auth0 Application / API作成
- Auth0 Action deploy
- real Passkey登録
- Supabase project作成
- Supabase SQL実行
- external DB connection
- DB password / secret発行
- Auth0 client secret発行
- Management API token発行
- AWS resource作成
- Lambda deploy
- DynamoDB作成
- KMS key作成
- S3 bucket / Object Lock作成
- VPC / NAT / EIP作成
- paid plan契約
- billing情報入力
- OAuth provider設定
- dummy external user作成
- C3実行

## 13. 削除・cleanup原則

C2 resourceはdev専用prefix / tagを付け、
終了時に一覧で消せるようにする。

推奨tag / label:

- Project: YTK-R005-C
- Environment: dev-dummy
- Owner: human
- DataClass: dummy-only
- ExpiryReview: C2終了時

credentialはresource削除だけに頼らず、
先にrevoke / rotateしてからresourceを削除する。

削除順序候補:

1. external dummy sessions revoke
2. Auth0 dummy users delete
3. Application API停止
4. DB credential revoke
5. Supabase dummy rows削除
6. journal retention確認
7. AWS runtime resource削除
8. Secrets Manager secret削除
9. KMS key deletion schedule
10. S3 retention満了後cleanup
11. Supabase project delete
12. Auth0 tenant delete
13. billing / budget確認
14. GitHubにsecretが存在しないことを再確認

## 14. Dummy情報ルール

外部devへ入れてよい候補:

- synthetic internal UUID A / B
- synthetic category A〜L
- synthetic service catalog ID
- synthetic other service name
- synthetic intent / conditional answers
- dummy timestamps
- test-only email identifier
- dummy Auth0 account
- test Passkey public credential

禁止:

- 実氏名
- 通常利用email
- 実電話番号
- 実SNS ID
- 実サブスク名の本人利用状況
- 実金融情報
- 実asset情報
- 実family情報
- password / PIN / OTP / recovery code
- secret answer
- private key
- API keyを整理データとして保存
- real access tokenをlogへ出す

外部service自身のcredentialは必要最小限発生し得るが、
それをヤットコ整理データとして保存してはいけない。

## 15. 公式参照

### Auth0

- Pricing
  https://auth0.com/pricing
- Data Processing / Tenant deletion
  https://auth0.com/docs/secure/data-privacy-and-compliance/data-processing

### Supabase

- Pricing
  https://supabase.com/pricing
- Billing
  https://supabase.com/docs/guides/platform/billing-on-supabase
- Database connection / Supavisor
  https://supabase.com/docs/guides/database/connecting-to-postgres
- Pooling
  https://supabase.com/docs/guides/database/connecting-to-postgres/pooling-and-limits
- Network Restrictions
  https://supabase.com/docs/guides/platform/network-restrictions
- Delete Project
  https://supabase.com/docs/guides/platform/delete-project
- Backups
  https://supabase.com/features/database-backups

### AWS

- Free Tier
  https://aws.amazon.com/free/
- Lambda Pricing
  https://aws.amazon.com/lambda/pricing/
- API Gateway Pricing
  https://aws.amazon.com/api-gateway/pricing/
- DynamoDB Pricing
  https://aws.amazon.com/dynamodb/pricing/
- KMS Pricing
  https://aws.amazon.com/kms/pricing/
- S3 Pricing
  https://aws.amazon.com/s3/pricing/
- S3 Object Lock
  https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html
- VPC / NAT Pricing
  https://aws.amazon.com/vpc/pricing/
- CloudWatch Pricing
  https://aws.amazon.com/cloudwatch/pricing/
- Secrets Manager Pricing
  https://aws.amazon.com/secrets-manager/pricing/
- Parameter Store
  https://aws.amazon.com/systems-manager/pricing/
- AWS Budgets
  https://aws.amazon.com/aws-cost-management/aws-budgets/pricing/
- Lambda VPC Internet Access
  https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc-internet.html

## 16. 推奨承認順

安全性と費用の両方を優先し、以下の順を推奨する。

### 第1承認

C2-MINのAuth0 Free系resource。

### 第2承認

C2-MINのSupabase Free系resource。

### 第3承認

credentialをprocess environmentのみで扱うこと。

### 第4承認

C2-MIN外部接続を実施すること。

ここまででまずAuth0 / Supabaseのhard blockerを確認する。

### 第5承認以降

C2-MIN結果を見てから、
AWS C2-EXTをresource単位で判断。

NAT / EIPは最後まで保留を基本とする。

## 17. 現在判定

- C1: **COMPLETE / PASS**
- C2 approval package: **作成済み**
- C2: **NOT AUTHORIZED**
- external resource作成: **0**
- paid contract: **0**
- external credential発行: **0**
- C3: **未開始**

本資料のcheckboxが人間によって明示承認されるまで、
対象resourceを作成しない。

**人間承認待ちで停止する。**
