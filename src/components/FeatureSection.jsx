import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Cpu, Layers, Sparkles, Activity, ArrowUpRight } from 'lucide-react'

// Hover Tilt Glass Card
const GlassCard = ({ children, className, glowColor = 'rgba(168, 85, 247, 0.15)' }) => {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 220 }
  const tiltX = useSpring(x, springConfig)
  const tiltY = useSpring(y, springConfig)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const { left, top, width, height } = cardRef.current.getBoundingClientRect()
    const cursorX = e.clientX - left
    const cursorY = e.clientY - top
    setMousePos({ x: cursorX, y: cursorY })
    x.set(((cursorX / width) - 0.5) * 12)
    y.set(-((cursorY / height) - 0.5) * 12)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: tiltX,
        rotateX: tiltY,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      className={`glass-panel glass-border-glow p-8 flex flex-col justify-between cursor-pointer group relative overflow-hidden h-[360px] ${className}`}
    >
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 -z-10"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 80%)`
          }}
        />
      )}
      <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }} className="flex-1 flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  )
}

const FeatureSection = () => {
  return (
    <section
      id="features"
      className="relative w-full py-32 px-6 flex flex-col items-center justify-center z-10 bg-transparent"
    >
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="max-w-3xl mb-20 text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-purple-400 font-bold uppercase tracking-wider text-xs mb-3 flex items-center gap-1"
          >
            <Sparkles size={12} />
            Hardware Redefined
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="heading-futuristic text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6"
          >
            Uncompromising Tech.<br />Beautifully Formed.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-400 leading-relaxed font-light max-w-xl"
          >
            Every silicon gate, layer of the Retina glass, and energy cell has been completely reconfigured to create a machine without limits.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* M3 Performance */}
          <GlassCard glowColor="rgba(168, 85, 247, 0.15)">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                <Cpu size={24} />
              </div>
              <ArrowUpRight size={18} className="text-gray-600 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-white mb-2">M3 Ultra Performance</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                A monumental 16-Core architectural beast. Combining 10 performance cores and 6 efficiency cores, pushing throughput benchmarks to unparalleled peaks.
              </p>
            </div>
            <div className="mt-6 flex gap-2 h-12 items-end">
              {[60, 85, 45, 95, 70, 90, 55, 80, 100, 65, 85].map((h, i) => (
                <div key={i} className="flex-1 rounded-t overflow-hidden" style={{ height: '100%' }}>
                  <motion.div
                    animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.3}%`] }}
                    transition={{ repeat: Infinity, duration: 1.2 + i * 0.1, ease: 'easeInOut' }}
                    className="w-full bg-gradient-to-t from-purple-600 to-indigo-400 rounded-t"
                    style={{ marginTop: 'auto' }}
                  />
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Retina Display */}
          <GlassCard glowColor="rgba(59, 130, 246, 0.15)">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <Layers size={24} />
              </div>
              <ArrowUpRight size={18} className="text-gray-600 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-white mb-2">Liquid Extreme Retina</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Dynamic HDR display featuring a peak of 1600 nits contrast. Implemented with 120Hz ProMotion refreshing rate, providing sleek, buttery flow rendering.
              </p>
            </div>
            <div className="mt-6 h-12 w-full rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60 flex items-center justify-center relative overflow-hidden">
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                className="absolute inset-y-0 w-24 bg-white/20 skew-x-12 filter blur-md"
              />
              <span className="text-[10px] tracking-widest font-bold text-white drop-shadow-md">WCG P3 COLOUR ACCURACY</span>
            </div>
          </GlassCard>

          {/* AI Processing */}
          <GlassCard glowColor="rgba(236, 72, 153, 0.15)">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.1)]">
                <Sparkles size={24} />
              </div>
              <ArrowUpRight size={18} className="text-gray-600 group-hover:text-pink-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-white mb-2">Cognitive Neural Core</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Dedicated neural net pipelines mapping high-speed matrix multiplications. Harnessing on-device language engines to compile creative requests in real-time.
              </p>
            </div>
            <div className="mt-6 h-12 w-full glass-panel border border-white/5 flex items-center justify-around px-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-pink-500/5" />
              {[1, 2, 3, 4, 5].map((val) => (
                <div key={val} className="relative flex flex-col items-center">
                  <motion.div
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: val * 0.2 }}
                    className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]"
                  />
                  <div className="w-0.5 h-4 bg-white/10 mt-1" />
                </div>
              ))}
            </div>
          </GlassCard>

          {/* All-Day Battery */}
          <GlassCard glowColor="rgba(16, 185, 129, 0.15)">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <Activity size={24} />
              </div>
              <ArrowUpRight size={18} className="text-gray-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-white mb-2">Sustained Battery Life</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Uninterrupted 22-Hour development capability. Leveraging thermodynamic distribution cells to sustain high workloads without engaging cooling fans.
              </p>
            </div>
            <div className="mt-6 h-12 w-full glass-panel border border-white/5 flex items-center px-4 relative">
              <div className="flex items-center gap-1.5 w-full">
                <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '92%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.6)]"
                  />
                </div>
                <span className="text-[10px] font-bold text-emerald-400 font-mono">92%</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
