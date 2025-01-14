import { CopyButton } from '@/components/button/Button'
import DropZoneInput from '@/components/input/DropZoneInput'
import { apiService } from '@/lib/apiService'
import { moneyFormat, paymentCalculation } from '@/lib/helpers'
import { Dialog, DialogContent } from '@mui/material'
import clsx from 'clsx'
import { getDatabase, onValue, ref } from 'firebase/database'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

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
  const [listPromotor, setListPromotor] = useState([])
  const [listInvitedPromotor, setListInvitedPromotor] = useState({
    data: [],
    totalFee: 0,
    bundlingDiscount: 0,
    coupon: 'SUMMER10',
    couponDiscount: 0,
    supervisionFee: 0,
    taxFee: 0,
    finalFee: 0,
  })

  const paymentDp = data?.paymentDp?.amount ?? 0
  const { promotorFee, countSupervision, serviceCharge, taxFee, totalFee, totalTransfer } =
    paymentCalculation(data?.promotorNumber ?? 0, paymentDp, method)
  const valid = proofImage && totalTransfer

  const handleSubmit = async (event) => {
    event.preventDefault()

    const valid = proofImage && totalTransfer

    if (valid) {
      const formSubmitData = new FormData()

      formSubmitData.append('paymentProof', proofImage)
      formSubmitData.append('amount', totalTransfer)
      formSubmitData.append('eventId', data.id)
      formSubmitData.append('paymentType', method)
      apiService.clientUploadPaymentProof(formSubmitData)
      closePayment()
    }
  }

  const fetchPromotor = async () => {
    const db = getDatabase()
    const spgRef = ref(db, 'promoters_public_info/')
    onValue(spgRef, (snapshot) => {
      const data = snapshot.val()
      if (data && listPromotor.length === 0) {
        setListPromotor(Object.entries(data))
      }
    })
  }

  useEffect(() => {
    if (data) {
      setProofImage(data?.paymentFull?.imageUrl ?? data?.paymentDp?.imageUrl ?? null, '')
    }
  }, [data])

  useEffect(() => {
    const invited =
      typeof data.listPromotor === 'string'
        ? data.listPromotor.split(',')
        : data.listPromotor.map((item) => item.spgCode)
    const filtered = listPromotor
      .filter(([id]) => {
        return invited.includes(id)
      })
      .sort((a, b) => a[1].tier - b[1].tier)
    let totalFee = 0
    let bundling = 0
    filtered.forEach((item) => {
      let price = 0
      switch (item[1].tier) {
        case 1:
          price = 999000
          break
        case 2:
          price = 799000
          break
        case 3:
          price = 499000
          break
        default:
          price = 0
          break
      }
      console.log('price', price)
      totalFee += price
    })
    if (filtered.length >= 2 && filtered.length <= 5) {
      bundling = 0.05
    } else if (filtered.length >= 6 && filtered.length <= 10) {
      bundling = 0.1
    } else if (filtered.length > 10) {
      bundling = 0.15
    }
    const supervisionFee = filtered.length * 100000
    const subTotal = totalFee + supervisionFee - totalFee * bundling - totalFee * 0.1
    const taxFee = (totalFee + supervisionFee - totalFee * bundling - totalFee * 0.1) * 0.13
    const finalFee = subTotal + taxFee
    console.log('total Fee', totalFee)
    setListInvitedPromotor({
      data: filtered,
      totalFee: totalFee,
      bundlingDiscount: bundling,
      coupon: 'SUMMER10',
      couponDiscount: 0.1,
      supervisionFee: supervisionFee,
      taxFee: taxFee,
      finalFee: finalFee,
    })
  }, [data.listPromotor, listPromotor])

  useEffect(() => {
    fetchPromotor()
  }, [])

  const countTier1 = listInvitedPromotor.data.filter((spg) => spg[1].tier === 1).length
  const countTier2 = listInvitedPromotor.data.filter((spg) => spg[1].tier === 2).length
  return (
    <Dialog
      onClose={closePayment}
      open={isOpenPayment}
      sx={{
        padding: '20px',
        '& .MuiPaper-root': {
          borderRadius: '16px', // Adjust the value for desired roundness
        },
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
                <div className="space-y-1 pb-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-700 dark:text-gray-400">
                      Fee of:
                    </dt>
                  </dl>
                  <dl className="ml-4 flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-700 dark:text-gray-400">
                      - {countTier1 ?? 0} Elite Professionals promotor
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {moneyFormat(countTier1 * 999000)}
                    </dd>
                  </dl>
                  <dl className="ml-4 flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-700 dark:text-gray-400">
                      - {countTier2 ?? 0} Reliable Support promotor
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {moneyFormat(countTier2 * 799000)}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-700 dark:text-gray-400">
                      Supervision service charge
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {moneyFormat(listInvitedPromotor.supervisionFee)}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-semibold text-emerald-700 dark:text-gray-400">
                      Bundle Package 10% off
                    </dt>
                    <dd className="text-base font-semibold text-emerald-700 dark:text-white">
                      {moneyFormat(
                        -listInvitedPromotor.bundlingDiscount * listInvitedPromotor.totalFee
                      )}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-semibold text-emerald-700 dark:text-gray-400">
                      Coupon {listInvitedPromotor.coupon}
                    </dt>
                    <dd className="text-base font-semibold text-emerald-700 dark:text-white">
                      {moneyFormat(
                        -listInvitedPromotor.couponDiscount * listInvitedPromotor.totalFee
                      )}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-700 dark:text-gray-400">Tax</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {moneyFormat(listInvitedPromotor.taxFee)}
                    </dd>
                  </dl>
                </div>
                {method === 'full' && paymentDp === 0 ? (
                  <div>
                    <dl className="mt-4 flex items-center justify-between gap-4">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Total Amount
                      </dt>
                      <dd className="flex flex-row space-x-2 text-base font-bold text-blue-600 underline dark:text-white">
                        <CopyButton
                          textToCopy={listInvitedPromotor.finalFee}
                          className="pr-2"
                        />
                        <p>{moneyFormat(listInvitedPromotor.finalFee)}</p>
                      </dd>
                    </dl>
                  </div>
                ) : (
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      {moneyFormat(listInvitedPromotor.finalFee)}
                    </dd>
                  </dl>
                )}
                {method === 'dp' && (
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      DP (50%) to be paid
                    </dt>
                    <dd className="flex flex-row space-x-2 text-base font-bold text-blue-600 underline dark:text-white">
                      <CopyButton
                        textToCopy={listInvitedPromotor.finalFee * 0.5}
                        className="pr-2"
                      />
                      <p>{moneyFormat(listInvitedPromotor.finalFee * 0.5)}</p>
                    </dd>
                  </dl>
                )}
                {method === 'full' && paymentDp > 0 && (
                  <div>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">DP Paid</dt>
                      <dd className="flex flex-row space-x-2 text-base font-bold text-green-600 underline dark:text-white">
                        <p>-{moneyFormat(paymentDp)}</p>
                      </dd>
                    </dl>
                    <dl className="mt-4 flex items-center justify-between gap-4">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Amount to be paid
                      </dt>
                      <dd className="flex flex-row space-x-2 text-base font-bold text-blue-600 underline dark:text-white">
                        <CopyButton
                          textToCopy={listInvitedPromotor.finalFee - paymentDp}
                          className="pr-2"
                        />
                        <p>{moneyFormat(listInvitedPromotor.finalFee - paymentDp)}</p>
                      </dd>
                    </dl>
                  </div>
                )}
              </div>
            </div>
            <h3 className="mt-6 text-sm font-normal text-gray-900 dark:text-gray-400">
              Please transfer to the account below to complete your payment. Don`t forget to confirm
              your transfer and upload the proof of your payment. Thank you!
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
                        <dt className="text-gray-700">Account number</dt>
                        <dd className="text-gray-700">{account.accountNumber}</dd>
                      </div>
                      <CopyButton textToCopy={account.accountNumber} />
                    </div>
                    <div>
                      <dt className="text-gray-700">Account name</dt>
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
