'use client'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

const Faqs = () => {
  const t = useTranslations('default')
  const [openIndex, setOpenIndex] = useState(null)

  const faqSections = [
    {
      title: t('landingFaqPromotorSection1'),
      items: [
        {
          question: t('landingFaqPromotorSection1question1'),
          answer: t('landingFaqPromotorSection1answer1'),
        },
        {
          question: t('landingFaqPromotorSection1question2'),
          answer: t('landingFaqPromotorSection1answer2'),
        },
        {
          question: t('landingFaqPromotorSection1question3'),
          answer: t('landingFaqPromotorSection1answer3'),
        },
      ],
    },
    {
      title: t('landingFaqPromotorSection2'),
      items: [
        {
          question: t('landingFaqPromotorSection2question1'),
          answer: t('landingFaqPromotorSection2answer1'),
        },
        {
          question: t('landingFaqPromotorSection2question2'),
          answer: t('landingFaqPromotorSection2answer2'),
        },
        {
          question: t('landingFaqPromotorSection2question3'),
          answer: t('landingFaqPromotorSection2answer3'),
        },
      ],
    },
    {
      title: t('landingFaqPromotorSection3'),
      items: [
        {
          question: t('landingFaqPromotorSection3question1'),
          answer: t('landingFaqPromotorSection3answer1'),
        },
        {
          question: t('landingFaqPromotorSection3question2'),
          answer: t('landingFaqPromotorSection3answer2'),
        },
        {
          question: t('landingFaqPromotorSection3question3'),
          answer: t('landingFaqPromotorSection3answer3'),
        },
      ],
    },
    {
      title: t('landingFaqPromotorSection4'),
      items: [
        {
          question: t('landingFaqPromotorSection4question1'),
          answer: t('landingFaqPromotorSection4answer1'),
        },
        {
          question: t('landingFaqPromotorSection4question2'),
          answer: t('landingFaqPromotorSection4answer2'),
        },
      ],
    },
    {
      title: t('landingFaqPromotorSection5'),
      items: [
        {
          question: t('landingFaqPromotorSection5question1'),
          answer: t('landingFaqPromotorSection5answer1'),
        },
        {
          question: t('landingFaqPromotorSection5question2'),
          answer: t('landingFaqPromotorSection5answer2'),
        },
        {
          question: t('landingFaqPromotorSection5question3'),
          answer: t('landingFaqPromotorSection5answer3'),
        },
      ],
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-20 text-center">
        <h2 className="section-caption-gradient text-base font-medium leading-7 text-rose-600">
          FAQ
        </h2>
        <h2 className="mb-4 mt-2 text-4xl font-medium text-black">Frequently Asked Questions</h2>
      </div>
      {faqSections.map((section, sectionIdx) => (
        <div
          key={sectionIdx}
          className="mb-6">
          <h3 className="mb-2 border-b pb-4 pt-4 text-xl font-semibold text-rose-600">
            {section.title}
          </h3>
          {section.items.map((item, idx) => {
            const isOpen = openIndex === `${sectionIdx}-${idx}`
            return (
              <div
                key={idx}
                className="mb-2 border-b pb-2 text-black">
                <button
                  className="flex w-full items-center justify-between py-2 text-left text-lg font-medium"
                  onClick={() => toggleFAQ(`${sectionIdx}-${idx}`)}>
                  {item.question}
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {isOpen && <p className="mt-2 pb-4 text-base text-gray-700">{item.answer}</p>}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Faqs
