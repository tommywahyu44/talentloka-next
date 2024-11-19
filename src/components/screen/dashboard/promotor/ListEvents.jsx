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
  Paid: 'text-green-700 bg-green-50 ring-green-600/20',
  Pending: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Cancelled: 'text-red-700 bg-red-50 ring-red-600/10',
  Accepted: 'text-blue-700 bg-blue-50 ring-blue-600/10',
}

export default function ListEvents({ title, events, detailEvent }) {
  return (
    <div className="">
      <div className="mb-3 mt-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold leading-7 text-gray-900">{title}</h1>
        <a
          href="#"
          className="text-sm font-semibold leading-6 text-rose-600 hover:text-rose-500">
          View all<span className="sr-only">, clients</span>
        </a>
      </div>
      <ul
        role="list"
        className="flex flex-row space-x-4 overflow-x-auto">
        {events.map((event) => (
          <li
            key={event.id}
            onClick={() => detailEvent(event)}
            className="relative flex w-72 scale-95 cursor-pointer flex-col rounded-xl border border-gray-200 hover:scale-100">
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
                statuses[event.status],
                'absolute bottom-20 right-4 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset'
              )}>
              {event.status}
            </div>
            <img
              src={event.image}
              className="aspect-video w-full items-center rounded-t-xl border-b border-gray-900/5 bg-gray-50 object-cover"
            />
            <dl className="divide-y divide-gray-100 text-sm">
              <div className="flex flex-row space-x-3 px-3 py-2">
                <dd className="text-gray-700">
                  <h1 className="font-medium text-gray-900">{event.title}</h1>
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
        ))}
      </ul>
    </div>
  )
}
