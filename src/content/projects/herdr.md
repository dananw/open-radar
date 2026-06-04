---
name: herdr
description: "Herdr is a Rust-based terminal agent multiplexer that brings tmux-style persistence and agent-aware state tracking to coding agents like Claude Code and Codex."
url: https://github.com/ogulcancelik/herdr
stars: 4246
forks: 260
language: Rust
tags: ["terminal", "agent-multiplexer", "developer-tools", "rust", "coding-agents"]
featured: false
publishedAt: 2026-06-04
---

## Herdr

### Overview

Herdr is a terminal agent multiplexer written in Rust. It's what you'd get if someone built tmux today, knowing that half your terminal panes would be running AI coding agents instead of shells. The project launched in late March 2026 and has already crossed 4,200 GitHub stars with 260 forks — solid traction for a niche developer tool in under three months.

The creator, Ogulcan Kilic, is a systems developer who clearly spent a lot of time in tmux and got frustrated that it has zero concept of what's running inside a pane. Herdr treats agents as first-class citizens. The sidebar shows you which agents are blocked waiting for approval, which are actively working, and which finished their task while you were in a meeting. No other terminal multiplexer does this. GUI-based agent managers exist, but they force you out of your terminal into Electron wrappers or web dashboards. Herdr stays where developers actually work.

The core problem it solves is the workflow explosion. In mid-2026, a typical developer might have Claude Code running a refactor in one pane, Codex writing tests in another, a dev server in a third, and a database console in a fourth. With tmux, you have to manually check each pane to see what's happening. With Herdr, the sidebar tells you at a glance: Claude Code is blocked on a permission prompt, Codex finished, the dev server is running. That's not a nice-to-have — it's the difference between context-switching every 30 seconds and batching your attention.

### Why it matters

The coding agent market is fragmenting fast. There are at least 15 serious terminal-based coding agents now: Claude Code, OpenAI Codex, Pi, OpenCode, Grok CLI, Kilo Code, Kiro CLI, Hermes Agent, and more. Developers don't pick one and stick with it. They use different agents for different tasks — Claude Code for architecture decisions, Codex for boilerplate, Pi for quick edits. Managing all of them through separate terminal windows or tmux panes without agent awareness creates unnecessary cognitive load.

Herdr fills a gap nobody else is addressing: the orchestration layer between developers and their growing fleet of coding agents. The socket API is what makes this particularly interesting. Agents themselves can programmatically create workspaces, split panes, spawn helper processes, read output from other panes, and wait for state changes. This opens the door for multi-agent workflows where one agent coordinates others — something that's starting to happen in practice but has no good tooling support today.

The broader trend here is that terminal-native developer tools are having a renaissance. The LLM coding revolution didn't happen in the browser or in VS Code extensions. It happened in the terminal, and the terminal tooling ecosystem is catching up. Herdr is part of that wave alongside tools like oh-my-pi, OpenCode, and the various agent CLI wrappers. The difference is that Herdr isn't an agent itself — it's the environment agents live in.

### Key Features

**Agent State Awareness.** The sidebar displays real-time agent status using color-coded indicators: red for blocked (needs input or approval), yellow for working (actively running), blue for done (task complete, unreviewed), and green for idle. Detection works through process name matching and terminal output heuristics with zero configuration. Official integrations for Claude Code, Codex, and OpenCode add session identity for native restore, while Pi, GitHub Copilot CLI, and Hermes Agent report semantic state directly.

**Workspaces, Tabs, and Panes.** The organizational model mirrors tmux but with a cleaner hierarchy. Workspaces map to projects or git repos, tabs group related panes within a workspace, and panes are real terminal processes. Split horizontally with `prefix+v` or vertically with `prefix+minus`. Navigate with vim-style `prefix+h/j/k/l`. The keybindings are intentionally tmux-familiar so the muscle memory transfers.

**Session Persistence and Detach/Reattach.** Like tmux, Herdr runs as a background server. Detaching with `prefix+q` closes only the client — all pane processes keep running. SSH into the same machine later, run `herdr`, and you're back where you left off. Named sessions (`herdr session attach work`) let you maintain separate runtime states for different contexts. The experimental `herdr update --handoff` can even migrate live panes from an old server version to a new one without killing processes.

**Socket API for Agent Orchestration.** A local Unix socket exposes a programmatic interface that agents can use to manage Herdr itself. Create workspaces, split panes, spawn helper agents, read output from other panes, and subscribe to state changes. This is the most forward-looking feature in the project. It enables scenarios where a coordinator agent spawns specialized sub-agents in separate panes, monitors their progress, and collects results — multi-agent orchestration from inside the terminal.

**Native Agent Integrations.** Herdr ships with official integrations for Claude Code, Codex, OpenCode, Pi, GitHub Copilot CLI, OpenCode, Hermes Agent, and QoderCLI. Each integration adds session identity for restore after restart and, in some cases, semantic state reporting. Install any integration with `herdr integration install <name>`. The detection also works passively for agents without official integrations — Gemini CLI and Cline are detected but not fully tested.

