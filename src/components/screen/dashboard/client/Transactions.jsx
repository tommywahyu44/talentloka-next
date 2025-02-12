'use client'

import { dateToDateFullname, mapUpdateDateWithTime, moneyFormat } from '@/lib/helpers'
import { Wallet } from '@mui/icons-material'

import { getDatabase, onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export default function Transactions({ email }) {
  const t = useTranslations('default')
  const [listEvents, setListEvents] = useState([])
  const fetchEvents = async () => {
    const db = getDatabase()
    const eventRef = ref(db, 'events/')
    onValue(eventRef, (snapshot) => {
      const data = Object.values(snapshot.val())
      if (data && data.length > 0) {
        const filteredEvents = data.filter((event) => event.email === email)
        const events = mapUpdateDateWithTime(filteredEvents)
        let eventTransactions = []
        events.forEach((event) => {
          if (event.paymentDp && event.paymentDp.timestamp !== '')
            eventTransactions.push({
              title: event.title,
              type: 'Payment DP',
              amount: event.paymentDp.amount,
              timestamp: event.paymentDp.timestamp,
            })
          if (event.paymentFull && event.paymentFull.timestamp !== '')
            eventTransactions.push({
              title: event.title,
              type: 'Payment Full',
              amount: event.paymentFull.amount,
              timestamp: event.paymentFull.timestamp,
            })
        })
        setListEvents(eventTransactions)
      }
    })
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <>
      <div className="mt-6 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">{t('commonTransactions')}</h1>
          </div>
          <div className="mt-4 flex max-w-40 flex-row items-center justify-center space-x-2 rounded-md bg-gradient-to-br from-rose-500 to-rose-600 p-2 text-white shadow-sm sm:mt-0">
            <Wallet className="" />
            <h3 className="text-sm font-bold sm:text-base">{moneyFormat(0)}</h3>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="inline-block min-w-full space-y-6 py-2 align-middle">
            {listEvents.map((event, index) => (
              <div
                key={index}
                className="flex flex-row justify-between space-x-2 rounded-xl bg-gradient-to-br from-rose-50/70 to-rose-50/50 p-4 shadow-sm">
                <div className="flex flex-col justify-center text-gray-700">
                  <div className="line-clamp-1 text-sm font-semibold sm:text-base">
                    {event.title}
                  </div>
                  <div className="text-xs sm:text-sm">{event.type}</div>
                </div>
                <div className="mt-1 flex flex-col items-end text-gray-700">
                  <div className="text-sm text-rose-600 sm:text-base">
                    {moneyFormat(event.amount)}
                  </div>
                  <div className="text-xs sm:text-sm">
                    {dateToDateFullname(parseInt(event.timestamp))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
