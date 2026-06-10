---
name: workbench
description: "Workbench is an open-source BullMQ dashboard with 13 framework adapters, MCP integration, and Grafana-style alerting — a modern replacement for bull-board."
url: https://github.com/pontusab/workbench
stars: 383
forks: 32
language: TypeScript
tags: ["bullmq", "job-queue", "redis", "dashboard", "nodejs", "nestjs"]
featured: false
publishedAt: 2026-06-10
---

## Workbench

### Overview

Workbench is an open-source dashboard for BullMQ — the popular Redis-based job queue for Node.js. It mounts as a route in your existing backend, giving you a full UI for managing jobs, flows, schedulers, and metrics without spinning up separate infrastructure. Created by Pontus Abrahamsson (the developer behind [Hyper](https://hyperjs.ai)), it launched in late April 2026 and has been steadily gaining traction among backend developers who were tired of bull-board's limitations.

The project fills a gap that's existed in the Node.js ecosystem for years. BullMQ itself is excellent — it handles millions of jobs across companies like Slack, Notion, and various fintech platforms. But the monitoring story has been weak. bull-board, the de facto dashboard, hasn't kept pace with BullMQ's feature set. It lacks FlowProducer DAG visualization, has no built-in alerting, and its UI feels dated. Workbench addresses all of that while maintaining full backward compatibility with existing bull-board setups.

What makes Workbench stand out from a typical dashboard project is the breadth of its framework support. There are 13 first-party adapters — Hono, Elysia, Express, Fastify, Koa, NestJS, AdonisJS, Next.js, TanStack Start, Astro, Nuxt, Bun.serve, and h3. That covers essentially every Node.js and Bun web framework in active use today. The CLI detects your stack and wires everything up automatically.

### Why it matters

If you're building any kind of backend service that processes background work — email sending, image processing, webhook delivery, report generation — you're probably using BullMQ or considering it. It's the most mature job queue in the Node.js ecosystem, with 6,500+ GitHub stars and adoption at major companies. But monitoring those queues has always been an afterthought.

Workbench changes that by treating queue observability as a first-class concern. The Grafana-style alerting system lets you configure Slack, Discord, or webhook notifications based on queue events — failed jobs, stalled workers, high latency. That's the kind of thing that saves you from 3 AM production incidents.

The MCP server integration is forward-looking. You can query your queues from Cursor, Claude Desktop, Zed, or Continue.dev directly. Ask your AI assistant "how many email jobs failed in the last hour" and get an answer without leaving your editor. As AI-assisted development becomes standard, having your infrastructure tools speak the MCP protocol is a smart bet.

### Key Features

**Thirteen Framework Adapters.** Workbench ships dedicated packages for Hono, Elysia, Express, Fastify, Koa, NestJS, AdonisJS, Next.js, TanStack Start, Astro, Nuxt, Bun.serve, and h3. Each adapter is a thin wrapper that mounts the Workbench UI and API as a route in your existing app. The `@getworkbench/cli init` command auto-detects your framework, installs the right package, and injects the mount. Migrating from bull-board is a one-command swap.

**FlowProducer DAG Visualization.** BullMQ's FlowProducer lets you define job dependencies as directed acyclic graphs — a parent job waits for its children to complete before proceeding. Workbench renders these DAGs visually, showing the dependency tree, execution status of each node, and where failures occurred. bull-board doesn't support this at all.

**MCP Server for AI Assistants.** The `@getworkbench/mcp` package exposes a Model Context Protocol server that lets AI coding assistants interact with your queues. You can query job counts, inspect failures, retry jobs, and check worker health from Cursor, Claude Desktop, Zed, or Continue.dev. This is the first BullMQ tool to ship MCP support.

**Grafana-Style Alerting.** Configure contact points (Slack, Discord, webhooks) and rules in the dashboard's Alerts page. Notifications fire on queue events like job failures, stalled workers, or high latency thresholds. The model mirrors Grafana's contact-point-plus-rules approach, which is more flexible than simple threshold alerts. Unlike bull-board, which has no alerting at all, this catches problems before users do.

**Keyboard-Driven UI with Dark Mode.** The dashboard is built with a keyboard-first navigation model — jump between queues, filter jobs, retry or remove items without touching the mouse. Dark mode is built in. The UI renders job data, stack traces, and timing metrics in a layout that's dense enough for power users but readable at a glance.

**Zero Infrastructure Deployment.** Mount it as a route in your existing app — no separate service, no additional deployment pipeline. Or pull the standalone Docker image from GHCR for Kubernetes environments. The standalone image runs as a Bun server and connects to Redis via environment variable. Both paths are production-ready with basic auth protection by default.

**Standalone Docker Image.** For teams that prefer to keep their dashboard separate from their application server, Workbench provides a standalone Docker image at `ghcr.io/pontusab/workbench-standalone`. It connects to your Redis instance via the `REDIS_URL` environment variable and runs as an independent Bun server. Works with Docker Compose and Kubernetes.

### Use Cases

- **Backend services with background job processing** — Any Express, Fastify, or NestJS API that uses BullMQ for async work (email, notifications, data pipelines) can mount Workbench at `/jobs` and get full queue visibility without leaving the app.
- **Monorepo setups with multiple frameworks** — Teams running Next.js for the frontend and a separate Fastify or Hono API can use the same Workbench configuration across services, with framework-specific adapters for each.
- **Production monitoring and alerting** — Configure Slack or Discord alerts for job failures, stalled workers, or latency spikes. The Grafana-style rules engine lets you set thresholds per queue.
- **AI-assisted development workflows** — Use the MCP server to query queue health from Cursor or Claude Desktop. Ask "show me failed jobs from the last hour" without switching contexts.
- **Migration from bull-board** — The CLI's `init` command detects your existing bull-board setup and swaps the adapter in one step. The API surface is compatible, so existing queue configurations work without changes.

### Pros and Cons

Pros:
- Thirteen first-party framework adapters cover every major Node.js and Bun web framework. No other BullMQ dashboard comes close to this breadth of support.
- The MCP server integration is genuinely useful for AI-assisted development. Querying queue health from your editor is a workflow improvement that compounds over time.
- Grafana-style alerting with contact points and rules is a significant upgrade over bull-board's complete lack of monitoring. This alone justifies the migration for production deployments.
- The CLI-driven migration from bull-board (`npx @getworkbench/cli init`) removes the friction of switching. One command, zero config changes.

Cons:
- At 383 stars (as of early June 2026), the community is still small. You're betting on a project that hasn't yet proven long-term maintenance commitment, though the author's track record with Hyper suggests staying power.
- The MCP server is a new feature and may have rough edges. MCP itself is still evolving as a protocol, so expect breaking changes as the spec matures.
- No built-in support for non-BullMQ job queues. If you're using Agenda.js, Bree, or custom Redis queues, Workbench won't help. It's BullMQ-specific by design.

### Getting Started

```bash
# Auto-detect framework and set up
npx @getworkbench/cli init

# Or install manually for your framework (example: NestJS)
npm i @getworkbench/nestjs bullmq
```

Mount in your NestJS app:

```typescript
import { NestFactory } from "@nestjs/core";
import { Queue } from "bullmq";
import { workbench } from "@getworkbench/nestjs";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const emailQueue = new Queue("email", {
    connection: { url: process.env.REDIS_URL! },
  });

  await workbench(app, "/jobs", { queues: [emailQueue] });

  await app.listen(3000);
}
bootstrap();
```

Open `http://localhost:3000/jobs` to see your dashboard. Add basic auth for production:

```typescript
await workbench(app, "/jobs", {
  queues: [emailQueue],
  auth: { username: "admin", password: process.env.WORKBENCH_PASSWORD! },
});
```

For Docker standalone:

```bash
docker run --rm -p 3000:3000 \
  -e REDIS_URL=redis://host.docker.internal:6379 \
  ghcr.io/pontusab/workbench-standalone
```

### Alternatives

**bull-board** — The original BullMQ dashboard and the reason Workbench exists. bull-board supports Express, Fastify, Koa, and Hono but lacks FlowProducer DAG visualization, alerting, and MCP integration. It's more mature (5+ years) with a larger community, but development has slowed. Choose bull-board if you need a battle-tested solution and don't care about newer features.

**BullMQ Pro** — The commercial offering from the BullMQ team itself. It includes a hosted dashboard, priority support, and advanced features like rate limiting and group-based job management. It's the safest choice for enterprise deployments but costs money. Choose BullMQ Pro if you need vendor-backed support and are willing to pay for it.

**Custom Redis monitoring** — Tools like Redis Insight, Grafana with Redis data sources, or custom dashboards built on BullMQ's events API. More flexible but requires significant setup effort. Choose this path if you have complex monitoring needs that go beyond what any single dashboard can provide, or if your ops team already has Grafana infrastructure.

### Verdict

Workbench is the BullMQ dashboard the Node.js ecosystem has been waiting for. It's not just a better UI — the thirteen framework adapters, MCP integration, and Grafana-style alerting represent a meaningful step forward in how we monitor background job processing. The project is young (two months old as of June 2026), but the quality of the implementation and the author's track record with Hyper suggest this will become the default choice for BullMQ monitoring. If you're running BullMQ in production and using any of the supported frameworks — especially NestJS, Next.js, or Hono — the migration from bull-board takes five minutes and gives you significantly more visibility into your queues. The MCP integration alone is worth it for teams using AI coding assistants.
