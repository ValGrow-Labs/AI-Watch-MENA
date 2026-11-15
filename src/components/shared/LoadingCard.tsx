import { cn } from '@/lib/utils'

interface LoadingCardProps {
  variant?: 'article' | 'metric' | 'compact'
  className?: string
}

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cn('skeleton rounded', className)} />
}

function ArticleSkeleton() {
  return (
    <div className="card flex flex-col gap-3 p-0 overflow-hidden">
      {/* Image */}
      <SkeletonBlock className="aspect-video w-full rounded-t-xl rounded-b-none" />
      <div className="flex flex-col gap-3 p-4">
        {/* Badge */}
        <SkeletonBlock className="h-5 w-24 rounded-full" />
        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-4/5" />
        </div>
        {/* Excerpt */}
        <div className="flex flex-col gap-1">
          <SkeletonBlock className="h-3 w-full" />
          <SkeletonBlock className="h-3 w-full" />
          <SkeletonBlock className="h-3 w-3/5" />
        </div>
        {/* Meta */}
        <div className="flex gap-3 mt-1">
          <SkeletonBlock className="h-3 w-20" />
          <SkeletonBlock className="h-3 w-16" />
          <SkeletonBlock className="h-3 w-12" />
        </div>
      </div>
    </div>
  )
}

function MetricSkeleton() {
  return (
    <div className="metric-card flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <SkeletonBlock className="h-4 w-28" />
        <SkeletonBlock className="h-9 w-9 rounded-lg" />
      </div>
      <div className="flex flex-col gap-2">
        <SkeletonBlock className="h-8 w-32" />
        <SkeletonBlock className="h-3 w-24" />
      </div>
    </div>
  )
}

function CompactSkeleton() {
  return (
    <div className="card flex flex-col gap-3 p-4">
      {/* Badge */}
      <SkeletonBlock className="h-5 w-20 rounded-full" />
      {/* Title */}
      <div className="flex flex-col gap-1.5">
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-3/4" />
      </div>
      {/* Meta */}
      <div className="flex gap-3">
        <SkeletonBlock className="h-3 w-16" />
        <SkeletonBlock className="h-3 w-12" />
      </div>
    </div>
  )
}

export default function LoadingCard({ variant = 'article', className }: LoadingCardProps) {
  return (
    <div className={cn('animate-pulse', className)} aria-hidden="true">
      {variant === 'article' && <ArticleSkeleton />}
      {variant === 'metric' && <MetricSkeleton />}
      {variant === 'compact' && <CompactSkeleton />}
    </div>
  )
}
