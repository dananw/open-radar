---
name: scalar
description: "Scalar is the open-source API platform replacing Postman and Swagger UI — modern REST client, beautiful API docs, and 30+ framework integrations in one tool."
url: https://github.com/scalar/scalar
stars: 15280
forks: 873
language: TypeScript
tags: ["api", "openapi", "developer-tools", "rest-client", "documentation"]
featured: false
publishedAt: 2026-06-17
---

## Scalar

### Overview

Scalar is an open-source API platform that combines a modern REST API client with beautiful, interactive API reference documentation — all driven by your OpenAPI/Swagger specification. With over 15,000 GitHub stars and 873 forks, it has quietly become one of the most adopted developer tools in the API ecosystem. The project is actively maintained with commits landing daily, and its integration list now covers 30+ frameworks across every major language and runtime.

The project was created by the Scalar team, originally known for their work on API documentation tooling in the Vue.js ecosystem. What started as a better Swagger UI replacement has grown into a full platform: an offline-first API client that rivals Postman, a documentation generator that makes Swagger UI look like it was designed in 2011 (because it was), and a managed hosting service for teams that want edge-deployed API docs with GitHub sync. The MIT license means you can self-host everything without restrictions.

The core problem Scalar solves is the fragmented, outdated state of API tooling. Developers have been stuck choosing between Postman (increasingly bloated, account-gated, moving to a cloud-first model many teams dislike) and Swagger UI (functional but visually stuck in the past, limited testing capabilities). Scalar collapses both needs into a single, open-source tool that reads your existing OpenAPI spec and gives you both a reference docs site and a fully functional API client — no account required, no Electron bloat, just a clean web app or lightweight desktop binary.

### Why it matters

The API tooling space has been ripe for disruption for years. Postman's pivot toward a cloud-first, team-collaboration model pushed away individual developers who just wanted a clean HTTP client. Swagger UI, while ubiquitous, hasn't kept pace with modern UI expectations — it looks and feels like enterprise software from a decade ago. Scalar fills this gap with a tool that's both beautiful and functional, and it does so as fully open-source software.

What makes Scalar particularly relevant in 2026 is its framework integration strategy. Rather than being a standalone tool you have to configure separately, Scalar has first-class integrations with NestJS, Django, FastAPI, Go, Express, Hono, Next.js, and dozens more. Several frameworks — including ElysiaJS, Effect, Nitro, and Litestar — have adopted Scalar as their default OpenAPI documentation UI. This means if you're building APIs in any modern stack, there's likely a one-line setup path for Scalar.

The broader trend here is the "API-first" development model becoming standard practice. Teams define their API contract in OpenAPI, generate types and clients, and need tooling that integrates cleanly with that workflow. Scalar is the first tool I've seen that handles the full lifecycle — author, document, test, share — without requiring a SaaS subscription or a clunky desktop app.

### Key Features

**Modern REST API Client.** Scalar's API client is an offline-first tool that works in the browser or as a native desktop app on Windows, macOS, and Linux. It supports environment variables, dynamic parameters, request history, and collections — everything you'd expect from Postman, minus the account wall and the Electron memory footprint. The client understands OpenAPI natively, so your schemas, examples, and authentication flows are all wired up automatically.

**Interactive API References.** Drop a single `<script>` tag into any HTML page and you get a fully interactive API reference built from your OpenAPI spec. It's not just a static rendering — users can try endpoints directly from the docs, see real request/response examples, and switch between code generation languages. The design is clean, responsive, and actually pleasant to read, which matters more than developers admit.

**30+ Framework Integrations.** Scalar has official integration packages for React, Next.js, NestJS, Django, FastAPI, Flask, Go, Express, Fastify, Hono, SvelteKit, Nuxt, Astro, Laravel, Rails, Spring Boot, and more. The setup is typically one to three lines of code. This breadth is unmatched — no other API documentation tool comes close to this level of framework coverage.

**Code Generation.** The client generates ready-to-use code examples in multiple languages and frameworks directly from your OpenAPI spec. This is the kind of feature that saves hours when writing client SDKs or helping frontend developers integrate with your API. The generated code is clean and follows current best practices, not the auto-generated mess you get from older Swagger codegen tools.

**Watch Mode.** Point Scalar at your running development server and it watches for OpenAPI spec changes in real time. Your documentation and client stay in sync with your code without manual regeneration steps. This is a small feature that makes a big difference in daily workflow — you stop thinking about docs as a separate step.

**Managed Hosting with GitHub Sync.** For teams that want hosted API documentation, Scalar offers free managed hosting with SSL, custom domains, and GitHub sync. Push your OpenAPI spec to a repo and your docs update automatically. The free tier is generous enough for most teams, and the paid tier adds collaboration features and custom domains.

