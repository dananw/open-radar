---
name: guard-skills
description: "guard-skills is a set of quality gate skills for AI coding agents — catch LLM-specific failure modes in code, tests, and docs before they reach your repo."
url: https://github.com/amElnagdy/guard-skills
stars: 417
forks: 54
language: Markdown
tags: ["ai-agents", "code-review", "quality-gates", "developer-tools", "skills"]
featured: false
publishedAt: 2026-06-08
---

## guard-skills

### Overview

guard-skills is a collection of five focused quality gates for AI coding agents. You let your agent do its thing — write code, generate tests, draft docs — then run the relevant guard on the diff before committing. It crossed 400 GitHub stars in its first two days after launching on June 6, 2026, which tracks with how fast the "agent skills" ecosystem is growing right now. The repo lives on skills.sh, the emerging package registry for coding agent skills, and installs with a single `npx skills add` command.

The project is built by amElnagdy, a developer who's clearly spent enough time reviewing AI-generated pull requests to catalog exactly where LLMs fail systematically. The repo includes five distinct guards — `clean-code-guard`, `test-guard`, `docs-guard`, `wp-guard`, and `woo-guard` — each targeting a specific category of AI-generated output. What makes this different from generic "code review" tools is that every rule in every guard is tuned for failure modes that are specific to LLM-generated code. Not human mistakes. AI mistakes.

The core problem guard-skills addresses is one every team using AI coding tools has hit: agents produce code that looks right, passes basic checks, but contains subtle anti-patterns that only surface in production or during code review. Hardcoded success returns. Broad exception swallowing. Mock abuse in tests. Hallucinated API references in docs. WordPress hooks without nonce verification. The list is long and consistent across models. guard-skills encodes these patterns as review rules your agent can apply to its own output.

### Why it matters

The AI coding agent space has crossed the threshold from "cool demo" to "production workflow." Claude Code, Cursor, Codex, and OpenClaw are shipping real features into real codebases. But the quality assurance layer hasn't caught up. Most developers still review AI-generated code manually, catching the same types of mistakes over and over. That's a tax on every PR, and it scales linearly with how much code your agents produce.

guard-skills operationalizes that review knowledge into a format agents can consume. It's not trying to replace human code review — it's trying to eliminate the boring, repeatable part. The "did the agent wrap everything in try/catch and return success" check. The "did the agent mock its own state objects instead of testing real behavior" check. The "does the README reference functions that don't exist" check. These are pattern-matching exercises that humans do poorly at scale and agents can do consistently.

This connects to a broader shift in the developer tools landscape. The interesting work isn't at the model layer anymore — it's at the orchestration layer. MCP servers, agent skills, context engineering, quality gates. guard-skills sits in the "post-generation review" category, which is arguably the most underserved part of the AI coding pipeline. You can generate code all day, but if you can't verify it automatically, you're just moving the bottleneck from writing to reviewing.

### Key Features

**Five Specialized Guards.** Each guard targets a specific output category with rules tuned for AI-specific failure modes. `clean-code-guard` catches LLM code smells across any language — over-abstraction, broad error swallowing, hallucinated APIs, premature abstraction, and copy-from-similar bugs. `test-guard` catches mock abuse, duplicate tests, implementation-detail assertions, and tests that verify nothing. `docs-guard` treats documentation as a list of claims and verifies every one against the codebase. The WordPress and WooCommerce guards add platform-specific security checks that generic tools miss entirely.

**AI-Specific Failure Mode Detection.** This is what separates guard-skills from generic linters and code review tools. The rules reference published research on LLM failure patterns — duplication growth in generated code, package hallucination, agents declaring success despite failed tests, and the tendency to wrap everything in `try/catch -> return ok`. These aren't theoretical concerns. They're patterns that show up in every AI-generated PR if you know what to look for.

**Progressive Disclosure Architecture.** Each skill is a `SKILL.md` entrypoint that stays small so it loads cheaply into your agent's context window. Deeper guidance — framework-specific references, edge case documentation, source citations — lives in a `references/` subdirectory that the agent loads only when the task requires it. This matters because context window budget is real. A 200-line skill that loads on every invocation is expensive. A 50-line entrypoint that pulls in 500 lines of references only when needed is efficient.

**Universal Agent Compatibility.** The skills work with Claude Code, Codex, Cursor, OpenCode, Windsurf, Cline, Gemini CLI, and any other agent that supports the `skills.sh` standard. Install for a specific agent with `--agent claude-code` or install globally. The skill format is Markdown plus lightweight YAML metadata — no executable scripts, no network calls, no MCP server dependencies. This means the skills are inspectable, auditable, and safe to run in any environment.

**WordPress and WooCommerce Specialization.** The `wp-guard` and `woo-guard` skills are the most niche but arguably the most valuable. WordPress powers 40%+ of the web, and AI-generated WordPress plugins have a predictable set of security failures: missing escaping and sanitization, absent nonce checks, direct database queries without prepared statements, and i18n-unready strings. `woo-guard` adds HPOS-safe order access, CRUD-over-direct-meta enforcement, and money-handling discipline. These are the kinds of bugs that ship into production and get exploited.

**Zero Dependency, Fully Inspectable.** The entire package is Markdown files and YAML metadata. No executable code. No network calls. No credentials. External source URLs are documented in each skill's `references/sources.md`. The maintainer runs `skillspector scan` and `quick_validate.py` before each release. You can read every rule in plain English before installing anything.

**Composable Design.** Guards are designed to be combined. Run `clean-code-guard` on production code, then `test-guard` on the test code, then `docs-guard` on the README. Each guard is independent — you can install one, five, or anything in between. The WordPress guards stack on top of each other: `woo-guard` assumes `wp-guard` is also active for the WordPress layer.

