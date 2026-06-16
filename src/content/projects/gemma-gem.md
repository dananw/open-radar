---
name: gemma-gem
description: "Gemma Gem runs Google's Gemma 4 model entirely in your browser via WebGPU — a privacy-first Chrome extension for on-device AI that reads pages, fills forms, and executes JS."
url: https://github.com/kessler/gemma-gem
stars: 931
forks: 102
language: TypeScript
tags: ["webgpu", "browser-extension", "on-device-ai", "gemma4", "privacy"]
featured: false
publishedAt: 2026-06-16
---

## Gemma Gem

### Overview

Gemma Gem is a Chrome extension that runs Google's Gemma 4 model entirely on-device using WebGPU. No API keys. No cloud calls. No data leaving your machine. It reads pages, clicks buttons, fills forms, executes arbitrary JavaScript, and answers questions about any site you visit — all from a ~500MB model cached locally in your browser.

The project is created by Kessler, a developer who's clearly been watching the WebGPU inference space mature and decided to build something practical with it. With 931 stars and growing since its April 2026 launch, it's still early days, but the traction makes sense. Every week another developer realizes that shipping user data to a cloud API for basic page comprehension is both expensive and unnecessary. Gemma Gem is one of the cleanest implementations of the "just run it locally" philosophy I've seen in the browser extension space.

The technical approach is worth understanding. The extension uses three layers: an offscreen document hosting the Gemma 4 model via Hugging Face's transformers.js library with WebGPU acceleration, a service worker that routes messages and handles screenshots, and a content script that injects the chat UI and executes DOM tools. The model comes in two sizes — E2B at roughly 500MB and E4B at 1.5GB — both quantized to q4f16 with 128K context windows. First load downloads the model; after that it's instant.

### Why it matters

Browser-based AI inference has been "almost ready" for two years. WebGPU shipped in Chrome 113, transformers.js added WebGPU backends, and ONNX runtime got browser support — but very few developers shipped actual products that regular people could use. Most demos were toy examples running small models on simple prompts. Gemma Gem is different because it's a real tool that does real work on real websites.

The privacy angle matters more than most developers admit. Every AI browser extension that sends page content to a cloud API is creating a surveillance surface. Your browsing history, your banking pages, your medical records, your private messages — all flowing through someone else's servers. For individual developers this might be acceptable. For enterprise teams, it's often a non-starter. Gemma Gem eliminates that entire category of risk by keeping everything local.

There's also a cost argument. Cloud AI APIs charge per token. If you're building a browser extension that needs to understand page content — for accessibility, testing, scraping, or automation — those costs add up fast. A one-time model download that runs indefinitely on the user's hardware changes the economics completely.

### Key Features

**On-Device WebGPU Inference.** The Gemma 4 model runs entirely in the browser's WebGPU context, which means it gets hardware acceleration on any machine with a modern GPU. No server, no API key, no latency of a network round-trip. The E2B model loads in seconds on a decent connection and runs inference at usable speeds for interactive chat.

**Full DOM Interaction Suite.** The extension exposes six tools to the model: read page content (text or HTML of any CSS selector), take screenshots, click elements, type text into inputs, scroll pages, and run arbitrary JavaScript in the page context. This isn't just a chatbot that reads text — it's a genuine browser automation agent that can navigate multi-step workflows.

**128K Context Window.** Gemma 4 ships with a 128K token context window, which means the model can hold a substantial chunk of a complex web application in memory at once. For developers testing SPAs or analyzing dense documentation pages, this is the difference between useful and useless.

**Shadow DOM Chat UI.** The interface injects as a shadow DOM overlay, which means it can't accidentally conflict with the host page's styles or scripts. Click the gem icon in the bottom-right corner or hit Alt+G to toggle. The chat renders markdown via marked.js and streams tokens as they're generated.

**Configurable Model Selection.** Switch between the E2B (~500MB) and E4B (~1.5GB) models from the settings panel. The selection persists across sessions. You can also toggle Gemma 4's native thinking mode, adjust max tool-call iterations, and rebind keyboard shortcuts — all stored locally.

**Zero Data Exfiltration.** This is a feature, not a limitation. Every byte stays on your machine. For developers working with sensitive pages — banking dashboards, healthcare portals, internal admin panels — this removes an entire class of compliance headaches. No DPA needed. No data processing agreements. No trust required.

