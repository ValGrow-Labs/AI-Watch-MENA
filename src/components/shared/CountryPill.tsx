import { getCountryFlag } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface CountryPillProps {
  country: string
  className?: string
}

export default function CountryPill({ country, className }: CountryPillProps) {
  const flag = getCountryFlag(country)

  return (
    <span className={cn('country-pill', className)}>
      <span aria-hidden="true">{flag}</span>
      <span>{country}</span>
    </span>
  )
}
