---
name: paca
description: "Paca is an AI-native open-source project management platform where AI agents and humans collaborate as equal Scrum teammates — a self-hosted Jira alternative built with Go and React."
url: https://github.com/Paca-AI/paca
stars: 369
forks: 12
language: Go
tags: ["project-management", "ai-agents", "scrum", "mcp", "self-hosted"]
featured: false
publishedAt: 2026-06-14
---

## Paca

### Overview

Paca is a self-hosted project management platform built on a provocative premise: AI agents should sit at the Scrum table with humans, not serve as glorified chatbots bolted to the sidebar. It's an open-source alternative to Jira, Trello, ClickUp, and Monday — and it's free forever under Apache 2.0.

The project launched in March 2026 and hit 369 GitHub stars by mid-June, with a Show HN post that drew significant attention. The team behind it comes from the intersection of AI agent tooling and enterprise software, and they've built something that reads like a manifesto against SaaS project management bloat. The architecture is a polyglot stack — Go (Gin) for the API, React with TanStack Start and shadcn/ui for the frontend, Python (FastAPI) with the OpenHands SDK for AI agent orchestration, and Node.js with Socket.IO for real-time updates. PostgreSQL handles persistence, Valkey handles caching and async event streams.

The core problem Paca tackles is deceptively simple: existing project management tools treat AI as an afterthought. You get chatbot integrations, auto-assign rules, maybe a generated summary here and there. But none of them let AI agents actually participate in the Scrum process — refining backlogs, picking up tasks from the board, writing BDD specs, contributing to system design documents. Paca does all of that, and it does it inside a lightweight, extensible platform you can deploy with a single Docker Compose command.

### Why it matters

The project management tooling market is worth over $7 billion annually, dominated by Jira (which commands roughly 40% of the developer tools market) and increasingly challenged by ClickUp, Linear, and Monday. Every one of these platforms is scrambling to add AI features. But they're all adding AI to a model that was designed for human-only teams — and it shows. The AI features feel like plugins, not core functionality.

Paca flips that assumption. Instead of asking "how do we add AI to project management?", it asks "what does project management look like when half your team is AI agents?" That's a fundamentally different design space, and it's one that matters as coding agents like Claude Code, Cursor, and Codex become standard developer tools. If your AI pair programmer can write code but can't update the sprint board, you've got a workflow gap.

The MCP (Model Context Protocol) integration is particularly relevant. Paca ships a published MCP server (`@paca-ai/paca-mcp`) that gives any compatible AI agent structured access to your workspace — projects, tasks, sprints, documents, members, custom fields. That means Claude, ChatGPT, or any MCP-compatible tool can create tasks, update statuses, manage sprints, and query your project data without custom API integrations. For teams already building with AI agents, this is the missing infrastructure piece.

### Key Features

**AI Agents as First-Class Scrum Teammates.** In Paca, AI agents aren't helpers — they're team members. They get assigned to sprints, appear on the Scrumban board alongside human teammates, pick up tasks from the backlog, and update their status in real time. The system uses the OpenHands SDK, so each agent runs in its own isolated sandbox container. Your host environment stays clean.

**Unified Scrumban Board.** One board, all teammates. No separate "AI workspace" or "automation view." Humans and AI agents share the same real-time board with Socket.IO delivery — everyone sees changes the moment they happen. The board supports both Scrum and Kanban workflows, so teams can pick the hybrid that works for them.

**WASM Plugin Sandbox.** The plugin system compiles to WebAssembly for the backend (write in Go, Rust, AssemblyScript — anything with a WASM target) and standard module bundles for the frontend. Plugins run sandboxed with a capability-based permission model. They declare exactly what host functions they need, and nothing more. There's a built-in Plugin Marketplace in the UI for one-click installs.

**BDD Collaboration.** Product Owners, Business Analysts, and AI agents co-author Gherkin scenarios directly inside Paca. This is one of the more interesting workflow innovations — having AI agents help write acceptance criteria means specs are more thorough and edge cases get caught earlier. The system design documents (SDD) feature keeps architecture visible to the entire team, including the AI members.

**MCP Server Integration.** The published `@paca-ai/paca-mcp` npm package connects any MCP-compatible AI agent to your Paca workspace. It exposes tools across projects, tasks, sprints, documents, members, roles, custom fields, attachments, activity, and comments. Installed plugins can register additional tools at runtime. Setup takes two lines of JSON in your Claude Desktop config.

**Claude Code Skill Set.** A full set of slash commands — `/paca`, `/paca-epic`, `/paca-breakdown`, `/paca-sprint`, `/paca-estimate`, `/paca-prioritize`, `/paca-do`, `/paca-test`, `/paca-doc` — that let you manage your entire Paca workspace from inside Claude Code without leaving your editor. Each command reads your Paca documentation first to understand the project before acting.

