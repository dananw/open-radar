---
name: kimi-code
description: "Kimi Code CLI is MoonshotAI's terminal-based AI coding agent with video input, subagents, and single-binary distribution — 1.5K stars in 10 days."
url: https://github.com/MoonshotAI/kimi-code
stars: 1593
forks: 152
language: TypeScript
tags: ["ai-agent", "cli", "terminal", "coding-assistant", "typescript"]
featured: false
publishedAt: 2026-06-03
---

## Kimi Code CLI

### Overview

Kimi Code CLI is an AI coding agent that runs entirely in your terminal. Built by MoonshotAI — the Beijing-based company behind the Kimi model family that's been making waves in the Chinese and international AI markets — it launched on May 22, 2026 and crossed 1,500 GitHub stars within its first ten days. That kind of velocity usually means the tool is solving a real problem, or at least solving it in a way that developers find compelling.

The project is written in TypeScript and distributed as a single binary. No Node.js installation required, no PATH wrangling, no global npm module conflicts. You run an install script and you get a `kimi` command. That's it. The TUI (terminal user interface) is built on top of `pi-tui`, a purpose-built terminal UI library, and starts in milliseconds. For developers who live in the terminal and want an AI assistant that doesn't pull them into a browser or VS Code extension, the ergonomics are solid.

The core pitch: Kimi Code reads your codebase, edits files, runs shell commands, searches across your project, fetches web pages, and makes decisions about what to do next based on the feedback it receives. It works out of the box with MoonshotAI's Kimi models but supports other compatible providers through configuration. The CLI ships with three built-in subagents — `coder`, `explore`, and `plan` — that can operate in isolated contexts while keeping your main conversation thread clean. That subagent architecture is what separates it from simpler "chat with your code" tools.

### Why it matters

The AI coding agent space in mid-2026 is crowded. Claude Code, Cursor, GitHub Copilot, Windsurf, Aider, Continue — the list keeps growing. But most of these tools either tie you to a specific IDE (Cursor, Windsurf) or a specific model provider (Claude Code). Kimi Code CLI is interesting because it's a terminal-native agent from a major AI lab that's explicitly model-agnostic in its design. You can use it with Kimi's models, but the architecture supports any compatible provider.

More importantly, MoonshotAI has the resources and the model quality to sustain a project like this. Kimi's models have been competitive on coding benchmarks, and the company has been shipping aggressively — their Kimi K2 model launched to strong reviews earlier in 2026. When a well-funded AI lab open-sources its coding agent, it's worth paying attention. They're not building this as a hobby project; it's a strategic play to get developers into their ecosystem.

The video input feature is a signal of where AI coding tools are heading. You can drop a screen recording into the chat and let the agent watch what you're describing instead of trying to explain a UI bug or a workflow in text. It sounds like a gimmick until you try to describe a complex CSS layout issue to an AI in words. Multimodal input for coding tasks is going to be table stakes within a year, and Kimi Code has it now.

### Key Features

**Single-Binary Distribution.** The install process is a one-liner curl script on macOS/Linux or an irm command on Windows PowerShell. No runtime dependencies, no version managers, no "please install Node.js 24 first." The binary is self-contained and the TUI launches in milliseconds. This matters more than people think — every additional setup step is a user who bounces.

**Subagent Architecture.** Kimi Code ships with three built-in subagents: `coder` for writing and editing code, `explore` for navigating and understanding codebases, and `plan` for breaking down complex tasks. Each subagent runs in an isolated context, so your main conversation doesn't get cluttered with intermediate exploration steps. You can dispatch subagents in parallel, which means the agent can be investigating your test setup while simultaneously drafting a new module.

**Video Input Support.** Drop a screen recording or demo clip into the terminal chat, and the agent processes it as a visual input. This is genuinely useful for UI debugging, describing workflows that are hard to put into words, or showing the agent what a bug looks like rather than trying to describe it. Not many terminal tools support this yet.

**AI-Native MCP Configuration.** The `/mcp-config` command lets you add, edit, and authenticate Model Context Protocol servers conversationally. No hand-editing JSON config files. This is a small thing that removes a real friction point — MCP configuration is one of the most complained-about parts of setting up AI coding tools.

**Lifecycle Hooks.** You can configure local commands to run at key points during the agent's execution cycle. Use them to gate risky tool calls (like `git push` or database migrations), audit the agent's decisions, trigger desktop notifications when a long task completes, or connect to your own automation pipelines. The hook system gives you guardrails without micromanaging every action.

**Blazing-Fast Startup.** The TUI is ready in milliseconds. Starting a session never feels heavy. In a world where some AI tools take 5-10 seconds to initialize, this matters for developer flow state.

