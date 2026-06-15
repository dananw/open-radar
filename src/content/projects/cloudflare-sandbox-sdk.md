---
name: cloudflare-sandbox-sdk
description: "Run secure, isolated code execution environments on Cloudflare's edge network with the Sandbox SDK — perfect for AI agents, code interpreters, and dev sandboxes."
url: https://github.com/cloudflare/sandbox-sdk
stars: 1043
forks: 101
language: TypeScript
tags: ["sandbox", "cloudflare", "ai-agents", "code-execution", "edge-computing", "typescript"]
featured: false
publishedAt: 2026-06-15
---

## Cloudflare Sandbox SDK

### Overview

Cloudflare Sandbox SDK is an open-source TypeScript library for running sandboxed code execution environments on Cloudflare's edge network. It crossed 1,000 GitHub stars in mid-June 2026, reflecting growing demand for secure, edge-native code execution — particularly from developers building AI agents and code interpreters.

The project comes from Cloudflare's developer platform team. That matters because this isn't a third-party wrapper or community effort — it's the official SDK for Cloudflare's container-based sandbox infrastructure. The same team behind Workers, D1, R2, and the broader Cloudflare developer ecosystem built this. You're getting first-party support for a capability that's becoming central to how modern applications handle untrusted code.

The core problem it solves: AI agents need to execute code. Code playgrounds need isolation. CI/CD systems need ephemeral environments. And all of these need to run close to users without managing servers. Before the Sandbox SDK, building this meant stitching together Docker, Kubernetes, and a cloud provider — a multi-week effort for most teams. The SDK collapses that to a few lines of TypeScript that run on Cloudflare's global network.

### Why it matters

The AI agent ecosystem has a blind spot. Every major agent framework — LangChain, CrewAI, OpenAI's Agents SDK — assumes the agent can call tools, but none of them solve the "where does the code actually run?" problem safely. Running agent-generated code on your server is a security nightmare. Running it in a shared container means one bad agent can affect others. The Sandbox SDK gives each agent its own isolated container with a declared entry point, file system, and network access — exactly the security model you want.

This connects to a broader shift in how we think about compute. The "serverless function" model works great for request-response patterns, but AI agents need persistent environments. They write files, install packages, run background processes, and serve web UIs. The Sandbox SDK bridges that gap — you get the developer experience of a persistent container with the operational model of serverless. No capacity planning, no cluster management, just `getSandbox()` and go.

The timing is also notable. Cloudflare has been quietly building the most complete edge developer platform available, and the Sandbox SDK fills what was arguably the biggest missing piece. If you're already on Cloudflare for Workers, D1, or R2, adding sandboxed code execution is now a natural extension rather than a architectural pivot.

### Key Features

**Isolated Container Execution.** Each sandbox runs in its own container with full process isolation. The SDK provides `sandbox.exec()` for running arbitrary commands with streaming stdout/stderr support. This isn't a toy REPL — you get real Linux containers where you can install packages, compile code, and run multi-step workflows. The isolation boundary is enforced at the infrastructure level, not the application level.

**Edge-Native Architecture.** Sandboxes run on Cloudflare's global network, which means they start close to your users. Cold start times are measured in seconds, not the 30-60 seconds typical of traditional container platforms. For AI code execution use cases where users are waiting for results, that latency difference is the product experience.

**File System Operations.** The SDK exposes a full file API — `readFile()`, `writeFile()`, and directory management. This is critical for agent workflows where the code needs to read input data, generate output files, and manage state across multiple execution steps. Files persist for the lifetime of the sandbox.

**Quick Tunnels.** `sandbox.tunnels.get(port)` exposes any port inside the container on a `*.trycloudflare.com` URL with zero configuration. No Cloudflare account setup, no DNS configuration — just a QUIC tunnel to the edge. This is incredibly useful for preview environments, development servers, and agent-generated web UIs. The URLs don't survive container restarts, which is the right tradeoff for ephemeral workloads.

**Built-in Code Interpreter.** The SDK ships with a code interpreter example that gives LLMs a Python REPL. This is the pattern OpenAI uses with ChatGPT's code execution, now available to any developer building on Cloudflare. You can wire it up to Workers AI, OpenAI's API, or any other model provider.

**Git Integration.** Clone repositories directly into sandboxes. This enables use cases like running Claude Code headless on any repo, building CI/CD pipelines that test pull requests in isolation, or creating development environments that spin up from a Git URL. The SDK includes a working example of Claude Code running in a sandbox.

**Durable Object Backing.** Each sandbox maps to a Durable Object, which gives you Cloudflare's strongest consistency guarantees. The sandbox state, tunnel cache, and lifecycle management all benefit from Durable Object's single-threaded execution model. This is the kind of infrastructure decision that prevents the subtle state corruption bugs that plague distributed sandbox systems.

### Use Cases

