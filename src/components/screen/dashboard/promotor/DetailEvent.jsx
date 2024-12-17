'use client'

import { useState } from 'react'
import { capitalizeFirstLetter, classNames, dateToDateFullname, moneyFormat } from '@/lib/helpers'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  WalletIcon,
  CalendarIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  UserCircleIcon,
  ChevronLeftIcon,
  ClockIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/20/solid'
import {
  BellIcon,
  XMarkIcon as XMarkIconOutline,
  HeartIcon,
  ShareIcon,
} from '@heroicons/react/24/outline'

const statuses = {
  Paid: 'text-green-700 bg-green-50 ring-green-600/20',
  Pending: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Cancelled: 'text-red-700 bg-red-50 ring-red-600/10',
  Accepted: 'text-blue-700 bg-blue-50 ring-blue-600/10',
}

import { apiService } from '@/lib/apiService'
import { getStyleEventStatus, getTextEventStatus } from '@/lib/statusUtils'
import Swal from 'sweetalert2'

export default function DetailEvent({ event, profileData, back }) {
  return (
    <>
      <div>
        <header className="relative isolate">
          <div className="mx-auto mt-4 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
              <div className="flex items-center gap-x-6">
                <ChevronLeftIcon
                  onClick={() => back()}
                  className="custor-pointer h-8 w-8 cursor-pointer text-stone-900 hover:text-rose-500"
                />
                <img
                  alt=""
                  src={event.companyLogo}
                  className="h-16 w-16 flex-none rounded-full bg-white p-2 ring-1 ring-gray-900/10"
                />
                <h1>
                  <div className="text-sm leading-6 text-gray-900">{event.title}</div>
                  <div className="mt-1 text-base font-semibold leading-6 text-gray-700">
                    {event.company}
                  </div>
                </h1>
              </div>
              <div className="flex items-center gap-x-4 sm:gap-x-6">
                <ShareIcon className="h-6 w-6 text-gray-500" />
                <HeartIcon className="h-8 w-8 text-gray-500" />
                {!event?.invitationStatus && event.type === 'Public' && (
                  <a
                    onClick={() => {
                      if (event.maxFee >= profileData.fee.SPG) {
                        apiService.promoterUpdateInvitationEvent(event, 'apply')
                      } else {
                        Swal.fire({
                          text:
                            'Sorry your fee is too high to join this event.\nMaximum fee is ' +
                            moneyFormat(event.maxFee),
                          icon: 'warning',
                          confirmButtonText: 'Okay',
                          confirmButtonColor: '#BE123C',
                        })
                      }
                    }}
                    className="cursor-pointer rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
                    Apply
                  </a>
                )}
                {event?.invitationStatus === 'INVITED' && (
                  <a
                    onClick={() => {
                      apiService.promoterUpdateInvitationEvent(event, 'accept')
                    }}
                    className="cursor-pointer rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
                    Accept
                  </a>
                )}
                {event?.invitationStatus === 'INVITED' && (
                  <a
                    onClick={() => {
                      apiService.promoterUpdateInvitationEvent(event, 'decline')
                    }}
                    className="cursor-pointer rounded-md bg-secondary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600">
                    Decline
                  </a>
                )}

                <Menu
                  as="div"
                  className="relative sm:hidden">
                  <MenuButton className="-m-3 block p-3">
                    <span className="sr-only">More</span>
                    <EllipsisVerticalIcon
                      aria-hidden="true"
                      className="h-5 w-5 text-gray-500"
                    />
                  </MenuButton>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                    <MenuItem>
                      <button
                        type="button"
                        className="block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
                        Copy URL
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
                        Edit
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {/* Invoice summary */}
            <div className="lg:col-start-3 lg:row-end-1">
              <h2 className="sr-only">Summary</h2>
              <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                <dl className="flex flex-wrap">
                  <div className="flex-auto py-6 pl-6">
                    <dt className="text-sm font-semibold leading-6 text-gray-900">Description</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-900">{event.description}</dd>
                  </div>

                  {event.status !== '' ? (
                    <div className="flex-none self-end border-t border-gray-900/5 px-6 pt-4">
                      <dt className="sr-only">Status</dt>
                      <dd
                        className={classNames(
                          getStyleEventStatus(event.status),
                          'rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset'
                        )}>
                        {getTextEventStatus(event.status)}
                      </dd>
                    </div>
                  ) : null}
                  <div className="flex w-full flex-none gap-x-4 px-6 pt-6">
                    <dt className="flex-none">
                      <span className="sr-only">Client</span>
                      <UserCircleIcon
                        aria-hidden="true"
                        className="h-6 w-5 text-gray-400"
                      />
                    </dt>
                    <dd className="text-sm font-medium leading-6 text-gray-900">{event.company}</dd>
                  </div>
                  <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                    <dt className="flex-none">
                      <CalendarIcon
                        aria-hidden="true"
                        className="h-6 w-5 text-gray-400"
                      />
                    </dt>
                    <dd className="text-sm leading-6 text-gray-700">
                      <time dateTime="2023-01-31">{dateToDateFullname(event.startDate)}</time>
                    </dd>
                  </div>
                  <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                    <dt className="flex-none">
                      <ClockIcon
                        aria-hidden="true"
                        className="h-6 w-5 text-gray-400"
                      />
                    </dt>
                    <dd className="text-sm leading-6 text-gray-700">
                      {event.startTime} - {event.endTime}
                    </dd>
                  </div>
                  <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                    <dt className="flex-none">
                      <BuildingOfficeIcon
                        aria-hidden="true"
                        className="h-6 w-5 text-gray-400"
                      />
                    </dt>
                    <dd className="text-sm leading-6 text-gray-700">
                      {capitalizeFirstLetter(event.industry)}
                    </dd>
                  </div>
                  <div className="mb-6 mt-4 flex w-full flex-none gap-x-4 px-6">
                    <dd className="text-sm leading-6 text-gray-700">
                      Fee up to {moneyFormat(event.maxFee)}
                    </dd>
                  </div>
                  {event.status === '' ? (
                    <a
                      href="#"
                      className="mx-6 mb-6 w-full rounded-md bg-rose-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
                      {event.type === 'Invited' ? 'Accept' : event.status === '' ? 'Apply' : 'Chat'}
                    </a>
                  ) : (
                    <></>
                  )}
                </dl>
              </div>
            </div>

            {/* Invoice */}
            <img
              src={event.image}
              alt=""
              className="-mx-4 aspect-video w-full object-cover shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg lg:col-span-2 lg:row-span-2 lg:row-end-2"
            />
          </div>
        </div>
      </div>
    </>
  )
}
