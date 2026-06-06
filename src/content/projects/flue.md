---
name: flue
description: "Flue is a TypeScript agent harness framework from the Astro team — build programmable AI agents that deploy anywhere, from Cloudflare to GitHub Actions."
url: https://github.com/withastro/flue
stars: 4520
forks: 241
language: TypeScript
tags: ["ai-agents", "typescript", "cloudflare", "astro", "agent-framework"]
featured: false
publishedAt: 2026-06-06
---

## Flue

### Overview

Flue is a TypeScript framework for building AI agents, created by the team behind Astro — one of the most popular web frameworks in the ecosystem. It launched in February 2026 and crossed 4,500 GitHub stars within four months, which is notable for a developer tool in a space crowded with competing agent SDKs.

The project comes from Fred K. Schott, Astro's creator, and the core Astro maintainers. That's significant because these are people who've spent years thinking about developer experience, build tooling, and deployment targets. They've taken the lessons from building Astro — a framework that made static site generation feel modern — and applied them to the AI agent problem. The result is something that feels less like an AI SDK and more like a proper web framework for agents.

The core problem Flue solves is the gap between prototyping an agent and shipping it to production. Most AI agent frameworks give you a Python script or a notebook. Flue gives you a TypeScript project with a build step, hot reload, typed schemas, and deploy targets. Your agent runs on Cloudflare Workers, Node.js, GitHub Actions, or GitLab CI/CD — the same infrastructure web developers already use. If you've ever tried to take a LangChain prototype and make it work in a real web application, you understand why this matters.

### Why it matters

The AI agent ecosystem is exploding, but the tooling is fragmented. Python dominates the research side, while most production web applications run on TypeScript. Web developers building AI features into their apps have been stuck bridging two worlds — writing Python agents and wrapping them in HTTP services, or using thin TypeScript wrappers that lack the depth of their Python counterparts. Flue closes that gap by being a TypeScript-native agent framework with real production tooling.

What sets Flue apart from Vercel's AI SDK, LangChain.js, or similar libraries is the architectural model. Flue isn't an SDK you import into your existing app. It's a framework that owns the agent lifecycle — sessions, sandboxes, tools, skills, and deployment. The distinction matters. An SDK gives you building blocks. A framework gives you a system. Flue's system mirrors what developers already know from using Claude Code or Codex, but makes it programmable. The agents you build act autonomously, use Markdown for configuration, and can be deployed with a single command.

The timing is also relevant. Cloudflare's investment in Workers, Durable Objects, and AI primitives has made edge-first agent deployment viable. Flue is the first serious agent framework built from the ground up for that infrastructure. As more companies move AI workloads to the edge, having a framework that's native to that environment — not bolted on — becomes a real competitive advantage.

### Key Features

**Agent Harness Architecture.** Flue models its agent system after coding agents like Claude Code. Each agent gets a harness that includes a sandbox, tools, skills, and session management. The difference is that Flue's harness is fully programmable — no human operator required. You define what the agent can do, what context it has access to, and how it reports results, all in TypeScript. The harness handles the rest.

**Virtual Sandbox by Default.** Instead of spinning up a Docker container for every agent, Flue uses a lightweight virtual sandbox powered by just-bash. This is dramatically faster and cheaper than container-based approaches, making it practical to run agents at scale. For tasks that need real containers, you can opt in to full container sandboxes, but the default keeps things lean.

**Markdown-Driven Configuration.** Agent skills, context files, and behavior definitions live in Markdown files — similar to how Claude Code uses AGENTS.md. This means non-developers can modify agent behavior, and AI tools can help write and maintain agent configurations. The Markdown files are validated at build time, so you catch errors before deployment.

**Multi-Target Deployment.** Build your agent once and deploy it to Node.js servers, Cloudflare Workers, GitHub Actions, GitLab CI/CD, or any platform that runs JavaScript. The `flue build` command produces a bundled artifact for your target, and `flue dev` gives you a hot-reloading local development server. This is the same deployment model web developers already use for their applications.

**Typed Agent Responses.** Flue uses Valibot for schema validation, so you can define the exact shape of data your agent returns. When you call `session.prompt()`, you pass a result schema and get back typed, validated data. No more parsing freeform text responses and hoping the agent formatted its output correctly.

**Connector System.** Flue's connectors adapt third-party services — sandbox providers, databases, APIs — into the framework using Markdown installation instructions. Run `flue add daytona | claude` and your AI coding agent reads the connector docs and writes the adapter for you. It's an interesting approach to extensibility that leverages the AI tools developers already have.

