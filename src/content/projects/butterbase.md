---
name: butterbase
description: "Butterbase is an open-source AI-native backend-as-a-service with Postgres, auth, storage, serverless functions, and a built-in MCP server for agent integration."
url: https://github.com/butterbase-ai/butterbase
stars: 1463
forks: 108
language: TypeScript
tags: ["baas", "postgres", "typescript", "mcp", "supabase-alternative"]
featured: false
publishedAt: 2026-06-07
---

## Butterbase

### Overview

Butterbase is an open-source, AI-native backend-as-a-service built in TypeScript on top of Postgres. It launched in late May 2026 and crossed 1,400 GitHub stars within three weeks, which is a strong signal for a BaaS project competing in a space dominated by Supabase and Firebase. The project is developed by NetGPT Inc. and led by a primary maintainer with over 240 commits in the first month alone — that kind of velocity on a new project usually means the team knows exactly what they're building.

The pitch: modern fullstack apps need a backend that handles data, auth, storage, functions, and increasingly AI features, but stitching together Supabase + Vercel AI SDK + an MCP server + a deployment pipeline creates a fragile stack with too many moving parts. Butterbase bundles all of that into a single self-hostable runtime. You get a Postgres data plane with row-level security, serverless functions on Deno, S3/R2-backed file storage, realtime WebSocket subscriptions, and an AI gateway — all behind one API server with a built-in MCP endpoint so agents can operate your backend through structured tool calls instead of ad-hoc HTTP glue.

The architecture is opinionated. Three separate Postgres planes handle control metadata, runtime state, and per-app user data. Each app gets isolated schemas with RLS policies enforced at the database level, not the application level. Serverless functions run in Deno isolates, not Node.js workers, which gives you TypeScript-first execution with better sandboxing. And the MCP server at `/mcp` exposes every capability — data CRUD, auth, storage, AI gateway, KV store — as structured tools that Claude Code, Cursor, Codex, and other agent environments can call directly.

### Why it matters

The BaaS category has been Supabase's game for the past few years, and for good reason — Postgres-first with a generous free tier and a real open-source core is a compelling proposition. But Supabase was designed before AI agents became a serious part of the development workflow. Its API surface is built for humans writing client code, not for agents that need to discover and invoke backend capabilities programmatically.

Butterbase bets that the next generation of BaaS platforms needs to be agent-native from day one. The MCP server isn't a bolt-on integration; it's a first-class surface that sits alongside the REST API and the SDK. Every feature — creating a table, uploading a file, querying the AI gateway, managing auth — is available as an MCP tool. For teams building AI-driven applications where agents need to provision backends, manage data, and orchestrate workflows, this is a fundamentally different developer experience than wrapping a REST API in tool definitions.

The timing connects to a real shift in how fullstack apps get built. Developers using Claude Code or Cursor to scaffold entire applications need backends that can be operated by the same agent doing the scaffolding. Butterbase ships a Claude Code plugin with 30+ guided skills covering the full lifecycle — from idea to schema to auth to functions to deploy. That's not a demo; that's a workflow that actually works for rapid prototyping and agent-driven development.

### Key Features

**Postgres Data Plane with Row-Level Security.** Each app gets its own isolated schema within a shared Postgres instance. RLS policies are managed declaratively through the API, not hand-written in SQL migrations. User isolation helpers handle the common pattern of scoping queries to the authenticated user without boilerplate. The `/auto-api` endpoint generates REST routes from your schema automatically, so you can go from table definition to working API in seconds.

**Serverless Functions on Deno.** User functions execute in Deno isolates, giving you TypeScript-native execution with better security boundaries than Node.js worker threads. Functions are deployed from source and run on-demand. The runtime handles cold starts, timeouts, and resource limits. This is the compute layer for custom business logic, webhooks, and scheduled tasks.

**AI Gateway with Pluggable Routers.** A single `/gateway` endpoint handles chat completions, embeddings, and model listing across multiple providers. Router adapters are pluggable — the open-source version ships with the interface, while the managed offering adds OpenAI, Anthropic, and Bedrock integrations. For self-hosters, you wire your own adapters. The gateway also powers the built-in RAG system with managed collections, document ingestion, and semantic search.

**Built-in MCP Server.** Every Butterbase capability is exposed as an MCP tool at `/mcp` (HTTP) or via the `@butterbase/mcp` stdio binary. This means Claude Code, Cursor, Codex, and any MCP-compatible agent can create tables, manage auth, upload files, query data, and invoke functions through structured tool calls. No custom integration code needed.

**Durable Objects for Stateful Workloads.** Per-key stateful actors handle scenarios that don't fit the request-response model: chat rooms, multiplayer state, rate limiters, and long-running agent tasks. Each actor maintains its own state and can be addressed by key. This is the pattern Cloudflare Durable Objects popularized, but running on your own Postgres-backed infrastructure.

