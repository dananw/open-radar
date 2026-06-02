---
name: osiris
description: "Osiris is an open-source real-time OSINT dashboard built with Next.js and MapLibre GL — a Palantir alternative with 16 intelligence layers, RECON toolkit, and GPU-accelerated map rendering."
url: https://github.com/simplifaisoul/osiris
stars: 4205
forks: 840
language: TypeScript
tags: ["osint", "nextjs", "typescript", "intelligence", "maplibre", "security"]
featured: false
publishedAt: 2026-06-03
---

## Osiris

### Overview

Osiris is an open-source global intelligence platform that aggregates live flight tracking, maritime vessel monitoring, CCTV feeds, earthquake data, conflict zone mapping, and 24/7 news broadcasts into a single GPU-accelerated dashboard. It hit 4,200 GitHub stars within three weeks of its May 2026 launch, pulling in 840 forks — numbers that suggest real developer engagement, not just bookmark-and-forget behavior.

The project comes from simplifaisoul, a developer who appears to have built this from direct operational need rather than academic curiosity. The architecture is production-oriented: Next.js 16 on the frontend, MapLibre GL for WebGL-based map rendering, and a collection of API routes that pull from 15+ public data sources including OpenSky Network, USGS, NASA FIRMS, NOAA, and OpenSanctions. There's no proprietary backend — it runs entirely on public APIs with optional keys for higher rate limits.

The core problem Osiris solves is fragmentation. If you've ever tried to monitor multiple intelligence feeds — flight trackers, seismic monitors, news streams, vessel tracking, cybersecurity CVE databases — you know the pain of having 12 browser tabs open. Osiris collapses all of that into one interface with 16 toggleable data layers, each rendering via WebGL so you can have thousands of entities on screen without the browser choking.

### Why it matters

The OSINT space has been dominated by expensive commercial platforms like Palantir Gotham and Recorded Future for years. Individual developers, small security teams, and journalists have been stuck cobbling together free tools. Osiris doesn't try to replace enterprise intelligence platforms — it fills the gap for teams that need real-time situational awareness without a six-figure contract.

What makes this project technically interesting is the performance story. All map data renders through WebGL via MapLibre GL, not DOM elements. The team reports a 75% reduction in edge requests compared to the initial release through aggressive polling relaxation (15-30 minute intervals for stable data) and static data served from memory. That's the kind of engineering discipline you don't always see in early-stage open source projects.

The broader trend here is the democratization of intelligence tooling. Open-source alternatives to traditionally enterprise-only software are getting genuinely good. Osiris joins projects like Maltego CE and Shodan in making OSINT accessible, but it's the first to combine this many data domains into a single real-time dashboard with a modern web stack.

### Key Features

**16 Toggleable Intelligence Layers.** Each layer represents a distinct data domain — aviation, maritime, CCTV, seismic activity, wildfires, news broadcasts, weather events, space weather, cybersecurity CVEs, conflict zones, crypto wallet tracing, sanctions screening, and Telegram OSINT. Layers load progressively on demand, so activating only the domains you need keeps performance tight.

**GPU-Accelerated Map Rendering.** Every data point on the map renders through WebGL via MapLibre GL, not HTML DOM elements. This means you can have thousands of concurrent entities — flight paths, vessel tracks, earthquake markers — without the browser frame rate dropping. The viewport-aware loading system only fetches data for the visible map region.

**RECON Security Toolkit.** A built-in reconnaissance panel with TCP port scanning (with service fingerprinting), full DNS record resolution (A, AAAA, MX, NS, TXT, CNAME), WHOIS lookups, SSL/TLS certificate chain analysis, IP geolocation with ASN data, CVE vulnerability scanning against the NVD database, and crypto wallet tracing for BTC and ETH addresses. Every WHOIS and IP lookup is automatically cross-checked against the US OFAC SDN sanctions list.

**Live Broadcast Network.** The map integrates 25+ live 24/7 news streams from global broadcasters including NBC, CBS, Sky News, Al Jazeera, France 24, NHK, and WION. Click any news marker on the map to open the live stream directly in the interface. No external media player needed.

**Telegram OSINT Layer.** Public Telegram channels are scraped via the unauthenticated `t.me/s/<channel>` web preview — no Bot API token or MTProto connection required. Posts are geoparsed against a multilingual place dictionary supporting English, Cyrillic, and Arabic scripts, then plotted on the map. Click any marker to read the post and jump to the original on Telegram.

**Crypto Wallet Intelligence.** BTC lookups run through Blockstream's Esplora API and ETH lookups through Blockscout's public instance — both keyless. Every wallet lookup is automatically cross-checked against the OFAC SDN sanctioned-address list, and flagged wallets surface a red "SANCTIONED" badge in the RECON panel. This is genuinely useful for compliance and investigative work.

