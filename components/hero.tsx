import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import type { HomepageContent } from '@/lib/homepage-content'

type HeroProps = {
  content: HomepageContent['hero']
}

export function Hero({ content }: HeroProps) {
  const titleWithoutHighlight = content.title.replace(content.highlightedText, '').trim()

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
            {titleWithoutHighlight}{' '}
            <span className="text-primary">{content.highlightedText}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto text-balance">
            {content.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              asChild
            >
              <Link href="#contact" className="flex items-center gap-2">
                {content.primaryCtaLabel}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-secondary"
              asChild
            >
              <Link href="#portfolio">{content.secondaryCtaLabel}</Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-border">
            {content.metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                <p className="text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
