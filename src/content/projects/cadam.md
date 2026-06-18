---
name: cadam
description: "CADAM is an open-source text-to-CAD web app that turns natural language into parametric 3D models using React, OpenSCAD WASM, and Claude AI."
url: https://github.com/Adam-CAD/CADAM
stars: 4365
forks: 553
language: TypeScript
tags: ["ai", "cad", "react", "webassembly", "3d-modeling", "text-to-cad"]
featured: false
publishedAt: 2026-06-18
---

## CADAM

### Overview

CADAM is an open-source text-to-CAD web application that generates parametric 3D models from natural language descriptions. It crossed 4,300 GitHub stars in under a year, and hit the front page of Hacker News in June 2026 with over 180 points — a signal that the intersection of AI and CAD is heating up fast.

The project is built by Zach Dive, Aaron Li, and Dylan Anderson. What makes their approach stand out is the decision to compile OpenSCAD to WebAssembly and run the entire CAD pipeline in the browser. No server-side rendering, no cloud compute for the modeling step. You type a description like "a knurled control knob 40mm in diameter with a D-shaped shaft bore," and CADAM generates real OpenSCAD code that renders as a fully parametric 3D model you can adjust with sliders. The benchmarks are impressive — it handles V8 engines, turbofan jet engines, and herringbone planetary gearboxes from single prompts.

The core problem CADAM solves is the gap between "I know what I want" and "I can model it in CAD software." Traditional CAD tools like Fusion 360, SolidWorks, and FreeCAD require significant expertise. Even simple parts take 20-30 minutes for an experienced user. CADAM collapses that to seconds by using Claude to generate OpenSCAD code, which then runs in the browser via WASM to produce real geometry. The models are parametric — every dimension becomes an adjustable slider — so you can iterate without re-generating.

### Why it matters

The text-to-CAD space is emerging as one of the most practical applications of AI in engineering. Unlike image generation or text completion, the output here is functional — you can export an STL and send it to a 3D printer. CADAM sits at the intersection of several trends that fullstack developers should watch: browser-based WASM runtimes replacing desktop software, AI agents generating structured code rather than prose, and the democratization of manufacturing tools.

What's interesting about CADAM's architecture for web developers is how it combines familiar technologies in an unfamiliar way. React 19 for the UI, Three.js via React Three Fiber for 3D preview, Supabase for auth and storage, TanStack Start for the server layer, and OpenSCAD compiled to WASM as the computational engine. It's a fullstack application where the "backend" computation happens client-side. That pattern — heavy computation pushed to the browser via WebAssembly — is going to define the next generation of web applications.

The project is also a case study in how AI coding tools change what's buildable. The benchmarks section alone, with models ranging from NACA airfoil wings to centrifugal pump impellers, shows a level of domain-specific quality that would have required a dedicated engineering team two years ago. Now three developers and an AI API can ship it open source.

### Key Features

**Natural Language to Parametric Code.** Describe a 3D model in plain English and CADAM generates OpenSCAD code that produces real geometry. The AI doesn't just create a static mesh — it extracts parameters (dimensions, counts, angles) and exposes them as adjustable controls. A V8 engine benchmark generates 22 adjustable dimensions and 8 color zones from a single paragraph description.

**Full Browser Pipeline with WebAssembly.** OpenSCAD compiles to WASM and runs entirely in the client. The CAD engine, preview renderer, and export logic all execute in the browser with no server-side computation for the modeling step. This means it works offline after initial load, has zero compute costs for the operator, and keeps your designs private.

**Real-Time Parametric Controls.** Every generated model comes with interactive sliders for its dimensions. Adjust a wall thickness, change a bore diameter, increase the number of teeth on a gear — the model updates instantly without calling the AI again. This is the difference between a toy demo and a tool you'd actually use for prototyping.

**Multiple Export Formats.** Export your models as STL files for 3D printing, SCAD files for further editing in OpenSCAD, or DXF files for 2D CNC workflows. The export pipeline runs in the browser via WASM, so there's no server round-trip.

**Image-to-CAD Reference.** Upload an image alongside your text description to guide the generation. This is useful when you have a sketch or a reference photo of an existing part and want to recreate it parametrically. The AI interprets both the visual and textual inputs together.

**Built-in CAD Library Support.** CADAM includes BOSL, BOSL2, and MCAD — the three most popular OpenSCAD libraries — compiled into the WASM bundle. These provide production-ready primitives for bearings, gears, threads, and mechanical hardware that the AI can reference in generated code.

