import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { Dialog, DialogContent } from '@mui/material'
import { moneyFormat, paymentCalculation } from '@/lib/helpers'
import { apiService } from '@/lib/apiService'
import { CopyButton } from '@/components/button/Button'
import DropZoneInput from '@/components/input/DropZoneInput'
import clsx from 'clsx'

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
export default function PaymentModal({ isOpenPayment, closePayment, email, method = 'dp', data }) {
  const t = useTranslations('default')
  const [proofImage, setProofImage] = useState(null)

  const paymentDp = data?.paymentDp?.amount ?? 0
  const { promotorFee, countSupervision, serviceCharge, taxFee, totalFee, totalTransfer } =
    paymentCalculation(data?.promotorNumber ?? 0, paymentDp, method)
  const valid = proofImage && totalTransfer

  console.log('dp', paymentDp, data?.paymentDp?.imageUrl, JSON.stringify(data))
  const handleSubmit = async (event) => {
    event.preventDefault()

    const valid = proofImage && totalTransfer

    if (valid) {
      const formSubmitData = new FormData()

      formSubmitData.append('paymentProof', proofImage)
      formSubmitData.append('amount', totalTransfer)
      formSubmitData.append('eventId', data.id)
      formSubmitData.append('paymentType', method)
      apiService.clientUploadPaymentProofPromotor(formSubmitData)
      closePayment()
    }
  }

  useEffect(() => {
    if (data) {
      setProofImage(data?.paymentFull?.imageUrl ?? data?.paymentDp?.imageUrl ?? null, '')
    }
  }, [data])
  return (
    <Dialog
      onClose={closePayment}
      open={isOpenPayment}
      sx={{
        padding: '20px',
      }}>
      <DialogContent>
        <form
          className="space-y-6 sm:mx-auto sm:w-full sm:max-w-2xl"
          onSubmit={handleSubmit}>
          <h3 className="text-xl font-medium text-stone-900">
            {method === 'dp' ? 'Complete your down payment' : 'Complete your full payment'}
          </h3>
          <div className="flex flex-col text-left">
            <div className="mt-4">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">Invoice</p>
              <div className="mt-4 space-y-2">
                <div className="space-y-2 pb-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Total fee of {data.promotorNumber ?? 0} promotor
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {moneyFormat(promotorFee)}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Supervision service charge ({countSupervision} person)
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {moneyFormat(serviceCharge)}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Tax PPH 23 (2%) + VAT (11%)
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {moneyFormat(taxFee)}
                    </dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    {moneyFormat(totalFee)}
                  </dd>
                </dl>
                {method === 'dp' && (
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      DP (50%) to be paid
                    </dt>
                    <dd className="flex flex-row space-x-2 text-base font-bold text-blue-600 underline dark:text-white">
                      <CopyButton
                        textToCopy={totalTransfer}
                        className="pr-2"
                      />
                      <p>{moneyFormat(totalTransfer)}</p>
                    </dd>
                  </dl>
                )}
                {method === 'full' && paymentDp > 0 && (
                  <div>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">DP Paid</dt>
                      <dd className="flex flex-row space-x-2 text-base font-bold text-green-600 underline dark:text-white">
                        <p>-{moneyFormat(totalFee - totalTransfer)}</p>
                      </dd>
                    </dl>
                    <dl className="mt-4 flex items-center justify-between gap-4">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Amount to be paid
                      </dt>
                      <dd className="flex flex-row space-x-2 text-base font-bold text-blue-600 underline dark:text-white">
                        <CopyButton
                          textToCopy={totalTransfer}
                          className="pr-2"
                        />
                        <p>{moneyFormat(totalTransfer)}</p>
                      </dd>
                    </dl>
                  </div>
                )}
              </div>
            </div>
            <h3 className="mt-6 text-sm font-normal text-gray-900 dark:text-gray-400">
              Please transfer{' '}
              <span className="font-bold text-blue-600">{moneyFormat(totalTransfer)}</span> to the
              account below to complete your payment. Don`t forget to confirm your transfer and
              upload the proof of your payment. Thank you!
            </h3>
            {/* Payment Method */}
            <ul
              role="list"
              className="mt-4 grid grid-cols-1 gap-x-3 gap-y-4 lg:grid-cols-3">
              {bankAccounts.map((account) => (
                <li
                  key={account.id}
                  className="overflow-hidden rounded-xl border border-gray-200">
                  <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-2">
                    <img
                      alt={account.name}
                      src={account.imageUrl}
                      className="size-12 flex-none rounded-lg bg-white object-contain p-2 ring-1 ring-gray-900/10"
                    />
                    <div className="text-sm/6 font-medium text-gray-900">{account.name}</div>
                  </div>
                  <dl className="-my-3 space-y-2 px-6 py-6 text-xs">
                    <div className="flex flex-row items-center justify-between">
                      <div>
                        <dt className="text-gray-500">Account number</dt>
                        <dd className="text-gray-700">{account.accountNumber}</dd>
                      </div>
                      <CopyButton textToCopy={account.accountNumber} />
                    </div>
                    <div>
                      <dt className="text-gray-500">Account name</dt>
                      <dd className="font-semibold text-gray-700">{account.accountName}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 text-sm font-semibold text-gray-900">Payment Proof</h3>
            <DropZoneInput
              selectedFile={proofImage}
              setSelectedFile={setProofImage}
            />
          </div>
          <div>
            <button
              disabled={!valid}
              type="submit"
              onClick={handleSubmit}
              className={clsx(
                valid ? 'bg-rose-500' : 'bg-gray-400',
                'mt-12 flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
              )}>
              {t('commonSubmit')}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
