---
name: codexpro
description: "CodexPro turns ChatGPT Developer Mode into a local coding agent via MCP — inspect, edit, search, and verify your local repo from ChatGPT's web interface."
url: https://github.com/rebel0789/codexpro
stars: 346
forks: 32
language: TypeScript
tags: ["mcp", "chatgpt", "coding-agent", "developer-tools", "ai"]
featured: false
publishedAt: 2026-06-18
---

## CodexPro

### Overview

CodexPro is a TypeScript CLI that bridges ChatGPT's web interface with your local codebase through the Model Context Protocol. Install it globally, run `codexpro setup` in any repo, paste the generated Server URL into ChatGPT's Developer Mode app creator, and suddenly ChatGPT can read your files, edit code, search with ripgrep, run safe verification commands, and understand your project's full context — all from the browser.

The project appeared on GitHub on June 16, 2026, and crossed 340 stars within two days. That velocity makes sense when you consider the problem it solves: developers already pay for ChatGPT Plus or Pro, but until now that subscription only gave them a chat window disconnected from their actual codebase. CodexPro closes that gap without requiring a separate tool like Cursor, Codex CLI, or Claude Code.

The author (rebel0789) designed it around ChatGPT's official Developer Mode and MCP app infrastructure — not some undocumented API or rate-limit workaround. CodexPro exposes a local MCP server that ChatGPT connects to as a standard app. The tools it surfaces are deliberately constrained: file read/write/edit, code search, git status and diff, workspace context loading, and safe bash execution. It respects ChatGPT's own safety model rather than trying to circumvent it.

### Why it matters

The AI coding agent landscape in mid-2026 is fragmented. You've got Claude Code for terminal-native workflows, Cursor for IDE-integrated coding, Codex CLI for OpenAI's local agent, and a dozen other tools competing for the same developer attention. Each one requires a separate subscription, a separate interface, and a separate context window that doesn't know about your other tools.

CodexPro takes a different approach. Instead of building yet another agent interface, it makes the ChatGPT web interface — something most developers already have open all day — capable of working with local code. If your ChatGPT Plus account gives you access to a strong model in the web app, and that model supports Developer Mode apps, CodexPro lets it operate on your repo through MCP. No new subscriptions. No new UI to learn. No context duplication.

This matters because the real bottleneck in AI-assisted development isn't model capability anymore — it's context. Every time you switch between ChatGPT, your terminal, and your IDE, you lose context. CodexPro reduces that friction by keeping the coding loop inside a single interface you already use. For fullstack developers juggling React frontends, NestJS APIs, and database migrations, that continuity is worth a lot.

### Key Features

**Workspace-Aware Context Loading.** When you open a workspace through CodexPro, it automatically discovers your `AGENTS.md`, `.ai-bridge` plans, git status, and project structure. ChatGPT sees your repo the way Codex CLI would see it — with the same context files and conventions. You can also load specific skills with `load_skill` for bounded instructions.

**Safe Edit and Write Modes.** CodexPro defaults to workspace-only writes controlled by `CODEXPRO_WRITE_MODE`. Files outside the configured workspace root are blocked. Every edit returns a diff so you can review changes before committing. The conservative defaults mean you won't accidentally clobber system files or secrets.

**Multi-Mode Tool Exposure.** Three tool modes let you control how much power ChatGPT gets. `minimal` mode exposes only read and search for safe exploration. `standard` mode (the default) adds write, edit, bash, and handoff tools. `full` mode exposes everything including compatibility and debugging tools. This matters because ChatGPT behaves better with fewer, higher-signal tools than a sprawling action catalog.

**Handoff and Pro Planning Modes.** In handoff mode, ChatGPT writes a structured `.ai-bridge/current-plan.md` file that a local implementation agent (like Codex CLI or Claude Code) can pick up and execute. Pro planning mode exports a durable context bundle for sessions that can't call MCP tools directly. These workflows acknowledge that no single AI tool does everything well yet.

**Tunnel-Based Remote Access.** CodexPro supports Cloudflare quick tunnels, Cloudflare named tunnels, and ngrok free dev domains to expose the MCP server over HTTPS with a stable URL. This means you can set up the ChatGPT app once and reuse it across sessions without reconfiguring. Token protection secures the public endpoint.

**AGENTS.md and .ai-bridge Integration.** If your repo already uses `AGENTS.md` for agent instructions or `.ai-bridge` for plan/status tracking (conventions shared by Codex, Claude Code, and other agents), CodexPro loads them automatically. No migration needed — it fits into existing agent-oriented workflows.

**Ripgrep-Powered Code Search.** The `search` tool uses ripgrep when available, falling back to a Node.js implementation. ChatGPT can search your entire codebase by regex, find relevant files, and then read or edit them — the same search-read-edit loop that makes terminal agents effective.

### Use Cases

