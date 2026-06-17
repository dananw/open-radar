---
name: open-codesign
description: "Open CoDesign is an open-source desktop app that turns prompts into prototypes, slide decks, and PDFs — a local-first alternative to Claude Design, v0, and Lovable."
url: https://github.com/OpenCoworkAI/open-codesign
stars: 6860
forks: 723
language: TypeScript
tags: ["design-tools", "ai", "prototyping", "electron", "local-first"]
featured: false
publishedAt: 2026-06-17
---

## Open CoDesign

### Overview

Open CoDesign is an MIT-licensed desktop app that turns text prompts into polished prototypes, slide decks, landing pages, and marketing assets. It hit 6,800 GitHub stars within two months of its April 2026 launch, which tracks — developers have been waiting for a local-first alternative to the wave of cloud-locked AI design tools that dominated late 2025.

The project comes from OpenCoworkAI, a team that previously released Open Cowork, an open-source AI agent desktop app. That prior work shows in the architecture: Open CoDesign is built on Electron + React 19 + Vite 6 + Tailwind v4, with a sophisticated agent loop powered by `@mariozechner/pi-ai` and `pi-coding-agent` primitives. It's not a thin wrapper around an API — it's a real desktop application with local file management, session history, and a permissioned agent system.

The core problem it solves: tools like Claude Design, v0 by Vercel, Lovable, and Bolt.new are useful but they lock you into a single model provider, run entirely in the cloud, and charge subscription fees on top of your API costs. Open CoDesign flips that model. You bring your own key (or use a local Ollama instance), the app runs on your machine, and you export real files — HTML, PDF, PPTX, ZIP, Markdown — without anything touching a third-party server unless your chosen model route requires it.

### Why it matters

The AI design tool space exploded in 2025. Vercel's v0, Lovable, and Bolt.new proved that prompt-to-prototype workflows save real development time, especially for early-stage UI work, client presentations, and quick iteration. But every one of those tools is cloud-only, subscription-based, and tied to specific model providers. For teams that care about data privacy, cost control, or model flexibility, that's a non-starter.

Open CoDesign fills that gap with a desktop-native approach that respects the developer workflow. You already have API keys for Claude, GPT, or Gemini. You already run Ollama locally for some tasks. Why pay another subscription just to generate a landing page mockup? The app imports your existing Claude Code or Codex provider configs in one click, or you sign in with your ChatGPT subscription for Codex models. Setup takes under 90 seconds.

The timing connects to a broader shift in how developers think about tooling. The "bring your own key" model is becoming standard — Cursor, Continue, and now Open CoDesign all accept that developers want to choose their models, not be locked into someone else's infrastructure. Combined with local-first data storage (designs live in `~/.config/open-codesign/`, nothing leaves your machine by default), this represents the direction serious developer tools are heading.

### Key Features

**Multi-Model BYOK Architecture.** Open CoDesign supports over 20 model providers — Anthropic, OpenAI, Gemini, DeepSeek, OpenRouter, SiliconFlow, local Ollama, and any OpenAI-compatible endpoint. You can sign in with your ChatGPT subscription for Codex models without pasting an API key, or bring your existing Claude Code / Codex provider configs in one click. The dynamic model picker shows each provider's real catalogue, not a hardcoded shortlist. This is the most flexible provider setup I've seen in any AI design tool.

**Twelve Built-in Design Skill Modules.** Before the model writes a line of CSS, it selects the skills that fit the brief — slide decks, dashboards, landing pages, SVG charts, glassmorphism, editorial typography, heroes, pricing, footers, chat UIs, data tables, and calendars. Each skill steers the model toward considered typography, purposeful whitespace, and meaningful color. You can add a `SKILL.md` to any project to teach the model your own taste. This built-in taste layer is what separates usable output from generic AI slop.

**Comment Mode and AI-Tuned Sliders.** Click any element in the preview, drop a pin, leave a note, and the model rewrites only that region. The AI-generated sliders surface the parameters worth tweaking — color, spacing, font size — so you can refine without writing another full prompt. This iterative workflow feels natural for designers who are used to tools like Figma, where you select and modify rather than regenerate from scratch.

**Decompose to UI Kit.** One click emits a `ui_kits/<slug>/` folder with `index.html`, `components/*.tsx`, `tokens.css`, `manifest.json`, and `README.md` — shaped for coding-agent handoff. Built-in deterministic and vision verifiers self-check parity using a 12-question boolean rubric and re-iterate on gaps. This bridges the design-to-code gap that most AI design tools ignore entirely. You generate a design, decompose it into a component kit, and hand it to your development workflow.

**Five Export Formats.** HTML with inlined CSS, PDF (rendered locally via Chrome), PPTX, ZIP, and Markdown. No cloud rendering, no export limits, no "upgrade to Pro to unlock PDF" nonsense. The files are real, editable, and yours. For teams that need to drop prototypes into pitch decks or client presentations, the PPTX export alone justifies the tool.

**Agentic Design Sessions (v0.2).** Every design is a session with JSONL history and a workspace folder on disk. The permissioned agent loop has access to read, write, edit, bash, grep, find, and ls, gated by Open CoDesign's permission UI. Design tools include `ask`, `scaffold`, `skill`, `preview`, `gen_image`, `tweaks`, `todos`, and `done`. Brand tokens and design-system decisions live in a `DESIGN.md` file — editable, version-controlled, shared memory rather than opaque model state.

