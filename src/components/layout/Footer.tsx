import { ArrowUp } from 'lucide-react'

/**
 * Deliberately thin: contact + social links all live in the Contact section
 * directly above, so repeating them here would just be noise.
 */
export function Footer() {
  return (
    <footer className="border-t border-ink-700/60 py-10">
      <div className="container-px flex justify-center">
        <a
          href="#home"
          aria-label="Back to top"
          className="glass flex h-9 w-9 items-center justify-center rounded-full text-mist-200 transition-colors hover:text-mist-50"
        >
          <ArrowUp className="h-4 w-4" />
        </a>
      </div>
    </footer>
  )
}
