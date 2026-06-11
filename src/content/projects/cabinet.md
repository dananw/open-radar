---
name: cabinet
description: "Cabinet is an open-source AI-first knowledge base and startup OS with agent orchestration, scheduled jobs, and embedded HTML apps — all stored as markdown files on disk."
url: https://github.com/hilash/cabinet
stars: 2231
forks: 153
language: TypeScript
tags: ["ai-agents", "knowledge-base", "typescript", "self-hosted", "local-first", "productivity"]
featured: false
publishedAt: 2026-06-12
---

## Cabinet

### Overview

Cabinet is an open-source, self-hosted knowledge base that doubles as an AI agent orchestration platform. Everything lives as plain markdown files on disk — no database, no vendor lock-in, no cloud dependency. It crossed 2,200 GitHub stars in under three months after its April 2026 launch, with growth accelerating as developers look for alternatives to Notion and Obsidian that actually integrate AI agents in a meaningful way.

The project is built by Hila Shmuel, a former Engineering Manager at Apple who left to build Cabinet in public. That background shows in the product's design sensibility — the interface feels polished in a way most open-source tools don't, and the architecture decisions (local-first, git-backed, BYOAI) reflect someone who's thought deeply about what happens when AI tools hold your most sensitive context. The tech stack is Next.js 16, TypeScript, Tailwind CSS, shadcn/ui, Tiptap for rich text editing, Zustand for state management, and node-cron for scheduled jobs.

The core problem Cabinet solves is context fragmentation. Every time you start a new AI session, it forgets everything. Your project context, your decisions, your research — scattered across Notion docs, chat histories, and local files. Cabinet puts all of that into one knowledge base that AI agents can actually access, search, and build upon. Agents have persistent memory, scheduled jobs, and their own workspaces in the KB. The knowledge compounds over time instead of resetting every session.

### Why it matters

The AI agent space is exploding, but most agent frameworks focus on the "doing" part — tool calls, function execution, chain orchestration. Almost nobody is solving the "knowing" part well. Where does an agent's context live? How does it persist across sessions? How do multiple agents share knowledge without stepping on each other? Cabinet is one of the first tools to treat the knowledge base itself as the operating layer for AI agents, not just a place to dump notes.

The local-first architecture is also increasingly relevant. As developers become more aware of data sovereignty — especially with AI tools that process internal code, business plans, and customer research — the demand for self-hosted, file-based systems is growing fast. Cabinet's approach of storing everything as markdown on disk means you can version it with git, search it with ripgrep, edit it in VS Code, and never worry about a SaaS company changing their pricing or shutting down.

For fullstack developers specifically, Cabinet is interesting because it's built on the same stack many of us already use. Next.js, React, TypeScript, Tailwind — if you know these, you can extend Cabinet, build custom agents, or fork it entirely. The embedded HTML apps feature alone makes it worth watching: drop an index.html in any folder and it renders as an embedded app inside your knowledge base, version-controlled through git.

### Key Features

**AI Agent Orchestration with Persistent Memory.** Cabinet ships with 20 pre-built agent templates spanning leadership (CEO, CTO, COO), product, marketing, engineering, sales, and operations. Each agent has its own goals, skills, workspace, and memory that persists across sessions. Agents can create missions, write content, file reports, and communicate with each other through built-in team channels. The difference from a chatbot is that these agents accumulate context over time — they remember what they did yesterday and build on it.

**Scheduled Cron Jobs for Agents.** Any agent can run recurring jobs — a Reddit scout every 6 hours, weekly reports on Monday morning, daily standup summaries at 9am. Jobs use a provider adapter layer with persisted conversations, so you can see the full transcript of what an agent did during each run. Per-run overrides let you choose provider, model, and reasoning effort for different jobs. This turns Cabinet from a passive knowledge base into an active system that works while you sleep.

**Embedded HTML Apps in Your Knowledge Base.** Drop an index.html file in any Cabinet directory and it renders as an embedded app — full-screen mode with sidebar auto-collapse, AI-generated apps written directly into your KB, version-controlled through git with no build step. This is the biggest differentiator from Obsidian and Notion. You're not just storing documents; you're building a workspace where custom tools live alongside your notes, accessible to both humans and agents.

**Git-Backed Version History.** Every save auto-commits to a local git repository. You get a full diff viewer built into the UI and can restore any page to any point in time. This means your AI system has the same audit trail as your code — you can see exactly what changed, when, and revert mistakes. For teams working with AI-generated content, this kind of version control is not a nice-to-have; it's a requirement.

**File-Based Architecture with Zero Lock-In.** Your entire Cabinet is a folder of markdown files. No SQLite, no Postgres, no proprietary format. You can open it in Obsidian, search it with grep, sync it with rsync, or mount it as a volume in Docker. The CLI runs through npx with no global install needed. This design philosophy — keep it simple, keep it inspectable — runs through every layer of the product.

**Bring Your Own AI Provider.** Cabinet works with Claude Code CLI, Codex CLI, OpenCode, and local models through a structured adapter layer. You're not locked into any single AI provider. The system uses `claude_local` and `codex_local` adapters by default, but the architecture supports any provider that exposes a CLI or API. Personas and jobs can inherit defaults while individual runs can override provider, model, and effort level.

