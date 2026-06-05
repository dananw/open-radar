---
name: design-extract
description: "Designlang extracts complete design systems from any URL — DTCG tokens, Tailwind config, shadcn themes, Figma variables, WCAG audit, and 17+ output files in one command."
url: https://github.com/Manavarya09/design-extract
stars: 3059
forks: 275
language: JavaScript
tags: ["design-systems", "tailwind", "accessibility", "cli", "developer-tools"]
featured: false
publishedAt: 2026-06-05
---

## Designlang (design-extract)

### Overview

Designlang is a CLI tool that reads the design system off any live website. Point it at a URL, and it emits 17+ files — W3C DTCG tokens, Tailwind config, shadcn/ui theme CSS, Figma Variables, motion tokens, typed React component stubs, brand voice analysis, and paste-ready prompts for v0, Lovable, Cursor, and Claude Artifacts. One command, one headless browser pass, a complete design system extraction.

The project is built by Manav Arya Singh and has grown to over 3,000 GitHub stars since its April 2026 creation. It's published on npm as `designlang` and works with Node.js 20+. The tool uses Playwright under the hood to crawl live DOM, collecting 25+ computed properties per element across up to 5,000 DOM nodes in a single pass.

The core problem it solves is deceptively simple: every design system lives somewhere on the web, but extracting it programmatically has always been painful. You either eyeball colors from DevTools, manually copy CSS variables, or use tools that only grab surface-level paint (colors, fonts) without understanding architecture — layout patterns, responsive behavior, interaction states, motion language, or component anatomy. Designlang reads a website the way a developer reads a stylesheet, but faster and more completely.

### Why it matters

Design systems are the connective tissue of modern web development. Every React component library, every Tailwind project, every shadcn/ui installation starts with design tokens. But those tokens are usually scattered across Figma files, CSS custom properties, JavaScript config objects, and the minds of designers who built them. Reconstructing a design system from an existing site — whether for a redesign, a migration, or competitive analysis — has always been manual, error-prone work.

The tool sits at an interesting intersection of three trends: the standardization of design tokens (W3C DTCG format), the dominance of utility-first CSS (Tailwind), and the rise of AI coding agents that need structured design context to generate consistent UI. Designlang bridges all three. It extracts tokens in the standardized DTCG format, generates drop-in Tailwind configs, and exposes everything through an MCP server so Cursor, Claude Code, and other AI tools can reference your design system directly.

The timing matters too. With AI-generated UI becoming mainstream (v0, Lovable, Bolt), the quality of generated output depends entirely on the quality of the design context you feed the model. Designlang turns any website into a structured prompt pack that these tools can consume. That's a workflow that didn't exist six months ago.

### Key Features

**One-Command Full Extraction.** Run `npx designlang https://stripe.com` and get 17+ files covering colors, typography, spacing, shadows, radii, CSS variables, breakpoints, animations, layout patterns, and component anatomy. No configuration, no setup. The tool auto-detects frameworks, Tailwind versions, and analytics providers. Output lands in `./design-extract-output/` ready to use.

**W3C DTCG Token Output.** Tokens are emitted in the W3C Design Tokens Community Group format with three layers: primitive (raw values), semantic (purpose-labeled), and composite (component-level). This is the emerging standard that Figma, Style Dictionary, and token pipelines are converging on. Your tokens work with any tool that reads DTCG.

**Multi-Platform Emitters.** Pass `--platforms web,ios,android,flutter,wordpress,all` and get platform-native outputs — iOS SwiftUI tokens, Android Compose themes, Flutter dart files, WordPress block themes. One extraction serves every platform your product ships on. This eliminates the "extract for web, manually port to mobile" workflow that wastes days on multi-platform teams.

**WCAG Accessibility Scoring and Remediation.** Every foreground/background color pair is scored against WCAG 2.1 contrast ratios. Failing pairs get a remediation palette suggesting the nearest passing color. The tool also detects specificity wars, `!important` usage, unused CSS, and generates a shareable Design Report Card with letter grades across 8 dimensions. Run `designlang grade https://yourapp.com --badge` for a shields.io-style SVG badge you can drop in your README.

**MCP Server for AI Agent Integration.** `designlang mcp` launches a stdio MCP server that exposes extracted tokens, semantic regions, components, and contrast pairs to any MCP-aware agent — Cursor, Claude Code, Windsurf, and others. This means your AI coding assistant can reference the actual design system when generating UI, instead of guessing at colors and spacing.

**Design Battle and Remix.** Two commands that go beyond extraction. `designlang battle stripe.com vercel.com` generates a head-to-head graded comparison card with dimension-by-dimension scoring. `designlang remix stripe.com --as cyberpunk` restyles any site in an alternative design vocabulary — brutalist, Swiss, art deco, cyberpunk, soft UI, or editorial. Useful for exploring design directions without touching Figma.

