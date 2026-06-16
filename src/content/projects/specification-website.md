---
name: specification.website
description: "Platform-agnostic web specification covering HTML, SEO, accessibility, security, agent-readiness, and performance — with sourced references and an MCP server for AI agents."
url: https://github.com/jdevalk/specification.website
stars: 688
forks: 43
language: TypeScript
tags: ["web-standards", "accessibility", "seo", "agent-readiness", "specification"]
featured: false
publishedAt: 2026-06-16
---

## Specification Website

### Overview

The web is a mess of overlapping standards. WHATWG defines HTML, W3C ratifies WCAG, IETF publishes RFCs for security headers and `/.well-known/` URIs, IANA registers namespaces, search engines invent their own rules, and browsers add quirks on top. Almost nobody carries the whole picture. That's the problem specification.website attacks — it collects every slice into one platform-agnostic reference, with sources cited on every single page.

The project is created by Joost de Valk, the developer behind Yoast SEO, which powers search optimization on over 13 million WordPress websites. De Valk has spent the last decade-plus immersed in the intersection of web standards, SEO, and developer tooling. He's not some random contributor throwing together a blog post — this is someone who has literally shaped how the modern web handles search visibility. The project launched in late May 2026 and hit 688 stars within three weeks, which tells you the demand for this kind of consolidated reference was already there.

What makes this different from MDN or web.dev is the scope and stance. MDN documents APIs. web.dev explains best practices. specification.website defines *outcomes*. It says "your site must do X" and cites the standard that requires it, then moves on. No tutorials, no framework opinions, no marketing. It covers ten categories: Foundations (HTML, head, document basics), SEO, Accessibility (WCAG-aligned), Security (headers, transport, policies), Well-Known URIs, Agent Readiness, Performance (Core Web Vitals, caching, fonts), Privacy, Resilience, and Internationalisation. Each spec page follows a strict template: What it is, Why it matters, How to implement, Common mistakes, Verification.

### Why it matters

Two converging trends make this project worth paying attention to right now. First, the web platform keeps getting more complex. Between Content Security Policy changes, the ongoing WCAG 2.2 rollout, new `/.well-known/` URI proposals, and evolving Core Web Vitals thresholds, keeping track of what's required versus recommended versus optional is genuinely hard. Most developers handle this by Googling individual topics and hoping they find the right answer. Having a single, sourced specification that distinguishes Required from Recommended from Optional from Avoid is a significant time-saver.

Second — and this is the more interesting angle — is agent readiness. As AI coding agents like Claude Code, Cursor, and Codex become standard tools in development workflows, websites need to be *legible* to machines, not just humans. The spec includes guidance on `llms.txt`, structured data, and other mechanisms that help AI agents understand site structure and content. specification.website even ships its own MCP server at `mcp.specification.website/mcp`, meaning any MCP-aware agent can query the spec directly during development. This is a web standard project that's actively preparing for the agent-first future, not just documenting the past.

### Key Features

**Ten-Category Coverage.** The spec spans Foundations, SEO, Accessibility, Security, Well-Known URIs, Agent Readiness, Performance, Privacy, Resilience, and Internationalisation. Each category contains multiple spec pages with consistent structure. This isn't a surface-level checklist — it goes from `<title>` tag requirements all the way to `/.well-known/security.txt` configuration, with everything in between.

**Status-Level Classification.** Every specification item carries one of four statuses: Required (the web platform contract breaks without it), Recommended (modern sites should do it), Optional (depends on context), or Avoid (outdated, harmful, or actively superseded). This eliminates the ambiguity that plagues most web development guides. You know exactly what's non-negotiable and what's a nice-to-have.

**Source Citations on Every Page.** Every spec page cites at least one authoritative source — WHATWG HTML Living Standard, MDN Web Docs, WCAG 2.2, IETF RFCs, schema.org, Google Search Central, or other recognized authorities. The project draws on twelve-plus reference sources and makes the chain of evidence transparent. If you disagree with a requirement, you can trace it back to the original standard and verify.

**MCP Server for AI Agents.** A separate Cloudflare Worker in the `mcp/` directory exposes the entire specification to MCP-aware agents. Any tool that supports the Model Context Protocol — Claude Code, Cursor, Hermes, and others — can query the spec during development. This turns the specification from a passive reference into an active participant in your coding workflow. Your agent can check whether your site meets spec requirements without you leaving your editor.

**Automated Derivatives.** Everything derived from the spec content updates automatically when you edit the source markdown: the `/spec/` pages, `/checklist/`, `/llms.txt`, `/llms-full.txt`, `/sitemap-index.xml`, `/rss.xml`, per-page `.md` endpoints, the Pagefind search index, and the MCP server's bundled data. You never hand-edit derived artifacts. Edit the source, and the build system propagates changes everywhere.

**Platform-Agnostic by Design.** The spec deliberately avoids framework-specific advice. There's no "use this Next.js plugin" or "install this WordPress extension." It describes outcomes and requirements — you choose the implementation. This makes it relevant whether you're building with React, Vue, Django, Go, or plain HTML.

