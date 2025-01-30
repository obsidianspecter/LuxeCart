"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Mesh } from "three"
import { motion } from "framer-motion-3d"
import { Environment, Float } from "@react-three/drei"

function FloatingShapes() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <Float
      speed={1.5}
      rotationIntensity={1}
      floatIntensity={2}
      floatingRange={[-0.1, 0.1]}
    >
      <motion.mesh
        ref={meshRef}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1.5,
          ease: [0.76, 0, 0.24, 1]
        }}
      >
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial
          color="#7c3aed"
          roughness={0.3}
          metalness={0.8}
        />
      </motion.mesh>
    </Float>
  )
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <FloatingShapes />
      </Canvas>
    </div>
  )
}