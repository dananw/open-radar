---
name: regent
description: "Regent is version control for AI coding agents — track every edit, blame prompts instead of humans, and audit what Claude Code or Codex did to your codebase."
url: https://github.com/regent-vcs/regent
stars: 661
forks: 46
language: Go
tags: ["ai-agents", "developer-tools", "version-control", "go", "claude-code"]
featured: false
publishedAt: 2026-06-05
---

## Regent

### Overview

Regent (CLI: `rgt`) is version control built specifically for AI coding agents. It hit 661 stars on GitHub in about five weeks, which is impressive for a dev tool in a category that barely existed a year ago. The core idea is dead simple: your AI agent modifies your codebase constantly, but Git only tracks what you commit — not what the agent did between commits. Regent fills that gap.

The project lives under the `regent-vcs` GitHub organization and is written in Go, using BLAKE3 for content-addressed storage and SQLite for fast queries. It currently supports Claude Code, OpenAI Codex CLI, and OpenCode out of the box, with Cursor, Cline, and Continue on the roadmap. The tool installs as a single binary and hooks into your agent's workflow automatically on `rgt init`.

The problem it solves is one every developer using AI agents has felt: "It was working five minutes ago." When Claude Code makes 15 edits across 8 files in a single session, and something breaks, how do you figure out what happened? Git doesn't help because you weren't committing after every agent turn. `git diff` shows you the cumulative changes, not the sequence. Regent gives you a step-by-step audit trail of every tool-using turn — what changed, why, and which prompt caused it.

### Why it matters

AI-assisted coding is no longer a novelty. GitHub's 2025 developer survey showed 92% of developers using AI tools, and the numbers have only grown since. Claude Code, Codex, and similar agent tools now write a significant chunk of production code. But we've given these agents write access to our codebases without giving ourselves proper tools to audit their work. It's the equivalent of giving someone root access and not having an audit log.

Regent addresses a real operational gap. When you're working with AI agents on a team, questions like "who changed this function?" become "which prompt changed this function?" That's a fundamentally different question, and Git can't answer it. The tool creates a DAG (directed acyclic graph) of agent steps, where each step is a content-addressed snapshot linked to a session and a conversation. Think of it as Git's commit graph, but for agent activity rather than human commits.

The broader trend here is that AI coding tools are moving from "autocomplete on steroids" to autonomous agents that run for hours. As that shift happens, the tooling around agent accountability becomes critical. Regent is one of the first serious attempts at building that tooling layer.

### Key Features

**Agent Activity Logging.** Every tool-using turn from Claude Code, Codex, or OpenCode gets captured as a "Step" — a snapshot of what file changed, what the diff looks like, which tool was used, and what the user prompt was. No manual commits required. The hooks configure themselves when you run `rgt init`, so there's zero setup friction.

**Line-Level Blame with Prompts.** `rgt blame src/handler.go:42` tells you not just which session modified that line, but what the user actually asked for. This is the feature that makes Regent genuinely useful rather than just a logging tool. When you're debugging an agent-introduced bug, knowing the exact prompt that caused the change saves enormous time.

**Session Tracking.** Multiple concurrent agent sessions are tracked as separate refs, similar to Git branches. You can filter the log by session with `rgt log --session claude_code:claude-20260502-143021`. This matters when you're running Claude Code on one feature and Codex on another in the same repo — each gets its own audit trail.

**Content-Addressed Storage with BLAKE3.** Every step is hashed with BLAKE3, and content is automatically deduplicated. If two sessions make the same change to the same file, the storage is shared. The architecture mirrors Git's object model but is optimized for agent activity patterns — lots of small, rapid changes rather than deliberate human commits.

**Sub-10ms Query Index.** The SQLite index enables fast lookups across potentially thousands of agent steps. `rgt show <step-hash>` pulls the full context — diff, conversation, tool arguments — in milliseconds. This is important because debugging agent behavior often means jumping between many steps quickly.

**Conversation History That Survives Compaction.** When Claude Code runs `/compact` or `/clear`, the conversation context is lost in the agent's memory but preserved in Regent's storage. This is a subtle but critical feature. Agent sessions can last hours, and compaction happens frequently. Without Regent, the reasoning behind early edits disappears.

