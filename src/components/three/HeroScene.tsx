import { useMemo, useRef, useState } from 'react'
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

/** A node in the constellation. Each one maps to a real part of the site. */
export interface HeroTopic {
  id: string
  label: string
  /** Section anchor the node scrolls to when clicked. */
  href: string
}

/**
 * The orbiting nodes are not decoration: each is a domain I work in and a
 * shortcut into the section that proves it.
 */
const TOPICS: HeroTopic[] = [
  { id: 'teleop', label: 'Real-time teleoperation', href: '#experience' },
  { id: 'k8s', label: 'Kubernetes in production', href: '#experience' },
  { id: 'backend', label: 'Backend & product systems', href: '#projects' },
  { id: 'ai', label: 'AI & LLM systems', href: '#projects' },
  { id: 'data', label: 'Data & observability', href: '#skills' },
  { id: 'cloud', label: 'Cloud & DevOps', href: '#skills' },
  { id: 'oss', label: 'Open source', href: '#opensource' },
]

interface SceneProps {
  /** Fired as the pointer enters/leaves a node, so the hero can caption it. */
  onFocusTopic?: (topic: HeroTopic | null) => void
}

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
 *  Orbiting topic nodes wired back to the core. Hover to highlight,
 *  click to jump to the section that backs it up.
 * ------------------------------------------------------------------ */
interface NodeDef extends HeroTopic {
  pos: [number, number, number]
  color: string
  size: number
}

function Nodes({ animate, onFocusTopic }: { animate: boolean } & SceneProps) {
  const group = useRef<THREE.Group>(null)
  const meshes = useRef<Record<string, THREE.Group | null>>({})
  const [hovered, setHovered] = useState<string | null>(null)

  const nodes = useMemo<NodeDef[]>(() => {
    const palette = ['#4fd1e0', '#7c8bff', '#34d399', '#a5b4ff']
    const count = TOPICS.length
    return TOPICS.map((t, i) => {
      // distribute on a tilted ring + jitter for an organic cluster feel
      const a = (i / count) * Math.PI * 2
      const r = 2.5 + (i % 2 === 0 ? 0.4 : -0.3)
      return {
        ...t,
        pos: [Math.cos(a) * r, Math.sin(a * 1.3) * 0.9, Math.sin(a) * r] as [number, number, number],
        color: palette[i % palette.length],
        size: 0.09 + (i % 3) * 0.03,
      }
    })
  }, [])

  useFrame((_, delta) => {
    // hold the orbit still while a node is focused so it stays clickable
    if (animate && group.current && !hovered) group.current.rotation.y -= delta * 0.06

    for (const n of nodes) {
      const m = meshes.current[n.id]
      if (!m) continue
      const target = hovered === n.id ? 1.35 : 1
      m.scale.lerp(new THREE.Vector3(target, target, target), Math.min(1, delta * 10))
    }
  })

  function focus(topic: NodeDef | null) {
    setHovered(topic?.id ?? null)
    onFocusTopic?.(topic ? { id: topic.id, label: topic.label, href: topic.href } : null)
    document.body.style.cursor = topic ? 'pointer' : ''
  }

  function go(href: string) {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <group ref={group}>
      {nodes.map((n) => {
        const isHot = hovered === n.id
        return (
          <group key={n.id}>
            <Line
              points={[[0, 0, 0], n.pos]}
              color={n.color}
              lineWidth={isHot ? 1 : 0.6}
              transparent
              opacity={isHot ? 0.5 : 0.25}
            />
            <Float speed={animate ? 2 : 0} floatIntensity={0.6} rotationIntensity={0.4}>
              <group position={n.pos}>
                <group ref={(el) => void (meshes.current[n.id] = el)}>
                  <mesh>
                    <sphereGeometry args={[n.size, 24, 24]} />
                    <meshStandardMaterial
                      color={n.color}
                      emissive={n.color}
                      emissiveIntensity={isHot ? 2.1 : 1.4}
                      roughness={0.3}
                      metalness={0.4}
                    />
                  </mesh>
                  {/* faint halo, only while focused */}
                  {isHot && (
                    <mesh>
                      <sphereGeometry args={[n.size * 1.6, 20, 20]} />
                      <meshBasicMaterial color={n.color} transparent opacity={0.08} depthWrite={false} />
                    </mesh>
                  )}
                </group>

                {/* generous invisible hit target — the visible dot is tiny */}
                <mesh
                  onPointerOver={(e) => {
                    e.stopPropagation()
                    focus(n)
                  }}
                  onPointerOut={() => focus(null)}
                  onClick={(e) => {
                    e.stopPropagation()
                    go(n.href)
                  }}
                >
                  <sphereGeometry args={[0.42, 12, 12]} />
                  <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                </mesh>
              </group>
            </Float>
          </group>
        )
      })}
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

export default function HeroScene({ onFocusTopic }: SceneProps) {
  const reduce = useReducedMotion()
  const animate = !reduce

  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6], fov: 42 }}
      onPointerMissed={() => onFocusTopic?.(null)}
    >
      {/* Manual lighting — no external HDRI fetch, fully offline-safe */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={1.6} color="#cdd6ff" />
      <pointLight position={[-4, -2, -3]} intensity={40} color="#4fd1e0" distance={14} />
      <pointLight position={[4, 3, 2]} intensity={28} color="#7c8bff" distance={14} />

      <Float speed={animate ? 1.2 : 0} floatIntensity={animate ? 0.8 : 0} rotationIntensity={0.2}>
        <Core animate={animate} />
      </Float>
      <Nodes animate={animate} onFocusTopic={onFocusTopic} />

      <Sparkles count={40} scale={9} size={1.6} speed={animate ? 0.3 : 0} color="#a5b4ff" opacity={0.5} />

      <Rig animate={animate} />
      <AdaptiveDpr pixelated />
    </Canvas>
  )
}
