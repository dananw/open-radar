---
name: browser-harness
description: "Self-healing browser harness that connects LLMs directly to Chrome via CDP — no middleware, no abstractions, just raw browser control for AI agents."
url: https://github.com/browser-use/browser-harness
stars: 14800
forks: 1391
language: Python
tags: ["browser-automation", "ai-agents", "cdp", "playwright", "web-scraping"]
featured: false
publishedAt: 2026-06-14
---

## Browser Harness

### Overview

Browser Harness is a Python tool that gives AI coding agents direct control of your real browser through Chrome DevTools Protocol. It crossed 14,000 GitHub stars in under two months, which tracks with the broader explosion in AI agent tooling during early 2026. The project comes from the Browser Use team, the same group behind the popular browser-use library for web agents.

The core idea is radical simplicity: one websocket to Chrome, nothing between the agent and the browser. No middleware servers, no abstraction layers, no framework-specific adapters. The agent writes the automation code it needs during execution, and the harness improves itself every run. If the agent needs to upload a file and the helper doesn't exist yet, it creates one. Next time, the helper is already there.

This approach solves a real problem in the AI agent space. Most browser automation tools assume the automation script is written ahead of time. But AI agents are inherently exploratory — they don't know what they'll need until they're in the middle of a task. Browser Harness embraces that reality. The harness ships with about 1,000 lines of core code across four files, plus a workspace where the agent accumulates site-specific knowledge over time.

### Why it matters

Browser automation for AI agents is becoming a critical infrastructure layer. Every coding agent, from Claude Code to Codex to Cursor, needs to interact with the web at some point — checking documentation, testing UIs, filling forms, scraping data. The existing options fall into two camps: heavyweight frameworks like Playwright and Puppeteer that require pre-written scripts, and thin wrappers that break on real-world sites.

