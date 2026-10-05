# YTK-R005-C / C2-MIN Supabase Phase 6 Offline Package

Status: **OFFLINE PREPARED / FIRST APPLY STOPPED BEFORE DB CHANGE / PATH FIX PREPARED**

No secret, password, token, project connection string, or real user data is stored here.

## Files

- `sql/101_c2_supabase_schema.sql`
  - Creates/re-asserts `ytk_user_request`
  - Creates `ytk_private.service_records`
  - Enables and forces RLS
  - Adds explicit SELECT/INSERT/UPDATE/DELETE policies
  - Does **not** set a password

- `sql/102_c2_supabase_verify_admin.sql`
  - Admin-side static verification
  - Checks non-BYPASSRLS role shape
  - Checks no role memberships
  - Checks table ownership separation
  - Checks SECURITY INVOKER helpers
  - Checks RLS/FORCE RLS
  - Checks owner column UPDATE denial
  - Checks SSL on the admin connection
  - Does not substitute for the runtime pooler test

- `sql/103_c2_supabase_runtime_rls_test.sql`
  - Must be run through the shared **transaction pooler**
  - Must authenticate as `ytk_user_request.<PROJECT-REF>`
  - Uses synthetic UUIDs only
  - Tests cross-user SELECT/INSERT/UPDATE/DELETE
  - Tests A1 denial
  - Tests immutable owner column
  - Tests transaction-local context clearing
  - Alternates A/B transactions to exercise pool reuse
  - Cleans its synthetic rows on successful completion

- `sql/199_c2_supabase_cleanup.sql`
  - Admin-only cleanup
  - No CASCADE execution
  - Unexpected dependencies cause cleanup to stop

- `scripts/phase6-admin-apply.ps1`
  - Prompts locally for the Supabase admin password
  - Keeps the password only in the current process environment
  - Uses the shared **session pooler** on port 5432
  - Requires `sslmode=verify-full` and the downloaded CA
  - Normalizes a Windows CA path to forward slashes before passing it to libpq conninfo
  - Applies 101 and runs 102
  - Intentionally does not set the runtime role password

- `scripts/phase7-runtime-test.ps1`
  - Prompts locally for the runtime role password
  - Uses shared **transaction pooler** on port 6543
  - Requires `sslmode=verify-full`
  - Uses the same Windows-path normalization
  - Runs 103

## First apply stop

The first admin apply attempt stopped before any database change because libpq could not resolve the CA file path inside the keyword/value connection string.

Human verification then confirmed the CA file itself exists with `Test-Path = True`.

The scripts now:

1. resolve the local CA path with `Resolve-Path`
2. convert Windows backslashes to forward slashes for libpq
3. keep `sslmode=verify-full`

No TLS downgrade was made.

## Human password boundary

The runtime role password must be set interactively by the human after 101/102 pass.

Preferred operation inside an admin `psql` session:

```text
\password ytk_user_request
```

Do not paste the password into ChatGPT, GitHub, SQL files, PowerShell history, or a connection URL.

## STOP conditions

Stop immediately if:

- the custom role cannot use the shared pooler
- the custom role is given BYPASSRLS
- SSL verify-full fails
- any cross-user test fails
- A1 can read a row
- owner_user_id can be changed
- transaction-local context survives a commit
- a privileged/service-role credential becomes necessary for normal runtime CRUD
- a secret appears in Git/GitHub/log output


## Supabase managed-role compatibility fix

The first database apply reached Supabase but stopped at the role hardening step:

- Supabase project `postgres` is an administrative role, not a true PostgreSQL SUPERUSER.
- `ALTER ROLE ... NOSUPERUSER` was rejected because changing the SUPERUSER attribute itself requires true superuser authority.
- The failed script was inside an explicit transaction, so the failed apply is treated as rolled back / not applied.
- C2-MIN does not weaken the runtime role to work around this.

The schema now creates a new runtime role with:

```sql
CREATE ROLE ytk_user_request LOGIN;
```

PostgreSQL's default role attributes are non-superuser / non-createdb / non-createrole / non-replication / non-bypassrls. The admin verification script then explicitly checks every approved negative attribute and stops if any elevated capability is present.

No privileged runtime credential is introduced.
