# YTK-R005-C / C1 実装レポート

- 状態: **C1 COMPLETE / PASS（C2未承認）**
- C1正式判定日: 2026-10-05
- 実装対象: 完全ローカル／mock骨格 + 実PostgreSQL検証
- 実ユーザーデータ: 使用なし
- 外部DB / Supabase / Auth0 / AWS接続: なし
- 外部resource作成: なし
- credential発行: なし
- 契約 / 課金: なし
- C2: 未開始・未承認

## 1. C1正式判定

**PASS / C1完了。**

根拠:

1. ローカル自動テスト: **21 PASS / 0 FAIL**
2. Windows PC上の実PostgreSQL 18.6でRLS / role / transaction-local context試験: **PASS**
3. non-BYPASSRLS / FORCE RLS / owner列変更禁止を追加確認: **PASS**
4. cross-user SELECT / INSERT / UPDATE / DELETE遮断: **PASS**
5. A1遮断: **PASS**
6. transaction終了後のcontext消失: **PASS**
7. 同一接続の次transactionへのcontext leakageなし: **PASS**

C1の残存ブロッカーだった「実PostgreSQL確認」は解消した。

## 2. 実装済み

- Application API / BFF骨格
- local AuthProvider / local signed JWT / JWKS
- A0 / A1 / A2 policy
- internal userId / Auth0 principal / provider identity model
- identity operation / idempotency / link-unlink fail-closed
- in-memory server-side session
- account state / protected / frozen / cooling-off
- strict request allowlist
- unknown field reject
- D区分reject
- その他service名server validation
- R001 / R002整合
- CryptoProvider interface + ephemeral test adapter
- DeletionJournal interface + local append-only test journal
- allowlist logger
- BFF owner isolation
- PostgreSQL schema / role / RLS / constraint SQL
- transaction-local user context
- PostgreSQL actual test runner
- R005-D test harness / test ID対応

## 3. ローカル自動テスト

`npm test`

結果:

**21 PASS / 0 FAIL**

確認済み:

- A0/A1ではP2〜P3本文不可
- A2のみ通常data access候補
- fresh A2 policy
- local RS256 JWT/JWKS
- signature tamper / wrong issuer / wrong audience / expiry reject
- server session revoke
- protected / frozen reject
- principal/provider identity二重owner拒否
- identity operation idempotency
- link/unlinkのDB途中失敗をfail-closed
- ownerId client injection拒否
- cross-user resource read遮断（local repository/BFF）
- D区分 / unknown / catch-all field拒否
- `1Password` false positive回避
- secret-like other service名拒否
- R001/R002上方向整合
- hidden `billingSource` pruning
- ephemeral encryptionで平文非露出
- AAD mismatchでdecrypt失敗
- Deletion Journal replay
- allowlist loggerに本文 / tokenを渡さない

## 4. 実PostgreSQL確認

実行方式:

**Windows Native PostgreSQL**

PostgreSQL:

**18.6**

接続:

- `127.0.0.1:5432`
- listen: `127.0.0.1 / ::1` のみ
- pg_hba: loopbackのみ
- authentication: SCRAM-SHA-256
- DB: `ytk_c1_local`
- 外部DB / Supabase: 接続なし
- 完全ダミーデータのみ

実行:

`npm run test:postgres`

結果:

**PASS: actual PostgreSQL RLS/role/context tests completed.**

## 5. PostgreSQL明示確認結果

### non-BYPASSRLS

**PASS**

確認値:

`ytk_user_request|f|f|f|f|f`

よって:

- superuser: false
- create role: false
- create DB: false
- replication: false
- bypass RLS: false

### RLS / FORCE RLS

**PASS**

確認値:

`t|t`

- RLS enabled: true
- FORCE ROW LEVEL SECURITY: true

### owner_user_id UPDATE権限

**PASS**

確認値:

`f`

通常user request roleからowner列をUPDATEできない。

### row isolation

