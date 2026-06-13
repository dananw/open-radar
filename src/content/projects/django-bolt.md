---
name: django-bolt
description: "Django-Bolt is a Rust-powered API framework for Django that hits 188k+ RPS — faster than FastAPI with full Django ORM and admin support."
url: https://github.com/dj-bolt/django-bolt
stars: 1525
forks: 76
language: Python
tags: ["django", "rust", "api", "python", "performance"]
featured: false
publishedAt: 2026-06-14
---

## Django-Bolt

### Overview

Django-Bolt is a Rust-powered API framework for Django that achieves 188,000+ requests per second. To put that in perspective, FastAPI benchmarks around 30-40k RPS on equivalent hardware, and Django REST Framework sits closer to 3-5k RPS. Django-Bolt doesn't just edge out the competition — it obliterates it by an order of magnitude.

The project was created by Farhan Ali Raza and first appeared on GitHub in September 2025. It's gained steady traction since then, accumulating over 1,500 stars and a Discord community. The approach is unconventional: instead of building a new Python web framework from scratch, Django-Bolt bolts a Rust HTTP server onto your existing Django project. Actix Web handles HTTP parsing and response generation (one of the fastest HTTP frameworks in any language), PyO3 bridges the async boundary between Rust and Python, and msgspec handles serialization at 5-10x the speed of Python's standard library. Your Django models, admin panel, middleware, and packages all keep working unchanged.

The core problem Django-Bolt solves is the performance ceiling of Python-based API frameworks. Django's ORM and ecosystem are unmatched for productivity, but serving API responses through WSGI or even ASGI has inherent overhead. Every request pays the tax of Python's GIL, JSON serialization with stdlib, and synchronous I/O patterns. Django-Bolt sidesteps all of this by running the HTTP layer in Rust while keeping your business logic in Python. You get the developer experience of Django with the raw throughput of a systems language.

### Why it matters

The Python web framework landscape has been settling into a comfortable hierarchy: Django for full-featured apps, FastAPI for async APIs, Flask for lightweight services. Django-Bolt challenges that hierarchy directly. If you can get FastAPI-beating performance without leaving Django's ecosystem — without rewriting your models, abandoning Django Admin, or learning a new ORM — the calculus changes for a lot of teams.

This connects to a broader trend of Rust being used as a performance substrate for higher-level languages. We've seen it with Ruff replacing Python linters, uv replacing pip, and Pydantic v2 rewriting its core in Rust. Django-Bolt applies the same pattern to web serving. The Python code you write stays Python. The parts that need to be fast — HTTP parsing, routing, serialization — happen in Rust. It's the same "rewrite the hot path in Rust" playbook, applied to the web framework layer.

For Django shops hitting performance walls, this is worth serious attention. The alternative has traditionally been "rewrite your API in Go" or "add more servers behind a load balancer." Django-Bolt offers a third option: keep your Django project, swap the HTTP server, and get 10-50x throughput improvement without changing application code.

### Key Features

**Rust-Powered HTTP Server.** The entire HTTP layer runs on Actix Web, which consistently ranks among the fastest HTTP frameworks in TechEmpower benchmarks. Request routing uses matchit, a zero-copy path matcher, so URL parsing doesn't allocate memory unnecessarily. You don't need gunicorn or uvicorn — Django-Bolt IS the server.

**Seamless Django ORM Integration.** Your existing Django models work without modification. The framework supports async ORM operations out of the box, so you can use `await User.objects.aget(id=user_id)` directly in your route handlers. No new ORM to learn, no model migrations, no compatibility shims.

**Built-in Authentication and Permissions.** JWT and API key validation happens in Rust, completely bypassing Python's GIL. Permission classes like `IsAuthenticated` and `HasPermission` protect routes declaratively. This is a significant performance win for auth-heavy APIs where every request hits the token verification path.

**Msgspec Serialization.** Request validation and response serialization use msgspec instead of Pydantic or stdlib json. Msgspec is 5-10x faster than Python's json module and produces typed Struct classes similar to dataclasses. Response type validation happens automatically — if your handler declares a return type, the framework enforces it.

**Full Middleware Support.** CORS, rate limiting, response compression, and Django middleware integration all work. You can layer Django-Bolt onto an existing project and keep your current middleware stack. The framework handles the async-to-sync bridge for middleware that wasn't written for async.

