---
name: omnigent
description: "Omnigent is an open-source AI agent framework that orchestrates Claude Code, Codex, Cursor, and custom agents with policy enforcement and real-time collaboration."
url: https://github.com/omnigent-ai/omnigent
stars: 3811
forks: 425
language: Python
tags: ["ai-agents", "agent-framework", "orchestration", "developer-tools", "multi-agent"]
featured: false
publishedAt: 2026-06-19
---

## Omnigent

### Overview

Omnigent is an open-source AI agent framework and meta-harness that gives you a single orchestration layer over Claude Code, Codex, Cursor, Pi, and your own custom agents. It launched on June 11, 2026, and pulled in over 3,800 GitHub stars in its first week. That kind of velocity usually means the project hit a nerve.

The framework comes from the team at Omnigent AI, a small crew focused on solving the fragmentation problem in AI coding tools. Every major AI vendor ships its own agent — Claude Code, OpenAI Codex, Cursor's agent mode, Google's tools — and none of them talk to each other. You end up context-switching between terminals, losing state, and paying for overlapping subscriptions. Omnigent sits above all of them, treating each vendor's agent as a interchangeable harness you can swap, combine, or replace without rewriting anything.

The core problem it solves is agent governance at scale. When you have multiple AI agents running across a team, you need to control what they can do, how much they spend, and who approves risky actions. Omnigent's policy engine lets you set spend caps, tool access restrictions, and approval gates at three levels — server-wide, per-agent, and per-session. For teams deploying AI coding agents in production, this isn't optional. It's the difference between "we use AI tools" and "we have an AI agent strategy."

### Why it matters

The AI coding agent space is exploding. GitHub Copilot has over 1.8 million paying subscribers. Claude Code adoption is growing fast. OpenAI Codex is gaining traction. But most teams are using these tools in isolation — one person uses Claude Code, another uses Cursor, a third uses Codex. There's no shared context, no governance layer, no way to coordinate work across agents.

This fragmentation creates real problems. A developer might spend $50 on Claude Code in a morning without anyone noticing. An agent might push code to production without review. Two agents might work on the same file simultaneously and create merge conflicts. Omnigent addresses all of this with a unified session model, policy enforcement, and real-time collaboration features.

The broader trend is clear: AI agents are becoming team members, not just tools. And team members need management, permissions, and coordination. Omnigent is the first serious attempt at building that management layer for coding agents. The 3,800 stars in a week suggest developers have been waiting for exactly this.

### Key Features

**Meta-Harness Architecture.** Omnigent doesn't replace Claude Code or Codex — it wraps them. Each vendor's agent becomes a "harness" that Omnigent can launch, supervise, and coordinate. You define agents in YAML, specifying which harness to use, what tools they have, and what policies apply. Swap `harness: claude-sdk` for `harness: codex` and your agent runs on a different engine without changing anything else. This is the architectural insight that makes the whole thing work.

**Cross-Device Session Sync.** Start a session on your laptop in the terminal, continue it in the browser, pick it up on your phone. Messages, sub-agents, terminal output, and files stay in sync across devices. The web UI at localhost:6767 is built for mobile, so you can monitor and interact with running agents from anywhere on your network. For remote teams or developers who step away from their desks, this changes how you work with AI agents.

**Policy Engine with Three-Tier Governance.** Policies are the killer feature. Define rules at the server level (applies to everyone), agent level (applies to a specific agent), or session level (applies to your current session). Built-in policies include spend caps with soft warnings, tool access restrictions, and approval gates for risky actions like shell commands or file writes. A YAML config can cap an agent at $5 per session and require approval before running shell commands. This is enterprise-grade governance for AI agents.

**Real-Time Multi-User Collaboration.** Share a live session with teammates who can watch your agent work, chat with it, or co-drive it on your machine. Fork a conversation onto your own machine and continue independently. The collaboration model is similar to Google Docs but for AI agent sessions — multiple people can interact with the same agent in real time. For pair programming with AI, this is a significant improvement over everyone running their own isolated sessions.

**Cloud Sandbox Execution.** Run agent sessions in disposable cloud sandboxes from Modal, Daytona, or Islo without keeping your laptop online. The server can provision a sandbox per session (managed hosts), so agents continue working even when you close your laptop. This is critical for long-running tasks like refactoring large codebases or running test suites that take hours.

**YAML-Based Agent Definition.** Define custom agents in short YAML files — your prompt, your tools, and optional sub-agents a supervisor can delegate to. Agents can even build other agents: describe what you want in any Omnigent chat and it authors the YAML for you. The included examples — Polly (a multi-agent coding orchestrator) and Debby (a dual-model brainstorming partner) — show what's possible with just a few dozen lines of configuration.

