// ============================================================
// CORE TYPE DEFINITIONS — AI Watch MENA
// ============================================================

export type Category =
  | 'Intelligence'
  | 'Analysis'
  | 'Funding'
  | 'Vendors'
  | 'Policy'
  | 'Research'
  | 'Sovereign AI'
  | 'Infrastructure'
  | 'Startups'

export type Country =
  | 'Saudi Arabia'
  | 'UAE'
  | 'Qatar'
  | 'Bahrain'
  | 'Oman'
  | 'Kuwait'
  | 'Egypt'
  | 'Morocco'
  | 'Jordan'
  | 'Regional'

export type FundingStage =
  | 'Pre-Seed'
  | 'Seed'
  | 'Series A'
  | 'Series B'
  | 'Series C'
  | 'Series D+'
  | 'Growth'
  | 'IPO'
  | 'Acquisition'
  | 'Government Grant'
  | 'Strategic Investment'

export type RegulationStatus =
  | 'Active'
  | 'Draft'
  | 'Proposed'
  | 'Under Review'
  | 'Enacted'
  | 'Repealed'

export interface Author {
  id: string
  name: string
  role: string
  avatar?: string
  bio?: string
}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content?: string
  category: Category
  country: Country
  author: Author
  publishedAt: string
  updatedAt?: string
  readingTime: number
  image: string
  imageAlt: string
  tags: string[]
  featured?: boolean
  trending?: boolean
  keyTakeaways?: string[]
  sources?: string[]
}

export interface FundingDeal {
  id: string
  company: string
  country: Country
  sector: string
  stage: FundingStage
  amount: number
  amountUnit: 'M' | 'B'
  currency: string
  date: string
  investors: string[]
  description: string
  tags: string[]
}

export interface Vendor {
  id: string
  name: string
  country: Country
  category: string
  description: string
  website: string
  tags: string[]
  verified: boolean
  featured?: boolean
  logo?: string
  foundedYear?: number
  employees?: string
}

export interface RegulationEntry {
  id: string
  title: string
  country: Country
  authority: string
  date: string
  category: string
  status: RegulationStatus
  summary: string
  url?: string
  tags: string[]
}

export interface ResearchReport {
  id: string
  slug: string
  title: string
  summary: string
  category: string
  publishedAt: string
  readingTime: number
  author: Author
  image: string
  tags: string[]
  featured?: boolean
  pages?: number
  downloads?: number
}

export interface CountryProfile {
  id: string
  name: Country
  flag: string
  capital: string
  gdpAI?: string
  aiStrategy: string
  keyInitiatives: string[]
  topStartups: string[]
  governmentBody: string
  aiInvestment: string
  description: string
}

export interface DashboardMetric {
  id: string
  label: string
  value: string
  change: number
  changeLabel: string
  icon: string
  trend: 'up' | 'down' | 'neutral'
  note: string
}

export interface ChartDataPoint {
  label: string
  value: number
  value2?: number
  value3?: number
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

