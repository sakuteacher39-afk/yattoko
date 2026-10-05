# YTK-R005-C / C1 PostgreSQL 実確認手順書

- 状態: 手順書作成済み / 2026-10-05 実PostgreSQL試験実施済み・PASS
- 対象工程: YTK-R005-C / C1
- 作成日: 2026-10-04
- 目的: Windows PC上の完全ローカル実PostgreSQLでC1のrole / RLS / transaction-local contextを確認する
- C1状態: **C1 COMPLETE / PASS（C2未承認）**
- 実行結果の正式記録は `REPORT.md` / `TEST_MATRIX.md` を正本とする

## 1. 固定安全条件

- 実ユーザーデータ禁止
- 完全ダミーデータのみ
- 外部DB禁止
- Supabase / Auth0 / AWS接続禁止
- 本番resource作成禁止
- credentialをGitHubへ保存しない
- PostgreSQL互換mockで実確認を代替しない
- 1項目でも失敗した場合はPASS扱いしない
- C2へ進まない

## 2. 推奨方式

### 第一推奨: Docker Desktop + PostgreSQL公式コンテナ

理由:

1. PostgreSQL server / clientをWindowsへ常設しなくてよい
2. C1 directoryをread-only mountできる
3. host portを公開せず試験できる
4. image取得後、試験containerを --network none で外部networkから切り離せる
5. serverとpsqlを同じ実PostgreSQL container内で動かせる
6. container削除で試験DBをまとめて破棄できる
7. Native installより既存PC環境への影響が小さい

C1の目的は本物のPostgreSQLでRLSを確認することであり、Windows serviceとしてPostgreSQLを恒久運用することではないため、Docker方式を優先する。

### 第二候補: Native PostgreSQL for Windows

Docker Desktopを導入できない場合のみ使用する。

利点:

- Windows上の実PostgreSQLを直接利用できる
- Docker / WSLが不要
- 既存scripts/test-postgres.shをGit Bashから直接利用しやすい

欠点:

- Windows service、data directory、port設定が残る
- cleanup対象が多い
- listen設定を誤るとLANへ露出し得る

## 3. C1で確認する項目

1. ytk_user_request がnon-BYPASSRLS
2. RLS SELECT
3. RLS INSERT
4. RLS UPDATE
5. RLS DELETE
6. cross-user遮断
7. A1遮断
8. owner_user_id変更禁止
9. transaction終了後にuser contextが消失
10. 同一接続の次transactionへcontextが漏れない

注意:

C1で確認する「pool context leakage」は、同一PostgreSQL接続を次transactionで再利用してもSET LOCAL相当contextが残らないことまでを対象とする。

Supabase Supavisor等の実poolerそのものは外部dev環境が必要なためC2/C3で別途確認する。C1でSupavisor実pooler確認済みとは扱わない。

## 4. 既存C1資材

対象directory:

workflow/prototypes/YTK-R005-C/C1/

使用file:

- sql/001_schema.sql
  - ytk_private schema
  - ytk_user_request role
  - NOBYPASSRLS
  - SECURITY INVOKER helper
  - PUBLIC revoke
  - explicit grants
  - owner_user_id UPDATE grantなし
  - FORCE ROW LEVEL SECURITY
  - SELECT / INSERT / UPDATE / DELETE policy
  - A2条件

- sql/002_rls_test.sql
  - cross-user SELECT / INSERT / UPDATE / DELETE
  - owner変更
  - A1遮断
  - transaction-local context消失

- scripts/test-postgres.sh
  - psqlが存在しない場合はexit 20 / BLOCKED
  - DATABASE_URLを使用して上記SQLを実行

## 5. 事前確認

PowerShellでrepository内のC1 directoryへ移動する。

~~~powershell
cd <YATTOKO_REPOSITORY>\workflow\prototypes\YTK-R005-C\C1
git status --short
node -v
git --version
~~~

確認:

- C1 directoryにいる
- Node.jsは24系を推奨
- 実データfileがない
- .envやcredential fileを作っていない
- git statusに秘密情報らしき未追跡fileがない

PostgreSQL試験自体はNode.js非依存だが、C1全体の再現性確認ではNode 24系を使用する。

# 6. Docker方式

## 6.1 Docker導入確認

~~~powershell
docker version
~~~

Client / Server情報が出れば導入済み。

未導入の場合はDocker公式Docker Desktop for Windowsを利用する。

推奨:

- per-user install
- WSL 2 backend
- Linux containers

Windows containersは不要。

Docker Desktopの導入とPostgreSQL image取得時だけinternet接続が必要。試験container自体は外部networkへ接続しない。

## 6.2 PostgreSQL imageを先に取得

