---
name: world-of-claudecraft
description: "A classic-style MMO built with TypeScript, Three.js, PostgreSQL, and WebSockets — full-stack web architecture patterns you can play."
url: https://github.com/levy-street/world-of-claudecraft
stars: 942
forks: 270
language: TypeScript
tags: ["fullstack", "typescript", "mmo", "threejs", "websocket", "postgresql"]
featured: false
publishedAt: 2026-06-17
---

## World of ClaudeCraft

### Overview

World of ClaudeCraft is a classic-era-MMO-flavored micro-MMO built entirely on the modern web stack. TypeScript, Three.js, PostgreSQL, Vite, WebSockets — the whole thing runs in your browser and on a Node.js server. It hit 942 GitHub stars within a week of its June 2026 launch, which says something about how hungry developers are for real-world full-stack architecture examples that go beyond another to-do app.

The project is built by levy-street and released under MIT. What makes it stand out isn't the game itself (though it's genuinely fun to play) — it's the engineering underneath. This is a complete client-server multiplayer game with authoritative server architecture, persistent character data in PostgreSQL, real-time WebSocket synchronization, authentication with scrypt-hashed passwords, and a deterministic simulation core that runs identically on both client and server. If you've ever wanted to understand how to build a real-time multiplayer web application, this codebase is one of the best open-source references available.

The scope is impressive for a project barely a week old. Three zones with roughly 60 quests, nine playable classes faithfully modeled after classic MMO mechanics, a 5-player dungeon instance system, a 1v1 ranked arena with Elo matchmaking, player trading, party systems, and procedural rendering for everything from creature models to sound effects. No asset files — everything is generated at runtime from code. That's a bold architectural choice and it pays off: the entire game is a single deployable unit with zero external asset dependencies.

### Why it matters

Most "full-stack demo projects" you find on GitHub are CRUD apps with a React frontend and an Express backend. They teach you the basics but they don't prepare you for the hard problems: real-time state synchronization across multiple clients, authoritative server design that prevents cheating, interest-scoped data delivery so you're not broadcasting every event to every player, or graceful handling of network latency in an interactive application.

World of ClaudeCraft solves all of these problems in the open. The server runs a single shared simulation (`src/sim/`) and sends interest-scoped snapshots (~120 yard radius) plus per-player-routed events to connected clients. Clients stream movement intent and commands at 20 Hz. All combat math, loot rolls, quest credit, and vendor transactions happen server-side — the client is purely a renderer. This is the same architecture used by professional game studios, and having it available as a readable TypeScript codebase is rare.

For fullstack web developers working on collaborative tools, real-time dashboards, multiplayer features, or any application where multiple users interact with shared state, the patterns in this repo transfer directly. The WebSocket protocol design, the database persistence layer (characters saved every 30 seconds, on logout, and on server shutdown), the Docker Compose deployment setup — these are production patterns, not toy examples.

### Key Features

**Authoritative Server Architecture.** The game server is the single source of truth for all game state. Clients send input frames (movement intent, ability usage, target selection) at 20 Hz, and the server processes them against its authoritative simulation. This prevents client-side cheating and ensures consistency across all connected players. The same pattern applies to any real-time collaborative web application where data integrity matters — think Google Docs-style editing, collaborative whiteboards, or multiplayer productivity tools.

**Deterministic Simulation Core.** The `src/sim/` directory contains a deterministic N-player game engine with zero DOM imports. It runs on both the server (Node.js) and the client (browser) identically. The client uses it for offline play and prediction; the server uses it as the authoritative world state. This dual-runtime approach is a powerful pattern for reducing perceived latency in real-time web applications — the client can predict outcomes locally while the server confirms them.

**PostgreSQL Persistence with JSONB.** Character data — level, gear, bags, quests, position, money — is stored as JSONB in PostgreSQL 16. The system saves every 30 seconds, on logout, and on server shutdown. Authentication uses scrypt-hashed passwords with 7-day bearer tokens. This is a practical example of how to handle complex, nested game state in a relational database without over-normalizing. The JSONB approach works well for any application with semi-structured user data that doesn't fit neatly into rigid schemas.

**Procedural Asset Generation.** Every visual element — creature models, spell icons, building textures, terrain — is generated procedurally at runtime using Three.js and Canvas APIs. There are no external asset files to load or manage. Sound effects are synthesized with WebAudio. This architectural decision eliminates asset pipeline complexity, reduces bundle size to essentially zero for media, and makes the entire game deployable as a single unit. It's an extreme example, but the underlying principle — prefer code-generated assets over hand-crafted files for simpler deployment — applies to many web projects.

**WebSocket Real-Time Synchronization.** The networking layer uses WebSockets for bidirectional real-time communication. The server sends interest-scoped snapshots (only data relevant to what a player can see within ~120 yards) plus per-player-routed events. This bandwidth-conscious design is critical for any real-time web application — you don't want to broadcast every state change to every connected client. The protocol design in `src/net/` is clean enough to study as a reference implementation.

**Docker Compose One-Command Deployment.** The entire stack — PostgreSQL 16, the game server, and the web client — deploys with a single `docker compose up -d --build`. For production, you put it behind a TLS reverse proxy (Caddy makes it two lines). This is the kind of developer experience every project should aim for. The Dockerfile and compose configuration are worth studying for anyone building containerized web applications.

