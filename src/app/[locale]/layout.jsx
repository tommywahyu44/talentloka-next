import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { locales } from '../../navigation'
import dynamic from 'next/dynamic'
import { Nunito, Roboto } from 'next/font/google'
import './globals.css'
import Head from 'next/head'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const roboto_mono = Roboto({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500'],
})

export default async function RootLayout({ children, params: { locale } }) {
  const pageData = {
    title: 'Talentloka Sales Promotion Staffing Solutions',
    description:
      'Talentloka is the latest professional service from Talentvis to provide experienced and qualified staff for sales promotion events. We specialize in SPG/SPB events, Crew, and Usher outsourcing services, with proven experience in managing events such as exhibitions, product launches, brochures, and direct sales.',
    image: 'images/team-spg-landing.jpg',
    url: 'https://talentloka.com/promotor',
  }
  const CrispWithNoSSR = dynamic(() => import('../../components/crisp'))

  if (!locales.includes(locale)) {
    notFound()
  }
  const messages = await getMessages()
  return (
    <html
      lang={locale}
      className={`${nunito.variable} ${roboto_mono.variable}`}>
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
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <CrispWithNoSSR />
      <NextIntlClientProvider
        locale={locale}
        messages={messages}>
        <body>{children}</body>
      </NextIntlClientProvider>
    </html>
  )
}
