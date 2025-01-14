import { dateToGoodDay, moneyFormat } from '@/lib/helpers'
import { Dialog, DialogContent } from '@mui/material'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

const bankAccounts = [
  {
    id: 1,
    name: 'BCA',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/1200px-Bank_Central_Asia.svg.png',
    accountNumber: '235123412',
    accountName: 'Marketingo Asia',
  },
  {
    id: 2,
    name: 'BRI',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_2020.svg',
    accountNumber: '4512354233',
    accountName: 'Marketingo Asia',
  },
  {
    id: 3,
    name: 'Mandiri',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/1280px-Bank_Mandiri_logo_2016.svg.png',
    accountNumber: '1234124234',
    accountName: 'Marketingo Asia',
  },
]
export default function PaymentHistoryModal({
  isOpenPaymentHistory,
  closePaymentHistory,
  email,
  method = 'dp',
  data,
}) {
  const t = useTranslations('default')
  var history = [null, null]
  const paymentDp = data?.paymentDp?.amount ?? 0
  const paymentFull = data?.paymentFull?.amount ?? 0
  if (paymentDp > 0) {
    history[0] = data.paymentDp
  }
  if (paymentFull > 0) {
    history[1] = data.paymentFull
  }

  return (
    <Dialog
      maxWidth="lg"
      onClose={closePaymentHistory}
      open={isOpenPaymentHistory}
      sx={{
        padding: '20px',
      }}>
      <DialogContent>
        <h3 className="text-xl font-medium text-stone-900">Payment History</h3>
        <div className="flex flex-col text-left">
          <div className="mt-4">
            <ul
              role="list"
              className="mt-4 grid grid-cols-1 gap-x-3 gap-y-4">
              {history.map(
                (payment, index) =>
                  payment && (
                    <li
                      key={index}
                      className="flex flex-row justify-center overflow-hidden rounded-xl border border-gray-200">
                      <img
                        src={payment.imageUrl}
                        className="h-72 w-72 flex-none rounded-lg bg-white object-contain p-2"
                      />
                      <dl className="-my-3 justify-center space-y-6 px-6 py-6 text-base">
                        <div className="mt-4 flex flex-row items-center justify-between">
                          <div>
                            <dt className="text-gray-500">Amount</dt>
                            <dd className="mt-1 text-gray-700">{moneyFormat(payment.amount)}</dd>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-row items-center justify-between">
                          <div>
                            <dt className="text-gray-500">Type</dt>
                            <dd>{index === 0 ? 'DP' : 'Full Payment'}</dd>
                          </div>
                          <div>
                            <dt className="text-gray-500">Status</dt>
                            <dd
                              className={clsx(
                                payment.status === 'PENDING' ? 'bg-amber-500' : 'bg-green-500',
                                'mt-1 w-20 justify-center rounded-full py-1 text-center text-sm font-semibold text-white'
                              )}>
                              {payment.status}
                            </dd>
                          </div>
                        </div>
                        <div>
                          <dt className="text-gray-500">Transfer Time</dt>
                          <dd className="mt-1 font-semibold text-gray-700">
                            {dateToGoodDay(payment.timestamp)}
                          </dd>
                        </div>
                      </dl>
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
