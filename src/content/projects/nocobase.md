---
name: nocobase
description: "NocoBase is an open-source AI + no-code platform for building business systems — CRMs, ERPs, admin panels — with a WYSIWYG editor, workflow automation, and built-in AI agent support."
url: https://github.com/nocobase/nocobase
stars: 22702
forks: 2660
language: TypeScript
tags: ["no-code", "ai-agents", "internal-tools", "workflow-automation", "typescript"]
featured: false
publishedAt: 2026-06-11
---

## NocoBase

### Overview

NocoBase is an open-source no-code platform that lets you build business systems — CRMs, ERPs, project management tools, admin panels — through a visual interface rather than writing code from scratch. It has 22,700 GitHub stars, 2,660 forks, and just shipped v2.0.62 on June 10, 2026. The project is actively maintained with daily commits and a growing international community.

The platform was originally created by a Chinese team and has been steadily gaining traction in English-speaking developer communities over the past two years. What sets NocoBase apart from the dozens of other no-code tools is its approach to AI integration: rather than using AI to generate entire applications (which tends to produce brittle, unmaintainable code), NocoBase positions AI as a collaborator that works on top of a production-proven no-code infrastructure. You get the speed of AI-assisted development with the reliability of a structured data model and visual editor.

The core problem NocoBase solves is the gap between "I need a custom business tool" and "I don't have the engineering resources to build one." Most businesses need something more tailored than off-the-shelf SaaS but can't justify a full development team for internal tools. NocoBase fills that middle ground with a platform that's powerful enough for developers to extend and simple enough for non-technical users to operate.

### Why it matters

The internal tools space has been heating up. Appsmith, Refine, and Tooljet have all carved out niches, but NocoBase takes a different philosophical approach. Instead of giving developers a framework to build internal tools in code, it gives everyone — developers and non-developers alike — a visual system that generates real database tables, real APIs, and real workflows. The TypeScript codebase is clean and modular, making it genuinely extensible when the no-code interface isn't enough.

What's most interesting right now is the AI angle. NocoBase ships with "AI employees" — AI agents that live inside your business system and can handle tasks like document recognition, data analysis, form filling, and workflow routing. These aren't chatbot widgets bolted on for marketing purposes. They're integrated into the workflow engine and can participate in business processes alongside human users. The platform also exposes MCP (Model Context Protocol) interfaces, so external agents from Claude, Cursor, Codex, and other tools can interact with your NocoBase instance programmatically.

For fullstack developers specifically, NocoBase is worth watching because it represents a shift in how internal tools get built. Instead of spending two sprints building a custom admin panel for the marketing team, you can scaffold one in an afternoon and let the team iterate on it themselves. The developer experience is solid — TypeScript throughout, plugin architecture for custom logic, and a CLI that coding agents can use to automate development tasks.

### Key Features

**WYSIWYG Visual Editor.** Switch between usage mode and configuration mode with a single click. Non-technical users can create and modify data models, pages, workflows, and permissions through a drag-and-drop interface. Each collection you create becomes a real SQL table with typed columns — this isn't a spreadsheet pretending to be a database. The visual editor handles relationships between tables, form layouts, table views, and dashboard charts without requiring any code.

**Workflow Automation Engine.** NocoBase includes a visual workflow builder that supports both synchronous and asynchronous execution. Workflows can be triggered by data changes, schedules, webhooks, or manual actions. Nodes include conditionals, loops, HTTP requests, SQL queries, and AI agent invocations. This is where the platform starts feeling less like a no-code tool and more like a lightweight business process automation system.

**AI Employee System.** Built-in AI agents that operate within your business context. On the frontend, they assist with data analysis, Q&A, and form filling. On the backend, they handle document recognition, risk monitoring, and task routing automatically. The key insight is that these agents have access to your actual data model and business logic, not just a generic chatbot interface. They can be wired into workflows so AI-driven decisions and human approvals coexist in the same process.

**Plugin Architecture.** NocoBase is built as a core with plugins — nearly every feature is a plugin, including the data model manager, workflow engine, and file manager. You can develop custom plugins in TypeScript using the provided SDK. Plugins can add new field types, collection operations, workflow actions, and UI components. The plugin system uses dependency injection and lifecycle hooks, which makes it feel like a proper framework rather than a scripting layer.

**MCP and Agent Protocol Support.** The platform exposes interfaces for MCP (Model Context Protocol), HTTP APIs, and a full CLI. External AI platforms like Claude Code, Cursor, OpenCode, Dify, Coze, and n8n can connect through standard protocols. This means you can build a NocoBase system and then have AI agents from different providers read data, trigger workflows, and manage records — all through a unified permission model.

