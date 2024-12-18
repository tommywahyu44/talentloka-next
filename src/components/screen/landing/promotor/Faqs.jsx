import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    id: 1,
    question: 'How do I find and accept jobs?',
    answer:
      "Use our app's job board to discover a wide range of promotion opportunities. Simply filter by location, category, and pay rate to find jobs that suit you. Once you find a job you're interested in, tap 'Apply' and follow the on-screen instructions.",
  },
  {
    id: 2,
    question: 'How do I get paid?',
    answer:
      'Payments are processed through our secure payment system. Once you complete a job, your earnings will be deposited into your preferred payment method, such as PayPal or direct deposit. You can track your earnings and payment history directly within the app.',
  },
  {
    id: 3,
    question: 'What kind of support is available?',
    answer:
      'Our dedicated support team is here to assist you 24/7. You can contact us in-app for quick assistance or visit our help center for a comprehensive FAQ and troubleshooting guide.',
  },
  {
    id: 4,
    question: 'How can I improve my performance as a promoter?',
    answer:
      'We offer various resources to help you excel as a promoter, including: \n Performance analytics Track your key metrics to identify areas for improvement. \n Training modules: Access on-demand training to learn new skills and best practices. \n Community forums: Connect with other promoters and share tips and experiences.',
  },
]

export default function Faqs() {
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
                <span className="text-base font-semibold leading-7">{faq.question}</span>
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
              <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </dl>
    </div>
  )
}