internet接続中に実行する。

~~~powershell
docker pull postgres:18-bookworm
docker image inspect postgres:18-bookworm
~~~

image取得後、より強い隔離を求める場合はPCのWi-Fi / Ethernetを切断して以降を実施してよい。

## 6.3 dummy credentialをmemoryだけで作る

~~~powershell
$PgUser = "ytk_c1_admin"
$PgDb   = "ytk_c1_local"
$PgPass = "YTKC1Dummy" + [Guid]::NewGuid().ToString("N") + "aA1"
~~~

このpasswordは:

- 実サービスで使わない
- 他用途に再利用しない
- fileへ保存しない
- Gitへcommitしない
- 試験後にPowerShell variableを削除する

## 6.4 networkなし・port公開なしで起動

C1 directoryで実行する。

~~~powershell
$C1Path = (Get-Location).Path

docker run --name ytk-c1-postgres --network none --mount "type=bind,source=$C1Path,target=/work,readonly" -e POSTGRES_USER=$PgUser -e POSTGRES_PASSWORD=$PgPass -e POSTGRES_DB=$PgDb -d postgres:18-bookworm
~~~

必須:

- -p / --publish を付けない
- --network none を外さない
- C1 directoryはreadonly mount
- named volumeを作らない

PostgreSQL serverとpsqlは同じcontainer内で使用する。

## 6.5 外部接続不能を確認

~~~powershell
docker inspect ytk-c1-postgres --format '{{.HostConfig.NetworkMode}}'
docker port ytk-c1-postgres
docker inspect ytk-c1-postgres --format '{{json .NetworkSettings.Networks}}'
~~~

期待:

- NetworkMode = none
- docker port は出力なし
- hostへのpublished portなし

bridge等が表示される、またはhost portが表示された場合はSTOPする。

~~~powershell
docker stop ytk-c1-postgres
docker rm ytk-c1-postgres
~~~

設定を修正して最初からやり直す。

## 6.6 PostgreSQL起動確認

~~~powershell
docker exec ytk-c1-postgres pg_isready -U $PgUser -d $PgDb
~~~

期待:

accepting connections

失敗時は試験へ進まない。

必要時のみ:

~~~powershell
docker logs --tail 50 ytk-c1-postgres
~~~

ログをrepositoryへ保存しない。

## 6.7 DATABASE_URLをmemoryだけで作る

~~~powershell
$DbUrl = "postgresql://" + $PgUser + ":" + $PgPass + "@127.0.0.1:5432/" + $PgDb
~~~

これはcontainer内部のlocal loopbackでのみ使用する。

GitHub、.env、Markdown、screenshotへ保存しない。

## 6.8 既存C1試験scriptを実行

~~~powershell
docker exec -e DATABASE_URL=$DbUrl -w /work ytk-c1-postgres bash scripts/test-postgres.sh
~~~

内部で実PostgreSQLのpsqlが:

1. sql/001_schema.sql
2. sql/002_rls_test.sql

を実行する。

期待する最終行:

PASS: actual PostgreSQL RLS/role/context tests completed.

途中にERRORが1件でも出た場合はFAIL / STOPとする。

## 6.9 non-BYPASSRLS role確認

~~~powershell
docker exec ytk-c1-postgres psql -U $PgUser -d $PgDb -Atc "SELECT rolname,rolsuper,rolcreaterole,rolcreatedb,rolreplication,rolbypassrls FROM pg_roles WHERE rolname='ytk_user_request';"
~~~

期待:

~~~text
ytk_user_request|f|f|f|f|f
~~~

rolsuper / rolcreaterole / rolcreatedb / rolreplication / rolbypassrls のどれかがtならFAIL。

## 6.10 RLS有効・FORCE確認

~~~powershell
docker exec ytk-c1-postgres psql -U $PgUser -d $PgDb -Atc "SELECT relrowsecurity,relforcerowsecurity FROM pg_class WHERE oid='ytk_private.service_records'::regclass;"
~~~

期待:

~~~text
t|t
~~~

それ以外はFAIL。

## 6.11 owner列UPDATE権限確認

~~~powershell
docker exec ytk-c1-postgres psql -U $PgUser -d $PgDb -Atc "SELECT has_column_privilege('ytk_user_request','ytk_private.service_records','owner_user_id','UPDATE');"
~~~

期待:

~~~text
f
~~~

tならFAIL。

## 6.12 transaction-local context確認

既存002_rls_test.sqlで、同一psql接続上の次transactionにcontextが残らないことを確認する。

追加確認:

