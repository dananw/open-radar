---
name: wayland
description: "Wayland is a local-first desktop AI agent that orchestrates Claude Code, Codex, Gemini, and 12+ AI CLIs from one unified command center — no cloud, no subscriptions."
url: https://github.com/FerroxLabs/wayland
stars: 194
forks: 39
language: TypeScript
tags: ["ai-agents", "developer-tools", "local-first", "typescript", "cli"]
featured: false
publishedAt: 2026-06-08
---

## Wayland

### Overview

Wayland is a local-first desktop AI agent that does something most developers have been silently wishing for: it unifies every AI coding CLI on your machine into a single command center. Claude Code, OpenAI Codex, Gemini CLI, Qwen, Goose — Wayland drives them all from one interface, on your own keys, with your files staying local. The project launched on GitHub on June 5, 2026, and pulled 194 stars and 39 forks in its first two days.

The project comes from FerroxLabs, and the initial commit is a squashed release (v0.9.6-rc.1) by Sean Donahoe. That single commit contains 17MB of TypeScript code plus Shell, CSS, and Python — this was clearly developed privately before going public. The codebase includes a Rust-based engine binary (47 MB), 5 memory partitions backed by SQLite, 25 channels, 177 workflows, and over 2,000 capabilities indexed in a skills library. The AGPL-3.0 license means you can use it freely but modifications must be shared back.

The core problem Wayland solves is AI CLI fragmentation. If you're a fullstack developer in 2026, you probably use at least two or three AI coding tools — maybe Claude Code for architecture discussions, Codex for code generation, and Gemini for research. Each one has its own CLI, its own context window, its own memory (or lack thereof). Switching between them means losing context, re-explaining your project, and juggling terminal sessions. Wayland treats all of these as team members under one manager, with shared memory and persistent state across sessions.

### Why it matters

The AI coding tool landscape in mid-2026 is fragmented in a way that actively hurts developer productivity. Claude Code, Codex, Gemini CLI, and a dozen others each solve part of the problem, but none of them talk to each other. You end up with a Claude session that knows your architecture, a Codex session that wrote your tests, and neither remembers what the other did. Wayland addresses this by sitting above all of them as an orchestrator.

For fullstack developers specifically, this is significant. You're building React frontends, NestJS or Django backends, maybe Go microservices — and you want the best AI for each task. Claude might be better at architectural reasoning, Codex at generating boilerplate, Gemini at researching APIs. Wayland lets you route tasks to the right model without losing context. Switch models mid-task. Keep a shared memory that persists across sessions. That's a real workflow improvement, not a gimmick.

The local-first architecture also matters more than people realize. Every AI coding tool that routes through a cloud service adds latency, creates a dependency on someone else's uptime, and raises questions about code privacy. Wayland runs entirely on your machine. Your files, your shell, your keys. You can go fully local with Ollama or reach for cloud models when you want to — but the orchestration layer never leaves your laptop. For developers working on proprietary codebases, that's not a nice-to-have. It's a requirement.

### Key Features

**Unified Agent Orchestration.** Wayland doesn't replace Claude Code or Codex — it drives them. The system acts as a meta-agent that can spawn, manage, and coordinate multiple AI CLIs simultaneously. You set a goal in plain language, and Wayland figures out which agent to delegate to, runs the work, and brings results back to a shared workspace. It's like having a project manager for your AI tools.

**Persistent Memory System.** The engine includes 5 memory partitions backed by SQLite, designed to retain context across sessions. Unlike individual CLIs that forget everything when you close them, Wayland remembers your project structure, past decisions, file locations, and conversation history. The memory system uses structured facts and context injection rather than simple chat history, which means it gets more useful the longer you use it.

**Self-Assembling Teams.** When a task is too big for a single agent, Wayland can spin up a team. A manager agent you talk to in plain language assembles the right specialists — maybe a code reviewer, a test writer, and a documentation generator — and they work against a shared blackboard until the task is done. You can keep a "Standing Company" on call for recurring work or create ad-hoc teams for one-off pushes.

**Native OS Sandboxing.** Security isn't an afterthought. Wayland runs shell commands inside native per-OS sandboxes — Landlock on Linux, sandbox-exec on macOS, AppContainer on Windows. Your AI agents can read and write files, but they do so within defined boundaries. This matters when you're giving an AI the ability to execute arbitrary code on your machine.

**Model Routing and Mid-Task Switching.** You're not locked into one model per session. Wayland supports routing tasks to the best-fit model and switching models mid-task without losing context. Start a code review with Claude, switch to Codex for implementation, use Gemini for research — the thread stays intact. This is the workflow most developers actually want but can't get from any single CLI.

**177 Built-in Workflows.** The skills library includes 177 pre-built workflows and over 2,000 indexed capabilities. These cover common development patterns like multi-file refactoring, test generation, documentation writing, and deployment automation. The engine can also rewrite and re-score its own skill prompts against an eval harness, getting sharper over time.

**Cron and Background Execution.** Put recurring tasks on a schedule and they run while you're away. Need to check for dependency updates every morning? Run security scans nightly? Generate status reports weekly? Wayland handles it through its cron system, with results waiting for you when you return.

