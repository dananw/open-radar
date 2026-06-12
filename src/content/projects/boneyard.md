---
name: boneyard
description: "Boneyard auto-generates pixel-perfect skeleton loading screens from your real UI components — no manual measurement, no hand-tuned placeholders."
url: https://github.com/0xGF/boneyard
stars: 5860
forks: 231
language: TypeScript
tags: ["skeleton-loading", "ui", "react", "vue", "svelte"]
featured: false
publishedAt: 2026-06-12
---

## Boneyard

### Overview

Boneyard is a skeleton loading framework that does something every frontend developer has wanted but nobody built properly until now: it extracts pixel-perfect skeleton screens directly from your real UI components. No manually measuring div widths. No guessing border-radius values. No maintaining a separate skeleton component that drifts out of sync with your actual layout.

The project hit 5,800 GitHub stars within about two months of its April 2026 launch, which tracks with the problem it solves. Every React, Vue, or Svelte developer has written skeleton loading states by hand. It's tedious, error-prone, and the skeletons almost never match the real content perfectly. Boneyard eliminates that entire category of work.

The core mechanic is elegant: the CLI (or Vite plugin) opens a headless browser, visits your running app, finds every `<Skeleton name="...">` component, and snapshots their layout at multiple breakpoints. It outputs `.bones.json` files that describe the exact geometry — position, size, border-radius, and color of every "bone" element. Your app imports these files once and the skeleton renders automatically when `loading` is true. It works with React, Preact, Vue, Svelte 5, Angular, and React Native. That framework coverage alone sets it apart from every other skeleton library on npm.

### Why it matters

Skeleton loading screens are one of those things that seem simple but consistently get done poorly. Most teams either use a generic shimmer library that doesn't match their actual layout, or they hand-code skeleton components that immediately become stale when someone changes the real UI. The result is jarring loading experiences where the skeleton looks nothing like the content that replaces it — layout shifts, wrong proportions, missing elements.

Boneyard solves this by making skeletons a derived artifact, not a maintained component. You build your real UI, run the capture, and the skeleton is always in sync. This is the same philosophy that made tools like Storybook's visual regression testing popular — derive your test fixtures from reality, not from hand-written mocks.

The React Native support is particularly noteworthy. Mobile skeleton screens are even harder to get right than web ones because there's no CSS grid to lean on and measurements vary by device. Boneyard's approach of scanning the fiber tree and measuring views via `UIManager` at runtime is clever — it means the bones adapt to the actual device, not a hardcoded layout.

### Key Features

**Automatic Layout Extraction.** The CLI spins up a headless browser, renders your components, and captures the exact bounding boxes, border radii, and visual hierarchy of every element. You get `.bones.json` files that describe real layouts, not approximations. The capture runs at configurable breakpoints (default: 375px, 768px, 1280px) so your skeletons are responsive out of the box.

**Universal Framework Support.** One package, six framework adapters. Import from `boneyard-js/react`, `boneyard-js/vue`, `boneyard-js/svelte`, `boneyard-js/angular`, `boneyard-js/preact`, or `boneyard-js/native`. The underlying `.bones.json` format is identical across all frameworks, so teams running mixed stacks (React web + React Native mobile, for example) share the same skeleton definitions.

**Vite Plugin for Zero-Config Development.** Instead of running the CLI separately, add `boneyardPlugin()` to your Vite config. Bones are captured automatically when the dev server starts and re-captured on every HMR update. This means skeleton screens stay in sync as you develop — change a component's layout, save, and the skeleton updates instantly.

**React Native Device Scanning.** For mobile, Boneyard takes a different approach. The `<Skeleton>` component walks the React fiber tree in dev mode, measures actual view dimensions via `UIManager`, and sends bone data to the CLI running on your machine. Zero overhead in production. It also handles Dynamic Type — generate bones at default font scale and Boneyard automatically scales positions at runtime to match the user's text size setting.

**Animation and Theming Options.** Three animation modes: `pulse`, `shimmer`, and `solid`. Stagger delays between bone elements for a cascading effect. Fade-out transitions when loading ends. Dark mode support with separate color props (`color` for light, `darkColor` for dark). You can also apply custom CSS classes to individual bones for advanced styling.

**Incremental Builds and Watch Mode.** The CLI caches bone captures and only re-processes components that changed. In watch mode, it monitors for HMR events and re-captures automatically. For large codebases with hundreds of skeleton-annotated components, this means fast iteration without re-scanning everything.

