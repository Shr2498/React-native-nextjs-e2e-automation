import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
  // Test directory
  testDir: './tests',
  
  // Run tests in files in parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter to use
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['allure-playwright', { detail: true, outputFolder: 'allure-results' }]
  ],
  
  // Shared settings for all the projects below
  use: {
    // Base URL for your tests
    baseURL: 'https://rebet.app',
    
    // Take screenshot on failure
    screenshot: 'only-on-failure',
    
    // Record video on failure
    video: 'retain-on-failure',
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Global timeout for each action (e.g., click, fill, etc.)
    actionTimeout: 45000,
    
    // Global timeout for navigation (e.g., goto, reload, etc.)
    navigationTimeout: 60000,
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        hasTouch: true  // Enable touch support
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        hasTouch: true,  // Enable touch support
        // Firefox-specific timeout settings (slower browser)
        actionTimeout: 60000,
        navigationTimeout: 90000,
      },
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        hasTouch: true  // Enable touch support
      },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'tablet',
      use: { 
        ...devices['iPad Pro'],
        hasTouch: true  // Enable touch support for tablet
      },
    }
  ],

  // No local server needed - testing live site
  // webServer: undefined,
});
