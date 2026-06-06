---
name: engram
description: "Engram is a persistent memory system for AI coding agents — a single Go binary with SQLite, FTS5 search, MCP server, and TUI that works with any agent."
url: https://github.com/Gentleman-Programming/engram
stars: 4169
forks: 500
language: Go
tags: ["ai-agents", "memory", "mcp", "go", "developer-tools"]
featured: false
publishedAt: 2026-06-06
---

## Engram

### Overview

Engram solves one of the most annoying problems in AI-assisted development: your coding agent forgets everything between sessions. Every time you close Claude Code, Cursor, or whatever tool you're using, the context you built up — architecture decisions, debugging insights, project conventions — evaporates. You end up re-explaining the same things over and over. Engram gives your agent a persistent brain.

The project comes from Gentleman Programming, an Argentine developer collective that's been building out an entire agentic coding ecosystem — Gentle-AI, SDD (Spec-Driven Development), skills frameworks, and now Engram. They hit 4,000 GitHub stars in under four months since the February 2026 launch, which signals real demand. The 500 forks suggest people aren't just starring it — they're building on it.

At its core, Engram is a single Go binary with zero runtime dependencies. You install it, point your agent at it via MCP (Model Context Protocol), and memories persist across sessions in a local SQLite database with FTS5 full-text search. There's no Docker, no Node.js, no Python environment to manage. One binary, one database file, done. The architecture is intentionally boring in the best way — SQLite is battle-tested, FTS5 is built into SQLite itself, and Go compiles to a single executable. No dependency hell, no version conflicts.

### Why it matters

The AI coding agent space is exploding — Claude Code, Cursor, Copilot, Gemini CLI, OpenCode, Codex — but the tooling around these agents is still immature. Most developers are using agents in a disconnected way: each session starts from scratch, and valuable institutional knowledge dies with the terminal window. According to GitHub's 2025 developer survey, 92% of developers have used AI coding tools, but the persistent memory problem remains unsolved by most platforms.

What makes Engram interesting is that it's agent-agnostic. It doesn't care whether you're using Claude Code today and switching to Codex tomorrow. The MCP protocol is the universal interface, and Engram speaks it fluently. This matters because the AI tool landscape shifts every few months — you don't want your memory system locked to a single vendor.

The project also points toward a future where AI agents accumulate genuine project knowledge over time, not just session-level context. When an agent can recall "we decided against Redis for caching in March because the team preferred Postgres-backed solutions" — that's a qualitative shift in what AI-assisted development looks like. Engram isn't there yet, but its architecture supports that trajectory.

### Key Features

**Agent-Agnostic MCP Integration.** Engram works with any tool that supports MCP — Claude Code, OpenCode, Gemini CLI, Codex, VS Code with Copilot, Cursor, Windsurf, and more. Setup is a one-liner for most agents (`engram setup claude-code`, `engram setup opencode`). The MCP stdio transport means no network configuration, no ports to manage, no auth tokens for local usage. Your agent talks to Engram through a standard protocol that doesn't depend on any single vendor's roadmap.

**SQLite + FTS5 Full-Text Search.** Memories are stored in a local SQLite database with FTS5 indexing for fast full-text search. SQLite is embedded in the binary — no external database server needed. FTS5 provides tokenized search across memory titles and content, which means your agent can find relevant context even when the exact keywords don't match. The entire memory store lives in `~/.engram/engram.db`, making it trivial to back up or move between machines.

**19 MCP Tools for Memory Management.** The tool surface is well-designed: `mem_save` and `mem_update` for writing, `mem_search` and `mem_context` for retrieval, `mem_session_start` and `mem_session_end` for lifecycle management, and `mem_judge` and `mem_compare` for conflict detection. There's also `mem_suggest_topic_key` for automatic categorization. The separation between save/search/session/judge categories shows thoughtful API design rather than a single monolithic "memory" tool.

**Terminal UI with Vim Keybindings.** Running `engram tui` launches an interactive terminal dashboard built with a Catppuccin Mocha theme. Navigate with `j/k` vim keys, drill into memories with Enter, search with `/`, copy content to clipboard with `c`. It's a nice touch for developers who want to browse their agent's memory without leaving the terminal. The TUI shows session timelines, observation details, and search results in a clean, keyboard-driven interface.

**Git-Based Sync Across Machines.** Memories can be synced across machines using compressed chunks committed to git. The sync is designed to avoid merge conflicts — each export creates a self-contained chunk that imports cleanly. Local SQLite remains the source of truth, and cloud sync is opt-in replication. This means you can share agent memory across your laptop and desktop, or across a team, without a central server.

**Memory Conflict Detection.** A newer feature (still in beta) detects when your agent saves conflicting memories — say, "use Clean Architecture" followed by "use Hexagonal Architecture." The FTS5 index finds lexical candidates, and an optional semantic mode uses your agent's own LLM to judge whether memories actually conflict or supersede each other. This is clever because it piggybacks on your existing subscription — no extra API costs.

