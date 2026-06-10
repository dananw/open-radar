---
name: canary
description: "Canary is a QA harness for AI coding agents — E2E testing with screen recordings, console logs, network HARs, and reproducible Playwright scripts."
url: https://github.com/wizenheimer/canary
stars: 306
forks: 16
language: TypeScript
tags: ["testing", "qa", "ai-agents", "playwright", "e2e"]
featured: false
publishedAt: 2026-06-10
---

## Canary

### Overview

Canary is a QA harness purpose-built for coding agents like Claude Code, Cursor, and Codex. It reads your code diffs, identifies affected UI flows, and tests them in real browser instances — then hands you a self-contained report with video, traces, network logs, and a reproducible Playwright script. Created on June 3, 2026, it's already crossed 300 stars in its first week, which says a lot about how badly developers need this.

The project comes from wizenheimer, a developer who clearly lives at the intersection of AI tooling and frontend quality assurance. The architecture is a pnpm + Turborepo monorepo with five apps and five packages — CLI, browser engine, daemon, viewer, and a setup wizard — all coordinated through a shared QuickJS WASM sandbox. It's the kind of thoughtful engineering you'd expect from someone who's spent real time debugging agent-generated code.

The core problem Canary solves is deceptively simple: when an AI coding agent writes your frontend code, how do you verify it actually works? You could click through every flow manually. You could write Playwright tests by hand. Or you could let Canary's agent drive a real browser, capture everything, and give you both the evidence and the script to replay it. Most testing tools force you to choose between an opaque agent run you can't reproduce or raw Playwright you have to maintain yourself. Canary gives you both.

### Why it matters

AI coding agents are writing more production code than ever. Claude Code, Cursor, Copilot, and Codex are generating components, pages, and entire features — but the verification story is still stuck in 2020. Developers are either trusting the agent's output blindly or spending more time writing tests than the agent saved on the implementation. According to a 2026 Stack Overflow survey, 72% of developers using AI coding tools report spending significant time manually verifying generated code.

Canary flips that equation. Instead of you writing tests for agent-generated code, the agent writes the code AND tests it — and Canary makes sure you can see exactly what happened. The session recordings include screen captures, console logs, network requests with full HAR files, and Playwright traces. Every run produces a reusable script you can drop into CI with zero inference cost on replay. That's the key insight: the agent discovers the flow once, and you re-run it forever without paying for another API call.

This connects to a broader trend in developer tooling. The industry is moving from "AI as autocomplete" to "AI as a full development partner." But partnerships require trust, and trust requires transparency. Canary is one of the first tools that provides real transparency into what AI agents actually do when they interact with your application.

### Key Features

**Session-Based Recording.** Every QA run is organized as a named session with steps. You start a session, run one or more scripts against it, and end the session to get a complete report. Each step captures its own artifacts — screenshots, traces, console output, network logs — so you can pinpoint exactly where something went wrong. The session model maps naturally to how developers think about user flows: "login, add to cart, checkout" becomes three discrete, inspectable steps.

**QuickJS WASM Sandbox.** Scripts run inside a QuickJS WebAssembly sandbox with no access to the host system. There's no `require()`, no `fs`, no `process`, no direct network access. Memory and CPU limits are enforced, and both CPU time and wall-clock time are bounded — infinite loops abort automatically. This means you can let an AI agent generate and execute scripts without worrying about it reading your filesystem or making unexpected network calls. It's the security model that makes agent-driven testing viable in production environments.

**Reproducible Playwright Scripts.** This is the feature that matters most. Every Canary run captures the exact Playwright calls the agent made — `goto`, `waitForSelector`, `evaluate`, `screenshot` — with parameters and timing. What you get back is a real, reusable script, not a summary or a log. Next time you don't pay an agent to rediscover the page. You just re-run the script in CI. Zero inference cost, full reproducibility.

**Self-Contained HTML Reports.** Every session produces a single `report.html` file — no server, no build step, no dependencies. Open it in a browser, commit it to your repo, share it in Slack. The report includes a video replay with a filmstrip of per-step screenshots, filterable console logs, a network panel that works like DevTools frozen at the moment of the run, and the full Playwright trace. It's the kind of artifact that makes QA reviews actually happen instead of getting lost in ticket comments.

**Native Agent Integrations.** Canary ships as a plugin for Claude Code, Cursor, and Codex. In Claude Code, you get slash commands like `/canary:verify` (plan and run QA for recent changes), `/canary:session` (record a flow end-to-end), and `/canary:review` (open the viewer and triage). You can also just say "QA the checkout flow and give me a report" in plain English — Canary's subagents pick it up. No bespoke installer needed; each agent's own plugin mechanism handles installation.

**Browser Engine with Attach Mode.** Beyond session recording, Canary includes `canary-browser` for quick one-off automation. It can launch its own Chromium instance or attach to an existing Chrome via `--remote-debugging-port`. This is useful for driving a browser that's already logged into your app — no need to script authentication flows. The API exposes full Playwright Page objects, so anything you can do in Playwright, you can do in a Canary script.

**Built-In Viewer.** The `canary-viewer` command spins up a local web UI for browsing, searching, and replaying every recorded session. It's an Astro app that runs entirely locally — no cloud service, no data leaving your machine. Filter sessions by name, date, or status, then drill into any step to watch the replay, inspect the network, or download the trace.