**Docker-First Deployment.** The project ships with a multi-stage Docker build producing a ~220 MB standalone image running as non-root. The Docker Compose file includes CasaOS app metadata for one-click installation on home servers. Most features work without any API keys — the core feeds all use public, keyless sources.

### Use Cases

- **Security researchers and penetration testers** — The RECON toolkit provides port scanning, DNS enumeration, WHOIS lookups, and CVE scanning in a single interface without switching between Nmap, dig, whois, and separate vulnerability databases.
- **Journalists and investigative reporters** — The Telegram OSINT layer, conflict zone monitoring, and OFAC sanctions screening make it useful for tracking events in real-time across multiple intelligence domains simultaneously.
- **Small security teams and SOCs** — Teams that can't afford Palantir or Recorded Future subscriptions get a functional real-time dashboard with flight tracking, maritime monitoring, and cybersecurity feeds in one place.
- **Open-source intelligence hobbyists** — Anyone interested in OSINT who wants a professional-grade dashboard without the learning curve of setting up individual tools like Maltego, Recon-ng, or SpiderFoot.
- **Fullstack developers studying modern WebGL and real-time data architectures** — The codebase demonstrates MapLibre GL integration, progressive data loading, viewport-aware fetching, and aggressive polling optimization patterns worth learning from.

### Pros and Cons

Pros:
- Works out of the box without API keys for most features. The core feeds (USGS earthquakes, NASA FIRMS fires, OpenSky flights, RSS news) are all public and keyless, so you can clone and run it immediately.
- The GPU rendering approach actually delivers — thousands of entities on screen without frame drops, which is rare in web-based map applications.
- Aggressive performance optimization: 75% reduction in edge requests, 15-30 minute polling intervals for stable data, and static data served from memory rather than hitting external APIs repeatedly.
- The RECON toolkit's automatic OFAC SDN cross-checking is a thoughtful touch that adds real compliance value to basic reconnaissance tasks.

Cons:
- Early-stage project with no formal versioning. The API surface and data layer architecture may change significantly as the project matures.
- Relies entirely on third-party public APIs (OpenSky, USGS, NASA, etc.) that could change their terms, rate limits, or availability without notice. The OpenSky OAuth2 requirement since March 2025 already requires optional credentials.
- No built-in authentication or multi-user support. Running this as a shared team tool requires putting it behind your own auth proxy.
- The Telegram OSINT scraping approach (web preview parsing) is fragile and could break if Telegram changes their public channel preview format.

### Getting Started

```bash
# Clone and run with npm
git clone https://github.com/simplifaisoul/osiris.git
cd osiris
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start toggling intelligence layers on the map.

For Docker deployment:

```bash
git clone https://github.com/simplifaisoul/osiris.git
cd osiris
cp .env.template .env
docker compose up -d
```

Or use the prebuilt GHCR image:

```bash
docker pull ghcr.io/aiacos/osiris:latest
docker run -d -p 3000:3000 --env-file .env ghcr.io/aiacos/osiris:latest
```

### Alternatives

**Maltego CE** — The classic OSINT visualization tool with graph-based entity relationship mapping. Maltego is more mature for deep investigative workflows where you need to trace connections between entities (people, companies, domains, IPs). However, it's a desktop Java application with a steeper learning curve and the Community Edition has significant feature limitations. Choose Maltego when you need relationship graph analysis over real-time monitoring.

**Shodan** — The internet-connected device search engine focused on cybersecurity reconnaissance. Shodan excels at finding exposed services, devices, and vulnerabilities across the internet, but it's a search engine, not a real-time dashboard. It doesn't cover aviation, maritime, seismic, or news domains. Choose Shodan when your focus is purely internet asset discovery and vulnerability research.

**SpiderFoot** — An automated OSINT collection tool with 200+ modules for reconnaissance. SpiderFoot is better for automated, repeatable intelligence gathering workflows where you define targets and let the tool run. It's more thorough in data collection but doesn't provide a real-time visual dashboard. Choose SpiderFoot when you need automated reconnaissance pipelines over live situational awareness.

### Verdict

Osiris is the most visually impressive open-source OSINT dashboard I've seen. The combination of 16 intelligence domains, GPU-accelerated rendering, and a zero-config startup experience is genuinely compelling. For a project that's barely three weeks old, the engineering quality is notable — the performance optimizations (viewport-aware loading, aggressive polling relaxation, in-memory static data) show someone who cares about production readiness, not just demo-ware. The RECON toolkit with automatic OFAC sanctions cross-checking adds practical value beyond just being a pretty map. It's early-stage and the dependency on public APIs is a real concern, but for security teams, journalists, and developers who need multi-domain situational awareness without enterprise budgets, Osiris is worth running today. The 4,200 stars and 840 forks in three weeks suggest the community agrees.
