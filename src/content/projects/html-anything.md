---
name: html-anything
description: "An agentic HTML editor that lets your local AI agent generate ship-ready HTML documents from markdown, CSV, or raw notes — zero API key, 75 skill templates, 8 coding-agent CLIs supported."
url: https://github.com/nexu-io/html-anything
stars: 5852
forks: 572
language: HTML
tags: ["ai-agents", "html-editor", "developer-tools", "content-generation", "agentic"]
featured: false
publishedAt: 2026-06-02
---

## HTML Anything

### Overview

HTML Anything hit 5,800 GitHub stars in three weeks. That kind of velocity usually signals a tool that scratches a real itch, and in this case the itch is simple: AI coding agents can write code, but nobody had built a good workflow for turning their output into polished, publishable documents. This project fills that gap.

The tool comes from the team behind Open Design (40K stars, 200+ contributors), which gives it immediate credibility. It's not a weekend side project — it's an extension of an established open-source design ecosystem. The core idea borrows from a move Anthropic's Claude Code team made internally: they stopped writing docs in Markdown and switched to HTML. The reasoning is sound. Markdown is great for writers, but HTML is what readers actually see. It handles layout, typography, and responsive design in ways Markdown simply can't.

The workflow is dead simple. You write or paste content in any format — Markdown, CSV, JSON, SQL, plain text — pick a skill template, and your local AI agent (Claude Code, Cursor, Codex, Gemini CLI, Copilot, OpenCode, Qwen Coder, or Aider) generates a single-file HTML document that's ready to ship. No API keys required, no cloud processing, no subscriptions. It reuses the CLI session you already have logged in. The marginal cost is literally zero.

### Why it matters

The "vibe coding" trend has produced plenty of tools that generate code, but the output pipeline is still stuck in 2020. Developers generate a README, a slide deck, a data report, or a landing page, and then they still have to manually convert it into something presentable. Markdown-to-HTML converters exist, but they produce ugly, unstyled output that nobody would actually publish.

HTML Anything attacks this problem from the agent angle. Instead of building a drag-and-drop editor or a template engine, it gives AI agents a structured skill system — 75 composable templates across 9 deliverable surfaces (magazine articles, keynote decks, résumés, posters, social cards, web prototypes, data reports, and Hyperframes video storyboards). The agent picks the right template based on your input and generates production-quality HTML with proper typography, grids, and color systems.

This matters for fullstack developers in particular. You're already building web applications. Having a tool that turns your specs, runbooks, and documentation into well-designed HTML — using the same coding agent you already use for development — removes a friction point most people have just accepted as inevitable. The fact that it supports 8 different agent CLIs means you're not locked into one ecosystem.

### Key Features

**Zero-API-Key Architecture.** The tool detects coding-agent CLIs installed on your PATH and reuses their existing authentication. If you've run `claude login` or `gemini auth`, HTML Anything picks up that session automatically. No separate API keys, no additional billing. This is a practical design choice that removes the biggest barrier to adoption for tools in the AI space.

**75 Composable Skill Templates.** Each skill is a `SKILL.md` file that defines constraints, typography rules, grid systems, and color palettes for a specific output type. The catalog covers magazine layouts (Kami Parchment, NYT Data), keynote decks (Swiss International, Guizang Editorial, XHS Pastel, Hermes Cyber, Replit Style), social cards (X, Xiaohongshu, Spotify, Reddit), office documents (PM specs, engineering runbooks, finance reports, OKRs, meeting notes), and video frames. Every skill ships with an `example.html` you can open from the repo to see exactly what the agent will produce.

**Sandboxed Iframe Preview.** Generated HTML renders inside `<iframe sandbox="allow-scripts allow-same-origin">`, which means Tailwind CDN, Google Fonts, and inline scripts work, but the output is isolated from the host application's cookies and localStorage. This is the right security model for rendering arbitrary HTML from an AI agent — functional enough to be useful, restrictive enough to be safe.

**SSE Streaming Render.** The agent's output streams to the browser via Server-Sent Events. You watch the HTML render line by line in the preview iframe as the agent generates it. If the output is going sideways, you can interrupt and re-prompt without waiting for a complete generation. This streaming approach makes the tool feel responsive even for complex documents.

**One-Click Multi-Platform Export.** CSS gets inlined via `juice` for WeChat paste compatibility. `modern-screenshot` renders the iframe to 2× PNG for Twitter/X and Xiaohongshu. LaTeX equations get automatic image placeholders for Zhihu. You can also download standalone `.html` or `.png` files. The export pipeline handles the specific quirks of Chinese social platforms that most Western tools ignore completely.

