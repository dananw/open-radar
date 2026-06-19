---
name: stackprism
description: "StackPrism is a Manifest V3 browser extension that detects web technology stacks across 6 dimensions — DOM, headers, resources, JS comments, runtime, and CSS. A modern Wappalyzer alternative with 2000+ rules."
url: https://github.com/setube/stackprism
stars: 739
forks: 51
language: TypeScript
tags: ["browser-extension", "developer-tools", "web-technology", "tech-stack-detection", "chrome-extension"]
featured: false
publishedAt: 2026-06-19
---

## StackPrism

### Overview

StackPrism is a browser extension that identifies what technologies a website is built with. It hit 739 GitHub stars within six weeks of its May 2026 launch, which is impressive for a developer tool in a space that Wappalyzer has dominated for years.

The project is built by setube, a developer who's been grinding on this solo — 426 commits in the first month and a half. The extension ships on Chrome Web Store, Edge Add-ons, and Firefox Add-ons, all built from a single TypeScript codebase using Manifest V3. That cross-browser support from day one is notable; most browser extensions pick one browser and maybe add others later.

The core problem StackPrism solves is deceptively simple: when you visit a website, what's it running? Existing tools like Wappalyzer and BuiltWith answer this question, but they mostly scan HTML resource URLs and call it a day. StackPrism takes a different approach. It runs four independent detection channels in parallel — static DOM scanning, response header analysis, dynamic resource monitoring via PerformanceObserver and MutationObserver, and JS copyright comment parsing from bundled chunks. The results merge and deduplicate across 50+ categories with 2,000+ detection rules. That multi-signal approach catches things single-scan tools miss.

### Why it matters

If you've ever used Wappalyzer, you know the drill: install it, visit a site, see a list of technologies. It works, mostly. But the web has changed. Modern sites lazy-load frameworks, bundle dependencies into opaque chunks, hide server headers behind CDNs, and serve content through edge functions that strip identifying information. A tool that only looks at `<script src="...">` tags is increasingly blind.

StackPrism addresses this by expanding what it looks at. The JS copyright comment scanner is particularly clever — it fetches the main bundle and parses the comments at the top where webpack, Rollup, or esbuild embed third-party license information. That's how it catches libraries that are bundled into a single file with no external URL to match against. The response header channel monitors `webRequest.onHeadersReceived` through the service worker, catching server-side technologies that don't appear in the page source at all.

For fullstack developers, this kind of tool is more useful than it might seem at first. Competitive analysis, security audits, client onboarding — knowing what a site runs informs decisions. And the fact that it's open source with a data-driven rule system means you can contribute detections for the frameworks and services you care about.

### Key Features

**Four-Channel Parallel Detection.** Most tech detectors run a single scan on page load. StackPrism runs four independent channels simultaneously: static DOM scanning (globals, CSS classes, meta tags, CSS variables), response header inspection via the service worker, dynamic resource monitoring using PerformanceObserver and MutationObserver for lazy-loaded assets, and JS copyright comment parsing from bundled chunks. Each channel catches technologies the others miss.

**Manifest V3 Service Worker Architecture.** The extension uses MV3's service worker model instead of a persistent background page. This means no constantly running process eating memory — the service worker wakes up on events (header interception, message passing) and goes dormant in between. It's the right architecture for a tool you want running all the time without tanking browser performance.

**Data-Driven Rule System with Build-Time Precompilation.** Detection rules live in JSON files under `public/rules/`, organized by detection channel (page rules, header rules, dynamic resource rules). At build time, a Vite plugin precompiles these rules into optimized hint prefilters and merged keyword regexes. At runtime, the matcher only processes candidates that pass the prefilter. Adding a new technology detection is usually just editing a JSON file — no code changes needed.

**2,000+ Rules Across 50+ Categories.** The rule coverage spans frontend frameworks, UI libraries, build tools, web servers, backend frameworks, CDNs, CMS platforms, e-commerce systems, SaaS tools, analytics, advertising, authentication providers, payment processors, and security configurations. The breadth is comparable to Wappalyzer's, but the multi-signal detection approach means fewer false negatives on modern bundled sites.

