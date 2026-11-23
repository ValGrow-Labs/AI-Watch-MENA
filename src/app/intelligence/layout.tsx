import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Regional AI Intelligence Hub | AI Watch MENA',
  description:
    'Live regional artificial intelligence news, investigative field reports, sovereign compute developments, and executive market intelligence across Saudi Arabia, UAE, Qatar, Egypt, and the wider MENA region.',
}

export default function IntelligenceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
