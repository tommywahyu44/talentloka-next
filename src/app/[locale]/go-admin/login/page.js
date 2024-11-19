'use client'

import { fireAuth } from '@/plugins/firebase'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import LoginForm from '@/components/screen/auth/admin/LoginForm'
import Swal from 'sweetalert2'
import AuthLayout from '@/components/layout/AuthLayout'

function signIn(email, password) {
  signInWithEmailAndPassword(fireAuth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      if (user.email !== 'spg.admin@talentvis.com') {
        Swal.fire({
          text: "You're not allowed to login!",
          icon: 'error',
          confirmButtonText: 'Okay',
          confirmButtonColor: '#BE123C',
        })
      } else {
        window.location.replace('/go-admin/dashboard')
      }
      // ...
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
      // User is signed in, see docs for a list of available properties
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
