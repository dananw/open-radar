---
name: omnigent
description: "Omnigent is a meta-harness for AI coding agents — run Claude Code, Codex, and Pi together in unified sessions with real-time collaboration and governance policies."
url: https://github.com/omnigent-ai/omnigent
stars: 498
forks: 62
language: Python
tags: ["ai-agents", "developer-tools", "collaboration", "cli", "orchestration"]
featured: false
publishedAt: 2026-06-14
---

## Omnigent

### Overview

Omnigent hit 500 GitHub stars in three days after its June 11 launch. That kind of velocity usually signals either a viral meme or something developers have been waiting for. In this case, it's the latter.

The project is a meta-harness for AI coding agents. If you've used Claude Code, OpenAI Codex, or Pi, you know the problem: each tool lives in its own terminal session, has its own configuration, and can't talk to the others. You end up with three terminal tabs open, context-switching between agents that each have partial knowledge of your codebase. Omnigent collapses that into a single interface where multiple agents work on the same session simultaneously.

The maintainer, dbczumar (Corey Zumar), has 13 commits to the main branch and is the primary contributor so far. The project is Apache 2.0 licensed and explicitly alpha status — the README carries a bold orange "alpha" badge. It's Python 3.12+ and installs via `uv`, `pip`, or Homebrew. The web UI runs on React, and there's a macOS desktop app that wraps it with native notifications.

### Why it matters

The AI coding tool landscape in mid-2026 is fragmented. Claude Code excels at long-context reasoning and refactoring. Codex handles rapid iteration and test generation well. Pi has its own strengths around agentic workflows. Most developers use at least two of these regularly, but they use them in isolation. There's no shared context, no way to ask one agent to review another's work, and no unified governance layer.

Omnigent addresses this by treating agent harnesses as interchangeable runtimes. You define your agent in YAML, specify which harness it should run on (Claude, Codex, Pi, OpenAI Agents, or a custom one), and Omnigent handles the session management. The real unlock is the collaboration model: sessions sync across devices in real time, teammates can co-attach to a running session, and you can fork conversations onto your own machine.

For fullstack web developers specifically, this matters because our work spans multiple domains — frontend React code, backend NestJS or Django services, Go microservices, infrastructure configs. No single AI agent handles all of these well. Being able to route a React question to Claude Code and a Go optimization to Codex within the same session, with full context sharing, is a workflow improvement that compounds daily.

### Key Features

**Multi-Agent Orchestration.** Define agents in YAML and run multiple harnesses in the same session. The included "Polly" example is a tech-lead orchestrator: she plans work, delegates to Claude Code and Codex sub-agents running in parallel git worktrees, then routes each diff to a reviewer from a different vendor. You merge. This pattern — plan, delegate, cross-review — catches bugs that single-agent workflows miss.

**Cross-Device Session Sync.** Start a session on your laptop, continue on your phone, pick it up in the browser on another machine. Messages, sub-agents, terminals, and files stay in sync. The web UI at `localhost:6767` is built for mobile. On your local network, no deployment needed — just open your machine's LAN address on your phone.

**Real-Time Collaboration.** Share a live session with a teammate who can watch your agent work and chat with it in real time. Co-drive mode lets a teammate attach to your running session and execute messages on your machine. Fork mode clones a conversation onto your own machine and continues independently. This is pair programming with AI agents, not just humans.

**Policy-Based Governance.** Create policies that check every agent action before it executes. Ask for approval before shell commands, cap API spend at a dollar amount, limit which tools an agent can reach. Policies stack across three levels: server-wide (admin), per-agent (developer), and per-session (user). The stricter rules win. Built-in policies include spend caps with soft warnings and OS tool approval gates.

**Cloud Sandbox Execution.** Run agent sessions in disposable cloud sandboxes via Modal or Daytona. No laptop needs to stay online. The server provisions a sandbox per session (called "managed hosts"), so your agent can keep working while you close your laptop. More providers are planned.

**Universal Model Support.** Works with first-party API keys, Claude Pro/Max or ChatGPT subscriptions (via the official CLIs), any OpenAI- or Anthropic-compatible gateway (OpenRouter, LiteLLM, Ollama, vLLM, Azure), and Databricks workspace profiles. Defaults are per-agent, so your Claude default and Codex default coexist. Switch models mid-session with `/model`.

