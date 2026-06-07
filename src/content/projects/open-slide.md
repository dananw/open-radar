---
name: open-slide
description: "React slide framework built for AI coding agents — describe your deck in natural language, agents write the code, open-slide handles the canvas, scaling, and present mode."
url: https://github.com/1weiho/open-slide
stars: 4778
forks: 327
language: TypeScript
tags: ["react", "slides", "ai-agents", "presentation", "developer-tools"]
featured: false
publishedAt: 2026-06-07
---

## open-slide

### Overview

open-slide is a React-based slide framework that flips the presentation workflow on its head. Instead of clicking through a GUI to build slides, you describe what you want in natural language and your coding agent — Claude Code, Codex, Cursor, whatever you prefer — writes the React components. The framework handles the boring parts: a fixed 1920×1080 canvas, responsive scaling, keyboard navigation, hot reload, and a full presenter mode. You get polished, presentable decks without ever leaving your terminal.

Created by 1weiho and first published in late April 2026, the project has already accumulated nearly 5,000 GitHub stars in just six weeks. That kind of velocity tells you something: developers were waiting for a tool that bridges the gap between "I need slides for a meeting in 20 minutes" and "I don't want to fight PowerPoint." The repo is MIT-licensed, actively maintained, and structured as a pnpm + Turbo monorepo with clean separation between the core runtime, the CLI scaffolder, and demo apps.

The core problem open-slide solves is surprisingly common. Developers give talks, write internal documentation, create pitch decks, and prepare technical presentations constantly. Yet the standard workflow forces you into either heavyweight GUI tools (PowerPoint, Keynote, Google Slides) or Markdown-based alternatives that sacrifice visual control. open-slide gives you full React expressiveness — any component, any animation, any layout — while keeping the authoring experience fast enough that an AI agent can scaffold an entire deck from a single prompt.

### Why it matters

We're in the middle of a fundamental shift in how developers create content. The rise of coding agents means that "authoring" increasingly means "describing what you want clearly" rather than typing every line yourself. open-slide is one of the first tools designed from the ground up for this new workflow. It ships with built-in agent skills — a `/create-slide` command that asks four scoping questions (topic, page count, text density, motion vs. static), plans the structure, and writes every page. A `/slide-authoring` skill serves as the technical reference so agents understand the canvas constraints before they start generating code.

This isn't a toy demo. The framework includes a real in-browser inspector where you click elements and leave comments like "make this red" or "shrink the headline." Those comments get persisted as `@slide-comment` markers in your source files, and running `/apply-comments` lets the agent batch-apply every edit. The loop is tight: present, click to comment, apply, repeat. For teams already using AI coding tools daily, this workflow feels natural — and it's dramatically faster than manual slide editing.

### Key Features

**Agent-native authoring.** open-slide ships with preconfigured skills for Claude Code and works with any coding agent. The `/create-slide` command scaffolds an entire deck from a natural language description, handling page structure, layout, and type scale automatically. You don't need to write boilerplate or understand the framework internals to get a working presentation.

**Fixed 1920×1080 canvas.** Every slide renders into a consistent canvas with predictable scaling. This eliminates the "it looks different on every screen" problem that plagues CSS-based presentation tools. The fixed dimensions also make it trivial for agents to reason about layout — they know exactly how much space they have to work with.

**In-browser comment inspector.** Click any element during preview and attach a plain-text comment. Comments persist as source code markers, so your edits survive version control and review. This turns the presentation into a collaborative artifact rather than a black-box file.

**Professional presenter mode.** Fullscreen playback with keyboard navigation, plus a separate presenter window showing the current slide, next slide, speaker notes, and a built-in timer. This is stage-ready functionality that most code-based slide tools skip entirely.

**Export to static HTML and PDF.** One command produces a self-contained HTML site or a print-ready PDF. No server required, no runtime dependencies, no vendor lock-in. Deploy to Vercel, Cloudflare Pages, Netlify, or any static host.

**Assets manager with svgl integration.** A built-in panel for managing images, videos, and fonts per deck. The integrated svgl logo catalogue lets you search and drop in any brand SVG without leaving the tool. Small detail, but it eliminates one of the most tedious parts of building professional presentations.

**Slide manager with folder organization.** Once you've built more than a handful of decks, finding them becomes a problem. The slide manager lets you organize presentations into folders with custom emoji and drag-and-drop reordering.

