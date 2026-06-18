---
name: spacetimedb
description: "SpacetimeDB is a Rust relational database that replaces your entire backend — write business logic as modules in TypeScript, Rust, or C#, and clients connect directly with real-time sync."
url: https://github.com/clockworklabs/SpacetimeDB
stars: 24733
forks: 1007
language: Rust
tags: ["database", "realtime", "rust", "typescript", "web-framework", "serverless"]
featured: false
publishedAt: 2026-06-18
---

## SpacetimeDB

### Overview

SpacetimeDB is a relational database that doubles as your application server. You upload business logic directly into the database as compiled modules, and clients connect to it over WebSocket — no separate backend, no API layer, no deployment pipeline for your server code. It hit 24,000 GitHub stars by mid-2026, with releases shipping weekly (v2.6.0 dropped on June 16th), making it one of the fastest-moving infrastructure projects in the space.

The project comes from Clockwork Laboratories, founded by Tyler Cloutier and the team behind BitCraft Online, an MMORPG that runs its entire backend — chat, terrain, player positions, item systems — as a single SpacetimeDB module synchronizing state to thousands of concurrent players. That's not a toy demo. That's production load shaping the architecture. The core team includes contributors like bfops (400+ commits), Centril (known from the Rust compiler team), and kim, bringing serious systems-level expertise.

The core problem SpacetimeDB solves is the three-tier architecture tax. Every web or mobile app today follows the same pattern: client → API server → database. You write the same CRUD endpoints, the same auth middleware, the same serialization logic, over and over. Then you deploy it all as containers, configure load balancers, set up caching, and pray your WebSocket server doesn't lose state during a redeploy. SpacetimeDB collapses all of that into a single binary. Your tables and reducers live inside the database. Clients subscribe to queries and get pushed updates automatically when data changes. No polling. No refetching. No separate server process to manage.

### Why it matters

The "database as server" concept isn't entirely new — Firebase did something similar with its real-time database, and Supabase added real-time subscriptions to Postgres. But SpacetimeDB goes further. Firebase gives you a document store with basic sync. Supabase gives you Postgres with a thin real-time layer on top. SpacetimeDB gives you a full relational database with ACID transactions where your application code runs inside the database itself, compiled to WASM, with sub-millisecond function calls to your data.

For fullstack developers working with React, this is particularly interesting. The TypeScript client SDK provides hooks like `useTable()` that automatically subscribe to table changes — your UI updates in real-time without writing any WebSocket code, state management boilerplate, or API calls. It's like React Server Components meets real-time database, but the "server" is the database itself. If you're building collaborative tools, multiplayer games, live dashboards, or anything where state changes need to reach multiple clients instantly, the architecture simplifies dramatically.

The project also represents a bet on where infrastructure is heading. As AI agents become more capable of writing and modifying code, the fewer moving parts in your stack, the better. SpacetimeDB's single-deployable-module model means an AI agent can modify your application logic, compile it, and deploy it in one step. No orchestrating changes across frontend, backend, and database separately.

### Key Features

**Module-Based Architecture.** Your application logic is a compiled WASM module that runs inside the database. You define tables (your schema) and reducers (your business logic functions) in TypeScript, Rust, C#, or C++. When a client calls a reducer, it executes inside the database with direct access to all tables — no network hop, no serialization overhead. The module model enforces clear boundaries between data and logic.

**Automatic Real-Time Subscriptions.** Clients subscribe to SQL queries over WebSocket. When any table row changes, SpacetimeDB evaluates which subscriptions are affected and pushes diffs to connected clients. This isn't polling or change-data-capture — it's built into the storage engine. For React developers, the `useTable()` hook makes this feel like local state that happens to be synchronized across every connected client.

**Multi-Language Server Support.** Write your modules in Rust for maximum performance, TypeScript for developer velocity, C# for Unity/game developers, or C++ for Unreal Engine integration. The module interface is the same regardless of language — tables, reducers, and indexes are defined declaratively and compiled to WASM. TypeScript is the fastest path for web developers; Rust is the best choice when you need tight memory control.

**Zero Infrastructure Deployment.** `spacetime dev` starts a local development server with hot-reload. `spacetime publish` deploys to SpacetimeDB's managed cloud (Maincloud). There's no Docker, no Kubernetes, no load balancer configuration. You can also self-host via the Docker image (`docker run clockworklabs/spacetime start`) or build from source. The managed cloud has a free tier for development.

**Client SDKs for Every Platform.** The TypeScript SDK works with React, Next.js, Vue, Svelte, Angular, Node.js, Bun, and Deno. There's also a Rust SDK, a C# SDK (with Unity integration), and a C++ SDK (with Unreal Engine integration). The SDKs handle connection management, automatic reconnection, and client-side caching of subscribed data.

