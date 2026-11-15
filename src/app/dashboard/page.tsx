import type { Metadata } from 'next'
import DashboardShell from '@/components/dashboard/DashboardShell'

export const metadata: Metadata = {
  title: 'AI Intelligence Dashboard & Market Terminal',
  description:
    'Real-time financial intelligence terminal, regional AI deal tracking, national ecosystem benchmarking, and sovereign strategy analytics across the MENA region.',
}

export default function DashboardPage() {
  return <DashboardShell />
}

