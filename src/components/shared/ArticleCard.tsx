'use client'

import Link from 'next/link'
import { ArrowRight, Clock, User, Bookmark } from 'lucide-react'
import { Article } from '@/types'
import { cn, formatDateShort } from '@/lib/utils'
import CategoryBadge from './CategoryBadge'
import CountryPill from './CountryPill'
import EditorialImage from './EditorialImage'

interface ArticleCardProps {
  article: Article
  variant?: 'default' | 'compact' | 'featured' | 'horizontal'
  className?: string
  onBookmark?: (id: string) => void
  isBookmarked?: boolean
}

function ArticleMeta({ article }: { article: Article }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 text-xs text-[var(--text3)] font-medium pt-1">
      <span className="flex items-center gap-1.5 text-[var(--text)] font-semibold">
        <User size={13} className="text-[var(--accent)] shrink-0" />
        <span className="truncate max-w-[140px]">{article.author.name}</span>
      </span>
      <span>•</span>
      <span>{formatDateShort(article.publishedAt)}</span>
      <span>•</span>
      <span className="flex items-center gap-1">
        <Clock size={12} className="shrink-0" />
        {article.readingTime} min read
      </span>
    </div>
  )
}

// Default vertical card for feeds and grids
function DefaultCard({
  article,
  onBookmark,
  isBookmarked,
}: {
  article: Article
  onBookmark?: (id: string) => void
  isBookmarked?: boolean
}) {
  return (
    <div className="card h-full flex flex-col justify-between overflow-hidden bg-[var(--surface)] border border-[var(--border)] group-hover:border-[var(--accent)] transition-all duration-300 rounded-2xl">
      <div>
        {/* Card Visual with aspect ratio */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-[var(--surface2)]">
          <EditorialImage
            src={article.image}
            alt={article.imageAlt || article.title}
            category={article.category}
            country={article.country}
            className="w-full h-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
            <CategoryBadge category={article.category} size="sm" />
            <CountryPill country={article.country} />
          </div>

          {onBookmark && (
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onBookmark(article.id)
              }}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-[var(--accent)] transition-colors z-10 cursor-pointer"
              title={isBookmarked ? 'Remove Bookmark' : 'Save Briefing'}
            >
              <Bookmark size={14} className={isBookmarked ? 'fill-[var(--accent)] text-[var(--accent)]' : ''} />
            </button>
          )}
        </div>

        {/* Text Container */}
        <div className="p-5 md:p-6 space-y-3">
          <h3 className="font-bold text-lg md:text-[19px] leading-snug text-[var(--text)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-[var(--text2)] leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="px-5 md:px-6 pb-5 pt-3 border-t border-[var(--border)] flex items-center justify-between">
        <ArticleMeta article={article} />
        <span className="text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0">
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  )
}

// Compact: no image, high density for sidebars
function CompactCard({ article }: { article: Article }) {
  return (
    <div className="card p-4 md:p-5 flex flex-col justify-between h-full bg-[var(--surface)] border border-[var(--border)] group-hover:border-[var(--accent)] transition-all duration-200 rounded-xl space-y-2.5">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <CategoryBadge category={article.category} size="sm" />
          <CountryPill country={article.country} />
        </div>
        <h4 className="font-bold text-base text-[var(--text)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 leading-snug">
          {article.title}
        </h4>
        <p className="text-xs text-[var(--text2)] line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>
      </div>
      <div className="pt-2 border-t border-[var(--border)]">
        <ArticleMeta article={article} />
      </div>
    </div>
  )
}

// Featured: large visual with overlay
function FeaturedCard({ article }: { article: Article }) {
  return (
    <div className="relative flex flex-col h-full min-h-[420px] rounded-2xl overflow-hidden border border-[var(--border)] group-hover:border-[var(--accent)] transition-all duration-300">
      <div className="absolute inset-0">
        <EditorialImage
          src={article.image}
          alt={article.imageAlt || article.title}
          category={article.category}
          country={article.country}
          priority
          className="w-full h-full"
          sizes="(max-width: 768px) 100vw, 66vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      <div className="relative mt-auto p-6 md:p-8 flex flex-col gap-3.5 z-10">
        <div className="flex items-center gap-2.5">
          <CategoryBadge category={article.category} size="sm" />
          <CountryPill country={article.country} />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight line-clamp-3 group-hover:text-blue-300 transition-colors">
          {article.title}
        </h2>
        <p className="text-sm md:text-base text-white/80 line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>
        <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-white/70 pt-2 border-t border-white/20">
          <span className="font-semibold text-white">{article.author.name}</span>
          <span>•</span>
          <span>{formatDateShort(article.publishedAt)}</span>
          <span>•</span>
          <span>{article.readingTime} min read</span>
        </div>
      </div>
    </div>
  )
}

// Horizontal: image left 1/3, content right 2/3
function HorizontalCard({ article }: { article: Article }) {
  return (
    <div className="card p-4 sm:p-5 flex flex-col sm:flex-row gap-5 h-full bg-[var(--surface)] border border-[var(--border)] group-hover:border-[var(--accent)] transition-all duration-200 rounded-2xl">
      <div className="relative w-full sm:w-48 md:w-56 aspect-[16/10] sm:aspect-auto sm:h-auto shrink-0 rounded-xl overflow-hidden bg-[var(--surface2)]">
        <EditorialImage
          src={article.image}
          alt={article.imageAlt || article.title}
          category={article.category}
          country={article.country}
          className="w-full h-full"
          sizes="(max-width: 640px) 100vw, 220px"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 min-w-0 space-y-2.5">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CategoryBadge category={article.category} size="sm" />
            <CountryPill country={article.country} />
          </div>
          <h3 className="font-bold text-base sm:text-lg text-[var(--text)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text2)] line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>
        <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between">
          <ArticleMeta article={article} />
          <span className="text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default function ArticleCard({
  article,
  variant = 'default',
  className,
  onBookmark,
  isBookmarked,
}: ArticleCardProps) {
  return (
    <Link
      href={`/intelligence/${article.slug}`}
      className={cn('article-card group block relative h-full', className)}
    >
      {variant === 'default' && (
        <DefaultCard article={article} onBookmark={onBookmark} isBookmarked={isBookmarked} />
      )}
      {variant === 'compact' && <CompactCard article={article} />}
      {variant === 'featured' && <FeaturedCard article={article} />}
      {variant === 'horizontal' && <HorizontalCard article={article} />}
    </Link>
  )
}
