'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts'
import { FUNDING_CHART_DATA, SECTOR_DATA, COUNTRY_COMPARISON_DATA, INVESTMENT_TIMELINE } from '@/data/dashboard'

// ─── Custom Tooltip matching Terminal aesthetic ──────────────────────────────
function CustomChartTooltip({ active, payload, label, unit = '$M' }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--surface)] border border-[var(--border)] p-3 rounded-lg shadow-xl text-xs space-y-1.5 min-w-[140px] backdrop-blur-md">
        <div className="font-bold text-[var(--text)] border-b border-[var(--border)] pb-1">
          {label}
        </div>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 text-[var(--text2)]">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color || entry.fill }}
              />
              {entry.name}:
            </span>
            <span className="font-bold text-[var(--text)]">
              {entry.value} {unit}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

// ─── 1. 18-Month Funding Trajectory Area Chart ───────────────────────────────
export function FundingAreaChart({ height = 280 }: { height?: number }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'

  const strokeGrid = isDark ? '#1E2F47' : '#DFE3EA'
  const textMuted = isDark ? '#6B7E9C' : '#8A98AA'
  const colorSaudi = isDark ? '#6AA5FF' : '#3159A8'
  const colorUAE = isDark ? '#4DD5CB' : '#187E86'
  const colorEgypt = isDark ? '#E0BB78' : '#B58B4A'

  if (!mounted) {
    return <div className="w-full bg-[var(--surface2)] animate-pulse rounded-xl" style={{ height }} />
  }

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={FUNDING_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSaudi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colorSaudi} stopOpacity={0.4} />
              <stop offset="95%" stopColor={colorSaudi} stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorUAE" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colorUAE} stopOpacity={0.4} />
              <stop offset="95%" stopColor={colorUAE} stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorEgypt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colorEgypt} stopOpacity={0.3} />
              <stop offset="95%" stopColor={colorEgypt} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={strokeGrid} vertical={false} />
          <XAxis
            dataKey="label"
            stroke={textMuted}
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: strokeGrid }}
          />
          <YAxis
            stroke={textMuted}
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `$${v}M`}
          />
          <Tooltip content={<CustomChartTooltip unit="$M" />} />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }}
          />
          <Area
            type="monotone"
            dataKey="value"
            name="Saudi Arabia"
            stroke={colorSaudi}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorSaudi)"
          />
          <Area
            type="monotone"
            dataKey="value2"
            name="UAE"
            stroke={colorUAE}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorUAE)"
          />
          <Area
            type="monotone"
            dataKey="value3"
            name="Egypt"
            stroke={colorEgypt}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorEgypt)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── 2. Sector Distribution Donut Chart ──────────────────────────────────────
export function SectorDonutChart({ height = 260 }: { height?: number }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'

  const COLORS = isDark
    ? ['#6AA5FF', '#4DD5CB', '#E0BB78', '#A78BFA', '#38BDF8', '#FBBF24']
    : ['#3159A8', '#187E86', '#B58B4A', '#6366F1', '#0EA5E9', '#D97706']

  if (!mounted) {
    return <div className="w-full bg-[var(--surface2)] animate-pulse rounded-xl" style={{ height }} />
  }

  return (
    <div className="w-full flex items-center justify-center" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            content={({ active, payload }: any) => {
              if (active && payload && payload.length) {
                const data = payload[0]
                return (
                  <div className="bg-[var(--surface)] border border-[var(--border)] p-2.5 rounded-lg shadow-xl text-xs space-y-1">
                    <div className="font-bold text-[var(--text)]">{data.name}</div>
                    <div className="text-[var(--accent)] font-extrabold">{data.value}% of regional capital</div>
                  </div>
                )
              }
              return null
            }}
          />
          <Pie
            data={SECTOR_DATA}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
          >
            {SECTOR_DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── 3. Country Ecosystem Comparison Bar Chart ──────────────────────────────
export function CountryComparisonChart({ height = 280 }: { height?: number }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'
  const strokeGrid = isDark ? '#1E2F47' : '#DFE3EA'
  const textMuted = isDark ? '#6B7E9C' : '#8A98AA'
  const barStartups = isDark ? '#4DD5CB' : '#187E86'
  const barFunding = isDark ? '#6AA5FF' : '#3159A8'

  if (!mounted) {
    return <div className="w-full bg-[var(--surface2)] animate-pulse rounded-xl" style={{ height }} />
  }

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={COUNTRY_COMPARISON_DATA}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={strokeGrid} vertical={false} />
          <XAxis
            dataKey="country"
            stroke={textMuted}
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: strokeGrid }}
          />
          <YAxis
            stroke={textMuted}
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            content={({ active, payload, label }: any) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-[var(--surface)] border border-[var(--border)] p-3 rounded-lg shadow-xl text-xs space-y-1">
                    <div className="font-bold text-[var(--text)] border-b border-[var(--border)] pb-1">
                      {label}
                    </div>
                    <div className="text-[var(--accent2)] font-semibold">
                      Startups: {payload[0]?.value}
                    </div>
                    <div className="text-[var(--accent)] font-semibold">
                      Funding: ${payload[1]?.value}M
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }}
          />
          <Bar
            dataKey="startups"
            name="Active Startups"
            fill={barStartups}
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
          <Bar
            dataKey="funding"
            name="Funding ($M)"
            fill={barFunding}
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── 4. Cumulative Investment Velocity Line Chart ───────────────────────────
export function InvestmentVelocityChart({ height = 260 }: { height?: number }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'
  const strokeGrid = isDark ? '#1E2F47' : '#DFE3EA'
  const textMuted = isDark ? '#6B7E9C' : '#8A98AA'
  const strokeColor = isDark ? '#E0BB78' : '#B58B4A'

  if (!mounted) {
    return <div className="w-full bg-[var(--surface2)] animate-pulse rounded-xl" style={{ height }} />
  }

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={INVESTMENT_TIMELINE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.4} />
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={strokeGrid} vertical={false} />
          <XAxis
            dataKey="label"
            stroke={textMuted}
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: strokeGrid }}
          />
          <YAxis
            stroke={textMuted}
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `$${v}B`}
          />
          <Tooltip content={<CustomChartTooltip unit="$B" />} />
          <Area
            type="monotone"
            dataKey="value"
            name="Cumulative AI Capital"
            stroke={strokeColor}
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#velocityGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

