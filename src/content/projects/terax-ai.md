---
name: terax-ai
description: "Terax is a lightweight 7MB terminal-first AI-native dev workspace built on Tauri 2 and React 19 with agentic AI, code editor, and git graph."
url: https://github.com/crynta/terax-ai
stars: 6850
forks: 739
language: TypeScript
tags: ["terminal", "ai-agent", "dev-workspace", "tauri", "developer-tools"]
featured: false
publishedAt: 2026-06-08
---

## Terax

### Overview

Terax is a terminal-first AI-native dev workspace that weighs about 7-8 MB on disk. Built on Tauri 2 with a Rust backend and React 19 frontend, it packs a native PTY terminal, CodeMirror 6 editor, git graph, file explorer, web preview, and an agentic AI side-panel into a single native app. It launched in April 2026 and hit 6,800 GitHub stars within six weeks.

The project is created by Crynta, a developer clearly frustrated with the bloat of Electron-based dev tools. The Tauri 2 + Rust foundation is a deliberate choice — native PTY via `portable-pty`, WebGL rendering for the terminal (xterm.js), and a 7 MB binary compared to VS Code's 300+ MB footprint. No telemetry, no account required, no Electron process eating 800 MB of RAM just to display a terminal.

The core problem Terax solves is the fragmentation of the developer workflow. You need a terminal, an editor, a git client, a file browser, an AI assistant, and a preview pane. Most developers cobble these together from separate apps — iTerm + VS Code + GitHub Desktop + a browser tab — or accept the weight of an IDE like Cursor that bundles everything but still runs on Electron. Terax aims to be the one native app that covers all of it without the memory overhead.

### Why it matters

The terminal emulator space has been quietly stagnant. iTerm2, Alacritty, WezTerm, Kitty — they're all good terminals, but they're just terminals. Meanwhile, AI coding assistants have exploded (Cursor, Windsurf, Claude Code), and they all need a terminal to actually execute things. The gap between "terminal that runs commands" and "workspace where you develop" has been growing.

Terax sits at that intersection. It's not trying to be an IDE — it doesn't have VS Code's extension ecosystem or JetBrains' refactoring engine. But it has enough: a real code editor with AI autocomplete, a git client with branch visualization, and an agentic AI panel that can read/write files, run bash, and plan multi-step tasks. For developers who live in the terminal and want AI assistance without switching windows, this hits a sweet spot.

The BYOK approach to AI is smart. You bring your own API keys for OpenAI, Anthropic, Gemini, Groq, DeepSeek, Mistral, xAI, Cerebras, or OpenRouter. Or run fully local with Ollama, LM Studio, or MLX. No vendor lock-in, no subscription, no tokens to buy from the app itself. This matters for developers who already have API access and don't want another middleman.

### Key Features

**Native PTY with WebGL Rendering.** The terminal runs on xterm.js with a WebGL renderer for smooth scrolling and true-color support. The backend is `portable-pty`, which gives you native PTY on macOS, Linux, and Windows — including WSL as a first-class workspace environment, not a wrapped subprocess. Multi-tab with background streaming means your dev server keeps running when you switch tabs.

**Agentic AI Side-Panel.** This isn't a chatbot bolted onto a terminal. Terax has a full agentic workflow: plans, sub-agents, project memory via `TERAX.md`, file read/write/edit/multi-edit, grep, glob, bash with approval gating, and background processes. You can attach files from the explorer or selections directly to the agent. Custom agents with their own system prompt and tool subset let you specialize for different tasks — one for refactoring, one for tests, one for documentation.

**CodeMirror 6 Editor with AI Diffs.** The built-in editor supports all popular languages (TypeScript, Python, Go, Rust, C++, Java, HTML, CSS, JSON, Markdown) with inline AI autocomplete that works with local models. When the agent makes changes, you see diffs in the editor — accept or reject hunk by hunk. Vim mode is included. Ten built-in themes (Atom One, Aura, Copilot, GitHub Dark/Light, Gruvbox Dark, Nord, Tokyo Night, Xcode Dark/Light) and independent editor/app theme settings.

**Git Source Control with Commit Graph.** Stage and unstage hunks, commit with Cmd+Enter, push with upstream awareness. The history pane renders a real commit graph with lane visualization for merges and branches. Branch display includes detached HEAD state. Search and filter commits, click through to the remote commit page. It's not GitKraken, but it covers 90% of what you need without leaving the app.

**Web Preview with Auto-Detection.** Terax auto-detects local dev servers (Vite, Next.js, Django, whatever) and opens them in a preview tab. External URLs open in a native child webview. For fullstack developers, this means you can see your React frontend and your API server in the same app where you're editing code and running commands.

