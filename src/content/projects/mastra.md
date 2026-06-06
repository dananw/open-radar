---
name: mastra
description: "Mastra is a TypeScript framework for building AI agents and apps from the Gatsby team. 24K stars, 965K weekly npm downloads, works with React and Next.js."
url: https://github.com/mastra-ai/mastra
stars: 24822
forks: 2202
language: TypeScript
tags: ["ai-agents", "typescript", "react", "nextjs", "framework"]
featured: false
publishedAt: 2026-06-07
---

## Mastra

### Overview

Mastra is a TypeScript framework for building AI-powered applications and agents. It has 24,800 GitHub stars and pulls in roughly 965,000 npm downloads per week, making it one of the most adopted AI agent frameworks in the JavaScript ecosystem. The project graduated from Y Combinator's Winter 2025 batch and ships new releases every one to two days — the latest version (1.41.0) dropped on June 5, 2026.

The team behind Mastra built Gatsby, the React static site generator that defined the Jamstack era. Sam Bhagwat and the core maintainers spent years watching developers struggle to wire AI features into existing web applications. The pain was consistent: every team rebuilt the same plumbing — model routing, conversation memory, tool orchestration, evaluation pipelines — from scratch. Mastra is their answer to that repetition. It's a batteries-included framework that gives TypeScript developers the same kind of opinionated, integrated experience that Django gives Python developers or Rails gives Ruby developers, but specifically designed around AI agent patterns.

The core problem Mastra solves is architectural fragmentation. If you're building an AI feature into a Next.js app today, you're likely stitching together Vercel's AI SDK for streaming, LangChain for tool orchestration, a separate memory store, a custom evaluation harness, and a deployment pipeline that understands none of it. Mastra collapses that into a single framework with first-class support for agents, workflows, retrieval-augmented generation, human-in-the-loop approvals, and MCP server authoring — all in TypeScript, all designed to drop into your existing React or Node.js project.

### Why it matters

The AI agent space has exploded since late 2024, but the developer experience has lagged behind the capabilities. Most AI frameworks were built by ML researchers for ML researchers. They assume Python, they assume you're training models, and they treat the "put it in a web app" problem as an afterthought. Mastra flips that assumption. It's built by web developers for web developers, and it treats the AI model as a service you call — not the center of your architecture.

This matters because the majority of AI features shipping in 2026 are being built by fullstack TypeScript teams, not ML teams. React developers are adding chat interfaces. Next.js developers are building RAG-powered search. Node.js backend engineers are wiring up agent workflows. These developers don't want to learn Python, and they don't want to cobble together five libraries that were never designed to work together. Mastra gives them a single, coherent framework that speaks their language — literally and figuratively.

The 965K weekly npm downloads tell the adoption story. That number puts Mastra ahead of many established developer tools. Combined with the YC pedigree and the Gatsby team's track record of building developer tools that actually get adopted, Mastra has the momentum and credibility to become the default choice for AI features in the TypeScript ecosystem.

### Key Features

**Unified Model Routing.** Mastra connects to 40+ LLM providers through a single, standardized interface. You write your agent logic once and swap between OpenAI, Anthropic, Google Gemini, Mistral, or any compatible provider by changing a config line. No provider-specific SDK imports, no different streaming patterns, no incompatible message formats. The abstraction is thin enough that you still get access to provider-specific features when you need them.

**Agent System with Tool Orchestration.** Agents in Mastra are autonomous units that reason about goals, select tools, and iterate until they produce a result. You define tools as typed functions — Mastra handles the schema generation, the LLM tool-calling protocol, and the execution loop. Agents can call other agents, use MCP servers as tool sources, and maintain conversation context across turns. The recent addition of tool-call hooks (v1.41.0) lets you intercept and modify tool invocations at runtime.

**Graph-Based Workflow Engine.** When you need explicit control over execution order, Mastra's workflow engine provides a graph-based orchestration model. Chain steps with `.then()`, fork execution with `.branch()`, run independent steps with `.parallel()`, and suspend workflows to wait for human input. Workflows persist their state to storage, so you can pause a multi-day approval process and resume it when the approver returns. This is critical for production AI applications where "fire and forget" doesn't cut it.

**Human-in-the-Loop Patterns.** Mastra has first-class support for suspending agent or workflow execution to wait for human approval, input, or review. The state persistence layer means you can suspend for hours or days — the execution context survives server restarts. This is table-stakes for enterprise AI applications, but most frameworks either ignore it or bolt it on as an afterthought.

**Retrieval-Augmented Generation (RAG).** The framework includes a complete RAG pipeline: document loading, chunking, embedding generation, vector storage, and retrieval with reranking. You can connect it to your existing data sources — APIs, databases, files — and give your agents access to domain-specific knowledge without fine-tuning. The integration is tight enough that retrieval becomes just another tool your agent can call.

**MCP Server Authoring.** Mastra can generate Model Context Protocol servers from your agents, tools, and workflows. Any MCP-compatible client (Claude Desktop, Cursor, Codex) can then interact with your application's capabilities. This turns your Mastra app into a tool provider for the broader AI ecosystem, not just a standalone application.

