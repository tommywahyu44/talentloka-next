'use client'

import { useState } from 'react'

import { AuthButton } from '@/components/button/Button'
import { AuthInput } from '@/components/input/Input'
import AuthLayout from '@/components/layout/AuthLayout'
import { fireAuth } from '@/plugins/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useTranslations } from 'next-intl'
import Swal from 'sweetalert2'

function sendForgotPassword(email) {
  sendPasswordResetEmail(fireAuth, email)
    .then(() => {
      // Password reset email sent!
      // ..
      window.location.replace('/client/login')
    })
    .catch((error) => {
      var errorMessage = error.message
      // ..
      if (errorMessage === 'Firebase: Error (auth/user-not-found).') {
        errorMessage = 'Email not found'
      }
      Swal.fire({
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#BE123C',
      })
    })
}

export default function ForgotPassword() {
  const t = useTranslations('default')
  const [email, setEmail] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    sendForgotPassword(email)
  }
  return (
    <>
      <AuthLayout>
        <div className="sm:mx-auto sm:w-full">
          <img
            className="mx-auto h-20 w-auto"
            src="/images/marketingo-logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-stone-900">
            {t('authForgotPasswordTitle')}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full">
          <form
            className="space-y-6"
            onSubmit={handleSubmit}>
            <AuthInput
              id="email"
              name="email"
              type="email"
              required
              label={t('authEmailAddress')}
              placeholder={t('commonPlaceholderEmail')}
              value={email}
              onChange={handleEmailChange}
            />
            <div>
              <AuthButton
                marginTop={4}
                type="submit">
                {t('commonSend')}
              </AuthButton>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-stone-500">
            {t('authForgotPasswordLabelQuestion')}{' '}
            <a
              href="/client/login"
              className="font-semibold leading-6 text-rose-600 transition duration-300 hover:text-rose-500">
              Log in
            </a>
          </p>
        </div>
      </AuthLayout>
    </>
  )
}
