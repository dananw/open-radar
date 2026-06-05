---
name: obscura
description: "Obscura is a Rust-based headless browser for AI agents and web scraping — 7x less memory than Chrome with built-in anti-detection and MCP support."
url: https://github.com/h4ckf0r0day/obscura
stars: 14146
forks: 921
language: Rust
tags: ["headless-browser", "ai-agents", "web-scraping", "rust", "automation"]
featured: false
publishedAt: 2026-06-05
---

## Obscura

### Overview

Obscura is a headless browser engine written in Rust, purpose-built for AI agent automation and web scraping at scale. It crossed 14,000 GitHub stars in under two months after its April 2026 launch, which is remarkable for a project in a space dominated by Google's headless Chrome and Playwright. The numbers tell the story: 30 MB of memory versus Chrome's 200+ MB, 85 ms page loads versus 500 ms, and a 70 MB binary that runs on Linux, macOS, and Windows with zero external dependencies.

The project comes from h4ckf0r0day, a developer who's clearly been frustrated by the resource overhead of running headless Chrome in production. That frustration shows in the architecture — Obscura embeds V8 directly, implements just enough of the browser to render JavaScript-heavy pages, and skips everything that matters for desktop browsing but nothing for automation. It's the browser equivalent of "you aren't gonna need it."

The core problem Obscura solves is one that every developer building AI agents or large-scale scraping has hit: Chrome is expensive to run. Not in license terms — it's free — but in compute. Each Chrome instance eats 200+ MB of RAM, starts in about 2 seconds, and needs a full browser installation. Run 50 concurrent scraping tasks and you're looking at 10+ GB of memory just for the browser. Obscura cuts that to 1.5 GB with instant startup, and it does it without sacrificing JavaScript rendering or DOM manipulation capabilities.

### Why it matters

The AI agent space is exploding, and nearly every agent that interacts with the web needs a browser. Claude Computer Use, OpenAI's Operator, browser-use, and dozens of other agent frameworks all depend on headless Chrome under the hood. That dependency creates a real bottleneck — browser resource consumption is often the limiting factor in agent throughput, not the LLM inference itself.

Obscura arrives at exactly the right moment. As companies deploy AI agents for customer support, data extraction, competitive monitoring, and automated testing, the infrastructure cost of running hundreds of headless browsers becomes a genuine business problem. AWS charges for memory. Kubernetes pods have limits. CI/CD pipelines have timeouts. Every megabyte matters when you're operating at scale.

What makes this project particularly interesting is the built-in stealth mode. Anti-detection is something every serious scraping operation needs but few open-source tools handle well. Obscura randomizes fingerprints per session — GPU renderer, screen resolution, canvas output, audio context — and masks `navigator.webdriver` to match real Chrome. It blocks 3,520 known tracking domains automatically. This isn't a toy feature; it's the kind of capability that companies like Bright Data and Oxylabs charge significant money for, now available as an Apache-2.0 licensed Rust binary.

### Key Features

**CDP Compatibility.** Obscura implements the Chrome DevTools Protocol, which means it works as a drop-in replacement for headless Chrome with both Puppeteer and Playwright. You connect via WebSocket to `ws://127.0.0.1:9222` and use the exact same API calls. No code changes, no adapter layers, no "compatible with" asterisks. The CDP implementation covers Target, Page, Runtime, DOM, Network, Fetch, Storage, and Input domains — enough for real-world automation without the bloat of a full browser.

**Stealth Mode with Anti-Fingerprinting.** Enable it with `--stealth` or `--features stealth` at build time. Each browser session gets a randomized fingerprint stack: GPU renderer, screen dimensions, canvas noise, audio context perturbation, and battery API spoofing. The `navigator.webdriver` property returns `undefined` (matching real Chrome), `event.isTrusted` returns `true` for dispatched events, and `Function.prototype.toString()` outputs `[native code]` for internal functions. Combined with 3,520 blocked tracker domains, this gives you production-grade anti-detection without third-party tools.

