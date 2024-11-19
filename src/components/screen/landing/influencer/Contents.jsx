import { useTranslations } from 'next-intl'

export default function Contents() {
  const t = useTranslations('default')
  return (
    <div
      id="product"
      className="bg-white">
      {/* Feature section */}
      <div className="mt-32 sm:mt-56">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <p className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              <span className="text-rose-600">Everything</span> You Need
            </p>
            <p className="mt-6 text-lg leading-8 text-stone-700">
              {t('landingPromotorSec3Description')}
            </p>
          </div>
        </div>
        <div className="relative overflow-hidden pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <img
              src="/images/dashboard-app.png"
              alt="App screenshot"
              className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-white/10"
              width={2432}
              height={1442}
            />
            <div
              className="relative"
              aria-hidden="true">
              <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[5%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
