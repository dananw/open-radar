---
name: liquid-dom
description: "Liquid DOM brings Apple's Liquid Glass design language to the web with WebGPU rendering, React bindings, and Three.js integration for immersive glass UI effects."
url: https://github.com/AndrewPrifer/liquid-dom
stars: 2165
forks: 100
language: TypeScript
tags: ["webgpu", "react", "ui", "liquid-glass", "three.js", "frontend"]
featured: false
publishedAt: 2026-06-12
---

## Liquid DOM

### Overview

Liquid DOM is a TypeScript library that brings Apple's Liquid Glass design language to the web through WebGPU-powered rendering. It hit 2,000 GitHub stars within two months of its April 2026 launch, riding the massive developer interest in Apple's new glassmorphism aesthetic that debuted at WWDC 2025 and fully shipped with iOS 26 and macOS 26 in mid-2026.

The project is created by Andrew Prifer, a developer with deep expertise in creative coding and visual systems. The repository is structured as a monorepo with five packages — core, React, Three.js, React Three Fiber, and a standalone layout engine — each targeting a different integration surface. That modular architecture matters: you don't have to buy into the full stack to use it. If you just want the layout engine for SwiftUI-style measurement in JavaScript, you can grab that alone.

The core problem Liquid DOM solves is rendering real-time glass refraction effects over live DOM content. CSS backdrop-filter gives you blur and saturation, but it can't do the displacement, specular highlights, and depth-dependent refraction that make Apple's Liquid Glass feel physical. Liquid DOM uses WebGPU compute shaders to sample live DOM elements as GPU textures, then applies a multi-pass optical simulation — refraction, specular lighting, dispersion, and smooth superellipse shapes — composited in real time. The result looks like actual glass sitting on top of your content, not a CSS filter pretending to be one.

### Why it matters

Apple's Liquid Glass is the most significant visual design shift in the platform ecosystem since flat design replaced skeuomorphism in iOS 7. Every macOS 26, iOS 26, and iPadOS 26 app now uses it for system UI elements — toolbars, sidebars, tab bars, and notifications all have this frosted, refractive glass look. Web developers building apps that need to feel native on Apple platforms are already being asked to match this aesthetic, and CSS alone can't do it.

The timing is also significant because WebGPU just reached stable Chrome support and is shipping in Firefox nightly. The graphics API that makes this kind of real-time rendering practical in a browser is finally available to a meaningful percentage of users. Liquid DOM is one of the first production-oriented libraries to take advantage of WebGPU for UI rendering rather than gaming or 3D visualization.

For React developers specifically, the declarative API is compelling. You describe glass containers and glass panes as JSX components, and the library handles the WebGPU lifecycle, canvas management, and frame loop. It feels like writing normal React layout code — HStack, VStack, Frame, Padding — except the output is rendered through a GPU compositor with real optical physics. That developer experience is what could push this from a demo into production use.

### Key Features

**WebGPU Liquid Glass Rendering.** The core renderer uses WebGPU compute shaders to simulate real glass optics — refraction with configurable index of refraction (IOR), chromatic dispersion, depth-dependent displacement, and specular highlights with adjustable light direction. This isn't a visual approximation; it's an actual optical simulation running at 60fps. The renderer supports multiple glass panes that fuse into shared signed distance fields when they're in the same container, creating the same seamless glass look Apple achieves in their system UI.

**React 19 Declarative API.** The `@liquid-dom/react` package provides React components — `LiquidCanvas`, `GlassContainer`, `Glass`, `Html`, plus SwiftUI-inspired layout primitives like `HStack`, `VStack`, `ZStack`, `Frame`, `Padding`, and `Spacer`. You describe your glass UI in JSX and the library manages the WebGPU canvas, frame loop, and layout measurement. The `LiquidCanvas` component owns the canvas element and frame loop; `LiquidScene` is a headless variant for when another renderer (like Three.js) controls the output.

**Live DOM Content Through Glass.** The library can render real DOM elements — buttons, text, images, forms — through the glass effect using the experimental HTML-in-Canvas API (`chrome://flags/#canvas-draw-element`). A `layoutsubtree` canvas attribute copies live DOM content into GPU textures before compositing through the glass shader. This means your interactive, accessible HTML content sits inside the glass pane, not behind a static screenshot of it.

