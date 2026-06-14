---
name: fanbox
description: "FanBox is an Electron-based vibe coding cockpit for macOS — file browser, embedded terminal, and live diff view for AI coding agents like Claude Code and Codex."
url: https://github.com/alchaincyf/fanbox
stars: 461
forks: 60
language: JavaScript
tags: ["developer-tools", "electron", "ai-agents", "macos", "vibe-coding"]
featured: false
publishedAt: 2026-06-14
---

## FanBox

### Overview

FanBox is a macOS desktop app that solves a problem every developer running AI coding agents has experienced: window chaos. It puts a file browser on the left, a real embedded terminal on the right, and live file previews in the middle — all in one Electron window. Created on June 10, 2026, it racked up 461 GitHub stars in four days, which tracks with how many developers are drowning in the "vibe coding" workflow right now.

The project is built by alchaincyf, a developer whose GitHub profile shows a focus on developer tooling and UI design. The UI work was done in collaboration with huashu-design, and it shows — FanBox ships with three distinct skins (Volt, Archive, Index) that aren't just color swaps but complete visual systems with matching typography, icons, code highlighting, and terminal ANSI themes. That level of design polish is rare in developer tools.

The core problem FanBox addresses is the fragmentation of AI-assisted development. When you spin up Claude Code or Codex to build something, you end up juggling Finder to locate files, a terminal emulator to run the agent, a browser to preview results, and an editor to make tweaks. FanBox collapses that into a single window. Every time the agent writes a file, the corresponding card in the file browser lights up with a ripple animation. You can see at a glance which files changed, preview them in place, and resume agent sessions with one click.

### Why it matters

The "vibe coding" trend — where developers describe what they want and let AI agents write the code — has exploded in 2026. Anthropic's Claude Code, OpenAI's Codex CLI, and Google's Gemini CLI are all fighting for developer mindshare. But the tooling around these agents is still primitive. You're running them in iTerm or Warp, switching between windows constantly, losing track of which files the agent touched. FanBox is the first tool I've seen that treats the AI agent as a first-class citizen in the UI, not just another shell command.

This connects to a broader shift in how developers work. The traditional IDE model — where you write code line by line — is being supplemented by an agent-first model where you orchestrate, review, and course-correct. FanBox's design reflects that: the terminal is front and center, file changes are visualized in real time, and the workflow is built around "find → preview → light edit → command the agent." It's not trying to replace VS Code or Cursor. It's a cockpit for a different kind of development.

### Key Features

**Live Change Dashboard.** When an AI agent writes files, FanBox's file cards ripple and glow based on change frequency. The light follows the agent's activity in real time, so you never lose track of what's being modified. This visual feedback loop is something no terminal emulator provides.

**Follow Mode.** One click activates tracking — the file view and preview automatically follow whichever file the agent is currently editing. Code scrolls with freshly written lines flashing. HTML renders live as it's being written, using double-buffered rendering to eliminate white flashes. Markdown renders in real time. Any manual browsing instantly returns control to you.

**Session Replay.** Drag a timeline slider to scrub through your agent's work history, like rewinding a video. See exactly which files were touched, in what order, and what changed. This is invaluable for understanding what a long-running agent session actually did.

**Project Memory.** Open any project folder and see a complete history of AI interactions: past sessions (titled with your first message), files modified per session, and skills triggered. The "Resume" button reconnects context via `claude --resume` or `codex resume` directly in the embedded terminal. No more losing context between sessions.

**Real Embedded Terminal.** Built on node-pty and xterm.js with WebGL rendering. Claude Code, vim, and htop render correctly without screen artifacts. CJK wide characters work properly. Drag files from the browser into the terminal to insert their paths as agent context. Clickable file paths in terminal output open directly in FanBox — even paths with spaces or Chinese filenames are recognized correctly.

**Screenshot Express.** Take a system screenshot and a card pops up in the corner: feed it to the terminal agent as visual context, file it into the project's assets folder, or annotate it before sending. This closes the loop between visual feedback and agent instruction.

**Agent Usage Tracking.** Displays Claude Code's official 5-hour window and weekly quota (same data source as the `/usage` command), plus local token statistics. For Codex, it shows window snapshots with reset detection. Know your budget before you start a session.

