---
name: toon
description: "TOON is a compact, human-readable JSON encoding that cuts LLM token usage by ~40% while improving accuracy. A must-know data format for AI-powered apps."
url: https://github.com/toon-format/toon
stars: 24497
forks: 1090
language: TypeScript
tags: ["data-format", "llm", "serialization", "tokenization", "developer-tools"]
featured: false
publishedAt: 2026-06-08
---

## TOON (Token-Oriented Object Notation)

### Overview

TOON is a compact, human-readable encoding of the JSON data model designed specifically for LLM input. It hit 24,000 GitHub stars within eight months of its October 2025 launch, which tells you something about the pain it addresses: developers are burning money on JSON tokens in LLM prompts, and they want a fix that doesn't require rewriting their data pipelines.

The project is created by Johann Schopplich, a developer known in the TypeScript ecosystem for his work on build tools and developer experience. The project includes official implementations in TypeScript, Python, Go, Rust, .NET, and several other languages, plus a formal specification (currently at v3.3) and comprehensive benchmarks across four major LLMs.

The core idea is simple but effective: JSON is verbose and token-expensive for LLM consumption. YAML is better but still wastes tokens on redundant structure. TOON combines YAML's indentation-based nesting with CSV-style tabular arrays, declaring field names once and streaming data rows on separate lines. The result is a format that uses ~40% fewer tokens than JSON while actually improving LLM comprehension accuracy from 75.0% to 76.4% across benchmark datasets.

### Why it matters

Every fullstack developer working with AI in 2026 faces the same problem: context windows are larger, but tokens still cost money. If you're sending structured data to an LLM — user records, product catalogs, API responses, database query results — you're paying for every brace, quote, and key name in your JSON. Multiply that across millions of API calls and the cost adds up fast.

TOON addresses this at the serialization layer, which means you don't need to change your application logic. Your code works with JSON internally. You encode it as TOON only when sending to an LLM, and decode it back when you get a response. It's a translation layer, not a replacement. That pragmatic design is why adoption has been rapid — developers can adopt it incrementally without rewriting anything.

The benchmarks are what make this credible. The TOON team tested 209 data retrieval questions across Claude Haiku 4.5, Gemini 3 Flash, GPT-5 Nano, and Grok 4.1, covering uniform tabular data, nested structures, semi-uniform event logs, and deeply nested configurations. TOON consistently matches or beats JSON accuracy while using significantly fewer tokens. For the datasets where TOON's tabular format applies (uniform arrays of objects), the token savings reach 40-50% with no accuracy loss.

### Key Features

**Token Efficiency with Accuracy.** TOON achieves 76.4% accuracy versus JSON's 75.0% while using 39.9% fewer tokens in mixed-structure benchmarks. That's not a tradeoff — it's strictly better on both axes. The efficiency score (accuracy per 1K tokens) is 27.7 for TOON versus 16.4 for JSON, putting it 69% ahead. These numbers come from rigorous testing across four LLMs and eleven datasets.

**JSON Data Model Compatibility.** TOON encodes the same objects, arrays, and primitives as JSON with deterministic, lossless round-trips. Every JSON document can be converted to TOON and back without data loss. This means your existing JSON schemas, validation logic, and type definitions all work unchanged — TOON is just a different wire format.

**Tabular Array Compression.** The killer feature. When you have an array of objects with the same structure (think database query results, API response lists, CSV-like data), TOON declares the fields once in a header and streams each object as a single comma-separated line. A 100-row employee table that takes 6,331 tokens in pretty JSON takes 2,498 tokens in TOON. The field declarations and array length markers also serve as guardrails that help LLMs parse and validate the data reliably.

**Multi-Language Ecosystem.** Official packages exist for TypeScript (`@toon-format/toon`), Python, Go, Rust, .NET, and more. The TypeScript package includes streaming APIs (`encodeLines`, `decodeFromLines`, `decodeStream`) for memory-efficient processing of large datasets. There's also a CLI tool that works with `npx` — no installation required.

**Formal Specification.** TOON isn't just a library — it has a versioned spec (v3.3) that defines the format rigorously. This matters for interoperability: any language can implement TOON by following the spec, and the benchmarks are reproducible. The spec covers encoding rules, edge cases, IANA media type registration (`text/toon`), and file extension conventions (`.toon`).

**Replacer and Transform Support.** The encode API accepts a `replacer` function similar to `JSON.stringify`'s replacer but with path tracking. This lets you strip sensitive fields, transform values, or filter data before encoding — useful for preparing LLM prompts where you want to include some fields but not others.

**Editor and Tooling Support.** Beyond the core library, there are playgrounds for testing TOON encoding, editor extensions for syntax highlighting, and integration examples with popular LLM frameworks. The documentation site at toonformat.dev includes a full API reference and interactive examples.

### Use Cases

