#!/usr/bin/env ts-node

import puppeteer, { Browser, Page } from 'puppeteer';

const VERCEL_URL = 'https://frontend-932zikqmi-javier-collipal-aguilars-projects.vercel.app';

async function testFixedDeployment() {
  console.log('🎭 Mario: THE FINAL VERIFICATION PERFORMANCE!');
  console.log('🐾 Neko: Testing fixed deployment, nyaa~!');
  console.log('🗡️ Noel: Verifying MongoDB connection works.\n');

  const browser: Browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    devtools: true,
    defaultViewport: null,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--start-maximized',
      '--auto-open-devtools-for-tabs'
    ]
  });

  console.log('👀 WATCH the browser test the fixed deployment!');
  console.log('🔍 DevTools Console open - monitoring for errors!\n');

  const page: Page = await browser.newPage();
  const errors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.log(`❌ [ERROR]: ${msg.text()}`);
      errors.push(msg.text());
    }
  });

  page.on('pageerror', (error) => {
    console.log(`🚨 [PAGE ERROR]: ${error.message}`);
    errors.push(`PAGE: ${error.message}`);
  });

  try {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('🎭 ACT I: LOADING THE PAGE');
    console.log('═══════════════════════════════════════════════════════════\n');

    await page.goto(VERCEL_URL, { waitUntil: 'networkidle0', timeout: 30000 });
    console.log('✅ Page loaded!\n');

    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('═══════════════════════════════════════════════════════════');
    console.log('🎭 ACT II: CHECKING FOR DATA');
    console.log('═══════════════════════════════════════════════════════════\n');

    // Wait for profiles to load
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Check if profiles loaded
    const profileCount = await page.$$eval('[data-testid="profile-card"], .profile-card, .criminal-profile',
      elements => elements.length
    );

    console.log(`📊 Profiles found on page: ${profileCount}`);

    // Check for "Failed to fetch" text
    const pageText = await page.evaluate(() => document.body.textContent || '');
    const hasError = pageText.toLowerCase().includes('failed to fetch');

    if (hasError) {
      console.log('❌ Still has "Failed to fetch" error!');
    } else {
      console.log('✅ No "Failed to fetch" error found!');
    }

    // Take screenshot
    const screenshot = `/home/wakibaka/Documents/github/neko-criminal-investigation/test-fixed-${Date.now()}.png`;
    await page.screenshot({ path: screenshot as string, fullPage: true });
    console.log(`\n📸 Screenshot: ${screenshot}\n`);

    console.log('═══════════════════════════════════════════════════════════');
    console.log('🗡️ FINAL VERDICT:');
    console.log('═══════════════════════════════════════════════════════════\n');

    if (errors.length === 0 && !hasError && profileCount > 0) {
      console.log('✅ ✅ ✅ DEPLOYMENT WORKING PERFECTLY! ✅ ✅ ✅');
      console.log(`✅ ${profileCount} criminal profiles loaded from MongoDB!`);
      console.log('✅ No console errors!');
      console.log('✅ API connection successful!');
    } else {
      console.log('⚠️ Issues detected:');
      if (errors.length > 0) console.log(`   - ${errors.length} console errors`);
      if (hasError) console.log('   - "Failed to fetch" still present');
      if (profileCount === 0) console.log('   - No profiles loaded');
    }

    console.log('\n🎭 Mario: The performance concludes!');
    console.log('🐾 Neko: Testing complete, nyaa~!');
    console.log('🗡️ Noel: Analysis finished.\n');

  } catch (error: any) {
    console.error('❌ Test error:', error.message);
  } finally {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('Press Ctrl+C when done inspecting...');
    console.log('═══════════════════════════════════════════════════════════');
    await new Promise(resolve => setTimeout(resolve, 60000));
    await browser.close();
  }
}

testFixedDeployment();
