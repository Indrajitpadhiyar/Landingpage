import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BurnTransition = () => {
  const containerRef = useRef(null)
  const burnLineRef = useRef(null)

  const sparkCount = 35
  const sparksArray = Array.from({ length: sparkCount })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const sparks = container.querySelectorAll('.burn-spark')
    
    const ctx = gsap.context(() => {
      // 1. Sweeping Burn Wave Line
      gsap.fromTo(
        burnLineRef.current,
        {
          y: '-10vh',
          scaleY: 1
        },
        {
          y: '110vh',
          scaleY: 1.5,
          scrollTrigger: {
            trigger: '#stats', // Triggers as StatsSection scrolls up
            start: 'top bottom',
            end: 'top top',
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Fade the burn line in and out elegantly at the screen bounds
              if (burnLineRef.current) {
                const opacity = Math.sin(self.progress * Math.PI)
                burnLineRef.current.style.opacity = opacity.toString()
              }
            }
          }
        }
      )

      // 2. Swarm of Floating Embers (fly up, sway, fade out)
      sparks.forEach((spark, index) => {
        // Random variables for natural chaotic look
        const xOffset = Math.random() * 90 + 5 // left position percent
        const floatDistance = Math.random() * 60 + 50 // distance to float up
        const xSway = (Math.random() - 0.5) * 150 // horizontal drift
        const rotation = (Math.random() - 0.5) * 720
        const scale = Math.random() * 4 + 2 // random size in px
        
        // Spawn sparks stagger-linked to the sweep progress
        const spawnRatio = index / sparkCount

        gsap.fromTo(
          spark,
          {
            left: `${xOffset}%`,
            y: `${110 - spawnRatio * 30}vh`,
            x: 0,
            opacity: 0,
            scale: 0.5,
            rotation: 0
          },
          {
            y: `${20 - spawnRatio * 60}vh`,
            x: xSway,
            opacity: () => Math.random() * 0.8 + 0.2,
            scale: scale / 4,
            rotation: rotation,
            scrollTrigger: {
              trigger: '#stats',
              start: 'top bottom',
              end: 'top top',
              scrub: 1.5, // slightly lag the embers for high-fidelity lag feel
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                // Fade out embers as they reach the top
                const progress = self.progress
                const distToTop = 1 - progress
                spark.style.opacity = (Math.sin(progress * Math.PI) * distToTop).toString()
              }
            }
          }
        )
      })
    }, container)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-30 overflow-hidden"
    >
      {/* The Hot Sweeping Laser Burn Line */}
      <div
        ref={burnLineRef}
        className="burn-line opacity-0"
      />

      {/* Fiery Embers Sparks */}
      {sparksArray.map((_, i) => (
        <div
          key={i}
          className="burn-spark absolute"
          style={{
            width: '6px',
            height: '6px'
          }}
        />
      ))}
    </div>
  )
}

export default BurnTransition
