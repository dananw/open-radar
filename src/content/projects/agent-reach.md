---
name: agent-reach
description: "Agent Reach gives your AI agent instant access to Twitter, Reddit, YouTube, GitHub, Bilibili and 10+ platforms — one CLI install, zero API fees."
url: https://github.com/Panniantong/Agent-Reach
stars: 23043
forks: 1950
language: Python
tags: ["ai-agents", "web-scraping", "mcp", "cli", "developer-tools"]
featured: false
publishedAt: 2026-06-08
---

## Agent Reach

### Overview

Agent Reach is a Python CLI tool that gives your AI agent instant access to 15+ internet platforms — Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu, LinkedIn, WeChat, and more — with zero API fees and a single install command. It hit 23,000 GitHub stars in just over three months since its February 2026 launch, making it one of the fastest-growing AI agent infrastructure projects this year.

The project is built by Panniantong, a developer who clearly got tired of re-configuring the same scraping and API tools every time they spun up a new AI agent. The frustration is real and shared: Twitter's API costs roughly $215/month for moderate usage, Reddit blocks server IPs with 403 errors, Bilibili geo-blocks overseas access, and XiaoHongShu requires login just to browse. Every platform has its own wall, and every developer has spent hours debugging configs to get their agent past even one of them.

Agent Reach solves this by acting as a scaffolding layer — it selects the best open-source tool for each platform, installs the dependencies, configures the connections, and registers a SKILL.md file so your agent knows what's available. After installation, the agent calls upstream tools directly (twitter-cli, yt-dlp, rdt-cli, gh CLI, Jina Reader, and others) without any wrapper overhead. The design is deliberately minimal: pick the right tool, wire it up, get out of the way.

### Why it matters

The AI agent ecosystem has a blind spot. We've gotten remarkably good at building agents that write code, manage files, and reason through problems — but ask them to check what people are saying on Twitter about a product, or to watch a YouTube tutorial and summarize it, and they hit a wall. The information density on social platforms, video sites, and community forums is enormous, but accessing it programmatically requires navigating a maze of paid APIs, anti-bot protections, and authentication flows.

Agent Reach addresses this gap directly. It's not trying to be a framework or an abstraction layer — it's a scaffolding tool that makes the boring, repetitive setup work disappear. The "zero API fees" claim isn't marketing fluff: it uses open-source CLI tools (yt-dlp for video, Jina Reader for web pages, twitter-cli for tweets, feedparser for RSS) and free services (Exa for semantic search, Groq Whisper for podcast transcription). The only potential cost is a $1/month proxy for server-based Bilibili access.

For fullstack developers building AI-powered tools, this is the missing infrastructure piece. Your NestJS backend can shell out to `agent-reach doctor` to check channel health. Your React dashboard can display real-time Twitter sentiment because your agent can actually read tweets now. Your Django admin can pull in Reddit discussions about your product. The tool doesn't care what your stack is — it's a CLI that any language can call.

### Key Features

**One-Command Agent Setup.** Copy a single URL to your AI agent and it handles the entire installation — detecting your environment, installing CLI tools, configuring search engines, and registering skill files. No manual dependency management, no config file editing. The agent reads the install.md file and executes everything autonomously. This is the kind of developer experience that makes adoption frictionless.

**15+ Platform Coverage with Zero Config.** Many platforms work immediately after install with no configuration at all. Web pages (via Jina Reader), YouTube subtitles (via yt-dlp), GitHub repos (via gh CLI), RSS feeds (via feedparser), and WeChat articles (via Exa) all work out of the box. Twitter, Reddit, and XiaoHongShu need cookie authentication — a two-minute process where you export from your browser using the Cookie-Editor Chrome extension.

**Pluggable Channel Architecture.** Each platform is an independent channel file that maps to an upstream tool. Don't like the default Twitter tool? Swap twitter-cli for the official API. Prefer Firecrawl over Jina Reader? Replace the web.py channel. The architecture is deliberately transparent — you can see exactly which tool handles each platform and change it without affecting anything else. This is a scaffolding, not a framework.

**Built-in Diagnostics.** The `agent-reach doctor` command gives you a clear status report of every channel: what's ready, what needs configuration, and exactly how to fix it. No guessing, no digging through logs. Run it after installation to see your coverage at a glance, or run it when something breaks to pinpoint the issue.

**MCP Server Integration.** Agent Reach uses mcporter to connect to MCP (Model Context Protocol) servers for platforms that benefit from it — Exa for semantic web search, XiaoHongShu for social media access, Douyin for video parsing. This means your agent gets structured, typed tool calls rather than raw shell output, which improves reliability and error handling.

**SKILL.md Auto-Registration.** After installation, Agent Reach registers a SKILL.md file in your agent's skills directory. This file teaches the agent what platforms are available and which commands to use for each task. No manual prompt engineering — the agent reads the skill file and knows to call `twitter tweet URL` for tweets, `yt-dlp --dump-json URL` for video subtitles, and so on.

**Security-First Design.** Cookies and tokens stay local in `~/.agent-reach/config.yaml` with 600 permissions. A `--safe` mode prevents automatic system package installation. A `--dry-run` mode previews all changes before executing. The tool is fully open source and auditable, and each channel can be independently replaced if you don't trust a particular upstream tool.

### Use Cases

