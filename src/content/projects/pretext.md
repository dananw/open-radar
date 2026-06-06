---
name: pretext
description: "Pretext is a pure JS/TS library for multiline text measurement and layout without DOM reflow — the missing piece for performant web UIs, virtualization, and canvas rendering."
url: https://github.com/chenglou/pretext
stars: 48170
forks: 2687
language: TypeScript
tags: ["text-layout", "performance", "typescript", "canvas", "virtualization"]
featured: false
publishedAt: 2026-06-06
---

## Pretext

### Overview

Pretext is a pure JavaScript/TypeScript library for multiline text measurement and layout that works without touching the DOM. It hit 48,000 GitHub stars in under three months after its March 2026 launch, making it one of the fastest-growing frontend utility libraries of the year.

The library is built by Cheng Lou, a former core member of the React team at Meta who created React Motion and reason-react. If you've been in the React ecosystem long enough, you know Cheng's work — he has a pattern of identifying fundamental problems in web development and shipping minimal, well-engineered solutions. Pretext follows that same philosophy.

The core problem it solves is deceptively simple: figuring out how tall a block of text will be at a given width. On the web, this typically means rendering the text into the DOM, calling `getBoundingClientRect` or reading `offsetHeight`, and triggering a layout reflow in the process. Reflows are one of the most expensive operations a browser can perform — Google's engineering team has documented that a single forced reflow can cost 1-5ms on complex pages, and in UIs with hundreds of text elements (think chat apps, feed interfaces, code editors), those milliseconds compound into visible jank. Pretext sidesteps this entirely by implementing its own text measurement logic using the browser's font engine as ground truth, returning results through pure arithmetic.

### Why it matters

Text measurement is one of those problems that every frontend developer encounters eventually, and every frontend developer solves badly the first time. You need to know how tall a paragraph will be before you render it — for virtualizing a scrollable list, for calculating masonry layouts, for preventing layout shift when new content loads, for flowing text around images. The standard approach is either guess-and-cache (measure after rendering, hope nothing shifts) or use a hidden DOM element (still triggers reflow, just off-screen). Both are hacks.

Pretext eliminates the hack. It gives you a `prepare()` function that does one-time text analysis and measurement, and a `layout()` function that's pure arithmetic — no DOM, no reflow, no canvas calls on the hot path. This unlocks patterns that were previously impractical in browser JavaScript: true virtualization without height estimates, masonry layouts without CSS hacks, text shrink-wrapping that finds the tightest container width, and text flowing around arbitrary shapes.