### Use Cases

- **Conference talks and tech demos** — Developers who need to build slide decks for meetups, conferences, or internal tech talks can go from idea to polished presentation in minutes using a coding agent. The fixed canvas and React component model make it easy to embed code snippets, diagrams, and interactive elements.

- **Internal team presentations** — Engineering leads preparing sprint reviews, architecture proposals, or onboarding materials can describe what they need and get a professional deck without spending an hour in Google Slides. The comment inspector makes iterative feedback from teammates frictionless.

- **AI-generated content pipelines** — Teams building automated documentation or content generation workflows can integrate open-slide as the presentation layer. Feed it structured data, let an agent generate the slides, export to static HTML, and deploy.

- **Rapid prototyping for pitches** — Startup founders or product managers who need quick pitch decks can describe the narrative arc and let the agent handle visual execution. The svgl integration means brand assets are one search away.

- **Teaching and workshop materials** — Educators creating technical workshops can build interactive, visually rich slide decks that include live code examples, without fighting a presentation tool's code formatting limitations.

### Pros and Cons

Pros:
- The agent-native workflow is genuinely fast. Going from a text prompt to a polished 15-slide deck takes minutes, not hours. For developers who give talks regularly, this is a massive productivity gain.
- React components give you unlimited visual expressiveness. Unlike Markdown-based slide tools, you're not constrained to a fixed set of layouts — any React component is a valid slide.
- The MIT license and static export mean zero lock-in. Your decks are plain React code that builds to static files. No proprietary format, no cloud dependency.

Cons:
- Requires comfort with React and a coding agent workflow. If you don't use Claude Code, Codex, or Cursor regularly, the setup overhead might not be worth it for a one-off presentation.
- The 1920×1080 fixed canvas, while great for consistency, can feel constraining for non-standard formats like vertical mobile slides or ultra-wide displays.
- The project is barely six weeks old. While growing fast, it hasn't yet accumulated the ecosystem of templates, themes, and community plugins that mature tools like Slidev or reveal.js offer.

### Getting Started

```bash
# Scaffold a new slide workspace
npx @open-slide/cli init my-slide

# Navigate into the project
cd my-slide

# Start the dev server
pnpm dev
```

The scaffolder generates a minimal workspace with Vite, React, and TypeScript preconfigured. If you're using Claude Code, the agent skills are ready to go — just describe your deck and let the agent write the slides. Otherwise, edit `slides/<id>/index.tsx` directly. Each slide is a standard React component rendered onto the fixed canvas.

```bash
# Export to static HTML
pnpm build

# Or export to PDF
pnpm export:pdf
```

Deploy the output to any static host. The build artifacts are plain HTML/CSS/JS with no runtime dependencies.

### Alternatives

**Slidev** — A Markdown-based slide framework that uses Vue and Vite under the hood. Slidev is more mature with a larger ecosystem of themes and plugins, and it's a better fit if you prefer writing slides in Markdown rather than React components. Choose Slidev when you want a simpler authoring format and don't need the agent-native workflow.

**reveal.js** — The classic HTML-based presentation framework. reveal.js has been around for over a decade and supports a huge range of plugins and integrations. It's more flexible in terms of output formats and has better support for mathematical notation and complex transitions. Choose reveal.js when you need battle-tested stability and a deep plugin ecosystem.

**Sli.dev (Slidev's successor concepts)** — Various AI-enhanced presentation tools are emerging, but most focus on generating slides from prompts without giving you the underlying code. open-slide's approach of generating actual React components you can edit, version, and extend is more aligned with how developers already work.

### Verdict

open-slide is the most interesting presentation tool I've seen in years, precisely because it doesn't try to be a presentation tool — it tries to be a presentation runtime for coding agents. The insight is sharp: agents are great at writing code, slides are visual code, so build a framework that lets agents write slides. The in-browser comment inspector is clever, the fixed canvas eliminates a whole class of layout bugs, and the static export means your decks are never trapped in a proprietary format. At six weeks old with 4,700+ stars, the project has real momentum. If you're already using a coding agent for your daily work and you give even occasional presentations, open-slide is worth trying today. The learning curve is essentially zero if you know React, and the time savings over manual slide creation are significant.
