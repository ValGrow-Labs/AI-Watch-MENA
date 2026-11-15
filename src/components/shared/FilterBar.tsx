'use client'

import { cn } from '@/lib/utils'

interface Filter {
  label: string
  value: string
}

interface FilterBarProps {
  filters: Filter[]
  activeFilter: string
  onFilter: (value: string) => void
  className?: string
}

export default function FilterBar({
  filters,
  activeFilter,
  onFilter,
  className,
}: FilterBarProps) {
  return (
    <div
      className={cn(
        'flex gap-2 overflow-x-auto pb-1 scrollbar-none',
        className
      )}
      role="group"
      aria-label="Content filters"
    >
      {filters.map((filter) => {
        const isActive = filter.value === activeFilter
        return (
          <button
            key={filter.value}
            onClick={() => onFilter(filter.value)}
            aria-pressed={isActive}
            className={cn(
              'shrink-0 px-4 py-1.5 rounded-full text-sm font-medium',
              'border transition-all duration-200 whitespace-nowrap',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
              isActive
                ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                : [
                    'bg-[var(--surface)] text-[var(--text2)] border-[var(--border)]',
                    'hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--surface2)]',
                  ]
            )}
          >
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}