**In-App AI Chat.** The v0.4.0 release added project-level AI chat. You can talk to AI agents in plain English to plan work, create or update epics, stories, tasks, and documentation — all without leaving the Paca UI. Combined with activity diffs and one-click revert for every field change, it creates a tight feedback loop between human intent and AI execution.

### Use Cases

- **Scrum teams adopting AI coding agents** — If your developers use Claude Code or Cursor but your project management is still manual, Paca closes the loop. AI agents update the board as they work.
- **Small teams priced out of Jira** — At $8–$20+ per seat per month, Jira gets expensive fast. Paca is free and self-hosted. One Docker Compose command.
- **Open-source projects with AI-maintained documentation** — AI agents can manage issue triage, write specs, and keep system design documents current as the codebase evolves.
- **Engineering orgs experimenting with agent-driven development** — Paca's isolated agent sandboxes and MCP integration make it a realistic testbed for larger AI workflow experiments.
- **Teams that need customization without enterprise contracts** — The WASM plugin system lets you extend any part of the platform. No vendor lock-in, no enterprise tier gating.

### Pros and Cons

Pros:
- Genuine innovation in the AI-as-teammate model, not just AI-as-assistant. The Scrumban board with mixed human/AI teams is a design space that Jira and Linear haven't touched.
- The MCP server integration means any AI agent can connect to Paca, not just the built-in ones. This is infrastructure-level thinking.
- WASM-based plugin sandbox with capability manifests is a security-conscious approach that's rare in project management tools.
- Single Docker Compose deployment with sensible defaults. You can scale down services you don't need (external Postgres, S3 instead of MinIO, no AI agent for lighter installs).

Cons:
- 369 stars and early-stage development means the community is small. You're betting on a project that could stall.
- The AI agent orchestration relies on the OpenHands SDK, which adds Python (FastAPI) as a runtime dependency. Teams that want a pure Go or Node stack will find this adds operational complexity.
- No mobile app or responsive mobile experience documented. For teams that manage projects on phones, this is a gap.
- The plugin ecosystem is nascent. The marketplace exists, but the number of available community plugins is limited at this stage.

### Getting Started

```bash
# Option 1: Interactive install script (recommended for production)
curl -fsSL https://github.com/Paca-AI/paca/releases/latest/download/install.sh | bash

# Option 2: Docker Compose (manual)
mkdir paca && cd paca
curl -fsSL https://github.com/Paca-AI/paca/releases/latest/download/docker-compose.yml -o docker-compose.yml
mkdir -p nginx
curl -fsSL https://github.com/Paca-AI/paca/releases/latest/download/gateway.conf -o nginx/gateway.conf

# Create your environment file
cat > .env <<'EOF'
JWT_SECRET=<run: openssl rand -hex 32>
ADMIN_PASSWORD=<your-admin-password>
POSTGRES_PASSWORD=<run: openssl rand -hex 32>
AGENT_API_KEY=<run: openssl rand -hex 32>
INTERNAL_API_KEY=<run: openssl rand -hex 32>
ENCRYPTION_KEY=<run: openssl rand -hex 32>
PUBLIC_URL=http://localhost
EOF

# Start the stack
docker compose --env-file .env up -d
```

Open `http://localhost` and log in with `admin` and the password you set.

Connect Claude Code to Paca:

```bash
# Install the Claude Code skill set
curl -fsSL https://raw.githubusercontent.com/Paca-AI/paca/master/scripts/install-claude-skill.sh | bash

# Connect the MCP server
claude mcp add paca \
  --env PACA_API_KEY=your-api-key \
  --env PACA_API_URL=http://your-paca-url:8080 \
  -- npx -y @paca-ai/paca-mcp
```

### Alternatives

**Jira** — The industry standard with deep integrations, massive marketplace, and enterprise-grade permissions. Jira is the safe choice if you need proven scale and your team is human-only. But its AI features are add-ons, not core architecture, and the pricing model punishes growth.

**Linear** — Beautiful, fast, and developer-loved. Linear has the best UX in the project management space and recently added AI features for issue creation and triage. It's the right choice if you want polish and speed over extensibility, but it's closed-source and cloud-only.

**Plane** — Open-source project management with a clean UI and self-hosting option. Plane is more mature than Paca and has a larger community, but it doesn't have AI agent integration or MCP support. Choose Plane if you want a traditional open-source Jira alternative without the AI-native architecture.

### Verdict

Paca is the most interesting project management tool I've seen this year. Not because it has the most features — it doesn't — but because it's asking the right question: what happens when your AI coding agent can actually participate in sprint planning? The MCP server integration alone makes it worth evaluating for any team that's serious about AI-driven development workflows. It's early, the community is small, and you'll hit rough edges. But the architecture is sound (Go API, React frontend, WASM plugins, agent sandboxing), the Apache 2.0 license removes all friction, and the Docker Compose setup means you can try it in five minutes. If you're a fullstack team running Scrum with AI agents on your dev tools, Paca is where project management needs to go.
