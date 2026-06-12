---
name: velobase-harness
description: "Open-source SaaS boilerplate for AI apps with Stripe billing, usage metering, affiliate programs, and anti-abuse — built on the T3 stack with Next.js and tRPC."
url: https://github.com/velobase/velobase-harness
stars: 489
forks: 58
language: TypeScript
tags: ["saas-boilerplate", "nextjs", "stripe", "billing", "ai-saas"]
featured: false
publishedAt: 2026-06-13
---

## Velobase Harness

### Overview

Velobase Harness is an MIT-licensed SaaS boilerplate built specifically for AI application developers who need to go from prototype to paid product. Launched in April 2026, it's accumulated nearly 500 GitHub stars in just over two months — modest compared to viral AI agent frameworks, but impressive for an infrastructure template that solves the least glamorous part of building a business: getting paid.

The project comes from the Velobase team, who also offer a managed cloud platform. Harness is their open-source play — give developers the revenue infrastructure for free, then offer to run it for them. It's a smart strategy, and the MIT license means you can fork it, modify it, and deploy it anywhere without obligation.

The core problem Harness addresses is painfully familiar to anyone who's built an AI side project: you can spin up a working demo in an afternoon with Claude or Cursor, but turning that into a product with subscriptions, usage-based billing, fraud protection, and attribution tracking takes weeks of plumbing. Every indie developer rebuilds the same Stripe integration, the same credit system, the same rate limiter. Harness packages all of that into a single codebase so you can focus on the part that actually differentiates your product.

### Why it matters

The AI tooling ecosystem has exploded in 2025-2026, but monetization infrastructure hasn't kept pace. Developers are shipping impressive prototypes at record speed — coding agents, RAG pipelines, image generators, voice tools — and then hitting a wall when they try to charge for them. Stripe's own documentation is excellent, but wiring up usage metering, credit systems, affiliate tracking, and abuse prevention is still a multi-week project for most teams.

Harness sits in an interesting gap between "use ShipFast" and "build it yourself." ShipFast is the popular Next.js SaaS starter, but it's paid ($199+), closed-source, and focused on generic SaaS rather than AI-specific patterns like token metering and multi-provider LLM routing. On the other end, building billing infrastructure from scratch means you're spending engineering cycles on problems that have already been solved thousands of times.

The T3 stack choice (Next.js, tRPC, Prisma, TypeScript) is deliberate and smart. It's the most popular full-stack TypeScript stack in 2026, which means the codebase is immediately readable to a huge pool of developers. And the architecture — domain services, event bus, pluggable modules — is more sophisticated than most boilerplates. This isn't a toy template; it's a production-grade starting point.

### Key Features

**Usage-Based Billing with Stripe.** Beyond simple subscriptions, Harness supports usage metering — track API calls, tokens consumed, or any custom metric and bill accordingly. There's a credit system with balance management, so you can offer free tiers, prepaid credits, and pay-as-you-go pricing from day one. Customer billing dashboards are included out of the box.

**Affiliate Program with Double-Entry Ledger.** Most SaaS boilerplates ignore affiliate programs entirely. Harness ships one with a proper double-entry accounting ledger, referral tracking, promo codes, refund clawbacks, and even USDT cashout support. If you're building an AI tool and want users to spread the word, this saves you from bolting on a third-party affiliate platform.

**Server-Side Attribution and Analytics.** Purchases are connected to acquisition channels through server-side attribution, with integrations for Google Ads offline conversions, X (Twitter) pixel events, and PostHog analytics. This matters for AI products where the conversion funnel often spans multiple sessions and devices.

**Anti-Abuse Controls for AI Usage.** Free credits are expensive when every request hits an LLM API. Harness includes rate limiting via Redis, Cloudflare Turnstile verification, disposable email detection, signup signal analysis, guest quotas, and credit clawbacks. These aren't theoretical features — they're the exact controls you need when your unit economics depend on preventing abuse.

**Multi-Runtime Architecture.** The codebase runs as a single combined process for development or split into separate Web (Next.js), Worker (BullMQ), and optional API (Hono) services for production. The event bus connects domain services to pluggable modules, so you can add new integrations without touching core billing logic. Docker Compose and Kubernetes deployment configs are included.

**Background Workers with BullMQ.** Long-running tasks like email sequences, webhook processing, usage aggregation, and affiliate commission calculations run on BullMQ queues backed by Redis. This separation means your web requests stay fast while heavy lifting happens asynchronously.

