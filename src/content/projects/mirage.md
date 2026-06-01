---
name: mirage
description: "Mirage is a unified virtual filesystem for AI agents that mounts S3, GitHub, Slack, Gmail, and more as a single bash-accessible tree — one abstraction for every backend."
url: https://github.com/strukto-ai/mirage
stars: 2904
forks: 204
language: TypeScript
tags: ["ai-agents", "virtual-filesystem", "typescript", "llm", "devtools"]
featured: false
publishedAt: 2026-06-02
---

## Mirage

### Overview

Mirage is a unified virtual filesystem for AI agents, built by Strukto AI. The core idea is deceptively simple: mount every backend service — S3, GitHub, Slack, Gmail, Redis, Google Drive, MongoDB, and more — under a single directory tree, then let agents interact with all of them through standard bash commands. It reached nearly 3,000 GitHub stars within a month of its May 2026 launch, which speaks to how badly the agent ecosystem needs this kind of glue layer.

The project provides both Python and TypeScript SDKs, a CLI daemon that plugs into coding agents like Claude Code and Codex, and integrations with major frameworks including OpenAI Agents SDK, Vercel AI SDK, LangChain, Pydantic AI, and OpenHands. The architecture is layered: a virtual filesystem layer handles mount points and resource abstraction, a dispatcher routes operations to the right backend with caching, and the infrastructure layer talks to actual APIs. Agents see one tree. The complexity stays hidden underneath.

The problem Mirage solves is real. Every AI agent that needs to read from S3, check a GitHub repo, search Slack messages, and update a Google Sheet currently requires four separate SDK integrations, four sets of credentials, four different error handling patterns, and four distinct API vocabularies. LLMs already know bash — it's heavily represented in training data. Mirage exploits that by making every service accessible through `cat`, `ls`, `grep`, `cp`, and `wc`. No new abstractions to learn. No custom tool schemas to define per service.

### Why it matters

The MCP (Model Context Protocol) ecosystem has been growing fast, but it has a fragmentation problem. Every MCP server defines its own tool schema, its own authentication flow, and its own response format. An agent that works with 10 MCP servers needs to understand 10 different interfaces. Mirage takes a different philosophical approach: instead of teaching agents new tools, make existing infrastructure accessible through the one interface every LLM already understands — the Unix filesystem.

This matters more as agents get longer autonomy windows. A coding agent running for 30 minutes needs to pull configs from GitHub, check deployment logs in S3, message a team on Slack, and update a tracking doc. If each of those requires a different tool call with different parameters and different error semantics, the agent burns tokens on plumbing instead of the actual task. Mirage collapses that overhead to a handful of familiar commands.

There's also a portability angle. Mirage workspaces can be cloned, snapshotted, and versioned. You can move an agent's entire working environment between machines without restarting or reconfiguring. For teams running agents in CI/CD or as scheduled jobs, that reproducibility is valuable. The workspace abstraction means agent state isn't trapped in a single process.

### Key Features

**Unified Mount System.** Mirage mounts disparate services under a single root directory. You create a Workspace object, declare your mounts — RAM at `/data`, S3 at `/s3`, Slack at `/slack`, GitHub at `/github` — and the agent sees one coherent tree. Adding a new backend is a one-line mount declaration, not a new integration. The mount abstraction handles authentication, path resolution, and caching transparently.

**Bash-First Interface.** Every operation goes through standard Unix commands: `cat` to read, `ls` to list, `grep` to search, `cp` to copy between backends, `wc` to count. LLMs have extensive bash training data, so they execute these commands reliably without few-shot examples or custom tool descriptions. You can even pipe across mounts — `grep alert /slack/general/*.json | wc -l` searches Slack messages and counts matches in one line.

**Custom Command Override.** You can register new commands or override existing ones per resource and file type. For example, `cat` on a Parquet file in S3 can render rows as JSON instead of raw bytes. This lets you tailor the filesystem semantics to your domain without changing the agent's command vocabulary. The override system is granular: resource-specific, filetype-specific, or global.

**Framework Integrations.** Mirage works with OpenAI Agents SDK, Vercel AI SDK (TypeScript), LangChain, Pydantic AI, CAMEL, and OpenHands out of the box. The Python SDK embeds directly into FastAPI or any async runtime. The TypeScript SDK has both Node.js and browser builds. You don't need to run a separate daemon process — the filesystem lives inside your application.

**Portable Workspaces.** Clone, snapshot, and version entire agent environments. Move a workspace between machines, resume an interrupted agent run, or create branching environments for parallel agent tasks. This is particularly useful for CI pipelines where you want deterministic agent behavior across runs.

