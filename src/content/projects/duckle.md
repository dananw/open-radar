---
name: duckle
description: "Duckle is a local-first ETL/ELT studio with a visual pipeline designer, 290+ connectors, DuckDB engine, and a built-in AI assistant — all in a 65 MB desktop app."
url: https://github.com/slothflowlabs/duckle
stars: 550
forks: 32
language: Rust
tags: ["etl", "data-engineering", "duckdb", "local-first", "tauri"]
featured: false
publishedAt: 2026-06-19
---

## Duckle

### Overview

Duckle is a local-first visual data pipeline studio that compiles your drag-and-drop graph to SQL and executes it through DuckDB. It crossed 550 GitHub stars in under a month after its May 2026 launch, which is a decent signal for a data engineering tool that doesn't come from a well-known company or YC batch. The project is by SlothFlowLabs, a small independent team — not affiliated with DuckDB Labs or MotherDuck despite the name overlap.

The core pitch: you get a desktop app (~65 MB download) with 290+ connectors, 126 transforms, 58 sinks, a built-in scheduler, and an on-device AI assistant called Duckie that runs Qwen 2.5 Coder 1.5B through llama.cpp entirely on your CPU. No cloud, no API keys, no telemetry. You drag sources and transforms onto a canvas, wire them together, and press Run. The graph compiles to SQL, DuckDB executes it natively, and you get live previews at every node.

What makes this different from the dozen other visual ETL tools floating around? Three things. First, the connector count is real — 74 sources covering files, lakehouses (Iceberg, Delta, DuckLake), network databases (Postgres, MySQL, SQL Server, Oracle, ClickHouse), cloud warehouses (Snowflake, BigQuery, Redshift, Databricks), streaming (Kafka, NATS, RabbitMQ, Pub/Sub, Kinesis), SaaS APIs (Salesforce, Stripe, Shopify, HubSpot, Notion, and 20+ more), NoSQL (MongoDB, Cassandra, Elasticsearch, Redis, DynamoDB), vector databases (pgvector, Qdrant, Weaviate, Milvus, Pinecone), FTP/SFTP, IMAP, and webhooks. Second, every node generates readable SQL you can inspect. Third, the workspace is plain files — diff them, branch them, review them in Git.

### Why it matters

The data engineering tooling space has a strange gap. On one end you have heavyweight platforms like Apache Airflow, dbt, and Fivetran that require infrastructure teams and cloud accounts. On the other end you have spreadsheet-level tools that fall apart past 10,000 rows. Duckle occupies the middle: serious enough to handle 5-million-row pipelines with CDC, incremental loads, and SCD Type 2, but light enough to run on a laptop without any backend setup.

The local-first angle matters more than people realize. A 2025 Developer Productivity survey by Stack Overflow found that 67% of data engineers spend more time on pipeline infrastructure than on actual data work. Tools that eliminate the "deploy and configure" step change how fast you can iterate. Duckle's model — download one binary, pick a workspace folder, start building — cuts the time from "I have a CSV" to "I have a clean Parquet file" to about 60 seconds.

The AI integration is also worth noting. Duckie, the built-in assistant, doesn't just answer questions about your data — it generates complete pipeline definitions from natural language descriptions. You type "read orders.csv, filter where status = 'paid', write to paid.parquet" and it drops the JSON onto your canvas. The model runs locally through llama.cpp, so it works offline and your data never leaves your machine. For developers working with sensitive datasets (healthcare, finance, government), this is a meaningful differentiator over cloud-based alternatives.

### Key Features

**Visual Pipeline Designer with SQL Transparency.** Drag sources, transforms, and sinks onto a canvas. Wire them with edges. Press Run. But unlike "no-code" tools that hide the execution layer, every node in Duckle shows its generated SQL in a Plan tab and live row samples in a Preview tab. You can read exactly what DuckDB will execute. This matters when debugging — you're not guessing what the black box did.

**290+ Connectors at Install Time.** Files (CSV, Parquet, JSON, Excel, Avro, XML), databases (Postgres, MySQL, SQL Server, Oracle, ClickHouse, SQLite, MongoDB, Cassandra, Redis, Elasticsearch), cloud warehouses (Snowflake, BigQuery, Redshift, Databricks, MotherDuck), streaming (Kafka, NATS, RabbitMQ, Pub/Sub, Kinesis), SaaS APIs (Salesforce, Stripe, Shopify, HubSpot, Notion, Airtable, GitHub, Jira, Slack, and more), vector databases (pgvector, Qdrant, Weaviate, Milvus, Pinecone), object storage (S3, GCS, Azure Blob, MinIO, R2), and even FTP/SFTP/IMAP. Each connector is covered by integration tests.

**Built-in AI Assistant (Duckie).** Powered by Qwen 2.5 Coder 1.5B running through llama.cpp as a local subprocess. No API keys, no cloud round-trips. Describe a pipeline in English, Duckie streams back valid JSON, and one click drops it onto the canvas. You can also point it at Ollama, OpenAI, or any OpenAI-compatible endpoint if you want a different model.

**Git-Friendly Workspaces.** Pipelines, connections, context variables, and routines persist as plain JSON and Markdown files in a folder you pick. Diff them, branch them, review pull requests. This is a sharp contrast to tools that store everything in opaque databases or proprietary formats.

**CDC and Incremental Loads.** Watermark-based incremental loading that tracks high-water marks in workspace state. SCD Type 1 and Type 2 with valid_from/valid_to/is_current columns. Merge/upsert with optional delete propagation across embedded, network, warehouse, and MongoDB sinks. DuckLake CDC change-feed reader for real-time replication.

