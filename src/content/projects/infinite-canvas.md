---
name: infinite-canvas
description: "Open-source infinite canvas workspace for AI image and video creation — built with React 19, Next.js 16, and a Go backend. 960+ GitHub stars in two weeks."
url: https://github.com/basketikun/infinite-canvas
stars: 962
forks: 219
language: TypeScript
tags: ["ai", "canvas", "react", "nextjs", "go", "image-generation", "creative-tools"]
featured: false
publishedAt: 2026-06-04
---

## Infinite Canvas

### Overview

Infinite Canvas (无限画布) is an open-source creative workspace that puts AI image generation, video creation, reference editing, and prompt management on a zoomable, pannable canvas. Think of it as Figma meets Midjourney — except you own the infrastructure, the prompts, and the output. It crossed 960 GitHub stars and 219 forks within two weeks of its May 18, 2026 launch, which is notable for a project that started in the Chinese developer community and is now gaining traction internationally.

The project is built by basketikun, a developer active in the Linux.do community (a Chinese tech forum similar to Hacker News). The architecture is a fullstack split: a Next.js 16 frontend with React 19 handles the canvas UI, state management, and API routing, while a Go backend powered by Gin and GORM manages authentication, model channels, billing, and data persistence. It supports SQLite, MySQL, and PostgreSQL out of the box, and ships as a single Docker container.

The core problem Infinite Canvas solves is workflow fragmentation. If you're iterating on AI-generated images today, you're bouncing between ChatGPT for prompts, Midjourney for generation, Figma for layout, and some local folder for assets. Infinite Canvas collapses that loop. You write prompts, generate images, drag them onto a canvas, connect them visually, edit with reference images, and generate variations — all without leaving the browser. The changelog shows 15 releases in 16 days (v0.0.1 on May 19 through v0.2.1 on June 3), which tells you the maintainers are shipping fast.

### Why it matters

The AI creative tooling space is dominated by closed platforms. Midjourney, DALL-E, and Ideogram all lock you into their interfaces, their billing, and their prompt ecosystems. Infinite Canvas takes the opposite approach: it's a self-hosted frontend that connects to any OpenAI-compatible API. You bring your own API key from ChatGPT, Grok, or any compatible provider, and the tool handles the rest. That's a meaningful shift for developers and creative teams who want control over their AI pipeline.

For fullstack developers, this project is worth studying even if you never use it for image generation. The architecture is a clean example of a modern React + Go application. The frontend uses Zustand for state, TanStack Query for data fetching, Ant Design and shadcn/ui for components, and Tailwind CSS 4 for styling. The backend is a textbook Go REST API with Gin, GORM, and JWT auth. If you're building a complex web app with a canvas-based UI, this is a reference implementation worth bookmarking.

The timing connects to a broader trend: AI agents and creative tools are converging. Infinite Canvas already has a "canvas assistant" feature where you can chat with an AI about selected nodes, generate images from the conversation, and insert results back into the canvas. That's the kind of agent-in-the-loop workflow that every creative tool will adopt within a year.

### Key Features

**Infinite Canvas with Node Graph.** The canvas supports multi-project workspaces with drag-and-drop node placement, zoom, pan, minimap navigation, undo/redo, and import/export. Nodes can be connected with lines to show relationships between images, prompts, and variations. This isn't a flat image grid — it's a spatial workspace where you can organize creative exploration visually.

**AI Image Generation via OpenAI-Compatible APIs.** The tool connects to any provider that implements the OpenAI API spec: ChatGPT, Grok, DeepSeek, or self-hosted models through chatgpt2api, grok2api, flow2api, and newapi. It supports text-to-image, image-to-image, reference image editing, and text Q&A. The model channel system lets admins configure multiple providers with different billing rates.

**Video Generation with Seedance 2.0.** Added in v0.2.0, the video generation feature supports audio input, watermarks, and image/video/audio reference inputs. It integrates with Volcengine's Agent Plan API (火山方舟) for Seedance 2.0 video generation. You can drag video nodes onto the canvas alongside image nodes and connect them in a production pipeline.

**Canvas Assistant (AI-in-the-Loop).** Select one or more nodes on the canvas, open the assistant panel, and have a conversation about your creative direction. The AI can generate new images based on your selected context and automatically insert results as new canvas nodes. This turns the canvas from a passive layout tool into an active creative partner.

**Prompt Library with GitHub Aggregation.** The system pulls prompt collections from multiple open-source GitHub projects and organizes them by use case. The admin panel lets you configure prompt sources and manage the library. As of v0.0.7, it supports batch operations and the awesome-gpt-image2-prompts collection. For teams building prompt engineering workflows, this is a curated starting point.

