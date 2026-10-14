$workspace = "c:\Users\acer\Downloads\happyenjoycrackers\happyenjoycrackers"
$htmlPath = Join-Path $workspace "wholesale_giftbox_price_list.html"
$pdfOut = Join-Path $workspace "wholesale_giftbox_rate_card.pdf"
$pngOut = Join-Path $workspace "wholesale_giftbox_rate_card.png"

$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}
$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chromePath)) {
    $chromePath = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
}

$browser = $null
if (Test-Path $edgePath) {
    $browser = $edgePath
} elseif (Test-Path $chromePath) {
    $browser = $chromePath
}

if ($browser) {
    Write-Output "Using browser: $browser"
    
    # 1. Generate PDF
    Write-Output "Generating PDF: $pdfOut"
    & $browser --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="$pdfOut" "file:///$($htmlPath.Replace('\', '/'))"
    
    # 2. Generate PNG Screenshot
    Write-Output "Generating PNG: $pngOut"
    & $browser --headless --disable-gpu --screenshot="$pngOut" --window-size=1000,1350 --hide-scrollbars "file:///$($htmlPath.Replace('\', '/'))"
    
    Start-Sleep -Seconds 2
    if ((Test-Path $pdfOut) -and (Test-Path $pngOut)) {
        Write-Output "SUCCESS: Both PDF and Image generated successfully!"
        exit 0
    }
}

Write-Output "Browser CLI not available or fallback needed."
