import React, { useRef } from 'react'
import * as THREE from 'three'
import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const HpContainer = ({ scrollProgress }) => {
    const groupRef = useRef(null)
    const model = useGLTF('./mac.glb')
    const tex = useTexture('./red.jpg')
    const meshes = {}

    model.scene.traverse(e => {
        if (e) {
            meshes[e.name] = e
        }
    })

    // Setup initial texture and properties
    if (meshes.matte && meshes.matte.material) {
        meshes.matte.material.map = tex
        meshes.matte.material.emissiveIntensity = 0
        meshes.matte.material.metalness = 0
        meshes.matte.material.roughness = 1
    }

    useFrame((state, delta) => {
        if (!meshes.screen || !groupRef.current) return

        // Read unified scroll progress
        const progress = scrollProgress.current ? scrollProgress.current.value : 0

        // 1. Laptop Screen Opening Animation (lerped for ultimate smoothness)
        const targetScreenRot = THREE.MathUtils.degToRad(180 - progress * 90)
        meshes.screen.rotation.x = THREE.MathUtils.lerp(
            meshes.screen.rotation.x,
            targetScreenRot,
            0.1 // standard easing constant
        )

        // 2. Cinematic Laptop Position & Scale Transition
        // As scroll progresses, lift the laptop slightly and bring it slightly closer
        const targetY = -10 + progress * 2.5
        const targetZ = 20 + progress * 8
        const targetScale = 1 + progress * 0.08

        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.1)
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1)
        
        groupRef.current.scale.setScalar(
            THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1)
        )

        // 3. Interactive Mouse Parallax (Tilts when hovered)
        // Dampen the parallax effect slightly as the screen becomes fully open to focus on the text
        const parallaxDampening = 1 - progress * 0.3
        const mouseX = (state.pointer ? state.pointer.x : state.mouse.x) * 0.25 * parallaxDampening
        const mouseY = (state.pointer ? state.pointer.y : state.mouse.y) * 0.15 * parallaxDampening

        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX, 0.05)
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY, 0.05)
    })

    return (
        <group ref={groupRef} position={[0, -10, 20]}>
            <primitive object={model.scene} />
        </group>
    )
}

export default HpContainer
