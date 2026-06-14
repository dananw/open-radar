---
name: hono
description: "Hono is a blazing-fast web framework built on Web Standards that runs on Node, Deno, Bun, Cloudflare Workers, and AWS Lambda with 30K+ GitHub stars."
url: https://github.com/honojs/hono
stars: 30959
forks: 1122
language: TypeScript
tags: ["web-framework", "typescript", "edge-computing", "fullstack", "web-standards"]
featured: false
publishedAt: 2026-06-15
---

## Hono

### Overview

Hono is a small, ultrafast web framework built entirely on Web Standards — the Request/Response API, Web Crypto, and Fetch API that browsers and runtimes already implement. It hit 30,000 GitHub stars in early 2026, making it one of the fastest-growing TypeScript frameworks in recent memory. The name means "flame" in Japanese, and the performance numbers back it up.

The project is created and maintained by Yusuke Wada, a Japanese engineer who previously built the Cloudflare Workers documentation site and contributed to several edge-computing projects. That background matters — Hono was designed from day one for the constraints and opportunities of edge runtimes, not retrofitted from a Node.js-first framework. Wada's deep understanding of the Web Standard APIs that power edge platforms is baked into every architectural decision.

The core problem Hono solves is fragmentation. In 2026, a fullstack developer might deploy an API to Node.js locally, Bun for speed, Cloudflare Workers for edge, and AWS Lambda for production — often in the same project. Each runtime has its own server framework (Express for Node, Oak for Deno, Hattip for Bun). Hono eliminates that sprawl. One codebase, one routing API, one middleware stack, runs everywhere. The framework itself is under 14KB gzipped with zero dependencies, which is roughly one-tenth the size of Express.

### Why it matters

The JavaScript runtime wars are over, and the winner is "all of them." Node.js, Deno, Bun, Cloudflare Workers, AWS Lambda, Vercel Edge, Netlify Edge — developers don't pick one runtime anymore, they pick the best runtime for each deployment target. But the framework ecosystem hasn't caught up. Express is Node-only. Oak is Deno-only. Fastify is Node-focused with bolted-on edge support. Hono is the first major framework designed from scratch for this multi-runtime reality.

This matters for fullstack developers in a concrete way. If you're building a React frontend with a NestJS backend today, you're probably also deploying API routes to edge functions, running background jobs on Lambda, and maybe experimenting with Bun for development speed. Hono's middleware architecture (JWT auth, CORS, compression, request validation) works identically across all these targets. You write it once, and it runs the same way whether you're hitting localhost:3000 or a Cloudflare Worker in 300 locations.

The timing connects to a broader architectural shift. Edge computing is no longer experimental — Cloudflare Workers alone processes billions of requests daily. The frameworks that thrive in 2026 and beyond will be the ones that treat edge-first as the default, not an afterthought. Hono has a two-year head start on that bet.

### Key Features

**Web Standard Foundation.** Hono builds on the Fetch API's `Request` and `Response` objects rather than Node.js's `http.IncomingMessage` and `http.ServerResponse`. This isn't a compatibility layer — it's the native API of every modern runtime. The result is that middleware and handlers transfer cleanly between environments without shims or polyfills. If you understand `fetch()`, you already understand Hono's core API.

**Ultra-Lightweight Core.** The framework ships at under 14KB gzipped with zero runtime dependencies. For comparison, Express is 140KB, Fastify is 200KB+, and NestJS bundles to several megabytes. Hono's small footprint means faster cold starts on serverless platforms where every millisecond of initialization time costs money. On Cloudflare Workers, Hono cold starts consistently under 1ms.

**Built-in Middleware Stack.** Hono ships with production-ready middleware for JWT authentication, CORS, bearer token auth, ETag caching, request body size limiting, pretty JSON formatting, secure headers, and more. These aren't third-party plugins with inconsistent APIs — they're first-party, maintained alongside the core, with the same TypeScript typing conventions. The JWT middleware alone saves hours of boilerplate on any API project.

**RPC Mode for End-to-End Type Safety.** Hono's RPC client lets you share route definitions between client and server with full TypeScript inference. Define a route on the server, import it on the client, and get autocomplete for path parameters, request bodies, and response types — no code generation step, no OpenAPI spec to maintain. This is the same pattern tRPC popularized, but built into the framework and working across any runtime.

**Middleware Composition with `app.use()`.** Middleware in Hono follows a clean onion model with explicit typing. Each middleware receives the context object and a `next()` function, and TypeScript infers the accumulated context through the chain. This means if your auth middleware adds a `user` property to the context, every subsequent middleware and handler sees it in the type system. No `any` casts, no declaration merging hacks.

**Zod Validator Integration.** The `@hono/zod-validator` package lets you validate request bodies, query parameters, and headers using Zod schemas directly in your route definitions. Invalid requests return structured error responses automatically. Combined with the RPC mode, this gives you end-to-end type safety from your database schema to your API endpoints to your frontend client — a complete type-safe fullstack loop.

