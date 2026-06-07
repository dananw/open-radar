---
name: kami
description: "Kami is a design constraint system for AI-generated documents — 9 professional templates for slides, resumes, landing pages, and reports with warm editorial typography."
url: https://github.com/tw93/Kami
stars: 7332
forks: 343
language: HTML
tags: ["design-system", "ai-agents", "pdf", "documents", "templates"]
featured: false
publishedAt: 2026-06-07
---

## Kami

### Overview

Kami (紙, かみ) means "paper" in Japanese. It's a design constraint system that gives AI agents a strict visual language for producing professional documents — slides, resumes, equity reports, landing pages, letters, portfolios, changelogs, and long-form docs. Since its April 2026 launch, it has pulled in over 7,300 GitHub stars, which is remarkable for what's essentially a set of rules and templates rather than a traditional software tool.

The creator is tw93, a well-known Chinese developer with a track record of building polished, opinionated tools. His previous projects include Pake (a Rust-based tool for packaging web apps into desktop apps, 26K+ stars), MiaoYan (a Markdown note-taking app for macOS), and a string of other developer utilities that all share the same DNA: minimal, beautiful, and ruthlessly focused on one problem. Kami is part of a trilogy — Kaku (書く) writes code, Waza (技) drills habits, and Kami (紙) delivers documents.

The core problem Kami solves is deceptively simple: AI can generate content faster than any human, but the output looks terrible. Every ChatGPT or Claude session produces the same generic gray documents with inconsistent spacing, random font choices, and layouts that nobody would willingly print. Kami provides a constraint language that's strict enough to guarantee professional output but flexible enough that agents can run it reliably without human intervention. It's not a UI framework — it's a design system for printed matter.

### Why it matters

The AI agent ecosystem has a presentation gap. Tools like Claude Code, Cursor, and various coding agents can build entire applications, write research reports, and generate slide decks — but the visual quality of their output is consistently mediocre. Developers spend more time reformatting AI-generated documents than they saved by using AI in the first place. Kami addresses this by giving agents a well-defined design vocabulary they can execute autonomously.

This connects to a broader shift in how developers think about AI tooling. The first wave was about capability — can the AI do the task? The second wave, which we're entering now, is about quality and trust. Can the AI produce something I'd actually put my name on? Kami represents that second wave for document generation. It's the kind of infrastructure that makes AI agents genuinely useful in professional workflows, not just impressive demos.

For fullstack developers specifically, Kami fills a practical niche. You need to generate client proposals, technical documentation, investor one-pagers, and presentation decks constantly. Having a design system that any AI agent can use — and that produces output with consistent warm parchment tones, ink-blue accents, and editorial serif typography — saves real hours every week.

### Key Features

**Nine Professional Templates.** The template set covers the documents developers actually produce: One-Pager, Long Doc, Letter, Portfolio, Resume, Slides, Equity Report, Changelog, and Landing Page. Each template has specific rules for layout, spacing, and typography. Slides ship in three rendering paths — WeasyPrint HTML-to-PDF (default), python-pptx for editable PowerPoint files, and Marp for Markdown-first decks.

**Multilingual First-Class Support.** English and Chinese are fully supported with dedicated serif fonts (Charter for English, TsangerJinKai02 for Chinese). Japanese and Korean work via best-effort CJK paths with visual QA before delivery. The system auto-detects your language and picks the right font stack, so a Korean resume and an English equity report both look intentional.

**Brand Profile System.** Create a persistent `~/.config/kami/brand.md` file with your name, role, email, brand color, tone, and writing habits. Kami treats it as the lowest-resolution context — applied when the current request is ambiguous, always overridable by what the specific document needs. This means your output feels familiar across sessions without every document looking identical.

**Agent-Native Installation.** Kami installs as a skill for Claude Code, Claude Desktop, Codex, OpenCode, and any agent that reads from `~/.agents/`. One command: `npx skills add tw93/kami -a claude-code -g -y`. No configuration needed — the skill auto-triggers from natural language requests. Say "build me a resume" or "make a one-pager for my startup" and Kami handles the rest.

**Inline SVG Diagrams.** Fourteen diagram types are built in — concept diagrams, architecture overviews, tradeoff matrices, and more. The design system specifies how diagrams should look (warm palette, single-line geometric icons, ink-blue accents), and the renderer draws them. No external charting library needed.

**Landing Page Generation.** The landing-page template produces deployable pages with proper SEO metadata. Five example companions ship alongside: vercel config, sitemap, robots.txt, llms.txt, and llms-full.txt for multilingual deployment. The output is production-ready HTML, not a mockup.

