'use client'

import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Fab } from '@mui/material'
import clsx from 'clsx'

export default function WhatsAppChatButton() {
  const currentPath = window.location.pathname
  const whatsappNumber = '6281299880745' // Replace with your WhatsApp number
  const message = encodeURIComponent('Hello, I need support!') // Default message
  const isDashboard = currentPath.includes('dashboard')
  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${whatsappNumber}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div
      className={clsx(
        'fixed right-5 z-50',
        isDashboard ? 'bottom-[5.5rem] sm:bottom-16' : 'bottom-4'
      )}>
      <Fab
        color="success"
        onClick={handleClick}
        sx={{
          backgroundColor: '#25D366', // WhatsApp green
          '&:hover': { backgroundColor: '#1DA851' },
        }}
        className="shadow-lg">
        <WhatsAppIcon sx={{ color: '#ffffff' }} />
      </Fab>
    </div>
  )
}
