import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PenTool, Terminal, Film, Brain, ArrowRight, Layers, Settings, Play, Database, Cpu, Sparkles, Sliders, CheckCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const ShowcaseSection = ({ loading }) => {
  const containerRef = useRef(null)
  const triggerRef = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    if (loading) return

    const container = containerRef.current
    if (!container) return

    const totalSlides = 4
    const pin = gsap.fromTo(
      container,
      { translateX: 0 },
      {
        translateX: () => -(container.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${container.scrollWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Track the active slide dynamically based on horizontal scroll progress
            const progress = self.progress
            const slideIndex = Math.min(
              totalSlides - 1,
              Math.floor(progress * totalSlides)
            )
            setActiveSlide(slideIndex)
          }
        }
      }
    )

    return () => {
      pin.kill()
    }
  }, [loading])

  const workflows = [
    {
      title: 'Design Studio',
      subtitle: 'Retina Vector Engine',
      description: 'Zero-latency vector rendering with real-time hardware-accelerated color profiling. Experience absolute accuracy on P3 color space with sub-pixel alignment.',
      icon: <PenTool size={22} className="text-purple-400" />,
      color: 'from-purple-500/10 to-indigo-500/5',
      glow: 'shadow-[0_0_50px_rgba(168,85,247,0.15)]',
      element: (
        <div className="relative w-full h-full flex flex-col p-4 cyber-grid">
          {/* Mock Vector Header */}
          <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3 z-10">
            <div className="flex gap-1.5 items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
              <span className="text-[10px] text-gray-400 font-medium font-mono uppercase tracking-wider">Aether Designer Pro</span>
            </div>
            <div className="flex gap-2 text-[9px] font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded">
              <span>ZOOM: 1600%</span>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-3 gap-3">
            {/* Left side Layers panel */}
            <div className="glass-panel p-2 border-white/5 flex flex-col justify-between text-[9px] font-mono text-gray-400">
              <div className="space-y-1.5">
                <span className="text-[8px] text-gray-600 block mb-1">LAYERS</span>
                <div className="flex items-center gap-1 bg-white/5 text-purple-300 p-1 rounded border border-purple-500/20">
                  <Layers size={10} />
                  <span className="truncate">Bezier Path 1</span>
                </div>
                <div className="flex items-center gap-1 p-1">
                  <Layers size={10} className="text-gray-600" />
                  <span className="truncate">Mesh Fill 2</span>
                </div>
                <div className="flex items-center gap-1 p-1">
                  <Layers size={10} className="text-gray-600" />
                  <span className="truncate">Aurora Glow</span>
                </div>
              </div>
              
              <div className="border-t border-white/5 pt-2 space-y-1">
                <div className="flex justify-between">
                  <span>X: 142px</span>
                  <span>Y: 88px</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[75%] h-full bg-purple-500" />
                </div>
              </div>
            </div>

            {/* Drawing Workspace */}
            <div className="col-span-2 relative rounded-xl border border-white/5 overflow-hidden flex items-center justify-center bg-black/40">
              {/* Radial workspace lighting */}
              <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(168,85,247,0.08), transparent 70%)' }} />
              
              {/* Grid ticks */}
              <div className="absolute inset-0 cyber-grid opacity-30" />

              <svg className="w-full h-full absolute inset-0 z-10" viewBox="0 0 240 120">
                {/* Connection lines */}
                <path d="M30 90 L 90 20 L 160 100 L 210 30" fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="3,3" />
                
                {/* Drawn curve line */}
                <motion.path 
                  d="M30 90 C 70 10, 130 110, 210 30" 
                  fill="none" 
                  stroke="#a855f7" 
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Handle vectors */}
                <line x1="90" y1="20" x2="70" y2="10" stroke="#3b82f6" strokeWidth="1" />
                <line x1="160" y1="100" x2="130" y2="110" stroke="#3b82f6" strokeWidth="1" />

                {/* Main control points */}
                <circle cx="30" cy="90" r="3" fill="#a855f7" stroke="white" strokeWidth="0.5" />
                <circle cx="210" cy="30" r="3" fill="#a855f7" stroke="white" strokeWidth="0.5" />
                
                {/* Vector handles (Active) */}
                <circle cx="90" cy="20" r="2.5" fill="#3b82f6" />
                <circle cx="70" cy="10" r="2" fill="#3b82f6" />
                <circle cx="160" cy="100" r="2.5" fill="#3b82f6" />
                <circle cx="130" cy="110" r="2" fill="#3b82f6" />
              </svg>

              <div className="absolute top-3 right-3 glass-panel px-1.5 py-0.5 border-purple-500/20 text-[8px] font-mono text-purple-300 z-20">
                P1: C(70, 10)
              </div>
            </div>
          </div>

          {/* Bottom Settings bar */}
          <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[8.5px] font-mono text-gray-500 z-10">
            <div className="flex gap-3">
              <span className="flex items-center gap-1"><Sliders size={10} className="text-purple-400" /> STROKE: 2px</span>
              <span className="flex items-center gap-1"><Settings size={10} /> OPACITY: 75%</span>
            </div>
            <span className="text-purple-400 font-bold">READY FOR EXPORT (SVG)</span>
          </div>
        </div>
      )
    },
    {
      title: 'Dev Engine',
      subtitle: '16-Thread Compiler Pipeline',
      description: 'Massive compile pipelines run seamlessly across 16 parallel threads. Watch hot-reloads execute in microseconds on our optimized environment.',
      icon: <Terminal size={22} className="text-blue-400" />,
      color: 'from-blue-500/10 to-cyan-500/5',
      glow: 'shadow-[0_0_50px_rgba(59,130,246,0.15)]',
      element: (
        <div className="relative w-full h-full flex flex-col p-4 cyber-grid">
          {/* Mock IDE Title */}
          <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3 z-10">
            <div className="flex gap-1.5 items-center">
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[10px] text-gray-400 font-medium font-mono uppercase tracking-wider ml-1">App.jsx — React-Three-Fiber</span>
            </div>
            <div className="flex items-center gap-1.5 text-[8px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              <span>SERVER PORT: 3000 ACTIVE</span>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-5 gap-3 h-0 overflow-hidden">
            {/* Sidebar Code Structure */}
            <div className="glass-panel p-2 border-white/5 flex flex-col text-[8.5px] font-mono text-gray-500 col-span-1.5 gap-1.5">
              <span className="text-[7.5px] text-gray-600 block mb-1">EXPLORER</span>
              <div className="text-blue-400">src/App.jsx</div>
              <div>src/components/</div>
              <div className="pl-2">HpContainer.jsx</div>
              <div className="pl-2 text-white/50">Loader.jsx</div>
              <div>src/index.css</div>
              <div className="mt-auto border-t border-white/5 pt-1.5 text-[8px] space-y-1">
                <div className="text-gray-400">CPU: 12.4%</div>
                <div className="text-gray-400">RAM: 1.25 GB</div>
              </div>
            </div>

            {/* Code and Terminal panel */}
            <div className="col-span-3.5 flex flex-col gap-2.5 h-full overflow-hidden text-[9px] font-mono">
              {/* Micro Code Editor */}
              <div className="flex-1 bg-black/50 p-2.5 rounded-xl border border-white/5 overflow-hidden text-gray-400 space-y-1 leading-snug">
                <div><span className="text-purple-400">import</span> React, &#123; <span className="text-yellow-300">useRef</span> &#125; <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span></div>
                <div><span className="text-purple-400">import</span> &#123; <span className="text-blue-300">Canvas</span> &#125; <span className="text-purple-400">from</span> <span className="text-green-400">'@react-three/fiber'</span></div>
                <div className="text-gray-600">// Initiate R3F Renderer Pipeline</div>
                <div><span className="text-purple-400">const</span> <span className="text-yellow-400">HpContainer</span> = () =&gt; &#123;</div>
                <div className="pl-3"><span className="text-purple-400">const</span> renderRef = <span className="text-yellow-300">useRef</span>(null)</div>
                <div className="pl-3"><span className="text-purple-400">return</span> &lt;<span className="text-blue-300">canvas</span> <span className="text-orange-300">ref</span>=&#123;renderRef&#125;&gt;&lt;/<span className="text-blue-300">canvas</span>&gt;</div>
                <div>&#125;</div>
              </div>

              {/* Live Terminal Output */}
              <div className="h-16 bg-black/80 rounded-xl border border-blue-500/10 p-2 text-cyan-300 text-[8px] overflow-hidden flex flex-col justify-between">
                <div className="flex justify-between items-center text-gray-600 border-b border-white/5 pb-1 mb-1">
                  <span>TERMINAL: BASH</span>
                  <span>TIME: 0.08s</span>
                </div>
                <div className="flex-1 space-y-0.5 overflow-hidden">
                  <div>$ npm run build --optimize</div>
                  <div className="text-emerald-400">✓ Compiled 12,492 React elements. [0.08s]</div>
                  <div className="text-white/60">✓ Compression completed. Bundle size: 84kb</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"
            />
          </div>
        </div>
      )
    },
    {
      title: 'Cinema Master',
      subtitle: 'Multitrack 8K Playback',
      description: 'Seamless real-time playback of multiple 8K ProRes streams. Heavy color-grading layers render smoothly at 60fps without proxy rendering.',
      icon: <Film size={22} className="text-pink-400" />,
      color: 'from-pink-500/10 to-rose-500/5',
      glow: 'shadow-[0_0_50px_rgba(236,72,153,0.15)]',
      element: (
        <div className="relative w-full h-full flex flex-col p-4 cyber-grid">
          {/* Mock NLE Title */}
          <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3 z-10">
            <div className="flex gap-1.5 items-center">
              <Play size={12} className="text-pink-500 animate-pulse" />
              <span className="text-[10px] text-gray-400 font-medium font-mono uppercase tracking-wider">Aether NLE Studio v4.0</span>
            </div>
            <div className="text-[9px] font-mono font-bold text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded">
              <span>00:14:28:12</span>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-4 gap-3">
            {/* Color Vectorscope dial */}
            <div className="glass-panel p-2 border-white/5 flex flex-col justify-between items-center text-[8.5px] font-mono text-gray-500">
              <span className="text-[7.5px] text-gray-600 block">VECTORSCOPE</span>
              <div className="w-16 h-16 rounded-full border border-dashed border-white/10 flex items-center justify-center relative my-1 bg-black/20">
                {/* Center crosshair */}
                <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white/5" />
                <div className="absolute inset-x-0 top-1/2 h-0.5 bg-white/5" />
                
                {/* Scope curve */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 64">
                  <path d="M32 32 Q48 16, 44 48 T32 32" fill="none" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="1" />
                  <circle cx="44" cy="48" r="1.5" fill="#ec4899" />
                </svg>
              </div>
              <span>SAT: 85%</span>
            </div>

            {/* Editing Timeline */}
            <div className="col-span-3 flex flex-col justify-between border border-white/5 rounded-xl bg-black/40 p-2.5 relative overflow-hidden">
              {/* Sequential timeline ruler ticks */}
              <div className="flex justify-between text-[7px] font-mono text-gray-600 border-b border-white/5 pb-1 mb-2">
                <span>00:00:00</span>
                <span>00:10:00</span>
                <span>00:20:00</span>
                <span>00:30:00</span>
              </div>

              {/* Multitrack bars */}
              <div className="flex-1 space-y-2">
                {/* Video Track 1 */}
                <div className="flex items-center gap-1.5 text-[8px] font-mono">
                  <span className="w-5 text-gray-600">V1</span>
                  <div className="flex-1 h-5 rounded bg-gradient-to-r from-pink-500/25 to-purple-500/10 border border-pink-500/30 p-1 relative flex items-center justify-between text-pink-300">
                    <span className="truncate max-w-[80%]">HERO_GRADED_8K.mov</span>
                    <span className="text-[7px] text-gray-500">60 FPS</span>
                  </div>
                </div>

                {/* Video Track 2 (Overlay) */}
                <div className="flex items-center gap-1.5 text-[8px] font-mono">
                  <span className="w-5 text-gray-600">V2</span>
                  <div className="flex-1 h-5 rounded bg-purple-500/20 border border-purple-500/30 p-1 relative flex items-center text-purple-300">
                    <span className="truncate">TRANSITION_GLOW_MESH.mp4</span>
                  </div>
                </div>

                {/* Audio Track 1 */}
                <div className="flex items-center gap-1.5 text-[8px] font-mono">
                  <span className="w-5 text-gray-600">A1</span>
                  <div className="flex-1 h-5 rounded bg-blue-500/15 border border-blue-500/20 relative flex items-center px-1 overflow-hidden">
                    {/* Animated soundwaves */}
                    <div className="flex items-end gap-0.5 w-full h-3 opacity-60">
                      {[30, 80, 50, 90, 40, 70, 20, 60, 85, 45, 95, 30, 55, 75, 40, 90, 50].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t bg-blue-400" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Vertical Playhead Cursor */}
              <div className="absolute left-[45%] top-4 bottom-1 w-0.5 bg-pink-500 z-20 shadow-[0_0_8px_#ec4899] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-400" style={{ transform: 'translateY(-20px)' }} />
              </div>
            </div>
          </div>

          {/* Bottom telemetry */}
          <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[8.5px] font-mono text-gray-500 z-10">
            <span className="text-gray-400">PRORES 422 HQ COMPATIBLE</span>
            <span className="text-pink-400 font-semibold animate-pulse">RENDERING PREVIEWS...</span>
          </div>
        </div>
      )
    },
    {
      title: 'Neural Core',
      subtitle: 'Synaptic Processing Grid',
      description: 'Drive multi-billion parameter language models on-device. Seamless tensor caching with high-speed unified memory architectures.',
      icon: <Brain size={22} className="text-emerald-400" />,
      color: 'from-emerald-500/10 to-teal-500/5',
      glow: 'shadow-[0_0_50px_rgba(16,185,129,0.15)]',
      element: (
        <div className="relative w-full h-full flex flex-col p-4 cyber-grid">
          {/* Mock NPU Title */}
          <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3 z-10">
            <div className="flex gap-1.5 items-center">
              <Database size={12} className="text-emerald-500" />
              <span className="text-[10px] text-gray-400 font-medium font-mono uppercase tracking-wider">Neural Engine Monitor</span>
            </div>
            <div className="flex gap-2 text-[9px] font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              <span>UNIFIED MEMORY: 64GB</span>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-5 gap-3 h-0 overflow-hidden">
            {/* Compute Nodes SVG */}
            <div className="col-span-3 rounded-xl border border-white/5 bg-black/40 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(16,185,129,0.06), transparent 70%)' }} />
              
              {/* Connected node network */}
              <svg className="w-full h-full absolute inset-0 z-10" viewBox="0 0 160 100">
                <line x1="20" y1="50" x2="50" y2="20" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
                <line x1="20" y1="50" x2="50" y2="80" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
                <line x1="50" y1="20" x2="110" y2="20" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
                <line x1="50" y1="80" x2="110" y2="80" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
                <line x1="50" y1="20" x2="80" y2="50" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
                <line x1="50" y1="80" x2="80" y2="50" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
                <line x1="80" y1="50" x2="110" y2="20" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
                <line x1="80" y1="50" x2="110" y2="80" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
                <line x1="110" y1="20" x2="140" y2="50" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
                <line x1="110" y1="80" x2="140" y2="50" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />

                {/* Nodes with pulse */}
                <circle cx="20" cy="50" r="3" fill="#10b981" />
                <circle cx="50" cy="20" r="3.5" fill="#10b981" />
                <circle cx="50" cy="80" r="3.5" fill="#10b981" />
                <circle cx="80" cy="50" r="4.5" fill="#3b82f6" stroke="#10b981" strokeWidth="1" />
                <circle cx="110" cy="20" r="3.5" fill="#10b981" />
                <circle cx="110" cy="80" r="3.5" fill="#10b981" />
                <circle cx="140" cy="50" r="3" fill="#10b981" />

                {/* Flow particles */}
                <motion.circle 
                  cx="50" cy="20" r="2.2" fill="#fff"
                  animate={{ cx: [50, 80, 110], cy: [20, 50, 80] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                <motion.circle 
                  cx="20" cy="50" r="2.2" fill="#fff"
                  animate={{ cx: [20, 50, 110], cy: [50, 80, 80] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', delay: 0.5 }}
                />
              </svg>
            </div>

            {/* Neural Telemetry Panel */}
            <div className="col-span-2 glass-panel p-2 border-white/5 flex flex-col justify-between text-[8.5px] font-mono text-gray-500">
              <span className="text-[7.5px] text-gray-600 block">NPU PERFORMANCE</span>
              
              <div className="space-y-2 my-1.5">
                <div className="flex justify-between items-center bg-white/5 p-1 rounded">
                  <span>THROUGHPUT:</span>
                  <span className="text-emerald-400 font-bold">16.4 TFLOPs</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-1 rounded">
                  <span>LOSS RATING:</span>
                  <span className="text-blue-400 font-bold">0.0042</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-1 rounded">
                  <span>CONFIDENCE:</span>
                  <span className="text-emerald-400 font-bold">99.86%</span>
                </div>
              </div>

              {/* Interactive Synaptic Signal Rate */}
              <div className="border-t border-white/5 pt-2 flex items-center justify-between text-[8px]">
                <span>TENSOR MATRIX:</span>
                <span className="text-emerald-400 animate-pulse">PROCESSING...</span>
              </div>
            </div>
          </div>

          {/* Sparkline visualization */}
          <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[8px] font-mono text-gray-500 z-10">
            <span>SYNAPSES ACTIVE: 1.48B</span>
            <span className="text-emerald-400 font-semibold uppercase">Neural Optimization Stabilized</span>
          </div>
        </div>
      )
    }
  ]

  return (
    <div id="showcase" ref={triggerRef} className="relative overflow-hidden bg-transparent border-t border-white/5">
      <div className="flex h-screen" ref={containerRef} style={{ width: `${workflows.length * 100}vw` }}>
        {workflows.map((item, index) => (
          <div
            key={index}
            className="showcase-slide relative"
            style={{ width: '100vw', height: '100vh' }}
          >
            {/* Grid Backdrop texture */}
            <div className="absolute inset-0 cyber-grid opacity-[0.15] pointer-events-none" />

            {/* Parallax Background blur */}
            <div className="absolute inset-0 -z-10 pointer-events-none flex items-center justify-center">
              <div className={`w-[45vw] h-[45vw] rounded-full filter blur-[180px] opacity-20 bg-gradient-to-tr ${item.color}`} />
            </div>

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center px-6 md:px-20 z-10">
              {/* Text Content */}
              <div className="space-y-6 text-left order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3"
                >
                  <div className="p-3.5 rounded-2xl glass-panel border-white/10 bg-white/5 shadow-inner">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-purple-400 font-bold font-mono">{item.subtitle}</h4>
                    <h3 className="heading-futuristic text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">{item.title}</h3>
                  </div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-sm sm:text-base text-gray-400 font-light leading-relaxed max-w-lg"
                >
                  {item.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex items-center gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-premium flex items-center gap-2 group text-xs py-2.5 px-6 rounded-full font-semibold"
                  >
                    <span>Activate Workflow</span>
                    <ArrowRight size={14} className="text-purple-400 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>

                  <div className="text-[9.5px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                    <CheckCircle size={10} className="text-purple-400" /> Fully Optimized
                  </div>
                </motion.div>
              </div>

              {/* Graphic Display - Cyber-glass Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className={`relative rounded-3xl overflow-hidden glass-panel glass-border-glow border-white/5 w-full aspect-video flex items-center justify-center order-1 lg:order-2 ${item.glow}`}
                style={{ 
                  backgroundColor: 'rgba(6, 6, 9, 0.45)',
                  backdropFilter: 'blur(25px)',
                  WebkitBackdropFilter: 'blur(25px)'
                }}
              >
                {item.element}
              </motion.div>
            </div>

            {/* Micro Slider Tracker Navigation inside slide */}
            <div className="absolute bottom-10 right-10 text-xs font-mono font-bold tracking-widest text-white/20">
              [ 0{index + 1} / 04 ]
            </div>
          </div>
        ))}
      </div>

      {/* Global Pinned Indicator for Horizontal Section */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30 pointer-events-none">
        <span className="text-[9px] font-mono font-semibold tracking-widest text-gray-500 uppercase">EXPLORE WORKFLOWS</span>
        <div className="flex gap-2">
          {workflows.map((_, i) => (
            <div 
              key={i} 
              className={`w-2.5 h-1 rounded-full transition-all duration-500 ${
                activeSlide === i 
                  ? 'w-6 bg-purple-500 shadow-[0_0_8px_#a855f7]' 
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShowcaseSection
