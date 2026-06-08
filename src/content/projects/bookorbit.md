---
name: bookorbit
description: "BookOrbit is a self-hosted digital library platform built with Vue and NestJS — manage ebooks, audiobooks, comics, and PDFs with Kobo sync and OPDS support."
url: https://github.com/bookorbit/bookorbit
stars: 896
forks: 61
language: TypeScript
tags: ["self-hosted", "nestjs", "vue", "digital-library", "ebook-reader"]
featured: false
publishedAt: 2026-06-09
---

## BookOrbit

### Overview

BookOrbit hit nearly 900 GitHub stars in its first month. For a self-hosted digital library platform, that's serious traction — especially considering it launched on May 9, 2026, and already shipped nine releases by early June. The project is maintained primarily by neonsolstice, who has pushed over 500 commits in that window, with a release cadence that puts many VC-backed startups to shame.

The pitch is straightforward: Calibre-Web has been the default self-hosted ebook manager for years, and it shows its age. The UI is functional but dated. The architecture is monolithic Python. Device sync is an afterthought. BookOrbit takes everything Calibre-Web does well — library management, metadata fetching, format support — and rebuilds it on a modern fullstack TypeScript foundation with Vue on the frontend and NestJS on the backend. The result is a platform that feels like it was designed in 2026, not 2016.

The feature list is ambitious. Built-in web readers for EPUB, MOBI, AZW3, PDF, CBZ, CBR, M4B, and MP3. Two-way reading progress sync with Kobo devices and KOReader. Metadata pulled from Google Books, Amazon, Goodreads, Hardcover, Open Library, Audible, ComicVine, and more. OPDS support for any compatible reading app. Send-to-Kindle delivery via email. OIDC single sign-on with Authentik, Keycloak, and Authelia. Smart Scopes for dynamic, rule-based shelves. Dashboard widgets for reading stats and heatmaps. It's the kind of feature set that makes you wonder how one developer shipped all this in a month.

### Why it matters

The self-hosted software ecosystem has a gap that nobody talks about enough. We have excellent options for media (Plex, Jellyfin), notes (Obsidian, Logseq), and file sync (Nextcloud), but ebook management has been stuck on Calibre-Web and its forks for years. The reading experience has moved on — people read on Kobo, Kindle, KOReader, phones, tablets — but the management layer hasn't kept up.

BookOrbit fills that gap with a stack that fullstack developers will immediately recognize. Vue 3 with TypeScript on the frontend, NestJS with TypeORM on the backend, PostgreSQL for the database, Docker for deployment. If you've built anything with this stack, you can contribute to BookOrbit, fork it, or learn from its architecture. The AGPL-3.0 license means you can self-host it freely, but modifications to the source must be shared back.

The timing connects to a broader trend. Self-hosting is no longer a hobbyist pursuit — it's a legitimate infrastructure choice for people who want control over their data. The r/selfhosted subreddit has over 400,000 members. Homelab setups are getting more sophisticated. And the AI coding agent explosion means developers are building and deploying personal tools faster than ever. BookOrbit is the kind of project that benefits from both trends: it's a polished, production-ready self-hosted app that also serves as a reference implementation for modern fullstack TypeScript development.

### Key Features

**Built-in Multi-Format Readers.** BookOrbit ships native web readers for ebooks (EPUB, MOBI, AZW3), PDFs, comics (CBZ, CBR), and audiobooks (M4B, MP3) — no plugins, no external dependencies. The reading experience is the core product, not an afterthought. You open a book in the browser and it just works, with progress tracking across sessions.

**Kobo and KOReader Device Sync.** This is the feature that separates BookOrbit from every other self-hosted library manager. Push books directly to your Kobo e-reader and maintain two-way reading progress sync via KOReader over OPDS. If you own a Kobo, this alone justifies running BookOrbit instead of Calibre-Web.

**Rich Metadata from Multiple Providers.** Fetch book metadata from Google Books, Amazon, Goodreads, Hardcover, Open Library, Audible, ComicVine, and more. The metadata system pulls cover images, descriptions, series information, ISBNs, and publication details automatically. For anyone who has spent hours manually tagging a Calibre library, this is transformative.

**Smart Scopes and Dynamic Collections.** Organize your library using curated lists and rule-based saved filters. Define a Smart Scope with conditions like "unread sci-fi books added in the last 30 days with ratings above 4 stars" and it updates automatically as your library grows. This is the kind of feature that makes large libraries manageable.

**OIDC Single Sign-On.** Native support for Authentik, Keycloak, and Authelia via OIDC. Granular per-user permissions and isolated reading data. This makes BookOrbit viable for families, small teams, or communities — not just solo users. Each person gets their own reading stats, progress, and recommendations.

**OPDS and Content Delivery.** Full OPDS support means any OPDS-compatible reading app (Moon+ Reader, PocketBook, KyBook, and dozens more) can browse and download from your BookOrbit library. There's also Send-to-Kindle delivery via email and browser drag-and-drop uploads for adding new books.

