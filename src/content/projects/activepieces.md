---
name: activepieces
description: "Open-source TypeScript workflow automation with 280+ integrations, native MCP server support, and AI agent capabilities. Self-hostable Zapier alternative."
url: https://github.com/activepieces/activepieces
stars: 22704
forks: 3788
language: TypeScript
tags: ["workflow-automation", "ai-agents", "mcp", "typescript", "no-code", "self-hosted"]
featured: false
publishedAt: 2026-06-11
---

## Activepieces

### Overview

Activepieces is an open-source workflow automation platform that positions itself as a self-hosted alternative to Zapier and n8n, but with a twist that makes it particularly interesting in 2026: native MCP (Model Context Protocol) server support. Every one of its 280+ integrations — called "pieces" — automatically becomes an MCP server you can plug into Claude Desktop, Cursor, Windsurf, or any MCP-compatible AI agent. That means your existing automation workflows double as tool endpoints for AI agents without writing a single adapter.

The project started in late 2022 and has grown to 22,700+ GitHub stars with nearly 3,800 forks. The core team is distributed but maintains a strong engineering culture — the repository shows consistent weekly commits and a healthy contributor pipeline. What's notable is that roughly 60% of the piece integrations are community-contributed, which speaks to the framework's developer experience. When people voluntarily build and maintain integrations for your platform, you're doing something right with the abstraction layer.

The architecture is built on a type-safe TypeScript pieces framework. Each piece is an npm package with a defined interface for triggers and actions. The platform runs on Node.js with a PostgreSQL backend, and the whole stack is dockerized for one-command deployment. The visual flow builder supports loops, branches, conditional logic, error handling with auto-retries, and HTTP requests — everything you'd expect from a modern workflow tool, plus some AI-specific capabilities like built-in "Ask AI" blocks that let non-technical users clean data or make decisions without writing code.

### Why it matters

The workflow automation space is crowded. Zapier dominates the SaaS market, n8n owns the self-hosted developer niche, and Make (formerly Integromat) sits somewhere in between. So why does Activepieces deserve attention? Two reasons.

First, the MCP angle. We're watching AI agents become first-class consumers of APIs, and the Model Context Protocol is quickly becoming the standard way agents discover and invoke tools. Activepieces saw this shift early and built MCP support natively — not as an afterthought or plugin, but as a core architectural feature. Every piece you install automatically registers as an MCP server. For teams building AI agent workflows, this eliminates the tedious work of writing individual MCP tool definitions for every service your agent needs to talk to. Install the Slack piece, and your agent can send messages. Install the GitHub piece, and it can create issues. No glue code.

Second, the developer experience for building pieces is genuinely good. Pieces are TypeScript packages with hot reloading, full type safety, and a clean API. The documentation is thorough, and the community contribution model means you're rarely the first person to need a particular integration. For fullstack developers working with React frontends, NestJS backends, or any TypeScript-heavy stack, the barrier to extending Activepieces is essentially zero — it's the same language, the same tooling, the same npm workflow you already use.

### Key Features

**Type-Safe Pieces Framework.** Every integration is a TypeScript npm package with fully typed inputs, outputs, and configuration schemas. This isn't just a nice-to-have — it means your IDE autocompletes every parameter, catches errors at build time, and the visual builder can render accurate forms for each action because the types are available at runtime. Pieces support custom UI components for complex configurations, and the framework handles authentication flows (OAuth2, API keys, basic auth) with built-in helpers.

**Native MCP Server Generation.** This is the feature that separates Activepieces from every other automation tool in 2026. Each installed piece automatically becomes an MCP-compatible tool server. Point Claude Desktop, Cursor, or any MCP client at your Activepieces instance and the agent sees all available tools with their schemas, descriptions, and parameter types. No manual tool definitions, no wrapper code, no schema duplication. The piece author writes the integration once, and it works in both the visual builder and as an AI agent tool.

**Visual Flow Builder with AI Blocks.** The drag-and-drop builder supports loops, branches, conditional logic, error handling with configurable retry policies, and HTTP request steps. The AI integration goes beyond simple "call OpenAI" blocks — there's an "Ask AI" feature that lets non-technical users describe what they want in natural language, and the builder generates the transformation logic. For developers, there's a Code step that runs arbitrary TypeScript with access to npm packages, so you're never boxed in by the visual interface.

**Self-Hosted with Full Data Control.** Docker Compose deployment takes about two minutes. Your data stays on your infrastructure — no SaaS dependency, no data leaving your network. For enterprises, this is often the deciding factor. The platform supports workspace-level isolation, so different teams can have separate automation environments with independent piece configurations and flow ownership.

**Human-in-the-Loop Workflows.** Activepieces has built-in pieces for delaying execution and requiring human approval before proceeding. This turns workflows from fully automated pipelines into human-augmented ones where sensitive steps — deploying to production, sending customer-facing emails, approving large purchases — require explicit sign-off. The approval interface is web-based and works on mobile.

