---
name: trek
description: "TREK is a self-hosted travel planner built with React 19 and NestJS 11 — real-time collaboration, interactive 3D maps, PWA, SSO, budgets, and packing lists in one open-source app."
url: https://github.com/mauriceboe/TREK
stars: 5697
forks: 561
language: TypeScript
tags: ["react", "nestjs", "travel", "self-hosted", "pwa", "real-time"]
featured: false
publishedAt: 2026-06-17
---

## TREK

### Overview

TREK is a self-hosted, open-source travel planner that hit 5,600 GitHub stars in under three months since its March 2026 launch. That kind of growth for a niche application tells you something — developers have been waiting for a modern, self-hosted alternative to commercial travel planning tools like Wanderlog and TripIt.

The project is built by Maurice Boe (mauriceboe), a developer who's clearly been thinking about this problem for a while. The architecture is opinionated in the right ways: React 19 on the frontend, NestJS 11 on the backend, Zustand for state management, WebSockets for real-time sync, and a proper auth stack with JWT, OAuth 2.1, OIDC, WebAuthn passkeys, and TOTP MFA. This isn't a weekend project — the codebase has 491 commits from the lead maintainer and nearly 500 from a second core contributor (jubnl), with version 3.1.0 shipping in mid-June 2026.

The core problem TREK solves is coordination. Planning a trip with friends or family usually means a mess of Google Docs, shared spreadsheets, WhatsApp threads, and screenshot bookmarks. TREK consolidates all of that into a single self-hosted application with real-time collaboration — changes appear instantly across all connected users via WebSocket. You get interactive maps with Leaflet or Mapbox GL, budget tracking with expense splitting, packing lists, a magazine-style travel journal, and even a world map atlas that tracks which countries you've visited. The data lives on your server, not in someone else's cloud.

### Why it matters

The self-hosted application space has matured dramatically. Projects like Nextcloud, Gitea, and Immich proved that developers want to own their data, but travel planning has been oddly underserved. Commercial alternatives either lock your trip data behind subscriptions, harvest it for advertising, or shut down without warning. TREK fills that gap with a polished, production-ready application that you can deploy with a single Docker command.

For fullstack web developers, TREK is worth studying as much as it's worth using. The React 19 + NestJS 11 stack is the exact combination many teams are building with today. The real-time sync implementation, the multi-provider auth system (OIDC, passkeys, TOTP), the PWA setup that works on iOS and Android without an app store — these are patterns you'll encounter in production applications. Reading TREK's source is like getting a free masterclass in modern fullstack architecture.

The project also demonstrates how AI tooling is changing open-source development. The contributor list includes "claude" as a contributor with 8 commits, and the project's recent 3.1.0 release involved a "NestJS + Zod foundation harness" refactor — language that suggests heavy AI-assisted development. This is the new normal for open-source projects, and TREK is a clean example of it.

### Key Features

**Real-time Collaboration via WebSocket.** Changes to trips, places, budgets, and packing lists sync instantly across all connected users. No polling, no manual refresh — just WebSocket-powered live updates. This is the kind of feature that separates a toy project from something people actually use with friends.

**Interactive 3D Maps with Multiple Providers.** The map layer supports both Leaflet (free, OpenStreetMap tiles) and Mapbox GL (3D buildings, terrain). You get photo markers, clustering for dense areas, route visualization, and category filtering. Place search works with Google Places (photos, ratings, hours) or OpenStreetMap (free, no API key needed). You can even import places from shared Google Maps lists, Naver Maps, and GPX/KML/KMZ/GeoJSON files.

**Full Auth Stack with Passkeys.** JWT-based authentication with OAuth 2.1 and OIDC support for Google, Apple, Authentik, Keycloak, or any custom provider. WebAuthn passkeys for passwordless login, plus TOTP MFA for two-factor authentication. The SSO-only mode disables password login entirely — useful for teams or families running their own identity provider. This is a production-grade auth implementation, not a demo.

**Installable PWA on iOS and Android.** TREK runs as a Progressive Web App that installs directly from the browser — no App Store approval, no Google Play listing, no waiting. On iOS, you add it to the home screen; on Android, the browser prompts you to install. The PWA includes offline support and push notifications, so it feels like a native app.

**Budget Tracking with Expense Splitting.** Track trip expenses by category, split costs between travelers, and see per-person breakdowns. This eliminates the post-trip spreadsheet math that usually happens when someone pays for a group dinner and everyone forgets to Venmo them back.

**Journey Journal with Photo Integration.** A magazine-style travel journal where you document your trips with entries, photos, maps, and mood tracking. Photo integration supports Immich (the self-hosted photo backup solution) and Synology Photos, keeping everything self-hosted. The liquid-glass UI on the Atlas view is a nice touch — it shows a world map of visited countries, bucket list items, and travel stats.

**Auto-backups and Flexible Configuration.** Scheduled backups with configurable retention policies. Unit preferences for temperature (°C/°F), time format (12h/24h), map tile sources, and default coordinates. Environment variables control everything from encryption keys to SMTP settings to OIDC configuration.

