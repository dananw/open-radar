---
name: html-video
description: "Turn HTML and CSS into real MP4 videos locally with 13 coding agent backends, 21 templates, and AI soundtracks. Open-source, Apache-2.0, no per-render fees."
url: https://github.com/nexu-io/html-video
stars: 1076
forks: 109
language: HTML
tags: ["html-to-video", "coding-agents", "video-generation", "ffmpeg", "open-design", "programmatic-video"]
featured: false
publishedAt: 2026-06-05
---

## html-video

### Overview

html-video is an open-source tool that turns HTML, CSS, and data into real MP4 videos — running entirely on your laptop, no cloud render, no per-clip fees. It crossed 1,000 GitHub stars in its first week after launching on May 27, 2026, which tells you something about developer appetite for programmatic video that doesn't require learning yet another DSL.

The project comes from the team behind Open Design and HTML Anything, both from nexu-io. If you've used either of those, the philosophy is familiar: pick the best existing engine for the job, wrap it behind a clean adapter interface, and let coding agents drive the whole thing. In this case, the default rendering engine is Hyperframes (HTML + CSS + GSAP rendered via headless Chromium + ffmpeg), with Remotion, Motion Canvas, and Manim adapters on the roadmap. The architecture is explicitly designed so swapping engines later doesn't touch the storyboard, the agent loop, or any of the 21 curated templates.

The core problem html-video solves is the fragmentation of the HTML-to-video space. Remotion wants you to write React components. Motion Canvas uses TypeScript generators. Manim is Python-first and math-oriented. Each is good at its thing, but switching between them means learning a new authoring model, rewriting templates, and stitching workflows together manually. html-video sits above all of them as a meta-layer: you describe what you want (or paste a URL), your coding agent picks the template and builds the storyboard, and the engine handles the render. One interface, multiple backends, zero vendor lock-in.

### Why it matters

Video content is no longer optional for developers. Product demos, conference talks, documentation walkthroughs, changelog announcements, social clips — the expectation is video, and the tools for making it from code have been fragmented and expensive. Remotion charges per seat above four developers. Loom and Kapwing are cloud-based with usage limits. Traditional screen recording doesn't scale.

html-video takes a different approach: treat video as code, let your existing coding agent do the heavy lifting, and render locally. The fact that it supports 13 agent backends — Claude Code, Cursor, Codex CLI, Gemini CLI, Grok Build, Hermes, Aider, GitHub Copilot CLI, and more — means most developers already have a compatible agent on their PATH. You don't need to install a new tool or learn a new workflow. You describe a video, paste a link, or point at a GitHub repo, and the agent handles the rest.

This is where the "video as code" movement is heading, and html-video got there with a practical, working implementation. The content-graph storyboard system — where a 1,500-word article becomes a paced multi-scene explainer whose every line traces back to the source material — is the kind of technical detail that separates a real tool from a demo.

### Key Features

**Pluggable Engine Architecture.** The rendering backend is behind a single adapter interface: `render(input, ctx)`. Today, Hyperframes (HTML + CSS + GSAP via headless Chromium and ffmpeg) is the shipped engine and it produces real MP4 output. Remotion, Motion Canvas, and Manim adapters are on the roadmap, and adding a new engine means writing one adapter — every template, every agent, and the whole studio workflow gets it for free. This is the right abstraction for a space where the best rendering engine depends on the use case.

**13 Coding Agent Backends.** The tool auto-detects agents on your PATH and lets you switch from the studio's top bar. Supported agents include Open Design (Vela), Trae CLI, Claude Code, Cursor Agent, Codex CLI, Gemini CLI, Grok Build, Qwen Code, OpenCode, GitHub Copilot CLI, Aider, Hermes, and the Anthropic Messages API directly. If you have any of these installed, you're ready to go. No API keys required if your agent already handles that.

**Article and Repo to Video.** Paste a web article URL or a GitHub repo link, and the studio fetches it server-side, flattens it to Markdown, and feeds the real content into the generation prompt. The agent reads the material, decides how many scenes it needs, and writes a content-graph storyboard. A 1,500-word article becomes a paced multi-scene explainer. A GitHub repo becomes a structured walkthrough. Even WeChat articles work out of the box because the fetch happens server-side.

**21 Curated Templates.** The template gallery isn't a random collection — each template is a self-contained, agent-readable unit described by a YAML manifest that carries category, tags, best-for descriptions, supported resolutions, aspect ratios, fps, duration bounds, and input schemas. Templates span data viz (NYT-style charts, Swiss/Vignelli grids), titles and VFX (glitch, kinetic type, typewriter cursor), heroes and cinematics (liquid gradients, light-leak), product promos (15s and 30s multi-scene), and explainer scaffolds. Every template is license-clean by construction with SPDX identifiers and attribution tracking.

**Multi-Frame Storyboard System.** The content-graph intermediate representation drives multi-scene videos. Nodes represent entities, data points, and text blocks. Edges represent sequence, dependency, and contrast relationships. The graph is topologically sorted into frame order and timing. You can edit per-frame text inline, reorder frames, and re-render individual scenes without redoing the whole video. This is the architectural core that makes complex, multi-scene videos practical.

**AI Soundtrack with MiniMax.** Add background music and narration to your exported MP4. Describe a mood for the music (like "calm cinematic ambient, slow build") and MiniMax generates an instrumental track. Type a narration script and MiniMax reads it via TTS. Both are mixed at export with music ducked under the voice and optional fade-in/out. No API key? The rest of the studio works unchanged — the soundtrack is genuinely optional.

