---
name: page-agent
description: "Page Agent is an in-page JavaScript GUI agent by Alibaba that controls web interfaces with natural language — no browser extensions or headless browsers needed."
url: https://github.com/alibaba/page-agent
stars: 18506
forks: 1591
language: TypeScript
tags: ["ai-agent", "browser-automation", "typescript", "mcp", "web"]
featured: false
publishedAt: 2026-06-12
---

## Page Agent

### Overview

Page Agent is an open-source JavaScript library that turns any webpage into an AI-controllable interface. You add a script tag, point it at an LLM, and suddenly users can interact with your web app through natural language. No browser extensions. No Python backend. No headless browser. Just in-page JavaScript. It's hit 18,500 GitHub stars since its September 2025 launch, with the bulk of that growth coming in early 2026 after the v1.8 release added MCP server support.

The project comes out of Alibaba's frontend infrastructure team. The lead contributor, gaomeng1900, has over 930 commits on the repo, which tells you this is a serious internal effort that got open-sourced, not a weekend hack. Alibaba runs some of the largest web applications in the world — Taobao, Tmall, Alibaba Cloud console — so the design decisions here are informed by real-scale web app problems, not toy demos.

The core problem Page Agent solves is deceptively simple: how do you let an AI interact with a web page? The obvious approaches all have problems. Browser extensions require installation and can't be embedded in your product. Playwright and Puppeteer need a server-side runtime and a headless browser. Screenshot-based vision agents are slow, expensive, and unreliable on dynamic UIs. Page Agent takes a different approach — it reads the DOM as text, builds a semantic map of interactive elements, and uses function calling to click buttons, fill forms, and navigate. No screenshots. No vision models required. This makes it fast (sub-second interactions) and cheap (text-only LLM tokens).

### Why it matters

We're in the middle of a shift where every SaaS product is expected to have an AI copilot. Not a chatbot sidebar that hallucinates answers — a real agent that can navigate your UI, fill out forms, and complete multi-step workflows. The problem is that building one from scratch is a multi-month project. You need to instrument your entire UI, build action schemas, handle state management, and deal with the fragility of DOM selectors. Page Agent compresses that timeline to hours.

The MCP server angle is what makes this particularly timely. Model Context Protocol has become the de facto standard for connecting AI tools to external systems, and Page Agent's MCP server means any MCP-compatible client — Claude Desktop, Cursor, custom agents — can control a browser session through Page Agent. You're not just building an in-app copilot anymore. You're building a browser automation endpoint that any AI tool can talk to.

For fullstack developers working with React, Vue, or vanilla JS, the integration story is genuinely minimal. The library is 7KB gzipped. It works with any framework because it operates on the DOM, not on framework internals. And because it's text-based, you don't need to route screenshots through expensive multimodal APIs. A $0.001 GPT-4o-mini call can complete a form-filling task that would take a vision model 10x more tokens.

### Key Features

**Text-Based DOM Manipulation.** Page Agent reads the page's DOM tree and converts it into a compact text representation that LLMs can understand. It identifies interactive elements — buttons, inputs, links, dropdowns — and maps them to callable functions. No screenshots, no pixel coordinates, no vision models. This approach is faster, cheaper, and more reliable than screenshot-based alternatives. The text representation also handles dynamic content: when the DOM changes, the agent re-scans and updates its understanding.

**Bring Your Own LLM.** The library is model-agnostic. Point it at OpenAI, Anthropic, Qwen, DeepSeek, a local Ollama instance, or any OpenAI-compatible API endpoint. You control the model, the API key, and the cost. The demo ships with a free testing API from Alibaba's Dashscope, but production usage means using your own keys. This is important for enterprise teams that can't send page content to third-party APIs.

**One-Line Integration.** Add a script tag to your page and you have a working agent. That's the pitch, and it actually delivers. The IIFE build auto-initializes and creates a floating chat widget. For more control, the npm package gives you a `PageAgent` class you can instantiate with custom configuration — model selection, language, container element, custom system prompts. The bundle is 7KB gzipped, which is smaller than most analytics scripts.

**Chrome Extension for Multi-Page Tasks.** The in-page agent is scoped to a single page by design. The optional Chrome extension extends agent reach across tabs, enabling multi-page workflows. Think: log into an admin panel, navigate to the settings page, update a configuration, and verify the change — all through a single natural language instruction. The extension communicates with the page agent instances via message passing.

**MCP Server (Beta).** The built-in MCP server exposes Page Agent as a tool that any MCP-compatible client can call. This means Claude Desktop can control a browser session. Cursor can automate UI testing. A custom agent framework can orchestrate web workflows alongside code generation and file manipulation. The MCP server wraps the page agent's action primitives — click, type, scroll, navigate — into standardized tool definitions.

**Framework Agnostic.** Because Page Agent operates on the DOM level, it works with React, Vue, Angular, Svelte, vanilla JS, or any framework that renders to the DOM. It doesn't hook into React's virtual DOM or Vue's reactivity system. It reads the rendered output and interacts with it like a user would. This means zero framework-specific configuration and no version compatibility headaches.

