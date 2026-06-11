---
name: skillopt
description: "SkillOpt by Microsoft trains reusable natural-language skills for frozen LLM agents using trajectory-driven edits and validation-gated updates — no fine-tuning required."
url: https://github.com/microsoft/SkillOpt
stars: 5753
forks: 564
language: Python
tags: ["ai-agents", "llm", "optimization", "microsoft", "self-evolving"]
featured: false
publishedAt: 2026-06-12
---

## SkillOpt

### Overview

SkillOpt is a Microsoft Research project that treats agent skill documents as trainable parameters — applying the same discipline as neural network training (epochs, batch sizes, learning rates, validation gates) but without touching model weights. It launched in May 2026 and crossed 5,700 GitHub stars in its first month, which is remarkable for a research tool that doesn't have a flashy demo app or a VC-funded marketing push.

The project comes from Yifan Yang and a team at Microsoft Research, alongside contributors from the broader agent ecosystem. The academic backing shows — there's a proper arXiv paper (2605.23904), a project page with interactive demos, and reproducible benchmarks. But what's interesting is how quickly the practical tooling followed the paper. The SkillOpt-Sleep plugin system (released June 8, 2026) already integrates with Claude Code, Codex, and Copilot, giving your local coding agent a nightly "sleep cycle" where it reviews past sessions, replays recurring tasks, and consolidates validated long-term skills.

The core problem SkillOpt solves: when you give an LLM agent a skill document (a set of instructions, patterns, or strategies), that skill is usually static. You write it once, maybe refine it manually, and hope it works. SkillOpt automates that refinement loop. It runs the agent through tasks, scores the results, generates bounded text edits to the skill document, and only accepts changes that improve performance on held-out validation tasks. The output is a compact `best_skill.md` file (300–2,000 tokens) that you deploy alongside your unchanged model.

### Why it matters

The AI agent space is moving fast, but most developers are still hand-crafting prompts and skill files through trial and error. You write a system prompt, test it, tweak it, test again. It's artisanal prompt engineering — no systematic optimization, no validation against regressions, no way to know if your changes actually help across different scenarios.

SkillOpt brings machine-learning discipline to this process without requiring ML expertise. You don't need to understand gradient descent or backpropagation. You define your tasks, your scoring function, and let the optimizer iterate. The validation gate is the key innovation: changes to your skill document only get accepted if they improve performance on held-out tasks, preventing the kind of regression that happens when you optimize for one edge case and break three others.

The numbers are hard to ignore. Across six benchmarks, seven target models, and three execution harnesses (direct chat, Codex CLI, Claude Code CLI), SkillOpt is best or tied-best on all 52 evaluated cells. On GPT-5.5, it lifts average no-skill accuracy by +23.5 points in direct chat, +24.8 in the Codex agentic loop, and +19.1 in Claude Code. Those aren't marginal gains — that's the difference between an agent that sometimes works and one that's reliably useful.

### Key Features

**Trajectory-Driven Skill Editing.** Instead of asking an LLM to "improve this prompt," SkillOpt runs the agent through actual tasks, collects scored trajectories, and uses a separate optimizer model to generate bounded add/delete/replace edits on the skill document. Each edit is specific, contextual, and traceable to a real execution outcome. This is fundamentally different from asking GPT to "make this better."

**Validation-Gated Updates.** Every candidate edit must pass a held-out validation score before it's accepted. This is the same principle as validation sets in machine learning — you optimize on training data but gate on unseen data to prevent overfitting. In practice, this means your skill gets better at general tasks, not just the specific examples you tested.

**SkillOpt-Sleep: Nightly Consolidation.** The Sleep plugin gives your coding agent a "sleep cycle" that harvests session transcripts, mines recurring tasks, replays them offline, and consolidates what it learns into validated long-term memory and skills. It works with Claude Code, Codex, and Copilot. The agent literally gets better the more you use it, with no manual intervention.

**Multi-Backend Support.** SkillOpt works with OpenAI, Azure OpenAI, Claude, Qwen, and MiniMax backends out of the box. The optimizer model and the target model can be different — you can use a strong model to optimize skills for a cheaper, faster model you actually deploy. This separation is practical for production use.

**Benchmark Suite with Six Built-In Tasks.** The project includes six benchmarks covering different agent capabilities, plus a WebUI dashboard for monitoring training progress. You can also add custom benchmarks by creating a package with a dataloader, rollout function, and seed skill — the extensibility story is solid.

