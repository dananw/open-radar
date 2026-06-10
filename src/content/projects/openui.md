---
name: openui
description: "OpenUI is an open standard for generative UI — a streaming-first language and React runtime that lets LLMs render structured interfaces with 67% fewer tokens than JSON."
url: https://github.com/thesysdev/openui
stars: 6909
forks: 520
language: TypeScript
tags: ["generative-ui", "react", "llm", "streaming", "ai-agents", "typescript"]
featured: false
publishedAt: 2026-06-11
---

## OpenUI

### Overview

OpenUI is a full-stack generative UI framework that gives LLMs a structured way to render interfaces in real time. It hit 6,900 GitHub stars by mid-2026, and the growth curve has been steep — the project launched in December 2024 and has been gaining momentum as the "generative UI" category heats up. The core idea is deceptively simple: instead of having an AI model output JSON blobs that your frontend parses into components, you give it a compact, streaming-first language called OpenUI Lang that maps directly to your component library.

The project comes from Thesys, a company building infrastructure for AI-native interfaces. Their bet is that the current approach to AI-generated UI — stuffing JSON into a streaming response and hoping your parser handles partial input gracefully — is fundamentally broken. They're not wrong. Vercel's AI SDK uses JSON-based streaming for generative components, and it works, but the token overhead is brutal. OpenUI's benchmarks show their language uses 52.8% fewer tokens than Vercel's JSON-Render format across seven common UI scenarios. For a dashboard page, that's 1,226 tokens versus 2,247. For a contact form, 294 versus 893. Those numbers add up fast when you're paying per token at scale.

The architecture is clean. You define a component library with Zod schemas for type-safe props. The framework generates system prompts from that library, telling the model exactly what components are available and how to use them. The model streams back OpenUI Lang tokens, and the renderer progressively builds the UI as tokens arrive — no buffering the full response, no parse-and-replace cycle. The result is a React component tree that updates in real time, exactly like streaming text in a chat interface, but for structured UI.

### Why it matters

If you're building anything with AI that goes beyond a chat box — copilots, dashboards that configure themselves, dynamic forms that adapt to user intent, product pages generated from natural language — you've hit the same wall. The model generates something that looks like UI, but getting from "model output" to "rendered React components" involves parsing, validation, error handling for partial responses, and a token budget that makes your CFO nervous. Every team building AI-native interfaces is solving this problem independently, usually badly.

OpenUI is the first serious attempt at standardizing this layer. The comparison table in their docs is telling: against Vercel's json-render, Google's A2UI, and CopilotKit's approach, OpenUI consistently uses fewer tokens (3-4x less in some cases) and delivers lower streaming latency (4.9 seconds versus 14.2 seconds at 60 tokens/second for a simple table). The latency difference alone changes the user experience — sub-5-second progressive rendering feels responsive, while 14 seconds feels like waiting.

The timing connects to a broader shift. AI agents are moving from "answer questions" to "take actions," and actions need interfaces. MCP gave agents tools. OpenUI gives them the ability to generate the interface for using those tools. If you're building with React and care about where AI-native UX is headed, this is worth understanding now rather than catching up later.

### Key Features

**OpenUI Lang.** A compact, streaming-first language purpose-built for model-generated UI. Unlike JSON, it's designed to be emitted token-by-token and parsed incrementally. The syntax is concise — a contact form takes 294 tokens in OpenUI Lang versus 893 in Vercel's JSON format. The language supports typed props, nested components, and dynamic content, all streamable.

**Prompt Generation from Component Libraries.** You define your components with Zod schemas, and OpenUI generates the system prompt automatically. The model only sees the components you've registered — it can't hallucinate a `<DatePicker>` if you haven't defined one. This constraint-based approach means the model's output is always renderable, and you control the design system at the infrastructure level.

**Streaming Renderer.** The React renderer parses OpenUI Lang tokens as they arrive and builds the component tree progressively. No buffering, no waiting for the full response. Users see UI elements appear in real time, the same way streaming text appears in ChatGPT. The renderer handles partial input gracefully — if the stream cuts off mid-component, you get a sensible fallback rather than a crash.

**Built-in Component Libraries.** Ships with two libraries out of the box: charts, forms, tables, layouts, pricing cards, and more. You can use them as-is, extend them, or replace them entirely with your own design system. The component definitions are just Zod schemas and React components — no magic, no proprietary format.

**Headless Chat Infrastructure.** The `@openuidev/react-headless` package provides chat state management, streaming adapters, and message format converters. It handles the messy parts of building a chat interface — message ordering, streaming state, error recovery — so you can focus on the UI layer. Compatible with OpenAI, Anthropic, and other providers.

**Multi-Platform Output.** The same component definitions and OpenUI Lang output work across web, mobile, and email. The comparison table shows OpenUI supporting web, mobile, and email, while competitors like Vercel are limited to web only. This matters if you're building AI features that need to render in multiple contexts.

**Agent Skill Integration.** Ships with an agent skill for Claude Code, Codex, Cursor, and other AI coding assistants. The skill teaches the assistant how to scaffold, build, and debug OpenUI apps. It's a meta-touch — using AI tooling to build AI-generated UI — but it works, and it lowers the barrier to getting started.

### Use Cases

- **AI copilots with rich responses** — Instead of returning plain text, your copilot renders interactive charts, forms, and data tables inline. Users can fill out a form or filter a table directly in the chat response, no context switch required.

