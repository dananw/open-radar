---
name: daytona
description: "Daytona is open-source infrastructure for running AI-generated code in isolated sandboxes. Spin up secure dev environments in under 90ms with NestJS, Go, and TypeScript SDKs."
url: https://github.com/daytonaio/daytona
stars: 72447
forks: 5613
language: TypeScript
tags: ["ai-agents", "sandboxes", "dev-infrastructure", "code-execution", "open-source"]
featured: false
publishedAt: 2026-06-10
---

## Daytona

### Overview

Daytona is an open-source platform for running AI-generated code in secure, isolated sandboxes. With over 72,000 GitHub stars, it's one of the fastest-growing infrastructure projects in the AI agent space. The core promise: spin up a full compute environment — kernel, filesystem, network stack, allocated vCPU, RAM, and disk — in under 90 milliseconds.

The project was founded by Ivan Burazin, who previously created Codeanywhere (one of the first cloud IDEs) and co-founded the Shift Conference. That background in developer tooling shows. Daytona isn't a research experiment — it's production infrastructure designed for teams that need to run untrusted or AI-generated code safely at scale. The company raised a $5M seed round and has been building in public since early 2024.

The problem Daytona solves is becoming critical as AI coding agents proliferate. When Claude, Cursor, or a custom agent generates code, you need somewhere to run it that won't wreck your local machine or production environment. Traditional Docker setups work but are slow to provision and lack the API-first design that agent workflows demand. Daytona fills this gap with sandboxes that behave like full computers but provision like serverless functions.

### Why it matters

Every fullstack developer building AI-powered features eventually hits the same wall: where do I safely execute code that an LLM just generated? Running it locally is risky. Spinning up containers manually is slow and operationally heavy. Cloud functions are too constrained — no persistent filesystem, no interactive terminal, limited runtime.

Daytona addresses this with a platform that feels like a cross between a dev container and a serverless sandbox. You get full isolation (dedicated kernel, not just namespace-level separation), persistent state across sessions, and programmatic control via SDKs in TypeScript, Python, Go, and Ruby. For teams building AI agents that need to write, test, and iterate on code, this is becoming essential infrastructure.

The architectural choice to build the API layer in NestJS and the CLI in Go is pragmatic. NestJS gives you a well-structured, TypeScript-native backend with decorators, dependency injection, and OpenAPI generation baked in — any fullstack dev who's worked with Angular or NestJS will feel at home. The Go CLI is fast and distributable as a single binary. It's a polyglot stack that uses the right tool for each layer.

### Key Features

**Sub-100ms Sandbox Provisioning.** Daytona's sandboxes spin up in under 90ms from API call to running environment. That's fast enough to create a sandbox per request, per agent step, or per user interaction without noticeable latency. The underlying architecture uses pre-warmed pools and OCI-compatible images to achieve this speed, which matters when your AI agent needs to execute code in a tight loop.

**Full Isolation with Dedicated Kernels.** Unlike Docker containers that share the host kernel, Daytona sandboxes get their own kernel, filesystem, network stack, and resource allocation. This matters for security when running untrusted AI-generated code. A misbehaving sandbox can't escalate privileges or affect other workloads. The isolation model is closer to lightweight VMs than containers, without the provisioning overhead.

**Multi-Language SDKs.** Official SDKs for TypeScript (`@daytona/sdk`), Python (`daytona`), Go, and Ruby let you manage sandboxes from whatever stack you're building on. The SDKs cover the full lifecycle — create, configure, execute code, manage files, stream logs, and destroy. For a React/NestJS developer, the TypeScript SDK integrates directly into your existing codebase with full type safety.

**Persistent Stateful Snapshots.** Sandboxes can be snapshotted and restored, preserving filesystem state, installed packages, and running processes across sessions. This is crucial for agent workflows where an AI might set up an environment in one step and need it in a later step. Snapshots also enable branching — spin up multiple variations of the same environment for parallel exploration.

**MCP Server Integration.** Daytona ships with a built-in MCP (Model Context Protocol) server, letting AI tools like Claude and Cursor interact with sandboxes directly. An agent can create a sandbox, write code, execute it, read the output, and iterate — all through standardized tool calls. This is the bridge between AI code generation and actual execution.

**Web Terminal and SSH Access.** While the primary interface is programmatic (SDKs and API), Daytona also provides a web-based terminal, SSH gateway, and VNC access for manual debugging. When an agent produces code that fails in unexpected ways, humans can jump into the same sandbox and inspect what went wrong. The dashboard provides visual sandbox management with resource monitoring.

