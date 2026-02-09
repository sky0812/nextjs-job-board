import { Job } from '@/lib/types'
import Link from 'next/link'

interface Props {
  job: Job
}

export function JobCard({ job }: Props) {
  const posted = new Date(job.publication_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

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
    </Link>
  )
}
