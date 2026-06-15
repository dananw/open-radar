---
name: claude-devtools
description: "Visual debugging tool for Claude Code — inspect session logs, tool calls, token usage, subagents, and context window in one UI. 3.5K+ stars, MIT license."
url: https://github.com/matt1398/claude-devtools
stars: 3563
forks: 270
language: TypeScript
tags: ["developer-tools", "claude-code", "ai-debugging", "open-source", "electron"]
featured: false
publishedAt: 2026-06-15
---

## claude-devtools

### Overview

claude-devtools is an open-source desktop application that reveals everything Claude Code hides from you. Built by matt1398, it reads the session transcripts and logs already stored in `~/.claude/` on your machine and reconstructs them into a visual, navigable interface. Since its release in February 2026, the project has accumulated over 3,500 GitHub stars — a signal that developers are hungry for visibility into their AI coding sessions.

The project exists because of a specific change in Claude Code v2.1.20. Anthropic replaced detailed tool output with opaque summaries like "Read 3 files" and "Edited 2 files" — no file paths, no content previews, no line numbers. The community reaction was immediate and vocal. A Hacker News thread documenting the change hit the front page, and developers started looking for workarounds. claude-devtools became that workaround, and then grew into something more: a full observability layer for AI-assisted development.

What makes it genuinely useful is that it requires zero configuration. No API keys. No wrapper scripts. No proxy layers. It reads the same log files Claude Code writes by default. If you've been using Claude Code for months, claude-devtools can open any historical session and show you exactly what happened — every tool call, every file read, every edit, every thinking step that the terminal never displayed.

### Why it matters

The AI coding tool landscape is moving fast, but observability tools haven't kept up. Developers are spending hours each day working alongside AI agents, yet they have almost no insight into what those agents actually do. The terminal shows a summary. The agent makes decisions. Code gets changed. But the "why" and the "how" disappear into collapsed log lines.

This is a real productivity problem. When Claude Code edits the wrong file or takes an unexpected path, developers have to reverse-engineer what happened from minimal output. claude-devtools fills that gap by exposing the full execution trace — tool calls with their inputs and outputs, inline diffs of every edit, syntax-highlighted file reads, and token usage broken down by category. It's the kind of tool that changes how you work with AI agents once you've used it, because you stop guessing and start understanding.

For fullstack developers running Claude Code on complex projects — debugging a NestJS service, refactoring a React component tree, or tracing a Django ORM query — the ability to see exactly what the agent read, searched, and edited is the difference between productive AI assistance and expensive trial and error.

### Key Features

**Context Window Reconstruction.** Every turn in a Claude Code session consumes tokens, but the terminal shows you nothing about how. claude-devtools breaks token usage into seven categories — CLAUDE.md files (global, project, directory), skills, @-mentioned files, tool I/O, thinking, team overhead, and user text. You can see at a glance which files are eating your context and why Claude keeps forgetting things three turns later.

**Compaction Visualization.** When your context window fills up, Claude Code compresses it — and information gets lost. claude-devtools visualizes this entire lifecycle. You see the context fill, the moment it hits the limit, how it compresses, and what was discarded. There's a dedicated "Why did Claude forget?" debugging walkthrough in the docs that explains how to use this to diagnose context loss issues.

**Tool Call Inspector.** Every tool call gets expanded with specialized viewers. Read calls show syntax-highlighted file content with line numbers. Edit calls render inline diffs with added/removed highlighting. Bash calls show full output. Subagent calls display as nested execution trees. This is the feature that most developers open claude-devtools for — the ability to see exactly what the agent did, not just a one-line summary.

**Team & Subagent Trees.** Claude Code can spawn subagents that handle tasks independently. In the terminal, this activity is mostly invisible. claude-devtools renders isolated execution trees per agent, complete with tool traces, token metrics, duration, and cost. Nested agents render recursively, so you can follow the full chain of delegation.

**SSH Remote Session Inspection.** If you run Claude Code on remote machines — a dev server, a CI runner, a cloud instance — claude-devtools can connect over SSH and read the session logs there. It reads your `~/.ssh/config`, supports agent forwarding and key authentication. This is particularly useful for teams where Claude Code runs on shared infrastructure.

**Project Memory Viewer.** Claude Code stores per-project memory in `~/.claude/projects/<project>/memory/`. claude-devtools surfaces this as a sidebar with layer navigation, full Markdown rendering, frontmatter metadata cards, and Obsidian-style wikilinks for cross-layer navigation. You can open any layer in your editor of choice — VS Code, Cursor, Zed, Xcode, or just copy the path.

