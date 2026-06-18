---
name: devspace
description: "DevSpace is a self-hosted MCP server that turns ChatGPT into a local coding agent — read, edit, search, and run code in real projects with tunnel-secured access."
url: https://github.com/Waishnav/devspace
stars: 304
forks: 24
language: TypeScript
tags: ["mcp", "chatgpt", "local-development", "developer-tools", "ai-agents"]
featured: false
publishedAt: 2026-06-18
---

## DevSpace

### Overview

DevSpace is a self-hosted MCP (Model Context Protocol) server that gives ChatGPT a secure, direct connection to your local development environment. It's the missing bridge between ChatGPT's conversational interface and your actual codebase — the files, terminals, git repos, and tools sitting on your machine. With 304 GitHub stars and climbing in its first four days, it's one of the fastest-growing developer tools on GitHub this week, hitting the trending page within 48 hours of launch.

The project was built by Waishnav, the solo developer behind GitCMS, a Git-backed CMS for markdown sites. He's been on a public journey to build a profitable single-person company, and DevSpace is his latest bet: that ChatGPT is becoming the default interface for software development, and developers need a way to connect it to their local projects without uploading code to third-party servers. The tool is MIT-licensed, written in TypeScript, and runs on Node.js 20+.

The core problem DevSpace solves is straightforward but significant. ChatGPT can write code, review pull requests, debug errors, and explain complex systems — but it can't see your actual project. You're stuck copying files into chat, describing directory structures manually, or using tools like Codex that require a separate subscription and workflow. DevSpace eliminates that friction by exposing your local project as an MCP server that ChatGPT can connect to directly. Once connected, ChatGPT can read files, edit code, run shell commands, search your codebase, and even use git worktrees for parallel sessions — all through the same conversational interface you already use.

### Why it matters

The developer tools landscape is splitting into two camps: cloud-hosted AI coding environments (Codex, Cursor, Windsurf) and local-first tools that connect AI to your existing setup. DevSpace is firmly in the second camp, and that's where a lot of developers want to be. The appeal is obvious — your code stays on your machine, you control the connection, and you don't need to learn a new IDE or change your workflow. You just add a tunnel and start talking to ChatGPT about your code.

This matters because MCP is becoming the standard protocol for AI-tool integration. Anthropic designed it, but ChatGPT, Claude, Cursor, and a growing list of tools all support it now. The protocol is young, but adoption is accelerating. DevSpace is one of the first tools that makes MCP accessible to everyday developers who just want ChatGPT to understand their project. No custom tool definitions, no configuration files, no learning curve beyond a single `devspace init` command.

The timing is also notable. OpenAI's Codex agent is powerful but expensive and separate from ChatGPT. Many developers already pay for ChatGPT Plus and want coding capabilities without a second subscription. DevSpace gives them that by turning ChatGPT itself into a local coding agent through the MCP bridge. It's not a Codex replacement — the execution model is different — but for many workflows, it's close enough.

### Key Features

**Self-Hosted MCP Server.** DevSpace runs entirely on your machine. You install it globally via npm, run `devspace init` to configure allowed project folders and a port, then `devspace serve` to start the server. There's no cloud component, no account to create, no data leaving your machine except through the tunnel you control. The server exposes a standard MCP endpoint that ChatGPT (or any MCP-compatible client) can connect to.

**Tunnel-Secured Access.** The connection between ChatGPT and your machine goes through an HTTPS tunnel — Cloudflare Tunnel, ngrok, Pinggy, or Tailscale Funnel all work. DevSpace asks for your public URL during setup and binds the MCP endpoint to it. An owner password approval step ensures only you can authorize connections. The password is generated during `devspace init` and stored locally in `~/.devspace/auth.json`.

**Full File System Operations.** Once connected, ChatGPT gets tools to read, write, edit, and search files inside your approved project folders. It can inspect directory structures, grep through codebases, and make scoped edits to specific files. The workspace model means ChatGPT operates within boundaries you define — it can't wander into system directories or unrelated projects.

**Shell Command Execution.** ChatGPT can run shell commands inside your project — tests, builds, git operations, package scripts, anything your terminal can do. This is what makes DevSpace feel like a real coding agent rather than a code-aware chatbot. The combination of file access and shell execution means ChatGPT can follow the full edit-test-commit cycle without you touching the keyboard.

**Git Worktree Isolation.** DevSpace supports isolated git worktrees for parallel coding sessions. This is a sophisticated feature that lets ChatGPT work on multiple branches simultaneously without conflicts. Each worktree gets its own working directory, so ChatGPT can experiment on a feature branch while keeping your main branch clean. It's the kind of workflow that experienced developers use manually — DevSpace automates it.

