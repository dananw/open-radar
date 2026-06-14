---
name: json-render
description: "json-render is a Generative UI framework by Vercel Labs — AI generates dynamic interfaces from prompts, constrained to predefined components you define. React, Vue, Svelte, and 12 more renderers."
url: https://github.com/vercel-labs/json-render
stars: 15097
forks: 817
language: TypeScript
tags: ["generative-ui", "ai", "react", "framework", "vercel"]
featured: false
publishedAt: 2026-06-14
---

## json-render

### Overview

json-render is a Generative UI framework from Vercel Labs that hit 15,000 GitHub stars in about five months. The core idea is deceptively simple: instead of letting AI generate arbitrary HTML or React code (which is unpredictable and often broken), you define a catalog of allowed components with typed props, and AI generates a constrained JSON spec that maps to those components. The result is dynamic, personalized UIs that are actually safe to render in production.

The project comes from the Vercel Labs team, the same group behind Next.js, v0, and the AI SDK. That's relevant because Vercel has been pushing hard on the "AI generates UI" concept through v0.dev, and json-render is the open-source engine underneath that vision. Guillermo Rauch's team has been thinking about this problem space longer than almost anyone — they shipped the first streaming React Server Components in Next.js 13, and json-render is the logical extension: what if the server doesn't just fetch data, but generates the entire UI spec?

The problem it solves is real. Every AI coding assistant today can generate React components, but the output is inconsistent. One prompt gives you a working dashboard, the next gives you broken JSX with missing imports. json-render flips the model: instead of AI writing code, AI writes JSON that maps to a fixed set of components. You get the flexibility of generative AI with the reliability of a component library. The framework supports 15+ renderers including React, Vue, Svelte, Solid, React Native, Next.js (full app generation with routes and layouts), Remotion (video), React PDF, React Email, Three.js, and even terminal UIs via Ink.

### Why it matters

The "Generative UI" space is heating up fast. Google has GenUI, Microsoft is experimenting with AI-generated interfaces in Copilot, and Vercel's v0 has been the poster child for this approach. But most implementations are either closed-source or tightly coupled to a specific AI provider. json-render is the first open-source framework that decouples the generation layer from the rendering layer, making it genuinely portable.

For fullstack developers, this changes the calculus on AI-assisted UI development. Instead of using AI to write component code that you then review, debug, and maintain, you define your component catalog once — with Zod schemas, descriptions, and action handlers — and let any LLM generate UI specs within those guardrails. The AI can't hallucinate components that don't exist. It can't generate invalid props because the schema enforces correctness. And you can stream the output progressively, so the UI appears as the model generates it.

The timing is also significant. As AI agents become more capable, they need a way to generate user interfaces dynamically — dashboards that adapt to the data, settings panels that change based on configuration, reports that structure themselves around the content. json-render gives agents a structured way to do this without the chaos of raw code generation.

### Key Features

**Catalog-Based Guardrails.** The most important design decision in json-render is the catalog system. You define which components AI can use, what props they accept (with Zod schemas), and what actions they can trigger. AI can only generate specs that reference components in your catalog. This eliminates the entire class of bugs where AI generates components that don't exist or passes invalid props. The catalog also serves as documentation — `catalog.prompt()` generates a system prompt from your component definitions that any LLM can use.

**15+ Renderer Targets.** A single JSON spec can render across React, Vue, Svelte, SolidJS, React Native, Next.js, Remotion video, React PDF, React Email, Three.js, Ink terminal UIs, and SVG/PNG images. This is not a gimmick — each renderer is a separate package with its own optimized rendering path. Define your catalog once, render it everywhere. The `@json-render/shadcn` package ships 36 pre-built shadcn/ui components so you can start immediately without defining your own.

**Streaming with SpecStream.** AI responses are streamed chunk by chunk, and `createSpecStreamCompiler` parses partial JSON into renderable specs as they arrive. The UI updates progressively — users see components appear as the model generates them, not after a loading spinner. This is critical for production UX because LLM responses can take several seconds. The compiler handles incomplete JSON gracefully, so you never get parse errors mid-stream.

**Dynamic Props and State Management.** Any prop value can be a data-driven expression. Use `$state` to read from a shared state model, `$cond` for conditional values, `$template` for string interpolation, and `$computed` for registered functions. Components can trigger `setState` actions, and state watchers fire side effects when values change. This gives you a reactive data flow without writing imperative code — the JSON spec declaratively describes both the UI structure and its behavior.

**Next.js Full App Generation.** The `@json-render/next` package goes beyond component rendering. You can define an entire Next.js app as a JSON spec — routes, layouts, metadata, SSR configuration, and page content. `createNextApp()` generates the actual Next.js page components and `generateMetadata` functions from the spec. This is where the "Generative UI" concept gets genuinely powerful: an AI agent can scaffold a complete multi-page application from a single prompt.

**Devtools.** A drop-in inspector panel (available for React, Vue, Svelte, and Solid) shows the spec tree, state editor, action log, stream log, and catalog browser. Toggle it with Ctrl+Shift+J. It tree-shakes to null in production builds. This is the kind of developer experience investment you'd expect from a Vercel project — they clearly understand that debugging AI-generated UIs needs specialized tooling.

**MCP Integration.** The `@json-render/mcp` package integrates with Claude, ChatGPT, Cursor, and VS Code through the Model Context Protocol. This means AI tools can discover your component catalog, generate specs, and render previews directly in your editor. It closes the loop between "AI thinks about UI" and "UI appears on screen."

