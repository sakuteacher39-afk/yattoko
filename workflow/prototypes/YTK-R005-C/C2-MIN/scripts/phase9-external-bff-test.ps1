# YTK-R005-C / C2-MIN
# Phase 9 real node-postgres / BFF-to-Supabase smoke test.
# Uses only synthetic UUIDs / ciphertext and a synthetic auth result.
# Does NOT perform Auth0 login, token issuance, or Passkey enrollment.

$ErrorActionPreference = "Stop"

$PoolerHost = Read-Host "Supabase TRANSACTION pooler host"
$ProjectRef = Read-Host "Supabase project ref"
$CaPath = Read-Host "Full local path to supabase-ca.crt"

if (-not (Test-Path -LiteralPath $CaPath)) {
  throw "STOP: CA certificate file not found."
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw "STOP: node not found."
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  throw "STOP: npm not found."
}

$ResolvedCaPath = (Resolve-Path -LiteralPath $CaPath).Path
$SecurePassword = Read-Host "ytk_user_request password" -AsSecureString
$RuntimePassword = [Net.NetworkCredential]::new("", $SecurePassword).Password

$EnvNames = @(
  "YTK_DB_HOST",
  "YTK_DB_PORT",
  "YTK_DB_NAME",
  "YTK_DB_USER",
  "YTK_DB_PASSWORD",
  "YTK_DB_CA_CERT_PATH",
  "YTK_AUTH0_DOMAIN",
  "YTK_AUTH0_AUDIENCE"
)

try {
  $env:YTK_DB_HOST = $PoolerHost
  $env:YTK_DB_PORT = "6543"
  $env:YTK_DB_NAME = "postgres"
  $env:YTK_DB_USER = "ytk_user_request.$ProjectRef"
  $env:YTK_DB_PASSWORD = $RuntimePassword
  $env:YTK_DB_CA_CERT_PATH = $ResolvedCaPath
  $env:YTK_AUTH0_DOMAIN = "yattoko-r005c-dev-20261005.jp.auth0.com"
  $env:YTK_AUTH0_AUDIENCE = "https://api.yattoko.invalid/r005c"

  $C1Root = (Resolve-Path (Join-Path $PSScriptRoot "..\..\C1")).Path

  Push-Location $C1Root
  try {
    & npm run build
    if ($LASTEXITCODE -ne 0) {
      throw "STOP: local build failed."
    }

    & node (Join-Path $C1Root "runtime\phase9-external-smoke.mjs")
    if ($LASTEXITCODE -ne 0) {
      throw "STOP: Phase 9 external BFF/Supabase smoke test failed."
    }
  }
  finally {
    Pop-Location
  }

  Write-Host "PASS: Phase 9 external BFF/Supabase smoke test completed."
}
finally {
  foreach ($name in $EnvNames) {
    Remove-Item "Env:$name" -ErrorAction SilentlyContinue
  }
  $RuntimePassword = $null
  $SecurePassword = $null
  $ResolvedCaPath = $null
}
