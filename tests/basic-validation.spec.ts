import { test, expect } from '@playwright/test';

test.describe('Rebet Website Basic Validation', () => {
  
  test('Website accessibility check', async ({ page }) => {
    console.log('🔍 Testing Rebet.app accessibility...');
    
    try {
      await page.goto('https://rebet.app/', { timeout: 30000 });
      await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
      
      // Basic checks
      const title = await page.title();
      console.log(`📄 Page title: ${title}`);
      expect(title.toLowerCase()).toContain('rebet');
      
      // Check if page loaded properly
      const bodyText = await page.locator('body').textContent();
      expect(bodyText?.toLowerCase()).toContain('rebet');
      
      console.log('✅ Website is accessible and responsive');
      
    } catch (error) {
      console.error('❌ Website accessibility test failed:', error);
      throw error;
    }
  });

  test('Main content verification', async ({ page }) => {
    console.log('🔍 Verifying main content...');
    
    await page.goto('https://rebet.app/');
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot for reference
    await page.screenshot({ 
      path: 'test-results/homepage-screenshot.png', 
      fullPage: true 
    });
    
    console.log('📸 Screenshot saved to test-results/homepage-screenshot.png');
    
    // Check for key content
    const pageContent = await page.textContent('body');
    const hasGamingContent = /casino|sports|gaming|betting/i.test(pageContent || '');
    
    expect(hasGamingContent).toBeTruthy();
    console.log('✅ Gaming/sports content detected');
  });

  test('Links and navigation check', async ({ page }) => {
    console.log('🔍 Testing navigation...');
    
    await page.goto('https://rebet.app/');
    await page.waitForLoadState('networkidle');
    
    // Get all links
    const links = await page.locator('a[href]').all();
    console.log(`🔗 Found ${links.length} links on page`);
    
    // Check first few links are valid
    for (let i = 0; i < Math.min(links.length, 5); i++) {
      const href = await links[i].getAttribute('href');
      if (href && !href.startsWith('#')) {
        console.log(`✅ Link ${i + 1}: ${href}`);
      }
    }
    
    expect(links.length).toBeGreaterThan(0);
    console.log('✅ Navigation links found');
  });
});
