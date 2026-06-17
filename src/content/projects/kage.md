---
name: kage
description: "Kage is a Go CLI that clones any website into offline-viewable, script-free mirrors using headless Chrome — 1,800 GitHub stars in 3 days."
url: https://github.com/tamnd/kage
stars: 1795
forks: 52
language: Go
tags: ["go", "offline", "web-archiving", "cli", "developer-tools"]
featured: false
publishedAt: 2026-06-17
---

## Kage

### Overview

Kage (影, "shadow") is a Go command-line tool that clones websites into browsable, script-free offline mirrors. Created on June 14, 2026, it hit 1,795 GitHub stars in just three days — a signal that developers have been waiting for something like this.

The project is built by tamnd, a Go developer who clearly understands the pain of web archiving. The name is Japanese for "shadow," which is exactly what it does: it follows a site like a shadow, copies what a human would see, and leaves all the JavaScript behind.

The core problem kage solves is deceptively simple but practically annoying. You save a webpage for later, open it six months down the road, and get a blank screen, an infinite spinner, or a page that still tries to phone home to an analytics server that no longer exists. The page was never really yours — it was a thin client for someone else's JavaScript. Kage takes the opposite approach: drive a real browser, let the page finish rendering, snapshot the final DOM, then strip every script out. What lands on disk is a clean, self-contained set of HTML files that run with zero network dependency.

### Why it matters

Web archiving has been a solved problem in theory and a mess in practice. Tools like wget and HTTrack do static fetching, which breaks on any site that relies on JavaScript to render content — which is most modern sites. Headless browser tools like Puppeteer can render pages, but wiring them into a complete archiving pipeline with asset localization, link rewriting, and resume support is significant work. Kage wraps all of that into a single binary you install with `go install`.

For fullstack developers, kage fills a gap that no mainstream tool has addressed cleanly. You're building React apps, NestJS backends, Django sites, Go services — and at some point you need to preserve documentation, reference implementations, or design inspiration that lives on the open web. Kage doesn't just save pages; it produces mirrors that look like the live site and run completely offline. The ZIM archive support means you can share these mirrors across platforms, including mobile, using the Kiwix ecosystem.

The timing matters too. The web is getting more JavaScript-heavy, not less. SPAs, dynamic rendering, lazy loading — all of these make traditional saving tools useless. Kage is purpose-built for the web developers actually deal with in 2026.

### Key Features

**Real Browser Rendering.** Kage drives actual headless Chrome to render pages, so it handles SPAs, dynamic content, lazy-loaded images, and any site that needs JavaScript to display properly. The `--scroll` flag auto-scrolls pages to trigger lazy loading. This isn't a curl wrapper — it sees exactly what a human would see.

**Complete Script Stripping.** After rendering, kage removes every script tag, inline event handler, and `javascript:` URL from the DOM. The output runs zero code. No tracking pixels, no analytics calls, no service workers trying to cache things you don't want. The sanitized HTML is genuinely clean.

**Deterministic URL-to-Path Mapping.** Every URL maps to a local file path using a consistent algorithm. The same essay reached over HTTP and HTTPS, with or without a trailing slash, gets fetched exactly once. Links are rewritten to mirror-relative paths before the assets they point at finish downloading. This makes the output idempotent and resumable.

**Self-Contained Pack Formats.** The `kage pack` command collapses a mirror into a single ZIM archive (the open format behind Kiwix/Wikipedia offline), a self-contained executable that serves the site when run, or a double-click desktop app with the site's favicon as the icon. A `--format binary` packed mirror needs nothing installed on the recipient's machine.

**Polite, Resumable Crawling.** Kage reads `robots.txt`, seeds from `sitemap.xml`, and stays on the seed host by default. It saves its place on Ctrl-C and picks up where it stopped on the next run. `--refresh` re-renders in place to catch new content without starting over. Concurrency is configurable with `--workers`.

**Cross-Platform Native Viewer.** Built with the `webview` tag, kage opens packed sites in their own native window using the OS WebView (WKWebView on macOS, WebView2 on Windows, WebKitGTK on Linux). No browser tab, no address bar — just the content in a clean window that looks and feels like a standalone app.

**Container-Ready Distribution.** The official Docker image bundles Chromium, so you can run `docker run --rm -v "$PWD/out:/out" ghcr.io/tamnd/kage clone example.com` without installing Chrome on the host. GitHub Actions releases include `.deb`, `.rpm`, `.apk` packages, checksums, SBOMs, and cosign signatures.

