---
name: 9drive
description: "9Drive is an open-source full-stack TypeScript storage gateway that unifies multiple Google Drive accounts into one dashboard with smart upload routing and quota tracking."
url: https://github.com/zenhosta/9drive
stars: 291
forks: 110
language: TypeScript
tags: ["fullstack", "react", "express", "prisma", "google-drive", "storage"]
featured: false
publishedAt: 2026-06-07
---

## 9Drive

### Overview

9Drive hit 291 stars in three days after its June 4, 2026 launch. That kind of velocity for a storage management tool tells you something — developers are tired of juggling multiple Google Drive accounts and want a clean, self-hosted alternative to manually switching between them.

The project is built by zenhosta, and the architecture is straightforward: a React + Vite frontend talks to an Express + TypeScript backend backed by MySQL via Prisma. Files never touch your server — uploads stream directly from the client through the backend to Google Drive. The backend's only job is metadata, auth, and routing uploads to whichever connected Drive account has the most free space.

The core problem 9Drive solves is deceptively simple. If you have three Google accounts (personal, work, side projects), you're constantly switching contexts. Each account has its own 15GB free tier. 9Drive treats them as one pool. Connect all three and you get a unified dashboard showing 45GB of combined quota, with the backend automatically routing new uploads to whichever account has room.

### Why it matters

Most "Google Drive alternatives" are either full-blown self-hosted file servers (Nextcloud, Filebrowser) or thin wrappers around the Drive API that don't actually solve the multi-account problem. 9Drive sits in a practical middle ground — it's not trying to replace Google Drive, it's trying to make Google Drive usable for people with multiple accounts.

The tech stack choices are worth noting. React + Vite for the frontend is standard, but the Express + Prisma + MySQL backend is a deliberate simplification. No microservices, no message queues, no Kubernetes. Just a REST API with Prisma migrations and bearer token auth. For developers building internal tools or learning full-stack TypeScript, this is a useful reference architecture. The Google OAuth integration alone — with encrypted credential storage, automatic Drive connection on sign-in, and multi-account management — is worth studying.

### Key Features

**Smart Upload Routing.** When you upload a file, 9Drive checks the quota across all connected Google Drive accounts and routes the upload to the one with the most available space. Files stream directly from the browser through the backend to Google Drive — nothing is stored on the server. This means your VPS stays lightweight and you don't need to worry about disk space.

**Multi-Account Quota Tracking.** The Quota Tracker page shows a combined view of storage usage across all connected accounts. Each account displays its individual usage and remaining space. This is the kind of operational visibility that Google's own dashboard doesn't provide when you have multiple accounts.

**Virtual Folders.** 9Drive implements virtual folders that exist only in the MySQL database — they don't create actual folders in Google Drive. This lets you organize files across multiple Drive accounts into a single logical hierarchy without moving files around in Drive itself. You can nest folders, rename them, and reorganize without touching the underlying Drive structure.

**Direct Streaming Uploads.** The backend never stores uploaded files on disk. Uploads arrive as multipart form data, get validated, and stream directly to the target Google Drive account under a dedicated `9drive` root folder. The upload progress panel in the bottom-right corner shows real-time status. This architecture keeps the server stateless and eliminates the need for local storage management.

**Google OAuth with Auto-Connect.** When a user signs in with Google, the first Drive account is connected automatically — no additional OAuth flow needed. Additional accounts can be added from the Settings page. Google OAuth credentials are stored encrypted in MySQL, and the seed script handles the initial configuration. The whole flow is designed so developers can get the OAuth setup right on the first try.

**Docker-Ready Deployment.** The repository includes docker-compose.yml, Dockerfiles for both frontend and backend, and an nginx config for the frontend container. The backend runs Prisma migrations automatically on startup. Copy the example env file, set your secrets, run `docker compose up`, and you have a working instance. The production notes cover HTTPS, reverse proxy setup, and Google OAuth domain configuration.

**File Management Actions.** Files support preview, download, rename, move to folder, and delete operations. There's also a sync feature that pulls changes from the Google Drive `9drive` folder back into MySQL, so files added directly through Google's interface appear in 9Drive's dashboard.

