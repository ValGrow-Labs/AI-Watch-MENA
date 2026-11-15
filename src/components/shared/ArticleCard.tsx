'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, User } from 'lucide-react'
import { Article } from '@/types'
import { cn, formatDateShort, getCategoryColor } from '@/lib/utils'
import CategoryBadge from './CategoryBadge'

interface ArticleCardProps {
  article: Article
  variant?: 'default' | 'compact' | 'featured' | 'horizontal'
  className?: string
}

function ArticleMeta({ article }: { article: Article }) {
  return (
    <div className="flex items-center gap-3 text-xs text-[var(--text3)]">
      <span className="flex items-center gap-1">
        <User size={11} />
        {article.author.name}
      </span>
      <span>{formatDateShort(article.publishedAt)}</span>
      <span className="flex items-center gap-1">
        <Clock size={11} />
        {article.readingTime} min
      </span>
    </div>
  )
}

function ArticleImage({
  article,
  className,
  priority = false,
}: {
  article: Article
  className?: string
  priority?: boolean
}) {
  return (
    <div className={cn('relative overflow-hidden bg-[var(--surface2)]', className)}>
      <Image
        src={article.image}
        alt={article.imageAlt}
        fill
        priority={priority}
        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
        }}
      />
    </div>
  )
}

// Default vertical card
function DefaultCard({ article }: { article: Article }) {
  return (
    <div className="flex flex-col h-full">
      <ArticleImage article={article} className="aspect-video rounded-t-xl" />
      <div className="flex flex-col flex-1 p-4 gap-3">
        <CategoryBadge category={article.category} size="sm" />
        <h3 className="font-semibold text-[var(--text)] line-clamp-2 leading-snug group-hover:text-[var(--accent)] transition-colors duration-200">
          {article.title}
        </h3>
        <p className="text-sm text-[var(--text2)] line-clamp-3 flex-1 leading-relaxed">
          {article.excerpt}
        </p>
        <ArticleMeta article={article} />
      </div>
    </div>
  )
}

// Compact: no image
function CompactCard({ article }: { article: Article }) {
  return (
    <div className="flex flex-col gap-2 p-4">
      <CategoryBadge category={article.category} size="sm" />
      <h3 className="font-semibold text-[var(--text)] line-clamp-2 leading-snug group-hover:text-[var(--accent)] transition-colors duration-200">
        {article.title}
      </h3>
      <ArticleMeta article={article} />
    </div>
  )
}

// Featured: larger with prominent title overlay
function FeaturedCard({ article }: { article: Article }) {
  return (
    <div className="relative flex flex-col h-full min-h-[400px]">
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          priority
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 66vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src =
              'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>
      <div className="relative mt-auto p-6 flex flex-col gap-3">
        <CategoryBadge category={article.category} size="sm" />
        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight line-clamp-3 group-hover:text-[var(--accent)] transition-colors duration-200">
          {article.title}
        </h2>
        <p className="text-sm text-white/80 line-clamp-2 leading-relaxed">{article.excerpt}</p>
        <div className="flex items-center gap-3 text-xs text-white/70">
          <span>{article.author.name}</span>
          <span>{formatDateShort(article.publishedAt)}</span>
          <span>{article.readingTime} min read</span>
        </div>
      </div>
    </div>
  )
}

// Horizontal: image left 1/3, content right 2/3
function HorizontalCard({ article }: { article: Article }) {
  return (
    <div className="flex gap-4 p-4 h-full">
      <div className="relative w-1/3 shrink-0 rounded-lg overflow-hidden bg-[var(--surface2)] min-h-[100px]">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 33vw, 20vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src =
              'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
          }}
        />
      </div>
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <CategoryBadge category={article.category} size="sm" />
        <h3 className="font-semibold text-[var(--text)] line-clamp-2 leading-snug group-hover:text-[var(--accent)] transition-colors duration-200 text-sm">
          {article.title}
        </h3>
        <p className="text-xs text-[var(--text2)] line-clamp-2 flex-1 leading-relaxed">
          {article.excerpt}
        </p>
        <ArticleMeta article={article} />
      </div>
    </div>
  )
}

export default function ArticleCard({
  article,
  variant = 'default',
  className,
}: ArticleCardProps) {
  return (
    <Link
      href={`/intelligence/${article.slug}`}
      className={cn(
        'article-card group block relative',
        variant === 'featured' && 'rounded-xl overflow-hidden',
        className
      )}
    >
      {variant === 'default' && <DefaultCard article={article} />}
      {variant === 'compact' && <CompactCard article={article} />}
      {variant === 'featured' && <FeaturedCard article={article} />}
      {variant === 'horizontal' && <HorizontalCard article={article} />}

      {/* Arrow indicator on hover */}
      {variant !== 'featured' && (
        <span
          className={cn(
            'absolute bottom-4 right-4 opacity-0 translate-x-[-4px]',
            'group-hover:opacity-100 group-hover:translate-x-0',
            'transition-all duration-200 text-[var(--accent)]'
          )}
        >
          <ArrowRight size={16} />
        </span>
      )}
    </Link>
  )
}
