'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { HomepageContent } from '@/lib/homepage-content'

type FAQProps = {
  content: HomepageContent['faq']
}

export function FAQ({ content }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {content.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {content.description}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {content.items.map((faq, index) => (
            <div
              key={`${faq.question}-${index}`}
              className="border border-border/50 rounded-lg overflow-hidden bg-card hover:border-accent/50 transition-colors duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/20 transition-colors duration-300"
              >
                <h3 className="text-left font-semibold text-foreground text-lg">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 bg-secondary/10 border-t border-border/30">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-primary/10 rounded-lg border border-primary/20 text-center max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-foreground mb-2">{content.contactCardTitle}</h3>
          <p className="text-muted-foreground mb-4">
            {content.contactCardDescription}
          </p>
          <a
            href="#contact"
            className="inline-block text-primary font-semibold hover:underline"
          >
            {content.contactCardLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
