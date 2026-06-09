import { Check, MonitorSmartphone, Search, ShieldCheck, Zap } from 'lucide-react'
import type { HomepageContent } from '@/lib/homepage-content'

const iconMap = {
  MonitorSmartphone,
  Search,
  ShieldCheck,
  Zap,
}

type PricingProps = {
  content: HomepageContent['pricing']
}

export function Pricing({ content }: PricingProps) {
  let currentGroup = ''

  return (
    <section id="pricing" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-primary mb-3">
            {content.eyebrow}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5 text-balance">
            {content.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {content.plans.map((plan) => (
            <div
              key={plan.title}
              className={`relative bg-card border rounded-lg p-6 flex flex-col h-full transition-all duration-300 hover:shadow-lg ${
                plan.popular ? 'border-primary shadow-lg shadow-primary/10' : 'border-border/60'
              }`}
            >
              {plan.popular && (
                <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                  Popular
                </span>
              )}
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary mb-3">
                {plan.label}
              </p>
              <h3 className="text-2xl font-bold text-foreground mb-3">{plan.title}</h3>
              <p className="text-2xl font-bold text-foreground mb-2">{plan.price}</p>
              <p className="text-sm text-muted-foreground mb-6 min-h-10">{plan.note}</p>
              <ul className="space-y-3 mt-auto">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {content.standardsTitle}
            </h3>
            <p className="text-muted-foreground">{content.standardsDescription}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {content.standards.map((standard) => {
              const Icon = iconMap[standard.icon]

              return (
                <div key={standard.title} className="bg-background border border-border/60 rounded-lg p-5">
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">{standard.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{standard.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-card border border-border/60 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-border/60">
            <h3 className="text-2xl font-bold text-foreground">{content.tableTitle}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-secondary/60">
                <tr>
                  <th className="px-5 py-4 text-sm font-semibold text-foreground">Type</th>
                  <th className="px-5 py-4 text-sm font-semibold text-foreground">What It Is</th>
                  <th className="px-5 py-4 text-sm font-semibold text-foreground">Base Price</th>
                </tr>
              </thead>
              <tbody>
                {content.priceRows.map((row) => {
                  const showGroup = currentGroup !== row.group
                  currentGroup = row.group

                  return (
                    <tr key={`${row.group}-${row.type}`} className="border-t border-border/50">
                      <td className="px-5 py-4 align-top">
                        {showGroup && (
                          <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                            {row.group}
                          </span>
                        )}
                        <p className="font-semibold text-foreground mt-1">{row.type}</p>
                      </td>
                      <td className="px-5 py-4 text-sm text-muted-foreground align-top">{row.description}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-foreground align-top">{row.price}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="p-6 pt-4 text-sm text-muted-foreground">
            {content.footnote}
          </p>
        </div>
      </div>
    </section>
  )
}
