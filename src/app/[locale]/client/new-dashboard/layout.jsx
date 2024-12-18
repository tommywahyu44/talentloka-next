'use client'
import Navigation from '@/components/screen/dashboard/client/Navigation'
import { fireAuth } from '@/plugins/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function Dashboard({ children }) {
  onAuthStateChanged(fireAuth, (user) => {
    if (!user) {
      window.location.replace('/client/login')
    }
  })
  return (
    <>
      <Navigation>{children}</Navigation>
    </>
  )
}
