\set ON_ERROR_STOP on

-- YTK-R005-C / C2-MIN
-- Admin-side static verification only.
-- This does NOT replace the runtime-role transaction-pooler test.

DO $$
DECLARE
  r record;
  member_count integer;
  rls_enabled boolean;
  force_rls boolean;
  owner_name text;
  helper_definer_count integer;
  policy_count integer;
BEGIN
  SELECT rolname, rolcanlogin, rolsuper, rolcreaterole, rolcreatedb,
         rolreplication, rolbypassrls
    INTO r
    FROM pg_roles
   WHERE rolname = 'ytk_user_request';

  IF r.rolname IS NULL THEN
    RAISE EXCEPTION 'ytk_user_request missing';
  END IF;

  IF NOT r.rolcanlogin
     OR r.rolsuper
     OR r.rolcreaterole
     OR r.rolcreatedb
     OR r.rolreplication
     OR r.rolbypassrls THEN
    RAISE EXCEPTION 'ytk_user_request privilege shape invalid';
  END IF;

  SELECT count(*)
    INTO member_count
    FROM pg_auth_members m
    JOIN pg_roles member_role ON member_role.oid = m.member
   WHERE member_role.rolname = 'ytk_user_request';

  IF member_count <> 0 THEN
    RAISE EXCEPTION 'ytk_user_request unexpectedly has role memberships: %', member_count;
  END IF;

  SELECT c.relrowsecurity, c.relforcerowsecurity, pg_get_userbyid(c.relowner)
    INTO rls_enabled, force_rls, owner_name
    FROM pg_class c
   WHERE c.oid = 'ytk_private.service_records'::regclass;

  IF NOT rls_enabled OR NOT force_rls THEN
    RAISE EXCEPTION 'RLS/FORCE RLS not enabled';
  END IF;

  IF owner_name = 'ytk_user_request' THEN
    RAISE EXCEPTION 'runtime role must not own service_records';
  END IF;

  SELECT count(*)
    INTO helper_definer_count
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'ytk_private'
     AND p.proname IN ('current_user_id','current_assurance')
     AND p.prosecdef;

  IF helper_definer_count <> 0 THEN
    RAISE EXCEPTION 'RLS helper unexpectedly SECURITY DEFINER';
  END IF;

  SELECT count(*)
    INTO policy_count
    FROM pg_policies
   WHERE schemaname = 'ytk_private'
     AND tablename = 'service_records'
     AND policyname IN ('ytk_sr_select','ytk_sr_insert','ytk_sr_update','ytk_sr_delete');

  IF policy_count <> 4 THEN
    RAISE EXCEPTION 'expected 4 RLS policies, found %', policy_count;
  END IF;

  IF NOT has_schema_privilege('ytk_user_request', 'ytk_private', 'USAGE') THEN
    RAISE EXCEPTION 'runtime role lacks schema USAGE';
  END IF;

  IF NOT has_table_privilege('ytk_user_request', 'ytk_private.service_records', 'SELECT')
     OR NOT has_table_privilege('ytk_user_request', 'ytk_private.service_records', 'INSERT')
     OR NOT has_table_privilege('ytk_user_request', 'ytk_private.service_records', 'DELETE') THEN
    RAISE EXCEPTION 'runtime role missing required table privilege';
  END IF;

  IF has_column_privilege(
       'ytk_user_request',
       'ytk_private.service_records',
       'owner_user_id',
       'UPDATE'
     ) THEN
    RAISE EXCEPTION 'runtime role must not UPDATE owner_user_id';
  END IF;
END
$$;

DO $$
DECLARE
  ssl_ok boolean;
BEGIN
  SELECT ssl INTO ssl_ok
    FROM pg_stat_ssl
   WHERE pid = pg_backend_pid();

  IF ssl_ok IS DISTINCT FROM true THEN
    RAISE EXCEPTION 'admin verification connection is not using SSL';
  END IF;
END
$$;

SELECT
  rolname,
  rolsuper,
  rolcreaterole,
  rolcreatedb,
  rolreplication,
  rolbypassrls
FROM pg_roles
WHERE rolname = 'ytk_user_request';

SELECT
  relrowsecurity,
  relforcerowsecurity,
  pg_get_userbyid(relowner) AS table_owner
FROM pg_class
WHERE oid = 'ytk_private.service_records'::regclass;

SELECT
  has_column_privilege(
    'ytk_user_request',
    'ytk_private.service_records',
    'owner_user_id',
    'UPDATE'
  ) AS owner_update_allowed;

SELECT 'PASS: C2-MIN Supabase admin-side role/schema/RLS static verification.' AS c2_min_status;
