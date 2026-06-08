---
name: duckle
description: "Duckle is a local-first ETL/ELT studio with visual pipeline design, 290+ connectors, DuckDB execution, and an offline AI assistant — all in a 30MB desktop app."
url: https://github.com/SouravRoy-ETL/duckle
stars: 326
forks: 23
language: Rust
tags: ["data-engineering", "etl", "duckdb", "local-first", "ai-assistant"]
featured: false
publishedAt: 2026-06-08
---

## Duckle

### Overview

Duckle is a local-first, open-source ETL/ELT desktop studio that compiles visual pipelines to SQL and executes them through DuckDB. It hit 326 GitHub stars within three weeks of its May 2026 launch, which is notable for a data engineering tool without a VC-funded marketing push. The project is created by Sourav Roy, a data engineer who's been building pipeline tooling and clearly got tired of the tradeoffs between heavyweight enterprise ETL platforms and lightweight but limited alternatives.

The core problem Duckle addresses is the gap between "I need to move and transform data across 10 sources" and "I don't want to set up Airflow, spin up a cloud instance, or write 500 lines of pandas." Most developers working with data pipelines today either over-engineer with distributed systems they don't need, or under-engineer with scripts that break silently. Duckle sits in the middle: a visual canvas where you drag sources, transforms, and sinks, wire them together, and press Run. The graph compiles to real SQL — visible on every node — and executes through DuckDB's vectorized columnar engine. A 5-million-row join across CSV, Parquet, DuckDB, and SQLite tables runs in milliseconds.

The app itself is a ~30MB Tauri binary built with Rust and React 19. No Docker containers, no JVM, no Node.js server to babysit. Download it, launch it, start building pipelines. That simplicity is the point.

### Why it matters

The data engineering tooling landscape has a persistent problem: the powerful tools are complex, and the simple tools are fragile. Apache Airflow and dbt are excellent for teams with dedicated data engineers, but they require infrastructure, configuration, and ongoing maintenance. On the other end, writing Python scripts with pandas works until it doesn't — no lineage, no previews, no scheduling, and definitely no collaboration.

Duckle represents a local-first philosophy that's gaining traction across developer tools. The same way Figma moved design from desktop to browser and then back to desktop with better performance, data tooling is moving back toward local execution. DuckDB is the catalyst here — it's an embedded analytical database that runs columnar queries at near-native speed without a server. Duckle builds on that foundation and adds the visual layer, the connector catalog, and the AI assistant that makes it usable by developers who aren't SQL experts.

The AI angle is worth highlighting. Duckie, the built-in assistant, runs Qwen 2.5 Coder 1.5B through llama.cpp entirely on your CPU. No API keys, no cloud round-trips, no telemetry. Describe a pipeline in English and it generates valid JSON that drops onto the canvas. This is the kind of practical AI integration that actually changes workflows — not a chatbot bolted onto a dashboard, but an assistant that understands the pipeline DSL and produces executable output.

### Key Features

**Visual Pipeline Designer with Live SQL Preview.** Every node on the canvas compiles to SQL that you can inspect in real time. Drag a CSV source, connect it to a filter, then a join, then a Parquet export — and watch the generated SQL update at each step. This transparency is critical for debugging and learning. You're never staring at a black box wondering what's happening under the hood.

**290+ Connectors Out of the Box.** Files (CSV, Parquet, JSON, Excel), SQL databases (Postgres, MySQL, SQLite, DuckDB), data warehouses (BigQuery, Snowflake, Redshift), lakehouses (Delta, Iceberg), object stores (S3, GCS, Azure Blob), NoSQL (MongoDB, Redis), streaming brokers (Kafka), SaaS APIs (REST and GraphQL), vector databases, and even FTP and IMAP. Each connector is tested and working today, not listed as "coming soon" on a roadmap.

**Duckie AI Assistant (Fully Offline).** Powered by Qwen 2.5 Coder 1.5B running through llama.cpp as a local subprocess on 127.0.0.1. Describe your pipeline in plain English, and Duckie streams back a valid pipeline definition. One click inserts it onto the canvas with positioned nodes and wired edges. The model downloads once (~1.1 GB) and then runs entirely on your CPU. Disconnect your WiFi and it keeps working.

**Git-Friendly Workspaces.** Pipelines, connections, contexts, and schedules persist as plain files in a folder you choose. Diff them, branch them, review them in PRs. Built-in GitHub and GitLab integration means your data pipelines get the same version control treatment as your application code. This is how data work should be managed.

**Built-in Scheduler and Triggers.** Run pipelines on cron schedules or trigger them from external events without deploying to a separate orchestration platform. For small teams and local workflows, this eliminates the need for Airflow or Prefect for basic scheduling needs.

**DuckDB Execution Engine.** All pipeline execution runs through DuckDB's vectorized, columnar engine. No hidden state, no intermediate databases to manage. A clean-and-export job that crawls in a pandas script finishes in milliseconds. The engine installs on first launch with a guided step — no manual configuration.

