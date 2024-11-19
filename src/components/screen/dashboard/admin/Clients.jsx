'use client'

import { useTranslations } from 'next-intl'
import { fireAuth } from '@/plugins/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref, onValue } from 'firebase/database'
import { useState, useEffect } from 'react'
import { Button, Modal, Badge } from 'flowbite-react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { classNames } from '@/lib/helpers'
import { textItemSmall } from '@/lib/components.jsx'

var email = ''

const tabs = [
  { name: 'Clients', href: '#', current: true },
  { name: 'SPG Request', href: '#', current: false },
]

const cardSpgPlaceholder = {
  city: 'BALI',
  country: 'Indonesia',
  dob: '1992',
  dobYear: 1992,
  gender: 'Male',
  heightCm: 177,
  name: '',
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
  code: '',
  contactNumber: '',
  fullName: '',
  email: '',
}

function verifyClient(email, name) {
  Swal.fire({
    title: `Do you want to verify ${email}?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#be123c',
    cancelButtonColor: '#808080',
    confirmButtonText: 'Yes, verify it!',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.showLoading()
      const data = { email: email, name: name }
      axios
        .post('https://asia-southeast1-hireplace.cloudfunctions.net/verifyClient', data)
        .then(() => {
          Swal.hideLoading()
          Swal.fire({
            title: 'Verified!',
            text: `${email} has been verified.`,
            icon: 'success',
            iconColor: '#be123c',
            confirmButtonColor: '#be123c',
          })
        })
        .catch(() => {
          Swal.hideLoading()
          Swal.fire({
            title: 'Error',
            text: "Sorry we can't verify it now, please try it again later.",
            icon: 'error',
            iconColor: '#be123c',
            confirmButtonColor: '#be123c',
          })
        })
    }
  })
}

export default function Clients() {
  const t = useTranslations('default')
  const [clients, setClients] = useState([])
  const [selectedTab, selectTab] = useState(0)
  const [openModal, setOpenModal] = useState(cardSpgPlaceholder)

  const fetchData = async () => {
    const db = getDatabase()
    const clientRef = ref(db, 'promotor_client/')
    onValue(clientRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const listData = Object.entries(data)
        setClients(listData)
      }
    })
  }

  const fetchSPG = async (code) => {
    const db = getDatabase()
    const spgRef = ref(db, 'promotor_spg/' + code)
    onValue(spgRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const spgInfoRef = ref(db, 'promotor_spg_info/' + code)
        onValue(spgInfoRef, (snapshot) => {
          const dataInfo = snapshot.val()
          if (dataInfo) {
            setOpenModal({ ...data, ...dataInfo })
          }
        })
      }
    })
  }

  onAuthStateChanged(fireAuth, (user) => {
    if (user) {
      email = user.email
      if (email !== 'spg.admin@talentvis.com') {
        window.location.replace('/go-admin/login')
      }
    } else {
      window.location.replace('/go-admin/login')
    }
  })

  //run hook useEffect
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-stone-900">
            Clients Admin Dashboard
          </h1>
          {/* <p className="mt-2 text-sm text-stone-700">
            A list of all the clients.
          </p> */}
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-rose-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm transition duration-300 hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
            Add Client
          </button>
        </div>
      </div>
      <div>
        <div className="sm:hidden">
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-stone-300 py-2 pl-3 pr-10 text-base focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
            defaultValue={tabs.find((tab) => tab.current).name}>
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="mt-8 hidden sm:block">
          <div>
            <nav
              className="-mb-px flex space-x-4"
              aria-label="Tabs">
              {tabs.map((tab, index) => (
                <a
                  key={tab.name}
                  onClick={() => selectTab(index)}
                  className={classNames(
                    index === selectedTab
                      ? 'bg-rose-50 text-rose-600'
                      : 'border-transparent text-stone-500 transition duration-300 hover:text-rose-700',
                    'cursor-pointer whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium'
                  )}>
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {selectedTab === 0 ? (
        <div className="mt-4 flow-root">
          <div className="h-[75vh] overflow-x-auto">
            <table className="w-full">
              <thead className="sticky top-0 h-16 divide-y divide-stone-300 bg-stone-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-stone-900">
                    Profile
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">
                    Company
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">
                    Deed of Establishment
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">
                    Single Business Number
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">
                    Director Id Card
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">
                    Employer Tax Id
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">
                    Status
                  </th>
                  <th
                    scope="col"
                    className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 bg-white">
                {clients.length > 0 ? (
                  clients.map((client) => (
                    <tr key={client[0]}>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                        <div className="flex items-center">
                          <div className="h-11 w-11 flex-shrink-0">
                            <img
                              className="h-11 w-11 rounded-full"
                              src={client[1].companyLogo}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-stone-900">{client[1].name}</div>
                            <div className="mt-1 text-stone-500">{client[1].email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-stone-500">
                        {client[1].company}
                      </td>
                      <td className="m-auto mt-6 text-center text-sm text-blue-500">
                        <a
                          href={client[1].deedOfEstablishment}
                          target="_blank"
                          rel="noreferrer nofollow"
                          className="cursor-pointer text-blue-500">
                          View
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-center text-sm text-stone-500">
                        <div className="text-stone-900">{client[1].singleBusinessNumber}</div>
                        <div className="mt-1">
                          <a
                            href={client[1].singleBusinessNumberFile}
                            target="_blank"
                            rel="noreferrer nofollow"
                            className="cursor-pointer text-blue-500">
                            View
                          </a>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-center text-sm text-stone-500">
                        <div className="text-stone-900">{client[1].directorIdCard}</div>
                        <a
                          href={client[1].directorIdCardFile}
                          target="_blank"
                          rel="noreferrer nofollow"
                          className="cursor-pointer text-blue-500">
                          View
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-center text-sm text-stone-500">
                        <div className="text-stone-900">{client[1].employerTaxId}</div>
                        <a
                          href={client[1].employerTaxIdFile}
                          target="_blank"
                          rel="noreferrer nofollow"
                          className="cursor-pointer text-blue-500">
                          View
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-center text-sm text-stone-500">
                        {client[1].isVerified ? (
                          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-md bg-rose-50 px-2 py-1 text-xs font-medium text-rose-500 ring-1 ring-inset ring-rose-600/20">
                            Unverified
                          </span>
                        )}
                      </td>
                      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        {client[1].isVerified ? (
                          <div></div>
                        ) : (
                          <button
                            onClick={() => verifyClient(client[1].email, client[1].name)}
                            type="button"
                            className="block rounded-md bg-rose-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm transition duration-300 hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
                            Verify
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="mt-4 flow-root">
          <div className="h-[75vh] overflow-x-auto">
            <table className="w-full">
              <thead className="sticky top-0 h-16 divide-y divide-stone-300 bg-stone-50">
                <tr>
                  <th
                    scope="col"
                    className="w-80 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-stone-900">
                    Profile
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">
                    Request
                  </th>
                  <th
                    scope="col"
                    className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 bg-white">
                {clients.length > 0 ? (
                  clients
                    .filter((client) => client[1].favorited !== '')
                    .map((client) => (
                      <tr key={client[0]}>
                        <td className="w-80 whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                          <div className="flex items-center">
                            <div className="h-11 w-11 flex-shrink-0">
                              <img
                                className="h-11 w-11 rounded-full"
                                src={client[1].companyLogo}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-stone-900">{client[1].name}</div>
                              <div className="mt-1 text-stone-500">{client[1].email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-stone-500">
                          <div className="flex flex-wrap gap-2">
                            {typeof client[1].favorited === 'string'
                              ? client[1]?.favorited.split(',').map((fav) => (
                                  <Badge
                                    key={fav}
                                    className="cursor-pointer bg-pink-50 pr-2 text-rose-600"
                                    onClick={() => fetchSPG(fav)}>
                                    {fav}
                                  </Badge>
                                ))
                              : client[1]?.favorited?.map((fav) => (
                                  <Badge
                                    key={fav}
                                    className="cursor-pointer bg-pink-50 pr-2 text-rose-600"
                                    onClick={() => fetchSPG(fav)}>
                                    {fav}
                                  </Badge>
                                ))}
                          </div>
                        </td>
                        <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          {client[1].isVerified ? (
                            <div></div>
                          ) : (
                            <button
                              onClick={() => verifyClient(client[1].email)}
                              type="button"
                              className="block rounded-md bg-rose-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm transition duration-300 hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
                              Verify
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Modal
        dismissible
        show={openModal.name !== ''}
        size="2xl"
        onClose={() => setOpenModal(cardSpgPlaceholder)}>
        <Modal.Body className="bg-white">
          <div
            id="capture"
            className="bg-white p-4 text-center">
            <p className="text-4xl font-bold text-stone-900">{openModal.name}</p>
            <p className="mt-2 text-base text-rose-600">{openModal.code}</p>
            <p className="mt-2 text-base font-semibold text-rose-600">{openModal.contactNumber}</p>
            <div className="mt-1 flex items-center justify-center text-center text-base">
              {textItemSmall(t('commonBirthYear'), openModal.dob)}
              {textItemSmall(t('commonWeight'), openModal.weightKg + ' kg')}
              {textItemSmall(t('commonHeight'), openModal.heightCm + ' cm')}
              {textItemSmall(t('commonLocation'), openModal.city)}
            </div>
            <div className="mt-4 grid w-full grid-cols-2 gap-x-4 gap-y-4">
              {Object.keys(openModal.profilePicture).map((val) => (
                <img
                  key={val}
                  src={openModal.profilePicture[val]}
                  className="object-fill object-center"
                />
              ))}
            </div>
            <div className="my-4 flex justify-between text-center text-lg">
              <img
                src="/images/marketingo-logo.png"
                className="w-28"></img>
              <div className="my-auto text-base font-light text-rose-600">
                Sales Promotion Staffing Solution
              </div>
            </div>
          </div>
          <div className="mt-4 flex">
            <Button
              color="gray"
              onClick={() => setOpenModal(cardSpgPlaceholder)}>
              Close
            </Button>
            <Button
              color="gray"
              className="ml-4 bg-green-500 text-white"
              href={
                'https://api.whatsapp.com/send?phone=62' +
                openModal.contactNumber.replaceAll(' ', '').replace('0', '')
              }
              target="_blank"
              rel="noreferrer nofollow"
              onClick={() => setOpenModal(cardSpgPlaceholder)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
                color="#fff"
                viewBox="0 0 24 24"
                width="24px"
                height="24px">
                {' '}
                <path
                  fill="#fff"
                  d="M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z"
                />
              </svg>
              Send Whatsapp Message
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
