#!/usr/bin/env node

/**
 * CI Validation Script
 * Helps debug and validate Playwright setup for CI environments
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Validating Playwright CI Setup...\n');

// Check if we're in CI
const isCI = process.env.CI === 'true';
console.log(`Environment: ${isCI ? 'CI' : 'Local'}`);

// Check Node version
const nodeVersion = process.version;
console.log(`Node.js Version: ${nodeVersion}`);

// Check if playwright.config.ts exists
const configPath = path.join(__dirname, '..', 'playwright.config.ts');
const configExists = fs.existsSync(configPath);
console.log(`Playwright Config: ${configExists ? '✅ Found' : '❌ Missing'}`);

// Check package.json dependencies
const packagePath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const hasPlaywright = packageJson.devDependencies && packageJson.devDependencies['@playwright/test'];
  console.log(`Playwright Dependency: ${hasPlaywright ? '✅ Found' : '❌ Missing'}`);
  
  if (hasPlaywright) {
    console.log(`Playwright Version: ${packageJson.devDependencies['@playwright/test']}`);
  }
}

// Try to run playwright commands
try {
  console.log('\n🧪 Testing Playwright Commands...');
  
  // Check Playwright version
  const version = execSync('npx playwright --version', { encoding: 'utf8' });
  console.log(`✅ Playwright Version: ${version.trim()}`);
  
  // List installed browsers
  const browsers = execSync('npx playwright install --dry-run', { encoding: 'utf8' });
  console.log('📦 Browser Installation Status:');
  console.log(browsers);
  
  // Validate projects in config
  const projects = execSync('npx playwright show-report --list', { encoding: 'utf8' }).catch(() => 'Could not list projects');
  console.log('\n🎯 Available Projects:');
  console.log(projects);
  
} catch (error) {
  console.error('❌ Error running Playwright commands:', error.message);
}

console.log('\n✅ Validation Complete!');
console.log('\n💡 If you see errors above, run these commands:');
console.log('   npm ci');
console.log('   npx playwright install --with-deps');
console.log('   npm test');
