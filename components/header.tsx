'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'
import type { HomepageContent } from '@/lib/homepage-content'

type HeaderProps = {
  content: HomepageContent['header']
}

export function Header({ content }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
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
          <span className="font-bold text-xl text-foreground hidden sm:inline">{content.brandName}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {content.navLinks.map((link) => (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors hover:bg-primary/5 px-3 py-2 rounded-md"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground"
            asChild
          >
            <Link href="#contact">{content.ctaLabel}</Link>
          </Button>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-4">
            {content.navLinks.map((link) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-3 px-4 text-base font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-border">
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => setIsOpen(false)}
                asChild
              >
                <Link href="#contact">{content.ctaLabel}</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
