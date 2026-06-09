---
name: gentle-ai
description: "Go-based ecosystem configurator that supercharges 15+ AI coding agents with persistent memory, SDD workflows, skills, and MCP servers — works with Claude Code, Cursor, Codex, and more."
url: https://github.com/Gentleman-Programming/gentle-ai
stars: 3799
forks: 449
language: Go
tags: ["ai-agents", "developer-tools", "go", "coding-workflow", "mcp"]
featured: false
publishedAt: 2026-06-10
---

## Gentle-AI

### Overview

Gentle-AI hit 3,800 GitHub stars in under four months, which tracks with the explosive growth of AI coding tools in 2026. But here's what makes it different: it's not another AI agent. It's the thing that makes your existing agents actually useful.

The project comes from Gentleman Programming, an Argentine developer community that's been building open-source tooling for the Latin American tech scene for years. Their previous project, Agent Teams Lite, got archived when Gentle-AI launched in February 2026 — everything ATL did is now here with better installation, automatic updates, and persistent memory. The creator, known as Gentleman, has a track record of building practical developer tools rather than flashy demos.

The core problem Gentle-AI solves is one every developer using AI coding tools has felt: you install Claude Code or Cursor, have a conversation, close the tab, and start from zero next time. Your agent doesn't remember what you decided about your auth architecture, doesn't know you prefer TDD, and can't coordinate with other tools in your stack. Gentle-AI layers persistent memory, structured workflows, curated skills, and MCP integrations on top of whatever agent you already use. It supports 15 agents including Claude Code, OpenCode, Cursor, VS Code Copilot, Codex, Windsurf, Gemini CLI, Kilo Code, Kiro IDE, Qwen Code, OpenClaw, Trae, Pi, Hermes, and Antigravity.

### Why it matters

The AI coding agent space exploded in 2025-2026, but the tooling around these agents is fragmented. Every agent has its own config format, its own memory system (or none), its own way of handling skills. If you use Claude Code for design work and OpenCode for implementation, there's no shared context between them. Gentle-AI acts as a universal adapter layer.

This connects to a broader trend: developers aren't picking one AI agent anymore. They're using 2-3 tools for different phases of work. A recent JetBrains survey found 67% of developers using AI coding tools use more than one regularly. Gentle-AI's Spec-Driven Development workflow lets you assign different models to different phases — a powerful model like Claude Sonnet for design, a fast free model like Qwen for exploration, and a cheap model for routine implementation. That per-phase model routing is something no single agent offers natively.

The Go implementation matters too. It's a single binary, no runtime dependencies, cross-platform (macOS, Linux, Windows). Install via Homebrew, Scoop, or `go install`. The TUI gives you an interactive dashboard for managing everything. This is how developer tools should be distributed in 2026.

### Key Features

**Spec-Driven Development (SDD) Workflow.** Gentle-AI implements a structured development methodology where work moves through defined phases: design, implementation, testing, and review. Each phase can use a different AI model optimized for that task. The orchestrator delegates work to sub-agents based on complexity triggers — reading 4+ files means delegate exploration, touching 2+ non-trivial files means use one writer, and any commit or push triggers a fresh review. This prevents the "accidental chaos" that happens when a single agent handles everything in a long monolithic session.

**Engram Persistent Memory.** Your AI agent automatically remembers decisions, bugs, and context across sessions. No configuration needed — it just works. But when you need to dig into past decisions, you get CLI commands like `engram search "auth bug"` to find specific memories, `engram projects list` to see all projects with memory counts, and `engram tui` for a visual memory browser. There's also an MCP integration so your agent can query memories directly during conversations. Team sharing is supported, so your whole team's decisions are accessible.

**15-Agent Support with Unified Config.** Instead of maintaining separate configurations for Claude Code, Cursor, OpenCode, and others, Gentle-AI writes agent-scoped files to each tool's global config directory. Run `gentle-ai install` and select which agents to configure. Workspace-scoped installation (`--scope=workspace`) keeps the Gentleman stack isolated to one project. Each agent gets the right config format — Claude Code gets its system prompts, OpenCode gets its TOML configs, Cursor gets its agent definitions.

**Per-Phase Model Assignment.** This is the feature that makes SDD actually practical. Assign cheap free models to exploration, premium models to design, and fast models to implementation. Create named profiles like "cheap" or "premium" and switch between them with Tab in OpenCode. The CLI makes it explicit: `gentle-ai sync --profile cheap:openrouter/qwen/qwen3-30b-a3b:free` assigns a free model to the cheap profile, and `--profile-phase` lets you override specific phases within a profile.

**Skill Registry with Index-First Discovery.** Gentle-AI maintains a registry of installed skills and project conventions. Run `gentle-ai skill-registry refresh` to scan and rebuild. Skills are discovered through an index-first flow — the registry knows what skills are available, what they do, and when to delegate to them. This is more structured than the ad-hoc "put a markdown file in your project root" approach most agents use.

