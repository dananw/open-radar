---
name: ghostfolio
description: "Open source wealth management software built with Angular, NestJS, Prisma, and TypeScript — a production-grade fullstack reference architecture."
url: https://github.com/ghostfolio/ghostfolio
stars: 8707
forks: 1189
language: TypeScript
tags: ["nestjs", "angular", "prisma", "typescript", "fullstack", "finance", "self-hosted"]
featured: false
publishedAt: 2026-06-15
---

## Ghostfolio

### Overview

Ghostfolio is an open source wealth management application that tracks stocks, ETFs, and cryptocurrencies. It has 8,700+ GitHub stars and is releasing new versions almost daily — v3.11.0 dropped on June 14, 2026, with v3.10.0 the day before. That velocity is rare for an open source project this mature.

The project was started by Thomas Kaul in 2021 and has grown into a serious fullstack TypeScript reference architecture. The backend runs on NestJS with PostgreSQL and Prisma, the frontend is Angular with Angular Material, and the whole thing is organized as an Nx monorepo. If you're building anything with NestJS, this repo is worth studying regardless of whether you care about finance.

The core problem Ghostfolio solves is deceptively simple: giving people a self-hosted, privacy-respecting way to track investments across multiple platforms. Most alternatives are either closed-source SaaS products that own your financial data, or spreadsheet-based workflows that don't scale. Ghostfolio sits in between — a real application with charts, analytics, and multi-account management that runs on your own infrastructure.

### Why it matters

The fullstack TypeScript ecosystem has matured significantly, but production-grade open source applications that demonstrate best practices are still scarce. You can find plenty of todo apps and starter templates, but few projects show how to actually structure a real NestJS backend with proper authentication, background jobs, caching, and database migrations at scale. Ghostfolio does all of this, with five years of production use behind it.

For developers working with NestJS specifically, this is one of the most comprehensive real-world implementations available. The Prisma schema alone is instructive — it models complex financial relationships (accounts, holdings, orders, platforms, tags) with proper foreign keys and indexing. The Nx workspace structure shows how to organize a monorepo with shared libraries, separate apps, and proper build caching. These patterns transfer directly to enterprise projects.

The project also demonstrates something important about the Angular + NestJS combination that gets overlooked in the React-dominated discourse. Angular's opinionated structure actually works well for large applications with complex state management needs. Ghostfolio's use of Angular Material, lazy-loaded modules, and service-based architecture is a masterclass in building maintainable Angular apps.

### Key Features

**NestJS Backend with Domain-Driven Design.** The backend follows DDD principles with clear separation between controllers, services, and data access layers. Each domain (accounts, holdings, orders, user) has its own module with proper encapsulation. This structure scales cleanly as the application grows — adding a new financial instrument type doesn't require touching unrelated code.

**Prisma ORM with PostgreSQL.** The data layer uses Prisma for type-safe database access with PostgreSQL. The schema models complex financial relationships including multi-currency support, transaction history, and portfolio snapshots. Prisma's migration system handles schema evolution cleanly, and the generated types ensure compile-time safety across the entire stack.

**Nx Monorepo Architecture.** The entire project is organized as an Nx workspace with shared libraries, separate frontend and backend applications, and proper dependency management. Build caching makes development fast — only affected projects rebuild when you change code. This structure is directly applicable to any enterprise TypeScript monorepo.

**Self-Hosting with Docker.** Ghostfolio provides official Docker images for linux/amd64, linux/arm/v7, and linux/arm64. The docker-compose setup includes PostgreSQL, Redis, and the Ghostfolio application in a single command. This isn't a demo deployment — it's production-ready with proper health checks and volume mounts.

**Progressive Web App (PWA).** The frontend is a PWA with mobile-first design, meaning it works offline and installs like a native app on phones. Angular's service worker integration handles caching and background sync. The responsive layout adapts cleanly from mobile to desktop without separate codebases.

**Portfolio Analytics and Risk Assessment.** Beyond simple tracking, Ghostfolio provides Return on Average Investment (ROAI) calculations across multiple time periods, portfolio composition analysis, and static risk assessment. The charting system uses historical data to show performance trends. These aren't toy visualizations — they're the kind of financial analytics you'd expect from a commercial product.

