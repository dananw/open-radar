---
name: butterbase
description: "Butterbase is an open-source, AI-native backend-as-a-service with Postgres, auth, storage, serverless functions, and a built-in MCP server for AI agents."
url: https://github.com/butterbase-ai/butterbase-oss
stars: 1018
forks: 93
language: TypeScript
tags: ["baas", "postgres", "mcp", "ai-gateway", "supabase-alternative"]
featured: false
publishedAt: 2026-06-02
---

## Butterbase

### Overview

Butterbase is an open-source backend-as-a-service that launched on May 20, 2026, and crossed 1,000 GitHub stars within its first two weeks. It packages Postgres with row-level security, authentication, file storage, serverless functions, realtime subscriptions, a key-value store, and an AI gateway into a single self-hostable platform. The twist: every capability is exposed as a Model Context Protocol (MCP) tool, so AI agents can operate your backend without custom glue code.

The project is built in TypeScript on a Fastify control API with a Deno runtime for serverless functions. It uses Docker Compose for local development with separate Postgres instances for the control plane, data plane, and runtime plane — a production-oriented architecture from day one. The team behind it runs a managed offering at butterbase.ai, and the open-source repo contains the full runtime data plane under Apache 2.0.

The pitch is direct: Supabase proved that developers want integrated backends, but the landscape has shifted. AI agents now need to interact with your backend programmatically — creating tables, managing auth, querying data, running functions. Butterbase builds that agent surface natively rather than bolting it on later. Every REST endpoint, every storage operation, every function invocation is available as an MCP tool at `/mcp`, accessible via HTTP or stdio.

### Why it matters

The BaaS space has been dominated by Supabase and Firebase for years, but neither was designed with AI agents as first-class consumers. Supabase added an MCP server recently, but it's an adapter layer on top of an existing API. Butterbase was built from scratch with the assumption that both humans and AI agents will be managing your backend. That architectural decision shows up everywhere — in the declarative schema system, the RLS policy helpers, the auto-generated REST endpoints, and the Claude Code plugin that ships 30+ guided skills for agentic app building.

For fullstack developers, this matters because the "backend" is no longer just a database and some REST endpoints. Modern apps need auth, storage, realtime, serverless compute, AI model routing, and RAG pipelines. Stitching these together from separate services (Auth0 + S3 + Lambda + Pinecone + OpenAI) creates integration debt that compounds over time. Butterbase collapses that stack into a single deployable unit, similar to what Supabase did for Postgres + Auth + Storage, but extended with AI-native primitives.

The MCP integration is the differentiator that makes this worth watching. When your backend exposes tools like `createTable`, `insertRow`, `invokeFunction`, and `semanticSearch` via MCP, AI coding assistants can build full features end-to-end. The Claude Code plugin takes this further with guided workflows: idea → plan → schema → auth → functions → deploy. That's not a demo — it's a development workflow.

### Key Features

**Postgres Data Plane with Auto-API.** Each app gets its own Postgres database with declarative schema management via `/schema` endpoints. Define your tables in JSON, and Butterbase generates REST endpoints automatically at `/auto-api`. Row-level security comes built in with user-isolation helpers at `/rls`, so multi-tenant data isolation doesn't require writing custom middleware.

**MCP Server at Every Layer.** Every capability — data operations, auth, storage, functions, AI gateway, RAG — is exposed as MCP tools at `/mcp` (HTTP) or via the `@butterbase/mcp` npm package (stdio). This means Claude, ChatGPT, Cursor, and any MCP-compatible tool can read your schema, create records, invoke functions, and manage your app without custom integration code. The MCP surface is not an afterthought; it's a core architectural decision.

**Serverless Functions on Deno.** Write TypeScript functions that execute on the Deno runtime at `/functions`. No cold-start container orchestration — Deno's fast startup keeps latency low. Functions have access to the full Butterbase API surface, including the database, storage, and AI gateway. Deploy from source, and the platform handles routing and execution.

**Durable Objects for Stateful Workloads.** Beyond stateless functions, Butterbase provides durable per-key actors at `/durable-objects` for workloads that need persistent state: chat rooms, multiplayer game sessions, rate limiters, long-running agent orchestrations. This is the same pattern Cloudflare Durable Objects popularized, but integrated into the BaaS rather than requiring separate infrastructure.

**AI Gateway with RAG Pipeline.** A single `/gateway` endpoint handles chat completions, embeddings, and model listing with pluggable router adapters. The RAG system at `/rag` provides managed collections, document ingestion, semantic search, and synthesized answers. For developers building AI features, this eliminates the need to wire up a separate vector database and embedding pipeline.

**Auth with Multi-Provider OAuth.** Email + password authentication with OAuth support for Google, GitHub, Apple, and X (Twitter). JWT tuning, post-login hooks, and service keys are all configurable. The auth system integrates with RLS policies, so your database security and authentication are connected rather than separate concerns.

