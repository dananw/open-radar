---
name: hatchet
description: "Hatchet is an open-source orchestration engine for background tasks, AI agents, and durable workflows — built in Go with Postgres-backed persistence and SDKs for TypeScript, Python, and Ruby."
url: https://github.com/hatchet-dev/hatchet
stars: 7349
forks: 417
language: Go
tags: ["workflow-engine", "background-tasks", "ai-agents", "durable-execution", "go"]
featured: false
publishedAt: 2026-06-15
---

## Hatchet

### Overview

Hatchet is an orchestration engine for background tasks, AI agents, and durable workflows. It sits somewhere between a traditional task queue like Celery or BullMQ and a heavy-duty workflow platform like Temporal — and it threads that needle well. With 7,300 GitHub stars, active releases through June 2026 (v0.89.0 dropped on June 10), and SDKs for Go, TypeScript, Python, and Ruby, it's one of the more complete solutions in this space that you can actually self-host.

The project started in late 2023 and has been steadily gaining traction. What makes it stand out is the architecture decision to use Postgres as the durability layer for both task execution and observability. No Redis. No RabbitMQ. No separate message broker. If you already run Postgres — and let's be honest, most of us do — Hatchet adds minimal infrastructure overhead. That's a meaningful advantage for small teams who don't want to babysit a Redis cluster just to run background jobs.

The core problem Hatchet solves is the gap between "throw it on a queue and hope for the best" and "implement a full workflow orchestration platform." Most startups begin with something like BullMQ or Celery, then slowly accumulate custom retry logic, dead letter handling, monitoring dashboards, and ad-hoc durability patches. Hatchet gives you all of that out of the box — retries with exponential backoff, cron scheduling, event-driven triggering, DAG-based workflows, durable sleep, and a real-time web UI — without requiring you to stitch together five different tools.

### Why it matters

The background task and workflow orchestration space is heating up because AI agents need durable execution. When an agent makes an API call that takes 30 seconds, fails, and needs to retry with different parameters — that's a workflow problem, not a queue problem. Traditional task queues weren't designed for this. They fire, they forget, and if something goes wrong mid-execution, you're writing custom recovery code.

Hatchet positions itself at the intersection of three trends: the shift toward durable execution (pioneered by Temporal, now being adopted everywhere), the explosion of AI agent workflows that need multi-step orchestration, and the developer demand for simpler infrastructure. The Postgres-first architecture is smart — it means you get transactional guarantees, easy backups, and a single datastore to reason about. For teams running NestJS, Django, or Go backends, Hatchet integrates without requiring new infrastructure.

The project also competes directly with DBOS and Temporal's simpler use cases, but with a much lower barrier to entry. You can get Hatchet running locally with Docker in under a minute. Temporal, by contrast, requires understanding concepts like task queues, workers, workflows, and activities before you write your first line of code. Hatchet's developer experience is closer to "define a function, annotate it, done."

### Key Features

**Postgres-Backed Durability.** Hatchet uses PostgreSQL as its persistence layer for both task state and observability data. This means no separate message broker (Redis, RabbitMQ, SQS) to manage. Task execution history is persisted up to a configurable retention period, enabling replay, debugging, and audit trails. For teams already running Postgres, this is a significant operational simplification.

**Durable Tasks and DAG Workflows.** The durable tasks feature is a drop-in replacement for Temporal-style workflows. Tasks can survive process crashes, resume from intermediate state, and compose into DAGs (directed acyclic graphs) for multi-step data pipelines. You also get durable sleep and event-based waits, so a workflow can pause for external input and resume when that input arrives.

**Multi-Language SDKs.** Hatchet provides official SDKs for Go, TypeScript, Python, and Ruby. The TypeScript SDK integrates naturally with NestJS and Express. The Python SDK works with FastAPI and Django. Tasks are defined as decorated functions — no YAML, no DSL, no config files. You write code, Hatchet handles the orchestration.

**Built-in Rate Limiting and Fair Scheduling.** Rate limits can be static (e.g., 100 requests/minute to a third-party API) or dynamic (per-user limits calculated at runtime). Concurrency policies enforce fair scheduling using dynamic keys, so one tenant can't starve another. Worker slot control ensures workers don't accept more work than they can handle. These are features you'd normally build yourself after your first production incident.

**Event-Driven and Webhook Triggering.** Tasks can be triggered by events published to Hatchet's event system or by incoming webhooks from external services. This makes it straightforward to build event-driven architectures — a Stripe webhook fires, Hatchet processes the payment, sends a confirmation email, and updates the CRM, all as a durable workflow with automatic retries.

**Real-Time Observability UI.** Hatchet ships with a web dashboard for monitoring task execution, viewing logs, setting up alerts, and debugging failures. It includes OpenTelemetry support and Prometheus metrics out of the box. Multi-tenancy is built in, so a single Hatchet instance can serve multiple teams with isolated views.

**AI Agent Orchestration.** Hatchet's durability features map directly to AI agent workflows: long-running inference tasks, multi-step tool-use chains, human-in-the-loop approval gates, and retry-with-backoff for flaky API calls. The concurrency controls prevent agents from overwhelming downstream services, and the observability UI gives you visibility into what your agents are actually doing.

### Use Cases

