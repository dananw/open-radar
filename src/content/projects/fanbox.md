---
name: fanbox
description: "FanBox is an Electron desktop cockpit for AI coding agents — file browser, embedded terminal, live change tracking, and session replay for Claude Code and Codex."
url: https://github.com/alchaincyf/fanbox
stars: 592
forks: 84
language: JavaScript
tags: ["developer-tools", "ai-agents", "electron", "terminal", "vibe-coding"]
featured: false
publishedAt: 2026-06-16
---

## FanBox

### Overview

FanBox is a desktop application that solves a problem every developer running AI coding agents has experienced: you let Claude Code or Codex loose on a project, it makes dozens of changes across dozens of files, and then you have no idea what just happened. The repo hit 592 GitHub stars in six days after its June 10 launch, which tracks — this is a pain point that resonates.

The project is built by Huashu (花叔), an indie developer known for Cat Light, which hit the App Store paid chart Top 1 in China. He's an "AI Native Coder" who clearly lives in the workflow he's building tools for. The UI design was done with his own huashu-design tool, and the development process itself used five independent AI subagents playing different reviewer roles — a heavy vibe coder, a native-taste designer, a zero-docs newcomer, a ten-year terminal veteran, and a destructive QA officer. Every feature had to score 90+ across all five before shipping.

The core idea is simple: instead of bouncing between Finder, your terminal, and your browser to manage AI-generated code, FanBox puts everything in one window. File browser on the left, real embedded terminal on the right or bottom, live preview in the middle. When an agent writes a file, its card lights up with a ripple animation and glows based on change frequency. You can see exactly where the agent is working in real time, then take over whenever you want.

### Why it matters

The "vibe coding" workflow — letting AI agents write most of your code while you direct and review — has gone mainstream in 2026. Claude Code, Codex, Cursor, and a dozen other tools are all competing for the "write code with AI" slot. But the management layer is missing. These agents generate code fast, but developers still use the same tools they've used for a decade to navigate the results: a terminal, a file manager, and an editor, all in separate windows.

FanBox doesn't try to replace your editor or your terminal. It fills the gap between them — the "what just happened?" layer. The session replay feature alone is worth paying attention to: drag a timeline like scrubbing a video to see which files the agent touched, step by step. The change inbox aggregates all modified files across multiple projects when you're running agents in parallel. These aren't features VS Code or iTerm are going to add anytime soon.

The timing connects to a broader shift. As AI agents handle more of the mechanical coding work, the developer's job is increasingly about oversight, review, and course correction. Tools designed for writing code from scratch don't fully serve that supervisory role. FanBox is one of the first tools built specifically for the "direct and review" part of the AI coding loop.

### Key Features

**Live Change Visualization.** Every file the agent writes triggers a ripple animation on its card, with the glow intensity tied to change frequency. It's not just eye candy — you can glance at a project and immediately see where the agent has been spending its time. The follow mode tracks the agent's current file in real time, scrolling code with freshly written lines flashing and HTML rendering as a live web page with double-buffered updates for zero white flash.

**Session Replay.** Think of it as a DVR for your coding agent. Drag the timeline to scrub through a session and see which files the agent touched at each step. For debugging unexpected behavior or understanding what an agent did during a long unsupervised run, this is more useful than reading a wall of terminal output.

**Real Embedded Terminal.** Built on node-pty and xterm.js with WebGL rendering, the terminal handles Claude Code, vim, htop, and CJK wide characters without garbling. You can drag files from the file browser directly into the terminal to insert their paths as agent context. Terminal output file paths are clickable — they open in FanBox, and the path parser handles macOS screenshot names with spaces and Chinese filenames by verifying boundaries with filesystem stat calls.

**Project Memory.** Open any project folder and see every AI session that's happened there: your first message used as a session title, which files each session changed, which skills the agent triggered. Hit "Resume" and it reconnects via `claude --resume` or `codex resume` in the embedded terminal, picking up the exact context where you left off.

**Change Inbox.** When you're running agents across multiple projects simultaneously — which happens more than people admit — the change inbox aggregates all modified files into one view. No more checking five different terminal tabs to figure out what changed where.

**Three Complete Skins.** These aren't color theme swaps. Volt (neon green on charcoal, industrial instrument feel), Archive (cream paper and terracotta, warm serif typography), and Index (black and white with signal colors, editorial layout) each change the palette, fonts, icons, code highlighting, and terminal ANSI themes together. The design quality is noticeably above typical Electron apps.

