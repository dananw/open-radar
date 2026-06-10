---
name: tegaki
description: "Tegaki turns any font into animated handwriting for the web — no path authoring, no native deps. Works with React, Vue, Svelte, Solid, and Astro."
url: https://github.com/KurtGokhan/tegaki
stars: 2792
forks: 109
language: TypeScript
tags: ["animation", "react", "typescript", "frontend", "svg"]
featured: false
publishedAt: 2026-06-10
---

## Tegaki

### Overview

Tegaki (手書き, Japanese for "handwriting") is a TypeScript library that turns any font into a stroke-by-stroke handwriting animation on the web. It crossed 2,700 GitHub stars in under three months since its March 2026 launch, with nearly 9,000 monthly npm downloads — numbers that suggest real adoption beyond the initial launch spike.

The project is built entirely by Gökhan Kurt (KurtGokhan), a developer who's contributed 199 of the repo's 200+ commits. That single-maintainer density is both a strength and a risk, but the code quality is notably high — the library uses HarfBuzz for font shaping, ships with Playwright-based visual regression tests, and has a clean modular architecture with separate entry points for each framework.

The core problem Tegaki solves is deceptively simple: making text appear as if it's being handwritten in real time. Existing solutions either require manual SVG path authoring (tedious and brittle), rely on heavy animation libraries like GSAP (overkill for this use case), or only work with specific pre-baked fonts. Tegaki takes a different approach — it parses any OpenType or TrueType font at runtime, extracts glyph outlines, decomposes them into drawable strokes, and animates them with natural timing. No manual path work. No native dependencies. Just `npm install tegaki` and you're drawing text.

### Why it matters

Web animation libraries have been around for over a decade, but the handwriting niche has always been awkward. CSS animations can fade and slide, but they can't simulate the organic motion of a pen forming letters. SVG path animation can, but creating those paths manually for every glyph in every font you want to use is grunt work nobody wants to do.

Tegaki bridges that gap by automating the entire pipeline. You pick a font, write some text, and the library handles glyph decomposition, stroke ordering, and timing. The result looks genuinely convincing — not robotic or mechanical, but like someone is actually writing with a pen. For landing pages, educational content, presentations, or any UI where you want to add personality, this fills a real creative gap.

The timing matters too. The web platform is moving toward richer, more expressive interfaces. Tools like Framer Motion made complex React animations accessible. Tegaki does the same for handwriting specifically, and its framework-agnostic core means it works whether you're on React, Vue, Svelte, Solid, or even vanilla JS with Web Components. That breadth of support in a v0.18 library is unusual and signals thoughtful architecture.

### Key Features

**Any Font, No Manual Paths.** Tegaki parses OpenType and TrueType font files directly, extracting glyph outlines and converting them into animatable stroke sequences. You don't need to trace SVG paths by hand or use a separate tool to prepare your fonts. Point it at a `.ttf` or `.otf` file and it figures out the rest. The library uses HarfBuzz (via WASM) for proper text shaping, so complex scripts like Arabic, Devanagari, and Japanese work correctly.

**Framework-Agnostic Architecture.** The core engine is pure TypeScript with zero framework dependencies. Separate entry points provide first-class adapters for React, Vue, Svelte, SolidJS, Astro, and Web Components. Each adapter is a thin wrapper — `tegaki/react` exports a `TegakiRenderer` component, `tegaki/vue` does the same for Vue's template system. You can also use `tegaki/core` directly for vanilla JS or custom integrations.

**Natural Stroke Timing.** The animation doesn't just draw paths linearly. Tegaki applies configurable easing and timing to each stroke segment, producing motion that mimics how a human hand actually moves — faster on straight segments, slower on curves, with slight pauses between strokes. The default timing works well out of the box, but you can customize duration, delay, and easing per character or per stroke.

**Eight Built-in Handwriting Fonts.** The library ships with eight fonts covering Latin, Hebrew, Arabic, Devanagari, and Japanese scripts. Caveat, Italianno, Tangerine, Parisienne, Suez One, Amiri, Tillana, and Klee One are all included and ready to import. For other fonts, there's an interactive web-based generator at gkurt.com/tegaki/generator/ that creates a custom font bundle you can drop into your project.

**Remotion and Sli.dev Integrations.** Tegaki works with Remotion (the React-based video creation framework) to produce handwriting animation videos programmatically. There's also an integration with Sli.dev, the markdown-based presentation tool, via a community addon. These integrations show the library is flexible enough for both runtime web UIs and pre-rendered content pipelines.

