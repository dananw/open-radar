---
name: open-code-review
description: "Alibaba's AI-powered code review CLI — hybrid deterministic pipelines and LLM agents for precise, line-level code analysis at scale."
url: https://github.com/alibaba/open-code-review
stars: 986
forks: 61
language: Go
tags: ["code-review", "ai", "devtools", "cli", "alibaba"]
featured: false
publishedAt: 2026-06-02
---

## Open Code Review

### Overview

Open Code Review is an AI-powered code review CLI tool from Alibaba Group. It's been running internally for two years, serving tens of thousands of developers and catching millions of code defects. In May 2026, Alibaba open-sourced it, and it hit nearly 1,000 GitHub stars in two weeks.

The project is built in Go and takes a fundamentally different approach from the "throw everything at an LLM" strategy most AI code review tools use. Instead of relying purely on natural language prompting, Open Code Review combines deterministic engineering pipelines with an LLM agent — each handling what it does best. The engineering layer guarantees correctness for things that must not go wrong (file selection, comment positioning, rule matching), while the agent focuses on dynamic decisions and context retrieval.

The core problem it solves is reliability. If you've used general-purpose AI agents for code review, you know the pain: incomplete coverage on large changesets, line numbers that drift from the actual code location, and quality that fluctuates with minor prompt changes. Open Code Review addresses all three through its hybrid architecture, and the fact that it's been validated at Alibaba's scale — one of the largest codebases in the world — gives it credibility that most open-source AI tools lack.

### Why it matters

AI code review is having a moment. GitHub Copilot, CodeRabbit, and a dozen other tools now offer automated review, but most of them are SaaS products with limited customization. Open Code Review is different: it's a CLI tool you run locally or in CI, it works with any OpenAI-compatible or Anthropic endpoint, and its review rules are fully customizable per project and per file pattern.

For fullstack developers working across React, NestJS, Django, and Go, the language-agnostic rule system is the real draw. You can define different review rules for your TypeScript frontend, your Go backend, and your Python ML pipeline — all in the same repo. The tool automatically matches the right rules to each file using glob patterns with brace expansion. That's a level of specificity you won't get from a generic "review my code" prompt.

The CI/CD integration story is also solid. GitHub Actions and GitLab CI examples are included in the repo, and the JSON output format with `--audience agent` makes it easy to parse results programmatically. For teams already using AI coding agents like Claude Code, the slash command integration means code review becomes part of the development loop, not a separate step.

### Key Features

**Hybrid Deterministic + Agent Architecture.** This is the core innovation. Deterministic pipelines handle file selection, smart file bundling (grouping related files like `message_en.properties` and `message_zh.properties`), fine-grained rule matching, and comment positioning. The LLM agent handles dynamic context retrieval and review reasoning. This split means the tool doesn't "cut corners" on large changesets the way purely prompt-driven agents do.

**Four-Layer Rule Priority System.** Rules cascade through four layers: CLI flag override (highest), project-level `.opencodereview/rule.json`, user-level global config, and built-in system defaults (lowest). Each layer uses first-match-wins with glob patterns supporting `**` recursive matching and `{java,kt}` brace expansion. You can commit project-specific rules to git so the whole team shares them.

**Multi-Provider LLM Support.** Works with Anthropic (Claude), OpenAI, and any OpenAI-compatible endpoint. Environment variables override config files, and it even parses your `.zshrc` or `.bashrc` for Claude Code environment variables (`ANTHROPIC_BASE_URL`, `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_MODEL`). Setup takes under two minutes.

**Built-in Security and Quality Rules.** The system default rules cover common vulnerability patterns: NPE (null pointer exceptions), thread-safety issues, XSS, SQL injection, and more. These aren't generic "check for security issues" prompts — they're template-engine-based rules that get matched precisely to file characteristics, keeping the model's attention focused.

**Coding Agent Integration.** Install as a Claude Code skill with `npx skills add alibaba/open-code-review`, as a Claude Code plugin via the marketplace, or copy a command file directly. The `/open-code-review:review` slash command runs OCR and automatically filters and fixes issues. This turns code review from a post-hoc check into part of the coding flow.

**Web Session Viewer.** The `ocr viewer` command launches a WebUI on `localhost:5483` where you can browse review session history. Useful for understanding what the tool flagged across multiple reviews and for presenting results to teammates who don't live in the terminal.

**Concurrent Review Engine.** Each bundled file group runs as a sub-agent with isolated context, supporting up to 8 concurrent reviews by default (configurable via `--concurrency`). The divide-and-conquer approach keeps reviews fast even on large changesets, with a configurable timeout per concurrent task.

### Use Cases

