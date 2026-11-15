// ILLUSTRATIVE DATA — FOR DEMONSTRATION PURPOSES ONLY

import type { DashboardMetric, ChartDataPoint } from '@/types'

export const DASHBOARD_METRICS: DashboardMetric[] = [
  {
    id: 'ai-funding',
    label: 'AI Funding (2024)',
    value: '$4.7B+',
    change: 38,
    changeLabel: 'vs 2023',
    icon: 'TrendingUp',
    trend: 'up',
    note: 'Illustrative figure based on publicly disclosed rounds',
  },
  {
    id: 'startups',
    label: 'Active AI Startups',
    value: '340+',
    change: 24,
    changeLabel: 'vs 2023',
    icon: 'Rocket',
    trend: 'up',
    note: 'Across GCC + Egypt + Morocco',
  },
  {
    id: 'vendors',
    label: 'AI Vendors Operating',
    value: '180+',
    change: 15,
    changeLabel: 'vs 2023',
    icon: 'Building2',
    trend: 'up',
    note: 'Global + regional AI solution providers',
  },
  {
    id: 'infrastructure',
    label: 'Data Centre Projects',
    value: '45+',
    change: 60,
    changeLabel: 'vs 2023',
    icon: 'Server',
    trend: 'up',
    note: 'Announced or under construction AI-ready facilities',
  },
]

// 18 months of funding data: June 2023 – Nov 2024
// saudi, uae, egypt breakdown (USD millions)
export const FUNDING_CHART_DATA: ChartDataPoint[] = [
  { label: 'Jun 23', value: 180, value2: 220, value3: 45 },
  { label: 'Jul 23', value: 210, value2: 185, value3: 60 },
  { label: 'Aug 23', value: 155, value2: 240, value3: 38 },
  { label: 'Sep 23', value: 340, value2: 195, value3: 55 },
  { label: 'Oct 23', value: 290, value2: 310, value3: 72 },
  { label: 'Nov 23', value: 220, value2: 268, value3: 50 },
  { label: 'Dec 23', value: 480, value2: 190, value3: 42 },
  { label: 'Jan 24', value: 320, value2: 350, value3: 100 },
  { label: 'Feb 24', value: 275, value2: 420, value3: 68 },
  { label: 'Mar 24', value: 380, value2: 290, value3: 95 },
  { label: 'Apr 24', value: 440, value2: 380, value3: 115 },
  { label: 'May 24', value: 310, value2: 465, value3: 80 },
  { label: 'Jun 24', value: 520, value2: 310, value3: 72 },
  { label: 'Jul 24', value: 490, value2: 540, value3: 60 },
  { label: 'Aug 24', value: 360, value2: 480, value3: 90 },
  { label: 'Sep 24', value: 580, value2: 420, value3: 130 },
  { label: 'Oct 24', value: 420, value2: 510, value3: 105 },
  { label: 'Nov 24', value: 395, value2: 460, value3: 88 },
]

// Sector breakdown for pie/donut chart
export const SECTOR_DATA: { name: string; value: number }[] = [
  { name: 'Fintech', value: 28 },
  { name: 'Healthcare', value: 18 },
  { name: 'Energy', value: 15 },
  { name: 'Logistics', value: 12 },
  { name: 'Education', value: 10 },
  { name: 'Other', value: 17 },
]

// Country comparison: startups count + total funding (USD millions)
export const COUNTRY_COMPARISON_DATA: { country: string; startups: number; funding: number }[] = [
  { country: 'Saudi Arabia', startups: 95, funding: 2100 },
  { country: 'UAE', startups: 110, funding: 1850 },
  { country: 'Egypt', startups: 75, funding: 480 },
  { country: 'Qatar', startups: 22, funding: 185 },
  { country: 'Bahrain', startups: 25, funding: 95 },
  { country: 'Kuwait', startups: 18, funding: 72 },
]

// Quarterly cumulative investment timeline (USD billions)
export const INVESTMENT_TIMELINE: ChartDataPoint[] = [
  { label: 'Q1 2022', value: 0.4 },
  { label: 'Q2 2022', value: 0.9 },
  { label: 'Q3 2022', value: 1.3 },
  { label: 'Q4 2022', value: 1.9 },
  { label: 'Q1 2023', value: 2.5 },
  { label: 'Q2 2023', value: 3.2 },
  { label: 'Q3 2023', value: 3.9 },
  { label: 'Q4 2023', value: 4.8 },
  { label: 'Q1 2024', value: 5.9 },
  { label: 'Q2 2024', value: 7.2 },
  { label: 'Q3 2024', value: 8.8 },
  { label: 'Q4 2024', value: 10.5 },
]
