'use client'

import { useState, useEffect } from 'react'
import { moneyFormat } from '@/lib/helpers'
import CountUp from 'react-countup'

import { ArrowDownIcon } from '@heroicons/react/24/outline'

const stats = [
  { id: 1, name: 'Events', value: 2000, suffix: '+' },
  { id: 2, name: 'Companies', value: 200, suffix: '+' },
  { id: 3, name: 'Monthly events', value: 100, suffix: '~' },
  { id: 4, name: 'Average fee per event', value: 500, suffix: 'K' },
]

export default function Hero() {
  const [estimationFee, setEstimationFee] = useState(0)
  const handleEstimationFeeChange = function (event) {
    setEstimationFee(event.target.value)
  }
  useEffect(() => {
    const ele = document.querySelector('.estimation-bubble')
    if (ele) {
      ele.style.left = `${Number(estimationFee * 0.74 + 0.3)}rem`
    }
  })

  return (
    <div className="relative pt-14">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#fbcfe8] to-[#bae6fd] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="pb-24 pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              <span className="text-rose-500">Become a Promoter</span> and Make a Difference
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Join our community of talented individuals and earn while doing what you love.
            </p>
            <div className="relative mt-10 flex h-12 items-center justify-center gap-x-6">
              <a
                href="promotor/register"
                className="absolute z-10 rounded-md bg-rose-600 px-3.5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
                Join now
              </a>
              <div
                href="#"
                className="absolute h-10 w-20 animate-ping rounded-md bg-rose-600 text-lg font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"></div>
            </div>
            <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-10 text-gray-800 sm:mt-20 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="flex flex-col gap-y-3 border-l border-white/10 pl-6">
                  <dt className="text-sm leading-6">{stat.name}</dt>
                  <CountUp
                    end={stat.value}
                    suffix={stat.suffix}
                    className="order-first text-3xl font-semibold tracking-tight"
                  />
                </div>
              ))}
            </dl>
          </div>
          <div
            id="benefits"
            className="mt-48 flow-root">
            <div className="grid grid-cols-1 place-items-center gap-x-6 gap-y-6 md:grid-cols-2">
              <div className="relative mt-16 h-full w-full max-w-xl items-center justify-center">
                <h1 className="text-center text-4xl font-semibold tracking-tight text-stone-900">
                  <span className="text-rose-600">Promote it.</span>
                  <br></br>
                  You could earn estimation
                </h1>
                <div className="mb-1 mt-12 block">
                  <label
                    htmlFor="steps-range"
                    className="mx-auto block text-center text-4xl font-extrabold leading-6 text-rose-600">
                    {moneyFormat(estimationFee * 266432)}
                  </label>
                </div>
                <input
                  id="steps-range"
                  name="estimation-slider"
                  type="range"
                  min="0"
                  max="30"
                  value={estimationFee}
                  step="1"
                  onChange={handleEstimationFeeChange}
                  className="range mt-8 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-rose-500"
                />
                <div className="estimation-bubble absolute mt-2 -translate-x-[1.7rem] transform rounded-lg bg-gray-800 px-2 py-1 text-sm">
                  {estimationFee} events
                </div>
                <div className="mt-20 flex flex-col items-center">
                  <ArrowDownIcon className="mb-4 h-6 w-6 animate-bounce text-rose-600" />
                  <a
                    href="promotor/register"
                    className="rounded-md bg-rose-600 px-3.5 py-2.5 text-center text-base font-semibold text-white shadow-sm hover:bg-rose-500">
                    Withdraw
                  </a>
                </div>
              </div>
              <img
                alt="Company name"
                src="/images/booth-spg-landing.jpg"
                className="h-full w-full max-w-xl rounded-3xl object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#fbcfe8] to-[#bae6fd] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  )
}
