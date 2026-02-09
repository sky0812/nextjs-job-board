'use client'

import { useState, useEffect } from 'react'

const placements = [
  { role: 'Senior Full-Stack Developer', company: 'Tech Unicorn', industry: 'Fintech', time: '2 weeks' },
  { role: 'Product Designer', company: 'E-commerce Giant', industry: 'Retail', time: '10 days' },
  { role: 'DevOps Lead', company: 'Healthcare Platform', industry: 'Health Tech', time: '3 weeks' },
  { role: 'Data Engineer', company: 'AI Startup', industry: 'Machine Learning', time: '12 days' },
  { role: 'Mobile Developer', company: 'Travel App', industry: 'Travel', time: '2 weeks' },
  { role: 'Frontend Architect', company: 'Media Company', industry: 'Entertainment', time: '18 days' },
]

export function Showcase() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(o => (o + 1) % placements.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const visible = [...placements, ...placements].slice(offset, offset + 3)

  return (
    <section className="bg-dark-950 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">Recent Placements</h2>
          <p className="mx-auto mt-4 max-w-2xl text-dark-400">
            A snapshot of talent we've placed in the last quarter.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {visible.map((p, i) => (
            <div
              key={`${p.role}-${i}`}
              className="rounded-xl border border-dark-800 bg-dark-900 p-6 transition hover:border-primary-500/50"
            >
              <div className="text-sm text-primary-400">{p.industry}</div>
              <h3 className="mt-2 text-lg font-semibold text-white">{p.role}</h3>
              <p className="mt-1 text-dark-400">{p.company}</p>
              <div className="mt-4 flex items-center gap-2">
                <svg className="h-4 w-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-secondary-400">Filled in {p.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {placements.map((_, i) => (
            <button
              key={i}
              onClick={() => setOffset(i)}
              className={`h-1.5 w-6 rounded-full transition ${
                i === offset ? 'bg-primary-500' : 'bg-dark-700'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
