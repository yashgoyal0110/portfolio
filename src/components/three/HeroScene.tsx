import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  Icosahedron,
  Line,
  MeshDistortMaterial,
  Sparkles,
  AdaptiveDpr,
} from '@react-three/drei'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'

/* ------------------------------------------------------------------ *
 *  The core: a slowly morphing, metallic icosahedron with a wireframe
 *  shell — the "control plane" everything orbits.
 * ------------------------------------------------------------------ */
function Core({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (animate && group.current) {
      group.current.rotation.y += delta * 0.12
      group.current.rotation.x += delta * 0.04
    }
  })

  return (
    <group ref={group}>
      <Icosahedron args={[1.15, 1]}>
        <meshBasicMaterial wireframe color="#4453e6" transparent opacity={0.25} />
      </Icosahedron>
      <Icosahedron args={[0.92, 4]}>
        <MeshDistortMaterial
          color="#5b6cff"
          emissive="#1a2a8f"
          emissiveIntensity={0.55}
          roughness={0.18}
          metalness={0.85}
          distort={animate ? 0.32 : 0}
          speed={1.6}
        />
      </Icosahedron>
    </group>
  )
}

/* ------------------------------------------------------------------ *
 *  Orbiting service nodes wired back to the core.
 * ------------------------------------------------------------------ */
interface NodeDef {
  pos: [number, number, number]
  color: string
  size: number
}

function Nodes({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null)

  const nodes = useMemo<NodeDef[]>(() => {
    const palette = ['#4fd1e0', '#7c8bff', '#34d399', '#a5b4ff']
    const count = 7
    const list: NodeDef[] = []
    for (let i = 0; i < count; i++) {
      // distribute on a tilted ring + jitter for an organic cluster feel
      const a = (i / count) * Math.PI * 2
      const r = 2.5 + (i % 2 === 0 ? 0.4 : -0.3)
      list.push({
        pos: [Math.cos(a) * r, Math.sin(a * 1.3) * 0.9, Math.sin(a) * r],
        color: palette[i % palette.length],
        size: 0.09 + (i % 3) * 0.03,
      })
    }
    return list
  }, [])

  useFrame((_, delta) => {
    if (animate && group.current) group.current.rotation.y -= delta * 0.06
  })

  return (
    <group ref={group}>
      {nodes.map((n, i) => (
        <group key={i}>
          <Line
            points={[[0, 0, 0], n.pos]}
            color={n.color}
            lineWidth={0.6}
            transparent
            opacity={0.25}
          />
          <Float speed={animate ? 2 : 0} floatIntensity={0.6} rotationIntensity={0.4}>
            <mesh position={n.pos}>
              <sphereGeometry args={[n.size, 24, 24]} />
              <meshStandardMaterial
                color={n.color}
                emissive={n.color}
                emissiveIntensity={1.4}
                roughness={0.3}
                metalness={0.4}
              />
            </mesh>
          </Float>
        </group>
      ))}
    </group>
  )
}

/* ------------------------------------------------------------------ *
 *  Camera rig: ease toward the pointer for parallax. Subtle, no spin.
 * ------------------------------------------------------------------ */
function Rig({ animate }: { animate: boolean }) {
  useFrame((state, delta) => {
    if (!animate) return
    const x = state.pointer.x * 0.6
    const y = state.pointer.y * 0.4
    state.camera.position.x += (x - state.camera.position.x) * Math.min(1, delta * 2)
    state.camera.position.y += (y - state.camera.position.y) * Math.min(1, delta * 2)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function HeroScene() {
  const reduce = useReducedMotion()
  const animate = !reduce

  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6], fov: 42 }}
      style={{ pointerEvents: 'none' }}
    >
      {/* Manual lighting — no external HDRI fetch, fully offline-safe */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={1.6} color="#cdd6ff" />
      <pointLight position={[-4, -2, -3]} intensity={40} color="#4fd1e0" distance={14} />
      <pointLight position={[4, 3, 2]} intensity={28} color="#7c8bff" distance={14} />

      <Float speed={animate ? 1.2 : 0} floatIntensity={animate ? 0.8 : 0} rotationIntensity={0.2}>
        <Core animate={animate} />
      </Float>
      <Nodes animate={animate} />

      <Sparkles count={40} scale={9} size={1.6} speed={animate ? 0.3 : 0} color="#a5b4ff" opacity={0.5} />

      <Rig animate={animate} />
      <AdaptiveDpr pixelated />
    </Canvas>
  )
}
