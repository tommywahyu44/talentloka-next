'use client'

import { useTranslations } from 'next-intl'
import axios from 'axios'
import Swal from 'sweetalert2'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { lottieFiles } from '@/lib/constants'
import { classNames } from '@/lib/helpers'

import { getDatabase, ref, onValue } from 'firebase/database'
import { Fragment, useState, useEffect } from 'react'
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
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Badge } from 'flowbite-react'
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  CheckCircleIcon,
} from '@heroicons/react/20/solid'

import '@/styles/cards.css'
import TalentDetailModal from './TalentDetailModal'
import CreateEventModal from './CreateEventModal'
import { clientDashboard } from '@/lib/constants'
import SpgCard from './SpgCard'

var listSpg = []
var listData = []
var selectedFilter = ['Female', 'All', 'All', 'Indonesia', 'SPG', 'All', 'All']
var selectedSort = { value: 'code', type: 'asc' }

export default function Filters({ email, listInitFavorites }) {
  const t = useTranslations('default')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [queryResults, setQueryResults] = useState([])
  const [openModal, setOpenModal] = useState(clientDashboard.cardEntity)
  const [openCreateEvent, setOpenCreateEvent] = useState(false)
  const [listIndex, setListIndex] = useState(0)
  const [listFavorites, setFavorite] = useState(listInitFavorites)
  const [loading, setLoading] = useState(false)

  const closeCreateEvent = () => {
    setOpenCreateEvent(false)
  }

  const handleFilterChange = (event) => {
    const { value: value, name: name } = event.target
    if (name == 'gender') {
      selectedFilter[0] = value
    } else if (name == 'city') {
      selectedFilter[1] = value
    } else if (name == 'race') {
      selectedFilter[2] = value
    } else if (name == 'country') {
      selectedFilter[3] = value
    } else if (name == 'role') {
      selectedFilter[4] = value
    } else if (name == 'industry') {
      selectedFilter[5] = value
    } else if (name == 'product') {
      selectedFilter[6] = value
    }
    setListIndex(0)
    updateDataCards(
      selectedFilter[0],
      selectedFilter[1],
      selectedFilter[2],
      selectedFilter[3],
      selectedFilter[4],
      selectedFilter[5],
      selectedFilter[6]
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
      selectedFilter[4],
      selectedFilter[5],
      selectedFilter[6]
    )
  }

  function updateRemovedFavorited(newFavorited) {
    const data = { email: email, favorited: newFavorited.join() }
    axios
      .post('https://asia-southeast1-hireplace.cloudfunctions.net/promotorUpdateFavorited', data)
      .then(() => {})
      .catch((err) => {
        console.log('err ', err)
      })
  }

  function updateFavorited() {
    const data = { email: email, favorited: listFavorites.join() }
    Swal.showLoading()
    axios
      .post('https://asia-southeast1-hireplace.cloudfunctions.net/promotorUpdateFavorited', data)
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

  const updateDataCards = async (gender, city, race, country, role, industry, product) => {
    var filter = {
      gender: gender,
      city: city,
      race: race,
      country: country,
      role: role,
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
    listSpg = []
    const db = getDatabase()
    const spgRef = ref(db, 'promotor_spg_new/')
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
      selectedFilter[4],
      selectedFilter[5],
      selectedFilter[6]
    )
  }, [])

  if (queryResults.length > 0) {
    queryResults.sort((a, b) => {
      const isAFavorite = listFavorites.includes(a[0])
      const isBFavorite = listFavorites.includes(b[0])

      if (isAFavorite && !isBFavorite) return -1
      if (!isAFavorite && isBFavorite) return 1
      return 0
    })
  }

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
                    <h2 className="text-lg font-medium text-stone-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-stone-400"
                      onClick={() => setMobileFiltersOpen(false)}>
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-stone-200">
                    <h3 className="sr-only">Categories</h3>
                    {clientDashboard.filters.map((section, index) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-stone-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-stone-400 transition duration-300 hover:text-rose-500">
                                <span className="font-medium text-stone-900">
                                  {t(section.name)}
                                </span>
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
                                      className="h-4 w-4 rounded border-stone-300 text-rose-600 focus:ring-0"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-stone-500">
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
                          <span className="text-base font-medium text-stone-900">Hired</span>
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
          <div className="flex items-baseline justify-between border-b border-stone-200 pb-6 pt-8">
            <h1 className="mr-4 text-xl font-bold tracking-tight text-stone-900 md:text-3xl">
              <span className="text-rose-600">Discover</span> Your Perfect Talent
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
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-stone-700 transition duration-300 hover:text-rose-600">
                    Sort
                    <ChevronDownIcon
                      className="group-transition -mr-1 ml-1 h-5 w-5 flex-shrink-0 text-stone-400 duration-300 hover:text-rose-500"
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
                      {clientDashboard.sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          {({ active }) => (
                            <a
                              className={classNames(
                                option.value == selectedSort.value &&
                                  option.type == selectedSort.type
                                  ? 'font-medium text-stone-900'
                                  : 'text-stone-500',
                                active ? 'bg-stone-100' : '',
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
                className="-m-2 ml-4 p-2 text-stone-400 transition duration-300 hover:text-rose-500 sm:ml-6 lg:hidden"
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
                {clientDashboard.filters.map((section, index) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-stone-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-stone-400 transition duration-300 hover:text-rose-500">
                            <span className="font-medium text-stone-900">{t(section.name)}</span>

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
                                  className="h-4 w-4 rounded border-stone-300 text-rose-600 outline-none focus:ring-0"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-stone-600">
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
                      <span className="text-sm font-medium text-stone-900">Hired</span>
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
                      onClick={() => setOpenCreateEvent(true)}
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
                      queryResults.map((card, index) => {
                        return (
                          <SpgCard
                            key={card[0]}
                            card={card}
                            index={index}
                            listFavorites={listFavorites}
                            setFavorite={setFavorite}
                            setOpenModal={setOpenModal}
                          />
                        )
                      })
                    ) : (
                      <div className="my-48 text-center">
                        <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-stone-400"></MagnifyingGlassIcon>
                        <h3 className="mt-2 text-sm font-semibold text-stone-900">No results</h3>
                        <p className="mt-1 text-sm text-stone-500">
                          Sorry we can&apos;t find any results for you, please try another filter.
                        </p>
                      </div>
                    )}
                  </section>
                  <TalentDetailModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    cardEntity={clientDashboard.cardEntity}
                    t={t}
                  />
                  <CreateEventModal
                    openCreateEvent={openCreateEvent}
                    closeCreateEvent={closeCreateEvent}
                    email={email}
                  />
                  <nav className="flex items-center justify-between border-t border-stone-200 px-4 sm:px-0">
                    <div className="hover:text-rose-5000 -mt-px flex w-0 flex-1 transition duration-300">
                      <a
                        onClick={() => {
                          if (listIndex > 0) {
                            setListIndex(listIndex - 1)
                            setQueryResults(listData[listIndex - 1])
                            window.scrollTo(0, 0)
                          }
                        }}
                        className="inline-flex cursor-pointer items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-stone-500 transition duration-300 hover:border-rose-300 hover:text-rose-500">
                        <ArrowLongLeftIcon
                          className="hover:text-rose-5000 mr-3 h-5 w-5 text-stone-400 transition duration-300"
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
                            listIndex == index ? 'border-rose-500 text-rose-500' : 'text-stone-500'
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
                        className="inline-flex cursor-pointer items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-stone-500 transition duration-300 hover:border-rose-300 hover:text-rose-500">
                        Next
                        <ArrowLongRightIcon
                          className="hover:text-rose-5000 ml-3 h-5 w-5 text-stone-400 transition duration-300"
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
