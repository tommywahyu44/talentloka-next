import { useTranslations } from 'next-intl'

export default function Example() {
  const t = useTranslations('default')
  return (
    <div
      id="contact"
      className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-rose-50 px-6 py-24 text-center shadow-md sm:rounded-3xl sm:px-16">
          <h2 className="font-display mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-rose-600 sm:text-4xl">
            {t('landingClientSec4Title')}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-50">
            {t('landingClientSec4Description')}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/client/register"
              className="rounded-md bg-rose-600 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm transition duration-300 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              {t('signUp')}
            </a>
            <a
              href="/promotor"
              className="text-sm font-medium leading-6 text-slate-50">
              {t('commonRegisterAsPromotor')}
              <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="background relative">
            <div className="absolute z-10 h-full w-full bg-black bg-opacity-85"></div>
            <img
              src="images/booth-spg-landing.jpg"
              className="h-full w-full object-cover object-[50%_20%] grayscale-[80%]"></img>
          </div>
        </div>
      </div>
    </div>
  )
}
