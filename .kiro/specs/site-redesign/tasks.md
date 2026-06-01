# Implementation Plan: Site Redesign ("Luminous Depth")

## Overview

This plan converts the OpenRadar visual overhaul design into incremental, code-only steps for TypeScript (Astro 6 + React 19 + Tailwind CSS v4). The approach front-loads the token-driven design system and the extracted pure-logic modules (theme, search, formatting, view-models), property-tests that logic core, then restyles the layout, shared components, the React island, and the four page types — wiring everything together while preserving the fixed contracts (content schema, routes, `search-results` event, SEO emission, static build).

Pure logic is extracted into small modules so it can be reused by components without behavior change and validated with `fast-check` property tests. Presentation, structure, SEO, and build integrity are covered by example/snapshot/smoke tests. Test sub-tasks are marked optional with `*`.

## Tasks

- [x] 1. Set up test tooling
  - [x] 1.1 Add dev-only test tooling and configuration
    - Add Vitest, `fast-check`, `@testing-library/dom`, `@testing-library/react`, and `jsdom` as dev dependencies in `package.json` (no runtime/bundle dependencies added)
    - Add a `test` script (single-run, e.g. `vitest --run`) and create `vitest.config.ts` configured with the `jsdom` environment for DOM-dependent assertions
    - Create the `test/` and `test/properties/` directories used by later tasks
    - _Requirements: 12.6_

- [x] 2. Establish the design system in the global stylesheet
  - [x] 2.1 Replace the editorial palette with the dual-mode token layer
    - In `src/styles/global.css`, define raw semantic tokens on `:root` (light) and `:root[data-theme="dark"]` (dark) for color, plus `color-scheme` per mode
    - Add type scale, spacing/rhythm, radius, elevation/shadow, and motion tokens per the Design System tables
    - Expose every raw token to Tailwind via `@theme inline { --color-bg: var(--bg); … }` and register `@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *))`
    - _Requirements: 1.1, 1.3, 1.4, 2.1, 10.5_
  - [x] 2.2 Add reusable visual primitives, animation keyframes, and the reduced-motion guard
    - In `src/styles/global.css`, define single shared primitives consumed across pages: `.surface`/`.surface-interactive`, `.btn`/`.btn-primary`/`.btn-ghost` (≥44px target), `.pill`, `.chip` (with selected state), `.label`, `.ulink`, and `.prose`
    - Add the `reveal-up` entrance keyframes using transform/opacity only, with durations capped under 600ms, plus a global `@media (prefers-reduced-motion: reduce)` guard that disables/reduces non-essential motion
    - _Requirements: 1.5, 9.1, 9.3, 9.4, 9.5, 13.5_
  - [ ]\* 2.3 Write WCAG AA contrast tests for the token palette
    - Table-driven test computing the contrast ratio of every defined text/background and accent pairing in both modes; assert ≥ 4.5:1 for body text and ≥ 3:1 for large text / meaningful UI
    - _Requirements: 2.7, 11.1_

- [x] 3. Implement theme resolution logic
  - [x] 3.1 Create the pure theme-logic module
    - Create `src/lib/theme-logic.ts` exporting `type ThemeMode = 'light' | 'dark'`, `resolveTheme(stored, systemPrefersDark)`, `toggleTheme(current)`, and constants `STORAGE_KEY = 'or-theme'` and `DOM_ATTR = 'data-theme'`
    - `resolveTheme` returns the stored preference when present, otherwise the system signal when determined, otherwise `'light'`
    - _Requirements: 2.2, 2.3, 2.4, 2.5_
  - [ ]\* 3.2 Write property test for theme resolution precedence
    - **Property 1: Theme resolution precedence**
    - **Validates: Requirements 2.2, 2.3, 2.5**
  - [ ]\* 3.3 Write property test for the theme toggle switch
    - **Property 2: Theme toggle is a self-inverse switch**
    - **Validates: Requirements 2.4**

