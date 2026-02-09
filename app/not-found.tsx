import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-dark-500">Page not found</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition hover:bg-primary-700"
      >
        Go home
      </Link>
    </div>
  )
}
