import { DropdownInput, FileInput, TextInput } from '@/components/input/Input'
import { apiService } from '@/lib/apiService'
import { dateAndTimeToUtc, dateToDaysDifference, limitFileSizeMb } from '@/lib/helpers'
import clsx from 'clsx'
import { get, getDatabase, onValue, ref } from 'firebase/database'
import { Modal } from 'flowbite-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
export default function CreateEventModal({
  isOpenCreateEvent,
  closeCreateEvent,
  email,
  method = 'create',
  data,
}) {
  const t = useTranslations('default')
  const today = new Date()
  const formattedToday = today.toISOString().split('T')[0]
  const listIndustry = [
    'Automotive',
    'Bank',
    'Baby / kids care',
    'Beauty tools',
    'Fashion',
    'Education',
    'Food and beverages',
    'Furniture',
    'Franchise',
    'Haircare',
    'Homecare',
    'Jewelry',
    'Make up',
    'Manufacturing goods',
    'Medicine / healthcare',
    'Perfume',
    'Skincare',
    'Sports',
    'Technology',
    'Tobacco / cigarettes',
    'Watches',
    'Wedding expo',
  ]
  const listType = ['Public', 'Private']
  const listPackage = ['No Package', 'Bronze', 'Silver', 'Gold', 'Diamond']
  const [eventData, setEventData] = useState({
    title: data?.title ?? '',
    description: data?.description ?? '',
    industry: data?.industry ?? listIndustry[0],
    promotorNumber: data?.promotorNumber ?? 0,
    type: data?.type ?? listType[0],
    startDate: data?.startDate ?? formattedToday,
    endDate: data?.endDate ?? formattedToday,
    startTime: data?.startTime ?? '09:00',
    endTime: data?.endTime ?? '16:00',
    maxFee: data?.maxFee ?? 0,
    bundlePackage: data?.bundlePackage ?? listPackage[0],
    listPromotor: data?.listPromotor ?? [],
    coupon: data?.coupon ?? '',
  })

  const [isSubmit, setIsSubmit] = useState(false)
  const [listPromotor, setListPromotor] = useState([])
  const [listInvitedPromotor, setListInvitedPromotor] = useState({
    data: [],
    totalFee: 0,
    bundlingDiscount: 0,
  })
  const [coupon, setCoupon] = useState('')
  const [couponDetail, setCouponDetail] = useState(null)

  const [fileInputs, setFileInputs] = useState({
    eventImage: [data?.image ?? null, ''],
  })

  const handleChange = (event) => {
    if (event.target) {
      const { name, value } = event.target
      if (name === 'startDate') {
        if (dateToDaysDifference(value, eventData.endDate) < 0) {
          setEventData({ ...eventData, [name]: value, endDate: value })
          return
        }
      } else if (name === 'endDate') {
        if (dateToDaysDifference(eventData.startDate, value) < 0) {
          setEventData({ ...eventData, [name]: value, startDate: value })
          return
        }
      }

      setEventData({ ...eventData, [name]: value })
    }
  }

  const handleFileChange = (field, maxSize, event) => {
    const file = event.target.files[0]
    const limitFile = limitFileSizeMb(file, maxSize)
    setFileInputs({ ...fileInputs, [field]: limitFile })

    // Show logo preview if the uploaded file is the company logo
    if (field === 'eventImage' && limitFile[1] === '') {
      const output = document.getElementById('image-preview')
      output.src = URL.createObjectURL(file)
      output.onload = () => URL.revokeObjectURL(output.src) // free memory
    }
  }

  const handleApplyCoupon = async () => {
    if (coupon.trim() !== '') {
      const response = await apiService.checkCoupon(email, coupon, listInvitedPromotor.totalFee)

      if (response.status === 'success') {
        setEventData({
          ...eventData,
          coupon: coupon,
        })
      }
    }
  }

  const handleRemoveCoupon = () => {
    setEventData({
      ...eventData,
      coupon: '',
    })
    setCouponDetail(null)
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

  const fetchCouponDetail = async (coupon) => {
    const db = getDatabase() // Initialize the database
    const couponRef = ref(db, 'coupons/' + coupon.toLowerCase()) // Replace with your database path
    try {
      const snapshot = await get(couponRef)
      if (snapshot.exists()) {
        const data = snapshot.val()
        setCouponDetail(data)
        return data
      } else {
        console.log('No data available')
        return null
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmit(true)

    const { title, description, industry, type, startDate, endDate, startTime, endTime } = eventData

    const valid =
      title &&
      description &&
      industry &&
      type &&
      startDate &&
      endDate &&
      startTime &&
      endTime &&
      fileInputs.eventImage[0]

    if (valid) {
      const formSubmitData = new FormData()
      let bundle = ''
      Object.entries(eventData).forEach(([key, value]) => {
        switch (key) {
          case 'listPromotor':
            if (value.length === 0) {
              formSubmitData.append(key, '')
            } else if (typeof value === 'string') {
              formSubmitData.append(key, value)
            } else {
              var listId = value.map((item) => item.spgCode)
              formSubmitData.append(key, listId.join(',') || '')
            }
            break
          case 'promotorNumber':
            formSubmitData.append(key, listInvitedPromotor.data.length)
            break
          case 'bundlePackage':
            if (listInvitedPromotor.data.length >= 2 && listInvitedPromotor.data.length <= 5) {
              bundle = 'bundle5'
            } else if (
              listInvitedPromotor.data.length >= 6 &&
              listInvitedPromotor.data.length <= 10
            ) {
              bundle = 'bundle10'
            } else if (listInvitedPromotor.data.length > 10) {
              bundle = 'bundle15'
            }
            formSubmitData.append(key, bundle)
            break
          case 'coupon':
            formSubmitData.append(key, value.toLowerCase())
            break
          case 'startDate':
          case 'endDate':
          case 'startTime':
          case 'endTime':
            break
          default:
            formSubmitData.append(key, value)
        }
      })

      const utcStartDate = dateAndTimeToUtc(startDate, startTime)
      const utcEndDate = dateAndTimeToUtc(endDate, endTime)
      formSubmitData.append('startDate', utcStartDate)
      formSubmitData.append('endDate', utcEndDate)
      formSubmitData.append('status', data?.status ?? 'Pending')

      Object.keys(fileInputs).forEach((key) => {
        formSubmitData.append(key, fileInputs[key][0])
      })
      formSubmitData.append('email', email)
      formSubmitData.append('estimatedFee', 0)
      var result = false
      switch (method) {
        case 'create':
          result = await apiService.createEvent(formSubmitData)
          if (result) closeCreateEvent()
          break
        case 'update':
          formSubmitData.append('id', data?.id)
          result = await apiService.updateEvent(formSubmitData)
          if (result) closeCreateEvent()
          break
        default:
          break
      }
    } else {
      Swal.fire({
        text: 'Please fill out all required fields',
        icon: 'warning',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#BE123C',
      })
    }
  }

  useEffect(() => {
    if (data) {
      setEventData({
        title: data?.title ?? '',
        description: data?.description ?? '',
        industry: data?.industry ?? listIndustry[0],
        promotorNumber: data?.promotorNumber ?? 0,
        type: data?.type ?? listType[0],
        startDate: data?.startDate ?? formattedToday,
        endDate: data?.endDate ?? formattedToday,
        startTime: data?.startTime ?? '09:00',
        endTime: data?.endTime ?? '16:00',
        maxFee: data?.maxFee ?? 0,
        bundlePackage: data?.bundlePackage ?? listPackage[0],
        listPromotor: data?.listPromotor ?? [],
        coupon: data?.coupon ?? '',
      })
      setFileInputs({
        eventImage: [data?.image ?? null, ''],
      })
    }
  }, [data])

  useEffect(() => {
    const invited =
      typeof eventData.listPromotor === 'string'
        ? eventData.listPromotor.split(',')
        : eventData.listPromotor.map((item) => item.spgCode)
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
          price = 499000
          break
        case 2:
          price = 799000
          break
        case 3:
          price = 999000
          break
        default:
          price = 0
          break
      }
      totalFee += price
    })
    if (filtered.length >= 2 && filtered.length <= 5) {
      bundling = 0.05
    } else if (filtered.length >= 6 && filtered.length <= 10) {
      bundling = 0.1
    } else if (filtered.length > 10) {
      bundling = 0.15
    }
    setListInvitedPromotor({ data: filtered, totalFee: totalFee, bundlingDiscount: bundling })
  }, [eventData.listPromotor, listPromotor])

  useEffect(() => {
    if (eventData.coupon !== '') {
      fetchCouponDetail(eventData.coupon)
    }
  }, [eventData.coupon])

  useEffect(() => {
    fetchPromotor()
  }, [])

  return (
    <Modal
      dismissible
      show={isOpenCreateEvent}
      size="2xl"
      className="bg-opacity-40 pt-6"
      popup
      onClose={() => closeCreateEvent()}>
      <Modal.Header></Modal.Header>
      <Modal.Body className="rounded-[16px] bg-white">
        <form
          className="space-y-6 sm:mx-auto sm:w-full sm:max-w-2xl"
          onSubmit={handleSubmit}>
          <h3 className="text-xl font-medium text-stone-900">
            {method === 'create' ? 'Create your event' : 'Update your event'}
          </h3>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 text-left sm:grid-cols-6">
            <TextInput
              label="Title"
              id="title"
              value={eventData.title}
              onChange={handleChange}
              errorEmptyMessage="Please fill out this field."
              isSubmit={isSubmit}
              isFullWidth={true}
            />
            <TextInput
              label="Description"
              id="description"
              value={eventData.description}
              onChange={handleChange}
              errorEmptyMessage="Please fill out this field."
              isSubmit={isSubmit}
              type="textarea"
              isFullWidth={true}
            />
            <FileInput
              label="Event Image"
              limitDesc="PNG, JPG or JPEG (Max 2 MB)"
              id="eventImage"
              value={fileInputs.eventImage}
              onChange={(e) => handleFileChange('eventImage', 2, e)}
              errorEmptyMessage="Please fill out this field."
              isSubmit={isSubmit}
            />
            <img
              id="image-preview"
              className={`h-32 w-auto rounded-lg sm:col-span-3`}
              alt="Logo Preview"
              src={data?.image ?? '/images/image-placeholder.webp'}
            />
            <DropdownInput
              label="Industry"
              id="industry"
              value={eventData.industry}
              onChange={handleChange}
              listItems={listIndustry}
            />
            <DropdownInput
              label="Event Type"
              id="type"
              value={eventData.type}
              onChange={handleChange}
              listItems={listType}
            />
            <TextInput
              label="Start Date"
              id="startDate"
              value={eventData.startDate}
              onChange={handleChange}
              errorEmptyMessage="Please fill out this field."
              isSubmit={isSubmit}
              min={formattedToday}
              type="date"
            />
            <TextInput
              label="End Date"
              id="endDate"
              value={eventData.endDate}
              onChange={handleChange}
              errorEmptyMessage="Please fill out this field."
              isSubmit={isSubmit}
              min={formattedToday}
              type="date"
            />
            <TextInput
              label="Start Time"
              id="startTime"
              value={eventData.startTime}
              onChange={handleChange}
              errorEmptyMessage="Please fill out this field."
              isSubmit={isSubmit}
              type="time"
            />
            <TextInput
              label="End Time"
              id="endTime"
              value={eventData.endTime}
              onChange={handleChange}
              errorEmptyMessage="Please fill out this field."
              isSubmit={isSubmit}
              type="time"
            />
            {/* <TextInput
              label="Maximum Fee per User (IDR)"
              id="maxFee"
              value={eventData.maxFee}
              onChange={handleChange}
              errorEmptyMessage="Please fill out this field."
              isSubmit={isSubmit}
              type="money"
              min={0}
            /> */}
            {/* <DropdownInput
              label="Package"
              id="bundlePackage"
              value={eventData.bundlePackage}
              onChange={handleChange}
              listItems={listPackage}
            /> */}
            <div className="col-span-6">
              <label
                htmlFor={coupon}
                className="block text-sm font-medium leading-6 text-stone-900">
                Coupon Code
              </label>
              {eventData.coupon ? (
                <div className="flex items-center justify-between rounded-md border border-rose-700 bg-rose-50 px-2 py-2">
                  <span className="text-sm font-semibold text-rose-700">
                    {coupon.toUpperCase()}: {couponDetail?.title ?? ''}
                  </span>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="flex justify-center rounded-md border border-rose-700 bg-white px-3 py-1 text-sm font-semibold leading-6 text-rose-600 shadow-sm transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 py-2">
                  <input
                    type="text"
                    name="coupon"
                    id="coupon"
                    label="Coupon"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    required
                    className="block w-full rounded-md border-0 px-2 py-1 text-stone-900 shadow-sm outline-none ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="flex justify-center rounded-md bg-rose-600 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm transition duration-300 hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
                    Apply
                  </button>
                </div>
              )}
            </div>
            <div className="col-span-6">
              <label className="block text-sm font-medium leading-6 text-stone-900">
                Invited Promotor
              </label>
              <div className="mt-2 flex flex-wrap">
                {listInvitedPromotor.data.map((spgData) => {
                  return listInvitedPromotor.data.length > 0 ? (
                    <div
                      className={clsx(
                        spgData[1].tier === 1 && 'border-yellow-300 bg-yellow-300/10',
                        spgData[1].tier === 2 && 'border-blue-500 bg-blue-500/10',
                        spgData[1].tier === 3 && 'border-emerald-500 bg-emerald-500/10',
                        'mb-2 mr-1.5 flex items-center justify-center rounded-full border text-center'
                      )}
                      key={spgData[0]}>
                      <img
                        loading="lazy"
                        className="my-auto mr-2 h-8 w-8 rounded-l-full object-cover"
                        src={spgData[1].profilePicture[0]}
                      />
                      <div className="text-xs">{spgData[1].name}</div>
                      <img
                        loading="lazy"
                        className="mx-2 my-auto h-3 w-3"
                        src={
                          spgData[1].gender === 'Female'
                            ? '/images/female-gender.png'
                            : '/images/male-gender.png'
                        }
                      />
                    </div>
                  ) : (
                    <div></div>
                  )
                })}
              </div>
              {/* <div className="mt-4 flex flex-row text-sm font-medium leading-6 text-stone-900">
                <div className="font-semibold">Promoters fee: </div>
                <div className="ml-2">{moneyFormat(listInvitedPromotor.totalFee)} / day </div>
              </div>
              {listInvitedPromotor.bundlingDiscount > 0 && (
                <div className="mt-1 flex flex-row text-sm font-medium leading-6 text-stone-900">
                  <div className="font-semibold">Bundling fee discount: </div>
                  <div className="ml-2">{listInvitedPromotor.bundlingDiscount * 100}% </div>
                </div>
              )}
              {eventData.startDate && eventData.endDate && (
                <div className="mt-1 flex flex-row text-sm font-medium leading-6 text-stone-900">
                  <div className="font-semibold">Total days: </div>
                  <div className="ml-2">
                    {dateToDaysDifference(eventData.startDate, eventData.endDate) + 1} days
                  </div>
                </div>
              )}
              {eventData.startDate && eventData.endDate && listInvitedPromotor.totalFee > 0 && (
                <div className="mt-1 flex flex-row text-sm font-medium leading-6 text-stone-900">
                  <div className="font-semibold">Total estimated fee: </div>
                  <div className="ml-2 font-bold text-rose-800">
                    {moneyFormat(
                      (dateToDaysDifference(eventData.startDate, eventData.endDate) + 1) *
                        (listInvitedPromotor.totalFee * (1 - listInvitedPromotor.bundlingDiscount))
                    )}{' '}
                  </div>
                </div>
              )} */}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="mt-12 flex w-full justify-center rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm transition duration-300 hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
              {t('commonSubmit')}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}
