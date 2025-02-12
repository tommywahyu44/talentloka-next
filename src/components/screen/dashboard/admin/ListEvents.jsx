import { capitalizeFirstLetter, classNames, dateToTwoDateRange, moneyFormat } from '@/lib/helpers'
import { getStyleEventStatus, getStyleEventType, getTextEventStatus } from '@/lib/statusUtils'
import {
  CheckIcon,
  LockClosedIcon,
  PencilIcon,
  UserGroupIcon,
  UserPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

export default function ListEvents({
  events,
  updateEvent,
  cancelEvent,
  openAddPromotor,
  updateStatusEvent,
}) {
  const getActionButton = (event) => {
    switch (event.status.toUpperCase()) {
      case 'IN_REVIEW':
        return (
          <div className="grid grid-cols-1 items-center gap-2 text-gray-500">
            <PencilIcon
              onClick={() => updateEvent(event)}
              className="inline h-6 w-6 cursor-pointer rounded-full border border-gray-300 p-1 hover:border-rose-400 hover:text-rose-500"
              aria-hidden="true"
            />
            <XMarkIcon
              onClick={() => cancelEvent(event)}
              className="inline h-6 w-6 cursor-pointer rounded-full border border-gray-300 p-1 hover:border-rose-400 hover:text-rose-500"
              aria-hidden="true"
            />
            <CheckIcon
              onClick={() => updateStatusEvent(event.id, 'approve')}
              className="inline h-6 w-6 cursor-pointer rounded-full border border-gray-300 p-1 hover:border-rose-400 hover:text-rose-500"
              aria-hidden="true"
            />
          </div>
        )
      case 'READY':
      case 'PUBLISHED':
      case 'LIVE':
        return (
          <div className="grid grid-cols-1 items-center gap-2 text-gray-500">
            <PencilIcon
              onClick={() => updateEvent(event)}
              className="inline h-6 w-6 cursor-pointer rounded-full border border-gray-300 p-1 hover:border-rose-400 hover:text-rose-500"
              aria-hidden="true"
            />
            <XMarkIcon
              onClick={() => cancelEvent(event)}
              className="inline h-6 w-6 cursor-pointer rounded-full border border-gray-300 p-1 hover:border-rose-400 hover:text-rose-500"
              aria-hidden="true"
            />
            <UserPlusIcon
              onClick={() => openAddPromotor(event)}
              className="inline h-6 w-6 cursor-pointer rounded-full border border-gray-300 p-1 hover:border-rose-400 hover:text-rose-500"
              aria-hidden="true"
            />
            {event.status.toUpperCase() === 'PUBLISHED' && (
              <CheckIcon
                onClick={() => updateStatusEvent(event.id, 'confirm_payment')}
                className="inline h-6 w-6 cursor-pointer rounded-full border border-gray-300 p-1 hover:border-rose-400 hover:text-rose-500"
                aria-hidden="true"
              />
            )}
          </div>
        )
      default:
        break
    }
  }
  return (
    <div className="mt-4 flow-root">
      <div className="h-[75vh] overflow-x-auto">
        <table className="w-full">
          <thead className="sticky top-0 z-30 h-16 divide-y divide-slate-300 bg-slate-50">
            <tr>
              <th
                scope="col"
                className="pl-4 text-left text-sm font-semibold text-slate-900">
                Company
              </th>
              <th
                scope="col"
                className="text-left text-sm font-semibold text-slate-900">
                Event
              </th>
              <th
                scope="col"
                className="text-left text-sm font-semibold text-slate-900">
                Date Time
              </th>
              <th
                scope="col"
                className="text-left text-sm font-semibold text-slate-900">
                Industry
              </th>
              <th
                scope="col"
                className="text-left text-sm font-semibold text-slate-900">
                Budget
              </th>
              <th
                scope="col"
                className="text-left text-sm font-semibold text-slate-900">
                Status
              </th>
              <th
                scope="col"
                className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {events.length > 0 ? (
              events.map((event) => (
                <tr key={event.id}>
                  <td className="whitespace-nowrap pl-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded-full object-cover"
                          src={event.companyLogo}
                          alt=""
                        />
                      </div>
                    </div>
                  </td>
                  <td className="ml-2 max-w-96 whitespace-nowrap py-2 pr-6 text-sm">
                    <div className="flex items-center">
                      <div className="aspect-video h-24 flex-shrink-0">
                        <img
                          className="h-full w-full object-cover"
                          src={event.image}
                          alt=""
                        />
                      </div>
                      <div className="ml-4 text-wrap">
                        <div className="font-medium text-slate-900">{event.title}</div>
                        <div className="mt-1 line-clamp-3 break-all text-slate-500">
                          {event.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <div className="">
                        <div className="font-medium text-slate-900">
                          {dateToTwoDateRange(event.startDate, event.endDate)}
                        </div>
                        <div className="mt-1 text-slate-500">
                          {event.startTime} - {event.endTime}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap text-sm text-slate-500">
                    {capitalizeFirstLetter(event.industry)}
                  </td>
                  <td className="whitespace-nowrap text-sm text-slate-500">
                    {moneyFormat(event.budget)}
                  </td>
                  <td className="whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <div className="space-y-2">
                        <div
                          className={classNames(
                            'rounded-md px-2 py-1.5 text-center text-xs font-medium ring-1 ring-inset',
                            getStyleEventStatus(event.status)
                          )}>
                          {getTextEventStatus(event.status)}
                        </div>
                        <div
                          className={classNames(
                            getStyleEventType(event.type),
                            'rounded-md px-2 py-1.5 text-xs font-medium ring-1 ring-inset'
                          )}>
                          {event.type === 'Private' ? (
                            <LockClosedIcon
                              className="mb-1 mr-1 inline h-3 w-3"
                              aria-hidden="true"
                            />
                          ) : (
                            <UserGroupIcon
                              className="mb-1 mr-1 inline h-3 w-3"
                              aria-hidden="true"
                            />
                          )}
                          {event.type}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    {getActionButton(event)}
                  </td>
                </tr>
              ))
            ) : (
              <tr></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
