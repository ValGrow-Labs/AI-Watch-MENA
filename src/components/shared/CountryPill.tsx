import { getCountryFlag } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface CountryPillProps {
  country: string
  className?: string
}

export default function CountryPill({ country, className }: CountryPillProps) {
  const flag = getCountryFlag(country)

  return (
    <span
      className={cn(
        'country-pill inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--surface2)] text-[var(--text2)] border border-[var(--border)]',
        className
      )}
    >
      <span aria-hidden="true">{flag}</span>
      <span>{country}</span>
    </span>
  )
}
