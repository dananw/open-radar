---
name: browser-harness
description: "Self-healing browser harness that connects LLMs directly to Chrome via CDP — agents write their own helpers during execution."
url: https://github.com/browser-use/browser-harness
stars: 14090
forks: 1304
language: Python
tags: ["browser-automation", "ai-agent", "cdp", "playwright", "llm", "web-automation"]
featured: false
publishedAt: 2026-05-31
---

## browser-harness

Browser Harness is an open-source tool from the browser-use team that connects an LLM directly to your real Chrome browser via a thin, editable CDP (Chrome DevTools Protocol) harness. Unlike traditional browser automation frameworks, the agent writes its own missing helpers during execution — making the harness self-healing and self-improving with every run. It's the bridge between AI agents and real browser interactions, designed for tasks where you need complete freedom.

### Why it matters

For fullstack web developers building AI-powered tools, Browser Harness solves the hard problem of reliable browser automation. Instead of brittle selectors and fragile scraping scripts, you get an LLM-powered agent that adapts to UI changes in real time. The community-contributed "domain skills" system means the agent learns site-specific patterns (LinkedIn, GitHub, Amazon, etc.) and shares that knowledge. It's the missing layer between your AI backend and real-world web interactions.

### Key Features

- **Self-healing execution** — The agent writes missing helpers on the fly, so automation improves with every run instead of breaking.
- **Direct CDP connection** — One websocket to Chrome, nothing between. Thin architecture (~1k lines across 4 core files).
- **Domain skills system** — Community-contributed per-site playbooks that teach the agent selectors, flows, and edge cases for specific websites.
- **Cloud browser support** — Free Browser Use Cloud tier with stealth browsers, sub-agents, proxies, and CAPTCHA solving — no card required.
- **Agent-native design** — Works with Claude Code, Codex, Cursor, and other coding agents out of the box via simple setup prompts.

### Language & Stack

Python · MIT License · CDP Protocol

### Getting Started

```bash
pip install browser-harness
# Or paste the setup prompt into Claude Code / Codex:
# "Set up https://github.com/browser-use/browser-harness for me."
```
