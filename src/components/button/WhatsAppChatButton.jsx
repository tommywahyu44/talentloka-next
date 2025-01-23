'use client'

import ClearIcon from '@mui/icons-material/Clear'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Fab } from '@mui/material'
import clsx from 'clsx'
import { useState } from 'react'

const whatsappNumber = '6281299880745' // Replace with your WhatsApp number

const options = [
  {
    action: `${window.location.origin}/promotor#faq`,
    label: 'FAQ',
  },
  {
    action: 'How to create event',
    label: 'How to create event',
  },
  {
    action: 'How to sign up',
    label: 'How to sign up',
  },
  {
    action: 'How to search SPG',
    label: 'How to search SPG',
  },
]

function handleClickOptions(option) {
  let message = ''
  if (option.label === 'FAQ') {
    window.location.replace(option.action)
  } else {
    message = encodeURIComponent(option.action)
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
  }
}

export default function WhatsAppChatButton() {
  const [expanded, setExpanded] = useState(false)
  const currentPath = window.location.pathname
  const isDashboard = currentPath.includes('dashboard')

  const commonButtonStyles = {
    backgroundColor: '#f9fafb',
    width: 'max-content',
    textTransform: 'none',
    fontSize: 14, // Assuming you want smaller font size
    color: 'text.primary', // Assuming you have a theme for color
    '&:hover': { backgroundColor: '#e8f5e9' },
  }

  return (
    <div
      className={clsx(
        'fixed right-5 z-50 grid justify-items-end',
        isDashboard ? 'bottom-[5.5rem] sm:bottom-16' : 'bottom-4'
      )}>
      <div className={clsx('mb-4 grid place-items-end gap-2', expanded ? null : 'hidden')}>
        {options.map((option) => (
          <Fab
            key={option.label}
            onClick={() => handleClickOptions(option)}
            sx={commonButtonStyles}
            variant="extended">
            <span>{option.label}</span>
          </Fab>
        ))}
      </div>
      <Fab
        color="success"
        onClick={() => setExpanded(!expanded)}
        sx={{
          backgroundColor: '#25D366',
          '&:hover': { backgroundColor: '#1DA851' },
        }}
        className="shadow-lg">
        <span className={clsx(expanded ? 'hidden' : null)}>
          <WhatsAppIcon sx={{ color: '#ffffff' }} />
        </span>
        <span className={clsx(expanded ? null : 'hidden')}>
          <ClearIcon sx={{ color: '#ffffff' }} />
        </span>
      </Fab>
    </div>
  )
}
