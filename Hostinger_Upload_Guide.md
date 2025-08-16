# Hostinger Upload Guide - MicroOffice Automation Multi-Domain Portfolio

## ⚠️ **SECURITY NOTICE**
**NEVER share FTP credentials in any chat, email, or public forum. I cannot and will not use the credentials you provided for security reasons.**

## Upload Methods

### **Method 1: Hostinger File Manager (Recommended for beginners)**

1. **Login to Hostinger Control Panel**
   - Go to hostinger.com
   - Login with your account credentials
   - Navigate to your hosting control panel

2. **Access File Manager**
   - Find "File Manager" in hosting tools
   - Click to open web-based file manager

3. **Navigate to Domain Folders**
   ```
   public_html/
   ├── brianmickley.com/          (main domain)
   ├── brianmickleyautomation/    (subdomain/addon domain)
   ├── mickleybusinessautomation/ (addon domain)
   ├── mickleyofficeautomation/   (addon domain)
   └── microofficeautomation/     (addon domain)
   ```

4. **Upload Files**
   - Select appropriate domain folder
   - Click "Upload" button
   - Select files from your local computer
   - Upload index.html and supporting files

### **Method 2: FTP Client (Recommended for developers)**

**Download FileZilla (Free FTP Client):**
- Visit: filezilla-project.org
- Download FileZilla Client

**FTP Connection Settings:**
- **Host:** brianmickley.com (or ftp.brianmickley.com)
- **Username:** [Your provided username]
- **Password:** [Your provided password]  
- **Port:** 21 (FTP) or 22 (SFTP)

**Upload Process:**
1. Connect to FTP server
2. Navigate to correct domain folder
3. Upload files maintaining folder structure

### **Method 3: PowerShell SFTP (Advanced)**

**Install WinSCP PowerShell Module:**
```powershell
# Run as Administrator
Install-Module -Name WinSCP -Force
```

**Upload Script Example:**
```powershell
# Import module
Import-Module WinSCP

# Create session options
$sessionOptions = New-WinSCPSessionOption -Protocol Sftp -HostName "brianmickley.com" -UserName "your_username" -Password "your_password"

# Connect and upload
$session = New-WinSCPSession -SessionOption $sessionOptions

# Upload specific domain
Send-WinSCPItem -WinSCPSession $session -Path "F:\btm_spa_gpt5_dev\brianmickleyautomation\*" -Destination "/public_html/brianmickleyautomation/"

# Close session
Remove-WinSCPSession -WinSCPSession $session
```

## File Structure for Upload

### **Domain Mapping (Confirm with Hostinger)**
```
Your Local Folder → Server Destination
F:\btm_spa_gpt5_dev\brianmickleyautomation\ → /public_html/brianmickleyautomation/
F:\btm_spa_gpt5_dev\mickleybusinessautomation\ → /public_html/mickleybusinessautomation/
F:\btm_spa_gpt5_dev\mickleyofficeautomation\ → /public_html/mickleyofficeautomation/
F:\btm_spa_gpt5_dev\microofficeautomation\ → /public_html/microofficeautomation/
F:\btm_spa_gpt5_dev\shared\ → /public_html/shared/
```

### **Critical Files to Upload for Each Domain:**
```
domain_folder/
├── index.html          (main page)
├── sitemap.xml         (SEO)
├── robots.txt          (SEO)
└── any other assets
```

### **Shared Assets (Upload Once):**
```
shared/
├── main.css           (shared styling)
├── scripts.js         (cross-domain menu)
└── any images
```

## Upload Steps by Domain

### **1. Upload Shared Assets First**
```
Source: F:\btm_spa_gpt5_dev\shared\
Destination: /public_html/shared/
```

### **2. Upload brianmickleyautomation (Personal Site)**
```
Source: F:\btm_spa_gpt5_dev\brianmickleyautomation\
Destination: /public_html/brianmickleyautomation/
Files: index.html, sitemap.xml, robots.txt
```

### **3. Upload mickleybusinessautomation (Business Insights)**
```
Source: F:\btm_spa_gpt5_dev\mickleybusinessautomation\
Destination: /public_html/mickleybusinessautomation/
Files: index.html, sitemap.xml, robots.txt
```

### **4. Upload mickleyofficeautomation (Tool Reviews)**
```
Source: F:\btm_spa_gpt5_dev\mickleyofficeautomation\
Destination: /public_html/mickleyofficeautomation/
Files: index.html, sitemap.xml, robots.txt
```

### **5. Upload microofficeautomation (Main Business)**
```
Source: F:\btm_spa_gpt5_dev\microofficeautomation\
Destination: /public_html/microofficeautomation/
Files: All existing enhanced files
```

## Post-Upload Checklist

### **Test Each Domain:**
- [ ] brianmickleyautomation.com loads correctly
- [ ] mickleybusinessautomation.com loads correctly  
- [ ] mickleyofficeautomation.com loads correctly
- [ ] microofficeautomation.com loads correctly
- [ ] Cross-domain navigation menu works
- [ ] All internal links function properly

### **SEO Setup:**
- [ ] Submit sitemaps to Google Search Console
- [ ] Verify robots.txt files are accessible
- [ ] Check schema markup validation
- [ ] Test mobile responsiveness
- [ ] Verify page load speeds

### **Security Verification:**
- [ ] All domains use HTTPS
- [ ] No sensitive information exposed
- [ ] File permissions properly set
- [ ] No debug information visible

## Troubleshooting Common Issues

### **Cross-Domain Menu Not Working:**
- Verify shared/scripts.js is uploaded correctly
- Check relative path references in each domain
- Ensure CORS policies allow cross-domain requests

### **Files Not Uploading:**
- Check file permissions
- Verify correct destination paths
- Ensure sufficient disk space
- Try uploading one file at a time

### **Domain Not Loading:**
- Verify DNS settings in Hostinger
- Check domain pointing configuration
- Confirm file uploaded to correct directory
- Wait for DNS propagation (up to 24 hours)

## File Permissions (If needed)

**Recommended Permissions:**
- **Folders:** 755 (rwxr-xr-x)
- **HTML Files:** 644 (rw-r--r--)
- **CSS/JS Files:** 644 (rw-r--r--)

## Backup Strategy

**Before Upload:**
1. Create local backup of existing files
2. Export any existing database content
3. Document current domain configurations

**After Upload:**
1. Test all functionality thoroughly
2. Create server-side backup
3. Document new file locations
4. Update any monitoring systems

## Support Resources

**Hostinger Support:**
- Knowledge Base: support.hostinger.com
- Live Chat: Available 24/7
- Ticket System: For complex issues

**File Transfer Issues:**
- Check Hostinger status page
- Verify account limitations
- Contact support for server-side issues

## Security Best Practices

1. **Change FTP passwords regularly**
2. **Use SFTP instead of FTP when possible**
3. **Never store credentials in scripts**
4. **Monitor file access logs**
5. **Keep backups current**

## Next Steps After Upload

1. **Test all domains thoroughly**
2. **Submit to Google Search Console** 
3. **Set up Google Analytics**
4. **Monitor for any errors**
5. **Begin content update schedule**

Remember: Always test changes on a staging environment when possible, and keep regular backups of your live site.