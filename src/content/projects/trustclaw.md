---
name: trustclaw
description: "TrustClaw is a self-hostable personal AI agent with 1000+ OAuth tool integrations, vector memory, and sandboxed execution — built on Next.js 15."
url: https://github.com/ComposioHQ/trustclaw
stars: 786
forks: 184
language: TypeScript
tags: ["ai-agent", "nextjs", "self-hosted", "oauth", "automation"]
featured: false
publishedAt: 2026-06-05
---

## TrustClaw

### Overview

TrustClaw is a self-hostable personal AI agent that connects to 1,000+ services through OAuth, runs every action in a sandboxed cloud environment, and remembers conversations long-term with pgvector-backed memory. It crossed 700 GitHub stars within a month of its May 2026 open-source release, which tracks — developers have been looking for a secure, production-ready way to run AI agents that actually do things, not just chat.

The project comes from Composio, the company behind the popular tool integration SDK that lets AI agents interact with Gmail, GitHub, Slack, Notion, Linear, Stripe, and hundreds of other services. Composio's SDK has been used by thousands of developers to add tool-use capabilities to their AI applications. TrustClaw is their opinionated reference implementation — a full-stack Next.js app that shows how to wire up agent orchestration, memory, scheduling, and tool integrations into something you can actually deploy and use daily.

The core problem it solves: running AI agents locally is a security nightmare. Your API keys sit in plaintext config files. The agent has shell access to your machine. A prompt injection hidden in a scraped email could theoretically run `rm -rf /`. TrustClaw flips this model — credentials are managed through Composio's OAuth broker, code execution happens in ephemeral remote sandboxes, and the agent never has direct access to your local filesystem. Every action is logged and revocable with one click.

### Why it matters

The AI agent space is crowded with demos and prototypes, but very few projects ship with a security model that holds up in production. Most open-source agents store API keys in `.env` files and give the LLM unrestricted shell access. That's fine for a weekend hack, but it's a non-starter for anyone who wants to connect an agent to their actual work tools — email, calendar, code repos, payment systems.

TrustClaw represents a shift toward "infrastructure-grade" agents. The Composio integration means you're not manually wiring up API keys for each service. Users authenticate through OAuth flows they already trust. The sandboxed execution model means a compromised agent prompt can't touch your infrastructure. And the 3-layer context management (pruning, memory flush, summarization compaction) means conversations can run indefinitely without blowing through token limits.

For fullstack developers specifically, TrustClaw is interesting as a reference architecture. It demonstrates how to build a production AI agent with Next.js 15 App Router, tRPC, Prisma with pgvector, Vercel AI SDK, and shadcn/ui — a stack that a huge chunk of the web dev community is already using. If you're building any kind of AI-powered product, studying how TrustClaw handles memory, tool orchestration, and multi-channel interfaces (web + Telegram) is worth the time.

### Key Features

**1,000+ OAuth Tool Integrations.** TrustClaw connects to Gmail, GitHub, Slack, Notion, Linear, Google Calendar, Google Drive, Stripe, HubSpot, and hundreds more services through Composio's SDK. Each integration is gated by the user's connected accounts — the agent can only access services the user has explicitly authorized through OAuth. No raw API keys are ever handed to the agent.

**Sandboxed Cloud Execution.** Every tool call and code execution runs in an isolated remote environment that's destroyed when the task completes. This means the agent can't access your local filesystem, can't persist malware, and can't escalate privileges beyond what the sandbox allows. The README makes the comparison explicit: vanilla local agents give the LLM a shell on your machine, TrustClaw doesn't.

**3-Layer Context Management.** Long-running conversations don't hit token walls. TrustClaw implements pruning (dropping low-relevance turns), memory flush (moving older context to vector storage), and summarization compaction (condensing conversation history into summaries). This lets the agent maintain coherent context across days or weeks of interaction without burning through your LLM budget.

**Postgres + pgvector Long-Term Memory.** Conversations and facts are stored in PostgreSQL with pgvector extensions for semantic search. The agent can recall relevant context from past interactions without loading the entire conversation history. This is the same memory pattern used by production AI products like ChatGPT's memory feature, but open source and self-hosted.

**Cron-Scheduled Agent Runs.** TrustClaw supports recurring tasks through cron scheduling. Set up a daily digest of your GitHub notifications, a weekly summary of Slack channels, or an hourly check on Stripe payments. The agent runs on schedule, executes the task using connected tools, and delivers results to web or Telegram.

**Multi-Channel Interface.** Chat through a Next.js web dashboard or a Telegram bot. Both interfaces share the same agent runtime, memory, and tool integrations. The Telegram integration is particularly useful for quick interactions — send a message, get a result, without opening a browser tab.

