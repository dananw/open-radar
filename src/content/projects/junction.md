---
name: junction
description: "Junction is a VS Code chat sidebar that unifies 7 local AI coding agent backends — OpenClaw, Hermes, Goose, OpenCode, and more — into one interface with workspace context and model switching."
url: https://github.com/Plaer1/junction
stars: 496
forks: 1
language: TypeScript
tags: ["vscode", "ai-agents", "local-ai", "developer-tools", "chat-sidebar"]
featured: false
publishedAt: 2026-06-17
---

## Junction

### Overview

Junction is a VS Code extension that gives you a single chat sidebar for talking to local AI coding agents. It supports seven different backends — OpenClaw, Hermes, Souveraine, MiMoCode, Goose, OpenCode, and OpenHands — and lets you switch between them without leaving your editor. The repo launched on June 17, 2026, and pulled nearly 500 stars within hours, which tells you how badly developers want a unified interface for the fragmented local AI agent ecosystem.

The project is built in TypeScript as a standard VS Code extension. It's MIT-licensed and weighs in at a reasonable size — no heavy dependencies, no cloud requirements. You run your agent locally, Junction connects to it, and you chat from the sidebar. That's the core loop.

The problem Junction solves is real and recent. In the past six months, the local AI coding agent space has exploded. Claude Code, Codex, Goose, OpenHands, Hermes, and a half-dozen others all do roughly the same thing — run an LLM-powered coding agent on your machine — but each has its own CLI, its own UI (or no UI), and its own configuration. If you switch between agents depending on the task, you're context-switching between terminals, dashboards, and mental models. Junction collapses that into one panel.

### Why it matters

The local AI agent wars are producing excellent tools but terrible fragmentation. Developers in mid-2026 are running Claude Code for architecture, Goose for quick edits, OpenHands for multi-file refactors, and Hermes for longer planning sessions. Each tool has its own strengths, but using them means constantly switching contexts — different terminals, different keybindings, different ways of passing file context.

Junction doesn't try to replace any of these tools. It sits on top of them as a presentation layer. Think of it like how VS Code's terminal unified different shells — you still choose between bash, zsh, and fish, but the interface is the same. Junction applies that same thinking to AI agent backends.

The timing matters too. We're in a period where the best AI coding workflow involves using multiple models and agents for different tasks. The developer who uses Opus for planning, a cheaper model for execution, and a specialized agent for testing needs a way to orchestrate those interactions without drowning in terminal windows. Junction is the first tool I've seen that takes this multi-agent reality seriously at the editor level.

### Key Features

**Seven Backend Integrations.** Junction connects to OpenClaw via WebSocket, Hermes via its dashboard WebSocket and REST API, Souveraine via HTTP, MiMoCode via auto-spawned or pre-configured server connections, Goose via data directory configuration, OpenCode via binary path settings, and OpenHands via server launcher. Each backend has its own connection adapter, and adding new ones follows a consistent pattern. This isn't a wrapper around one tool — it's a genuine multi-backend client.

**Workspace Context Passing.** You can drag and drop files into the chat input, or right-click a file or selection in the explorer to add it to the current thread. This is the kind of feature that sounds small but changes how you work — instead of copy-pasting code into a terminal chat, you point at what you mean. The agent gets structured context instead of raw text dumps.

**Model and Reasoning Picker.** The sidebar header lets you select a model and set reasoning effort per session. This is useful when you're switching between tasks — high reasoning for architecture decisions, low reasoning for quick formatting fixes. The setting persists per-bridge, so your Go agent can use a different model configuration than your TypeScript agent.

**Dual Chat Layouts.** Compact mode folds agent activity into summary accordions for a dense view. Timeline mode shows a chronological activity rail with dot indicators, reasoning disclosure, and sticky user prompts. Both layouts adapt to your VS Code color theme. Compact is good for experienced users who want density; timeline is better for understanding what the agent actually did.

**Follow-Up and Steering Modes.** You can queue messages for when the agent finishes, steer mid-turn by injecting new instructions, or interrupt and redirect entirely. This is configurable globally or per-bridge. The steering mode is particularly useful — when you see an agent going down the wrong path, you can course-correct without killing the entire session.

