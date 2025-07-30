import { test, expect } from '@playwright/test';

test.describe('Rebet End-to-End User Journey Tests', () => {
  
  test('should complete full user discovery journey', async ({ page }) => {
    console.log('🚀 Testing complete user discovery journey...');
    
    // Step 1: Landing on homepage
    await page.goto('https://rebet.app/');
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    const startTime = Date.now();
    console.log('📍 Step 1: Landed on homepage');
    
    // Step 2: Explore main content
    const mainHeading = page.locator('h1, h2').first();
    if (await mainHeading.isVisible()) {
      const headingText = await mainHeading.textContent();
      console.log(`📖 Main heading: "${headingText}"`);
    }
    
    // Step 3: Scroll through key sections
    const sections = [
      { name: 'Sports Gaming', position: 0.3 },
      { name: 'Casino Games', position: 0.5 },
      { name: 'User Reviews', position: 0.7 },
      { name: 'FAQ', position: 0.9 }
    ];
    
    for (const section of sections) {
      await page.evaluate((pos) => {
        window.scrollTo(0, document.body.scrollHeight * pos);
      }, section.position);
      
      await page.waitForTimeout(1500);
      console.log(`📜 Explored ${section.name} section`);
    }
    
    // Step 4: Test primary conversion flow
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);
    
    const ctaButtons = page.locator('text="Play Now", text="Sign Up to Play Now", a[href*="play.rebet.app"]');
    const ctaCount = await ctaButtons.count();
    
    if (ctaCount > 0) {
      console.log(`🎯 Found ${ctaCount} conversion opportunities`);
      
      const primaryCta = ctaButtons.first();
      if (await primaryCta.isVisible()) {
        // Simulate click without actually navigating away
        await primaryCta.hover();
        console.log('👆 Hovered over primary CTA');
        
        // Check if it's properly linked
        const href = await primaryCta.getAttribute('href');
        if (href) {
          console.log(`🔗 CTA links to: ${href}`);
          expect(href).toMatch(/play\.rebet\.app|rebet\.app/);
        }
      }
    }
    
    // Step 5: Explore footer and legal pages
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    // Check footer links with separate selectors to avoid CSS parsing issues
    const privacyLinks = page.locator('a[href*="privacy"]');
    const termsLinks = page.locator('a[href*="terms"]');
    const contactLinks = page.locator('text="Contact Us"');
    
    const privacyCount = await privacyLinks.count();
    const termsCount = await termsLinks.count();
    const contactCount = await contactLinks.count();
    const footerLinkCount = privacyCount + termsCount + contactCount;
    
    console.log(`📄 Found ${footerLinkCount} footer links (privacy: ${privacyCount}, terms: ${termsCount}, contact: ${contactCount})`);
    
    const totalTime = Date.now() - startTime;
    console.log(`⏱️ User journey completed in ${totalTime}ms`);
    expect(totalTime).toBeLessThan(30000); // Should complete within 30 seconds
  });

  test('should validate mobile app promotion effectiveness', async ({ page }) => {
    console.log('📱 Testing mobile app promotion strategy...');
    
    await page.goto('https://rebet.app/');
    await page.waitForLoadState('networkidle');
    
    // Track mobile app mentions and CTAs
    const mobilePromotions = [
      { type: 'App Store Link', selector: 'a[href*="apps.apple.com"]' },
      { type: 'Google Play Link', selector: 'a[href*="play.google.com"]' },
      { type: 'Download Text', selector: 'text=/download.*app|get.*app|mobile.*app/i' },
      { type: 'App Screenshots', selector: 'img[src*="phone"], img[src*="mobile"], img[src*="app"]' },
      { type: 'QR Code', selector: 'img[src*="qr"], [class*="qr"]' }
    ];
    
    const foundPromotions = [];
    for (const promo of mobilePromotions) {
      const elements = page.locator(promo.selector);
      const count = await elements.count();
      
      if (count > 0) {
        foundPromotions.push(`${promo.type} (${count})`);
        console.log(`✅ ${promo.type}: ${count} elements`);
        
        // Test first element of each type
        const firstElement = elements.first();
        if (await firstElement.isVisible()) {
          if (promo.type.includes('Link')) {
            const href = await firstElement.getAttribute('href');
            console.log(`🔗 ${promo.type} URL: ${href}`);
          }
        }
      }
    }
    
    console.log(`📱 Mobile promotion elements: ${foundPromotions.join(', ')}`);
    expect(foundPromotions.length).toBeGreaterThan(0);
  });

  test('should validate conversion funnel optimization', async ({ page }) => {
    console.log('🎯 Testing conversion funnel and user engagement...');
    
    await page.goto('https://rebet.app/');
    await page.waitForLoadState('networkidle');
    
    // Analyze page hierarchy and flow
    const conversionElements = [
      { stage: 'Awareness', selectors: ['h1', 'h2', '[class*="hero"]', '[class*="banner"]'] },
      { stage: 'Interest', selectors: ['text=/feature|benefit|why/i', '[class*="feature"]'] },
      { stage: 'Consideration', selectors: ['text=/review|testimonial|rating/i', 'img[src*="star"]'] },
      { stage: 'Action', selectors: ['button', 'text="Play Now"', 'text="Sign Up"', 'text="Download"'] }
    ];
    
    const funnelData = [];
    for (const stage of conversionElements) {
      let stageElements = 0;
      
      for (const selector of stage.selectors) {
        const elements = page.locator(selector);
        const count = await elements.count();
        stageElements += count;
      }
      
      funnelData.push({ stage: stage.stage, elements: stageElements });
      console.log(`${stage.stage}: ${stageElements} elements`);
    }
    
    // Test engagement triggers
    const engagementTriggers = [
      'text=/free|bonus|match|win/i',
      'text=/limited.*time|exclusive|special/i',
      'text=/join.*now|start.*today|play.*now/i'
    ];
    
    let totalTriggers = 0;
    for (const trigger of engagementTriggers) {
      const elements = page.locator(trigger);
      const count = await elements.count();
      totalTriggers += count;
    }
    
    console.log(`🎣 Engagement triggers: ${totalTriggers}`);
    
    // Validate funnel completeness
    const hasAllStages = funnelData.every(stage => stage.elements > 0);
    console.log(`🎯 Complete conversion funnel: ${hasAllStages}`);
    
    expect(totalTriggers + funnelData.reduce((sum, stage) => sum + stage.elements, 0)).toBeGreaterThan(10);
  });

  test('should test competitive positioning and USPs', async ({ page }) => {
    console.log('🏆 Testing competitive positioning and unique selling propositions...');
    
    await page.goto('https://rebet.app/');
    await page.waitForLoadState('networkidle');
    
    // Look for competitive differentiators
    const competitiveTerms = [
      { category: 'Social Features', terms: ['social', 'community', 'friends', 'share', 'follow'] },
      { category: 'Game Variety', terms: ['variety', 'games', 'options', 'choice', 'entertainment'] },
      { category: 'Innovation', terms: ['first', 'new', 'innovative', 'unique', 'revolutionary'] },
      { category: 'Quality', terms: ['best', 'top', 'premium', 'quality', 'superior'] },
      { category: 'Trust', terms: ['secure', 'safe', 'trusted', 'reliable', 'licensed'] }
    ];
    
    const positioning = [];
    for (const category of competitiveTerms) {
      let categoryScore = 0;
      
      for (const term of category.terms) {
        const elements = page.locator(`text=/${term}/i`);
        const count = await elements.count();
        categoryScore += count;
      }
      
      if (categoryScore > 0) {
        positioning.push(`${category.category} (${categoryScore})`);
        console.log(`✅ ${category.category}: ${categoryScore} mentions`);
      }
    }
    
    // Test unique value propositions
    const uspIndicators = page.locator('text=/why.*rebet|rebet.*difference|unlike.*other/i');
    const uspCount = await uspIndicators.count();
    
    if (uspCount > 0) {
      console.log(`💎 Unique value propositions: ${uspCount}`);
    }
    
    console.log(`🏆 Competitive positioning: ${positioning.join(', ')}`);
    expect(positioning.length).toBeGreaterThan(2);
  });

  test('should validate brand consistency and messaging', async ({ page }) => {
    console.log('🎨 Testing brand consistency and messaging...');
    
    await page.goto('https://rebet.app/');
    await page.waitForLoadState('networkidle');
    
    // Count brand mentions and variations
    const brandVariations = [
      'Rebet',
      'ReBet', 
      'rebet',
      'REBET'
    ];
    
    let totalBrandMentions = 0;
    const brandUsage = [];
    
    for (const variation of brandVariations) {
      const elements = page.locator(`text="${variation}"`);
      const count = await elements.count();
      
      if (count > 0) {
        totalBrandMentions += count;
        brandUsage.push(`${variation} (${count})`);
      }
    }
    
    console.log(`🏷️ Brand mentions: ${totalBrandMentions} total`);
    console.log(`📝 Brand variations: ${brandUsage.join(', ')}`);
    
    // Test consistent messaging themes
    const messagingThemes = [
      { theme: 'Social Gaming', keywords: ['social', 'together', 'community', 'friends'] },
      { theme: 'Entertainment', keywords: ['fun', 'exciting', 'entertainment', 'enjoy'] },
      { theme: 'Innovation', keywords: ['new', 'first', 'innovative', 'groundbreaking'] },
      { theme: 'Accessibility', keywords: ['easy', 'simple', 'accessible', 'user-friendly'] }
    ];
    
    const consistentThemes = [];
    for (const theme of messagingThemes) {
      let themeScore = 0;
      
      for (const keyword of theme.keywords) {
        const elements = page.locator(`text=/${keyword}/i`);
        const count = await elements.count();
        themeScore += count;
      }
      
      if (themeScore >= 2) { // Require at least 2 mentions for consistency
        consistentThemes.push(theme.theme);
        console.log(`✅ Consistent theme: ${theme.theme} (${themeScore} mentions)`);
      }
    }
    
    // Test visual brand elements
    const logoElements = page.locator('img[src*="logo"], img[alt*="logo"], img[alt*="rebet"]');
    const logoCount = await logoElements.count();
    
    console.log(`🎨 Logo elements: ${logoCount}`);
    console.log(`💬 Consistent messaging themes: ${consistentThemes.join(', ')}`);
    
    expect(totalBrandMentions + logoCount + consistentThemes.length).toBeGreaterThan(5);
  });
});
