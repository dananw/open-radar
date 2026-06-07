---
name: munder-difflin
description: "Munder Difflin is a local multi-agent harness for Claude Code that turns terminal sessions into a self-coordinating team with a visual office floor and GOD orchestrator."
url: https://github.com/chaitanyagiri/munder-difflin
stars: 420
forks: 43
language: TypeScript
tags: ["ai-agents", "claude-code", "multi-agent", "electron", "react"]
featured: false
publishedAt: 2026-06-07
---

## Munder Difflin

### Overview

Munder Difflin is a desktop app that wraps real Claude Code terminal sessions as fully-capable AI agents, wires them into a hive mind, and puts a GOD orchestration agent in charge — all visualized as characters from The Office sitting at desks on a 2D office floor. It hit 420 GitHub stars within a week of its May 31, 2026 launch, which says something about how badly developers want better multi-agent tooling.

The project is built by Chaitanya Giri, and the tech stack reads like a fullstack web developer's dream: React, TypeScript, Electron, Pixi.js, xterm.js, node-pty, and Zustand for state management. The visual aesthetic is Animal Crossing meets Earthbound meets SNES menu UI — pixel-snapped, chunky, and surprisingly functional. Each of the 15 avatars is a cast member from The Office, differentiated by hair, skin, and shirt color recipes.

The core problem Munder Difflin solves is coordination. If you've ever run multiple Claude Code sessions side by side — one for frontend, one for backend, one for tests — you know the pain. They don't talk to each other. They duplicate work. They step on each other's files. Munder Difflin gives each agent its own mailbox, long-term memory, and identity, then routes work between them through a central orchestrator you talk to. The GOD agent handles routine coordination autonomously and only escalates critical decisions (spend, destructive ops, scope changes) to you.

### Why it matters

The multi-agent coding space is exploding right now. OpenAI's Codex, Anthropic's Claude Code, Google's Jules — every major lab is shipping agent tools. But the coordination layer is missing. Most developers using these tools today run isolated sessions and manually ferry context between them. That's like having a team of developers who can't speak to each other and playing telephone yourself.

Munder Difflin takes a different approach: treat every Claude Code session as a real team member with a desk, a mailbox, and memory. The GOD orchestrator acts as a project manager — it reads every request, resolves routine ones, and only bothers you when something needs human judgment. This mirrors how real engineering teams work, and it's the first open-source tool I've seen that does it with this level of polish.

The timing matters too. Claude Code's hook system (PreToolUse, PostToolUse, Stop) gives external tools deep visibility into what agents are doing. Munder Difflin leverages these hooks to drive avatar states, track tool usage, and implement a cost/runaway circuit breaker. As more agent CLIs add hook systems, this architecture becomes portable.

### Key Features

**GOD Orchestrator Agent.** The central supervisor that sits in "Michael's office" and handles all coordination. You talk to it, it talks to your agents. It reads every request, resolves routine ones autonomously, and escalates only critical items into an approvals queue. This keeps the system fully autonomous while keeping you in control of the important decisions.

**Visual Office Floor.** A Pixi.js scene with a Tiled office map where agents appear as avatars walking to stations as they work. When the hive routes a message, an envelope flies from sender to recipient with color-coded speech acts. Escalations fly to the door. It sounds gimmicky but it's genuinely useful — you can see the state of your agent fleet at a glance without reading logs.

**On-Disk Hive Layer.** The multi-agent coordination happens through plain files in a local git repo. Each agent writes to its own outbox, the router delivers into recipients' inboxes, and a shared blackboard keeps everyone aligned. The single-committer design avoids index.lock corruption. No databases, no cloud services — just files you can inspect and debug.

**Per-Agent Memory with Semantic Recall.** Each agent gets markdown-first long-term memory that persists across sessions. A semantic recall index means agents remember what they learned and recall it in milliseconds. The MemoryReflector condenses memory over time to prevent unbounded growth. The whole thing degrades gracefully if the index isn't installed.

**Cost and Token Telemetry.** Reads Claude Code's JSONL transcripts to surface real token counts and estimated USD cost per agent per session. Set token budgets per agent and watch live fleet monitoring track consumption. The circuit breaker implements a steer-constrain-stop ladder — it nudges, then constrains, then stops agents that loop, storm errors, or blow their budget.

**Per-Agent Git Worktrees.** Toggle "Git isolation" when adding an agent and it auto-provisions a dedicated worktree. Agents never collide on branches. This solves one of the most painful multi-agent problems — two agents trying to edit the same file on the same branch.

**Task Kanban with Dependencies.** A dependency-aware kanban board in the Command Center lets you assign tasks to agents, track status across todo/doing/blocked/done, and wire dependencies so work starts in order. Combined with GitHub issue ingestion via the gh CLI, you can pull open issues and assign them to agents with one click.

