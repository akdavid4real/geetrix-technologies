import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    title: 'Winbox Consulting',
    category: 'Corporate Website & Training Platform',
    description: 'A public-facing consulting platform for behavioural change services, trainings, certifications, events, proposals, and client engagement.',
    client: 'WINBOX',
    url: 'https://winbox.ng/',
    image: 'https://plus.unsplash.com/premium_photo-1707155465527-c5a2935b21cc?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'CLEOHN LTD',
    category: 'Business Registration Website',
    description: 'A professional CAC registration website for business names, companies, NGOs, TIN, SCUML, trademarks, printing, and compliance support.',
    client: 'CLEOHN',
    url: 'https://www.cleohnltd.com/',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'The Nest Church',
    category: 'Church & Community Website',
    description: 'A church website for live worship, giving, prayer requests, stories, blog content, ministries, community signups, and service information.',
    client: 'THE NEST',
    url: 'https://thenestexpression.com/',
    image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Parara Music School',
    category: 'Education Website & Course Platform',
    description: 'A music school website for Lagos and online lessons, course discovery, packages, instruments, testimonials, and student registration.',
    client: 'PARARA',
    url: 'https://pararamusicschool.com/',
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Zelaxh',
    category: 'Fashion E-commerce Platform',
    description: 'A modern shopping experience for African wears, gym outfits, handcrafted clothing, product browsing, and fashion deals.',
    client: 'ZELAXH',
    url: 'http://zelaxh.com/',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Imperial Lights College',
    category: 'School Website & Admissions Portal',
    description: 'A school website for admissions, academic programs, facilities, gallery, accreditation, contact information, and parent/student portal access.',
    client: 'ILC',
    url: 'https://imperiallightscollege.com/',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800'
  }
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Our Portfolio
          </h2>
          <p className="text-lg text-muted-foreground">
            Real websites and digital platforms we have delivered for businesses, schools, churches, and commerce brands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
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
            <a href="#contact">Start a Project</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