- **Dynamic dashboards** — An operations team describes what they want to see in natural language, and the model generates a dashboard layout with the right charts, filters, and data tables. The layout updates as requirements change.

- **E-commerce product pages** — Generate product detail pages from structured data, with images, pricing, reviews, and related items rendered as a complete UI rather than a JSON blob that needs frontend parsing.

- **Internal tools and admin panels** — Build admin interfaces that adapt to the data model. Describe a CRUD interface for a new entity, and the model generates the table, form, and detail views using your component library.

- **AI-native SaaS features** — Any SaaS product adding AI features needs a way to render structured responses. OpenUI gives you a standard format instead of building custom parsing logic for every AI-generated UI element.

### Pros and Cons

Pros:
- 52.8% fewer tokens than Vercel's JSON-Render across benchmarks. At scale, this translates directly to cost savings and lower latency — the kind of improvement that makes architecture reviews easy to pass.
- Streaming-first design means progressive rendering works out of the box. No custom partial-parsing logic, no buffering strategies to debug.
- Component library constraints prevent the model from generating unrenderable output. The Zod schema approach means type safety from prompt to render.
- MIT licensed with active development — 65 open issues and daily commits through June 2026 suggest a healthy project, not a dead repo.

Cons:
- 6,900 stars is respectable but still early-stage adoption. The ecosystem of pre-built component libraries and examples is thin compared to more established UI frameworks.
- Requires buy-in to OpenUI Lang as a format. If you've already invested in Vercel's AI SDK or a custom JSON-based approach, migrating means rewriting your prompt engineering and rendering pipeline.
- The comparison benchmarks are self-reported and tested with tiktoken on GPT-5's encoder. Real-world performance varies by model, response complexity, and streaming infrastructure — take the exact percentages as directional, not absolute.
- Documentation exists at openui.com but the docs site is still evolving. Some advanced patterns (custom renderers, complex nesting, error boundary integration) require reading source code rather than guides.

### Getting Started

```bash
# Scaffold a new OpenUI app with the CLI
npx @openuidev/cli@latest create --name my-genui-app
cd my-genui-app

# Add your API key
echo "OPENAI_API_KEY=your-key-here" > .env

# Start the dev server
npm run dev
```

This gives you a working app with streaming, built-in UI components, and OpenUI Lang support. Open `http://localhost:3000` and start chatting.

To add OpenUI to an existing React project:

```bash
# Install the core packages
npm install @openuidev/react-lang @openuidev/react-ui @openuidev/react-headless
```

Define a component library and generate prompts:

```typescript
import { defineComponents, generatePrompt } from '@openuidev/react-lang';
import { z } from 'zod';

// Define what the model can render
const components = defineComponents([
  {
    name: 'MetricCard',
    schema: z.object({
      title: z.string(),
      value: z.string(),
      trend: z.enum(['up', 'down', 'neutral']),
    }),
    render: ({ title, value, trend }) => (
      <div className="metric-card">
        <h3>{title}</h3>
        <span className="value">{value}</span>
        <span className={`trend ${trend}`}>{trend === 'up' ? '↑' : '↓'}</span>
      </div>
    ),
  },
]);

// Generate the system prompt for your LLM
const systemPrompt = generatePrompt(components);
```

### Alternatives

**Vercel AI SDK (json-render)** — The most widely adopted approach for generative UI in the React ecosystem. Vercel's SDK uses JSON-based streaming and has excellent documentation, a large community, and tight Next.js integration. Choose it if you're already on the Vercel stack and the 3x token overhead isn't a dealbreaker for your use case. OpenUI is the better fit when token efficiency and streaming latency matter — high-volume applications, cost-sensitive deployments, or real-time interactive interfaces.

**CopilotKit** — A React framework specifically for building AI copilots and chat interfaces. CopilotKit focuses on the copilot UX pattern — in-app assistants that understand context and can take actions. It's more opinionated about the interaction model (chat-centric) and uses more tokens per UI generation. Choose CopilotKit if you want a batteries-included copilot framework. Choose OpenUI if you need a general-purpose generative UI layer that works in chat, dashboards, product pages, and beyond.

**Google A2UI** — Google's approach to AI-to-UI generation, still relatively early. A2UI uses a JSON-based format with similar token counts to Vercel's approach. The advantage is Google's backing and potential integration with Gemini and Android. The disadvantage is less community adoption and a narrower component model. Worth watching, but not yet mature enough for production use outside Google's ecosystem.

### Verdict

OpenUI is the most practical answer I've seen to the "how do LLMs render UI" problem. The token efficiency numbers aren't marketing fluff — they're a direct consequence of designing a language specifically for streaming model output rather than retrofitting JSON. At 52.8% fewer tokens than the leading alternative, this isn't a marginal improvement. It's the difference between a generative UI feature being economically viable at scale and being a cost center you have to justify in every sprint review.

The project is early. 6,900 stars, active but small contributor base, documentation that's good but not exhaustive. If you need a production-ready solution with enterprise support tomorrow, Vercel's AI SDK is safer. But if you're building AI-native interfaces and you care about where the standard lands — and you should, because this category is going to converge on something — OpenUI's approach is the one I'd bet on. The streaming-first design, the component constraint model, and the token efficiency are the right architectural choices. The question is whether the ecosystem catches up. Given the active development cadence and the clear technical advantages, I think it will.