**Notification Triggers.** Get system notifications when Claude Code accesses `.env` files, hits tool errors, exceeds token thresholds, or matches custom regex patterns. This is a security-conscious feature — you know immediately if the agent touches sensitive files, even if the terminal output is collapsed.

### Use Cases

- **Debugging unexpected code changes** — When Claude Code edits the wrong file or introduces a regression, open claude-devtools to see the exact sequence of tool calls, what the agent searched for, and why it made those decisions. Saves hours of reverse-engineering from git diffs.

- **Token budget optimization** — Fullstack projects with large codebases eat through context windows fast. Use the token attribution view to identify which files and tools consume the most tokens, then adjust your CLAUDE.md to exclude irrelevant directories.

- **Security auditing AI agent activity** — If you're running Claude Code on production-adjacent code, the notification triggers and tool call history let you verify the agent never touched files it shouldn't have. Essential for compliance-conscious teams.

- **Training and onboarding** — New team members learning to work with Claude Code can study past sessions to understand effective prompting patterns, tool usage, and how the agent approaches different types of tasks.

- **Multi-agent workflow debugging** — When Claude Code spawns subagents for parallel tasks, the execution tree view shows which agent did what, how long it took, and where bottlenecks occurred. Useful for optimizing complex refactoring workflows.

### Pros and Cons

Pros:

- **Zero configuration required.** It reads existing Claude Code logs — no API keys, no proxy setup, no wrapper scripts. Install and it works immediately with all your historical sessions.

- **Genuinely fills a gap.** There's no other tool that does this. The alternative is `--verbose` mode, which dumps raw JSON and thousands of lines of internal noise. claude-devtools gives you structured, filterable, navigable output.

- **Cross-platform with Docker support.** macOS, Linux, Windows, and Docker deployment. The Docker option is particularly useful for teams — deploy it as a shared service and anyone can inspect sessions.

- **Active development and community.** 3,500+ stars in four months, mentioned in the Awesome Claude Code list, and the developer responds to issues quickly. The documentation site at claude-dev.tools is thorough.

Cons:

- **Electron-based.** Like many desktop developer tools, it's built on Electron, which means a higher memory footprint than a native app. On a machine already running Claude Code, VS Code, and a browser, this adds to the load.

- **macOS-centric experience.** While it works on Linux and Windows, some features — like the "Open in Finder" launcher and certain notification integrations — are more polished on macOS.

- **Read-only by design.** You can inspect everything but can't modify sessions or inject commands. This is a feature for security, but some developers might want the ability to replay or fork sessions.

### Getting Started

```bash
# Install via Homebrew (macOS)
brew install --cask claude-devtools

# Or download directly from GitHub releases
# https://github.com/matt1398/claude-devtools/releases/latest

# Docker deployment
git clone https://github.com/matt1398/claude-devtools.git
cd claude-devtools
docker compose up
# Open http://localhost:3456

# The app reads from ~/.claude/ by default
# No additional configuration needed
```

### Alternatives

**Claude Code `--verbose` flag** — The built-in verbose mode dumps raw JSON output including internal system prompts, tool inputs, and token counts. It's free and requires no installation, but the output is unstructured, noisy, and impractical for daily use. Choose this if you need a quick one-off look at a specific tool call and don't want to install anything.

**Claude Code CLI with `--output-format json`** — Outputs structured JSON that you can pipe to jq or process with scripts. More structured than `--verbose` but still requires manual parsing. Useful if you want to build custom tooling or integrate session data into CI pipelines, but not a replacement for a visual debugger.

**LangSmith** — Anthropic's observability platform for LLM applications, with tracing, evaluation, and monitoring. It's designed for developers building with the Anthropic API directly, not for Claude Code sessions. Choose LangSmith if you're building custom AI applications and need production monitoring, not desktop session debugging.

### Verdict

claude-devtools is the tool I'd recommend to anyone using Claude Code more than an hour a day. The context window reconstruction alone justifies the installation — once you can see exactly what's eating your tokens, you write better CLAUDE.md files and stop wasting cycles on context overflow. The tool call inspector is the feature that gets the most "oh, that's what happened" reactions in the community. It's rare for an open-source tool to be this polished at 3,500 stars, and the fact that it works retroactively on all your historical sessions means you get value from the moment you install it. If you're a fullstack developer running Claude Code on anything non-trivial — a monorepo, a multi-service architecture, a project with more than a hundred files — this is a must-have addition to your toolkit.
