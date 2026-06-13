---
name: slot-text
description: "Dependency-free text roll animation library for vanilla JS, React, and Vue. Zero bundle bloat, TypeScript-native, perfect for tactile micro-interactions."
url: https://github.com/Danilaa1/slot-text
stars: 286
forks: 5
language: TypeScript
tags: ["frontend", "animation", "react", "vue", "ui-library", "typescript"]
featured: false
publishedAt: 2026-06-13
---

## slot-text

### Overview

slot-text hit 286 stars in four days after its June 9, 2026 release. For a library that does one thing — animate text like a mechanical slot machine — that velocity is notable. Developers clearly want lightweight, framework-agnostic micro-interactions without pulling in Framer Motion or GSAP for a button label.

The library is built by Danilaa1 and ships as a single npm package with zero runtime dependencies. The core API is a vanilla JS function: give it a DOM element and a string, and it rolls each character into place with configurable direction, stagger, easing, and bounce. React and Vue wrappers are included as optional peer dependencies, so plain JS users carry no extra weight.

The problem slot-text solves is specific but common. You have a "Copy" button that should flash "Copied" with a satisfying animation, or a price counter that ticks between values, or a status label that rolls from "Processing" to "Done." Existing approaches either require heavy animation libraries, produce janky CSS-only transitions, or involve complex state management for something that should be a one-liner. slot-text gives you that one-liner.

### Why it matters

Micro-interactions are the difference between a UI that feels polished and one that feels like a wireframe. The web development community has spent years building massive animation frameworks for complex page transitions, but the humble text animation — the kind you see on Stripe's pricing toggle or Linear's status indicators — has been underserved. Most developers either skip these details entirely or pull in a 40KB animation library to animate three characters.

slot-text fills this gap with a focused, composable primitive. It's the kind of library that senior frontend developers appreciate: small API surface, zero dependencies, TypeScript-native, and designed to be forgotten once you wire it up. The `flash` method is particularly clever — it handles the "Copied → Copy" revert pattern with built-in debounce, so rapid clicks don't queue a stack of animations.

The timing is also interesting. With React 19 and Vue 4 both leaning into lighter bundle budgets, dependency-free utilities like this are becoming more valuable. A 2KB gzip library that replaces a 30KB animation framework dependency is a trade most teams would take for button labels and status text.

### Key Features

**Zero Dependencies.** The entire library ships with no runtime dependencies. React and Vue are optional peer dependencies — if you're using vanilla JS, you import nothing extra. The CSS is a single import you add once. Bundle size hovers around 2KB gzipped, which is smaller than most icon libraries.

**Framework-Agnostic Core.** The vanilla JS API (`slotText(element, text)`) works anywhere — Svelte, Solid, Angular, or plain HTML pages. React and Vue wrappers are thin adapters over the same core. This means you can adopt it in a mixed-framework codebase without conflicts.

**Spam-Safe Flash Method.** The `flash("Copied")` pattern is the library's killer feature. It rolls text in, waits a configurable duration (default 1.4 seconds), then rolls back to the original text. Repeat clicks restart the timer instead of queuing multiple animations. An explicit `set()` call cancels any pending revert. This handles the most common use case — button feedback — in a single call with no state management needed.

**Per-Character Slot Animation.** Each character animates in its own measured cell using the element's exact font metrics. Widths are always correct regardless of font family, size, or weight. The animation uses a springy bezier easing with configurable bounce (default 0.6), giving it a tactile, mechanical feel rather than a sterile CSS transition.

**Chromatic Color Helper.** Built-in `chromatic()` function produces a per-character hue sweep — a rainbow gradient that rolls across the text during animation. It's a small detail, but it makes "Copied" confirmations feel genuinely satisfying. You can also pass a custom `(index, total) => string` function for your own color patterns.

**Directional Control with Stagger.** Characters can roll up or down, with configurable stagger delay (default 45ms per character), animation duration (default 300ms), and exit offset. The `skipUnchanged` option (default true) means characters that don't change between states stay put — only the differing characters animate. This makes transitions between similar strings like "1,234" and "1,235" look surgical.

**TypeScript-Native.** Written in TypeScript with full type exports. Options objects, callback signatures, and component props are all typed. No `@types` package needed.

### Use Cases

- **Copy-to-clipboard buttons** — The classic "Copy" → "Copied" → "Copy" pattern with a satisfying roll animation. One `flash()` call handles the entire interaction including auto-revert.
- **Price and counter animations** — Roll between pricing tiers, cart totals, or live counters. The per-character stagger makes number changes feel tactile rather than jarring.
- **Status indicators** — Roll between states like "Processing" → "Complete" or "Draft" → "Published" with directional cues (up for success, down for pending).
- **Loading states** — Animate placeholder text while content loads, then roll to the real value. The `skipUnchanged` option means shared prefixes stay fixed.
- **Command feedback** — In developer tools or CLI-inspired UIs, roll between command states like "Run" → "Running" → "Done" with color changes.
- **Score and stats displays** — Gaming dashboards, analytics widgets, or leaderboard positions that need to animate between values without full re-renders.