**Extensive Resource Support.** The mount roster includes RAM, local disk, Redis, S3-compatible storage (R2, OCI, Supabase, GCS), Google Workspace (Gmail, Drive, Docs, Sheets, Slides), project tools (GitHub, Linear, Notion, Trello), messaging (Slack, Discord, Telegram, Email), MongoDB, and SSH. That covers the majority of what production agents need to interact with.

### Use Cases

- **Multi-service agent workflows** — An agent that monitors GitHub issues, searches related Slack discussions, pulls deployment logs from S3, and updates a Notion tracker. All accessible through a single filesystem without custom tool definitions.
- **Coding agent enhancement** — Plug Mirage into Claude Code or Codex so they can read configs from GitHub, check CI logs in S3, or search documentation in Google Drive through bash, getting more useful work done per turn.
- **Data pipeline orchestration** — Copy files between S3 and local disk, transform data with shell commands, and write results to Google Sheets — all in one pipeline without switching SDKs.
- **Agent state management** — Snapshot and version agent workspaces for reproducibility in CI/CD, debugging, or audit trails. Clone environments for parallel agent runs.
- **Browser-based agent apps** — The browser SDK lets you give web applications a virtual filesystem, useful for building agent interfaces that need to access multiple backends from the client side.

### Pros and Cons

Pros:
- The bash-first design is genuinely clever. LLMs have deep bash knowledge from training, so agents execute Mirage commands with high reliability compared to custom tool schemas that require specific parameter formats.
- Resource coverage is broad. S3, GitHub, Slack, Gmail, Google Drive, Redis, MongoDB, and more — the mount roster covers what production agents actually need.
- No separate process required. The SDK embeds directly into your Python or TypeScript application. The CLI daemon is optional, for when you want to plug into external coding agents.
- Workspace portability (clone, snapshot, version) is a real differentiator for production agent deployments where reproducibility matters.

Cons:
- FUSE dependency for local mounts limits Windows support. macOS and Linux only for now, which excludes a chunk of the developer population.
- The abstraction layer adds latency. Every `cat` on an S3 file goes through the mount layer, dispatcher, cache, and then the actual S3 API. For high-throughput scenarios, direct SDK calls will be faster.
- The project is young (May 2026). The resource connector ecosystem will have rough edges. Expect breaking changes in the API as the project matures.
- Documentation is still catching up to the feature set. The quickstart guides work, but advanced patterns like custom command overrides need more examples.

### Getting Started

```bash
# Python
uv add mirage-ai

# TypeScript (Node.js)
npm install @struktoai/mirage-node

# TypeScript (Browser)
npm install @struktoai/mirage-browser

# CLI daemon (for Claude Code, Codex integration)
pip install mirage-ai
mirage start
```

Basic usage in TypeScript:

```ts
import { Workspace, RAMResource, S3Resource, SlackResource, GitHubResource } from '@struktoai/mirage-node';

const ws = new Workspace({
  '/data':   new RAMResource(),
  '/s3':     new S3Resource({ bucket: 'logs' }),
  '/slack':  new SlackResource({}),
  '/github': new GitHubResource({}),
});

await ws.execute('cat /github/my-repo/README.md');
await ws.execute('grep error /s3/logs/*.txt | wc -l');
await ws.execute('cp /s3/report.csv /data/local.csv');
```

### Alternatives

**MCP (Model Context Protocol)** — The Anthropic-led standard for connecting LLMs to external tools. MCP defines per-server tool schemas that agents discover at runtime. It's more flexible in some ways — each server can expose rich, typed operations — but it requires agents to learn a new interface per service. Mirage's bash-first approach trades expressiveness for universality. If your agent already knows bash, Mirage is faster to integrate.

**LangChain Tool Kits** — LangChain provides individual tool wrappers for S3, GitHub, Slack, and other services. Each wrapper has its own class, parameters, and error handling. Mirage consolidates all of those into one filesystem abstraction. LangChain's approach gives you more control per service; Mirage gives you less boilerplate across all services.

**Direct SDK Integration** — The most flexible option. You write custom code for each service using their native SDKs. Maximum control, maximum maintenance burden. Mirage exists because most agent use cases don't need that level of control — they need reliable read/write access across multiple backends with minimal integration code.

### Verdict

Mirage is the right abstraction at the right time. The AI agent ecosystem is drowning in tool integration complexity. Every new service an agent needs to touch requires a new MCP server, a new tool schema, or a new SDK wrapper. Mirage cuts through that by betting on the one interface every LLM already knows: the Unix filesystem. The bash-first design isn't just convenient — it's empirically more reliable because LLMs have extensive shell training data. The project is young and the connector ecosystem will need time to mature, but the architectural direction is sound. If you're building agents that interact with multiple backends, Mirage should be on your shortlist. It won't replace direct SDK calls for performance-critical paths, but for the 80% case where agents need to read, search, and move data across services, it's a significant reduction in integration complexity.
