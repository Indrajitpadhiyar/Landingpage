import React, { useRef, useEffect, useState } from 'react'
import { Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import HpContainer from './components/HpContainer'
import Navbar from './components/Navbar'
import FeatureSection from './components/FeatureSection'
import StatsSection from './components/StatsSection'
import ShowcaseSection from './components/ShowcaseSection'
import ProductSection from './components/ProductSection'
import GlassShatterTransition from './components/GlassShatterTransition'
import BurnTransition from './components/BurnTransition'
import Loader from './components/Loader'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  const scrollProgress = useRef({ value: 0 })
  const heroTextRef = useRef(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Block scroll while loader is active
    if (loading) {
      document.body.style.overflow = 'hidden'
      return
    }

    // Restore scroll after loader completes
    document.body.style.overflow = ''

    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', () => {
      ScrollTrigger.update()
    })

    const updateLenis = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateLenis)

    gsap.ticker.lagSmoothing(0)

    // GSAP ScrollTrigger for laptop screen opening and hero text fading
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero-section',
        pin: true,
        start: 'top top',
        end: '+=120%',
        scrub: 1,
        invalidateOnRefresh: true,
      }
    })

    tl.to(scrollProgress.current, {
      value: 1,
      ease: 'none',
    }, 0)

    tl.to(heroTextRef.current, {
      opacity: 0,
      y: -80,
      scale: 0.95,
      ease: 'power1.inOut',
    }, 0)

    // Force a ScrollTrigger refresh after a short delay to ensure correct offsets
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    return () => {
      clearTimeout(timer)
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [loading])

  return (
    <div className='w-full font-[Helvetica_Now_Display] bg-black text-white relative'>
      {/* ========== APPLE LOGO LOADER ========== */}
      <Loader onFinish={() => setLoading(false)} />

      {/* ========== AMBIENT FLOATING BACKGROUND ========== */}
      <div className="ambient-bg">
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
        <div className="ambient-orb ambient-orb-3" />
      </div>

      {/* ========== CREATIVE VIEWPORT TRANSITION OVERLAYS ========== */}
      <GlassShatterTransition />
      <BurnTransition />

      {/* ========== ORIGINAL HERO SECTION (PINNED & OPTIMIZED) ========== */}
      <div id="hero-section" className='relative w-full h-screen overflow-hidden bg-transparent'>
        <Navbar />
        <div ref={heroTextRef} className='absolute flex flex-col items-center top-42 left-1/2 -translate-x-1/2 text-white text-center z-10 pointer-events-none'>
          <h3 className='masked text-7xl tracking-tighter font-bold'>macbook pro.</h3>
          <h5>Oh so pro !</h5>
          <p className='text-center w-3/4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum odio molestiae velit sunt!</p>
        </div>
        <Canvas camera={{ fov: 25, position: [0, -10, 120] }}>
          <Environment files={['https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/studio_small_09_4k.hdr']} />
          <HpContainer scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      {/* ========== NEW SECTIONS BELOW ========== */}
      <FeatureSection />
      <StatsSection />
      <ShowcaseSection loading={loading} />
      <ProductSection />
    </div>
  )
}

export default App
