---
name: privacy-filter
description: "Privacy Filter is a Go library and service for stripping PII and secrets from text before it reaches an LLM — millisecond latency, no model, no GPU, production-tested."
url: https://github.com/packyme/privacy-filter
stars: 217
forks: 26
language: Go
tags: ["privacy", "llm-security", "go", "pii-redaction", "ai-gateway"]
featured: false
publishedAt: 2026-06-12
---

## Privacy Filter

### Overview

Privacy Filter is a pure Go library that strips personally identifiable information (PII) and secrets from text before it reaches a large language model. It runs in under a millisecond on typical prompts, requires no GPU, no ML model, and compiles to a single static binary. That combination — speed, simplicity, and zero external dependencies — is what makes it worth paying attention to.

The project comes from PackyCode, an API relay service that uses Privacy Filter as its privacy-compliance layer in production. This isn't a research prototype or a weekend side project. It's the actual redaction engine behind a service handling real LLM traffic, open-sourced for the community. The author built it after discovering that existing Python-based PII detectors lost 26 gitleaks rules to RE2-incompatible regex syntax — a problem that Go's linear-time regex engine avoids entirely.

The core problem it solves: every time you send user text to an LLM API, you're potentially shipping emails, phone numbers, API keys, bank card numbers, and passwords to a third-party server. GDPR, CCPA, and similar regulations make this a compliance liability. Privacy Filter sits in front of your LLM calls and redacts sensitive data in a single pass, replacing each detected entity with a typed placeholder like `[邮箱]` (email) or `[密钥]` (secret). The redaction is irreversible by design — there's no mapping table that could leak.

### Why it matters

The AI agent ecosystem is exploding. Every startup, every enterprise team, every indie developer is wiring up LLM calls into their applications. But the security and compliance story is still immature. Most developers either skip PII handling entirely (hoping for the best) or use heavyweight ML-based NER pipelines that add seconds of latency and require GPU infrastructure.

Privacy Filter offers a third path: deterministic, rule-based redaction that's fast enough to run inline on every request. It covers the high-risk categories — email, phone, national ID, bank card (with Luhn validation), IP addresses, API keys, tokens, private keys, and passwords written in natural language — using a combination of regex patterns, the gitleaks ruleset, and Shannon entropy detection. No person or organization name recognition, and that's intentional. NER models are expensive and error-prone; the critical PII categories that cause compliance violations are structured data that regex handles well.

For fullstack developers building AI-powered features — chatbots, document processors, code assistants, agent workflows — Privacy Filter is the kind of tool you should have in your stack before you ship. It's small enough to embed as a Go package, or run as a standalone HTTP/gRPC sidecar. The compliance risk of sending raw user text to OpenAI or Anthropic without redaction is not theoretical; it's a ticking time bomb.

### Key Features

**Two-Layer Detection Architecture.** The first layer handles structured PII — email addresses, phone numbers, national ID numbers, bank cards (with Luhn checksum validation), and IP addresses — using regex patterns. The second layer catches secrets and credentials using the full gitleaks ruleset (222 rules compiled natively in Go), contextual regex for passwords in prose, and a Shannon entropy fallback for unknown high-entropy strings. The two layers emit span lists that are merged, de-overlapped, and applied in a single pass over the text.

**Three Integration Modes.** You can use Privacy Filter as a Go package imported directly into your gateway (zero HTTP overhead), as an HTTP REST service with `/redact` and `/redact/batch` endpoints, or as a gRPC service with `Redact` and `RedactBatch` methods. The HTTP and gRPC services are thin wrappers around the core `filter` package, so you pick the deployment model that fits your architecture without any feature trade-offs.

**Sub-Millisecond Latency.** On synthetic worst-case text packed with PII, Privacy Filter processes 50 bytes in ~0.01ms, 2KB in ~0.46ms, and 32KB in ~9ms. Real user prompts — where PII is sparse — are even faster. Both detection layers run in O(n) time. Go's `regexp` engine is RE2-based, which means linear-time matching with no risk of catastrophic backtracking (ReDoS). This is fast enough to run on every single LLM request without adding noticeable latency.

**Single Static Binary.** Pure Go, no CGO, no model files, no GPU requirements. Compile with `go build` and deploy anywhere — Docker, bare metal, serverless, edge functions. The only dependency is `BurntSushi/toml` for parsing the gitleaks rules file. This makes it trivial to add to existing Go services or run as a lightweight sidecar alongside Python, Node.js, or any other backend.

**Typed, Irreversible Placeholders.** Each redacted entity is replaced with a typed placeholder that indicates what was detected: `[邮箱]` for email, `[电话]` for phone, `[身份证]` for national ID, `[银行卡]` for bank card, `[IP]` for IP addresses, `[密钥]` for secrets. The placeholders are designed to be irreversible — there's no un-redaction function and no mapping table stored anywhere. This is a deliberate security decision: if the redacted text leaks, the original PII doesn't come with it.

**Batch Processing and Rich Results.** The `Redact` method returns a `Result` struct containing the redacted text, a boolean indicating whether any PII was found, the count of entities detected, and a list of `Entity` objects with type, byte offsets, and matched values. The batch endpoint processes arrays of texts in a single call, which is useful for document processing pipelines where you're redacting multiple chunks before sending them to an LLM.

