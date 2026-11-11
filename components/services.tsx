const services: Array<{ title: string, desc: string, icon: React.ReactNode, highlighted?: boolean }> = [
  {
    title: 'Talent Sourcing',
    desc: 'We tap into our global network of 50,000+ vetted professionals to find your perfect match.',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    title: 'Skill Assessment',
    desc: 'Rigorous technical and soft skill evaluations ensure candidates meet your standards.',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Culture Matching',
    desc: 'Beyond skills, we ensure candidates align with your company values and work style.',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Onboarding Support',
    desc: 'We stay involved through the first 90 days to ensure a smooth transition.',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'AI Quick Summary',
    desc: 'Every job card ships with a one-click, AI-generated 3-bullet summary. Powered by Llama on Groq, instant response.',
    highlighted: true,
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
]

export function Services() {
  return (
    <section id="services" className="bg-dark-50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">How We Work</h2>
          <p className="mx-auto mt-4 max-w-2xl text-dark-500">
            Our proven process delivers exceptional remote talent that integrates seamlessly with your team.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => service.highlighted ? (
            <div
              key={i}
              className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 p-6 shadow-xl ring-1 ring-primary-400 transition hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-white/10 blur-xl" />
              <div className="absolute top-3 right-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-700">
                New
              </div>
              <div className="relative flex h-14 w-14 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur">
                {service.icon}
              </div>
              <h3 className="relative mt-4 text-lg font-semibold text-white">{service.title}</h3>
              <p className="relative mt-2 text-sm text-primary-50">{service.desc}</p>
            </div>
          ) : (
            <div
              key={i}
              className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                {service.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-dark-500">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
