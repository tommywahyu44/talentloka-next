'use event'

import { BuildingOfficeIcon, ClockIcon } from '@heroicons/react/24/outline'
import {
  dateToSimpleDate,
  dateToDaysDifference,
  dateIsPast,
  classNames,
  capitalizeFirstLetter,
} from '@/lib/helpers'

const statuses = {
  APPROVED: 'text-green-700 bg-green-50 ring-green-600/20',
  APPLIED: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  DECLINED: 'text-red-700 bg-red-50 ring-red-600/10',
  INVITED: 'text-blue-700 bg-blue-50 ring-blue-600/10',
}

export default function GridEvents({ events, detailEvent, userData, type }) {
  const getEmptyTitle = () => {
    switch (type) {
      case 'Public':
        return 'No Public Events'
      case 'Invited':
        return 'No Invited Events'
      case 'Upcoming':
        return 'No Upcoming Events'
      case 'Past':
        return 'No Past Events'
      default:
        return 'No Events'
    }
  }

  const getEmptyDescription = () => {
    switch (type) {
      case 'Public':
        return 'No public events available'
      case 'Invited':
        return "You don't have any invited events."
      case 'Upcoming':
        return 'It looks like there are no upcoming events at the moment.'
      case 'Past':
        return 'It looks like there are no past events at the moment.'
      default:
        return 'No events'
    }
  }
  return (
    <div className="pt-8">
      {events.length > 0 ? (
        <ul
          role="list"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            const invitationStatus =
              event?.listPromotor?.filter((item) => item?.spgCode === userData?.code) ?? []
            return (
              <li
                key={event.id}
                onClick={() => {
                  const status =
                    invitationStatus.length > 0 && invitationStatus[0]?.invitationStatus
                  const detail = {
                    ...event,
                    invitationStatus: status,
                    promotorEmail: userData?.email,
                    promotorCode: userData?.code,
                  }
                  return detailEvent(detail)
                }}
                className="relative flex w-full scale-95 cursor-pointer flex-col rounded-xl border border-gray-200 hover:scale-100">
                <div
                  className={classNames(
                    dateIsPast(event.startDate) ? 'bg-red-200' : 'bg-emerald-200',
                    'absolute right-4 top-4 h-12 w-12 content-center rounded-full px-2 pt-1 text-center text-sm font-bold uppercase leading-none text-black shadow-lg'
                  )}>
                  {dateToSimpleDate(event.startDate)}
                </div>
                <div
                  className={
                    'absolute left-4 top-0 h-16 w-12 content-center bg-gradient-to-br from-rose-500 to-rose-600 px-2 text-center text-xs font-bold leading-none text-white shadow-lg'
                  }>
                  <span className="text-lg">
                    {dateToDaysDifference(event.startDate, event.endDate) + 1}
                  </span>{' '}
                  days
                </div>
                <div
                  className={classNames(
                    statuses[event.status] || 'bg-gray-50 text-gray-600 ring-gray-500/10',
                    'absolute bottom-20 right-4 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset'
                  )}>
                  {event.status}
                </div>
                <div
                  className={classNames(
                    statuses[
                      invitationStatus.length > 0
                        ? invitationStatus[0].invitationStatus.toUpperCase()
                        : null
                    ] || 'bg-gray-50 text-gray-600 ring-gray-500/10',
                    'absolute bottom-20 left-4 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset'
                  )}>
                  {invitationStatus?.length > 0 ? invitationStatus[0].invitationStatus : null}
                </div>
                <img
                  src={event.image}
                  className="aspect-video w-full items-center rounded-t-xl border-b border-gray-900/5 bg-gray-50 object-cover"
                />
                <dl className="divide-y divide-gray-100 text-sm">
                  <div className="flex flex-row space-x-3 px-3 py-2">
                    <dd className="text-gray-700">
                      <h1 className="text-gray-900">{event.title}</h1>
                    </dd>
                  </div>
                </dl>
                <dl className="divide-y divide-gray-100 text-xs">
                  <div className="flex flex-row space-x-3 px-3 pb-2">
                    <div className="flex justify-between space-x-1">
                      <ClockIcon className="h-4 w-4" />
                      <dd className="text-gray-700">
                        <div className="font-medium text-gray-900">
                          {event.startTime} - {event.endTime}
                        </div>
                      </dd>
                    </div>
                    <div className="flex justify-between space-x-1">
                      <BuildingOfficeIcon className="h-4 w-4" />
                      <dd className="text-gray-700">
                        <div className="font-medium text-gray-900">
                          {capitalizeFirstLetter(event.industry)}
                        </div>
                      </dd>
                    </div>
                  </div>
                </dl>
              </li>
            )
          })}
        </ul>
      ) : (
        <main className="grid min-h-full place-items-center bg-white px-6 py-12 sm:py-20 lg:px-8">
          <div className="text-center">
            <img
              src="/images/empty-event.png"
              className="mx-auto h-60 w-60 object-contain"
            />
            <h1 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-gray-900">
              {getEmptyTitle()}
            </h1>
            <p className="mt-2 text-pretty text-lg font-medium text-gray-500">
              {getEmptyDescription()}
            </p>
          </div>
        </main>
      )}
    </div>
  )
}