### Use Cases

- **Group trip planning** — Friends or family coordinating a vacation together, with real-time updates to the itinerary, shared budget tracking, and collaborative packing lists. No more "did you book the hotel?" messages.
- **Solo travel documentation** — Individual travelers who want a private, self-hosted journal of their trips with maps, photos, and expense tracking. The Journey feature creates magazine-quality trip reports.
- **Team offsites and company retreats** — Small companies or remote teams planning in-person meetups. SSO integration with corporate identity providers (Keycloak, Authentik) makes it easy to add to existing infrastructure.
- **Self-hosted homelab projects** — Developers running Immich, Nextcloud, and other self-hosted services who want a travel planner that fits the same stack. Docker Compose deployment takes minutes.
- **Learning modern fullstack patterns** — Developers studying React 19, NestJS 11, WebSocket real-time sync, WebAuthn passkeys, or PWA implementation. TREK's codebase is well-structured and actively maintained.

### Pros and Cons

Pros:
- The React 19 + NestJS 11 stack is the exact combination many production teams use, making the codebase directly applicable to real work. Zustand for state, WebSockets for real-time, and a proper auth stack demonstrate patterns you'll reuse.
- Real-time collaboration actually works — not just a checkbox feature. WebSocket sync with conflict resolution is hard to get right, and TREK handles it well enough for group planning.
- Self-hosted with Docker one-liner deployment. No vendor lock-in, no subscription fees, no data harvesting. Your trip data stays on your server.
- Active development with 491 commits from the lead maintainer, 476 from a second core contributor, and a clear roadmap. Version 3.1.0 shipped in June 2026 with a major NestJS refactor.

Cons:
- The feature set is ambitious, which means the codebase is large. New contributors face a steep learning curve — the NestJS backend alone covers auth, WebSocket, database migrations, file uploads, and multiple third-party API integrations.
- Google Places API integration requires an API key and costs money at scale. The free OpenStreetMap alternative works but has less detailed place data (no photos, limited ratings).
- AGPL v3 license means any modifications you deploy must be open-sourced. This is fine for personal use but could be a problem for companies wanting to customize it for internal use without publishing their changes.

### Getting Started

```bash
# Quick start with Docker (recommended)
ENCRYPTION_KEY=$(openssl rand -hex 32)
docker run -d -p 3000:3000 \
  -v ./data:/app/data \
  -v ./uploads:/app/uploads \
  -e ENCRYPTION_KEY=$ENCRYPTION_KEY \
  --restart unless-stopped \
  mauriceboe/trek

# Open http://localhost:3000
# On first boot, TREK seeds an admin account
# Set ADMIN_EMAIL/ADMIN_PASSWORD env vars for custom credentials

# Docker Compose (production)
git clone https://github.com/mauriceboe/TREK.git
cd TREK
docker compose up -d

# Install as PWA
# Desktop: Click the install icon in the address bar
# iOS: Safari → Share → Add to Home Screen
# Android: Menu → Install app
```

For production, put TREK behind a TLS-terminating reverse proxy. TREK uses WebSockets for real-time sync, so the proxy must support WebSocket upgrades. Caddy handles this automatically:

```bash
# Caddyfile
trek.yourdomain.com {
    reverse_proxy localhost:3000
}
```

### Alternatives

**Wanderlog** — The most popular commercial travel planner with a polished mobile app and collaborative features. Wanderlog is easier to get started with (no self-hosting required) but stores all your data on their servers and requires a premium subscription for offline access and advanced features. Choose Wanderlog if you want zero setup and don't care about data ownership.

**TripIt** — Enterprise-focused travel organizer that parses confirmation emails to build itineraries automatically. TripIt excels at business travel with flight tracking and loyalty program integration, but it's not designed for collaborative trip planning or self-hosting. Choose TripIt if your primary use case is organizing business trips from forwarded emails.

**Nextcloud with Maps and Deck** — If you're already running Nextcloud, you can cobble together travel planning with the Maps app (place markers, routes) and Deck (kanban-style task management for packing lists and to-dos). The integration is loose — no real-time sync between trip participants, no budget tracking, no journal — but it keeps everything in one self-hosted platform. Choose this if you want minimal new infrastructure.

### Verdict

TREK is the kind of project that makes you wonder why nobody built it sooner. The self-hosted ecosystem has excellent options for photos (Immich), files (Nextcloud), code (Gitea), and notes (Outline), but travel planning has been a glaring gap. TREK fills it with a modern React 19 + NestJS 11 architecture that's worth studying even if you never plan a trip. The real-time collaboration via WebSocket, the multi-provider auth stack with passkeys, and the PWA deployment that works on mobile without an app store — these are patterns every fullstack developer should understand. At 5,600 stars and growing, with active development from two core contributors shipping version 3.1.0, this is a project with momentum. The Docker one-liner deployment means you can have it running in minutes, and the AGPL license ensures it stays open. If you're building anything with React and NestJS, spend an afternoon reading TREK's source code. You'll learn something.