**Claude Code Plugin with 30+ Skills.** The `butterbase-skills` submodule ships a Claude Code plugin with guided workflows for agentic app development. Skills cover the full lifecycle: generating schemas from product descriptions, setting up auth flows, writing and deploying functions, configuring RAG collections, and submitting apps. This turns Claude Code into a full-stack development assistant that understands your Butterbase backend.

### Use Cases

- **Rapid prototyping for AI-powered apps** — When you need auth, a database, storage, and an LLM gateway without spending a week on infrastructure. Create an app, define a schema, deploy a function, and you have a working backend in under an hour.

- **AI agent backends** — Build agents that manage their own data, storage, and compute. The MCP surface means agents can create tables, store state, invoke functions, and search documents without custom API wrappers.

- **Supabase migration for teams wanting AI-native primitives** — If you're on Supabase but need integrated AI gateway, RAG, and MCP tooling, Butterbase offers a similar Postgres-based BaaS with those capabilities built in rather than added via extensions.

- **Internal tools and dashboards** — The auto-generated REST API, realtime subscriptions, and auth system make it straightforward to build admin panels and internal tools. Deploy Next.js or Remix edge handlers directly from source via `/edge-ssr`.

- **Multi-tenant SaaS applications** — Row-level security with user-isolation helpers, per-app databases, and service keys provide the building blocks for multi-tenant architectures without custom middleware.

### Pros and Cons

Pros:
- MCP-first architecture means AI tools can interact with your backend natively, which is increasingly essential as AI coding assistants become standard development tools.
- Self-hostable under Apache 2.0 with a clean separation between the open-source runtime and the managed offering. No feature gating that makes the OSS version unusable.
- The Deno runtime for functions provides faster cold starts than container-based serverless, and the Durable Objects pattern handles stateful workloads that most BaaS platforms punt on.
- Active development — commits landing daily as of early June 2026, with features like app templates and CLI improvements shipping in the most recent pushes.

Cons:
- Very young project (two weeks old as of writing). The API surface is still settling, and production readiness is unproven. Early adopters should expect breaking changes.
- The local Docker Compose setup requires three separate Postgres instances plus Redis and LocalStack, which is heavier than Supabase's single-container local development experience.
- No visual dashboard or admin UI in the open-source repo — the managed offering adds ops dashboards, but self-hosters get API-only access. For teams that want a Supabase Studio equivalent, this is a gap.
- Documentation is still maturing. SETUP.md covers the basics, but deeper architectural docs and API references lag behind the code.

### Getting Started

```bash
# Clone with submodules (required for Claude Code plugin)
git clone --recurse-submodules https://github.com/butterbase-ai/butterbase-oss.git
cd butterbase-oss

# Install dependencies
npm ci
cp .env.example .env

# Start local infrastructure
docker compose -f docker-compose.local.yml up -d

# Run migrations across all planes
npm run migrate:all

# Seed the dev user
export NEON_PLATFORM_PRIMARY_URL=postgresql://butterbase:password@localhost:5433/butterbase_control
npm run seed:dev

# Create your first app
curl -X POST http://localhost:4000/init \
  -H "Content-Type: application/json" \
  -d '{"name": "my-app"}'

# List apps
curl http://localhost:4000/apps

# Access MCP tools
npx @butterbase/mcp
```

The MCP endpoint is available at `http://localhost:4000/mcp` for HTTP-based clients, or via stdio using the npm package for Claude Code and other MCP-compatible tools.

### Alternatives

**Supabase** — The most established open-source BaaS with a mature ecosystem, visual dashboard (Supabase Studio), and large community. Supabase has broader database support (Postgres with built-in vector extensions) and a more polished developer experience. Choose Supabase when you need a proven, production-ready platform and don't require native MCP integration or an AI gateway.

**PocketBase** — A single-binary BaaS written in Go with SQLite, real-time subscriptions, and a built-in admin UI. PocketBase is dramatically simpler to deploy and self-host, making it ideal for small projects and prototypes. Choose PocketBase when you want minimal infrastructure overhead and don't need Postgres, serverless functions, or AI-native features.

**Firebase** — Google's managed BaaS with a generous free tier, strong mobile SDK support, and Firestore's real-time sync. Firebase is fully managed with no self-hosting option, which eliminates ops burden but creates vendor lock-in. Choose Firebase when you're building mobile-first apps and prefer a managed service over self-hosted infrastructure.

### Verdict

Butterbase is two weeks old, so recommending it for production use would be irresponsible. But as a signal of where backend infrastructure is heading, it's the most interesting BaaS project I've seen this year. The MCP-first architecture isn't a gimmick — it reflects a real shift in how developers build software. When Claude Code can define your schema, write your functions, and deploy your backend through a standardized tool protocol, the development workflow changes fundamentally. The 1,000-star velocity in two weeks suggests the developer community sees the same potential. If you're building AI-powered applications and want a self-hosted backend that treats agents as first-class consumers, Butterbase is worth tracking closely. Just don't bet your production infrastructure on it yet — give it a few months to stabilize.
