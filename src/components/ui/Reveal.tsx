import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** Stagger delay in seconds. */
  delay?: number
  y?: number
  className?: string
  once?: boolean
}

/** Fade + lift in when scrolled into view. Respects reduced-motion via framer. */
export function Reveal({ children, delay = 0, y = 24, className, once = true }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
