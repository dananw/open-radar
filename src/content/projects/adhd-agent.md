---
name: adhd-agent
description: "ADHD is a tree-of-thought reasoning skill for AI coding agents — spawns parallel isolated reasoning branches, prunes traps, and deepens the best ideas."
url: https://github.com/UditAkhourii/adhd
stars: 720
forks: 33
language: TypeScript
tags: ["ai-agents", "reasoning", "claude-code", "tree-of-thought", "developer-tools"]
featured: false
publishedAt: 2026-06-03
---

## ADHD

### Overview

ADHD is a reasoning skill for AI coding agents that fixes what most developers have already noticed: LLMs anchor on their first answer and never seriously consider alternatives. It reached 720 GitHub stars in its first nine days after launch (May 25, 2026), was featured in The New Stack, and has already been adopted by at least one open-source project as a production integration. That kind of velocity usually signals a tool that solves a problem people actually feel.

The project is built by Udit Akhouri, who authored a research preprint titled "ADHD: Parallel Divergent Ideation for Coding Agents." The preprint isn't just marketing — it lays out the architectural reasoning behind the tool and why prompting tricks alone don't solve premature convergence. Akhouri's approach treats the anchoring problem as structural: you can't just ask a model to "think harder" or "consider alternatives" in a single context window. The model will still bias toward whatever it said first.

The core problem ADHD addresses is straightforward. When you ask Claude Code, Cursor, or Codex to help with a design decision, you get one chain of thought that locks in early. Chain-of-Thought prompting helps with reasoning depth, but not breadth. Tree-of-Thought widens the search space, but branches still share context, so the anchoring persists across them. ADHD spawns N completely isolated reasoning processes under deliberately distorted "cognitive frames" — each branch sees the problem from a different angle with zero shared context — then runs a separate critic pass to score, cluster, prune traps, and deepen the survivors. The generator-critic split is mechanical: separate LLM calls with opposite system prompts, not a single prompt promising to be balanced.

### Why it matters

The AI coding agent space is maturing fast. Claude Code, Cursor, Codex, OpenClaw, and a dozen other tools are competing for developer workflows. But almost all of them share the same underlying reasoning pattern: linear chain-of-thought, one pass, hope for the best. Developers have learned to work around this by manually prompting "give me three approaches" or "what could go wrong with this?" — essentially doing ADHD's job by hand.

ADHD operationalizes that workaround into a real architectural pattern. It's a skill — not a framework, not a platform, not a SaaS. You install it into your existing agent and it changes how that agent reasons about open-ended problems. The 5.2x improvement in trap detection over baseline (from the project's own evals) is the number that jumps out. Baseline models rarely name the seductive-but-broken ideas. ADHD forces them to surface those ideas, then kills them.

This connects to a broader trend in the agent ecosystem: the shift from "better models" to "better architectures around models." MCP servers, agent skills, tool-use patterns — the interesting work is happening at the orchestration layer, not the model layer. ADHD is one of the cleaner examples of this pattern.

### Key Features

**Isolated Parallel Reasoning.** Each cognitive frame runs as a completely separate agent call. Branches never see each other's output during the diverge phase. This is the key architectural decision — it prevents the anchoring effect that plagues Tree-of-Thought approaches where branches share a context window. The isolation is enforced at the call level, not by prompting.

**15 Cognitive Frames.** The skill ships with 15 pre-built cognitive frames — think of them as deliberately biased lenses. One frame might force the agent to consider only failure modes. Another might require a security-first perspective. Another might demand minimal-complexity solutions. The frames are designed to produce genuinely different starting points, not minor variations on the same idea.

**Mechanical Generator-Critic Split.** The diverge phase is explicitly forbidden from evaluating. The focus phase is explicitly forbidden from generating new ideas. This split is enforced through separate system prompts, not through hoping the model follows instructions. A critic call scores every idea on novelty, viability, and fit, flags traps with reasons, and clusters ideas by underlying angle.

**Trap Detection and Pruning.** The critic pass specifically identifies ideas that sound good but are fundamentally broken, and explains why. This is the feature developers notice most — the 5.2x improvement over baseline in trap detection means the difference between shipping a bad approach and catching it before implementation.

**Universal Agent Support.** One install command auto-detects your agent — Claude Code, Cursor, Codex, OpenClaw, Windsurf, Cline, Gemini CLI, and roughly 50 others. The skill format is compatible with the emerging skill standard (`npx skills add`), and there's a CLI (`adhd-agent`) and library (`adhd-agent`) for custom integrations.

**Programmatic API.** Beyond the skill interface, ADHD exposes a TypeScript library for building it into your own tools. You control `framesPerRun`, `topK`, and the problem statement. The output includes `shortlist`, `nonObviousPick`, `traps`, `deepened`, and `clusters` — structured data you can pipe into whatever you're building.

