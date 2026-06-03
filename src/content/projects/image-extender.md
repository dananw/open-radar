---
name: image-extender
description: "Open-source AI outpainting web app built with Next.js and TypeScript — extend images in any direction with Poisson-blended seams and 2D game art generation."
url: https://github.com/boona13/image-extender
stars: 810
forks: 91
language: TypeScript
tags: ["ai", "nextjs", "typescript", "image-generation", "outpainting", "game-dev", "openrouter"]
featured: false
publishedAt: 2026-06-03
---

## Image Extender

### Overview

Image Extender is an open-source web application that lets you extend any image in any direction using AI, then goes further by generating complete 2D game art sets — parallax backgrounds, autotiles, sprite animations, and decoration props. Built with Next.js 14, React 18, TypeScript, and Tailwind CSS, it hit 800 GitHub stars within its first week of launch in late May 2026. The growth is notable for a utility tool without a company backing or marketing budget.

The project uses Google's Gemini image models through OpenRouter as its AI backbone, with a client-side Poisson-blending pipeline that makes the seam between original and AI-generated pixels mathematically invisible. The technique is based on the Pérez, Gangnet, and Blake (2003) SIGGRAPH paper on gradient-domain image editing — this isn't a simple alpha blend or content-aware fill. It's proper research-grade image compositing running in the browser via HTML Canvas.

The core problem it solves is practical: designers and game developers constantly need to extend images beyond their original bounds. Traditional outpainting tools produce visible seams or color drift. Image Extender addresses this with a multi-stage pipeline — pre-correction for low-frequency color drift, Poisson blending with mask-grow and Gauss-Seidel iterations, and a best-of-3 variant picker that lets you cycle through candidates sorted by seam quality. The result is extensions that look like they were always part of the original image.

### Why it matters

AI image generation is moving fast, but the tools for post-processing and integrating AI output into real workflows lag behind. Most image AI tools are either consumer-facing toys or enterprise platforms with six-figure contracts. Image Extender fills the gap for developers and indie creators who need programmatic, high-quality image manipulation they can self-host and extend.

The architecture is worth studying on its own. It's a clean Next.js 14 App Router project with server-side API routes proxying to OpenRouter, client-side Canvas manipulation for all image processing, and a modular workspace system that separates five distinct studios (Extender, Parallax, Tiles, Sprites, Props) into independent React components. If you're building any kind of AI-powered creative tool, this codebase is a solid reference implementation.

The game art generation angle is what elevates this beyond a simple outpainting tool. Generating consistent tile sets, sprite sheets, and parallax layers from a single "scene brief" is a workflow that typically requires dedicated tools like Tiled, Aseprite, and hours of manual work. Image Extender collapses that into a single web app with AI-assisted pipelines that maintain visual consistency across all generated assets.

### Key Features

**Poisson-Blended Seams.** The outpainting pipeline uses gradient-domain image editing to make AI-original boundaries invisible. It runs pre-correction for low-frequency color drift before blending, which fixes the common "sky got slightly bluer" failure mode. The blending runs 250 Gauss-Seidel iterations with an 8px mask-grow on the client side via HTML Canvas — no server round-trip needed for the compositing step.

**Five Integrated Workspaces.** The app ships as a mini studio with five modes switchable from a top-bar pill: Extender (outpainting), Parallax Studio (multi-layer backgrounds), Tile Studio (13-tile autotile sets), Sprite Studio (character animations), and Props Studio (decoration sprites). Each workspace has its own pipeline, AI prompts, and export format, but they all share a common scene brief for visual consistency.

**Best-of-3 Variant Picker.** Every extension generates up to three candidates sorted by seam quality score. You cycle through them with arrow keys and pick the best one before committing. This quality gate prevents the "first result and done" problem where you accept mediocre AI output because regenerating is friction.

**Sprite Studio with Body Plans.** Pick a body plan (humanoid, quadruped, serpent, flyer, or blob), select an animation, describe the creature, and get a keyframe sheet with a live animation player. Each body plan drives its own anatomy-specific pose-guide rig. The rigs handle everything from biped walk cycles to serpent undulation — the pose system is surprisingly sophisticated for a utility tool.

**Scene Brief System.** One auto-generated scene brief (setting, time of day, palette, mood) is distilled from your initial prompt and reused across all five workspaces. This means your parallax background, tile set, sprite animations, and decoration props all look like they belong in the same game world. The consistency mechanism is simple but effective.

**BYOK Privacy Model.** Your OpenRouter API key stays in browser localStorage. The server proxies requests to OpenRouter but never logs or persists the key. There's an optional server-side `OPENROUTER_API_KEY` env var as a fallback, but the default is zero server-side secrets. No analytics, no telemetry, no tracking.

