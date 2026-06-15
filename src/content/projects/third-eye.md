---
name: third-eye
description: "Third Eye is a production-grade OSINT platform built with Next.js 16 and MapLibre GL — a real-time intelligence dashboard with 13+ data domains, GPU-accelerated rendering, and zero API keys required."
url: https://github.com/eli-labz/Third-Eye
stars: 287
forks: 1
language: TypeScript
tags: ["osint", "nextjs", "typescript", "geospatial", "real-time", "webgl"]
featured: false
publishedAt: 2026-06-15
---

## Third Eye

### Overview

Third Eye is an open-source OSINT (Open Source Intelligence) platform that aggregates live flight tracking, maritime data, CCTV networks, earthquake monitoring, conflict zone mapping, crypto wallet tracing, and 24/7 news feeds into a single GPU-accelerated web interface. It hit 287 GitHub stars within two days of its June 13, 2026 launch — a signal that developers are hungry for real-world examples of high-performance real-time data visualization on the modern web stack.

The project is built by eli-labz and runs on Next.js 16 with the App Router, TypeScript 5, and MapLibre GL JS for GPU-accelerated map rendering via WebGL. Every data point — flights, ships, earthquakes, satellites — is rendered through the GPU, not the DOM, which means the interface handles thousands of concurrent entities at 60fps. The entire platform works without any API keys on first launch. Clone the repo, run `npm install && npm run dev`, and you're looking at a live global intelligence dashboard in under two minutes.

What makes this project stand out technically is the architecture. It's not a toy demo with a few markers on a Google Map. There are 16 toggleable data layers pulling from real sources — OpenSky Network for aviation, USGS for seismic data, NASA FIRMS for fire hotspots, blockstream.info for BTC wallet tracing, OpenSanctions for OFAC SDN cross-checks, and 25+ live news streams from global broadcasters. The data fetching is viewport-aware and progressively loaded, so you only hit external APIs for what's visible on screen. Polling intervals are aggressively relaxed (15-30 minutes for stable data), and static data is served from memory. The result is a 75% reduction in edge requests compared to naive implementations.

### Why it matters

Most developers building real-time dashboards reach for the same handful of tools: a charting library, a WebSocket connection, and a table component. Third Eye demonstrates something different — a full production architecture for rendering thousands of geospatial entities in the browser at interactive frame rates. The MapLibre GL + WebGL approach is the same technology stack used by Mapbox and Apple Maps, but here it's applied to intelligence data rather than navigation.

