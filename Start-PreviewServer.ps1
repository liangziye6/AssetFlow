param(
  [int]$Port = 4173
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$LogPath = Join-Path $Root "preview.out.log"
$ErrorLogPath = Join-Path $Root "preview.err.log"
$ServerPath = Join-Path $Root "preview-server.js"

$listener = Get-NetTCPConnection -LocalAddress 127.0.0.1 -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
if ($listener) {
  "Preview already running at http://127.0.0.1:$Port/popup.html" | Out-File -LiteralPath $LogPath -Encoding utf8 -Append
  exit 0
}

$node = Get-Command node.exe -ErrorAction SilentlyContinue
if (-not $node) {
  throw "Cannot find node.exe in PATH. Install Node.js or add it to PATH."
}

$arguments = "`"$ServerPath`""
Start-Process `
  -FilePath $node.Source `
  -ArgumentList $arguments `
  -WorkingDirectory $Root `
  -WindowStyle Hidden `
  -RedirectStandardOutput $LogPath `
  -RedirectStandardError $ErrorLogPath

"Preview started at http://127.0.0.1:$Port/popup.html" | Out-File -LiteralPath $LogPath -Encoding utf8 -Append
