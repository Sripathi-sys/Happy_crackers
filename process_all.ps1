Add-Type -AssemblyName System.Drawing

$workspace = "c:\Users\acer\Downloads\happyenjoycrackers\happyenjoycrackers"
$assetsDir = Join-Path $workspace "assets\images"
$userBanner = "C:\Users\acer\.gemini\antigravity-ide\brain\aeceda19-ae5e-4d86-878d-0872f91f2190\.user_uploaded\media_1789027948046.jpg"

# 1. Create clean backups if not already present
for ($i = 1; $i -le 5; $i++) {
    $orig = Join-Path $assetsDir "combo_page_$i.png"
    $bak = Join-Path $assetsDir "combo_page_${i}_backup.png"
    if ((Test-Path $orig) -and (-not (Test-Path $bak))) {
        Copy-Item $orig $bak -Force
        Write-Output "Backed up combo_page_$i.png"
    }
}

# =========================================================================
# 2. PROCESS BANNER (combo_banner.jpg)
# =========================================================================
Write-Output "Processing Top Banner..."
$bannerDest = Join-Path $assetsDir "combo_banner.jpg"
Copy-Item $userBanner $bannerDest -Force

$bmpBanner = [System.Drawing.Bitmap]::FromFile($bannerDest)
$gBanner = [System.Drawing.Graphics]::FromImage($bmpBanner)
$gBanner.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gBanner.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$gBanner.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

$bannerCards = @(
    @{ CenterX = 71;  NewVal = "4000"; BoxW = 96 },
    @{ CenterX = 192; NewVal = "6000"; BoxW = 96 },
    @{ CenterX = 315; NewVal = "4000"; BoxW = 96 },
    @{ CenterX = 436; NewVal = "6000"; BoxW = 96 },
    @{ CenterX = 558; NewVal = "12000"; BoxW = 106 }
)

$bFont = New-Object System.Drawing.Font("Impact", 28, [System.Drawing.FontStyle]::Regular)
$bSf = New-Object System.Drawing.StringFormat
$bSf.Alignment = [System.Drawing.StringAlignment]::Center
$bSf.LineAlignment = [System.Drawing.StringAlignment]::Center

foreach ($card in $bannerCards) {
    $rectY = 422
    $rectH = 41
    $rectX = [int]($card.CenterX - ($card.BoxW / 2))
    $fillRec = New-Object System.Drawing.Rectangle($rectX, $rectY, [int]$card.BoxW, $rectH)
    
    # Sample gradient from top and bottom of fill area
    $colTop = $bmpBanner.GetPixel($card.CenterX, 420)
    $colBot = $bmpBanner.GetPixel($card.CenterX, 465)
    
    $gradBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($fillRec, $colTop, $colBot, [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
    $gBanner.FillRectangle($gradBrush, $fillRec)
    $gradBrush.Dispose()

    # Draw new price: shadow + text
    $bShadow = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(230, 0, 0, 0))
    $bText = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 248, 192, 24))
    
    $drawRecShadow = New-Object System.Drawing.RectangleF([float]($card.CenterX - 55), [float]424, [float]110, [float]40)
    $drawRecText = New-Object System.Drawing.RectangleF([float]($card.CenterX - 55), [float]421, [float]110, [float]40)
    
    $gBanner.DrawString([string]$card.NewVal, $bFont, $bShadow, $drawRecShadow, $bSf)
    $gBanner.DrawString([string]$card.NewVal, $bFont, $bText, $drawRecText, $bSf)
    
    $bShadow.Dispose()
    $bText.Dispose()
}

