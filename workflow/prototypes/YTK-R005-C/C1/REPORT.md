# YTK-R005-C / C1 実装レポート

- 状態: BLOCKED（部分実装完了・C1完了条件未達）
- 実施日: 2026-10-04
- 対象: 完全ローカル／mock骨格のみ
- 外部resource: 作成なし
- 実ユーザーデータ: 使用なし
- 契約／課金／credential: なし

## 実装ファイル

- `src/auth.ts`: A0/A1/A2、RS256 test JWT/JWKS、session、account state policy
- `src/identity.ts`: principal/provider identity、idempotent operation、link/unlink途中失敗fail-closed
- `src/input.ts`: strict allowlist、D区分reject、「その他」サービス名、R001/R002整合
- `src/storage.ts`: ephemeral crypto、Deletion Journal、allowlist logger、owner-scoped repository/API service
- `src/bff.ts`: local BFF request skeleton
- `src/index.ts`: exports
- `test/security.test.mjs`: local automated security tests
- `sql/001_schema.sql`: private schema、non-BYPASSRLS role、grants、RLS、constraints
- `sql/002_rls_test.sql`: actual PostgreSQL RLS/role/context tests
- `scripts/test-postgres.sh`: actual PostgreSQL test runner
- `TEST_MATRIX.md`: R005-D ID mapping

## 自動テスト

`npm test`

- tests: 12
- PASS: 12
- FAIL: 0

確認済み:

- A0/A1ではP2〜P3本文不可
- A2のみ通常data access候補
- local RS256 JWT/JWKS署名
- signature tamper / wrong issuer / wrong audience / expiry reject
- server session revoke
- frozen account reject
- Auth0 principal/provider identity二重owner拒否
- identity operation idempotency
- link/unlinkのDB途中失敗をfail-closed
- ownerId client injection拒否
- cross-user resource read遮断（local repository/BFF layer）
- D区分/unknown/catch-all field拒否
- `1Password` false positive回避
- secret-like other service名拒否
- R001/R002上方向整合
- hidden `billingSource` pruning
- ephemeral AES-GCMで平文非露出
- AAD mismatchでdecrypt失敗
- Deletion Journal replay
- allowlist loggerに本文/tokenを渡さない

## PostgreSQL実確認

`npm run test:postgres`

結果:

**BLOCKED / NOT RUN**

exit code: **20**

理由:

現在の実行環境にPostgreSQL server/clientおよびDockerが存在しない。
パッケージ導入も実行環境のネットワーク制限により取得不能だった。
外部DBへ接続して代替することはC1固定安全条件に反するため行っていない。

よって以下をPASSとは判定しない。

- PostgreSQL role実挙動
- RLS SELECT / INSERT / UPDATE / DELETE
- cross-user DB遮断
- A1 DB遮断
- `SET LOCAL` contextのtransaction終了後消失
- connection/pool context leakage
- owner column update privilege

SQLと実行scriptは準備済みだが、**実PostgreSQLで実行されるまでC1完了とはしない。**

## RLS設計資材

`sql/001_schema.sql`:

- `ytk_private` schema
- `ytk_user_request` login role
- `NOBYPASSRLS`
- SECURITY INVOKER helper
- PUBLIC revoke
- explicit grants
- `owner_user_id` update grantなし
- FORCE ROW LEVEL SECURITY
- SELECT / INSERT / UPDATE / DELETE policy
- A2 condition

`sql/002_rls_test.sql`:

- user A own insert/select
- user A → user B SELECT遮断
- cross-user INSERT reject
- owner change reject
- cross-user UPDATE 0件
- cross-user DELETE 0件
- A1 SELECT 0件
- new transactionでcontext残存なし

## D区分reject

API schemaにD区分fieldを定義せず、D区分名・catch-all fieldは明示rejectする。
自由JSON `metadata/extra/notes/custom/raw` は作らない。

## ログ漏えい

allowlist loggerだけを実装し、request/response objectやbodyを受け取らない。
local testではserviceName/request/response/password/token等がlog lineへ含まれないことを確認した。

これはC1 mock確認であり、実framework/APM設定はC2以降の別確認対象。

## Crypto / Journal

EphemeralCryptoProviderはローカルtest専用でありproduction securityとして扱わない。
LocalAppendOnlyJournalもローカルtest専用でありproduction耐久性として扱わない。

## Auth0 A2

C1ではlocal signed JWT/JWKSのみ。
Auth0実Passkeyのuser verification / Action event / tenant logは未確認。
外部cloud save gateは未承認のまま。

## C2自己判定

**C2へ進めない。**

理由:

1. C1完了条件である実PostgreSQL確認が未実施
2. C2はresource単位の別途人間承認が必要

実PostgreSQLでRLS/role/context試験を実行しPASSするまでC1を完了扱いしない。

## 残存未確定事項

- 実PostgreSQL確認手段と結果
- Node 24 runtimeでの再実行（今回の作業環境はNode 22.16.0）
- Auth0実Passkey A2保証
- Supabase poolerでcustom role / transaction-local context
- KMS / S3 / DynamoDB / NAT等の外部resource

## 停止

C1は部分実装を保存するが正式完了ではない。
C2、外部resource、契約、課金、credential発行へ進まない。
人間確認待ちで停止する。
