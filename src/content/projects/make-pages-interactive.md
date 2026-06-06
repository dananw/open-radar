---
name: make-pages-interactive
description: "A Claude Code skill that turns static HTML pages into live commenting surfaces — highlight text, leave notes, and Claude edits the page automatically."
url: https://github.com/paraschopra/make-pages-interactive
stars: 403
forks: 47
language: JavaScript
tags: ["claude-code", "ai-agents", "developer-tools", "html", "feedback"]
featured: false
publishedAt: 2026-06-06
---

## Make Pages Interactive

### Overview

Make Pages Interactive is a Claude Code skill that turns any folder of static HTML into a live commenting surface. Highlight text, click an element, leave a note — Claude reads your feedback and edits the page in response. It hit 400 GitHub stars within days of its late May 2026 launch, driven by a deceptively simple pitch: stop context-switching between your browser and your terminal.

The project is built by Paras Chopra, founder of Wingify (the A/B testing company behind VWO) and author of multiple books on AI and machine learning. He's someone who's spent a decade thinking about how humans interact with web interfaces, and this skill reflects that background. It's not a framework or a library — it's a workflow tool that solves a specific friction point in the AI-assisted development loop.

The problem it targets is real: when you're iterating on HTML output — research reports, generated dashboards, design mocks, documentation — the feedback loop is broken. You see something wrong in the browser, switch to your editor or terminal, describe the problem in natural language, wait for the AI to process it, then check the result. Make Pages Interactive collapses that loop to a single surface. You comment directly on the page, and Claude makes the edit. The page auto-reloads with a walkthrough of what changed.

### Why it matters

The AI coding agent space is exploding with tools that write code, but fewer that solve the feedback problem. Most developer workflows still treat the browser as a read-only output — you generate HTML, open it, spot issues, then go back to your agent with a description. That round-trip is where context gets lost and iteration slows down.

Make Pages Interactive is interesting because it treats the browser as a first-class input surface for AI agents. It's not trying to replace your editor or your terminal. It's adding a commenting layer to the output itself, so the feedback loop stays tight. The architecture is minimal — a client library, a stdlib Python server, and a SKILL.md file — which makes it easy to understand, modify, and trust.

For fullstack developers working with AI agents, this points toward a broader trend: the interface between humans and AI is moving beyond chat. Tools like this suggest that the next wave of AI developer tools won't just be about generating code — they'll be about creating better feedback surfaces for the code that's already been generated.

### Key Features

**Three Commenting Modes.** The client library supports text selection (highlight any text and comment on it), element selection (click a tool then click an image, table, or section to anchor a comment to a stable CSS selector), and page-level notes via a floating button. Each comment carries a stable ID, a selector, the comment body, and a timestamp. The library batches comments client-side and submits them as a single POST so Claude responds to a coherent set rather than firing on every keystroke.

**Zero-Dependency Python Server.** The backend is a ~250-line HTTP server built entirely on Python's stdlib — no Flask, no FastAPI, no pip install. It serves the page directory, accepts comment POSTs, and serves the feedback library files. The zero-dependency design means you can run it anywhere Python is available without worrying about virtual environments or package conflicts.

**Automatic Process Lifecycle Management.** The server has three shutdown mechanisms: parent-process death detection (polls every 5 seconds, exits when the parent PID is gone), idle timeout (defaults to 10 minutes of no requests), and manual stop via Claude Code command or Ctrl-C. This means abandoned servers self-clean — close your Claude window and within 10 seconds the port is free again. No zombie processes, no port conflicts.

**Page Auto-Reload with Walkthrough.** When Claude processes your feedback, the page polls a history JSON file every 4 seconds, detects new entries, and auto-reloads while preserving your scroll position. After reload, a walkthrough highlights each changed region with the title Claude gave it. Press R to dismiss. Your tab title changes to a notification emoji so you can track progress in backgrounded tabs.

**Idempotent Script Injection.** The inject.py script adds the feedback library tags (one CSS link, one script tag) to every HTML file in a directory. Run it multiple times safely — it won't duplicate tags. Pass `--remove` to strip the feedback layer and get a clean static copy back. This makes it safe to add to CI pipelines or use on generated output directories.

**SKILL.md Integration.** The skill auto-discovers through Claude Code's skill system. Clone it to `~/.claude/skills/` and it's available in every Claude Code session. Say "make these pages interactive" and Claude handles the rest — injecting tags, creating the inbox files, picking a free port, starting the server, and monitoring for feedback. No manual configuration needed.