### Pros and Cons

Pros:
- Genuinely zero dependencies. The npm package contains only the library code and a small CSS file. No transitive dependency tree to audit, no version conflicts to resolve.
- The `flash()` method with built-in debounce solves the most common text animation use case in a single line. No state management, no timers, no cleanup boilerplate.
- Per-character animation with font-aware sizing means it works correctly with any font, including variable fonts and custom web fonts. No layout shifts or misaligned characters.
- Framework wrappers are optional. You can use the vanilla JS API in any framework or no framework at all, making it a safe long-term dependency.

Cons:
- 286 stars and 4 days old means limited community validation. No production battle-testing beyond the author's usage. Breaking changes are possible as the API stabilizes.
- Per-character slot animation has inherent limitations: kerning is lost, ligatures don't form, and joined scripts (Arabic, Devanagari) render as isolated forms. This is fine for short labels but not for paragraph text.
- Browser-only — no SSR support. The library manipulates DOM directly, so it can't run during server-side rendering. You need to initialize it in `useEffect` or `onMounted`.
- No Web Animation API or `requestAnimationFrame` batching — the animations use CSS transitions. This is fine for most use cases but means you can't programmatically control animation playback or create complex sequenced timelines.

### Getting Started

```bash
npm install slot-text
```

Vanilla JS:

```js
import "slot-text/style.css";
import { slotText, chromatic } from "slot-text";

const label = slotText(document.querySelector("#copy"), "Copy");

// Flash "Copied" then auto-revert after 1.4s
label.flash("Copied", {
  enter: { color: chromatic(), direction: "up" },
  exit: { direction: "down" },
});
```

React:

```tsx
import "slot-text/style.css";
import { SlotText } from "slot-text/react";
import { chromatic } from "slot-text";

function CopyButton() {
  const [copied, setCopied] = useState(false);

  return (
    <button onClick={() => { navigator.clipboard.writeText("..."); setCopied(true); }}>
      <SlotText
        text={copied ? "Copied" : "Copy"}
        options={{
          direction: copied ? "up" : "down",
          color: copied ? chromatic() : undefined,
        }}
      />
    </button>
  );
}
```

Vue:

```vue
<script setup>
import "slot-text/style.css";
import { SlotText } from "slot-text/vue";
import { ref } from "vue";

const copied = ref(false);
</script>

<template>
  <button @click="copied = true">
    <SlotText :text="copied ? 'Copied' : 'Copy'" :options="{ direction: copied ? 'up' : 'down' }" />
  </button>
</template>
```

### Alternatives

**Framer Motion** — The dominant React animation library with 20K+ stars. Handles layout animations, gesture-driven transitions, and complex orchestration. If you need page transitions, shared layout animations, or physics-based spring dynamics, Framer Motion is the right choice. But for a button label that rolls between two strings, it's 30KB of dependency for a 2KB problem. Choose Framer Motion when your animation needs go beyond micro-interactions.

**AutoAnimate by FormKit** — A zero-config animation utility that adds transitions to list changes, element insertions, and removals. It works by wrapping a parent container and automatically animating child changes. Great for todo lists and sortable grids, but it doesn't do per-character text animation. Choose AutoAnimate when you need to animate DOM element additions and removals, not individual text content changes.

**Motion One** — A framework-agnostic animation library built on the Web Animation API. Smaller than Framer Motion but more capable than slot-text. It supports timeline sequencing, scroll-triggered animations, and gesture detection. If you need a general-purpose animation library that works across frameworks, Motion One is a solid middle ground. Choose it when you need more than text animation but less than Framer Motion.

### Verdict

slot-text is the kind of library that makes you wonder why it didn't exist sooner. Text roll animations are everywhere in modern UIs — Stripe, Linear, Vercel, Raycast — and yet the standard approach has been to either hand-roll CSS transitions or pull in a heavyweight animation framework for a button label. This library gives you a purpose-built primitive for that exact pattern, at 2KB gzipped with zero dependencies.

The `flash()` method alone justifies the package. It handles the most common use case — temporary text feedback with auto-revert — in a single call with built-in debounce. No state management, no `setTimeout` cleanup, no animation queue bugs. For React and Vue developers, the component wrappers are thin enough that you forget they're there.

At 286 stars in four days, it's clearly resonating. The main risk is maturity — this is a brand-new library with no production track record. But the API surface is small enough that the blast radius of any breaking change is minimal. If you're building a UI with short text labels that need to feel tactile and alive, slot-text is worth the 2KB. Install it, wire up a "Copy" button, and see if you don't end up using it everywhere.
