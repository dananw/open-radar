---
name: harness
description: "Harness is a Claude Code plugin that auto-generates agent teams and skills from domain descriptions — six architecture patterns, one prompt."
url: https://github.com/revfactory/harness
stars: 6188
forks: 831
language: HTML
tags: ["claude-code", "ai-agents", "developer-tools", "agent-teams", "automation"]
featured: false
publishedAt: 2026-06-06
---

## Harness

### Overview

Harness is a Claude Code plugin that turns a single sentence — "build a harness for this project" — into a fully configured agent team. It generates agent definitions in `.claude/agents/`, skill files in `.claude/skills/`, and orchestration protocols, all tailored to whatever domain you described. The repo hit 6,000 GitHub stars in about ten weeks after its late-March 2026 launch, which tracks with the broader explosion of interest in AI agent tooling.

The project comes from revfactory (Hwang M.), a Korean developer who's been building at the intersection of Claude Code and structured agent orchestration. The background matters here: this isn't a generic "wrap an API" project. It's built specifically for Claude Code's agent teams feature, and it works at what the author calls the "L3 Meta-Factory" layer — meaning it doesn't just configure agents, it generates the configurations themselves.

The core problem Harness addresses is deceptively simple. Claude Code's agent teams are powerful, but manually defining agents, their skills, and their coordination protocols for each new project is tedious and error-prone. Most developers either skip the structure entirely (running one monolithic agent) or spend an hour writing boilerplate agent definitions. Harness automates that setup. You describe your domain, it picks from six architectural patterns, and generates the full team configuration. The author's A/B testing across 15 software engineering tasks showed a 60% average quality improvement (49.5 to 79.3 on their scoring rubric) with a 100% win rate when using structured harness configurations versus bare agents.

### Why it matters

The AI agent ecosystem is maturing fast, but most of the tooling sits at two extremes: simple prompt wrappers that give you one agent with one context window, and complex orchestration frameworks (LangGraph, CrewAI, AutoGen) that require writing code to define agent behavior. Harness occupies a different space. It's a meta-tool — a tool that generates tools — living inside Claude Code's native plugin system.

What makes this interesting for fullstack developers is the specificity of the output. Say "build a harness for full-stack website development" and you get a pipeline team with agents for design, frontend (React/Next.js), backend API, and QA testing, each with domain-appropriate skills and review gates. The generated skills use progressive disclosure, meaning agents get exactly the context they need at each step rather than dumping everything into a single prompt window.

The timing connects to a broader shift. Claude Code's agent teams feature (still experimental, gated behind `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`) is where Anthropic is betting on developer-AI interaction going. Harness is one of the first serious tools built on top of that feature. If agent teams become the default way developers work with AI coding tools — and the trajectory suggests they will — then meta-tools like Harness become the equivalent of project scaffolders for the agent era.

### Key Features

**Six Architectural Patterns.** Harness ships with Pipeline (sequential dependent tasks), Fan-out/Fan-in (parallel independent tasks), Expert Pool (context-dependent selective invocation), Producer-Reviewer (generation plus quality review), Supervisor (central agent with dynamic task distribution), and Hierarchical Delegation (top-down recursive task splitting). The system picks the right pattern based on your domain description, or you can override it. Each pattern handles inter-agent communication differently — Pipeline passes context forward, Fan-out merges results, Expert Pool routes based on task type.

**Automatic Skill Generation.** Each generated agent gets skills written as markdown files with structured references. Skills use progressive disclosure — an agent analyzing a codebase gets the analysis skill first, then loads reference docs (AST patterns, security checklists, etc.) only when needed. This keeps context windows efficient, which matters when you're running multiple agents in parallel.

**Agent Team Orchestration.** Harness doesn't just create agent definitions — it generates the coordination protocol. That includes message-passing templates between agents, error handling strategies (what happens when one agent fails mid-pipeline), and review gates (the Producer-Reviewer pattern won't ship work until the reviewer agent approves it). The orchestrator skill is a separate file that defines the team's operating procedure.

**Plugin and Skill Dual Installation.** You can install Harness as a Claude Code plugin via the marketplace (`/plugin marketplace add revfactory/harness`) or copy the skills directory directly to `~/.claude/skills/harness/`. The plugin route gives you automatic updates; the manual route gives you full control over the skill files. Both work identically once installed.

**Harness-100 Companion Library.** The `revfactory/harness-100` companion repo contains 100 production-ready agent team configurations across 10 domains (content creation, software development, data/AI, business strategy, education, legal, health, and more). Each ships with 4-5 specialist agents, an orchestrator, and domain-specific skills. That's 1,808 markdown files covering real-world use cases you can install directly or use as templates for customization.