**Keyboard-First Controls.** Arrow keys to extend, left/right to cycle variants, Enter to accept, R to regenerate, Esc to discard. The interaction model is designed for rapid iteration — you can extend an image in all four directions without touching the mouse.

### Use Cases

- **Game prototyping** — Indie developers generating placeholder art for 2D platformers. The Tile Studio produces 13-tile autotile sets in one AI call with deterministic corner reconciliation, and the Sprite Studio outputs engine-ready keyframe sheets with JSON manifests.

- **Social media content** — Marketers extending product photos or hero images to fit different aspect ratios (square to wide, portrait to landscape) without manual Photoshop work. The outpainting quality is high enough for social media use.

- **Concept art iteration** — Artists using the Extender mode to explore compositions by rapidly expanding an initial sketch or photo in different directions, picking the most promising extension, and repeating.

- **Asset consistency for prototyping** — Small game teams using the shared scene brief to generate a cohesive set of backgrounds, tiles, sprites, and props from a single description, avoiding the "mashup of five different art styles" problem.

- **Learning AI image pipelines** — Developers studying the codebase as a reference for building their own AI-powered creative tools. The modular architecture and clear separation of concerns make it easy to extract patterns.

### Pros and Cons

Pros:
- The Poisson blending pipeline produces genuinely invisible seams — this is research-grade compositing, not a simple gradient fade. The pre-correction step for color drift shows attention to real-world failure modes.
- Five workspaces in one app means you're not juggling separate tools for backgrounds, tiles, sprites, and props. The shared scene brief keeps everything visually consistent.
- Clean Next.js 14 App Router architecture with TypeScript throughout. Good reference code for anyone building AI-powered web apps with Canvas manipulation.
- MIT licensed, no analytics, no tracking. Your API key stays in the browser. The privacy model is straightforward and honest.
- Keyboard-first interaction model enables rapid iteration. The best-of-3 variant picker with quality scoring is a thoughtful UX decision.

Cons:
- Requires an OpenRouter API key with access to Gemini image models. The free tier may not cover heavy usage — generating parallax backgrounds with four layers and multiple extension passes burns through credits.
- The Tile Studio's 13-tile autotile generation is impressive but limited to the specific tile layout pattern. If your game uses a different tile convention, you'll need to adapt the output.
- No built-in collaboration or project sharing. It's a single-user tool — teams can't easily share scene briefs or generated asset sets without exporting and re-importing.
- The game art features (sprites, tiles, props) are tightly coupled to specific body plans and conventions. Extending to new body plans or animation types requires modifying the rig system.

### Getting Started

```bash
# Clone the repository
git clone https://github.com/boona13/image-extender.git
cd image-extender

# Install dependencies
npm install

# Create a .env.local with your OpenRouter key (optional — you can also enter it in the UI)
echo "OPENROUTER_API_KEY=sk-or-your-key-here" > .env.local

# Start the development server
npm run dev
```

Open http://localhost:3000. You'll see the Extender workspace by default. Drop an image on the canvas, click an edge to extend in that direction, and use arrow keys to cycle through variants. Switch workspaces from the pill selector in the top bar.

To generate from scratch without a base image, use the text prompt field to create a starting image first, then extend it.

### Alternatives

**Adobe Generative Expand** — Photoshop's built-in outpainting using Adobe Firefly. Produces good results but requires a Creative Cloud subscription ($22+/month), runs on Adobe's servers, and is locked into the Photoshop ecosystem. Choose it if you're already deep in Adobe's tooling and need the integration with layers, masks, and the rest of Photoshop's feature set.

**DALL-E Outpainting via ChatGPT** — OpenAI's image model can extend images through the ChatGPT interface. Convenient but limited to OpenAI's models, no batch processing, no game art generation, and the outpainting quality varies significantly. Choose it for quick one-off extensions where you don't need programmatic access or consistent quality.

**Stable Diffusion Outpainting (ComfyUI/A1111)** — Local outpainting using open-weight models. More control over the generation process and no API costs, but requires a beefy GPU, significant setup time, and manual compositing. Choose it if you want full local control and don't mind the infrastructure overhead.

### Verdict

Image Extender is the kind of tool that makes you wonder why it didn't exist before. The outpainting quality is genuinely impressive — the Poisson blending pipeline with color drift pre-correction produces results that rival commercial tools, and it runs entirely in the browser. The game art generation features (tiles, sprites, parallax layers) elevate it from a utility to a real creative studio. For fullstack developers building AI-powered tools, the Next.js 14 codebase is worth studying as a reference for Canvas manipulation, OpenRouter integration, and modular workspace architecture. The 800-star first week without any marketing push suggests the developer community sees the same potential. If you work with images in any capacity — game dev, design, content creation — this is worth bookmarking.
