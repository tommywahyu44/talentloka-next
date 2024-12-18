'use client'

import { useState } from 'react'

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
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="/images/marketingo-logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-stone-900">
            {t('authForgotPasswordTitle')}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-stone-900">
                {t('authEmailAddress')}
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className="block w-full rounded-md border-0 px-2 py-1 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-rose-600 px-2 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm transition duration-300 hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
                {t('commonSend')}
              </button>
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
