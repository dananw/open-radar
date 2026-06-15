---
name: mdxg
description: "Vercel Labs' open spec defining how interfaces should present and navigate markdown — virtual pages, search, theme adaptation, and more for any renderer."
url: https://github.com/vercel-labs/mdxg
stars: 352
forks: 19
language: TypeScript
tags: ["markdown", "specification", "vercel", "developer-experience", "documentation", "ai-agents"]
featured: false
publishedAt: 2026-06-15
---

## MDXG — Markdown Experience Guidelines

### Overview

MDXG is a specification from Vercel Labs that defines how interfaces should present and interact with markdown documents. It hit 350 GitHub stars within its first month, which might sound modest until you realize this isn't a library you install — it's a spec that changes how every markdown-rendering tool should behave. That kind of traction for a specification, not a product, signals real demand.

The project comes from Vercel Labs, the experimental arm of the company behind Next.js, the Vercel platform, and Turborepo. The primary contributor is ctate, a Vercel engineer. That pedigree matters here — Vercel builds infrastructure for the modern web, and they've seen firsthand how markdown is used (and misused) across thousands of developer tools and documentation sites. When Vercel says "markdown presentation is broken," they're speaking from a position of scale.

The core problem MDXG tackles is simple but pervasive: markdown is the most widely used document format in software development, yet the experience of reading it hasn't changed in twenty years. A 50-line README and a 3,000-line technical spec get the same flat-scroll treatment. No navigation. No structure. No sense of where you are in the document. Every major AI model outputs markdown natively. Every developer reads it daily. But the rendering experience is stuck in 2004. MDXG defines what a complete markdown experience looks like — virtual pages, navigation, search, theme adaptation, code block rendering — so every team doesn't have to reinvent it independently.

### Why it matters

The timing here is not accidental. Markdown has become the primary interface between humans and AI agents. When an LLM generates documentation, explains code, writes a report, or drafts a technical proposal, it writes markdown. When a developer reads, reviews, or edits that output, they're consuming markdown. The format is ideal for agents: low token cost, simple to generate, trivial to parse. But for humans, the reading experience has fallen behind. People keep reaching for heavier formats — Notion, Google Docs, Confluence — not because markdown can't hold the content, but because the presentation layer doesn't do it justice.

MDXG sits above the syntax layer. It doesn't compete with CommonMark, GFM, or MDX. It defines the experience layer: given a parsed markdown document, what should a user be able to do with it? Virtual pages that split documents at heading boundaries. Page navigation so you know where you are. Search across all pages with match highlighting. Theme adaptation that inherits from the host environment. Code blocks with syntax highlighting and copy buttons. Task lists rendered as checkboxes. This is the stuff every markdown renderer eventually implements on its own, in incompatible ways. MDXG standardizes it.

For fullstack developers building documentation platforms, AI interfaces, CMS systems, internal tools, or any application that renders user-generated content — this spec is the reference you didn't know you needed. It's the kind of standard that, once you read it, makes you realize how much time your team has wasted building these features ad hoc.

### Key Features

**Virtual Pages.** H1 and H2 headings split a document into navigable pages automatically. A single markdown file becomes a multi-page experience without any file splitting, configuration, or build step. This is the most impactful feature in the spec — it transforms a flat wall of text into a structured, browsable document. For anyone building a docs site or an AI output viewer, this solves the "endless scroll" problem at the spec level.

**Page Navigation and Outline.** Users can see all pages, jump to any page, and tell which page they're on. Within a page, H3–H6 headings form a navigable outline with the current heading indicated. The spec deliberately doesn't prescribe the UI — it could be a sidebar, a command palette, a dropdown, or swipe gestures. What matters is that the capability exists. This separation of "what" from "where" makes the spec implementable across web, mobile, desktop, and terminal interfaces.

**Theme Adaptation.** MDXG-conforming tools must inherit their appearance from the host environment. No custom colors, no configuration required. Both light and dark themes must be supported. This sounds obvious, but an enormous number of markdown viewers ship with their own color schemes that clash with the user's editor or OS theme. The spec makes "look native" a conformance requirement, not a nice-to-have.

**Code Block Rendering with Copy Buttons.** Fenced code blocks with a language identifier get syntax highlighting. Every code block gets a copy-to-clipboard button. The highlighting color scheme adapts to the host theme. These are features every developer expects but many markdown renderers still get wrong — missing the copy button, using fixed color schemes, or failing to highlight certain languages.

**Search Across All Pages.** A conforming implementation must provide text search across all virtual pages with match highlighting, match count, and next/previous navigation. For long documents — the kind AI agents frequently produce — this is essential. Without it, you're back to Ctrl+F on a single endless page.

**Preview and Source Modes.** Users can toggle between rendered HTML and editable syntax-highlighted markdown in place. No new tabs or windows. This is particularly relevant for developer tools where users need to see both the rendered output and the raw source, especially when reviewing AI-generated content that might need corrections.

