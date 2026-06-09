---
name: html-video
description: "Turn HTML and CSS into real MP4 videos on your laptop — programmatic video creation for coding agents with 21 templates and AI soundtrack."
url: https://github.com/nexu-io/html-video
stars: 2302
forks: 264
language: TypeScript
tags: ["video-generation", "html", "coding-agents", "developer-tools", "ffmpeg"]
featured: false
publishedAt: 2026-06-09
---

## html-video

### Overview

html-video is a programmatic video creation tool that turns HTML and CSS into real MP4 files — running entirely on your laptop, no cloud render farm, no per-clip fees. Since its late May 2026 launch, it's pulled in over 2,300 GitHub stars, driven largely by the "video as code" movement that's been gaining traction among developer content creators.

The project comes from the Open Design team (nexu-io), the same group behind the Open Design platform — an agent meta-layer for design tools. html-video is the motion counterpart: a meta-layer that sits above multiple video rendering engines (Hyperframes, Remotion, Motion Canvas) behind a single adapter interface. You describe what you want, your coding agent picks the engine and template, fills in your content, and renders a real MP4. The engine is an implementation detail you never think about.

The core problem it solves is real: creating short-form video content (explainers, product demos, data visualizations, social clips) currently requires either expensive SaaS tools like Synthesia or Loom, or learning a specific framework like Remotion or Manim. html-video collapses that to "paste a link, get a video." Feed it a GitHub repo URL and it'll produce a structured walkthrough video. Feed it a blog article and it'll create a multi-scene explainer. Feed it a prompt and it writes the content from scratch.

### Why it matters

Video is eating developer documentation and marketing. GitHub's own research shows repos with demo videos get 3-5x more engagement. But the tooling for programmatic video creation has been fragmented — Remotion requires React expertise, Motion Canvas is TypeScript-only with a steep learning curve, and Manim is math-focused. html-video doesn't replace these tools. It wraps them behind a unified interface that any coding agent can drive.

The timing connects to the explosion of AI coding agents in 2026. html-video supports 14 agent backends out of the box — Claude Code, Codex CLI, Cursor, Windsurf, Gemini CLI, Aider, and more. The agent reads your source material, decides how many scenes it needs, writes a content-graph storyboard, and renders each frame as self-contained animated HTML. This is "video as infrastructure" rather than "video as a product."

For fullstack web developers specifically, this is interesting because the authoring model is HTML and CSS — languages you already know. No new DSL, no React component tree to maintain. Write animated HTML, let Chromium record it, let ffmpeg encode it. The 21 curated templates cover data viz, product promos, kinetic type, cinematic frames, and social shorts.

### Key Features

**Pluggable Engine Architecture.** The rendering backend is abstracted behind a single `render(input, ctx)` contract. Today, the Hyperframes engine (headless Chromium + ffmpeg) is fully wired up and produces real MP4s. Remotion support just landed in the latest commits (June 8), with Motion Canvas and Manim on the roadmap. Swap engines without touching your templates or agent workflow.

**Article and Repo to Video.** Paste a URL or GitHub repo and the studio fetches it server-side, flattens the content to Markdown, and feeds it into the generation pipeline. This handles WeChat articles, blog posts, and GitHub repos out of the box. A 1,500-word article becomes a paced multi-scene explainer; a repo becomes a structured project walkthrough.

**21 Curated Templates.** The template gallery includes NYT-style data charts, glitch title cards, liquid-gradient heroes, cinematic light-leak frames, typewriter VFX, logo outros, and more. Each template is a single animated HTML file — preview live in the studio, edit per-frame text inline, reorder scenes, and re-render. License-clean, ready to ship.

**Content-Graph Storyboard System.** Multi-frame videos use a content-graph intermediate representation: nodes (entity, data, text) connected by edges (sequence, dependency, contrast). The graph is topologically sorted into frame order and timing. This means the agent doesn't just generate random scenes — it builds a narrative structure with logical flow.

**AI Soundtrack Generation.** Optional background music and narration via MiniMax, mixed into the MP4 at export. Describe the mood ("energetic tech demo" or "calm explainer") and the system generates matching audio. No separate audio editing step required.

**14 Agent Backends.** Auto-detected on your PATH — Open Design (Vela), Windsurf CLI, Trae CLI, Claude Code, Cursor, Codex CLI, Gemini CLI, Grok Build, Qwen Code, OpenCode, GitHub Copilot CLI, Aider, Hermes, and the Anthropic Messages API. Switch the active agent from the studio's top bar. No configuration files to edit.

