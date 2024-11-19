import { useTranslations } from 'next-intl'
import { CheckIcon } from '@heroicons/react/20/solid'

const tiers = [
  {
    name: 'Festival',
    id: 'tier-festival',
    href: '#',
    priceMonthly: 'Rp 2 mil',
    description: "The perfect plan if you're just getting started with our platform.",
    features: ['6 SPG', '1 Event Organizer', 'Up to 3 Booths'],
    featured: false,
  },
  {
    name: 'Expo',
    id: 'tier-expo',
    href: '#',
    priceMonthly: 'Rp 5 mil',
    description: 'Dedicated support and infrastructure for your company.',
    features: ['20 SPG', '3 Event Organizer', 'Unlimited Booths', '24-hour support response time'],
    featured: true,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Contents() {
  const t = useTranslations('default')
  return (
    <div className="bg-white">
      {/* Feature section */}
      <div
        id="product"
        className="mt-32 sm:mt-56">
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

      {/* Testimonials */}
      <div
        id="testimonial"
        className="mt-48 bg-gradient-to-r from-rose-50 to-pink-50 py-24 sm:py-32 lg:mt-60">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20">
              <img
                alt=""
                src="/images/partner-mayora.png"
                className="contrast-full h-12 self-start"
              />
              <figure className="mt-10 flex flex-auto flex-col justify-between">
                <blockquote className="text-lg leading-8 text-stone-800">
                  <p>
                    “Partnering with Talentvis has been a game-changer for our events. Their
                    extensive talent pool has consistently provided us with exceptional individuals
                    who perfectly embody our brand. The platform`s user-friendly interface and
                    efficient organization have streamlined our recruitment process, allowing us to
                    focus on delivering unforgettable experiences.”
                  </p>
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-x-6">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-14 w-14 rounded-full bg-stone-800"
                  />
                  <div className="text-base">
                    <div className="font-semibold text-rose-600">Judith Black</div>
                    <div className="mt-1 text-stone-600">Head Marketing of Mayora</div>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div className="flex flex-col border-t border-white/10 pt-10 sm:pt-16 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-20">
              <img
                alt=""
                src="/images/partner-djarum.png"
                className="contrast-full h-12 self-start"
              />
              <figure className="mt-10 flex flex-auto flex-col justify-between">
                <blockquote className="text-lg leading-8 text-stone-800">
                  <p>
                    “We`ve had the pleasure of working with Talentvis on multiple events, and their
                    dedication to quality is unmatched. The talent they connect us with consistently
                    exceeds our expectations, bringing energy, enthusiasm, and a deep understanding
                    of our brand. Their efficient event organization ensures a seamless experience
                    for both our clients and the talent.”
                  </p>
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-x-6">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-14 w-14 rounded-full bg-stone-800"
                  />
                  <div className="text-base">
                    <div className="font-semibold text-rose-600">Joseph Rodriguez</div>
                    <div className="mt-1 text-stone-600">General Manager of Djarum</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Plan */}
      <div
        id="pricing"
        className="relative isolate mt-12 bg-white px-6 py-24 sm:py-32 lg:mt-24 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-rose-200 to-pink-200"
          />
        </div>
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 className="text-base font-semibold leading-7 text-rose-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            Our bundle package for you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-stone-600">
          Qui iusto aut est earum eos quae. Eligendi est at nam aliquid ad quo reprehenderit in
          aliquid fugiat dolorum voluptatibus.
        </p>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.featured
                  ? 'relative bg-gradient-to-br from-rose-600 to-rose-400'
                  : 'bg-white/60 sm:mx-8 lg:mx-0',
                tier.featured
                  ? ''
                  : tierIdx === 0
                    ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none'
                    : 'sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl',
                'rounded-3xl p-8 ring-1 ring-stone-900/10 sm:p-10'
              )}>
              <h3
                id={tier.id}
                className={classNames(
                  tier.featured ? 'text-white' : 'text-rose-600',
                  'text-base font-semibold leading-7'
                )}>
                {tier.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span
                  className={classNames(
                    tier.featured ? 'text-white' : 'text-stone-900',
                    'text-5xl font-bold tracking-tight'
                  )}>
                  {tier.priceMonthly}
                </span>
                <span
                  className={classNames(
                    tier.featured ? 'text-white' : 'text-stone-500',
                    'text-base'
                  )}>
                  /day
                </span>
              </p>
              <p
                className={classNames(
                  tier.featured ? 'text-white' : 'text-stone-600',
                  'mt-6 text-base leading-7'
                )}>
                {tier.description}
              </p>
              <ul
                role="list"
                className={classNames(
                  tier.featured ? 'text-white' : 'text-stone-600',
                  'mt-8 space-y-3 text-sm leading-6 sm:mt-10'
                )}>
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-x-3">
                    <CheckIcon
                      aria-hidden="true"
                      className={classNames(
                        tier.featured ? 'text-white' : 'text-rose-600',
                        'h-6 w-5 flex-none'
                      )}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.featured
                    ? 'bg-rose-700 text-white shadow-sm hover:bg-rose-600 focus-visible:outline-rose-500'
                    : 'text-rose-600 ring-1 ring-inset ring-rose-200 hover:ring-rose-500 focus-visible:outline-rose-600',
                  'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10'
                )}>
                Get started today
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
