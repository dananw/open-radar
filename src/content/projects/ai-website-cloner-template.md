---
name: ai-website-cloner-template
description: "AI-powered template that reverse-engineers any website into a modern Next.js codebase using Claude Code, Cursor, Codex, and 10+ other AI agents."
url: https://github.com/JCodesMore/ai-website-cloner-template
stars: 16051
forks: 2450
language: TypeScript
tags: ["nextjs", "react", "ai-agents", "website-cloner", "tailwindcss"]
featured: false
publishedAt: 2026-06-03
---

## AI Website Cloner Template

### Overview

AI Website Cloner Template is a GitHub template repository that uses AI coding agents to reverse-engineer any live website into a clean, production-ready Next.js codebase. Point it at a URL, run `/clone-website`, and the agent inspects the site, extracts design tokens and assets, writes component specs, and dispatches parallel builders to reconstruct every section. It hit 16,000 stars in under three months — a pace that tells you developers have been waiting for exactly this.

The project is built on Next.js 16 with React 19, TypeScript strict mode, shadcn/ui components, and Tailwind CSS v4 with oklch design tokens. The output isn't a rough sketch or a screenshot-to-HTML converter. It's a fully structured Next.js project with proper component hierarchy, responsive breakpoints, extracted SVG icons, and computed CSS values pulled directly from the target site's live DOM. The recommended setup is Claude Code with Opus 4.7, but it works with Codex, Cursor, Copilot, Windsurf, Gemini CLI, Cline, Roo Code, Continue, Amazon Q, Augment Code, and Aider.

The pipeline runs in five distinct phases. First, reconnaissance: the agent takes screenshots, extracts design tokens, sweeps for interactions (scroll behaviors, hover states, responsive breakpoints). Second, foundation: fonts, colors, and global styles get updated, and all assets are downloaded locally. Third, component specs: detailed specification files are written with exact computed CSS values, interaction models, multi-state content, and responsive breakpoints. Fourth, parallel build: builder agents run in git worktrees, one per section or component, working simultaneously. Fifth, assembly and QA: worktrees merge, the page gets wired up, and a visual diff runs against the original. Each builder agent receives the full specification inline — no guessing about what color a button should be or how a nav collapses on mobile.

### Why it matters

Every frontend developer has been in this situation: you need to rebuild a site, migrate a client from WordPress or Webflow to a modern stack, or recover code from a live production site where the original repo is gone. The traditional approach is manual — inspect elements, copy CSS values, recreate components one by one. It's tedious, error-prone, and takes days.

AI Website Cloner Template compresses that process into minutes. It's not a toy demo that produces broken HTML. The multi-phase pipeline with component specs and parallel builders is an actual engineering workflow. The visual diff at the end catches regressions. The git worktree approach means builders don't step on each other's code. This is how you'd structure a team of human developers doing the same job — the difference is the agents work faster and don't get bored copying CSS values.

The broader trend here is AI agents moving from code generation to full workflow automation. This project is a template, not a SaaS product. You fork it, customize the agent instructions for your needs, and run it. The AGENTS.md file is the single source of truth for all platform-specific configs, and sync scripts regenerate the Claude, Cursor, Codex, and other platform files automatically. That's a mature approach to multi-agent tooling that most projects haven't figured out yet.

### Key Features

**Multi-Phase Clone Pipeline.** The five-phase workflow (recon, foundation, specs, parallel build, assembly) mirrors how a real frontend team would approach a migration project. Each phase has clear inputs and outputs, and the component spec phase is the critical bridge — it forces the AI to document exactly what it found before writing any code. This prevents the common AI failure mode of generating plausible-looking but inaccurate output.

**Parallel Agent Dispatch via Git Worktrees.** Each section or component gets its own git worktree and builder agent. They run simultaneously without merge conflicts. This is the same pattern large engineering teams use for parallel feature development, applied to AI agents. The result is faster cloning and cleaner code separation.

**Visual Diff QA.** After assembly, the template runs a visual comparison against the original site's screenshots. This catches layout regressions, missing elements, and styling drift. It's not pixel-perfect comparison (that would be fragile), but it flags obvious problems that need human review.

**13+ Agent Platform Support.** The template works with Claude Code, Codex CLI, OpenCode, GitHub Copilot, Cursor, Windsurf, Gemini CLI, Cline, Roo Code, Continue, Amazon Q, Augment Code, and Aider. Platform-specific instruction files are auto-generated from AGENTS.md via sync scripts. You pick your agent, and the template adapts.

**Design Token Extraction.** The recon phase pulls computed CSS values, color palettes, typography scales, spacing systems, and responsive breakpoints from the live site. These become Tailwind CSS v4 oklch design tokens in the output. You're not guessing at colors — you're using the exact values the original site uses.

