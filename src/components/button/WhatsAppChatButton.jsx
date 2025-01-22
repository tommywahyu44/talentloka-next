'use client'

import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import ClearIcon from '@mui/icons-material/Clear'
import { Fab } from '@mui/material'
import clsx from 'clsx'
import { useState } from 'react'

export default function WhatsAppChatButton() {
  const currentPath = window.location.pathname
  const whatsappNumber = '6281299880745' // Replace with your WhatsApp number
  let message = encodeURIComponent('Hello, I need support!') // Default message
  const isDashboard = currentPath.includes('dashboard')
  const [expanded, setExpanded] = useState(false);
  const handleClickOptions = (optionName) => {
    if (optionName == 'faq') {
      window.open(`${window.location.origin}/promotor#faq`, '_blank')
      return;
    }
    if (optionName == 'create_event') {
      message = encodeURIComponent('How to create event')
    }
    if (optionName == 'sign_up') {
      message = encodeURIComponent('How to sign up')
    }
    if (optionName == 'search_spg') {
      message = encodeURIComponent('How to search spg')
    }
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
  }

  return (
    <div
      className={clsx(
        'fixed right-5 z-50 grid justify-items-end',
        isDashboard ? 'bottom-[5.5rem] sm:bottom-16' : 'bottom-4'
      )}>
      <div className={clsx('mb-4 grid gap-2 place-items-end', expanded ? null : 'hidden')}>
        <Fab 
          onClick={() => handleClickOptions('faq')}
          sx={{
            backgroundColor: '#f9fafb',
            width: 'max-content',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#1DA851' },
          }}
          variant="extended"
          color="primary">
          <span className='text-gray-800'>FAQ</span>
        </Fab>
        <Fab
          onClick={() => handleClickOptions('create_event')}
          sx={{
            backgroundColor: '#f9fafb',
            width: 'max-content',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#1DA851' },
          }}
          variant="extended"
          color="primary">
            <span className='text-gray-800'>How to create event</span>
        </Fab>
        <Fab 
          onClick={() => handleClickOptions('sign_up')}
          sx={{
            backgroundColor: '#f9fafb',
            width: 'max-content',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#1DA851' },
          }}
          variant="extended"
          color="primary">
          <span className='text-gray-800'>How to sign up</span>
        </Fab>
        <Fab 
          onClick={() => handleClickOptions('search_spg')}
          sx={{
            backgroundColor: '#f9fafb',
            width: 'max-content',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#1DA851' },
          }}
          variant="extended"
          color="primary">
          <span className='text-gray-800'>How to search SPG</span>
        </Fab>
      </div>
      <Fab
        color="success"
        onClick={() => setExpanded(!expanded)}
        sx={{
          backgroundColor: '#25D366',
          '&:hover': { backgroundColor: '#1DA851' },
        }}
        className="shadow-lg">
        <span className={clsx(expanded ? 'hidden' : null)}><WhatsAppIcon sx={{ color: '#ffffff' }}/></span>
        <span className={clsx(expanded ? null : 'hidden')}><ClearIcon sx={{ color: '#ffffff' }}/></span>
      </Fab>
    </div>
  )
}
