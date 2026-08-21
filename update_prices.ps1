# PowerShell script to update products.json based on pdf_prices.json lookup with correct UTF-8 encoding
$workspace = "c:\Users\acer\Downloads\happyenjoycrackers\happyenjoycrackers"
$productsPath = Join-Path $workspace "products.json"
$pricesPath = Join-Path $workspace "pdf_prices.json"

Write-Output "Loading files..."
$products = Get-Content -Raw -Encoding UTF8 -Path $productsPath | ConvertFrom-Json
$prices = Get-Content -Raw -Encoding UTF8 -Path $pricesPath | ConvertFrom-Json

Write-Output "Updating prices..."
$updatedCount = 0

foreach ($category in $products) {
    foreach ($product in $category.products) {
        $sno = $product.sno.ToString()
        
        # Check if the S.No is in our PDF price list
        if ($prices.PSObject.Properties[$sno]) {
            $name = $product.name
            
            # Exclude non-PDF duplicate products
            if ($sno -eq "71" -or $sno -eq "72" -or $sno -eq "73") {
                if ($name -eq "RACING CAR (2 PCS)" -or $name -eq "GITOR WATER QUEEN" -or $name -eq "ALERT LAR") {
                    continue
                }
            }
            if ($sno -eq "164" -and $name -eq "50 CM GREEN") {
                continue
            }

            # Get the pricing array
            $priceData = $prices.$sno
            $regPrice = [double]$priceData[0]
            $salesPrice = [double]$priceData[1]

            # Update the prices
            $product.regular_price = $regPrice
            $product.sales_price = $salesPrice
            $updatedCount++
        }
    }
}

Write-Output "Successfully updated $updatedCount products."

# Write back to products.json
Write-Output "Saving products.json..."
# Convert back to JSON with depth 5 (nested structure) and save with UTF-8 (No BOM)
$newJson = $products | ConvertTo-Json -Depth 5
$utf8NoBOM = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($productsPath, $newJson, $utf8NoBOM)

Write-Output "Done!"
