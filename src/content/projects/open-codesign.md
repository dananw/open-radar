---
name: open-codesign
description: "Open-source Claude Design alternative — local-first desktop app that turns prompts into prototypes, slides, and PDFs with any AI model. 6.8K stars, MIT."
url: https://github.com/OpenCoworkAI/open-codesign
stars: 6802
forks: 720
language: TypeScript
tags: ["design-tools", "ai-prototyping", "local-first", "typescript", "electron"]
featured: false
publishedAt: 2026-06-12
---

## Open CoDesign

### Overview

Open CoDesign is an open-source, local-first desktop app that turns text prompts into polished prototypes, slide decks, landing pages, and marketing assets. It hit 6,800 GitHub stars within two months of its April 2026 launch, with 720 forks — numbers that tell you developers were hungry for a Claude Design alternative that doesn't lock you into a single vendor.

The project comes from OpenCoworkAI, the same team behind Open Cowork (an open-source AI agent desktop app). They clearly have a thesis: AI design tools are useful, but the current generation — Claude Design, v0 by Vercel, Lovable, Bolt.new — all share the same limitation. They're cloud-only, single-model, and subscription-gated. Open CoDesign is their answer: an MIT-licensed Electron app that runs on your laptop, works with whatever model you already pay for, and exports real files you can actually use.

The core problem it solves is the gap between "I have a design idea" and "I have something I can hand to a developer or ship myself." Traditional workflows involve Figma mockups, design reviews, and front-end implementation cycles. AI design tools compress that to seconds, but they do it by keeping your work in their cloud and routing everything through their API. Open CoDesign keeps the generation speed while removing the cloud dependency.

### Why it matters

The AI design tool space is exploding. Claude Design launched in early 2026 as Anthropic's entry into prompt-to-UI generation. Vercel's v0 has been around since 2023. Lovable and Bolt.new raised significant rounds. But every one of these tools shares the same business model: cloud-hosted, single-provider, subscription-based. If you're a developer who already has an Anthropic API key, an OpenAI key, or a local Ollama setup, you're paying twice — once for the model access and again for the design tool wrapper.

Open CoDesign flips that model. It's a BYOK (bring your own key) desktop app that supports 20+ model providers including Claude, GPT, Gemini, DeepSeek, Kimi, GLM, Ollama, and any OpenAI-compatible endpoint. You can even sign in with your existing ChatGPT Plus subscription to use Codex models. One-click import of Claude Code or Codex provider configs means you're generating designs within 90 seconds of installing the app.

For fullstack web developers specifically, this fills a real gap. You're building React components, NestJS backends, Django admin panels — you know the code, but you might not have a designer on call. Open CoDesign lets you prototype a landing page, a dashboard, or a pitch deck from a text description, then export the HTML/CSS/JS directly into your project. The "Decompose to UI Kit" feature goes further: it generates a structured component folder with TypeScript components, CSS tokens, and a manifest file ready for coding-agent handoff.

### Key Features

**Multi-Model BYOK Architecture.** Open CoDesign supports Anthropic, OpenAI, Google Gemini, DeepSeek, OpenRouter, SiliconFlow, local Ollama, and any OpenAI-compatible relay. You're not locked into one provider's pricing or rate limits. If Claude is expensive today, switch to DeepSeek. If you want local inference, point it at Ollama. The dynamic model picker shows each provider's real catalogue, not a hardcoded shortlist.

**Sandboxed Iframe Preview.** Generated prototypes render in a sandboxed iframe with vendored React 18 and Babel running on-device. The preview supports phone, tablet, and desktop frames with one-click switching. What you see is what you get — the HTML/CSS/JS in the preview is the same code you export.

**Comment Mode with Pin-Based Editing.** Click any element in the preview, drop a pin, leave a note, and the model rewrites only that region. This is dramatically more efficient than re-prompting the entire design when you want to change a button color or adjust spacing. The AI-generated sliders surface the parameters worth tweaking — color, spacing, typography — so you can refine without another full prompt.

**Decompose to UI Kit.** One click emits a `ui_kits/<slug>/` folder containing `index.html`, `components/*.tsx`, `tokens.css`, `manifest.json`, and `README.md` — structured for coding-agent handoff. Built-in deterministic and vision verifiers self-check visual parity using a 12-question boolean rubric, then re-iterate on gaps. This bridges the design-to-code gap that most AI design tools ignore.

**Twelve Built-in Design Skill Modules.** Slide decks, dashboards, landing pages, SVG charts, glassmorphism, editorial typography, heroes, pricing, footers, chat UIs, data tables, and calendars. Every skill is available in every generation. Before the model writes CSS, it selects relevant skills and reasons through layout intent and design-system coherence. You can add your own `SKILL.md` to teach the model your taste.

**Five Export Formats.** HTML with inlined CSS, PDF (rendered locally via Chrome), PPTX, ZIP archive, and Markdown. No cloud rendering, no export limits, no "upgrade to Pro to download" gates. The files land on your local filesystem immediately.

