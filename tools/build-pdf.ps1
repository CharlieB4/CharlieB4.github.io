# Builds the PDF version of the portfolio from print.html (same projects.js as the website).
#   powershell -ExecutionPolicy Bypass -File tools\build-pdf.ps1
# Output: Charlie_Borchers_Portfolio.pdf in the project folder.
# Images are downscaled into build\print first so the PDF stays small enough for job portals.
param([int]$maxSide = 1000, [long]$quality = 68)
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
$src = Join-Path $root "images\projects"
$dst = Join-Path $root "build\print"
New-Item -ItemType Directory -Force $dst | Out-Null

Add-Type -AssemblyName System.Drawing
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), $quality
Get-ChildItem $dst -File | Where-Object { -not (Test-Path (Join-Path $src $_.Name)) } | Remove-Item
foreach ($f in Get-ChildItem $src -File -Filter *.jpg) {
  $out = Join-Path $dst $f.Name
  if ((Test-Path $out) -and (Get-Item $out).LastWriteTime -ge $f.LastWriteTime) { continue }
  $img = [System.Drawing.Image]::FromFile($f.FullName)
  $s = [Math]::Min(1.0, $maxSide / [Math]::Max($img.Width, $img.Height))
  $w = [int]($img.Width * $s); $h = [int]($img.Height * $s)
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = "HighQualityBicubic"; $g.PixelOffsetMode = "HighQuality"
  $g.DrawImage($img, 0, 0, $w, $h)
  $bmp.Save($out, $codec, $ep)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
}

$browser = @(
  "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
  "C:\Program Files\Microsoft\Edge\Application\msedge.exe",
  "C:\Program Files\Google\Chrome\Application\chrome.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $browser) { throw "Edge or Chrome not found" }

$pdf = Join-Path $root "Charlie_Borchers_Portfolio.pdf"
$url = ([Uri](Join-Path $root "print.html")).AbsoluteUri + "?img=build/print"
$profileDir = Join-Path $env:TEMP "portfolio-pdf-profile"
$browserArgs = @("--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--no-first-run",
  "--user-data-dir=`"$profileDir`"", "--virtual-time-budget=20000", "--print-to-pdf=`"$pdf`"", "`"$url`"")
# Browser logs to stderr; send it to a temp file so it isn't treated as an error
Start-Process -FilePath $browser -ArgumentList $browserArgs -Wait -NoNewWindow `
  -RedirectStandardError (Join-Path $env:TEMP "portfolio-pdf-stderr.txt") `
  -RedirectStandardOutput (Join-Path $env:TEMP "portfolio-pdf-stdout.txt")
if (-not (Test-Path $pdf)) { throw "PDF was not created" }
"{0}  ({1:N1} MB)" -f $pdf, ((Get-Item $pdf).Length / 1MB)
