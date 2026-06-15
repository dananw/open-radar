---
name: microsoft-rayfin
description: "Microsoft Rayfin is an open-source BaaS built on Fabric — define your data model with TypeScript decorators and get database, auth, APIs, storage, and hosting automatically."
url: https://github.com/microsoft/rayfin
stars: 489
forks: 39
language: TypeScript
tags: ["baas", "microsoft", "typescript", "fullstack", "fabric"]
featured: false
publishedAt: 2026-06-15
---

## Microsoft Rayfin

### Overview

Rayfin is Microsoft's new open-source Backend-as-a-Service platform, launched in May 2026 and built on top of Microsoft Fabric. The core idea is simple: you write TypeScript decorators to define your data model, and Rayfin provisions and manages everything else — database, authentication, REST APIs, blob storage, and hosting. Two commands get you from zero to a running backend: `npm create @microsoft/rayfin@latest` followed by `npx rayfin up`.

The project ships as a monorepo with 15 published npm packages under the `@microsoft/rayfin-*` namespace. There's a core SDK for entity decorators and schema definitions, a type-safe data client for Data API Builder endpoints, an auth package with Fabric brokered authentication, a functions runtime, and a storage client. The CLI handles scaffolding, deployment, and project management. There's even an MCP package for AI tooling integration, which signals where Microsoft thinks this platform is headed.

What makes Rayfin different from Firebase, Supabase, or AWS Amplify is the Fabric foundation. Microsoft Fabric is Microsoft's unified data platform — the one that absorbed Azure Synapse, Power BI, and a dozen other enterprise data services. Rayfin apps inherit Fabric's centralized data governance, access control, and compliance capabilities out of the box. For teams already in the Microsoft ecosystem, this means your BaaS app doesn't become a governance island. It plugs into the same data discovery and access policies your organization already uses.

### Why it matters

The BaaS space has been dominated by two players for years: Firebase (Google) and Supabase (open-source Postgres). AWS Amplify exists but has earned a reputation for complexity. Each has real limitations. Firebase locks you into Google's proprietary Firestore and charges aggressively at scale. Supabase is open-source but requires you to manage your own infrastructure or pay for their hosted offering. Neither integrates naturally with enterprise Microsoft shops that run on Azure AD, use Teams, and govern data through Fabric.

Rayfin fills that gap. If your organization already pays for Microsoft Fabric — and according to Microsoft's Q1 2026 earnings call, Fabric now has over 25,000 paying customers — Rayfin gives you a BaaS that lives inside that governance boundary. Your data doesn't sit in a separate Firebase project with its own access controls. It sits in Fabric, governed by the same policies as your data warehouse, your Power BI dashboards, and your Synapse pipelines.

The decorator-based approach to data modeling is also worth noting. Instead of writing SQL migrations or defining JSON schemas, you annotate TypeScript classes:

```typescript
@Entity("todos")
class Todo {
  @PrimaryKey()
  id: string;

  @Column()
  title: string;

  @Column({ defaultValue: false })
  completed: boolean;
}
```

This is the same pattern Prisma and TypeORM popularized, but Rayfin generates the backend infrastructure from it — not just the database schema. The decorator defines the table, the API endpoint, the storage bindings, and the access policies. That's a different level of abstraction than an ORM.

### Key Features

**TypeScript Decorator-Based Data Modeling.** You define entities using TypeScript decorators — `@Entity`, `@Column`, `@PrimaryKey` — and Rayfin generates the full backend from those definitions. This isn't just schema generation like Prisma. The decorators drive database provisioning, REST API creation, storage bindings, and access policies simultaneously. Your data model is your infrastructure definition.

**Microsoft Fabric Integration.** Rayfin runs on Microsoft Fabric, which means your app inherits enterprise-grade data governance, centralized access control, and compliance capabilities from day one. For organizations already using Fabric for analytics, this eliminates the "shadow IT" problem where BaaS apps operate outside the governance perimeter. Data discovery, lineage tracking, and access reviews all work automatically.

**Full Package Ecosystem.** The monorepo ships 15 npm packages covering every layer: `@microsoft/rayfin-core` for decorators and types, `@microsoft/rayfin-data` for type-safe API clients, `@microsoft/rayfin-auth` with Fabric brokered authentication, `@microsoft/rayfin-functions` for serverless compute, `@microsoft/rayfin-storage` for blob operations, and `@microsoft/rayfin-mcp` for AI agent integration. You can use the full stack or cherry-pick packages.

**Local Development Mode.** Rayfin supports a pure local development experience with no cloud resources required. This is marked as experimental, but it works — you can scaffold a project, define your models, and run everything locally with `npx rayfin up`. For teams that want to iterate quickly without provisioning Azure resources, this removes a major friction point.

**Two-Command Deployment.** `npm create @microsoft/rayfin@latest` scaffolds a complete project with data models, authentication, APIs, and a ready-to-deploy app. `npx rayfin up` deploys it. The CLI handles resource provisioning, configuration, and deployment in a single step. No ARM templates, no Terraform, no manual Azure portal clicks.

**Built-In Authentication.** The auth package provides Fabric brokered authentication out of the box, with support for Microsoft Entra ID (formerly Azure AD). For enterprise apps that need SSO with existing Microsoft 365 accounts, this is built in — no need to integrate a separate auth provider like Auth0 or Clerk.

