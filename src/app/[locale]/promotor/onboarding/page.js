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
            <div className="mx-auto max-w-2xl text-center">
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
      window.location.replace('/promotor/dashboard/home')
      return (
        <div className="bg-white">
          <div className="px-6 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-5xl text-center">
              <UpdateProfile
                email={email}
                profileData={profileData}
                isFromRegister={false}
              />
            </div>
          </div>
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
      if (!userData.emailVerified && userData.email !== 'admin@talentloka.com') {
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
      <div className="min-h-full">
        <div className="bg-rose-950 pb-32">
          <Disclosure
            as="nav"
            className="bg-rose-950">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
                  <div className="border-b">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-8 w-8"
                            src="/favicon.png"
                            alt="Your Company"
                          />
                        </div>
                        <div className="hidden md:block">
                          {/* <div className="ml-10 flex items-baseline space-x-4">
                            {navigation.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? "bg-stone-900 text-white"
                                    : "text-stone-300 transition duration-300 hover:bg-stone-700 transition duration-300 hover:text-white",
                                  "rounded-md px-3 py-2 text-sm font-medium"
                                )}
                                aria-current={
                                  item.current ? "page" : undefined
                                }>
                                {item.name}
                              </a>
                            ))}
                          </div> */}
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          {/* Profile dropdown */}
                          <Menu
                            as="div"
                            className="relative ml-3">
                            <div>
                              <MenuButton className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-stone-800">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                <img
                                  className="h-8 w-8 rounded-full object-cover ring-1 ring-white"
                                  src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                                  alt=""
                                />
                              </MenuButton>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95">
                              <MenuItems className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <MenuItem key="email">
                                  <h1 className="px-4 py-2 text-sm font-bold tracking-tight text-stone-700">
                                    {userData?.email ?? ''}
                                  </h1>
                                </MenuItem>
                                <MenuItem key="Signout">
                                  <a
                                    className="block cursor-pointer px-4 py-2 text-sm text-stone-700 transition duration-300 hover:bg-stone-200"
                                    onClick={signout}>
                                    Sign out
                                  </a>
                                </MenuItem>
                              </MenuItems>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-stone-800 p-2 text-stone-400 transition duration-300 hover:bg-stone-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-stone-800">
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <Bars3Icon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </DisclosureButton>
                      </div>
                    </div>
                  </div>
                </div>

                <DisclosurePanel className="border-b border-stone-700 md:hidden">
                  <div className="space-y-1 px-2 py-3 sm:px-3">
                    {navigation.map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-stone-900 text-white'
                            : 'text-stone-300 transition duration-300 hover:bg-stone-700 hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}>
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </div>
                  <div className="border-t border-stone-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0 bg-white">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                          alt=""
                        />
                      </div>
                      <button
                        type="button"
                        className="relative ml-auto flex-shrink-0 rounded-full bg-stone-800 p-1 text-stone-400 transition duration-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-stone-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      <DisclosureButton>
                        <h1 className="px-4 py-2 text-sm tracking-tight text-stone-700">
                          {userData?.email ?? ''}
                        </h1>
                      </DisclosureButton>
                      <DisclosureButton
                        onClick={signout}
                        className="block rounded-md px-3 py-2 text-base font-medium text-stone-400 transition duration-300 hover:bg-stone-700 hover:text-white">
                        Sign out
                      </DisclosureButton>
                    </div>
                  </div>
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
          <header className="py-10">
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard SPG</h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-screen-2xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
              <nav
                aria-label="Progress"
                className="mx-auto mt-10 max-w-screen-lg">
                <ol
                  role="list"
                  className="space-y-4 md:flex md:space-x-8 md:space-y-0">
                  {stepsInfo.map((stepInfo, index) => (
                    <li
                      key={stepInfo.name}
                      className="md:flex-1">
                      {index < step ? (
                        <a
                          className="flex flex-col border-l-4 border-rose-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                          aria-current="step">
                          <span className="text-sm font-medium text-rose-600">{stepInfo.id}</span>
                          <span className="text-sm font-medium text-stone-700">
                            {stepInfo.name}
                          </span>
                        </a>
                      ) : (
                        <a className="group flex flex-col border-l-4 border-stone-200 py-2 pl-4 transition duration-300 hover:border-stone-300 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                          <span className="group-transition text-sm font-medium text-stone-500 duration-300 hover:text-stone-700">
                            {stepInfo.id}
                          </span>
                          <span className="text-sm font-medium text-stone-700">
                            {stepInfo.name}
                          </span>
                        </a>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
              {getDashboardUI(step, userData?.email ?? '', profileData)}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
