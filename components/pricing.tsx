import { Check, MonitorSmartphone, Search, ShieldCheck, Zap } from 'lucide-react'

const plans = [
  {
    label: 'Personal',
    title: 'Basic Websites',
    price: '₦80,000 - ₦120,000',
    note: 'Personal / Profile Pages',
    features: ['Personal / Profile Pages', 'Landing Pages (CTA focused)', 'Portfolio Websites'],
  },
  {
    label: 'Corporate',
    title: 'Business Solutions',
    price: '₦150,000 - ₦250,000',
    note: '*Maintenance fee for Church sites',
    popular: true,
    features: ['Small Business (4-6 pages)', 'Company / Corporate Site', 'Church / NGO Portals'],
  },
  {
    label: 'Enterprise',
    title: 'Management Systems',
    price: 'Starting from ₦500,000',
    note: '*Monthly Maintenance applies',
    features: ['School / Church Management', 'Estate / Hostel Management', 'Online Clearance Systems'],
  },
]

const standards = [
  {
    title: 'Fully Responsive',
    description: 'Optimized for mobile, tablet, and desktop screens.',
    icon: MonitorSmartphone,
  },
  {
    title: 'SEO Ready',
    description: 'Built-in best practices to help you rank on Google.',
    icon: Search,
  },
  {
    title: 'Secure & Safe',
    description: 'Advanced security protocols to protect your data.',
    icon: ShieldCheck,
  },
  {
    title: 'High Performance',
    description: 'Fast load times for better user retention.',
    icon: Zap,
  },
]

const priceRows = [
  { group: 'Basic Websites', type: 'Personal / Profile Page', description: '1-2 pages, bio, links', price: 'Starting from ₦80k' },
  { group: 'Basic Websites', type: 'Landing Page', description: 'CTA focused, ads ready', price: 'Starting from ₦100k' },
  { group: 'Basic Websites', type: 'Portfolio Website', description: 'Projects + contact', price: 'Starting from ₦120k' },
  { group: 'Business Websites', type: 'Small Business Website', description: '4-6 pages', price: 'Starting from ₦150k' },
  { group: 'Business Websites', type: 'Company Website', description: 'About, services, blog', price: 'Starting from ₦250k' },
  { group: 'Business Websites', type: 'Church Website', description: 'Events, sermons, giving', price: 'Starting from ₦250k*' },
  { group: 'Management Systems', type: 'School Management System', description: 'Students, results, staff', price: 'Starting from ₦500k' },
  { group: 'Management Systems', type: 'Church Management System', description: 'Members, attendance', price: 'Starting from ₦500k' },
  { group: 'Management Systems', type: 'Hostel / Estate System', description: 'Payments, allocations', price: 'Starting from ₦500k' },
  { group: 'Management Systems', type: 'Online Clearance System', description: 'Workflow approvals', price: 'Starting from ₦500k' },
  { group: 'Advanced / Custom Systems', type: 'E-commerce Website', description: 'Online store', price: 'Starting from ₦500k' },
  { group: 'Advanced / Custom Systems', type: 'Custom Web App', description: 'Bespoke functionality', price: 'Starting from ₦1M' },
  { group: 'Advanced / Custom Systems', type: 'SaaS / Platform MVP', description: 'Scalable platform', price: 'Starting from ₦1.5M' },
]

export function Pricing() {
  let currentGroup = ''

  return (
    <section id="pricing" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-primary mb-3">
            Pricing Plans
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5 text-balance">
            Elevate Your Digital Presence
          </h2>
          <p className="text-lg text-muted-foreground">
            Practical, transparent pricing for world-class development by Geetrix Technologies. Choose the plan that fits your vision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
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
              Premium Standards
            </h3>
            <p className="text-muted-foreground">Included in every project we deliver.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {standards.map((standard) => {
              const Icon = standard.icon
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
            <h3 className="text-2xl font-bold text-foreground">Practical Price List</h3>
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
                {priceRows.map((row) => {
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
            * Monthly Maintenance Fee applies for complex systems and specific business types.
          </p>
        </div>
      </div>
    </section>
  )
}