$gBanner.Dispose()
$bmpBanner.Save($bannerDest, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmpBanner.Dispose()
Write-Output "Top Banner updated successfully."

# =========================================================================
# 3. PROCESS COMBO PAGES 1 TO 5
# =========================================================================
$pageConfigs = @(
    @{ Id = 1; Ribbon = "(4K)";  Cancel = "6000"; Main = "4000" },
    @{ Id = 2; Ribbon = "(6K)";  Cancel = "9000"; Main = "6000" },
    @{ Id = 3; Ribbon = "(4K)";  Cancel = "6000"; Main = "4000" },
    @{ Id = 4; Ribbon = "(6K)";  Cancel = "9000"; Main = "6000" },
    @{ Id = 5; Ribbon = "(12K)"; Cancel = "17000"; Main = "12000" }
)

$rupee = [char]0x20B9
$ribbonFont = New-Object System.Drawing.Font("Arial Black", 38, [System.Drawing.FontStyle]::Bold)
$cancelFont = New-Object System.Drawing.Font("Arial", 36, [System.Drawing.FontStyle]::Bold)
$mainFont = New-Object System.Drawing.Font("Arial Black", 52, [System.Drawing.FontStyle]::Bold)

$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = [System.Drawing.StringAlignment]::Center
$sf.LineAlignment = [System.Drawing.StringAlignment]::Center

foreach ($cfg in $pageConfigs) {
    $srcFile = Join-Path $assetsDir ("combo_page_" + $cfg.Id + "_backup.png")
    $dstFile = Join-Path $assetsDir ("combo_page_" + $cfg.Id + ".png")
    Write-Output "Processing combo_page_$($cfg.Id).png from backup..."
    
    $bmp = [System.Drawing.Bitmap]::FromFile($srcFile)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

    # A. Top Ribbon (4K / 6K / 12K)
    $ribbonRect = New-Object System.Drawing.Rectangle(350, 230, 200, 56)
    $ribbonTop = [System.Drawing.Color]::FromArgb(255, 172, 8, 45)
    $ribbonBot = [System.Drawing.Color]::FromArgb(255, 126, 4, 30)
    $ribbonBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($ribbonRect, $ribbonTop, $ribbonBot, [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
    $g.FillRectangle($ribbonBrush, $ribbonRect)
    $ribbonBrush.Dispose()

    $ribbonShadow = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(180, 0, 0, 0))
    $ribbonWhite = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $g.DrawString($cfg.Ribbon, $ribbonFont, $ribbonShadow, (New-Object System.Drawing.RectangleF(345, 230, 210, 58)), $sf)
    $g.DrawString($cfg.Ribbon, $ribbonFont, $ribbonWhite, (New-Object System.Drawing.RectangleF(345, 227, 210, 58)), $sf)
    $ribbonShadow.Dispose()
    $ribbonWhite.Dispose()

    # B. Marquee Box
    $marqueeRect = New-Object System.Drawing.Rectangle(250, 1065, 400, 192)
    $marqueeTop = [System.Drawing.Color]::FromArgb(255, 2, 28, 12)
    $marqueeBot = [System.Drawing.Color]::FromArgb(255, 1, 20, 8)
    $marqueeBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($marqueeRect, $marqueeTop, $marqueeBot, [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
    $g.FillRectangle($marqueeBrush, $marqueeRect)
    $marqueeBrush.Dispose()

    # Cancelled Price
    $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $cancelText = "$rupee" + $cfg.Cancel + "/-"
    $cancelRect = New-Object System.Drawing.RectangleF(250, 1070, 400, 50)
    $g.DrawString($cancelText, $cancelFont, $whiteBrush, $cancelRect, $sf)
    $whiteBrush.Dispose()

    # Red Strikethrough line
    $redPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 235, 30, 30), 4.5)
    $g.DrawLine($redPen, 310, 1108, 590, 1080)
    $redPen.Dispose()

    # Main Special Price
    $mainText = "$rupee" + $cfg.Main + "/-"
    $gradRect = New-Object System.Drawing.Rectangle(250, 1130, 400, 120)
    $goldTop = [System.Drawing.Color]::FromArgb(255, 255, 230, 55)
    $goldBottom = [System.Drawing.Color]::FromArgb(255, 235, 140, 0)
    $goldBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($gradRect, $goldTop, $goldBottom, [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)

    $shadow1 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 90, 45, 0))
    $shadow2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(180, 0, 0, 0))

    $g.DrawString($mainText, $mainFont, $shadow2, (New-Object System.Drawing.RectangleF(250, 1140, 400, 115)), $sf)
    $g.DrawString($mainText, $mainFont, $shadow1, (New-Object System.Drawing.RectangleF(250, 1137, 400, 115)), $sf)
    $g.DrawString($mainText, $mainFont, $goldBrush, (New-Object System.Drawing.RectangleF(250, 1132, 400, 115)), $sf)

    $goldBrush.Dispose()
    $shadow1.Dispose()
    $shadow2.Dispose()

    $g.Dispose()
    $bmp.Save($dstFile, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Output "Saved $dstFile successfully."
}

Write-Output "ALL IMAGES SUCCESSFULLY UPDATED!"
