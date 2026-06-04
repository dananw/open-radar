---
name: invisible-playwright
description: "Stealth Firefox that passes every bot detection test. Drop-in Playwright replacement with C++ level fingerprint patching and 0.90 reCAPTCHA v3 score."
url: https://github.com/feder-cr/invisible_playwright
stars: 1142
forks: 0
language: Python
tags: ["playwright", "browser-automation", "anti-detect", "web-scraping", "firefox"]
featured: false
publishedAt: 2026-06-04
---

## Invisible Playwright

### Overview

Invisible Playwright is a stealth Firefox browser that passes every bot detection test, packaged as a drop-in Playwright replacement for Python. It crossed 1,000 GitHub stars within weeks of its 2026 launch, which says less about marketing and more about how badly the automation community needed this.

The project is built by Federico Elia, who also maintains the companion `invisible_firefox` repository containing the actual C++ patches against Mozilla's Gecko engine. The key insight: most anti-detect browsers patch at the JavaScript level — overriding `navigator`, `WebGLRenderingContext.getParameter`, canvas APIs via injected scripts. That approach is fundamentally broken. Anti-bot systems enumerate native function `.toString()`, check descriptor configurability, compare property enumeration order, and watch for prototype mutations. Every JS patch leaves a fingerprint of its own. CreepJS has an entire battery of "lies detectors" built around exactly this pattern.

Invisible Playwright skips the JS shim layer entirely. It patches Firefox at the C++ source level so that spoofed values come back through the normal Gecko rendering paths. From the page's perspective, the browser is just telling the truth. There's no `Object.defineProperty` override, no prototype mutation, nothing for lie-detectors to latch onto. The result: a measured 0.90 reCAPTCHA v3 score, compared to 0.3–0.5 for every Chromium-based alternative. That gap matters when your entire pipeline depends on getting past bot detection.

### Why it matters

The browser automation landscape is split into two camps: legitimate testing tools (Playwright, Selenium, Puppeteer) and commercial anti-detect browsers (Multilogin, GoLogin, AdsPower). The testing tools get flagged instantly. The commercial ones cost $49–$99/month, are closed-source, and still use JavaScript-level spoofing that sophisticated detectors catch. There's a gap in the middle for developers who need reliable browser automation that doesn't trigger bot detection — think web scraping, AI agent web interaction, competitive intelligence, or E2E testing sites with aggressive anti-bot policies.

The Chromium reCAPTCHA ceiling is a known problem. Residential-proxy bot traffic is overwhelmingly Chromium-based, so detectors weight anything Chromium-shaped as risky by default. Chromium forks inherit Chrome's open-source layers cleanly but cannot match Chrome's closed-source components (Widevine, proprietary codecs, Google Update endpoints), and they lag Chrome's release cadence by days to weeks, leaving version-specific behavioral signatures. Invisible Playwright sidesteps all of this by using Firefox, which has a fundamentally different fingerprint surface.

For fullstack developers building AI agents that interact with the web — a rapidly growing use case in 2026 — this is the missing piece. Your agent can navigate, click, fill forms, and scrape data through a browser that looks completely human to every detection system tested.

### Key Features

**C++ Source-Level Patching.** The core differentiator. Navigator properties, screen dimensions, GPU/WebGL parameters, Canvas noise, font lists, audio context, WebRTC IP handling, timezone, and DevTools detection are all patched at the C++ level in the Firefox source tree. No JavaScript overrides exist anywhere in the stack. This means anti-bot lie-detectors that check `.toString()` output, property descriptor configurability, and prototype chain integrity find nothing suspicious.

**Drop-In Playwright API Compatibility.** The `browser` object is a standard `playwright.sync_api.Browser` or `playwright.async_api.Browser`. Every Playwright method works as-is — `goto()`, `click()`, `fill()`, `screenshot()`, `evaluate()`, all of it. Migration from vanilla Playwright is literally a two-line change: swap the import and the context manager. No API learning curve, no adapter layer, no workarounds.

**Bayesian Fingerprint Sampler.** Every session gets a unique, coherent fingerprint drawn from real-world Firefox telemetry — GPU capabilities, audio context parameters, font availability, screen resolution, hardware concurrency, and roughly 400 other fields. The sampler uses a Bayesian model to ensure the combination of values is statistically plausible. You won't get a 4K screen with an integrated GPU or a Mac font list on a Windows navigator string. Reproducible fingerprints via seed parameter.

**Bezier Curve Mouse Motion.** Human mouse movement doesn't travel in straight lines. Invisible Playwright bakes Bezier-curve mouse motion into the browser itself, so `page.click("#submit")` arcs the cursor to the button the way a real hand would move. This defeats motion-analysis detectors that flag linear cursor trajectories as robotic.

**SOCKS5 Proxy Authentication.** Native SOCKS5 auth is patched into `nsProtocolProxyService.cpp` — not delegated to Playwright's proxy layer. DNS is routed through the proxy by default with no local leak. Supports `socks5`, `socks4`, `http`, and `https` schemes with authentication on all of them. This is critical for residential proxy setups where DNS leaks reveal your real IP.

**Per-Field Fingerprint Pinning.** Force specific values for individual fingerprint fields while keeping everything else seed-derived. Pin the GPU renderer to match your actual hardware, lock screen dimensions to your monitor, or set a specific timezone — all without breaking the coherence of the surrounding fingerprint. Useful for long-running sessions where you need consistent identity across multiple browser launches.

**Weekly Release Cadence.** The patched Firefox binary ships on weekly releases, tracking current Firefox versions (currently Firefox 150). This is a sharp contrast to Camoufox, which pioneered the source-level patching approach but has been in a roughly year-long maintenance gap with an outdated Firefox base. Active maintenance matters because anti-bot systems constantly update their detection heuristics.

