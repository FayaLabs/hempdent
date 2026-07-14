import { cn } from '@/lib/utils'

// The brand appears as a typographic wordmark — Bricolage Grotesque 800 with a
// resin-lime `·` accent. No leaf mark, per the Hemp Dent brand guidelines.
export default function Wordmark({
  className,
  dotClassName,
}: {
  className?: string
  dotClassName?: string
}) {
  return (
    <span
      className={cn(
        'font-heading font-extrabold tracking-[-0.03em] leading-none select-none',
        className,
      )}
    >
      Hemp<span className={cn('text-resin-600', dotClassName)}>·</span>Dent
    </span>
  )
}
