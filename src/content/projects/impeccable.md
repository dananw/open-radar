---
name: impeccable
description: "Impeccable is a design skill and CLI for AI coding agents that kills generic AI-generated UI with 23 commands, 7 domain references, and 27 anti-pattern rules."
url: https://github.com/pbakaus/impeccable
stars: 35390
forks: 1927
language: JavaScript
tags: ["design", "ai-agents", "frontend", "design-system", "cli"]
featured: false
publishedAt: 2026-06-07
---

## Impeccable

### Overview

Impeccable is a design skill for AI coding agents — Claude Code, Cursor, Codex, Gemini CLI, and about a dozen others. It gives your AI a vocabulary for good design so it stops producing the same tired Inter-font, purple-gradient, card-in-card layouts that every model defaults to. The project hit 35,000 GitHub stars, which is staggering for what is essentially a set of markdown reference files and a CLI. That number tells you how frustrated developers are with AI-generated frontend code.

The project is created by Paul Bakaus, a name that carries weight in the web performance and design community. He was a Chrome Developer Relations engineer at Google for years, created AMP Stories (now Web Stories), and has been writing about animation, UX, and visual design for over a decade. He knows the gap between what AI produces and what a senior designer would ship — and built Impeccable to close it.

The core problem is concrete: every LLM trained on the same SaaS templates produces the same design tells. Inter for everything. Purple-to-blue gradients. Cards nested in cards. Gray text on colored backgrounds. The rounded-square icon tile above every heading. Impeccable adds seven domain-specific reference files covering typography, color, spatial design, motion, interaction design, responsive design, and UX writing. When your AI agent loads these references, its output shifts from "generic SaaS clone" to "someone actually thought about this." The CLI can scan your existing codebase for 27 deterministic anti-pattern rules — no API key needed — and flag exactly what went wrong.

### Why it matters

The AI coding agent space has a design problem. Tools like Cursor, Claude Code, and Codex can generate functional frontend code in seconds, but the visual quality is consistently mediocre. Developers ship it because it works, and the result is a web full of indistinguishable AI-generated interfaces. Impeccable attacks this at the source: instead of post-processing bad output, it teaches the agent what good looks like before it writes a single line.

This connects to a broader shift in how developers work with AI. Early coding assistants were autocomplete — they finished your line. Current agents are autonomous — they build entire features. The missing piece is taste. Impeccable doesn't make your AI faster or smarter; it makes it more opinionated about design. That's a different kind of value, and the 35K star count suggests the community has been waiting for it.

### Key Features

**Seven Domain Reference Files.** Typography, color-and-contrast, spatial design, motion design, interaction design, responsive design, and UX writing — each is a deep reference that loads alongside every Impeccable command. The typography reference covers modular scales, font pairing, and OpenType features. The color reference teaches OKLCH, tinted neutrals, and dark mode patterns. These aren't generic tips; they're the kind of detailed guidance you'd find in a senior designer's internal wiki.

**23 Commands for Design Vocabulary.** The `/impeccable` skill exposes 23 commands: `craft`, `audit`, `critique`, `polish`, `bolder`, `quieter`, `distill`, `animate`, `colorize`, `typeset`, `layout`, `harden`, `onboard`, `delight`, `overdrive`, `clarify`, `adapt`, `optimize`, `live`, `shape`, `document`, `extract`, and `init`. Each one does something specific — `audit` runs technical quality checks for accessibility, performance, and responsiveness. `polish` does a final design-system alignment pass. `harden` focuses on error handling, i18n, text overflow, and edge cases.

**27 Anti-Pattern Rules with CLI Detection.** The deterministic detector catches issues without any LLM or API key. Run `npx impeccable detect src/` and it scans for AI slop (side-tab borders, purple gradients, bounce easing, dark glows) and general design quality problems (line length, cramped padding, small touch targets, skipped headings). It also accepts URLs for live site scanning via Puppeteer.

**Brand-vs-Product Register.** Impeccable adjusts its defaults based on whether you're building a brand site or a product dashboard. A marketing landing page and a data-heavy admin panel need fundamentally different design decisions, and the skill recognizes that distinction. This prevents the common mistake of applying the same visual language everywhere.

**Multi-Harness Support.** Works with Cursor, Claude Code, OpenCode, Pi, Gemini CLI, Codex CLI, GitHub Copilot, Kiro, Trae, Rovo Dev, and Qoder. The CLI installer auto-detects your harness and compiles the skill to the right location. One command — `npx impeccable skills install` — and you're set regardless of which tool you use.

