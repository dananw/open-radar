---
name: baoyu-design
description: "Run Claude Design locally as an Agent Skill — produce polished UI mockups, prototypes, and wireframes as self-contained HTML from Cursor, Claude Code, or Codex."
url: https://github.com/JimLiu/baoyu-design
stars: 441
forks: 31
language: JavaScript
tags: ["ai-design", "agent-skill", "claude-code", "prototyping", "ui-design"]
featured: false
publishedAt: 2026-06-08
---

## baoyu-design

### Overview

baoyu-design is a set of agent skill files that turns your local coding agent — Cursor, Claude Code, Codex, or any file-capable AI harness — into a full design studio. It packages the design methodology behind Claude's web-based design tool (claude.ai/design) as portable Markdown prompts and JSX scaffolds, so you can generate polished UI mockups, interactive prototypes, wireframes, landing pages, dashboards, and slide decks without ever leaving your editor.

The project launched on June 7, 2026, and hit 441 GitHub stars within its first day. That velocity says something about developer appetite for AI-powered design tools that don't require a separate subscription or a context-switch to a web app. The creator, JimLiu, built it as a practical bridge between the design capabilities of frontier models and the local development workflow most frontend developers already inhabit.

The core idea is simple but effective: instead of opening claude.ai/design, copying prompts back and forth, and downloading HTML files, you just ask your agent to design something. The skill files guide the model through a structured design process — clarifying questions, gathering context, producing HTML deliverables, then previewing and iterating. Everything lands in your repo as versionable, self-contained HTML files. No cloud dependency, no upload step, no separate tool to learn.

### Why it matters

Frontend developers spend a surprising amount of time on design-adjacent work: mocking up UI concepts for stakeholder reviews, building quick prototypes to test interaction ideas, creating wireframes for new features, or producing presentation decks for sprint demos. Most of this work either happens in Figma (requiring design tool proficiency) or gets skipped entirely because it's too much friction to set up.

baoyu-design collapses that friction to zero. If you already have Claude Code, Cursor, or Codex running in your terminal, you have a design tool. The 24 built-in skills cover everything from high-fidelity mockups to animated prototypes to export formats like PPTX and PDF. The output is real HTML you can open in a browser, commit to Git, and hand off to engineers — not a proprietary format locked inside a design tool.

This connects to a broader trend in 2026: AI agents are getting good enough at structured creative work that dedicated single-purpose tools face real competition. When a coding agent can produce a pixel-perfect landing page from a text description, the value proposition of standalone design tools shifts. baoyu-design doesn't replace Figma for collaborative design systems, but for the 80% of design work that's "good enough, fast" — it's a compelling alternative.

### Key Features

**24 Built-In Design Skills.** The skill system covers core design (hi-fi mockups, interactive prototypes, wireframes), decks with speaker notes, mobile prototypes, animated videos, design system creation, and multiple export formats including standalone HTML, PDF, PPTX, and Figma/Canva handoff. Each skill is a specialized prompt that guides the model through a specific design workflow.

**Harness-Agnostic Architecture.** The skill detects whether it's running in Cursor, Claude Code, Codex Agent, or a generic file-capable harness and loads the appropriate reference doc. The core methodology lives in `system-prompt.md` while tool-specific instructions are in separate files under `references/`. This means the same skill works across different editors without modification.

**Starter Component Library.** Ships with pre-built scaffolds for common UI patterns: iOS, Android, macOS, and browser device frames; a pan-zoom design canvas; a slide-deck stage; a timeline animation engine; a tweaks panel for live parameter adjustment; and fillable image slots. These save the agent from generating boilerplate from scratch and produce more consistent output.

**Visual Iteration Loop.** Because the deliverable is plain HTML served on localhost, you can use your agent's built-in browser preview and element-annotation tools (Cursor Browser, Claude Preview, Codex Browser) to point at elements and request changes visually. This creates a tight edit-preview cycle that's faster than describing changes in text.

**Zero Runtime Dependencies.** The entire skill is Markdown files plus a few JSX/JS scaffolds. No build step, no npm install, no configuration. Drop the `skills/baoyu-design/` folder into your project and the agent finds it automatically. The simplicity is a feature — there's nothing to break, nothing to update, nothing to configure.

**Model-Aware Quality Scaling.** The skill is designed as a long, detailed design brief that benefits from stronger models. It's optimized for Claude Opus 4.8 but works well with other capable models. The structured prompt approach means even mid-tier models produce usable output — the quality degrades gracefully rather than failing completely.

