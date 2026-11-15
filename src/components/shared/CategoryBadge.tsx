import { getCategoryColor } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface CategoryBadgeProps {
  category: string
  size?: 'sm' | 'md'
}

export default function CategoryBadge({ category, size = 'md' }: CategoryBadgeProps) {
  const badgeClass = getCategoryColor(category)

  return (
    <span
      className={cn(
        'category-badge',
        badgeClass,
        size === 'sm' && 'text-[10px] px-2 py-0.5'
      )}
    >
      {category}
    </span>
  )
}