**Live Visual Variant Mode.** The `/impeccable live` command opens a visual iteration mode where you can tweak elements in the browser and see changes applied in real time. This bridges the gap between "the AI wrote code" and "the design looks right," letting you iterate visually instead of through prompt engineering.

**Git Submodule and Team Workflow.** For teams, Impeccable can be vendored as a Git submodule and linked into multiple harness folders. Updates flow through `git submodule update --remote`, and the linking command supports specifying exactly which providers to configure. This makes it a shared team asset, not a per-developer install.

### Use Cases

- **AI app builders and prototyping tools** — If you're building a product where users describe apps and see them live (like Lovable, Bolt, or v0), Impeccable improves the visual quality of generated output without custom prompt engineering for every component.
- **Design system enforcement** — Teams using AI agents to generate UI components can use the anti-pattern detector in CI to catch generic design choices before they ship. Run `npx impeccable detect` as a build step.
- **Frontend code review** — Use `/impeccable critique` or `/impeccable audit` as part of your PR review workflow. The agent evaluates hierarchy, clarity, accessibility, and emotional resonance — things most linters don't check.
- **Rapid prototyping with taste** — Solo developers building MVPs can use `/impeccable craft` to get a full shape-then-build flow that produces something presentable on the first pass, not something that needs a designer's cleanup pass.
- **Teaching junior developers** — The reference files themselves are excellent documentation. A junior dev who reads the typography and color references will make better design decisions even without the AI agent.

### Pros and Cons

Pros:
- Solves a real, measurable problem: AI-generated frontend code has a consistent "look" that screams automation, and Impeccable fixes it at the source rather than post-processing.
- The CLI anti-pattern detector works without any AI API key or LLM — pure deterministic rules you can run in CI. That's unusual for a tool in this space.
- 35K stars and active development (last pushed June 2026) with 1,927 forks suggest strong community adoption and contribution.

Cons:
- The quality of output still depends on the underlying model. Impeccable guides the AI, but a weak model will produce weak results even with perfect references. It's a floor-raiser, not a guarantee.
- The 23 commands can feel overwhelming. New users might not know whether to start with `craft`, `shape`, `polish`, or `audit`, and the docs could do a better job of recommending workflows for different scenarios.
- Primarily focused on web frontend design. If your AI agent is building backend services, CLI tools, or mobile apps, the design references are less applicable (though the UX writing reference has some crossover value).

### Getting Started

```bash
# Install the skill into your current project (auto-detects your harness)
npx impeccable skills install

# Run the anti-pattern detector on your codebase
npx impeccable detect src/

# Scan a live URL
npx impeccable detect https://your-site.com

# JSON output for CI integration
npx impeccable detect --fast --json src/
```

Once installed, restart your AI harness and try:

```
/impeccable init          # One-time setup: gather design context
/impeccable audit         # Find design issues
/impeccable polish        # Final cleanup before shipping
/impeccable critique      # Full UX design review
```

### Alternatives

**Anthropic's frontend-design skill** — The original design skill that Impeccable built upon. Anthropic's version is simpler and more focused, serving as a good starting point. Choose it if you want minimal overhead and trust the model's baseline design sense. Impeccable is the better choice when you need the full command vocabulary, anti-pattern detection, and multi-harness support.

**v0 by Vercel** — A generative UI tool that produces React components from prompts. v0 handles the design and the code in one step, but you have less control over the design language. Choose v0 when you want fast, opinionated component generation. Choose Impeccable when you want to teach your existing AI agent to design better within your own codebase and stack.

**Locofy or Anima** — Design-to-code tools that convert Figma designs into production frontend code. These work in the opposite direction from Impeccable: you design first, then generate code. Choose them when you have a designer creating mockups. Choose Impeccable when the AI is both the designer and the developer.

### Verdict

Impeccable is the most practical design tool I've seen in the AI coding agent ecosystem. It doesn't try to replace your design system or your designer — it teaches your AI agent what good design looks like so the gap between "AI-generated" and "professionally designed" gets smaller. The 35K stars are earned, not inflated: the anti-pattern CLI alone is worth installing for any team shipping AI-generated frontend code. If you're using Cursor, Claude Code, or any other AI harness to build UI, Impeccable should be in your project. It takes five minutes to install and the difference in output quality is immediately visible.
