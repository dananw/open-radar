---
name: diffusionstudio-lottie
description: "Text-to-Lottie is an open-source skill that lets coding agents generate production-ready Lottie animations from natural language — React + Skia CanvasKit player with hot-reload."
url: https://github.com/diffusionstudio/lottie
stars: 1155
forks: 64
language: TypeScript
tags: ["animations", "lottie", "ai-agents", "frontend", "react"]
featured: false
publishedAt: 2026-06-10
---

## Text-to-Lottie

### Overview

Text-to-Lottie is a developer tool that turns natural language prompts into production-ready Lottie animations. It works as a skill for coding agents — Claude Code, Codex, and similar tools — combined with a full-screen Skia-powered player built in React and TypeScript. Describe the animation you want, the agent writes the Lottie JSON, and the dev server hot-reloads it for instant preview.

The project launched on June 4, 2026, and crossed 1,000 GitHub stars within four days. That velocity makes sense when you consider what it replaces: the typical workflow for getting a Lottie animation into a product involves hiring a motion designer, going through After Effects, exporting with Bodymovin, and iterating through email threads. Text-to-Lottie compresses that into a conversation with your coding agent.

The architecture is straightforward. The player uses Skia's Skottie module via `canvaskit-wasm` — not the more common `lottie-web` JavaScript runtime. This matters because Skia's renderer is significantly more performant and handles complex animations that `lottie-web` chokes on. The control surface is React with shadcn/ui and Tailwind CSS 4, with a Vite dev server that watches `public/lottie.json` and full-reloads on save. There's also a properties panel driven by a sidecar `controls.json` file that lets you expose animation parameters as sliders — useful for fine-tuning without touching JSON.

### Why it matters

Animations in web applications have always been a handoff bottleneck. Designers create them in After Effects or Figma, export as Lottie, and developers integrate the JSON files. When something needs to change — timing, colors, easing — the cycle starts over. Text-to-Lottie eliminates that handoff for standard motion work. A frontend developer can describe "a bouncing loading spinner with a spring curve and blue-to-purple gradient" and get a working animation in seconds.

This connects to a broader shift in how developers interact with creative assets. The same pattern is emerging across the ecosystem: tools like v0 for UI components, Cursor for code generation, and now Text-to-Lottie for animations. The common thread is that coding agents are becoming production-capable creative partners, not just code autocomplete. The Lottie skill format — a structured prompt with JSON schema rules that guides the agent's output — is the interesting technical contribution here. It's a template for how to make agents produce valid, renderable artifacts rather than plausible-looking text.

The timing is also relevant because Lottie adoption is accelerating. LottieFiles reports over 300,000 animations uploaded to their platform, and the format is now supported natively in iOS (Core Animation), Android (Lottie for Android), and web (lottie-web / Skottie). Having a fast path from idea to working animation file removes friction from a format that was already winning.

### Key Features

**Agent-Native Skill Architecture.** The project ships as a structured skill file (`SKILL.md`) that you install with `npx skills add diffusionstudio/lottie`. This file contains the complete Lottie JSON specification distilled into rules that coding agents can follow — required top-level fields, layer types, transform blocks, shape mechanics, and animation keyframe formats. It's not just documentation; it's a prompt engineering artifact designed to produce valid Lottie output from an LLM.

**Skia Skottie Renderer.** Unlike most web Lottie players that use the `lottie-web` JavaScript library, this player renders through Skia's Skottie module via `canvaskit-wasm`. Skia is the same rendering engine behind Chrome, Android, and Flutter. The result is smoother playback for complex animations and better handling of effects like masks, mattes, and expressions that `lottie-web` renders inconsistently.

**Hot-Reload Dev Loop.** Write the animation JSON to `public/lottie.json`, and a Vite plugin detects the change and full-reloads the browser. No manual refresh, no build step. The agent writes the file, you see the result. This tight feedback loop is what makes iterative animation authoring practical — you describe, agent generates, you see it, you refine.

**URL-Based Frame Control.** The player accepts query parameters for deterministic playback control: `?frame=300` seeks to frame 300 and pauses, `?paused=1` starts paused. Combined with a `data-testid="lottie-canvas"` hook on the canvas, this lets automated agents take screenshots at specific frames for visual verification. No console bridge or slider interaction needed.

**Properties Panel with Slot System.** Animations can declare slottable properties — colors, positions, text — via a `slots` map in the Lottie JSON. The player reads these and renders a sidebar with labeled sliders and color pickers. A sidecar `controls.json` file describes the UI metadata (labels, ranges, step sizes). This means non-technical team members can tweak animations without understanding the underlying JSON structure.

