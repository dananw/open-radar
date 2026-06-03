---
name: penpot-mcp
description: "Penpot's official MCP server lets AI agents read, modify, and create design elements directly in Penpot files via the Model Context Protocol."
url: https://github.com/penpot/penpot-mcp
stars: 308
forks: 45
language: TypeScript
tags: ["design", "mcp", "ai-agents", "penpot", "figma-alternative"]
featured: false
publishedAt: 2026-06-03
---

## Penpot MCP

### Overview

Penpot MCP is the official Model Context Protocol server from the Penpot team — the open-source design and prototyping platform that positions itself as the community-driven alternative to Figma. Released under the MPL-2.0 license and written in TypeScript, this project gives LLMs direct read/write access to Penpot design files through a clean server-plugin architecture. At 308 stars and 45 forks since its October 2025 creation, it's still early-stage, but the momentum is notable for a tool in the design-tooling niche.

The primary contributor is opcode81, who authored 172 of the repository's commits — effectively the single architect behind the implementation. The Penpot organization itself (maintained by Kaleidos, the company behind Penpot) owns the repo, which gives it official backing and a credible maintenance story. The project lives at `penpot/penpot-mcp` on GitHub.

The problem it solves is concrete: designers use Penpot to create interfaces, but AI coding assistants and LLM-based workflows have no way to interact with those designs programmatically. You can paste screenshots into ChatGPT, but you can't ask Claude to read your component hierarchy, extract color tokens, or create a new artboard. Penpot MCP bridges that gap by exposing Penpot's Plugin API to any MCP-compatible AI client.

### Why it matters

The design-to-code pipeline has been broken for years. Tools like Figma introduced Dev Mode to hand off specs to developers, but the actual translation from design file to production code still requires human interpretation. MCP — Anthropic's open protocol for connecting LLMs to external tools — changes the equation. If a language model can read your design file's structure, understand its components, and even modify elements, you get a fundamentally different workflow.

Penpot is the right place for this experiment. Unlike Figma, which is a closed platform with a proprietary plugin API, Penpot is open-source and self-hostable. The MCP server doesn't need to reverse-engineer anything — it talks directly to Penpot's published Plugin API over WebSocket. That architectural honesty matters. You can run the entire stack locally: Penpot on your server, the MCP server on localhost, and Claude Desktop or Cursor as the AI client. No cloud dependencies, no API keys beyond your LLM provider.

The timing is also relevant. MCP adoption has accelerated dramatically through 2025 and into 2026. Claude Desktop, Claude Code, Cursor, Windsurf, and dozens of other tools now support MCP natively. Design tool integration was an obvious gap in the ecosystem, and Penpot got there first with an official implementation.

### Key Features

**Read and Write Design Data.** The MCP server exposes tools that let LLMs query design file structures — pages, frames, components, styles — and also create or modify elements. An AI agent can read a button component's properties, generate a variant with different spacing, and insert it into a frame. The LLM executes code snippets within the Penpot Plugin environment, which means it's not limited to a fixed set of operations.

**Dual Transport Support.** The server exposes both modern Streamable HTTP (`/mcp`) and legacy SSE (`/sse`) endpoints on port 4401 by default. Clients that only support stdio transport (like Claude Desktop) can connect through `mcp-remote` as a proxy. This flexibility means you're not locked into a specific AI client.

**WebSocket Bridge Architecture.** The MCP server doesn't talk to Penpot directly. Instead, a Penpot plugin runs inside the Penpot web app and connects to the MCP server via WebSocket. The server sends task requests to the plugin, the plugin executes them via Penpot's Plugin API, and returns structured responses. This separation means the MCP server has no dependency on Penpot's internals — it only needs the plugin to be loaded and connected.

**Monorepo with Type Safety.** The repository is a TypeScript monorepo containing shared type definitions, the MCP server, the Penpot plugin, and Python helper scripts for development. The common types package ensures that the request/response protocol between server and plugin stays consistent. It's a small codebase (463 KB) but well-structured.

**Self-Hostable by Design.** Because Penpot itself is self-hostable and the MCP server runs locally, you can keep your entire design workflow air-gapped. No design data leaves your network unless you choose to use Penpot's cloud instance.

### Use Cases

