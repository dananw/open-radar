---
name: proofshot
description: "Open-source CLI that gives AI coding agents visual verification — records browser sessions, captures screenshots, and bundles proof artifacts for PR review."
url: https://github.com/AmElmo/proofshot
stars: 830
forks: 42
language: TypeScript
tags: ["ai-agents", "developer-tools", "testing", "browser-automation", "verification"]
featured: false
publishedAt: 2026-06-15
---

## ProofShot

### Overview

ProofShot is an open-source, agent-agnostic CLI that solves a problem every developer using AI coding assistants has run into: your agent writes the code, but it has no idea if the UI actually works. Created in February 2026 by AmElmo, the project has already hit 830 GitHub stars and sparked a 106-comment discussion on Hacker News — a signal that the problem it solves resonates deeply with the developer community.

The tool plugs into any AI coding agent — Claude Code, Cursor, Codex, OpenCode, Gemini CLI, Windsurf, GitHub Copilot, anything that runs shell commands — and gives it a verification workflow. The agent builds a feature, ProofShot records a video of the browser session, captures screenshots at key moments, collects console and server errors, and bundles everything into proof artifacts. The human developer then reviews a video with an interactive timeline instead of manually clicking through the app trying to find what broke.

The core problem is straightforward but painful. AI coding agents are prolific code generators, but they are essentially blind. They cannot see the UI they are building. They write a React component, run the build, and assume it works because there are no TypeScript errors. Meanwhile, the button is off-screen, the form submits to nowhere, or there is a JavaScript runtime error that only fires on user interaction. ProofShot closes this verification loop by recording what actually happens in the browser and making that evidence trivially easy to review.

### Why it matters

The AI coding agent ecosystem in 2026 is exploding. Every major tool — from Claude Code to Cursor to GitHub Copilot — can generate full features, refactor codebases, and even create entire applications from a prompt. But there is a glaring gap: verification. A recent survey by Sourcegraph found that 73% of developers using AI coding tools spend more than 30% of their time manually verifying agent output. That is not automation — that is shifting the bottleneck.

ProofShot addresses this with a workflow that is dead simple: start a recording session, let the agent drive the browser, stop the session, and review the artifacts. The interactive HTML viewer syncs video playback with console logs and server errors on a timeline, so you can jump to the exact moment something broke. No cloud dependency, no vendor lock-in, no complex test harness. Just a local CLI that produces artifacts you can attach to a GitHub PR with a single command.

For fullstack developers working with React, NestJS, Django, or Go backends, this is particularly valuable. You might have an AI agent building a feature that spans the frontend form, the API endpoint, and the database migration. ProofShot captures the full stack behavior — client-side rendering, API responses, server errors from Python or Node.js — in one session. The error detection covers 10+ languages including JavaScript, Python, Go, Ruby, Java, Rust, and PHP.

### Key Features

**Agent-Agnostic Skill Installation.** Run `proofshot install` and it detects your AI coding tools — Claude Code, Cursor, Codex, OpenCode, Gemini CLI, Windsurf — and installs a skill file at the user level. No per-project configuration. The skill teaches the agent the start/test/stop workflow automatically, so you can just say "verify this with proofshot" and the agent handles the rest. This is a clever design choice because it works with any agent that can read instructions and run shell commands.

**Interactive HTML Viewer.** Each session produces a standalone `viewer.html` file with video playback, a scrub bar, action markers, and tabs for console and server logs. You can click on a timeline marker to jump to the exact moment an error occurred. This is fundamentally different from scrolling through a wall of terminal output — it gives you spatial and temporal context that makes debugging fast. The viewer is a single HTML file with no dependencies, so you can open it in any browser.

**PR Integration.** The `proofshot pr` command uploads session artifacts to GitHub and posts a formatted verification comment on the pull request with embedded screenshots. It uses the official GitHub API and uploads to a dedicated `proofshot-artifacts` branch, so it works with normal `gh` authentication. This turns visual verification into a first-class part of your code review workflow — reviewers can see exactly what the agent built without checking out the branch.

**Multi-Language Error Detection.** ProofShot automatically scans server logs for error patterns across JavaScript/Node.js, Python, Ruby/Rails, Go, Java/Kotlin, Rust, PHP, C#/.NET, Elixir/Phoenix, and more. It captures dev server output during the session and correlates errors with the video timeline. For fullstack developers running a Django backend and React frontend, this means Python tracebacks and browser console errors appear in the same timeline.

**Video and Screenshot Bundling.** Each session produces a `.webm` video recording, individual screenshots at marked moments, and a structured report — all timestamped and organized in `./proofshot-artifacts/`. If `ffmpeg` is available, video converts to `.mp4` automatically. The artifacts are self-contained and portable, so you can share them via Slack, attach them to issues, or archive them for regression testing.

**Visual Diff (Coming/Experimental).** The `proofshot diff` command compares screenshots across sessions to highlight visual changes. This is still early but points toward a workflow where you can verify that a refactor did not break the UI by comparing before and after screenshots automatically — something that would normally require a dedicated visual regression testing tool like Percy or Chromatic.

