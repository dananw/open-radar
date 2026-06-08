---
name: senpaiscanner
description: "SenPaiScanner is a Go-based Cloudflare IP scanner with TUI and Android app — find optimal edge IPs with xray proxy validation for faster, more reliable connections."
url: https://github.com/MatinSenPai/SenPaiScanner
stars: 1382
forks: 79
language: Go
tags: ["go", "cloudflare", "networking", "cli", "proxy"]
featured: false
publishedAt: 2026-06-09
---

## SenPaiScanner

### Overview

SenPaiScanner is a lightweight Cloudflare IP scanner written in Go that hit 1,300 GitHub stars within two weeks of its late-May 2026 launch. It probes Cloudflare edge IPs, validates them through your actual proxy config (VLESS, Trojan, VMess), and presents everything in a clean terminal UI — no CLI flags to memorize.

The project comes from MatinSenPai, an Iranian developer building tools for networks where latency is unpredictable and connections drop without warning. That origin story matters: this tool was born from real-world frustration with Cloudflare edge routing, not from a theoretical problem. When your CDN's anycast routing sends you to a congested node 200ms away instead of a clear one 20ms away, you need a way to find the better path. SenPaiScanner does exactly that.

The core workflow is simple: it generates random Cloudflare IPv4 addresses, probes them in parallel with configurable worker counts and timeouts, then optionally runs the best hits through an embedded xray instance to validate them against your actual VLESS or Trojan proxy configuration. Results include endpoint, transport type, download speed, latency (TTFB), and pass/fail status. Press `c` to copy working IP:port endpoints to your clipboard. Your last scan settings persist automatically.

### Why it matters

If you deploy behind Cloudflare — and roughly 20% of the web does, according to W3Techs — you've probably noticed that Cloudflare's anycast routing doesn't always pick the optimal edge node. Geographic proximity doesn't guarantee network proximity. A node in your city might route through three congested transit providers while a node 500km away takes a direct peering path with 5x lower latency.

For fullstack developers running APIs behind Cloudflare, this translates directly to response times. A 150ms TTFB penalty on every API call adds up fast in single-page applications making multiple sequential requests. SenPaiScanner gives you a way to identify and preferentially route through Cloudflare's better-performing edge IPs for your specific network path.

The tool also fills a gap in the proxy and VPN tooling space. Most Cloudflare IP scanners are either Python scripts with no validation or enterprise tools with enterprise price tags. SenPaiScanner is a single Go binary with an embedded xray engine, a TUI that works in Termux on Android, and a native APK for mobile use. That combination — fast, portable, and actually usable — explains the rapid adoption.

### Key Features

**Two-Phase Scanning Architecture.** Phase 1 probes candidate Cloudflare IPs using either random generation from known Cloudflare IPv4 ranges or entries from a previous scan's `ips.txt` file. Phase 2 takes the best Phase 1 hits and validates them end-to-end through your actual proxy configuration using an embedded xray instance. This two-phase approach means you're not just finding responsive IPs — you're finding IPs that actually work with your specific setup.

**Terminal UI with Zero CLI Flags.** Everything happens inside a clean TUI built with Bubble Tea. Navigate with arrow keys, select counts and timeouts from menus, paste your config URL, and press Enter to scan. No commands to memorize, no man pages to consult. The tool remembers your last scan configuration, so "Retry Last Scan" on the home screen repeats everything without re-entering anything.

**Neighbor Scanning in Random Mode.** When a random-mode probe finds a healthy IP, SenPaiScanner automatically explores nearby addresses in the same Cloudflare IP block. Cloudflare allocates IPs in contiguous ranges, and performance characteristics tend to cluster within blocks. This heuristic finds working IPs faster than pure random sampling.

**Cross-Platform with Android Native App.** Pre-built binaries cover Linux (x86_64, ARM64, 32-bit), macOS (Intel, Apple Silicon), and Windows (x86_64, 32-bit). There's also a signed Android APK with a touch-friendly UI and full Termux support for running the desktop TUI on your phone. One install script handles everything: `curl -fsSL https://github.com/MatinSenPai/SenPaiScanner/raw/refs/heads/main/install.sh | bash`.

**Embedded xray Engine for Proxy Validation.** The Phase 2 validation runs a real xray instance with your VLESS, Trojan, or VMess config. It measures actual download speed and TTFB through the proxy tunnel, not just raw TCP connectivity. This is the feature that separates SenPaiScanner from simple ping-and-probe tools — it tests the path you'll actually use.

