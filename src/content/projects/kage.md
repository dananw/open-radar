---
name: kage
description: "Kage is a Go CLI that clones websites into script-free offline mirrors using headless Chrome, with ZIM archive and self-contained binary export."
url: https://github.com/tamnd/kage
stars: 318
forks: 4
language: Go
tags: ["go", "cli", "web-archiving", "offline", "developer-tools"]
featured: false
publishedAt: 2026-06-15
---

## Kage

### Overview

Kage (影, Japanese for "shadow") is a Go CLI tool that clones entire websites into clean, script-free offline mirrors. It launched on June 14, 2026, and hit 318 stars within its first day — a velocity that suggests developers have been waiting for exactly this kind of tool.

The project is built by tamnd, a developer whose GitHub profile shows a consistent track record of Go tooling. What makes kage stand out from the dozens of website downloaders that already exist is its approach: instead of parsing raw HTML and hoping for the best, it drives real headless Chrome, waits for each page to fully render, snapshots the final DOM, and then strips every script tag, inline event handler, and `javascript:` URL from the output. The result is a static mirror that looks exactly like the live site but runs zero code.

The core problem kage solves is deceptively simple. You save a webpage for later, and six months down the line you open it to find a blank screen, a spinner that never resolves, or a copy that still phones home to analytics servers that no longer exist. Modern websites are thin clients for someone else's JavaScript. Kage takes the opposite approach — render everything, capture the result, remove the runtime dependency entirely.

### Why it matters

Web archiving has been a niche concern for years, but the problem is getting worse. According to the Internet Archive, the average webpage lifespan is now under 100 days before significant changes or disappearance. Documentation sites restructure, blogs go offline, companies pivot and wipe their marketing pages. For developers who rely on reference material, API docs, and technical blog posts, this is a real productivity drain.

Existing tools like wget, HTTrack, and SingleFile have limitations that kage addresses directly. wget doesn't execute JavaScript, so it misses any content rendered client-side. HTTrack has similar issues with modern SPAs. SingleFile captures a single page well but doesn't handle multi-page crawling with proper link rewriting. Kage combines headless browser rendering with intelligent crawling, deterministic URL-to-path mapping, and proper asset localization — the CSS `url()` references get rewritten to local paths, images download to a predictable location, and everything stays browsable without a network connection.

The ZIM archive export is particularly clever. ZIM is the format behind Kiwix, the project that carries Wikipedia onto boats, into classrooms with no internet, and onto phones for long flights. By writing to this open, documented standard, kage ensures your archived content remains accessible through the entire Kiwix ecosystem — desktop apps, mobile apps, and self-hosted servers — years after you create it.

### Key Features

**Headless Chrome rendering.** Kage spawns real Chrome or Chromium instances to render pages, waiting for the DOM to stabilize before snapshotting. This means client-side rendered React, Vue, Angular, and Svelte apps all get captured correctly. Lazy-loaded images are handled with an optional `--scroll` flag that scrolls each page to trigger deferred loading before capture.

**Deterministic URL-to-path mapping.** Every URL is mapped to a local file path using a consistent algorithm. The same essay reached via HTTP and HTTPS, with or without a trailing slash, gets fetched and written exactly once. This makes mirrors idempotent — running the same clone twice produces identical output, and interrupted crawls resume cleanly from where they stopped.

**ZIM archive packing.** The `kage pack` command collapses an entire mirror folder into a single ZIM file with zstd-compressed text and raw media. The archive is deterministic (same content produces byte-identical output), and the UUID is derived from the content rather than randomized. This makes ZIM files safe to checksum, cache, and distribute.

**Self-contained binary export.** With `--format binary`, kage appends the ZIM archive to a copy of itself, producing a single executable that serves the archived site offline when run. The recipient needs nothing installed — no kage, no ZIM reader, no browser extension. Cross-platform viewers can be built by pointing `--base` at a kage binary compiled for the target OS.

**Respectful crawling.** The crawler reads `robots.txt`, seeds itself from `sitemap.xml` when available, and stays on the seed host by default. It supports `--scope-prefix` for limiting to specific path sections, `--subdomains` for including related hosts, and `--exclude` for skipping paths. Four concurrent workers render pages by default, configurable with `--workers`.

**Native window viewer.** When built with the `webview` build tag, kage can open archived sites in a native OS window (WKWebView on macOS, WebView2 on Windows, WebKitGTK on Linux) instead of the system browser. This gives archived content the feel of a standalone desktop application.

