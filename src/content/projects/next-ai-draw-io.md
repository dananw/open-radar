---
name: next-ai-draw-io
description: "AI-powered diagram creation tool built with Next.js and React that generates draw.io diagrams from natural language prompts — supports MCP, multiple LLM providers, and one-click deployment."
url: https://github.com/DayuanJiang/next-ai-draw-io
stars: 31470
forks: 3283
language: TypeScript
tags: ["ai", "nextjs", "react", "diagrams", "drawio", "mcp"]
featured: false
publishedAt: 2026-06-07
---

## Next AI Draw.io

### Overview

Next AI Draw.io is a web application that lets you create and modify draw.io diagrams using natural language. You type what you want — "Give me a RAG architecture diagram for a chat application" — and it generates a fully rendered diagram with proper connectors, labels, and layout. It hit 31,000 GitHub stars by doing one thing extremely well: making diagram creation feel like a conversation instead of a chore.

The project is built by Dayuan Jiang and runs on Next.js 16 with React 19, using the Vercel AI SDK for streaming responses and react-drawio for diagram rendering. It supports 15+ LLM providers out of the box — OpenAI, Anthropic, Google, DeepSeek, Ollama, AWS Bedrock, Azure OpenAI, and several Chinese providers including ByteDance Doubao and SiliconFlow. The demo site runs on glm-4.7, sponsored by ByteDance.

What separates this from "yet another AI wrapper" is the technical execution. The AI doesn't just produce images — it generates valid draw.io XML that you can open, edit, and export in any draw.io-compatible tool. The diagram history feature tracks every change with version control, so you can roll back any AI edit. And the MCP server integration means you can create diagrams directly from Claude Desktop, Cursor, or VS Code without opening a browser.

### Why it matters

Diagram creation is one of those tasks every developer does but nobody enjoys. You open draw.io, drag boxes, fight with connector routing, spend 20 minutes on alignment, and still end up with something that looks like it was made in a hurry. The typical developer creates 2-3 diagrams per week — architecture docs, system designs, onboarding materials, PRDs — and the tooling hasn't fundamentally changed in over a decade.

The AI diagram space is heating up. Excalidraw added AI features, Mermaid has AI integrations, and tools like Eraser.io have moved toward natural language. But Next AI Draw.io is different because it works with the actual draw.io format, not a proprietary one. That means your diagrams are portable. They work in Confluence, Notion, Google Docs, GitHub wikis — anywhere draw.io is embedded.

The MCP server angle is what makes this particularly interesting for the current moment. As AI coding agents become standard in developer workflows, the ability to generate diagrams programmatically — from a Claude Code session, from a Cursor agent, from a CI pipeline — is genuinely useful. The npm package `@next-ai-drawio/mcp-server` is a one-liner to add to your agent config.

### Key Features

**Natural Language Diagram Generation.** Type a description and get a complete draw.io diagram. The AI understands architecture patterns, flowcharts, sequence diagrams, and cloud infrastructure layouts. The recommended models are Claude Sonnet 4.5, GPT-5.1, Gemini 3 Pro, and DeepSeek V3.2/R1 — weaker models tend to produce malformed XML.

**Image-Based Diagram Replication.** Upload an existing diagram or even a hand-drawn sketch, and the AI will replicate it as a clean, editable draw.io diagram. This is surprisingly useful when you're working from screenshots of whiteboard sessions or old documentation.

**MCP Server for AI Agents.** The `@next-ai-drawio/mcp-server` package lets any MCP-compatible tool create diagrams programmatically. Add it to Claude Desktop, Cursor, or VS Code with a single config line. Your agent can generate architecture diagrams as part of its workflow without human intervention.

**Diagram History and Version Control.** Every AI edit is tracked with full version history. View diffs between versions, restore previous states, and see exactly what the AI changed. This solves the trust problem — if the AI makes a bad edit, you're one click away from reverting.

**Multi-Provider Support with BYOK.** Works with OpenAI, Anthropic, Google, AWS Bedrock, Azure OpenAI, Ollama, OpenRouter, DeepSeek, SiliconFlow, ModelScope, SGLang, and Vercel AI Gateway. Bring your own API key and it's stored locally in the browser — never sent to the server. Administrators can also configure server-side models for team use.

**Cloud Architecture Diagram Specialization.** The Claude models have been specifically trained on draw.io diagrams with AWS, Azure, and GCP architecture logos. If you need a cloud infrastructure diagram, Claude produces significantly better results than other providers — proper service icons, correct relationships, and standard layout conventions.

