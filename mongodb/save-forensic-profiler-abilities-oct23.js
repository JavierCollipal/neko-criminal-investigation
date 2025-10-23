#!/usr/bin/env node

require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not set!');
  process.exit(1);
}

async function saveForensicProfilerAbilities() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');

    const db = client.db('neko-defense-system');
    const abilities = db.collection('abilities');

    // Ability 1: Criminal Database Architecture
    const ability1 = {
      ability_id: 'criminal-database-architecture-oct23',
      name: 'Criminal Database Architecture & Management',
      category: 'forensic-investigation',
      subcategory: 'database-design',
      difficulty: 'intermediate',
      date_learned: new Date('2025-10-23'),
      description: 'Design and implement MongoDB database for criminal profile storage with evidence preservation, search functionality, and visual documentation',
      problem_solved: 'Need centralized system to track, search, and document criminal profiles with evidence and psychological analysis',
      approach: [
        'Design MongoDB schema for criminal profiles (personal data, crimes, evidence, psychology)',
        'Implement evidence array structure for multiple evidence types',
        'Create psychological profile fields (personality type, manipulation tactics, risk assessment)',
        'Add search/filter functionality by name, crime type, date',
        'Include screenshot documentation system',
        'Ensure MongoDB Atlas cloud storage for accessibility'
      ],
      technical_stack: [
        'MongoDB Atlas (cloud database)',
        'Node.js for data insertion',
        'JSON schema design',
        'Evidence preservation structure',
        'Psychological profile taxonomy'
      ],
      reusability: 'high',
      applicable_to: [
        'Criminal investigation systems',
        'Threat actor tracking',
        'Forensic evidence management',
        'Psychological profiling databases',
        'Law enforcement case management'
      ],
      tags: ['mongodb', 'forensics', 'criminal-profiling', 'database-design', 'evidence-management'],
      created_at: new Date(),
      created_by: 'neko-arc'
    };

    // Ability 2: Psychological Criminal Profiling
    const ability2 = {
      ability_id: 'psychological-criminal-profiling-oct23',
      name: 'Psychological Criminal Profiling & Behavioral Analysis',
      category: 'forensic-investigation',
      subcategory: 'psychology',
      difficulty: 'advanced',
      date_learned: new Date('2025-10-23'),
      description: 'Create comprehensive psychological profiles for criminals including personality types, manipulation tactics, behavioral patterns, and risk assessment',
      problem_solved: 'Need structured approach to document criminal psychology beyond basic demographics and crimes',
      approach: [
        'Identify personality disorder types (Narcissistic, Antisocial, Histrionic, Paranoid)',
        'Document manipulation tactics (Gaslighting, Love bombing, Guilt tripping, etc.)',
        'Assess behavioral patterns (Aggression, Impulsivity, Manipulation, Lying)',
        'Evaluate risk levels (Low/Medium/High/Extreme)',
        'Analyze motivations (Power, Control, Financial, Revenge, Sadistic)',
        'Document victim targeting patterns',
        'Create danger assessment scales'
      ],
      psychological_frameworks: [
        'DSM-5 personality disorder criteria',
        'Dark Triad assessment (Narcissism, Machiavellianism, Psychopathy)',
        'FBI behavioral analysis framework',
        'Victim manipulation taxonomy',
        'Risk assessment matrices'
      ],
      reusability: 'high',
      applicable_to: [
        'Criminal investigations',
        'Threat actor profiling',
        'Domestic violence cases',
        'Stalking investigations',
        'Sexual predator tracking',
        'Fraud investigation',
        'Workplace harassment cases'
      ],
      tags: ['psychology', 'profiling', 'behavioral-analysis', 'forensics', 'risk-assessment'],
      created_at: new Date(),
      created_by: 'neko-arc'
    };

    // Ability 3: Evidence Collection & Documentation
    const ability3 = {
      ability_id: 'evidence-collection-documentation-oct23',
      name: 'Digital Evidence Collection & Documentation System',
      category: 'forensic-investigation',
      subcategory: 'evidence-management',
      difficulty: 'intermediate',
      date_learned: new Date('2025-10-23'),
      description: 'Structure and document digital evidence including screenshots, messages, recordings, and witness testimonies with proper chain of custody',
      problem_solved: 'Need systematic approach to collect, categorize, and preserve digital evidence for criminal cases',
      approach: [
        'Define evidence types (Screenshot, Message, Recording, Document, Witness Testimony)',
        'Create evidence metadata structure (date, description, source, relevance)',
        'Implement chain of custody tracking',
        'Organize evidence by chronological order',
        'Link evidence to specific crimes/behaviors',
        'Ensure evidence integrity and authenticity',
        'Create visual documentation system (screenshots)'
      ],
      evidence_categories: [
        'Visual Evidence (Screenshots, Photos, Videos)',
        'Communication Evidence (Messages, Emails, Chats)',
        'Audio Evidence (Recordings, Voicemails)',
        'Document Evidence (PDFs, Contracts, Letters)',
        'Witness Testimony (Statements, Interviews)',
        'Digital Artifacts (Metadata, Logs, Timestamps)'
      ],
      reusability: 'high',
      applicable_to: [
        'Criminal investigations',
        'Civil litigation support',
        'Internal investigations',
        'Harassment documentation',
        'Fraud cases',
        'Cybercrime investigation',
        'Workplace misconduct cases'
      ],
      tags: ['evidence', 'documentation', 'chain-of-custody', 'forensics', 'digital-investigation'],
      created_at: new Date(),
      created_by: 'neko-arc'
    };

    // Ability 4: YouTube Criminal Exposure Video Generation
    const ability4 = {
      ability_id: 'youtube-criminal-exposure-video-oct23',
      name: 'Automated YouTube Criminal Exposure Video Generation',
      category: 'forensic-investigation',
      subcategory: 'public-awareness',
      difficulty: 'intermediate-advanced',
      date_learned: new Date('2025-10-23'),
      description: 'Create automated system to generate YouTube-ready exposure videos for criminals with photos, evidence screenshots, and Carabineros hymn',
      problem_solved: 'Need scalable way to create public awareness videos exposing criminals and warning community',
      approach: [
        'Collect criminal photos and evidence screenshots',
        'Create automated bash script for video generation',
        'Use ffmpeg to create photo slideshow (3 seconds per photo)',
        'Integrate Carabineros hymn as background audio (Rule 3.9)',
        'Generate 1920x1080 YouTube-ready format (H.264, AAC)',
        'Save to dedicated YouTube repository folder',
        'Follow Rule 3.10 (YouTube video storage protocol)'
      ],
      technical_stack: [
        'ffmpeg (video generation)',
        'bash scripting (automation)',
        'Image processing (scaling, padding)',
        'Audio integration (Carabineros hymn)',
        'YouTube format standards (1080p, H.264, AAC)',
        'Git version control'
      ],
      reusability: 'high',
      applicable_to: [
        'Criminal exposure campaigns',
        'Public safety warnings',
        'Missing person alerts',
        'Wanted fugitive notifications',
        'Community awareness videos',
        'Evidence presentation for court',
        'Memorial tributes'
      ],
      tags: ['video-generation', 'ffmpeg', 'youtube', 'public-awareness', 'automation', 'criminal-exposure'],
      created_at: new Date(),
      created_by: 'neko-arc'
    };

    // Ability 5: Forensic Research with Puppeteer
    const ability5 = {
      ability_id: 'forensic-research-puppeteer-oct23',
      name: 'Automated Forensic Research with Puppeteer',
      category: 'forensic-investigation',
      subcategory: 'research-automation',
      difficulty: 'advanced',
      date_learned: new Date('2025-10-23'),
      description: 'Use Puppeteer to automate research on criminal personalities, psychological disorders, and forensic investigation techniques',
      problem_solved: 'Need efficient way to gather comprehensive research on criminal psychology and investigation methodologies',
      approach: [
        'Launch Puppeteer with visual mode (headless: false, Rule 3.11)',
        'Navigate to reputable psychology/forensic resources',
        'Research criminal personality types and disorders',
        'Document manipulation tactics and behavioral patterns',
        'Capture screenshots of important findings',
        'Extract structured data for database storage',
        'Document to marionnette-theater database (Mario leads!)'
      ],
      research_sources: [
        'FBI Behavioral Analysis resources',
        'Psychology academic journals',
        'Forensic investigation guidelines',
        'Criminal profiling methodologies',
        'Victim manipulation tactics',
        'Risk assessment frameworks'
      ],
      reusability: 'high',
      applicable_to: [
        'Criminal investigation research',
        'Threat actor analysis',
        'Security research',
        'Academic research automation',
        'Legal case research',
        'Competitive intelligence',
        'Market research'
      ],
      tags: ['puppeteer', 'research-automation', 'forensics', 'criminal-psychology', 'web-scraping'],
      created_at: new Date(),
      created_by: 'neko-arc'
    };

    // Insert all abilities
    const result = await abilities.insertMany([
      ability1,
      ability2,
      ability3,
      ability4,
      ability5
    ]);

    console.log('\n🎯 FORENSIC PROFILER ABILITIES DOCUMENTED:');
    console.log('═══════════════════════════════════════════');
    console.log('✅ 1. Criminal Database Architecture & Management');
    console.log('✅ 2. Psychological Criminal Profiling & Behavioral Analysis');
    console.log('✅ 3. Digital Evidence Collection & Documentation System');
    console.log('✅ 4. Automated YouTube Criminal Exposure Video Generation');
    console.log('✅ 5. Automated Forensic Research with Puppeteer');
    console.log('═══════════════════════════════════════════');
    console.log(`\n💾 Total abilities inserted: ${result.insertedCount}`);
    console.log('📊 Database: neko-defense-system');
    console.log('📁 Collection: abilities');
    console.log('\n✅ Forensic profiler abilities published successfully!');

  } catch (error) {
    console.error('❌ Error saving abilities:', error.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n🐾 Connection closed, desu~!');
  }
}

saveForensicProfilerAbilities();
