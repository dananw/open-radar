---
name: docker-agent
description: "Build, run, and share AI agents with Docker Agent — a Go-based CLI plugin by Docker Engineering with declarative YAML, multi-agent orchestration, and MCP support."
url: https://github.com/docker/docker-agent
stars: 3039
forks: 384
language: Go
tags: ["ai-agents", "docker", "go", "mcp", "multi-agent", "yaml"]
featured: false
publishedAt: 2026-06-10
---

## Docker Agent

### Overview

Docker Agent is a CLI plugin from Docker Engineering that lets you build, run, and share AI agents using declarative YAML configuration. It hit 3,000 stars in under a year, which tracks — this is Docker applying its "make complex infrastructure accessible" playbook to the AI agent space.

The project launched in September 2025 and ships as part of Docker Desktop 4.63+. That distribution advantage is massive. Every developer who already has Docker Desktop gets an agent runtime without installing anything extra. The team behind it is Docker Engineering itself, not a third-party integration, which means it's built with the same infrastructure thinking that made containers ubiquitous.

The core problem Docker Agent solves is the gap between "I want to build an AI agent" and "I have a working, deployable agent." Most agent frameworks require writing code in Python or TypeScript, managing dependencies, and figuring out deployment on your own. Docker Agent collapses that to a YAML file and a single command. Define your agent's model, instructions, and tools in a config file, then `docker agent run agent.yaml` and you're done. No SDK, no boilerplate, no deployment scripts.

### Why it matters

The AI agent ecosystem is fragmented. You have LangChain for Python, CrewAI for multi-agent workflows, Vercel AI SDK for TypeScript, and a dozen other frameworks that each assume a specific language and deployment target. Docker Agent takes a different approach: it's language-agnostic, provider-agnostic, and deployment-agnostic. You define what the agent does, not how it's built.

This matters for fullstack web developers in particular. If you're running Docker Compose for your local dev environment, Docker Agent fits right in. Your agent definitions live alongside your service definitions. Your MCP tool servers run as containers. The entire agent stack is versionable, shareable, and reproducible — the same properties that made Docker containers standard infrastructure.

The MCP (Model Context Protocol) integration is the real differentiator. Docker Agent treats MCP servers as first-class tools, which means any MCP-compatible server — whether it's a local process, a remote endpoint, or a Docker container — becomes available to your agents. As MCP adoption grows across the industry (Claude, Cursor, and VS Code all support it now), this positions Docker Agent as the orchestration layer that ties everything together.

### Key Features

**Multi-Agent Architecture.** Docker Agent supports teams of specialized agents that delegate tasks to each other automatically. Define a root agent that routes queries to domain-specific sub-agents — one for code review, one for documentation, one for deployment. Each agent has its own model, instructions, and toolset. The delegation happens through the YAML config, not through code.

**Declarative YAML Configuration.** Agent definitions are plain YAML files. No imperative code, no framework-specific abstractions. You specify the model provider, system instructions, available toolsets, and delegation rules in a format that's readable by humans and parseable by machines. Version them in Git, share them via OCI registries, diff them in code review.

**Provider Agnostic.** Works with OpenAI, Anthropic, Gemini, AWS Bedrock, Mistral, xAI, and Docker Model Runner for local models. Switch providers by changing one line in your YAML config. This isn't theoretical — you can literally swap `openai/gpt-5-mini` for `anthropic/claude-sonnet-4-20250514` and re-run.

**MCP Tool Ecosystem.** Any MCP server becomes a tool your agents can use. Docker ships built-in tools like DuckDuckGo search, and the MCP ecosystem provides everything else — database access, file manipulation, API calls, browser automation. Tools are declared in the YAML config as toolset references, keeping agent definitions clean.

**Built-in RAG Pipeline.** Pluggable retrieval with BM25, embeddings, hybrid search, and reranking. Point your agent at a knowledge base and it can retrieve relevant context before generating responses. The RAG pipeline is configurable through YAML — no need to wire up a vector database separately.

**Package and Share via OCI Registries.** Push agent definitions to any OCI registry (Docker Hub, GitHub Container Registry, ECR) and pull them anywhere. `docker agent run agentcatalog/pirate` pulls a pre-built agent from the catalog. This is the Docker distribution model applied to AI agents — and it works because the OCI spec is already the standard for container images.

**Docker Model Runner Integration.** Run models locally using Docker Model Runner, eliminating the need for API keys during development. This is particularly useful for iterating on agent configurations without burning API credits. Pull a model, run it locally, test your agent, then switch to a cloud provider for production.