**Parallel Scrape Command.** The `obscura scrape` command accepts multiple URLs and processes them concurrently with configurable worker counts. Run `obscura scrape url1 url2 url3 --concurrency 25 --eval "document.title" --format json` and get structured output across all pages. Workers inherit global proxy settings, and the `--quiet` flag suppresses progress output for clean script integration. This turns Obscura into a high-throughput scraping tool without writing a single line of orchestration code.

**MCP Server for AI Agents.** Obscura ships a Model Context Protocol server that exposes 12 browser automation tools — navigate, snapshot, click, fill, type, press key, select option, evaluate, wait for selector, list network requests, read console messages, and close. Run `obscura mcp` for stdio transport (Claude Desktop, Cursor) or `obscura mcp --http --port 8080` for network access. This is the fastest path to giving an AI agent real browser capabilities without writing glue code.

**Minimal Resource Footprint.** At 30 MB memory and 70 MB binary size, Obscura is designed for constrained environments. Docker images are 57 MB compressed on a `distroless/cc` base with no shell or package manager. Startup is instant — no waiting for Chrome to initialize its rendering pipeline. Page loads benchmark at 51 ms for static HTML and 84 ms for JavaScript-heavy pages with XHR requests. For teams running browser automation in Lambda functions, edge workers, or resource-limited containers, these numbers change what's possible.

**CLI-First Design.** Every capability is accessible from the command line without writing code. Fetch a page title with `obscura fetch https://example.com --eval "document.title"`. Extract all links with `--dump links`. Render JavaScript and get HTML with `--dump html`. Convert DOM to Markdown with `--dump markdown`. Stream raw binary responses with `--dump original`. Wait for dynamic content with `--wait-until networkidle0`. Set navigation timeouts with `--timeout 10`. Use proxies with `--proxy socks5://127.0.0.1:1080`. The CLI covers the common cases so you only reach for Puppeteer/Playwright when you need complex interaction sequences.

**V8 Tuning and Proxy Support.** Pass raw V8 flags with `--v8-flags "--max-old-space-size=4096"` for JavaScript-heavy pages that need more heap space. Global proxy settings (HTTP and SOCKS5) cascade to all subcommands — fetch, scrape, serve, and MCP. This means a single `--proxy` flag at the top level routes all browser traffic through your proxy infrastructure, whether you're doing single page fetches or parallel scraping with 25 workers.

### Use Cases

- **AI agent web interaction** — Give Claude, GPT, or custom agents browser capabilities through the MCP server. Navigate pages, fill forms, click buttons, and extract data without managing Chrome instances or writing Puppeteer boilerplate.

- **Large-scale web scraping** — Extract data from thousands of pages with the parallel scrape command. The 30 MB memory footprint means you can run 50+ concurrent workers on a single machine instead of needing a cluster.

- **E-commerce price monitoring** — Scrape product pages at regular intervals with stealth mode enabled to avoid bot detection. The anti-fingerprinting capabilities handle the arms race with anti-bot systems without third-party services.

- **Automated testing in CI/CD** — Run browser tests in GitHub Actions or GitLab CI without the overhead of installing Chrome. The 70 MB binary and instant startup fit comfortably in CI time budgets.

- **SEO and content auditing** — Fetch pages with `--dump markdown` to get clean text content, or `--dump links` to build site maps. Run at scale with the scrape command for comprehensive audits.

- **Form submission and login flows** — Automate authenticated workflows. Puppeteer and Playwright scripts that handle login forms, multi-step wizards, and session cookies work unchanged against Obscura's CDP server.

### Pros and Cons

Pros:
- **Dramatic resource savings.** 30 MB memory versus Chrome's 200+ MB is a 7x improvement. At scale, this translates to real infrastructure cost reduction — running 100 concurrent browsers drops from 20 GB to 3 GB of RAM.

- **True drop-in compatibility.** Existing Puppeteer and Playwright scripts work without modification. The CDP implementation is thorough enough for real-world automation, not just basic page fetching.

- **Production-grade stealth.** Anti-fingerprinting and tracker blocking are built in, not bolted on. The per-session fingerprint randomization and 3,520 blocked domains handle the most common anti-bot detection methods.

- **Apache-2.0 license with no feature gating.** The maintainers have stated the open-source engine stays fully featured even as they build Obscura Cloud. No open-core bait-and-switch.

