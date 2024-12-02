'use client'

import { useLocale } from 'next-intl'
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
import OnboardingForm from '@/components/screen/dashboard/client/OnboardingForm'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import Navigation from '@/components/screen/dashboard/client/Navigation'
import { lottieFiles } from '@/lib/constants'
import { classNames } from '@/lib/helpers'

import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  DocumentMagnifyingGlassIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline'

import Filters from '@/components/screen/dashboard/client/Filters'
import Events from '@/components/screen/dashboard/client/Events'
import { fireAuth } from '@/plugins/firebase'
import { onAuthStateChanged, signOut, sendEmailVerification } from 'firebase/auth'
import { getDatabase, ref, onValue } from 'firebase/database'

import Swal from 'sweetalert2'
import LanguageChanger from '@/components/LanguageChanger'
import { clientDashboard } from '@/lib/constants'

function sendEmailNotification() {
  Swal.showLoading()
  const actionCodeSettings = {
    url: 'https://talentloka.com/client/dashboard',
  }
  sendEmailVerification(userData, actionCodeSettings)
    .then(() => {
      Swal.hideLoading()
      Swal.fire({
        title: 'Email Verification Sent',
        text: 'Please click on the link that has just been sent to your email account to verify your email and continue the registration process.',
        icon: 'success',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#BE123C',
      })
    })
    .catch((error) => {
      Swal.hideLoading()
      console.log('error => ', error)
    })
}

function getHomeUI(navigation, email, listInitFavorites) {
  switch (navigation) {
    case 'events':
      return <Events email={email} />
    case 'home':
      return (
        <Filters
          email={email}
          listInitFavorites={listInitFavorites}></Filters>
      )
    default:
      return <Events email={email} />
  }
}

function getDashboardUI(status, email, navigation) {
  switch (status) {
    case 'email not verified':
      return (
        <div className="bg-white px-8 sm:px-0">
          <div className="px-0 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <EnvelopeIcon className="mx-auto h-32 w-32 text-rose-500" />
              <h2 className="mt-8 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Email Verification
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-stone-600">
                Please click the button below to send email verification to verify your email.
              </p>
              <div>
                <button
                  type="submit"
                  className="mx-auto mt-12 flex w-48 justify-center rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm transition duration-300 hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
                  onClick={() => sendEmailNotification()}>
                  Send Email Verification
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    case 'not onboarded':
      return (
        <div className="bg-white">
          <div className="px-0 sm:px-6 lg:px-8">
            <div className="mx-auto mb-20 max-w-2xl text-center sm:mb-0">
              <OnboardingForm email={email} />
            </div>
          </div>
        </div>
      )
    case 'not verified':
      return (
        <div className="bg-white px-8 sm:px-0">
          <div className="px-0 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <DocumentMagnifyingGlassIcon className="mx-auto h-32 w-32 text-rose-500" />
              <h2 className="mt-8 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                Account Verification
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-stone-600">
                You are not yet verified. Please wait up to 1x24 hours for our team to verify your
                account before you can use it. Thank you for waiting!
              </p>
            </div>
          </div>
        </div>
      )
    case 'verified':
      return <div className="md:ml-24">{getHomeUI(navigation, email, listInitFavorites)}</div>
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
var listInitFavorites = []
var isVerified = false
var isFirstTime = true

export default function Dashboard() {
  const locale = useLocale()
  const [onboardingStatus, setOnboardingStatus] = useState('')
  const [profileImage, setProfileImage] = useState(
    'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg'
  )
  const [navigation, setNavigation] = useState('home')

  const fetchUserData = async (email) => {
    const emailDoc = email.replaceAll('.', ',')
    const db = getDatabase()

    const clientRef = ref(db, `clients/${emailDoc}`)
    onValue(clientRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        isVerified = data.isVerified
        listInitFavorites = data.favorited.length == 0 ? [] : data.favorited.split(',')
        setProfileImage(data.companyLogo)
        setOnboardingStatus(isVerified ? 'verified' : 'not verified')
      } else {
        setOnboardingStatus('not onboarded')
      }
    })
  }

  onAuthStateChanged(fireAuth, (user) => {
    if (user) {
      userData = user
      if (!userData.emailVerified && userData.email !== 'admin@talentloka.com') {
        setOnboardingStatus('email not verified')
      } else if (isFirstTime || !onboardingStatus) {
        isFirstTime = false
        fetchUserData(userData.email)
      }
    } else {
      window.location.replace('/client/login')
    }
  })

  return (
    <>
      <div className="h-screen">
        <Navigation
          navigation={navigation}
          setNavigation={setNavigation}
          isOnboarded={onboardingStatus === 'verified'}>
          <main>
            <div className="m-auto my-4 max-w-screen-2xl">
              {getDashboardUI(onboardingStatus, userData?.email ?? '', navigation)}
            </div>
          </main>
        </Navigation>
      </div>
    </>
  )
}