### Use Cases

- **Browser testing and QA** — Ask the extension to navigate a multi-step checkout flow, fill forms with test data, and verify that error states display correctly. The DOM tools make this practical without writing Playwright scripts.
- **Accessibility auditing** — Read page content through the model's eyes. Ask it to identify missing alt text, evaluate heading hierarchy, or check color contrast issues. It sees what a screen reader would see.
- **Web scraping and data extraction** — Point the model at a complex page and ask it to extract structured data. The `run_javascript` tool lets the model build its own scraping logic on the fly.
- **Rapid prototyping and exploration** — When you land on a new web app or API documentation, ask the model to summarize the page structure, identify key interactive elements, or explain what a particular section does.
- **Form automation** — The click and type tools let the model fill out multi-step forms. Useful for repetitive data entry tasks where writing a full automation script isn't worth the effort.

### Pros and Cons

Pros:
- Genuinely private — zero network calls after model download. This is rare in the browser AI space and matters for anyone working with sensitive data.
- The DOM interaction tools are well-designed and cover the common cases. Most browser AI extensions can only read text; this one can actually act on the page.
- WebGPU inference is surprisingly fast for a quantized 2B parameter model. On a MacBook Pro M-series or a machine with a discrete GPU, response times feel interactive.
- The WXT framework makes the codebase clean and maintainable. Chrome extension development is usually painful, but WXT abstracts the worst parts.

Cons:
- 500MB model download is a real barrier. Users on slow connections or limited storage will think twice. There's no streaming download or progressive loading.
- Single developer with 29 commits. The bus factor is one. For a tool that might become part of someone's workflow, that's a risk worth acknowledging.
- WebGPU support is Chrome-only for now. Firefox and Safari users are out of luck, and WebGPU adoption outside Chrome is still limited.
- The E2B model is small enough that complex reasoning tasks can struggle. Multi-step DOM manipulation with conditional logic sometimes requires multiple attempts.

### Getting Started

```bash
# Clone the repository
git clone https://github.com/kessler/gemma-gem.git
cd gemma-gem

# Install dependencies
pnpm install

# Build the extension (development mode with logging)
pnpm build

# Load in Chrome:
# 1. Open chrome://extensions
# 2. Enable Developer Mode
# 3. Click "Load unpacked"
# 4. Select the .output/chrome-mv3-dev/ directory

# Production build (minified, no debug logs)
pnpm build:prod
```

Once loaded, navigate to any page and click the gem icon in the bottom-right corner. The first launch downloads the model (E2B by default, ~500MB). After that, it loads from the browser cache. Hit Alt+G to toggle the chat from anywhere on the page.

### Alternatives

**Browser Use** — A Python-based browser automation framework that uses cloud LLMs to control Playwright instances. More powerful for complex multi-page workflows because it has access to a full browser automation API, but requires a server running locally or in the cloud and sends page content to external APIs. Choose Browser Use when you need headless automation at scale; choose Gemma Gem when privacy matters and you want something that runs entirely in the browser.

**Selenium + ChatGPT integration** — The traditional approach: wire up Selenium or Puppeteer to a cloud LLM API and build custom prompts for each page interaction pattern. More flexible and battle-tested, but requires writing code for each use case and paying per token. Choose this when you need production-grade automation with custom logic; choose Gemma Gem when you want a quick, zero-config AI assistant for ad-hoc page interactions.

**Page Assist** — A browser extension that connects to local Ollama models for web page Q&A. Similar privacy guarantees since it runs locally, but it only reads page text — no DOM interaction tools, no clicking or form filling. Choose Page Assist when you want a simpler setup with Ollama's broader model selection; choose Gemma Gem when you need the model to actually do things on the page.

### Verdict

Gemma Gem is the kind of project that makes you rethink what's possible in a browser extension. Running a 2B parameter model with full DOM interaction tools entirely client-side was science fiction two years ago. Now it's a 500MB download and a Chrome flag away. The 931-star count feels low for what this actually delivers — most developers haven't tried WebGPU inference in a production context yet, and this is one of the best entry points. If you're building browser extensions, testing web apps, or just want a private AI assistant that can actually interact with pages, this is worth the disk space. The main risk is the solo maintainer situation, but the codebase is clean enough to fork if needed. For fullstack developers who spend their days in the browser, this is a tool that earns its place in the toolbar.
