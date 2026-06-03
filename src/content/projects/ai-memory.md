---
name: ai-memory
description: "Long-term memory for AI coding agents — cross-agent handoff between Claude Code, Codex, OpenCode, and Cursor with wiki-style markdown storage."
url: https://github.com/akitaonrails/ai-memory
stars: 514
forks: 56
language: Rust
tags: ["ai-agents", "memory", "developer-tools", "rust", "mcp"]
featured: false
publishedAt: 2026-06-04
---

## ai-memory

### Overview

ai-memory is a Rust-based server that gives AI coding agents persistent, long-term memory across sessions. It crossed 500 GitHub stars within two weeks of its May 2026 launch, which tracks — every developer using Claude Code or Codex has felt the pain of losing context when a session ends.

The project is built by Fabio Akita, a well-known Brazilian developer and content creator with over two decades of experience in software engineering. He's the kind of developer who builds tools because the existing ones frustrate him, not because he's chasing GitHub stars. His previous work spans Ruby, Elixir, and now Rust, and the language choice here is deliberate — ai-memory is designed to be a lightweight, always-on background server that doesn't get in your way.

The core problem is simple but expensive: LLM coding agents lose all context when a session ends. You spend 45 minutes explaining your architecture to Claude Code, make progress on a refactor, close the terminal, and the next morning you're starting from scratch. ai-memory captures every prompt, tool call, and decision automatically through lifecycle hooks, then synthesizes them into coherent wiki pages. When you open a new session — even in a different agent — the server prepends a "where you left off" handoff block. No manual note-taking, no `write_note` ceremony, no vector database to babysit.

### Why it matters

The AI coding agent space is fragmenting fast. Developers aren't loyal to one tool — they use Claude Code for complex refactors, Codex for quick tasks, Cursor for IDE-integrated work, and Gemini CLI for experiments. Each agent starts cold. That's a productivity tax that compounds over weeks and months.

ai-memory solves this by sitting underneath all of them as a shared memory layer. It speaks MCP (Model Context Protocol), which is becoming the standard for agent-tool communication. The wiki is plain markdown in a git repo — grep-able, openable in Obsidian, backable with rsync. No proprietary format, no vendor lock-in. This is the kind of infrastructure tool that the agent ecosystem desperately needs but nobody else is building properly.

The timing matters too. The "vibe coding" trend has pushed developers to rely more heavily on AI agents, but the tooling around those agents is still primitive. Context management is the single biggest bottleneck in agent-assisted development, and ai-memory addresses it head-on with a practical, no-nonsense approach.

### Key Features

**Zero-Friction Automatic Capture.** Lifecycle hooks fire on every prompt, tool call, and session boundary without any manual intervention. You don't type `write_note` or tag anything — the server captures everything in the background. This is the critical difference from tools that require active participation. The capture happens through agent-specific hooks that integrate with Claude Code, Codex, OpenCode, Cursor, Gemini CLI, Antigravity CLI, and OpenClaw.

**Cross-Agent Handoff.** Quit Claude Code at 4 PM, start Codex in the same directory at 9 AM the next morning. The next agent sees a typed handoff with open questions, next steps, and a session summary before its first prompt. This works because ai-memory uses per-project isolation keyed by stable UUIDs, so all agents working in the same directory share the same memory context.

**Karpathy-Style LLM Wiki.** Pages are compiled from observations at session end, not retrieved from raw logs. The system uses a supersession chain — when a new session synthesizes updated knowledge, it replaces (not appends to) previous pages. Combined with git-versioned markdown, you get time-travel via `git log`. This design means the wiki stays coherent and current rather than growing into an unreadable dump of session artifacts.

**Zero-LLM Mode.** You can run ai-memory without any LLM or embedding provider. FTS5 full-text search works out of the box with rule-based summarization. Add a provider (Anthropic, OpenAI, Gemini) when you want consolidated pages and contradiction linting. This makes it practical for developers who want the capture infrastructure now and the AI-powered consolidation later.

**Built-in Web UI.** A read-only HTML interface mounted on the same axum server as MCP. Project list, folder tree, FTS5 search, markdown rendering, dark mode. Browse the wiki at `http://localhost:49374/web` — no separate frontend to deploy. For teams, this becomes an audit surface: browse what landed before sharing with a teammate.

**Multi-Machine Server Architecture.** Run one ai-memory instance for your whole household or team. Stand the server up on a homelab box at `0.0.0.0:49374` with a bearer token; every laptop and desktop talks to it over LAN, VPN, or Tailscale. Per-cwd routing keeps each project's pages cleanly separated. The Docker image supports both `linux/amd64` and `linux/arm64`, so Apple Silicon Macs pull without emulation.

**Bootstrap for Existing Projects.** Got a project with months of history before ai-memory? `cd /path/to/project && ai-memory bootstrap` collects git log, README, docs, module headers, and project rules, then one-shot-summarizes them into seed wiki pages. Future sessions build on top of that foundation rather than starting from nothing.

