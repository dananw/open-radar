---
name: slopless
description: "Slopless is a deterministic textlint linter that catches AI-generated prose slop in Markdown — 50+ rules, zero API calls, with built-in agent skills for Codex and Claude Code."
url: https://github.com/seochecks-ai/slopless
stars: 312
forks: 31
language: TypeScript
tags: ["linter", "markdown", "ai-writing", "developer-tools", "textlint"]
featured: false
publishedAt: 2026-06-09
---

## Slopless

### Overview

Slopless is a deterministic linter for English Markdown that catches the rhetorical patterns AI writing tools leave behind — hollow framing, fake contrasts, hedging, em-dash tics, universalizing claims, and vacuous closers. It hit 312 GitHub stars and 3,500+ monthly npm downloads within three weeks of its mid-May 2026 launch, which tracks with the growing frustration around AI-generated documentation that reads like confident noise.

The project is built by tartakovsky, a solo developer who's pushed 82 commits in under a month. That pace matters because the rule set is the product — 50+ rules across seven families, each one targeting a specific rhetorical pattern that LLMs default to. This isn't a word blocklist. It's structural analysis of how AI prose works: the "let me be honest" openers, the "in a world where" framings, the "we don't sell X, we sell Y" negation-reframes that ChatGPT and Claude produce constantly.

The tool ships as both a standalone CLI and a textlint preset, so it integrates into existing Markdown linting pipelines without friction. The CLI bundles textlint internally — no separate install needed. And it ships agent skills for Codex and Claude Code, so you can tell your coding agent to write documentation, run Slopless, rewrite, and iterate until the output passes. No model calls, no API key, no cost per check.

### Why it matters

Here's the problem: AI coding agents are now writing most project documentation, README files, blog posts, and changelog entries. A May 2026 Stack Overflow survey showed 72% of developers use LLMs for documentation tasks. But the output has a distinct texture — confident, hollow, structurally repetitive. Readers notice. Trust erodes.

Existing prose linters (proselint, write-good, vale, alex) catch grammar issues and inclusive language problems. None of them target AI-specific rhetorical patterns. Slopless fills that gap with rules like `boilerplate-framing` (catches "let me be clear," "here's the thing"), `negation-reframe` (catches "we don't do X, we do Y"), `universalizing-claims` (catches "everyone knows," "nobody disagrees"), and `semantic-thinness` (flags sentences that sound meaningful but say nothing).

The timing connects to a broader shift. Development teams are building content-heavy sites — documentation portals, marketing pages, blog platforms — and AI agents are producing the copy. Slopless acts as a quality gate between AI generation and publication. You pipe your Markdown through it, get structured JSON findings, and either fix manually or let the agent iterate. It's the missing piece in the AI-assisted content pipeline.

### Key Features

**50+ Deterministic Rules Across Seven Families.** The rule set covers boilerplate framing, prohibited phrases, negation-reframes, universalizing claims, cliches, hedging, and semantic thinness. Each rule targets a structural pattern, not just a word list. The `negation-reframe` rule, for instance, catches "We don't sell software. We sell outcomes" — a pattern that feels clever but says nothing. Rules are documented individually on the wiki with rationale and examples.

**Zero API Calls, Zero Cost.** Slopless runs entirely locally. No LLM calls, no API keys, no token costs. This makes it viable for CI pipelines, pre-commit hooks, and agent loops where you'd burn significant tokens calling an LLM to review prose quality. Deterministic output also means reproducible results — same input always produces the same findings.

**Standalone CLI and textlint Preset.** The CLI bundles textlint internally, so `npx slopless "docs/**/*.md"` works with zero configuration. If you already run textlint with other presets, install `slopless` as a preset instead and it runs alongside your existing rules. The CLI outputs JSON by default; textlint integration supports all of textlint's output formatters.

**Agent Skill Integration.** `npx slopless install-skill codex` and `npx slopless install-skill claude` install agent skills that teach coding agents to use Slopless as a rewrite loop. The agent writes prose, runs Slopless, reads the JSON findings, rewrites, and repeats until the output is clean. This is the intended primary workflow — let the agent handle the iteration.

**SLSA v1 Provenance Attestation.** Every release since 0.2.13 is published from GitHub Actions via OIDC with Sigstore-backed provenance. Supply chain security isn't an afterthought. The package also carries Socket.dev quality badges and OSSF Scorecard analysis.

