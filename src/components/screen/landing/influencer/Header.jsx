'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { fireAuth } from '@/plugins/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const navigation = [
  { name: 'Solution', href: '#solution' },
  { name: 'Company', href: '#company' },
  { name: 'Our Product', href: '#product' },
  { name: 'Contact Us', href: '#contact' },
]

export default function Example() {
  const t = useTranslations('default')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isUserSignin, setUserSignin] = useState(false)

  const stats = [
    {
      label: t('landingPromotorSec2KpiLabel1'),
      value: t('landingPromotorSec2KpiAmount1'),
    },
    {
      label: t('landingPromotorSec2KpiLabel2'),
      value: t('landingPromotorSec2KpiAmount2'),
    },
    {
      label: t('landingPromotorSec2KpiLabel3'),
      value: t('landingPromotorSec2KpiAmount3'),
    },
  ]

  onAuthStateChanged(fireAuth, (user) => {
    if (user) {
      setUserSignin(true)
    } else {
      setUserSignin(false)
    }
  })

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global">
          <div className="flex lg:flex-1">
            <a
              href="#"
              className="-m-1.5 p-1.5">
              <span className="sr-only">Talentvis</span>
              <img
                className="h-16 w-auto"
                src="/images/marketingo-logo.png"
                alt=""
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-stone-700"
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
                className="text-sm font-semibold leading-6 text-stone-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href={isUserSignin ? '/client/dashboard' : '/client/login'}
              className="text-sm font-semibold leading-6 text-stone-900">
              {isUserSignin ? 'Go to dashboard' : 'Log in Client / Brand'}{' '}
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-stone-900/10">
            <div className="flex items-center justify-between">
              <a
                href="#"
                className="-m-1.5 p-1.5">
                <span className="sr-only">Talentvis</span>
                <img
                  className="h-8 w-auto"
                  src="/images/marketingo-logo.png"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-stone-700"
                onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Close menu</span>
                <XMarkIcon
                  className="h-6 w-6"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-stone-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-stone-900 transition duration-300 hover:bg-stone-50">
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href={isUserSignin ? '/client/dashboard' : '/client/login'}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-stone-900 transition duration-300 hover:bg-stone-50">
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
        <div className="relative isolate -z-10">
          <svg
            className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-stone-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
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
              className="overflow-visible fill-stone-50">
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
          </svg>
          <div
            className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
            aria-hidden="true">
            <div
              className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-rose-200 to-pink-200"
              style={{
                clipPath:
                  'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
              }}
            />
          </div>
          <div className="overflow-hidden">
            <div
              id="solution"
              className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-6xl">
                    Maximize Your Marketing Impact<br></br>
                    <span className="text-rose-600">Collaborate with Influencers</span>
                  </h1>
                  <p className="relative mt-6 text-lg leading-8 text-stone-600 sm:max-w-md lg:max-w-none">
                    At Talentvis, we connect you with top influencers to elevate your brand’s
                    presence. Our fee-based services offer you the flexibility to hire influencers
                    for tailored posts and reels that resonate with your audience. Drive engagement,
                    increase visibility, and make your marketing campaigns unforgettable with our
                    experienced and influential talent.
                  </p>
                  <div className="mt-10 flex items-center gap-x-6">
                    <a
                      href="/client/register"
                      className="rounded-md bg-rose-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-300 hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400">
                      {t('commonGetStarted')}
                    </a>
                    <a
                      href="/influencer/register"
                      className="text-sm font-semibold leading-6 text-stone-700">
                      Register as Influencer
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div className="relative">
                      <img
                        src="/images/influencer-1.webp"
                        alt=""
                        className="aspect-[2/3] w-full rounded-xl bg-stone-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-stone-900/10" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <img
                        src="/images/influencer-2.webp"
                        alt=""
                        className="aspect-[2/3] w-full rounded-xl bg-stone-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-stone-900/10" />
                    </div>
                    <div className="relative">
                      <img
                        src="/images/influencer-3.webp"
                        alt=""
                        className="aspect-[2/3] w-full rounded-xl bg-stone-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-stone-900/10" />
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <img
                        src="/images/influencer-4.jpg"
                        alt=""
                        className="aspect-[2/3] w-full rounded-xl bg-stone-900/5 object-cover shadow-lg"
                      />

                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-stone-900/10" />
                    </div>
                    <div className="relative">
                      <img
                        src="/images/spg-4.png"
                        alt=""
                        className="aspect-[2/3] w-full rounded-xl bg-stone-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-stone-900/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content section */}
            <div
              id="company"
              className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                  Who <span className="text-rose-600">We Are</span>
                </h2>
                <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                  <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                    <p className="text-lg leading-8 text-stone-600">
                      Talentvis Influencer Agency offers top-tier professional services to provide
                      experienced and qualified influencers for all your marketing needs. Whether
                      its sales promotion, SPG/SPB events, Crew, or Usher outsourcing, we have a
                      proven track record in managing exhibitions, product launches, brochures,
                      direct sales, and more. Let us help you make your events unforgettable.
                    </p>
                  </div>
                  <div className="lg:flex lg:flex-auto lg:justify-center">
                    <dl className="w-64 space-y-8 xl:w-80">
                      {stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="flex flex-col-reverse gap-y-4">
                          <dt className="text-base leading-7 text-stone-600">{stat.label}</dt>
                          <dd className="text-5xl font-semibold tracking-tight text-stone-900">
                            {stat.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}