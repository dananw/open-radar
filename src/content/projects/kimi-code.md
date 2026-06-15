---
name: kimi-code
description: "Kimi Code CLI is MoonshotAI's open-source AI coding agent for the terminal — single-binary install, video input, subagents, and IDE integration via ACP."
url: https://github.com/MoonshotAI/kimi-code
stars: 2407
forks: 275
language: TypeScript
tags: ["ai-coding-agent", "cli", "terminal", "moonshot", "developer-tools"]
featured: false
publishedAt: 2026-06-15
---

## Kimi Code CLI

### Overview

Kimi Code CLI is an AI coding agent that runs entirely in your terminal. Built by MoonshotAI — the Chinese AI lab behind the Kimi series of models — it crossed 2,400 GitHub stars within three weeks of its late May 2026 launch. That's a strong signal for a tool entering a crowded field that already includes Claude Code, Codex CLI, and Gemini CLI.

The project is open source under the MIT license and written in TypeScript. What sets it apart from the growing pile of terminal AI agents is the installation story: it ships as a single binary. No Node.js runtime, no global npm modules, no PATH conflicts. You run one install script and you're done. For developers tired of managing Node.js versions just to run their coding tools, this is a real quality-of-life improvement.

MoonshotAI's background matters here. They're not a startup trying to ride the AI wave — they've been building large language models since 2023, and their Kimi models have consistently ranked well on coding benchmarks. Kimi Code CLI is the consumer-facing product of that research, and it shows in the tool's ability to handle complex, multi-file refactoring tasks without losing context.

### Why it matters

The terminal AI coding agent space is getting crowded fast. Claude Code from Anthropic, Codex CLI from OpenAI, Gemini CLI from Google — every major AI lab now has a terminal agent. But most of them share the same friction points: complex installation, Node.js dependency chains, and limited IDE integration. Kimi Code CLI addresses all three, and it does so while being fully open source.

The broader trend here is the convergence of AI agents and developer tooling. We're past the era of "AI as autocomplete" — these agents read entire codebases, run shell commands, search files, and make multi-step decisions. Kimi Code CLI pushes this further with features like video input (drop a screen recording and let the agent understand what you're trying to build) and subagents that can work in parallel on different parts of a problem. These aren't gimmicks. Video input solves the "I can't describe this UI bug in words" problem that every frontend developer knows.

For fullstack web developers specifically, the ACP (Agent Client Protocol) integration is the headline feature. You can drive Kimi Code CLI sessions directly from Zed, JetBrains, or any ACP-compatible editor. That means your AI agent isn't confined to a terminal pane — it's a first-class citizen in your IDE, with access to your project context, your cursor position, and your editing workflow.

### Key Features

**Single-Binary Distribution.** Install with one command on macOS, Linux, or Windows. No Node.js required, no global module conflicts, no PATH gymnastics. The binary is self-contained and ready to run immediately. This is a significant departure from tools like Claude Code and Codex CLI that require Node.js runtimes and npm installs.

**Video Input Support.** Drop a screen recording, demo clip, or GIF into the chat and the agent processes it visually. This is genuinely useful for frontend work — show it a broken layout, a reference design, or a user flow recording, and it translates visual information into code changes. You can turn a screen recording into working code or a reference clip into a LUT.

**Subagents for Parallel Work.** The tool ships with built-in `coder`, `explore`, and `plan` subagents that run in isolated contexts. The main conversation stays clean while subagents handle focused tasks in parallel. This is particularly useful for large refactoring jobs where you need to understand the codebase structure before making changes.

**AI-Native MCP Configuration.** Add, edit, and authenticate Model Context Protocol servers conversationally using `/mcp-config`. No hand-editing JSON files, no debugging connection strings. The agent understands MCP configuration as a first-class operation and guides you through setup interactively.

**Purpose-Built TUI.** The terminal UI is optimized for long, focused agent sessions. It starts in milliseconds and is built on `pi-tui`, a custom terminal framework. The interface is designed for the specific workflow of AI-assisted coding — not a generic terminal multiplexer repurposed for chat.

**IDE Integration via ACP.** Kimi Code CLI speaks the Agent Client Protocol, so ACP-compatible editors like Zed and JetBrains can drive sessions over stdio. Log in once in the terminal, then point your editor at `kimi acp` — no extra authentication needed. This bridges the gap between terminal-first agents and IDE-native workflows.

