import { getJob, getJobs } from '@/lib/api'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const jobs = await getJobs()
  return jobs.slice(0, 20).map(job => ({ id: job.id.toString() }))
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const job = await getJob(id)

  if (!job) return { title: 'Job not found' }

  return {
    title: `${job.title} at ${job.company_name} | TalentBridge`,
    description: job.description.slice(0, 160),
  }
}

export default async function JobPage({ params }: Props) {
  const { id } = await params
  const job = await getJob(id)

  if (!job) notFound()

  const posted = new Date(job.publication_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/jobs"
        className="inline-flex items-center text-sm text-dark-500 hover:text-primary-600"
      >
        ← Back to jobs
      </Link>

      <div className="mt-6 space-y-4">
        <h1 className="text-3xl font-bold">{job.title}</h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-dark-600">
          <span className="font-semibold text-dark-900">{job.company_name}</span>
          <span>{job.candidate_required_location || 'Remote'}</span>
          <span>{job.job_type}</span>
          {job.salary && <span className="text-primary-600">{job.salary}</span>}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
            {String(job.category || 'other').replace(/-/g, ' ')}
          </span>
          <span className="text-xs text-dark-400">Posted {posted}</span>
        </div>
      </div>

      <div className="mt-8">
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition hover:bg-primary-700"
        >
          Apply for this position
        </a>
      </div>

      <div
        className="prose prose-dark mt-10 max-w-none"
        dangerouslySetInnerHTML={{ __html: job.description }}
      />
    </section>
  )
}
