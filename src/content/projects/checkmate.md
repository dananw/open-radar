---
name: checkmate
description: "Checkmate is an open-source, self-hosted uptime and infrastructure monitoring tool built with React and Node.js — a free alternative to UptimeRobot with 10K+ GitHub stars."
url: https://github.com/bluewave-labs/Checkmate
stars: 10027
forks: 1124
language: TypeScript
tags: ["monitoring", "uptime", "infrastructure", "self-hosted", "devops"]
featured: false
publishedAt: 2026-06-14
---

## Checkmate

### Overview

Checkmate is an open-source, self-hosted uptime and infrastructure monitoring application that crossed 10,000 GitHub stars in mid-2026. It tracks server hardware, uptime, response times, and incidents in real-time with dashboards that actually look good — something most self-hosted monitoring tools get wrong.

The project is built by Bluewave Labs, a small team led by Alex Holliday (ajhollid), who has pushed over 5,800 commits to the repository. That's a level of sustained solo contribution you don't see often in open source monitoring tools. The team also includes Daniel, Gorkem, and several community contributors. The project has been actively developed since April 2024 and shows no signs of slowing down — the last commit was two days ago as of this writing.

The core problem Checkmate solves is the gap between expensive SaaS monitoring (Datadog, New Relic, Pingdom) and the pain of self-hosting alternatives like Uptime Kuma or Netdata. Checkmate aims for the sweet spot: a polished UI with enterprise features (multi-channel alerts, status pages, infrastructure monitoring) that runs on your own hardware with Docker. It's been stress-tested with over 1,000 active monitors on a single instance without performance issues, which puts it in legitimate production territory.

### Why it matters

Every fullstack developer who deploys applications needs monitoring. The SaaS monitoring market is worth over $4 billion, and most of the popular options charge per host or per check, which gets expensive fast when you're running microservices across multiple environments. Self-hosted alternatives exist, but they either look like they were designed in 2012 (Nagios) or require significant setup effort (Prometheus + Grafana).

Checkmate fills the middle ground. It's modern enough that you won't be embarrassed to show the dashboard to non-technical stakeholders, and simple enough that you can have it running in under 10 minutes with Docker. The companion agent, Capture, extends monitoring to server hardware (CPU, RAM, disk, temperature) and runs on anything from a Raspberry Pi to a cloud VM — written in Go, so it's lightweight and cross-platform.

For teams already running React and Node.js stacks, there's an additional benefit: the codebase is readable and extensible. If you need a custom check type or want to integrate with an internal system, you're working in TypeScript — not learning a new configuration language or plugin system.

### Key Features

**Multi-Protocol Monitoring.** Checkmate supports uptime monitoring via HTTP/HTTPS, ICMP ping, TCP port checks, and even game server monitoring. You can also monitor SSL certificate expiration and JSON API responses with custom query paths. This covers the vast majority of what typical web applications need without bolting on additional tools.

**Infrastructure Monitoring via Capture Agent.** The companion Capture agent (written in Go) collects CPU, RAM, disk usage, and temperature data from remote servers. It runs on Linux, Windows, Mac, and Raspberry Pi. You don't need it for basic uptime checks, but it transforms Checkmate from a simple ping tool into a real infrastructure dashboard. The disk monitoring supports selective mountpoint targeting, so you can ignore temporary filesystems and focus on what matters.

**Beautiful Status Pages.** Checkmate includes four built-in status page themes that you can expose publicly. This replaces the need for a separate Statuspage.io subscription. Your users get a clean page showing service health, and you get to customize it without touching CSS. Scheduled maintenance windows are supported too, so you can pre-announce downtime.

**Multi-Channel Alerting.** Notifications go out via email, Slack, Discord, Microsoft Teams, Telegram, PagerDuty, Matrix, Webhooks, Pushover, and Twilio SMS. The threshold system lets you configure how many consecutive failures trigger an alert, which prevents flapping from causing notification fatigue. This is the kind of alerting flexibility you'd normally pay Datadog or PagerDuty for.

**Page Speed Monitoring.** Beyond simple uptime checks, Checkmate tracks page load performance over time. For fullstack developers who care about user experience, this connects infrastructure health to actual frontend performance. If your API response times spike, you'll see it reflected in the page speed metrics alongside the uptime data.

**Incident Management.** When a monitor goes down, Checkmate automatically creates an incident. When it comes back up, the incident resolves. You get a timeline view of all incidents across all monitors, with duration tracking. It's not a full incident management platform, but for small-to-medium teams it replaces the need for a separate tool.

