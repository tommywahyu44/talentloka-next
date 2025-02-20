'use client'

import { usePathname, useRouter } from '@/navigation'
import { MenuItem, Select } from '@mui/material'

export default function LanguageChanger({ locale }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (e) => {
    router.push(pathname, { locale: e.target.value }, { shallow: true })
  }

  const options = [
    { value: 'en', label: 'EN', image: '/images/ic-flag-united-states.png', flag: '🇺🇸' },
    { value: 'id', label: 'ID', image: '/images/ic-flag-indonesia.png', flag: '🇮🇩' },
  ]

  return (
    <Select
      labelId="language-select-label"
      aria-label="language-select-label"
      value={locale}
      onChange={handleChange}
      label="Language"
      sx={{
        '& .MuiOutlinedInput-input': {
          padding: '6px 8px',
        },
      }}>
      {options.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}>
          <div className="mt-1 flex flex-row items-center justify-center">
            <img
              src={option.image}
              alt={option.label}
              style={{
                width: 16,
                height: 16,
                marginRight: 8,
              }}
            />
            <div className="text-xs">{`${option.label}`}</div>
          </div>
        </MenuItem>
      ))}
    </Select>
  )
}
