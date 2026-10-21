# Exhaustive Platform & Content Auditor for Full-Stack Interview Preparation Book
$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   EXHAUSTIVE PLATFORM & CONTENT AUDIT" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$chapters = Get-ChildItem -Path "chapters" -Filter "*.html" | Sort-Object Name
Write-Host "Total chapter files detected on disk: $($chapters.Count)" -ForegroundColor Yellow

if ($chapters.Count -ne 45) {
    Write-Error "CRITICAL: Expected 45 chapter files, but found $($chapters.Count)"
}

$requiredCss = @(
    "../assets/css/theme.css",
    "../assets/css/code.css",
    "../assets/css/main.css",
    "../assets/css/print.css"
)

$requiredJs = @(
    "../assets/js/book-data.js",
    "../assets/js/theme.js",
    "../assets/js/progress.js",
    "../assets/js/prism.js",
    "../assets/js/search.js",
    "../assets/js/chapter.js"
)

$requiredElements = @(
    'id="chapter-toc"',
    'id="prev-next-nav"',
    'id="book-sidebar"',
    'class="search-trigger"',
    'class="theme-toggle"',
    'id="btn-toggle-complete"',
    'id="btn-toggle-bookmark"',
    'id="chapter-reading-time"'
)

$totalQuestions = 0
$totalSpokenAnswers = 0
$totalExercises = 0
$totalSolutions = 0
$brokenAssetTotal = 0
$structuralErrors = 0

$auditResults = @()

for ($i = 1; $i -le 45; $i++) {
    $expectedSlugPrefix = "ch{0:D2}" -f $i
    $chFile = $chapters | Where-Object { $_.Name.StartsWith($expectedSlugPrefix) } | Select-Object -First 1

    if (-not $chFile) {
        Write-Host "MISSING CHAPTER: Chapter $i matching prefix $expectedSlugPrefix" -ForegroundColor Red
        $structuralErrors++
        continue
    }

    $content = Get-Content $chFile.FullName -Raw

    # 1. Verify Body Data Chapter ID
    $bodyMatch = [regex]::Match($content, '<body\s+[^>]*data-chapter-id="(\d+)"')
    $dataId = if ($bodyMatch.Success) { [int]$bodyMatch.Groups[1].Value } else { -1 }
    $idValid = ($dataId -eq $i)
    if (-not $idValid) {
        Write-Host "[$($chFile.Name)] MISMATCH: data-chapter-id is '$dataId', expected '$i'" -ForegroundColor Red
        $structuralErrors++
    }

    # 2. Verify Required CSS
    $missingCss = @()
    foreach ($css in $requiredCss) {
        if (-not $content.Contains($css)) {
            $missingCss += $css
            $structuralErrors++
        }
    }

    # 3. Verify Required JS
    $missingJs = @()
    foreach ($js in $requiredJs) {
        if (-not $content.Contains($js)) {
            $missingJs += $js
            $structuralErrors++
        }
    }

    # 4. Verify Structural Elements
    $missingElements = @()
    foreach ($elem in $requiredElements) {
        if (-not ($content -match $elem)) {
            $missingElements += $elem
            $structuralErrors++
        }
    }

    # 5. Question and Spoken Answer Counts
    $qMatches = [regex]::Matches($content, 'class="qa-card')
    $qCount = $qMatches.Count
    $totalQuestions += $qCount

    $spokenMatches = [regex]::Matches($content, 'class="spoken-answer-box"')
    $spokenCount = $spokenMatches.Count
    $totalSpokenAnswers += $spokenCount

    $expectedQCount = if ($i -eq 1) { 16 } else { 20 }
    if ($qCount -ne $expectedQCount) {
        Write-Host "[$($chFile.Name)] QUESTION COUNT MISMATCH: Found $qCount, expected $expectedQCount" -ForegroundColor Red
        $structuralErrors++
    }

    if ($spokenCount -ne $qCount) {
        Write-Host "[$($chFile.Name)] SPOKEN ANSWER MISMATCH: $spokenCount spoken boxes for $qCount questions!" -ForegroundColor Red
        $structuralErrors++
    }

    # 6. Exercises and Solutions
    $exMatches = [regex]::Matches($content, 'class="exercise-card"')
    $solMatches = [regex]::Matches($content, 'class="exercise-solution"')
    $totalExercises += $exMatches.Count
    $totalSolutions += $solMatches.Count

    # 7. Broken Asset Links
    $assetPattern = '(?:href|src)="([^"#:]+)"'
    $assetMatches = [regex]::Matches($content, $assetPattern)
    $chBrokenAssets = 0
    foreach ($m in $assetMatches) {
        $relPath = $m.Groups[1].Value
        if ($relPath.EndsWith('.html') -or $relPath.EndsWith('.css') -or $relPath.EndsWith('.js')) {
            $resolvedPath = Join-Path "chapters" $relPath
            if (-not (Test-Path $resolvedPath)) {
                $chBrokenAssets++
                $brokenAssetTotal++
                Write-Host "[$($chFile.Name)] Broken link: $relPath (resolved: $resolvedPath)" -ForegroundColor Red
            }
        }
    }

    $auditResults += [PSCustomObject]@{
        Chapter = $i
        Filename = $chFile.Name
        DataId = $dataId
        Questions = $qCount
        SpokenAnswers = $spokenCount
        Exercises = $exMatches.Count
        Solutions = $solMatches.Count
        BrokenAssets = $chBrokenAssets
        Status = if ($idValid -and ($missingCss.Count -eq 0) -and ($missingJs.Count -eq 0) -and ($missingElements.Count -eq 0) -and ($qCount -eq $expectedQCount) -and ($spokenCount -eq $qCount) -and ($chBrokenAssets -eq 0)) { "PASS" } else { "FAIL" }
    }
}

Write-Host "`nAUDIT SUMMARY TABLE:" -ForegroundColor Cyan
$auditResults | Format-Table Chapter, Filename, Questions, SpokenAnswers, Exercises, Solutions, BrokenAssets, Status -AutoSize

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Total Verified Chapters: $($chapters.Count)" -ForegroundColor Green
Write-Host "Total Verified Questions: $totalQuestions" -ForegroundColor Green
Write-Host "Total Verified Spoken Answer Callouts: $totalSpokenAnswers" -ForegroundColor Green
Write-Host "Total Exercises: $totalExercises" -ForegroundColor Green
Write-Host "Total Solutions: $totalSolutions" -ForegroundColor Green
Write-Host "Total Broken Asset Links: $brokenAssetTotal" -ForegroundColor $(if ($brokenAssetTotal -eq 0) { "Green" } else { "Red" })
Write-Host "Total Structural Defects: $structuralErrors" -ForegroundColor $(if ($structuralErrors -eq 0) { "Green" } else { "Red" })
Write-Host "==========================================================" -ForegroundColor Cyan

if ($structuralErrors -eq 0 -and $brokenAssetTotal -eq 0) {
    Write-Host "🎉 ALL 45 CHAPTERS PASSED COMPREHENSIVE AUDIT WITH ZERO ERRORS!" -ForegroundColor Green
} else {
    Write-Host "⚠️ AUDIT DETECTED DEFECTS! Review log above." -ForegroundColor Red
}

