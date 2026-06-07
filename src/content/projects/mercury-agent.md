---
name: mercury-agent
description: "Mercury is a soul-driven AI agent with permission-hardened tools, token budgets, and multi-channel access — CLI, Telegram, and Web — all backed by persistent Second Brain memory."
url: https://github.com/cosmicstack-labs/mercury-agent
stars: 2576
forks: 266
language: TypeScript
tags: ["ai-agent", "typescript", "cli", "telegram", "developer-tools"]
featured: false
publishedAt: 2026-06-08
---

## Mercury Agent

### Overview

Mercury Agent hit 2,500 GitHub stars in under two months after its April 2026 launch, which says a lot about how hungry developers are for an AI agent framework that actually respects boundaries. Built by Cosmic Stack, it's a TypeScript-based AI agent that runs 24/7 across CLI, Telegram, and Web — with a permission system that asks before it acts and a memory system that remembers what matters.

The core idea is "soul-driven" architecture. Your agent's personality isn't hardcoded into some corporate wrapper. It's defined by markdown files you own — `soul.md`, `persona.md`, `taste.md`, `heartbeat.md`. This matters because most AI agents today either have no personality or have one imposed by the platform. Mercury lets you define how your agent thinks, responds, and prioritizes, then backs that up with a structured memory system (SQLite + FTS5) that automatically extracts, stores, and recalls facts about you across conversations.

The problem Mercury solves is specific: existing AI agent frameworks either give the agent too much power (running arbitrary commands silently) or too little (requiring constant human oversight for trivial tasks). Mercury's permission-hardened approach — with folder-level read/write scoping, a shell blocklist that prevents `sudo` and `rm -rf /`, and configurable approval flows — finds a middle ground. You get an agent that can actually do things without worrying it'll nuke your filesystem at 3am.

### Why it matters

The AI agent space in 2026 is crowded, but most frameworks share the same blind spot: they're designed for demos, not for running in production on your actual machine. Mercury is built for the "always-on" use case — the agent that monitors your project, schedules recurring tasks, responds to Telegram messages while you're away, and maintains context across weeks of interaction. That's a fundamentally different design challenge from a one-shot chatbot.

What makes Mercury stand out from the pack is the combination of three things that rarely coexist: security (permission-hardened tools with explicit approval flows), persistence (Second Brain memory with auto-extraction, conflict resolution, and auto-pruning), and accessibility (multi-channel access through CLI, Telegram, and a React Web dashboard). Most agent frameworks nail one of these. Mercury attempts all three, and the 2,500-star traction suggests developers are responding to that approach.

The token budget system is another forward-looking feature. Mercury enforces daily token limits, auto-compresses context when usage hits 70%, and provides a `/budget` command for real-time monitoring. As LLM costs remain a real concern for developers running agents continuously, this kind of built-in cost control isn't a luxury — it's a requirement.

### Key Features

**Permission-Hardened Tool System.** Mercury ships with 31 built-in tools covering filesystem, shell, git, web, messaging, and scheduling operations. Every tool that touches the outside world goes through a permission system with two modes: "Ask Me" (explicit approval for each action) and "Allow All" (trusted mode). The shell blocklist prevents dangerous commands from ever executing, and folder-level scoping lets you restrict file access to specific directories. This is the most principled permission model I've seen in an open-source agent framework.

**Second Brain Memory.** The SQLite-backed memory system supports 10 memory types — identity, preference, goal, project, habit, decision, constraint, relationship, episode, and reflection. After each conversation, Mercury automatically extracts 0-3 facts with confidence, importance, and durability scores. Before each message, the top 5 matching memories (capped at 900 characters) are injected into context. Auto-consolidation runs every 60 minutes, building profile summaries and generating reflections from patterns. All data stays local in `~/.mercury/memory/`.

**Multi-Channel Access.** Run Mercury from the CLI with an Ink TUI interface, interact via Telegram with HTML formatting and editable streaming messages, or use the React Web dashboard at `localhost:6174` with SSE streaming, Kanban boards, and a Workspace IDE. In daemon mode, Telegram becomes the primary channel — the agent runs in the background and responds to messages around the clock.

**Token Budget Enforcement.** Daily token budgets with real-time tracking. Mercury auto-compresses context when usage exceeds 70% of the budget. The `/budget` command shows current usage, lets you reset counters, or override for a single request. Per-card token tracking on Kanban boards with auto-pause when budgets are exhausted. This is essential for developers running agents continuously without surprise API bills.

**Daemon Mode with Crash Recovery.** One command (`mercury up`) installs a system service, starts the background daemon, and ensures the agent is always running. Crash recovery with exponential backoff (up to 10 restarts per minute). Auto-start on boot via macOS LaunchAgent, Linux systemd user unit, or Windows Task Scheduler. The daemon manager handles PID files, watchdog monitoring, and log rotation.

**Extensible Skills System.** Install community-contributed skills from the registry at `skills.mercuryagent.sh` with a single command. The registry currently hosts 126+ skills across categories like AI/ML, productivity, and development. Skills can be scheduled as recurring tasks and are treated identically to built-in capabilities. Based on the Agent Skills specification, so skills are portable across compatible frameworks.

