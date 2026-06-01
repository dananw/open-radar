// Feature: site-redesign — project view-model helpers (Tasks 6.1; Properties 5, 6, 10)
//
// Pure, dependency-free helpers that derive the homepage stats strip, the
// recency ordering for the project index, and the related-projects set on the
// detail page. They mirror the data computations currently performed inline in
// `src/pages/index.astro` and `src/pages/projects/[slug].astro`, extracted here
// so they can be reused without behavior change and validated with property
// tests (6.2, 6.3, 6.4).
//
// The functions accept structural types matching the `projects` content
// collection frontmatter (see `src/content.config.ts`). They are intentionally
// generic over the element shape so callers can pass richer objects (e.g. a
// flattened content-collection entry carrying `name`, `description`, `url`,
// etc.) and get back values of the same concrete type.

/** Minimal project shape needed to compute the homepage stats strip. */
export interface StatsProject {
  tags: string[];
  stars?: number;
}

/** Result of {@link computeStats}: the three values shown in the stats strip. */
export interface ProjectStats {
  /** Number of indexed projects (the input list length). */
  projectCount: number;
  /** Number of distinct tags across all projects. */
  categoryCount: number;
  /** Sum of star counts, treating a missing star count as 0. */
  totalStars: number;
}

/**
 * Compute the homepage stats: project count, distinct-tag (category) count, and
 * the combined star total treating a missing star count as 0.
 *
 * Holds for the empty list and for all-missing-stars (each count is 0).
 *
 * Property 5 (Validates: Requirements 3.2)
 */
export function computeStats(projects: readonly StatsProject[]): ProjectStats {
  const distinctTags = new Set<string>();
  let totalStars = 0;

  for (const project of projects) {
    for (const tag of project.tags) distinctTags.add(tag);
    totalStars += project.stars ?? 0;
  }

  return {
    projectCount: projects.length,
    categoryCount: distinctTags.size,
    totalStars,
  };
}

/**
 * Return a permutation of `projects` ordered by `publishedAt` descending (most
 * recent first). The input array is not mutated.
 *
 * Property 6 (Validates: Requirements 3.4)
 */
export function sortByPublishedDesc<T extends { publishedAt: Date }>(
  projects: readonly T[],
): T[] {
  return [...projects].sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
  );
}

/**
 * Select up to three projects related to `current`: never the current project
 * itself, and every result shares at least one tag with `current`. Identity is
 * compared on `slug`.
 *
 * Property 10 (Validates: Requirements 5.5)
 */
export function relatedProjects<T extends { slug: string; tags: string[] }>(
  current: { slug: string; tags: string[] },
  others: readonly T[],
): T[] {
  return others
    .filter(
      (p) =>
        p.slug !== current.slug &&
        p.tags.some((tag) => current.tags.includes(tag)),
    )
    .slice(0, 3);
}