**Built-in Documentation and Command Reference.** The project ships with comprehensive docs covering getting started, interaction patterns, session management, configuration files, and a full command reference. The docs are available online and kept in sync with the codebase.

### Use Cases

- **Fullstack developers exploring unfamiliar codebases** — Use the `explore` subagent to map out a project's architecture, understand dependency relationships, and identify key entry points before making changes. Works especially well with monorepos and multi-service setups.

- **Terminal-native developers who want AI assistance without leaving their workflow** — If you use tmux, Neovim, or a minimal editor setup, Kimi Code fits into your existing terminal workflow without requiring an IDE switch.

- **Teams debugging complex visual issues** — The video input feature lets you record a bug, drop it into the chat, and have the agent analyze the visual behavior alongside the code. Useful for CSS layout problems, animation glitches, and UI state issues.

- **Developers building multi-step automation** — The lifecycle hooks and subagent dispatch make it possible to build sophisticated workflows: code review gates, automated testing sequences, or deployment validation chains that the agent orchestrates.

- **Projects using MCP-compatible tools** — The conversational MCP configuration makes it straightforward to connect Kimi Code to databases, APIs, and other tools that expose MCP servers, without wrestling with JSON config files.

### Pros and Cons

Pros:
- Single-binary distribution eliminates the installation friction that plagues most Node.js-based CLI tools. Run the install script, get the command. No runtime dependencies to manage.
- The subagent architecture is genuinely useful for complex tasks. Being able to dispatch `explore` and `coder` agents in parallel while keeping the main conversation clean is a real productivity multiplier.
- Video input is a forward-looking feature that most competitors don't offer yet. For visual debugging, it's more practical than describing UI issues in text.
- Backed by MoonshotAI, a well-funded AI lab with competitive models. This isn't a side project that'll be abandoned in three months.

Cons:
- The primary model backend is MoonshotAI's Kimi, which may not be available or performant in all regions. The documentation mentions other compatible providers, but the out-of-the-box experience is optimized for Kimi models.
- 98 open issues after just 10 days suggests the project is evolving rapidly, which means breaking changes are likely. Not ideal for teams that need stability.
- The TUI-based interface, while fast, doesn't offer the rich diff views and inline editing that IDE-integrated tools like Cursor provide. For heavy refactoring sessions, you might still want a visual editor.
- Relatively new project with a small contributor base (mostly MoonshotAI engineers). Community ecosystem and third-party integrations are still nascent.

### Getting Started

```bash
# Install on macOS or Linux
curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash

# Verify installation
kimi --version

# Start an interactive session in your project
cd your-project
kimi

# Inside Kimi Code, login on first launch
/login

# Try your first task
> Take a look at this project and explain its main directories.

# Configure MCP servers conversationally
/mcp-config

# Use subagents for parallel work
> [Use the explore subagent to map the auth flow, then have the coder subagent add refresh token support]
```

For npm-based installation, upgrade, or uninstall, see the [Getting Started guide](https://moonshotai.github.io/kimi-code/en/guides/getting-started).

### Alternatives

**Claude Code** — Anthropic's terminal-based coding agent, arguably the market leader in this space. Claude Code has a larger community, more mature tooling, and direct access to Claude's models which are generally considered top-tier for coding. Choose Claude Code if you're already in the Anthropic ecosystem or want the most battle-tested terminal agent available.

**Aider** — An open-source AI pair programming tool that works in the terminal with multiple LLM providers. Aider has been around longer, has a more established community, and offers fine-grained control over which files the AI can edit. Choose Aider if you want maximum model flexibility and don't need the subagent architecture or video input features.

**OpenCode** — Another terminal-based AI coding agent that emphasizes simplicity and model agnosticism. OpenCode is lighter-weight and has fewer features, but it's also less opinionated about how you work. Choose OpenCode if you want a minimal agent that gets out of your way.

### Verdict

Kimi Code CLI is the most interesting terminal AI agent launch since Claude Code. The single-binary distribution, subagent architecture, and video input features are genuinely differentiated, not just marketing copy. At 1,593 stars in 10 days, the developer community is clearly paying attention. The main risk is maturity — 98 open issues and a young community mean you're an early adopter, not a safe corporate bet. But if you're a fullstack developer who lives in the terminal and wants an AI coding agent that doesn't force you into an IDE, Kimi Code is worth trying right now. The MoonshotAI backing gives it a better-than-average chance of sustained development, and the features it ships today — particularly the subagent dispatch and lifecycle hooks — feel like where all terminal agents will be in six months.
