$origContent = Get-Content original_index.html -Raw
if ($origContent -match '(?s)(<img[^>]*src="data:image/[^>]*>)') {
    $base64Tag = $matches[1]
    Write-Host "Found tag of length $($base64Tag.Length)"
    
    $files = Get-ChildItem -Filter *.html | Where-Object { $_.Name -ne 'original_index.html' }
    foreach ($file in $files) {
        $content = Get-Content $file.FullName -Raw
        $content = $content -replace '<img src="vgs_logo\.png" alt="VGS Geotechnical Services Logo" class="logo-img">', $base64Tag
        Set-Content $file.FullName $content
        Write-Host "Updated $($file.Name)"
    }
} else {
    Write-Host "Could not find base64 tag in original_index.html"
}
