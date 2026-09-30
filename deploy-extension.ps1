$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$package = Get-Content -Raw -Encoding UTF8 (Join-Path $root "package.json") | ConvertFrom-Json
$buildDir = Join-Path $root "dist\assetflow"
$legacyBuildDirs = @(
  (Join-Path $root "dist\lyz-assetflow"),
  (Join-Path $root "dist\image-prompt-builder")
)
$zipPath = Join-Path $root ("dist\assetflow-v{0}.zip" -f $package.version)

$files = @(
  "manifest.json",
  "background.js",
  "content.js",
  "index.html",
  "popup.html",
  "popup.css",
  "soft-aurora.js",
  "reuse-plan.js",
  "popup.js",
  "options.html",
  "options.css",
  "options.js",
  "README.md"
)

New-Item -ItemType Directory -Force -Path (Join-Path $root "dist") | Out-Null
if (Test-Path $buildDir) {
  Remove-Item -LiteralPath $buildDir -Recurse -Force
}
New-Item -ItemType Directory -Force -Path $buildDir | Out-Null

foreach ($file in $files) {
  $source = Join-Path $root $file
  if (Test-Path $source) {
    Copy-Item -LiteralPath $source -Destination (Join-Path $buildDir $file) -Force
  }
}

$assetsDir = Join-Path $root "assets"
if (Test-Path $assetsDir) {
  Copy-Item -LiteralPath $assetsDir -Destination (Join-Path $buildDir "assets") -Recurse -Force
}

$docsDir = Join-Path $root "docs"
if (Test-Path $docsDir) {
  Copy-Item -LiteralPath $docsDir -Destination (Join-Path $buildDir "docs") -Recurse -Force
}

foreach ($legacyBuildDir in $legacyBuildDirs) {
  if (Test-Path $legacyBuildDir) {
    Remove-Item -LiteralPath $legacyBuildDir -Recurse -Force
  }
  Copy-Item -LiteralPath $buildDir -Destination $legacyBuildDir -Recurse -Force
}

if (Test-Path $zipPath) {
  Remove-Item -LiteralPath $zipPath -Force
}
Compress-Archive -Path (Join-Path $buildDir "*") -DestinationPath $zipPath -Force

Write-Host ""
Write-Host ("AssetFlow {0} extension package is ready:" -f $package.version)
Write-Host $zipPath
Write-Host ""
Write-Host "For local testing, open chrome://extensions or edge://extensions, enable Developer mode, then load unpacked:"
Write-Host $buildDir
Write-Host ""
Write-Host "Existing unpacked installs can keep reloading either compatibility directory:"
foreach ($legacyBuildDir in $legacyBuildDirs) {
  Write-Host $legacyBuildDir
}

Start-Process "chrome://extensions" -ErrorAction SilentlyContinue
