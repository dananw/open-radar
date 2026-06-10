---
name: pilotdeck
description: "PilotDeck is an open-source agent OS with WorkSpace isolation, white-box memory, and smart model routing — built by Tsinghua University and OpenBMB for long-running AI productivity tasks."
url: https://github.com/OpenBMB/PilotDeck
stars: 3113
forks: 331
language: TypeScript
tags: ["ai-agents", "productivity", "typescript", "mcp", "model-routing"]
featured: false
publishedAt: 2026-06-10
---

## PilotDeck

### Overview

PilotDeck is an open-source agent operating system built around the concept of "WorkSpaces" — isolated environments where each project gets its own file system, memory store, and skill set. Launched on May 22, 2026, it crossed 3,000 GitHub stars in under three weeks, which is a strong signal that developers are hungry for something beyond the "ask a question, get an answer" paradigm of current AI tools.

The project comes from serious pedigree. It's jointly developed by Tsinghua University's THUNLP lab (the same team behind ChatGLM and numerous NLP breakthroughs), ModelBest, OpenBMB, and AI9Stars. OpenBMB has a track record of shipping production-quality open-source AI tools — their MiniCPM and ToolBench projects have thousands of citations. This isn't a weekend hack from a YC startup. It's research-backed engineering from one of China's top AI labs.

The core problem PilotDeck tackles is deceptively simple: when you run multiple AI agent tasks in parallel — say, code review on one project, documentation generation on another, and a market research brief on a third — existing tools either share a single context pool (causing memory bleed) or require you to manually manage separate sessions. PilotDeck scopes everything per WorkSpace and adds three capabilities that matter for real productivity: white-box memory you can inspect and edit, smart routing that matches task complexity to model tier (saving up to 70% on token costs), and always-on background execution that keeps working after you walk away.

### Why it matters

The AI agent space is crowded, but most tools are optimized for single-session, single-task interactions. Claude Code, Cursor, and similar coding assistants are great for "write this function" or "debug this error." But when you shift to long-running, multi-project workflows — the kind of work that actually defines developer productivity — the cracks show fast. Memory is opaque, costs are unpredictable, and everything stops the moment you close the terminal.

PilotDeck addresses all three problems architecturally. The white-box memory system means you can see exactly what the agent remembers, edit entries that are wrong, and pin decisions that shouldn't drift. Smart routing detects task complexity and routes simple calls to cheaper models while reserving frontier models for hard problems — their benchmarks show a Sonnet 4.6 + MiniMax-M2.7 routing setup scoring 70.6 (beating a Sonnet-only setup at 69.1) at one-sixth the cost. And the always-on mode means agents can run monitors, discover tasks, and land results as files while you're offline.

For fullstack developers specifically, this fills a gap between IDE-integrated AI assistants and enterprise agent platforms. You get WorkSpace isolation (no context pollution between your React frontend and Go backend projects), MCP-native tool integration, and a Web UI that doesn't require a PhD to configure. The fact that it's TypeScript and uses React + Tailwind + shadcn/ui means the codebase is immediately approachable for web developers.

### Key Features

**WorkSpace-Level Isolation.** Every project gets its own sandboxed environment with dedicated files, memory, and skills. Running three agent tasks simultaneously no longer risks one project's context bleeding into another. The isolation is enforced at the data layer, not just the UI layer — retrieval queries are scoped to the active WorkSpace, so even vector similarity searches stay contained.

**White-Box Memory with Dream Mode.** Memory entries are fully visible: what was stored, when, and in which WorkSpace. You can edit, delete, or pin entries directly. The "Dream Mode" feature consolidates and optimizes memory during idle windows — think of it as garbage collection for agent knowledge — and supports one-click rollback if consolidation goes wrong. This is a significant improvement over black-box memory systems where you have no idea why the agent keeps hallucinating your API structure.

**Smart Routing and Cost Optimization.** Tasks are auto-classified by complexity. Simple operations like text polishing or formatting route to lighter models (e.g., Sonnet 4.5), while planning and architecture decisions go to frontier models (e.g., Opus 4.5). In their social-media workload benchmarks, this approach cut costs from $12.58 to $2.83 — an 77% reduction with no quality loss. The routing is configurable, so you can define your own model tiers.

**Always-On Background Execution.** PilotDeck breaks the synchronous request-response loop. After you sign off, agents continue discovering candidate tasks, running long-horizon monitors, and producing deliverables as local files. When you return, a summary report is waiting. This is particularly useful for overnight code analysis, documentation generation, or monitoring tasks that don't need human-in-the-loop oversight.

**MCP-Native Architecture.** The system has first-class support for the Model Context Protocol, meaning any MCP-compatible tool or server integrates directly. This opens up a huge ecosystem of existing tools — file system access, database queries, API calls — without custom integration code. The plugin system also supports lifecycle hooks (PreToolUse, UserPromptSubmit) for fine-grained control.

