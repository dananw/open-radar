---
name: bigset
description: "BigSet turns plain English into structured datasets from the live web. AI agents research, verify, and auto-refresh your data. Next.js 16 + Fastify + Mastra."
url: https://github.com/tinyfish-io/bigset
stars: 1180
forks: 123
language: TypeScript
tags: ["ai", "data", "web-scraping", "nextjs", "mastra"]
featured: false
publishedAt: 2026-06-08
---

## BigSet

### Overview

BigSet hit 1,100 GitHub stars in three weeks. That kind of velocity usually signals one of two things: either the repo got brigaded by a marketing campaign, or it solves a problem developers actually feel. In this case, it's the latter.

The pitch is dead simple: you type a natural language description of the data you want — "YC companies currently hiring engineers, with their funding stage, location, and number of open roles" — and BigSet infers the schema, sends autonomous agents to research it on the live web, verifies findings against real sources, deduplicates, and hands you a structured dataset. CSV or XLSX. Set a refresh cadence (30 minutes to weekly) and the agents re-run on schedule, keeping the data current.

Built by TinyFish, a company focused on web-access APIs for AI agents, BigSet uses their Search, Fetch, and Browser APIs as the data collection backbone. The orchestration layer runs on Mastra (an AI workflow engine) with Vercel AI SDK and OpenRouter routing to Claude Sonnet for schema inference and Qwen for the populate agents. The frontend is Next.js 16 with React 19 and Tailwind 4. The backend is Fastify. The database is self-hosted Convex. This is a modern fullstack TypeScript application through and through.

### Why it matters

Every fullstack developer has built a scraper at some point. You pick a framework, write selectors, handle pagination, deal with rate limits, set up a cron job, and pray the target site doesn't change its markup. The moment you need data from multiple sources, or data that doesn't map to a single URL pattern, the complexity explodes. You end up stitching together search APIs, extraction pipelines, deduplication logic, and a scheduler — for every dataset, every time.

BigSet eliminates that entire category of work. Instead of building scraping infrastructure, you describe what you want in English and let agents handle the rest. The shift from "point a scraper at a URL" to "describe the data you need" is significant. It's the same abstraction jump that happened when ORMs replaced raw SQL queries, or when serverless replaced managing your own servers. The underlying complexity doesn't disappear — TinyFish's APIs still do the fetching, agents still verify and deduplicate — but you don't deal with it.

For fullstack developers building products that need live web data (competitive intelligence, market research, lead generation, price monitoring), BigSet is the kind of tool that turns a two-week engineering project into a five-minute conversation. That's not hype. The README is honest about the rough edges: dataset generation takes 2-5 minutes, schema inference isn't always perfect, and it works best for topics with publicly available data. But the core idea is sound, and the 1,180 stars in three weeks suggest developers agree.

### Key Features

**Natural Language Schema Inference.** You describe the dataset in plain English, and BigSet figures out the column names, types, and primary keys automatically. This uses Claude Sonnet through OpenRouter, and the results are surprisingly good for common domains. The schema isn't permanent — you can refine it after generation if the AI misinterpreted your intent.

**Autonomous Agent Research Pipeline.** An orchestrator agent discovers entities via web search, then sub-agents fan out in parallel. Each sub-agent investigates a single entity — fetching real pages, extracting structured data, and verifying what it finds against multiple sources. This parallel architecture means a 100-row dataset doesn't take 100x longer than a single-row lookup.

**Scheduled Auto-Refresh.** Set a cadence — 30 minutes, 6 hours, 12 hours, daily, or weekly — and the agents re-run on schedule. This is the feature that separates BigSet from a one-shot scraping tool. Your dataset stays current without manual intervention. For monitoring use cases (competitor pricing, job postings, API status), this is the entire point.

**Self-Hosted Convex Database.** Data lives in a self-hosted Convex instance, not on TinyFish's servers. Convex is a reactive database with real-time subscriptions, so the table view updates live as agents populate rows. You own your data, and you can query it directly if you need to build custom integrations.

**Virtualized Table UI with Export.** The frontend uses TanStack Table with react-window virtualization, so even large datasets render smoothly in the browser. Export to CSV (built-in) or XLSX (via SheetJS, dynamic-imported). The UI also shows per-cell source provenance on the roadmap — click any cell to see where the data came from.

**Mastra Workflow Inspector.** In development, Mastra Studio runs at localhost:4111 and lets you inspect every step of the agent workflow. You can see the schema inference reasoning, the sub-agent research steps, and the verification logic. This transparency is important for debugging and for building trust in the output.

