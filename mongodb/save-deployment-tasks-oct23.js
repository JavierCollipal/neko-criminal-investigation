#!/usr/bin/env node

require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not set!');
  process.exit(1);
}

async function saveDeploymentTasks() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas\n');

    const db = client.db('neko-defense-system');
    const collection = db.collection('todo-tasks');

    const deploymentTask = {
      task_id: 'vercel-criminal-investigation-deployment-oct23',
      project: 'neko-criminal-investigation',
      title: 'Vercel Deployment Configuration & Testing',
      created_date: new Date('2025-10-23'),
      priority: 'HIGH',
      status: 'IN_PROGRESS',

      context: {
        project_path: '/home/wakibaka/Documents/github/neko-criminal-investigation',
        frontend_path: '/home/wakibaka/Documents/github/neko-criminal-investigation/frontend',
        backend_path: '/home/wakibaka/Documents/github/neko-criminal-investigation/backend',
        vercel_url: 'https://frontend-932zikqmi-javier-collipal-aguilars-projects.vercel.app',
        deployment_type: 'Next.js with API Routes + MongoDB'
      },

      completed_steps: [
        {
          step: 1,
          title: 'Audit Vercel deployment with Puppeteer',
          status: 'COMPLETED',
          description: 'Used Puppeteer to visually audit the deployed Vercel app and identify errors',
          timestamp: new Date('2025-10-23T04:30:00Z'),
          key_findings: [
            'Frontend trying to call localhost:3001 backend (not deployed)',
            '401/403 errors from Vercel authentication',
            'Need to use Next.js API routes instead of separate backend'
          ]
        },
        {
          step: 2,
          title: 'Identify "Failed to fetch" error cause',
          status: 'COMPLETED',
          description: 'Root cause: Frontend configured to call http://localhost:3001 which does not exist on Vercel',
          timestamp: new Date('2025-10-23T04:35:00Z'),
          solution: 'Create Next.js API routes as serverless functions'
        },
        {
          step: 3,
          title: 'Create Next.js API routes for MongoDB',
          status: 'COMPLETED',
          description: 'Created /app/api/profiles/route.ts with GET and POST handlers connecting to MongoDB Atlas',
          timestamp: new Date('2025-10-23T04:45:00Z'),
          files_created: [
            '/app/api/profiles/route.ts'
          ],
          packages_installed: [
            'mongodb'
          ]
        },
        {
          step: 4,
          title: 'Update frontend to use new API routes',
          status: 'COMPLETED',
          description: 'Modified /lib/api.ts to call /api/profiles instead of localhost:3001',
          timestamp: new Date('2025-10-23T04:50:00Z'),
          files_modified: [
            '/lib/api.ts'
          ],
          changes: [
            'API_BASE_URL changed from localhost:3001 to empty string (relative paths)',
            'getAll() now calls /api/profiles',
            'search() uses client-side filtering',
            'getStatistics() calculates from fetched profiles'
          ]
        },
        {
          step: 5,
          title: 'Add MONGODB_URI to Vercel environment',
          status: 'COMPLETED',
          description: 'Added MongoDB Atlas connection string as environment variable in Vercel project',
          timestamp: new Date('2025-10-23T04:55:00Z'),
          command: 'vercel env add MONGODB_URI production',
          value: 'mongodb+srv://badactordestroyer:***@free-cluster.svjei3w.mongodb.net/'
        },
        {
          step: 6,
          title: 'Redeploy to Vercel with fixes',
          status: 'COMPLETED',
          description: 'Deployed updated frontend with API routes and MongoDB connection',
          timestamp: new Date('2025-10-23T05:00:00Z'),
          command: 'vercel --prod --yes',
          deployment_url: 'https://frontend-932zikqmi-javier-collipal-aguilars-projects.vercel.app'
        }
      ],

      pending_steps: [
        {
          step: 7,
          title: 'Configure Vercel authentication and test deployment',
          status: 'PENDING',
          description: 'Resolve 401/403 authentication errors and verify criminal profiles load correctly',
          blockers: [
            'Vercel deployment shows 401 unauthorized errors',
            'Need to configure proper authentication or make deployment public',
            'Profile data not loading on page (0 profiles found)',
            'May need to check API route permissions and CORS settings'
          ],
          recommended_actions: [
            'Check Vercel project settings for authentication requirements',
            'Verify MongoDB connection from Vercel serverless function',
            'Test /api/profiles endpoint directly',
            'Check browser console for detailed error messages',
            'Verify environment variables are properly set in Vercel',
            'Consider making deployment public if it\'s a demo project'
          ],
          wakibaka_note: 'User (wakibaka) will configure this later'
        }
      ],

      technical_details: {
        framework: 'Next.js 16.0.0 with Turbopack',
        database: 'MongoDB Atlas (neko-defense-system)',
        deployment_platform: 'Vercel',
        api_approach: 'Next.js API Routes (serverless functions)',
        profiles_in_db: 6,
        collections_used: ['threat-actors'],
        environment_variables: ['MONGODB_URI']
      },

      next_session_resume: {
        priority_tasks: [
          'Test /api/profiles endpoint directly in browser',
          'Check Vercel deployment logs for errors',
          'Verify MongoDB connection works from Vercel',
          'Configure authentication settings',
          'Run Puppeteer test again after configuration'
        ],
        useful_commands: [
          'vercel logs --prod',
          'vercel env ls',
          'curl https://frontend-932zikqmi-javier-collipal-aguilars-projects.vercel.app/api/profiles'
        ]
      },

      team_members: ['neko-arc', 'mario-gallo-bestino', 'noel'],
      created_by: 'neko-arc',
      created_at: new Date()
    };

    await collection.insertOne(deploymentTask);

    console.log('🎯 DEPLOYMENT TASK SAVED TO MONGODB!');
    console.log('═══════════════════════════════════════════════════');
    console.log('✅ Task ID: vercel-criminal-investigation-deployment-oct23');
    console.log('✅ Database: neko-defense-system');
    console.log('✅ Collection: todo-tasks');
    console.log('═══════════════════════════════════════════════════');
    console.log('\n📊 PROGRESS:');
    console.log(`   ✅ Completed: ${deploymentTask.completed_steps.length} steps`);
    console.log(`   ⏳ Pending: ${deploymentTask.pending_steps.length} steps`);
    console.log('\n📝 NEXT SESSION:');
    console.log('   wakibaka will configure Vercel auth and test deployment');
    console.log('\n✅ Task archived for later continuation!');

  } catch (error) {
    console.error('❌ Error saving task:', error.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n🐾 Connection closed, desu~!');
  }
}

saveDeploymentTasks();