**Supabase-Powered Persistence.** User accounts, saved designs, and project history are stored via Supabase's PostgreSQL, Auth, and Storage services. You can sign in, save your work, and come back to it later. The Supabase integration also means self-hosting is straightforward — run `npx supabase start` and you have a local backend.

### Use Cases

- **Rapid mechanical prototyping** — Engineers and makers who need to visualize a part before committing to detailed CAD work. Describe what you need, adjust the sliders, export an STL, and print a test piece in under an hour.
- **Educational demonstrations** — Teaching mechanical engineering concepts like gear ratios, airfoil profiles, or impeller dynamics by generating and manipulating models in real time during lectures or workshops.
- **3D printing hobbyists** — People who own a 3D printer but lack CAD expertise. They can describe custom parts, brackets, enclosures, and fixtures in plain language and get print-ready files.
- **Fullstack developers exploring WASM patterns** — The architecture is a reference implementation for heavy client-side computation via WebAssembly. If you're building data visualization, simulation, or computational tools for the browser, CADAM's pipeline is worth studying.
- **AI agent integration experiments** — The OpenSCAD code generation is structured and predictable, making it a good target for agent workflows. An AI agent could iterate on a design, run it through the WASM renderer, check the output, and refine.

### Pros and Cons

Pros:
- The benchmarks are genuinely impressive. Generating a parametric V8 engine with 22 adjustable dimensions from a text prompt is not something any other open-source tool can do right now.
- Running the full CAD pipeline in the browser via WASM eliminates compute costs and privacy concerns. Your designs never leave your machine for the modeling step.
- The React + Three.js + Supabase stack is familiar territory for web developers. Contributing to or forking this project doesn't require learning a new ecosystem.
- Active development with 553 forks and growing community engagement, including a Discord server for discussion and support.

Cons:
- The AI generation depends on the Claude API, which costs money per request. Complex models with many features can consume significant tokens. There's no local LLM option yet.
- OpenSCAD's CSG (Constructive Solid Geometry) approach has inherent limitations — organic shapes, smooth curves, and freeform surfaces are harder to model than mechanical parts. The benchmarks skew heavily toward engineering hardware for a reason.
- The GPLv3 license means any derivative work must also be open source. This limits commercial embedding compared to MIT or Apache-licensed alternatives.
- Accuracy depends on the AI's ability to generate correct OpenSCAD code. Complex prompts can produce geometry errors that require manual code fixes, which defeats the no-code promise.

### Getting Started

```bash
# Clone the repository
git clone https://github.com/Adam-CAD/CADAM.git
cd CADAM

# Install dependencies
npm install

# Start Supabase locally
npx supabase start
npx supabase functions serve --no-verify-jwt

# Start the development server
npm run dev
```

Prerequisites: Node.js 20.19+ or 22.12+, npm, and Supabase CLI. You'll also need a Claude API key set in your environment for the AI generation step. Alternatively, try it live at [adam.new/cadam](https://adam.new/cadam) without any setup.

### Alternatives

**OpenSCAD** — The original open-source parametric CAD tool that CADAM builds on. If you already know OpenSCAD's scripting language, you don't need the AI layer. But for everyone else, the learning curve is steep — you're writing code to define geometry, which is exactly the barrier CADAM removes.

**Zoo.dev (Text-to-CAD)** — A commercial text-to-CAD API with a hosted service and enterprise features. Zoo's approach generates CAD kernel-level geometry (not OpenSCAD code), which gives more precise results for engineering applications. Choose Zoo if you need production-grade accuracy and are willing to pay for it.

**FreeCAD** — The established open-source parametric CAD tool with a full GUI. FreeCAD has 20+ years of development and handles complex assemblies, simulations, and manufacturing workflows that CADAM can't touch yet. But it requires learning a desktop application with significant complexity. CADAM is faster for simple parts; FreeCAD is necessary for serious engineering work.

### Verdict

CADAM is the most convincing demonstration I've seen of AI-assisted CAD that actually works. The benchmarks speak for themselves — generating a parametric herringbone planetary gear stage from a text description is not a parlor trick, it's genuinely useful for rapid prototyping. The architecture is smart: pushing the entire pipeline to the browser via WASM eliminates the cost and privacy problems that plague server-side AI tools. For fullstack developers, it's also a reference implementation of the "heavy computation in the browser" pattern that WASM enables. The 4,300-star growth and HN front page appearance suggest real community interest, not just hype. If you own a 3D printer, do mechanical work, or want to study how to build serious computational web applications, this is worth your time. The Claude API dependency and GPLv3 license are real constraints, but neither is a dealbreaker for the target audience.