**Provider Fallback Chain.** Configure multiple LLM providers (DeepSeek, OpenAI, Anthropic, Grok, Ollama local/cloud) and Mercury tries them in order on failure. It remembers the last successful provider and starts there on the next request. The default is DeepSeek for cost-effectiveness, but you can set any provider as primary. This eliminates the single-provider dependency that makes other agents fragile.

### Use Cases

- **24/7 project assistant** — Run Mercury in daemon mode to monitor your codebase, answer questions via Telegram while you're away, and maintain context across days or weeks of development. The Second Brain memory means it remembers your project decisions and preferences without re-explaining.

- **Automated task scheduling** — Use cron expressions to schedule recurring tasks like code reviews, documentation updates, or monitoring checks. Mercury processes Kanban cards autonomously, updating status and leaving result comments.

- **Multi-developer team agent** — Telegram's organization access model with admin/member roles lets a team share a single Mercury instance. Each developer gets personalized responses based on their conversation history and memory.

- **Local-first AI coding assistant** — With Ollama local support, Mercury runs entirely on your machine with no data leaving your network. The Workspace IDE mode in the web dashboard provides a coding-focused interface with Plan and Execute modes.

- **Cost-controlled experimentation** — The token budget system makes Mercury safe for experimenting with AI agents without worrying about runaway API costs. Set a daily budget, monitor usage, and adjust as needed.

### Pros and Cons

Pros:
- The permission system is genuinely thoughtful — folder-level scoping, shell blocklists, and configurable approval flows mean you can trust the agent on your actual machine, not just in a sandboxed demo.
- Second Brain memory with 10 types, auto-extraction, conflict resolution, and auto-pruning is the most sophisticated local memory system in any open-source agent framework I've reviewed.
- Multi-channel access (CLI, Telegram, Web) with daemon mode means the agent is actually useful as a persistent assistant, not just a one-shot chatbot.
- Token budget enforcement with per-task tracking addresses a real pain point for developers running agents continuously.

Cons:
- 32 open issues and the project is barely two months old — expect breaking changes and rough edges, especially in the daemon mode and Telegram integration.
- The skill registry has 126+ skills but they're community-contributed and unaudited. Installing random skills on a permission-hardened agent creates a trust paradox.
- Provider support is currently limited to DeepSeek, OpenAI, Anthropic, Grok, and Ollama. No Google Gemini or Mistral support yet, though it's on the roadmap.
- The "soul-driven" personality system (markdown files defining agent behavior) is novel but unproven — it's unclear how well it scales across diverse use cases without manual tuning.

### Getting Started

```bash
# One-liner install (macOS/Linux, no Node.js required)
curl -fsSL https://mercuryagent.sh/install.sh | sh

# Or via npm if you have Node.js 20+
npx @cosmicstack/mercury-agent

# Or install globally
npm i -g @cosmicstack/mercury-agent
mercury

# First run triggers the setup wizard (name, provider, optional Telegram)
# After setup, start the daemon for 24/7 operation
mercury up

# Check status
mercury status

# Install a skill from the registry
mercury skills install ai-ml/prompt-engineering

# Open the web dashboard
# Visit http://127.0.0.1:6174 (enable during setup with `mercury doctor`)
```

Configure your LLM provider in `~/.mercury/.env`:

```bash
# Add at least one provider key
DEEPSEEK_API_KEY=your-key-here
# or
OPENAI_API_KEY=your-key-here
# or
ANTHROPIC_API_KEY=your-key-here
```

### Alternatives

**Hermes Agent** — A more established AI agent framework with broader provider support and a larger ecosystem. Hermes focuses on skill-based extensibility and cron scheduling, while Mercury emphasizes permission hardening and persistent memory. Choose Hermes if you need production-ready stability and a mature plugin ecosystem; choose Mercury if security boundaries and Second Brain memory are your priorities.

**Claude Code / Codex CLI** — Anthropic's and OpenAI's native coding agents are more polished for pure code generation tasks but lack Mercury's multi-channel access, persistent memory, and daemon mode. They're better for focused coding sessions; Mercury is better for always-on assistance across channels.

**Open Interpreter** — A simpler approach to AI agent interaction that gives the model direct shell access. More permissive by design, which makes it faster for ad-hoc tasks but riskier for continuous operation. Mercury's permission system trades some convenience for safety, which matters when the agent runs 24/7 on your machine.

### Verdict

Mercury Agent is the most interesting open-source AI agent framework I've seen since the current wave of agent tools started. The combination of permission-hardened tools, Second Brain memory, and multi-channel daemon mode addresses real problems that other frameworks either ignore or solve with workarounds. At 2,500 stars in under two months with active development (the lead maintainer is pushing commits daily), it has genuine momentum. The project is young and has rough edges — the skill registry needs auditing, provider support needs expansion, and the daemon mode needs more battle-testing. But if you're a developer who wants an AI agent that runs persistently on your machine, respects security boundaries, and actually remembers context across conversations, Mercury is worth building with today. The token budget system alone makes it safer to experiment with than most alternatives.
