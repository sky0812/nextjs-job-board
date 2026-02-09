# nextjs-job-board

hiring agency landing page with aggregated job board. pulls from multiple remote job apis.

## stack

- next.js 15 (app router)
- typescript
- tailwind 4

## run

```bash
yarn
yarn dev
```

## env

```
REMOTIVE_API_URL=https://remotive.com/api/remote-jobs
ARBEITNOW_API_URL=https://www.arbeitnow.com/api/job-board-api
JOBICY_API_URL=https://jobicy.com/api/v2/remote-jobs
```

## structure

```
app/
  page.tsx             - landing page (hero, services, showcase, testimonials, cta)
  jobs/                - job listings with filters
  jobs/[id]/           - single job detail
  contact/             - contact form

components/
  hero.tsx             - gradient hero with stats
  services.tsx         - services grid
  showcase.tsx         - featured positions carousel
  testimonials.tsx     - client testimonials slider
  cta.tsx              - call to action section
  about.tsx            - about/mission section
  header.tsx           - nav + mobile menu
  footer.tsx           - links + social
  job-card.tsx         - job listing card
  jobs-client.tsx      - filters + search + pagination
  contact-form.tsx     - contact form

lib/
  api.ts               - job api aggregator
  types.ts             - typescript types
```

## features

### job aggregation
pulls jobs from 3 apis in parallel:
- **remotive** - remote jobs
- **arbeitnow** - european jobs
- **jobicy** - worldwide remote

jobs are merged, deduplicated, and sorted by date.

### filtering
- **search** - filter by title or company
- **categories** - checkbox filters (software-dev, design, marketing, etc.)
- **show more** - progressive loading (25 jobs per page)

### landing page sections
| section | description |
|---------|-------------|
| hero | gradient bg, stats, floating card animation |
| services | 6 service cards in grid |
| showcase | featured positions carousel |
| testimonials | client quotes slider |
| cta | call to action with gradient |
| about | company mission |

## theming

uses tailwind 4 css-based config in `globals.css`:

```css
@theme {
  --color-primary-500: #3366ff;
  --color-secondary-500: #d946ef;
  --color-accent-500: #10b981;
  --color-dark-900: #1e222b;
}
```

### custom utilities
- `.gradient-text` - primary to secondary gradient text
- `.gradient-border` - gradient border effect
- `.glass` - frosted glass effect
- `.glass-dark` - dark frosted glass
- `.animate-fade-up` - fade + slide up animation
- `.animate-float` - floating animation

## api reference

```typescript
import { getJobs, getJob, getCategories } from '@/lib/api'

const jobs = await getJobs()
const jobs = await getJobs({ search: 'react', category: 'software-dev' })

const job = await getJob('123')

const categories = await getCategories()
```

## colors

- primary: #3366ff (blue)
- secondary: #d946ef (fuchsia)
- accent: #10b981 (emerald)
- dark: #1e222b (slate)