- **Fullstack developers who already pay for ChatGPT Plus** — Use the subscription you're already paying for as a local coding agent without buying Cursor or another tool. Read, edit, and verify your React, NestJS, or Django codebase from the browser.

- **Developers who prefer a visual interface over terminal agents** — If Claude Code or Codex CLI's terminal-native workflow feels cramped, CodexPro gives you ChatGPT's full web UI with the same local repo access.

- **Teams using AGENTS.md conventions** — If your repo already has agent instructions, CodexPro loads them automatically. No duplicate configuration.

- **Handoff workflows between AI tools** — Use ChatGPT for planning and architecture discussion, then hand off structured plans to Codex CLI or Claude Code for execution via `.ai-bridge`.

- **Quick code exploration and refactoring** — Search your codebase, understand patterns, and make targeted edits without leaving the browser. Especially useful when you're on a machine without your full dev environment.

### Pros and Cons

Pros:

- Leverages an existing ChatGPT Plus/Pro subscription instead of requiring yet another AI tool subscription. For developers already paying $20-200/month for ChatGPT, this is essentially free additional capability.
- Conservative security defaults — workspace-only writes, blocked secret paths, token-protected tunnels, safe bash by default. The author clearly thought about the attack surface.
- Fits into existing `AGENTS.md` and `.ai-bridge` workflows rather than inventing new conventions. Minimal migration cost for teams already using agent-oriented development patterns.
- Fast growth (340+ stars in 48 hours) suggests genuine developer demand for this specific bridge between ChatGPT web and local repos.

Cons:

- Requires ChatGPT Plus or Pro with Developer Mode access. Free accounts don't expose the app flow needed. That's a $20+/month prerequisite on top of whatever you're already spending on AI tools.
- The MCP tunnel setup adds infrastructure complexity. You need Node.js 20+, a tunnel provider (Cloudflare or ngrok), and the Developer Mode configuration in ChatGPT. Not hard, but more steps than `npm install -g codex-cli`.
- Two days old at time of writing. The API surface, tool modes, and configuration options are likely to change. Production use is premature — this is a tool to experiment with, not to build critical workflows around yet.
- Depends on ChatGPT's Developer Mode remaining available and MCP-compatible. If OpenAI changes the Developer Mode API or restricts MCP tool calling, CodexPro breaks.

### Getting Started

```bash
# Install globally
npm install -g codexpro

# Run setup in your project directory
cd your-project
codexpro setup

# CodexPro prints a Server URL — copy it
# In ChatGPT web: Settings -> Apps -> Create App
# Paste the Server URL as the MCP endpoint
# Start chatting — ChatGPT can now see and edit your local files

# Check configuration
codexpro status

# Run with specific tool mode
codexpro --tool-mode minimal   # read/search only
codexpro --tool-mode standard  # default: read/write/edit/bash
codexpro --tool-mode full      # everything including debug tools
```

For stable URLs across sessions, set up a Cloudflare named tunnel or ngrok domain and configure it in `codexpro setup`.

### Alternatives

**Claude Code** — Anthropic's terminal-native coding agent with direct file system access. Claude Code is more mature, better tested, and works without tunnels or MCP configuration. Choose it when you want a reliable, terminal-first agent with Claude's models. CodexPro is the choice when you specifically want ChatGPT's web interface as your coding surface.

**Codex CLI** — OpenAI's own local coding agent that runs in your terminal. It shares the same `AGENTS.md` conventions that CodexPro loads, and it can execute code directly with full terminal access. Choose Codex CLI when you want OpenAI's models with maximum local control. Choose CodexPro when you prefer the ChatGPT web UI over a terminal interface.

**Cursor** — An AI-native IDE with deep model integration, multi-file editing, and a visual interface. Cursor is a full IDE replacement with years of polish. Choose it when you want AI built into your editor. Choose CodexPro when you want to keep your existing editor and use ChatGPT's web interface as a supplementary coding agent.

### Verdict

CodexPro is a clever piece of infrastructure that solves a real problem: ChatGPT's web interface is something developers keep open all day, but it can't see your code. The MCP bridge approach is architecturally sound — it uses official APIs, respects safety boundaries, and fits into existing agent conventions like `AGENTS.md` and `.ai-bridge`. At 346 stars in two days, the developer interest is clearly there.

That said, this is day-two software. The tool modes, tunnel configuration, and security model will evolve. Don't restructure your workflow around it yet. But if you're a ChatGPT Plus subscriber who's been jealous of Claude Code users editing local files from their AI, install CodexPro and try it on a side project. The setup takes five minutes, and you'll know within ten whether the ChatGPT-web-as-coding-agent workflow clicks for you. For fullstack developers managing multiple repos and stacks, the ability to context-switch between projects without leaving a single browser tab is genuinely useful — assuming the tool matures enough to trust with real code.
