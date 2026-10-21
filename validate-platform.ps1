$chapters = Get-ChildItem -Path 'chapters' -Filter '*.html'
Write-Host "Total chapter files found: $($chapters.Count)"

$pattern = '(?:href|src)="([^"#:]+)"'
foreach ($ch in $chapters) {
    $content = Get-Content $ch.FullName -Raw
    $matchesCh = [regex]::Matches($content, $pattern)
    $brokenCount = 0
    foreach ($m in $matchesCh) {
        $path = $m.Groups[1].Value
        if ($path.EndsWith('.html') -or $path.EndsWith('.css') -or $path.EndsWith('.js')) {
            $fullPath = Join-Path 'chapters' $path
            if (-not (Test-Path $fullPath)) {
                $brokenCount++
                Write-Host "  Broken asset in $($ch.Name): $path (resolved: $fullPath)"
            }
        }
    }
    $qMatches = [regex]::Matches($content, 'class="qa-card')
    Write-Host "$($ch.Name): $($qMatches.Count) Interview Questions | Broken Assets: $brokenCount"
}

