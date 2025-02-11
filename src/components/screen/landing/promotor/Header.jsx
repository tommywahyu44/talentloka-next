'use client'

import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

const navigation = [
  { name: 'landingPromotorHeader1', href: '#benefits' },
  { name: 'landingPromotorHeader2', href: '#partners' },
  { name: 'landingPromotorHeader3', href: '#features' },
  { name: 'landingPromotorHeader4', href: '#stories' },
  { name: 'landingPromotorHeader5', href: '#faq' },
]

export default function Header() {
  const t = useTranslations('default')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const header = document.getElementById('sticky-header')
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('opacity-50') // Reduce opacity when scrolled
      } else {
        header.classList.remove('opacity-50') // Restore full opacity when at top
      }
    })

    // Ensure hover works properly
    header.addEventListener('mouseenter', () => {
      header.classList.add('opacity-100') // Restore opacity when hovered
    })
    header.addEventListener('mouseleave', () => {
      if (window.scrollY > 50) {
        header.classList.add('opacity-50') // Reduce opacity again when not hovered
      }
    })
  })
  return (
    <header
      id="sticky-header"
      className="sticky inset-x-0 top-0 z-50 pt-6 transition-opacity hover:opacity-100">
      <div className="mx-4 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 lg:mx-20">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a
              href="#"
              className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="/images/icon-talentloka.png"
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="h-6 w-6"
              />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900">
                {t(item.name)}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="/promotor/login"
              className="text-sm font-semibold leading-6 text-rose-600">
              {t('commonSignin')}
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </div>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/img/logos/mark.svg?color=rose&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Close menu</span>
              <XMarkIcon
                aria-hidden="true"
                className="h-6 w-6"
              />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-rose-600 hover:bg-gray-50">
                  {t('commonSignin')}
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
