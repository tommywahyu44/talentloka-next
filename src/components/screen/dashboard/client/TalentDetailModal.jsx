import { Button, Modal, Badge } from 'flowbite-react'
import * as htmlToImage from 'html-to-image'
import download from 'downloadjs'
import { useState } from 'react'
import { textItemSmall } from '@/lib/components.jsx'
export default function TalentDetailModal({ openModal, setOpenModal, cardEntity, t }) {
  const [isShowExperience, setShowExperience] = useState(false)

  const downloadCompCard = (code) => {
    const captureElement = document.querySelector('#capture') // Select the element you want to capture. Select the <body> element to capture full page.
    htmlToImage.toPng(captureElement).then(function (dataUrl) {
      download(dataUrl, `${code}.png`)
    })
  }
  return (
    <Modal
      dismissible
      show={openModal[0] != ''}
      size="2xl"
      className="bg-opacity-40 pt-6"
      onClose={() => setOpenModal(cardEntity)}>
      <Modal.Header className="border-b border-white"></Modal.Header>
      <Modal.Body
        id="scroll-div"
        className="rounded-md bg-white px-6 pb-6 pt-0">
        {isShowExperience ? (
          <div className="px-4 pb-8">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-stone-900">
                {t('dashboardClientTalentDetailsExperienceTitle')}
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-stone-500">
                {t('dashboardClientTalentDetailsExperienceDesc')}
              </p>
            </div>
            <div className="border-t border-stone-100">
              <dl className="divide-y divide-stone-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-stone-900">
                    {t('commonIndustry')}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-stone-700 sm:col-span-2 sm:mt-0">
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
                  <dt className="text-sm font-medium leading-6 text-stone-900">
                    {t('commonProductField')}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-stone-700 sm:col-span-2 sm:mt-0">
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
            className="bg-white px-4 pb-4 text-center">
            <p className="text-4xl font-bold text-stone-900">
              {openModal[1].name.replace(/[()]/g, '')}
            </p>
            <p className="mt-2 text-base text-rose-600">{openModal[0]}</p>
            <div className="mt-1 grid grid-cols-2 items-center justify-center gap-1 text-center text-base sm:gap-2 md:grid-cols-4">
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
                src="/images/marketingo-logo.png"
                className="w-14 md:w-20"></img>
              <div className="my-auto text-sm font-light text-rose-600 sm:text-base md:text-lg">
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
  )
}
