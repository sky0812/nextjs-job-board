import Link from 'next/link'

const footerLinks = {
  company: [
    { href: '/#about', label: 'About Us' },
    { href: '/#services', label: 'Services' },
    { href: '/jobs', label: 'Careers' },
    { href: '/contact', label: 'Contact' },
  ],
  resources: [
    { href: '/jobs', label: 'Job Board' },
    { href: '/#blog', label: 'Blog' },
    { href: '/#faq', label: 'FAQ' },
    { href: '/#support', label: 'Support' },
  ],
  legal: [
    { href: '/#privacy', label: 'Privacy Policy' },
    { href: '/#terms', label: 'Terms of Service' },
    { href: '/#cookies', label: 'Cookie Policy' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-dark-100 bg-dark-950 text-dark-300">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="text-xl font-bold text-white">
              TalentBridge
            </Link>
            <p className="mt-3 text-sm">
              Connecting exceptional remote talent with forward-thinking companies worldwide.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-dark-800 pt-8 text-center text-sm">
          © 2025 TalentBridge. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
