'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  TrendingUp,
  Clock,
  User,
  Shield,
  Building2,
  DollarSign,
  Rocket,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  BarChart3,
  Layers,
  Globe2,
} from 'lucide-react'

import { ARTICLES } from '@/data/articles'
import { FUNDING_DEALS } from '@/data/funding'
import { VENDORS } from '@/data/vendors'
import { REGULATION_ENTRIES } from '@/data/regulation'
import { COUNTRY_PROFILES } from '@/data/countries'
import { DASHBOARD_METRICS } from '@/data/dashboard'
import { formatDateShort, getCategoryColor, getCountryFlag } from '@/lib/utils'
import NewsletterCTA from '@/components/shared/NewsletterCTA'
import CountryPill from '@/components/shared/CountryPill'
import CategoryBadge from '@/components/shared/CategoryBadge'

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [activeCountryId, setActiveCountryId] = useState<string>('saudi-arabia')

  // Top breaking headlines for ticker
  const tickerItems = [
    { text: 'SDAIA accelerates Vision 2030 AI strategy with $40B compute & talent commitment in Riyadh', tag: 'SAUDI ARABIA' },
    { text: 'UAE G42 and Microsoft advance $1.5B sovereign AI infrastructure expansion across Abu Dhabi', tag: 'UAE' },
    { text: 'Qatar Investment Authority launches $1B dedicated frontier AI and enterprise venture vehicle', tag: 'QATAR' },
    { text: 'Cairo tech hub registers 40+ new AI ventures in 2026, scaling regional talent exports', tag: 'EGYPT' },
    { text: 'Central Bank of Bahrain broadens open-banking AI regulatory sandbox for regional fintechs', tag: 'BAHRAIN' },
  ]

  // Editorial Hero Article
  const heroArticle = ARTICLES.find((a) => a.featured) || ARTICLES[0]

  // Secondary featured stories
  const secondaryFeatured = ARTICLES.filter((a) => a.id !== heroArticle.id && a.featured).slice(0, 2)

  // Trending stories
  const trendingStories = ARTICLES.filter((a) => a.trending).slice(0, 3)

  // Filtered latest intelligence feed
  const categories = ['All', 'Intelligence', 'Analysis', 'Funding', 'Policy', 'Research']
  const filteredArticles = selectedCategory === 'All'
    ? ARTICLES.slice(0, 6)
    : ARTICLES.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase()).slice(0, 6)

  // Active country profile
  const activeCountry = COUNTRY_PROFILES.find((c) => c.id === activeCountryId) || COUNTRY_PROFILES[0]

  // Highlights
  const recentDeals = FUNDING_DEALS.slice(0, 3)
  const featuredVendors = VENDORS.filter((v) => v.featured).slice(0, 3)
  const latestRegulations = REGULATION_ENTRIES.slice(0, 2)
  const analysisSpotlight = ARTICLES.filter((a) => a.category === 'Analysis' || a.category === 'Research').slice(0, 3)

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-250">
      
      {/* ─────────────────────────────────────────────────────────────
          1. BREAKING INTELLIGENCE TICKER
          ───────────────────────────────────────────────────────────── */}
      <section
        className="w-full border-b border-[var(--border)] overflow-hidden bg-[var(--surface)] text-xs"
        aria-label="Breaking Intelligence Ticker"
      >
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white font-bold tracking-wider shrink-0 uppercase text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            Live Wire
          </div>
          <div className="overflow-hidden whitespace-nowrap relative flex-1 py-2">
            <div className="ticker-content inline-flex items-center gap-8 pl-4">
              {tickerItems.concat(tickerItems).map((item, idx) => (
                <div key={idx} className="inline-flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-wide px-1.5 py-0.5 rounded bg-[var(--surface2)]">
                    {item.tag}
                  </span>
                  <span className="text-[var(--text2)] font-medium text-xs hover:text-[var(--text)] transition-colors">
                    {item.text}
                  </span>
                  <span className="text-[var(--border2)] text-xs">/</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-14 md:space-y-18">

        {/* ─────────────────────────────────────────────────────────────
            2. EDITORIAL HERO SECTION
            ───────────────────────────────────────────────────────────── */}
        <section className="relative" aria-label="Hero Story">
          {/* Subtle Ambient Glows */}
          <div className="hero-orb top-0 -left-20 w-80 h-80 bg-[var(--accent)]" />
          <div className="hero-orb -top-10 right-0 w-96 h-96 bg-[var(--accent2)]" />

          <div className="relative z-10 card p-6 md:p-8 bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Editorial Headline & Narrative */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
                <div className="flex items-center gap-3">
                  <span className="section-label mb-0 text-[11px]">Primary Intelligence</span>
                  <CountryPill country={heroArticle.country} />
                  <CategoryBadge category={heroArticle.category} size="sm" />
                </div>

                <div className="space-y-3">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text)] leading-[1.2]">
                    <Link
                      href={`/intelligence/${heroArticle.slug}`}
                      className="hover:text-[var(--accent)] transition-colors duration-200"
                    >
                      {heroArticle.title}
                    </Link>
                  </h1>
                  <p className="text-[var(--text2)] text-sm sm:text-base leading-relaxed line-clamp-3">
                    {heroArticle.excerpt}
                  </p>
                </div>

                {/* Key Takeaways Box */}
                {heroArticle.keyTakeaways && heroArticle.keyTakeaways.length > 0 && (
                  <div className="bg-[var(--surface2)]/70 p-4 rounded-xl border border-[var(--border)] space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
                      <Sparkles size={12} />
                      Strategic Implications
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--text)]">
                      {heroArticle.keyTakeaways.slice(0, 2).map((takeaway, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 size={13} className="text-[var(--accent2)] shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Metadata & CTA */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[var(--border)]">
                  <div className="flex items-center gap-3 text-xs text-[var(--text2)]">
                    <span className="flex items-center gap-1 font-medium text-[var(--text)]">
                      <User size={13} className="text-[var(--accent)]" />
                      {heroArticle.author.name}
                    </span>
                    <span>•</span>
                    <span>{formatDateShort(heroArticle.publishedAt)}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {heroArticle.readingTime} min read
                    </span>
                  </div>

                  <Link
                    href={`/intelligence/${heroArticle.slug}`}
                    className="btn-primary text-xs py-2 px-4 group shadow-sm"
                  >
                    Read Analysis
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Visual */}
              <div className="lg:col-span-5 relative">
                <Link
                  href={`/intelligence/${heroArticle.slug}`}
                  className="group block relative w-full h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden border border-[var(--border)]"
                >
                  <Image
                    src={heroArticle.image}
                    alt={heroArticle.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium">
                    <span className="inline-block px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/20">
                      High-Density Sovereign Report
                    </span>
                  </div>
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            3. ASYMMETRIC FEATURED INTELLIGENCE GRID
            ───────────────────────────────────────────────────────────── */}
        <section aria-labelledby="featured-heading">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="section-label">Selected Coverage</div>
              <h2 id="featured-heading" className="text-xl sm:text-2xl font-bold tracking-tight">
                Featured Regional Developments
              </h2>
            </div>
            <Link
              href="/intelligence"
              className="text-xs sm:text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent2)] flex items-center gap-1 group transition-colors"
            >
              All Intelligence
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Secondary Column 1 (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-5">
              {secondaryFeatured.map((article) => (
                <div
                  key={article.id}
                  className="card p-4 sm:p-5 flex flex-col sm:flex-row gap-5 hover:border-[var(--accent)] transition-all duration-200"
                >
                  <div className="sm:w-48 h-40 relative rounded-lg overflow-hidden shrink-0 border border-[var(--border)]">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 200px"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-2 left-2">
                      <CategoryBadge category={article.category} size="sm" />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between space-y-2">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <CountryPill country={article.country} />
                        <span className="text-[11px] text-[var(--text3)]">
                          {formatDateShort(article.publishedAt)}
                        </span>
                      </div>
                      <h3 className="font-bold text-base sm:text-lg leading-snug line-clamp-2">
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
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[var(--border)] text-xs text-[var(--text3)]">
                      <span>By {article.author.name}</span>
                      <Link
                        href={`/intelligence/${article.slug}`}
                        className="text-[var(--accent)] font-semibold flex items-center gap-1 hover:underline text-xs"
                      >
                        Read briefing <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trending Column 2 (Right 5 Cols) */}
            <div className="lg:col-span-5 card p-5 flex flex-col justify-between bg-[var(--surface)]">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text)] flex items-center gap-2">
                    <TrendingUp size={14} className="text-[var(--highlight)]" />
                    High Velocity Dispatch
                  </h3>
                  <span className="text-[11px] text-[var(--text3)]">Past 48h</span>
                </div>

                <div className="divide-y divide-[var(--border)]">
                  {trendingStories.map((story, idx) => (
                    <article key={story.id} className="py-3.5 first:pt-0 last:pb-0 group">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl font-black text-[var(--text3)]/50 group-hover:text-[var(--accent)] transition-colors">
                          0{idx + 1}
                        </span>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2 text-[10px]">
                            <span className="font-semibold text-[var(--accent)] uppercase">{story.country}</span>
                            <span>•</span>
                            <span className="text-[var(--text3)]">{story.readingTime} min</span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-semibold leading-snug">
                            <Link
                              href={`/intelligence/${story.slug}`}
                              className="group-hover:text-[var(--accent)] transition-colors line-clamp-2"
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

              <div className="mt-5 pt-4 border-t border-[var(--border)]">
                <Link
                  href="/intelligence"
                  className="w-full btn-ghost text-xs justify-center py-2"
                >
                  View All Trending Intelligence
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            4. REGIONAL AI ECOSYSTEM SELECTOR
            ───────────────────────────────────────────────────────────── */}
        <section className="card p-6 md:p-8 bg-[var(--surface2)]/50 border border-[var(--border)] rounded-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="section-label">Geographical Scope</div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                MENA AI National Strategies
              </h2>
            </div>
            <p className="text-xs text-[var(--text2)] max-w-md">
              Select a regional sovereign market to review national AI blueprints, institutional governance bodies, and committed compute investments.
            </p>
          </div>

          {/* Country Selection Tabs */}
          <div className="flex flex-wrap gap-2 pb-4 border-b border-[var(--border)]">
            {COUNTRY_PROFILES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCountryId(c.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                  activeCountryId === c.id
                    ? 'bg-[var(--accent)] text-white shadow-sm'
                    : 'bg-[var(--surface)] text-[var(--text2)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--text)]'
                }`}
              >
                <span>{c.flag}</span>
                <span>{c.name}</span>
              </button>
            ))}
          </div>

          {/* Selected Country Dossier */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCountry.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              {/* Summary and Strategy */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activeCountry.flag}</span>
                  <div>
                    <h3 className="text-xl font-bold">{activeCountry.name}</h3>
                    <p className="text-xs text-[var(--text3)]">Capital: {activeCountry.capital}</p>
                  </div>
                </div>

                <p className="text-sm text-[var(--text2)] leading-relaxed">
                  {activeCountry.description}
                </p>

                <div className="p-3.5 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] mb-1">
                    National Blueprint
                  </div>
                  <p className="text-xs font-medium text-[var(--text)]">
                    {activeCountry.aiStrategy}
                  </p>
                </div>
              </div>

              {/* Data & Institutional Indicators */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="card p-3.5 bg-[var(--surface)]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text3)]">
                    Committed Capital
                  </div>
                  <div className="text-base font-extrabold text-[var(--accent)] mt-1">
                    {activeCountry.aiInvestment}
                  </div>
                  <div className="text-[11px] text-[var(--text3)] mt-0.5">Sovereign & Private</div>
                </div>

                <div className="card p-3.5 bg-[var(--surface)]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text3)]">
                    Projected GDP Value
                  </div>
                  <div className="text-base font-extrabold text-[var(--accent2)] mt-1">
                    {activeCountry.gdpAI || 'Strategic Multiplier'}
                  </div>
                  <div className="text-[11px] text-[var(--text3)] mt-0.5">Economic Diversification</div>
                </div>

                <div className="card p-3.5 bg-[var(--surface)] sm:col-span-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text3)] mb-1.5">
                    Lead Regulatory Body
                  </div>
                  <div className="text-xs font-semibold text-[var(--text)] flex items-center gap-1.5">
                    <Shield size={14} className="text-[var(--accent)] shrink-0" />
                    <span>{activeCountry.governmentBody}</span>
                  </div>
                </div>

                <div className="card p-3.5 bg-[var(--surface)] sm:col-span-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text3)] mb-1.5">
                    Key National Pillars
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCountry.keyInitiatives.slice(0, 3).map((init, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-[var(--surface2)] text-[var(--text2)] border border-[var(--border)]"
                      >
                        {init}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            5. LATEST AI INTELLIGENCE FEED
            ───────────────────────────────────────────────────────────── */}
        <section aria-labelledby="latest-heading">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="section-label">Editorial Stream</div>
              <h2 id="latest-heading" className="text-xl sm:text-2xl font-bold tracking-tight">
                Latest Market Intelligence
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[var(--accent)] text-white'
                      : 'bg-[var(--surface)] text-[var(--text2)] border border-[var(--border)] hover:bg-[var(--surface2)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="card flex flex-col justify-between overflow-hidden group hover:border-[var(--accent)] transition-all duration-200"
              >
                <div>
                  <div className="h-44 relative w-full overflow-hidden bg-[var(--surface2)]">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <CategoryBadge category={article.category} size="sm" />
                      <CountryPill country={article.country} />
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-[var(--text3)]">
                      <span>{formatDateShort(article.publishedAt)}</span>
                      <span>•</span>
                      <span>{article.readingTime} min read</span>
                    </div>

                    <h3 className="font-bold text-base leading-snug line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                      <Link href={`/intelligence/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-[var(--text2)] line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-4 py-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text3)]">
                  <span>{article.author.name}</span>
                  <Link
                    href={`/intelligence/${article.slug}`}
                    className="text-[var(--accent)] font-semibold flex items-center gap-1 hover:underline"
                  >
                    Briefing <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/intelligence"
              className="btn-ghost text-xs px-6 py-2.5 inline-flex items-center gap-2"
            >
              Browse Complete Intelligence Archive
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            6. MARKET INTELLIGENCE TERMINAL PREVIEW
            ───────────────────────────────────────────────────────────── */}
        <section className="card p-6 md:p-8 bg-gradient-to-br from-[var(--surface)] to-[var(--surface2)] border border-[var(--border)] rounded-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent)] uppercase tracking-widest mb-1.5">
                <BarChart3 size={15} />
                Regional Intelligence Terminal
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                MENA AI Market Indicators & Benchmarks
              </h2>
              <p className="text-xs text-[var(--text2)] mt-1">
                Executive decision-support metrics synthesized across Middle East & North Africa jurisdictions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] px-2.5 py-1 rounded bg-[var(--surface)] text-[var(--text3)] border border-[var(--border)]">
                Illustrative Benchmark Data
              </span>
              <Link
                href="/dashboard"
                className="btn-primary text-xs py-2 px-4 shadow-sm flex items-center gap-1.5"
              >
                Launch Intelligence Terminal
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DASHBOARD_METRICS.map((metric) => (
              <div
                key={metric.id}
                className="metric-card bg-[var(--surface)] p-4 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[var(--text2)]">{metric.label}</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                    +{metric.change}%
                  </span>
                </div>
                <div className="text-2xl font-black text-[var(--text)] mt-2 tracking-tight">
                  {metric.value}
                </div>
                <p className="text-[10px] text-[var(--text3)] mt-1 line-clamp-1">{metric.note}</p>
              </div>
            ))}
          </div>

          {/* Terminal Ecosystem Bar Preview */}
          <div className="mt-6 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
            <div className="flex items-center justify-between text-xs font-semibold text-[var(--text)] mb-3">
              <span>Sovereign AI Ecosystem Maturity Rank</span>
              <span className="text-[11px] text-[var(--text3)]">GCC & North Africa</span>
            </div>

            <div className="space-y-2.5">
              {[
                { name: 'Saudi Arabia', score: '94/100', progress: '94%', note: '$40B Capital & Vision 2030 Compute' },
                { name: 'United Arab Emirates', score: '92/100', progress: '92%', note: 'G42, MBZUAI & AI Ministry Hub' },
                { name: 'Qatar', score: '78/100', progress: '78%', note: 'QIA Frontier Tech & QF Research' },
                { name: 'Egypt', score: '74/100', progress: '74%', note: 'Regional Talent & Arabic NLP Scale' },
              ].map((row, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-medium text-[var(--text)]">{row.name}</span>
                    <span className="text-[var(--text3)] text-[10px]">{row.note}</span>
                    <span className="font-bold text-[var(--accent)]">{row.score}</span>
                  </div>
                  <div className="w-full bg-[var(--surface2)] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] rounded-full"
                      style={{ width: row.progress }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            7. FUNDING & DEALS HIGHLIGHTS
            ───────────────────────────────────────────────────────────── */}
        <section aria-labelledby="funding-heading">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="section-label">Venture & Capital</div>
              <h2 id="funding-heading" className="text-xl sm:text-2xl font-bold tracking-tight">
                Recent Investment Rounds
              </h2>
            </div>
            <Link
              href="/funding"
              className="text-xs sm:text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent2)] flex items-center gap-1 group"
            >
              All Deals Tracker
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recentDeals.map((deal) => (
              <div
                key={deal.id}
                className="card p-5 bg-[var(--surface)] hover:border-[var(--accent)] transition-all space-y-3.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-[var(--text)]">{deal.company}</span>
                  <CountryPill country={deal.country} />
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-[var(--highlight)]">
                    ${deal.amount}{deal.amountUnit}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--surface2)] text-[var(--text2)]">
                    {deal.stage}
                  </span>
                </div>

                <p className="text-xs text-[var(--text2)] line-clamp-2 leading-relaxed">
                  {deal.description}
                </p>

                <div className="pt-3 border-t border-[var(--border)] text-[11px] text-[var(--text3)] space-y-1">
                  <div>
                    <span className="font-semibold text-[var(--text)]">Sector:</span> {deal.sector}
                  </div>
                  <div className="truncate">
                    <span className="font-semibold text-[var(--text)]">Investors:</span>{' '}
                    {deal.investors.slice(0, 2).join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            8. STRATEGIC RESEARCH & REPORTS SPOTLIGHT
            ───────────────────────────────────────────────────────────── */}
        <section aria-labelledby="reports-heading">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="section-label">Research Library</div>
              <h2 id="reports-heading" className="text-xl sm:text-2xl font-bold tracking-tight">
                Strategic Analysis & Deep Dives
              </h2>
            </div>
            <Link
              href="/analysis"
              className="text-xs sm:text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent2)] flex items-center gap-1 group"
            >
              View Research Archive
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {analysisSpotlight.map((report) => (
              <div
                key={report.id}
                className="card p-5 bg-[var(--surface)] hover:border-[var(--accent)] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <CategoryBadge category={report.category} size="sm" />
                    <span className="text-[11px] text-[var(--text3)]">
                      {report.readingTime} min analysis
                    </span>
                  </div>

                  <h3 className="font-bold text-base leading-snug">
                    <Link
                      href={`/intelligence/${report.slug}`}
                      className="hover:text-[var(--accent)] transition-colors line-clamp-2"
                    >
                      {report.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-[var(--text2)] line-clamp-3 leading-relaxed">
                    {report.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[var(--border)] flex items-center justify-between text-xs">
                  <span className="text-[var(--text3)]">By {report.author.name}</span>
                  <Link
                    href={`/intelligence/${report.slug}`}
                    className="text-[var(--accent)] font-semibold flex items-center gap-1 hover:underline"
                  >
                    Read Whitepaper <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            9. POLICY & REGULATION SPOTLIGHT
            ───────────────────────────────────────────────────────────── */}
        <section aria-labelledby="policy-heading">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="section-label">Sovereignty & Governance</div>
              <h2 id="policy-heading" className="text-xl sm:text-2xl font-bold tracking-tight">
                Regulatory Frameworks & Policies
              </h2>
            </div>
            <Link
              href="/regulation"
              className="text-xs sm:text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent2)] flex items-center gap-1 group"
            >
              All Regulations
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {latestRegulations.map((reg) => (
              <div
                key={reg.id}
                className="card p-5 bg-[var(--surface)] border-l-4 border-l-[var(--accent)] hover:border-[var(--accent)] transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    {reg.status}
                  </span>
                  <CountryPill country={reg.country} />
                </div>

                <h3 className="font-bold text-base leading-snug">
                  <Link href="/regulation" className="hover:text-[var(--accent)] transition-colors">
                    {reg.title}
                  </Link>
                </h3>

                <p className="text-xs text-[var(--text2)] line-clamp-2 leading-relaxed">
                  {reg.summary}
                </p>

                <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text3)]">
                  <span>Authority: {reg.authority}</span>
                  <span className="font-semibold text-[var(--accent)]">{reg.category}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            10. FEATURED AI VENDORS & TOOLS
            ───────────────────────────────────────────────────────────── */}
        <section aria-labelledby="vendors-heading">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="section-label">Enterprise Solutions</div>
              <h2 id="vendors-heading" className="text-xl sm:text-2xl font-bold tracking-tight">
                Featured Regional AI Champions
              </h2>
            </div>
            <Link
              href="/vendors"
              className="text-xs sm:text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent2)] flex items-center gap-1 group"
            >
              Explore Directory
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="card p-5 bg-[var(--surface)] hover:border-[var(--accent)] transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-base">
                      <span>{vendor.name}</span>
                      {vendor.verified && (
                        <CheckCircle2 size={15} className="text-[var(--accent2)]" />
                      )}
                    </div>
                    <CountryPill country={vendor.country} />
                  </div>

                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                    {vendor.category}
                  </span>

                  <p className="text-xs text-[var(--text2)] line-clamp-3 leading-relaxed">
                    {vendor.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[var(--text3)]">
                    Est. {vendor.foundedYear || 2020} • {vendor.employees || 'Enterprise'}
                  </span>
                  <a
                    href={vendor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)] font-semibold inline-flex items-center gap-1 hover:underline"
                  >
                    Profile <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            11. EXECUTIVE NEWSLETTER SUBSCRIPTION
            ───────────────────────────────────────────────────────────── */}
        <section aria-label="Executive Briefing Subscription">
          <NewsletterCTA />
        </section>

      </div>
    </div>
  )
}
