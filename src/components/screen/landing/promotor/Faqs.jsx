import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'
const faqs = [
  {
    id: 1,
    question: 'landingPromotorSec4Item1Title',
    answer: 'landingPromotorSec4Item1Description',
  },
  {
    id: 2,
    question: 'landingPromotorSec4Item2Title',
    answer: 'landingPromotorSec4Item2Description',
  },
  {
    id: 3,
    question: 'landingPromotorSec4Item3Title',
    answer: 'landingPromotorSec4Item3Description',
  },
  {
    id: 4,
    question: 'landingPromotorSec4Item4Title',
    answer: 'landingPromotorSec4Item4Description',
  },
]

export default function Faqs() {
  const t = useTranslations('default')
  return (
    <div
      id="faq"
      className="mx-auto max-w-2xl divide-y divide-gray-900/10 px-6 pb-8 sm:pb-24 sm:pt-12 lg:max-w-7xl lg:px-8 lg:pb-32">
      <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
        Frequently asked questions
      </h2>
      <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
        {faqs.map((faq) => (
          <Disclosure
            key={faq.question}
            as="div"
            className="pt-6">
            <dt>
              <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                <span className="text-base font-semibold leading-7">{t(faq.question)}</span>
                <span className="ml-6 flex h-7 items-center">
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="h-6 w-6 group-data-[open]:hidden"
                  />
                  <ChevronUpIcon
                    aria-hidden="true"
                    className="h-6 w-6 [.group:not([data-open])_&]:hidden"
                  />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel
              as="dd"
              className="mt-2 pr-12">
              <p className="text-base leading-7 text-gray-600">{t(faq.answer)}</p>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </dl>
    </div>
  )
}
