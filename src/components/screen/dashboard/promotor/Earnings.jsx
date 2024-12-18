'use client'

import { dateToDateName, moneyFormat } from '@/lib/helpers'

import { Wallet } from '@mui/icons-material'
import { capitalize } from '@mui/material'
import clsx from 'clsx'

export default function Earnings({ profileData, listEvents }) {
  const findEventTitle = (id) => {
    const event = listEvents.find((event) => event.id === id)
    return event ? event.title : 'Unknown Event'
  }

  const transactions = [
    ...profileData.events
      .filter((item) => typeof item === 'object' && item !== null)
      .map((payment) => {
        return {
          amount: payment.fee,
          timestamp: payment.timestamp,
          id: payment.id,
          type: 'payment',
          title: findEventTitle(payment.id),
        }
      }),
    ...profileData.withdrawals
      .filter((item) => typeof item === 'object' && item !== null)
      .map((withdrawal) => {
        return {
          amount: withdrawal.amount,
          timestamp: withdrawal.timestamp,
          id: withdrawal.id,
          type: 'withdrawal',
          title: 'withdrawal',
        }
      }),
  ]

  return (
    <>
      <div className="sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Transactions</h1>
          </div>
          <div className="mt-4 flex max-w-40 flex-row items-center justify-center space-x-2 rounded-md bg-gradient-to-br from-rose-500 to-rose-600 p-2 text-white shadow-sm sm:mt-0">
            <Wallet className="" />
            <h3 className="text-sm font-bold sm:text-base">{moneyFormat(profileData.wallet)}</h3>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="inline-block min-w-full space-y-6 py-2 align-middle">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex flex-row justify-between space-x-2 rounded-xl bg-gradient-to-br from-rose-50/70 to-rose-50/50 p-4 shadow-sm">
                <div className="flex flex-col justify-center text-gray-700">
                  {transaction.type === 'payment' && (
                    <div className="line-clamp-1 text-sm font-semibold sm:text-lg">
                      {transaction.title}
                    </div>
                  )}
                  <div
                    className={clsx(
                      transaction.type === 'payment'
                        ? 'text-xs sm:text-base'
                        : 'text-sm font-semibold sm:text-lg'
                    )}>
                    {capitalize(transaction.type)}
                  </div>
                </div>
                <div className="mt-1 flex flex-col items-end text-gray-700">
                  <div
                    className={clsx(
                      transaction.type === 'payment' ? 'text-green-600' : 'text-rose-600',
                      'text-sm sm:text-lg'
                    )}>
                    {(transaction.type === 'payment' ? '' : '- ') + moneyFormat(transaction.amount)}
                  </div>
                  <div className="text-xs sm:text-base">
                    {dateToDateName(parseInt(transaction.timestamp))}
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
