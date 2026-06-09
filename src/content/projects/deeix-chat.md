---
name: deeix-chat
description: "DEEIX Chat is an open-source AI platform with Go backend and Next.js 16 frontend — model routing, MCP tools, billing, and multi-provider chat in one deployable stack."
url: https://github.com/DEEIX-AI/DEEIX-Chat
stars: 379
forks: 48
language: Go
tags: ["ai-platform", "go", "nextjs", "model-routing", "fullstack"]
featured: false
publishedAt: 2026-06-09
---

## DEEIX Chat

### Overview

DEEIX Chat is an open-source, self-hosted AI platform that combines a Go backend with a Next.js 16 / React 19 frontend. It hit 379 stars within three weeks of its May 21 launch, with 319 commits from the lead maintainer and active daily pushes through early June. The project positions itself as a unified entry point for teams and enterprises that need stable, long-term access to multiple AI model providers without stitching together five different SaaS tools.

The lead developer, chenyme, has been the primary contributor with 319 of the project's 360+ commits. The project is Apache 2.0 licensed and ships with Docker Compose configurations for both SQLite (quick start) and PostgreSQL (production) deployments. The architecture is split: the frontend builds to static assets that the Go backend serves alongside the API, keeping the runtime footprint minimal — one binary, one port.

The core problem DEEIX Chat solves is the fragmentation of AI tooling. If you're running OpenAI for GPT-4o, Anthropic for Claude, Google for Gemini, and xAI for Grok, you're managing four API keys, four billing dashboards, four rate limits, and four different protocol quirks. DEEIX Chat collapses all of that into a single platform with model routing, priority weights, circuit breaking, and vendor mapping. Add MCP tool support, file RAG, usage billing, and enterprise auth, and you have something that looks more like an internal platform product than a weekend project.

### Why it matters

The AI platform space is crowded, but most open-source options are either too simple (just a chat UI wrapper) or too complex (full MLOps platforms that require a dedicated team to operate). DEEIX Chat sits in the middle. It's not trying to train models or manage GPU clusters. It's focused on the operational layer: routing requests to the right provider, tracking costs, managing users, and giving developers a clean API to build on.

What makes this relevant for fullstack web developers is the stack. This is Go and React — not Python, not some niche framework. The backend uses Gin (the most popular Go HTTP framework), GORM for ORM, and standard patterns like Swagger docs and OpenTelemetry tracing. The frontend is Next.js 16 with React 19, Tailwind CSS, and Shadcn/UI components. If you already work with these technologies, you can read this codebase, contribute to it, or fork it and customize it for your organization without learning anything new.

The timing also matters. MCP (Model Context Protocol) adoption is accelerating, and DEEIX Chat has native MCP server support with tool discovery, execution limits, and traceability. For teams building AI-powered products, having a self-hosted platform that handles model routing, tool orchestration, and billing in one place is a real productivity multiplier.

### Key Features

**Multi-Provider Model Routing.** DEEIX Chat supports OpenAI, Anthropic, Google/Gemini, xAI, and OpenRouter out of the box, with unified protocol adaptation across text, image, and tool calls. You configure upstream channels with priority weights and circuit breaking, so if one provider goes down, traffic automatically shifts to the next. The routing layer handles vendor-specific capability differences transparently — your application code doesn't need to know whether it's talking to Claude or GPT-4o.

**MCP Tool Ecosystem.** The platform integrates MCP servers and provider-native tools with full lifecycle management: discovery, enablement, user selection, execution limits, result rendering, and tool-call traceability. This means you can connect external tools (databases, APIs, file systems) and let users invoke them through the chat interface, with every call logged and auditable.

**Built-in Billing and Payments.** Model pricing, per-call tool pricing, subscriptions, top-ups, balances, usage ledgers, and billing snapshots are all built in. Stripe Checkout and EPay integrations are included, with webhook validation. For teams building AI products, this eliminates the need to build billing infrastructure from scratch — you can charge users per token, per tool call, or per subscription tier.

**Enterprise Identity and Security.** Local accounts, session management with HttpOnly refresh cookies, 2FA/TOTP, trusted devices, SSO/OIDC/OAuth, contact verification, and encrypted sensitive data storage. The auth layer is production-grade, not a placeholder. This is the kind of auth stack you'd expect from a SaaS product, not an open-source side project.

**File Processing and RAG.** File upload, preview, extraction, OCR, storage quota management, full-context injection, chunking, embeddings, and semantic retrieval. The platform supports Apache Tika, Docling, RapidOCR, Tesseract, and Paddle OCR for document processing, with optional LLM-based OCR fallback. Files enter the conversation context naturally, so users can chat with their documents.

**Flexible Data Layer.** Choose between PostgreSQL with pgvector for production or SQLite with sqlite-vec for quick starts. Redis or in-memory cache for session state. Local filesystem or S3-compatible object storage for files. The data layer is abstracted, so switching between configurations doesn't require code changes.

**Single-Runtime Deployment.** The Go backend serves both the API and the static frontend assets from a single binary. Docker Compose files are provided for three configurations: SQLite (lightweight), full PostgreSQL + Redis (production), and a development mode. No nginx reverse proxy, no separate frontend server, no Node.js runtime in production.

