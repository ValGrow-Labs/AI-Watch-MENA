'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import {
  Settings,
  Sun,
  Moon,
  Laptop,
  CheckCircle2,
  RotateCcw,
  Bell,
  DollarSign,
  Layers,
  Sparkles,
} from 'lucide-react'

interface SettingsViewProps {
  onClearBookmarks: () => void
}

export default function SettingsView({ onClearBookmarks }: SettingsViewProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currency, setCurrency] = useState('USD')
  const [density, setDensity] = useState('compact')
  const [notifications, setNotifications] = useState(true)
  const [savedSuccess, setSavedSuccess] = useState(false)

  useEffect(() => {
    setMounted(true)
    const storedCurr = localStorage.getItem('ai_watch_currency')
    if (storedCurr) setCurrency(storedCurr)
  }, [])

  function handleCurrencyChange(c: string) {
    setCurrency(c)
    localStorage.setItem('ai_watch_currency', c)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2000)
  }

  if (!mounted) return null

  return (
    <div className="space-y-6 max-w-3xl">
      {/* ─── Header ─────────────────────────────────────────────────── */}
      <div className="card p-5 bg-[var(--surface)] border border-[var(--border)]">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
          <Settings size={13} />
          Terminal Configuration
        </div>
        <h2 className="text-base sm:text-lg font-bold text-[var(--text)]">
          Terminal Preferences & Regional Display Parameters
        </h2>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 size={14} />
          <span>Terminal preferences updated and persisted.</span>
        </div>
      )}

      {/* ─── 1. Theme Configuration ─────────────────────────────────── */}
      <div className="card p-5 bg-[var(--surface)] border border-[var(--border)] space-y-3">
        <div>
          <h3 className="font-bold text-sm text-[var(--text)]">Interface Theme Mode</h3>
          <p className="text-xs text-[var(--text2)] mt-0.5">
            Switch between Warm Ivory Editorial (Light) and Midnight Navy Intelligence (Dark).
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'light', label: 'Light Mode', sub: 'Warm Ivory', icon: Sun },
            { id: 'dark', label: 'Dark Mode', sub: 'Midnight Navy', icon: Moon },
            { id: 'system', label: 'System Default', sub: 'OS Automatic', icon: Laptop },
          ].map((mode) => {
            const Icon = mode.icon
            const isSelected = theme === mode.id
            return (
              <button
                key={mode.id}
                onClick={() => setTheme(mode.id)}
                className={`p-3.5 rounded-xl border text-left flex flex-col justify-between space-y-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--surface2)] border-[var(--accent)] shadow-sm'
                    : 'bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border2)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon size={16} className={isSelected ? 'text-[var(--accent)]' : 'text-[var(--text3)]'} />
                  {isSelected && <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />}
                </div>
                <div>
                  <div className="font-bold text-xs text-[var(--text)]">{mode.label}</div>
                  <div className="text-[10px] text-[var(--text3)]">{mode.sub}</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── 2. Benchmark Currency ───────────────────────────────────── */}
      <div className="card p-5 bg-[var(--surface)] border border-[var(--border)] space-y-3">
        <div>
          <h3 className="font-bold text-sm text-[var(--text)]">Valuation Benchmark Currency</h3>
          <p className="text-xs text-[var(--text2)] mt-0.5">
            Select standard denomination for financial indicators and venture deal tables.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { code: 'USD', name: 'US Dollar', symbol: '$ USD' },
            { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س SAR' },
            { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ AED' },
          ].map((curr) => {
            const isSelected = currency === curr.code
            return (
              <button
                key={curr.code}
                onClick={() => handleCurrencyChange(curr.code)}
                className={`p-3.5 rounded-xl border text-left flex flex-col justify-between space-y-1 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--surface2)] border-[var(--accent)] shadow-sm'
                    : 'bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border2)]'
                }`}
              >
                <span className="font-extrabold text-sm text-[var(--text)]">{curr.symbol}</span>
                <span className="text-[10px] text-[var(--text3)]">{curr.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── 3. Information Density ─────────────────────────────────── */}
      <div className="card p-5 bg-[var(--surface)] border border-[var(--border)] space-y-3">
        <div>
          <h3 className="font-bold text-sm text-[var(--text)]">Information Density Mode</h3>
          <p className="text-xs text-[var(--text2)] mt-0.5">
            Optimize table spacing and metric presentation for high-density analysis.
          </p>
        </div>

        <div className="flex gap-3">
          {[
            { id: 'compact', label: 'Terminal Compact (Recommended)', desc: 'High information density' },
            { id: 'comfortable', label: 'Comfortable', desc: 'Relaxed reading spacing' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setDensity(item.id)}
              className={`p-3 rounded-xl border flex-1 text-left transition-all cursor-pointer ${
                density === item.id
                  ? 'bg-[var(--surface2)] border-[var(--accent)] shadow-sm'
                  : 'bg-[var(--surface)] border-[var(--border)]'
              }`}
            >
              <div className="font-bold text-xs text-[var(--text)]">{item.label}</div>
              <div className="text-[10px] text-[var(--text3)]">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ─── 4. Reset & Clear Data ──────────────────────────────────── */}
      <div className="card p-5 bg-[var(--surface)] border border-[var(--border)] space-y-3">
        <div>
          <h3 className="font-bold text-sm text-[var(--text)]">Data Persistence & Cache</h3>
          <p className="text-xs text-[var(--text2)] mt-0.5">
            Reset local terminal bookmarks and browser stored filters.
          </p>
        </div>

        <button
          onClick={onClearBookmarks}
          className="btn-ghost text-xs py-2 px-3 text-rose-500 hover:text-rose-600 flex items-center gap-1.5"
        >
          <RotateCcw size={13} /> Reset Local Dossier & Clear Bookmarks
        </button>
      </div>
    </div>
  )
}