**Local Studio and CLI.** A browser-based studio at localhost:3071 gives you a visual interface for picking templates, chatting with your agent, editing frames, and exporting. The CLI provides scriptable utilities for template search, agent detection, and batch rendering. Both run the same underlying pipeline, so you can prototype in the studio and automate in CI.

### Use Cases

- **Product demo videos** — Describe your product or paste your landing page URL, and the agent generates a multi-scene promo video with your actual content. No After Effects, no screen recording, no hiring a freelancer.

- **Technical documentation walkthroughs** — Point the tool at a GitHub repo and get a structured video explaining what the project does, how it's architected, and how to get started. Great for README videos and onboarding content.

- **Conference talk and meetup content** — Generate animated data visualizations, title cards, and explainer sequences from your slide content or article drafts. The NYT-style data chart template is particularly good for this.

- **Social media clips from articles** — Paste a blog post URL and get a short, animated video optimized for Twitter, LinkedIn, or YouTube Shorts. The kinetic type and glitch title templates work well for social-first content.

- **Changelog and release announcements** — Turn your CHANGELOG.md or release notes into an animated video. The typewriter cursor VFX template gives it a "system online" feel that works for developer audiences.

### Pros and Cons

Pros:

- The meta-layer architecture is genuinely novel. No other tool in this space abstracts over multiple rendering engines behind a single adapter interface. You're not locked into one paradigm, and the roadmap (Remotion, Motion Canvas, Manim) is credible.

- 13 agent backends out of the box means most developers can start using it immediately with whatever coding agent they already have installed. The auto-detection on PATH is a nice touch.

- Apache-2.0 license with no per-render fees, no seat caps, and no contributor agreements. Compare this to Remotion's source-available license that charges above four developers.

- The content-graph storyboard system is well-designed. The fact that a 1,500-word article becomes a properly paced multi-scene video — not just a slideshow — shows real engineering depth.

- Template license tracking is a detail most projects skip. Every template carries SPDX identifiers, attribution flags, and upstream source URLs. You can use them commercially without an audit.

Cons:

- Only one rendering engine is actually shipped (Hyperframes). Remotion, Motion Canvas, and Manim adapters are "planned" but not built yet. The pluggable architecture is promising, but today you're effectively using one engine behind a nicer interface.

- The contributor count is small (2 contributors as of early June 2026). For a project with 1,000+ stars, this is a risk — community contributions will need to pick up for the roadmap to materialize.

- The MiniMax dependency for AI soundtracks means the audio features are behind a third-party API key. If MiniMax changes pricing or availability, that feature breaks. No open-source alternative for the TTS and music generation is currently offered.

- Rendering performance depends on your local machine. Headless Chromium + ffmpeg encoding is CPU-intensive. Multi-scene videos with complex animations can take several minutes to render on a laptop. No GPU acceleration path is documented.

### Getting Started

```bash
# Clone and install
git clone https://github.com/nexu-io/html-video.git
cd html-video
pnpm install
pnpm -r build

# Open the studio
node packages/cli/dist/bin.js studio
# Studio opens at http://127.0.0.1:3071

# Check which agents and engines are available
node packages/cli/dist/bin.js doctor

# Search templates by intent
node packages/cli/dist/bin.js search-templates --intent "github stars race" --top 3
```

In the studio, pick a template (or just describe a video or paste a link), chat with your agent, edit per-frame text, add a soundtrack if you want, and export MP4. The whole pipeline runs locally — the only network calls are the optional source fetch and the optional MiniMax soundtrack.

### Alternatives

**Remotion** — The most established programmatic video framework, using React components as the authoring model. Remotion has a massive community, excellent documentation, and a mature ecosystem of components and templates. But it's source-available with a commercial license above four developers, and it doesn't integrate with coding agents natively. Choose Remotion if you want React-based video authoring and don't mind the licensing model.

**Motion Canvas and Revideo** — TypeScript-first animation frameworks using generator functions on canvas. Motion Canvas is particularly good for mathematical and technical animations, with a visual editor for precise timing control. The learning curve is steeper than html-video's "describe what you want" approach, but you get more control over every frame. Choose Motion Canvas if you need fine-grained animation control and prefer code-first workflows.

**Screen recording tools (Loom, Kapwing, OBS)** — The traditional approach: record your screen, edit the video, export. These tools work for quick demos but don't scale to programmatic content generation. You can't automate "turn this article into a video" with screen recording. Choose screen recording when you need a one-off video and don't want to write any code.

### Verdict

html-video is the most interesting "video as code" project I've seen in 2026, mostly because it makes the right architectural bet. Instead of building yet another rendering engine, it built the meta-layer — the adapter interface, the content-graph storyboard, the multi-agent integration — and plugged in the best existing engine (Hyperframes) as the first backend. That's the kind of design that ages well. The 13 agent backends mean you can start using it today with whatever coding agent you already have, and the 21 license-clean templates mean you're not starting from scratch. At 1,076 stars and 109 forks in its first week, the community signal is strong. The main risk is the small contributor count and the fact that only one rendering engine is shipped — the pluggable architecture is all promise until Remotion or Motion Canvas adapters actually land. But for fullstack web developers who already write HTML and CSS daily and want to turn that skill into programmatic video generation, this is the tool to watch. It's Apache-2.0, it runs locally, and it works today.
