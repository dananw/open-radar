---
name: biome
description: "Biome is a Rust-based web toolchain that replaces ESLint and Prettier with a single blazing-fast linter and formatter for JavaScript, TypeScript, JSX, and JSON."
url: https://github.com/biomejs/biome
stars: 25063
forks: 780
language: Rust
tags: ["linter", "formatter", "toolchain", "rust", "developer-tools", "typescript"]
featured: false
publishedAt: 2026-06-17
---

## Biome

### Overview

Biome is a Rust-based toolchain for web projects that combines linting and formatting into a single, blazing-fast CLI. It supports JavaScript, TypeScript, JSX, TSX, CSS, and JSON out of the box. The project hit 25,000 GitHub stars and just shipped v2.5.0 in June 2026, making it one of the most actively developed developer tools in the ecosystem.

The project started as Rome, created by Sebastian McKenzie (the creator of Babel) in 2021. Rome tried to be an all-in-one toolchain — bundler, compiler, linter, formatter — but the scope was too ambitious and the company behind it shut down in 2023. The community forked the linter and formatter portions into Biome, and that narrower focus turned out to be the right call. Biome now has a healthy contributor base and regular releases, with v2.5.0 landing a new concise reporter and dozens of new lint rules.

The core problem Biome solves is toolchain fatigue. A typical modern web project has ESLint for linting, Prettier for formatting, and sometimes additional tools for import sorting or CSS linting. Each has its own config file, its own plugin ecosystem, and its own performance characteristics. Biome replaces all of them with one binary that runs in milliseconds. In the official benchmark, Biome formats code 35x faster than Prettier and lints 15x faster than ESLint on large codebases.

### Why it matters

The JavaScript toolchain has been a source of frustration for years. ESLint's flat config migration, Prettier's limited extensibility, and the general overhead of maintaining multiple tools has created a market for consolidation. Biome is the strongest contender in that space, and the Rust foundation means it's not just faster — it's fundamentally a different class of performance.

What makes 2026 interesting for Biome is the maturity curve. The project has moved past the "cool experiment" phase and into production territory. Major projects are adopting it, the rule set has grown to cover most ESLint use cases, and the CSS support (added in v2.0) means you can lint and format your stylesheets too. For fullstack developers working across React, Next.js, NestJS, or any TypeScript-heavy stack, Biome eliminates the overhead of managing separate linting and formatting pipelines.

The broader trend here is Rust eating the JavaScript toolchain. SWC, Rspack, Turbopack, OXC — the most impactful JS tools being built right now are written in Rust. Biome fits squarely in that movement and is arguably the most user-facing example of it.

### Key Features

**Single Binary, Zero Node.js Dependency.** Biome ships as a standalone binary that doesn't require Node.js to run. You can install it via npm, but the actual execution is native code. This means CI pipelines are faster, Docker images are smaller, and you don't get the "which version of Node does this project need" headache. It also has first-class support for Deno and Bun.

**Unified Linter and Formatter.** Instead of configuring ESLint and Prettier separately (and then configuring them to not conflict with each other), Biome handles both in a single pass. The formatter opinion is intentionally similar to Prettier's, so migration is usually painless. The linter includes over 200 rules organized into correctness, suspicious, style, and nursery categories.

**35x Faster Formatting.** The Rust implementation isn't just a marketing number. On large codebases (10,000+ files), Prettier takes 8-12 seconds while Biome finishes in under 300ms. That difference compounds in CI, pre-commit hooks, and editor save-on-format workflows. When your linter runs in milliseconds, you stop noticing it.

**First-Class CSS and JSON Support.** Biome v2.0 added CSS, SCSS, and JSON linting and formatting. For fullstack developers who are tired of maintaining separate Stylelint configs, this is significant. You can now format your Tailwind CSS, lint your CSS custom properties, and validate your JSON configs — all with one tool.

**Editor Integration.** Official VS Code and Neovim extensions provide real-time diagnostics and format-on-save. The VS Code extension has over 500K installs. The editor experience is fast enough that you never feel the linting overhead — diagnostics appear as you type without the 1-2 second delay common with ESLint.

**Migrate from ESLint and Prettier.** Biome includes a `migrate` command that reads your existing ESLint and Prettier configs and generates the equivalent Biome configuration. It doesn't cover every edge case (custom ESLint plugins need manual work), but for standard setups the migration takes about five minutes.

