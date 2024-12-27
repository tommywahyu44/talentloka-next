import { classNames } from '@/lib/helpers'
import { fireAuth } from '@/plugins/firebase'
import { signOut } from 'firebase/auth'

import {
  ArrowRightStartOnRectangleIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  HomeIcon,
  UserIcon,
} from '@heroicons/react/24/outline'

const navigationItems = [
  { name: 'home', icon: HomeIcon },
  {
    name: 'events',
    icon: CalendarDaysIcon,
  },
  {
    name: 'transactions',
    icon: CurrencyDollarIcon,
  },
  { name: 'profile', icon: UserIcon },
  { name: 'logout', icon: ArrowRightStartOnRectangleIcon },
]

export default function Navigation({ children, navigation, setNavigation, isOnboarded }) {
  const signout = () => {
    signOut(fireAuth)
      .then(() => {
        window.location.replace('/client/login')
      })
      .catch(() => {
        // An error happened.
      })
  }
  return (
    <>
      <div className="flex h-full w-full items-center justify-center">
        <div className="fixed left-4 top-4 my-auto hidden h-desktop-nav items-center rounded-full bg-gradient-to-br from-rose-600 via-rose-500 to-rose-600 px-5 md:flex">
          <ul
            role="list"
            className="relative h-full w-10 flex-1 space-y-5 pt-20">
            {navigationItems.map((item, index) => (
              <li key={item.name}>
                <a
                  onClick={() =>
                    item.name === 'logout'
                      ? signout()
                      : isOnboarded
                        ? setNavigation(item.name)
                        : null
                  }
                  className={classNames(
                    !isOnboarded && item.name !== 'logout'
                      ? 'text-gray-300'
                      : item.name === navigation
                        ? 'bg-rose-400 text-white'
                        : 'text-white hover:bg-rose-300',
                    index === navigationItems.length - 1 ? 'absolute bottom-20' : '',
                    !isOnboarded && item.name !== 'logout'
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer',
                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                  )}>
                  {index === navigationItems.length - 1 ? (
                    <item.icon
                      aria-hidden="true"
                      className="h-6 w-6 shrink-0"
                    />
                  ) : (
                    <item.icon
                      aria-hidden="true"
                      className="h-6 w-6 shrink-0"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="fixed bottom-2 z-10 flex h-16 w-[94%] items-center rounded-full bg-gradient-to-br from-rose-600 via-rose-500 to-rose-600 px-5 md:hidden">
          <ul
            role="list"
            className="mt-4 grid h-full w-full grid-cols-4 items-center justify-center gap-8">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <a
                  onClick={() =>
                    item.name === 'logout'
                      ? signout()
                      : isOnboarded
                        ? setNavigation(item.name)
                        : null
                  }
                  className={classNames(
                    !isOnboarded && item.name !== 'logout'
                      ? 'text-gray-300'
                      : item.name === navigation
                        ? 'bg-rose-400 text-white'
                        : 'text-white hover:bg-rose-300',
                    !isOnboarded && item.name !== 'logout'
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer',
                    'group mx-auto flex h-12 w-12 gap-x-3 rounded-full text-sm font-semibold leading-6'
                  )}>
                  <item.icon
                    aria-hidden="true"
                    className="m-auto h-6 w-6 shrink-0"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-auto flex-grow overflow-auto sm:px-8">{children}</div>
      </div>
    </>
  )
}
