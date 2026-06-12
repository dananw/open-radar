---
name: univer
description: "Univer is an open-source isomorphic office SDK for building spreadsheets, documents, and presentations with Canvas rendering and plugin architecture."
url: https://github.com/dream-num/univer
stars: 13000
forks: 1200
language: TypeScript
tags: ["spreadsheet", "office-sdk", "typescript", "canvas", "fullstack"]
featured: false
publishedAt: 2026-06-13
---

## Univer

### Overview

Univer is an open-source isomorphic office SDK for building spreadsheet, document, and presentation editing experiences directly into your own product. With 13,000 GitHub stars and 1,200 forks, it has become one of the fastest-growing productivity-focused libraries in the TypeScript ecosystem over the past year.

The project is developed by DreamNum, a team that has been building office tooling since 2019. They originally created Luckysheet (a spreadsheet-only library) before rewriting the entire architecture from scratch as Univer. That rewrite matters — it means the team has already learned the hard lessons about what works and what breaks when you try to embed office functionality into web applications. The result is a framework that covers spreadsheets, documents, and presentations under a single, unified architecture.

The core problem Univer solves is deceptively simple: if you want to embed a spreadsheet or document editor into your SaaS product, your options are limited. You can use Google Sheets' embed (which gives you zero control), you can license a commercial SDK (which costs $50K–$200K/year), or you can build one from scratch (which takes years). Univer gives you the building blocks to compose exactly the office surface you need, with a plugin architecture that lets you add features incrementally rather than shipping a monolith.

### Why it matters

The embedded office tools market is quietly massive. Every SaaS product that touches data — BI dashboards, project management, CRM, fintech — eventually needs some form of spreadsheet or document editing. The traditional approach has been to either iframe in Google Sheets or pay for a commercial SDK like SpreadJS or Handsontable. Univer disrupts this by offering an Apache-2.0 licensed alternative that's genuinely capable.

What makes Univer particularly interesting in 2026 is the AI angle. The SDK ships with a headless Node.js runtime, meaning you can run the same workbook and document logic on the server that you run in the browser. That's exactly what you need for AI agents that need to read, modify, or generate spreadsheets programmatically. As more products integrate LLM-powered workflows, having an isomorphic office engine becomes a real architectural advantage.

The TypeScript ecosystem has been waiting for something like this. Luckysheet proved there was demand (33K stars on GitHub), but it was spreadsheet-only and had architectural limitations. Univer is the mature, production-ready successor that extends the concept to a full office suite.

### Key Features

**Isomorphic Architecture.** Univer runs the same codebase in the browser and on Node.js. Your frontend renders spreadsheets with full interactivity using Canvas, while your backend can process the same workbook data for server-side calculations, AI agent workflows, or automated report generation. This isn't a bolted-on afterthought — it's the core design principle.

**Canvas-Based Rendering Engine.** Rather than using DOM elements for cells (which falls apart at scale), Univer renders everything on HTML5 Canvas. This means you can have worksheets with hundreds of thousands of cells without the browser choking. The rendering layer is shared across all document types — spreadsheets, docs, and presentations use the same engine.

**Plugin-First Architecture.** Every capability in Univer is a plugin. The formula engine is a plugin. The number formatting is a plugin. The toolbar UI is a plugin. You compose exactly the features you need, which means your bundle size stays proportional to your actual requirements. Need a spreadsheet with formulas but no charts? Skip the charts plugin entirely.

**Built-In Formula Engine.** Univer ships with its own formula engine that supports 400+ functions, including financial, statistical, text, and lookup functions. The engine handles dependency tracking, circular reference detection, and array formulas. It's the same engine running in both the browser and Node.js, so calculations are consistent everywhere.

**Facade API.** The Facade API provides a high-level, stable interface for working with workbooks, worksheets, ranges, documents, and events. Instead of reaching into internal plugin APIs, you interact with a clean surface that abstracts the complexity. This is the API you'll use in production code, and it works identically in browser and server contexts.

**Framework Adapters.** Univer provides first-class integration with React, Vue, and Web Components. The React adapter, in particular, follows idiomatic patterns — you get hooks for accessing the Univer API, and the component lifecycle is properly managed. If you're building a React app, the integration feels natural rather than forced.

**Preset Mode for Fast Integration.** For teams that want to get running quickly, Univer offers curated plugin bundles through `@univerjs/presets`. The Sheets Core preset, for example, gives you a fully functional spreadsheet editor in about 15 lines of code. When you need more control, you can switch to Plugin Mode and compose everything manually.

### Use Cases

- **SaaS products with data workflows** — If your app lets users import, edit, or export tabular data, Univer gives them a real spreadsheet experience instead of a janky HTML table. Think CRM pipelines, inventory management, or financial planning tools.

