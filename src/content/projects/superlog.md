---
name: superlog
description: "Superlog is an open-source agentic observability tool backed by Y Combinator that ingests OpenTelemetry data and uses AI agents to investigate production incidents automatically."
url: https://github.com/superloglabs/superlog
stars: 296
forks: 17
language: TypeScript
tags: ["observability", "opentelemetry", "ai-agents", "typescript", "react", "clickhouse"]
featured: false
publishedAt: 2026-06-09
---

## Superlog

### Overview

Superlog is an open-source observability workspace that takes a different approach to the "too many alerts, not enough answers" problem plaguing every team running production services. Instead of just collecting telemetry data and hoping someone reads the dashboards, Superlog ingests traces, logs, and metrics through OpenTelemetry, groups noisy signals into actionable incidents, and then deploys AI agents to investigate those incidents while you sleep.

The project launched publicly in early June 2026 and quickly hit 296 GitHub stars with active daily commits. It's backed by Y Combinator (P26 batch), which gives it more runway and credibility than the typical weekend observability project. The sole core contributor, arseniycodes, has pushed 85 commits in under a week — the kind of velocity that suggests either serious commitment or a very caffeinated human. The codebase is Apache 2.0 licensed.

The tech stack reads like a fullstack developer's wishlist: Vite and React for the frontend, a Node.js HTTP API, an OTLP intake proxy, background workers for incident grouping, Drizzle ORM with PostgreSQL for application data, and ClickHouse for the heavy-lifting telemetry queries. If you've ever struggled to get Datadog or New Relic to do what you actually need, Superlog's architecture is refreshingly straightforward — it's a monorepo you can read, fork, and extend.

### Why it matters

The observability market is dominated by three problems: vendor lock-in, per-host pricing that punishes scale, and alert fatigue that makes dashboards useless. Datadog's average customer spends $23,000/year according to their own S-1 filing, and most teams still can't answer "what broke and why" without a 30-minute investigation. OpenTelemetry has won the instrumentation war — it's the second-most active CNCF project after Kubernetes — but the tooling layer on top of it is still fragmented between Grafana, Jaeger, SigNoz, and a dozen others.

Superlog positions itself as the missing "intelligence layer" on top of raw OTel data. The agentic investigation model is what makes it interesting: when an incident is detected, the system doesn't just page you. It runs an investigation agent that correlates traces, logs, and metrics, then produces a summary. The community edition ships with a local agent runner that records incident summaries, but the architecture supports pluggable investigation runtimes — meaning you can wire in your own LLM-powered agent or use their cloud offering.

For fullstack developers running React frontends with NestJS, Django, or Go backends, Superlog's OpenTelemetry-native approach means you instrument once and get both the raw data and the AI-powered analysis. No proprietary SDKs, no vendor-specific query languages.

### Key Features

**OpenTelemetry-Native Ingestion.** Superlog accepts traces, logs, and metrics through standard OTLP endpoints. If your app already emits OpenTelemetry data (and most modern frameworks do), you point your exporter at Superlog's intake proxy on port 4101 and you're done. No custom agents to install, no proprietary instrumentation libraries.

**AI-Powered Incident Investigation.** The core differentiator. When signals are grouped into incidents, an agent runner kicks off to investigate. The community edition uses a local runner that correlates related telemetry and produces a structured summary. The architecture supports pluggable runtimes, so you can swap in Claude, GPT-4, or a custom model for deeper investigation.

**ClickHouse-Backed Telemetry Queries.** Raw telemetry data lives in ClickHouse, which handles billions of rows with sub-second query times. This is the same engine Uber, Cloudflare, and eBay use for their observability data. You get fast queries without the per-GB pricing of hosted solutions.

**Signal Grouping and Deduplication.** Instead of flooding Slack with 47 alerts about the same underlying issue, Superlog fingerprints incoming telemetry and groups related signals into single incidents. The `packages/fingerprint` module handles the heavy lifting, reducing alert noise by consolidating related traces, logs, and metric spikes.

**Slack and GitHub Integration.** Incidents surface in Slack with interactive modals for feedback and acknowledgment. The system also creates PRs with target branch pickers pulled from GitHub, so incident context flows directly into your development workflow. Recent commits show active work on Slack private channel support and PR diff rendering.

**Monorepo Architecture You Can Fork.** The entire system is a pnpm monorepo with clear boundaries: `apps/web` (React frontend), `apps/api` (HTTP API), `apps/proxy` (OTLP intake), `apps/workers` (background jobs), `packages/db` (Drizzle schema), and `packages/fingerprint` (signal grouping). Each piece is independently understandable and modifiable.

**Agent Skill Installation.** Superlog ships as a coding agent skill. Run `npx skills add superloglabs/skills --all` and your coding agent can instrument your project with Superlog in a single prompt. This is the kind of DX that makes adoption frictionless.

