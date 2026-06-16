---
name: sandcastle
description: "TypeScript library for orchestrating AI coding agents in isolated Docker, Podman, or Vercel sandboxes with branch-based workflows and parallel execution."
url: https://github.com/mattpocock/sandcastle
stars: 6041
forks: 606
language: TypeScript
tags: ["ai-agents", "typescript", "sandbox", "docker", "coding-agents"]
featured: false
publishedAt: 2026-06-16
---

## Sandcastle

### Overview

Sandcastle is a TypeScript library that lets you orchestrate AI coding agents inside isolated sandboxes. One function call — `sandcastle.run()` — spins up a container, runs your agent, collects the commits, and merges them back into your branch. It hit 6,000 stars by June 2026, roughly three months after its March launch, and the release cadence (v0.8.0 dropped on June 11) shows the project isn't slowing down.

The library is built by Matt Pocock, the creator of Total TypeScript and one of the most recognizable names in the TypeScript education space. Before Sandcastle, Pocock was known primarily for teaching — his courses and YouTube channel have reached hundreds of thousands of developers. Sandcastle is his first major open-source infrastructure tool, and it targets a very specific pain point: running coding agents safely without them wrecking your local environment.

The core problem Sandcastle solves is isolation. If you've ever let Claude Code or Codex loose on a real codebase, you know the anxiety. Agents make file changes, install packages, run build scripts — and sometimes they break things in ways that are hard to undo. Sandcastle puts the agent inside a Docker container (or Podman, or Vercel microVM), gives it a git worktree, and lets it work. When it's done, the commits get collected and merged back. If something goes wrong, your main working directory is untouched.

### Why it matters

The AI coding agent space is exploding in 2026, but most developers are still running agents directly on their machines. That's fine for quick one-off tasks, but it falls apart fast when you want to run multiple agents in parallel, create automated review pipelines, or integrate agent output into CI. Sandcastle fills exactly this gap — it's the orchestration layer that the agent ecosystem was missing.

What makes it stand out from other sandboxing approaches is the TypeScript-native API. You don't need to write shell scripts or Docker Compose files. You write a few lines of TypeScript, point it at a Docker socket, and you're running agents in isolation. The provider-agnostic design means you can start with Docker locally and move to Vercel Sandbox for cloud-based execution without rewriting your code. For fullstack developers who already live in TypeScript, this feels natural.

### Key Features

**Provider-Agnostic Sandboxing.** Sandcastle ships with built-in providers for Docker, Podman, and Vercel Sandbox. You can also create custom providers using `createBindMountSandboxProvider` or `createIsolatedSandboxProvider`. This means you're not locked into any single infrastructure choice — use Docker for local dev, Vercel for CI, or write your own provider for something exotic.

**Configurable Branch Strategies.** The library supports three branch modes: `head` (work directly on the current branch), `branch` (create a named branch for the agent), and `merge-to-head` (auto-merge results back). This gives you fine-grained control over how agent changes integrate with your workflow. The default strategy adapts based on whether you're using a bind-mount or isolated provider.

**Reusable Sandboxes with `createSandbox()`.** Instead of spinning up a new container for every agent run, `createSandbox()` creates a persistent sandbox you can call `run()` on multiple times. This is perfect for implement-then-review patterns — run the coding agent to implement a feature, then run a review agent on the same branch without paying the container startup cost twice.

**Lifecycle Hooks.** Sandcastle supports hooks at both the host and sandbox level. Run `npm install` when the sandbox is ready, copy environment files into the worktree, or trigger notifications when the run completes. Hooks are defined as shell commands and execute at predictable points in the sandbox lifecycle.

**Parallel Agent Execution.** Because each agent runs in its own isolated sandbox, you can spin up multiple agents simultaneously without them interfering with each other. This is the real killer feature — imagine running five agents in parallel, each tackling a different issue, all producing commits on separate branches that you can review and merge independently.

**Structured Output Extraction.** Sandcastle can extract typed payloads from agent output using tag-based parsing. Define a Zod schema, tell the agent to emit a specific XML tag, and Sandcastle parses it into a typed TypeScript object. This is useful for building automated pipelines where agent output needs to feed into downstream systems.

**Interactive Sessions.** Beyond one-shot `run()` calls, Sandcastle supports `interactive()` sessions where you can have a back-and-forth conversation with the agent inside the sandbox. This is great for exploratory work where you want to guide the agent step by step while keeping the isolation boundary.

### Use Cases

