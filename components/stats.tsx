import { Target, Users, Zap } from 'lucide-react'
import type { HomepageContent } from '@/lib/homepage-content'

const iconMap = {
  Target,
  Users,
  Zap,
}

type StatsProps = {
  content: HomepageContent['stats']
}

export function Stats({ content }: StatsProps) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-accent/10 to-primary/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {content.items.map((stat) => {
            const Icon = iconMap[stat.icon]

            return (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/20 rounded-full">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {stat.label}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {stat.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
