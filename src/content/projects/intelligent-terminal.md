---
name: intelligent-terminal
description: "Microsoft's open-source fork of Windows Terminal with native AI agent integration — context-aware agent pane, automatic error detection, and multi-agent session management via ACP protocol."
url: https://github.com/microsoft/intelligent-terminal
stars: 858
forks: 49
language: C++
tags: ["terminal", "ai-agents", "developer-tools", "microsoft", "cli"]
featured: false
publishedAt: 2026-06-10
---

## Intelligent Terminal

### Overview

Intelligent Terminal is Microsoft's experimental, open-source fork of Windows Terminal with native AI agent integration baked directly into the terminal experience. Announced on June 2, 2026 at Microsoft Build, it accumulated 858 stars and 49 forks in under three weeks — a velocity that reflects how badly developers want their terminal and their AI assistant in the same window.

The project comes from the Windows Terminal team at Microsoft, the same group that maintains one of the most widely used terminal emulators on the planet. Windows Terminal ships by default on Windows 11 and has over 100 million monthly active devices. That's not a random open-source side project — it's infrastructure-level tooling from the team that owns the Windows command line experience.

The core problem Intelligent Terminal solves is the constant context-switching between your shell and your AI coding agent. Every developer using Copilot, Claude Code, or Codex knows the drill: hit an error, copy the output, switch to your agent's UI, paste it, wait for a response, copy the fix, switch back, paste it. Intelligent Terminal eliminates that loop by embedding a context-aware agent pane right next to your shell. The agent sees your terminal output automatically — no copying, no pasting, no context lost.

### Why it matters

The terminal is where developers spend most of their time, and AI coding agents are rapidly becoming essential tools. But the integration between these two layers has been terrible. You either use a separate agent CLI (losing visual context), or you use an agent's standalone UI (losing shell context). Intelligent Terminal represents Microsoft's bet that the terminal itself should be the integration surface for AI agents.

This matters because of the Agent Client Protocol (ACP) angle. Intelligent Terminal isn't locked to GitHub Copilot — it works with any ACP-compatible agent CLI. That means Claude Code, Codex, Gemini CLI, and any future agent that implements ACP can plug into the same terminal experience. The protocol is open, and Microsoft is positioning the terminal as a neutral host for whatever agent you prefer. That's a smart architectural choice that avoids the lock-in trap.

For fullstack developers working across React, NestJS, Django, and Go, the value is immediate. You're constantly switching between language-specific tooling, build commands, test runners, and deployment scripts. When something breaks, the error context is right there in the terminal. Having an agent that can see that context, explain the error, and suggest a fix without leaving your shell is a genuine productivity multiplier — not a gimmick.

### Key Features

**Context-Aware Agent Pane.** The agent pane is a dockable panel (top, bottom, left, or right) that runs your chosen agent CLI with full visibility into your shell output. Ask it to explain an error, follow up with "try a different approach," and it keeps the thread going with full context. If the agent needs to run complex tasks, it spins up background tabs so your active shell stays unblocked.

**Automatic Error Detection.** When a command fails, Intelligent Terminal detects it automatically and lights up an indicator in the status bar. Press Ctrl+Alt+. to open the agent pane with the error context already loaded — no manual copying required. You can configure it to auto-detect only, or to also auto-suggest fixes. This alone saves minutes per debugging session.

**Agent Management Panel.** Running multiple agents across tabs or kicking off background tasks creates a tracking problem. The agent management panel (Ctrl+Shift+/) shows all active agents, their status, and past sessions. Pick up a workflow where you left off, check on a long-running task, or dismiss completed ones. No more losing track of what you asked an agent to do three tabs ago.

**ACP Protocol Support.** Intelligent Terminal implements the Agent Client Protocol, an open standard for agent-terminal communication. It auto-detects ACP-compatible agent CLIs installed on your machine — Copilot, Claude, Codex, Gemini — and lets you switch between them in settings. You're not locked into a single agent provider.

**Command Palette Integration.** Type `?` followed by your prompt in the Command Palette to kick off an agent task. The terminal injects context from the active pane and starts the agent in a background tab. Alt+Shift+/ jumps directly into prompt mode. This is the fastest way to ask a quick question without opening the full agent pane.

