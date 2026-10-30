$ErrorActionPreference = 'Stop'
$taskBase = Split-Path $PSScriptRoot -Parent
$taskAddendum = Get-Content -LiteralPath (Join-Path $taskBase 'ENVIRONMENT-ADDENDUM.json') -Raw | ConvertFrom-Json
if ((Get-FileHash -LiteralPath $PSCommandPath -Algorithm SHA256).Hash.ToLowerInvariant() -ne $taskAddendum.launcherSHA256) { throw 'Launcher hash mismatch' }
if ($env:GIT_CONFIG_COUNT -and $env:GIT_CONFIG_COUNT -ne '0') { throw 'Unexpected inherited Git configuration; do not silently overwrite' }
$taskPriorCount = $env:GIT_CONFIG_COUNT
$taskPriorKey = $env:GIT_CONFIG_KEY_0
$taskPriorValue = $env:GIT_CONFIG_VALUE_0
try {
    $env:GIT_CONFIG_COUNT = '1'
    $env:GIT_CONFIG_KEY_0 = 'core.longpaths'
    $env:GIT_CONFIG_VALUE_0 = 'true'
    node (Join-Path $PSScriptRoot 'run.mjs')
    if ($LASTEXITCODE -ne 0) { throw "Formal runner exited with $LASTEXITCODE; preserve evidence and stop" }
} finally {
    $env:GIT_CONFIG_COUNT = $taskPriorCount
    $env:GIT_CONFIG_KEY_0 = $taskPriorKey
    $env:GIT_CONFIG_VALUE_0 = $taskPriorValue
}