**Single Binary, Zero Dependencies.** Engram compiles to one Go binary. No Node.js, no Python, no Docker. Install via Homebrew (`brew install gentleman-programming/tap/engram`) or download directly. This is a deliberate architectural choice: the fewer moving parts, the more likely developers are to actually use it daily. The binary runs the MCP server, HTTP API, CLI, and TUI — all from the same executable.

### Use Cases

- **Long-running project development** — When you're working on a codebase over weeks or months, Engram lets your agent recall past decisions, debugging history, and architectural context without re-explanation each session.
- **Multi-agent workflows** — If you use Claude Code for architecture discussions and Copilot for inline completions, Engram provides shared memory across both tools via the MCP protocol.
- **Team knowledge sharing** — With git-based sync, a team can share agent memories across machines. New team members' agents can access accumulated project knowledge from day one.
- **Context-heavy debugging sessions** — Complex bugs often require remembering what you've already tried. Engram's session lifecycle tools let agents track debugging progress across multiple attempts.
- **Architectural decision records** — Agents can save decisions with structured metadata (what, why, where, learned), creating a searchable log of project decisions that persists indefinitely.

### Pros and Cons

Pros:
- Agent-agnostic design means you're not locked into any single AI tool vendor. When you switch from Claude Code to Codex, your memories follow you.
- The single-binary, zero-dependency architecture is genuinely refreshing. No `node_modules`, no virtual environments, no Docker containers to manage.
- The MCP tool surface (19 tools) is well-organized and covers real workflows — session lifecycle, conflict detection, topic suggestion — not just basic save/search.
- Active development with 500 forks and a growing contributor base. The beta conflict-surfacing features show the project is pushing into interesting territory beyond simple memory storage.

Cons:
- SQLite's single-writer model means concurrent writes from multiple agents can bottleneck. Fine for individual use, but team deployments with heavy concurrent access will hit limits.
- The conflict detection feature is still beta and requires agents to support semantic scanning. The FTS5-only mode catches lexical overlaps but misses semantically related memories that don't share keywords.
- Cloud sync adds complexity on top of the otherwise simple architecture. The troubleshooting docs for cloud upgrades suggest the replication layer has rough edges.
- Documentation is extensive but scattered across multiple files (DOCS.md, ARCHITECTURE.md, AGENT-SETUP.md, etc.) with some duplication. A single consolidated reference would help onboarding.

### Getting Started

```bash
# Install via Homebrew (macOS/Linux)
brew install gentleman-programming/tap/engram

# Or build from source
git clone https://github.com/Gentleman-Programming/engram.git
cd engram
go build -o engram ./cmd/engram

# Set up for your agent (pick one)
engram setup claude-code
engram setup opencode
engram setup gemini-cli
engram setup codex

# Or manually add MCP config for any agent
engram mcp  # starts MCP server on stdio

# Save a memory from the CLI
engram save "Use Postgres for auth" "The team decided on Postgres over Supabase for auth backend due to existing infra."

# Search memories
engram search "auth database"

# Launch the TUI
engram tui

# Start the HTTP API
engram serve  # default port 7437
```

### Alternatives

**claude-mem** — The project that inspired Engram. It's simpler and tightly coupled to Claude Code specifically. If you only use Claude and want the absolute minimum viable memory system, claude-mem is lighter. But it doesn't work with other agents, has no TUI, and lacks the conflict detection and sync features. Choose claude-mem if you're a Claude-only user who wants the simplest possible setup.

**Supermemory** — A cloud-first memory platform with a polished UI and broader scope (browser bookmarks, notes, not just coding context). It's more of a general-purpose knowledge management tool than an agent-specific memory system. Choose Supermemory if you want a hosted solution with web UI and don't mind the cloud dependency. Choose Engram if you want local-first, agent-focused memory with zero infrastructure.

**mem0** — A Python-based memory layer with a hosted API and SDK integrations for multiple AI frameworks. It's more mature for production applications where you're building memory into your own product. Choose mem0 if you're building an AI product that needs memory as a feature. Choose Engram if you're a developer who wants your coding agent to remember things between sessions.

### Verdict

Engram is the most practical solution I've seen for the "my AI agent has amnesia" problem. It doesn't try to be a knowledge graph, a vector database, or an AI platform — it's a focused tool that stores agent memories in SQLite and exposes them via MCP. The Go binary with zero dependencies is a real advantage in a space full of heavyweight Python and Node.js tooling. At 4,000 stars and growing, it's clearly resonating with developers who've experienced the frustration of context loss between coding sessions. If you're using any AI coding agent regularly, Engram is worth the 30-second install. The agent-agnostic design means it'll still work when you inevitably switch tools six months from now.