**Format Auto-Detection.** The editor accepts Markdown, CSV, TSV, JSON, SQL, and plain text. Tabular data parses client-side via `papaparse` and `xlsx` — nothing uploads to a server. The tool figures out what you've pasted and applies the right parsing strategy before handing it to the agent.

**8 Agent CLI Support.** Claude Code, Cursor Agent, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, OpenCode, Qwen Coder, and Aider — all detected on startup across PATH directories including `~/.local/bin`, `~/.bun/bin`, `/opt/homebrew/bin`, and `~/.npm-global/bin`. You switch between agents from a top-bar picker. This is the broadest agent CLI support I've seen in any tool.

### Use Cases

- **Technical documentation** — Engineering teams generate styled runbooks, API docs, and architecture decision records from Markdown specs. The Kami Parchment skill produces a warm editorial surface that's easier to read than plain white docs.
- **Product specs and PRDs** — Product managers paste requirements into the PM Spec skill and get a structured, branded document with sections, tables, and callouts. Better than Confluence, generated in seconds.
- **Data reports** — Analysts paste CSV or JSON data and get a formatted report with tables, charts (via the agent's HTML generation), and professional typography. The Data Report skill handles responsive layouts automatically.
- **Presentation decks** — Teams that need quick slide decks from meeting notes or project updates. 20 keynote skills cover different aesthetic directions, from corporate Swiss International to editorial magazine styles.
- **Social media content** — Marketing teams generate Xiaohongshu carousel cards, Twitter/X post images, and WeChat articles from a single source document. The platform-specific export handles format requirements that usually require manual work.
- **Web prototype mockups** — Designers and developers generate quick HTML prototypes from rough descriptions. The Prototype skills produce landing pages, dashboards, and SaaS marketing pages with real responsive behavior.

### Pros and Cons

Pros:
- The zero-API-key model is genuinely refreshing. No token counting, no surprise bills, no rate limits beyond what your existing agent subscription provides.
- 75 skill templates with real example outputs means you can evaluate quality before committing. Most AI tools make you generate before you see what you'll get.
- The streaming preview makes iteration fast. You see the document forming in real time and can course-correct early.
- Apache-2.0 license with active development (42 open issues, frequent commits) suggests the project has real momentum behind it.

Cons:
- The Chinese social platform focus (WeChat, Xiaohongshu, Zhihu) means some features are less relevant for Western developers, though the core HTML generation works universally.
- Quality depends entirely on the underlying agent. A cheaper model will produce worse HTML. The tool is a workflow wrapper, not a generator itself.
- 75 templates can feel overwhelming. There's no smart recommendation system — you browse and pick, which adds friction on first use.
- No self-hosted server mode for team use. It runs locally on each developer's machine, which limits collaborative workflows.

### Getting Started

```bash
# Clone the repository
git clone https://github.com/nexu-io/html-anything.git
cd html-anything

# Install dependencies
pnpm install

# Start the development server
pnpm -F @html-anything/next dev
```

Open http://localhost:3000 in your browser. The tool auto-detects which agent CLIs you have installed. Make sure at least one is set up:

```bash
# For Claude Code
claude login

# For Gemini CLI
gemini auth

# For OpenAI Codex
# Ensure OPENAI_API_KEY is set in your environment
```

Paste any content into the editor, pick a skill template, and press Enter. The agent generates your HTML document and streams it to the preview pane.

### Alternatives

**Slidev** — A presentation framework for developers that uses Markdown and Vue components. Slidev is better if you want fine-grained control over slide content and already think in Markdown. Choose it over HTML Anything when you need a full presentation framework with hot-reload, code highlighting, and LaTeX support — not just one-off deck generation.

**mdnice** — A Markdown-to-WeChat editor that pioneered juice-inlined CSS for Chinese social platforms. mdnice is lighter and more focused on the WeChat publishing workflow. Choose it when you specifically need WeChat article formatting without the agent layer or the broader template catalog.

**Gamma.app** — An AI-powered presentation and document tool with a polished GUI. Gamma is better for non-technical teams who want a visual editor. Choose it when your users aren't comfortable with CLI tools and agent CLIs, and you need a drag-and-drop interface with built-in AI generation.

### Verdict

HTML Anything is the kind of tool that makes you wonder why nobody built it sooner. The insight — that AI agents should output HTML, not Markdown, because HTML is what humans actually read — is obvious in hindsight but wasn't being acted on. The execution is solid: 75 well-designed templates, sandboxed previews, streaming rendering, and the broadest agent CLI support available. The 5,800 stars in three weeks reflect genuine developer interest, not marketing hype. If you're already using Claude Code, Cursor, or any of the supported agents for development, adding this to your workflow is a no-brainer for documentation, specs, and content that needs to look professional. It won't replace a real design tool for custom work, but for the 80% of document generation where you just need something that looks good and ships fast, it's the best option I've seen.
