'use client'

import AuthLayout from '@/components/layout/AuthLayout'
import RegisterForm from '@/components/screen/auth/client/RegisterForm'
import { fireAuth } from '@/plugins/firebase'
import localStorageService from '@/utils/localStorageService'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import Swal from 'sweetalert2'

function createUser(email, password) {
  createUserWithEmailAndPassword(fireAuth, email, password)
    .then(() => {
      localStorageService.setEmailClient(email)
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
      window.location.replace('/client/dashboard')
    } else {
      // User is signed out
      // ...
    }
  })
  return (
    <>
      <AuthLayout>
        <RegisterForm createUser={createUser}></RegisterForm>
      </AuthLayout>
    </>
  )
}
