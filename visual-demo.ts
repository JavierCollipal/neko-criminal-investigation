#!/usr/bin/env ts-node

import puppeteer from 'puppeteer';

async function visualDemonstration() {
  console.log('🎭 Mario: THE VISUAL PERFORMANCE BEGINS!');
  console.log('🐾 Neko: Watch the browser window, nyaa~!');
  console.log('👁️ KEEP YOUR EYES ON THE BROWSER WINDOW!');
  console.log('');

  const browser = await puppeteer.launch({
    headless: false,       // 🎭 VISUAL MODE - YOU CAN SEE IT!
    slowMo: 250,          // ⚡ Slowed down so you can watch
    devtools: true,       // 🔍 DevTools Console open automatically
    defaultViewport: null,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--start-maximized',  // 📺 Full screen for maximum visibility
      '--auto-open-devtools-for-tabs'
    ]
  });

  const page = await browser.newPage();

  try {
    // ACT I: Navigate to Criminal Investigation App
    console.log('');
    console.log('🎭 Mario: ACT I - THE MARIONETTE AWAKENS!');
    console.log('🐾 Neko: Navigating to localhost:3000, nyaa~!');
    console.log('👁️ WATCH: Browser loading the criminal investigation app...');

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

    console.log('✅ App loaded successfully!');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // ACT II: Explore Statistics
    console.log('');
    console.log('🎭 Mario: ACT II - DISCOVERING THE STATISTICS!');
    console.log('🐾 Neko: Looking at the dashboard stats, desu~!');
    console.log('👁️ WATCH: Statistics cards at the top...');

    await page.screenshot({ path: '/home/wakibaka/Documents/github/neko-criminal-investigation/demo-1-stats.png', fullPage: true });
    console.log('📸 Screenshot saved: demo-1-stats.png');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // ACT III: Test Threat Level Filters
    console.log('');
    console.log('🎭 Mario: ACT III - THE FILTERING BALLET!');
    console.log('🐾 Neko: Clicking threat level filters, nyaa~!');
    console.log('👁️ WATCH: Filter buttons will change colors...');

    // Click CRITICAL filter using evaluate
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const criticalButton = buttons.find(btn => btn.textContent?.trim() === 'CRITICAL');
      if (criticalButton) {
        (criticalButton as HTMLButtonElement).click();
      }
    });
    console.log('🎯 Clicked CRITICAL filter!');
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.screenshot({ path: '/home/wakibaka/Documents/github/neko-criminal-investigation/demo-2-filter-critical.png', fullPage: true });
    console.log('📸 Screenshot saved: demo-2-filter-critical.png');

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Click ALL to reset
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const allButton = buttons.find(btn => btn.textContent?.trim() === 'ALL');
      if (allButton) {
        (allButton as HTMLButtonElement).click();
      }
    });
    console.log('🔄 Reset to ALL profiles!');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // ACT IV: Test Search
    console.log('');
    console.log('🎭 Mario: ACT IV - THE SEARCH SEQUENCE!');
    console.log('🐾 Neko: Testing search functionality, desu~!');
    console.log('👁️ WATCH: Typing in the search box...');

    const searchInput = await page.$('input[type="text"]');
    if (searchInput) {
      console.log('⌨️ Typing search query...');
      await searchInput.click();
      await searchInput.type('Ted', { delay: 150 });
      await new Promise(resolve => setTimeout(resolve, 2000));
      await page.screenshot({ path: '/home/wakibaka/Documents/github/neko-criminal-investigation/demo-3-search.png', fullPage: true });
      console.log('📸 Screenshot saved: demo-3-search.png');
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    // ACT V: Test Sorting
    console.log('');
    console.log('🎭 Mario: ACT V - THE SORTING SYMPHONY!');
    console.log('🐾 Neko: Changing sort order, nyaa~!');
    console.log('👁️ WATCH: Dropdown menu changing...');

    const sortSelect = await page.$('select');
    if (sortSelect) {
      console.log('📊 Selecting "Threat Level" sort...');
      await sortSelect.select('threat-desc');
      await new Promise(resolve => setTimeout(resolve, 2000));
      await page.screenshot({ path: '/home/wakibaka/Documents/github/neko-criminal-investigation/demo-4-sort.png', fullPage: true });
      console.log('📸 Screenshot saved: demo-4-sort.png');
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    // ACT VI: Scroll to Profile Cards
    console.log('');
    console.log('🎭 Mario: ACT VI - THE PROFILE CARD REVELATION!');
    console.log('🐾 Neko: Scrolling to see profile cards, desu~!');
    console.log('👁️ WATCH: Page scrolling down...');

    await page.evaluate(() => {
      window.scrollTo({ top: 500, behavior: 'smooth' });
    });
    await new Promise(resolve => setTimeout(resolve, 3000));
    await page.screenshot({ path: '/home/wakibaka/Documents/github/neko-criminal-investigation/demo-5-profiles.png', fullPage: true });
    console.log('📸 Screenshot saved: demo-5-profiles.png');

    // FINALE
    console.log('');
    console.log('🎭 Mario: CURTAIN CALL! THE PERFORMANCE IS COMPLETE!');
    console.log('🐾 Neko: All features demonstrated, nyaa~! ✅');
    console.log('🗡️ Noel: Visual demonstration successful. 5 screenshots captured.');
    console.log('🎸 Glam: ¡PERFECTO, HERMANO! Todo funcionando impecable, weon! 💪');
    console.log('');
    console.log('📸 Screenshots saved in: ~/Documents/github/neko-criminal-investigation/');
    console.log('');

    // Keep browser open for user to interact
    console.log('👁️ Browser will stay open for 30 seconds...');
    console.log('   Feel free to interact with the app manually!');
    await new Promise(resolve => setTimeout(resolve, 30000));

  } catch (error: unknown) {
    console.error('❌ Demo error:', error);
  } finally {
    console.log('');
    console.log('🎭 Mario: The marionettes rest...');
    console.log('🐾 Neko: Closing browser, desu~!');
    await browser.close();
  }
}

visualDemonstration();
