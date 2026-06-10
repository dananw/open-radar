---
name: rolldown
description: "Rolldown is the Rust-powered JavaScript bundler replacing Rollup in Vite — Rollup-compatible API, 10-30x faster builds, and 13K+ GitHub stars."
url: https://github.com/rolldown/rolldown
stars: 13714
forks: 788
language: Rust
tags: ["bundler", "javascript", "typescript", "vite", "rust"]
featured: false
publishedAt: 2026-06-11
---

## Rolldown

### Overview

Rolldown is a JavaScript and TypeScript bundler written in Rust that's designed to replace Rollup as the bundler inside Vite. It hit 13,700 GitHub stars by mid-2026, with 185 contributors and a v1.1.0 release on June 3, 2026 that introduced breaking default changes — a sign the project is maturing past its initial stable milestone.

The project comes from VoidZero Inc., the company founded by Anthony Fu and the Vite core team to build the next-generation JavaScript toolchain. That's the same team behind Vite, which has become the default build tool for React, Vue, Svelte, and Solid projects. VoidZero raised funding specifically to consolidate the fragmented JS tooling ecosystem — esbuild for dev, Rollup for production, SWC for transforms — into a unified Rust-based stack. Rolldown is the bundler piece of that vision.

The core problem Rolldown solves is speed without breaking existing workflows. Rollup is flexible and has the best plugin ecosystem in JavaScript bundling, but it's written in JavaScript and hits performance walls on large codebases. esbuild is fast but has a different plugin API and doesn't support Rollup's full feature set. Rolldown gives you Rollup's API surface with Rust-level performance, powered by the same oxc parser and resolver that VoidZero's other tools use. Early benchmarks show 10-30x faster builds compared to Rollup on real-world projects.

### Why it matters

If you're building anything with Vite today — and statistically, you probably are — Rolldown is the bundler you'll be using within the next year. Vite 6.x already ships with experimental Rolldown support, and the plan is to make it the default production bundler, replacing Rollup entirely. This isn't a speculative bet; it's the stated roadmap from the Vite team.

The broader context is the Rust rewrite of the entire JavaScript toolchain. SWC replaced Babel for transforms. oxc is replacing ESLint's parser. And Rolldown is replacing Rollup for bundling. Each of these moves trades JavaScript's flexibility for Rust's performance, and the results are dramatic enough that the ecosystem is adopting them faster than anyone expected. For fullstack developers, this means your build times are about to get a lot shorter, and you won't need to change your config to benefit.

What makes Rolldown particularly interesting is the plugin compatibility story. It's not just fast — it's Rollup-compatible. Existing Rollup plugins work with minimal or no changes. That migration path is what separates Rolldown from esbuild, which required a completely different plugin model and left the Rollup ecosystem behind.

### Key Features

**Rollup-Compatible Plugin API.** Rolldown implements Rollup's plugin interface, which means the thousands of existing Rollup plugins work with Rolldown with little to no modification. If you've written custom Rollup plugins for your project, they'll likely just work. This is the single most important feature — it means adoption doesn't require rewriting your build pipeline.

**Rust-Powered Performance.** Built on oxc (the Rust-based parser, resolver, and sourcemap toolkit from the same VoidZero team), Rolldown parses and bundles JavaScript and TypeScript at speeds that make Node.js-based bundlers look slow. On the esbuild benchmark suite, Rolldown consistently posts times in the same ballpark as esbuild while offering Rollup's richer feature set.

**Native TypeScript and JSX Support.** Rolldown handles TypeScript and JSX transformation out of the box without needing Babel or SWC as separate transform steps. The oxc transformer that powers this is the same one used across VoidZero's toolchain, so your dev and production transforms are identical.

**Code Splitting with Advanced Chunking.** Unlike esbuild's relatively simple code splitting, Rolldown supports Rollup-style manual chunks, dynamic import optimization, and fine-grained chunk control. You get the splitting strategies that production React and Vue apps actually need — not just basic dynamic import boundaries.

**Built-in Dev Server Integration.** Rolldown isn't just a production bundler. It's designed to handle both dev and production modes, which is why Vite chose it. The same bundler powers HMR in development and optimized builds in production, eliminating the "works in dev, breaks in prod" class of bugs that comes from using different tools for each mode.

**CSS and Asset Processing.** Rolldown processes CSS modules, static assets, and CSS code splitting as first-class features. You don't need separate PostCSS or asset pipeline plugins for common use cases — they're built into the bundler itself, which keeps the dependency tree smaller and builds faster.

