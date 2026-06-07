---
name: remult
description: "Remult is a TypeScript-first fullstack framework that uses entity classes as single source of truth for your API, ORM, and frontend types — zero code generation required."
url: https://github.com/remult/remult
stars: 3202
forks: 153
language: TypeScript
tags: ["fullstack", "typescript", "crud", "orm", "realtime", "nextjs", "react"]
featured: false
publishedAt: 2026-06-07
---

## Remult

### Overview

Remult is a fullstack TypeScript framework that eliminates the gap between your backend and frontend by using a single set of entity classes as the source of truth for your database schema, REST API, and client-side types. With 3,200 GitHub stars and nearly 20,000 monthly npm downloads, it's quietly becoming the go-to choice for developers who are tired of writing the same CRUD logic three different ways.

The project has been around since 2017, created and primarily maintained by Noam Honig, who has contributed over 3,800 commits to the repository. That longevity matters — this isn't a hype-driven launch that disappears after six months. Remult has been iterated on for nearly a decade, with the current v3.x line representing a mature, production-ready architecture. The framework is backed by a small but dedicated team and an active Discord community.

The core problem Remult solves is deceptively simple: in a typical fullstack TypeScript app, you define your data model in a database migration, then again as a TypeScript interface for your API responses, then again as validation logic on the server, then again as form handling on the client. Each copy drifts. Remult collapses all of that into one entity class with decorators that describe everything — database column types, API access rules, validation constraints, and frontend behavior. One definition, everywhere.

### Why it matters

The fullstack TypeScript ecosystem has a fragmentation problem. You pick Next.js or Nuxt for the frontend, Prisma or Drizzle for the ORM, tRPC or a REST framework for the API, Zod for validation, and maybe Socket.io for realtime. Each tool is good at its job, but the integration tax is real. A 2025 State of JS survey showed that developers spend roughly 30% of their time on boilerplate and glue code rather than business logic. Remult's bet is that a single entity definition can replace most of that plumbing.

What makes Remult worth watching in 2026 is its framework-agnostic adapter model. It works with Express, Fastify, Next.js, Nuxt, SvelteKit, SolidStart, Nest, Koa, Hapi, and Hono. That means you can adopt it in an existing Express API without rewriting anything — just add the Remult middleware and start defining entities. The incremental adoption story is strong, which is why it's gaining traction in teams that can't afford a big-bang migration.

The realtime live query feature is particularly interesting. Define a query on the frontend, and Remult automatically pushes updates via Server-Sent Events when the underlying data changes. No WebSocket setup, no subscription management, no cache invalidation logic. For dashboards, admin panels, and collaborative tools, this eliminates a category of complexity that usually requires dedicated infrastructure.

### Key Features

**Single Source of Truth Entities.** Define your data model once as a TypeScript class with decorators. That single definition generates your database schema, REST API endpoints, frontend type-safe client, and validation rules. Change a field name in the entity, and it updates everywhere — no migration scripts to write by hand, no API client to regenerate, no frontend types to sync.

**Framework and Database Agnostic.** Remult ships with adapters for every major backend framework (Express, Fastify, Next.js, Nest, Hono, and six others) and every major database (PostgreSQL, MySQL, SQLite, MongoDB, MSSQL, Oracle). You're not locked into a specific stack. Start with SQLite in development, switch to PostgreSQL in production, and the same entity code works unchanged.

**Realtime Live Queries.** Subscribe to queries on the frontend and receive automatic SSE-powered updates whenever the underlying data changes. No WebSocket server to configure, no manual cache invalidation. The framework handles change detection and push notifications transparently. This is the feature that surprises developers the most — it turns a standard REST-style query into a reactive subscription with zero additional code.

**Code-Based Authorization.** Access control is defined directly on entities using simple functions that run on the server. You can restrict CRUD operations per role, per user, or per record. The authorization logic lives next to the data model it protects, which makes security reviews straightforward. No separate middleware layers, no JWT decoding in route handlers.

**Zero Code Generation.** Unlike tools like GraphQL Code Generator or tRPC's type inference pipeline, Remult doesn't require a build step to produce types. The entity classes are the types. Import them in your frontend code and you get full IntelliSense, type checking, and autocomplete. The npm package itself ships the type information — no `.d.ts` files to generate or maintain.

**Built-in Validation and Backend Methods.** Decorators like `@Fields.string({ required: true, minLength: 3 })` define validation that runs on both the server and the client. You can also define custom backend methods on entities that are callable from the frontend with full type safety — like RPC, but without the protocol overhead or code generation step.

**Incremental Adoption.** Add Remult to an existing Express or Next.js app with a single middleware line. You don't need to rewrite your database layer or replace your existing ORM. Define one entity, wire up one API endpoint, and see how it fits. The framework is designed to coexist with your existing code, not replace it wholesale.

### Use Cases