**Superellipse Corner Shapes.** Glass panes use analytically computed superellipse (squircle) corners with configurable `cornerRadius` and `cornerSmoothing`. The default smoothing value of 0.6 matches the iOS squircle curve. Very constrained corners automatically reduce smoothing back toward circular to avoid visual artifacts. This is the same corner math Apple uses, and it makes a noticeable difference compared to CSS `border-radius`.

**Three.js and React Three Fiber Integration.** For 3D applications, `@liquid-dom/three` composites liquid glass over a Three WebGPU renderer as a post-processing layer. `@liquid-dom/r3f` bridges the React and Three packages so you can layer glass UI over a React Three Fiber scene. If you're building a 3D product configurator, game HUD, or data visualization with Three.js, you can add glass UI elements that refract the 3D scene beneath them.

**Renderer-Agnostic Layout Engine.** The `@liquid-dom/layout` package provides SwiftUI-style measurement and placement — `HStack`, `VStack`, `ZStack`, `Frame`, `Padding`, `Spacer` — with no renderer dependency. You can use it standalone for layout calculations in any JavaScript environment. This is useful if you want the layout semantics without the WebGPU rendering, or if you're building a custom renderer.

**Configurable Optical Properties.** Every optical parameter is exposed as a prop: `thickness` controls glass depth, `ior` sets the index of refraction, `dispersion` adds chromatic aberration, `specularStrength` and `specularWidth` tune highlight intensity, and `displacementFactor` controls how much the background warps through the glass. You can dial the effect from subtle frosted glass to dramatic crystal lens with a few prop changes.

### Use Cases

- **Native-feeling web apps on Apple platforms** — Web apps that need to match macOS 26 and iOS 26's Liquid Glass aesthetic for sidebars, toolbars, and modal overlays. PWAs targeting Apple users will increasingly need this look.

- **3D product configurators** — E-commerce or design tools with Three.js scenes where glass UI panels (controls, pricing, options) overlay the 3D model with real refraction of the scene beneath.

- **Creative portfolios and landing pages** — Design-forward sites where the glass effect serves as a visual differentiator. The library's showcase demonstrates hero sections, cards, and navigation with liquid glass effects.

- **Data visualization dashboards** — Glass panels overlaying charts and graphs, where the refractive effect adds depth without obscuring the data. The configurable blur and displacement let you find the right balance.

- **Game HUDs and overlays** — In-browser games using WebGPU or Three.js where UI elements (health bars, inventory, menus) should feel like physical glass objects in the game world.

### Pros and Cons

Pros:

- First production-quality implementation of Apple's Liquid Glass aesthetic for the web, filling a gap that CSS cannot address. The optical simulation approach produces results that look genuinely physical rather than filtered.

- Excellent React integration with SwiftUI-inspired layout primitives (HStack, VStack, Frame, Padding). Developers familiar with SwiftUI or Jetpack Compose will find the API immediately comfortable.

- Modular monorepo architecture means you only install what you need. The layout engine works without WebGPU; the core works without React; the Three.js adapter works without React Three Fiber.

- Active development with responsive issue tracking (only 2 open issues at time of writing). The API surface is clean and well-documented across each package README.

Cons:

- Requires WebGPU, which limits browser support to Chrome 113+, Edge 113+, and Firefox nightly. Safari has no WebGPU support yet. For Apple-platform web apps — the primary use case — this is a significant gap since Safari is the dominant browser on macOS and iOS.

- The HTML-in-Canvas API for live DOM content through glass requires a Chrome flag (`chrome://flags/#canvas-draw-element`). Without it, you can still render glass shapes and static textures, but interactive HTML content inside glass panes won't work.

- No license file in the repository at the time of writing. This is a legal gray area for production use — technically all rights are reserved by default. Teams evaluating this for commercial projects should wait for explicit licensing.

- Performance implications for complex scenes are unclear. Multiple glass containers with high-resolution DOM content, heavy displacement, and dispersion could strain mid-range GPUs. No published benchmarks yet.

