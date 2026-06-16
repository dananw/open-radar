---
name: career-ops
description: "Career-Ops is an open-source AI job search command center that evaluates offers, generates ATS-optimized CVs, and scans 45+ company portals — built with Node.js, Go, and Playwright."
url: https://github.com/santifer/career-ops
stars: 53915
forks: 10718
language: JavaScript
tags: ["ai-agents", "job-search", "automation", "go", "playwright"]
featured: false
publishedAt: 2026-06-16
---

## Career-Ops

### Overview

Career-Ops hit 50,000 GitHub stars in under three months. That kind of velocity usually signals one of two things: either it went viral on Chinese social media, or it solved a problem so many developers share that the README alone felt like a call to action. Career-Ops is the second kind.

Built by Fernando Santarén (santifer), a developer who used the system himself to evaluate over 740 job listings, generate more than 100 tailored CVs, and land a Head of Applied AI role, the project is essentially a multi-agent job search pipeline disguised as a CLI tool. Paste a job URL into Claude Code, Gemini CLI, or OpenCode, and the system runs a structured evaluation across 10 weighted dimensions, generates an ATS-optimized PDF resume customized for that specific posting, and logs everything in a single-source-of-truth tracker. No spreadsheets, no manual copy-pasting, no "I'll tailor my resume later" procrastination.

The tech stack is pragmatic: Node.js for the core orchestration and skill modes, Go for the terminal dashboard UI (built with Bubble Tea), and Playwright for web scraping and PDF generation. It works with Claude Code, OpenCode, Gemini CLI, Codex, Qwen, and GitHub Copilot — whichever AI coding CLI you already have installed. The system is agentic in the truest sense: your AI CLI navigates career pages, reasons about job fit by comparing your CV against the description (not keyword matching), and adapts your resume per listing.

### Why it matters

The job market in 2026 is adversarial. Companies use AI to filter candidates at scale — automated resume screeners, ATS keyword matching, algorithmic ranking. Most developers respond by mass-applying, which is the worst possible strategy. Career-Ops flips the dynamic: instead of spraying resumes into the void, you build a system that filters ruthlessly and only surfaces opportunities worth your time.

The broader significance is architectural. Career-Ops demonstrates a pattern that's becoming standard in 2026: using AI coding CLIs as general-purpose automation engines, not just code generators. The same tool you use to write React components can also navigate Greenhouse job portals, evaluate job descriptions against your career history, generate PDF resumes with custom typography, and maintain a structured pipeline. This is the "agentic everything" trend applied to a concrete, high-stakes problem.

Featured in WIRED and Business Insider, with a Product Hunt top-post badge, Career-Ops has crossed from "cool side project" into "tool people actually depend on." The 10,700 forks suggest a healthy ecosystem of customized versions — people adapting the scoring weights, adding company portals, and contributing back.

### Key Features

**Structured A-F Evaluation System.** Every job listing gets scored across 10 weighted dimensions — role match, skill gaps, level strategy, compensation research, company signals, and more. The system produces a detailed markdown report with specific recommendations, not just a number. Scores below 4.0/5 are flagged as "probably not worth your time," which is exactly the kind of honest filtering most job seekers need.

**ATS-Optimized PDF Generation.** Career-Ops generates tailored PDF resumes using Playwright's HTML-to-PDF pipeline with Space Grotesk and DM Sans typography. Each resume is keyword-injected for the specific job description, increasing ATS pass-through rates. The system generates CVs on-demand or as part of the automatic pipeline — paste a URL, get a PDF.

**45+ Pre-Configured Company Portals.** The scanner comes ready to check job boards at Anthropic, OpenAI, Mistral, ElevenLabs, Retool, n8n, Temporal, and dozens more. It queries Ashby, Greenhouse, Lever, Wellfound, and Workable APIs directly. Add your own targets by editing a YAML file. The `--verify` flag adds a Playwright liveness check to filter out stale postings.

**14 Skill Modes with Batch Processing.** Beyond basic evaluation, Career-Ops includes modes for cover letter generation, company deep research, LinkedIn outreach messages, course/certification evaluation, portfolio project assessment, and application form filling. Batch mode processes 10+ offers in parallel using headless CLI workers.

**Interview Story Bank and Negotiation Scripts.** The system accumulates STAR+Reflection stories across evaluations, building a bank of 5-10 master stories that can answer any behavioral interview question. It also generates salary negotiation frameworks with geographic discount pushback and competing offer leverage — details that matter when you get to the offer stage.