- **Internal tools and admin dashboards** — Build custom spreadsheet interfaces for your operations team without licensing a commercial SDK. Univer's plugin architecture means you can strip out features your team doesn't need.

- **AI-powered document processing** — Use the headless Node.js runtime to let AI agents read, modify, or generate spreadsheets and documents. The isomorphic design means the agent's output matches exactly what the user sees in the browser.

- **BI and analytics platforms** — Embed interactive spreadsheets alongside charts and dashboards. Univer's Canvas rendering handles large datasets without the performance issues that DOM-based approaches hit.

- **Collaborative editing applications** — Univer's architecture supports real-time collaboration scenarios. The command/event system makes it straightforward to sync changes across multiple users.

### Pros and Cons

Pros:
- Apache-2.0 license means no per-seat fees or commercial licensing headaches. For startups building SaaS products, this eliminates a significant cost center.
- The isomorphic design is genuinely useful for AI workflows. Running spreadsheet logic server-side with the same engine as the client is a real architectural win.
- Plugin architecture keeps bundle sizes reasonable. You only ship the code you actually use, which matters for initial load times.
- Active development with a responsive core team. The project has 500+ contributors and regular releases on a roughly monthly cadence.

Cons:
- Documentation is still catching up to the codebase. The API reference is comprehensive, but guides and tutorials for advanced use cases (custom plugins, server-side processing) are sparse.
- The plugin system has a steep learning curve. While presets make basic integration easy, building custom plugins requires understanding Univer's dependency injection, command system, and lifecycle management.
- Presentation and document editing are less mature than the spreadsheet module. If you specifically need docs or slides, evaluate carefully — the spreadsheet is production-ready, but the other two are catching up.

### Getting Started

```bash
# Install with pnpm (recommended)
pnpm add @univerjs/presets @univerjs/preset-sheets-core

# Import styles
# @univerjs/preset-sheets-core/lib/index.css
```

Create a basic spreadsheet editor:

```ts
import { UniverSheetsCorePreset } from '@univerjs/preset-sheets-core'
import UniverPresetSheetsCoreEnUS from '@univerjs/preset-sheets-core/locales/en-US'
import { createUniver, LocaleType, mergeLocales } from '@univerjs/presets'

import '@univerjs/preset-sheets-core/lib/index.css'

const { univerAPI } = createUniver({
  locale: LocaleType.EN_US,
  locales: {
    [LocaleType.EN_US]: mergeLocales(UniverPresetSheetsCoreEnUS),
  },
  presets: [
    UniverSheetsCorePreset({
      container: 'app',
    }),
  ],
})

univerAPI.createWorkbook({})
```

For server-side headless usage:

```ts
import { createUniver } from '@univerjs/presets'
import { UniverSheetsCorePreset } from '@univerjs/preset-sheets-core'

const { univerAPI } = createUniver({
  presets: [
    UniverSheetsCorePreset(),
  ],
})

const workbook = univerAPI.createWorkbook({})
// Process workbook data server-side
```

### Alternatives

**Handsontable** — A mature, commercial JavaScript spreadsheet library with a polished UI and extensive documentation. Handsontable is more battle-tested in enterprise environments and has better documentation for edge cases, but it costs $999–$8,999 per developer per year and only covers spreadsheets. Choose Handsontable if you need a spreadsheet-only solution with guaranteed enterprise support and your budget can absorb the licensing cost.

**Luckysheet** — Univer's predecessor with 33K GitHub stars. Luckysheet proved the demand for open-source embedded spreadsheets, but it's no longer actively maintained and has architectural limitations around extensibility. If you're starting a new project, go with Univer directly. Only consider Luckysheet if you have an existing integration and can't justify a migration yet.

**SheetJS** — A library focused on reading and writing spreadsheet files (XLSX, CSV, ODS) rather than providing an interactive editor. SheetJS is excellent for file format conversion and data extraction, but it doesn't give you an editing UI. Use SheetJS when you need to parse or generate spreadsheet files, and Univer when you need users to edit them interactively.

### Verdict

Univer is the most complete open-source office SDK available for web developers today. The 13K stars in under two years reflect real demand, not hype — teams building SaaS products have been desperate for a capable, license-free alternative to commercial spreadsheet SDKs. The isomorphic architecture makes it uniquely positioned for the AI-agent era, where server-side document processing is becoming a standard requirement. If you're building a product that needs any form of spreadsheet, document, or presentation editing, Univer should be your first evaluation. The spreadsheet module is production-ready right now, and the rapid development pace suggests the docs and presentation features will catch up within the next few releases.
