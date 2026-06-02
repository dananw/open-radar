---
name: skillopt
description: "SkillOpt trains reusable agent skills through trajectory-driven edits with validation gates — think backprop for your AI agent prompts, not model weights."
url: https://github.com/microsoft/SkillOpt
stars: 4257
forks: 435
language: Python
tags: ["ai-agents", "agent-skills", "llm-optimization", "microsoft", "self-evolving-agents"]
featured: false
publishedAt: 2026-06-02
---

## SkillOpt

### Overview

SkillOpt is a text-space optimizer from Microsoft Research that trains reusable natural-language skills for frozen LLM agents. It hit 4,200 GitHub stars in under a month after its May 2026 release, which tracks — developers have been hand-crafting agent prompts for two years now, and the process still feels like alchemy. SkillOpt replaces that intuition with a disciplined training loop: epochs, batches, learning rates, validation gates. The difference is that the thing being trained isn't a model weight. It's a markdown file.

The project comes out of Microsoft's applied AI research group and is backed by an arXiv paper (2605.23904) with ablations and per-cell results. That academic rigor shows up in the implementation — this isn't a prompt-tuning wrapper with a clever name. The system uses a separate optimizer model to generate bounded add/delete/replace edits on a single skill document, accepts edits only when they improve a held-out validation score, and deploys the result as a compact `best_skill.md` file (typically 300–2,000 tokens) that runs against the unchanged target model. Zero additional inference-time cost at deployment.

Across six benchmarks, seven target models, and three execution harnesses (direct chat, Codex CLI, Claude Code CLI), SkillOpt is best or tied-best on all 52 evaluated (model, benchmark, harness) cells. On GPT-5.5, it lifts average no-skill accuracy by +23.5 points in direct chat, +24.8 inside the Codex agentic loop, and +19.1 inside Claude Code. Those are significant gains — and they transfer across model scales and between harnesses without re-optimization.

### Why it matters

The agent ecosystem has a productivity ceiling problem. Developers spend hours crafting system prompts, iterating on tool descriptions, and tuning agent instructions through trial and error. When the underlying model changes, or you switch from Claude Code to Codex, those hand-tuned prompts often need rework. There's no systematic way to improve an agent's instructions over time.

SkillOpt fills that gap by treating agent skills as optimizable artifacts rather than static text. This connects to a broader shift in the AI developer tooling space — the move from "prompt engineering" as a manual craft to "prompt optimization" as an engineering discipline. We've seen early signals from projects like DSPy (compiler for language model programs) and TextGrad (automatic differentiation for text). SkillOpt takes a more practical angle: it doesn't try to compile or differentiate your prompts. It trains them the way you'd train a model — with data, evaluation, and iterative improvement — but the output is a markdown file you can read, version-control, and ship.

For fullstack developers building AI-powered features, this matters because agent reliability is the bottleneck. Your RAG pipeline works, your tool integrations are solid, but the agent still makes inconsistent decisions because its instructions are hand-written strings that nobody evaluates systematically. SkillOpt gives you a path to measurably better agent behavior without touching model weights or infrastructure.

### Key Features

**Trajectory-Driven Skill Editing.** The optimizer model doesn't rewrite the entire skill from scratch. It generates bounded edits — add, delete, or replace specific sections — based on scored execution trajectories from training runs. This is closer to how a developer actually improves documentation: you look at what failed, identify the gap in instructions, and fix that specific part. The bounded edit approach prevents the kind of catastrophic forgetting that happens when you regenerate an entire prompt.

**Validation-Gated Updates.** Every candidate edit must pass a held-out validation set before it's accepted. If the edit doesn't improve the validation score, it's rejected and added to a rejected-edit buffer. This prevents overfitting to the training distribution — the same principle as early stopping in neural network training, but applied to text. The rejected buffer also prevents the optimizer from cycling through the same bad ideas.

**Textual Learning Rate Budget.** SkillOpt caps how much the skill document can change per epoch, analogous to a learning rate in gradient descent. Large, sweeping edits are penalized. Small, targeted improvements are preferred. This keeps the training stable and prevents the optimizer from thrashing between completely different instruction strategies. It's a surprisingly effective control mechanism for text-space optimization.

**Zero Inference-Time Overhead.** The deployed artifact is a static markdown file — `best_skill.md`. You paste it into your agent's system prompt, and it runs against the unchanged target model. No additional API calls, no scoring models, no runtime infrastructure. The optimization cost is paid once during training. The deployment cost is zero. This is what makes SkillOpt practical for production use, not just research demos.

**Multi-Harness Transfer.** Skills trained on one execution harness (say, Codex CLI) transfer to others (Claude Code CLI, direct chat) without re-optimization. The paper shows consistent gains across harnesses, which means you can train once and deploy across your team's different tool setups. This is important for organizations where some developers use Claude Code and others use Codex or Cursor.

**Multi-Provider Support.** The optimizer works with Azure OpenAI, Anthropic Claude, Qwen (via local vLLM), and MiniMax out of the box. You can use a strong model as the optimizer (GPT-5.5) while targeting a cheaper model for deployment. This split optimizer/target design is cost-efficient — you pay for expensive training runs with the optimizer model, but deploy the resulting skill on whatever model your budget allows.