**Portable Skill Artifacts.** The deployed `best_skill.md` file is just markdown. It works with any model that can read a system prompt. Optimized skills transfer across model scales, between Codex and Claude Code harnesses, and to nearby benchmarks without re-optimization. There's no vendor lock-in, no special runtime, no SDK dependency at inference time.

### Use Cases

- **Coding agent optimization** — Train your Claude Code or Codex setup to handle your team's specific patterns, codebase conventions, and recurring tasks. The Sleep plugin automates this over time.
- **Customer support agents** — Optimize support bot skills for your specific product, tone, and escalation rules. Validation gates prevent the bot from getting worse at common queries while optimizing for edge cases.
- **Research assistants** — Train an agent to follow your preferred methodology, citation style, and analysis framework. The skill document becomes a portable, optimizable representation of your workflow.
- **Multi-model deployment** — Use an expensive model (GPT-5.5, Claude Opus) to optimize skills, then deploy the resulting `best_skill.md` with a cheaper model (GPT-4o-mini, Claude Haiku) for production inference. The skill carries the knowledge, not the model.
- **Team skill sharing** — Optimize a skill document for your team's development workflow, commit it to your repo, and everyone benefits from the same optimized agent behavior without individual tuning.

### Pros and Cons

Pros:
- Validation-gated updates are the real breakthrough — they prevent the "optimize for one thing, break another" problem that plagues manual prompt engineering. The 0.00 → 1.00 improvement on deficient skills (with zero regressions on previously working ones) validates this approach.
- The optimizer/target model split is pragmatic. You can use a frontier model to write skills for a model that costs 10x less to run, making this economically viable for production.
- MIT licensed with PyPI distribution (`pip install skillopt`). The barrier to entry is low, and the WebUI dashboard makes training progress visible without parsing logs.

Cons:
- The training loop requires significant API calls — each epoch involves multiple rollouts, reflections, and evaluations. Budget-conscious developers will burn through tokens fast, especially with frontier models as the optimizer.
- The academic origin means the documentation leans toward benchmark reproduction rather than "here's how to optimize your specific use case." The gap between running the included benchmarks and applying this to your own agent workflow is non-trivial.
- SkillOpt-Sleep is very new (released June 8, 2026). The plugins work, but the ecosystem is early. Expect rough edges and breaking changes in the next few months.

### Getting Started

```bash
# Install from PyPI
pip install skillopt

# For the WebUI dashboard
pip install -e ".[webui]"
python -m skillopt_webui.app

# Install SkillOpt-Sleep for Claude Code
# (from the repo)
git clone https://github.com/microsoft/SkillOpt.git
cd SkillOpt
# For Claude Code:
/plugin marketplace add ./plugins/claude-code
# Then run /sleep in your Claude Code session

# For Codex:
bash plugins/codex/install.sh
# Then run /sleep in your Codex session

# Verify without API keys (deterministic proof)
python -m skillopt_sleep.experiments.run_experiment --persona researcher --assert-improves
```

### Alternatives

**DSPy** — Stanford's framework for programming (not prompting) language models. DSPy optimizes prompts through its own teleprompter system and is more mature with a larger community. Choose DSPy when you need a full programming framework for LLM pipelines with built-in optimization, not just skill document training. SkillOpt is more focused — it does one thing (optimize skill documents) with stronger validation guarantees.

**PromptFlow** — Microsoft's own LLM workflow orchestration tool. PromptFlow is more of an end-to-end pipeline builder with evaluation and deployment features. It's better suited for building complex multi-step LLM applications. SkillOpt is the better choice when your primary goal is optimizing a single skill document through systematic iteration, not building a workflow.

**Manual Prompt Engineering with Evals** — Tools like Braintrust, Promptfoo, or custom eval harnesses let you test prompts systematically. This approach gives you full control but requires building your own optimization loop. Choose manual evals when you need fine-grained control over what "better" means, or when your evaluation criteria are too nuanced for automated scoring.

### Verdict

SkillOpt is the most rigorous take on agent skill optimization I've seen from any research lab. The validation-gated approach is genuinely novel — it's not just "ask an LLM to improve your prompt" but a systematic loop with real guarantees against regression. The numbers back it up: 52 out of 52 best-or-tied cells across benchmarks and models is hard to argue with. The SkillOpt-Sleep plugin is where this gets practically interesting for working developers — giving your Claude Code or Codex agent a nightly training loop that makes it better at your specific tasks over time. It's early, it's research-adjacent, and the token costs for training runs will make some teams hesitate. But if you're building serious agent workflows and you're tired of hand-tuning prompts through vibes and intuition, SkillOpt is worth the experiment. The 5,700 stars in a month suggest the developer community is paying attention.
