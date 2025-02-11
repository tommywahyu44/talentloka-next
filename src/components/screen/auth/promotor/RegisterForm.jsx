'use client'

import { AuthButton } from '@/components/button/AuthButton'
import AuthInput from '@/components/input/AuthInput'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function RegistrationForm({ createUser }) {
  const t = useTranslations('default')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('Password does not match')
    } else {
      createUser(email, password)
    }
  }
  return (
    <>
      <div className="sm:mx-auto sm:w-full">
        <img
          className="mx-auto h-20 w-auto"
          src="/images/icon-talentloka.png"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center font-display text-2xl font-bold leading-9 tracking-tight text-stone-900">
          {t('authPromotorRegistrationTitle')}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full">
        <form
          className="space-y-6"
          onSubmit={handleSubmit}>
          <AuthInput
            required
            label={t('authEmailAddress')}
            placeholder={t('commonPlaceholderEmail')}
            value={email}
            onChange={handleEmailChange}
          />
          <AuthInput
            required
            label={t('authPassword')}
            type="password"
            placeholder={t('commonPlaceholderPassword')}
            value={password}
            onChange={handlePasswordChange}
          />
          <AuthInput
            required
            label={t('authConfirmPassword')}
            type="password"
            placeholder={t('commonPlaceholderConfirmPassword')}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <div>
            <AuthButton
              marginTop={4}
              type="submit">
              {t('commonRegister')}
            </AuthButton>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-stone-500">
          {t('authAlreadyHaveAccount')}{' '}
          <a
            href="/promotor/login"
            className="font-semibold leading-6 text-rose-600 transition duration-300 hover:text-rose-500">
            Login
          </a>
        </p>
        <p className="mt-2 text-center text-sm text-stone-500">
          {t('authRegisterAsClient')}{' '}
          <a
            href="/client/register"
            className="font-semibold leading-6 text-rose-600 transition duration-300 hover:text-rose-500">
            {t('commonRegister')}
          </a>
        </p>
      </div>
    </>
  )
}
