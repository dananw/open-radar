---
name: mcp-use
description: "Fullstack MCP framework for building MCP Apps and MCP Servers. Write interactive React widgets for ChatGPT and Claude with TypeScript SDK. 10K+ stars."
url: https://github.com/mcp-use/mcp-use
stars: 10105
forks: 1331
language: TypeScript
tags: ["mcp", "ai-agents", "typescript", "react", "chatgpt", "claude", "fullstack"]
featured: false
publishedAt: 2026-06-15
---

## mcp-use

### Overview

mcp-use is a fullstack framework for building on the Model Context Protocol — both the server side (tools that AI agents can call) and the client side (interactive widgets that render inside ChatGPT, Claude, and other MCP-compatible hosts). It's built by Manufact, a team that clearly bet early on MCP becoming the dominant standard for agent-tool interaction, and that bet is paying off. The repo hit 10,100+ stars with 1,331 forks in just over a year since its March 2025 creation, and the latest release (v1.32.0, June 11 2026) landed three days ago with auth improvements and branch-scoped deployment management.

The core insight behind mcp-use is that MCP isn't just about servers exposing tools — it's about building full applications that live inside AI chat interfaces. While most MCP tooling focuses on the server side (define a tool, return text), mcp-use introduces "MCP Apps": React components that render as interactive widgets when an agent invokes your tool. Think weather dashboards, data visualizations, form inputs, or rich media players — all running natively inside a Claude or ChatGPT conversation. This is a fundamentally different mental model from "tool returns JSON string."

The SDK ships in both TypeScript and Python, with the TypeScript package being the primary focus. There's a CLI scaffolding tool (`npx create-mcp-use-app@latest`), a built-in MCP Inspector for testing servers and apps locally, and a cloud deployment platform (Manufact) for production hosting with observability and branch previews. For fullstack developers already working with React, this is the lowest-friction path to building AI agent tooling.

### Why it matters

The Model Context Protocol has won. OpenAI adopted it for ChatGPT, Anthropic built Claude around it, Google supports it in Gemini, and every major coding agent (Cursor, Windsurf, Copilot) speaks MCP. But the tooling ecosystem is still immature. Most developers building MCP servers are hand-rolling transport layers, manually typing JSON schemas, and returning plain text responses. It works, but it's 2024-era DX in a 2026 world.

mcp-use addresses this gap with a proper framework approach: typed schemas with Zod, React widget rendering, hot reloading during development, and one-command deployment. For fullstack developers — especially those already in the React/TypeScript ecosystem — this means you can build an MCP server in the morning and have a rich interactive widget rendering inside ChatGPT by lunch. The framework handles transport negotiation, protocol compliance, and widget lifecycle so you can focus on the actual tool logic.

The MCP Apps concept is the real differentiator. We're entering an era where AI agents don't just return text blobs — they render interactive UIs. ChatGPT already supports widget rendering, Claude has artifact-like capabilities, and every major platform is building toward richer agent outputs. mcp-use is the first framework that makes this accessible to regular fullstack developers, not just protocol implementers.

### Key Features

**MCP Apps with React Widget Rendering.** Define a tool on your server, point it to a React component, and the widget renders natively inside ChatGPT or Claude when the agent calls your tool. The `useWidget` hook gives your component access to the tool's props, loading state, and the host's theme (dark/light mode). This isn't an iframe hack — the widget runs in the host's rendering context with proper sandboxing. You write standard React with TypeScript, and mcp-use handles the protocol bridge.

**Dual TypeScript and Python SDKs.** The TypeScript SDK (`mcp-use` on npm) is the primary package with full feature parity including widget support. The Python SDK (`mcp_use` on PyPI) covers MCP server building for teams in the Python ecosystem — Django developers, data engineers, ML teams. Both SDKs share the same protocol layer but expose idiomatic APIs for each language. You can build the server in Python and the widget in TypeScript if your architecture calls for it.

**Built-in MCP Inspector.** Every mcp-use server automatically serves an inspector at `/inspector` — no separate tool to install or configure. Point your browser at `http://localhost:3000/inspector` and you get a full debugging interface: call tools with custom parameters, inspect request/response payloads, test widget rendering, and validate schema compliance. There's also a hosted version at inspector.mcp-use.com for testing remote servers without local setup.

**CLI Scaffolding with Templates.** `npx create-mcp-use-app@latest` bootstraps a project with proper structure, TypeScript configuration, example tools, and an example widget. The scaffolding handles the boilerplate that usually kills momentum when you're prototyping — transport setup, schema definitions, development server with hot reload, and build configuration. From zero to a running MCP server with a test widget takes under two minutes.

**Type-Safe Tool Definitions with Zod.** Tool schemas are defined with Zod, which means your IDE autocompletes every parameter, catches type errors at build time, and the inspector can render accurate input forms. The Zod schema serves double duty: it validates incoming requests at runtime and generates the JSON Schema that MCP hosts use for tool discovery. Define the schema once, get validation, documentation, and host integration for free.

**Cloud Deployment with Branch Previews.** Manufact's cloud platform connects to your GitHub repo and deploys your MCP server with observability, metrics, logs, and branch-scoped environments. Push to a feature branch and get a preview URL. Merge to main and production updates automatically. For teams shipping MCP servers as products, this eliminates the DevOps overhead that usually accompanies any new deployment target.

**Coding Agent Skills Integration.** mcp-use ships skills files for Claude Code, Codex, Cursor, and other AI coding agents. Drop the skill into your project and the agent understands the mcp-use framework — it can scaffold tools, create widgets, debug protocol issues, and suggest architecture patterns. This tight integration with AI-assisted development means the framework is effectively self-documenting when you're using a modern coding agent.

