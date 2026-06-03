---
name: butterbase
description: "Butterbase is an open-source, AI-native backend-as-a-service with Postgres, auth, storage, serverless functions, and a built-in MCP server for agent-driven development."
url: https://github.com/butterbase-ai/butterbase
stars: 1199
forks: 100
language: TypeScript
tags: ["baas", "postgres", "supabase-alternative", "mcp", "ai-gateway", "serverless"]
featured: false
publishedAt: 2026-06-03
---

## Butterbase

### Overview

Butterbase is an open-source, AI-native backend-as-a-service that gives you Postgres, authentication, file storage, serverless functions, an LLM gateway, realtime subscriptions, and a built-in MCP server — all self-hostable with Docker. It crossed 1,100 GitHub stars within two weeks of its May 2026 launch, which is a strong signal that developers are hungry for a Supabase alternative that takes AI agents seriously as first-class consumers of backend infrastructure.

The project is built by NetGPT Inc. and licensed under Apache 2.0. The architecture is polyglot by design: the main API runs on Node.js with Fastify, serverless functions execute in Deno isolates, long-running agent tasks run in a Python runtime, and frontend builds happen on Cloudflare Workers. That's a deliberate choice — each service picks the runtime that fits its job, rather than forcing everything through a single language.

The core problem Butterbase solves is the gap between traditional BaaS platforms and the reality of building AI-powered applications in 2026. Supabase, Firebase, and Appwrite are excellent for CRUD apps, but none of them ship with an MCP server that lets Claude Code, Cursor, or any MCP-compatible agent operate your entire backend through tool calls. Butterbase does. Every capability — schema management, auth configuration, function deployment, storage operations — is exposed as MCP tools. For fullstack developers building agent-driven products, this changes the workflow fundamentally.

### Why it matters

The backend-as-a-service space has been dominated by Supabase for the past few years, and for good reason — Postgres-first, open-source, great DX. But the landscape is shifting. AI agents are becoming legitimate consumers of backend APIs, not just humans clicking buttons in a React frontend. An agent that needs to query your database, upload a file, or trigger a function shouldn't have to reverse-engineer your REST API. It should have structured, typed tool interfaces it can call directly.

Butterbase is the first BaaS I've seen that treats this as a core architectural concern rather than an afterthought. The MCP server isn't a bolted-on plugin — it's embedded in the main control API at `/mcp`. The Claude Code plugin ships 30+ guided skills for agentic app building: idea to plan to schema to auth to functions to deploy. This is where the entire BaaS category is heading, and Butterbase got there first.

There's also the self-hosting angle. Supabase's self-host story has improved, but it's still complex. Butterbase is designed from the ground up for Docker-based self-hosting, with clear separation between the open-source runtime and the managed offering's extras (billing, multi-region orchestration). If you want full control over your backend without giving up modern DX, this is worth serious evaluation.

### Key Features

**Postgres Data Plane with Row-Level Security.** Every app gets its own isolated Postgres schema with declarative schema definitions via `/schema`, automatic REST endpoints via `/auto-api`, and built-in migration support. Row-level security is a first-class feature with user-isolation helpers, not something you have to wire up manually. This is the same model Supabase uses, and it works.

**Built-in MCP Server.** Every Butterbase capability — data queries, auth management, function deployment, storage operations, KV store access — is exposed as MCP tools at `/mcp` (HTTP) or via stdio through `@butterbase/mcp`. Claude Code, Cursor, Windsurf, and any MCP-compatible agent can operate your entire backend without custom integration code. This is the killer feature.

**Serverless Functions on Deno.** Write TypeScript functions that execute in sandboxed Deno isolates. No cold-start Docker containers, no Lambda configuration headaches. The function runtime is integrated into the platform, so your functions have direct access to auth context, database connections, and storage without boilerplate.

**AI Gateway and RAG.** A single endpoint for chat completions, embeddings, and model listing with pluggable router adapters. The RAG subsystem provides managed collections, document ingestion, semantic search, and synthesized answers. You can build an AI-powered search feature for your app without standing up a separate vector database.

**Durable Objects for Stateful Agents.** Per-key stateful actors for chat rooms, multiplayer sessions, rate limiters, and long-running agent workflows. This borrows the Durable Objects concept from Cloudflare Workers and applies it to the BaaS context. If you're building collaborative features or agent orchestration, this is critical infrastructure.

**Realtime Subscriptions.** WebSocket-based subscriptions to Postgres table changes for live UIs, presence indicators, and collaborative editing. The realtime system integrates with the auth layer, so subscriptions respect RLS policies automatically.

