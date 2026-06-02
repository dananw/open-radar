---
name: specification.website
description: "Platform-agnostic website specification covering SEO, accessibility, security, and AI agent-readiness — one reference to replace scattered web standards docs."
url: https://github.com/jdevalk/specification.website
stars: 443
forks: 32
language: TypeScript
tags: ["web-standards", "seo", "accessibility", "agent-readiness", "specification"]
featured: false
publishedAt: 2026-06-03
---

## Specification Website

### Overview

Specification Website is a platform-agnostic, open-source reference that collects the entire web standards stack — from HTML `<title>` tags to `/.well-known/security.txt`, from WCAG contrast ratios to `llms.txt` — into one sourced, opinionated specification. It launched on May 29, 2026 and hit 443 GitHub stars within its first five days, which is a strong signal that developers have been hungry for exactly this kind of consolidated reference.

The project is created by Joost de Valk, the founder of Yoast SEO. If you've built a WordPress site in the last decade, you've used his work — Yoast's SEO plugin has over 13 million active installations. He stepped back from Yoast after it was acquired and has been working on web standards and open-source tooling since. This isn't some random developer's weekend project. It's built by someone who has spent 15+ years thinking about how search engines, accessibility tools, and browsers interpret web pages.

The core problem is straightforward: the web's standards are fragmented across dozens of organizations. WHATWG defines HTML, W3C ratifies WCAG, IETF publishes RFCs for security headers and `/.well-known/` URIs, IANA registers namespaces, search engines publish their own rules, and browsers add their own quirks. Almost nobody carries the whole picture. Developers end up checking MDN for one thing, web.dev for another, some random blog post for security headers, and a W3C document for accessibility. Specification Website stitches those slices into a single, sourced document with clear status levels: Required, Recommended, Optional, or Avoid.

### Why it matters

The timing is not accidental. Two converging trends make this project particularly relevant right now. First, AI agents are increasingly crawling, parsing, and interacting with websites. The `llms.txt` standard, the Agent2Agent protocol, and MCP server integrations mean your website is no longer just consumed by human visitors and search engine bots — it's read by AI systems that need structured, machine-readable metadata. Specification Website includes an "Agent Readiness" category that addresses this directly, which is something you won't find in traditional web development guides.

Second, the regulatory landscape around accessibility and privacy is tightening. The European Accessibility Act took effect in June 2025, and enforcement is ramping up. WCAG 2.2 is now the reference standard in multiple jurisdictions. Developers can't afford to treat accessibility as an afterthought, yet most "fullstack" tutorials barely mention it. Having a single specification that maps accessibility requirements to concrete implementation steps — with sources — fills a real gap.

The broader pattern here is consolidation. The web platform has gotten complex enough that individual developers can't hold the entire standards landscape in their heads. A specification that says "here's what's Required, here's what's Recommended, here's where the standard is still unsettled" saves teams from both over-engineering and missing critical requirements.

### Key Features

**Status-Level Classification.** Every item in the specification is tagged as Required, Recommended, Optional, or Avoid. This isn't opinion — the status levels are derived from the underlying standards. "Required" means the web platform contract breaks without it. "Avoid" means outdated, harmful, or actively superseded. Developers get a clear signal about what needs attention now versus what can wait.

**Source Citations on Every Page.** Unlike blog posts or tutorials, every specification page cites its sources directly — WHATWG HTML Living Standard, MDN, WCAG 2.2, IETF RFCs, Google Search Central, and others. You can verify every claim. This makes the spec trustworthy in a way that most web development guides aren't.

**Platform-Agnostic Design.** The specification describes outcomes, not implementations. There's no "use this Next.js plugin" or "install this npm package." You pick your framework — React, Astro, Django, Go, whatever — and the spec tells you what your output needs to look like. This makes it useful across the entire fullstack ecosystem, not just one framework community.

**MCP Server for AI Agents.** A separate Cloudflare Worker exposes the specification to MCP-aware AI agents. Tools like Claude and ChatGPT can query the spec directly, which means you can integrate web standards compliance into your AI-assisted development workflow. The MCP server is deployed at `mcp.specification.website/mcp` and is open source in the `mcp/` directory.

**Comprehensive Category Coverage.** The spec covers ten categories: Foundations, SEO, Accessibility, Security, Well-Known URIs, Agent Readiness, Performance, Privacy, Resilience, and Internationalisation. Most developers only think about three or four of these. The specification forces you to consider the full picture — and for each category, it tells you exactly what's Required versus Optional.

