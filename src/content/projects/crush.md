---
name: crush
description: "Crush is an open-source agentic coding CLI from Charmbracelet — Go-powered terminal AI assistant with LSP, MCP, and multi-model support that rivals Claude Code."
url: https://github.com/charmbracelet/crush
stars: 24899
forks: 1769
language: Go
tags: ["ai", "agentic-coding", "terminal", "golang", "developer-tools"]
featured: false
publishedAt: 2026-06-02
---

## Crush

### Overview

Crush is an agentic coding assistant that lives in your terminal. Built by Charmbracelet — the team behind Bubble Tea, Glow, Lip Gloss, and a dozen other beloved Go TUI tools — it hit 25,000 GitHub stars within its first year and landed on Hacker News' front page with 367 points and 235 comments. That kind of reception for a terminal tool in a market already crowded with AI coding assistants tells you something.

The Charmbracelet team, led by Márk Sági-Kazár and Carlos Alexandro Becker, has been building Go terminal infrastructure since 2019. Their Bubble Tea framework powers over 25,000 applications. When they decided to build an AI coding agent, they didn't start from scratch — they built on top of years of TUI ergonomics research. The result is a tool that feels native to the terminal in a way that most AI coding tools don't.

The core pitch: Claude Code is great but locked to Anthropic. Cursor is great but locked to an IDE. Crush gives you an agentic coding experience in any terminal, with any LLM, on any platform — macOS, Linux, Windows, FreeBSD, OpenBSD, NetBSD, and even Android. It supports OpenAI, Anthropic, Google Gemini, Groq, DeepSeek, Ollama, LM Studio, Amazon Bedrock, Azure OpenAI, and roughly a dozen other providers out of the box. You can switch models mid-session without losing context.

### Why it matters

The AI coding agent space is consolidating fast. Claude Code, Cursor, GitHub Copilot, Windsurf — they're all fighting for developer mindshare. But most of them share a common limitation: they're either tied to a specific LLM provider or require a specific IDE. For developers who live in the terminal and want provider flexibility, the options have been thin.

Crush fills that gap with a tool that's genuinely terminal-native. Not a web app wrapped in Electron. Not a VS Code extension. A Go binary that renders with Bubble Tea and understands your terminal's layout, clipboard, and notification system. The LSP integration is the standout differentiator — Crush connects to the same language servers you already use (gopls, typescript-language-server, nil for Nix) and feeds that context to the LLM. That means it gets type information, go-to-definition data, and diagnostics that text-only coding agents miss entirely.

The MCP (Model Context Protocol) support is equally important. Crush connects to MCP servers via stdio, HTTP, and SSE transports, which means it can interact with your GitHub repos, databases, file systems, and any custom tooling you've already built. In a world where MCP is becoming the standard for AI-tool interoperability, having first-class support matters.

### Key Features

**Multi-Model with Mid-Session Switching.** Crush supports 20+ LLM providers natively — OpenAI, Anthropic, Google Gemini, Groq, DeepSeek, Cerebras, Hugging Face, and more. You can switch models mid-session and preserve conversation context. If Claude Sonnet 4 is struggling with a task, drop to DeepSeek V3 for a different perspective without restarting. Custom providers work via OpenAI-compatible or Anthropic-compatible API configuration, so any model behind an OpenAI-shaped endpoint works.

**LSP-Enhanced Context.** This is Crush's killer feature. It connects to language servers (gopls for Go, typescript-language-server for TypeScript/JavaScript, nil for Nix, and others) and feeds real compiler-level context to the LLM. When Crush edits your Go code, it sees actual type information and can catch errors before they happen. Most competing tools only see text. Crush sees structured code.

**MCP Server Integration.** Full Model Context Protocol support with three transport types: stdio for local command-line servers, HTTP for remote endpoints, and SSE for streaming connections. Shell-style variable expansion works in MCP configs, so `$TOKEN` and `$(cat secret)` resolve correctly on every platform including Windows. You can connect GitHub, filesystem, database, and custom MCP servers.

**Session-Based Workflow Management.** Crush maintains multiple work sessions per project, each with independent context and conversation history. The experimental client-server architecture (opt-in via `CRUSH_CLIENT_SERVER=1`) lets multiple terminals share a workspace — two developers can view the same session in real time, with `IsBusy` and `AttachedClients` signals showing session state.

**Hooks for Deterministic Control.** Pre-tool-use hooks let you intercept and modify agent behavior before tools execute. Block dangerous commands (`git push -f`), rewrite tool input, inject context into the model's working memory, auto-approve safe operations, or log specific tool calls. Hooks are shell commands in any language — Bash, Python, Node, whatever. They're Claude Code-compatible, so existing hook configurations port over.

**Agent Skills Ecosystem.** Crush supports the Agent Skills open standard for extending capabilities with reusable skill packages. Skills are folders with a SKILL.md file that Crush discovers and activates on demand. It looks in global paths (`~/.config/crush/skills/`, `~/.config/agents/skills/`) and project-local paths (`.crush/skills/`, `.claude/skills/`, `.cursor/skills/`). User-invocable skills appear in the command palette (Ctrl+P). You can pull skills from the Anthropic skills repository or create your own.

