---
name: design.md
description: "Design.md is a Google Labs format specification that gives AI coding agents a persistent, structured understanding of your design system — with Tailwind export and WCAG linting."
url: https://github.com/google-labs-code/design.md
stars: 15276
forks: 1442
language: TypeScript
tags: ["design-system", "ai-agents", "tailwind", "specification", "frontend"]
featured: false
publishedAt: 2026-06-04
---

## design.md

### Overview

Design.md is a format specification from Google Labs for describing visual identity to coding agents. It hit 15,000 GitHub stars in under two months, which tracks — every frontend developer using Claude Code, Cursor, or Codex has run into the same problem: AI agents generate UI that looks nothing like your brand.

The project comes from Google's Stitch team (stitch.withgoogle.com), the same group working on AI-assisted design tools. That origin matters. This isn't a community hack — it's a deliberate attempt to standardize how design systems communicate with AI. The spec sits in the `google-labs-code` GitHub org alongside other experimental Google developer tools.

The core idea is simple but effective: a DESIGN.md file combines machine-readable design tokens in YAML front matter with human-readable design rationale in Markdown prose. Tokens give agents exact hex values, font sizes, and spacing scales. The prose tells them *why* those values exist and how to apply them. An agent that reads your DESIGN.md file will produce UI with the right colors, typography, and spacing — not generic Material Design defaults. It ships with a CLI that lints files for structural correctness, checks WCAG contrast ratios, compares design system versions, and exports tokens to Tailwind CSS, DTCG JSON, and other formats.

### Why it matters

The "AI frontend" problem is real. Every coding agent — Claude Code, Cursor, Copilot, Codex — generates UI, but none of them know what your design system looks like unless you paste tokens into every prompt. That's fragile, expensive in tokens, and inconsistent across sessions. Design.md solves this by giving agents a single source of truth they can read once and apply repeatedly.

This connects to a broader shift in how developers work with AI. The first wave was "AI writes code." The second wave, happening now, is "AI understands context." Design systems are a huge chunk of that context for any product team. Google putting an official spec behind this — with real tooling, not just a README — signals that design-to-code is becoming a first-class problem in the AI developer toolchain.

For fullstack developers specifically, this matters because the frontend is where most AI-generated code falls apart. Backend code is functional — it either works or it doesn't. Frontend code has to *look right*, and "looking right" requires design context that most agents don't have. Design.md gives them that context in a format they can parse reliably.

### Key Features

**Machine-Readable Design Tokens.** The YAML front matter defines colors, typography, spacing, rounded corners, and component-level overrides. Tokens use standard CSS color formats (hex, `rgb()`, `oklch()`, named colors), dimension units (`px`, `em`, `rem`), and cross-references via `{path.to.token}` syntax. An agent parsing this gets exact values, not vague descriptions like "use a warm neutral background."

**Human-Readable Design Rationale.** The Markdown body provides context that tokens alone can't capture. Sections cover Overview, Colors, Typography, Layout, Elevation, Shapes, Components, and Do's and Don'ts. This prose tells agents *why* you chose `#B8422E` as your accent color and when to use it — the kind of tribal knowledge that usually lives in a designer's head.

**WCAG Contrast Linting.** The built-in linter checks component `backgroundColor`/`textColor` pairs against WCAG AA minimum contrast ratios (4.5:1). It catches accessibility issues at the design system level, before any code is generated. The linter also flags broken token references, orphaned tokens, missing sections, and unknown keys that look like typos.

**Tailwind CSS Export.** Export your design tokens directly to Tailwind v3 config JSON or Tailwind v4 CSS custom properties. One command: `npx @google/design.md export --format css-tailwind DESIGN.md > theme.css`. No manual translation between your design system and your CSS framework. This is the feature that makes design.md immediately practical for React and Next.js projects.

**Design System Diffing.** Compare two versions of a DESIGN.md file to detect token-level and prose-level regressions. The diff command outputs structured JSON showing which tokens were added, removed, or modified, and whether the changes introduced new linting errors. Useful for CI pipelines that want to catch design system drift.

**W3C DTCG Interoperability.** Export tokens to the W3C Design Tokens Community Group format (`--format dtcg`), the emerging standard for design token portability. This means your DESIGN.md tokens can flow into Figma, Style Dictionary, or any tool that supports the DTCG spec.

