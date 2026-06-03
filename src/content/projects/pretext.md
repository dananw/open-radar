---
name: pretext
description: "Pretext is a pure JavaScript/TypeScript library for fast, accurate multiline text measurement and layout without DOM reflow — the missing piece for virtualization, masonry, and dynamic web UIs."
url: https://github.com/chenglou/pretext
stars: 48108
forks: 2685
language: TypeScript
tags: ["text-layout", "performance", "typescript", "frontend", "virtualization"]
featured: false
publishedAt: 2026-06-04
---

## Pretext

### Overview

Pretext is a pure JavaScript/TypeScript library for multiline text measurement and layout. It hit 48,000 GitHub stars within three months of its March 2026 launch, making it one of the fastest-growing frontend libraries of the year. The project has 2,685 forks and an active community already building demos and integrations around it.

The library is created by Cheng Lou, who most developers know as the creator of ReScript (formerly BuckleScript) and a former core contributor to React at Meta. He also created the popular `react-motion` library. That track record matters — this isn't someone discovering text rendering for the first time. Cheng has spent over a decade working on the intersection of programming languages and UI, and Pretext is the culmination of years of thinking about how text should work on the web.

The core problem Pretext solves is deceptively simple: measuring how much space text will take up on screen. On the web, this has historically required rendering the text into the DOM and then reading back its dimensions with `getBoundingClientRect` or `offsetHeight`. Those operations trigger layout reflow, which is one of the most expensive things a browser can do. For an app with thousands of text elements — a chat interface, a document editor, a social feed — reflow becomes a bottleneck that's nearly impossible to optimize around. Pretext sidesteps this entirely by implementing its own text measurement using the browser's canvas font engine as ground truth, then doing all line-breaking in pure arithmetic.

### Why it matters

Text layout is one of those problems that every frontend developer runs into but nobody wants to talk about. Need to virtualize a list of messages with variable-height text? You need to know the height before rendering. Building a masonry layout? Same problem. Implementing a canvas-based editor? You need line positions. Every major web app — Slack, Notion, Figma, Google Docs — has internal tooling for this, but none of it was open source or general-purpose until Pretext.

The library connects to a broader trend in frontend development: moving expensive computations out of the browser's layout engine and into JavaScript where they can be cached, memoized, and optimized. React's concurrent rendering, virtual DOM diffing, and now Pretext's off-DOM text measurement are all part of the same philosophy — don't ask the browser to do work you can do faster yourself. The difference is that text measurement was the one piece nobody had cracked in a general, reusable way.

What makes Pretext particularly interesting right now is the AI angle. With AI coding agents increasingly generating UI code, having a reliable way to verify that text fits within buttons, cards, and labels — without running a browser — becomes a real productivity multiplier. The README even describes the measurement approach as "very AI-friendly" because it uses iterative canvas measurement rather than complex heuristics.

### Key Features

**DOM-Free Text Measurement.** The core innovation: measure how tall a paragraph will be at a given width without ever touching the DOM. The `prepare()` function does a one-time analysis pass that normalizes whitespace, segments the text (correctly handling CJK, emoji, Arabic, and mixed scripts), and caches segment widths using canvas `measureText`. After that, `layout()` is pure arithmetic — no DOM, no reflow, no browser involvement. This alone unlocks use cases that were previously impractical.

**Streaming Line-by-Line Layout.** For advanced use cases, `layoutNextLineRange()` lets you lay out text one line at a time with a different width for each line. This enables text flowing around floated images, variable-width columns, and responsive layouts that adapt as content changes. The cursor-based API means you can pause, resume, or skip lines without processing the entire paragraph.

**Rich Inline Text Support.** The `@chenglou/pretext/rich-inline` module handles inline flow for mixed-formatting content — think chat messages with bold usernames, code spans, and emoji. It manages boundary whitespace collapsing, atomic items (chips, mentions) that shouldn't break across lines, and per-fragment font specifications. This is the kind of detail that most text libraries punt on.

**Comprehensive Unicode Support.** Pretext uses `Intl.Segmenter` for grapheme-aware text segmentation, which means it handles emoji sequences, CJK characters, Arabic bidirectional text, and mixed-script paragraphs correctly. The `wordBreak: 'keep-all'` option works as expected for CJK/Hangul text while maintaining `overflow-wrap: break-word` as a fallback for overlong Latin runs.

**Shrinkwrap and Balanced Layout.** The `walkLineRanges()` API lets you speculatively test different widths without materializing line strings. Binary search for the tightest container width that still produces a "nice" height. This is how you implement balanced text layout, auto-sizing containers, and responsive typography that actually works — not with CSS hacks, but with real measurement.

**Zero-DOM Virtualization Support.** For virtual lists with variable-height items, Pretext gives you exact heights before rendering. No more estimated row heights, no more scroll position jumps when content loads. The `layout()` return includes `height` and `lineCount`, which is everything a virtualizer needs. Libraries like TanStack Virtual and react-window become dramatically simpler to use with Pretext in the loop.

**Framework-Agnostic Rendering Targets.** Pretext measures text and gives you line positions. It doesn't care whether you render to DOM, Canvas, SVG, or WebGL. The manual layout APIs (`layoutNextLineRange`, `materializeLineRange`) give you line text and positions that you can render anywhere. Server-side rendering is on the roadmap.

### Use Cases

