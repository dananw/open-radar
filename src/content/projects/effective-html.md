---
name: effective-html
description: "Effective HTML is an agent skill that generates self-contained HTML architecture diagrams, plans, and visual artifacts — SVG-first, zero dependencies."
url: https://github.com/plannotator/effective-html
stars: 850
forks: 58
language: HTML
tags: ["agent-skills", "html", "architecture", "diagrams", "developer-tools"]
featured: false
publishedAt: 2026-06-15
---

## Effective HTML

### Overview

Effective HTML is an agent skill that makes your coding agent produce beautiful, self-contained HTML artifacts — architecture diagrams, system plans, and visual documents — instead of plain text walls. It hit 850 GitHub stars in under a week after its June 9 launch, which is fast even by 2026 agent-skill standards.

The project comes from backnotprop (Michael Torres), the developer behind Plannotator, an HTML annotation and rendering tool. The pedigree here is specific: Torres has been working on the intersection of HTML visualization and developer workflows for a while, and Effective HTML is the skill-based distillation of that experience. It bundles curated examples from Thariq Shihipar's `html-effectiveness` corpus — real-world reference HTML that teaches models what "good" looks like.

The core problem it solves is deceptively simple. When you ask Claude Code, Codex, or any coding agent to "explain the architecture" or "create a plan," you typically get markdown. Maybe a bullet list. Maybe ASCII art if you're lucky. Effective HTML redirects that output into full-screen, interactive HTML with SVG diagrams, clean typography, and proper visual hierarchy. The result looks like something a designer made, not something an autocomplete engine spit out.

### Why it matters

We're in the middle of a shift where AI agents are becoming primary code generators, not just assistants. But the artifacts they produce — plans, architecture docs, system diagrams — are still stuck in the markdown era. You get a wall of text, maybe with some code blocks, and then you manually convert that into something presentable. That's a workflow bottleneck hiding in plain sight.

Effective HTML addresses this by teaching agents to produce HTML as a first-class output format. This matters because HTML is universal. It renders in any browser, works offline, can be version-controlled as a single file, and doesn't require a specific tool to view. Compare that to Figma files (need an account), Lucidchart exports (need a subscription), or even Mermaid diagrams (need a renderer). A self-contained HTML file with embedded SVG just works.

The timing connects to a broader trend: agent skills are becoming the new package managers. Instead of installing npm packages that your code imports, you install skills that your coding agent uses. Effective HTML is one of the most practical examples of this pattern — it doesn't change your runtime, it changes what your agent produces. For fullstack developers who spend time documenting systems, creating technical plans, or communicating architecture to teams, this is a genuine productivity multiplier.

### Key Features

**Three Distinct Skills.** The repo ships three focused skills rather than one monolithic prompt. `html` generates general-purpose HTML artifacts matching the effective style. `html-diagram` specializes in full-screen architecture and stack diagrams with SVG-first presentation and minimal prose. `html-plan` produces structured planning documents. You install what you need — each skill is independent.

**SVG-First Visual Output.** Rather than relying on external image assets or CSS frameworks, Effective HTML uses inline SVG for all visual elements. Architecture diagrams, flow charts, and system maps are rendered as scalable vector graphics embedded directly in the HTML. This means the output is truly self-contained — one file, no dependencies, works anywhere.

**Curated Reference Corpus.** The skills bundle real-world HTML examples from the `html-effectiveness` corpus by Thariq Shihipar. These aren't synthetic examples — they're production-quality HTML artifacts that serve as few-shot references for the model. The result is output that looks curated rather than auto-generated. This is the difference between a model that knows HTML syntax and one that knows what good HTML looks like.

**Multi-Agent Compatibility.** Effective HTML works with Claude Code, OpenAI Codex, and any agent that supports the skills/plugin format. Installation is one command: `npx skills add plannotator/effective-html`. It also supports Claude Code's plugin marketplace and Codex's plugin system. No vendor lock-in at the agent level.

**Plannotator Integration.** The optional companion tool, Plannotator, lets you render and annotate the generated HTML in a browser. You can add comments, highlight sections, and collaborate on the artifacts. This turns a one-way generation process into an iterative design workflow. The annotation layer is optional — the HTML works standalone.

