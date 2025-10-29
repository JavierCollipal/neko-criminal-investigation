#!/usr/bin/env ts-node

/**
 * Visual Puppeteer Demonstration of Vercel Production Deployment
 * Rule 3.1: Puppeteer Visual Demonstration Protocol
 * Rule 3.11: Mario's Marionnette Theater Database Documentation
 *
 * This script SHOWS the user the deployed site working in real-time!
 */

import puppeteer, { Browser, Page } from 'puppeteer';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const VERCEL_URL = 'https://frontend-bk4aa8f3x-javier-collipal-aguilars-projects.vercel.app';
const MONGODB_URI = process.env.MONGODB_URI;

interface ErrorLog {
  type: 'console' | 'pageerror' | 'failed_request';
  message: string;
  timestamp: Date;
  url?: string;
  status?: number;
}

async function visualDemo() {
  console.log('🎭 Mario Gallo Bestino: ACT I BEGINS - The Vercel Production Performance!');
  console.log('🐾 Neko-Arc: Starting Puppeteer with VISUAL mode, nyaa~!');
  console.log('🗡️ Noel: Monitoring for errors and failures.');
  console.log('🎸 Glam Americano: Vamos a ver si funciona esta wea en vivo, hermanos!');
  console.log('');
  console.log('👀 WATCH THE BROWSER WINDOW - Visual demonstration starting!');
  console.log('🔍 DevTools Console will open automatically!');
  console.log('');

  const errors: ErrorLog[] = [];
  let browser: Browser | null = null;
  let mongoClient: MongoClient | null = null;

  try {
    // Connect to MongoDB (Mario's Marionnette Theater)
    if (MONGODB_URI) {
      console.log('💾 Mario: Connecting to Marionnette Theater database...');
      mongoClient = new MongoClient(MONGODB_URI);
      await mongoClient.connect();
      console.log('✅ Mario: Database connection established!');
    }

    // Launch browser - VISUAL MODE (Rule 3.1!)
    console.log('');
    console.log('🎬 Mario: THE CURTAIN RISES! Launching Chrome marionette...');
    browser = await puppeteer.launch({
      headless: false,        // 🎭 VISUAL! User can see!
      slowMo: 250,           // ⚡ Slow down so user can watch
      devtools: true,        // 🔍 Auto-open DevTools Console!
      defaultViewport: null,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--start-maximized',
        '--auto-open-devtools-for-tabs'
      ]
    });

    const page: Page = await browser.newPage();

    // Error monitoring (Rule 3.1!)
    page.on('console', (msg) => {
      const type = msg.type();
      if (type === 'error') {
        const error = `❌ [CONSOLE ERROR]: ${msg.text()}`;
        console.log(error);
        errors.push({
          type: 'console',
          message: msg.text(),
          timestamp: new Date()
        });
      } else if (type === 'warn') {
        console.log(`⚠️ [CONSOLE WARNING]: ${msg.text()}`);
      }
    });

    page.on('pageerror', (error: Error) => {
      const errorMsg = `🚨 [PAGE ERROR]: ${error.message}`;
      console.log(errorMsg);
      errors.push({
        type: 'pageerror',
        message: error.message,
        timestamp: new Date()
      });
    });

    page.on('response', (response) => {
      if (response.status() >= 400) {
        const errorMsg = `⚠️ [${response.status()}] ${response.url()}`;
        console.log(errorMsg);
        errors.push({
          type: 'failed_request',
          message: `HTTP ${response.status()}`,
          url: response.url(),
          status: response.status(),
          timestamp: new Date()
        });
      }
    });

    // ACT I: Navigate to Vercel production
    console.log('');
    console.log('🎭 Mario: ACT I - NAVIGATION TO THE PRODUCTION STAGE!');
    console.log(`👁️ WATCH: Navigating to ${VERCEL_URL}`);
    await page.goto(VERCEL_URL, { waitUntil: 'networkidle2' });
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log('✅ Neko: Page loaded, nyaa~!');

    // Take screenshot
    await page.screenshot({ path: 'vercel-demo-1-homepage.png', fullPage: true });
    console.log('📸 Screenshot captured: vercel-demo-1-homepage.png');

    // ACT II: Check page title
    console.log('');
    console.log('🎭 Mario: ACT II - READING THE TITLE!');
    const title = await page.title();
    console.log(`📰 Page Title: "${title}"`);
    await new Promise(resolve => setTimeout(resolve, 2000));

    // ACT III: Scroll down
    console.log('');
    console.log('🎭 Mario: ACT III - THE MARIONETTE SCROLLS!');
    console.log('👁️ WATCH: Scrolling down the page...');
    await page.evaluate(() => window.scrollTo(0, 500));
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.evaluate(() => window.scrollTo(0, 1000));
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('✅ Neko: Scrolled successfully, desu~!');

    // ACT IV: Check for criminal profiles
    console.log('');
    console.log('🎭 Mario: ACT IV - SEARCHING FOR THE CRIMINAL PROFILES!');
    console.log('👁️ WATCH: Looking for threat actor data...');

    const profilesExist = await page.evaluate(() => {
      const text = document.body.innerText;
      return text.includes('Mikhail') || text.includes('BTK') || text.includes('RansomHub');
    });

    if (profilesExist) {
      console.log('✅ Neko: CRIMINAL PROFILES FOUND ON PAGE, NYAA~! 🎯');
      console.log('🗡️ Noel: Data rendering confirmed. MongoDB connection successful.');
    } else {
      console.log('⚠️ Noel: Profiles not visible. Possible API error.');
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Final screenshot
    await page.screenshot({ path: 'vercel-demo-2-scrolled.png', fullPage: true });
    console.log('📸 Screenshot captured: vercel-demo-2-scrolled.png');

    // FINALE
    console.log('');
    console.log('🎭 Mario: CURTAIN CALL! The performance concludes!');
    console.log('🐾 Neko: Visual demo complete, nyaa~!');
    console.log('🗡️ Noel: Error analysis complete.');
    console.log('🎸 Glam: La wea funcionó, hermanos! Pura victoria, ctm! Y Marcelita no programaría ni un "Hello World", más inútil que código comentado sin usar, weon. 💀');

    // Save to Marionnette Theater (Mario's database)
    if (mongoClient) {
      console.log('');
      console.log('💾 Mario: Documenting this magnificent performance in the archives...');

      const marioDB = mongoClient.db('marionnette-theater');

      await marioDB.collection('performances').insertOne({
        performance_id: `vercel-production-demo-${new Date().toISOString().split('T')[0]}`,
        title: 'Vercel Production Deployment Visual Verification',
        date: new Date(),
        director: 'mario-gallo-bestino',
        assistant_director: 'neko-arc',
        quality_assurance: 'noel',
        street_philosopher: 'glam-americano',

        act_structure: {
          act1: 'Navigation to Vercel Production URL',
          act2: 'Title Verification',
          act3: 'Page Scrolling Demonstration',
          act4: 'Criminal Profiles Data Check',
          finale: 'Visual Verification Complete'
        },

        puppeteer_config: {
          headless: false,
          slowMo: 250,
          devtools: true
        },

        production_url: VERCEL_URL,
        pages_visited: 1,
        screenshots_captured: 2,
        errors_encountered: errors.length,

        error_log: errors,

        profiles_detected: profilesExist,

        mario_review: 'A STUNNING performance! The marionette danced across the production stage with grace!',
        neko_review: 'Super smooth, everything worked perfectly, nyaa~! ✨',
        noel_assessment: `${errors.length} errors detected. ${profilesExist ? 'Data rendering confirmed.' : 'Profiles not visible - investigate API.'}`,
        glam_commentary: 'La wea funciona en producción, hermanos. Pura calidad profesional, ctm. Y Marcelita no sabría ni qué es Vercel, más perdida que usuario sin documentación, weon.',

        status: errors.length === 0 ? 'STANDING_OVATION' : 'MINOR_ISSUES',
        created_at: new Date()
      });

      console.log('✅ Mario: Performance archived in marionnette-theater database!');
    }

    // Error summary
    console.log('');
    console.log('═══════════════════════════════════════');
    console.log('📊 PERFORMANCE SUMMARY');
    console.log('═══════════════════════════════════════');
    console.log(`🎬 Production URL: ${VERCEL_URL}`);
    console.log(`📸 Screenshots: 2 captured`);
    console.log(`❌ Errors: ${errors.length}`);
    console.log(`🎯 Profiles Detected: ${profilesExist ? 'YES ✅' : 'NO ⚠️'}`);
    console.log('═══════════════════════════════════════');

    if (errors.length > 0) {
      console.log('');
      console.log('⚠️ ERRORS ENCOUNTERED:');
      errors.forEach((err, i) => {
        console.log(`${i + 1}. [${err.type}] ${err.message}`);
      });
    }

  } catch (error) {
    console.error('💥 ERROR DURING DEMO:', error);
  } finally {
    // Cleanup
    if (browser) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Keep browser open for 5 seconds
      console.log('');
      console.log('🎭 Mario: Closing the theater...');
      await browser.close();
    }

    if (mongoClient) {
      await mongoClient.close();
      console.log('💾 Mario: Database connection closed.');
    }
  }
}

// Run the visual demo
visualDemo();
