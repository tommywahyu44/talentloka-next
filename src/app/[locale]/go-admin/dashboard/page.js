'use client'

import Clients from '@/components/screen/dashboard/admin/Clients'
import Events from '@/components/screen/dashboard/admin/Events'
import Spg from '@/components/screen/dashboard/admin/Spg'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  HomeIcon,
  TicketIcon,
  UserGroupIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'
import { Fragment, useState } from 'react'

import { fireAuth } from '@/plugins/firebase'
import { onAuthStateChanged } from 'firebase/auth'

import { classNames } from '@/lib/helpers'

const navigation = [
  {
    name: 'Dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Clients',
    icon: UsersIcon,
  },
  {
    name: 'Promotor',
    icon: UserGroupIcon,
  },
  {
    name: 'Events',
    icon: TicketIcon,
  },
  {
    name: 'Activity',
    icon: CalendarIcon,
  },
  {
    name: 'Reports',
    icon: ChartPieIcon,
  },
]

export default function Example() {
  const t = useTranslations('default')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentNav, setCurrentNav] = useState(1)
  const [userData, setUserData] = useState(null)

  function handleNavigation(item, index) {
    setCurrentNav(index)
  }

  onAuthStateChanged(fireAuth, (user) => {
    if (user) {
      if (user.email !== 'admin@talentloka.com') {
        window.location.replace('/go-admin/login')
      } else {
        setUserData(user)
      }
    }
  })

  function renderNavigation() {
    switch (currentNav) {
      case 1:
        return <Clients email={userData?.email ?? ''}></Clients>
      case 2:
        return <Spg email={userData?.email ?? ''}></Spg>
      case 3:
        return <Events email={userData?.email ?? ''}></Events>
      default:
        return <Clients email={userData?.email ?? ''}></Clients>
    }
  }

  return (
    <>
      <div>
        <Transition
          show={sidebarOpen}
          as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}>
            <TransitionChild
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div className="fixed inset-0 bg-slate-900/80" />
            </TransitionChild>

            <div className="fixed inset-0 flex">
              <TransitionChild
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full">
                <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <TransitionChild
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </TransitionChild>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900 px-6 pb-2 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="hhttps://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/company-logo/12f1df4c17810392eb26bbcb43557a40.png"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul
                        role="list"
                        className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul
                            role="list"
                            className="-mx-2 space-y-1">
                            {navigation.map((item, index) => (
                              <li key={item.name}>
                                <a
                                  onClick={() => handleNavigation(item, index)}
                                  className={classNames(
                                    index == currentNav
                                      ? 'bg-slate-800 text-white'
                                      : 'text-slate-400 transition duration-300 hover:bg-slate-800 hover:text-white',
                                    'group flex cursor-pointer gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                                  )}>
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-slate-400">
                            Your teams
                          </div>
                          <ul
                            role="list"
                            className="-mx-2 mt-2 space-y-1">
                            {/* {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? "bg-slate-800 text-white"
                                      : "text-slate-400 transition duration-300 hover:text-white transition duration-300 hover:bg-slate-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}>
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-[0.625rem] font-medium text-slate-400 group-transition duration-300 hover:text-white">
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))} */}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900 px-6">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/company-logo/12f1df4c17810392eb26bbcb43557a40.png"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul
                role="list"
                className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul
                    role="list"
                    className="-mx-2 space-y-1">
                    {navigation.map((item, index) => (
                      <li key={item.name}>
                        <a
                          onClick={() => handleNavigation(item, index)}
                          className={classNames(
                            index == currentNav
                              ? 'bg-slate-800 text-white'
                              : 'text-slate-400 transition duration-300 hover:bg-slate-800 hover:text-white',
                            'group flex cursor-pointer gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                          )}>
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-slate-400">Star Clients</div>
                  <ul
                    role="list"
                    className="-mx-2 mt-2 space-y-1">
                    {/* {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? "bg-slate-800 text-white"
                              : "text-slate-400 transition duration-300 hover:text-white transition duration-300 hover:bg-slate-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}>
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-[0.625rem] font-medium text-slate-400 group-transition duration-300 hover:text-white">
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))} */}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-slate-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-slate-400 lg:hidden"
            onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon
              className="h-6 w-6"
              aria-hidden="true"
            />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-white">Dashboard</div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-8 rounded-full bg-slate-800"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </a>
        </div>

        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">{renderNavigation()}</div>
        </main>
      </div>
    </>
  )
}
