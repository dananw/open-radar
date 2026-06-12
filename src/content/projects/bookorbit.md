---
name: bookorbit
description: "BookOrbit is a self-hosted digital library and reading platform built with NestJS, Vue, and TypeScript — Kobo sync, OIDC SSO, multi-format readers, and OPDS support."
url: https://github.com/bookorbit/bookorbit
stars: 932
forks: 62
language: TypeScript
tags: ["nestjs", "vue", "self-hosted", "library", "typescript", "ebook-reader"]
featured: false
publishedAt: 2026-06-12
---

## BookOrbit

### Overview

BookOrbit is a self-hosted digital library and reading platform that handles ebooks, PDFs, audiobooks, and comics in one place. It hit 900 GitHub stars within a month of its May 2026 launch, which tracks — the self-hosted media server space has been hungry for a modern alternative to Calibre-Web and Ubooquity that actually feels like a product built in 2026.

The project is maintained primarily by a single developer (neonsolstice, 544 commits), which is both impressive and worth noting. One-person projects can move fast and stay focused, but they also carry bus-factor risk. That said, the codebase is substantial — nearly 10 million bytes of TypeScript and 2.7 million bytes of Vue — and the commit cadence shows daily activity through mid-June. This is not an abandoned side project.

The core problem BookOrbit solves is library fragmentation. If you read across multiple devices (Kindle, Kobo, phone, tablet), formats (EPUB, PDF, CBZ, M4B), and platforms, your reading life is scattered across Calibre on your desktop, Libby on your phone, and some random OPDS server you set up two years ago. BookOrbit consolidates all of that into a single self-hosted instance with web readers, device sync, metadata management, and multi-user support.

### Why it matters

The self-hosted media ecosystem has Plex for video, Navidrome for music, and Immich for photos, but books have been the neglected stepchild. Calibre is powerful but its web interface feels like 2012, and Calibre-Web is a community fork that hasn't fundamentally changed the UX. Ubooquity is Java-based and barely maintained. Kavita is the closest modern competitor, but its development has slowed.

BookOrbit arrives with a modern stack (NestJS backend, Vue frontend, PostgreSQL, Docker-first deployment) and features that matter to real readers: two-way Kobo sync via OPDS, Send-to-Kindle delivery, reading statistics with heatmaps and streaks, and Smart Scopes for dynamic rule-based shelves. The OIDC/SSO support (Authentik, Keycloak, Authelia) means it fits into a proper homelab identity setup without cobbling together auth middleware.

For fullstack web developers specifically, BookOrbit is worth studying as a reference implementation. The NestJS backend handles complex domain logic (metadata aggregation from 8+ providers, OPDS protocol compliance, device sync state machines) while the Vue frontend delivers a polished reading experience with built-in EPUB, PDF, comic, and audiobook readers. If you've ever wanted to see how a production-quality self-hosted app is structured, this codebase is a good teacher.

### Key Features

**Built-in Multi-Format Readers.** BookOrbit ships with native web readers for EPUB, MOBI, AZW3, PDF, CBZ, CBR, M4B, and MP3 — no plugins, no extensions, no "install this companion app." The readers run entirely in the browser. This matters because most competing platforms either rely on external readers or support only a subset of formats. Having everything built-in means your non-technical family members can actually use it.

**Kobo and KOReader Two-Way Sync.** Push books directly to Kobo devices and maintain reading progress sync via KOReader over OPDS. This is the feature that makes BookOrbit a daily driver rather than a "set it up and forget about it" project. The sync is bidirectional — read on your Kobo, pick up where you left off on the web, and vice versa. Kavita has basic OPDS support but nothing approaching this level of device integration.

**Smart Scopes and Dynamic Collections.** Organize your library using rule-based saved filters that update automatically. Want a shelf of "unread science fiction added in the last 30 days with a Goodreads rating above 4.0"? Smart Scopes does that without manual curation. Traditional collections are static — you add books manually. Smart Scopes are queries that run against your metadata, which means your library organizes itself as it grows.

**OIDC/SSO with Granular Permissions.** Native support for Authentik, Keycloak, and Authelia via OIDC, plus per-user permissions and isolated reading data. Each family member gets their own reading stats, progress tracking, and library view. This is table stakes for any serious self-hosted app in 2026, but surprisingly few book platforms implement it properly. BookOrbit gets it right.

