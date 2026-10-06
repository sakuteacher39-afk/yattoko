# YTK-R005-C / C2-MIN Final Report

Status: **COMPLETE / PASS**

Date: 2026-10-06

## 1. Scope

C2-MIN only.

Executed scope:
- Auth0 dev tenant / application / API / dedicated database connection
- Passkey configuration only
- Post-Login Action deployment
- Supabase Free project
- Data API disabled
- SSL enforcement enabled
- custom non-BYPASSRLS runtime role
- Shared Transaction Pooler
- local BFF external adapter
- real node-postgres BFF-to-Supabase connectivity
- synthetic-data RLS / owner-isolation tests

Not authorized / not executed:
- C2-EXT
- C2-NET
- C3
- hosted BFF
- AWS resources
- Network Restrictions
- actual Auth0 signup/login
- actual Passkey enrollment
- actual Action runtime event
- actual signed A2 token

## 2. Auth0 result

PASS:
- Region: JP-1
- Current plan: Free / $0
- Application: Regular Web Application
- API audience: exact expected value
- localhost callback: exact match
- localhost logout: exact match
- localhost Web Origin: exact match
- dedicated database connection configured
- New Universal Login / Identifier First confirmed in prior configuration checkpoint
- Passkey active
- Passkey prerequisites ready
- Post-Login Action in live post-login flow
- OIDC discovery fetch
- exact issuer match
- JWKS fetch
- observed JWKS keys: RSA / RS256 / sig

Not proven:
- actual login
- Passkey enrollment
- actual passkey authentication event
- actual Action runtime event
- actual signed A2 claim

## 3. Supabase result

PASS:
- Free project / Tokyo
- Data API OFF
- SSL enforcement ON
- runtime role `ytk_user_request`
- non-SUPERUSER
- non-CREATEDB
- non-CREATEROLE
- non-REPLICATION
- non-BYPASSRLS
- RLS ON
- FORCE RLS ON
- runtime role does not own service table
- owner_user_id UPDATE privilege denied
- Shared Transaction Pooler login
- TLS certificate verification
- cross-user SELECT isolation
- cross-user INSERT denial
- cross-user UPDATE isolation
- cross-user DELETE isolation
- A1 denial
- transaction-local context cleared after COMMIT
- A/B/A/B alternating transaction isolation

## 4. Phase 8 local BFF adapter

PASS:
- exact Auth0 issuer allowlist
- exact API audience
- JWKS cache
- RS256 verification
- exp / nbf / iat checks
- assurance version fail-close
- node-postgres adapter
- TLS CA verification
- transaction wrapper
- transaction-local userId / assurance
- A1 pre-DB denial
- owner_user_id derived from internal user context
- owner predicates in CRUD
- allowlist logging
- no request/response body logging
- no full DB connection string runtime path

Local reproduction after dependency fixes:
- TypeScript 5.9.3 build: PASS
- existing C1 tests: 21 PASS
- Phase 8 tests: 11 PASS
- total: 32 PASS / 0 FAIL

## 5. Phase 9 real BFF-to-Supabase smoke test

PASS:
- real node-postgres connection through Shared Transaction Pooler
- runtime role / TLS / non-BYPASSRLS
- synthetic A2 own CRUD
- cross-user read/update/delete blocked
- A1 blocked before DB request
- owner_user_id derived from internal user context
- transaction-local context absent outside request transaction
- synthetic row cleanup

This smoke test intentionally used a synthetic auth result.
It does not prove an Auth0-issued A2 token.

## 6. Secret hygiene

PASS:
- GitHub `.env`: 0
- Auth0 Client Secret literal: 0
- Supabase service-role secret literal: 0
- private key literal: 0
- PostgreSQL full connection string literal: 0
- runtime password entered through SecureString prompt only
- runtime secret placed only in process environment
- process environment cleared in finally
- admin DB credential not used as runtime credential
- no secret observed in shared terminal output

## 7. C2-MIN completion judgement

All completion conditions defined in the approved C2-MIN execution plan are satisfied.

Judgement:
**C2-MIN external environment configured / PASS**

This does NOT mean:
- A2 assurance proven end-to-end
- Passkey runtime proven
- R005-C complete
- C2-EXT / C2-NET approved
- C3 approved
- production-ready

## 8. Remaining unverified items

- actual Auth0 Passkey enrollment
- actual user verification
- actual Passkey Action event
- actual signed A2 claim
- Auth0 tenant passkey log
- dummy user A/B
- Auth0 identity link/unlink runtime behavior
- hosted BFF
- managed KMS
- S3 Object Lock
- DynamoDB
- VPC / NAT / EIP
- Network Restriction
- external backup / restore implementation

## 9. Stop point

Stop here.

Do not start C2-EXT, C2-NET, or C3 without separate human approval.
Do not perform actual Auth0 login or Passkey enrollment under the current approval boundary.


## 10. Human final approval

2026-10-06、humanが明示的にC2-MINの正式PASSを承認。

Final status:
**C2-MIN COMPLETE / PASS**

This approval does not extend scope to:
- actual Auth0 login
- actual Passkey enrollment
- actual Action runtime event
- actual signed A2 claim
- C2-EXT
- C2-NET
- C3

Stop at this boundary until a separate human approval is given.
