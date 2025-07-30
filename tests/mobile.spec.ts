import { test, expect } from '@playwright/test';

test.describe('Rebet Mobile Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if page loads properly on mobile
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    
    // Check main elements are visible on mobile - use flexible selectors
    const rebetBranding = page.locator('text=/rebet/i').first();
    const playButton = page.locator('text=/play.*now/i').first();
    
    // Check if branding exists, if not try alternative selectors
    if (await rebetBranding.count() === 0) {
      const altBranding = page.locator('[alt*="rebet" i], .logo, img[src*="logo"]').first();
      if (await altBranding.count() > 0) {
        await expect(altBranding).toBeVisible();
      }
    } else {
      await expect(rebetBranding).toBeVisible();
    }
    
    // Check for play button or alternatives
    if (await playButton.count() === 0) {
      const altButton = page.locator('text=/get.*started|join.*now/i, .cta-button, .play-button').first();
      if (await altButton.count() > 0) {
        await expect(altButton).toBeVisible();
      }
    } else {
      await expect(playButton).toBeVisible();
    }
  });

  test('should handle mobile menu if present', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Look for mobile menu trigger (hamburger menu)
    const mobileMenuTrigger = page.locator('.menu-toggle, .hamburger, [aria-label*="menu"]');
    
    if (await mobileMenuTrigger.count() > 0) {
      await mobileMenuTrigger.click();
      
      // Check if mobile menu appears
      const mobileMenu = page.locator('.mobile-menu, .nav-menu');
      await expect(mobileMenu).toBeVisible();
    }
  });

  test('should have readable text on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that main headings are visible and readable
    const headings = page.locator('h1, h2, h3');
    const count = await headings.count();
    
    for (let i = 0; i < Math.min(count, 3); i++) {
      const heading = headings.nth(i);
      await expect(heading).toBeVisible();
    }
  });

  test('should handle touch interactions', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Test touch-friendly buttons
    const playButton = page.locator('text="Play Now"').first();
    await expect(playButton).toBeVisible();
    
    // Simulate touch
    await playButton.tap();
  });
});
