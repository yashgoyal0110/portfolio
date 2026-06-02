import { useEffect, useState } from 'react'

/**
 * Tracks which section id is currently in view using IntersectionObserver.
 * Returns the active id so the nav can highlight it.
 */
export function useScrollSpy(ids: string[], offset = 0.4): string {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: `-${Math.round(offset * 100)}% 0px -${Math.round((1 - offset) * 100)}% 0px`, threshold: [0, 0.25, 0.5, 1] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, offset])

  return active
}
