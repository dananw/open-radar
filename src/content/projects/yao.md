---
name: yao
description: "Yao is an open-source Go runtime that lets you build AI agents and full-stack web apps from a single binary — with TypeScript hooks, MCP support, and built-in vector search."
url: https://github.com/YaoApp/yao
stars: 7541
forks: 684
language: Go
tags: ["ai-agents", "golang", "fullstack", "low-code", "mcp"]
featured: false
publishedAt: 2026-06-06
---

## Yao

### Overview

Yao is an open-source runtime for building AI agents and web applications, shipped as a single Go binary. It has over 7,500 GitHub stars and 684 forks, with consistent growth through 2025 and 2026. The project positions itself as a complete application platform — think if you could combine an agent framework, a web server, a database layer, and a frontend rendering engine into one executable with zero external dependencies.

The project originated from a Chinese development team and has been steadily building an international community. The name "Yao" (爻) comes from the I Ching — the fundamental binary symbol whose combinations describe patterns in everything. That's a fitting metaphor for a tool that tries to unify the fragmented pieces of modern application development into coherent, composable units.

The core problem Yao tackles is developer tool sprawl. Building an AI-powered web application in 2026 typically means wiring together an agent framework (LangChain, CrewAI), a backend server (Express, FastAPI), a database ORM, an embedding service, a vector store, a frontend framework, and a deployment pipeline. Yao collapses most of that into a single binary. You define your data models in JSON/YAML, write business logic in TypeScript (via a built-in V8 engine — no Node.js required), and the runtime handles routing, database operations, API generation, UI rendering, and agent orchestration.

### Why it matters

The AI agent space is exploding, but most agent frameworks are libraries — you still need to build the application around them. Yao flips that model: it's an application runtime that has agents built in. This matters because the hard part of shipping AI-powered products isn't the AI — it's everything around it. Authentication, data persistence, API design, frontend rendering, memory management, tool integration. Yao handles all of that in one place.

For fullstack developers who work with Go, this is particularly interesting. The Go ecosystem has excellent infrastructure tools but has lacked a batteries-included application framework comparable to Django or Rails. Yao fills that gap while adding AI-native capabilities that those older frameworks don't have. The single-binary deployment story is also a genuine advantage — no Node modules, no Python virtual environments, no container images. Just one executable on ARM64 or x64.

### Key Features

**Three Execution Modes.** Yao supports three distinct request processing modes: LLM (for conversational AI with OpenAI, Anthropic, etc.), CLI Agent (for sandboxed code execution using tools like Claude Code or OpenCode in isolated containers), and Pure Hook (for deterministic logic with no AI involvement). All three share the same TypeScript hook interface, so you can mix them freely — route some requests through an LLM, handle others with pure code, all inside a single application.

**TypeScript Hooks with Built-in V8.** Every request flows through Create and Next hooks written in TypeScript. The V8 engine is embedded in the Go binary, so there's no Node.js dependency. Create hooks run before the executor to inject context and enforce constraints. Next hooks run after to validate output and trigger downstream actions. This hook-based architecture gives you fine-grained control over agent behavior without touching the underlying framework.

**Native MCP Support.** Yao has first-class Model Context Protocol support with process, SSE, and STDIO transport options. This means AI tools like Claude, ChatGPT, and Cursor can interact with your Yao application's data and functions directly through the standardized MCP interface. You don't need to write custom integration code — declare your tools and the protocol handles the rest.

**Memory API with Four Scopes.** Agent memory is handled through a built-in API with four scope levels: request-level (ephemeral), session (per conversation), user (persistent per user), and team (shared across users). This is more structured than most agent frameworks offer out of the box, and it covers the common memory patterns without requiring an external vector store for basic use cases.

**Full-Stack Runtime in One Binary.** Beyond agents, Yao is a complete web application server. Data models are defined in JSON/YAML and generate REST APIs automatically. SUI Pages provide component-based server-side rendered web UI. A built-in Chat UI (CUI) gives you a conversation interface for agents without building one from scratch. TypeScript handles all business logic. The result is a complete fullstack application from a single executable.

**Built-in Search Stack.** Yao ships with vector search (via OpenAI or FastEmbed embeddings), a knowledge graph for entity-relationship retrieval, and GraphRAG for hybrid vector plus graph search. Most agent applications need retrieval-augmented generation, and having the search infrastructure built into the runtime eliminates another external dependency.

**CLI Agent Sandbox.** For tasks that need actual code execution — file manipulation, running scripts, terminal operations — Yao can spin up CLI agents like Claude Code or OpenCode inside isolated containers with VNC desktop support. The Skills ecosystem lets you drop reusable capability packs (SKILL.md files) into any CLI agent, making it straightforward to extend what agents can do.