**Lightweight Native App (7 MB).** The Tauri 2 binary is about 7-8 MB on disk. Compare that to Cursor (~500 MB), VS Code (~300 MB), or any Electron app. No telemetry, no account, no auto-updates phoning home — updates come from GitHub releases. API keys are stored in the OS keychain via `keyring`, never on disk or in localStorage.

**Custom Themes and Background Images.** Build themes in-app, share them with the community, or import presets. Background images with adjustable opacity and blur. The editor theme is independent from the app theme. It's a small thing, but developers who spend 8+ hours a day in a tool care about how it looks.

### Use Cases

- **Fullstack developers** who want a single workspace for editing React/NestJS/Django/Go code, running terminals, previewing local servers, and managing git — without the RAM overhead of VS Code + iTerm + a browser.
- **AI-first developers** who already have API keys and want agentic assistance (file editing, planning, bash execution) without paying for another subscription like Cursor Pro.
- **Terminal-native developers** who prefer working in the terminal but want a code editor and git graph that doesn't require switching to a separate app.
- **Developers on resource-constrained machines** — 7 MB binary, no Electron, native PTY. This runs well on older hardware or inside VMs where every MB counts.
- **Privacy-conscious developers** who want AI assistance but don't want their code sent through a third-party platform. BYOK + local model support means you control the inference pipeline.
- **Teams evaluating AI coding tools** — try Terax alongside Cursor or Claude Code to see which workflow fits. Zero cost to start, no vendor commitment.

### Pros and Cons

Pros:
- 7 MB native binary vs 300+ MB for Electron-based alternatives. The Tauri 2 + Rust foundation gives real performance benefits, not just smaller disk usage — startup is fast, memory usage stays low.
- BYOK AI with 10+ provider options plus full local/offline support via Ollama, LM Studio, and MLX. No forced subscriptions or token purchases.
- Agentic workflow with plan mode, sub-agents, and project memory via `TERAX.md`. This is more capable than a simple AI chat panel — it can actually do multi-step work with approval gating.
- No telemetry, no account, API keys in OS keychain. Privacy-first by design, not as a marketing checkbox.

Cons:
- No VS Code extension ecosystem. If you rely on specific extensions (ESLint inline, GitLens, remote SSH, Copilot), Terax won't replace VS Code for those workflows.
- Young project — created April 2026. Expect rough edges, missing features, and breaking changes. The agentic workflow is promising but probably not as polished as Cursor's after a year of iteration.
- No remote development support (SSH, containers, WSL from macOS). If your dev environment lives on a remote server, you're still going to need VS Code Remote or SSH.

### Getting Started

```bash
# Download from releases (macOS, Linux, Windows)
# https://github.com/crynta/terax-ai/releases/latest

# Arch Linux (AUR)
yay -S terax-bin

# Or build from source
git clone https://github.com/crynta/terax-ai.git
cd terax-ai
pnpm install
pnpm tauri dev

# Configure AI (in-app)
# Settings -> AI -> Pick provider -> Paste API key
# Or point to local Ollama: http://localhost:11434
```

### Alternatives

**Cursor** — The dominant AI-native editor, built on VS Code with deep AI integration. Cursor has a more polished AI experience, a massive extension ecosystem, and remote development support. But it's 500+ MB, runs on Electron, and pushes its own subscription model. Choose Cursor if you want the most capable AI coding experience and don't mind the bloat and cost.

**Windsurf** — Another AI-first editor (formerly Codeium) with a focus on agentic flows and "Cascade" multi-step AI. Similar to Cursor in philosophy but with different AI architecture. Heavier than Terax, lighter on the wallet. Choose Windsurf if you want agentic AI in a full IDE and prefer its pricing over Cursor's.

**Alacritty + Claude Code** — For terminal purists who want a fast, GPU-accelerated terminal paired with Claude Code for AI assistance. Alacritty is a better terminal than Terax's embedded one, and Claude Code is arguably the best agentic CLI tool. But you're managing two tools, no integrated editor, no git graph. Choose this setup if the terminal is your primary interface and you don't need an integrated workspace.

### Verdict

Terax is the most interesting terminal project I've seen in 2026. At 6,800 stars in six weeks with zero marketing budget, it's clearly filling a gap. The combination of a 7 MB native binary, real agentic AI (not just a chat sidebar), and a complete dev workspace (editor, git, preview, file explorer) makes it compelling for developers who find VS Code too heavy and plain terminals too limited. It won't replace Cursor for teams that depend on its extension ecosystem or remote development, and it's too young to trust for production-critical workflows. But for personal projects, terminal-heavy work, and developers who already have API keys and want a lightweight AI-assisted workspace — this is worth trying today. The Tauri 2 + Rust foundation gives it a performance ceiling that Electron apps can't match, and the BYOK model means you're never locked into a subscription. If the project maintains its development velocity through 2026, it could become the default terminal workspace for a significant chunk of the developer community.
