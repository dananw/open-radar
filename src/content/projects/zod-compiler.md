---
name: zod-compiler
description: "Compile Zod schemas into zero-overhead validation functions at build time for 2-75x faster runtime performance with zero code changes."
url: https://github.com/gajus/zod-compiler
stars: 140
forks: 3
language: TypeScript
tags: ["zod", "typescript", "validation", "build-tool", "performance"]
featured: false
publishedAt: 2026-06-13
---

## zod-compiler

### Overview

zod-compiler is a build-time compiler for Zod schemas that replaces runtime validation with ahead-of-time generated code. It hit 140 GitHub stars within three days of its June 10 launch, which is fast for a tooling library with no marketing budget. The pitch is dead simple: keep your existing Zod schemas, add one line to your bundler config, and get 2-75x faster validation without changing a single line of application code.

The project is by Gajus Kuizinas, the developer behind slonik (a PostgreSQL client for Node.js), roarr (a structured logger), and several other well-known TypeScript libraries. He's been in the Node.js ecosystem for over a decade and maintains packages with millions of weekly downloads. This matters because zod-compiler solves a problem he hit in his own production systems — Zod validation overhead in hot paths, particularly in database query pipelines where slonik validates every row coming back from PostgreSQL.

The core problem is straightforward: Zod is the most popular TypeScript validation library (70M+ weekly npm downloads), but its runtime validation walks a tree of schema nodes for every `.parse()` or `.safeParse()` call. For simple schemas this is negligible. For complex ones — large objects with 10+ fields, nested arrays, discriminated unions, recursive structures — the overhead becomes measurable and sometimes significant. zod-compiler detects every exported Zod schema at build time, compiles each one into an optimized validator function, and swaps the original parse methods. The original Zod schema object stays intact (identity, `.shape`, `._zod`, Standard Schema all preserved), so libraries like tRPC, Hono, and React Hook Form work without changes.

### Why it matters

Zod is everywhere in the TypeScript ecosystem. It's the default choice for API validation in NestJS and tRPC, form validation in React with zodResolver, and schema definition in tools like Drizzle ORM. Any performance improvement to Zod validation propagates across the entire stack. That's what makes zod-compiler interesting — it's not a new validation library, it's an optimization layer for the one everybody already uses.

The timing is relevant because Zod v4 just shipped with its own performance improvements, but zod-compiler's benchmarks show it still outperforms Zod v4 by 2-77x depending on schema complexity. For a 100-item object, zod-compiler validates at 1.4M ops/s versus Zod v4's 18K ops/s — that's a 77x difference. Even for simple strings with min/max constraints, it's 2.2x faster. The approach — compile once at build time, validate cheaply at runtime — is the same principle behind tools like Typia (which requires TypeScript transformers) and AJV (which uses JSON Schema). zod-compiler's advantage is that it works with Zod's existing API, so you don't need to rewrite schemas or switch validation libraries.

### Key Features

**Automatic Mode with Zero Code Changes.** The default mode scans your project for exported Zod schemas at build time, compiles them, and replaces their parse methods — all without any imports from zod-compiler in your source code. Add the plugin to your Vite, webpack, or esbuild config and it handles everything. Your schema files stay pure Zod. This is the killer feature for adoption: teams can get the performance benefit without touching existing code or changing their development workflow.

**Two-Phase Validation Architecture.** Every compiled schema gets a Fast Path (a single boolean expression chain that validates the entire input with zero allocations) and a Slow Path (error-collecting validation that only runs when the Fast Path fails). Valid input returns immediately from the Fast Path. Invalid input triggers the error walk only if `.error` is actually read. This design means you get the speed of hand-written validation with the developer ergonomics of Zod.

**Schema Hoisting for React Components.** Schemas defined inside function bodies — a common pattern in React components, request handlers, and helper functions — get rebuilt on every call. zod-compiler's `hoist` option (enabled by default) moves them to module scope so they're constructed once. This is a hidden performance trap that most developers don't realize they're hitting. The hoisting is conservative: only expressions built from imported bindings and literals move. Anything referencing local variables or `this` stays put.

**Zero-Allocation Type Guard (.is()).** Compiled schemas expose an `.is(input): input is T` boolean guard that's essentially a type-safe instanceof check. For objects, primitives, arrays, and enums without transforms, this is a single boolean expression — no SafeParseResult object, no issues array allocation. It's on par with Typia's `is<T>()` and a clean drop-in for the common `schema.safeParse(x).success` pattern.

**Universal Bundler Support.** One-line integration for Vite, webpack, esbuild, Rollup, Rolldown, rspack, Bun, and Farm. Each import is a single line (`import zodCompiler from "zod-compiler/vite"`). The runtime helpers are shared across all files via a virtual module, so the bundler emits a single copy regardless of how many schemas you have. There's also a CLI mode for projects that don't use a bundler.

