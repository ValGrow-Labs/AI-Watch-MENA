'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart2,
  TrendingUp,
  Globe2,
  DollarSign,
  Rocket,
  Building2,
  Shield,
  BookOpen,
  Bookmark,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Search,
  Bell,
  User,
  ArrowLeft,
  Sparkles,
  Layers,
  ChevronDown,
} from 'lucide-react'

import ThemeToggle from '@/components/shared/ThemeToggle'
import OverviewView from './OverviewView'
import MarketIntelligenceView from './MarketIntelligenceView'
import CountryExplorerView from './CountryExplorerView'
import FundingDealsView from './FundingDealsView'
import StartupEcosystemView from './StartupEcosystemView'
import AIVendorsView from './AIVendorsView'
import RegulationTrackerView from './RegulationTrackerView'
import ResearchLibraryView from './ResearchLibraryView'
import SavedBriefingsView from './SavedBriefingsView'
import SettingsView from './SettingsView'

import { ARTICLES } from '@/data/articles'
import type { Article } from '@/types'

export type DashboardViewId =
  | 'overview'
  | 'market-intelligence'
  | 'country-explorer'
  | 'funding-deals'
  | 'startup-ecosystem'
  | 'ai-vendors'
  | 'regulation-tracker'
  | 'research-library'
  | 'saved-briefings'
  | 'settings'

interface NavMenuItem {
  id: DashboardViewId
  label: string
  icon: any
  badge?: string
}