### Use Cases

- **Internal developer tools** — Build agents that query your internal APIs, databases, and documentation. Define them in YAML, version them in your monorepo, and run them as part of your development workflow.
- **Customer support automation** — Create multi-agent teams where a routing agent delegates to specialized agents for billing, technical support, and account management. Each agent has access to different MCP tools.
- **Code review assistants** — Define an agent with access to your Git provider's MCP server, linters, and security scanners. Run it as a CI step or on-demand via the CLI.
- **Data pipeline orchestration** — Agents that monitor data sources, transform data, and update dashboards. The RAG pipeline handles context retrieval, and MCP tools handle database operations.
- **Prototyping AI features** — Quickly test agent behaviors before committing to a framework. Change the model, instructions, or tools in YAML and re-run in seconds.

### Pros and Cons

Pros:
- Zero-friction adoption for anyone already using Docker Desktop. The CLI plugin is pre-installed in v4.63+, and the YAML config format is immediately readable.
- Provider agnostic design means no lock-in. Switch between OpenAI, Anthropic, and local models without changing anything except the model reference in your config.
- MCP integration creates a real ecosystem effect. As more MCP servers are published, every Docker Agent user gets access to them without code changes.
- OCI registry distribution is genuinely useful for teams. Agent definitions become versioned artifacts that flow through your existing CI/CD pipeline.

Cons:
- YAML-based configuration limits complex logic. If your agent needs conditional branching, loops, or stateful conversations beyond what the built-in tools provide, you'll hit the ceiling fast.
- The project is less than a year old with 3,039 stars. The API surface is still evolving, and breaking changes are likely as the team iterates on the agent definition format.
- Telemetry is enabled by default and collects anonymous usage data. You can opt out, but the default-on approach is worth knowing about for privacy-conscious teams.
- Multi-agent orchestration is powerful but can be opaque. When agents delegate to each other, debugging the delegation chain requires reading logs rather than stepping through code.

### Getting Started

```bash
# Docker Desktop 4.63+ includes docker-agent pre-installed
# Verify it's available:
docker agent --version

# Or install via Homebrew:
brew install docker-agent

# Set your API key (or use Docker Model Runner for local models):
export OPENAI_API_KEY=sk-...

# Run the default agent:
docker agent run

# Generate a new agent interactively:
docker agent new

# Run from the agent catalog:
docker agent run agentcatalog/pirate

# Create your own agent config (agent.yaml):
cat > agent.yaml << 'EOF'
agents:
  root:
    model: openai/gpt-5-mini
    description: A helpful AI assistant
    instruction: |
      You are a knowledgeable assistant that helps users with various tasks.
      Be helpful, accurate, and concise in your responses.
    toolsets:
      - type: mcp
        ref: docker:duckduckgo
EOF

# Run your custom agent:
docker agent run agent.yaml
```

Full documentation at [docker.github.io/docker-agent](https://docker.github.io/docker-agent/).

### Alternatives

**LangChain / LangGraph** — The most popular Python agent framework with a massive ecosystem. LangChain offers more flexibility for complex agent logic, graph-based workflows, and custom tool implementations. Choose it when you need programmatic control over agent behavior, stateful conversation management, or deep integration with Python libraries. Docker Agent is simpler to deploy but less expressive.

**CrewAI** — A Python framework focused on multi-agent role-playing workflows. CrewAI has a more mature multi-agent delegation model with defined roles, goals, and backstories for each agent. Choose it when your use case requires complex agent personalities and structured collaboration patterns. Docker Agent's multi-agent support is simpler but integrates better with existing Docker infrastructure.

**Vercel AI SDK** — TypeScript-first AI SDK with tight integration into the React/Next.js ecosystem. Better choice if you're building agent experiences directly into a web application and want streaming, tool calling, and generative UI to work seamlessly with your frontend. Docker Agent operates at the infrastructure layer, not the UI layer.

### Verdict

Docker Agent is the most practical entry point into AI agent development for teams already invested in the Docker ecosystem. It won't replace LangChain for complex agent workflows or Vercel AI SDK for frontend-integrated agents, but that's not the point. The point is that you can go from zero to a working, deployable, shareable agent in under five minutes with a YAML file and a single command. The MCP integration makes it future-proof — as the tool ecosystem grows, your agents get more capable without code changes. If you're a fullstack developer who already runs Docker Compose for local development and wants to add AI agents to your stack without adopting a new language or framework, Docker Agent is worth your time. The 3,000 stars and Docker Engineering backing suggest it's not going away anytime soon.