### Use Cases

- **Internal AI-powered tools** — Build admin dashboards, data management interfaces, and AI assistants for your team without stitching together five different frameworks. Define your data model, add an agent with access to your database, and you have a working tool.

- **Chatbot and conversational AI products** — The built-in Chat UI (CUI) and multi-agent delegation support make it practical to build customer-facing chat products where different specialist agents handle different domains.

- **Rapid prototyping of AI applications** — When you need to validate an AI product idea quickly, Yao's low-code approach (JSON data models, automatic API generation, built-in UI) lets you go from concept to working prototype in hours rather than days.

- **Multi-agent orchestration systems** — Yao's ability to delegate to specialist agents, call agents in parallel, and manage shared memory across agents makes it suitable for complex agent workflows where multiple AI models collaborate.

- **Edge-deployed AI applications** — The single binary with no external dependencies means you can deploy Yao applications to resource-constrained environments, ARM servers, or anywhere you need a self-contained AI application server.

### Pros and Cons

Pros:
- Single binary deployment is a genuine advantage — no package managers, no runtime dependencies, no container orchestration needed. This simplifies DevOps significantly compared to Node.js or Python stacks.
- The three execution modes (LLM, CLI Agent, Pure Hook) with a unified interface give you flexibility to mix AI and deterministic logic without architectural gymnastics.
- Built-in MCP support, memory management, and search infrastructure means you spend less time integrating third-party services and more time building your actual product.
- Active development with recent commits and a growing community of 7,500+ stars suggests the project has real momentum.

Cons:
- The documentation and community are still tilted toward Chinese-language users, which can make it harder for English-speaking developers to find examples and get support. The international community is growing but not yet large.
- The project uses a custom license (not MIT/Apache), which may give some teams pause. Always review the license terms before building commercial products on top of it.
- Vendor risk is real — Yao is primarily maintained by a small core team. If development stalls, you'd be stuck with a niche runtime that few other developers know. The Go ecosystem doesn't have the same depth of Yao developers as Node.js has for Express or NestJS.

### Getting Started

```bash
# Install Yao (macOS/Linux)
curl -fsSL https://yaoagents.com/install.sh | bash

# Create a new project
yao init my-app
cd my-app

# Start the development server
yao start

# The admin panel is available at http://localhost:5099
# The chat UI is at http://localhost:5099/api/__yao/app/cui

# Create a data model
yao migrate

# Run with an AI agent (requires OpenAI or compatible API key)
export OPENAI_API_KEY=sk-your-key
yao start
```

Define a data model in JSON:

```json
{
  "name": "tasks",
  "columns": [
    { "name": "title", "type": "string" },
    { "name": "status", "type": "string", "default": "pending" },
    { "name": "assignee", "type": "string" }
  ]
}
```

Yao automatically generates REST endpoints (`GET /api/tasks`, `POST /api/tasks`, etc.) and an admin interface for the model. Add a TypeScript hook to let an AI agent manage the data:

```typescript
// hooks/task/create.ts
export default async function Create(payload: any) {
  // Inject AI context before the executor runs
  payload.context = { source: "ai-agent" };
  return payload;
}
```

### Alternatives

**Django + LangChain** — If you're already in the Python ecosystem, Django with LangChain or CrewAI gives you a mature web framework with AI capabilities bolted on. The tradeoff is more moving parts — you'll need separate services for vector search, agent orchestration, and potentially a frontend framework. Choose this if your team knows Python well and you value the massive Django ecosystem over Yao's unified approach.

**NestJS + LangGraph** — For TypeScript teams, NestJS provides a structured backend framework and LangGraph handles agent orchestration. This combination is more flexible and has a larger community, but requires assembling the pieces yourself. Better choice if you need fine-grained control over each layer and don't mind the integration overhead.

**FastGPT / Dify** — These are higher-level, low-code platforms for building AI applications with visual workflow editors. They're easier to get started with but much less flexible — you're working within their abstractions rather than writing code. Choose them if your team is non-technical or if you need a visual builder more than a programmable runtime.

### Verdict

Yao is the most ambitious attempt I've seen to unify the fullstack web application and AI agent runtime into a single tool. The single-binary Go architecture is a genuine differentiator, and the three-mode execution model (LLM, CLI Agent, Pure Hook) is well-designed for real-world applications where you need both AI and deterministic logic. The project has real momentum with 7,500+ stars and active development. That said, Yao is still a bet — the documentation needs work for English-speaking developers, the license requires review, and the ecosystem is small compared to established frameworks. If you're a Go developer building AI-powered tools and you're comfortable being an early adopter, Yao is worth a serious look. For production-critical applications with large teams, the safer play is still assembling proven components (NestJS/Django + a dedicated agent framework) until Yao's community matures.
