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
import { classNames, formatIndonesianNumber } from '@/lib/helpers'
import SpgTable from './SpgTable'
import SpgRegisteredTable from './SpgRegisteredTable'

const tabs = [
  { name: 'Registered Promotor', href: '#', current: true },
  { name: 'All Promotor', href: '#', current: false },
]

const cardSpgPlaceholder = [
  '',
  {
    city: 'BALI',
    confirmed: true,
    country: 'Indonesia',
    dob: '1992',
    dobYear: 1992,
    gender: 'Male',
    heightCm: 177,
    fullName: 'Prasetiansyah',
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
    email: '',
    contact: '',
  },
]

export default function Spg(email) {
  var mergedData = {}
  const t = useTranslations('default')
  const [listSpg, setListSpg] = useState([])
  const [listAllSpg, setListAllSpg] = useState({})
  const [openModal, setOpenModal] = useState(cardSpgPlaceholder)
  const [selectedTab, selectTab] = useState(0)

  const verifySPG = (email, code, name) => {
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
          .post('https://asia-southeast1-talentloka-35463.cloudfunctions.net/verifyPromoter', data)
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

  const fetchRegistered = async () => {
    const db = getDatabase()
    const clientRef = ref(db, 'promoters/')
    onValue(clientRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const listData = Object.entries(data)
        setListSpg(listData)
      }
    })
  }

  const fetchAll = async () => {
    const db = getDatabase()
    const clientRef = ref(db, 'promoters_public_info/')
    onValue(clientRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        for (const key in data) {
          mergedData[key] = {
            ...mergedData[key],
            ...data[key],
          }
        }
        setListAllSpg(mergedData)
      }
    })
  }

  const fetchAllInfo = async () => {
    const db = getDatabase()
    const clientRef = ref(db, 'promoters_private_info/')
    onValue(clientRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        for (const key in data) {
          mergedData[key] = {
            ...mergedData[key],
            ...data[key],
          }
        }
        setListAllSpg(mergedData)
      }
    })
  }

  onAuthStateChanged(fireAuth, (user) => {
    if (user) {
      var email = user.email
      if (email !== 'admin@talentloka.com') {
        window.location.replace('/go-admin/login')
      }
    } else {
      window.location.replace('/go-admin/login')
    }
  })

  //run hook useEffect
  useEffect(() => {
    fetchRegistered()
    fetchAll()
    fetchAllInfo()
  }, [])
  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-stone-900">
            Promotor Admin Dashboard
          </h1>
          {/* <p className="mt-2 text-sm text-stone-700">A list of all the SPG.</p> */}
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-rose-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm transition duration-300 hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
            Add Promotor
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
        listSpg &&
        listSpg.length > 0 && (
          <SpgRegisteredTable
            listSpg={listSpg}
            setOpenModal={setOpenModal}
            verifySPG={verifySPG}
          />
        )
      ) : (
        <SpgTable
          listSpg={listAllSpg}
          setOpenModal={setOpenModal}
          verifySPG={verifySPG}
        />
      )}
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
            <p className="text-4xl font-bold text-stone-900">{openModal.fullName}</p>
            <p className="mt-2 text-base text-rose-600">{openModal.email ?? openModal.code}</p>
            <p className="mt-2 text-base text-rose-600">{openModal.contact}</p>
            <div className="mt-1 flex items-center justify-center text-center text-base">
              {textItemSmall(t('commonBirthYear'), openModal.dob)}
              {textItemSmall(t('commonWeight'), openModal.weightKg + ' kg')}
              {textItemSmall(t('commonHeight'), openModal.heightCm + ' cm')}
              {textItemSmall(t('commonLocation'), openModal.city)}
            </div>
            <div className="mt-4 grid w-full grid-cols-2 gap-x-4 gap-y-4">
              {openModal.profilePicture &&
                Object.keys(openModal.profilePicture).map((val) => (
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
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
