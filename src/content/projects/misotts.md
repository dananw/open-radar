---
name: misotts
description: "Miso TTS 8B is an open-source 8-billion parameter text-to-speech model with voice cloning and conversational speech generation, rivaling commercial TTS APIs."
url: https://github.com/MisoLabsAI/MisoTTS
stars: 2802
forks: 263
language: Python
tags: ["ai", "tts", "voice-cloning", "speech-synthesis", "open-source"]
featured: false
publishedAt: 2026-06-14
---

## Miso TTS 8B

### Overview

Miso TTS 8B is an open-source text-to-speech model with 8.2 billion parameters that generates conversational speech with a level of expressiveness that used to require commercial APIs. It hit 2,800 GitHub stars within three weeks of its late May 2026 release, which tracks with the broader trend of developers demanding self-hostable alternatives to closed speech synthesis services.

The project comes from Miso Labs, a relatively new AI research company that's betting on open-weight models for production speech applications. Their architecture draws direct inspiration from Sesame's CSM (Conversational Speech Model), but scales it up significantly — the backbone is a Llama 3.2-style 8B transformer paired with a 300M autoregressive audio decoder. That dual-transformer design is what lets Miso TTS handle multi-turn conversational context, not just isolated sentence synthesis.

The model generates Mimi audio codes from text and optional audio context, using 32 codebooks at a 2,051-token audio vocabulary. What this means in practice: you can feed it a conversation history with multiple speakers, and it'll produce speech that carries the right tone, pacing, and emotional register for each turn. The 110ms time-to-first-byte on H100 hardware puts it in the same latency bracket as ElevenLabs and OpenAI's TTS, but without the per-character pricing or data privacy concerns.

### Why it matters

The TTS space has been dominated by closed APIs for years. ElevenLabs, OpenAI, Google Cloud TTS, and Amazon Polly all charge per character or per request, and none of them let you run inference on your own hardware. For developers building voice agents, audiobook generators, accessibility tools, or interactive fiction, that creates a hard dependency on third-party uptime, pricing, and content policies.

Miso TTS breaks that dependency. The model weights are on Hugging Face under a permissive license. You download them once, run inference on your own GPU, and never send text to someone else's server. For a fullstack developer building a NestJS backend with a voice feature, that's a meaningful architectural option — you can colocate TTS inference with your application server instead of adding an external API call to your request path.

The timing connects to the voice AI explosion of 2025-2026. Every major AI lab is shipping voice interfaces — ChatGPT's Advanced Voice Mode, Google's Gemini Live, Anthropic's Claude voice. But the open-source side has lagged behind. Miso TTS is one of the first open models that actually sounds natural enough for production use, not just demos. The voice cloning capability, where you feed a short audio prompt and the model matches that voice for new content, is the feature that makes this practical for real applications.

### Key Features

**8.2B Parameter Dual-Transformer Architecture.** The backbone is a Llama 3.2-style 8B transformer that processes interleaved text and audio tokens. A smaller 300M decoder transformer handles the higher-order audio codebooks autoregressively. This separation lets the backbone focus on linguistic content and prosody while the decoder handles the fine-grained acoustic details. The result is speech that sounds natural across different sentence structures and emotional registers.

**Voice Cloning from Audio Prompts.** Feed the model a short audio clip with its transcript, and it'll generate new speech in that same voice. The `Segment` class lets you build a context array of speaker turns — the model conditions on all of them when generating the next utterance. This works for creating consistent character voices in games, matching a specific narrator for audiobooks, or building personalized voice assistants.

**Multi-Speaker Conversational Context.** Unlike simpler TTS models that synthesize one sentence at a time, Miso TTS handles multi-turn conversations with multiple speakers. You pass speaker IDs alongside text and audio segments, and the model maintains appropriate voice differentiation and conversational flow. This is what makes it viable for dialogue-heavy applications like interactive fiction or AI companion apps.

**Mimi Audio Codec with 32 Codebooks.** The model uses the Mimi audio tokenizer, which encodes audio into discrete tokens across 32 codebooks at a 2,051-token vocabulary per codebook. This Residual Vector Quantization approach captures both the broad acoustic structure and fine details of speech. The 32-codebook design gives the decoder enough capacity to reproduce natural prosody, breath sounds, and micro-variations that make speech sound human.

**SilentCipher Watermarking.** Every generated audio file is watermarked by default using Sony's SilentCipher model. This is a responsible design choice — it makes AI-generated speech detectable without degrading audio quality. If you're deploying Miso TTS in a production application, you can use your own private watermark key so only you can verify the provenance of generated audio.

**Hugging Face Integration with Auto-Download.** The model weights live on Hugging Face at `MisoLabs/MisoTTS`. First run automatically downloads everything — the model checkpoint, the Mimi codec, the SilentCipher watermarker, and the Llama 3.2 tokenizer — into the Hugging Face cache. Subsequent runs reuse the cached copy. No manual model management, no separate download scripts.

**bfloat16 Inference on Consumer GPUs.** The model fits comfortably on a 24GB VRAM GPU (RTX 3090/4090, A5000, L4) in bfloat16 precision. That's not cheap hardware, but it's accessible to individual developers and small teams. The 16GB of weight in bf16 plus headroom for KV cache and activations stays within the 24GB budget. CPU inference works too, but expect significantly slower generation.

