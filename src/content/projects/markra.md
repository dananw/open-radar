---
name: markra
description: "Local-first WYSIWYG Markdown editor with native AI support. React + Tauri + TypeScript. 14+ AI providers, inline editing, folder workspace, export to HTML/PDF."
url: https://github.com/murongg/markra
stars: 396
forks: 19
language: TypeScript
tags: ["markdown-editor", "wysiwyg", "ai-writing", "local-first", "react", "tauri"]
featured: false
publishedAt: 2026-06-11
---

## Markra

### Overview

Markra is a local-first, open-source WYSIWYG Markdown editor with native AI integration, built with React, Tauri, and TypeScript. It's been gaining traction since its May 2026 launch — featured on Product Hunt, climbing to nearly 400 GitHub stars in just over a month, and accumulating a growing user base of developers and writers who want AI assistance without the cloud dependency that most AI writing tools demand.

The project is developed by murongg, a developer who's clearly been thinking hard about what the Markdown editing experience should look like in 2026. The editor ships as both a web app at editor.markra.app and a desktop application via Tauri, with builds for macOS (Apple Silicon and Intel), Windows (installer and portable), and Linux (AppImage). The dual deployment model is smart — you get the instant accessibility of a web editor plus the performance and filesystem access of a native app.

The core problem Markra solves is the gap between "Markdown editor" and "AI-powered writing tool." Most Markdown editors treat AI as an afterthought — a plugin you install, an API key you configure in a settings panel buried three levels deep. Markra flips this. AI is a first-class citizen in the editing experience, with inline commands on selected text, a side panel for document-wide operations, and a full preview system that shows you exactly what the AI wants to change before any edit touches your file. The data never leaves your machine unless you explicitly configure an AI provider, and even then, only the text you select or the context you provide gets sent.

### Why it matters

The Markdown editor space is deceptively crowded. VS Code with extensions, Obsidian, Typora, Zed, Notion — everyone has a Markdown story. But most of these tools fall into one of two camps: either they're code editors that happen to support Markdown (VS Code, Zed), or they're note-taking apps that use Markdown as a storage format but hide it behind rich editors (Notion, Obsidian). Markra sits in a third category that's increasingly relevant: a purpose-built writing tool that treats Markdown as the primary interface and AI as a native capability, not a bolt-on.

For fullstack web developers specifically, Markra is interesting for two reasons. First, it's a well-architected reference project for anyone building a Tauri + React + TypeScript application. The codebase demonstrates how to structure a monorepo with a shared TypeScript core, a React frontend, and Tauri bindings — patterns that are directly applicable to any desktop + web hybrid project. Second, the AI integration architecture is worth studying. Markra supports 14+ AI providers (OpenAI, Anthropic, Google Gemini, DeepSeek, Mistral, Groq, OpenRouter, Together.ai, Qwen, Xiaomi MiMo, Volcengine Ark, xAI, Azure OpenAI, and Ollama for local models), each with separate model selection for inline editing versus the side panel. If you're building any product that needs multi-provider AI support, this is a clean implementation to learn from.

### Key Features

**WYSIWYG Markdown Rendering.** Markra renders links, images, raw HTML, KaTeX math expressions, Mermaid diagrams, and GFM tables inline — not as syntax-highlighted source, but as the actual rendered output. You can expand any element back to source when you need to edit the raw Markdown. Slash commands give you quick access to block-level formatting, and drag handles let you reorder blocks visually. There's also a full source mode one click away for when you need precise control. The writing width, font size, and line height are all adjustable, which matters more than you'd think for long writing sessions.

**Inline AI Commands.** Select any text in your document and invoke AI directly on it. The quick actions include polish, rewrite, continue writing, summarize, and translate. What makes this better than most implementations is the preview system — every AI edit appears as a diff you can review before applying. Accept, reject, or copy the suggestion. The AI sessions are searchable, renamable, and archivable, so you can build up a history of how your document evolved through AI-assisted edits.

**Multi-Provider AI with Flexible Configuration.** Markra supports 14+ AI providers out of the box, including cloud APIs (OpenAI, Anthropic, Google, DeepSeek, Mistral, Groq, xAI), aggregators (OpenRouter, Together.ai), and local models via Ollama. The clever part is the separate model selection — you can use a fast, cheap model for inline text edits and a more powerful model for the side panel's document-wide tasks. Any OpenAI-compatible endpoint works, so you can point it at self-hosted vLLM, LiteLLM, or any other compatible server. Web search integration is also built in, supporting provider-native search, Bing, and SearXNG.

