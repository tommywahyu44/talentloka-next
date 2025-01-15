import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { AuthButton } from './AuthButton'

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
      <AuthButton
        onClick={() => onClick(value)}
        marginTop={8}>
        {t('commonContinue')}
      </AuthButton>
    </>
  )
}
