---
name: wesight
description: "WeSight is an open-source desktop AI agent workspace built with React and TypeScript — a visual control console for Claude Code, Codex, Hermes Agent, and more."
url: https://github.com/freestylefly/wesight
stars: 517
forks: 134
language: TypeScript
tags: ["ai-agents", "developer-tools", "electron", "react", "desktop-app"]
featured: false
publishedAt: 2026-06-09
---

## WeSight

### Overview

WeSight is an open-source desktop control console for local AI coding agents. Built with React, TypeScript, and Electron, it gives you a visual workspace to install, configure, and run terminal-native agents like Claude Code, Codex, OpenClaw, Hermes Agent, OpenCode, Qwen Code, and DeepSeek-TUI — all from a single GUI. The project hit 500+ GitHub stars within its first month of public release in May 2026, which signals real demand for what it's offering.

The project comes from freestylefly, a developer who clearly spent time wrestling with the fragmented setup that coding agents demand today. Every agent has its own CLI, its own config format, its own way of handling permissions and model routing. If you run more than one agent — and most developers doing serious AI-assisted work do — you're juggling terminal windows, environment variables, and API keys across half a dozen tools. WeSight tries to collapse that into one window.

The core problem it solves: terminal-native coding agents are powerful, but their setup, model routing, permissions, IM entry points, file changes, and runtime metrics live in separate places. WeSight turns those moving pieces into a unified desktop workspace where you can chat with agents, watch file diffs in real time, track token usage and costs, browse a skills marketplace, and even connect agents to IM channels like Feishu.

### Why it matters

The coding agent landscape in mid-2026 is fragmented in a way that mirrors the early days of container orchestration. You have Claude Code, Codex, OpenClaw, Hermes Agent, and a growing list of others — each excellent at what they do, each with its own interface paradigm. Developers who want to use multiple agents end up context-switching between terminal sessions, which defeats the purpose of having a unified AI-assisted workflow.

WeSight is interesting because it doesn't try to replace these agents. It wraps them. Think of it as the Kubernetes dashboard for your local coding agents — it doesn't do the work, it gives you visibility and control over the work being done. The runtime dashboard alone is worth looking at: it tracks engine, model, tokens, TTFT, output-phase TPS, estimated model TPS, tool latency, steps, status, and duration per task. That kind of observability doesn't exist in most agent workflows today.

The broader trend here is the professionalization of AI-assisted development. We've moved past the "wow, ChatGPT can write code" phase into "how do I manage a fleet of specialized agents across my projects." WeSight is one of the first tools to treat that as an ops problem rather than a prompting problem.

### Key Features

**Multi-Engine Agent Support.** WeSight supports eight agent engines out of the box: Claude Code, Codex, OpenClaw, Hermes Agent, OpenCode, Qwen Code, DeepSeek-TUI, and a built-in runtime. Each engine can be installed with one click on macOS or configured from existing local CLI setups. You don't have to abandon your current terminal workflow — WeSight detects what you already have installed and reuses it.

**Unified Model Provider Configuration.** Instead of configuring API keys in each agent's separate config file, WeSight provides a single settings panel for OpenAI, Anthropic Claude, Google Gemini, DeepSeek, Qwen, Moonshot, Ollama, OpenRouter, GitHub Copilot, and custom OpenAI-compatible endpoints. Switch models across all agents from one place. This is particularly useful if you're routing different tasks to different models based on cost or capability.

**AI Runtime Dashboard.** This is the feature that separates WeSight from a simple terminal multiplexer. The dashboard shows per-task metrics including engine, model, source, status, tokens consumed, completion time, time-to-first-token, output-phase tokens per second, estimated model TPS, tool latency, and agent steps. If you're running agents on metered API plans, this gives you real-time cost visibility that you won't get from the agents themselves.

**Live Workspace with Real-Time Diffs.** Open a side panel that shows file writes, code changes, tool activity, and generated artifacts as the agent works. Instead of waiting for an agent to finish and then reviewing a wall of terminal output, you can watch the code evolve in real time with static diffs. This changes how you interact with long-running agent tasks.

**IM Agent Hub.** Route messages from Feishu (and potentially other IM platforms) into your coding agents with per-engine bot profiles. This is a feature that enterprise teams will care about — it lets non-developers trigger agent workflows through a chat interface without touching a terminal. The per-engine configuration means you can have different bots for different purposes.

