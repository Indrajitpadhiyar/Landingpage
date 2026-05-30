import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Loader = ({ onFinish }) => {
  const [phase, setPhase] = useState('draw') // draw -> fill -> shine -> exit -> gone

  // Reliable timer-based phase transitions instead of fragile onAnimationComplete chains
  useEffect(() => {
    let timer

    switch (phase) {
      case 'draw':
        // Drawing the Apple SVG paths takes ~2.5s (0.5s delay + 2.0s stroke animation)
        timer = setTimeout(() => setPhase('fill'), 2800)
        break
      case 'fill':
        // Fill animation is 0.8s + 0.15s delay
        timer = setTimeout(() => setPhase('shine'), 1000)
        break
      case 'shine':
        // Shine sweep is 1.0s + 0.2s delay
        timer = setTimeout(() => setPhase('exit'), 1400)
        break
      case 'exit':
        // Exit fade is 0.8s + 0.3s delay
        timer = setTimeout(() => {
          setPhase('gone')
          onFinish?.()
        }, 1200)
        break
      default:
        break
    }

    return () => clearTimeout(timer)
  }, [phase, onFinish])

  return (
    <AnimatePresence>
      {phase !== 'gone' && (
        <motion.div
          className="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative flex items-center justify-center">
            {/* Apple Logo SVG — drawn with stroke animation */}
            <motion.svg
              width="120"
              height="148"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {/* Leaf */}
              <motion.path
                d="M11.182 1.008C11.148 0.97 9.923 1.023 8.857 2.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43"
                stroke="white"
                strokeWidth="0.4"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }}
              />

              {/* Apple Body */}
              <motion.path
                d="M14.496 12.741c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"
                stroke="white"
                strokeWidth="0.4"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.0, ease: 'easeInOut', delay: 0.5 }}
              />

              {/* Filled versions that fade in after drawing */}
              {/* Leaf Fill */}
              <motion.path
                d="M11.182 1.008C11.148 0.97 9.923 1.023 8.857 2.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43"
                fill="white"
                initial={{ opacity: 0 }}
                animate={phase === 'fill' || phase === 'shine' || phase === 'exit' ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />

              {/* Body Fill */}
              <motion.path
                d="M14.496 12.741c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"
                fill="white"
                initial={{ opacity: 0 }}
                animate={phase === 'fill' || phase === 'shine' || phase === 'exit' ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
              />
            </motion.svg>

            {/* Shine Effect — sweeps across the logo once fill completes */}
            <AnimatePresence>
              {phase === 'shine' && (
                <motion.div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 45%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.9) 55%, transparent 100%)',
                      width: '60%',
                      height: '200%',
                      top: '-50%',
                    }}
                    initial={{ x: '-120%', rotate: 25 }}
                    animate={{ x: '280%' }}
                    transition={{
                      duration: 1.0,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.2
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Outer Glow Ring that appears during shine */}
            <AnimatePresence>
              {(phase === 'shine' || phase === 'fill') && (
                <motion.div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 200,
                    height: 200,
                    background: 'radial-gradient(circle, rgba(168,85,247,0.15), rgba(59,130,246,0.08), transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 1 }}
                  exit={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Exit animation: after shine completes, the loader overlay fades out */}
          {phase === 'exit' && (
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loader
