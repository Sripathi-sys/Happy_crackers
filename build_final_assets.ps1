Add-Type -AssemblyName System.Drawing

$workspace = "c:\Users\acer\Downloads\happyenjoycrackers\happyenjoycrackers"
$assetsDir = Join-Path $workspace "assets\images"
$userBanner = "C:\Users\acer\.gemini\antigravity-ide\brain\aeceda19-ae5e-4d86-878d-0872f91f2190\.user_uploaded\media_1789027948046.jpg"

function Get-RoundedRectPath($r, $radius) {
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = $radius * 2
    $path.AddArc($r.X, $r.Y, $d, $d, 180, 90)
    $path.AddArc($r.Right - $d, $r.Y, $d, $d, 270, 90)
    $path.AddArc($r.Right - $d, $r.Bottom - $d, $d, $d, 0, 90)
    $path.AddArc($r.X, $r.Bottom - $d, $d, $d, 90, 90)
    $path.CloseFigure()
    return $path
}

$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = [System.Drawing.StringAlignment]::Center
$sf.LineAlignment = [System.Drawing.StringAlignment]::Center

# =========================================================================
# 1. TOP BANNER (combo_banner.jpg)
# =========================================================================
Write-Output "Processing combo_banner.jpg..."
$bannerDest = Join-Path $assetsDir "combo_banner.jpg"

$bytes = [System.IO.File]::ReadAllBytes($userBanner)
$ms = New-Object System.IO.MemoryStream(@(,$bytes))
$bmpBanner = [System.Drawing.Bitmap]::FromStream($ms)

$gBanner = [System.Drawing.Graphics]::FromImage($bmpBanner)
$gBanner.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gBanner.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$gBanner.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

$bannerCards = @(
    @{ CenterX = 71;  NewVal = "4000"; BoxX = 25;  BoxW = 92;  RectY = 418; RectH = 48; FontSize = 27 },
    @{ CenterX = 192; NewVal = "6000"; BoxX = 146; BoxW = 92;  RectY = 418; RectH = 48; FontSize = 27 },
    @{ CenterX = 315; NewVal = "4000"; BoxX = 269; BoxW = 92;  RectY = 418; RectH = 48; FontSize = 27 },
    @{ CenterX = 436; NewVal = "6000"; BoxX = 384; BoxW = 104; RectY = 417; RectH = 50; FontSize = 27 },
    @{ CenterX = 558; NewVal = "12000"; BoxX = 502; BoxW = 112; RectY = 417; RectH = 49; FontSize = 23 }
)

foreach ($card in $bannerCards) {
    $fillRec = New-Object System.Drawing.Rectangle([int]$card.BoxX, [int]$card.RectY, [int]$card.BoxW, [int]$card.RectH)
    
    $colTop = $bmpBanner.GetPixel($card.CenterX, [int]$card.RectY - 1)
    $colBot = $bmpBanner.GetPixel($card.CenterX, [int]$card.RectY + [int]$card.RectH + 1)
    
    $gradBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($fillRec, $colTop, $colBot, [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
    $gBanner.FillRectangle($gradBrush, $fillRec)
    $gradBrush.Dispose()

    $cardFont = New-Object System.Drawing.Font("Impact", [float]$card.FontSize, [System.Drawing.FontStyle]::Regular)
    $bShadow = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(230, 0, 0, 0))
    $bText = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 248, 192, 24))
    
    $drawRecShadow = New-Object System.Drawing.RectangleF([float]($card.CenterX - 55), [float]424, [float]110, [float]40)
    $drawRecText = New-Object System.Drawing.RectangleF([float]($card.CenterX - 55), [float]421, [float]110, [float]40)
    
    $gBanner.DrawString([string]$card.NewVal, $cardFont, $bShadow, $drawRecShadow, $sf)
    $gBanner.DrawString([string]$card.NewVal, $cardFont, $bText, $drawRecText, $sf)
    
    $cardFont.Dispose()
    $bShadow.Dispose()
    $bText.Dispose()
}

