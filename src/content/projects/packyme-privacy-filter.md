---
name: privacy-filter
description: "Privacy Filter is a Go-based LLM privacy gateway that redacts PII and secrets from prompts in under a millisecond — essential for production AI applications."
url: https://github.com/packyme/privacy-filter
stars: 222
forks: 28
language: Go
tags: ["privacy", "llm-security", "golang", "ai-gateway", "pii-redaction"]
featured: false
publishedAt: 2026-06-12
---

## Privacy Filter

### Overview

Privacy Filter is a pure Go library and service that strips sensitive data — emails, phone numbers, national IDs, bank cards, API keys, tokens, and high-entropy strings — from text before it reaches an LLM. No model, no GPU, no CGO dependency. Just a single static binary that processes text in linear time with sub-millisecond latency on typical prompts.

The project comes from PackyCode, where it runs in production as the privacy-compliance layer of an API relay service. That's the kind of origin story you want for a security tool — it was built to solve a real problem at scale, not as an academic exercise. The author clearly dealt with the "we're sending user data to third-party LLM APIs and we need to stop leaking PII" problem and shipped the most pragmatic solution possible.

The architecture is dead simple. Two detection layers: one for structured PII (regex-based, covering email, phone, national ID, bank card with Luhn validation, and IP addresses) and one for secrets (gitleaks ruleset with keyword pre-filtering, contextual regex, and Shannon entropy fallback). Each layer emits character spans, spans are merged and de-overlapped, and the text is rebuilt in a single pass. Placeholders are typed and irreversible — you can't un-redact, which is exactly what you want for compliance.

### Why it matters

Every team building AI-powered features faces the same problem: your users type sensitive information into chat interfaces, and that text gets forwarded to OpenAI, Anthropic, Google, or whoever's API you're using. GDPR, CCPA, and China's PIPL all have opinions about that. You can't just shrug and hope for the best.

The existing options are either heavyweight (running an NER model that adds seconds of latency per request) or naive (simple regex that misses half the cases). Privacy Filter threads the needle — it covers the high-risk structured data that actually appears in developer and user prompts without the cost of ML inference. The README is honest about the tradeoff: no person/place/organization name recognition, because that needs an NER model and was explicitly out of scope. What it does cover — emails, phone numbers, national IDs, bank cards, API keys, private keys, passwords in prose, and unknown high-entropy strings — handles the vast majority of real-world PII exposure.

For fullstack developers building AI features in React frontends talking to NestJS or Go backends that proxy to LLM APIs, this is the kind of tool you reach for when you realize your "just forward the prompt" architecture has a compliance problem. The fact that it's a Go library you can import directly into your gateway (no HTTP hop, no timeout concerns) makes it especially attractive for performance-sensitive services.

### Key Features

**Dual-Layer Detection.** The first layer handles structured PII with regex patterns — email addresses, phone numbers (with international format support), national ID numbers, bank card numbers validated against the Luhn algorithm, and IP addresses. The second layer targets secrets and credentials using the gitleaks ruleset (222 rules compiled natively in Go), contextual regex for passwords written in prose, and a Shannon entropy fallback that catches unknown high-entropy strings like API tokens. Both layers operate in O(n) time.

**Three Integration Modes.** You can use Privacy Filter as a Go package imported directly into your API gateway (zero HTTP overhead, one function call), as a standalone HTTP service with REST endpoints (`/redact` and `/redact/batch`), or as a gRPC service for polyglot architectures. The HTTP and gRPC services are thin wrappers around the core `filter` package, so the detection logic is identical regardless of how you deploy it.

**Millisecond Latency.** The benchmarks in the README show 0.01ms for ~50 bytes of text and 0.46ms for ~2KB — worst case, synthetic high-density PII. Real user prompts with normal PII density are faster. For a 32KB text (far longer than any reasonable LLM prompt), latency is around 9ms. This is fast enough to sit inline in your request path without impacting user experience.

**Single Static Binary.** Pure Go, no CGO, no model files, no GPU requirements. Cross-compile for any platform. The only external dependency is BurntSushi/toml for the gitleaks ruleset configuration. Deploy it as a sidecar, a Lambda function, a Docker container, or embed it directly in your existing Go service.

**Luhn-Validated Bank Card Detection.** Most PII redaction tools regex-match credit card-looking number sequences and call it done. Privacy Filter validates candidate sequences against the Luhn algorithm before redacting, which dramatically reduces false positives. If you've ever had a PII scanner flag random 16-digit numbers in your logs, you appreciate this.

**Batch Processing Support.** The HTTP service exposes a `/redact/batch` endpoint that accepts an array of text strings and returns redacted results in a single request. This is useful for pipelines that process multiple prompts or documents at once — batch embedding generation, document ingestion, or log scrubbing.

