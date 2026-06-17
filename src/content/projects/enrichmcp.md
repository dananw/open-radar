---
name: enrichmcp
description: "EnrichMCP is a Python ORM for AI agents that turns data models into typed, navigable MCP tools with relationship traversal and Pydantic validation."
url: https://github.com/featureform/enrichmcp
stars: 646
forks: 32
language: Python
tags: ["mcp", "ai-agents", "python", "orm", "data-layer"]
featured: false
publishedAt: 2026-06-18
---

## EnrichMCP

### Overview

EnrichMCP is a Python framework that turns your data model into a semantic MCP (Model Context Protocol) layer for AI agents. Think of it as SQLAlchemy, but instead of generating SQL queries for your application code, it generates typed, discoverable tools that AI agents can use to understand and navigate your data. The project hit 646 GitHub stars shortly after its HN debut with 133 points, and it's maintained by Featureform, an open-source feature store company that clearly understands the intersection of data infrastructure and ML tooling.

The core idea is deceptively simple: you define your data models using Pydantic (or map existing SQLAlchemy models), and EnrichMCP automatically generates MCP-compatible tools. An AI agent connected to your EnrichMCP server can explore your schema, query entities, traverse relationships, and even perform CRUD operations — all with full type validation. No hand-writing tool definitions, no maintaining separate API docs for your agent to consume.

The problem it solves is real. Right now, if you want an AI agent to interact with your database or API, you're either writing custom MCP tool functions by hand (tedious, error-prone, and brittle when your schema changes) or you're pasting your API docs into a prompt and hoping the agent figures it out. EnrichMCP eliminates both approaches by generating the agent interface directly from your data model. One definition, two outputs: your application code and your agent API.

### Why it matters

MCP adoption is accelerating fast. Anthropic's protocol is now supported by Claude, ChatGPT, Cursor, Windsurf, and a growing list of developer tools. But the MCP ecosystem has a gap: most MCP servers are hand-crafted for specific use cases. There's no standard way to take an existing data layer — the kind every web application already has — and expose it to AI agents with proper semantics, relationships, and validation.

EnrichMCP fills that gap for the Python ecosystem. If you're running Django, FastAPI, Flask, or any SQLAlchemy-backed application, you can expose your data to AI agents in under 30 seconds of code changes. That's not an exaggeration — the SQLAlchemy integration literally requires adding a mixin to your declarative base and calling two functions. The framework handles schema discovery, relationship traversal, input validation, pagination, and even caching.

This connects to a broader shift in how developers think about APIs. REST APIs were designed for human developers who read documentation. MCP tools are designed for AI agents that need structured, self-describing interfaces. EnrichMCP bridges that transition by generating the latter from the same models you already use for the former. It's the kind of infrastructure tool that becomes invisible once it's in place — exactly the kind that tends to stick around.

### Key Features

**SQLAlchemy Auto-Mapping.** If you already have SQLAlchemy models — and most Python web applications do — you can convert them to an MCP server with minimal code. Add the `EnrichSQLAlchemyMixin` to your declarative base, call `include_sqlalchemy_models()`, and you're done. The framework reads your table definitions, column types, foreign keys, and relationships, then generates typed MCP tools automatically. Schema changes in your database propagate to your agent interface without code updates.

**Relationship Navigation.** EnrichMCP understands entity relationships and exposes them as navigable paths. An agent can fetch a user, then follow `user.orders` to get their purchase history, then follow `order.products` to see what they bought. Each relationship has a resolver function you define, so the data fetching logic stays clean and testable. This is the feature that makes EnrichMCP feel like a real ORM rather than a thin API wrapper.

**Full Pydantic Validation.** Every input and output passes through Pydantic models. If your `Order.total` field has `ge=0` (must be positive), agents can't submit negative values. If `status` is a `Literal["pending", "shipped", "delivered"]`, the `describe_model()` call tells agents exactly what values are valid. This eliminates the class of bugs where agents hallucinate invalid field values because they didn't know the constraints.

**Semantic Schema Discovery.** The `explore_data_model()` tool returns your entire data model — entities, fields, types, descriptions, and relationships — in a single call. AI agents use this to understand what data is available before they start querying. Each field gets a `description` in its metadata, so the agent knows that `user.created_at` is a registration date, not just a timestamp column. This semantic layer is what separates EnrichMCP from a raw database connector.

**Built-in CRUD with Mutability Control.** Fields are immutable by default, which is the safe choice. Mark specific fields as mutable with `json_schema_extra={"mutable": True}`, and EnrichMCP generates patch models for updates. The `@app.create()`, `@app.update()`, and `@app.delete()` decorators let you add write operations with explicit business logic. You control exactly what agents can modify, field by field.

**Request Caching and Context.** The context system lets you pass auth tokens, database connections, and other runtime state to your resolvers. The built-in cache supports per-request, per-user, and global strategies, reducing redundant database hits when agents make multiple related queries. Context also powers authentication — check `ctx.get("authenticated_user_id")` in any resolver to enforce access control.

**Multiple Transport Modes.** Run your MCP server over stdio (the default, used by most desktop clients), SSE for web integrations, or streamable HTTP for production deployments. The `app.run(transport="streamable-http")` switch is all it takes. This flexibility means EnrichMCP works in CLI tools, web applications, and cloud deployments without architectural changes.