**Local Workspace with File Tree.** Open a single file or an entire folder and manage everything from a sidebar file tree — create, rename, delete, and browse. Document tabs let you work on multiple files simultaneously, and the outline navigation panel gives you a structural view of headings. Double-bracket link completion (like Obsidian's `[[wiki links]]`) makes it practical for building interconnected knowledge bases. Images can be pasted to local storage, S3, or WebDAV.

**Rich Block Support.** GitHub-style callouts (note, tip, important, warning, caution) render with proper styling. Visual table controls handle rows, columns, sizing, and alignment without touching raw Markdown syntax. Code blocks get syntax highlighting with a language picker and one-click copy. For developers writing technical documentation with mixed prose, tables, and code samples, this matters — you're not constantly switching between source and preview modes.

**Themes and Export.** Built-in themes handle the basics, but you can also write scoped custom CSS and import/export theme configurations. Export to standalone HTML or PDF with control over page size, margins, and metadata. The HTML export is clean enough to drop into a static site generator, and the PDF output is print-ready.

**Cross-Platform Desktop + Web.** The Tauri architecture means you get a native desktop app (macOS, Windows, Linux) that's significantly lighter than Electron equivalents, plus a web version that works in any browser. The desktop app has full filesystem access for opening local folders, while the web version works with browser-accessible files. Both share the same React + TypeScript codebase.

### Use Cases

- **Technical documentation** — Write docs with code blocks, tables, and Mermaid diagrams, then use AI to polish prose without leaving the editor. The folder workspace lets you manage an entire docs site.

- **Blog post drafting** — Draft in WYSIWYG mode, use AI to expand outlines into full paragraphs, preview the result, and export to HTML for your static site generator. The inline AI "continue" command is particularly good for breaking through writer's block.

- **Personal knowledge management** — Build an Obsidian-like knowledge base with double-bracket links, folder hierarchies, and full-text search, but with native AI that can summarize, rewrite, and connect ideas across documents.

- **AI-assisted research notes** — Paste research papers, use AI to summarize sections, translate foreign-language sources, and organize findings in a local folder structure that stays on your machine.

- **Developer journaling and changelogs** — Maintain running notes in Markdown with AI assistance for summarizing weekly progress, cleaning up rough drafts, and formatting changelogs consistently.

### Pros and Cons

Pros:
- **Genuinely local-first.** Files stay on your disk as plain `.md` files. No proprietary format, no vendor lock-in, no cloud sync required. You can switch editors at any time and keep all your work.
- **Multi-provider AI done right.** The separate model selection for inline vs. panel AI, plus Ollama support for fully local inference, gives you real flexibility. Most editors that claim "AI support" lock you into one provider.
- **Clean Tauri + React architecture.** For developers studying how to build modern desktop apps with web technologies, Markra's codebase is a well-organized reference with a monorepo structure and clear separation between frontend, backend (Tauri), and shared TypeScript.
- **Preview before apply.** Every AI edit shows a diff before touching your file. This is a small detail that prevents the "AI rewrote my paragraph and I can't undo it" problem that plagues most AI writing tools.

Cons:
- **Relatively young project.** At just over a month old with ~400 stars, the project is still in early stages. The roadmap mentions stability improvements and edge-case handling, which suggests there are rough edges in the current release.
- **AGPL-3.0 license.** The copyleft license means any modifications you distribute must also be AGPL-3.0. For personal use this doesn't matter, but companies building products on top of Markra's code need to understand the implications.
- **No real-time collaboration.** Markra is a single-user tool. If your team needs collaborative editing (Google Docs style), you'll need a different solution. The local-first design is a feature for individuals but a limitation for teams.

### Getting Started

```bash
# Use the web editor (no install needed)
# Visit https://editor.markra.app/

# Or download the desktop app from GitHub Releases
# https://github.com/murongg/markra/releases/latest
# Available for: macOS (Apple Silicon/Intel), Windows, Linux

# For developers who want to build from source:
git clone https://github.com/murongg/markra.git
cd markra
npm install
npm run dev

# The project uses a monorepo structure:
# apps/desktop/  — Tauri desktop app
# apps/web/      — Web editor
# packages/      — Shared TypeScript packages
```

To configure AI providers, open Settings in the editor and add your API keys for any supported provider. For local models, install Ollama and pull a model — Markra will detect it automatically.

### Alternatives

**Obsidian** — The dominant player in local-first Markdown knowledge management. Obsidian has a massive plugin ecosystem, mobile apps, and a proven track record. Choose Obsidian if you need community plugins, mobile support, or a mature knowledge management workflow. Choose Markra if you want native AI integration without plugins and a cleaner WYSIWYG experience.

**Typora** — A long-established WYSIWYG Markdown editor that pioneered the "what you see is what you get" approach to Markdown. Typora is polished, fast, and stable, but it's closed-source and has no AI integration. Choose Typora if you want the most refined pure Markdown editing experience and don't need AI features.

**Zed** — A high-performance code editor built in Rust with AI assistant features. Zed is excellent for code editing and has basic Markdown support, but it's fundamentally a code editor, not a writing tool. Choose Zed if Markdown editing is secondary to your coding workflow and you want AI code assistance rather than AI writing assistance.

### Verdict

Markra is the most interesting Markdown editor I've seen launch in 2026. The combination of genuine local-first architecture, multi-provider AI support (including local models via Ollama), and a clean Tauri + React + TypeScript codebase makes it worth watching — both as a tool to use and a project to study. At 396 stars in just over a month, the growth trajectory suggests the developer community sees something here. The preview-before-apply approach to AI edits is a design decision that more tools should adopt, and the separate model selection for inline vs. panel AI shows thoughtful product thinking. If you're a fullstack developer who writes technical documentation, blog posts, or any form of structured prose, Markra is worth trying. The web editor at editor.markra.app means you can test it in 30 seconds with zero commitment. The AGPL-3.0 license and early-stage stability are the main caveats — this isn't yet a tool you'd bet your entire writing workflow on, but it's moving fast enough that it might be by end of year.
