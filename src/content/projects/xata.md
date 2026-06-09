---
name: xata
description: "Open-source Postgres platform with copy-on-write branching, scale-to-zero, and self-hosted serverless DB management on Kubernetes."
url: https://github.com/xataio/xata
stars: 873
forks: 42
language: Go
tags: ["postgresql", "kubernetes", "database", "serverless", "devops"]
featured: false
publishedAt: 2026-06-09
---

## Xata

### Overview

Xata is an open-source, cloud-native Postgres platform that lets you self-host a large number of Postgres instances on Kubernetes with features you'd normally only get from managed database services — copy-on-write branching, scale-to-zero, auto-scaling, and high availability. At 873 stars and growing fast since its April 2026 launch, it's one of the most interesting database infrastructure projects to land on GitHub this year.

The project is built by the team behind [Xata Cloud](https://xata.io), a managed Postgres service that's been running in production at scale. They open-sourced the core platform under Apache 2.0, which means you get battle-tested infrastructure code without vendor lock-in. The engineering team clearly knows Postgres and Kubernetes deeply — the architecture shows it.

The core problem Xata solves is the gap between "run a single Postgres container" and "get a proper database platform with branching, scaling, and cost efficiency." If you've ever tried to set up preview environments for your NestJS or Django app and wished you could just clone your 500GB database in seconds instead of waiting 45 minutes for `pg_dump` to finish, that's exactly what Xata enables. Copy-on-write at the storage level means branching a massive database is nearly instant — you're not copying data, you're sharing it until one branch writes something different.

### Why it matters

The database layer has been the bottleneck in modern development workflows for years. CI/CD pipelines can spin up containers in seconds, but creating a fresh database copy for a preview branch? That's still painfully slow and expensive. Tools like Neon brought serverless Postgres to the cloud, but self-hosting that kind of infrastructure was out of reach for most teams.

Xata changes that equation. It's built on top of CloudNativePG (the best Postgres operator for Kubernetes) and OpenEBS (cloud-native storage), then adds its own layer for branching, routing, auth, and scale-to-zero. For fullstack developers running React frontends with NestJS, Django, or Go backends, this means you can finally get database-per-branch workflows without paying per-branch compute costs — branches that nobody's querying just hibernate.

The timing is right. Kubernetes adoption is mature, Postgres is the dominant database for new projects, and developer experience around database management still sucks. Xata targets that exact pain point with a well-architected solution.

### Key Features

**Copy-on-Write Branching.** The killer feature. You can branch a multi-terabyte Postgres database in seconds because Xata operates at the storage layer — it doesn't copy data, it shares it. When a branch writes to a row, only that row gets copied. This makes preview environments, feature branches, and dev/staging workflows dramatically faster and cheaper.

**Scale-to-Zero.** Branches that aren't being queried automatically hibernate — the compute instance is removed while storage persists. When a connection comes in, the branch wakes up automatically. This means you can have dozens of database branches sitting around without burning compute money on idle instances.

**Auto-Scaling and Bin-Packing.** Compute nodes scale up based on demand and get bin-packed across your Kubernetes cluster for cost efficiency. You don't need to manually provision database servers or guess how much compute you'll need tomorrow.

**High Availability with Automatic Failover.** Built on CloudNativePG, Xata handles read replicas, automatic failover, and switchover with minimal downtime. Upgrades and configuration changes happen through switchover rather than in-place restarts, so your app stays available.

**Serverless Driver (SQL over HTTP/WebSockets).** Xata includes a serverless-friendly driver that speaks SQL over HTTP and WebSockets. This is perfect for edge functions, serverless deployments, and environments where persistent database connections aren't practical. Works great from Vercel Edge Functions or Cloudflare Workers.

**REST API and CLI for Everything.** The entire control plane is exposed through REST APIs with granular RBAC on API keys. Create projects, manage branches, configure scaling — all programmable. The CLI wraps the API for quick terminal workflows.

**PITR Backups to Object Storage.** Point-in-time recovery backups go straight to S3-compatible object storage. You get production-grade backup and restore without configuring a separate backup solution.

### Use Cases

- **Preview environments for fullstack apps** — Branch your production database for every PR. Your React + NestJS preview deployment gets its own database copy that's instant to create and costs nothing when idle. When the PR merges, delete the branch.

- **Self-hosted Postgres-as-a-Service** — If your company has multiple teams running different services (Django apps, Go microservices, Node.js APIs), Xata gives you a platform where each team can manage their own Postgres instances without a dedicated DBA team.

- **Dev/staging at production scale** — Developers get their own database branches with real production data (via branching from a production snapshot). No more "it works with the test dataset but breaks with real data" problems.

- **Cost-efficient multi-tenant architectures** — Scale-to-zero means you can offer per-tenant database isolation without per-tenant compute costs. Tenants that aren't active don't consume resources.

- **ML/AI model training data snapshots** — Branch your database at specific points in time to create reproducible training datasets. The copy-on-write approach means you can snapshot frequently without storage bloat.

### Pros and Cons

Pros:
- Copy-on-Write branching is genuinely fast — branching terabyte-scale databases in seconds rather than hours. This alone justifies the project for teams doing serious preview environment workflows.
- Scale-to-zero solves the cost problem that makes database-per-branch impractical otherwise. You can have 50 branches without paying for 50 database servers.
- Built on proven infrastructure (CloudNativePG + OpenEBS) rather than reinventing the storage layer. These are mature, well-tested projects.
- Apache 2.0 license with no gotchas. The code powering the managed Xata Cloud service is what you're self-hosting.
- Active development — multiple commits per day as of June 2026, with real engineering work (observability, auth, billing) rather than cosmetic changes.

Cons:
- Kubernetes is a hard prerequisite. If you're not already running K8s, this isn't a weekend project. The quick start requires Kind, Docker, and Tilt — the learning curve is real.
- Still early for the open-source release (April 2026). Documentation is sparse, and you'll likely hit rough edges that the managed service handles for you.
- Not ideal for simple single-database setups. If you just need one Postgres instance, running it directly is simpler and Xata adds unnecessary complexity.
- Some security features for adversarial multi-tenancy are kept closed-source. Fine for internal use, but if you're building a public PaaS, you'll need the BYOC offering.

### Getting Started

```bash
# Prerequisites: Docker, Kind, Tilt

# Step 1: Create a Kind cluster
kind create cluster --wait 10m

# Step 2: Deploy Xata via Tilt
tilt up

# Step 3: Install the Xata CLI
curl -fsSL https://xata.io/install.sh | bash

# Step 4: Authenticate to local profile
xata auth login --profile local \
  --issuer http://localhost:8080/realms/xata \
  --api-url http://localhost:5001 \
  --client-secret devsecret

xata auth switch local

# Step 5: Create your first project
xata project create --name my-project

# Step 6: Create a branch
xata branch create

# Step 7: Connect with the serverless driver
# npm install @xata/serverless-driver
```

### Alternatives

**Neon** — The most direct comparison, but Neon is a cloud-only managed service. If you want serverless Postgres with branching and scale-to-zero without self-hosting, Neon is the polished choice. Choose Neon if you don't want to manage Kubernetes infrastructure and prefer a fully managed experience. Choose Xata if you need to run on your own infrastructure for compliance, cost, or control reasons.

**Supabase** — A broader platform that includes Postgres plus auth, storage, edge functions, and realtime subscriptions. Supabase is better if you want a full Backend-as-a-Service. Xata is better if you specifically need database branching and scale-to-zero for Postgres — Supabase doesn't offer copy-on-write branching.

**CloudNativePG (standalone)** — The Postgres operator that Xata builds on. If you just need high-availability Postgres on Kubernetes without branching or scale-to-zero, running CloudNativePG directly is simpler and lighter. Xata adds the branching, routing, and management layer on top.

### Verdict

Xata is the most interesting database infrastructure project I've seen this year. The copy-on-write branching alone solves a problem that every team running preview environments has struggled with — and the scale-to-zero economics make database-per-branch workflows actually practical instead of just theoretically nice. It's built on solid foundations (CloudNativePG, OpenEBS) and the team clearly has production experience from running the managed Xata Cloud service.

That said, this is a Kubernetes-native platform, not a simple database. If your team isn't already comfortable with K8s, the operational overhead might not be worth it — just use Neon or Supabase. But if you're running production workloads on Kubernetes already and you've been waiting for a self-hosted Postgres platform that does branching and serverless right, Xata is worth serious evaluation. The Apache 2.0 license and active development cadence (multiple commits daily) suggest this is a project with real momentum, not a throw-it-over-the-wall open-source dump.
