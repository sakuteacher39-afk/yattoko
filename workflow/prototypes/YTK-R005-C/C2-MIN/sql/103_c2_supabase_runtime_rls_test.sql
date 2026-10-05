\set ON_ERROR_STOP on

-- YTK-R005-C / C2-MIN
-- Run ONLY while authenticated through the shared TRANSACTION pooler
-- as ytk_user_request.<PROJECT-REF>.
-- This file uses synthetic UUIDs and one-byte dummy ciphertext only.

DO $$
DECLARE
  ssl_ok boolean;
  bypass boolean;
BEGIN
  IF current_user <> 'ytk_user_request' THEN
    RAISE EXCEPTION 'wrong runtime role: %', current_user;
  END IF;

  SELECT ssl INTO ssl_ok
    FROM pg_stat_ssl
   WHERE pid = pg_backend_pid();

  IF ssl_ok IS DISTINCT FROM true THEN
    RAISE EXCEPTION 'runtime pooler connection is not using SSL';
  END IF;

  SELECT rolbypassrls INTO bypass
    FROM pg_roles
   WHERE rolname = current_user;

  IF bypass IS DISTINCT FROM false THEN
    RAISE EXCEPTION 'runtime role unexpectedly BYPASSRLS';
  END IF;
END
$$;

-- Clean known synthetic rows from an earlier interrupted run, owner by owner.
BEGIN;
SELECT set_config('app.current_user_id','11111111-1111-1111-1111-111111111111',true);
SELECT set_config('app.assurance_level','A2',true);
DELETE FROM ytk_private.service_records
 WHERE record_id IN (
   'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
   'cccccccc-cccc-cccc-cccc-cccccccccccc'
 );
COMMIT;

BEGIN;
SELECT set_config('app.current_user_id','22222222-2222-2222-2222-222222222222',true);
SELECT set_config('app.assurance_level','A2',true);
DELETE FROM ytk_private.service_records
 WHERE record_id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
COMMIT;

-- Seed A as A and B as B using the same runtime credential.
BEGIN;
SELECT set_config('app.current_user_id','11111111-1111-1111-1111-111111111111',true);
SELECT set_config('app.assurance_level','A2',true);
INSERT INTO ytk_private.service_records
  (record_id, owner_user_id, category_id, schema_version, encrypted_payload)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
   '11111111-1111-1111-1111-111111111111',
   'F', 1, decode('00','hex'));
COMMIT;

BEGIN;
SELECT set_config('app.current_user_id','22222222-2222-2222-2222-222222222222',true);
SELECT set_config('app.assurance_level','A2',true);
INSERT INTO ytk_private.service_records
  (record_id, owner_user_id, category_id, schema_version, encrypted_payload)
VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
   '22222222-2222-2222-2222-222222222222',
   'G', 1, decode('00','hex'));
COMMIT;

-- A2 owner A: own row visible, B hidden.
BEGIN;
SELECT set_config('app.current_user_id','11111111-1111-1111-1111-111111111111',true);
SELECT set_config('app.assurance_level','A2',true);

DO $$
DECLARE c integer;
BEGIN
  SELECT count(*) INTO c FROM ytk_private.service_records;
  IF c <> 1 THEN
    RAISE EXCEPTION 'A view expected 1 own row, got %', c;
  END IF;
END
$$;

-- Own-row update should work.
UPDATE ytk_private.service_records
   SET category_id = 'H', updated_at = now()
 WHERE record_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

-- Cross-user insert must be rejected by WITH CHECK.
DO $$
BEGIN
  BEGIN
    INSERT INTO ytk_private.service_records
      (record_id, owner_user_id, category_id, schema_version, encrypted_payload)
    VALUES
      ('cccccccc-cccc-cccc-cccc-cccccccccccc',
       '22222222-2222-2222-2222-222222222222',
       'F', 1, decode('00','hex'));
    RAISE EXCEPTION 'cross-user INSERT unexpectedly allowed';
  EXCEPTION WHEN insufficient_privilege THEN
    NULL;
  END;
END
$$;

-- owner_user_id is not in the UPDATE grant.
DO $$
BEGIN
  BEGIN
    UPDATE ytk_private.service_records
       SET owner_user_id = '22222222-2222-2222-2222-222222222222'
     WHERE record_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    RAISE EXCEPTION 'owner change unexpectedly allowed';
  EXCEPTION WHEN insufficient_privilege THEN
    NULL;
  END;
END
$$;