**Open for Community Contribution.** The project accepts pull requests under three rules: cite your sources, stay platform-agnostic, and be honest about status. The build fails if the schema is invalid, which keeps contributions consistent. Content is CC BY 4.0 licensed, code is MIT — fork it, ship it, build on it.

### Use Cases

- **Fullstack developers building new projects** — Use the spec as a launch checklist. Before you deploy, verify your site meets the Required items across all ten categories. Catches the stuff that's easy to miss: missing security headers, absent `robots.txt`, no `lang` attribute on `<html>`.

- **AI agent workflows** — Connect the MCP server to your coding agent and have it validate your site against the spec during development. Instead of manually checking whether your CSP headers are correct, your agent does it automatically.

- **Team onboarding and code review** — Point new team members at specification.website instead of writing internal wiki pages about "how we do web standards." The spec is more complete and better sourced than anything most teams would maintain internally.

- **Accessibility audits** — The accessibility section maps directly to WCAG 2.2 requirements with practical implementation guidance. Use it as a pre-audit checklist before engaging an accessibility consultant.

- **SEO technical reviews** — The SEO category covers everything from meta tags to structured data to `llms.txt`. It's the technical SEO reference that Google's own documentation sometimes fails to provide in one place.

### Pros and Cons

Pros:
- **Author credibility** — Joost de Valk created Yoast SEO, used on 13+ million sites. He understands web standards at a depth that most spec authors don't. The project reflects years of practical experience, not just academic knowledge.
- **Genuinely platform-agnostic** — Unlike most web development resources, this doesn't assume any framework. The outcome-based approach means it stays relevant regardless of your tech stack.
- **MCP integration is forward-thinking** — The built-in MCP server makes this one of the first web standard references designed to be consumed by AI agents. As agent-driven development grows, this becomes increasingly valuable.

Cons:
- **Still early** — At three weeks old with 688 stars, the spec doesn't cover every edge case yet. Some categories have more depth than others, and the community contribution pipeline is just getting started.
- **Not a tool you install** — This is a reference specification, not a library or CLI. There's no `npm install specification.website` that magically validates your site. The MCP server helps, but you still need to interpret the results.
- **Astro-specific build system** — While the content is platform-agnostic, the project itself uses Astro for its site generation. If you want to contribute, you need to be comfortable with Astro's content collection system.

### Getting Started

The simplest way to use the spec is to visit the live site and browse:

```bash
# Visit the live spec
open https://specification.website

# Or clone and run locally
git clone https://github.com/jdevalk/specification.website.git
cd specification.website
npm install
npm run dev      # http://localhost:31337
npm run build    # static output in ./dist
```

To connect the MCP server to your AI agent, add the MCP endpoint to your agent configuration:

```json
{
  "mcpServers": {
    "web-spec": {
      "url": "https://mcp.specification.website/mcp"
    }
  }
}
```

To contribute a new spec page:

```bash
# 1. Find the right category under src/content/spec/<category>/
# 2. Copy an existing .md file
# 3. Fill in front matter: title, summary, category, status, order, sources
# 4. Write body sections: What it is, Why it matters, How to implement, Common mistakes, Verification
# 5. Open a PR — the build will fail if schema is invalid
```

### Alternatives

**MDN Web Docs** — Mozilla's comprehensive web technology reference is the gold standard for API documentation. It's more detailed on individual APIs and browser compatibility. Choose MDN when you need to understand how a specific API works. Choose specification.website when you need to know what your site *should* do across all categories, with clear required/recommended/optional status.

**web.dev by Google** — Google's guidance on building modern web experiences, focused heavily on performance and Core Web Vitals. It's more opinionated and ties closely to Chrome-specific features. Choose web.dev when you're optimizing for Google's ecosystem specifically. Choose specification.website when you want standards-sourced, platform-neutral guidance that doesn't assume you're building for Chrome.

**Lighthouse** — Google's automated auditing tool runs checks against performance, accessibility, SEO, and best practices. It's a tool, not a reference — you run it and get a score. Choose Lighthouse when you want automated validation. Choose specification.website when you want to understand *why* something matters and where the requirement comes from, not just whether you passed or failed.

### Verdict

This is the web specification that should have existed years ago. The fact that it took Joost de Valk — someone who's been in the SEO and web standards trenches for over a decade — to build it makes sense. He's seen the fragmentation firsthand. The project covers ten categories with sourced, status-classified requirements, ships an MCP server for agent integration, and stays genuinely platform-agnostic. At 688 stars in three weeks with an active contributor pipeline, it's gaining traction fast. If you build websites for a living — whether that's React frontends, Django backends, or Go APIs serving HTML — bookmark specification.website. It won't replace MDN for API lookups or Lighthouse for automated audits, but as a comprehensive, opinionated-but-fair reference for what your site should actually do, nothing else comes close right now.
