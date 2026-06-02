---
name: obscura
description: "Obscura is a lightweight Rust headless browser for AI agents and web scraping — drop-in replacement for headless Chrome with built-in stealth mode and MCP support."
url: https://github.com/h4ckf0r0day/obscura
stars: 14062
forks: 911
language: Rust
tags: ["browser-automation", "ai-agents", "web-scraping", "rust", "mcp"]
featured: false
publishedAt: 2026-06-03
---

## Obscura

### Overview

Obscura is a headless browser engine written in Rust, purpose-built for web scraping and AI agent automation. It crossed 14,000 GitHub stars in under two months after its April 2026 launch, which tracks with how hungry the developer community is for something that isn't headless Chrome.

The project uses V8 directly for JavaScript execution and implements the Chrome DevTools Protocol (CDP), making it a drop-in replacement for headless Chrome when used with Puppeteer or Playwright. The pitch is simple: you get the same protocol-level compatibility without the 200+ MB memory footprint, the 2-second startup time, or the dependency on a full Chrome installation.

The numbers tell the story. Obscura uses 30 MB of memory versus Chrome's 200+ MB. Its binary is 70 MB compared to Chrome's 300+ MB. Static page loads benchmark at 51 ms versus Chrome's ~500 ms. For anyone running browser automation at scale — scraping pipelines, E2E testing, AI agent web interactions — those margins matter. A single machine running Obscura can handle workloads that would otherwise require multiple Chrome instances eating through your RAM.

### Why it matters

The headless browser space has been dominated by Chrome-based solutions for years. Puppeteer (Google) and Playwright (Microsoft) are excellent tools, but they carry Chrome's weight. Every CI pipeline spins up a full Chromium instance. Every scraping server runs multiple Chrome processes consuming hundreds of megabytes each. For teams running browser automation at scale, the infrastructure cost adds up fast.

Obscura addresses this from a different angle entirely. Instead of wrapping Chrome, it reimplements the browser engine in Rust with a narrow focus: run JavaScript, render pages, expose CDP. There's no rendering pipeline for visual output, no extension system, no DevTools UI. It's a browser stripped down to what automation actually needs. That architectural decision is what enables the memory and speed improvements.

The MCP server integration is what makes this especially relevant in mid-2026. AI coding agents like Claude, Cursor, and others need to interact with web pages — filling forms, clicking buttons, reading content. Obscura ships a built-in MCP server that exposes browser automation tools directly to these agents. No custom glue code, no wrapper libraries. Start the MCP server, point Claude Desktop at it, and your AI agent can navigate pages, fill forms, and extract data. This is where browser automation is heading, and Obscura is early to the party.

### Key Features

**Chrome DevTools Protocol Compatibility.** Obscura implements the CDP domains that matter for automation: Target, Page, Runtime, DOM, Network, Fetch, Storage, and Input. Your existing Puppeteer and Playwright scripts work with zero changes — just point them at Obscura's WebSocket endpoint instead of Chrome's. This means adoption is frictionless for teams already invested in these ecosystems.

**Built-in Stealth Mode.** Anti-detection is a first-class feature, not an afterthought. When compiled with `--features stealth`, Obscura randomizes per-session fingerprints (GPU, screen, canvas, audio, battery), sets realistic `navigator.webdriver` values, masks native functions, and blocks 3,520 known tracker domains. For scraping teams that currently bolt puppeteer-extra-plugin-stealth onto their Chrome instances, this collapses that dependency into the engine itself.

**Parallel Scrape Command.** The `obscura scrape` command accepts multiple URLs and processes them concurrently with configurable worker counts. No need to write your own concurrency logic or manage a pool of browser instances. Run `obscura scrape url1 url2 url3 --concurrency 25 --format json` and get structured output. The workers inherit proxy settings globally, so routing through residential proxies is a single flag.

**MCP Server for AI Agents.** Obscura ships a built-in Model Context Protocol server that exposes browser automation as tools for AI agents. The tool set covers the essentials: navigate, snapshot page content, click elements, fill inputs, type text, press keys, select options, evaluate JavaScript, wait for selectors, inspect network requests, and read console messages. Both stdio and HTTP transports are supported, so it works with Claude Desktop, Cursor, and any MCP-compatible client.

**DOM-to-Markdown Conversion.** The `LP.getMarkdown` CDP domain and the `--dump markdown` CLI flag convert rendered pages into clean Markdown. This is built for the LLM era — AI agents and RAG pipelines need text content, not raw HTML. Instead of running a separate HTML-to-Markdown library after fetching, the conversion happens inside the browser engine where it has access to the fully rendered DOM.

**Zero External Dependencies.** Obscura is a single binary. No Chrome installation, no Node.js runtime, no system libraries to install. Download the binary, make it executable, and run it. The Docker image is 57 MB compressed on a distroless base with no shell or package manager. For CI/CD pipelines, this eliminates the "install Chrome" step that adds 30-60 seconds to every build.

