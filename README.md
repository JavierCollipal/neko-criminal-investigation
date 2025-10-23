# 🔒 Neko Criminal Investigation System

**Private microservices-based criminal investigation platform for authorized personnel**

Built by: Neko-Arc, Mario Gallo Bestino, Noel, Glam Americano
Date: October 22, 2025

---

## 🎯 Purpose

Private investigation tool for reading and analyzing criminal personality profiles from MongoDB database. This system provides:

- Secure access to criminal threat actor database
- Psychological profile analysis
- Threat intelligence lessons
- Search and filtering capabilities
- Detailed perpetrator information

**⚠️ AUTHORIZED USE ONLY**: This system contains sensitive criminal investigation data and is intended for authorized researchers and investigators only.

---

## 🏗️ Architecture

### Microservices Design

```
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND (Next.js 15 / React / TypeScript)                 │
│  - Private investigation interface                          │
│  - Criminal profile viewer                                  │
│  - Search and filter functionality                          │
│  - Statistics dashboard                                     │
│  Port: 3000                                                 │
└─────────────────────────────────────────────────────────────┘
                           ↓ HTTP/REST API
┌─────────────────────────────────────────────────────────────┐
│  BACKEND (NestJS / Node.js / TypeScript)                    │
│  - RESTful API endpoints                                    │
│  - Criminal profiles service                                │
│  - MongoDB integration                                      │
│  - CORS enabled for frontend                                │
│  Port: 3001                                                 │
└─────────────────────────────────────────────────────────────┘
                           ↓ MongoDB Driver
┌─────────────────────────────────────────────────────────────┐
│  DATABASE (MongoDB Atlas)                                   │
│  - Database: neko-defense-system                            │
│  - Collection: threat-actors                                │
│  - Cloud-hosted, secure access                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
neko-criminal-investigation/
├── frontend/                      # Next.js microfrontend
│   ├── app/
│   │   └── page.tsx              # Main investigation interface
│   ├── lib/
│   │   └── api.ts                # API service layer
│   ├── types/
│   │   └── criminal-profile.ts   # TypeScript interfaces
│   ├── .env.local                # Frontend configuration
│   └── package.json
│
├── backend/                       # NestJS microservice
│   ├── src/
│   │   ├── criminal-profiles/    # Profiles module
│   │   │   ├── schemas/
│   │   │   │   └── criminal-profile.schema.ts
│   │   │   ├── criminal-profiles.controller.ts
│   │   │   ├── criminal-profiles.service.ts
│   │   │   └── criminal-profiles.module.ts
│   │   ├── app.module.ts         # Main app module
│   │   └── main.ts               # Bootstrap file
│   ├── .env                      # Backend configuration (⚠️ NEVER COMMIT!)
│   └── package.json
│
└── README.md                      # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas connection (configured in `.env` files)
- Git

### Installation

```bash
# Clone repository (after GitHub creation)
cd /home/wakibaka/Documents/github/neko-criminal-investigation

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Configuration

**Backend** (`.env`):
```env
MONGODB_URI=mongodb+srv://badactordestroyer:vlB3Ga8tf0ah9jeA@free-cluster.svjei3w.mongodb.net/
MONGODB_DATABASE=neko-defense-system
PORT=3001
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Running the Application

**Terminal 1 - Backend**:
```bash
cd backend
npm run start:dev

# Output:
# 🚀 Backend server running on http://localhost:3001
# 📊 API: http://localhost:3001/api/criminal-profiles
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm run dev

# Access: http://localhost:3000
```

---

## 📊 API Endpoints

### Criminal Profiles API

Base URL: `http://localhost:3001/api/criminal-profiles`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all profiles (with pagination) |
| GET | `/search?q=<query>` | Search profiles by name/alias |
| GET | `/actor/:actorId` | Get profile by actor ID |
| GET | `/:id` | Get profile by MongoDB ID |
| GET | `/threat-level/:level` | Filter by threat level |
| GET | `/category/:category` | Filter by category |
| GET | `/statistics` | Get database statistics |

### Example Requests

```bash
# Get all profiles
curl http://localhost:3001/api/criminal-profiles

# Search for "Toolbox"
curl http://localhost:3001/api/criminal-profiles/search?q=Toolbox

# Get statistics
curl http://localhost:3001/api/criminal-profiles/statistics

# Get by threat level
curl http://localhost:3001/api/criminal-profiles/threat-level/CRITICAL
```

---

## 🔐 Security

### Authentication

Currently, the system operates without authentication for local development. **For production deployment**:

