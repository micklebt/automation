# Site Testing Plan

## 1. Image Loading Tests
- [ ] Load each site's index.html in multiple browsers
- [ ] Verify all images load correctly
- [ ] Check image paths in browser dev tools
- [ ] Test responsive image scaling
- [ ] Verify image alt text is present

### Test for each site:
```bash
microofficeautomation/
- [ ] after_image.png
- [ ] brian_google_photo.gif
- [ ] stressed_manager.png
- [ ] logo-placeholder.png

mickleyofficeautomation/
- [ ] logo-placeholder.png
- [ ] All images in content directory

brianmickleyautomation/
- [ ] logo-placeholder.png
- [ ] All images in content directory
```

## 2. Favicon Tests
- [ ] Verify favicon appears in browser tab
- [ ] Check favicon in bookmarks
- [ ] Test apple-touch-icon on iOS device
- [ ] Verify Android chrome icon
- [ ] Check Windows tile icon

## 3. Directory Structure Verification
```bash
Each site should have:
- [ ] assets/images/animations/
- [ ] assets/images/content/
- [ ] assets/images/icons/
- [ ] favicon.ico in root
```

## 4. HTML Validation
- [ ] Run W3C validation on each site
- [ ] Check for broken image links
- [ ] Verify all image paths are relative
- [ ] Confirm no 404 errors in console

## 5. Responsive Testing
### Test on devices:
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

### Check for:
- [ ] Image scaling
- [ ] No horizontal scrolling
- [ ] Image aspect ratios
- [ ] Loading performance

## 6. Performance Testing
- [ ] Check image load times
- [ ] Verify image compression
- [ ] Test page load speed
- [ ] Check browser memory usage

## 7. Cleanup Verification
After old directories removal:
- [ ] Verify no broken links
- [ ] Check git status for untracked files
- [ ] Confirm no duplicate images
- [ ] Test all functionality again

## Test Environments
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Chrome
- [ ] Mobile Safari

## Post-Deployment Tests
- [ ] Verify live URLs
- [ ] Check SSL certificates
- [ ] Test all external links
- [ ] Verify analytics tracking
- [ ] Check server logs for errors

## Documentation
- [ ] Update image path documentation
- [ ] Document favicon implementation
- [ ] Record any issues found
- [ ] Note performance metrics
- [ ] Document test results