- **Active development.** Created April 13, 2026, already at 14,000+ stars with regular releases. The community is growing fast, which matters for long-term maintenance and ecosystem support.

Cons:
- **Rust build requirements.** Building from source needs Rust 1.75+ and compiles V8 from source on first build (~5 minutes). Most users will grab pre-built binaries, but contributors and customizers face a real build toolchain.

- **Young project.** Launched less than two months ago. While the CDP implementation covers the common domains, edge cases and uncommon protocol methods may have gaps compared to Chrome's decades of development.

- **Limited mobile emulation.** Unlike Chrome DevTools' full device emulation with touch events and viewport presets, Obscura's mobile simulation capabilities are still maturing. If your use case depends heavily on mobile-specific behavior, test thoroughly.

- **No built-in proxy rotation.** While proxy support is solid (HTTP and SOCKS5, global flag propagation), you still need external infrastructure for proxy pool management and rotation. Tools like Bright Data handle this internally.

### Getting Started

```bash
# Download the latest binary (Linux x86_64)
curl -LO https://github.com/h4ckf0r0day/obscura/releases/latest/download/obscura-x86_64-linux.tar.gz
tar xzf obscura-x86_64-linux.tar.gz

# Fetch a page and extract the title
./obscura fetch https://example.com --eval "document.title"

# Extract all links from a page
./obscura fetch https://news.ycombinator.com --dump links

# Start the CDP server for Puppeteer/Playwright
./obscura serve --port 9222

# Start with stealth mode enabled
./obscura serve --port 9222 --stealth

# Scrape multiple URLs in parallel
./obscura scrape https://example.com https://github.com https://news.ycombinator.com \
  --concurrency 10 \
  --eval "document.title" \
  --format json

# Docker (no installation needed)
docker run -d --name obscura -p 127.0.0.1:9222:9222 h4ckf0r0day/obscura

# Connect with Puppeteer
npm install puppeteer-core
```

```javascript
// Puppeteer example
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

```json
// Claude Desktop MCP config
{
  "mcpServers": {
    "obscura": {
      "command": "obscura",
      "args": ["mcp"]
    }
  }
}
```

### Alternatives

**Playwright** — Microsoft's browser automation framework is the gold standard for testing and supports Chromium, Firefox, and WebKit. It's more mature, has better documentation, and offers a richer API for complex interaction patterns. Choose Playwright when you need cross-browser testing, detailed tracing, or the extensive assertion library. Choose Obscura when resource efficiency and stealth matter more than browser engine variety.

**Puppeteer** — Google's Node.js library for controlling Chrome/Chromium is the original headless browser automation tool. It has the largest ecosystem of plugins and the most community examples. Stick with Puppeteer if your team already has Chrome-based infrastructure and the 200 MB per-instance overhead isn't a problem. Switch to Obscura when you're hitting memory limits in production or need anti-detection without extra tooling.

**browser-use** — This Python framework wraps browser automation with LLM-powered decision making, letting agents figure out which elements to interact with. It's a higher-level abstraction that handles the "what to do" while Obscura handles the "how to do it." Use browser-use for agent-first workflows where you want the LLM to drive navigation. Use Obscura when you need fine-grained control over the browser or want to integrate with existing Puppeteer/Playwright codebases.

### Verdict

Obscura is the most interesting browser infrastructure project I've seen in the last year. The Rust rewrite of a headless browser isn't new — Servo, Ladybird, and others have explored similar territory — but Obscura nails the execution by focusing ruthlessly on the automation use case instead of trying to be a general-purpose browser. The 7x memory reduction, instant startup, and built-in stealth mode address the three biggest pain points in production browser automation simultaneously. At 14,000 stars in under two months with an Apache-2.0 license and no feature gating, the project has real momentum. If you're building AI agents that interact with the web, running scraping infrastructure at scale, or just tired of Chrome eating your CI budget, Obscura deserves a serious evaluation. The MCP server integration alone makes it worth installing — giving Claude or Cursor browser capabilities in under a minute is the kind of developer experience that drives adoption.
