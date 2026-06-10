---
name: agent-html
description: "Agent-HTML turns AI agent outputs into rich interactive React canvas artifacts — the antidote to walls of markdown text from coding agents."
url: https://github.com/Sayhi-bzb/Agent-HTML
stars: 617
forks: 21
language: TypeScript
tags: ["ai-agents", "react", "canvas", "developer-tools", "shadcn"]
featured: false
publishedAt: 2026-06-10
---

## Agent-HTML

### Overview

Agent-HTML is a framework that replaces markdown-heavy AI agent output with rich, interactive React artifacts rendered on a canvas. It hit 600 stars in its first month after launching in May 2026, which tracks with the frustration developers feel watching their coding agents produce endless walls of text when what they really need is a dashboard, a Kanban board, or a data table.

The project comes from Sayhi-bzb, a developer active in the Chinese-language linux.do community where agent tooling discussions are particularly lively. The team built Agent-HTML after repeatedly running into the same problem: AI agents like Claude Code, Cursor, and Codex generate impressive code, but the output format — markdown — can't express layout, interactivity, data visualization, or spatial relationships. You get a great explanation of what the dashboard should look like, but not the dashboard itself.

The core idea is simple but the execution is thoughtful. Instead of asking agents to dump markdown, Agent-HTML gives them a structured workspace where they write React and TypeScript artifacts. These artifacts live in your filesystem, use shadcn/ui components, and render through a Vite-powered canvas host. The host discovers artifacts, applies themes, overlays block inspection controls, and routes prompts back to the agent for targeted revisions. Your agent's output becomes a living, editable interface — not a static document.

### Why it matters

Every major AI coding tool — Claude Code, Cursor, Codex, GitHub Copilot — currently defaults to markdown for structured output. That made sense two years ago when agents were primarily explaining code. It doesn't make sense anymore. Agents now generate full dashboards, comparison views, data reports, and workflow interfaces. Forcing those through markdown is like asking a designer to present mockups as a Word document.

The broader trend is clear: AI agents are becoming primary producers of user interfaces, not just code. Vercel's v0 showed the demand for AI-generated UI, but v0 is a hosted service with its own rendering environment. Agent-HTML takes the opposite approach — everything runs locally, artifacts live in your repo, and the agent works within your existing React and TypeScript stack. No vendor lock-in, no external service dependency.

This matters for fullstack developers specifically because it bridges the gap between agent-generated code and production-ready UI. If you're building tools where AI agents need to present information — internal dashboards, data exploration interfaces, report generators — Agent-HTML gives you a protocol for that without reinventing the rendering layer each time.

### Key Features

**Block-Based Artifact Protocol.** Each artifact is composed of addressable blocks with stable IDs and metadata. The canvas host can target individual blocks for inspection, prompt routing, and revision. This means your agent can update a single chart in a dashboard without regenerating the entire page. The `@agent-html/react` package provides headless `Artifact` and `Block` components that handle the protocol layer.

**Inspectable Canvas Host.** The Vite-powered canvas host does more than render. It discovers artifacts in your workspace, overlays inspection controls on each block, routes block-level prompts back to the agent, and applies theme presets. When you click a block, the host passes compact context — block ID, implementation files, interaction state — so the agent can make targeted revisions without losing the broader context.

**Theme System with Semantic Tokens.** Artifacts use semantic CSS classes and Canvas-specific design tokens instead of hardcoded styles. The host can apply theme presets (dark mode, light mode, custom brand themes) while artifact source stays on the semantic layer. This separation means artifacts look consistent across different contexts without each one managing its own theme logic.

**Local-First Workspace Architecture.** Everything lives in your filesystem: artifacts, rules, resources, examples, data, schemas, fixtures, and assets. The workspace structure is documented in AGENTS.md so coding agents know exactly where to find and place files. There's no cloud dependency, no API keys, no external service. The canvas host runs on your machine via `npx agent-html dev`.

**Agent-Native Design System.** The project ships with a curated set of UI primitives, hooks, helpers, schemas, and fixtures designed for agent consumption. The `taste/` directory contains judgment systems and ergonomics guidelines that help agents produce higher-quality artifacts. This is opinionated tooling — it tells agents not just how to render, but how to design.

