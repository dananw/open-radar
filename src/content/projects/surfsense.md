---
name: surfsense
description: "Open source NotebookLM alternative with 15k stars — self-hostable RAG platform with 27+ connectors, 100+ LLMs, real-time collaboration, and AI automations."
url: https://github.com/MODSetter/SurfSense
stars: 14946
forks: 1426
language: Python
tags: ["rag", "ai-agents", "knowledge-management", "nextjs", "fastapi", "open-source"]
featured: false
publishedAt: 2026-06-18
---

## SurfSense

### Overview

SurfSense is the open-source answer to Google's NotebookLM — and in several important ways, it's already better. The project has pulled in nearly 15,000 GitHub stars since its July 2024 launch, with over 1,400 forks signaling that developers aren't just watching from the sidelines. They're building on it. The core pitch is simple: take everything NotebookLM does well (RAG-powered document chat, podcast generation, cited answers), remove the limits, and let you self-host the whole thing on your own infrastructure.

The project is built by MODSetter, a small team that clearly ships fast. The repo shows active commits through June 2026, and the feature list reads like a wishlist from the NotebookLM subreddit. Where NotebookLM caps you at 50 sources per notebook on the free tier and locks you into Google's Gemini models, SurfSense gives you unlimited sources, unlimited notebooks, and support for over 100 LLMs through the OpenAI spec and LiteLLM. The comparison table in their README isn't subtle — it's a direct feature-for-feature teardown of NotebookLM's limitations.

The tech stack is what you'd expect from a modern fullstack AI project: Next.js on the frontend, FastAPI (Python) on the backend, LangChain Deep Agents for the agentic layer, and a RAG pipeline that supports hybrid semantic plus full-text search with hierarchical indices and reciprocal rank fusion. There's also a desktop app built with Tauri that gives you system-wide AI assistance — think global shortcuts, screenshot capture, and local folder sync. It's the kind of breadth that makes you wonder how a small team ships this much.

### Why it matters

NotebookLM proved that people want to chat with their documents. It's one of Google's most successful AI products in terms of organic adoption. But the cracks show fast once you use it daily. Fifty sources per notebook? In a real research workflow, that's a morning. Vendor lock to Gemini? Teams running GPT-4 or Claude or local Ollama models don't want to be told which brain to use. No multiplayer? Knowledge work is collaborative by nature.

SurfSense attacks every one of those constraints. The 27+ connectors — Google Drive, OneDrive, Dropbox, Slack, Notion, GitHub, Discord, Gmail, Linear, Jira, and more — mean your knowledge base actually reflects your work, not just the files you manually uploaded. The real-time multiplayer with RBAC (Owner, Admin, Editor, Viewer) turns it from a solo tool into a team platform. And the AI automations layer — scheduled workflows, event triggers on new documents, chat-built no-code automations — pushes it beyond "fancy search" into actual productivity infrastructure.

For fullstack developers specifically, this is a masterclass in building a modern AI application. The codebase demonstrates how to wire up Next.js with a FastAPI backend, how to implement RAG with multiple retrieval strategies, how to build agentic workflows with LangChain, and how to integrate with dozens of third-party APIs. Reading the source is almost as useful as using the product.

### Key Features

**Unlimited Sources and Notebooks.** NotebookLM caps you at 50-600 sources per notebook depending on your tier, and 100-500 notebooks total. SurfSense removes both limits entirely. For researchers, teams, and anyone managing large knowledge bases, this alone is worth the switch. No more curating which documents make the cut.

**27+ External Connectors.** Sync data from Google Drive, OneDrive, Dropbox, Slack, Microsoft Teams, Linear, Jira, ClickUp, Confluence, Notion, Gmail, YouTube, GitHub, Discord, Airtable, Google Calendar, Elasticsearch, Obsidian, and more. Each connector supports periodic syncing so your knowledge base stays current without manual uploads. The connector write-back feature lets agents post results back to Notion, Slack, Linear, and Drive — closing the loop between reading and acting.

**100+ LLM Support with No Vendor Lock-in.** Configure any LLM through the OpenAI-compatible spec or LiteLLM integration. Run GPT-4, Claude, Gemini, Mistral, or local models via Ollama and vLLM. Embedding model support extends to 6,000+ options with all major rerankers. This flexibility means teams can optimize for cost, speed, or quality without switching platforms.

**Hybrid Search with Hierarchical Indices.** The search layer combines semantic search with full-text search, using reciprocal rank fusion to rank results. This is more sophisticated than NotebookLM's pure semantic approach — it catches keyword matches that embeddings miss and semantic connections that exact text matching overlooks. For technical documentation where specific terms matter, this hybrid approach produces noticeably better results.

**Real-Time Multiplayer Collaboration.** Shared notebooks with real-time chat, comment threads, mentions, and role-based access control. Multiple team members can work in the same knowledge space simultaneously, asking questions and building on each other's queries. This transforms SurfSense from a personal tool into a team knowledge platform.