### Getting Started

```bash
# Install the React package (includes core as dependency)
pnpm add @liquid-dom/react react react-dom

# Or install just the core for imperative usage
pnpm add @liquid-dom/core

# For Three.js integration
pnpm add @liquid-dom/three @liquid-dom/core three

# For React Three Fiber
pnpm add @liquid-dom/r3f @liquid-dom/react @react-three/fiber react react-dom three
```

Basic React example with a glass panel:

```tsx
import {
  Frame,
  Glass,
  GlassContainer,
  Html,
  LiquidCanvas,
} from '@liquid-dom/react'

export function App() {
  return (
    <LiquidCanvas style={{ width: '100vw', height: '100vh' }}>
      <GlassContainer blur={12} spacing={28} thickness={90}>
        <Frame width={320} height={200}>
          <Glass cornerRadius={44} cornerSmoothing={0.6} pointerEvents>
            <Html sizing="fill">
              <div style={{ padding: 24 }}>
                <h2>Glass Panel</h2>
                <p>Real DOM content through liquid glass</p>
                <button onClick={() => alert('Interactive!')}>
                  Click me
                </button>
              </div>
            </Html>
          </Glass>
        </Frame>
      </GlassContainer>
    </LiquidCanvas>
  )
}
```

Imperative core usage without React:

```ts
import { Container, Glass, Html, Renderer, Scene } from '@liquid-dom/core'

const scene = new Scene()
const container = new Container({ blur: 12, spacing: 28, thickness: 90 })
const glass = new Glass({ width: 280, height: 180, cornerRadius: 48 })

const content = document.createElement('button')
content.textContent = 'Native content'
glass.add(new Html({ width: 240, height: 160, element: content }))
container.add(glass)
scene.add(container)

const renderer = new Renderer({ scene })
document.body.append(renderer.canvas)
```

Enable the Chrome flag for live DOM content through glass:
Navigate to `chrome://flags/#canvas-draw-element` and enable it.

### Alternatives

**CSS backdrop-filter** — The simplest approach to frosted glass effects on the web. `backdrop-filter: blur(20px)` gives you a basic frosted look with zero dependencies and full browser support. But it can't do refraction, displacement, specular highlights, or depth-dependent distortion. Choose CSS when you need a subtle frosted effect and browser compatibility matters more than visual fidelity.

**Glassmorphism CSS libraries (e.g., glass-ui, glassmorphism-generator)** — Pre-built CSS utility classes that combine `backdrop-filter`, semi-transparent backgrounds, and box shadows for a glass look. These are much simpler to implement and work in all modern browsers. They produce a flat approximation of glass rather than a physical simulation. Choose them when you want the glass aesthetic without the WebGPU dependency.

**Custom WebGPU/WebGL shaders** — For teams with graphics programming expertise, writing a custom glass shader gives you full control. Three.js's `MeshPhysicalMaterial` with transmission and roughness can approximate glass in 3D scenes. But building the DOM-to-texture pipeline, layout system, and React bindings that Liquid DOM provides would take months of work. Choose custom shaders only if Liquid DOM's API doesn't fit your specific rendering architecture.

### Verdict

Liquid DOM is the most technically ambitious UI rendering library I've seen this year. It solves a real problem — Apple's Liquid Glass aesthetic is spreading across the entire Apple platform, and web developers need tools to match it. The WebGPU approach produces genuinely beautiful results that CSS can't replicate, and the React API is clean enough that it doesn't feel like you're writing a graphics application.

The practical limitations are real though. WebGPU browser support is still limited, and the HTML-in-Canvas API is behind a flag. If you're building a marketing site or portfolio where the glass effect is the star, Liquid DOM works today on Chrome and Edge. If you're building a production app that needs to work everywhere, you'll need a fallback strategy. The missing license is also a concern that should be resolved before any commercial adoption.

For creative developers, design tool builders, and teams targeting Chrome-heavy audiences, this is worth experimenting with now. The 2,100 stars in two months and the clean monorepo architecture suggest this project has legs. Once Safari ships WebGPU support, the addressable audience will jump significantly. Get familiar with the API now, and you'll be ready.
