'use client'

import {
  ArrowTrendingUpIcon,
  ArrowsPointingInIcon,
  DevicePhoneMobileIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'

const features = [
  {
    name: 'landingPromotorSec2Item1Title',
    description: 'landingPromotorSec2Item1Description',
    icon: DevicePhoneMobileIcon,
  },
  {
    name: 'landingPromotorSec2Item2Title',
    description: 'landingPromotorSec2Item2Description',
    icon: ArrowTrendingUpIcon,
  },
  {
    name: 'landingPromotorSec2Item3Title',
    description: 'landingPromotorSec2Item3Description',
    icon: UserGroupIcon,
  },
  {
    name: 'landingPromotorSec2Item4Title',
    description: 'landingPromotorSec2Item4Description',
    icon: ArrowsPointingInIcon,
  },
]

export default function Feature() {
  const t = useTranslations('default')
  return (
    <div
      id="features"
      className="relative isolate mt-20 px-8 py-32 sm:mt-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-display text-base font-semibold leading-7 text-rose-600">
            Promoters Community
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('landingPromotorSec2Title')}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-200">
            {t('landingPromotorSec2Description')}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-rose-600">
                    <feature.icon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </div>
                  {t(feature.name)}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-200">{t(feature.description)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="background relative">
        <div className="absolute z-10 h-full w-full bg-black bg-opacity-85"></div>
        <img
          src="images/team-spg-landing.jpg"
          className="h-full w-full object-cover grayscale-[80%]"></img>
      </div>
    </div>
  )
}
