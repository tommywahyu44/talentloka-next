import {
  CalendarDaysIcon,
  ClockIcon,
  BuildingOfficeIcon,
  TicketIcon,
  UserGroupIcon,
  UsersIcon,
  LockClosedIcon,
  WalletIcon,
  PencilIcon,
  XMarkIcon,
  UserPlusIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline'

import {
  capitalizeFirstLetter,
  classNames,
  moneyFormat,
  dateToTwoDateRange,
  dateDaysUntil,
  calculateHourDifference,
  paymentCalculation,
} from '@/lib/helpers'
import {
  getStyleEventStatus,
  getStyleBundlePackage,
  getStyleEventType,
  getTextEventStatus,
} from '@/lib/statusUtils'

export default function ListClientEvents({
  events,
  updateEvent,
  cancelEvent,
  openAddPromotor,
  openPayment,
  openPaymentHistory,
}) {
  return (
    <div>
      <ul
        role="list"
        className="space-y-4">
        {events.map((event) => {
          var eventStatus = getTextEventStatus(event.status)
          var daysUntil = dateDaysUntil(event.startDate)
          const hoursDuration = calculateHourDifference(event.startTime, event.endTime)
          const paymentDp = event?.paymentDp?.amount ?? 0
          const { totalFee } = paymentCalculation(event?.promotorNumber ?? 0, paymentDp, 'full')
          const listInvitedPromotor = event.listPromotor ?? []
          if (
            (!event.paymentDp || event.paymentDp?.imageUrl === '') &&
            (!event.paymentFull || event.paymentFull?.imageUrl === '') &&
            daysUntil < 30
          ) {
            eventStatus = 'PENDING_PAYMENT_DP'
          }
          if ((!event.paymentFull || event.paymentFull?.imageUrl === '') && daysUntil < 7) {
            eventStatus = 'PENDING_PAYMENT_FULL'
          }
          return (
            <li
              key={event.title}
              className="flex h-40 rounded-md shadow-sm">
              <img
                src={event.image}
                className="flex aspect-video flex-shrink-0 items-center justify-center rounded-l-md object-cover text-sm font-medium"
              />
              <div className="flex flex-1 rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                <div className="flex-grow px-4 py-3 text-sm">
                  <a className="font-semibold text-gray-900 hover:text-gray-700">{event.title}</a>
                  <p className="mt-1 line-clamp-3 text-ellipsis text-gray-700">
                    {event.description}
                  </p>
                  <div className="mt-2 flex items-center space-x-2">
                    <div
                      className={classNames(
                        getStyleEventStatus(eventStatus),
                        'rounded-md px-2 py-1.5 text-xs font-medium ring-1 ring-inset'
                      )}>
                      {getTextEventStatus(eventStatus)}
                    </div>
                    <div
                      className={classNames(
                        getStyleBundlePackage(event.bundlePackage),
                        'rounded-md px-2 py-1.5 text-xs font-medium ring-1 ring-inset'
                      )}>
                      {event.bundlePackage}
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
                <div className="flex w-56 flex-shrink-0 justify-between space-x-2 border-l px-4 py-3">
                  <div className="text-xs">
                    <div className="grid grid-cols-1 items-center gap-0.5 text-gray-700">
                      <div>
                        <CalendarDaysIcon
                          className="mb-1 mr-2 inline h-4 w-4"
                          aria-hidden="true"
                        />
                        {dateToTwoDateRange(event.startDate, event.endDate)}
                      </div>
                      <div>
                        <ClockIcon
                          className="mb-1 mr-2 inline h-4 w-4"
                          aria-hidden="true"
                        />
                        {event.startTime}-{event.endTime}
                        {hoursDuration > 8 ? ' (2 shift)' : null}
                      </div>
                      <div>
                        <BuildingOfficeIcon
                          className="mb-1 mr-2 inline h-4 w-4"
                          aria-hidden="true"
                        />
                        {capitalizeFirstLetter(event.industry)}
                      </div>
                      <div>
                        <TicketIcon
                          className="mb-1 mr-2 inline h-4 w-4"
                          aria-hidden="true"
                        />
                        {event.type}
                      </div>
                      <div>
                        <UsersIcon
                          className="mb-1 mr-2 inline h-4 w-4"
                          aria-hidden="true"
                        />
                        {listInvitedPromotor.length} / {event.promotorNumber}
                      </div>
                      <div>
                        <WalletIcon
                          className="mb-1 mr-2 inline h-4 w-4"
                          aria-hidden="true"
                        />
                        {moneyFormat(totalFee)}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="grid grid-cols-1 items-center gap-1 text-gray-700">
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
                      {(event.status.toUpperCase() === 'PUBLISHED' ||
                        event.status.toUpperCase() === 'READY') && (
                        <UserPlusIcon
                          onClick={() => openAddPromotor(event)}
                          className="inline h-6 w-6 cursor-pointer rounded-full border border-gray-300 p-1 hover:border-rose-400 hover:text-rose-500"
                          aria-hidden="true"
                        />
                      )}
                      {eventStatus.toUpperCase().includes('PENDING_PAYMENT') && (
                        <span className="relative flex">
                          <BanknotesIcon
                            onClick={() => openPayment(event, eventStatus)}
                            className="z-20 inline h-6 w-6 cursor-pointer rounded-full border border-amber-600 bg-amber-500 p-1 text-white hover:border-rose-600 hover:bg-rose-500"
                            aria-hidden="true"
                          />
                          <span className="absolute z-10 inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-45"></span>
                        </span>
                      )}
                      {(event?.paymentDp?.amount > 0 || event?.paymentFull?.amount > 0) && (
                        <ClockIcon
                          onClick={() => openPaymentHistory(event, eventStatus)}
                          className="inline h-6 w-6 cursor-pointer rounded-full border border-gray-300 p-1 hover:border-rose-400 hover:text-rose-500"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
