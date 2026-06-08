---
name: lathe
description: "Lathe is a Go CLI that generates hands-on technical tutorials using LLMs with a local UI, designed for developers who learn by doing rather than watching AI code for them."
url: https://github.com/devenjarvis/lathe
stars: 644
forks: 16
language: Go
tags: ["developer-tools", "learning", "llm", "tutorials", "cli"]
featured: false
publishedAt: 2026-06-08
---

## Lathe

### Overview

Lathe is a Go CLI and local web UI that generates hands-on, multi-part technical tutorials on demand using LLMs. It hit Hacker News front page in early June 2026 with 277 points and has gathered 644 GitHub stars since its May 2026 launch. That might sound modest compared to the 60K-star AI mega-repos, but the signal here isn't hype — it's resonance. Developers are starved for tools that help them learn, not just ship.

The project is created by Deven Jarvis, a software engineer who learned to code in the 2000s building PSP homebrew games in Lua and C++. His motivation is personal and specific: he wanted to build a 3D slicer from scratch and couldn't find existing tutorials for the domain. Rather than just prompting Claude to generate the code, he built a system that generates the tutorial instead — something he can work through himself, step by step, in a purpose-built reading UI. That distinction matters more than it sounds.

The core problem Lathe solves is the "vibe coding trap." LLMs are incredible at generating code, but they're terrible at teaching you why that code works. You get a working prototype and zero understanding. Lathe flips the model: the LLM writes the tutorial, you write the code. You type it out by hand, run into errors, debug them, and actually internalize the concepts. It's the difference between watching someone solve a puzzle and solving it yourself.

### Why it matters

The developer education space is at an inflection point. Stack Overflow traffic has declined roughly 35% since 2023, according to SimilarWeb data. Junior developers increasingly reach for ChatGPT before documentation. But the quality of learning from raw LLM prompting is questionable — you get answers without context, solutions without understanding, and code without the mental model needed to maintain or extend it.

Lathe represents a counter-movement that's gaining traction: "AI as teacher, not AI as doer." The build-your-own-x GitHub repo has 370K stars because developers genuinely want to understand how things work, not just use them. Lathe operationalizes that instinct with LLM-generated tutorials that are designed around active learning — you type the code, you run the checkpoints, you do the exercises.

The timing connects to a broader shift in how developers interact with AI coding tools. After the initial "let AI write everything" euphoria of 2024-2025, a growing camp of experienced developers is pulling back. They're using AI for research, scaffolding, and explanation — but keeping the actual coding in their own hands. Lathe is built squarely for that audience.

### Key Features

**Hands-On Tutorial Generation.** Lathe generates multi-part tutorials from any prompt — `/lathe build a 3D Slicer in Erlang` produces a structured, progressive tutorial with code you type yourself. Each part builds on the previous one, with clear checkpoints and exercises. The tutorials are designed for active engagement, not passive reading.

**Purpose-Built Learning UI.** The local web UI at `localhost:4242` includes table-of-contents navigation, side-notes throughout the content that prompt deeper thinking, and left-to-the-reader exercises at the end of each section. It's not just markdown rendering — it's a reading experience designed specifically for technical learning.

**Verification System.** The `/lathe-verify` skill works through every step in a tutorial, creating files in a scratch directory and running commands to confirm the tutorial actually works. Failed verification is recorded, and the UI shows exactly where things broke. This addresses the biggest concern with LLM-generated educational content.

**Source Provenance.** Every tutorial documents its research trail — the URLs the generation skill consulted while writing. These are stored as a durable, tutorial-level record in `metadata.json` and surfaced in the UI. You can sanity-check where the material came from rather than trusting the prose blindly.

**Writing Voices.** Tutorials can be written in different "voices" — `plainspoken` (honest, no fabricated persona) or `companion` (warm, first-person "friend at the keyboard"). You can create custom voices with `/lathe-voice`, which interviews you about register and humor, then drafts a spec. Every tutorial discloses its voice and model in a byline.