- [x] 4. Implement search/filter logic
  - [x] 4.1 Extract the pure search-logic module
    - Create `src/components/search-logic.ts` exporting `filterProjects(projects, query, selectedTag)` (case-insensitive substring over name/description/tags AND tag membership) and `buildSearchEventDetail(projects, filtered, query, selectedTag)` returning `{ slugs, total, count, query, selectedTag }`
    - Behavior must be byte-for-byte equivalent to the current inline `SearchBar` logic and conform to the `Search_Event_Contract`
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.6, 8.7, 12.5_
  - [ ]\* 4.2 Write property test for search filter membership
    - **Property 3: Search filter membership characterization**
    - **Validates: Requirements 8.1, 8.2, 8.3, 8.6**
  - [ ]\* 4.3 Write property test for the search event detail contract
    - **Property 4: Search event detail conforms to the contract**
    - **Validates: Requirements 8.4, 8.7, 12.5**

- [x] 5. Implement formatting helpers
  - [x] 5.1 Create the formatting helper module
    - Create `src/lib/format.ts` exporting `formatNumber(n)` (plain integer below 1000; abbreviated thousands with one decimal, trailing `.0` removed, `k` suffix at ≥1000), `padIndex(index)` (zero-padded two-digit string), and `takeTags(tags)` (leading prefix of at most four)
    - _Requirements: 4.3, 4.4, 4.6_
  - [ ]\* 5.2 Write property test for count abbreviation formatting
    - **Property 7: Count abbreviation formatting**
    - **Validates: Requirements 4.3**
  - [ ]\* 5.3 Write property test for the at-most-four tag rule
    - **Property 8: At most four tags rendered**
    - **Validates: Requirements 4.4**
  - [ ]\* 5.4 Write property test for the zero-padded two-digit index
    - **Property 9: Zero-padded two-digit index**
    - **Validates: Requirements 4.6**

- [x] 6. Implement project and tag view-model helpers
  - [x] 6.1 Create the project view-model helpers
    - Create `src/lib/projects.ts` exporting `computeStats(projects)` (project count, distinct-tag/category count, combined stars treating missing as 0), `sortByPublishedDesc(projects)` (permutation non-increasing by `publishedAt`), and `relatedProjects(current, others)` (≤3, excludes self, each shares ≥1 tag)
    - _Requirements: 3.2, 3.4, 5.5_
  - [ ]\* 6.2 Write property test for homepage stats including zeros
    - **Property 5: Homepage stats are correct, including zeros**
    - **Validates: Requirements 3.2**
  - [ ]\* 6.3 Write property test for project index ordering
    - **Property 6: Project index ordering**
    - **Validates: Requirements 3.4**
  - [ ]\* 6.4 Write property test for related-project selection invariants
    - **Property 10: Related-project selection invariants**
    - **Validates: Requirements 5.5**
  - [x] 6.5 Create the tag aggregation helpers
    - Create `src/lib/tags.ts` exporting `aggregateTags(projects)` returning `TagAggregate[]` (exactly the distinct tags, each with its project count, ordered by count descending) and `projectsForTag(projects, tag)` (exactly the projects whose tags include the tag)
    - _Requirements: 6.1, 6.3, 6.5_
  - [ ]\* 6.6 Write property test for tag aggregation completeness and ordering
    - **Property 11: Tag aggregation completeness and ordering**
    - **Validates: Requirements 6.1, 6.3**
  - [ ]\* 6.7 Write property test for tag-detail membership
    - **Property 12: Tag-detail membership**
    - **Validates: Requirements 6.5**

