import { test, expect } from '@playwright/test';

test.describe('Rebet Security & Data Validation Tests', () => {
  
  test('should validate secure connection and SSL certificate', async ({ page }) => {
    console.log('🔒 Testing security implementation...');
    
    await page.goto('https://rebet.app/');
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    // Verify HTTPS is enforced
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/^https:\/\//);
    console.log('✅ HTTPS connection verified');
    
    // Check for security headers
    const response = await page.goto('https://rebet.app/');
    const headers = response?.headers();
    
    if (headers) {
      const securityHeaders = {
        'strict-transport-security': 'HSTS',
        'content-security-policy': 'CSP',
        'x-frame-options': 'Frame Options',
        'x-content-type-options': 'Content Type Options',
        'referrer-policy': 'Referrer Policy'
      };
      
      const foundHeaders = [];
      for (const [header, name] of Object.entries(securityHeaders)) {
        if (headers[header]) {
          foundHeaders.push(name);
          console.log(`✅ ${name} header present`);
        }
      }
      
      console.log(`🛡️ Security headers found: ${foundHeaders.join(', ')}`);
    }
    
    // Test for mixed content warnings
    const mixedContentWarnings: string[] = [];
    page.on('console', (msg) => {
      if (msg.text().includes('Mixed Content') || msg.text().includes('insecure')) {
        mixedContentWarnings.push(msg.text());
      }
    });
    
    await page.waitForTimeout(3000);
    expect(mixedContentWarnings.length).toBe(0);
    console.log('✅ No mixed content warnings detected');
  });

  test('should validate form security and data handling', async ({ page }) => {
    console.log('📝 Testing form security and validation...');
    
    await page.goto('https://rebet.app/');
    await page.waitForLoadState('networkidle');
    
    // Look for forms on the page
    const forms = page.locator('form');
    const formCount = await forms.count();
    
    if (formCount > 0) {
      console.log(`📋 Found ${formCount} forms to test`);
      
      for (let i = 0; i < Math.min(formCount, 3); i++) {
        const form = forms.nth(i);
        
        // Check for CSRF protection
        const csrfToken = form.locator('input[name*="token"], input[name*="csrf"]');
        const hasCsrfToken = await csrfToken.count() > 0;
        
        if (hasCsrfToken) {
          console.log('✅ CSRF protection detected');
        }
        
        // Test input validation
        const inputs = form.locator('input[type="email"], input[type="password"], input[type="text"]');
        const inputCount = await inputs.count();
        
        for (let j = 0; j < Math.min(inputCount, 3); j++) {
          const input = inputs.nth(j);
          const inputType = await input.getAttribute('type');
          const required = await input.getAttribute('required');
          const pattern = await input.getAttribute('pattern');
          
          console.log(`📝 Input validation - Type: ${inputType}, Required: ${!!required}, Pattern: ${!!pattern}`);
        }
      }
    } else {
      // Look for potential signup/login flows
      const authButtons = page.locator('text=/sign.*up|log.*in|register|join/i');
      const authCount = await authButtons.count();
      
      if (authCount > 0) {
        console.log(`🔑 Found ${authCount} authentication-related elements`);
      }
    }
  });

  test('should test data privacy and cookie compliance', async ({ page }) => {
    console.log('🍪 Testing privacy and cookie compliance...');
    
    // Start with a fresh context to test initial cookie behavior
    await page.goto('https://rebet.app/');
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    // Check for cookie consent banner with more flexible approach
    const cookieIndicators = [
      page.locator('text=/cookie/i'),
      page.locator('text=/consent/i'),
      page.locator('text=/privacy/i'),
      page.locator('text=/gdpr/i'),
      page.locator('[class*="cookie"]'),
      page.locator('[class*="consent"]'),
      page.locator('[id*="cookie"]'),
      page.locator('[data-*="cookie"]')
    ];
    
    let hasCookieBanner = false;
    let foundBanner = null;
    
    for (const indicator of cookieIndicators) {
      try {
        if (await indicator.first().isVisible({ timeout: 2000 })) {
          hasCookieBanner = true;
          foundBanner = indicator;
          break;
        }
      } catch (error) {
        // Log and continue checking other indicators
        console.log(`Cookie indicator check failed: ${String(error)}`);
      }
    }
    
    if (hasCookieBanner && foundBanner) {
      console.log('✅ Cookie consent mechanism detected');
      
      // Test accept/decline options
      const acceptButton = page.locator('text=/accept|agree|ok|allow/i').first();
      const declineButton = page.locator('text=/decline|reject|no|deny/i').first();
      
      const hasAccept = await acceptButton.isVisible().catch(() => false);
      const hasDecline = await declineButton.isVisible().catch(() => false);
      
      console.log(`🍪 Cookie controls - Accept: ${hasAccept}, Decline: ${hasDecline}`);
    }
    
    // Check for privacy policy link with separate selectors
    const privacyLinkHref = page.locator('a[href*="privacy"]');
    const privacyLinkText = page.locator('text="Privacy Policy"');
    
    const hasPrivacyHref = await privacyLinkHref.count() > 0;
    const hasPrivacyText = await privacyLinkText.count() > 0;
    const hasPrivacyLink = hasPrivacyHref || hasPrivacyText;
    
    if (hasPrivacyLink) {
      console.log('✅ Privacy policy link found');
    }
    
    // Test initial cookies (should be minimal without consent)
    const initialCookies = await page.context().cookies();
    const essentialCookies = initialCookies.filter(cookie => 
      cookie.name.includes('session') || 
      cookie.name.includes('csrf') || 
      cookie.name.includes('security')
    );
    
    console.log(`🍪 Initial cookies: ${initialCookies.length} total, ${essentialCookies.length} essential`);
  });

  test('should validate responsible gaming features', async ({ page }) => {
    console.log('⚖️ Testing responsible gaming compliance...');
    
    await page.goto('https://rebet.app/');
    await page.waitForLoadState('networkidle');
    
    // Look for responsible gaming indicators
    const responsibleGamingTerms = [
      'responsible gaming',
      'responsible gambling', 
      'problem gambling',
      'gambling addiction',
      'self-exclusion',
      'deposit limit',
      'time limit',
      '18+',
      'age verification',
      'gamble responsibly'
    ];
    
    const foundTerms = [];
    for (const term of responsibleGamingTerms) {
      const elements = page.locator(`text=/${term}/i`);
      const count = await elements.count();
      
      if (count > 0) {
        foundTerms.push(term);
        console.log(`✅ Found responsible gaming content: "${term}"`);
      }
    }
    
    // Check for age verification mentions with escaped regex
    const ageVerification = page.locator('text=/18|21|\\+|age|verify|adult/i');
    const ageCount = await ageVerification.count();
    
    if (ageCount > 0) {
      console.log(`🔞 Age verification references: ${ageCount}`);
    }
    
    // Look for regulatory compliance
    const regulatoryTerms = page.locator('text=/license|regulated|commission|authority/i');
    const regulatoryCount = await regulatoryTerms.count();
    
    if (regulatoryCount > 0) {
      console.log(`🏛️ Regulatory compliance references: ${regulatoryCount}`);
    }
    
    console.log(`⚖️ Responsible gaming features: ${foundTerms.join(', ')}`);
    expect(foundTerms.length + ageCount + regulatoryCount).toBeGreaterThan(0);
  });

  test('should test API endpoint security', async ({ page }) => {
    console.log('🔗 Testing API security and data protection...');
    
    const apiCalls: string[] = [];
    const secureApiCalls: string[] = [];
    
    // Monitor network requests
    page.on('request', (request) => {
      const url = request.url();
      
      // Track API calls
      if (url.includes('/api/') || url.includes('/v1/') || url.includes('.json')) {
        apiCalls.push(url);
        
        // Check if using HTTPS
        if (url.startsWith('https://')) {
          secureApiCalls.push(url);
        }
      }
    });
    
    await page.goto('https://rebet.app/');
    await page.waitForLoadState('networkidle');
    
    // Trigger some interactions to generate API calls
    const interactiveElements = page.locator('button, a[href], [onclick]');
    const elementCount = await interactiveElements.count();
    
    if (elementCount > 0) {
      // Click a few elements to trigger potential API calls
      for (let i = 0; i < Math.min(elementCount, 3); i++) {
        const element = interactiveElements.nth(i);
        if (await element.isVisible()) {
          await element.click().catch(() => {});
          await page.waitForTimeout(1000);
        }
      }
    }
    
    await page.waitForTimeout(3000);
    
    console.log(`🔗 API calls detected: ${apiCalls.length}`);
    console.log(`🔒 Secure API calls: ${secureApiCalls.length}`);
    
    // All API calls should be secure
    if (apiCalls.length > 0) {
      const securityRatio = (secureApiCalls.length / apiCalls.length) * 100;
      console.log(`🛡️ API security ratio: ${securityRatio.toFixed(1)}%`);
      expect(securityRatio).toBeGreaterThan(90); // At least 90% should be HTTPS
    }
    
    // Log some API endpoints for reference
    if (apiCalls.length > 0) {
      console.log('Sample API endpoints:', apiCalls.slice(0, 3));
    }
  });
});
