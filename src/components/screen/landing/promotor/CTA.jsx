import { useTranslations } from 'next-intl'

export default function CTA() {
  const t = useTranslations('default')
  return (
    <div className="relative isolate py-72">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <span className="pb-2 text-rose-600">{t('landingPromotorSec5Text1')}</span>
          <br />
          {t('landingPromotorSec5Text2')}
        </h2>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="promotor/register"
            className="rounded-md bg-rose-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
            {t('commonGetStarted')}
          </a>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-white">
            {t('commonLearnMore')} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <div className="background relative">
        <div className="absolute z-10 h-full w-full bg-black bg-opacity-85"></div>
        <img
          src="images/promote-spg-landing.jpg"
          className="h-full w-full object-cover grayscale-[80%]"></img>
      </div>
    </div>
  )
}