**Minimal Footprint.** Each skill is a single `SKILL.md` file plus a references directory. No runtime dependencies, no build step, no configuration. The total install size is measured in kilobytes, not megabytes. This is as lightweight as developer tools get.

### Use Cases

- **Architecture documentation** — Generate visual system architecture diagrams from a text description. Instead of manually drawing boxes in Draw.io, describe your system and get an HTML file with SVG diagrams, component labels, and data flow arrows.
- **Technical planning documents** — Create structured HTML plans for features, migrations, or refactors. The `html-plan` skill produces clean, hierarchical documents with visual hierarchy that stakeholders can open in any browser.
- **Onboarding materials** — Build interactive HTML guides for new team members that explain codebase structure, deployment pipelines, or API architecture with embedded diagrams rather than static screenshots.
- **Client-facing proposals** — Generate polished HTML documents for client presentations. The visual quality is high enough for professional use, and the self-contained format means no broken images or missing fonts.
- **Rapid prototyping of UI layouts** — Use the `html` skill to generate visual mockups of page layouts, dashboard designs, or component structures before committing to code.

### Pros and Cons

Pros:
- Genuinely useful output format. Self-contained HTML with SVG is the most portable document format for technical content — works in browsers, version control, email, and documentation sites.
- Zero runtime overhead. The skills are prompt files with reference examples, not libraries. No npm install bloat, no dependency conflicts, no build configuration.
- Fast adoption trajectory — 850 stars in six days suggests strong developer demand for better agent output quality. The community is actively contributing examples and improvements.

Cons:
- Agent skill quality depends on the model. Smaller or less capable models may produce HTML that looks rough compared to the reference corpus. The skills work best with frontier models like Claude Opus or GPT-5.
- No TypeScript/React integration yet. The output is vanilla HTML — if you want to embed these diagrams in a React app or Next.js project, you'll need to iframe or extract the SVG manually.
- The reference corpus is relatively small. As the project grows, more examples covering different diagram types (sequence diagrams, ER diagrams, Gantt charts) would make the skills more versatile.

### Getting Started

```bash
# Install all skills at once
npx skills add plannotator/effective-html

# Or install a specific skill
npx skills add plannotator/effective-html --skill html-diagram
npx skills add plannotator/effective-html --skill html-plan

# List available skills
npx skills add plannotator/effective-html --list
```

For Claude Code users, install via the plugin marketplace:

```
/plugin marketplace add plannotator/effective-html
/plugin install plannotator-effective-html@effective-html
```

For Codex users:

```bash
codex plugin marketplace add plannotator/effective-html
codex plugin add plannotator-effective-html@effective-html
```

Once installed, just ask your agent to create a diagram or plan:

```
Create an architecture diagram for a microservices system with an API gateway, 
three backend services, a PostgreSQL database, and a Redis cache.
```

The agent will produce a self-contained HTML file with an SVG architecture diagram you can open in any browser.

### Alternatives

**Mermaid.js** — A JavaScript diagramming tool that renders diagrams from text descriptions. Mermaid is more mature and supports more diagram types (sequence, Gantt, class diagrams), but requires a runtime renderer and produces SVG output that needs a container. Effective HTML is better when you want a complete, self-contained document rather than an embeddable diagram component.

**Excalidraw** — A collaborative whiteboard tool that's popular for architecture diagrams and system design. Excalidraw has a better interactive editing experience and real-time collaboration, but requires a browser app or VS Code extension. Effective HTML is better for automated generation — you describe what you want and get the file, no manual drawing involved.

**D2 (Terrastruct)** — A modern diagram scripting language that compiles to SVG. D2 produces higher-quality diagrams with more layout options, but requires learning a DSL and running a compiler. Effective HTML is better when you want the agent to handle the entire creation process without you touching a diagramming language.

### Verdict

Effective HTML is one of those tools that fills a gap you didn't realize was wide open. We've spent years making agents better at writing code, but their non-code outputs — diagrams, plans, documentation — have been an afterthought. This project changes that with a dead-simple approach: teach the model what good HTML looks like, then let it produce self-contained artifacts. The 850 stars in less than a week suggest I'm not the only one who thinks this is overdue. If you use coding agents daily and you're tired of converting markdown walls into presentable documents, install this skill. It won't change your runtime or your build process — it'll just make everything your agent produces look like a human designed it.
