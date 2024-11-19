'use client'

import { useRouter, usePathname } from '@/navigation'
import Image from 'next/image'

export default function LanguageChanger({ locale }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (e) => {
    router.push(pathname, { locale: e.target.value }, { shallow: true })
  }

  const options = [
    { value: 'en', label: 'EN', image: '/images/ic-flag-united-states.png', flag: '🇺🇸' },
    { value: 'id', label: 'ID', image: '/images/ic-flag-indonesia.png', flag: '🇮🇩' },
    { value: 'ms', label: 'MY', image: '/images/ic-flag-malaysia.png', flag: '🇲🇾' },
    { value: 'th', label: 'TH', image: '/images/ic-flag-thailand.png', flag: '🇹🇭' },
    { value: 'vi', label: 'VN', image: '/images/ic-flag-vietnam.png', flag: '🇻🇳' },
  ]

  return (
    <select
      value={locale}
      onChange={handleChange}
      className="w-18 block rounded-lg border border-stone-300 bg-stone-50 py-2.5 pl-2 text-sm text-stone-900 focus:outline-none">
      {options.map((option, i) => (
        <option
          key={option.value}
          value={option.value}>
          {`${option.flag} ${option.label}`}
        </option>
      ))}
    </select>
  )
}