~~~powershell
docker exec ytk-c1-postgres psql -U $PgUser -d $PgDb -v ON_ERROR_STOP=1 -c "SET ROLE ytk_user_request; BEGIN; SELECT set_config('app.current_user_id','11111111-1111-1111-1111-111111111111',true); COMMIT; BEGIN; SELECT COALESCE(current_setting('app.current_user_id',true),'')='' AS context_cleared; ROLLBACK; RESET ROLE;"
~~~

期待:

context_cleared = t

これは同一接続再利用時のtransaction-local leakageなしを確認する試験であり、Supavisor実poolerの試験ではない。

## 6.13 Docker cleanup

~~~powershell
docker stop ytk-c1-postgres
docker rm ytk-c1-postgres

Remove-Variable PgUser -ErrorAction SilentlyContinue
Remove-Variable PgDb -ErrorAction SilentlyContinue
Remove-Variable PgPass -ErrorAction SilentlyContinue
Remove-Variable DbUrl -ErrorAction SilentlyContinue
Remove-Variable C1Path -ErrorAction SilentlyContinue
~~~

named volumeを作っていないためcontainer削除でDB dataも破棄される。

imageも不要なら任意で:

~~~powershell
docker image rm postgres:18-bookworm
~~~

他projectを巻き込むため docker system prune -a は使用しない。

# 7. Native PostgreSQL方式

Dockerが利用できない場合だけ使用する。

## 7.1 install範囲

PostgreSQL公式Windows download pageから案内されるEDB installerを使う。

必要:

- PostgreSQL Server
- Command Line Tools / psql

任意:

- pgAdmin

不要:

- StackBuilder追加package
- cloud extension
- 外部DB接続tool

C1基準候補はPostgreSQL 18。

## 7.2 Native install時のdummy設定

installerではC1専用dummy passwordを使う。

既存PostgreSQL instanceがある場合は勝手に流用しない。
別instance / 別portを使うかDocker方式へ切り替える。

## 7.3 listen address確認

psqlで:

~~~sql
SHOW listen_addresses;
SHOW port;
~~~

期待:

localhostまたはloopback限定。

* やLAN IPが含まれる場合はSTOP。

postgresql.confを必要に応じて:

~~~text
listen_addresses = 'localhost'
~~~

へ設定し、service再起動後に再確認する。

## 7.4 pg_hba確認

~~~sql
SELECT type,address,auth_method,error
FROM pg_hba_file_rules
WHERE type LIKE 'host%';
~~~

0.0.0.0/0、LAN全体等の広いnetworkを許可するruleがある場合はSTOP。
C1用instanceはloopbackだけにする。

## 7.5 local専用DB作成

PowerShell例:

~~~powershell
$PgBin = "C:\Program Files\PostgreSQL\18\bin"
$env:Path = "$PgBin;$env:Path"

$PgHost = "127.0.0.1"
$PgPort = "5432"
$PgUser = "postgres"
$PgDb   = "ytk_c1_local"
$PgPass = "<C1専用dummy password>"

$env:PGPASSWORD = $PgPass

createdb -h $PgHost -p $PgPort -U $PgUser $PgDb
~~~

installerで別portを選んだ場合は合わせる。

## 7.6 local接続先確認

~~~powershell
$env:DATABASE_URL = "postgresql://" + $PgUser + ":" + $PgPass + "@" + $PgHost + ":" + $PgPort + "/" + $PgDb
$env:DATABASE_URL -match '@(127\.0\.0\.1|localhost):'
~~~

期待:

True

FalseならSTOP。

## 7.7 bash / psql確認

~~~powershell
bash --version
psql --version
~~~

Git BashがPATH上にない場合はGit for Windowsのbashを使う。

## 7.8 既存script実行

C1 directoryで:

~~~powershell
npm run test:postgres
~~~

npm scriptは bash scripts/test-postgres.sh を実行する。

Git Bashから直接行う場合も、DATABASE_URLはenvironment variableだけに設定し、repository fileへ書かない。

## 7.9 Native cleanup

~~~powershell
dropdb -h $PgHost -p $PgPort -U $PgUser $PgDb
psql -h $PgHost -p $PgPort -U $PgUser -d postgres -c "DROP ROLE IF EXISTS ytk_user_request;"

Remove-Item Env:DATABASE_URL -ErrorAction SilentlyContinue
Remove-Item Env:PGPASSWORD -ErrorAction SilentlyContinue
Remove-Variable PgPass -ErrorAction SilentlyContinue
~~~

C1専用にPostgreSQLをinstallした場合は必要に応じてWindowsの「インストールされているアプリ」からuninstallする。

data directoryはservice停止と対象path確認なしに手作業削除しない。

# 8. PCから外部接続しない確認

## Docker方式

必須:

