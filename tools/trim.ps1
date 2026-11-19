# Crops blank margins off light-background images (CAD renders), in place.
# Usage: powershell -File tools\trim.ps1 images\projects\rack-a.jpg [more files...]
param([Parameter(ValueFromRemainingArguments = $true)][string[]]$files)
Add-Type -AssemblyName System.Drawing
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 85L

foreach ($f in $files) {
  $path = (Resolve-Path $f).Path
  $src = [System.Drawing.Bitmap]::FromFile($path)
  $w = $src.Width; $h = $src.Height
  $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
  $data = $src.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
  $stride = $data.Stride
  $buf = New-Object byte[] ($stride * $h)
  [System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $buf, 0, $buf.Length)
  $src.UnlockBits($data)

  # Background reference = the pixel at the left edge of the same row (handles gradient backdrops).
  # A pixel counts as "content" if it differs clearly from that background.
  $tol = 34
  $minX = $w; $minY = $h; $maxX = -1; $maxY = -1
  for ($y = 0; $y -lt $h; $y += 2) {
    $row = $y * $stride
    $e = $row + 6 * 3; $eb = $buf[$e]; $eg = $buf[$e + 1]; $er = $buf[$e + 2]
    $e2 = $row + ($w - 7) * 3; $fb = $buf[$e2]; $fg = $buf[$e2 + 1]; $fr = $buf[$e2 + 2]
    for ($x = 0; $x -lt $w; $x += 2) {
      $i = $row + $x * 3
      $b = $buf[$i]; $g = $buf[$i + 1]; $r = $buf[$i + 2]
      $d1 = [Math]::Abs($r - $er) + [Math]::Abs($g - $eg) + [Math]::Abs($b - $eb)
      $d2 = [Math]::Abs($r - $fr) + [Math]::Abs($g - $fg) + [Math]::Abs($b - $fb)
      if ([Math]::Min($d1, $d2) -gt $tol * 3 -or ($d1 -gt $tol -and $d2 -gt $tol -and [Math]::Min($r, [Math]::Min($g, $b)) -lt 150)) {
        if ($x -lt $minX) { $minX = $x }; if ($x -gt $maxX) { $maxX = $x }
        if ($y -lt $minY) { $minY = $y }; if ($y -gt $maxY) { $maxY = $y }
      }
    }
  }
  if ($maxX -lt 0) { "$f : no content found, skipped"; $src.Dispose(); continue }
  $pad = [int]([Math]::Max($maxX - $minX, $maxY - $minY) * 0.05)
  $x0 = [Math]::Max(0, $minX - $pad); $y0 = [Math]::Max(0, $minY - $pad)
  $x1 = [Math]::Min($w, $maxX + $pad); $y1 = [Math]::Min($h, $maxY + $pad)
  $cw = $x1 - $x0; $ch = $y1 - $y0
  $out = New-Object System.Drawing.Bitmap $cw, $ch
  $gfx = [System.Drawing.Graphics]::FromImage($out)
  $gfx.DrawImage($src, (New-Object System.Drawing.Rectangle 0, 0, $cw, $ch), (New-Object System.Drawing.Rectangle $x0, $y0, $cw, $ch), [System.Drawing.GraphicsUnit]::Pixel)
  $gfx.Dispose(); $src.Dispose()
  $out.Save($path, $codec, $ep); $out.Dispose()
  "{0,-22} {1}x{2} -> {3}x{4}" -f (Split-Path $f -Leaf), $w, $h, $cw, $ch
}
