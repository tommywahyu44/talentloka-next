'use client'

import { useTranslations } from 'next-intl'
import { fireAuth } from '@/plugins/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref, onValue } from 'firebase/database'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { Button, Modal } from 'flowbite-react'
import { textItemSmall } from '@/lib/components.jsx'

function verifyInfluencer(email, code, name) {
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
      const data = { email: email, code: code, name: name }
      axios
        .post('https://asia-southeast1-hireplace.cloudfunctions.net/verifyInfluencer', data)
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

const cardSpgPlaceholder = [
  '',
  {
    city: 'BALI',
    confirmed: true,
    country: 'Indonesia',
    dob: '1992',
    dobYear: 1992,
    gender: 'Male',
    fullName: 'Prasetiansyah',
    profilePicture: [
      'https://firebasestorage.googleapis.com/v0/b/hireplace.appspot.com/o/promotor_spg%2FBL00001-PP-1.png?alt=media&token=47707dcf-cae2-4ae9-bb76-386b6a08f6a6',
      'https://firebasestorage.googleapis.com/v0/b/hireplace.appspot.com/o/promotor_spg%2FBL00001-PP-2.png?alt=media&token=d4c1c5af-274c-42f6-9d96-d2e9eaa4e4f5',
      'https://firebasestorage.googleapis.com/v0/b/hireplace.appspot.com/o/promotor_spg%2FBL00001-PP-3.png?alt=media&token=85744712-1204-40c7-9579-90a8cc7f95c4',
      'https://firebasestorage.googleapis.com/v0/b/hireplace.appspot.com/o/promotor_spg%2FBL00001-PP-4.png?alt=media&token=45ce4406-7e91-4a5c-9b2e-8d8ddfdec9c5',
    ],
    email: '',
    contact: '',
  },
]

export default function Influencer() {
  const t = useTranslations('default')
  const [listSpg, setListSpg] = useState([])
  const [openModal, setOpenModal] = useState(cardSpgPlaceholder)

  const fetchData = async () => {
    const db = getDatabase()
    const clientRef = ref(db, 'promotor_influencer_unconfirmed/')
    onValue(clientRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const listData = Object.entries(data)
        setListSpg(listData)
      }
    })
  }

  onAuthStateChanged(fireAuth, (user) => {
    if (user) {
      var email = user.email
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
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-stone-900">SPG Admin Dashboard</h1>
          {/* <p className="mt-2 text-sm text-stone-700">A list of all the SPG.</p> */}
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-rose-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm transition duration-300 hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
            Add Influencer
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-stone-300 bg-stone-50">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-stone-900 sm:pl-0">
                    Profile
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">
                    {t('commonGender')}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">
                    {t('commonCity')}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">
                    DOB
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
                  <th
                    scope="col"
                    className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 bg-white">
                {listSpg.length > 0 ? (
                  listSpg.map((inf) => (
                    <tr key={inf[0]}>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="h-11 w-11 flex-shrink-0">
                            <img
                              className="h-11 w-11 rounded-full object-cover"
                              src={inf[1].profilePicture ? inf[1].profilePicture[0] : ''}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-stone-900">{inf[1].fullName}</div>
                            <div className="mt-1 text-stone-700">{inf[1].email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-center text-sm text-stone-700">
                        {inf[1].gender}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-center text-sm text-stone-700">
                        {inf[1].city}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-center text-sm text-stone-700">
                        {inf[1].dobYear}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-center text-sm text-stone-700">
                        {inf[1].confirmed ? (
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
                        <Button
                          color="gray"
                          className="transition duration-300 hover:text-rose-600"
                          onClick={() => setOpenModal(spg)}>
                          Details
                        </Button>
                      </td>
                      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        {inf[1].confirmed ? (
                          <div></div>
                        ) : (
                          <button
                            onClick={() =>
                              verifyInfluencer(inf[1].email, inf[1].code, inf[1].fullName)
                            }
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
      </div>
      <Modal
        dismissible
        show={openModal[0] !== ''}
        size="2xl"
        onClose={() => setOpenModal(cardSpgPlaceholder)}>
        {/* <Modal.Header>
                      <h2 className="text-transparent bg-clip-text bg-gradient-to-br from-rose-600 from-65% via-primary via-90% to-rose-400 font-bold text-3xl">
                        {openModal.fieldsname}
                      </h2>
                    </Modal.Header> */}
        <Modal.Body className="bg-white">
          <div
            id="capture"
            className="bg-white p-4 text-center">
            <p className="text-4xl font-bold text-stone-900">{openModal[1].fullName}</p>
            <p className="mt-2 text-base text-rose-600">{openModal[1].email}</p>
            <p className="mt-2 text-base text-rose-600">{openModal[1].contact}</p>
            <div className="mt-1 flex items-center justify-center text-center text-base">
              {/* {textItemSmall(t('commonBirthYear'), openModal[1].dob)}
              {textItemSmall(t('commonWeight'), openModal[1].weightKg + ' kg')}
              {textItemSmall(t('commonHeight'), openModal[1].heightCm + ' cm')}
              {textItemSmall(t('commonLocation'), openModal[1].city)} */}
            </div>
            <div className="mt-4 grid w-full grid-cols-2 gap-x-4 gap-y-4">
              {Object.keys(openModal[1].profilePicture).map((val) => (
                <img
                  key={val}
                  src={openModal[1].profilePicture[val]}
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
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
