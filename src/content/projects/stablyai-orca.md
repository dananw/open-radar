---
name: orca
description: "Orca is an open-source AI orchestrator IDE that runs Claude Code, Codex, and 20+ CLI agents in parallel across isolated git worktrees. 4.3K stars, TypeScript."
url: https://github.com/stablyai/orca
stars: 4358
forks: 283
language: TypeScript
tags: ["ai-agents", "ide", "developer-tools", "parallel-agents", "worktrees"]
featured: false
publishedAt: 2026-06-08
---

## Orca

### Overview

Orca is an open-source desktop IDE built for developers who run multiple AI coding agents at the same time. It hit 4,300 GitHub stars in under three months after its March 2026 launch, and it's still climbing fast. The core idea is simple but powerful: instead of running Claude Code in one terminal tab and Codex in another, Orca gives you a unified workspace where every agent gets its own isolated git worktree, and you can see all of them side by side.

The project comes from Stably AI, a team that clearly eats their own dog food — the repo itself shows rapid iteration with 283 forks and an active community on Discord. What sets Orca apart from just using tmux with multiple terminals is the integration layer. It's not just a terminal multiplexer with a pretty face. It has built-in source control, GitHub integration that links PRs and issues to worktrees automatically, SSH support for remote agents, and a mobile companion app so you can check on your agents from your phone.

The problem Orca solves is one that's emerged fast in 2026: developers are increasingly using AI agents as their primary coding interface. A typical workflow might involve running Claude Code on a feature branch, Codex on a bugfix, and OpenCode on a refactor — all simultaneously. Managing three or four separate terminal sessions, each with their own git state, is a mess. Orca collapses that chaos into a single interface where each agent is isolated but visible.

### Why it matters

The AI coding agent ecosystem has exploded in the past year. Claude Code, Codex, OpenCode, Gemini CLI, Grok, Hermes Agent, and a dozen others are all competing for developer mindshare. The problem is that each one is a standalone CLI tool. There's no standard way to orchestrate them, compare their outputs, or run them in parallel without manually managing git worktrees and terminal sessions.

Orca fills that gap. It's agent-agnostic — it works with any CLI agent, not just a curated list. You bring your own subscription (Claude Code, Codex, whatever) and Orca provides the orchestration layer. This matters because the "best" AI agent changes depending on the task. Claude Code might be better for complex refactors while Codex handles boilerplate faster. Running them side by side and comparing outputs is a workflow that's only going to become more common.

The broader trend here is the shift from "AI as autocomplete" to "AI as a parallel workforce." Orca is the first IDE that treats this shift seriously. Its worktree-native architecture means each agent literally gets its own copy of the repo — no merge conflicts, no stashing, no branch juggling. That's a fundamentally different mental model from how most developers work today.

### Key Features

**Worktree-Native Architecture.** Every feature or task gets its own git worktree automatically. When you spin up a new agent, it's working in an isolated copy of the repo. No stashing, no branch switching, no "wait, which terminal am I in?" confusion. When the agent finishes, you review the diff and merge. This is the single most important feature — it makes parallel agents practical instead of terrifying.

**Multi-Agent Terminals.** Run Claude Code, Codex, OpenCode, Grok, Gemini CLI, or any other CLI agent side by side in tabs and split panes. The interface shows which agents are active at a glance. You can drag files directly into an agent's prompt, which is surprisingly useful when you want to point a specific agent at a specific file.

**Built-In Source Control.** Review AI-generated diffs, make quick edits, and commit without leaving the IDE. The diff viewer lets you annotate AI-generated changes — you can highlight sections and add comments before merging. This is critical for maintaining code quality when agents are doing the writing.

**GitHub and Linear Integration.** PRs, issues, and GitHub Actions checks are linked to each worktree automatically. If you're using Linear for project management, that's integrated too. This means you can go from "issue assigned" to "agent working" to "PR ready for review" without context-switching between tools.

**Mobile Companion App.** Control your agents from your phone. This sounds gimmicky but it's actually useful — you can start a long-running agent task, go make coffee, and get a notification on your phone when it's done. Available on iOS and Android.

