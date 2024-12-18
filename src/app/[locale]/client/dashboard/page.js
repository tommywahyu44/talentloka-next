'use client'

import Navigation from '@/components/screen/dashboard/client/Navigation'
import OnboardingForm from '@/components/screen/dashboard/client/OnboardingForm'
import { lottieFiles } from '@/lib/constants'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { useLocale } from 'next-intl'
import { useState } from 'react'

import { DocumentMagnifyingGlassIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

import Events from '@/components/screen/dashboard/client/Events'
import Filters from '@/components/screen/dashboard/client/Filters'
import { fireAuth } from '@/plugins/firebase'
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth'
import { getDatabase, onValue, ref } from 'firebase/database'

import { Box, Step, StepLabel, Stepper } from '@mui/material'
import clsx from 'clsx'
import Swal from 'sweetalert2'

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

function getDashboardUI(status, email, navigation, businessType, handleBusinessTypeChange) {
  switch (status) {
    case 0:
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
    case 1:
      return (
        <div className="bg-white">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-20 max-w-3xl text-center sm:mb-0">
              {businessType.isSelected && (
                <OnboardingForm
                  email={email}
                  businessType={businessType.selected}
                />
              )}
              {!businessType.isSelected && (
                <div className="mt-16 h-full items-center justify-center sm:mt-32 lg:mt-48">
                  <div className="mb-10 text-xl font-semibold leading-6 md:mb-14 lg:mb-20">
                    <span
                      id="comments-description"
                      className="text-stone-700">
                      What type of business entity do you represent?
                    </span>
                  </div>
                  <div>
                    <div className="mt-3 flex flex-col space-y-4">
                      <div
                        onClick={() => handleBusinessTypeChange('PT', false)}
                        className={clsx(
                          'flex h-14 cursor-pointer items-center justify-center rounded-lg border p-2',
                          businessType.selected == 'PT' ? 'border-rose-500' : 'border-stone-200'
                        )}>
                        <input
                          id="radio-business-pt"
                          name="radio-business"
                          type="radio"
                          checked={businessType.selected == 'PT'}
                          className="h-4 w-4 border-stone-300 text-rose-600 focus:ring-rose-600"
                          disabled
                        />
                        <label
                          htmlFor="radio-business-yes"
                          className="ml-3 block cursor-pointer text-sm font-medium leading-6 text-stone-900">
                          Limited Liability Company
                        </label>
                      </div>
                      <div
                        onClick={() => handleBusinessTypeChange('PP', false)}
                        className={clsx(
                          'flex h-14 cursor-pointer items-center justify-center rounded-lg border p-2',
                          businessType.selected == 'PP' ? 'border-rose-500' : 'border-stone-200'
                        )}>
                        <input
                          id="radio-business-pp"
                          name="radio-business"
                          type="radio"
                          checked={businessType.selected == 'PP'}
                          className="h-4 w-4 border-stone-300 text-rose-600 focus:ring-rose-600"
                          disabled
                        />
                        <label
                          htmlFor="radio-business-no"
                          className="ml-3 block cursor-pointer text-sm font-medium leading-6 text-stone-900">
                          Sole Proprietorship
                        </label>
                      </div>
                      <div
                        onClick={() => handleBusinessTypeChange('ID', false)}
                        className={clsx(
                          'flex h-14 cursor-pointer items-center justify-center rounded-lg border p-2',
                          businessType.selected == 'ID' ? 'border-rose-500' : 'border-stone-200'
                        )}>
                        <input
                          id="radio-business-id"
                          name="radio-business"
                          type="radio"
                          checked={businessType.selected == 'ID'}
                          className="h-4 w-4 border-stone-300 text-rose-600 focus:ring-rose-600"
                          disabled
                        />
                        <label
                          htmlFor="radio-business-no"
                          className="ml-3 block cursor-pointer text-sm font-medium leading-6 text-stone-900">
                          Individual Business
                        </label>
                      </div>
                    </div>
                  </div>
                  <button
                    className="mx-auto mt-12 flex w-48 justify-center rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm transition duration-300 hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
                    onClick={() => handleBusinessTypeChange(businessType.selected, true)}>
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    case 2:
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
    case 3:
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
  const [onboardingStatus, setOnboardingStatus] = useState(-1)
  const [profileImage, setProfileImage] = useState(
    'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg'
  )
  const [navigation, setNavigation] = useState('home')
  const [businessType, setBusinessType] = useState({ selected: 'PT', isSelected: false })
  const handleBusinessTypeChange = (selected, isSelected) => {
    setBusinessType({ selected: selected, isSelected: isSelected })
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
        setProfileImage(data.companyLogo)
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
        <Navigation
          navigation={navigation}
          setNavigation={setNavigation}
          isOnboarded={onboardingStatus === 'verified'}>
          <main>
            <div className="m-auto my-4 md:pl-24">
              {onboardingStatus < 3 && (
                <Box sx={{ width: '100%' }}>
                  <Stepper
                    activeStep={onboardingStatus}
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
              {getDashboardUI(
                onboardingStatus,
                userData?.email ?? '',
                navigation,
                businessType,
                handleBusinessTypeChange
              )}
            </div>
          </main>
        </Navigation>
      </div>
    </>
  )
}