### Use Cases

- **Mid-task context switching** — Stop working on a complex refactor in Claude Code, pick it up in Codex the next day with full context about what was tried, what failed, and what's next. The handoff block eliminates the 15-minute "let me explain what I was doing" ritual.

- **Multi-agent workflows** — Use Claude Code for architectural decisions, Codex for implementation, and Cursor for debugging. Each agent sees the accumulated knowledge from all previous sessions, regardless of which tool generated it.

- **Team knowledge sharing** — Run a shared ai-memory server on a dev box. Team members connect over LAN with bearer-token auth. New team members get up to speed by browsing the wiki instead of interrupting senior developers.

- **Long-running projects** — Projects that span weeks or months accumulate decisions, conventions, and gotchas. ai-memory captures these organically and makes them searchable. "What did we decide about the database schema six weeks ago?" becomes a query, not a Slack message.

- **Agent-assisted code review** — The wiki captures not just what was done but why. When reviewing code that an AI agent helped write, you can trace the reasoning back through session pages.

### Pros and Cons

Pros:

- Solves a real, daily pain point for anyone using multiple AI coding agents. The cross-agent handoff alone justifies running the server.
- Plain markdown storage means no database to babysit, no vendor lock-in, and full compatibility with existing developer tools (git, Obsidian, grep).
- Broad agent support — Claude Code, Codex, OpenCode, Cursor, Gemini CLI, Antigravity CLI, OpenClaw, and Oh My Pi. Not a single-vendor play.
- Rust binary is lightweight and fast. The axum server adds negligible overhead to your development workflow.
- Zero-LLM mode means you can start using it today without API keys or additional costs.

Cons:

- Still at v0.8 with multi-user status. The API surface and page synthesis logic may change. Production-critical workflows should test thoroughly before depending on it.
- Hook installation modifies agent config files (`.claude/settings.json`, etc.). The tool creates backups, but any tool that touches config files adds a layer of potential friction.
- The wiki can grow large on active projects. No built-in archival or compaction strategy yet — you're relying on git history and manual `purge-project` for cleanup.
- Requires a running server process. Not a drop-in CLI tool — you need to manage the server lifecycle, which adds operational overhead compared to purely client-side solutions.

### Getting Started

```bash
# Docker (recommended)
mkdir -p ~/.local/bin
curl -fsSL https://raw.githubusercontent.com/akitaonrails/ai-memory/main/bin/ai-memory \
    -o ~/.local/bin/ai-memory
chmod +x ~/.local/bin/ai-memory

# Start the server
docker run -d --name ai-memory \
    --restart unless-stopped \
    -p 127.0.0.1:49374:49374 \
    -v ai-memory-data:/data \
    -e AI_MEMORY_LLM_PROVIDER=anthropic \
    -e ANTHROPIC_API_KEY=your-key \
    -e AI_MEMORY_EMBEDDING_PROVIDER=openai \
    -e OPENAI_API_KEY=your-key \
    akitaonrails/ai-memory:latest

# Wire Claude Code (two commands)
ai-memory install-mcp   --client claude-code --apply
ai-memory install-hooks --agent  claude-code --apply

# Bootstrap an existing project
cd /path/to/your/project
ai-memory bootstrap
```

For Arch Linux, use the AUR packages: `yay -S ai-memory-bin`. For native builds, you need Rust 1.95+ and `cargo install ai-memory`.

### Alternatives

**Memory Plugin for Claude Code** — A simpler, file-based approach that stores context in `.memory/` directories. Lower setup overhead but lacks cross-agent support and automatic session synthesis. Good enough if you only use one agent and want something that works with zero infrastructure.

**Zep** — A cloud-hosted memory layer for AI applications with a focus on conversational memory. Zep is more mature and has better retrieval-augmented generation (RAG) features, but it's a SaaS product with pricing tiers. ai-memory is self-hosted, free, and purpose-built for coding agent workflows rather than general chat applications.

**Mem0** — An open-source memory layer that supports multiple AI applications. Mem0 has broader scope (chatbots, assistants, agents) and a Python SDK, but it requires a vector database backend and is heavier to operate. ai-memory's markdown-in-git approach is simpler for the specific use case of coding agent memory.

### Verdict

ai-memory is the most practical solution I've seen for the context-loss problem that plagues every AI coding agent. The design choices — plain markdown, git versioning, MCP integration, zero-LLM mode — show a developer who's been burned by over-engineered memory systems and decided to build something that actually works. It's not flashy. There's no vector database, no embeddings pipeline you have to tune, no proprietary format to worry about. It's a Rust server that captures what your agents do and hands that context to the next agent. If you're using more than one AI coding tool in 2026, this is infrastructure you should be running. The 500+ stars in two weeks and active development suggest the community agrees.