**Themes and Customization.** Scalar ships with multiple predefined themes and layouts, plus full CSS customization support. You can match your API docs to your brand without fighting the tool. The theming system is well-designed — sensible defaults that look good out of the box, with enough control for teams that need pixel-perfect branding.

### Use Cases

- **API-first teams** that define contracts in OpenAPI and need both documentation and a testing client from the same spec, eliminating the Swagger UI + Postman two-tool setup.
- **Fullstack developers building with NestJS, Django, or Go** who want auto-generated, interactive API docs that update as they code, without maintaining a separate documentation site.
- **Open-source API projects** that need professional-looking reference documentation hosted for free, with zero configuration overhead — just point Scalar at your spec URL.
- **Frontend teams consuming REST APIs** who need a clean client with environment variables and request history, but don't want to install Postman or create an account.
- **Platform teams standardizing API tooling** across an organization — Scalar's consistent experience across 30+ frameworks means every team gets the same documentation and client quality.

### Pros and Cons

Pros:
- Fully open-source with MIT license — no account walls, no usage limits, no "upgrade to Pro" popups. Self-host everything if you want.
- Framework integration breadth is genuinely impressive. The one-line setup for NestJS, Django, FastAPI, and others means adoption friction is near zero.
- The REST client is fast, clean, and native-feeling. It handles environments, auth, and collections without the bloat that Postman has accumulated over the years.
- Active development with daily commits and responsive maintainers. The project has grown from 0 to 15K+ stars with strong community momentum.

Cons:
- The managed hosting features (GitHub sync, custom domains, collaboration) require a Scalar account, which somewhat undercuts the "no accounts needed" pitch for the self-hosted version.
- The desktop app, while available on all platforms, is still maturing. Some advanced Postman features like mock servers, monitoring, and team workspaces aren't replicated yet.
- OpenAPI-first means if your API doesn't use OpenAPI/Swagger specs, Scalar has nothing to work with. It's not a general-purpose HTTP client like Insomnia or Bruno that works with any endpoint.

### Getting Started

The fastest way to try Scalar is with a single HTML file:

```html
<!doctype html>
<html>
  <head>
    <title>Scalar API Reference</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <div id="app"></div>
    <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
    <script>
      Scalar.createApiReference('#app', {
        url: 'https://registry.scalar.com/@scalar/apis/galaxy?format=json',
        proxyUrl: 'https://proxy.scalar.com',
      })
    </script>
  </body>
</html>
```

For NestJS, install the integration package:

```bash
npm install @scalar/nestjs-api-reference
```

Then add it to your bootstrap:

```typescript
import { ScalarIntegration } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/reference', ScalarIntegration({ url: '/openapi.json' }));
  await app.listen(3000);
}
```

For Django, add `django-scalar` to your `INSTALLED_APPS` and point it at your OpenAPI schema URL. For Go, use the `scalar-go` middleware. The documentation at scalar.com has specific guides for every supported framework.

Download the desktop client from scalar.com/download for a native API testing experience, or use the browser version at client.scalar.com.

### Alternatives

**Postman** — The incumbent API testing platform with 30M+ users. Postman is more feature-complete (mock servers, monitoring, team workspaces, Newman CLI) but has moved aggressively toward a cloud-first model that requires accounts and increasingly pushes paid features. Scalar is the better choice if you want a clean, open-source client without the SaaS overhead.

**Swagger UI** — The default OpenAPI documentation renderer that ships with most API frameworks. Swagger UI is battle-tested and universally supported, but its design hasn't evolved meaningfully in years. Scalar generates better-looking, more interactive documentation from the same OpenAPI spec. Choose Swagger UI only if you need absolute zero-dependency rendering or your team is locked into the Swagger ecosystem.

**Bruno** — An open-source API client that stores collections as files in your repo. Bruno is a strong Postman alternative for teams that want Git-versioned API collections. It lacks Scalar's documentation generation capabilities, though. Choose Bruno if your primary need is a file-based API client; choose Scalar if you want docs and a client from the same tool.

### Verdict

Scalar is the API tooling upgrade most web development teams didn't know they needed. The combination of a clean REST client and beautiful auto-generated documentation from your existing OpenAPI spec — all open-source, all self-hostable — fills a gap that Postman and Swagger UI have left wide open for years. The 15K+ stars and adoption by major frameworks like ElysiaJS and Effect as their default docs UI suggest the developer community agrees. If you're building APIs with NestJS, Django, FastAPI, Go, or any of the 30+ supported frameworks, there's almost no reason not to try Scalar. The one-line integration setup means the switching cost is measured in minutes, not days. This is the kind of tool that makes you wonder why you tolerated the alternatives for so long.
