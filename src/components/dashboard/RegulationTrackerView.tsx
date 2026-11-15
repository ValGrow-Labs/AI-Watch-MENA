'use client'

import { useState, useMemo } from 'react'
import {
  Shield,
  Search,
  Filter,
  Calendar,
  ExternalLink,
  CheckCircle2,
  Clock,
  FileText,
  X,
  ChevronRight,
} from 'lucide-react'
import { REGULATION_ENTRIES } from '@/data/regulation'
import type { RegulationEntry } from '@/types'
import CountryPill from '@/components/shared/CountryPill'

export default function RegulationTrackerView() {
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedReg, setSelectedReg] = useState<RegulationEntry | null>(null)

  const countries = useMemo(() => ['All', ...Array.from(new Set(REGULATION_ENTRIES.map((r) => r.country)))], [])
  const statuses = useMemo(() => ['All', ...Array.from(new Set(REGULATION_ENTRIES.map((r) => r.status)))], [])

  const filteredRegulations = useMemo(() => {
    return REGULATION_ENTRIES.filter((r) => {
      const matchSearch =
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.authority.toLowerCase().includes(search.toLowerCase()) ||
        r.summary.toLowerCase().includes(search.toLowerCase()) ||
        r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      const matchCountry = selectedCountry === 'All' || r.country === selectedCountry
      const matchStatus = selectedStatus === 'All' || r.status === selectedStatus
      return matchSearch && matchCountry && matchStatus
    })
  }, [search, selectedCountry, selectedStatus])

  function getStatusBadge(status: string) {
    switch (status) {
      case 'Active':
      case 'Enacted':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
      case 'Draft':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
      case 'Proposed':
      case 'Under Review':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
    }
  }

  return (
    <div className="space-y-6">
      {/* ─── Control Header ─────────────────────────────────────────── */}
      <div className="card p-5 bg-[var(--surface)] border border-[var(--border)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
              <Shield size={13} />
              Sovereign Governance Matrix
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--text)]">
              Regional AI Regulations, Data Sovereignty & Policies
            </h2>
          </div>
          <span className="text-xs text-[var(--text3)]">
            {filteredRegulations.length} Frameworks Tracked
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text3)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search policy, authority, or decree..."
              className="form-input pl-9 text-xs py-2"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="form-input text-xs py-2 px-2.5 w-auto"
            >
              {countries.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Jurisdictions' : c}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="form-input text-xs py-2 px-2.5 w-auto"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ─── Timeline and Grid Layout ───────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Interactive Regulatory Dossiers Grid (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {filteredRegulations.length > 0 ? (
            filteredRegulations.map((reg) => (
              <div
                key={reg.id}
                onClick={() => setSelectedReg(reg)}
                className="card p-5 bg-[var(--surface)] border border-[var(--border)] border-l-4 border-l-[var(--accent)] hover:border-[var(--accent)] transition-all cursor-pointer space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getStatusBadge(reg.status)}`}>
                      {reg.status}
                    </span>
                    <CountryPill country={reg.country} />
                  </div>
                  <span className="text-xs text-[var(--text3)] flex items-center gap-1">
                    <Calendar size={12} /> {reg.date}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-[var(--text)] leading-snug">
                    {reg.title}
                  </h3>
                  <div className="text-xs font-semibold text-[var(--accent)] mt-0.5">
                    Authority: {reg.authority}
                  </div>
                </div>

                <p className="text-xs text-[var(--text2)] line-clamp-2 leading-relaxed">
                  {reg.summary}
                </p>

                <div className="flex flex-wrap items-center justify-between pt-2 border-t border-[var(--border)] text-xs">
                  <div className="flex flex-wrap gap-1">
                    {reg.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-[var(--surface2)] text-[var(--text3)]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                  <span className="text-[var(--accent)] font-semibold text-xs flex items-center gap-1 hover:underline">
                    Inspect Full Policy <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="card p-12 text-center text-xs text-[var(--text3)]">
              No regulatory records match your selected filters.
            </div>
          )}
        </div>

        {/* Right: Policy Timeline (4 cols) */}
        <div className="lg:col-span-4 card p-5 bg-[var(--surface)] border border-[var(--border)] space-y-4">
          <div className="pb-3 border-b border-[var(--border)]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
              Chronological Tracker
            </div>
            <h3 className="text-sm font-bold text-[var(--text)]">
              Key Sovereign Milestones
            </h3>
          </div>

          <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[var(--border)]">
            {[
              { year: '2024', title: 'Saudi NDMO AI Governance Framework Enacted', country: 'Saudi Arabia' },
              { year: '2024', title: 'UAE Generative AI Guidelines for Federal Entities', country: 'UAE' },
              { year: '2023', title: 'Qatar National AI Ethics Charter Introduced', country: 'Qatar' },
              { year: '2023', title: 'Kuwait CITRA Cloud & AI Security Directive', country: 'Kuwait' },
              { year: '2022', title: 'Bahrain CBB Open Banking & AI Sandbox Expansion', country: 'Bahrain' },
            ].map((item, idx) => (
              <div key={idx} className="relative space-y-1 text-xs">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[var(--accent)] ring-4 ring-[var(--surface)]" />
                <span className="text-[10px] font-bold text-[var(--accent)] uppercase">{item.year}</span>
                <div className="font-bold text-[var(--text)]">{item.title}</div>
                <div className="text-[10px] text-[var(--text3)]">{item.country}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ─── Regulation Detail Modal ────────────────────────────────── */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="card bg-[var(--surface)] border border-[var(--border)] max-w-lg w-full p-6 space-y-4 rounded-2xl shadow-2xl relative">
            <button
              onClick={() => setSelectedReg(null)}
              className="absolute right-4 top-4 p-1.5 rounded-lg text-[var(--text3)] hover:text-[var(--text)] hover:bg-[var(--surface2)]"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2">
              <CountryPill country={selectedReg.country} />
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getStatusBadge(selectedReg.status)}`}>
                {selectedReg.status}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-black text-[var(--text)] leading-snug">{selectedReg.title}</h3>
              <div className="text-xs font-semibold text-[var(--accent)] mt-1">
                Enforcing Authority: {selectedReg.authority}
              </div>
              <div className="text-[11px] text-[var(--text3)] mt-0.5">Enacted: {selectedReg.date}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--surface2)] border border-[var(--border)] text-xs text-[var(--text2)] leading-relaxed">
              {selectedReg.summary}
            </div>

            <div>
              <div className="text-xs font-bold text-[var(--text)] mb-1.5">Legal Scope Tags</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedReg.tags.map((t, idx) => (
                  <span key={idx} className="text-xs px-2.5 py-1 rounded bg-[var(--surface2)] text-[var(--text)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex justify-between items-center text-xs">
              {selectedReg.url && (
                <a
                  href={selectedReg.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
                >
                  Official Gazette / Portal <ExternalLink size={12} />
                </a>
              )}
              <button
                onClick={() => setSelectedReg(null)}
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

