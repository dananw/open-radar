---
name: lottie
description: "Generate production-ready Lottie animations from text prompts using AI coding agents like Claude Code and Codex — a YC-backed open-source animation harness."
url: https://github.com/diffusionstudio/lottie
stars: 2518
forks: 133
language: TypeScript
tags: ["animations", "lottie", "ai-agents", "design-tools", "motion-graphics"]
featured: false
publishedAt: 2026-06-14
---

## Diffusion Studio Lottie (Text-to-Lottie)

### Overview

Text-to-Lottie is an open-source harness that lets you generate production-ready Lottie animations using natural language prompts through coding agents like Claude Code and Codex. It crossed 2,500 GitHub stars in its first ten days after launching on June 4, 2026, which is a pretty strong signal that developers were waiting for something like this.

The project comes from Diffusion Studio, a Y Combinator-backed company (W24 batch) focused on programmatic video and motion graphics tooling. They already built a video rendering engine, and this Lottie tool is their latest move into making motion design accessible to developers who aren't After Effects power users. The team maintains an active Discord community and ships updates frequently — the repo saw commits daily in its first two weeks.

The core problem is familiar to anyone who's built a modern web app: you need a loading spinner, a success checkmark animation, or a page transition effect, and the options are either buying a stock animation from LottieFiles, wrestling with After Effects and Bodymovin, or just skipping animations entirely because the workflow is too painful. Text-to-Lottie eliminates that friction. You describe what you want, your coding agent generates the animation JSON, and you drop it into your React, React Native, Flutter, iOS, or Android app with a few lines of code.

### Why it matters

Lottie has become the de facto standard for lightweight vector animations across platforms. Airbnb created it, and now it's embedded in virtually every mobile and web framework. But the creation workflow has always been the bottleneck. Designers use After Effects, export via Bodymovin, and hand off JSON files to developers. That pipeline breaks down when you need a quick animation, when your team doesn't have a dedicated motion designer, or when you want to iterate rapidly on animation concepts.

Text-to-Lottie connects to a broader shift happening right now: coding agents are moving beyond writing code into creative production. Claude Code can already generate SVGs, write CSS animations, and scaffold entire UIs. Adding Lottie animation generation to that workflow is a natural extension. The tool provides a structured harness — not just raw generation — that includes an inspector and editor so you can refine what the agent produces. That "generate then tweak" loop is how developers actually want to work.

For fullstack teams building React apps, NestJS backends, or Go services with frontend components, this means you can add polished micro-interactions without pulling in a designer for every small animation need. The generated animations are standard Lottie JSON files — they work with lottie-web, lottie-react-native, the Lottie iOS/Android SDKs, and Flutter's lottie package. No vendor lock-in, no proprietary format.

### Key Features

**Agent-Native Workflow.** Text-to-Lottie is designed as a "skill" that plugs into coding agents. You install it with `npx skills add diffusionstudio/lottie`, and your agent immediately understands how to generate Lottie animations. The skill provides context, constraints, and a structured generation process so the agent produces valid, renderable animation JSON rather than hallucinated output.

**Built-in Animation Inspector and Editor.** The harness doesn't just generate a JSON file and leave you alone. It sets up a local development server with a player where you can preview, inspect, and edit the generated animation. You can adjust timing curves, modify keyframes, change colors, and tweak properties without regenerating from scratch. This iterative workflow is what separates it from a simple "text to animation" demo.

**SVG-to-Animation Conversion.** Feed it an SVG path and the agent can generate animations that follow the path geometry. This is particularly useful for logo animations, icon transitions, and signature-style reveal effects. The agent respects the original SVG geometry and applies motion design principles like ease-in-out timing and directional reveals.

**Cross-Platform Output.** The generated Lottie JSON files work everywhere Lottie is supported. The README includes copy-paste integration examples for vanilla HTML with lottie-web, React Native with lottie-react-native, React Native Skia with Skottie, iOS Swift with the Lottie SDK, Android Kotlin, and Flutter. One generation, every platform.

**Motion Design Language Support.** The prompt guide encourages using proper motion design terminology — ease-in, ease-out, camera pushes, pans, zooms, and rig-like motion through group transforms. This means if you know basic animation vocabulary, you get significantly better results. The agent understands these concepts and translates them into correct Lottie keyframe data.

**Transparent Background and Property Controls.** By default, animations render with transparent backgrounds so they layer cleanly over any UI. You can also request explicit controls for properties like background color, animation speed, and loop behavior. If you need the animation to be customizable at runtime, you tell the agent which properties to expose as controls, and it structures the JSON accordingly.

### Use Cases

- **Loading and empty state animations** — Replace generic spinners with branded, context-aware animations for your React or Next.js app. Describe your brand colors and style, and get a custom loading animation in minutes instead of hours.

