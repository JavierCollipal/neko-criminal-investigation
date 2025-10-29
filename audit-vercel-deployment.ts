#!/usr/bin/env ts-node

import puppeteer, { Browser, Page } from 'puppeteer';

const VERCEL_URL = 'https://frontend-bh5o5onfq-javier-collipal-aguilars-projects.vercel.app';

async function auditVercelDeployment() {
  console.log('🎭 Mario: THE GRAND VERCEL AUDIT PERFORMANCE BEGINS!');
  console.log('🐾 Neko: Launching Puppeteer in VISUAL mode, nyaa~!');
  console.log('🗡️ Noel: Tactical error analysis protocol engaged.\n');

  const browser: Browser = await puppeteer.launch({
    headless: false,       // 🎭 Visual demonstration (Rule 3.11!)
    slowMo: 250,          // ⚡ Slow down for viewing
    devtools: true,       // 🔍 Open DevTools Console (CRITICAL!)
    defaultViewport: null,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--start-maximized',
      '--auto-open-devtools-for-tabs'
    ]
  });

  console.log('👀 WATCH the browser audit the deployment!');
  console.log('🔍 DevTools Console is open - see all errors!\n');

  const page: Page = await browser.newPage();

  // Collect console errors
  const consoleErrors: string[] = [];
  const networkErrors: string[] = [];
  const failedRequests: Array<{url: string, status: number}> = [];

  // Monitor console messages
  page.on('console', (msg) => {
    const type = msg.type();
    const text = msg.text();

    if (type === 'error') {
      console.log(`❌ [CONSOLE ERROR]: ${text}`);
      consoleErrors.push(text);
    } else if (type === 'warning') {
      console.log(`⚠️ [CONSOLE WARNING]: ${text}`);
    }
  });

  // Monitor page errors
  page.on('pageerror', (error) => {
    console.log('🚨 PAGE ERROR:', error.message);
    consoleErrors.push(`PAGE ERROR: ${error.message}`);
  });

  // Monitor failed requests
  page.on('response', (response) => {
    const status = response.status();
    const url = response.url();

    if (status >= 400) {
      console.log(`⚠️ [${status}] ${url}`);
      failedRequests.push({ url, status });

      if (url.includes('localhost') || url.includes('3001')) {
        networkErrors.push(`DETECTED: Frontend trying to call localhost:3001 (backend not deployed!)`);
      }
    }
  });

  try {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('🎭 ACT I: NAVIGATION TO VERCEL DEPLOYMENT');
    console.log('═══════════════════════════════════════════════════════════\n');

    await page.goto(VERCEL_URL, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    console.log('✅ Page loaded successfully!\n');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Take screenshot
    const screenshot1 = `/home/wakibaka/Documents/github/neko-criminal-investigation/audit-vercel-initial-${Date.now()}.png`;
    await page.screenshot({ path: screenshot1 as string, fullPage: true });
    console.log(`📸 Captured: ${screenshot1}\n`);

    console.log('═══════════════════════════════════════════════════════════');
    console.log('🎭 ACT II: CHECKING FOR API CALLS');
    console.log('═══════════════════════════════════════════════════════════\n');

    // Wait a bit to see if any API calls are made
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Check for "Failed to fetch" text on page
    const pageContent = await page.content();
    const hasFailedToFetch = pageContent.includes('Failed to fetch') ||
                             pageContent.includes('failed to fetch') ||
                             pageContent.includes('Error fetching');

    if (hasFailedToFetch) {
      console.log('🚨 FOUND "Failed to fetch" error message on page!');
    }

    // Try to find any error messages displayed
    const errorElements = await page.$$eval('[class*="error"], [class*="Error"]',
      elements => elements.map(el => el.textContent?.trim() || '').filter(t => t.length > 0)
    );

    if (errorElements.length > 0) {
      console.log('🚨 ERROR MESSAGES FOUND ON PAGE:');
      errorElements.forEach(msg => console.log(`   • ${msg}`));
      console.log();
    }

    console.log('═══════════════════════════════════════════════════════════');
    console.log('🎭 ACT III: ANALYSIS SUMMARY');
    console.log('═══════════════════════════════════════════════════════════\n');

    console.log('📊 AUDIT RESULTS:');
    console.log('─────────────────────────────────────────────────────────\n');

    console.log(`🔴 Console Errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      consoleErrors.forEach((err, i) => {
        console.log(`   ${i + 1}. ${err}`);
      });
    }
    console.log();

    console.log(`⚠️ Failed Requests: ${failedRequests.length}`);
    if (failedRequests.length > 0) {
      failedRequests.forEach((req, i) => {
        console.log(`   ${i + 1}. [${req.status}] ${req.url}`);
      });
    }
    console.log();

    console.log(`🔍 Network Errors Detected: ${networkErrors.length}`);
    if (networkErrors.length > 0) {
      networkErrors.forEach((err, i) => {
        console.log(`   ${i + 1}. ${err}`);
      });
    }
    console.log();

    // DIAGNOSIS
    console.log('═══════════════════════════════════════════════════════════');
    console.log('🗡️ NOEL\'S DIAGNOSIS:');
    console.log('═══════════════════════════════════════════════════════════\n');

    if (networkErrors.some(e => e.includes('localhost'))) {
      console.log('❌ ROOT CAUSE IDENTIFIED:');
      console.log('   Frontend is trying to call http://localhost:3001 API');
      console.log('   But the backend is NOT deployed to Vercel!\n');

      console.log('💡 SOLUTION OPTIONS:');
      console.log('   1. Deploy NestJS backend separately (Railway/Render)');
      console.log('   2. Convert backend to Next.js API routes');
      console.log('   3. Use serverless functions on Vercel');
      console.log('   4. Mock data directly in frontend (demo mode)\n');
    }

    console.log('🎭 Mario: The audit reveals ALL! Our backend performs elsewhere!');
    console.log('🐾 Neko: We need to fix the API endpoint configuration, nyaa~!');
    console.log('🗡️ Noel: Recommended action: Deploy backend or use API routes.\n');

  } catch (error: any) {
    console.error('❌ Error during audit:', error.message);
  } finally {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('Press Ctrl+C to close the browser when you\'re done inspecting...');
    console.log('═══════════════════════════════════════════════════════════');

    // Keep browser open for manual inspection
    await new Promise(resolve => setTimeout(resolve, 60000));
    await browser.close();
  }
}

auditVercelDeployment();
