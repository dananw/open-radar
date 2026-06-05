---
name: zerostack
description: "Zerostack is a minimal Rust coding agent with 16MB RAM footprint, multi-provider LLM support, persistent memory, and subagents — a lightweight Claude Code alternative."
url: https://github.com/gi-dellav/zerostack
stars: 1107
forks: 75
language: Rust
tags: ["coding-agent", "rust", "ai-agents", "developer-tools", "cli"]
featured: false
publishedAt: 2026-06-05
---

## Zerostack

### Overview

Zerostack is a minimal coding agent written in Rust that uses 16MB of RAM on average and ships as a 26MB binary. For context, OpenCode and other JavaScript-based coding agents typically consume 300MB with peaks near 700MB. That's not a marginal improvement — it's a 20x reduction in memory footprint that changes where and how you can run an AI coding agent.

The project was created by gi-dellav and first appeared on GitHub in May 2026, inspired by Pi and OpenCode. In under a month it crossed 1,100 stars, which suggests developers are actively looking for coding agent options that don't require a beefy machine. The project includes blog posts documenting its memory design and subagent architecture, which is a good sign of thoughtful engineering rather than a weekend hack.

The core problem Zerostack solves is resource overhead. Most coding agents are built on Node.js or Python runtimes that bring significant memory and CPU baggage. Zerostack compiles to a single static binary with zero non-stdlib runtime dependencies. CPU usage sits at 0% on idle and around 1.5% when actively using tools, compared to 2% idle and 20% working for JavaScript-based alternatives. If you're running a coding agent on a laptop, a VM, or alongside other resource-intensive development tools, those numbers matter.

### Why it matters

The coding agent space exploded in 2025 and 2026. Claude Code, Cursor, Windsurf, OpenCode, Codex — developers have more options than ever. But most of these tools share a common trait: they're resource-hungry. Running Claude Code alongside your IDE, browser, and local dev servers can push a 16GB laptop to its limits. Zerostack offers a different tradeoff: sacrifice none of the core features while dramatically reducing the resource cost.

The Rust implementation isn't just about speed. It enables features that would be awkward in interpreted languages — like a compile-time feature flag system that lets you opt into MCP support, ACP (Agent Communication Protocol) for editor integration, memory persistence, or multi-threaded subagents. You build only what you need. This is the kind of systems-level thinking that's been missing from the coding agent ecosystem.

There's also a philosophical angle. Zerostack is GPL-3.0 licensed and fully open source, with no cloud service, no telemetry, and no vendor lock-in. You point it at any LLM provider — OpenRouter, OpenAI, Anthropic, Gemini, Ollama, or a custom endpoint — and it works. In a market where every tool is racing to become a platform, Zerostack stays a tool.

### Key Features

**Multi-Provider LLM Support.** Zerostack works with OpenRouter, OpenAI, Anthropic, Gemini, Ollama, and custom providers out of the box. You're not locked into a single vendor or pricing model. Switch between DeepSeek for cost-efficient bulk work and Claude for complex reasoning without changing tools.

**Persistent Memory System.** The optional memory feature (enabled via compile-time flag) maintains a global MEMORY.md plus per-project daily logs, a scratchpad, and notes. These are injected into the system prompt each session, giving the agent continuity across conversations. This addresses one of the biggest complaints about coding agents — they forget everything between sessions.

**Subagent Architecture.** Zerostack can spawn parallel subagents for codebase exploration. Instead of one agent sequentially reading files, multiple subagents fan out to search, grep, and analyze different parts of your project simultaneously. There's also an experimental multi-threaded subagent mode for even faster parallelism.

**Permission System with Five Modes.** The permission system offers restrictive, readonly, guarded, standard, and yolo modes, each with configurable per-tool patterns and session allowlists. This is more granular than most coding agents provide. You can run in guarded mode for production codebases and yolo mode for throwaway experiments.

**Built-in Prompt Modes.** Ten system prompt modes (code, plan, review, debug, ask, brainstorm, frontend-design, review-security, simplify, write-prompt) change the agent's behavior and tool access for different tasks. The frontend-design mode is particularly useful for fullstack developers — it's tuned for producing distinctive, production-grade UI code rather than generic output.

