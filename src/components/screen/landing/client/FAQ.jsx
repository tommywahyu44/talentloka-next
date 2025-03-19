'use client'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function FAQ() {
  const t = useTranslations('default')
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: t('landingFaqClientSection1question1'),
      answer: t('landingFaqClientSection1answer1'),
    },
    {
      question: t('landingFaqClientSection1question2'),
      answer: t('landingFaqClientSection1answer2'),
    },
    {
      question: t('landingFaqClientSection1question3'),
      answer: t('landingFaqClientSection1answer3'),
    },
    {
      question: t('landingFaqClientSection1question4'),
      answer: t('landingFaqClientSection1answer4'),
    },
    {
      question: t('landingFaqClientSection1question5'),
      answer: t('landingFaqClientSection1answer5'),
    },
    {
      question: t('landingFaqClientSection1question6'),
      answer: t('landingFaqClientSection1answer6'),
    },
    {
      question: t('landingFaqClientSection1question7'),
      answer: t('landingFaqClientSection1answer7'),
    },
    {
      question: t('landingFaqClientSection1question8'),
      answer: t('landingFaqClientSection1answer8'),
    },
    {
      question: t('landingFaqClientSection1question9'),
      answer: t('landingFaqClientSection1answer9'),
    },
    {
      question: t('landingFaqClientSection1question10'),
      answer: t('landingFaqClientSection1answer10'),
    },
    {
      question: t('landingFaqClientSection1question11'),
      answer: t('landingFaqClientSection1answer11'),
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="mx-auto max-w-5xl p-6">
      <div className="mb-20 text-center">
        <h2 className="section-caption-gradient text-base font-medium leading-7 text-rose-600">
          FAQ
        </h2>
        <h2 className="mb-4 mt-2 text-4xl font-medium text-black">Frequently Asked Questions</h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-lg border bg-white p-4 shadow-sm transition-all">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex w-full items-center justify-between text-left text-lg font-medium text-black">
              {faq.question}
              {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {openIndex === index && <p className="mt-2 text-base text-gray-600">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