**Multi-Port and Multi-Protocol Support.** Scan against Cloudflare's standard HTTPS ports (443, 8443, 2053, 2083, 2087, 2096) plus custom ports. The embedded xray supports VLESS, Trojan, and VMess share URLs with automatic parsing of SNI, host, WebSocket path, and port from your config link.

### Use Cases

- **API performance optimization** — If your React or Next.js frontend makes API calls through Cloudflare, finding a lower-latency edge node can cut 50-150ms from each request. For SPAs making 5-10 sequential API calls on page load, that's a noticeable improvement.

- **CDN troubleshooting** — When Cloudflare's routing sends users to a congested node, SenPaiScanner helps identify alternative IPs that perform better. Useful for debugging intermittent latency spikes that Cloudflare's dashboard doesn't surface.

- **Proxy and VPN optimization** — For developers in regions where Cloudflare's anycast doesn't route optimally, SenPaiScanner finds edge IPs that work reliably with VLESS/Trojan/VMess proxy configs. The xray validation ensures the IP actually works end-to-end.

- **Network path analysis** — Compare performance across different Cloudflare edge nodes to understand your ISP's peering quality. If you consistently get better results from a specific IP range, that tells you something about your network's routing.

- **Mobile network testing** — Run scans from your phone via the Android APK or Termux to test Cloudflare performance on mobile networks, which often have very different routing than fixed connections.

### Pros and Cons

Pros:
- Single Go binary with no external dependencies. Download, run, scan. The embedded xray engine means you don't need a separate proxy validation tool.
- The TUI is genuinely well-designed — scan results update in real-time, navigation is intuitive, and the config URL field supports standard text editing shortcuts. This isn't a hastily thrown-together terminal tool.
- Active development with 3 releases in the first week (v0.3.0 through v0.5.0) and commits landing daily. The maintainer responds to issues and merges community PRs quickly.
- MIT licensed with pre-built binaries for every major platform including Android. The install script handles detection and setup automatically.

Cons:
- The tool is primarily useful if you're behind Cloudflare and have specific routing issues. If Cloudflare's default routing works fine for your use case, there's no reason to scan.
- Phase 2 xray validation requires a proxy config URL (VLESS/Trojan/VMess). If you're using Cloudflare directly without a proxy layer, you're limited to Phase 1 HTTP probing.
- The project is young (created May 28, 2026) and the API surface is still evolving. The scan parameters and output format may change in future releases.
- Star count (1.3K) may be inflated by the project's popularity in specific communities where Cloudflare IP scanning is a common need.

### Getting Started

```bash
# Install via the one-liner (Linux/macOS)
curl -fsSL https://github.com/MatinSenPai/SenPaiScanner/raw/refs/heads/main/install.sh | bash

# Or install from source
go install github.com/matinsenpai/senpaiscanner/cmd/senpaiscanner@latest

# Run the TUI
senpaiscanner

# Check version
senpaiscanner --version
```

The TUI opens with a menu. Select "Find Working IPs," configure your scan parameters (source, count, workers, timeout, ports), optionally paste your proxy config URL for Phase 2 validation, and press Enter. Results appear in real-time and can be saved to `ips.txt` with the `c` key.

### Alternatives

**Cloudflare's own diagnostics** — Cloudflare provides `cdn-cgi/trace` and debugging headers, but these show you which node you're hitting, not which node would be better. SenPaiScanner actively probes alternatives. Use Cloudflare's tools for diagnosis, SenPaiScanner for finding better options.

**cfScanner (Python)** — Another Cloudflare IP scanner written in Python. It's simpler and has been around longer, but lacks SenPaiScanner's embedded xray validation, TUI, and Android support. If you just need a quick probe without proxy validation, cfScanner works fine. If you need end-to-end testing through your actual proxy config, SenPaiScanner is the better tool.

**WARP+ / Cloudflare Zero Trust** — Cloudflare's own WARP client can optimize routing automatically. But it's a full VPN that routes all traffic through Cloudflare, not a surgical tool for finding specific better-performing edge IPs. Use WARP if you want Cloudflare to handle routing. Use SenPaiScanner if you want to find and prefer specific IPs yourself.

### Verdict

SenPaiScanner is a focused, well-executed tool that solves a real problem for a specific audience. If you're a fullstack developer deploying behind Cloudflare and you've noticed inconsistent API response times, this tool gives you a way to investigate and fix it. The Go implementation makes it fast, the TUI makes it accessible, and the embedded xray engine makes it actually useful for proxy users rather than just a ping tool. It's young software with a narrow scope, but it does what it claims to do, and the 1.3K stars in under two weeks suggest the problem it solves is more common than most developers admit.