**One-Command Vercel Deployment.** The CLI handles the entire deployment flow: `npx @composio/trustclaw deploy`. It provisions the Vercel project, sets up Neon Postgres, configures Upstash Redis, and wires environment variables. LLM and embedding calls route through Vercel AI Gateway — no Anthropic or OpenAI API keys required for the default setup.

### Use Cases

- **Personal productivity automation** — Connect your Gmail, Calendar, and Notion to get daily briefings, auto-sort emails, and manage tasks through natural language. The agent runs scheduled checks and surfaces what matters.
- **Developer workflow assistant** — Link GitHub, Linear, and Slack to automate issue triage, PR reviews notifications, and sprint updates. The sandboxed execution means you can safely let the agent interact with your repos.
- **Multi-service data aggregation** — Pull data from Stripe, HubSpot, and Google Analytics into unified reports. The 1,000+ integrations mean you're not limited to a single ecosystem.
- **Telegram-based quick actions** — Fire off tasks from your phone: "Summarize today's GitHub PRs", "What's on my calendar tomorrow?", "Create a Notion page with these meeting notes". Results delivered back to the same chat.
- **AI agent development reference** — Study the architecture as a template for building your own agent products. The Next.js 15 + tRPC + Prisma + pgvector stack is directly applicable to many production AI applications.

### Pros and Cons

Pros:
- Security-first design with OAuth-only credentials and sandboxed execution eliminates the biggest risk of running AI agents — compromised local machines and leaked API keys.
- The Composio integration provides genuine breadth: 1,000+ services without manual API key management. Each integration uses OAuth flows users already understand.
- Production-ready architecture with rate limiting, audit trails, per-user caps, and one-click credential revocation. This isn't a demo — it's built to handle real users.
- The tech stack (Next.js 15, tRPC, Prisma, pgvector, shadcn/ui) is familiar to a huge portion of the web development community, making it easy to customize and extend.

Cons:
- Tightly coupled to the Composio ecosystem. You need a Composio API key for tool integrations, and while it's free to start, the long-term pricing model could limit adoption for cost-sensitive projects.
- Vercel Hobby plan restrictions mean cron jobs only run daily and functions cap at 300 seconds. Serious automation requires Vercel Pro ($20/month), which adds to the total cost of self-hosting.
- The 786-star community is still small compared to alternatives like Open Interpreter or AutoGPT. Fewer community-contributed integrations, tutorials, and troubleshooting resources available.

### Getting Started

```bash
# Deploy to Vercel in one command
npx @composio/trustclaw deploy

# Or run locally
git clone https://github.com/ComposioHQ/trustclaw.git
cd trustclaw
pnpm install
cp .env.example .env       # fill in DATABASE_URL, BETTER_AUTH_SECRET, COMPOSIO_API_KEY
pnpm prisma db push        # apply schema (Postgres + pgvector required)
pnpm dev                   # http://localhost:3000
```

Get a free Composio API key at [dashboard.composio.dev](https://dashboard.composio.dev/login?flow=developer). For local development, run `vercel link && vercel env pull` to get AI Gateway access, or set `AI_GATEWAY_API_KEY` manually.

For Telegram integration, point your bot's webhook at `<NEXT_PUBLIC_APP_URL>/api/telegram-webhook` with `TELEGRAM_WEBHOOK_SECRET` as the secret token.

### Alternatives

**Open Interpreter** — A more established open-source AI agent (50K+ stars) that runs code locally on your machine. Open Interpreter is better for developers who want unrestricted local execution and don't mind the security trade-offs. TrustClaw is the better choice when you need sandboxed execution and OAuth-gated tool access.

**AutoGPT** — One of the original autonomous AI agent projects with a massive community. AutoGPT is more flexible in its agent architecture but lacks TrustClaw's security model and managed tool integrations. Better for experimentation; TrustClaw is better for production use cases where credentials and execution safety matter.

**n8n** — A workflow automation platform with AI agent capabilities and 400+ integrations. n8n has a visual workflow builder and a larger community, but its agent capabilities are less sophisticated than TrustClaw's memory and context management. Better for teams that prefer visual automation over conversational agents.

### Verdict

TrustClaw is the most practical open-source AI agent I've seen for developers who actually want to use their agent daily, not just demo it. The security model — OAuth-only, sandboxed execution, no local shell access — addresses the elephant in the room that most agent projects ignore. The Composio integration provides real breadth without the weeks of API key wrangling that plague other solutions. At 786 stars it's still early, but the architecture is solid and the team behind it (Composio) has been building AI tool infrastructure for years. If you're a fullstack developer comfortable with Next.js and you want a personal AI agent that can safely interact with your work tools, TrustClaw is worth deploying this weekend.
