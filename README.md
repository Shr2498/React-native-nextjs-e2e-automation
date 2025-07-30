# Rebet.app Frontend Automation Framework

A comprehensive end-to-end testing framework for the Rebet.app website, built with Playwright and TypeScript.

## 🎯 About Rebet.app

**Rebet.app** is a social ### **User Journey Analysis** (`user-journey-analysis.spec.ts`)
- ✅ Complete user discovery journey
- ✅ Mobile app promotion effectiveness
- ✅ Conversion funnel optimization
- ✅ Competitive positioning analysis
- ✅ Brand consistency validation

## 🛠️ Troubleshooting

### If npm commands don't work:
1. Make sure Node.js is installed: https://nodejs.org/
2. Restart Command Prompt after installing Node.js
3. Check PATH environment variable includes Node.js

### If tests fail:
1. Check internet connection (tests run against live site)
2. Run with `--headed` flag to see what's happening
3. Check test-results folder for screenshots/videos
4. Update selectors if website structure changed

### Common Commands for Debugging:
```cmd
# Run single test with debug info
npx playwright test homepage.spec.ts --headed --debug

# Run tests with trace
npx playwright test --trace on

# Show Playwright UI for debugging
npx playwright test --ui
```

## 🔧 Advanced Configurationetting and casino gaming platform featuring:
- **WordPress-based marketing website** promoting the gaming platform
- **Social sports betting** with community features
- **Casino-style games** (Plinko, slots, table games, live dealer)
- **Mobile apps** available on iOS and Android
- **Social features** (following, commenting, sharing picks)
- **Free-to-play gaming** with virtual currency

## 🛠️ Technology Stack Analysis

- **Frontend**: WordPress with custom theme
- **Assets**: Optimized images, SVGs, WebP format
- **Mobile Apps**: React Native (iOS/Android)
- **Main Platform**: React/Next.js based (play.rebet.app)

## 🚀 Automation Framework Features

### ✅ Comprehensive Web Testing (Playwright)
- **Cross-browser testing** (Chrome, Firefox, Safari)
- **Mobile responsiveness** across multiple device types
- **Performance monitoring** with Core Web Vitals
- **Accessibility testing** with WCAG compliance
- **Security validation** and compliance checks
- **Visual regression testing**

### 📱 Mobile & Cross-Platform Testing
- **Responsive design** validation across 7+ viewports
- **Touch interaction** testing
- **Mobile app promotion** validation
- **App store links** verification

### 🔧 Professional Quality Assurance
- **TypeScript** for type safety and maintainability
- **ESLint + Prettier** for code quality
- **GitHub Actions** CI/CD pipeline ready
- **Comprehensive reporting** with Allure integration

## � Quick Start Guide

### Prerequisites
- Node.js 18+ installed
- Git installed

### Option 1: Automated Setup (Recommended)

1. **Double-click `setup.bat`** or run in Command Prompt:
   ```cmd
   setup.bat
   ```
   This will automatically:
   - Install all npm dependencies
   - Install Playwright browsers
   - Create .env file from template
   - Display available commands

### Option 2: Manual Setup

1. **Open Command Prompt** and navigate to project folder:
   ```cmd
   cd c:\Users\13108\Projects\React-native-nextjs-e2e-automation
   ```

2. **Install dependencies:**
   ```cmd
   npm install
   ```

3. **Install Playwright browsers:**
   ```cmd
   npx playwright install
   ```

4. **Copy environment file:**
   ```cmd
   copy .env.example .env
   ```

### Running Tests

#### Easy Way (Interactive Menu)
1. **Double-click `run-tests.bat`** or run:
   ```cmd
   run-tests.bat
   ```
   Select from the interactive menu.

#### Professional Test Execution
For comprehensive testing with professional reporting:
```bash
# Windows Command Prompt
run-tests-professional.bat

# PowerShell (if execution policy allows)
.\run-tests-professional.bat

# Manual execution
npx playwright test --project=chromium --project=firefox --reporter=html,allure-playwright
```

#### Command Line Options
```cmd
# Run all tests
npm test

# Run tests with browser visible
npm run test:headed

# Run tests with Playwright UI
npm run test:ui

# Run mobile tests only
npm run test:mobile

# Run specific test file
npx playwright test homepage.spec.ts

# Generate test code interactively
npm run test:codegen

# View test report
npm run test:report
```

### Viewing Results

After running tests, view results:

1. **HTML Report:**
   ```cmd
   npm run test:report
   ```

2. **Check test-results folder** for screenshots and videos of failed tests

3. **Allure Report** (if configured):
   ```cmd
   npx allure serve allure-results
   ```

## �📁 Project Structure

```
react-native-nextjs-e2e-automation/
├── tests/                          # Test suites
│   ├── homepage.spec.ts            # Homepage functionality tests
│   ├── advanced-user-flows.spec.ts # User journey and conversion tests
│   ├── performance-accessibility.spec.ts # Performance and accessibility
│   ├── cross-platform-gaming.spec.ts     # Gaming features and devices
│   ├── security-compliance.spec.ts       # Security and compliance
│   ├── user-journey-analysis.spec.ts     # End-to-end user experience
│   ├── navigation.spec.ts          # Navigation and routing tests
│   ├── mobile.spec.ts              # Mobile responsiveness tests
│   └── quick-validation.spec.ts    # Basic connectivity tests
├── utils/                          # Helper utilities and page objects
│   └── helpers.ts                  # Common test helpers and utilities
├── .github/workflows/              # CI/CD configuration
│   └── playwright.yml              # GitHub Actions workflow
├── playwright.config.ts            # Playwright configuration
├── setup.bat                       # Automated setup script
├── run-tests-professional.bat      # Professional test runner
└── package.json                    # Dependencies and scripts
```