**shadcn/ui Integration.** Artifacts use shadcn/ui components as the default primitive layer. If you're already using shadcn in your project, the artifacts integrate naturally. If not, the component layer is abstracted enough to swap in alternatives. The choice of shadcn reflects the project's TypeScript-first, design-system-aware philosophy.

### Use Cases

- **AI-generated internal dashboards** — When an agent needs to present operational data, metrics, or system status, Agent-HTML turns that into a real dashboard with charts, tables, and filters instead of a markdown table.

- **Data exploration interfaces** — Agents processing datasets can output interactive tables with sorting, filtering, and detail views. The block protocol lets the agent update individual data panels without re-rendering the whole view.

- **Comparison and review surfaces** — Side-by-side comparisons, code review interfaces, or A/B test results benefit from spatial layout that markdown can't express. Blocks give reviewers stable targets for feedback.

- **Report generators** — Themed reports with hierarchy, charts, and visual density. The theme system means reports look professional without the agent spending tokens on CSS.

- **Workflow and process visualization** — Kanban boards, pipeline views, and state machine diagrams that agents can build and humans can interact with. The artifact stays editable after the initial generation.

### Pros and Cons

Pros:

- Solves a real and growing problem: agents produce rich outputs that markdown can't express. The 600-star growth in one month suggests the developer community feels this pain acutely.
- Local-first architecture means no vendor lock-in, no API keys, no external services. Artifacts live in your repo and render on your machine.
- The block protocol is the real innovation — targeted revision of individual UI regions without full-page regeneration. This makes agent-human collaboration genuinely productive.
- Built on shadcn/ui and TypeScript, which aligns with how modern frontend teams actually build. No exotic dependencies or unfamiliar patterns.

Cons:

- Alpha stage (v0.1.0-alpha.2) means the API surface will change. Production adoption today carries migration risk.
- Only works with React and TypeScript. If your stack is Vue, Svelte, or plain HTML, you're out of luck for now.
- Requires coding agents that understand the Agent-HTML protocol. Most agents today default to markdown, so you need to configure prompts or use the provided AGENTS.md instructions.
- The 617-star community is still small. Finding answers to edge cases means reading source code, not Stack Overflow.

### Getting Started

```bash
# Install the npm package
npm install agent-html

# Create a local Canvas workspace
npx agent-html init

# Start the Canvas host
npx agent-html dev
```

The host starts on localhost and discovers artifacts in `agent-html/artifacts/`. Point your coding agent at the workspace:

```text
Build a dashboard artifact in agent-html/artifacts using Agent-HTML Canvas.
Read agent-html/README.md and agent-html/AGENTS.md first.
```

Run quality checks:

```bash
npm run test
npm run typecheck
npm run lint
```

### Alternatives

**Vercel v0** — A hosted AI UI generation service that renders React components in a sandbox. v0 is polished and fast, but it's a cloud service with usage limits. Choose v0 when you want quick prototypes without local setup. Choose Agent-HTML when you want artifacts that live in your repo and integrate with your existing stack.

**Claude Artifacts (Anthropic)** — Claude's built-in artifact rendering for code, charts, and documents. Artifacts work well for one-off outputs but disappear into chat history. Agent-HTML artifacts persist in your filesystem, use your design system, and support targeted revision through the block protocol. Choose Claude Artifacts for throwaway exploration; choose Agent-HTML when the output needs to last.

**bolt.new / Lovable** — AI-powered full-stack app generators that scaffold entire projects from prompts. These tools solve a different problem — generating complete applications rather than individual UI surfaces. Choose bolt.new when you need a whole app. Choose Agent-HTML when your agent needs to present specific information within an existing project.

### Verdict

Agent-HTML is the most pragmatic response I've seen to the "agents output markdown but humans need interfaces" problem. The block protocol alone — letting agents revise individual UI regions without full regeneration — is a genuine contribution to the agent-tooling space. At 617 stars and alpha stage, it's early. But the architectural decisions are sound: local-first, TypeScript-native, shadcn-based, and designed for agent workflows from day one. If you're building systems where AI agents need to present rich information to humans — dashboards, reports, data views — Agent-HTML deserves a serious look. The 600-star growth in its first month suggests the developer community agrees that markdown is no longer enough.
