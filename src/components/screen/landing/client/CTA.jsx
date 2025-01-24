import { useTranslations } from 'next-intl'

export default function Example() {
  const t = useTranslations('default')
  return (
    <div
      id="contact"
      className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-rose-50 px-6 py-24 text-center shadow-md sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-rose-600 sm:text-4xl">
            {t('landingClientSec4Title')}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-stone-700">
            {t('landingClientSec4Description')}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/client/register"
              className="rounded-md bg-rose-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-300 hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Sign up
            </a>
            <a
              href="/promotor"
              className="text-sm font-semibold leading-6 text-stone-700">
              {t('commonRegisterAsPromotor')}
              <span aria-hidden="true">→</span>
            </a>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/3 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true">
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor="#e0f2fe" />
                <stop
                  offset={1}
                  stopColor="#bae6fd"
                />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
