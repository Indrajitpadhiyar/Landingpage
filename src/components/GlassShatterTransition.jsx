import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GlassShatterTransition = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const shards = container.querySelectorAll('.glass-shard')
    
    // Map individual 3D scatter vectors for each shard
    const shatterVectors = [
      { x: -80, y: -80, rx: -90, ry: 45, rz: -35 },   // Shard 1 (Top Left)
      { x: 80, y: -80, rx: 90, ry: -45, rz: 35 },     // Shard 2 (Top Right)
      { x: 0, y: -120, rx: -60, ry: 60, rz: 45 },     // Shard 3 (Top Center)
      { x: -120, y: 0, rx: 45, ry: -90, rz: -45 },     // Shard 4 (Far Left)
      { x: 120, y: 0, rx: -45, ry: 90, rz: 45 },      // Shard 5 (Far Right)
      { x: -80, y: 80, rx: 90, ry: 60, rz: -60 },     // Shard 6 (Bottom Left)
      { x: 80, y: 80, rx: -90, ry: -60, rz: 60 },     // Shard 7 (Bottom Right)
      { x: 0, y: 120, rx: 60, ry: 45, rz: -45 }       // Shard 8 (Bottom Center)
    ]

    const ctx = gsap.context(() => {
      shards.forEach((shard, index) => {
        const vec = shatterVectors[index] || { x: 0, y: -100, rx: 45, ry: 45, rz: 45 }
        
        gsap.fromTo(
          shard,
          {
            xPercent: 0,
            yPercent: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            opacity: 1,
            scale: 1,
          },
          {
            xPercent: vec.x,
            yPercent: vec.y,
            rotateX: vec.rx,
            rotateY: vec.ry,
            rotateZ: vec.rz,
            opacity: 0,
            scale: 0.8,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: '#features', // shatter triggers as features scrolls up
              start: 'top bottom', // when Features reaches bottom of screen
              end: 'top top',    // when Features reaches top of screen
              scrub: true,
              invalidateOnRefresh: true,
            }
          }
        )
      })
    }, container)

    return () => {
      ctx.revert()
    }
  }, [])

  // Coordinates of our 8 shards that form a seamless whole pane
  const shardStyles = [
    { clipPath: 'polygon(0% 0%, 50% 0%, 25% 50%)' },   // 1
    { clipPath: 'polygon(50% 0%, 100% 0%, 75% 50%)' }, // 2
    { clipPath: 'polygon(50% 0%, 25% 50%, 75% 50%)' }, // 3
    { clipPath: 'polygon(0% 0%, 25% 50%, 0% 100%)' },   // 4
    { clipPath: 'polygon(100% 0%, 75% 50%, 100% 100%)' },// 5
    { clipPath: 'polygon(25% 50%, 0% 100%, 50% 100%)' }, // 6
    { clipPath: 'polygon(75% 50%, 50% 100%, 100% 100%)' },// 7
    { clipPath: 'polygon(25% 50%, 75% 50%, 50% 100%)' }  // 8
  ]

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-40 overflow-hidden"
      style={{ perspective: 1000 }}
    >
      {shardStyles.map((style, i) => (
        <div
          key={i}
          className="glass-shard"
          style={style}
        />
      ))}
    </div>
  )
}

export default GlassShatterTransition
