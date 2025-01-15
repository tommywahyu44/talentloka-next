import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function RangeSliderButton({ onClick }) {
  const t = useTranslations('default')
  const [value, setValue] = useState(0)
  const handleChange = function (event) {
    setValue(event.target.value)
  }

  return (
    <>
      <div className="mt-20">
        <div className="mb-1 block">
          <label
            htmlFor="steps-range"
            className="mx-auto block text-center text-4xl font-extrabold leading-6 text-rose-600">
            {value}
          </label>
        </div>
        <input
          id="steps-range"
          type="range"
          min="0"
          max="30"
          value={value}
          step="1"
          onChange={handleChange}
          className="range mt-8 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-rose-500"
        />
      </div>
      <button
        className="relative mx-auto mt-12 flex w-full justify-center rounded-full border-2 border-rose-500 py-2 text-sm font-semibold leading-6 text-rose-600 shadow-sm transition duration-300 hover:bg-rose-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
        onClick={() => onClick(value)}>
        {t('commonContinue')}
      </button>
    </>
  )
}