### Use Cases

- **AI-powered dashboards** — Let users describe a dashboard in natural language and get a working one rendered from your predefined chart, metric, and layout components. The AI generates the spec, you render it.
- **Dynamic report generation** — Build systems where data analysts request reports and the AI assembles them from table, chart, and text components. Export to PDF via `@json-render/react-pdf` or email via `@json-render/react-email`.
- **Agent-generated interfaces** — When AI agents need to present information to users (settings panels, confirmation dialogs, data entry forms), they generate specs instead of raw HTML. The output is always structured and valid.
- **Multi-platform content creation** — Write content once as a JSON spec and render it as a web page, mobile screen, email, PDF document, or video. The Remotion renderer even supports timeline-based video composition.
- **Rapid prototyping with v0-style workflows** — Build internal tools where non-developers describe what they want and get working UIs immediately, constrained to your design system components.

### Pros and Cons

Pros:

- The catalog-based guardrail system is genuinely novel and solves the biggest problem with AI-generated UIs — unpredictability. You know exactly what the output can contain before the AI generates anything.
- The breadth of renderer support is impressive. 15+ targets from a single spec format, including mobile (React Native), video (Remotion), documents (PDF), and 3D (Three.js) is not something any competing framework offers.
- Streaming support is production-ready. The SpecStream compiler handles partial JSON gracefully, which matters because users shouldn't stare at loading spinners while waiting for LLM responses.
- Vercel Labs backing means this has real engineering investment. The devtools, MCP integration, and comprehensive TypeScript types suggest this is a long-term project, not a hackathon prototype.

Cons:

- The learning curve is steeper than it looks. Understanding the catalog system, spec format, dynamic props expressions, state management, and streaming API requires reading substantial documentation. It's a new mental model, not just a new library.
- Vendor coupling to Vercel's ecosystem is a concern. While the framework is open-source and framework-agnostic in theory, the best integrations (Next.js app generation, shadcn components, v0 workflow) are tightly coupled to Vercel's stack.
- The JSON spec format adds indirection. For simple UIs, writing a JSON spec is more verbose than writing JSX directly. The value only appears when AI is generating the specs — for hand-written UIs, it's overhead.
- 93 open issues and a fast-moving API suggest the project is still evolving rapidly. Breaking changes are likely as the team iterates on the spec format and renderer APIs.

### Getting Started

```bash
# Install for React
npm install @json-render/core @json-render/react

# Or with pre-built shadcn/ui components
npm install @json-render/core @json-render/react @json-render/shadcn

# Define a catalog
# catalog.ts
import { defineCatalog } from "@json-render/core";
import { schema } from "@json-render/react/schema";
import { z } from "zod";

const catalog = defineCatalog(schema, {
  components: {
    Card: {
      props: z.object({ title: z.string() }),
      description: "A card container with a title",
    },
    Button: {
      props: z.object({
        label: z.string(),
        action: z.string(),
      }),
      description: "Clickable button that triggers an action",
    },
  },
  actions: {
    export_report: { description: "Export dashboard to PDF" },
  },
});

// Generate a system prompt for your AI
const systemPrompt = catalog.prompt();

// Render the AI-generated spec
import { defineRegistry, Renderer } from "@json-render/react";

const { registry } = defineRegistry(catalog, {
  components: {
    Card: ({ props, children }) => (
      <div className="rounded-lg border p-4">
        <h3 className="font-semibold">{props.title}</h3>
        {children}
      </div>
    ),
    Button: ({ props, emit }) => (
      <button onClick={() => emit("press")}>{props.label}</button>
    ),
  },
});

// In your component:
<Renderer spec={aiGeneratedSpec} registry={registry} />;
```

### Alternatives

**v0.dev** — Vercel's own hosted Generative UI product that uses json-render under the hood. v0 is a polished, zero-setup experience where you describe UIs in natural language and get live previews. Choose v0 when you want the fastest path from prompt to working UI without managing infrastructure. Choose json-render when you need to embed Generative UI capabilities into your own product, customize the component catalog, or run everything self-hosted.

**AI SDK UI** — Vercel's AI SDK has its own `ai/rsc` streaming UI primitives for React Server Components. It's designed for chat-based interfaces where AI generates React components on the server and streams them to the client. Choose AI SDK UI when you're building conversational AI experiences with freeform component generation. Choose json-render when you need guardrailed generation with a fixed component catalog, multi-framework support, or output targets beyond web UI (PDF, email, video).

**Claude Artifacts / OpenAI Canvas** — Provider-specific features that let AI generate and preview UI code in a sandbox. They're convenient for one-off prototyping but tightly coupled to their respective platforms. Choose them for quick exploration. Choose json-render when you need production-grade generative UI that works with any LLM, renders in your application, and supports your design system.

### Verdict

json-render is the most thoughtful approach to AI-generated UIs I've seen in open source. The catalog-based guardrail system is the key insight — it turns the unpredictable nature of LLM output into something deterministic enough for production use. At 15,000 stars and backed by Vercel Labs, it has the momentum and engineering investment to become the standard way applications integrate generative UI capabilities. The 15+ renderer targets are genuinely impressive, especially the Next.js full-app generation and Remotion video support. If you're building any product where AI needs to create user interfaces — dashboards, reports, settings panels, agent interfaces — this is the framework to evaluate first. The learning curve is real, but the payoff is a system where AI-generated UIs are actually reliable.