### Use Cases

- **Fullstack developers running Claude Code or Codex** — If you're using AI agents to build features across React frontends and NestJS or Django backends, FanBox lets you see file changes across the entire stack in one view without switching contexts.

- **Rapid prototyping and vibe coding sessions** — When you're spinning up multiple experimental projects in an afternoon, FanBox's project badges (node / web / py / rs / go) and change dashboard help you keep track of what each agent session produced.

- **Code review of AI-generated changes** — The session replay and Monaco-based git diff view (HEAD vs working tree) let you audit exactly what an agent changed before committing. Essential for developers who don't blindly trust AI output.

- **Multi-project parallel agent runs** — The change inbox aggregates all modified files across multiple projects running agents simultaneously. Run Claude Code on your frontend and Codex on your backend and see everything in one place.

- **Teaching and demonstration** — The session replay feature makes it easy to show someone how an AI agent approached a problem, step by step.

### Pros and Cons

Pros:
- Solves a real, daily pain point for developers using AI coding agents. The window-switching problem FanBox addresses is something every vibe coder experiences within their first hour.
- The design quality is exceptional for a four-day-old project. Three complete visual skins with matching terminal themes, plus thoughtful touches like the change ripple animations and the "it's your turn" breathing indicator.
- Local-first, zero runtime dependencies, zero configuration. No cloud, no accounts, no telemetry. Clone and run.
- MIT licensed with an active web version (`node server.js`) for quick evaluation without installing Electron.

Cons:
- macOS only (Apple Silicon). No Windows or Linux support yet, which excludes a significant portion of the developer market. The Electron foundation should make cross-platform builds feasible, but they're not available today.
- Electron overhead is real. At 30 KB bundle size for the web version the lightweight claims are accurate for that mode, but the desktop app carries Electron's memory footprint, which matters when you're already running an AI agent consuming significant RAM.
- The project is four days old. The 461 stars reflect hype and genuine interest, but the API surface, feature set, and stability are unproven at scale. Early adopters should expect rough edges.
- No Windows/Linux means teams with mixed development environments can't standardize on it.

### Getting Started

```bash
# Download the macOS desktop app (recommended)
# https://github.com/alchaincyf/fanbox/releases/latest
# Download the .dmg, drag to Applications
# Right-click → Open on first launch if macOS warns about unverified developer

# Or run the web version (zero dependencies, zero build)
git clone https://github.com/alchaincyf/fanbox.git
cd fanbox
node server.js
# Open http://localhost:4567

# Development mode
npm install
npm run app          # Launch full Electron desktop app
npm run dist         # Build and sign .dmg (output in dist/)
```

### Alternatives

**Warp** — A modern terminal with AI features built in. Warp has a better terminal experience overall (block-based output, AI command suggestions, shared sessions) but doesn't include a file browser or live preview. If you just need a better terminal for running agents, Warp is the stronger choice. FanBox is better when you need the integrated file management and change visualization.

**Cursor** — An AI-native IDE built on VS Code with deep agent integration. Cursor is a full editor where FanBox is a cockpit — they serve different workflows. Cursor is better when you're actively writing and refactoring code with AI assistance. FanBox is better when you're orchestrating agents that run autonomously and you need to monitor and review their output.

**iTerm2 + Finder + VS Code** — The traditional multi-window setup that most developers use today. It works, and each tool is more capable in its domain than FanBox. But the constant context switching between three windows is exactly the problem FanBox solves. If you find yourself losing track of which files your agent changed, FanBox consolidates that workflow.

### Verdict

FanBox is the right tool at the right time. The vibe coding workflow — running AI agents that write code autonomously — has outgrown the terminal emulator. Developers need a cockpit, not just a shell, and FanBox delivers that with surprising polish for a project that's less than a week old. The 461 stars in four days and the Gigazine coverage suggest this is hitting a real nerve. It's macOS-only and Electron-based, which limits its audience, and it's too early to call it production-stable. But if you're a Mac developer running Claude Code or Codex daily and you're tired of juggling windows, download the .dmg today. This is the kind of tool that makes you wonder how you worked without it.
