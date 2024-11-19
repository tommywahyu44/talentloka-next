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

import Head from 'next/head'

export async function getStaticProps() {
  const pageData = {
    title: 'Talentloka Sales Promotion Staffing Solutions',
    description:
      'Talentloka is the latest professional service from Talentvis to provide experienced and qualified staff for sales promotion events. We specialize in SPG/SPB events, Crew, and Usher outsourcing services, with proven experience in managing events such as exhibitions, product launches, brochures, and direct sales.',
    image: 'images/team-spg-landing.jpg',
    url: 'https://talentloka.com/promotor',
  }

  return { props: { pageData } }
}

export default function Example({ pageData }) {
  return (
    <>
      <Head>
        <title>{pageData.title}</title>
        <meta
          property="og:title"
          content={pageData.title}
        />
        <meta
          property="og:description"
          content={pageData.description}
        />
        <meta
          property="og:image"
          content={pageData.image}
        />
        <meta
          property="og:type"
          content="website"
        />
        <meta
          property="og:url"
          content={pageData.url}
        />
      </Head>
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
