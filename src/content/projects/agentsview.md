---
name: agentsview
description: "Local-first session intelligence and analytics for AI coding agents — track costs, search transcripts, and analyze usage across Claude Code, Codex, Cursor, and 25+ other tools."
url: https://github.com/kenn-io/agentsview
stars: 2052
forks: 195
language: Go
tags: ["ai-agents", "developer-tools", "analytics", "go", "cli"]
featured: false
publishedAt: 2026-06-13
---

## AgentsView

### Overview

AgentsView is a Go binary that gives you a unified dashboard over every AI coding agent session on your machine. It indexes sessions from Claude Code, Codex, Cursor, Copilot CLI, Gemini CLI, and 25+ other agents into a local SQLite database, then serves a web UI with full-text search, cost tracking, activity heatmaps, and per-session analytics. No cloud account required.

The project launched in February 2026 and hit 2,052 GitHub stars by mid-June, with 804 stars added in a single week on the Go trending page. That velocity makes sense when you look at the market: developers are running multiple AI coding agents simultaneously and have zero visibility into what they're spending, how sessions overlap, or which tools are actually productive. AgentsView fills that gap with a single install command.

The inspiration traces back to Andy Fischer's claude-history-tool and Simon Willison's claude-code-transcripts — both useful but single-agent tools. AgentsView generalizes the concept. It discovers session directories automatically, parses the proprietary formats each agent uses, normalizes everything into a common schema, and exposes it through a keyboard-driven web interface and a CLI that's fast enough for shell prompts.

### Why it matters

If you're a developer using AI coding agents in 2026, you're probably using more than one. Claude Code for complex refactors, Codex for quick tasks, maybe Cursor for IDE-integrated work. Each tool tracks its own sessions in its own format, in its own directory. You have no unified view of your spending, no way to search across all your agent conversations, and no analytics on how your usage patterns evolve.

This is a real problem. A single Claude Code session with an agentic workflow can burn through $10-20 in API costs without you noticing. Multiply that across daily usage and multiple agents, and you're looking at hundreds of dollars per month with no centralized tracking. AgentsView's `usage daily` command gives you a cost summary across every agent in under a second — it reads from the pre-indexed SQLite database rather than re-parsing raw session files, making it over 100x faster than tools like ccusage.

The broader trend is clear: AI coding agents are becoming infrastructure. And infrastructure needs observability. AgentsView is the first tool I've seen that treats agent sessions the way we treat application logs — something to index, search, analyze, and learn from.

### Key Features

**Multi-Agent Session Discovery.** AgentsView auto-discovers sessions from 25+ agents including Claude Code, Codex, Cursor, Copilot CLI, Gemini CLI, OpenCode, Amp, Zed, VSCode Copilot, Kimi, Kiro, Forge, and more. It knows where each agent stores its files and how to parse the format. You don't configure anything — it finds everything on first run.

**Cost Tracking with LiteLLM Pricing.** The `usage daily` command computes costs across all your agents using LiteLLM's pricing database, with offline fallback. It handles prompt-caching-aware calculations (cache creation vs. read tokens), per-model breakdowns, date filtering, and timezone-aware bucketing. Run `agentsview usage daily --breakdown` to see exactly which models are costing you money.

**Full-Text Search Across All Sessions.** SQLite FTS5 indexes every message across every session from every agent. Search for a function name, an error message, or a conversation topic and find it instantly — regardless of which agent generated it. The web UI exposes this through a Cmd+K search palette with keyboard-first navigation.

**Analytics Dashboard with Activity Heatmaps.** The web UI includes a dashboard with activity heatmaps, tool usage distributions, velocity metrics, project breakdowns, and daily spend charts. Session archetypes classify your interactions as automation, quick, standard, deep, or marathon sessions. This gives you a real picture of how you actually use AI coding tools, not just how much you spend.

**PostgreSQL Sync for Team Dashboards.** Push your local session data to a shared PostgreSQL instance with `agentsview pg push`. The auto-push daemon watches session directories and syncs on changes. Team members can then serve a shared read-only dashboard from the same database. This turns individual developer tool usage into team-level visibility.

