'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  Sparkles,
  TrendingUp,
  X,
  RotateCcw,
  Shield,
  Layers,
  CheckCircle2,
  BarChart3,
  Globe2,
} from 'lucide-react'

import { ARTICLES } from '@/data/articles'
import type { Article } from '@/types'
import CountryPill from '@/components/shared/CountryPill'
import CategoryBadge from '@/components/shared/CategoryBadge'
import NewsletterCTA from '@/components/shared/NewsletterCTA'
import EditorialImage from '@/components/shared/EditorialImage'
import ArticleCard from '@/components/shared/ArticleCard'
import { formatDateShort } from '@/lib/utils'

export default function IntelligenceHubPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCountry, setSelectedCountry] = useState('All')
  const [sortBy, setSortBy] = useState<'latest' | 'reading-time-desc' | 'reading-time-asc' | 'title'>('latest')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Bookmark / Saved Briefings state synchronized with Dashboard
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ai_watch_saved_briefings')
      if (stored) {
        setSavedArticleIds(JSON.parse(stored))
      }
    } catch {}
  }, [])

  function handleToggleBookmark(articleId: string) {
    let next: string[]
    if (savedArticleIds.includes(articleId)) {
      next = savedArticleIds.filter((id) => id !== articleId)
    } else {
      next = [...savedArticleIds, articleId]
    }
    setSavedArticleIds(next)
    try {
      localStorage.setItem('ai_watch_saved_briefings', JSON.stringify(next))
    } catch {}
  }

  // Extract unique categories and countries
  const categories = useMemo(() => {
    const list = Array.from(new Set(ARTICLES.map((a) => a.category)))
    return ['All', ...list]
  }, [])

  const countries = useMemo(() => {
    return [
      { id: 'All', label: 'All Jurisdictions', flag: '🌍' },
      { id: 'Saudi Arabia', label: 'Saudi Arabia', flag: '🇸🇦' },
      { id: 'UAE', label: 'UAE', flag: '🇦🇪' },
      { id: 'Qatar', label: 'Qatar', flag: '🇶🇦' },
      { id: 'Egypt', label: 'Egypt', flag: '🇪🇬' },
      { id: 'Bahrain', label: 'Bahrain', flag: '🇧🇭' },
      { id: 'Kuwait', label: 'Kuwait', flag: '🇰🇼' },
      { id: 'Oman', label: 'Oman', flag: '🇴🇲' },
      { id: 'Morocco', label: 'Morocco', flag: '🇲🇦' },
      { id: 'Jordan', label: 'Jordan', flag: '🇯🇴' },
    ]
  }, [])

  // Lead Featured Article
  const featuredArticle = useMemo(() => {
    return ARTICLES.find((a) => a.featured) || ARTICLES[0]
  }, [])

  // Filtered and Sorted Articles
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        article.author.name.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === 'All' || article.category.toLowerCase() === selectedCategory.toLowerCase()

      const matchesCountry =
        selectedCountry === 'All' || article.country.toLowerCase() === selectedCountry.toLowerCase()

      return matchesSearch && matchesCategory && matchesCountry
    }).sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      }
      if (sortBy === 'reading-time-desc') {
        return b.readingTime - a.readingTime
      }
      if (sortBy === 'reading-time-asc') {
        return a.readingTime - b.readingTime
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title)
      }
      return 0
    })
  }, [searchQuery, selectedCategory, selectedCountry, sortBy])

  // Pagination calculation
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage)
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredArticles.slice(start, start + itemsPerPage)
  }, [filteredArticles, currentPage])

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, selectedCountry, sortBy])

  // Clear all filters
  function handleResetFilters() {
    setSearchQuery('')
    setSelectedCategory('All')
    setSelectedCountry('All')
    setSortBy('latest')
    setCurrentPage(1)
  }

  const isFiltered = searchQuery !== '' || selectedCategory !== 'All' || selectedCountry !== 'All' || sortBy !== 'latest'

  // Trending stories for the sidebar
  const trendingStories = useMemo(() => {
    return ARTICLES.filter((a) => a.trending).slice(0, 4)
  }, [])

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-250">
      
      {/* ─────────────────────────────────────────────────────────────
          1. EDITORIAL PAGE HEADER & INTRODUCTION
          ───────────────────────────────────────────────────────────── */}
      <section className="border-b border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--bg)] py-12 md:py-16">
        <div className="content-container space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="section-label mb-0 text-[11px]">Editorial Intelligence Stream</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] px-2.5 py-0.5 rounded bg-[var(--surface2)] border border-[var(--border)]">
                Verified Regional Coverage
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-[13px] text-[var(--text3)] font-medium">
              <span>{ARTICLES.length} Published Dispatches</span>
              <span>•</span>
              <span>7 Sovereign Markets</span>
              <span>•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Hub
              </span>
            </div>
          </div>

          <div className="max-w-4xl space-y-3.5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--text)] leading-[1.15]">
              MENA AI Field Reports, Sovereign Strategies & Industry Analysis
            </h1>
            <p className="text-base sm:text-lg text-[var(--text2)] leading-relaxed">
              Authoritative intelligence tracking artificial intelligence deployments, government compute mandates, frontier Arabic language models, and venture investment flows across the Middle East and North Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="content-container py-10 md:py-14 space-y-12 md:space-y-16">

        {/* ─────────────────────────────────────────────────────────────
            2. FEATURED INTELLIGENCE SPOTLIGHT (Shown when not heavily filtered)
            ───────────────────────────────────────────────────────────── */}
        {!isFiltered && (
          <section aria-label="Lead Intelligence Spotlight">
            <div className="card p-6 sm:p-8 md:p-10 bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--accent)] transition-all duration-300 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Column: Narrative (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[var(--accent)] text-white shadow-xs">
                        Lead Intelligence
                      </span>
                      <CountryPill country={featuredArticle.country} />
                      <CategoryBadge category={featuredArticle.category} size="sm" />
                    </div>

                    <button
                      onClick={() => handleToggleBookmark(featuredArticle.id)}
                      className="p-2 rounded-lg text-[var(--text3)] hover:text-[var(--accent)] hover:bg-[var(--surface2)] transition-colors cursor-pointer"
                      title={savedArticleIds.includes(featuredArticle.id) ? 'Remove Bookmark' : 'Save Briefing'}
                    >
                      {savedArticleIds.includes(featuredArticle.id) ? (
                        <BookmarkCheck size={20} className="text-[var(--accent)]" />
                      ) : (
                        <Bookmark size={20} />
                      )}
                    </button>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-[var(--text)] leading-snug">
                    <Link
                      href={`/intelligence/${featuredArticle.slug}`}
                      className="hover:text-[var(--accent)] transition-colors duration-200"
                    >
                      {featuredArticle.title}
                    </Link>
                  </h2>

                  <p className="text-base text-[var(--text2)] leading-relaxed line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>

                  {/* Strategic Takeaways Box */}
                  {featuredArticle.keyTakeaways && (
                    <div className="bg-[var(--surface2)]/80 p-4 sm:p-5 rounded-xl border border-[var(--border)] space-y-2.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
                        <Sparkles size={13} />
                        Core Strategic Directives
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-[13px] text-[var(--text)]">
                        {featuredArticle.keyTakeaways.slice(0, 2).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 size={15} className="text-[var(--accent2)] shrink-0 mt-0.5" />
                            <span className="line-clamp-2 leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[var(--border)] text-xs sm:text-[13px]">
                    <div className="flex items-center gap-3 text-[var(--text3)]">
                      <span className="font-semibold text-[var(--text)] flex items-center gap-1.5">
                        <User size={14} className="text-[var(--accent)]" />
                        {featuredArticle.author.name}
                      </span>
                      <span>•</span>
                      <span>{formatDateShort(featuredArticle.publishedAt)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} />
                        {featuredArticle.readingTime} min read
                      </span>
                    </div>

                    <Link
                      href={`/intelligence/${featuredArticle.slug}`}
                      className="btn-primary text-xs sm:text-sm py-2.5 px-5 shadow-sm group"
                    >
                      Read Full Dossier
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Visual (5 cols) */}
                <div className="lg:col-span-5 relative">
                  <Link
                    href={`/intelligence/${featuredArticle.slug}`}
                    className="group block relative w-full aspect-[4/3] lg:aspect-[1/1] max-h-[440px] rounded-xl overflow-hidden border border-[var(--border)] shadow-xs"
                  >
                    <EditorialImage
                      src={featuredArticle.image}
                      alt={featuredArticle.imageAlt}
                      category={featuredArticle.category}
                      country={featuredArticle.country}
                      priority
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-semibold">
                      <span className="inline-block px-3 py-1.5 rounded bg-black/60 backdrop-blur-md border border-white/20">
                        Exclusive In-Depth Briefing
                      </span>
                    </div>
                  </Link>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* ─────────────────────────────────────────────────────────────
            3. INTERACTIVE CONTROL PANEL (Search, Categories, Countries, Sort)
            ───────────────────────────────────────────────────────────── */}
        <section className="card p-6 bg-[var(--surface)] border border-[var(--border)] space-y-5 rounded-2xl" aria-label="Search and Filters">
          
          {/* Top Row: Search Input + Sorting */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text3)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, executive author, or keyword..."
                className="form-input pl-10 text-xs sm:text-sm py-2.5 rounded-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text3)] hover:text-[var(--text)]"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--text3)]">
                <ArrowUpDown size={14} />
                <span className="hidden sm:inline">Sort:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="form-input text-xs sm:text-sm py-2 px-3 w-auto rounded-xl"
              >
                <option value="latest">Latest Dispatches</option>
                <option value="reading-time-desc">Reading Time: Longest</option>
                <option value="reading-time-asc">Reading Time: Shortest</option>
                <option value="title">Alphabetical (A–Z)</option>
              </select>

              {isFiltered && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-rose-500/10 transition-colors cursor-pointer shrink-0"
                >
                  <RotateCcw size={13} />
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Middle Row: Category Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-[var(--border)] pt-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text3)] shrink-0 mr-1 flex items-center gap-1.5">
              <Filter size={12} /> Pillar:
            </span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-[13px] font-semibold transition-all duration-150 shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--accent)] text-white shadow-xs'
                      : 'bg-[var(--surface2)] text-[var(--text2)] hover:text-[var(--text)] hover:bg-[var(--surface2)]/80'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Bottom Row: MENA Country Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-[var(--border)] pt-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text3)] shrink-0 mr-1 flex items-center gap-1.5">
              <Globe2 size={12} /> Market:
            </span>
            {countries.map((country) => {
              const isSelected = selectedCountry === country.id
              return (
                <button
                  key={country.id}
                  onClick={() => setSelectedCountry(country.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-[13px] font-medium transition-all duration-150 shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--text)] text-[var(--bg)] font-bold'
                      : 'bg-[var(--surface)] text-[var(--text2)] border border-[var(--border)] hover:border-[var(--accent)]'
                  }`}
                >
                  <span>{country.flag}</span>
                  <span>{country.label}</span>
                </button>
              )
            })}
          </div>

          {/* Active Filter Metrics */}
          <div className="flex items-center justify-between text-xs sm:text-[13px] text-[var(--text3)] pt-3 border-t border-[var(--border)]">
            <div>
              Showing <strong className="text-[var(--text)]">{filteredArticles.length}</strong> of{' '}
              <strong className="text-[var(--text)]">{ARTICLES.length}</strong> dispatches
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              {selectedCountry !== 'All' && ` across ${selectedCountry}`}
            </div>
            {isFiltered && (
              <span className="text-xs text-[var(--accent)] font-semibold">
                Active Filter View
              </span>
            )}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            4. MAIN EDITORIAL CONTENT GRID & SIDEBAR
            ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Feed: 8 Columns */}
          <div className="lg:col-span-8 space-y-8">
            {paginatedArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {paginatedArticles.map((article) => {
                  const isSaved = savedArticleIds.includes(article.id)
                  return (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      variant="default"
                      onBookmark={handleToggleBookmark}
                      isBookmarked={isSaved}
                    />
                  )
                })}
              </div>
            ) : (
              /* Empty Search State */
              <div className="card p-12 text-center space-y-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl">
                <div className="w-14 h-14 rounded-full bg-[var(--surface2)] flex items-center justify-center mx-auto text-[var(--text3)]">
                  <Search size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-[var(--text)]">No intelligence dispatches found</h3>
                  <p className="text-xs sm:text-sm text-[var(--text2)] max-w-md mx-auto">
                    We could not find any field reports matching your current filter parameters. Try clearing your search query or selecting another regional market.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="btn-primary text-xs sm:text-sm py-2.5 px-5 inline-flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw size={14} /> Reset All Filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="card p-4 sm:p-5 bg-[var(--surface)] border border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-[13px] text-[var(--text3)] rounded-2xl">
                <div>
                  Showing page <strong className="text-[var(--text)]">{currentPage}</strong> of{' '}
                  <strong className="text-[var(--text)]">{totalPages}</strong> (
                  <strong className="text-[var(--text)]">{filteredArticles.length}</strong> total dispatches)
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-[var(--border)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--surface2)] text-[var(--text)] cursor-pointer"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1
                    const isActive = pageNum === currentPage
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-9 h-9 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[var(--accent)] text-white shadow-xs'
                            : 'border border-[var(--border)] text-[var(--text2)] hover:bg-[var(--surface2)]'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-[var(--border)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--surface2)] text-[var(--text)] cursor-pointer"
                    aria-label="Next page"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ─────────────────────────────────────────────────────────────
              5. EDITORIAL SIDEBAR: High Velocity, Topics, Terminal CTA
              ───────────────────────────────────────────────────────────── */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Box 1: High Velocity Trending News Feed */}
            <div className="card p-6 bg-[var(--surface)] border border-[var(--border)] space-y-4 rounded-2xl">
              <div className="flex items-center justify-between pb-3.5 border-b border-[var(--border)]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text)] flex items-center gap-2">
                  <TrendingUp size={15} className="text-[var(--highlight)]" />
                  High Velocity Dispatches
                </h3>
                <span className="text-[11px] text-[var(--text3)] font-medium">Trending</span>
              </div>

              <div className="divide-y divide-[var(--border)]">
                {trendingStories.map((story, idx) => (
                  <article key={story.id} className="py-4 first:pt-0 last:pb-0 group">
                    <div className="flex items-start gap-3.5">
                      <span className="text-2xl font-black text-[var(--text3)]/40 group-hover:text-[var(--accent)] transition-colors">
                        0{idx + 1}
                      </span>
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-bold text-[var(--accent)] uppercase">{story.country}</span>
                          <span>•</span>
                          <span className="text-[var(--text3)]">{story.readingTime} min</span>
                        </div>
                        <h4 className="text-sm font-semibold leading-snug line-clamp-2">
                          <Link
                            href={`/intelligence/${story.slug}`}
                            className="text-[var(--text)] group-hover:text-[var(--accent)] transition-colors"
                          >
                            {story.title}
                          </Link>
                        </h4>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Box 2: Sovereign AI Capital Benchmark Snapshot */}
            <div className="card p-6 bg-gradient-to-br from-[var(--surface)] to-[var(--surface2)] border border-[var(--border)] space-y-4 rounded-2xl">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent2)] flex items-center gap-1.5">
                  <Shield size={13} />
                  Sovereign Capital Index
                </div>
                <h3 className="text-base font-bold text-[var(--text)] mt-1">
                  Committed Public AI Investments
                </h3>
              </div>

              <div className="space-y-2.5 text-xs sm:text-[13px]">
                {[
                  { country: 'Saudi Arabia', flag: '🇸🇦', val: '$40B Vision 2030' },
                  { country: 'UAE', flag: '🇦🇪', val: '$8.4B Strategy 2031' },
                  { country: 'Egypt', flag: '🇪🇬', val: '$4.8B Talent & NLP' },
                  { country: 'Qatar', flag: '🇶🇦', val: '$3.6B QIA Tech Fund' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                    <span className="flex items-center gap-2 font-medium text-[var(--text)]">
                      <span>{item.flag}</span>
                      <span>{item.country}</span>
                    </span>
                    <span className="font-extrabold text-[var(--accent)]">{item.val}</span>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-[var(--text3)] pt-1 text-center">
                Calibrated across official state development frameworks
              </div>
            </div>

            {/* Box 3: Terminal Dashboard Shortcut Banner */}
            <div className="card p-6 bg-[var(--surface)] border border-[var(--border)] space-y-3.5 rounded-2xl relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
                <BarChart3 size={16} />
                Financial Intelligence
              </div>
              <h4 className="text-base font-bold text-[var(--text)]">
                Launch Full Regional Intelligence Terminal
              </h4>
              <p className="text-xs sm:text-sm text-[var(--text2)] leading-relaxed">
                Access interactive funding charts, venture deal tables, sovereign readiness rankings, and vendor intelligence matrices.
              </p>
              <Link
                href="/dashboard"
                className="btn-primary text-xs sm:text-sm w-full justify-center py-2.5 flex items-center gap-2 shadow-sm font-semibold"
              >
                Launch Intelligence Terminal
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Box 4: Regional Topic Cloud */}
            <div className="card p-6 bg-[var(--surface)] border border-[var(--border)] space-y-3.5 rounded-2xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text)]">
                Regional Thematic Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Vision 2030',
                  'G42',
                  'SDAIA',
                  'Arabic LLMs',
                  'Sovereign AI',
                  'Data Centres',
                  'Open Banking',
                  'Fintech AI',
                  'NEOM',
                  'QIA',
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-[var(--surface2)] text-[var(--text2)] hover:text-[var(--accent)] hover:border-[var(--accent)] border border-[var(--border)] transition-colors cursor-pointer font-medium"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

          </aside>

        </div>

        {/* ─────────────────────────────────────────────────────────────
            6. EXECUTIVE NEWSLETTER CTA
            ───────────────────────────────────────────────────────────── */}
        <section aria-label="Newsletter Subscription">
          <NewsletterCTA />
        </section>

      </div>
    </div>
  )
}