**Multi-Account and Multi-Currency Support.** Users can manage multiple brokerage accounts with different base currencies. The system handles currency conversion transparently when calculating portfolio totals. Transaction import/export supports CSV formats from major brokerages. This multi-tenancy pattern is relevant for any SaaS-style application.

### Use Cases

- **NestJS reference architecture** — Study how a production NestJS application structures modules, handles authentication, manages database migrations, and implements background jobs. The codebase is mature enough to show real patterns, not just tutorial-level examples.

- **Fullstack TypeScript portfolio project** — Fork and customize Ghostfolio for your own investment tracking needs while learning Angular + NestJS + Prisma in a real application context. The self-hosting setup means you can run it locally in minutes.

- **Nx monorepo template** — Use the workspace structure as a starting point for enterprise TypeScript projects. The shared library patterns, build configuration, and dependency management are directly transferable.

- **Financial data visualization** — Study the charting and analytics implementation for projects that need to display time-series data, portfolio compositions, or performance metrics. The Angular Material integration is clean and reusable.

- **Self-hosted SaaS reference** — Learn how to build an application designed for self-hosting from the start. The Docker setup, environment configuration, and database migration patterns are applicable to any project targeting self-hosted deployment.

### Pros and Cons

Pros:
- **Production-grade NestJS codebase with five years of real-world use.** This isn't a demo — it handles real financial data with proper error handling, validation, and security patterns. The Prisma schema and module structure are directly applicable to enterprise projects.
- **Extremely active development with daily releases.** Five releases in the first two weeks of June 2026 shows sustained momentum. The maintainers respond to issues quickly and the changelog is detailed.
- **Complete self-hosting story with Docker.** One `docker compose up` command gets you a fully functional application. The ARM support means it runs on Raspberry Pi for home server setups.

Cons:
- **Angular frontend limits React developer adoption.** If your stack is React-based, you can still learn from the backend patterns, but the frontend code won't transfer directly. The Angular Material dependency also means the UI has a distinctive Material Design look.
- **Financial domain adds complexity that may not transfer.** Some of the Prisma schema complexity comes from modeling financial instruments (multi-currency, historical prices, portfolio snapshots). Not every fullstack app needs this level of data modeling.
- **AGPL-3.0 license restricts commercial embedding.** The copyleft license means you can't incorporate Ghostfolio code into a proprietary SaaS product without open-sourcing your changes. This is fine for learning and personal use but limits commercial applications.

### Getting Started

```bash
# Clone the repository
git clone https://github.com/ghostfolio/ghostfolio.git
cd ghostfolio

# Quick start with Docker (recommended)
docker compose up -d

# Access the application at http://localhost:3333
# Register a new account and configure your first portfolio

# For development (requires Node.js 20+, pnpm)
pnpm install
pnpm run start:dev

# Run database migrations
pnpm run database:migration:generate
pnpm run database:migration:run

# Build for production
pnpm run build:production
```

### Alternatives

**Maybe Finance** — An open source personal finance tracker built with Ruby on Rails and React. Maybe Finance focuses more on budgeting and expense tracking rather than investment portfolio management. Choose Maybe Finance if you need expense categorization and budgeting features; choose Ghostfolio if your primary need is tracking stock and crypto investments.

**Portfolio Performance** — A Java-based desktop application for portfolio tracking and analysis. It's been around since 2012 and has deep support for European financial instruments. Choose Portfolio Performance if you prefer a desktop app and need advanced reporting for European tax purposes; choose Ghostfolio if you want a web-based, self-hosted solution with a modern TypeScript stack.

**Ghostfolio Premium** — The hosted SaaS version of Ghostfolio itself. It eliminates the self-hosting overhead and includes professional data provider integrations. Choose the Premium version if you want the Ghostfolio experience without managing infrastructure; choose self-hosted if you want full data ownership and control over your financial information.

### Verdict

Ghostfolio is the best open source example of a production NestJS + Angular + Prisma application I've found. The codebase quality is consistently high, the development velocity is impressive, and the self-hosting story actually works. If you're building anything with NestJS, spend an afternoon reading through the module structure, the Prisma schema, and the Nx workspace configuration. The patterns you'll learn transfer directly to enterprise projects, even if you never track a single stock. The 8,700-star count and daily release cadence tell you this project has real momentum — it's not going anywhere.
