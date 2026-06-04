---
name: terax-ai
description: "Terax is a lightweight 7MB terminal-first AI-native dev workspace built on Tauri 2 and React 19 — terminal, code editor, git graph, file explorer, and agentic AI in one native app."
url: https://github.com/crynta/terax-ai
stars: 6685
forks: 719
language: TypeScript
tags: ["terminal", "ai-workspace", "tauri", "developer-tools", "code-editor"]
featured: false
publishedAt: 2026-06-04
---

## Terax AI

### Overview

Terax is a lightweight, open-source terminal-first AI-native dev workspace that packs a terminal, code editor, file explorer, source control with git graph, web preview, and an agentic AI side-panel into a single native application. It weighs in at about 7-8 MB on disk. To put that in perspective, VS Code's installer is over 100 MB, and Cursor sits around 300 MB. Terax does most of what those tools do in roughly 3% of the space.

The project launched in late April 2026 and hit 6,000 GitHub stars within six weeks. It's built on Tauri 2 with a Rust backend and React 19 frontend — the same architectural approach that's making Tauri the go-to choice for developers who want native performance without shipping an entire Chromium browser. The terminal uses xterm.js with a WebGL renderer and a native PTY backend via `portable-pty`, supporting zsh, bash, fish, PowerShell, and cmd. The code editor is CodeMirror 6 with inline AI autocomplete, edit diffs you can accept or reject hunk by hunk, and vim mode.

What makes Terax worth watching is the combination of speed, size, and AI integration. Most AI-powered dev tools are either web-based (replit, bolt.new) or Electron-based (Cursor, VS Code). Terax is neither. It's a native app that starts fast, uses little memory, and treats AI as a first-class citizen rather than a plugin bolted on after the fact. The AI side-panel supports a dozen providers out of the box — OpenAI, Anthropic, Google Gemini, Groq, xAI, Cerebras, OpenRouter, DeepSeek, Mistral — plus local models through LM Studio, MLX, and Ollama. Your API keys stay in the OS keychain via `keyring`. No telemetry, no account required.

### Why it matters

The developer workspace is fragmenting. VS Code is the default for most developers, but its Electron footprint and telemetry have pushed a growing minority toward alternatives. JetBrains IDEs are powerful but heavy and expensive. Cursor forked VS Code and added AI, but it's still Electron, still large, and still phone-home. Meanwhile, a new generation of developers is asking: why does my editor need 500 MB and an internet connection?

Terax represents a real answer to that question. It's not trying to replace your IDE for every use case — it's a focused workspace for the terminal-first developer who wants AI assistance without the bloat. The Tauri 2 architecture means native file system access, native window management, and native system tray integration, all without the memory overhead of a bundled browser engine. The React 19 frontend renders inside Tauri's native webview, which is already present on every macOS, Windows, and Linux system.

The timing connects to a broader shift. AI coding tools are moving from "autocomplete in your editor" to "agentic workflows that can read, write, search, and execute code." Terax's agentic AI side-panel can plan multi-step operations, spawn sub-agents, maintain project memory via a `TERAX.md` file, and execute bash commands with approval gating. That's the same workflow model as Claude Code, Cursor Agent, and OpenHands — but running inside a 7 MB native app instead of a 300 MB Electron wrapper.

### Key Features

**Native PTY Terminal with WebGL Rendering.** The terminal uses xterm.js with a WebGL renderer for smooth scrolling even with heavy output. Multi-tab with background streaming means your dev server keeps running when you switch tabs. Split panels work horizontally and vertically. On Windows, WSL is a first-class workspace environment, not a wrapped subprocess — each tab can target a different Linux distribution.

**CodeMirror 6 Code Editor.** The built-in editor supports all major languages — TypeScript, JavaScript, Rust, Python, Go, C/C++, Java, HTML, CSS, JSON, Markdown, and more. It includes inline AI autocomplete that works with local models, AI edit diffs you can accept or reject at the hunk level, vim mode for keyboard-driven developers, and ten built-in themes including Atom One, Gruvbox, Nord, and Tokyo Night. The editor theme is independent from the app theme.

**Agentic AI Workflow.** This is where Terax stands out from being "just another terminal with a chatbot." The AI side-panel can plan multi-step operations, spawn sub-agents for parallel work, and maintain project memory through a `TERAX.md` file. It has access to file read, write, edit, multi-edit, grep, glob, and bash execution — all with approval gating so you stay in control. You can attach files and code selections directly to the AI from the file explorer or editor.

**Source Control with Git Graph.** The source control panel lets you stage and unstage hunks, commit with Cmd+Enter, and push with upstream awareness. The git history pane renders a real commit graph with lane visualization for merges and branches. You can search and filter commits, click through to remote commit pages, and see detached HEAD state clearly. It's not a full Git GUI replacement, but it covers the 90% case without leaving the workspace.

