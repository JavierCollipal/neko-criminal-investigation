# 🐾⚡ CI/CD Pipeline Documentation ⚡🐾

Complete documentation for GitHub Actions workflows in the **Neko Criminal Investigation** system, nyaa~!

---

## 🚀 Available Workflows

### 1. **ci-cd-pipeline.yml** - Complete CI/CD Pipeline
Full-stack build, test, and deployment pipeline.

**Triggers:**
- Push to `main` or `master` branches
- Pull requests to `main` or `master`
- Manual workflow dispatch

**Stages:**
1. 🔍 **Lint** - Code quality checks (Frontend + Backend)
2. 🏗️ **Build** - Build applications (Next.js + NestJS)
3. 🧪 **Unit Tests** - Run Jest tests (if configured)
4. 🎭 **E2E Tests** - Puppeteer browser automation tests
5. 🚀 **Deploy** - Deploy frontend to Vercel (production only)
6. 📊 **Summary** - Generate pipeline summary

### 2. **cypress-tests.yml** - Cypress E2E Testing
Automated end-to-end testing with Cypress Cloud integration.

**Triggers:**
- Push to `main` or `master` branches
- Pull requests
- Daily schedule (2 AM)
- Manual workflow dispatch

**Features:**
- ⚡ Parallel execution across 3 containers
- ☁️ Cypress Cloud recording
- 📸 Screenshot capture on failures
- 🎬 Video recording of all tests

### 3. **deploy-vercel.yml** - Vercel Deployment
Dedicated frontend deployment to Vercel production.

**Triggers:**
- Push to `main` or `master` branches
- Manual workflow dispatch

**Features:**
- 🚀 Production deployment
- 🧪 Post-deployment smoke tests
- 🌐 Deployment URL verification

---

## 🔐 Required GitHub Secrets

Configure these secrets in your GitHub repository:
**Settings → Secrets and variables → Actions → New repository secret**

### MongoDB Atlas
```
MONGODB_URI
Description: MongoDB Atlas connection string
Example: mongodb+srv://user:password@cluster.mongodb.net/database
```

### Vercel Deployment
```
VERCEL_TOKEN
Description: Vercel deployment token
How to get: https://vercel.com/account/tokens

VERCEL_ORG_ID
Description: Vercel organization ID
How to get: Run `vercel link` in your project

VERCEL_PROJECT_ID
Description: Vercel project ID
How to get: Run `vercel link` in your project
```

### Cypress Cloud (Optional)
```
CYPRESS_PROJECT_ID
Description: Cypress Cloud project ID
Example: 9xzw4h

CYPRESS_RECORD_KEY
Description: Cypress Cloud record key
How to get: https://cloud.cypress.io/projects/[PROJECT_ID]/settings
```

---

## 📋 Setup Instructions

### Step 1: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings → Secrets and variables → Actions**
3. Click **New repository secret**
4. Add each required secret (see list above)

### Step 2: Configure Vercel Project

```bash
# In your frontend directory
cd frontend

# Login to Vercel
vercel login

# Link project (creates .vercel directory)
vercel link

# Get project settings
cat .vercel/project.json
# Copy orgId and projectId to GitHub secrets
```

### Step 3: Configure Cypress Cloud (Optional)

1. Sign up at [Cypress Cloud](https://cloud.cypress.io/)
2. Create a new project
3. Copy the `projectId` from project settings
4. Generate a record key
5. Add both to GitHub secrets

### Step 4: Test the Pipeline

```bash
# Push to main branch to trigger CI/CD
git push origin main

# Or manually trigger workflow:
# GitHub → Actions → Select workflow → Run workflow
```

---

## 🎯 Pipeline Flow Diagram

```
Push to main
     │
     ├─→ 🔍 Lint (Frontend + Backend)
     │        │
     │        └─→ 🏗️ Build (Frontend + Backend)
     │                 │
     │                 ├─→ 🧪 Unit Tests
     │                 │
     │                 ├─→ 🎭 E2E Tests (Puppeteer)
     │                 │
     │                 └─→ 🚀 Deploy
     │                          │
     │                          ├─→ Frontend (Vercel)
     │                          │
     │                          └─→ 🧪 Smoke Tests
     │
     └─→ 📊 Summary
```

---

## 🧪 Testing Locally

### Run Puppeteer Tests Locally
```bash
# Install dependencies
npm install

# Set environment variables
export MONGODB_URI="mongodb+srv://..."

# Run tests (headless)
HEADLESS=true npx ts-node test-with-puppeteer.ts

# Run tests (visual)
npx ts-node test-with-puppeteer.ts
```

### Run Cypress Tests Locally
```bash
cd frontend

# Open Cypress UI
npx cypress open

# Run headless
npx cypress run

# Record to Cypress Cloud
npx cypress run --record --key $CYPRESS_RECORD_KEY
```

---

## 📊 CI/CD Status Badges

Add these badges to your README.md:

```markdown
![CI/CD Pipeline](https://github.com/JavierCollipal/neko-criminal-investigation/actions/workflows/ci-cd-pipeline.yml/badge.svg)
![Cypress Tests](https://github.com/JavierCollipal/neko-criminal-investigation/actions/workflows/cypress-tests.yml/badge.svg)
![Deploy Vercel](https://github.com/JavierCollipal/neko-criminal-investigation/actions/workflows/deploy-vercel.yml/badge.svg)
```

---

## 🔧 Troubleshooting

### Pipeline Fails on Build
- ✅ Check `package.json` scripts exist: `build`, `start`, `test`
- ✅ Verify all dependencies are in `package.json`
- ✅ Check GitHub secrets are configured correctly

### Vercel Deployment Fails
- ✅ Verify `VERCEL_TOKEN` is valid (not expired)
- ✅ Check `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` match
- ✅ Run `vercel link` locally to update project settings

### Cypress Tests Fail
- ✅ Check servers are starting correctly (frontend + backend)
- ✅ Verify `wait-on` timeouts are sufficient
- ✅ Check `MONGODB_URI` is configured in secrets
- ✅ Review Cypress Cloud dashboard for detailed errors

### E2E Tests Timeout
- ✅ Increase `wait-on` timeout (default 60000ms)
- ✅ Check backend health endpoint: `/health`
- ✅ Verify MongoDB Atlas connection is working

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Cypress Cloud Documentation](https://docs.cypress.io/guides/cloud/introduction)
- [Neko Defense Dashboard CI/CD](https://github.com/wakibaba/neko-defense-dashboard/.github/workflows/)

---

## 🎭 Generated with Claude Code

**Personalities Involved:**
- 🐾 **Neko-Arc** - Technical execution and rapid automation
- 🎭 **Mario Gallo Bestino** - Theatrical CI/CD orchestration
- 🗡️ **Noel** - Tactical testing and quality assurance
- 🎸 **Glam Americano** - Street-level reality checks and ethics

---

**Co-Authored-By:** Claude <noreply@anthropic.com>