**Auto-Generated Outputs.** Everything derived from the spec content updates automatically when you edit the source markdown: the `/spec/` pages, `/checklist/`, `/llms.txt`, `/llms-full.txt`, sitemap, RSS feed, per-page `.md` endpoints, the Pagefind search index, and the MCP server's bundled data. This is a well-engineered Astro site, not just a collection of docs.

**Checklist Endpoint.** The `/checklist/` page gives you a quick-reference list of every specification item with its status level. Use it as a pre-launch audit tool or a quarterly review checklist for existing sites.

### Use Cases

- **Pre-launch website audits** — Run through the checklist before deploying a new site to make sure you haven't missed critical SEO, accessibility, or security requirements.
- **AI agent integration** — Connect the MCP server to your Claude or ChatGPT workflow so your AI assistant can reference actual web standards when suggesting implementation changes.
- **Team onboarding** — New developers get a single, authoritative reference instead of a scattered collection of bookmarks. The status levels help them prioritize what to learn first.
- **Accessibility compliance** — Map WCAG 2.2 requirements to concrete implementation steps with sourced references, useful for teams navigating the European Accessibility Act or similar regulations.
- **SEO best practices** — Joost de Valk literally built the most-used SEO tool on the web. The SEO category reflects that depth, covering structured data, canonical URLs, hreflang, and modern search engine requirements.
- **Security header configuration** — Stop Googling "what security headers should I set" every time you deploy. The Security category lists exactly what's Required and Recommended with RFC citations.

### Pros and Cons

Pros:
- Created by the founder of Yoast SEO, giving it immediate credibility in the SEO and web standards space. The author has 15+ years of domain expertise.
- Platform-agnostic by design — works for React, Astro, Django, Go, or any other stack. No framework lock-in.
- Every claim is sourced. You can verify each specification item against the original WHATWG, W3C, IETF, or other standard body document.
- The MCP server integration makes it the first web standards reference that's natively accessible to AI agents, which is forward-looking and practical.
- Actively maintained with 61 commits in the first week, plus community contributions starting to arrive.

Cons:
- Very early stage — created May 29, 2026, so some categories may be thinner than others. The project is still filling out.
- Only one primary contributor (jdevalk with 61 of 68 total commits). If he steps back, the project's momentum depends on community adoption.
- Content is licensed CC BY 4.0 but the specification itself has a non-standard license, which might concern some organizations. The code is MIT.

### Getting Started

```bash
# Clone and run locally
git clone https://github.com/jdevalk/specification.website.git
cd specification.website
npm install
npm run dev      # http://localhost:31337

# Build for production (static output in ./dist)
npm run build

# Connect the MCP server to your AI agent
# Add to your MCP client config:
# {
#   "mcpServers": {
#     "specification": {
#       "url": "https://mcp.specification.website/mcp"
#     }
#   }
# }
```

Browse the spec at `http://localhost:31337/spec/` or check the checklist at `/checklist/`. The `llms.txt` endpoint at `/llms.txt` gives you a machine-readable summary of the entire specification.

### Alternatives

**web.dev** — Google's developer guidance site covers performance, accessibility, and SEO with interactive tools like Lighthouse. It's more tutorial-oriented and platform-adjacent (heavy Chrome/Google bias). Choose web.dev when you want hands-on guidance with specific tools. Choose Specification Website when you want a sourced, platform-neutral reference.

**MDN Web Docs** — Mozilla's documentation is the definitive reference for individual web APIs and HTML/CSS features. It's encyclopedic but doesn't aggregate cross-cutting concerns like "what security headers do I need" or "how do I make my site agent-ready." MDN tells you what each API does. Specification Website tells you what your site needs.

**WCAG 2.2 Specification** — The W3C's own accessibility standard is authoritative but dense and focused solely on accessibility. If you only need accessibility requirements, go to the source. If you need accessibility in the context of SEO, security, performance, and agent readiness, Specification Website gives you the integrated view.

### Verdict

This is the web standards reference I've wanted for years. The web platform is too complex for any single developer to hold in their head, and the usual approach — bookmarking 15 different docs across MDN, web.dev, WCAG, RFCs, and blog posts — is fragile and incomplete. Specification Website collapses that into one sourced, structured document with clear status levels. The fact that it's created by Joost de Valk, who has spent more time thinking about how search engines and browsers interpret web pages than almost anyone alive, gives it immediate authority. The MCP server integration is a smart forward-looking move that positions this as a reference for AI-assisted development workflows, not just human reading. It's early — five days old at the time of writing — and the thin contributor base is a real risk. But the initial quality is high, the architecture is solid (Astro + Cloudflare, auto-generated outputs from source markdown), and the scope is exactly right. If you build websites for a living, bookmark this.
