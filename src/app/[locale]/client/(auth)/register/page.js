'use client'

import React from 'react'
import { fireAuth } from '@/plugins/firebase'
import { onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth'
import RegisterForm from '@/components/screen/auth/client/RegisterForm'
import AuthLayout from '@/components/layout/AuthLayout'
import Swal from 'sweetalert2'

function createUser(email, password) {
  createUserWithEmailAndPassword(fireAuth, email, password)
    .then(() => {})
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