**Cross-Platform TUI Excellence.** Built on Bubble Tea, the terminal UI framework powering 25,000+ applications. Desktop notifications fire when the agent needs permission or finishes a turn (only when the terminal isn't focused). Clipboard integration works natively on macOS and Windows, with `wl-copy`/`xclip` support on Linux. The TUI includes a compact mode, debug logging, and `.crushignore` file support alongside `.gitignore`.

### Use Cases

- **Fullstack development** — Run Crush against a React + Go monorepo with LSP servers for both TypeScript and Go. The agent sees real type information from both sides of the stack, making cross-language refactoring safer.
- **Multi-developer pair programming** — Use the experimental client-server mode to share a Crush workspace. Two developers see the same session, same context, same tool calls in real time.
- **Provider-hopping cost optimization** — Start with Claude Sonnet 4 for complex reasoning, switch to DeepSeek V3 for bulk refactoring at 1/10th the cost, then use a local Ollama model for sensitive code that can't leave your machine.
- **CI/CD pipeline automation** — Use Crush in non-interactive mode with hooks to automate code review, test generation, or documentation updates as part of your build pipeline.
- **Nix and infrastructure work** — With first-class Nix language server support and NUR packaging, Crush works well for NixOS configuration, flake development, and infrastructure-as-code tasks.

### Pros and Cons

Pros:
- LSP integration is genuinely unique among AI coding agents. Getting real type information and diagnostics into the LLM's context makes a measurable difference in code quality — especially for Go and TypeScript where types carry significant meaning.
- Provider flexibility is unmatched. No other tool supports this many LLM providers natively, and the mid-session model switching preserves context. You're never locked into a single vendor.
- The Charm team's TUI expertise shows. Every interaction feels polished — clipboard, notifications, keyboard navigation, compact mode. It's the best-looking AI coding terminal tool available.

Cons:
- The FSL-1.1-MIT license is source-available but not traditional open source. It converts to MIT after two years, but during that period, competing commercial use is restricted. This matters if you're building a product in the same space.
- Still catching up to Claude Code in pure agentic capability. As of v0.74.1 (late May 2026), the hook system only supports `PreToolUse` — Claude Code's full hook lifecycle is more mature.
- No built-in image or screenshot understanding. If your workflow involves visual UI debugging or design-to-code, you'll need MCP servers to bridge that gap.

### Getting Started

```bash
# Install via Homebrew (macOS/Linux)
brew install charmbracelet/tap/crush

# Or via npm
npm install -g @charmland/crush

# Or via Go
go install github.com/charmbracelet/crush@latest

# Set your API key (pick one)
export ANTHROPIC_API_KEY=sk-ant-...
# or
export OPENAI_API_KEY=sk-...
# or
export DEEPSEEK_API_KEY=sk-...

# Launch Crush in your project directory
cd your-project
crush
```

Configure LSP for your stack:

```json
{
  "$schema": "https://charm.land/crush.json",
  "lsp": {
    "go": {
      "command": "gopls"
    },
    "typescript": {
      "command": "typescript-language-server",
      "args": ["--stdio"]
    }
  }
}
```

Add MCP servers:

```json
{
  "$schema": "https://charm.land/crush.json",
  "mcp": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/",
      "headers": {
        "Authorization": "Bearer $GH_PAT"
      }
    }
  }
}
```

### Alternatives

**Claude Code** — Anthropic's official agentic coding CLI, now open source. Claude Code has deeper integration with Claude models and a more mature hook system. It's the better choice if you're all-in on Anthropic and want the most capable single-provider agent. But it doesn't support other LLMs, and its TUI is less polished than Crush's Bubble Tea-based interface.

**Aider** — A Python-based AI pair programming tool that runs in the terminal. Aider has strong git integration and supports multiple LLM providers, but it lacks LSP integration and MCP support. Better choice if you want a simpler, more focused tool for git-aware code editing without the full agentic overhead.

**OpenCode** — Another terminal-based AI coding agent with multi-provider support. OpenCode is newer and smaller than Crush but has some interesting features like Zen mode. Better choice if you want a lighter-weight alternative and don't need LSP integration or the Charm ecosystem polish.

### Verdict

Crush is the best terminal-native AI coding agent available right now, and it's not particularly close. The LSP integration alone puts it in a different category from text-only coding assistants — when the agent can see actual type information and compiler diagnostics, the quality of its output improves in ways you notice immediately. Add the unmatched provider flexibility, the Charm team's TUI polish, and the MCP/Hooks extensibility, and you have a tool that's genuinely useful for professional development work. The 25K stars in a year, the 367-point HN launch, and the 874 commits from the lead maintainer all point to a project with serious momentum. If you work in a terminal and you're tired of being locked into a single AI provider or IDE, install Crush today.
