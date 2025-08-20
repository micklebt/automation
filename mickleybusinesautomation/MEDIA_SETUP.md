# Media Setup Instructions

## 1. Create Directory Structure
Manually create the following folders:
```
mickleybusinesautomation/
└── assets/
    └── images/
        ├── animations/
        ├── content/
        └── icons/
```

## 2. Move Existing Content Images
1. From `archives_backup_files/media/` copy:
   - `gear_assembly_slow.gif` → `assets/images/animations/`
   - `stressed_manager.png` → `assets/images/content/`
   - `workflow_design.png` → `assets/images/content/`

## 3. Create and Place Favicon Files
1. Visit [Favicon Generator](https://realfavicongenerator.net/)
2. Upload your profile photo
3. Generate all sizes
4. Place files in TWO locations:

   Root directory:
   - `favicon.ico`

   In `assets/images/icons/`:
   - `favicon.ico`
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `apple-touch-icon.png`
   - `android-chrome-192x192.png`
   - `android-chrome-512x512.png`

## 4. Verify File Structure
After setup, your media structure should look like this:
```
mickleybusinesautomation/
├── favicon.ico
├── assets/
│   └── images/
│       ├── animations/
│       │   └── gear_assembly_slow.gif
│       ├── content/
│       │   ├── stressed_manager.png
│       │   └── workflow_design.png
│       └── icons/
│           ├── favicon.ico
│           ├── favicon-16x16.png
│           ├── favicon-32x32.png
│           ├── apple-touch-icon.png
│           ├── android-chrome-192x192.png
│           └── android-chrome-512x512.png
```

## 5. Verify Image Paths
All image paths in index.html have been updated to use the new structure:
- Animations: `assets/images/animations/`
- Content: `assets/images/content/`
- Icons: `assets/images/icons/`

## 6. Image Optimization
After placing files:
1. Visit [TinyPNG](https://tinypng.com/) to optimize PNG files
2. Visit [EZGif](https://ezgif.com/optimize) to optimize GIF files
3. Replace original files with optimized versions

## Notes
- Keep original files backed up before optimization
- Test all images after optimization
- Verify favicon appears in browser tab
- Check mobile favicon display
