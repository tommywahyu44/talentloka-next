'use client'

import { textItem, textItemSmall } from '@/lib/components.jsx'
import { lottieFiles } from '@/lib/constants'
import { classNames } from '@/lib/helpers'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import axios from 'axios'
import download from 'downloadjs'
import * as htmlToImage from 'html-to-image'
import { useTranslations } from 'next-intl'
import Swal from 'sweetalert2'

import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/20/solid'
import {
  CakeIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  UserPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { UserIcon } from '@heroicons/react/24/solid'
import { getDatabase, onValue, ref } from 'firebase/database'
import { Badge, Button, Modal } from 'flowbite-react'
import { Fragment, useEffect, useState } from 'react'

import '@/styles/cards.css'

var listSpg = []
var listData = []
var selectedFilter = ['Female', 'All', 'Indonesia', 'All', 'All']
var selectedSort = { value: 'code', type: 'asc' }

export default function FiltersInfluencer({ email, listInitFavorites }) {
  const t = useTranslations('default')
  const sortOptions = [
    { name: 'Code (A-Z)', href: '', value: 'code', type: 'asc' },
    { name: 'Code (Z-A)', href: '', value: 'code', type: 'desc' },
    { name: 'Name (A-Z)', href: '', value: 'name', type: 'asc' },
    { name: 'Name (Z-A)', href: '', value: 'name', type: 'desc' },
    { name: 'Height (A-Z)', href: '#', value: 'heightCm', type: 'asc' },
    { name: 'Height (Z-A)', href: '', value: 'heightCm', type: 'desc' },
    { name: 'Weight (A-Z)', href: '', value: 'weightKg', type: 'asc' },
    { name: 'Weight (Z-A)', href: '', value: 'weightKg', type: 'desc' },
    { name: 'Date of Birth (A-Z)', href: '', value: 'dobYear', type: 'asc' },
    { name: 'Date of Birth (Z-A)', href: '', value: 'dobYear', type: 'desc' },
    { name: 'Industry (A-Z)', href: '', value: 'brands', type: 'asc' },
    { name: 'Industry (Z-A)', href: '', value: 'brands', type: 'desc' },
    { name: 'Product Field (A-Z)', href: '', value: 'events', type: 'asc' },
    { name: 'Product Field (Z-A)', href: '', value: 'events', type: 'desc' },
    {
      name: 'Average Fee (A-Z)',
      href: '',
      value: 'previousSalaryAmount',
      type: 'asc',
    },
    {
      name: 'Average Fee (Z-A)',
      href: '',
      value: 'previousSalaryAmount',
      type: 'desc',
    },
  ]

  const filters = [
    {
      id: 'gender',
      name: t('commonGender'),
      options: [
        { value: 'All', label: 'All', checked: false },
        { value: 'Female', label: t('commonFemale'), checked: true },
        { value: 'Male', label: t('commonMale'), checked: false },
      ],
    },
    {
      id: 'race',
      name: t('commonEthnic'),
      options: [
        { value: 'All', label: 'All', checked: true },
        { value: 'Indonesian', label: 'Indonesian', checked: false },
        { value: 'Chinese', label: 'Indonesian - Chinese', checked: false },
      ],
    },
    {
      id: 'country',
      name: t('commonCountry'),
      options: [
        { value: 'All', label: 'All', checked: false },
        { value: 'Indonesia', label: 'Indonesia', checked: true },
        { value: 'Singapore', label: 'Singapore', checked: false },
        { value: 'Malaysia', label: 'Malaysia', checked: false },
        { value: 'Vietnam', label: 'Vietnam', checked: false },
        { value: 'Thailand', label: 'Thailand', checked: false },
      ],
    },
    {
      id: 'industry',
      name: t('commonIndustry'),
      options: [
        { value: 'All', label: 'All', checked: true },
        { value: 'Automotive', label: 'Automotive', checked: false },
        { value: 'Bank', label: 'Bank', checked: false },
        { value: 'Baby / kids care', label: 'Baby / kids care', checked: false },
        { value: 'Beauty tools', label: 'Beauty tools', checked: false },
        { value: 'Fashion', label: 'Fashion', checked: false },
        { value: 'Education', label: 'Education', checked: false },
        {
          value: 'Food and beverages',
          label: 'Food and beverages',
          checked: false,
        },
        { value: 'Furniture', label: 'Furniture', checked: false },
        { value: 'Franchise', label: 'Franchise', checked: false },
        { value: 'Haircare', label: 'Haircare', checked: false },
        { value: 'Homecare', label: 'Homecare', checked: false },
        { value: 'Jewelry', label: 'Jewelry', checked: false },
        { value: 'Make up', label: 'Make up', checked: false },
        {
          value: 'Manufacturing goods',
          label: 'Manufacturing goods',
          checked: false,
        },
        {
          value: 'Medicine / healthcare',
          label: 'Medicine / healthcare',
          checked: false,
        },
        { value: 'Perfume', label: 'Perfume', checked: false },
        { value: 'Skincare', label: 'Skincare', checked: false },
        { value: 'Sports', label: 'Sports', checked: false },
        { value: 'Technology', label: 'Technology', checked: false },
        {
          value: 'Tobacco / cigarettes',
          label: 'Tobacco / cigarettes',
          checked: false,
        },
        { value: 'Watches', label: 'Watches', checked: false },
        { value: 'Wedding expo', label: 'Wedding expo', checked: false },
      ],
    },
    {
      id: 'product',
      name: t('commonProductField'),
      options: [
        { value: 'All', label: 'All', checked: true },
        { value: 'Bazaar', label: 'Bazaar', checked: false },
        {
          value: 'Company Events / Expo / Exhibition',
          label: 'Company Events / Expo / Exhibition',
          checked: false,
        },
        {
          value: 'Company Gathering',
          label: 'Company Gathering',
          checked: false,
        },
        { value: 'Conference', label: 'Conference', checked: false },
        { value: 'Exhibition', label: 'Exhibition', checked: false },
        { value: 'Fair', label: 'Fair', checked: false },
        { value: 'Fashion Week', label: 'Fashion Week', checked: false },
        { value: 'Festival', label: 'Festival', checked: false },
        { value: 'Party Event', label: 'Party Event', checked: false },
        {
          value: 'Product Launching',
          label: 'Product Launching',
          checked: false,
        },
        { value: 'Seminar', label: 'Seminar', checked: false },
      ],
    },
  ]

  const cardEntity = [
    '',
    {
      city: 'BALI',
      confirmed: true,
      country: 'Indonesia',
      dob: '1992',
      dobYear: 1992,
      gender: 'Male',
      heightCm: 177,
      name: 'Prasetiansyah',
      notes: '',
      profilePicture: [
        'https://firebasestorage.googleapis.com/v0/b/hireplace.appspot.com/o/promotor_spg%2FBL00001-PP-1.png?alt=media&token=47707dcf-cae2-4ae9-bb76-386b6a08f6a6',
        'https://firebasestorage.googleapis.com/v0/b/hireplace.appspot.com/o/promotor_spg%2FBL00001-PP-2.png?alt=media&token=d4c1c5af-274c-42f6-9d96-d2e9eaa4e4f5',
        'https://firebasestorage.googleapis.com/v0/b/hireplace.appspot.com/o/promotor_spg%2FBL00001-PP-3.png?alt=media&token=85744712-1204-40c7-9579-90a8cc7f95c4',
        'https://firebasestorage.googleapis.com/v0/b/hireplace.appspot.com/o/promotor_spg%2FBL00001-PP-4.png?alt=media&token=45ce4406-7e91-4a5c-9b2e-8d8ddfdec9c5',
      ],
      race: 'Indonesian',
      shirt: '',
      shoesEU: '',
      role: 'SPG',
      weightKg: 70,
      brands: [],
      events: [],
      hasTattoo: false,
      tattooLocation: '',
      isWearHijab: false,
      introVideoUrl: '',
      previousSalaryAmount: 0,
      previousSalaryCurrency: '',
    },
  ]

  function downloadCompCard(code) {
    const captureElement = document.querySelector('#capture') // Select the element you want to capture. Select the <body> element to capture full page.
    htmlToImage.toPng(captureElement).then(function (dataUrl) {
      download(dataUrl, `${code}.png`)
    })
  }

  const [isShowExperience, setShowExperience] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [queryResults, setQueryResults] = useState([])
  const [openModal, setOpenModal] = useState(cardEntity)
  const [listIndex, setListIndex] = useState(0)
  const [listFavorites, setFavorite] = useState(listInitFavorites)
  const [loading, setLoading] = useState(false)

  const handleFilterChange = (event) => {
    const { value: value, name: name } = event.target
    if (name == 'gender') {
      selectedFilter[0] = value
    } else if (name == 'race') {
      selectedFilter[1] = value
    } else if (name == 'country') {
      selectedFilter[2] = value
    } else if (name == 'industry') {
      selectedFilter[3] = value
    } else if (name == 'product') {
      selectedFilter[4] = value
    }
    setListIndex(0)
    updateDataCards(
      selectedFilter[0],
      selectedFilter[1],
      selectedFilter[2],
      selectedFilter[3],
      selectedFilter[4]
    )
  }

  function handleSortChange(value, type) {
    selectedSort.value = value
    selectedSort.type = type
    setListIndex(0)
    updateDataCards(
      selectedFilter[0],
      selectedFilter[1],
      selectedFilter[2],
      selectedFilter[3],
      selectedFilter[4]
    )
  }

  function updateRemovedFavorited(newFavorited) {
    const data = { email: email, favorited: newFavorited.join() }
    axios
      .post('https://asia-southeast1-talentloka-35463.cloudfunctions.net/createEvent', data)
      .then(() => {})
      .catch((err) => {
        console.log('err ', err)
      })
  }

  function updateFavorited() {
    const data = { email: email, favorited: listFavorites.join() }
    Swal.showLoading()
    axios
      .post('https://asia-southeast1-talentloka-35463.cloudfunctions.net/createEvent', data)
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

  function sortByNumber(a, b) {
    return selectedSort.type === 'asc'
      ? a[1][selectedSort.value] - b[1][selectedSort.value]
      : b[1][selectedSort.value] - a[1][selectedSort.value]
  }

  function sortByString(a, b) {
    return selectedSort.type === 'asc'
      ? a[1][selectedSort.value].localeCompare(b[1][selectedSort.value])
      : b[1][selectedSort.value].localeCompare(a[1][selectedSort.value])
  }

  function sortByArray(a, b) {
    return selectedSort.type === 'asc'
      ? a[1][selectedSort.value][0].localeCompare(b[1][selectedSort.value][0])
      : b[1][selectedSort.value][0].localeCompare(a[1][selectedSort.value][0])
  }

  function sortByCode(a, b) {
    return selectedSort.type === 'asc' ? a[0].localeCompare(b[0]) : b[0].localeCompare(a[0])
  }

  const updateDataCards = async (gender, race, country, industry, product) => {
    var filter = {
      gender: gender,
      race: race,
      country: country,
      brands: industry,
      events: product,
    }

    var filteredData = listSpg.filter((item) => {
      for (var key in filter) {
        if (
          (item[1][key] === undefined || !item[1][key].includes(filter[key])) &&
          filter[key] !== 'All'
        )
          return false
      }
      return true
    })

    if (filteredData.length > 0) {
      if (selectedSort.value === 'code') {
        filteredData.sort(sortByCode)
      } else if (selectedSort.value === 'name') {
        filteredData.sort(sortByString)
      } else if (selectedSort.value === 'brands' || selectedSort.value === 'events') {
        filteredData.sort(sortByArray)
      } else {
        filteredData.sort(sortByNumber)
      }
      const maxPage = Math.ceil(filteredData.length / 100)
      listData = []
      for (let i = 1; i <= maxPage; i++) {
        listData.push(
          filteredData.slice(i * 100 - 100, i == maxPage ? filteredData.length : i * 100)
        )
      }
      setQueryResults(listData[0])
    } else {
      setQueryResults([])
    }
    setLoading(false)
  }

  const fetchDataCards = async (gender, city, race, country, role, industry, product) => {
    setLoading(true)

    const db = getDatabase()
    const spgRef = ref(db, 'promotor_influencer/')
    onValue(spgRef, (snapshot) => {
      const data = snapshot.val()
      if (data && listSpg.length === 0) {
        listSpg = Object.entries(data)
        updateDataCards(gender, city, race, country, role, industry, product)
      }
    })
  }

  //run hook useEffect
  useEffect(() => {
    //call method "fetchDatacards"
    fetchDataCards(
      selectedFilter[0],
      selectedFilter[1],
      selectedFilter[2],
      selectedFilter[3],
      selectedFilter[4]
    )
  }, [])

  return (
    <div>
      <div>
        {/* Mobile filter dialog */}
        <Transition
          show={mobileFiltersOpen}
          as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}>
            <TransitionChild
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div className="fixed inset-0 z-40 flex">
              <TransitionChild
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full">
                <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="font-display text-lg font-medium text-slate-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-slate-400"
                      onClick={() => setMobileFiltersOpen(false)}>
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-slate-200">
                    <h3 className="sr-only">Categories</h3>
                    {filters.map((section, index) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-slate-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-slate-400 transition duration-300 hover:text-rose-500">
                                <span className="font-medium text-slate-900">{section.name}</span>
                                <span className="font-medium text-rose-600">
                                  {selectedFilter[index]}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </DisclosureButton>
                            </h3>
                            <DisclosurePanel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center outline-none focus:outline-none">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      onChange={handleFilterChange}
                                      className="h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-0"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-slate-500">
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                    {listFavorites.length > 0 ? (
                      <div className="ml-4">
                        <h3 className="mb-2 mt-4 flow-root">
                          <span className="text-base font-medium text-slate-900">Hired</span>
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {listFavorites.map((fav) => (
                            <Badge
                              key={fav}
                              className="cursor-pointer bg-pink-50 pr-2 text-rose-600"
                              icon={XMarkIcon}
                              onClick={() => {
                                var newFavorited = listFavorites.filter((e) => e !== fav)
                                updateRemovedFavorited(newFavorited)
                                setFavorite([...newFavorited])
                              }}>
                              {fav}
                            </Badge>
                          ))}
                        </div>
                        <a
                          onClick={updateFavorited}
                          type="button"
                          className="mt-8 inline-flex cursor-pointer items-center gap-x-2 rounded-md bg-rose-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-300 hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
                          <CheckCircleIcon
                            className="-ml-0.5 h-5 w-5"
                            aria-hidden="true"
                          />
                          SUBMIT!
                        </a>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        <main className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-slate-200 pb-6 pt-8">
            <h1 className="mr-4 text-xl font-bold tracking-tight text-slate-900 md:text-4xl">
              <span className="text-rose-600">Meet</span> Our Influencers
            </h1>
          </div>

          <section
            aria-labelledby="products-heading"
            className="pb-16 pt-6">
            <div className="flex items-center">
              <Menu
                as="div"
                className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-slate-700 transition duration-300 hover:text-rose-600">
                    Sort
                    <ChevronDownIcon
                      className="group-transition -mr-1 ml-1 h-5 w-5 flex-shrink-0 text-slate-400 duration-300 hover:text-rose-500"
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
                  <MenuItems className="absolute left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          {({ active }) => (
                            <a
                              className={classNames(
                                option.value == selectedSort.value &&
                                  option.type == selectedSort.type
                                  ? 'font-medium text-slate-900'
                                  : 'text-slate-500',
                                active ? 'bg-slate-100' : '',
                                'block cursor-pointer px-4 py-2 text-sm transition duration-300 hover:bg-rose-50 hover:text-rose-600'
                              )}
                              onClick={() => handleSortChange(option.value, option.type)}>
                              {option.name}
                            </a>
                          )}
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-slate-400 transition duration-300 hover:text-rose-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}>
                <span className="sr-only">Filters</span>
                <FunnelIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                {filters.map((section, index) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-slate-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-slate-400 transition duration-300 hover:text-rose-500">
                            <span className="font-medium text-slate-900">{section.name}</span>

                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <div className="flex">
                                  <span className="mr-2 font-medium text-rose-600">
                                    {selectedFilter[index]}
                                  </span>
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </div>
                              )}
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center outline-none focus:outline-none">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}`}
                                  defaultValue={option.value}
                                  type="radio"
                                  defaultChecked={option.value == selectedFilter[index]}
                                  onChange={handleFilterChange}
                                  className="h-4 w-4 rounded border-slate-300 text-rose-600 outline-none focus:ring-0"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-slate-600">
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                ))}
                {listFavorites.length > 0 ? (
                  <div>
                    <h3 className="mb-2 mt-4 flow-root">
                      <span className="text-sm font-medium text-slate-900">Hired</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {listFavorites.map((fav) => (
                        <Badge
                          key={fav}
                          className="cursor-pointer bg-pink-50 pr-2 text-rose-600"
                          icon={XMarkIcon}
                          onClick={() => {
                            var newFavorited = listFavorites.filter((e) => e !== fav)
                            updateRemovedFavorited(newFavorited)
                            setFavorite([...newFavorited])
                          }}>
                          {fav}
                        </Badge>
                      ))}
                    </div>
                    <a
                      onClick={updateFavorited}
                      type="button"
                      className="cursor-pointer items-center mt-8 inline-flex gap-x-2 rounded-md bg-rose-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-300 hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
                      <CheckCircleIcon
                        className="-ml-0.5 h-5 w-5"
                        aria-hidden="true"
                      />
                      SUBMIT!
                    </a>
                  </div>
                ) : (
                  <div></div>
                )}
              </form>
              <div className="lg:col-span-3">
                <div className="o">
                  <section className="section-cards overflow-auto">
                    {loading ? (
                      <DotLottieReact
                        src={lottieFiles.loading}
                        loop
                        autoplay
                      />
                    ) : queryResults.length > 0 ? (
                      queryResults.map((card, index) => (
                        <div
                          className="card-item my-4 mr-2"
                          key={index}>
                          {listFavorites.includes(card[0]) ? (
                            <UserIcon
                              className="absolute right-2 top-2 z-20 h-6 w-6 cursor-pointer text-white opacity-70 transition duration-300 hover:opacity-100"
                              onClick={() =>
                                setFavorite([...listFavorites.filter((e) => e !== card[0])])
                              }
                            />
                          ) : (
                            <UserPlusIcon
                              className="absolute right-2 top-2 z-20 h-6 w-6 cursor-pointer text-white opacity-70 transition duration-300 hover:opacity-100"
                              onClick={() => {
                                setFavorite([...listFavorites, card[0]])
                                Swal.fire({
                                  text: 'New SPG has been selected',
                                  icon: 'success',
                                  timer: 1000,
                                  showConfirmButton: false,
                                })
                              }}
                            />
                          )}
                          <div
                            className="z-10 grid cursor-pointer grid-cols-12 gap-3"
                            onClick={() => {
                              setOpenModal(card)
                              setTimeout(() => {
                                document.getElementById('scroll-div').scrollTo(0, 0)
                              }, 500)
                            }}>
                            <div className="relative col-span-12">
                              <div className="card-img relative">
                                <img
                                  id="profile-image"
                                  src={
                                    card[1].profilePicture
                                      ? card[1].profilePicture[0]
                                      : '/images/placeholder-pp.webp'
                                  }
                                  className="object-cover"
                                  alt="..."
                                />
                                <div className="absolute bottom-0 left-3">
                                  <div className="flex items-center space-x-3">
                                    <div className="text-sm font-bold text-white">
                                      {card[1].name.replace(/[()]/g, '')}
                                    </div>
                                  </div>
                                  {textItem(
                                    <CakeIcon className="h-5 w-5 text-slate-500" />,
                                    `IG ${card[1].IgFollowers}`
                                  )}
                                  {textItem(
                                    <MapPinIcon className="h-5 w-5 text-slate-500" />,
                                    `Tiktok ${card[1].TiktokFollowers}`
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="card-event-brand z-10 col-span-12">
                              <div className="flex gap-2 overflow-clip">
                                {card[1].events
                                  .filter((e) => e !== '')
                                  .map((event) => (
                                    <Badge
                                      key={event}
                                      className="flex-shrink-0 cursor-pointer pr-2 text-xs text-slate-600">
                                      {event.replace('Others-', '')}
                                    </Badge>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="my-48 text-center">
                        <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-slate-400"></MagnifyingGlassIcon>
                        <h3 className="mt-2 text-sm font-semibold text-slate-900">No results</h3>
                        <p className="mt-1 text-sm text-slate-500">
                          Sorry we can&apos;t find any results for you, please try another filters.
                        </p>
                      </div>
                    )}
                  </section>
                  <Modal
                    dismissible
                    show={openModal[0] != ''}
                    size="2xl"
                    onClose={() => setOpenModal(cardEntity)}>
                    {/* <Modal.Header>
                      <h2 className="font-display text-transparent bg-clip-text bg-gradient-to-br from-rose-600 from-65% via-primary via-90% to-rose-400 font-bold text-3xl">
                        {openModal.fieldsname}
                      </h2>
                    </Modal.Header> */}
                    <Modal.Body
                      id="scroll-div"
                      className="rounded-md bg-white">
                      {isShowExperience ? (
                        <div className="px-4 pb-8">
                          <div className="px-4 sm:px-0">
                            <h3 className="text-base font-semibold leading-7 text-slate-900">
                              {t('dashboardClientTalentDetailsExperienceTitle')}
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                              {t('dashboardClientTalentDetailsExperienceDesc')}
                            </p>
                          </div>
                          <div className="mt-6 border-t border-slate-100">
                            <dl className="divide-y divide-slate-100">
                              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-slate-900">
                                  {t('commonIndustry')}
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-slate-700 sm:col-span-2 sm:mt-0">
                                  <div className="flex flex-wrap gap-2 text-wrap">
                                    {openModal[1].brands
                                      .filter((e) => e !== '')
                                      .map((event) => (
                                        <Badge
                                          key={event}
                                          className="flex-shrink-0 cursor-pointer bg-rose-600 px-2 py-1 text-sm text-white">
                                          {event.replace('Others-', '')}
                                        </Badge>
                                      ))}
                                  </div>
                                </dd>
                              </div>
                              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-slate-900">
                                  {t('commonProductField')}
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-slate-700 sm:col-span-2 sm:mt-0">
                                  <div className="flex flex-wrap gap-2">
                                    {openModal[1].events
                                      .filter((e) => e !== '')
                                      .map((event) => (
                                        <Badge
                                          key={event}
                                          className="flex-shrink-0 cursor-pointer bg-rose-600 px-2 py-1 text-sm text-white">
                                          {event.replace('Others-', '')}
                                        </Badge>
                                      ))}
                                  </div>
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                      ) : (
                        <div
                          id="capture"
                          className="bg-white p-4 text-center">
                          <p className="text-4xl font-bold text-slate-900">
                            {openModal[1].name.replace(/[()]/g, '')}
                          </p>
                          <p className="mt-2 text-base text-rose-600">{openModal[0]}</p>
                          <div className="mt-1 flex items-center justify-center gap-2 text-center text-base">
                            {textItemSmall(t('commonBirthYear'), openModal[1].dob)}
                            {textItemSmall(t('commonWeight'), openModal[1].weightKg + ' kg')}
                            {textItemSmall(t('commonHeight'), openModal[1].heightCm + ' cm')}
                            {textItemSmall(t('commonLocation'), openModal[1].city)}
                          </div>
                          <div className="mt-4 grid w-full grid-cols-2 gap-x-4 gap-y-4">
                            {Object.keys(openModal[1].profilePicture).map((val) => (
                              <img
                                key={val}
                                src={openModal[1].profilePicture[val]}
                                className="img-saturate object-fill object-center"
                              />
                            ))}
                          </div>
                          <div className="my-4 flex justify-between text-center text-lg">
                            <img
                              src="/images/icon-talentloka.png"
                              className="w-28"></img>
                            <div className="my-auto text-base font-light text-rose-600">
                              Sales Promotion Staffing Solution
                            </div>
                          </div>
                        </div>
                      )}
                      {isShowExperience ? (
                        <Button
                          color="gray"
                          onClick={() => setShowExperience(false)}
                          className="border-2 border-rose-600 text-rose-600 enabled:hover:bg-rose-600 enabled:hover:text-white">
                          See Profile
                        </Button>
                      ) : (
                        <div className="mt-4 flex">
                          <Button
                            className="mr-4 bg-rose-500 enabled:hover:bg-rose-600"
                            onClick={() => downloadCompCard(openModal[0])}>
                            Download
                          </Button>
                          <Button
                            color="gray"
                            onClick={() => setShowExperience(true)}
                            className="border-2 border-rose-600 text-rose-600 enabled:hover:bg-rose-600 enabled:hover:text-white">
                            See Experience
                          </Button>
                        </div>
                      )}
                    </Modal.Body>
                  </Modal>
                  <nav className="flex items-center justify-between border-t border-slate-200 px-4 sm:px-0">
                    <div className="hover:text-rose-5000 -mt-px flex w-0 flex-1 transition duration-300">
                      <a
                        onClick={() => {
                          if (listIndex > 0) {
                            setListIndex(listIndex - 1)
                            setQueryResults(listData[listIndex - 1])
                            window.scrollTo(0, 0)
                          }
                        }}
                        className="inline-flex cursor-pointer items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-slate-500 transition duration-300 hover:border-rose-300 hover:text-rose-500">
                        <ArrowLongLeftIcon
                          className="hover:text-rose-5000 mr-3 h-5 w-5 text-slate-400 transition duration-300"
                          aria-hidden="true"
                        />
                        Previous
                      </a>
                    </div>
                    <div className="hidden md:-mt-px md:flex">
                      {listData.map((card, index) => (
                        <a
                          onClick={() => {
                            setListIndex(index)
                            setQueryResults(listData[index])
                            window.scrollTo(0, 0)
                          }}
                          key={index}
                          className={`inline-flex cursor-pointer items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium transition duration-300 hover:border-rose-300 hover:text-rose-500 ${
                            listIndex == index ? 'border-rose-500 text-rose-500' : 'text-slate-500'
                          }`}>
                          {index + 1}
                        </a>
                      ))}
                    </div>
                    <div className="hover:text-rose-5000 -mt-px flex w-0 flex-1 justify-end transition duration-300">
                      <a
                        onClick={() => {
                          if (listIndex < listData.length - 1) {
                            setListIndex(listIndex + 1)
                            setQueryResults(listData[listIndex + 1])
                            window.scrollTo(0, 0)
                          }
                        }}
                        className="inline-flex cursor-pointer items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-slate-500 transition duration-300 hover:border-rose-300 hover:text-rose-500">
                        Next
                        <ArrowLongRightIcon
                          className="hover:text-rose-5000 ml-3 h-5 w-5 text-slate-400 transition duration-300"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
