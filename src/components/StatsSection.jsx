import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const StatCard = ({ label, targetValue, suffix, decimal = false, highlight = false }) => {
  const countRef = useRef(null)

  useEffect(() => {
    const element = countRef.current
    if (!element) return

    const counter = { value: 0 }

    const countTween = gsap.to(counter, {
      value: targetValue,
      duration: 2.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 88%',
        once: true
      },
      onUpdate: () => {
        if (decimal) {
          element.innerText = counter.value.toFixed(1) + suffix
        } else {
          element.innerText = Math.floor(counter.value).toLocaleString() + suffix
        }
      }
    })

    return () => {
      countTween.kill()
    }
  }, [targetValue, suffix, decimal])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-panel glass-border-glow p-8 flex flex-col justify-between items-center text-center relative overflow-hidden ${
        highlight ? 'bg-gradient-to-b from-purple-500/5 to-blue-500/5' : ''
      }`}
      style={{ backgroundColor: highlight ? undefined : 'rgba(10, 10, 14, 0.4)' }}
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />
      <span
        ref={countRef}
        className="heading-gradient text-5xl sm:text-7xl lg:text-[85px] font-extrabold tracking-tighter mb-4 block min-h-[90px]"
        style={{ fontFamily: 'var(--font-syne)' }}
      >
        0
      </span>
      <div className="flex flex-col gap-1 z-10">
        <span className="text-white text-sm font-semibold tracking-wide">{label}</span>
        <span className="text-gray-500 text-[11px] uppercase tracking-widest font-medium">Verified Benchmark</span>
      </div>
    </motion.div>
  )
}

const StatsSection = () => {
  return (
    <section
      id="stats"
      className="relative w-full py-32 px-6 flex flex-col items-center justify-center z-10 bg-transparent border-t border-white/5"
    >
      <div className="w-full max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-blue-400 font-bold uppercase tracking-wider text-xs mb-3"
          >
            Empirical Architecture
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="heading-futuristic text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6"
          >
            Engineering Telemetry
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-gray-400 font-light leading-relaxed max-w-lg mx-auto"
          >
            Real metrics recorded under intensive compile, render, and synthesis environments. Zero compromises, pure efficiency.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          <StatCard label="All-Day Battery Life" targetValue={22} suffix=" Hours" />
          <StatCard label="Compiling Performance" targetValue={2.2} suffix="x" decimal highlight />
          <StatCard label="Architectural Transistors" targetValue={16} suffix="B" />
          <StatCard label="Fluid ProMotion Display" targetValue={120} suffix="Hz" />
        </div>
      </div>
    </section>
  )
}

export default StatsSection