### Use Cases

- **Internal AI platform for teams** — A company with 50 developers needs centralized access to multiple AI providers with usage tracking and cost allocation. DEEIX Chat provides the routing, billing, and admin controls in one self-hosted deployment.
- **AI product backend** — A startup building an AI-powered SaaS product needs model routing, user management, billing, and tool orchestration. DEEIX Chat handles the infrastructure layer so the team can focus on their product features.
- **Multi-provider development and testing** — A developer comparing outputs across GPT-4o, Claude, and Gemini for a specific use case. DEEIX Chat's unified interface makes side-by-side comparison straightforward, with execution metadata for each response.
- **Client-facing AI assistant with billing** — An agency building a custom AI assistant for a client needs per-user billing, usage limits, and audit logs. DEEIX Chat's billing and admin modules handle this without custom development.
- **MCP tool orchestration hub** — A team with multiple MCP servers (database access, API integrations, file processing) needs a central platform to manage, expose, and track tool usage across users.

### Pros and Cons

Pros:
- The Go + React stack is familiar territory for fullstack developers. No exotic dependencies, no Python runtime in production, no framework lock-in. The codebase uses standard patterns (Gin, GORM, Next.js, Shadcn/UI) that any mid-level developer can navigate.
- Billing, auth, and audit logging are built in, not bolted on. For teams building AI products, this eliminates weeks of infrastructure work. The Stripe integration and 2FA/TOTP support show production awareness.
- The single-runtime deployment model is genuinely practical. One Docker container serves everything — API, frontend, static files. This simplifies ops, reduces costs, and makes horizontal scaling straightforward.

Cons:
- At 379 stars and three weeks old, the project is young. The API surface is still settling (only 2 open issues suggests not enough people have pushed it hard yet, not that it's bug-free). Breaking changes are likely in the near term.
- The default branch is `dev`, not `main`. This suggests the project is in active development and the maintainers consider it pre-stable. Production use at this stage requires tolerance for rough edges.
- Documentation is primarily in Chinese (with English README available). The codebase comments, commit messages, and community discussions lean Chinese, which may slow adoption by English-speaking contributors.

### Getting Started

```bash
# Clone the repository
git clone https://github.com/DEEIX-AI/DEEIX-Chat.git
cd DEEIX-Chat

# Quick start with SQLite (no external dependencies)
cp config.sqlite.example.yaml config.yaml
# Edit config.yaml with your API keys
docker compose -f docker-compose.sqlite.yml up -d

# Or full deployment with PostgreSQL + Redis
cp config.full.example.yaml config.yaml
# Edit config.yaml with your database and Redis credentials
docker compose -f docker-compose.full.yml up -d
```

Open http://localhost:8080 to access the chat interface. The admin console is available at the same URL with admin credentials configured in `config.yaml`.

For local development:

```bash
# Backend (Go)
cd backend
go mod download
go run main.go

# Frontend (Next.js)
cd frontend
npm install
npm run dev
```

The Swagger API docs are available at `/swagger/index.html` when the backend is running.

### Alternatives

**Open WebUI** — The most popular open-source AI chat interface, with a Python/FastAPI backend and Svelte frontend. Open WebUI is more mature (2+ years, 80K+ stars) and has a larger community, but it's primarily a chat UI without built-in billing, model routing with circuit breaking, or enterprise auth. Choose Open WebUI if you need a polished chat interface today; choose DEEIX Chat if you need the platform layer (billing, routing, audit) out of the box.

**LiteLLM** — A Python proxy that provides a unified API for 100+ LLM providers. LiteLLM is excellent at the protocol translation layer and has become the standard for model routing in Python ecosystems. But it's a proxy, not a platform — no chat UI, no billing, no user management. Choose LiteLLM if you just need a routing proxy to embed in your own application; choose DEEIX Chat if you want a complete, deployable platform.

**Dify** — A comprehensive LLMOps platform with a visual workflow builder, RAG pipeline, and agent capabilities. Dify is more feature-rich and has 100K+ stars, but it's heavier, Python-based, and oriented toward non-technical users building AI workflows. Choose Dify if you need a visual workflow builder and don't mind the heavier runtime; choose DEEIX Chat if you prefer a code-first approach with a lighter Go + React stack.

### Verdict

DEEIX Chat is one of the more complete open-source AI platforms I've seen built on a Go + React stack. Most competitors in this space are Python-based (Dify, LiteLLM, Open WebUI), so for teams already running Go backends and React frontends, DEEIX Chat feels native. The billing integration, MCP tool support, and enterprise auth aren't afterthoughts — they're core features that show the developers understand what production AI platforms actually need. At 379 stars and three weeks old, it's early. The default branch is still `dev`. But the commit velocity (319 commits from the lead maintainer, active daily pushes) and the architectural decisions suggest this project has real momentum. If you're building an internal AI platform for your team and you want something you can actually read, modify, and deploy without a PhD in MLOps, DEEIX Chat is worth evaluating now — before the crowd catches on.
