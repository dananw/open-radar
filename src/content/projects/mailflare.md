---
name: mailflare
description: "Self-hosted, AI-powered email client with custom domains built entirely on Cloudflare Workers — run your own inbox without a mail server."
url: https://github.com/hieunc229/mailflare
stars: 250
forks: 39
language: TypeScript
tags: ["email", "cloudflare-workers", "self-hosted", "ai-agent", "typescript"]
featured: false
publishedAt: 2026-06-05
---

## Mailflare

### Overview

Mailflare is a self-hosted email client that runs entirely on Cloudflare Workers. No Postfix, no Dovecot, no VPS — just a Worker, a D1 database, and Cloudflare's Email Routing API. It hit 250 GitHub stars within its first week of launch in late May 2026, which is a solid signal for a niche infrastructure tool.

The project is built by Hieu Nguyen (hieunc229), a developer with 68 public repositories who's clearly been deep in the Cloudflare ecosystem for a while. The repo has 39 forks already, suggesting people are actively experimenting with it, not just bookmarking.

The core problem Mailflare solves is deceptively simple: getting a working email inbox with your own custom domain without running mail infrastructure. If you've ever set up Postfix and spent hours debugging SPF records and DKIM keys, you know the pain. Cloudflare Email Routing handles the hard parts — receiving mail, DNS configuration, sending via subdomains — and Mailflare gives you a clean UI on top of it. The AI agent roadmap is what pushes it from "useful utility" to "something worth watching."

### Why it matters

Email is the one protocol that hasn't been meaningfully disrupted by the serverless movement. You can deploy a full-stack app to Cloudflare Workers in 30 seconds, but setting up a custom email address on your domain still usually means paying for Google Workspace or ProtonMail, or running your own mail server (which is a rite of passage most developers regret). Mailflare occupies the middle ground: self-hosted control with zero infrastructure overhead.

The timing connects to two broader trends. First, Cloudflare's Email Routing API has matured to the point where programmatic email management is actually viable. Second, AI agents are increasingly expected to handle communication tasks — triage, draft replies, follow-up reminders. Mailflare's roadmap explicitly plans for this with an agent task queue, human-approved actions, and thread memory. That's not a gimmick; it's where email clients need to go.

For fullstack developers already in the Cloudflare ecosystem (Workers, D1, R2, Pages), Mailflare is a natural extension. You're already paying for the infrastructure. Adding an email inbox to your existing Worker deployment is almost free.

### Key Features

**Cloudflare-Native Architecture.** Mailflare runs as a Cloudflare Worker with D1 for storage and R2 for attachments (planned). There's no separate server to manage, no Docker containers, no systemd services. The entire stack is defined in `wrangler.jsonc` and deploys with `npm run deploy` or a one-click button. This is the most operationally simple email setup I've seen.

**Domain Management via API.** When you add a domain, Mailflare calls Cloudflare's API to configure Email Routing DNS records, MX records, SPF, and DKIM automatically. When you remove a domain, it cleans up the routing rules and sending subdomain resources. No manual DNS editing. The API supports both scoped tokens (recommended) and legacy Global API Keys.

**Mailbox Creation with Auto-Routing.** Create a mailbox and Mailflare automatically provisions a Cloudflare Email Routing rule that sends mail for that address to the Worker. The inbox supports sent, drafts, spam, and trash folders with a shared mail list component. Search and filtering are built in.

**One-Click Deploy.** The repo includes a "Deploy to Cloudflare" button that reads `wrangler.jsonc`, provisions Worker bindings, prompts for environment variables, runs D1 migrations, and deploys. For teams already using Cloudflare, this eliminates the setup friction that kills most self-hosted email projects.

**AI Agent Roadmap.** The planned email agent includes message intelligence (summaries, intent classification, urgency scoring), an agent task queue for proposed actions, human-approved workflows for drafts and forwarding, and thread memory for context-aware responses. This is the most forward-looking part of the project — an email client designed from the start to be AI-native rather than bolting AI on later.

**Programmatic API.** Every domain and mailbox operation has a corresponding REST endpoint. `GET/POST /api/domains` for listing and adding, `GET/DELETE /api/domains/[id]` for management. This makes it straightforward to integrate Mailflare into existing workflows or build automation on top of it.