**SSH Support.** Connect to remote machines and run agents on them directly from Orca. If your dev environment lives on a remote server or you need to run agents on more powerful hardware, you can do it without leaving the IDE.

**Orca CLI.** Script Orca from the command line for automation. Start worktrees, launch agents, and manage workflows programmatically. This is where the tool starts to feel like infrastructure rather than just an IDE.

### Use Cases

- **Parallel feature development** — Run Claude Code on a new React component while Codex handles the API endpoints in a separate worktree. Review both diffs when they're done and merge the best parts.
- **Agent comparison** — Give the same task to three different agents and compare their outputs side by side. Useful for building intuition about which agent handles which type of work best.
- **Long-running refactors** — Start a large refactoring task in one agent, switch to another agent for quick bugfixes, and come back when the refactor finishes. The notification system means you don't have to babysit it.
- **Remote development** — Connect to a powerful remote server via SSH and run agents there while monitoring from your local machine. Good for large codebases that need more compute than your laptop provides.
- **Code review workflows** — Use the built-in diff viewer and annotation tools to review what agents produced before merging. The GitHub integration means PRs are created automatically.

### Pros and Cons

Pros:
- Agent-agnostic design means you're not locked into any single AI provider. Works with 20+ CLI agents out of the box and supports any CLI tool.
- Worktree-native architecture is the right abstraction for parallel agents. It eliminates the git state management headaches that make multi-agent workflows painful.
- Active development and community — 4,300 stars in under three months, frequent releases, and an engaged Discord community.
- Mobile companion app is a genuinely useful addition, not just a marketing feature.

Cons:
- Beta software with 306 open issues as of June 2026. Expect rough edges, especially around edge cases in worktree management.
- Desktop-only for the main IDE (Electron-based). The mobile app is a companion, not a standalone editor.
- No built-in AI — you need your own subscriptions to Claude Code, Codex, or other agents. This is a feature, not a bug, but it means the tool is useless without paid agent access.
- Telemetry is on by default (anonymous usage data). You can opt out, but it's worth knowing.

### Getting Started

```bash
# Install via Homebrew (macOS)
brew install --cask stablyai/orca/orca

# Or download from the website
# https://onOrca.dev

# Arch Linux
yay -S stably-orca-bin

# After installation, launch Orca and configure your agents
# It will detect installed CLI agents automatically (claude, codex, etc.)
```

Once installed, create a new worktree by clicking "New Feature" in the sidebar. Orca will create an isolated git worktree and open a terminal pane where you can launch your preferred agent. You can split the view to run multiple agents side by side.

For CLI automation:

```bash
# Orca ships with its own CLI for scripting
orca worktree create my-feature
orca agent launch --worktree my-feature --agent claude-code
```

### Alternatives

**Cursor** — The most popular AI-native IDE, but it's a single-agent experience. Cursor integrates one AI assistant deeply (its own model plus Claude/GPT), while Orca orchestrates multiple independent agents. Choose Cursor if you want a polished single-agent experience; choose Orca if you want to run multiple agents in parallel.

**Windsurf (Codeium)** — Another AI-native IDE with deep inline assistance. Windsurf focuses on the "AI as pair programmer" model where the AI works alongside you in a single editor. Orca takes a different approach — agents work independently in their own worktrees and you review their output. Different philosophy entirely.

**tmux + manual worktrees** — The DIY approach. You can set up git worktrees manually and run agents in tmux panes. This works fine for two agents but becomes unmanageable at three or four. Orca adds the integration layer (GitHub, Linear, diff review, notifications) that makes the multi-agent workflow sustainable.

### Verdict

Orca is the first tool that takes the "multiple AI agents working in parallel" workflow seriously as a first-class use case. The worktree-native architecture is the right design choice — it's the same mental model that experienced Git users already understand, applied to a new problem. At 4,300 stars and growing fast, it's clear that developers are hungry for this kind of orchestration layer. If you're running more than one AI coding agent regularly, Orca is worth installing today. It's beta software with rough edges, but the core workflow is solid and the team ships fast. The mobile companion app and CLI automation push it beyond "fancy terminal multiplexer" into genuine infrastructure territory.
