'use client'

import { useTranslations } from 'next-intl'
import { fireAuth } from '@/plugins/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref, onValue } from 'firebase/database'
import { useState, useEffect } from 'react'
import { classNames, mapUpdateDateWithTime } from '@/lib/helpers'
import ListEvents from './ListEvents'
import CreateEventModal from '../client/CreateEventModal'
import AddPromotorDialog from '../client/AddPromotorDialog'
import { apiService } from '@/lib/apiService'

const tabs = [
  { name: 'Active', href: '#', current: true },
  { name: 'Need Approval', href: '#', current: false },
  { name: 'Completed', href: '#', current: false },
]

export default function Events(email) {
  const t = useTranslations('default')
  const [draftedEvents, setDraftedEvents] = useState([])
  const [archivedEvents, setArchivedEvents] = useState([])
  const [activeEvents, setActiveEvents] = useState([])
  const [selectedTab, selectTab] = useState(0)
  const [openModal, setOpenModal] = useState(null)
  const [listPromotor, setListPromotor] = useState([])
  const [event, setEvent] = useState({
    openCreateEvent: false,
    method: null,
    data: null,
  })
  const [addPromotor, setAddPromotor] = useState({
    open: false,
    data: null,
  })

  const closeCreateEvent = () => {
    setEvent({
      openCreateEvent: false,
      method: 'create',
      data: {},
    })
  }

  const createEvent = () => {
    setEvent({
      openCreateEvent: true,
      method: 'create',
      data: {},
    })
  }

  const updateEvent = (data) => {
    setEvent({
      openCreateEvent: true,
      method: 'update',
      data: data,
    })
  }

  const updateStatusEvent = (eventId, action) => {
    apiService.adminUpdateStatusEventPromotor(eventId, email, action)
  }

  const cancelEvent = (data) => {
    apiService.cancelEventPromotor(data?.id, email)
  }

  const closeAddPromotor = () => {
    setAddPromotor({
      open: false,
      data: null,
    })
  }

  const openAddPromotor = (event) => {
    setAddPromotor({
      open: true,
      data: event,
    })
  }

  const fetchActiveEvents = async () => {
    const db = getDatabase()
    const clientRef = ref(db, 'promotor_client_event/')
    onValue(clientRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const listData = mapUpdateDateWithTime(Object.values(data))
        setActiveEvents(listData)
      }
    })
  }

  const fetchArchivedEvents = async () => {
    const db = getDatabase()
    const clientRef = ref(db, 'promotor_archived_client_event/')
    onValue(clientRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const listData = mapUpdateDateWithTime(Object.values(data))
        setArchivedEvents(listData)
      }
    })
  }

  const fetchDraftedEvents = async () => {
    const db = getDatabase()
    const clientRef = ref(db, 'promotor_drafted_client_event/')
    onValue(clientRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const listData = mapUpdateDateWithTime(Object.values(data))
        setDraftedEvents(listData)
      }
    })
  }

  const fetchPromotor = async () => {
    const db = getDatabase()
    const spgRef = ref(db, 'promotor_spg/')
    onValue(spgRef, (snapshot) => {
      const data = snapshot.val()
      if (data && listPromotor.length === 0) {
        const spgs = Object.entries(data).map(([id, value]) => {
          return { id, ...value }
        })
        setListPromotor(spgs)
      }
    })
  }

  onAuthStateChanged(fireAuth, (user) => {
    if (user) {
      email = user.email
      if (email !== 'admin@talentloka.com') {
        window.location.replace('/go-admin/login')
      }
    } else {
      window.location.replace('/go-admin/login')
    }
  })

  //run hook useEffect
  useEffect(() => {
    fetchActiveEvents()
    fetchArchivedEvents()
    fetchDraftedEvents()
    fetchPromotor()
  }, [])
  return (
    <div className="">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-stone-900">
            Clients Admin Dashboard
          </h1>
          {/* <p className="mt-2 text-sm text-stone-700">
            A list of all the clients.
          </p> */}
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => createEvent()}
            type="button"
            className="block rounded-md bg-rose-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm transition duration-300 hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
            Create Event
          </button>
        </div>
      </div>
      <div>
        <div className="sm:hidden">
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-stone-300 py-2 pl-3 pr-10 text-base focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
            defaultValue={tabs.find((tab) => tab.current).name}>
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="mt-8 hidden sm:block">
          <div>
            <nav
              className="-mb-px flex space-x-4"
              aria-label="Tabs">
              {tabs.map((tab, index) => (
                <a
                  key={tab.name}
                  onClick={() => selectTab(index)}
                  className={classNames(
                    index === selectedTab
                      ? 'bg-rose-50 text-rose-600'
                      : 'border-transparent text-stone-500 transition duration-300 hover:text-rose-700',
                    'cursor-pointer whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium'
                  )}>
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <ListEvents
        events={
          selectedTab === 0 ? activeEvents : selectedTab === 1 ? draftedEvents : archivedEvents
        }
        cancelEvent={cancelEvent}
        updateEvent={updateEvent}
        openAddPromotor={openAddPromotor}
        updateStatusEvent={updateStatusEvent}
      />
      <CreateEventModal
        isOpenCreateEvent={event.openCreateEvent}
        closeCreateEvent={closeCreateEvent}
        email={email}
        data={event.data}
        method={event.method}
      />
      <AddPromotorDialog
        isOpenAddPromotor={addPromotor.open}
        closeAddPromotor={closeAddPromotor}
        data={addPromotor?.data}
        listPromotor={listPromotor}
        email={email}
      />
    </div>
  )
}
