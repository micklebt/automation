# Media Migration Plan

## 1. microofficeautomation

Files to Move:
- after_image.png → assets/images/content/
- brian_google_photo.gif → assets/images/content/
- stressed_manager.png → assets/images/content/
- shared/logo-placeholder.png → assets/images/content/

## 2. mickleyofficeautomation

Files to Move:
- shared/logo-placeholder.png → assets/images/content/
- Any files from images/ directory to appropriate subdirectories

## 3. brianmickleyautomation

Files to Move:
- shared/logo-placeholder.png → assets/images/content/
- shared/placeholder-images.html content needs to be reviewed and images moved

## Common Tasks for All Sites

1. Create favicon files:
   - Generate from profile photo
   - Place in assets/images/icons/
   - Place favicon.ico in root

2. Update HTML paths:
   - Update all img src attributes
   - Update any CSS background images
   - Update any JavaScript image references

3. Cleanup:
   - Remove old images directories
   - Remove duplicate images
   - Remove placeholder files

## Process

1. For each site:
   a. Move content images
   b. Move animations
   c. Generate icons
   d. Update HTML
   e. Test all images
   f. Remove old directories

2. Quality Checks:
   - Verify all images load
   - Check responsive behavior
   - Validate paths in HTML
   - Test favicon display

## Notes

- Keep original files until testing is complete
- Update one site at a time
- Test after each major change
- Document any path updates
