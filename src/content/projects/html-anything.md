---
name: html-anything
description: "The agentic HTML editor that turns any input into ship-ready HTML using your local AI agent — 75 skill templates, 8 coding-agent CLIs, zero API key."
url: https://github.com/nexu-io/html-anything
stars: 6191
forks: 605
language: TypeScript
tags: ["ai-agents", "html", "nextjs", "agentic-coding", "design", "open-source"]
featured: false
publishedAt: 2026-06-06
---

## HTML Anything

### Overview

HTML Anything hit 6,191 GitHub stars in under a month. That kind of velocity usually means a tool hit a nerve, and this one did — it solves the gap between "AI wrote my content" and "someone can actually read it." The project is an agentic HTML editor: you feed it Markdown, CSV, JSON, or raw notes, your local AI agent transforms the input into a polished, single-file HTML artifact, and you ship it. No API key needed. No design skills required.

The team behind it is nexu-io, the same group that built Open Design (40k stars, 200+ contributors). That pedigree matters. Open Design established the agent-detection layer and the `SKILL.md` protocol that HTML Anything uses directly. This isn't a weekend side project — it's a focused extraction from a mature codebase, built on infrastructure that's already been battle-tested at scale.

The core problem it addresses: in the agentic coding era, developers don't write docs, decks, or reports by hand anymore. They tell an agent to do it. But agents default to Markdown, which looks terrible when screenshotted into a tweet, can't paste cleanly into WeChat, and reads like a wall of unformatted text on mobile. HTML is the final form for human readers — and HTML Anything makes the jump from "agent output" to "ship-ready artifact" automatic.

### Why it matters

This is the most interesting take on "AI-generated content" I've seen in 2026. Most tools in this space focus on generating text — chatbots, copywriters, summarizers. HTML Anything focuses on the format problem. The Anthropic Claude Code team publicly stated they stopped writing internal docs in Markdown and switched to HTML. Their argument is simple: Markdown is good for the writer, HTML is good for the reader. HTML Anything takes that philosophy and makes it accessible to every developer with a coding agent CLI installed.

For fullstack developers specifically, this fills a real gap. You're building React dashboards, writing NestJS API docs, creating product specs, preparing investor decks — and you're doing it with AI agents. The output those agents produce needs to look professional without you hand-editing CSS. HTML Anything's 75 skill templates cover web prototypes, keynote decks, résumés, posters, social cards, data reports, and even Hyperframes video storyboards. Each template enforces hard design constraints (8px baseline grid, contrast ratio ≥ 4.5, CJK-first font stacks) that prevent the AI from producing visual slop.

The zero-API-key model is also significant. It reuses the session you already have logged in through Claude Code, Cursor, Codex, Gemini CLI, GitHub Copilot CLI, OpenCode, Qwen Coder, or Aider. Your existing subscription does the work. Marginal cost: $0.

### Key Features

**8 Coding-Agent CLIs Auto-Detected.** On startup, HTML Anything scans your PATH — including directories that GUI-launched Node processes normally miss, like `~/.local/bin`, `~/.bun/bin`, and `/opt/homebrew/bin` — and surfaces every recognized CLI. You pick your agent from the top bar. Each CLI has a thin adapter that handles argv construction, stdin protocol, and stream parsing. Switching between Claude Code and Codex takes one click.

**75 Composable Skill Templates.** The skill library spans 9 surface modes: magazine articles, keynote decks, résumés, posters, Xiaohongshu cards, tweet cards, web prototypes, data reports, and Hyperframes video frames. Each skill is a folder containing a `SKILL.md` with hard constraints, an `example.html` you can open directly, and optional assets. Adding a new skill means dropping a folder and restarting the dev server.

**SSE Streaming Render.** When you press ⌘+Enter, the agent's stdout is parsed line-by-line for text deltas, re-emitted as Server-Sent Events, and appended to an iframe's `srcdoc` in real time. You watch the HTML render as the agent writes it. Don't like where it's going? Interrupt mid-generation — no wasted compute. The experience feels like watching someone type in a terminal, except the output is a designed web page.

**One-Click Export to 5 Targets.** WeChat MP (CSS inlined via `juice`, zero re-formatting needed), X/Weibo/Xiaohongshu (rendered to 2× PNG via `modern-screenshot` and copied to clipboard), Zhihu (LaTeX image placeholders for math), standalone `.html` download, and high-DPI `.png` download. The export pipeline was built by studying `mdnice/markdown-nice` and `gcui-art/markdown-to-image` — real production tools with years of edge-case handling.

**Sandboxed Iframe Preview.** All generated HTML renders inside `<iframe sandbox="allow-scripts allow-same-origin">`. Third-party resources like Tailwind CDN and Google Fonts work, but cookies and localStorage stay isolated from the host page. Opening DevTools shows only the iframe's DOM. You get the debugging experience of a standalone HTML file without the security risk.

**Format Auto-Detect.** The editor accepts Markdown, CSV, TSV, JSON, SQL, and plain text. Tabular data is parsed client-side using `papaparse` and `xlsx` — nothing gets uploaded. Paste a CSV and the agent generates a data report. Paste SQL schema and it generates documentation. The input format doesn't constrain the output.

