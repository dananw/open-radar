---
name: open-notebook
description: "Open Notebook is a self-hosted, privacy-first alternative to Google NotebookLM with 18+ AI providers, podcast generation, and multi-modal research capabilities."
url: https://github.com/lfnovo/open-notebook
stars: 24641
forks: 2876
language: TypeScript
tags: ["ai", "research", "notebook-lm", "self-hosted", "open-source"]
featured: false
publishedAt: 2026-06-05
---

## Open Notebook

### Overview

Open Notebook is an open source, self-hosted alternative to Google's NotebookLM that has quietly amassed over 24,600 GitHub stars since its October 2024 launch. That's a remarkable number for a research tool — it puts it in the same league as some of the most popular developer frameworks on the platform. The project gives you everything NotebookLM does — document ingestion, AI-powered chat, podcast generation — but runs entirely on your infrastructure with support for 18+ AI providers.

The project is built by Luis Novo (lfnovo), a developer who clearly got frustrated with Google's approach to AI research tools. NotebookLM is powerful but locked to Google's models, hosted on Google's servers, and offers no API for automation. Open Notebook flips every one of those constraints. You choose your AI provider (OpenAI, Anthropic, Ollama, Google, Mistral, DeepSeek, and more), you host it yourself, and you get a full REST API for programmatic access.

The tech stack is pragmatic: a Python backend, Next.js/React frontend, SurrealDB for data storage, and LangChain for AI orchestration. Everything runs in Docker, which means setup takes about two minutes. The project uses the Esperanto library to abstract across 18+ AI providers, handling LLM calls, embeddings, speech-to-text, and text-to-speech through a unified interface. That abstraction layer is genuinely useful — switching from OpenAI to a local Ollama model is a configuration change, not a code rewrite.

### Why it matters

Google NotebookLM proved that people want to chat with their documents, generate podcasts from research, and have AI synthesize information across multiple sources. But it also proved that tying a powerful tool to a single vendor creates real friction. NotebookLM uses only Google's models, stores your data on Google's servers, and provides zero API access. For developers, researchers, and anyone working with sensitive information, those are dealbreakers.

Open Notebook fills that gap completely. It's not a toy clone — it's a full-featured platform that in several areas actually exceeds what Google offers. The podcast generation supports 1-4 speakers with custom profiles (NotebookLM is stuck at 2). The content transformations are fully customizable. The REST API means you can integrate it into automated pipelines, build custom frontends, or connect it to other tools.

The 24,600+ stars suggest this resonates. The project hit the GitHub trending page multiple times and maintains active development with a Discord community. For fullstack developers building AI-powered tools, Open Notebook's API-first design and self-hosted architecture make it a compelling foundation layer for research and knowledge management features.

### Key Features

**18+ AI Provider Support.** Through the Esperanto library, Open Notebook connects to OpenAI, Anthropic, Google (GenAI and Vertex AI), Ollama, LM Studio, Groq, Mistral, DeepSeek, Perplexity, xAI, OpenRouter, DashScope (Qwen), MiniMax, and Azure OpenAI. Each provider supports different capabilities (LLM, embeddings, STT, TTS), and the UI shows exactly what's available per provider. This means you can run the entire stack locally with Ollama for zero API costs, or mix providers — say, use Anthropic for chat and a local embedding model for search.

**Multi-Modal Content Ingestion.** Drop in PDFs, videos, audio files, web pages, Office documents, and more. Open Notebook processes each source type appropriately — extracting text from PDFs, transcribing audio/video, parsing web pages. The content becomes searchable and available for AI conversations. No manual transcription or copy-pasting required.

**Professional Podcast Generation.** This is where Open Notebook genuinely outshines NotebookLM. You get 1-4 speakers with custom voice profiles, episode profiles that control tone and format, and full script customization. The YouTube demo showcases a podcast that sounds professional, not robotic. For anyone producing content from research — journalists, educators, marketers — this is a major time-saver.

**Full-Text and Vector Search.** Content is indexed for both keyword and semantic search across all your notebooks. The vector search uses embeddings from your chosen provider, so results improve with better models. You can search across an entire research corpus or narrow to a specific notebook.

**Context-Aware Chat.** When you chat with Open Notebook, it pulls relevant context from your sources automatically. You control exactly what gets shared with the AI model through fine-grained context selection. This is more transparent than NotebookLM's black-box approach to context management.