Browser Harness sits in a useful middle ground. It connects to your actual Chrome instance (the one you're already logged into), so the agent has access to your sessions, cookies, and extensions. This matters because most useful web tasks require authentication. Nobody wants to re-login to every service just to run an automated check.

The self-healing architecture is the differentiator. When the agent encounters a new UI pattern — a date picker, a file upload dialog, a shadow DOM component — it writes the interaction code and files it as a reusable "interaction skill." These skills accumulate in the workspace and are shared across sessions. The agent learns your specific environment over time, rather than rediscovering the same DOM quirks every run.

For fullstack developers, this tool bridges the gap between writing code and verifying it works. You can tell your AI agent "test the login flow on localhost:3000" and it will actually do it, using your real browser, with your real dev server running.

### Key Features

**Direct CDP Connection.** Browser Harness connects to Chrome via the DevTools Protocol websocket — the same protocol Chrome's own DevTools uses. There's no Playwright or Puppeteer layer in between. This means zero overhead and full access to every CDP capability, including network interception, performance profiling, and security domain events.

**Self-Improving Agent Workspace.** The `agent-workspace/` directory is where the harness accumulates knowledge. `agent_helpers.py` contains reusable Python functions the agent writes during execution. Domain-specific skills live under `agent-workspace/domain-skills/<site>/`, with per-site playbooks for GitHub, LinkedIn, Amazon, and other complex sites. Each skill teaches the agent the selectors, flows, and edge cases for a specific site.

**Remote Browser Support.** For parallel sub-agents or headless deployment, Browser Harness supports Browser Use Cloud's free tier (3 concurrent browsers with proxies and CAPTCHA solving). Each sub-agent gets its own isolated browser instance via a distinct `BU_NAME`. You can reuse cloud profiles that are already logged into services, or sync local Chrome profiles to the cloud.

**Interaction Skills Library.** The `interaction-skills/` directory contains documented solutions for common browser mechanics: dialogs, tabs, dropdowns, iframes, uploads, drag-and-drop, shadow DOM, scrolling, screenshots, and more. When the agent gets stuck on a specific UI pattern, it reads the relevant skill file instead of guessing.

**Zero Configuration Start.** The entire setup is: clone the repo, run `uv tool install -e .`, and connect Chrome's remote debugging. The harness auto-discovers Chrome instances, manages daemon lifecycle, and handles updates. The `--doctor` command reports version, install mode, daemon state, and Chrome connection status.

**Heredoc Interface.** All browser commands are issued via heredoc Python blocks: `browser-harness <<'PY' ... PY`. This prevents shell quote mangling inside Python strings and JavaScript snippets, which is a common pain point with other CLI-driven browser tools. The daemon starts automatically on first invocation.

### Use Cases

- **End-to-end testing of web applications** — Tell the agent to "test the checkout flow on localhost:3000" and it navigates your real app, fills forms, clicks buttons, and reports failures. Works with React, Next.js, Django, or any web framework running locally.
- **Web scraping authenticated pages** — The agent uses your logged-in Chrome session to scrape data behind login walls. No need to manage cookies or tokens separately.
- **Automating repetitive web tasks** — Filing expenses, updating dashboards, posting content across platforms. The agent learns the flow once and repeats it.
- **Debugging production issues** — Connect to a staging or production browser session and have the agent reproduce user-reported bugs, capture screenshots, and inspect network requests.
- **AI agent browser capabilities** — Integrate with Claude Code, Codex, or any coding agent that needs to interact with the web as part of a larger task.

### Pros and Cons

Pros:
- Connects to your real Chrome instance with existing sessions and cookies, eliminating the authentication setup problem that plagues every other browser automation tool.
- The self-healing architecture means the harness gets better over time. Domain skills accumulate and are shared across sessions, reducing repeated failures on the same sites.
- Extremely thin core (~1,000 lines) means it's easy to understand, debug, and extend. No framework magic, no hidden state.

Cons:
- Python-only tooling. If your stack is TypeScript/Node.js, you're shelling out to Python every time. No native JavaScript API.
- The "agent writes its own code" model means the quality of automation depends heavily on the LLM's coding ability. Cheaper or smaller models may produce fragile helpers.
- Browser Use Cloud's free tier is limited to 3 concurrent browsers. Heavy usage requires paid tiers or self-hosted infrastructure.

### Getting Started

```bash
# Clone and install as an editable tool
git clone https://github.com/browser-use/browser-harness
cd browser-harness
uv tool install -e .
command -v browser-harness

# Enable Chrome remote debugging (one-time setup)
# Navigate to chrome://inspect/#remote-debugging and tick the checkbox

# Test the connection
browser-harness <<'PY'
new_tab("https://example.com")
wait_for_load()
print(page_info())
PY

# Register as a global skill for Claude Code
# Add to ~/.claude/CLAUDE.md:
# @~/Developer/browser-harness/SKILL.md

# Or for Codex
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills/browser-harness"
ln -sf "$PWD/SKILL.md" "${CODEX_HOME:-$HOME/.codex}/skills/browser-harness/SKILL.md"
```

### Alternatives

**Playwright** — Microsoft's browser automation framework with excellent cross-browser support and a mature API. Playwright is the right choice when you need deterministic, pre-scripted test suites that run in CI. Browser Harness is better when the automation needs to be adaptive and exploratory, which is the case for AI agents.

**browser-use** — The parent project's main library for building web agents with LangChain and other frameworks. browser-use provides a higher-level API with built-in LLM integration. Browser Harness is the lower-level tool that browser-use agents use under the hood — choose it when you want direct control without the framework abstraction.

**Puppeteer** — Google's Node.js library for controlling Chrome. Puppeteer is mature and well-documented, making it a solid choice for straightforward automation scripts. But it requires pre-written code and doesn't have the self-improving agent workspace that makes Browser Harness unique.

### Verdict

Browser Harness is the most practical tool I've seen for giving AI agents real browser control. The 14,800 stars in two months reflect genuine developer demand — every coding agent needs to touch the web eventually, and the existing options are either too heavy (Playwright test suites) or too brittle (thin API wrappers). The self-healing workspace model is the right architecture for agent-driven automation because it acknowledges that agents don't know what they need ahead of time. If you're building with Claude Code, Codex, or any AI coding agent and you need web interaction capabilities, this should be your first stop. The thin core, MIT license, and active development from the Browser Use team make it a safe bet for production use.
