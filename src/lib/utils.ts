import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) return `$${(num / 1_000_000_000).toFixed(1)}B`
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `$${(num / 1_000).toFixed(1)}K`
  return `$${num}`
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor(diff / (1000 * 60))

  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return formatDateShort(dateStr)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '…'
}

export function getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    Intelligence: 'badge-intelligence',
    Analysis: 'badge-analysis',
    Funding: 'badge-funding',
    Vendors: 'badge-vendor',
    Policy: 'badge-policy',
    Research: 'badge-analysis',
    'Sovereign AI': 'badge-intelligence',
    Infrastructure: 'badge-vendor',
    Startups: 'badge-funding',
  }
  return map[category] ?? 'badge-intelligence'
}

export function getCountryFlag(country: string): string {
  const flags: Record<string, string> = {
    'Saudi Arabia': '🇸🇦',
    UAE: '🇦🇪',
    Qatar: '🇶🇦',
    Bahrain: '🇧🇭',
    Oman: '🇴🇲',
    Kuwait: '🇰🇼',
    Egypt: '🇪🇬',
    Morocco: '🇲🇦',
    Jordan: '🇯🇴',
    Regional: '🌍',
  }
  return flags[country] ?? '🌍'
}

