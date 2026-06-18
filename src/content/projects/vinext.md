---
name: vinext
description: "Cloudflare's vinext reimplments the Next.js API surface on Vite — deploy your existing Next.js app to any platform with faster builds and zero vendor lock-in."
url: https://github.com/cloudflare/vinext
stars: 8225
forks: 340
language: TypeScript
tags: ["vite", "nextjs", "cloudflare", "react", "deployment", "framework"]
featured: false
publishedAt: 2026-06-18
---

## Vinext

### Overview

Vinext is a Vite plugin that reimplements the entire Next.js API surface from scratch. It hit 8,000 GitHub stars within four months of its February 2026 launch, which is a strong signal that developers are hungry for an escape from the Vercel-centric Next.js deployment story.

The project comes from Cloudflare. That's not a random open-source contributor — it's the company that runs one of the largest edge networks on the planet and has been steadily building out its developer platform (Workers, D1, R2, KV, AI). Cloudflare has a direct business interest in making it easy to deploy Next.js apps on their infrastructure. But vinext is MIT-licensed and genuinely deploy-anywhere, not a Cloudflare lock-in play. You can ship to Vercel, Netlify, AWS, Deno Deploy, or any Node.js server via the Nitro plugin.

The core problem vinext solves: Next.js is a fantastic React framework, but its build toolchain is deeply coupled to Vercel. Self-hosting works, but features like ISR, middleware, and image optimization assume Vercel's infrastructure. OpenNext exists as a compatibility adapter, but it works on top of Next.js's own build output — which means you're still running the Next.js compiler. Vinext takes a different approach. It reimplements the Next.js APIs on Vite, giving you a completely different build toolchain that produces lighter, faster builds while targeting the same API surface your existing code uses.

### Why it matters

The React framework wars in 2026 are less about features and more about deployment flexibility. Every serious React developer has hit the wall where their Next.js app works beautifully on Vercel but becomes a headache to deploy elsewhere. The `next build` output is opaque, the runtime expectations are specific, and features like server actions and React Server Components assume a particular hosting model.

Vinext represents a genuine architectural fork in how Next.js apps get built and deployed. It uses Vite 8 (with Rolldown and Oxc under the hood), the new `@vitejs/plugin-rsc` for React Server Components, and Cloudflare's workerd runtime for local development. The result is faster HMR, smaller bundles, and deployment to literally any platform. For a fullstack developer running a React frontend with a NestJS or Go backend, vinext means you can deploy your frontend to the edge without rewriting anything.

There's also the AI development angle. Cloudflare is transparent that most of vinext's code, tests, and documentation were written by AI agents with human steering. That's either terrifying or inspiring depending on your perspective, but the 1,700+ Vitest tests and 380+ Playwright E2E tests suggest the quality bar is real. They ported tests directly from the Next.js test suite and OpenNext's Cloudflare conformance suite.

### Key Features

**Full Next.js API Surface Reimplementation.** Vinext supports both the App Router and Pages Router, including file-system routing, SSR, client hydration, server actions, middleware, metadata, and streaming. It targets Next.js 16.x specifically — no legacy API support, which keeps the surface area manageable. The `vinext check` command scans your existing Next.js app and tells you exactly what's compatible before you migrate.

**One-Command Cloudflare Deployment.** The `vinext deploy` command handles everything: auto-generating Vite config, building the multi-environment output (RSC + SSR + client for App Router), and deploying to Cloudflare Workers. It auto-detects and fixes common migration issues like missing `"type": "module"` in package.json, CJS config file conflicts, and native Node.js module stubs for the Workers runtime. No `wrangler.jsonc` gymnastics required.

**Native Cloudflare Bindings Access.** Import `env` from `"cloudflare:workers"` in any server component, route handler, or server action to access D1 databases, R2 storage, KV namespaces, Durable Objects, AI models, Queues, and Vectorize. No custom worker entry, no `getPlatformProxy()` workaround. This is the cleanest integration with Cloudflare's platform I've seen in any framework.

**Deploy Anywhere via Nitro.** Don't want Cloudflare? Add the Nitro Vite plugin and deploy to Vercel, Netlify, AWS Amplify, Deno Deploy, Azure, or any Node.js server. Nitro auto-detects the deployment platform in CI environments, so you typically don't need platform-specific configuration. Set `NITRO_PRESET=vercel` and build — done.

**Non-Destructive Migration.** `vinext init` automates the migration from a Next.js project without modifying your existing setup. It installs dependencies, renames CJS configs, adds `"type": "module"`, and generates a minimal `vite.config.ts`. Your `next.config.js`, `tsconfig.json`, and source files remain untouched. You can run both Next.js and vinext side by side during migration — `npm run dev` still runs Next.js, `npm run dev:vinext` runs vinext on port 3001.

**Traffic-Aware Pre-Rendering.** An experimental feature (`--experimental-tpr`) queries Cloudflare zone analytics at deploy time to identify which pages actually receive traffic, then pre-renders only those and uploads them to KV cache. You get SSG-level latency for popular pages without pre-rendering your entire site. This is smart engineering — optimize for real user behavior, not hypothetical page counts.