### Use Cases

- **Developers with multiple Google accounts** who need a unified view of their storage across personal, work, and project-specific drives. The quota tracker alone saves the hassle of checking each account individually.

- **Small teams sharing storage** across organizational Google accounts. Instead of buying more Google Workspace storage, connect multiple free-tier accounts and let 9Drive route uploads intelligently.

- **Full-stack TypeScript learners** looking for a complete, well-documented reference project. The React + Express + Prisma stack with Google OAuth, file streaming, and Docker deployment covers most patterns you'd encounter in production apps.

- **Internal tool builders** who need a starting point for file management dashboards. The API is clean REST, the auth is bearer tokens, and the Prisma schema is easy to extend.

### Pros and Cons

Pros:
- Clean, minimal architecture with no unnecessary complexity. React + Express + Prisma is a proven stack that's easy to understand and modify. The entire backend fits in a single Express app with clear route separation.
- Files never touch the server — direct streaming to Google Drive means zero local storage requirements and no file cleanup headaches. This is the right architecture for a storage gateway.
- Multi-account quota aggregation solves a real pain point that Google's own interface doesn't address. The smart routing to the account with the most free space is a practical feature that just works.
- Docker deployment with automatic Prisma migrations makes it easy to self-host. The .env.docker.example file covers all the configuration you need.

Cons:
- No license file means the code is technically all rights reserved. For a project that's gaining traction, this could slow adoption from teams that need explicit licensing terms before using or modifying the code.
- MySQL with Prisma is a fine choice, but the virtual folder implementation means folder operations don't sync back to Google Drive. If someone organizes files in 9Drive, that organization only exists in the database — not in Drive itself.
- The project is three days old. There are no open issues yet, which means the edge cases haven't been discovered. Production use should wait until the API surface stabilizes and security has been reviewed.

### Getting Started

```bash
# Clone the repo
git clone git@github.com:zenhosta/9drive.git
cd 9drive

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install

# Create the MySQL database
mysql -u root -e "CREATE DATABASE IF NOT EXISTS 9drive;"

# Run Prisma migrations
cd backend && npm run prisma:migrate

# Seed Google OAuth config (after setting up Google Cloud Console)
npm run seed:google-config

# Start backend (port 4000)
npm run dev

# In another terminal, start frontend (port 5173)
cd frontend && npm run dev
```

Open http://localhost:5173, register with email/password or sign in with Google, and connect your first Drive account.

For Docker deployment:

```bash
cp .env.docker.example .env
# Edit .env with your secrets and Google OAuth credentials
docker compose up -d --build
docker compose exec backend npm run seed:google-config
```

### Alternatives

**Nextcloud** — The heavyweight self-hosted file management platform. Nextcloud is far more feature-complete (calendar, contacts, office suite, hundreds of apps) but that's also its weakness — it's a full groupware suite, not a focused storage gateway. Choose Nextcloud if you want a Google Workspace replacement. Choose 9Drive if you just want to unify multiple Drive accounts.

**Filebrowser** — A lightweight self-hosted file manager with a clean web UI. Filebrowser manages local files on your server, which is a different use case entirely. It doesn't integrate with Google Drive or handle multi-account management. Choose Filebrowser if you need a web UI for local server files.

**rclone** — The command-line Swiss Army knife for cloud storage. rclone supports dozens of cloud providers including Google Drive and can mount drives as filesystems. It's incredibly powerful but has no web UI and no multi-account quota aggregation. Choose rclone if you're comfortable with CLI tools and need provider-agnostic cloud storage access.

### Verdict

9Drive is a focused, well-architected solution to a problem most developers with multiple Google accounts have accepted as unsolvable. The React + Express + Prisma stack is familiar territory, the streaming upload architecture is the right design choice, and the Docker deployment story is solid. At 291 stars in three days, the developer community is clearly interested. The missing license and young age are real concerns for production use, but as a reference project for full-stack TypeScript development — and as a practical tool for personal multi-account management — 9Drive is worth watching. If you've ever caught yourself switching between Google accounts to find a file, this project speaks to you.
