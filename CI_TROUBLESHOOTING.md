# GitHub Actions CI/CD Troubleshooting Guide

## ✅ **FIXES APPLIED**

### **Problem 1: WebKit Browser Executable Missing**
**Error**: `Executable doesn't exist at /home/runner/.cache/ms-playwright/webkit-2191/pw_run.sh`

**✅ FIXED IN WORKFLOW:**
```yaml
- name: Install Playwright Browsers
  run: npx playwright install --with-deps

- name: Debug Browser Installation
  run: |
    echo "Checking Playwright cache..."
    ls -la ~/.cache/ms-playwright/ || echo "Cache directory not found"
    echo "Verifying WebKit installation..."
    find ~/.cache/ms-playwright/ -name "*webkit*" -type d || echo "WebKit not found"
```

### **Problem 2: Missing Browser Dependencies**
**Error**: Browser binaries not properly installed in CI environment

**✅ FIXED WITH:**
- Added `--with-deps` flag to ensure system dependencies are installed
- Added verification steps to debug installation
- Updated all workflow jobs (main, accessibility, performance)

---

## 🔧 **WORKFLOW IMPROVEMENTS**

### **1. Enhanced Browser Installation**
```yaml
# Before (incomplete)
- name: Install Playwright
  run: npx playwright install chromium

# After (complete)
- name: Install Playwright Browsers
  run: npx playwright install --with-deps
```

### **2. Added Debugging Steps**
- Playwright version verification
- Browser cache inspection
- WebKit-specific validation

### **3. Updated Project Matrix**
```yaml
# Before (missing projects)
matrix:
  project: [chromium, firefox, webkit, mobile-chrome]

# After (complete)
matrix:
  project: [chromium, firefox, webkit, mobile-chrome, mobile-safari, tablet]
```

---

## 📋 **NEW SCRIPTS ADDED**

### **1. CI Validation Script**
```bash
npm run validate:ci
```
- Checks Playwright installation
- Validates browser dependencies
- Lists available projects

### **2. CI Setup Script**
```bash
npm run ci:setup
```
- Installs dependencies with npm ci
- Installs browsers with deps

### **3. Full CI Test Script**
```bash
npm run ci:test
```
- Validates setup
- Runs complete test suite

---

## 🚀 **NEXT STEPS TO VERIFY FIXES**

### **1. Commit and Push Changes**
```bash
git add .
git commit -m "fix: resolve GitHub Actions browser installation issues

- Add --with-deps flag to playwright install
- Include all projects in CI matrix
- Add debugging steps for troubleshooting
- Create CI validation scripts"
git push origin main
```

### **2. Monitor GitHub Actions**
1. Go to your repository on GitHub
2. Click **Actions** tab
3. Watch the workflow run with new fixes
4. Check that all browser projects pass

### **3. Local Validation (Optional)**
```bash
# Test the new scripts locally
npm run validate:ci
npm run ci:setup
npm run ci:test
```

---

## 📊 **EXPECTED RESULTS**

### **✅ What Should Work Now:**
- **WebKit tests** will find browser executable
- **All projects** (chromium, firefox, webkit, mobile-chrome, mobile-safari, tablet) will run
- **System dependencies** will be properly installed
- **Better debugging** info if issues occur

### **📈 Success Indicators:**
- ✅ No "Executable doesn't exist" errors
- ✅ All 6 browser projects complete successfully
- ✅ WebKit tests pass without browser issues
- ✅ Accessibility and performance jobs work correctly

---

## 🔍 **IF ISSUES PERSIST**

### **Check These Common Problems:**

1. **Node.js Version**: Ensure using Node 18+
2. **Cache Issues**: Clear npm cache in CI
3. **Timeout Issues**: Increase timeout for slow browsers
4. **Memory Issues**: Reduce parallel workers in CI

### **Advanced Debugging:**
```yaml
# Add to workflow for deeper debugging
- name: Debug System Info
  run: |
    uname -a
    df -h
    free -m
    node --version
    npm --version
```

### **Emergency Fallback:**
If WebKit continues to fail, temporarily exclude it:
```yaml
matrix:
  project: [chromium, firefox, mobile-chrome, mobile-safari]
```

---

## 📞 **SUPPORT CONTACTS**

- **Playwright Documentation**: https://playwright.dev/docs/ci
- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **Repository Issues**: Create issue with workflow logs

---

**Last Updated**: August 6, 2025  
**Status**: ✅ **FIXES APPLIED AND READY FOR TESTING**
