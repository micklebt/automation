# Media File Structure

```
mickleybusinesautomation/
│
├── index.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
│
├── assets/
│   ├── images/
│   │   ├── animations/
│   │   │   └── gear_assembly_slow.gif
│   │   ├── content/
│   │   │   ├── stressed_manager.png
│   │   │   └── workflow_design.png
│   │   └── icons/
│   │       ├── favicon.ico
│   │       ├── favicon-16x16.png
│   │       ├── favicon-32x32.png
│   │       ├── apple-touch-icon.png
│   │       ├── android-chrome-192x192.png
│   │       └── android-chrome-512x512.png
│   └── css/
│       └── styles.css (if we decide to separate styles)
│
└── DEPLOYMENT_CHECKLIST.md
```

## File Requirements

### Favicon Files
- `favicon.ico`: Multi-size icon file (16x16, 32x32)
- `favicon-16x16.png`: 16x16 pixels PNG
- `favicon-32x32.png`: 32x32 pixels PNG
- `apple-touch-icon.png`: 180x180 pixels PNG
- `android-chrome-192x192.png`: 192x192 pixels PNG
- `android-chrome-512x512.png`: 512x512 pixels PNG

### Content Images
- `gear_assembly_slow.gif`: Animation for header
- `stressed_manager.png`: Manager illustration
- `workflow_design.png`: Workflow diagram

## Important Notes

1. Root Level Files:
   - Keep favicon.ico in root for maximum compatibility
   - Other icon files can be in assets/images/icons/

2. Image Optimization:
   - All PNGs should be compressed
   - GIFs should be optimized for web
   - Consider WebP versions for modern browsers

3. Path Updates:
   - Update HTML to reflect new image paths
   - Ensure all image references use relative paths
