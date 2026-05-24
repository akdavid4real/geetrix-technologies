'use client'

import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { ArrowRight, Code, Megaphone, Smartphone } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'

const companyHighlights = [
  {
    title: 'Enterprise Software Development',
    description: 'We build scalable, secure, and robust software solutions tailored to your unique business requirements.',
    features: [
      'Custom ERP/CRM Systems',
      'API Integration & Development',
      'Cloud Architecture',
      'Legacy System Modernization'
    ],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop', // coding/software image
    icon: Code,
    color: 'text-primary'
  },
  {
    title: 'Digital Experience Platforms',
    description: 'Create immersive customer journeys with our advanced web design and development services.',
    features: [
      'Next.js & React Applications',
      'Headless CMS Solutions',
      'User Experience (UX) Design',
      'Mobile-First Development'
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', // data/digital platform image
    icon: Megaphone,
    color: 'text-accent'
  },
  {
    title: 'Smart Tech & IoT Solutions',
    description: 'Leverage the power of connected devices and automation to streamline your operations.',
    features: [
      'IoT Product Prototype',
      'Custom Automation Tools',
      'Edge Computing Solutions',
      'Hardware-Software Integration'
    ],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop', // tech/iot image
    icon: Smartphone,
    color: 'text-primary'
  }
]

export function CompanySlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  return (
    <section id="services" className="w-full relative bg-background">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {companyHighlights.map((highlight, index) => {
            const Icon = highlight.icon
            return (
              <CarouselItem key={index} className="pl-0 basis-full">
                <div className="relative w-full h-[600px] md:h-[700px] flex items-center">
                  {/* Background Image with Overlay */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={highlight.image}
                      alt={highlight.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-background/80 md:bg-background/60 backdrop-blur-[2px]"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="container mx-auto px-4 md:px-12 relative z-10">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-6">
                        <Icon className={`w-8 h-8 ${highlight.color}`} />
                      </div>
                      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                        {highlight.title}
                      </h2>
                      <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                        {highlight.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                        {highlight.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                            <span className="text-foreground font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                        <Link href="#contact" className="flex items-center gap-2">
                          Start Your Project
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <div className="hidden md:flex absolute right-12 bottom-12 gap-4 z-20">
            <CarouselPrevious className="relative translate-x-0 translate-y-0 left-0 right-0 top-0 bottom-0 h-12 w-12 bg-background/50 backdrop-blur border-none hover:bg-background/80" />
            <CarouselNext className="relative translate-x-0 translate-y-0 left-0 right-0 top-0 bottom-0 h-12 w-12 bg-background/50 backdrop-blur border-none hover:bg-background/80" />
        </div>
      </Carousel>
    </section>
  )
}
