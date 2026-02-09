'use client'

import { useState } from 'react'

const testimonials = [
  {
    quote: "TalentBridge found us a senior engineer in two weeks who's been with us for over a year now. Their vetting process is thorough.",
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'Fintech Startup',
  },
  {
    quote: "We've hired 12 remote team members through them. The quality is consistent and the process is painless.",
    name: 'Marcus Johnson',
    role: 'Head of Engineering',
    company: 'E-commerce Platform',
  },
  {
    quote: "Finally, an agency that understands remote work culture. They matched us with candidates who thrive in async environments.",
    name: 'Elena Rodriguez',
    role: 'People Operations',
    company: 'SaaS Company',
  },
  {
    quote: "The 90-day support made all the difference. Our new hires integrated smoothly thanks to their onboarding guidance.",
    name: 'David Park',
    role: 'VP of Product',
    company: 'Health Tech',
  },
]

export function Testimonials() {
  const [active, setActive] = useState(0)

  function next() {
    setActive(i => (i + 1) % testimonials.length)
  }

  function prev() {
    setActive(i => (i - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">What Clients Say</h2>
          <p className="mx-auto mt-4 max-w-2xl text-dark-500">
            Join hundreds of companies who trust us with their remote hiring needs.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4">
                  <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 p-8 md:p-12">
                    <svg className="h-10 w-10 text-primary-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="mt-6 text-xl text-dark-700 md:text-2xl">{t.quote}</p>
                    <div className="mt-8">
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-sm text-dark-500">{t.role}, {t.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-dark-200 text-dark-600 transition hover:bg-dark-50"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 w-2 rounded-full transition ${
                    i === active ? 'bg-primary-600' : 'bg-dark-200'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-dark-200 text-dark-600 transition hover:bg-dark-50"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
