---
name: beads
description: "Beads is a Go-powered distributed graph issue tracker that gives AI coding agents persistent structured memory — replacing messy markdown plans with dependency-aware task graphs."
url: https://github.com/gastownhall/beads
stars: 24570
forks: 1647
language: Go
tags: ["ai-agents", "developer-tools", "issue-tracking", "go", "claude-code"]
featured: false
publishedAt: 2026-06-17
---

## Beads

### Overview

Beads is a distributed graph issue tracker designed specifically for AI coding agents. It hit 24,000 GitHub stars by mid-2026, which is remarkable for a developer tool that most human developers have never heard of. That's because it's not built for humans — it's built for the agents that increasingly write, debug, and ship code on our behalf.

The project comes from Steve Yegge and the Gastown Hall team. Yegge is a legendary figure in software engineering — former Google engineer, Amazon engineer, and the author of the infamous "Platform Rant" memo at Amazon. He's been vocal about the shift toward AI-assisted development, and Beads is his bet on what agents actually need: not another chat interface, but a persistent, structured memory system that survives context window limits.

The core problem Beads solves is deceptively simple. AI coding agents lose context. Claude Code, Codex, Cursor — they all hit the same wall. You give them a complex multi-file refactoring task, they start strong, then halfway through they forget what they were doing. They create MEMORY.md files that nobody reads, markdown TODO lists that get stale, and issue descriptions that don't encode dependencies. Beads replaces all of that with a version-controlled SQL database (powered by Dolt) where every task has an ID, dependencies, assignees, and a full audit trail. The agent queries `bd ready` to see what's unblocked, claims a task with `bd update <id> --claim`, and closes it when done. Simple workflow, persistent memory, zero context loss.

### Why it matters

We're in the middle of a fundamental shift in how software gets built. In 2025, AI coding agents were novelties. By mid-2026, they're handling meaningful chunks of production work — writing tests, refactoring modules, fixing bugs, even implementing features end-to-end. But the coordination problem is brutal. Give an agent a 20-task project and it'll complete 6 tasks before its context window fills up and it starts repeating itself or losing the thread.

Beads addresses this by treating agent memory as a first-class engineering problem, not an afterthought. The Dolt-powered database gives agents the same kind of structured, queryable state that human project managers get from Jira — but with zero merge conflicts, hash-based IDs that prevent collisions in multi-agent workflows, and a "memory decay" feature that summarizes old closed tasks to preserve context window space. This is the infrastructure layer that multi-agent development needs.

The timing connects to a broader industry trend. Companies like Anthropic, OpenAI, and Google are shipping increasingly capable coding agents, but the tooling around those agents is still primitive. Most teams duct-tape together markdown files, custom scripts, and prayer. Beads offers a principled alternative, and the 24K-star adoption suggests the developer community agrees this problem needs solving.

### Key Features

**Dolt-Powered Version Control.** Beads uses Dolt, a version-controlled SQL database with cell-level merge and native branching. Every task change is tracked with full history, and you can branch your task state just like you branch code. This means agents working on separate features can maintain independent task graphs and merge them without conflicts — something markdown-based systems can't do.

**Dependency-Aware Task Graphs.** Tasks aren't flat lists. Beads supports graph links — `blocks`, `relates_to`, `duplicates`, `supersedes`, and `replies_to` — so agents understand the structure of work. Running `bd ready` returns only tasks whose blockers are resolved. This prevents agents from working on things that depend on unfinished prerequisites, which is one of the most common failure modes in agent-driven development.

**Zero-Conflict Multi-Agent Workflows.** Hash-based IDs (`bd-a1b2`) mean two agents can create tasks simultaneously without collisions. In multi-agent setups — say, one agent handling frontend and another handling backend — this eliminates the merge conflicts that plague shared markdown files. The atomic claim mechanism (`bd update <id> --claim`) ensures no two agents grab the same task.

**Semantic Memory Decay.** Old completed tasks get summarized automatically, preserving context window space without losing institutional knowledge. This is critical for long-running projects where an agent might need to reference decisions made weeks ago without loading every closed task into its context. The summaries capture what was decided and why, not just that something was done.

**Universal Agent Integration.** Beads ships with setup commands for Claude Code (`bd setup claude`), Codex CLI (`bd setup codex`), Cursor, Factory.ai, and more. It generates agent-specific instruction files and hooks so agents discover the Beads workflow automatically. No manual configuration — run the setup command and your agent starts using structured task tracking immediately.

