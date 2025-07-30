import { test, expect } from '@playwright/test';

test.describe('Rebet Cross-Browser & Device Tests', () => {
  
  test('should work consistently across different browsers', async ({ page, browserName }) => {
    console.log(`🌐 Testing on ${browserName} browser...`);
    
    await page.goto('https://rebet.app/');
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    // Browser-specific feature tests
    const title = await page.title();
    expect(title.toLowerCase()).toContain('rebet');
    
    // Test browser-specific behaviors
    if (browserName === 'webkit') {
      console.log('🍎 Testing Safari-specific features...');
      // Safari-specific tests
      const supportsWebP = await page.evaluate(() => {
        const canvas = document.createElement('canvas');
        return canvas.toDataURL('image/webp').startsWith('data:image/webp');
      });
      console.log(`WebP support in Safari: ${supportsWebP}`);
    }
    
    if (browserName === 'firefox') {
      console.log('🦊 Testing Firefox-specific features...');
      // Firefox-specific tests
      const userAgent = await page.evaluate(() => navigator.userAgent);
      expect(userAgent).toContain('Firefox');
    }
    
    if (browserName === 'chromium') {
      console.log('🟢 Testing Chrome-specific features...');
      // Chrome-specific tests
      const chromeFeatures = await page.evaluate(() => {
        return {
          webgl: !!window.WebGLRenderingContext,
          webgl2: !!window.WebGL2RenderingContext,
          serviceWorker: 'serviceWorker' in navigator
        };
      });
      console.log(`Chrome features:`, chromeFeatures);
    }
    
    // Common functionality tests across all browsers
    const hasMainContent = await page.locator('body').textContent();
    expect(hasMainContent?.toLowerCase()).toContain('rebet');
    
    console.log(`✅ ${browserName} browser test completed`);
  });

  test('should adapt to different screen resolutions', async ({ page }) => {
    console.log('📱 Testing responsive design across resolutions...');
    
    const viewports = [
      { name: 'Mobile Small', width: 320, height: 568 },
      { name: 'Mobile Large', width: 414, height: 896 },
      { name: 'Tablet Portrait', width: 768, height: 1024 },
      { name: 'Tablet Landscape', width: 1024, height: 768 },
      { name: 'Desktop Small', width: 1366, height: 768 },
      { name: 'Desktop Large', width: 1920, height: 1080 },
      { name: 'Ultra Wide', width: 2560, height: 1440 }
    ];
    
    await page.goto('https://rebet.app/');
    
    for (const viewport of viewports) {
      console.log(`🔧 Testing ${viewport.name} (${viewport.width}x${viewport.height})`);
      
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(1000);
      
      // Check layout doesn't break
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = viewport.width;
      
      // Allow some flexibility for responsive design
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 50);
      
      // Check content is still visible
      const mainContent = await page.locator('body').isVisible();
      expect(mainContent).toBeTruthy();
      
      // Take screenshot for visual validation
      await page.screenshot({ 
        path: `test-results/viewport-${viewport.name.replace(/\s+/g, '-').toLowerCase()}.png`,
        fullPage: false 
      });
      
      console.log(`✅ ${viewport.name} layout validated`);
    }
  });

  test('should handle touch interactions properly', async ({ page }) => {
    console.log('👆 Testing touch interactions...');
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('https://rebet.app/');
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    // Test touch gestures
    const touchTargets = page.locator('button, a[href], [onclick]');
    const touchCount = await touchTargets.count();
    
    if (touchCount > 0) {
      const firstTarget = touchTargets.first();
      
      if (await firstTarget.isVisible()) {
        // Test tap
        await firstTarget.tap();
        console.log('✅ Tap interaction successful');
        
        // Test touch target size (minimum 44px for accessibility)
        const box = await firstTarget.boundingBox();
        if (box) {
          const isTouchAccessible = box.width >= 44 && box.height >= 44;
          console.log(`📏 Touch target size: ${box.width}x${box.height}px (accessible: ${isTouchAccessible})`);
        }
      }
    }
    
    // Test scroll behavior
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(500);
    
    const scrollPosition = await page.evaluate(() => window.pageYOffset);
    expect(scrollPosition).toBeGreaterThan(0);
    console.log('✅ Touch scrolling functional');
  });

  test('should validate gaming platform features', async ({ page }) => {
    console.log('🎮 Testing gaming platform-specific features...');
    
    await page.goto('https://rebet.app/');
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    // Test for gaming-related interactive elements
    const gamingElements = [
      { name: 'Game Cards', selector: '[class*="game"], [class*="card"], [data-game]' },
      { name: 'Betting Controls', selector: '[class*="bet"], [class*="stake"], input[type="number"]' },
      { name: 'Social Features', selector: '[class*="social"], [class*="share"], [class*="follow"]' },
      { name: 'User Profile', selector: '[class*="profile"], [class*="avatar"], [class*="user"]' },
      { name: 'Balance Display', selector: '[class*="balance"], [class*="coin"], [class*="money"]' }
    ];
    
    const foundElements = [];
    for (const element of gamingElements) {
      const elements = page.locator(element.selector);
      const count = await elements.count();
      
      if (count > 0) {
        foundElements.push(`${element.name} (${count})`);
        console.log(`✅ Found ${element.name}: ${count} elements`);
      }
    }
    
    // Test real-time updates simulation
    const dynamicElements = page.locator('[class*="live"], [class*="update"], [class*="real-time"]');
    const dynamicCount = await dynamicElements.count();
    
    if (dynamicCount > 0) {
      console.log(`⚡ Found ${dynamicCount} potentially dynamic elements`);
    }
    
    console.log(`🎮 Gaming features detected: ${foundElements.join(', ')}`);
    expect(foundElements.length).toBeGreaterThan(0);
  });

  test('should validate social betting features', async ({ page }) => {
    console.log('👥 Testing social betting platform features...');
    
    await page.goto('https://rebet.app/');
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    // Test social interaction elements
    const socialFeatures = [
      { name: 'Follow System', keywords: ['follow', 'friend', 'connect'] },
      { name: 'Comments/Chat', keywords: ['comment', 'chat', 'message'] },
      { name: 'Sharing', keywords: ['share', 'post', 'publish'] },
      { name: 'Leaderboards', keywords: ['leaderboard', 'ranking', 'top'] },
      { name: 'Challenges', keywords: ['challenge', 'compete', 'versus'] }
    ];
    
    const detectedFeatures = [];
    for (const feature of socialFeatures) {
      for (const keyword of feature.keywords) {
        const elements = page.locator(`text=/${keyword}/i`);
        const count = await elements.count();
        
        if (count > 0) {
          detectedFeatures.push(feature.name);
          console.log(`✅ ${feature.name} detected via "${keyword}"`);
          break;
        }
      }
    }
    
    // Test community elements
    const communityElements = page.locator('text=/community|social|together|users/i');
    const communityCount = await communityElements.count();
    
    if (communityCount > 0) {
      console.log(`👥 Community references found: ${communityCount}`);
    }
    
    // Test user-generated content areas
    const ugcElements = page.locator('[class*="feed"], [class*="activity"], [class*="stream"]');
    const ugcCount = await ugcElements.count();
    
    if (ugcCount > 0) {
      console.log(`📱 User content areas detected: ${ugcCount}`);
    }
    
    console.log(`👥 Social features: ${detectedFeatures.join(', ')}`);
    expect(detectedFeatures.length + communityCount + ugcCount).toBeGreaterThan(0);
  });
});