**Export Pipeline.** Beyond HTML, the skill can generate PDF exports, editable PPTX files (for presentations), screenshot-based PPTX (for archival), and handoff files for Claude Code integration. The Gemini image generation skill adds AI-generated imagery to designs. This makes the output useful in professional workflows where HTML alone isn't enough.

### Use Cases

- **Rapid prototyping** — Frontend developers who need to quickly mock up a new feature or page for stakeholder review without opening Figma or writing boilerplate HTML/CSS from scratch.
- **Landing page creation** — Marketing teams or indie developers who need polished landing pages fast. Describe the product, get a self-contained HTML file ready to deploy.
- **Sprint demo decks** — Engineering teams that need presentation decks for sprint reviews or architecture proposals. The deck skill produces speaker notes alongside slides.
- **Design system exploration** — Teams evaluating new visual directions. Generate multiple aesthetic directions as HTML prototypes and compare them side by side in the browser.
- **Mobile app prototyping** — Product managers and developers who need to visualize mobile app concepts with device frames and interactive elements before committing to native development.

### Pros and Cons

Pros:
- Eliminates the context switch between coding and design. If you're already using Claude Code or Cursor, you have a design tool with zero additional setup.
- Output is real, versionable HTML — not a proprietary format. You can commit designs to Git, diff them, and integrate them into your existing frontend build pipeline.
- The harness-agnostic approach means you're not locked into a single AI provider or editor. Switch from Cursor to Claude Code and the same skill works.
- 441 stars in the first 24 hours suggests strong community validation. The skill-based architecture makes it easy to extend and customize.

Cons:
- Best results require Claude Opus 4.8, which is the most expensive tier. Weaker models produce usable but noticeably lower-quality output, especially for complex multi-page designs.
- No collaborative editing features. This is a local, single-developer tool. If your workflow depends on real-time multiplayer design (like Figma), this doesn't replace that.
- The skill files are essentially long prompts — updating them for new model capabilities or fixing output quality issues requires prompt engineering knowledge, not traditional code contributions.

### Getting Started

```bash
# Clone the skill into your project
git clone https://github.com/JimLiu/baoyu-design.git
cp -r baoyu-design/skills/baoyu-design ./skills/

# Or install via the skill registry (if your agent supports it)
# Then just ask your agent:
# "Design a modern SaaS dashboard with dark mode, user analytics, and a sidebar navigation"
```

The skill auto-detects your agent environment. In Cursor, it uses the browser preview for visual iteration. In Claude Code, it uses the built-in preview. In Codex, it uses the Codex browser. No configuration needed.

For best results, use Claude Opus 4.8 and provide detailed prompts including target audience, brand guidelines, and specific UI requirements. The more context you give, the better the output.

### Alternatives

**v0 by Vercel** — A web-based AI design tool that generates React/Next.js components from text prompts. v0 produces production-ready component code rather than HTML mockups, which is better for direct integration into React projects. However, it requires a Vercel account, is limited to React output, and doesn't support the breadth of design artifacts (decks, PDFs, animations) that baoyu-design covers. Choose v0 when you need React components specifically.

**Claude.ai/design** — The original web-based design tool that baoyu-design reverse-engineers. It offers a polished UI with live preview and direct Claude integration. The tradeoff is that it's a separate web app requiring context switching, output lives on Anthropic's servers, and you can't version the designs in Git. Choose it when you want the most polished single-session design experience and don't need local-first workflows.

**Lovable / Bolt.new** — Full-stack app generators that produce deployable applications from text descriptions. These go further than baoyu-design by generating backend code, database schemas, and deployment configs. But they're heavier, produce more complex output that needs maintenance, and are less suited for quick design exploration. Choose them when you need a working app, not a design artifact.

### Verdict

baoyu-design is the kind of tool that makes you rethink where design work happens. It won't replace Figma for collaborative design systems or replace dedicated designers for brand-critical work. But for the vast majority of design tasks frontend developers actually face — quick mockups, prototype exploration, stakeholder presentations, landing pages — it's absurdly effective for something that's essentially a folder of Markdown files. The 441 stars in 24 hours reflect genuine developer excitement, not marketing hype. If you're already using Claude Code or Cursor and you find yourself wishing you could sketch UI ideas without leaving your terminal, this is worth installing today. The zero-dependency, local-first approach means there's almost no downside to trying it.
