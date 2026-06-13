---
name: zod-compiler
description: "Compile Zod schemas into zero-overhead validation functions at build time for 2-75x faster validation with no code changes required."
url: https://github.com/gajus/zod-compiler
stars: 207
forks: 5
language: TypeScript
tags: ["zod", "performance", "typescript", "build-tool", "validation"]
featured: false
publishedAt: 2026-06-14
---

## Zod Compiler

### Overview

Zod Compiler does one thing and does it extremely well: it takes your existing Zod schemas and compiles them into optimized validation functions at build time. No runtime overhead, no API changes, no migration pain. You keep writing Zod as you always have, and the build plugin silently replaces the validation logic with generated code that runs 2 to 75 times faster, depending on schema complexity.

The project is authored by Gajus Kuizinas, a prolific open-source developer behind tools like Slonik (a PostgreSQL client for Node.js) and several other well-known TypeScript libraries. That track record matters here because Zod Compiler isn't a weekend experiment — it's a production-grade build plugin tested against projects with tens of thousands of schemas. It originated as a fork of zod-aot by @wakita181009, but has been substantially rewritten with additional optimizations like zero-capture transform compilation, automatic union discrimination, and schema hoisting.

The core problem Zod Compiler solves is deceptively simple. Zod is the most popular validation library in the TypeScript ecosystem — it powers input validation in Next.js server actions, NestJS DTOs, tRPC routers, React Hook Form submissions, and Hono API routes. But Zod's runtime validation carries real overhead. Each `.parse()` call walks the schema tree, builds error objects, and allocates intermediate results. In hot paths — API endpoints handling hundreds of requests per second, form validation on every keystroke, or real-time data processing — that overhead adds up fast. Zod Compiler eliminates it entirely by generating flat boolean expression chains at build time.

### Why it matters

If you're building with TypeScript in 2026, there's a strong chance Zod is somewhere in your dependency tree. The library has become the de facto standard for schema validation, with over 34 million weekly npm downloads. But most developers don't think about the performance cost of runtime validation until they hit a wall — a high-throughput API endpoint that's slower than expected, a form that stutters on complex validation, or a server-side rendering path where validation adds noticeable latency.

Zod Compiler represents a broader trend in the TypeScript ecosystem: moving work from runtime to build time. We've seen this with Tailwind CSS (generating only the styles you use), with tRPC (eliminating runtime API overhead), and now with Zod Compiler (eliminating runtime validation overhead). The pattern is the same — use build-time intelligence to produce leaner, faster runtime code while keeping the developer experience unchanged. For teams running NestJS backends with dozens of DTO schemas or React frontends with complex form validation, this is the kind of optimization that compounds.

### Key Features

**Zero-Code-Change Integration.** Drop the build plugin into your Vite, webpack, esbuild, Rollup, Rolldown, rspack, Bun, or Farm config and you're done. Your existing `import { z } from "zod"` stays exactly the same. The plugin automatically detects exported Zod schemas, compiles them, and replaces the exports with optimized IIFEs that preserve the full Zod API — `.parse()`, `.safeParse()`, `._zod`, `.shape`, Standard Schema, `instanceof` checks, everything still works.

**Two-Phase Validation Architecture.** Every compiled schema generates a fast path and a slow path. The fast path is a single `&&` expression chain that validates valid input with zero allocations — it returns immediately on success. The slow path only runs when validation fails, collecting errors in the standard Zod format. This means the happy path (which is what matters for production performance) is as fast as hand-written validation code.

**Schema Hoisting.** Schemas defined inside React components, request handlers, or helper functions get rebuilt on every call — a hidden performance trap. With `hoist` enabled by default, the plugin moves these schemas to module scope so they're constructed once. It's conservative enough to be safe: only expressions built from imports and literals get hoisted, anything referencing local variables or `this` stays put.

**Zero-Capture Transform Compilation.** Transform and refine callbacks that don't capture external variables are extracted via `fn.toString()` and inlined into the generated validator. So `z.string().transform((s) => s.trim())` gets fully compiled (3-19x faster), while captured transforms gracefully fall back per-field. The key insight: if an object has 10 properties and only one uses a captured transform, the other nine still get compiled.

**Automatic Union Discrimination.** Plain `z.union()` calls with objects that share a common key are automatically detected and lowered to O(1) switch dispatch — even if you didn't use `z.discriminatedUnion()`. This alone can make union validation 13x faster than Zod's default sequential trial approach. And discriminated unions with 8+ variants see similar gains because each case only validates its variant's distinctive fields.

**CLI for Non-Bundler Workflows.** Not using a bundler? Run `npx zod-compiler generate src/schemas.ts -o src/compiled.ts` to produce optimized validation files from the command line. Watch mode is supported, and you can control whether to compile all exports or only explicit `compile()` calls.

