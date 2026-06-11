---
name: quien
description: "Quien is a Go-based domain intelligence toolkit with an interactive TUI for WHOIS, DNS, mail config, SSL/TLS, SEO, Core Web Vitals, and tech stack detection."
url: https://github.com/retlehs/quien
stars: 1145
forks: 26
language: Go
tags: ["cli", "domain-intelligence", "go", "seo", "developer-tools"]
featured: false
publishedAt: 2026-06-11
---

## Quien

### Overview

Quien is a domain intelligence toolkit written in Go that replaces five or six separate tools you'd normally chain together to investigate a domain. One command gives you WHOIS data, DNS records, mail configuration, SSL/TLS certificates, HTTP headers, SEO analysis, Core Web Vitals, and tech stack detection — all in an interactive TUI with tabbed views. It hit 1,100 GitHub stars within two months of its April 2026 launch, which is fast for a CLI tool in a space that hasn't seen much innovation since `whois` and `dig`.

The project is built by Ben Word (retlehs), a developer with deep roots in the WordPress and web performance ecosystem. That background shows up everywhere in the tool — the SEO analysis isn't surface-level. It parses robots.txt, canonical tags, sitemaps, structured data (JSON-LD, Open Graph, Twitter Cards), and even pulls Core Web Vitals field data from Google's CrUX API with historical trend sparklines. The tech stack detection identifies WordPress plugins, JS/CSS frameworks, and external services by parsing HTML output. For anyone who's ever opened Chrome DevTools, run `whois`, then `dig`, then an SSL checker, then a page speed tool just to understand what a website is doing — quién collapses all of that into a single command.

The tool uses RDAP (Registration Data Access Protocol) as the primary lookup mechanism with WHOIS fallback for TLDs that don't support RDAP yet. This is a smart architectural choice — RDAP is the modern replacement for WHOIS that returns structured JSON instead of freeform text, and ICANN has been pushing registrars to adopt it since 2019. Quien handles the protocol negotiation automatically, so you get the best available data without thinking about which protocol to use.

### Why it matters

Every fullstack developer has been in the position where they need to quickly understand a domain. Maybe you're debugging a CORS issue and need to verify DNS propagation. Maybe you're onboarding onto a project and need to understand the hosting setup, mail configuration, and SSL certificate chain. Maybe you're doing competitive analysis and want to see what tech stack a competitor is running. These tasks happen constantly, and the existing tooling is fragmented — WHOIS clients, `dig`, `nslookup`, online SSL checkers, browser extensions for tech detection, Lighthouse for performance. Each tool gives you one slice of the picture.

Quien gives you the whole picture in one place, and it does it from the terminal where developers actually work. The JSON subcommands (`quien whois`, `quien dns`, `quien mail`, `quien tls`, `quien http`, `quien seo`, `quien stack`, `quien all`) make it scriptable, so you can pipe the output into other tools or feed it into monitoring systems. The interactive TUI with tabbed views is the human-friendly entry point — run `quien example.com` and you get a navigable interface with all the data organized by category.

The timing connects to a broader trend: as more infrastructure moves behind CDNs and serverless platforms, understanding what's actually running behind a domain gets harder. DNS records point to Cloudflare or AWS instead of bare IPs. SSL certificates are managed by the platform. Tech stack fingerprints are obfuscated by bundlers and minifiers. Quien's detection heuristics are built for this modern reality, not for the era when you could just check the `Server` header and know what was running.

### Key Features

**RDAP-First with WHOIS Fallback.** Quien uses RDAP as its primary lookup protocol, which returns structured JSON data instead of the inconsistent freeform text that WHOIS servers produce. When a TLD doesn't support RDAP, quién falls back to WHOIS automatically. It even uses IANA referrals to discover the correct WHOIS server for each TLD, so you don't have to know which server to query.

**Mail Configuration Audit.** This is the feature I keep coming back to. Run `quien mail example.com` and you get MX records, SPF (with full lookup-count and include/redirect tree expansion), DMARC policy, DKIM selector probing, and BIMI with VMC chain validation. If you've ever tried to debug why emails from your domain are landing in spam, you know how painful it is to check each of these individually. Quien does it all at once and shows you exactly what's misconfigured.

**Core Web Vitals with Historical Trends.** Set a CrUX API key and quien pulls real-user Core Web Vitals data — LCP, INP, CLS, FCP, and TTFB at the p75 percentile — with good/needs-improvement/poor ratings and 8-25 week trend sparklines. The CrUX API is free, and this gives you field data (what real users experience) instead of lab data (what Lighthouse simulates). Not every domain has field data — a site needs enough Chrome traffic — but when it's available, this is the fastest way to see how a site performs for real users.

**Tech Stack Detection.** Quien parses HTML output to identify JavaScript and CSS frameworks, WordPress plugins, external services, and other technology fingerprints. It catches things like WordPress plugins by analyzing script tags, link elements, and meta tags. This is useful for competitive analysis, security audits, or just understanding what a codebase is built on before you start working on it.

**Interactive TUI with Tabbed Views.** The terminal UI is clean and responsive. Tab through WHOIS, DNS, mail, TLS, HTTP, SEO, and stack views without leaving the tool. It auto-detects your terminal background (light or dark) and adjusts colors accordingly. If auto-detection gets it wrong in tmux or SSH sessions, override it with `QUIEN_THEME=light` or `QUIEN_THEME=dark`.