**Irreversible Redaction with Typed Placeholders.** Redacted values are replaced with typed placeholders like `[邮箱]` (email), `[电话]` (phone), `[密钥]` (secret), and so on. The original values are discarded — there's no mapping table, no decryption key, no way to reverse the process. This is a deliberate design choice for compliance: if the redacted text is what reaches the LLM, there's zero risk of the original PII being reconstructed.

### Use Cases

- **LLM API proxy services** — Teams running API relay services (like PackyCode itself) that need to strip PII from prompts before forwarding them to third-party LLM providers. The zero-latency library import is ideal for this.
- **Internal AI chatbots** — Companies deploying ChatGPT-like interfaces for employees where users might paste code containing API keys, database credentials, or customer data into the prompt.
- **Document processing pipelines** — Batch ingestion of documents (support tickets, emails, contracts) that need PII stripped before being sent to an LLM for summarization or classification.
- **Compliance-heavy industries** — Healthcare (HIPAA), finance (PCI-DSS), and legal teams that want to use LLMs but can't send raw customer data to external APIs.
- **Developer tools and code assistants** — IDE plugins or CLI tools that send code context to LLMs and need to catch accidentally committed secrets, environment variables, or hardcoded credentials.

### Pros and Cons

Pros:
- Sub-millisecond latency on real-world prompts means you can add it to your request path without measurable overhead. The O(n) algorithmic complexity guarantees linear scaling with text length.
- The gitleaks integration catches 222 distinct secret patterns, which is far more coverage than hand-rolled regex. The keyword pre-filtering means most text never hits the expensive rule matching.
- Three integration modes (library, HTTP, gRPC) cover every deployment scenario. Importing the package directly into your Go gateway is zero-overhead — no network hop, no timeout configuration, no fail-open/closed concerns.

Cons:
- No named entity recognition means person names, company names, and addresses pass through untouched. The README is upfront about this — NER models add seconds of latency and were out of scope — but it's still a gap for some compliance requirements.
- The entropy fallback can produce false positives on legitimate high-entropy strings like git SHAs, base64-encoded data, or UUIDs. You'll need to tune the threshold or maintain an allowlist for your specific use case.
- Relatively young project (created May 29, 2026) with a small contributor base. Production-readiness is proven at PackyCode, but the community ecosystem and long-term maintenance story are still forming.

### Getting Started

```bash
# Clone the repository
git clone https://github.com/packyme/privacy-filter.git
cd privacy-filter

# Run tests
go test ./...

# Build the HTTP server
go build -o bin/server-http ./cmd/http

# Build the gRPC server
go build -o bin/server-grpc ./cmd/grpc

# Start the HTTP server (default port 8088)
./bin/server-http
```

Test it with a curl request:

```bash
curl -X POST http://127.0.0.1:8088/redact \
  -H 'Content-Type: application/json' \
  -d '{"text":"My email is john@example.com and my API key is sk-abc123xyz789"}'
# {"redacted":"My email is [邮箱] and my API key is [密钥]","hit":true,"count":2,"entities":[...]}
```

For direct library usage in your Go gateway:

```go
import "privacyfilter/filter"

// Create once at startup — concurrency-safe
f, err := filter.New("rules/gitleaks.toml")

// Per request
res := f.Redact(userPrompt)
forwardToLLM(res.Redacted)
```

### Alternatives

**Presidio (Microsoft)** — A Python-based PII detection and anonymization framework that uses NER models and regex. Presidio offers more entity types (person names, locations, organizations) and supports multiple languages, but it's significantly heavier — you need Python, spaCy models, and the latency is measured in seconds, not milliseconds. Choose Presidio when you need named entity recognition and can afford the inference cost.

**Guardrails AI** — A Python framework for validating LLM inputs and outputs, including PII detection via its NeMo Guardrails integration. Guardrails is broader in scope (it handles output validation, content moderation, and custom rails) but heavier and Python-only. Choose Guardrails when you need a comprehensive LLM safety framework, not just input redaction.

**Lakera Guard** — A commercial API-based LLM security service that covers PII, prompt injection, and content moderation. Lakera is a SaaS product with per-request pricing, which is convenient but introduces external dependency and cost at scale. Choose Lakera when you want a managed service and don't want to run your own infrastructure.

### Verdict

Privacy Filter is the kind of tool that should exist in every team's stack that's sending user data to LLM APIs. It's not trying to be everything — no NER, no output validation, no prompt injection detection — it just redacts PII and secrets from input text, and it does that extremely fast. The Go-native architecture with three integration modes makes it easy to adopt regardless of your backend stack. If you're a Go shop building AI features, import the library. If you're running Python or Node.js backends, deploy the HTTP or gRPC service as a sidecar. At 222 stars two weeks after launch, it's early but the production pedigree at PackyCode and the clean, honest engineering (no feature inflation, clear scope, real benchmarks) make it worth betting on.
