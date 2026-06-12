---
name: apple-coreai-models
description: "Apple's first open-source on-device AI models repo — Python export recipes, Swift runtime, and agent skills for deploying PyTorch models on Apple silicon."
url: https://github.com/apple/coreai-models
stars: 762
forks: 50
language: Python
tags: ["ai", "on-device", "apple", "pytorch", "core-ml", "agent-skills"]
featured: false
publishedAt: 2026-06-12
---

## Apple Core AI Models

### Overview

Apple open-sourced their on-device AI model toolkit on June 8, 2026, and the repo hit 760 stars in four days. That's not explosive by viral GitHub standards, but for Apple — a company historically allergic to open source beyond WebKit and Swift — it's a statement.

The repo, `apple/coreai-models`, provides model export recipes, Python primitives, and a Swift runtime package for deploying PyTorch models on Apple silicon through the new Core AI framework. It ships with agent skills for Claude Code, Codex CLI, and Gemini CLI, making it the first Apple project explicitly designed to work with AI coding agents out of the box. The codebase is roughly 50/50 Python and Swift, with a BSD 3-Clause license.

This matters because Apple has been the odd one out in the AI open-source race. Google has TensorFlow, JAX, and Gemma. Meta has PyTorch and Llama. Microsoft backs half the ecosystem through its OpenAI partnership. Apple's contribution to the open-source AI toolchain has been essentially zero — until now. The Core AI Models repo is Apple's first real attempt to make on-device AI accessible to the broader developer community, not just apps built with Xcode and Core ML.

### Why it matters

The on-device AI space is heating up fast. Apple Intelligence shipped in 2024 with on-device inference for text summarization, image generation, and Siri improvements, but developers had no official path to run their own models on Apple silicon outside of Core ML's limited converter. If you wanted to deploy a fine-tuned Llama variant or a custom diffusion model on an iPhone or Mac, you were cobbling together third-party tools — `coremltools`, `ml-explore`, or hand-optimized Metal shaders.

Core AI changes that. It's Apple's new framework for on-device AI inference, and this repo is the official bridge between the PyTorch ecosystem and Apple's hardware. The export recipes handle the conversion from Hugging Face models to Apple's `.aimodel` format. The Python primitives let you author custom models with Apple-specific optimizations baked in. And the Swift runtime provides integration utilities for macOS and iOS 27.0+ apps.

The agent skills angle is what makes this especially relevant for developers in 2026. Apple ships three pre-built skills — `working-with-coreai`, `model-authoring`, and `model-compression-exploration` — that teach coding agents how to use Core AI like an expert. This isn't just documentation; it's structured knowledge that Claude, Codex, and Gemini can use to write Core AI code for you. When a trillion-dollar company starts shipping agent skills in their open-source repos, it signals where the industry is heading.

### Key Features

**Model Export Recipes.** The `models/` directory contains a curated catalog of popular open-source models from Hugging Face with step-by-step export recipes to Apple's `.aimodel` format. Each model has its own README with specific instructions, known limitations, and performance benchmarks on Apple silicon. This eliminates the guesswork from the model conversion process — a task that previously required deep knowledge of Core ML internals.

**Python Primitives for Model Authoring.** The `python/` package provides PyTorch building blocks optimized for on-device execution on Apple platforms. This includes BC1S tensor layout support, operator compatibility checking, KV cache patterns for language models, MoE (Mixture of Experts) support, and precision rules for Apple's Neural Engine. If you're building a custom model that needs to run on-device, these primitives handle the Apple-specific complexity.

**Swift Runtime Package.** The `swift/` directory contains a Swift package (`coreai-models`) with runtime utilities for integrating exported models into macOS and iOS apps. It handles model loading, resource management, and multi-model pipelines (like diffusion models that chain multiple `.aimodel` files). This is the glue between the Python export side and the production app.

**Agent Skills for Coding Assistants.** Three pre-built skills — `working-with-coreai` (end-to-end deployment workflow), `model-authoring` (empirical rules for Apple-compatible PyTorch models), and `model-compression-exploration` (systematic quantization and palettization exploration using `coreai-opt`) — are available as plugins for Claude Code, Codex CLI, and Gemini CLI. Install them once and your AI coding assistant becomes a Core AI expert.

