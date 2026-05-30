---
name: markitdown
description: "A Python tool for converting files and office documents to Markdown. Supports PDF, PowerPoint, Word, Excel, images, audio, HTML, and more — all with a clean, unified output format."
url: https://github.com/microsoft/markitdown
stars: 54800
forks: 2800
language: Python
tags: ["markdown", "document-conversion", "python", "cli", "ai"]
featured: true
publishedAt: 2024-11-15
---

## markitdown

MarkItDown is a utility for converting various files to Markdown — with a focus on preserving the structure and content most useful for LLM and text analysis pipelines.

### Why it matters

Most document formats are opaque to AI systems. MarkItDown bridges the gap by converting PDFs, Word docs, PowerPoints, spreadsheets, images, and even audio files into clean Markdown that LLMs can actually reason about.

### Key Features

- **Broad format support** — PDF, DOCX, PPTX, XLSX, images (with OCR), audio (with transcription), HTML, CSV, JSON, XML, and more
- **LLM-optimized output** — structured Markdown designed for downstream AI consumption
- **Plugin architecture** — extend with custom converters
- **Simple CLI** — pipe-friendly for integration into existing workflows

### Language & Stack

Python · MIT License

### Getting Started

```bash
pip install markitdown
markitdown document.pdf > output.md
```