- cross-user SELECT: **PASS / 遮断**
- cross-user INSERT: **PASS / 遮断**
- cross-user UPDATE: **PASS / 遮断**
- cross-user DELETE: **PASS / 遮断**
- A1 SELECT: **PASS / 遮断**

### transaction-local context

- transaction終了後context消失: **PASS**
- 同一接続次transactionへのcontext leakageなし: **PASS**

確認値:

`context_cleared = t`

## 6. C1で確認済みのRLS範囲

C1では**実PostgreSQL**に対して以下を確認した。

- custom non-BYPASSRLS role
- SELECT policy
- INSERT WITH CHECK
- UPDATE USING / WITH CHECK
- DELETE policy
- A2 condition
- cross-user row isolation
- owner column privilege
- transaction-local user context
- 同一DB connectionの次transactionへのcontext非残存

PostgreSQL互換mockによる代替ではない。

## 7. C1で未確認のもの

以下は**C1で確認済みとは扱わない**。

- Auth0実Passkeyのuser verification
- Auth0 Post-Login Action実event
- Auth0 tenant log
- Auth0実account linking
- Supabase project
- Supabase actual custom role
- Supavisor実pooler
- Supabase Data API disable実設定
- Supabase network restrictions
- KMS
- AWS Encryption SDK + KMS実権限
- S3 Object Lock
- DynamoDB session store
- NAT Gateway / fixed egress
- AWS Lambda / API Gateway
- 外部dev環境
- 本番環境

特にC1のcontext leakage PASSは、
**同一PostgreSQL接続上でtransaction-local contextが次transactionへ残らないこと**
を確認したもの。

Supavisor実poolerのconnection reuse確認ではない。

## 8. Crypto / Journalの範囲

`EphemeralCryptoProvider` はローカルtest専用。

**production securityとして扱わない。**

`LocalAppendOnlyJournal` もローカルtest専用。

**production durabilityとして扱わない。**

外部KMS / 独立Deletion Journal storeはC2以降の別承認事項。

## 9. Auth0 A2の範囲

C1ではlocal signed JWT / JWKSとA0/A1/A2 policyまで確認した。

Auth0実Passkeyの

- user verification
- Action event
- signed custom assurance claim
- tenant log

は未確認。

したがって外部cloud save gateは未承認。

## 10. C2開始可否

技術上:

**C1完了条件は満たした。**

運用上:

**C2は開始不可 / NOT AUTHORIZED。**

理由:

C2は外部resource作成を伴い、
resourceごとに別途人間承認が必要。

C1 PASSをC2包括承認とは扱わない。

## 11. C2前に必要な人間承認

最低限、resourceごとに個別承認する。

1. Auth0 tenant作成
2. Auth0 plan / FreeまたはEssentials利用
3. Supabase project作成
4. Supabase plan
5. AWS account / region利用
6. Application API hosting resource
7. DynamoDB session store
8. KMS customer managed key
9. S3 Deletion Journal bucket / Object Lock
10. VPC / subnet
11. NAT Gateway / Elastic IP
12. 各credential / secret発行
13. credential保存方式
14. OAuth / callback等の外部設定
15. 外部dev環境で保存するdummy情報
16. resourceごとの料金
17. resourceごとの削除方法

一括承認しない。

## 12. 残存未確定事項

- Node 24実runtimeでの最終再実行
- Auth0実Passkey A2保証
- Auth0 Free / Essentialsの実利用範囲
- Supabase Supavisorでcustom role / transaction-local context
- KMS key policy
- S3 Object Lock retention
- DynamoDB session store
- NAT / fixed egress方式
- external dev resource costs
- 2個目A2のproduction必須化
- Passkey非対応者向け代替A2

これらはC2/C3以降の検証事項であり、C1 PASSを覆すものではない。

## 13. 停止

C1は**COMPLETE / PASS**。

ただしC2は未承認。

C2、外部resource、契約、課金、credential発行へ自動進行しない。

**人間指示待ちで停止する。**
