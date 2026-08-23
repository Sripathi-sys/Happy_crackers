Add-Type -AssemblyName System.Runtime.WindowsRuntime

$asTaskGeneric = ([System.WindowsRuntimeSystemExtensions].GetMethods() | 
    Where-Object { 
        $_.Name -eq 'AsTask' -and 
        $_.GetParameters().Count -eq 1 -and 
        $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' 
    })[0]

$asTaskAction = [System.WindowsRuntimeSystemExtensions].GetMethod('AsTask', [Type[]]@([Windows.Foundation.IAsyncAction]))

function Await-Operation($WinRtTask, $ResultType) {
    $asTask = $asTaskGeneric.MakeGenericMethod($ResultType)
    $netTask = $asTask.Invoke($null, @($WinRtTask))
    $netTask.Wait(-1) | Out-Null
    return $netTask.Result
}

function Await-Action($WinRtAction) {
    $netTask = $asTaskAction.Invoke($null, @($WinRtAction))
    $netTask.Wait(-1) | Out-Null
}

# Load native WinRT Assemblies
[void][Windows.Storage.StorageFile, Windows.Storage, ContentType=WindowsRuntime]
[void][Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType=WindowsRuntime]
[void][Windows.Storage.StorageFolder, Windows.Storage, ContentType=WindowsRuntime]
[void][Windows.Storage.CreationCollisionOption, Windows.Storage, ContentType=WindowsRuntime]
[void][Windows.Storage.FileAccessMode, Windows.Storage, ContentType=WindowsRuntime]
[void][Windows.Storage.Streams.IRandomAccessStream, Windows.Storage, ContentType=WindowsRuntime]

# Define PDF and output folder
$pdfPath = Join-Path (Get-Location) "Happy_Enjoy_Crackers_Family_Combo_List.pdf"
$outDir = Join-Path (Get-Location) "assets\images"

Write-Output "PDF Path: $pdfPath"
Write-Output "Output Dir: $outDir"

if (-not (Test-Path $pdfPath)) {
    Write-Error "PDF file not found!"
    exit 1
}

if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir | Out-Null
}

try {
    # 1. Load the PDF as StorageFile
    Write-Output "Loading PDF StorageFile..."
    $storageFile = Await-Operation ([Windows.Storage.StorageFile]::GetFileFromPathAsync($pdfPath)) ([Windows.Storage.StorageFile])

    # 2. Open PDF Document
    Write-Output "Loading PDF Document..."
    $pdfDoc = Await-Operation ([Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($storageFile)) ([Windows.Data.Pdf.PdfDocument])
    Write-Output "PDF loaded. Page count: $($pdfDoc.PageCount)"

    # Get output StorageFolder
    $outputFolder = Await-Operation ([Windows.Storage.StorageFolder]::GetFolderFromPathAsync($outDir)) ([Windows.Storage.StorageFolder])

    # Export pages 1 to 5 (indices 0 to 4)
    $pages = @(0, 1, 2, 3, 4)

    foreach ($pIdx in $pages) {
        if ($pIdx -lt $pdfDoc.PageCount) {
            $pageNumber = $pIdx + 1
            $imgName = "combo_page_$pageNumber.png"
            Write-Output "Rendering page $pageNumber to $imgName..."

            # Get Page
            $page = $pdfDoc.GetPage($pIdx)

            # Create output file
            $outFileTask = $outputFolder.CreateFileAsync($imgName, [Windows.Storage.CreationCollisionOption]::ReplaceExisting)
            $outFile = Await-Operation $outFileTask ([Windows.Storage.StorageFile])

            # Open file stream
            $streamTask = $outFile.OpenAsync([Windows.Storage.FileAccessMode]::ReadWrite)
            $stream = Await-Operation $streamTask ([Windows.Storage.Streams.IRandomAccessStream])

            # Render to stream
            $renderTask = $page.RenderToStreamAsync($stream)
            Await-Action $renderTask

            # Flush and close stream
            $flushTask = $stream.FlushAsync()
            Await-Operation $flushTask ([System.Boolean]) | Out-Null
            
            $stream.Dispose()
            $page.Dispose()

            Write-Output "Saved $imgName successfully."
        }
    }
    
    Write-Output "All pages exported successfully!"
} catch {
    Write-Error "Error occurred: $_"
}
