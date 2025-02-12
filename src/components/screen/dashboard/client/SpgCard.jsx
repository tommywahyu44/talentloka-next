import { textItem } from '@/lib/components.jsx'
import {
  ArrowsUpDownIcon,
  CakeIcon,
  CalculatorIcon,
  MapPinIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline'
import { UserIcon } from '@heroicons/react/24/solid'
import { Badge } from 'flowbite-react'
import Swal from 'sweetalert2'

export default function SpgCard({ card, index, listFavorites, setFavorite, setOpenModal }) {
  return (
    <div
      className={`card-item my-4 mr-2`}
      key={index}>
      {listFavorites.includes(card[0]) ? (
        <UserIcon
          className="absolute right-2 top-2 z-20 h-6 w-6 cursor-pointer text-rose-400 transition duration-300 hover:opacity-100"
          onClick={() => setFavorite([...listFavorites.filter((e) => e !== card[0])])}
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
          <div className="card-img group relative">
            <img
              id="profile-image"
              src={
                card[1].profilePicture ? card[1].profilePicture[0] : '/images/placeholder-pp.webp'
              }
              className="object-cover"
              alt="..."
            />
            <div className="absolute bottom-0 right-3 block p-2 group-hover:hidden">
              <div className="items-end justify-items-end text-right">
                <img
                  className="mb-1 ml-auto"
                  src={
                    card[1].gender === 'Female'
                      ? '/images/female-gender.png'
                      : '/images/male-gender.png'
                  }
                />
                <div className="mb-1 space-x-3">
                  <div className="text-right text-sm font-extrabold text-white">
                    {card[1].name.replace(/[()]/g, '')}
                  </div>
                </div>
                <h3 className="truncate text-xs font-medium">{card[0]}</h3>
              </div>
            </div>
            <div className="absolute bottom-0 left-4 hidden w-52 grid-cols-2 rounded-md bg-black bg-opacity-40 p-2 transition delay-150 ease-in-out group-hover:grid">
              <div className="space-y-1">
                {textItem(<CakeIcon className="h-5 w-5 text-white" />, card[1].dob)}
                {textItem(<MapPinIcon className="h-5 w-5 text-white" />, card[1].city)}
                {textItem(
                  <ArrowsUpDownIcon className="h-5 w-5 text-white" />,
                  card[1].heightCm + ' cm'
                )}
                {textItem(
                  <CalculatorIcon className="h-5 w-5 text-white" />,
                  card[1].weightKg + ' kg'
                )}
              </div>
              <div className="mt-auto items-end justify-items-end text-right">
                <img
                  className="mb-1 ml-auto"
                  src={
                    card[1].gender === 'Female'
                      ? '/images/female-gender.png'
                      : '/images/male-gender.png'
                  }
                />
                <div className="mb-1 space-x-3">
                  <div className="text-right text-sm font-extrabold text-white">
                    {card[1].name.replace(/[()]/g, '')}
                  </div>
                </div>
                <h3 className="truncate text-xs font-medium">{card[0]}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="card-event-brand z-10 col-span-12">
          <div className="flex gap-2 overflow-clip">
            {card[1].experiences
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
  )
}
