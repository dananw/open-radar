---
name: ai-engineer-coach
description: "Microsoft's open-source VS Code extension that tracks your AI coding sessions, detects anti-patterns, and scores your agentic engineering skills — like a fitness tracker for developers using AI."
url: https://github.com/microsoft/AI-Engineering-Coach
stars: 1878
forks: 252
language: TypeScript
tags: ["developer-tools", "ai-coding", "vscode-extension", "productivity", "code-quality"]
featured: false
publishedAt: 2026-06-04
---

## AI Engineer Coach

### Overview

AI Engineer Coach is a VS Code extension from Microsoft that reads your local AI coding session logs and turns them into a full analytics dashboard. It hit 1,800 GitHub stars within a month of its May 2026 launch, which tracks — developers are spending more time than ever prompting AI assistants, but almost nobody is measuring whether they're doing it well.

The project is an open-source community effort by Microsoft employees. It's not an official Microsoft product, which is worth noting, but the MIT license and the team's pedigree give it credibility. The extension works with any AI harness — Copilot, Cursor, Claude Code, Codex, whatever — because it reads the session logs those tools already produce. No API keys, no cloud services, no telemetry. Everything stays on your machine.

The core insight is that AI coding assistants have created a new category of developer skill that nobody tracks. How well do you prompt? How often do you accept bad suggestions? Are you managing context effectively? Are you reviewing AI-generated code or just shipping it? AI Engineer Coach answers these questions with 45 configurable anti-pattern rules, practice scores with week-over-week trends, and a context health system that audits your workspace for agentic readiness.

### Why it matters

The developer productivity conversation shifted dramatically in 2025-2026. Every engineering team is using AI coding assistants now, but most organizations have zero visibility into how effectively their developers use these tools. GitHub's own research shows that Copilot acceptance rates vary wildly between developers — some accept 40% of suggestions, others accept 80%, and the quality difference is enormous. AI Engineer Coach makes that variance visible.

This connects to a broader tension in the industry. AI coding tools promise massive productivity gains, but the actual gains depend on developer skill with the tools themselves. A developer who blindly accepts every suggestion and ships unreviewed AI code is creating technical debt, not productivity. AI Engineer Coach treats AI coding as a skill to be developed, not a magic button to be pressed.

The privacy-first architecture matters too. Developers are increasingly wary of tools that send their code and prompts to external servers. AI Engineer Coach runs entirely locally — read-only access to session files, no proprietary telemetry, optional AI features that use VS Code's built-in Copilot API when explicitly invoked. That's the right approach for a tool that sees everything you do with AI.

### Key Features

**Anti-Pattern Detection.** The extension ships with 45 configurable rules across five categories: prompt quality, session hygiene, code review, tool mastery, and context management. Each rule has severity ratings, concrete remediation actions, and example prompts. You can edit rules visually, write raw markdown, or build custom rules in the Rule Playground's interactive REPL. This is the feature that separates AI Engineer Coach from simple token counters.

**Practice Scores and Trends.** The Dashboard page shows your overall practice score with week-over-week trends, daily activity charts, and workspace-level breakdowns. It gamifies improvement without being obnoxious — Bronze through Diamond tiers based on XP, but the real value is the trend line. Are you getting better at prompting this week compared to last week? The data answers that.

**Session Timeline.** A Gantt-style visualization of your AI coding sessions with per-day drill-down and overlap detection. You can see exactly when you started and stopped working with AI tools, identify sessions where you spent 3 hours fighting the assistant instead of coding, and spot patterns in your work rhythm. The Coding Moments page goes further with a screenshot gallery from AI sessions.

**Context Health Scoring.** The extension audits your workspace for agentic readiness — do you have proper instruction files? Is your context well-organized? Are you giving the AI enough information to work effectively? It generates an overall context score with a checklist of improvements and an AI-powered instruction file review. This is the feature that helps developers set up their projects for better AI assistance from the start.

**Skill Finder.** Discovers repeated prompt patterns in your session history and matches them against community skills from the open-source catalog. If you find yourself typing the same instructions every time you start a new file, the Skill Finder will notice and suggest turning that pattern into a reusable skill. It bridges the gap between ad-hoc prompting and systematic AI workflow design.

**Code Output Analytics.** Tracks AI-generated code volume broken down by language, workspace, model, and harness. You can see which AI tools you use most, which languages benefit most from AI assistance, and how your usage patterns change over time. The Patterns page adds a 7×24 activity heatmap and work-life balance signals — useful for developers who suspect AI coding is eating into their off-hours.