**Multi-Model Credential Management.** Works with API keys, Claude/ChatGPT subscriptions, any OpenAI- or Anthropic-compatible gateway (OpenRouter, Ollama, vLLM, Azure), and Databricks workspaces. Defaults are per-agent, so you can run Claude Code with an Anthropic key and Codex with an OpenAI subscription simultaneously. Switch models mid-session with the `/model` command.

### Use Cases

- **Multi-agent code review pipelines** — Have Claude Code write code, Codex review it, and a custom agent run tests, all in a single coordinated session with automatic handoffs between agents.
- **Team-wide AI agent governance** — Set organization-wide spend caps and approval policies so no developer accidentally burns through the AI budget, while still giving everyone access to the tools they need.
- **Remote pair programming with AI** — Share a live agent session with a teammate across the world. Both of you can interact with the agent, see its terminal output, and co-drive decisions in real time.
- **Long-running refactoring tasks** — Launch an agent in a cloud sandbox to refactor a large codebase overnight. Check progress from your phone in the morning without keeping your laptop running.
- **Agent experimentation and comparison** — Run the same task through Claude Code and Codex side by side, comparing outputs and costs before committing to a vendor for your team.

### Pros and Cons

Pros:
- The meta-harness design is genuinely novel — no other tool lets you orchestrate multiple AI coding agents from different vendors in a single session with shared context and policies.
- The policy engine fills a real gap. Teams deploying AI agents need governance, and Omnigent's three-tier model is more sophisticated than anything the individual vendors offer.
- Cross-device sync and real-time collaboration make this feel like a team tool, not a solo developer toy. The mobile web UI is surprisingly usable.
- Apache 2.0 license and active development (the repo has hundreds of commits in its first week) suggest serious long-term commitment.

Cons:
- Alpha status means the API is unstable. The YAML spec, policy system, and harness interfaces are all subject to breaking changes. Don't build critical infrastructure on this yet.
- Python 3.12+ requirement and the dependency on `uv`, `tmux`, and (on Linux) `bubblewrap` add setup friction. The one-liner installer helps, but troubleshooting environment issues on diverse developer machines will be a support burden.
- The harness model means you still need subscriptions or API keys for each vendor. Omnigent doesn't reduce your AI costs — it just coordinates and governs how you spend them.

### Getting Started

```bash
# Install Omnigent (installs Python deps, uv, tmux automatically)
curl -fsSL https://raw.githubusercontent.com/omnigent-ai/omnigent/main/scripts/install_oss.sh | sh

# Or install manually with uv
uv tool install omnigent

# Or with Homebrew
brew install omnigent-ai/tap/omnigent

# Start your first session (picks a model and launches terminal + web UI)
omnigent

# Run a specific agent
omnigent claude                      # Claude Code in a collaborative session
omnigent codex                       # Codex
omnigent run examples/polly/         # Multi-agent coding orchestrator
omnigent run examples/debby/         # Dual-model brainstorming partner

# Start the server for team collaboration
omnigent server start                # Web UI at http://localhost:6767
omnigent host                        # Register this machine as a host

# Set up credentials
omnigent setup                       # Interactive credential management
```

### Alternatives

**Claude Code CLI** — Anthropic's official CLI is the best single-vendor experience for Claude-powered coding. It's more mature, better documented, and has a larger community. Choose it when you're committed to the Anthropic ecosystem and don't need multi-agent orchestration or cross-vendor coordination.

**OpenAI Codex CLI** — OpenAI's coding agent is strong for tasks that benefit from GPT-4-class reasoning. Like Claude Code, it's a single-vendor tool with tight integration into OpenAI's ecosystem. Choose it when your team standardizes on OpenAI models and doesn't need the governance features Omnigent provides.

**Cursor** — Cursor's agent mode is the most polished IDE-integrated AI coding experience. It combines code editing, chat, and agent capabilities in a single application. Choose Cursor when you want a GUI-first experience and don't need to orchestrate multiple agents or manage team-wide policies.

### Verdict

Omnigent is the first tool that treats AI coding agents as a fleet to be managed rather than individual tools to be used. The meta-harness architecture is clever — it doesn't compete with Claude Code or Codex, it coordinates them. The policy engine alone makes this worth watching for any team deploying AI agents at scale. It's alpha software with real rough edges, and the YAML spec will probably change three times before it stabilizes. But the core insight — that AI agents need governance, coordination, and collaboration infrastructure — is correct, and the 3,800 stars in a week suggest the developer community agrees. If you're running multiple AI coding agents across a team and feeling the chaos, Omnigent is worth evaluating now, even in its early state.
