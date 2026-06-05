---
name: tambo
description: "Tambo is an open-source generative UI SDK for React that lets AI agents render your components with streaming props — 11K stars and growing fast."
url: https://github.com/tambo-ai/tambo
stars: 11162
forks: 568
language: TypeScript
tags: ["generative-ui", "react", "ai-agents", "llm", "open-source"]
featured: false
publishedAt: 2026-06-06
---

## Tambo

### Overview

Tambo is a React toolkit for building AI agents that render actual UI components instead of just text. It crossed 11,000 GitHub stars in early June 2026, and the trajectory makes sense — it solves a problem every React developer hitting the AI space runs into eventually: how do you get an LLM to render a chart, a form, or a dashboard instead of vomiting markdown?

The project comes from a small, focused team. Alec Flett (alecf), a former Google engineer with deep frontend infrastructure experience, leads development with Michael Milstead. The team shipped Tambo 1.0 in early 2026 after about 18 months of iteration. The commit history shows consistent, meaningful work — 586 contributions from the lead developer alone, with active community involvement on Discord.

The core problem Tambo addresses: when you add an AI chatbot to a React app, you typically get a text box that returns strings. But your app has components — charts, tables, forms, task boards. Tambo bridges that gap. You register your React components with Zod schemas describing their props. Those schemas become tool definitions that the LLM can call. When the user says "show me sales by region," the agent picks your `<Chart>` component and streams the appropriate props. The result is a real, interactive component — not a text description of one.

### Why it matters

The AI-assisted development space has been dominated by two paradigms: chat interfaces that return text, and code generation that outputs raw HTML/JSX. Both miss the point for production applications. You already have a component library. You already have design systems. What you need is a way for AI to orchestrate those components intelligently, not generate new ones from scratch.

Tambo fills this gap with an architecture that respects how React apps actually work. Components stay in your codebase. Schemas define the contract. The AI decides which component to use and what props to pass. This is fundamentally different from Vercel's AI SDK (which focuses on streaming text and tool calls) or LangChain's agent framework (which is backend-first). Tambo is the only project I've seen that treats the React component tree itself as the agent's output surface.

The MCP integration angle is also worth noting. Tambo supports the Model Context Protocol natively, so you can connect your agent to Linear, Slack, databases, or custom MCP servers. This positions it as the frontend layer for the emerging MCP ecosystem — a role that no other React library is filling well right now.

### Key Features

**Component Registration with Zod Schemas.** Register any React component with a name, description, and Zod props schema. The schema is automatically converted to LLM tool definitions. No manual JSON Schema authoring, no boilerplate. The agent sees your components as callable functions and picks the right one based on user intent.

**Generative and Interactable Components.** Two interaction modes. Generative components render once in response to a message — charts, summaries, data visualizations. Interactable components persist across the conversation and can be updated by the user or the agent. A task board that the AI populates, then the user reorders. A form that the agent pre-fills, then the user edits. This distinction is what makes Tambo feel like a real product framework, not a demo.

**Streaming Props.** Props stream to your components as the LLM generates them. This means a chart starts rendering with partial data while the rest streams in. Cancellation, error recovery, and reconnection are handled by the SDK. Users see progress, not spinners.

**MCP Protocol Support.** Full MCP integration — tools, prompts, elicitations, and sampling. Connect to any MCP server (Linear, Slack, Postgres, custom) and the agent can use those tools alongside your UI components. The protocol is becoming the standard for AI tool connectivity, and Tambo's native support means you don't need a separate adapter layer.

**Local Tools for Browser-Side Operations.** Define functions that run in the browser — DOM manipulation, authenticated API calls, access to React state. The AI can call these just like it calls MCP tools. This matters for operations that need client-side context: reading the current scroll position, triggering a file download, or accessing a browser API.

**Self-Hosted or Cloud Backend.** Tambo Cloud is a hosted backend that manages conversation state and agent orchestration, free to start. The self-hosted option runs the same backend via Docker on your infrastructure. No vendor lock-in at the infrastructure level, which is important for enterprise adoption.