**ACP and Editor Integration.** The Agent Communication Protocol support lets editors like Zed connect to Zerostack as an ACP agent. This positions Zerostack as a backend brain for editor-integrated AI, not just a standalone terminal tool.

**Sandbox Mode.** Using bubblewrap or zerobox as a backend, Zerostack can run every bash command in an isolated environment. This protects your system from accidental damage when the agent proposes shell commands, which is a real concern when agents have filesystem access.

### Use Cases

- **Resource-constrained development environments** — Running a coding agent on a laptop with 8-16GB RAM alongside Docker, IDE, and browser. Zerostack's 16MB footprint makes it viable where other agents cause swapping.
- **CI/CD pipeline integration** — Using Zerostack in automation scripts where you need an AI coding agent but can't justify allocating 500MB+ of RAM per instance. The single-binary distribution makes containerization trivial.
- **Multi-project workflows** — Developers juggling multiple codebases who need persistent memory per project. The daily logs and scratchpad maintain context without manual session management.
- **Security-conscious teams** — Organizations that need a coding agent with no telemetry, no cloud dependency, and a granular permission system. The sandbox mode adds another layer of protection.
- **Fullstack development with frontend focus** — The frontend-design prompt mode and MCP support make it practical for React and component-library work where generic AI output doesn't cut it.

### Pros and Cons

Pros:
- Dramatically lower resource usage than any comparable coding agent. 16MB RAM and 0% idle CPU are real numbers measured against JS-based alternatives running 300MB+.
- Compile-time feature flags mean you build exactly the binary you need. No unused MCP servers, no dormant memory systems eating resources.
- True multi-provider support with no vendor lock-in. Works with any OpenAI-compatible API endpoint, including local Ollama instances.

Cons:
- GPL-3.0 license may be a problem for some organizations. If you're building internal tools that link against or embed Zerostack, the copyleft requirement applies.
- Only 5 open issues and a young project (May 2026) means the API surface is still settling. Expect breaking changes as features stabilize.
- Windows support is explicitly untested. If your team develops on Windows, this isn't ready yet.

### Getting Started

```bash
# Install via Cargo (requires Rust toolchain + git)
cargo install zerostack

# With optional features
cargo install zerostack --features memory,multithread,acp

# Set your API key (OpenRouter is the default provider)
export OPENROUTER_API_KEY="your-key-here"

# Start an interactive session
zerostack

# One-shot mode for quick questions
zerostack -p "Explain the architecture of this project"

# Continue the last session
zerostack -c

# Use a specific provider and model
zerostack --provider anthropic --model claude-sonnet-4-20250514

# Run in guarded mode (asks before writes/edits/bash)
zerostack --guarded

# Interactive configuration
# Inside zerostack, run:
/prompt autoconfig
```

### Alternatives

**Claude Code** — Anthropic's official coding agent is the most polished option with first-class Claude model integration. It's significantly heavier on resources and requires an Anthropic API key or Claude Pro subscription. Choose Claude Code when you want the tightest possible integration with Claude's capabilities and don't mind the resource cost.

**OpenCode** — An open-source coding agent with a similar feature set (multi-provider, MCP, TUI). OpenCode is written in Go, making it lighter than JS-based alternatives but heavier than Zerostack. It has a larger community and more battle-tested releases. Choose OpenCode when you want a middle ground between features and resource usage with a more mature project.

**Aider** — A terminal-based AI pair programmer that's been around longer and supports more LLM providers. Aider is Python-based and focuses on git-integrated code editing rather than full agent capabilities. Choose Aider when you want a proven tool for code editing tasks and don't need subagents, persistent memory, or the full agent workflow.

### Verdict

Zerostack is the most resource-efficient coding agent I've seen, and the Rust implementation gives it real engineering advantages beyond just speed. The 16MB RAM footprint isn't a marketing number — it's a structural consequence of choosing Rust over Node.js, and it opens up use cases (CI pipelines, lightweight VMs, concurrent instances) that heavier agents can't serve. The project is young and the small issue count (5 open) reflects that, but the architecture is solid and the feature set is surprisingly complete for a month-old project. If you're a fullstack developer who runs multiple tools simultaneously and your laptop fans spin up every time you launch a coding agent, Zerostack is worth trying today. The GPL-3.0 license is the main thing to check before adopting it in a corporate setting.