**User Accounts and Credit System.** Built-in authentication supports username/password registration and Linux.do OAuth. The admin panel includes a credit/compute-point system where different models have different costs, and users see their balance and estimated generation cost before clicking generate. This makes it viable for shared team deployments.

**One-Click Docker Deployment.** The entire stack — Next.js frontend, Go backend, database — runs in a single Docker container via docker-compose. There's also a Deploy to Render button for zero-config cloud deployment. The Next.js app proxies `/api/*` requests to the internal Go service, so the architecture is clean even in a single-container setup.

### Use Cases

- **Solo creators and prompt engineers** who want a spatial workspace for iterating on AI-generated images without paying for Midjourney or being locked into a single provider's interface.

- **Design teams exploring visual concepts** — use the canvas to lay out mood boards, generate variations with different prompts, and connect related ideas spatially. Export the final layout for client presentations.

- **Fullstack developers studying modern React + Go architecture** — the codebase is a clean, well-structured reference for building canvas-based web applications with Zustand state management, TanStack Query, and a Go REST API backend.

- **Self-hosted AI infrastructure builders** who need a frontend for their OpenAI-compatible API endpoints. Connect it to local models via Ollama or to cloud providers, and give your team a visual interface for image generation.

- **Content creators running batch image generation** — the prompt library and multi-model channel system lets you test the same prompt across different providers and compare results side by side on the canvas.

### Pros and Cons

Pros:

- The React 19 + Next.js 16 + Go stack is genuinely modern. This isn't a legacy project with outdated dependencies — it's using the latest versions of everything, including Tailwind CSS 4 and Zustand 5.

- OpenAI API compatibility means you're not locked into any single AI provider. Switch between ChatGPT, Grok, DeepSeek, or self-hosted models without changing your workflow.

- Active development with 15 releases in 16 days. The maintainers are responsive and shipping features at a pace that suggests long-term commitment.

- Self-hosted with Docker means you control your data, your prompts, and your API keys. No usage telemetry, no cloud dependency.

Cons:

- The project is primarily documented in Chinese. The README, changelog, and admin UI are all in Chinese first. English-speaking developers will need translation tools or patience to navigate the codebase and documentation.

- Early stage (v0.2.1) with 7 open issues. The maintainers explicitly warn against production use: "不保证历史数据兼容" (no guarantee of historical data compatibility). Database schema changes are expected.

- The credit/billing system and Linux.do OAuth are tightly coupled to the Chinese developer community. International teams will need to strip these out or adapt them.

### Getting Started

```bash
# Clone and run with Docker (recommended)
git clone https://github.com/basketikun/infinite-canvas.git
cd infinite-canvas
cp .env.example .env
# Edit .env to set your admin credentials
docker-compose up -d

# Access at http://localhost:3000
# Admin panel at http://localhost:3000/admin
```

For local development with source:

```bash
# Clone the repo
git clone https://github.com/basketikun/infinite-canvas.git
cd infinite-canvas
cp .env.example .env

# Run with local build
docker compose -f docker-compose.local.yml up -d --build
```

To configure AI providers, go to Admin > Model Channels and add your OpenAI-compatible API endpoint with your API key. Then navigate to the canvas and start generating.

### Alternatives

**Excalidraw** — The most popular open-source whiteboard tool, but it's focused on hand-drawn diagrams, not AI image generation. Excalidraw is better for wireframing and collaborative sketching. Infinite Canvas is better when your primary workflow involves generating and iterating on AI images.

**ComfyUI** — A node-based interface for Stable Diffusion that gives you fine-grained control over the image generation pipeline. ComfyUI is more powerful for advanced diffusion workflows (ControlNet, LoRA, custom models), but it's desktop-only and has a steep learning curve. Infinite Canvas is web-based, simpler, and focused on the creative exploration phase rather than production diffusion pipelines.

**Krea AI** — A commercial AI creative platform with real-time generation and a canvas interface. Krea is more polished and has better English-language support, but it's closed-source, cloud-only, and requires a subscription. Infinite Canvas is the self-hosted alternative for teams that want to own their infrastructure.

### Verdict

Infinite Canvas is one of the most interesting fullstack projects to come out of the Chinese open-source community in 2026. The tech stack alone — React 19, Next.js 16, Go with Gin, Zustand 5, Tailwind CSS 4 — makes it worth studying as a reference architecture. But the actual product is compelling too: it solves a real problem (fragmented AI creative workflows) with a clean spatial interface that feels natural for visual exploration. The 960 stars in two weeks, mostly organic from the Linux.do community, suggest genuine developer interest rather than marketing-driven growth. The Chinese-first documentation is a real barrier for English-speaking developers, but the code is clean enough to read without docs. If you're building canvas-based web apps or looking for a self-hosted AI creative workspace, give this a serious look.
