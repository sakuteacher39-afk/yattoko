\set ON_ERROR_STOP on
SET ROLE ytk_user_request;
BEGIN;
SELECT set_config('app.current_user_id','11111111-1111-1111-1111-111111111111',true);
SELECT set_config('app.assurance_level','A2',true);
INSERT INTO ytk_private.service_records(record_id,owner_user_id,category_id,schema_version,encrypted_payload)
VALUES ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','11111111-1111-1111-1111-111111111111','F',1,decode('00','hex'));
COMMIT;

RESET ROLE;
INSERT INTO ytk_private.service_records(record_id,owner_user_id,category_id,schema_version,encrypted_payload)
VALUES ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb','22222222-2222-2222-2222-222222222222','G',1,decode('00','hex'));

SET ROLE ytk_user_request;
BEGIN;
SELECT set_config('app.current_user_id','11111111-1111-1111-1111-111111111111',true);
SELECT set_config('app.assurance_level','A2',true);
DO $$ DECLARE c int; BEGIN SELECT count(*) INTO c FROM ytk_private.service_records; IF c<>1 THEN RAISE EXCEPTION 'cross-user SELECT leak: %',c; END IF; END $$;
DO $$ BEGIN
  BEGIN
    INSERT INTO ytk_private.service_records(record_id,owner_user_id,category_id,schema_version,encrypted_payload)
    VALUES ('cccccccc-cccc-cccc-cccc-cccccccccccc','22222222-2222-2222-2222-222222222222','F',1,decode('00','hex'));
    RAISE EXCEPTION 'cross-user INSERT unexpectedly allowed';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
END $$;
DO $$ BEGIN
  BEGIN
    UPDATE ytk_private.service_records SET owner_user_id='22222222-2222-2222-2222-222222222222' WHERE record_id='aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    RAISE EXCEPTION 'owner change unexpectedly allowed';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
END $$;
DO $$ DECLARE n int; BEGIN UPDATE ytk_private.service_records SET category_id='H' WHERE record_id='bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'; GET DIAGNOSTICS n=ROW_COUNT; IF n<>0 THEN RAISE EXCEPTION 'cross-user update allowed'; END IF; END $$;
DO $$ DECLARE n int; BEGIN DELETE FROM ytk_private.service_records WHERE record_id='bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'; GET DIAGNOSTICS n=ROW_COUNT; IF n<>0 THEN RAISE EXCEPTION 'cross-user delete allowed'; END IF; END $$;
COMMIT;

BEGIN;
SELECT set_config('app.current_user_id','11111111-1111-1111-1111-111111111111',true);
SELECT set_config('app.assurance_level','A1',true);
DO $$ DECLARE c int; BEGIN SELECT count(*) INTO c FROM ytk_private.service_records; IF c<>0 THEN RAISE EXCEPTION 'A1 read allowed'; END IF; END $$;
COMMIT;

BEGIN;
DO $$ DECLARE c int; BEGIN SELECT count(*) INTO c FROM ytk_private.service_records; IF c<>0 THEN RAISE EXCEPTION 'pool context leaked'; END IF; END $$;
COMMIT;
RESET ROLE;