### Use Cases

- **Developer email on custom domains** — Get `you@yourdomain.com` running in minutes without paying for Google Workspace or configuring a mail server. Perfect for side projects, portfolios, and personal domains.
- **SaaS notification infrastructure** — Use Mailflare's API to programmatically manage inbound support emails, route them to the right team, and track responses.
- **AI-assisted email triage** — Once the agent features ship, use Mailflare to auto-classify incoming mail, draft responses, and surface urgent messages — all running on your own Cloudflare infrastructure.
- **Multi-domain management** — Manage email for multiple domains from a single dashboard. Each domain gets its own routing rules, mailboxes, and DNS configuration handled automatically.

### Pros and Cons

Pros:
- Zero infrastructure overhead — runs entirely on Cloudflare Workers with D1. No servers to patch, no mail daemons to restart, no SSL certs to renew.
- The Cloudflare Email Routing API handles the hard parts of email (DNS, MX, SPF, DKIM) that cause most self-hosted email projects to fail.
- One-click deploy makes it accessible to developers who aren't Cloudflare experts. The API-first design means everything is scriptable.
- The AI agent roadmap is thoughtfully designed — not just "add ChatGPT" but a proper task queue with human-in-the-loop approval.

Cons:
- 250 stars and a single contributor (12 commits) means this is early-stage software. Production use requires tolerance for breaking changes and incomplete features.
- Cloudflare Email Routing has limitations — it only works with domains on Cloudflare's DNS, and outbound sending requires the Email Service binding or subdomain sending setup.
- No attachment support yet, and the compose experience is basic. This isn't replacing Gmail or Outlook for heavy email users today.
- The AI agent features are roadmap items, not shipped functionality. The "AI-powered" branding is forward-looking, not current.

### Getting Started

```bash
# Clone the repository
git clone https://github.com/hieunc229/mailflare.git
cd mailflare

# Set up environment variables
cp .dev.vars.example .dev.vars
# Add your CF_TOKEN (scoped Cloudflare API token)
# Optional: CF_ACCOUNT_ID, CF_API_KEY, CF_EMAIL for legacy auth

# Install dependencies and run migrations
npm install
npm run db:migrate:local

# Start the dev server
npm run dev
```

Open `http://localhost:3000`, register an account, and complete the onboarding flow. You can seed demo data for testing:

```bash
curl -X POST http://localhost:3000/api/seed
```

For production, use the one-click deploy button in the repo or run `npm run deploy` with Wrangler configured.

### Alternatives

**Mail-in-a-Box** — The classic self-hosted email solution that gives you a full mail server (Postfix, Dovecot, Roundcube) with one command. More complete than Mailflare (calendar, contacts, full IMAP support) but requires a VPS and significant maintenance overhead. Choose Mail-in-a-Box if you need a traditional mail server with IMAP/POP3 access and don't mind managing infrastructure.

**Cloudflare Email Routing (standalone)** — You can use Cloudflare's Email Routing without Mailflare to forward domain emails to Gmail or another provider. Zero UI, zero self-hosting, but also zero control over the inbox experience. Choose the standalone routing if you just need `hello@yourdomain.com` forwarding to your Gmail and don't need a dedicated inbox.

**Postal** — An open-source mail server written in Ruby that's more mature and feature-complete than Mailflare. It handles both inbound and outbound mail, has a web UI, and supports multiple organizations. But it requires a VPS, Ruby runtime, and MySQL database. Choose Postal if you need a production-grade self-hosted mail server with full SMTP capabilities.

### Verdict

Mailflare is the kind of project that makes you wonder why nobody built it before. The idea of running an email client on Cloudflare Workers is obvious in hindsight — Cloudflare already handles the hard DNS and routing parts, so why not put a UI on top? At 250 stars with a single contributor, it's clearly early. The core features work (inbox, send, receive, domain management), but the AI agent features that make it truly interesting are still on the roadmap. If you're a developer who already runs your sites on Cloudflare and wants a lightweight email setup for your custom domains, Mailflare is worth trying today. If you need a production email client with attachments and AI triage, bookmark it and check back in a few months. The architecture is right; it just needs time to mature.