- **AI agent code execution** — Give your AI agents the ability to write and run code safely. Each agent gets its own sandbox with file system access, package installation, and network isolation. Perfect for building ChatGPT-style code interpreters in your own products.

- **Interactive development environments** — Build browser-based IDEs or code playgrounds where users can write, run, and debug code without touching your servers. The quick tunnel feature lets you expose a running dev server instantly for preview.

- **Ephemeral CI/CD pipelines** — Spin up isolated environments for each build, test, or deployment. No shared runners, no queue contention. Each pipeline gets its own container that's destroyed when done.

- **Data analysis platforms** — Let users upload data and run analysis scripts in isolated environments. The file system API handles data ingestion, and the exec API runs the analysis. Output files are accessible through the SDK.

- **Agent-generated web applications** — AI agents that build and serve web applications need somewhere to run them. The quick tunnel feature exposes agent-generated servers on public URLs for testing and demonstration.

### Pros and Cons

Pros:
- First-party Cloudflare SDK with full documentation, examples, and developer support. Not a community wrapper that might break when Cloudflare changes an API.
- Sub-second cold starts compared to 30-60 seconds on traditional container platforms. The edge-native architecture makes this viable for interactive use cases where users are waiting.
- Quick tunnels are a killer feature — zero-config public URLs for any port inside the sandbox. This eliminates the "how do I expose this?" problem that plagues every sandbox platform.
- Active development with 686 commits and a growing examples directory covering Claude Code, OpenAI Agents, OpenCode, and more.

Cons:
- Beta status means APIs may change before v1.0. Production use today carries migration risk if the SDK's surface area shifts significantly.
- Cloudflare container pricing starts at $0.000024/s per container, which adds up for long-running sandboxes. This is cheaper than most alternatives but not free — budget-conscious teams need to model their usage.
- Docker is required for local development, which adds setup friction for teams not already using containers. The first local run takes 2-3 minutes to build the container image.
- Vendor lock-in is real. The SDK is tightly integrated with Cloudflare's Durable Objects, Workers, and edge network. Migrating to another platform would require a significant rewrite.

### Getting Started

```bash
# Create a new project from the minimal template
npm create cloudflare@latest -- my-sandbox --template=cloudflare/sandbox-sdk/examples/minimal
cd my-sandbox

# Start the dev server (first run builds Docker container: 2-3 min)
npm run dev

# Test code execution
curl http://localhost:8787/run

# Test file operations
curl http://localhost:8787/file
```

Deploy to production:

```bash
npx wrangler deploy
```

Basic usage in a Worker:

```typescript
import { getSandbox, proxyToSandbox, type Sandbox } from '@cloudflare/sandbox';

export { Sandbox } from '@cloudflare/sandbox';

type Env = {
  Sandbox: DurableObjectNamespace<Sandbox>;
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const proxyResponse = await proxyToSandbox(request, env);
    if (proxyResponse) return proxyResponse;

    const sandbox = getSandbox(env.Sandbox, 'my-sandbox');

    // Execute Python code
    const result = await sandbox.exec('python3 -c "print(2 + 2)"');
    return Response.json({ output: result.stdout, success: result.success });
  }
};
```

### Alternatives

**E2B (Code Interpreter SDK)** — E2B provides similar sandboxed code execution for AI agents, with a focus on the code interpreter pattern. It's cloud-agnostic and has SDKs for Python and JavaScript. E2B is more mature for pure code interpreter use cases, but lacks Cloudflare's edge network and quick tunnel features. Choose E2B if you need multi-cloud support and don't want Cloudflare dependency.

**Modal** — Modal offers serverless GPU and compute containers with a Python-first API. It's better suited for ML inference and heavy compute workloads, but its cold start times are longer and it doesn't have the edge-native architecture. Choose Modal if your sandboxes need GPUs or you're building ML pipelines rather than agent code execution.

**Docker + Fly.io** — Running Docker containers on Fly.io gives you more control over the container environment and avoids vendor lock-in. But you're managing your own orchestration, networking, and scaling. Choose this path if you need custom container images, specific Linux configurations, or want to avoid Cloudflare's ecosystem entirely.

### Verdict

Cloudflare Sandbox SDK is the most practical solution I've seen for running untrusted code at the edge. The quick tunnel feature alone makes it worth evaluating — exposing sandbox services on public URLs with zero configuration is a genuine productivity multiplier for teams building AI agents and development tools. The 1,000+ stars in its first year and the growing examples directory (Claude Code, OpenAI Agents, OpenCode) suggest real adoption beyond Cloudflare's own marketing.

It's beta software, so don't bet your production infrastructure on it today. But if you're building an AI agent platform, code playground, or any application that needs secure code execution, this should be on your evaluation list. The combination of edge-native execution, Durable Object state management, and first-party Cloudflare support makes it the strongest option in a space that's becoming increasingly important. The fact that it's open-source under Apache 2.0 means you can inspect the implementation, contribute fixes, and understand exactly what's happening under the hood.
