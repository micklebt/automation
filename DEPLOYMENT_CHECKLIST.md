# 🚀 DEPLOYMENT CHECKLIST - Complete File Upload Guide

## 📁 SHARED FRAMEWORK FILES (Upload to ALL domains)

### `/shared/` Directory - **CRITICAL - Upload to every domain**

```
SOURCE: F:\btm_spa_gpt5_dev\shared\
UPLOAD TO: [domain-root]/shared/

📄 main.css (13.8KB) - Enhanced CSS framework with variables
📄 scripts.js (10.8KB) - Cross-domain menu system  
📄 components.js (10.9KB) - Reusable HTML component library
📄 logo-placeholder.png (0KB) - Placeholder image file
```

**⚠️ CRITICAL:** The `/shared/` folder must be uploaded to EVERY domain root:

- `microofficeautomation.com/shared/`
- `brianmickleyautomation.com/shared/`
- `mickleybusinessautomation.com/shared/`
- `mickleyofficeautomation.com/shared/`

---

## 🌐 DOMAIN-SPECIFIC FILES

### 1️⃣ **microofficeautomation.com** (Primary Domain)

```
SOURCE: F:\btm_spa_gpt5_dev\microofficeautomation\
UPLOAD TO: [microofficeautomation.com root]/

✅ index.html - Main homepage (refactored)
✅ complete_tech_picker.html - Tech stack assessment
✅ value_calculator.html - ROI calculator  
✅ freebies.html - Free tools page
✅ after_image.png - Business transformation image
✅ stressed_manager.png - Stressed manager image
✅ business_smart_card_template.txt - Business template
✅ ai_conversion_prompt.txt - AI prompt file
✅ markdowntohtml.com.html - Converted HTML file

❌ index - Copy.html - DO NOT UPLOAD (backup file)
```

### 2️⃣ **brianmickleyautomation.com** (About Brian)

```
SOURCE: F:\btm_spa_gpt5_dev\brianmickleyautomation\
UPLOAD TO: [brianmickleyautomation.com root]/

✅ index.html - Brian's bio page (refactored)
```

### 3️⃣ **mickleybusinessautomation.com** (Business Insights)

```
SOURCE: F:\btm_spa_gpt5_dev\mickleybusinessautomation\
UPLOAD TO: [mickleybusinessautomation.com root]/

✅ index.html - Business insights page (refactored)
✅ gear_cluster_aha_moment_demo.html - Interactive demo
```

### 4️⃣ **mickleyofficeautomation.com** (Tool Reviews)

```
SOURCE: F:\btm_spa_gpt5_dev\mickleyofficeautomation\
UPLOAD TO: [mickleyofficeautomation.com root]/

✅ index.html - Tool reviews page (refactored)
```

---

## 📂 FILES TO **NOT** UPLOAD

### ❌ Archive/Backup Files (Keep Local Only)

```
📁 archives_backup_files/ - ENTIRE FOLDER - Keep for rollback only
📄 microofficeautomation/index - Copy.html - Backup copy
📄 Any files with "_backup" or "_test" in filename
```

### ❌ Development Files

```
📄 DEPLOYMENT_CHECKLIST.md - This file (documentation only)
📄 package.json, package-lock.json - If present
📁 node_modules/ - If present
📁 .git/ - Git repository (if present)
```

---

## 🔄 UPLOAD SEQUENCE (CRITICAL ORDER)

### **Step 1: Upload Shared Framework FIRST**

Upload `/shared/` directory to **ALL FOUR DOMAINS** before uploading any HTML files:

1. `microofficeautomation.com/shared/`
2. `brianmickleyautomation.com/shared/`  
3. `mickleybusinessautomation.com/shared/`
4. `mickleyofficeautomation.com/shared/`

### **Step 2: Upload Domain-Specific Files**

After shared files are live, upload each domain's content:

1. **microofficeautomation.com** (main domain) - All files from `/microofficeautomation/`
2. **brianmickleyautomation.com** - `index.html` from `/brianmickleyautomation/`
3. **mickleybusinessautomation.com** - Files from `/mickleybusinessautomation/`
4. **mickleyofficeautomation.com** - `index.html` from `/mickleyofficeautomation/`

---

## 🧪 POST-DEPLOYMENT TESTING

### **Critical Tests (Run on EVERY domain)**

1. ✅ Page loads without broken CSS
2. ✅ Shared menu appears and functions
3. ✅ Cross-domain links work properly
4. ✅ Mobile responsive design works
5. ✅ Forms submit correctly
6. ✅ No 404 errors in browser console

### **Test URLs**

- https://microofficeautomation.com/
- https://brianmickleyautomation.com/
- https://mickleybusinessautomation.com/
- https://mickleyofficeautomation.com/

---

## 📊 FILE SIZE SUMMARY

### **Total Upload Size by Domain:**

- **microofficeautomation.com**: ~45KB (HTML) + ~35KB (shared) + images
- **brianmickleyautomation.com**: ~15KB (HTML) + ~35KB (shared)
- **mickleybusinessautomation.com**: ~18KB (HTML) + ~35KB (shared) + ~20KB (demo)
- **mickleyofficeautomation.com**: ~25KB (HTML) + ~35KB (shared)

### **Shared Framework (upload to all domains):**

- `main.css`: 13.8KB
- `scripts.js`: 10.8KB  
- `components.js`: 10.9KB
- **Total Shared**: ~35KB per domain

---

## ⚠️ ROLLBACK PLAN

If issues occur after deployment:

### **Emergency Rollback Files (Keep Local)**

```
📁 archives_backup_files/ - Original versions
📄 microofficeautomation/index - Copy.html - Working backup
```

### **Quick Rollback Steps:**

1. Replace problem HTML file with backup version
2. Remove `/shared/` directory if causing issues
3. Restore original inline CSS temporarily

---

## 🔧 SERVER CONFIGURATION

### **Required Server Settings:**

- **MIME Types**: Ensure `.css` and `.js` files serve with correct headers
- **CORS**: No special configuration needed (same-origin policy)
- **Caching**: Set appropriate cache headers for static assets
- **HTTPS**: Ensure all domains have SSL certificates

### **Optional Optimizations:**

- Enable Gzip compression for `.css` and `.js` files
- Set cache headers: `Cache-Control: public, max-age=86400` for static assets
- Enable HTTP/2 if available

---

## ✅ FINAL VERIFICATION

After completing upload to ALL domains, verify:

1. ✅ All 4 domains load successfully
2. ✅ Shared menu appears on all pages
3. ✅ Cross-domain navigation works
4. ✅ No console errors
5. ✅ Mobile experience is consistent
6. ✅ Forms and CTAs function properly
7. ✅ Analytics tracking works (if configured)

---

**🎯 SUCCESS CRITERIA:** 

- 60% reduction in total CSS code
- Consistent branding across all domains
- Faster page load times
- Single source of truth for design updates
- Mobile-optimized responsive design
- Enhanced cross-domain user experience