**Full Auth Stack.** Email + OAuth (Google, GitHub, Apple, X) with JWT tuning, post-login hooks, and service keys. No need to bolt on Clerk, Auth0, or Supabase Auth. The auth system is built into the same API server, so there's one less service to deploy and configure.

**Realtime Subscriptions.** WebSocket-based subscriptions to table changes for live UIs and presence indicators. Changes propagate through Postgres logical replication to connected clients. This covers the collaborative editing, live dashboards, and notification feed use cases without a separate realtime service.

### Use Cases

- **AI-driven app scaffolding** — Use Claude Code with the Butterbase plugin to go from a natural language description to a deployed backend with auth, data tables, and serverless functions in minutes.
- **Rapid prototyping for fullstack teams** — Spin up a Postgres backend with auth and storage for hackathons or MVPs without configuring Supabase, Vercel, and a separate AI gateway.
- **Agent-managed data pipelines** — Build applications where AI agents create, read, and transform data through MCP tool calls instead of custom API integrations.
- **Self-hosted alternative to Supabase** — Run the full BaaS stack on your own infrastructure with Docker, no vendor lock-in, and full control over your data plane.
- **Multi-tenant SaaS backends** — Per-app schema isolation with RLS makes it straightforward to build multi-tenant applications where each tenant's data is cryptographically separated.

### Pros and Cons

Pros:
- The MCP server integration is the real differentiator. No other BaaS exposes its entire API surface as structured agent tools out of the box. For teams building with AI agents, this eliminates a significant integration burden.
- Self-hosting is genuinely first-class — Docker Compose setup, Apache-2.0 license, and clear documentation for the OSS/managed boundary. You're not running a crippled version of the product.
- The three-plane Postgres architecture is well-designed for multi-tenancy. Schema-level isolation with RLS is more secure than row-level filtering in a shared schema.
- Active development with 241 commits from the lead maintainer in under three weeks. The v0.2.0 release added the KV store across all surfaces. The project is shipping fast.

Cons:
- The open-source version deliberately excludes upstream AI router adapters, billing logic, and multi-region orchestration. If you need OpenAI/Anthropic integration through the gateway without writing your own adapter, you need the managed offering.
- Very young project — v0.2.0 as of late May 2026. The API surface is still settling, and self-host documentation has rough edges. Production use today requires tolerance for breaking changes.
- Deno for serverless functions is a non-standard choice. Most fullstack teams have Node.js muscle memory, and the Deno ecosystem, while improved, still has gaps compared to npm.

### Getting Started

```bash
# Clone with submodules (required for Claude Code plugin)
git clone --recurse-submodules https://github.com/butterbase-ai/butterbase.git
cd butterbase

# Install and configure
npm ci
cp .env.example .env

# Start Postgres and Redis with Docker
docker compose -f docker-compose.local.yml up -d

# Run migrations
export NEON_PLATFORM_PRIMARY_URL=postgresql://butterbase:butterbase@localhost:5433/butterbase_control
export NEON_RUNTIME_PROJECT_ID_US_EAST_1=postgresql://butterbase:butterbase@localhost:5437/butterbase_runtime_us
export BUTTERBASE_REGIONS=us-east-1
npm run migrate:all

# Seed dev user and start
npm run seed:dev
npm run dev
```

The control API runs at `http://localhost:4000`. MCP tools are available at `http://localhost:4000/mcp`. Connect Claude Code or Cursor to that endpoint to start building with agent-driven workflows.

### Alternatives

**Supabase** — The established open-source BaaS with a larger community, more mature tooling, and a generous managed free tier. Supabase has better documentation, more client libraries, and a proven track record in production. Choose Supabase if you need stability today and don't require native MCP integration. Butterbase is the better fit if agent-native workflows are a priority.

**Firebase** — Google's BaaS with real-time sync, hosting, and serverless functions. Firebase is more opinionated, more locked-in, and more expensive at scale, but it's battle-tested and has the best mobile SDK story. Choose Firebase if you're building mobile-first and don't care about open source or self-hosting.

**Appwrite** — Another open-source BaaS with auth, databases, storage, and functions. Appwrite has a cleaner admin UI and better documentation than Butterbase, but lacks the AI gateway, MCP server, and agent-native design. Choose Appwrite if you want a self-hosted BaaS without the AI focus.

### Verdict

Butterbase is the most interesting BaaS project I've seen since Supabase's early days. The bet on agent-native infrastructure is the right one — within a year, every serious BaaS will need an MCP surface, and Butterbase is already there. The Postgres-backed architecture is solid, the self-hosting story is real, and the development velocity is impressive for a three-week-old project. It's too early for production workloads, and the OSS/managed split means you'll eventually hit features that require the paid tier. But for prototyping, for agent-driven development, and for teams that want a Supabase alternative with AI built into the foundation rather than bolted on top, Butterbase is worth building on today. The 1,400 stars in three weeks suggest the developer community agrees.
