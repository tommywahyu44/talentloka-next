'use client'
import Navigation from '@/components/screen/dashboard/promotor/Navigation'
import { fireAuth } from '@/plugins/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'

export default function Dashboard({ children }) {
  const [userData, setUserData] = useState({})
  onAuthStateChanged(fireAuth, (user) => {
    if (!user) {
      window.location.replace('/promotor/login')
    }
  })
  return (
    <>
      <Navigation>{children}</Navigation>
    </>
  )
}