- **Product sentiment analysis** — Your agent monitors Twitter, Reddit, and XiaoHongShu for mentions of your product, aggregates sentiment, and delivers daily summaries to your Slack channel or Telegram group.

- **Competitive intelligence** — Track what competitors are doing across GitHub (new releases, PR activity), YouTube (tutorial videos, demos), and tech forums (V2EX, Reddit) without manually checking each platform.

- **Content research and summarization** — Feed your agent a YouTube tutorial URL and get a clean transcript and summary. Subscribe to RSS feeds from industry blogs and get weekly digests. Read WeChat articles that are normally locked behind the app.

- **Developer workflow automation** — Your CI pipeline can use Agent Reach to check if a GitHub issue has relevant discussion on Reddit or Stack Overflow before auto-closing it. Your documentation bot can pull in real user feedback from social platforms.

- **AI-powered market research** — Combine Exa's semantic search with platform-specific scrapers to build a comprehensive view of market trends, user pain points, and emerging technologies across the entire internet.

### Pros and Cons

Pros:

- Genuinely zero API fees for most use cases. The tool chains together free open-source projects (yt-dlp has 148K stars, Jina Reader has 9.8K) rather than building proprietary scrapers that could break or charge later.

- The scaffolding architecture is the right abstraction level. It doesn't try to be a framework you lock into — it wires up best-in-class tools and gets out of the way. Swapping a channel's upstream tool is a single file change.

- The `agent-reach doctor` diagnostics are genuinely useful. Instead of debugging "why can't my agent read tweets," you get a clear status report with actionable fix instructions. This saves hours of troubleshooting.

- Works with any AI agent that can run shell commands — Claude Code, Cursor, Windsurf, OpenClaw, Hermes Agent. No vendor lock-in to a specific agent framework.

Cons:

- Cookie-based authentication for Twitter, Reddit, and XiaoHongShu carries account ban risk. The project recommends using throwaway accounts, which adds setup friction and limits the tool's usefulness for accessing your own social media data.

- The tool is primarily maintained by one developer and the README is Chinese-first (English, Japanese, and Korean translations exist but are secondary). For non-Chinese-speaking developers, some platform-specific guidance and issue discussions may be harder to follow.

- Server deployment requires a proxy ($1/month) for Bilibili and potentially other platforms that block datacenter IPs. Local development works fine, but production agent deployments on cloud servers face the same geo-blocking issues the tool aims to solve.

### Getting Started

```bash
# Install via pip
pip install https://github.com/Panniantong/agent-reach/archive/main.zip

# Run the auto-installer
agent-reach install --env=auto

# Check what's ready
agent-reach doctor
```

Or just copy this to your AI agent (Claude Code, Cursor, OpenClaw, etc.):

```
Install Agent Reach: https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md
```

The agent will handle the entire setup automatically. After installation, try these commands:

```bash
# Read any web page as clean Markdown
curl https://r.jina.ai/https://example.com

# Get YouTube video subtitles
yt-dlp --dump-json "https://youtube.com/watch?v=..."

# View a GitHub repo
gh repo view owner/repo

# Read a tweet (after cookie setup)
twitter tweet https://x.com/user/status/123456

# Check all channel statuses
agent-reach doctor
```

For Skill-based installation with Claude Code or OpenClaw:

```bash
npx skills add Panniantong/Agent-Reach@agent-reach
```

### Alternatives

**Firecrawl** — A web scraping API with a managed cloud service. Firecrawl is more polished for single-platform web scraping and offers structured data extraction, but it's a paid service for anything beyond basic usage. Agent Reach covers more platforms (social media, video, forums) and is completely free. Choose Firecrawl when you need reliable, managed web scraping at scale; choose Agent Reach when you need broad platform coverage without API costs.

**Browser Use** — An AI agent framework that controls a real browser to interact with websites. Browser Use can handle login flows and dynamic JavaScript-heavy sites that CLI tools can't touch, but it's slow, resource-intensive, and fragile when sites change their UI. Agent Reach is faster and more reliable for read-only access because it uses purpose-built CLI tools rather than browser automation. Choose Browser Use when you need to interact with sites (fill forms, click buttons); choose Agent Reach when you need to read and search.

**Tavily** — A search API built specifically for AI agents, offering structured search results with relevance scoring. Tavily is excellent for web search but doesn't cover social media platforms, video transcripts, or forum content. Agent Reach includes Exa for semantic search and adds 14 other platform channels on top. Choose Tavily when you only need web search and want a polished API; choose Agent Reach when your agent needs to access the broader internet ecosystem.

### Verdict

Agent Reach is the kind of tool that makes you wonder why it didn't exist sooner. Every developer building AI agents has hit the same wall: the agent is smart but blind to the internet's richest information sources. Twenty-three thousand stars in three months tells you the pain point is real and the solution resonates. The scaffolding architecture is the right call — it doesn't try to be a framework you depend on, it just wires up the best open-source tools for each platform and registers a skill file. For fullstack developers adding AI agent capabilities to their React, NestJS, or Django applications, Agent Reach is the fastest path to giving your agent real internet awareness. The cookie-based auth for some platforms is a limitation, and the Chinese-first documentation might slow adoption outside Asia, but neither is a dealbreaker. Install it, run `agent-reach doctor`, and your agent goes from reading your local files to reading the entire internet in under five minutes.