### Use Cases

- **Pre-commit quality gate** — After your coding agent produces a feature branch, run `clean-code-guard` on the diff before committing. Catches the broad exception swallowing, hallucinated APIs, and over-abstraction that every LLM produces when asked to "make it robust."
- **Test quality assurance** — Run `test-guard` on generated test files before merging. Catches mock abuse (mocking your own state objects instead of external dependencies), duplicate test bodies, and assertions that verify log messages instead of behavior.
- **Documentation accuracy** — Run `docs-guard` on any README, API reference, or docstring update. Treats every claim in the docs as a verifiable assertion and checks it against the actual codebase. Catches hallucinated function names, broken code samples, and unverifiable performance claims.
- **WordPress plugin security** — Run `wp-guard` on AI-generated WordPress code before shipping. Catches missing escaping/sanitization, absent nonce verification, direct database queries, and strings that aren't translation-ready. This is the guard that prevents the CVE you'd find six months later.
- **WooCommerce extension safety** — Run `woo-guard` on checkout, payment, and order logic. Catches direct order meta access (breaks HPOS), missing compatibility declarations, and server-side checkout validation gaps. Critical for any WooCommerce extension that touches money.
- **CI pipeline integration** — Add guard invocations to your CI pipeline so every AI-generated PR gets automatically checked. The guards produce structured output that maps to specific fix instructions your agent can execute.

### Pros and Cons

Pros:

- Solves a real, felt problem. Every team using AI coding tools manually reviews for the same failure modes. guard-skills automates that review with rules tuned specifically for LLM output patterns, not generic code quality checks.
- Extremely lightweight. No runtime dependencies, no servers, no credentials. The entire package is Markdown that loads into your agent's context window. Install in 10 seconds, start catching bugs immediately.
- Platform-specific guards (WordPress, WooCommerce) fill a gap that no generic tool addresses. AI-generated WordPress plugins have a predictable security failure pattern, and `wp-guard` encodes the institutional knowledge that senior WordPress developers carry in their heads.
- MIT licensed and fully inspectable. Every rule is plain English. No black boxes, no opaque scoring algorithms, no "trust me" assertions.

Cons:

- Only five guards so far. The `clean-code-guard` covers all languages generically, but language-specific guards (TypeScript strictness, Go idioms, Python type safety) would make the tool more precise. The maintainer may add these, but they don't exist yet.
- Dependent on the skills.sh ecosystem. If the `skills` CLI or the skills.sh registry doesn't gain traction, installation becomes harder. The skills are just Markdown files you can copy manually, but the ergonomic `npx skills add` workflow is what makes adoption frictionless.
- No automated integration with GitHub Actions or CI pipelines out of the box. You can run the guards in CI by invoking your agent with the guard skill loaded, but there's no pre-built GitHub Action or CI template. Teams need to build their own integration.

### Getting Started

```bash
# List available guards
npx skills add amElnagdy/guard-skills --list

# Install all guards
npx skills add amElnagdy/guard-skills

# Install a specific guard
npx skills add amElnagdy/guard-skills --skill clean-code-guard

# Install for a specific agent
npx skills add amElnagdy/guard-skills --skill test-guard --agent claude-code

# Install globally for all agents
npx skills add amElnagdy/guard-skills --global
```

Then use in your agent session:

```text
Use $clean-code-guard on the diff you just produced.
Use $test-guard on the tests you just wrote.
Use $docs-guard on this README update before we ship it.
Use $wp-guard on this WordPress plugin change.
Use $woo-guard on this WooCommerce checkout change.
```

### Alternatives

**WordPress/agent-skills** — The official WordPress ecosystem skill set, also hosted on skills.sh. It teaches agents how to build across the WordPress ecosystem — creating plugins, themes, blocks, REST endpoints, and WP-CLI commands. It's broader in scope (teaching vs. reviewing) and maintained by the WordPress core team. Choose it when you need your agent to learn WordPress development patterns. Choose guard-skills when your agent already knows how to build WordPress code and you need a review gate to catch what it gets wrong.

**AI linters (ESLint AI rules, Ruff AI checks)** — Traditional linters with AI-specific rule sets. These integrate into existing CI pipelines and catch syntax-level issues, but they're language-specific and don't understand the semantic patterns of LLM-generated code. They catch `no-unused-vars`, not "this function wraps everything in try/catch and returns success regardless." Use both — linters for syntax, guard-skills for semantic AI failure modes.

**Manual code review** — The status quo. Senior developers reviewing every AI-generated PR, catching the same patterns every time. Works fine at low volume. Doesn't scale. guard-skills is trying to automate the repeatable 80% of that review so humans can focus on the architectural and business logic decisions that actually require judgment.

### Verdict

guard-skills is the most practical quality assurance tool I've seen in the AI coding agent space. It's not trying to be a framework, a platform, or a paradigm shift. It's five focused review gates that catch the specific failure modes LLMs produce, packaged as skills your agent can run on its own output. The 400+ stars in two days suggest developers have been waiting for exactly this — a way to automate the "did the agent do something stupid" check without building it from scratch. The WordPress and WooCommerce guards are a smart niche play: AI-generated WordPress code has a predictable security failure pattern, and encoding that knowledge as reviewable rules is more valuable than any generic code quality tool. If you're using Claude Code, Cursor, or Codex to ship production code, installing `clean-code-guard` and `test-guard` takes 30 seconds and catches problems that would otherwise surface in code review or, worse, in production. The tool is early — five guards, one maintainer, two days old — but the architecture is right and the problem it solves is only getting bigger as AI-generated code volume increases.
