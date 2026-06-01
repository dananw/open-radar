import { useState, useMemo, useEffect } from 'react'
import {
  filterProjects,
  buildSearchEventDetail,
  type SearchProject,
} from './search-logic'

interface SearchBarProps {
  projects: SearchProject[]
}

export default function SearchBar({ projects }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [tagsExpanded, setTagsExpanded] = useState(false)

  // Number of tags shown before the list collapses behind "+N more".
  // Tags are sorted by frequency, so the visible slice is the most useful set.
  const VISIBLE_TAG_LIMIT = 10

  const allTags = useMemo(() => {
    const tagMap = new Map<string, number>()
    projects.forEach((p) =>
      p.tags.forEach((t) => tagMap.set(t, (tagMap.get(t) ?? 0) + 1))
    )
    return Array.from(tagMap.entries()).sort((a, b) => b[1] - a[1])
  }, [projects])

  // Collapsed view: show the top tags, but always keep the active tag visible
  // (pin it in) so selecting a long-tail tag never makes it vanish on collapse.
  const visibleTags = useMemo(() => {
    if (tagsExpanded) return allTags
    const top = allTags.slice(0, VISIBLE_TAG_LIMIT)
    if (selectedTag && !top.some(([t]) => t === selectedTag)) {
      const active = allTags.find(([t]) => t === selectedTag)
      if (active) return [...top, active]
    }
    return top
  }, [allTags, tagsExpanded, selectedTag])

  const hiddenCount = allTags.length - Math.min(VISIBLE_TAG_LIMIT, allTags.length)

  const filtered = useMemo(
    () => filterProjects(projects, query, selectedTag),
    [projects, query, selectedTag]
  )

  // Broadcast the filtered slugs so the statically-rendered grid can sync.
  useEffect(() => {
    const event = new CustomEvent('search-results', {
      detail: buildSearchEventDetail(projects, filtered, query, selectedTag),
    })
    window.dispatchEvent(event)
  }, [filtered, projects, query, selectedTag])

  return (
    <div>
      {/* Search input */}
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search by name, description or tag…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-11 pr-11 h-12 rounded-md bg-surface border border-line-strong
                     text-text placeholder:text-muted placeholder:font-mono placeholder:text-sm
                     focus:outline-none focus:ring-2 focus:ring-focus
                     transition-shadow"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center
                       w-9 h-9 rounded-full text-muted hover:text-accent
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus
                       transition-colors"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Tag filters — 16px below the search input (Search → Tags) */}
      <div className="flex flex-wrap gap-[var(--space-2)] mt-[var(--space-4)]">
        <button
          type="button"
          onClick={() => setSelectedTag(null)}
          className="chip"
          aria-pressed={!selectedTag}
        >
          All
        </button>
        {visibleTags.map(([tag, count]) => (
          <button
            key={tag}
            type="button"
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className="chip"
            aria-pressed={selectedTag === tag}
          >
            #{tag}
            <span className="opacity-60">{count}</span>
          </button>
        ))}
        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setTagsExpanded((v) => !v)}
            className="chip"
            aria-expanded={tagsExpanded}
            aria-label={
              tagsExpanded
                ? 'Show fewer tags'
                : `Show ${hiddenCount} more tags`
            }
          >
            {tagsExpanded ? 'Show less' : `+${hiddenCount} more`}
          </button>
        )}
      </div>

      {/* Result count — 24px below the tag filters (Tags → Results) */}
      <p className="label mt-[var(--space-5)]">
        {filtered.length} / {projects.length} projects
        {query && <span> · &ldquo;{query.trim()}&rdquo;</span>}
        {selectedTag && <span> · #{selectedTag}</span>}
      </p>
    </div>
  )
}