- **Virtualized chat and messaging apps** — Measure message heights before rendering to eliminate scroll jump and enable smooth infinite scroll. Apps like Slack, Discord, and Teams handle thousands of messages with variable content length.

- **Masonry and Pinterest-style layouts** — Get exact card heights based on text content without rendering the cards first. The `walkLineRanges()` binary search pattern finds the optimal column width that produces balanced heights.

- **Canvas-based document editors** — Render text on canvas with correct line breaking and cursor positioning. Pretext's manual layout API gives you exact x/y coordinates for each line without any DOM involvement.

- **AI-generated UI verification** — Check that generated labels, buttons, and card text fits within design constraints at build time or in CI, without a browser. This is increasingly relevant as AI agents generate UI code.

- **Responsive typography** — Dynamically adjust container widths, font sizes, or content based on actual measured text dimensions rather than CSS approximations. The `measureNaturalWidth()` API returns the tightest possible width for a paragraph.

### Pros and Cons

Pros:

- Solves a real, long-standing problem in web development that no other open-source library has addressed at this level of completeness and accuracy.
- Created by Cheng Lou (ReScript, react-motion), with deep expertise in both programming language design and UI systems. The API surface reflects years of refinement.
- 48K stars in three months signals massive community validation. The demo ecosystem is already growing with creative use cases from the community.
- Pure arithmetic hot path means performance scales linearly with text length, not with DOM complexity. No layout thrashing, no forced synchronous layouts.
- Excellent Unicode support including CJK, Arabic bidirectional text, emoji sequences, and mixed-script paragraphs using `Intl.Segmenter`.

Cons:

- Requires `Intl.Segmenter` and Canvas 2D text measurement. Older browsers or runtimes without these APIs are unsupported. Node.js needs a canvas polyfill for server-side use.
- No built-in automatic hyphenation. You need to insert soft hyphens yourself before calling `prepare()` for hyphenated text. Locale-aware hyphenation is left to the caller.
- `system-ui` font is unsafe for accurate measurements on macOS. You must use named fonts, which adds a constraint for apps that rely on system font stacks.
- The API is low-level by design. If you just want "tell me the height," the two-step `prepare()` → `layout()` flow is simple enough, but advanced features like rich inline flow and variable-width layout have a learning curve.
- CSS features like `font-optical-sizing`, `font-feature-settings`, and standalone `font-variation-settings` are not modeled separately. Variable font axes only help when reflected in the canvas font string.

### Getting Started

```bash
# Install
npm install @chenglou/pretext

# Basic usage: measure paragraph height without DOM
```

```typescript
import { prepare, layout } from '@chenglou/pretext'

// One-time preparation: segment text, measure segments via canvas
const prepared = prepare(
  'The quick brown fox jumps over the lazy dog. 春天到了 🚀',
  '16px Inter'
)

// Cheap hot path: pure arithmetic, no DOM involvement
const { height, lineCount } = layout(prepared, 320, 24)
// height: total paragraph height in px
// lineCount: number of wrapped lines
```

```typescript
// Manual line-by-line layout for Canvas rendering
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

const prepared = prepareWithSegments('Your paragraph text here', '18px "Helvetica Neue"')
const { lines } = layoutWithLines(prepared, 400, 26)

for (const line of lines) {
  ctx.fillText(line.text, 0, y)
  y += 26
}
```

```typescript
// Shrinkwrap: find the tightest width that fits text
import { prepareWithSegments, walkLineRanges } from '@chenglou/pretext'

const prepared = prepareWithSegments(text, '16px Inter')
let maxWidth = 0
walkLineRanges(prepared, 600, line => {
  if (line.width > maxWidth) maxWidth = line.width
})
// maxWidth is now the minimum container width
```

### Alternatives

**Canvas Text Metrics API (native)** — The raw `CanvasRenderingContext2D.measureText()` gives you single-line text width, but doesn't handle multiline wrapping, line breaking, or paragraph layout. You'd need to implement all of that yourself. Pretext is essentially what you'd build if you spent months making `measureText` work for real-world paragraphs — except it handles Unicode edge cases correctly.

**DOM measurement (getBoundingClientRect)** — The traditional approach: render text invisibly, read its dimensions, then position it for real. Works, but triggers layout reflow, which is O(n) with the number of DOM elements. For apps with thousands of text items, this becomes the primary performance bottleneck. Pretext eliminates this by never touching the DOM for measurement.

**react-textarea-autosize** — A React component that auto-sizes textareas by measuring content with hidden DOM elements. Solves a narrower problem (textarea height) with the same DOM reflow overhead. If all you need is textarea sizing in React, it's simpler. If you need general-purpose text measurement for virtualization, canvas rendering, or non-DOM targets, Pretext is the better tool.

### Verdict

Pretext is the kind of library that makes you wonder why it didn't exist years ago. Text measurement without DOM reflow is a problem every frontend developer hits eventually, and the solutions have always been hacky — hidden divs, cloning nodes, estimating with character counts. Pretext replaces all of that with a clean, well-designed API that handles real-world Unicode correctly. The 48K stars in three months reflect genuine developer demand, not hype. If you're building anything with virtualized text, canvas-based rendering, or dynamic layouts where text height matters, this is the library to reach for. The API is low-level enough that you'll spend an afternoon learning it, but the performance payoff is substantial — especially for apps where layout reflow is your bottleneck. Cheng Lou's track record with ReScript and React gives me confidence this will be maintained and thoughtfully evolved.
