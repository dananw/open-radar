---
name: re_gent
description: "re_gent is a Go-based version control system for AI coding agents that tracks every edit, prompt, and conversation — giving developers git-level auditability over agent activity."
url: https://github.com/regent-vcs/regent
stars: 736
forks: 51
language: Go
tags: ["developer-tools", "version-control", "ai-agents", "golang", "claude-code", "audit"]
featured: false
publishedAt: 2026-06-16
---

## re_gent

### Overview

re_gent hit 736 stars in under seven weeks, which tells you something about the problem it solves. Created on April 30, 2026, by the regent-vcs team, this Go-based tool fills a gap that most developers didn't realize they had until they felt the pain: version control for AI coding agents. The repo is Apache 2.0 licensed, actively maintained (last push was today), and already compatible with Claude Code, OpenAI Codex CLI, and OpenCode.

The premise is dead simple. When you use an AI agent to write code — Claude Code, Codex, whatever — that agent makes dozens of changes to your codebase in a single session. Some of those changes are brilliant. Some are regressions. And when something breaks, your only option is to dig through git diffs that don't tell you *why* a change was made, only *what* changed. re_gent gives you the missing layer: it records every agent tool call, links each line of code back to the prompt that generated it, and preserves the conversation context that led to each decision. It's like `git blame`, but instead of showing you a commit hash, it shows you the exact prompt and agent session that wrote that line.

The tool stores agent activity in a `.regent/` directory (similar to `.git/`), using BLAKE3 content-addressed hashing for deduplication and a SQLite index for fast queries — sub-10ms lookups according to the maintainers. Every tool-using turn creates a "Step," a snapshot of what changed, why, and who asked. Steps form a DAG (directed acyclic graph), with each agent session tracked as its own branch. Common ancestors deduplicate automatically. The result is git-level auditability for agent activity, without replacing git itself.

### Why it matters

AI coding agents are no longer experimental tools. Claude Code, Codex, Cursor, Copilot — they're writing real code in real production codebases every day. A recent GitHub survey showed that over 75% of developers are now using AI coding assistants in their workflow. But here's the uncomfortable truth: we gave agents write access to our codebases without giving ourselves the tools to audit what they do.

This creates a governance nightmare. When your AI agent refactors a payment handler and introduces a subtle bug, how do you trace it back? Git shows you a diff, but it doesn't tell you that the change came from a prompt asking the agent to "optimize the error handling." It doesn't show you the conversation where the agent decided to remove a validation check because it thought it was redundant. re_gent captures all of that context automatically.

For teams using AI agents at scale — and that's increasingly every team — this isn't a nice-to-have. It's becoming a compliance requirement. When a regulator asks why a line of code was changed, "the AI did it" isn't an acceptable answer. re_gent gives you the audit trail: which agent session, which prompt, which tool call, at what time. That's the kind of accountability that makes AI-assisted development viable in regulated industries like finance, healthcare, and government.

### Key Features

**Automatic Activity Tracking.** Once you run `rgt init`, re_gent hooks into your AI agent's tool calls transparently. No manual commits, no remembering to log things. Every edit, write, and bash command your agent executes gets captured as a Step with full context. You work normally with Claude Code or Codex, and re_gent records everything in the background.

**Prompt-Level Blame.** The `rgt blame` command goes beyond traditional git blame. Instead of showing you a commit author and date, it shows you the exact prompt that generated each line, the agent session it came from, and the tool that was used. Run `rgt blame src/handler.go:42` and you'll see something like: "Prompt: 'Add error handling to the request handler', Session: claude-20260502-143021, Tool: Edit." That's forensic-level code provenance.

**Conversation Context Preservation.** AI agents often use `/compact` or `/clear` to manage context windows, which destroys the conversation history that led to code changes. re_gent preserves this context independently. Even after your agent clears its memory, you can still pull up the full conversation that produced a given change with `rgt show <step-hash>`.

**Multi-Session Tracking.** Modern development often means running multiple agent sessions simultaneously — one for the frontend, one for the backend, one for tests. re_gent tracks each session as a separate ref with its own branch in the DAG. Run `rgt sessions` to see all active sessions, and `rgt log --session <id>` to filter history by session. No more wondering which agent made which change when you have three running at once.

**BLAKE3 Content-Addressed Storage.** All objects are stored using BLAKE3 hashing with automatic deduplication. If two agent sessions make the same change to a file, the content is stored only once. The SQLite index enables sub-10ms lookups, so even on large projects with thousands of agent steps, queries stay fast. The `.regent/` directory stays lean.