**Asset Pipeline.** Images, videos, favicons, and OG images are downloaded and organized into public/images, public/videos, and public/seo during the foundation phase. Extracted SVGs replace Lucide React defaults in the icon component. The output is self-contained — no external asset dependencies.

**Docker Support.** The template includes Dockerfile, Dockerfile.dev, and docker-compose.yml for containerized development. Run `docker compose up dev --build` for development on port 3001, or `docker compose up app --build` for production. This matters for teams that standardize their dev environments.

### Use Cases

- **Platform migration** — Rebuild a site from WordPress, Webflow, or Squarespace into a modern Next.js codebase. The agent handles the tedious extraction work while you focus on the custom logic that actually matters.
- **Lost source code recovery** — The original developer left, the repo was deleted, or the stack is legacy PHP. The site is live but you have no code. This template recovers a working codebase you can actually maintain.
- **Design system learning** — Deconstruct how production sites achieve specific layouts, animations, and responsive behaviors. The component specs reveal exact CSS values and interaction patterns that you can study and adapt.
- **Client proposals and prototyping** — Clone a prospect's existing site into your preferred stack to show them what a migration would look like. Having working code is more convincing than mockups.
- **Competitive analysis** — Clone competitor landing pages to study their design patterns, component structure, and responsive behavior in a format you can actually inspect and modify.

### Pros and Cons

Pros:

- The multi-phase pipeline produces structured, maintainable Next.js code — not a single-page HTML dump. Components are properly separated, TypeScript types are defined, and the project follows Next.js 16 conventions.
- Git worktree parallelism is a clever architectural decision that prevents builder conflicts and scales to large sites with many sections.
- The AGENTS.md single-source-of-truth pattern with auto-generated platform configs is the right way to support multiple AI agents. Edit once, sync everywhere.
- 16K stars and active development (7 open issues, regular pushes) suggest real community traction and ongoing maintenance.
- MIT license means you can use it commercially, modify it freely, and fork it for internal tooling.

Cons:

- Quality depends heavily on the AI agent and model used. Claude Code with Opus 4.7 is recommended for a reason — cheaper models produce noticeably worse output, especially on complex layouts with overlapping elements and custom animations.
- Sites with heavy JavaScript interactivity (complex state management, real-time features, WebSocket connections) won't clone well. The template handles visual layout and static content, not application logic.
- The visual diff QA is a sanity check, not a guarantee. Complex responsive designs may still need manual adjustment after cloning, especially for edge cases like ultra-wide screens or unusual aspect ratios.
- Node.js 24+ is required, which is a very recent runtime version. Teams on older Node versions will need to upgrade.

### Getting Started

```bash
# 1. Create your own repo from the template (use GitHub's "Use this template" button)
# 2. Clone your new repo
git clone https://github.com/YOUR-USERNAME/YOUR-NEW-REPOSITORY.git
cd YOUR-NEW-REPOSITORY

# 3. Install dependencies
npm install

# 4. Start your AI agent (Claude Code recommended)
claude --chrome

# 5. Run the clone skill
/clone-website https://example.com

# 6. Start the dev server to preview
npm run dev
```

For Docker:

```bash
docker compose up dev --build   # Development on port 3001
docker compose up app --build   # Production build
```

Run quality checks:

```bash
npm run check   # Runs lint + typecheck + build
```

### Alternatives

**Screenshot-to-HTML converters (e.g., Screenshot-to-Code, tldraw)** — These tools generate a single HTML page from a screenshot or mockup. They're faster for one-off prototypes but produce flat, non-componentized output with no TypeScript, no responsive breakpoints, and no asset extraction. Choose them when you need a quick visual reference, not a maintainable codebase.

**Manual migration with Cursor or Copilot** — You can use any AI coding assistant to manually rebuild a site component by component. This gives you more control over architecture decisions but takes significantly longer. Choose this approach when the target site has complex application logic that an automated pipeline can't capture, or when you want to make intentional design changes during the rebuild.

**Figma-to-code tools (e.g., Anima, Locofy)** — These convert Figma designs to React code. They work well when you have a Figma file but are useless when you only have a live URL. Choose them when the design exists in Figma and you need production code from it, not when you're reverse-engineering a deployed site.

### Verdict

AI Website Cloner Template is the most practical application of AI agents to frontend development I've seen. It's not trying to replace developers — it's automating the tedious extraction and boilerplate work that nobody enjoys. The five-phase pipeline with component specs and parallel builders shows real engineering thinking, and the 16K stars in three months confirm the demand. The output quality depends on your agent and model, so budget for Claude Code with Opus if you want results worth deploying. For migrations, code recovery, and rapid prototyping, this is a serious time-saver. For complex interactive applications, you'll still need human judgment on the critical paths. But for the 80% of frontend work that's layout, styling, and content — this template handles it impressively well.