### Use Cases

- **Multi-file refactoring** — Assign frontend changes to Agent A, backend API updates to Agent B, and test updates to Agent C. The GOD orchestrator coordinates handoffs so the API contract stays in sync across all three.
- **Fullstack feature development** — One agent handles the React component, another builds the NestJS endpoint, a third writes the Django model. They communicate through the hive's mailbox system instead of you copy-pasting context.
- **Code review and QA pipeline** — An agent writes code, another reviews it, a third runs tests. The GOD agent routes feedback and escalates only when something breaks.
- **Learning and exploration** — Spawn agents to explore different approaches to the same problem. Watch them work on the office floor, compare their outputs, and pick the best approach.
- **Automated issue triage** — Pull GitHub issues into the Command Center, assign them to agents, and track progress on the kanban board. The CI status watcher shows pass/fail for GitHub Actions runs.

### Pros and Cons

Pros:

- The visual office floor is surprisingly effective for monitoring agent state. You can tell at a glance which agents are working, which are idle, and which need attention — no log diving required.
- The hive's file-based coordination is debuggable and transparent. Every message is a file you can read. Every agent's memory is a markdown file you can edit. No black boxes.
- Cost controls are real and practical. The circuit breaker with steer-constrain-stop escalation prevents runaway token spend, which is a genuine concern when running multiple Claude Code sessions.
- The tech stack (React, TypeScript, Electron, Pixi.js) is familiar territory for fullstack web developers. Contributing doesn't require learning exotic frameworks.

Cons:

- Claude Code dependency is significant. The harness wraps the `claude` CLI, so you need an active Claude Code subscription. The roadmap mentions pluggable agent CLIs (Claw Code, opencode, Codex CLI) but those aren't shipped yet.
- macOS-first development means Windows and Linux support is untested. The README explicitly calls this out, though v0.2.0 did add a Windows fix for keeping the hive alive behind the lock screen.
- The Office-themed pixel art assets have a non-commercial license (LimeZu FREE VERSION). To commercialize, you'd need to replace the assets or buy a paid license.
- Electron overhead is real. Running multiple Claude Code sessions inside Electron with Pixi.js rendering and node-pty processes will eat RAM. Not ideal for machines with limited resources.

### Getting Started

```bash
# Prerequisites: Node.js 18+, Claude Code on PATH, Xcode CLI tools (macOS)
xcode-select --install

# Clone and install
git clone https://github.com/chaitanyagiri/munder-difflin.git
cd munder-difflin
npm install        # postinstall rebuilds node-pty against Electron's ABI
npm run dev        # launches the Electron app with hot reload
```

On first launch, the onboarding wizard walks you through harness home setup, registered repos, and default command configuration. Use **Add Agent** to spawn your first session — the GOD agent seats itself in Michael's office automatically.

```bash
# Production build
npm run build

# Type checking
npm run typecheck
```

If `node-pty` fails to load after an Electron upgrade, re-run `npm install` — the postinstall hook runs `electron-rebuild` against the current Electron ABI.

### Alternatives

**Claude Code native multi-session** — You can run multiple `claude` CLI sessions in separate terminal tabs for free, but they share no memory, no coordination, and no cost controls. Choose this if you only need one or two agents and don't mind manually ferrying context between them.

**OpenAI Codex CLI** — OpenAI's agent tool runs code in sandboxes with a different architecture (cloud-executed vs local terminal). It's better for one-shot tasks where you don't need persistent agents or visual monitoring. Choose Codex if you're in the OpenAI ecosystem and want sandboxed execution over multi-agent coordination.

**Cursor with background agents** — Cursor's agent mode runs in the editor with some multi-agent capabilities. It's more polished for single-developer workflows but doesn't offer the visual coordination layer or the file-based hive architecture. Choose Cursor if you want IDE-integrated agents rather than a standalone coordination harness.

### Verdict

Munder Difflin is the most creative take on multi-agent coding I've seen. The Office-themed visual layer could easily be dismissed as a gimmick, but it solves a real problem: monitoring multiple autonomous agents is hard, and a visual floor with avatar states is genuinely faster than parsing logs. The file-based hive architecture is the right call for a prototype — transparent, debuggable, and free of infrastructure dependencies. The cost circuit breaker alone justifies the tool if you're running multiple Claude Code sessions regularly.

It's early-stage software with rough edges. The Claude Code dependency limits the audience, the macOS-first status means cross-platform is unproven, and the 420-star community is still small. But the architecture is sound, the roadmap is sensible (pluggable agent CLIs, Slack/Telegram bridges, realtime orchestrator), and the development pace is fast — v0.2.0 shipped with observability, persistence, and cost controls within a week of launch. If you're a fullstack developer already using Claude Code and you want to run multiple coordinated agents, this is worth trying today.