## � Test Coverage

### **Foundation Tests** (`homepage.spec.ts`)
- ✅ Page loading and basic functionality validation
- ✅ Rebet branding and content verification
- ✅ Call-to-action elements testing
- ✅ Sports and gaming content detection
- ✅ Footer and navigation validation
- ✅ Image loading optimization
- ✅ Mobile responsiveness verification

### **Advanced User Flows** (`advanced-user-flows.spec.ts`)
- ✅ Complete user signup journey testing
- ✅ Social features and user reviews validation
- ✅ Gaming content and features verification
- ✅ Cross-platform app promotion testing
- ✅ Promotional content and CTA effectiveness

### **Performance & Accessibility** (`performance-accessibility.spec.ts`)
- ✅ Core Web Vitals measurement (FCP, LCP)
- ✅ Accessibility compliance testing
- ✅ Network conditions and resilience
- ✅ SEO optimization validation
- ✅ Error handling and edge cases

### **Cross-Platform Gaming** (`cross-platform-gaming.spec.ts`)
- ✅ Browser-specific feature testing
- ✅ Multi-resolution responsive design
- ✅ Touch interaction validation
- ✅ Gaming platform features detection
- ✅ Social betting features validation

### **Security & Compliance** (`security-compliance.spec.ts`)
- ✅ SSL certificate and HTTPS validation
- ✅ Security headers analysis
- ✅ Form security and data handling
- ✅ Cookie compliance and privacy
- ✅ Responsible gaming compliance
- ✅ API endpoint security testing

### **User Journey Analysis** (`user-journey-analysis.spec.ts`)
- ✅ Complete user discovery journey
- ✅ Mobile app promotion effectiveness
- ✅ Conversion funnel optimization
- ✅ Competitive positioning analysis
- ✅ Brand consistency validation

## 🔧 Configuration

### Playwright Configuration
The `playwright.config.ts` file contains:
- **Multiple browser support** (Chrome, Firefox, Safari)
- **Mobile device emulation**
- **Screenshot and video recording**
- **Parallel test execution**
- **Custom timeouts and retries**

### Environment Variables
Configure in `.env` file:
- `BASE_URL`: Target website URL
- `TEST_USER_EMAIL`: Test credentials (if needed)  
- `HEADLESS`: Run tests in headless mode
- `MAX_WORKERS`: Parallel execution workers

### Cross-Browser Testing
- ✅ **Chrome/Chromium**: Primary browser testing
- ✅ **Firefox**: Cross-browser compatibility
- ✅ **Safari**: WebKit engine validation
- ✅ **Mobile Chrome**: Android mobile simulation
- ✅ **Mobile Safari**: iOS mobile simulation

### Device Testing Matrix
- 📱 **Mobile Phones**: 320px - 480px (Portrait/Landscape)
- 📊 **Tablets**: 768px - 1024px (Portrait/Landscape)
- 💻 **Desktop**: 1280px - 2560px (Various resolutions)
- 🖥️ **4K Displays**: Ultra-high resolution testing

## 🚀 CI/CD Pipeline

GitHub Actions workflow automatically:
- **Runs tests** on push/PR to main branch
- **Tests multiple browsers** in parallel
- **Daily scheduled runs** for monitoring
- **Generates reports** and artifacts
- **Accessibility testing**
- **Performance monitoring**

## 📈 Advanced Features

### Visual Testing
```bash
# Take screenshots for comparison
npx playwright test --update-snapshots

# Compare visual differences
npx playwright test --reporter=html
```

### API Testing Integration
```typescript
// Example API test integration
test('should validate API endpoints', async ({ request }) => {
  const response = await request.get('/api/health');
  expect(response.status()).toBe(200);
});
```

### Custom Selectors
```typescript
// Page Object Model example
class RebetHomePage {
  constructor(private page: Page) {}
  
  async clickPlayNow() {
    await this.page.locator('[data-testid="play-now"]').click();
  }
}
```

## 🛡️ Best Practices

### Test Organization
- **Descriptive test names** explaining what is being tested
- **Page Object Model** for reusable components
- **Helper functions** for common actions
- **Data-driven testing** with external test data

### Reliability
- **Proper waits** for elements and network
- **Retry mechanisms** for flaky tests
- **Error handling** and cleanup
- **Isolated test execution**

### Maintenance
- **Regular updates** of dependencies
- **Test review** and refactoring
- **Documentation updates**
- **Performance monitoring**

## � Next Steps

1. **Run the setup.bat** to get started
2. **Try running tests** with run-tests.bat
3. **Explore the test files** in the `tests/` folder
4. **Customize tests** for your specific needs
5. **Add new test scenarios** as needed

## 📄 Files Overview

- `setup.bat` - Automated setup script
- `run-tests.bat` - Interactive test runner
- `run-tests-professional.bat` - Professional test execution
- `tests/` - All test files organized by functionality
- `utils/helpers.ts` - Common test utilities and page objects
- `playwright.config.ts` - Comprehensive test configuration
- `.env.example` - Environment variables template

---

**Happy Testing! 🎉**

*Professional frontend automation framework for React Native, TypeScript, and Next.js applications.*
- [ ] **Cross-platform mobile** testing (iOS/Android)
- [ ] **Real device testing** integration

### Mobile App Testing
- [ ] **React Native app** automation with Detox
- [ ] **iOS simulator** testing
- [ ] **Android emulator** testing
- [ ] **App store deployment** validation

## 📞 Support & Contribution

### Getting Help
- Check existing tests for examples
- Review Playwright documentation
- Open issues for bugs or feature requests

### Contributing
1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Happy Testing! 🎉**

Built with ❤️ for reliable web automation testing of Rebet.app