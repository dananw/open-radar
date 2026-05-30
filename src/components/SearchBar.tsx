import { useState, useMemo, useEffect } from 'react'

interface Project {
  name: string
  description: string
  slug: string
  tags: string[]
  stars?: number
  language?: string
}

interface SearchBarProps {
  projects: Project[]
}

export default function SearchBar({ projects }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const allTags = useMemo(() => {
    const tagMap = new Map<string, number>()
    projects.forEach((p) =>
      p.tags.forEach((t) => tagMap.set(t, (tagMap.get(t) ?? 0) + 1))
    )
    return Array.from(tagMap.entries()).sort((a, b) => b[1] - a[1])
  }, [projects])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      const matchesTag = !selectedTag || p.tags.includes(selectedTag)
      return matchesQuery && matchesTag
    })
  }, [projects, query, selectedTag])

  // Broadcast the filtered slugs so the statically-rendered grid can sync.
  useEffect(() => {
    const event = new CustomEvent('search-results', {
      detail: {
        slugs: filtered.map((p) => p.slug),
        total: projects.length,
        count: filtered.length,
        query: query.trim(),
        selectedTag,
      },
    })
    window.dispatchEvent(event)
  }, [filtered, projects.length, query, selectedTag])

  const chip = (active: boolean) =>
    `font-mono text-[0.7rem] px-2.5 py-1.5 border transition-colors cursor-pointer ${
      active
        ? 'bg-accent border-accent text-[#f8f4ec]'
        : 'bg-paper border-line text-ink-2 hover:border-ink'
    }`

  return (
    <div className="space-y-5">
      {/* Search input */}
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-3"
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
          className="w-full pl-11 pr-11 h-12 bg-card border border-ink
                     text-ink placeholder:text-ink-3 placeholder:font-mono placeholder:text-sm
                     focus:outline-none focus:ring-2 focus:ring-accent/40
                     transition-shadow"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-3 hover:text-accent transition-colors p-1"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setSelectedTag(null)} className={chip(!selectedTag)}>
          All
        </button>
        {allTags.map(([tag, count]) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className={chip(selectedTag === tag)}
          >
            #{tag}
            <span className="ml-1 opacity-60">{count}</span>
          </button>
        ))}
      </div>

      {/* Result count */}
      <p className="label">
        {filtered.length} / {projects.length} projects
        {query && <span> · &ldquo;{query.trim()}&rdquo;</span>}
        {selectedTag && <span> · #{selectedTag}</span>}
      </p>
    </div>
  )
}
