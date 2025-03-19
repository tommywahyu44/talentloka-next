import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const banners = [
  { text: 'Use code WELCOME10 for 10% off your first SPG booking!', bgColor: 'bg-rose-500' },
  { text: 'Bundle & Save! Get up to 15% off when hiring multiple SPGs!', bgColor: 'bg-rose-500' },
  {
    text: 'Join now and connect with top Sales Promotion Girls for your events!',
    bgColor: 'bg-rose-500',
  },
]

export default function PromoBanner() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % banners.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative flex h-8 w-full items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className={`absolute w-full py-4 text-center text-xs text-white ${banners[index].bgColor}`}>
          {banners[index].text}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
