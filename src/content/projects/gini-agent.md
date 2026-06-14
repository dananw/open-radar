---
name: gini-agent
description: "Gini Agent is an open-source personal AI agent with persistent memory, self-learning, and a Bun+Next.js runtime — the agent that actually remembers."
url: https://github.com/Lilac-Labs/gini-agent
stars: 386
forks: 89
language: TypeScript
tags: ["ai-agent", "memory", "bun", "nextjs", "personal-agent"]
featured: false
publishedAt: 2026-06-15
---

## Gini Agent

### Overview

Gini Agent is an open-source personal AI agent that remembers what you tell it, learns from repeated interactions, and runs entirely on your machine. It hit 386 GitHub stars within six weeks of its May 2026 launch, with 89 forks — a healthy ratio that suggests people are actually building on it, not just bookmarking.

The project comes from Lilac Labs, and its lineage matters. Gini evolved from OpenClaw, an earlier personal agent framework that gained a cult following for its "agent that takes initiative" approach. The team identified what worked (persistent memory, local-first architecture) and what didn't (debugging gateways, repetitive task teaching), then rebuilt the runtime from scratch. The whitepaper is refreshingly honest about the gaps they're closing: most agents store facts but can't reliably retrieve them, and "learning" usually means a long autocomplete rather than genuine adaptation.

The core problem Gini solves is the amnesia problem in personal AI agents. ChatGPT forgets your context between sessions. Claude Code remembers your codebase but not your preferences. Coding agents can execute tasks but don't learn from repeated patterns. Gini treats the agent as a long-running runtime — not a chat session — with persistent state, memory embeddings, skill accumulation, and approval-gated tools. The Bun process owns everything: conversations, runs, tasks, approvals, memory, skills, jobs, tools, traces, and audit events. Your Next.js web app, CLI, mobile app, and MCP surfaces are all clients of the same authenticated API contract.

### Why it matters

The personal agent space is crowded but shallow. Most projects are thin wrappers around a single LLM provider with a chat interface bolted on. They demo well for five minutes and fall apart when you try to use them daily. The fundamental issue is architectural: these agents treat each conversation as isolated, with no durable state between sessions and no mechanism to improve over time.

Gini takes a different position. Its runtime-is-the-gateway architecture means a single Bun process owns all state and performs all work. The web UI, CLI, Expo mobile app, MCP surfaces, and messaging bridges are pure clients. This is closer to how a desktop operating system works than how a chatbot works, and it enables things other agents can't: parallel instances with isolated state, approval-gated tool execution, persistent memory with local embeddings and reranking, and a skill system where procedures you teach the agent today are procedures it owns next week.

For fullstack developers building on React, Next.js, or TypeScript, Gini is also a reference architecture. The stack — Bun runtime, Next.js + Tailwind + shadcn/ui control plane, MCP protocol support, local embeddings — is the same stack many of us are shipping in production. Studying how Gini handles state persistence, multi-client coordination, and approval workflows is useful even if you never run the agent itself.

### Key Features

**Runtime-Is-The-Gateway Architecture.** A single Bun process per instance owns state and performs work. The Next.js web app, CLI, Expo mobile app, MCP surfaces, and messaging bridges are all authenticated clients of the same `/api/*` contract. This eliminates the synchronization headaches that plague multi-process agent systems and makes parallel instances straightforward — each gets isolated state, ports, and logs.

**Persistent Memory with Local Embeddings.** Gini ships local embeddings, reranking, and voice-message speech-to-text by default. The memory system retains, recalls, and reviews information using embeddings stored locally — no third-party vector database required. The whitepaper is clear about the hard part: "Persisting text is solved. Deciding which facts matter for the current situation and bringing them in unprompted isn't." The memory docs describe retain, recall, embeddings, reranking, review, and storage as first-class concepts.

**Self-Learning Skills.** The agent doesn't just store procedures — it runs them against real situations, judges whether the result was right, and updates itself when it wasn't. A thing you teach the agent today is a thing the agent owns next week. This is the difference between "a long autocomplete" and actual learning, and it's the feature that makes Gini feel different from a chatbot.

**Multi-Provider Support.** Gini supports Codex OAuth, OpenAI, Azure OpenAI, DeepSeek, OpenRouter, Anthropic Claude (first-party API), Amazon Bedrock (model-agnostic Converse with AWS SigV4), and any OpenAI-compatible local server (oMLX, vLLM, LM Studio, llama.cpp). The provider system is configured via CLI with `gini provider set`, and API keys are read from environment variables — nothing is written to Gini config.

**Approval-Gated Tools.** File operations, terminal commands, and code tools require explicit approval before execution. This is a deliberate design choice: the agent can propose actions, but you maintain control over what actually happens. The `gini approvals` command shows pending requests. For developers who've watched coding agents delete files or run destructive commands, this guardrail is essential.

