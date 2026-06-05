---
name: agentic-inbox
description: "Self-hosted email client with a built-in AI agent, running entirely on Cloudflare Workers with React 19 and Durable Objects"
url: https://github.com/cloudflare/agentic-inbox
stars: 3952
forks: 517
language: TypeScript
tags: ["ai-agent", "email", "cloudflare", "serverless", "react"]
featured: false
publishedAt: 2026-06-05
---

## Agentic Inbox

### Overview

Agentic Inbox is an open-source email client that pairs a modern React interface with an AI agent capable of reading, searching, drafting, and sending emails on your behalf. Built by Cloudflare and released under the Apache 2.0 license, it runs entirely on Cloudflare Workers — no separate backend server, no Docker containers, no VPS to manage. Since its launch in April 2026, the project has gathered nearly 4,000 stars and over 500 forks, signaling strong developer interest in the "AI agent + email" combination.

The architecture is worth understanding because it's unusual. Each mailbox gets its own Durable Object — a stateful compute primitive on Cloudflare's edge — backed by a SQLite database. Attachments land in R2, Cloudflare's object storage. The AI agent side panel uses the Cloudflare Agents SDK and Workers AI to process requests locally on the edge, meaning your email data never leaves Cloudflare's infrastructure. This isn't a wrapper around Gmail's API with an LLM bolted on top. It's a full email system built from the ground up with agent-first principles.

The core problem it solves is straightforward: email is still the backbone of professional communication, but managing it is tedious. Most AI email tools are either SaaS products that read all your mail (privacy concern) or browser extensions with limited capability. Agentic Inbox gives you a self-hosted alternative where the AI agent can auto-draft replies to incoming messages, search across conversations, and handle multi-step email workflows — all while you maintain full control of the data.

### Why it matters

The broader trend here is the shift from "AI as a feature" to "AI as an agent that operates tools." Cloudflare has been pushing hard into this space with its Agents SDK, and Agentic Inbox is the reference implementation that shows how to build a production-grade agent application on the Workers platform. If you're a fullstack developer working with serverless architectures, this project is essentially a masterclass in modern edge-first application design.

For teams already running on Cloudflare, this is also a practical tool. Spin up a support@ or hello@ inbox with an AI agent that drafts responses, and you've got a lightweight customer support system without paying per-seat pricing for helpdesk software. The fact that it uses Workers AI (currently with Kimi K2.5 as the default model) means inference costs are bundled into your existing Cloudflare usage — no separate API keys or provider accounts needed.

### Key Features

**Full email client with rich text composer.** This isn't a read-only viewer. You get a proper compose experience powered by TipTap, with reply and forward threading, folder organization, search, and attachment support. The UI is built with React 19 and styled with Tailwind CSS, using Zustand for state management. It feels like a real email client, not a demo project.

**Per-mailbox isolation via Durable Objects.** Every mailbox runs in its own Durable Object instance with dedicated SQLite storage. This means mailbox data is physically isolated at the infrastructure level — one mailbox can't accidentally read another's data. It also simplifies the mental model: each mailbox is essentially its own microservice.

**Built-in AI agent with 9 email tools.** The agent panel on the right side of the UI exposes nine tools for reading inbox contents, searching conversations, drafting replies, and sending emails. The agent uses streaming markdown responses with tool call visibility, so you can see exactly what it's doing at each step. It's built on the Cloudflare Agents SDK's `AIChatAgent` class.

**Auto-draft on new email.** When a new email arrives, the agent automatically reads it and generates a draft reply. Critically, it never sends without explicit user confirmation — a sensible default that prevents embarrassing AI-generated emails from going out unchecked. The draft sits waiting for your review, which you can accept, edit, or discard.

**Configurable system prompts per mailbox.** Each mailbox can have its own custom system prompt, letting you tune the agent's behavior for different contexts. A support inbox might have a prompt focused on polite, solution-oriented replies, while a sales inbox could emphasize product knowledge and pricing. The prompts and chat history persist across sessions.

**MCP server integration.** Agentic Inbox exposes an MCP (Model Context Protocol) server at `/mcp`, meaning external AI tools like Claude Code, Cursor, or any MCP-compatible client can connect and operate on your mailboxes. This turns your email into a tool that other agents can use, which is a powerful pattern for building multi-agent workflows.

**One-click Cloudflare deployment.** The project includes a "Deploy to Cloudflare" button that automatically provisions all the required infrastructure — R2 bucket, Durable Objects, Workers AI bindings. The setup isn't zero-config (you still need to configure Email Routing and Access), but it eliminates the most error-prone parts of infrastructure provisioning.