### Use Cases

- **Frontend developers using AI coding agents** — When Claude Code or Cursor generates a React component, run it through Canary to verify the UI actually renders correctly, forms submit properly, and error states display as expected. You get a video and a script, not just a green checkmark.

- **QA engineers automating exploratory testing** — Describe a user flow in plain language, let the agent drive the browser, and get back evidence with full traces. No more "works on my machine" — the report shows exactly what happened, step by step.

- **CI/CD pipelines for agent-generated code** — Drop the Playwright scripts Canary captures into your CI pipeline. They run without an agent, so there's zero inference cost on replay. Perfect for regression testing code that was originally written by AI.

- **Code review with visual proof** — Attach a Canary session report to your pull request. Reviewers can watch the video, inspect the network requests, and verify the implementation without checking out the branch. This turns code review from "I trust the tests pass" into "I watched it work."

- **PM and stakeholder demos** — The self-contained HTML report is shareable with anyone. Product managers can watch the agent test a new feature, see exactly what it did, and verify the implementation matches the spec — no technical setup required.

### Pros and Cons

Pros:
- **Solves a real, growing problem.** AI agents are writing more code, but verification tooling hasn't kept up. Canary fills that gap with a practical, well-engineered solution that works with the tools developers already use.
- **Zero inference cost on replay.** Once the agent discovers a flow and Canary captures the Playwright script, you can re-run it in CI forever without paying for another API call. This is the economic model that makes agent-driven QA sustainable.
- **Security-first sandbox design.** The QuickJS WASM sandbox with bounded resources and no host access means you can safely let agents execute scripts without risk. This is non-negotiable for production use.
- **Self-contained reports.** A single HTML file with everything — video, traces, network, console — is brilliant for sharing and archiving. No server, no dependencies, no data leaks.

Cons:
- **Early stage with 306 stars.** The project is barely a week old. The API will change, edge cases will surface, and documentation will lag behind features. Production adoption right now requires tolerance for rough edges.
- **TypeScript and Node.js ecosystem only.** If you're working in Python (Django, Flask), Go, or other non-JS stacks, the CLI and scripting model won't integrate naturally. The Playwright scripts are JavaScript, and the toolchain assumes a Node environment.
- **Agent dependency.** The real magic happens when you pair Canary with Claude Code or another capable agent. If you're not using AI coding agents yet, Canary is just a fancy Playwright wrapper — it works, but you're not getting the core value proposition.

### Getting Started

```bash
# Install the CLI and viewer globally
npm i -g @usecanary/cli @usecanary/ui

# One-time setup: downloads Chromium + runtime (~150 MB)
canary install

# Or use the guided wizard
npm create canary@latest

# Record a QA session
id=$(canary session start --name "checkout-flow")
canary run ./test-login.js --session "$id" --step login
canary run ./test-cart.js --session "$id" --step cart
canary session end "$id"
# Report saved to ~/.canary/sessions/<id>/report.html

# Browse all recorded sessions
canary-viewer

# Quick one-off browser automation (no recording)
echo 'const p = await browser.getPage("main");
await p.goto("https://example.com");
console.log(await p.title());' | canary-browser

# Install the Claude Code plugin
/plugin marketplace add wizenheimer/canary
/plugin install canary@canary-marketplace
```

### Alternatives

**Playwright** — The industry-standard browser automation framework from Microsoft. If you're writing tests by hand and want full control over every assertion, Playwright is the right tool. Canary actually uses Playwright under the hood, but adds the agent-driven discovery and session recording layer on top. Choose Playwright directly when you need deterministic, hand-crafted test suites for critical paths. Choose Canary when you want an agent to explore and test flows for you.

**Cypress** — Another popular E2E testing framework with excellent developer experience, time-travel debugging, and automatic waiting. Cypress is mature, well-documented, and has a huge ecosystem. It's the better choice if you're building a traditional test suite with human-written specs. Canary targets a different workflow — agent-driven QA where the test scripts are generated, not hand-written.

**Midscene.js** — An AI-powered testing tool that lets you write E2E tests using natural language descriptions. It uses multimodal AI to understand page content and interact with elements. Midscene is a good fit if you want to write tests in plain English yourself. Canary goes a step further — you don't write the tests at all. Your coding agent does the QA, and Canary captures the evidence.

### Verdict

Canary is the most interesting testing tool I've seen in the AI coding agent space. The core insight — that agent-generated code needs agent-driven verification, and that verification must be reproducible without ongoing inference costs — is exactly right. The QuickJS WASM sandbox is a smart security choice, and the self-contained HTML reports solve the "how do I share test results" problem that plagues every QA workflow.

At 306 stars and one week old, it's clearly early. The API will evolve, the docs will improve, and edge cases will get fixed. But the architecture is sound, the monorepo is well-structured, and the agent integrations (Claude Code, Cursor, Codex) are already functional. If you're using AI coding agents to build frontend features — and in 2026, who isn't? — Canary is worth installing today. The `/canary:verify` workflow alone will save you hours of manual QA per week, and the captured Playwright scripts become a permanent regression safety net in your CI pipeline.