### Use Cases

- **Research reports and data analysis** — Iterate on long HTML reports with plots, tables, and explanations. Highlight a misleading chart, comment "this Y-axis scale is confusing," and Claude fixes it without leaving the page.
- **Generated documentation** — When AI generates API docs or READMEs as HTML, use inline comments to mark sections that need expansion, correction, or reorganization.
- **Design mock review** — Share HTML prototypes with stakeholders who can click elements and leave feedback directly on the interface, with Claude processing changes in real time.
- **Rapid prototyping** — Build a UI in HTML, open it in the browser, and iterate by commenting on what feels wrong. The feedback loop goes from minutes to seconds.
- **Teaching and code review** — Walk through generated HTML code output with inline annotations, letting students or reviewers mark specific areas for discussion.

### Pros and Cons

Pros:

- The three-file architecture (feedback.js, feedback.css, server.py) is genuinely simple — you can read and understand the entire codebase in under an hour. No build tools, no transpilation, no hidden complexity.
- Automatic process cleanup solves a real pain point with background servers. The parent-PID watchdog and idle timeout mean you never have to think about killing stale processes.
- The SKILL.md integration with Claude Code makes the workflow seamless. No CLI flags to memorize, no configuration files to edit — just natural language commands.

Cons:

- Claude Code dependency limits the audience. If you're using Cursor, Copilot, or another AI coding tool, this skill doesn't work. The commenting surface is universal, but the processing requires Claude.
- The polling-based architecture (4-second intervals for history checks) introduces latency. For rapid-fire iteration, those seconds add up. A WebSocket or SSE approach would be snappier but would complicate the zero-dependency design.
- Only works with static HTML files. If your pages are served by a dev server (Vite, Next.js, etc.), you'd need to adapt the injection approach. The skill is designed for folders of standalone HTML, not live development servers.

### Getting Started

```bash
# Install the skill
git clone https://github.com/paraschopra/make-pages-interactive \
  ~/.claude/skills/make-pages-interactive

# In any Claude Code session, navigate to a folder of HTML files
cd your-html-project

# Just say: "Make these pages interactive"
# Claude will:
# 1. Inject feedback tags into every *.html
# 2. Create feedback/inbox.jsonl and feedback/history.json
# 3. Start the server on port 5050
# 4. Tell you the URL to open

# To remove the feedback layer later:
python ~/.claude/skills/make-pages-interactive/scripts/inject.py ./your-dir --remove

# To update the skill:
python ~/.claude/skills/make-pages-interactive/scripts/update.py
```

### Alternatives

**Markitdown** — Microsoft's tool converts various file formats (PDF, Word, images) to Markdown for LLM consumption. It's useful for feeding content into AI agents but doesn't provide an interactive feedback surface. Choose Markitdown when you need to convert documents into AI-readable formats; choose Make Pages Interactive when you need to iterate on HTML output with inline feedback.

**Make Pages Interactive vs. Figma-to-Code tools** — Tools like Locofy, Anima, and Builder.io convert designs to code, but the feedback loop still requires switching between the design tool and your editor. Make Pages Interactive works on the output side — the HTML that's already been generated — which is a different part of the workflow. If your bottleneck is design-to-code conversion, use those tools. If your bottleneck is iterating on generated HTML, this skill is the better fit.

**Claude Code's built-in editing** — Claude Code can already edit HTML files directly through its terminal interface. The difference is the feedback surface: without Make Pages Interactive, you describe problems in natural language ("the heading on line 47 needs to be larger"), which requires you to identify the problem, locate it in code, and describe it precisely. With the commenting layer, you just click and type. The cognitive load difference is small per comment but compounds over dozens of iterations.

### Verdict

Make Pages Interactive is a focused, well-engineered solution to a problem most developers don't realize they have until they try it. The feedback loop between seeing a problem in the browser and getting it fixed is full of small frictions — context switching, precise description, locating the right code — and this skill eliminates all of them with a three-file architecture that's easy to audit and trust. It's not a revolution in AI coding. It's something better: a practical tool that makes an existing workflow meaningfully faster. If you're using Claude Code and working with HTML output of any kind — reports, docs, prototypes, dashboards — install this and try it for a single iteration session. You'll understand the appeal in under five minutes.
