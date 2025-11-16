import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const items = [
  'Average 42% reduction in process delays',
  'AI-diagnosed workflow mapping in under 48 hours',
  'Trusted by teams across Norway',
]

export default function DataTicker() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="h-6 overflow-hidden font-['Space_Mono',monospace] text-[14px] tracking-tight text-[#2C5F4D]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="whitespace-nowrap"
        >
          {items[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