**Programmatic API.** The linter is available as a TypeScript library: `import { lint } from '@google/design.md/linter'`. This lets you integrate design system validation into build pipelines, CI checks, or custom tooling without shelling out to the CLI.

### Use Cases

- **React/Next.js projects** — Define your design system once in DESIGN.md, export to Tailwind config, and let AI agents generate components that match your brand without per-prompt token pasting.
- **Design system teams** — Maintain a single source of truth that both humans and machines can read. The linter catches accessibility regressions before they ship.
- **AI-assisted prototyping** — Feed your DESIGN.md to Claude Code or Cursor and get UI prototypes that respect your spacing, typography, and color palette from the first iteration.
- **Multi-brand products** — Create separate DESIGN.md files for each brand or theme. Export each to its own Tailwind config or CSS custom property set.
- **CI/CD pipelines** — Run `npx @google/design.md lint` in your build step to catch broken token references and contrast violations before deployment.

### Pros and Cons

Pros:
- Backed by Google Labs with 15K+ stars and active development. This isn't going to disappear in three months.
- The YAML + Markdown dual-layer approach is clever — machines get structured data, humans get context. Most design token formats only serve one audience.
- Tailwind export makes it immediately practical for the most popular CSS framework in the React ecosystem. Zero manual translation needed.
- WCAG contrast linting at the design system level catches accessibility issues early, which is cheaper than fixing them in production.

Cons:
- Alpha status means the spec is still evolving. Breaking changes to the token schema are likely before a 1.0 release.
- Adoption depends on AI agents actually reading DESIGN.md files. Right now you need to configure your agent to look for it — there's no universal convention yet.
- The spec is frontend-focused. Backend developers working on APIs or data pipelines won't find much utility here unless they also touch UI.

### Getting Started

```bash
# Install the CLI
npm install @google/design.md

# Create a DESIGN.md file in your project root
# (see the format example in the README)

# Lint your design system
npx @google/design.md lint DESIGN.md

# Export to Tailwind v4 CSS custom properties
npx @google/design.md export --format css-tailwind DESIGN.md > theme.css

# Compare two versions of your design system
npx @google/design.md diff DESIGN.md DESIGN-v2.md

# Get the full spec (useful for injecting into agent prompts)
npx @google/design.md spec
```

For TypeScript projects, use the programmatic API:

```typescript
import { lint } from '@google/design.md/linter';

const report = lint(markdownString);
console.log(report.findings); // Finding[]
console.log(report.summary);  // { errors, warnings, info }
```

### Alternatives

**Style Dictionary** — Amazon's design token build system that transforms tokens into platform-specific outputs (CSS, iOS, Android). Style Dictionary is more mature and supports more output formats, but it doesn't have the AI agent integration angle or the Markdown-based rationale layer. Choose Style Dictionary if you need multi-platform token transformation and don't care about AI consumption.

**Tokens Studio** — A Figma plugin and platform for managing design tokens with Git sync. Tokens Studio is better for designer-developer collaboration workflows where Figma is the source of truth. Design.md is better for developer-first teams where the codebase is the source of truth and AI agents need to read the tokens directly.

**Open Props** — A collection of CSS custom properties for common design values. Open Props gives you a starting point for spacing, colors, and typography, but it's a preset library, not a specification for your own design system. Design.md lets you define *your* brand, not adopt someone else's defaults.

### Verdict

Design.md is the most practical solution I've seen for the "AI doesn't know my design system" problem. The dual-layer format — structured tokens plus prose rationale — is the right abstraction. Agents get exact values they can apply programmatically. Humans get the *why* behind those values. The Tailwind export alone makes it worth adopting in any React or Next.js project today, even while the spec is still in alpha.

The Google Labs backing gives it credibility, but the real proof is in adoption. With 15K+ stars in two months and a spec that's simple enough to implement in an afternoon, design.md has a real shot at becoming the standard way design systems talk to AI agents. If you're building with any AI coding tool and you care about your UI looking like *your* product and not generic boilerplate, create a DESIGN.md file this week. It takes 15 minutes and immediately improves every AI-generated component.