**Production Observability and Evals.** Built-in evaluation frameworks let you measure agent quality across dimensions like accuracy, relevance, and safety. The observability layer traces every agent decision, tool call, and workflow step. You're not flying blind in production — you can see exactly what your agents are doing, measure how well they're doing it, and iterate based on data rather than vibes.

### Use Cases

- **AI-powered SaaS features** — Add chat interfaces, intelligent search, or automated workflows to existing React/Next.js applications without leaving the TypeScript ecosystem. Mastra integrates directly with your frontend build pipeline.
- **Customer support automation** — Build agents that retrieve from your knowledge base, handle multi-turn conversations, and escalate to human agents when confidence drops. The human-in-the-loop patterns handle the escalation gracefully.
- **Internal developer tools** — Create coding assistants, documentation generators, or data processing pipelines that run as agent workflows. The MCP server authoring means your tools become available to Claude, Cursor, and other AI IDEs.
- **Content generation pipelines** — Orchestrate multi-step content workflows: research, draft, review, edit, publish. Each step can be a separate agent or a human review gate, with the workflow engine managing the state transitions.
- **Data extraction and transformation** — Use agents with tool access to parse unstructured data, transform it into structured formats, and load it into your database. The RAG pipeline handles the retrieval side; agents handle the reasoning.

### Pros and Cons

Pros:
- The TypeScript-first design means it integrates naturally with React, Next.js, and Node.js projects. No Python runtime, no separate service to manage, no context switching between languages.
- 965K weekly npm downloads and 24.8K GitHub stars indicate strong community adoption and momentum. You're not betting on an unproven framework.
- The Gatsby team's experience building developer tools shows in the API design. The framework is opinionated where it should be (project structure, model routing) and flexible where it matters (deployment targets, storage backends).
- Daily releases with active development from 5+ core contributors. The framework is moving fast but not breaking recklessly — the changelogs show careful incremental improvements.

Cons:
- The framework is TypeScript-only. If your backend is Django or Go, you'll need a Node.js service layer to use Mastra, which adds deployment complexity.
- 375 open issues suggest the API surface is still expanding rapidly. Some features may feel half-baked, and breaking changes are possible despite the 1.x version number.
- The enterprise edition components (under the `ee/` directory) use a separate license. The core is open source, but some advanced features may require a commercial license as the project matures.
- Documentation quality varies across features. The core agent and workflow docs are solid, but newer features like voice integration and browser automation are less documented.

### Getting Started

```bash
# Create a new Mastra project
npm create mastra@latest

# Or add Mastra to an existing project
npm install @mastra/core @mastra/rag

# Initialize Mastra in your project
npx mastra init
```

Create a simple agent:

```typescript
import { Mastra } from "@mastra/core";
import { openai } from "@ai-sdk/openai";

const mastra = new Mastra();

const agent = mastra.createAgent({
  name: "assistant",
  model: openai("gpt-4o"),
  instructions: "You are a helpful assistant.",
  tools: {},
});

const response = await agent.generate("What is Mastra?");
console.log(response.text);
```

Deploy as a standalone server or integrate into your Next.js app:

```bash
# Start the Mastra server
npx mastra dev

# Or deploy to your preferred platform
npx mastra deploy
```

### Alternatives

**Vercel AI SDK** — Vercel's AI SDK focuses on the frontend streaming and UI integration layer. It's excellent for adding chat interfaces to Next.js apps but lacks Mastra's agent orchestration, workflow engine, and evaluation framework. Choose the AI SDK when you need streaming UI components; choose Mastra when you need autonomous agents and multi-step workflows.

**LangChain.js** — The JavaScript port of LangChain brings Python's most popular AI framework to TypeScript. It has a larger ecosystem of integrations but carries significant architectural baggage from its Python roots. The API surface is massive and often confusing. Mastra's tighter scope and TypeScript-native design make it easier to learn and maintain for teams that don't need LangChain's breadth.

**CrewAI** — CrewAI focuses on multi-agent collaboration patterns where specialized agents work together on complex tasks. It's Python-only and more opinionated about agent interaction patterns. If your stack is Python and you want structured multi-agent workflows, CrewAI is worth evaluating. For TypeScript teams, Mastra's workflow engine provides similar orchestration capabilities without the language switch.

### Verdict

Mastra is the most complete AI application framework available for TypeScript developers right now. The 24.8K stars and 965K weekly npm downloads aren't vanity metrics — they reflect real adoption by teams building production AI features. The Gatsby team's experience building developer tools that millions of developers actually used shows in every aspect of the framework, from the clean API design to the sensible defaults to the integration story with React and Next.js.

If you're a fullstack TypeScript developer building AI features in mid-2026, Mastra should be on your shortlist. It won't make sense for every project — if you just need a chat interface, the Vercel AI SDK is simpler. But if you're building agents, orchestrating multi-step workflows, or need production-grade evaluation and observability, Mastra is the framework that gets you there fastest without leaving the TypeScript ecosystem. The daily release cadence and active contributor base suggest it's only getting better.
