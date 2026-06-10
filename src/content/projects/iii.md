---
name: iii
description: "Rust-based service composition framework with Worker/Function/Trigger primitives, SDKs for TypeScript, Python, Rust, and Go, real-time observability, and native agent support."
url: https://github.com/iii-hq/iii
stars: 17792
forks: 1178
language: Rust
tags: ["backend-framework", "service-composition", "observability", "ai-agents", "typescript", "python", "rust", "go"]
featured: false
publishedAt: 2026-06-10
---

## iii

### Overview

iii is a Rust-based framework that collapses backend service composition into three primitives: Worker, Function, and Trigger. Instead of wiring up separate tools for queues, cron jobs, HTTP endpoints, state management, and observability — each with their own integration story — iii gives you one live system surface. You add workers with a CLI command, they register functions, and triggers route events to those functions. Everything is traceable in real-time through a built-in console. The project hit 17,792 GitHub stars and 1,178 forks, with active development through June 2026.

The framework comes from the team behind Motia (seen in the demo video URLs), and the architecture reflects serious thinking about what makes backend development painful. The core insight is that every backend starts the same way: you pick a queue, pick a cron library, pick an observability stack, pick an HTTP framework, and then spend weeks integrating them. iii eliminates that integration layer entirely. When you add a queue worker, every other worker in the system can immediately call it. When you add an agent, it can discover and invoke any function in the catalog. No configuration files, no service mesh setup, no SDK gymnastics.

The three-primitives model is deceptively simple. Workers are processes that register with the iii engine — a TypeScript API service, a Python data pipeline, a Rust microservice, all become workers with a few lines of code. Workers can create other workers at runtime, which means agents and applications can extend the system while it's running. Triggers are anything that causes a function to run: HTTP endpoints, cron schedules, queue subscriptions, state changes, stream events, or direct calls. Functions are units of work with stable identifiers like `content::classify` or `orders::validate`. Map everything to these three things and you get a development process that's both composable and observable.

### Why it matters

The backend framework space has been fragmented for years. You use NestJS for your API, BullMQ for your queues, node-cron for scheduling, OpenTelemetry for observability, and then glue it all together with custom code. Each tool has its own mental model, its own configuration, its own failure modes. iii proposes a different architecture: one runtime, one set of primitives, one observability story. This is the kind of bet that either becomes the next Kubernetes (too useful to ignore) or the next Mesos (too abstract for most teams). Early indicators lean toward the former.

For fullstack developers specifically, iii solves a real problem. You're building a React frontend, a NestJS or Django backend, maybe a Go microservice for performance-critical work. Each piece has its own deployment story, its own monitoring, its own way of handling background jobs. iii's multi-language SDKs (TypeScript, Python, Rust, Go) mean you can write workers in whatever language makes sense and compose them through a single runtime. The console — built with React and Rust — gives you real-time visibility into every worker, function, trigger, queue, and trace without bolting on a separate observability tool.

The agent angle is what makes this especially timely. In mid-2026, every team is building AI features. Most of those features need to orchestrate multiple backend services — call an LLM, store results, trigger a workflow, notify a user. iii's agent integration is native: agents can add workers, discover functions, call them, and trace what happened. Same interface a developer uses. This isn't an afterthought bolted onto a web framework — it's a core design principle.

### Key Features

**Three-Primitive Mental Model.** Worker, Function, Trigger — that's the entire architecture. Workers are processes that register with the engine and expose functions. Triggers are events that cause functions to run. Functions are typed units of work with stable identifiers. This model maps cleanly to every backend pattern: HTTP handlers, queue consumers, cron jobs, event listeners, and agent tools all become functions with triggers. The simplicity is the point — once you internalize the model, you can compose any backend system without thinking about integration plumbing.

**Multi-Language SDKs.** iii ships SDKs for TypeScript (`npm install iii-sdk`), Python (`pip install iii-sdk`), Rust (`iii-sdk` crate), and Go (`go get github.com/iii-hq/iii/sdk/packages/go/iii`). Each SDK lets you register workers, declare functions, and define triggers in your language of choice. A TypeScript API worker can call a Python ML worker can call a Rust compute worker — all through the same engine, with the same observability. This is critical for fullstack teams that use different languages for different layers.

**CLI-First Workflow.** `iii worker add queue`, `iii worker add agent`, `iii worker add sandbox` — adding capabilities to your system is a single command. `iii project init myapp` scaffolds a project. Running `iii` starts the engine. The CLI handles scaffolding, dependency management, and worker registration. Browse available workers at workers.iii.dev. This CLI-first approach means the learning curve is shallow: if you can run a command, you can extend the system.

**Real-Time Observability Console.** The iii console (React + Rust) lets you inspect workers, functions, triggers, queues, traces, logs, and real-time state. No separate Datadog or Grafana setup — observability is built into the runtime. Every function call is traceable end-to-end, across language boundaries. For teams that have spent weeks wiring up OpenTelemetry across microservices, this is a significant productivity win.

**Runtime Extensibility.** Workers can create other workers at runtime. Agents can add workers, discover their functions, call them, and trace what happened — using the same interface a developer uses. This means your AI agent can dynamically extend the system when it encounters a capability gap. Need a new data transformation? The agent adds a worker. Need to process a new file format? The agent discovers or creates the function. This is the kind of self-extending architecture that makes AI agents genuinely useful instead of just conversational.

