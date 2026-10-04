# YTK-R005-C / C1 Local Skeleton

完全ローカル・完全ダミーデータ専用。Auth0 / Supabase / AWSへ接続しない。

- `npm test`: TypeScript build + local automated tests
- `npm run test:postgres`: 実PostgreSQL用RLS/role/context試験。`DATABASE_URL`必須

## Safety

- D区分field / catch-all JSON禁止
- Browser→DB直接接続なし
- ephemeral cryptoはテスト専用
- local journalはproduction耐久性ではない
- Auth0実Passkey A2保証は未確認
- 実PostgreSQL試験がPASSするまでC1完了扱いしない