**MCP Tooling for AI Agents.** The `@microsoft/rayfin-mcp` package provides Model Context Protocol integration, letting AI agents interact with your Rayfin backend directly. This forward-looking feature positions Rayfin for the emerging pattern where AI agents manage data, trigger workflows, and interact with APIs autonomously.

### Use Cases

- **Enterprise internal tools** — Teams that need quick backends for internal dashboards, approval workflows, or data entry apps, and want those apps governed by existing Fabric policies. No separate infrastructure to audit.

- **Rapid prototyping for Microsoft-ecosystem startups** — If your team uses Azure AD, Teams, and Power BI, Rayfin gives you a BaaS that fits that stack natively. Prototype in hours, not days, without leaving the Microsoft ecosystem.

- **Data-forward applications** — Apps where the data model is the core product — CRMs, inventory systems, project trackers. Define your entities once and get a working backend with APIs, auth, and storage immediately.

- **AI agent backends** — With MCP integration built in, Rayfin is positioned for apps where AI agents need structured access to data and APIs. Build a backend that agents can query and modify programmatically.

- **Fabric-augmented applications** — Apps that sit alongside your existing Fabric data estate. Your BaaS app can read from and write to the same governed data lakehouse that powers your analytics.

### Pros and Cons

Pros:
- Native Microsoft Fabric integration means enterprise governance comes free — no separate access control, data discovery, or compliance setup for your BaaS apps.
- The decorator-based data modeling approach is genuinely productive. Define a TypeScript class, get a full backend. The abstraction level is higher than Prisma or Supabase's schema approach.
- Two-command setup (create + deploy) with local development mode removes infrastructure friction. You can be running locally in under a minute.
- Backed by Microsoft with MIT license. This isn't an abandoned side project — it has a monorepo with 15 packages, documentation, templates, and a Reddit community.

Cons:
- Early stage with only 489 GitHub stars and limited community adoption. The API surface is likely to change, and finding answers to problems will be harder than with Firebase or Supabase.
- Deep dependency on Microsoft Fabric means you're tied to the Microsoft ecosystem. If your team doesn't use Fabric, the governance advantages evaporate, and you're left with a less mature BaaS than the alternatives.
- Local development mode is marked experimental. For now, the full experience requires a Fabric subscription, which starts at a capacity tier that may be overkill for small projects.
- No real-time subscriptions or WebSocket support documented yet. Firebase's real-time database and Supabase's Realtime are major features that Rayfin hasn't addressed.

### Getting Started

```bash
# Create a new Rayfin project
npm create @microsoft/rayfin@latest

# Navigate into your project
cd my-rayfin-app

# Install dependencies
npm install

# Define your data model in src/models/todo.ts
# using TypeScript decorators (@Entity, @Column, @PrimaryKey)

# Start local development (experimental)
npx rayfin up

# Deploy to Microsoft Fabric
npx rayfin deploy
```

The scaffolded project includes example models, authentication setup, and a starter frontend. Check the official docs at https://aka.ms/rayfin/docs for the full getting-started guide and API reference.

### Alternatives

**Firebase** — Google's BaaS platform is the market leader with the largest ecosystem, best documentation, and most mature tooling. Firebase offers real-time database, cloud functions, hosting, and authentication with generous free tiers. Choose Firebase over Rayfin when you need real-time features, aren't in the Microsoft ecosystem, or want the most battle-tested BaaS available. Firebase's vendor lock-in to Google Cloud is its main downside.

**Supabase** — The open-source Firebase alternative built on PostgreSQL. Supabase gives you a real Postgres database with Row Level Security, real-time subscriptions, edge functions, and a generous free tier. Choose Supabase over Rayfin when you want open-source transparency, SQL-native data modeling, or real-time features. Supabase's hosted offering is simpler than managing your own Fabric capacity.

**AWS Amplify** — Amazon's full-stack development platform for building web and mobile apps. Amplify supports React, Next.js, Flutter, and Swift with Gen 2 offering a code-first approach. Choose Amplify over Rayfin when you're already deep in AWS, need to support mobile platforms natively, or want the broadest set of cloud services integration. Amplify's complexity and learning curve are its main weaknesses.

### Verdict

Rayfin is a smart strategic play from Microsoft. The BaaS market has a Microsoft-shaped hole — Firebase and Supabase don't integrate with Fabric, Azure AD, or the Microsoft 365 ecosystem, and AWS Amplify serves a different cloud. For organizations already paying for Fabric, Rayfin offers something no competitor can: a BaaS that lives inside your existing governance and data platform.

That said, it's early. 489 stars, experimental local development, and an API surface that will almost certainly change mean this is not a production-ready choice today. The decorator-based modeling is genuinely elegant, and the two-command deployment story is compelling, but the real test will be whether Microsoft sustains investment beyond the initial launch. Microsoft has a history of launching developer tools that quietly die (Fluid Framework, anyone). Watch the commit frequency and issue response times over the next three months before committing to it for anything important.

If you're a fullstack developer in a Microsoft shop who's been jealous of how fast Firebase teams ship prototypes, Rayfin is worth a serious look. Start with the local dev mode, build something small, and see if the decorator approach clicks for your team.
