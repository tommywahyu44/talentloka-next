'use client'

import DetailEvent from '@/components/screen/dashboard/promotor/DetailEvent'
import ListEvents from '@/components/screen/dashboard/promotor/ListEvents'
import { sampleEvents } from '@/lib/constants'
import { classNames } from '@/lib/helpers'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import { CurrencyDollarIcon, WalletIcon, BanknotesIcon } from '@heroicons/react/24/outline'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { fireAuth } from '@/plugins/firebase'
import { getDatabase, ref, onValue } from 'firebase/database'
import { ClassNames } from '@emotion/react'

const stats = [
  {
    id: 1,
    name: 'Wallet',
    stat: '2.400.000',
    prefix: 'Rp',
    icon: WalletIcon,
    change: '',
    changeType: '',
  },
  {
    id: 2,
    name: 'Total Earnings',
    stat: '12.420.000',
    prefix: 'Rp',
    icon: CurrencyDollarIcon,
    change: '',
    changeType: '',
  },
  {
    id: 3,
    name: 'Monthly Earnings',
    stat: '3.110.000',
    prefix: 'Rp',
    icon: BanknotesIcon,
    change: '20%',
    changeType: 'increase',
  },
]

export default function Home() {
  const [detailEvent, setDetailEvent] = useState(null)
  const [listEvents, setListEvents] = useState([])

  const [userData, setUserData] = useState(null)

  onAuthStateChanged(fireAuth, (user) => {
    if (!user) {
      window.location.replace('/promotor/login')
    } else {
      if (!userData) {
        const email = user.email
        const emailDoc = email.replaceAll('.', ',')
        fetchProfile(emailDoc)
      }
    }
  })

  const fetchProfile = async (email) => {
    const db = getDatabase()
    const spgRef = ref(db, `promoters/${email}`)
    onValue(spgRef, (snapshot) => {
      const data = snapshot.val()
      setUserData(data)
    })
  }

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

  useEffect(() => {
    setTimeout(() => {
      fetchEvents()
    }, 1000)
  }, [])

  return (
    <>
      {detailEvent ? (
        <DetailEvent
          event={detailEvent}
          back={() => setDetailEvent(null)}
        />
      ) : (
        <div>
          <div>
            {/* <h3 className="text-base font-semibold leading-6 text-gray-900">Last 30 days</h3> */}
            <dl className="grid grid-cols-2 gap-5 lg:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.id}
                  className={classNames(
                    item.id === 1
                      ? 'col-span-2 bg-gradient-to-br from-rose-600 via-rose-500 to-rose-600 lg:col-span-1'
                      : 'bg-white',
                    'relative overflow-hidden rounded-lg px-4 pt-5 shadow sm:px-6 sm:pt-6'
                  )}>
                  <dt>
                    <div
                      className={classNames(
                        item.id !== 1 ? 'bg-rose-500' : 'bg-white',
                        'absolute rounded-md p-3'
                      )}>
                      <item.icon
                        aria-hidden="true"
                        className={classNames(
                          item.id !== 1 ? 'text-white' : 'text-rose-500',
                          'h-6 w-6'
                        )}
                      />
                    </div>
                    <p
                      className={classNames(
                        item.id !== 1 ? 'text-gray-500 lg:ml-16' : 'ml-16 text-white',
                        'truncate text-xs font-medium lg:text-sm'
                      )}>
                      {item.name}
                    </p>
                  </dt>
                  <dd
                    className={classNames(
                      item.id !== 1 ? 'text-gray-900 lg:ml-16' : 'ml-16 text-white',
                      'flex items-baseline pb-6 sm:pb-7'
                    )}>
                    <h1 className="text-lg font-semibold lg:text-2xl">
                      {item.prefix} {item.stat}
                    </h1>
                    {/* <p
                      className={classNames(
                        item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                        'ml-2 flex items-baseline text-sm font-semibold'
                      )}>
                      {item.changeType === 'increase' ? (
                        <ArrowUpIcon
                          aria-hidden="true"
                          className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                        />
                      ) : item.changeType === 'decrease' ? (
                        <ArrowDownIcon
                          aria-hidden="true"
                          className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                        />
                      ) : null}

                      <span className="sr-only">
                        {' '}
                        {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by{' '}
                      </span>
                      {item.change}
                    </p> */}
                    {/* <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-medium text-rose-600 hover:text-rose-500">
                          View all<span className="sr-only"> {item.name} stats</span>
                        </a>
                      </div>
                    </div> */}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <ListEvents
            title="Public Events"
            detailEvent={setDetailEvent}
            events={listEvents.filter((item) => item.type === 'Public')}
          />
          <ListEvents
            title="Your Upcoming Events"
            detailEvent={setDetailEvent}
            events={sampleEvents.upcomingEvents}
          />
        </div>
      )}
    </>
  )
}