**Claude Code Plugin with 30+ Skills.** The `@butterbase/plugin` package ships guided skills for AI-driven app building: scaffold a project, define schema, configure auth, write functions, deploy, and submit — all through natural language in Claude Code. This isn't a gimmick; it's a genuine productivity multiplier for developers who use AI coding assistants.

### Use Cases

- **AI-powered SaaS products** — Build the backend for an AI chatbot, document analyzer, or content generator with the AI gateway handling model routing and RAG managing knowledge bases. The MCP server lets your AI agents operate the backend directly.

- **Rapid prototyping for hackathons** — Spin up a full backend with auth, database, storage, and functions in minutes using the CLI. The Claude Code plugin makes scaffolding even faster. Perfect for 48-hour builds.

- **Self-hosted Supabase alternative** — Teams that need Postgres-backed BaaS but want full infrastructure control. Docker-based deployment with clear separation between OSS and managed features.

- **Agent orchestration platforms** — Use Durable Objects for stateful agent sessions, the AI gateway for model routing, and MCP tools for programmatic backend control. Build multi-agent systems that share state through the platform.

- **Real-time collaborative apps** — Build multiplayer editors, live dashboards, or chat applications using realtime subscriptions with automatic RLS enforcement.

### Pros and Cons

Pros:
- The MCP server integration is genuinely novel. No other BaaS exposes its entire capability surface as structured tool interfaces for AI agents. This alone makes it worth watching.
- Self-hosting is straightforward — Docker Compose with clear documentation. The three-plane Postgres architecture (control, runtime, data) is well-designed for isolation.
- Apache 2.0 license with a clean OSS/managed boundary. You know exactly what's open and what's not, and the interfaces for extending the private features are documented.
- Polyglot architecture picks the right tool for each job: Fastify for the API, Deno for functions, Python for agents, Cloudflare Workers for builds.

Cons:
- Early stage at v0.2.0 (released May 25, 2026). The API surface is still settling, and the self-host documentation could be tighter based on the open issues.
- The managed offering's extras (billing, multi-region, upstream AI adapters) are private. If you need Stripe billing or multi-region orchestration in self-host, you're building it yourself against the provided interfaces.
- Smaller ecosystem than Supabase. No community plugins, fewer tutorials, less Stack Overflow coverage. You're an early adopter, and that comes with friction.
- The polyglot architecture means more moving parts to monitor. Node.js, Deno, Python, Cloudflare Workers — that's four runtimes in one platform.

### Getting Started

```bash
# Clone with submodules (required for Claude Code plugin)
git clone --recurse-submodules https://github.com/butterbase-ai/butterbase.git
cd butterbase

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your Postgres credentials and settings

# Start with Docker Compose
docker compose up -d

# The API is available at http://localhost:3000
# MCP server at http://localhost:3000/mcp
# Docs at http://localhost:4321

# Install the CLI globally
npm install -g @butterbase/cli

# Create your first app
butterbase init my-app
butterbase deploy
```

For Claude Code integration, install the MCP server:

```bash
npx @butterbase/mcp
```

Add it to your Claude Code MCP config and you get 30+ guided skills for building apps through natural language.

### Alternatives

**Supabase** — The incumbent open-source BaaS with a massive community, mature ecosystem, and excellent documentation. Supabase has Edge Functions, realtime, auth, and storage, but lacks MCP integration and AI gateway features. Choose Supabase if you need production stability today and don't care about agent-native workflows.

**Appwrite** — Another open-source BaaS that's more self-host-friendly than Supabase, with support for multiple databases and a visual console. Appwrite is more mature but less Postgres-opinionated and has no MCP or AI gateway story. Good choice if you want database flexibility over Postgres-first design.

**Firebase** — Google's BaaS with excellent realtime capabilities and a generous free tier. Firebase is proprietary and doesn't support self-hosting, but it's battle-tested at massive scale. Choose Firebase if you're building on Google Cloud and want the least operational overhead.

### Verdict

Butterbase is the most forward-looking BaaS project I've seen in 2026. The MCP server integration alone sets it apart from every competitor — it's the first backend platform that treats AI agents as first-class consumers, not an afterthought. At v0.2.0 with 1,200 stars in two weeks, it's early but the trajectory is strong. If you're a fullstack developer building AI-powered products and you want a self-hostable backend with Postgres, auth, storage, and native agent support, Butterbase is worth evaluating now. The Claude Code plugin with 30+ skills is a genuine productivity tool, not marketing fluff. Just know you're an early adopter — expect rough edges and API changes. For production-critical apps today, Supabase is still the safer bet. For everything else, especially agent-driven development, Butterbase is where the category is going.
