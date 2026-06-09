import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import type { HomepageContent } from '@/lib/homepage-content'

type PortfolioProps = {
  content: HomepageContent['portfolio']
}

export function Portfolio({ content }: PortfolioProps) {
  return (
    <section id="portfolio" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {content.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.projects.map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl overflow-hidden border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col h-full"
            >
              <div className="w-full h-64 relative overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-6">
                  <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm font-semibold mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.category}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-card flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-grow">
                  {project.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">
                    {project.client}
                  </span>
                  <div className="flex items-center gap-1 text-primary font-semibold text-sm">
                    View Project
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-base shadow-lg shadow-primary/20"
            asChild
          >
            <a href="#contact">{content.ctaLabel}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
