'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { Job } from '@/lib/types'
import { JobCard } from './job-card'

interface Props {
  initialJobs: Job[]
  categories: string[]
}

const JOBS_PER_PAGE = 25

export function JobsClient({ initialJobs, categories }: Props) {
  const [search, setSearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [visibleCount, setVisibleCount] = useState(JOBS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const filtered = useMemo(() => {
    let result = initialJobs

    if (selectedCategories.length > 0) {
      result = result.filter(job =>
        selectedCategories.some(cat =>
          String(job.category || '').toLowerCase().includes(cat.toLowerCase())
        )
      )
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        job =>
          job.title.toLowerCase().includes(q) ||
          job.company_name.toLowerCase().includes(q)
      )
    }

    return result
  }, [initialJobs, selectedCategories, search])

  const visibleJobs = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  function toggleCategory(cat: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsLoading(true)
    timeoutRef.current = setTimeout(() => {
      setSelectedCategories(prev =>
        prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
      )
      setVisibleCount(JOBS_PER_PAGE)
      setIsLoading(false)
    }, 2000)
  }

  function clearFilters() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsLoading(true)
    timeoutRef.current = setTimeout(() => {
      setSelectedCategories([])
      setVisibleCount(JOBS_PER_PAGE)
      setIsLoading(false)
    }, 2000)
  }

  function loadMore() {
    setVisibleCount(prev => prev + JOBS_PER_PAGE)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-6">
        <div>
          <input
            type="text"
            value={search}
            onChange={e => {
              setSearch(e.target.value)
              setVisibleCount(JOBS_PER_PAGE)
            }}
            placeholder="Search jobs..."
            className="w-full rounded-lg border border-dark-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
          />
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-dark-700">Categories</h3>
          <div className="space-y-2">
            {categories.map(cat => (
              <label key={cat} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  disabled={isLoading}
                  className="h-4 w-4 rounded border-dark-300 text-primary-600 focus:ring-primary-500 disabled:opacity-50"
                />
                <span className="text-sm text-dark-600">
                  {cat.replace(/-/g, ' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        {selectedCategories.length > 0 && (
          <button
            onClick={clearFilters}
            disabled={isLoading}
            className="text-sm text-primary-600 hover:underline disabled:opacity-50"
          >
            Clear filters
          </button>
        )}
      </aside>

      <div>
        <p className="mb-4 text-sm text-dark-500">
          Showing {visibleJobs.length} of {filtered.length} jobs
        </p>

        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="flex items-center gap-3 rounded-lg bg-white px-6 py-3 shadow-lg">
                <svg className="h-5 w-5 animate-spin text-primary-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-sm font-medium text-dark-700">Loading jobs...</span>
              </div>
            </div>
          )}

          <div className={`transition-all duration-300 ${isLoading ? 'pointer-events-none blur-sm opacity-50' : ''}`}>
          {visibleJobs.length === 0 ? (
            <div className="py-12 text-center text-dark-500">
              No jobs match your criteria
            </div>
          ) : (
            <div className="space-y-3">
              {visibleJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
          </div>
        </div>

        {hasMore && !isLoading && (
          <button
            onClick={loadMore}
            className="mt-6 w-full rounded-lg border border-dark-200 py-3 text-sm font-medium text-dark-700 transition hover:bg-dark-50"
          >
            Show more jobs
          </button>
        )}
      </div>
    </div>
  )
}
