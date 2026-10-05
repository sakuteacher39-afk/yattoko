# YTK-R005-C / C1 Test Matrix

状態: **C1 COMPLETE / PASS（C2未承認）**

## Local automated: 21 PASS / 0 FAIL

1. A0/A1拒否・A2許可 — PASS
2. fresh A2 — PASS
3. session revoke — PASS
4. protected/frozen拒否 — PASS
5. principal/provider二重owner拒否 — PASS
6. identity operation idempotency — PASS
7. link途中DB失敗fail-closed — PASS
8. unlink途中DB失敗fail-closed — PASS
9. unknown/D/catch-all field reject — PASS
10. `1Password` false positive回避 — PASS
11. secret-like service名reject — PASS
12. R001/R002 upward consistency — PASS
13. hidden answer pruning — PASS
14. ephemeral crypto + AAD binding — PASS
15. Deletion Journal replay — PASS
16. allowlist logger本文非出力 — PASS
17. BFF cross-user resource遮断 — PASS
18. BFF A1本文遮断 — PASS
19. local RS256 JWT/JWKS — PASS
20. JWT tamper/wrong issuer reject — PASS
21. JWT wrong audience/expiry reject — PASS

## Actual PostgreSQL 18.6: PASS

実行環境:

- Windows Native PostgreSQL 18.6
- DB: `ytk_c1_local`
- endpoint: `127.0.0.1:5432`
- listen: loopback only
- pg_hba: loopback only / SCRAM-SHA-256
- external DB / Supabase / Auth0 / AWS: 接続なし
- dummy data only

`npm run test:postgres`:

**PASS: actual PostgreSQL RLS/role/context tests completed.**

| R005-D / C1 area | Result |
|---|---|
| YTK-D-RLS-001 A→A SELECT | PASS |
| YTK-D-RLS-002 A→B SELECT | PASS / 0件 |
| YTK-D-RLS-003 B→A SELECT | PASS / 0件 |
| YTK-D-RLS-004 cross-user INSERT | PASS / reject |
| YTK-D-RLS-005 cross-user UPDATE | PASS / 0件 |
| YTK-D-RLS-006 owner change UPDATE | PASS / reject |
| YTK-D-RLS-007 cross-user DELETE | PASS / 0件 |
| YTK-D-RLS-008 missing / cleared user context | PASS |
| YTK-D-RLS-009 A1 context | PASS / 0件 |
| YTK-D-RLS-010 transaction-local context leakage | PASS / leakageなし |

Additional explicit checks:

- `ytk_user_request|f|f|f|f|f` — PASS
- RLS enabled / FORCE RLS: `t|t` — PASS
- owner_user_id UPDATE privilege: `f` — PASS
- context_cleared: `t` — PASS

## Scope boundary

C1 PASSは実PostgreSQL上のrole / RLS / transaction-local contextまで。

以下は未確認:

- Supavisor actual pooler
- Auth0 actual Passkey
- Supabase actual project / role
- KMS / S3 / DynamoDB / NAT
- external cloud network restriction

これらをC1でPASS済みとは扱わない。
