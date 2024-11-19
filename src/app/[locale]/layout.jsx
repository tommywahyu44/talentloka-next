import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { locales } from '../../navigation'
import dynamic from 'next/dynamic'
import { Nunito, Roboto } from 'next/font/google'
import './globals.css'

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

export const metadata = {
  title: 'Talentloka Sales Promotion Staffing Solutions',
  description:
    'Talentloka is the latest professional service from Talentvis to provide experienced and qualified staff for sales promotion events. We specialize in SPG/SPB events, Crew, and Usher outsourcing services, with proven experience in managing events such as exhibitions, product launches, brochures, and direct sales.',
  icons: {
    icon: '/favicon.ico', // Path to your favicon
  },
  openGraph: {
    title: 'Talentloka Sales Promotion Staffing Solutions',
    description:
      'Talentloka is the latest professional service from Talentvis to provide experienced and qualified staff for sales promotion events. We specialize in SPG/SPB events, Crew, and Usher outsourcing services, with proven experience in managing events such as exhibitions, product launches, brochures, and direct sales.',
    images: [
      {
        url: 'images/team-spg-landing.jpg', // Path to your image
        width: 1200, // Image width
        height: 630, // Image height
        alt: 'spg team', // Alt text for accessibility
      },
    ],
  },
  twitter: {
    card: 'Talentloka',
    title: 'Talentloka Sales Promotion Staffing Solutions',
    description:
      'Talentloka is the latest professional service from Talentvis to provide experienced and qualified staff for sales promotion events. We specialize in SPG/SPB events, Crew, and Usher outsourcing services, with proven experience in managing events such as exhibitions, product launches, brochures, and direct sales.',
    images: ['images/team-spg-landing.jpg'], // Path to your image
  },
}

export default async function RootLayout({ children, params: { locale } }) {
  const CrispWithNoSSR = dynamic(() => import('../../components/crisp'))

  if (!locales.includes(locale)) {
    notFound()
  }
  const messages = await getMessages()
  return (
    <html
      lang={locale}
      className={`${nunito.variable} ${roboto_mono.variable}`}>
      <head>
        <link
          rel="icon"
          href={metadata.icons.icon}
        />
      </head>
      <CrispWithNoSSR />
      <NextIntlClientProvider
        locale={locale}
        messages={messages}>
        <body>{children}</body>
      </NextIntlClientProvider>
    </html>
  )
}
