---
name: thesvg
description: "6,100+ brand and cloud SVG icons for developers — tree-shakeable, TypeScript-first, with React, Vue, Svelte packages, CLI, CDN, and MCP server for AI agents."
url: https://github.com/glincker/thesvg
stars: 2247
forks: 177
language: TypeScript
tags: ["icons", "svg", "typescript", "react", "developer-tools", "design-resources"]
featured: false
publishedAt: 2026-06-11
---

## theSVG

### Overview

theSVG is a massive, open-source collection of 6,100+ SVG icons focused on brand logos and cloud architecture diagrams. It launched in March 2026 and crossed 2,200 GitHub stars in just three months, with 14,000+ monthly npm downloads. That growth rate signals real developer demand for a centralized, well-engineered icon library that goes beyond generic UI glyphs.

The project is built by Glincker, a developer tooling company that also maintains the thesvg.org browsing platform. What sets theSVG apart from the graveyard of abandoned icon repos is the ecosystem around it: framework-specific packages for React, Vue, and Svelte; a shadcn-style CLI installer; a Figma plugin; VS Code, Raycast, Neovim, and Alfred extensions; a public CDN; and an MCP server so AI coding agents can fetch icons programmatically. This isn't just a folder of SVG files — it's an icon infrastructure layer.

The core problem theSVG solves is deceptively simple but surprisingly painful in practice: finding high-quality, consistently formatted brand SVGs. Brand logos are scattered across press kits, Figma community files, random GitHub gists, and Wikipedia exports. None of them follow the same conventions. theSVG normalizes 4,400+ brand icons across 55+ categories, plus 739 AWS Architecture icons, 626 Azure Service icons, and 214 Google Cloud icons — all versioned, typed, and available through a single `npm install`.

### Why it matters

Every fullstack developer has wasted time hunting for a brand logo SVG. You need the Stripe logo for a payments page, the AWS S3 icon for an architecture diagram, or the GitHub icon for an OAuth button. You end up on some sketchy icon site, download an SVG with inconsistent viewBox attributes, embedded raster images, or mystery clip paths, and spend 20 minutes cleaning it up. theSVG eliminates that workflow entirely.

The cloud architecture icon collections are particularly valuable. AWS, Azure, and GCP icons are notoriously hard to get in usable SVG format. AWS distributes them as a 500MB PowerPoint file. theSVG extracts, normalizes, and versions them — 739 AWS icons updated quarterly, matching the official 2026-Q1 release. For anyone building architecture diagrams, internal dashboards, or documentation sites, this saves hours per project.

The MCP server integration is forward-looking. AI coding agents are increasingly generating UI code, and they need access to icon assets. theSVG's MCP server lets Claude, Cursor, and Windsurf fetch icons by name or category during code generation. This is how icon libraries need to work in an agent-assisted development world.

### Key Features

**6,100+ Icons Across Four Collections.** The library ships 4,487 brand icons spanning 55+ categories (payment processors, social platforms, dev tools, cloud providers, and more), plus dedicated collections for AWS Architecture (739 icons), Azure Services (626 icons), and Google Cloud (214 icons). Each icon includes multiple variants — default, mono, light, dark, and wordmark — totaling 8,400+ SVG files. That's enough coverage that you rarely need to look elsewhere.

**True Tree-Shaking.** Import one icon, ship only that icon. The scoped `@thesvg/icons` package uses named exports so bundlers like Webpack, Vite, and esbuild eliminate dead code automatically. A project using only `github` and `figma` icons adds roughly 2KB to its bundle, not the full 6,100-icon payload. This is the difference between a toy icon library and one you'd actually use in production.

**Framework-Specific Packages.** Dedicated packages for React (`@thesvg/react`), Vue 3 (`@thesvg/vue`), and Svelte (`@thesvg/svelte`) export typed components with consistent props — `width`, `height`, `className`, and variant selection. No wrapper code, no runtime overhead. The TypeScript types are auto-generated from the icon metadata, so your IDE autocomplete actually works.

**shadcn-Style CLI Installer.** `npx @thesvg/cli add github` drops the raw SVG file into your project, similar to how shadcn/ui adds components. This is a clever approach — you own the SVG file, can customize it, and don't depend on the package at runtime. It also means the icons work in any framework, not just the ones with dedicated packages.

**Developer Ecosystem Extensions.** The Figma plugin lets designers browse and insert icons as editable vectors. The VS Code extension adds icon search to the command palette with copy-as-SVG, JSX, or CDN link. Raycast and Neovim plugins provide keyboard-driven icon lookup. Alfred workflow does the same on macOS. This breadth of tooling is unusual for an icon library and shows serious investment in the developer experience.

**Public CDN and API.** Any icon is accessible at `https://thesvg.org/icons/{slug}/{variant}.svg` or via jsDelivr. No authentication, no rate limits for reasonable use. This means you can use theSVG icons in HTML, CSS, Markdown, Notion, Webflow, or Framer without installing anything. The CDN URLs are stable and versioned.

