# Favicon Generation Instructions

1. Visit [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Upload the profile image: brian_photo_google.jpg
3. Configure settings:
   - Favicon for iOS - Web Clip: 180x180px
   - Favicon for Android Chrome: 192x192px and 512x512px
   - Windows Metro: 150x150px
   - macOS Safari: 180x180px
   - Favicon Generator Options:
     - Path: /assets/images/icons
     - App name: Mickley Business Automation

4. Generate the package and for each site:
   - Place favicon.ico in site root
   - Place all other files in assets/images/icons/

## File Checklist for Each Site

### Root Directory
- favicon.ico

### assets/images/icons/
- android-chrome-192x192.png
- android-chrome-512x512.png
- apple-touch-icon.png
- favicon-16x16.png
- favicon-32x32.png
- favicon.ico (duplicate)
- site.webmanifest

## HTML Updates Required

Add to <head> section of each site's index.html:

```html
<link rel="apple-touch-icon" sizes="180x180" href="/assets/images/icons/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/images/icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/images/icons/favicon-16x16.png">
<link rel="manifest" href="/assets/images/icons/site.webmanifest">
```

## Sites to Update
1. microofficeautomation
2. mickleyofficeautomation
3. brianmickleyautomation
