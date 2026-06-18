---
name: gpt-image-playground
description: "React + Vite web UI for OpenAI GPT Image 2 API with Agent mode, multi-reference editing, batch generation, and local-first history. 2.5K stars, MIT."
url: https://github.com/CookSleep/gpt_image_playground
stars: 2537
forks: 681
language: TypeScript
tags: ["react", "ai", "image-generation", "openai", "vite"]
featured: false
publishedAt: 2026-06-18
---

## GPT Image Playground

### Overview

GPT Image Playground is an open-source web UI for OpenAI's GPT Image 2 API. Built with React 19, TypeScript, Tailwind CSS, and Vite, it provides a polished interface for AI image generation and editing that goes well beyond what the ChatGPT web interface offers. The repo crossed 2,500 stars and 680 forks since its April 2026 launch, with active development pushing updates multiple times a week.

The project is created by CookSleep, a developer who's been building AI tooling in the Chinese open-source ecosystem. What sets this apart from the dozens of "wrap an API in a nice UI" projects is the depth of engineering. This isn't a weekend hack — the Agent mode alone implements multi-turn conversation with context memory, branching message trees, concurrent batch generation via a `generate_image_batch` tool, and automatic dependency resolution through `continue_generation`. That's real systems design applied to a creative tool.

The core problem it solves: OpenAI's GPT Image 2 is arguably the best image generation model available today, but the official interface is limited. You can't easily manage multiple API configurations, track which parameters actually produced a result, batch-generate variations, or maintain a local history of everything you've created. GPT Image Playground fills all those gaps while running entirely client-side — your images and prompts never touch a third-party server.

### Why it matters

The AI image generation space is moving fast, but the tooling hasn't caught up. Most developers who integrate GPT Image 2 into their workflows are either using the ChatGPT web UI (limited, no API key management) or building their own scripts (time-consuming, no visual feedback). GPT Image Playground sits in the sweet spot: it's a proper application with a responsive UI, but it respects your privacy by storing everything locally in IndexedDB with SHA-256 deduplication.

For fullstack web developers specifically, this project is worth studying as much as it is worth using. The codebase demonstrates modern React 19 patterns, clean TypeScript architecture, Vite build optimization, and thoughtful UX decisions like automatic image dimension normalization (rounding to 16px multiples, total pixel validation) that you'd want in any production image tool. The Docker deployment story is also solid — the built-in Nginx proxy solves CORS issues that trip up most developers when building API-backed web apps.

### Key Features

**Agent Multi-Turn Mode.** This is the headline feature. Instead of one-shot image generation, you can have a conversation with the AI about your images. The Agent understands context, references previous generations with `@` mentions, and can call `generate_image_batch` to produce multiple related images in a single turn. Branching is supported — editing a message creates a new branch you can switch between, and references are scoped to the current branch path to prevent cross-contamination.

**Streaming Generation Preview.** Both the Images API and Responses API modes support receiving intermediate step images as they're generated. This is a practical UX improvement — GPT Image 2 can take 15-30 seconds per image, and seeing progress beats staring at a spinner. The streaming also helps with connection timeout issues on slower networks.

**Multi-Provider Configuration Manager.** You can create and save multiple API configurations (provider, API key, model), switch between them with a dropdown, and even import custom HTTP provider configs via JSON. Built-in support for OpenAI compatible endpoints, fal.ai (with queue support), and custom providers with async task polling. This is essential for developers who work with multiple API relay services or self-hosted endpoints.

**Transparent Background Post-Processing.** GPT Image 2 doesn't support native transparency, but this tool fakes it convincingly. It instructs the model to use solid green or magenta backgrounds, then locally removes the background color and saves as PNG with alpha channel. Works well for icons, stickers, and single-subject assets. The README is honest about the limitations — complex hair edges or semi-transparent materials may have artifacts.

**Actual Parameter Tracking.** Every API response is parsed to extract the real parameters that took effect — actual dimensions, quality level, generation time, and crucially, the model's rewritten prompt. These are displayed alongside your original request with highlighted differences. This alone is invaluable for understanding how GPT Image 2 interprets and modifies your instructions.

