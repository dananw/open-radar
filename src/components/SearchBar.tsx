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
    return projects.filter((p) => {
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      const matchesTag = !selectedTag || p.tags.includes(selectedTag)
      return matchesQuery && matchesTag
    })
  }, [projects, query, selectedTag])

  // Expose filtered results to the page via a custom event
  useEffect(() => {
    const event = new CustomEvent('search-results', {
      detail: { filtered, query, selectedTag },
    })
    window.dispatchEvent(event)
  }, [filtered, query, selectedTag])

  return (
    <div className="space-y-5">
      {/* Search Input */}
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
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
          placeholder="Search projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-12 h-12 bg-surface-1 border border-white/[0.06] rounded-xl
                     text-text-primary placeholder:text-text-muted text-sm
                     focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20
                     transition-all duration-200"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Tag Filters */}
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3.5 py-1.5 text-xs rounded-full border transition-all duration-200 cursor-pointer font-medium ${
            !selectedTag
              ? 'bg-accent/15 border-accent/30 text-accent'
              : 'bg-surface-2/60 border-white/[0.06] text-text-muted hover:border-accent/20 hover:text-text-secondary'
          }`}
        >
          All
        </button>
        {allTags.map(([tag, count]) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className={`px-3.5 py-1.5 text-xs rounded-full border transition-all duration-200 cursor-pointer font-medium ${
              selectedTag === tag
                ? 'bg-accent/15 border-accent/30 text-accent'
                : 'bg-surface-2/60 border-white/[0.06] text-text-muted hover:border-accent/20 hover:text-text-secondary'
            }`}
          >
            {tag}
            <span className="ml-1 opacity-50">({count})</span>
          </button>
        ))}
      </div>

      {/* Result count */}
      <p className="text-xs text-text-muted pt-1">
        Showing {filtered.length} of {projects.length} projects
        {query && <span> matching &ldquo;{query}&rdquo;</span>}
        {selectedTag && <span> tagged <span className="text-accent">{selectedTag}</span></span>}
      </p>
    </div>
  )
}
