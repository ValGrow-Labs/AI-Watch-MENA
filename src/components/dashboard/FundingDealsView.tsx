'use client'

import { useState, useMemo } from 'react'
import {
  Search,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  TrendingUp,
  Building2,
  ExternalLink,
  X,
  Sparkles,
} from 'lucide-react'
import { FUNDING_DEALS } from '@/data/funding'
import type { FundingDeal } from '@/types'
import CountryPill from '@/components/shared/CountryPill'

export default function FundingDealsView() {
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('All')
  const [selectedStage, setSelectedStage] = useState('All')
  const [selectedSector, setSelectedSector] = useState('All')
  const [sortField, setSortField] = useState<'amount' | 'date' | 'company'>('date')
  const [sortAsc, setSortAsc] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedDeal, setSelectedDeal] = useState<FundingDeal | null>(null)

  const itemsPerPage = 8

  // Unique lists for filters
  const countries = useMemo(() => ['All', ...Array.from(new Set(FUNDING_DEALS.map((d) => d.country)))], [])
  const stages = useMemo(() => ['All', ...Array.from(new Set(FUNDING_DEALS.map((d) => d.stage)))], [])
  const sectors = useMemo(() => ['All', ...Array.from(new Set(FUNDING_DEALS.map((d) => d.sector)))], [])

  // Filtering and Sorting
  const filteredDeals = useMemo(() => {
    return FUNDING_DEALS.filter((d) => {
      const matchSearch =
        d.company.toLowerCase().includes(search.toLowerCase()) ||
        d.investors.some((inv) => inv.toLowerCase().includes(search.toLowerCase())) ||
        d.sector.toLowerCase().includes(search.toLowerCase())
      const matchCountry = selectedCountry === 'All' || d.country === selectedCountry
      const matchStage = selectedStage === 'All' || d.stage === selectedStage
      const matchSector = selectedSector === 'All' || d.sector === selectedSector

      return matchSearch && matchCountry && matchStage && matchSector
    }).sort((a, b) => {
      let valA: any = a[sortField]
      let valB: any = b[sortField]

      if (sortField === 'amount') {
        const multA = a.amountUnit === 'B' ? 1000 : 1
        const multB = b.amountUnit === 'B' ? 1000 : 1
        valA = a.amount * multA
        valB = b.amount * multB
      }

      if (valA < valB) return sortAsc ? -1 : 1
      if (valA > valB) return sortAsc ? 1 : -1
      return 0
    })
  }, [search, selectedCountry, selectedStage, selectedSector, sortField, sortAsc])

  // Pagination
  const totalPages = Math.ceil(filteredDeals.length / itemsPerPage)
  const paginatedDeals = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredDeals.slice(start, start + itemsPerPage)
  }, [filteredDeals, currentPage])

  function handleSort(field: 'amount' | 'date' | 'company') {
    if (sortField === field) {
      setSortAsc(!sortAsc)
    } else {
      setSortField(field)
      setSortAsc(false)
    }
  }

  // Summary Metrics
  const totalCapital = useMemo(() => {
    return filteredDeals.reduce((sum, d) => {
      const mult = d.amountUnit === 'B' ? 1000 : 1
      return sum + d.amount * mult
    }, 0)
  }, [filteredDeals])

  return (
    <div className="space-y-6">
      {/* ─── Top Stats & Disclaimer Banner ──────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-4 bg-[var(--surface)] space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text3)]">
            Total Capital Tracked
          </div>
          <div className="text-2xl font-black text-[var(--highlight)]">
            ${(totalCapital / 1000).toFixed(2)}B
          </div>
          <div className="text-[10px] text-[var(--text3)]">Across {filteredDeals.length} documented rounds</div>
        </div>

        <div className="card p-4 bg-[var(--surface)] space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text3)]">
            Median Deal Size
          </div>
          <div className="text-2xl font-black text-[var(--accent)]">$51.0M</div>
          <div className="text-[10px] text-[var(--text3)]">Benchmark across GCC + Egypt</div>
        </div>

        <div className="card p-4 bg-[var(--surface)] space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text3)]">
            Active Lead Investors
          </div>
          <div className="text-2xl font-black text-[var(--accent2)]">48 Funds</div>
          <div className="text-[10px] text-[var(--text3)]">Sovereign Wealth & Global VCs</div>
        </div>
      </div>

      {/* ─── Filter & Search Control Panel ──────────────────────────── */}
      <div className="card p-4 bg-[var(--surface)] border border-[var(--border)] space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text3)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Search company, investor, sector..."
              className="form-input pl-9 text-xs py-2"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text3)] hover:text-[var(--text)]"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* Country */}
            <select
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value)
                setCurrentPage(1)
              }}
              className="form-input text-xs py-2 px-2.5 w-auto"
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Countries' : c}
                </option>
              ))}
            </select>

            {/* Stage */}
            <select
              value={selectedStage}
              onChange={(e) => {
                setSelectedStage(e.target.value)
                setCurrentPage(1)
              }}
              className="form-input text-xs py-2 px-2.5 w-auto"
            >
              {stages.map((s) => (
                <option key={s} value={s}>
                  {s === 'All' ? 'All Stages' : s}
                </option>
              ))}
            </select>

            {/* Sector */}
            <select
              value={selectedSector}
              onChange={(e) => {
                setSelectedSector(e.target.value)
                setCurrentPage(1)
              }}
              className="form-input text-xs py-2 px-2.5 w-auto"
            >
              {sectors.map((sec) => (
                <option key={sec} value={sec}>
                  {sec === 'All' ? 'All Sectors' : sec}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ─── Searchable & Sortable Data Table ───────────────────────── */}
      <div className="card overflow-hidden bg-[var(--surface)] border border-[var(--border)]">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('company')} className="cursor-pointer">
                  <div className="flex items-center gap-1.5">
                    Company <ArrowUpDown size={11} />
                  </div>
                </th>
                <th>Country</th>
                <th>Sector</th>
                <th>Stage</th>
                <th onClick={() => handleSort('amount')} className="cursor-pointer">
                  <div className="flex items-center gap-1.5">
                    Amount <ArrowUpDown size={11} />
                  </div>
                </th>
                <th onClick={() => handleSort('date')} className="cursor-pointer">
                  <div className="flex items-center gap-1.5">
                    Date <ArrowUpDown size={11} />
                  </div>
                </th>
                <th>Lead Investors</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDeals.length > 0 ? (
                paginatedDeals.map((deal) => (
                  <tr
                    key={deal.id}
                    onClick={() => setSelectedDeal(deal)}
                    className="cursor-pointer hover:bg-[var(--surface2)]/80 transition-colors"
                  >
                    <td className="font-bold text-[var(--text)]">
                      <div className="flex items-center gap-2">
                        <span>{deal.company}</span>
                      </div>
                    </td>
                    <td>
                      <CountryPill country={deal.country} />
                    </td>
                    <td>
                      <span className="text-xs text-[var(--text2)]">{deal.sector}</span>
                    </td>
                    <td>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[var(--surface2)] text-[var(--text)] border border-[var(--border)]">
                        {deal.stage}
                      </span>
                    </td>
                    <td className="font-extrabold text-[var(--highlight)] text-sm">
                      ${deal.amount}{deal.amountUnit}
                    </td>
                    <td className="text-xs text-[var(--text3)]">{deal.date}</td>
                    <td className="text-xs text-[var(--text2)] max-w-xs truncate">
                      {deal.investors.slice(0, 2).join(', ')}
                      {deal.investors.length > 2 && ` +${deal.investors.length - 2}`}
                    </td>
                    <td className="text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedDeal(deal)
                        }}
                        className="text-xs font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-xs text-[var(--text3)]">
                    No investment records match your current filter parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Pagination */}
        <div className="p-4 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text3)]">
          <div>
            Showing{' '}
            <strong className="text-[var(--text)]">
              {filteredDeals.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
            </strong>{' '}
            to{' '}
            <strong className="text-[var(--text)]">
              {Math.min(currentPage * itemsPerPage, filteredDeals.length)}
            </strong>{' '}
            of <strong className="text-[var(--text)]">{filteredDeals.length}</strong> recorded deals
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded border border-[var(--border)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--surface2)]"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="px-2 font-medium text-[var(--text)]">
              Page {currentPage} of {Math.max(1, totalPages)}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1.5 rounded border border-[var(--border)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--surface2)]"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ─── Expandable Deal Detail Drawer / Modal ───────────────────── */}
      {selectedDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="card bg-[var(--surface)] border border-[var(--border)] max-w-lg w-full p-6 space-y-4 rounded-2xl shadow-2xl relative">
            <button
              onClick={() => setSelectedDeal(null)}
              className="absolute right-4 top-4 p-1.5 rounded-lg text-[var(--text3)] hover:text-[var(--text)] hover:bg-[var(--surface2)]"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2">
              <CountryPill country={selectedDeal.country} />
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-[var(--surface2)] text-[var(--text)]">
                {selectedDeal.stage}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-black text-[var(--text)]">{selectedDeal.company}</h3>
              <div className="text-3xl font-extrabold text-[var(--highlight)] mt-1">
                ${selectedDeal.amount}{selectedDeal.amountUnit}
              </div>
              <div className="text-xs text-[var(--text3)] mt-0.5">Disclosed Date: {selectedDeal.date}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--surface2)] border border-[var(--border)] space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                Strategic Rationale
              </div>
              <p className="text-xs text-[var(--text2)] leading-relaxed">{selectedDeal.description}</p>
            </div>

            <div>
              <div className="text-xs font-bold text-[var(--text)] mb-1.5">Lead & Syndicate Investors</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedDeal.investors.map((inv, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded bg-[var(--surface2)] border border-[var(--border)] text-[var(--text)] font-medium"
                  >
                    {inv}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex justify-between items-center text-xs text-[var(--text3)]">
              <span>Sector: <strong className="text-[var(--text)]">{selectedDeal.sector}</strong></span>
              <button
                onClick={() => setSelectedDeal(null)}
                className="btn-primary text-xs py-1.5 px-3"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