**Git-Complementary Design.** re_gent explicitly does not replace git. It complements it. You still use git for your human workflow — branches, PRs, merges, releases. re_gent sits alongside, capturing the agent layer that git can't see. The `.regent/` directory is gitignore-compatible, and there's a `.regentignore` file for excluding paths from tracking.

**VSCode Extension.** A companion VSCode extension provides inline blame annotations showing which agent step modified each line, hover tooltips with full step context, and a session timeline view in the sidebar. Install from VSIX or build from source. It requires the `rgt` CLI to be installed and initialized in your project.

### Use Cases

- **Debugging agent-introduced regressions** — When your AI agent's refactor breaks something, use `rgt blame` to trace the exact line back to the prompt that caused it, then `rgt show` to see the full conversation context around that decision.
- **Code review for AI-generated PRs** — Reviewers can see not just what changed, but why the agent made each change. This transforms code review from "does this diff look right" to "was this the right approach given the prompt."
- **Compliance and audit trails** — In regulated industries, you need to demonstrate why every line of code exists. re_gent provides a complete audit chain from prompt to code, satisfying requirements that "the AI wrote it" alone cannot.
- **Multi-agent coordination** — When running parallel agent sessions (frontend, backend, tests), re_gent's session tracking lets you understand the blast radius of each agent's changes and resolve conflicts with full context.
- **Onboarding and knowledge transfer** — New team members can use `rgt log` to understand not just the current state of the code, but the reasoning behind how it got there. It's like having the full development history with annotations.

### Pros and Cons

Pros:
- Solves a real, immediate problem that every team using AI agents will face — there's no real alternative for agent-level audit trails right now.
- Git-compatible philosophy means zero disruption to existing workflows. You add re_gent on top of git, not instead of it.
- Go implementation means a single binary with no runtime dependencies. Install via Homebrew, `go install`, or download a release. Works on macOS, Linux, and Windows.
- BLAKE3 + SQLite architecture is proven and fast. Content-addressed storage with sub-10ms queries means no performance penalty even on large projects.

Cons:
- At 736 stars and under two months old, the project is still young. The roadmap lists features like rewind/fork operations and session sharing as planned, not shipped.
- Currently only supports Claude Code, Codex CLI, and OpenCode. Cursor, Cline, and Continue are listed as "planned." If your team uses a different agent, you're out of luck for now.
- The `.regent/` directory adds disk overhead on top of `.git/`. For small projects this is negligible, but repos with thousands of agent-generated steps could see meaningful storage growth.

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

# See what happened
rgt log
rgt blame src/handler.go:42
rgt show <step-hash>

# List active sessions
rgt sessions

# Filter log by session
rgt log --session claude_code:claude-20260502-143021
```

### Alternatives

**Git** — Obviously, git tracks code changes. But git has no concept of agent sessions, prompts, or tool calls. A git commit tells you who pushed code and when, but not which AI prompt generated it or what conversation led to the decision. re_gent fills this specific gap. Use both together — git for your human workflow, re_gent for your agent workflow.

**Aider's chat history** — Aider, the AI pair programming tool, keeps a record of conversations in its chat history files. But this is Aider-specific, doesn't integrate with other agents, and doesn't provide line-level blame or content-addressed storage. If you're using Claude Code or Codex specifically, Aider's approach doesn't apply.

**Manual logging and screenshots** — Some teams solve this by screenshotting agent sessions or copy-pasting conversations into docs. This is fragile, doesn't scale, and makes searching impossible. re_gent automates the entire process and makes the data queryable. If you're currently documenting agent activity by hand, this tool eliminates that busywork entirely.

### Verdict

re_gent is the kind of tool that makes you wonder how you lived without it once you start using it. The problem it solves — "what did my AI agent actually do to this codebase?" — is one that every developer working with coding agents has faced, usually at the worst possible time (debugging a production issue at 2am). The Go implementation is clean, the CLI is intuitive if you know git, and the architecture (BLAKE3 + SQLite DAG) is solid enough to handle real workloads. At 736 stars and growing fast, the community is clearly resonating with the concept. The main risk is maturity — the project is under two months old, and features like rewind and session sharing are still on the roadmap. But for teams that are already running AI agents in production, installing re_gent today is a no-brainer investment in future debugging sanity. If you use Claude Code, Codex, or OpenCode on anything beyond toy projects, add `rgt init` to your workflow now.
