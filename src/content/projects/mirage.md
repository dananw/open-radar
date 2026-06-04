---
name: mirage
description: "Mirage is a unified virtual filesystem for AI agents that mounts S3, GitHub, Slack, Gmail, and more as one tree with bash-like tools."
url: https://github.com/strukto-ai/mirage
stars: 3041
forks: 216
language: TypeScript
tags: ["ai-agents", "virtual-filesystem", "typescript", "developer-tools", "agent-framework"]
featured: false
publishedAt: 2026-06-05
---

## Mirage

### Overview

Mirage is a unified virtual filesystem for AI agents. It mounts services and data sources — S3, Google Drive, Slack, Gmail, Redis, GitHub, MongoDB, and more — side-by-side under a single tree that agents interact with using standard bash commands. No new APIs to learn, no SDK juggling. If an LLM knows `cat`, `grep`, `cp`, and `wc`, it can use Mirage out of the box.

The project launched in early May 2026 and crossed 3,000 GitHub stars within a month. It's built by Strukto AI, a company focused on agent infrastructure. The core insight driving Mirage is simple but powerful: LLMs are already extremely fluent in bash and filesystem operations because those patterns dominate their training data. Instead of teaching agents yet another API surface for each service, Mirage gives them one abstraction they already understand.

The problem Mirage solves is real. Today, building an agent that reads from Slack, searches S3 logs, pulls data from GitHub, and writes results to Google Docs means wiring up four different SDKs, managing four sets of credentials, and writing custom glue code for each interaction. Every new integration multiplies the complexity. Mirage collapses all of that into a single workspace where every service is just a directory, and every operation is just a bash command.

### Why it matters

The AI agent ecosystem is exploding, but the tooling is fragmented. Every service has its own MCP server, its own SDK, its own authentication flow. Developers building multi-service agents spend more time on integration plumbing than on actual agent logic. Mirage offers a different model: a universal abstraction layer that makes every backend look like files in a directory.

This connects to a broader trend in agent development. The most capable agents aren't the ones with the most specialized tools — they're the ones that can compose general-purpose operations across many data sources. Unix pipes and filesystem semantics are the original composability primitives. Mirage applies that same philosophy to the agent era, and the 3,000-star traction in weeks suggests developers have been waiting for exactly this kind of tool.

### Key Features

**Unified Filesystem Abstraction.** Every mounted service — whether it's an S3 bucket, a Slack workspace, a GitHub repo, or a MongoDB collection — appears as a directory under a single root. Agents navigate and operate on all of them with the same set of commands. This eliminates the cognitive overhead of context-switching between different service APIs and dramatically reduces the amount of code needed for multi-service agent workflows.

**Bash-Native Agent Interface.** Mirage exposes a small set of Unix-like tools (`cat`, `ls`, `cp`, `grep`, `wc`, `mv`, `rm`, `find`) that work identically across every mounted resource. LLMs are already deeply trained on these patterns, so agents using Mirage require zero new vocabulary. A command like `grep alert /slack/general/*.json | wc -l` just works, composing across services with familiar pipe semantics.

**Extensible Resource System.** The resource architecture supports RAM, disk, Redis, S3, R2, OCI, Supabase, GCS, Gmail, Google Drive, Google Docs, Google Sheets, Google Slides, GitHub, Linear, Notion, Trello, Slack, Discord, Telegram, Email, MongoDB, SSH, and more. Each resource implements a common interface, and you can mount multiple instances of the same type. New resource types are straightforward to add.

**Custom Command Registration.** You can register new commands that work across every mount, or override existing commands for specific resource and filetype combinations. For example, you can make `cat` on a Parquet file in S3 render rows as JSON instead of raw bytes. This lets you shape the agent's toolset to your specific domain without modifying Mirage itself.

**Portable Workspaces with Snapshots.** Workspaces can be cloned, snapshotted, and versioned. You can move agent runs between machines without restarting or reconfiguring. The `ws.snapshot("demo.tar")` call serializes the entire workspace state. This is particularly useful for debugging agent behavior — you can capture a workspace state, share it with a teammate, and replay the exact same environment.

**Multi-Language SDKs.** Mirage ships with Python (`mirage-ai`) and TypeScript (`@struktoai/mirage-node`, `@struktoai/mirage-browser`, `@struktoai/mirage-core`) SDKs. You embed workspaces directly inside FastAPI, Express, browser apps, or any async runtime. There's also a standalone CLI that plugs into coding agents like Claude Code and Codex, plus first-class integration with OpenAI Agents SDK, Vercel AI SDK, LangChain, Pydantic AI, CAMEL, and OpenHands.

**Cross-Service Pipeline Composition.** Because every resource shares filesystem semantics, you can pipe operations across services naturally. Copy a file from S3 to local disk, grep through Slack messages and count matches, pull a GitHub README and summarize it — all with the same bash pipeline operators. This composability is the core architectural advantage over point-to-point integrations.

### Use Cases

