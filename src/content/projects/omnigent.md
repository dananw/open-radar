---
name: omnigent
description: "Omnigent is a meta-harness for AI agents — orchestrate Claude Code, Codex, Pi, and custom agents in one session with policies, sandboxing, and real-time collaboration."
url: https://github.com/omnigent-ai/omnigent
stars: 2399
forks: 288
language: Python
tags: ["ai-agents", "orchestration", "developer-tools", "llm", "python"]
featured: false
publishedAt: 2026-06-16
---

## Omnigent

### Overview

Omnigent is a meta-harness for AI coding agents. It sits on top of Claude Code, OpenAI Codex, Cursor, Pi, and any custom agent you define in YAML, giving you a single interface to run, swap, combine, and govern them. Five days after its June 11, 2026 launch, it already had 2,400 GitHub stars and 288 forks — a signal that developers are tired of juggling disconnected agent CLIs.

The project comes from the team behind what appears to be a serious infrastructure play in the AI developer tools space. The codebase is Apache 2.0 licensed, written in Python 3.12+, and ships with a macOS desktop app, a web UI, and a CLI. That breadth of delivery on day one suggests this wasn't built in a weekend.

The core problem Omnigent solves is fragmentation. In mid-2026, a typical developer might use Claude Code for complex refactors, Codex for quick tasks, Cursor for IDE-integrated work, and a custom agent for domain-specific jobs. Each has its own CLI, its own session model, its own configuration. There's no shared state, no unified policy layer, and no way to let agents collaborate. Omnigent collapses all of that into one server with a single session model.

### Why it matters

The AI coding agent space is exploding, but it's also splintering. Every major provider ships its own CLI and IDE integration, and developers are building custom agents for specific workflows at an accelerating pace. What's missing is the orchestration layer — the thing that lets you treat agents like composable tools rather than isolated silos.

Omnigent fills that gap with a design that feels inevitable in hindsight. It's not trying to replace Claude Code or Codex. It wraps them, preserves their native capabilities, and adds the governance and collaboration features that enterprise teams actually need. The policy system — where you can cap spend, require approval for shell commands, or limit tool access per agent — addresses the "agents doing scary things" concern that blocks adoption in regulated environments.

The real-time collaboration angle is equally important. Sharing a live agent session with a teammate, co-driving from different machines, or forking a conversation to branch your investigation — these are workflows that don't exist anywhere else right now. For teams evaluating AI agents in production, this kind of visibility and control is table stakes.

### Key Features

**Multi-Agent Orchestration.** Run Claude Code, Codex, Pi, and custom agents in the same session. Ask one agent to review another's work, or split a task across agents that are each good at different things. The included "Polly" example agent is a tech lead who plans, delegates coding work to sub-agents in parallel git worktrees, and routes diffs to reviewers from different vendors. This is agent collaboration, not just agent execution.

**YAML-Defined Custom Agents.** Define your own agents in a short YAML file — your prompt, your tools, and optional sub-agents. Agents can even build agents: describe what you want in any Omnigent chat and it writes the YAML for you. The executor field lets you swap the underlying harness (Claude SDK, Codex, Cursor, OpenAI Agents, Pi) without changing the agent definition.

**Policy and Governance Engine.** Policies check every agent action and either allow it, block it, or pause for human approval. They stack across three levels: server-wide (admin), per-agent (developer), and per-session (user), with stricter rules checked first. Built-in policies cover spend caps, tool call limits, and OS command approval. This is the feature that makes AI agents viable in enterprise settings.

**Cross-Device Sessions.** Sessions follow you across devices. Start in your terminal, continue in the browser, pick it up on your phone. Messages, sub-agents, terminals, and files stay in sync. The web UI is built for mobile. Deploy the server with Docker and your sessions become reachable from anywhere.

**Real-Time Team Collaboration.** Share a live session so teammates can watch your agent work and chat with it in real time. Co-drive: a teammate attaches to your running session and their messages execute on your machine. Fork: clone a conversation onto your own machine and continue independently. Multi-user accounts with invite-only signup and optional OIDC integration (Google, GitHub, Okta, Microsoft).

**Cloud Sandbox Execution.** Run sessions in disposable cloud sandboxes via Modal, Daytona, or Islo — no laptop required. The server can provision a sandbox per session as "managed hosts," so your development machine doesn't have to stay online. Combined with the policy engine, this creates a controlled environment for agent execution.

**Flexible Model Backend.** Works with first-party API keys, Claude/ChatGPT subscriptions (via their CLIs), any OpenAI- or Anthropic-compatible gateway (OpenRouter, LiteLLM, Ollama, vLLM, Azure), and Databricks workspace profiles. Defaults are per agent, so Claude and Codex credentials coexist. Switch models mid-session with the `/model` command.

