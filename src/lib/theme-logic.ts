// Feature: site-redesign — pure theme-resolution logic (no DOM / no side effects).
// Consumed by the pre-paint inline script (Layout.astro) and the header toggle
// (Header.astro). Kept side-effect-free so it can be property-tested directly.

/** A selectable color theme. */
export type ThemeMode = "light" | "dark";

/** localStorage key holding the persisted Theme_Mode preference. */
export const STORAGE_KEY = "or-theme";

/** Attribute set on the document root (`<html>`) carrying the active mode. */
export const DOM_ATTR = "data-theme";

/**
 * Resolve the active Theme_Mode using the precedence:
 *   1. the stored preference, when present (non-null);
 *   2. otherwise the system signal, when determined
 *      (`true` -> 'dark', `false` -> 'light');
 *   3. otherwise (no preference and undetermined signal) -> 'light'.
 *
 * @param stored            persisted preference, or `null` when none exists
 * @param systemPrefersDark `true`/`false` from the OS color-scheme query,
 *                          or `null` when it cannot be determined
 */
export function resolveTheme(
  stored: ThemeMode | null,
  systemPrefersDark: boolean | null,
): ThemeMode {
  if (stored !== null) return stored;
  if (systemPrefersDark !== null) return systemPrefersDark ? "dark" : "light";
  return "light";
}

/**
 * Flip a Theme_Mode to the other mode. This is a self-inverse switch:
 * `toggleTheme(toggleTheme(m)) === m` for every mode `m`.
 */
export function toggleTheme(current: ThemeMode): ThemeMode {
  return current === "dark" ? "light" : "dark";
}