**gitleaks Ruleset with Go-Native Compilation.** All 222 gitleaks rules compile natively in Go's RE2 regex engine. An earlier Python port of this approach lost 26 rules because Python's regex engine supports features (look-around assertions) that RE2 doesn't. The Go version works around this with manual post-match validation for digit boundaries in phone numbers and national IDs. The ruleset can be updated via a provided fetch script, and custom rules can be added to the TOML file.

### Use Cases

- **LLM API gateways** — Strip PII from user prompts before forwarding to OpenAI, Anthropic, or any third-party LLM API. Run Privacy Filter as middleware in your Go gateway, or deploy the HTTP service as a sidecar that your Node.js or Python backend calls before each LLM request.
- **Chatbot and conversational AI** — Users inevitably share personal information in chat interfaces. Names, emails, phone numbers, even credit card numbers show up in conversation logs. Redact them before they hit your AI pipeline or get stored in conversation history.
- **Document processing pipelines** — When building RAG (retrieval-augmented generation) systems that process user documents, redact PII from chunks before embedding or sending them to an LLM for summarization. The batch endpoint handles arrays of text efficiently.
- **Compliance-sensitive industries** — Healthcare (HIPAA), finance (PCI-DSS), and legal applications where sending raw user data to external APIs is a regulatory violation. Privacy Filter provides an auditable, deterministic redaction layer.
- **Code review and developer tools** — Redact API keys, tokens, and credentials from code snippets before sending them to AI-powered code review tools. The gitleaks ruleset specifically targets the kinds of secrets that end up in source code.

### Pros and Cons

Pros:
- Sub-millisecond latency makes it practical to run on every request without performance concerns. The 0.01ms baseline on short text means you can add PII redaction to your LLM pipeline with essentially zero overhead.
- Pure Go with no CGO, no GPU, no model files means trivial deployment. A single static binary works in Docker, on bare metal, or in any environment where Go compiles.
- The gitleaks ruleset integration catches real-world secrets (AWS keys, GitHub tokens, Stripe keys, private keys) that generic PII detectors miss. This is the difference between a toy demo and production-grade redaction.
- Three integration modes (package, HTTP, gRPC) mean it fits into any architecture without forcing you to restructure your service topology.

Cons:
- No named entity recognition — person names, company names, and addresses are not detected. The author acknowledges this is a deliberate trade-off (NER requires ML models and adds significant latency), but it means the tool doesn't cover all PII categories that regulations like GDPR define.
- The entropy-based fallback for unknown secrets can false-positive on git SHAs, long base64 strings, and other high-entropy but non-sensitive data. You'll likely need to tune the threshold or maintain an allowlist for your specific use case.
- Relatively young project (created May 2026) with a small community. The 217 stars and 26 forks suggest early adoption. Production-readiness is validated by PackyCode's usage, but the API surface may still evolve.

### Getting Started

```bash
# Clone and build
git clone https://github.com/packyme/privacy-filter.git
cd privacy-filter

# Build the HTTP server
go build -o bin/server-http ./cmd/http

# Run the HTTP service (default port 8088)
./bin/server-http

# Test with curl
curl http://127.0.0.1:8088/health
curl -X POST http://127.0.0.1:8088/redact \
  -H 'Content-Type: application/json' \
  -d '{"text":"My email is john@example.com and my API key is sk-abc123def456"}'
# {"redacted":"My email is [邮箱] and my API key is [密钥]","hit":true,"count":2,"entities":[...],"elapsed_ms":0.05}
```

To use as a Go package in your own service:

```go
import "privacyfilter/filter"

// Create once at startup — concurrency-safe
f, err := filter.New("rules/gitleaks.toml")

// Per request
res := f.Redact(userPrompt)
forwardToLLM(res.Redacted)
```

Run the tests:

```bash
go test ./...
```

### Alternatives

**Presidio (Microsoft)** — A Python-based PII detection and anonymization framework with NER support for person names, locations, and organizations. Presidio is more comprehensive in PII coverage but significantly heavier — it requires spaCy and transformer models, adding seconds of latency per request. Choose Presidio if you need named entity recognition and can afford the performance cost. Choose Privacy Filter if you need sub-millisecond redaction for high-throughput LLM pipelines.

**Guardrails AI** — A Python framework for validating and correcting LLM outputs, including PII detection as one of many guard types. Guardrails is output-focused (validating what the LLM returns) while Privacy Filter is input-focused (cleaning what you send to the LLM). They're complementary, not competing. Use Guardrails for output validation, Privacy Filter for input sanitization.

**AWS Comprehend / Azure PII Detection** — Cloud-native PII detection services that offer NER-based entity recognition. These are well-maintained and accurate, but they add network latency (API calls to cloud services), cost money per request, and send your data to yet another third party. Privacy Filter runs locally with zero network hops and zero per-request cost.

### Verdict

Privacy Filter fills a gap that most developers don't think about until it's too late: what happens to user data between your application and the LLM API. The tool is small, fast, and opinionated — it doesn't try to detect every possible PII category, but it covers the ones that actually cause compliance violations (emails, phone numbers, IDs, bank cards, secrets) with deterministic, auditable rules. At 217 stars it's early-stage, but the production usage at PackyCode and the clean Go architecture give it credibility. If you're building anything that sends user-generated text to an LLM — a chatbot, a document processor, an agent workflow — Privacy Filter should be in your stack. The question isn't whether you need PII redaction; it's whether you want to build it yourself or use something that's already been battle-tested.
