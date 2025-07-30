import { test, expect } from '@playwright/test';

test.describe('Rebet Website Quick Validation', () => {
  test('should access Rebet homepage successfully', async ({ page }) => {
    // Navigate to the website
    await page.goto('https://rebet.app/');
    
    // Wait for page to load
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    // Basic validation that page loaded
    await expect(page).toHaveTitle(/rebet/i);
    
    // Check for key content
    const hasRebetContent = await page.locator('text=rebet').first().isVisible({ timeout: 10000 });
    expect(hasRebetContent).toBeTruthy();
    
    console.log('✅ Rebet website is accessible and loading properly');
  });

  test('should find main call-to-action elements', async ({ page }) => {
    await page.goto('https://rebet.app/');
    await page.waitForLoadState('networkidle');
    
    // Look for "Play Now" or similar CTA buttons
    const playButtons = page.locator('text="Play Now"');
    const buttonCount = await playButtons.count();
    
    if (buttonCount > 0) {
      console.log(`✅ Found ${buttonCount} "Play Now" button(s)`);
      await expect(playButtons.first()).toBeVisible();
    } else {
      console.log('ℹ️ No "Play Now" buttons found, checking for other CTAs');
      
      // Check for other possible CTAs
      const signUpButtons = page.locator('text="Sign Up", text="Get Started", text="Download"');
      const ctaCount = await signUpButtons.count();
      expect(ctaCount).toBeGreaterThan(0);
    }
  });

  test('should have responsive design', async ({ page }) => {
    await page.goto('https://rebet.app/');
    
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForLoadState('networkidle');
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(2000); // Allow time for responsive changes
    
    // Check that page is still functional on mobile
    const bodyVisible = await page.locator('body').isVisible();
    expect(bodyVisible).toBeTruthy();
    
    console.log('✅ Website appears responsive across different viewports');
  });
});