**Lightweight with No Native Dependencies.** The entire library runs in the browser with no native Node.js modules, no Canvas API requirement, and no external service calls. It renders to SVG, which means the output is resolution-independent, inspectable in dev tools, and accessible to screen readers. The WASM HarfBuzz module adds some weight, but the total bundle is still reasonable for a production site.

### Use Cases

- **Landing pages and marketing sites** — Add a handwritten "Welcome" or signature effect to hero sections. The animation draws attention without being obnoxious, and SVG output means it stays crisp on any screen.

- **Educational platforms** — Animate math equations, vocabulary words, or step-by-step explanations appearing as if written by a teacher. Particularly effective for language learning apps where stroke order matters (the library supports CJK characters).

- **Presentations and slides** — Combined with Sli.dev or similar tools, Tegaki lets presenters create text that writes itself live. Works well for key takeaways, quotes, or section headers.

- **Video content** — Use with Remotion to programmatically generate handwriting animation videos for social media, tutorials, or course content without screen recording.

- **Personal portfolios and creative sites** — The handwriting effect adds a human touch that stands out against the sea of identical Tailwind templates. Good for intro animations, about pages, or project descriptions.

### Pros and Cons

Pros:
- Solves a real problem that no other library addresses cleanly. Existing alternatives require manual SVG path creation or heavy dependencies like GSAP with MorphSVG.
- True multi-framework support with dedicated entry points, not just "technically possible with some work." React, Vue, Svelte, Solid, Astro, and Web Components all have first-class adapters.
- Active development with 199 commits and regular releases (v0.18 as of late May 2026). The maintainer responds to issues and the API is stabilizing.

Cons:
- Single-maintainer project with no bus factor. If KurtGokhan stops contributing, the project stalls. No organization backing or funding model visible.
- Still pre-1.0 (v0.18), which means the API may change. The core concepts are stable, but method signatures and import paths could shift between minor versions.
- Font generation for custom fonts requires using the web-based generator tool — there's no CLI or programmatic API for it yet, which makes CI/CD font bundle workflows harder than they should be.

### Getting Started

```bash
# Install the core library
npm install tegaki

# Pick a framework-specific entry point (React example)
npm install tegaki
```

```tsx
// React usage
import { TegakiRenderer } from 'tegaki/react';
import caveat from 'tegaki/fonts/caveat';

function App() {
  return (
    <TegakiRenderer font={caveat} style={{ fontSize: '48px' }}>
      Hello World
    </TegakiRenderer>
  );
}
```

```vue
<!-- Vue usage -->
<template>
  <TegakiRenderer :font="caveat" :style="{ fontSize: '48px' }">
    Hello World
  </TegakiRenderer>
</template>

<script setup>
import { TegakiRenderer } from 'tegaki/vue';
import caveat from 'tegaki/fonts/caveat';
</script>
```

For custom fonts, visit the [interactive generator](https://gkurt.com/tegaki/generator/) to create a font bundle, then import it the same way.

### Alternatives

**Vivus.js** — A mature SVG drawing animation library that's been around since 2015. Vivus works well for SVG illustrations and icons, but requires you to provide pre-made SVG paths. It can't generate stroke animations from font files automatically. Choose Vivus if you're animating existing SVG artwork, not text.

**GSAP with DrawSVGPlugin** — The industrial-grade animation toolkit. GSAP can do everything Tegaki does and much more, but it's a paid plugin (DrawSVGPlugin requires a GSAP license), adds significant bundle weight, and still requires manual path creation for text. Choose GSAP when you need complex multi-element animation choreography beyond just handwriting.

**Rough.js** — Creates hand-drawn, sketchy visualizations for charts, shapes, and lines. It has a deliberately rough aesthetic that works well for whiteboard-style UIs. However, Rough.js doesn't handle text animation — it's focused on shapes and data visualization. Choose it when you want the hand-drawn look for diagrams, not animated text.

### Verdict

Tegaki is one of those libraries that makes you wonder why nobody built it sooner. The "animate text like handwriting" problem has existed for years, and every previous solution either required manual path authoring or heavy dependencies. Tegaki's approach of parsing fonts at runtime and decomposing glyphs into strokes is the right abstraction — it's automatic, font-agnostic, and renders clean SVG output.

At 2,800 stars and nearly 9K monthly npm downloads in three months, the adoption curve is healthy for a niche frontend library. The multi-framework support is genuinely useful, not just marketing — the dedicated entry points mean you get proper TypeScript types and idiomatic APIs for whichever framework you're using. If you're building landing pages, educational content, or presentations and want text that writes itself, Tegaki is the cleanest option available right now. Just be aware it's still pre-1.0 and single-maintainer, so pin your versions and have a backup plan.
