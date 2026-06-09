---
name: statewright
description: "Statewright uses state machines to constrain AI coding agent tool access per workflow phase, turning unreliable agents into deterministic workers."
url: https://github.com/statewright/statewright
stars: 398
forks: 25
language: Rust
tags: ["ai-agents", "state-machines", "coding-agents", "guardrails", "developer-tools"]
featured: false
publishedAt: 2026-06-09
---

## Statewright

### Overview

Statewright is a Rust-based state machine engine that wraps around AI coding agents and constrains which tools they can access at each phase of a workflow. It hit 126 points on Hacker News and 398 GitHub stars within its first month, which is notable for a developer tool that solves a problem most people didn't have vocabulary for until recently.

The project is built by Ben Cochran, a Distinguished Engineer with 20+ years of full-stack engineering, DevOps, and ML experience across NVIDIA, AMD, and other organizations. That background shows in the architecture — this isn't a weekend hack wrapping prompts in JSON. It's a three-layer system with a pure Rust state machine evaluator, an agent binary that talks directly to Ollama, and an MCP gateway that integrates with Claude Code, Codex, Cursor, and Pi.

The core problem: give an AI agent 40+ tools and an open-ended task, and it re-reads the same file five times, calls Edit during review, or deploys before tests pass. The standard fix is bigger models and longer prompts. Statewright takes the opposite approach — make the problem smaller. A planning state gets read-only tools. Implementation unlocks Edit with line limits. Testing only permits designated test commands. The agent can't call tools outside the current phase, period. No amount of prompt engineering achieves this level of determinism.

### Why it matters

The AI coding agent space is exploding, but reliability is the elephant in the room. Every developer using Claude Code or Codex has experienced the frustration of an agent that goes off the rails — reading files it doesn't need, editing code during a review phase, or running destructive commands. Observability tools tell you what went wrong after the fact. Statewright prevents it from happening in the first place.

This connects to a broader shift in how we think about AI agents. The industry is moving from "make the model smarter" to "constrain the problem space." State machines are a well-understood formalism from decades of systems engineering. Applying them to agentic workflows is almost obvious in hindsight — which is usually a sign of good design. The research data backs it up: on a 5-task SWE-bench subset, two local models went from 2 out of 10 attempts passing to 10 out of 10 with statewright constraints. Same tasks, same hardware. That's not a marginal improvement.

### Key Features

**Per-State Tool Enforcement.** Each state in a workflow defines an `allowed_tools` array. The agent literally cannot see or call tools outside that list. A planning state might only allow Read, Grep, and Glob. When the workflow transitions to implementation, Edit and Write unlock. This isn't advisory — it's hard enforcement at the hook layer for Claude Code, Codex, and Pi.

**Bash Discernment.** Even when Bash is permitted in a state, Statewright blocks dangerous patterns like `echo > file`, `rm -rf`, `sed -i`, and scripting interpreters like `python` or `node` when Write/Edit aren't allowed. This is a level of nuance most guardrail systems miss — Bash is a Swiss Army knife, and Statewright knows which blade you're using.

**Per-State Model Routing.** States can specify which model to use. Run cheap reconnaissance with Haiku, escalate to Opus for high-stakes reasoning, then drop back to Sonnet for implementation. The `sw-agent` binary accepts a config file with per-state Ollama URL, temperature, and context window overrides. This means you're not paying Opus prices for file reading.

**Conditional Transitions with Guards.** Transitions can have programmatic guards — `test_result eq pass`, `coverage gt 80`. The state machine won't advance unless conditions are met. This replaces the "hope the agent does the right thing" pattern with deterministic verification. Fork/join support lets you run branches sequentially or in parallel.

**Visual Workflow Editor.** Define workflows in JSON and edit them in a visual browser-based editor. Point your agent at the JSON schema and it generates a workflow via `statewright_create_workflow`. The editor lets you tweak tools, commands, and environment blocks without hand-editing JSON.

**Research-Backed Reliability.** On a 5-task SWE-bench subset, models below 13GB parameters can identify bugs but can't make accurate edits. Above that threshold, Statewright's constraints turn failures into completions. The 13GB floor is a model limitation, not a Statewright one — but the tool makes the difference between 20% and 100% success rates for models above it.

**Approval Gates and Interrupts.** Set `requires_approval` on any state to pause for human review. Define interrupt patterns — edit a file matching a glob and the agent auto-transitions to a validation state, then returns. Environment scoping hides production credentials and substitutes staging values.

### Use Cases

