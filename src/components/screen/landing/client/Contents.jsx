'use client'

import { CheckIcon } from '@heroicons/react/20/solid'
import { Quote, Sparkles, Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

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

const testimonials = [
  {
    company: 'Deltomed',
    text: "Compared to others we've worked with, Talentloka's SPGs are a step ahead. They handle sampling smoothly, know how to approach customers, and actually bring traffic to the booth. Makes a real difference in engagement!",
    image:
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=300&q=80',
  },
  {
    company: 'Amidis',
    text: "We started with offline activations, then tried Talentloka's online platform—super efficient. The SPGs are well-prepared, communicate our brand message clearly, and really know how to engage with customers.",
    image:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=300&q=80',
  },
  {
    company: 'OT Group',
    text: "From in-store activations to product sampling, Talentloka's SPGs have been a great support. Well-trained, engaging, and they deliver exactly what we need.",
    image:
      'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&w=300&q=80',
  },
  {
    company: 'Topgolf',
    text: "We got referred to Talentloka, and their SPGs didn't disappoint. Great energy, professional, and they really understand the crowd. Especially impressed with their knowledge of golf—makes a big difference!",
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=300&q=80',
  },
  {
    company: 'FDR Tire',
    text: "Finding SPGs who can confidently represent an automotive brand, especially with technical knowledge, isn't easy. Talentloka nailed it—the team is reliable, proactive, and knows how to engage the right audience.",
    image:
      'https://images.unsplash.com/photo-1518306727298-4c17e1bf6942?auto=format&fit=crop&w=300&q=80',
  },
  {
    company: 'Focallure',
    text: 'We urgently needed 20 SPGs, and Talentloka came through fast. They found the right talents, customized everything to fit our needs, and made the whole process hassle-free.',
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Contents() {
  const t = useTranslations('default')
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalPairs = Math.ceil(testimonials.length / 2)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === totalPairs - 1 ? 0 : prevIndex + 1))
    }, 5000)

    return () => clearInterval(timer)
  }, [totalPairs])

  const TestimonialCard = ({ testimonial }) => (
    <div className="group relative">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-400 to-purple-600 opacity-25 blur transition-opacity duration-300 group-hover:opacity-40"></div>
      <div className="relative h-full rounded-2xl border border-rose-100 bg-white/90 p-8 backdrop-blur-sm transition-all duration-300 hover:border-rose-300">
        <div className="absolute -top-6 left-8 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 p-2">
          <Quote className="h-8 w-8 text-white" />
        </div>

        <div className="flex h-full flex-col">
          <div className="flex-1">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-full">
                <img
                  src={testimonial.image}
                  alt={testimonial.company}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-lg font-semibold text-transparent">
                  {testimonial.company}
                </h4>
                <p className="flex items-center gap-1 text-gray-600">
                  Verified Client <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </p>
              </div>
            </div>
            <p className="text-lg leading-relaxed text-gray-700">{testimonial.text}</p>
          </div>

          <div className="mt-6 flex justify-end">
            <Sparkles className="h-6 w-6 text-rose-500 opacity-50" />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-white">
      {/* Feature section */}
      <div
        id="product"
        className="mt-32 sm:mt-56">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="section-caption-gradient text-base font-medium leading-7 text-rose-600">
              Feature
            </h2>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              <span className="">{t('landingClientSec3Title1')}</span>{' '}
              {t('landingClientSec3Title2')}
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              {t('landingClientSec3Description')}
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

      {/* Pricing Plan */}
      <div
        id="pricing"
        className="relative isolate mt-12 bg-white px-6 py-24 sm:py-32 lg:mt-24 lg:px-8">
        {/* <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-rose-200 to-pink-200"
          />
        </div> */}
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 className="section-caption-gradient text-base font-medium leading-7 text-rose-600">
            Pricing
          </h2>
          <p className="mt-2 text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
            {t('landingClientSec5Title')}
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-600">
          {t('landingClientSec5Description')}
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
                'rounded-3xl p-8 ring-1 ring-slate-900/10 sm:p-10'
              )}>
              <h3
                id={tier.id}
                className={classNames(
                  tier.featured ? 'text-white' : 'text-rose-600',
                  'text-base font-medium leading-7'
                )}>
                {tier.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span
                  className={classNames(
                    tier.featured ? 'text-white' : 'text-slate-900',
                    'text-5xl font-medium tracking-tight'
                  )}>
                  {tier.priceMonthly}
                </span>
                <span
                  className={classNames(
                    tier.featured ? 'text-white' : 'text-slate-500',
                    'text-base'
                  )}>
                  /day
                </span>
              </p>
              <p
                className={classNames(
                  tier.featured ? 'text-white' : 'text-slate-600',
                  'mt-6 text-base leading-7'
                )}>
                {tier.description}
              </p>
              <ul
                role="list"
                className={classNames(
                  tier.featured ? 'text-white' : 'text-slate-600',
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
                  'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10'
                )}>
                Get started today
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <section className="relative overflow-hidden py-24">
        {/* Background decorations */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,99,99,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.1),transparent_50%)]"></div> */}

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="section-caption-gradient text-base font-medium leading-7 text-rose-600">
              Testimonial
            </h2>
            <h2 className="mb-4 mt-2 text-4xl font-medium text-black">What Our Clients Say</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Real feedback from our valued partners who have experienced the excellence of our
              services
            </p>
          </div>

          <div className="relative min-h-[400px]">
            {Array.from({ length: totalPairs }).map((_, pairIndex) => {
              const firstIndex = pairIndex * 2
              const secondIndex = firstIndex + 1

              return (
                <div
                  key={pairIndex}
                  className={`absolute grid w-full grid-cols-1 gap-8 transition-all duration-700 ease-in-out md:grid-cols-2 ${
                    pairIndex === currentIndex
                      ? 'translate-x-0 opacity-100'
                      : 'translate-x-full opacity-0'
                  }`}>
                  <TestimonialCard testimonial={testimonials[firstIndex]} />
                  {secondIndex < testimonials.length && (
                    <TestimonialCard testimonial={testimonials[secondIndex]} />
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-12 flex justify-center gap-3">
            {Array.from({ length: totalPairs }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? 'h-3 w-12 rounded-full bg-gradient-to-r from-rose-500 to-purple-600'
                    : 'h-3 w-3 rounded-full bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial pair ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