- **Parallel issue resolution** — Spin up one agent per GitHub issue, each in its own sandbox, and review all the commits when they finish. What would take hours of sequential agent runs happens in minutes.
- **Automated code review pipelines** — Run an implement agent, then a review agent on the same branch, then a test agent — all without touching your local environment. The multi-run `createSandbox()` pattern makes this straightforward.
- **CI/CD integration** — Add agent-powered code improvements to your CI pipeline. Sandcastle's TypeScript API integrates naturally with Node.js-based CI scripts, and the Vercel provider gives you cloud sandboxes without managing Docker infrastructure.
- **Safe experimentation** — Let an agent refactor a module or upgrade a dependency inside a sandbox. If the result is garbage, throw it away. If it's good, merge the commits. Zero risk to your working directory.
- **Multi-model workflows** — Use a powerful model (Claude Opus) for implementation, then a cheaper model (Claude Sonnet) for review, all within the same sandbox lifecycle. The agent parameter accepts any model string.

### Pros and Cons

Pros:
- **Clean TypeScript API** — The `run()` function takes an options object and returns a typed result. No shell scripting, no YAML configuration files. If you know TypeScript, you know Sandcastle.
- **Provider flexibility** — Docker, Podman, Vercel, or custom. You can switch providers with a single import change. The abstraction is thin enough that you're not losing provider-specific features.
- **Active development** — Eight releases in three months (v0.1.0 through v0.8.0), with 75 open issues showing real community engagement. Matt Pocock is clearly committed to this project.
- **MIT licensed** — No vendor lock-in, no enterprise tier gating. The full feature set is available to everyone.

Cons:
- **Agent support is currently Claude-focused** — The built-in `claudeCode()` provider is the primary documented agent. Other agents (Codex, Cursor) require custom agent provider implementations, which adds friction if you're not on Claude.
- **Docker dependency for local use** — You need Docker Desktop or Podman running locally. On macOS this means Docker Desktop's resource overhead, which some developers find heavy for what amounts to running a CLI tool.
- **Relatively young project** — At three months old, the API is still evolving. Breaking changes between minor versions are likely. The `v0.x` versioning makes this explicit, but it means you should pin your version carefully.

### Getting Started

```bash
# Install the package
npm install --save-dev @ai-hero/sandcastle

# Initialize the .sandcastle directory
npx @ai-hero/sandcastle init

# Copy and configure environment variables
cp .sandcastle/.env.example .sandcastle/.env
# Edit .sandcastle/.env and add your ANTHROPIC_API_KEY
```

Basic usage:

```typescript
import { run, claudeCode } from "@ai-hero/sandcastle";
import { docker } from "@ai-hero/sandcastle/sandboxes/docker";

const result = await run({
  agent: claudeCode("claude-opus-4-7"),
  sandbox: docker(),
  prompt: "Fix the TypeScript errors in src/utils/parser.ts",
  maxIterations: 3,
});

console.log(`Created ${result.commits.length} commits on ${result.branch}`);
```

Multi-run pattern for implement + review:

```typescript
import { createSandbox, claudeCode } from "@ai-hero/sandcastle";
import { docker } from "@ai-hero/sandcastle/sandboxes/docker";

await using sandbox = await createSandbox({
  branch: "agent/feature-auth",
  sandbox: docker(),
  hooks: {
    sandbox: { onSandboxReady: [{ command: "npm install" }] },
  },
});

// Implement
await sandbox.run({
  agent: claudeCode("claude-opus-4-7"),
  promptFile: ".sandcastle/implement.md",
  maxIterations: 5,
});

// Review
const review = await sandbox.run({
  agent: claudeCode("claude-sonnet-4-6"),
  prompt: "Review the changes. Fix any bugs or style issues.",
});
```

### Alternatives

**Devin by Cognition** — Devin is a full AI software engineer that runs in a cloud sandbox with its own browser, terminal, and editor. It's a complete environment rather than a library. Choose Devin when you want a managed, GUI-driven experience and don't mind the subscription cost. Choose Sandcastle when you want programmatic control over agent orchestration in your own infrastructure.

**OpenHands (formerly OpenDevin)** — OpenHands is an open-source platform for AI software agents with a web UI and its own sandboxing runtime. It's more opinionated about the agent runtime and includes a full web interface for monitoring. Choose OpenHands when you want a complete agent platform with UI. Choose Sandcastle when you want a lightweight library that integrates into existing TypeScript workflows.

**Claude Code directly** — Running Claude Code without any sandboxing works fine for quick tasks and is the simplest option. No setup, no Docker, no abstraction layer. Choose the direct approach when you're doing exploratory one-off work. Choose Sandcastle when you need isolation, parallelism, or integration into automated pipelines.

### Verdict

Sandcastle is the most practical answer I've seen to the question "how do I run coding agents without them breaking my stuff." It's not trying to be a full agent platform or a replacement for your editor — it's a focused library that does one thing well: run agents in isolated sandboxes with clean TypeScript APIs. Matt Pocock's involvement means the developer experience is excellent, the documentation is clear, and the API design reflects years of thinking about TypeScript ergonomics. At 6,000 stars and climbing, with releases every two weeks, this project has real momentum. If you're building anything that involves running AI coding agents in production — whether that's a CI pipeline, a multi-agent workflow, or just a safer way to let Claude loose on your codebase — Sandcastle deserves a serious look.