**Schema Diagnostics CLI.** Run `npx zod-compiler check src/schemas.ts` to see exactly which schemas are compiled, which fall back to Zod's runtime, and why. The output shows per-node compilation status, Fast Path eligibility, and actionable hints for improving coverage. JSON output and a `--fail-under` flag make it CI-friendly — gate your builds on schema compilation coverage.

### Use Cases

- **tRPC API servers** — Every incoming request runs Zod validation on the input schema. At scale (thousands of requests per second), the validation overhead adds up. zod-compiler eliminates it without changing your router code.

- **React Hook Form with zodResolver** — Form validation on every keystroke or blur event calls Zod's parse. Compiled schemas make this effectively free, even for complex multi-step forms with nested objects and arrays.

- **Database row validation** — If you use slonik, Drizzle, or any pattern where Zod validates rows coming back from a database query, compiled schemas turn the validation from a bottleneck into a no-op. The slonik example in the docs shows 16,700ns dropping to 14ns per row.

- **High-throughput API gateways** — Validation middleware that processes every incoming request benefits from compiled schemas, especially when the request body is a complex nested structure with many fields.

- **Large monorepos with shared schema packages** — When hundreds of modules import the same schemas, the shared runtime helpers deduplicate across the bundle. Structural dedup within files also reduces generated output by ~50% raw / ~34% gzipped for schemas with reused sub-structures.

### Pros and Cons

Pros:
- Zero code changes required in automatic mode — add the plugin and get faster validation. The migration cost is literally one line of bundler config.
- Benchmarks are impressive and cover real-world scenarios. 77x faster on large objects, 192x faster on invalid medium objects (because error materialization is deferred). These aren't cherry-picked micro-benchmarks.
- Full Zod API preservation means tRPC, Hono, React Hook Form, Drizzle, and every other Zod consumer works without changes. Standard Schema compatibility is maintained.
- The author (gajus) has a track record of maintaining production-quality TypeScript libraries over many years. This isn't a weekend project.

Cons:
- Three days old. 140 stars is promising for launch velocity, but the library hasn't been battle-tested in production by the broader community yet. Expect edge cases to surface.
- Auto mode executes schema files at build time to inspect their exports. Files with side effects (starting a server, connecting to a database) will trigger those side effects during the build. The `include` option mitigates this, but it's a footgun for teams that aren't careful about their schema file hygiene.
- Schemas using captured `transform` or `refine` callbacks fall back to Zod's runtime for those specific fields. The fallback is correct but partial — you get mixed performance characteristics within a single schema.

### Getting Started

```bash
# Install
npm install zod-compiler

# Vite — add to your config
# vite.config.ts
import zodCompiler from "zod-compiler/vite";

export default defineConfig({
  plugins: [zodCompiler()],
});
```

Your existing Zod schemas work unchanged:

```typescript
// src/schemas.ts
import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.email(),
  age: z.number().int().min(0).max(150),
});
```

Check compilation coverage:

```bash
npx zod-compiler check src/schemas.ts
```

For explicit opt-in without auto-detection:

```typescript
import { compile } from "zod-compiler";
const validateUser = compile(CreateUserSchema);
```

### Alternatives

**Typia** — A TypeScript transformer that generates optimized validators from TypeScript type annotations. Typia is faster than zod-compiler in some benchmarks (17.3M vs 16.4M ops/s on simple strings) but requires a TypeScript compiler plugin and uses its own schema syntax. Choose Typia if you're starting fresh and don't need Zod compatibility. Choose zod-compiler if you already have Zod schemas throughout your codebase.

**AJV** — The fastest JSON Schema validator, widely used in Node.js APIs. AJV beats zod-compiler on simple types (17.5M ops/s on strings) but falls behind on complex objects (126K vs 1.4M ops/s on 100-item objects). AJV requires JSON Schema definitions rather than Zod schemas, so it's a different ecosystem. Choose AJV if you're already using JSON Schema or need maximum performance on simple payloads.

**Zod v4** — The latest Zod version includes its own performance improvements over v3. zod-compiler still outperforms it 2-77x, but Zod v4 is a runtime upgrade with no build step. Choose Zod v4 alone if you want simpler tooling and can tolerate the performance gap. Choose zod-compiler if validation performance matters in your hot paths.

### Verdict

zod-compiler is the most practical performance tool I've seen for the TypeScript ecosystem in a while. The approach — compile existing Zod schemas at build time, preserve the full API, get 2-77x faster validation — is exactly right. No migration, no new syntax, no ecosystem fragmentation. It works with tRPC, Hono, React Hook Form, slonik, and anything else that accepts Zod schemas. The benchmarks are real and cover scenarios developers actually hit: large objects, nested arrays, discriminated unions, recursive trees. It's three days old, so don't bet your production system on it today. But if you're using Zod in any performance-sensitive path — API validation, database row parsing, form validation at scale — add the plugin to a branch and benchmark it. The numbers will speak for themselves.
