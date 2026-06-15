---
name: wasp
description: "Wasp is a Rails-like full-stack framework for React, Node.js, and Prisma — build production web apps with a declarative DSL that handles auth, jobs, RPC, and deployment automatically."
url: https://github.com/wasp-lang/wasp
stars: 18398
forks: 1448
language: TypeScript
tags: ["fullstack", "react", "nodejs", "prisma", "typescript", "framework"]
featured: false
publishedAt: 2026-06-16
---

## Wasp

### Overview

Wasp — short for Web Application Specification — is a full-stack framework that lets you build React + Node.js web apps using a declarative DSL. It has 18,400 GitHub stars and 115 contributors as of mid-2026, with the latest release (v0.24.0) shipping just days ago on June 11. The project started in 2020 and has been steadily gaining traction, but the last six months have seen a noticeable acceleration in adoption.

The framework was created by Matija Šnajder and Martin Šošić, two Croatian developers who met at university and spent years building internal tools before deciding the full-stack JavaScript ecosystem needed a better abstraction layer. The core team is now around 10 people, backed by Y Combinator (W21 batch) and recently closed a seed round. What makes their background relevant is that they didn't come at this from an academic compiler perspective — they came from building real production apps and getting frustrated with the same boilerplate problems every time.

Here's the pitch in concrete terms: a typical full-stack React/Express app needs authentication setup (Passport or NextAuth configuration), API route wiring with type generation, database migrations, background job infrastructure, email sending, and deployment scripts. That's weeks of plumbing before you write your first feature. Wasp encodes all of that in a single `main.wasp.ts` specification file. You declare your entities, routes, queries, mutations, and auth methods. The compiler generates the full application source — frontend, backend, and deployment config — in a `.wasp/` directory you can inspect. Your actual business logic lives in regular `.ts` and `.tsx` files that the spec references.

### Why it matters

The full-stack framework space has been dominated by Next.js for the last few years, and Next.js is excellent at what it does. But Next.js is fundamentally a frontend framework that happens to run server-side code. It doesn't solve auth, background jobs, email, or database management for you — you still wire those together yourself. Wasp occupies a different position: it's closer to Rails or Django in philosophy, but built on the React/Node.js/Prisma stack that most JavaScript developers already know.

This matters more now than it did two years ago because of AI coding agents. Tools like Cursor, Claude Code, and GitHub Copilot work dramatically better when they have a structured specification to reason about instead of an ad-hoc collection of config files. Wasp's declarative DSL gives AI agents a single file that describes the entire application architecture — entities, auth, routes, operations, jobs — which produces more accurate code generation and fewer hallucinated imports. The team has published official AI agent plugins for Cursor and Claude Code, acknowledging this as a core use case rather than an afterthought.

The framework also fills a gap for solo developers and small teams who want Rails-level productivity in the JavaScript ecosystem. Django and Rails developers switching to React/Node.js often feel the tooling regression acutely — they go from having auth, ORM, admin panels, and background jobs built in to configuring each piece separately. Wasp gives them that integrated experience without leaving the JavaScript ecosystem.

### Key Features

**Declarative Full-Stack Specification.** The `main.wasp.ts` file is the heart of the framework. You define your app's routes, queries, mutations, entities, and auth configuration in a single DSL. The compiler then generates the complete React frontend, Express backend, Prisma schema, and deployment configuration. This isn't code generation in the "scaffold and forget" sense — the generated code stays in sync as you modify the spec. Think of it as a smarter configuration layer that actually understands your entire application.

**Built-in Authentication.** Wasp ships with full-stack auth that includes email/password, Google, GitHub, Discord, and Keycloak providers out of the box. You get signup, login, password reset, email verification, and role-based access control without installing a single auth library. The auth integrates at the framework level, so type-safe `useAuth()` hooks on the client and `ctx.user` on the server just work. For a solo developer building a SaaS, this alone saves days of integration work.

**End-to-End Type Safety.** Define a Prisma entity in your spec, write a query function on the server, and call it from React with full TypeScript types — no codegen step, no manually maintained types. Wasp's compiler generates the RPC layer with proper input/output types, so renaming a field in your database breaks your frontend at compile time, not at runtime in production. The RPC mechanism uses TanStack Query under the hood, giving you automatic caching, refetching, and optimistic updates.

**Background Jobs.** The framework includes a built-in job system backed by PgBoss (PostgreSQL-based) that supports scheduled, delayed, and recurring jobs. Declare a job in your spec, implement the handler in TypeScript, and Wasp manages the queue, retries, and failure handling. No need to set up Redis, BullMQ, or Celery separately. For most web apps, this is more than sufficient and eliminates an entire infrastructure category.

**Single-Command Deployment.** Wasp apps deploy to any platform — Fly.io, Railway, Netlify, or your own VPS — with `wasp deploy`. The CLI generates the correct Docker configuration, environment variable setup, and build scripts for your target platform. This isn't vendor lock-in disguised as convenience; you can inspect and modify every generated file. The deployment abstraction handles the boring parts (build optimization, static asset hosting, database connection pooling) without hiding them.

**AI Agent Integration.** The official Wasp Agent Plugins for Cursor and Claude Code leverage the declarative spec to give AI coding tools full context about your application architecture. Instead of the AI guessing at your auth setup or API structure from scattered files, it reads the spec and generates code that fits your existing patterns. The team reports this produces significantly better results than feeding AI agents a Next.js project with ad-hoc configuration.