- **Onboarding and tutorial sequences** — Build step-by-step animated walkthroughs for mobile apps. Generate individual Lottie files for each onboarding screen, then sequence them with your app's navigation logic.

- **Success and error state feedback** — Create satisfying checkmark animations for form submissions, playful error illustrations for 404 pages, or confetti bursts for achievement unlocks. These micro-interactions significantly improve perceived app quality.

- **Logo and brand animations** — Convert your SVG logo into an animated reveal for splash screens, loading states, or marketing pages. The SVG-to-animation path ensures the result respects your actual brand geometry.

- **Icon transition effects** — Generate animated transitions between icon states (hamburger to X, play to pause, bookmark empty to filled). These are notoriously tedious to build by hand but straightforward to describe in natural language.

- **Marketing and social media assets** — Produce animated graphics for landing pages, social posts, and email headers without hiring a motion designer. Export as Lottie JSON for web or render to video for platforms that don't support Lottie.

### Pros and Cons

Pros:
- **Legitimate production output, not a toy.** The generated animations are standard Lottie JSON that works with every major rendering library. You're not locked into a proprietary viewer or format — these files go straight into production apps.
- **YC-backed team with existing infrastructure.** Diffusion Studio already builds programmatic video tools, so they understand the motion graphics pipeline. This isn't a weekend project — there's a real company and product roadmap behind it.
- **Agent-native design is forward-looking.** As coding agents become standard development tools, having a structured skill for animation generation means the workflow improves automatically as the underlying models get better.

Cons:
- **Quality depends heavily on prompt specificity.** Vague prompts produce generic animations. You need to describe timing, easing, and visual style with some precision to get good results. The prompt guide helps, but there's a learning curve.
- **Complex animations still need After Effects.** Character animations, physics-based simulations, and multi-layered compositions with masking and effects are beyond what text prompts can reliably describe. This tool excels at UI micro-interactions, not Pixar-quality motion graphics.
- **Early-stage project with active development.** The harness was released June 4, 2026, so expect breaking changes, missing edge cases, and evolving APIs. Production use today requires tolerance for rapid iteration.

### Getting Started

```bash
# Install the skill in your coding agent environment
npx skills add diffusionstudio/lottie

# Then prompt your agent (Claude Code, Codex, etc.)
# Example: "Create a Lottie animation of a loading spinner with a
# blue gradient that pulses between 50% and 100% opacity.
# Use ease-in-out timing, 60fps, 2-second loop."

# The agent will:
# 1. Set up the generation harness
# 2. Generate the Lottie JSON
# 3. Open a local inspector for preview/editing

# Use in a web project:
# Add lottie-web to your project
npm install lottie-web

# Then in your React component:
# import lottie from 'lottie-web';
# lottie.loadAnimation({ container: ref, animationData: jsonData, loop: true, autoplay: true });
```

### Alternatives

**LottieFiles** — The largest marketplace for pre-made Lottie animations with over 500,000 assets. Choose LottieFiles when you need a specific animation style quickly and are willing to browse a catalog rather than generate something custom. The free tier covers most use cases, but premium animations and advanced editing require a subscription. LottieFiles also offers a web-based editor for modifying existing animations, which is useful when you find something close to what you need but want to adjust colors or timing.

**Rive** — A real-time interactive animation tool with its own rendering runtime. Rive is the right choice when you need animations that respond to user input — button hover states, scroll-driven effects, game-like interactions. Its State Machine lets you define animation logic declaratively. The trade-off is that Rive uses a proprietary format and runtime, so you're adding a dependency and file size that Lottie's ecosystem avoids. For static or looping UI animations, Lottie is lighter and more portable.

**Motion (Framer Motion)** — A React animation library for declarative, component-level animations. Motion is the answer when your animations are tightly coupled to React state — mount/unmount transitions, gesture-driven interactions, layout animations. It doesn't generate standalone animation files, so it's not a replacement for Lottie when you need cross-platform asset reuse. But for React-specific animation logic, Motion's API is more ergonomic than managing Lottie instances manually.

### Verdict

Text-to-Lottie is the most practical AI-for-design tool I've seen land in the developer ecosystem. It solves a real workflow problem — the gap between wanting a quick animation and actually producing one — without introducing proprietary formats or vendor dependencies. The generated output is standard Lottie JSON that works everywhere, the agent-native installation is a single command, and the built-in inspector means you're not flying blind on what the AI produced. At 2,500 stars in ten days with YC backing and daily commits, the momentum is real. If you're building React, React Native, or Flutter apps and you've ever hesitated to add an animation because the creation workflow was too annoying, this tool removes that excuse. The quality ceiling is limited by what you can describe in text, so don't expect it to replace a skilled motion designer for complex work — but for the 80% of UI animations that are loading states, success feedback, and icon transitions, it's genuinely good enough to ship.
