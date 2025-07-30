import { test, expect } from '@playwright/test';

test.describe('Rebet Advanced User Flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rebet.app/');
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
  });

  test('should handle user journey from homepage to signup', async ({ page }) => {
    console.log('🔍 Testing complete user signup flow...');
    
    // Find and click primary CTA
    const signupSelectors = [
      'text="Sign Up to Play Now"',
      'text="Play Now"',
      'text="Get Started"',
      'a[href*="play.rebet.app"]'
    ];
    
    let signupClicked = false;
    for (const selector of signupSelectors) {
      const element = page.locator(selector).first();
      if (await element.isVisible().catch(() => false)) {
        // Handle potential new tab/redirect
        const [newPage] = await Promise.all([
          page.context().waitForEvent('page').catch(() => null),
          element.click().catch(() => {})
        ]);
        
        if (newPage) {
          await newPage.waitForLoadState('domcontentloaded', { timeout: 15000 });
          console.log(`✅ Navigated to: ${newPage.url()}`);
          
          // Validate signup page elements
          const hasSignupForm = await newPage.locator('form, input[type="email"], input[type="password"]').first().isVisible().catch(() => false);
          if (hasSignupForm) {
            console.log('✅ Signup form detected');
          }
          
          await newPage.close();
        }
        signupClicked = true;
        break;
      }
    }
    
    expect(signupClicked).toBeTruthy();
  });

  test('should validate social features and user reviews', async ({ page }) => {
    console.log('🔍 Testing social features validation...');
    
    // Scroll to reviews section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.6));
    await page.waitForTimeout(2000);
    
    // Test user review interactions
    const reviewElements = page.locator('text=/review|rating|★|star/i');
    const reviewCount = await reviewElements.count();
    console.log(`Found ${reviewCount} review-related elements`);
    
    if (reviewCount > 0) {
      // Check for review authenticity indicators
      const userAvatars = page.locator('img[src*="avatar"], img[alt*="user"]');
      const userNames = page.locator('text=/^[A-Za-z]{3,}\\s?[A-Za-z]*$/');
      // Split complex selector to avoid parsing issues
      const timestampsAgo = page.locator('text=/ago|\\d{1,2}\\s?(min|hour|day|week|month)/i');
      const timestampsDate = page.locator('text=/\\w{3}\\s?\\d{1,2}/');
      
      const avatarCount = await userAvatars.count();
      const nameCount = await userNames.count();
      const timeCountAgo = await timestampsAgo.count();
      const timeCountDate = await timestampsDate.count();
      const timeCount = timeCountAgo + timeCountDate;
      
      console.log(`✅ Social proof elements: ${avatarCount} avatars, ${nameCount} names, ${timeCount} timestamps`);
      expect(avatarCount + nameCount + timeCount).toBeGreaterThan(0);
    }
  });

  test('should validate gaming content and features', async ({ page }) => {
    console.log('🔍 Testing gaming content validation...');
    
    // Test for specific gaming features mentioned on site
    const gamingFeatures = [
      { name: 'Plinko', selector: 'text=/plinko/i' },
      { name: 'Slots', selector: 'text=/slots/i' },
      { name: 'Live Dealer', selector: 'text=/live dealer/i' },
      { name: 'Blackjack', selector: 'text=/blackjack/i' },
      { name: 'Roulette', selector: 'text=/roulette/i' },
      { name: 'Sports Betting', selector: 'text=/sports.*bet|bet.*sports/i' },
      { name: 'Social Gaming', selector: 'text=/social.*gam/i' }
    ];
    
    const foundFeatures = [];
    for (const feature of gamingFeatures) {
      const element = page.locator(feature.selector).first();
      if (await element.isVisible().catch(() => false)) {
        foundFeatures.push(feature.name);
        console.log(`✅ Found gaming feature: ${feature.name}`);
      }
    }
    
    expect(foundFeatures.length).toBeGreaterThan(2);
    console.log(`✅ Gaming platform features validated: ${foundFeatures.join(', ')}`);
  });

  // Helper function to get text-based app store count
  async function getAppStoreTextCount(page: any, platform: string): Promise<number> {
    if (platform === 'iOS') {
      return await page.locator('text=/app store/i').count();
    } else if (platform === 'Android') {
      return await page.locator('text=/google play/i').count();
    }
    return 0;
  }

  // Helper function to validate app store links
  async function validateAppStoreLink(element: any, platform: string): Promise<void> {
    if (await element.evaluate((el: any) => el.tagName === 'A')) {
      const href = await element.getAttribute('href');
      console.log(`✅ ${platform} app link found: ${href}`);
      
      // Validate app store URLs
      if (platform === 'iOS') {
        expect(href).toMatch(/apps\.apple\.com|itunes\.apple\.com/);
      } else {
        expect(href).toMatch(/play\.google\.com/);
      }
    }
  }

  test('should test cross-platform app promotion', async ({ page }) => {
    console.log('🔍 Testing mobile app promotion and downloads...');
    
    // Look for app store badges and links
    const appStoreElements = [
      { platform: 'iOS', selector: 'a[href*="apps.apple.com"], img[src*="app-store"]' },
      { platform: 'Android', selector: 'a[href*="play.google.com"], img[src*="google-play"]' }
    ];
    
    for (const app of appStoreElements) {
      const elements = page.locator(app.selector);
      const count = await elements.count();
      const textCount = await getAppStoreTextCount(page, app.platform);
      const totalCount = count + textCount;
      
      if (totalCount > 0) {
        console.log(`✅ Found ${app.platform} app promotion: ${totalCount} elements`);
        
        if (count > 0) {
          const firstElement = elements.first();
          await expect(firstElement).toBeVisible();
          await validateAppStoreLink(firstElement, app.platform);
        }
      }
    }
  });

  test('should validate promotional content and CTAs', async ({ page }) => {
    console.log('🔍 Testing promotional content and conversion elements...');
    
    // Check for promotional elements
    const promoElements = [
      'text=/free.*play|free.*bet/i',
      'text=/bonus|deposit match|100%/i', 
      'text=/no deposit|welcome/i',
      'text=/$\\d+|$\\s?\\d+/i' // Money amounts
    ];
    
    let promoCount = 0;
    for (const selector of promoElements) {
      const elements = page.locator(selector);
      const count = await elements.count();
      if (count > 0) {
        promoCount += count;
        console.log(`✅ Promotional content found: ${selector}`);
      }
    }
    
    // Test CTA effectiveness
    const ctaButtons = page.locator('button, a[href]').filter({ hasText: /play|sign|join|start|download|get/i });
    const ctaCount = await ctaButtons.count();
    
    console.log(`✅ Found ${ctaCount} call-to-action elements`);
    console.log(`✅ Found ${promoCount} promotional content pieces`);
    
    expect(ctaCount).toBeGreaterThan(0);
  });
});