### Use Cases

- **Multi-agent development workflows** — Use Claude Code for complex architecture decisions, Codex for implementation, and a custom agent for code review, all orchestrated in one session with shared context.
- **Enterprise AI governance** — Enforce spend caps, require approval for risky operations, and limit tool access per agent or per session. Essential for teams deploying agents in regulated environments.
- **Remote team pair programming** — Share a live agent session with a teammate across the world. Co-drive, fork, and watch each other's agents work in real time without screen sharing.
- **Agent experimentation and comparison** — Run the same task through different agents (Claude vs Codex vs custom) and compare results side by side. The "Debby" example agent does exactly this with two LLM heads debating each other.
- **Headless agent execution** — Deploy the server, connect cloud sandboxes, and run agent sessions without any developer machine online. Useful for CI/CD pipelines, scheduled tasks, or background research agents.

### Pros and Cons

Pros:

- Solves a real, immediate problem: agent fragmentation. Every team using multiple AI coding tools today would benefit from this unification layer.
- The policy engine is genuinely useful, not just a checkbox feature. Three-level policy stacking with spend caps and tool approval addresses the primary blocker for enterprise agent adoption.
- Apache 2.0 license and active development (118 open issues in 5 days suggests rapid iteration and community engagement).
- The YAML agent definition is elegant — swap harnesses without rewriting agents, and let agents build agents for you.

Cons:

- Alpha status means the API surface is unstable. Five days old with 118 open issues means breaking changes are coming.
- Requires Python 3.12+, tmux, and bubblewrap (on Linux). The dependency chain is non-trivial compared to running Claude Code or Codex directly.
- The "meta-harness" abstraction adds a layer of indirection. Debugging issues that span Omnigent and the underlying agent CLI can be painful when things go wrong.
- Cloud sandbox providers (Modal, Daytona, Islo) are additional services to manage and pay for. The self-hosted story requires Docker and real infrastructure.

### Getting Started

```bash
# Install Omnigent (Python 3.12+ required)
curl -fsSL https://raw.githubusercontent.com/omnigent-ai/omnigent/main/scripts/install_oss.sh | sh

# Or install with uv/pip
uv tool install omnigent
# pip install "omnigent"

# Or with Homebrew on macOS
brew install omnigent-ai/tap/omnigent

# Set up credentials
omnigent setup

# Start a session (launches CLI + web UI at localhost:6767)
omnigent

# Run a specific agent
omnigent claude                    # Claude Code in a shareable session
omnigent codex                     # Codex
omnigent run examples/polly/       # Multi-agent orchestrator
omnigent run examples/debby/       # Two-headed brainstorming agent

# Run your own custom agent
omnigent run path/to/agent.yaml
```

Define a custom agent in YAML:

```yaml
name: my_reviewer
prompt: You are a senior code reviewer. Be thorough but constructive.
executor:
  harness: claude-sdk
tools:
  researcher:
    type: agent
    prompt: Search for relevant patterns and summarize.
```

### Alternatives

**Aider** — A terminal-based AI coding assistant that works with multiple LLMs (GPT-4, Claude, local models) and focuses on pair programming in your git repo. Aider is more mature and simpler to set up, but it's a single-agent tool with no orchestration, policy layer, or multi-user collaboration. Choose Aider if you want one AI pair programmer, not an agent platform.

**CrewAI** — A Python framework for building multi-agent systems where agents have roles, goals, and can delegate to each other. CrewAI focuses on agent-to-agent workflows and has a larger ecosystem of integrations. But it's a framework you code against, not a runtime you operate. Choose CrewAI if you're building agent pipelines in Python, not if you want to orchestrate existing agent CLIs with governance and collaboration.

**OpenHands (formerly OpenDevin)** — An open-source AI software engineering agent with a web UI, sandboxed execution, and support for multiple LLM backends. OpenHands is a more complete standalone agent, while Omnigent is an orchestration layer over existing agents. Choose OpenHands if you want one capable agent with a UI; choose Omnigent if you already use multiple agents and need to unify them.

### Verdict

Omnigent is the most interesting AI developer tool I've seen this month. The agent orchestration problem is real — I personally juggle Claude Code, Codex, and custom agents daily with zero shared state — and Omnigent's approach of wrapping rather than replacing is the right architectural bet. The policy engine alone makes it worth evaluating for any team deploying agents beyond the individual developer level. At five days old and alpha quality, it's not production-ready, and the 118 open issues confirm that. But the 2,400 stars in under a week tell the same story: developers have been waiting for this layer. If you're building with multiple AI agents in 2026, Omnigent deserves a spot on your radar.
