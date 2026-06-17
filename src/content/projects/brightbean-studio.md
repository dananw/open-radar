---
name: brightbean-studio
description: "BrightBean Studio is an open-source, self-hostable social media management platform built with Django and HTMX — a free alternative to Buffer and Sendible with no per-seat limits."
url: https://github.com/brightbeanxyz/brightbean-studio
stars: 1827
forks: 367
language: Python
tags: ["django", "social-media", "self-hosted", "htmx", "open-source"]
featured: false
publishedAt: 2026-06-17
---

## BrightBean Studio

### Overview

BrightBean Studio is an open-source, self-hostable social media management platform that crossed 1,800 GitHub stars in under three months. It does what Buffer, Sendible, and SocialPilot charge $100–300/month for — scheduling, publishing, analytics, approval workflows, unified inbox — and gives it away for free with no per-seat, per-channel, or per-workspace limits.

The project is built and maintained primarily by JanSchm, who has pushed 468 commits since the late March 2026 launch. That's an aggressive development pace — roughly 5 commits per day over three months. The codebase is Django 5.x on the backend with HTMX and TailwindCSS on the frontend, which is a deliberate architectural choice that I'll get into below. The project uses AGPL-3.0 licensing, which means you can self-host and modify it freely but can't offer it as a closed-source SaaS.

The core problem BrightBean solves is the absurd pricing model of social media management tools. Most agencies and SMBs managing 10–50 client accounts end up paying $200–500/month across platforms like Buffer ($120/month for 10 channels), Sendible ($99/month for 40 services), or SocialPilot ($50/month for 25 accounts). BrightBean connects to Facebook, Instagram, LinkedIn, TikTok, YouTube, Pinterest, Threads, Bluesky, Google Business Profile, and Mastodon — all through first-party APIs with your own developer credentials. No aggregator middleman, no vendor lock-in.

### Why it matters

The social media management space is dominated by SaaS vendors with aggressive per-seat pricing. If you're an agency managing 15 client accounts across 3 team members, you're looking at $150–400/month minimum on any major platform. BrightBean eliminates that cost entirely. You run it on your own infrastructure — Heroku, Render, Railway, a VPS with Docker, or even locally — and every feature is available to every user from day one.

What makes this technically interesting is the stack choice. Django 5.x with HTMX is not what most developers would pick for a real-time dashboard in 2026. But it works. HTMX handles the interactive parts (drag-and-drop calendar, live inbox updates, Kanban boards) without a JavaScript framework, which means the frontend is lighter, the build process is simpler, and the server-rendered pages are fast out of the box. For Django developers, this is a masterclass in how far you can push the traditional Django template pattern with modern tooling.

The project also represents a broader trend: open-source alternatives to SaaS tools reaching feature parity faster than ever. BrightBean supports 10+ platforms with full publish, comment, DM, and analytics capabilities. That's not a demo — it's a production-ready tool that agencies can deploy today.

### Key Features

**Multi-Workspace Architecture.** BrightBean supports unlimited organizations, each with unlimited workspaces and members. Role-based access control includes Administrator, Editor, Author, Contributor, and a separate Client role for external collaborators. This is critical for agencies managing multiple clients under one roof — each client gets their own workspace with isolated content, analytics, and team permissions.

**Visual Content Calendar.** The calendar interface supports drag-and-drop scheduling with recurring weekly posting slots per account. Named queues auto-assign posts to the next available slot, which is a feature most paid tools reserve for their higher tiers. You can view all workspaces at once or filter by specific accounts, making it practical for teams managing dozens of social profiles.

**First-Party API Integrations.** Every platform integration talks directly to the official APIs using your own developer credentials. There's no aggregator like Publer or SocialBee sitting between you and the platforms. This means full access to platform features (Instagram Reels, LinkedIn Articles, TikTok scheduling) without waiting for a middleman to add support. It also means your data doesn't pass through a third party.

**Approval Workflows.** Configurable approval stages — none, optional, internal, or internal plus client — with threaded comments, reminders, and a full audit trail. The client portal uses passwordless 30-day magic links so external stakeholders can approve or reject posts without creating an account. This alone replaces tools like Planable or Gain that charge separately for approval workflows.

**Unified Social Inbox.** Comments, mentions, DMs, and reviews from every connected platform land in one interface. The inbox includes sentiment analysis, assignment to team members, threaded replies, and historical backfill. Most budget social tools skip the inbox entirely or limit it to a couple of platforms.

