---
name: opencode-telegram-bot
description: "Run AI coding tasks from your phone via Telegram — a secure remote client for OpenCode CLI with scheduled tasks, voice prompts, and live session tracking."
url: https://github.com/grinev/opencode-telegram-bot
stars: 819
forks: 144
language: TypeScript
tags: ["ai-agent", "developer-tools", "telegram", "typescript", "coding-agent"]
featured: false
publishedAt: 2026-06-19
---

## OpenCode Telegram Bot

### Overview

OpenCode Telegram Bot turns your phone into a remote control for AI coding agents. It's a secure Telegram client for the OpenCode CLI that lets you send coding prompts, monitor progress, switch models, and manage sessions — all from your phone while the actual work happens on your local machine. The project hit 800+ GitHub stars by mid-June 2026 with 21 contributors, growing steadily since its February launch.

The project is built by grinev (Grinev Ruslan), a developer who clearly uses this tool himself — the feature list reads like a wishlist that got implemented. The bot uses Grammy (a modern Telegram bot framework) and connects to OpenCode's local server API. There are no open ports, no exposed APIs, and no cloud intermediaries. Your code stays on your machine; Telegram is just the interface.

The core problem it solves is deceptively simple: what happens when you kick off a 30-minute coding task and want to check on it from the couch, the coffee shop, or the bus? The traditional answer is SSH or a remote desktop, both of which are clunky on mobile. This bot gives you a native Telegram experience — inline buttons, file previews, voice input, and real-time status updates — for the same local coding agent you'd use at your desk.

### Why it matters

AI coding agents have gotten good enough that developers regularly run tasks that take 10-30 minutes to complete. Sitting at your desk watching a terminal is a waste of time, but remote access solutions (SSH, VS Code Remote, tmux) are designed for desktop-to-desktop workflows. The mobile experience is an afterthought.

OpenCode Telegram Bot fills a gap nobody else is addressing well. OpenClaw has a web UI, but it requires exposing a port. Claude Code and Codex run in terminals. This bot asks a different question: what if the coding agent's UI was the messaging app you already have open on your phone? It's a 819-star proof that developers want this.

The project also reflects a broader shift in how developers interact with AI tools. We're moving from "sit and watch" to "dispatch and check in." Scheduled tasks, background notifications, and session forking are patterns borrowed from CI/CD systems, now applied to conversational AI coding. That's a meaningful design direction.

### Key Features

**Remote Coding with Full Session Control.** Send prompts to OpenCode from anywhere and receive complete results with code sent as file attachments. You can create new sessions, continue existing ones, abort running tasks, and detach without stopping — the same control you have in the terminal TUI, translated into Telegram's UI paradigm.

**Live Session Tracking.** The bot can follow a live OpenCode CLI session in real time. If you start a task from your terminal and switch to Telegram, you see the same conversation, tool calls, and subagent activity as it happens. This works because the bot connects to the same OpenCode server port — no duplication, no sync lag.

**Scheduled Tasks.** Schedule prompts to run later or on recurring intervals, turning the bot into a lightweight automation platform. Run periodic code reviews, linting passes, or test suites while you sleep. Each task uses the currently selected project and model, runs outside your active chat session, and supports up to 10 concurrent schedules with configurable timeouts.

**Voice Prompts and Text-to-Speech.** Send voice or audio messages that get transcribed via a Whisper-compatible API and dispatched as coding prompts. Enable spoken replies with `/tts` — pick from OpenAI, ElevenLabs, or Google Cloud TTS providers. This is surprisingly useful when you want to describe a bug verbally instead of typing code snippets on a phone keyboard.

**Multi-Backend Session Management.** Browse and switch between sessions, fork from any previous message point, or revert to an earlier state. The `/messages` command shows all user messages sorted by time with Revert and Fork actions. Fork creates a new branching session while keeping the original intact — useful for exploring alternative approaches without losing context.

**Security by Design.** Strict Telegram user ID whitelist means nobody else can access your bot, even if they discover it. The bot communicates only with the local OpenCode server and Telegram's API. No telemetry, no cloud sync, no data leaves your machine except what goes through Telegram's encrypted channel.

