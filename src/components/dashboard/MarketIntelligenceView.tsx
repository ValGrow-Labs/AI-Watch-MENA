'use client'

import { useState } from 'react'
import {
  TrendingUp,
  Cpu,
  Server,
  Zap,
  Globe2,
  DollarSign,
  Layers,
  ArrowUpRight,
  Filter,
} from 'lucide-react'
import { FundingAreaChart, InvestmentVelocityChart } from './DashboardCharts'

export default function MarketIntelligenceView() {
  const [timeframe, setTimeframe] = useState<'6M' | '12M' | '18M'>('18M')

  return (
    <div className="space-y-6">
      {/* ─── Macro Compute Infrastructure Indicators ─────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'Sovereign Compute Capacity',
            value: '420 MW',
            change: '+54% YoY',
            icon: Zap,
            detail: 'AI-ready data centre load active & under construction across GCC',
          },
          {
            title: 'Accelerated GPU Clusters',
            value: '~65,000',
            change: '+82% YoY',
            icon: Cpu,
            detail: 'NVIDIA H100 / H200 equivalent chips deployed regionally',
          },
          {
            title: 'Sovereign Cloud Regions',
            value: '18 Regions',
            change: '+4 Announced',
            icon: Server,
            detail: 'Oracle, Google Cloud, Azure & Core42 domestic data zones',
          },
          {
            title: 'Venture Capital Velocity',
            value: '$10.5B',
            change: '+38% 3-Yr CAGR',
            icon: DollarSign,
            detail: 'Cumulative invested capital in MENA AI ecosystem since 2022',
          },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <div
              key={i}
              className="card p-4 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-all space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text3)] font-medium">{stat.title}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center">
                  <ArrowUpRight size={13} />
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-black text-[var(--text)] tracking-tight">
                {stat.value}
              </div>
              <p className="text-[10px] text-[var(--text2)] leading-relaxed">
                {stat.detail}
              </p>
            </div>
          )
        })}
      </div>

      {/* ─── Advanced Funding Trajectory with Controls ───────────────── */}
      <div className="card p-5 bg-[var(--surface)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border)]">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
              Historical Momentum Analysis
            </div>
            <h3 className="text-base font-bold text-[var(--text)]">
              18-Month Regional Capital Deployment by Sovereign Market ($M)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--text3)] flex items-center gap-1">
              <Filter size={12} /> Range:
            </span>
            {(['6M', '12M', '18M'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  timeframe === t
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--surface2)] text-[var(--text2)] hover:text-[var(--text)]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <FundingAreaChart height={300} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-[var(--border)] text-xs text-[var(--text2)]">
          <div className="p-2.5 rounded-lg bg-[var(--surface2)]/50">
            <span className="font-bold text-[var(--text)]">Saudi Arabia:</span> Consistent upward inflection driven by Vision 2030 megaprojects and SDAIA national compute mandates.
          </div>
          <div className="p-2.5 rounded-lg bg-[var(--surface2)]/50">
            <span className="font-bold text-[var(--text)]">United Arab Emirates:</span> Megarounds anchored by G42 sovereign compute, Core42 hyperscale expansion, and fintech AI.
          </div>
          <div className="p-2.5 rounded-lg bg-[var(--surface2)]/50">
            <span className="font-bold text-[var(--text)]">Egypt & GCC Peers:</span> Sustained talent exports and seed-to-Series A expansion in Cairo, Manama, and Doha.
          </div>
        </div>
      </div>

      {/* ─── Cumulative Capital Velocity Chart ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 card p-5 bg-[var(--surface)] space-y-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--highlight)]">
              Cumulative Growth Curve
            </div>
            <h3 className="text-sm font-bold text-[var(--text)]">
              MENA AI Cumulative Capital Infusion (2022–2024, $B)
            </h3>
          </div>
          <InvestmentVelocityChart height={250} />
        </div>

        <div className="lg:col-span-5 card p-5 bg-[var(--surface)] space-y-3 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent2)]">
              Key Sovereign Takeaways
            </div>
            <h3 className="text-sm font-bold text-[var(--text)]">
              Capital Aggregation Dynamics
            </h3>
          </div>

          <div className="space-y-2.5 text-xs text-[var(--text2)]">
            <div className="p-3 rounded-lg bg-[var(--surface2)] border border-[var(--border)]">
              <strong className="text-[var(--text)]">Sovereign Wealth Dominance:</strong> PIF, Mubadala, and QIA account for &gt;62% of primary and co-investment capital in regional AI infrastructure.
            </div>
            <div className="p-3 rounded-lg bg-[var(--surface2)] border border-[var(--border)]">
              <strong className="text-[var(--text)]">Enterprise GenAI Spike:</strong> Corporate spending on custom Arabic LLMs and automated workflows expanded 140% across GCC energy and banking.
            </div>
            <div className="p-3 rounded-lg bg-[var(--surface2)] border border-[var(--border)]">
              <strong className="text-[var(--text)]">Global Hyperscaler Co-Location:</strong> Microsoft, AWS, Google, and Oracle investments are paired with sovereign data localization covenants.
            </div>
          </div>

          <div className="text-[10px] text-[var(--text3)] pt-2 border-t border-[var(--border)] text-center">
            Source: AI Watch MENA Research & Public Filings Compilation
          </div>
        </div>
      </div>
    </div>
  )
}