- [x] 7. Checkpoint - logic core and design system
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Integrate theme controller and update the layout
  - [x] 8.1 Update `Layout.astro` with the pre-paint theme script and non-blocking fonts
    - Add the `is:inline` theme-resolution script as the first child of `<head>` so it sets `document.documentElement.dataset.theme` before first paint (FOUC-free), wrapped in `try/catch` to fall back to system then `light`
    - Add `<meta name="color-scheme" content="light dark">` and a `<meta name="theme-color">`; load Google Fonts non-blocking (`media="print"` → `onload="this.media='all'"` with `<noscript>` fallback and `display=swap`)
    - Preserve all existing SEO emission unchanged: title, meta description, canonical, Open Graph, Twitter Card, JSON-LD; keep the `Props` interface and single `<slot/>`
    - _Requirements: 2.2, 2.3, 2.6, 12.4, 13.1, 13.2_
  - [ ]\* 8.2 Write DOM tests for theme application and toggle persistence
    - Assert the inline script is the first `<head>` child and sets `data-theme` synchronously before body; toggle updates `data-theme`, persists to `localStorage['or-theme']`, and updates `aria-pressed`/`theme-color`; storage-throws path falls back without error
    - _Requirements: 2.4, 2.5, 2.6_

- [x] 9. Redesign navigation header and footer
  - [x] 9.1 Redesign `Header.astro` with theme toggle and mobile navigation
    - Sticky top header on `surface`/blur with bottom `line` border; brand lockup; desktop nav links to Homepage, Tag index, and external Source (`rel="noopener noreferrer"`)
    - Add the vanilla-JS theme toggle `<button>` (`aria-label`, `aria-pressed`, sun/moon icons) wired to flip `data-theme` and persist; active link via `aria-current="page"`
    - Add a hamburger disclosure (`aria-expanded`, `aria-controls`) for the mobile breakpoint that keeps all links reachable; touch targets ≥ 44×44px
    - _Requirements: 2.4, 2.5, 7.1, 7.2, 7.3, 7.4, 7.5, 10.4_
  - [x] 9.2 Restyle `Footer.astro` to the new tokens
    - Use the `<footer>` landmark; preserve site identity/colophon, the Explore link group, the Resources link group, and the current copyright year
    - _Requirements: 7.6_
  - [ ]\* 9.3 Write accessibility tests for header navigation
    - Assert `aria-current` on the active nav link, `aria-pressed` on the theme toggle, `aria-expanded`/`aria-controls` on the mobile disclosure, accessible names on icon-only controls, and `rel="noopener noreferrer"` on the external Source link
    - _Requirements: 7.2, 7.4, 11.2, 11.4_

- [x] 10. Redesign card and badge components
  - [x] 10.1 Restyle `ProjectCard.astro` as an elevated surface using shared helpers
    - Apply `.surface-interactive` (radius/shadow, hover/focus-within lift + glow using transform/opacity); display name, description, language pill, tag list, stars, forks; link the whole card to `/projects/{slug}` with a visible `:focus-visible` ring
    - Use `formatNumber` for star/fork counts, `takeTags` to render at most four tags, and `padIndex` for the zero-padded two-digit index when `index` is provided
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 11.2_
  - [x] 10.2 Restyle `TagBadge.astro` as a soft pill
    - Render as a `.chip` pill (mono, `--radius-full`, accent `#` glyph, `line` border, hover to `line-strong`); keep the `name` prop unchanged
    - _Requirements: 1.5, 5.6_

- [x] 11. Restyle the search island
  - [x] 11.1 Refactor `SearchBar.tsx` to consume `search-logic` and restyle with tokens
    - Import and call `filterProjects` and `buildSearchEventDetail`; keep the `useEffect` that dispatches `search-results` and the `detail` shape identical
    - Replace hard-coded hex with semantic token utilities; use `.chip` for tag filters and `.label` for the result count; keep markers and behavior equivalent
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.6, 8.7, 12.5, 13.3_
  - [ ]\* 11.2 Write integration tests for the search island
    - Assert a `search-results` event is dispatched on input/tag change with the contract detail; the empty filtered set toggles `#projects-empty` and hides `.project-item`s
    - _Requirements: 8.4, 8.5_