**Self-Healing Makefile Setup.** The `make dev` command handles everything: validates your .env, installs dependencies, starts Docker services, generates Convex admin keys, pushes schema, and streams logs. If something breaks, running `make dev` again recovers automatically. Stale keys are detected and regenerated. Missing dependencies are installed. This is the kind of DX that makes you actually want to contribute to a project.

### Use Cases

- **Competitive intelligence** — Track competitor pricing, feature launches, and hiring patterns across multiple companies. Set a daily refresh and get a living dataset that never goes stale.
- **Market research for product teams** — Describe the market segment you're researching ("Series B fintech startups in Southeast Asia with their product focus and team size") and get a structured starting point instead of hours of manual Googling.
- **Lead generation** — Build prospect lists from public web data without buying expensive B2B data subscriptions. The agents verify each entry against real sources.
- **Developer ecosystem monitoring** — Track which frameworks and tools are gaining adoption, which APIs are deprecating, or which open source projects are actively hiring.
- **AI agent data feeds** — The planned agent-native API will let your AI agents create, query, and consume BigSet datasets programmatically. Build datasets on the fly and feed them to your RAG pipelines.

### Pros and Cons

Pros:
- The abstraction is right. Describing data in English and getting structured output is genuinely faster than writing scrapers for every new data source. The 1,180 stars in three weeks reflect real developer demand.
- Modern fullstack TypeScript architecture with Next.js 16, React 19, Fastify, and self-hosted Convex. The codebase is a solid reference for building AI-powered web applications with current tooling.
- Self-hosted by design. Your data stays in your Convex instance. The agent orchestration runs on your infrastructure. No vendor lock-in on the data layer.
- Honest about limitations. The README explicitly states it's experimental, takes 2-5 minutes per dataset, and works best with public data. That transparency builds trust.

Cons:
- Requires three API keys (TinyFish, OpenRouter, Clerk) to get started. The Clerk dependency feels heavy for a developer tool — auth could be simpler for self-hosted deployments.
- AGPL-3.0 license means you can't use it as a component in proprietary SaaS products without open-sourcing your code. Fine for internal tools and open source projects, but a dealbreaker for some commercial use cases.
- The free tier is limited to 2,500 row operations per month. For serious data collection, you'll need to pay for TinyFish API credits. The cost per dataset is a few dollars in LLM usage, which adds up at scale.
- Schema inference isn't perfect. Complex or ambiguous descriptions may produce unexpected column structures. There's no way to lock a schema and only refresh data — the agents re-infer each time.

### Getting Started

You'll need Docker and Make installed. Then:

```bash
# Clone the repo
git clone https://github.com/tinyfish-io/bigset.git
cd bigset

# Copy the example env and fill in your API keys
cp .env.example .env
# Edit .env with your TINYFISH_API_KEY, OPENROUTER_API_KEY, and Clerk keys

# Start everything
make dev
```

This boots up Postgres, Convex (self-hosted), the Next.js frontend, the Fastify backend, and Mastra Studio. Open http://localhost:3500 to sign in and start building datasets.

To load the 9 curated public datasets (AI companies hiring, GPU prices, model pricing, etc.):

```bash
make seed-public-datasets
```

Other commands: `make down` stops containers (data preserved), `make clean` wipes everything for a fresh start.

### Alternatives

**Apify** — The most mature web scraping platform with pre-built actors for hundreds of sites. Apify is better when you know exactly which site to scrape and need battle-tested selectors. BigSet is better when your data needs span multiple sources or you don't want to write selectors at all.

**Bright Data** — Enterprise-grade web data platform with proxy networks and structured datasets. Bright Data is the choice for large-scale, compliance-heavy data collection with dedicated account management. BigSet is the choice for developers who want self-hosted, programmable data collection without enterprise contracts.

**Crawlee** — An open-source scraping library by the Apify team. Crawlee gives you fine-grained control over crawling logic, browser automation, and data extraction. If you need to handle login flows, complex pagination, or anti-bot measures, Crawlee is the better tool. BigSet handles the simple-but-common case of "I need structured data from public web pages" without writing any crawling code.

### Verdict

BigSet is the most interesting data tool I've seen this year. The core idea — describe data in English, get structured output from the live web — solves a problem that every fullstack developer has faced but few have had time to build proper infrastructure for. The tech stack is modern (Next.js 16, React 19, Fastify, Mastra, self-hosted Convex) and the codebase is clean enough to learn from even if you never use the tool in production. It's experimental, the AGPL license limits some commercial use, and the API key setup is heavier than it should be. But 1,180 stars in three weeks with an honest README and a working demo? That's the signal, not the noise. If you build products that need live web data, spend 20 minutes with BigSet before you write another scraper.
