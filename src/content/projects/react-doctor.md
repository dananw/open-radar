---
name: react-doctor
description: "React Doctor is a deterministic codebase scanner that catches bugs, performance issues, and bad patterns in AI-generated and human-written React code. 12K+ stars, MIT licensed."
url: https://github.com/millionco/react-doctor
stars: 12240
forks: 388
language: TypeScript
tags: ["react", "code-quality", "ai-agents", "linting", "developer-tools"]
featured: false
publishedAt: 2026-06-06
---

## React Doctor

### Overview

React Doctor is a deterministic linter and codebase scanner built specifically for React. It finds bugs across state management, effects, performance, security, accessibility, and architecture — and it does it without running your code. In a world where AI coding agents are writing an increasing share of React code, that kind of static analysis matters more than ever. The project hit 12,000 GitHub stars within four months of its February 2026 launch and is already on version 0.4.0 with 179 published npm releases.

The project comes from Aiden Bai and the team at Million Software, Inc. (million.dev). If that name rings a bell, it's because Bai created Million.js, the virtual DOM replacement that makes React faster by compiling to optimized DOM operations. He's also the developer with 5,500 GitHub followers and 185 public repos. The jump from "make React faster" to "make React code better" is a natural one, and the pedigree gives React Doctor real credibility in the React ecosystem. This isn't a weekend project — it's a focused product from a company that's been solving React performance problems for years.

The core problem React Doctor addresses is a 2026 reality: AI coding agents write a lot of React code now. Tools like Cursor, Claude Code, Copilot, and Codex generate components that look correct but contain subtle issues — stale closures in useEffect, array indices as keys, missing dependency arrays, unnecessary re-renders, accessibility violations, and security holes. React Doctor scans your entire codebase deterministically and reports these issues with specific rule names, line numbers, and fix suggestions. The latest release also ships ESLint and OxLint plugins, a language server for live editor diagnostics, and VS Code/Zed extensions.

### Why it matters

The React ecosystem has ESLint and TypeScript, but neither is purpose-built for the patterns that trip up AI-generated code. ESLint catches syntax issues and some best practices, but it doesn't understand React's rendering model deeply enough to flag when a useEffect will cause an infinite loop or when a component is missing a key prop in a map. TypeScript catches type errors but can't tell you that your component re-renders 47 times per second because you're creating a new object reference on every render.

React Doctor fills that gap with rules that are specifically tuned for the kinds of mistakes that show up in agent-written code. The GitHub Action is particularly clever — on a pull request, it scans only the issues your change introduced (diffing against the merge-base) and posts inline review comments on the changed lines. It's like Codecov but for React code quality. That workflow integration makes it useful not just for individual developers but for teams where AI agents submit PRs that humans review.

The broader trend here is the "AI code quality" tooling category. As more teams adopt AI coding assistants, the need for deterministic validators that catch agent mistakes is growing fast. React Doctor is the first React-specific tool that's built from the ground up for this workflow, and 12K stars in four months suggests developers agree it's filling a real gap.

### Key Features

**Deterministic Codebase Scanning.** React Doctor analyzes your code statically — no running, no building, no test suite required. Point it at your project root and it reports issues across state, effects, performance, security, accessibility, and bundle size. The rules are deterministic, meaning the same input always produces the same output. This matters for CI because you can diff results between commits and track improvement over time.

**Agent Skill Installation.** Run `npx react-doctor@latest install` and the tool generates a skill file that coding agents (Claude Code, Cursor, Codex, OpenCode) can read to learn from your project's specific issues. The agent then applies those lessons when writing new code. This feedback loop — scan, learn, improve — is the most forward-thinking feature in the project. Instead of just catching bugs after the fact, it trains your AI to write better React on the next pass.

**Experimental Language Server (LSP).** React Doctor ships an LSP server that provides live diagnostics as you type in VS Code, Cursor, Zed, Neovim, Sublime, Emacs, Helix, or any LSP client. Issues show up as underlined text with rich hovers and quick fixes. The experimental prefix signals that the protocol and caching may change between releases, but the feature works today and is surprisingly responsive for a tool that does full codebase analysis.

**GitHub Action for PR Reviews.** The GitHub Action scans pull requests and reports only the issues your change introduced, comparing against the merge-base commit. It posts inline review comments on changed lines and a sticky summary with a new/fixed delta. This is perfect for teams where AI agents open PRs — the action acts as an automated reviewer that catches React-specific patterns that standard CI checks miss.

**ESLint and OxLint Plugins.** For teams that already use ESLint or OxLint, React Doctor provides official plugins (`eslint-plugin-react-doctor` and `oxlint-plugin-react-doctor`) that integrate its rules into existing linting workflows. You get the same deterministic analysis without adding another tool to your pipeline. The OxLint plugin is particularly interesting because OxLint is significantly faster than ESLint for large codebases.

**Framework-Agnostic Analysis.** React Doctor works with any React setup — Next.js, Vite, TanStack, React Native, Expo, Remix, Gatsby, or plain React with any bundler. It detects your framework automatically and adjusts its analysis accordingly. This is important because AI agents don't always use the same framework you'd choose, and you need a tool that catches issues regardless of the setup.