**Agent Skill for Automated Migration.** Vinext ships an Agent Skill that works with Claude Code, OpenCode, Cursor, Codex, and other AI coding tools. Install it with `npx skills add cloudflare/vinext`, open your Next.js project, and say "migrate this project to vinext." The skill handles compatibility checking, dependency installation, config generation, and dev server startup. This is the first framework I've seen that ships first-class AI migration tooling out of the box.

### Use Cases

- **Next.js apps that need to run outside Vercel** — If you've been fighting with self-hosting Next.js or using OpenNext adapters, vinext gives you a cleaner path. The Vite toolchain produces standard output that runs anywhere.

- **Teams on Cloudflare's platform** — If you're already using Workers, D1, R2, or KV, vinext gives you the tightest integration possible. The `cloudflare:workers` import pattern is dead simple compared to other frameworks' Cloudflare adapters.

- **Projects hitting Next.js build performance walls** — Vite 8 with Rolldown is fast. If your Next.js dev server is slow or builds are taking too long, vinext's Vite-based toolchain may help. The benchmarks from their blog post show meaningful improvements in HMR and build times.

- **Developers who want to experiment with RSC without Next.js lock-in** — Vinext uses `@vitejs/plugin-rsc` directly, which means you're building on open Vite infrastructure rather than framework-specific abstractions. If the RSC landscape shifts, you're not stuck.

- **Fullstack teams running React frontends alongside Go, NestJS, or Django backends** — Deploy the React frontend to the edge (Cloudflare Workers) while keeping your API server wherever it runs. Vinext's `output: "standalone"` mode generates a self-contained Node.js server if you prefer traditional hosting.

### Pros and Cons

Pros:
- Genuine portability — your Next.js codebase runs on a completely different toolchain, which is the strongest vendor-independence story in the React ecosystem right now.
- The migration path is non-destructive and incremental. You can evaluate vinext without committing to it, which lowers the adoption barrier significantly.
- Cloudflare's investment (both engineering resources and the blog post explaining their AI-driven development process) suggests this isn't a side project that'll be abandoned in six months.
- 1,700+ Vitest tests and 380+ Playwright E2E tests ported from the Next.js and OpenNext test suites provide real confidence in compatibility.

Cons:
- Experimental status with 297 open issues as of June 2026. The README is upfront about this — "there may be bugs, rough edges, or things that don't work." Production use requires careful evaluation.
- Targets Next.js 16.x only. If your project is on an older version, you'll need to upgrade first. Deprecated APIs from older Next.js versions are intentionally not supported.
- The AI-written codebase raises legitimate questions about long-term maintainability and the ability of human contributors to understand and modify the code. Cloudflare says humans review all PRs, but the bulk of the implementation is machine-generated.
- 95%+ compatibility target means some edge cases won't work. If your app depends on undocumented Vercel-specific behavior, vinext won't replicate it.

### Getting Started

```bash
# Check if your existing Next.js app is compatible
npx vinext check

# Automated migration (non-destructive)
npx vinext init

# Start the vinext dev server
npm run dev:vinext

# Build for production
npm run build:vinext

# Deploy to Cloudflare Workers
npx vinext deploy

# Or use the Agent Skill for AI-assisted migration
npx skills add cloudflare/vinext
# Then open your project and tell your AI agent: "migrate this project to vinext"
```

For new projects, start with `npm create next-app@latest` and then run `vinext init` to migrate. A proper `npm create vinext` workflow is planned.

Custom Vite config for Cloudflare Workers with App Router:

```ts
import { defineConfig } from "vite";
import vinext from "vinext";
import rsc from "@vitejs/plugin-rsc";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    vinext(),
    rsc({
      entries: {
        rsc: "virtual:vinext-rsc-entry",
        ssr: "virtual:vinext-app-ssr-entry",
        client: "virtual:vinext-app-browser-entry",
      },
    }),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
});
```

### Alternatives

**OpenNext** — The mature, battle-tested option for deploying Next.js outside Vercel. OpenNext adapts the output of `next build` rather than reimplementing the APIs, which means broader API coverage and more production validation. If you need something that works today with minimal risk, OpenNext is the safer bet. Vinext is lighter and faster but less proven.

**Next.js Self-Hosting** — Next.js can run on any Node.js server, Docker container, or as a static export. If you don't need edge deployment and are comfortable with the Next.js toolchain, self-hosting is the simplest path. No new toolchain to learn, no migration risk. The tradeoff is you're still running the full Next.js compiler and runtime.

**Astro** — If you're starting a new content-heavy project and don't need the full React SSR experience, Astro's island architecture ships less JavaScript and has first-class support for multiple frameworks. Astro doesn't try to be a Next.js replacement — it's a different philosophy. But for marketing sites, blogs, and docs, it's often the better choice.

### Verdict

Vinext is the most interesting thing happening in the React deployment space right now. The idea of reimplementing Next.js's API surface on Vite sounds audacious, and honestly it is — but the execution is surprisingly solid. The test coverage is serious, the migration path is non-destructive, and the Cloudflare team is investing real resources into it. For fullstack developers who've been frustrated by Next.js's Vercel-centric deployment story, vinext offers a genuine escape hatch. It's experimental software with 297 open issues, so don't migrate your production app tomorrow. But if you're starting a new project in mid-2026 or evaluating deployment options for an existing Next.js codebase, vinext deserves a serious look. The 8K stars in four months, mostly organic from the developer community, suggest others agree.