**Interactive File Browser and Context Control.** Use `/ls` to browse project directories, download files by tapping, and compact context when it grows too large. Attach images, PDFs, and text files directly in Telegram — including multiple files in a single album message. The bot handles the plumbing between Telegram's file model and OpenCode's context window.

### Use Cases

- **Mobile code review** — Kick off a refactoring task at your desk, then review the diff and provide feedback from your phone while the agent iterates.
- **Scheduled maintenance** — Set up recurring tasks for dependency updates, test runs, or code quality checks that execute automatically during off-hours.
- **Voice-driven development** — Describe a feature request or bug report verbally during a walk, letting Whisper transcribe it into a coding prompt.
- **Multi-project monitoring** — Switch between OpenCode projects and git worktrees from Telegram, tracking background sessions across multiple repositories.
- **Team demonstration** — Show stakeholders live agent progress during a meeting by sharing the Telegram chat on a projector while the bot updates in real time.

### Pros and Cons

Pros:
- Zero-config security model — the Telegram user ID whitelist is simple and effective, requiring no firewall rules or VPN setup for remote access.
- The scheduled tasks feature genuinely changes how you work with coding agents, letting you batch work into overnight runs the way you'd batch CI jobs.
- Voice transcription integration is well-executed and practical, not just a demo feature. The Whisper-compatible API approach means you can use any provider.

Cons:
- Tightly coupled to OpenCode CLI — if you use Claude Code, Codex, or another agent directly, this bot won't help you. The architecture could support other backends but currently doesn't.
- Telegram dependency is a hard requirement. Teams using Slack, Discord, or other messaging platforms have no alternative channel. The bot is a Telegram bot, not a multi-platform tool.
- The 819-star community is still small. Documentation covers the happy path well, but edge cases around network failures, large file handling, and concurrent session conflicts may need more polish.

### Getting Started

```bash
# Prerequisites: Node.js 20+, OpenCode installed, a Telegram bot token

# Start the OpenCode server on your machine
opencode serve

# Run the bot directly with npx (fastest path)
npx @grinev/opencode-telegram-bot@latest

# Or install globally
npm install -g @grinev/opencode-telegram-bot
opencode-telegram start
```

On first launch, an interactive wizard guides you through configuration — language selection, bot token, user ID, and OpenCode API URL. After that, open your bot in Telegram and start sending tasks.

To reconfigure later:

```bash
opencode-telegram config
```

For background operation with the built-in daemon:

```bash
opencode-telegram start --daemon
opencode-telegram status
opencode-telegram stop
```

### Alternatives

**OpenClaw Gateway** — The official OpenClaw web UI provides a browser-based interface for managing coding agent sessions. It's more feature-rich for multi-agent orchestration but requires exposing a web port and doesn't have the mobile-native experience that Telegram provides. Choose OpenClaw when you need a full desktop-class interface; choose the Telegram bot when you need mobile access with zero network configuration.

**VS Code Remote + SSH** — The traditional approach for remote development. VS Code Remote gives you the full editor experience on any device, including tablets. But it's designed for extended editing sessions, not quick check-ins. The Telegram bot wins for the "dispatch a task, check on it in 10 minutes" workflow. VS Code Remote wins when you need to write code yourself on a remote machine.

**Hermes Agent** — A more general-purpose AI agent platform with its own UI, scheduling, and plugin system. Hermes is a superset of what this bot does, but it's also a heavier commitment. The Telegram bot is a focused, single-purpose tool that does one thing well. Choose Hermes when you need a full agent ecosystem; choose the Telegram bot when you just want mobile access to OpenCode.

### Verdict

This is the kind of tool that makes you wonder why nobody built it sooner. The idea of controlling a local AI coding agent from your phone via Telegram is obvious in hindsight, and grinev's implementation is thorough — 24+ bot commands, voice input, scheduled tasks, session forking, and 8-language localization. The 819 stars and active development (the latest commit landed hours ago) suggest a healthy project trajectory. If you're running OpenCode as your primary coding agent and you ever wished you could check on a long-running task without opening your laptop, install this today. It won't change how you code, but it will change when and where you manage your coding agent.
