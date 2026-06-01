# Requirements Document

## Introduction

OpenRadar is an existing static website (Astro 6 + React 19 + Tailwind CSS v4) that serves as a hand-curated index of trending open-source projects. The current visual theme is editorial / print / terminal inspired: a warm paper background, ink text, hairline borders, a single vermilion accent, a Fraunces display serif, Inter body, and JetBrains Mono labels.

This feature is a complete visual overhaul of every page and component. The goal is a polished, contemporary, "beautiful" presentation while preserving all existing functionality: client-side search and tag filtering, project listings, tag browsing, project detail pages, SEO metadata and structured data, responsive layout, and accessibility.

This is a presentation-layer redesign. The content collection schema, the build pipeline, the routing structure, and the `search-results` event contract between the React `SearchBar` and the statically rendered grid are treated as fixed contracts that the redesign must continue to honor.

### Proposed Visual Direction (key decision for review)

The redesign proposes a **modern "luminous depth" aesthetic** that replaces the flat paper-and-hairline look with:

- A refined neutral palette with a vivid, modern accent, available in both **light and dark modes** with a user-controllable theme toggle.
- Layered surfaces with soft elevation (shadows, subtle gradients, and/or glass effects) instead of flat hairline frames.
- A confident modern typographic scale that keeps an expressive display face for headings and a clean sans for body.
- Tasteful entrance and hover motion that respects reduced-motion preferences.

The specific palette, type choices, and degree of effect (gradients vs. glass vs. flat depth) are the primary open decisions. The requirements below are written so the structure holds regardless of the final palette, and the exact aesthetic values can be tuned during review.

## Glossary

- **OpenRadar_Site**: The complete redesigned website, comprising all pages, components, and shared styles.
- **Design_System**: The set of shared design tokens (colors, typography, spacing, elevation, radius, motion) and reusable visual primitives defined in the global stylesheet and Tailwind theme configuration.
- **Theme_Controller**: The mechanism that selects and applies the active color theme (light or dark) for the OpenRadar_Site.
- **Theme_Mode**: A selectable color theme; one of `light` or `dark`.
- **Navigation_Header**: The sticky top navigation component shared across all pages.
- **Site_Footer**: The footer component shared across all pages.
- **Homepage**: The index page (`index.astro`) containing the hero, stats strip, featured grid, and searchable project index.
- **Project_Card**: The reusable card component representing a single project in a grid.
- **Project_Detail_Page**: The dynamic per-project page (`projects/[slug].astro`).
- **Tag_Index_Page**: The page listing all tags (`tags/index.astro`).
- **Tag_Detail_Page**: The dynamic per-tag page (`tags/[tag].astro`).
- **Search_Interface**: The React `SearchBar` component plus the statically rendered project grid it controls via the `search-results` event.
- **Animation_System**: The shared set of entrance animations, hover transitions, and micro-interactions defined by the Design_System.
- **Reduced_Motion_Preference**: The user's operating-system or browser setting expressed through the `prefers-reduced-motion` media query.
- **Project_Content**: A project entry from the `projects` content collection, with frontmatter fields name, description, url, stars, forks, language, tags, featured, and publishedAt.
- **Search_Event_Contract**: The existing `search-results` CustomEvent interface (`detail` containing `slugs`, `total`, `count`, `query`, `selectedTag`) used to synchronize the Search_Interface with the rendered grid.
- **WCAG_AA**: Web Content Accessibility Guidelines 2.1 Level AA conformance criteria.

## Requirements

### Requirement 1: Unified Design System

**User Story:** As a visitor, I want a cohesive and modern visual language across the whole site, so that the experience feels polished and professionally designed.

#### Acceptance Criteria

