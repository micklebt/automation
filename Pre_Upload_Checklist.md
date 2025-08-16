# Pre-Upload Advanced Preparations Checklist

## ✅ **COMPLETED**
- [x] **Git Repository Backup** - All changes committed and pushed to GitHub
- [x] **Cross-Domain Navigation** - Shared menu system implemented
- [x] **SEO Optimization** - Schema markup, meta tags, sitemaps complete
- [x] **Internal Linking** - Strategic links between domains implemented
- [x] **Professional Images** - Placeholder structure ready for real photos

## 🔍 **ADDITIONAL PREPARATIONS NEEDED**

### **1. Domain Configuration Verification**
**Before Upload - Confirm with Hostinger:**
- [ ] Verify domain folder structure on server
- [ ] Confirm addon domain setup for all 4 domains
- [ ] Check SSL certificates are ready for all domains
- [ ] Verify DNS propagation settings

### **2. File Path Dependencies**
**Critical Check:**
```
Current relative paths assume this structure:
domain_folder/
├── index.html
└── ../shared/main.css
└── ../shared/scripts.js
```

**Action Required:**
- [ ] Verify Hostinger allows cross-domain shared folder access
- [ ] Test if `../shared/` paths work on server
- [ ] Alternative: Copy shared files to each domain if cross-access fails

### **3. Cross-Domain Security Settings**
**CORS (Cross-Origin Resource Sharing):**
- [ ] Verify Hostinger allows cross-domain JavaScript execution
- [ ] Test shared menu functionality works across different domains
- [ ] Confirm shared CSS/JS loading permissions

### **4. Performance Optimization**
**Pre-Upload Optimizations:**
- [ ] Minify CSS files (optional but recommended)
- [ ] Compress images when you replace placeholders
- [ ] Consider combining CSS files if cross-domain sharing fails

### **5. Backup Strategy**
**Before Making Any Changes:**
- [ ] Export current website files if any exist
- [ ] Document current domain configurations
- [ ] Save current DNS settings
- [ ] Backup any existing databases

### **6. Testing Environment**
**Recommended Setup:**
- [ ] Consider staging subdomain for testing (staging.brianmickley.com)
- [ ] Test upload process with one domain first
- [ ] Verify functionality before rolling out to all domains

### **7. Post-Upload Testing Preparation**
**Tools Ready:**
- [ ] Google Search Console accounts for each domain
- [ ] Google Analytics setup (if desired)
- [ ] Schema markup validation tools bookmarked
- [ ] Mobile responsiveness testing tools ready

## 🚨 **POTENTIAL ISSUES TO PREPARE FOR**

### **Cross-Domain Menu May Not Work If:**
- Hostinger blocks cross-domain file access
- CORS policies prevent JavaScript execution
- Shared folder permissions are restricted

**Backup Plan:**
- Copy `shared/scripts.js` and `shared/main.css` to each domain folder
- Update paths from `../shared/` to `./` in each HTML file
- Maintain separate copies of shared assets

### **Domain Folder Structure Unknown**
**Current Assumption:**
```
/public_html/
├── brianmickleyautomation/
├── mickleybusinessautomation/
├── mickleyofficeautomation/
├── microofficeautomation/
└── shared/
```

**If Different Structure:**
- Adjust upload paths accordingly
- Update relative path references in HTML files
- Modify cross-domain links as needed

## 📋 **IMMEDIATE PRE-UPLOAD ACTIONS**

### **1. Create Backup Script**
```powershell
# PowerShell backup script
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupPath = "F:\btm_spa_gpt5_dev_backup_$timestamp"
Copy-Item -Path "F:\btm_spa_gpt5_dev" -Destination $backupPath -Recurse
Write-Host "Backup created at: $backupPath"
```

### **2. Verify Critical Files Exist**
**Run This Check:**
- [ ] brianmickleyautomation/index.html ✓
- [ ] mickleybusinessautomation/index.html ✓
- [ ] mickleyofficeautomation/index.html ✓
- [ ] microofficeautomation/index.html ✓
- [ ] shared/main.css ✓
- [ ] shared/scripts.js ✓
- [ ] All sitemap.xml files ✓
- [ ] All robots.txt files ✓

### **3. Test Local File Structure**
**Simulate Server Environment:**
- [ ] Open each index.html in browser
- [ ] Verify shared CSS loads correctly
- [ ] Test cross-domain menu functionality
- [ ] Check all internal links work

### **4. Prepare Alternative Upload Plans**

**Plan A: Full Cross-Domain Setup**
- Upload shared folder to `/public_html/shared/`
- Upload each domain with relative paths intact

**Plan B: Self-Contained Domains**
- Copy shared files to each domain
- Update paths in HTML files
- Upload each domain independently

**Plan C: Gradual Rollout**
- Upload one domain first (brianmickleyautomation)
- Test functionality thoroughly
- Roll out remaining domains based on results

## 🔧 **QUICK FIXES IF NEEDED**

### **If Cross-Domain Menu Fails:**
```html
<!-- Replace in each HTML file -->
<link rel="stylesheet" href="../shared/main.css">
<!-- With -->
<link rel="stylesheet" href="./main.css">

<script src="../shared/scripts.js"></script>
<!-- With -->
<script src="./scripts.js"></script>
```

### **If Domain Structure Different:**
- Check Hostinger control panel for actual folder structure
- Adjust upload paths in guide accordingly
- Update any hardcoded domain references

## ✅ **FINAL VERIFICATION**

**Before Upload Confirm:**
- [ ] All files committed to GitHub ✓
- [ ] Local backup created
- [ ] Hostinger access credentials secured (not shared in chat)
- [ ] Upload method chosen (File Manager/FTP/PowerShell)
- [ ] Backup plan ready if cross-domain sharing fails
- [ ] Post-upload testing checklist prepared

## 🚀 **READY FOR UPLOAD**

Once all above items are verified, proceed with upload using the Hostinger_Upload_Guide.md instructions.