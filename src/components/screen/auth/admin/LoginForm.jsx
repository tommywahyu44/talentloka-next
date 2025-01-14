'use client'

import { AuthButton } from '@/components/button/Button'
import { AuthInput } from '@/components/input/Input'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function LoginForm({ signIn }) {
  const t = useTranslations('default')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    signIn(email, password)
  }
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="/images/marketingo-logo.png"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-stone-900">
          Admin Login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={handleSubmit}>
          <AuthInput
            required
            label={t('authEmailAddress')}
            placeholder="Enter your Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <AuthInput
            required
            label={t('authPassword')}
            placeholder="Enter your Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <div>
            <AuthButton type="submit">Sign in</AuthButton>
          </div>
        </form>
      </div>
    </>
  )
}
