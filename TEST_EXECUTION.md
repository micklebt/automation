# Test Execution Guide

## 1. Local Testing Commands

### Check HTML Validity
```powershell
# Install html5validator if not present
pip install html5validator

# Validate HTML files
html5validator microofficeautomation/index.html
html5validator mickleyofficeautomation/index.html
html5validator brianmickleyautomation/index.html
```

### Image Optimization Check
```powershell
# Check image sizes and formats
Get-ChildItem -Recurse -Include *.jpg,*.png,*.gif | 
    Select-Object Name, Length, Directory |
    Sort-Object Length -Descending |
    Format-Table -AutoSize
```

### Link Verification
```powershell
# Install link-checker if not present
npm install -g link-checker

# Check all links
link-checker microofficeautomation/index.html
link-checker mickleyofficeautomation/index.html
link-checker brianmickleyautomation/index.html
```

## 2. Browser Testing

### Chrome DevTools Commands
1. Open DevTools (F12)
2. Run these in Console:
```javascript
// Check for broken images
$$('img').forEach(img => {
    if (!img.complete || img.naturalHeight === 0) {
        console.error('Broken image:', img.src);
    }
});

// Check for console errors
if (window.console && console.error) {
    console.error = (function(old) {
        return function(error) {
            console.log('Error caught:', error);
            old.apply(this, arguments);
        };
    })(console.error);
}

// Check page load time
window.addEventListener('load', function() {
    console.log('Page load time:', performance.now() + 'ms');
});
```

## 3. Responsive Testing

### Viewport Sizes to Test
```javascript
// Mobile
375 x 667 (iPhone SE)
390 x 844 (iPhone 12 Pro)
412 x 915 (Pixel 6)

// Tablet
768 x 1024 (iPad Mini)
820 x 1180 (iPad Air)

// Desktop
1366 x 768 (Laptop)
1920 x 1080 (Desktop)
2560 x 1440 (Large Desktop)
```

## 4. Performance Testing

### Lighthouse CLI Commands
```powershell
# Install Lighthouse
npm install -g lighthouse

# Run tests
lighthouse https://microofficeautomation.com --output json --output html --output-path=./micro-report
lighthouse https://mickleybusinessautomation.com --output json --output html --output-path=./mickley-report
lighthouse https://brianmickleyautomation.com --output json --output html --output-path=./brian-report
```

## 5. Security Testing

### SSL Check
```powershell
# Check SSL configuration
Invoke-WebRequest -Uri https://microofficeautomation.com
Invoke-WebRequest -Uri https://mickleybusinessautomation.com
Invoke-WebRequest -Uri https://brianmickleyautomation.com
```

### Headers Check
```powershell
# Check security headers
curl -I https://microofficeautomation.com
curl -I https://mickleybusinessautomation.com
curl -I https://brianmickleyautomation.com
```

## 6. Test Results Documentation

### Create Test Report
```markdown
# Test Results [Date]

## Site: [Site Name]

### HTML Validation
- [ ] Passed
- [ ] Issues found: [List issues]

### Image Tests
- [ ] All loading
- [ ] Properly optimized
- [ ] Responsive behavior correct

### Performance
- [ ] Load time: [Time]
- [ ] Lighthouse score: [Score]
- [ ] Mobile score: [Score]

### Security
- [ ] SSL valid
- [ ] Headers correct
- [ ] No exposed data

### Issues Found
1. [Issue description]
2. [Issue description]

### Recommendations
1. [Recommendation]
2. [Recommendation]
```

## 7. Automated Testing Script

Save this as `run-tests.ps1`:
```powershell
# Site testing script
$sites = @(
    "microofficeautomation",
    "mickleybusinessautomation",
    "brianmickleyautomation"
)

foreach ($site in $sites) {
    Write-Host "Testing $site..."
    
    # Validate HTML
    html5validator "$site/index.html"
    
    # Check images
    Get-ChildItem "$site/assets/images" -Recurse |
        Where-Object { $_.Extension -match "jpg|png|gif" } |
        ForEach-Object {
            Write-Host "Checking $($_.Name)..."
            # Add image checks here
        }
    
    # Test links
    link-checker "$site/index.html"
}

Write-Host "Tests complete!"
```
