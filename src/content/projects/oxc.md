---
name: oxc
description: "OXC is a high-performance JavaScript and TypeScript toolchain written in Rust — a parser, linter, formatter, transpiler, and minifier that outperforms existing tools by 10-100x."
url: https://github.com/oxc-project/oxc
stars: 21542
forks: 1075
language: Rust
tags: ["developer-tools", "javascript", "typescript", "linter", "performance", "rust"]
featured: false
publishedAt: 2026-06-11
---

## OXC

### Overview

OXC (Oxidation Compiler) is a collection of high-performance JavaScript and TypeScript tools written entirely in Rust. It includes a parser, linter (oxlint), formatter (oxfmt), transpiler (oxc_transform), and minifier — essentially rebuilding the entire JavaScript toolchain from scratch at a speed that makes existing Node.js-based tools look sluggish by comparison. With over 21,500 GitHub stars and releases shipping weekly (the latest, v0.135.0, dropped on June 8, 2026), it's one of the most actively developed open-source projects in the JavaScript ecosystem right now.

The project started in early 2023 under the leadership of Boshen, a developer who previously worked on the Rust-based JavaScript parser that now powers Biome (the Rome successor). The philosophy is straightforward: JavaScript tooling has been bottlenecked by Node.js's single-threaded runtime for years, and Rust's performance characteristics make it possible to build tools that are 10-100x faster while consuming a fraction of the memory. This isn't theoretical — benchmarks consistently show oxlint running 50-100x faster than ESLint on large codebases.

The scope of OXC is ambitious. Most Rust-based JavaScript projects tackle one piece of the puzzle — a parser here, a bundler there. OXC aims to own the entire toolchain: parsing, linting, formatting, transforming, and minifying. The monorepo structure keeps everything tightly integrated, sharing a common parser and AST that's designed for both correctness and speed. As of mid-2026, the parser supports the full ECMAScript specification, JSX, TypeScript (including decorators and enums), and maintains near-100% compatibility with the Test262 test suite.

### Why it matters

The JavaScript tooling landscape is undergoing its biggest shift since the introduction of Webpack. A wave of Rust-based tools — Rolldown for bundling, SWC for compilation, Biome for formatting and linting — is replacing the Node.js-based originals that dominated for a decade. OXC sits at the center of this movement because it's not just one tool; it's an entire toolchain. If the OXC project succeeds in its full vision, it could consolidate what currently requires 5-6 separate npm packages (ESLint, Prettier, Babel, Terser, and their configs) into a single, fast, zero-config alternative.

For fullstack web developers, the impact is concrete. Your CI pipeline is where you feel the pain most — linting, type-checking, formatting checks, and build steps that eat minutes on every push. Teams running oxlint instead of ESLint are reporting 80-90% reductions in linting time. On a 500K-line TypeScript codebase, that's the difference between a 3-minute lint step and a 5-second one. When you multiply that across hundreds of CI runs per day, the time and cost savings are significant.

The project also matters because it's raising the bar for what JavaScript tooling can be. The formatter (oxfmt) is being designed as a direct Prettier replacement that respects your existing Prettier config while running at Rust speed. The transpiler handles the same transformations as Babel but compiles in milliseconds. And with tsgolint (a separate sub-project with 1,200+ stars) adding type-aware linting rules, OXC is closing the gap on the one advantage ESLint's typescript-eslint plugin still had.

### Key Features

**Blazing-Fast Parser.** The foundation of every OXC tool is its Rust-based JavaScript and TypeScript parser. It handles the full ECMAScript 2024 specification, JSX, TypeScript with all experimental syntax, and source text that would choke other parsers. Benchmarks show it parsing at over 1GB/s on modern hardware — fast enough that parsing is effectively free in any build pipeline. The parser also generates a lossless AST that preserves all whitespace and comments, which the formatter needs.

**oxlint — The ESLint Replacement.** This is the most mature component, shipping as a standalone binary you can drop into any project. It implements over 400 lint rules, including all recommended ESLint rules and many popular plugin rules (import, react, jsx-a11y, unicorn). You can use it alongside ESLint during migration or replace it entirely. The latest releases (v1.69.0) have been adding rules at a rapid pace, and the team actively tracks ESLint rule parity.

**oxfmt — The Prettier Replacement.** The formatter is newer but progressing fast. It reads your existing `.prettierrc` configuration and produces output that matches Prettier's style, so switching doesn't require reformatting your entire codebase. The speed advantage is massive — formatting a large project that takes Prettier 30 seconds completes in under 2 seconds with oxfmt. It's not yet at full Prettier parity for edge cases, but it's close enough for most projects.

**oxc_transform — Babel-Compatible Transpilation.** The transpiler handles JSX transformation, TypeScript compilation, optional chaining, nullish coalescing, decorators, and other modern JavaScript features. It's designed as a drop-in replacement for Babel in build pipelines. When used through the webpack plugin or as part of a Vite/Rolldown setup, it eliminates the Babel compilation bottleneck that makes hot module replacement slow in large projects.

**Type-Aware Linting with tsgolint.** The oxc-project/tsgolint sub-project adds type-checking-aware lint rules to oxlint — the feature that was previously the sole domain of ESLint's typescript-eslint. This means oxlint can now catch errors like "this function returns `undefined` but the return type says `string`" without running a full TypeScript compilation. It's a separate binary that integrates with oxlint's rule configuration.

