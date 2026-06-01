// Pure search/filter logic extracted from SearchBar.tsx.
// Behavior is byte-for-byte equivalent to the inline SearchBar logic and
// conforms to the Search_Event_Contract (`search-results` CustomEvent detail).

export interface SearchProject {
  name: string;
  description: string;
  slug: string;
  tags: string[];
  stars?: number;
  language?: string;
}

export interface SearchResultsDetail {
  slugs: string[]; // slugs of matching projects, in filtered order
  total: number; // projects.length
  count: number; // filtered.length
  query: string; // trimmed query text
  selectedTag: string | null;
}

/**
 * Filters projects by a case-insensitive substring match over name/description/tags
 * AND tag membership. A project matches if and only if:
 *   (trimmed lower-cased query is empty OR name/description/any tag contains it
 *    case-insensitively) AND (selectedTag is null OR project.tags includes selectedTag).
 */
export function filterProjects(
  projects: SearchProject[],
  query: string,
  selectedTag: string | null,
): SearchProject[] {
  const q = query.trim().toLowerCase();
  return projects.filter((p) => {
    const matchesQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    const matchesTag = !selectedTag || p.tags.includes(selectedTag);
    return matchesQuery && matchesTag;
  });
}

/**
 * Builds the `search-results` CustomEvent detail from the full project list and
 * the already-filtered subset. `slugs` are the filtered project slugs in filtered
 * order, `total` is the full count, `count` is the filtered count, `query` is the
 * trimmed query, and `selectedTag` is passed through unchanged.
 */
export function buildSearchEventDetail(
  projects: SearchProject[],
  filtered: SearchProject[],
  query: string,
  selectedTag: string | null,
): SearchResultsDetail {
  return {
    slugs: filtered.map((p) => p.slug),
    total: projects.length,
    count: filtered.length,
    query: query.trim(),
    selectedTag,
  };
}
