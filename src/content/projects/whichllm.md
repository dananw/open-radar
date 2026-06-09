---
name: whichllm
description: "Find the best local LLM for your hardware with real benchmark rankings. Auto-detect GPU, CPU, and RAM to get evidence-based model recommendations from HuggingFace."
url: https://github.com/Andyyyy64/whichllm
stars: 3963
forks: 221
language: Python
tags: ["llm", "cli", "local-ai", "developer-tools", "benchmarks", "huggingface"]
featured: false
publishedAt: 2026-06-10
---

## whichllm

### Overview

whichllm is a Python CLI tool that answers a deceptively simple question: what's the best local LLM I can run on my machine? It auto-detects your GPU, CPU, and available RAM, then pulls live data from HuggingFace to rank models that actually fit your hardware — ranked by real benchmark scores, not parameter count. The project hit nearly 4,000 GitHub stars within its first few months, driven by a gap most developers hit when they start experimenting with local models: there are thousands of quantized checkpoints on HuggingFace, and picking the right one is a guessing game.

The tool was built by Andyyyy64 and has grown fast because it solves a real pain point. Before whichllm, the typical workflow was: search Reddit threads, check random leaderboards, download a 4GB GGUF file, realize it runs at 2 tokens per second, repeat. whichllm collapses that into a single command. It benchmarks across LiveBench, Artificial Analysis, Aider, Chatbot Arena ELO, and the Open LLM Leaderboard — then merges those scores with recency weighting so a 2024 model can't outrank a current-generation one on stale data.

What makes it stand out from other "what fits in my VRAM" tools is the ranking methodology. Fitting a model into VRAM is trivial — you just check the file size. The hard part is knowing which of the models that fit is actually the best. whichllm uses evidence-graded scoring with confidence tags (direct, variant, base, interpolated, self-reported) and actively rejects fabricated uploader claims or cross-family score inheritance. Every recommendation prints the benchmark snapshot date, so a stale ranking is self-evident instead of silently trusted.

### Why it matters

The local LLM ecosystem has exploded in 2025-2026. HuggingFace hosts hundreds of thousands of model checkpoints, with new quantized variants dropping daily. For fullstack developers building AI-powered features — whether that's a chatbot in a React app, an AI agent backend in NestJS, or a Django service with local inference — choosing the right model is now a real engineering decision with performance and cost implications. whichllm turns that decision from a 30-minute research session into a 5-second command.

This matters even more as on-device and edge AI becomes practical. Apple Silicon unified memory, NVIDIA's consumer GPUs with 24GB VRAM, and AMD's ROCm improvements mean running a 27B-parameter model locally is no longer a fantasy. But the model landscape moves fast. Qwen3.6-27B might be the best pick today; next month it could be something else entirely. whichllm's live HuggingFace integration means it always reflects the current state of the art, not a static snapshot someone published in a blog post three months ago.

### Key Features

**Hardware Auto-Detection.** whichllm scans your system for NVIDIA GPUs (via nvidia-smi), AMD GPUs, Apple Silicon unified memory, and CPU-only configurations. It calculates available VRAM accounting for OS overhead and existing processes, so the recommendations are based on what you can actually use, not the marketing spec sheet.

**Evidence-Based Ranking.** Rather than simply suggesting the biggest model that fits, whichllm merges scores from multiple real benchmarks — LiveBench, Artificial Analysis, Aider coding benchmarks, Chatbot Arena ELO, and the Open LLM Leaderboard. Each score is tagged with a confidence level and discounted accordingly. Self-reported scores from model uploaders are flagged and deprioritized.

**Recency-Aware Scoring.** Benchmark scores are weighted by age along each model's lineage. A model evaluated six months ago gets penalized against a current-generation equivalent. The benchmark snapshot date is printed under every ranking, making staleness visible rather than hidden.

**GPU Simulation.** Before you buy hardware, simulate it. Run `whichllm --gpu "RTX 5090"` to see what models you'd get on a card you don't own yet. The `upgrade` command lets you compare two or three GPUs side by side — useful for making purchasing decisions backed by actual model performance data, not just TFLOPS numbers.

**One-Command Chat.** `whichllm run "qwen 2.5 1.5b gguf"` downloads the model and starts an interactive chat session. No separate Ollama setup, no manual GGUF downloads, no config files. It handles the download, quantization selection, and launches the inference backend automatically.

