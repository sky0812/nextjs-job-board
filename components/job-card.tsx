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
        <div className="mt-4 rounded-lg border border-primary-200 bg-primary-50/70 p-3">
          <div className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-primary-700">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            AI Summary
          </div>
          <ul className="space-y-1 text-sm text-dark-800">
            {bullets.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary-500 shrink-0">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (job.description && job.description.trim().length > 40) ? (
        <button
          type="button"
          onClick={summarize}
          disabled={loading}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary-300 bg-gradient-to-r from-primary-500 to-primary-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:shadow-md hover:from-primary-600 hover:to-primary-700 hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-wait"
        >
          {loading ? (
            <>
              <span className="inline-flex gap-0.5">
                <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                <span className="w-1 h-1 rounded-full bg-white animate-pulse" style={{ animationDelay: '150ms' }} />
                <span className="w-1 h-1 rounded-full bg-white animate-pulse" style={{ animationDelay: '300ms' }} />
              </span>
              Summarizing
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI Quick Summary
            </>
          )}
        </button>
      ) : null}
      {error && <p className="mt-2 text-xs text-red-500">Couldn't summarize. Try again.</p>}
    </Link>
  )
}