- **Fullstack monorepos with mixed languages** — Define separate review rules for your React/TypeScript frontend, Go microservices, and Python data pipeline, all in one `.opencodereview/rule.json` committed to the repo root.
- **CI/CD pipeline integration** — Run `ocr review --from origin/main --to origin/feature-branch --format json --audience agent` in your GitHub Actions workflow to automatically review every pull request before human reviewers see it.
- **Security-focused teams** — Use the built-in rules for SQL injection, XSS, and thread-safety, then add custom rules for your organization's specific compliance requirements.
- **AI-assisted development workflows** — Install the Claude Code plugin and use `/open-code-review:review` as a slash command during development, getting line-level feedback without leaving your editor.
- **Large-scale codebase migrations** — When refactoring across hundreds of files, use `--commit` mode to review each commit individually and catch regressions that would slip through manual review.

### Pros and Cons

Pros:
- Battle-tested at Alibaba's scale — this isn't a weekend project. It's served tens of thousands of developers and caught millions of defects over two years before open-sourcing.
- The hybrid architecture solves real problems that purely prompt-driven tools have: incomplete coverage, position drift, and unstable quality. The deterministic layer provides hard guarantees the LLM cannot.
- Fully self-hosted and LLM-agnostic. Run it with Claude, GPT-4, or a local model. No vendor lock-in, no SaaS dependency.
- The four-layer rule system with glob matching is genuinely useful for polyglot repos. Different rules for different file patterns, committed to git, enforced automatically.

Cons:
- Go binary installation requires manual download for non-npm users. The npm package (`@alibaba-group/open-code-review`) is the recommended path, but the `ocr` command name might conflict with other tools.
- The built-in system rules are optimized for Java and common enterprise patterns. Web frontend developers (React, Vue) may need to write custom rules to get the most value.
- Documentation is solid but the tool assumes familiarity with CLI workflows and LLM API configuration. Not a plug-and-play experience for developers new to AI tooling.
- Requires a configured LLM endpoint — there's no free tier or built-in model. You need your own API key for Anthropic or OpenAI.

### Getting Started

```bash
# Install via npm (recommended)
npm install -g @alibaba-group/open-code-review

# Or install from source
git clone https://github.com/alibaba/open-code-review.git
cd open-code-review
make build
sudo cp dist/opencodereview /usr/local/bin/ocr

# Configure your LLM
ocr config set llm.url https://api.anthropic.com/v1/messages
ocr config set llm.auth_token your-api-key-here
ocr config set llm.model claude-opus-4-6
ocr config set llm.use_anthropic true

# Test connectivity
ocr llm test

# Review your workspace changes
cd your-project
ocr review

# Review a branch diff
ocr review --from main --to feature-branch

# Preview which files would be reviewed (no LLM calls)
ocr review --preview

# Launch the session viewer
ocr viewer
```

Add project-specific rules by creating `.opencodereview/rule.json` in your repo:

```json
{
  "rules": [
    {
      "path": "src/api/**/*.ts",
      "rule": "Check for input validation, rate limiting, and proper error handling"
    },
    {
      "path": "src/components/**/*.tsx",
      "rule": "Verify proper TypeScript types, no 'any' usage, and accessibility attributes"
    }
  ]
}
```

### Alternatives

**CodeRabbit** — A SaaS AI code review tool that integrates directly with GitHub and GitLab PRs. CodeRabbit is easier to set up (no CLI, no LLM configuration) and offers a free tier for open-source projects. However, it's a hosted service with limited rule customization, and you can't control which LLM processes your code. Choose CodeRabbit if you want zero-setup AI review on public repos.

**Codeium / Supermaven** — These are primarily AI code completion tools with some review capabilities bolted on. They're excellent at the autocomplete use case but their review features are shallow compared to Open Code Review's dedicated architecture. Choose them for inline code suggestions, not systematic review.

**Sweep AI** — An AI junior developer that creates PRs and does basic review. Sweep is more autonomous (it writes code, not just reviews it) but its review quality is lower and it doesn't have Open Code Review's deterministic positioning guarantees. Choose Sweep if you want an AI that both writes and reviews code, accepting lower review precision.

### Verdict

Open Code Review is the most credible AI code review tool I've seen open-sourced. The two years of production use at Alibaba isn't marketing fluff — the architecture reflects real lessons learned from millions of defect detections. The hybrid deterministic-agent approach is genuinely smarter than "give the diff to GPT and hope for the best," and the customizable rule system makes it practical for polyglot fullstack teams.

The main friction point is setup: you need your own LLM API key and some CLI comfort. But for teams already running CI/CD pipelines and using AI coding tools, adding `ocr review` to your workflow is a straightforward upgrade. At nearly 1,000 stars in two weeks with active development from Alibaba engineers, this has the momentum to become a standard tool in the AI-assisted development stack.