- **Multi-source data aggregation** — An agent that collects customer feedback from Slack channels, support tickets from Linear, and usage metrics from S3, then produces a consolidated report. Mirage makes this a single bash pipeline instead of three separate SDK integrations.

- **DevOps automation agents** — Agents that monitor infrastructure by reading logs from S3, checking GitHub issues, and posting alerts to Slack or Discord. The filesystem abstraction means the agent doesn't need to know the details of each service's API.

- **Content research and synthesis** — An agent that reads documents from Google Drive, cross-references them with GitHub wiki pages, and writes a summary to a new Google Doc. Each step is a familiar filesystem operation.

- **Coding agent enhancement** — Plugging Mirage into Claude Code or Codex so the coding agent can access external resources (documentation, configs, data files) through the same bash interface it already uses for local files.

- **RAG pipeline data preparation** — Collecting training or context data from multiple sources (S3, Notion, GitHub) into a unified workspace, then processing it with standard Unix tools before feeding it to an embedding pipeline.

### Pros and Cons

Pros:

- The abstraction is genuinely clever. Agents that know bash can use every mounted service without any new API knowledge, which means less prompt engineering and fewer hallucinated API calls.

- The resource catalog is already broad — 20+ service integrations out of the box — and the extension model is clean enough that adding custom resources is straightforward.

- Dual Python and TypeScript SDKs with browser support means you can use Mirage in virtually any agent stack. The framework integrations (OpenAI Agents SDK, LangChain, Vercel AI SDK) cover the major players.

Cons:

- The abstraction leaks. Not every service maps cleanly to filesystem semantics. Complex operations like "search Gmail with specific date filters and attachment types" may require custom commands rather than simple bash, reducing the "just use bash" promise.

- FUSE-based mounts require macOS or Linux. Windows developers need to use the in-memory or SDK-only modes, which limits the CLI experience.

- At one month old, the documentation is still catching up with the feature set. Some resources have sparse examples, and the API surface is evolving quickly. Production use at this stage requires comfort with reading source code.

### Getting Started

```bash
# Install the Python SDK (includes CLI)
uv add mirage-ai

# Or install the TypeScript SDK
npm install @struktoai/mirage-node

# Or install the standalone CLI
curl -fsSL https://strukto.ai/mirage/install.sh | sh
```

Quick Python example:

```python
from mirage import Workspace
from mirage.resource.gdocs import GDocsConfig, GDocsResource
from mirage.resource.ram import RAMResource
from mirage.resource.s3 import S3Config, S3Resource
from mirage.resource.slack import SlackConfig, SlackResource

ws = Workspace({
    "/data":  RAMResource(),
    "/s3":    S3Resource(S3Config(bucket="my-bucket")),
    "/slack": SlackResource(SlackConfig()),
    "/docs":  GDocsResource(GDocsConfig()),
})

await ws.execute("cp /s3/report.csv /data/report.csv")
await ws.execute("grep alert /s3/data/log.jsonl | wc -l")
ws.snapshot("demo.tar")
```

TypeScript example:

```ts
import { Workspace, RAMResource, S3Resource, SlackResource, GitHubResource } from '@struktoai/mirage-node';

const ws = new Workspace({
  '/data':   new RAMResource(),
  '/s3':     new S3Resource({ bucket: 'logs' }),
  '/slack':  new SlackResource({}),
  '/github': new GitHubResource({}),
});

await ws.execute('grep alert /slack/general/*.json | wc -l');
await ws.execute('cp /s3/report.csv /data/local.csv');
```

### Alternatives

**MCP (Model Context Protocol)** — Anthropic's protocol for connecting LLMs to external tools. MCP gives you fine-grained, schema-validated tool calls per service, which is more precise than Mirage's filesystem abstraction. Choose MCP when you need strict type safety and explicit tool definitions, especially for single-service integrations where the overhead of a virtual filesystem isn't justified.

**LangChain Toolkits** — LangChain's agent toolkit approach provides pre-built integrations for many services, but each tool has its own interface and parameters. Agents need to learn each toolkit's API individually. Mirage's advantage is the unified interface; LangChain's advantage is maturity and a larger community. Choose LangChain toolkits when you need battle-tested integrations and don't mind the per-tool learning curve.

**Direct SDK Integration** — Building agent-tool connections with native SDKs (aws-sdk, @slack/bolt, @octokit/rest) gives you full API access and maximum control. It's the right choice for simple, single-service agents where the integration code is minimal. Mirage wins when you're composing across three or more services and want to avoid the N×M integration complexity.

### Verdict

Mirage is the most interesting agent infrastructure tool I've seen in recent months. The core idea — make every backend look like a filesystem so agents can use bash, the language they're most fluent in — is elegant and solves a real pain point. At 3,000 stars in under a month with active development from Strukto AI, the momentum is there. The dual Python/TypeScript SDK and broad framework support mean you can adopt it incrementally without rewriting your agent stack. It's early, and the abstraction has limits for complex service-specific operations, but for multi-service agent workflows — which is where most interesting agent applications are heading — Mirage is worth building on today.