The broader context matters too. Canvas and WebGL rendering for UI is gaining traction (Figma, Notion's new editor, tldraw), and those renderers have no DOM to measure text against. Pretext can target Canvas, SVG, and eventually server-side rendering, making it the text measurement primitive that the next generation of web UIs needs.

### Key Features

**Zero-Reflow Text Measurement.** The `prepare()` function analyzes and caches segment widths using the canvas font API, returning an opaque handle. The `layout()` function then calculates height and line count through pure arithmetic over those cached widths. You call `prepare()` once per text block and `layout()` as many times as you need — on resize, on container width change, on font load — without ever touching the DOM. This is the killer feature.

**Manual Line Layout with Variable Widths.** `layoutNextLineRange()` lets you lay out text one line at a time, each with a different width. This is what you need for flowing text around floated elements — a feature CSS handles with `float` but JavaScript has never had a clean API for. You can route text around images, callouts, or sidebars using pure JS, targeting Canvas or SVG output.

**Rich Inline Support.** The `@chenglou/pretext/rich-inline` module handles mixed-font inline content — think @mentions, code spans, chips, and styled fragments within a paragraph. Each fragment gets its own font, and atomic items can be marked `break: 'never'` so they never split across lines. This covers the common case of rich-text editors where you need to measure composed text without building a full CSS inline formatting engine.

**Multi-Renderer Output.** Because layout results are pure data (line ranges, widths, cursors), the same measurement can render to DOM, Canvas 2D, SVG, or WebGL. The demos include Canvas rendering examples. Server-side rendering is planned, which would enable sending pre-calculated text layouts from the server — useful for SSR frameworks that want to eliminate layout shift on initial paint.

**Shrink-Wrap and Balanced Text.** The `walkLineRanges()` API lets you speculatively test different widths and check resulting line counts without building string allocations. Binary search a width until the line count looks "nice" and you get balanced multi-line text — a layout effect that CSS `text-wrap: balance` only partially delivers and with inconsistent browser support.

**Whitespace and Word Break Options.** The library handles `white-space: normal` and `white-space: pre-wrap` modes, plus `word-break: keep-all` for CJK text. Soft hyphens are supported as optional break points — unchosen ones stay invisible, chosen breaks materialize as a trailing hyphen. These options mirror CSS behavior, so the measurement stays in sync with your rendered output as long as you pass matching font and line-height values.

### Use Cases

- **Virtualized lists and feeds** — Chat apps, social feeds, and email clients that need to render thousands of messages with varying text lengths. Pretext gives you exact heights before rendering, eliminating placeholder jumps and scroll anchoring problems.
- **Canvas-based editors** — Rich text editors rendering to Canvas (like Notion's or Figma's text layers) need text measurement without DOM access. Pretext's segment-based API was designed for this use case.
- **Masonry and grid layouts** — Pinterest-style layouts where each column's height depends on content height. Pretext lets you calculate text block heights in a tight loop without rendering anything.
- **Responsive text reflow** — Dashboards and data-heavy UIs where text labels, descriptions, or annotations need to reflow on resize. Call `layout()` with the new width — no DOM reads, no reflow cost.
- **SSR layout shift prevention** — Server-render a page with pre-calculated text heights so the client doesn't experience content jumping as fonts load and text reflows.

### Pros and Cons

Pros:
- Solves a real, expensive browser performance problem that has no clean existing solution. Layout reflow is a documented performance bottleneck, and Pretext eliminates it for text measurement entirely.
- The `prepare()` / `layout()` split is elegant — one-time expensive work separated from cheap repeated calls. On resize, you only pay for arithmetic.
- The API is minimal and focused. There's no framework dependency, no virtual DOM, no build-time magic. It's a utility library that does one thing well.
- MIT licensed with 48K stars in three months. Cheng Lou's track record (React Motion, reason-react) gives confidence in long-term API design quality.

Cons:
- 81 open issues suggest the API surface is still evolving. Breaking changes are possible — this is a library in active development, not a settled standard.
- You must keep your `prepare()` font parameter in sync with your CSS. If your font loads asynchronously or your font-size changes, you need to re-prepare. This is a manual responsibility that's easy to get wrong.
- No built-in hyphenation. You insert soft hyphens yourself before calling `prepare()`, which means you need a separate hyphenation library or manual rules for production use.
- The rich-inline module is intentionally narrow — inline-only, `white-space: normal`-only, not a full CSS inline formatting engine. Complex rich-text scenarios may need additional work.

### Getting Started

```bash
# Install
npm install @chenglou/pretext
```

```typescript
import { prepare, layout } from '@chenglou/pretext'

// One-time preparation — measures all text segments
const prepared = prepare(
  'The quick brown fox jumps over the lazy dog. 你好世界 🚀',
  '16px Inter'
)

// Cheap calculation — pure arithmetic, no DOM
const { height, lineCount } = layout(prepared, 320, 24) // 320px max width, 24px line height
console.log(`Height: ${height}px, Lines: ${lineCount}`)
```

```typescript
// Manual line layout for Canvas rendering
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

const prepared = prepareWithSegments('Hello, world!', '18px Helvetica')
const { lines } = layoutWithLines(prepared, 300, 26)

const ctx = canvas.getContext('2d')
ctx.font = '18px Helvetica'
for (let i = 0; i < lines.length; i++) {
  ctx.fillText(lines[i].text, 0, i * 26)
}
```

```typescript
// Shrink-wrap: find the tightest width that fits text
import { prepareWithSegments, walkLineRanges } from '@chenglou/pretext'

const prepared = prepareWithSegments('Find my natural width', '14px Inter')
let maxWidth = 0
walkLineRanges(prepared, 200, line => {
  if (line.width > maxWidth) maxWidth = line.width
})
// maxWidth is now the tightest container width for single-line rendering
```

### Alternatives

**Canvas native `measureText()`** — The browser's built-in `CanvasRenderingContext2D.measureText()` gives you single-line width but doesn't handle multiline text layout, line breaking, or Unicode segmentation. You'd need to build all of that yourself on top of it, which is exactly what Pretext does. Use `measureText()` directly only if you're measuring single-line labels.

**CSS `content-visibility: auto`** — A browser-native approach that skips rendering off-screen content. It reduces paint cost but still triggers reflow when content scrolls into view, and it doesn't give you height values for layout calculations. It's complementary to Pretext rather than a replacement — use Pretext to calculate heights, use `content-visibility` to skip painting.

**Satori** — Vercel's library that converts HTML/CSS to SVG, including text layout. Satori targets a different use case: server-side image generation (OG images, social cards). It implements a full CSS subset. Pretext is narrower (text only) but faster and works client-side for interactive UIs.

### Verdict

Pretext fills a gap that most frontend developers don't realize exists until they hit it. Every virtualized list, every masonry layout, every Canvas-based editor needs to know how tall text will be before rendering it, and the DOM-based workarounds are genuinely expensive at scale. Cheng Lou identified this as a primitive — not a component, not a framework, just the minimal computation needed — and shipped it cleanly.

The 48K stars in three months reflect real demand, not hype. This is the kind of library that gets pulled into other libraries and gradually becomes infrastructure. If you're building any UI that needs text height without DOM measurement — virtualization, canvas rendering, server-side layout calculation, responsive text reflow — Pretext is the tool to reach for. It's small, focused, MIT-licensed, and built by someone with a decade of track record in the React ecosystem. Worth evaluating now, even if the API is still settling.
