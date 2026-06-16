---
name: onyx
description: "Onyx is an open-source AI platform with RAG, agents, web search, and code execution — a self-hosted alternative to ChatGPT Enterprise built with Next.js and Python."
url: https://github.com/onyx-dot-app/onyx
stars: 30366
forks: 4154
language: Python
tags: ["ai", "rag", "nextjs", "python", "llm-platform"]
featured: false
publishedAt: 2026-06-17
---

## Onyx

### Overview

Onyx is an open-source AI platform that gives you a feature-rich interface for LLMs — think ChatGPT Enterprise, but self-hosted and under your control. It crossed 30,000 GitHub stars in mid-2026, with the v4.2.0 beta landing just this week. That kind of momentum for a self-hosted AI tool tells you something about where the market is heading.

The project started as a Y Combinator company (originally called Danswer) in 2023 and has been steadily building since. The team behind it has grown from a small open-source experiment into a platform used by enterprises for internal knowledge management and AI-powered workflows. The rebrand from Danswer to Onyx happened as the scope expanded well beyond simple question-answering.

The core problem Onyx solves is the disconnect between powerful LLMs and the actual data inside organizations. Your company has documents in Google Drive, tickets in Jira, code in GitHub, conversations in Slack, and knowledge scattered across dozens of tools. Onyx connects to all of it through 50+ indexing connectors, builds a hybrid vector + keyword search index, and lets your team chat with an AI that actually knows your internal context. It's not just a chat UI — it includes agentic RAG, deep research, web search, code execution in sandboxes, file generation, image creation, and voice mode.

### Why it matters

The AI platform space is crowded, but most options force a choice: use a cloud service and give up your data, or build everything from scratch. Onyx sits in an interesting middle ground. It's open source under MIT for the community edition, deploys with a single script, and gives you features that typically require enterprise contracts with OpenAI or Anthropic.

For fullstack developers, the architecture is relevant. The frontend is Next.js, the backend is Python with FastAPI, and the stack includes PostgreSQL, Redis, Vespa (for hybrid search), and a job queue system. If you're building AI features into your own products, studying how Onyx handles RAG pipelines, connector synchronization, and agent orchestration is worth the time. The codebase is large but well-structured, and the team ships fast — there have been multiple releases in the past week alone.

The broader trend here is enterprises wanting AI capabilities without sending their data to third parties. Onyx has been riding that wave. Their deep research feature topped a public leaderboard in February 2026, and the platform now supports custom agents, MCP integrations, SSO via SAML/OIDC, and RBAC. That's a serious enterprise stack built in the open.

### Key Features

**Agentic RAG.** Onyx doesn't just do simple vector search. It combines hybrid indexing (vector + keyword) with AI agents that can reason about which sources to query, how to decompose complex questions, and when to escalate. The result is search and answer quality that competes with cloud-hosted alternatives, running entirely on your infrastructure.

**50+ Data Connectors.** Out of the box, Onyx connects to Google Drive, Confluence, Slack, Jira, GitHub, Notion, Salesforce, SharePoint, and dozens more. Each connector handles incremental syncing, permission-aware indexing, and automatic re-indexing on changes. You can also extend through MCP servers for custom data sources.

**Custom AI Agents.** Build agents with unique instructions, knowledge bases, and available actions. Each agent can have different LLM backends, temperature settings, and tool access. Share agents across your organization with role-based access control. This is where Onyx moves beyond a chat tool into a platform for building internal AI workflows.

**Deep Research Mode.** A multi-step research flow that decomposes a question, searches across your knowledge base and the web, synthesizes findings, and produces a structured report. The Onyx team claims top position on a public deep research benchmark as of February 2026. For developers doing technical research or code reviews, this is genuinely useful.

**Code Execution Sandbox.** Onyx can execute Python code in an isolated sandbox, analyze data, render charts, and generate files. This turns it from a text-based assistant into something closer to a data analyst. You can ask it to process CSVs, run calculations, or visualize trends without leaving the chat interface.

**Self-Hosted with Enterprise Features.** The MIT-licensed community edition includes the full core: chat, RAG, agents, actions, and connectors. The enterprise edition adds SSO (Google OAuth, OIDC, SAML), SCIM provisioning, usage analytics, query history auditing, PII filtering, and white-labeling. Both deploy via Docker Compose, Kubernetes, or Helm.

