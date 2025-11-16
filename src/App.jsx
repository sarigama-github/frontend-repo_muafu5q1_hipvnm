import { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { motion, useScroll, useTransform } from 'framer-motion'
import DataTicker from './components/DataTicker'
import ScrollIndicator from './components/ScrollIndicator'

function App() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })

  // Scroll-driven transforms for hero content and 3D
  const networkY = useTransform(scrollYProgress, [0, 1], [0, -150])
  const networkScale = useTransform(scrollYProgress, [0, 1], [1, 0.75])
  const headlineOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])
  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.9])

  useEffect(() => {
    // Smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <div ref={containerRef} className="min-h-[200vh] bg-[#1A1A1A] text-[#FAFAFA]">
      {/* Fluid gradient mesh background */}
      <motion.div
        aria-hidden
        style={{ opacity: bgOpacity }}
        className="pointer-events-none fixed inset-0"
      >
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(1200px 800px at 20% 30%, rgba(44,95,77,0.35), transparent 60%), radial-gradient(1000px 700px at 80% 70%, rgba(44,95,77,0.25), transparent 60%)'
        }} />
        <div className="absolute inset-0 mix-blend-overlay opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '6px 6px'
        }} />
      </motion.div>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Spline 3D Cover - right bias */}
        <motion.div
          style={{ y: networkY, scale: networkScale }}
          className="absolute right-0 top-0 h-full w-[60%]"
        >
          <Spline scene="https://prod.spline.design/Gt5HUob8aGDxOUep/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </motion.div>

        {/* Left content */}
        <div className="relative z-10 h-full w-full flex items-center">
          <div className="px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 w-[55%] max-w-[880px]">
            <motion.h1
              style={{ opacity: headlineOpacity, scale: headlineScale }}
              className="font-['Playfair_Display',serif] text-[44px] sm:text-[56px] lg:text-[64px] leading-[1.05] tracking-[-0.02em] text-[#FAFAFA]"
            >
              <span className="block">We Remove</span>
              <span className="block">Bottlenecks.</span>
              <span className="block">With Precision.</span>
              <span className="block">With AI.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 text-[18px] text-[#999999] max-w-[60ch]"
            >
              Engineering operational clarity for companies that demand measurable flow, speed, and efficiency.
            </motion.p>

            <div className="mt-6">
              <DataTicker />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-10"
            >
              <a
                href="#how"
                className="inline-flex items-center gap-2 bg-[#2C5F4D] hover:shadow-[0_10px_30px_rgba(44,95,77,0.35)] hover:-translate-y-1 transition-all text-white px-6 py-3 rounded-md text-[16px]"
              >
                See How We Unblock Systems →
              </a>
            </motion.div>
          </div>
        </div>

        {/* Overlay gradient to ensure readability over 3D */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[60%] bg-gradient-to-l from-[#1A1A1A] via-[#1A1A1A]/40 to-transparent" />

        <ScrollIndicator />
      </section>

      {/* Anchor section to demonstrate scroll transition */}
      <section id="how" className="relative z-10 bg-[#141414] border-t border-white/5">
        <div className="mx-auto px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-24">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-['Playfair_Display',serif] text-[40px] text-white tracking-[-0.02em]">From Complexity to Clarity</h2>
              <p className="mt-4 text-[#BFBFBF] max-w-prose">
                We analyze your end-to-end workflows, identify friction points, and redesign your operational systems for smooth, measurable flow. Our AI-driven diagnostics surface constraints, while our systems design establishes resilient paths that keep teams moving.
              </p>
            </div>
            <ul className="space-y-6 text-[#D4D4D4]">
              <li className="flex gap-3"><span className="text-[#2C5F4D]">•</span> Constraint mapping powered by AI</li>
              <li className="flex gap-3"><span className="text-[#2C5F4D]">•</span> Rapid diagnostics within 48 hours</li>
              <li className="flex gap-3"><span className="text-[#2C5F4D]">•</span> Scandinavian minimal delivery with enterprise rigor</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
