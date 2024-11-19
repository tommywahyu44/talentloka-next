import { classNames } from '@/lib/helpers'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { fireAuth } from '@/plugins/firebase'
import { signOut } from 'firebase/auth'

import {
  CalendarDaysIcon,
  UserIcon,
  UserGroupIcon,
  HomeIcon,
  ArrowRightStartOnRectangleIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline'

const navigationDemo = [
  { name: 'home', href: '/promotor/dashboard/home', icon: HomeIcon, current: true },
  {
    name: 'events',
    href: '/promotor/dashboard/events',
    icon: CalendarDaysIcon,
    current: false,
  },
  {
    name: 'community',
    href: '/promotor/dashboard/community',
    icon: UserGroupIcon,
    current: false,
  },
  {
    name: 'earning',
    href: '/promotor/dashboard/earnings',
    icon: CurrencyDollarIcon,
    current: false,
  },
  { name: 'profile', href: '/promotor/dashboard/profile', icon: UserIcon, current: false },
  { name: 'logout', href: '#', icon: ArrowRightStartOnRectangleIcon, current: false },
]

export default function Navigation({ children }) {
  const pathname = usePathname()
  const screenName = pathname.split('/').pop()

  const signout = () => {
    signOut(fireAuth)
      .then(() => {
        window.location.replace('/promotor/login')
      })
      .catch(() => {
        // An error happened.
      })
  }
  return (
    <div className="m-auto flex h-full w-full items-center justify-center p-6">
      <div className="h-full items-center rounded-full bg-rose-500 px-5">
        <ul
          role="list"
          className="relative h-full w-10 flex-1 space-y-5 pt-20">
          {navigationDemo.map((item, index) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={item.name === 'logout' ? signout : null}
                className={classNames(
                  item.name === screenName
                    ? 'bg-rose-400 text-white'
                    : 'text-white hover:bg-rose-300',
                  index === navigationDemo.length - 1 ? 'absolute bottom-20' : '',
                  'group flex cursor-pointer gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                )}>
                {index === navigationDemo.length - 1 ? (
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
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex h-full flex-grow flex-col overflow-auto px-8">{children}</div>
    </div>
  )
}