**Multi-Agent Support.** Skills work with Claude Code, Cursor, and Codex. The CLI is a single self-contained Go binary with no dependencies. Install with Homebrew, curl, or `go install` — it's the simplest setup story you'll find for an LLM tool.

**Library Management.** Search, filter, and manage tutorials from your growing library. Sort by newest, oldest, or title. Filter by status (unverified, verified, failed), by type (single vs. series), by tag, and by version. All client-side, so it stays fast and offline.

### Use Cases

- **Learning a new language or framework** — Generate a hands-on tutorial for Zig, Rust, or any language you haven't touched. Type the code yourself, run the checkpoints, build muscle memory.
- **Exploring obscure domains** — When you want to build something niche (3D slicer, embedded firmware, custom database) and can't find existing human-written tutorials.
- **Onboarding to a new codebase** — Generate a tutorial that walks through the architecture of a specific repository, with exercises tied to the actual code.
- **Teaching and mentorship** — Senior developers can generate tailored tutorials for junior team members, customized to their tech stack and skill level.
- **Conference talks and workshops** — Generate structured, multi-part content for technical presentations that attendees can work through at their own pace.

### Pros and Cons

Pros:
- The "learn by doing" approach addresses a real gap in how developers use AI tools. You build understanding, not just copy-paste working code.
- Verification system catches hallucinated code paths before you waste time. The scratch-dir approach means verification is safe to run.
- Source provenance is a transparency feature that most LLM tools completely lack. You can see what the model actually researched.
- Single Go binary with no dependencies. Install in seconds, runs everywhere. The simplest setup story in the LLM tool space.

Cons:
- 644 stars means the community is small. Limited tutorials shared publicly, fewer voices and templates available.
- Best results require a "thinking" model (Opus, GPT-5 Codex). Budget models produce lower-quality tutorials that may teach incorrect patterns.
- macOS-first testing. Linux should work but isn't verified by the maintainer. Windows support is unclear.
- The LLM still hallucinates. The verification system helps, but unverified tutorials should be treated as starting points, not ground truth.

### Getting Started

```bash
# Install via Homebrew (macOS)
brew install devenjarvis/tap/lathe

# Or install script (Linux/macOS)
curl -sSf https://raw.githubusercontent.com/devenjarvis/lathe/main/install.sh | sh

# Or via Go (requires Go 1.25+)
go install github.com/devenjarvis/lathe@latest

# Install the LLM skills into your project
lathe skills install

# Generate a tutorial (in Claude Code, Cursor, or Codex)
# /lathe build a REST API in Go with proper error handling

# Serve the local UI
lathe serve
# Opens http://localhost:4242

# Verify a tutorial works
lathe verify <slug>
```

### Alternatives

**build-your-own-x** — The GitHub repo with 370K stars that collects human-written tutorials for building everything from databases to operating systems. It's the gold standard for hands-on learning content, but it's static — you get what exists, and there's no way to generate a tutorial for your specific niche. Lathe fills the gaps where human-written content doesn't exist yet.

**Cursor / Claude Code direct prompting** — You could just ask your LLM to teach you something, but the output is ephemeral, unstructured, and has no reading UI. There's no verification, no source tracking, no library management. Lathe adds the infrastructure layer that makes LLM-generated educational content actually usable.

**Crafting Interpreters** — Robert Nystrom's book is the perfect example of hands-on technical learning done right. But it covers one topic. Lathe can generate that style of tutorial for any domain, with the trade-off that quality varies and human-written content is still superior when it exists.

### Verdict

Lathe is the most interesting developer learning tool I've seen in 2026. It doesn't try to replace your brain with an LLM — it uses the LLM to create the learning materials, then gets out of the way so you can actually learn. The verification system and source provenance are thoughtful touches that show the creator understands the trust problems with LLM-generated content. At 644 stars and growing, it's still early, but the Hacker News reception (277 points, high engagement) suggests developers are hungry for this approach. If you're the kind of developer who prefers building things from scratch over using pre-built solutions, Lathe is worth adding to your toolkit. It won't replace human-written tutorials, but it fills a real gap for obscure domains where those tutorials don't exist.