**Lifecycle Hooks and Plugin Ecosystem.** Run local commands at key points to gate risky tool calls, audit decisions, trigger desktop notifications, or connect to custom automation. Install skills, MCP servers, and data sources from the marketplace or any GitHub repo, with trust levels surfaced for each installation.

### Use Cases

- **Fullstack web development** — Navigate complex codebases spanning React frontends, NestJS backends, and database schemas. The agent reads context across file types and can run build commands to verify changes.
- **Frontend debugging with visual input** — Record your screen showing a CSS layout bug or an animation glitch, drop it into the chat, and let the agent diagnose and fix the issue from the visual reference.
- **Multi-file refactoring** — Use subagents to plan the refactoring strategy while the main agent executes changes, keeping the workflow organized across large codebases.
- **IDE-driven AI coding** — Run Kimi Code CLI as an agent server in Zed or JetBrains via ACP for a seamless coding experience without switching between terminal and editor.
- **Automated code review and testing** — Set up lifecycle hooks to automatically run linters, tests, or security scans after each agent action, creating a gated development workflow.
- **Rapid prototyping** — Describe what you want in natural language, let the agent scaffold the project structure, install dependencies, and generate boilerplate code across the full stack.

### Pros and Cons

Pros:
- Single-binary installation eliminates the Node.js dependency chain that plagues competing tools. Install in seconds, not minutes.
- Video input is a genuinely novel feature for terminal coding agents. The ability to show rather than tell solves real communication problems in UI development.
- Full open source under MIT license with active development from a well-funded AI lab. The 2,400+ stars in three weeks suggest strong community interest.
- ACP integration means the tool works in your IDE, not just in a terminal pane. This is where AI coding tools need to go.

Cons:
- Default model is MoonshotAI's Kimi, which may not match Claude or GPT-4 for all coding tasks. You can configure other providers, but the out-of-box experience is optimized for Kimi models.
- The project is less than a month old. The API surface, configuration options, and subagent behavior are likely to change significantly.
- Documentation is solid but the ecosystem is thin — fewer community skills, MCP servers, and integrations compared to Claude Code or Codex CLI.
- MoonshotAI is a Chinese company, which may raise data privacy concerns for some organizations. The tool can be configured with alternative providers to address this.

### Getting Started

```bash
# Install on macOS or Linux
curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash

# Or use Homebrew
brew install kimi-code

# Verify installation
kimi --version

# Start in a project directory
cd your-project
kimi

# First launch — login with OAuth or API key
# Inside the interactive UI, run:
/login

# Try your first task
> Take a look at this project and explain its main directories.

# Use as an ACP agent server for IDE integration
kimi acp
```

For Zed integration, add this to `~/.config/zed/settings.json`:

```json
{
  "agent_servers": {
    "Kimi Code CLI": {
      "type": "custom",
      "command": "kimi",
      "args": ["acp"],
      "env": {}
    }
  }
}
```

### Alternatives

**Claude Code** — Anthropic's terminal coding agent and the current market leader. Claude Code has the most mature ecosystem, the strongest model (Claude Opus), and the largest community. It requires Node.js and an Anthropic API key. Choose Claude Code when model quality is your top priority and you're already in the Anthropic ecosystem.

**Codex CLI** — OpenAI's terminal agent, optimized for GPT-4 and o-series models. Similar feature set to Claude Code but with OpenAI's model family. Installation requires Node.js. Choose Codex CLI when you're committed to OpenAI's models and want tight integration with their API platform.

**Gemini CLI** — Google's entry in the terminal agent space, leveraging Gemini models with generous free-tier quotas. Less mature than Claude Code but improving rapidly. Choose Gemini CLI when you want a free or low-cost option and Google's large context windows are useful for your workflow.

### Verdict

Kimi Code CLI is the most interesting new entry in the terminal AI agent space since Claude Code. The single-binary install alone makes it worth trying — I'm tired of managing Node.js versions just to run my coding tools. The video input feature is genuinely useful for frontend work, not a marketing gimmick. And the ACP integration for Zed and JetBrains shows that MoonshotAI understands where this category needs to go: out of the terminal pane and into the IDE.

The tool is young — less than a month old — so expect rough edges and breaking changes. The default Kimi models are competitive but not best-in-class for all coding tasks. But the MIT license, active development, and 2,400+ stars in three weeks suggest this project has real momentum. For fullstack web developers who want an open-source, easy-to-install terminal agent with IDE integration, Kimi Code CLI deserves a spot in your toolkit alongside Claude Code or Codex CLI. Try it on your next side project before committing to it for production work.
