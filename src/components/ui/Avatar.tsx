import { profile } from '@/config/profile'
import { cn } from '@/lib/cn'

/**
 * Circular headshot, cropped to the face. Replaces the old initials monogram.
 * Source is /avatar.jpg (512px square, cropped from public/main-.jpeg).
 */
export function Avatar({ className }: { className?: string }) {
  return (
    <img
      src="/avatar.jpg"
      alt={profile.name}
      width={512}
      height={512}
      decoding="async"
      className={cn(
        'rounded-full object-cover ring-1 ring-white/15 shadow-[0_4px_16px_-6px_rgba(0,0,0,0.9)]',
        className,
      )}
    />
  )
}
