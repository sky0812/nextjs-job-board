import { Job, JobsResponse, FilterParams } from './types'

interface ArbeitnowJob {
  slug: string
  title: string
  company_name: string
  job_types: string[]
  location: string
  remote: boolean
  created_at: string
  description: string
  url: string
  tags: string[]
}

interface JobicyJob {
  id: number
  url: string
  jobTitle: string
  companyName: string
  jobType: string
  jobGeo: string
  pubDate: string
}

async function fetchRemotive(): Promise<Job[]> {
  const url = process.env.REMOTIVE_API_URL
  if (!url) return []

  try {
    const res = await fetch(url, { next: { revalidate: 300 } })
    if (!res.ok) return []
    const data: JobsResponse = await res.json()
    return data.jobs.map(job => ({ ...job, source: 'remotive' }))
  } catch {
    return []
  }
}

async function fetchArbeitnow(): Promise<Job[]> {
  const url = process.env.ARBEITNOW_API_URL
  if (!url) return []

  try {
    const res = await fetch(url, { next: { revalidate: 300 } })
    if (!res.ok) return []
    const data: { data: ArbeitnowJob[] } = await res.json()
    return data.data.map((job, i) => ({
      id: Date.now() + i + 100000,
      url: job.url,
      title: job.title,
      company_name: job.company_name,
      company_logo: null,
      category: job.tags[0] || 'other',
      job_type: job.job_types[0] || 'full_time',
      publication_date: job.created_at,
      candidate_required_location: job.location,
      salary: '',
      description: job.description,
      source: 'arbeitnow',
    }))
  } catch {
    return []
  }
}

async function fetchJobicy(): Promise<Job[]> {
  const url = process.env.JOBICY_API_URL
  if (!url) return []

  try {
    const res = await fetch(url, { next: { revalidate: 300 } })
    if (!res.ok) return []
    const data: { jobs: JobicyJob[] } = await res.json()
    return data.jobs.map(job => ({
      id: job.id,
      url: job.url,
      title: job.jobTitle,
      company_name: job.companyName,
      company_logo: null,
      category: job.jobType || 'other',
      job_type: job.jobType || 'full_time',
      publication_date: job.pubDate,
      candidate_required_location: job.jobGeo,
      salary: '',
      description: '',
      source: 'jobicy',
    }))
  } catch {
    return []
  }
}

export async function getJobs(filters?: FilterParams): Promise<Job[]> {
  const [remotive, arbeitnow, jobicy] = await Promise.all([
    fetchRemotive(),
    fetchArbeitnow(),
    fetchJobicy(),
  ])

  let jobs = [...remotive, ...arbeitnow, ...jobicy]

  jobs.sort((a, b) =>
    new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime()
  )

  if (filters?.category) {
    jobs = jobs.filter(j =>
      String(j.category || '').toLowerCase().includes(filters.category!.toLowerCase())
    )
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase()
    jobs = jobs.filter(j =>
      String(j.title || '').toLowerCase().includes(q) ||
      String(j.company_name || '').toLowerCase().includes(q)
    )
  }

  if (filters?.location) {
    const loc = filters.location.toLowerCase()
    jobs = jobs.filter(j =>
      String(j.candidate_required_location || '').toLowerCase().includes(loc)
    )
  }

  return jobs
}

export async function getJob(id: string): Promise<Job | null> {
  const jobs = await getJobs()
  return jobs.find(j => j.id.toString() === id) || null
}

export async function getCategories(): Promise<string[]> {
  return [
    'software-dev',
    'customer-support',
    'design',
    'marketing',
    'sales',
    'product',
    'business',
    'data',
    'devops',
    'finance',
    'hr',
    'qa',
    'writing',
  ]
}