DO $$
DECLARE n integer;
BEGIN
  UPDATE ytk_private.service_records
     SET category_id = 'H'
   WHERE record_id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 0 THEN
    RAISE EXCEPTION 'cross-user UPDATE allowed';
  END IF;
END
$$;

DO $$
DECLARE n integer;
BEGIN
  DELETE FROM ytk_private.service_records
   WHERE record_id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 0 THEN
    RAISE EXCEPTION 'cross-user DELETE allowed';
  END IF;
END
$$;

COMMIT;

-- A1 cannot read P2/P3 rows.
BEGIN;
SELECT set_config('app.current_user_id','11111111-1111-1111-1111-111111111111',true);
SELECT set_config('app.assurance_level','A1',true);
DO $$
DECLARE c integer;
BEGIN
  SELECT count(*) INTO c FROM ytk_private.service_records;
  IF c <> 0 THEN
    RAISE EXCEPTION 'A1 read unexpectedly allowed';
  END IF;
END
$$;
COMMIT;

-- Transaction-local context must not survive COMMIT.
BEGIN;
DO $$
DECLARE
  uid text;
  assurance text;
  c integer;
BEGIN
  uid := NULLIF(current_setting('app.current_user_id', true), '');
  assurance := NULLIF(current_setting('app.assurance_level', true), '');

  IF uid IS NOT NULL OR assurance IS NOT NULL THEN
    RAISE EXCEPTION 'transaction-local context leaked: user=%, assurance=%', uid, assurance;
  END IF;

  SELECT count(*) INTO c FROM ytk_private.service_records;
  IF c <> 0 THEN
    RAISE EXCEPTION 'missing context unexpectedly sees rows: %', c;
  END IF;
END
$$;
COMMIT;

-- Alternate A/B/A/B across independent transactions to exercise pool reuse.
BEGIN;
SELECT set_config('app.current_user_id','11111111-1111-1111-1111-111111111111',true);
SELECT set_config('app.assurance_level','A2',true);
DO $$ DECLARE c integer; BEGIN
  SELECT count(*) INTO c FROM ytk_private.service_records;
  IF c <> 1 THEN RAISE EXCEPTION 'alternation A1 failed: %', c; END IF;
END $$;
COMMIT;

BEGIN;
SELECT set_config('app.current_user_id','22222222-2222-2222-2222-222222222222',true);
SELECT set_config('app.assurance_level','A2',true);
DO $$ DECLARE c integer; BEGIN
  SELECT count(*) INTO c FROM ytk_private.service_records;
  IF c <> 1 THEN RAISE EXCEPTION 'alternation B1 failed: %', c; END IF;
END $$;
COMMIT;

BEGIN;
SELECT set_config('app.current_user_id','11111111-1111-1111-1111-111111111111',true);
SELECT set_config('app.assurance_level','A2',true);
DO $$ DECLARE c integer; BEGIN
  SELECT count(*) INTO c FROM ytk_private.service_records;
  IF c <> 1 THEN RAISE EXCEPTION 'alternation A2 failed: %', c; END IF;
END $$;
COMMIT;

BEGIN;
SELECT set_config('app.current_user_id','22222222-2222-2222-2222-222222222222',true);
SELECT set_config('app.assurance_level','A2',true);
DO $$ DECLARE c integer; BEGIN
  SELECT count(*) INTO c FROM ytk_private.service_records;
  IF c <> 1 THEN RAISE EXCEPTION 'alternation B2 failed: %', c; END IF;
END $$;
COMMIT;

-- Final cleanup of synthetic rows.
BEGIN;
SELECT set_config('app.current_user_id','11111111-1111-1111-1111-111111111111',true);
SELECT set_config('app.assurance_level','A2',true);
DELETE FROM ytk_private.service_records
 WHERE record_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
COMMIT;

BEGIN;
SELECT set_config('app.current_user_id','22222222-2222-2222-2222-222222222222',true);
SELECT set_config('app.assurance_level','A2',true);
DELETE FROM ytk_private.service_records
 WHERE record_id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
COMMIT;

BEGIN;
DO $$
DECLARE c integer;
BEGIN
  SELECT count(*) INTO c FROM ytk_private.service_records;
  IF c <> 0 THEN
    RAISE EXCEPTION 'final missing-context check unexpectedly sees rows: %', c;
  END IF;
END
$$;
COMMIT;

SELECT 'PASS: C2-MIN Supavisor transaction-pooler runtime RLS/context tests.' AS c2_min_status;