**Anti-Spoofing Detection.** Sites sometimes fake response headers (setting `X-Powered-By: Express` when running PHP, for example). StackPrism actively detects scenarios where four or more identity-significant headers are present simultaneously — a pattern that indicates header spoofing — and downgrades those detections to low confidence with a warning badge. It also suppresses self-detection (the extension won't report itself as a technology on its own website).

**Cross-Browser Support from Day One.** The same TypeScript codebase builds for Chrome, Edge, and Firefox. `pnpm run build` produces the Chrome/Edge version; `pnpm run build:firefox` produces a Firefox-compatible build with an `.xpi` package. The Firefox version adapts the Manifest V3 service worker model to Firefox's implementation, which has subtle differences.

**Community-Contributable Rules.** The rule system is designed for external contribution. The extension includes a "Submit Rule Contribution" button in its settings page, and the detection results popup has a "Detection Inaccurate" button that pre-fills an issue template with the current page's detection context. Rule JSON has a straightforward schema with name, category, patterns, match type, match channel, confidence level, and optional CSS selectors or global variable names.

### Use Cases

- **Competitive analysis** — Visit a competitor's site and instantly see their frontend framework, backend stack, CDN, analytics tools, ad networks, and payment processors. Useful for product and engineering teams scoping a new project.
- **Security reconnaissance** — Identify outdated frameworks, exposed server headers, or unexpected third-party scripts during a security audit. The response header channel catches things that DOM-only scanners miss.
- **Client onboarding for agencies** — Quickly assess what a prospective client's existing site runs on before scoping a migration or rebuild project. Saves hours of manual investigation.
- **Learning and exploration** — Junior developers can visit well-built sites and see exactly what technologies power them. It's a practical way to discover new tools and frameworks.
- **Framework migration planning** — When planning a migration (say, from jQuery to React), scan sites in your industry to see what adoption patterns look like and what complementary tools are common.

### Pros and Cons

Pros:
- Multi-signal detection (DOM + headers + dynamic resources + JS comments) catches technologies that single-scan tools miss, especially on modern bundled sites where framework URLs disappear into chunk hashes.
- The data-driven rule system makes it easy to contribute new detections without understanding the extension's internals — just add a JSON file and submit a PR.
- Manifest V3 service worker architecture keeps memory footprint low, which matters for a tool that runs on every page you visit.
- Active solo maintainer with 426 commits in six weeks and rapid release cadence (v1.3.50 through v1.3.70 in a single week).

Cons:
- CC BY-NC-SA 4.0 license prohibits commercial use, which limits adoption by companies that might want to embed this in their own tools or workflows. Wappalyzer uses GPL, which is more permissive for commercial contexts.
- The README and documentation are primarily in Chinese, which creates a barrier for non-Chinese-speaking contributors and users. The extension UI may also default to Chinese.
- Solo maintainer with only 4 contributors total — the bus factor is one. If setube stops development, the project could stall quickly.
- Backend detection is inherently limited since many sites strip identifying headers behind Cloudflare, AWS, or other reverse proxies. The extension acknowledges this but it's still a practical limitation.

### Getting Started

Install from browser extension stores or build from source:

```bash
# Clone and build from source
git clone https://github.com/setube/stackprism.git
cd stackprism
pnpm install

# Build for Chrome / Edge
pnpm run build

# Build for Firefox
pnpm run build:firefox

# Development mode with HMR
pnpm run dev
```

**Chrome / Edge:**
1. Open `chrome://extensions` or `edge://extensions`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select the `dist/` directory
4. Visit any website — the extension icon shows the count of detected technologies

**Firefox:**
1. Open `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on" and select `dist-firefox/manifest.json`
3. Or install the `.xpi` file from the `release/` directory after running `pnpm run build:firefox`

Run quality checks before contributing:

```bash
pnpm run typecheck    # Vue-tsc type checking
pnpm run lint         # ESLint
pnpm run build        # Production build (includes rule precompilation)
```

### Alternatives

**Wappalyzer** — The original and most widely used web technology detector. Wappalyzer has a larger rule set and a commercial API for programmatic access. It's the safer choice if you need a battle-tested tool with broad industry adoption. StackPrism's multi-signal detection approach gives it an edge on modern bundled sites, but Wappalyzer's ecosystem (browser extensions, API, datasets) is much more mature.

**BuiltWith** — A commercial web technology profiling service with a free browser extension tier. BuiltWith goes deeper than Wappalyzer on historical data — you can see when a site adopted or dropped a technology. The free extension is limited though, and the full dataset requires a paid subscription. StackPrism is fully open source with no usage limits.

**WhatRuns** — A lighter-weight browser extension for technology detection. WhatRuns is simpler and faster but uses a single-scan approach similar to Wappalyzer. It's a good choice if you want something minimal that just works without configuration. StackPrism offers more depth and transparency into how detections work.

### Verdict

StackPrism is the most interesting web technology detector I've seen since Wappalyzer first appeared. The four-channel detection approach is a genuine improvement over single-scan tools, especially for modern sites that bundle everything into hashed chunks and hide server headers behind CDNs. The data-driven rule system is well-designed for community contribution, and the Manifest V3 architecture is the right call for a tool that should be running all the time without killing your browser's memory.

The main concerns are the CC BY-NC-SA license (which blocks commercial use), the Chinese-primary documentation (which limits international adoption), and the solo maintainer risk. These are real limitations, but they're the kind of things that improve with community growth. If you're a web developer who regularly needs to know what technologies a site runs on — for competitive analysis, security work, or just curiosity — StackPrism is worth installing today. The 739 stars in six weeks suggest the developer community sees the same potential I do.
