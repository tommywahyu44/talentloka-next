'use client'

import EarlyOnboardingLayout from '@/components/layout/EarlyOnboardingLayout'
import { SelectButton, DropdownButton, RangeSliderButton } from '@/components/button/Button'
import { PhoneInput } from '@/components/input/Input'
import { useState } from 'react'
import { Label } from 'flowbite-react'
import { StarIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import LoadingSpinner from '@/components/animation/LoadingSpinner'
import { localStorageKeys } from '@/lib/constants'
import { Crisp } from 'crisp-sdk-web'

const questions = [
  {
    id: 1,
    title: 'What event are you going to join?',
    choices: ['Retail', 'Cosmetics', 'Automotive'],
  },

  {
    id: 2,
    title: 'How many days will this event be held?',
    choices: ['1-3 days', '4-6 days', '1-2 weeks', '3-4 weeks', '> 1 month'],
  },
  {
    id: 3,
    title: 'How many promoters do you need?',
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
      .post('https://asia-southeast1-hireplace.cloudfunctions.net/earlyOnboardingClient', data)
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
          <div className="mt-60">
            <h2 className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
              {questions[currentQuestion].title}
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
          <div className="mt-60">
            <h2 className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
              {questions[currentQuestion].title}
            </h2>
            <SelectButton
              listText={questions[currentQuestion].choices}
              onClick={nextQuestion}
            />
          </div>
        )
      case 2:
        return (
          <div className="mt-60">
            <h2 className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
              {questions[currentQuestion].title}
            </h2>
            <RangeSliderButton onClick={nextQuestion} />
          </div>
        )
      case 3:
        return (
          <div className="mt-60">
            <h2 className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
              Please let us know your email address
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
                  We’ll never share your details. Read our
                  <a
                    href="#"
                    className="ml-1 font-medium text-rose-600 hover:underline dark:text-rose-500">
                    Privacy Policy
                  </a>
                  .
                </div>
              </div>
              <button
                className="relative mx-auto mt-8 flex w-full justify-center rounded-full border-2 border-rose-500 py-2 text-sm font-semibold leading-6 text-rose-600 shadow-sm transition duration-300 hover:bg-rose-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
                type="submit"
                disabled={isSubmit}
                onClick={handleSubmit}>
                {isSubmit ? <LoadingSpinner /> : 'Submit'}
              </button>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="mt-60">
            <div className="text-center">
              <p className="text-xl font-semibold">Thanks for your answers!</p>
              <StarIcon className="mx-auto my-4 h-24 w-24 text-rose-600" />
              <p className="text-base leading-7 text-stone-600">
                Please signup to continue or talk with our agent.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/client/register"
                  className="rounded-md bg-rose-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
                  Signup
                </a>
                <a
                  onClick={() => {
                    Crisp.user.setEmail(email)
                    Crisp.chat.open()
                  }}
                  className="cursor-pointer text-sm font-semibold text-stone-900">
                  Contact agent <span aria-hidden="true">&rarr;</span>
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
      <EarlyOnboardingLayout url={'/images/background/bg-early-onboarding-client.jpeg'}>
        <div className="px-8">
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
