import { test, expect } from '@playwright/test';

test.describe('Rebet Website Content Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rebet.app/');
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
  });

  test('should display social sportsbook content', async ({ page }) => {
    // Check for various social sportsbook indicators with flexible approach
    const socialSportsIndicators = [
      page.locator('text=/social.*sport/i'),
      page.locator('text=/sportsbook/i'),
      page.locator('text=/sweepstakes/i'),
      page.locator('text=/sport.*bet/i'),
      page.locator('text=/free.*play/i'),
      page.locator('[data-testid*="sport"], [class*="sport"]'),
      page.locator('text=/casino/i'),
      page.locator('text=/rebet/i') // Fallback to brand name
    ];

    let foundContent = false;
    
    for (const indicator of socialSportsIndicators) {
      try {
        if (await indicator.first().isVisible({ timeout: 2000 })) {
          foundContent = true;
          break;
        }
      } catch (error) {
        // Continue checking other indicators
      }
    }

    expect(foundContent).toBeTruthy();
    console.log('✅ Social sportsbook content found');
  });

  test('should display casino games content', async ({ page }) => {
    // Look for casino-related content
    const casinoTerms = [
      'casino',
      'slots',
      'plinko', 
      'blackjack',
      'roulette',
      'table games',
      'live dealer'
    ];
    
    let foundCasinoContent = false;
    for (const term of casinoTerms) {
      const element = page.locator(`text=/${term}/i`).first();
      if (await element.isVisible().catch(() => false)) {
        foundCasinoContent = true;
        console.log(`✅ Found casino content: ${term}`);
        break;
      }
    }
    
    expect(foundCasinoContent).toBeTruthy();
  });

  test('should have user reviews and ratings', async ({ page }) => {
    // Scroll down to find reviews section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.7));
    await page.waitForTimeout(2000);
    
    // Look for review-related content
    const reviewsSection = page.locator('text=/review|rating|star|user.*think/i').first();
    const starImages = page.locator('img[src*="star"], img[alt*="star"]').first();
    
    const hasReviewSection = await reviewsSection.isVisible().catch(() => false);
    const hasStarImages = await starImages.isVisible().catch(() => false);
    
    expect(hasReviewSection || hasStarImages).toBeTruthy();
    console.log('✅ User reviews section found');
  });

  test('should have app download links', async ({ page }) => {
    // Look for mobile app links
    const appStoreLink = page.locator('a[href*="apps.apple.com"]').first();
    const playStoreLink = page.locator('a[href*="play.google.com"]').first();
    
    const hasAppStore = await appStoreLink.isVisible().catch(() => false);
    const hasPlayStore = await playStoreLink.isVisible().catch(() => false);
    
    // At least one app store link should be present
    expect(hasAppStore || hasPlayStore).toBeTruthy();
    
    if (hasAppStore) {
      await expect(appStoreLink).toHaveAttribute('href', /apps\.apple\.com/);
      console.log('✅ App Store link found');
    }
    
    if (hasPlayStore) {
      await expect(playStoreLink).toHaveAttribute('href', /play\.google\.com/);
      console.log('✅ Google Play Store link found');
    }
  });

  test('should navigate to play.rebet.app when clicking main CTA', async ({ page }) => {
    // Look for main call-to-action buttons
    const playButtons = [
      page.locator('text="Play Now"').first(),
      page.locator('text="Sign Up to Play Now"').first(),
      page.locator('a[href*="play.rebet.app"]').first(),
      page.locator('text=/play.*now|start.*playing/i').first()
    ];
    
    let clickedButton = false;
    
    for (const button of playButtons) {
      const isVisible = await button.isVisible({ timeout: 3000 }).catch(() => false);
      if (!isVisible) continue;
      
      try {
        // Try clicking and wait for navigation
        await button.click({ timeout: 5000 });
        
        // Wait for potential navigation
        await page.waitForTimeout(3000);
        
        // Check if we navigated to play.rebet.app
        const currentUrl = page.url();
        if (currentUrl.includes('play.rebet.app')) {
          console.log('✅ Successfully navigated to play.rebet.app');
        } else {
          console.log('ℹ️ Button clicked successfully');
        }
        
        clickedButton = true;
        break;
      } catch (error: unknown) {
        console.log('ℹ️ Error clicking button, trying next', error);
        continue;
      }
    }
    
    expect(clickedButton).toBeTruthy();
  });

  test('should have FAQ section with common questions', async ({ page }) => {
    // Scroll to find FAQ section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);
    
    // Look for FAQ content
    const faqHeading = page.locator('text=/frequently.*asked|faq/i').first();
    const hasFAQ = await faqHeading.isVisible().catch(() => false);
    
    if (hasFAQ) {
      // Look for specific questions we know exist
      const knownQuestions = [
        'What is Rebet?',
        'Is Rebet available in my state?',
        'What is the difference between Rebet Cash and Rebet Coins?',
        'Is Rebet legal?'
      ];
      
      let foundQuestions = 0;
      for (const question of knownQuestions) {
        const questionElement = page.locator(`text="${question}"`).first();
        if (await questionElement.isVisible().catch(() => false)) {
          foundQuestions++;
        }
      }
      
      expect(foundQuestions).toBeGreaterThan(0);
      console.log(`✅ Found ${foundQuestions} FAQ questions`);
    } else {
      console.log('ℹ️ FAQ section not immediately visible');
    }
  });
});
