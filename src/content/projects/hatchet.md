---
name: hatchet
description: "Hatchet is a Go-based orchestration engine for background tasks, AI agents, and durable workflows with SDKs for TypeScript, Python, and Ruby."
url: https://github.com/hatchet-dev/hatchet
stars: 7367
forks: 420
language: Go
tags: ["workflow-engine", "ai-agents", "background-tasks", "distributed-systems", "orchestration"]
featured: false
publishedAt: 2026-06-17
---

## Hatchet

### Overview

Hatchet is an orchestration engine for background tasks, AI agents, and durable workflows. Written in Go with SDKs for TypeScript, Python, Ruby, and Go itself, it sits at the intersection of two problems every fullstack developer faces: running things reliably in the background and coordinating multi-step processes that can't afford to lose state. At 7,367 GitHub stars and climbing — with a v0.89.0 release just days ago — it's one of the fastest-growing infrastructure projects in the space.

The project is built by Hatchet Dev, a team that's been iterating on the workflow orchestration problem since late 2023. Their approach is notable because they chose Postgres as the core durability layer for both the task runtime and the observability system. That's a deliberate architectural bet — rather than requiring Redis, RabbitMQ, or a separate message broker, Hatchet leans on a database most teams already run. The result is a system that's dramatically easier to self-host without sacrificing the guarantees that distributed task queues typically provide.

The core problem Hatchet solves is the gap between "throw it on a queue" and "use a full workflow orchestrator." If you've ever stitched together Celery with Redis, BullMQ with a cron service, or Temporal with its own SDK, you know the pain. Simple tasks need retries and scheduling. Complex tasks need DAGs, pause/resume, event-driven triggers, and observability. Most teams end up with something that handles one end well and punts on the other. Hatchet tries to cover both.

### Why it matters

The background task and workflow orchestration space has been fragmented for years. Celery dominates Python but has a well-documented maintenance problem. BullMQ is solid for Node.js but limited to Redis-backed patterns. Temporal is powerful but heavy — it requires its own server cluster and a new mental model around workflows and activities. Airflow is for data pipelines, not application-level tasks. Hatchet targets the middle ground that most fullstack teams actually inhabit.

The AI agent angle makes this especially relevant right now. As developers build more multi-step AI workflows — RAG pipelines, tool-calling loops, human-in-the-loop approval chains — they need durable execution that survives crashes, retries, and long-running pauses. Traditional task queues weren't designed for workflows that might pause for hours waiting for a human decision or an external API callback. Hatchet's durable tasks and event waits handle exactly this pattern.

The Postgres-as-durability-layer decision also matters more than it sounds. Self-hosting Temporal requires deploying its server, database, and matching versions across the stack. Self-hosting Hatchet requires Docker or a single binary, pointed at a Postgres instance. For teams that want workflow orchestration without a dedicated infrastructure team, that's a significant reduction in operational burden.

### Key Features

**Durable Task Execution.** Hatchet tasks survive process crashes, server restarts, and network failures. When a task starts, its state is persisted to Postgres. If the worker dies mid-execution, the task gets reassigned automatically. This isn't just retry logic — it's true durable execution where long-running operations can resume from their last checkpoint. For AI agent loops that might take minutes or hours, this is the difference between "it works in theory" and "it works in production."

**DAG Workflows.** Beyond simple tasks, Hatchet supports Directed Acyclic Graphs for multi-step workflows. Define dependencies between tasks, fan-out/fan-in patterns, and conditional branching — all with automatic state management. The DAG engine handles the complexity of tracking which steps succeeded, which need retry, and what can run in parallel. You define the graph, Hatchet manages the execution.

**Event-Driven Triggers.** Tasks can be triggered by events published to Hatchet's event system, webhooks from external services, cron schedules, or direct API calls. The event listener pattern supports durable event waits — a workflow can pause, waiting for a specific event to arrive, and resume when it does. This is critical for building approval workflows, external API callbacks, or any process that needs to wait for something outside its control.

**Multi-Language SDKs.** Official SDKs for TypeScript (Node.js), Python, Go, and Ruby mean you can orchestrate tasks across your entire stack. A NestJS API can trigger a Python ML pipeline that calls back to a Go microservice, all coordinated through Hatchet. The TypeScript SDK is the most mature with NPM downloads tracking upward, but the Python SDK hit 1.33.9 last week and is actively maintained.

**Built-in Observability.** Hatchet ships with a real-time web dashboard showing task status, execution history, logs, and error traces. It supports OpenTelemetry for exporting to external observability tools, plus Prometheus metrics for monitoring. You don't need to bolt on a separate monitoring solution — the dashboard gives you visibility out of the box, and the OTel integration connects to whatever you already run.

**Rate Limiting and Priority Queues.** Per-task rate limits prevent your workers from hammering third-party APIs. Dynamic rate limits can enforce per-user or per-tenant quotas computed at runtime. Priority levels ensure critical tasks jump ahead of batch jobs. Concurrency controls with configurable keys prevent duplicate processing. These aren't afterthoughts — they're first-class primitives that most task queues either lack or charge extra for.

**Self-Hostable with Postgres.** The entire stack runs on Postgres — no Redis, no RabbitMQ, no separate message broker. A single Docker Compose file gets you a production-ready deployment. This cuts operational complexity significantly compared to systems that require multiple backing services, and it means your workflow state lives in a database your team already knows how to manage, back up, and monitor.

### Use Cases

- **AI agent orchestration** — Running multi-step LLM pipelines with tool calls, human-in-the-loop approvals, and automatic retries when API calls fail. Hatchet's durable execution handles the long-running, failure-prone nature of agent workflows.
- **Background job processing** — Image resizing, email sending, PDF generation, report compilation. The kind of work that every SaaS app needs and every developer implements differently until they use a proper task queue.
- **ETL and data pipelines** — Multi-step data processing with dependency graphs, parallel fan-out, and conditional branching. Hatchet's DAG support handles the orchestration while your Python or TypeScript code handles the transformation.
- **Webhook processing and event-driven architectures** — Ingesting events from Stripe, GitHub, Shopify, or internal services and routing them through multi-step workflows with guaranteed delivery and retry semantics.
- **Scheduled maintenance and batch operations** — Cron-triggered tasks for database cleanup, cache warming, report generation, and any recurring work that needs monitoring and automatic retry on failure.

### Pros and Cons

Pros:
- Postgres-only backend eliminates the Redis/RabbitMQ dependency that most task queues require, cutting infrastructure complexity roughly in half for self-hosted deployments.
- SDK coverage across TypeScript, Python, Go, and Ruby means you can orchestrate polyglot stacks from a single control plane without writing glue code between different queue systems.
- Durable execution with event waits solves the AI agent coordination problem that traditional fire-and-forget task queues simply can't handle — workflows survive crashes and resume correctly.
- The web UI with built-in logging, OpenTelemetry, and Prometheus support means you get observability without bolting on Grafana, Datadog, or similar tools separately.
- Active development with releases every few days (v0.89.0 on June 10, Python SDK 1.33.9 on June 15) signals a responsive team shipping real improvements, not a stalled project.

Cons:
- Postgres-as-everything means high-throughput scenarios (tens of thousands of tasks per second) may hit database bottlenecks before Redis-backed alternatives do. For most applications this isn't an issue, but at extreme scale it's worth benchmarking.
- The Go runtime and Postgres dependency make local development slightly heavier than a Redis-backed queue — you need Docker or a Postgres instance running, which adds a step to the dev setup.
- Version 0.89.0 signals the API is still stabilizing. Breaking changes between minor versions are possible, and the documentation sometimes lags behind the latest release. Production users should pin versions carefully.

### Getting Started

The fastest way to try Hatchet locally:

```bash
# Install the Hatchet CLI (macOS/Linux/WSL, requires Docker)
curl -fsSL https://install.hatchet.run/install.sh | bash
hatchet --version

# Start a local Hatchet server (uses Docker internally)
hatchet server start
```

For a TypeScript/Node.js project:

```bash
npm install @hatchet-dev/typescript-sdk
```

```typescript
import Hatchet from '@hatchet-dev/typescript-sdk';

const hatchet = Hatchet.init();

// Define a simple task
const myTask = hatchet.task({
  name: 'send-email',
  fn: async (input) => {
    // Your email logic here
    return { status: 'sent', to: input.to };
  },
});

// Run the worker
hatchet.run();
```

For Python:

```bash
pip install hatchet-sdk
```

```python
from hatchet_sdk import Hatchet

hatchet = Hatchet()

@hatchet.task(name="process-data")
def process_data(input):
    # Your processing logic
    return {"status": "done", "count": input["count"]}

hatchet.run()
```

Deploy to production with Docker Compose or follow the self-hosting guide at [docs.hatchet.run](https://docs.hatchet.run).

### Alternatives

**Temporal** — The heavyweight champion of workflow orchestration. Temporal offers stronger durability guarantees and a more mature ecosystem, but requires its own server cluster, a new SDK paradigm (workflows and activities), and a steeper learning curve. Choose Temporal when you need bulletproof durability at extreme scale and have a platform team to manage the infrastructure. Choose Hatchet when you want 80% of the functionality with 20% of the operational overhead.

**BullMQ** — The go-to task queue for Node.js developers, backed by Redis. BullMQ is simpler, lighter, and well-suited for straightforward background job processing. But it lacks DAG support, durable execution, and polyglot SDK support. If your entire stack is TypeScript and your tasks are simple fire-and-forget with retries, BullMQ is probably enough. If you need workflows, multi-language coordination, or event-driven triggers, Hatchet is the better fit.

**Celery** — The Python ecosystem's workhorse for distributed task queues. Celery has a massive ecosystem and years of production hardening, but its development has slowed, its configuration is notoriously complex, and it requires Redis or RabbitMQ as a broker. For Python-only workloads with simple task patterns, Celery still works. For anything involving TypeScript, Go, durable workflows, or modern observability, Hatchet is the more forward-looking choice.

### Verdict

Hatchet is the workflow engine I'd reach for if I were building a fullstack application with background processing needs today. The Postgres-only architecture is its killer feature — it turns what's typically a multi-service infrastructure problem into something you can run with a single container. The AI agent orchestration story is compelling too; durable execution with event waits maps cleanly to the multi-step, failure-prone nature of LLM workflows. At 7,367 stars and v0.89.0, it's past the "interesting experiment" phase but not yet in the "enterprise bloat" territory. For fullstack developers building with React, NestJS, Django, or Go who need reliable background task processing — especially with AI workflows in the mix — Hatchet is worth serious evaluation. The fact that it ships with a real dashboard and OpenTelemetry support out of the box means you won't be flying blind in production either.
