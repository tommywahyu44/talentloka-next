'use client'

import { lottieFiles } from '@/lib/constants'
import { classNames } from '@/lib/helpers'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import axios from 'axios'
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
  AdjustmentsHorizontalIcon,
  BarsArrowUpIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/20/solid'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { getDatabase, onValue, ref } from 'firebase/database'
import { Fragment, useEffect, useState } from 'react'

import { ModelCard } from '@/components/card/Card'
import { clientDashboard } from '@/lib/constants'
import { moneyFormat } from '@/lib/helpers'
import clientFavoriteService from '@/services/clientFavoriteService'
import '@/styles/cards.css'
import { Favorite, WhatsApp } from '@mui/icons-material'
import { Badge, capitalize, Fab, Pagination } from '@mui/material'
import clsx from 'clsx'
import CreateEventModal from './CreateEventModal'
import TalentDetailModal from './TalentDetailModal'

var selectedFilter = ['Female', 'All', 'All', 'Indonesia', 'SPG', 'All', 'All', 'All']
var selectedSort = { value: 'tier', type: 'desc' }

export default function Filters({
  email,
  listInitFavorites,
  favorites,
  setListFavorites,
  userProfile,
}) {
  const t = useTranslations('default')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [queryResults, setQueryResults] = useState([])
  const [openModal, setOpenModal] = useState(clientDashboard.cardEntity)
  const [createEvent, setCreateEvent] = useState({
    openCreateEvent: false,
    method: null,
    data: null,
  })
  const [listIndex, setListIndex] = useState(0)
  const [listFavorites, setFavorite] = useState(listInitFavorites)
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState({ data: [], filteredData: [] })

  const openCreateEvent = () => {
    setCreateEvent({
      openCreateEvent: true,
      method: 'create',
      data: { listPromotor: favorites.join(',') },
    })
  }

  const closeCreateEvent = () => {
    setCreateEvent({ openCreateEvent: false, method: 'create', data: {} })
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
    } else if (name == 'tier') {
      selectedFilter[7] = value
    }
    setListIndex(0)
    updateDataCards(
      listData.data,
      selectedFilter[0],
      selectedFilter[1],
      selectedFilter[2],
      selectedFilter[3],
      selectedFilter[4],
      selectedFilter[5],
      selectedFilter[6],
      selectedFilter[7]
    )
  }

  function handleSortChange(value, type) {
    selectedSort.value = value
    selectedSort.type = type
    setListIndex(0)
    updateDataCards(
      listData.data,
      selectedFilter[0],
      selectedFilter[1],
      selectedFilter[2],
      selectedFilter[3],
      selectedFilter[4],
      selectedFilter[5],
      selectedFilter[6],
      selectedFilter[7]
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

  function sortByTier(a, b) {
    const tierOrder = [0, 3, 2, 1]

    const tierA = a[1][selectedSort.value]
    const tierB = b[1][selectedSort.value]

    const tierIndexA = tierOrder.indexOf(tierA)
    const tierIndexB = tierOrder.indexOf(tierB)

    return selectedSort.type === 'asc' ? tierIndexA - tierIndexB : tierIndexB - tierIndexA
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

  const updateDataCards = async (
    listSpg,
    gender,
    city,
    race,
    country,
    role,
    industry,
    product,
    tier
  ) => {
    var filter = {
      gender: gender,
      city: city,
      race: race,
      country: country,
      role: role,
      brands: industry,
      events: product,
      tier: tier,
    }

    var filteredData = listSpg.filter((item) => {
      for (var key in filter) {
        if (
          (item[1][key] === undefined || !item[1][key].toString().includes(filter[key])) &&
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
      } else if (selectedSort.value === 'tier') {
        filteredData.sort(sortByTier)
      } else {
        filteredData.sort(sortByNumber)
      }
      const maxPage = Math.ceil(filteredData.length / 20)
      let newList = []
      for (let i = 1; i <= maxPage; i++) {
        newList.push(filteredData.slice(i * 20 - 20, i == maxPage ? filteredData.length : i * 20))
      }
      setListData({ data: listSpg, filteredData: newList })
      setQueryResults(newList[0])
    } else {
      setQueryResults([])
    }
    setLoading(false)
  }

  const handleSubmitWhatsApp = async () => {
    try {
      const listFavorites = listData.data.filter((spg) => favorites.includes(spg[0]))
      let subtotal = 0
      const message = `
Hi Talentloka!
Nama: ${userProfile.name}
Email: ${userProfile.email}

${listFavorites
  .map((item) => {
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
    subtotal += price // Add price to subtotal
    return `• ${item[1].name} (${item[0]}) Fee ${moneyFormat(price)}`
  })
  .join('\n')}

Kupon: LAUNCH10%
Diskon: ${moneyFormat(subtotal * 0.1)}
Total: ${moneyFormat(subtotal * 0.9)}/day
`

      const encodedMessage = encodeURIComponent(message)
      window.open(`https://wa.me/6281299880745?text=${encodedMessage}`, '_blank')
      localStorage.removeItem('userLocation')
    } catch (error) {
      console.error('Error processing checkout:', error)
    }
  }

  const fetchDataCards = async (gender, city, race, country, role, industry, product, tier) => {
    setLoading(true)
    const db = getDatabase()
    const spgRef = ref(db, 'promoters_public_info/')
    onValue(spgRef, (snapshot) => {
      const data = snapshot.val()
      if (data && listData.data.length === 0) {
        const listSpg = Object.entries(data)
        const filteredList = listSpg.filter((spg) => spg[1].tier !== 0)
        console.log('excal spg', listSpg.length, filteredList.length)
        updateDataCards(filteredList, gender, city, race, country, role, industry, product, tier)
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
      selectedFilter[6],
      selectedFilter[7]
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

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/6281299880745`, '_blank')
  }

  return (
    <div>
      <div className="relative">
        {/* FAB for favorited SPG */}
        {favorites.length > 0 && (
          <Badge
            badgeContent={favorites.length}
            color="error"
            onClick={() => setMobileFiltersOpen(true)}
            className="z-50"
            sx={{
              position: 'absolute',
              bottom: 24,
              left: 24,
            }}>
            <Fab
              aria-label="like"
              color="error">
              <Favorite className="h-8 w-8 text-white" />
            </Fab>
          </Badge>
        )}
        <Fab
          aria-label="like"
          onClick={handleWhatsAppClick}
          sx={{
            position: 'absolute',
            backgroundColor: '#25D366',
            bottom: 24,
            right: 24,
            '&:hover': {
              backgroundColor: '#1DA851',
            },
          }}>
          <WhatsApp className="h-8 w-8 text-white" />
        </Fab>
        {/* Mobile filter dialog */}
        <Transition
          show={mobileFiltersOpen}
          as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40"
            onClose={setMobileFiltersOpen}>
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
                    <h2 className="text-lg font-medium text-stone-900"></h2>
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

                  {favorites.length > 0 ? (
                    <div className="ml-4">
                      <h3 className="mb-2 mt-4 flow-root">
                        <span className="text-sm font-medium text-stone-900">Hired</span>
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {listData.data.length > 0 &&
                          listData.data
                            .filter((spgData) => favorites.includes(spgData[0]))
                            .sort((a, b) => a[1].tier - b[1].tier)
                            .map((spgData) => {
                              return listData.data.length > 0 ? (
                                <div
                                  key={spgData[0]}
                                  className={clsx(
                                    spgData[1].tier === 1 && 'border-yellow-300 bg-yellow-300/10',
                                    spgData[1].tier === 2 && 'border-blue-500 bg-blue-500/10',
                                    spgData[1].tier === 3 && 'border-emerald-500 bg-emerald-500/10',
                                    'flex items-center justify-center rounded-full border text-center'
                                  )}
                                  onClick={() => {
                                    // var newFavorited = listFavorites.filter((e) => e !== fav)
                                    // updateRemovedFavorited(newFavorited)
                                    // setFavorite([...newFavorited])
                                    const newFavorites = clientFavoriteService.remove(
                                      spgData[1].code
                                    )
                                    setListFavorites(newFavorites)
                                  }}>
                                  {spgData[1]?.profilePicture && (
                                    <img
                                      loading="lazy"
                                      className="my-auto mr-2 h-8 w-8 rounded-l-full object-cover"
                                      src={spgData[1].profilePicture[0]}
                                    />
                                  )}
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
                      <a
                        onClick={() => openCreateEvent()}
                        type="button"
                        className="mt-4 inline-flex cursor-pointer items-center gap-x-2 rounded-md bg-rose-600 px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm transition duration-300 hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
                        Create Event
                      </a>
                      <a
                        onClick={handleSubmitWhatsApp}
                        type="button"
                        className="ml-2 mt-4 inline-flex cursor-pointer items-center gap-x-2 rounded-md border border-rose-500 bg-white px-3.5 py-2.5 text-xs font-semibold text-rose-600 shadow-sm transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                        Send WhatsApp
                      </a>
                    </div>
                  ) : (
                    <div></div>
                  )}

                  {/* Filters */}
                  <form className="mt-4 border-t border-stone-200">
                    <h2 className="ml-4 mt-4 text-lg font-medium text-stone-900">Filters</h2>
                    {clientDashboard.filters.map((section, index) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-b border-stone-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-stone-400 transition duration-300 hover:text-rose-500">
                                <span className="font-medium text-stone-900">
                                  {section.name.toLowerCase() !== 'tier'
                                    ? t(section.name)
                                    : capitalize(section.name)}
                                </span>

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
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        <main className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-stone-200 py-3 sm:py-5">
            <h1 className="mr-4 text-lg font-bold tracking-tight text-stone-900 md:text-3xl">
              <span className="text-rose-600">Find </span> the Perfect Talent for Your Event
            </h1>
          </div>

          <section
            aria-labelledby="products-heading"
            className="pt-2">
            <div className="flex items-center justify-between text-center">
              <Menu
                as="div"
                className="relative inline-block text-left">
                <div>
                  <MenuButton className="group flex flex-row items-center justify-center space-x-2 rounded-md bg-rose-500 px-3 py-1.5 text-sm font-medium text-white transition duration-300 hover:text-rose-600">
                    Sort
                    <BarsArrowUpIcon
                      className="ml-2 h-5 w-5"
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
                  <MenuItems className="absolute left-0 z-20 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                className="-m-2 ml-4 flex flex-row items-center justify-center space-x-2 rounded-md bg-rose-500 px-3 py-1.5 text-sm text-white transition duration-300 sm:ml-6"
                onClick={() => setMobileFiltersOpen(true)}>
                <span className="sr-only">Filters</span>
                Filter{' '}
                <AdjustmentsHorizontalIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </div>

            <div className="mt-2">
              <section>
                {loading ? (
                  <DotLottieReact
                    src={lottieFiles.loading}
                    loop
                    autoplay
                  />
                ) : queryResults.length > 0 ? (
                  <div className="grid h-main-nav grid-cols-2 gap-4 overflow-auto sm:h-[75vh] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {queryResults.map((card, index) => {
                      return (
                        <ModelCard
                          key={index}
                          code={card[0]}
                          model={card[1]}
                          favorites={favorites}
                          setListFavorites={setListFavorites}
                        />
                      )
                    })}
                  </div>
                ) : (
                  <div className="mx-auto my-48 text-center">
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
                isOpenCreateEvent={createEvent.openCreateEvent}
                closeCreateEvent={closeCreateEvent}
                email={email}
                data={createEvent.data}
                method={createEvent.method}
              />
              <nav className="mt-4 flex items-center justify-center">
                <Pagination
                  count={listData.filteredData.length}
                  page={listIndex + 1}
                  onChange={(value, index) => {
                    setListIndex(index - 1)
                    setQueryResults(listData.filteredData[index - 1])
                    window.scrollTo(0, 0)
                  }}
                  sx={{
                    '& .MuiPaginationItem-root.Mui-selected': {
                      backgroundColor: '#f43f5e',
                      color: '#fff',
                    },
                    '& .MuiPaginationItem-root.Mui-selected:hover': {
                      backgroundColor: '#f43f5e',
                      color: '#fff',
                    },
                    '& .MuiPaginationItem-root': {},
                  }}
                />
              </nav>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
