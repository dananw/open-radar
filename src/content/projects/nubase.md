---
name: nubase
description: "Nubase is an open-source AI-native backend platform with Database, Auth, Storage, Functions, Memory, and Cron in one self-hostable service — built for AI coding agents."
url: https://github.com/OtterMind/Nubase
stars: 290
forks: 24
language: Java
tags: ["backend-as-a-service", "ai-native", "self-hosted", "mcp", "supabase-alternative"]
featured: false
publishedAt: 2026-06-19
---

## Nubase

### Overview

Nubase is an open-source, AI-native backend platform that packages eight capability modules — Database, Auth, Storage, Assets, Functions, AI Gateway, Memory, and Cron — into a single self-hostable service. It launched on June 8, 2026, and picked up nearly 300 GitHub stars in its first ten days, driven largely by the AI coding agent community looking for a real backend target that agents can drive directly.

The project comes from OtterMind, a team that clearly spent time studying what Supabase got right and where it falls short for AI-native workflows. The architecture is Supabase-inspired — PostgREST-compatible REST API, JWT-based auth with RLS, S3-compatible storage — but the key differentiator is the MCP (Model Context Protocol) surface. Every capability in Nubase is exposed as MCP tools that Claude Code, Codex, and other coding agents can call natively. An agent can create tables, deploy edge functions, publish a frontend to a CDN, schedule cron jobs, and read/write durable memory, all through tool calls without a human touching a dashboard.

The core problem Nubase solves is the gap between "AI generated a demo" and "AI generated a working app with a real backend." Every developer who's used Claude Code or Codex to scaffold a project knows the frustration: the agent writes beautiful frontend code, maybe even some API routes, but then you still need to provision a database, set up auth, configure storage, deploy functions, and wire it all together. Nubase collapses that entire infrastructure layer into one service that an agent can operate autonomously.

### Why it matters

The BaaS (Backend-as-a-Service) space hasn't had a meaningful architectural update since Supabase popularized the "open-source Firebase alternative" model in 2020. Supabase is excellent for human developers, but its self-hosted story is designed around a single project, and it wasn't built with AI coding agents as first-class consumers. Nubase addresses both gaps: multi-project isolation from a single control plane, and an MCP surface that lets agents operate the backend without human intervention.

This connects to a broader shift in how software gets built. In mid-2026, AI coding agents are generating more production code than ever, but the deployment and infrastructure story remains fragmented. Developers stitch together Supabase for the database, Clerk for auth, Cloudflare Workers for functions, S3 for storage, and Pinecone for vector memory. Nubase offers a single self-hosted service that covers all of those concerns, with a unified token model and project isolation built in. For teams running multiple AI-generated projects, that consolidation matters.

The Memory pillar is particularly interesting. Nubase treats durable memory — fact extraction, entity storage, hybrid retrieval over pgvector and full-text search — as a first-class primitive, not a bolted-on vector store. This is what AI-native applications actually need: persistent context that survives across sessions, with LLM-powered fact extraction that can ADD, UPDATE, or DELETE memories based on new information. Most BaaS platforms don't even acknowledge this category exists.

### Key Features

**MCP-Native Architecture.** Every Nubase capability is exposed through MCP tools that coding agents call directly. Schema inspection, SQL execution, RLS export, function deployment, asset publishing, memory operations, and cron scheduling are all available as tool calls. The `nubase_cli` bridges agents to the backend with a single `npx -y nubase_cli@latest install-skills` command that configures both Claude Code and Codex. This is the first BaaS I've seen that treats AI agents as a primary consumer, not an afterthought.

**Multi-Project Isolation.** Unlike Supabase self-hosted, which mimics a single project, Nubase provisions a dedicated PostgreSQL database per project from a single control plane. Each project gets its own JWT secrets, roles, schema cache, and Row Level Security policies. A request filter resolves the project from the API key and routes JDBC to the correct project database. For teams running multiple AI-generated apps, this means one Nubase instance can serve dozens of isolated projects without cross-contamination.

**Built-in Memory with LLM-Powered Fact Extraction.** The Memory module provides Mem0-style persistent memory with hybrid retrieval over pgvector, Postgres full-text search, and entity boosting. When you store a memory, the LLM analyzes the content and decides whether to ADD new facts, UPDATE existing ones, DELETE outdated information, or take NO action. This is smarter than raw vector storage because it maintains a clean, deduplicated knowledge base rather than an ever-growing append-only log.

**Supabase-Compatible REST API.** The PostgREST-compatible `/rest/v1` endpoint supports select, filter, order, paginate, insert, update, upsert, and delete operations with the same query syntax Supabase developers already know. Per-project JWT secrets and role-based access control with RLS means your existing Supabase knowledge transfers directly. If you've built apps on Supabase before, the migration path is minimal.

**One-Command Self-Hosting.** The all-in-one Docker image bundles PostgreSQL, Redis, the backend, and the Studio dashboard into a single container. `docker run` with port mapping and a volume gets you a working instance. No compose files, no external services, no Kubernetes. For developers who want to run their own infrastructure, this is about as simple as it gets. Production deployments pin secrets via environment variables for stability across restarts.

**Edge Functions with Agent Deployment.** The Functions module lets you deploy backend logic as edge functions served at `/functions/v1/**`. Each function gets its own secrets, invocation logs, rate limits, and JWT verification. The executor runs locally or on Cloudflare Workers for Platforms. Agents can scaffold, deploy, and invoke functions through MCP tools — describe what the function should do, and the agent writes and deploys it without human intervention.