**Learning Center.** Personalized quizzes and code-comparison rounds generated from your actual usage data. Instead of generic "how to use Copilot" tutorials, you get exercises based on your specific weaknesses. If the anti-pattern detection flags you for poor context management, the Learning Center generates exercises that practice that skill. It closes the feedback loop between detection and improvement.

### Use Cases

- **Individual developers** who want to improve their AI coding skills with data-driven feedback instead of guesswork. Install the extension, use AI tools normally for a week, then review your dashboard for actionable insights.

- **Engineering managers** who need visibility into how their teams use AI tools without invasive monitoring. The extension runs locally and the shareable stat cards let developers voluntarily share their progress.

- **DevRel and platform teams** evaluating which AI coding tools work best for their organization. The harness comparison features show usage patterns across different tools side by side.

- **Technical writers** maintaining project instruction files and context documentation. The Context Health scoring provides concrete feedback on whether your documentation actually helps AI assistants work effectively.

- **Developer educators** teaching AI-assisted development as a skill. The Learning Center and anti-pattern rules provide a structured curriculum based on real usage data rather than theoretical best practices.

### Pros and Cons

Pros:

- Privacy-first architecture with fully local analysis and no telemetry is exactly what developers want from a tool that sees their entire AI workflow. Read-only access to session files means zero risk of data corruption.

- The 45 anti-pattern rules are genuinely useful — they cover prompt quality, session hygiene, code review practices, and context management with specific, actionable feedback rather than vague recommendations.

- Works with any AI coding harness (Copilot, Cursor, Claude Code, Codex) because it reads session logs rather than requiring API integration. This makes it future-proof as new tools emerge.

- The Rule Editor and Rule Playground let teams customize detection rules for their specific workflows, which matters because anti-patterns vary by project and team culture.

Cons:

- VS Code only — developers using JetBrains IDEs, Neovim, or other editors are out of luck. The session log format is specific to VS Code's extension ecosystem.

- The learning curve for the Rule DSL is non-trivial. Creating custom anti-pattern rules requires understanding the extension's field model and function catalog, which adds overhead for teams that want to customize heavily.

- Some features (rule compiler, skill finder, context review) optionally use VS Code's built-in Copilot language model API, which means they depend on having GitHub Copilot installed and configured. Teams using other AI tools might not have that set up.

### Getting Started

```bash
# Easiest path: download VSIX from Releases
# https://github.com/microsoft/AI-Engineering-Coach/releases

# macOS / Linux
code --install-extension ai-engineer-coach-*.vsix

# Windows / PowerShell
code --install-extension (Get-ChildItem . -Filter 'ai-engineer-coach-*.vsix' | Select-Object -First 1).FullName

# Or build from source
git clone https://github.com/microsoft/ai-engineer-coach.git
cd ai-engineer-coach
npm ci
npm run package
```

After installation:

1. Open the command palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. Run **AI Engineer Coach: Open Dashboard**
3. Navigate pages from the sidebar — start with the Dashboard for an overview, then drill into Anti-Patterns for specific feedback

### Alternatives

**Copilot Metrics Dashboard (GitHub)** — GitHub's built-in metrics for Copilot usage in organizations. It shows acceptance rates, lines suggested, and lines accepted at the org level. Much simpler than AI Engineer Coach but limited to Copilot and focused on adoption metrics rather than skill development. Better choice if you only use Copilot and need org-wide reporting, not individual improvement.

**WakaTime** — The classic developer time-tracking extension that measures coding time across editors and projects. WakaTime tracks what you type, not how you use AI. It complements AI Engineer Coach rather than replacing it — WakaTime tells you how much time you spend coding, AI Engineer Coach tells you how well you use AI while coding.

**Cursor Analytics** — Cursor's built-in usage analytics show acceptance rates, model usage, and feature adoption within the Cursor IDE. Limited to Cursor, obviously, and focused on product metrics rather than developer skill. If Cursor is your only AI tool, its native analytics might be enough. If you use multiple tools, you need something that works across harnesses.

### Verdict

AI Engineer Coach is the most useful developer tool I've seen for the AI coding era. The anti-pattern detection alone justifies the installation — 45 rules that catch real mistakes like accepting suggestions without review, poor context management, and prompt quality issues. The fact that it works across any AI harness and runs entirely locally makes it a no-brainer for any VS Code user spending significant time with AI coding tools.

The 1,800 stars in a month and the 252 forks suggest real community engagement, not just hype. The Rule Playground and custom rule editor show this is built for teams that want to go deeper, not just individuals looking for a quick dashboard. If you're a developer who uses AI coding tools daily and wants to actually get better at it — not just accumulate usage hours — install this extension. The dashboard will surprise you.