**Fixture-Based Capture for Dynamic Content.** If a component needs specific data to render its layout (like a blog card that only shows when there's content), you can pass a `fixture` prop with mock data. The CLI uses this during capture, then strips it in production. This handles the common case where components don't render meaningful structure until they have data.

### Use Cases

- **Content-heavy web apps** — Blog platforms, news sites, and e-commerce stores where loading states matter for perceived performance. Skeleton screens that match the real layout reduce Cumulative Layout Shift and improve Core Web Vitals scores.

- **React Native mobile apps** — Teams building cross-platform apps who want consistent loading experiences across web and mobile without maintaining separate skeleton components for each platform.

- **Design system teams** — Organizations with shared component libraries where skeleton states need to stay in sync across dozens of consuming applications. Run the capture once, distribute the bones.

- **Dashboard and admin panels** — Data-heavy interfaces with tables, charts, and cards that take time to load. Boneyard captures complex nested layouts that would be painful to skeleton-ify by hand.

- **Rapid prototyping** — When you need decent loading states fast without spending time on skeleton markup. Annotate, capture, done.

### Pros and Cons

Pros:
- Eliminates the most tedious part of building loading states — manual skeleton markup that drifts out of sync. The "derive from reality" approach is genuinely better than hand-coding.
- Cross-framework support is real and complete, not a marketing claim. The same `.bones.json` works in React, Vue, Svelte, Angular, and React Native.
- The Vite plugin integration makes skeleton maintenance essentially free during development — bones update on every HMR cycle.
- Active development with 231 forks and rapid community adoption since its April 2026 launch.

Cons:
- The headless browser capture step adds a build-time dependency. CI environments without browser binaries will need extra setup, and the capture can be flaky on components with async data loading or complex animations.
- Skeletons are layout-only — they capture geometry, not content structure. If you need semantic skeleton states (like showing "article title" vs "article body" placeholders), you'll still need some manual work.
- The React Native scanning mode requires the app to be running on a device or simulator during capture, which adds friction to CI pipelines compared to the web version's headless approach.

### Getting Started

```bash
# Install the package
npm install boneyard-js

# Add Skeleton components to your code
# In your React component:
import { Skeleton } from 'boneyard-js/react'

function BlogCard({ data, isLoading }) {
  return (
    <Skeleton name="blog-card" loading={isLoading}>
      <article>
        <h2>{data.title}</h2>
        <p>{data.excerpt}</p>
        <img src={data.image} />
      </article>
    </Skeleton>
  )
}

# Run the CLI to capture bones (dev server must be running)
npx boneyard-js build

# Or use the Vite plugin for automatic capture
# vite.config.ts
import { boneyardPlugin } from 'boneyard-js/vite'

export default defineConfig({
  plugins: [boneyardPlugin()]
})

# Import the registry in your app entry
import './bones/registry'
```

For React Native:

```bash
npx boneyard-js build --native --out ./bones
# Open your app on device — bones capture automatically
```

### Alternatives

**react-loading-skeleton** — The most popular React skeleton library with 3M+ weekly npm downloads. It provides pre-built skeleton components you compose manually. Mature and well-tested, but requires you to hand-build every skeleton layout and keep it in sync with your real components. Choose it if you want full control over skeleton markup and don't mind the maintenance overhead.

**react-content-loader** — Uses SVG-based skeleton screens with a visual editor (Haikei) for designing placeholders. More flexible in terms of custom shapes and animations. The downside is the same as react-loading-skeleton — you're designing skeletons by hand, not deriving them from your actual UI. Better for teams that want artistic control over their loading states.

**Skeleton CSS** — A simple CSS-only approach using background gradients and animations. Zero JavaScript, works everywhere. But it's just styling — you still need to manually create the HTML structure that mimics your real layout. Fine for simple pages, falls apart on complex interfaces.

### Verdict

Boneyard is the skeleton loading tool I didn't know I needed until I saw it. The "derive skeletons from reality" philosophy is one of those ideas that feels obvious in hindsight but nobody had executed well until now. At 5,800 stars in two months with active development and broad framework support, it's clearly resonating with frontend developers who've been hand-coding skeleton screens and hating every minute of it. The Vite plugin makes it essentially zero-maintenance during development, and the React Native support means you can unify your loading states across web and mobile. If you're building any kind of content-heavy frontend in 2026, this should be in your toolchain.