**Automatic Backup and Rollback.** Every install, sync, and upgrade automatically snapshots your config files. Backups are compressed (tar.gz), deduplicated (identical configs aren't re-backed up), and auto-pruned (keeps the 5 most recent). Pin important backups via the TUI to protect them from pruning. If something breaks, you can roll back to a known-good state. This is the kind of safety net that makes people actually trust automated config management.

**Teaching-Oriented Persona with Security-First Permissions.** The default persona doesn't just write code — it explains what it's doing and why. Permission handling is security-first by default, requiring explicit approval for destructive operations. This is particularly useful for junior developers using AI tools, but even experienced developers benefit from the audit trail.

### Use Cases

- **Fullstack developers using multiple AI agents** — If you switch between Claude Code for architecture decisions and Cursor for implementation, Gentle-AI gives you shared memory and consistent workflows across both tools. Your auth design decisions made in Claude Code are available when you're implementing in Cursor.

- **Teams adopting AI coding tools** — The Engram memory system supports team sharing, so architectural decisions and past bug fixes are accessible to everyone. New team members can query the memory to understand why certain decisions were made.

- **Developers optimizing AI costs** — Per-phase model routing lets you use expensive models only where they matter. Use a free Qwen model for exploration and code search, Claude Sonnet for design review, and a fast cheap model for routine implementation. This can cut AI coding costs by 60-80% compared to using a premium model for everything.

- **Go developers who want a single-binary tool** — No Node.js runtime, no Python dependencies. Install via Homebrew or `go install` and you have a cross-platform tool that manages your entire AI coding ecosystem.

- **Developers building on the MCP protocol** — Gentle-AI integrates MCP servers into your agent's workflow, giving your tools access to external capabilities without manual configuration.

### Pros and Cons

Pros:
- Supports 15 AI coding agents with a single unified configuration system, which is the broadest agent support of any tool in this space. You're not locked into one vendor.
- The SDD workflow with per-phase model assignment is genuinely useful for controlling costs and improving output quality. Assigning cheap models to exploration and premium models to design review is a pattern that works.
- Go single-binary distribution means zero runtime dependencies and consistent behavior across macOS, Linux, and Windows. Install in seconds, no package manager headaches.
- Engram persistent memory works automatically without configuration. The CLI and TUI for browsing memories are well-designed for actual developer workflows.

Cons:
- 170 open issues as of June 2026 suggest the API surface is still settling. Some features may change between versions, and the documentation is still evolving.
- The SDD methodology is opinionated. If you prefer unstructured "just chat with the AI" workflows, the phase-based approach may feel like overhead. It's designed for teams and complex projects, not quick one-off scripts.
- Community plugins for OpenCode are third-party and maintained independently. Gentle-AI registers them but doesn't guarantee compatibility across updates.

### Getting Started

```bash
# macOS / Linux — recommended
brew tap Gentleman-Programming/homebrew-tap
brew install gentle-ai

# Windows
scoop bucket add gentleman https://github.com/Gentleman-Programming/scoop-bucket
scoop install gentle-ai

# Or via Go install (any platform with Go 1.24+)
go install github.com/gentleman-programming/gentle-ai/cmd/gentle-ai@latest
```

After installation, run the interactive installer to configure your agents:

```bash
# Interactive TUI installer
gentle-ai install

# Workspace-scoped (project-only)
gentle-ai install --scope=workspace

# Health check
gentle-ai doctor

# Sync configurations after changes
gentle-ai sync

# Browse Engram memories
engram tui

# Search past decisions
engram search "database schema change"
```

For OpenCode users, create per-phase model profiles:

```bash
# Create a "cheap" profile with a free model
gentle-ai sync --profile cheap:openrouter/qwen/qwen3-30b-a3b:free

# Override specific phases within the profile
gentle-ai sync --profile-phase cheap:sdd-design:anthropic/claude-sonnet-4-20250514
```

### Alternatives

**Cursor Rules / .cursorrules** — If you're only using Cursor, its native rules system handles project-specific configuration without an external tool. But it doesn't give you persistent memory, cross-agent coordination, or SDD workflows. Choose Cursor Rules if Cursor is your only agent and you don't need structured development phases.

**Claude Code's native CLAUDE.md** — Claude Code reads project-level markdown files for context, which works well for single-agent setups. But it doesn't share context with other tools, has no memory persistence across sessions, and doesn't support per-phase model assignment. Choose native CLAUDE.md if you only use Claude Code and want minimal tooling overhead.

**Aider** — A terminal-based AI coding assistant that's been around longer and has a more mature codebase. Aider focuses on being a single good agent rather than orchestrating multiple agents. Choose Aider if you want one tool that does everything rather than an ecosystem layer on top of multiple tools.

### Verdict

Gentle-AI is the most practical multi-agent orchestration tool I've seen for AI coding workflows. The 3,800 stars in four months reflect real developer demand for this kind of glue layer — not another AI agent, but the infrastructure that makes existing agents work together. The Go single-binary approach is the right call for a tool that needs to manage configs across 15 different agents on three platforms. If you're using more than one AI coding tool in 2026, Gentle-AI is worth installing today. The SDD workflow alone justifies it, and the Engram memory system is the kind of feature you didn't know you needed until you have it.