**Multi-Database Support.** NocoBase supports SQLite, PostgreSQL, and MySQL as its underlying storage. The data abstraction layer means you can start with SQLite for development and switch to PostgreSQL for production without changing your data model. This flexibility matters for teams that have existing database infrastructure or specific compliance requirements.

**Role-Based Access Control.** Granular permissions at the collection, field, and action level. You can define roles that control who can read, create, update, and delete records in each collection, with field-level restrictions for sensitive data. The permission system also applies to AI employees, so you can control exactly what data and actions an AI agent has access to.

### Use Cases

- **Internal admin panels** — Build custom back-office tools for operations teams that need to manage orders, users, inventory, or support tickets without waiting for engineering bandwidth.
- **CRM and sales pipeline management** — Create a tailored sales system with custom fields, stages, and automation rules that match your actual process instead of forcing your workflow into Salesforce's model.
- **Project management dashboards** — Combine task tracking, team assignments, and progress visualization in a single system that non-technical project managers can modify as requirements change.
- **AI-augmented data entry** — Use the AI employee system to automate document processing, extract data from uploaded files, and route forms to the right approvers based on content analysis.
- **Rapid prototyping for client projects** — Agencies and consultants can spin up working prototypes in hours instead of weeks, then hand off a system that clients can maintain themselves.

### Pros and Cons

Pros:
- The visual editor genuinely works for non-technical users — the WYSIWYG mode lets business teams create and modify data models, pages, and workflows without touching code. This is rare in the no-code space where "no-code" often means "slightly less code."
- The AI integration is thoughtful rather than superficial. AI employees have access to your actual data model and can participate in workflows, which is more useful than a generic chatbot sidebar.
- Active development with daily commits and a clear release cadence (v2.0.62 as of June 2026). The team responds to issues and the community forum is active.
- Plugin architecture means developers can extend the platform with custom logic when the no-code interface isn't sufficient. The TypeScript SDK is well-documented.

Cons:
- The AGPL-3.0 license means any modifications you distribute (including over a network) must be open-sourced. This is fine for internal use but problematic if you're building a SaaS product on top of NocoBase. Commercial licensing is available but adds cost.
- The documentation, while improving, still has gaps in the English version. Some advanced features are better documented in Chinese, and the community forum has more activity in Chinese than English.
- At 302 open issues, the project has the typical rough edges of a rapidly evolving platform. Some edge cases in the workflow engine and permission system may require workarounds.

### Getting Started

```bash
# Quick start with Docker (recommended)
docker compose up -d

# Or install with npm (requires Node.js 18+)
npx create-nocobase@latest my-project
cd my-project
npm install
npm run dev

# Access the admin panel at http://localhost:13000
# Default credentials: admin@nocobase.com / admin123
```

For production deployment with PostgreSQL:

```bash
# Clone the repository
git clone https://github.com/nocobase/nocobase.git
cd nocobase

# Install dependencies
npm install

# Build the project
npm run build

# Start with PostgreSQL
# Edit .env to configure your database connection
APP_DB_POSTGRES_URL=postgres://user:password@host:5432/nocobase
npm start
```

### Alternatives

**Appsmith** — A popular open-source low-code platform focused specifically on internal tools and admin panels. Appsmith's strength is its widget library and JavaScript-based customization, which gives developers more control over the UI. Choose Appsmith if your primary need is building admin dashboards that connect to existing databases and APIs, and you want a more code-centric approach.

**Refine** — A React-based framework for building data-intensive applications. Refine gives you full control over the UI since it generates real React code, but requires developer involvement for every change. Choose Refine if your team has strong React skills and you want a code-first approach that integrates with your existing frontend architecture.

**Budibase** — Another open-source low-code platform with a focus on internal tools and workflows. Budibase has a cleaner initial setup and a more polished UI, but its plugin ecosystem and AI integration aren't as mature as NocoBase's. Choose Budibase if you want a simpler tool that gets out of the way quickly, without the complexity of NocoBase's plugin architecture.

### Verdict

NocoBase is the most practical AI-integrated no-code platform available right now. The key insight is that AI works best when it has structured data and clear interfaces to interact with — not when it's trying to generate entire applications from scratch. By combining a real database-backed no-code system with AI employees and agent protocols, NocoBase creates a development model where humans and AI collaborate on business tools rather than competing. The 22,700 stars and active daily development suggest the community agrees. If you're a fullstack developer who's tired of building custom admin panels for every internal request, NocoBase is worth a serious look — especially if your team includes non-technical stakeholders who need to iterate on business logic without filing engineering tickets.