- **Background job processing for web apps** — Offload email sending, image processing, report generation, and PDF rendering from your NestJS or Django request handlers. Hatchet handles retries, dead letters, and monitoring so you don't have to build that infrastructure yourself.

- **AI agent workflow orchestration** — Chain multiple LLM calls, tool uses, and external API interactions into durable workflows that survive failures. When GPT-5 rate-limits you at step 3 of a 7-step agent chain, Hatchet retries from the failure point, not from scratch.

- **Data pipeline DAGs** — Build ETL-style pipelines where task B depends on task A, task C depends on both A and B, and the whole graph retries intelligently on failure. Simpler than Airflow for application-embedded pipelines.

- **Event-driven microservice coordination** — When service A publishes an event, Hatchet triggers workflows across services B, C, and D with proper sequencing, retries, and observability. Better than ad-hoc message queue consumers.

- **Scheduled and cron-based automation** — Run reports at midnight, sync data every hour, clean up expired sessions daily. Hatchet's cron and scheduled run features handle the timing; the durability features handle the "what if it crashes at 2am" problem.

### Pros and Cons

Pros:
- Postgres-first architecture eliminates the need for Redis or RabbitMQ as a message broker, reducing operational complexity and infrastructure costs for small to mid-size teams.
- Multi-language SDKs with idiomatic APIs mean you can adopt Hatchet in an existing Go, TypeScript, or Python codebase without rewriting anything. The TypeScript SDK integrates cleanly with NestJS.
- The durability model is genuinely useful — tasks survive crashes, resume from intermediate state, and compose into DAGs. This is real durable execution, not just "we put it in a database."
- Active development with releases every 1-2 weeks and a responsive Discord community. The project isn't abandoned vaporware.

Cons:
- At 7,300 stars and v0.89, Hatchet is still pre-1.0. The API surface is stabilizing but expect some breaking changes. The 130 open issues suggest the product is still maturing.
- Postgres as the durability layer is a double-edged sword. At very high throughput (10k+ tasks/second), Postgres becomes the bottleneck. Redis-backed queues can handle higher throughput with lower latency, though at the cost of durability.
- The self-hosted version requires Docker, and the setup is non-trivial for production deployments. Hatchet Cloud exists but adds a dependency on a third-party service and a bill.

### Getting Started

```bash
# Install the Hatchet CLI (macOS, Linux, WSL)
curl -fsSL https://install.hatchet.run/install.sh | bash

# Start a local Hatchet server (requires Docker)
hatchet server start

# Install the TypeScript SDK
npm install @hatchet-dev/typescript-sdk

# Install the Python SDK
pip install hatchet-sdk

# Install the Go SDK
go get github.com/hatchet-dev/hatchet
```

Define a simple task in TypeScript:

```typescript
import Hatchet from "@hatchet-dev/typescript-sdk";

const hatchet = Hatchet.init();

const simpleTask = hatchet.task({
  name: "send-email",
  fn: async (input) => {
    // Your email sending logic here
    return { success: true };
  },
});

// Trigger it
await simpleTask.run({ to: "user@example.com", subject: "Hello" });
```

Deploy to production with Docker Compose or use Hatchet Cloud for a managed experience.

### Alternatives

**Temporal** — The heavyweight champion of durable execution. Temporal offers stronger durability guarantees, a more mature ecosystem, and support for extremely complex workflows. But it has a steep learning curve, requires running a Temporal server (plus dependencies), and the SDK surface area is massive. Choose Temporal when you need mission-critical workflows at enterprise scale and have the team to manage the infrastructure. Choose Hatchet when you want 80% of the durability with 20% of the complexity.

**BullMQ** — The most popular Node.js task queue, backed by Redis. BullMQ is simpler, faster for basic job processing, and has a huge community. But it lacks durable execution, DAG workflows, and built-in observability. Choose BullMQ when you just need a reliable queue for fire-and-forget jobs and you're already running Redis. Choose Hatchet when your jobs need retries with state, multi-step workflows, or you want observability without building it yourself.

**DBOS** — A newer durable execution platform that also uses Postgres as its backing store. DBOS takes a more code-centric approach with TypeScript decorators and focuses on making existing functions durable. It's lighter weight than Hatchet but has fewer features (no DAG workflows, no built-in UI, no multi-language SDKs). Choose DBOS when you want the simplest possible path to durable TypeScript functions. Choose Hatchet when you need a more complete orchestration platform.

### Verdict

Hatchet is the workflow engine I'd reach for if I were building a new fullstack app with background tasks or AI agent orchestration in 2026. The Postgres-first architecture is the right call for most teams — it eliminates an entire class of operational problems (Redis cluster management, message broker monitoring, data consistency between systems) that nobody wants to deal with. The multi-language SDKs mean it works whether your backend is NestJS, Django, or Go, and the developer experience is dramatically simpler than Temporal.

Is it production-ready? For most workloads, yes. The 10k tasks/second ceiling is more than enough for 95% of applications. The observability features are genuinely useful, not just checkbox items. And the AI agent orchestration angle is timely — as more developers build multi-step agent workflows, they need durable execution that doesn't require a PhD in distributed systems. Hatchet fills that gap. If you're tired of fighting with Celery or BullMQ and you want something that actually handles the hard parts of background processing, give it a serious look.