**Comprehensive Test Suite.** The project includes Vitest unit tests covering formulas, combat, AI, quests, all 9 classes, parties, duels, trades, and elite encounters. There are also browser-based E2E tests for individual classes (warrior, mage, rogue), multiplayer integration tests that verify two browser clients can see each other, and a 26-check API/WebSocket/persistence test suite. The testing strategy demonstrates how to test complex interactive systems — something many web projects neglect.

### Use Cases

- **Learning real-time multiplayer architecture** — If you're building any application with real-time shared state (collaborative editing, multiplayer games, live dashboards), this codebase shows you how to handle the hard problems: state synchronization, interest scoping, and authoritative server design.

- **Full-stack TypeScript reference project** — The clean separation between simulation, rendering, networking, UI, and server code makes this an excellent reference for structuring large TypeScript applications. The `src/world_api.ts` interface that both Sim and ClientWorld satisfy is a textbook example of dependency inversion.

- **WebSocket protocol design study** — The networking layer in `src/net/` demonstrates a real-world WebSocket protocol with binary frames, interest-scoped updates, and graceful reconnection. Useful for anyone building chat systems, live collaboration tools, or real-time data feeds.

- **Docker deployment patterns** — The Docker Compose setup with PostgreSQL, health checks, and reverse proxy configuration is a practical template for deploying any Node.js web application with a database.

- **Procedural generation in the browser** — The Three.js and Canvas-based procedural asset generation is a masterclass in creating rich visuals without external files. Applicable to data visualization, generative art, or any project where you want to reduce asset management overhead.

### Pros and Cons

Pros:
- The codebase is genuinely readable and well-structured. The clean separation between `src/sim/` (logic), `src/render/` (Three.js), `src/net/` (networking), `src/ui/` (HUD), and `server/` (backend) makes it easy to navigate and learn from.
- One-command Docker deployment with PostgreSQL, WebSockets, and TLS proxy support. This is production-grade DevOps, not a "just run npm start" demo.
- MIT licensed, so you can fork it, remix it, and host your own world without restrictions.
- Comprehensive test coverage with both unit tests (Vitest) and browser-based E2E tests, including multiplayer integration tests that verify real cross-client synchronization.

Cons:
- Three.js is a large dependency (~600KB gzipped). If you're studying the networking patterns but don't need 3D rendering, you'll need to extract the relevant code yourself.
- The game-specific logic (combat formulas, quest systems, class abilities) is extensive and can be overwhelming if you're only interested in the architecture patterns. There's no separate "architecture-only" branch.
- No TypeScript project references or monorepo setup — the client and server share code through direct imports rather than a formal workspace structure, which can make it harder to deploy them independently.

### Getting Started

```bash
# Clone the repo
git clone https://github.com/levy-street/world-of-claudecraft.git
cd world-of-claudecraft

# Quick start with Docker (PostgreSQL + game server)
cp .env.example .env
# Edit .env and set a long random POSTGRES_PASSWORD
docker compose up -d --build
# Open http://localhost:8787 — create an account, create a character, play

# Or develop locally with hot reload
npm install
cp .env.example .env
# Edit .env with POSTGRES_PASSWORD and DATABASE_URL
npm run db:up        # PostgreSQL 16 in Docker (port 5433)
npm run server       # Game server on :8787 (REST + WebSocket)
npm run dev          # Client dev server on :5173 (proxies /api and /ws)

# Open http://localhost:5173 → Play Online → create account → play
# Or: Play Offline → jump straight into the world

# Run tests
npm test             # Vitest: formulas, combat, AI, quests, all classes
npm run build        # Production web build
```

### Alternatives

**Colyseus** — A multiplayer game framework for Node.js that handles room management, state synchronization, and client-side prediction. Colyseus is more framework-like (you build on top of it) while World of ClaudeCraft is a complete application you can study. Choose Colyseus if you want a reusable multiplayer framework; choose ClaudeCraft if you want to understand how such a framework works internally.

**Nakama** — An open-source game server by Heroic Labs with support for matchmaking, leaderboards, authentication, and real-time multiplayer. Nakama is a production game server with client SDKs for Unity, Unreal, and JavaScript. It's more feature-complete but also more complex and opinionated. Choose Nakama if you're building a commercial game; choose ClaudeCraft if you want to learn the patterns from scratch.

**socket.io + Express boilerplate** — The typical starting point for real-time Node.js applications. These boilerplates give you a basic WebSocket setup but none of the hard problems: interest scoping, authoritative state management, or persistent game world simulation. Choose a boilerplate if you're building a simple chat app; choose ClaudeCraft if you need to understand how to scale real-time state management for complex interactive applications.

### Verdict

World of ClaudeCraft is the most instructive full-stack TypeScript project I've seen in 2026. It's not a framework or a library — it's a complete, playable application that demonstrates every hard problem in real-time web development: authoritative server design, WebSocket protocol optimization, PostgreSQL persistence for complex nested state, procedural asset generation, and one-command Docker deployment. The codebase is clean enough to read cover-to-cover, and the test suite is thorough enough to give you confidence when refactoring. If you're a fullstack web developer who learns best from real code rather than tutorials, clone this repo and spend a weekend with it. The 942 stars in its first week suggest the developer community agrees — this is worth your time.
