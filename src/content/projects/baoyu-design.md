---
name: baoyu-design
description: "Run Claude Design locally as an Agent Skill — produce polished UI mockups, prototypes, and wireframes as self-contained HTML without leaving your editor."
url: https://github.com/JimLiu/baoyu-design
stars: 1041
forks: 73
language: JavaScript
tags: ["design", "ai-agents", "claude", "prototyping", "ui-design"]
featured: false
publishedAt: 2026-06-14
---

## baoyu-design

### Overview

baoyu-design is an open-source Agent Skill that packages Claude Design — the design engine behind [claude.ai/design](https://claude.ai/design) — into a portable format that runs inside your local coding agent. It hit 1,000 GitHub stars within a week of its June 7, 2026 launch, which says something about how badly developers want design capabilities baked into their existing workflows rather than locked behind a separate website.

The project was created by Jim Liu, a developer who clearly spent time reverse-engineering what makes Claude Design's output so polished and then repackaged that methodology as a skill file — plain Markdown plus a few JSX/JS scaffolds with no build step and no runtime. The result is a design system you can drop into Cursor, Claude Code, Codex, or any of 70+ file-capable agents, and get the same quality of UI mockups, interactive prototypes, wireframes, landing pages, dashboards, and slide decks that claude.ai/design produces. Everything lands as self-contained HTML in your repo.

The core insight is practical: most developers already have an AI coding agent running on their machine. Rather than switching to a separate design tool, copying code back and forth, and losing context, baoyu-design lets the agent you already use handle the design work. The deliverables are plain HTML files served on localhost, so you can point at any element in the live preview, describe what you want changed, and the agent edits the source directly. It's a tighter feedback loop than any web-based design tool offers.

### Why it matters

The design-to-code handoff has been one of the most painful parts of frontend development for years. Figma dominates the design side, but getting from a Figma file to production code still involves manual translation, lost fidelity, and endless back-and-forth between designers and developers. Tools like Figma's Dev Mode and various AI code generators have tried to bridge this gap, but they typically produce generic output that needs heavy editing.

baoyu-design takes a different approach. Instead of trying to automate the handoff between two separate tools, it collapses design and implementation into a single agent-driven workflow. You describe what you want, the agent asks clarifying questions (just like a real designer would), and it produces polished HTML that's already in your project. The design methodology baked into the skill file — sourced from Claude Design's own craft standards — covers everything from typography and spacing to interaction patterns and responsive behavior.

For fullstack developers who aren't designers but need to ship polished UIs, this is a genuine productivity multiplier. You don't need to learn Figma. You don't need to hire a designer for every feature. You describe the screen, iterate by pointing at elements, and the agent handles the craft details. The fact that it works with Claude Opus 4.8 (the strongest available model) means the output quality is actually competitive with what a skilled designer would produce for common UI patterns.

### Key Features

**Multi-Agent Compatibility.** The skill works across Cursor, Claude Code, Codex, and 70+ other file-capable agents. It detects which environment it's running in and loads the appropriate tool reference for that agent's preview, screenshot, and verification capabilities. This means you're not locked into a single tool — the same skill file produces consistent results regardless of which agent you prefer.

**Design System Support.** Beyond one-off mockups, baoyu-design can maintain a full design system — a versioned bundle of tokens, fonts, components, and UI kits. You can create a system from scratch, import one from a Figma `.fig` file (decoded fully offline, no API token needed), or reference an existing HTML/CSS codebase. Once a system is bound to a project, the agent enforces it as a visual contract: every screen uses the system's real tokens, type, and spacing. No off-system colors or styles allowed.

**Figma Import Without API Keys.** The built-in Figma importer reads `.fig` files directly on your machine using a vendored decoder — no Figma account, no API token, no MCP server required. It inventories pages, components, and variables, then either cherry-picks specific components as React code or exports the entire kit as a design system with semantic component groups, curated token CSS, real SVG/PNG assets, and a brand-guide README. This is genuinely useful for teams that have existing Figma libraries they want to use programmatically.

**Starter Components.** The skill ships pre-built scaffolds for common UI patterns: iOS, Android, macOS, and browser device frames; a pan-zoom design canvas; a slide-deck stage; a timeline animation engine; a tweaks panel; and a fillable image slot. These save the agent from hand-rolling device chrome every time and ensure consistent framing across different design outputs.

**Multiple Export Formats.** Deliverables aren't limited to HTML. The skill can export to standalone HTML, PDF, PPTX (both editable and screenshot-based), Figma, Canva, and handoff to Claude Code for further development. The PPTX export is particularly useful for engineering teams that need to present designs in meetings without sharing browser tabs.

**Visual Iteration Loop.** Because outputs are plain HTML served on localhost, you can use your agent's built-in browser preview and element-annotation tools (Cursor Browser, Claude Preview, Codex Browser) to point at specific elements and describe changes. The agent edits the underlying source directly. This point-and-edit workflow is faster than describing changes in text and much faster than the traditional design-review-revise cycle.

**Built-in Specialized Skills.** The skill includes domain-specific sub-skills for high-fidelity design, interactive prototypes, wireframes, frontend aesthetic direction, deck creation with speaker notes, mobile prototypes, animated video, sound effects, and design system management. Each sub-skill is a focused prompt that gets pulled in only when the task requires it.

### Use Cases

- **Rapid prototyping** — Describe a feature in plain language and get a working interactive prototype in minutes instead of hours. Great for validating ideas before committing engineering time.
- **Landing page design** — Marketing teams and solo developers can produce polished landing pages with hero sections, pricing cards, and CTAs without touching a design tool.
- **Dashboard UI** — Build data-heavy admin interfaces with charts, tables, and filters. The agent applies consistent spacing and typography across the entire layout.
- **Mobile app mockups** — Use device frames (iOS, Android) to produce realistic mobile screens with proper safe areas, navigation patterns, and platform-specific conventions.
- **Presentation decks** — Generate slide decks from PRDs or technical documents. Export to PPTX for team meetings or investor pitches.
- **Design system creation** — Import a Figma kit, a GitHub repo's CSS, or an existing codebase and compile it into a versioned, self-contained design system that the agent enforces across all future designs.
- **Component library exploration** — Import a UI kit's `.fig` file and browse all its components, tokens, and variants in a single interactive HTML preview.

### Pros and Cons

Pros:
- Runs entirely locally with no external API calls beyond the LLM itself. No Figma account, no cloud service, no subscription. Everything lands in your repo as version-controlled HTML.
- The design methodology is genuinely sophisticated — typography scales, spacing systems, interaction patterns, and responsive behavior are all baked into the skill's system prompt. The output quality reflects Claude Design's craft standards.
- Works across 70+ agents, not just one. The skill adapts to whatever environment it detects, so you're not locked into a specific tool.
- Figma import without API keys is a killer feature for teams with existing design libraries. The offline decoder handles `.fig` files directly.

Cons:
- Best results require Claude Opus 4.8, which is expensive. Using cheaper models produces noticeably lower quality output — the skill is a long, demanding design brief that pushes model capabilities.
- Output is self-contained HTML, not production React/Vue/Svelte components. You still need to convert designs to your framework's component model for production use.
- The skill is opinionated about design craft. If you want quick-and-dirty wireframes without attention to typography and spacing, the overhead of the full design methodology feels like overkill.
- No real-time collaboration. Unlike Figma where multiple people can edit simultaneously, this is a single-agent workflow.

### Getting Started

```bash
# Install via the skills CLI (recommended) — auto-detects your agent
npx skills add JimLiu/baoyu-design

# Or install globally for all projects
npx skills add JimLiu/baoyu-design -g

# Target a specific agent explicitly
npx skills add JimLiu/baoyu-design --agent claude-code
npx skills add JimLiu/baoyu-design --agent cursor
npx skills add JimLiu/baoyu-design --agent codex
```

Once installed, just describe a design task:

> Design 3 hi-fi variations of a settings screen for a meditation app.

The agent asks clarifying questions, builds the HTML under `designs/`, and previews it on localhost. Point at any element in the live preview and describe what you want changed — the agent edits the underlying source.

To preview manually:

```bash
python3 -m http.server 4311 --directory designs
# Open http://localhost:4311/<project>/<file>.html
```

### Alternatives

**v0 by Vercel** — A web-based AI UI generator that produces React components from text prompts. v0 is faster for quick component generation and outputs production-ready shadcn/ui code, but it's a cloud service with usage limits and doesn't support design systems, Figma import, or the visual iteration loop that baoyu-design offers. Choose v0 when you need a single component fast; choose baoyu-design when you need a full design workflow.

**Bolt.new** — An in-browser AI app builder that generates and deploys full-stack apps. Bolt is better for end-to-end app scaffolding but produces generic UI without the design craft standards that baoyu-design enforces. Choose Bolt when you need to ship an entire app; choose baoyu-design when the UI quality matters more than the backend scaffolding.

**Locofy.ai** — A Figma-to-code plugin that converts designs into React, Next.js, or HTML components. Locofy works from existing Figma files and produces framework-specific code, which is closer to production than baoyu-design's HTML output. Choose Locofy when you have a finished Figma design and need framework components; choose baoyu-design when you want to design and iterate without leaving your editor.

### Verdict

baoyu-design is the most practical bridge between AI coding agents and design work I've seen. It's not trying to replace Figma or compete with dedicated design tools — it's solving the specific problem of "I need a polished UI but I'm a developer, not a designer." The 1,000 stars in a week reflect genuine demand for this capability. The skill file approach is smart: no runtime, no dependencies, just methodology encoded as prompts that any capable model can execute. If you're already using Claude Code, Cursor, or Codex and you find yourself spending too long on UI work, install this and point it at your next feature. The output won't replace a senior designer for complex interaction design, but for the 80% of UI work that follows established patterns — dashboards, settings screens, landing pages, data tables — it's genuinely good enough to ship.
