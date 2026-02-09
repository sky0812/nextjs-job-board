export function About() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">
              Built by Recruiters,
              <span className="gradient-text"> for Recruiters</span>
            </h2>
            <p className="mt-6 text-dark-600">
              TalentBridge was founded in 2019 by a team of tech recruiters frustrated
              with the traditional hiring process. We saw companies struggling to find
              quality remote talent while skilled professionals remained undiscovered.
            </p>
            <p className="mt-4 text-dark-600">
              Today, we've placed over 500 remote professionals across 50+ countries,
              maintaining a 98% retention rate. Our secret? We don't just match skills —
              we match cultures, work styles, and long-term goals.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary-600">6+</div>
                <div className="text-sm text-dark-500">Years in business</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">50k+</div>
                <div className="text-sm text-dark-500">Vetted professionals</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100" />
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="text-2xl font-bold text-dark-900">24h</div>
                  <div className="text-sm text-dark-500">Average response time</div>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="text-2xl font-bold text-dark-900">14 days</div>
                  <div className="text-sm text-dark-500">Average time to hire</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="text-2xl font-bold text-dark-900">98%</div>
                  <div className="text-sm text-dark-500">Client satisfaction</div>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="text-2xl font-bold text-dark-900">90 days</div>
                  <div className="text-sm text-dark-500">Placement guarantee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