**Local-First History with Collection Management.** All history lives in IndexedDB, deduplicated by SHA-256 hash. You get a waterfall gallery view, multi-collection management with drag-and-drop sorting, batch operations (desktop: mouse drag-select and Ctrl/⌘ multi-select; mobile: swipe multi-select), and one-click ZIP export for backup. Deleting a conversation preserves gallery records, and deleting gallery items auto-cleans conversation references.

**Multiple Deployment Options.** Vercel one-click deploy, Cloudflare Workers via built-in Wrangler config, Docker with runtime environment variable injection, GitHub Pages, or plain `npm run build` for any static host. The Docker image includes an Nginx reverse proxy that solves CORS, with options to lock the proxy and hide the real API address from the frontend.

### Use Cases

- **Design iteration workflows** — Upload reference images, generate variations, compare results side-by-side in the gallery, and refine through Agent conversations rather than writing perfect prompts from scratch.
- **Batch asset generation** — Use the Agent's `generate_image_batch` tool to produce icon sets, character variations, or marketing material variants in a single conversation turn.
- **API relay service evaluation** — The multi-provider config manager makes it easy to compare response quality and latency across different GPT Image 2 relay services.
- **Team-shared generation environments** — Deploy via Docker with preset API configs, lock the proxy to hide credentials, and give your team a shared image generation workspace.
- **Learning GPT Image 2 behavior** — The parameter tracking feature shows exactly how the model rewrites your prompts, which is the fastest way to learn how to write effective image generation instructions.

### Pros and Cons

Pros:
- Entirely client-side — no backend required for basic use. All data stays in your browser's IndexedDB with SHA-256 deduplication for efficient storage.
- The Agent mode is genuinely useful, not a gimmick. Multi-turn conversation with context memory and branching makes iterative design work practical.
- Clean React 19 + TypeScript codebase that serves as a reference implementation for building polished AI tool frontends.
- MIT licensed with active maintenance — multiple commits per week, responsive to issues.

Cons:
- Documentation is primarily in Chinese, which creates a barrier for English-speaking developers. The UI supports localization but the README and most community discussion is Chinese-only.
- The transparent background post-processing is a clever hack, not a real solution. Complex edges and semi-transparent materials will show artifacts.
- No built-in authentication or multi-user support for Docker deployments — anyone with access to the URL can use the configured API key.

### Getting Started

```bash
# Clone and install
git clone https://github.com/CookSleep/gpt_image_playground.git
cd gpt_image_playground
npm install

# Run development server
npm run dev

# Or build for production
npm run build
```

For Docker deployment with API proxy:

```bash
docker run -d -p 8080:80 \
  -e DEFAULT_API_URL=https://api.openai.com/v1 \
  -e ENABLE_API_PROXY=true \
  -e API_PROXY_URL=https://api.openai.com/v1 \
  ghcr.io/cooksleep/gpt_image_playground:latest
```

For Vercel, use the one-click deploy button in the repo. For Cloudflare Workers:

```bash
VITE_DEFAULT_API_URL=https://api.openai.com/v1 npm run deploy:cf
```

### Alternatives

**ChatGPT Web Interface** — The official OpenAI interface supports GPT Image 2 generation but is limited to single-image output, no API key management, no local history, and no batch operations. Fine for casual use, inadequate for anyone doing serious image work. Choose it when you just need a quick generation and don't care about workflow.

**DALL-E Playground variants** — Various open-source DALL-E UIs exist (like DALL-E Playground by huangrt13), but most target older DALL-E models and lack GPT Image 2-specific features like reference image editing, mask-based inpainting, and the Agent conversation mode. Choose one of these if you're still using DALL-E 3 and don't plan to upgrade.

**fal.ai Playground** — fal.ai offers their own playground UI, but it's focused on their model marketplace rather than deep GPT Image 2 integration. Better choice if you want to experiment with multiple image models beyond OpenAI's ecosystem.

### Verdict

GPT Image Playground is the best open-source interface for GPT Image 2 right now. The Agent mode alone puts it ahead of everything else — having a multi-turn conversation about your images with context memory and branching is a fundamentally better UX than writing increasingly complex prompts into a text box. The 2.5K stars came fast because the tool actually solves real problems: multi-provider management, parameter tracking, local-first storage, and deployment flexibility. If you're working with GPT Image 2 in any capacity — design, content creation, or building AI-powered apps — this is worth running locally or deploying for your team. The Chinese-first documentation is the main friction point, but the codebase is clean enough to read through.
