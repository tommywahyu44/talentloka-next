'use client'

import DetailEvent from '@/components/screen/dashboard/promotor/DetailEvent'
import GridEvents from '@/components/screen/dashboard/promotor/GridEvents'
import { sampleEvents } from '@/lib/constants'
import { classNames } from '@/lib/helpers'
import { useState } from 'react'

const tabs = [
  { name: 'Public Events', href: '#' },
  { name: 'Invited Events', href: '#' },
  { name: 'Upcoming Events', href: '#' },
  { name: 'Past Events', href: '#' },
]

export default function Events({ profileData, listEvents }) {
  const [currentTab, setCurrentTab] = useState(0)
  const [detailEvent, setDetailEvent] = useState(null)

  const getEventsUI = () => {
    switch (currentTab) {
      case 0:
        return (
          <GridEvents
            events={listEvents.filter((item) => item.type === 'Public')}
            detailEvent={setDetailEvent}
            profileData={profileData}
            type={'Public'}
          />
        )
      case 1:
        return (
          <GridEvents
            events={listEvents.filter(
              (item) =>
                item?.listPromotor &&
                item?.listPromotor?.find((item) => item?.spgCode === profileData?.code)
            )}
            detailEvent={setDetailEvent}
            profileData={profileData}
            type={'Invited'}
          />
        )
      case 2:
        return (
          <GridEvents
            events={listEvents.filter(
              (item) =>
                item?.listPromotor &&
                item?.listPromotor?.find((item) => item?.spgCode === profileData?.code)
            )}
            detailEvent={setDetailEvent}
            profileData={profileData}
            type={'Upcoming'}
          />
        )
      case 3:
        return (
          <GridEvents
            events={listEvents.filter(
              (item) =>
                item?.listPromotor &&
                item?.listPromotor?.find((item) => item?.spgCode === profileData?.code)
            )}
            detailEvent={setDetailEvent}
            profileData={profileData}
            type={'Past'}
          />
        )
      default:
        return (
          <GridEvents
            events={sampleEvents.publicEvents}
            detailEvent={setDetailEvent}
            profileData={profileData}
          />
        )
    }
  }

  return (
    <>
      {detailEvent ? (
        <DetailEvent
          event={detailEvent}
          profileData={profileData}
          back={() => setDetailEvent(null)}
        />
      ) : (
        <div>
          <div>
            <div className="text-rose-500 sm:hidden">
              <label
                htmlFor="tabs"
                className="sr-only">
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id="tabs"
                name="tabs"
                value={tabs[currentTab].name}
                onChange={(e) =>
                  setCurrentTab(tabs.findIndex((tab) => tab.name === e.target.value))
                }
                className="block w-full rounded-md border-rose-100 bg-rose-50 text-rose-600 outline-none focus:border-rose-200 focus:outline-none">
                {tabs.map((tab) => (
                  <option
                    key={tab.name}
                    className="">
                    {tab.name}
                  </option>
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