**AI Automations and Agents.** Three automation modes: scheduled workflows (daily briefs, weekly reports), event-triggered agents (fire when a document lands in a folder), and chat-built no-code automations (describe what you want in plain English). Results can be written back to connected tools like Notion, Slack, and Linear. This is the feature that elevates SurfSense from "fancy RAG chat" to genuine workflow automation.

**Desktop App with System-Wide AI.** A Tauri-based desktop application that provides General Assist (global shortcut to launch from any app), Quick Assist (select text anywhere and ask AI to act on it), Screenshot Assist (capture a region and query it), and Watch Local Folder (auto-sync a local directory to your knowledge base). Point it at your Obsidian vault and every note becomes instantly searchable.

### Use Cases

- **Research and synthesis** — Upload hundreds of papers, reports, and articles, then ask cross-cutting questions with cited answers. Export generated reports to PDF, DOCX, HTML, LaTeX, or EPUB.
- **Team knowledge management** — Sync your company's Slack, Notion, GitHub, and Google Drive into a shared knowledge base where anyone on the team can ask questions and get answers grounded in actual company data.
- **Competitive intelligence** — Connect competitors' websites, social feeds, and public documents. Set up automations that generate weekly competitive analysis reports.
- **Developer documentation** — Import your project's docs, GitHub issues, and Stack Overflow threads. New team members can ask natural-language questions instead of searching through wikis.
- **Meeting follow-up** — Upload meeting recordings or notes, then generate action items, summaries, and follow-up tasks that get posted directly to Linear or Jira via connector write-back.
- **Personal knowledge base** — Sync your Obsidian vault, bookmarks, and reading list. The desktop app's folder watch feature keeps everything current without manual effort.

### Pros and Cons

Pros:
- Genuinely solves NotebookLM's biggest pain points — unlimited sources, no vendor lock, self-hostable, and multiplayer. The feature comparison table isn't marketing fluff; each row represents a real limitation that users hit daily.
- The connector ecosystem is impressive for a project this young. 27+ integrations with write-back support puts it ahead of most enterprise knowledge management tools, not just open-source alternatives.
- The desktop app with system-wide AI assistance is a smart differentiator. No other RAG platform offers this, and the Obsidian vault sync feature alone justifies the install for knowledge workers.

Cons:
- Self-hosting requires Docker and enough hardware to run embedding models and LLM inference (or paid API keys for cloud LLMs). The resource requirements are non-trivial for personal use — expect to need at least 8GB RAM for a decent local setup.
- The project self-describes as "not yet production-ready." For teams considering this as a primary knowledge management tool, that caveat matters. Expect breaking changes and rough edges in the near term.
- Podcast and video generation features exist but are openly acknowledged as inferior to NotebookLM's output quality. If those are your primary use cases, Google still has the edge.

### Getting Started

```bash
# Quick start with Docker (Linux/macOS)
curl -fsSL https://raw.githubusercontent.com/MODSetter/SurfSense/main/docker/scripts/install.sh | bash

# For Windows
irm https://raw.githubusercontent.com/MODSetter/SurfSense/main/docker/scripts/install.ps1 | iex

# Manual setup — clone and run
git clone https://github.com/MODSetter/SurfSense.git
cd SurfSense

# Backend (FastAPI)
cd surfsense_backend
pip install -r requirements.txt
# Configure your .env with LLM credentials
uvicorn main:app --reload

# Frontend (Next.js)
cd surfsense_web
npm install
npm run dev

# Desktop app — download from latest release
# https://github.com/MODSetter/SurfSense/releases/latest
```

### Alternatives

**Google NotebookLM** — The product that proved the category. If you want zero setup, don't care about self-hosting, and are fine with Google's limits (50 sources, Gemini-only), NotebookLM is still the smoother experience. Its podcast generation is better, and the free tier is genuinely useful. Choose it when simplicity beats flexibility.

**AnythingLLM** — Another open-source RAG platform with a focus on local-first deployment. It's simpler than SurfSense and has a smaller feature set, but it's been stable longer and has a more mature self-hosting story. Choose it when you want a lightweight, local RAG tool without the collaboration and automation features.

**Quivr** — Open-source "second brain" with RAG capabilities. Less feature-rich than SurfSense but has a cleaner, more focused API. Good for developers who want to build their own interface on top of a RAG backend rather than use a pre-built UI. Choose it when you want a RAG engine, not a full application.

### Verdict

SurfSense is the most complete open-source NotebookLM alternative I've seen, and the gap is widening with every release. At nearly 15,000 stars with 1,400+ forks, the community momentum is real. The feature set — 27+ connectors, 100+ LLMs, real-time collaboration, AI automations, desktop app — goes well beyond what NotebookLM offers, even on its $250/month Ultra tier. The main trade-off is maturity: this is a fast-moving project that hasn't hit production stability yet. For developers and teams willing to ride that edge, SurfSense offers something no closed-source tool can match: full control over your data, your models, and your workflow. If you're building anything in the RAG, knowledge management, or AI agent space, the source code alone is worth studying. If you're a frustrated NotebookLM user who's hit the limits, this is your off-ramp.