**60 UI Languages with RTL Support.** The entire interface — topbar, palette, chat assistant, properties panel — ships localized in 60 languages including Arabic, Hebrew, Persian, and Urdu with proper right-to-left layout. This is unusual for a data tool and signals serious attention to global developer experience.

### Use Cases

- **Data migration projects** — Moving data from legacy SQL databases to modern warehouses or lakehouses. The visual canvas makes complex transformation logic auditable, and the 290+ connectors handle the source/target combinations that would require custom scripts otherwise.
- **ETL for AI/ML pipelines** — Cleaning and preparing training data before it reaches your models. The vector database connectors (Pinecone, Weaviate, Qdrant, Chroma) and the AI-native transforms make it straightforward to prepare embeddings and structured data for RAG systems.
- **Business intelligence prep** — Joining data from SaaS tools, databases, and spreadsheets into clean datasets for dashboards. The visual mapper handles multi-way joins without writing SQL, and the live preview catches data quality issues before they propagate.
- **Local data exploration and prototyping** — Quick ad-hoc analysis across multiple data sources without spinning up infrastructure. The DuckDB engine handles millions of rows locally, and the AI assistant helps developers who know what they want but aren't fluent in SQL syntax.
- **Small-team data ops** — Teams without dedicated data engineers who need reliable, scheduled data pipelines. The built-in scheduler and Git integration provide production-grade workflow without the operational overhead of distributed systems.

### Pros and Cons

Pros:
- Genuinely local-first with no cloud dependency. The AI assistant, the execution engine, and the workspace all run on your machine. This matters for data privacy, offline work, and avoiding vendor lock-in.
- The 290+ connector catalog is impressive for a project three weeks old. Most "290 connector" claims in the data tool space include aspirational entries — Duckle's are tested and working, with 170+ integration tests backing them.
- Active development with multiple commits daily. The June 7 commits alone added SFTP support and fixed Parquet/CSV edge cases. This isn't a weekend project that will go dormant.
- The ~30MB binary size is remarkably small for what it includes. Compare to Electron-based alternatives that eat 500MB+ of disk space.

Cons:
- Public beta status means the API surface is still evolving. Breaking changes are likely before 1.0. Production use requires tolerance for updates that might change pipeline formats.
- Single-machine by design. If your data volumes exceed what one laptop can handle, you'll need to point Duckle's output at a warehouse or lakehouse. It won't scale horizontally, and it's honest about that.
- The AI assistant's 1.5B parameter model is good for straightforward pipelines but will struggle with complex multi-step transformations. You'll still need to understand SQL for advanced use cases.
- Desktop-only — no web version, no collaborative editing. If your team needs real-time co-editing on pipelines, you'll need a different tool.

### Getting Started

```bash
# Download the latest release from GitHub
# https://github.com/SouravRoy-ETL/duckle/releases

# Or build from source
git clone https://github.com/SouravRoy-ETL/duckle.git
cd duckle
cargo tauri dev

# The app launches with a guided setup:
# 1. Choose a workspace folder (pipelines save here as plain files)
# 2. DuckDB installs automatically on first launch
# 3. Optionally download the AI model (~1.1 GB) for Duckie assistant

# Create your first pipeline:
# - Drag a source node (e.g., CSV file) onto the canvas
# - Add transforms (Filter, Map, Join)
# - Connect to a sink (Parquet, database, API)
# - Click Run to execute
```

### Alternatives

**Apache Airflow** — The industry standard for workflow orchestration. Airflow is more powerful for distributed, multi-team deployments with complex dependency graphs. But it requires a scheduler, metadata database, and worker infrastructure that's overkill for local data work. Choose Airflow when you need multi-node orchestration and have a team to maintain it.

**dbt (data build tool)** — dbt excels at SQL-based data transformation with version control, testing, and documentation. It's the right choice when your workflow is SQL-first and you want a mature ecosystem of packages and best practices. Duckle is better when you need visual pipeline design, non-SQL sources, or a drag-and-drop interface for team members who aren't SQL power users.

**Meltano** — An open-source ELT platform from the Singer ecosystem. Meltano is strong on extractors and loaders with a CLI-first approach and good CI/CD integration. Choose Meltano when you prefer code-over-CLI workflows and want to leverage the Singer connector ecosystem. Duckle wins on visual design, built-in transforms, and the offline AI assistant.

### Verdict

Duckle is the most interesting data engineering tool I've seen this year. The combination of visual pipeline design, DuckDB execution, 290+ connectors, and a fully offline AI assistant in a 30MB binary is genuinely compelling. It's not trying to replace Airflow or dbt for enterprise deployments — it's solving the problem of "I need to move and transform data without setting up infrastructure." The local-first philosophy is the right call for this use case, and the active development (multiple commits per day, rapid connector expansion) suggests the project has real momentum. If you're a fullstack developer who regularly works with data across multiple sources and you're tired of writing one-off scripts, Duckle is worth installing today. The beta status means you should expect rough edges, but the core experience — drag, connect, run — already works well enough for real data work.
