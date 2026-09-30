param(
  [string]$Root = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = "Stop"
$snapshotPath = Join-Path $Root "tools\codex-audit-snapshot.txt"
$lines = New-Object System.Collections.Generic.List[string]

function Add-Line {
  param([string]$Text = "")
  $lines.Add($Text)
}

function Add-FileSummary {
  param(
    [string]$RelativePath,
    [string[]]$Patterns
  )

  $path = Join-Path $Root $RelativePath
  Add-Line ""
  Add-Line "===== $RelativePath ====="
  if (-not (Test-Path -LiteralPath $path)) {
    Add-Line "[missing]"
    return
  }

  $content = Get-Content -LiteralPath $path
  Add-Line ("lines: " + $content.Count)
  foreach ($pattern in $Patterns) {
    Add-Line "-- pattern: $pattern"
    $matches = Select-String -InputObject $content -Pattern $pattern -AllMatches
    if (-not $matches) {
      Add-Line "  [no matches]"
      continue
    }
    foreach ($match in $matches | Select-Object -First 30) {
      Add-Line ("  " + $match.LineNumber + ": " + $match.Line.Trim())
    }
  }
}

Add-Line ("Audit root: " + $Root)
Add-Line ("Generated: " + (Get-Date -Format "yyyy-MM-dd HH:mm:ss"))

Add-Line ""
Add-Line "===== ROOT FILES ====="
Get-ChildItem -LiteralPath $Root -Force |
  Where-Object { $_.Name -notin @(".git", "Output", "node_modules", "dist") } |
  Sort-Object Name |
  ForEach-Object { Add-Line (($_.PSIsContainer ? "[D] " : "[F] ") + $_.Name) }

Add-Line ""
Add-Line "===== GIT STATUS ====="
try {
  $gitStatus = & git -C $Root status --short 2>$null
  if ($gitStatus) {
    $gitStatus | ForEach-Object { Add-Line $_ }
  } else {
    Add-Line "[clean]"
  }
} catch {
  Add-Line ("[git unavailable] " + $_.Exception.Message)
}

Add-FileSummary "manifest.json" @(
  '"name"',
  '"version"',
  '"description"',
  '"permissions"',
  '"host_permissions"'
)

Add-FileSummary "package.json" @(
  '"version"',
  '"scripts"',
  '"package"',
  '"check"'
)

Add-FileSummary "popup.html" @(
  'AssetFlow|Image to Prompt|AI生图反推',
  'visualReuse|visual-reuse|视觉复用',
  'reuse|role|reference',
  'textStrategy|文字',
  'generate|生成新视觉|查看复用方案',
  'gallery|已生成'
)

Add-FileSummary "popup.js" @(
  'AssetFlow|Image to Prompt|AI生图反推',
  'visualReuse|visual-reuse|视觉复用',
  'ReusePlan|reusePlan|reuse-plan',
  'role|referenceRole|roleTags',
  'textStrategy|文字策略',
  'generateReuse|生成复用|查看复用方案|生成新视觉',
  'validate|validation|actualWidth|naturalWidth',
  'archive|manifest|projectId|parentAsset',
  'pending|resume|recover|taskId',
  'gallery|IndexedDB|Eagle'
)

Add-FileSummary "background.js" @(
  'pending|resume|recover|taskId',
  'gallery|IndexedDB',
  'contextMenus',
  'sidePanel',
  'runtime.onMessage'
)

Add-FileSummary "popup.css" @(
  'visual-reuse|reuse',
  'reference-role|role',
  'gallery',
  'prompt-composer',
  '@media'
)

$lines | Set-Content -LiteralPath $snapshotPath -Encoding UTF8

Add-Type -AssemblyName System.Drawing
$font = New-Object System.Drawing.Font("Consolas", 14)
$brush = [System.Drawing.Brushes]::White
$background = [System.Drawing.Color]::FromArgb(18, 20, 28)
$width = 1800
$height = 2200
$margin = 32
$lineHeight = 22
$linesPerPage = [Math]::Floor(($height - ($margin * 2)) / $lineHeight)
$pageCount = [Math]::Ceiling($lines.Count / $linesPerPage)

for ($page = 0; $page -lt $pageCount; $page++) {
  $bitmap = New-Object System.Drawing.Bitmap($width, $height)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.Clear($background)
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

  $start = $page * $linesPerPage
  $end = [Math]::Min($start + $linesPerPage, $lines.Count)
  for ($index = $start; $index -lt $end; $index++) {
    $y = $margin + (($index - $start) * $lineHeight)
    $graphics.DrawString($lines[$index], $font, $brush, $margin, $y)
  }

  $outputPath = Join-Path $Root ("tools\codex-audit-page-{0:D2}.png" -f ($page + 1))
  $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $graphics.Dispose()
  $bitmap.Dispose()
}

$font.Dispose()