**Two Conformance Levels.** The spec defines MDXG Viewer (read-only: theming, code blocks, task lists, virtual pages, navigation, search) and MDXG Editor (full: everything in Viewer plus mode toggle and document links). This tiered approach means a read-only docs site can claim conformance without implementing editing, while a full IDE extension can target the complete spec.

### Use Cases

- **Documentation platforms** — Any site rendering markdown docs (API references, guides, tutorials) can implement MDXG to provide structured navigation instead of flat scrolling. Think of how much better a 2,000-line API reference reads with virtual pages and a sidebar outline.
- **AI output viewers** — Tools that display LLM-generated content (code explanations, research reports, technical analyses) can use MDXG to make that output navigable and searchable. AI agents write long markdown; MDXG makes it readable.
- **Developer tools and IDEs** — VS Code, Cursor, and similar editors can implement MDXG for markdown preview panes. The reference VS Code extension already exists as a proof of concept.
- **CMS and content platforms** — Any system where non-technical users write or review markdown content benefits from the structured presentation MDXG defines. Blog editors, wiki systems, internal knowledge bases.
- **Terminal and CLI tools** — Because the spec is UI-agnostic, terminal-based markdown viewers can implement MDXG conformance using TUI elements — split panes for navigation, syntax-highlighted source views, keyboard-driven page jumping.

### Pros and Cons

Pros:

- Comes from Vercel Labs with real-world backing from a company that serves millions of developer deployments. This isn't a speculative RFC from someone who's never shipped markdown tooling.
- UI-agnostic design means the spec is implementable anywhere — web, mobile, desktop, terminal. It defines capabilities, not layouts, which makes it broadly applicable.
- Addresses a genuine gap. Every developer has experienced the pain of reading a massive markdown file with no navigation. MDXG is the first serious attempt to standardize the solution.
- The reference implementation (VS Code extension) provides a concrete starting point. The shared parser (`@mdxg/parser`) handles document splitting and heading extraction, so implementors don't start from zero.

Cons:

- Very early stage — Version 0.1.0 (Draft) with only 3 commits on the initial push day. The spec is still evolving, and section numbers, requirements, and conformance levels may change. Adopting it now means tracking a moving target.
- Limited ecosystem so far. Only one reference implementation (VS Code extension) and one parser library exist. For the spec to gain traction, it needs implementations in major platforms — and that hasn't happened yet.
- The spec is comprehensive but ambitious. Getting multiple markdown-rendering tools to agree on conformance levels and behavior is a coordination problem that specs alone don't solve. Execution depends on community adoption.

### Getting Started

MDXG is a specification, not a library you install and call. But there are reference implementations to explore:

```bash
# Clone the repo and read the spec
git clone https://github.com/vercel-labs/mdxg.git
cd mdxg
cat SPEC.md

# Install the VS Code extension (reference implementation)
# Search "MDXG" in VS Code Extensions marketplace

# Use the shared parser in your own project
npm install @mdxg/parser
```

The `@mdxg/parser` package handles document splitting, heading extraction, and slug generation. It's framework-agnostic — use it in React, Vue, Svelte, or plain JavaScript:

```typescript
import { parse } from '@mdxg/parser';

const doc = parse(markdownContent);
// doc.pages — array of virtual pages with headings
// doc.headings — flat list of all headings with levels and slugs
```

For implementors targeting conformance, start with the spec document and the VS Code reference implementation. The spec defines two levels: MDXG Viewer (read-only) and MDXG Editor (full). Build against the Viewer requirements first, then layer on editing capabilities.

### Alternatives

**VitePress / Docusaurus / MkDocs** — These are documentation site generators that produce static sites with navigation and search. They solve the same problem MDXG addresses, but only for their specific output format. MDXG is a spec for any markdown-rendering interface, not a build tool. Choose VitePress when you're building a docs site from scratch; choose MDXG when you want your existing markdown renderer to provide a better experience.

**Marp / Slidev** — Presentation frameworks that turn markdown into slides. They define how markdown maps to visual presentations, which is a different problem from MDXG's focus on document navigation and reading experience. Choose Marp when you need slides; choose MDXG when you need better document rendering.

**CommonMark / GFM** — These are syntax specifications that define what constitutes valid markdown. MDXG operates one layer above — it assumes the markdown is already parsed and defines what the user should be able to do with it. They're complementary, not competing. CommonMark defines the format; MDXG defines the experience.

### Verdict

MDXG is the kind of specification that makes you wonder why it didn't exist before. Markdown is the lingua franca of developer communication and AI output, yet the presentation layer has been left to individual tools to figure out — resulting in a landscape of incompatible, half-baked implementations. Vercel Labs stepping in with a formal spec backed by a reference parser and VS Code extension gives this real credibility. The spec is well-written, the design decisions are sound (UI-agnostic, tiered conformance, works on existing files with zero modifications), and the problem it solves is one every developer has felt. The risk is adoption — specs are only as good as their ecosystem, and MDXG is early. But if you're building any tool that renders markdown for developers or AI-generated content, reading this spec is worth the 20 minutes. It will change how you think about the markdown experience your product provides.