### Use Cases

- **Offline documentation snapshots** — Clone framework docs (React, Next.js, Go stdlib) for reference during flights, in low-connectivity environments, or in CI pipelines that can't reach the internet
- **Design and UI inspiration archiving** — Preserve landing pages, portfolio sites, and design systems as they looked at a specific point in time, without worrying about the site going down or redesigning
- **Content preservation for research** — Archive articles, blog posts, and essays (like Paul Graham's site, which the README uses as its primary demo) in a format that will still open in any ZIM reader years from now
- **Sharing site snapshots with teammates** — Pack a competitor's pricing page, a partner's API docs, or a reference implementation into a single file and send it via Slack or email
- **Generating offline-capable test fixtures** — Create script-free mirrors of production pages for testing, comparison, or regression checking without network dependencies

### Pros and Cons

Pros:

- Solves a real, underserved problem. Web archiving tools haven't kept up with JavaScript-heavy sites, and kage bridges that gap cleanly with a single Go binary.
- The ZIM format support is smart — you're not locked into kage's ecosystem. Your archives work with Kiwix on desktop, Android, and iOS, which means long-term portability.
- The self-contained binary output is genuinely useful. `kage pack paulgraham.com --format binary` produces a 13 MiB executable that anyone can double-click to read the site offline. No dependencies, no setup.
- Resumable crawling with deterministic URL mapping means you can clone large sites incrementally without duplication. The `--refresh` flag for re-rendering is a thoughtful touch.

Cons:

- Requires Chrome or Chromium on the host machine. This is a hard dependency — kage drives real browser tabs, not a lightweight HTTP fetcher. The Docker image bundles Chromium, but local installs need Chrome available.
- No built-in full-text search in packed ZIM files. Browsing and clicking work, but searching within a kage-generated ZIM is limited compared to Kiwix's own packs that include search indexes.
- Large sites can consume significant disk space and Chrome memory. The `--max-pages` and `--max-depth` flags exist for this reason, but users need to be intentional about scope.
- Very new project (3 days old). The API surface, flag names, and pack format details are likely to change. Not production-ready for critical archiving workflows yet.

### Getting Started

```bash
# Install via Go
go install github.com/tamnd/kage/cmd/kage@latest

# Or use the Docker image (bundles Chromium)
docker run --rm -v "$PWD/out:/out" ghcr.io/tamnd/kage clone paulgraham.com

# Clone a site
kage clone paulgraham.com

# Browse it offline
kage serve $HOME/data/kage/paulgraham.com
# open http://127.0.0.1:8800

# Pack into a single ZIM file
kage pack paulgraham.com

# Pack into a self-contained executable
kage pack paulgraham.com --format binary -o paulgraham
./paulgraham  # serves itself, needs nothing installed

# Clone with limits
kage clone go.dev --max-pages 50 --max-depth 2 --scope-prefix /doc
```

### Alternatives

**wget (with `--mirror`)** — The classic CLI tool for downloading websites. wget is fast and handles static sites well, but it doesn't execute JavaScript, so any SPA or dynamically rendered page comes back broken. Choose wget when you're archiving simple, server-rendered HTML sites and don't need browser rendering.

**HTTrack** — A long-established website copier with a GUI and recursive crawling. HTTrack has more configuration options than kage and supports incremental updates, but like wget, it doesn't run JavaScript. It's a better fit for archiving old-school sites with static content and complex directory structures.

**SingleFile (browser extension)** — Saves a complete page as one self-contained HTML file, with all assets inlined. SingleFile produces cleaner single-page saves than kage, but it requires manual operation per page and doesn't do recursive crawling. Better for saving individual pages than cloning entire sites.

### Verdict

Kage is three days old and already has 1,800 stars. That kind of velocity doesn't happen by accident — it means the tool scratches an itch that developers have had for years without a good solution. The Go implementation is fast, the CLI is well-designed, and the decision to support ZIM archives shows the author is thinking about long-term portability, not just building a shiny demo.

Is it production-ready? No. Three-day-old projects with 10 open issues and an API that hasn't settled are not what you bet your archival pipeline on. But for developer workflows — cloning docs before a flight, preserving a reference site, sharing a snapshot with a teammate — kage works today and works well. The `go install` one-liner, the Docker image, and the self-contained binary output mean the barrier to trying it is essentially zero. If you're a fullstack developer who has ever hit "Save As" and gotten a broken page, give kage five minutes. You'll probably keep it around.
