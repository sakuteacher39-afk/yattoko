#!/usr/bin/env bash
set -euo pipefail
if ! command -v psql >/dev/null 2>&1; then
  echo 'BLOCKED: psql not installed; actual PostgreSQL verification not performed.' >&2
  exit 20
fi
: "${DATABASE_URL:?DATABASE_URL required for local PostgreSQL test}"
psql "$DATABASE_URL" -f sql/001_schema.sql
psql "$DATABASE_URL" -f sql/002_rls_test.sql
echo 'PASS: actual PostgreSQL RLS/role/context tests completed.'
