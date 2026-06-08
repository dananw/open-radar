---
name: deepsec
description: "Deepsec is an AI-powered vulnerability scanner from Vercel Labs that uses coding agents to find hard-to-find security issues in large codebases."
url: https://github.com/vercel-labs/deepsec
stars: 3113
forks: 217
language: TypeScript
tags: ["security", "ai-agents", "vulnerability-scanning", "vercel", "devops"]
featured: false
publishedAt: 2026-06-08
---

## Deepsec

### Overview

Deepsec is an AI-powered vulnerability scanner from Vercel Labs that uses coding agents to find security issues lurking in your codebase. Launched in late April 2026, it accumulated over 3,100 GitHub stars in its first six weeks — a signal that developers are hungry for security tooling that actually works at scale.

The project comes from Vercel Labs, the experimental arm of the company behind Next.js and the Vercel deployment platform. This pedigree matters. Vercel's engineering team deals with massive codebases daily, and their security needs aren't theoretical. Deepsec was born from real-world pain: traditional static analysis tools produce floods of false positives, and manual code review doesn't scale. The team built a tool that uses the best available AI models at maximum reasoning depth to investigate potential vulnerabilities — and it works.

The core problem Deepsec solves is deceptively simple to state but hard to execute: find the security bugs that have been hiding in your codebase for months or years. Traditional SAST tools catch low-hanging fruit like SQL injection patterns and XSS via regex matching. Deepsec does that too, but its real value is the AI investigation layer. After the regex-based scanner identifies candidate sites, Claude or Codex agents investigate each one in context — reading surrounding code, understanding auth flows, and reasoning about whether a finding is a real vulnerability or a false alarm. The result is findings that are actually worth acting on.

### Why it matters

Security tooling has a trust problem. Every developer has experienced the cycle: run a scanner, get 500 findings, spend a week triaging, realize 90% are false positives, stop trusting the tool. Deepsec attacks this from the opposite direction. Its `revalidate` step re-checks existing findings and reports a false positive rate of roughly 10–29% on HIGH+ severity after revalidation. That's a dramatically different experience from traditional SAST.

The timing connects to a broader shift in how we think about code quality. AI coding assistants (Copilot, Cursor, Claude Code) are generating more code faster, which means more code to review and more potential vulnerabilities introduced. You can't hire security engineers fast enough to keep up. Deepsec represents a category of tools that use AI not to write code, but to audit it — and that's arguably the more valuable application right now.

For fullstack developers working across React, NestJS, Django, and Go, the framework-specific matchers are what make this practical. Deepsec doesn't just grep for generic patterns. It understands that a missing `@UseGuards` decorator in NestJS is a security issue, that `@csrf_exempt` on write endpoints in Django is dangerous, and that route-vs-middleware ordering matters in Express. That contextual awareness is what separates useful findings from noise.

### Key Features

**Framework-Specific Security Matchers.** Deepsec ships with dedicated matchers for Next.js, React, Express, Fastify, NestJS, Hono, Django, FastAPI, Flask, Laravel, Rails, Gin, Echo, Fiber, and Chi. Each matcher knows the framework's security patterns — for example, NestJS controllers without `@UseGuards`, Django's `@csrf_exempt` on writes, or Go's route-vs-middleware ordering. Generic matchers for Docker, Terraform, and GitHub Actions run on every repo regardless of framework.

**AI Investigation Pipeline.** The three-stage pipeline — `scan`, `process`, `revalidate` — separates cheap regex matching from expensive AI investigation. `scan` finds candidate sites with regex matchers (fast, no AI cost). `process` sends each candidate to Claude or Codex agents that read surrounding code and reason about whether it's a real vulnerability. `revalidate` re-checks findings to cut false positives. You can mix agents: run Claude first, then re-process uncertain findings with Codex for a second opinion.

**Distributed Execution via Vercel Sandbox.** Large monorepos can fan work across Vercel Sandbox microVMs in parallel. Run `deepsec sandbox process --sandboxes 10 --concurrency 4` to distribute analysis across multiple machines. The local working tree gets tarballed and uploaded; `.git` is excluded. This makes scanning a 5,000+ file codebase feasible in under an hour instead of half a day.

**Incremental and Resumable Scans.** If a run gets interrupted — network blip, quota exhaustion, Ctrl-C — just re-run the same command. Deepsec picks up where it left off, skipping files it already analyzed. The `process` stage only touches files with `status: "pending"`. No state cleanup needed. For PR reviews, `process --diff` scans only files changed in a diff, making it viable as a CI gate.

**Custom Matchers via Coding Agents.** You can extend Deepsec's matcher set for your specific codebase by prompting your coding agent. Hand it your `.deepsec/data/` directory and the target repo — it'll identify entry-point coverage gaps and write matchers tailored to your auth helpers, middleware, and internal APIs. This is a clever design: the tool improves itself using the same AI agents it leverages for scanning.