**Reproducible Training Pipeline.** The entire training loop is config-driven via YAML files. You specify your benchmark, data splits, optimizer model, target model, and hyperparameters in a config, and the training runs are reproducible. This is a significant step up from "I tweaked the prompt 47 times in the ChatGPT playground and this version seemed to work best."

### Use Cases

- **Improving coding agent reliability** — If you're building features powered by Claude Code or Codex, SkillOpt can train agent skills that make the coding agent more consistent at your specific tasks (code review, refactoring, test generation) rather than relying on generic system prompts.
- **RAG pipeline optimization** — Train skills that teach your retrieval-augmented agent how to synthesize answers from your specific document corpus. The validation gates ensure the skill actually improves accuracy on your domain, not just on generic benchmarks.
- **Customer support automation** — For teams deploying LLM-powered support agents, SkillOpt can iteratively improve the agent's handling instructions based on real conversation trajectories and human feedback scores.
- **Multi-model deployment strategies** — Use an expensive model (GPT-5.5) to optimize a skill, then deploy that skill against a cheaper model (GPT-4o-mini or Qwen) and still get meaningful accuracy improvements. The transfer works across model scales.
- **Agent instruction version control** — Since the output is a markdown file, you can diff, review, and version-control your agent's optimized skills the same way you manage code. This fits naturally into existing GitOps workflows.

### Pros and Cons

Pros:
- The results are real and reproducible — 52/52 best or tied-best cells across benchmarks, with per-cell results published in the paper. This isn't cherry-picked marketing data.
- Zero deployment overhead is a killer feature. The trained skill is a static file. No runtime dependencies, no additional API costs, no infrastructure changes.
- The multi-harness transfer means you're not locked into a single AI coding tool. Train once, use across Codex, Claude Code, and direct API calls.
- Microsoft backing and MIT license give confidence that the project will be maintained and that you can use it commercially without legal headaches.

Cons:
- Requires API access to a strong model (GPT-5.5 or equivalent) for the optimizer role, which means real training costs. Budget-conscious teams may find the optimization loop expensive to run iteratively.
- The setup is research-tool oriented — YAML configs, data splits, benchmark harnesses. It's not a polished developer product with a GUI. You need to be comfortable with Python, CLI tools, and experimental ML workflows.
- The benchmarks are task-specific (SearchQA, ALFWorld, LiveMathematicianBench). Your mileage will vary on custom agent tasks — you'll need to build your own evaluation harness to get the full benefit.

### Getting Started

```bash
# Clone and install
git clone https://github.com/microsoft/SkillOpt.git
cd SkillOpt
pip install -e .

# Configure API credentials
cp .env.example .env
# Edit .env with your Azure OpenAI or other provider credentials

# Train a skill on SearchQA
python scripts/train.py \
    --config configs/searchqa/default.yaml \
    --split_dir /path/to/your/searchqa_split \
    --optimizer_model gpt-5.5 \
    --target_model gpt-5.5

# Train on ALFWorld (requires extra dependency)
pip install -e ".[alfworld]"
alfworld-download

python scripts/train.py \
    --config configs/alfworld/default.yaml \
    --split_dir data/alfworld_path_split \
    --optimizer_model gpt-5.5 \
    --target_model gpt-5.5
```

The trained skill is output as `best_skill.md` — a plain markdown file you can read, edit, and paste into any agent's system prompt.

### Alternatives

**DSPy** — Stanford's programming framework for optimizing language model pipelines. DSPy compiles your entire LM pipeline (retrieval, reasoning, output) into optimized modules using teleprompters. It's more general than SkillOpt — it optimizes full pipelines, not just skill documents — but it's also more complex to set up and requires you to express your agent logic as DSPy modules. Choose DSPy when you need to optimize an entire multi-step pipeline. Choose SkillOpt when you want a focused improvement on a single agent skill with minimal infrastructure changes.

**TextGrad** — An automatic differentiation framework for text-based optimization. TextGrad treats text as differentiable and uses natural-language feedback as gradients. It's more theoretically elegant but less practical for agent skill optimization — the feedback signals are noisier and the optimization is less stable than SkillOpt's validation-gated approach. Choose TextGrad when you're doing research on text optimization. Choose SkillOpt when you want reproducible improvements to production agent skills.

**Manual Prompt Engineering** — The status quo. Iterate on prompts in the ChatGPT playground, A/B test with your users, and hope for the best. This works for simple use cases but doesn't scale and isn't reproducible. Choose manual engineering when your agent task is simple and the stakes are low. Choose SkillOpt when you need measurable, transferable improvements to agent performance.

### Verdict

SkillOpt is the most interesting thing to come out of the agent optimization space this year. The core insight — treat agent skills as trainable artifacts with the same discipline we apply to model weights — is obvious in retrospect but nobody had built a clean, reproducible system for it until now. The fact that it ships with a research paper, per-cell benchmark results, and support for multiple providers makes it feel like a real tool rather than a proof of concept. The 4,200-star growth in under a month suggests the developer community agrees. If you're building any kind of AI agent — coding assistants, support bots, RAG systems — and you're still hand-tuning prompts, you should spend an afternoon with SkillOpt. The optimization loop is real, the gains are measurable, and the deployment cost is zero.