**REST API.** Every feature is accessible via a comprehensive REST API documented at the `/docs` endpoint. Create notebooks, add sources, trigger transformations, generate podcasts — all programmatically. This is what makes Open Notebook a platform rather than just a tool.

**Self-Hosted with Docker.** The entire stack runs in Docker with a SurrealDB backend. No cloud accounts, no data leaving your infrastructure. The encryption key protects sensitive data at rest. For teams with compliance requirements or privacy concerns, this is non-negotiable.

### Use Cases

- **Developer research and documentation** — Ingest API docs, codebases, design specs, and technical papers into a notebook. Chat with them to understand architectures, find specific patterns, or generate documentation summaries.
- **Content creation from research** — Journalists and writers can feed source materials into Open Notebook and use the podcast generation or note synthesis features to produce content faster. The multi-speaker podcast feature alone saves hours of scripting.
- **Team knowledge bases** — Self-host Open Notebook for your engineering team. Ingest internal docs, runbooks, and post-mortems. New team members can chat with the knowledge base instead of reading dozens of Confluence pages.
- **Academic research** — Load papers, datasets, and notes into a notebook. Use AI to find connections across sources, generate literature review summaries, or explore research questions with full citation tracking.
- **AI-powered content pipelines** — Use the REST API to build automated workflows. Ingest RSS feeds daily, auto-summarize new articles, generate weekly podcast recaps, or build custom frontends for specific research domains.

### Pros and Cons

Pros:
- Complete data sovereignty — everything runs on your infrastructure with no cloud dependencies. Your research never touches third-party servers.
- Provider flexibility is unmatched. Running Ollama locally for zero-cost AI, or switching between providers based on cost and capability, is a configuration change, not a migration project.
- The podcast generation is genuinely better than NotebookLM's, supporting up to 4 speakers with custom profiles and episode templates.
- The REST API makes this a platform, not just an app. You can build custom integrations, automated pipelines, or alternative frontends.

Cons:
- SurrealDB is a less common choice than PostgreSQL or SQLite. Teams already invested in Postgres or MySQL ecosystems will need to manage an additional database.
- The project is community-maintained with 142 open issues. Release cadence is good but enterprise features like SSO, team management, and audit logging are absent.
- Podcast generation quality depends heavily on your chosen TTS provider. The best results require paid providers like ElevenLabs, adding ongoing cost.
- Documentation is functional but could be more comprehensive. Some advanced features like custom content transformations lack detailed guides.

### Getting Started

```bash
# Download the docker-compose file
curl -o docker-compose.yml https://raw.githubusercontent.com/lfnovo/open-notebook/main/docker-compose.yml

# Edit the encryption key (required)
# Change OPEN_NOTEBOOK_ENCRYPTION_KEY=change-me-to-a-secret-string to your own key

# Start the services
docker compose up -d

# Wait 15-20 seconds, then open
# http://localhost:8502
```

To set up with local AI (free, no API keys needed):

```bash
# Use the Ollama example compose file
curl -o docker-compose.yml https://raw.githubusercontent.com/lfnovo/open-notebook/main/examples/docker-compose-ollama.yml

docker compose up -d
```

Access the API documentation at `http://localhost:5055/docs` once running.

### Alternatives

**Google NotebookLM** — The original. Free to use with a Google account, excellent citation quality, and polished UI. But locked to Google's models, no API access, and your data lives on Google's servers. Choose it when you want zero setup and don't care about provider flexibility or self-hosting.

**Notion AI** — Notion's built-in AI features let you chat with your workspace documents and generate content. It's well-integrated if you're already a Notion shop, but it's a closed ecosystem with no self-hosting option and limited AI provider choice. Better for teams already committed to Notion as their knowledge base.

**PrivateGPT** — A simpler open-source tool focused specifically on document Q&A with local models. Less feature-rich than Open Notebook (no podcast generation, basic UI) but lighter weight and easier to deploy. Choose it when you need bare-bones document chat with zero dependencies.

### Verdict

Open Notebook is the best open source research tool available right now. At 24,600+ stars with active development and a growing Discord community, it's proven its staying power. The multi-provider support alone makes it worth running — being able to switch between Claude, GPT-4, Gemini, and local Ollama models without changing anything but a config value is exactly how AI tools should work. The podcast generation is a genuine differentiator that exceeds what Google offers with NotebookLM. For developers building knowledge management features, the REST API makes Open Notebook a solid foundation layer rather than just an end-user tool. If you do any kind of research-intensive work and care about where your data lives, stop using NotebookLM and deploy this instead.
