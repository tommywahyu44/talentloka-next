'use client'

import { AuthBackButton } from '@/components/button/AuthBackButton'
import { AuthButton } from '@/components/button/AuthButton'
import { FileInput, PhoneInput, TextInput } from '@/components/input/Input'
import { limitFileSizeKb, limitFileSizeMb } from '@/lib/helpers'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import Swal from 'sweetalert2'

const defaultCountry = {
  name: 'Indonesia',
  flagUrl: 'https://flagcdn.com/id.svg',
  countryCode: '+62',
}

export default function OnboardingForm({ email, businessType, handleBusinessTypeChange }) {
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
      businessType === 'PT'
        ? name &&
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
        : businessType === 'PP'
          ? name &&
            company &&
            contact &&
            fileInputs.companyLogo[0] &&
            email &&
            directorIdCard &&
            fileInputs.directorIdCard[0] &&
            singleBusinessNumber &&
            fileInputs.singleBusinessNumber[0] &&
            employerTaxId &&
            fileInputs.employerTaxId[0]
          : name &&
            company &&
            contact &&
            fileInputs.companyLogo[0] &&
            email &&
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
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            errorEmptyMessage="Please fill out this field."
            isSubmit={isSubmit}
          />

          <PhoneInput
            label="Phone Number"
            id="contact"
            placeholder="Enter your phone number"
            value={formData.contact}
            onChange={handleChange}
            selectedCountry={formData.selectedCountry}
            setSelectedCountry={(country) => setFormData({ ...formData, selectedCountry: country })}
            errorEmptyMessage="Please fill out this field."
            isSubmit={isSubmit}
          />

          <TextInput
            label="Company"
            id="company"
            placeholder="Enter your company name"
            value={formData.company}
            onChange={handleChange}
            errorEmptyMessage="Please fill out this field."
            isSubmit={isSubmit}
          />

          {businessType === 'PT' && (
            <FileInput
              label="Deed of Establishment (PDF)"
              limitDesc="PDF, PNG, JPG, or JPEG (Max 5 MB)"
              id="deedOfEstablishment"
              value={fileInputs.deedOfEstablishment}
              onChange={(e) => handleFileChange('deedOfEstablishment', 5, e)}
              errorEmptyMessage="Please fill out this field."
              isSubmit={isSubmit}
            />
          )}

          {(businessType === 'PT' || businessType === 'PP') && (
            <TextInput
              label="Single Business Number"
              id="singleBusinessNumber"
              placeholder="Enter your single business number"
              value={formData.singleBusinessNumber}
              onChange={handleChange}
              errorEmptyMessage="Please fill out this field."
              isSubmit={isSubmit}
            />
          )}

          {(businessType === 'PT' || businessType === 'PP') && (
            <FileInput
              label="Upload Single Business Number"
              limitDesc="PDF, PNG, JPG, or JPEG (Max 2 MB)"
              id="singleBusinessNumber"
              value={fileInputs.singleBusinessNumber}
              onChange={(e) => handleFileChange('singleBusinessNumber', 2, e)}
              errorEmptyMessage="Please fill out this field."
              isSubmit={isSubmit}
            />
          )}

          <TextInput
            label="Nomor KTP"
            id="directorIdCard"
            placeholder="Enter your KTP number"
            value={formData.directorIdCard}
            onChange={handleChange}
            errorEmptyMessage="Please fill out this field."
            isSubmit={isSubmit}
          />

          <FileInput
            label="Upload KTP"
            limitDesc="PDF, PNG, JPG, or JPEG (Max 2 MB)"
            id="directorIdCard"
            value={fileInputs.directorIdCard}
            onChange={(e) => handleFileChange('directorIdCard', 2, e)}
            errorEmptyMessage="Please fill out this field."
            isSubmit={isSubmit}
          />

          {(businessType === 'PT' || businessType === 'PP') && (
            <TextInput
              label="Employer Tax ID Number"
              id="employerTaxId"
              placeholder="Enter your employer tax ID number"
              value={formData.employerTaxId}
              onChange={handleChange}
              errorEmptyMessage="Please fill out this field."
              isSubmit={isSubmit}
            />
          )}

          {(businessType === 'PT' || businessType === 'PP') && (
            <FileInput
              label="Upload Employer Tax ID"
              limitDesc="PDF, PNG, JPG, or JPEG (Max 2 MB)"
              id="employerTaxId"
              value={fileInputs.employerTaxId}
              onChange={(e) => handleFileChange('employerTaxId', 2, e)}
              errorEmptyMessage="Please fill out this field."
              isSubmit={isSubmit}
            />
          )}
        </div>
        <div className="mt-auto flex flex-row space-x-3 pt-12">
          <AuthBackButton onClick={() => handleBusinessTypeChange(businessType.selected, false)} />
          <div className="grow space-y-4">
            <AuthButton type="submit">{t('commonSubmit')}</AuthButton>
          </div>
        </div>
      </form>
    </div>
  )
}
