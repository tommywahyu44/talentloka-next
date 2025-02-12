'use client'

import Navigation from '@/components/screen/dashboard/client/Navigation'
import { lottieFiles } from '@/lib/constants'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { useLocale } from 'next-intl'
import { useState } from 'react'

import { DocumentMagnifyingGlassIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

import Events from '@/components/screen/dashboard/client/Events'
import Filters from '@/components/screen/dashboard/client/Filters'
import { fireAuth } from '@/plugins/firebase'
import { onAuthStateChanged, sendEmailVerification, signOut } from 'firebase/auth'
import { getDatabase, onValue, ref } from 'firebase/database'

import OnboardingLayout from '@/components/layout/OnboardingLayout'
import Profile from '@/components/screen/dashboard/client/Profile'
import Transactions from '@/components/screen/dashboard/client/Transactions'
import clientFavoriteService from '@/services/clientFavoriteService'
import { Box, Step, StepLabel, Stepper } from '@mui/material'
import Swal from 'sweetalert2'
import { BusinessTypeStep } from './BusinessTypeStep'

const stepsInfo = [
  { id: 'Step 1', name: 'Email Verification', href: '#' },
  { id: 'Step 2', name: 'Complete Profile', href: '#' },
  { id: 'Step 3', name: 'Admin Approval', href: '#' },
]

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

function getHomeUI(navigation, email, listInitFavorites, favorites, setListFavorites, userProfile) {
  switch (navigation) {
    case 'events':
      return (
        <Events
          email={email}
          favorites={favorites}
        />
      )
    case 'home':
      return (
        <Filters
          email={email}
          listInitFavorites={listInitFavorites}
          favorites={favorites}
          setListFavorites={setListFavorites}
          userProfile={userProfile}></Filters>
      )
    case 'transactions':
      return <Transactions email={email}></Transactions>
    case 'profile':
      return (
        <Profile
          email={email}
          userProfile={userProfile}
        />
      )
    default:
      return (
        <Events
          email={email}
          favorites={favorites}
        />
      )
  }
}

function getOnboardingUI(
  userProfile,
  status,
  email,
  navigation,
  businessType,
  handleBusinessTypeChange,
  favorites,
  setListFavorites
) {
  if (status < 3) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-3xl text-center">
          {status < 3 && (
            <Box sx={{ width: '100%' }}>
              <Stepper
                activeStep={status}
                alternativeLabel>
                {stepsInfo.map((label, index) => (
                  <Step
                    key={label.name}
                    sx={{
                      '& .MuiStepLabel-root .Mui-completed': {
                        color: '#9f1239',
                      },
                      '& .MuiStepLabel-root .Mui-active': {
                        color: '#e11d48',
                      },
                      '& .MuiStepConnector-line': {
                        borderWidth: 2,
                      },
                      '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
                        borderColor: '#e11d48',
                      },
                      '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
                        borderColor: '#9f1239',
                      },
                      '.MuiStepIcon-root': {
                        width: 30,
                        height: 30, // Increase the icon font size if needed
                      },
                    }}>
                    <StepLabel>{label.name}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          )}
          {status === 0 && (
            <div>
              <EnvelopeIcon className="mx-auto h-32 w-32 text-rose-500" />
              <h2 className="mt-8 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Email Verification
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
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
          )}
          {status === 1 && (
            <BusinessTypeStep
              email={email}
              businessType={businessType}
              handleBusinessTypeChange={handleBusinessTypeChange}
            />
          )}
          {status === 2 && (
            <div>
              <DocumentMagnifyingGlassIcon className="mx-auto mt-12 h-32 w-32 text-rose-500" />
              <h2 className="mt-8 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Account Verification
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
                You are not yet verified. Please wait up to 1x24 hours for our team to verify your
                account before you can use it. Thank you for waiting!
              </p>
            </div>
          )}
        </div>
      </div>
    )
  } else {
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
  const [onboardingStatus, setOnboardingStatus] = useState(-1)
  const [userProfile, setUserProfile] = useState(null)
  const [navigation, setNavigation] = useState('home')
  const [businessType, setBusinessType] = useState({ selected: 'PT', isSelected: false })
  const favoritesStorage = clientFavoriteService.get()
  const [favorites, setListFavorites] = useState(favoritesStorage ?? [])
  const handleBusinessTypeChange = (selected, isSelected) => {
    setBusinessType({ selected: selected, isSelected: isSelected })
  }

  const signout = () => {
    signOut(fireAuth)
      .then(() => {
        window.location.replace('/client/login')
      })
      .catch(() => {
        // An error happened.
      })
  }

  const fetchUserData = async (email) => {
    const emailDoc = email.replaceAll('.', ',')
    const db = getDatabase()

    const clientRef = ref(db, `clients/${emailDoc}`)
    onValue(clientRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        isVerified = data.isVerified
        listInitFavorites = data.favorited.length == 0 ? [] : data.favorited.split(',')
        setUserProfile(data)
        setOnboardingStatus(isVerified ? 3 : 2)
      } else {
        setOnboardingStatus(1)
      }
    })
  }

  onAuthStateChanged(fireAuth, (user) => {
    if (user) {
      userData = user
      if (!userData.emailVerified && userData.email !== 'admin@talentloka.com') {
        setOnboardingStatus(0)
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
        {onboardingStatus >= 3 && (
          <Navigation
            navigation={navigation}
            setNavigation={setNavigation}
            isOnboarded={onboardingStatus >= 3}>
            <main>
              <div className="m-auto my-4">
                <div className="md:ml-24">
                  {getHomeUI(
                    navigation,
                    userData.email,
                    listInitFavorites,
                    favorites,
                    setListFavorites,
                    userProfile
                  )}
                </div>
              </div>
            </main>
          </Navigation>
        )}
        {onboardingStatus < 3 && (
          <OnboardingLayout
            email={userData.email}
            signout={signout}>
            <main>
              <div className="m-auto my-4">
                {getOnboardingUI(
                  userProfile,
                  onboardingStatus,
                  userData?.email ?? '',
                  navigation,
                  businessType,
                  handleBusinessTypeChange,
                  favorites,
                  setListFavorites
                )}
              </div>
            </main>
          </OnboardingLayout>
        )}
      </div>
    </>
  )
}
