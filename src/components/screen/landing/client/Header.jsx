'use client'

import LanguageChanger from '@/components/LanguageChanger'
import { localStorageKeys } from '@/lib/constants'
import { fireAuth } from '@/plugins/firebase'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { onAuthStateChanged } from 'firebase/auth'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import PromoBanner from './PromoBanner'

const navigation = [
  { name: 'landingClientHeader1', href: '#solution' },
  // { name: 'landingClientHeader2', href: '#company' },
  { name: 'landingClientHeader3', href: '#product' },
  { name: 'landingClientHeader4', href: '#pricing' },
  { name: 'landingClientHeader5', href: '#contact' },
]

const partners = [
  {
    name: 'Amidis',
    image: '/images/partner-amidis.png',
  },
  {
    name: 'Antangin',
    image: '/images/partner-antangin.png',
  },
  {
    name: 'Arah Coffee',
    image: '/images/partner-arah.png',
  },
  {
    name: 'Focallure',
    image: '/images/partner-focallure.png',
  },
  {
    name: 'OT Group',
    image: '/images/partner-ot.png',
  },
  {
    name: 'Topgolf',
    image: '/images/partner-topgolf.png',
  },
  {
    name: 'Amidis',
    image: '/images/partner-amidis.png',
  },
  {
    name: 'Antangin',
    image: '/images/partner-antangin.png',
  },
  {
    name: 'Arah Coffee',
    image: '/images/partner-arah.png',
  },
  {
    name: 'Focallure',
    image: '/images/partner-focallure.png',
  },
  {
    name: 'OT Group',
    image: '/images/partner-ot.png',
  },
  {
    name: 'Topgolf',
    image: '/images/partner-topgolf.png',
  },
  {
    name: 'Amidis',
    image: '/images/partner-amidis.png',
  },
  {
    name: 'Antangin',
    image: '/images/partner-antangin.png',
  },
  {
    name: 'Arah Coffee',
    image: '/images/partner-arah.png',
  },
  {
    name: 'Focallure',
    image: '/images/partner-focallure.png',
  },
  {
    name: 'OT Group',
    image: '/images/partner-ot.png',
  },
  {
    name: 'Topgolf',
    image: '/images/partner-topgolf.png',
  },
]