**WebSocket and HTTP APIs.** Agents expose typed endpoints at `/agents/:name/:id` that accept both HTTP and WebSocket connections. Session state persists automatically on Cloudflare via Durable Objects, meaning conversations survive server restarts and can be resumed days or weeks later. This makes multi-turn agent interactions practical in production.

### Use Cases

- **Customer support agents** — Build a support bot that searches your knowledge base, generates helpful responses, and maintains conversation state across sessions. Deploy to Cloudflare for global low-latency access.
- **CI/CD automation** — Create agents that triage issues, review pull requests, or run security audits as part of your GitHub Actions pipeline. Flue's `flue run` command makes it easy to invoke agents from scripts.
- **Content generation pipelines** — Build agents that produce structured content (blog posts, product descriptions, reports) with typed outputs and validation. Integrate into your existing Astro or Next.js site.
- **Data processing workflows** — Chain multiple agents together for complex data transformation tasks. Use the fan-out pattern where a coordinator agent spawns sub-agents for parallel processing.
- **Internal tooling** — Build admin-facing agents that help non-technical teams query databases, generate reports, or manage content through natural language interfaces.

### Pros and Cons

Pros:
- TypeScript-native with real build tooling, hot reload, and typed responses — feels like a web framework, not an AI experiment.
- The Astro team's track record on developer experience is excellent. Flue's CLI, documentation, and project structure reflect years of refinement in developer tooling.
- Virtual sandbox approach is genuinely innovative — most agent frameworks default to expensive container-based execution.
- Apache-2.0 licensed with active development (5 open issues suggests a focused, well-maintained codebase).

Cons:
- Experimental status means APIs will change. The README explicitly warns about this. Not ready for production-critical workloads yet.
- Requires TypeScript expertise. If your team is primarily Python-based, the DX advantages don't apply.
- The agent framework space is moving fast. Vercel's AI SDK, LangChain, and others are competing for the same developers. Flue's differentiation is its harness model, but that's still proving itself.
- Documentation is functional but not comprehensive. The examples are good, but there's no deep-dive guide for complex multi-agent architectures.

### Getting Started

```bash
# Create a new Flue project
npx @flue/cli init my-agent
cd my-agent

# Start the development server
npx flue dev --target node

# Or target Cloudflare
npx flue dev --target cloudflare
```

Create your first agent in `.flue/workflows/hello-world.ts`:

```ts
import { createAgent, type FlueContext } from '@flue/runtime';
import * as v from 'valibot';

const translator = createAgent(() => ({
  model: 'anthropic/claude-sonnet-4-6',
}));

export async function run({ init, payload }: FlueContext) {
  const harness = await init(translator);
  const session = await harness.session();

  const { data } = await session.prompt(
    `Translate this to ${payload.language}: "${payload.text}"`,
    {
      result: v.object({
        translation: v.string(),
        confidence: v.picklist(['low', 'medium', 'high']),
      }),
    },
  );

  return data;
}
```

Test it locally:

```bash
curl -X POST http://localhost:3583/api/hello-world \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello world", "language": "French"}'
```

Deploy to production:

```bash
flue build --target cloudflare
wrangler deploy
```

### Alternatives

**Vercel AI SDK** — The most popular TypeScript AI library, focused on streaming UI and chat completions. Vercel's SDK is more mature and better documented, but it's a library, not a framework. It doesn't manage agent sessions, sandboxes, or deployment. Choose it when you need to add AI to an existing app, not when you're building an autonomous agent.

**LangChain.js** — The JavaScript port of the dominant Python AI framework. LangChain has a larger ecosystem and more integrations, but its architecture is complex and its abstractions often get in the way. Flue's simpler, harness-based model is easier to reason about for developers who don't need LangChain's full chain-of-chains approach.

**Mastra** — A TypeScript agent framework focused on workflows and tool orchestration. Mastra has stronger workflow primitives and a more polished developer experience today. Flue differentiates with its virtual sandbox model and Cloudflare-native deployment. Choose Mastra if you need mature workflow orchestration; choose Flue if edge deployment and sandbox isolation matter more.

### Verdict

Flue is the most interesting agent framework to come out of the web development ecosystem. The Astro team has a proven track record of building tools that developers actually enjoy using, and that DNA shows in Flue's design. The virtual sandbox model, Markdown-driven configuration, and Cloudflare-native deployment target a real gap — most agent frameworks ignore the infrastructure story entirely. At 4,500 stars in four months with only 5 open issues, the project has momentum without the chaos that often comes with fast growth. It's experimental, and the APIs will change, so don't bet your production system on it today. But if you're a TypeScript developer building AI agents and you want something that feels like a real framework instead of a Python SDK awkwardly ported to JavaScript, Flue is worth watching closely. The fact that it comes from the team behind one of the most successful web frameworks of the last five years is not a coincidence.
