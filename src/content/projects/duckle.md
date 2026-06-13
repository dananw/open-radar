---
name: duckle
description: "Duckle is a local-first ETL/ELT studio with a visual pipeline designer, 290+ connectors, and a built-in AI assistant — all running on DuckDB in a 65 MB desktop app."
url: https://github.com/SouravRoy-ETL/duckle
stars: 432
forks: 28
language: Rust
tags: ["etl", "data-pipeline", "duckdb", "rust", "tauri", "local-first"]
featured: false
publishedAt: 2026-06-13
---

## Duckle

### Overview

Duckle is an open-source, local-first ETL/ELT studio that compiles visual data pipelines to SQL and runs them through DuckDB. It hit 400 GitHub stars within three weeks of its late-May 2026 launch, which is notable for a data engineering tool without a VC marketing budget or a YC pedigree.

The project is built by Sourav Roy and ships as a single-file desktop application (~65 MB) powered by Rust, Tauri v2, React 19, and TypeScript. The stack choice is deliberate: Tauri gives you a native shell without the Electron bloat, Rust handles the heavy lifting (connectors, WASM UDFs, the MCP server), and React renders the visual canvas. DuckDB is the execution engine — vectorized, columnar, and fast enough that a 5-million-row join finishes in seconds on a laptop.

The core pitch: data pipeline tools have been split between heavy enterprise platforms (Informatica, Talend, Matillion) that require servers and cloud accounts, and lightweight CLI tools that are fast but give you no visual feedback. Duckle sits in the middle. You get a drag-and-drop canvas with live SQL previews on every node, 290+ connectors that work today (not "coming soon"), and an AI assistant that runs entirely on your CPU. No cloud dependency, no API keys required for the core product, no telemetry.

### Why it matters

The data engineering tooling space has been quietly consolidating around two poles: cloud-native platforms that lock you into someone else's infrastructure, and open-source CLI frameworks (dbt, dlt, Airflow) that assume you're comfortable writing YAML and Python. Duckle takes a different bet — that visual pipeline design doesn't have to mean opaque, and local-first doesn't have to mean limited.

What makes this interesting for fullstack developers specifically is the connector breadth. Need to pull data from Stripe, transform it, and push it into pgvector for RAG indexing? That's three nodes on a canvas, no code. Need to join a Postgres table with a Parquet file from S3 and write the result to Snowflake? Drag, wire, run. The 290+ connectors include SaaS REST APIs (Salesforce, HubSpot, Shopify, Notion, Airtable), streaming brokers (Kafka, NATS, RabbitMQ), vector databases (pgvector, Qdrant, Weaviate, Milvus), and traditional databases — all without installing a single driver.

The AI angle is also worth noting. Duckle's built-in assistant (Duckie) runs Qwen 2.5 Coder 1.5B through llama.cpp, entirely offline. You describe a pipeline in English, it generates the JSON definition, and you drop it onto the canvas. The MCP server integration means Claude, ChatGPT, and other AI tools can also interact with your pipelines programmatically. For developers building RAG systems or cleaning data for AI models, Duckle has dedicated transforms for chunking, embedding, PII redaction, semantic deduplication, and vector similarity search — all composable visually.

### Key Features

**290+ Connectors at Install Time.** Duckle ships with connectors for files (CSV, Parquet, JSON, Excel, Avro, XML), databases (Postgres, MySQL, SQLite, MongoDB, Cassandra, Elasticsearch, Redis), cloud warehouses (Snowflake, BigQuery, Redshift, Databricks), streaming platforms (Kafka, NATS, GCP Pub/Sub, RabbitMQ, Kinesis), SaaS APIs (Stripe, Salesforce, HubSpot, Shopify, Notion, Jira, Slack), and vector databases (pgvector, Qdrant, Weaviate, Milvus, Pinecone). No driver installation needed — they're baked into the binary.

**Visual Pipeline Canvas with Live SQL.** Every node on the drag-and-drop canvas shows the generated SQL in a Plan tab and a live row sample in a Preview tab. You can see exactly what the engine is doing at each stage. Pipelines compile to real DuckDB SQL — there's no hidden abstraction layer or proprietary query language.

**Duckie AI Assistant (Fully Local).** The built-in chat sidebar runs Qwen 2.5 Coder 1.5B through llama.cpp on your CPU. Describe a pipeline in plain English, and Duckie streams back a valid JSON pipeline definition. One click drops it onto the canvas. No API key, no network calls, no cloud dependency. For developers who prefer cloud models, the assistant supports any OpenAI-compatible endpoint (Ollama, OpenAI, Cohere, etc.).

**AI-Native Data Transforms.** Six AI-specific transforms ship today: Vector Similarity Search (cosine/L2/inner product), Full-Text Search (BM25), Embeddings (OpenAI-compatible), LLM Transform (per-row chat completions with column templates), Text Chunker (RAG-ready, pure local), and PII Redact (regex-based email/phone/SSN/card detection). Three need a model API; three are pure-local.

**Git-Friendly Workspace.** Pipelines, connections, context variables, and routines persist as plain JSON and Markdown files in a folder you choose. Diff them, branch them, review them in PRs. The workspace is a first-class citizen, not an afterthought.

