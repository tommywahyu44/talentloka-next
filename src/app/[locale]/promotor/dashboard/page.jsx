'use client'

import UpdateProfile from '@/components/screen/dashboard/promotor/UpdateProfile'
import { lottieFiles } from '@/lib/constants'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import Box from '@mui/material/Box'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { DocumentMagnifyingGlassIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

import Navigation from '@/components/screen/dashboard/promotor/Navigation'
import { fireAuth } from '@/plugins/firebase'
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth'
import { getDatabase, onValue, ref } from 'firebase/database'

const stepsInfo = [
  { id: 'Step 1', name: 'Email Verification', href: '#' },
  { id: 'Step 2', name: 'Complete Profile', href: '#' },
  { id: 'Step 3', name: 'Admin Approval', href: '#' },
]

import Earnings from '@/components/screen/dashboard/promotor/Earnings'
import Events from '@/components/screen/dashboard/promotor/Events'
import Home from '@/components/screen/dashboard/promotor/Home'
import Swal from 'sweetalert2'

function sendEmailNotification() {
  const actionCodeSettings = {
    url: 'https://talentloka.com/promotor/dashboard',
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

function getHomeUI(navigation, setNavigation, email, profileData, listEvents) {
  switch (navigation) {
    case 'profile':
      return (
        <UpdateProfile
          email={email}
          profileData={profileData}
          isFromRegister={false}
        />
      )
    case 'events':
      return (
        <Events
          profileData={profileData}
          listEvents={listEvents}></Events>
      )
    case 'home':
      return (
        <Home
          setNavigation={setNavigation}
          profileData={profileData}
          listEvents={listEvents}></Home>
      )
    case 'earnings':
      return (
        <Earnings
          profileData={profileData}
          listEvents={listEvents}></Earnings>
      )
    default:
      return <Events email={email} />
  }
}

function getDashboardUI(step, email, profileData, listEvents, navigation, setNavigation) {
  switch (step) {
    case 0:
      return (
        <div className="bg-white">
          <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
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
          <div className="px-6 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <UpdateProfile
                email={email}
                profileData={profileData}
                isFromRegister={true}
              />
            </div>
          </div>
        </div>
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
        <div className="mx-6 bg-white md:ml-32">
          {getHomeUI(navigation, setNavigation, email, profileData, listEvents)}
        </div>
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
  const [navigation, setNavigation] = useState('home')
  const [step, setStep] = useState(-1)
  const [listEvents, setListEvents] = useState([])

  const fetchEvents = async () => {
    const db = getDatabase()
    const spgRef = ref(db, 'events/')
    onValue(spgRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setListEvents(Object.values(data))
      }
    })
  }

  const fetchUserData = async (email) => {
    console.log('email => ', email)
    const emailDoc = email.replaceAll('.', ',')
    const db = getDatabase()
    const spgRef = ref(db, `promoters/${emailDoc}`)
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
      if (!userData.emailVerified && userData.email !== 'admin@talentloka.com') {
        setStep(0)
      } else if (isFirstTime) {
        isFirstTime = false
        fetchUserData(userData.email)
        fetchEvents()
      }
    } else {
      window.location.replace('/promotor/login')
    }
  })

  return (
    <>
      <div className="h-screen">
        <Navigation
          navigation={navigation}
          setNavigation={setNavigation}
          isOnboarded={step == 3}>
          <main>
            <div className="m-auto my-6">
              {step < 3 && (
                <Box sx={{ width: '100%' }}>
                  <Stepper
                    activeStep={step}
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
                step,
                userData?.email ?? '',
                profileData,
                listEvents,
                navigation,
                setNavigation
              )}
            </div>
          </main>
        </Navigation>
      </div>
    </>
  )
}
