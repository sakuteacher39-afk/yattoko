# YTK-R005-C / C2-MIN Phase 8 Report

Status: **OFFLINE IMPLEMENTATION PASS / EXTERNAL CONNECTION NOT RUN**

Date: 2026-10-06

Authoritative plan:
`workflow/proposals/YTK-R005-C-C2-MIN-execution-plan.md`

Scope:
Phase 8 `local BFF external adapter` only.
Phase 9 external connectivity, real Auth0 login, Passkey enrollment, actual A2 token, C2-EXT, C2-NET, and C3 were not executed.

## 1. Changed files

Modified:

- `workflow/prototypes/YTK-R005-C/C1/package.json`
  - pins `pg` / node-postgres runtime dependency
- `workflow/prototypes/YTK-R005-C/C1/src/index.ts`
  - exports Phase 8 adapters

Added:

- `workflow/prototypes/YTK-R005-C/C1/src/external-auth.ts`
- `workflow/prototypes/YTK-R005-C/C1/src/external-db.ts`
- `workflow/prototypes/YTK-R005-C/C1/src/external-logging.ts`
- `workflow/prototypes/YTK-R005-C/C1/src/external-bff.ts`
- `workflow/prototypes/YTK-R005-C/C1/runtime/external-runtime.mjs`
- `workflow/prototypes/YTK-R005-C/C1/test/external-adapters.test.mjs`
- `workflow/prototypes/YTK-R005-C/C2-MIN/PHASE8-REPORT.md`

Existing C1 local implementation and the existing 21 tests were retained.
Existing C2-MIN SQL / Phase 6 / Phase 7 scripts were not modified.

## 2. Auth0 external adapter

Implemented in `src/external-auth.ts`.

### OIDC configuration

- process-environment configuration adapter
- `YTK_AUTH0_DOMAIN`
- `YTK_AUTH0_AUDIENCE`
- domain must be a hostname only
- issuer is constructed as exact `https://<domain>/`
- issuer allowlist uses exact string comparison
- discovery endpoint is `/.well-known/openid-configuration`
- discovery response issuer must exactly equal the allowed issuer
- `jwks_uri` must exactly equal the same issuer's `/.well-known/jwks.json`

No Auth0 Client Secret is required for Phase 8 access-token verification.
No login or token exchange is implemented or executed in this phase.

### JWKS

- in-memory discovery cache
- in-memory JWKS cache
- configurable TTLs
- unknown `kid` triggers one forced discovery/JWKS refresh to support key rotation
- only RS256 verification is accepted
- JWK `kid` must match
- JWK `alg`, when present, must be RS256
- JWK `use`, when present, must be `sig`

### token validation

After exact issuer selection and cryptographic signature verification, the adapter validates:

- exact audience
  - exact string, or a singleton array containing only the exact configured audience
- `sub`
- `exp`
- optional `nbf`
- `iat`
- no future `iat` beyond the configured clock skew
- `iat <= exp`
- `nbf <= exp`
- namespaced assurance level
- exact assurance claim version

Assurance namespace:
`https://api.yattoko.invalid/r005c/claims`

Expected assurance version:
`ytk-assurance-v1`

Accepted assurance values:
- A1
- A2

Unknown / missing assurance version or assurance level fails closed.

Actual Auth0-issued token validation: **NOT RUN**.

## 3. Supabase / node-postgres adapter

Implemented in:

- `src/external-db.ts`
- `runtime/external-runtime.mjs`

Runtime dependency:

- `pg` pinned to `8.23.1`

### connection configuration

Runtime configuration reads values only from the process environment:

- `YTK_DB_HOST`
- `YTK_DB_PORT`
- `YTK_DB_NAME`
- `YTK_DB_USER`
- `YTK_DB_PASSWORD`
- `YTK_DB_CA_CERT_PATH`

The runtime adapter:

- requires port `6543`
- does not accept or build a full connection string
- reads the CA file from the local path outside GitHub
- requires a PEM certificate
- uses `rejectUnauthorized: true`
- sets TLS `servername` to the configured DB host
- creates a node-postgres `Pool`
- does not use a privileged/service-role credential path

Actual `pg` runtime connection to Supabase: **NOT RUN**.

### transaction wrapper

`PgRequestTransaction` performs one explicit transaction per request boundary:

1. pool `connect()`
2. `BEGIN`
3. `set_config('app.current_user_id', $1, true)`
4. `set_config('app.assurance_level', $1, true)`
5. request DB work
6. `COMMIT`
7. client `release()`

Failure path:

1. `ROLLBACK`
2. client `release()` in `finally`

`set_config(..., true)` remains transaction-local.

No query config contains the node-postgres `name` property, so named prepared statements are not used.

### external Supabase repository

`ExternalSupabaseRepository` binds one repository instance to the request's internal `userId`.

The caller cannot provide `owner_user_id` in CRUD input.

BFF-side owner protection is applied in addition to PostgreSQL RLS:

