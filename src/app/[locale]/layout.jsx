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
      <CrispWithNoSSR />
      <NextIntlClientProvider
        locale={locale}
        messages={messages}>
        <body>{children}</body>
      </NextIntlClientProvider>
    </html>
  )
}