### Use Cases

- **Existing SQLAlchemy applications** — Add an AI agent interface to your Django or FastAPI app without rewriting your data layer. Your models stay the same; you just expose them to agents.
- **Internal tools and dashboards** — Let non-technical team members query company databases through an AI assistant. The schema discovery and validation ensure agents produce correct results.
- **Multi-service data gateways** — Wrap multiple REST APIs with EnrichMCP to create a unified, semantic data layer for agents. Define entities that span services, with resolvers fetching from different backends.
- **Rapid prototyping** — Build an agent-compatible API in minutes instead of days. Define models, add resolvers, run. No OpenAPI specs, no SDK generation, no documentation maintenance.
- **E-commerce and CRM systems** — The relationship navigation is a natural fit for domain models with users, orders, products, and transactions. Agents can answer complex queries like "show me high-value customers at risk of churning" in a single conversation.

### Pros and Cons

Pros:
- The SQLAlchemy integration is genuinely 30 seconds of code. If you have existing models, the barrier to entry is essentially zero.
- Relationship navigation with resolvers is well-designed — agents traverse your data model naturally without you writing boilerplate query logic.
- Full Pydantic validation means agents can't submit garbage data. The type system catches errors before they hit your database.
- Apache 2.0 license with active development from Featureform, a funded company with real production experience in ML infrastructure.

Cons:
- 646 stars is still early-stage. The ecosystem is small, documentation is decent but not comprehensive, and you'll likely hit edge cases that require reading source code.
- The project was created in March 2025 and the last push was March 2026 — there's a three-month gap that suggests development may have slowed. The HN attention might revive it, or it might not.
- Python-only. If your stack is TypeScript/Node.js (which many fullstack devs use), there's no equivalent. You'd need to look at alternatives like the MCP SDK directly.
- The semantic layer relies on you writing good field descriptions. Garbage descriptions in means garbage agent understanding out. There's no magic — you still need to document your data model.

### Getting Started

```bash
# Install EnrichMCP
pip install enrichmcp

# With SQLAlchemy support (most common)
pip install enrichmcp[sqlalchemy]
```

Minimal SQLAlchemy example:

```python
from enrichmcp import EnrichMCP
from enrichmcp.sqlalchemy import (
    include_sqlalchemy_models,
    sqlalchemy_lifespan,
    EnrichSQLAlchemyMixin,
)
from sqlalchemy import ForeignKey
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

engine = create_async_engine("postgresql+asyncpg://user:pass@localhost/db")

class Base(DeclarativeBase, EnrichSQLAlchemyMixin):
    pass

class User(Base):
    """User account."""
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True, info={"description": "Unique user ID"})
    email: Mapped[str] = mapped_column(unique=True, info={"description": "Email address"})
    orders: Mapped[list["Order"]] = relationship(
        back_populates="user", info={"description": "All orders for this user"}
    )

class Order(Base):
    """Customer order."""
    __tablename__ = "orders"
    id: Mapped[int] = mapped_column(primary_key=True, info={"description": "Order ID"})
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), info={"description": "Owner user ID"})
    total: Mapped[float] = mapped_column(info={"description": "Order total"})
    user: Mapped[User] = relationship(back_populates="orders")

app = EnrichMCP(
    "E-commerce Data",
    "API generated from SQLAlchemy models",
    lifespan=sqlalchemy_lifespan(Base, engine),
)
include_sqlalchemy_models(app, Base)

if __name__ == "__main__":
    app.run()
```

Agents can now `explore_data_model()`, `list_users()`, `get_user(id=123)`, and navigate `user.orders` automatically.

### Alternatives

**MCP Python SDK (direct)** — Anthropic's official MCP SDK lets you define tools manually with full control. Better choice if you need custom tool semantics that don't map to a data model, or if you're building non-data tools (file operations, web browsing, code execution). The tradeoff is you write every tool definition and validation by hand.

**LangChain / LangGraph** — The dominant framework for building AI agent pipelines. LangChain has its own tool-calling abstractions and can connect to databases, but it's a much larger framework with more complexity. If you need agent orchestration, memory, and multi-step reasoning alongside data access, LangGraph is the better fit. If you just need to expose data to agents, EnrichMCP is lighter and more focused.

**Vercel AI SDK** — For TypeScript developers, the Vercel AI SDK provides tool-calling primitives that integrate with Next.js and other frameworks. It's the closest equivalent in the JS ecosystem, though it doesn't have EnrichMCP's ORM-like data model mapping. Better choice if your stack is TypeScript and you want tight frontend integration.

### Verdict

EnrichMCP is the kind of tool that makes you wonder why it didn't exist already. The gap between "I have a database" and "AI agents can query my database" has been filled with hand-written MCP tools, custom wrappers, and a lot of copy-pasted API docs. EnrichMCP collapses that gap to a few lines of code, and it does it with proper type safety and relationship navigation. At 646 stars it's still early, and the development pace seems to have slowed in recent months — that's a legitimate concern. But the core architecture is sound, the SQLAlchemy integration is genuinely excellent, and the problem it solves is one that every team building AI agents will face. If you're a Python developer building MCP servers and you have existing data models, this should be your first stop. The alternatives require significantly more boilerplate for the same result.