**MCP Server for AI Agent Integration.** Duckle ships a bundled Model Context Protocol server, so Claude, ChatGPT, Cursor, or any MCP client can browse the component catalog, generate pipelines, validate them, run them headlessly, and read run logs. One-click connection to Claude Code, Claude Desktop, or Cursor from the top bar.

**Single-File Binary with Embedded Headless Runner.** The ~65 MB download includes both the desktop designer and a headless runner. Export a pipeline as a standalone executable — the engine, DuckDB CLI, extensions, and resolved pipeline are all inside one file. Copy it to a server and run or schedule it. No separate deployment step.

### Use Cases

- **Data cleaning for AI/ML pipelines** — Deduplicate, normalize, PII-redact, chunk, and embed text data before it hits your vector store. Duckle has built-in fuzzy dedup (Jaro-Winkler/Levenshtein), semantic dedup over embeddings, and RAG-ready text chunking.
- **ETL from SaaS to data warehouse** — Pull from Salesforce, Stripe, or HubSpot APIs, transform with visual joins and aggregations, and land in Snowflake or BigQuery. Schedule it with cron triggers.
- **Database migration and replication** — Move data between Postgres, MySQL, SQL Server, and Oracle with upsert and CDC delete propagation. Useful for legacy system modernization.
- **Local data exploration and prototyping** — Point at a CSV or Parquet file, profile columns, filter, aggregate, and export. No Docker, no cloud account, no waiting.
- **Agent-driven data workflows** — Connect Claude or Cursor via MCP and have AI agents build, validate, and run pipelines programmatically. Useful for automated data quality checks or report generation.

### Pros and Cons

Pros:
- 290+ connectors that actually work today, not a roadmap promise. The breadth is genuinely impressive for a tool this young — most alternatives top out at 50-100.
- True local-first architecture. Your data never leaves your machine unless you explicitly connect to a cloud sink. The AI assistant runs on your CPU.
- Git-friendly plain-file workspaces mean you can version-control your data pipelines like code. This is how data engineering should work.
- DuckDB as the execution engine is a smart choice — it's the fastest embedded analytical engine available, with excellent SQL compatibility and a thriving extension ecosystem.

Cons:
- Public beta status means APIs may change before 1.0. The README is honest about this, but it's worth noting for production use cases.
- Single-machine by design. If you need distributed processing or petabyte-scale workloads, this isn't the tool. Duckle is explicitly built for local and small-team data work.
- The AI assistant (Duckie) uses a 1.5B parameter model — fine for simple pipelines, but complex multi-step workflows may need manual adjustment. You can point it at a larger model via Ollama, but that adds setup complexity.
- No Python or Rust UDF support yet (planned). Custom logic today is limited to SQL, JavaScript (via Boa), and WebAssembly.

### Getting Started

Download the binary for your OS from the [latest release](https://github.com/slothflowlabs/duckle/releases), or build from source:

```bash
# Clone and install
git clone https://github.com/ducklelabs/duckle
cd duckle
npm --prefix frontend install

# Run in development (hot-reloading frontend + native shell)
cargo tauri dev

# Build a release binary
cargo build --release --manifest-path apps/desktop/Cargo.toml --features custom-protocol
```

On first launch, Duckle guides you through installing the DuckDB engine (~30 MB, required) and optionally the Duckie AI assistant (~1.1 GB). Pick a workspace folder, then either drag a CSV source onto the canvas or ask Duckie to build your first pipeline.

Connect to Claude or Cursor via the "Connect to Claude" button in the top bar — the bundled MCP server registers automatically.

### Alternatives

**Apache Airflow** — The industry standard for workflow orchestration. Airflow is more mature, has a larger ecosystem, and handles distributed execution across clusters. But it requires Python, a scheduler, a metadata database, and significant infrastructure. Choose Airflow when you need multi-team orchestration at scale. Choose Duckle when you want to build and run a pipeline in 60 seconds without any infrastructure.

**dbt** — The go-to tool for SQL-based data transformations with version control and testing. dbt excels at the "T" in ELT — transforming data that's already in your warehouse. Duckle covers the full ETL/ELT lifecycle (extract, load, and transform) with a visual interface. Choose dbt when your team lives in SQL and your data is already in a warehouse. Choose Duckle when you need to pull from diverse sources, transform visually, and land results anywhere.

**Meltano** — An open-source ELT platform from the Singer/Meltano ecosystem. Meltano has a solid connector library (300+ Singer taps) and integrates well with dbt and Airflow. But it's CLI-driven and requires more setup. Choose Meltano when you want a code-first, composable ELT pipeline. Choose Duckle when you want a visual designer with real-time previews and an AI assistant.

### Verdict

Duckle is the most interesting data engineering tool I've seen come out of the local-first movement. The combination of a visual pipeline designer, 290+ working connectors, DuckDB execution, and a fully offline AI assistant in a single 65 MB binary is a genuinely compelling package. It won't replace Airflow for enterprise orchestration or dbt for SQL-heavy transformation teams, but that's not the point. It fills a real gap: developers and data engineers who need to move and transform data quickly without provisioning infrastructure, managing cloud accounts, or writing boilerplate code. The 550 stars in under a month with no major company backing or marketing budget suggests the developer community sees the same potential. If you work with data regularly and want a tool that gets out of your way, Duckle is worth installing today.
