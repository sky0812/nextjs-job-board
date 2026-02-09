import { getJobs, getCategories } from '@/lib/api'
import { JobsClient } from '@/components/jobs-client'

export const metadata = {
  title: 'Find Remote Jobs | TalentBridge',
  description: 'Browse thousands of remote job opportunities from top companies',
}

export default async function JobsPage() {
  const [jobs, categories] = await Promise.all([getJobs(), getCategories()])

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Find Remote Jobs</h1>
        <p className="mt-2 text-dark-500">Browse {jobs.length}+ remote opportunities</p>
      </div>
      <JobsClient initialJobs={jobs} categories={categories} />
    </section>
  )
}
