'use client'

import React from 'react'
import { fireAuth } from '@/plugins/firebase'
import { onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth'
import RegisterForm from '@/components/screen/auth/promotor/RegisterForm'
import AuthLayout from '@/components/layout/AuthLayout'

import Swal from 'sweetalert2'
import localStorageService from '@/utils/localStorageService'

function createUser(email, password) {
  createUserWithEmailAndPassword(fireAuth, email, password)
    .then(() => {
      localStorageService.setEmailPromotor(email)
      window.location.replace('/promotor/dashboard')
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
      window.location.replace('/promotor/dashboard')
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