**Phone, Tablet, and Desktop Preview.** True responsive frames with one-click switching. The last five designs keep their preview iframes alive, so navigation between designs stays zero-delay. A connection diagnostic panel provides one-click provider testing with actionable errors, and a per-generation token counter shows exactly how much each run cost.

### Use Cases

- **Rapid UI prototyping** — Generate a landing page, dashboard, or mobile app mockup from a text description in seconds. Iterate with comment mode and sliders rather than rewriting prompts.
- **Client presentations and pitch decks** — Export polished PPTX slides or PDF assets generated from brief descriptions. No design team required for early-stage client work.
- **Design-to-code handoff** — Use the Decompose to UI Kit feature to turn a design reference into a structured component bundle with tokens, ready for your React or Next.js codebase.
- **Local-first design workflows** — Teams in regulated industries (finance, healthcare, government) that need AI-assisted design without sending data to third-party cloud services.
- **Multi-model experimentation** — Compare output quality across Claude, GPT, Gemini, and local Ollama models for the same design brief, using your existing API keys.

### Pros and Cons

Pros:
- True local-first architecture with BYOK means no subscription costs beyond your existing API usage. Design files stay on your machine unless you explicitly export them.
- The multi-model support is genuinely broad — not just "we support OpenAI and Anthropic" but 20+ providers including local Ollama. Switching models mid-project is frictionless.
- The built-in design skill modules produce noticeably better output than raw model generation. The taste layer addresses the biggest complaint about AI-generated designs: they look generic.
- Active development pace — v0.1 to v0.2 shipped in three weeks, with meaningful feature additions like agentic sessions and workspace-backed design history.

Cons:
- Electron-based desktop app means higher memory usage than a web-only tool. On older machines, running the app alongside a browser and your actual development environment can feel heavy.
- The project is two months old. The API surface is still settling, and some features (code-signing, Figma export, auto-update) are on the roadmap for v0.5 and post-1.0.
- Unsigned installers require manual trust decisions on macOS Sequoia 15+ and Windows SmartScreen. This will improve with code-signing in v0.5, but right now it's a friction point for less technical users.
- The community is primarily Chinese-speaking (launched on LINUX DO), which means English documentation and support are still maturing.

### Getting Started

```bash
# macOS — Homebrew (recommended)
brew install --cask opencoworkai/tap/open-codesign

# Windows — Scoop
scoop bucket add opencoworkai https://github.com/OpenCoworkAI/scoop-bucket
scoop install opencoworkai/open-codesign

# Or download directly from GitHub Releases:
# https://github.com/OpenCoworkAI/open-codesign/releases/tag/v0.2.0
# Available for macOS (ARM64/x64), Windows (x64/ARM64), Linux (AppImage/deb/rpm)
```

After installation, launch the app and configure a provider:

1. **ChatGPT subscription** — sign in directly for Codex models, no API key needed
2. **API key** — paste your Anthropic, OpenAI, Gemini, or OpenRouter key
3. **Local** — connect to a running Ollama instance for fully offline generation

Pick one of fifteen built-in demos or type your own prompt. A sandboxed prototype appears in seconds.

### Alternatives

**v0 by Vercel** — The original prompt-to-prototype tool that popularized the category. v0 produces excellent React/Next.js components and integrates tightly with the Vercel ecosystem. It's cloud-only, GPT-4o-powered, and requires a Vercel subscription. Choose v0 if you're already deep in the Vercel ecosystem and want the tightest Next.js integration available.

**Lovable** — A multi-LLM AI design tool with a polished web interface and built-in deployment. Lovable offers more guardrails for non-technical users and a smoother onboarding experience. It's cloud-based with limited BYOK support. Choose Lovable if your team includes non-technical stakeholders who need to generate and iterate on designs without touching a terminal.

**Bolt.new** — StackBlitz's in-browser AI development environment that generates full-stack applications from prompts. Bolt is more code-generation-focused than design-focused, producing deployable applications rather than static prototypes. Choose Bolt if you need working code, not just visual mockups, and you're comfortable with the StackBlitz cloud runtime.

### Verdict

Open CoDesign is the most pragmatic AI design tool to emerge in 2026. It doesn't try to reinvent the design workflow — it takes the prompt-to-prototype pattern that v0 and Lovable proved works and strips away the cloud dependency, subscription model, and provider lock-in. The 6,800 stars in two months, primarily driven by the Chinese developer community on LINUX DO, suggest there's real demand for this approach.

The tool has rough edges. It's two months old, the installers are unsigned, and the English documentation trails the Chinese community support. But the core architecture is sound — local-first storage, BYOK multi-model support, and real file exports address the three biggest complaints about existing AI design tools. If you're a developer who already has API keys and wants a fast way to generate UI prototypes, slide decks, or design assets without adding another subscription, Open CoDesign is worth installing today. The Decompose to UI Kit feature alone, which bridges AI-generated designs into structured component bundles, makes it relevant for any React or Next.js team doing rapid prototyping.
