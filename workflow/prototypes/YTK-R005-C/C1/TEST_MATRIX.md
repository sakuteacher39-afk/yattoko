# YTK-R005-C C1 Test Matrix

## Local automated tests

`npm test`

- tests: 12
- PASS: 12
- FAIL: 0

Coverage:

| R005-D / C1 area | Local result |
|---|---|
| YTK-D-AUTH-001 JWT signature tamper | PASS |
| YTK-D-AUTH-002 wrong issuer | PASS |
| YTK-D-AUTH-003 wrong audience | PASS |
| YTK-D-AUTH-004 expired token | PASS |
| YTK-D-AUTH-005 A0 P2/P3 denial | PASS |
| YTK-D-AUTH-006 A1 P2/P3 denial / BFF 403 | PASS |
| YTK-D-AUTH-008 fresh A2 policy | PASS |
| YTK-D-AUTH-009 server session revoke | PASS |
| YTK-D-OWN-001/002 client owner input ignored/rejected | PASS |
| YTK-D-OWN-003 mass-assignment / unknown field | PASS |
| YTK-D-OWN-004 cross-user resource ID hidden | PASS |
| YTK-D-IN-001 unknown field | PASS |
| YTK-D-IN-002/003/004 D/token/catch-all | PASS |
| YTK-D-IN-005 secret-like service name | PASS |
| YTK-D-IN-006 legitimate 1Password | PASS |
| YTK-D-CRYPTO-001 plaintext absent | PASS |
| YTK-D-CRYPTO-002/003 AAD / cross-context swap | PASS |
| YTK-D-SES-001/003/005 revoke/expiry/frozen | PASS |
| YTK-D-DEL-006 deletion journal replay | PASS |
| YTK-D-LOG-001..005 allowlist logging | PASS |
| identity duplicate owner prevention | PASS |
| identity operation idempotency | PASS |
| link DB-failure fail-closed | PASS |
| unlink DB-failure fail-closed | PASS |
| R001/R002 upward consistency + hidden answer pruning | PASS |

## Actual PostgreSQL tests

Prepared but **NOT EXECUTED** in the current execution environment:

- YTK-D-RLS-001 A→A SELECT
- YTK-D-RLS-002 A→B SELECT
- YTK-D-RLS-003 B→A SELECT
- YTK-D-RLS-004 cross-user INSERT
- YTK-D-RLS-005 cross-user UPDATE
- YTK-D-RLS-006 owner change UPDATE
- YTK-D-RLS-007 cross-user DELETE
- YTK-D-RLS-008 missing user context
- YTK-D-RLS-009 A1 context
- YTK-D-RLS-010 transaction-local context leakage

`npm run test:postgres` returns exit code **20 / BLOCKED** when `psql` is unavailable.

Current environment has no PostgreSQL server/client or Docker. Package installation could not retrieve PostgreSQL because network access for the execution environment is unavailable. External DB substitution was not used because C1 forbids external service connection.