**Travel System for Drawing Tools.** The same constraint system works as a brief you can hand to any drawing or rendering tool. Point ChatGPT Images, DALL-E, or any illustration agent at the references folder and the output inherits the warm parchment palette, ink-blue restraint, and editorial typography. It's a design system that travels across tools.

### Use Cases

- **Startup one-pagers and pitch decks** — Generate investor-ready documents in minutes instead of hours. The One-Pager and Slides templates produce output that looks like it came from a professional designer, not a language model.
- **Technical documentation and research reports** — Turn Claude-generated research into polished Long Docs with proper typography, inline diagrams, and consistent formatting across hundreds of pages.
- **Developer portfolios and resumes** — Build a Portfolio or Resume that actually stands out. The warm parchment canvas and serif hierarchy give it an editorial quality that most developer portfolios lack.
- **Client proposals and formal letters** — The Letter template handles formal correspondence with proper spacing, salutations, and formatting. Useful for freelancers and agencies who send proposals regularly.
- **Product changelogs and equity reports** — The Changelog and Equity Report templates are designed for recurring document types that need consistent formatting across many iterations.

### Pros and Cons

Pros:
- The constraint-based approach is genuinely novel — instead of giving agents a UI to manipulate, you give them rules to follow. This makes output predictable and repeatable across sessions.
- The design quality is exceptional. The warm parchment (#f5f4ed), ink-blue accent (#1B365D), and serif typography create documents that look like they came from a boutique design studio.
- Agent-native installation means zero friction. One command and your AI tooling produces professional documents immediately.
- The brand profile system solves the "every document looks different" problem without being heavy-handed about it.

Cons:
- WeasyPrint dependency for PDF generation can be finicky to install, especially on Windows. The Python-based rendering pipeline adds complexity to what's otherwise a lightweight system.
- CJK font handling for Japanese and Korean is best-effort, not first-class. The Chinese font (TsangerJinKai02) requires a commercial license for business use, which adds cost for teams.
- The design system is opinionated by design — warm parchment and ink blue is a specific aesthetic. If your brand uses cool tones or modern sans-serif typography, you'll need to fork and customize.
- Limited to nine template types. If you need invoices, contracts, or other document formats, you're building on top of the constraint system rather than using it directly.

### Getting Started

```bash
# Install for Claude Code
npx skills add tw93/kami -a claude-code -g -y

# Or for Claude Desktop — download the ZIP
# https://github.com/tw93/kami/releases/latest/download/kami.zip

# Or for generic agents (Codex, OpenCode, Pi)
npx skills add tw93/kami -a '*' -g -y

# Optional: set up your brand profile
mkdir -p ~/.config/kami
# Create brand.md with your name, role, brand color, etc.
# See references/brand.example.md for the full template
```

After installation, just ask your agent naturally:

- "Make a one-pager for my startup"
- "Turn this research into a long doc"
- "Build me a resume"
- "Design a slide deck for my talk"
- "Make a landing page for my app"

Kami auto-triggers and handles the design constraints. No slash commands, no configuration.

### Alternatives

**Marp** — A Markdown-based slide deck framework that converts Markdown to HTML, PDF, and PowerPoint. Marp is more established and has a larger ecosystem of themes, but it only handles slides, not the full range of documents Kami covers. Choose Marp if you only need presentation decks and want a Markdown-first workflow with VS Code integration.

**Typst** — A modern typesetting system positioned as a LaTeX replacement with a cleaner syntax. Typst is more powerful for complex academic documents and has a proper programming language for layout logic. Choose Typst if you need fine-grained control over page layout, mathematical typesetting, or multi-hundred-page publications. Kami is the better fit when you want AI agents to produce good-looking documents without learning a typesetting language.

**Reveal.js** — The dominant HTML presentation framework with extensive plugins and transitions. Reveal.js is more mature for interactive web presentations but doesn't address the broader document problem — no resumes, no reports, no landing pages. Choose Reveal.js if your presentation needs interactivity, embedded media, or complex animations that Kami's constraint system doesn't support.

### Verdict

Kami is the most interesting design-for-AI project I've seen in 2026. The insight is sharp: AI agents don't need more capability, they need better constraints. By providing a strict but simple design vocabulary, Kami makes AI-generated documents look professional without human post-processing. The 7,300 stars in under two months reflect genuine developer enthusiasm — people are tired of reformatting AI output.

It's not for everyone. If you need complex page layouts, mathematical typesetting, or interactive presentations, there are better tools. But if you're a developer who regularly produces reports, proposals, resumes, or slide decks using AI agents, Kami is a one-command install that immediately upgrades the quality of your output. The warm parchment aesthetic won't suit every brand, but it's a deliberate choice that works. tw93 has a track record of building tools that feel finished, and Kami continues that pattern.