**AGENTS.md and CLAUDE.md Support.** DevSpace reads project instruction files like `AGENTS.md` and `CLAUDE.md` that coding agents use for context. If your project already has these files (many do, especially after the Codex and Claude Code adoption wave), ChatGPT picks them up automatically. This means your project conventions, coding standards, and architectural decisions are communicated to the agent without manual prompting.

**Cross-Platform Compatibility.** DevSpace works on Linux, macOS, and Windows (via Git Bash, WSL, or MSYS2). The `devspace doctor` command inspects your local setup and reports what's missing. Node.js 20.12+ is required, with Node 22 LTS recommended. The CLI is clean and well-documented, with separate guides for setup, security, configuration, and troubleshooting.

### Use Cases

- **Local code reviews** — Ask ChatGPT to review your latest changes by connecting it to your repo. It can read the diff, understand the context, and provide feedback without you pasting code into chat.
- **Debugging sessions** — When you hit an error, ChatGPT can read the relevant files, check logs, run reproduction steps, and suggest fixes — all through the MCP connection.
- **Refactoring projects** — Give ChatGPT a refactoring goal and let it explore your codebase, identify patterns, and make changes across multiple files while you review.
- **Learning unfamiliar codebases** — New team members can use ChatGPT as a codebase guide. Point DevSpace at the repo and ask questions about architecture, data flow, or specific modules.
- **Rapid prototyping** — Describe what you want to build, and ChatGPT can scaffold files, install dependencies, and iterate on the implementation with real-time feedback from your terminal.

### Pros and Cons

Pros:
- Genuinely self-hosted with zero cloud dependencies. Your code never leaves your machine except through your own tunnel. For security-conscious developers and companies, this is the right architecture.
- Setup is remarkably fast — `npm install -g @waishnav/devspace && devspace init && devspace serve` gets you running in under two minutes.
- The git worktree feature is a standout. Parallel coding sessions with isolation is something even dedicated coding agents don't always support well.
- MIT license with active development. Waishnav has a track record (GitCMS) and is clearly invested in making this work.

Cons:
- 304 stars in four days is promising but still early. The project is brand new (created June 14, 2026), and there will be bugs, edge cases, and missing features that only surface with broader adoption.
- Requires a tunnel setup, which adds complexity for developers who haven't used Cloudflare Tunnel or ngrok before. The documentation covers this, but it's an extra step that cloud-based tools don't require.
- ChatGPT's MCP support is still evolving. The experience depends on how well ChatGPT handles MCP tools, which is outside DevSpace's control.
- Windows support requires Git Bash or WSL — native PowerShell and cmd.exe aren't supported yet, which limits adoption on Windows-only machines.

### Getting Started

```bash
# Install globally
npm install -g @waishnav/devspace

# Initialize (configure project folders, port, tunnel URL)
devspace init

# Start the server
devspace serve

# Check your environment
devspace doctor
```

After setup, connect ChatGPT to your public `/mcp` URL:

```
https://your-tunnel-host.example.com/mcp
```

Approve the connection with the owner password printed during `devspace init`. Then ask ChatGPT to open a project folder from your allowed roots.

### Alternatives

**OpenAI Codex** — The official OpenAI coding agent that runs in a cloud sandbox. It's more powerful for deep coding tasks (it has full terminal access, can install packages, and runs in an isolated environment), but it requires a separate subscription and doesn't connect to your local files. Choose Codex when you need a sandboxed environment for complex multi-file changes. Choose DevSpace when you want to work with your actual local project.

**Claude Code** — Anthropic's terminal-based coding agent that runs locally and has native MCP support. It's a CLI tool with its own interface, not a ChatGPT extension. Claude Code is more mature and better integrated with Anthropic's ecosystem, but it requires a Claude subscription and a different workflow. Choose Claude Code if you're already in the Anthropic ecosystem and prefer terminal-based interaction.

**Cursor / Windsurf** — AI-native IDEs that integrate LLMs directly into the editing experience. They're full IDE replacements with deep code understanding, autocomplete, and chat features. The tradeoff is you have to switch editors. Choose Cursor or Windsurf if you're willing to adopt a new IDE for AI capabilities. Choose DevSpace if you want to keep your current editor and add AI through ChatGPT.

### Verdict

DevSpace is a clever, well-timed tool that solves a real friction point for developers who use ChatGPT. The "paste your code into chat" workflow is broken, and cloud-based alternatives require subscriptions and workflow changes. DevSpace threads the needle: self-hosted, fast to set up, and it works with the ChatGPT account you already have. At 304 stars in four days, the community response validates the need. The git worktree support and AGENTS.md integration show thoughtful design beyond a basic MCP wrapper. The risks are real — it's brand new, tunnel setup adds friction, and the experience depends on ChatGPT's evolving MCP support. But for fullstack developers who want ChatGPT to actually understand their project without leaving their local environment, DevSpace is the most practical option available right now. Worth watching closely.