- **Bug fix workflows** — Define a planning → implementation → testing → completed pipeline where the agent reads code, makes targeted edits (capped at 20 lines), runs tests, and loops back if they fail. No more agents rewriting entire files to fix a typo.
- **Code review automation** — Lock the agent into read-only mode during review phases. It can grep, read, and glob, but cannot edit. Transitions to implementation only after human approval.
- **Multi-model cost optimization** — Route cheap states (file reading, grep) to Haiku or small local models, and expensive states (complex reasoning) to Opus. Cut your agent costs by 60-70% without sacrificing quality.
- **Local model reliability** — If you're running Ollama with 13-20B parameter models, Statewright is the difference between a useful agent and a frustrating one. The constrained tool space compensates for limited reasoning capacity.
- **CI/CD agent pipelines** — Use Statewright in automated pipelines where agents handle code changes. The deterministic state transitions mean you can trust the agent not to run `rm -rf` during a refactor.
- **Team onboarding** — New team members can define safe workflows that prevent agents from touching production configs or running untested deployments. The guardrails encode institutional knowledge.

### Pros and Cons

Pros:
- Hard enforcement at the hook layer, not prompt-level suggestions. The agent literally cannot call blocked tools — this is a fundamentally different approach from "please don't edit files during review."
- Per-state model routing is a genuine cost optimization. Running Haiku for reading and Opus for reasoning could save 60-70% on agent API costs.
- The Rust engine is deterministic with no runtime dependencies. It works the same way whether you're on Claude Code, Codex, or a local Ollama setup.
- Research data shows concrete improvements: 2/10 to 10/10 pass rate on SWE-bench tasks with the same model and hardware.

Cons:
- Requires defining workflows upfront, which adds friction for exploratory tasks. If you don't know the phases of your work, a state machine can feel constraining.
- The visual editor and hosted service (statewright.ai) are early-stage. The JSON schema is powerful but verbose for simple workflows.
- Hard enforcement only works with agents that support hooks (Claude Code, Codex, Pi). Cursor integration is advisory only — the model can ignore the rules.
- The 13GB model floor means small local models still can't make accurate edits even with constraints. The tool helps, but it can't overcome fundamental model limitations.

### Getting Started

```bash
# Install into Claude Code
/plugin marketplace add statewright/statewright
/plugin install statewright

# Sign up and generate a key (browser opens automatically)
# Then start a workflow:
start the bugfix workflow — fix the failing tests in calc.py

# Or use the slash command:
/statewright start bugfix

# For direct Ollama usage with the Rust binary:
cargo install statewright
sw-agent --workflow bugfix.json --model llama3.3

# Define a custom workflow in JSON:
cat > my-workflow.json << 'EOF'
{
  "id": "my-workflow",
  "initial": "planning",
  "states": {
    "planning": {
      "allowed_tools": ["Read", "Grep", "Glob"],
      "max_iterations": 8,
      "on": { "READY": "implementing" }
    },
    "implementing": {
      "allowed_tools": ["Read", "Edit", "Write"],
      "max_edit_lines": 20,
      "on": { "DONE": "testing" }
    },
    "testing": {
      "allowed_tools": ["Read", "Bash"],
      "allowed_commands": ["pytest", "npm test"],
      "on": {
        "PASS": { "target": "completed", "guard": "tests_passed" },
        "FAIL": "implementing"
      }
    },
    "completed": { "type": "final" }
  }
}
EOF
```

### Alternatives

**Aider** — A terminal-based AI coding assistant that focuses on pair programming with LLMs. Aider is more mature and has broader model support, but lacks Statewright's formal state machine constraints. Choose Aider when you want a flexible coding partner; choose Statewright when you need deterministic workflow enforcement.

**Cline** — A VS Code extension for AI-assisted coding with file editing and terminal access. Cline offers a rich IDE integration but relies on prompt engineering for behavior control. It's better for interactive development where you're watching the agent, while Statewright is better for automated or semi-automated workflows where you need guarantees.

**Continue** — An open-source AI code assistant that integrates with VS Code and JetBrains. Continue focuses on autocomplete and inline editing rather than multi-step agentic workflows. It's a complement to Statewright, not a replacement — use Continue for inline assistance and Statewright for structured agent workflows.

### Verdict

Statewright is the most interesting approach to AI agent reliability I've seen in 2026. The core insight — constrain the tool space with formal state machines instead of throwing bigger models at the problem — is sound, and the research data backs it up. The 126-point Hacker News reception with 59 comments shows genuine developer interest in this category. It's early (398 stars, created May 2026), and the workflow definition has a learning curve, but the architecture is right. If you're building anything with AI coding agents beyond simple autocomplete, Statewright deserves a serious look. The Rust engine, MCP integration, and per-state model routing make it practical, not just theoretical. This is the kind of tool that becomes infrastructure.