- [x] 12. Redesign pages and verify integration
  - [x] 12.1 Restyle `index.astro` (hero, stats, featured, project index)
    - Redesign the hero (headline, supporting copy, last-updated date); render the stats strip via `computeStats` (project count, category count, combined stars, including zeros); render the featured grid when any featured entry exists; render the searchable index ordered by `sortByPublishedDesc`
    - Preserve all existing data computations and the grid-sync markers the inline script depends on (`#projects-grid`, `#projects-empty`, `.project-item[data-slug]`) and the grid-sync script; apply staggered entrance animations
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 8.5, 9.1, 12.5_
  - [x] 12.2 Restyle `projects/[slug].astro`
    - Preserve `getStaticPaths`; render breadcrumb, header (name, language, added date, description, tags, stars, forks), and a "View on GitHub" control with `target="_blank"` + `rel="noopener noreferrer"`
    - Apply `.prose` to the Markdown body (headings, paragraphs, lists, links, inline code, code blocks); render a related section of up to three tag-sharing projects via `relatedProjects`; tags link to `/tags/{tag}`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_
  - [x] 12.3 Restyle `tags/index.astro` and add the empty state
    - List every tag with its project count via `aggregateTags`, ordered by count descending, each linking to `/tags/{tag}`; render a breadcrumb; render a new empty-state message when no tags exist
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.6_
  - [x] 12.4 Restyle `tags/[tag].astro`
    - Preserve `getStaticPaths` and the `CollectionPage` JSON-LD; show the selected tag, its project count via `projectsForTag`, a card per project, and a breadcrumb
    - _Requirements: 6.5, 6.6_
  - [ ]\* 12.5 Write accessibility-structure and empty-state tests for each page type
    - Assert exactly one `<main>`, one `<header>`, one `<footer>`, a single `<h1>` with no skipped heading levels, and accessible names on icon-only controls; assert the tag-index empty-state renders the message and no list; assert the detail-page external link carries `target="_blank"` + `rel="noopener noreferrer"`
    - _Requirements: 5.3, 6.2, 11.4, 11.5, 11.6_
  - [ ]\* 12.6 Write SEO preservation snapshot tests
    - Assert the rendered `<head>` for each page type contains title, meta description, canonical, Open Graph, Twitter Card, and JSON-LD; assert tag detail keeps its `CollectionPage` JSON-LD
    - _Requirements: 12.4_
  - [ ]\* 12.7 Write build and hydration smoke tests
    - Run `npm run build` and assert it completes with no new errors and emits the four route types (`/`, `/projects/{slug}`, `/tags`, `/tags/{tag}`); assert only `SearchBar` uses a `client:*` directive (`client:load`) and that decorative effects add no new image assets
    - _Requirements: 12.1, 12.2, 12.3, 12.6, 13.3, 13.5_

- [x] 13. Final checkpoint - full build and test suite
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional test sub-tasks and can be skipped for a faster MVP; core implementation tasks are never optional.
- Each task references specific requirement sub-clauses for traceability; each property sub-task references a property from the design document and the requirements it validates.
- Property-based tests use `fast-check` (≥100 iterations each) against the extracted pure modules (`theme-logic.ts`, `search-logic.ts`, `format.ts`, `projects.ts`, `tags.ts`); example/snapshot/smoke tests cover presentation, structure, SEO, and build integrity.
- Fixed contracts are preserved throughout: content collection schema, routes, the `search-results` CustomEvent, SEO emission, and the static build pipeline.
- Each property sub-task should be tagged in code with `// Feature: site-redesign, Property {number}: {property_text}`.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "2.1", "3.1", "4.1", "5.1", "6.1", "6.5"] },
    {
      "id": 1,
      "tasks": [
        "2.2",
        "2.3",
        "3.2",
        "3.3",
        "4.2",
        "4.3",
        "5.2",
        "5.3",
        "5.4",
        "6.2",
        "6.3",
        "6.4",
        "6.6",
        "6.7"
      ]
    },
    { "id": 2, "tasks": ["8.1", "9.1", "9.2", "10.1", "10.2", "11.1"] },
    { "id": 3, "tasks": ["12.1", "12.2", "12.3", "12.4"] },
    { "id": 4, "tasks": ["8.2", "9.3", "11.2", "12.5", "12.6", "12.7"] }
  ]
}
```
