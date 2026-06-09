---
name: gea
description: "Gea is a compiler-first reactive JavaScript UI framework that ships 121 bytes brotli for hello world — 420x smaller than React. No virtual DOM, just surgical DOM patching."
url: https://github.com/dashersw/gea
stars: 1088
forks: 39
language: JavaScript
tags: ["javascript-framework", "ui-framework", "reactivity", "compiler", "performance"]
featured: false
publishedAt: 2026-06-09
---

## Gea

### Overview

Gea is a compiler-first reactive JavaScript UI framework that eliminates the virtual DOM entirely. Its hello-world production build ships 121 bytes of brotli JavaScript. For context, the same app in React ships 50,816 bytes — that's a 420x difference. Even an interactive todo app with full reactive state management comes in at 4.9 KB brotli, compared to React's 51.5 KB. These aren't synthetic benchmarks from a lab. They're measured from fresh Vite 8.0.10 production builds using identical components.

The framework was created by Armagan Amcalar, a Berlin-based software architect and fractional CTO who runs coyotiv, a software consultancy. Amcalar has 3,200+ GitHub followers and 223 public repositories. He's been building JavaScript frameworks for nearly a decade — Gea descends from his earlier projects erste.js and regie, both minimalist UI libraries that prioritized direct DOM ownership over abstraction layers. That long lineage shows in the design. Gea doesn't feel like a v1 experiment. It feels like the refinement of ideas that have been cooking for years.

The core problem Gea solves is framework tax. Modern JavaScript frameworks ship a runtime that does work your build tool could have done instead. React needs a reconciler. Vue needs a reactivity runtime. Even Svelte, which popularized "compile the framework away," still ships 8.5 KB for hello world. Gea compiles your JSX into efficient HTML string templates at build time, tracks state changes through deep proxies at runtime, and patches only the DOM nodes that actually depend on the changed data. No diffing. No reconciliation. No framework runtime weighing down your bundle.

### Why it matters

The JavaScript framework ecosystem has been dominated by virtual DOM approaches since React popularized the concept in 2013. Vue, Preact, and countless alternatives all adopted some variation of diffing a virtual representation against the real DOM. The performance cost of that diffing is real, especially on mobile devices and low-powered hardware where every millisecond of JavaScript execution matters.

Gea represents a philosophical shift: what if the compiler did more work so the runtime could do less? Svelte started this trend, but Gea pushes it further. Where Svelte still ships a runtime that handles component lifecycle and updates, Gea's compiler generates the actual DOM manipulation code. The result is that simple components compile down to nearly nothing — you're paying for the pieces you actually import, not a framework baseline.

For React developers specifically, Gea offers a familiar JSX syntax with a radically different performance profile. You still write components with templates and state. You still use stores for shared state management. But `this.count++` just works — no `setState`, no `useState`, no dependency arrays, no signals. The compiler analyzes your ordinary JavaScript at build time and wires up the reactivity. This matters because the next wave of web applications — AI-powered interfaces, real-time collaboration tools, complex dashboards — will push client-side performance harder than ever. Frameworks that ship 50+ KB of runtime before your first component loads are increasingly hard to justify.

### Key Features

**Compile-Time JSX Transforms.** Gea's Vite plugin analyzes your JSX at build time and generates targeted DOM patching code. Instead of creating virtual DOM nodes and diffing them on every update, the compiler knows exactly which DOM elements depend on which state values. When state changes, the framework patches only those specific elements. This is the fundamental architectural difference from React and Vue — the work happens at build time, not runtime.

**Proxy-Based Reactivity Without Signals.** State management in Gea uses JavaScript's native Proxy API. Create a store class, define properties and methods, and mutate state directly. `this.count++` triggers a DOM update automatically. There are no signals to wrap values in, no `ref()` calls, no dependency arrays to manage, and no compiler directives like Svelte's `$:` reactive declarations. The Vite plugin analyzes your ordinary code and wires up the reactivity for you. This is the "just JavaScript" philosophy taken seriously.