**Web Preview Pane.** Terax auto-detects local dev servers and opens them in a preview tab. This is particularly useful for fullstack developers running a React frontend with a NestJS or Django backend — you see your changes immediately without context-switching to a browser. External URLs open in a native child webview, not a browser tab.

**BYOK and Local Model Support.** The AI integration supports over a dozen cloud providers plus local inference through Ollama, LM Studio, and MLX. Keys are stored in the OS keychain, never on disk or in localStorage. The Vercel AI SDK v6 handles provider abstraction, which means adding new providers is straightforward. If you're privacy-conscious or working offline, the local model path works just as well as the cloud path.

**Custom Themes and Background Images.** You can create themes in-app, share them with the community, or import from the community. Background images with adjustable opacity and blur give the workspace a personal touch that most terminal emulators don't bother with. The editor theme and app theme are independent, so you can mix and match.

### Use Cases

- **Fullstack web development** — Run your React dev server, NestJS backend, and database in split terminal tabs, preview the result in the web pane, and use the AI to debug or refactor code in the editor. Everything stays in one window.

- **AI-assisted coding without the bloat** — If you want agentic AI workflows (plan, execute, review) but don't want to run Cursor's 300 MB Electron process, Terax gives you the same capabilities in 7 MB with native performance.

- **Terminal-first workflows** — Developers who live in the terminal but want a code editor and file explorer alongside it. The split-panel terminal and integrated editor mean you don't need tmux + vim + a separate file manager.

- **Privacy-sensitive development** — Local model support through Ollama and LM Studio means your code never leaves your machine. API keys stay in the OS keychain. No telemetry, no account, no phoning home.

- **Cross-platform development** — Native support for macOS, Linux, and Windows (including WSL as a first-class environment). The same workflow and configuration works across all three platforms.

### Pros and Cons

Pros:
- At 7-8 MB, it's roughly 40x smaller than Cursor and 15x smaller than VS Code. Cold start is sub-second on modern hardware. Memory usage stays under 200 MB with multiple tabs open.
- The Tauri 2 + Rust architecture means native performance for file operations, terminal rendering, and system integration. No Electron overhead.
- Broad AI provider support with local model options. The agentic workflow (plan, sub-agents, project memory, approval gating) is genuinely useful, not just a chat panel stapled to a terminal.

Cons:
- 281 open issues as of early June 2026 suggest the project is still settling its API surface. Expect rough edges, especially around the AI workflow and source control features.
- No extension marketplace yet. VS Code's ecosystem of 50,000+ extensions is its moat. Terax has custom themes and agents, but no plugin system for third-party integrations.
- The code editor is CodeMirror 6, which is capable but lacks the deep language server integration of VS Code. No IntelliSense-level type checking, no inline error diagnostics from tsc or ESLint.

### Getting Started

Download the latest installer from the [Releases page](https://github.com/crynta/terax-ai/releases/latest). Terax auto-updates from there.

On Arch Linux:

```bash
yay -S terax-bin
```

To build from source:

```bash
# Prerequisites: Rust (stable), Node 20+, pnpm
git clone https://github.com/crynta/terax-ai.git
cd terax-ai
pnpm install
pnpm tauri dev          # development
pnpm tauri build        # production bundle
```

To configure AI:

1. Open **Settings -> AI**
2. Pick a provider and paste your API key (or point to your local Ollama/LM Studio endpoint)
3. Keys are stored in the OS keychain via `keyring` — they never touch disk or localStorage

### Alternatives

**Cursor** — The most popular AI-native code editor, built as a VS Code fork with deep AI integration. Cursor has a more mature code editor experience with full language server support, IntelliSense, and a larger ecosystem. It's the better choice if you need a full IDE replacement and don't mind the 300 MB footprint and Electron runtime. Terax is better if you want a lightweight, terminal-first workspace with AI that doesn't feel like a VS Code skin.

**Warp** — A modern terminal with AI features built in. Warp has a better terminal experience (block-based output, AI command search, team collaboration) but lacks Terax's code editor, file explorer, and git graph. Choose Warp if the terminal is all you need. Choose Terax if you want a complete workspace in one window.

**Zed** — A high-performance code editor written in Rust with multiplayer editing and AI assistance. Zed is faster than Terax's code editor and has better language server support, but it doesn't include a terminal-first workflow or the same breadth of AI provider support. Zed is the better choice for pure code editing; Terax is better for terminal-centric workflows with integrated AI.

### Verdict

Terax is the most interesting dev workspace I've seen come out of the Tauri ecosystem. It's not trying to be VS Code — it's carving out a distinct niche as a lightweight, terminal-first, AI-native workspace that respects your system resources and your privacy. The 7 MB footprint is real, the Tauri 2 architecture is the right call for 2026, and the agentic AI workflow is genuinely useful rather than a checkbox feature. The project hit 6,600 stars in six weeks, which suggests developers are hungry for this kind of tool. If you're a terminal-first developer who wants AI assistance without the bloat, Terax is worth installing today. If you need deep language server integration or a mature extension ecosystem, give it another few months.