**Automated Ingestion with Book Dock.** Configure a drop folder and BookOrbit automatically imports new books as they appear. Drop files into the folder, and they show up in your library with metadata fetched and covers extracted. No manual import step required.

### Use Cases

- **Personal digital library** — You have hundreds or thousands of ebooks, PDFs, and audiobooks scattered across drives and cloud storage. BookOrbit gives them a single, searchable home with a modern reading interface and progress tracking.
- **Kobo e-reader owners** — The two-way sync with Kobo devices and KOReader is unmatched in any other self-hosted solution. Buy a book, drop it in BookOrbit, push it to your Kobo, read on the couch, and your progress syncs back.
- **Family or small team library** — OIDC SSO with per-user permissions means multiple people can share one BookOrbit instance without seeing each other's reading history or recommendations.
- **Self-hosted alternative to Kindle ecosystem** — Send-to-Kindle delivery, OPDS support, and multi-format readers let you escape Amazon's walled garden while keeping the convenience of cloud-synced reading.
- **Developers learning NestJS** — BookOrbit's codebase is a real-world, production-quality NestJS application with TypeORM, PostgreSQL, Docker, and Vue 3. Studying its architecture is more instructive than any tutorial.

### Pros and Cons

Pros:
- The release cadence is remarkable — nine releases in 30 days (v1.1.0 through v1.9.0), with each version adding meaningful features. The maintainer ships fast and breaks nothing.
- The Vue + NestJS + TypeScript stack is immediately familiar to fullstack web developers. The codebase is well-organized and approachable for contributors.
- Kobo/KOReader sync is a killer feature that no other self-hosted library manager offers. If you own an e-reader, this changes the game.
- Docker-first deployment with a clean docker-compose setup. The .env configuration is minimal and well-documented.

Cons:
- 75 open issues suggest the project is still finding its API surface. Early adopters should expect some rough edges and potential breaking changes before v2.0.
- The project is primarily maintained by a single developer (neonsolstice, 529 of 538 total commits). Bus factor is a real concern for a project this complex.
- AGPL-3.0 is restrictive for commercial use. If you're building a product that includes library management, you'll need to either open-source your entire stack or negotiate a different license.

### Getting Started

```bash
# Create project directory and subdirectories
mkdir bookorbit && cd bookorbit
mkdir -p books data/app data/postgres

# Download configuration files
curl -fsSLo .env https://raw.githubusercontent.com/bookorbit/bookorbit/main/.env.example
curl -fsSLo docker-compose.yml https://raw.githubusercontent.com/bookorbit/bookorbit/main/docker-compose.yml
```

Edit `.env` and set the required values:

```dotenv
APP_URL=http://your-server-ip:3000
BOOKS_HOST_PATH=./books
POSTGRES_PASSWORD=<generate with: openssl rand -hex 24>
JWT_SECRET=<generate with: openssl rand -hex 32>
SETUP_BOOTSTRAP_TOKEN=<generate with: openssl rand -hex 16>
```

Start the stack:

```bash
docker compose up -d
```

Open `http://your-server-ip:3000` and complete the setup wizard using your `SETUP_BOOTSTRAP_TOKEN`. For local development:

```bash
git clone https://github.com/bookorbit/bookorbit.git
cd bookorbit
pnpm install
pnpm run dev
```

### Alternatives

**Calibre-Web** — The incumbent. Python-based, mature, and widely deployed. Calibre-Web has a larger community and more battle-tested releases, but its UI feels dated and it lacks device sync, OIDC, and the modern reading experience BookOrbit provides. Choose Calibre-Web if you want the most stable option and don't care about aesthetics or device integration.

**Kavita** — Another self-hosted reading server focused on comics and manga. Kavita has a cleaner UI than Calibre-Web and better comic reader support, but its ebook handling is weaker and it doesn't offer Kobo sync. Choose Kavita if your library is primarily comics and manga.

**Audiobookshelf** — Focused specifically on audiobooks and podcasts. Audiobookshelf has the best audiobook listening experience of any self-hosted solution, with chapter support, variable speed, and sleep timers. Choose Audiobookshelf if audiobooks are your primary content type and you don't need ebook management.

### Verdict

BookOrbit is the most complete self-hosted digital library platform I've seen. The combination of Vue + NestJS + TypeScript makes it approachable for fullstack developers, and the feature set — especially Kobo sync, OIDC, and multi-format readers — goes well beyond what Calibre-Web offers. The release velocity is impressive (nine releases in 30 days), and the 900 stars in the first month suggest the self-hosted community agrees this was needed. The AGPL license and single-maintainer bus factor are real considerations, but for personal or family use, BookOrbit is the clear winner in 2026. If you have a Kobo and a NAS, this is the project you've been waiting for.
