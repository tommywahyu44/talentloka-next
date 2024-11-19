'use client'

import { fireAuth } from '@/plugins/firebase'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import AuthLayout from '@/components/layout/AuthLayout'
import LoginForm from '@/components/screen/auth/client/LoginForm'
import Swal from 'sweetalert2'

function signIn(email, password) {
  signInWithEmailAndPassword(fireAuth, email, password)
    .then(() => {})
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
