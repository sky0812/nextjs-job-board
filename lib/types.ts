export interface Job {
  id: number
  url: string
  title: string
  company_name: string
  company_logo: string | null
  category: string
  job_type: string
  publication_date: string
  candidate_required_location: string
  salary: string
  description: string
  source?: string
}

export interface JobsResponse {
  jobs: Job[]
}

export interface FilterParams {
  category?: string
  search?: string
  location?: string
}
