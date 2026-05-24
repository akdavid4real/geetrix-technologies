import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { CompanySlider } from '@/components/company-slider'
import { Stats } from '@/components/stats'
import { Process } from '@/components/process'
import { Pricing } from '@/components/pricing'
import { Portfolio } from '@/components/portfolio'
import { Testimonials } from '@/components/testimonials'
import { FAQ } from '@/components/faq'
import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <CompanySlider />
      <Stats />
      <Process />
      <Pricing />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
