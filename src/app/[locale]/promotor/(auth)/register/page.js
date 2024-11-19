'use client'

import React from 'react'
import { fireAuth } from '@/plugins/firebase'
import { onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth'
import RegisterForm from '@/components/screen/auth/promotor/RegisterForm'
import AuthLayout from '@/components/layout/AuthLayout'

import Swal from 'sweetalert2'

function createUser(email, password) {
  createUserWithEmailAndPassword(fireAuth, email, password)
    .then(() => {
      window.location.replace('/promotor/onboarding')
    })
    .catch((error) => {
      const errorMessage = error.message
      // ..
      Swal.fire({
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#BE123C',
      })
    })
}

export default function Registration() {
  onAuthStateChanged(fireAuth, (user) => {
    if (user) {
      window.location.replace('/promotor/onboarding')
    } else {
      // User is signed out
      // ...
    }
  })
  return (
    <>
      <AuthLayout url={'/images/background/bg-auth-spg.jpeg'}>
        <RegisterForm createUser={createUser}></RegisterForm>
      </AuthLayout>
    </>
  )
}