**Code Snippet Generation.** `whichllm snippet "qwen 7b"` prints copy-paste Python code using llama-cpp-python or the appropriate library for that model. Great for developers who want to embed local inference into their existing Python backend without figuring out the library API from scratch.

**JSON Output for Pipelines.** Add `--json` to any command and get structured output that pipes into jq, scripts, or CI pipelines. Useful for teams that want to standardize on a model recommendation as part of their development environment setup.

### Use Cases

- **AI-powered web apps** — You're building a React frontend with a local LLM backend and need to pick the best model for your development machine's 24GB GPU. Run `whichllm` and get a ranked list in seconds.
- **Hardware purchasing decisions** — Your team is debating between an RTX 4090 and an RTX 5090 for the office dev server. Use `whichllm upgrade "RTX 4090" "RTX 5090"` to see which models each card unlocks and at what speed.
- **CI/CD model pinning** — Use `--json` output in your build pipeline to verify the team is using the optimal model for the shared GPU instance, catching suboptimal configurations before they hit production.
- **Prototyping AI features** — You're adding a summarization feature to a Django app and need a fast, small model for development. `whichllm --top 5` gives you the five best options ranked by quality, not just size.
- **Teaching and workshops** — Running a local AI workshop where participants have different hardware. Everyone runs `whichllm` and gets personalized recommendations instead of following a one-size-fits-all tutorial.

### Pros and Cons

Pros:
- Solves a real problem that every developer hitting the local LLM space encounters. The "which model do I actually download" question has no good answer without a tool like this.
- Live HuggingFace integration means recommendations stay current without manual updates. The curated frozen fallbacks handle offline and rate-limited scenarios gracefully.
- The benchmark methodology is genuinely thoughtful — evidence grading, recency weighting, and cross-family inheritance rejection are features you won't find in simpler VRAM calculators.

Cons:
- Python-only ecosystem. If you're running a Node.js or Go backend, the snippet generation targets Python libraries (llama-cpp-python), which means extra integration work for non-Python stacks.
- Benchmark coverage has gaps. If you need a model for a niche task (code generation in a specific language, domain-specific fine-tunes), the general benchmarks may not reflect your actual use case.
- Speed estimates are bandwidth-bound approximations, not real-world measurements. Actual performance on your specific system may vary based on background processes, thermal throttling, and driver versions.

### Getting Started

```bash
# Install via uv (recommended — no global install needed)
uvx whichllm@latest

# Or install globally
pip install whichllm

# Or via Homebrew on macOS
brew install andyyyy64/whichllm/whichllm

# Get recommendations for your current hardware
whichllm

# Simulate a specific GPU
whichllm --gpu "RTX 4090"

# Compare two GPUs
whichllm upgrade "RTX 4090" "RTX 5090"

# Find what GPU you need for a specific model
whichllm plan "llama 3 70b"

# Start chatting with a model
whichllm run "qwen 2.5 1.5b gguf"

# Get copy-paste Python code
whichllm snippet "qwen 7b"

# JSON output for scripts
whichllm --top 3 --json
```

### Alternatives

**Ollama** — The most popular local LLM runner. Ollama focuses on the inference and serving layer — it runs models well but doesn't help you choose which one to run. You still need to know what model to `ollama pull`. whichllm complements Ollama by telling you which model to pick before you run it. Use Ollama when you already know what you want; use whichllm when you don't.

**LM Studio** — A GUI application for running local LLMs with a built-in model browser. It's polished and beginner-friendly, but it's a desktop app, not a CLI tool. For developers who live in the terminal and want to script model selection, whichllm fits better. LM Studio is the right choice for non-technical users or anyone who prefers a visual interface.

**HuggingFace Model Hub directly** — You can browse models on HuggingFace and sort by downloads or likes, but that gives you popularity rankings, not hardware-specific recommendations. A model with 100K downloads might be terrible on your 8GB GPU. whichllm adds the hardware constraint and benchmark-based quality scoring that HuggingFace's UI doesn't provide.

### Verdict

whichllm is one of those tools that fills a gap you didn't realize was so wide until you use it. The local LLM space has matured to the point where "just try something and see" is no longer a viable strategy — there are too many models, too many quantization levels, and too many hardware configurations. For fullstack developers integrating local AI into their applications, this tool eliminates the guesswork from model selection with a methodology that's more rigorous than anything else I've seen in the CLI space. At nearly 4,000 stars and growing, the community clearly agrees. If you're running any kind of local inference — whether for prototyping, development, or production edge deployment — whichllm should be the first command you run.