export default function DashboardShell() {
  const [currentView, setCurrentView] = useState<DashboardViewId>('overview')
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState('All Hubs')
  const [dateRange, setDateRange] = useState('2024–2026')
  const [globalSearch, setGlobalSearch] = useState('')

  // Bookmark / Saved Briefings state with localStorage
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>([])
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ai_watch_saved_briefings')
      if (stored) {
        setSavedArticleIds(JSON.parse(stored))
      } else {
        // Default with 2 initial saved items for demo
        const initial = [ARTICLES[0].id, ARTICLES[1].id]
        setSavedArticleIds(initial)
        localStorage.setItem('ai_watch_saved_briefings', JSON.stringify(initial))
      }
    } catch {}
  }, [])

  function handleToggleBookmark(article: Article) {
    let next: string[]
    if (savedArticleIds.includes(article.id)) {
      next = savedArticleIds.filter((id) => id !== article.id)
    } else {
      next = [...savedArticleIds, article.id]
    }
    setSavedArticleIds(next)
    localStorage.setItem('ai_watch_saved_briefings', JSON.stringify(next))
  }

  function handleRemoveBookmark(id: string) {
    const next = savedArticleIds.filter((item) => item !== id)
    setSavedArticleIds(next)
    localStorage.setItem('ai_watch_saved_briefings', JSON.stringify(next))
  }

  function handleClearAllBookmarks() {
    setSavedArticleIds([])
    localStorage.removeItem('ai_watch_saved_briefings')
  }

  const savedArticlesList = ARTICLES.filter((a) => savedArticleIds.includes(a.id))

  const menuItems: NavMenuItem[] = [
    { id: 'overview', label: 'Terminal Overview', icon: BarChart2 },
    { id: 'market-intelligence', label: 'Market Intelligence', icon: TrendingUp },
    { id: 'country-explorer', label: 'Country Explorer', icon: Globe2 },
    { id: 'funding-deals', label: 'Funding & Deals', icon: DollarSign },
    { id: 'startup-ecosystem', label: 'Startup Ecosystem', icon: Rocket },
    { id: 'ai-vendors', label: 'AI Vendors', icon: Building2 },
    { id: 'regulation-tracker', label: 'Regulation Tracker', icon: Shield },
    { id: 'research-library', label: 'Research Library', icon: BookOpen },
    {
      id: 'saved-briefings',
      label: 'Saved Dossier',
      icon: Bookmark,
      badge: savedArticleIds.length > 0 ? String(savedArticleIds.length) : undefined,
    },
    { id: 'settings', label: 'Preferences', icon: Settings },
  ]

  const activeItem = menuItems.find((m) => m.id === currentView)

  return (
    <div className="flex h-screen bg-[var(--bg)] text-[var(--text)] overflow-hidden font-sans">
      
      {/* ─────────────────────────────────────────────────────────────
          1. DESKTOP SIDEBAR
          ───────────────────────────────────────────────────────────── */}
      <aside
        className={`hidden lg:flex flex-col border-r border-[var(--border)] bg-[var(--surface)] transition-all duration-300 z-30 shrink-0 ${
          collapsed ? 'w-18' : 'w-64'
        }`}
      >
        {/* Brand / Logo Top Bar */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-[var(--border)] shrink-0">
          {!collapsed ? (
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-6 h-6 rounded-md bg-[var(--accent)] text-white flex items-center justify-center font-black text-xs">
                AI
              </div>
              <div>
                <span className="font-extrabold text-sm tracking-tight text-[var(--text)]">
                  AI Watch <span className="text-[var(--accent)]">MENA</span>
                </span>
                <span className="block text-[9px] font-bold text-[var(--accent2)] uppercase tracking-wider">
                  Intelligence Terminal
                </span>
              </div>
            </Link>
          ) : (
            <div className="mx-auto w-7 h-7 rounded-md bg-[var(--accent)] text-white flex items-center justify-center font-black text-xs">
              AI
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md text-[var(--text3)] hover:text-[var(--text)] hover:bg-[var(--surface2)] transition-colors cursor-pointer"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation Menu Links */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentView === item.id
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[var(--surface2)] text-[var(--accent)] font-bold shadow-xs border-l-3 border-[var(--accent)]'
                    : 'text-[var(--text2)] hover:text-[var(--text)] hover:bg-[var(--surface2)]/60'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={16} className={isActive ? 'text-[var(--accent)] shrink-0' : 'text-[var(--text3)] shrink-0'} />
                {!collapsed && (
                  <span className="flex-1 text-left truncate">{item.label}</span>
                )}
                {!collapsed && item.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[var(--accent)] text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Sidebar Footer: Back to Publication & User Placeholder */}
        <div className="p-3 border-t border-[var(--border)] shrink-0 space-y-2">
          <Link
            href="/"
            className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--text2)] hover:text-[var(--text)] hover:bg-[var(--surface2)] transition-colors ${
              collapsed ? 'justify-center' : ''
            }`}
            title="Return to Public Editorial Publication"
          >
            <ArrowLeft size={14} />
            {!collapsed && <span>Public Portal</span>}
          </Link>

          {!collapsed && (
            <div className="pt-2 border-t border-[var(--border)] flex items-center gap-2.5 px-1">
              <div className="w-7 h-7 rounded-full bg-[var(--surface2)] text-[var(--accent)] flex items-center justify-center font-bold text-xs shrink-0 border border-[var(--border)]">
                <User size={13} />
              </div>
              <div className="min-w-0 flex-1 text-[11px]">
                <div className="font-bold text-[var(--text)] truncate">Executive Member</div>
                <div className="text-[10px] text-[var(--text3)] truncate">ValGrow Intelligence</div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          2. MOBILE SLIDE-OUT DRAWER
          ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-[var(--surface)] border-r border-[var(--border)] flex flex-col"
            >
              <div className="h-14 px-4 flex items-center justify-between border-b border-[var(--border)]">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[var(--accent)] text-white flex items-center justify-center font-black text-xs">
                    AI
                  </div>
                  <span className="font-bold text-sm text-[var(--text)]">
                    AI Watch <span className="text-[var(--accent)]">MENA</span>
                  </span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-[var(--text3)]"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = currentView === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentView(item.id)
                        setMobileMenuOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold ${
                        isActive
                          ? 'bg-[var(--surface2)] text-[var(--accent)] font-bold'
                          : 'text-[var(--text2)]'
                      }`}
                    >
                      <Icon size={16} />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[var(--accent)] text-white">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  )
                })}
              </nav>

              <div className="p-3 border-t border-[var(--border)]">
                <Link
                  href="/"
                  className="btn-ghost text-xs w-full justify-center py-2 flex items-center gap-2"
                >
                  <ArrowLeft size={14} /> Back to Editorial Site
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN CONTENT CONTAINER
          ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* ─── Top Control Bar ────────────────────────────────────────── */}
        <header className="h-14 px-4 sm:px-6 border-b border-[var(--border)] bg-[var(--surface)] flex items-center justify-between gap-4 shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-[var(--text2)] hover:bg-[var(--surface2)]"
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-[var(--text)]">
                {activeItem?.label}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Terminal
              </span>
            </div>
          </div>

          {/* Right Toolbar Controls */}
          <div className="flex items-center gap-2.5">
            {/* Country Selector Filter */}
            <div className="hidden md:flex items-center">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="form-input text-xs py-1 px-2.5 w-auto"
              >
                <option value="All Hubs">All MENA Hubs</option>
                <option value="Saudi Arabia">🇸🇦 Saudi Arabia</option>
                <option value="UAE">🇦🇪 UAE</option>
                <option value="Qatar">🇶🇦 Qatar</option>
                <option value="Bahrain">🇧🇭 Bahrain</option>
                <option value="Egypt">🇪🇬 Egypt</option>
                <option value="Kuwait">🇰🇼 Kuwait</option>
                <option value="Oman">🇴🇲 Oman</option>
              </select>
            </div>

            {/* Date Range Selector */}
            <div className="hidden sm:flex items-center">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="form-input text-xs py-1 px-2.5 w-auto"
              >
                <option value="2024–2026">2024–2026</option>
                <option value="YTD">YTD 2026</option>
                <option value="All Time">All Recorded</option>
              </select>
            </div>

            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-lg text-[var(--text2)] hover:bg-[var(--surface2)] hover:text-[var(--text)] relative cursor-pointer"
                aria-label="Notifications"
              >
                <Bell size={16} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--accent)]" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-xl p-3 z-50 text-xs space-y-2">
                  <div className="font-bold text-[var(--text)] flex items-center justify-between border-b border-[var(--border)] pb-2">
                    <span>Terminal Dispatch</span>
                    <span className="text-[10px] text-[var(--accent)]">2 New</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 rounded bg-[var(--surface2)]">
                      <div className="font-bold text-[var(--text)]">SDAIA Capital Directive</div>
                      <div className="text-[10px] text-[var(--text3)] mt-0.5">$40B National AI allocation published.</div>
                    </div>
                    <div className="p-2 rounded bg-[var(--surface2)]">
                      <div className="font-bold text-[var(--text)]">G42 Cloud Expansion</div>
                      <div className="text-[10px] text-[var(--text3)] mt-0.5">Abu Dhabi compute campus Phase II online.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </header>

        {/* ─── Main Viewport ──────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {currentView === 'overview' && (
              <OverviewView
                onNavigate={(v) => setCurrentView(v as DashboardViewId)}
                selectedCountry={selectedCountry}
              />
            )}
            {currentView === 'market-intelligence' && <MarketIntelligenceView />}
            {currentView === 'country-explorer' && (
              <CountryExplorerView initialCountryId={selectedCountry === 'UAE' ? 'uae' : 'saudi-arabia'} />
            )}
            {currentView === 'funding-deals' && <FundingDealsView />}
            {currentView === 'startup-ecosystem' && <StartupEcosystemView />}
            {currentView === 'ai-vendors' && <AIVendorsView />}
            {currentView === 'regulation-tracker' && <RegulationTrackerView />}
            {currentView === 'research-library' && (
              <ResearchLibraryView
                savedArticleIds={savedArticleIds}
                onToggleBookmark={handleToggleBookmark}
              />
            )}
            {currentView === 'saved-briefings' && (
              <SavedBriefingsView
                savedArticles={savedArticlesList}
                onRemoveBookmark={handleRemoveBookmark}
                onClearAll={handleClearAllBookmarks}
                onNavigate={(v) => setCurrentView(v as DashboardViewId)}
              />
            )}
            {currentView === 'settings' && (
              <SettingsView onClearBookmarks={handleClearAllBookmarks} />
            )}
          </div>
        </main>

      </div>
    </div>
  )
}