### Use Cases

- **SaaS AI copilot** — Add an AI assistant to your existing web application that can actually perform actions, not just answer questions. Users type "export last month's report as PDF" and the agent navigates the UI to make it happen. Ship it in a day instead of building custom instrumentation.

- **Internal tool automation** — Enterprise admin panels, ERP systems, and CRM dashboards often have complex multi-step workflows. Page Agent lets employees describe what they want in plain language instead of clicking through 15 screens. Particularly valuable for systems where building a custom API isn't justified.

- **Accessibility layer** — Any web app becomes voice-controllable through natural language. Users who can't use a mouse or navigate complex UIs can describe their intent and the agent executes it. No accessibility overlay snake oil — real programmatic interaction with the page.

- **Automated QA and testing** — Write test scenarios in natural language instead of brittle selector-based scripts. "Navigate to the checkout page, add item X to cart, apply coupon SAVE20, and verify the discount appears." The agent adapts to UI changes automatically because it understands semantics, not selectors.

- **MCP-powered browser automation** — Connect your AI agent framework to live web applications. An MCP-compatible agent can search documentation, fill out forms on third-party sites, or scrape structured data — all through the standardized MCP interface.

### Pros and Cons

Pros:
- The text-based approach is genuinely clever. By avoiding screenshots and vision models, Page Agent cuts API costs by 10-50x compared to screenshot-based agents like Browser Use. Interactions complete in under a second on a decent LLM.
- 7KB gzipped with zero dependencies makes this one of the lightest AI integrations you can add to a web app. No server component needed for basic usage.
- Backed by Alibaba's frontend team with 930+ commits from the lead maintainer and releases every 2-3 weeks. This isn't going to be abandoned next quarter.

Cons:
- Complex single-page applications with heavy custom rendering (canvas-based UIs, virtualized lists with thousands of items) can challenge the DOM text extraction. The agent works best with standard HTML form elements and semantic markup.
- The MCP server is still in beta and the documentation for advanced integration scenarios is sparse. You'll be reading source code for anything beyond basic usage.
- The free demo API sends your page content to Alibaba's servers. Production usage requires your own LLM API key, which means you need to handle key management and cost monitoring yourself.

### Getting Started

```bash
# Install via npm
npm install page-agent

# Or add directly to HTML (demo mode with free testing API)
# <script src="https://cdn.jsdelivr.net/npm/page-agent@1.9.0/dist/iife/page-agent.demo.js"></script>
```

For programmatic usage with your own LLM:

```javascript
import { PageAgent } from 'page-agent'

const agent = new PageAgent({
    model: 'gpt-4o-mini',         // or qwen3.5-plus, claude-3-5-haiku, etc.
    baseURL: 'https://api.openai.com/v1',
    apiKey: 'YOUR_API_KEY',
    language: 'en-US',
})

// Execute a natural language instruction
await agent.execute('Click the login button')

// Fill a form
await agent.execute('Fill in the email field with test@example.com and click Submit')

// Multi-step workflow
await agent.execute('Navigate to Settings, change the theme to dark mode, and save')
```

The agent automatically scans the DOM, identifies interactive elements, and maps them to LLM function calls. No selector configuration needed.

### Alternatives

**Browser Use** — A Python-based browser automation framework that uses screenshots and vision models to understand web pages. More powerful for complex visual layouts (dashboards with charts, non-standard UIs) but requires a Python server, a headless browser, and multimodal LLM calls that cost 10-50x more per interaction. Choose Browser Use when you need server-side automation or your UI doesn't render to standard HTML.

**Playwright MCP** — Microsoft's Playwright now ships with an MCP server that provides raw browser control (navigation, clicking, typing) to AI agents. Lower-level than Page Agent — you get the primitives but no semantic understanding of the page. You'll need to build your own DOM-to-text extraction and action planning logic. Choose Playwright MCP when you need full browser control and are willing to build the agent layer yourself.

**LaVague** — An open-source web agent framework that combines vision models with Selenium for browser automation. More oriented toward research and complex multi-step web tasks than product integration. Heavier runtime requirements and slower execution due to screenshot-based understanding. Choose LaVague for research use cases or when you need to interact with pages that don't have clean DOM structure.

### Verdict

Page Agent is the most practical approach to in-browser AI automation I've seen. The text-based DOM manipulation strategy is the right tradeoff — you lose some visual understanding but gain speed, cost efficiency, and simplicity that make product integration actually feasible. At 18,500 stars and with Alibaba's engineering resources behind it, this isn't going anywhere. The MCP server is the real sleeper feature: once it exits beta, any MCP-compatible AI tool gains browser control capabilities through a standardized interface. If you're building a SaaS product and want to add an AI copilot without a six-month engineering project, Page Agent deserves a serious look. Start with the script tag demo on a staging page and see how it handles your UI — you'll know within an hour if it's viable.
