---
name: shardbrowser
description: "Free open-source anti-detect browser with engine-level fingerprint spoofing, 170+ device profiles, MCP server, and multi-language SDKs for web scraping and testing."
url: https://github.com/ProxyShard/ShardBrowser
stars: 326
forks: 54
language: TypeScript
tags: ["browser", "web-scraping", "anti-detect", "fingerprinting", "developer-tools"]
featured: false
publishedAt: 2026-06-06
---

## ShardBrowser (ShardX)

### Overview

ShardBrowser — officially called ShardX — is a free, open-source anti-detect browser built by the ProxyShard team. It hit 326 GitHub stars within a week of its late-May 2026 launch, which tracks with the growing demand for browser automation tools that can actually survive modern bot detection. The project is MIT-licensed and ships a patched Chromium 148 engine where every fingerprint surface is spoofed at the C++ level, not through JavaScript injection that detectors spot instantly.

The team behind it runs ProxyShard, a proxy service with full SOCKS5 UDP relay and active p0f TCP-fingerprint spoofing. ShardX is the browser stack they built internally to get the most out of their proxy infrastructure, then open-sourced the whole thing. That origin story matters — this isn't a hobby project that reverse-engineered someone else's patches. It's a production tool that was battle-tested against real anti-fraud systems before the source code went public.

The core problem ShardBrowser solves is deceptively simple: modern bot detection doesn't just check your user agent anymore. Production anti-fraud stacks at banks, ad networks, ticketing platforms, and dating apps probe WebGL renderers, WebGPU adapters, font enumeration, TLS ClientHello fingerprints, QUIC support, WebRTC leak paths, and dozens of other signals. Most anti-detect browsers — including the popular CloakBrowser — leave several of these surfaces untouched or only partially patched. ShardBrowser patches all of them inside Chromium's engine, so every signal in a profile is coherent with every other signal. A profile claiming to be an RTX 4060 on Windows actually returns an RTX 4060 from `navigator.gpu.requestAdapter()`, not the host machine's real GPU.

### Why it matters

The anti-detect browser market has been dominated by expensive SaaS products — Multilogin, AdsPower, Dolphin — that charge $50-200/month per seat. Free alternatives like CloakBrowser exist but have significant gaps: WebGPU leaks the host GPU, CDP automation is detectable, font enumeration returns the host's fonts regardless of what the profile claims, and profile generators routinely emit incoherent fingerprints (Windows user agent with macOS GPU, mobile UA with desktop screen resolution). ShardBrowser closes those gaps while staying free and open-source.

For fullstack web developers, this matters beyond the obvious scraping use case. If you're building web applications, you need to test how they behave under different browser profiles, device types, and network conditions. If you're shipping automation for QA, E2E testing, or data collection, you need browsers that don't get flagged. And if you're integrating with AI coding tools like Claude Desktop or Cursor, the bundled MCP server means you can orchestrate browser profiles through natural language — a workflow that didn't exist six months ago.

The timing connects to a broader shift: major Google properties now refuse to fall back from HTTP/2 cleanly if QUIC isn't available, and production anti-fraud systems increasingly check WebGPU capabilities, TLS fingerprint consistency, and CDP side-channels. Browsers that don't patch these surfaces aren't just detectable — they're increasingly non-functional for the sites that matter most.

### Key Features

**Engine-Level Fingerprint Spoofing.** Every fingerprint surface is patched inside Chromium's C++ engine — Blink, V8, and the network stack. There's no JavaScript shim layer that detectors can spot. Spoofed values are consistent across iframes, web workers, DevTools, and headless inspection. This covers WebGL renderer/vendor/extensions, WebGPU adapter and limits, Canvas noise, audio sample rates, screen dimensions, timezone, geolocation, TLS ClientHello, and 170+ other signals per profile.

**170 Ready-Made Device Profiles.** The fingerprint library ships 170 profiles derived from real-device samples: 31 Mac ARM64, 120 Windows x64, and 19 Linux x64 configurations. Each profile is a coherent device — GPU matches CPU matches RAM matches user agent matches fonts. The profile editor randomizes CPU, RAM, and platform-version when you change the GPU, so generated profiles never contain contradictions like an RTX 4060 paired with `hardwareConcurrency=2`.

**QUIC and WebRTC Over SOCKS5.** HTTP/3 works end-to-end through the proxy's UDP relay — not disabled like most anti-detects, not unstable like CloakBrowser's implementation. WebRTC candidates report the proxy exit IP, never the host. STUN/TURN targets on private networks are dropped. This passes every probe in Twilio's network test suite without leaking the real IP.

**Bundled MCP Server.** The launcher includes an MCP server that drops into Claude Desktop, Cursor, and other AI coding tools for natural-language profile orchestration. Create profiles, bind proxies, start browser sessions, and grab CDP WebSocket URLs through conversation. This is the first anti-detect browser with first-class AI tool integration.

**Local HTTP API with JWT Auth.** An axum-based HTTP server on `127.0.0.1:40325` exposes the full profile lifecycle — create, start, stop, and retrieve CDP endpoints. Bearer-JWT authentication. Full OpenAPI spec included. Call it from any language or automation framework.

**Multi-Language SDKs.** Python and Node.js SDKs ship the Chromium engine themselves and need no GUI at all. Ideal for headless scraping pipelines, CI environments, and server-side automation. The same on-disk profile state is shared between the desktop UI, HTTP API, MCP server, and SDKs — no sync step required.