**Custom Agent Authoring.** Agents are YAML files: a prompt, tools (Python functions or sub-agents), and an executor harness. The schema auto-generates from Python function signatures. Agents can even build other agents — describe what you want in chat and the agent writes the YAML for you.

### Use Cases

- **Multi-agent code review** — Have Claude Code write a feature, then automatically route the diff to Codex for review. The cross-vendor review catches assumptions that single-agent workflows miss.
- **Fullstack task delegation** — Route React frontend work to Claude Code and Go backend optimization to Codex within the same session, with shared context about your project structure.
- **Team standup with AI** — Share a live session so your whole team watches an agent investigate a production issue in real time, with anyone able to jump in and steer.
- **Cost-controlled experimentation** — Set a $5 spend cap with a $3 soft warning, then let an agent explore a codebase freely. It pauses when it hits the threshold instead of burning through your budget.
- **Mobile code review** — Start a refactoring session on your laptop, then review the agent's changes on your phone during your commute. The mobile web UI shows the same terminal, files, and chat.
- **Onboarding new developers** — Create a custom agent YAML that knows your project's conventions and coding standards. New team members run it and get guidance that's specific to your codebase, not generic LLM advice.

### Pros and Cons

Pros:
- Solves a real problem: multi-agent coordination without context loss. Most developers use 2+ AI coding tools daily and waste time switching between them.
- The YAML agent definition is simple and composable. Sub-agents, tools, and policies are all declarative, making it easy to version-control your AI workflow alongside your code.
- Apache 2.0 licensed with a clear separation between open-source core and cloud features. No bait-and-switch licensing.
- The collaboration model (co-drive, fork, share) is genuinely useful for teams, not just a checkbox feature.

Cons:
- Alpha status is real. The API surface is still settling, and you should expect breaking changes in the coming weeks. Don't build critical infrastructure on it yet.
- Python 3.12+ requirement means you need a recent Python install. The `uv` installer handles this, but teams stuck on older Python versions will have friction.
- The project is early-stage with 7 contributors total and a primary maintainer doing most of the work. Long-term sustainability depends on community growth.
- No Windows support yet — the tmux requirement and macOS desktop app suggest Unix-first development. Windows users would need WSL.

### Getting Started

```bash
# Install Omnigent (one command, handles dependencies)
curl -fsSL https://raw.githubusercontent.com/omnigent-ai/omnigent/main/scripts/install_oss.sh | sh

# Or install with uv/pip manually
uv tool install omnigent

# Set up your model credentials
omnigent setup

# Start a session (launches terminal + web UI at localhost:6767)
omnigent

# Or launch a specific agent
omnigent claude                      # Claude Code in a shareable session
omnigent codex                       # Codex in a shareable session

# Try the built-in multi-agent orchestrator
omnigent run examples/polly/

# Deploy a server for team access
omnigent server start
omnigent host                        # register this machine as a host
```

### Alternatives

**Aider** — A terminal-based AI coding assistant that supports multiple LLM backends. Aider is more mature and focused on single-agent workflows with great git integration. Choose Aider if you want one excellent agent with deep git awareness rather than coordinating multiple agents.

**Continue** — An open-source AI code assistant that integrates directly into VS Code and JetBrains IDEs. Continue is better if you prefer working inside your editor rather than a terminal/web interface, and it has broader model support through its config system. It lacks Omnigent's multi-agent orchestration but wins on IDE integration.

**Cline** — A VS Code extension for AI-assisted coding with a strong emphasis on autonomous agent workflows. Cline excels at single-agent task completion with file editing and terminal access. Choose Cline if you want a focused, editor-integrated agent experience without the overhead of multi-agent coordination.

### Verdict

Omnigent is the first tool I've seen that takes multi-agent AI coding seriously as a workflow problem rather than a model problem. The insight is correct: no single LLM will dominate every coding task, so the orchestration layer matters more than any individual model. The YAML agent definitions, policy system, and real-time collaboration are practical features that solve real friction points in daily development work. At 500 stars in three days with active development, the community signal is strong. It's alpha software with rough edges — don't bet your production pipeline on it — but if you're a developer who switches between Claude Code and Codex regularly, Omnigent is worth trying today. The time you save on context-switching alone pays for the setup.