1. THE Design_System SHALL define a complete set of design tokens for color, typography, spacing, border radius, elevation, and motion in the global stylesheet using Tailwind v4 `@theme` tokens.
2. THE Design_System SHALL apply the same tokens consistently across the Homepage, Project_Detail_Page, Tag_Index_Page, Tag_Detail_Page, Navigation_Header, and Site_Footer.
3. THE Design_System SHALL define a primary accent color and use the primary accent color consistently for interactive and emphasis elements across all pages.
4. THE Design_System SHALL define a typographic scale with distinct token-driven styles for display headings, body text, and metadata labels.
5. WHERE a reusable visual primitive (such as a surface, card, button, or badge) is used on more than one page, THE Design_System SHALL provide a single shared definition for that primitive.

### Requirement 2: Light and Dark Theme Modes

**User Story:** As a visitor, I want to view the site in a light or dark theme, so that I can read comfortably in my preferred lighting.

#### Acceptance Criteria

1. THE Design_System SHALL define a complete color token set for both the `light` Theme_Mode and the `dark` Theme_Mode.
2. WHEN the OpenRadar_Site loads and no stored Theme_Mode preference exists, THE Theme_Controller SHALL apply the Theme_Mode that matches the operating-system color-scheme preference.
3. IF no stored Theme_Mode preference exists and the operating-system color-scheme preference cannot be determined, THEN THE Theme_Controller SHALL apply the `light` Theme_Mode.
4. WHEN a visitor activates the theme toggle control, THE Theme_Controller SHALL switch the active Theme_Mode between `light` and `dark` and apply the new Theme_Mode to the current page.
5. WHEN a visitor selects a Theme_Mode, THE Theme_Controller SHALL persist the selected Theme_Mode so that the same Theme_Mode is applied on subsequent page loads.
6. WHEN a page is first rendered with a stored or system Theme_Mode, THE Theme_Controller SHALL apply that Theme_Mode before first paint so that no flash of the opposite theme is visible.
7. THE OpenRadar_Site SHALL maintain WCAG_AA text contrast ratios in both the `light` Theme_Mode and the `dark` Theme_Mode.

### Requirement 3: Homepage Redesign

**User Story:** As a visitor, I want a striking and informative homepage, so that I immediately understand what OpenRadar offers and want to explore.

#### Acceptance Criteria

1. THE Homepage SHALL present a redesigned hero section containing the site headline, a supporting description, and the most recent update date.
2. THE Homepage SHALL present a stats section displaying the indexed project count, the category count, and the combined star count, including when one or more of those counts is zero.
3. WHERE at least one Project_Content entry is marked featured, THE Homepage SHALL present a featured section containing a Project_Card for each featured entry.
4. THE Homepage SHALL present a complete project index section containing the Search_Interface and a Project_Card for every Project_Content entry, ordered by publish date with the most recent entry first.
5. THE Homepage SHALL preserve all data values currently shown (project count, category count, combined star total, and last-updated date) using the same source content collection.

### Requirement 4: Project Card Redesign

**User Story:** As a visitor browsing the index, I want attractive and scannable project cards, so that I can quickly compare projects and choose one to open.

#### Acceptance Criteria

1. THE Project_Card SHALL display the project name, description, primary language, tag list, star count, and fork count.
2. THE Project_Card SHALL link to the corresponding Project_Detail_Page at the route `/projects/{slug}`.
3. WHEN a star count or fork count of 1000 or greater is displayed, THE Project_Card SHALL format the value in abbreviated thousands form (for example, `54.8k`).
4. THE Project_Card SHALL display at most four tags from the project's tag list.
5. WHEN a visitor hovers over or keyboard-focuses a Project_Card, THE Project_Card SHALL present a visible interactive-state treatment defined by the Design_System.
6. WHERE an `index` value is provided to a Project_Card, THE Project_Card SHALL display the index value as a zero-padded two-digit number.

### Requirement 5: Project Detail Page Redesign

**User Story:** As a visitor, I want a beautiful and readable project detail page, so that I can learn about a project and act on it.

#### Acceptance Criteria