**Near-Zero Bundle Baseline.** A compiled hello-world app ships 121 bytes of brotli JavaScript. An interactive todo app with reactive state, input handling, and filtering ships 4.9 KB brotli. The framework runtime effectively disappears from simple applications. You only pay for the features you import — routing, SSR, UI components each add incrementally to the bundle. This tree-shaking-at-the-framework-level approach means your landing page doesn't subsidize your app's complexity.

**Built-In Routing and SSR.** The `@geajs/core` package includes a tree-shakable router with `RouterView`, `Link`, guards, layouts, and dynamic params. A hello-world app with routing adds about 7.3 KB gzipped. The `@geajs/ssr` package handles server-side rendering with streaming HTML, hydration, and store isolation. These aren't third-party addons — they're first-party packages maintained alongside the core framework.

**Accessible UI Primitives via Zag.js.** The `@geajs/ui` package provides headless, accessible components — dialogs, menus, tooltips, accordions, and more — built on top of Zag.js from the Chakra UI team. These are composable, style-agnostic primitives that handle keyboard navigation, ARIA attributes, and focus management. You bring your own styles. This is a smart architectural choice — accessibility shouldn't be an afterthought, and leveraging Zag.js means the interaction patterns are well-tested.

**Mobile-First UI Package.** The `@geajs/mobile` package provides native-feel mobile components: view management, iOS-style navigation transitions, back gestures, sidebars, tabs, pull-to-refresh, and infinite scroll. This positions Gea as more than a desktop web framework — it's targeting the full spectrum of JavaScript UI, including mobile web and progressive web apps.

**AI-Assisted Development Support.** Gea ships agent skills that teach AI coding assistants how to work with the framework. Run `npx skills add dashersw/gea` and your AI coding tool gets context about Gea's stores, components, JSX conventions, and reactivity model. There's also a VS Code and Cursor extension (`gea-tools`) with completions, hover docs, and diagnostics. The framework was built in the AI coding era and it shows.

### Use Cases

- **Performance-critical web applications** — Dashboards, data visualization tools, and real-time interfaces where every kilobyte of JavaScript matters. Gea's surgical DOM patching and tiny bundle baseline make it ideal for apps that need to feel instant on mobile devices.

- **Landing pages and marketing sites** — Static content that needs interactivity without shipping 50+ KB of framework code. A Gea hello-world page loads in the time it takes React to parse its runtime.

- **Progressive web apps** — The `@geajs/mobile` package with its view management, gestures, and pull-to-refresh makes Gea suitable for mobile-first applications that need native-feel interactions without a native codebase.

- **Component libraries and design systems** — The accessible UI primitives built on Zag.js provide a solid foundation for building reusable component libraries that work across Gea applications.

- **Developer tooling and internal apps** — Admin panels, configuration interfaces, and internal tools where bundle size matters less but developer ergonomics matter more. Gea's "just JavaScript" approach means less framework-specific knowledge to maintain.

### Pros and Cons

Pros:
- Bundle sizes that are genuinely hard to believe — 121 bytes for hello world, 4.9 KB for an interactive todo. Measured against React, Vue, Svelte, and Solid in identical Vite production builds. This isn't marketing; the benchmarks are reproducible.
- The "just JavaScript" philosophy is refreshing. No signals, no hooks, no dependency arrays, no compiler directives. Classes, functions, objects, and getters. If you know JavaScript, you know Gea.
- The js-framework-benchmark weighted geometric mean of 1.02 — closest to hand-written vanilla JavaScript of any framework. Raw performance that translates to real user experience improvements.
- Active development with commits through June 2026, a proper monorepo with seven packages, and a growing set of examples including a Jira clone, e-commerce storefront, and kanban board.