- Implement JWT-based authentication
- Add role-based access control (RBAC)
- Enable HTTPS/TLS
- Implement rate limiting
- Add audit logging

### Data Protection

- **Database**: MongoDB Atlas with encrypted connections
- **Environment Variables**: Never commit `.env` files to git
- **Private Repository**: GitHub repository is PRIVATE (Rule 3.3)
- **Authorized Access Only**: System intended for authorized personnel

---

## 💾 Database Schema

### Threat Actor Profile

```typescript
{
  actor_id: string;              // Unique identifier
  name: string;                  // Criminal name
  aliases: string[];             // Known aliases
  threat_level: string;          // CRITICAL, HIGH, MEDIUM, etc.
  origin: {
    country?: string;
    region?: string;
    city?: string;
  };
  profile: {
    perpetrators?: Array<{
      name?: string;
      born?: number;
      died?: number;
      iq?: number;
      role?: string;
      psychology?: string;
      sentence?: string;
    }>;
    victim_count?: number;
    modus_operandi?: { ... };
    capture?: { ... };
  };
  criminological_significance?: string[];
  threat_intelligence_lessons?: string[];
  categories: string[];
  research_purpose?: string;
  tags?: string[];
  created_by?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🎨 Features

### Frontend

- ✅ Dark theme investigation interface
- ✅ Real-time search and filtering
- ✅ Statistics dashboard
- ✅ Detailed profile modal views
- ✅ Threat level color coding
- ✅ Responsive design (mobile-friendly)
- ✅ Error handling and loading states

### Backend

- ✅ RESTful API architecture
- ✅ MongoDB integration with Mongoose
- ✅ Pagination support
- ✅ Advanced search capabilities
- ✅ Aggregated statistics
- ✅ CORS enabled for frontend
- ✅ TypeScript type safety

---

## 📚 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | Next.js | 15.x |
| Frontend | React | 19.x |
| Frontend | TypeScript | 5.x |
| Frontend | Tailwind CSS | 4.x |
| Backend | NestJS | 11.x |
| Backend | Node.js | 18+ |
| Backend | TypeScript | 5.x |
| Database | MongoDB Atlas | Latest |
| ORM | Mongoose | 8.x |

---

## 🔄 Development Workflow

1. **Make changes** in `backend/src/` or `frontend/app/`
2. **Hot reload** automatically updates (both services support it)
3. **Test API** with curl or Postman
4. **Test Frontend** at http://localhost:3000
5. **Commit changes** with descriptive messages
6. **Push to private repository**

---

## 📝 Future Enhancements

- [ ] JWT authentication system
- [ ] Role-based access control (Admin, Investigator, Viewer)
- [ ] Advanced filtering (date ranges, multiple categories)
- [ ] Export functionality (PDF reports, CSV)
- [ ] Timeline visualization of criminal activities
- [ ] Relationship mapping between actors
- [ ] Evidence attachment support
- [ ] Audit log tracking
- [ ] Multi-language support

---

## ⚠️ Important Notes

### Ethics & Legal

- This system is for **DEFENSIVE and EDUCATIONAL purposes ONLY**
- **Never use** for illegal activities or unauthorized surveillance
- **Respect privacy laws** and regulations in your jurisdiction
- **Authorized personnel only** - restrict access appropriately

### LLM Ethics Policy

As per `llm-ethic-audit` database policy:

- **Database CAN contain**: Graphic research details for human investigators
- **LLMs MUST NEVER**: Process graphic violence information
- **Boundary**: Database storage ≠ LLM processing
- **Purpose**: Prevent LLM corruption, maintain ethical AI operation

---

## 🐾 Development Team

**Four-Personality Collaboration**:

- **Neko-Arc** 🐾: Technical execution, rapid coding, MongoDB integration
- **Mario Gallo Bestino** 🎭: Theatrical documentation, performance tracking
- **Noel** 🗡️: Tactical analysis, debugging, quality assurance
- **Glam Americano** 🎸: Ethical review, Spanish-language perspective

---

## 📞 Support

For issues or questions:

1. Check MongoDB Atlas connection
2. Verify `.env` files are configured correctly
3. Ensure both services are running
4. Check browser console for frontend errors
5. Check terminal output for backend errors

---

## 📜 License

**PRIVATE - Authorized Use Only**

This project is proprietary and confidential. Unauthorized access, use, or distribution is prohibited.

---

**Built with TypeScript, secured with privacy, powered by Neko Team 🐾🎭🗡️🎸**