**Multi-Language Support.** The trigger prompts work in English ("build a harness for this project"), Korean ("하네스 구성해줘"), and Japanese ("ハーネスを構成して"). The generated agent definitions and skills are always in English (since Claude Code operates in English), but the interface language matters for adoption in non-English-speaking developer communities.

### Use Cases

- **Full-stack web development** — Generate a pipeline team with design, frontend (React/Next.js), backend API, and QA agents that coordinate from wireframe to deployment. Each agent gets domain-specific skills and the pipeline ensures nothing ships without review.
- **Code review and refactoring** — Fan out parallel agents checking architecture, security vulnerabilities, performance bottlenecks, and code style, then merge all findings into a single structured report.
- **Deep research and technical writing** — Build a research team with agents for web search, academic sources, community sentiment analysis, and cross-validation, producing comprehensive reports with citations.
- **Data pipeline design** — Hierarchical delegation for schema design, ETL logic, data validation rules, and monitoring setup, with each sub-task decomposed recursively.
- **Content and marketing** — A supervisor-coordinated team for market research, ad copy, visual concepts, and A/B test planning with iterative quality review between agents.

### Pros and Cons

Pros:
- The six architectural patterns cover the vast majority of multi-agent coordination needs. You don't need to design agent teams from scratch — describe your domain and Harness picks the right structure.
- The A/B testing data is compelling: +60% average quality improvement with 100% win rate across 15 tasks. The improvement scales with task complexity (+36.2% on expert-level tasks versus +23.8% on basic ones).
- Native Claude Code integration means no external dependencies, no separate runtime, no configuration files outside the `.claude/` directory. It's as close to "zero-config" as agent tooling gets.

Cons:
- Claude Code only. There's a Codex port (meta-harness) and the author mentions cross-runtime support on the roadmap, but today you're locked into Claude Code. If your team uses Cursor, Copilot, or Gemini CLI, Harness doesn't help.
- The +60% quality claim is author-measured with n=15. The author is transparent about this (every citation includes the disclosure), but third-party replications aren't published yet. Run your own pilot before committing.
- Agent Teams is still an experimental Claude Code feature. If Anthropic changes the API or deprecates the feature, Harness breaks. That's the risk of building on experimental infrastructure.

### Getting Started

```bash
# Install via Claude Code marketplace
/plugin marketplace add revfactory/harness
/plugin install harness@harness-marketplace

# Or install manually as a global skill
git clone https://github.com/revfactory/harness.git
cp -r harness/skills/harness ~/.claude/skills/harness
```

Then in Claude Code, enable agent teams and trigger Harness:

```bash
# Enable agent teams (required)
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1

# Trigger Harness with a domain description
# "Build a harness for full-stack website development"
# "Build a harness for code review and refactoring"
# "Build a harness for deep research on [topic]"
```

Harness runs a 6-phase workflow: Domain Analysis → Team Architecture Design → Agent Definition Generation → Skill Generation → Integration & Orchestration → Validation & Testing. The whole process takes a few minutes and outputs agent definitions and skill files to your `.claude/` directory.

### Alternatives

**ECC (Everything Claude Code)** — A standardization and performance optimization layer for Claude Code that sits on top of existing harnesses. ECC provides cross-harness rules, hooks, and workflow standards. It's a different layer than Harness: ECC standardizes across harnesses, Harness generates harnesses. Use ECC if you already have agent teams and want to optimize them; use Harness if you need to create them from scratch.

**Archon** — A deterministic runtime configuration factory at the same L3 layer as Harness. Archon generates repeatable, version-controlled runtime configurations for agent teams, while Harness generates the team architecture itself. Pick Archon when you need runtime determinism and reproducibility; pick Harness when you need team structure and agent design. They're complementary — design with Harness, deploy with Archon.

**LangGraph** — A state-graph orchestration framework from LangChain that's LLM-agnostic and supports long-running, state-recoverable workflows. LangGraph is more powerful for complex multi-step processes with conditional branching and human-in-the-loop checkpoints, but it requires writing Python code to define agent behavior. Harness generates everything from a natural language description. Choose LangGraph when you need fine-grained control over agent state transitions; choose Harness when you want fast scaffolding.

### Verdict

Harness is the most pragmatic approach to agent team design I've seen. Instead of asking developers to learn an orchestration framework or manually write agent configs, it takes a one-sentence domain description and generates a working team with architecture, skills, and coordination protocols. The +60% quality improvement data is author-measured and small-sample, but it aligns with what you'd expect — structured agent teams outperform monolithic agents, especially on complex tasks.

The Claude Code lock-in is real. If your workflow lives in Cursor or Copilot, this doesn't apply today. But if you're already using Claude Code — and a growing number of developers are — Harness is worth installing just to see what structured agent teams look like for your projects. The Harness-100 companion library with 100 ready-made configurations across 10 domains makes the barrier to experimentation essentially zero. At 6,000+ stars in ten weeks, the developer community is paying attention.