**280+ Community and Official Integrations.** The piece ecosystem covers the major services you'd expect — Slack, GitHub, Google Workspace, Stripe, PostgreSQL, Airtable, Notion, and hundreds more. The key insight is that 60% of these are community contributions, which means the ecosystem grows faster than any single company could build. Pieces are versioned independently and published to npm, so you can pin specific versions or use the latest.

**Open Source with Commercial Cloud Option.** The core platform is MIT-licensed and fully functional for self-hosting. Activepieces also offers a cloud version at activepieces.com for teams that don't want to manage infrastructure. The cloud tier adds features like managed authentication, higher execution limits, and priority support, but you can run the open-source version in production without hitting artificial limits.

### Use Cases

- **AI agent tool orchestration** — Connect your AI coding agent or chatbot to 280+ services through MCP without writing individual tool adapters. Your Claude Desktop agent can create Jira tickets, send Slack messages, and update Google Sheets through a single Activepieces instance.

- **Internal ops automation for startups** — Replace manual processes like "when someone submits the Typeform, add them to the CRM, send a welcome email, and create a Notion page" with a visual flow that anyone on the team can modify. No engineering time required for changes.

- **Data pipeline orchestration** — Pull data from multiple APIs, transform it with TypeScript code blocks, and push results to your database or data warehouse. The retry and error handling logic is built in, so you don't have to write boilerplate around transient failures.

- **Customer-facing workflow automation** — Build approval workflows for customer requests, order processing, or support ticket routing. The human-in-the-loop pieces let you add review steps where needed without building a custom approval UI.

- **Developer productivity tooling** — Automate your team's repetitive tasks: auto-label PRs based on file changes, post deployment summaries to Slack, sync documentation between Notion and your repo, or generate changelogs from merged PRs.

### Pros and Cons

Pros:
- The MCP integration is genuinely ahead of the competition. While n8n and Zapier are still figuring out how to expose their workflows to AI agents, Activepieces pieces work as MCP servers out of the box. If you're building AI agent tooling, this is a significant time saver.
- TypeScript pieces with hot reloading make the developer experience smooth. You can iterate on custom integrations locally, test them in the visual builder, and publish to npm — all without restarting the platform.
- Self-hosting is straightforward and the MIT license means no feature gating on the core platform. You get the full workflow engine, all builder features, and unlimited flows without paying for a cloud plan.

Cons:
- The ecosystem, while growing fast, still has gaps compared to Zapier's 7,000+ integrations. You'll occasionally need to build custom pieces for niche services, though the TypeScript framework makes this relatively painless.
- The visual builder, while capable, can feel sluggish with very large flows (50+ steps). The team has been optimizing this, but complex workflows may require splitting into sub-flows for a smooth editing experience.
- Documentation for advanced piece development — custom UI components, complex authentication flows, and webhook handling — could be more comprehensive. The basics are well-covered, but edge cases sometimes require reading the source code of existing pieces.

### Getting Started

```bash
# Clone and start with Docker Compose
git clone https://github.com/activepieces/activepieces.git
cd activepieces
docker compose up -d

# Access the builder at http://localhost:8080
# Create your first flow using the visual editor

# For development — run pieces locally with hot reload
npm install
npm run pieces serve

# Create a new piece
npx ap generate-piece my-integration

# The piece scaffolds with TypeScript types, auth helpers,
# and a test runner. Edit src/index.ts and see changes
# in the builder immediately.
```

### Alternatives

**n8n** — The closest comparison. n8n has a larger community (45k+ stars), more integrations, and a more mature visual builder. Choose n8n if you need battle-tested reliability and don't care about MCP support. Choose Activepieces if AI agent tool integration matters to your stack or you prefer TypeScript over n8n's mixed JavaScript/TypeScript approach.

**Zapier** — The SaaS incumbent with 7,000+ integrations and the smoothest non-technical user experience. Zapier wins on breadth of integrations and ease of use for business users. Choose it if you want zero infrastructure management and don't need self-hosting. Choose Activepieces if you need data sovereignty, want to avoid per-task pricing, or need MCP server capabilities.

**Windmill** — A developer-oriented automation platform that's code-first rather than visual-builder-first. Windmill uses TypeScript, Python, and Go scripts with a flow builder on top. Choose Windmill if your team prefers writing code over drag-and-drop and you want a more general-purpose internal tooling platform. Choose Activepieces if you want a larger pre-built integration ecosystem and MCP support.

### Verdict

Activepieces is the workflow automation tool I'd recommend to any fullstack TypeScript team that's also exploring AI agent integration in 2026. The MCP server feature alone makes it worth evaluating — it turns every integration you install into a tool your AI agents can use, which is a massive multiplier for teams building agent-powered workflows. With 22,700+ stars, active development, and a community that contributes 60% of the integrations, the project has enough momentum to keep improving. The self-hosted, MIT-licensed core means you can run it in production without vendor lock-in or surprise bills. It's not going to replace Zapier for non-technical teams tomorrow, but for developer-led organizations that want automation infrastructure they control, Activepieces is the best option available right now.
