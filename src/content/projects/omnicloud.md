---
name: omnicloud
description: "OmniCloud is an open-source full-stack cloud drive aggregation platform that unifies Google Drive, OneDrive, Dropbox, MEGA, pCloud, Yandex Disk, and S3 into a single workspace."
url: https://github.com/dimartarmizi/OmniCloud
stars: 257
forks: 72
language: JavaScript
tags: ["cloud-storage", "vuejs", "expressjs", "fullstack", "self-hosted"]
featured: false
publishedAt: 2026-06-15
---

## OmniCloud

### Overview

OmniCloud is a full-stack cloud drive aggregation platform built with Vue.js 3 and Express.js that presents multiple cloud storage providers through a single, consistent workspace. The project launched on June 8, 2026 and crossed 250 GitHub stars in under a week — modest numbers compared to AI agent frameworks, but the growth trajectory tells a story about developer demand. The repo has already accumulated 72 forks, suggesting people aren't just starring it — they're building on it.

The platform supports seven cloud storage providers out of the box: Google Drive, OneDrive, Dropbox, MEGA, pCloud, Yandex Disk, and any S3-compatible storage. Each provider is normalized through a consistent adapter layer so the frontend doesn't need to know or care which service is hosting a given file. The architecture is clean: a Vue 3 + Vite + Tailwind CSS frontend talks to an Express.js backend that manages provider adapters, syncs metadata to a local SQLite database, and pushes upload progress over WebSockets.

The core problem OmniCloud solves is painfully familiar to anyone managing cloud storage across multiple providers. You have files scattered across Google Drive, OneDrive, and maybe an S3 bucket. Each has its own interface, its own search, its own sharing model. OmniCloud collapses all of that into one file explorer with consistent views — Home, My Drive, Recent, Starred, Shared with Me, and Quota — while keeping the data where it already lives.

### Why it matters

The cloud storage fragmentation problem has existed since Dropbox popularized sync in 2008, but nobody has shipped a clean open-source solution. Google Drive, OneDrive, and Dropbox each have their own APIs, OAuth flows, and rate limits. Writing adapters for each is tedious but not hard — the hard part is normalizing the data model and building a UI that doesn't feel like a Frankenstein of provider-specific quirks. OmniCloud does this reasonably well for a project that's one week old.

There's a broader trend at play. The self-hosting movement has accelerated since 2025, driven by storage costs, privacy concerns, and the growing reliability of home server hardware. Projects like Nextcloud have addressed part of this, but Nextcloud is a monolith — you're replacing your providers, not aggregating them. OmniCloud takes the opposite approach: keep your existing accounts, just stop switching between them. For developers building internal tools, admin dashboards, or file management features, the codebase is a useful reference for how to build a multi-provider adapter architecture.

The tech stack is also deliberately approachable. Vue 3 with Composition API, Vite for build, Pinia for state, Tailwind CSS for styling, Express.js for the API, SQLite for metadata. No exotic dependencies, no cloud-specific abstractions. If you've built a CRUD app in the last three years, you can read this codebase in an afternoon.

### Key Features

**Multi-Provider Adapter Layer.** The backend uses a registry pattern to dispatch API calls to the correct provider adapter. Each adapter implements a normalized interface — browse, upload, download, delete, rename, create folder, star/unstar — and translates between provider-specific API responses and the OmniCloud data model. Adding a new provider means implementing this interface; the rest of the system doesn't change. This is textbook adapter pattern, and it works.

**Smart Storage Allocation.** When you upload a file, OmniCloud can automatically select which provider account to target based on configurable strategies: round-robin, weighted round-robin, least-used, most-free-space, or manual. This is useful when you're trying to stay under free tier limits across multiple accounts or spread large uploads across providers. The allocation service runs server-side and the strategy is configurable per user.

**Real-Time Upload Progress via WebSocket.** Upload sessions are initiated through the REST API, but progress updates are pushed to the client over WebSocket connections. The frontend shows per-file upload progress bars that update in real time. This is a detail many file management tools skip — they either block on upload or use polling, both of which feel worse than a persistent socket connection.

**SQLite Metadata Mirror.** File metadata from all connected providers is synchronized into a local SQLite database. This means browsing files, searching, and generating quota reports doesn't require hitting provider APIs every time. The sync service runs on a schedule via node-cron and the API exposes a manual trigger. Delta sync reports show what changed between runs.

**Dual Authentication Modes.** OmniCloud supports two deployment modes: `local` for personal or single-user self-hosted setups with no authentication overhead, and `hosted` for multi-user deployments with session-cookie-based registration, login, and logout. All user data — connected accounts, file mirrors, allocation config, and settings — is scoped per user. This makes it usable both as a personal tool and as a platform you could deploy for a small team.

**Unified File Explorer Views.** The frontend includes seven main views: Home dashboard, My Drive (the primary file explorer), Shared With Me, Recent Files, Starred Files, Quota overview with account management, and Settings. Virtual-path-based navigation works across providers, so you can browse into folders without caring which provider hosts them. The UI supports drag-and-drop uploads, folder uploads, bulk delete, and file previews for supported types.

