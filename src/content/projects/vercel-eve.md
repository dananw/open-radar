---
name: vercel-eve
description: "Vercel's filesystem-first framework for building durable AI agents in TypeScript — author agents as directories with tools, skills, and schedules as files."
url: https://github.com/vercel/eve
stars: 358
forks: 11
language: TypeScript
tags: ["ai-agents", "typescript", "vercel", "framework", "durable-agents"]
featured: false
publishedAt: 2026-06-18
---

## Vercel Eve

### Overview

Eve is Vercel's new open-source framework for building durable AI agents, and it landed on GitHub on June 16, 2026. In less than two days it pulled in 358 stars — which tracks, because anything Vercel ships gets immediate attention from the TypeScript community. But the speed of adoption here isn't just brand recognition. Eve solves a real problem: building agents today means writing a lot of glue code to wire together models, tools, memory, scheduling, and deployment. Eve collapses that into a filesystem convention.

The project is built by Vercel, the company behind Next.js, Turborepo, v0, and the Vercel deployment platform. Their track record with developer tooling is strong — Next.js has over 128K GitHub stars and dominates the React ecosystem. With Eve, they're applying the same philosophy that made Next.js successful (file-system conventions, sensible defaults, TypeScript-first) to the AI agent space. The framework is Apache-2.0 licensed and ships as a single `eve` npm package.

The core idea is deceptively simple: an agent is a directory. Your system prompt is `instructions.md`. Your tools are TypeScript files in `tools/`. Your skills (procedures loaded on demand) are markdown files in `skills/`. Your message channels (HTTP, Slack, Discord) live in `channels/`. Your cron jobs live in `schedules/`. Eve reads this directory structure, compiles it, and runs a durable agent runtime. No configuration files, no boilerplate, no framework magic — just files in folders.

### Why it matters

The AI agent ecosystem in mid-2026 is fragmented. You have heavyweight frameworks like LangChain and CrewAI that abstract everything behind Python classes, and you have lightweight approaches where developers hand-roll agent loops with API calls. Neither feels right for the TypeScript/fullstack crowd that wants to build agents the same way they build web apps — with type safety, clear conventions, and good tooling.

Eve targets that gap directly. It's not trying to be a universal agent framework for every language and use case. It's a TypeScript framework with an opinionated structure, built by a company that understands developer experience. The filesystem-first approach means your agent is inspectable — you can browse it in an editor, diff it in Git, and reason about it without reading framework source code. That's a significant improvement over frameworks where agent behavior is defined in code that mixes logic with configuration.

The timing matters too. Vercel has been pushing hard into the AI space with the AI SDK, v0, and their deployment platform's support for serverless AI workloads. Eve is the missing piece — a framework for building the agent itself, not just the inference layer. If you're already deploying to Vercel and using their AI SDK, Eve fits naturally into that stack.

### Key Features

**Filesystem-First Agent Architecture.** Every aspect of an agent — instructions, tools, skills, channels, schedules, and subagents — maps to a file or directory on disk. This isn't just a organizational preference; it's the core design principle. Your `instructions.md` file is the system prompt. Your `tools/` directory contains typed functions the model can call. Your `skills/` directory holds markdown procedures loaded on demand. This convention-over-configuration approach means you can understand an agent by browsing its directory, which is dramatically easier than tracing through code.

**Durable Agent Runtime.** Eve agents are durable, meaning they survive failures and can be resumed. The runtime handles state persistence, retry logic, and execution continuity. This matters for production agents that run workflows spanning multiple steps or need to maintain context across conversations. You don't write durability code — the framework provides it.

**Built-in Channel System.** Agents can expose themselves through multiple message channels — HTTP endpoints, Slack bots, Discord bots, and custom integrations. Each channel is a TypeScript file in the `channels/` directory. This means you can build one agent and deploy it across multiple surfaces without duplicating logic. The channel abstraction handles the protocol differences.

**On-Demand Skill Loading.** Skills are markdown files in `skills/` that describe procedures the agent can follow. Unlike tools (which are typed functions), skills are natural-language instructions loaded on demand. This lets you extend agent behavior without writing code — add a new markdown file and the agent can use it. The separation between tools (code) and skills (procedures) is a thoughtful design choice.

**Scheduling and Cron Support.** The `schedules/` directory lets you define recurring tasks as TypeScript files. Your agent can run periodic jobs — sending summaries, checking for updates, performing maintenance — without external cron services. The scheduler is integrated into the agent runtime, so scheduled tasks have access to the same tools and context as interactive sessions.

**Subagent Composition.** Agents can spawn subagents, enabling hierarchical task decomposition. A parent agent delegates work to specialized child agents, each with their own instructions and tools. This maps well to real-world patterns where a general-purpose agent needs to hand off specific tasks to domain experts.