**SkillHub Marketplace.** Browse, install, enable, disable, update, and remove local WeSight skills from a built-in marketplace. Skills extend what agents can do, and the marketplace model means you don't have to manually manage skill files across multiple agent configurations.

### Use Cases

- **Multi-agent development workflows** — Developers who use Claude Code for code generation, Codex for testing, and Hermes Agent for documentation can manage all three from a single workspace instead of three terminal windows.
- **Team-wide agent observability** — Engineering leads who want visibility into how their team uses AI agents can track token usage, costs, and task completion rates through the runtime dashboard.
- **IM-triggered automation** — Teams using Feishu for internal communication can set up agent bots that respond to messages, run tasks, and report results back through the chat interface.
- **Agent skill development** — Developers building custom skills for coding agents can test and iterate on them through WeSight's SkillHub and live workspace instead of running manual CLI tests.
- **Cost monitoring for metered API plans** — Individual developers or small teams on pay-per-token plans can track spending in real time across all configured agents and models.

### Pros and Cons

Pros:
- The multi-engine approach is genuinely useful. Most developers use more than one coding agent, and having a unified interface for all of them reduces context-switching overhead significantly.
- The runtime dashboard provides observability that doesn't exist anywhere else in the agent ecosystem. Token usage, latency metrics, and cost tracking per task is data you can't easily get from the agents themselves.
- One-click agent installation lowers the barrier to entry for developers who want to try new agents without reading through CLI setup docs.

Cons:
- macOS-only in current releases. Windows and Linux users are out of luck for now, which excludes a significant portion of the developer community. The Electron foundation should make cross-platform builds feasible eventually.
- Electron-based desktop apps carry the usual memory overhead. For a tool that wraps terminal-based agents — which are already lightweight — the resource footprint of a Chromium shell is worth considering on machines with limited RAM.
- Early-stage project with 134 forks suggests the contributor base is still small. The feature roadmap is ambitious (IM integrations, skill marketplace, scheduled tasks), and execution will depend on sustained community involvement.

### Getting Started

```bash
# Download the latest release for macOS
# Visit: https://github.com/freestylefly/wesight/releases/latest

# Or clone and build from source
git clone https://github.com/freestylefly/wesight.git
cd wesight
npm install
npm run dev
```

Once WeSight is running:

1. Open the **Agent Engines** panel and select which agents to install or detect.
2. Configure your model providers under **Settings** — add API keys for OpenAI, Anthropic, Google, or local Ollama endpoints.
3. Start a **Cowork Chat** session with any configured agent.
4. Open the **Live Workspace** to watch file changes in real time.
5. Check the **Runtime Dashboard** to monitor token usage and costs.

### Alternatives

**Cursor** — An AI-native code editor with built-in agent capabilities. Cursor is a full IDE replacement with deep Claude and GPT integration, whereas WeSight is a control console that wraps existing agent CLIs. Choose Cursor if you want a single editor with AI baked in. Choose WeSight if you want to keep your existing editor and manage multiple agent workflows separately.

**Continue.dev** — An open-source AI code assistant that integrates with VS Code and JetBrains. Continue focuses on inline code assistance within your editor, while WeSight focuses on orchestrating standalone agent CLIs. Choose Continue if you want AI suggestions in your existing IDE. Choose WeSight if you're running autonomous agent tasks that need monitoring and multi-engine coordination.

**OpenCode** — A terminal-based AI coding agent with its own TUI. OpenCode is a single agent with a rich terminal interface, while WeSight is a multi-agent workspace that includes OpenCode as one of its supported engines. Choose OpenCode directly if you only need one agent and prefer terminal-native workflows. Choose WeSight if you're managing multiple agents and want a GUI.

### Verdict

WeSight fills a gap that most developers didn't realize they had until they started running more than one coding agent. The multi-engine support, unified model configuration, and runtime dashboard make it the most complete control surface for the fragmented agent ecosystem that exists in mid-2026. It's not trying to replace Claude Code or Codex — it's trying to make them work together, and that's a more interesting problem. The macOS-only limitation and Electron overhead are real drawbacks, but neither is unusual for an early-stage developer tool. If you're running multiple AI agents for your daily development work and you're tired of juggling terminal sessions, WeSight is worth the 5 minutes it takes to install.
