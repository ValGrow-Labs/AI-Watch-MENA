'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  BookOpen,
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  Clock,
  User,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  X,
} from 'lucide-react'
import { ARTICLES } from '@/data/articles'
import type { Article } from '@/types'
import CountryPill from '@/components/shared/CountryPill'
import CategoryBadge from '@/components/shared/CategoryBadge'
import { formatDateShort } from '@/lib/utils'

interface ResearchLibraryViewProps {
  savedArticleIds: string[]
  onToggleBookmark: (article: Article) => void
}

export default function ResearchLibraryView({
  savedArticleIds,
  onToggleBookmark,
}: ResearchLibraryViewProps) {
  const [search, setSearch] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('All')
  const [selectedReport, setSelectedReport] = useState<Article | null>(null)

  // Filter research and analysis articles
  const researchArticles = useMemo(() => {
    return ARTICLES.filter((a) => a.category === 'Analysis' || a.category === 'Research' || a.category === 'Intelligence')
  }, [])

  const topics = ['All', 'Sovereign AI', 'Infrastructure', 'Arabic LLMs', 'Vision 2030', 'Enterprise']

  const filteredReports = useMemo(() => {
    return researchArticles.filter((r) => {
      const matchSearch =
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      const matchTopic = selectedTopic === 'All' || r.tags.some((t) => t.toLowerCase().includes(selectedTopic.toLowerCase()))
      return matchSearch && matchTopic
    })
  }, [researchArticles, search, selectedTopic])

  return (
    <div className="space-y-6">
      {/* ─── Control Header ─────────────────────────────────────────── */}
      <div className="card p-5 bg-[var(--surface)] border border-[var(--border)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
              <BookOpen size={13} />
              Strategic Intelligence Repository
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--text)]">
              Research Library, Whitepapers & Deep Dives
            </h2>
          </div>
          <span className="text-xs text-[var(--text3)]">
            {filteredReports.length} Reports Available
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text3)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search research paper or theme..."
              className="form-input pl-9 text-xs py-2"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  selectedTopic === t
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--surface2)] text-[var(--text2)] hover:text-[var(--text)]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Research Reports Grid ──────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredReports.map((report) => {
          const isBookmarked = savedArticleIds.includes(report.id)
          return (
            <div
              key={report.id}
              className="card p-5 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CategoryBadge category={report.category} size="sm" />
                    <CountryPill country={report.country} />
                  </div>
                  <button
                    onClick={() => onToggleBookmark(report)}
                    className="p-1 rounded hover:bg-[var(--surface2)] text-[var(--text3)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                    title={isBookmarked ? 'Remove Bookmark' : 'Save Briefing'}
                  >
                    {isBookmarked ? (
                      <BookmarkCheck size={16} className="text-[var(--accent)]" />
                    ) : (
                      <Bookmark size={16} />
                    )}
                  </button>
                </div>

                <h3 className="font-bold text-base text-[var(--text)] leading-snug line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                  <button
                    onClick={() => setSelectedReport(report)}
                    className="text-left cursor-pointer"
                  >
                    {report.title}
                  </button>
                </h3>

                <p className="text-xs text-[var(--text2)] line-clamp-3 leading-relaxed">
                  {report.excerpt}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-[var(--text3)] pt-2 border-t border-[var(--border)]">
                  <span className="flex items-center gap-1">
                    <User size={11} /> {report.author.name}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {report.readingTime} min
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-[10px] text-[var(--text3)]">
                  {formatDateShort(report.publishedAt)}
                </span>
                <button
                  onClick={() => setSelectedReport(report)}
                  className="text-[var(--accent)] font-semibold inline-flex items-center gap-1 hover:underline cursor-pointer"
                >
                  Inspect Abstract <ArrowRight size={12} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* ─── Report Abstract Modal ──────────────────────────────────── */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="card bg-[var(--surface)] border border-[var(--border)] max-w-xl w-full p-6 space-y-4 rounded-2xl shadow-2xl relative">
            <button
              onClick={() => setSelectedReport(null)}
              className="absolute right-4 top-4 p-1.5 rounded-lg text-[var(--text3)] hover:text-[var(--text)] hover:bg-[var(--surface2)]"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2">
              <CategoryBadge category={selectedReport.category} size="sm" />
              <CountryPill country={selectedReport.country} />
            </div>

            <div>
              <h3 className="text-xl font-black text-[var(--text)] leading-snug">
                {selectedReport.title}
              </h3>
              <div className="text-xs text-[var(--text3)] mt-1 flex items-center gap-2">
                <span>By {selectedReport.author.name}</span>
                <span>•</span>
                <span>{formatDateShort(selectedReport.publishedAt)}</span>
                <span>•</span>
                <span>{selectedReport.readingTime} min read</span>
              </div>
            </div>

            <p className="text-xs text-[var(--text2)] leading-relaxed bg-[var(--surface2)]/50 p-3.5 rounded-xl border border-[var(--border)]">
              {selectedReport.excerpt}
            </p>

            {selectedReport.keyTakeaways && (
              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
                  <Sparkles size={12} /> Key Strategic Takeaways
                </div>
                <ul className="space-y-1.5 text-xs text-[var(--text)]">
                  {selectedReport.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-[var(--accent2)] shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-3 border-t border-[var(--border)] flex justify-between items-center text-xs">
              <Link
                href={`/intelligence/${selectedReport.slug}`}
                className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
              >
                Read Full Editorial Article <ArrowRight size={12} />
              </Link>
              <button
                onClick={() => setSelectedReport(null)}
                className="btn-ghost text-xs py-1.5 px-3"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