**Proxy and Network Control.** Global proxy support via `--proxy` flag works with both HTTP and SOCKS5 proxies, and it propagates to all subcommands including parallel scrape workers. The Fetch CDP domain enables live request interception — modify headers, redirect requests, or block resources programmatically. For scraping behind authenticated proxies or testing with specific network conditions, this is essential.

### Use Cases

- **Large-scale web scraping** — Teams collecting data from hundreds or thousands of pages benefit from the 30 MB memory footprint and built-in parallel scraping. The stealth mode handles anti-bot detection without external plugins.
- **AI agent web interaction** — Agents using Claude, Cursor, or custom LLM setups can control a real browser through the MCP server. Fill forms, navigate multi-step flows, extract structured data from rendered pages.
- **E2E testing in CI/CD** — Replace headless Chrome in your test pipeline with a 70 MB binary that starts instantly. Puppeteer and Playwright tests run unchanged, but CI builds finish faster and use less memory.
- **Content extraction for RAG pipelines** — The DOM-to-Markdown conversion combined with the CLI makes it straightforward to feed rendered web content into vector databases or LLM context windows.
- **Monitoring and change detection** — Periodically scrape pages and compare content or screenshots. The low resource usage means you can run continuous monitoring without dedicated infrastructure.

### Pros and Cons

Pros:
- Dramatic resource savings: 30 MB memory and 70 MB binary versus Chrome's 200+ MB and 300+ MB respectively. This translates directly to lower infrastructure costs at scale.
- Drop-in CDP compatibility means zero migration effort for existing Puppeteer and Playwright codebases. Just change the connection endpoint.
- Stealth mode baked into the engine eliminates the fragile plugin stack that scraping teams currently maintain on top of Chrome.
- Apache 2.0 license with a stated commitment to never gate features behind paid tiers. The open-source engine stays fully featured.

Cons:
- Rust-based with V8 compiled from source means building from source takes ~5 minutes and requires Rust 1.75+. Most users will grab pre-built binaries, but contributing to the project has a higher barrier than Node.js-based alternatives.
- The CDP implementation covers the automation domains but not the full Chrome protocol. Complex scenarios involving service workers, WebRTC, or advanced CSS rendering may behave differently than real Chrome.
- Relatively young project (April 2026) with 14 open issues. The API surface and CLI flags could change. Production adoption right now requires comfort with early-stage software.

### Getting Started

```bash
# Download the latest binary (Linux x86_64)
curl -LO https://github.com/h4ckf0r0day/obscura/releases/latest/download/obscura-x86_64-linux.tar.gz
tar xzf obscura-x86_64-linux.tar.gz

# Fetch a page and extract text
./obscura fetch https://news.ycombinator.com --dump text

# Start CDP server for Puppeteer/Playwright
./obscura serve --port 9222

# Run with stealth mode
./obscura serve --port 9222 --stealth

# Parallel scrape with JSON output
./obscura scrape https://example.com https://news.ycombinator.com \
  --concurrency 10 --format json

# Start MCP server for AI agents
./obscura mcp
```

Use with Puppeteer (no Chrome needed):

```javascript
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.connect({
  browserWSEndpoint: 'ws://127.0.0.1:9222/devtools/browser',
});

const page = await browser.newPage();
await page.goto('https://news.ycombinator.com');

const stories = await page.evaluate(() =>
  Array.from(document.querySelectorAll('.titleline > a'))
    .map(a => ({ title: a.textContent, url: a.href }))
);
console.log(stories);
await browser.disconnect();
```

### Alternatives

**Playwright** — Microsoft's browser automation library that supports Chromium, Firefox, and WebKit. Playwright is more mature, has a larger community, and handles cross-browser testing that Obscura doesn't target. Choose Playwright when you need to test across multiple browser engines or when your workflow depends on features beyond CDP basics.

**Puppeteer** — Google's Node.js library for controlling Chrome/Chromium. Puppeteer has the deepest Chrome integration and the largest ecosystem of plugins and middleware. Stick with Puppeteer when you need full Chrome fidelity — service workers, Chrome extensions, or advanced DevTools features that Obscura's minimal engine doesn't replicate.

**Crawlee** — Apify's open-source web scraping library that manages browser pools, handles retries, and provides structured extraction. Crawlee is higher-level than Obscura and works on top of Puppeteer or Playwright. Choose Crawlee when you want a scraping framework with built-in request queue management and dataset storage rather than a raw browser engine.

### Verdict

Obscura is the most practical headless browser alternative I've seen for the AI agent era. The 30 MB memory footprint alone makes it worth evaluating if you run any browser automation at scale — scraping, testing, or agent workflows. The CDP compatibility means you're not locked into a new ecosystem; your existing Puppeteer and Playwright code works unchanged. The built-in MCP server is the forward-looking feature that sets it apart from just being a "lighter Chrome." AI agents need to interact with the web, and shipping that integration at the engine level rather than as a wrapper library is the right architectural call. At 14K stars in under two months with an Apache 2.0 license and a commitment to keeping the open-source engine fully featured, this is one to watch closely. The main risk is maturity — it's two months old, and production teams should test thoroughly before committing. But for new projects starting browser automation today, Obscura should be on your shortlist.
