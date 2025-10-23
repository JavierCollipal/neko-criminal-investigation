#!/usr/bin/env node

require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not set!');
  process.exit(1);
}

async function verifyAllData() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas\n');

    // Verify Neko's database
    const nekoDB = client.db('neko-defense-system');

    console.log('🐾 NEKO-ARC DATABASE (neko-defense-system):');
    console.log('═══════════════════════════════════════════════════');

    const abilities = await nekoDB.collection('abilities').find({}).toArray();
    console.log(`✅ Abilities: ${abilities.length} documents`);
    console.log('   Recent abilities:');
    abilities.slice(-5).forEach(a => {
      console.log(`   • ${a.name} (${a.ability_id})`);
    });

    const researchFindings = await nekoDB.collection('research-findings').find({}).toArray();
    console.log(`\n✅ Research Findings: ${researchFindings.length} documents`);
    if (researchFindings.length > 0) {
      researchFindings.forEach(r => {
        console.log(`   • ${r.topic} (${r.source})`);
      });
    }

    // Verify Mario's database
    const marioDB = client.db('marionnette-theater');

    console.log('\n🎭 MARIO DATABASE (marionnette-theater):');
    console.log('═══════════════════════════════════════════════════');

    const performances = await marioDB.collection('performances').find({}).toArray();
    console.log(`✅ Performances: ${performances.length} documents`);
    if (performances.length > 0) {
      performances.slice(-3).forEach(p => {
        console.log(`   • ${p.title} (${p.performance_id})`);
      });
    }

    // Verify threat-actors (includes criminal profiles)
    const threatActors = await nekoDB.collection('threat-actors').find({}).toArray();
    console.log(`\n✅ Threat Actors: ${threatActors.length} documents`);
    console.log('   Recent threat actors:');
    threatActors.slice(-5).forEach(t => {
      console.log(`   • ${t.name} (${t.actor_id}) - Level: ${t.threat_level}`);
    });

    console.log('\n═══════════════════════════════════════════════════');
    console.log('✅ ALL DATA VERIFIED SUCCESSFULLY!');
    console.log('═══════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Error verifying data:', error.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🐾 Connection closed, desu~!');
  }
}

verifyAllData();