**Privacy-First Architecture.** Intelligent Terminal is a local transport layer. It passes prompts and shell context to your selected agent CLI over stdio/ACP. It doesn't call any cloud APIs itself and doesn't persist conversation history. Where your data goes depends entirely on which agent CLI you choose. That's an important distinction from agent tools that route everything through their own servers.

### Use Cases

- **Debugging build failures** — A React build fails with a cryptic webpack error. The agent pane sees the full error output and explains what went wrong, suggests the fix, and can run it for you.
- **DevOps and deployment workflows** — Running Docker, Kubernetes, or CI/CD commands with complex error chains. The agent tracks context across multiple commands and helps untangle deployment issues.
- **Learning unfamiliar tooling** — Starting a new Go project or switching from Django to NestJS. Ask the agent to explain commands, suggest project structure, or translate patterns between frameworks.
- **Multi-tab agent orchestration** — Running parallel agent tasks across different project directories. The management panel keeps track of everything so nothing gets lost.
- **Quick one-off questions** — Using the Command Palette to ask a fast question ("what does this grep flag do?") without disrupting your current shell session.

### Pros and Cons

Pros:
- Native integration with Windows Terminal means zero setup friction for the hundreds of millions of Windows 11 users already running it. Install side-by-side with your existing terminal.
- ACP support makes this agent-agnostic. You're not locked to Copilot — use Claude Code, Codex, Gemini CLI, or any future ACP-compatible agent.
- The privacy model is clean. Terminal is a transport layer, not a data collector. Your conversation history stays in memory and is discarded when the session ends.
- Automatic error detection with context injection is genuinely useful. It turns the terminal from a dumb text pipe into something that understands when things go wrong.

Cons:
- Windows 11 only (22H2+, build 22621.6060+). No macOS or Linux support, which excludes a significant portion of fullstack developers who work on Unix-based systems.
- Experimental v0.1 status means rough edges. The GitHub issues tracker is active with bug reports, and the feature set is still minimal compared to standalone agent UIs.
- Requires a supported agent CLI subscription. GitHub Copilot is the default, and while other ACP agents work, you still need an active subscription or API key for whichever agent you choose.
- C++ codebase built on the Windows Terminal source means contributing requires the full Windows Terminal build toolchain, which is substantial.

### Getting Started

```powershell
# Install from Microsoft Store (recommended)
# Search for "Intelligent Terminal" in the Microsoft Store app

# Or install via WinGet
winget install --id Microsoft.IntelligentTerminal -e

# If you get a PowerShell execution policy error, run:
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

On first launch, Intelligent Terminal auto-detects ACP-compatible agent CLIs on your machine. If none are found, it defaults to GitHub Copilot CLI and installs it via WinGet. Key shortcuts:

```text
Ctrl+Shift+.    Toggle agent pane
Ctrl+Shift+I    Switch focus to/from agent pane
Ctrl+Alt+.      Open agent pane with error context
Ctrl+Shift+/    Open agent management
Alt+Shift+/     Command Palette in prompt mode
```

### Alternatives

**Warp** — A Rust-based terminal with built-in AI features and collaborative capabilities. Warp has a more polished UI and works on macOS, Linux, and Windows, but its AI integration is proprietary and doesn't support the ACP protocol. Better choice if you want a batteries-included AI terminal on macOS, but you're locked into Warp's agent.

**GitHub Copilot CLI** — The standalone Copilot CLI that Intelligent Terminal uses as its default agent. Works in any terminal but lacks the context-aware pane, error detection, and session management that Intelligent Terminal adds. Use it directly if you don't want to switch terminals.

**Cursor or Windsurf** — Full IDE experiences with deep agent integration. These provide more comprehensive AI assistance for code editing, but they're not terminal replacements. Many developers use both an IDE and a terminal — Intelligent Terminal fills the terminal half of that equation.

### Verdict

Intelligent Terminal is the most significant terminal development since Windows Terminal itself. Microsoft is making a calculated bet that the terminal is the right place to integrate AI agents, and the ACP protocol support makes this a platform play rather than a Copilot upsell. The v0.1 status means it's early — expect bugs, missing features, and rapid iteration. But the core experience of having a context-aware agent pane that sees your shell output and detects errors automatically is already compelling enough to justify installing it. If you're a Windows 11 developer using any AI coding agent, this should be on your machine today. The 858 stars in three weeks, with zero marketing spend beyond a Build announcement, suggest the developer community agrees.