**Unified Configuration.** OXC tools share a common configuration approach that's simpler than ESLint's cascading config system. An `oxlintrc.json` file with flat rule configuration replaces the complex `.eslintrc.js` setup most projects struggle with. The formatter uses standard Prettier config keys. This reduces the configuration overhead that makes JavaScript toolchain management a job in itself.

**First-Class Editor Integration.** The VS Code extension (oxc-project/oxc-vscode) provides real-time linting and formatting feedback directly in your editor. This is critical for adoption — developers won't switch CLI tools if their editor experience doesn't improve alongside it. The extension is actively maintained and supports all OXC tool features.

### Use Cases

- **Large TypeScript codebases with slow CI pipelines** — If your ESLint + Prettier + Babel pipeline takes minutes on CI, switching to oxlint + oxfmt + oxc_transform can cut that to seconds. Teams at companies with monorepos containing millions of lines of code are seeing the biggest improvements.

- **Fullstack developers managing complex toolchain configs** — If you're tired of maintaining ESLint configs, Prettier configs, Babel configs, and their interactions with each other, OXC's unified approach simplifies this to one or two config files.

- **React/Next.js developers who want faster builds** — The webpack plugin integrates oxc_transform into your existing Webpack setup, replacing Babel with a transpiler that runs at Rust speed. Combined with oxlint, your development loop gets noticeably faster.

- **Open source maintainers who want consistent code quality** — OXC tools are easy to add to CI with zero configuration overhead. A single `oxlint` binary in your GitHub Actions workflow replaces a chain of Node.js-based tools.

- **Teams evaluating a migration from ESLint to a modern linter** — oxlint supports reading ESLint rule configurations, so you can migrate incrementally. Run both tools in parallel, fix any differences, then remove ESLint when you're confident.

### Pros and Cons

Pros:
- The performance gains are real and measurable — 50-100x faster than ESLint isn't marketing fluff, it's what benchmarks consistently show on real codebases. This directly translates to faster CI and a better development loop.
- The project scope is comprehensive. Instead of adopting five different Rust tools for five different tasks, OXC gives you one ecosystem with consistent APIs and shared infrastructure.
- Active development with weekly releases. The latest v0.135.0 landed on June 8, and the changelogs show meaningful progress on rule coverage, formatter compatibility, and performance improvements.

Cons:
- oxfmt is not yet at full Prettier parity. If your codebase relies on specific Prettier formatting edge cases, you may see differences. The team is tracking these, but it's worth testing on your project before switching.
- The ecosystem is still maturing. ESLint has thousands of community plugins; oxlint doesn't. If you rely on niche ESLint plugins for specialized frameworks, you may need to keep ESLint for those rules.
- Configuration migration isn't always trivial. While oxlint reads ESLint configs, complex setups with custom rules and plugins may require manual adjustment. Budget time for the migration.

### Getting Started

```bash
# Install oxlint globally
npm install -g oxlint

# Run oxlint on your project
oxlint

# Initialize a configuration file
oxlint --init

# Install the oxc webpack plugin for faster builds
npm install -D @oxc-project/webpack-loader

# Use the formatter
npx oxfmt --check .

# Run the formatter
npx oxfmt .
```

For webpack integration, add the loader to your config:

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: '@oxc-project/webpack-loader',
      },
    ],
  },
};
```

### Alternatives

**Biome** — Biome (formerly Rome) is another Rust-based JavaScript toolchain that handles formatting and linting. It was one of the first projects to pursue the "unified toolchain" vision and has a strong community. Biome's formatter is more mature than oxfmt right now, and its overall polish is better. Choose Biome if you want a stable, production-ready formatter and linter today. Choose OXC if you want the fastest possible toolchain and are comfortable with a project that's still rapidly evolving.

**SWC** — SWC is a Rust-based JavaScript/TypeScript compiler focused on transpilation and bundling. It's widely used as the default compiler in Next.js and is extremely mature. SWC focuses on compilation speed; it doesn't include a linter or formatter. If you only need faster transpilation and already have a linter/formatter you're happy with, SWC is the safer choice. OXC is better if you want the entire toolchain replaced.

**Rslint** — Rslint is an older attempt at a Rust-based JavaScript linter that never reached critical mass. It's worth mentioning because it shows how hard this problem is — building a linter that matches ESLint's rule coverage takes years of sustained effort. OXC has the advantage of a larger team, more funding, and the backing of the Biome/Rome community's parser work.

### Verdict

OXC is the most important JavaScript toolchain project you're not using yet. At 21,500 stars and growing, with weekly releases and an aggressive roadmap, it's the strongest contender to replace the ESLint/Prettier/Babel stack that has dominated JavaScript development for nearly a decade. The performance numbers aren't hype — they're a fundamental consequence of rewriting JavaScript tools in Rust, and the gap will only widen as the OXC team optimizes further. For fullstack web developers managing large TypeScript codebases, the CI time savings alone justify the migration effort. The linter is production-ready today. The formatter is close. The transpiler is solid. If you're starting a new project or your CI pipeline is a pain point, switch to OXC now and save yourself the migration later — because in two years, this is where the ecosystem will be anyway.
