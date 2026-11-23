'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUp, Globe2, ShieldCheck, Mail } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── HOMEPAGE: COMPACT CONTINUOUS NEWSROOM UTILITY BAR ──
  if (isHomepage) {
    return (
      <footer className="w-full border-t border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text2)] py-6 mt-12 transition-colors">
        <div className="content-container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-bold text-[var(--text)]">AI WATCH MENA</span>
            <span className="hidden sm:inline text-[var(--border2)]">•</span>
            <span className="text-[11px] text-[var(--text3)]">
              Independent Technology & Artificial Intelligence Journalism
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
            <Link href="/about" className="hover:text-[var(--accent)] transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-[var(--accent)] transition-colors">
              Contact & Tips
            </Link>
            <Link href="/editorial-standards" className="hover:text-[var(--accent)] transition-colors">
              Editorial Standards
            </Link>
            <Link href="/privacy" className="hover:text-[var(--accent)] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[var(--accent)] transition-colors">
              Terms
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--surface2)] text-[11px] font-semibold text-[var(--text)] transition-colors shrink-0"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </footer>
    );
  }

  // ── SECONDARY PAGES: REFINED EDITORIAL FOOTER ──
  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text2)] py-10 mt-16 transition-colors">
      <div className="content-container space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-3 max-w-sm">
            <div className="flex items-center gap-2 font-black text-lg text-[var(--text)]">
              <span className="w-6 h-6 rounded bg-[var(--accent)] text-white text-xs flex items-center justify-center">
                AW
              </span>
              <span>AI WATCH MENA</span>
            </div>
            <p className="text-xs text-[var(--text3)] leading-relaxed">
              Covering artificial intelligence developments, sovereign compute strategies, and technology transformation across the Middle East, North Africa, and global frontiers.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            <div>
              <div className="font-bold text-[var(--text)] uppercase tracking-wider mb-2.5 text-[11px]">
                Editorial
              </div>
              <ul className="space-y-1.5">
                <li><Link href="/mena" className="hover:text-[var(--accent)]">MENA Reporting</Link></li>
                <li><Link href="/world" className="hover:text-[var(--accent)]">Global AI News</Link></li>
                <li><Link href="/business" className="hover:text-[var(--accent)]">Business & Strategy</Link></li>
                <li><Link href="/technology" className="hover:text-[var(--accent)]">Deep Technology</Link></li>
                <li><Link href="/video" className="hover:text-[var(--accent)]">Video Journalism</Link></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-[var(--text)] uppercase tracking-wider mb-2.5 text-[11px]">
                Regional Bureaus
              </div>
              <ul className="space-y-1.5">
                <li><Link href="/mena?country=saudi-arabia" className="hover:text-[var(--accent)]">Riyadh (KSA)</Link></li>
                <li><Link href="/mena?country=uae" className="hover:text-[var(--accent)]">Abu Dhabi & Dubai (UAE)</Link></li>
                <li><Link href="/mena?country=qatar" className="hover:text-[var(--accent)]">Doha (Qatar)</Link></li>
                <li><Link href="/mena?country=egypt" className="hover:text-[var(--accent)]">Cairo (Egypt)</Link></li>
                <li><Link href="/mena?country=regional" className="hover:text-[var(--accent)]">Casablanca & Amman</Link></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-[var(--text)] uppercase tracking-wider mb-2.5 text-[11px]">
                Standards & Policies
              </div>
              <ul className="space-y-1.5">
                <li><Link href="/editorial-standards" className="hover:text-[var(--accent)]">Code of Ethics</Link></li>
                <li><Link href="/about" className="hover:text-[var(--accent)]">About Newsroom</Link></li>
                <li><Link href="/contact" className="hover:text-[var(--accent)]">Press & Tips</Link></li>
                <li><Link href="/privacy" className="hover:text-[var(--accent)]">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[var(--accent)]">Terms of Use</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[var(--text3)]">
          <div>
            &copy; {new Date().getFullYear()} AI Watch MENA. All rights reserved. Journalism-first publication.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-[var(--text)] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
