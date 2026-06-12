---
name: mastra
description: "Mastra is a TypeScript framework for building AI agents and workflows — from the team behind Gatsby, backed by Y Combinator W25."
url: https://github.com/mastra-ai/mastra
stars: 24975
forks: 2215
language: TypeScript
tags: ["ai-agents", "typescript", "workflows", "llm", "framework"]
featured: false
publishedAt: 2026-06-12
---

## Mastra

### Overview

Mastra is a TypeScript framework for building AI-powered applications and agents. It hit 25,000 GitHub stars by mid-2026 with 460 contributors, making it one of the fastest-growing AI infrastructure projects in the TypeScript ecosystem. If you're building anything that touches LLMs — chatbots, autonomous agents, multi-step workflows, RAG pipelines — Mastra is worth a serious look.

The project comes from the team behind Gatsby, the static site generator that dominated the React ecosystem from 2017 to 2022. After Netlify acquired Gatsby Inc. in 2023, the founding team (Sam Bhagwat, Josh Shirazi, and Shane Thomas) pivoted to AI tooling. They went through Y Combinator's W25 batch and launched Mastra in August 2024. That background matters because these are people who understand developer experience at scale — Gatsby's plugin ecosystem and GraphQL data layer were genuinely innovative, even if the framework itself got overtaken by Next.js. They're applying the same "make hard things easy" philosophy to AI development.

The core problem Mastra solves is fragmentation. Building a production AI agent today means stitching together an LLM provider, a tool-calling system, a workflow engine, memory management, evaluation harnesses, and observability — each from different libraries with different APIs. Vercel's AI SDK handles model routing and streaming well, but it doesn't give you agents or workflows. LangChain gives you everything but in Python, and its TypeScript port has always felt like an afterthought. CrewAI and AutoGen are Python-only. Mastra is purpose-built for TypeScript developers who want the full agent stack without leaving their ecosystem.

### Why it matters

The AI agents space is moving fast, and the TypeScript ecosystem has been underserved compared to Python. Most serious AI research and prototyping happens in Python, but production web applications run on TypeScript — React frontends, Next.js apps, Node.js APIs. When you want to ship an AI feature in your product, you need something that integrates with your existing stack, not a separate Python service you have to deploy and maintain.

Mastra fills that gap. It connects to 40+ LLM providers through a single interface, gives you a graph-based workflow engine with branching and parallel execution, and integrates directly with React and Next.js. The human-in-the-loop support — suspending a workflow, waiting for user approval, resuming where you left off — is exactly what production AI features need but most frameworks treat as an afterthought.

The Y Combinator backing and the Gatsby team's track record suggest this isn't a weekend project that'll be abandoned in six months. The 460 contributors and active Discord community (13,000+ members as of early 2026) indicate real momentum. For TypeScript developers building AI features in 2026, Mastra has become the default choice — and for good reason.

### Key Features

**Model Routing Across 40+ Providers.** Mastra uses a unified interface to connect to OpenAI, Anthropic, Google Gemini, Mistral, Cohere, and dozens more. Switch between providers by changing a config string, not rewriting your code. The abstraction is thin enough that you can still access provider-specific features when you need them, but thick enough that most of your code stays provider-agnostic.

**Autonomous Agents with Tool Calling.** Define agents that reason about goals, decide which tools to invoke, and iterate internally until they reach a final answer. Agents can call external APIs, query databases, run code, or use other agents as tools. The agent loop is configurable — set max iterations, stopping conditions, and fallback behavior.

**Graph-Based Workflow Engine.** When you need explicit control over execution order, Mastra's workflow engine gives you a clean API for multi-step processes. Chain steps with `.then()`, branch conditionally with `.branch()`, run steps in parallel with `.parallel()`, and handle errors with built-in retry logic. Workflows are stateful — they persist execution state to storage so you can pause and resume across process restarts.

**Human-in-the-Loop Support.** Suspend a workflow or agent mid-execution, wait for human input or approval, then resume exactly where you left off. This is critical for production AI features where you need a human to review an agent's output before it takes action. The suspension state is persisted to storage, so you can pause for hours or days without losing context.

**RAG and Memory Management.** Mastra includes built-in support for retrieval-augmented generation — connect to your data sources (APIs, databases, files), chunk and embed your documents, and give your agents the right context at the right time. The memory system supports conversation history, working memory (what the agent is currently focused on), and semantic recall (finding relevant past interactions).