### Use Cases

- **Interactive data dashboards inside ChatGPT** — Build an MCP server that queries your database and returns a React chart widget. Users ask "show me last month's sales by region" and get an interactive visualization they can hover, filter, and export — not a text table.

- **AI-powered internal tools** — Wrap your company's existing APIs as MCP tools with rich UI widgets. Customer support agents ask the AI to look up an order, and instead of getting raw JSON, they see a formatted widget with order details, shipping status, and action buttons.

- **Developer tooling with visual feedback** — Build MCP tools for code analysis, deployment status, or CI/CD pipelines that return interactive widgets showing build logs, test results, or infrastructure diagrams. Your coding agent becomes a visual operations dashboard.

- **Multi-step form workflows in AI conversations** — Create widgets that collect structured input from users (survey forms, configuration wizards, feedback forms) and pass the data back to the agent for processing. The widget handles validation and UX while the agent handles the business logic.

- **Prototyping and testing MCP servers** — Use the built-in inspector and hot-reload development server to rapidly iterate on tool definitions. Test how your tools behave across different MCP hosts without deploying to production.

### Pros and Cons

Pros:

- **First-mover advantage on MCP Apps.** No other framework does interactive React widgets inside AI chat interfaces. This is either a brilliant bet on where the ecosystem is heading or a premature abstraction — but with ChatGPT and Claude both investing in rich tool outputs, the timing looks right.

- **Excellent developer experience.** CLI scaffolding, hot reload, built-in inspector, Zod schemas with IDE autocomplete, and one-command deployment. The gap between "I want to build an MCP server" and "I have a working server with a widget" is measured in minutes, not hours.

- **Active development with real momentum.** 1,700+ commits, releases every few days, and a Discord community. The team shipped branch-scoped deployments and auth improvements in the last week alone. This isn't an abandoned side project.

Cons:

- **MCP Apps are bleeding edge.** Widget rendering support varies across hosts. ChatGPT has the best support currently, Claude is catching up, and many MCP clients don't support widgets at all. If you're building today, your rich UI only works in a subset of hosts.

- **Cloud platform creates vendor dependency.** The open-source SDK is fully functional for self-hosting, but the best deployment experience (branch previews, observability, managed infrastructure) is tied to Manufact's commercial platform. This is a common open-core tension, but worth noting.

- **Relatively young ecosystem.** 10K stars in a year is impressive, but the MCP ecosystem itself is still maturing. Protocol changes, host behavior differences, and evolving best practices mean you'll hit rough edges that more established frameworks have already smoothed over.

### Getting Started

```bash
# Scaffold a new MCP project
npx create-mcp-use-app@latest my-mcp-server
cd my-mcp-server

# Start development server with hot reload and inspector
npm run dev
# Open http://localhost:3000/inspector to test your tools

# Create a simple MCP server manually
npm install mcp-use zod
```

```typescript
import { MCPServer, text } from "mcp-use/server";
import { z } from "zod";

const server = new MCPServer({
  name: "my-server",
  version: "1.0.0",
});

server.tool({
  name: "get_weather",
  description: "Get weather for a city",
  schema: z.object({ city: z.string() }),
}, async ({ city }) => {
  return text(`Temperature: 72°F, Condition: sunny, City: ${city}`);
});

await server.listen(3000);
```

```bash
# Deploy to Manufact cloud (connect GitHub repo)
# Or self-host with Docker
docker build -t my-mcp-server .
docker run -p 3000:3000 my-mcp-server
```

### Alternatives

**FastMCP** — A Python-first MCP framework that's popular in the data/ML community. FastMCP excels at quickly exposing Python functions as MCP tools with minimal boilerplate, but it doesn't support interactive widgets or have a TypeScript SDK. Choose FastMCP when you're building server-only tooling in Python and don't need rich UI outputs. Choose mcp-use when you want the full app experience with React widgets.

**Official MCP SDKs (@modelcontextprotocol/sdk)** — Anthropic's reference implementation for TypeScript and Python. These are low-level protocol implementations — you get full control over transport, sessions, and message handling, but you're writing a lot of boilerplate. Good for understanding the protocol internals or building custom transports. For most developers, mcp-use provides enough abstraction to be productive without sacrificing the flexibility you need.

**Speakeasy MCP** — An API-first approach where you define your MCP server from OpenAPI specs and the framework generates tool definitions automatically. Works well if you already have a documented REST API and want to expose it to AI agents with minimal code. Less flexible than mcp-use for custom tool logic, and no widget support, but a faster path if your use case is "wrap existing API as MCP tools."

### Verdict

mcp-use is the most complete framework for building on MCP right now, and the MCP Apps concept — React widgets rendering inside AI chat interfaces — is the feature that justifies its existence beyond "yet another MCP SDK." The developer experience is genuinely good: Zod schemas, CLI scaffolding, built-in inspector, hot reload, and cloud deployment. For fullstack TypeScript developers, the barrier to entry is essentially zero — it's the same React, the same Zod, the same npm workflow.

The risk is that MCP Apps are ahead of the market. Widget rendering support is uneven across hosts, and some teams will find that plain text tool outputs are sufficient for their use cases. But the direction is clear: AI agents are moving from text-in/text-out to rich interactive interfaces, and mcp-use is the first framework built for that future. If you're building MCP tools today and want to do more than return JSON strings, this is the framework to use. The 10K star growth in a year and the daily commit cadence suggest the team is in this for the long haul.