**Hard Anti-Slop Constraints.** Every `SKILL.md` enforces a design discipline borrowed from `alchaincyf/huashu-design`: CJK-first font stacks, 8px baseline grid, no pure black or pure white, rounded corners with soft shadows, and color contrast ≥ 4.5. The agent must use your real data — no lorem ipsum allowed. These constraints live in the prompt, not in post-processing, so the output looks intentionally designed rather than generically "AI."

### Use Cases

- **SaaS landing pages and prototypes** — Paste your product description, pick the `saas-landing` skill, and get a hero/features/pricing/CTA page in seconds. Great for validating ideas before writing real code.

- **Investor pitch decks** — The `deck-pitch` skill generates a structured presentation with real data visualization. Swiss International and Guizang Editorial design systems make it look like a designer touched it.

- **Technical documentation** — The `docs-page` skill produces a 3-column docs layout. Feed it your API spec or README and get something you can actually ship.

- **Social media content** — Generate X post cards, Xiaohongshu carousels, or Reddit thread cards from any content. One-click copy to clipboard, paste directly into the composer.

- **Data reports from CSV/Excel** — Upload a spreadsheet, pick `data-report`, and get a visual report with charts and tables. Useful for weekly team updates or exec summaries.

- **Résumés and professional documents** — The `resume-modern` skill generates an A4-formatted résumé from your notes. The `invoice`, `hr-onboarding`, and `finance-report` skills cover other business document needs.

### Pros and Cons

Pros:
- **Zero marginal cost.** Reuses your existing agent subscription. No separate API key, no per-generation billing. The economics are hard to beat.
- **Genuinely useful skill library.** 75 templates across 9 surface modes is enough to cover most document and presentation needs. The design quality is noticeably better than raw AI output.
- **Ship-ready output.** The hard constraints in `SKILL.md` mean you don't need a second pass. The HTML is the artifact, not a draft.
- **Local-first architecture.** Your agent runs on your machine. Content doesn't leave your network unless you export it. Privacy by default.
- **Active development.** The repo was created May 11, 2026, and already has 6,191 stars. The parent project (Open Design) has 40k stars and 200+ contributors. Community momentum is real.

Cons:
- **Requires a local coding-agent CLI.** If you don't have Claude Code, Cursor, Codex, or one of the other 8 CLIs installed and authenticated, this tool doesn't work. It's not a standalone editor.
- **Next.js 16 dependency.** The frontend is built on Next.js 16 with Turbopack and React 19. This is bleeding-edge tooling that may have stability issues on some setups.
- **Templates are opinionated.** The design constraints (8px grid, CJK-first fonts, no pure black) are baked in. If you want a different aesthetic, you're modifying `SKILL.md` files, not tweaking settings.
- **Export targets are WeChat/Zhihu-centric.** The one-click export pipeline is optimized for Chinese social platforms. Notion, Linear, and Telegraph exports are on the roadmap but not shipped yet.

### Getting Started

```bash
# Clone and install
git clone https://github.com/nexu-io/html-anything
cd html-anything
pnpm install

# Start the dev server
pnpm -F @html-anything/next dev
# → http://localhost:3000
```

Open the browser. The top bar auto-detects whichever coding-agent CLI you have signed in. Pick a template from the skill picker, paste your content, press ⌘+Enter.

```bash
# Run tests
pnpm -F @html-anything/next test

# Type check
pnpm -F @html-anything/next typecheck

# Build for production
pnpm -F @html-anything/next build
```

No API key configuration needed. If you've already run `claude login`, `cursor login`, or `gemini auth` in your terminal, HTML Anything reuses that session automatically.

### Alternatives

**Open Design (nexu-io/open-design)** — The parent project at 40k stars. HTML Anything is a focused extraction of Open Design's HTML generation capabilities. If you want the full platform with design system management, shared assets, and broader surface coverage, start with Open Design. If you just want the HTML editor workflow, HTML Anything is lighter and faster to set up.

**Markdown Nice (mdnice/markdown-nice)** — A Markdown-to-WeChat editor that HTML Anything credits as a key influence. Markdown Nice focuses specifically on WeChat/Zhihu compatibility and does that one thing well. HTML Anything adds agent integration, 75 templates, streaming render, and multi-platform export on top of similar CSS-inlining techniques. Choose Markdown Nice if WeChat is your only target and you don't need AI generation.

**Vercel v0** — An AI-powered UI generator that produces React/Next.js components from text prompts. v0 generates code you integrate into your project; HTML Anything generates self-contained HTML artifacts you ship directly. Different output, different workflow. v0 is better for building component libraries; HTML Anything is better for producing standalone documents, decks, and social content.

### Verdict

HTML Anything is the tool I'd show someone who says "AI agents just produce Markdown walls nobody reads." The insight — that the bottleneck has shifted from content generation to content formatting — is sharp, and the execution backs it up. 6,191 stars in under a month isn't hype; it's developers recognizing a real gap in their workflow. The 75-skill library with enforced design constraints is the differentiator. Most AI HTML generators produce generic output that screams "machine made this." HTML Anything's templates have actual design taste — the Swiss International deck, the Guizang Editorial system, the Kami parchment documents. If you're a fullstack developer running Claude Code or Cursor daily and you need to produce anything beyond code — docs, decks, reports, social cards — install this. It's the missing link between "the agent wrote it" and "someone can actually read it."