**Import Sorting.** Biome sorts imports automatically during formatting, with configurable grouping (builtin, external, internal, parent, sibling). This replaces tools like `@trivago/prettier-plugin-sort-imports` and `eslint-plugin-import`. It's a small feature that saves a surprising amount of code review time.

### Use Cases

- **React and Next.js projects** where you want fast format-on-save and lint-as-you-type without the ESLint/Prettier configuration overhead. The JSX/TSX support is mature and handles complex patterns correctly.
- **Monorepo setups** where linting 500+ packages with ESLint takes minutes in CI. Biome's performance advantage is most dramatic at scale — what takes ESLint 5 minutes finishes in under 10 seconds.
- **TypeScript-heavy backend projects** (NestJS, tRPC, Express with TypeScript) where you need consistent code style across server and client codebases.
- **CSS and Tailwind projects** where you want your stylesheets linted and formatted alongside your JavaScript without maintaining a separate Stylelint configuration.
- **New projects** where you want to start with a clean, fast toolchain without the legacy config debt that accumulates from years of ESLint plugin additions.

### Pros and Cons

Pros:
- Performance is transformative, not incremental. The difference between 500ms and 15ms on format-on-save fundamentally changes how you interact with your editor.
- Single tool means single config file, single CI step, and no conflicts between linter and formatter rules. The `biome.json` config is clean and well-documented.
- Active development with releases every two weeks. The v2.5.0 release added concise reporting, new lint rules, and improved CSS support. The project isn't stagnant.

Cons:
- Not every ESLint rule has a Biome equivalent. The rule set covers 80-90% of common cases, but niche plugins (accessibility, security-specific rules) may need you to keep ESLint running alongside Biome for now.
- The ecosystem is smaller than ESLint's. Custom rule development is possible but less documented, and there's no equivalent to the massive ESLint plugin marketplace.
- Some Prettier formatting edge cases differ slightly. The opinion is "intentionally similar" to Prettier, not identical. Teams with strict formatting expectations may notice minor differences in edge cases like trailing commas or object wrapping.

### Getting Started

```bash
# Install Biome in your project
npm install --save-dev --save-exact @biomejs/biome

# Initialize configuration
npx @biomejs/biome init

# Format and lint your project
npx @biomejs/biome check --write ./src

# Format only
npx @biomejs/biome format --write ./src

# Lint only
npx @biomejs/biome lint ./src

# Migrate from ESLint and Prettier
npx @biomejs/biome migrate eslint --write
npx @biomejs/biome migrate prettier --write
```

Add to your `package.json` scripts:

```json
{
  "scripts": {
    "check": "biome check --write ./src",
    "format": "biome format --write ./src",
    "lint": "biome lint ./src"
  }
}
```

### Alternatives

**ESLint + Prettier** — The established standard. ESLint has a massive plugin ecosystem and covers edge cases Biome doesn't yet. Prettier's formatting opinions are battle-tested across millions of projects. Choose this combination if you rely on specific ESLint plugins that Biome doesn't support, or if your team has deeply customized ESLint configs you don't want to migrate.

**OXC** — Another Rust-based JavaScript linter and formatter from the same broader movement. OXC focuses more on being a compiler and transformer (similar to SWC) with linting as a secondary feature. Biome is more opinionated about formatting and has a more complete linting rule set. Choose OXC if you need a Rust-based Babel/SWC replacement more than a linter.

**Ruff** — If you're looking at Biome's approach and wondering "is there something like this for Python?" — yes, Ruff is the Python equivalent. Same philosophy (Rust-based, single tool, replaces multiple linters), different language. For fullstack teams working across TypeScript and Python, using Biome and Ruff together gives you a consistent, fast toolchain story across both ecosystems.

### Verdict

Biome is the strongest argument for consolidating your JavaScript toolchain in 2026. The performance alone is worth the switch — running your linter and formatter in 15ms instead of 5 seconds changes how you write code. But the real value is the single config file and the elimination of ESLint/Prettier conflicts that have wasted developer hours for years. The 25K stars and rapid release cadence (v2.5.0 just shipped) suggest this project has real momentum. If you're starting a new TypeScript project today, Biome should be your default. If you're on an existing project with heavy ESLint plugin usage, the migration command gets you 80% of the way there in five minutes, but keep ESLint around for the remaining 20% until Biome's rule set catches up.
