import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label?: string
  title: string
  description?: string
  action?: {
    label: string
    href: string
  }
  className?: string
}

export default function SectionHeader({
  label,
  title,
  description,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {/* Top row: label/title + action */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          {label && (
            <div className="flex items-center gap-3">
              <span className="section-label">{label}</span>
              <span className="flex-1 h-px bg-[var(--border)]" />
            </div>
          )}
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] leading-tight">
            {title}
          </h2>
        </div>
        {action && (
          <Link
            href={action.href}
            className={cn(
              'shrink-0 flex items-center gap-1.5 text-sm font-medium',
              'text-[var(--accent)] hover:text-[var(--accent2)]',
              'transition-colors duration-200 mt-auto group'
            )}
          >
            {action.label}
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        )}
      </div>
      {description && (
        <p className="text-[var(--text2)] text-sm md:text-base leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  )
}
