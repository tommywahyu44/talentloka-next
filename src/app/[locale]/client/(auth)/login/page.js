'use client'

import AuthLayout from '@/components/layout/AuthLayout'
import LoginForm from '@/components/screen/auth/client/LoginForm'
import { fireAuth } from '@/plugins/firebase'
import localStorageService from '@/utils/localStorageService'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import Swal from 'sweetalert2'

function signIn(email, password) {
  signInWithEmailAndPassword(fireAuth, email, password)
    .then(() => {
      localStorageService.setEmailClient(email)
    })
    .catch((error) => {
      var errorMessage = error.message
      if (errorMessage === 'Firebase: Error (auth/wrong-password).') {
        errorMessage = 'Password is wrong'
      } else if (errorMessage === 'Firebase: Error (auth/user-not-found).') {
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

export default function Login() {
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
        <LoginForm signIn={signIn}></LoginForm>
      </AuthLayout>
    </>
  )
}