**Shell completion and Docker support.** Tab completion ships for bash, zsh, fish, and PowerShell. The Docker image bundles Chromium so you don't need to install a browser separately. Prebuilt binaries are available for every major platform through GoReleaser, including `.deb`, `.rpm`, and `.apk` packages.

### Use Cases

- **Documentation archiving** — Clone API docs, framework guides, or library references before major version changes break old links. Useful for teams maintaining legacy systems that depend on specific documentation versions.

- **Offline reference material** — Create script-free mirrors of technical blogs, Paul Graham's essays, or Stack Overflow threads for reading on planes, in areas with poor connectivity, or in environments where network access is restricted.

- **Content migration auditing** — Before a website redesign, clone the current version and compare it against the new one. The static output makes it easy to diff content without JavaScript noise.

- **Security research** — Capture a website's rendered output with all scripts removed for analysis. Useful for examining what a page actually displays versus what its source code suggests.

- **Self-contained demos** — Package a web application's output into a single binary that anyone can run without setup. Share interactive prototypes, portfolio pieces, or client demos as standalone executables.

### Pros and Cons

Pros:
- **Real browser rendering means real results.** Unlike wget-based tools, kage handles SPAs, lazy loading, and dynamic content correctly because it uses actual Chrome to render pages.
- **ZIM format ensures long-term accessibility.** Your archives aren't locked into kage's ecosystem. They work with Kiwix on every platform, including mobile, and the format is documented and stable.
- **Self-contained binaries are genuinely useful.** The ability to produce a single executable that serves an entire website offline is a feature I haven't seen done this well in any other tool.

Cons:
- **Chrome/Chromium dependency is heavy.** Kage requires a real browser installation, which adds significant weight compared to pure-HTTP tools. The Docker image mitigates this but the resource usage is still notable.
- **No image or multimodal input support.** Like similar tools, kage captures rendered HTML but doesn't handle complex interactive content like WebGL canvases, video players with DRM, or authenticated content behind login walls.
- **Young project with limited ecosystem.** At one day old, kage lacks the community tooling, plugins, and battle-testing that established archiving tools have. Edge cases in complex sites will likely surface over time.

### Getting Started

```bash
# Install via Go
go install github.com/tamnd/kage/cmd/kage@latest

# Or use Docker (bundles Chromium)
docker run --rm -v "$PWD/out:/out" ghcr.io/tamnd/kage clone paulgraham.com

# Clone a site
kage clone paulgraham.com

# Serve the mirror locally
kage serve $HOME/data/kage/paulgraham.com
# Open http://127.0.0.1:8800

# Pack into a single ZIM file
kage pack paulgraham.com

# Pack into a self-contained binary
kage pack paulgraham.com --format binary -o paulgraham
./paulgraham  # Opens in browser, serves the site offline

# Clone with limits
kage clone go.dev --scope-prefix /doc --max-pages 50 --max-depth 2

# Refresh an existing mirror
kage clone paulgraham.com --refresh
```

### Alternatives

**wget** — The classic recursive website downloader. It's fast, universally available, and doesn't need a browser, but it doesn't execute JavaScript. For static HTML sites (like old-school blogs), wget is lighter and sufficient. For anything built with a modern framework, kage produces dramatically better results.

**SingleFile** — A browser extension that saves a single page as one self-contained HTML file. Excellent for individual pages — better than kage for one-off saves since it's a right-click away. But it doesn't crawl multiple pages, rewrite cross-page links, or produce distributable archives. Use SingleFile for single pages, kage for entire sites.

**HTTrack** — A mature website copier with decades of development. It handles basic mirroring well and has extensive configuration options. However, its rendering engine doesn't support modern JavaScript frameworks, and its output format is less portable than kage's ZIM export. HTTrack is the safer choice for simple static sites where you need maximum control over crawl behavior.

### Verdict

Kage is the most thoughtfully designed website archiver I've seen in years. The decision to use headless Chrome for rendering, strip scripts from the output, and export to the open ZIM format shows a developer who understands both the technical problem and the long-term preservation angle. At one day old with 318 stars, it's clearly resonating with developers who've been burned by broken "Save As" copies and link rot. The self-contained binary export is a killer feature — being able to hand someone a single executable that serves an entire website offline is genuinely useful for documentation distribution, client demos, and portfolio sharing. If you work with web content that matters enough to keep, kage is worth installing now.
