// Feature: site-redesign — pure formatting helpers shared by presentation components.
//
// These functions are extracted from the original inline logic in
// `src/components/ProjectCard.astro` so they can be reused without behavior
// change and validated with property-based tests.

/**
 * Format a count for display.
 *
 * - For `n < 1000`, renders the plain integer (via `Number.prototype.toString`).
 * - For `n >= 1000`, renders an abbreviated thousands form: the value divided by
 *   1000 with one decimal place, a trailing `.0` removed, suffixed with `k`
 *   (e.g. `54800 -> "54.8k"`, `1000 -> "1k"`).
 *
 * Byte-for-byte equivalent to the original `ProjectCard` implementation.
 */
export function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return n.toString();
}

/**
 * Render an index as a two-character, zero-padded string
 * (e.g. `1 -> "01"`, `42 -> "42"`).
 *
 * Equivalent to the original `String(index).padStart(2, '0')`.
 */
export function padIndex(index: number): string {
  return String(index).padStart(2, "0");
}

/**
 * Take the leading prefix of at most four items from a tag array, preserving
 * order. Equivalent to the original `tags.slice(0, 4)`.
 */
export function takeTags<T>(tags: readonly T[]): T[] {
  return tags.slice(0, 4);
}