$gBanner.Dispose()
$bmpBanner.Save($bannerDest, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmpBanner.Dispose()
$ms.Dispose()
Write-Output "Top Banner saved."

# =========================================================================
# 2. COMBO PAGES 1 TO 5
# =========================================================================
$pages = @(
    @{ Id = 1; SpecialY = 1050; Ribbon = "(4K)";  Cancel = "6000"; Main = "4000"; MainFont = 50; CancelFont = 35; RibbonFont = 38; RibbonY = 232; RibbonH = 72 },
    @{ Id = 2; SpecialY = 1249; Ribbon = "(6K)";  Cancel = "9000"; Main = "6000"; MainFont = 50; CancelFont = 35; RibbonFont = 38; RibbonY = 244; RibbonH = 72 },
    @{ Id = 3; SpecialY = 1079; Ribbon = "(4K)";  Cancel = "6000"; Main = "4000"; MainFont = 50; CancelFont = 35; RibbonFont = 38; RibbonY = 296; RibbonH = 72 },
    @{ Id = 4; SpecialY = 1128; Ribbon = "(6K)";  Cancel = "9000"; Main = "6000"; MainFont = 50; CancelFont = 35; RibbonFont = 38; RibbonY = 248; RibbonH = 72 },
    @{ Id = 5; SpecialY = 1284; Ribbon = "(12K)"; Cancel = "17000"; Main = "12000"; MainFont = 44; CancelFont = 32; RibbonFont = 36; RibbonY = 244; RibbonH = 78 }
)

foreach ($p in $pages) {
    $src = Join-Path $assetsDir ("combo_page_" + $p.Id + "_backup.png")
    $dst = Join-Path $assetsDir ("combo_page_" + $p.Id + ".png")
    Write-Output "Processing combo_page_$($p.Id).png..."

    $pBytes = [System.IO.File]::ReadAllBytes($src)
    $pMs = New-Object System.IO.MemoryStream(@(,$pBytes))
    $bmp = [System.Drawing.Bitmap]::FromStream($pMs)

    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

    # A. Top Ribbon (345, RibbonY, 210, RibbonH)
    $ribRect = New-Object System.Drawing.Rectangle(345, [int]$p.RibbonY, 210, [int]$p.RibbonH)
    $ribTop = [System.Drawing.Color]::FromArgb(255, 188, 10, 50)
    $ribBot = [System.Drawing.Color]::FromArgb(255, 128, 4, 29)
    $ribBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($ribRect, $ribTop, $ribBot, [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
    $g.FillRectangle($ribBrush, $ribRect)
    $ribBrush.Dispose()

    $rFont = New-Object System.Drawing.Font("Arial Black", [float]$p.RibbonFont, [System.Drawing.FontStyle]::Bold)
    $ribShadow = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(180, 0, 0, 0))
    $ribWhite = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $g.DrawString($p.Ribbon, $rFont, $ribShadow, (New-Object System.Drawing.RectangleF(345, ([int]$p.RibbonY + 6), 210, ([int]$p.RibbonH - 4))), $sf)
    $g.DrawString($p.Ribbon, $rFont, $ribWhite, (New-Object System.Drawing.RectangleF(345, ([int]$p.RibbonY + 3), 210, ([int]$p.RibbonH - 4))), $sf)
    $ribShadow.Dispose()
    $ribWhite.Dispose()
    $rFont.Dispose()

    # B. Bottom Marquee
    $sY = [int]$p.SpecialY

    # Rounded inner marquee fill
    $mRect = New-Object System.Drawing.Rectangle(258, ($sY + 34), 384, 180)
    $mPath = Get-RoundedRectPath $mRect 20
    $mTop = [System.Drawing.Color]::FromArgb(255, 2, 28, 10)
    $mBot = [System.Drawing.Color]::FromArgb(255, 0, 8, 2)
    $mBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($mRect, $mTop, $mBot, [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
    $g.FillPath($mBrush, $mPath)
    $mBrush.Dispose()
    $mPath.Dispose()

    # Cancelled price
    $cFont = New-Object System.Drawing.Font("Arial", [float]$p.CancelFont, [System.Drawing.FontStyle]::Bold)
    $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $cancelRect = New-Object System.Drawing.RectangleF(258, ($sY + 38), 384, 50)
    $g.DrawString([char]0x20B9 + $p.Cancel + "/-", $cFont, $whiteBrush, $cancelRect, $sf)
    $whiteBrush.Dispose()
    $cFont.Dispose()

    # Red strike line
    $redPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 235, 30, 30), 4.5)
    $g.DrawLine($redPen, 320, ($sY + 72), 580, ($sY + 47))
    $redPen.Dispose()

    # Main Special Price
    $mFont = New-Object System.Drawing.Font("Arial Black", [float]$p.MainFont, [System.Drawing.FontStyle]::Bold)
    $goldRect = New-Object System.Drawing.Rectangle(258, ($sY + 88), 384, 120)
    $goldTop = [System.Drawing.Color]::FromArgb(255, 255, 230, 65)
    $goldBot = [System.Drawing.Color]::FromArgb(255, 232, 138, 0)
    $goldBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($goldRect, $goldTop, $goldBot, [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
    $sh1 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 90, 45, 0))
    $sh2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 0, 0, 0))

    $mainRecF = New-Object System.Drawing.RectangleF(258, ($sY + 97), 384, 105)
    $mainRecF1 = New-Object System.Drawing.RectangleF(258, ($sY + 94), 384, 105)
    $mainRecF2 = New-Object System.Drawing.RectangleF(258, ($sY + 90), 384, 105)

    $g.DrawString([char]0x20B9 + $p.Main + "/-", $mFont, $sh2, $mainRecF, $sf)
    $g.DrawString([char]0x20B9 + $p.Main + "/-", $mFont, $sh1, $mainRecF1, $sf)
    $g.DrawString([char]0x20B9 + $p.Main + "/-", $mFont, $goldBrush, $mainRecF2, $sf)

    $goldBrush.Dispose()
    $sh1.Dispose()
    $sh2.Dispose()
    $mFont.Dispose()

    $g.Dispose()

    $bmp.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    $pMs.Dispose()
    Write-Output "Saved $dst."
}

Write-Output "ALL ASSETS SUCCESSFULLY GENERATED!"
