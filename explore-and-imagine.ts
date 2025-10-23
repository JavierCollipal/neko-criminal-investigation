#!/usr/bin/env ts-node

import puppeteer, { Browser, Page } from 'puppeteer';

// 🎭 Mario Gallo Bestino leads this Puppeteer performance!
// 🐾 Neko-Arc executes the technical automation
// 🗡️ Noel analyzes the findings
// 🎸 Glam provides reality checks

async function exploreAndImagine() {
  console.log('🎭 Mario: ACT I - THE EXPLORATION BEGINS!');
  console.log('🐾 Neko: Starting visual browser exploration, nyaa~!');
  console.log('');

  const browser: Browser = await puppeteer.launch({
    headless: false,      // 🎭 Visual demonstration (Rule 3.11!)
    slowMo: 250,          // ⚡ Slow down for visibility
    devtools: true,       // 🔍 Open DevTools Console
    defaultViewport: null,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--start-maximized',
      '--auto-open-devtools-for-tabs'
    ]
  });

  const page: Page = await browser.newPage();

  console.log('👁️ WATCH THE BROWSER - Visual exploration starting!');
  console.log('🔍 DevTools Console is open - see errors there!');
  console.log('');

  // Error monitoring
  const discoveredIssues: string[] = [];
  const featureIdeas: string[] = [];

  page.on('console', msg => {
    const type = msg.type();
    if (type === 'error') {
      const error = `❌ [CONSOLE ERROR]: ${msg.text()}`;
      console.log(error);
      discoveredIssues.push(error);
    }
  });

  page.on('pageerror', (error: unknown) => {
    const err = `🚨 PAGE ERROR: ${error}`;
    console.log(err);
    discoveredIssues.push(err);
  });

  try {
    console.log('🎭 Mario: ACT II - NAVIGATING TO THE INVESTIGATION STAGE!');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('🐾 Neko: Analyzing current page structure, nyaa~!');

    // Check what elements exist
    const pageTitle = await page.title();
    console.log(`📝 Page Title: ${pageTitle}`);

    // Check for search box
    const hasSearchBox = await page.$('input[type="search"], input[placeholder*="Search"], input[placeholder*="search"]');
    if (!hasSearchBox) {
      featureIdeas.push('💡 Add SEARCH BOX for filtering criminal profiles');
    } else {
      console.log('✅ Search box found');
    }

    // Check for filter buttons
    const hasFilters = await page.$('[class*="filter"], [id*="filter"]');
    if (!hasFilters) {
      featureIdeas.push('💡 Add FILTER BUTTONS (by threat level, category, region)');
    } else {
      console.log('✅ Filters found');
    }

    // Check for statistics dashboard
    const hasStats = await page.$('[class*="stat"], [class*="dashboard"]');
    if (!hasStats) {
      featureIdeas.push('💡 Add STATISTICS DASHBOARD (total actors, threat level breakdown, regional distribution)');
    } else {
      console.log('✅ Statistics found');
    }

    // Check for export button
    const hasExport = await page.$('button:has-text("Export"), [class*="export"]');
    if (!hasExport) {
      featureIdeas.push('💡 Add EXPORT BUTTON (Download profiles as JSON/CSV)');
    }

    // Check for timeline/history view
    const hasTimeline = await page.$('[class*="timeline"]');
    if (!hasTimeline) {
      featureIdeas.push('💡 Add TIMELINE VIEW (chronological visualization of criminal activities)');
    }

    // Check for detailed modal/popup
    const hasModal = await page.$('[role="dialog"], .modal');
    if (!hasModal) {
      featureIdeas.push('💡 Add DETAILED PROFILE MODAL (click to see full criminal details)');
    }

    // Scroll down to see content
    console.log('👁️ Mario: Scrolling to reveal more content...');
    await page.evaluate(() => window.scrollTo(0, 500));
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Check for cards/profiles
    const profileCards = await page.$$('[class*="card"], article, [class*="profile"]');
    console.log(`📊 Found ${profileCards.length} profile cards on page`);

    if (profileCards.length === 0) {
      featureIdeas.push('💡 CRITICAL: Add PROFILE CARDS to display criminal actors');
    }

    // Check for pagination
    const hasPagination = await page.$('[class*="pagination"], [aria-label="pagination"]');
    if (!hasPagination) {
      featureIdeas.push('💡 Add PAGINATION for large datasets');
    }

    // Check for sorting
    const hasSorting = await page.$('[class*="sort"], select[name="sort"]');
    if (!hasSorting) {
      featureIdeas.push('💡 Add SORTING OPTIONS (by name, threat level, date)');
    }

    // Screenshot
    console.log('📸 Capturing screenshot of current state...');
    await page.screenshot({ path: '/tmp/current-app-state.png', fullPage: true });
    console.log('✅ Screenshot saved: /tmp/current-app-state.png');

    console.log('');
    console.log('🎭 Mario: ACT III - THE ANALYSIS FINALE!');
    console.log('═══════════════════════════════════════════════════════');

    // Summary
    console.log('');
    console.log('🔍 DISCOVERED ISSUES:');
    if (discoveredIssues.length === 0) {
      console.log('   ✅ No critical errors found, nyaa~!');
    } else {
      discoveredIssues.forEach(issue => console.log(`   ${issue}`));
    }

    console.log('');
    console.log('💡 NEW FEATURE IDEAS (Based on Exploration):');
    featureIdeas.forEach((idea, idx) => {
      console.log(`   ${idx + 1}. ${idea}`);
    });

    console.log('');
    console.log('🗡️ Noel: Analysis complete. Recommendations ready for implementation.');
    console.log('🎸 Glam: Perfecto, hermano! Ahora sabemos qué implementar, weon.');
    console.log('');
    console.log('🎭 Mario: CURTAIN CALL! The exploration performance is complete!');
    console.log('🐾 Neko: Ready to implement new features, nyaa~!');

  } catch (error: unknown) {
    console.error('❌ Exploration error:', error);
  } finally {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await browser.close();
    console.log('');
    console.log('✅ Browser closed. Feature brainstorming complete!');
  }
}

exploreAndImagine();
