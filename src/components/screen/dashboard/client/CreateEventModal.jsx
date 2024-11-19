import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { Modal } from 'flowbite-react'
import { TextInput, FileInput, DropdownInput } from '@/components/input/Input'
import { limitFileSizeKb, limitFileSizeMb, dateAndTimeToUtc } from '@/lib/helpers'
import { apiService } from '@/lib/apiService'
import Swal from 'sweetalert2'
export default function CreateEventModal({
  isOpenCreateEvent,
  closeCreateEvent,
  email,
  method = 'create',
  data,
}) {
  const t = useTranslations('default')
  const listIndustry = ['Retail', 'Cosmetics', 'Automotive', 'Electronics']
  const listType = ['Public', 'Private']
  const listPackage = ['No Package', 'Bronze', 'Silver', 'Gold', 'Diamond']
  const [eventData, setEventData] = useState({
    title: data?.title ?? '',
    description: data?.description ?? '',
    industry: data?.industry ?? listIndustry[0],
    promotorNumber: data?.promotorNumber ?? 0,
    type: data?.type ?? listType[0],
    startDate: data?.startDate ?? '',
    endDate: data?.endDate ?? '',
    startTime: data?.startTime ?? '',
    endTime: data?.endTime ?? '',
    budget: data?.budget ?? 0,
    bundlePackage: data?.bundlePackage ?? listPackage[0],
    listPromotor: data?.listPromotor ?? [],
  })

  const [fileInputs, setFileInputs] = useState({
    eventImage: [data?.image ?? null, ''],
  })

  const handleChange = (event) => {
    if (event.target) {
      const { name, value } = event.target
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

  const [isSubmit, setIsSubmit] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmit(true)

    const {
      title,
      description,
      industry,
      promotorNumber,
      type,
      startDate,
      endDate,
      startTime,
      endTime,
      budget,
      bundlePackage,
    } = eventData

    const valid =
      title &&
      description &&
      industry &&
      promotorNumber &&
      type &&
      startDate &&
      endDate &&
      startTime &&
      endTime &&
      budget &&
      bundlePackage &&
      fileInputs.eventImage[0]

    if (valid) {
      const formSubmitData = new FormData()
      Object.entries(eventData).forEach(([key, value]) => {
        switch (key) {
          case 'listPromotor':
            if (value.length === 0) {
              formSubmitData.append(key, '')
            } else {
              var listId = value.map((item) => item.spgCode)
              formSubmitData.append(key, listId.join(',') || '')
            }
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

      switch (method) {
        case 'create':
          apiService.createEventPromotor(formSubmitData)
          break
        case 'update':
          formSubmitData.append('id', data?.id)
          apiService.updateEventPromotor(formSubmitData)
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
        startDate: data?.startDate ?? '',
        endDate: data?.endDate ?? '',
        startTime: data?.startTime ?? '',
        endTime: data?.endTime ?? '',
        budget: data?.budget ?? 0,
        bundlePackage: data?.bundlePackage ?? listPackage[0],
        listPromotor: data?.listPromotor ?? [],
      })
      setFileInputs({
        eventImage: [data?.image ?? null, ''],
      })
    }
  }, [data])
  return (
    <Modal
      dismissible
      show={isOpenCreateEvent}
      size="2xl"
      className="bg-opacity-40 pt-6"
      popup
      onClose={() => closeCreateEvent()}>
      <Modal.Body className="rounded-lg bg-white">
        <form
          className="mt-10 space-y-6 sm:mx-auto sm:w-full sm:max-w-2xl"
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
            <TextInput
              label="Promotor"
              id="promotorNumber"
              value={eventData.promotorNumber}
              onChange={handleChange}
              errorEmptyMessage="Please fill out this field."
              isSubmit={isSubmit}
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
              type="date"
            />
            <TextInput
              label="End Date"
              id="endDate"
              value={eventData.endDate}
              onChange={handleChange}
              errorEmptyMessage="Please fill out this field."
              isSubmit={isSubmit}
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
            <TextInput
              label="Budget (IDR)"
              id="budget"
              value={eventData.budget}
              onChange={handleChange}
              errorEmptyMessage="Please fill out this field."
              isSubmit={isSubmit}
              type="money"
              min={0}
            />
            <DropdownInput
              label="Package"
              id="bundlePackage"
              value={eventData.bundlePackage}
              onChange={handleChange}
              listItems={listPackage}
            />
            <TextInput
              label="Invited Promotor"
              id="listPromotor"
              value={eventData.listPromotor.map((item) => item.spgCode).join(', ')}
              editable={false}
            />
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
