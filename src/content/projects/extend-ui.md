---
name: extend-ui
description: "Extend UI is an open-source React component library for building document-heavy apps — PDF, DOCX, XLSX viewers, e-signature, file upload, and more, all via shadcn CLI."
url: https://github.com/extend-hq/ui
stars: 982
forks: 55
language: TypeScript
tags: ["react", "components", "documents", "shadcn", "pdf-viewer", "typescript"]
featured: false
publishedAt: 2026-06-13
---

## Extend UI

### Overview

Extend UI is a set of open-source React components for document agents, user-facing document flows, and internal tools. It hit nearly 1,000 GitHub stars within a month of its May 2026 launch, which is notable for a component library without a massive marketing push. The growth comes from developers who've been cobbling together PDF viewers, file uploaders, and document processing UIs from scratch — and finally have a polished, production-tested alternative.

The project comes from [Extend](https://www.extend.ai), a company that builds document processing infrastructure. Extend UI started as their internal component layer. They evaluated existing file viewer and document component libraries, found them incomplete or poorly maintained, and built their own. The components are used in production at Extend across workflows that process millions of pages. That's the kind of dogfooding that matters — these aren't hobbyist components thrown together on a weekend.

The library includes 14 components: PDF, DOCX, and XLSX viewers, bounding box citations, file upload with drag-and-drop, file thumbnails, e-signature, document splitting, layout blocks for OCR output, and a Finder-style file browser. Everything installs via the shadcn CLI as copy-paste source code, not as an opaque npm dependency. You own the code, you customize it, and it works with your existing design system.

### Why it matters

If you've ever built a document-heavy product — an insurance claims portal, a legal review tool, a healthcare records system, an invoice processing dashboard — you know the pain. The PDF viewer options on npm are either heavyweight (PDF.js directly, which requires significant wrapper work) or abandoned. DOCX and XLSX viewers are even worse. Most teams end up building these components from scratch, burning weeks on edge cases like page rendering, zoom, search, and accessibility.

Extend UI fills this gap with components that are already battle-tested in production. The shadcn integration is the smart move here. Rather than creating another component library with its own design tokens and theming system, Extend UI meets developers where they already are. If your project uses shadcn/ui (and in mid-2026, a huge chunk of React projects do), you add Extend UI components the same way — `npx shadcn@latest add @extend/pdf-viewer` — and they blend into your existing codebase.

The document AI angle is what makes this timely. As more companies build AI-powered document processing pipelines — OCR extraction, intelligent document review, automated compliance checking — they need UI surfaces to display results. Extend UI's bounding box citations component, which overlays extracted values on source PDFs with field-level review controls, is exactly the kind of component that every document AI startup rebuilds internally. Now they don't have to.

### Key Features

**Shadcn CLI Integration.** Every Extend UI component installs via `npx shadcn@latest add @extend/component-name`. The code lands in your project as editable source files, not as an import from node_modules. This means you can modify internals, swap primitives, and match your design system without fighting library overrides. It's the same philosophy that made shadcn/ui explode in popularity, applied to a vertical that desperately needed it.

**PDF Viewer with OCR Overlays.** The PDF viewer goes beyond basic page rendering. The layout blocks component lets you inspect OCR output with selectable text blocks, confidence scores, markdown content, and bounding box overlays that stay connected to the rendered page. For anyone building document AI review tools, this component alone saves weeks of integration work.

**Bounding Box Citations.** This is the standout component for AI-powered document processing. It displays extracted field values side-by-side with the source PDF, with highlighted regions showing where each value was found. Users can review, edit, and approve extractions with form controls, JSON diffing, and page overlays. If you're building an invoice processing tool or a contract review system, this is the UI pattern you need.

**Finder-Style File Browser.** A complete file system component with icon, list, column, and gallery views. It opens PDF, DOCX, XLSX, and image files in viewer dialogs. Supports lazy-loaded child directories, custom file URL signing, and object-store manifests. Think macOS Finder, but as a React component you can drop into any admin panel or document management system.

**E-Signature Component.** A built-in e-signature pad for document signing workflows. Rather than integrating a third-party e-signature service for simple signing use cases, you get a component that handles the UI side — draw, type, clear, confirm — and leaves the backend contract logic to your application.

**Full Office Format Support.** Separate viewers for PDF, DOCX, and XLSX files, each as standalone components. The DOCX viewer renders Word documents with formatting preserved. The XLSX viewer handles spreadsheets with cell navigation. No need to pull in mammoth.js or SheetJS directly — the components handle the rendering internally.

**Production-Proven at Scale.** These components aren't experimental. They run in production at Extend, processing millions of document pages. Bug fixes and performance improvements from that production usage flow back into the open-source library. That's a level of quality assurance that most open-source component libraries can't claim.

### Use Cases

- **Document AI review tools** — Build human-in-the-loop review interfaces for OCR extraction, intelligent document processing, or automated compliance checking. The bounding box citations component is purpose-built for this.
- **Internal admin panels** — Add document viewing and file management to any internal tool. The Finder-style file browser and PDF/DOCX/XLSX viewers handle the common "show me that file" use case without custom code.
- **Insurance and legal portals** — Claims processing, contract review, and case management systems that need to display, annotate, and sign documents in the browser.
- **Healthcare records systems** — Patient document viewing with HIPAA-compliant rendering. The components render client-side, so document content doesn't need to leave your infrastructure.
- **Invoice and receipt processing** — Display extracted invoice data alongside the source document with highlighted regions for verification and correction.
- **Document-heavy SaaS products** — Any product where users upload, view, annotate, or sign documents. The e-signature and file upload components handle the interactive parts.

### Pros and Cons

Pros:
- Shadcn CLI integration means components install as editable source code, not opaque dependencies. You own and customize everything.
- Production-tested at scale (millions of pages processed at Extend), which is rare for open-source component libraries launched this recently.
- Covers the full document lifecycle — viewing, uploading, annotating, signing, browsing — rather than just one piece. Most alternatives only handle PDF viewing.
- MIT licensed with active maintenance. The Extend team has financial incentive to keep this high-quality since it's their public-facing component layer.

Cons:
- React-only. If you're using Vue, Svelte, or vanilla JS, you're out of luck. The shadcn ecosystem is React/Tailwind-centric by design.
- 14 components is a focused set, not a comprehensive document toolkit. Advanced features like collaborative annotation, real-time editing, or version history aren't included.
- Relatively young project (launched May 2026). While the components are production-proven at Extend, the open-source community hasn't had time to find edge cases across diverse environments and use cases.

### Getting Started

```bash
# Install individual components via shadcn CLI
npx shadcn@latest add @extend/pdf-viewer
npx shadcn@latest add @extend/docx-viewer
npx shadcn@latest add @extend/xlsx-viewer
npx shadcn@latest add @extend/file-upload
npx shadcn@latest add @extend/file-thumbnail
npx shadcn@latest add @extend/e-signature

# Use in your React component
```

```tsx
import { PDFViewer } from "@/components/ui/pdf-viewer"

export default function DocumentPage() {
  return <PDFViewer file="/sample.pdf" className="h-[720px]" />
}
```

For the full development setup:

```bash
git clone https://github.com/extend-hq/ui.git
cd ui
pnpm install
pnpm v4:dev
```

The docs site runs at `http://localhost:4000` with live examples of every component.

### Alternatives

**react-pdf (PDF.js wrapper)** — The most popular React PDF viewer, wrapping Mozilla's PDF.js. It handles basic PDF rendering well but lacks the document processing features Extend UI provides — no OCR overlays, no bounding box citations, no DOCX/XLSX support. Choose react-pdf when you only need simple PDF viewing and don't want to adopt the shadcn ecosystem.

**File Viewer (react-file-viewer)** — Supports a wider range of file formats (images, videos, CSVs) but with minimal customization and no active maintenance since 2022. It renders files in basic viewers without the production-grade polish of Extend UI. Good for quick prototypes, not for production document workflows.

**Custom PDF.js integration** — Building your own PDF viewer on top of PDF.js gives you full control but costs 2-4 weeks of engineering time for basic features (zoom, search, page navigation, text selection). Extend UI gives you that plus DOCX/XLSX viewers and document processing components in a single install. The custom route only makes sense if you have very specific rendering requirements that no library can meet.

### Verdict

Extend UI is the document component library I wish existed three years ago. Every team building document-heavy products ends up reinventing the same viewers, uploaders, and annotation tools. This library covers the common cases with production-quality components and integrates cleanly with the dominant React component ecosystem (shadcn). The bounding box citations component, in particular, is a gift to anyone building AI document processing interfaces — it's the exact UI pattern that every intelligent document processing startup builds internally, now available as a single CLI command. At 982 stars in its first month, it's gaining traction fast. If your React project involves displaying, uploading, or annotating documents, install it before building your own.
