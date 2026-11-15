'use client'

import Link from 'next/link'
import {
  Bookmark,
  Trash2,
  BookOpen,
  ArrowRight,
  Clock,
  User,
  Sparkles,
} from 'lucide-react'
import type { Article } from '@/types'
import CountryPill from '@/components/shared/CountryPill'
import CategoryBadge from '@/components/shared/CategoryBadge'
import { formatDateShort } from '@/lib/utils'

interface SavedBriefingsViewProps {
  savedArticles: Article[]
  onRemoveBookmark: (id: string) => void
  onClearAll: () => void
  onNavigate: (view: string) => void
}

export default function SavedBriefingsView({
  savedArticles,
  onRemoveBookmark,
  onClearAll,
  onNavigate,
}: SavedBriefingsViewProps) {
  return (
    <div className="space-y-6">
      {/* ─── Control Header ─────────────────────────────────────────── */}
      <div className="card p-5 bg-[var(--surface)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
            <Bookmark size={13} />
            Executive Dossier
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[var(--text)]">
            Saved Intelligence Briefings & Reports
          </h2>
        </div>

        {savedArticles.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--text3)]">
              {savedArticles.length} Saved {savedArticles.length === 1 ? 'Item' : 'Items'}
            </span>
            <button
              onClick={onClearAll}
              className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 px-2.5 py-1 rounded bg-rose-500/10 transition-colors cursor-pointer"
            >
              <Trash2 size={12} /> Clear Dossier
            </button>
          </div>
        )}
      </div>

      {/* ─── Saved Items List or Empty State ────────────────────────── */}
      {savedArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedArticles.map((article) => (
            <div
              key={article.id}
              className="card p-5 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CategoryBadge category={article.category} size="sm" />
                    <CountryPill country={article.country} />
                  </div>
                  <button
                    onClick={() => onRemoveBookmark(article.id)}
                    className="p-1 rounded text-[var(--text3)] hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title="Remove from Dossier"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <h3 className="font-bold text-base text-[var(--text)] leading-snug line-clamp-2">
                  <Link
                    href={`/intelligence/${article.slug}`}
                    className="hover:text-[var(--accent)] transition-colors"
                  >
                    {article.title}
                  </Link>
                </h3>

                <p className="text-xs text-[var(--text2)] line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-[var(--text3)] pt-2 border-t border-[var(--border)]">
                  <span>By {article.author.name}</span>
                  <span>•</span>
                  <span>{formatDateShort(article.publishedAt)}</span>
                  <span>•</span>
                  <span>{article.readingTime} min</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Link
                  href={`/intelligence/${article.slug}`}
                  className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1"
                >
                  Read Intelligence <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card p-12 bg-[var(--surface)] border border-[var(--border)] text-center space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-[var(--surface2)] flex items-center justify-center mx-auto text-[var(--accent)]">
            <Bookmark size={22} />
          </div>
          <div>
            <h3 className="font-bold text-base text-[var(--text)]">Your Executive Dossier is Empty</h3>
            <p className="text-xs text-[var(--text2)] mt-1 leading-relaxed">
              Bookmark important intelligence briefings, regulatory alerts, or strategic research papers for rapid executive review.
            </p>
          </div>
          <button
            onClick={() => onNavigate('research-library')}
            className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1.5 cursor-pointer"
          >
            Explore Research Library <ArrowRight size={13} />
          </button>
        </div>
      )}
    </div>
  )
}