**Performance Analytics.** Per-post and channel-level metrics pulled from each platform's native API, with KPI cards, 7/30/90-day trend charts, and a sortable all-posts table covering views, engagement, follower growth, reach, and watch time. No need to bounce between Facebook Insights, Instagram Analytics, and LinkedIn Page Analytics.

**White-Label Support.** Per-workspace branding (logo, colors, custom domain) and workspace defaults for hashtags, first comments, and posting templates. This makes it viable for agencies that want to offer social media management as a branded service.

### Use Cases

- **Digital agencies managing multiple clients** — Each client gets their own workspace with isolated content, team permissions, and approval workflows. No per-client pricing.
- **Small business owners** who need to schedule content across 5–10 platforms without paying $100+/month for a tool they'll use 30 minutes a day.
- **Content teams that need approval workflows** — The client portal with magic-link access means external stakeholders can approve content without accounts or training.
- **Django developers looking for a reference project** — The codebase is a solid example of Django 5.x with HTMX, TailwindCSS, Celery for background tasks, and real-world API integrations.
- **Self-hosting enthusiasts** who want full control over their social media data and credentials without trusting a third-party SaaS.

### Pros and Cons

Pros:
- Completely free with no feature gates, no per-seat limits, and no upsells. Every feature is available to every user, which is genuinely rare in this space.
- Django + HTMX stack is fast, lightweight, and easy to deploy. No Node.js build step, no JavaScript framework overhead. Runs on any platform that supports Python.
- First-party API integrations mean you get full platform features without waiting for a middleman to add support. Your credentials stay on your infrastructure.
- Active development with 468 commits from the primary maintainer in three months and frequent releases addressing community feedback.

Cons:
- AGPL-3.0 licensing means you can't offer this as a closed-source SaaS or embed it in a proprietary product. Fine for self-hosting, limiting for commercial redistribution.
- No mobile app — the web interface works on mobile browsers but isn't optimized for on-the-go social media management. Most competing tools have dedicated iOS/Android apps.
- Self-hosting requires managing your own infrastructure, database backups, and platform API credentials. For non-technical teams, the hosted version at brightbean.xyz is the practical option, but that introduces a dependency on the hosted service's uptime and terms.

### Getting Started

```bash
# Clone the repository
git clone https://github.com/brightbeanxyz/brightbean-studio.git
cd brightbean-studio

# Run with Docker (recommended)
cp .env.example .env
# Edit .env with your database and platform API credentials
docker compose up -d

# Or run locally with Python 3.12+
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Open http://localhost:8000 and follow the onboarding wizard to connect your social media accounts. Each platform requires creating a developer app and providing API keys — the setup wizard walks you through each one.

For one-click deployment, use the Heroku, Render, or Railway buttons in the repository.

### Alternatives

**Buffer** — The most recognizable name in social media scheduling. Buffer's free tier is limited to 3 channels with basic scheduling. The Essentials plan starts at $6/month per channel, which adds up fast for agencies. Buffer has better mobile apps and a cleaner onboarding experience, but lacks BrightBean's approval workflows, unified inbox, and multi-workspace support at comparable pricing.

**Postiz** — Another open-source social media management tool with a modern React/Next.js frontend. Postiz has a slicker UI and supports AI-generated content, but has fewer platform integrations (7 vs. BrightBean's 10+) and its self-hosted deployment is more complex. Choose Postiz if you prefer a React-based stack and want AI content generation built in.

**SocialPilot** — A mid-range SaaS option starting at $30/month for 10 accounts. SocialPilot has better team collaboration features and a content curation engine, but charges per workspace and has no self-hosting option. Choose SocialPilot if you want a managed SaaS with phone support and don't want to deal with infrastructure.

### Verdict

BrightBean Studio is the most complete open-source social media management platform I've seen. The Django + HTMX stack is a bold choice that pays off — it's fast to deploy, easy to maintain, and doesn't require a JavaScript build pipeline. The feature set (10+ platform integrations, approval workflows, unified inbox, analytics, white-labeling) rivals tools charging $100–300/month. The AGPL license and self-hosting requirement mean it's best suited for technical teams and agencies with DevOps capacity, but the free hosted version at brightbean.xyz removes that barrier for everyone else. With 1,800+ stars and a single maintainer pushing 5 commits per day, this project has real momentum. If you're a Django developer tired of paying for social media tools, this is worth deploying this week.
