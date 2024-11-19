import CreateEventModal from './CreateEventModal'
import { useState, useEffect } from 'react'
import { getDatabase, ref, onValue } from 'firebase/database'
import ListClientEvents from './ListClientEvents'
import { apiService } from '@/lib/apiService'
import AddPromotorDialog from './AddPromotorDialog'
import { mapUpdateDateWithTime } from '@/lib/helpers'
import { set } from 'date-fns'
import PaymentModal from './PaymentModal'
import PaymentHistoryModal from './PaymentHistoryModal'

export default function Events({ email }) {
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
    const spgRef = ref(db, 'promotor_client/' + email.replaceAll('.', ','))
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
    apiService.cancelEventPromotor(data?.id, email)
  }

  useEffect(() => {
    fetchEvents()
    fetchPromotor()
  }, [])

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
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
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <ListClientEvents
                events={listEvents}
                cancelEvent={cancelEvent}
                updateEvent={updateEvent}
                openAddPromotor={openAddPromotor}
                openPayment={openPayment}
                openPaymentHistory={openPaymentHistory}
              />
            </div>
          </div>
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