**DuckDB Mirror and Quack Protocol.** For analytics workflows, AgentsView can mirror session data into DuckDB — a portable analytical database you can query with SQL or expose over DuckDB's Quack protocol for remote read access. Useful for feeding agent usage data into BI tools or custom analysis pipelines.

**Desktop App with Tauri.** Beyond the CLI and web server, AgentsView ships as a native desktop application for macOS and Windows, built with Tauri. Install via `brew install --cask agentsview` or download from GitHub Releases.

### Use Cases

- **Cost-conscious developers** who need to track API spending across Claude Code, Codex, and Cursor without manually adding up token counts from each tool's dashboard.

- **Engineering managers** who want team-level visibility into AI agent usage patterns, spending trends, and productivity metrics through the PostgreSQL sync feature.

- **Power users running multiple agents** who need unified full-text search across all their AI coding conversations — find that error fix from last week regardless of which agent handled it.

- **Developers optimizing their AI workflow** who want to analyze session archetypes, tool usage patterns, and model preferences to figure out which agent works best for which tasks.

- **Remote teams** using SSH port-forwarding or Codespaces who need the web UI accessible beyond localhost, with proper host-header validation and optional authentication.

### Pros and Cons

Pros:

- One Go binary, no dependencies, no cloud account. Install with curl and you're running in seconds. The local-first design means your session data never leaves your machine unless you explicitly configure PostgreSQL sync.

- The 100x speed improvement over ccusage is real — querying a pre-indexed SQLite database is fundamentally faster than re-parsing raw session files on every run. Daily cost reports are instant.

- Supporting 25+ agents in a single tool is ambitious and practical. As the AI coding agent landscape fragments, having one unified view becomes increasingly valuable.

Cons:

- Session parsing depends on each agent's on-disk format, which can change without notice. When an agent updates its session format, AgentsView needs a corresponding update — there's a maintenance burden that scales with the number of supported agents.

- The PostgreSQL sync and DuckDB features add deployment complexity that most individual developers don't need. The core value is the local SQLite + web UI; the enterprise features feel premature for a project at this stage.

- Anonymous telemetry is enabled by default (a PostHog ping on server start). While it's minimal and can be disabled with `AGENTSVIEW_TELEMETRY_ENABLED=0`, some developers will object to any telemetry in a tool that indexes their AI conversations.

### Getting Started

```bash
# macOS / Linux — one-line install
curl -fsSL https://agentsview.io/install.sh | bash

# Or via Homebrew (macOS)
brew install --cask agentsview

# Start the server and open the web UI
agentsview serve

# Quick cost summary from the CLI
agentsview usage daily

# Per-model cost breakdown
agentsview usage daily --breakdown

# Filter by agent and date range
agentsview usage daily --agent claude --since 2026-06-01

# Full session stats with analytics
agentsview stats

# One-line status for shell prompts
agentsview usage statusline
```

On first run, AgentsView discovers all agent sessions on your machine, indexes them into `~/.agentsview/sessions.db`, and opens the web UI at `http://127.0.0.1:8080`. The initial sync may take a few seconds depending on how many sessions you have.

### Alternatives

**ccusage** — A focused CLI tool for tracking Claude Code token usage. Simpler and narrower than AgentsView — it only supports Claude Code and re-parses raw session files on every run. Choose ccusage if you only use Claude Code and want the absolute minimal tool.

**Claude Code's built-in `/cost` command** — Shows token usage for the current session only. No historical tracking, no cross-session search, no multi-agent support. Useful for checking a single session's cost in real time, but not a replacement for AgentsView's analytics.

**Manual log parsing** — Some developers build custom scripts to parse agent session files and pipe them into spreadsheets or dashboards. This works for one-off analysis but breaks whenever an agent changes its format and doesn't scale to multiple agents.

### Verdict

AgentsView is the right tool at the right time. As AI coding agents proliferate, the lack of unified observability across them is a genuine pain point — one that most developers haven't fully articulated yet because they haven't seen a solution. The local-first, single-binary approach is exactly how developer tools should work: install it, run it, get value immediately. The 2,052 stars and 804/week growth rate suggest the community agrees. If you're running more than one AI coding agent, install AgentsView. You'll probably discover you're spending more than you thought, and you'll finally have the data to optimize it.