### Use Cases

- **Voice agents and AI assistants** — Build a conversational AI with natural-sounding speech output. The multi-speaker context handling means you can create agents that respond with appropriate tone and emotion, not just monotone narration.
- **Audiobook and podcast generation** — Convert text content to spoken audio with consistent narrator voices. The voice cloning feature lets you maintain a specific voice across long-form content without recording sessions.
- **Accessibility tools** — Add high-quality speech synthesis to web applications for visually impaired users. Self-hosting means no per-character costs and no data leaving your infrastructure.
- **Game dialogue and interactive fiction** — Generate dynamic NPC dialogue with distinct character voices. Feed voice prompts for each character and let the model generate new lines on the fly.
- **Video and content localization** — Generate dubbed audio for video content in natural-sounding voices. Pair with a translation pipeline for multilingual content production (though Miso TTS currently supports English only).

### Pros and Cons

Pros:
- Open weights on Hugging Face with no per-character pricing — run unlimited inference on your own hardware for a one-time GPU cost.
- Voice cloning works with short audio prompts, making it practical for personalized applications without extensive voice training.
- The 8B parameter size hits a sweet spot between quality and hardware requirements — a single 24GB GPU is enough for real-time inference.
- SilentCipher watermarking is a thoughtful safety measure that doesn't degrade audio quality.

Cons:
- English only. The model doesn't support other languages, which limits its usefulness for international applications. No timeline for multilingual support has been announced.
- Hardware requirements are steep for individual developers. A 24GB GPU (RTX 4090 costs ~$1,600) is the practical minimum for interactive use. CPU inference is possible but too slow for real-time applications.
- The 30-40GB initial download (model + codec + watermarker + tokenizer) is heavy, and the README's latency numbers (110ms TTFB) apply only to H100-class hardware, not consumer GPUs.
- No built-in REST API or server mode. You need to wrap the Python inference code in your own API layer if you want to serve it as a microservice.

### Getting Started

```bash
# Install uv if you don't have it
curl -LsSf https://astral.sh/uv/install.sh | sh

# Clone and set up the environment
git clone https://github.com/MisoLabsAI/MisoTTS.git
cd MisoTTS
uv sync --python 3.10
source .venv/bin/activate

# Run the example conversation (downloads ~30-40GB on first run)
uv run python run_misotts.py
```

For programmatic use in your own project:

```python
import torch
import torchaudio
from generator import load_miso_8b

device = "cuda" if torch.cuda.is_available() else "cpu"
generator = load_miso_8b(
    device=device,
    model_path_or_repo_id="MisoLabs/MisoTTS",
)

audio = generator.generate(
    text="Hello from Miso.",
    speaker=0,
    context=[],
    max_audio_length_ms=10_000,
)

torchaudio.save("miso.wav", audio.unsqueeze(0).cpu(), generator.sample_rate)
```

With voice cloning from a prompt audio:

```python
from generator import Segment, load_miso_8b

generator = load_miso_8b(device="cuda")
prompt_audio, sr = torchaudio.load("prompt.wav")
prompt_audio = torchaudio.functional.resample(
    prompt_audio.squeeze(0), orig_freq=sr, new_freq=generator.sample_rate
)

context = [Segment(speaker=0, text="Transcript of the prompt.", audio=prompt_audio)]
audio = generator.generate(
    text="New sentence in the same voice.",
    speaker=0,
    context=context,
    max_audio_length_ms=10_000,
)
```

### Alternatives

**ElevenLabs** — The leading commercial TTS API with excellent voice quality and a generous free tier. ElevenLabs supports 29 languages and has a mature voice cloning workflow, but charges $0.30 per 1,000 characters on the starter plan. Choose ElevenLabs when you need multilingual support, don't want to manage GPU infrastructure, or need voice cloning that works with minimal audio input.

**OpenAI TTS** — Available through the OpenAI API at $15 per 1M characters for the `tts-1` model. Good quality with six built-in voices, but no voice cloning and no self-hosting option. Choose OpenAI TTS when you're already in the OpenAI ecosystem and want a simple, reliable API without GPU management.

**Coqui XTTS** — Another open-source TTS model with voice cloning and multilingual support (17 languages). XTTS is smaller and runs on less powerful hardware, but the voice quality doesn't match Miso TTS for conversational speech. Choose XTTS when you need multilingual support on consumer hardware and can accept slightly lower quality.

### Verdict

Miso TTS 8B is the most capable open-source TTS model available right now for conversational speech. The 8B parameter size and Llama 3.2 backbone give it a quality advantage over smaller open models like XTTS, while the open weights mean you're not locked into ElevenLabs or OpenAI's pricing. The hardware requirements are real — you need a 24GB GPU for practical use — but for teams already running inference infrastructure, this is a no-brainer addition to your stack. If you're building voice features into a web application and care about data privacy, cost control, or customization, Miso TTS deserves a serious evaluation. The 2,800 stars in three weeks suggest the developer community agrees.