**Parallel Instances.** Each instance has isolated state, ports, and logs. Run `gini --instance sandbox run` for an ephemeral test instance, or `gini smoke` for a throwaway under `/tmp`. Multiple agents can run smoke tests concurrently without colliding. The instance is derived from the directory basename when running from source, so each worktree gets its own state automatically.

**OpenClaw Migration Path.** Already running OpenClaw? Gini can import agents, chat history, memory, skills, workspace files, and messaging bridges in two steps: `gini import plan openclaw` (dry-run) and `gini import apply openclaw` (mutate state). Every import archives the full OpenClaw state to a zip file first, so nothing is lost. This shows the team understands that adoption depends on migration, not just features.

### Use Cases

- **Daily driver for developers** who want an AI assistant that remembers project context, coding preferences, and past decisions across sessions without re-explaining everything each time.
- **Automation hub** for running scheduled jobs, multi-step workflows, and approval-gated tasks — the agent queue and runs system handles work that's larger than a single chat turn.
- **Multi-model experimentation** — switch between Claude, GPT-5.5, DeepSeek, and local models without changing your workflow. The provider system makes model swapping a CLI command, not a code change.
- **Reference architecture** for fullstack developers building their own AI-powered applications with Bun, Next.js, and MCP. The gateway/client pattern, state persistence, and approval system are reusable design patterns.
- **Team agent infrastructure** with parallel instances — run separate agents for different projects or team members, each with isolated state and memory.

### Pros and Cons

Pros:
- Local-first architecture means your data stays on your machine. No cloud sync, no third-party uptime dependency, no subscription fees beyond your LLM provider costs.
- The runtime-is-the-gateway pattern is genuinely novel in the personal agent space. Most competitors are either cloud-first or chat-first; Gini is runtime-first.
- Multi-provider support including Amazon Bedrock and Azure OpenAI makes it viable for enterprise teams, not just individual developers.
- The OpenClaw migration path and honest whitepaper suggest a team that understands real-world adoption barriers.

Cons:
- Bun runtime requirement limits deployment options. If your infrastructure is Node.js-only, adding Bun is a non-trivial dependency.
- macOS gets the polished experience (autostart via LaunchAgents, per-user daemons). Linux support works but autostart is macOS-only as of mid-June 2026.
- Messaging bridges (Telegram, Discord) exist but are explicitly "not being actively worked on." The team recommends the web app and iOS app as primary surfaces.
- 386 stars is respectable but the community is still forming. Documentation is thorough (whitepaper, ADRs, architecture docs) but third-party tutorials and integrations are sparse.

### Getting Started

```bash
# One-line install (macOS and Linux)
curl -fsSL https://raw.githubusercontent.com/Lilac-Labs/gini-agent/main/scripts/install.sh | bash

# Or install from source
git clone https://github.com/Lilac-Labs/gini-agent.git
cd gini-agent
bun install
bun run gini install
bun run gini start

# Configure a provider
gini provider set openai gpt-5.4-mini      # uses $OPENAI_API_KEY
gini provider set anthropic claude-opus-4-8  # uses $ANTHROPIC_API_KEY
gini provider set codex gpt-5.5             # Codex OAuth

# Check status
gini status

# Start chatting
gini chat new

# Review pending tool approvals
gini approvals
```

The web UI opens at `http://127.0.0.1:7777` and the runtime API at `http://127.0.0.1:7778`. Run `gini --help` for the full CLI surface.

### Alternatives

**Hermes Agent** — A leaner personal agent from Nous Research that focuses on skill-based automation and cron jobs. Hermes has a larger community and more mature plugin ecosystem, but its memory system is file-based rather than embedded. Choose Hermes if you want a broader skill marketplace and don't need Gini's runtime-first architecture.

**OpenClaw** — Gini's predecessor. OpenClaw pioneered the "agent that takes initiative" approach with memory files and a simple loop. It's lighter weight but lacks Gini's structured state persistence, approval system, and multi-client architecture. Choose OpenClaw if you want something minimal and don't mind re-teaching procedures.

**Claude Code / Codex CLI** — The coding agent CLIs from Anthropic and OpenAI are excellent for code generation and editing, but they're session-based tools, not persistent agents. They don't remember your preferences across sessions or learn from repeated interactions. Choose them for focused coding tasks; choose Gini for a persistent agent that lives across your entire workflow.

### Verdict

Gini Agent is the most thoughtfully designed personal agent runtime I've seen in the open-source space. The whitepaper reads like it was written by someone who actually used OpenClaw daily and got frustrated by its limitations, which is exactly what happened. The runtime-is-the-gateway architecture, persistent memory with local embeddings, and self-learning skill system address the three biggest gaps in current personal agents: amnesia, repetition, and interface mismatch. At 386 stars with 89 forks in six weeks, it's gaining traction at a pace that suggests real utility, not hype. The main risk is Bun adoption — if your stack is committed to Node.js, that's a friction point. But for developers already on the Bun/Next.js stack or willing to try it, Gini is worth setting up as your daily driver. The approval-gated tools alone make it safer than most coding agents for production work.
