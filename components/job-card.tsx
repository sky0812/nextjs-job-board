'use client'

import { Job } from '@/lib/types'
import Link from 'next/link'
import { useState } from 'react'

interface Props {
  job: Job
}

export function JobCard({ job }: Props) {
  const posted = new Date(job.publication_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  const [bullets, setBullets] = useState<string[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  async function summarize(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (loading || bullets) return
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: job.title,
          company: job.company_name,
          description: job.description,
        }),
      })
      if (!res.ok) throw new Error('bad')
      const data = await res.json()
      if (!Array.isArray(data.bullets) || data.bullets.length === 0) throw new Error('empty')
      setBullets(data.bullets)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="block rounded-xl border border-dark-200 bg-white p-5 transition-all duration-200 hover:border-primary-300 hover:shadow-lg hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-semibold text-dark-900">{job.title}</h2>
          <p className="mt-1 text-sm text-dark-600">{job.company_name}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
              {String(job.category || 'other').replace(/-/g, ' ')}
            </span>
            <span className="rounded-full bg-dark-100 px-3 py-1 text-xs text-dark-600">
              {job.job_type}
            </span>
            {job.candidate_required_location && (
              <span className="rounded-full bg-dark-100 px-3 py-1 text-xs text-dark-600">
                {job.candidate_required_location}
              </span>
            )}
          </div>
        </div>
        <span className="shrink-0 text-xs text-dark-400">{posted}</span>
      </div>

      {bullets ? (
        <ul className="mt-4 space-y-1.5 border-t border-dark-100 pt-3 text-sm text-dark-700">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-primary-500 shrink-0">•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : (
        <button
          type="button"
          onClick={summarize}
          disabled={loading}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary-600 hover:text-primary-700 disabled:opacity-60"
        >
          {loading ? (
            <>
              <span className="inline-flex gap-0.5">
                <span className="w-1 h-1 rounded-full bg-primary-500 animate-pulse" />
                <span className="w-1 h-1 rounded-full bg-primary-500 animate-pulse" style={{ animationDelay: '150ms' }} />
                <span className="w-1 h-1 rounded-full bg-primary-500 animate-pulse" style={{ animationDelay: '300ms' }} />
              </span>
              Summarizing
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              AI quick summary
            </>
          )}
        </button>
      )}
      {error && <p className="mt-2 text-xs text-red-500">Couldn't summarize. Try again later.</p>}
    </Link>
  )
}
