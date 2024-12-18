'use client'

import { useTranslations } from 'next-intl'
import { Fragment, useState } from 'react'

import { checkbox } from '@/lib/components'
import { textItemSmall } from '@/lib/components.jsx'
import {
  classNames,
  getOthersInArray,
  getYoutubeVideoEmbed,
  limitFileSizeMb,
  replaceCustomOthers,
} from '@/lib/helpers'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { ArrowLeftIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import axios from 'axios'
import clsx from 'clsx'
import Swal from 'sweetalert2'
import { useCountries } from 'use-react-countries'
import Accordion from '/src/components/list/Accordion.jsx'

export default function UpdateProfile({ email, profileData, isFromRegister }) {
  const t = useTranslations('default')

  const allowedCountries = ['Indonesia', 'Thailand', 'Malaysia', 'Vietnam', 'Singapore']

  const listShirtSize = ['S', 'M', 'L', 'XL', 'XXL']

  const listGender = ['Male', 'Female']

  const listRace = ['Indonesian', 'Indonesian - Chinese']

  const listRole = ['SPG', 'Model']

  const listCity = ['Jakarta', 'Bali', 'Surabaya', 'Bandung']

  const listCurrency = ['IDR', 'SGD', 'USD', 'CNY', 'THB', 'VND', 'MYR']

  const languages = [
    { id: 'language-english', name: 'English', active: false },
    { id: 'language-indonesian', name: 'Indonesian', active: false },
    { id: 'language-malay', name: 'Malay', active: false },
    { id: 'language-thai', name: 'Thai', active: false },
    { id: 'language-vietnamese', name: 'Vietnamese', active: false },
    { id: 'language-chinese', name: 'Chinese', active: false },
    { id: 'language-others', name: 'Others', active: false },
  ]

  const experiences = [
    { id: 'event-bazaar', name: 'Bazaar', active: false },
    {
      id: 'event-company',
      name: 'Company Events / Expo / Exhibition',
      active: false,
    },
    { id: 'event-company-gathering', name: 'Company Gathering', active: false },
    { id: 'event-conference', name: 'Conference', active: false },
    { id: 'event-exhibition', name: 'Exhibition', active: false },
    { id: 'event-fair', name: 'Fair', active: false },
    { id: 'event-fashion', name: 'Fashion Week', active: false },
    {
      id: 'event-festival',
      name: 'Festival',
      active: false,
    },
    { id: 'event-party', name: 'Party Event', active: false },
    { id: 'event-product', name: 'Product Launching', active: false },
    { id: 'event-seminar', name: 'Seminar', active: false },
    { id: 'event-others', name: 'Others', active: false },
  ]

  var brands = [
    { id: 'brand-automotive', name: 'Automotive', active: false },
    { id: 'brand-bank', name: 'Bank', active: false },
    { id: 'brand-baby', name: 'Baby / kids care', active: false },
    { id: 'brand-beauty', name: 'Beauty tools', active: false },
    {
      id: 'brand-fashion',
      name: 'Fashion',
      active: false,
    },
    {
      id: 'brand-education',
      name: 'Education',
      active: false,
    },
    { id: 'brand-food', name: 'Food and beverages', active: false },
    { id: 'brand-furniture', name: 'Furniture', active: false },
    { id: 'brand-franchise', name: 'Franchise', active: false },
    { id: 'brand-haircare', name: 'Haircare', active: false },
    { id: 'brand-homecare', name: 'Homecare', active: false },
    { id: 'brand-jewelry', name: 'Jewelry', active: false },
    { id: 'brand-makeup', name: 'Make up', active: false },
    { id: 'brand-manufacturing', name: 'Manufacturing goods', active: false },
    {
      id: 'brand-medicine',
      name: 'Medicine / healthcare',
      active: false,
    },
    { id: 'brand-perfume', name: 'Perfume', active: false },
    { id: 'brand-skincare', name: 'Skincare', active: false },
    { id: 'brand-sports', name: 'Sports', active: false },
    { id: 'brand-technology', name: 'Technology', active: false },
    {
      id: 'brand-tobacco',
      name: 'Tobacco / cigarettes',
      active: false,
    },
    { id: 'brand-watches', name: 'Watches', active: false },
    { id: 'brand-wedding', name: 'Wedding expo', active: false },
    { id: 'brand-others', name: 'Others', active: false },
  ]

  const [accordions, setAccordion] = useState([
    {
      key: 1,
      title: 'Event Experiences',
      data: '',
      isOpen: false,
    },
    {
      key: 2,
      title: 'Brand Experiences',
      data: '',
      isOpen: false,
    },
    {
      key: 3,
      title: 'Languages',
      data: '',
      isOpen: false,
    },
  ])

  const toggleAccordion = (accordionkey) => {
    const updatedAccordions = accordions.map((accord) => {
      if (accord.key === accordionkey) {
        return { ...accord, isOpen: !accord.isOpen }
      } else {
        return { ...accord, isOpen: false }
      }
    })

    setAccordion(updatedAccordions)
  }

  const { countries } = useCountries()
  var defaultCountry = {
    name: 'Indonesia',
    flagUrl: 'https://flagcdn.com/id.svg',
    countryCode: '+62',
  }
  if (profileData?.contact) {
    const countryData = countries.filter(
      (country) => country.countryCallingCode === profileData?.contact.split(' ')[0]
    )[0]
    defaultCountry = {
      name: countryData.name,
      flagUrl: countryData.flags.svg,
      countryCode: countryData.countryCallingCode,
    }
  }

  const [fullName, setFullName] = useState(profileData?.fullName ?? '')
  const [gender, setGender] = useState(profileData?.gender ?? listGender[0])
  const [dob, setDob] = useState(profileData?.dob ?? '')
  const [city, setCity] = useState(profileData?.city ?? listCity[0])
  const [country, setCountry] = useState(profileData?.country ?? allowedCountries[0])
  const [height, setHeight] = useState(profileData?.heightCm ?? '')
  const [weight, setWeight] = useState(profileData?.weightKg ?? '')
  const [shirt, setShirt] = useState(profileData?.shirt ?? listShirtSize[1])
  const [shoes, setShoes] = useState(profileData?.shoesEU ?? '')
  const [contact, setContact] = useState(profileData?.contact.split(' ')[2] ?? '')
  const [selectedCountryCode, setSelectedCountryCode] = useState(defaultCountry)
  const [race, setRace] = useState(profileData?.race ?? listRace[0])
  const [role, setRole] = useState(profileData?.role ?? listRole[0])
  const [yoe, setYoe] = useState(profileData?.yoe ?? 0)
  const [salary, setSalary] = useState(profileData?.previousSalaryAmount ?? 0)
  const [roleFee, setRoleFee] = useState(
    profileData?.fee ?? {
      SPG: 0,
      USHER: 0,
      RUNNER: 0,
    }
  )
  const [currency, setCurrency] = useState(profileData?.previousSalaryCurrency ?? listCurrency[0])
  const [introVideoUrl, setIntroVideoUrl] = useState(profileData?.introVideoUrl ?? '')
  const [photo1, setPhoto1] = useState([profileData?.profilePicture[0] ?? null, ''])
  const [photo2, setPhoto2] = useState([profileData?.profilePicture[1] ?? null, ''])
  const [photo3, setPhoto3] = useState([profileData?.profilePicture[2] ?? null, ''])
  const [photo4, setPhoto4] = useState([profileData?.profilePicture[3] ?? null, ''])
  const [isSubmit, setIsSubmit] = useState(false)
  const [isUpdateProfile, setIsUpdateProfile] = useState(isFromRegister)
  const [experienceCheckedItems, setExperienceCheckedItems] = useState(
    profileData?.experiences ?? []
  )
  const [brandCheckedItems, setBrandCheckedItems] = useState(profileData?.brands ?? [])
  const [languageCheckedItems, setLanguageCheckedItems] = useState(profileData?.languages ?? [])
  const [customEventText, setCustomEventText] = useState(
    getOthersInArray(profileData?.experiences ?? [])
  )
  const [customBrandText, setCustomBrandText] = useState(
    getOthersInArray(profileData?.brands ?? [])
  )
  const [customLanguageText, setCustomLanguageText] = useState(
    getOthersInArray(profileData?.languages ?? [])
  )

  const [isWearHijab, setIsWearHijab] = useState(
    profileData?.isWearHijab ? (profileData?.isWearHijab === 'true' ? true : false) : false
  )
  const [hasTattoo, setHasTattoo] = useState(
    profileData?.hasTattoo ? (profileData?.hasTattoo === 'true' ? true : false) : false
  )
  const [tattooLocation, setTattooLocation] = useState(profileData?.tattooLocation ?? '')
  const [isTncChecked, setTncChecked] = useState(false)

  const handleChangeEventCheckbox = (event) => {
    if (event.target.checked) {
      setExperienceCheckedItems([...experienceCheckedItems, event.target.name])
    } else {
      if (event.target.name.includes('Others')) {
        setCustomEventText('')
      }
      setExperienceCheckedItems([
        ...experienceCheckedItems.filter((e) => !e.includes(event.target.name)),
      ])
    }
  }

  const handleChangeBrandCheckbox = (event) => {
    if (event.target.checked) {
      setBrandCheckedItems([...brandCheckedItems, event.target.name])
    } else {
      if (event.target.name.includes('Others')) {
        setCustomBrandText('')
      }
      setBrandCheckedItems([...brandCheckedItems.filter((e) => !e.includes(event.target.name))])
    }
  }

  const handleChangeLanguageCheckbox = (event) => {
    if (event.target.checked) {
      setLanguageCheckedItems([...languageCheckedItems, event.target.name])
    } else {
      if (event.target.name.includes('Others')) {
        setCustomLanguageText('')
      }
      setLanguageCheckedItems([
        ...languageCheckedItems.filter((e) => !e.includes(event.target.name)),
      ])
    }
  }

  const handleCustomEventChange = (event) => {
    setCustomEventText(event.target.value)
    var newArr = replaceCustomOthers(experienceCheckedItems, event.target.value)
    setExperienceCheckedItems(newArr)
  }

  const handleCustomBrandChange = (event) => {
    setCustomBrandText(event.target.value)
    var newArr = replaceCustomOthers(brandCheckedItems, event.target.value)
    setBrandCheckedItems(newArr)
  }

  const handleCustomLanguageChange = (event) => {
    setCustomLanguageText(event.target.value)
    var newArr = replaceCustomOthers(languageCheckedItems, event.target.value)
    setLanguageCheckedItems(newArr)
  }

  const errorEmptyMessage = 'Please fill out this field.'

  const handleFullNameChange = (event) => {
    setFullName(event.target.value)
  }

  const handleContactChange = (event) => {
    setContact(event.target.value)
  }

  const handleDobChange = (event) => {
    setDob(event.target.value)
  }

  const handleHeightChange = (event) => {
    setHeight(event.target.value)
  }

  const handleWeightChange = (event) => {
    setWeight(event.target.value)
  }

  const handleShoesChange = (event) => {
    setShoes(event.target.value)
  }

  const handleYoeChange = (event) => {
    setYoe(event.target.value)
  }

  const handleSalaryChange = (event) => {
    setSalary(event.target.value)
  }

  const handleRoleFeeChange = (event) => {
    const { name, value } = event.target

    // Update the specific role fee
    setRoleFee((prevState) => ({
      ...prevState,
      [name]: parseFloat(value) || 0, // Ensure the value is a number
    }))
  }

  const handleIntroVideoUrlChange = (event) => {
    setIntroVideoUrl(event.target.value)
  }

  const handleTattooLocationChange = (event) => {
    setTattooLocation(event.target.value)
  }

  const handleTncChecked = (event) => {
    setTncChecked(event.target.checked)
  }

  const handlePhoto1Change = (event) => {
    let file = event.target.files[0]
    const limitFile = limitFileSizeMb(file, 1)
    setPhoto1(limitFile)
  }

  const handlePhoto2Change = (event) => {
    let file = event.target.files[0]
    const limitFile = limitFileSizeMb(file, 1)
    setPhoto2(limitFile)
  }

  const handlePhoto3Change = (event) => {
    let file = event.target.files[0]
    const limitFile = limitFileSizeMb(file, 1)
    setPhoto3(limitFile)
  }

  const handlePhoto4Change = (event) => {
    let file = event.target.files[0]
    const limitFile = limitFileSizeMb(file, 1)
    setPhoto4(limitFile)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setIsSubmit(true)

    if (
      fullName &&
      gender &&
      dob &&
      city &&
      country &&
      height &&
      weight &&
      shirt &&
      contact &&
      selectedCountryCode &&
      race &&
      role &&
      photo1[0] &&
      photo2[0] &&
      photo3[0] &&
      photo4[0]
    ) {
      var formData = new FormData()
      const roleCategories = Object.entries(roleFee)
        .filter(([role, fee]) => fee > 0) // Only include roles where fee > 0
        .map(([role, fee]) => ({
          role: role === 'SPG' && gender.toLowerCase() === 'male' ? 'SPB' : role, // Update "SPG" to "SPB" if gender is male
          fee: fee.toString(),
        }))
      formData.append('fullName', fullName)
      formData.append('gender', gender)
      formData.append('dobYear', dob)
      formData.append('city', city)
      formData.append('contact', `${selectedCountryCode.countryCode} ${contact}`)
      formData.append('email', email)
      formData.append('country', country)
      formData.append('height', height)
      formData.append('weight', weight)
      formData.append('shirt', shirt)
      formData.append('shoes', shoes)
      formData.append('yoe', yoe)
      formData.append('previousSalaryAmount', salary)
      formData.append('previousSalaryCurrency', currency)
      formData.append('fee', JSON.stringify(roleFee))
      formData.append('categories', JSON.stringify(roleCategories))
      formData.append('race', race)
      formData.append('role', role)
      formData.append('photo1', photo1[0])
      formData.append('photo2', photo2[0])
      formData.append('photo3', photo3[0])
      formData.append('photo4', photo4[0])
      if (!isFromRegister) {
        formData.append('code', profileData?.code)
      }
      formData.append('experiences', experienceCheckedItems)
      formData.append('brands', brandCheckedItems)
      formData.append('languages', languageCheckedItems)
      formData.append('introVideoUrl', introVideoUrl)
      formData.append('isWearHijab', isWearHijab)
      formData.append('hasTattoo', hasTattoo)
      if (hasTattoo) {
        formData.append('tattooLocation', tattooLocation)
      } else {
        formData.append('tattooLocation', '')
      }
      Swal.showLoading()
      axios
        .post(
          isFromRegister
            ? 'https://asia-southeast1-talentloka-35463.cloudfunctions.net/registerPromoter'
            : 'https://asia-southeast1-talentloka-35463.cloudfunctions.net/updatePromoter',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then(() => {
          Swal.hideLoading()
          Swal.fire({
            text: 'Successfully submitted',
            icon: 'success',
            confirmButtonText: 'Okay',
            confirmButtonColor: '#BE123C',
          })
        })
        .catch((err) => {
          Swal.hideLoading()
          console.log('err ', err)
        })
    }
  }
  return (
    <>
      {isUpdateProfile ? (
        <div className="mx-auto mb-12 flex min-h-full max-w-5xl flex-1 flex-col justify-center px-6 py-6 md:mb-0 lg:px-8">
          {!isFromRegister && (
            <ArrowLeftIcon
              onClick={() => setIsUpdateProfile(false)}
              className="h-6 w-6 cursor-pointer text-stone-900"
            />
          )}
          <h2 className="mx-auto text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            {isFromRegister ? 'Submit Your Profile' : 'Update Profile'}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-stone-600">
            {isFromRegister
              ? 'Please complete your profile and we will verify it. Thank you!'
              : 'Update the profile information below and click submit to submit your update request.'}
          </p>
          <div className="mb-24 mt-10 w-full sm:mb-0">
            <form
              className="space-y-6"
              onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 text-left sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-stone-900">
                    Full Name<span className="text-red-600">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      value={fullName}
                      onChange={handleFullNameChange}
                      required
                      className="block w-full rounded-md border-0 px-2 py-1 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="mt-1 text-sm text-red-600">
                    {fullName === '' && isSubmit ? errorEmptyMessage : ''}
                  </p>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-stone-900">
                    {t('commonGender')}
                    <span className="text-red-600">*</span>
                  </label>
                  <Menu
                    as="div"
                    className="relative mt-2 inline-block w-full text-left">
                    <div>
                      <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 transition duration-300 hover:bg-stone-50">
                        {gender}
                        <ChevronDownIcon
                          className="-mr-1 h-5 w-5 text-stone-400"
                          aria-hidden="true"
                        />
                      </MenuButton>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {listGender.map((gender) => (
                            <MenuItem key={gender}>
                              {({ active }) => (
                                <a
                                  onClick={() => {
                                    setGender(gender)
                                  }}
                                  className={classNames(
                                    active ? 'bg-stone-100 text-stone-900' : 'text-stone-700',
                                    'block cursor-pointer px-4 py-2 text-sm'
                                  )}>
                                  {gender}
                                </a>
                              )}
                            </MenuItem>
                          ))}
                        </div>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-stone-900">
                    Date of Birth (Year)<span className="text-red-600">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="dob"
                      id="dob"
                      min="1900"
                      max="2024"
                      step="1"
                      value={dob}
                      onChange={handleDobChange}
                      required
                      className="block w-full rounded-md border-0 px-2 py-1 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="mt-1 text-sm text-red-600">
                    {dob === '' && isSubmit ? errorEmptyMessage : ''}
                  </p>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="contact"
                    className="block text-sm font-medium leading-6 text-stone-900">
                    Phone Number<span className="text-red-600">*</span>
                  </label>
                  <div className="flex items-center sm:col-span-3">
                    <Menu
                      as="div"
                      className="relative mt-2 inline-block text-left">
                      <div>
                        <MenuButton
                          id="dropdown-phone-button"
                          data-dropdown-toggle="dropdown-phone"
                          className="z-10 inline-flex w-full flex-shrink-0 items-center rounded-s-md border-0 bg-stone-800 px-2 py-1 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-800 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                          type="button">
                          <img
                            src={selectedCountryCode.flagUrl}
                            alt={selectedCountryCode.name}
                            className="h-5 w-5 rounded-full object-cover"
                          />
                          <span className="ml-2 text-base text-white">
                            {selectedCountryCode.countryCode}
                          </span>
                          <ChevronDownIcon
                            className="group-transition ml-1 mr-3 h-5 w-5 flex-shrink-0 text-white duration-300 hover:text-rose-500"
                            aria-hidden="true"
                          />
                        </MenuButton>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-stone-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {countries
                              .filter((country) => allowedCountries.includes(country.name))
                              .map(({ name, flags, countryCallingCode }, index) => {
                                return (
                                  <MenuItem key={index}>
                                    <button
                                      type="button"
                                      className="inline-flex w-full px-2 px-4 py-1 text-sm text-stone-700 transition duration-300 hover:bg-stone-600 hover:text-white dark:text-stone-200 dark:transition"
                                      role="menuitem"
                                      onClick={() => {
                                        setSelectedCountryCode({
                                          name: name,
                                          flagUrl: flags.svg,
                                          countryCode: countryCallingCode,
                                        })
                                      }}>
                                      <div className="inline-flex items-center text-white">
                                        <img
                                          src={flags.svg}
                                          alt={name}
                                          className="mr-2 h-5 w-5 rounded-full object-cover"
                                        />{' '}
                                        {name} <span className="ml-2">{countryCallingCode}</span>
                                      </div>
                                    </button>
                                  </MenuItem>
                                )
                              })}
                          </div>
                        </MenuItems>
                      </Transition>
                    </Menu>
                    <div className="relative mt-1.5 w-full">
                      <input
                        type="number"
                        name="contact"
                        id="contact"
                        value={contact}
                        onChange={handleContactChange}
                        className="block w-full rounded-e-md border-0 px-2 py-1 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                        placeholder="812-345-6789"
                        required
                      />
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-red-600">
                    {contact === '' && isSubmit ? errorEmptyMessage : ''}
                  </p>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-stone-900">
                    {t('commonCity')}
                    <span className="text-red-600">*</span>
                  </label>
                  <Menu
                    as="div"
                    className="relative mt-2 inline-block w-full text-left">
                    <div>
                      <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 transition duration-300 hover:bg-stone-50">
                        {city}
                        <ChevronDownIcon
                          className="-mr-1 h-5 w-5 text-stone-400"
                          aria-hidden="true"
                        />
                      </MenuButton>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {listCity.map((city) => (
                            <MenuItem key={city}>
                              {({ active }) => (
                                <a
                                  onClick={() => {
                                    setCity(city)
                                  }}
                                  className={classNames(
                                    active ? 'bg-stone-100 text-stone-900' : 'text-stone-700',
                                    'block cursor-pointer px-4 py-2 text-sm'
                                  )}>
                                  {city}
                                </a>
                              )}
                            </MenuItem>
                          ))}
                        </div>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-stone-900">
                    {t('commonCountry')}
                    <span className="text-red-600">*</span>
                  </label>
                  <Menu
                    as="div"
                    className="relative mt-2 inline-block w-full text-left">
                    <div>
                      <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 transition duration-300 hover:bg-stone-50">
                        {country}
                        <ChevronDownIcon
                          className="-mr-1 h-5 w-5 text-stone-400"
                          aria-hidden="true"
                        />
                      </MenuButton>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {allowedCountries.map((country) => (
                            <MenuItem key={country}>
                              {({ active }) => (
                                <a
                                  onClick={() => {
                                    setCountry(country)
                                  }}
                                  className={classNames(
                                    active ? 'bg-stone-100 text-stone-900' : 'text-stone-700',
                                    'block cursor-pointer px-4 py-2 text-sm'
                                  )}>
                                  {country}
                                </a>
                              )}
                            </MenuItem>
                          ))}
                        </div>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-stone-900">
                    Height (cm)<span className="text-red-600">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="height"
                      id="height"
                      value={height}
                      onChange={handleHeightChange}
                      required
                      className="block w-full rounded-md border-0 px-2 py-1 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="mt-1 text-sm text-red-600">
                    {height === '' && isSubmit ? errorEmptyMessage : ''}
                  </p>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-stone-900">
                    Weight (kg)<span className="text-red-600">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="weight"
                      id="weight"
                      value={weight}
                      onChange={handleWeightChange}
                      required
                      className="block w-full rounded-md border-0 px-2 py-1 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="mt-1 text-sm text-red-600">
                    {weight === '' && isSubmit ? errorEmptyMessage : ''}
                  </p>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-stone-900">
                    Shoes (EU)
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="shoes"
                      id="shoes"
                      value={shoes}
                      onChange={handleShoesChange}
                      className="block w-full rounded-md border-0 px-2 py-1 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-stone-900">
                    Shirt Size<span className="text-red-600">*</span>
                  </label>
                  <Menu
                    as="div"
                    className="relative mt-2 inline-block w-full text-left">
                    <div>
                      <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 transition duration-300 hover:bg-stone-50">
                        {shirt}
                        <ChevronDownIcon
                          className="-mr-1 h-5 w-5 text-stone-400"
                          aria-hidden="true"
                        />
                      </MenuButton>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {listShirtSize.map((shirt) => (
                            <MenuItem key={shirt}>
                              {({ active }) => (
                                <a
                                  onClick={() => {
                                    setShirt(shirt)
                                  }}
                                  className={classNames(
                                    active ? 'bg-stone-100 text-stone-900' : 'text-stone-700',
                                    'block cursor-pointer px-4 py-2 text-sm'
                                  )}>
                                  {shirt}
                                </a>
                              )}
                            </MenuItem>
                          ))}
                        </div>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-stone-900">
                    {t('commonEthnic')}
                    <span className="text-red-600">*</span>
                  </label>
                  <Menu
                    as="div"
                    className="relative mt-2 inline-block w-full text-left">
                    <div>
                      <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 transition duration-300 hover:bg-stone-50">
                        {race}
                        <ChevronDownIcon
                          className="-mr-1 h-5 w-5 text-stone-400"
                          aria-hidden="true"
                        />
                      </MenuButton>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {listRace.map((race) => (
                            <MenuItem key={race}>
                              {({ active }) => (
                                <a
                                  onClick={() => {
                                    setRace(race)
                                  }}
                                  className={classNames(
                                    active ? 'bg-stone-100 text-stone-900' : 'text-stone-700',
                                    'block cursor-pointer px-4 py-2 text-sm'
                                  )}>
                                  {race}
                                </a>
                              )}
                            </MenuItem>
                          ))}
                        </div>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-stone-900">
                    {t('commonRole')} (SPG/Model)<span className="text-red-600">*</span>
                  </label>
                  <Menu
                    as="div"
                    className="relative mt-2 inline-block w-full text-left">
                    <div>
                      <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 transition duration-300 hover:bg-stone-50">
                        {role}
                        <ChevronDownIcon
                          className="-mr-1 h-5 w-5 text-stone-400"
                          aria-hidden="true"
                        />
                      </MenuButton>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {listRole.map((role) => (
                            <MenuItem key={role}>
                              {({ active }) => (
                                <a
                                  onClick={() => {
                                    setRole(role)
                                  }}
                                  className={classNames(
                                    active ? 'bg-stone-100 text-stone-900' : 'text-stone-700',
                                    'block cursor-pointer px-4 py-2 text-sm'
                                  )}>
                                  {role}
                                </a>
                              )}
                            </MenuItem>
                          ))}
                        </div>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
                <div className="relative flex flex-col items-start sm:col-span-3">
                  <div className="text-sm font-semibold leading-6">
                    <span
                      id="comments-description"
                      className="text-stone-700">
                      Do you wear hijab?
                    </span>
                  </div>
                  <div>
                    <div className="mt-3 flex flex-row space-x-2">
                      <div
                        onClick={() => setIsWearHijab(true)}
                        className={clsx(
                          'flex h-10 w-24 cursor-pointer items-center justify-center rounded-lg border p-2',
                          isWearHijab ? 'border-rose-500' : 'border-stone-200'
                        )}>
                        <input
                          id="radio-hijab-yes"
                          name="radio-hijab"
                          type="radio"
                          checked={isWearHijab}
                          className="h-4 w-4 border-stone-300 text-rose-600 focus:ring-rose-600"
                          disabled
                        />
                        <label
                          htmlFor="radio-hijab-yes"
                          className="ml-3 block cursor-pointer text-sm font-medium leading-6 text-stone-900">
                          Yes
                        </label>
                      </div>
                      <div
                        onClick={() => setIsWearHijab(false)}
                        className={clsx(
                          'flex h-10 w-24 cursor-pointer items-center justify-center rounded-lg border p-2',
                          !isWearHijab ? 'border-rose-500' : 'border-stone-200'
                        )}>
                        <input
                          id="radio-hijab-no"
                          name="radio-hijab"
                          type="radio"
                          checked={!isWearHijab}
                          className="h-4 w-4 border-stone-300 text-rose-600 focus:ring-rose-600"
                          disabled
                        />
                        <label
                          htmlFor="radio-hijab-no"
                          className="ml-3 block cursor-pointer text-sm font-medium leading-6 text-stone-900">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative flex flex-col items-start sm:col-span-3">
                  <div className="text-sm font-semibold leading-6">
                    <span
                      id="comments-description"
                      className="text-stone-700">
                      Do you have any tattoos?
                    </span>
                  </div>
                  <div>
                    <div className="mt-3 flex flex-row space-x-2">
                      <div
                        onClick={() => setHasTattoo(true)}
                        className={clsx(
                          'flex h-10 w-24 cursor-pointer items-center justify-center rounded-lg border p-2',
                          hasTattoo ? 'border-rose-500' : 'border-stone-200'
                        )}>
                        <input
                          id="radio-tattoo-yes"
                          name="radio-tattoo"
                          type="radio"
                          checked={hasTattoo}
                          className="h-4 w-4 border-stone-300 text-rose-600 focus:ring-rose-600"
                          disabled
                        />
                        <label
                          htmlFor="radio-tattoo-yes"
                          className="ml-3 block cursor-pointer text-sm font-medium leading-6 text-stone-900">
                          Yes
                        </label>
                      </div>
                      <div
                        onClick={() => setHasTattoo(false)}
                        className={clsx(
                          'flex h-10 w-24 cursor-pointer items-center justify-center rounded-lg border p-2',
                          !hasTattoo ? 'border-rose-500' : 'border-stone-200'
                        )}>
                        <input
                          id="radio-tattoo-no"
                          name="radio-tattoo"
                          type="radio"
                          checked={!hasTattoo}
                          className="h-4 w-4 border-stone-300 text-rose-600 focus:ring-rose-600"
                          disabled
                        />
                        <label
                          htmlFor="radio-tattoo-no"
                          className="ml-3 block cursor-pointer text-sm font-medium leading-6 text-stone-900">
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  {hasTattoo ? (
                    <div className="mt-4 text-left sm:col-span-12">
                      <label
                        htmlFor="name"
                        className="block text-sm text-stone-900">
                        Is it visible and where is it located?
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="tattooLocation"
                          id="tattooLocation"
                          value={tattooLocation}
                          onChange={handleTattooLocationChange}
                          required
                          className="block w-full rounded-md border-0 px-2 py-1 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>

                <div className="sm:col-span-3">
                  <Accordion
                    key={accordions[0].key}
                    title={accordions[0].title}
                    data={accordions[0].data}
                    isOpen={accordions[0].isOpen}
                    child={checkbox(
                      experiences,
                      handleChangeEventCheckbox,
                      handleCustomEventChange,
                      experienceCheckedItems,
                      'Event Experiences',
                      customEventText
                    )}
                    toggleAccordion={() => toggleAccordion(accordions[0].key)}
                  />
                </div>

                <div className="sm:col-span-3">
                  <Accordion
                    key={accordions[1].key}
                    title={accordions[1].title}
                    data={accordions[1].data}
                    isOpen={accordions[1].isOpen}
                    child={checkbox(
                      brands,
                      handleChangeBrandCheckbox,
                      handleCustomBrandChange,
                      brandCheckedItems,
                      'Brand Experiences',
                      customBrandText
                    )}
                    toggleAccordion={() => toggleAccordion(accordions[1].key)}
                  />
                </div>

                <div className="mt-8 sm:col-span-3">
                  <Accordion
                    key={accordions[2].key}
                    title={accordions[2].title}
                    data={accordions[2].data}
                    isOpen={accordions[2].isOpen}
                    child={checkbox(
                      languages,
                      handleChangeLanguageCheckbox,
                      handleCustomLanguageChange,
                      languageCheckedItems,
                      'Languages',
                      customLanguageText
                    )}
                    toggleAccordion={() => toggleAccordion(accordions[2].key)}
                  />
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-stone-900">
                    Years of Experience<span className="text-red-600">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="yoe"
                      id="yoe"
                      value={yoe}
                      onChange={handleYoeChange}
                      min="0"
                      max="60"
                      required
                      className="block w-full rounded-md border-0 px-2 py-1 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="mt-1 text-sm text-red-600">
                    {yoe === '' && isSubmit ? errorEmptyMessage : ''}
                  </p>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-stone-900">
                    Per Day Earnings
                    <span className="text-red-600">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="salary"
                      id="salary"
                      value={salary}
                      onChange={handleSalaryChange}
                      required
                      className="block w-full rounded-md border-0 px-2 py-1 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="mt-1 text-sm text-red-600">
                    {salary === '' && isSubmit ? errorEmptyMessage : ''}
                  </p>
                </div>

                {/* <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-stone-900">
                    Current Fee as SPG (0 if you are not SPG)
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="SPG"
                      id="SPG"
                      value={roleFee.SPG}
                      onChange={handleRoleFeeChange}
                      required
                      className="block w-full rounded-md border-0 px-2 py-1 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-stone-900">
                    Current Fee as Usher (0 if you are not Usher)
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="USHER"
                      id="USHER"
                      value={roleFee.USHER}
                      onChange={handleRoleFeeChange}
                      required
                      className="block w-full rounded-md border-0 px-2 py-1 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-stone-900">
                    Current Fee as Runner (0 if you are not Runner)
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="RUNNER"
                      id="RUNNER"
                      value={roleFee.RUNNER}
                      onChange={handleRoleFeeChange}
                      required
                      className="block w-full rounded-md border-0 px-2 py-1 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div> */}

                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-stone-900">
                    Salary Currency<span className="text-red-600">*</span>
                  </label>
                  <Menu
                    as="div"
                    className="relative mt-2 inline-block w-full text-left">
                    <div>
                      <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 transition duration-300 hover:bg-stone-50">
                        {currency}
                        <ChevronDownIcon
                          className="-mr-1 h-5 w-5 text-stone-400"
                          aria-hidden="true"
                        />
                      </MenuButton>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {listCurrency.map((currency) => (
                            <MenuItem key={currency}>
                              {({ active }) => (
                                <a
                                  onClick={() => {
                                    setCurrency(currency)
                                  }}
                                  className={classNames(
                                    active ? 'bg-stone-100 text-stone-900' : 'text-stone-700',
                                    'block cursor-pointer px-4 py-2 text-sm'
                                  )}>
                                  {currency}
                                </a>
                              )}
                            </MenuItem>
                          ))}
                        </div>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>

                <div className="mb-2 mt-6 block text-sm font-medium text-rose-600 sm:col-span-6">
                  Please upload your latest and clear photos without any effects or filters,
                  following the provided template:
                </div>

                <div className="sm:col-span-3">
                  <label
                    className="mb-2 block text-sm font-medium text-stone-900"
                    htmlFor="company-logo-input">
                    Close Up Photo<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="block w-full cursor-pointer rounded-lg border border-stone-300 bg-stone-50 text-sm text-stone-900 focus:outline-none"
                    id="photo1"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handlePhoto1Change}
                  />
                  <p
                    className="mt-1 text-sm text-stone-500"
                    id="file_input_help">
                    PNG, JPG or JPEG (Max 1 MB 3:4 Ratio).{' '}
                    <span className="text-red-600">
                      {photo1[1] !== ''
                        ? photo1[1]
                        : !photo1[0] && isSubmit
                          ? errorEmptyMessage
                          : ''}
                    </span>
                  </p>
                  <img
                    id="pp-preview-1"
                    className={'mt-2 h-48 w-36 rounded-lg object-cover sm:col-span-6'}
                    src={
                      photo1[0]
                        ? photo1[0].toString().includes('http')
                          ? photo1[0]
                          : URL.createObjectURL(photo1[0])
                        : '/images/spg-example-1-close-up.jpg'
                    }
                    alt="image description"></img>
                </div>

                <div className="sm:col-span-3">
                  <label
                    className="mb-2 block text-sm font-medium text-stone-900"
                    htmlFor="company-logo-input">
                    Half Body Photo<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="block w-full cursor-pointer rounded-lg border border-stone-300 bg-stone-50 text-sm text-stone-900 focus:outline-none"
                    id="photo2"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handlePhoto2Change}
                  />
                  <p
                    className="mt-1 text-sm text-stone-500"
                    id="file_input_help">
                    PNG, JPG or JPEG (Max 1 MB 3:4 Ratio).{' '}
                    <span className="text-red-600">
                      {photo2[1] !== ''
                        ? photo2[1]
                        : !photo2[0] && isSubmit
                          ? errorEmptyMessage
                          : ''}
                    </span>
                  </p>
                  <img
                    id="pp-preview-2"
                    className={'mt-2 h-48 w-36 rounded-lg object-cover sm:col-span-6'}
                    src={
                      photo2[0]
                        ? photo2[0].toString().includes('http')
                          ? photo2[0]
                          : URL.createObjectURL(photo2[0])
                        : '/images/spg-example-2-half-body.jpg'
                    }
                    alt="image description"></img>
                </div>

                <div className="sm:col-span-3">
                  <label
                    className="mb-2 block text-sm font-medium text-stone-900"
                    htmlFor="company-logo-input">
                    Full Body Photo<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="block w-full cursor-pointer rounded-lg border border-stone-300 bg-stone-50 text-sm text-stone-900 focus:outline-none"
                    id="photo3"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handlePhoto3Change}
                  />
                  <p
                    className="mt-1 text-sm text-stone-500"
                    id="file_input_help">
                    PNG, JPG or JPEG (Max 1 MB 3:4 Ratio).{' '}
                    <span className="text-red-600">
                      {photo3[1] !== ''
                        ? photo3[1]
                        : !photo3[0] && isSubmit
                          ? errorEmptyMessage
                          : ''}
                    </span>
                  </p>
                  <img
                    id="pp-preview-3"
                    className={'mt-2 h-48 w-36 rounded-lg object-cover sm:col-span-6'}
                    src={
                      photo3[0]
                        ? photo3[0].toString().includes('http')
                          ? photo3[0]
                          : URL.createObjectURL(photo3[0])
                        : '/images/spg-example-3-full-body.jpeg'
                    }
                    alt="image description"></img>
                </div>

                <div className="sm:col-span-3">
                  <label
                    className="mb-2 block text-sm font-medium text-stone-900"
                    htmlFor="company-logo-input">
                    Casual Photo<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="block w-full cursor-pointer rounded-lg border border-stone-300 bg-stone-50 text-sm text-stone-900 focus:outline-none"
                    id="photo4"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handlePhoto4Change}
                  />
                  <p
                    className="mt-1 text-sm text-stone-500"
                    id="file_input_help">
                    PNG, JPG or JPEG (Max 1 MB 3:4 Ratio).{' '}
                    <span className="text-red-600">
                      {photo4[1] !== ''
                        ? photo4[1]
                        : !photo4[0] && isSubmit
                          ? errorEmptyMessage
                          : ''}
                    </span>
                  </p>
                  <img
                    id="pp-preview-4"
                    className={'mt-2 h-48 w-36 rounded-lg object-cover sm:col-span-6'}
                    src={
                      photo4[0]
                        ? photo4[0].toString().includes('http')
                          ? photo4[0]
                          : URL.createObjectURL(photo4[0])
                        : '/images/spg-example-4-casual-photo.jpeg'
                    }
                    alt="image description"></img>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-stone-900">
                    Self Intro Video Url (Optional)
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="introVideoUrl"
                      id="introVideoUrl"
                      value={introVideoUrl}
                      onChange={handleIntroVideoUrlChange}
                      required
                      className="block w-full rounded-md border-0 px-2 py-1 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="mt-1 text-sm text-rose-600">
                    Url Video Example:
                    https://www.youtube.com/watch?v=Hcc6PS_UQC0&ab_channel=TalentvisOfficial
                  </p>
                  <p className="mt-1 text-sm text-red-600">
                    {introVideoUrl !== '' && getYoutubeVideoEmbed(introVideoUrl) == ''
                      ? 'Invalid youtube url'
                      : ''}
                  </p>
                  <iframe
                    src={getYoutubeVideoEmbed(introVideoUrl)}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className={`mt-4 aspect-video w-full ${
                      getYoutubeVideoEmbed(introVideoUrl) === '' ? 'hidden' : ''
                    }`}></iframe>
                </div>
              </div>
              <fieldset className="pt-12">
                <div className="relative flex items-start pt-8">
                  <div className="flex h-6 items-center">
                    <input
                      id="isTncChecked"
                      aria-describedby="offers-description"
                      name="isTncChecked"
                      type="checkbox"
                      checked={isTncChecked}
                      onChange={handleTncChecked}
                      className="h-5 w-5 rounded border-stone-300 text-rose-600 focus:border-transparent focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div className="ml-3 text-base leading-6 text-stone-700">
                    I have read and agree to Talentvis{' '}
                    <a
                      href="/docs/talentvis-spg-tnc.pdf"
                      className="cursor-pointer font-medium text-rose-500"
                      target="_blank">
                      Terms & Conditions
                    </a>{' '}
                    and{' '}
                    <a
                      href="/docs/talentvis-spg-privacy-policy.pdf"
                      className="cursor-pointer font-medium text-rose-500"
                      target="_blank">
                      Privacy Policy
                    </a>
                    <span className="text-red-600">*</span>
                  </div>
                </div>
              </fieldset>
              <div>
                <button
                  type="submit"
                  className="mt-4 flex w-full justify-center rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm transition duration-300 hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 disabled:bg-slate-50 disabled:text-slate-500"
                  disabled={!isTncChecked}
                  onClick={handleSubmit}>
                  {t('commonSubmit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="mb-24 flex min-h-full flex-1 flex-col justify-center sm:mb-0 sm:px-6 sm:py-6 lg:px-8">
          <div className="m-auto max-w-xl bg-white text-center shadow-sm sm:border sm:border-stone-900 sm:p-4">
            <p className="text-xl font-bold text-stone-900 sm:text-3xl md:text-4xl">
              {profileData?.fullName ? profileData.fullName.split(' ')[0] : ''}
            </p>
            <p className="mt-2 text-sm text-rose-600 md:text-base">{profileData?.code ?? ''}</p>
            <div className="mt-1 grid grid-cols-2 items-center justify-center text-left text-xs sm:flex sm:text-center sm:text-sm md:text-base">
              {textItemSmall(t('commonBirthYear'), profileData?.dob ?? '')}
              {textItemSmall(t('commonWeight'), profileData?.weightKg ?? '' + ' kg')}
              {textItemSmall(t('commonHeight'), profileData?.heightCm ?? '' + ' cm')}
              {textItemSmall(t('commonLocation'), profileData?.city ?? '')}
            </div>
            <div className="mt-4 grid w-full grid-cols-2 gap-x-4 gap-y-4">
              {profileData?.profilePicture
                ? profileData?.profilePicture.map((val) => (
                    <img
                      key={val}
                      src={val}
                      className="object-fill object-center"
                    />
                  ))
                : ''}
            </div>
            <div className="my-4 flex justify-between text-center text-lg">
              <img
                src="/images/marketingo-logo.png"
                className="w-12 sm:w-28"></img>
              <div className="my-auto text-sm font-light text-rose-600 sm:text-base">
                Sales Promotion Staffing Solution
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="mx-auto mt-4 flex w-48 justify-center rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm transition duration-300 hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 sm:mt-12"
              onClick={() => {
                setIsUpdateProfile(true)
              }}>
              Update Profile
            </button>
          </div>
        </div>
      )}
    </>
  )
}