**Pre-Built Component Library.** A companion UI library at ui.tambo.co provides ready-made components for common agent patterns — chat interfaces, message bubbles, tool call displays, and generative UI primitives. You can use them as-is or as reference for building your own.

### Use Cases

- **AI-powered analytics dashboards** — Users ask questions in natural language and get real charts, tables, and KPI cards rendered from their data. No query building, no SQL knowledge required.
- **Customer support tools** — Agents that render ticket details, user profiles, and action buttons inline. Support staff interact with structured UI instead of reading text dumps.
- **Internal admin panels** — CRUD interfaces where the AI pre-fills forms, suggests actions, and renders data grids based on conversational context.
- **Project management assistants** — Task boards, timelines, and kanban views that the AI populates from meeting notes or Slack messages, then users refine manually.
- **E-commerce product configurators** — Agents that render product options, comparison tables, and checkout flows as users describe what they want in natural language.

### Pros and Cons

Pros:
- Solves a real architectural problem — no other React library treats the component tree as an agent output surface. Vercel's AI SDK and LangChain don't compete directly.
- Zod-first design means TypeScript developers get end-to-end type safety from schema to rendered component. No type gymnastics, no `any` casts.
- Active development with 2,900+ commits and a responsive Discord community. The team ships regularly — the June 2026 migration to Next.js 16 and React 19 shows they keep up with the ecosystem.

Cons:
- The 1.0 label is recent (early 2026), and 40 open issues suggest the API surface is still settling. Production adoption right now requires tolerance for breaking changes.
- Requires either Tambo Cloud or self-hosted infrastructure. The cloud tier is free to start but pricing at scale isn't published yet. Self-hosted means running another service.
- The LLM cost model means every component render involves an API call. For high-traffic applications, the per-interaction cost of agent-driven UI needs careful budgeting.

### Getting Started

```bash
# Create a new Tambo project
npm create tambo-app my-tambo-app
cd my-tambo-app
npm run dev
```

Register your first component:

```tsx
import { TamboComponent } from "@tambo-ai/react";
import { z } from "zod";

const components: TamboComponent[] = [
  {
    name: "Chart",
    description: "Displays data as charts using Recharts",
    component: Chart,
    propsSchema: z.object({
      data: z.array(z.object({ name: z.string(), value: z.number() })),
      type: z.enum(["line", "bar", "pie"]),
    }),
  },
];
```

Wrap your app with the provider:

```tsx
<TamboProvider
  apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
  userKey={currentUserId}
  components={components}
>
  <Chat />
</TamboProvider>
```

Use the hooks to build your chat interface:

```tsx
const { messages, isStreaming } = useTambo();
const { value, setValue, submit, isPending } = useTamboThreadInput();
```

### Alternatives

**Vercel AI SDK** — The most popular choice for adding AI to React apps, but it focuses on streaming text and tool calls, not component rendering. You get `useChat` and `useCompletion` hooks, but rendering a `<Chart>` from a tool call result requires manual wiring. Choose Vercel AI SDK when you need streaming text with occasional structured output, not full generative UI.

**LangChain.js** — A backend-first agent framework with a JavaScript SDK. LangChain excels at complex agent chains, RAG pipelines, and multi-step reasoning. But it doesn't know about React components. You'd build the agent in LangChain and manually map outputs to UI. Choose LangChain when your agent complexity is the primary challenge, not the UI rendering.

**Vercel v0** — A code generation tool that produces React components from natural language. v0 generates new components; Tambo orchestrates existing ones. They solve different problems. Choose v0 when you're prototyping new UI from scratch. Choose Tambo when you have a component library and want AI to use it intelligently.

### Verdict

Tambo is the most compelling approach to generative UI in React I've seen. The Zod-first component registration is elegant — it turns your existing component library into an agent's toolkit without boilerplate. The 11K stars and active Discord community suggest real developer adoption, not just hype bookmarks. The main risk is maturity: 1.0 shipped recently, the API will evolve, and production use today requires confidence in the team's trajectory. But if you're building an AI-powered React app in mid-2026 and you want the agent to render real components instead of text, Tambo is the best option available. The MCP integration alone makes it worth evaluating as the frontend layer for any agent system.
