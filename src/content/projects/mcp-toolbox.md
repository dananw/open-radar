---
name: mcp-toolbox
description: "MCP Toolbox for Databases — Google's open source MCP server connecting AI agents and IDEs to 20+ databases with prebuilt tools and production-grade security."
url: https://github.com/googleapis/mcp-toolbox
stars: 15468
forks: 1580
language: Go
tags: ["mcp", "databases", "ai-agents", "developer-tools", "google"]
featured: false
publishedAt: 2026-06-04
---

## MCP Toolbox for Databases

### Overview

MCP Toolbox for Databases is an open source Model Context Protocol server from Google that connects AI agents, IDEs, and applications directly to enterprise databases. The project has accumulated over 15,000 GitHub stars and 1,580 forks since its initial release, with activity spiking after its rebrand from "Gen AI Toolbox" to align with the MCP standard. It currently sits at version 1.3.0, released May 21, 2026, with four major releases in the past two months alone.

The project lives under the `googleapis` GitHub organization — Google's official home for API client libraries and developer tools. That's a meaningful signal. This isn't a weekend experiment from a Googler's 20% time; it's a supported product with dedicated SDKs in Python, JavaScript/TypeScript, Go, and Java, plus integration guides for LangChain, LlamaIndex, Genkit, ADK, and OpenAI. The team behind it also maintains the managed MCP servers for Google Cloud databases, so the open source version benefits from production-tested patterns.

The core problem it solves: every AI agent framework — LangChain, CrewAI, AutoGen, custom implementations — needs database access, and every team reimplements the same plumbing. Connection pooling, auth, query parameterization, schema discovery, observability. MCP Toolbox standardizes all of that behind a single YAML config file and a running server. You define your sources and tools declaratively, and the Toolbox handles the rest. No more writing bespoke database connectors for each agent.

### Why it matters

The MCP ecosystem is exploding. Anthropic's protocol is now supported by Claude, ChatGPT, Gemini, Cursor, Windsurf, and dozens of other tools. But the gap between "MCP exists" and "my agent can safely query production Postgres" is enormous. Most MCP servers floating around GitHub are toy implementations — a single file that connects to one database with hardcoded credentials and no auth, no pooling, no error handling.

MCP Toolbox is the first serious, production-grade MCP server for databases, backed by a major cloud provider. It supports over 20 database engines including PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch, CockroachDB, ClickHouse, Neo4j, Snowflake, and Trino — plus Google Cloud-specific services like AlloyDB, BigQuery, Spanner, and Firestore. That breadth matters because real applications don't use just one database. Your agent might need to query Postgres for user data, Redis for session state, and Elasticsearch for full-text search, all in the same conversation.

The timing is also significant. Google released v1.0 in April 2026, marking the project as stable after over a year of pre-1.0 development. The jump from v0.32.0 to v1.0.0 in two days, followed by three minor releases in six weeks, suggests an aggressive but disciplined release cadence. For fullstack developers building AI-powered features — chatbots that query your product database, internal tools with natural language interfaces, automated data pipelines — this is the infrastructure layer you didn't know you needed.

### Key Features

**Prebuilt Database Tools.** Run Toolbox with `--prebuilt=postgres` and you immediately get `list_tables`, `execute_sql`, `search` and other standard tools without writing a single line of config. This works for 20+ database engines. For developers evaluating MCP or prototyping an agent, you can go from zero to querying your database through Claude Code in under five minutes.

**Declarative YAML Configuration.** Define database sources, custom tools, toolsets, and prompts in a single `tools.yaml` file. Custom tools use parameterized SQL with typed parameters, so your agent can safely call `search-hotels-by-name` with a string parameter without risking SQL injection. The config supports toolsets — logical groupings of tools that load together — so you can expose different capabilities to different agents.

**Multi-Language SDK Ecosystem.** Official client SDKs for Python (`toolbox-core`, `toolbox-langchain`, `toolbox-llamaindex`), JavaScript/TypeScript (`@toolbox-sdk/core`, `@toolbox-sdk/adk`), Go (`mcp-toolbox-sdk-go`), and Java. Each SDK has framework-specific integrations. In Python, loading tools into LangChain takes three lines. In Go, integrating with LangChainGo or Genkit is similarly minimal. This isn't a "write your own adapter" situation.

**Integrated Authentication and IAM.** Toolbox supports authenticated access to databases using IAM credentials, so you're not passing passwords in config files. For Google Cloud databases, it integrates with Cloud IAM natively. For other databases, it supports standard auth mechanisms. This is the difference between a demo and something you can deploy to production.

**End-to-End Observability.** Built-in OpenTelemetry support for traces and metrics. Point Toolbox at any OTLP-compatible backend — Google Cloud Monitoring, Datadog, Grafana — and get visibility into every tool call, query latency, and error rate. When your agent misbehaves in production, you'll actually be able to debug it.

**Agent Skills Generation.** The `skills-generate` command converts a toolset into a portable Agent Skill package compatible with the Agent Skill specification. Install it into Gemini CLI or distribute it as a reusable capability. This bridges the gap between "I configured some tools" and "I have a shareable, versioned agent capability."

**Dynamic Reloading and Toolbox UI.** Changes to `tools.yaml` are picked up automatically without restarting the server. The `--ui` flag launches an interactive web interface for testing tools, including features like authorized parameters. For development and debugging, this removes a whole category of friction.

### Use Cases

