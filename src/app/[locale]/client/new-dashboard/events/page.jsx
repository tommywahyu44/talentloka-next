'use client'

import AddPromotorDialog from '@/components/screen/dashboard/client//AddPromotorDialog'
import PaymentHistoryModal from '@/components/screen/dashboard/client//PaymentHistoryModal'
import PaymentModal from '@/components/screen/dashboard/client//PaymentModal'
import CreateEventModal from '@/components/screen/dashboard/client/CreateEventModal'
import ListClientEvents from '@/components/screen/dashboard/client/ListClientEvents'
import { apiService } from '@/lib/apiService'
import { mapUpdateDateWithTime } from '@/lib/helpers'
import localStorageService from '@/utils/localStorageService'
import { getDatabase, onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'

export default function Events() {
  const email = localStorageService.getEmailClient()
  const [listEvents, setListEvents] = useState([])
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
  const [payment, setPayment] = useState({
    open: false,
    data: null,
    method: null,
  })
  const [paymentHistory, setPaymentHistory] = useState({
    open: false,
    data: null,
    method: null,
  })
  const fetchEvents = async () => {
    const db = getDatabase()
    const spgRef = ref(db, 'clients/' + email.replaceAll('.', ','))
    onValue(spgRef, (snapshot) => {
      const data = snapshot.val()
      if (data && data.events) {
        const events = mapUpdateDateWithTime(data.events)
        setListEvents(events)
      }
    })
  }

  const fetchPromotor = async () => {
    const db = getDatabase()
    const spgRef = ref(db, 'promoters_public_info/')
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

  const closePayment = () => {
    setPayment({
      open: false,
      data: null,
      method: null,
    })
  }

  const openPayment = (event, eventStatus) => {
    setPayment({
      open: true,
      method: eventStatus === 'PENDING_PAYMENT_FULL' ? 'full' : 'dp',
      data: event,
    })
  }

  const closePaymentHistory = () => {
    setPaymentHistory({
      open: false,
      data: null,
      method: null,
    })
  }

  const openPaymentHistory = (event, eventStatus) => {
    setPaymentHistory({
      open: true,
      method: eventStatus === 'PENDING_PAYMENT_FULL' ? 'full' : 'dp',
      data: event,
    })
  }

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

  const cancelEvent = (data) => {
    apiService.cancelEvent(data?.id, email)
  }

  useEffect(() => {
    fetchEvents()
    fetchPromotor()
  }, [])

  return (
    <div>
      <div className="mb-32 px-4 pt-6 sm:px-6 md:pt-0 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Events</h1>
            <p className="mt-2 text-sm text-gray-700">
              You can track current, upcoming, and past events with detailed information.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              onClick={() => createEvent()}
              type="button"
              className="block rounded-md bg-rose-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
              Create event
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <ListClientEvents
            events={listEvents}
            cancelEvent={cancelEvent}
            updateEvent={updateEvent}
            openAddPromotor={openAddPromotor}
            openPayment={openPayment}
            openPaymentHistory={openPaymentHistory}
          />
        </div>
        {event.openCreateEvent && (
          <CreateEventModal
            isOpenCreateEvent={event.openCreateEvent}
            closeCreateEvent={closeCreateEvent}
            email={email}
            data={event.data}
            method={event.method}
          />
        )}
        {addPromotor.open && (
          <AddPromotorDialog
            isOpenAddPromotor={addPromotor.open}
            closeAddPromotor={closeAddPromotor}
            data={addPromotor?.data}
            listPromotor={listPromotor}
            email={email}
          />
        )}
        {payment.open && (
          <PaymentModal
            isOpenPayment={payment.open}
            closePayment={closePayment}
            data={payment?.data}
            method={payment?.method}
            email={email}
          />
        )}
        {paymentHistory.open && (
          <PaymentHistoryModal
            isOpenPaymentHistory={paymentHistory.open}
            closePaymentHistory={closePaymentHistory}
            data={paymentHistory?.data}
            method={paymentHistory?.method}
            email={email}
          />
        )}
      </div>
    </div>
  )
}