**Built-In Identity and Auth.** Every connection gets a cryptographic identity automatically. You write authorization logic in your reducers using the `ctx.sender` identity — the same way you'd check `req.user` in Express, but the identity is baked into the protocol. No separate auth service needed for basic use cases.

### Use Cases

- **Collaborative applications** — Real-time document editors, whiteboards, or project management tools where multiple users need to see changes instantly. The subscription model handles this natively without any additional infrastructure.

- **Multiplayer games** — SpacetimeDB was built for this. BitCraft Online runs thousands of concurrent players on a single module. Game state, chat, inventory, and world simulation all live in one place with deterministic synchronization.

- **Live dashboards and monitoring** — Financial data, IoT sensor readings, or analytics dashboards that need sub-second data freshness. Subscribe to queries and the UI updates automatically as new rows are inserted.

- **AI agent backends** — Agents that need to read and modify application state in real-time. The module model means agents can call reducers directly, and all connected clients see the changes immediately.

- **Rapid prototyping** — When you want to build a working real-time app in hours instead of days. The `spacetime dev --template chat-react-ts` command gives you a working chat app with real-time sync in under a minute.

### Pros and Cons

Pros:
- Eliminates the entire backend deployment pipeline — no servers, containers, or API layers to manage. The architecture reduction is genuine and significant for small teams.
- Real-time subscriptions are a first-class primitive, not an afterthought. The `useTable()` React hook is the cleanest real-time data binding I've seen in any framework.
- Five releases in three weeks (v2.3.0 through v2.6.0) with an 800+ issue backlog indicates extremely active development and strong community engagement.
- Multi-language module support (TypeScript, Rust, C#, C++) means you're not locked into one ecosystem, and the WASM compilation target is future-proof.

Cons:
- The Business Source License (BSL 1.1) restricts offering SpacetimeDB as a database service to third parties, and the license converts to AGPL v3 in 2031. This is more restrictive than MIT/Apache projects and may concern enterprise legal teams.
- 801 open issues suggest the API surface is still evolving. Breaking changes between versions are likely, and the TypeScript SDK documentation could be more comprehensive.
- You're trading backend flexibility for simplicity. Complex queries, stored procedures, and database-level optimizations that Postgres or MySQL offer aren't available — your module code is the only logic layer.
- Self-hosting requires building from source or using the Docker image, and production deployment guidance beyond Maincloud is limited compared to established databases.

### Getting Started

```bash
# Install the SpacetimeDB CLI
curl -sSf https://install.spacetimedb.com | sh

# Log in with GitHub
spacetime login

# Start a new project from a React + TypeScript template
spacetime dev --template chat-react-ts

# Or create a new module from scratch
spacetime init --lang typescript my-app
cd my-app

# Define a table and reducer in src/lib.ts:
# #[spacetimedb::table(accessor = messages, public)]
# pub struct Message { id: u64, sender: Identity, text: String }
#
# Publish to local dev server
spacetime publish my-app

# On the client side (React):
# npm install spacetimedb
# const [messages] = useTable(tables.message);
# messages updates automatically when data changes.
```

### Alternatives

**Firebase Realtime Database / Firestore** — Google's managed real-time database with document-based storage. Easier to get started with and has a larger ecosystem, but lacks relational queries, ACID transactions, and the ability to run custom server-side logic inside the database. Choose Firebase when you want a simple document store with real-time sync and don't need relational data or custom server logic.

**Supabase** — Open-source Firebase alternative built on Postgres with real-time subscriptions via webhooks and logical replication. Supabase gives you a full Postgres instance with a REST/GraphQL API layer and row-level security. It's more mature, has better documentation, and supports the full Postgres feature set. Choose Supabase when you need a traditional database with real-time features bolted on, rather than a fundamentally different architecture.

**Convex** — A reactive database platform for web applications with TypeScript functions that run close to the data. Convex is the closest architectural comparison to SpacetimeDB — it's also a "database as server" model with real-time subscriptions and TypeScript query functions. Convex is more polished, better documented, and has a larger ecosystem, but it's a proprietary managed service with no self-hosting option. Choose Convex when you want a similar architecture with better DX and don't need self-hosting or Rust/C# support.

### Verdict

SpacetimeDB is the most architecturally ambitious database project I've seen in years. The idea of eliminating the backend server entirely by making the database execute your application logic isn't just a clever hack — it's a genuine rethinking of how client-server applications work. The fact that an MMORPG with thousands of concurrent players runs on this architecture proves it's not theoretical. For fullstack TypeScript developers building real-time collaborative applications, the `useTable()` React hook alone is worth investigating. The frequent release cadence (5 releases in 3 weeks) and 24.7k stars suggest this isn't going away. The BSL license and evolving API are real constraints, but for greenfield projects where real-time sync is a core requirement, SpacetimeDB offers an architecture that's genuinely simpler than the alternative. If you're tired of maintaining WebSocket servers, API layers, and state synchronization code, give it a serious look.
