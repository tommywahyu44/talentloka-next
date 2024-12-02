'use client'

import DetailEvent from '@/components/screen/dashboard/promotor/DetailEvent'
import ListEvents from '@/components/screen/dashboard/promotor/ListEvents'
import { sampleEvents } from '@/lib/constants'
import { classNames } from '@/lib/helpers'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import { CurrencyDollarIcon, BuildingOfficeIcon, BanknotesIcon } from '@heroicons/react/24/outline'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { fireAuth } from '@/plugins/firebase'
import { getDatabase, ref, onValue } from 'firebase/database'

const stats = [
  {
    id: 1,
    name: 'Total Earnings',
    stat: '12.420.000',
    prefix: 'Rp',
    icon: CurrencyDollarIcon,
    change: '',
    changeType: '',
  },
  {
    id: 2,
    name: 'Monthly Earnings',
    stat: '3.110.000',
    prefix: 'Rp',
    icon: BanknotesIcon,
    change: '20%',
    changeType: 'increase',
  },
  {
    id: 3,
    name: 'Total Events',
    stat: '14',
    prefix: '',
    icon: BuildingOfficeIcon,
    change: '',
    changeType: '',
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
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.id}
                  className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                  <dt>
                    <div className="absolute rounded-md bg-rose-500 p-3">
                      <item.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-white"
                      />
                    </div>
                    <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
                  </dt>
                  <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                    <h1 className="text-2xl font-semibold text-gray-900">
                      {item.prefix} {item.stat}
                    </h1>
                    <p
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
                    </p>
                    <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-medium text-rose-600 hover:text-rose-500">
                          View all<span className="sr-only"> {item.name} stats</span>
                        </a>
                      </div>
                    </div>
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