### Use Cases

- **Solo developer or small team support inbox** — Set up a support@yourdomain.com with an AI agent that drafts contextual replies to common questions, letting you review and send instead of typing from scratch each time
- **Privacy-conscious email management** — Run your own email client on infrastructure you control, with AI features that don't require sending your email data to a third-party SaaS provider
- **Multi-agent workflow orchestration** — Connect the MCP server to Claude Code or other agent tools, enabling workflows where an AI agent reads incoming requests, processes them, and drafts responses automatically
- **Developer portfolio or side project showcase** — The architecture (Durable Objects + Workers AI + React) is a solid template for building other agent-powered applications on Cloudflare's stack
- **Internal tooling for startups** — Replace expensive per-seat email tools with a self-hosted alternative that adds AI capabilities without recurring SaaS costs

### Pros and Cons

Pros:
- **True self-hosting on serverless infrastructure.** You own the data, and it runs on Cloudflare's edge network with no traditional server to maintain. The Durable Object architecture means stateful operations work reliably without external databases.
- **Production-quality codebase.** This isn't a weekend hackathon project. The stack (React 19, Hono, Durable Objects, R2, Workers AI, Zustand, TipTap) is well-chosen and the architecture diagram shows thoughtful design with clear separation of concerns.
- **Apache 2.0 license.** Fully open source with a permissive license, so you can fork it, modify it, and deploy it commercially without restrictions.

Cons:
- **Tightly coupled to Cloudflare.** If you're not on Cloudflare, this project is essentially useless to you. There's no abstraction layer for swapping in AWS Lambda or another provider. The Durable Objects, R2, Workers AI, and Email Routing dependencies are all Cloudflare-specific.
- **No per-mailbox authorization.** Anyone who passes the Cloudflare Access policy can access all mailboxes. The Access policy is the single trust boundary, which might not work for teams where different people should only see certain inboxes.
- **Setup complexity beyond the deploy button.** While the deploy button handles provisioning, you still need to configure Email Routing, Email Service, Cloudflare Access, and set specific Worker secrets. The troubleshooting section in the README suggests this trips up many users.

### Getting Started

```bash
# Clone the repo
git clone https://github.com/cloudflare/agentic-inbox.git
cd agentic-inbox

# Install dependencies
npm install

# Run locally for development
npm run dev

# When ready to deploy
npm run deploy
```

After deploying, you'll need to:
1. Configure Cloudflare Access on your Worker (Settings > Domains & Routes)
2. Set up Email Routing catch-all rule for your domain
3. Enable Email Service for outbound sending
4. Create your first mailbox through the web UI

### Alternatives

**Zed Email / Superhuman** — If you just want a fast email client with AI features and don't care about self-hosting, Superhuman remains the polished option. But it's a SaaS product with per-seat pricing and you're trusting them with all your email data. Choose it over Agentic Inbox when you want a turnkey experience without infrastructure management.

**N8N + Email triggers** — For teams that want AI-powered email handling as part of a larger automation workflow, N8N with email triggers and LLM nodes gives you more flexibility. It's not a dedicated email client, but it handles the "receive email, process with AI, respond" pattern well. Choose it when email is just one piece of a broader automation pipeline.

**Gmail API + LangChain** — The traditional approach: connect to Gmail's API, process emails with a LangChain agent, and build a custom UI. You get more model flexibility (any LLM, not just Workers AI models) and you're not locked to Cloudflare. Choose this when you need Gmail-specific features or want to use a specific model provider that Workers AI doesn't support.

### Verdict

Agentic Inbox is the most compelling email-meets-AI project I've seen this year, and it's not because of the AI features alone — it's because of the architecture. The combination of Durable Objects for per-mailbox isolation, Workers AI for edge inference, and MCP for external agent integration creates a pattern that goes beyond email. It's a blueprint for building agent-powered applications on Cloudflare's stack. If you're already on Cloudflare and want to understand how to build with the Agents SDK, this is the project to study. If you're looking for a self-hosted email client with real AI capabilities (not just a "summarize this thread" gimmick), this delivers. The 4,000-star growth in under two months suggests the community agrees. The main tradeoff is vendor lock-in — you're building on Cloudflare primitives that don't port elsewhere. But for teams comfortable with that bet, Agentic Inbox is production-ready today, not a proof of concept you'll need to rewrite in six months.