**Rich Metadata from 8+ Providers.** Fetch book metadata from Google Books, Amazon, Goodreads, Hardcover, Open Library, Audible, ComicVine, and more. The metadata system is designed for accuracy — it cross-references multiple sources and lets you manually override when the automated matching gets it wrong (which happens more than you'd think with translated editions and box sets).

**Reading Statistics and Gamification.** Track daily reading time, view heatmaps (GitHub-style), maintain streaks, and monitor library health metrics. This is the kind of feature that sounds gimmicky but actually changes behavior. Seeing a 14-day streak motivates you to keep reading. The stats are per-user and persistent, so each family member gets their own reading story.

**Docker-First with Automated Ingestion.** One `docker compose up` gets you running. Configure a Book Dock drop folder for hands-free importing — drop files in, they appear in your library with metadata auto-fetched. OPDS support means any OPDS-compatible app (Moon+ Reader, Aldiko, PocketBook) can connect to your library remotely.

### Use Cases

- **Homelab enthusiasts** who already run Plex, Home Assistant, and Pi-hole and want to add a proper book server to their stack. The Docker deployment and OIDC integration fit right into existing infrastructure.
- **Families with mixed reading habits** — parents reading Kindle books, kids reading comics, everyone wanting their own progress tracking and recommendations. Multi-user with isolated data handles this cleanly.
- **Kobo and KOReader power users** who want a self-hosted alternative to Kobo's cloud sync. The two-way OPDS sync means you own your reading data instead of trusting it to Rakuten's servers.
- **Developers studying modern self-hosted app architecture** — NestJS + Vue + PostgreSQL + Docker with OIDC, OPDS protocol compliance, and device sync is a textbook example of how to build this class of application.
- **Digital library curators** managing large collections across formats. Smart Scopes, bulk metadata operations, and automated ingestion handle collections of 10,000+ books without manual busywork.

### Pros and Cons

Pros:
- The NestJS + Vue + TypeScript stack is a genuine fullstack showcase — well-structured, typed end-to-end, and modern without being trendy. The codebase is readable and the architecture decisions are documented.
- Kobo two-way sync is a killer feature that no other self-hosted book platform offers at this quality level. If you own a Kobo, this alone justifies the setup.
- OIDC/SSO out of the box means BookOrbit integrates into a real homelab identity stack without third-party auth shims or reverse proxy hacks.
- Active development with 544 commits from the primary maintainer in about a month, plus daily commits through mid-June 2026. The project has momentum.

Cons:
- AGPL v3 license means any modifications you make to the source code must be shared under the same license. This is fine for personal use but may be a concern for commercial deployments or embedding in other products.
- Single primary maintainer creates sustainability risk. If neonsolstice burns out or moves on, the project could stall. The contributor graph shows limited community involvement so far.
- Relatively young project — only about a month old as of mid-June 2026. Expect rough edges, missing features, and potential breaking changes in the near term. The 62 forks suggest experimentation but limited production deployment.
- No mobile app — the web interface is responsive, but a native mobile client with offline reading support would be a significant upgrade for commuters and travelers.

### Getting Started

```bash
# Create project directory and required subdirectories
mkdir bookorbit && cd bookorbit
mkdir -p books data/app data/postgres

# Download configuration files
curl -fsSLo .env https://raw.githubusercontent.com/bookorbit/bookorbit/main/.env.example
curl -fsSLo docker-compose.yml https://raw.githubusercontent.com/bookorbit/bookorbit/main/docker-compose.yml

# Edit .env — set these required values:
# APP_URL=http://your-server-ip:3000
# BOOKS_HOST_PATH=./books
# POSTGRES_PASSWORD=<generate with: openssl rand -hex 24>
# JWT_SECRET=<generate with: openssl rand -hex 32>
# SETUP_BOOTSTRAP_TOKEN=<generate with: openssl rand -hex 16>

# Start the stack
docker compose up -d
```

Open `http://your-server-ip:3000` and complete the one-time setup wizard using your `SETUP_BOOTSTRAP_TOKEN`. From there, create your first library, point it at your books folder, and let the metadata scanner run. Full installation docs (reverse proxy, NAS permissions, external database) are at [bookorbit.app/installation](https://bookorbit.app/installation.html).

### Alternatives

**Kavita** — The closest competitor in the self-hosted book server space. Kavita has a larger community, more mature codebase, and better comic/manga support. However, its development has slowed significantly in 2025-2026, and it lacks BookOrbit's Kobo two-way sync and Smart Scopes. Choose Kavita if you need a battle-tested solution today and don't care about device sync.

**Calibre-Web** — A web frontend for Calibre's database that's been the default recommendation for years. It's simple, stable, and works. But it depends on Calibre's desktop app for library management, its web readers are basic, and the UI hasn't evolved meaningfully. Choose Calibre-Web if you already have a Calibre library and just want to read in a browser.

**Ubooquity** — A Java-based comic and ebook server that's lightweight and easy to run. It's been around since 2015 and the developer is still responsive to issues, but the feature set is minimal — no user accounts, no metadata management, no device sync. Choose Ubooquity if you want the absolute simplest option and don't need multi-user support.

### Verdict

BookOrbit is the most polished self-hosted book platform to launch in 2026. The NestJS + Vue architecture is clean, the feature set is ambitious without being bloated, and the Kobo two-way sync is a genuine differentiator that no competitor offers. It's young — one month old with a single primary maintainer — so temper expectations around stability and long-term sustainability. But if you're a developer running a homelab and you've been waiting for something better than Calibre-Web, BookOrbit is worth setting up this weekend. The 900 stars in a month suggest the self-hosted community agrees that this space needed a shake-up.
