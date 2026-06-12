---
name: geolibre
description: "GeoLibre is an open-source cloud-native GIS platform built with React, TypeScript, DuckDB-WASM, and MapLibre GL JS — maps and spatial SQL that run in any browser."
url: https://github.com/opengeos/GeoLibre
stars: 648
forks: 89
language: TypeScript
tags: ["gis", "maps", "duckdb", "react", "typescript", "spatial-data"]
featured: false
publishedAt: 2026-06-12
---

## GeoLibre

### Overview

GeoLibre is a lightweight, cloud-native GIS platform that runs in your browser, as a desktop app, and on mobile screens — all from a single TypeScript codebase. It hit 600+ GitHub stars within two weeks of its late May 2026 launch, which signals real demand for an open-source mapping tool that doesn't require a PhD in geospatial engineering to use.

The project is created by Qisheng Wu, the developer behind leafmap (4,000+ stars), geemap, and several other widely-used Python geospatial libraries. Wu is a research professor at the University of Tennessee and has been building open-source geospatial tools for years. That background matters — GeoLibre isn't a weekend project. It's the product of someone who's spent a decade watching geospatial developers struggle with fragmented toolchains and decided to build something better.

The core problem GeoLibre solves is accessibility. Traditional GIS platforms like QGIS are powerful but desktop-only and intimidating for web developers. Web-based alternatives like Mapbox Studio are proprietary and expensive at scale. GeoLibre takes a different approach: it bundles MapLibre GL JS for rendering, DuckDB-WASM for in-browser spatial SQL, deck.gl for large-scale data visualization, and Tauri v2 for desktop packaging. The result is a platform where you can drag a 500MB GeoParquet file into your browser, run SQL queries against it, style the results interactively, and export the output — all without a server.

### Why it matters

The geospatial web is exploding. Every delivery app, real estate platform, climate dashboard, and logistics tool needs maps and spatial analysis. But the tooling hasn't kept up. Most web developers either pay Mapbox or Google Maps Platform per tile request, or cobble together open-source libraries without a cohesive workspace. GeoLibre fills that gap with a complete, self-hostable platform.

What makes this different from yet another map viewer is the DuckDB-WASM integration. Running spatial SQL entirely in the browser means you can query millions of features without a backend database. This is the same technology that's making DuckDB popular in the data engineering world, now applied to geospatial data. For fullstack developers building data-heavy applications, this changes the architecture — you can push spatial queries to the client and eliminate a whole category of API endpoints.

The timing connects to the broader trend of WASM-powered developer tools. Figma proved that complex applications can run in the browser with near-native performance. GeoLibre applies that same philosophy to GIS, and the developer community is responding.

### Key Features

**DuckDB-WASM Spatial SQL Workspace.** The built-in SQL editor lets you run DuckDB Spatial queries against loaded layers, local files, and remote URLs directly in the browser. This means you can JOIN a GeoParquet file of building footprints with a CSV of property values, filter by area and price, and render the result as a map layer — all without a backend. Query history and sample queries are built in, making it approachable for developers who are new to spatial SQL.

**Universal Format Support.** GeoLibre reads GeoJSON, GeoParquet, GeoPackage, Shapefile, FlatGeobuf, KML/KMZ, GML, GPX, CSV with coordinates, and more through DuckDB-WASM. On the raster side, it handles GeoTIFF and Cloud Optimized GeoTIFF (COG). You can also add XYZ tiles, WMS, WFS, vector tiles, PMTiles, MBTiles, ArcGIS services, Zarr, LiDAR, 3D Tiles, and even georeferenced video overlays. If your data exists in a geospatial format, GeoLibre probably reads it.

**Cross-Platform Architecture.** The same React + TypeScript codebase runs as a Tauri v2 desktop app (Windows, macOS, Linux), a web application in any modern browser, and adapts responsively to mobile screens. The Tauri build adds filesystem dialogs, local MBTiles support, and native raster reads. The web build works standalone or inside Docker. This isn't a desktop app awkwardly wrapped for the web — it's designed from the start to work everywhere.

**Interactive Layer Styling.** The live style panel supports single, categorized, graduated, and expression-based symbology with fill color, stroke, opacity, and circle radius controls. You can style vector layers by attribute values, create choropleth maps, and adjust everything in real time. No CSS-in-JS or custom rendering code needed — it's all through the UI.

**Plugin System.** GeoLibre has a modular plugin architecture with basemap providers, layer controls, MapLibre components, swipe comparison, street view, Overture Maps integration, LiDAR visualization, a GeoAgent for AI-assisted analysis, and a GeoEditor for feature creation. External plugins can render on the host's shared deck.gl instance via `app.getDeckGL()`. Plugins load from bundled directories, remote manifests, or local development paths.

**Python Integration.** The `geolibre` Python package embeds the full app in Jupyter notebooks as an anywidget, with a leafmap-style API and two-way project sync. An optional FastAPI sidecar handles heavier processing workflows like vector-to-FlatGeobuf conversion, raster-to-COG conversion, and Whitebox toolbox operations. For data scientists who live in notebooks, this means full GIS capabilities without leaving Python.