- containerは --network none
- host port publishなし
- DATABASE_URLはcontainer内部127.0.0.1
- Supabase hostnameなし
- Auth0 hostnameなし
- AWS endpointなし

最も強い確認として、image取得後にPCのnetwork adapterを一時切断して試験してよい。

## Native方式

必須:

- DATABASE_URL hostは127.0.0.1またはlocalhost
- SHOW listen_addresses はlocalhost限定
- pg_hbaはloopback限定
- Supabase / Auth0 / AWS hostnameなし

追加確認:

~~~powershell
netstat -ano | findstr ":5432"
~~~

使用portへ置き換え、LISTENが127.0.0.1 / ::1だけであることを確認する。

# 9. 期待されるPASS項目

既存scriptが正常終了し追加確認も期待値なら、以下を実PostgreSQL C1確認PASS候補として記録できる。

- non-BYPASSRLS role
- RLS enabled
- FORCE RLS
- user A → own row SELECT
- user A → user B SELECT 0件
- cross-user INSERT reject
- cross-user UPDATE 0件
- cross-user DELETE 0件
- owner_user_id UPDATE不可
- A1 SELECT 0件
- transaction終了後context消失
- 同一接続次transactionへのcontext漏れなし

この試験範囲外:

- Supavisor実pooler
- Auth0実Passkey
- Supabase actual role
- cloud network restriction

# 10. 失敗時の停止条件

以下の1つでも発生したらSTOP / FAIL。

- script exit codeが0以外
- SQL ERROR
- ytk_user_request.rolbypassrls = true
- superuser / create role / create DB / replication権限がtrue
- RLS無効
- FORCE RLS無効
- user Aからuser B rowが見える
- cross-user INSERT成功
- cross-user UPDATE成功
- cross-user DELETE成功
- owner_user_id変更成功
- A1でrow取得成功
- transaction終了後もcontextが残る
- DB接続先がloopback以外
- Docker containerが外部networkへ接続可能
- host portが公開されている
- 実ユーザーデータが混入
- credentialがGit statusに現れる
- 外部DB URLが設定されている

失敗時はその場で設定を直して「最初から成功した」扱いにしない。

FAILを記録し、原因と修正を分けた後、改めて全試験を最初から実行する。

# 11. 試験後cleanup確認

~~~powershell
git status --short
~~~

期待:

credential / DB dump / log / .env等の新規fileがない。

Gitへ残してよいものは:

- PASS / FAIL
- PostgreSQL version
- Docker / Native
- 実行日時
- error code
- 非秘密の技術結果

残してはいけないもの:

- password
- DATABASE_URL
- token
- 生cookie
- DB dump
- console log全文

# 12. 人間が報告する最小結果

~~~text
YTK-R005-C C1 PostgreSQL実確認

方式: Docker / Native
PostgreSQL version:
実行日時:

test-postgres.sh:
PASS / FAIL
exit code:

non-BYPASSRLS:
PASS / FAIL

RLS SELECT:
PASS / FAIL

RLS INSERT:
PASS / FAIL

RLS UPDATE:
PASS / FAIL

RLS DELETE:
PASS / FAIL

cross-user:
PASS / FAIL

A1遮断:
PASS / FAIL

owner列変更禁止:
PASS / FAIL

transaction-local context:
PASS / FAIL

同一接続context leakage:
PASS / FAIL

異常・補足:
なし / 内容
~~~

credentialは報告しない。

# 13. 実行結果とC1完了判定

2026-10-05、人間のWindows PC上のNative PostgreSQL 18.6で本手順に基づく実確認を実施。

結果:

- `npm run test:postgres`: PASS
- non-BYPASSRLS: PASS
- RLS / FORCE RLS: PASS
- owner_user_id UPDATE禁止: PASS
- cross-user SELECT / INSERT / UPDATE / DELETE遮断: PASS
- A1遮断: PASS
- transaction-local context消失: PASS
- 同一接続次transactionへのcontext leakageなし: PASS

正式な詳細記録は `REPORT.md` / `TEST_MATRIX.md` を参照。

現在状態:

**C1 COMPLETE / PASS（C2未承認）**

なおSupavisor実pooler、Auth0実Passkey、KMS / S3 / DynamoDB / NAT等は本手順の確認範囲外。

# 14. 公式参考資料

- Docker Desktop for Windows
  https://docs.docker.com/desktop/setup/install/windows-install/
- PostgreSQL Windows installer
  https://www.postgresql.org/download/windows/
- PostgreSQL Official Docker Image
  https://hub.docker.com/_/postgres
- PostgreSQL Row Security
  https://www.postgresql.org/docs/current/ddl-rowsecurity.html