**Self-Contained Documentation.** The `eve` npm package ships with its full documentation inside `node_modules/eve/docs/`. Coding agents (Claude, Copilot, Cursor) can read the docs locally without network access. This is a smart move — it means AI-assisted development with Eve works even offline, and the docs always match the installed version.

### Use Cases

- **Customer support agents** — Build an agent that handles support tickets via Slack and email, with tools for looking up orders, checking documentation, and escalating to humans. The channel system lets you deploy the same agent across multiple platforms.

- **Developer productivity agents** — Create agents that automate code review, run tests on schedule, and report results. The scheduling system handles the cron logic, and the tool system gives the agent access to your CI/CD pipeline.

- **Content management agents** — Build agents that draft, edit, and publish content based on markdown skills. The filesystem-first approach means content workflows are transparent and version-controlled.

- **Data pipeline agents** — Construct agents that pull data from APIs, transform it, and load it into databases on a schedule. The durable runtime ensures pipeline steps survive failures and resume correctly.

- **Multi-agent research systems** — Use subagent composition to build research agents where a coordinator delegates to specialized agents for web search, analysis, and report generation.

### Pros and Cons

Pros:
- Filesystem-first convention makes agents inspectable, diffable, and easy to reason about. You can understand an agent's behavior by browsing its directory tree.
- Vercel's developer experience pedigree shows — the CLI scaffolding (`npx eve init`), TypeScript integration, and documentation quality are all polished.
- The separation of tools (code), skills (markdown procedures), and channels (integrations) provides clean abstraction boundaries that scale to complex agents.
- Self-documenting packages that ship docs inside `node_modules` is a genuinely useful feature for AI-assisted development workflows.

Cons:
- At 358 stars and two days old, Eve is brand new. The API surface will change, and production use is premature. The beta terms explicitly warn about breaking changes.
- The Vercel ecosystem tilt means Eve works best on Vercel's platform. Self-hosting is possible but may require more setup than deploying to Vercel.
- The filesystem-first approach, while elegant, can feel rigid for agents that need dynamic tool registration or runtime-generated instructions. Not every agent fits neatly into a static directory structure.

### Getting Started

```bash
# Create a new Eve agent project
npx eve@latest init my-agent

# Or add Eve to an existing project
cd myapp
npx eve@latest init .

# Start the development server
npm run dev
```

The scaffold creates an `agent/` directory with placeholder files. Replace `agent/instructions.md` with your system prompt, add tools to `agent/tools/`, and run `npm run dev` to start the interactive terminal UI.

Add a tool:

```ts
// agent/tools/get_weather.ts
import { defineTool } from "eve/tools";
import { z } from "zod";

export default defineTool({
  description: "Return mock weather data for a city.",
  inputSchema: z.object({ city: z.string().min(1) }),
  async execute({ city }) {
    return { city, condition: "Sunny", temperatureF: 72 };
  },
});
```

Configure the model in `agent/agent.ts`:

```ts
import { defineAgent } from "eve";

export default defineAgent({
  model: "anthropic/claude-sonnet-4.6",
});
```

### Alternatives

**Mastra** — A TypeScript agent framework that's more mature and feature-rich, with built-in RAG, workflow orchestration, and evaluation tools. Mastra uses a code-first approach rather than filesystem conventions, which gives more flexibility but less discoverability. Choose Mastra if you need a production-ready framework today and don't mind writing more configuration code.

**Vercel AI SDK** — Vercel's own AI SDK provides the inference layer (model calls, streaming, tool use) without the agent runtime. If you just need to call models from a Next.js app and don't need durable agents, scheduling, or multi-channel support, the AI SDK alone is lighter and more established. Eve builds on top of concepts from the AI SDK but adds the agent lifecycle.

**OpenAI Agents SDK** — OpenAI's official agent framework is Python-first and tightly coupled to OpenAI's models. It's more mature and has broader model support through its tool ecosystem, but it doesn't target the TypeScript/fullstack web developer audience. Choose it if you're building in Python or want the deepest OpenAI integration.

### Verdict

Eve is the most interesting agent framework concept I've seen from a major infrastructure company. The filesystem-first approach is genuinely novel — most agent frameworks treat the filesystem as an afterthought, but Eve makes it the primary authoring interface. That's a bet on developer cognition: we think in files and folders, not class hierarchies and configuration objects. At two days old, this is obviously not production-ready, and the 358-star count reflects curiosity more than adoption. But Vercel has a track record of turning developer-friendly ideas into ecosystem standards. If you're a TypeScript developer building agents and you're tired of wrestling with Python-first frameworks or hand-rolling agent loops, Eve is worth watching closely. Set up a side project, explore the conventions, and see if the filesystem-first approach clicks for you.
