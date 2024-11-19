'use client'

import { sampleEarnings } from '@/lib/constants'
import { dateToDateName } from '@/lib/helpers'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from '@headlessui/react'
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {
  Bars3Icon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid'

const transactions = [
  {
    id: 'AAPS0L',
    company: 'Chase & Co.',
    share: 'CAC',
    commission: '+$4.37',
    price: '$3,509.00',
    quantity: '12.00',
    netAmount: '$4,397.00',
  },
  // More transactions...
]

export default function Events() {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Earnings</h1>
          </div>
          <Menu
            as="div"
            className="relative">
            <MenuButton className="flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-800">
              Sort by
              <ChevronUpDownIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-500"
              />
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
              <MenuItem>
                <a
                  href="#"
                  className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
                  Event name
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
                  Date
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
                  Fee
                </a>
              </MenuItem>
            </MenuItems>
          </Menu>
          <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-rose-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
              Export
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full space-y-6 py-2 align-middle sm:px-6 lg:px-8">
              {sampleEarnings.map((transaction) => (
                <div
                  key={transaction.id}
                  className="rounded-xl bg-stone-100 p-4 shadow-sm">
                  <div className="flex w-full flex-row justify-between">
                    <h1>{transaction.event}</h1>
                    <div>{dateToDateName(transaction.date)}</div>
                  </div>
                  <div className="mt-1 flex w-full flex-row justify-between">
                    <div>{transaction.company}</div>
                    <div className="text-green-500">Rp. {transaction.totalFee}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
