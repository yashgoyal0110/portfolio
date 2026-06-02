import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/** Cycles through phrases with a type/erase effect. Static first phrase if reduced-motion. */
export function useTypewriter(phrases: string[], opts?: { type?: number; erase?: number; hold?: number }) {
  const reduce = useReducedMotion()
  const { type = 65, erase = 35, hold = 1600 } = opts ?? {}
  const [text, setText] = useState(phrases[0] ?? '')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduce) return
    const current = phrases[index % phrases.length]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), hold)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % phrases.length)
    } else {
      timeout = setTimeout(
        () => {
          const next = deleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1)
          setText(next)
        },
        deleting ? erase : type,
      )
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, index, phrases, reduce, type, erase, hold])

  return text
}
