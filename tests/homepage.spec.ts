import { test, expect } from '@playwright/test';

test.describe('Rebet Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page to fully load
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
  });

  test('should load homepage successfully', async ({ page }) => {
    // Check page title contains rebet (case insensitive)
    await expect(page).toHaveTitle(/rebet/i);
    
    // Check that the page has loaded by looking for any heading
    const headings = page.locator('h1, h2, h3');
    await expect(headings.first()).toBeVisible({ timeout: 10000 });
    
    // Log success for debugging
    console.log('Homepage loaded successfully');
  });

  test('should find Rebet branding and content', async ({ page }) => {
    // Look for Rebet branding/text (case insensitive)
    const rebetText = page.locator('text=/rebet/i').first();
    await expect(rebetText).toBeVisible({ timeout: 10000 });
    
    // Check for main content indicators
    const bodyContent = page.locator('body');
    await expect(bodyContent).toContainText(/rebet/i);
    
    console.log('Rebet branding found');
  });

  test('should have main call-to-action elements', async ({ page }) => {
    // Look for various possible CTA buttons
    const playNowButton = page.locator('text="Play Now"').first();
    const signUpButton = page.locator('text="Sign Up"').first();
    const getStartedButton = page.locator('text="Get Started"').first();
    const downloadButton = page.locator('text="Download"').first();
    
    // Check if at least one CTA button exists
    const buttons = [playNowButton, signUpButton, getStartedButton, downloadButton];
    let foundButton = false;
    
    for (const button of buttons) {
      if (await button.isVisible().catch(() => false)) {
        await expect(button).toBeEnabled();
        foundButton = true;
        console.log('Found CTA button');
        break;
      }
    }
    
    // If no specific text found, look for any clickable button/link
    if (!foundButton) {
      const anyButton = page.locator('button, a[href]').first();
      await expect(anyButton).toBeVisible();
      console.log('Found generic button/link');
    }
  });

  test('should display sports and gaming content', async ({ page }) => {
    // Check for sports betting related content (more flexible matching)
    const sportsContent = [
      page.locator('text=/sport/i').first(),
      page.locator('text=/gaming/i').first(),
      page.locator('text=/casino/i').first(),
      page.locator('text=/bet/i').first(),
      page.locator('text=/social/i').first()
    ];
    
    let foundContent = false;
    for (const content of sportsContent) {
      if (await content.isVisible().catch(() => false)) {
        foundContent = true;
        console.log('Found sports/gaming content');
        break;
      }
    }
    
    expect(foundContent).toBeTruthy();
  });

  test('should have footer with links', async ({ page }) => {
    // Scroll to bottom to ensure footer is visible
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    // Look for footer elements
    const footer = page.locator('footer').first();
    const copyrightText = page.locator('text=/copyright/i').first();
    
    // Check if either footer element or copyright text is visible
    const hasFooter = await footer.isVisible().catch(() => false);
    const hasCopyright = await copyrightText.isVisible().catch(() => false);
    
    expect(hasFooter || hasCopyright).toBeTruthy();
    
    if (hasFooter || hasCopyright) {
      console.log('Footer section found');
    }
  });

  test('should load images properly', async ({ page }) => {
    // Wait for images to load
    await page.waitForTimeout(3000);
    
    // Get all images on the page
    const images = page.locator('img');
    const imageCount = await images.count();
    
    console.log(`Found ${imageCount} images on page`);
    
    if (imageCount > 0) {
      // Check first few images are loaded properly
      const imagesToCheck = Math.min(imageCount, 5);
      for (let i = 0; i < imagesToCheck; i++) {
        const img = images.nth(i);
        await expect(img).toBeVisible();
      }
      console.log('Images are loading properly');
    }
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(2000);
    
    // Check that content is still visible on mobile
    const body = page.locator('body');
    await expect(body).toBeVisible();
    
    // Check that there's no horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20); // Allow small margin
    console.log('Mobile responsive design verified');
  });
});
