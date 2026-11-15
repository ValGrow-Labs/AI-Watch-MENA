'use client'

import Link from 'next/link'
import {
  TrendingUp,
  DollarSign,
  Rocket,
  Building2,
  Server,
  ArrowRight,
  Shield,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { DASHBOARD_METRICS } from '@/data/dashboard'
import { FUNDING_DEALS } from '@/data/funding'
import { REGULATION_ENTRIES } from '@/data/regulation'
import { VENDORS } from '@/data/vendors'
import { COUNTRY_PROFILES } from '@/data/countries'
import { FundingAreaChart, SectorDonutChart, CountryComparisonChart } from './DashboardCharts'
import CountryPill from '@/components/shared/CountryPill'

interface OverviewViewProps {
  onNavigate: (view: string) => void
  selectedCountry: string
}

export default function OverviewView({ onNavigate, selectedCountry }: OverviewViewProps) {
  const recentDeals = FUNDING_DEALS.slice(0, 4)
  const recentRegs = REGULATION_ENTRIES.slice(0, 3)
  const featuredVendors = VENDORS.filter((v) => v.featured).slice(0, 3)

  return (
    <div className="space-y-6">
      {/* ─── Illustrative Benchmark Notice ─────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[var(--surface2)]/60 border border-[var(--border)] text-xs text-[var(--text2)]">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-[var(--accent)] shrink-0" />
          <span>
            <strong className="text-[var(--text)]">Executive AI Intelligence Terminal:</strong> Real-time benchmarking synthesized across 7 MENA sovereign jurisdictions. All figures calibrated for executive demonstration.
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--text3)] border border-[var(--border)]">
          Demo Benchmark Data
        </span>
      </div>

      {/* ─── 4 KPI Metrics Row ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DASHBOARD_METRICS.map((kpi) => (
          <div
            key={kpi.id}
            className="metric-card bg-[var(--surface)] p-4 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--text2)]">{kpi.label}</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                <TrendingUp size={12} />
                +{kpi.change}%
              </span>
            </div>
            <div className="text-2xl font-black text-[var(--text)] mt-2 tracking-tight">
              {kpi.value}
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--border)] text-[10px] text-[var(--text3)]">
              <span>{kpi.note}</span>
              <span className="font-semibold text-[var(--accent)]">{kpi.changeLabel}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Primary Charts Row (Area + Donut) ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Funding Trajectory (8 cols) */}
        <div className="lg:col-span-8 card p-5 bg-[var(--surface)] space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                Capital Momentum (2023–2024)
              </div>
              <h3 className="text-sm font-bold text-[var(--text)]">
                Regional AI Investment Trajectory by Market ($M)
              </h3>
            </div>
            <button
              onClick={() => onNavigate('market-intelligence')}
              className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer"
            >
              Advanced Analytics <ArrowRight size={12} />
            </button>
          </div>
          <FundingAreaChart height={270} />
        </div>

        {/* Right: Sector Breakdown (4 cols) */}
        <div className="lg:col-span-4 card p-5 bg-[var(--surface)] space-y-3 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent2)]">
              Capital Distribution
            </div>
            <h3 className="text-sm font-bold text-[var(--text)]">
              Regional Capital by Sector (%)
            </h3>
          </div>
          <SectorDonutChart height={230} />
          <div className="text-center pt-2 border-t border-[var(--border)] text-[11px] text-[var(--text3)]">
            Dominant vertical: <strong className="text-[var(--text)]">Fintech AI (28%)</strong>
          </div>
        </div>
      </div>

      {/* ─── Secondary Analytics Row (Bar Chart + Sovereign Ranking) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Country Comparison Bar Chart (7 cols) */}
        <div className="lg:col-span-7 card p-5 bg-[var(--surface)] space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--highlight)]">
                Ecosystem Sizing
              </div>
              <h3 className="text-sm font-bold text-[var(--text)]">
                Startups vs Committed Funding by Jurisdiction
              </h3>
            </div>
            <button
              onClick={() => onNavigate('country-explorer')}
              className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer"
            >
              Country Explorer <ArrowRight size={12} />
            </button>
          </div>
          <CountryComparisonChart height={260} />
        </div>

        {/* Right: Sovereign AI Readiness Ranking (5 cols) */}
        <div className="lg:col-span-5 card p-5 bg-[var(--surface)] space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text)] flex items-center gap-1.5">
              <Shield size={14} className="text-[var(--accent)]" />
              Sovereign AI Maturity Index
            </h3>
            <span className="text-[10px] text-[var(--text3)]">Q4 2026</span>
          </div>

          <div className="space-y-3">
            {[
              { country: 'Saudi Arabia', score: '94/100', progress: 94, detail: 'Vision 2030, $40B Capital & SDAIA' },
              { country: 'United Arab Emirates', score: '92/100', progress: 92, detail: 'G42, AI Ministry & MBZUAI Hub' },
              { country: 'Qatar', score: '78/100', progress: 78, detail: 'QIA Frontier Tech & TASMU Smart Qatar' },
              { country: 'Egypt', score: '74/100', progress: 74, detail: 'Arabic NLP Engineering & Cairo Scale' },
              { country: 'Bahrain', score: '69/100', progress: 69, detail: 'FinHub 973 & CBB Regulatory Sandbox' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--text)]">{item.country}</span>
                  <span className="font-bold text-[var(--accent)]">{item.score}</span>
                </div>
                <div className="w-full bg-[var(--surface2)] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] rounded-full"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <div className="text-[10px] text-[var(--text3)]">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Bottom Intelligence Grid (Deals + Regulations + Vendors) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Column 1: Recent Funding Stream */}
        <div className="card p-4 bg-[var(--surface)] flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text)] flex items-center gap-1.5">
                <DollarSign size={13} className="text-[var(--highlight)]" />
                Capital Velocity
              </h4>
              <button
                onClick={() => onNavigate('funding-deals')}
                className="text-[11px] font-semibold text-[var(--accent)] hover:underline cursor-pointer"
              >
                All Deals →
              </button>
            </div>
            <div className="divide-y divide-[var(--border)] mt-2">
              {recentDeals.map((deal) => (
                <div key={deal.id} className="py-2.5 first:pt-0 last:pb-0 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--text)]">{deal.company}</span>
                    <span className="font-extrabold text-[var(--highlight)]">
                      ${deal.amount}{deal.amountUnit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-[var(--text3)]">
                    <span>{deal.sector}</span>
                    <CountryPill country={deal.country} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Governance & Regulation Updates */}
        <div className="card p-4 bg-[var(--surface)] flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text)] flex items-center gap-1.5">
                <Shield size={13} className="text-[var(--accent)]" />
                Policy Directives
              </h4>
              <button
                onClick={() => onNavigate('regulation-tracker')}
                className="text-[11px] font-semibold text-[var(--accent)] hover:underline cursor-pointer"
              >
                All Policies →
              </button>
            </div>
            <div className="divide-y divide-[var(--border)] mt-2">
              {recentRegs.map((reg) => (
                <div key={reg.id} className="py-2.5 first:pt-0 last:pb-0 space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {reg.status}
                    </span>
                    <CountryPill country={reg.country} />
                  </div>
                  <div className="text-xs font-semibold text-[var(--text)] line-clamp-1">
                    {reg.title}
                  </div>
                  <div className="text-[10px] text-[var(--text3)] line-clamp-1">
                    {reg.authority}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3: Active AI Champions */}
        <div className="card p-4 bg-[var(--surface)] flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text)] flex items-center gap-1.5">
                <Building2 size={13} className="text-[var(--accent2)]" />
                Regional Vendors
              </h4>
              <button
                onClick={() => onNavigate('ai-vendors')}
                className="text-[11px] font-semibold text-[var(--accent)] hover:underline cursor-pointer"
              >
                Directory →
              </button>
            </div>
            <div className="divide-y divide-[var(--border)] mt-2">
              {featuredVendors.map((vendor) => (
                <div key={vendor.id} className="py-2.5 first:pt-0 last:pb-0 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--text)]">{vendor.name}</span>
                    <CountryPill country={vendor.country} />
                  </div>
                  <div className="text-[10px] font-medium text-[var(--accent)]">
                    {vendor.category}
                  </div>
                  <div className="text-[10px] text-[var(--text3)] line-clamp-1">
                    {vendor.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

