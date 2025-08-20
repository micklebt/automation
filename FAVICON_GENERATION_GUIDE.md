# Favicon Generation Guide

## Source Image
Using: brian_photo_google.jpg

## Generation Steps

1. Visit [RealFaviconGenerator](https://realfavicongenerator.net/)

2. Upload Settings:
   - Upload the brian_photo_google.jpg file
   - Select "Maintain image ratio" for best results
   - Use "Crop the image" if needed to focus on face

3. Platform-Specific Settings:

### iOS Settings:
```
- Background: Transparent
- Margin: None
- App name: Mickley Business Automation
```

### Android Chrome:
```
- Theme color: #FF6B6B (matches site theme)
- Background: Transparent
- Margin: None
- App name: MBA
```

### Windows Metro:
```
- Background: #273043 (matches site dark blue)
- App name: Mickley Business Automation
```

### macOS Safari:
```
- Theme color: #FF6B6B
- Background: Transparent
```

### Favicon Generator Options:
```
- Path: /assets/images/icons
- App name: Mickley Business Automation
- App short name: MBA
- Color for Android: #FF6B6B
- Browser theme color: #273043
```

## File Placement for Each Site

1. Root Directory Files:
```
/favicon.ico
```

2. Icons Directory Files (/assets/images/icons/):
```
/android-chrome-192x192.png
/android-chrome-512x512.png
/apple-touch-icon.png
/favicon-16x16.png
/favicon-32x32.png
/favicon.ico (duplicate)
/site.webmanifest
```

## Implementation Checklist

For each site:
- [ ] microofficeautomation
  - [ ] Place files in correct directories
  - [ ] Update HTML head
  - [ ] Test in browsers
  - [ ] Verify mobile display

- [ ] mickleyofficeautomation
  - [ ] Place files in correct directories
  - [ ] Update HTML head
  - [ ] Test in browsers
  - [ ] Verify mobile display

- [ ] brianmickleyautomation
  - [ ] Place files in correct directories
  - [ ] Update HTML head
  - [ ] Test in browsers
  - [ ] Verify mobile display

## HTML Implementation

Add to each site's <head> section:

```html
<link rel="apple-touch-icon" sizes="180x180" href="/assets/images/icons/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/images/icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/images/icons/favicon-16x16.png">
<link rel="manifest" href="/assets/images/icons/site.webmanifest">
<meta name="theme-color" content="#273043">
```

## Testing

1. Browser Testing:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

2. Mobile Testing:
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] PWA installation

3. Validation:
- [ ] Check favicon.ico in root
- [ ] Verify manifest.json
- [ ] Test all icon sizes
- [ ] Validate HTML changes