- **LLM prompt optimization** — Any application sending structured data to an API (OpenAI, Anthropic, Google) can reduce costs by encoding request payloads as TOON. Particularly effective for batch processing, RAG pipelines, and agent tool calls that pass structured results.

- **AI agent tool outputs** — When building agents that call external APIs and pass results to an LLM for reasoning, TOON compresses the tool output without losing structure. The explicit array lengths and field headers help models understand the data shape.

- **Data pipeline serialization** — Systems that serialize data for LLM consumption (document loaders, database query result formatters, analytics dashboards) can swap JSON encoding for TOON with minimal code changes.

- **Structured output parsing** — When you ask an LLM to return structured data, having it respond in TOON format can reduce output tokens and improve parsing reliability due to the explicit schema markers.

- **Cost-sensitive applications** — Startups and indie developers running LLM-powered features at scale where every cent of API costs matters. TOON's 40% token reduction translates directly to 40% cost reduction on data-heavy prompts.

### Pros and Cons

Pros:
- Measurable, reproducible token savings with benchmark data across four major LLMs. The 40% reduction isn't marketing — it's backed by 209 test questions on real datasets.
- Lossless round-trip with JSON means zero migration risk. Encode as TOON for LLM input, decode back to JSON for application logic.
- The formal specification and multi-language implementations make this a real standard, not a one-person library that disappears in six months.
- The tabular array format is genuinely clever — it's the kind of obvious-in-retrospect optimization that makes you wonder why nobody did this sooner.

Cons:
- TOON's benefits diminish for deeply nested or non-uniform data. If your data is mostly complex configuration objects with many nested levels, JSON-compact may be equally efficient or better.
- Adoption is still early. Most LLM frameworks and SDKs don't have native TOON support yet, so you'll need to handle encoding/decoding yourself.
- Some edge cases in the benchmarks show mixed results — for example, TOON scored 0% on the "array truncated" test where 3 rows were removed from the end, suggesting the format's length declarations can confuse models when data is incomplete.
- The ecosystem is young. While the spec is at v3.3, breaking changes are still possible, and the community tooling (formatters, linters, IDE extensions) is sparse compared to JSON or YAML.

### Getting Started

```bash
# Try it instantly with npx (no installation)
npx @toon-format/cli input.json -o output.toon

# Pipe from stdin
echo '{"name": "Ada", "role": "dev"}' | npx @toon-format/cli

# Install the TypeScript library
npm install @toon-format/toon

# Or with pnpm
pnpm add @toon-format/toon
```

Basic usage in TypeScript:

```ts
import { encode, decode } from '@toon-format/toon'

const data = {
  users: [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 2, name: 'Bob', role: 'user' }
  ]
}

// Encode to TOON
const toon = encode(data)
console.log(toon)
// users[2]{id,name,role}:
//   1,Alice,admin
//   2,Bob,user

// Decode back to JSON
const json = decode(toon)
```

Streaming for large datasets:

```ts
import { encodeLines } from '@toon-format/toon'

const largeData = await fetchThousandsOfRecords()
for (const line of encodeLines(largeData)) {
  process.stdout.write(`${line}\n`)
}
```

### Alternatives

**JSON** — The universal standard. JSON is supported everywhere, has decades of tooling, and works fine for LLM input when your data is small or deeply nested. Choose JSON when token cost isn't a concern, when your data has complex nested structures with low tabular eligibility, or when you need maximum ecosystem compatibility.

**YAML** — More token-efficient than JSON for nested data due to indentation-based syntax and lack of braces/brackets. YAML is a reasonable middle ground if you want some token savings without adopting a new format. Choose YAML when you need human readability and moderate token efficiency, but don't need the tabular compression that TOON provides.

**CSV** — The most token-efficient format for flat tabular data. If your data is purely tabular (no nesting, no mixed types), CSV beats TOON by about 5-10% in token count. Choose CSV when your data is strictly flat and you don't need the structural metadata (array lengths, field headers) that TOON provides for LLM parsing reliability.

### Verdict

TOON is the most practical token optimization I've seen for LLM applications. It's not trying to replace JSON — it's trying to make JSON cheaper to send to language models, and it succeeds with hard numbers. The 40% token reduction with 76.4% accuracy (versus JSON's 75.0%) isn't a marginal improvement; it's the kind of result that makes you re-evaluate how you're structuring every LLM request in your application.

The project has real momentum: 24K stars, a formal spec at v3.3, implementations in six major languages, and benchmarks that hold up across Claude, Gemini, GPT, and Grok. Johann Schopplich has built this methodically — spec first, then reference implementation, then multi-language SDKs, then benchmarks. That's how standards should be built.

If you're a fullstack developer building AI-powered features in 2026 and you're sending structured data to LLM APIs, you should be using TOON. The adoption cost is near zero (it's a drop-in encoding layer), the savings are immediate and measurable, and the format is stable enough for production use. Start with the CLI to test your own data, then integrate the library where it makes the biggest impact on your token budget.