**Multi-Runtime Adapter Architecture.** Hono uses a clean adapter pattern where the core framework is runtime-agnostic, and platform-specific features (WebSocket support, file serving, streaming) are handled by adapters. Currently supported: Node.js (via `@hono/node-server`), Bun, Deno, Cloudflare Workers, AWS Lambda, Vercel Edge, Netlify Edge, Lambda@Edge, and Fastly Compute. New runtimes are added as adapters without touching the core.

### Use Cases

- **Edge-first API backends** — Build APIs that deploy to Cloudflare Workers or Vercel Edge Functions with sub-millisecond cold starts. Perfect for high-traffic endpoints where latency matters, like authentication, feature flags, or geolocation-based routing.

- **Fullstack TypeScript monorepos** — Use Hono as the API layer in a monorepo alongside React, Next.js, or Astro frontends. The RPC mode gives you type-safe API calls without maintaining a separate API client or OpenAPI spec.

- **Microservice gateways** — Hono's tiny footprint and fast routing make it ideal for API gateways that proxy requests to downstream services. Add JWT validation, rate limiting, and request transformation without the overhead of a full framework.

- **Serverless function collections** — Organize groups of AWS Lambda or Cloudflare Worker functions into a single Hono application with shared middleware. Deploy as one unit or split into individual functions using the adapter pattern.

- **Bun-native development servers** — Use Bun as your development runtime for instant startup and fast hot reload, then deploy the same code to Node.js or Cloudflare Workers in production. No environment-specific code paths.

- **AI agent HTTP interfaces** — Expose LLM agent tools and MCP servers over HTTP with Hono's lightweight routing. The framework's small bundle size and fast cold starts are particularly well-suited for agent endpoints that spin up on demand.

### Pros and Cons

Pros:
- Genuinely runtime-agnostic in a way no other major Node.js framework achieves. You write one codebase and deploy to seven-plus platforms without conditional imports or build-time flags.
- The Web Standard foundation means skills transfer directly. If you learn Hono's API, you understand the underlying platform APIs too — no proprietary abstractions to unlearn later.
- The community is growing fast — 30K stars, 1,122 forks, active Discord with thousands of members, and regular releases from the core maintainer. The project has real momentum, not just hype.

Cons:
- The ecosystem is smaller than Express or Fastify. If you need a specific database driver, authentication provider, or ORM integration, there might not be a Hono-specific package yet, though the Web Standard APIs mean most Node.js libraries work without adapters.
- The RPC mode, while powerful, adds complexity to your build pipeline. Both client and server need access to the same type definitions, which means monorepo setups or careful package publishing.
- Documentation is good but not exhaustive. Some advanced patterns (custom middleware typing, complex validation chains) require reading source code or Discord threads rather than official guides.

### Getting Started

```bash
# Create a new Hono project
npm create hono@latest my-app

# Choose your target runtime (Node.js, Bun, Cloudflare Workers, etc.)
# Then install dependencies
cd my-app
npm install

# Start the development server
npm run dev

# The server starts at http://localhost:3000
```

Create a simple API with validation:

```typescript
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

const app = new Hono()

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
})

app.post('/users', zValidator('json', userSchema), (c) => {
  const user = c.req.valid('json')
  return c.json({ id: crypto.randomUUID(), ...user }, 201)
})

app.get('/health', (c) => c.json({ status: 'ok' }))

export default app
```

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

### Alternatives

**Express** — The Node.js standard with the largest middleware ecosystem in JavaScript. Express is battle-tested and has a plugin for literally everything. But it's Node-only, uses legacy APIs (no Web Standards), and its development has stalled — Express 5 has been "almost ready" for years. Choose Express if you need a specific middleware that only exists for Express and you're committed to Node.js.

**Fastify** — A high-performance Node.js framework with excellent TypeScript support, JSON schema validation, and a plugin architecture. Fastify is faster than Express on Node.js benchmarks and has better developer ergonomics. But it's fundamentally Node.js-bound — there's no edge runtime support. Choose Fastify if you're building a Node.js-only API and want the best performance within that ecosystem.

**itty-router** — Another Web Standard router, even smaller than Hono at ~4KB. It was popular in the early Cloudflare Workers days. But it's a router, not a framework — no built-in middleware, no validation, no RPC mode. Choose itty-router if you need absolute minimal size and you're comfortable assembling the rest of the stack yourself.

### Verdict

Hono is the web framework I'd reach for in 2026 if I were starting a new fullstack TypeScript project. The Web Standard foundation isn't just a technical detail — it's a strategic bet that pays off every time you need to deploy to a new runtime or platform. The 30K stars reflect genuine developer adoption, not marketing hype, and Yusuke Wada's consistent maintenance over four years suggests the project has staying power. It won't replace NestJS for large enterprise APIs with complex dependency injection needs, and it won't replace Next.js for full-stack React applications. But for the API layer that sits between your frontend and your database — the layer that handles routing, validation, auth, and middleware — Hono is the most thoughtfully designed option available today. If you're a fullstack developer tired of rewriting your API layer every time you change deployment targets, give Hono an afternoon. You'll be surprised how much complexity it removes.