**CI-Ready Drift Detection.** `designlang drift https://yourapp.com --tokens ./src/tokens.json` compares local tokens against the live site and exits non-zero on drift. `designlang lint ./src/tokens.json` audits a local token file. `designlang visual-diff https://staging https://prod` generates a side-by-side HTML diff. All three are designed to run in CI pipelines, catching design regressions before they ship.

### Use Cases

- **Design system migration** — Moving from a legacy site to a new stack? Extract the existing design system as structured tokens, then apply them to your new Tailwind or shadcn/ui project with `designlang apply`.
- **Competitive analysis** — Run `designlang battle` on competitor sites to compare design quality across typography, spacing, color, accessibility, and more. Generate shareable report cards for design reviews.
- **AI-assisted UI generation** — Feed extracted tokens and prompts into v0, Lovable, or Cursor to generate UI that actually matches your brand. The MCP server integration makes this seamless for Claude Code and Cursor users.
- **Multi-platform design consistency** — Extract once, emit to web, iOS, Android, Flutter, and WordPress. Ensure your design tokens stay synchronized across every platform.
- **Accessibility auditing** — Run `designlang grade` on any URL to get a comprehensive WCAG audit with remediation suggestions. Use the CI integration to block PRs that introduce accessibility regressions.
- **Brand book generation** — `designlang brand stripe.com` produces a full 13-chapter editorial brand guidelines document, print-ready with dark mode toggle. Useful for agencies and design teams documenting client brands.

### Pros and Cons

Pros:
- The breadth of output is unmatched — 17+ files covering tokens, Tailwind, Figma, React stubs, motion, voice, prompts, and MCP in a single pass. No other tool comes close to this coverage.
- Multi-platform emitters solve a real pain point for teams shipping on web and mobile simultaneously. Extract once, serve every platform.
- The MCP server integration is forward-thinking. As AI coding agents become standard, having your design system exposed as structured context is increasingly valuable.
- Active development with rapid iteration — v12.8 at time of writing, with new features shipping weekly (pair, brand book, theme-swap, remix all landed in the last month).

Cons:
- Playwright dependency means the first run downloads ~150MB of Chromium. Use `--system-chrome` to skip this, but it adds friction for CI environments.
- Extraction accuracy depends on the target site's CSS quality. Sites with heavy CSS-in-JS, shadow DOM, or dynamic styling may produce incomplete results.
- The feature surface area is enormous — 40+ commands and flags. New users may find the CLI overwhelming without reading the docs first.

### Getting Started

```bash
# Extract everything from a URL
npx designlang https://stripe.com

# Extract with all captures (screenshots, responsive, interactions)
npx designlang --full https://vercel.com

# Generate a shareable design report card
npx designlang grade https://linear.app --badge

# Apply extracted design directly to your project
npx designlang apply https://stripe.com -d ./src

# Generate a working Next.js starter with the extracted design
npx designlang clone https://stripe.com

# Launch MCP server for AI agent integration
npx designlang mcp

# Install as an agent skill for Cursor / Codex / Claude Code
npx skills add Manavarya09/design-extract
```

### Alternatives

**Style Dictionary** — Amazon's token transformation tool that converts design tokens between formats (CSS, iOS, Android, etc.). Style Dictionary is a build tool for tokens you already have; designlang is an extraction tool that creates tokens from live sites. Use Style Dictionary when you're managing tokens in a pipeline, use designlang when you need to capture them from the wild.

**Tokens Studio (Figma plugin)** — A Figma plugin for exporting design tokens in DTCG format. Tokens Studio works inside Figma where designers define tokens; designlang works on live websites where those tokens are already deployed. Different starting points, complementary end goals. If your designers work in Figma, use Tokens Studio. If you need to reverse-engineer a design system from a production site, use designlang.

**Puppeteer / Playwright scripts** — You could write custom extraction scripts, and many teams do. The problem is maintenance: every site's CSS architecture is different, and keeping extraction scripts working across framework updates, CSS-in-JS runtime changes, and new token formats is a full-time job. Designlang abstracts all of that into a maintained, opinionated tool with 17 extractor modules that handle edge cases you'd spend weeks discovering.

### Verdict

Designlang is the most complete design system extraction tool I've seen. The feature list reads like a wishlist — DTCG tokens, Tailwind config, shadcn themes, Figma Variables, WCAG audit, MCP server, multi-platform emitters, CI drift detection, brand book generation, design battles, and vocabulary remixing — and it actually delivers on all of it. At 3,000+ stars in under two months, the community agrees this fills a real gap. The AI agent integration (MCP server, prompt packs, agent skills) is what makes it especially relevant right now: as AI-generated UI becomes the norm, structured design context becomes infrastructure. If you're a frontend developer who works with design systems, a fullstack developer migrating UI between stacks, or an AI-assisted developer who wants their tools to understand brand consistency, designlang should be in your toolbox. The CLI surface area is large, but `npx designlang <url>` is all you need to start.