**VSCode Extension.** There's a VSCode extension that shows inline blame annotations — not "who wrote this line" in the Git sense, but "which agent step wrote this line and why." Hover tooltips show the full step context. It turns the editor into an agent audit dashboard.

### Use Cases

- **Debugging agent-introduced regressions** — When a Claude Code session breaks tests, use `rgt log` to step through what changed and `rgt blame` to find the specific prompt that caused the regression. No more staring at a giant `git diff` wondering which of 20 edits broke things.

- **Team collaboration with shared agents** — Multiple developers running AI agents on the same codebase. Each session gets its own audit trail, so you can see exactly what Agent A did versus Agent B without combing through Git history.

- **Compliance and code review** — Organizations that need to audit AI-generated code for security or licensing reasons. Regent provides a complete record of what the agent was asked to do and what it actually did, which is more useful than a plain Git diff for compliance reviews.

- **Learning from agent behavior** — New developers can study how experienced users prompt agents effectively by reviewing the conversation history alongside the code changes. It's like watching a senior developer work, but at scale.

- **Rollback and recovery** — When an agent goes off the rails and makes destructive changes, `rgt show` helps identify the exact step where things went wrong, making targeted rollback easier than `git stash` and hope.

### Pros and Cons

Pros:
- Solves a real problem that every developer using AI agents has encountered. The "git for agents" framing is accurate and immediately useful.
- Zero-config setup with auto-configuration for Claude Code, Codex, and OpenCode. Run `rgt init` and forget about it.
- The Go binary is fast and lightweight. No runtime dependencies, no Node modules, no Python environments.
- Content-addressed storage with BLAKE3 means efficient deduplication and integrity verification built into the architecture.

Cons:
- Only supports three agent tools currently. If you're using Cursor, Cline, or Continue, you're out of luck for now.
- The `.regent/` directory adds storage overhead. For projects with heavy agent usage, this could grow large over time, and there's no garbage collection yet.
- Read-only for now — no rewind or fork operations. The roadmap mentions these features, but today you can only inspect, not undo.
- Small community. 661 stars and 46 forks means the ecosystem is early. Expect API changes and occasional rough edges.

### Getting Started

```bash
# Install via Homebrew (macOS/Linux)
brew tap regent-vcs/tap
brew install regent

# Or via Go
go install github.com/regent-vcs/regent/cmd/rgt@latest

# Initialize in your project
cd your-project
rgt init

# Work with Claude Code, Codex, or OpenCode normally — activity is tracked automatically

# See what your agent did
rgt log

# Find which prompt changed a specific line
rgt blame src/handler.go:42

# Inspect a specific step
rgt show <step-hash>

# List active sessions
rgt sessions
```

The hooks auto-configure on `rgt init`. No manual integration needed — just start using your agent normally and Regent captures everything.

### Alternatives

**Aider** — Aider is a popular AI coding assistant that has its own commit-per-change model, where each agent edit gets committed to Git immediately. This approach gives you auditability through Git itself, but it pollutes your commit history with granular agent edits. Regent's approach keeps agent activity in a separate layer, which is cleaner if you want your Git history to reflect intentional human decisions rather than agent steps.

**Cursor's Built-in History** — Cursor maintains its own change history within the editor, which serves a similar debugging purpose. But it's editor-specific, not CLI-based, and doesn't integrate with other agent tools. Regent works across Claude Code, Codex, and OpenCode simultaneously, which matters if your team uses multiple agents.

**Git Worktrees + Frequent Commits** — Some developers solve this by committing after every agent turn or using Git worktrees for agent experiments. It works, but it's manual discipline that nobody maintains consistently. Regent automates the audit trail without requiring any behavior change from developers.

### Verdict

Regent is the right tool at the right time. As AI agents become standard in development workflows, the lack of agent-specific version control is a glaring gap. The tool is early — 661 stars, small community, limited agent support — but the core idea is sound and the implementation is solid. If you're using Claude Code or Codex regularly on anything beyond toy projects, install Regent today. It's a single binary, zero-config, and the `rgt blame` feature alone is worth it. The fact that it's written in Go means it's fast and portable, and the BLAKE3 + SQLite architecture suggests the authors understand the storage problem well. Watch this project — it could become as fundamental to agent-assisted development as Git is to human-authored code.
