# YTK-R005-C / C1 Local Skeleton

状態: **C1 COMPLETE / PASS（C2未承認）**

完全ローカル・完全ダミーデータ専用。Auth0 / Supabase / AWSへは接続していない。

- `npm test`: TypeScript build + local automated tests → **21 PASS / 0 FAIL**
- `npm run test:postgres`: 実PostgreSQL RLS/role/context試験 → **PASS**
- PostgreSQL実確認: Windows Native PostgreSQL 18.6 / 127.0.0.1:5432 / loopback only

## C1で確認済み

- A0/A1遮断・A2 policy
- internal userId / principal / provider identity model
- link / unlink途中失敗 fail-closed
- strict request schema / unknown field / D区分 reject
- R001 / R002整合
- ephemeral crypto interface
- local Deletion Journal replay
- allowlist logging
- non-BYPASSRLS role
- RLS SELECT / INSERT / UPDATE / DELETE
- cross-user遮断
- owner列変更禁止
- A1 DB遮断
- transaction-local context消失
- 同一接続次transactionへのcontext leakageなし

## C1で未確認

- Auth0実Passkey A2保証
- Supabase実pooler / actual custom role
- KMS / S3 / DynamoDB / NAT
- 外部resource
- 本番相当network restriction

これらはC1完了範囲外であり、確認済みとは扱わない。

## Safety

- D区分field / catch-all JSON禁止
- Browser→DB直接接続なし
- ephemeral cryptoはテスト専用
- local journalはproduction耐久性ではない
- C2は自動開始しない
- 外部resourceは個別の人間承認なしに作成しない