**One-Click Provider Import.** Already using Claude Code or Codex? Your API-key provider configs import in one click. ChatGPT Plus subscribers can sign in directly from Settings without pasting any key. This removes the biggest friction point with BYOK tools — the setup time.

### Use Cases

- **Rapid UI prototyping** — Describe a landing page, dashboard, or mobile app screen in plain English and get a working HTML/JSX prototype in seconds. Perfect for sprint planning, client pitches, or validating design direction before committing engineering time.

- **Presentation and pitch deck creation** — Generate polished slide decks from text briefs. Export to PPTX for team meetings or PDF for investor pitches. The twelve design skill modules handle typography, layout, and color without manual tweaking.

- **Design-to-code handoff** — Use the Decompose to UI Kit feature to turn a screenshot or prompt into structured React components with CSS tokens. Hand the output directly to Claude Code, Cursor, or your coding agent for integration into your project.

- **Component library prototyping** — Generate variations of a UI component (button states, card layouts, form patterns) and export the HTML/CSS for review before implementing in your design system.

- **Client-facing mockups for freelancers** — Produce professional-looking mockups without Figma or a design team. Export as PDF or HTML to share with clients for feedback before writing production code.

### Pros and Cons

Pros:

- Truly local-first — your designs, API keys, and generation history stay on your machine. No mandatory cloud workspace, no data harvesting. Credentials stored in `~/.config/open-codesign/config.toml`.

- Multi-model flexibility is unmatched among AI design tools. The 20+ provider support means you're never locked into one company's pricing changes or availability issues.

- The Decompose to UI Kit feature with its deterministic parity checker is a genuinely useful bridge between design and engineering. Most competitors stop at "here's a screenshot."

- MIT license means you can fork it, modify it, and ship it commercially. The SBOM attached to every release is a nice touch for enterprise compliance.

Cons:

- Electron app means a non-trivial memory footprint. If you're already running VS Code, a browser, and Slack, adding another Electron process matters on machines with 8GB RAM.

- The installer is not code-signed yet (planned for v0.5). On macOS Sequoia 15+, you need to run `xattr -cr` to bypass Gatekeeper, which is a friction point for less technical users.

- Quality depends heavily on the model you choose. With a cheap local Ollama model, the designs are functional but generic. The best results require Claude Opus or GPT-4o, which cost real money per generation.

### Getting Started

```bash
# macOS — Homebrew (recommended)
brew install --cask opencoworkai/tap/open-codesign

# Windows — Scoop
scoop bucket add opencoworkai https://github.com/OpenCoworkAI/scoop-bucket
scoop install opencoworkai/open-codesign

# Linux — AppImage or .deb from GitHub Releases
# https://github.com/OpenCoworkAI/open-codesign/releases/tag/v0.2.0

# Or clone and build from source
git clone https://github.com/OpenCoworkAI/open-codesign.git
cd open-codesign
pnpm install
pnpm build
pnpm start
```

On first launch, the Settings page opens automatically. Add a provider (API key, ChatGPT sign-in, or local Ollama), then pick one of fifteen built-in demos or type your own prompt. A sandboxed prototype appears in seconds.

To use the Decompose to UI Kit feature:

```bash
# After generating a design, click "Decompose" in the chat sidebar
# Output lands in ui_kits/<slug>/ with:
#   index.html
#   components/*.tsx
#   tokens.css
#   manifest.json
#   README.md
```

### Alternatives

**Claude Design by Anthropic** — The proprietary cloud-only tool that Open CoDesign directly targets. Claude Design produces excellent results using Claude's native capabilities, but it's locked to Anthropic's models and requires a subscription. Choose Claude Design if you want zero setup and don't mind the vendor lock-in.

**v0 by Vercel** — The OG AI UI generator, focused on React/Next.js component generation. v0 has a larger community and more refined output for React-specific use cases, but it's GPT-4o-only, cloud-hosted, and subscription-gated. Choose v0 if you're deep in the Vercel ecosystem and want React components specifically.

**Lovable** — An AI app builder that goes beyond UI generation to include backend logic, database setup, and deployment. Lovable is more opinionated and full-stack, but heavier and more expensive. Choose Lovable if you want a complete app scaffold, not just a design prototype.

### Verdict

Open CoDesign is the most practical open-source alternative to the AI design tools that launched in 2025-2026. It's not trying to be a full app builder like Lovable or a component generator like v0 — it's focused on the "prompt to polished artifact" workflow, and it does that well. The multi-model BYOK approach is the right call for developers who already have API keys and don't want to pay a design-tool tax on top. The Decompose to UI Kit feature with its deterministic parity checker is the standout — it's the first tool I've seen that actually tries to bridge the design-to-code gap with measurable quality metrics. If you're a fullstack developer who occasionally needs to prototype UIs without waiting for a designer, this is worth the three-minute install. Just bring a good model key — the output quality scales directly with the model you choose.
