---
name: 9drive
description: "Open-source storage gateway that unifies multiple Google Drive and S3 accounts into one dashboard with smart upload routing, virtual folders, and API access."
url: https://github.com/zenhosta/9drive
stars: 550
forks: 177
language: TypeScript
tags: ["storage", "google-drive", "s3", "typescript", "react", "self-hosted"]
featured: false
publishedAt: 2026-06-17
---

## 9Drive

### Overview

9Drive is an open-source storage gateway that connects multiple Google Drive accounts and S3-compatible storage into a single web dashboard. It hit 550 GitHub stars in under two weeks after its June 4, 2026 launch, which is a strong signal for a utility tool in a crowded space. The core idea is simple: most developers and small teams accumulate storage across multiple Google accounts and cloud providers, and managing them individually is a pain nobody signed up for.

The project is built by a solo developer (Adytm404) who clearly works with this stack daily. The codebase is clean — Express + TypeScript backend with Prisma ORM, React + Vite frontend, MySQL database, and Docker support out of the box. It's the kind of project where you can tell the author actually uses it, not just demo-ware built for a blog post. 77 commits in 12 days shows active, focused development.

The real problem 9Drive solves is storage fragmentation. You've got files scattered across your personal Gmail's 15GB, your work account, maybe a couple of project-specific drives, and possibly an S3 bucket or two. Every one of those has its own interface, its own quota management, its own upload rules. 9Drive collapses all of that into one view with a smart upload router that automatically sends files to whichever account has the most free space.

### Why it matters

Self-hosted storage management tools are surprisingly rare. The options are basically: use each provider's native UI, pay for a multi-cloud management SaaS, or cobble together rclone scripts. None of those give you a clean web interface with upload routing, quota tracking, and an API for programmatic access.

The timing is relevant because storage costs and fragmentation are getting worse, not better. Google's free tier hasn't changed in years while file sizes keep growing. Teams using multiple Google Workspace accounts for different projects hit quota limits constantly. And the rise of S3-compatible providers (Cloudflare R2, Backblaze B2, Wasabi) means even small teams often have storage spread across 3-4 backends.

9Drive's approach — route uploads to the account with the most available space — is the kind of pragmatic solution that makes you wonder why it doesn't already exist everywhere. Combined with the external upload API and API key management, it positions itself as infrastructure that other tools can build on, not just a dashboard.

### Key Features

**Smart Upload Routing.** When you upload a file, 9Drive doesn't just dump it wherever you point. It evaluates available quota across all connected accounts and routes the upload based on configurable policies: most-available (pick the account with the most free space), round-robin (distribute evenly), or priority-order (always try accounts in a specific sequence). This turns multiple 15GB free-tier accounts into what feels like one large storage pool.

**Direct Stream Architecture.** Files never touch your server. Uploads stream directly from the client to Google Drive or S3 through the backend as a passthrough proxy. This means your server doesn't need significant disk space, and you're not doubling your bandwidth costs. The backend handles authentication, routing logic, and metadata — the actual bytes go straight to the storage provider.

**S3-Compatible Storage Support.** Beyond Google Drive, 9Drive connects to any S3-compatible provider — MinIO, Cloudflare R2, Wasabi, Backblaze B2, AWS S3, or any custom endpoint. You can mix Google Drive accounts and S3 buckets in the same dashboard, which is the real multi-cloud story. Upload routing works across both storage types.

**External Upload API.** There's a documented REST API at `POST /api/v1/uploads` with API key authentication. You get one-time secret display on creation, hashed key storage, last-used tracking, and revocation. This means other tools, scripts, or CI pipelines can upload to your 9Drive instance programmatically. The in-app API docs include cURL and JavaScript examples.

**Virtual Folders.** Files live in their respective storage backends, but you organize them with virtual folders in the 9Drive interface. This decouples your organizational structure from the physical storage layout. Rename, move, preview, and manage files across all accounts from one tree view without caring which account actually holds the data.

**Google OAuth with Auto-Connect.** Sign in with Google and your first Drive account connects automatically during authentication. No manual OAuth dance for the first account. Additional accounts connect through a standard OAuth flow. Email/password auth is also supported with optional reCAPTCHA on registration.

**Quota Dashboard.** See aggregate and per-account storage usage at a glance. The quota tracker shows how much space each connected account has used and remaining, so you can make informed decisions about where to store new files — or let the automatic routing handle it.