**MCP Server for AI Agents.** The `@thesvg/mcp-server` package exposes icon search and retrieval as tool calls for AI assistants. An agent generating a pricing page can programmatically fetch the Stripe, PayPal, and Visa icons without hallucinating SVG paths. This is a small but meaningful step toward agent-aware asset libraries.

### Use Cases

- **SaaS dashboards and landing pages** — Need brand logos for integrations, payment providers, or partner sections? Import exactly the icons you need with tree-shaking and ship them as typed React or Vue components.
- **Cloud architecture diagrams** — The AWS, Azure, and GCP collections replace the painful process of extracting icons from official PowerPoint and PDF distributions. Updated quarterly to match provider releases.
- **Internal tools and admin panels** — Display service status, integration health, or provider breakdowns with consistent, properly sized brand icons instead of screenshots or emoji.
- **Documentation and technical blogs** — Use CDN URLs to drop brand icons into Markdown, Notion, or static site generators without any build step or package installation.
- **AI-assisted development workflows** — The MCP server lets coding agents fetch the right icon during code generation, eliminating the "agent hallucinated an SVG" problem.
- **Design-to-development handoff** — Designers use the Figma plugin; developers use the CLI or framework packages. Same icon source, same variants, no manual asset transfer.

### Pros and Cons

Pros:
- The icon quality and consistency are genuinely impressive. Every SVG follows the same viewBox conventions, uses clean paths, and includes proper title attributes. No embedded raster images, no mystery transforms.
- The ecosystem is unusually complete for an open-source icon library — CLI, CDN, framework packages, IDE extensions, Figma plugin, MCP server, and a browsing website. Most icon libraries ship a package and call it done.
- Tree-shaking actually works. The scoped `@thesvg/icons` package is structured so bundlers can eliminate unused icons at build time, keeping bundle sizes minimal.
- The cloud architecture icon collections (AWS, Azure, GCP) have no real competitor in the open-source space. Getting these icons in clean SVG format normally requires extracting them from vendor-provided PowerPoint files.

Cons:
- 2,200 stars and 14K monthly npm downloads are solid but not dominant. The project is three months old, and long-term maintenance depends on the Glincker team staying committed to quarterly cloud icon updates.
- No Angular package. React, Vue, and Svelte are covered, but Angular developers need to use the raw SVG imports or CDN approach.
- The brand icon coverage, while broad at 4,400+, still has gaps. Niche SaaS tools, regional brands, and newer startups may not be represented. Community contributions help, but coverage depends on open-source momentum.

### Getting Started

```bash
# Install the full package
npm install thesvg

# Or use the scoped tree-shakeable package
npm install @thesvg/icons

# Or use the CLI to add individual icons to your project
npx @thesvg/cli add github
npx @thesvg/cli add aws-s3
npx @thesvg/cli add stripe
```

React usage:

```tsx
import { Github, Stripe, Figma } from "@thesvg/react";

function Logos() {
  return (
    <div className="flex gap-4">
      <Github width={24} height={24} />
      <Stripe width={24} height={24} />
      <Figma width={24} height={24} />
    </div>
  );
}
```

Vue usage:

```vue
<script setup>
import { Github, Stripe } from "@thesvg/vue";
</script>

<template>
  <Github width="24" height="24" />
  <Stripe width="24" height="24" />
</template>
```

CDN (no install needed):

```html
<img src="https://thesvg.org/icons/github/default.svg" width="32" height="32" alt="GitHub" />
<img src="https://thesvg.org/icons/aws-s3/default.svg" width="32" height="32" alt="AWS S3" />
```

Browse all icons at [thesvg.org](https://thesvg.org).

### Alternatives

**Simple Icons** — The oldest and most popular brand icon collection with 3,000+ icons. Simple Icons has broader community recognition and more brand coverage, but it's a flat file collection with no framework packages, no tree-shaking support, no CLI, and no AI integration. Choose Simple Icons if you need a specific niche brand that theSVG doesn't cover yet.

**Lucide** — A fork of Feather Icons with 1,500+ generic UI icons (arrows, buttons, UI elements). Lucide is excellent for interface icons but doesn't cover brand logos or cloud architecture diagrams. theSVG and Lucide are complementary — use Lucide for UI chrome and theSVG for brand and cloud icons.

**Iconify** — A massive icon framework that aggregates 200,000+ icons from 150+ icon sets including Simple Icons, Material Design, and many others. Iconify is the most comprehensive option, but its breadth comes with complexity. theSVG is more focused and opinionated — brand logos and cloud icons with first-class TypeScript support and a curated, consistent design language.

### Verdict

theSVG fills a gap that's been annoying developers for years: getting clean, consistent, production-ready brand and cloud SVGs without the scavenger hunt. The icon quality is high, the TypeScript integration is thoughtful, and the ecosystem (CLI, CDN, MCP server, IDE extensions) shows a level of investment you don't usually see from icon libraries. At 2,200 stars and 14K monthly npm downloads after just three months, the traction is real. If you're building anything that displays brand logos or cloud architecture diagrams — and as a fullstack developer, you definitely are — theSVG is worth adding to your toolkit. The tree-shaking and framework packages mean it costs almost nothing to adopt, and the CDN means you can start using it right now without installing anything at all.
