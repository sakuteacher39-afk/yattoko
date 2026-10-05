\set ON_ERROR_STOP on

-- YTK-R005-C / C2-MIN
-- Supabase dev schema + runtime role.
-- No password or project-specific credential is stored in this file.
-- Run only with the approved Supabase dev project admin connection.

BEGIN;

CREATE SCHEMA IF NOT EXISTS ytk_private;

DO $
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'ytk_user_request') THEN
    -- Supabase's project postgres role is not a true SUPERUSER.
    -- Create only a LOGIN role and rely on PostgreSQL's non-privileged defaults.
    -- 102_c2_supabase_verify_admin.sql fail-closes if any elevated attribute
    -- (SUPERUSER / CREATEDB / CREATEROLE / REPLICATION / BYPASSRLS) is present.
    CREATE ROLE ytk_user_request LOGIN;
  END IF;
END
$;

-- Do not ALTER SUPERUSER-related role attributes on Supabase managed Postgres.
-- All runtime SQL uses fully-qualified ytk_private object names, while helper
-- functions pin their own search_path.

CREATE OR REPLACE FUNCTION ytk_private.current_user_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = pg_catalog, ytk_private
AS $$
  SELECT NULLIF(current_setting('app.current_user_id', true), '')::uuid
$$;

CREATE OR REPLACE FUNCTION ytk_private.current_assurance()
RETURNS text
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = pg_catalog, ytk_private
AS $$
  SELECT NULLIF(current_setting('app.assurance_level', true), '')
$$;

REVOKE ALL ON FUNCTION ytk_private.current_user_id() FROM PUBLIC;
REVOKE ALL ON FUNCTION ytk_private.current_assurance() FROM PUBLIC;

CREATE TABLE IF NOT EXISTS ytk_private.service_records (
  record_id uuid PRIMARY KEY,
  owner_user_id uuid NOT NULL,
  category_id text NOT NULL
    CHECK (category_id IN ('A','B','C','D','E','F','G','H','I','J','K','L')),
  schema_version integer NOT NULL CHECK (schema_version = 1),
  encrypted_payload bytea NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE ytk_private.service_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE ytk_private.service_records FORCE ROW LEVEL SECURITY;

REVOKE ALL ON SCHEMA ytk_private FROM PUBLIC;
REVOKE ALL ON ytk_private.service_records FROM PUBLIC;

GRANT USAGE ON SCHEMA ytk_private TO ytk_user_request;
GRANT EXECUTE ON FUNCTION ytk_private.current_user_id() TO ytk_user_request;
GRANT EXECUTE ON FUNCTION ytk_private.current_assurance() TO ytk_user_request;

GRANT SELECT, INSERT, DELETE
  ON ytk_private.service_records
  TO ytk_user_request;

GRANT UPDATE (category_id, schema_version, encrypted_payload, updated_at)
  ON ytk_private.service_records
  TO ytk_user_request;

DROP POLICY IF EXISTS ytk_sr_select ON ytk_private.service_records;
CREATE POLICY ytk_sr_select
ON ytk_private.service_records
FOR SELECT
TO ytk_user_request
USING (
  owner_user_id = ytk_private.current_user_id()
  AND ytk_private.current_assurance() = 'A2'
);

DROP POLICY IF EXISTS ytk_sr_insert ON ytk_private.service_records;
CREATE POLICY ytk_sr_insert
ON ytk_private.service_records
FOR INSERT
TO ytk_user_request
WITH CHECK (
  owner_user_id = ytk_private.current_user_id()
  AND ytk_private.current_assurance() = 'A2'
);

DROP POLICY IF EXISTS ytk_sr_update ON ytk_private.service_records;
CREATE POLICY ytk_sr_update
ON ytk_private.service_records
FOR UPDATE
TO ytk_user_request
USING (
  owner_user_id = ytk_private.current_user_id()
  AND ytk_private.current_assurance() = 'A2'
)
WITH CHECK (
  owner_user_id = ytk_private.current_user_id()
  AND ytk_private.current_assurance() = 'A2'
);

DROP POLICY IF EXISTS ytk_sr_delete ON ytk_private.service_records;
CREATE POLICY ytk_sr_delete
ON ytk_private.service_records
FOR DELETE
TO ytk_user_request
USING (
  owner_user_id = ytk_private.current_user_id()
  AND ytk_private.current_assurance() = 'A2'
);

COMMIT;

SELECT 'READY: schema and ytk_user_request created; runtime password intentionally not set by SQL.' AS c2_min_status;