**JSON Subcommands for Scripting.** Every data category has a corresponding JSON subcommand: `quien whois`, `quien dns`, `quien mail`, `quien tls`, `quien http`, `quien seo`, `quien stack`, `quien all`. The `--json` flag on the main command gives you everything in one JSON blob. This makes quién scriptable — pipe it into `jq`, feed it to monitoring systems, or use it in CI/CD pipelines.

**Try Before You Install.** Run `ssh quien.sh` to try the tool without installing anything. This is a clever distribution mechanism — SSH into a server that runs quién for you. It's the kind of developer experience detail that signals a project built by someone who thinks about how developers actually discover and evaluate tools.

### Use Cases

- **Debugging DNS and email deliverability** — Run `quien mail yourdomain.com` to see your full mail configuration at once. SPF, DMARC, DKIM, BIMI, and MX records in one view. Spot misconfigurations that cause emails to land in spam.
- **Onboarding onto a new project** — Run `quien project-domain.com` to understand the hosting setup, CDN configuration, SSL certificate chain, and tech stack. Five minutes of investigation that would normally take thirty.
- **Competitive analysis** — Run `quien stack competitor.com` to see what frameworks, libraries, and services they're using. Useful for understanding what's working in your space.
- **SEO audits** — Run `quien seo example.com` to check robots.txt, canonical tags, sitemaps, structured data, and Core Web Vitals in one pass. The CrUX integration gives you real-user performance data with historical trends.
- **CI/CD monitoring** — Use the JSON subcommands in scripts to monitor domain health, SSL certificate expiration, or DNS changes over time. Feed the output into alerting systems.
- **Security reconnaissance** — Run `quien all target.com` to get a complete picture of a domain's infrastructure, mail configuration, and technology stack for security assessments.

### Pros and Cons

Pros:
- Replaces five to six separate tools (whois, dig, SSL checkers, SEO analyzers, tech stack detectors) with a single CLI command. The time savings compound quickly if you do this kind of investigation regularly.
- RDAP-first architecture with automatic WHOIS fallback is the right approach for 2026. RDAP returns structured data, and quién handles the protocol negotiation so you don't have to think about it.
- The mail configuration audit is genuinely excellent. SPF tree expansion, DKIM selector probing, and BIMI/VMC validation are features I haven't seen in any other CLI tool.
- JSON output for every subcommand makes it scriptable. This turns quién from a manual investigation tool into something you can integrate into automated workflows.
- Active development with consistent commits. The project has been updated multiple times in June 2026, including Go 1.26.3 support and detection improvements.

Cons:
- The CrUX API integration requires a Google Cloud API key, which adds setup friction. Not every domain has field data either — smaller sites won't show Core Web Vitals.
- Tech stack detection is HTML-parsing-based, which means it can be fooled by server-side rendering, static site generators, or heavy bundling. It's good for quick reconnaissance, not for definitive answers.
- The tool is Go-only for installation (or Homebrew/AUR/Nix). No npm, no pip, no Docker image. If you're not in the Go ecosystem, the install path might feel unfamiliar, though `go install` is a one-liner.

### Getting Started

```bash
# Install via Go
go install github.com/retlehs/quien@latest

# Or via Homebrew
brew install quien

# Or try without installing
ssh quien.sh

# Interactive domain lookup
quien example.com

# JSON output for scripting
quien --json example.com

# Individual subcommands
quien whois example.com
quien dns example.com
quien mail example.com
quien tls example.com
quien seo example.com
quien stack example.com

# Set up Core Web Vitals (optional)
export QUIEN_CRUX_API_KEY=your-google-cloud-api-key
quien seo example.com
```

### Alternatives

**whois + dig + openssl** — The traditional approach: chain separate tools together to get the same information quién provides in one command. Each tool is mature and well-documented, but you're responsible for parsing inconsistent output formats and knowing which flags to use. Choose this if you only need one piece of the puzzle and don't want to install another tool.

**BuiltWith / Wappalyzer** — Web-based tech stack detection services with browser extensions. BuiltWith has a more comprehensive technology database and historical tracking, but it's a SaaS product with usage limits. Wappalyzer is open-source but focused only on tech detection. Choose these if tech stack detection is your primary need and you want a browser-based workflow.

**SecurityTrails / VirusTotal** — Domain intelligence platforms with APIs for DNS history, WHOIS records, and threat intelligence. More comprehensive for security investigations, but they're SaaS products with pricing tiers and API rate limits. Choose these if you need historical DNS data or threat intelligence that quién doesn't provide.

### Verdict

Quien is the kind of tool that makes you wonder why it didn't exist sooner. It takes the fragmented experience of investigating a domain — bouncing between whois, dig, SSL checkers, SEO tools, and tech stack detectors — and collapses it into a single, well-designed CLI with an interactive TUI. The mail configuration audit alone justifies the install for anyone who manages domains professionally. The RDAP-first architecture shows the developer is thinking about the future, not just wrapping legacy tools. At 1,100 stars in two months with active development and clean Go code, this is worth adding to your toolkit if you work with domains at all — and if you're a fullstack developer, you definitely work with domains. Run `ssh quien.sh` to try it right now, no installation needed.