**Web Terminal and Team Communication.** A built-in web terminal lets you run interactive AI CLI sessions directly in the browser. Internal chat channels let agents and humans communicate within the knowledge base. Combined with the mission/kanban tracking system, Cabinet becomes a workspace where planning, execution, and knowledge management happen in one place instead of jumping between five different tools.

### Use Cases

- **Solo founders building with AI** — One person running a startup can staff Cabinet with a virtual team of agents that handle research, content, social media monitoring, and reporting while the founder focuses on product and engineering.

- **Development teams managing project context** — Engineering teams can use Cabinet as a shared knowledge base where architectural decisions, API documentation, and research findings persist across AI sessions instead of being lost between Claude conversations.

- **Content creators with research workflows** — Writers and researchers who need to gather information from multiple sources, organize it, and have AI agents help synthesize and draft content based on accumulated knowledge.

- **AI-first internal tools** — Teams building internal dashboards or tools can embed them directly as HTML apps inside Cabinet, version-controlled alongside the knowledge base, with agents that can interact with the tools.

- **Local-first AI experimentation** — Developers who want to experiment with multi-agent workflows, scheduled automation, and persistent AI memory without sending their data to external services.

### Pros and Cons

Pros:
- Genuinely local-first with no database dependency — your entire knowledge base is a folder of markdown files you fully control. This is rare in the AI tool space where most platforms lock your data into proprietary formats.
- Built by a former Apple Engineering Manager, and the polish shows. The UI, the architecture decisions, and the product thinking are a cut above typical open-source projects.
- Active development with daily commits — the project added Telegram integration, standalone markdown image support, and provider-level model selection in the last week alone. The roadmap is moving fast.
- MIT licensed with a clear contribution process. The Discord community is active and the maintainer is responsive to issues and feature requests.
- The embedded HTML apps feature is genuinely novel — no other knowledge base tool lets you ship interactive apps inside your KB with version control.

Cons:
- Requires Node.js 22+ and at least one AI CLI provider (Claude Code or Codex) installed locally. The setup is straightforward but adds friction compared to a SaaS tool you just open in a browser.
- The 20 pre-built agent templates are opinionated — they're designed for startup teams. If your use case doesn't map to those roles, you'll need to customize or build your own agents.
- Telemetry is enabled by default (anonymous event counts and versions, not file contents). You need to opt out manually with an environment variable or settings toggle, which some privacy-conscious users will find annoying.
- The project is still early — while the core features work well, the agent orchestration layer is evolving rapidly. Breaking changes are possible as the architecture matures.

### Getting Started

```bash
# Create and start a new Cabinet
npx create-cabinet@latest
cd cabinet
npm run dev:all

# Open http://localhost:4000
# The onboarding wizard builds your custom AI team in 5 questions
```

To configure your environment:

```bash
cp .env.example .env.local
# Set KB_PASSWORD for UI auth (optional)
# Set DOMAIN for your deployment
```

Individual commands:

```bash
npm run dev          # Next.js dev server (port 4000)
npm run dev:daemon   # Agent daemon with WebSocket + scheduler (port 4100)
npm run dev:all      # Both servers
npm run build        # Production build
npm run start        # Production mode
```

Requirements: Node.js 22+, Claude Code CLI or Codex CLI installed, macOS or Linux (Windows via WSL).

### Alternatives

**Obsidian** — The most popular local-first markdown knowledge base. Obsidian has a massive plugin ecosystem and works offline, but it has no built-in AI agent orchestration, no scheduled jobs, and no embedded app support. Choose Obsidian if you want a mature note-taking tool with thousands of community plugins and don't need AI agents running inside your knowledge base.

**Notion** — The dominant team knowledge base with AI features. Notion is a SaaS product — your data lives on their servers, and you're locked into their format and pricing. It has better collaboration features and a more polished UI for non-technical users, but it can't run self-hosted agents, execute code, or embed custom HTML apps. Choose Notion if your team needs a collaborative wiki and doesn't care about local-first or AI agent orchestration.

**Hermes Agent** — An AI agent platform with memory, scheduled jobs, and multi-provider support. Hermes is focused on agent execution rather than knowledge management — it runs tasks and delivers results but doesn't provide a rich knowledge base UI with WYSIWYG editing, kanban boards, or embedded apps. Choose Hermes if you need a headless agent runner without the knowledge base layer.

### Verdict

Cabinet is the most interesting knowledge-base-meets-agent-platform I've seen in 2026. The local-first, file-based architecture is a genuine differentiator in a space dominated by SaaS tools that hold your data hostage. The fact that it's built on Next.js and TypeScript means any fullstack web developer can read the source, extend it, or fork it without learning a new stack. The embedded HTML apps feature alone sets it apart from every competitor — being able to drop interactive tools directly into your knowledge base, version-controlled through git, is the kind of feature that sounds minor until you use it and realize you can't go back. At 2,200 stars with daily commits and an active Discord community, Cabinet has real momentum. The main risk is that it's still early — the agent orchestration layer is evolving, breaking changes are possible, and the pre-built agent templates assume a startup-team use case. But if you're a developer who wants AI agents that actually accumulate and share knowledge instead of starting from scratch every session, and you want that knowledge to live on your machine in files you control, Cabinet is the best option available right now.