**CLI Tools for Model Exploration.** The repo includes command-line tools for listing supported models (`uv run coreai.model.registry --list-models`), running exported models directly on a Mac, and benchmarking inference performance. These tools require Xcode 27.0+ and macOS/iOS 27.0+ — the latest Apple platform versions that ship with Core AI support.

**BSD 3-Clause License.** Apple chose a permissive open-source license, which means you can use, modify, and distribute the code in commercial projects. This is notable because Apple's previous open-source efforts (like Swift) used Apache 2.0, and some expected them to use a more restrictive license for AI tooling.

### Use Cases

- **Mobile AI app developers** who need to deploy custom PyTorch models on iPhone or iPad with optimal performance on Apple's Neural Engine. The export recipes and Swift runtime handle the conversion and integration pipeline.
- **ML engineers prototyping on-device inference** — use the Python primitives to author models with Apple-specific optimizations from the start, rather than retrofitting Core ML compatibility after training.
- **AI agent developers** building tools that interact with Apple platforms — the agent skills provide structured knowledge for coding assistants to write Core AI code correctly.
- **Teams evaluating on-device vs. cloud inference** — the CLI tools let you benchmark model performance on specific Apple silicon chips before committing to an architecture.
- **Researchers exploring model compression** for edge deployment — the `model-compression-exploration` skill automates the search across quantization and palettization configurations.

### Pros and Cons

Pros:
- First official Apple bridge between PyTorch/Hugging Face and on-device inference, eliminating the need for third-party converters that may lag behind model architectures.
- Agent skills are a forward-thinking inclusion — they make the repo immediately useful to developers using Claude, Codex, or Gemini CLI, which is the dominant workflow in 2026.
- BSD 3-Clause license is genuinely permissive, and Apple's backing means long-term maintenance isn't dependent on a solo maintainer.

Cons:
- Requires macOS/iOS 27.0+ and Xcode 27.0+, which limits the audience to developers on the latest Apple platform betas as of June 2026.
- Not accepting code contributions at launch — Apple is treating this as a curated gallery, not a community-driven project. Issues and model requests are welcome, but PRs will be closed.
- The model catalog is limited at launch. If your model isn't in the `models/` directory, you'll need to write your own export recipe using the Python primitives — doable but not trivial.

### Getting Started

```bash
# Install uv (Python package manager)
brew install uv

# Clone the repo
git clone https://github.com/apple/coreai-models.git
cd coreai-models

# List all supported models
uv run coreai.model.registry --list-models

# Install agent skills for Claude Code
# (Run inside Claude Code session)
/plugin marketplace add git@github.com:apple/coreai-models.git
/plugin install coreai-skills@coreai-models

# Or for Codex CLI
codex plugin marketplace add https://github.com/apple/coreai-models
# Then open /plugins in Codex and install coreai-skills
```

Refer to each model's README in the `models/` directory for specific export and integration instructions.

### Alternatives

**coremltools** — Apple's existing Python package for converting trained models to Core ML format. It's more mature and supports a wider range of model architectures, but it predates Core AI and lacks the agent skills integration. Use `coremltools` if you need Core ML (not Core AI) compatibility or are targeting older Apple platform versions.

**ONNX Runtime Mobile** — Microsoft's cross-platform inference runtime that runs ONNX models on iOS and Android. Broader platform support (not just Apple) but typically slower on Apple silicon than native Core AI inference. Better choice if you need to target both iOS and Android from the same model.

**ml-explore (Meta)** — Meta's experimental project for running PyTorch models on Apple silicon via ExecuTorch. More aligned with the PyTorch ecosystem's direction, but less mature than Apple's own solution and lacking the official Swift runtime integration. Worth watching if you're heavily invested in the PyTorch/Meta toolchain.

### Verdict

This is the repo Apple needed to ship two years ago, and the fact that it exists now — with agent skills, a permissive license, and a clear export pipeline — tells you Apple is serious about developer adoption of on-device AI. The launch catalog is thin and the platform requirements are bleeding-edge, so this isn't production-ready today. But if you're building AI features for Apple platforms in 2026, this is the official path forward. The agent skills alone make it worth cloning — having Claude or Codex write Core AI export code with correct Apple-specific optimizations is a genuine productivity boost. Watch this repo closely; the model catalog will grow fast.
