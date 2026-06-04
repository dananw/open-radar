---
name: hyperframes
description: "HyperFrames is an open-source TypeScript framework that turns HTML, CSS, and animations into deterministic MP4 videos — with first-class AI agent support."
url: https://github.com/heygen-com/hyperframes
stars: 24251
forks: 2253
language: TypeScript
tags: ["video", "html", "typescript", "ai-agents", "rendering"]
featured: false
publishedAt: 2026-06-05
---

## HyperFrames

### Overview

HyperFrames is an open-source framework for turning HTML, CSS, media, and seekable animations into deterministic MP4 videos. It hit 24,000 GitHub stars in under three months, which puts it in the same growth category as tools like Remotion and Motion Canvas — except it's built from the ground up for the AI agent era.

The project comes from HeyGen, the AI video generation company valued at over $500M that's been pushing the boundaries of synthetic video since 2020. Their team knows video production infrastructure inside and out, and HyperFrames is their bet on what programmatic video creation should look like when your co-pilot isn't a timeline editor but a coding agent. The framework is written in TypeScript, licensed under Apache 2.0, and requires Node.js 22+ with FFmpeg.

The core idea is deceptively simple: define a video as HTML. You write a composition using standard web technologies, add `data-*` attributes for timing and tracks, use GSAP or CSS animations for motion, and HyperFrames seeks each frame in headless Chrome and encodes the result with FFmpeg. The same input produces the same video every time. No timeline UI, no proprietary format — just HTML you already know how to write.

### Why it matters

Video content creation has been stuck in a strange limbo. On one side, you have traditional NLEs (Premiere, DaVinci) built for manual editing. On the other, you have programmatic tools like Remotion that brought React into the video space. But neither was designed for a world where AI agents are doing the authoring.

HyperFrames fills that gap by treating video production as a web development problem. If you can write HTML and CSS, you can make videos. If your AI agent can generate code, it can generate videos. The framework ships with agent skills that teach coding agents the specific patterns that generic web docs miss — how to wire seekable animations, manage media tracks, lint compositions, and render to MP4. It works with Claude Code, Cursor, Gemini CLI, Codex, and any other agent that supports skills.

This connects to a broader trend that's hard to ignore: the line between web development and content production is dissolving. Companies are already using HyperFrames for product launches, PR walkthroughs with animated code diffs, data visualizations, social videos with kinetic captions, and automated content pipelines. When your framework speaks HTML, every web developer becomes a potential video producer.

### Key Features

**HTML-Native Video Composition.** You define videos using standard HTML elements with `data-*` attributes for timing (`data-start`, `data-duration`) and track management (`data-track-index`). No proprietary DSL to learn. Any web developer can pick this up in minutes, and any AI agent that understands HTML can generate valid compositions.

**Seekable Animation System.** HyperFrames supports GSAP, CSS animations, Lottie, Three.js, Anime.js, and the Web Animations API through a unified frame adapter system. Timelines are paused and seeked frame-by-frame during rendering, which guarantees deterministic output. You can also write custom frame adapters for animation libraries that aren't supported out of the box.

**Agent Skills Integration.** The framework ships with skills files that teach coding agents the complete video production loop: plan the video, write valid HTML, wire seekable animations, add media, lint, preview, and render. Install them with `npx skills add heygen-com/hyperframes` and your agent knows how to produce videos. This is the first framework I've seen that was explicitly designed to work with AI coding agents as first-class users.

**Local CLI with Live Preview.** The `hyperframes` CLI handles scaffolding, previewing with live reload, linting compositions, and rendering to MP4. Preview in your browser, iterate on the design, and render locally or in Docker. There's no cloud dependency for the core workflow — everything runs on your machine.

**Design System with frame.md.** Every brand has a design system, but none were written for video. `frame.md` is a translation layer that takes your web-context design spec and rewrites it for the frame. It keeps your atoms and tokens intact but adjusts scale, timing, and composition rules for a camera-centric context. Your whole toolchain can read the output as a `DESIGN.md` superset.

**Rich Component Catalog.** HyperFrames ships with a catalog of reusable blocks for transitions, overlays, captions, charts, maps, and effects. These aren't templates you customize — they're composable building blocks you wire together in HTML. The catalog is growing and the blocks are designed to work with the agent skills out of the box.

