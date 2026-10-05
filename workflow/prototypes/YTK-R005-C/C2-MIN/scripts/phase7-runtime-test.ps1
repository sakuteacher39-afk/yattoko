# YTK-R005-C / C2-MIN
# Secret-free RUNTIME shared TRANSACTION pooler test template.
# Run only AFTER a human has interactively set a password for ytk_user_request.

$ErrorActionPreference = "Stop"

$PoolerHost = Read-Host "Supabase TRANSACTION pooler host (copy from Dashboard Connect)"
$ProjectRef = Read-Host "Supabase project ref"
$CaPath = Read-Host "Full local path to supabase-ca.crt"

if (-not (Test-Path -LiteralPath $CaPath)) {
  throw "STOP: CA certificate file not found."
}

if (-not (Get-Command psql -ErrorAction SilentlyContinue)) {
  throw "STOP: psql not found."
}

$SecurePassword = Read-Host "ytk_user_request password" -AsSecureString
$RuntimePassword = [Net.NetworkCredential]::new("", $SecurePassword).Password

try {
  $env:PGPASSWORD = $RuntimePassword

  $ConnInfo = "host=$PoolerHost port=6543 dbname=postgres user=ytk_user_request.$ProjectRef sslmode=verify-full sslrootcert=$CaPath"

  & psql $ConnInfo -v ON_ERROR_STOP=1 -f (Join-Path $PSScriptRoot "..\sql\103_c2_supabase_runtime_rls_test.sql")
  if ($LASTEXITCODE -ne 0) {
    throw "STOP: runtime RLS/context test failed. Do not weaken TLS/RLS or switch to a privileged role."
  }

  Write-Host "PASS: shared transaction pooler runtime test completed."
}
finally {
  Remove-Item Env:PGPASSWORD -ErrorAction SilentlyContinue
  $RuntimePassword = $null
  $SecurePassword = $null
}