**PDF and Text File Upload.** Upload PDFs or text files and the AI extracts content to generate diagrams. Useful for converting technical documentation, meeting notes, or existing architecture docs into visual diagrams.

### Use Cases

- **System architecture documentation** — Generate infrastructure diagrams from text descriptions for onboarding docs, RFCs, or design reviews. A prompt like "Create a microservices architecture with API Gateway, auth service, user service, and PostgreSQL" produces a complete diagram in seconds.
- **Cloud migration planning** — Describe your current and target architecture, and the AI generates both diagrams side by side. Claude's training on cloud provider logos makes this especially effective.
- **Technical presentations** — Create diagrams for slide decks, blog posts, or conference talks without spending 30 minutes in a diagramming tool. The animated connectors feature adds visual polish.
- **MCP-powered agent workflows** — Integrate diagram generation into your AI coding agent's output. When Claude Code designs a system, it can also produce the architecture diagram as a deliverable.
- **Rapid prototyping** — Quickly sketch out ideas during brainstorming sessions. The conversational interface means you can iterate fast: "Add a cache layer between the API and database" and the diagram updates immediately.

### Pros and Cons

Pros:
- Generates valid, editable draw.io XML — not proprietary format, not images. Your diagrams work everywhere draw.io is supported.
- MCP server integration is genuinely useful and well-implemented. One npm command to add diagram generation to any AI agent workflow.
- 31K+ stars and active development with multiple deployment options (Vercel, Cloudflare Workers, EdgeOne Pages, Docker, desktop apps for Windows/macOS/Linux).
- Free to self-host with BYOK API keys. No vendor lock-in, no subscription fees.

Cons:
- Diagram quality is heavily model-dependent. Smaller models produce malformed XML. You need Claude Sonnet 4.5, GPT-5.1, or DeepSeek V3.2/R1 for reliable results — which means API costs.
- The draw.io XML format has limitations for complex layouts. Very large diagrams (50+ nodes) can get messy with connector routing.
- No real-time collaboration features. If you're looking for a Figma-like multiplayer experience, this isn't it — it's a single-user tool with version history.

### Getting Started

```bash
# Clone and run locally
git clone https://github.com/DayuanJiang/next-ai-draw-io
cd next-ai-draw-io
npm install
cp env.example .env.local
# Edit .env.local with your API key

# Start development server
npm run dev
# Open http://localhost:6002

# Or run with Docker
docker pull ghcr.io/dayuanjiang/next-ai-draw-io:latest
docker run -p 6002:6002 --env-file .env.local ghcr.io/dayuanjiang/next-ai-draw-io:latest

# Add MCP server to Claude Code
claude mcp add drawio -- npx @next-ai-drawio/mcp-server@latest
```

### Alternatives

**Excalidraw with AI** — Excalidraw is the gold standard for hand-drawn style diagrams and now has AI features through its Plus offering. It's better for freeform sketching and collaborative whiteboarding, but its AI capabilities are more limited than Next AI Draw.io's. Choose Excalidraw when you want that distinctive hand-drawn aesthetic or need real-time collaboration.

**Mermaid.js** — Mermaid generates diagrams from text-based descriptions using a markdown-like syntax. It's the go-to for developers who want diagrams-as-code that lives in their git repository. Mermaid is better for automated pipeline generation and version-controlled documentation, but it lacks the interactive chat interface and image replication capabilities. Choose Mermaid when your diagrams need to live in source control and be generated from CI/CD.

**Eraser.io** — Eraser.io offers AI-powered diagram creation with a focus on cloud architecture and technical documentation. It has a polished UI and good cloud provider integrations, but it's a SaaS product with pricing tiers. Choose Eraser.io when you want a hosted solution with team features and don't mind paying for it.

### Verdict

Next AI Draw.io is the best open-source option for AI-powered diagram creation right now. The 31K star count isn't inflated marketing — it reflects genuine developer adoption because the tool actually works. The draw.io XML output is the killer feature: your diagrams are portable, editable, and compatible with everything. The MCP server makes it a natural fit for AI-first development workflows, and the multi-provider support means you're not locked into a single LLM vendor. If you create diagrams regularly — and every developer does — this saves real time. Self-host it, plug in your API key, and you'll wonder how you ever manually dragged boxes around in draw.io.
