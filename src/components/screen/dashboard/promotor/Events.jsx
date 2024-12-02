'use client'

import GridEvents from '@/components/screen/dashboard/promotor/GridEvents'
import DetailEvent from '@/components/screen/dashboard/promotor/DetailEvent'
import { fireAuth } from '@/plugins/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref, onValue } from 'firebase/database'
import { sampleEvents } from '@/lib/constants'
import { classNames } from '@/lib/helpers'
import { useState, useEffect } from 'react'

const tabs = [
  { name: 'Public Events', href: '#' },
  { name: 'Invited Events', href: '#' },
  { name: 'Upcoming Events', href: '#' },
  { name: 'Past Events', href: '#' },
]

export default function Events() {
  const [currentTab, setCurrentTab] = useState(0)
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

  const getEventsUI = () => {
    switch (currentTab) {
      case 0:
        return (
          <GridEvents
            events={listEvents.filter((item) => item.type === 'Public')}
            detailEvent={setDetailEvent}
            userData={userData}
            type={'Public'}
          />
        )
      case 1:
        return (
          <GridEvents
            events={listEvents.filter(
              (item) =>
                item?.listPromotor &&
                item?.listPromotor?.find((item) => item?.spgCode === userData?.code)
            )}
            detailEvent={setDetailEvent}
            userData={userData}
            type={'Invited'}
          />
        )
      case 2:
        return (
          <GridEvents
            events={listEvents.filter(
              (item) =>
                item?.listPromotor &&
                item?.listPromotor?.find((item) => item?.spgCode === userData?.code)
            )}
            detailEvent={setDetailEvent}
            userData={userData}
            type={'Upcoming'}
          />
        )
      case 3:
        return (
          <GridEvents
            events={listEvents.filter(
              (item) =>
                item?.listPromotor &&
                item?.listPromotor?.find((item) => item?.spgCode === userData?.code)
            )}
            detailEvent={setDetailEvent}
            userData={userData}
            type={'Past'}
          />
        )
      default:
        return (
          <GridEvents
            events={sampleEvents.publicEvents}
            detailEvent={setDetailEvent}
            userData={userData}
          />
        )
    }
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
            <div className="sm:hidden">
              <label
                htmlFor="tabs"
                className="sr-only">
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id="tabs"
                name="tabs"
                defaultValue={tabs[currentTab].name}
                className="block w-full rounded-md border-gray-300 focus:border-rose-500 focus:ring-rose-500">
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <nav
                aria-label="Tabs"
                className="flex space-x-4">
                {tabs.map((tab, index) => (
                  <h1
                    key={tab.name}
                    onClick={() => setCurrentTab(index)}
                    aria-current={tab.current ? 'page' : undefined}
                    className={classNames(
                      currentTab === index
                        ? 'bg-rose-100 text-rose-700'
                        : 'text-gray-500 hover:text-gray-700',
                      'cursor-pointer rounded-md px-3 py-2 text-sm font-medium'
                    )}>
                    {tab.name}
                  </h1>
                ))}
              </nav>
            </div>
          </div>
          <div>{getEventsUI()}</div>
        </div>
      )}
    </>
  )
}
