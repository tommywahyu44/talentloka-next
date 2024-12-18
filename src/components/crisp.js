'use client'

import { localStorageKeys } from '@/lib/constants'
import { Crisp } from 'crisp-sdk-web'
import { useEffect } from 'react'

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('3e07a94c-3b25-40ff-93ea-636620f728b3')
    const earlyOnboardingClient = localStorage.getItem(localStorageKeys.earlyOnboardingClient)
    if (earlyOnboardingClient) {
      const earlyOnboardingData = JSON.parse(earlyOnboardingClient)
      Crisp.user.setEmail(earlyOnboardingData.email)
    }
  })

  return null
}

export default CrispChat