### Use Cases

- **AI agent web interaction** — Building an agent that browses websites, fills forms, extracts data, or interacts with web apps. Your agent needs a browser that won't get blocked mid-conversation with a reCAPTCHA wall.

- **Web scraping at scale** — Extracting data from sites with aggressive bot detection (e-commerce pricing, job listings, real estate data). The 0.90 reCAPTCHA score means you can access pages that block every other automated browser.

- **E2E testing anti-bot protected sites** — Testing checkout flows, login sequences, or dashboards behind Cloudflare, PerimeterX, or DataDome protection. Standard Playwright gets flagged; invisible_playwright sails through.

- **Competitive intelligence and monitoring** — Tracking competitor pricing, content changes, or feature launches on sites that actively block scraping. The coherent fingerprint per session means each visit looks like a different real user.

- **Social media automation** — Operating real accounts through browser automation without triggering platform-specific bot detection. Every session gets a unique, consistent identity.

### Pros and Cons

Pros:
- The C++ patching approach is architecturally superior to every JS-shim alternative. Measured 0.90 reCAPTCHA v3 score versus 0.3–0.5 for Chromium-based tools. This isn't marketing — it's a structural advantage that JS-level spoofing cannot close.
- Drop-in Playwright compatibility means zero migration cost for existing Python automation projects. Two lines changed, everything else works.
- MIT licensed and fully open source, including the C++ patches. Commercial alternatives charge $49–$99/month for worse detection bypass.
- Weekly releases tracking current Firefox versions, unlike Camoufox's year-long maintenance gap.

Cons:
- Windows and Linux only. No macOS support yet, which excludes a significant chunk of the developer community for local development.
- The ~100 MB binary download on first run adds deployment complexity in CI/CD pipelines and container environments. Not a dealbreaker, but worth planning for.
- Firefox-only. If your target site has Firefox-specific rendering issues or if your existing automation is deeply tied to Chromium DevTools Protocol, switching engines requires testing.
- Headless mode breaks fingerprint coherence — you must use `headless=False` with Xvfb (Linux) or hidden desktop (Windows). The `InvisiblePlaywright` context manager handles this automatically, but it adds a runtime dependency.

### Getting Started

```bash
# Install
pip install git+https://github.com/feder-cr/invisible_playwright.git

# Download the patched Firefox binary (~100 MB, SHA256-verified)
python -m invisible_playwright fetch
```

Basic usage — sync:

```python
from invisible_playwright import InvisiblePlaywright

with InvisiblePlaywright() as browser:
    page = browser.new_page()
    page.goto("https://example.com")
    page.click("#submit")
```

Async:

```python
from invisible_playwright.async_api import InvisiblePlaywright

async with InvisiblePlaywright() as browser:
    page = await browser.new_page()
    await page.goto("https://example.com")
    await page.click("#submit")
```

With proxy and pinned fingerprint:

```python
with InvisiblePlaywright(
    proxy={"server": "socks5://gate.example.com:1080", "username": "u", "password": "p"},
    seed=42,
    pin={"gpu.renderer": "ANGLE (NVIDIA, NVIDIA GeForce RTX 4090 Direct3D11)"},
) as browser:
    page = browser.new_page()
    page.goto("https://creepjs-api.web.app")  # verify your fingerprint
```

For downstream integrations (Crawlee, changedetection.io, custom agent frameworks):

```python
from playwright.async_api import async_playwright
from invisible_playwright import ensure_binary, get_default_stealth_prefs

async with async_playwright() as p:
    browser = await p.firefox.launch(
        executable_path=str(ensure_binary()),
        firefox_user_prefs=get_default_stealth_prefs(seed=42),
    )
```

### Alternatives

**Camoufox** — The original open-source anti-detect Firefox with source-level C++ patches. Same architectural approach as invisible_playwright, but in a roughly year-long maintenance gap with an outdated Firefox base. If it ever resumes active development, it could be competitive again. Choose Camoufox if you need the wider surface patching it offers and can accept the stale Firefox version.

**CloakBrowser** — A Chromium-based anti-detect browser with C++ source patches, but distributed as a closed-source binary. You get the compiled output but cannot inspect or modify the patches. Hits the Chromium reCAPTCHA ceiling (~0.3–0.5) despite the source-level approach. Choose CloakBrowser if you specifically need Chromium and don't care about open source.

**Multilogin / GoLogin** — Commercial SaaS anti-detect browsers with managed profiles and team features. They overlay JavaScript-level spoofing on patched Chromium builds. Convenient UI for managing hundreds of browser profiles, but the detection bypass is structurally inferior. Costs $49–$99/month. Choose these if you need the managed profile UI and team collaboration features more than raw detection bypass.

### Verdict

Invisible Playwright is the most effective open-source anti-detect browser available in 2026, and it's not particularly close. The C++ source-level patching approach gives it a structural advantage over every JavaScript-shim alternative, and the measured 0.90 reCAPTCHA v3 score proves it in practice. The drop-in Playwright API means existing Python automation projects can switch in minutes, not days. For fullstack developers building AI agents that need to interact with the real web, scraping pipelines that keep hitting bot detection walls, or E2E tests behind aggressive anti-bot protection, this tool eliminates a problem that has been expensive or impossible to solve cleanly. The lack of macOS support and Firefox-only constraint are real limitations, but they're the kind that get fixed with adoption. With 1,100+ stars and weekly releases, the project has momentum. Worth evaluating immediately if you do anything with automated browser interaction.
