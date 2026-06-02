import { useRef, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Magnetic hover: translates the element toward the cursor for a tactile,
 * premium feel. No-op when the user prefers reduced motion.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.4) {
  const ref = useRef<T>(null)
  const reduce = useReducedMotion()

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduce || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)
      ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    },
    [reduce, strength],
  )

  const onMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
