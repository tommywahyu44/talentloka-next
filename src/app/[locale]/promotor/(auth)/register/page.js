'use client'

import AuthLayout from '@/components/layout/AuthLayout'
import RegisterForm from '@/components/screen/auth/promotor/RegisterForm'
import { fireAuth } from '@/plugins/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

import localStorageService from '@/utils/localStorageService'
import Swal from 'sweetalert2'

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
