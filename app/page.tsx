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
import { readHomepageContent } from '@/lib/homepage-content'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const content = await readHomepageContent()

  return (
    <main className="min-h-screen bg-background">
      <Header content={content.header} />
      <Hero content={content.hero} />
      <CompanySlider content={content.companySlider} />
      <Stats content={content.stats} />
      <Process content={content.process} />
      <Pricing content={content.pricing} />
      <Portfolio content={content.portfolio} />
      <Testimonials content={content.testimonials} />
      <FAQ content={content.faq} />
      <CTA content={content.cta} />
      <Footer content={content.footer} brandName={content.header.brandName} />
    </main>
  )
}
