import { ChartColumn, CheckCircle2, Cog, Pencil, Rocket, Search, Target } from 'lucide-react'
import type { HomepageContent } from '@/lib/homepage-content'

const iconMap = {
  Target,
  Pencil,
  Cog,
  Search,
  Rocket,
  Chart: ChartColumn,
}

type ProcessProps = {
  content: HomepageContent['process']
}

export function Process({ content }: ProcessProps) {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {content.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.steps.map((step, index) => {
            const Icon = iconMap[step.icon]

            return (
              <div key={step.number} className="relative">
                {index < content.steps.length - 1 && index % 3 !== 2 && (
                  <div className="hidden lg:block absolute top-20 -right-4 w-8 h-0.5 bg-border/30"></div>
                )}

                <div className="bg-card border border-border/50 rounded-lg p-6 h-full hover:border-accent/50 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-2xl bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-sm font-bold text-primary/60 uppercase tracking-wider">
                      Step {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 p-8 bg-secondary/30 rounded-lg border border-border/50">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">{content.noteTitle}</h3>
              <p className="text-muted-foreground">
                {content.noteDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
