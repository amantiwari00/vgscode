$files = Get-ChildItem -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $content = $content -replace '(?s)<img[^>]*src="data:image/png;base64,[^"]*"[^>]*>', '<img src="vgs_logo.png" alt="VGS Geotechnical Services Logo" class="logo-img">'
    Set-Content $file.FullName $content
}