**Granular Rule Control.** Disable individual rules inline with `<!-- textlint-disable slopless/cliches -->` blocks, or turn off rules globally in your textlint config with `"preset-slopless": { "cliches": false }`. Exit codes follow standard conventions: 0 for clean, 1 for findings, 2 for failure. JSON output includes rule IDs, line numbers, and matched text for programmatic processing.

### Use Cases

- **Documentation-heavy projects** — Teams using AI agents to generate API docs, README files, and guides can pipe output through Slopless as a CI quality gate. Reject PRs where the agent left rhetorical slop in documentation.

- **Content platforms and blogs** — If your CMS or static site generator produces Markdown from AI prompts (Headless CMS + LLM pipelines), Slopless catches the patterns that make readers click away. Run it at build time.

- **Agent-driven writing workflows** — The primary use case. Install the Codex or Claude Code skill, tell the agent to write your docs, and let it iterate through Slopless until the output passes. No manual editing needed.

- **Open source project maintainers** — When contributors submit PRs with AI-generated descriptions or changelog entries, Slopless flags the slop before merge. Consistent, human-sounding project documentation.

- **Technical writing teams** — Writers who draft with LLM assistance can use Slopless as a self-review step. It catches patterns that are hard to spot when you've been staring at the same text for hours.

### Pros and Cons

Pros:
- Deterministic output means it works in CI, pre-commit hooks, and agent loops without flakiness or token costs. Same input, same output, every time.
- The rule design is genuinely smart — structural analysis rather than word matching catches the patterns that make AI prose feel "off," even when the grammar is perfect.
- Agent skill integration makes this the first prose linter designed for the AI-writing-first workflow that most teams now use.

Cons:
- English-only. If your documentation is multilingual, you'll need a different tool for non-English content.
- Solo maintainer with 82 commits in a month — impressive velocity but a bus-factor risk. The project is young enough that governance and contribution models are still forming.
- Deterministic rules can produce false positives on intentional rhetorical choices. A developer writing "at the end of the day" deliberately will get flagged. The textlint-disable comment syntax mitigates this, but it adds friction.

### Getting Started

```bash
# Install as a dev dependency
npm install -D slopless

# Run against your docs
npx slopless "docs/**/*.md"

# Install the Codex agent skill
npx slopless install-skill codex

# Install the Claude Code agent skill
npx slopless install-skill claude

# Or use as a textlint preset (if you already run textlint)
npm install -D slopless textlint
```

Add to your `.textlintrc.json`:

```json
{
  "rules": {
    "preset-slopless": true
  }
}
```

Run it in CI:

```bash
mkdir -p .slopless/findings
npx slopless "docs/**/*.md" > ".slopless/findings/$(date +%Y-%m-%d-%H%M%S)--review.json"
```

Exit code 0 means clean. Exit code 1 means findings were reported.

### Alternatives

**Vale** — The most established prose linter with a large rule ecosystem and support for custom style guides. Vale is more mature and supports multiple languages, but it doesn't target AI-specific rhetorical patterns out of the box. You'd need to write custom rules to match what Slopless ships. Better choice if you need a general-purpose prose linter with extensive customization.

**Alex** — Focused specifically on inclusive and considerate language. Alex catches insensitive phrasing; Slopless catches hollow AI prose. They solve different problems and work well together. Install both if your content pipeline needs both inclusive language checks and anti-slop rules.

**write-good** — A classic English prose linter that catches passive voice, weasel words, and readability issues. write-good is simpler and has broader adoption, but its rules are general grammar concerns, not AI-specific patterns. Good for basic writing quality; Slopless is better for the specific problem of AI-generated content.

### Verdict

Slopless is the first tool I've seen that treats AI prose slop as a solvable engineering problem rather than a vibes-based complaint. The 50+ rules are genuinely well-designed — each one targets a structural pattern that LLMs default to, not just a word list that any regex could match. The agent skill integration makes it the natural fit for teams where coding agents write documentation and you need a quality gate that doesn't burn tokens. At 312 stars and 3,500 monthly npm downloads in three weeks, the community signal is clear: developers want this. If your team uses AI to write any Markdown — docs, blog posts, changelogs, README files — install Slopless today. It's the cheapest quality improvement you'll make this quarter.