1. THE Project_Detail_Page SHALL display a breadcrumb navigation trail leading from the index to the current project.
2. THE Project_Detail_Page SHALL display the project name, language, added date, description, tag list, star count, and fork count.
3. THE Project_Detail_Page SHALL display a control that links to the project's external repository URL, opening in a new browsing context with `rel="noopener noreferrer"`.
4. THE Project_Detail_Page SHALL render the project's Markdown body content with redesigned typographic styling for headings, paragraphs, lists, links, inline code, and code blocks.
5. WHERE other Project_Content entries share at least one tag with the current project, THE Project_Detail_Page SHALL display a related section containing up to three related Project_Card entries.
6. WHEN a visitor activates a tag on the Project_Detail_Page, THE Project_Detail_Page SHALL navigate to the corresponding Tag_Detail_Page at the route `/tags/{tag}`.

### Requirement 6: Tag Browsing Redesign

**User Story:** As a visitor, I want elegant tag browsing pages, so that I can explore projects by category.

#### Acceptance Criteria

1. THE Tag_Index_Page SHALL display every tag that appears in the content collection, along with the count of projects for each tag.
2. IF the content collection contains no tags, THEN THE Tag_Index_Page SHALL display an empty-state message in place of the tag list.
3. THE Tag_Index_Page SHALL order tags by project count in descending order.
4. WHEN a visitor activates a tag on the Tag_Index_Page, THE Tag_Index_Page SHALL navigate to the corresponding Tag_Detail_Page at the route `/tags/{tag}`.
5. THE Tag_Detail_Page SHALL display the selected tag, the count of projects filed under the selected tag, and a Project_Card for each project filed under the selected tag.
6. THE Tag_Index_Page and the Tag_Detail_Page SHALL each display a breadcrumb navigation trail reflecting the current location.

### Requirement 7: Navigation and Footer Redesign

**User Story:** As a visitor, I want a refined header and footer, so that I can orient myself and navigate the site on any device.

#### Acceptance Criteria

1. THE Navigation_Header SHALL remain fixed to the top of the viewport while the visitor scrolls.
2. THE Navigation_Header SHALL provide navigation links to the Homepage, the Tag_Index_Page, and the external source repository.
3. THE Navigation_Header SHALL provide the theme toggle control defined in Requirement 2.
4. WHEN the active route matches a Navigation_Header link, THE Navigation_Header SHALL present that link with a distinct active-state treatment.
5. WHILE the viewport width is at or below the mobile breakpoint defined by the Design_System, THE Navigation_Header SHALL present its navigation through a mobile-appropriate control that keeps all links reachable.
6. THE Site_Footer SHALL display the site identity, an explore link group, a resources link group, and the current copyright year.

### Requirement 8: Search and Filter Experience

**User Story:** As a visitor, I want to search and filter the project index, so that I can find relevant projects quickly.

#### Acceptance Criteria

1. WHEN a visitor enters text in the search field, THE Search_Interface SHALL filter the displayed projects to those whose name, description, or tags contain the entered text, evaluated case-insensitively.
2. WHEN a visitor selects a tag filter, THE Search_Interface SHALL filter the displayed projects to those that include the selected tag.
3. WHEN the search text and the selected tag filter are both active, THE Search_Interface SHALL display only projects that satisfy both conditions.
4. WHEN the filtered result set changes, THE Search_Interface SHALL dispatch the `search-results` event in conformance with the Search_Event_Contract.
5. WHEN the filtered result set is empty, THE Homepage SHALL display the empty-state message and hide the project grid.
6. WHEN a visitor clears the search text and the selected tag filter, THE Search_Interface SHALL display every Project_Content entry again.
7. THE Search_Interface SHALL display the count of matching projects relative to the total project count.

### Requirement 9: Motion and Micro-interactions

**User Story:** As a visitor, I want tasteful motion and interactive feedback, so that the site feels alive and responsive without being distracting.

#### Acceptance Criteria

1. WHEN a page loads, THE Animation_System SHALL apply entrance animations to primary content sections.
2. WHEN a visitor hovers over or keyboard-focuses an interactive element (link, button, card, tag, or filter chip), THE Animation_System SHALL apply a transition-based interactive-state treatment.
3. WHILE the Reduced_Motion_Preference indicates reduced motion, THE Animation_System SHALL disable or substantially reduce non-essential entrance and hover animations.
4. THE Animation_System SHALL complete each entrance animation within 600 milliseconds of its start.
5. THE Animation_System SHALL apply animations using GPU-accelerated properties (transform and opacity) for animated motion effects.

