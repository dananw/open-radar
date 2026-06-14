---
name: officedex
description: "OfficeDex is an open-source AI-native desktop app that generates Word, PowerPoint, and Excel files from natural language prompts using Go, Wails, and React 19."
url: https://github.com/officecli/officedex
stars: 367
forks: 48
language: Go
tags: ["ai", "desktop-app", "document-generation", "go", "react", "wails"]
featured: false
publishedAt: 2026-06-14
---

## OfficeDex

### Overview

OfficeDex is a desktop application that generates Word documents, PowerPoint presentations, and Excel spreadsheets from natural language prompts. It hit 367 stars in under a month after its May 2026 launch, which is notable for a Go-based desktop app in a space dominated by Electron and web-only tools.

The project comes from the OfficeCLI team, a group focused on building AI tooling for office document workflows. The architecture is split into two repos: this one handles the desktop shell (React 19 + Ant Design + Wails v2), while a separate Go binary (`officecli`) handles the actual document generation, LLM orchestration, and OOXML output. The two communicate via JSON-RPC over stdio, which keeps concerns cleanly separated and lets power users run the CLI standalone.

The core problem it solves is painfully familiar: you spend more time formatting documents than writing them. McKinsey estimates knowledge workers spend 28% of their week on email and document management. OfficeDex flips that ratio — describe what you want in plain English, and it produces a native `.docx` or `.pptx` with proper structure, charts, and formatting in under 90 seconds. No HTML intermediaries, no export-and-fix cycles, no "let me just adjust this table for 20 minutes."

### Why it matters

The "VibeOfficing" concept borrows directly from VibeCoding — the trend where developers describe intent and AI writes the code. OfficeDex applies the same philosophy to office documents, and the analogy is tighter than it sounds. Just as coding AI understands languages, frameworks, and design patterns, OfficeDex's engine understands OOXML formats, template structures, and layout conventions. It doesn't just generate text and dump it into a file. It produces documents that look like a human spent an afternoon on them.

What makes this interesting for developers specifically is the architecture. Wails v2 gives you native OS windows with Go backends and web-technology frontends, without the 150MB Electron tax — the build output stays under 30MB. The React 19 frontend uses Ant Design 6 with Notion-inspired design tokens. The generation engine is a completely separate binary, which means you could embed it in your own tooling, pipe it into CI/CD workflows, or wrap it in a different UI entirely. The JSON-RPC interface is clean enough that building a web frontend or VS Code extension around it would be straightforward.

The timing also matters. AI agents are getting better at structured tasks, but most of them produce markdown or plain text. If your workflow involves delivering actual office documents — contracts, reports, presentations for stakeholders who live in PowerPoint — you need a bridge between AI generation and the formats people actually consume. OfficeDex is that bridge, and it does it without locking you into a specific cloud provider or SaaS platform.

### Key Features

**Native OOXML Generation.** OfficeDex produces real `.docx`, `.pptx`, and `.xlsx` files, not HTML exports or PDF approximations. The engine understands OOXML at a structural level — heading hierarchies, table formatting, chart embedding, slide layouts. The output files open correctly in Word, PowerPoint, LibreOffice, and Google Docs without conversion artifacts.

**Inline Document Preview.** The app renders DOCX, PPTX, XLSX, and PDF files directly in the interface using `docx-preview`, `pdfjs-dist`, and the `xlsx` library. You never need to open Microsoft Office to check the output. This sounds minor but it eliminates the most annoying part of document generation tools — the generate-export-open-adjust loop.

**Multi-Agent Architecture.** Document generation isn't a single LLM call. OfficeDex uses multiple cooperating agents: one plans the document structure, another writes the content, a third handles formatting and layout. When the system is uncertain about a decision (tone, length, whether to include a chart), it asks you in real time through the streaming interface. This mid-flight interaction model is more reliable than single-shot generation.

**Bring Your Own LLM.** The settings panel lets you configure any OpenAI-compatible API, Anthropic Claude, Azure OpenAI, or a self-hosted model running on vLLM or Ollama. Point it at `http://localhost:11434/v1` for fully offline document generation. No vendor lock-in, no forced cloud dependency.

**Memory and Style Persistence.** OfficeDex remembers your design preferences across sessions. Set the tone, formatting style, and layout conventions once, and your 50th report inherits the same polish as your first. This is the feature that separates it from one-shot AI document generators — it builds a persistent understanding of how your documents should look.

