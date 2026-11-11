const MODEL = process.env.GROQ_MODEL || 'llama-3.1-8b-instant'
const ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions'

function clean(html: string) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 4000)
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as { title?: string, company?: string, description?: string } | null
  if (!body) {
    return Response.json({ error: 'no body' }, { status: 400 })
  }
  const key = process.env.GROQ_API_KEY
  if (!key) {
    return Response.json({ error: 'missing key' }, { status: 500 })
  }
  const content = clean(body.description || '')
  const title = body.title || ''
  const company = body.company || ''
  if (!title && !company && !content) {
    return Response.json({ error: 'empty job' }, { status: 400 })
  }
  const descBlock = content ? `\n\nDescription:\n${content}` : '\n\n(No description provided. Infer plausible bullets from title and company only, and mark uncertain ones with "likely" or "typically".)'
  const prompt = `Summarize this job posting as 3 short bullet points. Each bullet starts with "- " and is under 15 words. Focus on: role/responsibilities, must-have requirements, and format/perks. Reply with only the 3 bullets, nothing else.\n\nTitle: ${title}\nCompany: ${company}${descBlock}`
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 200,
    }),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    console.error('groq error', res.status, detail)
    return Response.json({ error: 'upstream', status: res.status, detail: detail.slice(0, 400) }, { status: 502 })
  }
  const data = await res.json()
  const text = (data?.choices?.[0]?.message?.content || '').trim()
  const bullets = text
    .split('\n')
    .map((l: string) => l.replace(/^[-*•\d.)\s]+/, '').trim())
    .filter((l: string) => l.length > 0)
    .slice(0, 3)
  return Response.json({ bullets })
}
