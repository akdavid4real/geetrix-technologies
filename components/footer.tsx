import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import type { HomepageContent } from '@/lib/homepage-content'

const socialIconMap = {
  LinkedIn: Linkedin,
  Twitter,
  Facebook,
}

type FooterProps = {
  content: HomepageContent['footer']
  brandName: string
}

export function Footer({ content, brandName }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src="/logo-light.jpeg"
                alt="Geetrix Technologies Logo"
                width={40}
                height={40}
                className="rounded-lg dark:hidden"
              />
              <Image
                src="/logo-dark.jpeg"
                alt="Geetrix Technologies Logo"
                width={40}
                height={40}
                className="rounded-lg hidden dark:block"
              />
              <span className="font-bold text-lg text-foreground">{brandName}</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {content.brandDescription}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-3">
              {content.serviceLinks.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {content.companyLinks.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a href={`mailto:${content.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {content.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  {content.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {phone}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  {content.addressLines.map((line, index) => (
                    <span key={line}>
                      {line}
                      {index < content.addressLines.length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} {brandName}. All rights reserved.
            </p>
            <div className="flex gap-4">
              {content.socialLinks.map((social) => {
                const Icon = socialIconMap[social.platform]

                return (
                  <Link key={social.platform} href={social.href} className="text-muted-foreground hover:text-primary transition-colors">
                    <Icon className="w-5 h-5" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