**Polyglot by Design.** While the TypeScript/JavaScript ecosystem has the deepest matcher coverage, Deepsec's AI processor is language-agnostic. It will investigate any text-readable source file. Python, Go, PHP, Ruby, Rust, Java, Kotlin, and .NET all get at least framework detection, with dedicated matchers growing via community contributions.

### Use Cases

- **Pre-deployment security audit** — Run a full scan on your production codebase before a major release. The cost is non-trivial ($25–60 for 100 files, $500–1200 for 2,000 files with Claude Opus), but the findings are real vulnerabilities, not regex noise.
- **CI/CD integration for PR reviews** — Use `process --diff` to scan only changed files on each pull request. Catches new vulnerabilities before they reach main without scanning the entire codebase every time.
- **Legacy codebase assessment** — Inherited a codebase with unknown security posture? Run Deepsec once to get a baseline. The incremental design means subsequent scans only process new or changed files.
- **Framework migration security check** — Moving from Express to Fastify or Django to FastAPI? Deepsec's framework-specific matchers catch security anti-patterns that emerge during migration.
- **Compliance and audit preparation** — Export findings as JSON or Markdown for security audit documentation. The `enrich` command adds git committer info and ownership data for accountability.

### Pros and Cons

Pros:
- After revalidation, the false positive rate on HIGH+ findings drops to roughly 10–29%, which is dramatically better than traditional SAST tools where 70–90% false positives are common.
- Framework-specific matchers mean the tool actually understands your stack's security patterns, not just generic vulnerability signatures.
- The resumable, incremental design makes it practical for real-world use — you don't lose progress on interruptions and you don't re-scan unchanged files.
- Apache 2.0 license means you can run it in your own infrastructure without vendor lock-in. No data leaves your machine unless you explicitly use Vercel AI Gateway.

Cons:
- The cost is real and significant. A full scan of a 2,000-file codebase with Claude Opus runs $500–1200. That's not hobbyist territory — this is for teams with security budgets.
- The best results require writing a good `INFO.md` per project describing your auth shape and threat model. That's upfront work that not every team will do.
- Rust, JVM, and .NET framework matchers are still roadmap items. If your stack is primarily those ecosystems, you're relying on the language-agnostic AI layer without framework-specific guidance.

### Getting Started

```bash
# Navigate to your repo root
cd /path/to/your-project

# Initialize deepsec (creates .deepsec/ directory)
npx deepsec init

# Install dependencies
cd .deepsec
pnpm install

# Run the scan (regex matching, fast, no AI cost)
pnpm deepsec scan

# Run AI investigation (this is where the cost happens)
pnpm deepsec process --limit 50    # start small to calibrate cost

# Revalidate HIGH+ findings to cut false positives
pnpm deepsec revalidate --min-severity HIGH

# Export results
pnpm deepsec export --format md-dir --out ./findings
```

For CI integration, add a per-PR scan step:

```bash
pnpm deepsec scan --project-id main --root .
pnpm deepsec process --project-id main --filter $CHANGED_PATH_PREFIX
```

### Alternatives

**Snyk** — A commercial security platform with SAST, SCA, and container scanning. Snyk is more mature and has a larger vulnerability database, but its SAST false positive rate is higher than Deepsec's post-revalidation rate. Better choice if you need an all-in-one security platform with dependency scanning and container image analysis.

**Semgrep** — An open-source static analysis tool with a large rule database. Semgrep is faster and cheaper per scan (no AI cost), and its custom rule language is powerful for pattern matching. But it lacks Deepsec's AI investigation layer — Semgrep finds patterns, while Deepsec reasons about whether those patterns are actual vulnerabilities in context. Better choice for fast, cheap CI gates where you're willing to accept more false positives.

**CodeRabbit** — An AI code review tool that catches security issues during PR review. CodeRabbit runs on every PR automatically and is more developer-friendly for day-to-day use. But it reviews diffs, not entire codebases — it won't find vulnerabilities that have been lurking in untouched code for years. Better choice for continuous PR-level security review.

### Verdict

Deepsec is the most interesting security tool I've seen come out of Vercel Labs. The core insight — that AI agents can reason about security vulnerabilities in context rather than just pattern-matching — is sound, and the framework-specific matchers show this team actually understands the stacks developers use. The cost is a real barrier for small teams, but for organizations with security budgets, the 10–29% false positive rate on HIGH+ findings after revalidation is a game-changer compared to traditional SAST. If you're running a React/NestJS/Django/Go stack and you've been ignoring your SAST output because it's all noise, Deepsec is worth evaluating. Start with a 50-file pilot to calibrate cost, write a solid INFO.md, and see if the findings actually change how you think about your codebase's security posture.