### Requirement 10: Responsive Layout

**User Story:** As a visitor on any device, I want the site to adapt to my screen, so that every page is usable on phones, tablets, and desktops.

#### Acceptance Criteria

1. THE OpenRadar_Site SHALL render without horizontal overflow at viewport widths from 320 pixels through 1920 pixels.
2. WHILE the viewport width is at or below the mobile breakpoint defined by the Design_System, THE Homepage, Tag_Index_Page, and Tag_Detail_Page SHALL present project and tag collections in a single-column layout.
3. WHILE the viewport width is at or above the desktop breakpoint defined by the Design_System, THE Homepage SHALL present the project index grid in a multi-column layout.
4. THE OpenRadar_Site SHALL provide touch-interactive controls with a minimum target size of 44 by 44 CSS pixels on touch viewports.
5. THE OpenRadar_Site SHALL scale typography responsively between the mobile breakpoint and the desktop breakpoint using fluid type sizing.

### Requirement 11: Accessibility

**User Story:** As a visitor using assistive technology or keyboard navigation, I want an accessible site, so that I can use every feature regardless of ability.

#### Acceptance Criteria

1. THE OpenRadar_Site SHALL meet WCAG_AA contrast requirements for text and meaningful non-text elements in both Theme_Modes.
2. WHEN a visitor navigates using the keyboard, THE OpenRadar_Site SHALL display a visible focus indicator on the currently focused interactive element.
3. THE OpenRadar_Site SHALL expose all interactive controls to keyboard operation in a logical focus order.
4. THE OpenRadar_Site SHALL provide a text alternative or accessible name for every icon-only control and meaningful image.
5. THE OpenRadar_Site SHALL use semantic landmark structure including a single main landmark, a header landmark, and a footer landmark on every page.
6. THE OpenRadar_Site SHALL define a single document-level page heading hierarchy on every page without skipping heading levels.

### Requirement 12: Functional and SEO Preservation

**User Story:** As the site owner, I want the redesign to keep all existing functionality, routes, and SEO intact, so that the overhaul changes appearance without breaking behavior or search visibility.

#### Acceptance Criteria

1. THE OpenRadar_Site SHALL preserve the existing routes for the Homepage, the Project_Detail_Page (`/projects/{slug}`), the Tag_Index_Page (`/tags`), and the Tag_Detail_Page (`/tags/{tag}`).
2. THE OpenRadar_Site SHALL continue to read all project data from the existing `projects` content collection without changing the collection schema.
3. THE OpenRadar_Site SHALL render every page as static HTML through the existing Astro build pipeline.
4. THE Layout SHALL continue to emit the page title, meta description, canonical URL, Open Graph tags, Twitter Card tags, and JSON-LD structured data for every page.
5. THE Search_Interface SHALL continue to emit and consume the `search-results` event in conformance with the Search_Event_Contract so that the statically rendered grid stays synchronized with the filter state.
6. WHEN the existing build command is executed, THE OpenRadar_Site SHALL build successfully with no new build errors introduced by the redesign.

### Requirement 13: Performance and Asset Loading

**User Story:** As a visitor, I want fast page loads, so that the beautiful redesign does not come at the cost of speed.

#### Acceptance Criteria

1. THE OpenRadar_Site SHALL load web fonts using a non-blocking strategy with a fallback font applied until the web font is available.
2. THE OpenRadar_Site SHALL reserve layout space for hero and media content so that cumulative layout shift is minimized during load.
3. WHERE interactive client-side behavior is required, THE OpenRadar_Site SHALL hydrate only the components that require interactivity and SHALL keep all other content as static HTML.
4. IF an interactive component fails to hydrate, THEN THE OpenRadar_Site SHALL continue to render all static content unaffected.
5. THE Design_System SHALL implement decorative visual effects (gradients, shadows, and blur) using CSS so that no additional image assets are required for those effects.