**Human-in-the-Loop Design.** Career-Ops evaluates and recommends, but never submits an application. Every action requires your approval. The system is a filter and an accelerator, not an autopilot. This is deliberate — the creator explicitly warns against "spray and pray" approaches and designs the tool to force quality over quantity.

**Go Dashboard TUI.** A terminal UI built with Bubble Tea lets you browse, filter, and sort your entire application pipeline without leaving the terminal. Status tracking, integrity checks, deduplication, and merge operations happen automatically in the background.

### Use Cases

- **Senior developers evaluating AI/ML roles** — paste job descriptions from Anthropic, OpenAI, or Mistral and get structured evaluations that account for your specific experience level, compensation expectations, and career trajectory
- **Career switchers targeting a new domain** — the archetype detection system classifies roles (LLMOps, Agentic, PM, SA, FDE, Transformation) and identifies skill gaps with specific learning recommendations
- **Developers managing high-volume job searches** — batch processing and portal scanning turn a chaotic spreadsheet workflow into an automated pipeline with clear status tracking
- **International candidates navigating geographic compensation** — the negotiation scripts include frameworks for pushing back against geographic salary discounts, a common pain point for remote workers
- **Teams building custom hiring tools** — the modular architecture (Node.js skills, Go dashboard, Playwright scrapers) makes it straightforward to extend with new evaluation dimensions or company portals

### Pros and Cons

Pros:
- The A-F evaluation system is genuinely useful — it forces structured thinking about job fit instead of gut feelings, and the 10 weighted dimensions cover the factors that actually matter in career decisions.
- Multi-CLI support (Claude Code, Gemini CLI, OpenCode, Codex, Qwen, Copilot) means you're not locked into one AI vendor. Switch models mid-project if pricing or quality changes.
- The Playwright-based PDF pipeline produces professional resumes with proper typography — not the ugly LaTeX templates most developers default to.
- Active community with 10,700 forks, indicating people are actually customizing and extending the tool, not just starring it.

Cons:
- First-run experience requires significant context input — your CV, career story, preferences, and target roles. The system is transparent about this ("the first evaluations won't be great"), but it's still a meaningful upfront investment.
- Portal scanning depends on public ATS APIs (Greenhouse, Ashby, Lever) which can change without notice. Stale postings can leak into the pipeline without the `--verify` flag, which adds latency and token cost.
- The Go dashboard TUI, while functional, is a terminal-only interface. No web UI option for people who prefer visual dashboards.
- Token costs add up during heavy use — batch evaluation of 10+ jobs with full 6-block analysis can consume significant API credits depending on your model provider.

### Getting Started

```bash
# Fastest path — one command
npx @santifer/career-ops init

# Navigate to the project and open your AI CLI
cd career-ops
claude   # or: gemini / opencode / codex

# On first launch, the system walks you through setup:
# - Upload your CV (or paste it)
# - Set your profile and target roles
# - Start evaluating jobs

# Evaluate a job by pasting a URL or description
# Just paste it into the chat — career-ops auto-detects it

# Or use specific commands
/career-ops scan           # Scan portals for new offers
/career-ops pdf            # Generate ATS-optimized CV
/career-ops cover          # Generate cover letter
/career-ops batch          # Batch evaluate multiple offers
/career-ops tracker        # View application pipeline
/career-ops deep           # Deep company research
```

### Alternatives

**Huntr** — A job search CRM focused on tracking and organization. Huntr is better for people who want a visual Kanban-style board to manage applications manually. Career-Ops is better if you want AI-powered evaluation and automated CV generation — Huntr doesn't do either.

**JobSeer** — A browser extension that adds AI-powered job fit scores to LinkedIn and Indeed listings. JobSeer is lighter weight (install and go) but limited to scoring — no CV generation, no portal scanning, no pipeline management. Career-Ops is a full system; JobSeer is a lens.

**Teal** — A career platform with a job tracker, resume builder, and AI analysis. Teal has a polished web UI and is more beginner-friendly, but it's a SaaS product with paid tiers. Career-Ops is fully open-source and runs entirely on your machine with your own AI CLI — no data leaves your local environment except the API calls to your chosen model provider.

### Verdict

Career-Ops is the most practical AI agent application I've seen for individual developers. Not because the technology is novel — multi-agent pipelines and Playwright scraping are well-understood patterns — but because it applies them to a problem where the ROI is immediate and measurable. Evaluate 740 jobs, generate 100 tailored resumes, land the role you actually want. The numbers speak for themselves. The 53K stars and 10.7K forks in under three months suggest the developer community agrees this fills a real gap. If you're actively job searching in tech and you already use Claude Code or Gemini CLI, this is a no-brainer addition to your workflow. The upfront setup time pays for itself after the first batch evaluation.
