---
name: wasp
description: "Wasp is a Rails-like full-stack framework for React, Node.js, and Prisma — build production web apps with declarative config instead of boilerplate."
url: https://github.com/wasp-lang/wasp
stars: 18384
forks: 1447
language: TypeScript
tags: ["fullstack", "react", "nodejs", "prisma", "typescript", "framework"]
featured: false
publishedAt: 2026-06-09
---

## Wasp

### Overview

Wasp — short for Web Application Specification — is a full-stack framework that lets you build React and Node.js web apps using declarative TypeScript config files instead of wiring together dozens of libraries yourself. It has 18,384 GitHub stars and 1,447 forks as of June 2026, with active development pushing out releases every few weeks (v0.23.0 dropped in April 2026).

The project started in 2020 by Matija Šnajder and Martin Šošić, two Croatian engineers who were tired of setting up the same auth, routing, database, and deployment plumbing on every new project. Y Combinator backed them in 2021. That matters because YC doesn't fund frameworks unless they see real traction — and Wasp has been growing steadily since, with the team now shipping from Zagreb and San Francisco.

The core problem Wasp solves is the "full-stack setup tax." Every time you start a new React + Node.js project, you spend days configuring authentication (Passport, NextAuth, Clerk), database access (Prisma, Drizzle, TypeORM), API routes (Express, Fastify, tRPC), email sending (Nodemailer, Resend), background jobs (BullMQ, Inngest), and deployment (Docker, Vercel, Railway). Wasp gives you all of that in a single declarative spec file. You write 30 lines of config that would take 300+ lines of boilerplate across 10 different libraries.

### Why it matters

The JavaScript ecosystem is drowning in choice. A 2025 State of JS survey found that the average full-stack project uses 15-20 npm packages just for infrastructure — auth, ORM, API layer, state management, deployment config. That's before you write a single feature. Wasp collapses that into a single framework with opinionated defaults, similar to what Rails did for Ruby in 2004 or Django did for Python in 2005.

What makes Wasp especially relevant right now is its AI story. The framework ships with official AI agent plugins for Cursor, Claude Code, and other coding assistants. Because Wasp's spec file describes your entire app architecture in one place, AI agents have dramatically better context about your project. Instead of guessing which auth library you're using or how your API routes are structured, the agent reads your `.wasp.ts` file and knows exactly what you're building. Multiple developer surveys in early 2026 showed that developers using structured spec-driven frameworks reported 40-60% better results from AI coding assistants compared to those working in unstructured codebases.

This isn't theoretical. The Wasp team actively positions the framework as "built for the AI era," and the spec-driven approach is genuinely the right abstraction for agent-assisted development. If you're building web apps with AI coding tools, the framework choice matters more than it used to.

### Key Features

**Declarative App Specification.** Your entire app — routes, pages, queries, mutations, auth config, email templates, background jobs — lives in a single `main.wasp.ts` file. The compiler reads this spec and generates the full-stack source code. You write your business logic in regular React and Node.js files and reference them from the spec. This separation means the framework understands your app's architecture at a meta level, which is why AI agents work so well with it.

**Full-Stack Auth Out of the Box.** Wasp includes authentication with email/password, Google, GitHub, Discord, and key-based login built in. You get user entities, session management, login/signup pages, and `authRequired` route guards with a few lines of config. No Passport.js configuration, no session store setup, no JWT management. The auth system integrates with Prisma so your User model is just another database entity.

**End-to-End Type Safety.** Define a query on the server and call it on the client — TypeScript types flow automatically. Change a database field and your IDE flags every affected client call. This isn't just nice-to-have; it catches real bugs before they reach production. The type generation runs on save, so the feedback loop is instant.

**Automatic Cache Invalidation.** When you declare a query with its entities, Wasp knows which database tables that query depends on. When a mutation modifies a Task entity, every query that touches Tasks gets its cache invalidated automatically. This is the kind of feature that takes days to get right with React Query or SWR, and Wasp just does it.

**Built-In Background Jobs.** Define async jobs in your spec file with configurable retry logic, delays, and scheduling. No need to set up BullMQ, Redis, or a separate worker process. Jobs run in the same Node.js server during development and can be scaled to dedicated workers in production.

**Single-Command Deployment.** `wasp deploy` generates Docker images and deploys to Fly.io, Railway, or any Docker-compatible host. The build output is standard Node.js — no proprietary runtime. You can also eject from the deployment system entirely and manage your own infrastructure.

