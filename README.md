# TalentBridge

hiring agency site with job board

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

copy `.env.example` to `.env.local`

## structure

```
app/
  page.tsx         - landing
  jobs/            - job listings
  contact/         - contact form
components/        - ui
lib/               - api, types
```

## apis

pulls jobs from remotive, arbeitnow, jobicy
