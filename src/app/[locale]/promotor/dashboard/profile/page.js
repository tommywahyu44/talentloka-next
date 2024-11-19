'use client'

import { useTranslations } from 'next-intl'
import { Fragment, useState } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import UpdateProfile from '@/components/screen/dashboard/promotor/UpdateProfile'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { lottieFiles } from '@/lib/constants'
import { classNames } from '@/lib/helpers'

import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  DocumentMagnifyingGlassIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline'

import { fireAuth } from '@/plugins/firebase'
import { onAuthStateChanged, signOut, sendEmailVerification } from 'firebase/auth'
import { getDatabase, ref, onValue } from 'firebase/database'

const navigation = [{ name: 'Dashboard', href: '/influencer/dashboard', current: true }]

const stepsInfo = [
  { id: 'Step 1', name: 'Complete Profile', href: '#' },
  { id: 'Step 2', name: 'Admin Verification', href: '#' },
  { id: 'Step 3', name: 'Profile Published', href: '#' },
]

import Swal from 'sweetalert2'

function signout() {
  signOut(fireAuth)
    .then(() => {
      // Sign-out successful.
      window.location.replace('/promotor')
    })
    .catch(() => {
      // An error happened.
    })
}

function sendEmailNotification() {
  const actionCodeSettings = {
    url: 'https://hireplace.com/promotor/dashboard',
  }
  sendEmailVerification(userData, actionCodeSettings)
    .then(() => {
      Swal.fire({
        title: 'Email Verification Sent',
        text: 'Please click on the link that has just been sent to your email account to verify your email and continue the registration process.',
        icon: 'success',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#BE123C',
      })
    })
    .catch((error) => {
      console.log('error => ', error)
    })
}

function getDashboardUI(step, email, profileData) {
  switch (step) {
    case 1:
      return (
        <UpdateProfile
          email={email}
          profileData={profileData}
          isFromRegister={true}
        />
      )
    case 2:
      return (
        <div className="bg-white">
          <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <DocumentMagnifyingGlassIcon className="mx-auto h-32 w-32 text-rose-500" />
              <h2 className="mt-8 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Admin Verification
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-stone-600">
                Please wait up to 1x24 hours for our team to verify your new profile before we
                publish it. Thank you for waiting!
              </p>
            </div>
          </div>
        </div>
      )
    case 3:
      return (
        <UpdateProfile
          email={email}
          profileData={profileData}
          isFromRegister={false}
        />
      )
    default:
      return (
        <div className="mx-auto w-72">
          <DotLottieReact
            src={lottieFiles.loading}
            loop
            autoplay
          />
        </div>
      )
  }
}

var userData = {}
var isFirstTime = true

export default function Dashboard() {
  const t = useTranslations('default')
  const [profileData, setProfileData] = useState()
  const [step, setStep] = useState(-1)

  const fetchUserData = async (email) => {
    const emailDoc = email.replaceAll('.', ',')
    const db = getDatabase()
    const spgRef = ref(db, `promotor_spg_unconfirmed/${emailDoc}`)
    onValue(spgRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setProfileData(data)
        setStep(data.confirmed ? 3 : 2)
      } else {
        setStep(1)
      }
    })
  }

  onAuthStateChanged(fireAuth, (user) => {
    if (user) {
      userData = user
      if (!userData.emailVerified) {
        setStep(0)
      } else if (isFirstTime) {
        isFirstTime = false
        fetchUserData(userData.email)
      }
    } else {
      window.location.replace('/influencer/login')
    }
  })
  return (
    <>
      <div className="min-h-full">{getDashboardUI(step, userData?.email ?? '', profileData)}</div>
    </>
  )
}