**OpenTelemetry Built In.** The platform includes an OpenTelemetry collector for tracing and metrics on sandbox operations. For teams running agent workflows at scale, this visibility into provisioning times, execution duration, and resource consumption is essential for optimization and cost management.

### Use Cases

- **AI coding agents** — The primary use case. When your agent generates code, Daytona provides a safe execution environment with fast provisioning and full isolation. Agents can create sandboxes, run tests, and iterate without risking your infrastructure.
- **Automated code review and CI** — Run untrusted pull request code in isolated sandboxes before merging. Each PR gets its own environment with proper resource limits and no access to secrets or production data.
- **Interactive development environments** — Spin up pre-configured dev environments for onboarding, workshops, or hackathons. Share sandbox URLs for instant collaboration without anyone installing dependencies locally.
- **Data processing pipelines** — Execute data transformation scripts that might be generated by LLMs or pulled from untrusted sources. Sandboxes provide the isolation needed for safe execution with persistent storage for intermediate results.
- **Multi-tenant SaaS platforms** — Offer code execution capabilities to your users (like Replit or CodePen) without managing the infrastructure yourself. Daytona handles provisioning, isolation, resource limits, and cleanup.

### Pros and Cons

Pros:
- The 72K star count reflects genuine community traction, not just hype. Active development with regular releases and responsive maintainers.
- Sub-100ms provisioning is real and benchmarked — this isn't marketing fluff. Fast enough for per-request sandbox creation patterns.
- Polyglot SDK coverage (TypeScript, Python, Go, Ruby) means it fits into virtually any fullstack workflow without requiring a specific language commitment.
- AGPL license for the core platform means you can self-host freely, while the commercial offering adds managed hosting and enterprise features.

Cons:
- AGPL licensing can be a dealbreaker for organizations that need to keep their modifications private. If you're embedding Daytona in a commercial product, you'll need to either open-source your changes or purchase a commercial license.
- The platform is infrastructure-heavy — running it self-hosted requires managing compute nodes, storage, and networking. Not a weekend project for a solo developer.
- Documentation is comprehensive but assumes familiarity with container orchestration concepts. The learning curve for developers new to sandboxed execution environments can be steep.

### Getting Started

```bash
# Install the CLI (macOS/Linux)
curl -sf -L https://download.daytona.io/daytona/install.sh | sh

# Or via npm
npm install -g @daytona/cli

# Authenticate
daytona login

# Create and start a sandbox
daytona sandbox create

# Or use the TypeScript SDK in your project
npm install @daytona/sdk
```

```typescript
import { Daytona } from '@daytona/sdk';

const daytona = new Daytona();

// Create a sandbox
const sandbox = await daytona.create({
  language: 'typescript',
});

// Execute code inside it
const result = await sandbox.process.codeRun(`
  console.log('Hello from sandbox!');
  const sum = (a: number, b: number) => a + b;
  console.log(sum(2, 3));
`);

console.log(result.output);
// Hello from sandbox!
// 5

// Filesystem operations
await sandbox.fs.uploadFile(Buffer.from('const x = 42;'), '/app/index.ts');
const file = await sandbox.fs.downloadFile('/app/index.ts');

// Clean up
await sandbox.delete();
```

### Alternatives

**E2B (e2b-dev/E2B)** — Another sandbox platform focused on AI code execution. E2B is simpler to get started with (managed-only, no self-hosting option) and uses Firecracker microVMs under the hood. Choose E2B if you want a fully managed solution and don't need the self-hosting flexibility or the deeper platform controls that Daytona offers.

**Modal (modal-labs/modal)** — Serverless compute platform that supports Python workloads with GPU access. Modal is stronger for ML inference and data processing use cases where you need GPU acceleration. Choose Modal if your primary need is running ML models rather than general-purpose code execution in multiple languages.

**Codesandbox (CodeSandbox)** — Browser-based development environment with sandboxes and collaboration features. More polished for interactive development and prototyping. Choose CodeSandbox if your use case is primarily human-driven development rather than programmatic agent-driven execution.

### Verdict

Daytona has earned its 72K stars by solving a problem that every AI-forward development team is going to face: where and how to safely run code that machines generate. The sub-90ms provisioning time isn't just a benchmark number — it unlocks architectural patterns (sandbox-per-request, sandbox-per-agent-step) that were previously impractical. The NestJS/Go/TypeScript polyglot stack is well-chosen and the multi-language SDKs mean you're not forced into a specific ecosystem. For fullstack developers building AI agents or integrating LLM-generated code into their workflows, Daytona is the most mature open-source option available right now. The AGPL license is the main friction point — check your company's policy before going deep. If licensing isn't a blocker, this is infrastructure you should be evaluating seriously.