**AI Agent-Friendly Codebase.** The project includes AGENTS.md and FRAMEWORK_GUIDE.md files designed for AI coding assistants. If you're using Claude Code, Cursor, or Codex to build on Harness, the documentation tells your agent where to implement features, how to keep framework boundaries intact, and what patterns to follow. This is a smart move — it reduces the friction for the exact audience most likely to use this template.

### Use Cases

- **Indie AI developers** who have a working prototype and need to add payments, billing, and user management without spending a month on infrastructure. Clone Harness, wire up your AI feature, and you have a billable product.
- **AI SaaS teams** that need usage-based pricing from day one — token metering, API call tracking, credit systems — rather than bolting it on later when switching from flat subscriptions becomes painful.
- **Developers building AI coding tools** who want a production-grade backend with auth, billing, and background workers already wired up. The agent-friendly documentation makes it easy to hand off implementation to Claude Code or Cursor.
- **Growth-focused products** that need attribution tracking and affiliate programs to understand which channels drive paying customers, not just signups.
- **Solo founders** who want ShipFast-level speed but prefer an open-source, MIT-licensed codebase they fully control.

### Pros and Cons

Pros:
- MIT license means full control — fork it, modify it, self-host it, sell it. No vendor lock-in, no usage fees on the template itself.
- The T3 stack (Next.js + tRPC + Prisma) is the most popular full-stack TypeScript stack in 2026, so the codebase is familiar to a massive developer pool.
- AI-specific features like token metering, multi-LLM routing, and anti-abuse controls are exactly what AI product builders need but rarely find in generic SaaS templates.
- Agent-friendly documentation (AGENTS.md, FRAMEWORK_GUIDE.md) makes it easy to build on the template using AI coding assistants.
- The affiliate program with double-entry ledger is a feature most competitors skip entirely.

Cons:
- At 489 stars, the community is still small. You'll find fewer tutorials, Stack Overflow answers, and third-party integrations compared to ShipFast (4,000+ stars) or established frameworks.
- The documentation exists but is still evolving — some integration guides reference planned features rather than current implementations.
- Requires Docker for local development (PostgreSQL + Redis), which adds setup friction compared to SQLite-based templates.
- The optional Hono API layer adds architectural complexity that most indie developers won't need.

### Getting Started

```bash
# Clone the repository
git clone https://github.com/velobase/velobase-harness.git
cd velobase-harness

# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env

# Start local database services
pnpm docker:db:up

# Push database schema and seed data
pnpm db:push
pnpm db:seed

# Start development server (Web on :3000, Worker on :3001)
pnpm dev:all
```

Open http://localhost:3000 to see the running application. Stripe CLI is available as an optional Docker Compose profile for local webhook testing — run `pnpm docker:up` when you need it.

For production deployment, the repo includes Docker and Kubernetes configurations. The Cloud Deployment Guide covers GitOps workflows with GitHub Actions.

### Alternatives

**ShipFast** — The most popular Next.js SaaS starter, created by Marc Lou. ShipFast is more polished, has a larger community (4,000+ stars), and includes email, blog, and SEO features out of the box. However, it's a paid product ($199+), closed-source, and not specifically designed for AI usage patterns like token metering. Choose ShipFast if you want the fastest path to a generic SaaS and don't need AI-specific billing.

**Supastarter** — A Next.js + Supabase SaaS template with Stripe integration. Supastarter uses Supabase for auth and database, which simplifies setup but ties you to the Supabase ecosystem. It lacks Harness's affiliate program and anti-abuse controls. Choose Supastarter if you're already invested in Supabase and want a simpler architecture.

**Open SaaS (by Wasp)** — A free, open-source SaaS template built on the Wasp framework. Open SaaS uses a custom DSL and compiler, which means a steeper learning curve but more opinionated structure. It includes Stripe, email, and admin features but doesn't have AI-specific billing patterns. Choose Open SaaS if you prefer Wasp's approach to full-stack development and don't mind learning a new framework.

### Verdict

Velobase Harness fills a real gap: an open-source, MIT-licensed SaaS boilerplate that takes AI monetization seriously. The usage-based billing, affiliate program, and anti-abuse controls aren't afterthoughts — they're first-class features designed for the economics of AI products where every API call costs money. The T3 stack choice makes the codebase approachable for the largest possible pool of TypeScript developers, and the agent-friendly documentation signals that the team understands how modern development actually works in 2026. The community is still small and the docs are catching up, so this isn't a "set it and forget it" template — you'll be reading source code. But if you're an indie developer with an AI prototype and you need to start charging for it next week, Harness is the best open-source starting point I've found.