**AI Agent Plugin System.** Official plugins for Cursor, Claude Code, Copilot, and other coding assistants give AI tools structured context about your project. The agent reads your spec file, understands your data model, auth setup, and API surface, then generates code that actually fits your architecture instead of generic boilerplate.

### Use Cases

- **SaaS MVPs and side projects** — Get a full-stack app with auth, database, API, and deployment running in under an hour. Perfect for validating ideas quickly without spending a week on infrastructure.
- **Internal tools and dashboards** — The auth system and database integration mean you can build admin panels, CRMs, and data tools without wiring up separate auth and API layers.
- **AI-assisted development workflows** — If you're using Claude Code or Cursor heavily, Wasp's structured spec gives AI agents dramatically better project context than ad-hoc codebases.
- **Team projects with mixed experience levels** — Junior developers can write React components and Node.js logic while the framework handles the complex infrastructure decisions. The spec file acts as living documentation of the entire app architecture.

### Pros and Cons

Pros:
- Eliminates the "which library should I use" decision fatigue for auth, ORM, API, jobs, and email. One framework, one set of docs, one upgrade path.
- The declarative spec approach is genuinely novel and produces cleaner project structure than manually wiring together 15 packages.
- AI coding agents produce significantly better output when they can read a structured spec file instead of inferring architecture from scattered config files.
- Active community with 4,500+ Discord members and regular releases every 2-4 weeks. The team responds to issues quickly.

Cons:
- Still pre-1.0 (v0.23.0 as of April 2026), which means breaking changes happen regularly. The migration guides are solid, but you'll be updating your code every few months.
- The custom spec language (`.wasp.ts` files) adds a learning curve. You need to understand Wasp's DSL before you can be productive, unlike vanilla React + Express where you just write JavaScript.
- Lock-in risk is real despite the "no lock-in" marketing. While you can eject, the generated code is verbose and tightly coupled to Wasp's patterns. Migrating away would be a significant effort.
- npm downloads are still modest at ~9K/month, which means fewer community resources, tutorials, and Stack Overflow answers compared to Next.js or Remix.

### Getting Started

```bash
# Install Wasp on macOS, Linux, or WSL
npm i -g @wasp.sh/wasp-cli@latest

# Create a new project
wasp new my-app
cd my-app

# Start the development server (runs both frontend and backend)
wasp start

# Your app is now running at http://localhost:3000
# Admin at http://localhost:3001 (if you have admin routes)

# Generate TypeScript types from your schema
wasp db migrate-dev

# Deploy to Fly.io
wasp deploy fly
```

The `wasp new` command scaffolds a project with auth, database, and a few example pages. From there, you add your React components in `src/` and your server logic in `src/server/`, then wire everything together in `main.wasp.ts`.

### Alternatives

**Next.js with tRPC and NextAuth** — The most popular React full-stack stack. More flexible, larger ecosystem, and better documented. But you're assembling the pieces yourself — tRPC for type-safe APIs, NextAuth for authentication, Prisma for database, and separate config for each. Choose Next.js when you need maximum control over your architecture or when your team already knows the stack.

**Remix** — Another full-stack React framework that's closer to web standards. Remix uses loaders and actions instead of Wasp's spec files, which feels more familiar to developers who think in HTTP. Better choice if you want full-stack React without a custom DSL, but you'll still need to wire up auth, jobs, and email yourself.

**RedwoodJS** — The "Rails for JavaScript" that predates Wasp. Similar philosophy of opinionated full-stack development with GraphQL, Prisma, and React. Redwood's GraphQL-first approach is more mature but also more complex. Choose Redwood if you want GraphQL out of the box and don't mind the extra abstraction layer.

### Verdict

Wasp is the most interesting full-stack framework to come out of the JavaScript ecosystem in years. It's not trying to be everything — it's specifically designed for developers who want to build React + Node.js web apps without spending a week on plumbing. The declarative spec approach is genuinely novel, and the AI agent integration story is the strongest I've seen from any framework. At 18K+ stars with active development and a real community, it's past the "interesting experiment" phase and into "worth evaluating seriously" territory. The pre-1.0 status and breaking changes are real concerns for production use, but for new projects in mid-2026 where you want to move fast and use AI coding tools effectively, Wasp deserves a spot on your shortlist.