**No Lock-in Architecture.** Every Wasp project contains a `.wasp/` directory with the generated source code — React components, Express routes, Prisma schema, Dockerfiles. You can read it, modify it, or eject entirely. The framework doesn't hide the stack behind an abstraction you can't escape. If Wasp disappeared tomorrow, your app would still compile and run with minor adjustments.

### Use Cases

- **SaaS MVPs and side projects** — Solo developers or small teams building a web app with auth, database, and background jobs. Wasp eliminates weeks of boilerplate so you can focus on product features. The typical Wasp starter template includes everything you need for a functional SaaS in under 50 lines of spec code.

- **Internal tools and admin dashboards** — Teams that need CRUD-heavy applications with role-based access control. The built-in auth and Prisma ORM make it straightforward to build data management interfaces without reinventing the permission system each time.

- **AI-assisted development workflows** — Developers using Cursor, Claude Code, or Copilot who want better code generation accuracy. The declarative spec gives AI agents structured context about the entire application, reducing hallucinated imports and inconsistent patterns.

- **Teams migrating from Rails/Django to JavaScript** — Backend developers who want Rails-level productivity in the React/Node.js ecosystem. Wasp's philosophy mirrors Rails' convention-over-configuration approach, making the transition more natural than learning Next.js + separate auth + separate ORM + separate job queue.

- **Rapid prototyping for client work** — Agencies and freelancers who need to spin up functional prototypes quickly. The single-command deployment and built-in features mean you can go from idea to deployed demo in hours, not days.

### Pros and Cons

Pros:
- Dramatically reduces boilerplate for full-stack JavaScript apps. Auth, RPC, jobs, and email are built in — you write business logic, not infrastructure glue code.
- The declarative spec file gives AI coding agents structured context that produces more accurate code generation compared to ad-hoc project structures.
- No vendor lock-in. The generated code is real, readable, and portable. You can deploy anywhere and inspect everything in `.wasp/`.
- Active development with v0.24.0 released June 2026, 115 contributors, and an engaged Discord community. The roadmap is public and consistently updated.

Cons:
- Still in beta. Breaking changes happen between versions, and the upgrade path can require manual intervention. Not ideal for apps that need to run untouched for years.
- The custom DSL has a learning curve. Developers accustomed to "everything is just JavaScript" may find the `.wasp.ts` specification files unfamiliar, and debugging compiler errors requires understanding the framework's abstractions.
- Currently locked to React + Express + Prisma. The team has discussed supporting other stacks in the future, but today you're committing to this specific combination. If you need GraphQL or a different ORM, Wasp isn't the right fit.
- 837 open issues suggest the framework is still evolving rapidly. Some edge cases around complex auth flows or custom middleware require workarounds.

### Getting Started

```bash
# Install Wasp (requires Node.js 18+)
curl -sSL https://get.wasp.sh/installer.sh | sh

# Create a new project
wasp new my-app
cd my-app

# Start the development server
wasp start

# Your app is running at http://localhost:3000
# The database is auto-configured with SQLite for development

# Generate TypeScript types (optional, they auto-generate on build)
wasp db migrate-dev   # Run database migrations
wasp db studio        # Open Prisma Studio for database inspection

# Deploy to Fly.io
wasp deploy fly launch my-app mia
```

A minimal Wasp app looks like this:

```typescript
// main.wasp.ts
import { App } from "wasp-config";

const app = new App("my-app");

app.auth({
  userEntity: "User",
  methods: {
    email: {},
    google: {},
  },
});

app.route("Home", { path: "/", to: "HomePage" });
app.page("HomePage", { component: { import: "HomePage", from: "@src/pages/HomePage" } });

app.query("getTasks", {
  fn: { import: "getTasks", from: "@src/tasks/operations" },
  entities: ["Task"],
});
```

### Alternatives

**Next.js** — The dominant React framework that handles routing, server components, and API routes. Next.js is more flexible and has a larger ecosystem, but it doesn't provide auth, background jobs, or database management out of the box. Choose Next.js when you need fine-grained control over your stack or when your team already has established patterns for the missing pieces.

**Remix** — A full-stack React framework focused on web standards and progressive enhancement. Remix has excellent form handling and data loading patterns but, like Next.js, leaves auth and jobs to the developer. Choose Remix when you care deeply about web fundamentals and want to build your own infrastructure layer.

**RedwoodJS** — Another Rails-inspired framework for React and GraphQL. RedwoodJS has a similar philosophy but uses GraphQL as its API layer and has a heavier opinion on project structure. It's more mature than Wasp but has seen slower development velocity recently. Choose RedwoodJS when GraphQL is a requirement and you want a more battle-tested solution.

### Verdict

Wasp is the most interesting full-stack JavaScript framework I've seen since Next.js redefined the category. The declarative DSL approach feels like the right abstraction for the AI era — it gives both developers and AI agents a structured, high-level view of the entire application instead of making them piece together context from scattered configuration files. The 18,400 stars and 115 contributors validate that the community sees the same potential. It's still beta software, and the custom DSL means you're betting on a framework that hasn't hit 1.0 yet. But for solo developers and small teams building new web apps in 2026, especially those using AI coding tools, Wasp offers a productivity advantage that's hard to replicate with a manually assembled Next.js stack. If you're starting a SaaS side project today, spend the 30 minutes learning Wasp's spec format — you'll save days of auth and infrastructure setup.