**Deterministic Rendering Pipeline.** The renderer seeks each frame in headless Chrome, captures the visual state, and encodes with FFmpeg. This means the same HTML input always produces the same MP4 output. No randomness, no floating-point drift, no "close enough." This determinism is critical for CI pipelines and automated content workflows.

### Use Cases

- **Product launch videos** — Write the announcement as HTML with animated text, background video, and music. Render to MP4 directly from your CI pipeline when a release tag is pushed.
- **PR walkthroughs with code diffs** — Animate code changes, add narration via TTS, and generate a video walkthrough that gets posted to Slack automatically when a PR is opened.
- **Data visualization animations** — Use chart libraries or Three.js scenes in HTML, add seekable timelines, and render chart races, map animations, or interactive data stories as videos.
- **Social media content pipelines** — Define brand templates with frame.md, feed in content via variables, and render hundreds of social videos from a single composition template.
- **Docs-to-video explainers** — Convert documentation, blog posts, or PDFs into animated video explainers using the component catalog and agent skills.
- **Automated content for marketing** — Build reusable motion graphics templates that marketing teams fill with copy and assets, then render programmatically without touching a video editor.

### Pros and Cons

Pros:
- The HTML-first approach means any web developer is immediately productive. No new language, no proprietary timeline — just the skills you already have.
- Agent skills integration is genuinely novel. The first time you watch Claude Code generate a complete video from a text prompt, it changes how you think about content production.
- HeyGen's backing means the project has real engineering resources behind it. 24K stars in three months and an active Discord community suggest it's not going anywhere.
- Deterministic rendering is a killer feature for automated pipelines. You can diff video output in CI the same way you diff code.

Cons:
- The Node.js 22+ requirement excludes teams stuck on older LTS versions. FFmpeg installation adds setup friction on Windows.
- Complex animations that depend on runtime state or user interaction can't be represented as seekable timelines. You're limited to what can be pre-computed frame by frame.
- The headless Chrome rendering approach means render times scale linearly with video length and resolution. A 4K, 60-second video with heavy animations will take significantly longer than a 1080p, 10-second clip.

### Getting Started

```bash
# Scaffold a new project
npx hyperframes init my-video
cd my-video

# Preview in browser with live reload
npx hyperframes preview

# Render to MP4
npx hyperframes render

# Or use agent skills
npx skills add heygen-com/hyperframes
```

Your composition is just an HTML file with data attributes:

```html
<div id="stage" data-composition-id="demo" data-start="0" data-width="1920" data-height="1080">
  <h1 id="title" class="clip" data-start="0" data-duration="3" data-track-index="0">
    Hello, HyperFrames
  </h1>
  <audio data-start="0" data-duration="3" data-track-index="1" src="music.wav" data-volume="0.5"></audio>
</div>
```

Add animations with GSAP or any supported library, then render with `npx hyperframes render`.

### Alternatives

**Remotion** — The most established programmatic video framework, using React components to define compositions. Remotion has a larger ecosystem, a hosted rendering service, and a visual editor. Choose Remotion if your team is deeply invested in React and wants a more mature toolchain with Studio UI. Choose HyperFrames if you want a simpler HTML-first approach with first-class AI agent support.

**Motion Canvas** — A TypeScript framework focused on algorithmic and mathematical animations, with a real-time editor. Motion Canvas excels at educational content and technical visualizations. Choose it if your videos are primarily data-driven animations. HyperFrames is better for general-purpose video content where you want to leverage existing HTML and CSS skills.

**Shotstack** — A cloud-based video editing API that processes video through JSON manifests. Shotstack is fully managed — no local rendering, no FFmpeg installation. Choose it if you want a SaaS solution and don't mind vendor lock-in. HyperFrames is the better choice if you want local rendering, deterministic output, and full control over the pipeline.

### Verdict

HyperFrames is the most interesting video framework I've seen since Remotion launched. The HTML-first approach lowers the barrier to programmatic video production in a way that matters, and the agent skills integration makes it the first video tool that was explicitly designed for the AI coding era. The 24K stars in three months aren't just hype — they reflect a real gap in the market for a video production tool that speaks the language web developers already know. If you're building automated content pipelines, product demo videos, or social media content and your team knows HTML, HyperFrames is worth serious evaluation today. The HeyGen backing and active community suggest this project has legs.