**Image Understanding.** Paste screenshots or upload reference images, and the AI incorporates visual context into its generation. Upload a chart image and ask it to "create a similar analysis for Q3" and it understands the structure, not just the text.

**Sub-30MB Native Bundle.** Built with Wails v2, the app ships as a native window on macOS and Windows without the Electron overhead. The Go backend compiles to a single binary. The entire application footprint is smaller than most Electron apps' node_modules directory.

### Use Cases

- **Quarterly business reports** — Describe the report focus, target audience, and key metrics. OfficeDex generates a structured Word document with charts, trend analysis, and executive summary in under 90 seconds.
- **Pitch decks and presentations** — Project kickoffs, product launches, investor pitches. Built-in templates plus free-form prompts give you a starting deck that actually looks presentable.
- **Competitive analysis spreadsheets** — Generate Excel files with comparison matrices, feature grids, and pricing analysis from a natural language description of what you need to compare.
- **Recurring document workflows** — Teams that produce similar reports weekly or monthly benefit most from the memory feature. Set your style once, generate consistent documents every time.
- **Developer documentation pipelines** — Use the OfficeCLI binary directly in scripts or CI/CD to auto-generate formatted technical documents from code annotations or meeting notes.

### Pros and Cons

Pros:
- The Wails v2 architecture keeps bundle size under 30MB while feeling like a native app. No Electron bloat, no browser tab management.
- Local-first design means your documents and API keys never touch their servers unless you opt into the hosted runtime. Data sovereignty by default.
- The multi-agent approach with real-time interaction produces more reliable results than single-shot generation. When the AI is unsure, it asks instead of guessing.
- Active development with a public roadmap — collaborative editing, plugin system, and Linux installers are all in progress.

Cons:
- macOS is not yet Apple-notarized, requiring a manual `xattr` command on first launch. Minor friction, but it signals the project is still early.
- Linux support exists at the source level but has no official installer yet. You need to clone and run `npm run dev` to use it on Linux.
- The generation quality depends entirely on the LLM you connect. With weaker models, document structure and formatting accuracy drops significantly.
- No web version — it's desktop-only. If your team works primarily in browsers, there's no hosted alternative.

### Getting Started

```bash
# Clone and install
git clone https://github.com/officecli/officedex.git
cd officedex
npm install

# Start in dev mode (auto-downloads OfficeCLI binary)
npm run dev

# Or download the latest release installer directly
# https://github.com/officecli/officedex/releases/latest
# macOS: .dmg file — drag to Applications, then run:
xattr -dr com.apple.quarantine /Applications/OfficeDex.app

# Build for production
npm run dist:mac    # macOS
npm run dist:win    # Windows
```

### Alternatives

**Notion AI** — If you're already in Notion's ecosystem, its built-in AI can generate and edit documents inline. But it's cloud-locked, can't produce native Office files, and the AI features require a paid plan. Choose Notion AI when your team already lives in Notion and doesn't need `.docx` output.

**Microsoft Copilot** — Tightly integrated with Word, PowerPoint, and Excel. Generates and edits documents within the Office suite. The catch: it requires a Microsoft 365 subscription, sends your data to Microsoft's cloud, and gives you no control over which model runs. Choose Copilot when your organization is already deep in the Microsoft ecosystem and data sovereignty isn't a concern.

**Cursor / Claude for document generation** — General-purpose AI coding tools can generate markdown or even OOXML with the right prompts. But they lack document preview, style memory, and the structured multi-agent pipeline. Use them for one-off document tasks, not for recurring document workflows where consistency matters.

### Verdict

OfficeDex is the most practical "AI meets office documents" tool I've seen that doesn't require a SaaS subscription or cloud lock-in. The Wails architecture is a smart choice — it keeps the app lean while the React frontend stays flexible. The multi-agent generation pipeline with real-time interaction is genuinely better than single-shot approaches, especially for complex documents with charts and structured layouts. At 367 stars in its first month with active development and a clear roadmap (collaborative editing, plugins, Linux installers), this has real momentum. If your workflow involves producing formatted Word, PowerPoint, or Excel files regularly and you want AI assistance without handing your data to Microsoft or Google, OfficeDex is worth building from source today.