**Persistent Build Cache.** The plugin maintains a transform cache in `node_modules/.cache/zod-compiler` that persists across builds. Cache entries self-validate against dependency content hashes, so incremental builds skip discovery and codegen entirely when nothing changed. For large codebases with thousands of schemas, this cuts build times significantly.

### Use Cases

- **High-throughput API validation** — NestJS or Hono backends validating hundreds of requests per second where Zod parse overhead becomes measurable on profiling dashboards
- **Real-time form validation** — React Hook Form integrations where validation runs on every keystroke and needs to feel instant
- **tRPC router performance** — tRPC uses Zod for input/output validation on every procedure call; compiled schemas eliminate the validation tax on every RPC
- **Server-side rendering** — Next.js server components and actions that validate data on every request; compiled validation reduces SSR latency
- **Data pipeline processing** — ETL scripts or worker processes that validate millions of records where Zod's runtime overhead becomes a bottleneck
- **Zero-allocation type guards** — Using the `.is()` method for runtime type narrowing in performance-critical code paths, replacing `schema.safeParse(x).success` with a single boolean check

### Pros and Cons

Pros:
- Dramatic performance improvements backed by real benchmarks — 2x for simple schemas, up to 75x for complex nested objects, measured against both Zod v3 and v4 on Apple M4 Max hardware
- True zero-migration experience: existing Zod schemas, their types, and all downstream consumers (tRPC, React Hook Form, Hono) work without any changes
- Supports every major build tool in the TypeScript ecosystem — Vite, webpack, esbuild, Rollup, Rolldown, rspack, Bun, and Farm — so it fits into virtually any project
- Automatic Vitest detection means tests exercise the compiled validators that ship to production, not a different code path

Cons:
- 207 stars and created just four days ago — it's brand new and the API surface may still evolve; production adopters should pin versions carefully
- Transform and refine callbacks that capture external variables fall back to Zod's runtime, which can be confusing if you expect uniform performance gains across all schemas
- The `compile()` explicit mode adds import noise to schema files, while auto mode requires trusting the build plugin to execute schema modules during compilation — a mental model shift for some teams
- No support for Zod v4's native compilation features yet (the benchmarks compare against Zod v4, but the plugin works with Zod v3 schemas)

### Getting Started

```bash
# Install
npm install zod-compiler

# For Vite projects, add to vite.config.ts:
# import zodCompiler from "zod-compiler/vite";
# export default defineConfig({ plugins: [zodCompiler()] });

# For webpack:
# import zodCompiler from "zod-compiler/webpack";

# Check which schemas qualify for fast path
npx zod-compiler check

# CLI generation (no bundler needed)
npx zod-compiler generate src/schemas.ts -o src/compiled.ts

# Watch mode
npx zod-compiler generate src/ --watch
```

### Alternatives

**Typia** — A TypeScript transformer that generates optimized validation code from TypeScript types (not Zod schemas). It's faster in some benchmarks and has been around longer, but it requires its own type system and doesn't work with existing Zod schemas. Choose Typia when you're starting a new project and don't mind committing to its ecosystem. Choose Zod Compiler when you already have Zod schemas and want to keep them.

**Zod v4** — The next major version of Zod includes its own performance improvements and is closing the gap with compiled validators. For simple schemas, Zod v4 is competitive. But for complex nested objects, unions, and collections, Zod Compiler still delivers 10-75x better performance. Choose Zod v4 alone when your validation isn't a bottleneck. Use both together when you need maximum performance on existing Zod v3 schemas.

**AJV** — The classic JSON Schema validator that's been the performance king for years. AJV is still competitive on simple schemas and pulls ahead on array-heavy workloads. But it requires you to write JSON Schema instead of Zod schemas, which means losing Zod's type inference, composability, and ecosystem integrations. Choose AJV when you're already committed to JSON Schema. Choose Zod Compiler when you want to stay in the Zod ecosystem.

### Verdict

Zod Compiler is the kind of tool that makes you wonder why it didn't exist sooner. Zod has been the dominant TypeScript validation library for years, and the "compile at build time" pattern has been proven by tools like Tailwind and tRPC. Combining the two is obvious in hindsight, and the execution here is excellent. The benchmarks are honest and thorough — the author tested against Zod v3, Zod v4, Typia, and AJV on the same hardware, and the numbers are compelling, especially for the complex schemas that real applications actually use. If your TypeScript project uses Zod and you've ever profiled your validation code, this is worth a one-line config change to try. At 207 stars in four days, the community response suggests this fills a real gap. The only caveat is its age — pin your version and watch for breaking changes as the API stabilizes.