**Built on agent-browser by Vercel.** ProofShot uses Vercel's agent-browser for browser control primitives — snapshot-based element references, form filling, navigation, and screenshot capture. This means it gets the benefits of a well-maintained browser automation library without reinventing the wheel. The element reference system uses compact `@e1`, `@e2` notation instead of verbose accessibility trees, keeping agent prompts short and focused.

### Use Cases

- **Verifying AI-generated UI features** — When Claude Code builds a multi-step form or a dashboard with charts, ProofShot records the interaction so you can verify it works without manually clicking through every flow. This is the primary use case and the one that saves the most time.

- **PR review with visual evidence** — Attach video proof and screenshots directly to pull requests so reviewers can see what the code does without checking out the branch. Particularly useful for teams where frontend PRs are hard to review from code alone.

- **Debugging agent-generated code** — When an AI agent produces code that compiles but has runtime errors, the session recording captures the exact failure with console logs, server output, and a video of what the user would see. Much faster than reading stack traces.

- **Regression testing after refactors** — Record a baseline session of your app working correctly, then have the agent refactor the code, and record another session. Compare the two to catch visual regressions that unit tests miss.

- **Onboarding and documentation** — Record sessions of features working correctly and use the video artifacts as living documentation. New team members can see exactly how a feature is supposed to behave.

- **Cross-browser verification** — Run the same agent task with different browser configurations to catch rendering issues. The session artifacts make it easy to compare behavior across environments.

### Pros and Cons

Pros:
- Truly agent-agnostic — works with any AI coding tool that runs shell commands. No vendor lock-in to Claude, Cursor, or any specific agent.
- The interactive viewer is genuinely useful. Syncing video with console logs on a timeline is a much better debugging experience than reading raw output.
- PR integration turns visual verification into a code review artifact, which changes team workflows for the better.
- MIT licensed and fully local. No cloud dependency, no accounts, no data leaving your machine unless you choose to upload to GitHub.
- Error detection across 10+ server-side languages makes it practical for polyglot fullstack teams.

Cons:
- Requires agent-browser, which bundles headless Chromium. The install footprint is non-trivial (100MB+) and the headless browser adds a layer of complexity that can be flaky on some CI environments.
- The project is young (February 2026) and the API surface is still evolving. Expect breaking changes in the coming months as the tool matures.
- Video recordings in `.webm` format can be large for long sessions. The ffmpeg conversion to `.mp4` helps but requires ffmpeg to be installed separately.
- The skill-based approach means the agent has to follow instructions correctly. If the agent skips the start/stop workflow or runs commands in the wrong order, the artifacts may be incomplete.

### Getting Started

```bash
# Install globally
npm install -g proofshot

# Detect your AI coding agents and install the skill
proofshot install

# Start a verification session
proofshot start --run "npm run dev" --port 3000 --description "Feature verification"

# The AI agent drives the browser (or you do it manually)
# agent-browser snapshot -i
# agent-browser open http://localhost:3000
# agent-browser click @e3
# agent-browser screenshot ./proofshot-artifacts/step-1.png

# Stop and bundle artifacts
proofshot stop

# Upload to GitHub PR
proofshot pr

# Check your environment
proofshot doctor
```

For a quick test without a real project:

```bash
git clone https://github.com/AmElmo/proofshot.git
cd proofshot
npm install && npm run build && npm link

cd test/fixtures/sample-app
npm install

# Run the automated test
bash test-proofshot.sh

# Check proofshot-artifacts/ for the output
```

### Alternatives

**Playwright MCP** — Microsoft's Playwright MCP server gives AI agents direct browser control with full DOM access, network interception, and screenshot capabilities. It is more powerful for programmatic testing and has a larger ecosystem. Choose Playwright MCP when you need fine-grained browser automation as part of a testing pipeline. Choose ProofShot when you want a lightweight verification workflow that produces reviewable artifacts without writing test code.

**Chrome DevTools MCP** — Provides AI agents with direct access to Chrome DevTools protocol for DOM inspection, network monitoring, and JavaScript debugging. Better for live debugging during development when you need to inspect element properties, trace network requests, or evaluate expressions. ProofShot is better when you want bundled proof artifacts that document what happened, not interactive debugging.

**agent-browser by Vercel** — The browser automation library that ProofShot is built on. You can use agent-browser directly for raw browser control. But agent-browser does not provide session management, server log capture, error detection, the interactive viewer, or the PR upload workflow. ProofShot adds the verification layer on top of agent-browser's primitives.

### Verdict

ProofShot is the most practical tool I have seen for closing the AI coding agent verification gap. The idea is obvious in hindsight — if your agent cannot see the UI, record the browser session and let the human review it — but nobody else has packaged it this cleanly. The agent-agnostic design is the right call: developers are not going to commit to one AI tool, and a verification layer needs to work across all of them. At 830 stars in under four months with 106 HN comments, the community response validates the problem. The PR integration is the killer feature here — turning visual verification into a code review artifact changes how teams ship AI-generated code. If you are using AI coding agents to build frontend features and you are tired of manually testing everything the agent produces, install ProofShot today. It takes five minutes and the improvement to your workflow is immediate.
