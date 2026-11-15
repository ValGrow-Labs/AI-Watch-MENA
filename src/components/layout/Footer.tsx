'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, ArrowRight } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Intelligence', href: '/intelligence' },
      { label: 'Analysis & Reports', href: '/analysis' },
      { label: 'Funding & Deals', href: '/funding' },
      { label: 'Dashboard', href: '/dashboard' },
    ],
  },
  {
    title: 'Coverage',
    links: [
      { label: 'Saudi Arabia', href: '/intelligence?country=saudi-arabia' },
      { label: 'UAE', href: '/intelligence?country=uae' },
      { label: 'Qatar', href: '/intelligence?country=qatar' },
      { label: 'Egypt', href: '/intelligence?country=egypt' },
      { label: 'Bahrain', href: '/intelligence?country=bahrain' },
      { label: 'Oman', href: '/intelligence?country=oman' },
      { label: 'Kuwait', href: '/intelligence?country=kuwait' },
    ],
  },
  {
    title: 'Topics',
    links: [
      { label: 'Sovereign AI', href: '/analysis?topic=sovereign-ai' },
      { label: 'AI Infrastructure', href: '/analysis?topic=ai-infrastructure' },
      { label: 'Arabic AI', href: '/analysis?topic=arabic-ai' },
      { label: 'Enterprise AI', href: '/intelligence?category=enterprise' },
      { label: 'AI Regulation', href: '/regulation' },
      { label: 'Startups & VC', href: '/funding' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Editorial Standards', href: '/editorial-standards' },
      { label: 'Advertising', href: '/advertising' },
      { label: 'Partnerships', href: '/partnerships' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

const BOTTOM_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
];

// ─── Logo Mark ───────────────────────────────────────────────────────────────

function LogoMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M2 2 L2 16 M2 2 L7 2 M2 9 L6 9"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 2 L16 2 L16 16 M11 16 L16 16 M11 9 L15 9"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Newsletter Inline Form ───────────────────────────────────────────────────

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // In production: wire to newsletter API
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="flex items-center gap-2 text-sm"
        style={{ color: 'var(--accent)' }}
      >
        <span>✓</span>
        <span>You&apos;re subscribed. Welcome aboard.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        className="flex-1 px-3 py-2 rounded-lg text-sm outline-none transition-colors"
        style={{
          background: 'var(--surface2)',
          border: '1px solid var(--border)',
          color: 'var(--text)',
        }}
        aria-label="Email address for newsletter"
      />
      <button
        type="submit"
        className="btn-primary text-sm py-2 px-3 gap-1.5 shrink-0"
        aria-label="Subscribe"
      >
        <ArrowRight size={14} />
        Subscribe
      </button>
    </form>
  );
}

// ─── Footer Column ────────────────────────────────────────────────────────────

function Column({ col }: { col: FooterColumn }) {
  return (
    <div>
      <h4
        className="font-semibold text-sm mb-4 tracking-wide"
        style={{ color: 'var(--text)' }}
      >
        {col.title}
      </h4>
      <ul className="space-y-2.5">
        {col.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm transition-colors duration-150"
              style={{ color: 'var(--text3)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text3)')}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Footer (main export) ─────────────────────────────────────────────────────

export function Footer() {
  const pathname = usePathname();

  // Suppress editorial footer inside dedicated intelligence terminal
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

  return (
    <footer
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* ── TOP SECTION ── */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Brand block */}
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2 mb-3" aria-label="AI Watch MENA">
              <LogoMark size={22} />
              <span
                className="font-bold text-xl tracking-tight"
                style={{
                  fontFamily: 'var(--font-manrope, Manrope, system-ui, sans-serif)',
                  color: 'var(--text)',
                }}
              >
                AI Watch <span style={{ color: 'var(--accent)' }}>MENA</span>
              </span>
            </Link>
            <p
              className="text-sm font-medium mb-3"
              style={{ color: 'var(--accent2)' }}
            >
              The Intelligence Behind the MENA AI Economy
            </p>
            <p className="text-sm leading-relaxed mb-0" style={{ color: 'var(--text3)' }}>
              AI Watch MENA is the region&apos;s leading editorial platform for
              artificial intelligence intelligence, covering funding, policy,
              enterprise adoption, and emerging technology across the Arab world.
            </p>
          </div>

          {/* Newsletter block */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Mail size={15} style={{ color: 'var(--accent)' }} />
              <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                Weekly AI Intelligence Digest
              </span>
            </div>
            <p className="text-xs mb-3" style={{ color: 'var(--text3)' }}>
              Analysis, funding rounds, and policy updates — every Thursday.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* ── MIDDLE SECTION: 4-column grid ── */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {FOOTER_COLUMNS.map((col) => (
            <Column key={col.title} col={col} />
          ))}
        </div>
      </div>

      {/* ── BOTTOM SECTION ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright + disclaimer */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-center sm:text-left">
            <span className="text-xs" style={{ color: 'var(--text3)' }}>
              © 2024 AI Watch MENA. All rights reserved.
            </span>
            <span
              className="hidden sm:inline text-xs"
              style={{ color: 'var(--border2)' }}
            >
              ·
            </span>
            <span className="text-xs" style={{ color: 'var(--text3)', opacity: 0.75 }}>
              Editorial content produced independently. All data is illustrative.
            </span>
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-4">
            {BOTTOM_LINKS.map((link, i) => (
              <span key={link.href} className="flex items-center gap-4">
                {i > 0 && (
                  <span className="text-xs" style={{ color: 'var(--border2)' }}>·</span>
                )}
                <Link
                  href={link.href}
                  className="text-xs transition-colors duration-150"
                  style={{ color: 'var(--text3)' }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text3)')}
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
