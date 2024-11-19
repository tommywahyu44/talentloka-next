'use client'

import {
  CTA,
  Faqs,
  Feature,
  Footer,
  Header,
  Hero,
  LogoPartners,
  Testimonials,
} from '@/components/screen/landing/promotor/LandingPage'

export default function Example() {
  return (
    <>
      <div className="bg-white">
        {/* Header */}
        <Header />
        <main className="isolate">
          <Hero />
          <LogoPartners />
          <Feature />
          <Testimonials />
          <Faqs />
          <CTA />
          <Footer />
        </main>
      </div>
    </>
  )
}