### Use Cases

- **Multi-model development workflow** — You're building a fullstack app with React, NestJS, and PostgreSQL. Use Claude Code for architecture decisions, Codex for generating API endpoints, and Gemini for researching library compatibility — all from one interface without losing context between switches.

- **Large-scale refactoring** — A self-assembling team of specialists handles a multi-file refactor across your codebase. The manager agent plans the approach, specialist agents execute changes in parallel, and the shared blackboard prevents conflicts.

- **Automated code review pipeline** — Set up a cron job that runs AI-powered code review on every PR. Wayland orchestrates the review agents, collects feedback, and posts results without you touching a terminal.

- **Research and implementation** — Ask Wayland to research a new API, write integration code, generate tests, and create documentation as a single multi-step workflow. The persistent memory means the documentation agent knows exactly what the implementation agent built.

- **Learning and exploration** — Explore a new codebase by having Wayland read files, explain architecture, identify patterns, and build a mental model that persists across sessions. More useful than starting from scratch every time you open a new chat.

### Pros and Cons

Pros:

- Solves a real problem — AI CLI fragmentation is something every developer using multiple AI tools deals with daily. No other project has attempted this kind of meta-orchestration at this level of sophistication.

- Local-first architecture with native OS sandboxing means your code stays on your machine. For developers working with proprietary codebases, this eliminates the biggest objection to AI coding tools.

- The persistent memory system across 5 SQLite-backed partitions is genuinely useful. Most AI CLIs treat each session as disposable; Wayland compounds knowledge over time.

- 177 built-in workflows and 2,000+ indexed capabilities mean you're productive from day one rather than building everything from scratch.

- AGPL-3.0 license ensures the project stays open. Modifications must be shared back, which protects against proprietary forks.

Cons:

- Extremely early stage — v0.9.6-rc.1 with a single squashed commit and one visible contributor. The project was clearly developed privately, which means the community hasn't stress-tested the codebase yet.

- AGPL-3.0 is a strong copyleft license that some organizations won't allow. If you're building commercial tooling on top of Wayland, you need to understand the implications.

- The Rust engine binary is 47 MB and requires platform-specific builds. Installation isn't as simple as `npm install` — you need to download the right binary for your OS and architecture.

- macOS and Windows builds are not code-signed yet (as noted in the README). First launch requires manual security overrides, which will block less technical users.

- Single contributor visible on GitHub. For a project this ambitious, long-term maintenance is a real concern. One person maintaining a meta-agent that orchestrates 12+ AI CLIs is a lot of surface area.

### Getting Started

```bash
# Download the latest release for your platform
# Visit: https://github.com/FerroxLabs/wayland/releases/latest

# macOS: Download the .dmg for your architecture (Apple Silicon or Intel)
# Windows: Download the .exe installer
# Linux: Download the .deb package

# After installation, launch Wayland and add your API key
# The installer bundles the Wayland-Core engine — no separate setup needed

# To build from source (requires Node.js 18+ and Rust toolchain):
git clone https://github.com/FerroxLabs/wayland.git
cd wayland
npm install
npm run build

# Start the app
npm start
```

On first launch, Wayland will prompt you to add at least one provider key (Anthropic, OpenAI, Google, etc.). Once configured, you can start a Cowork session by describing your goal in plain language.

### Alternatives

**Claude Code** — Anthropic's official CLI for Claude. Excellent at code generation, architecture discussions, and multi-file editing. But it's a single-model tool — you can't route tasks to Codex or Gemini from within it. Choose Claude Code if you only use Claude and don't need orchestration across multiple AI providers.

**OpenAI Codex CLI** — OpenAI's terminal-based coding agent, strong at code generation and implementation tasks. Like Claude Code, it's single-model and doesn't share context with other tools. Choose Codex if your workflow is primarily OpenAI-based and you don't need the orchestration layer.

**Aider** — A popular open-source CLI that supports multiple LLM backends (Claude, GPT-4, local models) and has strong git integration. Aider is more mature than Wayland with a larger community, but it's focused on pair-programming with one model at a time rather than orchestrating multiple agents simultaneously. Choose Aider if you want a stable, well-tested multi-model coding assistant without the team orchestration complexity.

### Verdict

Wayland is the most interesting attempt at solving AI CLI fragmentation I've seen. The concept — one agent to rule them all, with persistent memory and native sandboxing — maps directly to how developers actually use AI tools in 2026. We don't use just one model. We use Claude for thinking, Codex for generating, Gemini for researching, and we lose context every time we switch. Wayland fixes that.

The risk is maturity. This is a v0.9.6 release candidate with a single squashed commit and one visible contributor. The codebase is substantial (17MB of TypeScript, 47MB engine binary), which suggests real engineering work, but the community hasn't validated it yet. The AGPL-3.0 license will also limit adoption in some corporate environments.

For early adopters and developers who live in their terminal, Wayland is worth trying now. The 194 stars in two days suggest I'm not the only one who thinks this is the right problem to solve. If FerroxLabs can build a community around it and ship stable releases, this could become the default way developers interact with multiple AI coding tools. That's a big "if," but the foundation looks solid.