**Evaluation Framework.** The project includes its own eval methodology with reproducible results across six open-ended engineering problems. Mean breadth scores went from 4.83 (baseline) to 9.00 (ADHD). Novelty went from 2.67 to 7.83. These numbers are self-reported, but the methodology is documented and the project has already received an independent evidence-based review with 11 sources and 8 validation rounds.

### Use Cases

- **Design decisions** — When you need to choose between architectural approaches (database schema design, API surface, state management patterns), ADHD forces the agent to genuinely consider multiple directions before committing.
- **Fuzzy debugging** — For bugs where the root cause isn't obvious, spawning parallel reasoning under different diagnostic frames (performance, concurrency, data integrity, environment) surfaces hypotheses you wouldn't get from linear debugging.
- **API and interface design** — Naming things and designing APIs are exactly the kind of open-ended problems where premature convergence hurts most. ADHD's diverge-focus pattern was built for this.
- **Strategy and planning** — Technical roadmap decisions, migration strategies, and "should we build or buy" questions benefit from structured divergent thinking rather than a single opinion.
- **Creative problem-solving** — Any prompt shaped like "give me a few ways to..." or "what are the options for..." runs through ADHD better than through a single chain-of-thought pass.

### Pros and Cons

Pros:
- The architecture is genuinely novel — it's not just another prompt template. The hard isolation between branches and the mechanical generator-critic split solve a real problem that prompting alone can't fix.
- Works with essentially every coding agent out there. One install command, no vendor lock-in, no SaaS dependency. The skill is MIT-licensed.
- The eval data is public, documented, and reproducible. The project even welcomed independent review rather than hiding from it, which is a good sign for a tool making strong claims.
- Already adopted by at least one production open-source project (repowire), which ported the framework onto its mesh-orchestrator primitives.

Cons:
- Cost and latency multiply linearly with the number of frames. Five parallel reasoning calls cost 5x a single call. For cheap problems, this overhead isn't worth it — ADHD is designed for decisions where the cost of picking wrong is higher than the cost of thinking more.
- The cognitive frames are pre-built and finite (15 shipped). Custom frame authoring is documented but requires understanding the frame format. The quality of results depends heavily on frame selection.
- Self-reported evals, even with methodology transparency, should be taken with some skepticism. The six-problem benchmark is small. Independent replication at larger scale hasn't happened yet.
- Early-stage project — 33 forks, active development, and the API surface may change. The first adopter (repowire) had to port the framework onto its own primitives rather than using it out of the box.

### Getting Started

```bash
# Install as a skill for your coding agent (auto-detects Claude Code, Cursor, Codex, etc.)
npx skills add UditAkhourii/adhd

# Or install the CLI globally
npm install -g adhd-agent

# Run it directly
adhd "design a rate limiter that survives a leader election"
adhd "name this function" --frames 3 --ideas 8 --top 2

# Use the library in your own code
npm install adhd-agent
```

```ts
import { run, renderText } from "adhd-agent";

const result = await run({
  problem: "How should we shard this queue under bursty load?",
  framesPerRun: 5,
  topK: 3
});

console.log(renderText(result));
// result.shortlist · result.nonObviousPick · result.traps · result.deepened · result.clusters
```

### Alternatives

**Chain-of-Thought Prompting** — The baseline approach. You ask the model to "think step by step" and it produces a single linear reasoning chain. Cheaper, faster, and fine for problems where the answer space is narrow. Use CoT when you already know roughly what the right answer looks like and just need help with the details.

**Tree-of-Thought (manual)** — You prompt the model to explore multiple branches, but they share a context window so anchoring persists. Some developers do this manually by running the same prompt three times in separate conversations and comparing results. ADHD automates and improves on this pattern by adding hard isolation and a critic pass.

**Multi-agent frameworks (CrewAI, AutoGen)** — Full multi-agent orchestration platforms that could implement ADHD-like patterns, but with significantly more setup and infrastructure overhead. These are better suited for complex multi-step workflows than for a single design decision. ADHD is lighter — it's a skill, not a platform.

### Verdict

ADHD is the most interesting agent reasoning tool I've seen in 2026. It solves a problem every developer using AI coding tools has felt — the frustrating moment when the model picks a mediocre approach and confidently runs with it — and it does so with a clean architectural solution rather than prompt engineering hacks. The 720 stars in nine days and the immediate adoption by other projects suggest the developer community recognizes the problem. It's not free (parallel calls cost money), and it's not for every problem (simple tasks don't need divergent thinking), but for design decisions, architecture choices, and fuzzy debugging, ADHD is a genuine upgrade over single-pass reasoning. If you're using Claude Code, Cursor, or Codex for anything beyond trivial code generation, install it and try `/adhd` on your next hard problem. You'll feel the difference immediately.
