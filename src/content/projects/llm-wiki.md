---
name: llm-wiki
description: "LLM Wiki is a cross-platform desktop app that turns your documents into a persistent, interlinked knowledge base — built on Karpathy's llm-wiki pattern with Tauri, React, and sigma.js."
url: https://github.com/nashsu/llm_wiki
stars: 10288
forks: 1274
language: TypeScript
tags: ["knowledge-base", "llm", "desktop-app", "tauri", "react", "graph"]
featured: false
publishedAt: 2026-06-04
---

## LLM Wiki

### Overview

LLM Wiki is a cross-platform desktop application that turns your documents into an organized, interlinked knowledge base — automatically. It hit 10,000 GitHub stars in under two months since its April 2026 launch, which tracks with how hungry developers are for something better than "paste your PDF into ChatGPT and hope for the best."

The project is a concrete implementation of Andrej Karpathy's [llm-wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) — a methodology for building personal knowledge bases using LLMs. Karpathy described the abstract architecture: raw sources feed into an LLM that generates a structured wiki with cross-references, maintaining it incrementally rather than re-deriving answers from scratch every time. The nashsu team took that pattern and built a full desktop app around it with substantial extensions: knowledge graph visualization, community detection, vector search, deep research, a Chrome web clipper, and an HTTP API that lets AI agents query your wiki directly.

The core difference from traditional RAG is architectural. RAG retrieves and answers from scratch on every query — your documents are a search index. LLM Wiki compiles knowledge once into persistent wiki pages with YAML frontmatter, cross-references, and source traceability. The LLM maintains the wiki incrementally: when you add a new document, it analyzes what's changed and updates affected pages rather than rebuilding everything. The result feels less like "chatting with your documents" and more like having an LLM librarian who builds and maintains a reference library for you.

### Why it matters

The RAG hype cycle has produced dozens of "chat with your documents" tools, but most of them share the same fundamental limitation: they treat documents as disposable context, retrieved fresh on every query. That works for simple Q&A but falls apart when you need to build understanding across many sources — connecting ideas, spotting contradictions, tracking what you've already learned.

LLM Wiki represents a different approach that's gaining traction: knowledge compilation over retrieval. Instead of searching your documents every time, the LLM reads them once, extracts the key information, and writes it into structured wiki pages. Those pages become the knowledge base. This is closer to how human researchers actually work — you read sources, take notes, build connections, and create an outline. You don't re-read every source paper every time you have a question.

The timing matters too. Karpathy published his llm-wiki pattern in early 2026, and it immediately resonated with developers who'd been frustrated with RAG limitations. LLM Wiki is the most complete implementation of that pattern, and the 10K stars in eight weeks suggest the "compiled knowledge" approach has real developer mindshare. For fullstack developers working across multiple codebases, documentation, and technical papers, this kind of tool addresses a real productivity gap.

### Key Features

**Two-Step Chain-of-Thought Ingest.** Instead of asking the LLM to read and write simultaneously, LLM Wiki splits ingestion into two sequential calls. First, the LLM analyzes the source — extracting key entities, concepts, arguments, connections to existing wiki content, and contradictions. Then it generates wiki pages based on that analysis. This produces significantly better results than single-step ingest because the LLM has structured context before it starts writing.

**4-Signal Knowledge Graph with sigma.js.** The knowledge graph isn't just a pretty visualization. It uses a weighted relevance model combining four signals: direct wikilinks (×3.0 weight), source overlap from frontmatter (×4.0), Adamic-Adar common neighbors (×1.5), and type affinity between same-kind pages (×1.0). Nodes are rendered with ForceAtlas2 layout, colored by page type or community, and sized by link count. Hover highlights neighbors and shows relevance scores. It's the kind of graph that actually helps you find connections you wouldn't have noticed otherwise.

**Louvain Community Detection.** The app automatically discovers knowledge clusters using the Louvain algorithm — grouping pages based on link topology rather than predefined categories. Each community gets a cohesion score (intra-edge density), and clusters scoring below 0.15 get flagged as weakly connected. This surfaces structural problems in your knowledge base: areas where you have information but haven't built the connections between related concepts.

**Graph Insights with One-Click Deep Research.** The system analyzes the graph structure to surface two types of actionable insights. Surprising connections detect unexpected cross-community edges and cross-type links. Knowledge gaps find isolated pages (degree ≤ 1), sparse communities, and bridge nodes connecting three or more clusters. Each insight card has a Deep Research button that triggers LLM-optimized web search via Tavily, SerpApi, or SearXNG, then auto-ingests the results into your wiki.

**Chrome Web Clipper Extension.** A dedicated Manifest V3 extension that uses Mozilla Readability.js for article extraction and Turndown.js for HTML-to-Markdown conversion. Pick which wiki project to clip into, and the content auto-ingests through the two-step pipeline. The extension polls the local HTTP API every three seconds for new clips. Offline preview works even when the app isn't running.

**Local HTTP API with AI Agent Integration.** The app exposes a JSON API at `127.0.0.1:19828` (token-protected, localhost-only) with endpoints for hybrid search, file reading, graph traversal, and source rescanning. A ready-made agent skill installs into Claude Code or Codex with one command (`npx skills add`), letting AI agents query your wiki directly. This turns your personal knowledge base into a tool that other AI systems can reference.

**Multi-Provider LLM Support with Configurable Context.** Works with OpenAI, Anthropic, Google, Ollama, and custom endpoints. The context window slider goes from 4K to 1M tokens with proportional budget allocation: 60% wiki pages, 20% chat history, 5% index, 15% system prompt. Pages are prioritized by combined search and graph relevance scores, so the most relevant content fills the context window first.

### Use Cases

