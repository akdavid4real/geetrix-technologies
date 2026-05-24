import Link from 'next/link'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          
          <div className="relative px-6 py-16 md:px-12 md:py-24 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's work together to create something extraordinary. Get in touch with our team and discover how we can elevate your brand.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                asChild
              >
                <Link href="mailto:geetrixtechnologies@gmail.com" className="flex items-center gap-2">
                  Get Started Today
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5"
                asChild
              >
                <Link href="tel:+2349018021613">Schedule a Call</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
