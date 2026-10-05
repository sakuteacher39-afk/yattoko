\set ON_ERROR_STOP on

-- YTK-R005-C / C2-MIN
-- Admin-only cleanup for the dedicated dev schema/role.
-- No CASCADE is used intentionally. Unexpected dependencies must STOP cleanup.

BEGIN;

DROP POLICY IF EXISTS ytk_sr_select ON ytk_private.service_records;
DROP POLICY IF EXISTS ytk_sr_insert ON ytk_private.service_records;
DROP POLICY IF EXISTS ytk_sr_update ON ytk_private.service_records;
DROP POLICY IF EXISTS ytk_sr_delete ON ytk_private.service_records;

REVOKE ALL ON ytk_private.service_records FROM ytk_user_request;
REVOKE ALL ON FUNCTION ytk_private.current_user_id() FROM ytk_user_request;
REVOKE ALL ON FUNCTION ytk_private.current_assurance() FROM ytk_user_request;
REVOKE ALL ON SCHEMA ytk_private FROM ytk_user_request;

DROP TABLE IF EXISTS ytk_private.service_records;
DROP FUNCTION IF EXISTS ytk_private.current_user_id();
DROP FUNCTION IF EXISTS ytk_private.current_assurance();
DROP SCHEMA IF EXISTS ytk_private;

DROP ROLE IF EXISTS ytk_user_request;

COMMIT;

SELECT 'PASS: C2-MIN Supabase dev schema/role cleanup completed.' AS c2_min_status;
