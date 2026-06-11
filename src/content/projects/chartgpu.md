---
name: chartgpu
description: "ChartGPU is a WebGPU-accelerated charting library that renders 50M data points at 60 FPS — built in TypeScript for React, dashboards, and real-time financial data."
url: https://github.com/ChartGPU/ChartGPU
stars: 3126
forks: 95
language: TypeScript
tags: ["charting", "webgpu", "data-visualization", "typescript", "react", "performance"]
featured: false
publishedAt: 2026-06-11
---

## ChartGPU

### Overview

ChartGPU is a TypeScript charting library that uses WebGPU to render massive datasets at frame rates that would bring Canvas-based libraries to their knees. The headline number is 50 million points at 60 FPS, and the benchmark screenshots showing 35 million points at 72 FPS back it up. It hit 3,000 GitHub stars within five months of its January 2026 launch and is pulling 51,000 monthly npm downloads as of June 2026.

The project is primarily maintained by a single developer (hunterg325, 507 commits) who clearly has deep GPU programming experience. The shader code is written in WGSL, WebGPU's shading language, and the architecture shares GPU devices and pipeline caches across multiple chart instances — the kind of optimization you only see from someone who's actually built rendering engines, not just wrapped D3.

The core problem ChartGPU solves is specific but widespread: existing charting libraries like Chart.js, Recharts, and ECharts all use Canvas 2D or SVG, which hit performance walls around 100K-500K data points. Financial platforms, monitoring dashboards, and scientific visualization tools regularly deal with millions of data points and need real-time streaming updates. The typical workaround is downsampling, which throws away exactly the outliers and anomalies you're trying to see. ChartGPU sidesteps this entirely by moving rendering to the GPU.

### Why it matters

WebGPU landed in Chrome 113 (May 2023) and Safari 18 (September 2024), and adoption is accelerating. This is the first generation of web APIs that give JavaScript direct access to GPU compute and rendering pipelines, not just through WebGL's older abstraction. ChartGPU is one of the first charting libraries to actually exploit this — not as a gimmick, but as a fundamental architectural decision that changes what's possible in browser-based data visualization.

The timing matters because data volumes keep growing. Real-time monitoring dashboards (think Grafana-style) need to render streaming time series with millions of points while updating live. Trading platforms need candlestick charts with years of tick data. Machine learning engineers need scatter plots with millions of points to visualize model behavior. These use cases have been painful or impossible with existing browser charting tools, pushing teams toward native desktop apps or server-side rendering. ChartGPU makes the browser viable for these workloads.

The 51K monthly npm downloads suggest real adoption, not just GitHub star tourism. The React bindings (`chartgpu-react`) lower the integration barrier for teams already in the React ecosystem. And the shared GPU device feature — where multiple charts on the same page share a single GPU context — shows attention to real-world dashboard scenarios, not just benchmark flexing.

### Key Features

**WebGPU Rendering Pipeline.** ChartGPU renders every pixel through GPU shaders written in WGSL, not Canvas 2D or SVG. This means the CPU sends draw commands and data buffers to the GPU, then gets out of the way. The result is 50 million points at 60 FPS — a 100x improvement over Canvas-based libraries for large datasets. The library handles GPU device initialization, shader compilation, and pipeline management internally, so you don't need to know WGSL to use it.

**Six Chart Types with Shared Infrastructure.** Line, area, bar, scatter, pie, and candlestick charts all share the same WebGPU rendering core. The candlestick implementation deserves special mention: it renders 5 million OHLC candles at over 100 FPS with real-time streaming updates. Scatter plots support a density/heatmap mode that bins millions of points on the GPU to reveal distribution patterns invisible in standard scatter plots.

**Streaming Data with appendData().** Instead of re-rendering the entire chart on every update, ChartGPU provides an `appendData()` method that incrementally adds new data points to the GPU buffer. It accepts typed arrays (`Float32Array`, `InterleavedXYData`) for zero-copy performance. This is the right API for real-time dashboards where data arrives as a continuous stream — monitoring systems, live trading platforms, or IoT sensor displays.

**Interactive Annotation Authoring.** Annotations go beyond simple reference lines. You can add horizontal/vertical reference lines, point markers, and text labels — then interactively drag, edit, and delete them with right-click context menus. The system supports undo/redo, custom styling (colors, dash patterns, line widths), and data-space tracking so annotations move with the data when you zoom. This makes ChartGPU usable for analytical tools where users need to mark up charts, not just view them.

**Shared GPUDevice for Multi-Chart Dashboards.** When you have five or six charts on the same dashboard (common in monitoring and financial platforms), each chart typically creates its own rendering context. ChartGPU lets multiple chart instances share a single `GPUDevice` and pipeline cache, deduplicating shader modules and render pipelines across charts. This reduces GPU memory usage and initialization time significantly — the streaming multi-chart dashboard demo shows five live charts with annotations all updating simultaneously at 60 FPS.

**React Bindings.** The `chartgpu-react` package provides a `ChartGPUChart` component that wraps the core library in a React-friendly API. Pass chart options as props, and the component handles GPU device lifecycle, resize observers, and cleanup. This is the integration path for most React and Next.js projects.

**Theme Presets and Custom Theming.** Built-in `'dark'` and `'light'` theme presets cover common use cases, with full custom theme support for brand-specific dashboards. The theming system controls colors, fonts, grid styles, and tooltip appearance.