**Single-File Binary with Embedded Runner.** The ~65 MB download includes the visual designer, the headless pipeline runner, and the MCP server. Export a pipeline as a self-contained executable — engine, DuckDB CLI, extensions, and pipeline definition all in one file. Copy it to a server and run or schedule it.

**MCP Server for AI Tool Integration.** Duckle ships with a built-in MCP (Model Context Protocol) server so Claude, ChatGPT, and other AI tools can create, inspect, and run pipelines programmatically. This bridges the gap between visual pipeline design and AI-assisted data engineering.

### Use Cases

- **RAG data preparation** — Pull documents from multiple sources (S3, Notion, Confluence), chunk them, embed them via OpenAI-compatible APIs, deduplicate semantically, and push to pgvector or Qdrant. All visual, no Python scripts.

- **SaaS data consolidation** — Join Stripe billing data with HubSpot CRM records and a Postgres user table, transform and deduplicate, and land the result in Snowflake or BigQuery for analytics. Replace a pile of cron jobs and scripts with one visual pipeline.

- **Streaming ETL** — Consume from Kafka or NATS JetStream, apply transforms (filter, map, aggregate), validate data quality, and write to multiple sinks in parallel. The Parallelize node fans out branches across CPU cores automatically.

- **Data cleaning for ML** — Profile every column (null %, distinct counts, quartiles), validate with range/uniqueness/regex checks, route failures to a reject port, normalize types and encodings, and export clean training data. The Column Profile and Fuzzy Deduplicate transforms are purpose-built for this.

- **Local-first data exploration** — Drop a CSV or Parquet file onto the canvas, apply filters and joins, and preview results instantly. No server setup, no cloud account, no waiting. The 60-language UI makes it accessible to international teams.

### Pros and Cons

Pros:

- The connector breadth is genuinely impressive for a beta project. 290+ working connectors — including SaaS APIs, streaming brokers, vector databases, and geospatial formats — covers most real-world data pipeline needs without writing custom code.
- Local-first architecture means zero cloud dependency for the core product. The AI assistant runs on your CPU, pipelines execute through embedded DuckDB, and workspaces are plain files. Your data never leaves your machine unless you explicitly configure a cloud sink.
- The visual canvas with live SQL previews is a significant UX improvement over CLI-first tools. You can see exactly what SQL each node generates and preview row samples at every stage.
- Dual-licensed MIT/Apache-2.0 with 170+ integration tests across all three platforms. The CI runs on both GitHub Actions and GitLab CI.

Cons:

- Beta status means rough edges. The API surface may change before 1.0, and some connectors (Pinecone, Chroma, LanceDB) are still in preview. The roadmap lists several planned features (Python UDFs, plugin marketplace) that don't exist yet.
- Desktop-only deployment. There's no web UI or server mode for team collaboration. If your team needs shared pipeline editing or a centralized scheduler, you'll need to wait for future releases or build around the CLI runner.
- The local AI assistant (Qwen 2.5 Coder 1.5B) is small. It works for simple pipeline descriptions but may struggle with complex multi-step transformations. The "bring your own model" option mitigates this, but then you're back to needing an API key.

### Getting Started

```bash
# Download the latest release from GitHub
# https://github.com/SouravRoy-ETL/duckle/releases/tag/v0.3.0

# macOS (Apple Silicon)
chmod +x Duckle-macos-arm64 && ./Duckle-macos-arm64

# Linux (x86_64) — requires WebKitGTK 4.1
chmod +x Duckle-linux-x64 && ./Duckle-linux-x64

# Windows — double-click the .exe (SmartScreen warning on first run)

# First launch: install DuckDB engine (~30 seconds)
# Optional: install Duckie AI Assistant (~1.1 GB, 5-10 min)

# Build from source (for development)
git clone https://github.com/SouravRoy-ETL/duckle.git
cd duckle
npm install
cd apps/desktop/src-tauri
cargo build --release
```

### Alternatives

**Airbyte** — The most popular open-source data integration platform with 400+ connectors. Airbyte is more mature and has a larger community, but it requires a server (Docker or cloud) and its connector quality varies widely. Choose Airbyte when you need a production-grade, team-shared data platform with a web UI and API.

**dlt (data load tool)** — A Python-first EL framework that's lightweight and developer-friendly. dlt is great for programmatic pipelines and integrates well with dbt and Airflow, but it has no visual designer and requires writing Python code. Choose dlt when you prefer code-first data pipelines and already have a Python-centric data stack.

**Meltano** — Singer-based ELT platform backed by dbt Labs. Meltano has a large tap/target ecosystem and good CLI ergonomics, but the Singer connector quality is inconsistent and the visual tooling is minimal. Choose Meltano when you want a CLI-first tool with a large (if uneven) connector catalog.

### Verdict

Duckle is the most ambitious local-first data tool I've seen this year. The combination of a visual canvas, 290+ connectors, DuckDB execution, and a fully local AI assistant in a 65 MB binary is a compelling pitch — especially for developers who are tired of managing Airbyte instances or writing boilerplate Python ETL scripts. It's beta software, so expect rough edges and API changes. But if you're building RAG pipelines, consolidating SaaS data, or just need a fast way to explore and transform datasets on your laptop, Duckle is worth the download. The 400+ stars in three weeks suggest the data engineering community agrees.