**Export with Customized Values.** The properties panel includes a download button that serializes the current slot values back into a copy of the original Lottie JSON. Designers or PMs can adjust colors and timing through the UI, export the result, and hand it off for production use — no code changes required.

### Use Cases

- **Loading and empty states** — Generate branded loading spinners, skeleton screens, and empty-state illustrations without waiting for a motion designer. Describe the style, the agent produces the animation.
- **Onboarding flows** — Create step-by-step animated guides with smooth transitions between states. The properties panel lets product managers adjust timing and colors.
- **Micro-interactions** — Button hover effects, success checkmarks, error shakes, notification toasts. Small animations that make a UI feel polished but rarely justify a motion design cycle.
- **Marketing landing pages** — Hero section animations, feature callouts, and animated icons that would traditionally require After Effects and a designer.
- **Prototyping and user testing** — Quickly generate animation variants for A/B testing. Change easing curves, durations, and visual styles through prompts rather than keyframe editing.

### Pros and Cons

Pros:
- Eliminates the animation handoff bottleneck for standard motion work. A frontend developer can go from "I need a bouncing loader" to a working Lottie file in under a minute.
- The Skia renderer handles complex animations that `lottie-web` fails on — masks, mattes, and expressions render consistently across browsers.
- The skill format is a genuinely useful pattern for agent-tool integration. It's structured enough to produce valid output but flexible enough for creative variation.
- MIT licensed and actively maintained with 8 commits in the first week after launch.

Cons:
- The project is five days old as of this writing. The API surface, skill format, and player controls are likely to change significantly.
- Complex, narrative animations (character animation, detailed illustrations) still need a human motion designer. The tool works best for abstract, geometric, and UI-focused animations.
- The Skia CanvasKit WASM binary is ~8MB, which adds weight to your dev environment. Production deployments would need to consider this.
- No built-in integration with LottieFiles or other animation asset platforms. You're working with raw JSON files.

### Getting Started

```bash
# Install the skill in your coding agent
npx skills add diffusionstudio/lottie

# Or clone the player project directly
npx degit diffusionstudio/lottie my-animation
cd my-animation
npm install    # copies CanvasKit wasm into /public via postinstall
npm run dev
```

Open the printed local URL. Then ask your coding agent to generate an animation:

> "Create a Lottie animation of a pulsing blue circle that expands and contracts with a smooth ease-in-out curve, 60fps, 2 seconds long."

The agent writes `public/lottie.json`, the dev server hot-reloads, and you see the result. Iterate from there.

To expose editable properties, create a `public/controls.json` alongside the animation:

```json
{
  "controls": [
    { "sid": "fill-color", "label": "Circle Color", "type": "color" },
    { "sid": "pulse-speed", "label": "Pulse Speed", "type": "number", "min": 0.5, "max": 3, "step": 0.1 }
  ]
}
```

### Alternatives

**LottieFiles** — The dominant platform for Lottie animations with a massive library of pre-made animations and an online editor. LottieFiles is better when you need to browse existing animations or use their After Effects plugin for professional motion design work. Text-to-Lottie is better when you need custom animations generated from descriptions without leaving your development environment.

**Rive** — A newer animation tool with its own runtime that supports state machines, mesh deformation, and bone-based animation. Rive's editor is more powerful than anything you'd generate with an LLM, and its runtime is smaller than CanvasKit. Choose Rive when you need interactive, stateful animations that respond to user input. Choose Text-to-Lottie when you need quick, declarative animations that work with the existing Lottie ecosystem.

**lottie-web + After Effects** — The traditional workflow: a motion designer creates animations in After Effects and exports via the Bodymovin plugin. This still produces the highest-quality results for complex, narrative animations. But it requires specialized skills, expensive software ($23/month for After Effects), and a multi-person workflow. Text-to-Lottie handles the 80% case — UI animations, loading states, micro-interactions — without that overhead.

### Verdict

Text-to-Lottie is the kind of tool that makes you rethink where the boundaries of a frontend developer's job are. Five days old, 1,100 stars, and it already solves a real problem: the tedious handoff between "I need an animation" and "I have a working Lottie file." The Skia renderer is a smart technical choice, and the agent skill format is the most interesting part — it's a clean pattern for making LLMs produce valid, structured creative output rather than hallucinated JSON. Don't bet your production animation pipeline on it yet; it's too early and the API will change. But for prototyping, internal tools, and quick UI polish, this is worth installing today. The fact that it works inside your existing coding agent workflow — no After Effects, no Figma export, no designer Slack DMs — is the real selling point.
