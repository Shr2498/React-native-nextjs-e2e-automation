import { Page } from '@playwright/test';

export class RebetPageHelpers {
  constructor(private readonly page: Page) {}

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async scrollToElement(selector: string) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  async clickPlayNowButton() {
    const playButton = this.page.locator('text="Play Now"').first();
    await playButton.click();
  }

  async navigateToSection(sectionName: string) {
    const sectionSelector = `text="${sectionName}"`;
    await this.scrollToElement(sectionSelector);
    return this.page.locator(sectionSelector);
  }

  async checkImageLoaded(imageSelector: string): Promise<boolean> {
    const image = this.page.locator(imageSelector);
    return await image.evaluate((el: HTMLImageElement) => {
      return el.complete && el.naturalHeight !== 0;
    });
  }

  async getPageLoadTime(): Promise<number> {
    return await this.page.evaluate(() => {
      // Use modern Performance API instead of deprecated timing
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        return navigation.loadEventEnd - navigation.fetchStart;
      }
      // Fallback to Date.now() if navigation timing is not available
      return Date.now();
    });
  }

  async takeScreenshotOnFailure(testName: string) {
    await this.page.screenshot({ 
      path: `screenshots/${testName}-failure.png`,
      fullPage: true 
    });
  }

  async checkAccessibility() {
    // Basic accessibility checks
    const images = this.page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      if (!alt || alt.trim() === '') {
        console.warn(`Image ${i} missing alt text`);
      }
    }
  }
}

export class TestDataHelpers {
  static getTestUrls() {
    return {
      homepage: '/',
      contact: '/contact-us',
      faq: '/faq',
      privacy: '/privacy-policy',
      terms: '/terms-of-use',
      blog: '/blog',
      play: 'https://play.rebet.app/'
    };
  }

  static getTestSelectors() {
    return {
      playButton: 'text="Play Now"',
      navigation: 'nav, .menu, .navigation',
      footer: 'footer, text="Copyright"',
      reviews: 'text="What Do Our Users Think"',
      faq: 'text="Frequently"',
      socialSports: 'text="Social Sports"',
      casinoGames: 'text="Casino Style Games"',
      challengeFriends: 'text="Challenge your"'
    };
  }

  static getMobileViewports() {
    return {
      iPhone: { width: 375, height: 667 },
      iPad: { width: 768, height: 1024 },
      androidPhone: { width: 360, height: 640 },
      androidTablet: { width: 800, height: 1280 }
    };
  }
}
