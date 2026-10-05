# YTK-R005-C / C2-MIN
# Secret-free ADMIN apply/verify template.
# This script does NOT set the ytk_user_request password.
# It does NOT write .env or a connection string containing a password.

$ErrorActionPreference = "Stop"

$PoolerHost = Read-Host "Supabase SESSION pooler host (copy from Dashboard Connect)"
$ProjectRef = Read-Host "Supabase project ref"
$CaPath = Read-Host "Full local path to supabase-ca.crt"

if (-not (Test-Path -LiteralPath $CaPath)) {
  throw "STOP: CA certificate file not found."
}

if (-not (Get-Command psql -ErrorAction SilentlyContinue)) {
  throw "STOP: psql not found."
}

$SecurePassword = Read-Host "Supabase postgres admin password" -AsSecureString
$AdminPassword = [Net.NetworkCredential]::new("", $SecurePassword).Password

try {
  $env:PGPASSWORD = $AdminPassword

  $ConnInfo = "host=$PoolerHost port=5432 dbname=postgres user=postgres.$ProjectRef sslmode=verify-full sslrootcert=$CaPath"

  & psql $ConnInfo -v ON_ERROR_STOP=1 -f (Join-Path $PSScriptRoot "..\sql\101_c2_supabase_schema.sql")
  if ($LASTEXITCODE -ne 0) { throw "STOP: schema apply failed." }

  & psql $ConnInfo -v ON_ERROR_STOP=1 -f (Join-Path $PSScriptRoot "..\sql\102_c2_supabase_verify_admin.sql")
  if ($LASTEXITCODE -ne 0) { throw "STOP: admin static verification failed." }

  Write-Host "PASS: schema + admin verification complete."
  Write-Host "STOP: ytk_user_request password is intentionally NOT set by this script."
}
finally {
  Remove-Item Env:PGPASSWORD -ErrorAction SilentlyContinue
  $AdminPassword = $null
  $SecurePassword = $null
}
