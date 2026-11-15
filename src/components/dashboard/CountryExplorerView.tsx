'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe2,
  Shield,
  Rocket,
  DollarSign,
  FileText,
  CheckCircle2,
  Building2,
  ExternalLink,
  ArrowRight,
  TrendingUp,
} from 'lucide-react'

import { COUNTRY_PROFILES } from '@/data/countries'
import { ARTICLES } from '@/data/articles'
import { REGULATION_ENTRIES } from '@/data/regulation'
import { FUNDING_DEALS } from '@/data/funding'
import CountryPill from '@/components/shared/CountryPill'
import CategoryBadge from '@/components/shared/CategoryBadge'
import { formatDateShort } from '@/lib/utils'

interface CountryExplorerViewProps {
  initialCountryId?: string
}

export default function CountryExplorerView({ initialCountryId = 'saudi-arabia' }: CountryExplorerViewProps) {
  const [activeCountryId, setActiveCountryId] = useState<string>(initialCountryId)

  const activeCountry =
    COUNTRY_PROFILES.find((c) => c.id === activeCountryId) || COUNTRY_PROFILES[0]

  // Filter linked intelligence for this country
  const relatedArticles = ARTICLES.filter((a) => a.country === activeCountry.name).slice(0, 3)
  const relatedRegulations = REGULATION_ENTRIES.filter((r) => r.country === activeCountry.name).slice(0, 3)
  const relatedDeals = FUNDING_DEALS.filter((d) => d.country === activeCountry.name).slice(0, 3)

  return (
    <div className="space-y-6">
      {/* ─── Regional Map-Style Selector Bar ────────────────────────── */}
      <div className="card p-5 bg-[var(--surface)] border border-[var(--border)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
              <Globe2 size={13} />
              Geographic Intelligence Terminal
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--text)]">
              Select Regional Sovereign Market
            </h2>
          </div>
          <span className="text-xs text-[var(--text3)]">
            7 Sovereign AI Hubs Monitored
          </span>
        </div>

        {/* Country Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {COUNTRY_PROFILES.map((country) => {
            const isSelected = activeCountryId === country.id
            return (
              <button
                key={country.id}
                onClick={() => setActiveCountryId(country.id)}
                className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'bg-[var(--surface2)] border-[var(--accent)] shadow-sm'
                    : 'bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border2)] hover:bg-[var(--surface2)]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{country.flag}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                  )}
                </div>
                <div>
                  <div className="font-bold text-xs text-[var(--text)]">{country.name}</div>
                  <div className="text-[10px] text-[var(--text3)] truncate mt-0.5">
                    {country.capital}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── Active Country Strategic Dossier ──────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCountry.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {/* Top Banner: Country Profile & Key Metrics */}
          <div className="card p-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Narrative (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{activeCountry.flag}</span>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-[var(--text)]">
                      {activeCountry.name}
                    </h3>
                    <p className="text-xs text-[var(--text3)]">
                      Capital: {activeCountry.capital} • Sovereign AI Dossier
                    </p>
                  </div>
                </div>

                <p className="text-sm text-[var(--text2)] leading-relaxed">
                  {activeCountry.description}
                </p>

                <div className="p-4 rounded-xl bg-[var(--surface2)]/70 border border-[var(--border)] space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
                    <Shield size={13} />
                    National AI Blueprint
                  </div>
                  <p className="text-xs font-medium text-[var(--text)] leading-normal">
                    {activeCountry.aiStrategy}
                  </p>
                </div>
              </div>

              {/* Right Column: Quantitative Sizing (5 cols) */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="card p-3.5 bg-[var(--surface2)]/40 border border-[var(--border)]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text3)]">
                    Committed Capital
                  </div>
                  <div className="text-lg font-black text-[var(--accent)] mt-1">
                    {activeCountry.aiInvestment}
                  </div>
                  <div className="text-[10px] text-[var(--text3)] mt-0.5">Sovereign & Private</div>
                </div>

                <div className="card p-3.5 bg-[var(--surface2)]/40 border border-[var(--border)]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text3)]">
                    GDP Projection
                  </div>
                  <div className="text-lg font-black text-[var(--accent2)] mt-1">
                    {activeCountry.gdpAI || 'Strategic'}
                  </div>
                  <div className="text-[10px] text-[var(--text3)] mt-0.5">Projected Value Add</div>
                </div>

                <div className="card p-3.5 bg-[var(--surface2)]/40 border border-[var(--border)] sm:col-span-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text3)] mb-1">
                    Lead Regulatory Authority
                  </div>
                  <div className="text-xs font-bold text-[var(--text)] flex items-center gap-1.5">
                    <Shield size={14} className="text-[var(--accent)] shrink-0" />
                    <span>{activeCountry.governmentBody}</span>
                  </div>
                </div>

                <div className="card p-3.5 bg-[var(--surface2)]/40 border border-[var(--border)] sm:col-span-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text3)] mb-1.5">
                    Strategic National Pillars
                  </div>
                  <ul className="space-y-1 text-xs text-[var(--text2)]">
                    {activeCountry.keyInitiatives.slice(0, 4).map((init, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 size={12} className="text-[var(--accent2)] shrink-0" />
                        <span className="line-clamp-1">{init}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>

          {/* ─── 3 Column Grid: Startups, Regulations & Linked Intelligence */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            
            {/* Top Regional Startups */}
            <div className="card p-5 bg-[var(--surface)] space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text)] flex items-center gap-1.5">
                    <Rocket size={13} className="text-[var(--highlight)]" />
                    Domestic AI Startups
                  </h4>
                  <span className="text-[10px] text-[var(--text3)]">{activeCountry.name}</span>
                </div>
                <div className="space-y-2 mt-3">
                  {activeCountry.topStartups.map((startup, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-[var(--surface2)]/60 border border-[var(--border)] flex items-center justify-between text-xs"
                    >
                      <span className="font-bold text-[var(--text)]">{startup}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--accent)] font-semibold border border-[var(--border)]">
                        Enterprise AI
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-2 text-[10px] text-[var(--text3)]">
                Compiled from national startup registries & incubators
              </div>
            </div>

            {/* Regulatory Frameworks in Jurisdiction */}
            <div className="card p-5 bg-[var(--surface)] space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text)] flex items-center gap-1.5">
                    <Shield size={13} className="text-[var(--accent)]" />
                    Jurisdiction Policies
                  </h4>
                  <span className="text-[10px] text-[var(--text3)]">{relatedRegulations.length} Acts</span>
                </div>
                <div className="divide-y divide-[var(--border)] mt-2">
                  {relatedRegulations.length > 0 ? (
                    relatedRegulations.map((reg) => (
                      <div key={reg.id} className="py-2.5 first:pt-0 last:pb-0 space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            {reg.status}
                          </span>
                          <span className="text-[var(--text3)]">{reg.category}</span>
                        </div>
                        <h5 className="text-xs font-bold text-[var(--text)] line-clamp-1">
                          {reg.title}
                        </h5>
                        <p className="text-[10px] text-[var(--text2)] line-clamp-2">
                          {reg.summary}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-xs text-[var(--text3)]">
                      No standalone regulatory acts published yet for this market.
                    </div>
                  )}
                </div>
              </div>
              <div className="pt-2 text-[10px] text-[var(--text3)]">
                Monitored via Official Gazettes & Government Portals
              </div>
            </div>

            {/* Linked Research & Intelligence */}
            <div className="card p-5 bg-[var(--surface)] space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text)] flex items-center gap-1.5">
                    <FileText size={13} className="text-[var(--accent2)]" />
                    Linked Field Reports
                  </h4>
                  <span className="text-[10px] text-[var(--text3)]">Editorial Dispatch</span>
                </div>
                <div className="divide-y divide-[var(--border)] mt-2">
                  {relatedArticles.length > 0 ? (
                    relatedArticles.map((art) => (
                      <div key={art.id} className="py-2.5 first:pt-0 last:pb-0 space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-[var(--text3)]">
                          <span>{formatDateShort(art.publishedAt)}</span>
                          <span>{art.readingTime} min</span>
                        </div>
                        <h5 className="text-xs font-bold leading-snug line-clamp-2 hover:text-[var(--accent)] transition-colors">
                          <Link href={`/intelligence/${art.slug}`}>{art.title}</Link>
                        </h5>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-xs text-[var(--text3)]">
                      General regional coverage covers this market.
                    </div>
                  )}
                </div>
              </div>
              <Link
                href="/intelligence"
                className="btn-ghost text-xs justify-center py-1.5"
              >
                Browse Regional Archive →
              </Link>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