### Use Cases

- **Real-time monitoring dashboards** — DevOps and SRE teams building custom Grafana-style dashboards can render streaming time-series data (CPU, memory, latency, error rates) across multiple charts without downsampling. The shared GPU device feature keeps resource usage manageable.

- **Financial trading platforms** — Candlestick charts with years of tick data, volume overlays, and interactive annotations for marking support/resistance levels. The 5M candlestick benchmark at 100+ FPS makes this viable for professional trading tools.

- **Machine learning model visualization** — Scatter density mode reveals cluster structure and outlier distributions in million-point datasets. Data scientists can explore model behavior interactively instead of pre-rendering static plots.

- **Scientific data exploration** — Researchers working with large experimental datasets (genomics, astronomy, physics simulations) can visualize millions of data points in the browser without server-side rendering or native desktop tools.

- **IoT and telemetry dashboards** — Sensor networks generating high-frequency data streams need real-time visualization with low latency. ChartGPU's streaming API and GPU rendering handle this without CPU bottlenecks.

### Pros and Cons

Pros:

- Genuinely massive performance improvement over Canvas-based libraries. The 50M point claim is backed by reproducible benchmarks, not marketing hand-waving.
- Clean, modern TypeScript API that feels natural. The `ChartGPU.create()` factory, options object pattern, and React bindings follow established conventions.
- Active development with thoughtful features (shared GPU device, pipeline cache, typed-array data formats) that show the maintainer understands production dashboard requirements.
- MIT licensed with 51K monthly npm downloads, indicating real adoption beyond GitHub star collection.

Cons:

- WebGPU browser support is still limited. Firefox support is incomplete (Windows 114+, Mac 145+, Linux nightly only), which rules out some enterprise environments. Safari 18+ is required for Apple users.
- Single maintainer with 507 commits and 95 forks. Bus factor of one is a real risk for a library that teams might depend on for production dashboards.
- The last commit was May 1, 2026 — six weeks of apparent inactivity. Whether this is a pause or abandonment isn't clear yet.
- No server-side rendering (SSR) support. Charts render in the browser only, which means no chart previews in emails, PDFs, or social media cards.

### Getting Started

```bash
# Install the core library
npm install chartgpu

# For React projects, also install the React bindings
npm install chartgpu-react
```

Basic usage — render a line chart:

```ts
import { ChartGPU } from 'chartgpu';

const container = document.getElementById('chart')!;
await ChartGPU.create(container, {
  series: [{ type: 'line', data: [[0, 1], [1, 3], [2, 2], [3, 5], [4, 3]] }],
});
```

React integration:

```tsx
import { ChartGPUChart } from 'chartgpu-react';

function Dashboard() {
  return (
    <ChartGPUChart
      options={{
        series: [
          { type: 'line', data: [[0, 1], [1, 3], [2, 2]] },
          { type: 'area', data: [[0, 2], [1, 1], [2, 4]] },
        ],
        theme: 'dark',
      }}
    />
  );
}
```

Streaming updates with typed arrays:

```ts
const chart = await ChartGPU.create(container, {
  series: [{ type: 'line', data: initialData }],
});

// Append new data points as they arrive
chart.appendData([{ seriesIndex: 0, data: newPoints }]);
```

### Alternatives

**ECharts** — Apache ECharts is the most feature-complete open-source charting library, with 60K+ GitHub stars and support for every chart type imaginable. It uses Canvas 2D and SVG rendering, which works well up to a few hundred thousand points but degrades significantly beyond that. ECharts has a massive community, extensive documentation, and built-in support for maps, graphs, and 3D charts that ChartGPU doesn't offer. Choose ECharts if you need broad chart type coverage and your datasets stay under 100K points.

**Chart.js** — The most popular charting library on npm (10M+ weekly downloads) with a simple, well-documented API. Chart.js is the right choice for standard business dashboards, reports, and applications where datasets are small to medium. It has a huge plugin ecosystem and works in every browser, including those without WebGPU support. Choose Chart.js if you need maximum compatibility and your data volumes are modest.

**deck.gl** — Uber's WebGL-powered framework for large-scale geospatial visualization. deck.gl handles millions of points on maps using GPU rendering, with React integration via `@deck.gl/react`. It's more specialized than ChartGPU (focused on geospatial data) but has a much larger community and is backed by a major company. Choose deck.gl if your primary use case is map-based visualization with large datasets.

### Verdict

ChartGPU fills a real gap in the browser charting ecosystem. Before WebGPU, rendering millions of data points in the browser meant either downsampling (losing fidelity), server-side rendering (losing interactivity), or native apps (losing the web). ChartGPU proves that WebGPU changes the equation — 50 million points at 60 FPS with interactive zoom, tooltips, and annotations is a legitimate leap forward.

The risks are real: single maintainer, WebGPU browser support still maturing, and a six-week gap in commits as of this writing. This isn't a library you drop into a production enterprise dashboard tomorrow without a fallback plan. But for teams building new monitoring, financial, or scientific visualization tools where data volume is the primary constraint, ChartGPU is worth evaluating seriously. The 51K monthly npm downloads and 3K+ GitHub stars in five months suggest the developer community sees the same potential. If WebGPU adoption continues on its current trajectory, libraries like ChartGPU will go from "interesting experiment" to "obvious choice" within a year.