Cons:
- 1,088 stars is still early-stage. The ecosystem is thin — no large community of Stack Overflow answers, no conference talks, no production case studies from major companies. You're an early adopter, which means you'll hit bugs that nobody has documented.
- Class-based components are the primary model, which goes against the trend toward functional components and hooks in the React ecosystem. Developers who've fully internalized React hooks may find the paradigm shift uncomfortable.
- The Vite dependency is firm. If you're on Webpack, esbuild, or another bundler, Gea isn't an option. The compile-time analysis is deeply integrated with Vite's plugin API.
- No TypeScript-first design. While TypeScript is supported, the framework's class-based API was designed with JavaScript in mind first. Type inference for reactive properties may have rough edges.

### Getting Started

```bash
# Scaffold a new Gea project
npm create gea@latest my-app
cd my-app
npm install
npm run dev
```

This creates a Vite-powered project with TypeScript, a sample store, class and function components, and hot module replacement.

Create a reactive store:

```jsx
// counter-store.ts
import { Store } from '@geajs/core'

class CounterStore extends Store {
  count = 0
  increment() { this.count++ }
  decrement() { this.count-- }
}

export default new CounterStore()
```

Build a component:

```jsx
// app.tsx
import { Component } from '@geajs/core'
import counterStore from './counter-store'

export default class App extends Component {
  template() {
    return (
      <div>
        <h1>{counterStore.count}</h1>
        <button click={counterStore.increment}>+</button>
        <button click={counterStore.decrement}>-</button>
      </div>
    )
  }
}
```

Mount it:

```ts
// main.ts
import App from './app'

new App().render(document.getElementById('app'))
```

No `useState`. No `setState`. No signals. Just `this.count++` and the DOM updates.

### Alternatives

**Solid** — Solid is the closest philosophical competitor. It also rejects the virtual DOM and uses fine-grained reactivity, but through signals and JSX expressions rather than compile-time analysis. Solid has a much larger community (30K+ stars), more production usage, and better TypeScript support. Choose Solid if you want a proven, signal-based approach with a large ecosystem. Choose Gea if you want the smallest possible bundle and prefer class-based components over signals.

**Svelte** — Svelte pioneered "compile the framework away" and has a mature ecosystem with SvelteKit for full-stack development. Svelte 5 introduced runes, a new reactivity primitive. Svelte's community is orders of magnitude larger, with extensive tooling, documentation, and production deployments. Gea takes Svelte's compilation philosophy further — where Svelte still ships a runtime, Gea's compiler eliminates it for simple components. Choose Svelte for production work today. Choose Gea if you want to push the compilation frontier and are comfortable being an early adopter.

**React** — The dominant framework with the largest ecosystem, most jobs, and most documentation. React's virtual DOM approach is well-understood and its new compiler (React Compiler) is improving performance. But React ships 50+ KB for a hello world and its mental model (hooks, dependency arrays, reconciliation) is increasingly complex. If you need ecosystem breadth, React wins. If you need raw performance and bundle size, Gea wins by a factor of 420.

### Verdict

Gea is the most aggressive "compile the framework away" experiment I've seen. A 121-byte hello world isn't a trick — it's the logical conclusion of pushing compilation to its limits. The framework's performance numbers are remarkable: a weighted geometric mean of 1.02 in the js-framework-benchmark means it's essentially as fast as hand-written vanilla JavaScript while giving you a component model, reactive state management, routing, and SSR. That's a genuine technical achievement, not marketing noise.

The honest assessment: Gea is early. At 1,088 stars with 39 forks, you're signing up to be a pioneer. There's no large community to fall back on, no production war stories from major companies, and the class-based component model goes against the prevailing functional trend. But if you're building something where performance is non-negotiable — a real-time dashboard, a mobile-first PWA, a landing page where every millisecond of load time matters — Gea deserves a serious look. The ideas here are sound, the implementation is clean, and the development velocity suggests this project has real momentum behind it. Keep it on your radar.