- INSERT owner is derived from internal request context
- SELECT includes `owner_user_id = $2`
- UPDATE includes `owner_user_id = $2`
- DELETE includes `owner_user_id = $2`

The Phase 7 database-side RLS / FORCE RLS controls remain unchanged.

## 4. BFF boundary

Implemented in `src/external-bff.ts`.

Flow:

1. strict Bearer header parsing
2. Auth0 token verification
3. external `(issuer, subject)` to current internal userId resolution through an injected `InternalUserResolver`
4. A2 enforcement at BFF layer before DB access
5. request-scoped Supabase transaction
6. repository bound to the resolved internal userId

A1 is blocked before the DB repository is opened.
Database RLS remains the second enforcement layer.

The internal-user resolver is intentionally injected rather than deriving an internal UUID from Auth0 `sub`.
This preserves the C1 identity model and avoids treating provider subject as the application owner ID.

Actual Auth0-user-to-internal-user mapping with a real user: **NOT RUN**.

## 5. Logging

Implemented in `src/external-logging.ts`.

Only the following operational fields can be serialized:

- event type
- correlation ID
- success / failure
- safe error code
- duration
- assurance level
- app version
- schema version

Not serialized:

- request body
- response body
- cookie
- Authorization header
- access token
- refresh token
- DB password
- Auth0 secret
- service organization content
- service name
- encrypted payload

Offline test passes an object containing request body / token / cookie shaped extra properties and confirms they are not emitted.

## 6. Secret hygiene

Checked local Phase 8 artifacts before GitHub write.

Result:

- `.env` file: none
- `.env.*` file: none
- log file artifact: none
- PostgreSQL connection string literal: none
- private-key PEM literal: none
- JWT-looking credential literal: none
- actual Auth0 Client Secret: none
- actual DB password: none
- actual runtime-role password: none
- actual access / refresh token: none
- actual cookie: none
- Management API token: none
- actual full connection string: none

Only environment variable names are present.

The test suite uses synthetic domains, UUIDs, ciphertext hex, and generated ephemeral RSA keys only.

## 7. Automated tests

Command:

`npm test`

Result:

- total: 32
- PASS: 32
- FAIL: 0
- NOT RUN: 0 within the offline unit suite

Breakdown:

- existing C1 tests: 21 PASS / 0 FAIL
- new Phase 8 offline tests: 11 PASS / 0 FAIL

New tests cover:

1. RS256 external token verification
2. exact issuer / audience / assurance version
3. discovery + JWKS cache
4. wrong issuer / non-exact audience rejection
5. exp / nbf / iat validation
6. assurance version mismatch rejection
7. transaction-local DB context + COMMIT + release
8. ROLLBACK + release on failure
9. BFF/repository owner derivation + owner predicate
10. A1 BFF denial + A2 internal user context
11. allowlist logging
12. pg runtime static TLS / port / connection-string checks

The runtime `.mjs` file also passes `node --check`.

## 8. Tests not run in Phase 8

These are deliberately **NOT RUN**, not PASS:

- real Auth0 OIDC discovery network request
- real Auth0 JWKS network request
- real Auth0 access-token verification
- actual Auth0 login
- dummy Auth0 user creation
- Passkey enrollment
- actual A2 token acquisition
- actual assurance Action event
- real node-postgres connection through Supabase pooler from the local BFF
- actual CRUD through the new external repository
- actual transaction-local context through the new node-postgres code path
- Data API external reachability check

The Phase 7 `psql` Shared Transaction Pooler runtime test remains the previously recorded PASS; it was not rerun as a Phase 8 test.

## 9. STOP conditions

Phase 8 offline implementation observed no STOP condition.

Not observed:

- TLS downgrade
- BYPASSRLS requirement
- privileged runtime credential requirement
- service-role key requirement
- secret in code/test output
- Network Restriction change requirement
- AWS resource requirement

External STOP conditions cannot be evaluated until Phase 9 connectivity and therefore remain **NOT RUN**.

## 10. Phase 8 judgement

### Offline implementation

**PASS**

All required Phase 8 code paths were implemented and the secret-free automated suite passed.

### External connectivity

**NOT RUN**

This is intentionally not counted as PASS.
Per the approved boundary, real OIDC discovery/JWKS and real Supabase adapter connectivity belong to Phase 9.

### C2-MIN overall

Not declared complete by this report.
Actual Auth0 A2 remains unproven.

## 11. Human local prerequisites before Phase 9

No secret should be sent to ChatGPT or committed to GitHub.

On the human Windows PC, after pulling this commit:

1. install the pinned runtime package from the C1 directory with the normal npm workflow
2. set required values only in the local process environment
3. keep the CA certificate outside the repository
4. do not create an `.env` file
5. do not share terminal output containing a secret or full connection string

Phase 9 must be separately started before making any real Auth0 discovery/JWKS or Supabase BFF connection.

## 12. Stop point

Phase 8 offline implementation and automated validation complete.

Stop here for human review.
Do not auto-start Phase 9.
Do not start C2-EXT, C2-NET, or C3.