**Provider Quota Dashboard.** The Quota view shows storage usage across all connected accounts in one place. Instead of logging into Google Drive, then OneDrive, then Dropbox to check how much space you have left, you see it all on a single screen. Combined with the allocation strategies, this gives you real visibility into where your data lives and how much room is left.

### Use Cases

- **Personal cloud aggregation** — You have files across Google Drive, Dropbox, and an S3 bucket from work. Instead of three browser tabs, you manage everything from one interface. The `local` deployment mode is designed for exactly this use case.
- **Small team file sharing platform** — Deploy OmniCloud in `hosted` mode to give your team a unified file browser. Each team member connects their own provider accounts and gets a personal workspace. Useful for teams that use different cloud providers for different purposes.
- **Internal tool development reference** — The adapter pattern, WebSocket upload progress, SQLite metadata sync, and multi-provider OAuth handling are patterns you'll encounter building any file management feature. The codebase is clean enough to use as a reference implementation.
- **Storage cost optimization** — The allocation strategies (round-robin, least-used, most-free) let you distribute uploads across accounts to stay under free tier limits. Combined with the quota dashboard, you can actively manage where new files land.
- **Self-hosted alternative to cloud file managers** — If you're uncomfortable giving third-party file managers access to your cloud accounts, self-hosting OmniCloud means the only server that sees your OAuth tokens is your own.

### Pros and Cons

Pros:
- Clean adapter architecture makes adding new providers straightforward. The normalized data model means the frontend and sync layer don't need provider-specific logic.
- The tech stack (Vue 3, Express, SQLite, WebSocket) is deliberately vanilla and dependency-light. No exotic abstractions to learn, no vendor lock-in, and easy to deploy on any VPS.
- Storage allocation strategies are a genuinely useful feature that most cloud aggregation tools ignore. The round-robin and most-free strategies solve real problems for users managing multiple accounts.
- Active development — the repo has been updated daily since launch, with the project growing from zero to 257 stars and 72 forks in seven days.

Cons:
- Seven days old. The API surface, data model, and frontend are all likely to change significantly. There are 1 open issue as of this writing, but that number will grow as real users discover edge cases in provider API handling.
- No automated tests visible in the repository. For a project that handles OAuth tokens and file operations across multiple providers, this is a gap worth noting. The adapter pattern makes testing easier in theory, but the tests need to exist.
- The backend is Express.js — not NestJS, not Fastify, not a batteries-included framework. This keeps things simple but means no built-in dependency injection, no OpenAPI generation, no structured error handling. Fine for the current scope, but it could become a limitation as the project grows.

### Getting Started

```bash
# Clone the repository
git clone https://github.com/dimartarmizi/OmniCloud.git
cd OmniCloud

# Install dependencies
npm install

# Configure backend environment
cp backend/.env.example backend/.env
# Edit backend/.env with your provider credentials

# Start the backend
cd backend && npm run dev

# Start the frontend (in a separate terminal)
cd frontend && npm run dev
```

The frontend runs on `http://localhost:5173` and the backend API on `http://localhost:3000`. In `local` mode, you can start connecting provider accounts immediately from the Quota page. Provider credential setup instructions are in `docs/provider-setup.md`.

### Alternatives

**Nextcloud** — The heavyweight of self-hosted cloud storage. Nextcloud is a full collaboration platform with calendar, contacts, mail, and extensive plugin ecosystem. But it replaces your cloud providers rather than aggregating them — you're migrating to Nextcloud, not unifying existing accounts. Choose Nextcloud if you want to own the storage layer entirely. Choose OmniCloud if you want to keep using Google Drive and OneDrive but stop switching between them.

**MultCloud** — A commercial cloud-to-cloud transfer and management service that supports 30+ providers. It works well for one-time migrations and basic file management, but it's a SaaS product — your data flows through their servers. OmniCloud is self-hosted and your data stays between your browser and your provider APIs. MultCloud is the better choice if you want zero setup and don't mind the cloud-to-cloud routing. OmniCloud is the better choice if you care about data sovereignty.

**Rclone** — The command-line Swiss army knife for cloud storage. Rclone supports 70+ providers and handles sync, copy, mount, and serve operations. It's more powerful and more mature than OmniCloud, but it's a CLI tool with no GUI. For developers comfortable on the command line, Rclone might be all you need. OmniCloud serves the use case where you want a visual file explorer with drag-and-drop, real-time upload progress, and a browser-based interface.

### Verdict

OmniCloud is one week old. Let's not pretend it's production-ready. But the architecture is sound, the codebase is readable, and the problem it solves — unifying cloud storage behind a single interface — is something most developers have felt personally. The adapter pattern, smart allocation strategies, and SQLite metadata sync are patterns worth studying even if you never deploy the thing. If you're building an internal file management tool, starting from OmniCloud's codebase will save you a week of boilerplate. The 72 forks in seven days suggest other developers agree. Watch this one — it has the ingredients to become a genuinely useful tool if the maintainers ship tests and stabilize the API over the next few months.
