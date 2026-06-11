---
name: superlog
description: "YC-backed open-source observability platform that uses AI agents to auto-investigate incidents and self-heal production systems from OpenTelemetry data."
url: https://github.com/superloglabs/superlog
stars: 760
forks: 40
language: TypeScript
tags: ["observability", "ai-agents", "opentelemetry", "self-healing", "typescript"]
featured: false
publishedAt: 2026-06-12
---

## Superlog

### Overview

Superlog is an open-source agentic telemetry system backed by Y Combinator (P26 batch). It ingests traces, logs, and metrics via OpenTelemetry, groups noisy signals into actionable incidents using AI, and then deploys autonomous agents to investigate and propose fixes — including opening pull requests on GitHub. The project launched in early June 2026 and has already crossed 760 stars, which is a strong signal for a developer tool in a space dominated by incumbents like Datadog and New Relic.

The team is small and focused. The primary maintainer, arseniycodes, has pushed 117 commits in the project's first two weeks. That velocity matters because observability tooling is notoriously complex — you need solid ClickHouse queries, reliable OTLP ingestion, and a frontend that doesn't choke on high-cardinality data. The codebase is a monorepo with a Vite/React web app, an Express API, an OTLP intake proxy, background workers for incident grouping and agent orchestration, plus Drizzle ORM migrations for Postgres and ClickHouse.

The core problem Superlog solves is alert fatigue. Every engineering team that runs production services knows the drill: you set up monitoring, you get flooded with alerts, you start ignoring them, and then something actually breaks at 3 AM and nobody notices. Superlog groups related telemetry signals into incidents automatically, so instead of 47 individual alerts about a database connection pool issue, you get one incident with context. Then it goes further — an AI agent investigates the incident, correlates traces with logs, checks recent deployments, and proposes a fix.

### Why it matters

The observability market is worth over $5 billion annually, and every major player — Datadog, Grafana Labs, New Relic, Dynatrace — is racing to add AI features. But these are closed-source, expensive platforms where AI capabilities are premium add-ons. Superlog flips that model: the AI agent is core to the product, and the whole thing is open source under Apache 2.0.

For fullstack developers running React frontends with Node.js, NestJS, Django, or Go backends, observability is no longer optional. The OpenTelemetry standard has won the instrumentation war, but the tooling story is fragmented. You either pay Datadog prices (which can run thousands per month for a medium-sized team), self-host the Grafana stack (Prometheus + Loki + Tempo, three separate systems to maintain), or cobble together something custom. Superlog offers a middle path: a single self-hosted platform that understands all three OTel signal types and adds intelligence on top.

The MCP server integration is particularly forward-looking. Superlog exposes its data through the Model Context Protocol, which means Claude, ChatGPT, Cursor, and other AI tools can query your production telemetry directly. Ask your coding agent "why are users seeing 500 errors on the checkout endpoint?" and it can pull real traces, correlate them with recent deploys, and give you an answer grounded in actual production data. This is where developer tooling is heading.

### Key Features

**Agentic Incident Investigation.** When Superlog groups signals into an incident, it doesn't just send you a notification. An AI agent (powered by Claude) kicks off an investigation run: it pulls related traces and logs from ClickHouse, checks for correlated incidents, examines recent GitHub commits, and builds a structured analysis. The agent can propose fixes and even open a PR with the patch. This isn't a chatbot wrapper — it's a purpose-built investigation pipeline with tool access to your actual production data.

**OpenTelemetry-Native Ingestion.** Superlog speaks OTLP natively. Point your OpenTelemetry Collector (or any OTel-instrumented application) at the intake proxy on port 4101, and traces, logs, and metrics flow into ClickHouse. No proprietary agents, no vendor-specific SDKs. If your app already uses OpenTelemetry for instrumentation — and most modern frameworks support it out of the box — integration is a config change, not a code change.

**Intelligent Signal Grouping.** The grouping agent uses LLM-powered fingerprinting to cluster related telemetry signals. A spike in HTTP 500 errors, a burst of database timeout logs, and a drop in request throughput get grouped into a single incident instead of three separate alerts. The fingerprinting system is in a dedicated package (`packages/fingerprint`), which means the grouping logic is testable and improvable independently from the rest of the system.

**MCP Server for AI Tool Integration.** Superlog ships with a full MCP server that exposes tools for querying traces, logs, metrics, incidents, alerts, and dashboards. Your coding agent can ask "show me all errors on the /api/payments route in the last hour" and get structured data back. This bridges the gap between "AI coding assistant" and "AI that understands your production environment."

**GitHub and Slack Integration.** When the auto-recovery agent proposes a fix, it can open a GitHub PR with the changes. Incidents get posted to Slack with context and severity. The Linear integration creates tickets for incidents that need human attention. These aren't bolt-on integrations — they're deeply woven into the agent's workflow, so the output is a proper PR with tests, not a code snippet pasted into a Slack message.