export default function Example() {
  const t = useTranslations('default')
  const locale = useLocale()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isUserSignin, setUserSignin] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  let lastScrollY = 0

  const stats = [
    {
      label: t('landingClientSec2KpiLabel1'),
      value: t('landingClientSec2KpiAmount1'),
    },
    {
      label: t('landingClientSec2KpiLabel2'),
      value: t('landingClientSec2KpiAmount2'),
    },
    {
      label: t('landingClientSec2KpiLabel3'),
      value: t('landingClientSec2KpiAmount3'),
    },
  ]

  const handleClientClick = () => {
    if (isUserSignin) {
      window.location.href = '/client/dashboard'
    } else {
      const earlyOnboardingClient = localStorage.getItem(localStorageKeys.earlyOnboardingClient)
      if (earlyOnboardingClient) {
        window.location.href = '/client/login'
      } else {
        window.location.href = '/client/interest'
      }
    }
  }

  onAuthStateChanged(fireAuth, (user) => {
    if (user) {
      setUserSignin(true)
    } else {
      setUserSignin(false)
    }
  })

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false) // Sembunyikan navbar saat scroll ke bawah
      } else {
        setIsVisible(true) // Tampilkan navbar saat scroll ke atas
      }
      lastScrollY = window.scrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-white">
      {/* Header */}
      <header
        className={`fixed inset-x-0 top-0 z-50 ring-2 ring-neutral-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <PromoBanner />
        <nav
          className="bg-white p-3 py-6 lg:px-4"
          aria-label="Global">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex lg:flex-1">
              <a
                href="#"
                className="-m-1.5 p-1.5">
                <span className="sr-only">Talentvis</span>
                <img
                  className="h-8 w-auto"
                  src="/images/logo-talentloka.png"
                  alt=""
                />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700"
                onClick={() => setMobileMenuOpen(true)}>
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  className="h-6 w-6"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium leading-6 text-slate-900 hover:text-rose-500">
                  {t(item.name)}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
              <LanguageChanger locale={locale} />
              <a
                onClick={handleClientClick}
                className="my-auto cursor-pointer rounded-full bg-gradient-to-r from-rose-600 to-purple-500 px-3 py-1 text-center text-xs font-medium leading-6 text-white hover:to-rose-500">
                {isUserSignin ? 'Dashboard' : 'Log in'}{' '}
              </a>
            </div>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-slate-900/10">
            <div className="flex items-center justify-between">
              <a
                href="#"
                className="-m-1.5 p-1.5">
                <span className="sr-only">Talentvis</span>ç
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-slate-700"
                onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Close menu</span>
                <XMarkIcon
                  className="h-6 w-6"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-slate-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-slate-900 transition duration-300 hover:bg-slate-50">
                      {t(item.name)}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <LanguageChanger locale={locale} />
                  <a
                    href={isUserSignin ? '/client/dashboard' : '/client/login'}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium leading-7 text-slate-900 transition duration-300 hover:bg-slate-50">
                    {isUserSignin ? 'Go to dashboard' : 'Log in'}
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <main className="isolate">
        {/* Hero section */}
        <div className="-z-100 relative isolate">
          {/* <svg
            className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-slate-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
            aria-hidden="true">
            <defs>
              <pattern
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse">
                <path
                  d="M.5 200V.5H200"
                  fill="none"
                />
              </pattern>
            </defs>
            <svg
              x="50%"
              y={-1}
              className="overflow-visible fill-slate-50">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
            />
          </svg> */}
          <div
            className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden lg:ml-24 xl:ml-48"
            aria-hidden="true">
            <div className="aspect-[701/1036] w-[45rem] bg-gradient-to-tr from-rose-200 to-purple-200" />
          </div>
          <img
            src="/images/spg-5.jpg"
            alt=""
            className="mask-radial absolute left-0 top-0 -z-20 aspect-[2/3] h-1/2 w-3/4 rounded-xl bg-white object-cover object-[50%_20%] opacity-50 shadow-lg"
          />
          <div className="overflow-hidden">
            <div
              id="solution"
              className="relative mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                    {t('clientLandingPageHeroTitle1')}
                  </h1>
                  <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
                    <span className="text-rose-600">{t('clientLandingPageHeroTitle2')}</span>
                  </h1>
                  <p className="relative mt-6 text-lg leading-8 text-slate-700 sm:max-w-md lg:max-w-xl">
                    {t('landingClientSec1Description')}
                  </p>
                  <div className="mt-10 flex items-center gap-x-6">
                    <a
                      href="/client/register"
                      className="rounded-md bg-rose-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm transition duration-300 hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400">
                      {t('commonGetStarted')}
                    </a>
                    <a
                      href="/promotor"
                      className="text-sm font-medium leading-6 text-slate-700">
                      {t('commonRegisterAsPromotor')}
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div className="relative">
                      <img
                        src="/images/spg-6.jpg"
                        alt=""
                        className="aspect-[2/3] w-full rounded-xl bg-slate-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/10" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <img
                        src="/images/spg-8.jpg"
                        alt=""
                        className="aspect-[2/3] w-full rounded-xl bg-slate-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/10" />
                    </div>
                    <div className="relative">
                      <img
                        src="/images/spb-1.png"
                        alt=""
                        className="aspect-[2/3] w-full rounded-xl bg-slate-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/10" />
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <img
                        src="/images/spg-7.jpg"
                        alt=""
                        className="aspect-[2/3] w-full rounded-xl bg-slate-900/5 object-cover shadow-lg"
                      />

                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/10" />
                    </div>
                    <div className="relative">
                      <img
                        src="/images/spg-4.png"
                        alt=""
                        className="w-full rounded-xl bg-slate-900/5 object-contain object-bottom shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content section */}
            <div
              id="company"
              className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto items-center justify-center lg:mx-0">
                  <h2 className="section-caption-gradient text-center text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                    Who we are
                  </h2>
                  <div className="mt-8 grid w-full grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                    <p className="mt-8 text-pretty text-base font-medium text-gray-300">
                      {t('landingClientSec2Description1')}
                    </p>
                    <p className="mt-8 text-pretty text-base font-medium text-gray-300">
                      {t('landingClientSec2Description2')}
                    </p>
                  </div>
                </div>
                <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                  <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex flex-col-reverse gap-1">
                        <dt className="text-base/7 text-gray-300">{stat.label}</dt>
                        <dd className="text-4xl font-semibold tracking-tight text-white">
                          {stat.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              <div className="background relative">
                <div className="absolute z-10 h-full w-full bg-black bg-opacity-85"></div>
                <img
                  src="images/arah-spg-landing.jpeg"
                  className="h-full w-full object-cover grayscale-[80%]"></img>
              </div>
            </div>

            {/* Partners */}
            <div className="mx-auto py-10">
              {/* <h2 className="font-display text-lg font-medium leading-7 text-slate-500">
                Trusted by
              </h2> */}
              <div className="slider-partner">
                <div className="slider-partner-items">
                  {partners.map((partner, index) => (
                    <img
                      key={index}
                      alt={partner.name}
                      src={partner.image}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
