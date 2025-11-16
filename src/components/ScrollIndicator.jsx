import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ScrollIndicator() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onScroll = () => setHidden(true)
    const id = setTimeout(() => setHidden(true), 3000)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(id)
    }
  }, [])

  if (hidden) return null

  return (
    <div className="absolute left-8 bottom-8 flex items-center gap-3 text-[#2C5F4D]">
      <motion.div
        className="w-px h-16 bg-[#2C5F4D]/80"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      <div className="relative">
        <motion.div
          className="w-2 h-2 rounded-full bg-[#2C5F4D]"
          animate={{ y: [0, 8, 0], opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </div>
      <motion.div
        className="text-xs text-[#FAFAFA]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Scroll to watch barriers dissolve
      </motion.div>
    </div>
  )
}
