'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import Swal from 'sweetalert2'
import { limitFileSizeKb, limitFileSizeMb } from '@/lib/helpers'
import { TextInput, FileInput, PhoneInput } from '@/components/input/Input'

const defaultCountry = {
  name: 'Indonesia',
  flagUrl: 'https://flagcdn.com/id.svg',
  countryCode: '+62',
}

export default function OnboardingForm({ email }) {
  const t = useTranslations('default')
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    contact: '',
    singleBusinessNumber: '',
    directorIdCard: '',
    employerTaxId: '',
    selectedCountry: defaultCountry,
  })

  const [fileInputs, setFileInputs] = useState({
    companyLogo: [null, ''],
    deedOfEstablishment: [null, ''],
    singleBusinessNumber: [null, ''],
    directorIdCard: [null, ''],
    employerTaxId: [null, ''],
  })

  const [isSubmit, setIsSubmit] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (field, maxSize, event) => {
    const file = event.target.files[0]
    const limitFile =
      field === 'companyLogo' ? limitFileSizeKb(file, 200) : limitFileSizeMb(file, maxSize)
    setFileInputs({ ...fileInputs, [field]: limitFile })

    // Show logo preview if the uploaded file is the company logo
    if (field === 'companyLogo' && limitFile[1] === '') {
      const output = document.getElementById('logo-preview')
      output.src = URL.createObjectURL(file)
      output.onload = () => URL.revokeObjectURL(output.src) // free memory
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmit(true)

    const { name, company, contact, singleBusinessNumber, directorIdCard, employerTaxId } = formData

    const valid =
      name &&
      company &&
      contact &&
      fileInputs.companyLogo[0] &&
      email &&
      fileInputs.deedOfEstablishment[0] &&
      directorIdCard &&
      fileInputs.directorIdCard[0] &&
      singleBusinessNumber &&
      fileInputs.singleBusinessNumber[0] &&
      employerTaxId &&
      fileInputs.employerTaxId[0]

    if (valid) {
      const formSubmitData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'contact') {
          formSubmitData.append('contact', `${formData.selectedCountry.countryCode} ${value}`)
        } else if (key === 'selectedCountry') {
          // No need to append selectedCountry
        } else {
          formSubmitData.append(key, value)
        }
      })
      Object.keys(fileInputs).forEach((key) => {
        if (key === 'companyLogo') {
          formSubmitData.append(key, fileInputs[key][0])
        } else {
          formSubmitData.append(`${key}File`, fileInputs[key][0])
        }
      })
      formSubmitData.append('email', email)

      Swal.showLoading()
      try {
        await axios.post(
          'https://asia-southeast1-talentloka-35463.cloudfunctions.net/registerClient',
          formSubmitData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )
        Swal.hideLoading()
        Swal.fire({
          text: 'Successfully submitted',
          icon: 'success',
          confirmButtonText: 'Okay',
          confirmButtonColor: '#BE123C',
        })
      } catch (err) {
        Swal.hideLoading()
        console.error('Submission error: ', err)
      }
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
      <ClipboardDocumentListIcon className="mx-auto h-32 w-32 text-rose-500" />
      <h2 className="mt-8 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
        Complete Your Onboarding Profile
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-stone-600">
        Before you can start using our app, please complete your onboarding profile so that we can
        verify your profile. Thank you!
      </p>
      <form
        className="mt-10 space-y-6 sm:mx-auto sm:w-full sm:max-w-2xl"
        onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 text-left sm:grid-cols-6">
          <TextInput
            label="Name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            errorEmptyMessage="Please fill out this field."
            isSubmit={isSubmit}
            isFullWidth={true}
          />
          <PhoneInput
            label="Phone Number"
            id="contact"
            value={formData.contact}
            onChange={handleChange}
            selectedCountry={formData.selectedCountry}
            setSelectedCountry={(country) => setFormData({ ...formData, selectedCountry: country })}
            errorEmptyMessage="Please fill out this field."
            isSubmit={isSubmit}
            isFullWidth={true}
          />
          <TextInput
            label="Company"
            id="company"
            value={formData.company}
            onChange={handleChange}
            errorEmptyMessage="Please fill out this field."
            isSubmit={isSubmit}
          />
          <FileInput
            label="Deed of Establishment (PDF)"
            limitDesc="PDF, PNG, JPG or JPEG (Max 5 MB)"
            id="deedOfEstablishment"
            value={fileInputs.deedOfEstablishment}
            onChange={(e) => handleFileChange('deedOfEstablishment', 5, e)}
            errorEmptyMessage="Please fill out this field."
            isSubmit={isSubmit}
          />
          <FileInput
            label="Company / Brand Logo"
            limitDesc="PNG, JPG or JPEG (Max 200 KB)"
            id="companyLogo"
            value={fileInputs.companyLogo}
            onChange={(e) => handleFileChange('companyLogo', 200, e)}
            errorEmptyMessage="Please fill out this field."
            isSubmit={isSubmit}
            isFullWidth={true}
          />
          <img
            id="logo-preview"
            className={`h-32 w-auto rounded-lg sm:col-span-6 ${fileInputs.companyLogo[0] ? '' : 'hidden'}`}
            alt="Logo Preview"
          />
          <TextInput
            label="Single Business Number"
            id="singleBusinessNumber"
            value={formData.singleBusinessNumber}
            onChange={handleChange}
            errorEmptyMessage="Please fill out this field."
            isSubmit={isSubmit}
          />
          <FileInput
            label="Upload Single Business Number"
            limitDesc="PDF, PNG, JPG or JPEG (Max 2 MB)"
            id="singleBusinessNumber"
            value={fileInputs.singleBusinessNumber}
            onChange={(e) => handleFileChange('singleBusinessNumber', 2, e)}
            errorEmptyMessage="Please fill out this field."
            isSubmit={isSubmit}
          />
          <TextInput
            label="Director ID Card Number"
            id="directorIdCard"
            value={formData.directorIdCard}
            onChange={handleChange}
            errorEmptyMessage="Please fill out this field."
            isSubmit={isSubmit}
          />
          <FileInput
            label="Upload Director ID Card"
            limitDesc="PDF, PNG, JPG or JPEG (Max 2 MB)"
            id="directorIdCard"
            value={fileInputs.directorIdCard}
            onChange={(e) => handleFileChange('directorIdCard', 2, e)}
            errorEmptyMessage="Please fill out this field."
            isSubmit={isSubmit}
          />
          <TextInput
            label="Employer Tax ID Number"
            id="employerTaxId"
            value={formData.employerTaxId}
            onChange={handleChange}
            errorEmptyMessage="Please fill out this field."
            isSubmit={isSubmit}
          />
          <FileInput
            label="Upload Employer Tax ID"
            limitDesc="PDF, PNG, JPG or JPEG (Max 2 MB)"
            id="employerTaxId"
            value={fileInputs.employerTaxId}
            onChange={(e) => handleFileChange('employerTaxId', 2, e)}
            errorEmptyMessage="Please fill out this field."
            isSubmit={isSubmit}
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
    </div>
  )
}
