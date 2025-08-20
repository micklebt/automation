# Site testing script
$sites = @(
    "microofficeautomation",
    "mickleybusinessautomation",
    "brianmickleyautomation"
)

function Test-Images {
    param (
        [string]$sitePath
    )
    
    Write-Host "Checking images in $sitePath..."
    $images = Get-ChildItem "$sitePath/assets/images" -Recurse -Include *.jpg,*.png,*.gif
    
    foreach ($img in $images) {
        $size = [math]::Round($img.Length / 1KB, 2)
        Write-Host "$($img.Name) - $size KB"
        
        if ($size -gt 500) {
            Write-Warning "Image $($img.Name) is larger than 500KB!"
        }
    }
}

function Test-HTML {
    param (
        [string]$sitePath
    )
    
    Write-Host "Validating HTML in $sitePath..."
    if (Test-Path "$sitePath/index.html") {
        # Add your HTML validation logic here
        Write-Host "HTML file exists"
        
        # Check for common issues
        $content = Get-Content "$sitePath/index.html" -Raw
        if ($content -match "src=`".*?`"") {
            Write-Host "Checking image paths..."
            $matches[0] | ForEach-Object {
                Write-Host "Found image path: $_"
            }
        }
    } else {
        Write-Error "index.html not found in $sitePath"
    }
}

function Test-Structure {
    param (
        [string]$sitePath
    )
    
    Write-Host "Checking directory structure in $sitePath..."
    $requiredDirs = @(
        "assets/images/animations",
        "assets/images/content",
        "assets/images/icons"
    )
    
    foreach ($dir in $requiredDirs) {
        $fullPath = Join-Path $sitePath $dir
        if (Test-Path $fullPath) {
            Write-Host "$dir exists"
        } else {
            Write-Error "$dir missing in $sitePath"
        }
    }
}

# Main testing loop
foreach ($site in $sites) {
    Write-Host "`n=== Testing $site ===`n" -ForegroundColor Green
    
    # Run all tests
    Test-Structure -sitePath $site
    Test-HTML -sitePath $site
    Test-Images -sitePath $site
    
    Write-Host "`nCompleted testing $site`n" -ForegroundColor Green
}

Write-Host "All tests complete!" -ForegroundColor Green