**Cross-Platform Binary Distribution.** Rolldown ships as platform-specific native binaries (darwin-arm64, linux-x64, win32-x64, and even wasm32-wasi for edge cases) via npm. Installation is a single `npm install` with no native compilation step — the right binary for your OS downloads automatically.

### Use Cases

- **Vite-based React, Vue, or Svelte applications** — If you're already on Vite, switching to Rolldown is a config change that cuts your production build time significantly. The migration path is designed to be painless.

- **Large monorepos with hundreds of packages** — Build speed matters more as codebase size grows. Rolldown's Rust performance makes it viable for monorepo builds where Rollup would take minutes.

- **Library authors publishing to npm** — Rollup has been the go-to for library bundling thanks to its ESM output and tree-shaking. Rolldown gives you the same output with faster builds, which matters when you're rebuilding on every commit.

- **Teams migrating from Webpack** — Rolldown's Rollup-compatible API means the plugin ecosystem is similar, and the Vite integration provides a well-trodden migration path from Webpack-based setups.

- **CI/CD pipelines where build time is a bottleneck** — Cutting build time from 3 minutes to 15 seconds compounds across hundreds of daily builds. For teams running builds in CI, the time savings translate directly to developer productivity and faster deployments.

### Pros and Cons

Pros:
- Dramatic speed improvement over Rollup — 10-30x faster on real-world projects — without sacrificing the plugin API that makes Rollup the library bundler of choice.
- Backed by VoidZero and the Vite core team, which means it has the institutional support and community momentum to become the default JavaScript bundler. Vite's 15M+ weekly npm downloads give Rolldown instant distribution.
- MIT licensed with 185 contributors and active development (v1.0 in April 2026, v1.1 in June 2026). The release cadence is aggressive and the project is shipping real features, not just patches.

Cons:
- Still young — v1.1.0 introduced breaking default changes, which means the API surface is still settling. Production-critical projects should test thoroughly before migrating.
- Not every Rollup plugin works perfectly yet. The compatibility layer handles most plugins, but edge cases exist, especially for plugins that reach into Rollup internals.
- Rust-based tooling means debugging bundler issues is harder for JavaScript developers. When something goes wrong in the bundler itself, you can't just add a `console.log` — you need Rust debugging skills or to file a detailed issue.

### Getting Started

```bash
# Install Rolldown
npm install rolldown

# Create a basic config file (rolldown.config.js)
# Then build your project
npx rolldown -c rolldown.config.js

# If you're using Vite, enable Rolldown in your vite.config.js:
# import { defineConfig } from 'vite'
# export default defineConfig({
#   build: {
#     bundler: 'rolldown'
#   }
# })
```

For a quick test, try the official starter on StackBlitz:

```bash
# Open the Rolldown starter directly
npx pkg-pr-new@latest rolldown/rolldown
```

Check the full documentation at [rolldown.rs](https://rolldown.rs/guide/getting-started) for plugin configuration, code splitting options, and migration guides from Rollup and esbuild.

### Alternatives

**Rollup** — The original JavaScript bundler that Rolldown is designed to replace. Rollup has the mature plugin ecosystem and has been the production bundler in Vite since day one. Choose Rollup today if you need maximum plugin compatibility and can tolerate slower builds. Within a year, this distinction won't matter as Vite transitions to Rolldown by default.

**esbuild** — Evan Wallace's Rust/Go bundler that kickstarted the "fast bundler" movement. esbuild is still marginally faster on raw benchmarks for simple cases, but it has a different plugin API (not Rollup-compatible), simpler code splitting, and no CSS modules support. Choose esbuild if you want raw speed and don't need Rollup's plugin ecosystem or advanced chunking.

**Turbopack** — Vercel's Rust-based bundler designed for Next.js. Turbopack is optimized for Next.js's specific needs (server components, streaming, etc.) and isn't designed as a general-purpose Rollup replacement. Choose Turbopack if you're committed to the Next.js ecosystem and want Vercel's vertically integrated toolchain.

### Verdict

Rolldown is the most consequential JavaScript tooling release of 2026. It's not just another fast bundler — it's the piece that completes VoidZero's vision of a unified Rust-based JavaScript toolchain, and it's being adopted through Vite's massive install base whether individual developers choose it or not. The v1.1.0 release in June 2026 with breaking changes signals the project is moving fast and isn't afraid of shipping real improvements over backwards compatibility. If you're a fullstack web developer using Vite, React, Vue, or Svelte, Rolldown is in your future. The only question is whether you adopt it now while the migration is fresh and the community is actively debugging edge cases, or wait six months for the ecosystem to settle. Either way, your builds are about to get dramatically faster.
