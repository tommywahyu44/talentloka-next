import { useTranslations } from 'next-intl'

const partners = [
  {
    name: 'Djarum',
    image: '/images/partner-djarum.png',
  },
  {
    name: 'Mayora',
    image: '/images/partner-mayora.png',
  },
  {
    name: 'Polytron',
    image: '/images/partner-polytron.png',
  },
  {
    name: 'Sinarmas',
    image: '/images/partner-sinarmas.png',
  },
  {
    name: 'Wardah',
    image: '/images/partner-wardah.png',
  },
]

export default function LogoPartners() {
  const t = useTranslations('default')
  return (
    <div
      id="partners"
      className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5">
        {partners.map((partner, index) => (
          <img
            key={index}
            alt={partner.name}
            src={partner.image}
            className="col-span-2 max-h-20 w-full object-contain lg:col-span-1"
          />
        ))}
      </div>
      {/* <div className="mt-16 flex justify-center">
        <p className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-gray-600 ring-1 ring-inset ring-gray-900/10 hover:ring-gray-900/20">
          <span className="hidden md:inline">
            On average our promoters earn Rp. 5,000,000 per month.
          </span>
          <a
            href="#"
            className="font-semibold text-rose-600">
            <span
              aria-hidden="true"
              className="absolute inset-0"
            />{' '}
            Read their stories <span aria-hidden="true">&rarr;</span>
          </a>
        </p>
      </div> */}
    </div>
  )
}
