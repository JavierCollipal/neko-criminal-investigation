#!/usr/bin/env node

require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not set!');
  process.exit(1);
}

async function uploadCriminalProfiles() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas\n');

    const db = client.db('neko-defense-system');
    const collection = db.collection('threat-actors');

    // 5 Criminal Profiles for Investigation System
    const profiles = [
      {
        actor_id: 'javierito_hannibal',
        name: 'Javier Enrique Guzmán Figueroa',
        aliases: ['Javierito', 'El Hannibal', 'Hannibal el Descompuesto'],
        threat_level: 'EXTREME',
        origin: {
          country: 'Chile',
          region: 'Maule',
          city: 'Cartagen a'
        },
        active_period: {
          start: '2015',
          end: 'Present',
          status: 'ACTIVE'
        },
        categories: [
          'Domestic Violence',
          'Physical Abuse',
          'Psychological Manipulation',
          'Drug Use',
          'Attempted Murder'
        ],
        profile: {
          perpetrators: [{
            name: 'Javier Enrique Guzmán Figueroa',
            born: 1995,
            role: 'Primary Abuser',
            psychology: 'Narcissistic Personality Disorder, Antisocial traits',
            sentence: 'Pending investigation'
          }],
          victim_count: 3,
          victim_demographics: 'Romantic partners, children',
          modus_operandi: {
            location: 'Home residence',
            method: 'Physical violence, strangulation attempts, verbal abuse',
            tools: ['Fists', 'Objects', 'Psychological manipulation'],
            evidence: 'Medical reports, witness testimonies, screenshots'
          },
          capture: {
            date: 'Under investigation',
            method: 'Pending',
            key_evidence: 'Multiple victim testimonies, medical documentation'
          }
        },
        criminological_significance: [
          'Pattern of escalating violence',
          'Manipulation and gaslighting tactics',
          'Narcissistic abuse cycle',
          'Threat to multiple victims'
        ],
        threat_intelligence_lessons: [
          'Early intervention critical in domestic violence',
          'Documentation preservation essential',
          'Psychological manipulation patterns',
          'Escalation from verbal to physical violence'
        ],
        research_purpose: 'Public awareness, victim protection, justice pursuit',
        tags: ['domestic-violence', 'narcissist', 'active-threat', 'chile'],
        created_by: 'neko-arc',
        created_at: new Date()
      },
      {
        actor_id: 'marcelita_la_puta',
        name: 'Marcela Belén Sanhueza Cárcamo',
        aliases: ['Marcelita', 'La Puta', 'La Cerda'],
        threat_level: 'HIGH',
        origin: {
          country: 'Chile',
          region: 'Maule',
          city: 'Cartagena'
        },
        active_period: {
          start: '2018',
          end: '2023',
          status: 'INACTIVE'
        },
        categories: [
          'Psychological Manipulation',
          'Infidelity',
          'Emotional Abuse',
          'Gaslighting',
          'Narcissistic Behavior'
        ],
        profile: {
          perpetrators: [{
            name: 'Marcela Belén Sanhueza Cárcamo',
            born: 1998,
            role: 'Manipulator',
            psychology: 'Histrionic Personality Disorder, Narcissistic traits',
            sentence: 'No criminal charges (psychological abuse)'
          }],
          victim_count: 2,
          victim_demographics: 'Romantic partners',
          modus_operandi: {
            location: 'Relationships',
            method: 'Gaslighting, love bombing, infidelity, emotional manipulation',
            tools: ['Charm', 'Lies', 'Guilt tripping', 'Victim playing'],
            evidence: 'Message screenshots, witness testimonies, confession audio'
          }
        },
        criminological_significance: [
          'Classic narcissistic manipulation patterns',
          'Repeat offender behavior',
          'Emotional abuse documentation'
        ],
        threat_intelligence_lessons: [
          'Psychological abuse leaves lasting damage',
          'Manipulation tactics recognition',
          'Importance of evidence preservation'
        ],
        research_purpose: 'Public awareness, prevent future victims',
        tags: ['psychological-abuse', 'narcissist', 'manipulator', 'chile'],
        created_by: 'neko-arc',
        created_at: new Date()
      },
      {
        actor_id: 'miguelito_el_traidor',
        name: 'Miguel Enrique Martínez Roco',
        aliases: ['Miguelito', 'El Traidor', 'El Narciso'],
        threat_level: 'MEDIUM',
        origin: {
          country: 'Chile',
          region: 'Maule',
          city: 'Cartagena'
        },
        active_period: {
          start: '2016',
          end: '2022',
          status: 'INACTIVE'
        },
        categories: [
          'Betrayal',
          'Narcissistic Behavior',
          'Emotional Manipulation',
          'False Friendship'
        ],
        profile: {
          perpetrators: [{
            name: 'Miguel Enrique Martínez Roco',
            born: 1994,
            role: 'False Friend / Betrayer',
            psychology: 'Narcissistic Personality Disorder',
            sentence: 'No criminal charges (social betrayal)'
          }],
          victim_count: 1,
          victim_demographics: 'Former friend',
          modus_operandi: {
            location: 'Social circle',
            method: 'Backstabbing, spreading rumors, gaslighting',
            tools: ['Manipulation', 'Social engineering', 'Lies'],
            evidence: 'Message logs, witness accounts'
          }
        },
        criminological_significance: [
          'Social manipulation patterns',
          'Betrayal psychology',
          'Narcissistic exploitation'
        ],
        threat_intelligence_lessons: [
          'Recognize false friendships',
          'Trust patterns and red flags',
          'Narcissistic behavioral markers'
        ],
        research_purpose: 'Social awareness, prevent trust exploitation',
        tags: ['betrayal', 'narcissist', 'false-friend', 'chile'],
        created_by: 'neko-arc',
        created_at: new Date()
      },
      {
        actor_id: 'bastian_coward',
        name: 'Sebastián Roberto Muñoz Parra',
        aliases: ['Bastián', 'El Cobarde'],
        threat_level: 'MEDIUM',
        origin: {
          country: 'Chile',
          region: 'Maule',
          city: 'Cartagena'
        },
        active_period: {
          start: '2017',
          end: '2021',
          status: 'INACTIVE'
        },
        categories: [
          'Cowardice',
          'Avoidance',
          'Emotional Unavailability',
          'Communication Failure'
        ],
        profile: {
          perpetrators: [{
            name: 'Sebastián Roberto Muñoz Parra',
            born: 1996,
            role: 'Avoider',
            psychology: 'Avoidant Personality traits',
            sentence: 'No criminal charges'
          }],
          victim_count: 1,
          victim_demographics: 'Former friend/associate',
          modus_operandi: {
            location: 'Social relationships',
            method: 'Ghosting, avoidance, emotional withdrawal',
            tools: ['Silence', 'Distance', 'Non-confrontation'],
            evidence: 'Communication logs, pattern documentation'
          }
        },
        criminological_significance: [
          'Avoidant behavior patterns',
          'Emotional unavailability impact'
        ],
        threat_intelligence_lessons: [
          'Recognize avoidant patterns',
          'Impact of emotional withdrawal',
          'Communication failure effects'
        ],
        research_purpose: 'Understanding avoidant behavior',
        tags: ['avoidance', 'emotional-unavailability', 'chile'],
        created_by: 'neko-arc',
        created_at: new Date()
      },
      {
        actor_id: 'oscar_bully',
        name: 'Oscar Andrés Paredes Ibáñez',
        aliases: ['Oscar', 'El Bully', 'El Matón'],
        threat_level: 'MEDIUM',
        origin: {
          country: 'Chile',
          region: 'Maule',
          city: 'Cartagena'
        },
        active_period: {
          start: '2010',
          end: '2018',
          status: 'INACTIVE'
        },
        categories: [
          'Bullying',
          'Harassment',
          'Physical Intimidation',
          'Verbal Abuse'
        ],
        profile: {
          perpetrators: [{
            name: 'Oscar Andrés Paredes Ibáñez',
            born: 1993,
            role: 'Bully',
            psychology: 'Antisocial traits, aggression',
            sentence: 'No criminal charges'
          }],
          victim_count: 3,
          victim_demographics: 'School/work peers',
          modus_operandi: {
            location: 'School, social settings',
            method: 'Physical intimidation, verbal harassment, social exclusion',
            tools: ['Threats', 'Physical force', 'Social manipulation'],
            evidence: 'Witness testimonies, documented incidents'
          }
        },
        criminological_significance: [
          'Bullying patterns and escalation',
          'Social aggression tactics',
          'Impact on victims'
        ],
        threat_intelligence_lessons: [
          'Early intervention in bullying',
          'Aggression pattern recognition',
          'Victim support importance'
        ],
        research_purpose: 'Anti-bullying awareness',
        tags: ['bullying', 'harassment', 'aggression', 'chile'],
        created_by: 'neko-arc',
        created_at: new Date()
      }
    ];

    // Insert profiles
    const result = await collection.insertMany(profiles);

    console.log('🎯 CRIMINAL PROFILES UPLOADED:');
    console.log('═══════════════════════════════════════════════════');
    console.log('✅ 1. Javier Enrique Guzmán Figueroa (Javierito "El Hannibal")');
    console.log('✅ 2. Marcela Belén Sanhueza Cárcamo (Marcelita "La Puta")');
    console.log('✅ 3. Miguel Enrique Martínez Roco (Miguelito "El Traidor")');
    console.log('✅ 4. Sebastián Roberto Muñoz Parra (Bastián "El Cobarde")');
    console.log('✅ 5. Oscar Andrés Paredes Ibáñez (Oscar "El Bully")');
    console.log('═══════════════════════════════════════════════════');
    console.log(`\n💾 Total profiles inserted: ${result.insertedCount}`);
    console.log('📊 Database: neko-defense-system');
    console.log('📁 Collection: threat-actors');
    console.log('\n✅ Criminal profiles uploaded successfully!');

  } catch (error) {
    console.error('❌ Error uploading profiles:', error.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n🐾 Connection closed, desu~!');
  }
}

uploadCriminalProfiles();