**Voice and Image Generation.** Onyx includes text-to-speech and speech-to-text for voice-based interaction, plus image generation through configurable backends. These features are table stakes for consumer AI tools but rare in self-hosted platforms.

### Use Cases

- **Internal knowledge base** — Teams that need AI-powered search across Google Drive, Confluence, Slack, and other internal tools without sending data to external services
- **Developer documentation assistant** — Connect Onyx to your GitHub repos and docs to create an AI that answers questions about your codebase, architecture, and past decisions
- **Customer support augmentation** — Build agents trained on your support docs and ticket history to help support teams draft responses and find relevant information quickly
- **Research and competitive analysis** — Use the deep research mode to synthesize information from internal documents and web sources for product planning
- **Data analysis workflows** — Leverage the code execution sandbox for quick data analysis, chart generation, and file processing without switching tools
- **Enterprise AI adoption** — Organizations that need audit trails, SSO, RBAC, and compliance features before rolling out AI tools company-wide

### Pros and Cons

Pros:
- MIT-licensed core with a genuinely useful free tier — chat, RAG, agents, connectors, and actions all included without paying for enterprise features.
- 50+ connectors out of the box means you can be productive in minutes, not days. The incremental sync and permission-aware indexing are well-implemented.
- Very active development with multiple releases per week. The v4.x series has added deep research, improved agent capabilities, and MCP support in rapid succession.
- Self-hosted deployment with a single script, plus Docker Compose and Kubernetes options for production environments.

Cons:
- The full stack is heavy. Standard deployment requires PostgreSQL, Redis, Vespa, and multiple worker processes. The "lite" mode exists but lacks RAG indexing — which is the main reason you'd use Onyx.
- 459 open issues suggest the codebase is complex and edge cases accumulate. The jump from v3 to v4 introduced breaking changes, and migration guides are sometimes lagging.
- The enterprise edition's feature split means some capabilities (SSO, analytics, white-labeling) require a commercial license. For a solo developer or small team, this is fine, but mid-size orgs may hit the paywall quickly.

### Getting Started

```bash
# Deploy with a single script
curl -fsSL https://onyx.app/install_onyx.sh | bash

# Or clone and run with Docker Compose
git clone https://github.com/onyx-dot-app/onyx.git
cd onyx/deployment/docker_compose
docker compose up -d
```

Open http://localhost:3000 and follow the setup wizard. You'll need at least one LLM API key (OpenAI, Anthropic, or a self-hosted model via Ollama/LiteLLM).

For the lightweight version (chat UI only, no RAG indexing):

```bash
cd onyx/deployment/docker_compose
docker compose -f docker-compose-lite.yml up -d
```

### Alternatives

**AnythingLLM** — A lighter-weight, self-hosted AI chat platform that focuses on document-based RAG with a simpler setup. AnythingLLM is easier to deploy and has fewer moving parts, but lacks Onyx's connector ecosystem and enterprise features. Better choice if you need a quick personal RAG tool without the infrastructure overhead.

**LibreChat** — An open-source chat interface that supports multiple LLM providers and has a polished UI. LibreChat is more focused on the chat experience itself (multi-model conversations, preset system prompts, plugin support) while Onyx is stronger on the knowledge management and connector side. Choose LibreChat if your primary need is a multi-model chat UI rather than enterprise knowledge retrieval.

**Flowise** — A visual LLM workflow builder that lets you drag-and-drop RAG pipelines, agents, and tool integrations. Flowise is more accessible for non-developers and has a lower barrier to entry, but it's less opinionated about deployment and scaling. Better for prototyping AI workflows; Onyx is better for production deployments that need connectors, auth, and team features.

### Verdict

Onyx is the most complete open-source AI platform you can self-host today. The 30K stars and rapid release cadence (v4.2 beta just dropped) show real momentum. For fullstack developers building AI features, the codebase is worth studying — the Next.js frontend, Python backend, Vespa search integration, and agent orchestration patterns are all production-grade. It's not a lightweight tool; the full deployment stack is substantial, and you'll need real infrastructure to run it in production. But if your organization needs an internal AI platform with proper auth, connectors, and team features, Onyx is the strongest open-source option available. The fact that the core is MIT-licensed while competitors charge per seat makes it an easy recommendation for teams willing to self-host.
