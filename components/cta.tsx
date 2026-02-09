import Link from 'next/link'

export function CTA() {
  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 p-8 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Ready to Build Your Remote Team?
              </h2>
              <p className="mt-4 text-primary-100">
                Tell us about your hiring needs and we'll get back to you within 24 hours
                with a curated shortlist of candidates.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row md:justify-end">
              <Link
                href="/jobs"
                className="rounded-lg bg-white px-6 py-3 text-center font-semibold text-primary-700 transition hover:bg-primary-50"
              >
                Browse Talent Pool
              </Link>
              <a
                href="/contact"
                className="rounded-lg border-2 border-white/30 px-6 py-3 text-center font-semibold text-white transition hover:bg-white/10"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