For fullstack web developers, this project is a masterclass in several patterns that are increasingly relevant: viewport-aware data loading (only fetch what the user can see), progressive layer activation (don't load everything upfront), GPU-accelerated rendering (offload heavy visualization work from the CPU), and graceful degradation (everything works without API keys, enhanced features require configuration). These patterns apply to any data-heavy web application — dashboards, monitoring tools, logistics platforms, financial terminals.

The timing connects to a broader shift. Geospatial data is exploding. Supply chain tracking, climate monitoring, autonomous vehicle fleets, and social media analysis all produce location-time data that needs real-time visualization. Third Eye is one of the most complete open-source examples of how to build that kind of interface with a TypeScript-first stack.

### Key Features

**GPU-Accelerated Map Rendering.** All map data is rendered via WebGL through MapLibre GL JS, not DOM elements. This means the browser's GPU handles the heavy lifting of drawing thousands of entities — flight paths, ship tracks, earthquake markers, satellite positions — while the CPU stays free for data fetching and UI logic. The result is 60fps performance even with thousands of concurrent entities on screen, which is a hard requirement for any real-time geospatial dashboard.

**16 Toggleable Intelligence Layers.** The platform ships with aviation (OpenSky Network), maritime (39 global ports, 10 chokepoints), 2,000+ CCTV cameras (TfL, WSDOT, Caltrans, NYC DOT, VicRoads), real-time seismic data (USGS M2.5+), fire hotspots (NASA FIRMS), 25+ live news streams, weather events (NASA EONET), space/satellite tracking (NOAA SWPC, N2YO), CVE vulnerability scanning (NVD), 13 active conflict zones, BTC + ETH wallet tracing, OFAC sanctions search, and Telegram OSINT geoparsing. Each layer loads progressively and only when activated.

**Zero-Key Startup.** Every core data layer works out of the box with public, keyless APIs. No registration, no API key management, no rate limit headaches during development. Clone, install, run. Optional API keys exist for higher rate limits on specific services (NASA FIRMS, OpenSky OAuth2, AIS maritime), but they're not required to get a fully functional dashboard.

**Built-in RECON Toolkit.** Beyond passive data visualization, Third Eye includes an active reconnaissance toolkit: TCP port scanner with service fingerprinting, full DNS record resolution (A, AAAA, MX, NS, TXT, CNAME), WHOIS lookup with automatic OFAC SDN cross-checking, SSL/TLS certificate chain analysis, IP intelligence with geolocation and threat reputation, CVE vulnerability lookup against NVD, and crypto wallet tracing for both BTC (blockstream.info) and ETH (Blockscout) with live sanctions flagging.

**Telegram OSINT Layer.** Public channel posts are scraped from the unauthenticated web preview — no Bot API token, no MTProto library needed. Posts are geoparsed against a multilingual place dictionary (English, Cyrillic, Arabic) and plotted on the map in real time. Channel lists are configurable via environment variables. This is a clever approach to social media intelligence that avoids the authentication headaches of official APIs.

**Optional Smart System Module.** A feature-flagged, human-in-the-loop data-fusion layer that adds an analyst workflow: ingestion, ontology normalization, advisory AI models (object detection, track anomaly detection, report summarization, risk scoring), and human approve/reject/request-changes queue with full audit trail. It's decision-support only — nothing autonomous. Completely invisible unless enabled via `ENABLE_MSS_SMART_SYSTEM_MODULE=true`.

**Docker-Ready Deployment.** Single-command self-hosting with a prebuilt GHCR image. `docker compose up -d` brings up the entire stack. CasaOS one-click install is supported. The published host port is configurable via `THIRDEYE_PORT` in `.env` without editing the compose file. This makes it trivial to deploy on any VPS or home server.

### Use Cases

- **Security operations centers** that need a unified dashboard for monitoring global events, tracking assets, and correlating intelligence across multiple domains without paying for commercial Palantir-style platforms.
- **Journalism and investigative reporting** — cross-reference flight tracking, maritime data, sanctions lists, and crypto wallet movements to trace supply chains or financial flows.
- **Fullstack developers learning real-time geospatial visualization** — Third Eye is one of the most complete open-source examples of MapLibre GL + WebGL rendering with progressive data loading and viewport-aware fetching.
- **DevOps and infrastructure monitoring** — the architecture patterns (GPU rendering, progressive loading, viewport-aware fetching, graceful API degradation) apply directly to building high-performance monitoring dashboards.
- **Research and academic projects** that need to aggregate and visualize geospatial data from multiple public sources in a single interface.
- **AI agent integration experiments** — the optional Smart System module demonstrates how to layer LLM-powered analysis over real-time data feeds with human-in-the-loop approval workflows.

### Pros and Cons

Pros:
- Zero API keys required for core functionality removes the biggest friction point in trying out an OSINT tool. Clone and run in under two minutes.
- GPU-accelerated MapLibre GL rendering handles thousands of entities at 60fps, which is a significant technical achievement for a browser-based dashboard.
- 13+ real data sources from reputable providers (USGS, NASA, OpenSky, NVD, OpenSanctions) — this isn't a demo with mock data.
- The built-in RECON toolkit (port scanner, DNS, WHOIS, SSL, CVE, crypto tracing) adds active intelligence capabilities beyond passive visualization.
- MIT license and Docker deployment make it easy to self-host and customize.

Cons:
- Only 2 days old at the time of writing (created June 13, 2026). The API surface and architecture are likely to change significantly. Not production-ready for critical use cases yet.
- 1 fork and minimal contributor diversity — this is essentially a solo project. Long-term maintenance depends on the original author's continued interest.
- The Smart System module (AI-powered analysis) is feature-flagged and off by default, suggesting it's still experimental. Documentation for the AI integration is sparse.
- No automated test coverage visible in the repository. For a security-focused tool, this is a notable gap.

### Getting Started

```bash
# Clone the repository
git clone https://github.com/eli-labz/Third-Eye.git
cd Third-Eye

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open http://localhost:3000 — the dashboard loads with all core layers active. No API keys needed. Toggle layers with keyboard shortcuts: `F` for flights, `E` for earthquakes, `S` for satellites, `D` for day/night cycle.

For Docker deployment:

```bash
# Copy and edit environment template
cp .env.template .env

# Start with Docker Compose
docker compose up -d
```

Or use the prebuilt image:

```bash
docker pull ghcr.io/aiacos/third-eye:latest
docker run -d -p 3000:3000 --env-file .env ghcr.io/aiacos/third-eye:latest
```

To enable the optional Smart System AI module:

```env
ENABLE_MSS_SMART_SYSTEM_MODULE=true
SMART_SYSTEM_RUN_KEY=<random-secret>
KV_REST_API_URL=...    # Vercel KV or Upstash for state persistence
KV_REST_API_TOKEN=***
```

### Alternatives

**Palantir Gotham** — The commercial gold standard for intelligence analysis platforms. Gotham offers far more sophisticated data fusion, entity resolution, and collaborative analysis features, but it costs six figures annually and is designed for government and enterprise clients. Third Eye is the open-source, self-hostable alternative for teams that need geospatial intelligence visualization without the enterprise price tag.

**OpenCTI (Open Cyber Threat Intelligence)** — A mature open-source platform for cyber threat intelligence management with a large community (5,000+ GitHub stars). OpenCTI is more focused on structured threat intelligence (STIX/TAXII, MITRE ATT&CK) and less on real-time geospatial visualization. Choose OpenCTI if your primary use case is threat intelligence management; choose Third Eye if you need a real-time map-based dashboard.

**Deck.gl + H3** — Uber's open-source geospatial visualization framework is more flexible and performant for custom geospatial applications, but it requires significant development work to build a complete dashboard. Third Eye gives you a working platform out of the box with real data sources. Choose Deck.gl if you're building a custom geospatial product from scratch.

### Verdict

Third Eye is one of the most impressive TypeScript projects I've seen launched in 2026. At two days old with 287 stars, it's clearly struck a nerve — developers want to see how to build real-time, GPU-accelerated geospatial dashboards with the modern web stack, and this project delivers a complete working example. The zero-key startup, 16 real data layers, and built-in RECON toolkit make it more than a tech demo. It's a genuine platform.

The caveats are real though. Two days old means the API will break, the architecture will evolve, and the test coverage is nonexistent. Don't build your production SOC on this today. But if you're a fullstack web developer who wants to understand MapLibre GL, WebGL rendering, viewport-aware data loading, or just wants to see how Next.js 16 App Router handles a complex real-time application, clone this repo and study it. The patterns here — GPU rendering, progressive loading, graceful API degradation — are the patterns you'll need for any data-heavy web application in 2026 and beyond.
