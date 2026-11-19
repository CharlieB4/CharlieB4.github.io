# Resizes photos for the web (max 1600 px, JPEG q82, EXIF rotation applied, metadata such as GPS stripped).
# Usage:
#   powershell -ExecutionPolicy Bypass -File tools\resize.ps1 -src "C:\path\to\originals" -dst images\projects -pairs "IMG_1234.JPG=my-name","shot.png=other-name"
param([string]$src, [string]$dst, [string[]]$pairs)
Add-Type -AssemblyName System.Drawing
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 82L
foreach ($p in $pairs) {
  $a = $p.Split('='); $in = Join-Path $src $a[0]; $out = Join-Path $dst ($a[1] + ".jpg")
  $img = [System.Drawing.Image]::FromFile($in)
  if ($img.PropertyIdList -contains 0x0112) {
    switch ($img.GetPropertyItem(0x0112).Value[0]) { 3 { $img.RotateFlip("Rotate180FlipNone") } 6 { $img.RotateFlip("Rotate90FlipNone") } 8 { $img.RotateFlip("Rotate270FlipNone") } }
  }
  $s = [Math]::Min(1.0, 1600 / [Math]::Max($img.Width, $img.Height))
  $w = [int]($img.Width * $s); $h = [int]($img.Height * $s)
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.Clear([System.Drawing.Color]::White)
  $g.InterpolationMode = "HighQualityBicubic"; $g.SmoothingMode = "HighQuality"; $g.PixelOffsetMode = "HighQuality"
  $g.DrawImage($img, 0, 0, $w, $h)
  $bmp.Save($out, $codec, $ep)
  "{0,-22} {1}x{2}  {3:N0} KB" -f $a[1], $w, $h, ((Get-Item $out).Length / 1KB)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
}