**Multi-Language Support.** The UI supports 16 languages including Arabic, Chinese (Simplified and Traditional), Japanese, Russian, and several European languages. The translations are community-driven, which signals an active and engaged user base beyond the English-speaking developer community.

### Use Cases

- **Solo developers and small teams** who need to monitor a handful of web apps, APIs, and databases without paying $50+/month for SaaS monitoring. Run Checkmate on a $5 VPS and monitor everything else.
- **Agencies managing client infrastructure** — the status pages can be white-labeled for clients, and the multi-tenant architecture (via separate instances) keeps client data isolated.
- **Homelab and self-hosted enthusiasts** who want a polished dashboard for their home servers, Raspberry Pis, and Docker containers. The Capture agent runs on ARM devices natively.
- **Development teams** that need staging and production environment monitoring with Slack/Discord alerts integrated into their existing workflows.
- **Organizations with compliance requirements** that mandate on-premises monitoring — Checkmate's self-hosted model means no data leaves your infrastructure.

### Pros and Cons

Pros:
- Genuinely polished UI that rivals commercial products. The MUI-based frontend looks professional and the Recharts visualizations are clean and responsive.
- Stress-tested with 1,000+ monitors on a single instance, with documented memory usage showing minimal overhead — the Node.js process uses surprisingly little RAM even at scale.
- The Capture agent is written in Go and runs everywhere, including ARM devices. This makes it practical for monitoring heterogeneous infrastructure.
- Active development with nearly 6,000 commits from the lead maintainer, plus a healthy contributor community and 1,100+ forks.

Cons:
- Requires MongoDB and Redis, which adds operational overhead compared to single-binary alternatives like Uptime Kuma (SQLite-based). You're running three services instead of one.
- The project is TypeScript/Node.js, which means you don't get the performance characteristics of Go or Rust-based monitoring tools for very high check frequencies.
- No built-in Grafana-style custom dashboarding. The visualizations are pre-built, which is fine for most use cases but limits customization for teams with specific reporting needs.

### Getting Started

```bash
# Clone the repository
git clone https://github.com/bluewave-labs/checkmate.git
cd checkmate

# Copy the example environment file
cp .env.example .env

# Start with Docker Compose
docker compose up -d

# Access the dashboard at http://localhost:80
# Default credentials: demouser@demo.com / Demouser1! (change immediately)
```

To monitor server hardware, install the Capture agent on your remote servers:

```bash
# Download and run Capture (Go binary, no dependencies)
curl -sL https://raw.githubusercontent.com/bluewave-labs/capture/main/install.sh | bash
```

For production deployments, use the environment variables in `.env` to configure MongoDB credentials, SMTP for email alerts, and notification channel API keys.

### Alternatives

**Uptime Kuma** — The most popular self-hosted monitoring tool with 65K+ stars, written in Node.js with a SQLite backend. Uptime Kuma is simpler to set up (single binary, no MongoDB) and has a larger community. However, its UI is less polished than Checkmate's, and it lacks built-in infrastructure monitoring. Choose Uptime Kuma if you want the simplest possible setup and don't need server hardware metrics.

**Netdata** — Real-time infrastructure monitoring with a focus on granular system metrics. Netdata collects thousands of metrics per second and has a sophisticated dashboard. It's overkill if you just need uptime monitoring, but better if you need deep system-level visibility. Choose Netdata when you need performance profiling rather than uptime tracking.

**Grafana + Prometheus** — The industry standard for infrastructure monitoring and visualization. Far more powerful and flexible than Checkmate, but requires significantly more setup and configuration knowledge. Choose Grafana + Prometheus when you need custom dashboards, complex alerting rules, and plan to scale to thousands of metrics across a large organization.

### Verdict

Checkmate is the monitoring tool I'd recommend to a fullstack developer who wants something better than Uptime Kuma's UI but doesn't want to invest in the Grafana + Prometheus stack. At 10,000 stars with active development and a small but dedicated team, it's hit the sweet spot between "too simple" and "too complex." The Docker setup takes minutes, the status pages are client-ready out of the box, and the Capture agent means you can grow from basic uptime checks to full infrastructure monitoring without switching tools. The main trade-off is MongoDB — if you're allergic to running MongoDB, Uptime Kuma's SQLite approach is simpler. But if you already have MongoDB in your stack (common for NestJS and Node.js teams), Checkmate slots right in.