**Multi-Frontend Support.** PilotDeck works across Web UI, CLI, and IM (instant messaging) frontends. The Web UI is built with React, Tailwind, and shadcn/ui. CLI access enables scripting and automation. IM integration means you can interact with agents through WeCom or Feishu, bringing AI productivity into your team's existing communication channels.

**Open Plugin Architecture.** Extensions are defined via `plugin.json` with strict boundaries between the core and customization layers. You can register custom tools, pull community skills from ClawHub, intercept lifecycle events, or plug in your own memory store provider. The architecture is designed so the open-source core stays stable while plugins can iterate rapidly.

### Use Cases

- **Multi-project development workflows** — Manage separate WorkSpaces for your React frontend, NestJS API, and infrastructure code without context pollution between them
- **Long-running code analysis and documentation** — Run architecture analysis or doc generation overnight with always-on mode, collecting results as files by morning
- **Cost-optimized AI-assisted development** — Use smart routing to burn cheap tokens on boilerplate generation while reserving frontier models for complex architectural decisions
- **Team collaboration via IM** — Connect agents to WeCom or Feishu so non-technical team members can trigger AI workflows without leaving their chat app
- **Research and competitive analysis** — Deploy agents to gather, synthesize, and format market research into structured deliverables while you focus on other work
- **Automated content pipelines** — Use the MCP server and plugin system to build end-to-end content workflows from research to publication

### Pros and Cons

Pros:
- WorkSpace isolation solves real context pollution problems that plague every multi-project AI workflow. The scoped retrieval is architecturally sound, not a UI hack.
- Smart routing benchmarks are compelling — 70%+ cost savings with equal or better quality is hard to argue with. The routing is transparent and configurable.
- Backed by Tsinghua THUNLP and OpenBMB, which means the underlying NLP and agent research is rigorous. This isn't vibes-based engineering.
- MCP-native design means you're not locked into PilotDeck's tool ecosystem. Any MCP server works out of the box.

Cons:
- AGPL-3.0 license is restrictive for commercial use. If you're building a product that embeds PilotDeck, you need to either open-source your code or negotiate a commercial license.
- The project is less than a month old (launched May 22, 2026). API surface will change, documentation is still growing, and the community is young. Production use today is premature.
- Primary documentation and community channels skew heavily Chinese-language. English docs exist but are less comprehensive. International contributors may face friction.
- Requires Node.js 22 and has Git LFS dependencies for media assets, which adds setup complexity compared to simpler CLI tools.

### Getting Started

```bash
# Option A: One-line install (macOS/Linux)
curl -fsSL https://raw.githubusercontent.com/OpenBMB/PilotDeck/main/install.sh | bash

# Start the server
pilotdeck            # starts at http://localhost:3001
pilotdeck status     # check runtime status

# Option B: From source
git clone https://github.com/OpenBMB/PilotDeck.git
cd PilotDeck
npm install
cd ui && npm install && cd ..

# Configure your model provider (~/.pilotdeck/pilotdeck.yaml)
# Or configure visually in the Web UI settings panel

# Start in dev mode
cd ui && npm run dev     # http://localhost:5173

# Option C: Docker
docker compose up -d
```

Supported model providers include OpenAI, Anthropic, DeepSeek, Qwen, Kimi, MiniMax, and any OpenAI-compatible endpoint.

### Alternatives

**Claude Code** — Anthropic's CLI-based coding agent excels at single-session, code-focused tasks with deep reasoning. It's more polished for pure coding workflows but lacks WorkSpace isolation, multi-model routing, and background execution. Choose Claude Code when you need a focused coding session, not a persistent agent platform.

**OpenHands (formerly OpenDevin)** — An open-source AI agent platform focused on software development tasks with a web UI and sandboxed execution. OpenHands has stronger code execution safety (Docker-based sandboxes) but doesn't offer PilotDeck's smart routing or white-box memory. Better choice if sandboxed code execution is your primary concern.

**CrewAI** — A multi-agent orchestration framework that lets you define agent teams with specific roles and collaboration patterns. CrewAI is more flexible for custom multi-agent architectures but requires more setup and doesn't ship a UI or memory management system. Better for developers who want to build custom agent pipelines from scratch.

### Verdict

PilotDeck is the most thoughtful take on "agent as a productivity platform" I've seen in the open-source space. The WorkSpace isolation model alone solves a problem that every developer running multiple AI tasks encounters daily, and the smart routing benchmarks — 77% cost savings at equal quality — make a strong economic case for the approach. It's too new for production use, and the AGPL license will be a dealbreaker for some commercial applications. But if you're a developer who's been running multiple AI coding sessions in parallel and frustrated by context bleed, unpredictable costs, and the "everything stops when I close the terminal" problem, PilotDeck is worth installing and experimenting with now. The Tsinghua/OpenBMB backing suggests this isn't going to be abandoned in three months, and 3,000 stars in under three weeks indicates real community momentum.