### Use Cases

- **Freelancers and small teams** who accumulate files across personal and project-specific Google accounts and need a unified view without paying for a multi-cloud SaaS platform.
- **Developers building file upload workflows** who need a self-hosted backend that handles storage routing — point your app's uploads at the 9Drive API and let it figure out where to put them.
- **Organizations running hybrid storage** with Google Workspace for some teams and S3-compatible storage (R2, B2, MinIO) for others, wanting a single interface for all of it.
- **Side projects and startups** that want to maximize free-tier storage by pooling multiple Google accounts into one logical volume with smart routing.
- **Self-hosting enthusiasts** looking for a Docker-deployable storage gateway that doesn't require Kubernetes or complex infrastructure.

### Pros and Cons

Pros:
- Direct streaming architecture means your server is a lightweight proxy, not a storage bottleneck. No disk space requirements, no double bandwidth costs.
- The S3-compatible support alongside Google Drive makes this genuinely multi-cloud, not just "multi-Google-account."
- External API with proper key management (hashed storage, last-used tracking, revocation) makes this usable as infrastructure, not just a dashboard.
- Docker Compose support and clear setup documentation mean you can have it running in under 15 minutes.
- Active solo development with 77 commits and meaningful feature additions (S3 support, routing policies, API keys) all landed in the first 12 days.

Cons:
- Solo-developer project with no PRs from other contributors yet. Long-term maintenance depends on one person's availability and motivation.
- No license file in the repo as of mid-June 2026. This is a real concern for anyone wanting to use it in production or contribute — technically, you don't have permission to do either without a license.
- MySQL-only with Prisma. No PostgreSQL option, which limits some deployment scenarios. Not a dealbreaker, but worth noting.
- The frontend `.env` file is committed to the repo, which suggests the security hygiene could be tighter for a tool that handles OAuth tokens and API keys.

### Getting Started

```bash
# Clone the repo
git clone https://github.com/zenhosta/9drive.git
cd 9drive

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Create the MySQL database
mysql -u root -e "CREATE DATABASE IF NOT EXISTS 9drive;"

# Configure backend environment
cp .env.example .env  # Edit with your Google OAuth credentials and secrets

# Run Prisma migrations
cd backend
npm run prisma:migrate

# Seed Google OAuth config (after setting credentials in .env)
npm run seed:google-config

# Start the backend
npm run dev

# In another terminal, start the frontend
cd frontend
npm run dev
```

Open http://localhost:5173 and register. If you used Google sign-in, your first Drive account connects automatically.

For Docker deployment:

```bash
docker compose up -d
```

### Alternatives

**rclone** — The Swiss army knife of cloud storage CLI tools. rclone supports 40+ storage providers and has mount, sync, copy, and serve commands. It's vastly more mature and feature-rich, but it's a CLI tool with no web UI and no smart upload routing. Choose rclone when you need scripted automation or provider coverage that 9Drive doesn't support.

**Filebrowser** — A self-hosted web file manager with a clean UI, user management, and file editing. Filebrowser is more mature (8+ years, 25K+ stars) and works with local filesystems and S3, but it doesn't connect to Google Drive natively and doesn't do multi-account routing. Choose Filebrowser when you need a general-purpose file manager for local or single-provider storage.

**MultCloud** — A SaaS multi-cloud management platform that connects Google Drive, Dropbox, OneDrive, S3, and 30+ others. MultCloud handles file transfer between providers and has a web UI, but it's a paid service ($10+/month) and your files flow through their servers. Choose MultCloud when you want zero self-hosting overhead and don't mind the cost or the third-party data path.

### Verdict

9Drive is a focused, well-executed utility that solves a real annoyance for anyone juggling multiple storage accounts. The smart upload routing and direct streaming architecture are the right design decisions — this isn't a glorified file browser bolted onto rclone. The Express + React + Prisma stack is standard enough that any fullstack developer can contribute or customize it. At 550 stars in 12 days with active development, the community interest is there.

The missing license is the biggest red flag. Until that's resolved, production use and contributions are legally ambiguous. The solo developer risk is real but mitigated by the clean, standard codebase that any TypeScript developer could fork and maintain. If you're drowning in Google Drive accounts and want a self-hosted solution that doesn't require a PhD in rclone flags, 9Drive is worth running locally this weekend to see if it fits your workflow.
