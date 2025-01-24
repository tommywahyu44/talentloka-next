'use client'

import LoadingSpinner from '@/components/animation/LoadingSpinner'
import {
  AuthButton,
  DropdownButton,
  RangeSliderButton,
  SelectButton,
} from '@/components/button/Button'
import { PhoneInput } from '@/components/input/Input'
import EarlyOnboardingLayout from '@/components/layout/EarlyOnboardingLayout'
import { localStorageKeys } from '@/lib/constants'
import { StarIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { Label } from 'flowbite-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

const questions = [
  {
    id: 1,
    title: 'clientInterestQuestion1',
    choices: ['Retail', 'Cosmetics', 'Automotive'],
  },

  {
    id: 2,
    title: 'clientInterestQuestion2',
    choices: ['1-3 days', '4-6 days', '1-2 weeks', '3-4 weeks', '> 1 month'],
  },
  {
    id: 3,
    title: 'clientInterestQuestion3',
    choices: ['1', '2', '3', '4', 'Lainnya'],
  },
]

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Entertainment',
  'Education',
  'Hospitality & Tourism',
  'Fashion & Beauty',
  'Media & Advertising',
]

const defaultCountry = {
  name: 'Indonesia',
  flagUrl: 'https://flagcdn.com/id.svg',
  countryCode: '+62',
}

var answers = []

export default function Interest() {
  const t = useTranslations('default')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [country, setCountry] = useState(defaultCountry)
  const [isSubmit, setIsSubmit] = useState(false)

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmit(true)
    const data = {
      email: email,
      contact: `${country.countryCode} ${contact}`,
      eventType: answers[0],
      eventDays: answers[1],
      eventPromotor: answers[2],
    }
    axios
      .post(
        'https://asia-southeast1-talentloka-35463.cloudfunctions.net/earlyOnboardingClient',
        data
      )
      .then(() => {
        localStorage.setItem(localStorageKeys.earlyOnboardingClient, JSON.stringify(data))
        setIsSubmit(false)
        setCurrentQuestion(currentQuestion + 1)
      })
      .catch((e) => {
        setIsSubmit(false)
        console.log(e)
      })
  }

  const progressPercent = () => {
    switch (currentQuestion) {
      case 0:
        return 'w-0'
      case 1:
        return 'w-1/4'
      case 2:
        return 'w-2/4'
      case 3:
        return 'w-3/4'
      default:
        return 'w-full'
    }
  }
  const nextQuestion = (text) => {
    answers.push(text)
    setCurrentQuestion(currentQuestion + 1)
  }

  const getScreensUI = () => {
    switch (currentQuestion) {
      case 0:
        return (
          <div className="my-32">
            <h2 className="font-display text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
              {t(questions[currentQuestion].title)}
            </h2>
            <SelectButton
              listText={questions[currentQuestion].choices}
              onClick={nextQuestion}
            />
            <DropdownButton
              listText={industries}
              onClick={nextQuestion}
            />
          </div>
        )
      case 1:
        return (
          <div className="my-32">
            <h2 className="font-display text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
              {t(questions[currentQuestion].title)}
            </h2>
            <SelectButton
              listText={questions[currentQuestion].choices}
              onClick={nextQuestion}
            />
          </div>
        )
      case 2:
        return (
          <div className="my-32">
            <h2 className="font-display text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
              {t(questions[currentQuestion].title)}
            </h2>
            <RangeSliderButton onClick={nextQuestion} />
          </div>
        )
      case 3:
        return (
          <div className="my-32">
            <h2 className="font-display text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
              {t('clientInterestQuestion4')}
            </h2>
            <div className="mt-8 flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="email1"
                    value="Email"
                  />
                </div>
                <input
                  id="email1"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  className="mb-6 block w-full rounded-lg border-0 px-3 py-2 text-stone-900 shadow-sm outline-none ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                  required
                />
                <PhoneInput
                  label="Phone Number (Optional)"
                  id="contact"
                  value={contact}
                  onChange={(event) => {
                    const { value } = event.target
                    setContact(value)
                  }}
                  selectedCountry={country}
                  setSelectedCountry={(val) => setCountry(val)}
                  errorEmptyMessage="Please fill out this field."
                  isSubmit={isSubmit}
                  isFullWidth={true}
                />
                <div className="mt-4 text-sm">
                  {t('clientInterestQuestionTncText')}
                  <a
                    href="#"
                    className="ml-1 font-medium text-rose-600 hover:underline dark:text-rose-500">
                    Privacy Policy
                  </a>
                  .
                </div>
              </div>
              <AuthButton
                onClick={handleSubmit}
                marginTop={8}
                disabled={isSubmit}>
                {isSubmit ? <LoadingSpinner /> : t('commonSubmit')}
              </AuthButton>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="my-32">
            <div className="text-center">
              {t('clientInterestSuccessText1')}
              <div />
              <StarIcon className="mx-auto my-4 h-24 w-24 text-rose-600" />
              <p className="text-base leading-7 text-stone-600">
                {t('clientInterestSuccessText2')}
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href={'/client/register?email=' + email}
                  className="rounded-md bg-rose-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
                  {t('commonSignup')}
                </a>
                <a
                  href="https://wa.me/6281299880745"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-sm font-semibold text-stone-900">
                  {t('clientInterestSuccessButton2')}
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        )
      default:
        break
    }
  }
  return (
    <>
      <EarlyOnboardingLayout url={'/images/background/bg-auth-client.jpg'}>
        <div>
          <div className="mt-8 h-2.5 w-full rounded-full bg-stone-200 dark:bg-stone-300">
            <div
              className={`h-2.5 rounded-full bg-rose-600 transition-[width] duration-700 ease-in-out ${progressPercent()}`}></div>
          </div>
          {getScreensUI()}
        </div>
      </EarlyOnboardingLayout>
    </>
  )
}
