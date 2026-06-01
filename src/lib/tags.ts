// Feature: site-redesign — tag aggregation view-model helpers.
//
// Pure helpers shared by the Tag_Index_Page (`tags/index.astro`) and the
// Tag_Detail_Page (`tags/[tag].astro`). They are byte-for-byte equivalent to
// the inline aggregation/filter logic those pages currently use, but extracted
// so they can be reused and property-tested directly.

/**
 * Minimal structural shape required to aggregate or filter by tag. Any object
 * carrying a `tags` array satisfies this contract (e.g. a `ProjectContent`
 * `data` object), so the helpers stay decoupled from the full project schema.
 */
export interface TaggedProject {
  tags: string[];
}

/**
 * A distinct tag paired with the number of projects that include it.
 */
export interface TagAggregate {
  tag: string;
  count: number;
}

/**
 * Aggregate the distinct tags across all projects.
 *
 * The result contains exactly the distinct tags appearing across the input,
 * each paired with a count equal to the number of projects whose `tags`
 * include it, ordered by count in non-increasing (descending) order. Tags with
 * equal counts keep their first-appearance order (stable sort over an
 * insertion-ordered map). The input is never mutated.
 */
export function aggregateTags(
  projects: readonly TaggedProject[],
): TagAggregate[] {
  const counts = new Map<string, number>();

  for (const project of projects) {
    for (const tag of project.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts, ([tag, count]) => ({ tag, count })).sort(
    (a, b) => b.count - a.count,
  );
}

/**
 * Select exactly those projects whose `tags` include the given tag, preserving
 * input order and the original project objects. The input is never mutated.
 */
export function projectsForTag<T extends TaggedProject>(
  projects: readonly T[],
  tag: string,
): T[] {
  return projects.filter((project) => project.tags.includes(tag));
}