**Static Asset CDN with Agent Publishing.** The Assets module serves generated frontends at `/assets/v1/**` with Cache-Control, ETag, and 304 semantics. Per-project cache policies and custom CDN domains are supported. This means an agent can generate a complete frontend application and publish it to a public URL through a single MCP tool call, no separate hosting provider needed.

### Use Cases

- **AI-generated full-stack applications** — An agent scaffolds a React or Next.js frontend, creates the database schema, deploys API functions, and publishes the whole thing to Nubase's CDN. The developer gets a live URL without touching infrastructure.

- **Multi-tenant SaaS prototyping** — Teams spinning up multiple proof-of-concept apps benefit from Nubase's project isolation. Each prototype gets its own database, auth, and storage without provisioning separate Supabase instances.

- **Agent-powered content management** — The Memory module combined with the REST API makes Nubase a viable backend for AI-managed content systems where agents read, write, and organize information across sessions.

- **Self-hosted alternative to Supabase Cloud** — Organizations that need data sovereignty or cost control can run Nubase on their own infrastructure with multi-project support that Supabase self-hosted doesn't offer.

- **Rapid prototyping for hackathons** — The single Docker command setup and MCP integration mean you can go from zero to a working backend in under five minutes, with your coding agent handling all the wiring.

### Pros and Cons

Pros:
- The MCP surface is genuinely useful for AI coding workflows — not a marketing checkbox, but a real integration that agents use to operate the entire backend.
- Multi-project isolation from a single instance solves a real pain point that Supabase self-hosted ignores. Running 10 isolated projects from one Docker container is practical.
- The Memory module with LLM-powered fact extraction is more sophisticated than most vector store integrations and actually maintains clean, deduplicated knowledge.

Cons:
- 290 stars and 11 days old — this is very early-stage software. The API surface is almost certainly still settling, and breaking changes are likely.
- Java-based backend (Spring Boot) means a heavier runtime than Node.js or Go alternatives. The Docker image bundles PostgreSQL and Redis, which increases the footprint compared to lighter solutions.
- No Realtime/WebSocket support yet. The Supabase comparison table explicitly marks this as "Not yet," which rules out use cases that need live data streaming.

### Getting Started

```bash
# Install Nubase skills for Claude Code or Codex
npx -y nubase_cli@latest install-skills

# Run Nubase locally with Docker (all-in-one image)
docker run -d --name nubase \
  -p 9999:9999 -p 5432:5432 \
  -v nubase_data:/data \
  nubase/nubase:latest

# Studio dashboard at http://localhost:9999/studio
# API at http://localhost:9999

# Store a memory via the API
curl -X POST http://localhost:9999/mem/v1/memories \
  -H "apikey: $NUBASE_SERVICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"userId":"user-42","messages":[{"role":"user","content":"I prefer dark mode and my favorite framework is React."}]}'

# Search memories
curl -X POST http://localhost:9999/mem/v1/search \
  -H "apikey: $NUBASE_SERVICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"userId":"user-42","query":"what UI preferences do they have?"}'

# Use the REST API (after creating a table via MCP or SQL)
curl "http://localhost:9999/rest/v1/todos?select=*" \
  -H "apikey: $NUBASE_ANON_KEY"
```

### Alternatives

**Supabase** — The established open-source Firebase alternative with a mature ecosystem, extensive documentation, and a generous free tier on Supabase Cloud. Supabase is the better choice for production applications today — it's battle-tested, has Realtime support, and a larger community. But Supabase self-hosted is designed for a single project, and it doesn't have first-class MCP integration or built-in Memory. Choose Supabase if you need stability and ecosystem maturity; choose Nubase if you want multi-project isolation and AI-agent-native operations.

**Appwrite** — Another open-source BaaS with a focus on developer experience and a visual console. Appwrite supports multiple projects natively and has a cleaner self-hosting story than Supabase. It's more mature than Nubase and supports more platforms (Flutter, Swift, Kotlin). However, Appwrite doesn't have MCP integration or a Memory module, and its architecture isn't optimized for AI coding agent workflows. Choose Appwrite if you need a proven multi-project BaaS without the AI-agent focus.

**PocketBase** — A single-file Go backend with SQLite, realtime subscriptions, and an admin UI. PocketBase is dramatically simpler than Nubase — one binary, no Docker, no PostgreSQL. It's the right choice for small projects, prototypes, and developers who want the minimum viable backend. But PocketBase doesn't scale to multi-project setups, has no AI-specific features, and lacks the Auth/Storage/Functions depth of Nubase. Choose PocketBase for simplicity; choose Nubase when you need a full-featured AI-native backend.

### Verdict

Nubase is the most interesting BaaS architecture I've seen since Supabase itself. The idea of a backend platform built from the ground up for AI coding agents — where every capability is an MCP tool that agents call natively — addresses a real gap in the 2026 development landscape. The Memory module with LLM-powered fact extraction is a genuine differentiator, not a checkbox feature, and the multi-project isolation model solves a problem that Supabase self-hosted developers have complained about for years.

The honest assessment: this is 11-day-old software with 290 stars. Don't migrate your production Supabase app to Nubase today. But if you're building AI-generated applications, running multiple prototypes, or looking for a self-hosted backend that your coding agent can actually operate autonomously, Nubase deserves serious evaluation. The Java/Spring Boot stack is heavier than I'd prefer, and the lack of Realtime support is a real limitation. But the architectural decisions — MCP-first, Memory as a primitive, multi-project from day one — show a team that understands where backend infrastructure needs to go. Watch this one closely.