**Animated Splash Screen.** This is the feature that gets the most screenshots on social media. Junction opens with a matrix-style rain effect behind the wordmark, supporting 10 character sets (Katakana, CJK, Hangul, Emoji, Binary, and more). The exit animations include spiral, explode, Star Wars crawl, and rain push modes. It's excessive, it's fun, and it shows the kind of polish that makes you trust the rest of the codebase.

**Auto-Reconnection.** Junction reconnects to the runtime automatically if the connection drops. No manual restart needed. This sounds trivial until you've lost a 20-minute agent session because your local server hiccupped.

### Use Cases

- **Multi-agent developers** — If you use Claude Code for one project and Goose for another, or switch between agents based on task type, Junction gives you one interface instead of multiple terminal windows.
- **Fullstack developers working across stacks** — Run different agent backends optimized for different languages (MiMoCode for TypeScript, OpenHands for Python) and switch between them from the same sidebar.
- **Teams evaluating local AI agents** — Junction lets you compare agent performance on the same task without reconfiguring your environment each time. Same context, same interface, different backend.
- **Developers who want AI chat in the editor** — Even if you only use one agent, Junction's workspace context passing and chat layouts are nicer than most agents' built-in interfaces.
- **Privacy-conscious developers** — Everything runs locally. No cloud calls, no telemetry. Your code and conversations stay on your machine.

### Pros and Cons

Pros:
- Solves a real fragmentation problem that's getting worse as more local AI agents launch. The seven-backend support covers the major players and the architecture makes adding new ones straightforward.
- Workspace context passing (drag-and-drop files, right-click selections) is genuinely better than copy-pasting into terminal-based agents.
- The dual layout system (compact vs. timeline) accommodates different working styles, and both look good with VS Code themes.
- Auto-reconnection prevents the frustrating experience of losing an agent session to a dropped connection.

Cons:
- Created on June 17, 2026 — this is brand new software. The 496 stars are from launch day excitement, not production battle-testing. Expect bugs, missing features, and API changes.
- Only 1 fork and minimal community infrastructure (no Discord, no docs site beyond the README). If you hit a problem, you're reading source code, not documentation.
- Requires each agent backend to be installed and running separately. Junction doesn't bundle any agents — it's a client, not a runtime. You still need to set up and maintain each backend independently.
- The splash screen customization, while impressive, suggests the project may prioritize polish over depth in its early stages.

### Getting Started

```bash
# Clone the repo
git clone https://github.com/Plaer1/junction.git
cd junction

# Install dependencies
npm install

# Compile and install the extension
./compile-and-install.sh

# Reload VS Code
# Ctrl+Shift+P → Developer: Reload Window
```

Once installed, make sure at least one local agent backend is running (e.g., OpenClaw Gateway, Hermes dashboard, or Goose). Then:

1. Open the Command Palette (`Ctrl+Shift+P`)
2. Run `Junction: Open Sidebar`
3. Configure your backend connection in the sidebar settings
4. Start chatting

Requirements: VS Code 1.120.0 or higher, plus at least one supported agent runtime running locally.

### Alternatives

**Continue** — An open-source AI code assistant that runs in VS Code and JetBrains. Continue supports multiple models (local and cloud) but focuses on inline code completion and chat, not multi-backend agent orchestration. Better choice if you want a single-model experience with IDE-native autocomplete.

**Cline** — A VS Code extension for autonomous coding agents that can edit files, run commands, and browse the web. Cline is more autonomous (it acts on your behalf) while Junction is more conversational (you talk to an agent). Better choice if you want the agent to drive, not you.

**Aider** — A terminal-based AI pair programming tool that works with multiple LLMs. Aider is powerful and well-tested but lives in the terminal, not the editor. Better choice if you prefer terminal workflows and don't need VS Code integration.

### Verdict

Junction is the right idea at the right time. The local AI agent ecosystem is fragmenting fast, and developers need a unified interface that lives where they already work — in the editor. The seven-backend support covers the current landscape, and the workspace context features are genuinely useful, not just nice-to-have. But this is day-one software with 496 stars and 1 fork. The splash screen is fun, the architecture looks sound, but nobody has stress-tested this in production yet. If you're already juggling multiple local AI agents and you live in VS Code, Junction is worth installing today. If you're happy with your current single-agent setup, wait a month and see if the community materializes. The concept is strong enough that I expect it to stick around — the question is whether this particular implementation gets the maintenance it needs.