**Hierarchical Epic Support.** Tasks support nested IDs for epics: `bd-a3f8` (Epic) → `bd-a3f8.1` (Task) → `bd-a3f8.1.1` (Sub-task). This maps naturally to how agents decompose complex work. An agent can claim an epic, break it into sub-tasks, and track progress at every level — something flat TODO lists can't express.

**Stealth and Git-Free Modes.** Run `bd init --stealth` for personal use on shared projects without committing files. Or go fully git-free by setting `BEADS_DIR` and disabling git operations entirely. This flexibility matters for monorepos, CI/CD pipelines, and teams using non-git VCS like Sapling or Jujutsu.

### Use Cases

- **Multi-file refactoring projects** — An agent needs to update 15 files across 3 packages. Beads tracks each file change as a dependency-linked task, so when context resets, the agent knows exactly where it left off.
- **Multi-agent development teams** — Frontend agent handles React components, backend agent handles API endpoints. Beads coordinates their work through shared task graphs with zero merge conflicts.
- **Long-running feature development** — A feature spanning multiple sessions gets tracked as an epic with sub-tasks. Memory decay keeps old context summarized while preserving key decisions.
- **Open-source project maintenance** — Contributors use `bd init --contributor` to route planning to a separate repo. Maintainers see coordinated task graphs without experimental work polluting PRs.
- **CI/CD integration** — Agents in pipelines use Beads to track build failures, test results, and deployment tasks as structured, queryable state instead of parsing log files.

### Pros and Cons

Pros:
- Solves a real, painful problem that every team using AI coding agents has encountered. The dependency-aware graph is genuinely better than markdown TODO lists for agent coordination.
- Dolt backend gives you real version control for your task state — branch, merge, diff, and sync across machines. No other agent memory tool offers this level of rigor.
- Extremely well-adopted at 24,570 stars with active development (475 open issues, daily commits). The community is building integrations, UIs, and extensions.
- Works with every major coding agent out of the box. The `bd setup` commands generate agent-specific configurations automatically.

Cons:
- Dolt dependency adds complexity. Embedded mode is simple, but server mode requires running a Dolt SQL server, which is another thing to manage and secure.
- The learning curve is steeper than "just use a markdown file." Teams need to understand graph links, hierarchical IDs, and the claim/close workflow. For simple projects, it might be overkill.
- 475 open issues suggest the API surface is still evolving. Breaking changes are possible as the project matures. Pin your version if using in production.

### Getting Started

```bash
# Install via Homebrew (macOS/Linux)
brew install beads

# Or via npm
npm install -g @beads/bd

# Initialize in your project
cd your-project
bd init

# Set up for your coding agent
bd setup claude    # For Claude Code
bd setup codex     # For Codex CLI

# Create your first task
bd create "Implement auth middleware" -p 1

# Check what's ready to work on
bd ready

# Claim and work on a task
bd update bd-a1b2 --claim

# Store a project memory
bd remember "We decided to use JWT instead of sessions for auth"

# Close when done
bd close bd-a1b2 "Implemented with JWT, added refresh token rotation"
```

### Alternatives

**Linear** — A polished issue tracker with AI features and great developer UX. Linear is better for human-managed teams that want beautiful UI and tight GitHub integration. But it's SaaS-only, doesn't have agent-native workflows, and can't be queried programmatically by coding agents the way Beads can. Choose Linear when humans are the primary operators.

**Plane** — An open-source project management tool that's closer to Jira than Beads. Plane has boards, sprints, and a web UI, but lacks the agent-optimized workflow, dependency graph, and Dolt-powered versioning. Better choice for teams that need traditional project management with an open-source license.

**Claude Code's built-in memory (MEMORY.md)** — The default approach for most Claude Code users. Simple, zero-setup, and works for small tasks. But it's a flat text file with no dependency tracking, no multi-agent coordination, and no structured queries. Once your project has more than a handful of tasks, MEMORY.md becomes a liability. Beads is the upgrade path when you outgrow it.

### Verdict

Beads is the most important infrastructure tool for AI-assisted development that most developers haven't tried yet. The 24,570 stars reflect genuine demand — teams are hitting the agent coordination wall and Beads is the first tool that treats the problem with engineering rigor instead of markdown hacks. It's overkill for someone using Claude Code to fix typos, but if you're running multi-file refactors, multi-agent workflows, or any project where an agent needs to remember what it did three sessions ago, Beads is the right tool. The Dolt backend, dependency graphs, and universal agent support make it the strongest option in a category that barely existed 12 months ago. Install it, run `bd init`, and you'll wonder how you ever tolerated MEMORY.md files.