**In-Browser Vector Operations.** Common geometry tools — buffer, centroids, convex hull, dissolve, bounding box, simplify, clip, intersection, difference, union — run entirely in the browser using Turf.js. There's also an in-browser GeoPandas engine via Pyodide for operations that need it, producing the same results as the Python sidecar with no server required.

### Use Cases

- **Data dashboards with spatial components** — Build interactive maps showing real-time sensor data, delivery routes, or property information. The DuckDB-WASM engine handles filtering and aggregation on the client, reducing API load.
- **Geospatial data exploration** — Drag and drop large GeoParquet or Shapefile datasets, run SQL queries to understand the data, and create visualizations without writing frontend map code from scratch.
- **Climate and environmental monitoring** — Visualize time-series raster data with the Time Slider plugin, overlay multiple data sources, and export analysis results for reports.
- **Urban planning and real estate** — Categorize parcels by zoning or value, clip layers to administrative boundaries, and generate print-ready maps for stakeholders.
- **Embedded maps in web applications** — Use the `maponly` chrome-free mode to embed a clean map view in your application with URL parameters controlling the initial state.
- **Jupyter notebook workflows** — Data scientists can use the Python package to create maps inline, sync projects between notebook and desktop, and leverage the full DuckDB Spatial SQL engine from Python.

### Pros and Cons

Pros:
- DuckDB-WASM spatial SQL in the browser is a genuine architectural advantage. You can query millions of spatial features without a backend, which eliminates an entire category of server-side processing for many applications.
- The format support is comprehensive. GeoParquet, FlatGeobuf, PMTiles, COG — these are the modern cloud-native geospatial formats that the community has been moving toward, and GeoLibre reads them all natively.
- The Tauri v2 desktop build adds real value over pure web GIS tools. Local file access, MBTiles support, and filesystem dialogs make it a viable QGIS alternative for many workflows.
- Active development from an established open-source geospatial author with a track record of maintaining popular projects.

Cons:
- At 648 stars and two weeks old, the community is still small. Plugin ecosystem is nascent, and you'll likely encounter edge cases that need upstream fixes.
- The Python sidecar adds deployment complexity. Heavy operations (FlatGeobuf conversion, raster processing, Whitebox tools) require a running Python server, which complicates container-based deployments.
- No built-in authentication or multi-user support. This is a single-user workspace, not a collaborative GIS platform. Teams need to handle access control at the infrastructure level.

### Getting Started

```bash
# Clone and run the web dev server
git clone https://github.com/opengeos/GeoLibre.git
cd GeoLibre
npm install
npm run dev
```

Open http://localhost:5173. Drag a GeoJSON, Shapefile, or GeoParquet file onto the map to add it as a layer. Open the SQL Workspace to run DuckDB Spatial queries:

```sql
-- Query loaded layers by name
SELECT * FROM my_layer WHERE population > 10000;

-- Spatial join: find points within polygons
SELECT p.name, z.zone_name
FROM points p, zones z
WHERE ST_Within(p.geometry, z.geometry);
```

For desktop builds:

```bash
# Requires Rust toolchain
npm run tauri:dev
```

For Docker deployment:

```bash
docker build -t geolibre .
docker run --rm -p 8080:80 geolibre
```

The Python package for Jupyter:

```bash
pip install geolibre
```

```python
import geolibre
m = geolibre.Map()
m.add_vector("data/cities.geojson")
m
```

### Alternatives

**Kepler.gl** — Uber's open-source geospatial analysis tool, also browser-based with deck.gl rendering. Kepler.gl is more mature (8 years of development) and better for one-off data exploration, but it lacks GeoLibre's SQL workspace, desktop build, and plugin system. Choose Kepler.gl if you need a quick visualization of a CSV or GeoJSON file and don't need persistent projects or spatial SQL.

**QGIS** — The established open-source desktop GIS with 20+ years of development. QGIS is far more feature-complete for traditional GIS workflows (geoprocessing, cartographic composition, print layouts, hundreds of plugins). But it's desktop-only, Python-scripted, and has a steep learning curve for web developers. Choose QGIS when you need production cartography or advanced geoprocessing that GeoLibre doesn't support yet.

**MapLibre GL JS + custom code** — If you just need a map with markers and popups, building directly on MapLibre GL JS (which GeoLibre uses internally) is simpler and lighter. You avoid the DuckDB-WASM and Tauri overhead. Choose this approach when your spatial needs are simple and you want full control over the rendering pipeline.

### Verdict

GeoLibre is the most practical open-source GIS platform I've seen for web developers. The DuckDB-WASM spatial SQL engine alone changes how you think about client-side geospatial applications — querying millions of features in the browser without a backend is a real architectural shift. Combined with the comprehensive format support, cross-platform Tauri build, and Python notebook integration, it covers a surprising range of use cases for a two-week-old project. The 648 stars and rapid community growth suggest this is resonating with developers who've been waiting for a modern, code-first GIS tool. It's early, and you'll hit rough edges, but if you're building anything with maps in mid-2026, GeoLibre deserves a serious look.