**Configurable Rule System.** Configure rules via `doctor.config.ts`, `.js`, `.mjs`, `.cjs`, `.json`, or `.jsonc`. Disable specific rules, adjust severity levels, or tailor the analysis to your project's conventions. The configuration format is clean and TypeScript-typed, with a JSON schema available for editor autocompletion.

### Use Cases

- **Teams using AI coding agents** — When Cursor or Claude Code generates React components, run `npx react-doctor` to catch the subtle bugs that look correct but fail in production. Install the agent skill so the agent learns from its mistakes.

- **Pull request quality gates** — Add the GitHub Action to your CI pipeline so every PR gets automated React-specific code review. The diff-based reporting means you only see new issues, not noise from legacy code.

- **Large codebase audits** — Run a full scan on an existing React project to identify accumulated technical debt: stale closures, missing keys, accessibility violations, and performance anti-patterns. Use the results to prioritize refactoring.

- **Onboarding new developers** — New team members (human or AI) can run React Doctor against the codebase to understand project conventions and common pitfalls. The rule names serve as documentation of team standards.

- **Editor-integrated development** — Use the LSP server during development to get real-time feedback as you write components. Catch issues before they make it to a commit, without waiting for CI.

- **React Native and mobile apps** — The tool works with React Native and Expo, making it useful for mobile teams that share code patterns with web teams but face different performance and accessibility constraints.

### Pros and Cons

Pros:
- Purpose-built for React with rules that catch issues ESLint and TypeScript miss, particularly around hooks, rendering, and the kinds of mistakes AI agents make frequently.
- The agent skill installation feature is genuinely novel — it creates a feedback loop where your AI coding tools get better over time based on your project's actual issues.
- 179 npm releases and daily updates (latest on June 5, 2026) indicate extremely active development. The team ships fast and responds to issues quickly.
- The GitHub Action's diff-based reporting is smart engineering — it avoids the "wall of noise" problem that makes most linting CI checks useless on large codebases.

Cons:
- Still at version 0.4.0, which means the rule set is evolving and some rules may produce false positives. The API surface for plugins and configuration may change.
- The experimental LSP is labeled as such for a reason — caching and protocol details may shift between releases, which could break editor integrations temporarily.
- The project is React-specific, so teams with mixed Vue/Angular/React codebases need a separate solution for non-React files. The rules don't extend to other frameworks.
- Telemetry is opt-out rather than opt-in, which some teams may find uncomfortable. The data collected is anonymous and doesn't include file contents, but the default-on approach may not sit well with everyone.

### Getting Started

```bash
# Run a full audit on your React project
npx react-doctor@latest

# Install the agent skill for your coding assistant
npx react-doctor@latest install

# Add the ESLint plugin to your existing config
npm install -D eslint-plugin-react-doctor
```

Add to your ESLint config:

```js
// eslint.config.js
import reactDoctor from "eslint-plugin-react-doctor";

export default [
  reactDoctor.configs.recommended,
  // your other configs...
];
```

Run the experimental LSP in your editor:

```bash
# For VS Code / Cursor (via extension)
# Install "React Doctor" from the marketplace

# For any LSP client over stdio
react-doctor experimental-lsp --stdio
```

Add the GitHub Action to your CI:

```yaml
# .github/workflows/react-doctor.yml
name: React Doctor
on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]

permissions:
  contents: read
  pull-requests: write

jobs:
  react-doctor:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
        with:
          fetch-depth: 0
      - uses: millionco/react-doctor@v2
```

### Alternatives

**ESLint with eslint-plugin-react and eslint-plugin-react-hooks** — The standard approach to React linting that most projects already use. ESLint catches syntax issues, some hook violations, and common mistakes, but its rules are general-purpose and don't understand React's rendering model as deeply as React Doctor. ESLint is a superset — you'd use React Doctor alongside it, not instead of it, for the AI-agent-specific patterns.

**Biome** — A fast all-in-one linter and formatter written in Rust that replaces ESLint and Prettier. Biome has some React-specific rules but is primarily focused on general JavaScript/TypeScript quality. It's faster than ESLint but doesn't have React Doctor's depth of analysis for hooks, rendering, and accessibility patterns. Good choice if you want one tool for formatting and basic linting, but it won't catch the subtle React issues React Doctor targets.

**Knip** — A tool for finding unused dependencies, exports, and files in TypeScript projects. Knip is complementary to React Doctor — it focuses on dead code elimination rather than code quality patterns. Teams concerned about bundle size and code hygiene should use both tools together.

### Verdict

React Doctor is the right tool at the right time. The explosion of AI-generated React code has created a quality gap that traditional linting tools weren't designed to fill. With 12,000 stars, daily releases, and backing from the Million.js team, it has the momentum and engineering depth to become a standard part of the React development workflow. The agent skill installation feature alone — where the tool trains your AI to write better code based on your project's specific issues — is worth the adoption. If your team uses AI coding assistants and writes React, this should be in your CI pipeline today. It's not optional anymore; it's the cost of shipping reliable code when half your components are written by machines.