**Comprehensive Bot Detection Results.** The project documents results against major detection services: fingerprint.com reports bot/VPN/DevTools/tampering as "Not detected," browserscan.net shows 100% authenticity, pixelscan.net confirms consistent fingerprints, and antcpt.com gives a reCAPTCHA v3 score of 0.9. These aren't synthetic benchmarks — they're the same services that production anti-fraud systems use internally.

### Use Cases

- **Web scraping at scale** — Run hundreds of isolated browser identities with unique fingerprints, each bound to a different SOCKS5/HTTP proxy. The engine-level spoofing means sessions survive repeated visits to sites with aggressive bot detection.

- **Multi-account management** — Social media managers, e-commerce sellers, and ad operators who need to run multiple accounts without cross-contamination. Each profile has isolated cookies, storage, and a unique device identity.

- **QA and E2E testing** — Test how your web application behaves under different browser profiles, GPU capabilities, screen sizes, locales, and network conditions. The SDKs integrate directly into test suites.

- **AI-assisted browser automation** — Use the MCP server with Claude Desktop or Cursor to orchestrate browser sessions through natural language. "Create a profile that looks like a MacBook Pro in Japan, open my staging site, and check if the pricing page renders correctly."

- **Security research and penetration testing** — The local API and SDKs make it straightforward to build automated testing pipelines that probe web applications from different device perspectives.

### Pros and Cons

Pros:
- Free and MIT-licensed, with no feature gating or subscription tiers. The only cost is your proxy provider.
- Engine-level spoofing covers surfaces that CloakBrowser and most free alternatives miss entirely — WebGPU, font enumeration, CDP side-channels, and QUIC over SOCKS5.
- The MCP server integration is genuinely novel. No other anti-detect browser offers first-class AI tool integration.
- 170 real-device profiles with coherent fingerprints out of the box. No manual configuration needed for basic use cases.

Cons:
- The desktop app isn't code-signed (no Apple Developer ID, no Authenticode cert), so first-launch requires manual OS workarounds — `xattr` on macOS, "Run anyway" on Windows.
- The Chromium engine binary is large and downloaded separately on first launch. Not ideal for CI/CD pipelines with tight image size constraints.
- ProxyShard's business model is selling proxies, so the browser is a gateway product. The free tier works with any proxy, but the QUIC/UDP relay features benefit most from their infrastructure.
- Relatively new project (May 2026). The comparison claims against CloakBrowser haven't been independently verified by third parties yet.

### Getting Started

Grab a pre-built release from GitHub Releases, or build from source:

```bash
# Build from source (requires Rust + Node.js)
cd rust/shardx-launcher
npm install
npm run tauri dev      # development with hot reload
# or
npm run tauri build    # release build → src-tauri/target/release/bundle/
```

For the Python SDK (headless, no GUI):

```bash
pip install shardx
```

For the Node.js SDK:

```bash
npm install @proxyshard/shardx
```

Linux system dependencies for the Chromium engine:

```bash
sudo apt install -y \
  unzip ca-certificates fonts-liberation \
  libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 libcups2 \
  libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 \
  libgbm1 libpango-1.0-0 libcairo2 libasound2 libxshmfence1
```

Use the HTTP API to create and manage profiles programmatically:

```bash
# Start a profile via the local API
curl -X POST http://127.0.0.1:40325/api/profiles \
  -H "Authorization: Bearer <jwt>" \
  -d '{"name": "test-profile", "proxy": "socks5://user:pass@proxy:1080"}'
```

### Alternatives

**CloakBrowser** — The other major open-source anti-detect browser, built on Chromium with 58 C++ source-level patches. CloakBrowser has broader community awareness (24K+ stars) but has significant gaps: WebGPU leaks the host GPU, font enumeration is JS-only so host fonts still leak via CSS/canvas, CDP automation is detectable, and profile generators produce inconsistent fingerprints (Windows UA with macOS GPU). ShardBrowser patches all of these surfaces. Choose CloakBrowser if you need a quick drop-in for basic UA spoofing; choose ShardBrowser if you're facing production anti-fraud systems.

**Multilogin / AdsPower** — Commercial anti-detect browsers that charge $50-200/month per seat. They offer polished UIs, team management features, and support — but their Chromium engines are often outdated, and you're locked into their ecosystem. Multilogin's fingerprint coverage is comparable to ShardBrowser's, but at a significant cost. Choose these if you need enterprise support, team collaboration features, or don't want to manage your own infrastructure.

**Puppeteer / Playwright with stealth plugins** — Open-source browser automation frameworks with community plugins like `puppeteer-extra-plugin-stealth`. These work for simple bot detection but fail against production anti-fraud stacks because the spoofing is JavaScript-based and leaves detectable side-channels. Choose this approach for basic scraping where detection isn't a concern.

### Verdict

ShardBrowser is the most technically complete open-source anti-detect browser I've seen. The engine-level fingerprint spoofing covers surfaces that CloakBrowser and most free alternatives completely ignore — WebGPU, font enumeration, CDP side-channels, QUIC over SOCKS5 — and the 170 real-device profiles are genuinely coherent, not random generator output. The MCP server integration for AI-assisted browser orchestration is a forward-looking feature that no competitor offers. At 326 stars in its first week with active development and comprehensive documentation, the project has real momentum. The main risk is its youth — the comparison claims against CloakBrowser haven't been independently verified, and the unsigned desktop app creates friction on macOS. But if you're building web scraping pipelines, testing multi-account scenarios, or need browser automation that survives production anti-fraud systems, ShardBrowser is worth evaluating today. The fact that it's free and MIT-licensed makes the decision straightforward.