**Auto-Generated OpenAPI Documentation.** Swagger, ReDoc, Scalar, and RapidDoc interfaces are generated from your route definitions and type annotations automatically. This is table stakes for modern API frameworks, but Django-Bolt does it without requiring extra decorators or docstring parsing.

**Class-Based Views and ViewSets.** If you prefer Django REST Framework's ViewSet pattern over function-based routes, Django-Bolt supports ModelViewSet and ViewSet classes. This makes migration from DRF more straightforward — similar patterns, dramatically better performance.

### Use Cases

- **High-throughput API backends** — Services handling tens of thousands of requests per second that currently need multiple Django instances behind a load balancer. Django-Bolt can consolidate that into fewer servers.
- **Real-time data APIs** — SSE (Server-Sent Events) and streaming responses handle 10,000+ concurrent connections efficiently, making it suitable for dashboards, live feeds, and notification systems.
- **Django projects hitting performance ceilings** — Teams that love Django's ecosystem but can't justify the infrastructure costs of scaling Python-based API serving. Swap the HTTP layer without rewriting business logic.
- **Microservices with Django models** — Lightweight API services that need Django's ORM and migration system but don't need the full template rendering stack.
- **Migration path from DRF** — Existing Django REST Framework projects that need better throughput without a full rewrite. The ViewSet and decorator patterns are similar enough to ease the transition.

### Pros and Cons

Pros:
- Genuine 10-50x throughput improvement over Django REST Framework and significant gains over FastAPI, backed by published benchmarks you can reproduce yourself.
- Zero migration cost for existing Django projects — your models, admin, migrations, and most middleware work unchanged. Add `django_bolt` to INSTALLED_APPS and start writing routes.
- Auth verification in Rust means token-heavy APIs see massive performance gains without caching layers or token introspection shortcuts.

Cons:
- Under active development with 9 open issues and an evolving API surface. Production adoption today means accepting potential breaking changes as the framework matures.
- No license file in the repository as of mid-June 2026. This is a legal concern for commercial use — clarify licensing before building production systems on it.
- The Rust dependency chain (maturin, Cargo, Actix) adds build complexity. Installing from source requires a Rust toolchain, which complicates CI/CD pipelines and container builds compared to pure-Python frameworks.

### Getting Started

```bash
# Install from PyPI
pip install django-bolt

# Add to your Django settings
# INSTALLED_APPS = [..., "django_bolt", ...]

# Create an API file (e.g., myproject/api.py)
```

```python
# myproject/api.py
from django_bolt import BoltAPI
from django.contrib.auth import get_user_model
import msgspec

User = get_user_model()
api = BoltAPI()

class UserSchema(msgspec.Struct):
    id: int
    username: str

@api.get("/users/{user_id}")
async def get_user(user_id: int) -> UserSchema:
    user = await User.objects.aget(id=user_id)
    return {"id": user.id, "username": user.username}
```

```bash
# Run the development server
python manage.py runbolt --dev
```

### Alternatives

**Django Ninja** — The closest comparison. Django Ninja also offers decorator-based routing with type hints and Pydantic validation for Django projects. It's more mature, better documented, and has a larger community. Choose Django Ninja if you want a proven, production-ready Django API framework and can accept standard Python-level performance.

**FastAPI** — The async Python API framework that popularized type-hint-based routing. FastAPI has the best documentation and largest ecosystem of any Python API framework. Choose FastAPI if you're not tied to Django's ORM and admin, or if you need features like WebSocket support and dependency injection that Django-Bolt hasn't implemented yet.

**Litestar** — A newer async Python framework that's faster than FastAPI and offers a more opinionated architecture. Litestar has its own ORM integration and plugin system. Choose Litestar if you want high performance Python APIs without the Django ecosystem dependency.

### Verdict

Django-Bolt is the most exciting thing happening in the Django ecosystem right now. The premise sounds too good to be true — keep your Django project, swap the HTTP server, get 10x+ performance — but the benchmarks are real and the architecture is sound. Actix Web handling HTTP while Python handles business logic is the right division of labor. The project is young (September 2025), has no license file yet, and the API surface is still shifting. Don't bet your production system on it today. But if you're a Django developer who's been eyeing Go or Rust for performance-critical APIs, Django-Bolt might let you stay in Python. Watch this project closely over the next six months.
