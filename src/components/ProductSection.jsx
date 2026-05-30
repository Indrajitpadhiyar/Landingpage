import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Cpu, Monitor, Smartphone, Volume2 } from 'lucide-react'

const ProductSection = () => {
  // Swatch color selection states
  const [mbpColor, setMbpColor] = useState('spaceblack')
  const [mbaColor, setMbaColor] = useState('midnight')
  const [ipadColor, setIpadColor] = useState('spaceblack')

  // MBP Data
  const mbpData = {
    spaceblack: {
      name: 'Space Black',
      bg: 'bg-[#1b1c1e]',
      imgGradient: 'from-[#2e2f33] to-[#121214]',
      specs: 'M3 Max • 16-Core CPU • 40-Core GPU • Space Black Anodized Shell'
    },
    silver: {
      name: 'Silver',
      bg: 'bg-[#e3e4e6]',
      imgGradient: 'from-[#f1f2f4] to-[#c5c6c9]',
      specs: 'M3 Pro • 12-Core CPU • 18-Core GPU • Classic Silver Matte Shell'
    }
  }

  // MBA Data
  const mbaData = {
    midnight: {
      name: 'Midnight',
      bg: 'bg-[#1e2530]',
      imgGradient: 'from-[#2b3545] to-[#0e1218]',
      specs: 'M3 Chip • Fanless Silent • Deep Midnight Finish'
    },
    starlight: {
      name: 'Starlight',
      bg: 'bg-[#f4ebe1]',
      imgGradient: 'from-[#fdf4eb] to-[#d8cfc5]',
      specs: 'M3 Chip • Fanless Silent • Warm Starlight Gold Finish'
    },
    spacegray: {
      name: 'Space Gray',
      bg: 'bg-[#565759]',
      imgGradient: 'from-[#737578] to-[#3a3b3c]',
      specs: 'M3 Chip • Fanless Silent • Classic Space Gray Finish'
    }
  }

  // iPad Data
  const ipadData = {
    spaceblack: {
      name: 'Space Black',
      bg: 'bg-[#1b1c1e]',
      imgGradient: 'from-[#2e2f33] to-[#121214]',
      specs: 'M4 Neural Engine • Tandem OLED Screen'
    },
    silver: {
      name: 'Silver',
      bg: 'bg-[#e3e4e6]',
      imgGradient: 'from-[#f1f2f4] to-[#c5c6c9]',
      specs: 'M4 Neural Engine • Classic Matte Aluminum'
    }
  }

  return (
    <section id="products" className="product-section-light relative py-32 px-6 md:px-12 flex flex-col items-center z-10">
      <div className="w-full max-w-6xl">
        
        {/* Modern Apple-style Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-mono font-bold tracking-widest text-[#0071e3] uppercase mb-4"
          >
            The Hardware Showcase
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1d1d1f] mb-6 leading-none"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Find the Pro for you.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg text-[#86868b] font-light leading-relaxed max-w-xl mx-auto"
          >
            Explore our advanced computing ecosystem. Built with absolute power, ultra-thin profiles, and sustainable carbon-neutral structures.
          </motion.p>
        </div>

        {/* Bento Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
          
          {/* Card 1: MacBook Pro (Wide Bento Grid - Occupies 2 Columns on Medium/Large Screens) */}
          <div className="light-product-card md:col-span-2 p-8 flex flex-col lg:flex-row justify-between relative overflow-hidden h-[460px] group">
            <div className="flex flex-col justify-between z-10 lg:w-1/2">
              <div>
                <span className="light-tag-purple text-[9px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Ultimate Performance
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] mt-4 mb-2 tracking-tight">
                  MacBook Pro
                </h3>
                <p className="text-xs text-[#86868b] font-light leading-relaxed max-w-xs mb-4">
                  Outrageous compile speeds, rendering power, and extreme battery life. Liquid Retina XDR screen delivers pristine pro accuracy.
                </p>

                {/* Interactive Color Selectors */}
                <div className="flex items-center gap-3 my-4">
                  <span className="text-[10px] font-mono text-gray-400">FINISH:</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setMbpColor('spaceblack')}
                      className={`w-5 h-5 rounded-full bg-[#1c1c1e] border-2 transition-all ${
                        mbpColor === 'spaceblack' ? 'border-[#0071e3] scale-110 shadow-sm' : 'border-transparent'
                      }`}
                      title="Space Black"
                    />
                    <button 
                      onClick={() => setMbpColor('silver')}
                      className={`w-5 h-5 rounded-full bg-[#e3e4e6] border-2 transition-all ${
                        mbpColor === 'silver' ? 'border-[#0071e3] scale-110 shadow-sm' : 'border-transparent'
                      }`}
                      title="Silver"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Technical Specs Display */}
              <div className="border-t border-black/5 pt-4">
                <span className="text-[9px] font-mono font-bold text-purple-600 block uppercase mb-1">Active Configuration</span>
                <div className="text-[11px] font-mono font-bold text-[#1d1d1f] transition-all">
                  {mbpData[mbpColor].specs}
                </div>
              </div>
            </div>

            {/* Laptop Vector Visual Mockup */}
            <div className="flex-1 relative flex items-center justify-center mt-6 lg:mt-0 h-[200px] lg:h-full lg:w-1/2">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-indigo-500/5 rounded-2xl filter blur-xl opacity-40 group-hover:scale-105 transition-transform duration-700" />
              
              {/* Animated Laptop Shell representation */}
              <div className="relative w-72 h-44 flex flex-col items-center justify-center transition-transform duration-700 group-hover:scale-[1.03]">
                {/* Laptop Lid Screen */}
                <div className={`w-64 h-36 rounded-t-xl border border-black/10 p-1 bg-black shadow-lg relative flex items-center justify-center overflow-hidden`}>
                  {/* Glowing wallpaper inside laptop display */}
                  <div className={`absolute inset-0.5 rounded-t-lg bg-gradient-to-br ${mbpData[mbpColor].imgGradient} flex flex-col justify-between p-3`}>
                    <div className="flex justify-between items-center text-[7px] font-mono text-white/50">
                      <span>Pro Workspace</span>
                      <span>M3 MAX Active</span>
                    </div>
                    <Cpu size={28} className="text-white/20 self-center animate-pulse" />
                    <span className="text-[7.5px] font-mono text-center font-bold text-white drop-shadow">
                      Liquid Retina XDR • 120Hz
                    </span>
                  </div>
                </div>

                {/* Laptop Base chassis */}
                <div className={`w-72 h-3.5 rounded-b-md ${mbpData[mbpColor].bg} border-t border-white/20 shadow-md relative flex justify-center items-center transition-colors duration-500`}>
                  {/* Notch center handle */}
                  <div className="w-12 h-1 bg-black/15 rounded-b-sm absolute top-0" />
                </div>
              </div>
            </div>
            
            {/* Hover Explore Indicator */}
            <div className="absolute top-6 right-6 p-2 bg-[#1d1d1f]/5 rounded-full text-[#1d1d1f] opacity-50 group-hover:opacity-100 group-hover:bg-[#0071e3] group-hover:text-white transition-all duration-300">
              <ArrowUpRight size={14} />
            </div>
          </div>

          {/* Card 2: MacBook Air (Tall/Standard Bento Box) */}
          <div className="light-product-card p-8 flex flex-col justify-between relative overflow-hidden h-[460px] group">
            <div>
              <span className="light-tag-blue text-[9px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Strikingly Thin
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] mt-4 mb-2 tracking-tight">
                MacBook Air
              </h3>
              <p className="text-xs text-[#86868b] font-light leading-relaxed mb-4">
                Incredibly light, fanless design for silent workloads. M3 chip delivers processing capability inside a 1.13cm frame.
              </p>

              {/* Swatch Color buttons */}
              <div className="flex items-center gap-2.5 my-3">
                <span className="text-[9px] font-mono text-gray-400">FINISH:</span>
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => setMbaColor('midnight')}
                    className={`w-4 h-4 rounded-full bg-[#1e2530] border-2 transition-all ${
                      mbaColor === 'midnight' ? 'border-[#0071e3] scale-110' : 'border-transparent'
                    }`}
                  />
                  <button 
                    onClick={() => setMbaColor('starlight')}
                    className={`w-4 h-4 rounded-full bg-[#f4ebe1] border-2 transition-all ${
                      mbaColor === 'starlight' ? 'border-[#0071e3] scale-110' : 'border-transparent'
                    }`}
                  />
                  <button 
                    onClick={() => setMbaColor('spacegray')}
                    className={`w-4 h-4 rounded-full bg-[#565759] border-2 transition-all ${
                      mbaColor === 'spacegray' ? 'border-[#0071e3] scale-110' : 'border-transparent'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Silhouette Laptop visual mockup */}
            <div className="relative flex-1 flex items-center justify-center py-4 h-[120px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 rounded-2xl filter blur-xl opacity-30 group-hover:scale-105 transition-transform duration-700" />
              
              {/* Ultra Thin Silhouette */}
              <div className="relative w-56 h-32 flex flex-col items-center justify-center transition-transform duration-700 group-hover:scale-[1.03]">
                {/* Thin Screen Display */}
                <div className="w-48 h-26 rounded-t bg-black border border-black/10 p-0.5 shadow relative overflow-hidden">
                  <div className={`absolute inset-0.5 rounded-t bg-gradient-to-br ${mbaData[mbaColor].imgGradient} flex flex-col justify-between p-2`}>
                    <Cpu size={14} className="text-white/10" />
                    <span className="text-[6px] font-mono text-center text-white/50">M3 Fanless Silencer</span>
                  </div>
                </div>
                {/* Impossibly Thin base */}
                <div className={`w-52 h-1.5 rounded-b ${mbaData[mbaColor].bg} shadow-md border-t border-white/20 transition-colors duration-500`} />
              </div>
            </div>

            <div className="border-t border-black/5 pt-4">
              <span className="text-[8.5px] font-mono font-bold text-blue-600 block uppercase mb-1">Configuration</span>
              <div className="text-[10px] font-mono font-bold text-[#1d1d1f]">
                {mbaData[mbaColor].specs}
              </div>
            </div>
            
            <div className="absolute top-6 right-6 p-2 bg-[#1d1d1f]/5 rounded-full text-[#1d1d1f] opacity-50 group-hover:opacity-100 group-hover:bg-[#0071e3] group-hover:text-white transition-all duration-300">
              <ArrowUpRight size={14} />
            </div>
          </div>

          {/* Card 3: iPad Pro (Tall/Standard Bento Box) */}
          <div className="light-product-card p-8 flex flex-col justify-between relative overflow-hidden h-[460px] group">
            <div>
              <span className="light-tag-emerald text-[9px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Impossibly Thin
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] mt-4 mb-2 tracking-tight">
                iPad Pro
              </h3>
              <p className="text-xs text-[#86868b] font-light leading-relaxed mb-4">
                Pioneering Tandem OLED display and extreme M4 Neural engine. Power, precision, and pen control condensed into just 5.1mm.
              </p>

              {/* Swatch Color buttons */}
              <div className="flex items-center gap-2.5 my-3">
                <span className="text-[9px] font-mono text-gray-400">FINISH:</span>
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => setIpadColor('spaceblack')}
                    className={`w-4 h-4 rounded-full bg-[#1c1c1e] border-2 transition-all ${
                      ipadColor === 'spaceblack' ? 'border-[#0071e3] scale-110' : 'border-transparent'
                    }`}
                  />
                  <button 
                    onClick={() => setIpadColor('silver')}
                    className={`w-4 h-4 rounded-full bg-[#e3e4e6] border-2 transition-all ${
                      ipadColor === 'silver' ? 'border-[#0071e3] scale-110' : 'border-transparent'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* iPad Mockup Vector */}
            <div className="relative flex-1 flex items-center justify-center py-4 h-[120px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-teal-500/5 rounded-2xl filter blur-xl opacity-30 group-hover:scale-105 transition-transform duration-700" />
              
              {/* Tablet Silhouette */}
              <div className="relative w-40 h-48 flex items-center justify-center transition-transform duration-700 group-hover:scale-[1.03]">
                {/* Front face screen */}
                <div className="w-32 h-44 rounded-2xl bg-black border border-black/20 p-1 shadow-lg relative flex items-center justify-center overflow-hidden">
                  <div className={`absolute inset-0.5 rounded-[12px] bg-gradient-to-br ${ipadData[ipadColor].imgGradient} flex flex-col justify-between p-2.5`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-black/40 self-center" />
                    <span className="text-[6.5px] font-mono text-center font-bold text-white uppercase drop-shadow">
                      Tandem OLED M4
                    </span>
                  </div>
                </div>

                {/* Pencil Pro Silhouette */}
                <div className="absolute right-0 top-1/4 w-1.5 h-24 rounded-full bg-[#e3e4e6] border border-black/5 shadow-sm relative flex flex-col justify-between items-center py-2">
                  <div className="w-0.5 h-3 bg-gray-400/40 rounded-t" />
                </div>
              </div>
            </div>

            <div className="border-t border-black/5 pt-4">
              <span className="text-[8.5px] font-mono font-bold text-emerald-600 block uppercase mb-1">Specifications</span>
              <div className="text-[10px] font-mono font-bold text-[#1d1d1f]">
                {ipadData[ipadColor].specs}
              </div>
            </div>
            
            <div className="absolute top-6 right-6 p-2 bg-[#1d1d1f]/5 rounded-full text-[#1d1d1f] opacity-50 group-hover:opacity-100 group-hover:bg-[#0071e3] group-hover:text-white transition-all duration-300">
              <ArrowUpRight size={14} />
            </div>
          </div>

          {/* Card 4: Studio Workstation (Wide Bento Grid - Occupies 2 Columns on Medium/Large Screens) */}
          <div className="light-product-card md:col-span-2 p-8 flex flex-col lg:flex-row justify-between relative overflow-hidden h-[460px] group">
            
            {/* Visual display of workstation (Left Side) */}
            <div className="flex-1 relative flex items-center justify-center h-[200px] lg:h-full lg:w-1/2 order-2 lg:order-1 mt-6 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 to-pink-500/5 rounded-2xl filter blur-xl opacity-40 group-hover:scale-105 transition-transform duration-700" />
              
              {/* Studio Display + Mac Studio Box vectors */}
              <div className="relative w-80 h-48 flex items-end justify-center gap-4 transition-transform duration-700 group-hover:scale-[1.02]">
                
                {/* Mac Studio chassis */}
                <div className="w-20 h-10 rounded bg-[#e3e4e6] border border-black/10 shadow-md flex flex-col justify-between p-1 z-20 font-mono text-[7px] text-gray-500">
                  <div className="flex justify-between items-center px-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm" />
                    <span>M2 Ultra</span>
                  </div>
                  <div className="w-full h-0.5 bg-black/10 mt-1" />
                </div>

                {/* Studio Display */}
                <div className="w-56 h-40 flex flex-col items-center justify-end relative z-10">
                  {/* Screen */}
                  <div className="w-52 h-30 rounded-t border border-black/10 p-0.5 bg-black shadow-lg relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0.5 rounded-t bg-gradient-to-br from-[#ececee] to-[#bcbcc0] flex flex-col justify-between p-2">
                      <div className="flex justify-between items-center text-[6px] font-mono text-gray-500">
                        <span>5K Retina Monitor</span>
                        <span>600 NITS Peak</span>
                      </div>
                      <Monitor size={20} className="text-gray-400 self-center opacity-40" />
                      <span className="text-[6.5px] font-mono text-center text-gray-500 font-bold">
                        P3 Color Space • Anti-Reflective
                      </span>
                    </div>
                  </div>
                  {/* Stand chassis */}
                  <div className="w-16 h-8 bg-[#e3e4e6] rounded-t-sm shadow border-t border-black/5 relative flex justify-center">
                    <div className="w-12 h-1 bg-black/10 absolute bottom-0" />
                  </div>
                </div>
              </div>
            </div>

            {/* Info details (Right Side) */}
            <div className="flex flex-col justify-between z-10 lg:w-1/2 order-1 lg:order-2 lg:pl-6 text-left">
              <div>
                <span className="light-tag-blue text-[9px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Ultimate Desktop Power
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] mt-4 mb-2 tracking-tight">
                  Studio Station
                </h3>
                <p className="text-xs text-[#86868b] font-light leading-relaxed mb-4 max-w-sm">
                  Seamless compile power with dual-fan thermodynamic control. Engineered for heavy workstation loops, compiling complex matrices in real-time.
                </p>

                <div className="grid grid-cols-2 gap-3 my-4">
                  <div className="bg-black/5 p-2 rounded-xl border border-black/5 flex items-center gap-2">
                    <Smartphone size={14} className="text-blue-500" />
                    <div>
                      <span className="text-[7.5px] text-gray-500 block uppercase">DISPLAY</span>
                      <span className="text-[10px] font-mono font-bold text-[#1d1d1f]">5K 27" Retina</span>
                    </div>
                  </div>
                  <div className="bg-black/5 p-2 rounded-xl border border-black/5 flex items-center gap-2">
                    <Volume2 size={14} className="text-blue-500" />
                    <div>
                      <span className="text-[7.5px] text-gray-500 block uppercase">AUDIO</span>
                      <span className="text-[10px] font-mono font-bold text-[#1d1d1f]">6 Speakers Spatial</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-black/5 pt-4">
                <span className="text-[9px] font-mono font-bold text-blue-600 block uppercase mb-1">Hardware Interface</span>
                <div className="text-[11px] font-mono font-bold text-[#1d1d1f]">
                  Mac Studio: M2 Ultra • 24-Core CPU • 76-Core GPU • Thunderbolt 4
                </div>
              </div>
            </div>
            
            <div className="absolute top-6 right-6 p-2 bg-[#1d1d1f]/5 rounded-full text-[#1d1d1f] opacity-50 group-hover:opacity-100 group-hover:bg-[#0071e3] group-hover:text-white transition-all duration-300">
              <ArrowUpRight size={14} />
            </div>
          </div>

        </div>

        {/* Global Bottom light theme CTAs */}
        <div className="mt-20 border-t border-black/5 pt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <h4 className="text-lg font-bold text-[#1d1d1f]">Want customized configurations?</h4>
            <p className="text-xs text-[#86868b] font-light mt-1">Chat directly with a specialist or build your unified system catalog.</p>
          </div>
          <div className="flex gap-4">
            <button className="light-btn-secondary text-xs px-6 py-2.5">
              Compare Specs
            </button>
            <button className="light-btn-buy text-xs px-6 py-2.5">
              Contact Specialist
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}

export default ProductSection
