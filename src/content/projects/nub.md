---
name: nub
description: "Nub is a Rust-based all-in-one Node.js toolkit that replaces npx, pnpm run, and tsc with a single fast binary — TypeScript on stock Node with zero build step."
url: https://github.com/nubjs/nub
stars: 581
forks: 6
language: Rust
tags: ["nodejs", "typescript", "developer-tools", "rust", "package-manager"]
featured: false
publishedAt: 2026-06-19
---

## Nub

### Overview

Nub is a Rust CLI that wraps your existing Node.js installation and gives you TypeScript execution, a script runner, a package manager, and a Node version manager — all from a single binary. It hit 500 GitHub stars within two weeks of its early June 2026 launch, which is notable for a developer tool that doesn't promise a new runtime or a paradigm shift. It just makes the Node.js toolchain faster.

The project comes from the same ecosystem that brought us oxc (the Rust-based JavaScript parser and transpiler). Nub uses oxc under the hood for fast TypeScript transpilation via an N-API addon. The design philosophy is explicit: this is not a Node fork. It's a Rust orchestrator that talks to Node through its public extension surfaces — `module.registerHooks()` for TypeScript resolution, `--import` preloads for polyfills, V8 flag injection for experimental features. Your code runs on stock Node byte-for-byte.

The pitch is simple but compelling. Every Node.js developer today juggles multiple tools: `tsc` for type checking, `tsx` or `ts-node` for running TypeScript, `npx` for one-off CLI tools, `pnpm` or `npm` for package management, `nvm` or `fnm` for Node version switching. Each tool has its own startup cost, its own configuration, and its own quirks. Nub collapses all of them into one Rust binary that starts in milliseconds. When the README claims `nub run dev` is 24x faster than `pnpm run dev` on the cold path, that's not marketing fluff — it's the difference between Rust's zero-cost abstractions and Node's module resolution overhead for script dispatch.

### Why it matters

The Node.js toolchain has been quietly accumulating friction for years. Every major framework — Next.js, NestJS, Remix, Astro — adds its own layer of TypeScript compilation, its own dev server, its own build pipeline. Developers spend real time waiting for `npx prisma generate` to spin up, for `pnpm run build` to resolve the workspace graph, for `tsx watch` to restart after a file change. These are seconds per invocation, but they compound over a workday into minutes of dead time.

Nub addresses this by moving the orchestration layer from JavaScript to Rust. The transpiler is oxc (written in Rust), the module resolver is native, the package installer uses a vendored Rust engine called aube. The result is that the hot path — "run this TypeScript file" or "execute this script" — skips the Node bootstrap that tools like `npx` and `ts-node` pay on every call. For a fullstack developer running `npx prisma generate` fifteen times a day, or a NestJS developer restarting their dev server after every change, the savings add up.

There's also the configuration collapse angle. Nub reads `.node-version`, `.nvmrc`, `packageManager` field, and `engines.node` — the same pinning mechanisms you already use — and handles provisioning automatically. It loads `.env*` files with variable expansion. It imports YAML, TOML, JSON5, and text files as modules. It polyfills `Temporal`, `URLPattern`, `WebSocket`, and other modern globals on older Node versions. These are small things individually, but together they mean fewer config files, fewer dependencies, and fewer "why isn't this working" moments.

### Key Features

**TypeScript File Runner.** Run `nub index.ts` and it works — no `tsconfig.json` needed, no build step, no `tsx` or `ts-node` wrapper. The whole TypeScript surface is supported, including non-erasable syntax like `enum`, `namespace`, and parameter properties, plus legacy decorators with `emitDecoratorMetadata`. Imports resolve the way your editor does: extensionless, `.js` to `.ts` mapping, tsconfig `paths`. This is the feature that makes Nub feel like magic on the first run.

**24x Faster Script Runner.** `nub run dev` replaces `pnpm run dev` and `npm run dev` with roughly 24x faster cold-path execution. It preserves the full pnpm workspace surface — recursive runs, `--filter` with graph and changed-since selectors, `--parallel`, `--workspace-concurrency`. Lifecycle `pre`/`post` hooks work, the `npm_*` environment is populated, and `node_modules/.bin` is on `PATH`. If you're running monorepo scripts through pnpm today, Nub is a drop-in replacement that just happens to be written in Rust.

**19x Faster Package Runner.** `nubx eslint .` replaces `npx eslint .` with 19x less overhead. The difference is architectural: Nub resolves `node_modules/.bin` in Rust and exec's the binary directly, skipping the per-call Node bootstrap that `npx` pays. When a binary isn't installed, `nubx` fetches it from the registry on the fly. For CI pipelines where you're running dozens of `npx` calls, this adds up fast.

**Built-in Package Manager.** `nub install` is a pnpm-shaped installer powered by the vendored aube engine. It reads your existing lockfile — npm, pnpm, and Bun round-trip cleanly, Yarn is read-only — and infers your package manager without asking. Packages deduplicate through a global content-addressed store and materialize via reflink or hardlink. The security model is deny-by-default: dependency build scripts only run when explicitly allowed, with registry-provenance checking and cooling-window gates.

**Node Version Manager.** Pin a version with `.node-version`, `.nvmrc`, or `engines.node`, and Nub fetches the matching stock Node from nodejs.org, SHA-256-verifies it, caches it, and runs it — in the same breath as your code, no second command. This replaces `nvm`, `fnm`, and `volta` for the common case. The `nub node install 22` command provisions a specific version; `nub node pin lts` sets the project pin.

**Data File Imports.** Import YAML, TOML, JSONC, JSON5, and text files directly as modules: `import config from "./config.yaml"`. No loader plugins, no bundler configuration. This works because Nub hooks into Node's module resolution layer and transpiles data files on the fly. For configuration-heavy projects — NestJS apps with complex YAML configs, Next.js projects with TOML content files — this eliminates a whole category of boilerplate.

**Watch Mode with Dependency Graph.** `nub watch src/server.ts` restarts on file changes using Node's own `--watch` engine, but with dependency-graph-aware invalidation. It tracks which files actually matter — including `.env*` files, the `tsconfig.json` extends chain, and `package.json` — so it doesn't restart unnecessarily. For NestJS or Express developers who restart their dev server fifty times a day, this is the difference between fast and instant.

### Use Cases

- **Fullstack TypeScript projects** — Running Next.js, NestJS, or Remix apps with direct TypeScript execution, faster script dispatch, and automatic `.env` loading. No more `tsx` wrapper or `ts-node` configuration.
- **Monorepo development** — Nub preserves pnpm's full workspace surface, so `nub run -r --filter "@org/*" test` works exactly like `pnpm run` but starts in milliseconds instead of seconds.
- **CI/CD pipelines** — Replacing `npx` calls with `nubx` in GitHub Actions saves real time when running dozens of CLI tools (Prisma, ESLint, Prettier, Vitest) per pipeline. The `nubjs/setup-nub` action handles provisioning.
- **Rapid prototyping** — Running a TypeScript file with `nub script.ts` skips the entire build-tool dance. Import YAML configs, load `.env` files, use modern globals — no setup required.
- **Node version standardization** — Teams that pin Node versions across projects get automatic provisioning without the `nvm`/`fnm`/`volta` installation ceremony. Nub reads existing pins and handles the rest.

### Pros and Cons

Pros:
- Single Rust binary replaces five or more Node.js tools (tsx, npx, pnpm run, nvm, dotenv). Less tooling to install, configure, and maintain.
- Real performance gains on cold paths — 24x for script running, 19x for package execution. These aren't synthetic benchmarks; they reflect the actual overhead of Node's module resolution.
- Zero lock-in: code runs on stock Node, lockfiles stay in your existing format, and the `--node` flag gives you a vanilla escape hatch for debugging.
- Security-first package installation with deny-by-default build scripts, registry provenance checking, and cooling windows. This matters in a post-`xz` world.

Cons:
- Early-stage project with 581 stars and 6 forks as of mid-June 2026. The API surface is likely still settling, and breaking changes should be expected.
- Requires Node 18.19+ for the compatibility tier and Node 22.15+ for the fast path. Teams on older Node versions get reduced functionality.
- The Rust binary adds a download step to CI provisioning. For teams with strict supply-chain policies, adding a pre-built Rust binary from a new project requires vetting.
- Niche community compared to established tools like pnpm, nvm, and tsx. Finding help or examples for edge cases may be harder in the early days.

### Getting Started

```bash
# macOS / Linux
curl -fsSL https://nubjs.com/install.sh | bash

# Windows (PowerShell)
irm https://nubjs.com/install.ps1 | iex

# Or via npm
npm install -g --ignore-scripts=false @nubjs/nub
```

Run a TypeScript file directly:

```bash
nub index.ts
```

Run a package.json script:

```bash
nub run dev
nub run build
```

Run a CLI tool:

```bash
nubx prisma generate
nubx eslint . --fix
```

Install dependencies:

```bash
nub install
nub add -D vitest
```

Pin and provision a Node version:

```bash
nub node install 22
nub node pin lts
```

For GitHub Actions:

```yaml
- uses: nubjs/setup-nub@v1
```

### Alternatives

**Bun** — Bun is a complete JavaScript runtime written in Zig that replaces Node.js entirely. It's faster than Node for many workloads and includes a bundler, test runner, and package manager. Bun is the better choice if you're starting a greenfield project and don't need Node.js ecosystem compatibility. Nub is the better choice if you're working within existing Node.js projects and want faster tooling without changing your runtime.

**tsx** — tsx is a Node.js enhancement that adds TypeScript execution via esbuild. It's mature, widely used, and well-understood. tsx is the better choice if you only need TypeScript file execution and don't want to adopt a new toolchain. Nub replaces tsx and adds script running, package management, and version management on top.

**pnpm** — pnpm is a fast, disk-efficient package manager that's become the standard for monorepo development. It's battle-tested with a massive community. pnpm is the better choice if package management is your only concern and you don't need the other tools Nub provides. Nub's package manager is pnpm-shaped and lockfile-compatible, so you can switch incrementally.

### Verdict

Nub is the most interesting Node.js toolchain project I've seen since Bun, and in some ways more practical. Bun asks you to change your runtime; Nub asks you to change your CLI. For teams with existing Node.js codebases — NestJS backends, Next.js frontends, monorepo setups with pnpm workspaces — that's a much smaller commitment with immediate payoff. The 24x script-running improvement alone justifies trying it on a single project. The TypeScript execution, package management, and version management are bonuses that compound. It's early days (581 stars, launched June 2026), so don't bet your production pipeline on it yet. But for local development and CI, Nub is worth installing today.