- **Internal admin dashboards** — Build CRUD interfaces for managing users, orders, inventory, or any business data. The realtime live queries mean your dashboard updates automatically when data changes, without polling or WebSocket setup.
- **SaaS MVPs and prototypes** — When you need to ship a working product fast, Remult eliminates the API layer boilerplate. Define your entities, add a frontend, and you have a fullstack app with type safety, validation, and authorization.
- **Next.js fullstack applications** — Remult's Next.js adapter lets you define API routes as entity declarations instead of manual route handlers. Combined with App Router, you get server components that query the same entity types as your client code.
- **NestJS enterprise backends** — The Nest adapter integrates Remult as a module, letting you use decorators alongside NestJS's dependency injection and middleware patterns. Useful for teams that want type-safe CRUD without giving up NestJS's architecture.
- **Collaborative tools and real-time dashboards** — The live query system makes Remult well-suited for apps where multiple users see the same data and need instant updates — think project management boards, chat systems, or monitoring dashboards.

### Pros and Cons

Pros:
- Eliminates the most tedious part of fullstack development: keeping backend schemas, API contracts, and frontend types in sync. Developers report 40-60% less boilerplate code compared to a Prisma + tRPC + Zod stack.
- The incremental adoption story is genuine. You can add Remult to an existing Express app with one line and start defining entities without touching your current database setup.
- Realtime live queries work out of the box with no additional infrastructure. Most competing solutions (Prisma + Socket.io, Supabase Realtime) require separate configuration and subscription management.
- Nearly a decade of development means edge cases are handled. The 94 open issues on 3,200 stars is a healthy ratio, suggesting the codebase is stable rather than unfinished.

Cons:
- Decorator-heavy syntax isn't everyone's preference. While Remult supports a non-decorator mode, the documentation and examples lean heavily on the decorator pattern, which feels dated compared to schema-first approaches like Drizzle or Zod.
- The 19,500 monthly npm downloads, while growing, are modest compared to Prisma's 5 million+. The ecosystem is smaller — fewer blog posts, fewer Stack Overflow answers, fewer third-party integrations.
- No built-in migration tool like Prisma Migrate or Drizzle Kit. Schema changes are handled automatically in development, but production database migrations require manual SQL or a separate tool.

### Getting Started

```bash
# Create a new Remult project with Next.js
npx create-remult@latest my-app --next

# Or add to an existing Express app
npm install remult

# Define your first entity
```

```ts
// shared/product.ts
import { Entity, Fields } from 'remult'

@Entity('products', { allowApiCrud: true })
export class Product {
  @Fields.id()
  id = ''

  @Fields.string({ required: true, minLength: 3 })
  name = ''

  @Fields.number({ validate: (value) => value > 0 })
  unitPrice = 0

  @Fields.createdAt()
  createdAt = new Date()
}
```

```ts
// backend/api.ts (Express example)
import express from 'express'
import { remultApi } from 'remult/remult-express'
import { Product } from '../shared/product'

const app = express()
app.use(remultApi({ entities: [Product] }))
app.listen(3000)
```

```tsx
// frontend (React example)
import { repo } from 'remult'
import { Product } from '../shared/product'

const products = await repo(Product).find({
  where: { unitPrice: { $gt: 10 } },
  orderBy: { name: 'asc' },
  limit: 50,
})
// products is typed as Product[] — full IntelliSense, no codegen
```

### Alternatives

**tRPC** — If you already have Prisma or Drizzle managing your database and you just want end-to-end type safety for your API layer, tRPC is the more focused choice. It doesn't try to be an ORM — it connects your backend procedures to your frontend with zero code generation. Choose tRPC when you want to keep your existing database layer and need type-safe API calls. Choose Remult when you want one definition to replace your ORM, API, and client types simultaneously.

**Prisma** — The most popular TypeScript ORM with 5 million monthly downloads and a mature ecosystem. Prisma excels at database schema management with its migration tool and Prisma Studio. But Prisma is backend-only — you still need tRPC, GraphQL, or REST to expose data to the frontend, and you need Zod or similar for validation. Choose Prisma when you need a powerful, well-documented ORM with strong community support. Choose Remult when you want to eliminate the API layer entirely.

**Supabase** — A hosted backend-as-a-service with a Postgres database, realtime subscriptions, auth, and storage. Supabase gives you a client SDK with generated types, similar to what Remult provides but through a different mechanism (database-first rather than code-first). Choose Supabase when you want a managed backend with minimal server code. Choose Remult when you want to own your backend code and integrate with your existing Node.js framework.

### Verdict

Remult is one of those tools that sounds too simple to work — define a class, get a full API, ORM, and frontend client — but it actually delivers. After nearly a decade of development, the v3.x line is polished enough for production use, and the framework-agnostic adapter model means you're not betting on a single ecosystem. The 3,200-star count understates its influence; the real signal is the 19,500 monthly downloads from developers who chose it over Prisma or tRPC for their projects. If you're building a fullstack TypeScript app in 2026 and you're tired of wiring together five different tools to handle CRUD, Remult is worth a serious look. Start with one entity in an existing project and see if the single-source-of-truth model clicks for your team.
