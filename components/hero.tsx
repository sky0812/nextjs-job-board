import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h1 className="animate-fade-up text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Find Your Next
              <span className="block text-secondary-300">Remote Superstar</span>
            </h1>
            <p className="mt-6 text-lg text-primary-100">
              We specialize in connecting companies with pre-vetted remote professionals.
              Skip the hiring headache and get matched with top talent in days, not months.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/jobs"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-primary-700 transition hover:bg-primary-50"
              >
                Browse Talent
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border-2 border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Get in Touch
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-8 text-primary-100">
              <div>
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-sm">Placements</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">98%</div>
                <div className="text-sm">Retention Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm">Countries</div>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-secondary-500/30 blur-3xl" />
              <div className="absolute -bottom-4 -right-4 h-72 w-72 rounded-full bg-primary-400/30 blur-3xl" />
              <div className="animate-float relative rounded-2xl bg-white/10 p-8 backdrop-blur">
                <div className="space-y-4">
                  {[
                    { role: 'Senior React Developer', loc: 'Europe', match: '98%' },
                    { role: 'Product Designer', loc: 'Americas', match: '95%' },
                    { role: 'DevOps Engineer', loc: 'Worldwide', match: '92%' },
                  ].map((item, i) => (
                    <div key={i} className="rounded-lg bg-white/10 p-4">
                      <div className="font-medium text-white">{item.role}</div>
                      <div className="mt-1 flex items-center justify-between text-sm text-primary-200">
                        <span>{item.loc}</span>
                        <span className="text-secondary-300">{item.match} match</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