- **Natural language database exploration** — Connect Claude Code or Gemini CLI to your dev database and ask questions like "show me all users who signed up this week" without writing SQL. The prebuilt tools handle schema discovery automatically.

- **AI-powered internal tools** — Build admin dashboards where non-technical team members query production data through a chat interface. Custom tools with parameterized queries ensure they can only access what you expose.

- **Multi-database agent workflows** — An agent that checks inventory in PostgreSQL, searches product catalogs in Elasticsearch, and updates session state in Redis, all through a single Toolbox server with multiple sources configured.

- **Database-aware code generation** — Give your IDE's AI assistant access to your actual schema so it generates correct queries, proper migrations, and type-safe ORM calls instead of hallucinating table names.

- **RAG pipelines with live data** — Combine Toolbox with LlamaIndex to build retrieval-augmented generation systems that pull from your database in real time rather than relying on stale vector embeddings.

### Pros and Cons

Pros:
- Supports 20+ database engines out of the box, which is more than any competing MCP server. The prebuilt tools mean you don't write config for common databases.
- Google backing with dedicated SDKs in four languages and framework integrations for LangChain, LlamaIndex, Genkit, ADK, and OpenAI. This isn't going to be abandoned in six months.
- Production-grade features like connection pooling, IAM auth, OpenTelemetry, and dynamic config reloading that you'd otherwise build yourself.
- Apache 2.0 license with active development — 4 releases in 2 months, 235 open issues indicating real community engagement.

Cons:
- YAML-driven configuration is powerful but has a learning curve. The tool definition syntax for custom tools isn't immediately obvious, and the docs could use more real-world examples beyond basic CRUD.
- Google Cloud bias is noticeable. The prebuilt tools for AlloyDB, BigQuery, and Spanner are first-class, while non-Google databases get the generic tools. If you're all-in on AWS RDS, you'll feel like a second-class citizen.
- The MCP protocol itself is still evolving. Toolbox v1.0 targets the current MCP spec, but breaking protocol changes could require significant updates. You're betting on MCP's stability.

### Getting Started

```bash
# Install via Homebrew (macOS/Linux)
brew install mcp-toolbox

# Or download binary directly (Linux AMD64)
export VERSION=1.3.0
curl -L -o toolbox https://storage.googleapis.com/mcp-toolbox-for-databases/v$VERSION/linux/amd64/toolbox
chmod +x toolbox

# Or use npx without installing
npx @toolbox-sdk/server --prebuilt=postgres --stdio
```

Create a `tools.yaml` for custom tools:

```yaml
kind: source
name: my-pg-source
type: postgres
host: 127.0.0.1
port: 5432
database: myapp
user: readonly_user
password: ${DB_PASSWORD}

---
kind: tool
name: search-users-by-email
type: postgres-sql
source: my-pg-source
description: Search for users by email address.
parameters:
  - name: email
    type: string
    description: The email to search for.
statement: SELECT id, name, email, created_at FROM users WHERE email ILIKE '%' || $1 || '%';
```

Run the server and connect from any MCP client:

```bash
./toolbox --config tools.yaml

# Add to your MCP client config (e.g., claude_desktop_config.json):
# { "mcpServers": { "toolbox": { "type": "http", "url": "http://127.0.0.1:5000/mcp" } } }
```

Integrate with your application using the SDK:

```python
from toolbox_core import ToolboxClient

async with ToolboxClient("http://127.0.0.1:5000") as client:
    tools = await client.load_toolset("my_toolset")
    # Pass tools to LangChain, LlamaIndex, or your custom agent
```

### Alternatives

**Supabase MCP Server** — Supabase ships its own MCP server focused exclusively on Postgres (since Supabase is Postgres under the hood). It's simpler to set up if you're already on Supabase, but it only supports one database engine and lacks Toolbox's custom tool framework, multi-SDK support, and observability features. Choose Supabase MCP if you want zero-config access to your Supabase project; choose Toolbox if you need multi-database support or production-grade features.

**Prisma MCP** — Prisma's MCP integration exposes your Prisma schema and database to AI clients through the ORM layer. It's a good fit if your stack already uses Prisma, since tools are generated from your schema automatically. But it adds Prisma as a dependency, only works with databases Prisma supports, and doesn't offer the same flexibility for custom SQL tools. Choose Prisma MCP if you're deep in the Prisma ecosystem and want schema-aware tooling.

**Custom MCP servers** — You can always write your own MCP server in TypeScript, Python, or Go. For a single database with a few queries, this is arguably simpler than learning Toolbox's YAML syntax. But you'll be building connection pooling, auth, error handling, and observability from scratch. Choose a custom server only if your needs are genuinely trivial and unlikely to grow.

### Verdict

MCP Toolbox for Databases is the most practical piece of infrastructure to come out of the MCP ecosystem so far. Most MCP servers are demos; this one is production software. The 15K+ stars aren't hype — they reflect a real need. Every team building AI features that touch a database faces the same plumbing problems, and Toolbox solves them with a config file and a binary. The multi-language SDK ecosystem means it works whether you're building with Python and LangChain, TypeScript and Genkit, or Go and your own agent framework. The Google backing gives it staying power that most open source MCP tools lack. If you're a fullstack developer building anything that connects AI to data — which in 2026 is increasingly everything — install Toolbox, point it at your database, and stop reimplementing database connectors. The v1.3.0 release is stable, the docs are solid, and the five-minute quickstart actually works.
