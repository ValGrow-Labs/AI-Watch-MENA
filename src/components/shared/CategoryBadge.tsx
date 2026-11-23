import { getCategoryColor } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface CategoryBadgeProps {
  category: string
  size?: 'sm' | 'md'
  className?: string
}

export default function CategoryBadge({ category, size = 'md', className }: CategoryBadgeProps) {
  const badgeClass = getCategoryColor(category)

  return (
    <span
      className={cn(
        'category-badge font-bold uppercase tracking-wider',
        badgeClass,
        size === 'sm' ? 'text-[11px] px-2.5 py-0.5' : 'text-xs px-3 py-1',
        className
      )}
    >
      {category}
    </span>
  )
}