- **Research synthesis across papers and documentation** — Import a folder of PDFs, DOCX files, and markdown docs. The LLM builds wiki pages connecting findings across sources, flags contradictions, and maintains a knowledge graph showing how ideas relate. Better than Zotero for understanding, better than ChatGPT for persistence.

- **Personal knowledge management for developers** — Dump technical blog posts, API docs, Stack Overflow answers, and meeting notes into LLM Wiki. The source folder auto-watch detects changes and keeps the wiki current. Query it through the chat interface or let your coding agent access it via the HTTP API.

- **Onboarding onto a new codebase or domain** — Import architecture docs, design docs, and relevant papers. The knowledge graph reveals the structure of the domain, community detection shows natural topic clusters, and graph insights highlight gaps in the documentation you should fill.

- **Content research for technical writing** — Clip reference material via the Chrome extension, let the LLM build connections, then query the assembled knowledge base when writing articles or documentation. The review system flags items that need human judgment before incorporation.

- **Team knowledge sharing via Obsidian compatibility** — The wiki directory works as a plain Obsidian vault. Share it via Git, and team members can browse the generated wiki in Obsidian while the LLM maintains it through the desktop app.

### Pros and Cons

Pros:

- The "compiled knowledge" approach produces genuinely better answers than retrieval-only RAG for complex, multi-source questions. The two-step ingest with analysis-first design means wiki pages are more structured and accurate than what you'd get from a single LLM call.

- The knowledge graph is functional, not decorative. The 4-signal relevance model and Louvain community detection surface real insights about how your knowledge connects. Most "knowledge graph" tools in this space are just force-directed node visualizations with no analytical value.

- The Tauri v2 stack (Rust backend, React 19 frontend) makes the app genuinely cross-platform with good performance. Pre-built binaries for macOS, Windows, and Linux. The 15-minute timeout for long ingest operations shows they're thinking about real-world usage patterns.

- The HTTP API and agent skill integration is forward-looking design. As AI agents become more capable, being able to point them at a curated knowledge base rather than raw documents is a meaningful advantage.

Cons:

- The LLM dependency is total. Every ingest, query, lint, and research operation requires LLM API calls. For large document collections, the token costs add up quickly. There's no offline mode for core functionality — you need a working LLM endpoint for everything except browsing existing wiki pages.

- The desktop app model limits collaboration. The wiki lives on your local machine. Obsidian compatibility helps for read-only sharing, but there's no real-time multi-user editing or cloud sync. For team knowledge management, you're stuck with Git-based workflows.

- The 10K stars and rapid growth mean the API surface is still evolving. The project is built by a small team, and the pace of feature additions (graph insights, deep research, agent skills, web clipper all in two months) suggests the architecture might need stabilization before it's production-ready for critical workflows.

### Getting Started

```bash
# Download pre-built binaries from GitHub Releases
# macOS (.dmg), Windows (.msi), Linux (.deb / .AppImage)
# https://github.com/nashsu/llm_wiki/releases

# Or build from source (requires Node.js 20+, Rust 1.70+)
git clone https://github.com/nashsu/llm_wiki.git
cd llm_wiki
npm install
npm run tauri dev      # Development mode
npm run tauri build    # Production build
```

After launching:

1. Create a new project and choose a template (Research, Reading, Personal Growth, Business, or General)
2. Go to **Settings** → configure your LLM provider (API key, model, endpoint)
3. Go to **Sources** → import documents (PDF, DOCX, MD, XLSX, images, etc.)
4. Watch the **Activity Panel** as the LLM builds wiki pages
5. Use **Chat** to query your knowledge base
6. Browse the **Knowledge Graph** to explore connections

Install the AI agent skill:

```bash
npx skills add https://github.com/nashsu/llm_wiki_skill.git --skill llm_wiki_skill
```

### Alternatives

**Obsidian with Copilot plugin** — If you already use Obsidian for notes, the Copilot plugin adds LLM-powered chat over your vault. It's simpler to set up and doesn't require a separate app, but it's retrieval-based (no compiled wiki), has no knowledge graph analysis, and the LLM integration is bolt-on rather than native. Choose Obsidian+Copilot if you want to enhance an existing note-taking workflow rather than build a dedicated knowledge base.

**Khoj** — An open-source personal AI assistant that indexes your documents and provides chat, search, and agents. Khoj is more mature (three years of development) and runs as a server with web UI rather than a desktop app. It supports more file formats and has better search infrastructure. But it's fundamentally RAG-based — no compiled wiki, no knowledge graph, no incremental maintenance. Choose Khoj if you want a proven, self-hosted AI assistant over your documents without the wiki abstraction layer.

**MemPalace** — Another recent (2026) open-source AI memory system that's gained significant traction (53K stars). MemPalace focuses on conversation memory and retrieval rather than document compilation. It's designed for keeping context across AI interactions rather than building a structured knowledge base from documents. Choose MemPalace if your primary need is maintaining memory across AI conversations rather than synthesizing document collections.

### Verdict

LLM Wiki is the best implementation of Karpathy's llm-wiki pattern available right now, and the 10K stars in eight weeks reflect genuine developer interest in the "compiled knowledge" approach over traditional RAG. The Tauri v2 stack is solid, the knowledge graph with Louvain community detection adds real analytical value, and the agent skill integration means your knowledge base can feed into AI coding workflows.

The main caveat is maturity — this is a fast-moving project from a small team, and the feature velocity suggests the API surface hasn't stabilized yet. Don't build critical workflows on top of it today. But if you're a developer who reads across multiple domains (papers, docs, blog posts, codebases) and wants an LLM to maintain a structured knowledge base for you, LLM Wiki is worth trying now. The desktop app model means zero infrastructure to manage — install, point it at your documents, and let it work.
