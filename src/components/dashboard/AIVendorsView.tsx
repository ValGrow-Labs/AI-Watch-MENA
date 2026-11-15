'use client'

import { useState, useMemo } from 'react'
import {
  Building2,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Globe2,
  Users,
  Calendar,
  X,
} from 'lucide-react'
import { VENDORS } from '@/data/vendors'
import type { Vendor } from '@/types'
import CountryPill from '@/components/shared/CountryPill'

export default function AIVendorsView() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCountry, setSelectedCountry] = useState('All')
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)

  const categories = useMemo(() => ['All', ...Array.from(new Set(VENDORS.map((v) => v.category)))], [])
  const countries = useMemo(() => ['All', ...Array.from(new Set(VENDORS.map((v) => v.country)))], [])

  const filteredVendors = useMemo(() => {
    return VENDORS.filter((v) => {
      const matchSearch =
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.description.toLowerCase().includes(search.toLowerCase()) ||
        v.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      const matchCategory = selectedCategory === 'All' || v.category === selectedCategory
      const matchCountry = selectedCountry === 'All' || v.country === selectedCountry
      return matchSearch && matchCategory && matchCountry
    })
  }, [search, selectedCategory, selectedCountry])

  return (
    <div className="space-y-6">
      {/* ─── Control Header ─────────────────────────────────────────── */}
      <div className="card p-5 bg-[var(--surface)] border border-[var(--border)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
              <Building2 size={13} />
              Enterprise Solutions Index
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--text)]">
              AI Vendors, Hyperscalers & Sovereign Providers
            </h2>
          </div>
          <span className="text-xs text-[var(--text3)]">
            {filteredVendors.length} Providers Catalogued
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text3)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search provider, platform, or capability..."
              className="form-input pl-9 text-xs py-2"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-input text-xs py-2 px-2.5 w-auto"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
              ))}
            </select>

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="form-input text-xs py-2 px-2.5 w-auto"
            >
              {countries.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Jurisdictions' : c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ─── Vendors Grid ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVendors.map((vendor) => (
          <div
            key={vendor.id}
            className="card p-5 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-base text-[var(--text)]">{vendor.name}</h3>
                    {vendor.verified && (
                      <span title="Verified Sovereign Provider">
                        <CheckCircle2 size={14} className="text-[var(--accent2)] shrink-0" />
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-semibold text-[var(--accent)]">{vendor.category}</span>
                </div>
                <CountryPill country={vendor.country} />
              </div>

              <p className="text-xs text-[var(--text2)] line-clamp-3 leading-relaxed">
                {vendor.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {vendor.tags.slice(0, 3).map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded bg-[var(--surface2)] text-[var(--text3)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text3)]">
              <span>Est. {vendor.foundedYear || 2020}</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedVendor(vendor)}
                  className="font-semibold text-[var(--text)] hover:underline cursor-pointer"
                >
                  Dossier
                </button>
                <a
                  href={vendor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] font-semibold inline-flex items-center gap-1 hover:underline"
                >
                  Visit <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Vendor Detail Modal ────────────────────────────────────── */}
      {selectedVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="card bg-[var(--surface)] border border-[var(--border)] max-w-lg w-full p-6 space-y-4 rounded-2xl shadow-2xl relative">
            <button
              onClick={() => setSelectedVendor(null)}
              className="absolute right-4 top-4 p-1.5 rounded-lg text-[var(--text3)] hover:text-[var(--text)] hover:bg-[var(--surface2)]"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2">
              <CountryPill country={selectedVendor.country} />
              <span className="text-xs font-bold text-[var(--accent)]">
                {selectedVendor.category}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black text-[var(--text)]">{selectedVendor.name}</h3>
                {selectedVendor.verified && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={12} /> Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--text3)] mt-0.5">
                Enterprise Profile & Capability Statement
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--surface2)] border border-[var(--border)] text-xs text-[var(--text2)] leading-relaxed">
              {selectedVendor.description}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-[var(--surface2)]">
                <span className="text-[var(--text3)] block text-[10px]">Founded</span>
                <strong className="text-[var(--text)]">{selectedVendor.foundedYear || 'Enterprise'}</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-[var(--surface2)]">
                <span className="text-[var(--text3)] block text-[10px]">Workforce Sizing</span>
                <strong className="text-[var(--text)]">{selectedVendor.employees || '1,000+'}</strong>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-[var(--text)] mb-1.5">Core Competency Tags</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedVendor.tags.map((t, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded bg-[var(--surface2)] text-[var(--text)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex justify-between items-center text-xs">
              <a
                href={selectedVendor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
              >
                Official Website <ExternalLink size={12} />
              </a>
              <button
                onClick={() => setSelectedVendor(null)}
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