- **Design-to-code generation** — An AI agent reads a Penpot design file, understands the component structure, and generates React/Vue/Svelte code that matches the layout, spacing, and typography.
- **Design system auditing** — Query a Penpot file for color tokens, typography scales, and spacing values. Compare against your codebase's design tokens to find inconsistencies.
- **Bulk design operations** — Ask an AI to rename all frames in a page according to a naming convention, or generate responsive variants of a set of components.
- **Design file exploration** — Natural language queries like "show me all buttons in this file" or "what's the padding on the main CTA section" without manually navigating the file.
- **Prototyping assistance** — An LLM generates new screen layouts based on existing design patterns, inserting them directly into the Penpot file for review.

### Pros and Cons

Pros:
- Official Penpot project, not a third-party hack — this will be maintained alongside the platform
- Open-source (MPL-2.0) with full self-hosting capability across the entire stack
- Clean architecture that separates concerns: MCP server, WebSocket bridge, and Penpot Plugin API
- Works with any MCP-compatible client (Claude Desktop, Claude Code, Cursor, etc.)
- The LLM can execute arbitrary code within the Plugin environment, not just predefined tool calls

Cons:
- 308 stars means a small community — expect rough edges and limited third-party resources
- Requires running three things simultaneously (Penpot, MCP server, plugin) which adds setup complexity
- Browser PNA restrictions in Chromium 142+ require manual permission grants for localhost connections
- Effectively a one-person project (opcode81 has 96% of commits) — bus factor is a real concern
- Penpot itself has a smaller ecosystem than Figma, so the addressable user base is limited

### Getting Started

```bash
# Clone the repository
git clone https://github.com/penpot/penpot-mcp.git
cd penpot-mcp

# Install dependencies
npm install

# Build and start all components (server + plugin)
npm run bootstrap

# The MCP server runs on http://localhost:4401
# SSE endpoint: http://localhost:4401/sse
# Streamable HTTP: http://localhost:4401/mcp
```

Then open Penpot in your browser, navigate to a design file, open the Plugins menu, and load the plugin from `http://localhost:4400/manifest.json`. Click "Connect to MCP server" in the plugin UI. Finally, configure your AI client to connect to the MCP endpoint.

For Claude Desktop, add this to your config:

```json
{
  "mcpServers": {
    "penpot": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "http://localhost:4401/sse", "--allow-http"]
    }
  }
}
```

### Alternatives

**Figma Dev Mode + MCP plugins** — Figma has third-party MCP integrations, but they rely on Figma's proprietary REST API and require a paid Dev Mode seat. You can't self-host Figma, and API rate limits are a real constraint for agent-driven workflows. Penpot MCP has none of these limitations because it's built on open infrastructure.

**Direct Penpot Plugin API** — You could write your own Penpot plugin to expose design data, but you'd need to build the AI integration layer yourself. The MCP server handles protocol compliance, transport negotiation, and the task request/response lifecycle. Reimplementing that is non-trivial.

**Screenshot-based approaches** — Tools like Galileo AI or Uizard work from screenshots or text prompts to generate designs. That's a different workflow — generative rather than interactive. Penpot MCP assumes you have existing designs and want AI to work with them, not replace them.

**Locofy, Anima, Builder.io** — These focus on design-to-code conversion with their own proprietary pipelines. They're opinionated about output format and don't give an LLM the ability to reason about your design file structure. Penpot MCP is more flexible but requires more technical setup.

### Verdict

Penpot MCP is the most honest attempt at AI-design integration I've seen. It doesn't promise to "convert Figma to code in one click" or generate entire designs from prompts. Instead, it gives an LLM structured access to a design file and lets the model figure out what to do. That's the right abstraction level — the tool provides data access, the AI provides reasoning.

The 308-star count reflects reality: this is a niche tool for a niche platform. But it's the official implementation from the Penpot team, it's architecturally sound, and it fills a real gap in the MCP ecosystem. If you're already using Penpot and experimenting with AI-assisted design workflows, this is worth setting up today. If you're on Figma and happy there, this alone won't convince you to switch — but it's a data point in Penpot's favor for teams that value open tooling and self-hosting.

The main risk is the bus factor. One contributor doing 96% of the work is fragile. But it's an official Penpot project, which means organizational backing exists even if the primary author moves on. Watch this space.