**Studio and CLI.** A local browser studio for interactive editing (live preview, template gallery, per-frame text editing) plus a scriptable `html-video` CLI for automation. Use the studio for creative exploration, the CLI for CI pipelines and batch rendering.

### Use Cases

- **Developer documentation videos** — Turn your project README or docs into a polished explainer video for landing pages, conference talks, or social media. Feed the repo URL and get a structured walkthrough in minutes.
- **Data journalism and visualization** — The NYT-style data chart template renders animated line charts with annotated data points and source lines. Perfect for "the number went up" stories and quarterly reports.
- **Product launch content** — Use the hero, cinematic, and outro templates to create product reveal videos, feature announcements, and changelog summaries without hiring a video editor.
- **Social media clips** — Short-form vertical content for Twitter, LinkedIn, or YouTube Shorts. The kinetic type and glitch title templates are designed for maximum scroll-stopping impact.
- **Conference and presentation materials** — Generate animated title cards, transition frames, and data visualizations for slide decks and keynote presentations.
- **AI agent content pipelines** — Integrate video generation into automated workflows where AI agents create, render, and publish video content without human intervention.

### Pros and Cons

Pros:
- Runs entirely locally — no cloud rendering, no per-clip fees, no vendor lock-in. Your content stays on your machine.
- The HTML/CSS authoring model means web developers already know the language. No new framework to learn, no React component tree to maintain.
- The pluggable engine architecture is genuinely forward-looking. As Remotion and Motion Canvas adapters ship, you get access to those rendering paradigms without rewriting templates.
- Active development with commits landing daily (Remotion adapter merged June 8). The team is shipping fast.

Cons:
- The contributor list is small (2 contributors listed on GitHub), which raises sustainability questions for a project with 2,300 stars. The Open Design team backing helps, but bus factor is a concern.
- The Hyperframes engine is the only fully functional renderer today. Remotion just landed but is still experimental. If you need Motion Canvas or Manim, you're waiting.
- Requires Node.js 20+, pnpm, ffmpeg, and Chromium/Playwright. The dependency chain is heavier than a single-binary tool.

### Getting Started

```bash
# Prerequisites: Node.js 20+, pnpm 9+, ffmpeg
# Install Playwright's Chromium if you don't have a system install
npx playwright install chromium

# Clone and build
git clone https://github.com/nexu-io/html-video.git
cd html-video
pnpm install
pnpm -r build

# Open the studio at http://127.0.0.1:3071
node packages/cli/dist/bin.js studio

# Check what agents and engines are available
node packages/cli/dist/bin.js doctor

# Search templates by intent
node packages/cli/dist/bin.js search-templates --intent "github stars race" --top 3
```

The studio opens in your browser. Pick a template, describe a video, or paste a link. Chat with your agent, edit per-frame text, add a soundtrack, and export MP4.

### Alternatives

**Remotion** — The most mature programmatic video framework, built on React components. Remotion has a larger ecosystem, better documentation, and a proven track record in production. But it requires React expertise, has a source-available license with paid tiers above 4 developers, and doesn't have the agent-driven workflow that html-video provides. Choose Remotion when you need fine-grained control over video composition and are already in the React ecosystem.

**Motion Canvas / Revideo** — TypeScript-based animation frameworks using generator functions on canvas. Better suited for mathematical animations and technical explainers where you need precise timing control. The learning curve is steeper, and there's no agent integration. Choose Motion Canvas when you're building complex animated explainers with precise synchronization requirements.

**Manim** — Grant Sanderson's (3Blue1Brown) mathematical animation engine. The gold standard for math and science videos, but extremely niche for general web development content. Choose Manim when your content is mathematical or scientific in nature and you need publication-quality equation rendering.

### Verdict

html-video is the most practical "video as code" tool I've seen for web developers. The HTML/CSS authoring model is the right call — it meets developers where they are instead of asking them to learn a new framework. The pluggable engine architecture is smart engineering: today you're using Hyperframes, tomorrow Remotion, and your templates and agent workflows don't change. The 2,300 stars in two weeks with active daily commits suggest real momentum, though the small contributor count is worth watching. If you're a web developer who needs to create demo videos, data visualizations, or social content without leaving your terminal, this is worth trying today. The Remotion adapter landing this week makes it even more compelling.