**Self-Hosted with Cloud Option.** The community edition runs entirely on your infrastructure: Docker Compose for local development, or deploy to your own servers. The data stays in your ClickHouse and Postgres instances. For teams that want managed infrastructure, Superlog Cloud offers a hosted version with a free tier. This dual model means you can start self-hosting and migrate to cloud later without changing your instrumentation.

**Pluggable Agent Runners.** The agent orchestration layer is abstracted behind a runner interface. The default community runner uses Claude for investigation and records a local incident summary. The architecture supports plugging in different LLM backends or custom investigation logic. This is important for enterprises that need to run agents against internal models or add domain-specific investigation steps.

### Use Cases

- **Production incident triage** — Teams drowning in alerts use Superlog to group related signals and get AI-generated incident summaries instead of manually correlating Grafana panels and log queries.

- **Automated root cause analysis** — When a deployment causes performance regression, the agent correlates the timing with GitHub commits, examines the changed code paths in traces, and identifies the likely culprit.

- **AI-assisted debugging workflows** — Developers using Claude Code or Cursor can query production telemetry through the MCP server while debugging locally, bridging the gap between "this code looks wrong" and "this code is causing errors in production."

- **On-call engineer support** — Junior engineers handling incidents get structured investigation reports from the agent, reducing the time from alert to resolution and building institutional knowledge about common failure patterns.

- **Compliance and audit trails** — Every agent investigation run is recorded with its inputs, reasoning, and proposed actions, creating an audit trail for how incidents were handled.

### Pros and Cons

Pros:
- YC-backed with active development — 117 commits from the primary maintainer in two weeks suggests this isn't a weekend project that'll be abandoned next month.
- OpenTelemetry-native means zero vendor lock-in on the instrumentation side. Switch from Datadog to Superlog without touching your application code.
- The MCP integration is genuinely useful, not a checkbox feature. It turns your production telemetry into context that AI coding tools can reason about.
- Self-hosted under Apache 2.0 gives you full control over your data — critical for teams in regulated industries.

Cons:
- 760 stars and two weeks old means this is very early. The API surface is still settling, and you'll hit rough edges. 13 open issues at launch suggests the team is aware of gaps.
- ClickHouse dependency adds operational complexity. It's excellent for telemetry workloads but requires a different skill set than a standard Postgres-only deployment.
- The AI agent features require an Anthropic API key (Claude). If you're trying to avoid external API dependencies or run fully air-gapped, the self-healing features won't work without modification.

### Getting Started

```bash
# Clone the repository
git clone https://github.com/superloglabs/superlog.git
cd superlog

# Install dependencies
pnpm install

# Start the local stack (ClickHouse + Postgres + app)
docker compose up -d
pnpm --filter @superlog/db db:migrate
pnpm dev
```

The local dev environment starts three services:
- Web UI: http://localhost:5173
- API: http://localhost:4100
- OTLP intake: http://localhost:4101

Point your application's OpenTelemetry exporter at the intake proxy:

```bash
# For a Node.js app using OTel
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4101
```

To add Superlog to your project using coding agent skills:

```bash
npx skills add superloglabs/skills --all
```

Run typechecks to verify your setup:

```bash
pnpm typecheck
```

### Alternatives

**Grafana Stack (Prometheus + Loki + Tempo)** — The most popular open-source observability stack. More mature, larger community, and battle-tested at massive scale. But it's three separate systems to maintain, has no built-in AI investigation, and the query languages (PromQL, LogQL, TraceQL) have a steep learning curve. Choose Grafana if you need proven reliability at scale and don't mind the operational overhead.

**SigNoz** — Another open-source, OpenTelemetry-native alternative to Datadog. SigNoz is more mature (started in 2021) and offers both ClickHouse and Kafka-based backends. It has a cleaner UI for trace and log exploration but lacks the AI agent investigation and auto-recovery features. Choose SigNoz if you want a straightforward Datadog replacement without the AI layer.

**Langfuse** — Open-source LLM observability platform focused on tracing AI application calls. Langfuse tracks token usage, latency, and cost for AI features but doesn't handle general application telemetry (HTTP requests, database queries, infrastructure metrics). Choose Langfuse if your observability need is specifically about monitoring AI/LLM usage, not general production health.

### Verdict

Superlog is the most interesting take on observability I've seen this year. The combination of OpenTelemetry-native ingestion, AI-powered incident grouping, and autonomous investigation agents addresses a real pain point that existing tools dance around. Every observability vendor is adding "AI features" as a premium upsell — Superlog makes the AI core to the product and gives you the source code.

That said, this is a two-week-old project from a YC startup. The codebase is well-structured (proper test coverage, clean monorepo layout, typed throughout), but you're betting on a small team's ability to maintain and grow a complex distributed system. If you're comfortable with that risk — and if you're the kind of developer who runs open-source tools in production because you value control over convenience — Superlog is worth setting up alongside your existing monitoring. The MCP integration alone makes it useful even if you don't fully commit to it as your primary observability platform.