**SSH and Remote Support.** Herdr works transparently over SSH. Start it on a remote server, detach, and reattach from your laptop with `herdr --remote ssh://you@server`. No special configuration needed. This makes it viable for cloud development environments where your agents run on remote machines but you want terminal-native control from your local setup.

**Lightweight Rust Binary.** Single binary, no runtime dependencies, no Electron, no Node.js. It starts instantly and uses minimal memory. Works inside tmux as the outer terminal environment, so you can layer it into existing workflows without replacing anything. Supports 18 built-in themes including Catppuccin, Tokyo Night, Gruvbox, and Rosé Pine.

### Use Cases

- **Multi-agent development workflows** — Run Claude Code for refactoring in one pane, Codex for test generation in another, and use the sidebar to track which one needs your attention. No more tabbing between terminal windows wondering if an agent is stuck.

- **Remote development with persistent agents** — SSH into a cloud VM, start Herdr, launch several agents, detach, and go get coffee. Come back from any machine and reattach. Your agents kept working the whole time.

- **Team demo and pair programming** — Use SSH remote attach to share a Herdr session with a teammate. They see your agents running in real time through their own terminal. No screen sharing needed.

- **Agent orchestration experiments** — Use the socket API to build multi-agent workflows where a coordinator agent spawns task-specific sub-agents, monitors their progress via state changes, and aggregates results. Still early, but the primitives are there.

- **Terminal-native project management** — Each git branch or feature gets its own workspace with dedicated agent panes. Switch contexts with `prefix+w` without losing any running state.

### Pros and Cons

Pros:
- Only terminal multiplexer with native agent state awareness. The sidebar alone justifies the switch from tmux for developers running multiple coding agents daily.
- Single Rust binary with zero dependencies. Starts in milliseconds, works over SSH, and coexists with tmux without conflicts.
- The socket API is genuinely novel. No other tool gives agents the ability to programmatically manage their own terminal environment. This is where multi-agent workflows get interesting.
- Broad agent support — 15+ agents detected out of the box with official integrations for the major ones. The integration install process is one command.

Cons:
- AGPL-3.0 license with a commercial alternative. Organizations that can't comply with AGPL need to pay for a commercial license, which may slow adoption in enterprise settings.
- Relatively young project (launched March 2026) with 20 open issues. The API surface and keybindings may still change. Not yet at the stability level of tmux's 30+ years of refinement.
- Agent state detection relies on process name matching and terminal output heuristics. Edge cases with renamed binaries or heavily customized prompts may produce false states. Official integrations fix this for supported agents, but unsupported ones may show incorrect status.

### Getting Started

```bash
# Install via curl (Linux/macOS)
curl -fsSL https://herdr.dev/install.sh | sh

# Or via Homebrew
brew install herdr

# Start Herdr in your project directory
cd your-project
herdr

# Keybindings reference:
# ctrl+b, shift+n  — new workspace
# ctrl+b, c        — new tab
# ctrl+b, v        — split pane vertically
# ctrl+b, -        — split pane horizontally
# ctrl+b, h/j/k/l  — navigate panes
# ctrl+b, q        — detach (processes keep running)

# Install agent integrations
herdr integration install claude
herdr integration install codex
herdr integration install pi

# Reattach to running session
herdr

# Remote attach
herdr --remote ssh://you@yourserver
```

Configuration lives at `~/.config/herdr/config.toml`. Print the full default config with `herdr --default-config`.

### Alternatives

**tmux** — The gold standard terminal multiplexer for over three decades. tmux is more mature, has a larger ecosystem of plugins, and works on every Unix system known to man. But it has zero concept of agent state. If you're running a single shell and no coding agents, tmux is still the right choice. If you're juggling multiple AI agents, Herdr's awareness features save real time.

**Zellij** — A modern terminal multiplexer written in Rust with a more discoverable UI and floating panes. Zellij targets the same "tmux but better" space as Herdr but focuses on general terminal productivity rather than agent orchestration. It doesn't detect agent states, has no socket API for agent control, and doesn't offer session restore for agent processes. Better choice if you want a tmux upgrade without the agent-specific features.

**GUI Agent Managers** — Tools like Cursor's built-in agent panel, Claude Desktop, and various Electron-based agent dashboards show agent status in a visual interface. They're easier to learn than a terminal multiplexer but force you out of the terminal, add memory overhead, and can't manage non-agent processes alongside agents. Herdr's approach — keeping everything in the terminal you already use — is more aligned with how developers actually work.

### Verdict

Herdr is the tool I didn't know I needed until I tried running three coding agents simultaneously in tmux and spent half my time context-switching to check their status. It's not trying to replace tmux for general terminal multiplexing — it's solving a specific problem that tmux wasn't designed for. The agent awareness sidebar, the socket API for agent orchestration, and the familiar tmux-style keybindings make it a natural fit for developers who've already adopted coding agents as part of their daily workflow. At 4,200 stars in under three months with active development and integrations for 15+ agents, the trajectory suggests this will become standard tooling for the agent-first development era. The AGPL license is worth noting for enterprise teams, but for individual developers and small teams, this is a free, zero-dependency binary that solves a real problem right now.