**MCP Server Authoring.** Build Model Context Protocol servers that expose your agents, tools, and resources via the MCP interface. Any system or agent that supports MCP can then interact with yours. This is increasingly important as the AI ecosystem standardizes on interoperability protocols.

**Built-in Evals and Observability.** Measure agent quality with built-in evaluation tools — run test cases, track accuracy over time, and catch regressions before they reach production. The observability layer gives you tracing, logging, and metrics for every agent execution, so you can debug issues and optimize performance.

### Use Cases

- **AI-powered customer support** — Build a chatbot agent that queries your knowledge base via RAG, handles common questions autonomously, and escalates to human agents when confidence is low. Mastra's human-in-the-loop makes the escalation seamless.

- **Automated code review and PR management** — Create an agent that reads pull requests, analyzes code changes, checks for security issues, and posts review comments. Use workflows to orchestrate the multi-step process and pause for human approval on critical changes.

- **Content generation pipelines** — Build multi-step workflows that research a topic, generate drafts, run quality evals, and publish — with human review checkpoints at each stage. The workflow engine's branching handles different content types and quality thresholds.

- **Internal tools with natural language interfaces** — Give your team an AI assistant that can query databases, call internal APIs, and generate reports using natural language. Mastra's tool system lets you expose any function as an agent capability.

- **Multi-agent research systems** — Coordinate multiple specialized agents (a researcher, a writer, a fact-checker) that collaborate on complex tasks. Use one agent's output as another's input, with workflows managing the orchestration.

### Pros and Cons

Pros:
- The TypeScript-first approach means AI features integrate naturally with React, Next.js, and Node.js applications. No separate Python service, no cross-language API boundaries, no deployment complexity.
- The workflow engine with suspend/resume is genuinely useful for production AI features. Most competing frameworks either skip this entirely or implement it poorly.
- Y Combinator backing and 460 contributors suggest strong long-term viability. The team shipped Gatsby to millions of developers — they know how to build and maintain developer tools at scale.

Cons:
- 419 open issues as of mid-2026 indicate the API surface is still evolving. Expect breaking changes, especially in the workflow and memory systems. Pin your versions.
- The documentation, while improving fast, still has gaps. Some advanced patterns (custom tool implementations, complex workflow topologies) require reading source code or asking in Discord.
- Mastra's abstractions add overhead compared to calling LLM APIs directly. For simple use cases (a single prompt to a single model), the framework is overkill. It shines when you need agents, workflows, or multi-model orchestration.

### Getting Started

```bash
# Create a new Mastra project with the CLI
npm create mastra@latest

# Or install in an existing project
npm install @mastra/core @mastra/rag

# Create a simple agent
```

```typescript
import { Mastra } from "@mastra/core";
import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";

const agent = new Agent({
  name: "assistant",
  instructions: "You are a helpful assistant.",
  model: openai("gpt-4o"),
});

const mastra = new Mastra({ agents: { assistant: agent } });
const assistant = mastra.getAgent("assistant");

const response = await assistant.generate("What is Mastra?");
console.log(response.text);
```

Deploy as a standalone server or embed in your Next.js app. Check the [installation guide](https://mastra.ai/docs/getting-started/installation) for framework-specific setup.

### Alternatives

**Vercel AI SDK** — The best choice for simple model routing and streaming UI in React/Next.js apps. Vercel AI SDK handles chat completions, streaming, and structured output beautifully. But it doesn't give you agents, workflows, or memory management. Choose it when you need a chat interface, not autonomous agents.

**LangChain.js** — The TypeScript port of the popular Python framework. LangChain has a larger ecosystem and more integrations, but its API design has always felt awkward in TypeScript — it was designed for Python first. Mastra's API feels native to TypeScript developers. Choose LangChain.js when you need a specific integration that Mastra doesn't support yet.

**CopilotKit** — A React-focused framework for building AI copilots with pre-built UI components. CopilotKit excels at the frontend experience (chat panels, inline suggestions, generative UI) but is lighter on backend agent orchestration. Mastra and CopilotKit actually work well together — use Mastra for agent logic and CopilotKit for the UI layer.

### Verdict

Mastra is the most complete AI agent framework in the TypeScript ecosystem right now. The combination of model routing, autonomous agents, stateful workflows, and human-in-the-loop covers the full range of production AI use cases. The Gatsby team's developer experience instincts show — the API is clean, the CLI scaffolding is solid, and the integration with React/Next.js is seamless. At 25,000 stars and 460 contributors, it has the community momentum to become the standard. If you're building AI features in a TypeScript stack in 2026, start here.
