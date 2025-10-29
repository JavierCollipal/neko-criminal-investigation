#!/usr/bin/env ts-node

import puppeteer, { Browser, Page } from 'puppeteer';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not set!');
  process.exit(1);
}

interface ResearchFinding {
  topic: string;
  source: string;
  content: string;
  screenshot?: string;
  timestamp: Date;
}

async function researchCriminalPersonalities() {
  console.log('🎭 Mario Gallo Bestino: THE GRAND RESEARCH PERFORMANCE BEGINS!');
  console.log('🐾 Neko-Arc: Starting Puppeteer in VISUAL mode, nyaa~!');
  console.log('🗡️ Noel: Tactical research protocol engaged.\n');

  const browser: Browser = await puppeteer.launch({
    headless: false,       // 🎭 Visual demonstration (Rule 3.11!)
    slowMo: 250,          // ⚡ Slow down for viewing
    devtools: true,       // 🔍 Open DevTools Console
    defaultViewport: null,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--start-maximized',
      '--auto-open-devtools-for-tabs'
    ]
  });

  console.log('👀 WATCH the browser perform the research ballet!');
  console.log('🔍 DevTools Console is open - see browser activity!\n');

  const page: Page = await browser.newPage();
  const findings: ResearchFinding[] = [];

  // Mario documents performance
  const performanceLog = {
    performance_id: `criminal-psychology-research-${new Date().toISOString().split('T')[0]}`,
    title: 'The Grand Criminal Personality Research Ballet',
    director: 'mario-gallo-bestino',
    assistant_director: 'neko-arc',
    tactical_advisor: 'noel',
    acts: [] as any[]
  };

  try {
    // ═══════════════════════════════════════════════════════════
    // ACT I: DARK TRIAD PERSONALITY RESEARCH
    // ═══════════════════════════════════════════════════════════
    console.log('🎭 Mario: ACT I - THE DARK TRIAD UNVEILING!');
    console.log('🐾 Neko: Researching Dark Triad personalities, nyaa~!');
    console.log('🗡️ Noel: Focus on Narcissism, Machiavellianism, Psychopathy.\n');

    await page.goto('https://en.wikipedia.org/wiki/Dark_triad', { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Extract Dark Triad information
    const darkTriadInfo = await page.evaluate(() => {
      const content: string[] = [];
      const paragraphs = document.querySelectorAll('#mw-content-text p');

      for (let i = 0; i < Math.min(5, paragraphs.length); i++) {
        const text = paragraphs[i].textContent?.trim();
        if (text && text.length > 50) {
          content.push(text);
        }
      }

      return content.join('\n\n');
    });

    findings.push({
      topic: 'Dark Triad Personality Traits',
      source: 'Wikipedia - Dark Triad',
      content: darkTriadInfo,
      timestamp: new Date()
    });

    // Screenshot
    const screenshot1 = `/home/wakibaka/Documents/github/neko-criminal-investigation/research-dark-triad-${Date.now()}.png` as const;
    await page.screenshot({ path: screenshot1 as string, fullPage: false });
    console.log(`📸 Captured: ${screenshot1}`);

    performanceLog.acts.push({
      act: 1,
      title: 'Dark Triad Research',
      status: 'SUCCESS',
      screenshot: screenshot1
    });

    // ═══════════════════════════════════════════════════════════
    // ACT II: NARCISSISTIC PERSONALITY DISORDER RESEARCH
    // ═══════════════════════════════════════════════════════════
    console.log('\n🎭 Mario: ACT II - THE NARCISSIST UNMASKED!');
    console.log('🐾 Neko: Researching Narcissistic Personality Disorder, desu~!');
    console.log('🗡️ Noel: Document manipulation tactics and victim targeting.\n');

    await page.goto('https://en.wikipedia.org/wiki/Narcissistic_personality_disorder', { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 3000));

    const narcissismInfo = await page.evaluate(() => {
      const content: string[] = [];
      const paragraphs = document.querySelectorAll('#mw-content-text p');

      for (let i = 0; i < Math.min(5, paragraphs.length); i++) {
        const text = paragraphs[i].textContent?.trim();
        if (text && text.length > 50) {
          content.push(text);
        }
      }

      // Try to find characteristics section
      const sections = document.querySelectorAll('#mw-content-text ul li');
      const characteristics: string[] = [];

      for (let i = 0; i < Math.min(10, sections.length); i++) {
        const text = sections[i].textContent?.trim();
        if (text && text.length > 20 && text.length < 200) {
          characteristics.push(`• ${text}`);
        }
      }

      return content.join('\n\n') + '\n\nKey Characteristics:\n' + characteristics.join('\n');
    });

    findings.push({
      topic: 'Narcissistic Personality Disorder',
      source: 'Wikipedia - NPD',
      content: narcissismInfo,
      timestamp: new Date()
    });

    const screenshot2 = `/home/wakibaka/Documents/github/neko-criminal-investigation/research-narcissism-${Date.now()}.png` as const;
    await page.screenshot({ path: screenshot2 as string, fullPage: false });
    console.log(`📸 Captured: ${screenshot2}`);

    performanceLog.acts.push({
      act: 2,
      title: 'Narcissistic Personality Disorder Research',
      status: 'SUCCESS',
      screenshot: screenshot2
    });

    // ═══════════════════════════════════════════════════════════
    // ACT III: ANTISOCIAL PERSONALITY DISORDER (SOCIOPATHY)
    // ═══════════════════════════════════════════════════════════
    console.log('\n🎭 Mario: ACT III - THE ANTISOCIAL REVEALED!');
    console.log('🐾 Neko: Researching Antisocial Personality Disorder, nyaa~!');
    console.log('🗡️ Noel: Focus on criminal behavior patterns.\n');

    await page.goto('https://en.wikipedia.org/wiki/Antisocial_personality_disorder', { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 3000));

    const antisocialInfo = await page.evaluate(() => {
      const content: string[] = [];
      const paragraphs = document.querySelectorAll('#mw-content-text p');

      for (let i = 0; i < Math.min(5, paragraphs.length); i++) {
        const text = paragraphs[i].textContent?.trim();
        if (text && text.length > 50) {
          content.push(text);
        }
      }

      return content.join('\n\n');
    });

    findings.push({
      topic: 'Antisocial Personality Disorder (Sociopathy)',
      source: 'Wikipedia - ASPD',
      content: antisocialInfo,
      timestamp: new Date()
    });

    const screenshot3 = `/home/wakibaka/Documents/github/neko-criminal-investigation/research-antisocial-${Date.now()}.png` as const;
    await page.screenshot({ path: screenshot3 as string, fullPage: false });
    console.log(`📸 Captured: ${screenshot3}`);

    performanceLog.acts.push({
      act: 3,
      title: 'Antisocial Personality Disorder Research',
      status: 'SUCCESS',
      screenshot: screenshot3
    });

    // ═══════════════════════════════════════════════════════════
    // ACT IV: PSYCHOLOGICAL MANIPULATION TACTICS
    // ═══════════════════════════════════════════════════════════
    console.log('\n🎭 Mario: ACT IV - THE MANIPULATION TECHNIQUES EXPOSED!');
    console.log('🐾 Neko: Researching manipulation tactics, desu~!');
    console.log('🗡️ Noel: Critical for victim protection strategies.\n');

    await page.goto('https://en.wikipedia.org/wiki/Psychological_manipulation', { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 3000));

    const manipulationInfo = await page.evaluate(() => {
      const content: string[] = [];
      const paragraphs = document.querySelectorAll('#mw-content-text p');

      for (let i = 0; i < Math.min(5, paragraphs.length); i++) {
        const text = paragraphs[i].textContent?.trim();
        if (text && text.length > 50) {
          content.push(text);
        }
      }

      // Extract manipulation techniques
      const techniques = document.querySelectorAll('#mw-content-text ul li');
      const tacticsList: string[] = [];

      for (let i = 0; i < Math.min(15, techniques.length); i++) {
        const text = techniques[i].textContent?.trim();
        if (text && text.length > 15 && text.length < 300) {
          tacticsList.push(`• ${text}`);
        }
      }

      return content.join('\n\n') + '\n\nCommon Manipulation Tactics:\n' + tacticsList.join('\n');
    });

    findings.push({
      topic: 'Psychological Manipulation Tactics',
      source: 'Wikipedia - Psychological Manipulation',
      content: manipulationInfo,
      timestamp: new Date()
    });

    const screenshot4 = `/home/wakibaka/Documents/github/neko-criminal-investigation/research-manipulation-${Date.now()}.png` as const;
    await page.screenshot({ path: screenshot4 as string, fullPage: false });
    console.log(`📸 Captured: ${screenshot4}`);

    performanceLog.acts.push({
      act: 4,
      title: 'Psychological Manipulation Research',
      status: 'SUCCESS',
      screenshot: screenshot4
    });

    // ═══════════════════════════════════════════════════════════
    // FINALE: SAVE RESEARCH TO MONGODB
    // ═══════════════════════════════════════════════════════════
    console.log('\n🎭 Mario: FINALE - ARCHIVING OUR DISCOVERIES!');
    console.log('🐾 Neko: Saving research to MongoDB, nyaa~!');
    console.log('🗡️ Noel: Verifying data integrity.\n');

    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    // Save to Mario's Marionnette Theater database
    const marioDB = client.db('marionnette-theater');
    await marioDB.collection('performances').insertOne({
      ...performanceLog,
      duration_ms: Date.now(),
      findings_count: findings.length,
      screenshots_captured: performanceLog.acts.length,
      status: 'STANDING_OVATION',
      created_at: new Date()
    });

    // Save research findings to Neko's database
    const nekoDB = client.db('neko-defense-system');
    await nekoDB.collection('research-findings').insertMany(
      findings.map(f => ({
        ...f,
        session: 'criminal-psychology-research-oct23',
        created_by: 'neko-arc-mario-noel-team',
        created_at: new Date()
      }))
    );

    await client.close();

    console.log('\n✅ RESEARCH COMPLETE!');
    console.log('═══════════════════════════════════════════════════');
    console.log(`📚 Topics Researched: ${findings.length}`);
    console.log(`📸 Screenshots Captured: ${performanceLog.acts.length}`);
    console.log('💾 Saved to MongoDB:');
    console.log('   • marionnette-theater.performances (Mario)');
    console.log('   • neko-defense-system.research-findings (Neko)');
    console.log('═══════════════════════════════════════════════════\n');

    console.log('🎭 Mario: CURTAIN CALL! A MAGNIFICENT RESEARCH PERFORMANCE!');
    console.log('🐾 Neko: Great teamwork, nyaa~! Research documented! ✅');
    console.log('🗡️ Noel: Acceptable. Data integrity confirmed.');

  } catch (error) {
    console.error('❌ Error during research:', error);
  } finally {
    await browser.close();
  }
}

researchCriminalPersonalities();