### Use Cases

- **Fullstack teams running microservices** — You have a React frontend talking to a NestJS or Go API, a PostgreSQL database, and maybe a Redis cache. Superlog ingests OTel data from all of them and correlates cross-service traces into single incidents, so you can see the full request path when something breaks.

- **Solo developers and small teams who can't afford Datadog** — The self-hosted community edition is free with no per-host pricing. You run it on your own infrastructure with Docker and PostgreSQL, and you get incident detection plus AI investigation without the $23K/year bill.

- **Teams adopting OpenTelemetry who need a backend** — If you've instrumented your app with OTel but are still piping data to a vendor dashboard you barely look at, Superlog gives you a local-first alternative with actual intelligence on top.

- **AI-native development workflows** — If you're building with coding agents and want your observability to speak the same language, Superlog's agent skill approach and pluggable investigation runtimes fit naturally into that workflow.

- **Incident response automation** — The agent runner architecture lets you build custom investigation logic. Instead of manually correlating logs and traces during an outage, the agent does it automatically and presents findings before a human even opens Slack.

### Pros and Cons

Pros:
- Y Combinator backing (P26 batch) gives the project more credibility and runway than typical open-source observability tools. The team has funding to sustain development.
- OpenTelemetry-native means zero vendor lock-in on the instrumentation side. Your OTel data works with Superlog, Grafana, Jaeger, or anything else that speaks OTLP.
- ClickHouse for telemetry storage is a proven choice at scale — it's the same database powering observability at Uber and Cloudflare, with sub-second queries on billions of rows.
- The monorepo architecture is clean and readable. Each app and package has a clear responsibility, making it easy to contribute or fork.

Cons:
- 296 stars and a single core contributor means this is early-stage software. Production readiness is a real question — there are 36 open issues and the API surface is still settling.
- No built-in dashboard for raw telemetry exploration yet. The current UI focuses on incidents, so if you need ad-hoc trace or log queries, you'll still reach for Grafana or Jaeger alongside Superlog.
- ClickHouse adds operational complexity. It's another database to run, monitor, and back up. For small teams, the Docker compose setup works, but scaling ClickHouse in production requires real expertise.

### Getting Started

```bash
# Prerequisites: Node.js 20+, pnpm 9+, Docker

# Clone the repository
git clone https://github.com/superloglabs/superlog.git
cd superlog

# Install dependencies
pnpm install

# Start the local stack (Postgres + ClickHouse via Docker)
docker compose up -d

# Run database migrations
pnpm --filter @superlog/db db:migrate

# Start development servers
pnpm dev
```

The local services will be available at:

- **Web UI:** http://localhost:5173
- **API:** http://localhost:4100
- **OTLP Intake:** http://localhost:4101

Point your application's OpenTelemetry exporter to `http://localhost:4101` and start seeing traces, logs, and metrics in the Superlog dashboard.

To install as a coding agent skill:

```bash
npx skills add superloglabs/skills --all
```

### Alternatives

**SigNoz** — Another open-source, OpenTelemetry-native observability platform with a ClickHouse backend. SigNoz is more mature (3.5K+ GitHub stars, larger community) and has a more complete dashboard for trace and log exploration. Choose SigNoz if you need a full Grafana replacement today. Choose Superlog if the agentic investigation model appeals to you and you're willing to trade maturity for a more opinionated incident-focused workflow.

**Grafana + Loki + Tempo** — The open-source observability stack that most teams default to. Grafana gives you the most flexible dashboards, Loki handles logs cheaply, and Tempo does distributed tracing. It's battle-tested but requires assembling multiple tools and writing your own alerting rules. Superlog trades that flexibility for a more integrated, AI-augmented experience where incidents are detected and investigated automatically.

**Axiom** — A serverless, OpenTelemetry-native observability platform with a generous free tier. Axiom is fully managed (no self-hosting) and has excellent query performance on large datasets. Choose Axiom if you don't want to manage infrastructure. Choose Superlog if you need self-hosting, data sovereignty, or want to customize the investigation agent runtime.

### Verdict

Superlog is the most interesting take on observability I've seen in 2026. The core insight — that collecting data is a solved problem but investigating incidents is not — resonates with every developer who's been paged at 3 AM and spent 45 minutes manually correlating logs across three dashboards. The Y Combinator backing, clean monorepo architecture, and active daily development suggest this project has real legs. At 296 stars it's early, and you shouldn't migrate your production observability stack today. But if you're a fullstack developer running React with a Node.js, Django, or Go backend and you've been meaning to adopt OpenTelemetry, Superlog is worth watching closely. The agent-based investigation model is where observability needs to go, and Superlog is one of the first tools actually building toward that vision rather than just adding AI features to an existing dashboard.
