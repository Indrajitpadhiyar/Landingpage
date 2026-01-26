import React from 'react'
import { Environment, OrbitControls, ScrollControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import HpContainer from './components/HpContainer'
import { div } from 'three/tsl'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='w-full h-screen font-[Helvetica_Now_Display]'>
      <Navbar />
      <div className='absolute flex flex-col items-center top-42 left-1/2 -translate-x-1/2 text-white  text-center'>
        <h3 className='masked text-7xl tracking-tighter font-bold'>macbook pro.</h3>
        <h5>Oh so pro !</h5>
        <p className='text-center w-3/4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum odio molestiae velit sunt!</p>
      </div>
      <Canvas camera={{ fov: 25, position: [0, -10, 120] }}>
        {/* <OrbitControls /> */}
        <Environment files={['https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/studio_small_09_4k.hdr']} />
        <ScrollControls>
          <HpContainer />
        </ScrollControls>
      </Canvas>
    </div>
  )
}

export default App