**Built-In Primitives.** iii ships with built-in workers for queues (`iii-queue`), state management (`iii-state`), pub/sub (`iii-pubsub`), streaming (`iii-stream`), cron scheduling (`iii-cron`), HTTP endpoints (`iii-http`), observability (`iii-observability`), bridging (`iii-bridge`), execution (`iii-exec`), and worker management (`iii-worker-manager`). These aren't separate libraries — they're workers in the same system, composable with the same primitives. Add a queue to your project with one command and every worker can publish to it immediately.

**Agent Skills Integration.** iii provides agent-readable reference material through its skills system. Install them with `npx skills add iii-hq/iii/skills`. Each worker in the iii-hq/workers repository ships its own skill. This means coding agents (Claude Code, Codex, Cursor) can understand and work with iii's primitives natively. The skills cover HTTP endpoints, queues, cron, state, streams, custom triggers, and more.

### Use Cases

- **Microservice orchestration** — Teams running multiple services (NestJS API, Python ML pipeline, Go data processor) can compose them through iii's runtime without custom integration code. Each service becomes a worker, and cross-service calls become function invocations with built-in tracing.
- **AI agent backends** — Building an AI agent that needs to call APIs, query databases, send notifications, and manage workflows? Each capability is a worker with typed functions. The agent discovers available functions at runtime and calls them through iii's catalog.
- **Event-driven architectures** — Replace separate Kafka/RabbitMQ setups with iii's built-in queue and pub/sub workers. Define triggers declaratively and let the engine handle routing, serialization, and delivery. Same observability story as everything else.
- **Fullstack rapid prototyping** — Scaffold a project with `iii project init`, add a database worker, an HTTP worker, and an auth worker. You have a working backend in minutes instead of days, with real-time tracing from the start.
- **Platform engineering** — Platform teams publish workers (auth, logging, metrics, deployment). Application teams register functions and declare triggers. No more maintaining shared libraries with breaking changes — workers are versioned, discoverable, and independently deployable.

### Pros and Cons

Pros:
- The three-primitive model (Worker/Function/Trigger) genuinely reduces cognitive load. Once you understand the model, every backend pattern maps to it naturally — no more switching mental models between queues, crons, HTTP handlers, and event listeners.
- Multi-language SDKs (TypeScript, Python, Rust, Go) make this viable for real polyglot stacks, not just TypeScript-only projects. The cross-language function calling with built-in tracing is something you'd normally need a service mesh for.
- The built-in observability console eliminates the need for separate OpenTelemetry/Datadog/Grafana setup for most teams. Real-time traces across all workers, regardless of language, out of the box.
- Runtime extensibility (workers creating workers) is a genuinely novel architecture that makes AI agent integration natural instead of bolted-on.

Cons:
- The engine is licensed under Elastic License 2.0 (ELv2), not a permissive open-source license. The SDKs and console are Apache 2.0, but the core runtime has restrictions on offering iii as a managed service. This matters for some teams and use cases.
- At 17.8K stars, the community is established but the ecosystem of third-party workers is still growing. You'll likely need to build custom workers for domain-specific functionality rather than finding pre-built solutions.
- The three-primitive model is elegant but requires buy-in. If your team is already invested in NestJS modules, Django views, or Go HTTP handlers, migrating to iii's model is a significant architectural shift. It's better for new projects than brownfield migrations.

### Getting Started

```bash
# Install iii
curl -fsSL https://install.iii.dev/iii/main/install.sh | sh

# Scaffold and start a project
iii project init myapp
cd myapp
iii

# Add workers
iii worker add queue
iii worker add agent
iii worker add database

# Install SDK in your project
npm install iii-sdk    # TypeScript/Node.js
pip install iii-sdk    # Python
```

Create a worker in TypeScript:

```typescript
import { iii } from "iii-sdk";

const worker = iii.worker("my-api");

worker.function("greet", async (input) => {
  return { message: `Hello, ${input.name}!` };
});

worker.trigger("http", { path: "/greet", method: "POST" });

worker.start();
```

Browse the full quickstart guide at [iii.dev/docs/quickstart](https://iii.dev/docs/quickstart).

### Alternatives

**Motia** — The predecessor to iii, Motia was the original service composition framework from the same team. If you're already on Motia, iii is the evolution — same concepts, refined primitives, better tooling. The migration path is documented, and iii subsumes everything Motia did.

**Temporal** — A workflow-as-code platform that excels at long-running, fault-tolerant workflows with complex retry and compensation logic. Temporal is the better choice when your primary concern is workflow reliability (financial transactions, multi-step approval processes). iii is better when you want lightweight service composition with real-time observability, not heavyweight workflow orchestration.

**NestJS with BullMQ + OpenTelemetry** — The traditional Node.js backend stack. NestJS gives you a solid HTTP framework, BullMQ handles queues, and OpenTelemetry provides observability. This is more mature, has a larger ecosystem, and doesn't require adopting a new mental model. Choose it when your team is already productive with these tools and the integration overhead isn't a bottleneck.

### Verdict

iii is the most interesting backend architecture I've seen since the rise of serverless. The three-primitive model isn't just elegant — it's practical. It eliminates the integration tax that every backend team pays when they wire up queues, crons, HTTP endpoints, and observability separately. The multi-language SDKs make it viable for real polyglot stacks (which is what most fullstack teams actually run), and the native agent integration is perfectly timed for the AI-first development wave of 2026. The ELv2 license on the engine is a real consideration — check it against your compliance requirements before committing. But for greenfield projects, especially those involving AI agents that need to orchestrate multiple backend services, iii should be on your shortlist. The alternative is spending weeks on integration code that iii gives you in minutes.