**Screenshot Express.** Take a system screenshot and a card pops up in the corner. Feed it directly to the terminal agent as visual context, file it into the project's assets folder, or annotate it first. It sounds small, but this closes a real friction point when you're iterating on UI with an AI agent.

### Use Cases

- **Vibe coding sessions** where you're directing Claude Code or Codex across a large codebase and need to see what changed without reading a git diff after every step
- **Multi-project parallel agent runs** where you have three or four terminal tabs running agents simultaneously and need a unified view of all changes
- **Code review for AI-generated changes** using the Monaco-powered git diff view (HEAD vs working tree) to see exactly what lines the agent wrote
- **Onboarding to an AI-heavy project** where you need to understand what an agent did in previous sessions before picking up work
- **Quick file browsing and previewing** for projects that AI spun up — the fuzzy search (Cmd+K) and project badges (node/web/py/rs/go) help you find things fast when you have dozens of agent-generated projects

### Pros and Cons

Pros:
- The "cockpit" metaphor works. File browser, terminal, and preview in one window with live change tracking is genuinely more productive than three separate apps when working with coding agents.
- Session replay and project memory are features no other tool offers. Being able to scrub through an agent's history or resume a past session with full context is powerful for long-running projects.
- Truly local-first and offline-capable. All frontend dependencies are vendored, the backend listens on loopback only, and the only outbound calls are optional (Claude usage API and GitHub update check). Data never leaves your machine.
- The three skins are polished to a degree unusual for open-source Electron apps, and the zero-dependency Node backend keeps the footprint small.

Cons:
- macOS only with Apple Silicon arm64. No Windows or Linux builds yet, which excludes a significant portion of developers. The web version exists but only covers file browsing — the terminal and editors require Electron.
- Electron overhead is real. Even with zero runtime dependencies and vendored assets, you're running a full Chromium instance for what is essentially a file manager with a terminal. Memory usage will be higher than native alternatives.
- The project is six days old. The feature list is ambitious, and the 592-star velocity suggests rapid community adoption, but there's no track record of stability or maintenance cadence yet. Early adopters should expect rough edges.

### Getting Started

```bash
# Download the latest .dmg from Releases (macOS Apple Silicon only)
# https://github.com/alchaincyf/fanbox/releases/latest
# Drag into Applications, right-click → Open on first launch

# Or run the web version (browsing/preview only, no terminal)
git clone https://github.com/alchaincyf/fanbox.git
cd fanbox
node server.js
# Open http://localhost:4567

# Development mode
npm install
npm run app          # Full desktop app with Electron
npm run dist         # Build and sign .dmg (output in dist/)
```

Keyboard shortcuts to know: `Cmd+K` for global fuzzy search, `Cmd+B` to toggle the sidebar, `Cmd+Enter` to open a project in your editor, and `/` to filter the current folder.

### Alternatives

**VS Code with Claude Code extension** — If you're already deep in VS Code, the integrated terminal and file explorer cover similar ground. But VS Code wasn't designed for the "see what the agent changed" workflow. There's no session replay, no change inbox, and no live visualization of agent activity across files. Choose VS Code if you want one tool for everything and don't mind the oversight gap.

**Warp Terminal** — Warp's AI-native terminal has agent-aware features like command sharing and notebook-style blocks. It's a better terminal than FanBox's embedded one. But it doesn't have the file browser, preview, or change tracking layers. Choose Warp if terminal ergonomics matter more than the unified cockpit experience.

**Cursor** — Cursor is an IDE built around AI coding with inline diffs and agent mode. It's more capable as a code editor and handles the "write code with AI" loop well. But it's an editor, not a project management tool — there's no session replay, no multi-project change inbox, and no file browsing with project memory. Choose Cursor if you want AI assistance inside your editor rather than a supervisory cockpit around your agents.

### Verdict

FanBox is the first tool I've seen that treats AI coding agents as something you manage rather than something you use. The distinction matters. Claude Code and Codex are tools — you give them instructions and get code back. FanBox is a control room — you see what's happening across your projects, review what changed, replay sessions, and take over when needed. That's a different mental model, and it's the right one for 2026's reality where developers are running multiple agents in parallel. The 592 stars in six days and the polished design quality suggest this isn't just another Electron toy. The macOS-only limitation is real, but if you're on a Mac and running AI agents regularly, FanBox fills a gap that nothing else does right now.
