'use client'

import { useState, useMemo } from 'react'
import {
  Rocket,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Building2,
  Tag,
} from 'lucide-react'
import { COUNTRY_PROFILES } from '@/data/countries'
import { FUNDING_DEALS } from '@/data/funding'
import CountryPill from '@/components/shared/CountryPill'

interface StartupItem {
  id: string
  name: string
  country: string
  sector: string
  stage?: string
  fundingTotal?: string
  description: string
  tags: string[]
}

export default function StartupEcosystemView() {
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('All')
  const [selectedSector, setSelectedSector] = useState('All')

  // Compile startups from datasets
  const startupsList: StartupItem[] = useMemo(() => {
    return [
      {
        id: 'tabby',
        name: 'Tabby',
        country: 'UAE',
        sector: 'Fintech AI',
        stage: 'Series D+',
        fundingTotal: '$200M',
        description: 'Pioneering AI-driven credit risk scoring and automated payments solutions across the GCC.',
        tags: ['BNPL', 'Risk AI', 'Consumer Finance'],
      },
      {
        id: 'tamara',
        name: 'Tamara',
        country: 'Saudi Arabia',
        sector: 'Fintech AI',
        stage: 'Series C',
        fundingTotal: '$340M',
        description: 'Saudi unicorn deploying machine learning algorithms for consumer identity and credit qualification.',
        tags: ['Saudi Unicorn', 'Fintech', 'Credit Scoring'],
      },
      {
        id: 'mozn',
        name: 'Mozn',
        country: 'Saudi Arabia',
        sector: 'Enterprise AI',
        stage: 'Series B',
        fundingTotal: '$51M',
        description: 'Leading Saudi AI enterprise specialising in advanced Arabic natural language understanding and anti-financial crime.',
        tags: ['Arabic NLP', 'AML AI', 'Enterprise'],
      },
      {
        id: 'bayanat',
        name: 'Bayanat',
        country: 'UAE',
        sector: 'Geospatial AI',
        stage: 'Public (ADX)',
        fundingTotal: 'Listed',
        description: 'Abu Dhabi-listed AI leader providing sovereign geospatial intelligence, autonomous vehicles, and mapping.',
        tags: ['Autonomous', 'Geospatial', 'Smart Cities'],
      },
      {
        id: 'presight',
        name: 'Presight AI',
        country: 'UAE',
        sector: 'Big Data AI',
        stage: 'Public (ADX)',
        fundingTotal: 'Listed',
        description: 'G42 subsidiary delivering generative AI and big data analytics for public safety and healthcare.',
        tags: ['G42', 'Public Safety', 'GenAI'],
      },
      {
        id: 'tarabut',
        name: 'Tarabut Gateway',
        country: 'Bahrain',
        sector: 'Open Banking AI',
        stage: 'Series A',
        fundingTotal: '$32M',
        description: 'MENA’s largest open banking platform using AI for automated transaction enrichment and categorization.',
        tags: ['Open Banking', 'API', 'CBB Sandbox'],
      },
      {
        id: 'instabug',
        name: 'Instabug',
        country: 'Egypt',
        sector: 'Developer AI',
        stage: 'Series B',
        fundingTotal: '$46M',
        description: 'Cairo-born global mobile app performance monitoring suite with AI automated bug triage.',
        tags: ['DevTools', 'Mobile SDK', 'Global Scale'],
      },
      {
        id: 'halan',
        name: 'MNT-Halan',
        country: 'Egypt',
        sector: 'Fintech AI',
        stage: 'Series B+',
        fundingTotal: '$400M+',
        description: 'Egyptian super-app utilising machine learning algorithms to serve underbanked populations.',
        tags: ['Unicorn', 'Microfinance', 'SuperApp'],
      },
      {
        id: 'swvl',
        name: 'Swvl AI',
        country: 'Egypt',
        sector: 'Mobility AI',
        stage: 'Growth',
        fundingTotal: '$170M+',
        description: 'AI-powered mass transit and dynamic route dispatch network operating across emerging markets.',
        tags: ['Transit AI', 'Dynamic Routing', 'Cairo'],
      },
      {
        id: 'alef',
        name: 'Alef Education',
        country: 'UAE',
        sector: 'EdTech AI',
        stage: 'Public (ADX)',
        fundingTotal: 'Listed',
        description: 'K-12 adaptive learning AI platform personalizing education for millions of students across the MENA region.',
        tags: ['EdTech', 'Adaptive Learning', 'MBZUAI Partner'],
      },
      {
        id: 'meeza',
        name: 'Meeza',
        country: 'Qatar',
        sector: 'Cloud & AI Managed',
        stage: 'Public (QSE)',
        fundingTotal: 'Listed',
        description: 'Qatar’s primary managed IT and AI data centre solutions provider, advancing TASMU smart state initiatives.',
        tags: ['TASMU', 'Cloud AI', 'Doha'],
      },
      {
        id: 'unifonic',
        name: 'Unifonic',
        country: 'Saudi Arabia',
        sector: 'Conversational AI',
        stage: 'Series B',
        fundingTotal: '$125M',
        description: 'Customer engagement platform utilizing Arabic conversational AI, voice analytics, and omnichannel messaging.',
        tags: ['Conversational AI', 'SaaS', 'Riyadh'],
      },
    ]
  }, [])

  const countries = ['All', 'Saudi Arabia', 'UAE', 'Egypt', 'Bahrain', 'Qatar']
  const sectors = ['All', 'Fintech AI', 'Enterprise AI', 'Geospatial AI', 'Big Data AI', 'Developer AI', 'Mobility AI', 'EdTech AI', 'Open Banking AI']

  const filteredStartups = useMemo(() => {
    return startupsList.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase()) ||
        s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      const matchCountry = selectedCountry === 'All' || s.country === selectedCountry
      const matchSector = selectedSector === 'All' || s.sector === selectedSector
      return matchSearch && matchCountry && matchSector
    })
  }, [startupsList, search, selectedCountry, selectedSector])

  return (
    <div className="space-y-6">
      {/* ─── Header & Controls ───────────────────────────────────────── */}
      <div className="card p-5 bg-[var(--surface)] border border-[var(--border)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
              <Rocket size={13} />
              Venture Discovery Matrix
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--text)]">
              Regional AI Startups & Emerging Scaleups
            </h2>
          </div>
          <span className="text-xs text-[var(--text3)]">
            Showing {filteredStartups.length} Verified Ventures
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text3)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by venture, technology, or tag..."
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
                <option key={c} value={c}>{c === 'All' ? 'All Hubs' : c}</option>
              ))}
            </select>

            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="form-input text-xs py-2 px-2.5 w-auto"
            >
              {sectors.map((s) => (
                <option key={s} value={s}>{s === 'All' ? 'All Verticals' : s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ─── Startups Grid ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStartups.map((startup) => (
          <div
            key={startup.id}
            className="card p-5 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-lg text-[var(--text)]">{startup.name}</h3>
                  <span className="text-[11px] font-semibold text-[var(--accent)]">{startup.sector}</span>
                </div>
                <CountryPill country={startup.country} />
              </div>

              <p className="text-xs text-[var(--text2)] leading-relaxed">
                {startup.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {startup.tags.map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded bg-[var(--surface2)] text-[var(--text3)]"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text3)]">
              <div>
                Stage: <strong className="text-[var(--text)]">{startup.stage}</strong>
              </div>
              <div>
                Capital: <strong className="text-[var(--highlight)]">{startup.fundingTotal}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

